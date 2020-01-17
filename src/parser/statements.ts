import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as Types from './types';
import { ScopeState, ScopeKind } from './scope';
import {
  parseVariableDeclarationListAndDeclarator,
  parseFunctionDeclaration,
  parseClassDeclaration,
  parseHoistableDeclaration,
  parseVariableStatementOrLexicalDeclaration,
  parseImportCallDeclaration,
  parseImportMetaDeclaration
} from './declaration';
import {
  parseExpression,
  parseExpressions,
  parseIdentifier,
  parseLiteral,
  parseMemberExpression,
  parseAssignmentExpression,
  parsePrimaryExpression,
  parseSequenceExpression,
  parseExpressionStatement,
  parseIdentifierFromValue,
  parseAsyncArrowOrCallExpression,
  parseObjectLiteralOrPattern,
  parseArrayExpressionOrPattern,
  parseLeftHandSideExpression,
  parseAndClassifyIdentifier,
  parseBindingPattern,
  parseDirectives,
  parseNonDirectiveExpression,
  parseAsyncArrowIdentifier
} from './expressions';
import {
  ParserState,
  expectSemicolon,
  Flags,
  Context,
  BindingKind,
  Origin,
  consume,
  consumeOpt,
  setLoc,
  isValidBreakLabel,
  reinterpretToPattern,
  addLabel,
  parseStatementWithLabelSet,
  isExactlyStrictDirective,
  validateIdentifier
} from './common';

export function parseStatementList(parser: ParserState, context: Context, scope: ScopeState): Types.Statement[] {
  const statements: Types.Statement[] = [];
  let isStrictDirective: 0 | 1 = 0;

  while (parser.token === Token.StringLiteral) {
    const { index, start, line, column, tokenValue, isUnicodeEscape } = parser;
    let expression = parseLiteral(parser, context);
    if (isExactlyStrictDirective(parser, index, start, tokenValue)) {
      isStrictDirective = 1;
      context |= Context.Strict;
    } else {
      isStrictDirective = 0;
    }

    if (isStrictDirective === 0) {
      expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
    }
    expectSemicolon(parser, context);

    statements.push(parseDirectives(parser, context, isUnicodeEscape, tokenValue, expression, start, line, column));
  }

  while (parser.token !== Token.EOF) {
    statements.push(parseStatementListItem(parser, context, scope, Origin.TopLevel, null, null));
  }
  return statements;
}

export function parseStatementListItem(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: any,
  nestedLabels: any
): Types.Statement {
  switch (parser.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(parser, context, scope, 0, 0, origin);
    case Token.AsyncKeyword:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 1);
    case Token.ClassKeyword:
      return parseClassDeclaration(parser, context, scope, /* isHoisted */ 0, /* isExported */ 0);
    case Token.ConstKeyword:
      return parseVariableStatementOrLexicalDeclaration(parser, context, scope, BindingKind.Const, Origin.None);
    case Token.LetKeyword:
      return parseLetIdentOrVarDeclarationStatement(parser, context, scope, labels, nestedLabels, origin);
    case Token.ImportKeyword:
      return parseImportCallOrForbidImport(parser, context);
    case Token.ExportKeyword:
      report(parser, Errors.Unexpected, 'export');
    default:
      return parseStatement(parser, context, scope, origin, labels, nestedLabels, 1);
  }
}

export function parseStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: any,
  nestedLabels: any,
  allowFuncDecl: 0 | 1
): Types.Statement {
  // Statement ::
  //   Block
  //   VariableStatement
  //   EmptyStatement
  //   ExpressionStatement
  //   IfStatement
  //   IterationStatement
  //   ContinueStatement
  //   BreakStatement
  //   ReturnStatement
  //   WithStatement
  //   LabelledStatement
  //   SwitchStatement
  //   ThrowStatement
  //   TryStatement
  //   DebuggerStatement

  switch (parser.token) {
    case Token.VarKeyword:
      return parseVariableStatementOrLexicalDeclaration(parser, context, scope, BindingKind.Variable, Origin.None);
    case Token.LeftBrace:
      return parseBlock(
        parser,
        context,
        {
          parent: scope,
          type: ScopeKind.Block,
          scopeError: void 0
        },
        labels,
        nestedLabels
      );
    case Token.Semicolon:
      return parseEmptyStatement(parser, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(parser, context);
    case Token.BreakKeyword:
      return parseBreakStatement(parser, context, labels);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(parser, context);
    case Token.ContinueKeyword:
      return parseContinueStatement(parser, context, labels);
    case Token.ForKeyword:
      return parseForStatement(parser, context, scope, labels);
    case Token.DoKeyword:
      return parseDoWhileStatement(parser, context, scope, labels, nestedLabels);
    case Token.IfKeyword:
      return parseIfStatement(parser, context, scope, labels);
    case Token.SwitchKeyword:
      return parseSwitchStatement(parser, context, scope, labels, nestedLabels);
    case Token.ThrowKeyword:
      return parseThrowStatement(parser, context);
    case Token.TryKeyword:
      return parseTryStatement(parser, context, scope, labels);
    case Token.AsyncKeyword:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 0);
    case Token.WhileKeyword:
      return parseWhileStatement(parser, context, scope, labels, nestedLabels);
    case Token.WithKeyword:
      return parseWithStatement(parser, context, scope, labels, nestedLabels);
    case Token.FunctionKeyword:
      report(
        parser,
        (context & 0b00000000000000000000010000010000) > 0 ? Errors.StrictFunction : Errors.SloppyFunction
      );
    case Token.ClassKeyword:
      report(parser, Errors.ClassForbiddenAsStatement);
    default:
      return parseExpressionOrLabelledStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl);
  }
}

export function parseLabelledStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: string,
  nestedLabels: any,
  value: string[],
  token: Token,
  expr: any,
  allowFuncDecl: 0 | 1,
  start: number,
  line: number,
  column: number
): Types.LabeledStatement {
  // ExpressionStatement | LabelledStatement ::
  //   Expression ';'
  //   Identifier ':' Statement
  //
  // ExpressionStatement[Yield] :
  //   [lookahead notin {{, function, class, let [}] Expression[In, ?Yield] ;

  if ((token & Token.IsStringOrNumber) === Token.IsStringOrNumber) report(parser, Errors.Unexpected);

  validateIdentifier(parser, context, BindingKind.None, token);

  labels = addLabel(parser, value, labels, nestedLabels);

  nextToken(parser, context, /* allowRegExp */ 1); // skip: ':'

  nestedLabels = parseStatementWithLabelSet(parser.token, value, labels, nestedLabels);

  const body =
    allowFuncDecl === 0 ||
    // Disallow if web compability is off
    (context & 0b00000000000000000000010000010000) > 0 ||
    parser.token !== Token.FunctionKeyword
      ? parseStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl)
      : parseFunctionDeclaration(parser, context, scope, 0, 0, origin | Origin.Statement);

  return context & Context.OptionsLoc
    ? {
        type: 'LabeledStatement',
        label: expr,
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'LabeledStatement',
        label: expr,
        body
      };
}

export function parseImportCallOrForbidImport(parser: ParserState, context: Context): any {
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);

  switch (parser.token) {
    case Token.LeftParen:
      return parseImportCallDeclaration(parser, context, start, line, column);
    case Token.Period:
      return parseImportMetaDeclaration(parser, context, start, line, column);
    default:
      report(parser, Errors.InvalidImportExportSloppy, 'import');
  }
}

export function parseAsyncArrowOrAsyncFunctionDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: string,
  allowFuncDecl: 0 | 1
): Types.AsyncDeclaration {
  const { token, tokenValue, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.token === Token.Colon) {
    return parseLabelledStatement(
      parser,
      context,
      scope,
      origin,
      labels,
      null,
      tokenValue,
      token,
      parseIdentifierFromValue(parser, context, tokenValue, start, line, column),
      allowFuncDecl,
      start,
      line,
      column
    );
  }

  const asyncNewLine = parser.newLine;

  if (asyncNewLine === 0) {
    // async function ...
    if (parser.token === Token.FunctionKeyword) {
      if (allowFuncDecl === 0) report(parser, Errors.AsyncFunctionInSingleStatementContext);
      return parseHoistableDeclaration(parser, context, scope, 0, 1, origin, start, line, column);
    }

    // async Identifier => ...

    if ((parser.token & 0b00000000001000010000000000000000) > 0) {
      if ((context & 0b00000000001000000000010000000000) > 0 && parser.token === Token.YieldKeyword) {
        report(parser, Errors.YieldInParameter);
      }

      if (parser.token === Token.AwaitKeyword) report(parser, Errors.UnexpectedLetStrictReserved);

      if (
        context & Context.Strict &&
        (parser.token & 0b00100000000100000000000000000000) === 0b00100000000100000000000000000000
      ) {
        report(parser, Errors.Unexpected);
      }

      let expr: Types.AsyncExpression = parseAsyncArrowIdentifier(
        parser,
        context,
        {
          parent: {
            parent: void 0,
            type: ScopeKind.Block
          },
          type: ScopeKind.ArrowParams,
          scopeError: void 0
        },
        1,
        parser.tokenValue,
        parser.token,
        parseIdentifier(parser, context),
        start,
        line,
        column
      );

      if (parser.token === Token.Comma) expr = parseSequenceExpression(parser, context, expr, start, line, column);

      return parseExpressionStatement(parser, context, expr, start, line, column);
    }
  }

  let expr: Types.Expression | Types.AsyncExpression = parseIdentifierFromValue(
    parser,
    context,
    tokenValue,
    start,
    line,
    column
  );

  if (parser.token === Token.LeftParen) {
    expr = parseAsyncArrowOrCallExpression(
      parser,
      (context | 0b00000000000000000010000000000000) ^ 0b00000000000000000010000000000000,
      expr,
      1,
      asyncNewLine,
      BindingKind.ArgumentList,
      Origin.None,
      start,
      line,
      column
    );
  } else {
    if (parser.token === Token.Arrow) {
      expr = parseAsyncArrowIdentifier(
        parser,
        context,
        {
          parent: {
            parent: void 0,
            type: ScopeKind.Block
          },
          type: ScopeKind.ArrowParams,
          scopeError: void 0
        },
        1,
        'async',
        parser.token,
        expr,
        start,
        line,
        column
      );
    }
    parser.assignable = 1;
  }

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  if (parser.token === Token.Comma) expr = parseSequenceExpression(parser, context, expr, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  parser.assignable = 1;

  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseBlock(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabels: any
): Types.BlockStatement {
  // Block ::
  //   '{' StatementList '}'
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  const body: Types.Statement[] = [];

  while (parser.token !== Token.RightBrace) {
    body.push(parseStatementListItem(parser, context, scope, Origin.BlockStatement, labels, nestedLabels));
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ 1);

  return context & Context.OptionsLoc
    ? {
        type: 'BlockStatement',
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'BlockStatement',
        body
      };
}
export function parseEmptyStatement(parser: ParserState, context: Context): Types.EmptyStatement {
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);
  return context & Context.OptionsLoc
    ? {
        type: 'EmptyStatement',
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'EmptyStatement'
      };
}

export function parseReturnStatement(parser: ParserState, context: Context): Types.ReturnStatement {
  // ReturnStatement ::
  //   'return' [no line terminator] Expression? ';'
  if (context & Context.InGlobal && (context & Context.OptionsGlobalReturn) === 0) report(parser, Errors.IllegalReturn);
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);
  const argument =
    parser.newLine !== 0 || parser.token & Token.IsAutoSemicolon ? null : parseExpressions(parser, context, 0);

  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'ReturnStatement',
        argument,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ReturnStatement',
        argument
      };
}

export function parseForStatementWithVariableDeclarations(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  isAwait: false | 0 | 1,
  labels: string,
  curStart: number,
  curLine: number,
  curColumn: number
) {
  const { token, start, line, column, tokenValue } = parser;

  let test: Types.Expression | null = null;
  let update: Types.Expression | null = null;
  let init = null;
  let right;
  const origin = Origin.ForStatement;
  let kind: BindingKind = BindingKind.Tail;
  let isLet = false;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (token === Token.LetKeyword) {
    if ((parser.token & 0b00000010001001110000000000000000) !== 0) {
      if (parser.token === Token.InKeyword) {
        if (context & Context.Strict) report(parser, Errors.DisallowedLetInStrict);
        init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      } else {
        kind = BindingKind.Let;
      }
      parser.assignable = 1;
    } else {
      if (context & Context.Strict) report(parser, Errors.DisallowedLetInStrict);

      init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

      parser.assignable = 1;

      init = parseMemberExpression(parser, context, init, 1, 0, start, line, column);

      isLet = true;
    }
  } else {
    parser.assignable = 1;
    kind = token === Token.VarKeyword ? BindingKind.Variable : BindingKind.Const;
  }

  if ((kind & 0b00000000000000000000000000110010) > 0) {
    const declarations: Types.VariableDeclarator[] = [];

    let bindingCount = 0;
    let type: BindingKind;
    while (parser.token !== Token.Comma) {
      const { tokenValue, start, line, column, token } = parser;
      type =
        kind |
        ((token & 0b00000010000000000000000000000000) === 0b00000010000000000000000000000000 ? BindingKind.Pattern : 0);

      let id;
      let init: Types.Expression | null = null;

      if ((token & 0b00000000001001110000000000000000) !== 0) {
        id = parseAndClassifyIdentifier(
          parser,
          context,
          scope,
          token,
          tokenValue,
          kind,
          origin,
          1,
          start,
          line,
          column
        );

        if (parser.token === Token.Assign) {
          nextToken(parser, context, /* allowRegExp */ 1);
          init = parseExpression(parser, context | 0b00000000000000000010000000000000, 0);

          if ((parser.token & 0b00000000010000000000000000000000) === 0b00000000010000000000000000000000) {
            if ((parser.token as Token) === Token.OfKeyword) report(parser, Errors.ForInOfLoopInitializer, 'of');
            if (
              ((parser.token as Token) === Token.InKeyword &&
                (kind & 0b00000000000000000000000000000010) !== 0b00000000000000000000000000000010) ||
              (context & 0b00000000000000000000010000010000) > 0
            ) {
              report(parser, Errors.ForInOfLoopInitializer, 'in');
            }
          }
        } else if (
          (type & 0b00000000000000000000010000100000) !== 0 &&
          (parser.token & 0b00000000010000000000000000000000) !== 0b00000000010000000000000000000000
        ) {
          report(parser, Errors.DeclarationMissingInitializer, kind & BindingKind.Const ? 'const' : 'destructuring');
        }
      } else if ((token & 0b00000010000000000000000000000000) === 0b00000010000000000000000000000000) {
        id =
          parser.token === Token.LeftBracket
            ? parseArrayExpressionOrPattern(
                parser,
                context | 0b00000000000000000010000000000000,
                scope,
                1,
                1,
                0,
                kind,
                origin,
                start,
                line,
                column
              )
            : parseObjectLiteralOrPattern(
                parser,
                context | 0b00000000000000000010000000000000,
                scope,
                1,
                1,
                0,
                kind,
                origin,
                start,
                line,
                column
              );

        if ((parser.flags & 0b00000000000000000000000000001100) > 0) {
          report(parser, Errors.InvalidBindingDestruct);
        }

        if (parser.token === Token.Assign) {
          nextToken(parser, context, /* allowRegExp */ 1);

          init = parseExpression(parser, context | 0b00000000000000000010000000000000, 0);

          if ((parser.token & 0b00000000010000000000000000000000) === 0b00000000010000000000000000000000) {
            report(parser, Errors.ForInOfLoopInitializer, (parser.token as Token) === Token.OfKeyword ? 'of' : 'in');
          }
        } else if (
          (type & 0b00000000000000000000010000100000) !== 0 &&
          (parser.token & 0b00000000010000000000000000000000) !== 0b00000000010000000000000000000000
        ) {
          report(parser, Errors.DeclarationMissingInitializer, kind & BindingKind.Const ? 'const' : 'destructuring');
        }
      }

      declarations.push(
        context & Context.OptionsLoc
          ? {
              type: 'VariableDeclarator',
              init,
              id,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'VariableDeclarator',
              init,
              id
            }
      );

      bindingCount++;

      parser.assignable = 1;

      if ((parser.token as Token) !== Token.Comma) break;

      consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1);
    }

    if (
      bindingCount > 1 &&
      (parser.token & 0b00000000010000000000000000000000) === 0b00000000010000000000000000000000
    ) {
      report(parser, Errors.ForInOfLoopMultiBindings);
    }

    init =
      context & Context.OptionsLoc
        ? {
            type: 'VariableDeclaration',
            kind: kind & BindingKind.Let ? 'let' : kind & BindingKind.Const ? 'const' : 'var',
            declarations,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'VariableDeclaration',
            kind,
            declarations
          };
  }

  if (parser.token === Token.OfKeyword) {
    // `for of` only allows LeftHandSideExpressions which do not start with `let`, and no other production matches
    if (isLet) report(parser, Errors.ForOfLet);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpression(parser, context, 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return context & Context.OptionsLoc
      ? {
          type: 'ForOfStatement',
          body,
          left: init,
          right,
          await: false,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: 'ForOfStatement',
          body,
          left: init,
          right,
          await: false
        };
  }

  if (parser.token === Token.InKeyword) {
    if ((parser.assignable as 0 | 1) === 0) report(parser, Errors.CantAssignToInOfForLoop, 'in');
    if (isAwait === 1) report(parser, Errors.Unexpected);
    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context, 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return context & Context.OptionsLoc
      ? {
          type: 'ForInStatement',
          body,
          left: init,
          right,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: 'ForInStatement',
          body,
          left: init,
          right
        };
  }
  init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);

  if (parser.token === Token.Comma) {
    init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);
  }

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context, 0);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

  return context & Context.OptionsLoc
    ? {
        type: 'ForStatement',
        body,
        init,
        test,
        update,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'ForStatement',
        body,
        init,
        test,
        update
      };
}

export function parseForStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any
): Types.ForStatement | Types.ForInStatement | Types.ForOfStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);
  // Create a lexical scope node around the whole ForStatement
  const isAwait =
    (context & Context.InAwaitContext) > 0 && consumeOpt(parser, context, Token.AwaitKeyword, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  scope = {
    parent: scope,
    type: ScopeKind.Block,
    scopeError: void 0
  };

  let test: Types.Expression | null = null;
  let update: Types.Expression | null = null;
  let init = null;
  let right;
  let conjuncted = Flags.Empty;

  const origin = Origin.ForStatement;

  const kind: BindingKind = BindingKind.Tail;

  const { token, start, line, column } = parser;

  if (token === Token.VarKeyword || token === Token.LetKeyword || token === Token.ConstKeyword) {
    return parseForStatementWithVariableDeclarations(
      parser,
      context,
      scope,
      isAwait,
      labels,
      curStart,
      curLine,
      curColumn
    ) as Types.ForInStatement | Types.ForOfStatement | Types.ForStatement;
  }

  if ((token & Token.IsPatternStart) === Token.IsPatternStart) {
    init =
      token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(parser, context, scope, 1, 0, 0, kind, origin, start, line, column)
        : parseArrayExpressionOrPattern(parser, context, scope, 1, 0, 0, kind, origin, start, line, column);

    conjuncted = parser.flags;

    if ((context & Context.OptionsDisableWebCompat) === 0 && conjuncted & Flags.SeenProto) {
      report(parser, Errors.DuplicateProto);
    }

    parser.assignable = (conjuncted & Flags.NotDestructible) === Flags.NotDestructible ? 0 : 1;

    init = parseMemberExpression(parser, context, init, 1, 0, parser.start, parser.line, parser.column);

    conjuncted = parser.flags;
  } else if (token === Token.Semicolon) {
    if (isAwait === 1) report(parser, Errors.Unexpected);
  } else {
    init = parseLeftHandSideExpression(parser, context | 0b00000000000000000010000000000000, 0, /* allowLHS */ 1, 1);
  }

  if (parser.token === Token.OfKeyword) {
    if (parser.assignable === 0) report(parser, Errors.CantAssignToInOfForLoop, isAwait === 1 ? 'await' : 'of');

    reinterpretToPattern(parser, init);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpression(parser, context, 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return context & Context.OptionsLoc
      ? {
          type: 'ForOfStatement',
          body,
          left: init,
          right,
          await: isAwait === 1,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: 'ForOfStatement',
          body,
          left: init,
          right,
          await: isAwait === 1
        };
  }

  if (parser.token === Token.InKeyword) {
    if (parser.assignable === 0) report(parser, Errors.CantAssignToInOfForLoop, 'in');
    if (isAwait === 1) report(parser, Errors.Unexpected);
    reinterpretToPattern(parser, init);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context, 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return context & Context.OptionsLoc
      ? {
          type: 'ForInStatement',
          body,
          left: init,
          right,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: 'ForInStatement',
          body,
          left: init,
          right
        };
  }

  if (isAwait === 1) report(parser, Errors.Unexpected);

  if (parser.token === Token.Assign) {
    if ((token & Token.IsPatternStart) === Token.IsPatternStart) reinterpretToPattern(parser, init);
    init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);
  } else {
    if ((conjuncted & Flags.MustDestruct) === Flags.MustDestruct) {
      report(parser, Errors.CantAssignToInOfForLoop, 'loop');
    }
    init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);
  }

  if (parser.token === Token.Comma)
    init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context, 0);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

  return context & Context.OptionsLoc
    ? {
        type: 'ForStatement',
        body,
        init,
        test,
        update,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'ForStatement',
        body,
        init,
        test,
        update
      };
}

export function parseDoWhileStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabel: any
): Types.DoWhileStatement {
  // DoStatement ::
  //   'do' Statement 'while' '(' Expression ')' ';'

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, Origin.None, labels, nestedLabel, 0);

  consume(parser, context, Token.WhileKeyword, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const test = parseExpressions(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  // Allow do-statements to be terminated with and without
  // semi-colons. This allows code such as 'do;while(0)return' to
  // parse, which would not be the case if we had used the
  // expectSemicolon() functionality here.
  consumeOpt(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  return context & Context.OptionsLoc
    ? {
        type: 'DoWhileStatement',
        body,
        start,
        test,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'DoWhileStatement',
        body,
        test
      };
}

export function parseWhileStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabels: any
): Types.WhileStatement {
  // WhileStatement ::
  //   'while' '(' Expression ')' Statement
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);
  const test = parseExpressions(
    parser,
    (context | 0b00000000000000000010000000000000) ^ 0b00000000000000000010000000000000,
    0
  );
  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);
  const body = parseStatement(parser, context | Context.InIteration, scope, Origin.None, labels, nestedLabels, 0);

  return context & Context.OptionsLoc
    ? {
        type: 'WhileStatement',
        test,
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'WhileStatement',
        test,
        body
      };
}

export function parseSwitchStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabels: any
): Types.SwitchStatement {
  // SwitchStatement ::
  //   'switch' '(' Expression ')' '{' CaseClause* '}'
  // CaseClause ::
  //   'case' Expression ':' StatementList
  //   'default' ':' StatementList
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const discriminant = parseExpressions(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 0);

  const cases: Types.SwitchCase[] = [];

  let seenDefault: 0 | 1 = 0;

  scope = {
    parent: scope,
    type: ScopeKind.None,
    scopeError: void 0
  };

  while (parser.token !== Token.RightBrace) {
    const { start, line, column } = parser;
    const consequent: Types.Statement[] = [];
    const test: Types.Expression | null = consumeOpt(parser, context, Token.CaseKeyword, /* allowRegExp */ 1)
      ? parseExpressions(parser, context, 0)
      : null;

    if (parser.token === Token.DefaultKeyword) {
      nextToken(parser, context, /* allowRegExp */ 1);
      if (seenDefault === 1) report(parser, Errors.MultipleDefaultsInSwitch);
      seenDefault = 1;
    }
    consume(parser, context, Token.Colon, /* allowRegExp */ 1);

    while (
      parser.token !== Token.CaseKeyword &&
      (parser.token as Token) !== Token.RightBrace &&
      parser.token !== Token.DefaultKeyword
    ) {
      consequent.push(
        parseStatementListItem(parser, context | Context.InSwitch, scope, Origin.BlockStatement, labels, nestedLabels)
      );
    }

    cases.push(
      context & Context.OptionsLoc
        ? {
            type: 'SwitchCase',
            test,
            consequent,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'SwitchCase',
            test,
            consequent
          }
    );
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ 1);

  return context & Context.OptionsLoc
    ? {
        type: 'SwitchStatement',
        discriminant,
        cases,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'SwitchStatement',
        discriminant,
        cases
      };
}

export function parseIfStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any
): Types.IfStatement {
  // IfStatement ::
  //   'if' '(' Expression ')' Statement ('else' Statement)?

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);
  const test = parseExpressions(
    parser,
    (context | 0b00000000000000000010000000000000) ^ 0b00000000000000000010000000000000,
    0
  );
  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);
  const consequent = parseConsequentOrAlternative(parser, context, scope, labels);
  const alternate = consumeOpt(parser, context, Token.ElseKeyword, /* allowRegExp */ 1)
    ? parseConsequentOrAlternative(parser, context, scope, labels)
    : null;
  return context & Context.OptionsLoc
    ? {
        type: 'IfStatement',
        test,
        consequent,
        alternate,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'IfStatement',
        test,
        consequent,
        alternate
      };
}

/**
 * Parse either consequent or alternate.
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param start Start pos of node
 * @param line
 * @param column
 */
export function parseConsequentOrAlternative(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any
): any {
  // Disallow if web compability is off
  return (context & 0b00000000000000000000010000010000) > 0 || parser.token !== Token.FunctionKeyword
    ? parseStatement(parser, context, scope, Origin.None, labels, null, 0)
    : parseFunctionDeclaration(
        parser,
        context,
        {
          parent: scope,
          type: ScopeKind.Block,
          scopeError: void 0
        },
        0,
        0,
        Origin.Statement
      );
}

export function parseThrowStatement(parser: ParserState, context: Context): Types.ThrowStatement {
  // ThrowStatement ::
  //   'throw' Expression ';'
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);

  if (parser.newLine !== 0) report(parser, Errors.NewlineAfterThrow);

  const argument: any = parseExpressions(parser, context, 0);

  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'ThrowStatement',
        argument,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ThrowStatement',
        argument
      };
}

export function parseBreakStatement(parser: ParserState, context: Context, labels: any): Types.BreakStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);
  let label: Types.Identifier | null = null;
  if (parser.newLine === 0 && (parser.token & Token.IsAutoSemicolon) === 0) {
    const { tokenValue, start, line, column } = parser;

    nextToken(parser, context, /* allowRegExp */ 1);

    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

    if (isValidBreakLabel(parser, labels, tokenValue) === 0) report(parser, Errors.UnknownLabel, tokenValue);
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    report(parser, Errors.InvalidBreak);
  }

  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'BreakStatement',
        label,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'BreakStatement',
        label
      };
}

export function parseContinueStatement(parser: ParserState, context: Context, labels: any): Types.ContinueStatement {
  // ContinueStatement ::
  //   'continue' Identifier? ';'
  if ((context & Context.InIteration) === 0) report(parser, Errors.IllegalContinue);
  const { start: curStart, line: curLine, column: curColumn } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);

  let label: Types.Identifier | null = null;
  if (parser.newLine === 0 && (parser.token & Token.IsAutoSemicolon) !== Token.IsAutoSemicolon) {
    const { tokenValue, start, line, column } = parser;
    nextToken(parser, context, /* allowRegExp */ 1);
    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

    let found: 0 | 1 = 0;
    let iterationLabel: any;

    l: while (labels) {
      if (labels.iterationLabels) {
        iterationLabel = labels.iterationLabels;
        for (let i = 0; i < iterationLabel.length; i++) {
          if (iterationLabel[i] === tokenValue) {
            found = 1;
            break l;
          }
        }
      }
      labels = labels.parentLabels;
    }

    if (found === 0) {
      report(parser, Errors.UnknownLabel, tokenValue);
    }
  }
  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'ContinueStatement',
        label,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'ContinueStatement',
        label
      };
}

export function parseTryStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any
): Types.TryStatement {
  // TryStatement ::
  //   'try' Block Catch
  //   'try' Block Finally
  //   'try' Block Catch Finally
  //
  // Catch ::
  //   'catch' '(' Identifier ')' Block
  //
  // Finally ::
  //   'finally' Block

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  const block = parseBlock(
    parser,
    context,
    {
      parent: scope,
      type: ScopeKind.Block,
      scopeError: void 0
    },
    labels,
    null
  );

  let handler: Types.CatchClause | null = null;

  if (parser.token === Token.CatchKeyword) {
    const { start, line, column } = parser;

    nextToken(parser, context, /* allowRegExp */ 1);

    let param: Types.ArrayPattern | Types.ObjectPattern | Types.Identifier | null = null;
    let additionalScope: ScopeState = scope;

    if ((parser.token as Token) === Token.LeftParen) {
      nextToken(parser, context, /* allowRegExp */ 0);

      scope = {
        parent: scope,
        type: ScopeKind.Block,
        scopeError: void 0
      };

      param = parseBindingPattern(
        parser,
        context,
        scope,
        (parser.token & Token.IsPatternStart) > 0 ? BindingKind.CatchPattern : BindingKind.CatchIdentifier,
        Origin.None
      );

      consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

      additionalScope = {
        parent: scope,
        type: ScopeKind.CatchBlock,
        scopeError: void 0
      };
    }

    const body = parseBlock(parser, context, additionalScope, labels, null);

    handler =
      context & Context.OptionsLoc
        ? {
            type: 'CatchClause',
            param,
            body,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'CatchClause',
            param,
            body
          };
  }

  const finalizer: Types.BlockStatement | null = consumeOpt(parser, context, Token.FinallyKeyword, /* allowRegExp */ 0)
    ? parseBlock(
        parser,
        context,
        {
          parent: scope,
          type: ScopeKind.Block,
          scopeError: void 0
        },
        labels,
        null
      )
    : null;

  if (!handler && !finalizer) {
    report(parser, Errors.NoCatchOrFinally);
  }

  return context & Context.OptionsLoc
    ? {
        type: 'TryStatement',
        block,
        handler,
        finalizer: finalizer,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'TryStatement',
        block,
        handler,
        finalizer
      };
}

export function parseWithStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabels: any
): Types.WithStatement {
  // WithStatement ::
  //   'with' '(' Expression ')' Statement
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (context & Context.Strict) report(parser, Errors.StrictWith);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const object = parseExpressions(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(parser, context, scope, Origin.None, labels, nestedLabels, 0);

  return context & Context.OptionsLoc
    ? {
        type: 'WithStatement',
        object,
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'WithStatement',
        object,
        body
      };
}

export function parseDebuggerStatement(parser: ParserState, context: Context): Types.DebuggerStatement {
  // DebuggerStatement ::
  //   'debugger' ';'
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);
  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'DebuggerStatement',
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'DebuggerStatement'
      };
}

export function parseLetIdentOrVarDeclarationStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: any,
  nestedLabels: any,
  origin: Origin
): Types.VariableDeclaration | Types.LabeledStatement | Types.ExpressionStatement {
  const { token, tokenValue, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  if ((parser.token & 0b00000010001001110000000000000000) > 0) {
    /* VariableDeclarations ::
     *  ('let') (Identifier ('=' AssignmentExpression)?)+[',']
     */

    const declarations = parseVariableDeclarationListAndDeclarator(
      parser,
      context,
      scope,
      BindingKind.Let,
      Origin.None
    );

    expectSemicolon(parser, context);

    return context & Context.OptionsLoc
      ? {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations
        };
  }

  // 'Let' as identifier
  parser.assignable = 1;

  if (context & Context.Strict) report(parser, Errors.UnexpectedLetStrictReserved);

  let expr: any = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

  if (parser.token === Token.Colon) {
    return parseLabelledStatement(
      parser,
      context,
      scope,
      origin,
      labels,
      nestedLabels,
      tokenValue,
      token,
      expr,
      0,
      start,
      line,
      column
    );
  }

  if (parser.token === Token.Arrow) {
    expr = parseAsyncArrowIdentifier(
      parser,
      context,
      {
        parent: {
          parent: void 0,
          type: ScopeKind.Block
        },
        type: ScopeKind.ArrowParams,
        scopeError: void 0
      },
      /* isAsync */ 0,
      tokenValue,
      token,
      expr,
      start,
      line,
      column
    );
  } else {
    expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

    expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);
  }

  if (parser.token === Token.Comma) {
    expr = parseSequenceExpression(parser, context, expr, start, line, column);
  }

  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseExpressionOrLabelledStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: any,
  nestedLabels: any,
  allowFuncDecl: 0 | 1
): Types.LabeledStatement | Types.ExpressionStatement {
  const { tokenValue, token, start, line, column } = parser;

  let expr = parsePrimaryExpression(parser, context, BindingKind.None, 0, /* allowLHS */ 1, 1, 0, start, line, column);

  if (token === Token.LetKeyword && parser.token === Token.LeftBracket) report(parser, Errors.Unexpected);

  if (parser.token === Token.Colon) {
    return parseLabelledStatement(
      parser,
      context,
      scope,
      origin,
      labels,
      nestedLabels,
      tokenValue,
      token,
      expr,
      allowFuncDecl,
      start,
      line,
      column
    );
  }

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  return parseExpressionStatement(
    parser,
    context,
    parser.token === Token.Comma ? parseSequenceExpression(parser, context, expr, start, line, column) : expr,
    start,
    line,
    column
  );
}
