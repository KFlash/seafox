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
export function isExoticECMAScriptWhitespace(code: number): boolean {
  /**
   * There are 25 white space characters we need to correctly class.
   * The lower ASCII range (127) white space have already been classified, so
   * only needed is to validate against the remaining
   * 15 Unicode category "Zs" ("Space_Separator") chars.
   *
   * - 0x1680
   * - 0x2000
   * - 0x2001
   * - 0x2002
   * - 0x2003
   * - 0x2004
   * - 0x2005
   * - 0x2006
   * - 0x2007
   * - 0x2008
   * - 0x2009
   * - 0x200a
   * - 0x2028 // <LS> LineTerminator (LINE SEPARATOR)
   * - 0x2029 // <PS> LineTerminator (PARAGRAPH SEPARATOR)
   * - 0x202f
   * - 0x205f
   * - 0x3000
   * - 0xfeff // <ZWNBSP>
   */
  return (
    code === Chars.NonBreakingSpace ||
    code === Chars.ZeroWidthNoBreakSpace ||
    code === Chars.NextLine ||
    code === Chars.Ogham ||
    (code >= Chars.EnQuad && code <= Chars.ZeroWidthSpace) ||
    code === Chars.NarrowNoBreakSpace ||
    code === Chars.MathematicalSpace ||
    code === Chars.IdeographicSpace ||
    code === Chars.ThinSpace ||
    code === Chars.ByteOrderMark
  );
}
