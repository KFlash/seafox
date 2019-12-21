import { ScopeState } from './scope';
import { nextToken } from '../scanner/scan';
import { Token, KeywordDescTable } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import { parseNonDirectiveExpression, parseStatementListItem } from './statements';
import { Context, BindingKind, FunctionFlag, ClassFlags, Origin } from './bits';
import { ParserState, consumeSemicolon, consume, consumeOpt, setLoc } from './common';
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
      if (parser.token !== Token.Semicolon) {
        expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
      }
      consumeSemicolon(parser, context);

      const directive = isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue;
      const type = 'ExpressionStatement';
      statements.push(
        context & Context.OptionsLoc
          ? {
              type,
              expression,
              directive,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type,
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
    return parseImportDeclaration(parser, context);
  }
  return parseStatementListItem(parser, context, scope, Origin.TopLevel, null, null);
}

export function parseImportDeclaration(parser: ParserState, context: Context): ESTree.ImportDeclaration {
  const curStart = parser.start;
  const curLine = parser.line;
  const curColumn = parser.column;

  nextToken(parser, context, /* allowRegExp */ 0);

  let source: ESTree.Literal | null = null;

  let specifiers: any = [];

  // 'import' ModuleSpecifier ';'

  const type = 'ImportDeclaration';
  if (parser.token === Token.StringLiteral) {
    source = parseLiteral(parser, context);
  } else {
    if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
      const { start, line, column } = parser;
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

        consumeSemicolon(parser, context);

        return context & Context.OptionsLoc
          ? {
              type,
              specifiers,
              source,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
            }
          : {
              type,
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
        nextToken(parser, context, /* allowRegExp */ 0);
        while (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
          const { start, line, column } = parser;
          const imported = parseIdentifier(parser, context);
          const local = consumeOpt(parser, context, Token.AsKeyword, /* allowRegExp */ 0)
            ? parseIdentifier(parser, context)
            : imported;

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

          if (parser.token !== Token.RightBrace) consume(parser, context, Token.Comma, /* allowRegExp */ 0);
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

  consumeSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type,
        specifiers,
        source,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : ({
        type,
        specifiers,
        source
      } as any);
}

export function parseModuleSpecifier(parser: ParserState, context: Context): ESTree.Literal {
  // ModuleSpecifier :
  //   StringLiteral
  consumeOpt(parser, context, Token.FromKeyword, /* allowRegExp */ 0);

  if (parser.token !== Token.StringLiteral) report(parser, Errors.Unexpected);

  return parseLiteral(parser, context);
}

export function parseExportDefaultDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  start: number,
  line: number,
  column: number
): any {
  nextToken(parser, context, /* allowRegExp */ 1);

  let declaration: any = null;

  switch (parser.token) {
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(
        parser,
        context,
        scope,
        FunctionFlag.IsDeclaration | FunctionFlag.AllowGenerator,
        Origin.TopLevel
      );
      break;
    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context, scope, ClassFlags.Hoisted);
      break;
    case Token.AsyncKeyword:
      const { tokenValue, start, line, column } = parser;
      nextToken(parser, context, /* allowRegExp */ 0);
      if (parser.newLine === 0) {
        if (parser.token === Token.FunctionKeyword) {
          declaration = parseFunctionDeclarationRest(
            parser,
            context,
            scope,
            FunctionFlag.IsAsync | FunctionFlag.IsDeclaration,
            Origin.Export,
            start,
            line,
            column
          );
        } else {
          declaration = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
          if (parser.token & Token.IsIdentifier) {
            declaration = parseIdentifier(parser, context);
            declaration = parseArrowFunction(parser, context, scope, [declaration], 1, start, line, column);
          } else {
            if (parser.token === Token.LeftParen) {
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
            declaration = parseMemberExpression(parser, context, declaration, 0, 0, start, line, column);
            declaration = parseAssignmentExpression(parser, context, 0, 0, declaration, start, line, column);
          }
        }
      }
      break;
    default:
      declaration = parseExpression(parser, context);
      consumeSemicolon(parser, context);
  }

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
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  let specifiers: any[] = [];
  let declaration: any = null;
  let source: ESTree.Literal | null = null;

  switch (parser.token) {
    case Token.DefaultKeyword:
      return parseExportDefaultDeclaration(parser, context, scope, start, line, column);
    case Token.Multiply: {
      nextToken(parser, context, /* allowRegExp */ 0); // Skips: '*'

      if (consumeOpt(parser, context, Token.AsKeyword, /* allowRegExp */ 0)) {
        // 'export' '*' 'as' IdentifierName 'from' ModuleSpecifier ';'
        //
        // Desugaring:
        //   export * as x from "...";
        // ~>
        //   import * as .x from "..."; export {.x as x};

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

        source = parseLiteral(parser, context);

        consumeSemicolon(parser, context);

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

      consumeSemicolon(parser, context);

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
      nextToken(parser, context, /* allowRegExp */ 0); // Skips: '{'

      while (parser.token & (Token.FutureReserved | Token.Keyword | Token.IsIdentifier)) {
        const { start, line, column } = parser;
        const local = parseIdentifier(parser, context);

        let exported: ESTree.Identifier | null;

        if (parser.token === Token.AsKeyword) {
          nextToken(parser, context, /* allowRegExp */ 0);
          exported = parseIdentifier(parser, context);
        } else {
          exported = local;
        }

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

        if (parser.token !== Token.RightBrace) consume(parser, context, Token.Comma, /* allowRegExp */ 0);
      }

      consume(parser, context, Token.RightBrace, /* allowRegExp */ 0);

      if (consumeOpt(parser, context, Token.FromKeyword, /* allowRegExp */ 0)) {
        source = parseLiteral(parser, context);
      }

      consumeSemicolon(parser, context);

      break;
    }

    case Token.ClassKeyword:
      declaration = parseClassDeclaration(parser, context, scope, ClassFlags.Hoisted);
      break;
    case Token.FunctionKeyword:
      declaration = parseFunctionDeclaration(
        parser,
        context,
        scope,
        FunctionFlag.IsDeclaration | FunctionFlag.AllowGenerator,
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
      if (parser.newLine === 0 && parser.token === Token.FunctionKeyword) {
        declaration = parseFunctionDeclarationRest(
          parser,
          context,
          scope,
          FunctionFlag.IsAsync | FunctionFlag.IsDeclaration,
          Origin.Export,
          start,
          line,
          column
        );
        break;
      }
    }
    // falls through
    default:
      report(parser, Errors.Unexpected, KeywordDescTable[parser.token & Token.Type]);
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
