import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Directives', () => {
  for (const arg of [
    `function f(){
      "x\\01"
      "use strict";
    }`,
    `"use strict"
"\\05"`,
    `function f(){
      "x\\1"
      "use strict";
    }`,
    `function foo() {
      "use strict";
      "use\\040strict";
      return true;
    }`,
    `function foo() {
      "use\\040strict";
      "use strict";
      return true;
    }`,
    '"use strict"; "hello\\040world";',
    '"hello\\040world"; "use strict";',
    `function f(){
      "x\\6";
      "use strict";
    }`,
    `function f(){
      "use strict";
      "x\\2"
    }`,
    `function f(){
      "use strict";
      "x\\4"
    }`,
    `function f() {
      "use strict";
      eval = 1; // Error: Assigning to 'eval' in strict mode
    }`,
    'function foo(a, b, eval, c, d) { "use strict"; }',
    'function foo(a, b, eval, c, d) { "use strict"; }',
    '"use strict"; function foo(a, b, eval, c, d) {  }',
    'function foo(a, b, eval, c, d) { "use strict"; }',
    '"use strict"; function foo(a, b, eval, c, d) {  }',
    '"use strict"; try{}catch(eval){};',
    '"use strict"; var eval;',
    "'random\\x\nnewline'",
    "'random\\x\rnewline'",
    "'random\\x0\rnewline'",
    "'random\\x0\u2029newline'",
    "'random\\u\nnewline'",
    "'random\\ua\u2029newline'",
    "'random\\u00\nnewline'",
    "'random\\u0a\nnewline'",
    "'random\\u0a\u2029newline'",
    "'random\\u000\u2029newline'",
    "'random\\u00a\u2028newline'",
    "'random\\u00a\u2029newline'",
    "'random\\u{\nnewline'",
    "'random\\u{a\r\nnewline'",
    "'random\\u{a\u2029newline'",
    "'random\\u000 foo'",
    "'random\\u00a foo'",
    "'random\\u{a foo'",
    "'random\\ua\\ foo'",
    "'random\\u00\\ foo'",
    "'random\\u{0\\ foo'",
    "'random\\ux foo'",
    "'random\\u00x foo'",
    "'random\\u000x foo'",
    "'random\\u{0x foo'",
    "'random\\u{ax foo'",
    '"use strict"; function strict() { var x = eval += undefined; }',
    '"use strict"; function strict() { eval *= undefined; }',
    'function f(eval){ "use strict" };',
    '(function arguments(){ "use strict" })',
    'function strict() { "use strict"; arguments /= undefined;  }',
    'function strict() { "use strict" arguments /= undefined;  }',
    '"use strict"; function strict() { print(eval %= undefined); }',
    '"use strict"; function strict() { var x = eval += undefined; }',
    '"use strict"; function strict() { var x = arguments -= undefined; }',
    '"use strict"; function strict() { print(eval >>>= undefined); }',
    '"use strict"; function strict() { print(eval++); }',
    '"use strict"; function strict() { var x = arguments++; }',
    '"use strict"; function strict() { arguments--; }     ',
    '"use strict"; function strict() { var x = eval--; }',
    '"use strict"; function strict() { var x = arguments--; }',
    '"use strict"; function strict() { var x = ++arguments; }',
    '"use strict"; function strict() { print(--arguments); }',
    '"use strict"; function strict() { var x = --arguments; }',
    '"use strict"; function strict() { delete unqualified; }',
    'function f(yield){ "use strict" };',
    '(function yield(){ "use strict" })',
    'function f(let){ "use strict" };',
    '(function let(){ "use strict" })',
    '(function arguments(){ "use strict" })',
    '"use strict"; function strict(parameter) { delete parameter; }',
    '"use strict"; function strict(parameter) { function strict() { var variable; delete variable; } }',
    '"\\1;" "use strict";',
    '"use strict"; function f(){"\\1";}',
    '"ignore me"++',
    '"\\1;" "use strict"; null',
    '"use strict"; with (a) b = c;',
    '"use strict"; "\\1;"',
    '"use strict"; "\\1;" null',
    '"random\\x0\nnewline"',
    '"random\\u00a\nnewline"',
    '"random\\u{0\nnewline"',
    '"random\\u{a\nnewline"',
    "'random\\x foo'",
    '"random\\u{a\rnewline"',
    "'random\\u foo'",
    "'random\\u0 foo'",
    "'random\\u00 foo'",
    "'random\\u0a foo'",
    '(arguments) => { "use strict"; }',

    '(arguments) => { "use strict"; }',
    'function f(eval) { "use strict"; }',
    'eval => { "use strict"; }',
    `function f(){
      "x\\3"
      "use strict"
    }`,
    `function f(){
      "x\\6"
      "use strict"
    }`,
    `function f(){
      "x\\01"
      "use strict"
    }`,
    '"foo" "bar"',
    `"use strict"; (finally = x);`,
    `"use strict"; (false = x);`,
    `"use strict"; (if = x);`,
    `"random\\ua\rnewline"`,
    ` function fun() {
      "use strict";
             var public = 1;
  }`,
    ` function fun() {
    "use strict";
           var public = 1;
}`,
    `function foo() { "use strict"; with (a) b = c; }`,
    '"use strict"; function foo() { with (a) b = c; }',
    '"use strict"; function hello() { "\\000"; }',
    '"use strict"; function hello() { "\\00"; }',
    '"use strict"; function hello() { "\\0123"; }',
    'function hello() { "use strict"; "\\000"; }',
    'function hello() { "use strict"; "\\00"; }',
    'function hello() { "use strict"; "\\0123"; }',
    'function hello("\\000008") { "use strict"; }'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }
  for (const [source, ctx, expected] of [
    [
      `"use\\x20strict";
      with ({}) {};`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            directive: '"use\\x20strict"',
            end: 16,
            expression: {
              end: 15,
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
              raw: '"use\\x20strict"',
              start: 0,
              type: 'Literal',
              value: 'use strict'
            },
            loc: {
              end: {
                column: 16,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExpressionStatement'
          },
          {
            body: {
              body: [],
              end: 35,
              loc: {
                end: {
                  column: 18,
                  line: 2
                },
                start: {
                  column: 16,
                  line: 2
                }
              },
              start: 33,
              type: 'BlockStatement'
            },
            end: 35,
            loc: {
              end: {
                column: 18,
                line: 2
              },
              start: {
                column: 6,
                line: 2
              }
            },
            object: {
              end: 31,
              loc: {
                end: {
                  column: 14,
                  line: 2
                },
                start: {
                  column: 12,
                  line: 2
                }
              },
              properties: [],
              start: 29,
              type: 'ObjectExpression'
            },
            start: 23,
            type: 'WithStatement'
          },
          {
            end: 36,
            loc: {
              end: {
                column: 19,
                line: 2
              },
              start: {
                column: 18,
                line: 2
              }
            },
            start: 35,
            type: 'EmptyStatement'
          }
        ],
        end: 36,
        loc: {
          end: {
            column: 19,
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
      `"\\0";"use strict"`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            directive: '"\\0"',
            end: 5,
            expression: {
              end: 4,
              loc: {
                end: {
                  column: 4,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              raw: '"\\0"',
              start: 0,
              type: 'Literal',
              value: '\u0000'
            },
            loc: {
              end: {
                column: 5,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExpressionStatement'
          },
          {
            directive: '"use strict"',
            end: 17,
            expression: {
              end: 17,
              loc: {
                end: {
                  column: 17,
                  line: 1
                },
                start: {
                  column: 5,
                  line: 1
                }
              },
              raw: '"use strict"',
              start: 5,
              type: 'Literal',
              value: 'use strict'
            },
            loc: {
              end: {
                column: 17,
                line: 1
              },
              start: {
                column: 5,
                line: 1
              }
            },
            start: 5,
            type: 'ExpressionStatement'
          }
        ],
        end: 17,
        loc: {
          end: {
            column: 17,
            line: 1
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
      `"ignore me" + x`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw | Context.Strict | Context.Module,
      {
        body: [
          {
            end: 15,
            expression: {
              end: 15,
              left: {
                end: 11,
                loc: {
                  end: {
                    column: 11,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                raw: '"ignore me"',
                start: 0,
                type: 'Literal',
                value: 'ignore me'
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
              operator: '+',
              right: {
                end: 15,
                loc: {
                  end: {
                    column: 15,
                    line: 1
                  },
                  start: {
                    column: 14,
                    line: 1
                  }
                },
                name: 'x',
                start: 14,
                type: 'Identifier'
              },
              start: 0,
              type: 'BinaryExpression'
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
            start: 0,
            type: 'ExpressionStatement'
          }
        ],
        end: 15,
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
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `"ignore me" + x`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                value: 'ignore me',
                raw: '"ignore me"',
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
              right: {
                type: 'Identifier',
                name: 'x',
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
              operator: '+',
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
      `"ignore me"
        /x/g`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'Literal',
                  raw: '"ignore me"',
                  value: 'ignore me',
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
                right: {
                  type: 'Identifier',
                  name: 'x',
                  start: 21,
                  end: 22,
                  loc: {
                    start: {
                      line: 2,
                      column: 9
                    },
                    end: {
                      line: 2,
                      column: 10
                    }
                  }
                },
                operator: '/',
                start: 0,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 2,
                    column: 10
                  }
                }
              },
              right: {
                type: 'Identifier',
                name: 'g',
                start: 23,
                end: 24,
                loc: {
                  start: {
                    line: 2,
                    column: 11
                  },
                  end: {
                    line: 2,
                    column: 12
                  }
                }
              },
              operator: '/',
              start: 0,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 2,
                  column: 12
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
                line: 2,
                column: 12
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
            line: 2,
            column: 12
          }
        }
      }
    ],
    [
      `"foo"`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"foo"',
            expression: {
              type: 'Literal',
              raw: '"foo"',
              value: 'foo',
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
      `function f(){
            "foo";"bar";
            }`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  directive: '"foo"',
                  end: 32,
                  expression: {
                    end: 31,
                    loc: {
                      end: {
                        column: 17,
                        line: 2
                      },
                      start: {
                        column: 12,
                        line: 2
                      }
                    },
                    raw: '"foo"',
                    start: 26,
                    type: 'Literal',
                    value: 'foo'
                  },
                  loc: {
                    end: {
                      column: 18,
                      line: 2
                    },
                    start: {
                      column: 12,
                      line: 2
                    }
                  },
                  start: 26,
                  type: 'ExpressionStatement'
                },
                {
                  directive: '"bar"',
                  end: 38,
                  expression: {
                    end: 37,
                    loc: {
                      end: {
                        column: 23,
                        line: 2
                      },
                      start: {
                        column: 18,
                        line: 2
                      }
                    },
                    raw: '"bar"',
                    start: 32,
                    type: 'Literal',
                    value: 'bar'
                  },
                  loc: {
                    end: {
                      column: 24,
                      line: 2
                    },
                    start: {
                      column: 18,
                      line: 2
                    }
                  },
                  start: 32,
                  type: 'ExpressionStatement'
                }
              ],
              end: 52,
              loc: {
                end: {
                  column: 13,
                  line: 3
                },
                start: {
                  column: 12,
                  line: 1
                }
              },
              start: 12,
              type: 'BlockStatement'
            },
            end: 52,
            generator: false,
            id: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 9,
                  line: 1
                }
              },
              name: 'f',
              start: 9,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 13,
                line: 3
              },
              start: {
                column: 0,
                line: 1
              }
            },
            params: [],
            start: 0,
            type: 'FunctionDeclaration'
          }
        ],
        end: 52,
        loc: {
          end: {
            column: 13,
            line: 3
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
      `function f(){
              "foo"/*abc
              xyz*/"bar";
              }`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  end: 33,
                  expression: {
                    end: 33,
                    loc: {
                      end: {
                        column: 19,
                        line: 2
                      },
                      start: {
                        column: 14,
                        line: 2
                      }
                    },
                    raw: '"foo"',
                    start: 28,
                    type: 'Literal',
                    value: 'foo'
                  },
                  loc: {
                    end: {
                      column: 19,
                      line: 2
                    },
                    start: {
                      column: 14,
                      line: 2
                    }
                  },
                  directive: '"foo"',
                  start: 28,
                  type: 'ExpressionStatement'
                },
                {
                  directive: '"bar"',
                  end: 64,
                  expression: {
                    end: 63,
                    loc: {
                      end: {
                        column: 24,
                        line: 3
                      },
                      start: {
                        column: 19,
                        line: 3
                      }
                    },
                    raw: '"bar"',
                    start: 58,
                    type: 'Literal',
                    value: 'bar'
                  },
                  loc: {
                    end: {
                      column: 25,
                      line: 3
                    },
                    start: {
                      column: 19,
                      line: 3
                    }
                  },
                  start: 58,
                  type: 'ExpressionStatement'
                }
              ],
              end: 80,
              loc: {
                end: {
                  column: 15,
                  line: 4
                },
                start: {
                  column: 12,
                  line: 1
                }
              },
              start: 12,
              type: 'BlockStatement'
            },
            end: 80,
            generator: false,
            id: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 9,
                  line: 1
                }
              },
              name: 'f',
              start: 9,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 15,
                line: 4
              },
              start: {
                column: 0,
                line: 1
              }
            },
            params: [],
            start: 0,
            type: 'FunctionDeclaration'
          }
        ],
        end: 80,
        loc: {
          end: {
            column: 15,
            line: 4
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
      `function f(){
                "foo";/*abc
                xyz*/"bar";
                }`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  directive: '"foo"',
                  end: 36,
                  expression: {
                    end: 35,
                    loc: {
                      end: {
                        column: 21,
                        line: 2
                      },
                      start: {
                        column: 16,
                        line: 2
                      }
                    },
                    raw: '"foo"',
                    start: 30,
                    type: 'Literal',
                    value: 'foo'
                  },
                  loc: {
                    end: {
                      column: 22,
                      line: 2
                    },
                    start: {
                      column: 16,
                      line: 2
                    }
                  },
                  start: 30,
                  type: 'ExpressionStatement'
                },
                {
                  directive: '"bar"',
                  end: 69,
                  expression: {
                    end: 68,
                    loc: {
                      end: {
                        column: 26,
                        line: 3
                      },
                      start: {
                        column: 21,
                        line: 3
                      }
                    },
                    raw: '"bar"',
                    start: 63,
                    type: 'Literal',
                    value: 'bar'
                  },
                  loc: {
                    end: {
                      column: 27,
                      line: 3
                    },
                    start: {
                      column: 21,
                      line: 3
                    }
                  },
                  start: 63,
                  type: 'ExpressionStatement'
                }
              ],
              end: 87,
              loc: {
                end: {
                  column: 17,
                  line: 4
                },
                start: {
                  column: 12,
                  line: 1
                }
              },
              start: 12,
              type: 'BlockStatement'
            },
            end: 87,
            generator: false,
            id: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 9,
                  line: 1
                }
              },
              name: 'f',
              start: 9,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 17,
                line: 4
              },
              start: {
                column: 0,
                line: 1
              }
            },
            params: [],
            start: 0,
            type: 'FunctionDeclaration'
          }
        ],
        end: 87,
        loc: {
          end: {
            column: 17,
            line: 4
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
      `function f(){
                  "foo"
                  // stuff here
                  "bar";
                  }`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  end: 37,
                  expression: {
                    end: 37,
                    loc: {
                      end: {
                        column: 23,
                        line: 2
                      },
                      start: {
                        column: 18,
                        line: 2
                      }
                    },
                    raw: '"foo"',
                    start: 32,
                    type: 'Literal',
                    value: 'foo'
                  },
                  loc: {
                    end: {
                      column: 23,
                      line: 2
                    },
                    start: {
                      column: 18,
                      line: 2
                    }
                  },
                  start: 32,
                  directive: '"foo"',
                  type: 'ExpressionStatement'
                },
                {
                  directive: '"bar"',
                  end: 94,
                  expression: {
                    end: 93,
                    loc: {
                      end: {
                        column: 23,
                        line: 4
                      },
                      start: {
                        column: 18,
                        line: 4
                      }
                    },
                    raw: '"bar"',
                    start: 88,
                    type: 'Literal',
                    value: 'bar'
                  },
                  loc: {
                    end: {
                      column: 24,
                      line: 4
                    },
                    start: {
                      column: 18,
                      line: 4
                    }
                  },
                  start: 88,
                  type: 'ExpressionStatement'
                }
              ],
              end: 114,
              loc: {
                end: {
                  column: 19,
                  line: 5
                },
                start: {
                  column: 12,
                  line: 1
                }
              },
              start: 12,
              type: 'BlockStatement'
            },
            end: 114,
            generator: false,
            id: {
              end: 10,
              loc: {
                end: {
                  column: 10,
                  line: 1
                },
                start: {
                  column: 9,
                  line: 1
                }
              },
              name: 'f',
              start: 9,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 19,
                line: 5
              },
              start: {
                column: 0,
                line: 1
              }
            },
            params: [],
            start: 0,
            type: 'FunctionDeclaration'
          }
        ],
        end: 114,
        loc: {
          end: {
            column: 19,
            line: 5
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
      `function f(){
        foo();
        "use strict"
        (bar);
        "\\5";
      }`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 22,
                      end: 25,
                      loc: {
                        start: {
                          line: 2,
                          column: 8
                        },
                        end: {
                          line: 2,
                          column: 11
                        }
                      }
                    },
                    arguments: [],
                    start: 22,
                    end: 27,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 2,
                        column: 13
                      }
                    }
                  },
                  start: 22,
                  end: 28,
                  loc: {
                    start: {
                      line: 2,
                      column: 8
                    },
                    end: {
                      line: 2,
                      column: 14
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Literal',
                      value: 'use strict',
                      raw: '"use strict"',
                      start: 37,
                      end: 49,
                      loc: {
                        start: {
                          line: 3,
                          column: 8
                        },
                        end: {
                          line: 3,
                          column: 20
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'bar',
                        start: 59,
                        end: 62,
                        loc: {
                          start: {
                            line: 4,
                            column: 9
                          },
                          end: {
                            line: 4,
                            column: 12
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 63,
                    loc: {
                      start: {
                        line: 3,
                        column: 8
                      },
                      end: {
                        line: 4,
                        column: 13
                      }
                    }
                  },
                  start: 37,
                  end: 64,
                  loc: {
                    start: {
                      line: 3,
                      column: 8
                    },
                    end: {
                      line: 4,
                      column: 14
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: '\u0005',
                    raw: '"\\5"',
                    start: 73,
                    end: 77,
                    loc: {
                      start: {
                        line: 5,
                        column: 8
                      },
                      end: {
                        line: 5,
                        column: 12
                      }
                    }
                  },
                  start: 73,
                  end: 78,
                  loc: {
                    start: {
                      line: 5,
                      column: 8
                    },
                    end: {
                      line: 5,
                      column: 13
                    }
                  }
                }
              ],
              start: 12,
              end: 86,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 6,
                  column: 7
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
            end: 86,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 6,
                column: 7
              }
            }
          }
        ],
        start: 0,
        end: 86,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 6,
            column: 7
          }
        }
      }
    ],
    [
      `"use strict".foo;
          "use strict"[foo];
          "use strict"(foo);`,
      Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Literal',
                value: 'use strict',
                raw: '"use strict"',
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'foo',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Literal',
                value: 'use strict',
                raw: '"use strict"',
                start: 28,
                end: 40,
                loc: {
                  start: {
                    line: 2,
                    column: 10
                  },
                  end: {
                    line: 2,
                    column: 22
                  }
                }
              },
              computed: true,
              property: {
                type: 'Identifier',
                name: 'foo',
                start: 41,
                end: 44,
                loc: {
                  start: {
                    line: 2,
                    column: 23
                  },
                  end: {
                    line: 2,
                    column: 26
                  }
                }
              },
              start: 28,
              end: 45,
              loc: {
                start: {
                  line: 2,
                  column: 10
                },
                end: {
                  line: 2,
                  column: 27
                }
              }
            },
            start: 28,
            end: 46,
            loc: {
              start: {
                line: 2,
                column: 10
              },
              end: {
                line: 2,
                column: 28
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Literal',
                raw: '"use strict"',
                value: 'use strict',
                start: 57,
                end: 69,
                loc: {
                  start: {
                    line: 3,
                    column: 10
                  },
                  end: {
                    line: 3,
                    column: 22
                  }
                }
              },
              arguments: [
                {
                  type: 'Identifier',
                  name: 'foo',
                  start: 70,
                  end: 73,
                  loc: {
                    start: {
                      line: 3,
                      column: 23
                    },
                    end: {
                      line: 3,
                      column: 26
                    }
                  }
                }
              ],
              start: 57,
              end: 74,
              loc: {
                start: {
                  line: 3,
                  column: 10
                },
                end: {
                  line: 3,
                  column: 27
                }
              }
            },
            start: 57,
            end: 75,
            loc: {
              start: {
                line: 3,
                column: 10
              },
              end: {
                line: 3,
                column: 28
              }
            }
          }
        ],
        start: 0,
        end: 75,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 3,
            column: 28
          }
        }
      }
    ],
    [
      `'use strict'; foo`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw | Context.Module,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: "'use strict'",
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: "'use strict'",
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
              type: 'Identifier',
              name: 'foo',
              start: 14,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            start: 14,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 14
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
      `() => "use strict"`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Literal',
                value: 'use strict',
                raw: '"use strict"',
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
      `"\\u0075se strict"`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"\\u0075se strict"',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"\\u0075se strict"',
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
      `function f() {
        "use strict".foo;
        eval = 1
      }`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: 'use strict',
                      raw: '"use strict"',
                      start: 23,
                      end: 35,
                      loc: {
                        start: {
                          line: 2,
                          column: 8
                        },
                        end: {
                          line: 2,
                          column: 20
                        }
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 36,
                      end: 39,
                      loc: {
                        start: {
                          line: 2,
                          column: 21
                        },
                        end: {
                          line: 2,
                          column: 24
                        }
                      }
                    },
                    start: 23,
                    end: 39,
                    loc: {
                      start: {
                        line: 2,
                        column: 8
                      },
                      end: {
                        line: 2,
                        column: 24
                      }
                    }
                  },
                  start: 23,
                  end: 40,
                  loc: {
                    start: {
                      line: 2,
                      column: 8
                    },
                    end: {
                      line: 2,
                      column: 25
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'eval',
                      start: 49,
                      end: 53,
                      loc: {
                        start: {
                          line: 3,
                          column: 8
                        },
                        end: {
                          line: 3,
                          column: 12
                        }
                      }
                    },
                    operator: '=',
                    right: {
                      type: 'Literal',
                      value: 1,
                      raw: '1',
                      start: 56,
                      end: 57,
                      loc: {
                        start: {
                          line: 3,
                          column: 15
                        },
                        end: {
                          line: 3,
                          column: 16
                        }
                      }
                    },
                    start: 49,
                    end: 57,
                    loc: {
                      start: {
                        line: 3,
                        column: 8
                      },
                      end: {
                        line: 3,
                        column: 16
                      }
                    }
                  },
                  start: 49,
                  end: 57,
                  loc: {
                    start: {
                      line: 3,
                      column: 8
                    },
                    end: {
                      line: 3,
                      column: 16
                    }
                  }
                }
              ],
              start: 13,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 4,
                  column: 7
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
            end: 65,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 4,
                column: 7
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
            line: 4,
            column: 7
          }
        }
      }
    ],
    [
      `"ignore me"
      ++x`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"ignore me"',
            expression: {
              type: 'Literal',
              value: 'ignore me',
              raw: '"ignore me"',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'x',
                start: 20,
                end: 21,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 2,
                    column: 9
                  }
                }
              },
              operator: '++',
              prefix: true,
              start: 18,
              end: 21,
              loc: {
                start: {
                  line: 2,
                  column: 6
                },
                end: {
                  line: 2,
                  column: 9
                }
              }
            },
            start: 18,
            end: 21,
            loc: {
              start: {
                line: 2,
                column: 6
              },
              end: {
                line: 2,
                column: 9
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
            line: 2,
            column: 9
          }
        }
      }
    ],
    [
      `'foo';
        "bar";`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: "'foo'",
            expression: {
              type: 'Literal',
              value: 'foo',
              raw: "'foo'",
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
          },
          {
            type: 'ExpressionStatement',
            directive: '"bar"',
            expression: {
              type: 'Literal',
              value: 'bar',
              raw: '"bar"',
              start: 15,
              end: 20,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 13
                }
              }
            },
            start: 15,
            end: 21,
            loc: {
              start: {
                line: 2,
                column: 8
              },
              end: {
                line: 2,
                column: 14
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
            line: 2,
            column: 14
          }
        }
      }
    ],
    [
      `"foo"/*abc
          xyz*/"bar";`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"foo"',
            expression: {
              type: 'Literal',
              value: 'foo',
              raw: '"foo"',
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
          },
          {
            type: 'ExpressionStatement',
            directive: '"bar"',
            expression: {
              type: 'Literal',
              value: 'bar',
              raw: '"bar"',
              start: 26,
              end: 31,
              loc: {
                start: {
                  line: 2,
                  column: 15
                },
                end: {
                  line: 2,
                  column: 20
                }
              }
            },
            start: 26,
            end: 32,
            loc: {
              start: {
                line: 2,
                column: 15
              },
              end: {
                line: 2,
                column: 21
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
            line: 2,
            column: 21
          }
        }
      }
    ],

    [
      `"use asm"; "use strict"; foo`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"use asm"',
            expression: {
              type: 'Literal',
              raw: '"use asm"',
              value: 'use asm',
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
          {
            type: 'ExpressionStatement',
            directive: '"use strict"',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
              start: 11,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 11
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
          {
            type: 'ExpressionStatement',
            expression: {
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
      `; 'use strict'; with ({}) {}`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'EmptyStatement',
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
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: "'use strict'",
              start: 2,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            start: 2,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 15
              }
            }
          },
          {
            type: 'WithStatement',
            object: {
              type: 'ObjectExpression',
              properties: [],
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
            start: 16,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 16
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
      `("use strict")`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'ExpressionStatement',
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
            },
            expression: {
              type: 'Literal',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              },
              value: 'use strict',
              raw: '"use strict"'
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    // [`function hello() { "\\000"; "use strict"; }`, Context.OptionsNext | Context.OptionsLoc, {}]
    [
      `("use strict"); foo = 42;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
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
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              left: {
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
              operator: '=',
              right: {
                type: 'Literal',
                value: 42,
                raw: '42',
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
              start: 16,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
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
      `"use strict", "Hello\\312World"`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'Literal',
                  value: 'use strict',
                  raw: '"use strict"',
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
                {
                  type: 'Literal',
                  value: 'HelloÊWorld',
                  raw: '"Hello\\312World"',
                  start: 14,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
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
      `"use strict"; + 1`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
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
            directive: '"use strict"',
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
              type: 'UnaryExpression',
              operator: '+',
              argument: {
                type: 'Literal',
                value: 1,
                raw: '1',
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
              prefix: true,
              start: 14,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            start: 14,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 14
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
      `"USE STRICT";  var public = 1;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            directive: '"USE STRICT"',
            expression: {
              type: 'Literal',
              value: 'USE STRICT',
              raw: '"USE STRICT"',
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
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1,
                  raw: '1',
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
                id: {
                  type: 'Identifier',
                  name: 'public',
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
                start: 19,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 15,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 15
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
      `function a() { "use strict" } "use strict"; foo;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: 'use strict',
                    raw: '"use strict"',
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
                  directive: '"use strict"',
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
                }
              ],
              start: 13,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: '"use strict"',
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
            start: 30,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 30
              },
              end: {
                line: 1,
                column: 43
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo',
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
            start: 44,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 44
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseScript(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        directives: true,
        raw: true
      });
      t.deepStrictEqual(parser, expected);
    });
  }

  for (const [source, ctx, expected] of [
    [
      `'use strict'; foo`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsDirectives | Context.OptionsRaw | Context.Module,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExpressionStatement',
            directive: "'use strict'",
            expression: {
              type: 'Literal',
              value: 'use strict',
              raw: "'use strict'",
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
              type: 'Identifier',
              name: 'foo',
              start: 14,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            start: 14,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 14
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseModule(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        directives: true,
        raw: true
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
