import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseModule } from '../../../src/seafox';

describe('Next - Import Meta', () => {
  for (const arg of [
    `import?.meta`,
    `import?.meta`,
    `(import?.meta)`,
    `(import.meta([1 = ()](x = 123)))`,
    `import.(meta([0](x = 123)))`,
    `import.meta[0]() = 123`,
    `[import.meta] = [];`,
    `[...import.meta] = [];`,
    `import.meta = 0;`,
    `async function* f() { for await (import.meta of null) ; }`,
    `for (import.meta in null) ;`,
    `({a: import.meta} = {});`,
    `({...import.meta} = {});`,
    `import.meta++;`,
    `var x, y, z; ( { import.meta } = {});`,
    `([import.meta] = [1])`,
    `var import.meta`,
    `for (var import.meta of [1]) {}`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`, {
          impliedStrict: true,
          next: true
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `if (1) { import.meta }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
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
                    type: 'MetaProperty',
                    property: {
                      type: 'Identifier',
                      name: 'meta',
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
                    meta: {
                      type: 'Identifier',
                      name: 'import',
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
                    },
                    start: 9,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  },
                  start: 9,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
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
            },
            alternate: null,
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
      `var f = function() {import.meta.couldBeMutable = true}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
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
                            type: 'MemberExpression',
                            object: {
                              type: 'MetaProperty',
                              property: {
                                type: 'Identifier',
                                name: 'meta',
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
                              meta: {
                                type: 'Identifier',
                                name: 'import',
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
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'couldBeMutable',
                              start: 32,
                              end: 46,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 32
                                },
                                end: {
                                  line: 1,
                                  column: 46
                                }
                              }
                            },
                            start: 20,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 20
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          },
                          operator: '=',
                          right: {
                            type: 'Literal',
                            value: true,
                            start: 49,
                            end: 53,
                            loc: {
                              start: {
                                line: 1,
                                column: 49
                              },
                              end: {
                                line: 1,
                                column: 53
                              }
                            }
                          },
                          start: 20,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 20
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        },
                        start: 20,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: null,
                  start: 8,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 54
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
                end: 54,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 54
                  }
                }
              }
            ],
            start: 0,
            end: 54,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 54
              }
            }
          }
        ],
        start: 0,
        end: 54,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 54
          }
        }
      }
    ],
    [
      `import.meta[0]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'MetaProperty',
                property: {
                  type: 'Identifier',
                  name: 'meta',
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
                meta: {
                  type: 'Identifier',
                  name: 'import',
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
              computed: true,
              property: {
                type: 'Literal',
                value: 0,
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
      `do { import.meta } while (0)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
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
                    property: {
                      type: 'Identifier',
                      name: 'meta',
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
                    meta: {
                      type: 'Identifier',
                      name: 'import',
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
                }
              ],
              start: 3,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            start: 0,
            test: {
              type: 'Literal',
              value: 0,
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
      `import.meta()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MetaProperty',
                property: {
                  type: 'Identifier',
                  name: 'meta',
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
                meta: {
                  type: 'Identifier',
                  name: 'import',
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
      `t = [...import.meta]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 't',
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
              operator: '=',
              right: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'SpreadElement',
                    argument: {
                      type: 'MetaProperty',
                      property: {
                        type: 'Identifier',
                        name: 'meta',
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
                      meta: {
                        type: 'Identifier',
                        name: 'import',
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
                      start: 8,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    },
                    start: 5,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  }
                ],
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
      `"use strict"; ({m() { while (0) { import.meta } }})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
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
          },
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
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'WhileStatement',
                          test: {
                            type: 'Literal',
                            value: 0,
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
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'MetaProperty',
                                  property: {
                                    type: 'Identifier',
                                    name: 'meta',
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
                                  },
                                  meta: {
                                    type: 'Identifier',
                                    name: 'import',
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
                                  start: 34,
                                  end: 45,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 34
                                    },
                                    end: {
                                      line: 1,
                                      column: 45
                                    }
                                  }
                                },
                                start: 34,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 34
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                }
                              }
                            ],
                            start: 32,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 32
                              },
                              end: {
                                line: 1,
                                column: 47
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
                    generator: false,
                    id: null,
                    start: 17,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 16,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                }
              ],
              start: 15,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            },
            start: 14,
            end: 51,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 51
              }
            }
          }
        ],
        start: 0,
        end: 51,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 51
          }
        }
      }
    ],
    [
      `delete import.meta`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MetaProperty',
                property: {
                  type: 'Identifier',
                  name: 'meta',
                  start: 14,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                meta: {
                  type: 'Identifier',
                  name: 'import',
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
              },
              prefix: true,
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
      `import.meta.resolve('something')`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'MetaProperty',
                  property: {
                    type: 'Identifier',
                    name: 'meta',
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
                  meta: {
                    type: 'Identifier',
                    name: 'import',
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
                  name: 'resolve',
                  start: 12,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
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
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 'something',
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
      `const size = import.meta.scriptElement.dataset.size || 300;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'LogicalExpression',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'MemberExpression',
                        object: {
                          type: 'MetaProperty',
                          property: {
                            type: 'Identifier',
                            name: 'meta',
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
                          meta: {
                            type: 'Identifier',
                            name: 'import',
                            start: 13,
                            end: 19,
                            loc: {
                              start: {
                                line: 1,
                                column: 13
                              },
                              end: {
                                line: 1,
                                column: 19
                              }
                            }
                          },
                          start: 13,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 13
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          }
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'scriptElement',
                          start: 25,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        },
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
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'dataset',
                        start: 39,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      },
                      start: 13,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'size',
                      start: 47,
                      end: 51,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 51
                        }
                      }
                    },
                    start: 13,
                    end: 51,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 51
                      }
                    }
                  },
                  right: {
                    type: 'Literal',
                    value: 300,
                    start: 55,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  operator: '||',
                  start: 13,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'size',
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
                start: 6,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 58
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
      `x = import.meta`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
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
              operator: '=',
              right: {
                type: 'MetaProperty',
                property: {
                  type: 'Identifier',
                  name: 'meta',
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
                meta: {
                  type: 'Identifier',
                  name: 'import',
                  start: 4,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 10
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
      `() => { import.meta }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
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
                      type: 'MetaProperty',
                      property: {
                        type: 'Identifier',
                        name: 'meta',
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
                      meta: {
                        type: 'Identifier',
                        name: 'import',
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
                      start: 8,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    },
                    start: 8,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  }
                ],
                start: 6,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              params: [],
              async: false,
              expression: false,
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
      `({m() { import.meta.url}})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'module',
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
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'MemberExpression',
                            object: {
                              type: 'MetaProperty',
                              property: {
                                type: 'Identifier',
                                name: 'meta',
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
                              meta: {
                                type: 'Identifier',
                                name: 'import',
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
                              start: 8,
                              end: 19,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 8
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
                              name: 'url',
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
                            start: 8,
                            end: 23,
                            loc: {
                              start: {
                                line: 1,
                                column: 8
                              },
                              end: {
                                line: 1,
                                column: 23
                              }
                            }
                          },
                          start: 8,
                          end: 23,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 23
                            }
                          }
                        }
                      ],
                      start: 6,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
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
                    start: 3,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
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
                  start: 2,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  }
                }
              ],
              start: 1,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 25
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseModule(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
