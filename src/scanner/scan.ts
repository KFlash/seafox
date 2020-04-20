import { ParserState, Context } from '../parser/common';
import { Token } from '../token';
import { convertTokenType } from './tokenization';
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
  /* 127 - Delete             */ Token.Error,
  /* 128 - Cc category        */ Token.Error,
  /* 129 - Cc category        */ Token.Error,
  /* 130 - Cc category        */ Token.Error,
  /* 131 - Cc category        */ Token.Error,
  /* 132 - Cc category        */ Token.Error,
  /* 133 - Cc category        */ Token.Error,
  /* 134 - Cc category        */ Token.Error,
  /* 135 - Cc category        */ Token.Error,
  /* 136 - Cc category        */ Token.Error,
  /* 137 - Cc category        */ Token.Error,
  /* 138 - Cc category        */ Token.Error,
  /* 139 - Cc category        */ Token.Error,
  /* 140 - Cc category        */ Token.Error,
  /* 141 - Cc category        */ Token.Error,
  /* 142 - Cc category        */ Token.Error,
  /* 143 - Cc category        */ Token.Error,
  /* 144 - Cc category        */ Token.Error,
  /* 145 - Cc category        */ Token.Error,
  /* 146 - Cc category        */ Token.Error,
  /* 147 - Cc category        */ Token.Error,
  /* 148 - Cc category        */ Token.Error,
  /* 149 - Cc category        */ Token.Error,
  /* 150 - Cc category        */ Token.Error,
  /* 151 - Cc category        */ Token.Error,
  /* 152 - Cc category        */ Token.Error,
  /* 153 - Cc category        */ Token.Error,
  /* 154 - Cc category        */ Token.Error,
  /* 155 - Cc category        */ Token.Error,
  /* 156 - Cc category        */ Token.Error,
  /* 157 - Cc category        */ Token.Error,
  /* 158 - Cc category        */ Token.Error,
  /* 159 - Cc category        */ Token.Error,
  /* 160 - Zs category (nbsp) */ Token.WhiteSpace,
  /* 161 - Po category        */ Token.Error,
  /* 162 - Sc category        */ Token.Error,
  /* 163 - Sc category        */ Token.Error,
  /* 164 - Sc category        */ Token.Error,
  /* 165 - Sc category        */ Token.Error,
  /* 166 - So category        */ Token.Error,
  /* 167 - So category        */ Token.Error,
  /* 168 - Sk category        */ Token.Error,
  /* 169 - So category        */ Token.Error,
  /* 170 - Ll category        */ Token.Identifier,
  /* 171 - Pi category        */ Token.Error,
  /* 172 - Sm category        */ Token.Error,
  /* 173 - Cf category        */ Token.Error,
  /* 174 - So category        */ Token.Error,
  /* 175 - Sk category        */ Token.Error,
  /* 176 - So category        */ Token.Error,
  /* 177 - Sm category        */ Token.Error,
  /* 178 - No category        */ Token.Error,
  /* 179 - No category        */ Token.Error,
  /* 180 - Sk category        */ Token.Error,
  /* 181 - Ll category        */ Token.Identifier,
  /* 182 - So category        */ Token.Error,
  /* 183 - Po category        */ Token.Error,
  /* 184 - Sk category        */ Token.Error,
  /* 185 - No category        */ Token.Error,
  /* 186 - Ll category        */ Token.Identifier,
  /* 187 - Pf category        */ Token.Error,
  /* 188 - No category        */ Token.Error,
  /* 189 - No category        */ Token.Error,
  /* 190 - No category        */ Token.Error,
  /* 191 - Po category        */ Token.Error,
  /* 192 - Lu category        */ Token.Identifier,
  /* 193 - Lu category        */ Token.Identifier,
  /* 194 - Lu category        */ Token.Identifier,
  /* 195 - Lu category        */ Token.Identifier,
  /* 196 - Lu category        */ Token.Identifier,
  /* 197 - Lu category        */ Token.Identifier,
  /* 198 - Lu category        */ Token.Identifier,
  /* 199 - Lu category        */ Token.Identifier,
  /* 200 - Lu category        */ Token.Identifier,
  /* 201 - Lu category        */ Token.Identifier,
  /* 202 - Lu category        */ Token.Identifier,
  /* 203 - Lu category        */ Token.Identifier,
  /* 204 - Lu category        */ Token.Identifier,
  /* 205 - Lu category        */ Token.Identifier,
  /* 206 - Lu category        */ Token.Identifier,
  /* 207 - Lu category        */ Token.Identifier,
  /* 208 - Lu category        */ Token.Identifier,
  /* 209 - Lu category        */ Token.Identifier,
  /* 210 - Lu category        */ Token.Identifier,
  /* 211 - Lu category        */ Token.Identifier,
  /* 212 - Lu category        */ Token.Identifier,
  /* 213 - Lu category        */ Token.Identifier,
  /* 214 - Lu category        */ Token.Identifier,
  /* 215 - Sm category        */ Token.Error,
  /* 216 - Lu category        */ Token.Identifier,
  /* 217 - Lu category        */ Token.Identifier,
  /* 218 - Lu category        */ Token.Identifier,
  /* 219 - Lu category        */ Token.Identifier,
  /* 220 - Lu category        */ Token.Identifier,
  /* 221 - Lu category        */ Token.Identifier,
  /* 222 - Lu category        */ Token.Identifier,
  /* 223 - Ll category        */ Token.Identifier,
  /* 224 - Ll category        */ Token.Identifier,
  /* 225 - Ll category        */ Token.Identifier,
  /* 226 - Ll category        */ Token.Identifier,
  /* 227 - Ll category        */ Token.Identifier,
  /* 228 - Ll category        */ Token.Identifier,
  /* 229 - Ll category        */ Token.Identifier,
  /* 230 - Ll category        */ Token.Identifier,
  /* 231 - Ll category        */ Token.Identifier,
  /* 232 - Ll category        */ Token.Identifier,
  /* 233 - Ll category        */ Token.Identifier,
  /* 234 - Ll category        */ Token.Identifier,
  /* 235 - Ll category        */ Token.Identifier,
  /* 236 - Ll category        */ Token.Identifier,
  /* 237 - Ll category        */ Token.Identifier,
  /* 238 - Ll category        */ Token.Identifier,
  /* 239 - Ll category        */ Token.Identifier,
  /* 240 - Ll category        */ Token.Identifier,
  /* 241 - Ll category        */ Token.Identifier,
  /* 242 - Ll category        */ Token.Identifier,
  /* 243 - Ll category        */ Token.Identifier,
  /* 244 - Ll category        */ Token.Identifier,
  /* 245 - Ll category        */ Token.Identifier,
  /* 246 - Ll category        */ Token.Identifier,
  /* 247 - Sm category        */ Token.Error,
  /* 248 - Ll category        */ Token.Identifier,
  /* 249 - Ll category        */ Token.Identifier,
  /* 250 - Ll category        */ Token.Identifier,
  /* 251 - Ll category        */ Token.Identifier,
  /* 252 - Ll category        */ Token.Identifier,
  /* 253 - Ll category        */ Token.Identifier,
  /* 254 - Ll category        */ Token.Identifier,
  /* 255 - Ll category        */ Token.Identifier
];

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
  let ch: number | null;

  while (parser.index < length) {
    ch = source.charCodeAt(parser.index);

    parser.start = parser.index;

    // Jump table used to optimize the switch
    token = firstCharKinds[ch];

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

      // `A`...`Z`, `_var`
      case Token.Identifier:
        return scanIdentifierOrKeyword(parser, source, ch, 0);

      // `$var`, `a`...`z`
      case Token.IdentifierOrKeyword:
        return scanIdentifierOrKeyword(parser, source, ch, 1);

      // `1`...`9`
      case Token.NumericLiteral:
        return scanNumber(parser, context, source, ch, /* isFloat */ 0);

      // `string`
      case Token.StringLiteral:
        return scanStringLiteral(parser, context, source, ch);

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
        parser.index++;

        if (parser.index < length) {
          ch = source.charCodeAt(parser.index);

          if (ch >= Chars.Zero && ch <= Chars.Nine) {
            // Spec explicitly disallows a digit after `?.`
            return scanNumber(parser, context, source, ch, /* isFloat */ 1);
          }

          if (ch === Chars.Period && source.charCodeAt(parser.index + 1) === Chars.Period) {
            parser.index += 2;
            return Token.Ellipsis;
          }
        }

        return Token.Period;

      // `=`, `==`, `===`, `=>`
      case Token.Assign:
        parser.index++;

        if (parser.index >= length) return Token.Assign;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.EqualSign) {
          if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.LooseEqual;
          parser.index++;
          return Token.StrictEqual;
        }

        if (ch !== Chars.GreaterThan) return Token.Assign;
        parser.index++;
        return Token.Arrow;

      // `*`, `**`, `*=`, `**=`
      case Token.Multiply:
        parser.index++;

        if (parser.index >= length) return Token.Multiply;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.EqualSign) {
          parser.index++;
          return Token.MultiplyAssign;
        }

        if (ch !== Chars.Asterisk) return Token.Multiply;
        if (source.charCodeAt(++parser.index) !== Chars.EqualSign) return Token.Exponentiate;
        parser.index++;

        return Token.ExponentiateAssign;

      // `+`, `++`, `+=`
      case Token.Add:
        parser.index++;

        if (parser.index >= length) return Token.Add;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.Plus) {
          parser.index++;
          return Token.Increment;
        }

        if (ch === Chars.EqualSign) {
          parser.index++;
          return Token.AddAssign;
        }

        return Token.Add;
      // `/`, `/=`, `/>`, '/*..*/'
      case Token.Divide:
        index = ++parser.index;
        ch = source.charCodeAt(index);

        if (ch === Chars.Slash) {
          parser.index = skipSingleLineComment(parser, source, index);
          continue;
        }

        if (ch === Chars.Asterisk) {
          parser.index = skipMultiLineComment(parser, source, length, ++index) as number;
          continue;
        }

        if (allowRegExp === 1) {
          return scanRegularExpression(parser, source, index);
        }

        if (ch === Chars.EqualSign) {
          parser.index++;
          return Token.DivideAssign;
        }
        return Token.Divide;

      // `?`, `??`, `?.`
      case Token.QuestionMark:
        parser.index++;

        if (parser.index >= length) return Token.QuestionMark;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.Period) {
          ch = source.charCodeAt(parser.index + 1);

          if (ch >= Chars.Zero && ch <= Chars.Nine) {
            return Token.QuestionMark;
          }

          parser.index++;

          return Token.QuestionMarkPeriod;
        }

        if (ch === Chars.QuestionMark) {
          parser.index++;

          if (source.charCodeAt(parser.index) !== Chars.EqualSign) {
            return Token.Coalesce;
          }

          parser.index++;

          return Token.CoalesceAssign;
        }

        return Token.QuestionMark;

      // `-`, `--`, `-=`, `-->`
      case Token.Subtract:
        ch = source.charCodeAt(++parser.index);
        if (ch === Chars.Hyphen) {
          if (source.charCodeAt(parser.index + 1) === Chars.GreaterThan && (lineStart || parser.newLine)) {
            parser.index = skipSingleHTMLComment(parser, context, source, parser.index);
            continue;
          }
          parser.index++;
          return Token.Decrement;
        }

        if (ch === Chars.EqualSign) {
          parser.index++;
          return Token.SubtractAssign;
        }
        return Token.Subtract;

      // `<`, `<=`, `<<`, `<<=`, `</`, `<!--`
      case Token.LessThan:
        parser.index++;

        if (parser.index >= length) return Token.LessThan;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.LessThan) {
          if (source.charCodeAt(++parser.index) === Chars.EqualSign) {
            parser.index++;
            return Token.ShiftLeftAssign;
          }
          return Token.ShiftLeft;
        }

        if (ch === Chars.EqualSign) {
          parser.index += 1;
          return Token.LessThanOrEqual;
        }

        if (ch === Chars.Exclamation) {
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
        index = parser.index + 1;
        if (source.charCodeAt(index) === Chars.EqualSign) {
          index++;
          if (source.charCodeAt(index) === Chars.EqualSign) {
            parser.index = index + 1;
            return Token.StrictNotEqual;
          }
          parser.index = index;
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
        parser.index++;

        if (parser.index >= length) return Token.GreaterThan;

        ch = source.charCodeAt(parser.index);

        if (ch === Chars.EqualSign) {
          parser.index++;
          return Token.GreaterThanOrEqual;
        }

        if (ch !== Chars.GreaterThan) return Token.GreaterThan;
        parser.index++;

        if (parser.index < length) {
          ch = source.charCodeAt(parser.index);

          if (ch === Chars.GreaterThan) {
            if (source.charCodeAt(++parser.index) !== Chars.EqualSign) {
              return Token.LogicalShiftRight;
            }

            parser.index++;

            return Token.LogicalShiftRightAssign;
          }

          if (ch === Chars.EqualSign) {
            parser.index++;
            return Token.ShiftRightAssign;
          }
        }
        return Token.ShiftRight;

      // `|`, `||`, `|=`
      case Token.BitwiseOr:
        index = parser.index + 1;

        if (index < parser.length) {
          ch = source.charCodeAt(index);

          if (ch === Chars.VerticalBar) {
            index++;
            if (source.charCodeAt(index) !== Chars.EqualSign) {
              parser.index = index;
              return Token.LogicalOr;
            }

            parser.index = index + 1;
            return Token.LogicalOrAssign;
          }

          if (ch === Chars.EqualSign) {
            parser.index = index + 1;
            return Token.BitwiseOrAssign;
          }
        }

        parser.index++;
        return Token.BitwiseOr;

      // `&`, `&&`, `&=`
      case Token.BitwiseAnd:
        index = parser.index + 1;

        if (index < parser.length) {
          ch = source.charCodeAt(index);

          if (ch === Chars.Ampersand) {
            index++;

            if (source.charCodeAt(index) !== Chars.EqualSign) {
              parser.index = index;
              return Token.LogicalAnd;
            }

            parser.index = index + 1;
            return Token.LogicalAndAssign;
          }

          if (ch === Chars.EqualSign) {
            parser.index = index + 1;
            return Token.BitwiseAndAssign;
          }
        }

        parser.index++;

        return Token.BitwiseAnd;

      default:
        if (ch > 0b00000000000000000000000001111110) {
          if (((unicodeLookup[(ch >>> 5) + 104448] >>> ch) & 31 & 1) !== 0) {
            parser.index++;

            if ((ch & ~0b00000000000000000000000000000001) === Chars.LineSeparator) {
              parser.offset = parser.index;
              parser.newLine = 1;
              parser.curLine++;
              lastIsCR = 0;
            }

            continue;
          }

          if ((unicodeLookup[(ch >>> 5) + 34816] >>> ch) & 31 & 1 || (ch & 0xfc00) === 0xd800) {
            return scanIdentifierSlowPath(parser, source, '', /* maybeKeyword */ 0);
          }
        }
        report(parser, Errors.IllegalCaracter, fromCodePoint(ch));
    }
  }
  return Token.EOF;
}

export function nextToken(parser: ParserState, context: Context, allowRegExp: 0 | 1, _onToken?: 0 | 1): void {
  parser.newLine = 0;

  const { source, length, index, offset } = parser;

  parser.flags = (parser.flags | 0b00000000000000000001000010000000) ^ 0b00000000000000000001000010000000;
  parser.lastColumn = (parser.endIndex = index) - offset;
  parser.lastLine = parser.curLine;
  parser.token = scan(parser, context, source, index, length, Token.EOF, /* lastIsCR */ 0, index === 0, allowRegExp);
  parser.column = parser.start - parser.offset;
  parser.line = parser.curLine;

  if ((context & Context.OptionsOnToken) === Context.OptionsOnToken && parser.token !== Token.EOF) {
    convertTokenType(parser, context);
  }
}
