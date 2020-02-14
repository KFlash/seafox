import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Expressions - Exponentiation (fail)', [
  ['delete O.p ** 10', Context.Empty],
  ['delete x ** 10', Context.Empty],
  ['**', Context.Empty],
  ['a **', Context.Empty],
  ['~O.p ** 10', Context.Empty],
  ['~x ** 10', Context.Empty],
  ['!O.p ** 10', Context.Empty],
  ['!x ** 10', Context.Empty],
  ['+O.p ** 10', Context.Empty],
  ['+x ** 10', Context.Empty],
  ['-O.p ** 10', Context.Empty],
  ['-x ** 10', Context.Empty],
  ['!1 ** 2', Context.Empty],
  ['void 1 ** 2;', Context.OptionsDisableWebCompat],
  ['typeof 1 ** 2;', Context.OptionsDisableWebCompat],
  ['typeof O.p ** 10', Context.Empty],
  ['typeof x ** 10', Context.Strict],
  ['void ** 10', Context.Empty],
  ['void O.p ** 10', Context.Empty],
  ['void x ** 10', Context.Empty],
  ['-x ** y', Context.Empty],
  ['++delete O.p ** 10', Context.Empty],
  ['--delete O.p ** 10', Context.Empty],
  ['++~O.p ** 10', Context.Empty],
  ['++~x ** 10', Context.Empty],
  ['--!O.p ** 10', Context.Empty],
  ['--!x ** 10', Context.Empty],
  ['++-O.p ** 10', Context.Empty],
  ['++-x ** 10', Context.Empty],
  ['--+O.p ** 10', Context.Empty],
  ['--+x ** 10', Context.Empty],
  ['[ x ] **= [ 2 ]', Context.OptionsDisableWebCompat],
  ['[ x **= 2 ] = [ 2 ]', Context.OptionsDisableWebCompat],
  ['{ x } **= { x: 2 }', Context.OptionsDisableWebCompat],
  ['{ x: x **= 2 ] = { x: 2 }', Context.OptionsDisableWebCompat],
  ['!1 ** 2;', Context.Empty],
  ['(!3 ** 2)', Context.OptionsDisableWebCompat],
  ['(+x ** 2)', Context.OptionsDisableWebCompat],
  ['(a * +a ** a ** 3)', Context.Empty],
  ['for (var import.meta of [1]) {}', Context.Empty],
  ['(typeof 3 ** 2)', Context.Empty],
  ['(delete 3 ** 2)', Context.Empty],
  ['delete 3 ** 2;', Context.Empty]
]);

pass('Expressions - Exponentiation (pass)', [
  [
    `(delete O.p) ** 10`,
    Context.OptionsLoc,
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
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'p',
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
              prefix: true,
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
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(~O.p) ** 10`,
    Context.OptionsLoc,
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
              operator: '~',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                  name: 'p',
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
              prefix: true,
              start: 1,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 5
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(+x) ** 10`,
    Context.OptionsLoc,
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
                type: 'Identifier',
                name: 'x',
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
              prefix: true,
              start: 1,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(-O.p) ** 10`,
    Context.OptionsLoc,
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
              operator: '-',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                  name: 'p',
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
              prefix: true,
              start: 1,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 5
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(typeof O.p) ** 10`,
    Context.OptionsLoc,
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
              operator: 'typeof',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'p',
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
              prefix: true,
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
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(void 0) ** 10`,
    Context.OptionsLoc,
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
              operator: 'void',
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
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `2 ** ++exponent, 8`,
    Context.OptionsLoc,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 2,
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
                right: {
                  type: 'UpdateExpression',
                  argument: {
                    type: 'Identifier',
                    name: 'exponent',
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
                  operator: '++',
                  prefix: true,
                  start: 5,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 15
                    }
                  }
                },
                operator: '**',
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
                type: 'Literal',
                value: 8,
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
    `2 ** -1 * 2, 1`,
    Context.OptionsLoc,
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
                type: 'BinaryExpression',
                left: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: 2,
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
                  right: {
                    type: 'UnaryExpression',
                    operator: '-',
                    argument: {
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
                  operator: '**',
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
                right: {
                  type: 'Literal',
                  value: 2,
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
                operator: '*',
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
              {
                type: 'Literal',
                value: 1,
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
    `2 ** (3 ** 2)`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: 2,
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
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'Literal',
                value: 3,
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
                type: 'Literal',
                value: 2,
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
              operator: '**',
              start: 6,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            operator: '**',
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
    `(!x) ** 10`,
    Context.OptionsLoc,
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
              operator: '!',
              argument: {
                type: 'Identifier',
                name: 'x',
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
              prefix: true,
              start: 1,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `--base ** 2`,
    Context.OptionsLoc,
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
                name: 'base',
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
              operator: '--',
              prefix: true,
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
            right: {
              type: 'Literal',
              value: 2,
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
            operator: '**',
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
    `!(3 ** 2)`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '!',
            argument: {
              type: 'BinaryExpression',
              left: {
                type: 'Literal',
                value: 3,
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
              right: {
                type: 'Literal',
                value: 2,
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
              operator: '**',
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
            prefix: true,
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
    `O.p++ ** 10`,
    Context.OptionsLoc,
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                  name: 'p',
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
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `x++ ** 10`,
    Context.OptionsLoc,
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
              value: 10,
              start: 7,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            operator: '**',
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
    `O.p-- ** 10`,
    Context.OptionsLoc,
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'O',
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
                  name: 'p',
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
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `(typeof x) ** 10`,
    Context.OptionsLoc,
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
              operator: 'typeof',
              argument: {
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
              prefix: true,
              start: 1,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `2 ** !s`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: 2,
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
            right: {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'Identifier',
                name: 's',
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
            operator: '**',
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
    `2 ** +n`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: 2,
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
            right: {
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'Identifier',
                name: 'n',
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
            operator: '**',
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
    `x ** y ** z`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
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
            right: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'y',
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
              right: {
                type: 'Identifier',
                name: 'z',
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
              operator: '**',
              start: 5,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            operator: '**',
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
    `++x ** y`,
    Context.OptionsLoc,
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
                name: 'x',
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
              operator: '++',
              prefix: true,
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
              type: 'Identifier',
              name: 'y',
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
            operator: '**',
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
    `(-x) ** y`,
    Context.OptionsLoc,
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
              operator: '-',
              argument: {
                type: 'Identifier',
                name: 'x',
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
              prefix: true,
              start: 1,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            right: {
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
            operator: '**',
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
    `-(x ** y)`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UnaryExpression',
            operator: '-',
            argument: {
              type: 'BinaryExpression',
              left: {
                type: 'Identifier',
                name: 'x',
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
              right: {
                type: 'Identifier',
                name: 'y',
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
              operator: '**',
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
            prefix: true,
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
    `(-x) ** 10`,
    Context.OptionsLoc,
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
              operator: '-',
              argument: {
                type: 'Identifier',
                name: 'x',
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
              prefix: true,
              start: 1,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `2 ** 3 ** 2, 512`,
    Context.OptionsLoc,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 2,
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
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: 3,
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
                  right: {
                    type: 'Literal',
                    value: 2,
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
                  operator: '**',
                  start: 5,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                operator: '**',
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
              {
                type: 'Literal',
                value: 512,
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
    `16 / 2 ** 2, 4`,
    Context.OptionsLoc,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 16,
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
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Literal',
                    value: 2,
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
                  right: {
                    type: 'Literal',
                    value: 2,
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
                  operator: '**',
                  start: 5,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                operator: '/',
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
              {
                type: 'Literal',
                value: 4,
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
    `var O = { p: 1 }, x = 10; ; if (x++ ** 10) { foo(); }`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'p',
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  }
                ],
                start: 8,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'O',
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 10,
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
              id: {
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
              start: 18,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 24
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
        },
        {
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
        {
          type: 'IfStatement',
          test: {
            type: 'BinaryExpression',
            left: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'x',
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
              operator: '++',
              prefix: false,
              start: 32,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 32
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            right: {
              type: 'Literal',
              value: 10,
              start: 39,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 39
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            operator: '**',
            start: 32,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 32
              },
              end: {
                line: 1,
                column: 41
              }
            }
          },
          consequent: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 45,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  arguments: [],
                  start: 45,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 45
                    },
                    end: {
                      line: 1,
                      column: 50
                    }
                  }
                },
                start: 45,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 45
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                }
              }
            ],
            start: 43,
            end: 53,
            loc: {
              start: {
                line: 1,
                column: 43
              },
              end: {
                line: 1,
                column: 53
              }
            }
          },
          alternate: null,
          start: 28,
          end: 53,
          loc: {
            start: {
              line: 1,
              column: 28
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
    `(void 0) ** 10`,
    Context.OptionsLoc,
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
              operator: 'void',
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
            right: {
              type: 'Literal',
              value: 10,
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
            operator: '**',
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
    `2 ** ++exponent, 8`,
    Context.OptionsLoc,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 2,
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
                right: {
                  type: 'UpdateExpression',
                  argument: {
                    type: 'Identifier',
                    name: 'exponent',
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
                  operator: '++',
                  prefix: true,
                  start: 5,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 15
                    }
                  }
                },
                operator: '**',
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
                type: 'Literal',
                value: 8,
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
    `(base **= 3) === -27`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'base',
                start: 1,
                end: 5,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 5
                  }
                }
              },
              operator: '**=',
              right: {
                type: 'Literal',
                value: 3,
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
            },
            right: {
              type: 'UnaryExpression',
              operator: '-',
              argument: {
                type: 'Literal',
                value: 27,
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
              prefix: true,
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
            operator: '===',
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
    `2 ** 4`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: 2,
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
            right: {
              type: 'Literal',
              value: 4,
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
            operator: '**',
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
    `new x ** 2;`,
    Context.OptionsLoc,
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
              type: 'Literal',
              value: 2,
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
            operator: '**',
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
    `true ** a`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: true,
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
              type: 'Identifier',
              name: 'a',
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
            operator: '**',
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
    `++x ** a`,
    Context.OptionsLoc,
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
                name: 'x',
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
              operator: '++',
              prefix: true,
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
              type: 'Identifier',
              name: 'a',
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
            operator: '**',
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
    `+a * b ** c ** 3`,
    Context.OptionsLoc,
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
              prefix: true,
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
            right: {
              type: 'BinaryExpression',
              left: {
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
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'c',
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
                right: {
                  type: 'Literal',
                  value: 3,
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
                operator: '**',
                start: 10,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              operator: '**',
              start: 5,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            operator: '*',
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
    `(2 ** 4)`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'BinaryExpression',
            left: {
              type: 'Literal',
              value: 2,
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
            right: {
              type: 'Literal',
              value: 4,
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
            operator: '**',
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
    `(new x ** 2)`,
    Context.OptionsLoc,
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
              start: 1,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            right: {
              type: 'Literal',
              value: 2,
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
            operator: '**',
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
    `(++x ** a)`,
    Context.OptionsLoc,
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
              operator: '++',
              prefix: true,
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
            right: {
              type: 'Identifier',
              name: 'a',
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
            operator: '**',
            start: 1,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 1
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
    `(+c * b ** a ** 3)`,
    Context.OptionsLoc,
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
                type: 'Identifier',
                name: 'c',
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
              prefix: true,
              start: 1,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            right: {
              type: 'BinaryExpression',
              left: {
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
              right: {
                type: 'BinaryExpression',
                left: {
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
                right: {
                  type: 'Literal',
                  value: 3,
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
                operator: '**',
                start: 11,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              operator: '**',
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
            operator: '*',
            start: 1,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 17
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
  ]
]);
