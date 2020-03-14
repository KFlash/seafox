import * as t from 'assert';
import { Context } from '../../src/parser/common';
import { create } from '../../src/parser/core';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('Scanner - numeric literals', () => {
  describe('scan()', () => {
    function fail(name: string, source: string, context: Context) {
      it(name, () => {
        const parser = create(source);
        t.throws(() => scan(parser, context, source, 1, source.length, Token.EOF, 0, true, /* allowRegExp */ 0));
      });
    }

    fail('fails on 123abc', '123abc', Context.Empty);
    fail('fails on .8n', '.8n', Context.Empty);
    fail('fails on 0e0n', '0e0n', Context.Empty);
    fail('fails on 034E1', '034E1', Context.Empty);
    fail('fails on 00_122', '00_122', Context.Empty);
    fail('fails on 07_7_7', '07_7_7', Context.Empty);
    fail('fails on 1e+_1', '1e+_1', Context.Empty);
    fail('fails on 0b', '0b', Context.Empty);
    fail('fails on 0b9', '0b9', Context.Empty);
    fail('fails on 0o', '0b', Context.Empty);
    fail('fails on 0o9', '0b9', Context.Empty);
    // fail('fails on 08_0;', '08_0;', Context.Empty);
    fail('fails on 0o9n', '0o9n', Context.Empty);
    fail('fails on 0b2n', '0b2n', Context.Empty);
    fail('fails on 008.3n', '008.3n', Context.Empty);
    fail('fails on 0x_', '0x_', Context.Empty);
    fail('fails on 0xb_', '0xb_', Context.Empty);
    fail('fails on 0xb3__33', '0xb3__33', Context.Empty);
    fail('fails on 00', '00', Context.Strict);
    fail('fails on 000', '000', Context.Strict);
    fail('fails on 005', '005', Context.Strict);
    fail('fails on 08', '08', Context.Strict);
    fail('fails on 0o8', '0o8', Context.Empty);
    fail('fails on 0x', '0x', Context.Empty);
    fail('fails on 10e', '10e', Context.Empty);
    fail('fails on 10e-', '10e-', Context.Empty);
    fail('fails on 10e+', '10e+', Context.Empty);
    fail('fails on 10ef', '10ef', Context.Empty);
    fail('fails on 0b_1', '0b_1', Context.Empty);
    fail('fails on 0b1_', '0b1_', Context.Empty);
    fail('fails on 0b', '0b', Context.Empty);
    fail('fails on 0o', '0o', Context.Empty);
    fail('fails on 0x', '0x', Context.Empty);
    fail('fails on decimal integer followed by identifier', '12adf00', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3in1', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3.e', Context.Empty);
    fail('fails on decimal integer followed by identifier', '3.e+abc', Context.Empty);
    fail('fails on Binary-integer-literal-like sequence with a leading 0', '00b0;', Context.Empty);
    fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0o8', Context.Strict);
    fail('fails on Octal-integer-literal-like sequence containing an invalid digit', '0b3', Context.Strict);
    fail('fails on Octal-integer-literal-like sequence without any digits', '0o', Context.Strict);
    fail('fails on Binary-integer-literal-like sequence without any digits', '0b;', Context.Strict);
    fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0b2;', Context.Strict);
    fail('fails on Binary-integer-literal-like sequence containing an invalid digit', '0077', Context.Strict);
    fail('fails on .0000000001n', '.0000000001n', Context.Empty);
    fail('fails on 0xabcinstanceof x', '0xabcinstanceof x', Context.Empty);
    fail('fails on .0000000001n', '.0000000001n', Context.Empty);
    fail('fails on .0000000001n', '.0000000001n', Context.Empty);
    fail('fails on 0xG', '0xG', Context.Empty);
    fail('fails on 0xg', '0xg', Context.Empty);
    fail('fails on 0X0_1_0_', '0X0_1_0_', Context.Empty);
    fail('fails on 0b2', '0b2', Context.Empty);
    fail('fails on 005', '005', Context.Strict);
    fail('fails on 08', '08', Context.Strict);
    fail('fails on 0o8', '0o8', Context.Empty);
    fail('fails on 0\\u006f0', '0\\u006f0', Context.Empty);
    fail('fails on 3in []', '3in []', Context.Empty);
    fail('fails on 3in', '3in', Context.Empty);
    fail('fails on 00o0', '00o0', Context.Empty);
    fail('fails on 0o', '0o', Context.Empty);
    fail('fails on 1_', '1_', Context.Empty);
    fail('fails on 1__', '1__', Context.Empty);
    fail('fails on 1_1_', '1_1_', Context.Empty);
    fail('fails on 1__1_', '1__1_', Context.Empty);
    fail('fails on 1_.1', '1_.1', Context.Empty);
    fail('fails on 1_.1_', '1_.1_', Context.Empty);
    fail('fails on .3e-1n', '.3e-1n', Context.Empty);
    fail('fails on .3e-1n', '.3e-n', Context.Empty);
    fail('fails on 0098n', '0098n', Context.Empty);
    fail('fails on 1_1__', '1_1__', Context.Empty);
    fail('fails on 1__', '1__', Context.Empty);
    fail('fails on 1__2', '1__2', Context.Empty);
    fail('fails on 1.__', '1.__', Context.Empty);
    fail('fails on 1_', '1_', Context.Empty);
    fail('fails on 10_', '10_', Context.Empty);
    fail('fails on 5instanceof', '5instanceof', Context.Empty);
    fail('fails on 0x33in', '0x33in', Context.Empty);
    fail('fails on 0__0123456789', '0__0123456789', Context.Empty);
    fail('fails on 1\u005F0123456789', '1\\u005F0123456789', Context.Empty);
    fail('fails on 0_0', '0_0', Context.Empty);
    fail('fails on 0_9', '0_9', Context.Empty);
    fail('fails on 1.__1', '1.__1', Context.Empty);
    fail('fails on 1._1', '1._1', Context.Empty);
    fail('fails on 0_1', '0_1', Context.Empty);
    fail('fails on 1._1', '1._1', Context.Empty);
    fail('fails on 9_1e+1_', '9_1e+1_', Context.Empty);
    fail('fails on 0x_1', '0x_1', Context.Empty);
    fail('fails on 0x0__0', '0x0__0', Context.Empty);
    fail('fails on 0x0_', '0x0_', Context.Empty);
    fail('fails on 0o_1', '0o_1', Context.Empty);
    fail('fails on 0o0_', '0o0_', Context.Empty);
    fail('fails on 0b_1', '0b_1', Context.Empty);
    fail('fails on 0b0_', '0b0_', Context.Empty);
    fail('fails on 0b00101abc', '0b00101abc', Context.Empty);
    fail('fails on 0b001013', '0b001013', Context.Empty);

    const tokens: Array<[Context, Token, string, number | void]> = [
      [Context.OptionsRaw, Token.NumericLiteral, '57', 57],
      [Context.OptionsRaw, Token.NumericLiteral, '1.1_1', 1.11],
      [Context.OptionsRaw, Token.NumericLiteral, '1.0e-10_0', 1e-100],
      [Context.OptionsRaw, Token.NumericLiteral, '123456789_1', 1234567891],
      [Context.OptionsRaw, Token.NumericLiteral, '1_0123456789', 10123456789],
      [Context.OptionsRaw, Token.NumericLiteral, '1_1', 11],
      [Context.OptionsRaw, Token.NumericLiteral, '1_2.1_2', 12.12],
      [Context.OptionsRaw, Token.NumericLiteral, '1_2.1_20e-10_0', 1.212e-99],
      [Context.OptionsRaw, Token.NumericLiteral, '1.0e-10_0', 1e-100],
      [Context.OptionsRaw, Token.NumericLiteral, '.57', 0.57],
      [Context.OptionsRaw, Token.NumericLiteral, '1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '31', 31],
      [Context.OptionsRaw, Token.NumericLiteral, '1.1', 1.1],
      [Context.OptionsRaw, Token.NumericLiteral, '1e-3', 0.001],
      [Context.OptionsRaw, Token.NumericLiteral, '1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '.1', 0.1],
      [Context.OptionsRaw, Token.NumericLiteral, '0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.13e-3_3', 1.3e-34],

      [Context.OptionsRaw, Token.NumericLiteral, '233333456789.e-2', 2333334567.89],
      [Context.OptionsRaw, Token.NumericLiteral, '2333334567843959725489874578243854239.e-2', 2.33333456784396e34],
      [
        Context.OptionsRaw,
        Token.NumericLiteral,
        '2333334567843959725489874578243854239.e-233',
        2.3333345678439598e-197
      ],
      [
        Context.OptionsRaw,
        Token.NumericLiteral,
        '2333334567843959725489874578243854239.e-233',
        2.3333345678439598e-197
      ],
      // [Context.OptionsRaw, Token.NumericLiteral, '0b1011', 11],
      [Context.OptionsRaw, Token.NumericLiteral, '32.', 32],
      [Context.OptionsRaw, Token.NumericLiteral, '8.', 8],
      [Context.OptionsRaw, Token.NumericLiteral, '1234567890.', 1234567890],
      [Context.OptionsRaw, Token.NumericLiteral, '456.', 456],
      [Context.OptionsRaw, Token.NumericLiteral, '.3', 0.3],
      [Context.OptionsRaw, Token.NumericLiteral, '.3e-3', 0.0003],
      [Context.OptionsRaw, Token.NumericLiteral, '2.3', 2.3],
      [Context.OptionsRaw, Token.NumericLiteral, '5.5', 5.5],
      [Context.OptionsRaw, Token.NumericLiteral, '0.00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0.001', 0.001],
      [Context.OptionsRaw, Token.NumericLiteral, '0.0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '4.0', 4],
      [Context.OptionsRaw, Token.NumericLiteral, '0.0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '456.345', 456.345],
      [Context.OptionsRaw, Token.NumericLiteral, '1234567890.0987654321', 1234567890.0987654321],

      // Numeric literals with exponent

      [Context.OptionsRaw, Token.NumericLiteral, '0E-1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e+1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.0e1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0.0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0.e1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0.0e-1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0E01', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0E-01', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0x00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0Xa', 10],
      [Context.OptionsRaw, Token.NumericLiteral, '0E-1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e+1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '1e2', 100],
      [Context.OptionsRaw, Token.NumericLiteral, '5e6', 5000000],
      [Context.OptionsRaw, Token.NumericLiteral, '10e10', 100000000000],
      [Context.OptionsRaw, Token.NumericLiteral, '7890e789', Infinity],
      [Context.OptionsRaw, Token.NumericLiteral, '1234567890e1234567890', Infinity],
      [Context.OptionsRaw, Token.NumericLiteral, '.0E10', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.5E00', 0.5],
      [Context.OptionsRaw, Token.NumericLiteral, '.10E1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '1.e2', 1e2],
      [Context.OptionsRaw, Token.NumericLiteral, '1.e-2', 0.01],
      [Context.OptionsRaw, Token.NumericLiteral, '1.E2', 100],
      [Context.OptionsRaw, Token.NumericLiteral, '1.E-2', 0.01],
      [Context.OptionsRaw, Token.NumericLiteral, '.5e3', 500],
      [Context.OptionsRaw, Token.NumericLiteral, '.5e-3', 0.0005],
      [Context.OptionsRaw, Token.NumericLiteral, '0.5e3', 500],
      [Context.OptionsRaw, Token.NumericLiteral, '55.55e10', 555500000000],
      [Context.OptionsRaw, Token.NumericLiteral, '0e-100', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0E-100', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e+1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0e01', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '6e+1', 60],
      [Context.OptionsRaw, Token.NumericLiteral, '9e+1', 90],
      [Context.OptionsRaw, Token.NumericLiteral, '1E-1', 0.1],
      [Context.OptionsRaw, Token.NumericLiteral, '0e-1', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '7E1', 70],
      [Context.OptionsRaw, Token.NumericLiteral, '0e0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0E0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '.6e1', 6],
      [Context.OptionsRaw, Token.NumericLiteral, '1.1E-100', 1.1e-100],
      [Context.OptionsRaw, Token.NumericLiteral, '.1e-100', 1e-101],
      [Context.OptionsRaw, Token.NumericLiteral, '0e+100', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '1E+100', 1e100],
      [Context.OptionsRaw, Token.NumericLiteral, '.1E+100', 1e99],

      // Hex
      [Context.OptionsRaw, Token.NumericLiteral, '0xcafe', 51966],
      [Context.OptionsRaw, Token.NumericLiteral, '0x12345678', 305419896],
      [Context.OptionsRaw, Token.NumericLiteral, '0x0001', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0x0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0x2', 2],
      [Context.OptionsRaw, Token.NumericLiteral, '0xD', 13],
      [Context.OptionsRaw, Token.NumericLiteral, '0xf', 15],
      [Context.OptionsRaw, Token.NumericLiteral, '0xb', 11],
      [Context.OptionsRaw, Token.NumericLiteral, '0x7', 7],
      [Context.OptionsRaw, Token.NumericLiteral, '0x45', 69],
      [Context.OptionsRaw, Token.NumericLiteral, '0xC0', 192],
      [Context.OptionsRaw, Token.NumericLiteral, '0xF6', 246],
      [Context.OptionsRaw, Token.NumericLiteral, '0xd1', 209],
      [Context.OptionsRaw, Token.NumericLiteral, '0xAc', 172],
      [Context.OptionsRaw, Token.NumericLiteral, '0xD2', 210],
      [Context.OptionsRaw, Token.NumericLiteral, '0x23', 35],
      [Context.OptionsRaw, Token.NumericLiteral, '0X1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0Xd', 13],
      [Context.OptionsRaw, Token.NumericLiteral, '0Xf', 15],
      [Context.OptionsRaw, Token.NumericLiteral, '0X010000000', 268435456],
      [Context.OptionsRaw, Token.NumericLiteral, '0X01', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0X010', 16],
      [Context.OptionsRaw, Token.NumericLiteral, '0Xa', 10],
      [Context.OptionsRaw, Token.NumericLiteral, '0x1234ABCD', 305441741],
      [Context.OptionsRaw, Token.NumericLiteral, '0x9a', 154],
      [Context.OptionsRaw, Token.NumericLiteral, '0x1234567890abcdefABCEF', 1.3754889323622168e24],
      [Context.OptionsRaw, Token.NumericLiteral, '0X1234567890abcdefABCEF1234567890abcdefABCEF', 2.6605825358829506e49],
      [
        Context.OptionsRaw,
        Token.NumericLiteral,
        '0X14245890abcdefABCE234567890ab234567890abcdeF1234567890abefABCEF',
        5.694046700000817e74
      ],

      // Binary
      [Context.OptionsRaw, Token.NumericLiteral, '0b0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0b00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0b11', 3],
      [Context.OptionsRaw, Token.NumericLiteral, '0b10', 2],
      [Context.OptionsRaw, Token.NumericLiteral, '0B01', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0B00', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0b010', 2],
      [Context.OptionsRaw, Token.NumericLiteral, '0b10', 2],
      [Context.OptionsRaw, Token.NumericLiteral, '0b011', 3],
      [Context.OptionsRaw, Token.NumericLiteral, '0B011', 3],
      [Context.OptionsRaw, Token.NumericLiteral, '0B01', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0B01001', 9],
      [Context.OptionsRaw, Token.NumericLiteral, '0B011111111111111111111111111111', 536870911],
      [Context.OptionsRaw, Token.NumericLiteral, '0B00000111111100000011', 32515],
      [Context.OptionsRaw, Token.NumericLiteral, '0B0000000000000000000000000000000000000000000000001111111111', 1023],
      [
        Context.OptionsRaw,
        Token.NumericLiteral,
        '0B00000000111111100000000000011111100000000000000000000000000000000000001111111111',
        4.6854818611839925e21
      ],

      // Octals
      [Context.OptionsRaw, Token.NumericLiteral, '0O12345670', 2739128],
      [Context.OptionsRaw, Token.NumericLiteral, '0o45', 37],
      [Context.OptionsRaw, Token.NumericLiteral, '0o5', 5],
      [Context.OptionsRaw, Token.NumericLiteral, '0o12', 10],
      [Context.OptionsRaw, Token.NumericLiteral, '0o70', 56],
      [Context.OptionsRaw, Token.NumericLiteral, '0o0', 0],
      [Context.OptionsRaw, Token.NumericLiteral, '0O1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0o07', 7],
      [Context.OptionsRaw, Token.NumericLiteral, '0O011', 9],
      [Context.OptionsRaw, Token.NumericLiteral, '0O077', 63],
      [Context.OptionsRaw, Token.NumericLiteral, '0O1234567', 342391],
      [Context.OptionsRaw, Token.NumericLiteral, '0O12345670003567234567435', 96374499007469390000],
      [Context.OptionsRaw, Token.NumericLiteral, '0123', 83],
      [Context.OptionsRaw, Token.NumericLiteral, '01', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '043', 35],
      [Context.OptionsRaw, Token.NumericLiteral, '07', 7],
      [Context.OptionsRaw, Token.NumericLiteral, '09', 9],
      [Context.OptionsRaw, Token.NumericLiteral, '09.3', 9.3],
      [Context.OptionsRaw, Token.NumericLiteral, '09.3e1', 93],
      [Context.OptionsRaw, Token.NumericLiteral, '09.3e-1', 0.93],
      [Context.OptionsRaw, Token.NumericLiteral, '098', 98],
      [Context.OptionsRaw, Token.NumericLiteral, '0098', 98],
      [Context.OptionsRaw, Token.NumericLiteral, '000000000098', 98],
      // [Context.OptionsRaw, Token.NumericLiteral, '0000000000234567454548', 234567454548],
      [Context.OptionsRaw, Token.NumericLiteral, '.1_3', 0.13],
      [Context.OptionsRaw, Token.NumericLiteral, '.1_3e-3_3', 1.3e-34],
      [Context.OptionsRaw, Token.NumericLiteral, '.13e-3_3', 1.3e-34],
      [Context.OptionsRaw, Token.NumericLiteral, '0B11_1', 7],
      [Context.OptionsRaw, Token.NumericLiteral, '0B011_11_1_1_11_11111_1111111_1111_11111', 536870911],
      [Context.OptionsRaw, Token.NumericLiteral, '0B010_01', 9],
      [Context.OptionsRaw, Token.NumericLiteral, '0B0_1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0O0_7_7', 63],
      [Context.OptionsRaw, Token.NumericLiteral, '0O01_1', 9],
      [Context.OptionsRaw, Token.NumericLiteral, '0X0_1', 1],
      [Context.OptionsRaw, Token.NumericLiteral, '0X0_1_0', 16],
      [Context.OptionsRaw, Token.NumericLiteral, '0Xa', 10],
      [Context.OptionsRaw, Token.BigIntLiteral, '1_0n', void 0],
      [Context.OptionsRaw, Token.BigIntLiteral, '1_0123456789n', void 0],
      [Context.OptionsRaw, Token.BigIntLiteral, '123456789_0n', void 0]
    ];

    for (const [ctx, token, op, value] of tokens) {
      it(`scans '${op}' at the end`, () => {
        const parser = create(op);
        const found = scan(parser, ctx, op, 1, op.length, Token.EOF, 0, true, /* allowRegExp */ 0);
        t.deepEqual(
          {
            token: found,
            hasNext: parser.index < parser.length,
            line: parser.curLine,
            value: parser.tokenValue,
            raw: parser.source.slice(parser.start, parser.index),
            column: parser.index - parser.offset
          },
          {
            token: token,
            hasNext: false,
            value,
            raw: op,
            line: 1,
            column: op.length
          }
        );
      });
    }
  });
});
