import { Token } from '../token';
import { ParserState, Flags } from './common';

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
