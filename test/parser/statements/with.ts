import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

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
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0,
          module: ((ctx as any) & Context.Module) !== 0
        });
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
      const parser = parseScript(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
