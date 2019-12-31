import { ScopeState } from './scope';
import { nextToken } from '../scanner/scan';
import { Token, KeywordDescTable } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import { parseNonDirectiveExpression, parseStatementListItem } from './statements';
import { Context, BindingKind, FunctionFlag, ClassFlags, Origin } from './bits';
import {
  ParserState,
  expectSemicolon,
  validateIdentifier,
  isValidIdentifier,
  consume,
  consumeOpt,
  setLoc
} from './common';
import {
  parseFunctionDeclaration,
  parseClassDeclaration,
  parseFunctionDeclarationRest,
  parseVariableStatementOrLexicalDeclaration,
  parseImportCallDeclaration,
  parseImportMetaDeclaration
} from './declaration';
import {
  parseExpression,
  parseIdentifier,
  parseLiteral,
  parseMemberExpression,
  parseAssignmentExpression,
  parseIdentifierFromValue,
  parseArrowFunction,
  parseAsyncArrowOrCallExpression
} from './expressions';
import { declareUnboundVariable, addBindingToExports, addBlockName } from './scope';

export function parseModuleItemListAndDirectives(
  parser: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.Statement[] {
  const statements: any[] = [];

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

export function parseImportDeclaration(parser: ParserState, context: Context, scope: any): any {
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

  const curStart = parser.start;
  const curLine = parser.line;
  const curColumn = parser.column;

  nextToken(parser, context, /* allowRegExp */ 0);

  let source: ESTree.Literal | null = null;

  let specifiers: any = [];

  // 'import' ModuleSpecifier ';'
  if (parser.token === Token.StringLiteral) {
    source = parseLiteral(parser, context);
  } else {
    if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
      const { start, line, column } = parser;
      if (!isValidIdentifier(context, parser.token)) report(parser, Errors.UnexpectedStrictReserved);
      if ((parser.token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments)
        report(parser, Errors.StrictEvalArguments);
      addBlockName(parser, context, scope, parser.tokenValue, BindingKind.Let, Origin.None);
      const local = parseIdentifier(parser, context);

      specifiers = [
        context & Context.OptionsLoc
          ? {
              type: 'ImportDefaultSpecifier',
              local,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ImportDefaultSpecifier',
              local
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

        addBlockName(parser, context, scope, parser.tokenValue, BindingKind.Let, Origin.None);

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

      // '}'
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
        while (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
          let { start, line, column, tokenValue, token } = parser;
          const imported = parseIdentifier(parser, context);
          let local: ESTree.Identifier;

          if (consumeOpt(parser, context, Token.AsKeyword, /* allowRegExp */ 0)) {
            if (
              (parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber ||
              (parser.token as Token) === Token.Comma
            ) {
              report(parser, Errors.InvalidKeywordAsAlias);
            } else {
              validateIdentifier(parser, context, BindingKind.Const, parser.token);
            }
            tokenValue = parser.tokenValue;
            local = parseIdentifier(parser, context);
          } else {
            // Keywords cannot be bound to themselves, so an import name
            // that is a keyword is a syntax error if it is not followed
            // by the keyword 'as'.
            // See the ImportSpecifier production in ES6 section 15.2.2.
            validateIdentifier(parser, context, BindingKind.Const, token);
            if ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments)
              report(parser, Errors.StrictEvalArguments);
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
        return parseImportCallDeclaration(parser, context, curStart, curLine, curColumn) as any;
      case Token.Period:
        return parseImportMetaDeclaration(parser, context, curStart, curLine, curColumn) as any;
      default:
        report(parser, Errors.Unexpected);
    }

    source = parseModuleSpecifier(parser, context);
  }

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

export function parseModuleSpecifier(parser: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  consumeOpt(parser, context, Token.FromKeyword, /* allowRegExp */ 0);

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
): any {
  // export default HoistableDeclaration[Default]
  // export default ClassDeclaration[Default]
  // export default [lookahead not-in {function, class}] AssignmentExpression[In] ;
  nextToken(parser, context, /* allowRegExp */ 1);

  let declaration: any = null;

  switch (parser.token) {
    // export default HoistableDeclaration[Default]
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(
        parser,
        context,
        scope,
        0b00000000000000000000000000000011,
        Origin.TopLevel
      );
      break;
    // export default ClassDeclaration[Default]
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context, scope, ClassFlags.Hoisted);
      break;
    case Token.AsyncKeyword:
      const { tokenValue, start, line, column } = parser;
      nextToken(parser, context, /* allowRegExp */ 0);
      if (parser.newLine === 0) {
        if ((parser.token as Token) === Token.FunctionKeyword) {
          declaration = parseFunctionDeclarationRest(
            parser,
            context,
            scope,
            0b00000000000000000000000000000111,
            Origin.Export,
            start,
            line,
            column
          );
        } else {
          declaration = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
          if ((parser.token & 0b00000000001000010000000000000000) > 0) {
            declaration = parseIdentifier(parser, context);
            declaration = parseArrowFunction(parser, context, scope, [declaration], 1, start, line, column);
          } else {
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
            declaration = parseMemberExpression(parser, context, declaration, 0, 0, 0, start, line, column);
            declaration = parseAssignmentExpression(parser, context, 0, 0, declaration, start, line, column);
          }
        }
      }
      break;
    default:
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

  let specifiers: any[] = [];
  let declaration: any = null;
  let source: ESTree.Literal | null = null;

  switch (parser.token) {
    case Token.DefaultKeyword:
      return parseExportDefault(parser, context, scope, start, line, column);
    case Token.Multiply: {
      nextToken(parser, context, /* allowRegExp */ 0); // Skips: '*'

      if (consumeOpt(parser, context, Token.AsKeyword, /* allowRegExp */ 0)) {
        // 'export' '*' 'as' IdentifierName 'from' ModuleSpecifier ';'
        //
        // Desugaring:
        //   export * as x from "...";
        // ~>
        //   import * as .x from "..."; export {.x as x};

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

        consume(parser, context, Token.FromKeyword, /* allowRegExp */ 0);

        if ((parser.token as Token) !== Token.StringLiteral) report(parser, Errors.InvalidExportImportSource, 'Export');

        source = parseLiteral(parser, context);

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

      const tEN: string[] = []; // Temporary exported names
      const tEB: string[] = []; // Temporary exported bindings

      let local: any;
      let exported: ESTree.Identifier | null;
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

        tEN.push(value as string);
        tEB.push(tokenValue);

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
        nextToken(parser, context, /* allowRegExp */ 0);
        if ((parser.token as Token) !== Token.StringLiteral) report(parser, Errors.InvalidExportImportSource, 'Export');
        source = parseLiteral(parser, context);
      } else {
        let i = tEN.length;

        while (i--) {
          declareUnboundVariable(parser, tEN[i]);
        }

        i = tEB.length;

        while (i--) {
          addBindingToExports(parser, tEB[i]);
        }
      }

      expectSemicolon(parser, context);

      break;
    }

    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context, scope, ClassFlags.Export);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(
        parser,
        context,
        scope,
        0b00000000000000000000000000011011,
        Origin.TopLevel
      );
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
        declaration = parseFunctionDeclarationRest(
          parser,
          context,
          scope,
          0b00000000000000000000000000001111,
          Origin.Export,
          start,
          line,
          column
        );
        declareUnboundVariable(parser, declaration.id ? declaration.id.name : '');
        break;
      }
    }
    // falls through
    default:
      report(parser, Errors.Unexpected, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
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
