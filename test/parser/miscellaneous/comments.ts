import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Miscellaneous - Comments (fail)', [
  [`x --> is eol-comment\nvar y = 37;\n`, Context.Strict],
  ['"\\n" --> is eol-comment\nvar y = 37;\n', Context.Strict],
  ['x/* precomment */ --> is eol-comment\nvar y = 37;\n', Context.Strict],
  [
    `/*
  */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    Context.Strict
  ],
  [
    `/*
  */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    Context.Strict
  ],
  [
    `/*
  var
  /* x */
  = 1;
  */`,
    Context.Strict
  ]
]);

pass('Miscellaneous - Comments (pass)', [
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
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [],
      start: 0,
      end: 190,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 12,
          column: 6
        }
      }
    }
  ],
  [
    `a<!--\n\n-->b`,
    Context.OptionsLoc,
    {
      body: [
        {
          end: 1,
          expression: {
            end: 1,
            loc: {
              end: {
                column: 1,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            name: 'a',
            start: 0,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 1,
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
      end: 11,
      loc: {
        end: {
          column: 4,
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
    `a<!--\n-->`,
    Context.OptionsLoc,
    {
      body: [
        {
          end: 1,
          expression: {
            end: 1,
            loc: {
              end: {
                column: 1,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            name: 'a',
            start: 0,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 1,
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
      end: 9,
      loc: {
        end: {
          column: 3,
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
    `a/*\n*/-->', x => x`,
    Context.OptionsLoc,
    {
      body: [
        {
          end: 1,
          expression: {
            end: 1,
            loc: {
              end: {
                column: 1,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            name: 'a',
            start: 0,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 1,
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
      end: 18,
      loc: {
        end: {
          column: 14,
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
    `var /* y = 1;*/
    y;`,
    Context.OptionsLoc | Context.OptionsDisableWebCompat,
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
              init: null,
              id: {
                type: 'Identifier',
                name: 'y',
                start: 20,
                end: 21,
                loc: {
                  start: {
                    line: 2,
                    column: 4
                  },
                  end: {
                    line: 2,
                    column: 5
                  }
                }
              },
              start: 20,
              end: 21,
              loc: {
                start: {
                  line: 2,
                  column: 4
                },
                end: {
                  line: 2,
                  column: 5
                }
              }
            }
          ],
          start: 0,
          end: 22,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 2,
              column: 6
            }
          }
        }
      ],
      start: 0,
      end: 22,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 6
        }
      }
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
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'y',
                start: 22,
                end: 23,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 2,
                    column: 9
                  }
                }
              },
              start: 22,
              end: 23,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 9
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
              line: 2,
              column: 10
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
          line: 2,
          column: 10
        }
      }
    }
  ],
  [
    `/* var
    //x
    */`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [],
      start: 0,
      end: 21,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 3,
          column: 6
        }
      }
    }
  ],
  [
    `''/*
    */''`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: '',
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
            }
          },
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
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: '',
            start: 11,
            end: 13,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 8
              }
            }
          },
          start: 11,
          end: 13,
          loc: {
            start: {
              line: 2,
              column: 6
            },
            end: {
              line: 2,
              column: 8
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
          line: 2,
          column: 8
        }
      }
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
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Literal',
            value: true,
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
            }
          },
          body: {
            type: 'BlockStatement',
            body: [],
            start: 13,
            end: 105,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 5,
                column: 13
              }
            }
          },
          start: 0,
          end: 105,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 5,
              column: 13
            }
          }
        }
      ],
      start: 0,
      end: 105,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 5,
          column: 13
        }
      }
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
      sourceType: 'script',
      body: [],
      start: 0,
      end: 54,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 5,
          column: 20
        }
      }
    }
  ],
  [
    `/**
      foo **** bar */`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [],
      start: 0,
      end: 25,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 21
        }
      }
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
    `/**
        //
            --> */`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [],
      start: 0,
      end: 33,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 3,
          column: 18
        }
      }
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'x',
            start: 17,
            end: 18,
            loc: {
              start: {
                line: 2,
                column: 5
              },
              end: {
                line: 2,
                column: 6
              }
            }
          },
          start: 17,
          end: 19,
          loc: {
            start: {
              line: 2,
              column: 5
            },
            end: {
              line: 2,
              column: 7
            }
          }
        }
      ],
      start: 0,
      end: 19,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 7
        }
      }
    }
  ],
  [
    `--> foo bar`,
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
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
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [],
      start: 0,
      end: 190,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 12,
          column: 6
        }
      }
    }
  ]
]);
