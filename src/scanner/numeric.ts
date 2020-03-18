import { ParserState, Context, Flags } from '../parser/common';
import { toHex, Chars, CharTypes } from './';
import { Token } from '../token';
import { report, Errors } from '../errors';

export function scanNumber(parser: ParserState, context: Context, source: string, char: number, isFloat: 0 | 1): Token {
  const enum NumberKind {
    Empty = 0,
    ImplicitOctal = 1 << 0,
    Binary = 1 << 1,
    Octal = 1 << 2,
    Hex = 1 << 3,
    Decimal = 1 << 4,
    DecimalWithLeadingZero = 1 << 5
  }

  let value: string | number = 0;
  let skipSMI = isFloat === 0 ? 0 : 1;
  let state = NumberKind.Decimal;

  if (isFloat === 1) {
    // we know we have at least one digit
    value = '.' + scanDecimalDigits(parser, source, char);
    char = source.charCodeAt(parser.index);
  } else {
    let allowSeparator: 0 | 1 = 0;

    if (char === Chars.Zero) {
      parser.index++; // skips '0'

      char = source.charCodeAt(parser.index);

      // Hex
      if ((char | 32) === Chars.LowerX) {
        char = source.charCodeAt(++parser.index); // skips 'X', 'x'

        while ((CharTypes[char] & 0b00000000000000000000000001100000) > 0) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
            allowSeparator = 0;
          } else {
            allowSeparator = 1;
            value = value * 0x10 + toHex(char);
          }
          char = source.charCodeAt(++parser.index);
        }

        if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

        state = NumberKind.Hex;
      } else if ((char | 32) === Chars.LowerB) {
        char = source.charCodeAt(++parser.index); // skips 'B', 'b'

        while ((char >= Chars.Zero && char <= Chars.One) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
            allowSeparator = 0;
          } else {
            allowSeparator = 1;
            value = value * 2 + (char - Chars.Zero);
          }
          char = source.charCodeAt(++parser.index);
        }

        if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

        state = NumberKind.Binary;
      } else if ((char | 32) === Chars.LowerO) {
        char = source.charCodeAt(++parser.index); // skips 'X', 'x'

        while ((char >= Chars.Zero && char <= Chars.Seven) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
            allowSeparator = 0;
          } else {
            allowSeparator = 1;
            value = value * 8 + (char - Chars.Zero);
          }
          char = source.charCodeAt(++parser.index);
        }

        if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

        state = NumberKind.Octal;
      } else if (char >= Chars.Zero && char <= Chars.Eight) {
        // Octal integer literals are not permitted in strict mode code
        if (context & Context.Strict) report(parser, Errors.StrictOctalEscape);

        state = NumberKind.ImplicitOctal;

        while (char >= Chars.Zero && char <= Chars.Nine) {
          if (char >= Chars.Eight && char <= Chars.Nine) {
            state = NumberKind.DecimalWithLeadingZero;
            skipSMI = 1;
            break;
          }
          value = value * 8 + (char - Chars.Zero);
          char = source.charCodeAt(++parser.index);
        }

        if (char === Chars.Underscore) report(parser, Errors.TrailingNumericSeparator);

        if (char === Chars.LowerN) report(parser, Errors.InvalidBigIntLiteral);

        parser.flags |= Flags.Octals;
      } else if (char >= Chars.Eight && char <= Chars.Nine) {
        state = NumberKind.DecimalWithLeadingZero;
      } else if (char === Chars.Underscore) {
        report(parser, Errors.TrailingNumericSeparator);
      }
    }

    // Parse decimal digits and allow trailing fractional part.
    if ((state & 0b00000000000000000000000000110000) > 0) {
      // This is an optimization for parsing Decimal numbers as Smi's.

      if (skipSMI === 0) {
        let digit = 9;
        // Optimization: most decimal values fit into 4 bytes.
        while ((char <= Chars.Nine && char >= Chars.Zero && digit >= 0) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            char = source.charCodeAt(++parser.index);
            if (
              char === Chars.Underscore ||
              (state & NumberKind.DecimalWithLeadingZero) === NumberKind.DecimalWithLeadingZero
            ) {
              report(parser, Errors.ContinuousNumericSeparator);
            }
            allowSeparator = 1;
            continue;
          }
          allowSeparator = 0;
          value = value * 10 + (char - Chars.Zero);
          char = source.charCodeAt(++parser.index);
          --digit;
        }

        if (allowSeparator === 1) report(parser, Errors.TrailingNumericSeparator);

        if (digit >= 0 && char !== Chars.Period && (CharTypes[char] & 0b00000000000000000000000000000011) === 0) {
          // Most numbers are pure decimal integers without fractional component
          // or exponential notation - handle that with optimized code
          parser.tokenValue = value;
          return Token.NumericLiteral;
        }
      }

      value += scanDecimalDigits(parser, source, char) as any;

      char = source.charCodeAt(parser.index);

      // Consume the decimal dot
      if (char === Chars.Period) {
        isFloat = 1;
        char = source.charCodeAt(++parser.index);
        if (char === Chars.Underscore) report(parser, Errors.ContinuousNumericSeparator);
        value += ('.' + scanDecimalDigits(parser, source, char)) as any;
        char = source.charCodeAt(parser.index);
      }
    }
  }

  if (char === Chars.LowerN && isFloat === 0 && (state & 0b00000000000000000000000000011110) > 0) {
    parser.index++;
    return Token.BigIntLiteral;
  }

  if ((char | 32) === Chars.LowerE) {
    const end = parser.index;

    char = source.charCodeAt(++parser.index);

    // '-', '+'
    if (char === Chars.Hyphen || char === Chars.Plus) char = source.charCodeAt(++parser.index);

    if (char === Chars.Underscore) report(parser, Errors.TrailingNumericSeparator);

    // Exponential notation must contain at least one digit
    if ((state & 0b00000000000000000000000000110000) === 0) report(parser, Errors.MissingExponent);

    const start = parser.index;

    // Consume exponential digits
    value += parser.source.substring(end, parser.index) + scanDecimalDigits(parser, source, char);

    if (start === parser.index) report(parser, Errors.MissingExponent);

    char = source.charCodeAt(parser.index);
  }

  if ((CharTypes[char] & 0b00000000000000000000000000000011) > 0) report(parser, Errors.IDStartAfterNumber);

  parser.tokenValue =
    (state & 0b00000000000000000000000000001111) > 0 ? value : isFloat === 1 ? parseFloat(value as string) : +value;

  return Token.NumericLiteral;
}

export function scanDecimalDigits(parser: ParserState, source: string, char: number) {
  let allowSeparator: 0 | 1 = 0;
  let value = '';
  let start = parser.index;
  while ((char <= Chars.Nine && char >= Chars.Zero) || char === Chars.Underscore) {
    if (char === Chars.Underscore) {
      if (source.charCodeAt(parser.index + 1) === Chars.Underscore) report(parser, Errors.ContinuousNumericSeparator);
      value += source.substring(start, parser.index);
      char = source.charCodeAt(++parser.index);
      allowSeparator = 1;
      start = parser.index;
      continue;
    }
    allowSeparator = 0;
    char = source.charCodeAt(++parser.index);
  }

  if (allowSeparator === 1) report(parser, Errors.TrailingNumericSeparator);

  return value + source.substring(start, parser.index);
}
