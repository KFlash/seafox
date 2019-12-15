import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - If', () => {
  for (const [source, ctx] of [
    [`if (x) async function f(){}`, Context.OptionsDisableWebCompat],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.OptionsDisableWebCompat],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.OptionsDisableWebCompat],
    [`if (x) var foo = 1; let foo = 1;`, Context.Empty],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.OptionsDisableWebCompat | Context.Module],
    [`const x = a; function x(){};`, Context.OptionsDisableWebCompat],
    [`if (x) {} else var foo = 1; let foo = 1;`, Context.OptionsDisableWebCompat],
    [`if (x) var foo = 1; else {} let foo = 1;`, Context.Empty],
    [`if (x) {} else if (y) {} else var foo = 1; let foo = 1;`, Context.Empty],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.Empty],
    ['if (true) class C {} else class D {}', Context.OptionsDisableWebCompat],
    ['if true;', Context.Empty],
    ['if(!(1))', Context.Empty],
    ['if(!(true))', Context.Empty],
    ['if(!("A"))', Context.Empty],
    ['if (x); else foo: bar: function f(){}', Context.OptionsDisableWebCompat],
    ['if (false) ; else function* g() {  }', Context.OptionsDisableWebCompat],
    ['if (true) let x; else let y;', Context.Empty],
    ['if (false) ; else class C {}', Context.OptionsDisableWebCompat],
    ['"use strict"; if (true) function f() {  } else function _f() {}', Context.OptionsDisableWebCompat],
    ['"use strict"; if (true) function f() {  } else function _f() {}', Context.Empty],
    ['if (true) const x = null;', Context.Empty],
    ['if();', Context.Empty],
    ['if (1) let x = 10;', Context.Empty]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `if (x) var foo = 1; var foo = 1;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
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
                  id: {
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
                  start: 11,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              start: 7,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            alternate: null,
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
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1,
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
                  name: 'foo',
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
              }
            ],
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
      `if (yield === void 0) { async = false; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'BinaryExpression',
              left: {
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
              right: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
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
                prefix: true,
                start: 14,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              operator: '===',
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
            },
            consequent: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'Literal',
                      value: false,
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
                    start: 24,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
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
              start: 22,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            alternate: null,
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
      `function f() { if (1) { return () => { while (true) hi(); } } }`,
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
                  type: 'IfStatement',
                  test: {
                    type: 'Literal',
                    value: 1,
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
                  consequent: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ReturnStatement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'WhileStatement',
                                test: {
                                  type: 'Literal',
                                  value: true,
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
                                body: {
                                  type: 'ExpressionStatement',
                                  expression: {
                                    type: 'CallExpression',
                                    optional: false,
                                    shortCircuited: false,
                                    callee: {
                                      type: 'Identifier',
                                      name: 'hi',
                                      start: 52,
                                      end: 54,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 52
                                        },
                                        end: {
                                          line: 1,
                                          column: 54
                                        }
                                      }
                                    },
                                    arguments: [],
                                    start: 52,
                                    end: 56,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 52
                                      },
                                      end: {
                                        line: 1,
                                        column: 56
                                      }
                                    }
                                  },
                                  start: 52,
                                  end: 57,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 52
                                    },
                                    end: {
                                      line: 1,
                                      column: 57
                                    }
                                  }
                                },
                                start: 39,
                                end: 57,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 39
                                  },
                                  end: {
                                    line: 1,
                                    column: 57
                                  }
                                }
                              }
                            ],
                            start: 37,
                            end: 59,
                            loc: {
                              start: {
                                line: 1,
                                column: 37
                              },
                              end: {
                                line: 1,
                                column: 59
                              }
                            }
                          },
                          params: [],
                          async: false,
                          expression: false,
                          start: 31,
                          end: 59,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 59
                            }
                          }
                        },
                        start: 24,
                        end: 59,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 59
                          }
                        }
                      }
                    ],
                    start: 22,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  alternate: null,
                  start: 15,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  }
                }
              ],
              start: 13,
              end: 63,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 63
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
            end: 63,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 63
              }
            }
          }
        ],
        start: 0,
        end: 63,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 63
          }
        }
      }
    ],
    [
      `if(1)/  foo/`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Literal',
              value: 1,
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Literal',
                value: /  foo/,
                regex: {
                  pattern: '  foo',
                  flags: ''
                },
                start: 5,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              start: 5,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            alternate: null,
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
      `if (foo) a; if (bar) b; else c;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'a',
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
            alternate: null,
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
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'bar',
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'b',
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
            alternate: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'c',
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
            start: 12,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 12
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
      `if (a > 2) {b = c }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'BinaryExpression',
              left: {
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
              right: {
                type: 'Literal',
                value: 2,
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
              operator: '>',
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
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
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
                }
              ],
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
            },
            alternate: null,
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
      `if(foo) a = b;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
              type: 'Identifier',
              name: 'foo',
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                left: {
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
                operator: '=',
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
            alternate: null,
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
      `if (a) function a(){}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'FunctionDeclaration',
              params: [],
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
              id: {
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
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            alternate: null,
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
      `if (foo) bar; else doo;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'bar',
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
            alternate: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'doo',
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
      `if (a) b()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
                type: 'CallExpression',
                optional: false,
                shortCircuited: false,
                callee: {
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
                arguments: [],
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
            alternate: null,
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
      `if(a)b;else c;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
              type: 'ExpressionStatement',
              expression: {
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
            alternate: {
              type: 'ExpressionStatement',
              expression: {
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
      `if (1) { eval(42) }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'IfStatement',
            test: {
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
            consequent: {
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
                      name: 'eval',
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
                    arguments: [
                      {
                        type: 'Literal',
                        value: 42,
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
                      }
                    ],
                    start: 9,
                    end: 17,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 17
                      }
                    }
                  },
                  start: 9,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                }
              ],
              start: 7,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            alternate: null,
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
      `if (true) if (false) {} else ; else {}`,
      Context.OptionsNext | Context.OptionsLoc,
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
              type: 'IfStatement',
              test: {
                type: 'Literal',
                value: false,
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
              consequent: {
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
              alternate: {
                type: 'EmptyStatement',
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
            alternate: {
              type: 'BlockStatement',
              body: [],
              start: 36,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 36
                },
                end: {
                  line: 1,
                  column: 38
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
