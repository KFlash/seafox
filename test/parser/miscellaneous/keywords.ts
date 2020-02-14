import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Miscellaneous - Keywords (fail)', [
  ['"use strict"; default = 1;', Context.OptionsDisableWebCompat],
  ['"use strict"; this = 1;', Context.OptionsDisableWebCompat],
  ['"use strict"; if', Context.OptionsDisableWebCompat],
  ['"use strict"; switch', Context.OptionsDisableWebCompat],
  ['"use strict"; break', Context.OptionsDisableWebCompat],
  ['"use strict"; while = 1;', Context.OptionsDisableWebCompat],
  ['"use strict"; try = 1;', Context.OptionsDisableWebCompat],
  ['"use strict"; this = 1;', Context.OptionsDisableWebCompat],
  ['"use strict"; in = 1;', Context.OptionsDisableWebCompat],
  ['var case = 1;', Context.OptionsDisableWebCompat],
  ['var continue = 1;', Context.OptionsDisableWebCompat],
  ['var var = 1;', Context.OptionsDisableWebCompat],
  ['var with = 1;', Context.OptionsDisableWebCompat],
  ['var in = 1;', Context.OptionsDisableWebCompat],
  ['var continue', Context.OptionsDisableWebCompat],
  ['var for', Context.OptionsDisableWebCompat],
  ['var while = 1;', Context.OptionsDisableWebCompat],
  ['function () { continue }', Context.OptionsDisableWebCompat],
  ['function () { class }', Context.OptionsDisableWebCompat],
  ['function () { if }', Context.OptionsDisableWebCompat],
  ['function () { var = 1; }', Context.OptionsDisableWebCompat],
  ['function () { continue = 1; }', Context.OptionsDisableWebCompat],
  ['function () { case = 1; }', Context.OptionsDisableWebCompat],
  ['break = 1;', Context.OptionsDisableWebCompat],
  ['with = 1;', Context.OptionsDisableWebCompat],
  ['do = 1;', Context.OptionsDisableWebCompat],
  ['continue', Context.OptionsDisableWebCompat],
  ['for', Context.OptionsDisableWebCompat],
  ['switch', Context.Strict | Context.Module],
  ['while = 1;', Context.Strict | Context.Module],
  ['try = 1;', Context.Strict | Context.Module],
  ['break = 1;', Context.Strict | Context.Module],
  ['void = 1;', Context.Strict | Context.Module],
  ['function = 1;', Context.Strict | Context.Module],
  ['implements', Context.Strict | Context.Module],
  ['package', Context.Strict | Context.Module],
  ['await', Context.Strict | Context.Module],
  ['yield', Context.Strict | Context.Module]
]);

pass('Miscellaneous - Keywords (pass)', [
  [
    `var foo = {}; foo.if;`,
    Context.Strict | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'Identifier',
                name: 'foo',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              start: 4,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 12
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'foo',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'if',
              start: 18,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            start: 14,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          start: 14,
          end: 21,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 21
            }
          }
        }
      ],
      start: 0,
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
    }
  ],
  [
    `var foo = {}; foo.super;`,
    Context.Strict | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'Identifier',
                name: 'foo',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              start: 4,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 12
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'foo',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'super',
              start: 18,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            start: 14,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          start: 14,
          end: 24,
          loc: {
            start: {
              line: 1,
              column: 14
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
    `var foo = {}; foo.arguments;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'Identifier',
                name: 'foo',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              start: 4,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 12
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'foo',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'arguments',
              start: 18,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            start: 14,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          start: 14,
          end: 28,
          loc: {
            start: {
              line: 1,
              column: 14
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
  ],
  [
    `var foo = {}; foo.interface;`,
    Context.Strict | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'Identifier',
                name: 'foo',
                start: 4,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              start: 4,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 12
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: 'foo',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'interface',
              start: 18,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            start: 14,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          start: 14,
          end: 28,
          loc: {
            start: {
              line: 1,
              column: 14
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
]);
