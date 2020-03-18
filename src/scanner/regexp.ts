import { Chars, isIdentifierPart, CharFlags, CharTypes } from './';
import { ParserState } from '../parser/common';
import { Token } from '../token';
import { report, Errors } from '../errors';

/**
 * Scans regular expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function scanRegularExpression(parser: ParserState, source: string, i: number): Token {
  const enum RegexState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2
  }
  const bodyStart = i;
  // Scan: ('/' | '/=') RegularExpressionBody '/' RegularExpressionFlags
  let preparseState = RegexState.Empty;

  while (true) {
    const ch = source.charCodeAt(i);
    i++;
    if (preparseState & RegexState.Escape) {
      preparseState &= ~RegexState.Escape;
    } else {
      if (ch <= 0x5e) {
        if (ch === Chars.Slash) {
          if (!preparseState) break;
        } else if (ch === Chars.Backslash) {
          preparseState |= RegexState.Escape;
        } else if (ch === Chars.LeftBracket) {
          preparseState |= RegexState.Class;
        } else if (ch === Chars.RightBracket) {
          preparseState &= RegexState.Escape;
        } else if ((CharTypes[ch] & CharFlags.LineTerminator) === CharFlags.LineTerminator) {
          report(parser, Errors.UnterminatedRegExp);
        }
      } else if ((ch & ~1) === Chars.LineSeparator) {
        report(parser, Errors.UnterminatedRegExp);
      }
    }

    if (i >= parser.length) {
      report(parser, Errors.UnterminatedRegExp);
    }
  }

  const bodyEnd = i - 1;

  const enum RegexFlags {
    Empty = 0b00000000000000000000000000000000,
    Global = 0b00000000000000000000000000000001,
    IgnoreCase = 0b00000000000000000000000000000010,
    Multiline = 0b00000000000000000000000000000100,
    Unicode = 0b00000000000000000000000000001000,
    Sticky = 0b00000000000000000000000000010000,
    DotAll = 0b00000000000000000000000000100000
  }

  let mask = RegexFlags.Empty;

  const flagStart = i;

  let char = source.charCodeAt(i);

  while (isIdentifierPart(char)) {
    switch (char) {
      case Chars.LowerG:
        if (mask & RegexFlags.Global) report(parser, Errors.DuplicateRegExpFlag, 'g');
        mask |= RegexFlags.Global;
        break;

      case Chars.LowerI:
        if (mask & RegexFlags.IgnoreCase) report(parser, Errors.DuplicateRegExpFlag, 'i');
        mask |= RegexFlags.IgnoreCase;
        break;

      case Chars.LowerM:
        if (mask & RegexFlags.Multiline) report(parser, Errors.DuplicateRegExpFlag, 'm');
        mask |= RegexFlags.Multiline;
        break;

      case Chars.LowerU:
        if (mask & RegexFlags.Unicode) report(parser, Errors.DuplicateRegExpFlag, 'g');
        mask |= RegexFlags.Unicode;
        break;

      case Chars.LowerY:
        if (mask & RegexFlags.Sticky) report(parser, Errors.DuplicateRegExpFlag, 'y');
        mask |= RegexFlags.Sticky;
        break;

      case Chars.LowerS:
        if (mask & RegexFlags.DotAll) report(parser, Errors.DuplicateRegExpFlag, 's');
        mask |= RegexFlags.DotAll;
        break;

      default:
        report(parser, Errors.UnexpectedTokenRegExpFlag);
    }

    i++;
    char = source.charCodeAt(i);
  }

  const flags = source.slice(flagStart, i);

  const pattern = source.slice(bodyStart, bodyEnd);

  parser.tokenRegExp = { pattern, flags };

  parser.index = i;

  try {
    RegExp(pattern);
  } catch (e) {
    report(parser, Errors.Unexpected);
  }

  try {
    parser.tokenValue = new RegExp(pattern, flags);
  } catch (e) {
    parser.tokenValue = null;
  }

  return Token.RegularExpression;
}
