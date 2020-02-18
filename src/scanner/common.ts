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

// ECMA-262 11.2 White Space
// gC=Zs, U+0009, U+000B, U+000C, U+FEFF
export function isWhiteSpaceSlow(ch: number): boolean {
  return (
    ch === Chars.NonBreakingSpace ||
    ch === Chars.ZeroWidthNoBreakSpace ||
    ch === Chars.NextLine ||
    ch === Chars.Ogham ||
    (ch >= Chars.EnQuad && ch <= Chars.ZeroWidthSpace) ||
    ch === Chars.NarrowNoBreakSpace ||
    ch === Chars.MathematicalSpace ||
    ch === Chars.IdeographicSpace ||
    ch === Chars.ThinSpace ||
    ch === Chars.ByteOrderMark ||
    (ch < 0x0d && (ch == 0x09 || ch == 0x0b || ch == 0x0c)) ||
    ch == 0xfeff
  );
}
