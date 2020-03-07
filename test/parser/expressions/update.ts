import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Expressions - Update (fail)', [
  ['foo\n++', Context.Empty],
  ['if (foo\n++);', Context.Empty],
  ['++[]', Context.Empty],
  ['++([])', Context.Empty],
  ['(++[])', Context.Empty],
  ['++[a]', Context.Empty],
  ['[a]++', Context.Empty],
  ['[]++', Context.Empty]
]);

pass('Expressions - Update', [
  [
    `delete.500`,
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
              type: 'Literal',
              value: 0.5,
              start: 6,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            prefix: true,
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
    `delete.500.foo`,
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
              object: {
                type: 'Literal',
                value: 0.5,
                start: 6,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo',
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
              start: 6,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 6
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
    `throw.500`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ThrowStatement',
          argument: {
            type: 'Literal',
            value: 0.5,
            start: 5,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `foo\n++\nbar`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          end: 3,
          expression: {
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
            },
            name: 'foo',
            start: 0,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 3,
              line: 1
            },
            start: {
              column: 0,
              line: 1
            }
          },
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 10,
          expression: {
            argument: {
              end: 10,
              loc: {
                end: {
                  column: 3,
                  line: 3
                },
                start: {
                  column: 0,
                  line: 3
                }
              },
              name: 'bar',
              start: 7,
              type: 'Identifier'
            },
            end: 10,
            loc: {
              end: {
                column: 3,
                line: 3
              },
              start: {
                column: 0,
                line: 2
              }
            },
            operator: '++',
            prefix: true,
            start: 4,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 3,
              line: 3
            },
            start: {
              column: 0,
              line: 2
            }
          },
          start: 4,
          type: 'ExpressionStatement'
        }
      ],
      end: 10,
      loc: {
        end: {
          column: 3,
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
    `+a++ / 1`,
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
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'UpdateExpression',
                argument: {
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
                operator: '++',
                prefix: false,
                start: 1,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                }
              },
              prefix: true,
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
              }
            },
            right: {
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
            operator: '/',
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
            }
          },
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
          }
        }
      ],
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
      }
    }
  ],
  [
    `a++\nb`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          end: 3,
          expression: {
            argument: {
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
            },
            operator: '++',
            prefix: false,
            start: 0,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 3,
              line: 1
            },
            start: {
              column: 0,
              line: 1
            }
          },
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 5,
          expression: {
            end: 5,
            loc: {
              end: {
                column: 1,
                line: 2
              },
              start: {
                column: 0,
                line: 2
              }
            },
            name: 'b',
            start: 4,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 1,
              line: 2
            },
            start: {
              column: 0,
              line: 2
            }
          },
          start: 4,
          type: 'ExpressionStatement'
        }
      ],
      end: 5,
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
  ],
  [
    `a\n++\nb`,
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
        },
        {
          end: 6,
          expression: {
            argument: {
              end: 6,
              loc: {
                end: {
                  column: 1,
                  line: 3
                },
                start: {
                  column: 0,
                  line: 3
                }
              },
              name: 'b',
              start: 5,
              type: 'Identifier'
            },
            end: 6,
            loc: {
              end: {
                column: 1,
                line: 3
              },
              start: {
                column: 0,
                line: 2
              }
            },
            operator: '++',
            prefix: true,
            start: 2,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 1,
              line: 3
            },
            start: {
              column: 0,
              line: 2
            }
          },
          start: 2,
          type: 'ExpressionStatement'
        }
      ],
      end: 6,
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
    `++\nfoo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          end: 7,
          expression: {
            argument: {
              end: 6,
              loc: {
                end: {
                  column: 3,
                  line: 2
                },
                start: {
                  column: 0,
                  line: 2
                }
              },
              name: 'foo',
              start: 3,
              type: 'Identifier'
            },
            end: 6,
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
            operator: '++',
            prefix: true,
            start: 0,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 4,
              line: 2
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
      end: 7,
      loc: {
        end: {
          column: 4,
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
    `foo\n++bar`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          end: 3,
          expression: {
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
            },
            name: 'foo',
            start: 0,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 3,
              line: 1
            },
            start: {
              column: 0,
              line: 1
            }
          },
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 9,
          expression: {
            argument: {
              end: 9,
              loc: {
                end: {
                  column: 5,
                  line: 2
                },
                start: {
                  column: 2,
                  line: 2
                }
              },
              name: 'bar',
              start: 6,
              type: 'Identifier'
            },
            end: 9,
            loc: {
              end: {
                column: 5,
                line: 2
              },
              start: {
                column: 0,
                line: 2
              }
            },
            operator: '++',
            prefix: true,
            start: 4,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 5,
              line: 2
            },
            start: {
              column: 0,
              line: 2
            }
          },
          start: 4,
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
    `+a++ / 1`,
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
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'UpdateExpression',
                argument: {
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
                operator: '++',
                prefix: false,
                start: 1,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                }
              },
              prefix: true,
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
              }
            },
            right: {
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
            operator: '/',
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
            }
          },
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
          }
        }
      ],
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
      }
    }
  ],
  [
    `a=b\n++c`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          end: 3,
          expression: {
            end: 3,
            left: {
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
                column: 3,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            operator: '=',
            right: {
              end: 3,
              loc: {
                end: {
                  column: 3,
                  line: 1
                },
                start: {
                  column: 2,
                  line: 1
                }
              },
              name: 'b',
              start: 2,
              type: 'Identifier'
            },
            start: 0,
            type: 'AssignmentExpression'
          },
          loc: {
            end: {
              column: 3,
              line: 1
            },
            start: {
              column: 0,
              line: 1
            }
          },
          start: 0,
          type: 'ExpressionStatement'
        },
        {
          end: 7,
          expression: {
            argument: {
              end: 7,
              loc: {
                end: {
                  column: 3,
                  line: 2
                },
                start: {
                  column: 2,
                  line: 2
                }
              },
              name: 'c',
              start: 6,
              type: 'Identifier'
            },
            end: 7,
            loc: {
              end: {
                column: 3,
                line: 2
              },
              start: {
                column: 0,
                line: 2
              }
            },
            operator: '++',
            prefix: true,
            start: 4,
            type: 'UpdateExpression'
          },
          loc: {
            end: {
              column: 3,
              line: 2
            },
            start: {
              column: 0,
              line: 2
            }
          },
          start: 4,
          type: 'ExpressionStatement'
        }
      ],
      end: 7,
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
    `a.a--`,
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

              object: {
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
            operator: '--',
            prefix: false,
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
        }
      ],
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
    }
  ],
  [
    `++a.a`,
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

              object: {
                type: 'Identifier',
                name: 'a',
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
              computed: false,
              property: {
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
            operator: '++',
            prefix: true,
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
        }
      ],
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
    }
  ],
  [
    `bar++`,
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
              type: 'Identifier',
              name: 'bar',
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
            operator: '++',
            prefix: false,
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
        }
      ],
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
    }
  ],
  [
    `a++ / 1`,
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
              type: 'UpdateExpression',
              argument: {
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
              operator: '++',
              prefix: false,
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
            right: {
              type: 'Literal',
              value: 1,
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
            operator: '/',
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
  ]
]);
