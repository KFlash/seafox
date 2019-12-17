import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - Directives', () => {
  for (const [source, ctx, expected] of [
    [
      `("use strict")`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        start: 0,
        end: 14,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 14
              }
            },
            expression: {
              type: 'Literal',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              },
              value: 'use strict',
              raw: '"use strict"'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    // [`function hello() { "\\000"; "use strict"; }`, Context.OptionsNext | Context.OptionsLoc, {}]
    [
      `("use strict"); foo = 42;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            start: 0,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 15
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'foo',
                start: 16,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              operator: '=',
              right: {
                type: 'Literal',
                value: 42,
                raw: '42',
                start: 22,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              start: 16,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            start: 16,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 16
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
      `"use strict", "Hello\\312World"`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'SequenceExpression',
              expressions: [
                {
                  type: 'Literal',
                  value: 'use strict',
                  raw: '"use strict"',
                  start: 0,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: 'HelloÊWorld',
                  raw: '"Hello\\312World"',
                  start: 14,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                }
              ],
              start: 0,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            directive: 'use strict',
            start: 0,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `"use strict"; + 1`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            directive: 'use strict',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'Literal',
                value: 1,
                raw: '1',
                start: 16,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              prefix: true,
              start: 14,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            start: 14,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 17
              }
            }
          }
        ],
        start: 0,
        end: 17,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      }
    ],
    [
      `"USE STRICT";  var public = 1;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'USE STRICT',
              raw: '"USE STRICT"',
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            directive: 'USE STRICT',
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
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1,
                  raw: '1',
                  start: 28,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'public',
                  start: 19,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                start: 19,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 15,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `function a() { "use strict" } "use strict"; foo;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                    raw: '"use strict"',
                    start: 15,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  },
                  directive: 'use strict',
                  start: 15,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                }
              ],
              start: 13,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'a',
              start: 9,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 10
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
              start: 30,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 30
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            start: 30,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 30
              },
              end: {
                line: 1,
                column: 43
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo',
              start: 44,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 44
                },
                end: {
                  line: 1,
                  column: 47
                }
              }
            },
            start: 44,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 44
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        }
      }
    ]
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
    // [`("use strict")`, Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,{}],
  ]) {
    it(source as string, () => {
      const parser = parseScript(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        directives: true,
        raw: true
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
