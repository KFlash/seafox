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
  if (origin & Origin.Export) {
    declareUnboundVariable(parser, name);
  }
}

export function declareUnboundVariable(parser: ParserState, name: string): void {
  if (parser.exportedNames !== void 0 && name !== '') {
    if (parser.exportedNames['#' + name]) {
      report(parser, Errors.DuplicateExportBinding, name);
    }
    parser.exportedNames['#' + name] = 1;
  }
}

/**
 * Appends a name to the `ExportedBindings` of the `ExportsList`,
 *
 * @see [Link](https://tc39.es/ecma262/$sec-exports-static-semantics-exportedbindings)
 *
 * @param parser Parser object
 * @param name Exported binding name
 */
export function addBindingToExports(parser: ParserState, name: string): void {
  if (parser.exportedBindings !== void 0 && name !== '') {
    parser.exportedBindings['#' + name] = 1;
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

  if (value && (value & 0b00000000000000000000000000001000) === 0) {
    if (kind & BindingKind.ArgumentList) {
      scope.scopeError = recordScopeError(parser, Errors.DuplicateBinding, name);
    } else if (
      context & Context.OptionsDisableWebCompat ||
      (value & BindingKind.FunctionLexical) === 0 ||
      (origin & Origin.BlockStatement) === 0
    ) {
      report(parser, Errors.DuplicateBinding, name);
    }
  }
  const parent = scope.parent;

  if (
    scope.type & ScopeKind.FunctionBody &&
    parent['#' + name] &&
    (parent['#' + name] & 0b00000000000000000000000000001000) === 0
  ) {
    report(parser, Errors.DuplicateBinding, name);
  }

  if (scope.type & ScopeKind.CatchBlock && (parent['#' + name] & 0b00000000000000000000001100000000) > 0) {
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
  curScope: ScopeState,
  name: string,
  kind: BindingKind
): void {
  if (curScope === void 0) return;

  let scope: any = curScope;

  while (scope && (scope.type & ScopeKind.FunctionRoot) === 0) {
    const value: ScopeKind = scope['#' + name];

    if ((value & 0b00000000000000000000000011110100) > 0) {
      if (
        (context & 0b00000000000000000000010000010000) === 0 &&
        ((kind & BindingKind.FunctionStatement && (value & 0b00000000000000000000000000000110) > 0) ||
          (value & BindingKind.FunctionStatement && (kind & 0b00000000000000000000000000000110) > 0))
      ) {
      } else {
        report(parser, Errors.DuplicateBinding, name);
      }
    }

    if (value & BindingKind.ArgumentList && kind & BindingKind.ArgumentList && scope === curScope) {
      scope.scopeError = recordScopeError(parser, Errors.DuplicateBinding, name);
    }

    if (
      (value & 0b00000000000000000000001100000000) > 0 &&
      ((context & 0b00000000000000000000010000010000) > 0 || (value & BindingKind.CatchIdentifier) === 0)
    ) {
      report(parser, Errors.DuplicateBinding, name);
    }

    scope['#' + name] = kind;

    scope = scope.parent;
  }
}
