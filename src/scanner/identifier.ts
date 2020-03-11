import { ParserState } from '../parser/common';
import { Token, descKeywordTable } from '../token';
import { report, Errors } from '../errors';
import { Chars, isIdentifierPart, CharTypes, CharFlags, fromCodePoint, toHex, unicodeLookup } from './';

export function scanIdentifierOrKeyword(parser: ParserState, source: string, char: number, maybeKeyword: 0 | 1): Token {
  // run to the next non-idPart
  while (
    (CharTypes[char] & 0b00000000000000000000000000000101) > 0 ||
    // Note: "while((unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1)" would be enough to
    // make this work. This is just a performance tweak
    (char > 0x7f && (unicodeLookup[(char >>> 5) + 0] >>> char) & 31 & 1)
  ) {
    char = source.charCodeAt(++parser.index);
  }
  const value = source.slice(parser.start, parser.index);
  if (char > Chars.UpperZ) return scanIdentifierSlowPath(parser, source, value, maybeKeyword, 0);
  parser.tokenValue = value;
  return descKeywordTable[value] || Token.Identifier;
}

export function scanIdentifierSlowPath(
  parser: ParserState,
  source: string,
  value: string,
  maybeKeyword: 0 | 1,
  escaped: 0 | 1
): Token {
  let start = parser.index;
  let char = source.charCodeAt(parser.index);
  let code: number | null = null;

  while (parser.index < parser.length) {
    if (char === Chars.Backslash) {
      value += source.slice(start, parser.index);
      escaped = 1;
      code = scanUnicodeEscape(parser, source);
      if (!isIdentifierPart(code)) report(parser, Errors.InvalidUnicodeEscapeSequence);
      maybeKeyword = 1;
      value += fromCodePoint(code);
      start = parser.index;
    } else {
      if ((char & 0xfc00) === 0xd800) {
        if ((source.charCodeAt(parser.index + 1) & 0xfc00) === 0xdc00) {
          char = 0x10000 + ((char & 0x3ff) << 10) + (source.charCodeAt(parser.index + 1) & 0x3ff);
          if (((unicodeLookup[(char >>> 5) + 0] >>> char) & 31 & 1) === 0) {
            report(parser, Errors.IllegalCaracter, fromCodePoint(char));
          }
          parser.index++;
        }
      }
      if (!isIdentifierPart(char)) break;
      parser.index++;
    }
    char = source.charCodeAt(parser.index);
  }

  value += source.slice(start, parser.index);

  const length = value.length;

  parser.tokenValue = value;

  if (maybeKeyword && length >= 2 && length <= 11) {
    const token: Token | undefined = descKeywordTable[parser.tokenValue];

    if (token === void 0) return Token.Identifier;

    if (escaped === 0) return token;

    parser.containsEscapes = 1;

    return (token & Token.Contextual) === Token.Contextual ? token : token | Token.EscapedKeyword;
  }

  return Token.Identifier;
}
/**
 * Scans unicode identifier
 *
 * @param parser  Parser object
 */
export function scanUnicodeEscape(parser: ParserState, source: string): number {
  // Check for Unicode escape of the form '\uXXXX'
  // and return code point value if valid Unicode escape is found.
  if (source.charCodeAt(parser.index + 1) !== Chars.LowerU) {
    report(parser, Errors.InvalidUnicodeEscapeSequence);
  }

  let code = 0;
  let char = source.charCodeAt((parser.index += 2));
  if (char === Chars.LeftBrace) {
    // '\\u{'
    if (parser.index === source.length) report(parser, Errors.InvalidHexEscapeSequence);

    // \u{N}
    // The first digit is required, so handle it *out* of the loop.
    let digit = toHex(source.charCodeAt(++parser.index));

    if (digit < 0) report(parser, Errors.InvalidHexEscapeSequence);

    while (digit >= 0) {
      code = (code << 4) | digit;
      // Check this early to avoid `code` wrapping to a negative on overflow (which is
      // reserved for abnormal conditions).
      if (code > Chars.LastUnicodeChar) report(parser, Errors.UnicodeOverflow);
      digit = toHex((char = source.charCodeAt(++parser.index)));
    }

    // At least 4 characters have to be read
    if (code < 0 || char !== Chars.RightBrace) report(parser, Errors.InvalidHexEscapeSequence);

    parser.index++; // consumes '}'

    return code;
  }

  // \uNNNN

  const first =
    (toHex(char) << 12) |
    (toHex(source.charCodeAt(parser.index + 1)) << 8) |
    (toHex(source.charCodeAt(parser.index + 2)) << 4);

  const ch4 = source.charCodeAt(parser.index + 3);
  if ((CharTypes[ch4] & CharFlags.Hex) === 0) report(parser, Errors.InvalidHexEscapeSequence);

  parser.index += 4;

  return first | toHex(ch4);
}

export function scanUnicodeEscapeIdStart(parser: ParserState, source: string): Token {
  const cookedChar = scanUnicodeEscape(parser, source);
  if (isIdentifierPart(cookedChar)) {
    return scanIdentifierSlowPath(parser, source, fromCodePoint(cookedChar), /* maybeKeyword */ 1, 1);
  }
  parser.index++; // skip: '\'
  report(parser, Errors.InvalidUnicodeEscapeSequence);
}
