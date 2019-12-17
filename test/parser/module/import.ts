import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseModule } from '../../../src/seafox';

describe('Module - Import', () => {
  for (const [source, ctx, expected] of [
    [
      `import  * as croasnm from "}ë";`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'croasnm',
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
                },
                start: 8,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              }
            ],
            source: {
              type: 'Literal',
              value: '}ë',
              start: 26,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 30
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
      `import  * as set from "a"`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'set',
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
                },
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
            source: {
              type: 'Literal',
              value: 'a',
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
      `import * as thing from 'baz';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'thing',
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
              }
            ],
            source: {
              type: 'Literal',
              value: 'baz',
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
    /*   [
            `import $ from "foo"`,
            Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
            {
              "type": "Program",
              "sourceType": "module",
              "body": [
                {
                  "type": "ImportDeclaration",
                  "specifiers": [
                    {
                      "type": "ImportDefaultSpecifier",
                      "local": {
                        "type": "Identifier",
                        "name": "$",
                        "start": 7,
                        "end": 8,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 7
                          },
                          "end": {
                            "line": 1,
                            "column": 8
                          }
                        }
                      },
                      "start": 7,
                      "end": 8,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 7
                        },
                        "end": {
                          "line": 1,
                          "column": 8
                        }
                      }
                    }
                  ],
                  "source": {
                    "type": "Literal",
                    "value": "foo",
                    "start": 14,
                    "end": 19,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 14
                      },
                      "end": {
                        "line": 1,
                        "column": 19
                      }
                    }
                  },
                  "start": 0,
                  "end": 19,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 19
                    }
                  }
                }
              ],
              "start": 0,
              "end": 19,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 19
                }
              }
            }],*/
    [
      `import {n, o as p} from "module";`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'n',
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
                imported: {
                  type: 'Identifier',
                  name: 'n',
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
              },
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'p',
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
                imported: {
                  type: 'Identifier',
                  name: 'o',
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
              }
            ],
            source: {
              type: 'Literal',
              value: 'module',
              start: 24,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 24
                },
                end: {
                  line: 1,
                  column: 32
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
      `import { yield as y } from 'foo';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'y',
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
                imported: {
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
                start: 9,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo',
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
      `import { a } from 'foo';`,
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportSpecifier',
                local: {
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
                imported: {
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
              }
            ],
            source: {
              type: 'Literal',
              value: 'foo',
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
