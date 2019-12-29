import { ParserState } from './common';
import { BindingKind, Origin, Context } from './bits';
import { Errors, report } from '../errors';

/**
 * Scope kinds
 */
export const enum ScopeKind {
  None = 0b00000000000000000000000000000000,
  ForStatement = 0b00000000000000000000000000000001,
  Block = 0b00000000000000000000000000000010,
  CatchStatement = 0b00000000000000000000000000000100,
  SwitchStatement = 0b00000000000000000000000000001000,
  TryStatement = 0b00000000000000000000000000010000,
  CatchBlock = 0b00000000000000000000000000100000,
  FunctionBody = 0b00000000000000000000000001000000,
  FunctionRoot = 0b00000000000000000000000010000000,
  FunctionParams = 0b00000000000000000000000100000000,
  ArrowParams = 0b00000000000000000000001000000000,
  CatchIdentifier = 0b00000000000000000000010000000000
}

/**
 * Lexical scope interface
 */
export interface ScopeState {
  parent: ScopeState | undefined;
  type: ScopeKind;
  scopeError?: ScopeError | null;
}

/** Scope error interface */
export interface ScopeError {
  type: Errors;
  params: string[];
  index: number;
  line: number;
  column: number;
}

/**
 * Record duplicate binding errors that may occur in a arrow head or function parameters
 *
 * @param parser Parser state
 * @param type Errors type
 */
export function recordScopeError(parser: ParserState, type: Errors, ...params: string[]): ScopeError {
  return {
    type,
    params,
    index: parser.index,
    line: parser.line,
    column: parser.column
  };
}

/**
 * Adds either a var binding or a block scoped binding.
 *
 * @param parser Parser state
 * @param context Context masks
 * @param scope Scope state
 * @param name Binding name
 * @param type Binding kind
 * @param origin Binding Origin
 */
export function addVarOrBlock(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  name: string,
  kind: BindingKind,
  origin: Origin
) {
  if (kind & BindingKind.Variable) {
    addVarName(parser, context, scope, name, kind);
  } else {
    addBlockName(parser, context, scope, name, kind, origin);
  }
}

/**
 * Adds block scoped binding
 *
 * @param parser Parser state
 * @param context Context masks
 * @param scope Scope state
 * @param name Binding name
 * @param type Binding kind
 * @param origin Binding Origin
 */
export function addBlockName(
  parser: ParserState,
  context: Context,
  scope: any,
  name: string,
  kind: BindingKind,
  origin: Origin
) {
  if (scope === void 0) return;

  const value = scope['#' + name];

  if (value && (value & BindingKind.Tail) !== BindingKind.Tail) {
    if (kind & BindingKind.ArgumentList) {
      scope.scopeError = recordScopeError(parser, Errors.DuplicateBinding, name);
    } else if (
      (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat &&
      value & BindingKind.FunctionLexical &&
      origin & Origin.BlockStatement
    ) {
    } else {
      report(parser, Errors.DuplicateBinding, name);
    }
  }

  if (
    scope.type & ScopeKind.FunctionBody &&
    scope.parent['#' + name] &&
    (scope.parent['#' + name] & BindingKind.Tail) !== BindingKind.Tail
  ) {
    report(parser, Errors.DuplicateBinding, name);
  }

  if (scope.type & ScopeKind.ArrowParams && value && (value & BindingKind.Tail) !== BindingKind.Tail) {
    if ((kind & BindingKind.ArgumentList) === BindingKind.ArgumentList) {
      scope.scopeError = recordScopeError(parser, Errors.DuplicateBinding, name);
    }
  }

  if (scope.type & ScopeKind.CatchBlock) {
    if (scope.parent['#' + name] & BindingKind.CatchIdentifierOrPattern)
      report(parser, Errors.ShadowedCatchClause, name);
  }

  scope['#' + name] = kind;
}

/**
 * Adds a variable binding
 *
 * @param parser Parser state
 * @param context Context masks
 * @param scope Scope state
 * @param name Binding name
 * @param type Binding kind
 */
export function addVarName(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  name: string,
  kind: BindingKind
): void {
  if (scope === void 0) return;

  let currentScope: any = scope;

  while (currentScope && (currentScope.type & ScopeKind.FunctionRoot) === 0) {
    const value: ScopeKind = currentScope['#' + name];

    if (value & BindingKind.LexicalBinding) {
      if (
        (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat &&
        (context & Context.Strict) === 0 &&
        ((kind & BindingKind.FunctionStatement && value & BindingKind.LexicalOrFunction) ||
          (value & BindingKind.FunctionStatement && kind & BindingKind.LexicalOrFunction))
      ) {
      } else {
        report(parser, Errors.DuplicateBinding, name);
      }
    }
    if (currentScope === scope) {
      if (value & BindingKind.ArgumentList && kind & BindingKind.ArgumentList) {
        currentScope.scopeError = recordScopeError(parser, Errors.DuplicateBinding, name);
      }
    }
    if (value & (BindingKind.CatchIdentifier | BindingKind.CatchPattern)) {
      if (context & (Context.Strict | Context.OptionsDisableWebCompat) || (value & BindingKind.CatchIdentifier) === 0) {
        report(parser, Errors.DuplicateBinding, name);
      }
    }

    currentScope['#' + name] = kind;

    currentScope = currentScope.parent;
  }
}
