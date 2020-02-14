import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Statements - With (fail)', [
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
]);

pass('Statements - With (pass)', [
  [
    `with ({}) let`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WithStatement',
          object: {
            type: 'ObjectExpression',
            properties: [],
            start: 6,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 6
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'let',
              start: 10,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            start: 10,
            end: 13,
            loc: {
              start: {
                line: 1,
                column: 10
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
  ],
  [
    `with (x) { foo }`,
    Context.OptionsLoc,
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
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                start: 11,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              }
            ],
            start: 9,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 16
              }
            }
          },
          start: 0,
          end: 16,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 16
            }
          }
        }
      ],
      start: 0,
      end: 16,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 16
        }
      }
    }
  ],
  [
    `with (x) foo;`,
    Context.OptionsLoc,
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
]);
