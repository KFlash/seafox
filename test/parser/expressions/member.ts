import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Member', () => {
  for (const arg of [
    'y.)',
    'foo[...x];',
    'for (let[x in y] in y);',
    'a + b.a - c = d;',
    'for (let[x in y] in y);',
    'for (let[x in y] in y);',
    'foo.bar.',
    'foo.|1.',
    'foo.123.',
    'foo["bar"',
    'foo`bar',
    'foo[].bar'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `async, await.yield[b in c] in d`,
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
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'await',
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
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'yield',
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
                    computed: true,
                    property: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'b',
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
                      operator: 'in',
                      start: 19,
                      end: 25,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 25
                        }
                      }
                    },

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
                  right: {
                    type: 'Identifier',
                    name: 'd',
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
                  operator: 'in',
                  start: 7,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
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
      `let.a, let, let()`,
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
                  computed: false,
                  property: {
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
                  name: 'let',
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
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'let',
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
                  arguments: [],

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
      `a[b in c] in d`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'MemberExpression',
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
                computed: true,
                property: {
                  type: 'BinaryExpression',
                  left: {
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
                  right: {
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
                  operator: 'in',
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
              right: {
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
              },
              operator: 'in',
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
      `a(b[c in d])`,
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
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
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
                  computed: true,
                  property: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'c',
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
                      type: 'Identifier',
                      name: 'd',
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
                    operator: 'in',
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

                  start: 2,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
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
      `for (a[x in y] in y);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
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
            },
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { a[b in c] in d }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'a',
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
                      computed: true,
                      property: {
                        type: 'BinaryExpression',
                        left: {
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
                        right: {
                          type: 'Identifier',
                          name: 'c',
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
                        operator: 'in',
                        start: 25,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      },

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
                    },
                    right: {
                      type: 'Identifier',
                      name: 'd',
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
                    operator: 'in',
                    start: 23,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  start: 23,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 21,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { (a[b in c] in d) }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'a',
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
                      computed: true,
                      property: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'b',
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
                        right: {
                          type: 'Identifier',
                          name: 'c',
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
                        operator: 'in',
                        start: 26,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },

                      start: 24,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'd',
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
                    operator: 'in',
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
                  },
                  start: 23,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 21,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { x(a[b in c] in d) }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
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
                    arguments: [
                      {
                        type: 'BinaryExpression',
                        left: {
                          type: 'MemberExpression',
                          object: {
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
                          computed: true,
                          property: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Identifier',
                              name: 'b',
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
                            right: {
                              type: 'Identifier',
                              name: 'c',
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
                            operator: 'in',
                            start: 27,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          },

                          start: 25,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        right: {
                          type: 'Identifier',
                          name: 'd',
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
                        operator: 'in',
                        start: 25,
                        end: 39,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 39
                          }
                        }
                      }
                    ],

                    start: 23,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  start: 23,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
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
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { x[a[b in c, d] in e] }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MemberExpression',
                    object: {
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
                    computed: true,
                    property: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'MemberExpression',
                        object: {
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
                        computed: true,
                        property: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Identifier',
                                name: 'b',
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
                              right: {
                                type: 'Identifier',
                                name: 'c',
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
                              operator: 'in',
                              start: 27,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              }
                            },
                            {
                              type: 'Identifier',
                              name: 'd',
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
                            }
                          ],
                          start: 27,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 36
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
                      right: {
                        type: 'Identifier',
                        name: 'e',
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
                      operator: 'in',
                      start: 25,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },

                    start: 23,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  start: 23,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  }
                }
              ],
              start: 21,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { x[a[b, c in d] in e] }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MemberExpression',
                    object: {
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
                    computed: true,
                    property: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'MemberExpression',
                        object: {
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
                        computed: true,
                        property: {
                          type: 'SequenceExpression',
                          expressions: [
                            {
                              type: 'Identifier',
                              name: 'b',
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
                            {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Identifier',
                                name: 'c',
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
                              right: {
                                type: 'Identifier',
                                name: 'd',
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
                              operator: 'in',
                              start: 30,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 30
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              }
                            }
                          ],
                          start: 27,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 36
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
                      right: {
                        type: 'Identifier',
                        name: 'e',
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
                      operator: 'in',
                      start: 25,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },

                    start: 23,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  start: 23,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  }
                }
              ],
              start: 21,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `for (a[x in y] in y) { x[a[b in c] in d] }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MemberExpression',
                    object: {
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
                    computed: true,
                    property: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'MemberExpression',
                        object: {
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
                        computed: true,
                        property: {
                          type: 'BinaryExpression',
                          left: {
                            type: 'Identifier',
                            name: 'b',
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
                          right: {
                            type: 'Identifier',
                            name: 'c',
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
                          operator: 'in',
                          start: 27,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        },

                        start: 25,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      right: {
                        type: 'Identifier',
                        name: 'd',
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
                      operator: 'in',
                      start: 25,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },

                    start: 23,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  start: 23,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
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
            left: {
              type: 'MemberExpression',
              object: {
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
              computed: true,
              property: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'Identifier',
                  name: 'y',
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
                operator: 'in',
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

              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
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
      `1.000.toString();`,
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
                  type: 'Literal',
                  value: 1,
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'toString',
                  start: 6,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
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
              arguments: [],
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
      `foo["bar"];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
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
              computed: true,
              property: {
                type: 'Literal',
                value: 'bar',
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
      `foo["foo"]["bar"];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
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
                computed: true,
                property: {
                  type: 'Literal',
                  value: 'foo',
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
              computed: true,
              property: {
                type: 'Literal',
                value: 'bar',
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
      `foo[test()][bar()];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
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
                computed: true,
                property: {
                  type: 'CallExpression',

                  callee: {
                    type: 'Identifier',
                    name: 'test',
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
                  arguments: [],
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
                type: 'CallExpression',

                callee: {
                  type: 'Identifier',
                  name: 'bar',
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
                arguments: [],
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
      `x[a, b]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
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
              computed: true,
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                  {
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
                  }
                ],
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
      `(2[x,x],x)>x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'MemberExpression',

                    object: {
                      type: 'Literal',
                      value: 2,
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
                    },
                    computed: true,
                    property: {
                      type: 'SequenceExpression',
                      expressions: [
                        {
                          type: 'Identifier',
                          name: 'x',
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
                        {
                          type: 'Identifier',
                          name: 'x',
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
                    start: 1,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    }
                  },
                  {
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
                  }
                ],
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              right: {
                type: 'Identifier',
                name: 'x',
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
              operator: '>',
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
      `(a[b]||(c[d]=e))`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              left: {
                type: 'MemberExpression',

                object: {
                  type: 'Identifier',
                  name: 'a',
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
                },
                computed: true,
                property: {
                  type: 'Identifier',
                  name: 'b',
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
                start: 1,
                end: 5,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 5
                  }
                }
              },
              right: {
                type: 'AssignmentExpression',
                left: {
                  type: 'MemberExpression',

                  object: {
                    type: 'Identifier',
                    name: 'c',
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
                  computed: true,
                  property: {
                    type: 'Identifier',
                    name: 'd',
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
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                operator: '=',
                right: {
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
              operator: '||',
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
      `a&&(b=c)&&(d=e)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              left: {
                type: 'LogicalExpression',
                left: {
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
                right: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'b',
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
                    type: 'Identifier',
                    name: 'c',
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
                operator: '&&',
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
              right: {
                type: 'AssignmentExpression',
                left: {
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
                operator: '=',
                right: {
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
              operator: '&&',
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
      `foo.bar["foo"];`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
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
              computed: true,
              property: {
                type: 'Literal',
                value: 'foo',
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
      `0.5.toString();`,
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
                  type: 'Literal',
                  value: 0.5,
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
                  name: 'toString',
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
              arguments: [],
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
      `abc.package`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
                type: 'Identifier',
                name: 'abc',
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
                name: 'package',
                start: 4,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `a.if`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

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
                name: 'if',
                start: 2,
                end: 4,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 4
                  }
                }
              },
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
          }
        ],
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
      }
    ],
    [
      `a().b`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
                type: 'CallExpression',

                callee: {
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
                arguments: [],
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
                name: 'b',
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
    [
      `x.y / z`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'MemberExpression',

                object: {
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'y',
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
              right: {
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
              operator: '/',
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
      `a[b, c]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

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
              computed: true,
              property: {
                type: 'SequenceExpression',
                expressions: [
                  {
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
                  {
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
                  }
                ],
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
      `a.$._.B0`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

              object: {
                type: 'MemberExpression',

                object: {
                  type: 'MemberExpression',

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
                    name: '$',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: '_',
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'B0',
                start: 6,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 6
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
      `a.b`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',

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
    [
      `a()`,
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
              arguments: [],
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
    [
      `a.b.c`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        body: [
          {
            type: 'ExpressionStatement',
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
            expression: {
              type: 'MemberExpression',

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
              object: {
                type: 'MemberExpression',

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
                },
                object: {
                  type: 'Identifier',
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
                  },
                  name: 'a'
                },
                property: {
                  type: 'Identifier',
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
                  },
                  name: 'b'
                },
                computed: false
              },
              property: {
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
                name: 'c'
              },
              computed: false
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
