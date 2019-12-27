import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Call', () => {
  for (const arg of [
    'async({a=1}. {b=2}, {c=3} = {}))',
    'yield({a=1}. {b=2}, {c=3} = {}))',
    'async(call((await[1])=> {}))',
    'async(((await[1])=> {}))',
    'async(call((await[1]) {}))',
    'a.b( c() ).d.e(()).f.g',
    'foo({a=1})',
    '(async((a), ...[b] = xxx))',
    '(async((a), ...(b) = xxx))',
    'async({a=1})',
    'yield({a=1})',
    'foo({a=1})',
    'foo(,,);',
    'foo(a,,);',
    'foo(',
    'foo().bar.',
    'foo()["bar"',
    'foo()`bar',
    'foo(,);',
    'foo(,)',
    '(async((a), ...(b)))',
    'foo(a,b,,)',
    'foo()["bar"',
    'foo().bar.',
    'foo()`bar',
    'foo(',
    'foo(...)'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `foo(...new Set([1, 2, 3, 4]))`,
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'NewExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'Set',
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
                    arguments: [
                      {
                        type: 'ArrayExpression',
                        elements: [
                          {
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
                          {
                            type: 'Literal',
                            value: 2,
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
                          {
                            type: 'Literal',
                            value: 3,
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
                          {
                            type: 'Literal',
                            value: 4,
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
                          }
                        ],
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
                    start: 7,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo(0, ...[1], 2, 3, ...[4, 5], 6, 7, 8, ...[9])`,
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
                  type: 'Literal',
                  value: 0,
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
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
                      }
                    ],
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
                {
                  type: 'Literal',
                  value: 2,
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
                  type: 'Literal',
                  value: 3,
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: 4,
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
                        type: 'Literal',
                        value: 5,
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
                  start: 21,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: 6,
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
                {
                  type: 'Literal',
                  value: 7,
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
                {
                  type: 'Literal',
                  value: 8,
                  start: 38,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 38
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: 9,
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
                    start: 44,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  start: 41,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 41
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo.bar(...[1, 2, 3, 4, 5, 6])`,
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
                type: 'MemberExpression',
                object: {
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'bar',
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
                optional: false,
                shortCircuited: false,
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
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
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
                      {
                        type: 'Literal',
                        value: 2,
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
                        type: 'Literal',
                        value: 3,
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
                        type: 'Literal',
                        value: 4,
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
                      {
                        type: 'Literal',
                        value: 5,
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
                      {
                        type: 'Literal',
                        value: 6,
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
                    start: 11,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  start: 8,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `O.nested, O.nested["returnThis"](..."test")`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    name: 'nested',
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
                  optional: false,
                  shortCircuited: false,
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
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'O',
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
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'nested',
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
                      optional: false,
                      shortCircuited: false,
                      start: 10,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    computed: true,
                    property: {
                      type: 'Literal',
                      value: 'returnThis',
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
                    optional: false,
                    shortCircuited: false,
                    start: 10,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    }
                  },
                  arguments: [
                    {
                      type: 'SpreadElement',
                      argument: {
                        type: 'Literal',
                        value: 'test',
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
                      start: 33,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    }
                  ],
                  optional: false,
                  shortCircuited: false,
                  start: 10,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
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
      `fn(a(), ...b(), ...c(), d(), e())`,
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
                name: 'fn',
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
              arguments: [
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'a',
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
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
                  start: 3,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'b',
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
                    optional: false,
                    shortCircuited: false,
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'c',
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
                    arguments: [],
                    optional: false,
                    shortCircuited: false,
                    start: 19,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  },
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
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'd',
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
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
                  start: 24,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'e',
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
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo(1, ...[2], 3)`,
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
                  type: 'Literal',
                  value: 1,
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
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
                      }
                    ],
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
                {
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
      `(async(...a, ...b))`,
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
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'b',
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
              optional: false,
              shortCircuited: false,
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
      `(async(a, ...b))`,
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
              arguments: [
                {
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'b',
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
              optional: false,
              shortCircuited: false,
              start: 1,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `(async(a, ...b = y))`,
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
              arguments: [
                {
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'b',
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
                      name: 'y',
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
                  },
                  start: 10,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `(async(...b = y, d))`,
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
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
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
                {
                  type: 'Identifier',
                  name: 'd',
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
              optional: false,
              shortCircuited: false,
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
      `async()`,
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
              arguments: [],
              optional: false,
              shortCircuited: false,
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
      `(async(...b = y, ...d))`,
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
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'd',
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `obj
    .foo
        ["bar"]
            .baz()
                .foo
                    ["bar"]()
                        .baz()()`,
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
                type: 'CallExpression',
                callee: {
                  type: 'MemberExpression',
                  object: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'MemberExpression',
                        object: {
                          type: 'CallExpression',
                          callee: {
                            type: 'MemberExpression',
                            object: {
                              type: 'MemberExpression',
                              object: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'obj',
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
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo',
                                  start: 9,
                                  end: 12,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 5
                                    },
                                    end: {
                                      line: 2,
                                      column: 8
                                    }
                                  }
                                },
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
                                    line: 2,
                                    column: 8
                                  }
                                }
                              },
                              computed: true,
                              property: {
                                type: 'Literal',
                                value: 'bar',
                                start: 22,
                                end: 27,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 9
                                  },
                                  end: {
                                    line: 3,
                                    column: 14
                                  }
                                }
                              },
                              optional: false,
                              shortCircuited: false,
                              start: 0,
                              end: 28,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 0
                                },
                                end: {
                                  line: 3,
                                  column: 15
                                }
                              }
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'baz',
                              start: 42,
                              end: 45,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 13
                                },
                                end: {
                                  line: 4,
                                  column: 16
                                }
                              }
                            },
                            optional: false,
                            shortCircuited: false,
                            start: 0,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 0
                              },
                              end: {
                                line: 4,
                                column: 16
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 0,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 0
                            },
                            end: {
                              line: 4,
                              column: 18
                            }
                          }
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 65,
                          end: 68,
                          loc: {
                            start: {
                              line: 5,
                              column: 17
                            },
                            end: {
                              line: 5,
                              column: 20
                            }
                          }
                        },
                        optional: false,
                        shortCircuited: false,
                        start: 0,
                        end: 68,
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
                      },
                      computed: true,
                      property: {
                        type: 'Literal',
                        value: 'bar',
                        start: 90,
                        end: 95,
                        loc: {
                          start: {
                            line: 6,
                            column: 21
                          },
                          end: {
                            line: 6,
                            column: 26
                          }
                        }
                      },
                      optional: false,
                      shortCircuited: false,
                      start: 0,
                      end: 96,
                      loc: {
                        start: {
                          line: 1,
                          column: 0
                        },
                        end: {
                          line: 6,
                          column: 27
                        }
                      }
                    },
                    arguments: [],
                    optional: false,
                    shortCircuited: false,
                    start: 0,
                    end: 98,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 6,
                        column: 29
                      }
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'baz',
                    start: 124,
                    end: 127,
                    loc: {
                      start: {
                        line: 7,
                        column: 25
                      },
                      end: {
                        line: 7,
                        column: 28
                      }
                    }
                  },
                  optional: false,
                  shortCircuited: false,
                  start: 0,
                  end: 127,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 7,
                      column: 28
                    }
                  }
                },
                arguments: [],
                optional: false,
                shortCircuited: false,
                start: 0,
                end: 129,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 7,
                    column: 30
                  }
                }
              },
              arguments: [],
              optional: false,
              shortCircuited: false,
              start: 0,
              end: 131,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 7,
                  column: 32
                }
              }
            },
            start: 0,
            end: 131,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 7,
                column: 32
              }
            }
          }
        ],
        start: 0,
        end: 131,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 32
          }
        }
      }
    ],
    [
      `async(x,)`,
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo(async,await,)`,
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
                {
                  type: 'Identifier',
                  name: 'await',
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
      `foo()(1, 2, 3, ...{})`,
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
                arguments: [],
                optional: false,
                shortCircuited: false,
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
                {
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
                {
                  type: 'Literal',
                  value: 3,
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [],
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
      `(function(obj) {}({a: 1, b: 2, ...{c: 3, d: 4}}));`,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'Identifier',
                    name: 'obj',
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
                  }
                ],
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
                id: null,
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b',
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
                      value: {
                        type: 'Literal',
                        value: 2,
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 25,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    {
                      type: 'SpreadElement',
                      argument: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'c',
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
                            value: {
                              type: 'Literal',
                              value: 3,
                              start: 38,
                              end: 39,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 39
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'd',
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
                            value: {
                              type: 'Literal',
                              value: 4,
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 41,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 41
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            }
                          }
                        ],
                        start: 34,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      },
                      start: 31,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    }
                  ],
                  start: 18,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `(function(obj) {}({a: 1, b: 2, ...null}));`,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'Identifier',
                    name: 'obj',
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
                  }
                ],
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
                id: null,
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b',
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
                      value: {
                        type: 'Literal',
                        value: 2,
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 25,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    {
                      type: 'SpreadElement',
                      argument: {
                        type: 'Literal',
                        value: null,
                        start: 34,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        }
                      },
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
                    }
                  ],
                  start: 18,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
              start: 1,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 40
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
      `call(await[1])`,
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
                name: 'call',
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
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await',
                    start: 5,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    }
                  },
                  computed: true,
                  property: {
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
                  optional: false,
                  shortCircuited: false,
                  start: 5,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
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
      `async(call(await[1]))`,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'call',
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
                  arguments: [
                    {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'await',
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
                      computed: true,
                      property: {
                        type: 'Literal',
                        value: 1,
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
                      optional: false,
                      shortCircuited: false,
                      start: 11,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    }
                  ],
                  optional: false,
                  shortCircuited: false,
                  start: 6,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
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
      `foo()(1, 2, 3)`,
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
                arguments: [],
                optional: false,
                shortCircuited: false,
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
                {
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
                {
                  type: 'Literal',
                  value: 3,
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
      `async({c=3} = {})`,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'c',
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
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'c',
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
                            value: 3,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                    start: 6,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [],
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
      `foo(...a)`,
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
                  type: 'SpreadElement',
                  argument: {
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
      `foo(a)(b)(c)(d)(e)`,
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
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
                callee: {
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'CallExpression',
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'CallExpression',
                      optional: false,
                      shortCircuited: false,
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
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'b',
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
                  },
                  arguments: [
                    {
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
                    name: 'd',
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'e',
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
      `foo(a, b, c)`,
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
                {
                  type: 'Identifier',
                  name: 'b',
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
                {
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
      `foo(x,y,);`,
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
                {
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
      `foo(...a,);`,
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
                  type: 'SpreadElement',
                  argument: {
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
      `"foo", async`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'Literal',
                  value: 'foo',
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
                {
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
      `foo(a, b, ...c)`,
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
                {
                  type: 'Identifier',
                  name: 'b',
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
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'c',
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
              optional: false,
              shortCircuited: false,
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
      `async({c=3} = {})`,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'c',
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
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'c',
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
                            value: 3,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                    start: 6,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [],
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
      `async({a})`,
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
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
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
      `foo({a})`,
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
                        name: 'a',
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
                      value: {
                        type: 'Identifier',
                        name: 'a',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo({c=3} = {})`,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'c',
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
                        value: {
                          type: 'AssignmentPattern',
                          left: {
                            type: 'Identifier',
                            name: 'c',
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
                            value: 3,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                      }
                    ],
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
                  operator: '=',
                  right: {
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `foo(.200)`,
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
                  type: 'Literal',
                  value: 0.2,
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
      `foo();
     foo("foo");
     foo("foo", "bar");
     foo(bar());
     foo(bar("test"));`,
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
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 12,
                end: 15,
                loc: {
                  start: {
                    line: 2,
                    column: 5
                  },
                  end: {
                    line: 2,
                    column: 8
                  }
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 'foo',
                  start: 16,
                  end: 21,
                  loc: {
                    start: {
                      line: 2,
                      column: 9
                    },
                    end: {
                      line: 2,
                      column: 14
                    }
                  }
                }
              ],
              start: 12,
              end: 22,
              loc: {
                start: {
                  line: 2,
                  column: 5
                },
                end: {
                  line: 2,
                  column: 15
                }
              }
            },
            start: 12,
            end: 23,
            loc: {
              start: {
                line: 2,
                column: 5
              },
              end: {
                line: 2,
                column: 16
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 29,
                end: 32,
                loc: {
                  start: {
                    line: 3,
                    column: 5
                  },
                  end: {
                    line: 3,
                    column: 8
                  }
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 'foo',
                  start: 33,
                  end: 38,
                  loc: {
                    start: {
                      line: 3,
                      column: 9
                    },
                    end: {
                      line: 3,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: 'bar',
                  start: 40,
                  end: 45,
                  loc: {
                    start: {
                      line: 3,
                      column: 16
                    },
                    end: {
                      line: 3,
                      column: 21
                    }
                  }
                }
              ],
              start: 29,
              end: 46,
              loc: {
                start: {
                  line: 3,
                  column: 5
                },
                end: {
                  line: 3,
                  column: 22
                }
              }
            },
            start: 29,
            end: 47,
            loc: {
              start: {
                line: 3,
                column: 5
              },
              end: {
                line: 3,
                column: 23
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 53,
                end: 56,
                loc: {
                  start: {
                    line: 4,
                    column: 5
                  },
                  end: {
                    line: 4,
                    column: 8
                  }
                }
              },
              arguments: [
                {
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'Identifier',
                    name: 'bar',
                    start: 57,
                    end: 60,
                    loc: {
                      start: {
                        line: 4,
                        column: 9
                      },
                      end: {
                        line: 4,
                        column: 12
                      }
                    }
                  },
                  arguments: [],
                  start: 57,
                  end: 62,
                  loc: {
                    start: {
                      line: 4,
                      column: 9
                    },
                    end: {
                      line: 4,
                      column: 14
                    }
                  }
                }
              ],
              start: 53,
              end: 63,
              loc: {
                start: {
                  line: 4,
                  column: 5
                },
                end: {
                  line: 4,
                  column: 15
                }
              }
            },
            start: 53,
            end: 64,
            loc: {
              start: {
                line: 4,
                column: 5
              },
              end: {
                line: 4,
                column: 16
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 70,
                end: 73,
                loc: {
                  start: {
                    line: 5,
                    column: 5
                  },
                  end: {
                    line: 5,
                    column: 8
                  }
                }
              },
              arguments: [
                {
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'Identifier',
                    name: 'bar',
                    start: 74,
                    end: 77,
                    loc: {
                      start: {
                        line: 5,
                        column: 9
                      },
                      end: {
                        line: 5,
                        column: 12
                      }
                    }
                  },
                  arguments: [
                    {
                      type: 'Literal',
                      value: 'test',
                      start: 78,
                      end: 84,
                      loc: {
                        start: {
                          line: 5,
                          column: 13
                        },
                        end: {
                          line: 5,
                          column: 19
                        }
                      }
                    }
                  ],
                  start: 74,
                  end: 85,
                  loc: {
                    start: {
                      line: 5,
                      column: 9
                    },
                    end: {
                      line: 5,
                      column: 20
                    }
                  }
                }
              ],
              start: 70,
              end: 86,
              loc: {
                start: {
                  line: 5,
                  column: 5
                },
                end: {
                  line: 5,
                  column: 21
                }
              }
            },
            start: 70,
            end: 87,
            loc: {
              start: {
                line: 5,
                column: 5
              },
              end: {
                line: 5,
                column: 22
              }
            }
          }
        ],
        start: 0,
        end: 87,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 5,
            column: 22
          }
        }
      }
    ],
    [
      `fn(a(), ...b())`,
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
                name: 'fn',
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
              arguments: [
                {
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'Identifier',
                    name: 'a',
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
                  arguments: [],
                  start: 3,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 6
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
                      type: 'Identifier',
                      name: 'b',
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
      `foo(0)`,
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
                  type: 'Literal',
                  value: 0,
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
      `foo(false)`,
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
      `a.k();`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
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
                  name: 'k',
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
      `j(...a);`,
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
                name: 'j',
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
                    type: 'Identifier',
                    name: 'a',
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
      `a.b( c() ).d.e;`,
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
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
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
                      name: 'b',
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
                  arguments: [
                    {
                      type: 'CallExpression',
                      optional: false,
                      shortCircuited: false,
                      callee: {
                        type: 'Identifier',
                        name: 'c',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd',
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'e',
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
      `a.b( o.bar );`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
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
                  name: 'b',
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
              arguments: [
                {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'Identifier',
                    name: 'o',
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
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'bar',
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
                  start: 5,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 10
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
      `a.b( o["bar"] );`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
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
                  name: 'b',
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
              arguments: [
                {
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'Identifier',
                    name: 'o',
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
                  computed: true,
                  property: {
                    type: 'Literal',
                    value: 'bar',
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
                  start: 5,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 13
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
      `foo(async,)`,
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
      `foo("abc", async)`,
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
                  type: 'Literal',
                  value: 'abc',
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
                {
                  type: 'Identifier',
                  name: 'async',
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
      `foo(1, async,)`,
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
                  type: 'Literal',
                  value: 1,
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
                {
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
      `foo(async.await[foo])`,
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
                  type: 'MemberExpression',
                  optional: false,
                  shortCircuited: false,
                  object: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
                    object: {
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'await',
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
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 16,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
                  start: 4,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 20
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
      `foo(async.abc = await)`,
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
                  type: 'AssignmentExpression',
                  left: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
                    object: {
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'abc',
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
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'await',
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
      `foo(123, async,await,)`,
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
                  type: 'Literal',
                  value: 123,
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
                {
                  type: 'Identifier',
                  name: 'async',
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
                {
                  type: 'Identifier',
                  name: 'await',
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
      `foo("string", async / 1 -2, await,)`,
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
                  type: 'Literal',
                  value: 'string',
                  start: 4,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'async',
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
                    right: {
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
                    operator: '/',
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
                  right: {
                    type: 'Literal',
                    value: 2,
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
                  operator: '-',
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
                {
                  type: 'Identifier',
                  name: 'await',
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
      `foo(x=1,y=x,x+y)`,
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
                  type: 'AssignmentExpression',
                  left: {
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
                  operator: '=',
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
                {
                  type: 'AssignmentExpression',
                  left: {
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
                  operator: '=',
                  right: {
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
                {
                  type: 'BinaryExpression',
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
                  },
                  operator: '+',
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
      `foo(x,x=1);`,
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
                {
                  type: 'AssignmentExpression',
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
                  operator: '=',
                  right: {
                    type: 'Literal',
                    value: 1,
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
      `a.replace(/ /g, "")`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
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
                  name: 'replace',
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
              arguments: [
                {
                  type: 'Literal',
                  value: / /g,
                  regex: {
                    pattern: ' ',
                    flags: 'g'
                  },
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
                {
                  type: 'Literal',
                  value: '',
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
      `foo(a)(b)`,
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
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'b',
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
      `foo(a, b, c)`,
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
                {
                  type: 'Identifier',
                  name: 'b',
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
                {
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
      `async(a)(s)(y)(n)(c)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
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
              },
              callee: {
                type: 'CallExpression',
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
                },
                callee: {
                  type: 'CallExpression',
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
                  },
                  callee: {
                    type: 'CallExpression',
                    optional: false,
                    shortCircuited: false,
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
                    },
                    callee: {
                      type: 'CallExpression',
                      optional: false,
                      shortCircuited: false,
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
                      callee: {
                        type: 'Identifier',
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
                        name: 'async'
                      },
                      arguments: [
                        {
                          type: 'Identifier',
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
                          },
                          name: 'a'
                        }
                      ]
                    },
                    arguments: [
                      {
                        type: 'Identifier',
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
                        },
                        name: 's'
                      }
                    ]
                  },
                  arguments: [
                    {
                      type: 'Identifier',
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
                      },
                      name: 'y'
                    }
                  ]
                },
                arguments: [
                  {
                    type: 'Identifier',
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
                    },
                    name: 'n'
                  }
                ]
              },
              arguments: [
                {
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
                  name: 'c'
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `async(async(async(async(async(async())))))`,
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
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'Identifier',
                    name: 'async',
                    start: 6,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  arguments: [
                    {
                      type: 'CallExpression',
                      optional: false,
                      shortCircuited: false,
                      callee: {
                        type: 'Identifier',
                        name: 'async',
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
                          type: 'CallExpression',
                          optional: false,
                          shortCircuited: false,
                          callee: {
                            type: 'Identifier',
                            name: 'async',
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
                          arguments: [
                            {
                              type: 'CallExpression',
                              optional: false,
                              shortCircuited: false,
                              callee: {
                                type: 'Identifier',
                                name: 'async',
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
                              arguments: [
                                {
                                  type: 'CallExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  callee: {
                                    type: 'Identifier',
                                    name: 'async',
                                    start: 30,
                                    end: 35,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 30
                                      },
                                      end: {
                                        line: 1,
                                        column: 35
                                      }
                                    }
                                  },
                                  arguments: [],
                                  start: 30,
                                  end: 37,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 30
                                    },
                                    end: {
                                      line: 1,
                                      column: 37
                                    }
                                  }
                                }
                              ],
                              start: 24,
                              end: 38,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 24
                                },
                                end: {
                                  line: 1,
                                  column: 38
                                }
                              }
                            }
                          ],
                          start: 18,
                          end: 39,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 39
                            }
                          }
                        }
                      ],
                      start: 12,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    }
                  ],
                  start: 6,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 41
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
      `(async(...b = y, ...d))`,
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
            type: 'ExpressionStatement',
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
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
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
              },
              callee: {
                type: 'Identifier',
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
                },
                name: 'async'
              },
              arguments: [
                {
                  type: 'SpreadElement',
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
                  },
                  argument: {
                    type: 'AssignmentExpression',
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
                    },
                    operator: '=',
                    left: {
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
                      name: 'b'
                    },
                    right: {
                      type: 'Identifier',
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
                      },
                      name: 'y'
                    }
                  }
                },
                {
                  type: 'SpreadElement',
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
                  },
                  argument: {
                    type: 'Identifier',
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
                    },
                    name: 'd'
                  }
                }
              ]
            }
          }
        ],
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
