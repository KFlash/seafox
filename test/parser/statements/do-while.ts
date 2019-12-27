import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Statements - Do while', () => {
  for (const [source, ctx] of [
    ['do foo while (bar);', Context.OptionsDisableWebCompat],
    ['do async \n f(){}; while (y)', Context.OptionsDisableWebCompat],
    //['do async \n () => x; while(y)', Context.Empty],
    //['do async () \n => x; while(y)', Context.Empty],
    ['do let x = 1; while (false)', Context.Empty],
    ['do x, y while (z)', Context.Empty],
    ['do foo while (bar);', Context.Empty],
    ['do ()=>x while(c)', Context.Empty],
    [
      `do
    a
    b
  while(c);`,
      Context.Empty
    ],
    ['do let {} = y', Context.Empty],
    ['do debugger while(x) x', Context.Empty],
    ['do x: function s(){}while(y)', Context.OptionsDisableWebCompat],
    [
      `do throw function (v, h) {
      "use strict"
    } while ((""))`,
      Context.Empty
    ]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0
        });
      });
    });
  }
  for (const [source, ctx, expected] of [
    [
      `do if (x) {} while(x) x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'IfStatement',
              test: {
                type: 'Identifier',
                name: 'x',
                start: 7,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              consequent: {
                type: 'BlockStatement',
                body: [],
                start: 10,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              alternate: null,
              start: 3,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            test: {
              type: 'Identifier',
              name: 'x',
              start: 19,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'x',
              start: 22,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            start: 22,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 23
              }
            }
          }
        ],
        start: 0,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 23
          }
        }
      }
    ],
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
      Context.OptionsGlobalReturn | Context.OptionsLoc,
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
      const parser = parseScript(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        globalReturn: ((ctx as any) & Context.OptionsGlobalReturn) !== 0
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
