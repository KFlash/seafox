import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - With', () => {
  for (const [source, ctx] of [
    ['with(1) b: function a(){}', Context.OptionsDisableWebCompat],
    ['with ({}) async function f() {}', Context.OptionsDisableWebCompat],
    ['with ({}) function f() {}', Context.OptionsDisableWebCompat],
    ['with ({}) let x;', Context.Empty],
    ['with ({}) { }', Context.Strict],
    [`with (x) foo;`, Context.Strict],
    [`with ({}) let [a] = [42];`, Context.Empty],
    [`with ({}) let [a]`, Context.Empty],
    [`with ({}) let 1`, Context.Empty],
    [`with ({}) let []`, Context.Empty],
    [`while(true) let[a] = 0`, Context.Empty]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `with (x) foo;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WithStatement',
            object: {
              type: 'Identifier',
              name: 'x',
              start: 6,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'foo',
                start: 9,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              start: 9,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            start: 0,
            end: 13,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 13
              }
            }
          }
        ],
        start: 0,
        end: 13,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      }
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
