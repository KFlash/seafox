import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Expressions - Import call (fail)', [
  ['import(x, y).then(z);', Context.Empty],
  ['import.then(doLoad);', Context.Empty],
  ['import(', Context.Empty],
  ['import[]', Context.Empty],
  ['import]', Context.Empty],
  ['import[x]', Context.Empty],
  ['import(...y)', Context.Empty],
  ['import+', Context.Empty],
  ['import = 1', Context.Empty],
  ['let f = () => import("", "");', Context.Empty],
  ['(async () => { await import("", "") });', Context.Empty],
  ['import("",);', Context.Empty],
  ['[import(x).then()] = [1];', Context.Empty],
  ['(a, import(x).then()) => {}', Context.Empty],
  ['function failsParse() { return import.then(); }', Context.Empty],
  ['import(a, b)', Context.Empty],
  ['const p = import(import.meta);', Context.Empty],
  ['(import(foo)) => {}', Context.Empty],
  ['[import(y=x)] = [1];', Context.Empty],
  ['import("") --', Context.Empty],
  ['import("") >>>= 2', Context.Empty],
  ['new import(x);', Context.Empty],
  ['{ break }', Context.Empty]
]);

pass('Expressions - Import call (pass)', [
  [
    `let f = () => { import("foo"); };`,
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ImportExpression',
                        source: {
                          type: 'Literal',
                          value: 'foo'
                        }
                      }
                    }
                  ]
                },
                params: [],
                async: false,
                expression: false
              },
              id: {
                type: 'Identifier',
                name: 'f'
              }
            }
          ]
        }
      ]
    }
  ],
  [
    `let f = () => { import("foo"); };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ImportExpression',
                        source: {
                          type: 'Literal',
                          value: 'foo',
                          start: 23,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
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
                      start: 16,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    }
                  ],
                  start: 14,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                params: [],
                async: false,
                expression: false,
                start: 8,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'f',
                start: 4,
                end: 5,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 5
                  }
                }
              },
              start: 4,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 32
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
    `f(...[import(y=x)])`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'Identifier',
              name: 'f',
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
            arguments: [
              {
                type: 'SpreadElement',
                argument: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'ImportExpression',
                      source: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'y',
                          start: 13,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 13
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          }
                        },
                        operator: '=',
                        right: {
                          type: 'Identifier',
                          name: 'x',
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
                        start: 13,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
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
                    }
                  ],
                  start: 5,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                start: 2,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 18
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
                line: 1,
                column: 19
              }
            }
          },
          start: 0,
          end: 19,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 19
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
          line: 1,
          column: 19
        }
      }
    }
  ],
  [
    `x = {[import(y=x)]: 1}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'x',
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
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'ImportExpression',
                    source: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'y',
                        start: 13,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'x',
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
                      start: 13,
                      end: 16,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
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
                  value: {
                    type: 'Literal',
                    value: 1,
                    start: 20,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  },
                  kind: 'init',
                  computed: true,
                  method: false,
                  shorthand: false,
                  start: 5,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 4,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
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
            }
          },
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
          line: 1,
          column: 22
        }
      }
    }
  ],
  [
    `({[import(y=x)]: x} = {})`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'ImportExpression',
                    source: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'y',
                        start: 10,
                        end: 11,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 11
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'x',
                        start: 12,
                        end: 13,
                        loc: {
                          start: {
                            line: 1,
                            column: 12
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
                    start: 3,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  value: {
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
                  kind: 'init',
                  computed: true,
                  method: false,
                  shorthand: false,
                  start: 2,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              start: 1,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
            start: 1,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
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
    `import(delete obj.prop);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ImportExpression',
            source: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
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
                  name: 'prop',
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

                start: 14,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              prefix: true,
              start: 7,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
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
    `import(-void 0);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ImportExpression',
            source: {
              type: 'UnaryExpression',
              operator: '-',
              argument: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                  type: 'Literal',
                  value: 0,
                  start: 13,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                prefix: true,
                start: 8,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              prefix: true,
              start: 7,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 14
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
    `import(delete void typeof +-~! 0);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ImportExpression',
            source: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                  type: 'UnaryExpression',
                  operator: 'typeof',
                  argument: {
                    type: 'UnaryExpression',
                    operator: '+',
                    argument: {
                      type: 'UnaryExpression',
                      operator: '-',
                      argument: {
                        type: 'UnaryExpression',
                        operator: '~',
                        argument: {
                          type: 'UnaryExpression',
                          operator: '!',
                          argument: {
                            type: 'Literal',
                            value: 0,
                            start: 31,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 31
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            }
                          },
                          prefix: true,
                          start: 29,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        prefix: true,
                        start: 28,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },
                      prefix: true,
                      start: 27,
                      end: 32,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    },
                    prefix: true,
                    start: 26,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    }
                  },
                  prefix: true,
                  start: 19,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                prefix: true,
                start: 14,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              },
              prefix: true,
              start: 7,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 32
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
          },
          start: 0,
          end: 34,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 34
            }
          }
        }
      ],
      start: 0,
      end: 34,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 34
        }
      }
    }
  ],
  [
    `(async () => await import(import(import("foo"))));`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'AwaitExpression',
              argument: {
                type: 'ImportExpression',
                source: {
                  type: 'ImportExpression',
                  source: {
                    type: 'ImportExpression',
                    source: {
                      type: 'Literal',
                      value: 'foo',
                      start: 40,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 40
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 33,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 26,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                },
                start: 19,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                }
              },
              start: 13,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            params: [],
            async: true,
            expression: true,
            start: 1,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 48
              }
            }
          },
          start: 0,
          end: 50,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 50
            }
          }
        }
      ],
      start: 0,
      end: 50,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 50
        }
      }
    }
  ],
  [
    `async function * f() { await import(import(import("foo"))) }`,
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
                type: 'ExpressionStatement',
                expression: {
                  type: 'AwaitExpression',
                  argument: {
                    type: 'ImportExpression',
                    source: {
                      type: 'ImportExpression',
                      source: {
                        type: 'ImportExpression',
                        source: {
                          type: 'Literal',
                          value: 'foo',
                          start: 50,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        },
                        start: 43,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 43
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        }
                      },
                      start: 36,
                      end: 57,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 57
                        }
                      }
                    },
                    start: 29,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  start: 23,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                },
                start: 23,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 58
                  }
                }
              }
            ],
            start: 21,
            end: 60,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 60
              }
            }
          },
          async: true,
          generator: true,
          id: {
            type: 'Identifier',
            name: 'f',
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
          start: 0,
          end: 60,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 60
            }
          }
        }
      ],
      start: 0,
      end: 60,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 60
        }
      }
    }
  ],
  [
    `if (false) { } else { import(import(import("foo"))); }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'Literal',
            value: false,
            start: 4,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          consequent: {
            type: 'BlockStatement',
            body: [],
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
          alternate: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'ImportExpression',
                  source: {
                    type: 'ImportExpression',
                    source: {
                      type: 'ImportExpression',
                      source: {
                        type: 'Literal',
                        value: 'foo',
                        start: 43,
                        end: 48,
                        loc: {
                          start: {
                            line: 1,
                            column: 43
                          },
                          end: {
                            line: 1,
                            column: 48
                          }
                        }
                      },
                      start: 36,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    start: 29,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  start: 22,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 51
                    }
                  }
                },
                start: 22,
                end: 52,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 52
                  }
                }
              }
            ],
            start: 20,
            end: 54,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 54
              }
            }
          },
          start: 0,
          end: 54,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 54
            }
          }
        }
      ],
      start: 0,
      end: 54,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 54
        }
      }
    }
  ],
  [
    `if (true) import("foo");`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'Literal',
            value: true,
            start: 4,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          consequent: {
            type: 'ExpressionStatement',
            expression: {
              type: 'ImportExpression',
              source: {
                type: 'Literal',
                value: 'foo',
                start: 17,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              start: 10,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            start: 10,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          alternate: null,
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
    `async function fn() { const str = await import("kuvos"); };`,
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
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'AwaitExpression',
                      argument: {
                        type: 'ImportExpression',
                        source: {
                          type: 'Literal',
                          value: 'kuvos',
                          start: 47,
                          end: 54,
                          loc: {
                            start: {
                              line: 1,
                              column: 47
                            },
                            end: {
                              line: 1,
                              column: 54
                            }
                          }
                        },
                        start: 40,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 40
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      },
                      start: 34,
                      end: 55,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 55
                        }
                      }
                    },
                    id: {
                      type: 'Identifier',
                      name: 'str',
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
                    start: 28,
                    end: 55,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 55
                      }
                    }
                  }
                ],
                start: 22,
                end: 56,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 56
                  }
                }
              }
            ],
            start: 20,
            end: 58,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 58
              }
            }
          },
          async: true,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn',
            start: 15,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          start: 0,
          end: 58,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 58
            }
          }
        },
        {
          type: 'EmptyStatement',
          start: 58,
          end: 59,
          loc: {
            start: {
              line: 1,
              column: 58
            },
            end: {
              line: 1,
              column: 59
            }
          }
        }
      ],
      start: 0,
      end: 59,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 59
        }
      }
    }
  ],
  [
    `import("foo").then(imported => {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'ImportExpression',
                source: {
                  type: 'Literal',
                  value: 'foo',
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'then',
                start: 14,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              start: 0,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            arguments: [
              {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 31,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 31
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'imported',
                    start: 19,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                async: false,
                expression: false,
                start: 19,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              }
            ],
            start: 0,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          start: 0,
          end: 35,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 35
            }
          }
        }
      ],
      start: 0,
      end: 35,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 35
        }
      }
    }
  ],
  [
    `import(x).then()`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'ImportExpression',
                source: {
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'then',
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
              }
            },
            arguments: [],

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
    `import("lib.js").then(doThis);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'CallExpression',
            callee: {
              type: 'MemberExpression',
              object: {
                type: 'ImportExpression',
                source: {
                  type: 'Literal',
                  value: 'lib.js',
                  start: 7,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 15
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
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'then',
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
            },
            arguments: [
              {
                type: 'Identifier',
                name: 'doThis',
                start: 22,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 28
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
          },
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
    `async function bar(){ await import("./nchanged") }`,
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
                type: 'ExpressionStatement',
                expression: {
                  type: 'AwaitExpression',
                  argument: {
                    type: 'ImportExpression',
                    source: {
                      type: 'Literal',
                      value: './nchanged',
                      start: 35,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    start: 28,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  start: 22,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                },
                start: 22,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                }
              }
            ],
            start: 20,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 50
              }
            }
          },
          async: true,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'bar',
            start: 15,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 18
              }
            }
          },
          start: 0,
          end: 50,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 50
            }
          }
        }
      ],
      start: 0,
      end: 50,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 50
        }
      }
    }
  ]
]);
