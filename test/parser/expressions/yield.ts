import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Yield', () => {
  for (const [source, ctx, expected] of [
    [
      `function* foo(a, b, c, d) { yield a; yield b; yield c; yield d; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              {
                type: 'Identifier',
                name: 'b',
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
              {
                type: 'Identifier',
                name: 'c',
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
                type: 'Identifier',
                name: 'd',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'a',
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
                    delegate: false,
                    start: 28,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  start: 28,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'b',
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
                    delegate: false,
                    start: 37,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  start: 37,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'c',
                      start: 52,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 52
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      }
                    },
                    delegate: false,
                    start: 46,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 46
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  start: 46,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 46
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'd',
                      start: 61,
                      end: 62,
                      loc: {
                        start: {
                          line: 1,
                          column: 61
                        },
                        end: {
                          line: 1,
                          column: 62
                        }
                      }
                    },
                    delegate: false,
                    start: 55,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 55,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 55
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  }
                }
              ],
              start: 26,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 65
                }
              }
            },
            async: false,
            generator: true,
            id: {
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
            start: 0,
            end: 65,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 65
              }
            }
          }
        ],
        start: 0,
        end: 65,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 65
          }
        }
      }
    ],
    [
      `function* g25() {
          try {
            throw (yield (1 + (yield 2) + 3))
          } catch (e) {
            if (typeof e == 'object') throw e;
            return e + (yield (4 + (yield 5) + 6));
          }
        }`,
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
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ThrowStatement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Literal',
                                value: 1,
                                start: 60,
                                end: 61,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 26
                                  },
                                  end: {
                                    line: 3,
                                    column: 27
                                  }
                                }
                              },
                              right: {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 2,
                                  start: 71,
                                  end: 72,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 37
                                    },
                                    end: {
                                      line: 3,
                                      column: 38
                                    }
                                  }
                                },
                                delegate: false,
                                start: 65,
                                end: 72,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 31
                                  },
                                  end: {
                                    line: 3,
                                    column: 38
                                  }
                                }
                              },
                              operator: '+',
                              start: 60,
                              end: 73,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 26
                                },
                                end: {
                                  line: 3,
                                  column: 39
                                }
                              }
                            },
                            right: {
                              type: 'Literal',
                              value: 3,
                              start: 76,
                              end: 77,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 42
                                },
                                end: {
                                  line: 3,
                                  column: 43
                                }
                              }
                            },
                            operator: '+',
                            start: 60,
                            end: 77,
                            loc: {
                              start: {
                                line: 3,
                                column: 26
                              },
                              end: {
                                line: 3,
                                column: 43
                              }
                            }
                          },
                          delegate: false,
                          start: 53,
                          end: 78,
                          loc: {
                            start: {
                              line: 3,
                              column: 19
                            },
                            end: {
                              line: 3,
                              column: 44
                            }
                          }
                        },
                        start: 46,
                        end: 79,
                        loc: {
                          start: {
                            line: 3,
                            column: 12
                          },
                          end: {
                            line: 3,
                            column: 45
                          }
                        }
                      }
                    ],
                    start: 32,
                    end: 91,
                    loc: {
                      start: {
                        line: 2,
                        column: 14
                      },
                      end: {
                        line: 4,
                        column: 11
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 99,
                      end: 100,
                      loc: {
                        start: {
                          line: 4,
                          column: 19
                        },
                        end: {
                          line: 4,
                          column: 20
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'IfStatement',
                          test: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'UnaryExpression',
                              operator: 'typeof',
                              argument: {
                                type: 'Identifier',
                                name: 'e',
                                start: 127,
                                end: 128,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 23
                                  },
                                  end: {
                                    line: 5,
                                    column: 24
                                  }
                                }
                              },
                              prefix: true,
                              start: 120,
                              end: 128,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 16
                                },
                                end: {
                                  line: 5,
                                  column: 24
                                }
                              }
                            },
                            right: {
                              type: 'Literal',
                              value: 'object',
                              start: 132,
                              end: 140,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 28
                                },
                                end: {
                                  line: 5,
                                  column: 36
                                }
                              }
                            },
                            operator: '==',
                            start: 120,
                            end: 140,
                            loc: {
                              start: {
                                line: 5,
                                column: 16
                              },
                              end: {
                                line: 5,
                                column: 36
                              }
                            }
                          },
                          consequent: {
                            type: 'ThrowStatement',
                            argument: {
                              type: 'Identifier',
                              name: 'e',
                              start: 148,
                              end: 149,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 44
                                },
                                end: {
                                  line: 5,
                                  column: 45
                                }
                              }
                            },
                            start: 142,
                            end: 150,
                            loc: {
                              start: {
                                line: 5,
                                column: 38
                              },
                              end: {
                                line: 5,
                                column: 46
                              }
                            }
                          },
                          alternate: null,
                          start: 116,
                          end: 150,
                          loc: {
                            start: {
                              line: 5,
                              column: 12
                            },
                            end: {
                              line: 5,
                              column: 46
                            }
                          }
                        },
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Identifier',
                              name: 'e',
                              start: 170,
                              end: 171,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 19
                                },
                                end: {
                                  line: 6,
                                  column: 20
                                }
                              }
                            },
                            right: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'BinaryExpression',
                                left: {
                                  type: 'BinaryExpression',
                                  left: {
                                    type: 'Literal',
                                    value: 4,
                                    start: 182,
                                    end: 183,
                                    loc: {
                                      start: {
                                        line: 6,
                                        column: 31
                                      },
                                      end: {
                                        line: 6,
                                        column: 32
                                      }
                                    }
                                  },
                                  right: {
                                    type: 'YieldExpression',
                                    argument: {
                                      type: 'Literal',
                                      value: 5,
                                      start: 193,
                                      end: 194,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 42
                                        },
                                        end: {
                                          line: 6,
                                          column: 43
                                        }
                                      }
                                    },
                                    delegate: false,
                                    start: 187,
                                    end: 194,
                                    loc: {
                                      start: {
                                        line: 6,
                                        column: 36
                                      },
                                      end: {
                                        line: 6,
                                        column: 43
                                      }
                                    }
                                  },
                                  operator: '+',
                                  start: 182,
                                  end: 195,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 31
                                    },
                                    end: {
                                      line: 6,
                                      column: 44
                                    }
                                  }
                                },
                                right: {
                                  type: 'Literal',
                                  value: 6,
                                  start: 198,
                                  end: 199,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 47
                                    },
                                    end: {
                                      line: 6,
                                      column: 48
                                    }
                                  }
                                },
                                operator: '+',
                                start: 182,
                                end: 199,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 31
                                  },
                                  end: {
                                    line: 6,
                                    column: 48
                                  }
                                }
                              },
                              delegate: false,
                              start: 175,
                              end: 200,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 24
                                },
                                end: {
                                  line: 6,
                                  column: 49
                                }
                              }
                            },
                            operator: '+',
                            start: 170,
                            end: 201,
                            loc: {
                              start: {
                                line: 6,
                                column: 19
                              },
                              end: {
                                line: 6,
                                column: 50
                              }
                            }
                          },
                          start: 163,
                          end: 202,
                          loc: {
                            start: {
                              line: 6,
                              column: 12
                            },
                            end: {
                              line: 6,
                              column: 51
                            }
                          }
                        }
                      ],
                      start: 102,
                      end: 214,
                      loc: {
                        start: {
                          line: 4,
                          column: 22
                        },
                        end: {
                          line: 7,
                          column: 11
                        }
                      }
                    },
                    start: 92,
                    end: 214,
                    loc: {
                      start: {
                        line: 4,
                        column: 12
                      },
                      end: {
                        line: 7,
                        column: 11
                      }
                    }
                  },
                  finalizer: null,
                  start: 28,
                  end: 214,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 7,
                      column: 11
                    }
                  }
                }
              ],
              start: 16,
              end: 224,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 8,
                  column: 9
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g25',
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
            start: 0,
            end: 224,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 8,
                column: 9
              }
            }
          }
        ],
        start: 0,
        end: 224,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 8,
            column: 9
          }
        }
      }
    ],
    [
      `function foo() { return ({ x: 42, g: function* (a) { yield this.x } }).g(0); }`,
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
                  type: 'ReturnStatement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
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
                              type: 'Literal',
                              value: 42,
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'g',
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
                            value: {
                              type: 'FunctionExpression',
                              params: [
                                {
                                  type: 'Identifier',
                                  name: 'a',
                                  start: 48,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 48
                                    },
                                    end: {
                                      line: 1,
                                      column: 49
                                    }
                                  }
                                }
                              ],
                              body: {
                                type: 'BlockStatement',
                                body: [
                                  {
                                    type: 'ExpressionStatement',
                                    expression: {
                                      type: 'YieldExpression',
                                      argument: {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'ThisExpression',
                                          start: 59,
                                          end: 63,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 59
                                            },
                                            end: {
                                              line: 1,
                                              column: 63
                                            }
                                          }
                                        },
                                        computed: false,
                                        property: {
                                          type: 'Identifier',
                                          name: 'x',
                                          start: 64,
                                          end: 65,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 64
                                            },
                                            end: {
                                              line: 1,
                                              column: 65
                                            }
                                          }
                                        },
                                        optional: false,
                                        shortCircuited: false,
                                        start: 59,
                                        end: 65,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 59
                                          },
                                          end: {
                                            line: 1,
                                            column: 65
                                          }
                                        }
                                      },
                                      delegate: false,
                                      start: 53,
                                      end: 65,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 53
                                        },
                                        end: {
                                          line: 1,
                                          column: 65
                                        }
                                      }
                                    },
                                    start: 53,
                                    end: 65,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 53
                                      },
                                      end: {
                                        line: 1,
                                        column: 65
                                      }
                                    }
                                  }
                                ],
                                start: 51,
                                end: 67,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 51
                                  },
                                  end: {
                                    line: 1,
                                    column: 67
                                  }
                                }
                              },
                              async: false,
                              generator: true,
                              id: null,
                              start: 37,
                              end: 67,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 37
                                },
                                end: {
                                  line: 1,
                                  column: 67
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 34,
                            end: 67,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 67
                              }
                            }
                          }
                        ],
                        start: 25,
                        end: 69,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 69
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'g',
                        start: 71,
                        end: 72,
                        loc: {
                          start: {
                            line: 1,
                            column: 71
                          },
                          end: {
                            line: 1,
                            column: 72
                          }
                        }
                      },
                      optional: false,
                      shortCircuited: false,
                      start: 24,
                      end: 72,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 72
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: 0,
                        start: 73,
                        end: 74,
                        loc: {
                          start: {
                            line: 1,
                            column: 73
                          },
                          end: {
                            line: 1,
                            column: 74
                          }
                        }
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 75,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 75
                      }
                    }
                  },
                  start: 17,
                  end: 76,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 76
                    }
                  }
                }
              ],
              start: 15,
              end: 78,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
              name: 'foo',
              start: 9,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 78,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 78
              }
            }
          }
        ],
        start: 0,
        end: 78,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 78
          }
        }
      }
    ],
    [
      `yield *= x;`,
      Context.OptionsNext | Context.OptionsLoc,
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
                name: 'yield',
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
              operator: '*=',
              right: {
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
      `function* g() { yield 1; try { yield 2; } catch (e) { yield e; } yield 3; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 1,
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
                    delegate: false,
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
                  start: 16,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  }
                },
                {
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Literal',
                            value: 2,
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
                          delegate: false,
                          start: 31,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        },
                        start: 31,
                        end: 39,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 39
                          }
                        }
                      }
                    ],
                    start: 29,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 49,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 49
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'e',
                              start: 60,
                              end: 61,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 60
                                },
                                end: {
                                  line: 1,
                                  column: 61
                                }
                              }
                            },
                            delegate: false,
                            start: 54,
                            end: 61,
                            loc: {
                              start: {
                                line: 1,
                                column: 54
                              },
                              end: {
                                line: 1,
                                column: 61
                              }
                            }
                          },
                          start: 54,
                          end: 62,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 62
                            }
                          }
                        }
                      ],
                      start: 52,
                      end: 64,
                      loc: {
                        start: {
                          line: 1,
                          column: 52
                        },
                        end: {
                          line: 1,
                          column: 64
                        }
                      }
                    },
                    start: 42,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    }
                  },
                  finalizer: null,
                  start: 25,
                  end: 64,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 64
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 3,
                      start: 71,
                      end: 72,
                      loc: {
                        start: {
                          line: 1,
                          column: 71
                        },
                        end: {
                          line: 1,
                          column: 72
                        }
                      }
                    },
                    delegate: false,
                    start: 65,
                    end: 72,
                    loc: {
                      start: {
                        line: 1,
                        column: 65
                      },
                      end: {
                        line: 1,
                        column: 72
                      }
                    }
                  },
                  start: 65,
                  end: 73,
                  loc: {
                    start: {
                      line: 1,
                      column: 65
                    },
                    end: {
                      line: 1,
                      column: 73
                    }
                  }
                }
              ],
              start: 14,
              end: 75,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 75
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
            end: 75,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 75
              }
            }
          }
        ],
        start: 0,
        end: 75,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 75
          }
        }
      }
    ],
    [
      `function* g8() { for (var x = 0; x < 4; x++) { yield x; } }`,
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
                  type: 'ForStatement',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
                            start: 53,
                            end: 54,
                            loc: {
                              start: {
                                line: 1,
                                column: 53
                              },
                              end: {
                                line: 1,
                                column: 54
                              }
                            }
                          },
                          delegate: false,
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
                        start: 47,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 47
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      }
                    ],
                    start: 45,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    }
                  },
                  init: {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
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
                        id: {
                          type: 'Identifier',
                          name: 'x',
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
                        start: 26,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 22,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  test: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    right: {
                      type: 'Literal',
                      value: 4,
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
                    operator: '<',
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
                  update: {
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '++',
                    prefix: false,
                    start: 40,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  start: 17,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 15,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g8',
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
      `function *a(){yield void 0}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UnaryExpression',
                      operator: 'void',
                      argument: {
                        type: 'Literal',
                        value: 0,
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
                      prefix: true,
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
                    delegate: false,
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
              start: 13,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'a',
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
      `function *a(){yield ~0}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UnaryExpression',
                      operator: '~',
                      argument: {
                        type: 'Literal',
                        value: 0,
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
                      prefix: true,
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
                    delegate: false,
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
                }
              ],
              start: 13,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'a',
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
      `function *a(){yield ++a;}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UpdateExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'a',
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
                      operator: '++',
                      prefix: true,
                      start: 20,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    delegate: false,
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
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'a',
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
      `([x, {y: [yield]}] = z)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'y',
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
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'yield',
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
                            }
                          ],
                          start: 9,
                          end: 16,
                          loc: {
                            start: {
                              line: 1,
                              column: 9
                            },
                            end: {
                              line: 1,
                              column: 16
                            }
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 6,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        }
                      }
                    ],
                    start: 5,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  }
                ],
                start: 1,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 1
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
                name: 'z',
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
      'function* a(b, c, d) { throw `_":${((yield* (6002.22)))}¿Z${null}UâÑ?${([])}â.Ò÷${((`m`))}`; }',
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              {
                type: 'Identifier',
                name: 'c',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'TemplateLiteral',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 6002.22,
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
                        delegate: true,
                        start: 39,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: null,
                        start: 62,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 62
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        }
                      },
                      {
                        type: 'ArrayExpression',
                        elements: [],
                        start: 74,
                        end: 76,
                        loc: {
                          start: {
                            line: 1,
                            column: 74
                          },
                          end: {
                            line: 1,
                            column: 76
                          }
                        }
                      },
                      {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [
                          {
                            type: 'TemplateElement',
                            value: {
                              cooked: 'm',
                              raw: 'm'
                            },
                            tail: true,
                            start: 86,
                            end: 89,
                            loc: {
                              start: {
                                line: 1,
                                column: 86
                              },
                              end: {
                                line: 1,
                                column: 89
                              }
                            }
                          }
                        ],
                        start: 86,
                        end: 89,
                        loc: {
                          start: {
                            line: 1,
                            column: 86
                          },
                          end: {
                            line: 1,
                            column: 89
                          }
                        }
                      }
                    ],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '\u0005_":',
                          raw: '\u0005_":'
                        },
                        tail: false,
                        start: 29,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '¿Z',
                          raw: '¿Z'
                        },
                        tail: false,
                        start: 57,
                        end: 57,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 57
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'UâÑ?',
                          raw: 'UâÑ?'
                        },
                        tail: false,
                        start: 66,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 66
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'â.Ò÷',
                          raw: 'â.Ò÷'
                        },
                        tail: false,
                        start: 77,
                        end: 77,
                        loc: {
                          start: {
                            line: 1,
                            column: 77
                          },
                          end: {
                            line: 1,
                            column: 77
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '',
                          raw: ''
                        },
                        tail: true,
                        start: 91,
                        end: 91,
                        loc: {
                          start: {
                            line: 1,
                            column: 91
                          },
                          end: {
                            line: 1,
                            column: 91
                          }
                        }
                      }
                    ],
                    start: 29,
                    end: 93,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 93
                      }
                    }
                  },
                  start: 23,
                  end: 94,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 94
                    }
                  }
                }
              ],
              start: 21,
              end: 96,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 96
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'a',
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
            end: 96,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 96
              }
            }
          }
        ],
        start: 0,
        end: 96,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 96
          }
        }
      }
    ],
    [
      `([x, {y: [yield]}])`,
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
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y',
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
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield',
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
                          }
                        ],
                        start: 9,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 9
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 6,
                      end: 16,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 16
                        }
                      }
                    }
                  ],
                  start: 5,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                }
              ],
              start: 1,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 18
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
      `function *f(){ delete ("x"[(yield)]) }`,
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
                    type: 'UnaryExpression',
                    operator: 'delete',
                    argument: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Literal',
                        value: 'x',
                        start: 23,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      },
                      computed: true,
                      property: {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
                        start: 28,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      },
                      optional: false,
                      shortCircuited: false,
                      start: 23,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    prefix: true,
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
                  },
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
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f() { (yield x ** y) }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      right: {
                        type: 'Identifier',
                        name: 'y',
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
                      operator: '**',
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
                    delegate: false,
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f({x: x}) { function f({x: yield}) {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'Identifier',
                      name: 'x',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 13,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  }
                ],
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  params: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'x',
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
                          value: {
                            type: 'Identifier',
                            name: 'yield',
                            start: 37,
                            end: 42,
                            loc: {
                              start: {
                                line: 1,
                                column: 37
                              },
                              end: {
                                line: 1,
                                column: 42
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 34,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        }
                      ],
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
                    }
                  ],
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
                  start: 22,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `({ *g1() {   return {x: yield}  }})`,
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
                    name: 'g1',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'x',
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
                                value: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 21,
                                end: 29,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 21
                                  },
                                  end: {
                                    line: 1,
                                    column: 29
                                  }
                                }
                              }
                            ],
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
                        }
                      ],
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
                    },
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 3,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 1,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `function *f() { 1 ? yield : 1 ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1,
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
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
                      start: 20,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    },
                    alternate: {
                      type: 'Literal',
                      value: 1,
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
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f() { yield 1 ? 2 : 3; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ConditionalExpression',
                      test: {
                        type: 'Literal',
                        value: 1,
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
                      consequent: {
                        type: 'Literal',
                        value: 2,
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
                        type: 'Literal',
                        value: 3,
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
                      start: 22,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    delegate: false,
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f() { (yield 1) ? yield 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 1,
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
                      delegate: false,
                      start: 17,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      }
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2,
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
                      delegate: false,
                      start: 28,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
                      start: 38,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 16,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 16,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        }
      }
    ],
    [
      `function *g() { function f(x = yield) {} }`,
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
                  type: 'FunctionDeclaration',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'yield',
                        start: 31,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        }
                      },
                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    }
                  ],
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
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 14,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { function f(x = x + yield) {} }`,
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
                  type: 'FunctionDeclaration',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'x',
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
                          type: 'Identifier',
                          name: 'yield',
                          start: 35,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          }
                        },
                        operator: '+',
                        start: 31,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      start: 27,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 42,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 44
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
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                }
              ],
              start: 14,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 46
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 46
              }
            }
          }
        ],
        start: 0,
        end: 46,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 46
          }
        }
      }
    ],
    [
      `(x = x + yield) => x;`,
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
                type: 'Identifier',
                name: 'x',
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
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'yield',
                      start: 9,
                      end: 14,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 14
                        }
                      }
                    },
                    operator: '+',
                    start: 5,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 1,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
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
      `(x = {[yield]: 1})`,
      Context.OptionsNext | Context.OptionsLoc,
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
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'yield',
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 6,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  }
                ],
                start: 5,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
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
    ],
    [
      `(function *g(){ async (x = {[yield y]: 1}) })`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
                        name: 'async',
                        start: 16,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        }
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'x',
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
                          operator: '=',
                          right: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                  },
                                  delegate: false,
                                  start: 29,
                                  end: 36,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 29
                                    },
                                    end: {
                                      line: 1,
                                      column: 36
                                    }
                                  }
                                },
                                value: {
                                  type: 'Literal',
                                  value: 1,
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
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
                                start: 28,
                                end: 40,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 40
                                  }
                                }
                              }
                            ],
                            start: 27,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            }
                          },
                          start: 23,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          }
                        }
                      ],
                      optional: false,
                      shortCircuited: false,
                      start: 16,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 16,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 14,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'g',
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
              start: 1,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 44
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
      `(function *g(){ async (x = [yield y]) })`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
                        name: 'async',
                        start: 16,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        }
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'x',
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
                          operator: '=',
                          right: {
                            type: 'ArrayExpression',
                            elements: [
                              {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Identifier',
                                  name: 'y',
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
                                delegate: false,
                                start: 28,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                }
                              }
                            ],
                            start: 27,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            }
                          },
                          start: 23,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 36
                            }
                          }
                        }
                      ],
                      optional: false,
                      shortCircuited: false,
                      start: 16,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    start: 16,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  }
                ],
                start: 14,
                end: 39,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 39
                  }
                }
              },
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'g',
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
              start: 1,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
          }
        }
      }
    ],
    [
      `async (x = yield) => {}`,
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
                type: 'BlockStatement',
                body: [],
                start: 21,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 21
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              params: [
                {
                  type: 'AssignmentPattern',
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
                    type: 'Identifier',
                    name: 'yield',
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
                }
              ],
              async: true,
              expression: false,
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
      `async (yield)`,
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
                name: 'async',
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `async (x = yield)`,
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
                name: 'async',
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
              arguments: [
                {
                  type: 'AssignmentExpression',
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
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `async (x = (yield)) => {}`,
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
                type: 'BlockStatement',
                body: [],
                start: 23,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              params: [
                {
                  type: 'AssignmentPattern',
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
                    type: 'Identifier',
                    name: 'yield',
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
                  start: 7,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              async: true,
              expression: false,
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
      `async (x = z = yield) => {}`,
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
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'z',
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
                    operator: '=',
                    right: {
                      type: 'Identifier',
                      name: 'yield',
                      start: 15,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    },
                    start: 11,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  },
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
              async: true,
              expression: false,
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
      `async (x = z = yield)`,
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
                name: 'async',
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
              arguments: [
                {
                  type: 'AssignmentExpression',
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
                  operator: '=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'z',
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
                    operator: '=',
                    right: {
                      type: 'Identifier',
                      name: 'yield',
                      start: 15,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    },
                    start: 11,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  },
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `(function *f(){ async (x = yield) })`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
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
                        name: 'async',
                        start: 16,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        }
                      },
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'x',
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
                          operator: '=',
                          right: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                          start: 23,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
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
                  }
                ],
                start: 14,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 14
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
              start: 1,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 35
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
      `yield`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'yield',
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
      `yield: foo  => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'yield',
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
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'ArrowFunctionExpression',
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
                params: [
                  {
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
                  }
                ],
                async: false,
                expression: false,
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
              },
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
    ],
    [
      `yield  => {}`,
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
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
              async: false,
              expression: false,
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
      `yield => yield ? foo : bar`,
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
                type: 'ConditionalExpression',
                test: {
                  type: 'Identifier',
                  name: 'yield',
                  start: 9,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                consequent: {
                  type: 'Identifier',
                  name: 'foo',
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
                alternate: {
                  type: 'Identifier',
                  name: 'bar',
                  start: 23,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                },
                start: 9,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
              async: false,
              expression: true,
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
      `await: yield`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'await',
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
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'yield',
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
      `function foo() { function *b() {} }`,
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
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'b',
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
                }
              ],
              start: 15,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
              name: 'foo',
              start: 9,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 12
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
      `function foo() { function * gen() { yield * a; return } }`,
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
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a',
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
                          delegate: true,
                          start: 36,
                          end: 45,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 45
                            }
                          }
                        },
                        start: 36,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 36
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      },
                      {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 47,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 47
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
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
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'gen',
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
                  start: 17,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 15,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 57
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'foo',
              start: 9,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 57,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 57
              }
            }
          }
        ],
        start: 0,
        end: 57,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 57
          }
        }
      }
    ],
    [
      `function* f(){ () => yield; }`,
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
                      type: 'Identifier',
                      name: 'yield',
                      start: 21,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    params: [],
                    async: false,
                    expression: true,
                    start: 15,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 26
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function fn(x = yield* yield) {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'AssignmentPattern',
                left: {
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
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'yield',
                    start: 16,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
                  operator: '*',
                  start: 16,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                },
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
              }
            ],
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
      `function * gen() { (yield * a) + (yield * b);; }`,
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
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'a',
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
                      delegate: true,
                      start: 20,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'b',
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
                      delegate: true,
                      start: 34,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    operator: '+',
                    start: 19,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  start: 19,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                },
                {
                  type: 'EmptyStatement',
                  start: 45,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 45
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 17,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'gen',
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
            start: 0,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        }
      }
    ],
    [
      `function * gen() { yield, yield }`,
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
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
                        start: 26,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  start: 19,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'gen',
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
      `function f() { const yield = 10; }`,
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
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 10,
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
                      id: {
                        type: 'Identifier',
                        name: 'yield',
                        start: 21,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      },
                      start: 21,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    }
                  ],
                  start: 15,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                }
              ],
              start: 13,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `function f() { var o = { yield: 10 } }`,
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
                              name: 'yield',
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
                            value: {
                              type: 'Literal',
                              value: 10,
                              start: 32,
                              end: 34,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 32
                                },
                                end: {
                                  line: 1,
                                  column: 34
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 25,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 25
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            }
                          }
                        ],
                        start: 23,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'o',
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
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 36
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
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
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
      `function f() { class C { *yield() { } } }`,
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
                          name: 'yield',
                          start: 26,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          }
                        },
                        value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 34,
                            end: 37,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 37
                              }
                            }
                          },
                          async: false,
                          generator: true,
                          id: null,
                          start: 31,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          }
                        },
                        start: 25,
                        end: 37,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 37
                          }
                        }
                      }
                    ],
                    start: 23,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  start: 15,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 13,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 41
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
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 41
              }
            }
          }
        ],
        start: 0,
        end: 41,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 41
          }
        }
      }
    ],
    [
      `yield = foo`,
      Context.OptionsNext | Context.OptionsLoc,
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
                name: 'yield',
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
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'foo',
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
      `yield: foo`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'yield',
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
            body: {
              type: 'ExpressionStatement',
              expression: {
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
      `yield`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'yield',
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
    // [`({ *g1() {   [yield 1]  }})`, Context.OptionsNext | Context.OptionsLoc,   {}],
    [
      `function *g() { yield {...(x,y),}}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
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
                              {
                                type: 'Identifier',
                                name: 'y',
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
                              }
                            ],
                            start: 27,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          },
                          start: 23,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          }
                        }
                      ],
                      start: 22,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    delegate: false,
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
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function* g() { (function yield() {}) }`,
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
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 34,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
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
                      name: 'yield',
                      start: 26,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    start: 17,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 16,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 14,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ return x + (yield f); }`,
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
                  type: 'ReturnStatement',
                  argument: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'f',
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
                      delegate: false,
                      start: 27,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    operator: '+',
                    start: 22,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
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
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `var gen = function *g() {
      callCount += 1;
      yield {
           ...yield yield,
           ...(function(arg) {
              var yield = arg;
              return {...yield};
           }(yield)),
           ...yield,
        }
    };`,
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
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'callCount',
                            start: 32,
                            end: 41,
                            loc: {
                              start: {
                                line: 2,
                                column: 6
                              },
                              end: {
                                line: 2,
                                column: 15
                              }
                            }
                          },
                          operator: '+=',
                          right: {
                            type: 'Literal',
                            value: 1,
                            start: 45,
                            end: 46,
                            loc: {
                              start: {
                                line: 2,
                                column: 19
                              },
                              end: {
                                line: 2,
                                column: 20
                              }
                            }
                          },
                          start: 32,
                          end: 46,
                          loc: {
                            start: {
                              line: 2,
                              column: 6
                            },
                            end: {
                              line: 2,
                              column: 20
                            }
                          }
                        },
                        start: 32,
                        end: 47,
                        loc: {
                          start: {
                            line: 2,
                            column: 6
                          },
                          end: {
                            line: 2,
                            column: 21
                          }
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 82,
                                    end: 87,
                                    loc: {
                                      start: {
                                        line: 4,
                                        column: 20
                                      },
                                      end: {
                                        line: 4,
                                        column: 25
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 76,
                                  end: 87,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 14
                                    },
                                    end: {
                                      line: 4,
                                      column: 25
                                    }
                                  }
                                },
                                start: 73,
                                end: 87,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 11
                                  },
                                  end: {
                                    line: 4,
                                    column: 25
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'CallExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  callee: {
                                    type: 'FunctionExpression',
                                    params: [
                                      {
                                        type: 'Identifier',
                                        name: 'arg',
                                        start: 113,
                                        end: 116,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 24
                                          },
                                          end: {
                                            line: 5,
                                            column: 27
                                          }
                                        }
                                      }
                                    ],
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'VariableDeclaration',
                                          kind: 'var',
                                          declarations: [
                                            {
                                              type: 'VariableDeclarator',
                                              init: {
                                                type: 'Identifier',
                                                name: 'arg',
                                                start: 146,
                                                end: 149,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 26
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 29
                                                  }
                                                }
                                              },
                                              id: {
                                                type: 'Identifier',
                                                name: 'yield',
                                                start: 138,
                                                end: 143,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 18
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 23
                                                  }
                                                }
                                              },
                                              start: 138,
                                              end: 149,
                                              loc: {
                                                start: {
                                                  line: 6,
                                                  column: 18
                                                },
                                                end: {
                                                  line: 6,
                                                  column: 29
                                                }
                                              }
                                            }
                                          ],
                                          start: 134,
                                          end: 150,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 14
                                            },
                                            end: {
                                              line: 6,
                                              column: 30
                                            }
                                          }
                                        },
                                        {
                                          type: 'ReturnStatement',
                                          argument: {
                                            type: 'ObjectExpression',
                                            properties: [
                                              {
                                                type: 'SpreadElement',
                                                argument: {
                                                  type: 'Identifier',
                                                  name: 'yield',
                                                  start: 176,
                                                  end: 181,
                                                  loc: {
                                                    start: {
                                                      line: 7,
                                                      column: 25
                                                    },
                                                    end: {
                                                      line: 7,
                                                      column: 30
                                                    }
                                                  }
                                                },
                                                start: 173,
                                                end: 181,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 30
                                                  }
                                                }
                                              }
                                            ],
                                            start: 172,
                                            end: 182,
                                            loc: {
                                              start: {
                                                line: 7,
                                                column: 21
                                              },
                                              end: {
                                                line: 7,
                                                column: 31
                                              }
                                            }
                                          },
                                          start: 165,
                                          end: 183,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 14
                                            },
                                            end: {
                                              line: 7,
                                              column: 32
                                            }
                                          }
                                        }
                                      ],
                                      start: 118,
                                      end: 196,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 29
                                        },
                                        end: {
                                          line: 8,
                                          column: 12
                                        }
                                      }
                                    },
                                    async: false,
                                    generator: false,
                                    id: null,
                                    start: 104,
                                    end: 196,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 15
                                      },
                                      end: {
                                        line: 8,
                                        column: 12
                                      }
                                    }
                                  },
                                  arguments: [
                                    {
                                      type: 'YieldExpression',
                                      argument: null,
                                      delegate: false,
                                      start: 197,
                                      end: 202,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 13
                                        },
                                        end: {
                                          line: 8,
                                          column: 18
                                        }
                                      }
                                    }
                                  ],
                                  start: 104,
                                  end: 203,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 15
                                    },
                                    end: {
                                      line: 8,
                                      column: 19
                                    }
                                  }
                                },
                                start: 100,
                                end: 204,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 11
                                  },
                                  end: {
                                    line: 8,
                                    column: 20
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
                                  start: 220,
                                  end: 225,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 14
                                    },
                                    end: {
                                      line: 9,
                                      column: 19
                                    }
                                  }
                                },
                                start: 217,
                                end: 225,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 11
                                  },
                                  end: {
                                    line: 9,
                                    column: 19
                                  }
                                }
                              }
                            ],
                            start: 60,
                            end: 236,
                            loc: {
                              start: {
                                line: 3,
                                column: 12
                              },
                              end: {
                                line: 10,
                                column: 9
                              }
                            }
                          },
                          delegate: false,
                          start: 54,
                          end: 236,
                          loc: {
                            start: {
                              line: 3,
                              column: 6
                            },
                            end: {
                              line: 10,
                              column: 9
                            }
                          }
                        },
                        start: 54,
                        end: 236,
                        loc: {
                          start: {
                            line: 3,
                            column: 6
                          },
                          end: {
                            line: 10,
                            column: 9
                          }
                        }
                      }
                    ],
                    start: 24,
                    end: 242,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 11,
                        column: 5
                      }
                    }
                  },
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'g',
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
                  start: 10,
                  end: 242,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 11,
                      column: 5
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen',
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
                end: 242,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 11,
                    column: 5
                  }
                }
              }
            ],
            start: 0,
            end: 243,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 11,
                column: 6
              }
            }
          }
        ],
        start: 0,
        end: 243,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 11,
            column: 6
          }
        }
      }
    ],
    [
      `function *f() { (yield 1) ? yield 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 1,
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
                      delegate: false,
                      start: 17,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      }
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2,
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
                      delegate: false,
                      start: 28,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
                      start: 38,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 16,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 16,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        }
      }
    ],
    [
      `function *f() { 1 ? yield : 1 ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1,
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
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
                      start: 20,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    },
                    alternate: {
                      type: 'Literal',
                      value: 1,
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
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f() { 1 ? 1 : yield ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1,
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
                    consequent: {
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
                    alternate: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *g() { [...yield]; }`,
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
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
                          start: 20,
                          end: 25,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 25
                            }
                          }
                        },
                        start: 17,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        }
                      }
                    ],
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
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *f() { 1 ? 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'Literal',
                      value: 1,
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
                    consequent: {
                      type: 'Literal',
                      value: 2,
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
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *f(){ return { ...(yield) } }`,
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
                  type: 'ReturnStatement',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
                          start: 28,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 33
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
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *g() {x={     ...yield x,    };}`,
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
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
                            delegate: false,
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
                          },
                          start: 23,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        }
                      ],
                      start: 17,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    start: 15,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  start: 15,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 14,
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 41
              }
            }
          }
        ],
        start: 0,
        end: 41,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 41
          }
        }
      }
    ],
    [
      `function *g() {x={     ...yield yield,    };}`,
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
                              start: 32,
                              end: 37,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 32
                                },
                                end: {
                                  line: 1,
                                  column: 37
                                }
                              }
                            },
                            delegate: false,
                            start: 26,
                            end: 37,
                            loc: {
                              start: {
                                line: 1,
                                column: 26
                              },
                              end: {
                                line: 1,
                                column: 37
                              }
                            }
                          },
                          start: 23,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          }
                        }
                      ],
                      start: 17,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    start: 15,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  start: 15,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                }
              ],
              start: 14,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `({ *g1() {   (yield)  }})`,
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
                    name: 'g1',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                        }
                      ],
                      start: 9,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 3,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                }
              ],
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
      `function *g() { yield {...(x),}}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'FunctionDeclaration',
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
            },
            id: {
              type: 'Identifier',
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
              },
              name: 'g'
            },
            generator: true,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
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
              },
              body: [
                {
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                    type: 'YieldExpression',
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
                    },
                    delegate: false,
                    argument: {
                      type: 'ObjectExpression',
                      start: 22,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      properties: [
                        {
                          type: 'SpreadElement',
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
                          },
                          argument: {
                            type: 'Identifier',
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
                            },
                            name: 'x'
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `([yield])`,
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
                  type: 'Identifier',
                  name: 'yield',
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
              start: 1,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `function *g() {yield {     ...yield yield    };}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        },
        body: [
          {
            type: 'FunctionDeclaration',
            start: 0,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 48
              }
            },
            id: {
              type: 'Identifier',
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
              },
              name: 'g'
            },
            generator: true,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 48
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 15,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  },
                  expression: {
                    type: 'YieldExpression',
                    start: 15,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    },
                    delegate: false,
                    argument: {
                      type: 'ObjectExpression',
                      start: 21,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      },
                      properties: [
                        {
                          type: 'SpreadElement',
                          start: 27,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          },
                          argument: {
                            type: 'YieldExpression',
                            start: 30,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            },
                            delegate: false,
                            argument: {
                              type: 'YieldExpression',
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
                              },
                              delegate: false,
                              argument: null
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `function* g(x) { yield x = 3; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 3,
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
                    delegate: false,
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function* g(x) { yield x = yield 3; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 3,
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
                        delegate: false,
                        start: 27,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      start: 23,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    delegate: false,
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
                  },
                  start: 17,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              start: 15,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function* f(){ call(yield x + y); }`,
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
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'Identifier',
                      name: 'call',
                      start: 15,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'BinaryExpression',
                          left: {
                            type: 'Identifier',
                            name: 'x',
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
                          right: {
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
                          operator: '+',
                          start: 26,
                          end: 31,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 31
                            }
                          }
                        },
                        delegate: false,
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
                      }
                    ],
                    start: 15,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    }
                  },
                  start: 15,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 13,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `function* f(){ call(yield x); }`,
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
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'Identifier',
                      name: 'call',
                      start: 15,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x',
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
                        delegate: false,
                        start: 20,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 27
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
              start: 13,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function* f(){ yield x + y; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      right: {
                        type: 'Identifier',
                        name: 'y',
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
                      operator: '+',
                      start: 21,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    delegate: false,
                    start: 15,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 26
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function* f(){ yield x; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
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
                    delegate: false,
                    start: 15,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  },
                  start: 15,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                }
              ],
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      `function *g() { function f(x = yield) {}; }`,
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
                  type: 'FunctionDeclaration',
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'yield',
                        start: 31,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        }
                      },
                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    }
                  ],
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
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                },
                {
                  type: 'EmptyStatement',
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
                }
              ],
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 43
              }
            }
          }
        ],
        start: 0,
        end: 43,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 43
          }
        }
      }
    ],
    [
      `function x() { yield *y }`,
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
                      name: 'yield',
                      start: 15,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    },
                    right: {
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
                    operator: '*',
                    start: 15,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  },
                  start: 15,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                }
              ],
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
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
