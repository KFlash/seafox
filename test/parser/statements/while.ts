import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Statements - While (fail)', [
  ['while (x) var foo = 1; let foo = 1;', Context.OptionsDisableWebCompat],
  ['while 1 break;', Context.OptionsDisableWebCompat],
  ['while "hood" break;', Context.OptionsDisableWebCompat],
  ['while (false) function f() {}', Context.OptionsDisableWebCompat],
  ['while (false) let x = 1;', Context.Empty],
  ['while 1 break;', Context.Empty],
  [`while '' break;`, Context.Empty],
  ['while(0) !function(){ break; };', Context.OptionsDisableWebCompat],
  ['while(0) { function f(){ break; } }', Context.Strict],
  ['while (false) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['while (false) async function f() {}', Context.OptionsDisableWebCompat],
  ['while (false) const x = null;', Context.Empty],
  ['while (false) function* g() {}', Context.OptionsDisableWebCompat],
  ['while true break;', Context.Empty],
  ['while({1}){ break ; };', Context.Empty],
  ['while({1}){ break ; };', Context.OptionsDisableWebCompat]
]);

pass('Statements - While (pass)', [
  [
    `while (1) /foo/`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Literal',
            value: 1,
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
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: /foo/,
              regex: {
                pattern: 'foo',
                flags: ''
              },
              start: 10,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            start: 10,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 15
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
        }
      ],
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
    }
  ],
  [
    `while (false) let // ASI
      x = 1;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Literal',
            value: false,
            start: 7,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'let',
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
          },
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x',
              start: 31,
              end: 32,
              loc: {
                start: {
                  line: 2,
                  column: 6
                },
                end: {
                  line: 2,
                  column: 7
                }
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 1,
              start: 35,
              end: 36,
              loc: {
                start: {
                  line: 2,
                  column: 10
                },
                end: {
                  line: 2,
                  column: 11
                }
              }
            },
            start: 31,
            end: 36,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 11
              }
            }
          },
          start: 31,
          end: 37,
          loc: {
            start: {
              line: 2,
              column: 6
            },
            end: {
              line: 2,
              column: 12
            }
          }
        }
      ],
      start: 0,
      end: 37,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 12
        }
      }
    }
  ],
  [
    `while (i-->1) {}`,
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
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'i',
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
              operator: '--',
              prefix: false,
              start: 7,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            right: {
              type: 'Literal',
              value: 1,
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
              }
            },
            operator: '>',
            start: 7,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          body: {
            type: 'BlockStatement',
            body: [],
            start: 14,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 14
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
    `a: while (true) continue a;`,
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
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
              }
            },
            body: {
              type: 'ContinueStatement',
              label: {
                type: 'Identifier',
                name: 'a',
                start: 25,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 25
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 16,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 27
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
  ],
  [
    `while (this) try {} catch (h) {}`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'ThisExpression',
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
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 17,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'h',
                start: 27,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 30,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              },
              start: 20,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            finalizer: null,
            start: 13,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 32
              }
            }
          },
          start: 0,
          end: 32,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 32
            }
          }
        }
      ],
      start: 0,
      end: 32,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 32
        }
      }
    }
  ],
  [
    `while (foo) bar;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Identifier',
            name: 'foo',
            start: 7,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'bar',
              start: 12,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            start: 12,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 12
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
]);
