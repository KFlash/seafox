import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Statements - Fail', [
  ['continue foo', Context.Empty],
  ['foo: { do continue foo; while(z) }', Context.Empty],
  ['foo: if (x) do continue foo; while(z)', Context.Empty],
  ['do continue foo; while(z)', Context.Empty],
  ['do foo: continue foo; while(z)', Context.Empty],
  ['do do continue foo; while(z); while(z)', Context.Empty],
  ['for(;;) continue foo', Context.Empty],
  ['foo: { for(;;) continue foo }', Context.Empty],
  ['foo: if (x) for(;;) continue foo', Context.Empty],
  ['foo: { while(z) continue foo }', Context.Empty],
  ['foo: if (x) while(z) continue foo', Context.Empty],
  ['foo: if (x) while(z) continue foo', Context.Strict | Context.Module],
  ['while(z) continue foo', Context.Empty],
  ['while(z) foo: continue foo', Context.Empty],
  ['for (;;) while(z) continue foo', Context.Empty],
  ['x: foo; while (true) continue x;', Context.Empty],
  ['while (true) continue x;', Context.Empty],
  ['while (true) while (true) { x: continue x; }', Context.Empty],
  ['while (true) while (true) x: continue x;', Context.Empty],
  ['() => { switch (x){ case z:       continue y   }}', Context.Empty],
  ['() => { switch (x){ case z:       if (x) continue y   }}', Context.Empty],
  ['() => { switch (x){ case z:       continue    }}', Context.Empty],
  ['function f(){ switch (x){ case z:       { continue }    }}', Context.Empty],
  ['function f(){ switch (x){ case z:       if (x) continue   }}', Context.Empty],
  ['switch (x){ case z:    { continue }  }', Context.Empty],
  ['switch (x){ case z:    continue y   }', Context.Empty],
  ['for (x of 3) continue/', Context.Empty],
  ['for (x of 3) continue/x', Context.Empty],
  ['continue foo;continue;', Context.Empty],
  ['witch (x) { case x: continue foo; }', Context.Empty],
  ['switch (x) { default: continue foo; }', Context.Empty],
  ['switch (x) { case x: if (foo) {continue foo;} }', Context.Empty],
  ['switch (x) { case x: if (foo) continue foo; }', Context.Empty],
  ['switch (x) { case x: continue; }', Context.Empty],
  ['switch (x) { default: continue; }', Context.Empty],
  ['switch (x) { case x: {continue;} }', Context.Empty],
  ['switch (x) { case x: if (foo) continue; }', Context.Empty],
  [
    `for (x of 3) continue
    /`,
    Context.Empty
  ],
  [
    `continue
    continue;`,
    Context.Empty
  ],
  [
    `continue foo
    continue;`,
    Context.Empty
  ],
  ['for (;;) while(z) continue foo', Context.Empty],
  ['for (;;) while(z) continue foo', Context.Empty],

  ['do     continue y   ; while(true);', Context.Empty],
  ['for (;;)    continue y ', Context.Empty],
  ['switch (x) { case x: continue foo; }', Context.Empty],
  ['do {  test262: {  continue test262; } } while (a)', Context.Empty],
  ['switch (x) { default: continue foo; }', Context.Empty],
  ['do {  test262: {  continue test262; } } while (a)', Context.Empty],
  ['do {  test262: {  continue test262; } } while (a)', Context.Empty],
  [
    `try{
                          loop : do {
                            x++;
                            throw "gonna leave it";
                            y++;
                          } while(0);
                          } catch(e){
                          continue loop2;
                          loop2 : do {
                            x++;
                            y++;
                          } while(0);
                          };`,
    Context.Empty
  ],
  ['ce: while(true) { continue fapper; }', Context.Empty]
]);

pass('Statements - Continue (pass)', [
  [
    `for (x of 3) continue
    /x/g`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      body: [
        {
          await: false,
          body: {
            end: 21,
            label: null,
            loc: {
              end: {
                column: 21,
                line: 1
              },
              start: {
                column: 13,
                line: 1
              }
            },
            start: 13,
            type: 'ContinueStatement'
          },
          end: 21,
          left: {
            end: 6,
            loc: {
              end: {
                column: 6,
                line: 1
              },
              start: {
                column: 5,
                line: 1
              }
            },
            name: 'x',
            start: 5,
            type: 'Identifier'
          },
          loc: {
            end: {
              column: 21,
              line: 1
            },
            start: {
              column: 0,
              line: 1
            }
          },
          right: {
            end: 11,
            loc: {
              end: {
                column: 11,
                line: 1
              },
              start: {
                column: 10,
                line: 1
              }
            },
            start: 10,
            type: 'Literal',
            value: 3
          },
          start: 0,
          type: 'ForOfStatement'
        },
        {
          end: 30,
          expression: {
            end: 30,
            loc: {
              end: {
                column: 8,
                line: 2
              },
              start: {
                column: 4,
                line: 2
              }
            },
            regex: {
              flags: 'g',
              pattern: 'x'
            },
            start: 26,
            type: 'Literal',
            value: /x/g
          },
          loc: {
            end: {
              column: 8,
              line: 2
            },
            start: {
              column: 4,
              line: 2
            }
          },
          start: 26,
          type: 'ExpressionStatement'
        }
      ],
      end: 30,
      loc: {
        end: {
          column: 8,
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
    `foo: bar: do continue foo; while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 22,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                start: 13,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 10,
              test: {
                type: 'Identifier',
                name: 'z',
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
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            start: 5,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `while (true) { x: while (true) continue x; }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Literal',
            value: true,
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
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'LabeledStatement',
                label: {
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
                body: {
                  type: 'WhileStatement',
                  test: {
                    type: 'Literal',
                    value: true,
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
                  body: {
                    type: 'ContinueStatement',
                    label: {
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
                    start: 31,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  },
                  start: 18,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  }
                },
                start: 15,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              }
            ],
            start: 13,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 44
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
    `foo: while (true) while (x) continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'x',
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
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 37,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                },
                start: 28,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              start: 18,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            start: 5,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 41
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
    `bar: foo: while (true) continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true,
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
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
              start: 10,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 5,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 36
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
    `ding: foo: bar: while (true) continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
            type: 'Identifier',
            name: 'ding',
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'LabeledStatement',
              label: {
                type: 'Identifier',
                name: 'bar',
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
              body: {
                type: 'WhileStatement',
                test: {
                  type: 'Literal',
                  value: true,
                  start: 23,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                },
                body: {
                  type: 'ContinueStatement',
                  label: {
                    type: 'Identifier',
                    name: 'foo',
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
                  start: 29,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 29
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
              },
              start: 11,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            start: 6,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 6
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
    `x: while (true) while (true) continue x;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true,
                start: 23,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'x',
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
                start: 29,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 40
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
            start: 3,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 40
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
    `foo: do continue foo; while(true)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: {
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
              start: 8,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            start: 5,
            test: {
              type: 'Literal',
              value: true,
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
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `async function f(){ foo: for await (x of y) continue foo; }`,
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
                type: 'LabeledStatement',
                label: {
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
                },
                body: {
                  type: 'ForOfStatement',
                  body: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 53,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 53
                        },
                        end: {
                          line: 1,
                          column: 56
                        }
                      }
                    },
                    start: 44,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    }
                  },
                  left: {
                    type: 'Identifier',
                    name: 'x',
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
                  right: {
                    type: 'Identifier',
                    name: 'y',
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
                  await: true,
                  start: 25,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                },
                start: 20,
                end: 57,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 57
                  }
                }
              }
            ],
            start: 18,
            end: 59,
            loc: {
              start: {
                line: 1,
                column: 18
              },
              end: {
                line: 1,
                column: 59
              }
            }
          },
          async: true,
          generator: false,
          id: {
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
    `foo: do { bar: do continue foo;while(z) } while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'LabeledStatement',
                  label: {
                    type: 'Identifier',
                    name: 'bar',
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
                  body: {
                    type: 'DoWhileStatement',
                    body: {
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo',
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
                      start: 18,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    start: 15,
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                  start: 10,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 8,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 50
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
    `foo: do { bar: do continue bar;while(z) } while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'LabeledStatement',
                  label: {
                    type: 'Identifier',
                    name: 'bar',
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
                  body: {
                    type: 'DoWhileStatement',
                    body: {
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'bar',
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
                      start: 18,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    start: 15,
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                  start: 10,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 8,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 50
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
    `foo: do { do continue foo;while(z) } while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'DoWhileStatement',
                  body: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 22,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    },
                    start: 13,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  start: 10,
                  test: {
                    type: 'Identifier',
                    name: 'z',
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
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                }
              ],
              start: 8,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 45
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
    `foo: do continue foo;while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: {
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
              start: 8,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
    `foo: do if (x) continue foo; while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'IfStatement',
              test: {
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
              consequent: {
                type: 'ContinueStatement',
                label: {
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
              alternate: null,
              start: 8,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 37
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
    `foo: do do continue foo; while(z); while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
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
                },
                start: 11,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              start: 8,
              test: {
                type: 'Identifier',
                name: 'z',
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
            start: 5,
            test: {
              type: 'Identifier',
              name: 'z',
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
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `do { foo: do continue foo; while(z) } while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'DoWhileStatement',
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'LabeledStatement',
                label: {
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
                body: {
                  type: 'DoWhileStatement',
                  body: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 22,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    },
                    start: 13,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  start: 10,
                  test: {
                    type: 'Identifier',
                    name: 'z',
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
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                },
                start: 5,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              }
            ],
            start: 3,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 37
              }
            }
          },
          start: 0,
          test: {
            type: 'Identifier',
            name: 'z',
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
    `do foo: do continue foo; while(z); while(z)`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'DoWhileStatement',
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'DoWhileStatement',
              body: {
                type: 'ContinueStatement',
                label: {
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
                },
                start: 11,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              start: 8,
              test: {
                type: 'Identifier',
                name: 'z',
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
            start: 3,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          start: 0,
          test: {
            type: 'Identifier',
            name: 'z',
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
    `for(;;) foo: for(;;) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'ForStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 30,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                },
                start: 21,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 21
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              init: null,
              test: null,
              update: null,
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
            start: 8,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 33
              }
            }
          },
          init: null,
          test: null,
          update: null,
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
    `for(;;) { foo: for(;;) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'LabeledStatement',
                label: {
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
                body: {
                  type: 'ForStatement',
                  body: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
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
                  init: null,
                  test: null,
                  update: null,
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
                start: 10,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              }
            ],
            start: 8,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 37
              }
            }
          },
          init: null,
          test: null,
          update: null,
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
    `foo: for(;;) if (x) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'ForStatement',
            body: {
              type: 'IfStatement',
              test: {
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
              consequent: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
              },
              alternate: null,
              start: 13,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            init: null,
            test: null,
            update: null,
            start: 5,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 32
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
    `foo: for(;;) { for(;;) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'ForStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ForStatement',
                  body: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
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
                  init: null,
                  test: null,
                  update: null,
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
                }
              ],
              start: 13,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            init: null,
            test: null,
            update: null,
            start: 5,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 37
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
    `foo: bar: for(;;) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'ForStatement',
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
              },
              init: null,
              test: null,
              update: null,
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
    `foo: bar: for(;;) { for(;;) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'ForStatement',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForStatement',
                    body: {
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 37,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 37
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
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
                    },
                    init: null,
                    test: null,
                    update: null,
                    start: 20,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  }
                ],
                start: 18,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              init: null,
              test: null,
              update: null,
              start: 10,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            start: 5,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `foo: bar: while(z) { while(z) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'z',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'WhileStatement',
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 39,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      },
                      start: 30,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 21,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
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
              start: 10,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 44
                }
              }
            },
            start: 5,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 44
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
    `foo: bar: while(z) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'z',
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
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
    `foo: while(z) { bar: while(z) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'LabeledStatement',
                  label: {
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
                  body: {
                    type: 'WhileStatement',
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 39,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      },
                      start: 30,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 21,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
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
            start: 5,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 44
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
    `foo: while(z) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'ContinueStatement',
              label: {
                type: 'Identifier',
                name: 'foo',
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
            start: 5,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `while(z) foo: while(z) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'WhileStatement',
          test: {
            type: 'Identifier',
            name: 'z',
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Identifier',
                name: 'z',
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
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
            start: 9,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 9
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
    `foo: while(z) if (x) continue foo`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'IfStatement',
              test: {
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
              consequent: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 30,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                },
                start: 21,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 21
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              alternate: null,
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
            start: 5,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `foo: while(z) { while(z) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'WhileStatement',
                  test: {
                    type: 'Identifier',
                    name: 'z',
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
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
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
            start: 5,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 39
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
    `foo: while(z) { bar: while(z) continue bar }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'LabeledStatement',
                  label: {
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
                  body: {
                    type: 'WhileStatement',
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'bar',
                        start: 39,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      },
                      start: 30,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 21,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
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
            start: 5,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 44
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
    `foo: while(z) { bar: while(z) continue foo }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'LabeledStatement',
                  label: {
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
                  body: {
                    type: 'WhileStatement',
                    test: {
                      type: 'Identifier',
                      name: 'z',
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
                      type: 'ContinueStatement',
                      label: {
                        type: 'Identifier',
                        name: 'foo',
                        start: 39,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      },
                      start: 30,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 21,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
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
            start: 5,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 44
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
    `foo: for (;;) continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'ForStatement',
            body: {
              type: 'ContinueStatement',
              label: {
                type: 'Identifier',
                name: 'foo',
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
              start: 14,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            init: null,
            test: null,
            update: null,
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
    `foo: while (true) { if (x) continue foo; }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'IfStatement',
                  test: {
                    type: 'Identifier',
                    name: 'x',
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
                  consequent: {
                    type: 'ContinueStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
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
                  },
                  alternate: null,
                  start: 20,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 18,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            start: 5,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `foo: bar: while (true) continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'WhileStatement',
              test: {
                type: 'Literal',
                value: true,
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
              body: {
                type: 'ContinueStatement',
                label: {
                  type: 'Identifier',
                  name: 'foo',
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
              start: 10,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 5,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 36
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
    `do continue; while(foo);`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'DoWhileStatement',
          body: {
            type: 'ContinueStatement',
            label: null,
            start: 3,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 3
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
          test: {
            type: 'Identifier',
            name: 'foo',
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
    `foo: do continue foo; while(foo);`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: {
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
              start: 8,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            test: {
              type: 'Identifier',
              name: 'foo',
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
            start: 5,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `__proto__: while (true) { continue __proto__; }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
            type: 'Identifier',
            name: '__proto__',
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
          body: {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ContinueStatement',
                  label: {
                    type: 'Identifier',
                    name: '__proto__',
                    start: 35,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 35
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  start: 26,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                }
              ],
              start: 24,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 24
                },
                end: {
                  line: 1,
                  column: 47
                }
              }
            },
            start: 11,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 47
              }
            }
          },
          start: 0,
          end: 47,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 47
            }
          }
        }
      ],
      start: 0,
      end: 47,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 47
        }
      }
    }
  ],
  [
    `for (;;)  {  continue   }`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'ContinueStatement',
                label: null,
                start: 13,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 10,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          init: null,
          test: null,
          update: null,
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
    `foo: while(true)continue foo;`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'WhileStatement',
            test: {
              type: 'Literal',
              value: true,
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
            },
            body: {
              type: 'ContinueStatement',
              label: {
                type: 'Identifier',
                name: 'foo',
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
    `a: do continue a; while(1);`,
    Context.OptionsNext | Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'LabeledStatement',
          label: {
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
          body: {
            type: 'DoWhileStatement',
            body: {
              type: 'ContinueStatement',
              label: {
                type: 'Identifier',
                name: 'a',
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
            test: {
              type: 'Literal',
              value: 1,
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
            start: 3,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 3
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
  ]
]);
