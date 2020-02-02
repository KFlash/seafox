import { Context } from './parser/common';
import { Program } from './parser/types';
import { nextToken } from './scanner/scan';
import { skipHashBang } from './scanner/comments';
import { parseModuleItemListAndDirectives } from './parser/module';
import { parseStatementList } from './parser/statements';
import { create } from './parser/core';
import { ScopeKind } from './parser/scope';
import { Errors, report } from './errors';

/**
 * The parser options.
 */
export interface Options {
  // Allow module code
  module?: boolean;
  // Enable stage 3 support (ESNext)
  next?: boolean;
  // Disable web compability
  disableWebCompat?: boolean;
  // Enable line/column location information start and end offsets to each node
  loc?: boolean;
  // Attach raw property to each literal and identifier node
  raw?: boolean;
  // Enabled directives
  directives?: boolean;
  // Allow return in the global scope
  globalReturn?: boolean;
  // Enable implied strict mode
  impliedStrict?: boolean;
  // Adds a source attribute in every node’s loc object when the locations option is `true`
  source?: string;
  // Distinguish Identifier from IdentifierPattern
  identifierPattern?: boolean;
  // Enable React JSX parsing
  jsx?: boolean;
  // Enable non-standard parenthesized expression node
  preserveParens?: boolean;
}

/**
 * Consumes a sequence of tokens and produces an syntax tree
 */
export function parseRoot(source: string, options: Options | void, context: Context): any {
  if (options != null) {
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
    if (options.directives) context |= Context.OptionsDirectives | Context.OptionsRaw;
    if (options.raw) context |= Context.OptionsRaw;
    if (options.globalReturn) context |= Context.OptionsGlobalReturn;
    if (options.preserveParens) context |= Context.OptionsPreserveParens;
    if (options.impliedStrict) context |= Context.Strict;
  }

  // Initialize parser state
  const parser = create(source);

  // See: https://github.com/tc39/proposal-hashbang
  skipHashBang(parser, source);

  nextToken(parser, context, /* allowRegExp */ 1);

  const scope: any = {
    parent: void 0,
    type: ScopeKind.Block
  };
  let body: any[] = [];

  // https://tc39.es/ecma262/#sec-scripts
  // https://tc39.es/ecma262/#sec-modules

  let sourceType: 'module' | 'script' = 'script';

  if (context & Context.Module) {
    sourceType = 'module';
    body = parseModuleItemListAndDirectives(parser, context | Context.InGlobal, scope);

    const exportedBindings = parser.exportedBindings;

    for (const key in exportedBindings) {
      if (scope[key] === void 0) report(parser, Errors.UndeclaredExportedBinding, key.slice(1));
    }
  } else {
    body = parseStatementList(parser, context | Context.InGlobal, scope);
  }

  return context & Context.OptionsLoc
    ? {
        type: 'Program',
        sourceType,
        body,
        start: 0,
        end: source.length,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: parser.lineBase,
            column: parser.index - parser.offset
          }
        }
      }
    : {
        type: 'Program',
        sourceType,
        body
      };
}

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Program {
  return parseRoot(source, options, Context.Empty);
}

/**
 * Parse a module, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Program {
  return parseRoot(source, options, Context.Strict | Context.Module);
}

export const version = '0.0.15';
