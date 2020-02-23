import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseModule } from '../../../src/seafox';

describe('Next - Top Level Await', () => {
  for (const [source, ctx, expected] of [
    [
      `await foo`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            argument: {
              end: 9,
              loc: {
                end: {
                  column: 9,
                  line: 1
                },
                start: {
                  column: 6,
                  line: 1
                }
              },
              name: 'foo',
              start: 6,
              type: 'Identifier'
            },
            end: 9,
            loc: {
              end: {
                column: 9,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'AwaitExpression'
          }
        ],
        end: 9,
        loc: {
          end: {
            column: 9,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],

    [
      `await null`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            argument: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 6,
                  line: 1
                }
              },
              start: 6,
              type: 'Literal',
              value: null
            },
            end: 10,
            loc: {
              end: {
                column: 10,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'AwaitExpression'
          }
        ],
        end: 10,
        loc: {
          end: {
            column: 10,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `await { function() {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            argument: {
              end: 23,
              loc: {
                end: {
                  column: 23,
                  line: 1
                },
                start: {
                  column: 6,
                  line: 1
                }
              },
              properties: [
                {
                  computed: false,
                  end: 21,
                  key: {
                    end: 16,
                    loc: {
                      end: {
                        column: 16,
                        line: 1
                      },
                      start: {
                        column: 8,
                        line: 1
                      }
                    },
                    name: 'function',
                    start: 8,
                    type: 'Identifier'
                  },
                  kind: 'init',
                  loc: {
                    end: {
                      column: 21,
                      line: 1
                    },
                    start: {
                      column: 8,
                      line: 1
                    }
                  },
                  method: true,
                  shorthand: false,
                  start: 8,
                  type: 'Property',
                  value: {
                    async: false,
                    body: {
                      body: [],
                      end: 21,
                      loc: {
                        end: {
                          column: 21,
                          line: 1
                        },
                        start: {
                          column: 19,
                          line: 1
                        }
                      },
                      start: 19,
                      type: 'BlockStatement'
                    },
                    end: 21,
                    generator: false,
                    id: null,
                    loc: {
                      end: {
                        column: 21,
                        line: 1
                      },
                      start: {
                        column: 16,
                        line: 1
                      }
                    },
                    params: [],
                    start: 16,
                    type: 'FunctionExpression'
                  }
                }
              ],
              start: 6,
              type: 'ObjectExpression'
            },
            end: 23,
            loc: {
              end: {
                column: 23,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'AwaitExpression'
          }
        ],
        end: 23,
        loc: {
          end: {
            column: 23,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `await /1/`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            argument: {
              end: 9,
              loc: {
                end: {
                  column: 9,
                  line: 1
                },
                start: {
                  column: 6,
                  line: 1
                }
              },
              regex: {
                flags: '',
                pattern: '1'
              },
              start: 6,
              type: 'Literal',
              value: /1/
            },
            end: 9,
            loc: {
              end: {
                column: 9,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'AwaitExpression'
          }
        ],
        end: 9,
        loc: {
          end: {
            column: 9,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `await []`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            argument: {
              elements: [],
              end: 8,
              loc: {
                end: {
                  column: 8,
                  line: 1
                },
                start: {
                  column: 6,
                  line: 1
                }
              },
              start: 6,
              type: 'ArrayExpression'
            },
            end: 8,
            loc: {
              end: {
                column: 8,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'AwaitExpression'
          }
        ],
        end: 8,
        loc: {
          end: {
            column: 8,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ]
  ]) {
    it(source as string, () => {
      const parser = parseModule(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
