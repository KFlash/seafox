import { ScopeState, declareUnboundVariable, addBindingToExports, addBlockName } from './scope';
import { nextToken } from '../scanner/scan';
import { Token, KeywordDescTable } from '../token';
import { Errors, report } from '../errors';
import * as Types from './types';
import { parseStatementListItem } from './statements';
import {
  ParserState,
  Context,
  BindingKind,
  Origin,
  expectSemicolon,
  validateIdentifier,
  isValidIdentifier,
  consume,
  setLoc
} from './common';
import {
  parseFunctionDeclaration,
  parseClassDeclaration,
  parseHoistableDeclaration,
  parseVariableStatementOrLexicalDeclaration,
  parseDynamicImportStatement,
  parseImportMetaDeclaration
} from './declaration';
import {
  parseExpression,
  parseIdentifier,
  parseLiteral,
  parseMemberExpression,
  parseAssignmentExpression,
  parseIdentifierFromValue,
  parseNonDirectiveExpression,
  parseArrowFunction,
  parseAsyncArrowOrCallExpression
} from './expressions';

export function parseModuleItemListAndDirectives(
  parser: ParserState,
  context: Context,
  scope: ScopeState
): Types.Statement[] {
  const statements: Types.Statement[] = [];

  if (context & Context.OptionsDirectives) {
    while (parser.token === Token.StringLiteral) {
      const { start, line, column, isUnicodeEscape, tokenValue } = parser;
      let expression = parseLiteral(parser, context);
      if ((parser.token as Token) !== Token.Semicolon) {
        expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
      }
      expectSemicolon(parser, context);

      const directive = isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue;

      statements.push(
        context & Context.OptionsLoc
          ? {
              type: 'ExpressionStatement',
              expression,
              directive,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ExpressionStatement',
              expression,
              directive
            }
      );
    }
  }

  while (parser.token !== Token.EOF) {
    statements.push(parseModuleItem(parser, context, scope));
  }
  return statements;
}

export function parseModuleItem(parser: ParserState, context: Context, scope: ScopeState): any {
  // ecma262/#prod-ModuleItem
  // ModuleItem :
  //    ImportDeclaration
  //    ExportDeclaration
  //    StatementListItem
  if (parser.token === Token.ExportKeyword) {
    return parseExportDeclaration(parser, context, scope);
  }
  if (parser.token === Token.ImportKeyword) {
    return parseImportDeclaration(parser, context, scope);
  }
  return parseStatementListItem(parser, context, scope, Origin.TopLevel, null, null);
}

export function parseImportDeclaration(parser: ParserState, context: Context, scope: ScopeState): any {
  // ImportDeclaration :
  //   'import' ImportClause 'from' ModuleSpecifier ';'
  //   'import' ModuleSpecifier ';'
  //
  // ImportClause :
  //   ImportedDefaultBinding
  //   NameSpaceImport
  //   NamedImports
  //   ImportedDefaultBinding ',' NameSpaceImport
  //   ImportedDefaultBinding ',' NamedImports
  //
  // NameSpaceImport :
  //   '*' 'as' ImportedBinding
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  let source: Types.Literal | null = null;

  let specifiers: Types.ImportClause[] = [];

  // 'import' ModuleSpecifier ';'
  if (parser.token === Token.StringLiteral) {
    source = parseLiteral(parser, context);
    expectSemicolon(parser, context);

    return context & Context.OptionsLoc
      ? {
          type: 'ImportDeclaration',
          specifiers,
          source,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: 'ImportDeclaration',
          specifiers,
          source
        };
  }

  if ((parser.token & 0b00000000001001110000000000000000) > 0) {
    const { token, tokenValue, start, line, column } = parser;

    if (!isValidIdentifier(context, token)) report(parser, Errors.UnexpectedStrictReserved);

    if ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
      report(parser, Errors.StrictEvalArguments);
    }

    addBlockName(parser, context, scope, tokenValue, BindingKind.Let, Origin.None);

    nextToken(parser, context, /* allowRegExp */ 0);

    specifiers = [
      context & Context.OptionsLoc
        ? {
            type: 'ImportDefaultSpecifier',
            local: parseIdentifierFromValue(parser, context, tokenValue, start, line, column),
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'ImportDefaultSpecifier',
            local: parseIdentifierFromValue(parser, context, tokenValue, start, line, column)
          }
    ];

    if (parser.token !== Token.Comma) {
      source = parseModuleSpecifier(parser, context);

      expectSemicolon(parser, context);

      return context & Context.OptionsLoc
        ? {
            type: 'ImportDeclaration',
            specifiers,
            source,
            start: curStart,
            end: parser.endIndex,
            loc: setLoc(parser, curLine, curColumn)
          }
        : {
            type: 'ImportDeclaration',
            specifiers,
            source
          };
    }
    nextToken(parser, context, /* allowRegExp */ 0);
  }
  // Parse NameSpaceImport or NamedImports if present
  switch (parser.token) {
    // '*'
    case Token.Multiply:
      const { start, line, column } = parser;

      nextToken(parser, context, /* allowRegExp */ 0);

      consume(parser, context, Token.AsKeyword, /* allowRegExp */ 0);

      validateIdentifier(parser, context, BindingKind.Const, parser.token);

      addBlockName(parser, context, scope, parser.tokenValue, BindingKind.Const, Origin.None);

      specifiers.push(
        context & Context.OptionsLoc
          ? {
              type: 'ImportNamespaceSpecifier',
              local: parseIdentifier(parser, context),
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ImportNamespaceSpecifier',
              local: parseIdentifier(parser, context)
            }
      );
      break;

    // '{'
    case Token.LeftBrace:
      // NamedImports :
      //   '{' '}'
      //   '{' ImportsList '}'
      //   '{' ImportsList ',' '}'
      //
      // ImportsList :
      //   ImportSpecifier
      //   ImportsList ',' ImportSpecifier
      //
      // ImportSpecifier :
      //   BindingIdentifier
      //   IdentifierName 'as' BindingIdentifier

      nextToken(parser, context, /* allowRegExp */ 0);

      while ((parser.token & 0b00000000001001110000000000000000) > 0) {
        let { start, line, column, tokenValue, token } = parser;

        nextToken(parser, context, /* allowRegExp */ 0);

        const imported = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

        let local: Types.Identifier;

        if ((parser.token as Token) === Token.AsKeyword) {
          nextToken(parser, context, /* allowRegExp */ 0);

          if (!isValidIdentifier(context, parser.token)) {
            report(parser, Errors.InvalidKeywordAsAlias);
          } else if ((parser.token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
            report(parser, Errors.StrictEvalArguments);
          }
          tokenValue = parser.tokenValue;
          local = parseIdentifier(parser, context);
        } else {
          // Keywords cannot be bound to themselves, so an import name
          // that is a keyword is a syntax error if it is not followed
          // by the keyword 'as'.
          // See the ImportSpecifier production in ES6 section 15.2.2.

          validateIdentifier(parser, context, BindingKind.Const, token);

          if ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
            report(parser, Errors.StrictEvalArguments);
          }

          local = imported;
        }

        addBlockName(parser, context, scope, tokenValue, BindingKind.Let, Origin.None);

        specifiers.push(
          context & Context.OptionsLoc
            ? {
                type: 'ImportSpecifier',
                local,
                imported,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'ImportSpecifier',
                local,
                imported
              }
        );

        if ((parser.token as Token) !== Token.RightBrace) consume(parser, context, Token.Comma, /* allowRegExp */ 0);
      }

      consume(parser, context, Token.RightBrace, /* allowRegExp */ 0);
      break;
    case Token.LeftParen:
      return parseDynamicImportStatement(parser, context, curStart, curLine, curColumn);
    case Token.Period:
      return parseImportMetaDeclaration(parser, context, curStart, curLine, curColumn);
    default:
      report(parser, Errors.Unexpected);
  }

  source = parseModuleSpecifier(parser, context);

  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'ImportDeclaration',
        specifiers,
        source,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'ImportDeclaration',
        specifiers,
        source
      };
}

export function parseModuleSpecifier(parser: ParserState, context: Context): Types.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  consume(parser, context, Token.FromKeyword, /* allowRegExp */ 0);

  if (parser.token !== Token.StringLiteral) report(parser, Errors.Unexpected);

  return parseLiteral(parser, context);
}

export function parseExportDefault(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
  line: number,
  column: number
): Types.ExportDefaultDeclaration {
  // export default HoistableDeclaration[Default]
  // export default ClassDeclaration[Default]
  // export default [lookahead not-in {function, class}] AssignmentExpression[In] ;
  nextToken(parser, context, /* allowRegExp */ 1);

  let declaration: Types.ExportDeclaration | Types.Expression | null = null;

  switch (parser.token) {
    case Token.FunctionKeyword:
      // export default function foo () {}
      // export default function () {}
      declaration = parseFunctionDeclaration(parser, context, scope, 0, 0, Origin.TopLevel | Origin.Hoisted);
      break;

    case Token.ClassKeyword:
      // export default class foo {}
      declaration = parseClassDeclaration(parser, context, scope, /* isHoisted */ 1, /* isExported */ 0);
      break;
    case Token.AsyncKeyword:
      {
        // export default async function f () {}
        // export default async function () {}
        // export default async x => x

        const { tokenValue, start, line, column } = parser;

        nextToken(parser, context, /* allowRegExp */ 0);

        if (parser.newLine === 0) {
          if ((parser.token as Token) === Token.FunctionKeyword) {
            declaration = parseHoistableDeclaration(
              parser,
              context,
              scope,
              0,
              1,
              Origin.Export | Origin.Hoisted,
              start,
              line,
              column
            );
          } else {
            if ((parser.token & 0b00000000001000010000000000000000) > 0) {
              declaration = parseArrowFunction(
                parser,
                context,
                scope,
                [parseIdentifier(parser, context)],
                1,
                start,
                line,
                column
              );
            } else {
              declaration = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

              if ((parser.token as Token) === Token.LeftParen) {
                declaration = parseAsyncArrowOrCallExpression(
                  parser,
                  (context | Context.DisallowIn) ^ Context.DisallowIn,
                  declaration,
                  1,
                  parser.newLine,
                  BindingKind.ArgumentList,
                  Origin.None,
                  start,
                  line,
                  column
                );
              }

              declaration = parseMemberExpression(parser, context, declaration, 1, 0, start, line, column);
              declaration = parseAssignmentExpression(parser, context, 0, 0, declaration, start, line, column);
            }
          }
        }
      }
      break;
    default:
      // export default {};
      // export default [];
      // export default (1 + 2);
      declaration = parseExpression(parser, context, 0);
      expectSemicolon(parser, context);
  }

  // See: https://www.ecma-international.org/ecma-262/9.0/index.html#sec-exports-static-semantics-exportednames
  declareUnboundVariable(parser, 'default');

  return context & Context.OptionsLoc
    ? {
        type: 'ExportDefaultDeclaration',
        declaration,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ExportDefaultDeclaration',
        declaration
      };
}

export function parseExportDeclaration(parser: ParserState, context: Context, scope: ScopeState): any {
  // ExportDeclaration:
  //    'export' '*' 'from' ModuleSpecifier ';'
  //    'export' '*' 'as' IdentifierName 'from' ModuleSpecifier ';'
  //    'export' ExportClause ('from' ModuleSpecifier)? ';'
  //    'export' VariableStatement
  //    'export' Declaration
  //    'export' 'default' ... (handled in ParseExportDefault)

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  let specifiers: (Types.ExportAllDeclaration | Types.ExportNamedDeclaration | Types.ExportSpecifier)[] = [];
  let declaration: any = null;
  let source: Types.Literal | null = null;

  switch (parser.token) {
    case Token.DefaultKeyword:
      return parseExportDefault(parser, context, scope, start, line, column);
    case Token.Multiply: {
      // export * from 'foo';
      nextToken(parser, context, /* allowRegExp */ 0); // Skips: '*'

      if ((parser.token as Token) === Token.AsKeyword) {
        // 'export' '*' 'as' IdentifierName 'from' ModuleSpecifier ';'
        //
        // Desugaring:
        //   export * as x from "...";
        // ~>
        //   import * as .x from "..."; export {.x as x};

        nextToken(parser, context, /* allowRegExp */ 0); // Skips: 'as'

        declareUnboundVariable(parser, parser.tokenValue);

        const exported = parseIdentifier(parser, context);

        specifiers = [
          context & Context.OptionsLoc
            ? {
                type: 'ExportAllDeclaration',
                source,
                exported,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'ExportAllDeclaration',
                source,
                exported
              }
        ];

        source = parseModuleSpecifier(parser, context);

        expectSemicolon(parser, context);

        return context & Context.OptionsLoc
          ? {
              type: 'ExportNamedDeclaration',
              source,
              specifiers,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ExportNamedDeclaration',
              source,
              specifiers
            };
      }
      // 'export' '*' 'from' ModuleSpecifier ';'
      consume(parser, context, Token.FromKeyword, /* allowRegExp */ 0);

      source = parseLiteral(parser, context);

      expectSemicolon(parser, context);

      return context & Context.OptionsLoc
        ? {
            type: 'ExportAllDeclaration',
            source,
            exported: null,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'ExportAllDeclaration',
            source,
            exported: null
          };
    }
    case Token.LeftBrace: {
      // ExportClause :
      //   '{' '}'
      //   '{' ExportsList '}'
      //   '{' ExportsList ',' '}'
      //
      // ExportsList :
      //   ExportSpecifier
      //   ExportsList ',' ExportSpecifier
      //
      // ExportSpecifier :
      //   IdentifierName
      //   IdentifierName 'as' IdentifierName
      nextToken(parser, context, /* allowRegExp */ 0); // Skips: '{'

      const exportedNames: string[] = []; // Temporary exported names
      const exportedBindings: string[] = []; // Temporary exported bindings

      let local: any;
      let exported: Types.Identifier | null;
      let value: string | null;

      while ((parser.token & 0b00000000001001110000000000000000) > 0) {
        const { start, line, column, tokenValue } = parser;

        value = tokenValue;

        nextToken(parser, context, /* allowRegExp */ 0);

        local = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

        if ((parser.token as Token) === Token.AsKeyword) {
          nextToken(parser, context, /* allowRegExp */ 0);
          if ((parser.token & 0b00000000000010000000000000000000) > 0) report(parser, Errors.InvalidKeywordAsAlias);
          value = parser.tokenValue;
          exported = parseIdentifier(parser, context);
        } else {
          exported = local;
        }

        exportedNames.push(value as string);
        exportedBindings.push(tokenValue);

        specifiers.push(
          context & Context.OptionsLoc
            ? {
                type: 'ExportSpecifier',
                local,
                exported,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'ExportSpecifier',
                local,
                exported
              }
        );

        if ((parser.token as Token) !== Token.RightBrace) consume(parser, context, Token.Comma, /* allowRegExp */ 0);
      }

      consume(parser, context, Token.RightBrace, /* allowRegExp */ 1);

      if ((parser.token as Token) === Token.FromKeyword) {
        nextToken(parser, context, /* allowRegExp */ 0); // skips: 'from'
        if ((parser.token as Token) !== Token.StringLiteral) report(parser, Errors.InvalidExportImportSource, 'Export');
        source = parseLiteral(parser, context);
      } else {
        let i = exportedNames.length;

        while (i--) {
          declareUnboundVariable(parser, exportedNames[i]);
          addBindingToExports(parser, exportedBindings[i]);
        }
      }

      expectSemicolon(parser, context);

      break;
    }

    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context, scope, /* isHoisted */ 0, /* isExported */ 1);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(parser, context, scope, 1, 0, Origin.TopLevel);
      break;
    case Token.LetKeyword:
      declaration = parseVariableStatementOrLexicalDeclaration(parser, context, scope, BindingKind.Let, Origin.Export);
      break;
    case Token.ConstKeyword:
      declaration = parseVariableStatementOrLexicalDeclaration(
        parser,
        context,
        scope,
        BindingKind.Const,
        Origin.Export
      );
      break;
    case Token.VarKeyword:
      declaration = parseVariableStatementOrLexicalDeclaration(
        parser,
        context,
        scope,
        BindingKind.Variable,
        Origin.Export
      );
      break;
    case Token.AsyncKeyword: {
      const { start, line, column } = parser;

      nextToken(parser, context, /* allowRegExp */ 0);

      if (parser.newLine === 0 && (parser.token as Token) === Token.FunctionKeyword) {
        declaration = parseHoistableDeclaration(parser, context, scope, 1, 1, Origin.Export, start, line, column);
        break;
      }
    }
    // falls through
    default:
      report(parser, Errors.Unexpected, KeywordDescTable[parser.token & Token.Kind]);
  }

  return context & Context.OptionsLoc
    ? {
        type: 'ExportNamedDeclaration',
        source,
        specifiers,
        declaration,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ExportNamedDeclaration',
        source,
        specifiers,
        declaration
      };
}
