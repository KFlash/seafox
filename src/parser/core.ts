import { Token } from '../token';
import { ParserState } from './common';
import { Flags } from './bits';

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
    start: 0,
    endIndex: 0,
    lastColumn: 0,
    column: 0,
    line: 0,
    lineBase: 1,
    offset: 0,
    length: source.length,
    prevLinebase: 1,
    isUnicodeEscape: 0,
    token: Token.EOF,
    newLine: 0,
    tokenValue: undefined,
    tokenRaw: '',
    tokenRegExp: undefined,
    lastChar: 0,
    assignable: 1,
    exportedNames: [],
    exportedBindings: []
  };
}
