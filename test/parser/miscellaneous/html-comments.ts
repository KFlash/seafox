import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - HTML comments', () => {
  for (const [source, ctx, expected] of [
    [
      `/* not comment*/; i-->0`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'EmptyStatement',
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
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'BinaryExpression',
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
              },
              left: {
                type: 'UpdateExpression',
                start: 18,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                },
                operator: '--',
                prefix: false,
                argument: {
                  type: 'Identifier',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  },
                  name: 'i'
                }
              },
              operator: '>',
              right: {
                type: 'Literal',
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
                },
                value: 0
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `--> a b`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 7,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 7
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `// stuff
    -->`,
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
            line: 2,
            column: 7
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/* foo
    bar */ --> a b`,
      Context.OptionsNext | Context.OptionsLoc,
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
            line: 2,
            column: 18
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `0/*\n*/-->`,
      Context.OptionsNext | Context.OptionsLoc,
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
              start: 0,
              type: 'Literal',
              value: 0
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
            column: 5,
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
      `0/*
     */-->the comment extends to these characters`,
      Context.OptionsNext | Context.OptionsLoc,
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
              start: 0,
              type: 'Literal',
              value: 0
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
        end: 53,
        loc: {
          end: {
            column: 49,
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
      `0/*
     */ /**/ /* second optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 115,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 111
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'Literal',
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
              },
              value: 0
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `counter\u2028-->a U+2028 LINE SEPARATOR between "counter" and "-->" means this is all a comment`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            end: 7,
            expression: {
              end: 7,
              loc: {
                end: {
                  column: 7,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              name: 'counter',
              start: 0,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 7,
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
        end: 90,
        loc: {
          end: {
            column: 82,
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
      `var foo = [23]
     -->[0];`,
      Context.OptionsNext | Context.OptionsLoc,
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
            column: 12
          }
        },
        body: [
          {
            type: 'VariableDeclaration',
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
            declarations: [
              {
                type: 'VariableDeclarator',
                start: 4,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                },
                id: {
                  type: 'Identifier',
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
                  },
                  name: 'foo'
                },
                init: {
                  type: 'ArrayExpression',
                  start: 10,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  },
                  elements: [
                    {
                      type: 'Literal',
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
                      },
                      value: 23
                    }
                  ]
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
      `   -->the comment extends to these characters`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `/**/ /* second optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 103,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 103
          }
        },
        body: [],
        sourceType: 'script'
      }
    ],
    [
      `x = -1 <!--x;`,
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
        body: [
          {
            type: 'ExpressionStatement',
            start: 0,
            end: 6,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 6
              }
            },
            expression: {
              type: 'AssignmentExpression',
              start: 0,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 6
                }
              },
              operator: '=',
              left: {
                type: 'Identifier',
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
                },
                name: 'x'
              },
              right: {
                type: 'UnaryExpression',
                start: 4,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                },
                operator: '-',
                prefix: true,
                argument: {
                  type: 'Literal',
                  start: 5,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  },
                  value: 1
                }
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `counter += 1;<!--the comment extends to these characters`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 56,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 56
          }
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'AssignmentExpression',
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
              },
              operator: '+=',
              left: {
                type: 'Identifier',
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                },
                name: 'counter'
              },
              right: {
                type: 'Literal',
                start: 11,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                },
                value: 1
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `<!--`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 4,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 4
          }
        },
        body: [],
        sourceType: 'script'
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
