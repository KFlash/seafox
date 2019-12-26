import { ParserState } from '../parser/common';
import { Context } from '../parser/bits';
import { Token } from '../token';
import { Chars } from '../chars';
import { skipSingleLineComment, skipMultiLineComment, skipSingleHTMLComment } from './comments';
import { scanMaybeIdentifier, scanIdentifier, scanIdentifierOrKeyword, scanUnicodeEscapeIdStart } from './identifier';
import { scanStringLiteral } from './string';
import { scanRegularExpression } from './regexp';
import { scanTemplate } from './template';
import { report, Errors } from '../errors';
import { unicodeLookup } from './unicode';
import { CharKinds, firstCharKinds } from './tables';
import { fromCodePoint } from './common';
import {
  scanNumber,
  scanImplicitOctalDigits,
  scanHexDigits,
  scanBinaryDigits,
  scanOctalDigits,
  scanNumberAfterDecimalPoint
} from './numeric';

export function scan(
  parser: ParserState,
  context: Context,
  source: string,
  length: number,
  lastIsCR: 0 | 1,
  lineStart: boolean,
  allowRegExp: 0 | 1
): Token {
  let char: number | null;
  let index: number | null;

  let token: Token = Token.EOF;

  while (parser.index < length) {
    char = source.charCodeAt(parser.index);

    parser.line = parser.lineBase;
    parser.column = (parser.start = parser.index) - parser.offset;

    if (char > 0x7e) {
      if ((char & ~1) === Chars.LineSeparator) {
        parser.offset = ++parser.index;
        parser.newLine = 1;
        parser.lineBase++;
        lastIsCR = 0;
        continue;
      }

      if ((unicodeLookup[(char >>> 5) + 104448] >>> char) & 31 & 1) {
        parser.index++;
        continue;
      }

      return scanMaybeIdentifier(parser, context, source, char);
    }

    token = firstCharKinds[char];

    switch (token) {
      case Token.RightBrace:
      case Token.LeftBrace:
      case Token.Comma:
      case Token.Colon:
      case Token.Complement:
      case Token.LeftParen:
      case Token.RightParen:
      case Token.Semicolon:
      case Token.LeftBracket:
      case Token.RightBracket:
        parser.index++;
        return token;

      // general whitespace
      case Token.WhiteSpace:
        parser.index++;
        break;

      // `A`...`Z`, `_var`, `$var`
      case Token.Identifier:
        return scanIdentifier(parser, context, source, char);

      // `a`...`z`
      case Token.IdentifierOrKeyword:
        return scanIdentifierOrKeyword(parser, context, source, char);

      // `1`...`9`
      case Token.NumericLiteral:
        return scanNumber(parser, source, char, 0);

      // `string`
      case Token.StringLiteral:
        return scanStringLiteral(parser, context, source, char);

      // `'string'`, `"string"`
      case Token.TemplateTail:
        return scanTemplate(parser, context, source);

      // `\\u{N}var`
      case Token.EscapedIdentifier:
        return scanUnicodeEscapeIdStart(parser, context, source);

      // `0`, `0exxx`, `0Exxx`, `0.xxx`, `0X`, `0x`, `0B`, `0b`, `oO`, `0o`
      case Token.LeadingZero:
        if (parser.index + 1 < length) {
          char = source.charCodeAt(++parser.index);
          switch (CharKinds[char]) {
            case Token.HexDigits:
              return scanHexDigits(parser, source);
            case Token.BinaryDigits:
              return scanBinaryDigits(parser, source);
            case Token.OctalDigits:
              return scanOctalDigits(parser, source);
            case Token.NumericLiteral:
            case Token.Underscore:
              return scanImplicitOctalDigits(parser, context, source, char);
            default: // ignore
          }
        }

        return scanNumber(parser, source, char, 0);

      // line terminators
      case Token.CarriageReturn:
        parser.offset = ++parser.index;
        parser.lineBase++;
        parser.newLine = lastIsCR = 1;
        break;

      case Token.LineFeed:
        parser.offset = ++parser.index;
        parser.newLine = 1;
        if (lastIsCR === 0) parser.lineBase++;
        lastIsCR = 0;
        break;

      // `.`, `...`, `.123` (numeric literal)
      case Token.Period:
        char = source.charCodeAt(++parser.index);
        if (char >= Chars.Zero && char <= Chars.Nine) return scanNumberAfterDecimalPoint(parser, source, char);
        if (char === Chars.Period && source.charCodeAt(parser.index + 1) === Chars.Period) {
          parser.index += 2;
          return Token.Ellipsis;
        }
        return Token.Period;

      // `/`, `/=`, `/>`, '/*..*/'
      case Token.Divide:
        index = ++parser.index;
        char = source.charCodeAt(index);

        if (char === Chars.Slash) {
          index++; // skips: '/'
          parser.index = skipSingleLineComment(parser, source, index);
          continue;
        }

        if (char === Chars.Asterisk) {
          index++; // skips: '*'
          parser.index = skipMultiLineComment(parser, source, index);
          continue;
        }

        if (allowRegExp === 1) {
          return scanRegularExpression(parser, context, source, index);
        }

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.DivideAssign;
        }
        return Token.Divide;

      // `=`, `==`, `===`, `=>`
      case Token.Assign:
        char = source.charCodeAt(++parser.index);
        if (char === Chars.EqualSign) {
          if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.LooseEqual;
          parser.index++;
          return Token.StrictEqual;
        }

        if (char !== Chars.GreaterThan) return Token.Assign;
        parser.index++;
        return Token.Arrow;

      // `?`, `??`, `?.`
      case Token.QuestionMark:
        char = source.charCodeAt(++parser.index);
        if (char === Chars.Period) {
          char = source.charCodeAt(parser.index + 1);
          if (char >= Chars.Zero && char <= Chars.Nine) return Token.QuestionMark;
          parser.index++;
          return Token.QuestionMarkPeriod;
        }

        if (char === Chars.QuestionMark) {
          parser.index++;
          return Token.Coalesce;
        }

        return Token.QuestionMark;

      // `<`, `<=`, `<<`, `<<=`, `</`, `<!--`
      case Token.LessThan:
        char = source.charCodeAt(++parser.index);

        if (char === Chars.LessThan) {
          if (source.charCodeAt(++parser.index) === Chars.EqualSign) {
            parser.index++;
            return Token.ShiftLeftAssign;
          }
          return Token.ShiftLeft;
        }
        if (char === Chars.EqualSign) {
          parser.index += 1;
          return Token.LessThanOrEqual;
        }
        if (char === Chars.Exclamation) {
          if (
            parser.index < length &&
            source.charCodeAt(parser.index + 2) === Chars.Hyphen &&
            source.charCodeAt(parser.index + 1) === Chars.Hyphen
          ) {
            parser.index = skipSingleHTMLComment(parser, context, source, parser.index + 1);
            continue;
          }
        }

        return Token.LessThan;

      // `-`, `--`, `-=`, `-->`
      case Token.Subtract:
        char = source.charCodeAt(++parser.index);
        if (char === Chars.Hyphen) {
          if (source.charCodeAt(parser.index + 1) === Chars.GreaterThan && (lineStart || parser.newLine)) {
            parser.index = skipSingleHTMLComment(parser, context, source, parser.index);
            continue;
          }
          parser.index++;
          return Token.Decrement;
        }

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.SubtractAssign;
        }
        return Token.Subtract;

      // `!`, `!=`, `!==`
      case Token.Negate:
        if (source.charCodeAt(parser.index + 1) === Chars.EqualSign) {
          index = parser.index + 1;
          if (source.charCodeAt(index + 1) === Chars.EqualSign) {
            parser.index += 3;
            return Token.StrictNotEqual;
          }
          parser.index += 2;
          return Token.LooseNotEqual;
        }
        parser.index++;
        return Token.Negate;

      // `%`, `%=`
      case Token.Modulo:
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.Modulo;
        parser.index++;
        return Token.ModuloAssign;

      // `*`, `**`, `*=`, `**=`
      case Token.Multiply:
        char = source.charCodeAt(++parser.index);
        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.MultiplyAssign;
        }

        if (char !== Chars.Asterisk) return Token.Multiply;
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.Exponentiate;
        parser.index++;

        return Token.ExponentiateAssign;

      // `^`, `^=`
      case Token.BitwiseXor:
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.BitwiseXor;
        parser.index++;
        return Token.BitwiseXorAssign;

      // `+`, `++`, `+=`
      case Token.Add:
        char = source.charCodeAt(++parser.index);
        if (char === Chars.Plus) {
          parser.index++;
          return Token.Increment;
        }

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.AddAssign;
        }

        return Token.Add;

      // `|`, `||`, `|=`
      case Token.BitwiseOr:
        char = source.charCodeAt(++parser.index);

        if (char === Chars.VerticalBar) {
          parser.index++;
          return Token.LogicalOr;
        }
        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.BitwiseOrAssign;
        }

        return Token.BitwiseOr;

      // `>`, `>=`, `>>`, `>>>`, `>>=`, `>>>=`
      case Token.GreaterThan:
        char = source.charCodeAt(++parser.index);

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.GreaterThanOrEqual;
        }

        if (char !== Chars.GreaterThan) return Token.GreaterThan;

        char = source.charCodeAt(++parser.index);

        if (char === Chars.GreaterThan) {
          if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.LogicalShiftRight;
          parser.index++;
          return Token.LogicalShiftRightAssign;
        }
        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.ShiftRightAssign;
        }

        return Token.ShiftRight;

      // `&`, `&&`, `&=`
      case Token.BitwiseAnd:
        char = source.charCodeAt(++parser.index);

        if (char === Chars.Ampersand) {
          parser.index++;
          return Token.LogicalAnd;
        }

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.BitwiseAndAssign;
        }

        return Token.BitwiseAnd;

      default:
        report(parser, Errors.IllegalCaracter, fromCodePoint(char));
    }
  }
  return Token.EOF;
}

export function nextToken(parser: ParserState, context: Context, allowRegExp: 0 | 1): void {
  parser.newLine = 0;
  const { source, length, index, offset } = parser;
  parser.lastColumn = (parser.endIndex = index) - offset;
  parser.prevLinebase = parser.lineBase;
  parser.token = scan(parser, context, source, length, /* lastIsCR */ 0, index === 0, allowRegExp);
}
