import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - New', () => {
  for (const arg of [
    'function *f(){ new yield x }',
    'new ()=>{}',
    'new.abc',
    'while (0) { new.target }',
    'do { new.target } while (0)',
    'new new .target',
    // 'function f(x=() => new."target") {}',
    'new.target',
    'function f(){ new.foo }',
    '_ => new.target',
    '(f=new.target) => {}',
    `new await foo;`,
    `() => new.target`,
    'function *f(){ new yield }',
    'new async => x',
    'delete async() => foo',
    'delete () => foo',
    '_ => _ => _ => _ => new.target',
    '_ => new.target',
    'new.target',
    'function d(){new.',
    '0 ?? 1 && 2'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `function f() {class C {get x() { do { new.target } while (0) }}}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ClassDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'C',
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
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    body: [
                      {
                        type: 'MethodDefinition',
                        kind: 'get',
                        static: false,
                        computed: false,
                        key: {
                          type: 'Identifier',
                          name: 'x',
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
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'DoWhileStatement',
                                body: {
                                  type: 'BlockStatement',
                                  body: [
                                    {
                                      type: 'ExpressionStatement',
                                      expression: {
                                        type: 'MetaProperty',
                                        meta: {
                                          type: 'Identifier',
                                          name: 'new',
                                          start: 38,
                                          end: 42,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 38
                                            },
                                            end: {
                                              line: 1,
                                              column: 42
                                            }
                                          }
                                        },
                                        property: {
                                          type: 'Identifier',
                                          name: 'target',
                                          start: 42,
                                          end: 48,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 42
                                            },
                                            end: {
                                              line: 1,
                                              column: 48
                                            }
                                          }
                                        },
                                        start: 38,
                                        end: 48,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 38
                                          },
                                          end: {
                                            line: 1,
                                            column: 48
                                          }
                                        }
                                      },
                                      start: 38,
                                      end: 48,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 38
                                        },
                                        end: {
                                          line: 1,
                                          column: 48
                                        }
                                      }
                                    }
                                  ],
                                  start: 36,
                                  end: 50,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 36
                                    },
                                    end: {
                                      line: 1,
                                      column: 50
                                    }
                                  }
                                },
                                start: 33,
                                test: {
                                  type: 'Literal',
                                  value: 0,
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
                                },
                                end: 60,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 33
                                  },
                                  end: {
                                    line: 1,
                                    column: 60
                                  }
                                }
                              }
                            ],
                            start: 31,
                            end: 62,
                            loc: {
                              start: {
                                line: 1,
                                column: 31
                              },
                              end: {
                                line: 1,
                                column: 62
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: null,
                          start: 28,
                          end: 62,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 62
                            }
                          }
                        },
                        start: 23,
                        end: 62,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 62
                          }
                        }
                      }
                    ],
                    start: 22,
                    end: 63,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 63
                      }
                    }
                  },
                  start: 14,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  }
                }
              ],
              start: 13,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 64
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
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 64
              }
            }
          }
        ],
        start: 0,
        end: 64,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 64
          }
        }
      }
    ],
    [
      `function f() {do { new.target } while (0)}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'DoWhileStatement',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'MetaProperty',
                          meta: {
                            type: 'Identifier',
                            name: 'new',
                            start: 19,
                            end: 23,
                            loc: {
                              start: {
                                line: 1,
                                column: 19
                              },
                              end: {
                                line: 1,
                                column: 23
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'target',
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
                  },
                  start: 14,
                  test: {
                    type: 'Literal',
                    value: 0,
                    start: 39,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 39
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                }
              ],
              start: 13,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `function f() {{ new.target }}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new',
                          start: 16,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'target',
                          start: 20,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 16,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      },
                      start: 16,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    }
                  ],
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
      `var f = function() {function a(b = new.target){}}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'FunctionDeclaration',
                        params: [
                          {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 'b',
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
                            right: {
                              type: 'MetaProperty',
                              meta: {
                                type: 'Identifier',
                                name: 'new',
                                start: 35,
                                end: 39,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 35
                                  },
                                  end: {
                                    line: 1,
                                    column: 39
                                  }
                                }
                              },
                              property: {
                                type: 'Identifier',
                                name: 'target',
                                start: 39,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 39
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                }
                              },
                              start: 35,
                              end: 45,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 45
                                }
                              }
                            },
                            start: 31,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 31
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            }
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          body: [],
                          start: 46,
                          end: 48,
                          loc: {
                            start: {
                              line: 1,
                              column: 46
                            },
                            end: {
                              line: 1,
                              column: 48
                            }
                          }
                        },
                        async: false,
                        generator: false,
                        id: {
                          type: 'Identifier',
                          name: 'a',
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
                        end: 48,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 48
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: null,
                  start: 8,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 49
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
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `var f = function() {({ set a(b = new.target){} })}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'a',
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
                                type: 'FunctionExpression',
                                params: [
                                  {
                                    type: 'AssignmentPattern',
                                    left: {
                                      type: 'Identifier',
                                      name: 'b',
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
                                    right: {
                                      type: 'MetaProperty',
                                      meta: {
                                        type: 'Identifier',
                                        name: 'new',
                                        start: 33,
                                        end: 37,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 33
                                          },
                                          end: {
                                            line: 1,
                                            column: 37
                                          }
                                        }
                                      },
                                      property: {
                                        type: 'Identifier',
                                        name: 'target',
                                        start: 37,
                                        end: 43,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 37
                                          },
                                          end: {
                                            line: 1,
                                            column: 43
                                          }
                                        }
                                      },
                                      start: 33,
                                      end: 43,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 33
                                        },
                                        end: {
                                          line: 1,
                                          column: 43
                                        }
                                      }
                                    },
                                    start: 29,
                                    end: 43,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 29
                                      },
                                      end: {
                                        line: 1,
                                        column: 43
                                      }
                                    }
                                  }
                                ],
                                body: {
                                  type: 'BlockStatement',
                                  body: [],
                                  start: 44,
                                  end: 46,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 44
                                    },
                                    end: {
                                      line: 1,
                                      column: 46
                                    }
                                  }
                                },
                                async: false,
                                generator: false,
                                id: null,
                                start: 28,
                                end: 46,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 46
                                  }
                                }
                              },
                              kind: 'set',
                              computed: false,
                              method: false,
                              shorthand: false,
                              start: 23,
                              end: 46,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 23
                                },
                                end: {
                                  line: 1,
                                  column: 46
                                }
                              }
                            }
                          ],
                          start: 21,
                          end: 48,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 48
                            }
                          }
                        },
                        start: 20,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 49
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: null,
                  start: 8,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 50
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
                end: 50,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `({m: function() {function f() { new.target(); }}})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'm',
                    start: 2,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 2
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
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
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'MetaProperty',
                                    meta: {
                                      type: 'Identifier',
                                      name: 'new',
                                      start: 32,
                                      end: 36,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 32
                                        },
                                        end: {
                                          line: 1,
                                          column: 36
                                        }
                                      }
                                    },
                                    property: {
                                      type: 'Identifier',
                                      name: 'target',
                                      start: 36,
                                      end: 42,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 36
                                        },
                                        end: {
                                          line: 1,
                                          column: 42
                                        }
                                      }
                                    },
                                    start: 32,
                                    end: 42,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 32
                                      },
                                      end: {
                                        line: 1,
                                        column: 42
                                      }
                                    }
                                  },
                                  arguments: [],
                                  optional: false,
                                  shortCircuited: false,
                                  start: 32,
                                  end: 44,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 32
                                    },
                                    end: {
                                      line: 1,
                                      column: 44
                                    }
                                  }
                                },
                                start: 32,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 32
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                }
                              }
                            ],
                            start: 30,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
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
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          }
                        }
                      ],
                      start: 16,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 5,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 2,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              start: 1,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 49
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
      `({set x(_) {while (0) { new.target }}})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: '_',
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
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'WhileStatement',
                          test: {
                            type: 'Literal',
                            value: 0,
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
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'MetaProperty',
                                  meta: {
                                    type: 'Identifier',
                                    name: 'new',
                                    start: 24,
                                    end: 28,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 24
                                      },
                                      end: {
                                        line: 1,
                                        column: 28
                                      }
                                    }
                                  },
                                  property: {
                                    type: 'Identifier',
                                    name: 'target',
                                    start: 28,
                                    end: 34,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 28
                                      },
                                      end: {
                                        line: 1,
                                        column: 34
                                      }
                                    }
                                  },
                                  start: 24,
                                  end: 34,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 24
                                    },
                                    end: {
                                      line: 1,
                                      column: 34
                                    }
                                  }
                                },
                                start: 24,
                                end: 34,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 24
                                  },
                                  end: {
                                    line: 1,
                                    column: 34
                                  }
                                }
                              }
                            ],
                            start: 22,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 22
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            }
                          },
                          start: 12,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 12
                            },
                            end: {
                              line: 1,
                              column: 36
                            }
                          }
                        }
                      ],
                      start: 11,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 7,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  kind: 'set',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 2,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 1,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
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
      `function f(){ new new .target; }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'NewExpression',
                    callee: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
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
                      property: {
                        type: 'Identifier',
                        name: 'target',
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
                      start: 18,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    arguments: [],
                    start: 14,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
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
              start: 12,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 32
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
      `function f(){ new . target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new',
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
                    },
                    property: {
                      type: 'Identifier',
                      name: 'target',
                      start: 20,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    start: 14,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  start: 14,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                }
              ],
              start: 12,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 28
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
    ],
    [
      `function f(){ _ => _ => new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new',
                          start: 24,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'target',
                          start: 28,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        start: 24,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: '_',
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
                        }
                      ],
                      async: false,
                      expression: true,
                      start: 19,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: '_',
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
                      }
                    ],
                    async: false,
                    expression: true,
                    start: 14,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
                  start: 14,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                }
              ],
              start: 12,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 36
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
      `_ => function(){ new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new',
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
                        property: {
                          type: 'Identifier',
                          name: 'target',
                          start: 21,
                          end: 27,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 27
                            }
                          }
                        },
                        start: 17,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      },
                      start: 17,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    }
                  ],
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
                },
                async: false,
                generator: false,
                id: null,
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
              params: [
                {
                  type: 'Identifier',
                  name: '_',
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
                }
              ],
              async: false,
              expression: true,
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
      `function f(){ foo + new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
                        start: 20,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
                        start: 24,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
                    operator: '+',
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
                  },
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
              start: 12,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 32
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
      `function f(){ foo = new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
                        start: 20,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
                        start: 24,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
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
                  },
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
              start: 12,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 32
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
      `({foo(x=new.target){}})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'foo',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'MetaProperty',
                          meta: {
                            type: 'Identifier',
                            name: 'new',
                            start: 8,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'target',
                            start: 12,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 12
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            }
                          },
                          start: 8,
                          end: 18,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 18
                            }
                          }
                        },
                        start: 6,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: false,
                    generator: false,
                    id: null,
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
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 2,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 1,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
          }
        ],
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
      }
    ],
    [
      `new x
    /y`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'NewExpression',
                callee: {
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
                arguments: [],
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
                }
              },
              right: {
                type: 'Identifier',
                name: 'y',
                start: 11,
                end: 12,
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
              operator: '/',
              start: 0,
              end: 12,
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
            },
            start: 0,
            end: 12,
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
        end: 12,
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
      `f(new /z/)`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'NewExpression',
                  callee: {
                    type: 'Literal',
                    value: /z/,
                    regex: {
                      pattern: 'z',
                      flags: ''
                    },
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
                  arguments: [],
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      }
    ],
    [
      `f(new /z/())`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'NewExpression',
                  callee: {
                    type: 'Literal',
                    value: /z/,
                    regex: {
                      pattern: 'z',
                      flags: ''
                    },
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
                  arguments: [],
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `f(new /z/.foo)`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'NewExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: /z/,
                      regex: {
                        pattern: 'z',
                        flags: ''
                      },
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'foo',
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
                    optional: false,
                    shortCircuited: false,
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
                  },
                  arguments: [],
                  start: 2,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `new arguments`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'arguments',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              arguments: [],
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
      }
    ],
    [
      `new await()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'await',
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
              arguments: [],
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
            },
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
    [
      `new yield()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'yield',
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
              arguments: [],
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
            },
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
    [
      `new Foo["bar"](X, Y, Z)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'Foo',
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
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'bar',
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
                },
                optional: false,
                shortCircuited: false,
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
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X',
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
                {
                  type: 'Identifier',
                  name: 'Y',
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
                  type: 'Identifier',
                  name: 'Z',
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
          }
        ],
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
      }
    ],
    [
      `delete async(x);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async',
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
                arguments: [
                  {
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
                  }
                ],
                optional: false,
                shortCircuited: false,
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
              prefix: true,
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
      `function f(){ _ => _ => new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new',
                          start: 24,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        property: {
                          type: 'Identifier',
                          name: 'target',
                          start: 28,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        start: 24,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: '_',
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
                        }
                      ],
                      async: false,
                      expression: true,
                      start: 19,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: '_',
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
                      }
                    ],
                    async: false,
                    expression: true,
                    start: 14,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
                  start: 14,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                }
              ],
              start: 12,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 36
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
      `function f(){ x({[new.target]:y}) }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'x',
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
                    arguments: [
                      {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'MetaProperty',
                              meta: {
                                type: 'Identifier',
                                name: 'new',
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
                              property: {
                                type: 'Identifier',
                                name: 'target',
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
                            },
                            value: {
                              type: 'Identifier',
                              name: 'y',
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
                            kind: 'init',
                            computed: true,
                            method: false,
                            shorthand: false,
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
                        start: 16,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 14,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  start: 14,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 12,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 12
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
      `function f(){ class x extends new.target {} }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ClassDeclaration',
                  id: {
                    type: 'Identifier',
                    name: 'x',
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
                  superClass: {
                    type: 'MetaProperty',
                    meta: {
                      type: 'Identifier',
                      name: 'new',
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
                    property: {
                      type: 'Identifier',
                      name: 'target',
                      start: 34,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    start: 30,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  body: {
                    type: 'ClassBody',
                    body: [],
                    start: 41,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  start: 14,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 43
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
      `function f(){ foo = new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
                        start: 20,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
                        start: 24,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
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
                  },
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
              start: 12,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 32
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
      `function f(){ foo + new.target }`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
                        start: 20,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
                        start: 24,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
                    operator: '+',
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
                  },
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
              start: 12,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 32
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
      `class A {static a(x=new.target){}}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'A',
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
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'a',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x',
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
                        right: {
                          type: 'MetaProperty',
                          meta: {
                            type: 'Identifier',
                            name: 'new',
                            start: 20,
                            end: 24,
                            loc: {
                              start: {
                                line: 1,
                                column: 20
                              },
                              end: {
                                line: 1,
                                column: 24
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'target',
                            start: 24,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 24
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          },
                          start: 20,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        start: 18,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
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
                    id: null,
                    start: 17,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  start: 9,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 8,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 34
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
      `foo(function f(f=new.target){})`,
      Context.OptionsNext | Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'f',
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
                      right: {
                        type: 'MetaProperty',
                        meta: {
                          type: 'Identifier',
                          name: 'new',
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
                        property: {
                          type: 'Identifier',
                          name: 'target',
                          start: 21,
                          end: 27,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 27
                            }
                          }
                        },
                        start: 17,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      },
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
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 28,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  async: false,
                  generator: false,
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
                  start: 4,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
              start: 0,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `({foo(x=new.target){}})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'foo',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'MetaProperty',
                          meta: {
                            type: 'Identifier',
                            name: 'new',
                            start: 8,
                            end: 12,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 12
                              }
                            }
                          },
                          property: {
                            type: 'Identifier',
                            name: 'target',
                            start: 12,
                            end: 18,
                            loc: {
                              start: {
                                line: 1,
                                column: 12
                              },
                              end: {
                                line: 1,
                                column: 18
                              }
                            }
                          },
                          start: 8,
                          end: 18,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 18
                            }
                          }
                        },
                        start: 6,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: false,
                    generator: false,
                    id: null,
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
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 2,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 1,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
          }
        ],
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
      }
    ],
    [
      `foo({bar(){ new.target }})`,
      Context.OptionsNext | Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar',
                        start: 5,
                        end: 8,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 8
                          }
                        }
                      },
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'MetaProperty',
                                meta: {
                                  type: 'Identifier',
                                  name: 'new',
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
                                property: {
                                  type: 'Identifier',
                                  name: 'target',
                                  start: 16,
                                  end: 22,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 16
                                    },
                                    end: {
                                      line: 1,
                                      column: 22
                                    }
                                  }
                                },
                                start: 12,
                                end: 22,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 12
                                  },
                                  end: {
                                    line: 1,
                                    column: 22
                                  }
                                }
                              },
                              start: 12,
                              end: 22,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 12
                                },
                                end: {
                                  line: 1,
                                  column: 22
                                }
                              }
                            }
                          ],
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
                        async: false,
                        generator: false,
                        id: null,
                        start: 8,
                        end: 24,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 24
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
                      start: 5,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      }
                    }
                  ],
                  start: 4,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
              }
            },
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
            }
          }
        ],
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
        }
      }
    ],
    [
      `class X { foo() { new.target }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'X',
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
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'foo',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MetaProperty',
                            meta: {
                              type: 'Identifier',
                              name: 'new',
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
                            property: {
                              type: 'Identifier',
                              name: 'target',
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
                    async: false,
                    generator: false,
                    id: null,
                    start: 13,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
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
                }
              ],
              start: 8,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `new async()().b.c[d];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              optional: false,
              shortCircuited: false,
              object: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'CallExpression',
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'async',
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
                      arguments: [],
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
                    },
                    arguments: [],
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
                    name: 'b',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'c',
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
              computed: true,
              property: {
                type: 'Identifier',
                name: 'd',
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
      `new (b());`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
                callee: {
                  type: 'Identifier',
                  name: 'b',
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
                },
                arguments: [],
                start: 5,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              arguments: [],
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
      }
    ],
    [
      `new async / b`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async',
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
                arguments: [],
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
              right: {
                type: 'Identifier',
                name: 'b',
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
              operator: '/',
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
      }
    ],
    [
      `new async / await(foo, async)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async',
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
                arguments: [],
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
              right: {
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
                callee: {
                  type: 'Identifier',
                  name: 'await',
                  start: 12,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'foo',
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
                    }
                  },
                  {
                    type: 'Identifier',
                    name: 'async',
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
                  }
                ],
                start: 12,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              operator: '/',
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
      `new async / await(foo, async)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async',
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
                arguments: [],
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
              right: {
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
                callee: {
                  type: 'Identifier',
                  name: 'await',
                  start: 12,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                },
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'foo',
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
                    }
                  },
                  {
                    type: 'Identifier',
                    name: 'async',
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
                  }
                ],
                start: 12,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              operator: '/',
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
      `new (!0)();`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'UnaryExpression',
                operator: '!',
                argument: {
                  type: 'Literal',
                  value: 0,
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
                prefix: true,
                start: 5,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              arguments: [],
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
    [
      `new await()()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'await',
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
                arguments: [],
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
              },
              arguments: [],
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
      }
    ],
    [
      `new foo()();`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'NewExpression',
                callee: {
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
                arguments: [],
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
              arguments: [],
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
            },
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
      `new (foo)();`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 5,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              arguments: [],
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
            },
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
      `new a ? b : c`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'a',
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
                arguments: [],
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
                }
              },
              consequent: {
                type: 'Identifier',
                name: 'b',
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
              alternate: {
                type: 'Identifier',
                name: 'c',
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
      }
    ],
    [
      `new Foo`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'Foo',
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
              arguments: [],
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
            },
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
      `new Foo.Bar`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'Foo',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar',
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
              },
              arguments: [],
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
            },
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
    [
      `new a.b.c.d`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
                    object: {
                      type: 'Identifier',
                      name: 'a',
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b',
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'c',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd',
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
              },
              arguments: [],
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
            },
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
    [
      `new async(x)(y)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'async',
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
                arguments: [
                  {
                    type: 'Identifier',
                    name: 'x',
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
              arguments: [
                {
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
      `new Foo["bar"]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'Foo',
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
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'bar',
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
                },
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
                }
              },
              arguments: [],
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
      `new Foo.Bar(X)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'Foo',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar',
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
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X',
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
      `new Foo(X, Y, Z)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'Foo',
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X',
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
                {
                  type: 'Identifier',
                  name: 'Y',
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
                {
                  type: 'Identifier',
                  name: 'Z',
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
      `new Foo.Bar(X, Y, Z)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'Foo',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'Bar',
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
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'X',
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
                {
                  type: 'Identifier',
                  name: 'Y',
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
                {
                  type: 'Identifier',
                  name: 'Z',
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
      `new x().y`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              optional: false,
              shortCircuited: false,
              object: {
                type: 'NewExpression',
                callee: {
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
                arguments: [],
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
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'y',
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
      `new x()[y]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              optional: false,
              shortCircuited: false,
              object: {
                type: 'NewExpression',
                callee: {
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
                arguments: [],
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
              },
              computed: true,
              property: {
                type: 'Identifier',
                name: 'y',
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
      }
    ],
    [
      `new a.b.c.d()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
                    object: {
                      type: 'Identifier',
                      name: 'a',
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b',
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'c',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd',
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
              },
              arguments: [],
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
      }
    ],
    [
      `new x().y++`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'NewExpression',
                  callee: {
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
                  arguments: [],
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
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y',
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
              operator: '++',
              prefix: false,
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
            },
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
    [
      `delete new x()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x',
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
                arguments: [],
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
              prefix: true,
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
      `delete new x().y`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'x',
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
                  arguments: [],
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y',
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
                start: 7,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              prefix: true,
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
      `typeof new x()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'typeof',
              argument: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x',
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
                arguments: [],
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
              prefix: true,
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
      `new new A().foo`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'NewExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'A',
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
                  arguments: [],
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
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 4,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              arguments: [],
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
      `new "foo".__proto__.constructor`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'Literal',
                    value: 'foo',
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: '__proto__',
                    start: 10,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'constructor',
                  start: 20,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                },
                start: 4,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `new 1..__proto__.constructor`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'Literal',
                    value: 1,
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
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: '__proto__',
                    start: 7,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  },
                  start: 4,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
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
                  name: 'constructor',
                  start: 17,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                },
                start: 4,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              arguments: [],
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
    ],
    [
      `new 0x2.__proto__.constructor`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'Literal',
                    value: 2,
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: '__proto__',
                    start: 8,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  },
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'constructor',
                  start: 18,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 4,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              arguments: [],
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
      `new true.__proto__.constructor`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: '__proto__',
                    start: 9,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    }
                  },
                  start: 4,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'constructor',
                  start: 19,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                },
                start: 4,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              arguments: [],
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
      `new new x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'NewExpression',
                callee: {
                  type: 'Identifier',
                  name: 'x',
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
                arguments: [],
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
              arguments: [],
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
      `[...new A()]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'NewExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'A',
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
                    arguments: [],
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
                  },
                  start: 1,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
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
      `class x extends new A() {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'A',
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
              arguments: [],
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
            body: {
              type: 'ClassBody',
              body: [],
              start: 24,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 24
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
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
            }
          }
        ],
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
        }
      }
    ],
    [
      `x({[new A()]:y})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'NewExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'A',
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
                        arguments: [],
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
                      },
                      value: {
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
                      kind: 'init',
                      computed: true,
                      method: false,
                      shorthand: false,
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
      `f(new /z/())`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
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
                  type: 'NewExpression',
                  callee: {
                    type: 'Literal',
                    value: /z/,
                    regex: {
                      pattern: 'z',
                      flags: ''
                    },
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
                  arguments: [],
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
      `new async (x, y)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'async',
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                {
                  type: 'Identifier',
                  name: 'y',
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
      `new await`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'await',
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
              arguments: [],
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
      `new class{}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'ClassExpression',
                id: null,
                superClass: null,
                body: {
                  type: 'ClassBody',
                  body: [],
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
              },
              arguments: [],
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
            },
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
    [
      `new class extends x{}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'ClassExpression',
                id: null,
                superClass: {
                  type: 'Identifier',
                  name: 'x',
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
                body: {
                  type: 'ClassBody',
                  body: [],
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
                start: 4,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              arguments: [],
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
      `new eval()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'eval',
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
              arguments: [],
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
      }
    ],
    [
      `new function(){}(x)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'FunctionExpression',
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
                id: null,
                start: 4,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              arguments: [
                {
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
      `new let`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'Identifier',
                name: 'let',
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
              arguments: [],
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
            },
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
      `new a()().b.c[d];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              optional: false,
              shortCircuited: false,
              object: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'CallExpression',
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'NewExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'a',
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
                      arguments: [],
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
                    },
                    arguments: [],
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
                    name: 'b',
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
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'c',
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
              computed: true,
              property: {
                type: 'Identifier',
                name: 'd',
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
