import { CharTypes, CharFlags } from './charClassifier';
import { Chars } from '../chars';
import { ParserState } from '../parser/common';
import { toHex, fromCodePoint, readNext } from './common';
import { Token } from '../token';
import { Errors, report } from '../errors';
import { Context, Flags } from '../parser/bits';

export const enum Escape {
  Empty = -1,
  StrictOctal = -2,
  EightOrNine = -3,
  InvalidHex = -4,
  OutOfRange = -5,
  MissingCurlyBrace = -6
}

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
        if ((CharTypes[char] & CharFlags.LineTerminator) === CharFlags.LineTerminator) {
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
  let ch = readNext(parser);

  switch (first) {
    case Chars.LowerB:
      return Chars.Backspace;
    case Chars.LowerF:
      return Chars.FormFeed;
    case Chars.LowerR:
      return Chars.CarriageReturn;
    case Chars.LowerN:
      return Chars.LineFeed;
    case Chars.LowerT:
      return Chars.Tab;
    case Chars.LowerV:
      return Chars.VerticalTab;

    case Chars.LowerU: {
      let code = 0;
      if (ch === Chars.LeftBrace) {
        // \u{N}
        let digit = toHex(source.charCodeAt(++parser.index));
        while (digit >= 0) {
          if (digit < 0) return Escape.InvalidHex;
          code = (code << 4) | digit;
          if (code > Chars.LastUnicodeChar) break;
          digit = toHex((ch = source.charCodeAt(++parser.index)));
        }
        // At least 4 characters have to be read
        if (code < 0 || ch !== Chars.RightBrace) return Escape.InvalidHex;

        parser.index++; // consumes '}'
        return code;
      }

      // \uNNNN

      let i = 0;
      for (i = 0; i < 4; i++) {
        const digit = toHex(source.charCodeAt(parser.index++));
        if (digit < 0) return Escape.InvalidHex;
        code = (code << 4) | digit;
      }

      return code;
    }
    case Chars.LowerX: {
      const hi = toHex(ch);
      if (hi < 0) return Escape.InvalidHex;
      const ch2 = source.charCodeAt(++parser.index);
      const lo = toHex(ch2);
      if (lo < 0) return Escape.InvalidHex;
      parser.index++;
      return (hi << 4) | lo;
    }

    // Null character, octals
    case Chars.Zero:
    case Chars.One:
    case Chars.Two:
    case Chars.Three:
    case Chars.Four:
    case Chars.Five:
    case Chars.Six:
    case Chars.Seven: {
      if (context & (Context.OptionsDisableWebCompat | Context.Strict)) {
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
    case Chars.Eight:
    case Chars.Nine:
      return Escape.EightOrNine;
    case Chars.CarriageReturn:
      const index = parser.index;
      if (index < parser.length) {
        if (source.charCodeAt(index) === Chars.LineFeed) {
          parser.index = index + 1;
        }
      }

    // falls through

    case Chars.LineFeed:
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
