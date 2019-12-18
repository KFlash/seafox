import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import { ScopeState, newScope, ScopeKind } from './scope';
import {
  parseVariableDeclarationListAndDeclarator,
  parseFunctionDeclaration,
  parseClassDeclaration,
  parseFunctionDeclarationRest,
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
  parseArrowFunctionExpression,
  parseAsyncArrowOrCallExpression,
  parseObjectLiteralOrPattern,
  parseArrayExpressionOrPattern,
  parseLeftHandSideExpression,
  parseAndClassifyIdentifier,
  parseBindingPattern,
  parseAsyncArrowIdentifier
} from './expressions';
import {
  Context,
  ParserState,
  consumeSemicolon,
  consume,
  consumeOpt,
  setLoc,
  validateBreakLabel,
  validateContinueLabel,
  reinterpretToPattern,
  Origin,
  BindingKind,
  addLabel,
  parseStatementWithLabelSet,
  isExactlyStrictDirective,
  FunctionFlag,
  DestructuringKind,
  Flags
} from './common';

export function parseStatementList(parser: ParserState, context: Context, scope: ScopeState): ESTree.Statement[] {
  const statements: any[] = [];
  const allowDirectives = context & Context.OptionsDirectives;
  let isStrictDirective: 0 | 1 = 0;

  while (parser.token === Token.StringLiteral) {
    const { index, start, line, column, tokenValue, isUnicodeEscape } = parser;
    let expression = parseLiteral(parser, context);
    if (isExactlyStrictDirective(parser, index, start, tokenValue)) {
      isStrictDirective = 1;
      context |= Context.Strict;
    }

    if (isStrictDirective === 0) {
      expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
    }
    consumeSemicolon(parser, context);

    statements.push(
      allowDirectives
        ? context & Context.OptionsLoc
          ? {
              type: 'ExpressionStatement',
              expression,
              directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ExpressionStatement',
              expression,
              directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue
            }
        : context & Context.OptionsLoc
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
          }
    );
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
): any {
  switch (parser.token) {
    case Token.FunctionKeyword:
      return parseFunctionDeclaration(parser, context, scope, FunctionFlag.Declaration, origin);
    case Token.AsyncKeyword:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 1);
    case Token.ClassKeyword:
      return parseClassDeclaration(parser, context, scope);
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
): any {
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
      return parseBlock(parser, context, newScope(scope, ScopeKind.Block), labels, nestedLabels);
    case Token.Semicolon:
      return parseEmptyStatement(parser, context);
    case Token.ReturnKeyword:
      return parseReturnStatement(parser, context);
    case Token.ForKeyword:
      return parseForStatement(parser, context, scope, labels);
    case Token.DoKeyword:
      return parseDoWhileStatement(parser, context, scope, labels, nestedLabels);
    case Token.WhileKeyword:
      return parseWhileStatement(parser, context, scope, labels, nestedLabels);
    case Token.SwitchKeyword:
      return parseSwitchStatement(parser, context, scope, labels, nestedLabels);
    case Token.ThrowKeyword:
      return parseThrowStatement(parser, context);
    case Token.BreakKeyword:
      return parseBreakStatement(parser, context, labels);
    case Token.ContinueKeyword:
      return parseContinueStatement(parser, context, labels);
    case Token.TryKeyword:
      return parseTryStatement(parser, context, scope, labels);
    case Token.IfKeyword:
      return parseIfStatement(parser, context, scope, labels);
    case Token.WithKeyword:
      return parseWithStatement(parser, context, scope, labels, nestedLabels);
    case Token.DebuggerKeyword:
      return parseDebuggerStatement(parser, context);
    case Token.AsyncKeyword:
      return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 0);
    case Token.FunctionKeyword:
      report(
        parser,
        context & (Context.OptionsDisableWebCompat | Context.Strict) ? Errors.StrictFunction : Errors.SloppyFunction
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
  labels: any,
  nestedLabels: any,
  value: any,
  _token: Token,
  expr: any,
  allowFuncDecl: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.LabeledStatement {
  // ExpressionStatement | LabelledStatement ::
  //   Expression ';'
  //   Identifier ':' Statement
  //
  // ExpressionStatement[Yield] :
  //   [lookahead notin {{, function, class, let [}] Expression[In, ?Yield] ;

  labels = addLabel(parser, value, labels, nestedLabels);

  nextToken(parser, context, /* allowRegExp */ 1); // skip: ':'

  nestedLabels = parseStatementWithLabelSet(parser.token, value, labels, nestedLabels);

  const body =
    // Disallow if web compability is off
    context & (Context.OptionsDisableWebCompat | Context.Strict) || parser.token !== Token.FunctionKeyword
      ? parseStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl)
      : parseFunctionDeclaration(parser, context, scope, FunctionFlag.IsDeclaration, origin);

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

export function parseNonDirectiveExpression(
  parser: ParserState,
  context: Context,
  expression: any,
  start: number,
  line: number,
  column: number
): any {
  expression = parseMemberExpression(parser, context, expression, 0, 0, start, line, column);
  expression = parseAssignmentExpression(parser, context, 0, 0, expression, start, line, column);
  if (parser.token === Token.Comma) {
    expression = parseSequenceExpression(parser, context, expression, start, line, column);
  }
  return expression;
}

export function parseAsyncArrowOrAsyncFunctionDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  origin: Origin,
  labels: any,
  allowFuncDecl: 0 | 1
): ESTree.ExpressionStatement | ESTree.LabeledStatement | ESTree.FunctionDeclaration {
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
      return parseFunctionDeclarationRest(
        parser,
        context,
        scope,
        FunctionFlag.IsAsync | FunctionFlag.Declaration,
        origin,
        start,
        line,
        column
      );
    }

    // async Identifier => ...

    if ((parser.token & Token.IsIdentifier) === Token.IsIdentifier) {
      if (context & (Context.Strict | Context.InYieldContext) && parser.token === Token.YieldKeyword) {
        report(parser, Errors.YieldInParameter);
      }
      let expr: any = parseAsyncArrowIdentifier(
        parser,
        context,
        1,
        parser.tokenValue,
        parseIdentifier(parser, context),
        start,
        line,
        column
      );

      if (parser.token === Token.Comma) expr = parseSequenceExpression(parser, context, expr, start, line, column);

      return parseExpressionStatement(parser, context, expr, start, line, column);
    }
  }

  let expr: any = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

  if (parser.token === Token.LeftParen) {
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
      expr = parseAsyncArrowIdentifier(parser, context, 1, 'async', expr, start, line, column);
    }
    parser.assignable = 1;
  }

  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

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
): ESTree.BlockStatement {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  const body: ESTree.Statement[] = [];

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
export function parseEmptyStatement(parser: ParserState, context: Context): ESTree.EmptyStatement {
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

export function parseReturnStatement(parser: ParserState, context: Context): ESTree.ReturnStatement {
  if (context & Context.InGlobal && (context & Context.OptionsGlobalReturn) === 0) report(parser, Errors.Unexpected); // IllegalReturn);
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);
  const argument =
    parser.newLine !== 0 || parser.token & Token.IsAutoSemicolon ? null : parseExpressions(parser, context);

  consumeSemicolon(parser, context);

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
  labels: any,
  curStart: number,
  curLine: number,
  curColumn: number
) {
  const { token, start, line, column, tokenValue } = parser;

  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let init = null;
  let right;
  const origin = Origin.ForStatement;
  let kind: BindingKind = BindingKind.Empty;
  let isLet = false;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (token === Token.LetKeyword) {
    if ((parser.token & (Token.IsIdentifier | Token.Keyword | Token.FutureReserved | Token.IsPatternStart)) !== 0) {
      if (parser.token === Token.InKeyword) {
        if (context & Context.Strict) report(parser, Errors.DisallowedLetInStrict);
        init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      } else {
        kind = BindingKind.Let;
      }
    } else {
      if (context & Context.Strict) report(parser, Errors.DisallowedLetInStrict);
      init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      init = parseMemberExpression(parser, context, init, 0, 0, start, line, column);
      isLet = true;
    }
    parser.assignable = 1;
  } else {
    parser.assignable = 1;
    kind = token === Token.VarKeyword ? BindingKind.Variable : BindingKind.Const;
  }

  if (kind & (BindingKind.Variable | BindingKind.Let | BindingKind.Const)) {
    const declarations: any[] = [];

    let bindingCount = 0;

    while (parser.token !== Token.Comma) {
      const { tokenValue, start, line, column, token } = parser;

      let id;
      let init: any = null;

      if ((token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) !== 0) {
        id = parseAndClassifyIdentifier(
          parser,
          context,
          scope,
          token,
          tokenValue,
          kind,
          origin,
          start,
          line,
          column,
          1
        );

        if (parser.token === Token.Assign) {
          nextToken(parser, context, /* allowRegExp */ 1);
          init = parseExpression(parser, context | Context.DisallowIn);

          if ((parser.token & Token.IsInOrOf) === Token.IsInOrOf) {
            if (parser.token === Token.OfKeyword) report(parser, Errors.ForInOfLoopInitializer, 'of');
            if (
              (parser.token === Token.InKeyword && (kind & BindingKind.Variable) !== BindingKind.Variable) ||
              context & (Context.Strict | Context.OptionsDisableWebCompat)
            ) {
              report(parser, Errors.ForInOfLoopInitializer, 'in');
            }
          }
        } else if (
          (kind & BindingKind.Const || (token & Token.IsPatternStart) > 0) &&
          (parser.token & Token.IsInOrOf) !== Token.IsInOrOf
        ) {
          report(parser, Errors.DeclarationMissingInitializer, kind & BindingKind.Const ? 'const' : 'destructuring');
        }
      } else if ((token & Token.IsPatternStart) === Token.IsPatternStart) {
        id =
          parser.token === Token.LeftBracket
            ? parseArrayExpressionOrPattern(
                parser,
                context | Context.DisallowIn,
                scope,
                1,
                1,
                kind,
                origin,
                start,
                line,
                column
              )
            : parseObjectLiteralOrPattern(
                parser,
                context | Context.DisallowIn,
                scope,
                1,
                1,
                kind,
                origin,
                start,
                line,
                column
              );
        if (parser.destructible & DestructuringKind.CannotDestruct) report(parser, Errors.InvalidBindingDestruct);

        if (parser.destructible & DestructuringKind.AssignableDestruct) report(parser, Errors.InvalidBindingDestruct);
        if (parser.token === Token.Assign) {
          nextToken(parser, context, /* allowRegExp */ 1);

          init = parseExpression(parser, context | Context.DisallowIn);

          if ((parser.token & Token.IsInOrOf) === Token.IsInOrOf) {
            if (parser.token === Token.OfKeyword) report(parser, Errors.ForInOfLoopInitializer, 'of');
            if (parser.token === Token.InKeyword) {
              if (
                (kind & BindingKind.Variable) !== BindingKind.Variable ||
                context & (Context.Strict | Context.OptionsDisableWebCompat)
              ) {
                report(parser, Errors.ForInOfLoopInitializer, 'in');
              }
            }
          }
        } else if (
          (kind & BindingKind.Const || (token & Token.IsPatternStart) > 0) &&
          (parser.token & Token.IsInOrOf) !== Token.IsInOrOf
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

      if (parser.token !== Token.Comma) break;

      consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1);
    }

    if (bindingCount > 1 && parser.token & Token.IsInOrOf) {
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

    right = parseExpression(parser, context);

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
  } else if (parser.token === Token.InKeyword) {
    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context);

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
  init = parseAssignmentExpression(
    parser,
    context | Context.DisallowIn,
    0,
    parser.token === Token.Assign ? 1 : 0,
    init,
    start,
    line,
    column
  );

  if (parser.token === Token.Comma)
    init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context);

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
): ESTree.ForStatement | ESTree.ForInStatement | ESTree.ForOfStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);

  const forAwait =
    (context & Context.InAwaitContext) > 0 && consumeOpt(parser, context, Token.AwaitKeyword, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  scope = newScope(scope, ScopeKind.ForStatement);

  let test: ESTree.Expression | null = null;
  let update: ESTree.Expression | null = null;
  let init = null;
  let right;
  const origin = Origin.ForStatement;
  const kind: BindingKind = BindingKind.Empty;
  let destructible: DestructuringKind = DestructuringKind.None;
  const { token, start, line, column } = parser;

  if ((token & Token.isVarDecl) !== 0) {
    return parseForStatementWithVariableDeclarations(
      parser,
      context,
      scope,
      labels,
      curStart,
      curLine,
      curColumn
    ) as any;
  }

  if (token === Token.Semicolon) {
    if (forAwait) report(parser, Errors.Unexpected);
  } else if ((token & Token.IsPatternStart) === Token.IsPatternStart) {
    init =
      token === Token.LeftBrace
        ? parseObjectLiteralOrPattern(parser, context, scope, 1, 0, kind, origin, start, line, column)
        : parseArrayExpressionOrPattern(parser, context, scope, 1, 0, kind, origin, start, line, column);

    destructible = parser.destructible;

    if ((context & Context.OptionsDisableWebCompat) === 0 && destructible & DestructuringKind.SeenProto) {
      report(parser, Errors.DuplicateProto);
    }

    parser.assignable = destructible & DestructuringKind.CannotDestruct ? 0 : 1;

    init = parseMemberExpression(
      parser,
      context | Context.DisallowIn,
      init,
      0,
      0,
      parser.start,
      parser.line,
      parser.column
    );
    destructible = parser.destructible;
  } else {
    init = parseLeftHandSideExpression(parser, context | Context.DisallowIn, /* allowLHS */ 1, 1);
  }
  if ((parser.token & Token.IsInOrOf) === Token.IsInOrOf) {
    reinterpretToPattern(parser, init);
    if (parser.token === Token.OfKeyword) {
      if (parser.assignable === 0) report(parser, Errors.CantAssignToInOfForLoop, forAwait ? 'await' : 'of');

      nextToken(parser, context, /* allowRegExp */ 1);

      right = parseExpression(parser, context);

      consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

      const body = parseStatement(parser, context | Context.InIteration, scope, origin, labels, null, 0);

      return context & Context.OptionsLoc
        ? {
            type: 'ForOfStatement',
            body,
            left: init,
            right,
            await: forAwait,
            start: curStart,
            end: parser.endIndex,
            loc: setLoc(parser, curLine, curColumn)
          }
        : {
            type: 'ForOfStatement',
            body,
            left: init,
            right,
            await: forAwait
          };
    }

    if (parser.assignable === 0) report(parser, Errors.CantAssignToInOfForLoop, 'in');

    nextToken(parser, context, /* allowRegExp */ 1);

    right = parseExpressions(parser, context);

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

  if (forAwait) report(parser, Errors.Unexpected);

  if (destructible & DestructuringKind.MustDestruct && parser.token !== Token.Assign) {
    report(parser, Errors.CantAssignToInOfForLoop, 'loop');
  }

  init = parseAssignmentExpression(
    parser,
    context | Context.DisallowIn,
    0,
    parser.token === Token.Assign ? 1 : 0,
    init,
    start,
    line,
    column
  );

  if (parser.token === Token.Comma)
    init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.Semicolon) test = parseExpressions(parser, context);

  consume(parser, context, Token.Semicolon, /* allowRegExp */ 1);

  if (parser.token !== Token.RightParen) update = parseExpressions(parser, context);

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
): ESTree.DoWhileStatement {
  // DoStatement ::
  //   'do' Statement 'while' '(' Expression ')' ';'

  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);

  const body = parseStatement(parser, context | Context.InIteration, scope, Origin.None, labels, nestedLabel, 0);

  consume(parser, context, Token.WhileKeyword, /* allowRegExp */ 0);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const test = parseExpressions(parser, context);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

  // Allow do-statements to be terminated with and without
  // semi-colons. This allows code such as 'do;while(0)return' to
  // parse, which would not be the case if we had used the
  // consumeSemicolon() functionality here.
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
): ESTree.WhileStatement {
  // WhileStatement ::
  //   'while' '(' Expression ')' Statement
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);
  const test = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
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
): ESTree.SwitchStatement {
  // SwitchStatement ::
  //   'switch' '(' Expression ')' '{' CaseClause* '}'
  // CaseClause ::
  //   'case' Expression ':' StatementList
  //   'default' ':' StatementList
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const discriminant = parseExpressions(parser, context);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 0);

  const cases: ESTree.SwitchCase[] = [];

  let seenDefault: 0 | 1 = 0;

  scope = newScope(scope, ScopeKind.SwitchStatement);

  while (parser.token !== Token.RightBrace) {
    const { start, line, column } = parser;
    let test: ESTree.Expression | null = null;
    const consequent: ESTree.Statement[] = [];

    if (consumeOpt(parser, context, Token.CaseKeyword, /* allowRegExp */ 1)) {
      test = parseExpressions(parser, context);
    } else {
      consume(parser, context, Token.DefaultKeyword, /* allowRegExp */ 1);
      if (seenDefault) report(parser, Errors.Unexpected);
      seenDefault = 1;
    }
    consume(parser, context, Token.Colon, /* allowRegExp */ 1);
    while (
      parser.token !== Token.CaseKeyword &&
      parser.token !== Token.RightBrace &&
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
): ESTree.IfStatement {
  // IfStatement ::
  //   'if' '(' Expression ')' Statement ('else' Statement)?
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);
  const test = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn);
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
  return context & (Context.Strict | Context.OptionsDisableWebCompat) || parser.token !== Token.FunctionKeyword
    ? parseStatement(parser, context, scope, Origin.None, labels, null, 0)
    : parseFunctionDeclaration(
        parser,
        context,
        newScope(scope, ScopeKind.Block),
        FunctionFlag.Declaration,
        Origin.None
      );
}

export function parseThrowStatement(parser: ParserState, context: Context): ESTree.ThrowStatement {
  // ThrowStatement ::
  //   'throw' Expression ';'
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);

  if (parser.newLine !== 0) report(parser, Errors.NewlineAfterThrow);

  const argument: ESTree.Statement = parseExpressions(parser, context);

  consumeSemicolon(parser, context);

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

export function parseBreakStatement(parser: ParserState, context: Context, labels: any): ESTree.BreakStatement {
  const { start: curStart, line: curLine, column: curColumn } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);
  let label: ESTree.Identifier | null = null;
  if (parser.newLine === 0 && (parser.token & Token.IsAutoSemicolon) === 0) {
    const { tokenValue, start, line, column } = parser;
    nextToken(parser, context, /* allowRegExp */ 1);
    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
    if (!validateBreakLabel(parser, labels, tokenValue)) {
      report(parser, Errors.UnknownLabel, tokenValue);
    }
  } else if ((context & (Context.InSwitch | Context.InIteration)) === 0) {
    report(parser, Errors.InvalidBreak);
  }

  consumeSemicolon(parser, context);

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

export function parseContinueStatement(parser: ParserState, context: Context, labels: any): ESTree.ContinueStatement {
  // ContinueStatement ::
  //   'continue' Identifier? ';'
  if ((context & Context.InIteration) === 0) report(parser, Errors.IllegalContinue);
  const { start: curStart, line: curLine, column: curColumn } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);

  let label: ESTree.Identifier | null = null;
  if (parser.newLine === 0 && (parser.token & Token.IsAutoSemicolon) === 0) {
    const { tokenValue, start, line, column } = parser;
    nextToken(parser, context, /* allowRegExp */ 1);
    label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
    validateContinueLabel(parser, labels, tokenValue);
  }
  consumeSemicolon(parser, context);

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
): ESTree.TryStatement {
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

  const block = parseBlock(parser, context, newScope(scope, ScopeKind.TryStatement), labels, null);

  let handler: ESTree.CatchClause | null = null;

  if (parser.token === Token.CatchKeyword) {
    const { start, line, column } = parser;

    nextToken(parser, context, /* allowRegExp */ 1);

    let param: ESTree.ArrayPattern | ESTree.ObjectPattern | ESTree.Identifier | null = null;
    let additionalScope: ScopeState = scope;

    if (parser.token === Token.LeftParen) {
      nextToken(parser, context, /* allowRegExp */ 0);

      scope = newScope(scope, ScopeKind.CatchStatement);

      const kind =
        (parser.token & Token.IsPatternStart) === Token.IsPatternStart
          ? BindingKind.CatchPattern
          : BindingKind.CatchIdentifier;

      param = parseBindingPattern(parser, context, scope, kind, Origin.None);

      consume(parser, context, Token.RightParen, /* allowRegExp */ 1);

      additionalScope = newScope(scope, ScopeKind.CatchBlock);
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

  const finalizer: ESTree.BlockStatement | null = consumeOpt(parser, context, Token.FinallyKeyword, /* allowRegExp */ 0)
    ? parseBlock(parser, context, newScope(scope, ScopeKind.CatchStatement), labels, null)
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
): ESTree.WithStatement {
  // WithStatement ::
  //   'with' '(' Expression ')' Statement
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (context & Context.Strict) report(parser, Errors.StrictWith);

  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  const object = parseExpressions(parser, context);

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

export function parseDebuggerStatement(parser: ParserState, context: Context): ESTree.DebuggerStatement {
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 1);
  consumeSemicolon(parser, context);

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
): ESTree.VariableDeclaration | ESTree.LabeledStatement | ESTree.ExpressionStatement {
  const { token, tokenValue, start, line, column } = parser;
  let expr: any;
  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.token & (Token.IsIdentifier | Token.IsPatternStart)) {
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

    consumeSemicolon(parser, context);

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

  parser.assignable = 1;

  if (context & Context.Strict) report(parser, Errors.Unexpected);

  expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

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
    expr = parseAsyncArrowIdentifier(parser, context, /* isAsync */ 0, tokenValue, expr, start, line, column);
  } else {
    expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

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
): ESTree.LabeledStatement | ESTree.ExpressionStatement {
  // Check whether this is a label. The expression must have started with an
  // identifier, be just an identifier and be
  // followed by ':'
  const { tokenValue, token, start, line, column } = parser;
  let expr: any;

  switch (token) {
    case Token.LetKeyword:
      expr = parseIdentifier(parser, context);

      if (parser.token === Token.LeftBracket) report(parser, Errors.Unexpected);
      break;
    default:
      expr = parsePrimaryExpression(parser, context, 0, /* allowLHS */ 1, 1, start, line, column);
  }

  if (
    token & (Token.Contextual | Token.FutureReserved | Token.Keyword | Token.IsIdentifier) &&
    parser.token === Token.Colon
  ) {
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
  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  if (parser.token === Token.Comma) {
    expr = parseSequenceExpression(parser, context, expr, start, line, column);
  }

  return parseExpressionStatement(parser, context, expr, start, line, column);
}
