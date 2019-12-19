import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseModule } from '../../../src/seafox';

describe('Module - Export', () => {
  for (const [source, ctx, expected] of [
    [
      `export default foo => bar`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'bar',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
                  start: 15,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              async: false,
              expression: true,
              start: 15,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
      `export default async foo => bar`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'bar',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
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
                }
              ],
              async: true,
              expression: true,
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
      `export async function x() {}`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
              async: true,
              generator: false,
              id: {
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
      `export default async function x() {}`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
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
              async: true,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'x',
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
      `export default async () => {}`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              params: [],
              async: true,
              expression: false,
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
      `export default async;`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Identifier',
              name: 'async',
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
          {
            type: 'EmptyStatement',
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
      `export default async = 1;`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            declaration: {
              end: 24,
              left: {
                end: 20,
                loc: {
                  end: {
                    column: 20,
                    line: 1
                  },
                  start: {
                    column: 15,
                    line: 1
                  }
                },
                name: 'async',
                start: 15,
                type: 'Identifier'
              },
              loc: {
                end: {
                  column: 24,
                  line: 1
                },
                start: {
                  column: 15,
                  line: 1
                }
              },
              operator: '=',
              right: {
                end: 24,
                loc: {
                  end: {
                    column: 24,
                    line: 1
                  },
                  start: {
                    column: 23,
                    line: 1
                  }
                },
                start: 23,
                type: 'Literal',
                value: 1
              },
              start: 15,
              type: 'AssignmentExpression'
            },
            end: 24,
            loc: {
              end: {
                column: 24,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExportDefaultDeclaration'
          },
          {
            end: 25,
            loc: {
              end: {
                column: 25,
                line: 1
              },
              start: {
                column: 24,
                line: 1
              }
            },
            start: 24,
            type: 'EmptyStatement'
          }
        ],
        end: 25,
        loc: {
          end: {
            column: 25,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `var foo; export { foo as for };`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
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
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 18,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                exported: {
                  type: 'Identifier',
                  name: 'for',
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
              }
            ],
            declaration: null,
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
      `export default 42`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: 42,
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
      `var x; export default x = 7`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
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
                init: null,
                id: {
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
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'AssignmentExpression',
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
              operator: '=',
              right: {
                type: 'Literal',
                value: 7,
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
              start: 22,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
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
      `export * from 'bar';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            end: 20,
            loc: {
              end: {
                column: 20,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            source: {
              end: 19,
              loc: {
                end: {
                  column: 19,
                  line: 1
                },
                start: {
                  column: 14,
                  line: 1
                }
              },
              start: 14,
              type: 'Literal',
              value: 'bar'
            },
            exported: null,
            start: 0,
            type: 'ExportAllDeclaration'
          }
        ],
        end: 20,
        loc: {
          end: {
            column: 20,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export * as foo from 'bar';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            end: 27,
            loc: {
              end: {
                column: 27,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            source: {
              end: 26,
              loc: {
                end: {
                  column: 26,
                  line: 1
                },
                start: {
                  column: 21,
                  line: 1
                }
              },
              start: 21,
              type: 'Literal',
              value: 'bar'
            },
            specifiers: [
              {
                end: 15,
                exported: {
                  end: 15,
                  loc: {
                    end: {
                      column: 15,
                      line: 1
                    },
                    start: {
                      column: 12,
                      line: 1
                    }
                  },
                  name: 'foo',
                  start: 12,
                  type: 'Identifier'
                },
                loc: {
                  end: {
                    column: 15,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                source: null,
                start: 0,
                type: 'ExportAllDeclaration'
              }
            ],
            start: 0,
            type: 'ExportNamedDeclaration'
          }
        ],
        end: 27,
        loc: {
          end: {
            column: 27,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export default (class{});`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ClassExpression',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export default /foo/`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: /foo/,
              regex: {
                pattern: 'foo',
                flags: ''
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
      `export class Class {}`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'ClassDeclaration',
              id: {
                type: 'Identifier',
                name: 'Class',
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
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export default () => 3`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Literal',
                value: 3,
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
              params: [],
              async: false,
              expression: true,
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
      `export const const2 = 'str';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 'str',
                    start: 22,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  },
                  id: {
                    type: 'Identifier',
                    name: 'const2',
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
      `export {};`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null,
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
      `export {f}; export const x = y;`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'f',
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
                exported: {
                  type: 'Identifier',
                  name: 'f',
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
              }
            ],
            declaration: null,
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
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
                  },
                  id: {
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
      `export { for }`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'for',
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
                exported: {
                  type: 'Identifier',
                  name: 'for',
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
              }
            ],
            declaration: null,
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
      `export {b as a}; export {a};`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'b',
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
                exported: {
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
            declaration: null,
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
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'a',
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
                exported: {
                  type: 'Identifier',
                  name: 'a',
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
            declaration: null,
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
      `export {foo as bar} from "foo";`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'bar',
                  start: 15,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                start: 8,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              }
            ],
            declaration: null,
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
      `export { static } from 'm.js'`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'm.js',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'static',
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
                exported: {
                  type: 'Identifier',
                  name: 'static',
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
            declaration: null,
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseModule(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        next: true,
        raw: false
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
