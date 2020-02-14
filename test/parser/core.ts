import * as t from 'assert';
import { parseRoot } from '../../src/seafox';
import { Context } from '../../src/parser/common';

export const pass = (name: string, valids: [string, Context, any][]) => {
  describe(name, () => {
    for (const [source, ctx, expected] of valids) {
      it(source, () => {
        const parser = parseRoot(source, ctx);
        t.deepStrictEqual(parser, expected);
      });
    }
  });
};

export const fail = (name: string, invalid: [string, Context][]) => {
  describe(name, () => {
    for (const [source, ctx] of invalid) {
      it(source, () => {
        t.throws(() => {
          parseRoot(source, ctx);
        });
      });
    }
  });
};
