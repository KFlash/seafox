import { nextToken } from '../scanner/scan';
import { Token } from '../token';
import { Errors, report } from '../errors';
import * as ESTree from './estree';
import {
  parseFunctionDeclarationOrExpressionRest,
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
import { ScopeState, newScope, createScope, ScopeKind, addVarName, addBlockName } from './scope';
import {
  Context,
  ParserState,
  consumeSemicolon,
  setLoc,
  FunctionFlag,
  optionalBit,
  Origin,
  BindingKind,
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
  let innerScope = createScope();

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

    innerScope = newScope(innerScope, ScopeKind.FunctionRoot);

    firstRestricted = token;

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  }
  context =
    ((context | 0b0000001111011000000_0000_00000000) ^ 0b0000001111011000000_0000_00000000) |
    Context.AllowNewTarget |
    ((isAsync * 2 + isGenerator) << 21);

  return parseFunctionDeclarationOrExpressionRest(
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
 * @param scope
 * @param flags FunctionFlag
 */
export function parseClassDeclaration(
  parser: ParserState,
  context: Context,
  scope: ScopeState
): ESTree.ClassDeclaration {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  context = (context | Context.Strict) ^ Context.Strict;

  let id: ESTree.Expression | null = null;

  if (parser.token & Token.IsIdentifier && parser.token !== Token.ExtendsKeyword) {
    if (isStrictReservedWord(parser, context, parser.token)) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
    // A named class creates a new lexical scope with a const binding of the
    // class name for the "inner name".
    addBlockName(parser, context, scope, parser.tokenValue, BindingKind.Class, Origin.None);

    id = parseIdentifier(parser, context);
  } else {
    //  report(parser, Errors.DeclNoName, 'Class');
  }

  return parseClassDeclarationOrExpressionRest(
    parser,
    context,
    id,
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
  const list: any[] = [];

  while (parser.token !== Token.Comma) {
    const { start, line, column, token } = parser;

    const id = parseBindingPattern(parser, context, scope, kind, origin);
    let init: any = null;

    if (parser.token === Token.Assign) {
      nextToken(parser, context, /* allowRegExp */ 1);
      init = parseExpression(parser, context);
    } else if (
      (parser.token & Token.IsInOrOf) !== Token.IsInOrOf &&
      (kind & BindingKind.Const || (token & Token.IsPatternStart) === Token.IsPatternStart)
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
  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);
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

  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);

  return parseExpressionStatement(parser, context, expr, start, line, column);
}
