import { Token } from '../token';
import { ParserState, Flags } from './common';
import { Context } from '../parser/common';
import { nextToken } from '../scanner/scan';
import { skipHashBang } from '../scanner/comments';
import { parseModuleItemListAndDirectives } from '../parser/module';
import { parseStatementList } from '../parser/statements';
import { ScopeKind } from '../parser/scope';
import { Errors, report } from '../errors';

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
 * Create a new parser instance.
 */
export function create(source: string): ParserState {
  return {
    source,
    flags: Flags.Empty,
    index: 0,
    start: 0,
    endIndex: 0,
    lastColumn: 0,
    column: 0,
    line: 0,
    lineBase: 1,
    offset: 0,
    length: source.length,
    prevLinebase: 1,
    token: Token.EOF,
    newLine: 0,
    tokenValue: undefined,
    tokenRaw: '',
    tokenRegExp: undefined,
    lastChar: 0,
    assignable: 1,
    containsEscapes: 0,
    exportedNames: [],
    exportedBindings: []
  };
}

/**
 * Consumes a sequence of tokens and produces an syntax tree
 */
export function parseSource(source: string, options: Options | void, context: Context): any {
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
