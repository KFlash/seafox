import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - For of', () => {
  for (const [source, ctx, expected] of [
    [
      `;;;;;;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'EmptyStatement',
            start: 0,
            end: 1,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 1,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 2,
            end: 3,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 3
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 3,
            end: 4,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 4
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 4,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 5,
            end: 6,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 6
              }
            }
          }
        ],
        start: 0,
        end: 6,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 6
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
