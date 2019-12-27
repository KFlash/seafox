import { ParserState } from '../parser/common';
import { toHex, Chars, CharTypes, CharFlags } from './';
import { Token } from '../token';
import { report, Errors } from '../errors';
import { Context, Flags } from '../parser/bits';

export function scanNumber(parser: ParserState, source: string, char: number, skipSMI: 0 | 1): Token {
  let digit = 9;
  let value: string | number = 0;

  if (skipSMI === 0) {
    while (char <= Chars.Nine && char >= Chars.Zero && digit >= 0) {
      value = value * 10 + (char - Chars.Zero);
      char = source.charCodeAt(++parser.index);
      --digit;
    }

    if (
      digit >= 0 &&
      char !== Chars.Period &&
      (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) === 0
    ) {
      // Most numbers are pure decimal integers without fractional component
      // or exponential notation - handle that with optimized code
      parser.tokenValue = value;
      return Token.NumericLiteral;
    }
  }

  while (char <= Chars.Nine && char >= Chars.Zero) {
    char = source.charCodeAt(++parser.index);
  }

  // Consume the decimal dot
  if (char === Chars.Period) {
    char = source.charCodeAt(++parser.index);
    if (char === Chars.Underscore) report(parser, Errors.ContinuousNumericSeparator);
    while (char >= Chars.Zero && char <= Chars.Nine) {
      char = source.charCodeAt(++parser.index);
    }
  }

  if (char === Chars.LowerN && skipSMI === 0) return scanBigInt(parser, source);

  if ((char | 32) === Chars.LowerE) char = scanSignedInteger(parser, source);

  if (char === Chars.Underscore) return skipNumericSeparator(parser, source, char);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue = parseFloat(source.slice(parser.start, parser.index));

  return Token.NumericLiteral;
}

export function scanSignedInteger(parser: ParserState, source: string): number {
  let char = source.charCodeAt(++parser.index);

  // '-', '+'
  if (char === Chars.Hyphen || char === Chars.Plus) {
    char = source.charCodeAt(++parser.index);
  }

  let isDigit = 0;

  // Consume exponential digits
  while (char <= Chars.Nine && char >= Chars.Zero) {
    char = source.charCodeAt(++parser.index);
    isDigit++;
  }

  // Exponential notation must contain at least one digit
  if (isDigit === 0) report(parser, Errors.MissingExponent);
  return char;
}

export function skipNumericSeparator(parser: ParserState, source: string, char: number): Token {
  let start = parser.start;
  let value = scanDecimalDigitsOrSeparator(parser, source, char, start);

  start = parser.index;

  char = source.charCodeAt(start);

  if (char === Chars.Period) {
    char = source.charCodeAt(++parser.index);

    if (char === Chars.Underscore) report(parser, Errors.MissingExponent);

    value += scanDecimalDigitsOrSeparator(parser, source, char, start);
    start = parser.index;
    char = source.charCodeAt(start);
  }

  // Consume any exponential notation
  if ((char | 32) === Chars.LowerE) {
    char = source.charCodeAt(++parser.index);

    // '-', '+'
    if (char === Chars.Hyphen || char === Chars.Plus) {
      char = source.charCodeAt(++parser.index);
    }

    // Exponential notation must contain at least one digit

    if ((CharTypes[char] & CharFlags.Decimal) < 1) report(parser, Errors.MissingExponent);

    // Consume exponential digits

    value += source.substring(start, parser.index) + scanDecimalDigitsOrSeparator(parser, source, char, parser.index);
  }

  parser.tokenValue = parseFloat(value);
  return Token.NumericLiteral;
}

export function scanDecimalDigitsOrSeparator(parser: ParserState, source: string, char: number, start: number): string {
  let allowSeparator: 0 | 1 = 0;
  let value = '';
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

export function scanNumberAfterDecimalPoint(parser: ParserState, source: string, char: number): Token {
  if (char === Chars.Underscore) report(parser, Errors.ContinuousNumericSeparator);

  let value: string | number = 0;

  while (char >= Chars.Zero && char <= Chars.Nine) {
    char = source.charCodeAt(++parser.index);
  }

  if ((char | 32) === Chars.LowerE) char = scanSignedInteger(parser, source);

  if (char === Chars.Underscore) return skipNumericSeparator(parser, source, char);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  value = source.slice(parser.start, parser.index);

  parser.tokenValue = parseFloat(value);

  return Token.NumericLiteral;
}

export function scanImplicitOctalDigits(parser: ParserState, context: Context, source: string, char: number): Token {
  // Octal integer literals are not permitted in strict mode code
  if (context & Context.Strict) report(parser, Errors.StrictOctalEscape);

  parser.flags |= Flags.Octals;

  let value = 0;

  while (char >= Chars.Zero && char <= Chars.Nine) {
    if (char >= Chars.Eight) return scanNumber(parser, source, char, 1); // 08...  or 09....
    value = value * 8 + (char - Chars.Zero);
    char = source.charCodeAt(++parser.index);
  }

  if (char === Chars.LowerN) report(parser, Errors.InvalidBigIntLiteral);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue = value;

  return Token.NumericLiteral;
}

export function scanOctalDigits(parser: ParserState, source: string): Token {
  let value = 0;
  let char = source.charCodeAt(++parser.index);
  let digit = 9;
  const start = parser.index;
  while (char >= Chars.Zero && char <= Chars.Seven && digit >= 0) {
    value = (value << 3) | (char - Chars.Zero);
    char = source.charCodeAt(++parser.index);
    --digit;
  }

  if (start === parser.index) report(parser, Errors.MissingDigits);

  if (digit >= 0 && (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) === 0) {
    parser.tokenValue = value;
    return Token.NumericLiteral;
  }

  let allowSeparator: 0 | 1 = 1;

  while ((char >= Chars.Zero && char <= Chars.Seven) || char === Chars.Underscore) {
    if (char === Chars.Underscore) {
      if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
      allowSeparator = 0;
      char = source.charCodeAt(++parser.index);
      continue;
    }

    allowSeparator = 1;
    value = value * 8 + (char - Chars.Zero);
    char = source.charCodeAt(++parser.index);
  }

  if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

  if (char === Chars.LowerN) return scanBigInt(parser, source);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue = value;

  return Token.NumericLiteral;
}

export function scanHexDigits(parser: ParserState, source: string): Token {
  let value = 0;
  let char = source.charCodeAt(++parser.index);
  const start = parser.index;
  let digit = 7;

  while ((CharTypes[char] & CharFlags.Hex) === CharFlags.Hex && digit >= 0) {
    value = (value << 4) | toHex(char);
    char = source.charCodeAt(++parser.index);
    --digit;
  }

  if (start === parser.index) report(parser, Errors.MissingDigits);

  if (digit >= 0 && (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) === 0) {
    parser.tokenValue = value;
    return Token.NumericLiteral;
  }

  let allowSeparator: 0 | 1 = 1;
  while (CharTypes[char] & (CharFlags.Underscore | CharFlags.Hex)) {
    if (char === Chars.Underscore) {
      if (!allowSeparator) {
        report(parser, Errors.ContinuousNumericSeparator);
      }
      allowSeparator = 0;
      char = source.charCodeAt(++parser.index);
      continue;
    }
    allowSeparator = 1;
    value = value * 0x10 + toHex(char);
    char = source.charCodeAt(++parser.index);
  }

  if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

  if (char === Chars.LowerN) return scanBigInt(parser, source);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue = value;

  return Token.NumericLiteral;
}

export function scanBinaryDigits(parser: ParserState, source: string): Token {
  let value = 0;
  let digit = 31;
  let char = source.charCodeAt(++parser.index);
  const start = parser.index;

  while (char >= Chars.Zero && char <= Chars.One && digit >= 0) {
    value = (value << 1) + (char - Chars.Zero);
    --digit;
    char = source.charCodeAt(++parser.index);
  }

  if (start === parser.index) report(parser, Errors.MissingDigits);

  if (digit >= 0 && (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) === 0) {
    parser.tokenValue = value;
    return Token.NumericLiteral;
  }

  let allowSeparator: 0 | 1 = 1;

  while ((char >= Chars.Zero && char <= Chars.One) || char === Chars.Underscore) {
    if (char === Chars.Underscore) {
      if (allowSeparator === 0) report(parser, Errors.ContinuousNumericSeparator);
      allowSeparator = 0;
      char = source.charCodeAt(++parser.index);
      continue;
    }
    allowSeparator = 1;
    value = value * 2 + (char - Chars.Zero);
    char = source.charCodeAt(++parser.index);
  }

  if (allowSeparator === 0) report(parser, Errors.TrailingNumericSeparator);

  if (char === Chars.LowerN) return scanBigInt(parser, source);

  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }

  parser.tokenValue = value;

  return Token.NumericLiteral;
}

export function scanBigInt(parser: ParserState, source: string): Token {
  const char = source.charCodeAt(++parser.index);
  if (CharTypes[char] & (CharFlags.IdentifierStart | CharFlags.Decimal)) {
    report(parser, Errors.IDStartAfterNumber);
  }
  return Token.BigIntLiteral;
}
