import { Chars } from './';
import { ParserState } from '../parser/common';
import { report, Errors } from '../errors';

function binInterpolationLookup(table: number[], size: number, char: number): boolean {
  const value = char & ((1 << 13) - 1);

  let low = 0;
  let high = size - 1;

  while (high != low) {
    const mid = low + ((high - low) >> 1);

    const curValue = table[1 * mid] & ((1 << 30) - 1);

    if (curValue <= value && (mid + 1 == size || table[1 * mid + 1] & ((1 << 30) - 1)) > value) {
      low = mid;
      break;
    } else if (curValue < value) {
      low = mid + 1;
    } else if (curValue > value) {
      if (mid == 0) break;
      high = mid - 1;
    }
  }

  const field = table[1 * low];

  const entry = field & ((1 << 30) - 1);

  return entry == value || (entry < value && (field & (1 << 30)) != 0);
}

// ECMA-262 11.2 White Space
// gC=Zs, U+0009, U+000B, U+000C, U+FEFF
export function isWhiteSpaceSlow(char: number): boolean {
  switch (char >> 13) {
    case 0:
      return binInterpolationLookup([9, 1073741835, 12, 32, 160, 5760], 6, char);
    case 1:
      return binInterpolationLookup([1073741824, 10, 47, 95, 4096], 5, char);
    case 7:
      return binInterpolationLookup([7935], 1, char);
    default:
      return false;
  }
}

// LineTerminator:       'JS_Line_Terminator' in point.properties
// ES#sec-line-terminators lists exactly 4 code points:
// LF (U+000A), CR (U+000D), LS(U+2028), PS(U+2029)
export function isLineTerminator(char: number): boolean {
  return char === Chars.CarriageReturn || char === Chars.LineFeed || (char & ~1) === Chars.LineSeparator;
}

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
