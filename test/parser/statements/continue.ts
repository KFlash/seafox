import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - Continue', () => {
  /* for (const [source, ctx] of [
    ['do     continue y   ; while(true);', Context.OptionsNext | Context.OptionsLoc],
    ['for (;;)    continue y ', Context.OptionsNext | Context.OptionsLoc],
    ['switch (x) { case x: continue foo; }', Context.OptionsNext | Context.OptionsLoc],
    ['do {  test262: {  continue test262; } } while (a)', Context.OptionsNext | Context.OptionsLoc],
    ['switch (x) { default: continue foo; }', Context.OptionsNext | Context.OptionsLoc],
    ['do {  test262: {  continue test262; } } while (a)', Context.OptionsNext | Context.OptionsLoc],
    ['do {  test262: {  continue test262; } } while (a)', Context.OptionsNext | Context.OptionsLoc],
    [
      `try{
                          loop : do {
                            x++;
                            throw "gonna leave it";
                            y++;
                          } while(0);
                          } catch(e){
                          continue loop2;
                          loop2 : do {
                            x++;
                            y++;
                          } while(0);
                          };`,
      Context.OptionsNext | Context.OptionsLoc,
      {}
    ],
    ['ce: while(true) { continue fapper; }', Context.OptionsNext | Context.OptionsLoc]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }*/

  for (const [source, ctx, expected] of [
    [
      `do continue; while(foo);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: null,
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
            test: {
              type: 'Identifier',
              name: 'foo',
              start: 19,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
            start: 0,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 24
              }
            }
          }
        ],
        start: 0,
        end: 24,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 24
          }
        }
      }
    ],
    [
      `foo: do continue foo; while(foo);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'foo',
              start: 0,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 8,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              test: {
                type: 'Identifier',
                name: 'foo',
                start: 28,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              start: 5,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            },
            start: 0,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 33
              }
            }
          }
        ],
        start: 0,
        end: 33,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 33
          }
        }
      }
    ],
    [
      `__proto__: while (true) { continue __proto__; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: '__proto__',
              start: 0,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true,
                start: 18,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: '__proto__',
                      start: 35,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      }
                    },
                    start: 26,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  }
                ],
                start: 24,
                end: 47,
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 47
                  }
                }
              },
              start: 11,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 47
                }
              }
            },
            start: 0,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 47
              }
            }
          }
        ],
        start: 0,
        end: 47,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 47
          }
        }
      }
    ],
    [
      `for (;;)  {  continue   }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ContinueStatement',
                  label: null,
                  start: 13,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 10,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            init: null,
            test: null,
            update: null,
            start: 0,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 25
              }
            }
          }
        ],
        start: 0,
        end: 25,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 25
          }
        }
      }
    ],
    [
      `foo: while(true)continue foo;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'foo',
              start: 0,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true,
                start: 11,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 25,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                },
                start: 16,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              start: 5,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            start: 0,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 29
              }
            }
          }
        ],
        start: 0,
        end: 29,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 29
          }
        }
      }
    ],
    [
      `a: do continue a; while(1);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'a',
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
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'a',
                  start: 15,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                },
                start: 6,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              test: {
                type: 'Literal',
                value: 1,
                start: 24,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              start: 3,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            start: 0,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 27
              }
            }
          }
        ],
        start: 0,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 27
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
