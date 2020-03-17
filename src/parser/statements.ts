import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as Types from './types';
import { ScopeState, ScopeKind, createParentScope } from './scope';
import {
  parseVariableDeclarationListAndDeclarator,
  parseFunctionDeclaration,
  parseClassDeclaration,
  parseHoistableDeclaration,
  parseVariableStatementOrLexicalDeclaration,
  parseDynamicImportStatement,
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
  parseIdentifierFromValue,
  parseAsyncArrowOrCallExpression,
  parseObjectLiteralOrPattern,
  parseArrayExpressionOrPattern,
  parseLeftHandSideExpression,
  parseAndClassifyIdentifier,
  parseBindingPattern,
  parsePatternStart,
  parseNonDirectiveExpression,
  parseAsyncArrow
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
  checkBreakStatement,
  checkContinueStatement,
  reinterpretToPattern,
  addLabel,
  parseStatementWithLabelSet,
  nextLiteralExactlyEquals,
  validateIdentifier,
  Label,
  isVarDecl
} from './common';

export function parseStatementList(parser: ParserState, context: Context, scope: ScopeState): Types.Statement[] {
  // StatementList ::
  //   (StatementListItem)* <end_token>

  const statements: Types.Statement[] = [];

  let expr: Types.Literal | Types.Expression;

  while (parser.token === Token.StringLiteral) {
    const { index, start, line, column, tokenValue } = parser;

    expr = parseLiteral(parser, context);

    if (nextLiteralExactlyEquals(parser, index, start, tokenValue)) {
      context |= Context.Strict;
    }

    statements.push(parseNonDirectiveExpression(parser, context, expr, index, start, line, column));
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
  nestedLabels: Label[] | null
): Types.Statement {
  switch (parser.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(parser, context, scope, 0, 0, origin);
    case Token.AsyncKeyword:
      return parseAsyncStatement(parser, context, scope, origin, labels, 1);
    case Token.ClassKeyword:
      return parseClassDeclaration(parser, context, scope, /* isHoisted */ 0, /* isExported */ 0);
    case Token.ConstKeyword:
      return parseVariableStatementOrLexicalDeclaration(parser, context, scope, BindingKind.Const, Origin.None);
    case Token.LetKeyword:
      return parseLetIdentOrVarDeclarationStatement(parser, context, scope, labels, nestedLabels, origin);
    case Token.ImportKeyword:
      return parseImportDeclaration(parser, context);
    case Token.ExportKeyword:
      report(parser, Errors.Unexpected, 'export');
    // falls through
    default:
      return parseStatement(parser, context, scope, origin, labels, nestedLabels, 1);
  }
}

export function parseStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: Label[],
  nestedLabels: Label[] | null,
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
      return parseBlock(parser, context, scope, /* isCatchClause */ 0, labels, nestedLabels);
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
      return parseAsyncStatement(parser, context, scope, origin, labels, 0);
    case Token.WhileKeyword:
      return parseWhileStatement(parser, context, scope, labels, nestedLabels);
    case Token.WithKeyword:
      return parseWithStatement(parser, context, scope, labels, nestedLabels);
    case Token.FunctionKeyword:
      report(parser, (context & Context.Strict) === Context.Strict ? Errors.StrictFunction : Errors.SloppyFunction);
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
  labels: Label[],
  nestedLabels: Label[] | null,
  value: string,
  token: Token,
  expr: Types.Identifier,
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
    // Disallow if in strict mode, or if the web compability is off ( B.3.2 )
    (context & 0b00000000000000000000010000010000) > 0 ||
    parser.token !== Token.FunctionKeyword
      ? parseStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl)
      : parseFunctionDeclaration(parser, context, scope, 0, 0, origin | Origin.Statement);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

export function parseImportDeclaration(parser: ParserState, context: Context): Types.Statement {
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.token === Token.LeftParen) {
    return parseDynamicImportStatement(parser, context, start, line, column);
  }

  if (parser.token === Token.Period) {
    return parseImportMetaDeclaration(parser, context, start, line, column);
  }

  report(parser, Errors.InvalidImportExportSloppy, 'import');
}

export function parseAsyncStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: Label[],
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

  let expr: Types.Expression;

  if (asyncNewLine === 0) {
    // async function ...
    if (parser.token === Token.FunctionKeyword) {
      if (allowFuncDecl === 0) report(parser, Errors.AsyncFunctionInSingleStatementContext);
      return parseHoistableDeclaration(parser, context, scope, 0, 1, origin, start, line, column);
    }

    // async Identifier => ...

    if ((parser.token & 0b00000000001001010000000000000000) > 0) {
      expr = parseAsyncArrow(
        parser,
        context,
        1,
        parser.tokenValue,
        parser.token,
        parseIdentifier(parser, context),
        start,
        line,
        column
      );

      return parseExpressionStatement(
        parser,
        context,
        parseSequenceExpression(parser, context, expr, start, line, column),
        start,
        line,
        column
      );
    }
  }

  expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

  if (parser.token === Token.LeftParen) {
    // '\u0061sync () => {}'
    if (parser.containsEscapes === 1) report(parser, Errors.EscapedKeyword);

    expr = parseAsyncArrowOrCallExpression(
      parser,
      context,
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
      expr = parseAsyncArrow(parser, context, /* isAsync */ 1, 'async', parser.token, expr, start, line, column);
    }

    parser.assignable = 1;
  }

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  expr = parseSequenceExpression(parser, context, expr, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseBlock(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  isCatchClause: 0 | 1,
  labels: Label[],
  nestedLabels: Label[] | null
): Types.BlockStatement {
  // Block ::
  //   '{' StatementList '}'
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  if (isCatchClause === 0) scope = createParentScope(scope, ScopeKind.Block);

  const body: Types.Statement[] = [];

  while (parser.token !== Token.RightBrace) {
    body.push(parseStatementListItem(parser, context, scope, Origin.BlockStatement, labels, nestedLabels));
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ 1);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
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
  let isLet: 0 | 1 = 0;
  let isLetAsIdent: 0 | 1 = 0;

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
      isLetAsIdent = isLet = 1;
    }
  } else {
    parser.assignable = 1;

    kind = token === Token.VarKeyword ? BindingKind.Variable : BindingKind.Const;
  }

  if ((kind & 0b00000000000000000000000000110010) > 0) {
    const declarations: Types.VariableDeclarator[] = [];

    let binding = 0;
    let type;
    let id;

    while (parser.token !== Token.Comma) {
      const { tokenValue, start, line, column, token } = parser;

      type =
        kind |
        ((token & 0b00000010000000000000000000000000) === 0b00000010000000000000000000000000 ? BindingKind.Pattern : 0);

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
        (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

      binding++;

      parser.assignable = 1;

      if ((parser.token as Token) !== Token.Comma) break;

      consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1);
    }

    if (binding > 1 && (parser.token & 0b00000000010000000000000000000000) === 0b00000000010000000000000000000000) {
      report(parser, Errors.ForInOfLoopMultiBindings);
    }

    init =
      (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
    if (isLet === 1) report(parser, Errors.ForOfLet);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpression(parser, context, /* inGroup */ 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(
      parser,
      context | Context.InIteration,
      scope,
      origin,
      labels,
      null,
      /* allowFuncDecl */ 0
    );

    return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

    if (isAwait === 1) report(parser, Errors.InvalidForAwait);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context, /* inGroup */ 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(
      parser,
      context | Context.InIteration,
      scope,
      origin,
      labels,
      null,
      /* allowFuncDecl */ 0
    );

    return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  // Note: Only valid in cases where 'let' is seen as an identifier
  //
  // Example:
  //
  //    for (let=10;;);
  //
  if (isLetAsIdent === 1) init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);

  init = parseSequenceExpression(parser, context, init as Types.Expression, parser.start, parser.line, parser.column);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context, /* inGroup */ 0);

  nextToken(parser, context, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context, /* inGroup */ 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(
    parser,
    context | Context.InIteration,
    scope,
    origin,
    labels,
    null,
    /* allowFuncDecl */ 0
  );

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[]
): Types.ForStatement | Types.ForInStatement | Types.ForOfStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  const isAwait =
    (context & Context.InAwaitContext) === Context.InAwaitContext &&
    consumeOpt(parser, context, Token.AwaitKeyword, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  // Create a lexical scope node around the whole ForStatement
  scope = createParentScope(scope, ScopeKind.Block);

  let test: Types.Expression | null = null;
  let update: Types.Expression | null = null;
  let init = null;
  let right;
  let bindable = Flags.Empty;

  const origin = Origin.ForStatement;

  const kind: BindingKind = BindingKind.Tail;

  const { token, start, line, column } = parser;

  if (isVarDecl(token)) {
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
    init = parsePatternStart(parser, context, scope, 1, 0, 0, token, kind, origin, start, line, column);

    if (parser.token & Token.IsAssignOp) {
      if (parser.token !== Token.Assign) report(parser, Errors.InvalidCompoundAssign);
    }

    bindable = parser.flags;

    if ((context & Context.OptionsDisableWebCompat) === 0 && bindable & Flags.SeenProto) {
      report(parser, Errors.DuplicateProto);
    }

    parser.assignable = (bindable & Flags.NotDestructible) === Flags.NotDestructible ? 0 : 1;

    init = parseMemberExpression(parser, context, init, 1, 0, parser.start, parser.line, parser.column);

    bindable = parser.flags;
  } else if (token === Token.Semicolon) {
    if (isAwait === 1) report(parser, Errors.InvalidForAwait);
  } else {
    init = parseLeftHandSideExpression(parser, context | 0b00000000000000000010000000000000, 0, /* allowLHS */ 1, 1);
  }

  if (parser.token === Token.OfKeyword) {
    if (parser.assignable === 0) report(parser, Errors.CantAssignToInOfForLoop, isAwait === 1 ? 'await' : 'of');

    if (parser.containsEscapes === 1) report(parser, Errors.EscapedKeyword);

    reinterpretToPattern(parser, init);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpression(parser, context, /* inGroup */ 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

    if (isAwait === 1) report(parser, Errors.InvalidForAwait);

    reinterpretToPattern(parser, init);

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context, /* inGroup */ 0);

    consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

    const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

    return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  if (isAwait === 1) report(parser, Errors.InvalidForAwait);

  if (parser.token === Token.Assign) {
    if ((token & Token.IsPatternStart) === Token.IsPatternStart) reinterpretToPattern(parser, init);
    init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);
  } else {
    if ((bindable & Flags.MustDestruct) === Flags.MustDestruct) {
      report(parser, Errors.CantAssignToInOfForLoop, 'loop');
    }
    init = parseAssignmentExpression(parser, context, 0, 0, init, start, line, column);
  }

  init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context, 0);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context, /* inGroup */ 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
  nestedLabels: Label[] | null
): Types.WhileStatement {
  // WhileStatement ::
  //   'while' '(' Expression ')' Statement
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const test = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, Origin.None, labels, nestedLabels, 0);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
  nestedLabels: Label[] | null
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

  scope = createParentScope(scope, ScopeKind.None);

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
      (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[]
): Types.IfStatement {
  // IfStatement ::
  //   'if' '(' Expression ')' Statement ('else' Statement)?

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const test = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  const consequent = parseConsequentOrAlternative(parser, context, scope, labels);

  const alternate = consumeOpt(parser, context, Token.ElseKeyword, /* allowRegExp */ 1)
    ? parseConsequentOrAlternative(parser, context, scope, labels)
    : null;
  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

export function parseConsequentOrAlternative(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  labels: Label[]
): Types.Statement | Types.FunctionDeclaration {
  // Disallow function declarations under if / else in strict mode, or
  // if the web compability is off ( B.3.4 )
  return (context & 0b00000000000000000000010000010000) > 0 || parser.token !== Token.FunctionKeyword
    ? parseStatement(parser, context, scope, Origin.None, labels, null, 0)
    : parseFunctionDeclaration(parser, context, createParentScope(scope, ScopeKind.Block), 0, 0, Origin.Statement);
}

export function parseThrowStatement(parser: ParserState, context: Context): Types.ThrowStatement {
  // ThrowStatement ::
  //   'throw' Expression ';'
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);

  if (parser.newLine !== 0) report(parser, Errors.NewlineAfterThrow);

  const argument: any = parseExpressions(parser, context, 0);

  expectSemicolon(parser, context);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

export function parseBreakStatement(parser: ParserState, context: Context, labels: Label[]): Types.BreakStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  let label: Types.Identifier | null = null;

  if (parser.newLine === 0 && (parser.token & 0b00000000001001110000000000000000) > 0) {
    const { tokenValue, start, line, column } = parser;
    nextToken(parser, context, 1);
    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
    if (checkBreakStatement(parser, labels, tokenValue) === 0) {
      report(parser, Errors.UnknownLabel, tokenValue);
    }
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    report(parser, Errors.InvalidBreak);
  }

  expectSemicolon(parser, context);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

export function parseContinueStatement(
  parser: ParserState,
  context: Context,
  labels: Label[]
): Types.ContinueStatement {
  if ((context & Context.InIteration) === 0) report(parser, Errors.IllegalContinue);

  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  let label: Types.Identifier | null = null;

  if (parser.newLine === 0 && (parser.token & 0b00000000001001110000000000000000) > 0) {
    const { tokenValue, start, line, column } = parser;
    nextToken(parser, context, 1);
    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
    if (checkContinueStatement(labels, tokenValue) === 0) {
      report(parser, Errors.UnknownLabel, tokenValue);
    }
  }
  expectSemicolon(parser, context);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[]
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

  const block = parseBlock(parser, context, scope, /* isCatchClause */ 0, labels, null);

  let handler: Types.CatchClause | null = null;

  if (parser.token === Token.CatchKeyword) {
    const { start, line, column } = parser;

    nextToken(parser, context, /* allowRegExp */ 1);

    let param: Types.ArrayPattern | Types.ObjectPattern | Types.Identifier | null = null;
    let catchScope: ScopeState = scope;

    if ((parser.token as Token) === Token.LeftParen) {
      nextToken(parser, context, /* allowRegExp */ 0);

      scope = createParentScope(scope, ScopeKind.Block);

      param = parseBindingPattern(
        parser,
        context,
        scope,
        (parser.token & Token.IsPatternStart) > 0 ? BindingKind.CatchPattern : BindingKind.CatchIdentifier,
        Origin.None
      );

      consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

      catchScope = createParentScope(scope, ScopeKind.CatchBlock);
    }

    const body = parseBlock(parser, context, catchScope, /* isCatchClause */ 1, labels, null);

    handler =
      (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
    ? parseBlock(parser, context, scope, /* isCatchClause */ 0, labels, null)
    : null;

  if (!handler && !finalizer) {
    report(parser, Errors.NoCatchOrFinally);
  }

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
  nestedLabels: Label[] | null
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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
  labels: Label[],
  nestedLabels: Label[] | null,
  origin: Origin
): Types.VariableDeclaration | Types.LabeledStatement | Types.ExpressionStatement {
  const { token, tokenValue, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  if ((parser.token & 0b00000010001001110000000000000000) > 0 && parser.containsEscapes === 0) {
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

    return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
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

  if (context & Context.Strict) report(parser, Errors.StrictInvalidLetInExprPos);

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
    return parseLetAsArrow(parser, context, tokenValue, token, expr, start, line, column);
  }

  // 'le\\u0074 x = 5', 'l\\u0065t\na',
  if (parser.containsEscapes === 1) report(parser, Errors.EscapedKeyword);

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  expr = parseSequenceExpression(parser, context, expr, start, line, column);

  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseLetAsArrow(
  parser: ParserState,
  context: Context,
  value: string,
  t: Token,
  expr: any,
  start: number,
  line: number,
  column: number
) {
  expr = parseAsyncArrow(parser, context, /* isAsync */ 0, value, t, expr, start, line, column);
  expr = parseSequenceExpression(parser, context, expr, start, line, column);

  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseExpressionOrLabelledStatement(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: Label[],
  nestedLabels: Label[] | null,
  allowFuncDecl: 0 | 1
): Types.LabeledStatement | Types.ExpressionStatement {
  const { tokenValue, token, start, line, column } = parser;

  let expr: any;

  switch (token) {
    case Token.LetKeyword:
      nextToken(parser, context, /* allowReg*/ 0);
      // 'let' followed by '[' means a lexical declaration, which should not appear here.
      if (parser.token === Token.LeftBracket) report(parser, Errors.RestricedLetProduction);
      expr = parseIdentifierFromValue(parser, context, 'let', start, line, column);
      break;
    default:
      expr = parsePrimaryExpression(parser, context, BindingKind.None, 0, /* allowLHS */ 1, 1, 0, start, line, column);
  }

  if ((token & 0b00000000001001010000000000000000) > 0 && parser.token === Token.Colon) {
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
    parseSequenceExpression(parser, context, expr, start, line, column),
    start,
    line,
    column
  );
}

export function parseExpressionStatement(
  parser: ParserState,
  context: Context,
  expression: any,
  start: number,
  line: number,
  column: number
): Types.ExpressionStatement {
  expectSemicolon(parser, context);

  return (context & 0b00000000000000000000000000000010) === 0b00000000000000000000000000000010
    ? {
        type: 'ExpressionStatement',
        expression,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ExpressionStatement',
        expression
      };
}
