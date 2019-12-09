import { Chars } from '../chars';
import { Context, ParserState } from '../parser/common';
import { Token } from '../token';
import { isIdentifierPart } from './charClassifier';
import { report, Errors } from '../errors';
import { CharFlags, CharTypes } from './charClassifier';

/**
 * Scans regular expression
 *
 * @param parser Parser object
 * @param context Context masks
 */

export function scanRegularExpression(parser: ParserState, context: Context, source: string): Token {
  const enum RegexState {
    Empty = 0,
    Escape = 0x1,
    Class = 0x2
  }
  const bodyStart = parser.index;
  // Scan: ('/' | '/=') RegularExpressionBody '/' RegularExpressionFlags
  let preparseState = RegexState.Empty;

  while (true) {
    const ch = source.charCodeAt(parser.index);
    parser.index++;
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

    if (parser.index >= parser.length) {
      report(parser, Errors.UnterminatedRegExp);
    }
  }

  const bodyEnd = parser.index - 1;

  const enum RegexFlags {
    Empty = 0b00000,
    IgnoreCase = 0b00001,
    Global = 0b00010,
    Multiline = 0b00100,
    Unicode = 0b10000,
    Sticky = 0b01000,
    DotAll = 0b1100
  }

  let mask = RegexFlags.Empty;

  const { index: flagStart } = parser;
  let char = source.charCodeAt(parser.index);

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

    parser.index++;
    char = source.charCodeAt(parser.index);
  }
  const flags = source.slice(flagStart, parser.index);

  const pattern = source.slice(bodyStart, bodyEnd);

  parser.tokenRegExp = { pattern, flags };

  if (context & Context.OptionsRaw) parser.tokenRaw = source.slice(parser.start, parser.index);

  parser.tokenValue = validate(parser, pattern, flags);

  return Token.RegularExpression;
}

/**
 * Validates regular expressions
 *
 *
 * @param state Parser instance
 * @param context Context masks
 * @param pattern Regexp body
 * @param flags Regexp flags
 */
function validate(parser: ParserState, pattern: string, flags: string): RegExp | null | Token {
  try {
    RegExp(pattern);
  } catch (e) {
    report(parser, Errors.Unexpected);
  }

  try {
    return new RegExp(pattern, flags);
  } catch (e) {
    return null;
  }
}
