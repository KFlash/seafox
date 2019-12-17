import { Token } from '../token';
import { nextToken } from '../scanner/scan';
import { report, Errors } from '../errors';

/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty = 0,
  OptionsNext = 1 << 0,
  OptionsLoc = 1 << 1,
  OptionsJSX = 1 << 2,
  OptionsRaw = 1 << 3,
  OptionsDisableWebCompat = 1 << 4,
  OptionsDirectives = 1 << 5,
  OptionsGlobalReturn = 1 << 6,
  Strict = 1 << 10,
  Module = 1 << 11, // Current code should be parsed as a module body
  DisallowIn = 1 << 13,
  TaggedTemplate = 1 << 16,
  InIteration = 1 << 17,
  SuperProperty = 1 << 18,
  SuperCall = 1 << 19,
  InYieldContext = 1 << 21,
  InAwaitContext = 1 << 22,
  InArgumentList = 1 << 23,
  InConstructor = 1 << 24,
  InMethod = 1 << 25,
  AllowNewTarget = 1 << 26,
  InSwitch = 1 << 27,
  InGlobal = 1 << 28
}
/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty = 0,
  HasConstructor = 1 << 0,
  Destructible = 1 << 3,
  AssignableDestruct = 1 << 4,
  CannotDestruct = 1 << 5,
  MustDestruct = 1 << 6
}

export const enum Origin {
  None = 0,
  Statement = 1 << 0,
  BlockStatement = 1 << 1,
  TopLevel = 1 << 2,
  Declaration = 1 << 3,
  Arrow = 1 << 4,
  ForStatement = 1 << 5,
  Export = 1 << 6
}

export const enum PropertyKind {
  None = 0,
  Method = 1 << 0,
  Computed = 1 << 1,
  Shorthand = 1 << 2,
  Generator = 1 << 3,
  Async = 1 << 4,
  Static = 1 << 5,
  Constructor = 1 << 6,
  ClassField = 1 << 7,
  Getter = 1 << 8,
  Setter = 1 << 9,
  Extends = 1 << 10,
  Literal = 1 << 11,
  PrivateField = 1 << 12,
  GetSet = Getter | Setter
}
export const enum FunctionFlag {
  None = 0,
  IsDeclaration = 1 << 0,
  AllowGenerator = 1 << 1,
  IsAsync = 1 << 2,
  RequireIdentifier = 1 << 3,
  Declaration = IsDeclaration | AllowGenerator | RequireIdentifier
}

/**
 * Masks to track the binding kind
 */
export const enum BindingKind {
  None = 0,
  ArgumentList = 1 << 0,
  Variable = 1 << 1,
  FunctionLexical = 1 << 2,
  Empty = 1 << 3,
  Let = 1 << 4,
  Const = 1 << 5,
  Class = 1 << 6,
  FunctionStatement = 1 << 7,
  CatchPattern = 1 << 8,
  CatchIdentifier = 1 << 9,
  CatchIdentifierOrPattern = CatchIdentifier | CatchPattern,
  LexicalOrFunction = Variable | FunctionLexical,
  LexicalBinding = Let | Const | FunctionLexical | FunctionStatement | Class
}

/**
 * Masks to track the destructuring kind
 */
export const enum DestructuringKind {
  None = 0,
  MustDestruct = 1 << 3,
  // "Cannot" rather than "can" so that this flag can be ORed together across
  // multiple characters.
  CannotDestruct = 1 << 4,
  // Only destructible if assignable
  AssignableDestruct = 1 << 5,
  // `__proto__` is a special case and only valid to parse if destructible
  SeenProto = 1 << 6
}
export function getStartLoc(parser: ParserState) {
  return { start: parser.start, line: parser.line, column: parser.line };
}

/**
 * The parser interface.
 */
export interface ParserState {
  source: string;
  flags: Flags;
  index: number;
  length: number;
  start: number;
  endIndex: number;
  prevLinebase: number;
  prevColumn: number;
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
  destructible: DestructuringKind;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
  lastChar: number;
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

export function setLoc(parser: ParserState, line: number, column: number): any {
  return {
    start: {
      line,
      column
    },
    end: {
      line: parser.prevLinebase,
      column: parser.prevColumn
    }
  };
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

export function validateBreakLabel(parser: ParserState, labels: any, label: string): 0 | 1 {
  if (labels === null) report(parser, Errors.Unexpected);

  if (labels['#' + label]) return 1;

  while ((labels = labels.parentLabels)) if (labels['#' + label]) return 1;

  return 0;
}

export interface Label {
  iterationLabels: string[];
  parentLabels: any;
}

export function validateContinueLabel(parser: ParserState, labels: Label, label: string): void {
  let found: 0 | 1 = 0;
  let iterationLabel: any;
  l: while (labels) {
    if (labels.iterationLabels) {
      iterationLabel = labels.iterationLabels;
      for (let i = 0; i < iterationLabel.length; i++) {
        if (iterationLabel[i] === label) {
          found = 1;
          break l;
        }
      }
    }
    labels = labels.parentLabels;
  }
  if (found === 0) {
    report(parser, Errors.UnknownLabel, label);
  }
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

export function isStrictReservedWord(parser: ParserState, context: Context, t: Token): boolean {
  if (t === Token.AwaitKeyword) {
    if (context & (Context.InAwaitContext | Context.Module)) report(parser, Errors.AwaitOutsideAsync);
  }

  if (t === Token.YieldKeyword && context & Context.InYieldContext) report(parser, Errors.DisallowedInContext, 'yield');

  return (
    (t & Token.Keyword) === Token.Keyword ||
    (t & Token.FutureReserved) === Token.FutureReserved ||
    t == Token.EscapedFutureReserved
  );
}
