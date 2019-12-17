import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Async function', () => {
  for (const [source, ctx, expected] of [
    [
      `async function foo() {}`,
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
            async: true,
            generator: false,
            id: {
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
      `async function foo(a = {async bar() { await b }}) {}`,
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
                right: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'bar',
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
                      value: {
                        type: 'FunctionExpression',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ExpressionStatement',
                              expression: {
                                type: 'AwaitExpression',
                                argument: {
                                  type: 'Identifier',
                                  name: 'b',
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
                            }
                          ],
                          start: 36,
                          end: 47,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 47
                            }
                          }
                        },
                        async: true,
                        generator: false,
                        id: null,
                        start: 33,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 33
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
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
                    }
                  ],
                  start: 23,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                },
                start: 19,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 19
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
            async: true,
            generator: false,
            id: {
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
      `(async function foo(a, b = 39,) {})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b',
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
                    type: 'Literal',
                    value: 39,
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
              async: true,
              generator: false,
              id: {
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
      `async function f() { let y = await x * x }`,
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
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                        right: {
                          type: 'Identifier',
                          name: 'x',
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
                        operator: '*',
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
                      id: {
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
                      start: 25,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 19,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 42
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
      `async function f() {} var f;`,
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
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
      `function g() {   async function f() {} var f;   }`,
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
                  async: true,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  start: 17,
                  end: 38,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 38
                    }
                  }
                },
                {
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'f',
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
                }
              ],
              start: 13,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 49
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `(async function(){})`,
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
              async: true,
              generator: false,
              id: null,
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
      `(async function foo() { }.prototype)`,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [],
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
                async: true,
                generator: false,
                id: {
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'prototype',
                start: 26,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 35
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
      `async function foo(a = class {async bar() { await b }}) {}`,
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
                right: {
                  type: 'ClassExpression',
                  id: null,
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
                          name: 'bar',
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
                        value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'AwaitExpression',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'b',
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
                                  start: 44,
                                  end: 51,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 44
                                    },
                                    end: {
                                      line: 1,
                                      column: 51
                                    }
                                  }
                                },
                                start: 44,
                                end: 51,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 44
                                  },
                                  end: {
                                    line: 1,
                                    column: 51
                                  }
                                }
                              }
                            ],
                            start: 42,
                            end: 53,
                            loc: {
                              start: {
                                line: 1,
                                column: 42
                              },
                              end: {
                                line: 1,
                                column: 53
                              }
                            }
                          },
                          async: true,
                          generator: false,
                          id: null,
                          start: 39,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 39
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        },
                        start: 30,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 30
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
                    start: 29,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  start: 23,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  }
                },
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 56,
              end: 58,
              loc: {
                start: {
                  line: 1,
                  column: 56
                },
                end: {
                  line: 1,
                  column: 58
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
            },
            start: 0,
            end: 58,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 58
              }
            }
          }
        ],
        start: 0,
        end: 58,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 58
          }
        }
      }
    ],
    [
      `(function f() { async function yield() {} })`,
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
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 39,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    async: true,
                    generator: false,
                    id: {
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
                    start: 16,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
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
              generator: false,
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
              start: 1,
              end: 43,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 43
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
      `({ async [yield]() {} });`,
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
                  },
                  value: {
                    type: 'FunctionExpression',
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
                    async: true,
                    generator: false,
                    id: null,
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
                  kind: 'init',
                  computed: true,
                  method: true,
                  shorthand: false,
                  start: 3,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 1,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `(function* g() { (async function yield() {}); })`,
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
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 41,
                        end: 43,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 43
                          }
                        }
                      },
                      async: true,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'yield',
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
                      start: 18,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    start: 17,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  }
                ],
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
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 47
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
      `"use strict"; ({ async yield() {} });`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
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
                  value: {
                    type: 'FunctionExpression',
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
                    async: true,
                    generator: false,
                    id: null,
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
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
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
            start: 14,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 14
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
      `(function f() { ({ async [yield]() {} }); })`,
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
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
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
                            async: true,
                            generator: false,
                            id: null,
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
                          kind: 'init',
                          computed: true,
                          method: true,
                          shorthand: false,
                          start: 19,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 19
                            },
                            end: {
                              line: 1,
                              column: 37
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
                    start: 16,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
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
              generator: false,
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
              start: 1,
              end: 43,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 43
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
      `x = async function(a) { await a }`,
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
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'a',
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
                async: true,
                generator: false,
                id: null,
                start: 4,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `class X { static async await(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'X',
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
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'await',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
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
                    async: true,
                    generator: false,
                    id: null,
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
                }
              ],
              start: 8,
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
      `var O = { async 0(eval) {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'VariableDeclaration',
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
            },
            declarations: [
              {
                type: 'VariableDeclarator',
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
                },
                id: {
                  type: 'Identifier',
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
                  },
                  name: 'O'
                },
                init: {
                  type: 'ObjectExpression',
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
                  },
                  properties: [
                    {
                      type: 'Property',
                      start: 10,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      },
                      method: true,
                      shorthand: false,
                      computed: false,
                      key: {
                        type: 'Literal',
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
                        },
                        value: 0
                      },
                      kind: 'init',
                      value: {
                        type: 'FunctionExpression',
                        start: 17,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        },
                        id: null,
                        generator: false,
                        async: true,
                        params: [
                          {
                            type: 'Identifier',
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
                            },
                            name: 'eval'
                          }
                        ],
                        body: {
                          type: 'BlockStatement',
                          start: 24,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          },
                          body: []
                        }
                      }
                    }
                  ]
                }
              }
            ],
            kind: 'var'
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `(async function foo(a, b = 39,) { })`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a',
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
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'b',
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
                    type: 'Literal',
                    value: 39,
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
              async: true,
              generator: false,
              id: {
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
      `(async function*(a = b +=1, c = d += 1, e = f += 1, g = h += 1, i = j += 1, k = l +=1) {})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
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
                  start: 17,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'c',
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
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
                    start: 32,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  },
                  start: 28,
                  end: 38,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 38
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'e',
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'f',
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
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
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
                    start: 44,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  start: 40,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 40
                    },
                    end: {
                      line: 1,
                      column: 50
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'g',
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'h',
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
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
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
                    start: 56,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 56
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 52,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 52
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'i',
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'j',
                      start: 68,
                      end: 69,
                      loc: {
                        start: {
                          line: 1,
                          column: 68
                        },
                        end: {
                          line: 1,
                          column: 69
                        }
                      }
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
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
                    },
                    start: 68,
                    end: 74,
                    loc: {
                      start: {
                        line: 1,
                        column: 68
                      },
                      end: {
                        line: 1,
                        column: 74
                      }
                    }
                  },
                  start: 64,
                  end: 74,
                  loc: {
                    start: {
                      line: 1,
                      column: 64
                    },
                    end: {
                      line: 1,
                      column: 74
                    }
                  }
                },
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'k',
                    start: 76,
                    end: 77,
                    loc: {
                      start: {
                        line: 1,
                        column: 76
                      },
                      end: {
                        line: 1,
                        column: 77
                      }
                    }
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'l',
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 1,
                          column: 80
                        },
                        end: {
                          line: 1,
                          column: 81
                        }
                      }
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 1,
                      start: 84,
                      end: 85,
                      loc: {
                        start: {
                          line: 1,
                          column: 84
                        },
                        end: {
                          line: 1,
                          column: 85
                        }
                      }
                    },
                    start: 80,
                    end: 85,
                    loc: {
                      start: {
                        line: 1,
                        column: 80
                      },
                      end: {
                        line: 1,
                        column: 85
                      }
                    }
                  },
                  start: 76,
                  end: 85,
                  loc: {
                    start: {
                      line: 1,
                      column: 76
                    },
                    end: {
                      line: 1,
                      column: 85
                    }
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 87,
                end: 89,
                loc: {
                  start: {
                    line: 1,
                    column: 87
                  },
                  end: {
                    line: 1,
                    column: 89
                  }
                }
              },
              async: true,
              generator: true,
              id: null,
              start: 1,
              end: 89,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 89
                }
              }
            },
            start: 0,
            end: 90,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 90
              }
            }
          }
        ],
        start: 0,
        end: 90,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 90
          }
        }
      }
    ],
    [
      `(async function foo(a,) {})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'Identifier',
                  name: 'a',
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
              body: {
                type: 'BlockStatement',
                body: [],
                start: 24,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              async: true,
              generator: false,
              id: {
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
              start: 1,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 26
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
      `(async function foo(_ = (function() {}())) { })`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'FunctionExpression',
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: '_',
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
                  right: {
                    type: 'CallExpression',
                    optional: false,
                    shortCircuited: false,
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
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
                      async: false,
                      generator: false,
                      id: null,
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
                    arguments: [],
                    start: 25,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  start: 20,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 43,
                end: 46,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 46
                  }
                }
              },
              async: true,
              generator: false,
              id: {
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
              start: 1,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 46
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
