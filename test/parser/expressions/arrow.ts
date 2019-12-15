import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Expressions - Arrow', () => {
  for (const [source, ctx] of [
    [`([a]) => { let a; }`, Context.OptionsDisableWebCompat],
    ['([a]) => { let a; }', Context.OptionsDisableWebCompat],
    ['({a}) => { let a; }', Context.OptionsDisableWebCompat],
    ['(a) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['([a]) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['({a}) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['() => { let a; var a; }', Context.OptionsDisableWebCompat],
    ['([a, a]) => 0;', Context.OptionsDisableWebCompat],
    ['({a, a}) => 0;', Context.OptionsDisableWebCompat],
    ['([a],...a)=>0', Context.OptionsDisableWebCompat],
    ['(a,...a)=>0', Context.OptionsDisableWebCompat],
    ['([a],...a)=>0', Context.OptionsDisableWebCompat],
    ['(x) => { let x }', Context.OptionsDisableWebCompat],
    ['(x) => { const x = y }', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(a, a) => {}', Context.OptionsDisableWebCompat],
    ['(a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, a) => {}', Context.OptionsDisableWebCompat],
    ['(a, a, b) => {}', Context.OptionsDisableWebCompat],
    ['a => const a', Context.OptionsDisableWebCompat],
    ['a => const [a]', Context.OptionsDisableWebCompat],
    ['a => const {a}', Context.OptionsDisableWebCompat],
    ['a => let {a}', Context.OptionsDisableWebCompat],
    ['async a => let {a}', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.Empty],
    ['let => { let let }', Context.Empty],
    ['const let => { let }', Context.Empty],
    ['(a, a) => {}', Context.Empty],
    ['(a, b, a) => {}', Context.Empty],
    ['(b, a, a) => {}', Context.Empty],
    ['(a, a, b) => {}', Context.Empty],
    ['a => const a', Context.Empty],
    ['a => const [a]', Context.Empty | Context.Strict | Context.Module],
    ['a => const {a}', Context.Empty | Context.Strict | Context.Module],
    ['a => let {a}', Context.Empty | Context.Strict | Context.Module],
    ['async a => let {a}', Context.Empty | Context.Strict | Context.Module],
    ['([b, a, b, a]) => {}', Context.Empty],
    ['([b, a], b) => {}', Context.Empty],
    ['([b, a], {b}) => {}', Context.Empty],
    ['([b, a], b=x) => {}', Context.Empty],
    ['([a], a, ...b) => {}', Context.Empty],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.Strict | Context.OptionsDisableWebCompat],
    ['({y: x, x}) => 1;', Context.OptionsDisableWebCompat],
    ['({y: x}, ...x) => 1;', Context.OptionsDisableWebCompat],
    ['a = b => { let b; }', Context.OptionsDisableWebCompat],
    ['(a = b => { let b; })', Context.OptionsDisableWebCompat],
    ['yield => { let yield; }', Context.OptionsDisableWebCompat],
    ['({x: x, x: x}) => a', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.Strict | Context.OptionsDisableWebCompat],
    ['({y: x, x}) => 1;', Context.Empty],
    ['({y: x}, ...x) => 1;', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['a = b => { let b; }', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(a = b => { let b; })', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['yield => { let yield; }', Context.OptionsDisableWebCompat | Context.Strict],
    ['({x: x, x: x}) => a', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['await => { let await; }', Context.OptionsDisableWebCompat],
    ['({x: y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['async ({x: y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['({"x": x, x: x}) => a', Context.OptionsDisableWebCompat],
    ['({"x": y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['({1: x, 2: x}) => a', Context.OptionsDisableWebCompat],
    ['({2: y, "x": x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['(a) => { let a; }', Context.OptionsDisableWebCompat],
    ['([b, a], b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b=x) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], ...b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], {b}) => {}', Context.OptionsDisableWebCompat],
    ['(a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(x) => { const x = y }', Context.OptionsDisableWebCompat],
    ['(x) => { let x }', Context.OptionsDisableWebCompat],
    ['yield => let yield', Context.OptionsDisableWebCompat],
    ['a => { let a }', Context.OptionsDisableWebCompat],
    ['a => { const a }', Context.OptionsDisableWebCompat],
    ['a => const [a]', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => const {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => let {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['async a => let {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['yield => let yield', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => { let a }', Context.OptionsDisableWebCompat | Context.Module | Context.Strict | Context.OptionsNext],
    ['a => { const a }', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => { let [a] = x; }', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => { let {a} = x }', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => { let [a] = x; }', Context.OptionsDisableWebCompat],
    ['a => { let {a} = x }', Context.OptionsDisableWebCompat],
    ['a => {  const a = y; function x(){}  }', Context.OptionsDisableWebCompat],
    ['({a}) => { let a; }', Context.OptionsDisableWebCompat],
    ['({x:x, x:x}) => {}', Context.OptionsDisableWebCompat],
    ['([x, x]) => {}', Context.OptionsDisableWebCompat],
    ['([x], [x]) => {}', Context.OptionsDisableWebCompat],
    ['([x], {x:x}) => {}', Context.OptionsDisableWebCompat],
    ['([x], x) => {}', Context.OptionsDisableWebCompat],
    ['(x, [x]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], ...b) => {}', Context.OptionsDisableWebCompat],
    ['() => { let x; var x; }', Context.OptionsDisableWebCompat],
    ['() => { var x; let x; }', Context.OptionsDisableWebCompat],
    ['(a, a = b) => {}', Context.OptionsDisableWebCompat],
    ['([foo], [foo]) => {}', Context.OptionsDisableWebCompat],
    ['([foo] = x, [foo] = y) => {}', Context.OptionsDisableWebCompat],
    ['({foo} = x, {foo}) => {}', Context.OptionsDisableWebCompat],
    ['([{foo}] = x, {foo}) => {}', Context.OptionsDisableWebCompat],
    ['([{foo}] = x, [{foo}]) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, ...a) => {}', Context.OptionsDisableWebCompat],
    ['([a, a]) => {}', Context.OptionsDisableWebCompat],
    ['a => { let a; }', Context.OptionsDisableWebCompat],
    ['([a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, a]) => {}', Context.OptionsDisableWebCompat],
    ['([a, a, b]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], {b}) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b=x) => {}', Context.OptionsDisableWebCompat],
    ['([a], a, ...b) => {}', Context.OptionsDisableWebCompat]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `let => { function x() {} }`,
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
                body: [
                  {
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
                  }
                ],
                start: 7,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 7
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
                  name: 'let',
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
              async: false,
              expression: false,
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
      `let, let => { function x() {} }`,
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
                  type: 'Identifier',
                  name: 'let',
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
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
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
                      }
                    ],
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
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'let',
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
                  async: false,
                  expression: false,
                  start: 5,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
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
      `(x) => { function x() {} }`,
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
                body: [
                  {
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
                  }
                ],
                start: 7,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 7
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
                }
              ],
              async: false,
              expression: false,
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
      `(x) => { var x; }`,
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
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `x => { function x() {} }`,
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
                    async: false,
                    generator: false,
                    id: {
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
                  }
                ],
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
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `g => { try {}  catch (g) {} }`,
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
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: [],
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
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'Identifier',
                        name: 'g',
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
                    },
                    finalizer: null,
                    start: 7,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
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
                  name: 'g',
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
              expression: false,
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
      `g => { try {} catch ([g]) {} }`,
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
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: [],
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
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'g',
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
                          }
                        ],
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
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 26,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      },
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
                    },
                    finalizer: null,
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
                  }
                ],
                start: 5,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              expression: false,
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
      `() => { let foo; }; foo => {}`,
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
                  }
                ],
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
              },
              params: [],
              async: false,
              expression: false,
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
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
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
                }
              ],
              async: false,
              expression: false,
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
      `async a => let [a]`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'let',
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
                computed: true,
                property: {
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
              },
              params: [
                {
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
                }
              ],
              async: true,
              expression: true,
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
      `a => { let {b} = a }`,
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
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
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
                        id: {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
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
                              value: {
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true,
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
                start: 5,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `a => { for (let a of b) c }`,
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
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Identifier',
                        name: 'c',
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
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
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
                    right: {
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
                    await: false,
                    start: 7,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    }
                  }
                ],
                start: 5,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              params: [
                {
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
                }
              ],
              async: false,
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
      `() => { let foo; }; foo => {}`,
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
                  }
                ],
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
              },
              params: [],
              async: false,
              expression: false,
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
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
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
                }
              ],
              async: false,
              expression: false,
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
      `g => { try {} catch ([g]) {} }`,
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
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: [],
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
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'g',
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
                          }
                        ],
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
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 26,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      },
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
                    },
                    finalizer: null,
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
                  }
                ],
                start: 5,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              expression: false,
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
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],

    [
      `()=>x;`,
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
              params: [],
              async: false,
              expression: true,
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
      `(x)=>{x}`,
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
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
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
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `yield => {}`,
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
      `foo => {}`,
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
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
