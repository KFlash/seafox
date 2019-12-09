import { Token } from '../token';
import { nextToken } from '../scanner/scan';
import * as ESTree from './estree';
import { skipHashBang } from '../scanner/comments';
import { parseModuleItemListAndDirectives } from './module';
import { parseStatementList } from './statements';
import { Context, Flags, ParserState, DestructuringKind, AssignmentKind } from './common';
import { ScopeState, createScope } from './scope';

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
}

/**
 * Create a new parser instance.
 */
export function create(source: string): ParserState {
  return {
    source,
    flags: Flags.Empty,
    index: 0,
    length: source.length,
    start: 0,
    endIndex: 0,
    lineBase: 1,
    offset: 0,
    prevLinebase: 1,
    isUnicodeEscape: 0,
    prevColumn: 0,
    column: 0,
    line: 0,
    token: Token.EOF,
    newLine: 0,
    tokenValue: undefined,
    tokenRaw: '',
    tokenRegExp: undefined,
    lastChar: 0,
    assignable: AssignmentKind.Assignable,
    destructible: DestructuringKind.None
  };
}

export function parseSource(source: string, options: Options | void, context: Context): ESTree.Program {
  if (options != null) {
    if (options.module) context |= Context.Module | Context.Strict;
    if (options.next) context |= Context.OptionsNext;
    if (options.loc) context |= Context.OptionsLoc;
    if (options.disableWebCompat) context |= Context.OptionsDisableWebCompat;
    if (options.directives) context |= Context.OptionsDirectives | Context.OptionsRaw;
    if (options.raw) context |= Context.OptionsRaw;
    if (options.impliedStrict) context |= Context.Strict;
  }

  let body: any[] = [];

  let sourceType: 'module' | 'script' = 'script';

  const parser = create(source);

  skipHashBang(parser, source);

  const scope: ScopeState = createScope();

  nextToken(parser, context, /* allowRegExp */ 1);

  if (context & Context.Module) {
    sourceType = 'module';
    body = parseModuleItemListAndDirectives(parser, context | Context.InGlobal, scope);
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
