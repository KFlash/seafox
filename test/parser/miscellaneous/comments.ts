import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Miscellaneous - Comments', () => {
  for (const arg of [
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `;-->`,
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `/*
      var
      /* x */
      = 1;
      */`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseSource(`${arg}`, undefined, Context.Strict);
      });
    });
  }
  for (const arg of [
    // Babylon issue: https://github.com/babel/babel/issues/7802
    `<!-- test --->`,
    '0/**/',
    '/* not comment*/; i-->0',
    '// Hello, Icefapper!\n',
    '// line comment\n0',
    '// foo',
    '// /* foo */',
    `foo;
    /* comment */ --> more comments`,
    '\t\t\t\t\t\t\t\t',
    '\t // foo bar${lt}  ',
    `\t // foo bar\n // baz \n //`,
    `\t /* foo * /* bar \u2028 */  `,
    `\t // foo bar\r // baz \r //`,
    `\t /* foo * /* bar \u2029 */  `,
    `\t /* foo bar\r *//* baz*/ \r /**/`,
    `\t <!-- foo bar\t <!-- baz \r <!--`,
    `\t <!-- foo bar\u2029  `,
    '// foo',
    '/**/ // ',
    '// a /* bcd */ ',
    `  \t <!-- foo bar\n\r  `,
    `function x(){ /*Jupiter*/ return; /*Saturn*/}`,
    `var a; // a`,
    '/**/42',
    '/**/42',
    '//42',
    '42/**/',
    'function x(){ /*foo*/ return; /*bar*/}',
    '0 /*The*/ /*Answer*/',
    'if (x) { // Some comment\ndoThat(); }',
    `var a; // a`,
    '{ x\n++y }',
    '{ x\n--y }',
    '{ throw error\nerror; }',
    '{ throw error// Comment\nerror; }',
    '{ throw error/* Multiline\nComment */error; }',
    'a(/* inner */); b(e, /* inner */)',
    'while (true) { continue /* Multiline\nComment */there; }',
    'while (true) { break /* Multiline\nComment */there; }',
    'while (true) { continue // Comment\nthere; }',
    'while (true) { continue\nthere; }'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Strict);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
      });
    });
  }
  for (const [source, ctx, expected] of [
    [
      `// Single line comment
      // Single line comment
      // Single line comment
      // Single line comment
      /**/
      /* MLC on one line */
      /*
      MLC
      on
      multiple
      lines
      */`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 12,
            column: 8
          }
        },
        start: 0,
        end: 212,
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `var /* y = 1;*/
      y;`,
      Context.OptionsLoc | Context.OptionsDisableWebCompat,
      {
        type: 'Program',
        start: 0,
        end: 24,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 8
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 2,
                column: 8
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 22,
                end: 23,
                loc: {
                  start: {
                    line: 2,
                    column: 6
                  },
                  end: {
                    line: 2,
                    column: 7
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 22,
                  end: 23,
                  loc: {
                    start: {
                      line: 2,
                      column: 6
                    },
                    end: {
                      line: 2,
                      column: 7
                    }
                  },
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `var string = "/*var y = 0" /* y = 1;*/`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 4,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  },
                  name: 'string'
                },
                init: {
                  type: 'Literal',
                  start: 13,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  },
                  value: '/*var y = 0'
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `var // y = 1;
          y;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 12
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 2,
                column: 12
              }
            },
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 24,
                end: 25,
                loc: {
                  start: {
                    line: 2,
                    column: 10
                  },
                  end: {
                    line: 2,
                    column: 11
                  }
                },
                id: {
                  type: 'Identifier',
                  start: 24,
                  end: 25,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 2,
                      column: 11
                    }
                  },
                  name: 'y'
                },
                init: null
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `eval("//\u00A0 single line \u00A0 comment \u00A0");`,
      Context.OptionsLoc,
      {
        body: [
          {
            end: 36,
            expression: {
              arguments: [
                {
                  end: 34,
                  loc: {
                    end: {
                      column: 34,
                      line: 1
                    },
                    start: {
                      column: 5,
                      line: 1
                    }
                  },
                  start: 5,
                  type: 'Literal',
                  value: '//  single line   comment  '
                }
              ],
              callee: {
                end: 4,
                loc: {
                  end: {
                    column: 4,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                name: 'eval',
                start: 0,
                type: 'Identifier'
              },
              end: 35,
              loc: {
                end: {
                  column: 35,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              optional: false,
              shortCircuited: false,
              start: 0,
              type: 'CallExpression'
            },
            loc: {
              end: {
                column: 36,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExpressionStatement'
          }
        ],
        end: 36,
        loc: {
          end: {
            column: 36,
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
      `/* var
      //x
      */`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 25,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 3,
            column: 8
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `''/*
      */''`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 15,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 10
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
              }
            },
            expression: {
              type: 'Literal',
              start: 0,
              end: 2,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 2
                }
              },
              value: ''
            }
          },
          {
            type: 'ExpressionStatement',
            start: 13,
            end: 15,
            loc: {
              start: {
                line: 2,
                column: 8
              },
              end: {
                line: 2,
                column: 10
              }
            },
            expression: {
              type: 'Literal',
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 10
                }
              },
              value: ''
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      'var x = 42;/*\n*/-->is eol-comment\nvar y = 37;\n',
      Context.OptionsLoc,
      {
        body: [
          {
            declarations: [
              {
                end: 10,
                id: {
                  end: 5,
                  loc: {
                    end: {
                      column: 5,
                      line: 1
                    },
                    start: {
                      column: 4,
                      line: 1
                    }
                  },
                  name: 'x',
                  start: 4,
                  type: 'Identifier'
                },
                init: {
                  end: 10,
                  loc: {
                    end: {
                      column: 10,
                      line: 1
                    },
                    start: {
                      column: 8,
                      line: 1
                    }
                  },
                  start: 8,
                  type: 'Literal',
                  value: 42
                },
                loc: {
                  end: {
                    column: 10,
                    line: 1
                  },
                  start: {
                    column: 4,
                    line: 1
                  }
                },
                start: 4,
                type: 'VariableDeclarator'
              }
            ],
            end: 11,
            kind: 'var',
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
            type: 'VariableDeclaration'
          },
          {
            declarations: [
              {
                end: 44,
                id: {
                  end: 39,
                  loc: {
                    end: {
                      column: 5,
                      line: 3
                    },
                    start: {
                      column: 4,
                      line: 3
                    }
                  },
                  name: 'y',
                  start: 38,
                  type: 'Identifier'
                },
                init: {
                  end: 44,
                  loc: {
                    end: {
                      column: 10,
                      line: 3
                    },
                    start: {
                      column: 8,
                      line: 3
                    }
                  },
                  start: 42,
                  type: 'Literal',
                  value: 37
                },
                loc: {
                  end: {
                    column: 10,
                    line: 3
                  },
                  start: {
                    column: 4,
                    line: 3
                  }
                },
                start: 38,
                type: 'VariableDeclarator'
              }
            ],
            end: 45,
            kind: 'var',
            loc: {
              end: {
                column: 11,
                line: 3
              },
              start: {
                column: 0,
                line: 3
              }
            },
            start: 34,
            type: 'VariableDeclaration'
          }
        ],
        end: 46,
        loc: {
          end: {
            column: 0,
            line: 4
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
      '42 /* block comment 1 */ /* block comment 2 */',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 42,
              start: 0,
              end: 2,
              loc: {
                end: {
                  column: 2,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              }
            },
            start: 0,
            end: 2,
            loc: {
              end: {
                column: 2,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            }
          }
        ],
        start: 0,
        end: 46,
        loc: {
          end: {
            column: 46,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        }
      }
    ],
    [
      'function f() { /* infinite */ while (true) { } /* bar */ var each; }',
      Context.OptionsLoc,
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
                  type: 'WhileStatement',
                  test: {
                    type: 'Literal',
                    value: true,
                    start: 37,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 43,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 43
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 30,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                },
                {
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'each',
                        start: 61,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 61
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      start: 61,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 61
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    }
                  ],
                  start: 57,
                  end: 66,
                  loc: {
                    start: {
                      line: 1,
                      column: 57
                    },
                    end: {
                      line: 1,
                      column: 66
                    }
                  }
                }
              ],
              start: 13,
              end: 68,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 68
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'f',
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
            end: 68,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 68
              }
            }
          }
        ],
        start: 0,
        end: 68,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 68
          }
        }
      }
    ],
    /* [
        'while (i-->0) {}',
        Context.OptionsLoc,
        {
          "type": "Program",
          "sourceType": "module",
          "body": [
            {
              "type": "WhileStatement",
              "test": {
                "type": "BinaryExpression",
                "left": {
                  "type": "UpdateExpression",
                  "argument": {
                    "type": "Identifier",
                    "name": "i",
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 7
                      },
                      "end": {
                        "line": 1,
                        "column": 8
                      }
                    }
                  },
                  "operator": "--",
                  "prefix": false,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 7
                    },
                    "end": {
                      "line": 1,
                      "column": 10
                    }
                  }
                },
                "right": {
                  "type": "Literal",
                  "value": 0,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 11
                    },
                    "end": {
                      "line": 1,
                      "column": 12
                    }
                  }
                },
                "operator": ">",
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 7
                  },
                  "end": {
                    "line": 1,
                    "column": 12
                  }
                }
              },
              "body": {
                "type": "BlockStatement",
                "body": [],
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 14
                  },
                  "end": {
                    "line": 1,
                    "column": 16
                  }
                }
              },
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 16
                }
              }
            }
          ],
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 16
            }
          }
        }],*/
    [
      'function x(){ /*Jupiter*/ return; /*Saturn*/}',
      Context.OptionsLoc,
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
                  type: 'ReturnStatement',
                  argument: null,
                  start: 26,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 12,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'x',
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
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 45
              }
            }
          }
        ],
        start: 0,
        end: 45,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 45
          }
        }
      }
    ],
    [
      '/**/ function a() {}',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [],
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
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'a',
              start: 14,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            start: 5,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 20
              }
            }
          }
        ],
        start: 0,
        end: 20,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 20
          }
        }
      }
    ],
    [
      `while (true) {
                /**
                 * comments in empty block
                 */
              }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 113,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 5,
            column: 15
          }
        },
        body: [
          {
            type: 'WhileStatement',
            start: 0,
            end: 113,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 5,
                column: 15
              }
            },
            test: {
              type: 'Literal',
              start: 7,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 11
                }
              },
              value: true
            },
            body: {
              type: 'BlockStatement',
              start: 13,
              end: 113,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 5,
                  column: 15
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      '/**//****/',
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 10,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 10
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      '/******/',
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 8,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      '/***/',
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 5,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 5
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/**
        foo *
        *
          *
          *   * bar */`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 62,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 5,
            column: 22
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/**
        foo **** bar */`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 23
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/**\t \r\n \n\r \v\f\t*/`,
      Context.OptionsLoc,
      {
        body: [],
        end: 16,
        loc: {
          end: {
            column: 6,
            line: 5
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
      `/**
          //
              --> */`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 3,
            column: 20
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      '/** // --> */',
      Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      '-->',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [],
        start: 0,
        end: 3,
        loc: {
          end: {
            column: 3,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        }
      }
    ],
    [
      `// \n \r `,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
        end: 7,
        loc: {
          end: {
            column: 1,
            line: 3
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
      `/* \n \r \\x0a \\u000a */ // foo /* * -*/`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
        end: 37,
        loc: {
          end: {
            column: 31,
            line: 3
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
      `--> `,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
        end: 4,
        loc: {
          end: {
            column: 4,
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
      `--> foo bar
       x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            end: 21,
            expression: {
              end: 20,
              loc: {
                end: {
                  column: 8,
                  line: 2
                },
                start: {
                  column: 7,
                  line: 2
                }
              },
              name: 'x',
              start: 19,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 9,
                line: 2
              },
              start: {
                column: 7,
                line: 2
              }
            },
            start: 19,
            type: 'ExpressionStatement'
          }
        ],
        end: 21,
        loc: {
          end: {
            column: 9,
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
    ],
    [
      `--> foo bar`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
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
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `// /* */ oh noes `,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `// */ oh noes `,
      Context.OptionsNext | Context.OptionsLoc,
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
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `// /* */ oh noes`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `//\\unope \\u{nope} \\xno`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 22,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 22
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/* \n \r \\x0a \\u000a */ `,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
        end: 22,
        loc: {
          end: {
            column: 16,
            line: 3
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
      `/* comment */`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [],
        sourceType: 'script'
      }
    ],

    [
      `// Single line comment

      // Single line comment

      // Single line comment

      // Single line comment

      /**/

      /* MLC on one line */

      /*
      MLC
      on
      multiple
      lines
      */`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 218,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 18,
            column: 8
          }
        },
        body: [],
        sourceType: 'script'
      }
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
