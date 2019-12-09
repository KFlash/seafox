import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - Do while', () => {
  for (const [source, ctx] of [['do var foo = 1; while (x) let foo = 1;', Context.OptionsDisableWebCompat]]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `do; while (1)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            body: {
              end: 3,
              loc: {
                end: {
                  column: 3,
                  line: 1
                },
                start: {
                  column: 2,
                  line: 1
                }
              },
              start: 2,
              type: 'EmptyStatement'
            },
            end: 13,
            loc: {
              end: {
                column: 13,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            test: {
              end: 12,
              loc: {
                end: {
                  column: 12,
                  line: 1
                },
                start: {
                  column: 11,
                  line: 1
                }
              },
              start: 11,
              type: 'Literal',
              value: 1
            },
            type: 'DoWhileStatement'
          }
        ],
        end: 13,
        loc: {
          end: {
            column: 13,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `do;while(0)return`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            body: {
              end: 3,
              loc: {
                end: {
                  column: 3,
                  line: 1
                },
                start: {
                  column: 2,
                  line: 1
                }
              },
              start: 2,
              type: 'EmptyStatement'
            },
            end: 11,
            loc: {
              end: {
                column: 11,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            test: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 9,
                  line: 1
                }
              },
              start: 9,
              type: 'Literal',
              value: 0
            },
            type: 'DoWhileStatement'
          },
          {
            argument: null,
            end: 17,
            loc: {
              end: {
                column: 17,
                line: 1
              },
              start: {
                column: 11,
                line: 1
              }
            },
            start: 11,
            type: 'ReturnStatement'
          }
        ],
        end: 17,
        loc: {
          end: {
            column: 17,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `do async \n while (y)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            body: {
              end: 8,
              expression: {
                end: 8,
                loc: {
                  end: {
                    column: 8,
                    line: 1
                  },
                  start: {
                    column: 3,
                    line: 1
                  }
                },
                name: 'async',
                start: 3,
                type: 'Identifier'
              },
              loc: {
                end: {
                  column: 8,
                  line: 1
                },
                start: {
                  column: 3,
                  line: 1
                }
              },
              start: 3,
              type: 'ExpressionStatement'
            },
            end: 20,
            loc: {
              end: {
                column: 10,
                line: 2
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            test: {
              end: 19,
              loc: {
                end: {
                  column: 9,
                  line: 2
                },
                start: {
                  column: 8,
                  line: 2
                }
              },
              name: 'y',
              start: 18,
              type: 'Identifier'
            },
            type: 'DoWhileStatement'
          }
        ],
        end: 20,
        loc: {
          end: {
            column: 10,
            line: 2
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
