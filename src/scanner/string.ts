import { ParserState, Context, Flags } from '../parser/common';
import { Chars, toHex, fromCodePoint, readNext, CharTypes } from './';
import { Token } from '../token';
import { Errors, report } from '../errors';

export const enum Escape {
  None = 0b00000000000000000000000000000000,
  EscapedBackspace = 0b00000000000000000000000000000001,
  EscapedFormFeed = 0b00000000000000000000000000000010,
  EscapedCarriageReturn = 0b00000000000000000000000000000011,
  EscapedLineFeed = 0b00000000000000000000000000000100,
  EscapedTab = 0b00000000000000000000000000000101,
  EscapedVerticalTab = 0b00000000000000000000000000000110,
  Unicode = 0b00000000000000000000000000000111,
  Hex = 0b00000000000000000000000000001000,
  Octals = 0b00000000000000000000000000001001,
  LineFeed = 0b00000000000000000000000000001010,
  CarriageReturn = 0b00000000000000000000000000001011,
  NineOrEight = 0b00000000000000000000000000001100,

  // Intentionally negative
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5
}

/**
 * Lookup table for mapping a codepoint to a set of flags
 */
export const EscapeTypes = [
  Escape.None /* 0x00   */,
  Escape.None /* 0x01   */,
  Escape.None /* 0x02   */,
  Escape.None /* 0x03   */,
  Escape.None /* 0x04   */,
  Escape.None /* 0x05   */,
  Escape.None /* 0x06   */,
  Escape.None /* 0x07   */,
  Escape.None /* 0x08   */,
  Escape.None /* 0x09   */,
  Escape.LineFeed /* 0x0A   */,
  Escape.None /* 0x0B   */,
  Escape.None /* 0x0C   */,
  Escape.CarriageReturn /* 0x0D   */,
  Escape.None /* 0x0E   */,
  Escape.None /* 0x0F   */,
  Escape.None /* 0x10   */,
  Escape.None /* 0x11   */,
  Escape.None /* 0x12   */,
  Escape.None /* 0x13   */,
  Escape.None /* 0x14   */,
  Escape.None /* 0x15   */,
  Escape.None /* 0x16   */,
  Escape.None /* 0x17   */,
  Escape.None /* 0x18   */,
  Escape.None /* 0x19   */,
  Escape.None /* 0x1A   */,
  Escape.None /* 0x1B   */,
  Escape.None /* 0x1C   */,
  Escape.None /* 0x1D   */,
  Escape.None /* 0x1E   */,
  Escape.None /* 0x1F   */,
  Escape.None /* 0x20   */,
  Escape.None /* 0x21 ! */,
  Escape.None /* 0x22   */,
  Escape.None /* 0x23 # */,
  Escape.None /* 0x24 $ */,
  Escape.None /* 0x25 % */,
  Escape.None /* 0x26 & */,
  Escape.None /* 0x27   */,
  Escape.None /* 0x28   */,
  Escape.None /* 0x29   */,
  Escape.None /* 0x2A   */,
  Escape.None /* 0x2B   */,
  Escape.None /* 0x2C   */,
  Escape.None /* 0x2D   */,
  Escape.None /* 0x2E   */,
  Escape.None /* 0x2F   */,
  Escape.Octals /* 0x30 0 */,
  Escape.Octals /* 0x31 1 */,
  Escape.Octals /* 0x32 2 */,
  Escape.Octals /* 0x33 3 */,
  Escape.Octals /* 0x34 4 */,
  Escape.Octals /* 0x35 5 */,
  Escape.Octals /* 0x36 6 */,
  Escape.Octals /* 0x37 7 */,
  Escape.NineOrEight /* 0x38 8 */,
  Escape.NineOrEight /* 0x39 9 */,
  Escape.None /* 0x3A   */,
  Escape.None /* 0x3B   */,
  Escape.None /* 0x3C < */,
  Escape.None /* 0x3D = */,
  Escape.None /* 0x3E > */,
  Escape.None /* 0x3F   */,
  Escape.None /* 0x40 @ */,
  Escape.None /* 0x41 A */,
  Escape.None /* 0x42 B */,
  Escape.None /* 0x43 C */,
  Escape.None /* 0x44 D */,
  Escape.None /* 0x45 E */,
  Escape.None /* 0x46 F */,
  Escape.None /* 0x47 G */,
  Escape.None /* 0x48 H */,
  Escape.None /* 0x49 I */,
  Escape.None /* 0x4A J */,
  Escape.None /* 0x4B K */,
  Escape.None /* 0x4C L */,
  Escape.None /* 0x4D M */,
  Escape.None /* 0x4E N */,
  Escape.None /* 0x4F O */,
  Escape.None /* 0x50 P */,
  Escape.None /* 0x51 Q */,
  Escape.None /* 0x52 R */,
  Escape.None /* 0x53 S */,
  Escape.None /* 0x54 T */,
  Escape.None /* 0x55 U */,
  Escape.None /* 0x56 V */,
  Escape.None /* 0x57 W */,
  Escape.None /* 0x58 X */,
  Escape.None /* 0x59 Y */,
  Escape.None /* 0x5A Z */,
  Escape.None /* 0x5B   */,
  Escape.None /* 0x5C   */,
  Escape.None /* 0x5D   */,
  Escape.None /* 0x5E   */,
  Escape.None /* 0x5F _ */,
  Escape.None /* 0x60   */,
  Escape.None /* 0x61 a */,
  Escape.EscapedBackspace /* 0x62 b */,
  Escape.None /* 0x63 c */,
  Escape.None /* 0x64 d */,
  Escape.None /* 0x65 e */,
  Escape.EscapedFormFeed /* 0x66 f */,
  Escape.None /* 0x67 g */,
  Escape.None /* 0x68 h */,
  Escape.None /* 0x69 i */,
  Escape.None /* 0x6A j */,
  Escape.None /* 0x6B k */,
  Escape.None /* 0x6C l */,
  Escape.None /* 0x6D m */,
  Escape.EscapedLineFeed /* 0x6E n */,
  Escape.None /* 0x6F o */,
  Escape.None /* 0x70 p */,
  Escape.None /* 0x71 q */,
  Escape.EscapedCarriageReturn /* 0x72 r */,
  Escape.None /* 0x73 s */,
  Escape.EscapedTab /* 0x74 t */,
  Escape.Unicode /* 0x75 u */,
  Escape.EscapedVerticalTab /* 0x76 v */,
  Escape.None /* 0x77 w */,
  Escape.Hex /* 0x78 x */,
  Escape.None /* 0x79 y */,
  Escape.None /* 0x7A z */,
  Escape.None /* 0x7B */,
  Escape.None /* 0x7C */,
  Escape.None /* 0x7D */,
  Escape.None /* 0x7E */,
  Escape.None /* 0x7F */
];

export function scanStringLiteral(parser: ParserState, context: Context, source: string, quote: number): Token {
  let char = readNext(parser);
  let res = '';
  let start = parser.index;

  while (char !== quote) {
    if (char <= 0x7e) {
      if (char === Chars.Backslash) {
        res += source.slice(start, parser.index);
        char = readNext(parser);
        const code = scanEscapeSequence(parser, context, source, char);
        if (code <= 0) handleStringError(parser, code as Escape, /* isTemplate */ 0);
        res += fromCodePoint(code);
        start = parser.index;
        parser.isUnicodeEscape = 1;
        char = source.charCodeAt(parser.index);
      } else {
        char = readNext(parser);
        if ((CharTypes[char] & 0b00000000000000000000000000010000) > 0) {
          report(parser, Errors.UnterminatedString);
        }
      }
    } else {
      char = readNext(parser);
      if ((char & ~1) === Chars.LineSeparator) {
        parser.index++;
        parser.offset = parser.index;
        parser.lineBase++;
      }
    }
  }

  res += source.slice(start, parser.index);
  parser.index++; // skip the closing quote
  parser.tokenValue = res;
  return Token.StringLiteral;
}

export function scanEscapeSequence(parser: ParserState, context: Context, source: string, first: number): number {
  let ch = source.charCodeAt(++parser.index);

  switch (EscapeTypes[first]) {
    case Escape.EscapedBackspace:
      return Chars.Backspace;
    case Escape.EscapedFormFeed:
      return Chars.FormFeed;
    case Escape.EscapedCarriageReturn:
      return Chars.CarriageReturn;
    case Escape.EscapedLineFeed:
      return Chars.LineFeed;
    case Escape.EscapedTab:
      return Chars.Tab;
    case Escape.EscapedVerticalTab:
      return Chars.VerticalTab;

    case Escape.Unicode: {
      // Accept both \uxxxx and \u{xxxxxx}. In the latter case, the number of
      // hex digits between { } is arbitrary. \ and u have already been scanned.
      let code = 0;
      if (ch === Chars.LeftBrace) {
        // \u{N}
        let digit = toHex(source.charCodeAt(++parser.index));

        if (digit < 0) return Escape.InvalidHex;

        while (digit >= 0) {
          code = (code << 4) | digit;

          if (code > Chars.LastUnicodeChar) return Escape.OutOfRange;

          ch = source.charCodeAt(++parser.index);

          digit = toHex(ch);
        }
        // At least 4 characters have to be scanned
        if (code < 0 || ch !== Chars.RightBrace) return Escape.InvalidHex;

        parser.index++; // consumes '}'

        return code;
      }

      // \uNNNN

      let i = 0;
      let digit: number | null = null;

      for (i = 0; i < 4; i++) {
        digit = toHex(source.charCodeAt(parser.index++));
        if (digit < 0) return Escape.InvalidHex;
        code = (code << 4) | digit;
      }

      return code;
    }

    case Escape.Hex: {
      const hi = toHex(ch);
      if (hi < 0) return Escape.InvalidHex;
      const lo = toHex(source.charCodeAt(++parser.index));
      if (lo < 0) return Escape.InvalidHex;
      parser.index++;
      return (hi << 4) | lo;
    }

    // Null character, octals
    case Escape.Octals: {
      if ((context & 0b00000000000000000000010000010000) > 0) {
        // Verify that it's `\0` if we're in strict mode.
        return first === Chars.Zero && (ch < Chars.Zero || ch > Chars.Nine) ? first - Chars.Zero : Escape.StrictOctal;
      }

      const code = first - Chars.Zero;

      if (ch >= Chars.Zero && ch <= Chars.Seven) {
        let index = parser.index;
        const value = source.charCodeAt(index) - Chars.Zero;
        if (first >= Chars.Zero && first <= Chars.Three) {
          const ch1 = source.charCodeAt(index + 1);
          if (ch1 >= Chars.Zero && ch1 <= Chars.Seven) {
            parser.index = index += 2;
            return code * 64 + value * 8 + ch1 - Chars.Zero;
          }
        }
        parser.index = index + 1;

        parser.flags |= Flags.Octals;

        return code * 8 + value;
      }

      return code;
    }
    case Escape.NineOrEight:
      return Escape.EightOrNine;
    case Escape.CarriageReturn:
      if (parser.index < parser.length && source.charCodeAt(parser.index + 1) === Chars.LineFeed) {
        parser.index++;
      }

    // falls through

    case Escape.LineFeed:
      parser.offset = parser.index;
      parser.lineBase++;
      return Escape.Empty;
    default:
      return first;
  }
}

export function handleStringError(parser: ParserState, code: Escape, isTemplate: 0 | 1): void {
  switch (code) {
    case Escape.Empty:
      return;

    case Escape.StrictOctal:
      report(parser, isTemplate ? Errors.TemplateOctalLiteral : Errors.StrictOctalEscape);

    case Escape.EightOrNine:
      report(parser, Errors.InvalidEightAndNine);

    case Escape.InvalidHex:
      report(parser, Errors.InvalidHexEscapeSequence);

    case Escape.OutOfRange:
      report(parser, Errors.UnicodeOverflow);

    default:
  }
}
