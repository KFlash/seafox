import { ParserState, Context, Flags } from '../parser/common';
import { Token } from '../token';
import {
  Chars,
  skipSingleLineComment,
  skipMultiLineComment,
  skipSingleHTMLComment,
  scanIdentifierSlowPath,
  scanIdentifierOrKeyword,
  scanUnicodeEscapeIdStart,
  scanStringLiteral,
  scanRegularExpression,
  scanTemplate,
  report,
  Errors,
  unicodeLookup,
  fromCodePoint,
  scanNumber
} from './';

export const firstCharKinds = [
  /*   0 - Null               */ Token.Error,
  /*   1 - Start of Heading   */ Token.Error,
  /*   2 - Start of Text      */ Token.Error,
  /*   3 - End of Text        */ Token.Error,
  /*   4 - End of Transm.     */ Token.Error,
  /*   5 - Enquiry            */ Token.Error,
  /*   6 - Acknowledgment     */ Token.Error,
  /*   7 - Bell               */ Token.Error,
  /*   8 - Backspace          */ Token.Error,
  /*   9 - Horizontal Tab     */ Token.WhiteSpace,
  /*  10 - Line Feed          */ Token.LineFeed,
  /*  11 - Vertical Tab       */ Token.WhiteSpace,
  /*  12 - Form Feed          */ Token.WhiteSpace,
  /*  13 - Carriage Return    */ Token.CarriageReturn,
  /*  14 - Shift Out          */ Token.Error,
  /*  15 - Shift In           */ Token.Error,
  /*  16 - Data Line Escape   */ Token.Error,
  /*  17 - Device Control 1   */ Token.Error,
  /*  18 - Device Control 2   */ Token.Error,
  /*  19 - Device Control 3   */ Token.Error,
  /*  20 - Device Control 4   */ Token.Error,
  /*  21 - Negative Ack.      */ Token.Error,
  /*  22 - Synchronous Idle   */ Token.Error,
  /*  23 - End of Transmit    */ Token.Error,
  /*  24 - Cancel             */ Token.Error,
  /*  25 - End of Medium      */ Token.Error,
  /*  26 - Substitute         */ Token.Error,
  /*  27 - Escape             */ Token.Error,
  /*  28 - File Separator     */ Token.Error,
  /*  29 - Group Separator    */ Token.Error,
  /*  30 - Record Separator   */ Token.Error,
  /*  31 - Unit Separator     */ Token.Error,
  /*  32 - Space              */ Token.WhiteSpace,
  /*  33 - !                  */ Token.Negate,
  /*  34 - "                  */ Token.StringLiteral,
  /*  35 - #                  */ Token.Error,
  /*  36 - $                  */ Token.Identifier,
  /*  37 - %                  */ Token.Modulo,
  /*  38 - &                  */ Token.BitwiseAnd,
  /*  39 - '                  */ Token.StringLiteral,
  /*  40 - (                  */ Token.LeftParen,
  /*  41 - )                  */ Token.RightParen,
  /*  42 - *                  */ Token.Multiply,
  /*  43 - +                  */ Token.Add,
  /*  44 - ,                  */ Token.Comma,
  /*  45 - -                  */ Token.Subtract,
  /*  46 - .                  */ Token.Period,
  /*  47 - /                  */ Token.Divide,
  /*  48 - 0                  */ Token.NumericLiteral,
  /*  49 - 1                  */ Token.NumericLiteral,
  /*  50 - 2                  */ Token.NumericLiteral,
  /*  51 - 3                  */ Token.NumericLiteral,
  /*  52 - 4                  */ Token.NumericLiteral,
  /*  53 - 5                  */ Token.NumericLiteral,
  /*  54 - 6                  */ Token.NumericLiteral,
  /*  55 - 7                  */ Token.NumericLiteral,
  /*  56 - 8                  */ Token.NumericLiteral,
  /*  57 - 9                  */ Token.NumericLiteral,
  /*  58 - :                  */ Token.Colon,
  /*  59 - ;                  */ Token.Semicolon,
  /*  60 - <                  */ Token.LessThan,
  /*  61 - =                  */ Token.Assign,
  /*  62 - >                  */ Token.GreaterThan,
  /*  63 - ?                  */ Token.QuestionMark,
  /*  64 - @                  */ Token.Error,
  /*  65 - A                  */ Token.Identifier,
  /*  66 - B                  */ Token.Identifier,
  /*  67 - C                  */ Token.Identifier,
  /*  68 - D                  */ Token.Identifier,
  /*  69 - E                  */ Token.Identifier,
  /*  70 - F                  */ Token.Identifier,
  /*  71 - G                  */ Token.Identifier,
  /*  72 - H                  */ Token.Identifier,
  /*  73 - I                  */ Token.Identifier,
  /*  74 - J                  */ Token.Identifier,
  /*  75 - K                  */ Token.Identifier,
  /*  76 - L                  */ Token.Identifier,
  /*  77 - M                  */ Token.Identifier,
  /*  78 - N                  */ Token.Identifier,
  /*  79 - O                  */ Token.Identifier,
  /*  80 - P                  */ Token.Identifier,
  /*  81 - Q                  */ Token.Identifier,
  /*  82 - R                  */ Token.Identifier,
  /*  83 - S                  */ Token.Identifier,
  /*  84 - T                  */ Token.Identifier,
  /*  85 - U                  */ Token.Identifier,
  /*  86 - V                  */ Token.Identifier,
  /*  87 - W                  */ Token.Identifier,
  /*  88 - X                  */ Token.Identifier,
  /*  89 - Y                  */ Token.Identifier,
  /*  90 - Z                  */ Token.Identifier,
  /*  91 - [                  */ Token.LeftBracket,
  /*  92 - \                  */ Token.EscapedIdentifier,
  /*  93 - ]                  */ Token.RightBracket,
  /*  94 - ^                  */ Token.BitwiseXor,
  /*  95 - _                  */ Token.Identifier,
  /*  96 - `                  */ Token.TemplateTail,
  /*  97 - a                  */ Token.IdentifierOrKeyword,
  /*  98 - b                  */ Token.IdentifierOrKeyword,
  /*  99 - c                  */ Token.IdentifierOrKeyword,
  /* 100 - d                  */ Token.IdentifierOrKeyword,
  /* 101 - e                  */ Token.IdentifierOrKeyword,
  /* 102 - f                  */ Token.IdentifierOrKeyword,
  /* 103 - g                  */ Token.IdentifierOrKeyword,
  /* 104 - h                  */ Token.Identifier,
  /* 105 - i                  */ Token.IdentifierOrKeyword,
  /* 106 - j                  */ Token.Identifier,
  /* 107 - k                  */ Token.IdentifierOrKeyword,
  /* 108 - l                  */ Token.IdentifierOrKeyword,
  /* 109 - m                  */ Token.IdentifierOrKeyword,
  /* 110 - n                  */ Token.IdentifierOrKeyword,
  /* 111 - o                  */ Token.IdentifierOrKeyword,
  /* 112 - p                  */ Token.IdentifierOrKeyword,
  /* 113 - q                  */ Token.Identifier,
  /* 114 - r                  */ Token.IdentifierOrKeyword,
  /* 115 - s                  */ Token.IdentifierOrKeyword,
  /* 116 - t                  */ Token.IdentifierOrKeyword,
  /* 117 - u                  */ Token.IdentifierOrKeyword,
  /* 118 - v                  */ Token.IdentifierOrKeyword,
  /* 119 - w                  */ Token.IdentifierOrKeyword,
  /* 120 - x                  */ Token.Identifier,
  /* 121 - y                  */ Token.IdentifierOrKeyword,
  /* 122 - z                  */ Token.IdentifierOrKeyword,
  /* 123 - {                  */ Token.LeftBrace,
  /* 124 - |                  */ Token.BitwiseOr,
  /* 125 - }                  */ Token.RightBrace,
  /* 126 - ~                  */ Token.Complement,
  /* 127 - Delete             */ Token.Error
];

// Note: This is a hot path, and the trick here is to assign all "static" vars outside the loop, and avoid
// to set any vars inside the loop. Example: 'parser.source.charCodeAt' can be shortened to
// 'source.charCodeAt' where 'parser' is the static part. 'char' is assigned outside the loop
// to avoid 'var char =' inside the loop - which will reduce the performance by 1.2%.

export function scan(
  parser: ParserState,
  context: Context,
  source: string,
  index: number,
  length: number,
  token: Token,
  lastIsCR: 0 | 1,
  lineStart: boolean,
  allowRegExp: 0 | 1
): Token {
  let char: number | null;

  while (parser.index < length) {
    char = source.charCodeAt(parser.index);

    parser.start = parser.index;

    if (char > 0b00000000000000000000000001111110) {
      if ((char & ~0b00000000000000000000000000000001) === Chars.LineSeparator) {
        parser.offset = ++parser.index;
        parser.newLine = 1;
        parser.curLine++;
        lastIsCR = 0;
        continue;
      }

      if (((unicodeLookup[(char >>> 5) + 104448] >>> char) & 31 & 1) !== 0) {
        parser.index++;
        continue;
      }

      if ((unicodeLookup[(char >>> 5) + 34816] >>> char) & 31 & 1 || (char & 0xfc00) === 0xd800) {
        return scanIdentifierSlowPath(parser, source, '', /* maybeKeyword */ 0, 0);
      }
      report(parser, Errors.IllegalCaracter, fromCodePoint(char));
    }

    // Jump table used to optimize the switch
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
        return scanIdentifierOrKeyword(parser, source, char, 0);

      // `a`...`z`
      case Token.IdentifierOrKeyword:
        return scanIdentifierOrKeyword(parser, source, char, 1);

      // `1`...`9`
      case Token.NumericLiteral:
        return scanNumber(parser, context, source, char, /* isFloat */ 0);

      // `string`
      case Token.StringLiteral:
        return scanStringLiteral(parser, context, source, char);

      // `'string'`, `"string"`
      case Token.TemplateTail:
        return scanTemplate(parser, context, source);

      // `\\u{N}var`
      case Token.EscapedIdentifier:
        return scanUnicodeEscapeIdStart(parser, source);

      // line terminators
      case Token.CarriageReturn:
        parser.offset = ++parser.index;
        parser.curLine++;
        parser.newLine = lastIsCR = 1;
        break;

      case Token.LineFeed:
        parser.offset = ++parser.index;
        parser.newLine = 1;
        if (lastIsCR === 0) parser.curLine++;
        lastIsCR = 0;
        break;

      // `.`, `...`, `.123` (numeric literal)
      case Token.Period:
        char = source.charCodeAt(++parser.index);
        // Spec explicitly disallows a digit after `?.`
        if (char >= Chars.Zero && char <= Chars.Nine) return scanNumber(parser, context, source, char, /* isFloat */ 1);
        if (char === Chars.Period && source.charCodeAt(parser.index + 1) === Chars.Period) {
          parser.index += 2;
          return Token.Ellipsis;
        }
        return Token.Period;

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

      // `/`, `/=`, `/>`, '/*..*/'
      case Token.Divide:
        index = ++parser.index;
        char = source.charCodeAt(index);

        if (char === Chars.Slash) {
          parser.index = skipSingleLineComment(parser, source, index);
          continue;
        }

        if (char === Chars.Asterisk) {
          parser.index = skipMultiLineComment(parser, source, length, ++index) as number;
          continue;
        }

        if (allowRegExp === 1) {
          return scanRegularExpression(parser, source, index);
        }

        if (char === Chars.EqualSign) {
          parser.index++;
          return Token.DivideAssign;
        }
        return Token.Divide;

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
            source.charCodeAt(parser.index + 2) === Chars.Hyphen &&
            source.charCodeAt(parser.index + 1) === Chars.Hyphen
          ) {
            // Check for <!-- comments
            parser.index = skipSingleHTMLComment(parser, context, source, parser.index);
            continue;
          }
        }

        return Token.LessThan;

      // `!`, `!=`, `!==`
      case Token.Negate:
        if (source.charCodeAt(parser.index + 1) === Chars.EqualSign) {
          parser.index++;
          if (source.charCodeAt(parser.index + 1) === Chars.EqualSign) {
            parser.index += 2;
            return Token.StrictNotEqual;
          }
          parser.index++;
          return Token.LooseNotEqual;
        }
        parser.index++;
        return Token.Negate;

      // `%`, `%=`
      case Token.Modulo:
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.Modulo;
        parser.index++;
        return Token.ModuloAssign;

      // `^`, `^=`
      case Token.BitwiseXor:
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.BitwiseXor;
        parser.index++;
        return Token.BitwiseXorAssign;

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
  parser.flags = (parser.flags | Flags.Octals) ^ Flags.Octals;
  parser.lastColumn = (parser.endIndex = index) - offset;
  parser.lastLine = parser.curLine;
  parser.token = scan(parser, context, source, index, length, Token.EOF, /* lastIsCR */ 0, index === 0, allowRegExp);
  parser.column = parser.start - parser.offset;
  parser.line = parser.curLine;
}
