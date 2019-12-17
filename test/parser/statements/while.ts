import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Statements - While', () => {
  for (const [source, ctx] of [
    ['while (x) var foo = 1; let foo = 1;', Context.OptionsDisableWebCompat],
    ['while 1 break;', Context.OptionsDisableWebCompat],
    ['while "hood" break;', Context.OptionsDisableWebCompat],
    ['while (false) function f() {}', Context.OptionsDisableWebCompat],
    ['while (false) let x = 1;', Context.Empty],
    ['while 1 break;', Context.Empty],
    [`while '' break;`, Context.Empty],
    [`while '' break;`, Context.Empty],
    ['while(0) !function(){ break; };', Context.OptionsDisableWebCompat],
    ['while(0) { function f(){ break; } }', Context.Strict],
    ['while (false) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
    ['while (false) async function f() {}', Context.OptionsDisableWebCompat],
    ['while (false) const x = null;', Context.Empty],
    ['while (false) function* g() {}', Context.OptionsDisableWebCompat],
    ['while true break;', Context.Empty],
    ['while({1}){ break ; };', Context.Empty],
    ['while({1}){ break ; };', Context.Empty]
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
      `while (x < 10) { x++; y--; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'BinaryExpression',
              left: {
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
              right: {
                type: 'Literal',
                value: 10,
                start: 11,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              operator: '<',
              start: 7,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 17,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    operator: '++',
                    prefix: false,
                    start: 17,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  },
                  start: 17,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
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
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'y',
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
                    operator: '--',
                    prefix: false,
                    start: 22,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    }
                  },
                  start: 22,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                }
              ],
              start: 15,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            start: 0,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 28
              }
            }
          }
        ],
        start: 0,
        end: 28,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 28
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
