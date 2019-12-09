import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - Break', () => {
  for (const [source, ctx] of [
    ['for (;;)    if (x) break y   }', Context.OptionsNext | Context.OptionsLoc],
    ['do     break y   ; while(true);', Context.OptionsNext | Context.OptionsLoc],
    ['x: foo; break x;', Context.OptionsNext | Context.OptionsLoc],
    ['{  break foo; var y=2; }', Context.OptionsNext | Context.OptionsLoc],
    ['loop; while (true) { break loop1; }', Context.OptionsNext | Context.OptionsLoc]
    // ['{ break }', Context.OptionsNext | Context.OptionsLoc],
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx] of [
    [
      'for (;;)    if (x) break y   }',
      'do     break y   ; while(true);',
      'x: foo; break x;',
      '{  break foo; var y=2; }',
      'loop; while (true) { break loop1; }',
      '{ break }',
      Context.OptionsNext | Context.OptionsLoc,
      {}
    ]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `foo: for (x in y) break foo;`,
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
              type: 'ForInStatement',
              body: {
                type: 'BreakStatement',
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
              left: {
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
              right: {
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
              start: 5,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 5
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
      `switch (x){ case z:    { break }  }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
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
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'z',
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
                consequent: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'BreakStatement',
                        label: null,
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
                      }
                    ],
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
      `while (true)    { break }   `,
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
                  type: 'BreakStatement',
                  label: null,
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
                }
              ],
              start: 16,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 16
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
      `ding: foo: bar: while (true) break foo;`,
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
                    type: 'BreakStatement',
                    label: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 35,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 29,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  start: 16,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                },
                start: 11,
                end: 39,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 39
                  }
                }
              },
              start: 6,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 6
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
      `switch (x) { default: break; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
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
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'BreakStatement',
                    label: null,
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
                start: 13,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 28
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
      `foo: while(true)break foo;`,
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
                type: 'BreakStatement',
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
      `L: let\nx`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [
          {
            body: {
              end: 6,
              expression: {
                end: 6,
                loc: {
                  end: {
                    column: 6,
                    line: 1
                  },
                  start: {
                    column: 3,
                    line: 1
                  }
                },
                name: 'let',
                start: 3,
                type: 'Identifier'
              },
              loc: {
                end: {
                  column: 6,
                  line: 1
                },
                start: {
                  column: 3,
                  line: 1
                }
              },
              start: 3,
              type: 'ExpressionStatement'
            },
            end: 6,
            label: {
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
              name: 'L',
              start: 0,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 6,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'LabeledStatement'
          },
          {
            end: 8,
            expression: {
              end: 8,
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
              name: 'x',
              start: 7,
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
            start: 7,
            type: 'ExpressionStatement'
          }
        ],
        end: 8,
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
