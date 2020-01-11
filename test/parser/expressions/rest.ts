import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Rest', () => {
  for (const arg of [
    'let { ...x = y } = z;',
    'let { a, ...b, c } = x;',
    'let {...obj1,...obj2} = foo',
    'let {...obj1,a} = foo',
    'let {...(obj)} = foo',
    '({...(a,b)}) => {}',
    'let {...obj1,} = foo',
    'let {...(a,b)} = foo',
    '({...x = 1} = {})',
    'var {...x = 1} = {}',
    'function test({...x = 1}) {}',
    '({...[]} = {})',
    '({...{}} = {})',
    '({...(obj)}) => {}',
    '({...(a,b)}) => {}',
    '({...[a,b]} = foo)',
    '({...{a,b}} = foo)',
    '({...(a,b)} = foo)',
    'let {...(a,b)} = foo',
    'let {...(obj)} = foo',
    'let {...obj1,...obj2} = foo',
    'let {...obj1,a} = foo',
    'let {...obj1,} = foo',
    'let { ...x = y } = z;',
    'let { a, ...b, c } = x;',
    // Object rest element needs to be the last AssignmenProperty in ObjectAssignmentPattern.
    '{...rest, b}',
    'function test({...[]}) {}',
    'var {...[]} = {}',
    'function test({...{a}}) {}',
    // Babylon PR: https://github.com/babel/babylon/issues/667
    ' ( {...{}} = {} ) ',
    // Babylon issue: https://github.com/babel/babylon/issues/661
    'let {...{}} = {};',
    '({...[a,b]}) => {}',
    '({...obj1,a} = foo)',
    '({...obj1,} = foo)',
    'let {...[a,b]} = foo',
    'let {...{a,b}} = foo',
    '(a, ...b, ...rest) => {};',
    'function foo(...a, ...[b]) {}',
    '(...rest = ...NaN) => {};',
    '[...x,] = [1,2,3];',
    '[...x, y] = [1,2,3];',
    'function foo(...[a],) {}',
    'var x = class { set setter(...x) {} }',
    'function foo(...[a], ...b) {}',
    'function foo(a, ...b, c) => {}',
    'var obj = class { method(a, b = 1, ...c = [2,3]) {} };',
    'function f(a, ...[b]) { "use strict"; }',
    '(a = ...NaN, b = [...[1,2,3]], ...rest) => {};',
    'function f(a, ...b = 0);',
    'function f(a, ...b, c);'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `function f(...b) {};`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
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
                start: 11,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
            body: {
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
            type: 'EmptyStatement',
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
      `function multiElementWithInitializer(...{a: r = 0, b: s, c: t = 1}) {}`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'r'
                        },
                        right: {
                          type: 'Literal',
                          value: 0
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b'
                      },
                      value: {
                        type: 'Identifier',
                        name: 's'
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'c'
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 't'
                        },
                        right: {
                          type: 'Literal',
                          value: 1
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: []
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithInitializer'
            }
          }
        ]
      }
    ],
    [
      `function multiElementWithInitializer(...{a: r = 0, b: s, c: t = 1}) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'r',
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
                        right: {
                          type: 'Literal',
                          value: 0,
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
                        },
                        start: 44,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 44
                          },
                          end: {
                            line: 1,
                            column: 49
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 41,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b',
                        start: 51,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 51
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 's',
                        start: 54,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 54
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 51,
                      end: 55,
                      loc: {
                        start: {
                          line: 1,
                          column: 51
                        },
                        end: {
                          line: 1,
                          column: 55
                        }
                      }
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'c',
                        start: 57,
                        end: 58,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 58
                          }
                        }
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 't',
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
                        right: {
                          type: 'Literal',
                          value: 1,
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
                        start: 60,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 60
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 57,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 57
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    }
                  ],
                  start: 40,
                  end: 66,
                  loc: {
                    start: {
                      line: 1,
                      column: 40
                    },
                    end: {
                      line: 1,
                      column: 66
                    }
                  }
                },
                start: 37,
                end: 66,
                loc: {
                  start: {
                    line: 1,
                    column: 37
                  },
                  end: {
                    line: 1,
                    column: 66
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 68,
              end: 70,
              loc: {
                start: {
                  line: 1,
                  column: 68
                },
                end: {
                  line: 1,
                  column: 70
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithInitializer',
              start: 9,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 0,
            end: 70,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 70
              }
            }
          }
        ],
        start: 0,
        end: 70,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 70
          }
        }
      }
    ],
    [
      `function multiElementWithArray(...{p: [a], b, q: [c]}) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'p',
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
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'a',
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
                          }
                        ],
                        start: 38,
                        end: 41,
                        loc: {
                          start: {
                            line: 1,
                            column: 38
                          },
                          end: {
                            line: 1,
                            column: 41
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 35,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    {
                      type: 'Property',
                      key: {
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'q',
                        start: 46,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 46
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        }
                      },
                      value: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'c',
                            start: 50,
                            end: 51,
                            loc: {
                              start: {
                                line: 1,
                                column: 50
                              },
                              end: {
                                line: 1,
                                column: 51
                              }
                            }
                          }
                        ],
                        start: 49,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 49
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 46,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 46
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    }
                  ],
                  start: 34,
                  end: 53,
                  loc: {
                    start: {
                      line: 1,
                      column: 34
                    },
                    end: {
                      line: 1,
                      column: 53
                    }
                  }
                },
                start: 31,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 31
                  },
                  end: {
                    line: 1,
                    column: 53
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 55,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 55
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
              name: 'multiElementWithArray',
              start: 9,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 30
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
      `function multiElementWithObject(...{a: {p: q}, b: {r}, c: {s = 0}}) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'p',
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
                            value: {
                              type: 'Identifier',
                              name: 'q',
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 40,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 40
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            }
                          }
                        ],
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b',
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
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'r',
                              start: 51,
                              end: 52,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 51
                                },
                                end: {
                                  line: 1,
                                  column: 52
                                }
                              }
                            },
                            value: {
                              type: 'Identifier',
                              name: 'r',
                              start: 51,
                              end: 52,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 51
                                },
                                end: {
                                  line: 1,
                                  column: 52
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
                            start: 51,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 51
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            }
                          }
                        ],
                        start: 50,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'c',
                        start: 55,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 55
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        }
                      },
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 's',
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
                            value: {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 's',
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
                              right: {
                                type: 'Literal',
                                value: 0,
                                start: 63,
                                end: 64,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 63
                                  },
                                  end: {
                                    line: 1,
                                    column: 64
                                  }
                                }
                              },
                              start: 59,
                              end: 64,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 59
                                },
                                end: {
                                  line: 1,
                                  column: 64
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
                            start: 59,
                            end: 64,
                            loc: {
                              start: {
                                line: 1,
                                column: 59
                              },
                              end: {
                                line: 1,
                                column: 64
                              }
                            }
                          }
                        ],
                        start: 58,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 58
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 55,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 55
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    }
                  ],
                  start: 35,
                  end: 66,
                  loc: {
                    start: {
                      line: 1,
                      column: 35
                    },
                    end: {
                      line: 1,
                      column: 66
                    }
                  }
                },
                start: 32,
                end: 66,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 66
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 68,
              end: 70,
              loc: {
                start: {
                  line: 1,
                  column: 68
                },
                end: {
                  line: 1,
                  column: 70
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithObject',
              start: 9,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 70,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 70
              }
            }
          }
        ],
        start: 0,
        end: 70,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 70
          }
        }
      }
    ],
    [
      `function empty(...[]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [],
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
              name: 'empty',
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
      `function emptyWithArray(...[[]]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [],
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
                    }
                  ],
                  start: 27,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
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
              }
            ],
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
              name: 'emptyWithArray',
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
      `function emptyWithObject(...[{}]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ObjectPattern',
                      properties: [],
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
                    }
                  ],
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
                start: 25,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 25
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              }
            ],
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
              name: 'emptyWithObject',
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
      `function emptyWithRest(...[...[]]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [],
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
                    }
                  ],
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
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'emptyWithRest',
              start: 9,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 22
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
      `function singleElement(...[a]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    }
                  ],
                  start: 26,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 29
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
            id: {
              type: 'Identifier',
              name: 'singleElement',
              start: 9,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 22
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
      `function singleElementWithInitializer(...[a = 0]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      right: {
                        type: 'Literal',
                        value: 0,
                        start: 46,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 46
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        }
                      },
                      start: 42,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 42
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    }
                  ],
                  start: 41,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 41
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
            body: {
              type: 'BlockStatement',
              body: [],
              start: 50,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 50
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
              name: 'singleElementWithInitializer',
              start: 9,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
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
      `function singleElementWithArray(...[[a]]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'a',
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
                        }
                      ],
                      start: 36,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
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
                start: 32,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 32
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
              name: 'singleElementWithArray',
              start: 9,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
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
      `function singleElementWithRest(...[...a]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'a',
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
                    }
                  ],
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
              name: 'singleElementWithRest',
              start: 9,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
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
      `function multiElementWithInitializer(...[a = 0, b, c = 1]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      right: {
                        type: 'Literal',
                        value: 0,
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
                      },
                      start: 41,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'b',
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
                    },
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'c',
                        start: 51,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 51
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      },
                      right: {
                        type: 'Literal',
                        value: 1,
                        start: 55,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 55
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        }
                      },
                      start: 51,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 51
                        },
                        end: {
                          line: 1,
                          column: 56
                        }
                      }
                    }
                  ],
                  start: 40,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 40
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                },
                start: 37,
                end: 57,
                loc: {
                  start: {
                    line: 1,
                    column: 37
                  },
                  end: {
                    line: 1,
                    column: 57
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 59,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 59
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithInitializer',
              start: 9,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 0,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 61
              }
            }
          }
        ],
        start: 0,
        end: 61,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 61
          }
        }
      }
    ],
    [
      `function multiElementWithObject(...[{p: q}, {r}, {s = 0}]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'p',
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
                          value: {
                            type: 'Identifier',
                            name: 'q',
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 37,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          }
                        }
                      ],
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
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'r',
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
                          },
                          value: {
                            type: 'Identifier',
                            name: 'r',
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
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
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
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 's',
                            start: 50,
                            end: 51,
                            loc: {
                              start: {
                                line: 1,
                                column: 50
                              },
                              end: {
                                line: 1,
                                column: 51
                              }
                            }
                          },
                          value: {
                            type: 'AssignmentPattern',
                            left: {
                              type: 'Identifier',
                              name: 's',
                              start: 50,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 50
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              }
                            },
                            right: {
                              type: 'Literal',
                              value: 0,
                              start: 54,
                              end: 55,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 54
                                },
                                end: {
                                  line: 1,
                                  column: 55
                                }
                              }
                            },
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
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
                        }
                      ],
                      start: 49,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 49
                        },
                        end: {
                          line: 1,
                          column: 56
                        }
                      }
                    }
                  ],
                  start: 35,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 35
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                },
                start: 32,
                end: 57,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 57
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 59,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 59
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithObject',
              start: 9,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 61
              }
            }
          }
        ],
        start: 0,
        end: 61,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 61
          }
        }
      }
    ],
    [
      `function multiElementWithLeading(x, y, ...[a, b, c]) {}`,
      Context.OptionsLoc,
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
              {
                type: 'Identifier',
                name: 'y',
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
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a',
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
                    {
                      type: 'Identifier',
                      name: 'b',
                      start: 46,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 46
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'c',
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
                    }
                  ],
                  start: 42,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 51
                    }
                  }
                },
                start: 39,
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 39
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 53,
              end: 55,
              loc: {
                start: {
                  line: 1,
                  column: 53
                },
                end: {
                  line: 1,
                  column: 55
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'multiElementWithLeading',
              start: 9,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
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
      `function bf(a, ...b) {}`,
      Context.OptionsLoc,
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
                type: 'RestElement',
                argument: {
                  type: 'Identifier',
                  name: 'b',
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
              }
            ],
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
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'bf',
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
      `var obj = { method(a, b, c, ...[d]) { return [a, b, c, d]; } };`,
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
                        name: 'method',
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
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
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
                          {
                            type: 'Identifier',
                            name: 'b',
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
                            type: 'Identifier',
                            name: 'c',
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
                            type: 'RestElement',
                            argument: {
                              type: 'ArrayPattern',
                              elements: [
                                {
                                  type: 'Identifier',
                                  name: 'd',
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
                                }
                              ],
                              start: 31,
                              end: 34,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 31
                                },
                                end: {
                                  line: 1,
                                  column: 34
                                }
                              }
                            },
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
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ReturnStatement',
                              argument: {
                                type: 'ArrayExpression',
                                elements: [
                                  {
                                    type: 'Identifier',
                                    name: 'a',
                                    start: 46,
                                    end: 47,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 46
                                      },
                                      end: {
                                        line: 1,
                                        column: 47
                                      }
                                    }
                                  },
                                  {
                                    type: 'Identifier',
                                    name: 'b',
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
                                  {
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
                                  {
                                    type: 'Identifier',
                                    name: 'd',
                                    start: 55,
                                    end: 56,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 55
                                      },
                                      end: {
                                        line: 1,
                                        column: 56
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
                              start: 38,
                              end: 58,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 58
                                }
                              }
                            }
                          ],
                          start: 36,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        },
                        async: false,
                        generator: false,
                        id: null,
                        start: 18,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
                      start: 12,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      }
                    }
                  ],
                  start: 10,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'obj',
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
                end: 62,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 62
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
      `function objRest(...{'0': a, '1': b, length}) { return [a, b, length]; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Literal',
                        value: '0',
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Literal',
                        value: '1',
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
                      value: {
                        type: 'Identifier',
                        name: 'b',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 29,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'length',
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
                      value: {
                        type: 'Identifier',
                        name: 'length',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
                  start: 20,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                },
                start: 17,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'a',
                        start: 56,
                        end: 57,
                        loc: {
                          start: {
                            line: 1,
                            column: 56
                          },
                          end: {
                            line: 1,
                            column: 57
                          }
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'b',
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
                      {
                        type: 'Identifier',
                        name: 'length',
                        start: 62,
                        end: 68,
                        loc: {
                          start: {
                            line: 1,
                            column: 62
                          },
                          end: {
                            line: 1,
                            column: 68
                          }
                        }
                      }
                    ],
                    start: 55,
                    end: 69,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 69
                      }
                    }
                  },
                  start: 48,
                  end: 70,
                  loc: {
                    start: {
                      line: 1,
                      column: 48
                    },
                    end: {
                      line: 1,
                      column: 70
                    }
                  }
                }
              ],
              start: 46,
              end: 72,
              loc: {
                start: {
                  line: 1,
                  column: 46
                },
                end: {
                  line: 1,
                  column: 72
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'objRest',
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
            start: 0,
            end: 72,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 72
              }
            }
          }
        ],
        start: 0,
        end: 72,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 72
          }
        }
      }
    ],
    [
      `function foo(a, b, c, ...[d]) { arguments; return [a, b, c, d]; }`,
      Context.OptionsLoc,
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
              {
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
              {
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
              {
                type: 'RestElement',
                argument: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'd',
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
                    }
                  ],
                  start: 25,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 28
                    }
                  }
                },
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'arguments',
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
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'a',
                        start: 51,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 51
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'b',
                        start: 54,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 54
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'c',
                        start: 57,
                        end: 58,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 58
                          }
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'd',
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
                      }
                    ],
                    start: 50,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 43,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 43
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  }
                }
              ],
              start: 30,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 30
                },
                end: {
                  line: 1,
                  column: 65
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
