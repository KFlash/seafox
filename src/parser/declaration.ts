import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import { ScopeState, ScopeKind, addVarName, addBlockName } from './scope';
import { Context, BindingKind, FunctionFlag, ClassFlags, Origin } from './bits';
import {
  parseFunctionLiteral,
  parseClassDeclarationOrExpressionRest,
  parseIdentifierFromValue,
  parseBindingPattern,
  parseImportExpression,
  parseMemberExpression,
  parseExpressionStatement,
  parseAssignmentExpression,
  parseImportMetaExpression,
  parseExpression,
  parseIdentifier
} from './expressions';
import {
  ParserState,
  consumeSemicolon,
  setLoc,
  optionalBit,
  validateFunctionName,
  isStrictReservedWord
} from './common';

/**
 * Parse function declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param scope
 * @param flags FunctionFlag
 */
export function parseFunctionDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  flags: FunctionFlag,
  origin: Origin
): ESTree.FunctionDeclaration {
  return parseFunctionDeclarationRest(parser, context, scope, flags, origin, parser.start, parser.line, parser.column);
}

/**
 * Parse async function declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param scope ScopeState
 * @param flags FunctionFlag
 * @param origin Origin
 * @param start  Start position
 * @param line  Line position
 * @param column Column position
 */
export function parseFunctionDeclarationRest(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  flags: FunctionFlag,
  origin: Origin,
  start: number,
  line: number,
  column: number
): ESTree.FunctionDeclaration {
  nextToken(parser, context, /* allowRegExp */ 1);

  const isGenerator = flags & FunctionFlag.AllowGenerator ? optionalBit(parser, context, Token.Multiply) : 0;
  const isAsync = flags & FunctionFlag.IsAsync ? 1 : 0;

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | undefined;

  // Create a new function scope
  let innerScope: ScopeState = {
    parent: void 0,
    type: ScopeKind.Block
  };

  if (parser.token === Token.LeftParen) {
    if (flags & FunctionFlag.RequireIdentifier) report(parser, Errors.DeclNoName, 'Function');
  } else {
    const { token, tokenValue, start, line, column } = parser;

    validateFunctionName(parser, context | ((context & 0b0000000000000000000_1100_00000000) << 11), token);

    if (origin & Origin.TopLevel && (context & Context.Module) !== Context.Module) {
      addVarName(parser, context, scope, tokenValue, BindingKind.Variable);
    } else {
      addBlockName(parser, context, scope, tokenValue, BindingKind.FunctionLexical, origin);
    }

    innerScope = {
      parent: innerScope,
      type: ScopeKind.FunctionRoot,
      scopeError: void 0
    };

    firstRestricted = token;

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  }
  context =
    ((context | 0b0000001111011000000_0000_00000000) ^ 0b0000001111011000000_0000_00000000) |
    Context.AllowNewTarget |
    ((isAsync * 2 + isGenerator) << 21);

  return parseFunctionLiteral(
    parser,
    context,
    innerScope,
    id,
    firstRestricted,
    flags,
    'FunctionDeclaration',
    /* isMethod */ 0,
    start,
    line,
    column
  );
}

/**
 * Parse class declaration
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param scope Lexical scope
 * @param flags FunctionFlag
 */
export function parseClassDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  flags: ClassFlags
): ESTree.ClassDeclaration {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext = (context | Context.InConstructor) ^ Context.InConstructor;

  context |= Context.Strict;

  let id: any = null;

  if (
    parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier) &&
    parser.token !== Token.ExtendsKeyword
  ) {
    if (isStrictReservedWord(parser, context, parser.token, /* inGroup */ 0)) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
    // A named class creates a new lexical scope with a const binding of the
    // class name for the "inner name".
    addBlockName(parser, context, scope, parser.tokenValue, BindingKind.Class, Origin.None);

    id = parseIdentifier(parser, context);
  } else {
    // Only under the "export default" context, class declaration does not require the class name.
    //
    //     ExportDeclaration:
    //         ...
    //         export default ClassDeclaration[~Yield, +Default]
    //         ...
    //
    //     ClassDeclaration[Yield, Default]:
    //         ...
    //         [+Default] class ClassTail[?Yield]
    //
    if ((flags & ClassFlags.Hoisted) === 0) report(parser, Errors.DeclNoName, 'Class');
  }

  return parseClassDeclarationOrExpressionRest(
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
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param kind BindingKind
 * @param origin Origin
 */
export function parseVariableStatementOrLexicalDeclaration(
  parser: ParserState,
  context: Context,
  scope: any,
  kind: BindingKind,
  origin: Origin
): ESTree.VariableDeclaration {
  const { start, line, column } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  const declarations = parseVariableDeclarationListAndDeclarator(parser, context, scope, kind, origin);

  consumeSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'VariableDeclaration',
        kind: kind & BindingKind.Const ? 'const' : 'var',
        declarations,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'VariableDeclaration',
        kind: kind & BindingKind.Const ? 'const' : 'var',
        declarations
      };
}

/**
 * Parse variable declaration list and variable declarator
 *
 * @param parser  Parser object
 * @param context Context masks
 * @param kind VarKind
 * @param origin Origin
 */
export function parseVariableDeclarationListAndDeclarator(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  kind: BindingKind,
  origin: Origin
): ESTree.VariableDeclarator[] {
  const list: ESTree.VariableDeclarator[] = [];

  let id: any = null;
  let type: BindingKind;
  let init: ESTree.Expression | null = null;

  while (parser.token !== Token.Comma) {
    const { start, line, column } = parser;

    // This little 'trick' speeds up the validation below
    type = kind | ((parser.token & Token.IsPatternStart) === Token.IsPatternStart ? BindingKind.Pattern : 0);

    id = parseBindingPattern(parser, context, scope, kind, origin);

    // Always set the 'initializer' to 'null' for each iteration
    init = null;

    if (parser.token === Token.Assign) {
      nextToken(parser, context, /* allowRegExp */ 1);
      init = parseExpression(parser, context, 0);
    } else if (
      (type & (BindingKind.Const | BindingKind.Pattern)) !== 0 &&
      (parser.token & 0b0000000000000000001_0000_00110000) !== 0b0000000000000000001_0000_00110000
    ) {
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

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);
  }

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

  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

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
  let expr: any =
    context & Context.OptionsLoc
      ? {
          type: 'Identifier',
          name: 'import',
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'Identifier',
          name: 'import'
        };

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

  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

  /** AssignmentExpression :
   *   1. ConditionalExpression
   *   2. LeftHandSideExpression = AssignmentExpression
   */

  expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);

  /**
   * ExpressionStatement[Yield, Await]:
   *  [lookahead ∉ { {, function, async [no LineTerminator here] function, class, let [ }]Expression[+In, ?Yield, ?Await]
   */

  return parseExpressionStatement(parser, context, expr, start, line, column);
}
