import { Chars, skipSingleLineComment } from './';
import { ParserState } from '../parser/common';
import { report, Errors } from '../errors';

export function skipMeta(parser: ParserState, source: string): void {
  let index = 0;

  if (index === parser.length) return;

  // Absorb any byte order mark at the start

  if (source.charCodeAt(index) === Chars.ByteOrderMark) parser.index = index += 1;

  if (index < source.length && source.charCodeAt(index) === Chars.Hash) {
    index++;

    if (index < source.length && source.charCodeAt(index) === Chars.Exclamation) {
      parser.index = skipSingleLineComment(parser, source, index);
    } else {
      report(parser, Errors.UnexpectedToken, '#');
    }
  }
}

export function readNext(parser: ParserState): number {
  parser.index++;
  if (parser.index >= parser.length) report(parser, Errors.UnterminatedString);
  return parser.source.charCodeAt(parser.index);
}

// Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.

export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

// Optimized version of 'fromCodePoint'

export function fromCodePoint(codePoint: number): string {
  return codePoint <= 65535
    ? String.fromCharCode(codePoint)
    : String.fromCharCode(codePoint >>> 10) + String.fromCharCode(codePoint & 0x3ff);
}
