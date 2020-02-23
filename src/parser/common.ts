import { Token, KeywordDescTable } from '../token';
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
  OptionsPreserveParens = 1 << 7,
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
  Destructible = 1 << 1,
  AssignableDestruct = 1 << 2,
  NotDestructible = 1 << 3,
  MustDestruct = 1 << 4,
  StrictEvalArguments = 1 << 5,
  HasStrictReserved = 1 << 6,
  Octals = 1 << 7,
  SimpleParameterList = 1 << 8,
  SeenProto = 1 << 9,
  SeenYield = 1 << 10,
  SeenAwait = 1 << 11
}

export const enum Origin {
  None = 0,
  Statement = 1 << 0,
  BlockStatement = 1 << 1,
  TopLevel = 1 << 2,
  Declaration = 1 << 3,
  Arrow = 1 << 4,
  ForStatement = 1 << 5,
  Export = 1 << 6,
  Hoisted = 1 << 7
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
  Getter = 1 << 7,
  Setter = 1 << 8
}

/**
 * Masks to track the binding kind
 */
export const enum BindingKind {
  None = 0,
  ArgumentList = 1 << 0,
  Variable = 1 << 1,
  FunctionLexical = 1 << 2,
  Tail = 1 << 3,
  Let = 1 << 4,
  Const = 1 << 5,
  Class = 1 << 6,
  FunctionStatement = 1 << 7,
  CatchPattern = 1 << 8,
  CatchIdentifier = 1 << 9,
  Pattern = 1 << 10
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
  token: Token;
  newLine: 0 | 1;
  tokenValue: any;
  tokenRaw: string;
  assignable: 0 | 1;
  lastChar: number;
  exportedNames: any;
  exportedBindings: any;
  containsEscapes: 0 | 1;
  tokenRegExp: void | {
    pattern: string;
    flags: string;
  };
}

export function expectSemicolon(parser: ParserState, context: Context): void {
  // Check for automatic semicolon insertion according to
  // the rules given in ECMA-262, section 7.9, page 21.
  if (parser.token === Token.Semicolon) {
    nextToken(parser, context, /* allowRegExp */ 1);
    return;
  }
  if (parser.newLine === 1 || (parser.token & 0b00000001000000000000000000000000) > 0) {
    return;
  }

  report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
}

export function consumeOpt(parser: ParserState, context: Context, t: Token, allowRegExp: 0 | 1): 0 | 1 {
  if (parser.token !== t) return 0;
  nextToken(parser, context, allowRegExp);
  return 1;
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
    case 'ArrayExpression': {
      node.type = 'ArrayPattern';
      const elements = node.elements;
      let i = elements.length;
      while (i--) {
        if (elements[i]) reinterpretToPattern(state, elements[i]);
      }

      return;
    }
    case 'ObjectExpression':
      node.type = 'ObjectPattern';
      const properties = node.properties;
      let i = properties.length;
      while (i--) {
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
      return;
    default: // ignore
  }
}

export function parseStatementWithLabelSet(t: Token, label: any, labels: any, nestedLabels: any) {
  if (nestedLabels) {
    nestedLabels.push(label);
  } else {
    nestedLabels = [label];
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
    if (set['#' + label]) report(parser, Errors.LabelRedeclaration);
    set = set.parentLabels;
  }
  labels = { parentLabels: labels, iterationLabels: null };
  labels['#' + label] = true;

  if (nestedLabels) {
    nestedLabels.push(label);
  } else {
    nestedLabels = [label];
  }

  return labels;
}

export function checkBreakStatement(parser: ParserState, labels: any, value: string): 0 | 1 {
  if (!labels) report(parser, Errors.Unexpected);

  if (labels['#' + value]) return 1;

  while ((labels = labels.parentLabels)) if (labels['#' + value]) return 1;

  return 0;
}

export function checkContinueStatement(labels: any, value: string): 0 | 1 {
  let iterationLabel: any;

  while (labels) {
    if (labels.iterationLabels) {
      iterationLabel = labels.iterationLabels;
      for (let i = 0; i < iterationLabel.length; i++) {
        if (iterationLabel[i] === value) {
          return 1;
        }
      }
    }
    labels = labels.parentLabels;
  }
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

export function consume(parser: ParserState, context: Context, t: Token, allowRegExp: 0 | 1): void {
  if (parser.token !== t) report(parser, Errors.UnexpectedToken, KeywordDescTable[t & Token.Kind]);
  nextToken(parser, context, allowRegExp);
}

export function validateFunctionName(parser: ParserState, context: Context, t: Token): void {
  if (context & Context.Strict) {
    if ((t & Token.FutureReserved) > 0) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
    if ((t & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  if ((t & Token.Keyword) === Token.Keyword) report(parser, Errors.KeywordNotId);

  if ((context & 0b00000000010000000000100000000000) > 0 && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
  }

  if ((context & 0b00000000001000000000010000000000) > 0 && t === Token.YieldKeyword) {
    report(parser, Errors.DisallowedInContext, 'yield');
  }
}

export function isValidIdentifier(context: Context, t: Token): boolean {
  return context & Context.Strict
    ? context & Context.Module && t === Token.AwaitKeyword
      ? false
      : (context & 0b00000000001000000000010000000000) > 0 && t === Token.YieldKeyword
      ? false
      : t === Token.LetKeyword
      ? false
      : (t & Token.IsIdentifier) > 0
    : (t & Token.IsIdentifier) > 0 || (t & Token.FutureReserved) > 0;
}

export function isStrictReservedWord(parser: ParserState, context: Context, t: Token, inGroup: 0 | 1): boolean {
  if (t === Token.AwaitKeyword) {
    if ((context & 0b00000000010000000000100000000000) > 0) report(parser, Errors.AwaitOutsideAsync);
    parser.flags |= inGroup === 1 ? Flags.SeenAwait : 0;
  }
  if ((t & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
    report(parser, Errors.StrictEvalArguments);
  }

  return (t & Token.Keyword) > 0 || (t & Token.FutureReserved) > 0 || t == Token.FutureStrictReserved;
}

export function validateIdentifier(parser: ParserState, context: Context, kind: BindingKind, t: Token): void {
  if (context & Context.Strict && (t & Token.FutureReserved) > 0) {
    report(parser, Errors.UnexpectedStrictReserved);
  }

  if ((t & Token.Keyword) > 0) {
    report(parser, Errors.KeywordNotId);
  }

  // Note: The BoundNames of LexicalDeclaration and ForDeclaration must not
  // contain 'let'. (CatchParameter is the only lexical binding form
  // without this restriction.)

  if ((kind & 0b00000000000000000000000000110000) > 0 && t === Token.LetKeyword) {
    report(parser, Errors.InvalidLetConstBinding);
  }

  if ((context & 0b00000000010000000000100000000000) > 0 && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
  }

  if ((context & 0b00000000001000000000010000000000) > 0 && t === Token.YieldKeyword) {
    report(parser, Errors.DisallowedInContext, 'yield');
  }
}
