import { ParserState, Context, Flags } from '../parser/common';
import { toHex, Chars, CharTypes, CharFlags } from './';
import { Token } from '../token';
import { report, Errors } from '../errors';

export function scanNumber(parser: ParserState, context: Context, source: string, char: number, isFloat: 0 | 1): any {
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
  let atStart = isFloat === 0;
  let state = NumberKind.Decimal;
  let allowSeparator: 0 | 1 = 0;
  let digits = 0;

  if (isFloat === 1) {
    char = source.charCodeAt(parser.index);

    // we know we have at least one digit

    value = '.' + scanDecimalDigits(parser, source, char);

    char = source.charCodeAt(parser.index);
  } else {
    if (char === Chars.Zero) {
      parser.index++;

      char = source.charCodeAt(parser.index);

      // Hex
      if ((char | 32) === Chars.LowerX) {
        state = NumberKind.Hex;
        parser.index++;

        char = source.charCodeAt(parser.index); // skips 'X', 'x'

        if (char === Chars.Underscore) report(parser, Errors.Unexpected);

        while (CharTypes[char] & (CharFlags.Hex | CharFlags.Underscore)) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
            allowSeparator = 0;
            parser.index++;

            char = source.charCodeAt(parser.index);
            continue;
          }
          allowSeparator = 1;
          value = value * 0x10 + toHex(char);
          digits++;
          parser.index++;

          char = source.charCodeAt(parser.index);
        }
        if (digits < 1 || allowSeparator === 0) {
          report(parser, digits < 1 ? Errors.MissingDigits : Errors.TrailingNumericSeparator);
        }
      } else if ((char | 32) === Chars.LowerB) {
        state = NumberKind.Binary;
        parser.index++;

        char = source.charCodeAt(parser.index); // skips 'B', 'b'
        while ((char >= Chars.Zero && char <= Chars.One) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) {
              report(parser, Errors.ContinuousNumericSeparator);
            }
            allowSeparator = 0;
            parser.index++;

            char = source.charCodeAt(parser.index);
            continue;
          }
          allowSeparator = 1;
          value = value * 2 + (char - Chars.Zero);
          digits++;
          parser.index++;

          char = source.charCodeAt(parser.index);
        }
        if (digits < 1 || allowSeparator === 0) {
          report(parser, digits < 1 ? Errors.Unexpected : Errors.TrailingNumericSeparator);
        }
      } else if ((char | 32) === Chars.LowerO) {
        state = NumberKind.Octal;
        parser.index++;

        char = source.charCodeAt(parser.index); // skips 'X', 'x'
        while ((char >= Chars.Zero && char <= Chars.Seven) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            if (allowSeparator === 0) {
              report(parser, Errors.ContinuousNumericSeparator);
            }
            allowSeparator = 0;
            parser.index++;

            char = source.charCodeAt(parser.index);
            continue;
          }
          allowSeparator = 1;
          value = value * 8 + (char - Chars.Zero);
          digits++;
          parser.index++;

          char = source.charCodeAt(parser.index);
        }
        if (digits < 1 || allowSeparator === 0) {
          report(parser, digits < 1 ? Errors.Unexpected : Errors.TrailingNumericSeparator);
        }
      } else if (char >= Chars.Zero && char <= Chars.Eight) {
        // Octal integer literals are not permitted in strict mode code
        if (context & Context.Strict) report(parser, Errors.StrictOctalEscape);
        state = NumberKind.ImplicitOctal;
        while (char >= Chars.Zero && char <= Chars.Nine) {
          if (char >= Chars.Eight && char <= Chars.Nine) {
            state = NumberKind.DecimalWithLeadingZero;
            atStart = false;
            break;
          }
          value = value * 8 + (char - Chars.Zero);
          parser.index++;

          char = source.charCodeAt(parser.index);
        }

        if (char === Chars.Underscore) report(parser, Errors.InvalidBigIntLiteral);

        if (char === Chars.LowerN) report(parser, Errors.InvalidBigIntLiteral);

        parser.flags |= Flags.Octals;
      } else if (char >= Chars.Eight && char <= Chars.Nine) {
        parser.flags |= Flags.Octals;
        state = NumberKind.DecimalWithLeadingZero;
      } else if (char === Chars.Underscore) {
        report(parser, Errors.Unexpected);
      }
    }

    // Parse decimal digits and allow trailing fractional part.
    if ((state & 0b00000000000000000000000000110000) > 0) {
      // This is an optimization for parsing Decimal numbers as Smi's.

      if (atStart) {
        let digit = 9;

        while ((char <= Chars.Nine && char >= Chars.Zero && digit >= 0) || char === Chars.Underscore) {
          if (char === Chars.Underscore) {
            parser.index++;

            char = source.charCodeAt(parser.index);
            if (char === Chars.Underscore || state & NumberKind.DecimalWithLeadingZero) {
              report(parser, Errors.Unexpected);
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

  let isBigInt = 0;

  const end = parser.index;

  if (char === Chars.LowerN && isFloat === 0 && (state & 0b00000000000000000000000000011110) > 0) {
    isBigInt = 1;
    parser.index++;
    char = source.charCodeAt(parser.index);
    return Token.BigIntLiteral;
  }

  if ((char | 32) === Chars.LowerE) {
    char = source.charCodeAt(++parser.index);
    // '-', '+'
    if (char === Chars.Hyphen || char === Chars.Plus) {
      char = source.charCodeAt(++parser.index);
    }
    if (char === Chars.Underscore) report(parser, Errors.Unexpected);
    // Exponential notation must contain at least one digit
    if ((state & 0b00000000000000000000000000110000) === 0) report(parser, Errors.MissingExponent);

    if ((CharTypes[char] & CharFlags.Decimal) < 1) report(parser, Errors.MissingExponent);

    // Consume exponential digits
    value += parser.source.substring(end, parser.index) + scanDecimalDigits(parser, source, char);
    char = source.charCodeAt(parser.index);
  }

  if ((CharTypes[char] & 0b00000000000000000000000000000011) > 0) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue =
    (state & 0b00000000000000000000000000001111) > 0
      ? value
      : parseFloat(isFloat === 1 ? (value as string) : (+value as any));

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
