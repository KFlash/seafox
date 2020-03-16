import { Chars } from './';
import { ParserState } from '../parser/common';
import { report, Errors } from '../errors';

export function readNext(parser: ParserState): number {
  parser.index++;
  if (parser.index >= parser.length) report(parser, Errors.UnterminatedString);
  return parser.source.charCodeAt(parser.index);
}

/**
 * Converts an ASCII alphanumeric digit [0-9a-zA-Z] to number as if in base-36.
 *
 * @param code CodePoint
 */
export function toHex(code: number): number {
  code -= Chars.Zero;
  if (code <= 9) return code;
  code = (code | 0x20) - (Chars.LowerA - Chars.Zero);
  if (code <= 5) return code + 10;
  return -1;
}

/**
 * Optimized version of 'fromCodePoint'
 *
 * @param {number} code
 * @returns {string}
 */
export function fromCodePoint(codePoint: number): string {
  return codePoint <= 65535
    ? String.fromCharCode(codePoint)
    : String.fromCharCode(codePoint >>> 10) + String.fromCharCode(codePoint & 0x3ff);
}
