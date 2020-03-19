import * as t from 'assert';
import { Context } from '../../src/parser/common';
import { create } from '../../src/parser/core';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

function convertDecimalToBinary(digit: any, groups: boolean): string {
  let res = '';
  for (let i = 0, shifted = digit; i < 32; i++, res += String(shifted >>> 31), shifted <<= 1);
  // Makes a groups of 8 bits
  if (groups) res = res.replace(/\B(?=(.{8})+(?!.))/g, '_');
  return res;
}

console.log(convertDecimalToBinary(67109002, false));
describe('Scanner - Punctuator', () => {
  describe('scan()', () => {
    interface Opts {
      source: string;
      context: Context;
      token: Token;
      hasNext: boolean;
      line: number;
      column: number;
    }

    function pass(name: string, opts: Opts) {
      it(name, () => {
        const parser = create(opts.source);

        t.deepEqual(
          {
            token: scan(
              parser,
              opts.context,
              opts.source,
              1,
              opts.source.length,
              Token.EOF,
              0,
              true,
              /* allowRegExp */ 0
            ),
            hasNext: parser.index < parser.source.length,
            line: parser.curLine,
            column: parser.index - parser.offset
          },
          {
            token: opts.token,
            hasNext: opts.hasNext,
            line: opts.line,
            column: opts.column
          }
        );
      });
    }

    pass('scans end of source', {
      source: '',
      context: Context.Empty,
      token: Token.EOF,
      hasNext: false,
      line: 1,
      column: 0
    });

    const tokens: Array<[Context, Token, string]> = [
      /* Punctuators */
      [Context.Empty, Token.Arrow, '=>'],
      [Context.Empty, Token.LeftParen, '('],
      [Context.Empty, Token.LeftBrace, '{'],
      [Context.Empty, Token.Period, '.'],
      [Context.Empty, Token.Ellipsis, '...'],
      [Context.Empty, Token.RightBrace, '}'],
      [Context.Empty, Token.RightParen, ')'],
      [Context.Empty, Token.Semicolon, ';'],
      [Context.Empty, Token.Comma, ','],
      [Context.Empty, Token.LeftBracket, '['],
      [Context.Empty, Token.RightBracket, ']'],
      [Context.Empty, Token.Colon, ':'],
      [Context.Empty, Token.QuestionMark, '?'],

      /* Update operators */
      [Context.Empty, Token.Increment, '++'],
      [Context.Empty, Token.Decrement, '--'],

      /* Assign operators */
      [Context.Empty, Token.Assign, '='],
      [Context.Empty, Token.LogicalOrAssign, '||='],
      [Context.Empty, Token.LogicalAndAssign, '&&='],
      [Context.Empty, Token.CoalesceAssign, '??='],
      [Context.Empty, Token.ShiftLeftAssign, '<<='],
      [Context.Empty, Token.ShiftRightAssign, '>>='],
      [Context.Empty, Token.LogicalShiftRightAssign, '>>>='],
      [Context.Empty, Token.ExponentiateAssign, '**='],
      [Context.Empty, Token.AddAssign, '+='],
      [Context.Empty, Token.SubtractAssign, '-='],
      [Context.Empty, Token.MultiplyAssign, '*='],
      [Context.Empty, Token.DivideAssign, '/='],
      [Context.Empty, Token.ModuloAssign, '%='],
      [Context.Empty, Token.BitwiseXorAssign, '^='],
      [Context.Empty, Token.BitwiseOrAssign, '|='],
      [Context.Empty, Token.BitwiseAndAssign, '&='],

      /* Unary/binary operators */
      [Context.Empty, Token.Negate, '!'],
      [Context.Empty, Token.Complement, '~'],
      [Context.Empty, Token.Add, '+'],
      [Context.Empty, Token.Subtract, '-'],
      [Context.Empty, Token.Multiply, '*'],
      [Context.Empty, Token.Modulo, '%'],
      [Context.Empty, Token.Divide, '/'],
      [Context.Empty, Token.Exponentiate, '**'],
      [Context.Empty, Token.LogicalAnd, '&&'],
      [Context.Empty, Token.LogicalOr, '||'],
      [Context.Empty, Token.StrictEqual, '==='],
      [Context.Empty, Token.StrictNotEqual, '!=='],
      [Context.Empty, Token.LooseEqual, '=='],
      [Context.Empty, Token.LooseNotEqual, '!='],
      [Context.Empty, Token.LessThanOrEqual, '<='],
      [Context.Empty, Token.GreaterThanOrEqual, '>='],
      [Context.Empty, Token.LessThan, '<'],
      [Context.Empty, Token.GreaterThan, '>'],
      [Context.Empty, Token.ShiftLeft, '<<'],
      [Context.Empty, Token.ShiftRight, '>>'],
      [Context.Empty, Token.LogicalShiftRight, '>>>'],
      [Context.Empty, Token.BitwiseAnd, '&'],
      [Context.Empty, Token.BitwiseOr, '|'],
      [Context.Empty, Token.BitwiseXor, '^'],
      [Context.OptionsNext, Token.QuestionMarkPeriod, '?.'],
      [Context.OptionsNext, Token.Coalesce, '??']
    ];

    for (const [ctx, token, op] of tokens) {
      it(`scans '${op}' at the end`, () => {
        const parser = create(op);
        const found = scan(parser, ctx, op, 1, op.length, Token.EOF, 0, true, /* allowRegExp */ 0);
        t.deepEqual(
          {
            token: found,
            hasNext: parser.index < parser.source.length,
            line: parser.curLine,
            column: parser.index - parser.offset
          },
          {
            token: token,
            hasNext: false,
            line: 1,
            column: op.length
          }
        );
      });

      it(`scans '${op}' with more to go`, () => {
        const parser = create(`${op} rest`);
        const found = scan(parser, ctx, op, 1, op.length, Token.EOF, 0, true, /* allowRegExp */ 0);

        t.deepEqual(
          {
            token: found,
            hasNext: parser.index < parser.source.length,
            line: parser.curLine,
            column: parser.index - parser.offset
          },
          {
            token,
            hasNext: true,
            line: 1,
            column: op.length
          }
        );
      });
    }

    it("scans '.' in '..'", () => {
      const parser = create('..');
      const found = scan(parser, Context.Empty, '..', 1, 2, Token.EOF, 0, true, /* allowRegExp */ 0);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.source.length,
          line: parser.curLine,
          column: parser.index - parser.offset
        },
        {
          token: Token.Period,
          hasNext: true,
          line: 1,
          column: 1
        }
      );
    });
  });
});
