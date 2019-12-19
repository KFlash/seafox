import * as t from 'assert';
import { Context } from '../../src/parser/bits';
import { create } from '../../src/parser/core';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('src/scanner/scan', () => {
  interface Opts {
    source: string;
    context: Context;
    token: Token;
    hasNext: boolean;
    line: number;
    column: number;
  }

  const tokens: Array<[Context, Token, string, any]> = [
    [Context.OptionsRaw, Token.RegularExpression, '/a/', /a/],
    [Context.OptionsRaw, Token.RegularExpression, '/(\\w+)\\s(\\w+)/g', /(\w+)\s(\w+)/g],
    [Context.OptionsRaw, Token.RegularExpression, '/[a/]/', /[a/]/]
  ];

  for (const [ctx, token, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const parser = create(op);
      const found = scan(parser, ctx, op, op.length, 0, true, 1);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.length,
          line: parser.lineBase,
          value: parser.tokenValue,
          raw: parser.tokenRaw,
          column: parser.index - parser.offset
        },
        {
          token: token,
          hasNext: false,
          value: value,
          raw: op,
          line: 1,
          column: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const parser = create(`${op} rest`);
      const found = scan(parser, ctx, op, op.length, 0, true, 1);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.source.length,
          raw: parser.tokenRaw,
          line: parser.lineBase,
          column: parser.index - parser.offset
        },
        {
          token,
          hasNext: true,
          raw: op,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
