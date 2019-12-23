import { Token } from '../token';
import { nextToken } from '../scanner/scan';
import { report, Errors } from '../errors';
import { Context, Flags, BindingKind } from './bits';

export function getStartLoc(parser: ParserState) {
  return { start: parser.start, line: parser.line, column: parser.line };
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  flags: any;
  index: number;
  length: number;
  start: number;
  endIndex: number;
  prevLinebase: number;
  lastColumn: number;
  column: number;
  line: number;
  lineBase: number;
  offset: number;
  isUnicodeEscape: 0 | 1;
  token: Token;
  newLine: 0 | 1;
  tokenValue: any;
  tokenRaw: string;
  assignable: 0 | 1;
  lastChar: number;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
}

export function consumeSemicolon(parser: ParserState, context: Context): void {
  if ((parser.token & Token.IsAutoSemicolon) !== Token.IsAutoSemicolon && parser.newLine === 0) {
    report(parser, Errors.Unexpected);
  }
  consumeOpt(parser, context, Token.Semicolon, /* allowRegExp */ 1);
}

export function optionalBit(parser: ParserState, context: Context, t: Token): 0 | 1 {
  if (parser.token !== t) return 0;
  nextToken(parser, context, /* allowRegExp */ 0);
  return 1;
}

export function consumeOpt(parser: ParserState, context: Context, t: Token, allowRegExp: 0 | 1): boolean {
  if (parser.token !== t) return false;
  nextToken(parser, context, allowRegExp);
  return true;
}

export function setLoc(parser: ParserState, line: number, column: number): any {
  return {
    start: {
      line,
      column
    },
    end: {
      line: parser.prevLinebase,
      column: parser.lastColumn
    }
  };
}

/**
 * Transforms a `LeftHandSideExpression` into a `AssignmentPattern` if possible,
 * otherwise it returns the original tree.
 *
 * @param parser Parser state
 * @param {*} node
 */
export function reinterpretToPattern(state: ParserState, node: any): void {
  switch (node.type) {
    case 'ArrayExpression':
      node.type = 'ArrayPattern';
      const elements = node.elements;
      for (let i = 0, n = elements.length; i < n; ++i) {
        const element = elements[i];
        if (element) reinterpretToPattern(state, element);
      }
      return;
    case 'ObjectExpression':
      node.type = 'ObjectPattern';
      const properties = node.properties;
      for (let i = 0, n = properties.length; i < n; ++i) {
        reinterpretToPattern(state, properties[i]);
      }
      return;
    case 'AssignmentExpression':
      node.type = 'AssignmentPattern';
      if (node.operator !== '=') report(state, Errors.Unexpected);
      delete node.operator;
      reinterpretToPattern(state, node.left);
      return;
    case 'Property':
      reinterpretToPattern(state, node.value);
      return;
    case 'SpreadElement':
      node.type = 'RestElement';
      reinterpretToPattern(state, node.argument);
    default: // ignore
  }
}

export function parseStatementWithLabelSet(t: Token, label: any, labels: any, nestedLabels: any) {
  if (nestedLabels === null) {
    nestedLabels = [label];
  } else {
    nestedLabels.push(label);
  }
  if (isIterationStatement(t)) {
    labels.iterationLabels = nestedLabels;
  }
  return nestedLabels;
}

export function isIterationStatement(t: Token): boolean {
  return t === Token.ForKeyword || t === Token.WhileKeyword || t === Token.DoKeyword;
}

export function addLabel(parser: ParserState, label: any, labels: any, nestedLabels: any): any {
  let set = labels;

  while (set) {
    if (set['#' + label]) report(parser, Errors.Unexpected);
    set = set.parentLabels;
  }
  labels = { parentLabels: labels, iterationLabels: null };
  labels['#' + label] = true;

  if (nestedLabels === null) {
    nestedLabels = [label];
  } else {
    nestedLabels.push(label);
  }

  return labels;
}

export function isValidBreakLabel(parser: ParserState, labels: any, label: string): 0 | 1 {
  if (labels === null) report(parser, Errors.Unexpected);

  if (labels['#' + label]) return 1;

  while ((labels = labels.parentLabels)) if (labels['#' + label]) return 1;

  return 0;
}

export interface Label {
  iterationLabels: string[];
  parentLabels: any;
}

export function isExactlyStrictDirective(parser: ParserState, index: number, start: number, value: string): boolean {
  // The length of the token is used to make sure the literal equals without
  // taking escape sequences (e.g., "use \x73trict") or line continuations
  // (e.g., "use \(newline) strict") into account.
  if (index - start !== 12) return false;
  if (value !== 'use strict') return false;
  // if (parser.newLine === 0) return false;
  if ((parser.token & Token.IsAutoSemicolon) !== Token.IsAutoSemicolon) return false;
  return true;
}

/**
 * Validates binding identifier
 *
 * @param parser Parser state
 * @param context Context masks
 * @param type Binding type
 * @param token Token
 */

export function validateFunctionName(parser: ParserState, context: Context, t: Token): void {
  if (context & Context.Strict) {
    if ((t & Token.FutureReserved) === Token.FutureReserved) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  if ((t & Token.Keyword) === Token.Keyword) {
    report(parser, Errors.KeywordNotId);
  }

  if (context & (Context.InAwaitContext | Context.Module) && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
  }

  if (context & (Context.InYieldContext | Context.Strict) && t === Token.YieldKeyword) {
    report(parser, Errors.DisallowedInContext, 'yield');
  }
}

export function isValidIdentifier(context: Context, t: Token): boolean {
  if (context & (Context.Strict | Context.InYieldContext)) {
    // Module code is also "strict mode code"
    if (context & Context.Module && t === Token.AwaitKeyword) return false;
    if (context & Context.InYieldContext && t === Token.YieldKeyword) return false;
    return (t & Token.IsIdentifier) === Token.IsIdentifier || (t & Token.Contextual) === Token.Contextual;
  }

  return (
    (t & Token.IsIdentifier) === Token.IsIdentifier ||
    (t & Token.Contextual) === Token.Contextual ||
    (t & Token.FutureReserved) === Token.FutureReserved
  );
}
export function consume(parser: ParserState, context: Context, t: Token, allowRegExp: 0 | 1): void {
  if (parser.token !== t) report(parser, Errors.Unexpected);
  nextToken(parser, context, allowRegExp);
}

export function isStrictReservedWord(parser: ParserState, context: Context, t: Token, inGroup: 0 | 1): boolean {
  if (t === Token.AwaitKeyword) {
    if (inGroup === 1) parser.flags |= Flags.SeenAwait;
    if (context & (Context.InAwaitContext | Context.Module)) report(parser, Errors.AwaitOutsideAsync);
  }

  if (t === Token.YieldKeyword && context & Context.InYieldContext) report(parser, Errors.DisallowedInContext, 'yield');

  return (
    (t & Token.Keyword) === Token.Keyword ||
    (t & Token.FutureReserved) === Token.FutureReserved ||
    t == Token.EscapedFutureReserved
  );
}

export function validateIdentifier(parser: ParserState, context: Context, kind: BindingKind, t: Token): void {
  if (context & Context.Strict) {
    if ((t & Token.FutureReserved) === Token.FutureReserved) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  if ((t & Token.Keyword) === Token.Keyword) {
    report(parser, Errors.KeywordNotId);
  }

  // Note: The BoundNames of LexicalDeclaration and ForDeclaration must not
  // contain 'let'. (CatchParameter is the only lexical binding form
  // without this restriction.)
  if (kind & (BindingKind.Let | BindingKind.Const) && t === Token.LetKeyword) {
    report(parser, Errors.InvalidLetConstBinding);
  }

  if (context & (Context.InAwaitContext | Context.Module) && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
  }

  if (context & (Context.InYieldContext | Context.Strict) && t === Token.YieldKeyword) {
    report(parser, Errors.DisallowedInContext, 'yield');
  }
}

export function isEvalOrArguments(value: string): boolean {
  return value === 'eval' || value === 'arguments';
}
