import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import {
  ScopeState,
  ScopeKind,
  addVarName,
  addBlockName,
  declareUnboundVariable,
  createParentScope,
  createTopLevelScope
} from './scope';
import {
  ParserState,
  Context,
  BindingKind,
  Origin,
  expectSemicolon,
  setLoc,
  validateFunctionName,
  isStrictReservedWord,
  consumeOpt
} from './common';
import {
  parseFunctionLiteral,
  parseClassTail,
  parseIdentifierFromValue,
  parseBindingPattern,
  parseImportExpression,
  parseMemberExpression,
  parseExpressionStatement,
  parseAssignmentExpression,
  parseImportMetaExpression,
  parseExpression
} from './expressions';

/**
 * Parse function declaration
 */
export function parseFunctionDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  isHoisted: 0 | 1,
  isAsync: 0 | 1,
  origin: Origin
): ESTree.FunctionDeclaration {
  return parseHoistableDeclaration(
    parser,
    context,
    scope,
    isHoisted,
    isAsync,
    origin,
    parser.start,
    parser.line,
    parser.column
  );
}

/**
 * Parse hoistable declaration
 */
export function parseHoistableDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  isHoisted: 0 | 1,
  isAsync: 0 | 1,
  origin: Origin,
  start: number,
  line: number,
  column: number
): ESTree.FunctionDeclaration {
  nextToken(parser, context, /* allowRegExp */ 1);

  const isGenerator =
    (origin & Origin.Statement) === 0 ? consumeOpt(parser, context, Token.Multiply, /* allowRegExp */ 0) : 0;

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | undefined;

  let parent: ScopeState = createTopLevelScope(ScopeKind.Block);

  if ((parser.token & 0b00000000001001110000000000000000) > 0) {
    const { token, tokenValue, start, line, column } = parser;

    validateFunctionName(parser, context | ((context & 0b0000000000000000000_1100_00000000) << 11), token);

    // In ES6, a function behaves as a lexical binding, except in
    // a script scope, or the initial scope of eval or another function.
    if ((origin & 0b00000000000000000000000000000100) > 0 && (context & 0b00000000000000000000100000000000) === 0) {
      addVarName(parser, context, scope, tokenValue, BindingKind.Variable);
    } else {
      addBlockName(parser, context, scope, tokenValue, BindingKind.FunctionLexical, origin);
    }

    if (isHoisted === 1) declareUnboundVariable(parser, tokenValue);

    parent = createParentScope(parent, ScopeKind.FunctionRoot);

    firstRestricted = token;

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  } else if ((origin & Origin.Hoisted) === 0) {
    report(parser, Errors.DeclNoName, 'Function');
  }

  return parseFunctionLiteral(
    parser,
    ((context | 0b00011101111011100000000100000000) ^ 0b00011001111011100000000100000000) |
      ((isAsync * 2 + isGenerator) << 21),
    parent,
    id,
    firstRestricted,
    /* isDecl */ 1,
    'FunctionDeclaration',
    /* isMethod */ 0,
    start,
    line,
    column
  );
}

/**
 * Parse class declaration
 */
export function parseClassDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  isHoisted: 0 | 1,
  isExported: 0 | 1
): ESTree.ClassDeclaration {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  // Second set of context masks to fix 'super' edge cases
  const inheritedContext = (context | Context.InConstructor) ^ Context.InConstructor;

  context |= Context.Strict;

  let id: ESTree.Identifier | null = null;

  if ((parser.token & 0b00000000001001110000000000000000) > 0 && parser.token !== Token.ExtendsKeyword) {
    const { token, start, line, column, tokenValue } = parser;

    if (isStrictReservedWord(parser, context, token, 0)) report(parser, Errors.UnexpectedStrictReserved);

    // A named class creates a new lexical scope with a const binding of the
    // class name for the 'inner name'.
    addBlockName(parser, context, scope, tokenValue, BindingKind.Class, Origin.None);

    if (isExported === 1) declareUnboundVariable(parser, tokenValue);

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  } else if (isHoisted === 0) {
    report(parser, Errors.DeclNoName, 'Class');
  }

  return parseClassTail(
    parser,
    context,
    inheritedContext,
    id,
    0,
    1,
    'ClassDeclaration',
    start,
    line,
    column
  ) as ESTree.ClassDeclaration;
}

/**
 * Parse variable statement or lexical declaration
 */
export function parseVariableStatementOrLexicalDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  kind: BindingKind,
  origin: Origin
): ESTree.VariableDeclaration {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  const declarations = parseVariableDeclarationListAndDeclarator(parser, context, scope, kind, origin);

  expectSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'VariableDeclaration',
        kind: kind & BindingKind.Const ? 'const' : kind & BindingKind.Let ? 'let' : 'var',
        declarations,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'VariableDeclaration',
        kind: kind & BindingKind.Const ? 'const' : kind & BindingKind.Let ? 'let' : 'var',
        declarations
      };
}

/**
 * Parse variable declaration list and variable declarator
 */
export function parseVariableDeclarationListAndDeclarator(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  kind: BindingKind,
  origin: Origin
): ESTree.VariableDeclarator[] {
  let id: ESTree.BindingName;
  let init: ESTree.Expression | null = null;

  const list: ESTree.VariableDeclarator[] = [];

  do {
    const { token, start, line, column } = parser;

    id = parseBindingPattern(parser, context, scope, kind, origin);

    // Note: Always set the 'initializer' to 'null' for each iteration
    init = null;

    if (parser.token === Token.Assign) {
      nextToken(parser, context, /* allowRegExp */ 1);
      init = parseExpression(parser, context, /* inGroup */ 0);
      // ES6 'const' and binding patterns require initializers
    } else if ((kind & BindingKind.Const) > 0 || (token & Token.IsPatternStart) === Token.IsPatternStart) {
      report(parser, Errors.DeclarationMissingInitializer, kind & BindingKind.Const ? 'const' : 'destructuring');
    }

    list.push(
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
  } while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1));

  return list;
}

export function parseImportCallDeclaration(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.ExpressionStatement {
  let expr: any = parseImportExpression(parser, context, start, line, column);
  /** MemberExpression :
   *   1. PrimaryExpression
   *   2. MemberExpression [ AssignmentExpression ]
   *   3. MemberExpression . IdentifierName
   *   4. MemberExpression TemplateLiteral
   *
   * CallExpression :
   *   1. MemberExpression Arguments
   *   2. CallExpression ImportCall
   *   3. CallExpression Arguments
   *   4. CallExpression [ AssignmentExpression ]
   *   5. CallExpression . IdentifierName
   *   6. CallExpression TemplateLiteral
   *
   *  UpdateExpression ::
   *   ('++' | '--')? LeftHandSideExpression
   *
   */

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  /**
   * ExpressionStatement[Yield, Await]:
   *  [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]Expression[+In, ?Yield, ?Await]
   */
  return parseExpressionStatement(parser, context, expr, start, line, column);
}

export function parseImportMetaDeclaration(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.ExpressionStatement {
  let expr: any = parseIdentifierFromValue(parser, context, 'import', start, line, column);

  expr = parseImportMetaExpression(parser, context, expr, start, line, column);

  /** MemberExpression :
   *   1. PrimaryExpression
   *   2. MemberExpression [ AssignmentExpression ]
   *   3. MemberExpression . IdentifierName
   *   4. MemberExpression TemplateLiteral
   *
   * CallExpression :
   *   1. MemberExpression Arguments
   *   2. CallExpression ImportCall
   *   3. CallExpression Arguments
   *   4. CallExpression [ AssignmentExpression ]
   *   5. CallExpression . IdentifierName
   *   6. CallExpression TemplateLiteral
   *
   *  UpdateExpression ::
   *   ('++' | '--')? LeftHandSideExpression
   */

  expr = parseMemberExpression(parser, context, expr, 1, 0, start, line, column);

  /** AssignmentExpression :
   *   1. ConditionalExpression
   *   2. LeftHandSideExpression = AssignmentExpression
   */

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  /**
   * ExpressionStatement[Yield, Await]:
   *  [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]Expression[+In, ?Yield, ?Await]
   */

  return parseExpressionStatement(parser, context, expr, start, line, column);
}
