import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Statements - Break (fail)', [
  ['function f(){ switch (x){ case z: break y }}', Context.Empty],
  ['function f(){ switch (x){ case z: if (x) break y }}', Context.Empty],
  ['switch (x){ case z: break y }', Context.Empty],
  ['switch (x){ case z: if (x) break y }', Context.Empty],
  ['() => { switch (x){ case z: if (x) break y }}', Context.Empty],
  ['() => { switch (x){ case z: break y }}', Context.Empty],
  ['() => break', Context.Empty],
  ['() => { { break } }', Context.Empty],
  ['() => { if (x) break y }', Context.Strict | Context.Module],
  ['() => { if (x) break }', Context.Empty],
  ['() => { break }', Context.Empty],
  ['if (x) break', Context.Empty],
  ['break', Context.Empty],
  ['{ break }', Context.Empty],
  ['do break y ; while(true);', Context.Empty],
  ['x: foo; break x;', Context.Empty],
  ['{  break foo; var y=2; }', Context.Empty],
  ['loop; while (true) { break loop1; }', Context.Empty],
  ['{ break }', Context.Empty]
]);

pass('Statements - Break (pass)', [
  [
    `{ async *[await = 5]()
        {}
      }`,
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'async'
                },
                right: {
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'await'
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 5
                        }
                      }
                    ]
                  },
                  arguments: []
                },
                operator: '*'
              }
            },
            {
              type: 'BlockStatement',
              body: []
            }
          ]
        }
      ]
    }
  ],
  [
    `{ (x = [yield]) }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
                  start: 3,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                operator: '=',
                right: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'yield',
                      start: 8,
                      end: 13,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 13
                        }
                      }
                    }
                  ],
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
              start: 2,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 15
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
    `{ (x = [yield]) => z }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'Identifier',
                  name: 'z',
                  start: 19,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                params: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'x',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    },
                    right: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'yield',
                          start: 8,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          }
                        }
                      ],
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
                  }
                ],
                async: false,
                expression: true,
                start: 2,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              start: 2,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 20
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
    `{ function f(){} async function f(){} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 35,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 35
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                }
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 32,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              start: 17,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            }
          ],
          start: 0,
          end: 39,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 39
            }
          }
        }
      ],
      start: 0,
      end: 39,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 39
        }
      }
    }
  ],
  [
    `{}[];;`,
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: []
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: []
          }
        },
        {
          type: 'EmptyStatement'
        }
      ]
    }
  ],
  [
    `{}[];;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
            type: 'ArrayExpression',
            elements: [],
            start: 2,
            end: 4,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 4
              }
            }
          },
          start: 2,
          end: 5,
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 5
            }
          }
        },
        {
          type: 'EmptyStatement',
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
          }
        }
      ],
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
      }
    }
  ],
  [
    `{}() => 42;;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
            type: 'ArrowFunctionExpression',
            body: {
              type: 'Literal',
              value: 42,
              start: 8,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            params: [],
            async: false,
            expression: true,
            start: 2,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          start: 2,
          end: 11,
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 11
            }
          }
        },
        {
          type: 'EmptyStatement',
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
        }
      ],
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
    }
  ],
  [
    `{}{x: 42};;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
          type: 'BlockStatement',
          body: [
            {
              type: 'LabeledStatement',
              label: {
                type: 'Identifier',
                name: 'x',
                start: 3,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                }
              },
              body: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'Literal',
                  value: 42,
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
              start: 3,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            }
          ],
          start: 2,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        {
          type: 'EmptyStatement',
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
        {
          type: 'EmptyStatement',
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
        }
      ],
      start: 0,
      end: 11,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  [
    `{}let a, b = 42, c;b;;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'a',
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 42,
                start: 13,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'b',
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
              start: 9,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'c',
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
            }
          ],
          start: 2,
          end: 19,
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 19
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'b',
            start: 19,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 19
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          start: 19,
          end: 21,
          loc: {
            start: {
              line: 1,
              column: 19
            },
            end: {
              line: 1,
              column: 21
            }
          }
        },
        {
          type: 'EmptyStatement',
          start: 21,
          end: 22,
          loc: {
            start: {
              line: 1,
              column: 21
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
    `{length: 3000}[];;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'LabeledStatement',
              label: {
                type: 'Identifier',
                name: 'length',
                start: 1,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 1
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
                  type: 'Literal',
                  value: 3000,
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
            }
          ],
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
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [],
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
        {
          type: 'EmptyStatement',
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
        }
      ],
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
    }
  ],
  [
    `{length: 3000}{};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'LabeledStatement',
              label: {
                type: 'Identifier',
                name: 'length',
                start: 1,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 1
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
                  type: 'Literal',
                  value: 3000,
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
            }
          ],
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
        {
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
    'class C {}[];;',
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'C',
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
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [],
            start: 8,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
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
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrayExpression',
            elements: [],
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
        {
          type: 'EmptyStatement',
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
        }
      ],
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
    }
  ],
  [
    `class C {}() => { return 42; };;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'C',
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
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [],
            start: 8,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
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
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Literal',
                    value: 42,
                    start: 25,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  },
                  start: 18,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                }
              ],
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
            },
            params: [],
            async: false,
            expression: false,
            start: 10,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 30
              }
            }
          },
          start: 10,
          end: 31,
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 31
            }
          }
        },
        {
          type: 'EmptyStatement',
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
    `function fn() {}{x: 42};;`,
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
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn',
            start: 9,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 11
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
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'LabeledStatement',
              label: {
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
              body: {
                type: 'ExpressionStatement',
                expression: {
                  type: 'Literal',
                  value: 42,
                  start: 20,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                },
                start: 20,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
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
            }
          ],
          start: 16,
          end: 23,
          loc: {
            start: {
              line: 1,
              column: 16
            },
            end: {
              line: 1,
              column: 23
            }
          }
        },
        {
          type: 'EmptyStatement',
          start: 23,
          end: 24,
          loc: {
            start: {
              line: 1,
              column: 23
            },
            end: {
              line: 1,
              column: 24
            }
          }
        },
        {
          type: 'EmptyStatement',
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
    `function fn() {}let a, b = 42, c;b;;`,
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
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'fn',
            start: 9,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 11
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
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'a',
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 42,
                start: 27,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'b',
                start: 23,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              start: 23,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'c',
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
            }
          ],
          start: 16,
          end: 33,
          loc: {
            start: {
              line: 1,
              column: 16
            },
            end: {
              line: 1,
              column: 33
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'b',
            start: 33,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 33
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          start: 33,
          end: 35,
          loc: {
            start: {
              line: 1,
              column: 33
            },
            end: {
              line: 1,
              column: 35
            }
          }
        },
        {
          type: 'EmptyStatement',
          start: 35,
          end: 36,
          loc: {
            start: {
              line: 1,
              column: 35
            },
            end: {
              line: 1,
              column: 36
            }
          }
        }
      ],
      start: 0,
      end: 36,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  [
    `{}/1/;;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
            value: /1/,
            regex: {
              pattern: '1',
              flags: ''
            },
            start: 2,
            end: 5,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 5
              }
            }
          },
          start: 2,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 2
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'EmptyStatement',
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
        }
      ],
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
      }
    }
  ],
  [
    `function f() {let f}`,
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
                kind: 'let',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
                      type: 'Identifier',
                      name: 'f',
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
                      }
                    },
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
                    }
                  }
                ],
                start: 14,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              }
            ],
            start: 13,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 13
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
    `"use strict"; { function f() {} function f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 'use strict',
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
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 29,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 45,
                end: 47,
                loc: {
                  start: {
                    line: 1,
                    column: 45
                  },
                  end: {
                    line: 1,
                    column: 47
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 41,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 41
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              start: 32,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 32
                },
                end: {
                  line: 1,
                  column: 47
                }
              }
            }
          ],
          start: 14,
          end: 49,
          loc: {
            start: {
              line: 1,
              column: 14
            },
            end: {
              line: 1,
              column: 49
            }
          }
        }
      ],
      start: 0,
      end: 49,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 49
        }
      }
    }
  ],
  [
    `{ function *f(){} } function *f(){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 17
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
        {
          type: 'FunctionDeclaration',
          params: [],
          body: {
            type: 'BlockStatement',
            body: [],
            start: 33,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 33
              },
              end: {
                line: 1,
                column: 35
              }
            }
          },
          async: false,
          generator: true,
          id: {
            type: 'Identifier',
            name: 'f',
            start: 30,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 30
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          start: 20,
          end: 35,
          loc: {
            start: {
              line: 1,
              column: 20
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
    `var x; { let x; }`,
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
                name: 'x',
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
            }
          ],
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
          }
        },
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'x',
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
                }
              ],
              start: 9,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            }
          ],
          start: 7,
          end: 17,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `function f(){} function f(){}`,
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
            start: 12,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 14
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
        {
          type: 'FunctionDeclaration',
          params: [],
          body: {
            type: 'BlockStatement',
            body: [],
            start: 27,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 27
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
            name: 'f',
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
          start: 15,
          end: 29,
          loc: {
            start: {
              line: 1,
              column: 15
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
    `{ function f(){} } function f(){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
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
        {
          type: 'FunctionDeclaration',
          params: [],
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
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'f',
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
    `{}
      /foo/`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
            value: /foo/,
            regex: {
              pattern: 'foo',
              flags: ''
            },
            start: 9,
            end: 14,
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
          start: 9,
          end: 14,
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
        }
      ],
      start: 0,
      end: 14,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 11
        }
      }
    }
  ],
  [
    `{
      let result;
      let x = 1;
      switch (x) {
        case 1:
          let x = 2;
          result = x;
          break;
        default:
          result = 0;
          break;
      }
    }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'result',
                    start: 12,
                    end: 18,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 2,
                        column: 16
                      }
                    }
                  },
                  start: 12,
                  end: 18,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 2,
                      column: 16
                    }
                  }
                }
              ],
              start: 8,
              end: 19,
              loc: {
                start: {
                  line: 2,
                  column: 6
                },
                end: {
                  line: 2,
                  column: 17
                }
              }
            },
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1,
                    start: 34,
                    end: 35,
                    loc: {
                      start: {
                        line: 3,
                        column: 14
                      },
                      end: {
                        line: 3,
                        column: 15
                      }
                    }
                  },
                  id: {
                    type: 'Identifier',
                    name: 'x',
                    start: 30,
                    end: 31,
                    loc: {
                      start: {
                        line: 3,
                        column: 10
                      },
                      end: {
                        line: 3,
                        column: 11
                      }
                    }
                  },
                  start: 30,
                  end: 35,
                  loc: {
                    start: {
                      line: 3,
                      column: 10
                    },
                    end: {
                      line: 3,
                      column: 15
                    }
                  }
                }
              ],
              start: 26,
              end: 36,
              loc: {
                start: {
                  line: 3,
                  column: 6
                },
                end: {
                  line: 3,
                  column: 16
                }
              }
            },
            {
              type: 'SwitchStatement',
              discriminant: {
                type: 'Identifier',
                name: 'x',
                start: 51,
                end: 52,
                loc: {
                  start: {
                    line: 4,
                    column: 14
                  },
                  end: {
                    line: 4,
                    column: 15
                  }
                }
              },
              cases: [
                {
                  type: 'SwitchCase',
                  test: {
                    type: 'Literal',
                    value: 1,
                    start: 69,
                    end: 70,
                    loc: {
                      start: {
                        line: 5,
                        column: 13
                      },
                      end: {
                        line: 5,
                        column: 14
                      }
                    }
                  },
                  consequent: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 2,
                            start: 90,
                            end: 91,
                            loc: {
                              start: {
                                line: 6,
                                column: 18
                              },
                              end: {
                                line: 6,
                                column: 19
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 86,
                            end: 87,
                            loc: {
                              start: {
                                line: 6,
                                column: 14
                              },
                              end: {
                                line: 6,
                                column: 15
                              }
                            }
                          },
                          start: 86,
                          end: 91,
                          loc: {
                            start: {
                              line: 6,
                              column: 14
                            },
                            end: {
                              line: 6,
                              column: 19
                            }
                          }
                        }
                      ],
                      start: 82,
                      end: 92,
                      loc: {
                        start: {
                          line: 6,
                          column: 10
                        },
                        end: {
                          line: 6,
                          column: 20
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'result',
                          start: 103,
                          end: 109,
                          loc: {
                            start: {
                              line: 7,
                              column: 10
                            },
                            end: {
                              line: 7,
                              column: 16
                            }
                          }
                        },
                        operator: '=',
                        right: {
                          type: 'Identifier',
                          name: 'x',
                          start: 112,
                          end: 113,
                          loc: {
                            start: {
                              line: 7,
                              column: 19
                            },
                            end: {
                              line: 7,
                              column: 20
                            }
                          }
                        },
                        start: 103,
                        end: 113,
                        loc: {
                          start: {
                            line: 7,
                            column: 10
                          },
                          end: {
                            line: 7,
                            column: 20
                          }
                        }
                      },
                      start: 103,
                      end: 114,
                      loc: {
                        start: {
                          line: 7,
                          column: 10
                        },
                        end: {
                          line: 7,
                          column: 21
                        }
                      }
                    },
                    {
                      type: 'BreakStatement',
                      label: null,
                      start: 125,
                      end: 131,
                      loc: {
                        start: {
                          line: 8,
                          column: 10
                        },
                        end: {
                          line: 8,
                          column: 16
                        }
                      }
                    }
                  ],
                  start: 64,
                  end: 131,
                  loc: {
                    start: {
                      line: 5,
                      column: 8
                    },
                    end: {
                      line: 8,
                      column: 16
                    }
                  }
                },
                {
                  type: 'SwitchCase',
                  test: null,
                  consequent: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'result',
                          start: 159,
                          end: 165,
                          loc: {
                            start: {
                              line: 10,
                              column: 10
                            },
                            end: {
                              line: 10,
                              column: 16
                            }
                          }
                        },
                        operator: '=',
                        right: {
                          type: 'Literal',
                          value: 0,
                          start: 168,
                          end: 169,
                          loc: {
                            start: {
                              line: 10,
                              column: 19
                            },
                            end: {
                              line: 10,
                              column: 20
                            }
                          }
                        },
                        start: 159,
                        end: 169,
                        loc: {
                          start: {
                            line: 10,
                            column: 10
                          },
                          end: {
                            line: 10,
                            column: 20
                          }
                        }
                      },
                      start: 159,
                      end: 170,
                      loc: {
                        start: {
                          line: 10,
                          column: 10
                        },
                        end: {
                          line: 10,
                          column: 21
                        }
                      }
                    },
                    {
                      type: 'BreakStatement',
                      label: null,
                      start: 181,
                      end: 187,
                      loc: {
                        start: {
                          line: 11,
                          column: 10
                        },
                        end: {
                          line: 11,
                          column: 16
                        }
                      }
                    }
                  ],
                  start: 140,
                  end: 187,
                  loc: {
                    start: {
                      line: 9,
                      column: 8
                    },
                    end: {
                      line: 11,
                      column: 16
                    }
                  }
                }
              ],
              start: 43,
              end: 195,
              loc: {
                start: {
                  line: 4,
                  column: 6
                },
                end: {
                  line: 12,
                  column: 7
                }
              }
            }
          ],
          start: 0,
          end: 201,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 13,
              column: 5
            }
          }
        }
      ],
      start: 0,
      end: 201,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 13,
          column: 5
        }
      }
    }
  ],
  [
    `{ function* f() {} function* f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 16,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
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
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 33,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 33
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 29,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              start: 19,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 35
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
              line: 1,
              column: 37
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
          line: 1,
          column: 37
        }
      }
    }
  ],
  [
    `try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ThrowStatement',
                argument: {
                  type: 'ObjectExpression',
                  properties: [],
                  start: 12,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                start: 6,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
            start: 4,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'f',
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
                  value: {
                    type: 'Identifier',
                    name: 'f',
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
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
                }
              ],
              start: 25,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Literal',
                    value: 1,
                    start: 42,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: null,
                      consequent: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 69,
                            end: 73,
                            loc: {
                              start: {
                                line: 1,
                                column: 69
                              },
                              end: {
                                line: 1,
                                column: 73
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 65,
                            end: 66,
                            loc: {
                              start: {
                                line: 1,
                                column: 65
                              },
                              end: {
                                line: 1,
                                column: 66
                              }
                            }
                          },
                          start: 56,
                          end: 73,
                          loc: {
                            start: {
                              line: 1,
                              column: 56
                            },
                            end: {
                              line: 1,
                              column: 73
                            }
                          }
                        }
                      ],
                      start: 47,
                      end: 73,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 73
                        }
                      }
                    }
                  ],
                  start: 34,
                  end: 74,
                  loc: {
                    start: {
                      line: 1,
                      column: 34
                    },
                    end: {
                      line: 1,
                      column: 74
                    }
                  }
                }
              ],
              start: 32,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 32
                },
                end: {
                  line: 1,
                  column: 76
                }
              }
            },
            start: 18,
            end: 76,
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 76
              }
            }
          },
          finalizer: null,
          start: 0,
          end: 76,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 76
            }
          }
        }
      ],
      start: 0,
      end: 76,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 76
        }
      }
    }
  ],
  [
    `try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }
    try { throw {}; } catch ({ f }) { switch (1) { default: function f() {  }} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ThrowStatement',
                argument: {
                  type: 'ObjectExpression',
                  properties: [],
                  start: 12,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                start: 6,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
            start: 4,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'f',
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
                  value: {
                    type: 'Identifier',
                    name: 'f',
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
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
                }
              ],
              start: 25,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Literal',
                    value: 1,
                    start: 42,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: null,
                      consequent: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 69,
                            end: 73,
                            loc: {
                              start: {
                                line: 1,
                                column: 69
                              },
                              end: {
                                line: 1,
                                column: 73
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 65,
                            end: 66,
                            loc: {
                              start: {
                                line: 1,
                                column: 65
                              },
                              end: {
                                line: 1,
                                column: 66
                              }
                            }
                          },
                          start: 56,
                          end: 73,
                          loc: {
                            start: {
                              line: 1,
                              column: 56
                            },
                            end: {
                              line: 1,
                              column: 73
                            }
                          }
                        }
                      ],
                      start: 47,
                      end: 73,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 73
                        }
                      }
                    }
                  ],
                  start: 34,
                  end: 74,
                  loc: {
                    start: {
                      line: 1,
                      column: 34
                    },
                    end: {
                      line: 1,
                      column: 74
                    }
                  }
                }
              ],
              start: 32,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 32
                },
                end: {
                  line: 1,
                  column: 76
                }
              }
            },
            start: 18,
            end: 76,
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 76
              }
            }
          },
          finalizer: null,
          start: 0,
          end: 76,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 76
            }
          }
        },
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ThrowStatement',
                argument: {
                  type: 'ObjectExpression',
                  properties: [],
                  start: 93,
                  end: 95,
                  loc: {
                    start: {
                      line: 2,
                      column: 16
                    },
                    end: {
                      line: 2,
                      column: 18
                    }
                  }
                },
                start: 87,
                end: 96,
                loc: {
                  start: {
                    line: 2,
                    column: 10
                  },
                  end: {
                    line: 2,
                    column: 19
                  }
                }
              }
            ],
            start: 85,
            end: 98,
            loc: {
              start: {
                line: 2,
                column: 8
              },
              end: {
                line: 2,
                column: 21
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'f',
                    start: 108,
                    end: 109,
                    loc: {
                      start: {
                        line: 2,
                        column: 31
                      },
                      end: {
                        line: 2,
                        column: 32
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'f',
                    start: 108,
                    end: 109,
                    loc: {
                      start: {
                        line: 2,
                        column: 31
                      },
                      end: {
                        line: 2,
                        column: 32
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 108,
                  end: 109,
                  loc: {
                    start: {
                      line: 2,
                      column: 31
                    },
                    end: {
                      line: 2,
                      column: 32
                    }
                  }
                }
              ],
              start: 106,
              end: 111,
              loc: {
                start: {
                  line: 2,
                  column: 29
                },
                end: {
                  line: 2,
                  column: 34
                }
              }
            },
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Literal',
                    value: 1,
                    start: 123,
                    end: 124,
                    loc: {
                      start: {
                        line: 2,
                        column: 46
                      },
                      end: {
                        line: 2,
                        column: 47
                      }
                    }
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: null,
                      consequent: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 150,
                            end: 154,
                            loc: {
                              start: {
                                line: 2,
                                column: 73
                              },
                              end: {
                                line: 2,
                                column: 77
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 146,
                            end: 147,
                            loc: {
                              start: {
                                line: 2,
                                column: 69
                              },
                              end: {
                                line: 2,
                                column: 70
                              }
                            }
                          },
                          start: 137,
                          end: 154,
                          loc: {
                            start: {
                              line: 2,
                              column: 60
                            },
                            end: {
                              line: 2,
                              column: 77
                            }
                          }
                        }
                      ],
                      start: 128,
                      end: 154,
                      loc: {
                        start: {
                          line: 2,
                          column: 51
                        },
                        end: {
                          line: 2,
                          column: 77
                        }
                      }
                    }
                  ],
                  start: 115,
                  end: 155,
                  loc: {
                    start: {
                      line: 2,
                      column: 38
                    },
                    end: {
                      line: 2,
                      column: 78
                    }
                  }
                }
              ],
              start: 113,
              end: 157,
              loc: {
                start: {
                  line: 2,
                  column: 36
                },
                end: {
                  line: 2,
                  column: 80
                }
              }
            },
            start: 99,
            end: 157,
            loc: {
              start: {
                line: 2,
                column: 22
              },
              end: {
                line: 2,
                column: 80
              }
            }
          },
          finalizer: null,
          start: 81,
          end: 157,
          loc: {
            start: {
              line: 2,
              column: 4
            },
            end: {
              line: 2,
              column: 80
            }
          }
        }
      ],
      start: 0,
      end: 157,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 80
        }
      }
    }
  ],
  [
    `let f = 123; switch (1) { default: function f() {  }  }`,
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
                type: 'Literal',
                value: 123,
                start: 8,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 11
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
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            }
          ],
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
          type: 'SwitchStatement',
          discriminant: {
            type: 'Literal',
            value: 1,
            start: 21,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 22
              }
            }
          },
          cases: [
            {
              type: 'SwitchCase',
              test: null,
              consequent: [
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 48,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 48
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
                    start: 44,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 35,
                  end: 52,
                  loc: {
                    start: {
                      line: 1,
                      column: 35
                    },
                    end: {
                      line: 1,
                      column: 52
                    }
                  }
                }
              ],
              start: 26,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 52
                }
              }
            }
          ],
          start: 13,
          end: 55,
          loc: {
            start: {
              line: 1,
              column: 13
            },
            end: {
              line: 1,
              column: 55
            }
          }
        }
      ],
      start: 0,
      end: 55,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 55
        }
      }
    }
  ],
  [
    `{ let f = 123; { function f() {  } } }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 123,
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
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  start: 6,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                }
              ],
              start: 2,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 30,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
                    start: 26,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  },
                  start: 17,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                }
              ],
              start: 15,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            }
          ],
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
          }
        }
      ],
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
      }
    }
  ],
  [
    `{ function f() { a = f; f = 123; b = f; return x; } }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
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
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'f',
                        start: 21,
                        end: 22,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 22
                          }
                        }
                      },
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
                    start: 17,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'f',
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
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 123,
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
                      start: 24,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    start: 24,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'b',
                        start: 33,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 33
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'f',
                        start: 37,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 37
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        }
                      },
                      start: 33,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 33,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  {
                    type: 'ReturnStatement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 47,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    start: 40,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  }
                ],
                start: 15,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 51,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 51
                }
              }
            }
          ],
          start: 0,
          end: 53,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 53
            }
          }
        }
      ],
      start: 0,
      end: 53,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 53
        }
      }
    }
  ],
  [
    `function x() { { var f; var f } }`,
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
                type: 'BlockStatement',
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
                          name: 'f',
                          start: 21,
                          end: 22,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 22
                            }
                          }
                        },
                        start: 21,
                        end: 22,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 22
                          }
                        }
                      }
                    ],
                    start: 17,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 23
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
                          name: 'f',
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
                      }
                    ],
                    start: 24,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  }
                ],
                start: 15,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              }
            ],
            start: 13,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 33
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
    `{ { var f; } var f }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'BlockStatement',
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
                        name: 'f',
                        start: 8,
                        end: 9,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 9
                          }
                        }
                      },
                      start: 8,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      }
                    }
                  ],
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
                  }
                }
              ],
              start: 2,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 12
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
                }
              ],
              start: 13,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 18
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
    `{ function f() {} async function* f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 38,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 38
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 34,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 34
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 18,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            }
          ],
          start: 0,
          end: 42,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 42
            }
          }
        }
      ],
      start: 0,
      end: 42,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 42
        }
      }
    }
  ],
  [
    `{ function f() {} ; function f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 2,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            {
              type: 'EmptyStatement',
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
              }
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 33,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 33
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 29,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              start: 20,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 35
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
              line: 1,
              column: 37
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
          line: 1,
          column: 37
        }
      }
    }
  ],
  [
    `{ if (x) function f() {} ; function f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'IfStatement',
              test: {
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
              consequent: {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [],
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                  }
                },
                start: 9,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              alternate: null,
              start: 2,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            {
              type: 'EmptyStatement',
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
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 40,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 40
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 36,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 36
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                }
              },
              start: 27,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 27
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            }
          ],
          start: 0,
          end: 44,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 44
            }
          }
        }
      ],
      start: 0,
      end: 44,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 44
        }
      }
    }
  ],
  [
    `{ async function f(){} } async function f(){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 20,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              async: true,
              generator: false,
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
              start: 2,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 22
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
        },
        {
          type: 'FunctionDeclaration',
          params: [],
          body: {
            type: 'BlockStatement',
            body: [],
            start: 43,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 43
              },
              end: {
                line: 1,
                column: 45
              }
            }
          },
          async: true,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'f',
            start: 40,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 40
              },
              end: {
                line: 1,
                column: 41
              }
            }
          },
          start: 25,
          end: 45,
          loc: {
            start: {
              line: 1,
              column: 25
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
    `{ let foo = 1; { let foo = 2; } }
    { let foo = 1; { let foo = 2; } }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1,
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
                  id: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 6,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  },
                  start: 6,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                }
              ],
              start: 2,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 2,
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
                      id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 21,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      start: 21,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    }
                  ],
                  start: 17,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
              start: 15,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 31
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
        },
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 1,
                    start: 50,
                    end: 51,
                    loc: {
                      start: {
                        line: 2,
                        column: 16
                      },
                      end: {
                        line: 2,
                        column: 17
                      }
                    }
                  },
                  id: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 44,
                    end: 47,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 2,
                        column: 13
                      }
                    }
                  },
                  start: 44,
                  end: 51,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 2,
                      column: 17
                    }
                  }
                }
              ],
              start: 40,
              end: 52,
              loc: {
                start: {
                  line: 2,
                  column: 6
                },
                end: {
                  line: 2,
                  column: 18
                }
              }
            },
            {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 2,
                        start: 65,
                        end: 66,
                        loc: {
                          start: {
                            line: 2,
                            column: 31
                          },
                          end: {
                            line: 2,
                            column: 32
                          }
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 59,
                        end: 62,
                        loc: {
                          start: {
                            line: 2,
                            column: 25
                          },
                          end: {
                            line: 2,
                            column: 28
                          }
                        }
                      },
                      start: 59,
                      end: 66,
                      loc: {
                        start: {
                          line: 2,
                          column: 25
                        },
                        end: {
                          line: 2,
                          column: 32
                        }
                      }
                    }
                  ],
                  start: 55,
                  end: 67,
                  loc: {
                    start: {
                      line: 2,
                      column: 21
                    },
                    end: {
                      line: 2,
                      column: 33
                    }
                  }
                }
              ],
              start: 53,
              end: 69,
              loc: {
                start: {
                  line: 2,
                  column: 19
                },
                end: {
                  line: 2,
                  column: 35
                }
              }
            }
          ],
          start: 38,
          end: 71,
          loc: {
            start: {
              line: 2,
              column: 4
            },
            end: {
              line: 2,
              column: 37
            }
          }
        }
      ],
      start: 0,
      end: 71,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 2,
          column: 37
        }
      }
    }
  ],
  [
    `{ let f = 123; if (false) ; else function f() {  } }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 123,
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
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  start: 6,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                }
              ],
              start: 2,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            {
              type: 'IfStatement',
              test: {
                type: 'Literal',
                value: false,
                start: 19,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              consequent: {
                type: 'EmptyStatement',
                start: 26,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              alternate: {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 46,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 46
                    },
                    end: {
                      line: 1,
                      column: 50
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
                  start: 42,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  }
                },
                start: 33,
                end: 50,
                loc: {
                  start: {
                    line: 1,
                    column: 33
                  },
                  end: {
                    line: 1,
                    column: 50
                  }
                }
              },
              start: 15,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            }
          ],
          start: 0,
          end: 52,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 52
            }
          }
        }
      ],
      start: 0,
      end: 52,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 52
        }
      }
    }
  ],
  [
    `{ let x; } var x`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
                }
              ],
              start: 2,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            }
          ],
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
            }
          ],
          start: 11,
          end: 16,
          loc: {
            start: {
              line: 1,
              column: 11
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
    `{ var f; var f; }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
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
                    name: 'f',
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
                }
              ],
              start: 2,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 8
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
                    name: 'f',
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
                }
              ],
              start: 9,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 15
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
    `{ function a(){} function a(){} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'a',
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
              start: 2,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 29,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'a',
                start: 26,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              start: 17,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 31
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
    `{ function* f() {} async function f() {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 16,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
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
            },
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 38,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 38
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'f',
                start: 34,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 34
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 19,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            }
          ],
          start: 0,
          end: 42,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 42
            }
          }
        }
      ],
      start: 0,
      end: 42,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 42
        }
      }
    }
  ],
  [
    `try { throw null; } catch (f) { if (false) ; else function f() { return 123; } }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'TryStatement',
          block: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ThrowStatement',
                argument: {
                  type: 'Literal',
                  value: null,
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
            start: 4,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 4
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
              name: 'f',
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
              body: [
                {
                  type: 'IfStatement',
                  test: {
                    type: 'Literal',
                    value: false,
                    start: 36,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  consequent: {
                    type: 'EmptyStatement',
                    start: 43,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 43
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  alternate: {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'Literal',
                            value: 123,
                            start: 72,
                            end: 75,
                            loc: {
                              start: {
                                line: 1,
                                column: 72
                              },
                              end: {
                                line: 1,
                                column: 75
                              }
                            }
                          },
                          start: 65,
                          end: 76,
                          loc: {
                            start: {
                              line: 1,
                              column: 65
                            },
                            end: {
                              line: 1,
                              column: 76
                            }
                          }
                        }
                      ],
                      start: 63,
                      end: 78,
                      loc: {
                        start: {
                          line: 1,
                          column: 63
                        },
                        end: {
                          line: 1,
                          column: 78
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 59,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 59
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      }
                    },
                    start: 50,
                    end: 78,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 78
                      }
                    }
                  },
                  start: 32,
                  end: 78,
                  loc: {
                    start: {
                      line: 1,
                      column: 32
                    },
                    end: {
                      line: 1,
                      column: 78
                    }
                  }
                }
              ],
              start: 30,
              end: 80,
              loc: {
                start: {
                  line: 1,
                  column: 30
                },
                end: {
                  line: 1,
                  column: 80
                }
              }
            },
            start: 20,
            end: 80,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 80
              }
            }
          },
          finalizer: null,
          start: 0,
          end: 80,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 80
            }
          }
        }
      ],
      start: 0,
      end: 80,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 80
        }
      }
    }
  ],
  [
    `{}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [],
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
        }
      ],
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
    }
  ],
  [
    `{}
      /foo/`,
    Context.OptionsLoc,
    {
      body: [
        {
          body: [],
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
          },
          start: 0,
          type: 'BlockStatement'
        },
        {
          end: 14,
          expression: {
            end: 14,
            loc: {
              end: {
                column: 11,
                line: 2
              },
              start: {
                column: 6,
                line: 2
              }
            },
            regex: {
              flags: '',
              pattern: 'foo'
            },
            start: 9,
            type: 'Literal',
            value: /foo/
          },
          loc: {
            end: {
              column: 11,
              line: 2
            },
            start: {
              column: 6,
              line: 2
            }
          },
          start: 9,
          type: 'ExpressionStatement'
        }
      ],
      end: 14,
      loc: {
        end: {
          column: 11,
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
    `{ let x }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
                }
              ],
              start: 2,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            }
          ],
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
        }
      ],
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
    }
  ],
  [
    `{debugger;}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'DebuggerStatement',
              start: 1,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            }
          ],
          start: 0,
          end: 11,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 11
            }
          }
        }
      ],
      start: 0,
      end: 11,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11
        }
      }
    }
  ],
  /* [
      `{\u2000\u2006\ufeff\u3000\u3000\u3000\u3000\u205f;  \n}`,
      Context.OptionsLoc,
      {
        body: [
          {
            body: [
              {
                end: 10,
                loc: {
                  end: {
                    column: 10,
                    line: 1
                  },
                  start: {
                    column: 9,
                    line: 1
                  }
                },
                start: 9,
                type: 'EmptyStatement'
              }
            ],
            end: 14,
            loc: {
              end: {
                column: 1,
                line: 2
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'BlockStatement'
          }
        ],
        end: 14,
        loc: {
          end: {
            column: 1,
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
    ],*/
  [
    `{a}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'a',
                start: 1,
                end: 2,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 2
                  }
                }
              },
              start: 1,
              end: 2,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 2
                }
              }
            }
          ],
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
        }
      ],
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
    }
  ]
]);
