import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Binary', () => {
  for (const [source, ctx, expected] of [
    [
      `(a * b) / c`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
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
                operator: '*',
                start: 1,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                }
              },
              right: {
                type: 'Identifier',
                name: 'c',
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
              operator: '/',
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
      `a % (b % c)`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
                  type: 'Identifier',
                  name: 'c',
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
                operator: '%',
                start: 5,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              operator: '%',
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
      `a << b instanceof c`,
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
                type: 'BinaryExpression',
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
                operator: '<<',
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
              right: {
                type: 'Identifier',
                name: 'c',
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
              operator: 'instanceof',
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
      `(a << b) instanceof c`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
                  type: 'Identifier',
                  name: 'b',
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
                operator: '<<',
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
              right: {
                type: 'Identifier',
                name: 'c',
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
              operator: 'instanceof',
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
      `a >>> b >>> c`,
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
                type: 'BinaryExpression',
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
                  type: 'Identifier',
                  name: 'b',
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
                operator: '>>>',
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
              right: {
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
              operator: '>>>',
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
      `a in (b == c)`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'b',
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
                right: {
                  type: 'Identifier',
                  name: 'c',
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
                operator: '==',
                start: 6,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              operator: 'in',
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
      `(a != b) != c`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
                  type: 'Identifier',
                  name: 'b',
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
                operator: '!=',
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
              right: {
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
              operator: '!=',
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
      `a & b ^ c`,
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
                type: 'BinaryExpression',
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
                operator: '&',
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
              right: {
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
              operator: '^',
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
    ],
    [
      `a + (b /= c)`,
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
                operator: '/=',
                right: {
                  type: 'Identifier',
                  name: 'c',
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
              operator: '+',
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
      `a >>= b + c`,
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
              operator: '>>=',
              right: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'b',
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
                right: {
                  type: 'Identifier',
                  name: 'c',
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
                operator: '+',
                start: 6,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 6
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
      `!(void a)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'UnaryExpression',
                operator: 'void',
                argument: {
                  type: 'Identifier',
                  name: 'a',
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
                prefix: true,
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
              prefix: true,
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
    ],
    [
      `++a + b`,
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
                type: 'UpdateExpression',
                argument: {
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
                operator: '++',
                prefix: true,
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
                name: 'b',
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
              operator: '+',
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
      `(-1).a`,
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
                type: 'UnaryExpression',
                operator: '-',
                argument: {
                  type: 'Literal',
                  value: 1,
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
                prefix: true,
                start: 1,
                end: 3,
                loc: {
                  start: {
                    line: 1,
                    column: 1
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
      `(- 0)[a] = b`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'UnaryExpression',
                  operator: '-',
                  argument: {
                    type: 'Literal',
                    value: 0,
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
                  prefix: true,
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: true,
                property: {
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
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'b',
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
      `++(- 0)[a]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'UnaryExpression',
                  operator: '-',
                  argument: {
                    type: 'Literal',
                    value: 0,
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
                  prefix: true,
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
                computed: true,
                property: {
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
                start: 2,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              operator: '++',
              prefix: true,
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
      `(- 0).a()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'UnaryExpression',
                  operator: '-',
                  argument: {
                    type: 'Literal',
                    value: 0,
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
                  prefix: true,
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: false,
                property: {
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
              arguments: [],
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
    ],
    [
      `(1)[a] = b`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Literal',
                  value: 1,
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
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'b',
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
      `(1)[a]++`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Literal',
                  value: 1,
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
              operator: '++',
              prefix: false,
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
      `(1).a()`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Literal',
                  value: 1,
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
              arguments: [],
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
      `(1)[a] += b`,
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
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Literal',
                  value: 1,
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
              operator: '+=',
              right: {
                type: 'Identifier',
                name: 'b',
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
      `1+2;`,
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
                type: 'Literal',
                value: 1,
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
                type: 'Literal',
                value: 2,
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
              operator: '+',
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
      `x - y + z`,
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
                type: 'BinaryExpression',
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
                right: {
                  type: 'Identifier',
                  name: 'y',
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
                operator: '-',
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
              right: {
                type: 'Identifier',
                name: 'z',
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
              operator: '+',
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
    ],
    [
      `x * y % z`,
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
                type: 'BinaryExpression',
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
                right: {
                  type: 'Identifier',
                  name: 'y',
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
                operator: '*',
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
              right: {
                type: 'Identifier',
                name: 'z',
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
              operator: '%',
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
    ],
    [
      `-(x ** y)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '-',
              argument: {
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'x',
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
                  name: 'y',
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
                operator: '**',
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
              prefix: true,
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
    ],
    [
      `x in y`,
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
              right: {
                type: 'Identifier',
                name: 'y',
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
              operator: 'in',
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
      `a=b+=c-=d**=e*=f/=g%=h<<=i>>=j>>>=k&=l^=m|=n`,
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
              operator: '=',
              right: {
                type: 'AssignmentExpression',
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
                operator: '+=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
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
                  },
                  operator: '-=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'd',
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
                    operator: '**=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'e',
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
                      operator: '*=',
                      right: {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '/=',
                        right: {
                          type: 'AssignmentExpression',
                          left: {
                            type: 'Identifier',
                            name: 'g',
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
                          operator: '%=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'h',
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
                            operator: '<<=',
                            right: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'Identifier',
                                name: 'i',
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
                              operator: '>>=',
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'j',
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
                                operator: '>>>=',
                                right: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'k',
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
                                  operator: '&=',
                                  right: {
                                    type: 'AssignmentExpression',
                                    left: {
                                      type: 'Identifier',
                                      name: 'l',
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
                                    operator: '^=',
                                    right: {
                                      type: 'AssignmentExpression',
                                      left: {
                                        type: 'Identifier',
                                        name: 'm',
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
                                      operator: '|=',
                                      right: {
                                        type: 'Identifier',
                                        name: 'n',
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
                                    },
                                    start: 37,
                                    end: 44,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 37
                                      },
                                      end: {
                                        line: 1,
                                        column: 44
                                      }
                                    }
                                  },
                                  start: 34,
                                  end: 44,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 34
                                    },
                                    end: {
                                      line: 1,
                                      column: 44
                                    }
                                  }
                                },
                                start: 29,
                                end: 44,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 29
                                  },
                                  end: {
                                    line: 1,
                                    column: 44
                                  }
                                }
                              },
                              start: 25,
                              end: 44,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 25
                                },
                                end: {
                                  line: 1,
                                  column: 44
                                }
                              }
                            },
                            start: 21,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            }
                          },
                          start: 18,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 18
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          }
                        },
                        start: 15,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 15
                          },
                          end: {
                            line: 1,
                            column: 44
                          }
                        }
                      },
                      start: 12,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      }
                    },
                    start: 8,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
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
                start: 2,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 2
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
      `a|=b^=c&=d>>>=e>>=f<<=g%=h/=i*=j**=k-=l+=m=n`,
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
              operator: '|=',
              right: {
                type: 'AssignmentExpression',
                left: {
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
                operator: '^=',
                right: {
                  type: 'AssignmentExpression',
                  left: {
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
                  operator: '&=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '>>>=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'e',
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
                      operator: '>>=',
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'f',
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
                        operator: '<<=',
                        right: {
                          type: 'AssignmentExpression',
                          left: {
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
                          operator: '%=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'h',
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
                            operator: '/=',
                            right: {
                              type: 'AssignmentExpression',
                              left: {
                                type: 'Identifier',
                                name: 'i',
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
                              operator: '*=',
                              right: {
                                type: 'AssignmentExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'j',
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
                                operator: '**=',
                                right: {
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'k',
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
                                  operator: '-=',
                                  right: {
                                    type: 'AssignmentExpression',
                                    left: {
                                      type: 'Identifier',
                                      name: 'l',
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
                                    operator: '+=',
                                    right: {
                                      type: 'AssignmentExpression',
                                      left: {
                                        type: 'Identifier',
                                        name: 'm',
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
                                      operator: '=',
                                      right: {
                                        type: 'Identifier',
                                        name: 'n',
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
                                      start: 41,
                                      end: 44,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 41
                                        },
                                        end: {
                                          line: 1,
                                          column: 44
                                        }
                                      }
                                    },
                                    start: 38,
                                    end: 44,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 38
                                      },
                                      end: {
                                        line: 1,
                                        column: 44
                                      }
                                    }
                                  },
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
                                start: 31,
                                end: 44,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 31
                                  },
                                  end: {
                                    line: 1,
                                    column: 44
                                  }
                                }
                              },
                              start: 28,
                              end: 44,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 44
                                }
                              }
                            },
                            start: 25,
                            end: 44,
                            loc: {
                              start: {
                                line: 1,
                                column: 25
                              },
                              end: {
                                line: 1,
                                column: 44
                              }
                            }
                          },
                          start: 22,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          }
                        },
                        start: 18,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 18
                          },
                          end: {
                            line: 1,
                            column: 44
                          }
                        }
                      },
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
                    start: 9,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  start: 6,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                },
                start: 3,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
      `a / b / c`,
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
                type: 'BinaryExpression',
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
                operator: '/',
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
              right: {
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
              operator: '/',
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
    ],
    [
      `a << (b in c)`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'b',
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
                right: {
                  type: 'Identifier',
                  name: 'c',
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
                operator: 'in',
                start: 6,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              operator: '<<',
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
      `a << b in c`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'BinaryExpression',
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
              },
              left: {
                type: 'BinaryExpression',
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
                },
                left: {
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
                operator: '<<',
                right: {
                  type: 'Identifier',
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
                  },
                  name: 'b'
                }
              },
              operator: 'in',
              right: {
                type: 'Identifier',
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
                },
                name: 'c'
              }
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `(a << b) >> c`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
                  type: 'Identifier',
                  name: 'b',
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
                operator: '<<',
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
              right: {
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
              operator: '>>',
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
      `a != (b & c)`,
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
                type: 'BinaryExpression',
                left: {
                  type: 'Identifier',
                  name: 'b',
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
                right: {
                  type: 'Identifier',
                  name: 'c',
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
                operator: '&',
                start: 6,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              operator: '!=',
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
      `(a ^ b) ^ c`,
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
                type: 'BinaryExpression',
                left: {
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
                right: {
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
                operator: '^',
                start: 1,
                end: 6,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 6
                  }
                }
              },
              right: {
                type: 'Identifier',
                name: 'c',
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
              operator: '^',
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
      `!typeof a`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: '!',
              argument: {
                type: 'UnaryExpression',
                operator: 'typeof',
                argument: {
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
                prefix: true,
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
              prefix: true,
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
    ],
    [
      `++(- 0).a`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'UnaryExpression',
                  operator: '-',
                  argument: {
                    type: 'Literal',
                    value: 0,
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
                  prefix: true,
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
                computed: false,
                property: {
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
                start: 2,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              operator: '++',
              prefix: true,
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
    ],
    [
      `++(1)[a]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
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
                computed: true,
                property: {
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
                },
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
              operator: '++',
              prefix: true,
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
      `(- 0)[a]().a++`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'CallExpression',
                  optional: false,
                  shortCircuited: false,
                  callee: {
                    type: 'MemberExpression',
                    optional: false,
                    shortCircuited: false,
                    object: {
                      type: 'UnaryExpression',
                      operator: '-',
                      argument: {
                        type: 'Literal',
                        value: 0,
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
                      prefix: true,
                      start: 1,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    },
                    computed: true,
                    property: {
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
                  arguments: [],
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'a',
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
              operator: '++',
              prefix: false,
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
      `(1).a++`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Literal',
                  value: 1,
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
              operator: '++',
              prefix: false,
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
