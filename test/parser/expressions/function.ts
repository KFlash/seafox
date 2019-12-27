import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Expressions - Function', () => {
  for (const [source, ctx] of [
    [`function f(...(x)){}`, Context.Empty],
    [`function f(...rest + x){}`, Context.Empty],
    [`function f(a, ...rest, b){}`, Context.Empty],
    [`function f(...rest = x){}`, Context.Empty],
    [`function f(...rest, b){}`, Context.Empty],
    [`function f(...(x)){}`, Context.Empty],
    [`function f(...(x)){}`, Context.Empty],
    [`function f(...(x)){}`, Context.Empty],
    [`function f(...(x)){}`, Context.Empty],
    ['(function([...{ x }, y] = [1, 2, 3]) {})', Context.Empty],
    ['(function([...[ x ] = []] = []) {})', Context.Empty],
    ['(function([...[x], y]) {})', Context.Empty],
    ['(function([...[x], y]) {})', Context.Empty],
    ['(function([...[ x ] = []]) {})', Context.Empty],
    ['0, function(...x = []) {}', Context.Empty],
    ['0, function(...x = []) {};', Context.Empty],
    [`let x; { var x; }`, Context.OptionsLoc],

    [`function{}`, Context.OptionsLoc],
    [`function(){`, Context.OptionsLoc],
    [`var a = function()`, Context.OptionsLoc],
    [`function test() { yield while } `, Context.OptionsLoc],
    [`function(){}`, Context.OptionsLoc],
    [`function a(...){}`, Context.OptionsLoc],
    [`{ var x; } let x;`, Context.OptionsLoc],
    [`function foo(a, a) { }`, Context.OptionsLoc | Context.Strict | Context.Module],
    [`function foo(a) { let a; }`, Context.OptionsLoc],
    [`function f(a, b, a, c = 10) { }`, Context.OptionsLoc],
    [`function foo(a, b = () => a) { const b = 1; };`, Context.OptionsLoc],
    [`(function (e) { var e; const e = undefined; });`, Context.OptionsLoc],
    [`function x() {}const y = 4, x = 5;`, Context.OptionsLoc],
    [`function x() {}const x = function() {};`, Context.OptionsLoc],
    [`function f(){  for (var x;;); const x = 1  }`, Context.OptionsLoc],
    [`{ function f(){} function f(){} }`, Context.OptionsLoc | Context.OptionsDisableWebCompat],
    [
      `(function() { { function* foo() {} function foo() {} } })()`,
      Context.OptionsLoc | Context.OptionsDisableWebCompat
    ],
    [
      `(function() { { async function foo() {} async function foo() {} } })()`,
      Context.OptionsLoc | Context.OptionsDisableWebCompat
    ]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0,
          module: ((ctx as any) & Context.Module) !== 0
        });
      });
    });
  }

  const validSyntax = [
    '(function([[,] = function* g() {}]) {})',
    '(function([cover = (function () {}), xCover = (0, function() {})]) {})',
    '(function([fn = function () {}, xFn = function x() {}]) {})',
    '(function([x = 23]) {})',
    '(function([...[x, y, z]]) {})',
    '(function([...[,]]) {})',
    '(function([...x]) {})',
    '(function([...{ length }]) {})',
    '(function([x = 23] = [undefined]) {})',
    'function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {}',
    'function a6({a3, b2: { ba1, ...ba2 } }) {}',
    'function a7({a1 = 1, ...b1} = {}) {}',
    '(function a5({a3, b2: { ba1, ...ba2 }, ...c3}) {})',
    '(function a6({a3, b2: { ba1, ...ba2 } }) {})',
    '(function a7({a1 = 1, ...b1} = {}) {})',
    '(function a8([{...a1}]) {})',
    '(function a9([{a1, ...a2}]) {})',
    '(function a10([a1, {...a2}]) {})',
    '(function b2(a, ...b) {})',
    'f( ({...c}=o, c) )',
    '(function fn({a = 1, ...b} = {}) {   return {a, b}; })',
    // `(function package() { (function gave_away_the_package() { "use strict"; }) })`,
    //`(function (eval) { (function () { "use strict"; })})`,
    `function iceFapper(idiot) {}`,
    '(function([{ u: v, w: x, y: z } = { u: 444, w: 555, y: 666 }] = [{ u: 777, w: 888, y: 999 }]) {})',
    '(function({} = null) {})',
    'function f({foo}){}',
    'function f({foo:a}){}',
    'function f({foo:a=b}){}',
    'function f({foo}, bar){}',
    'function f(foo, {bar}){}',
    'function f({foo} = x, b){}',
    'function f({foo} = x, b = y){}',
    'function f(x, {foo} = y){}',
    'function f(x = y, {foo} = z){}',
    'function f({foo=a} = x){}',
    'function f([]){}',
    'function f([] = x){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([,,]){}',
    'function f([,,] = x){}',
    'function f([foo]){}',
    'function f([foo] = x){}',
    'function f([foo,]){}',
    'function f([foo,] = x){}',
    'function f([foo,,]){}',
    'function f([foo,,] = x){}',
    'function f([,foo]){}',
    'function f([,foo] = x){}',
    'function f([,,foo]){}',
    'function f([,,foo] = x){}',
    'function f([foo,bar]){}',
    'function f([foo,bar] = x){}',
    'function f([foo,,bar]){}',
    'function f([foo,,bar] = x){}',
    'function f([foo], [bar]){}',
    'function f([foo] = x, [bar] = y){}',
    'function f([foo], b){}',
    'function f([foo] = x, b){}',
    'function f([foo], b = y){}',
    'function f([foo] = x, b = y){}',
    'function f(x, [foo]){}',
    'function f(x, [foo] = y){}',
    'function f(x = y, [foo] = z){}',
    'function f(x = y, [foo]){}',
    'function f([foo=a]){}',
    'function a() {  function get(directory) { }  }',
    'function f([foo=a] = c){}',
    'function f([foo=a,bar]){}',
    'function f([foo=a,bar] = x){}',
    'function f([foo,bar=b]){}',
    'function f([foo,bar=b] = x){}',
    'function f([foo=a,bar=b]){}',
    'function f([foo=a,bar=b] = x){}',
    'function f([...bar] = obj){}',
    'function f([]){}',
    'function f([] = x){}',
    'function f([,]){}',
    'function f([,] = x){}',
    'function f([,,]){}',
    'function f([,,] = x){}',
    'function f([foo]){}',
    'function f([foo] = x){}',
    'function f([foo,]){}',
    'function f([foo,] = x){}',
    'function f([foo,,]){}',
    'function f([foo,,] = x){}',
    'function f([,foo]){}',
    'function f([,foo] = x){}',
    'function f([,,foo]){}',
    'function f([,,foo] = x){}',
    'function f([,,async] = x){}',
    'function f([foo,bar]){}',
    'function f(async,){}',
    'function f([,async]){}',
    'function f(async = 1){}',
    'function f(foo, async = 1){}',
    'function f([foo,bar] = x){}',
    'function f([foo,,bar]){}',
    'function f([foo,,bar] = x){}',
    'function f([foo], [bar]){}',
    'function f([foo], [async]){}',
    'function f([foo] = x, [bar] = y){}',
    'function f([foo], b){}',
    'function f([foo] = x, b){}',
    'function f([foo], b = y){}',
    `(function foo(y, z) {{ function x() {} } })(1);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {} } })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
    // Complex parameter shouldn't be shadowed
    `(function foo(x = 0) { var x; { function x() {}} })(1);`,
    // Nested complex parameter shouldn't be shadowed
    `(function foo([[x]]) { var x;{ function x() {} }  })([[1]]);`,
    // Rest parameter shouldn't be shadowed
    `(function foo(...x) { var x; {  function x() {}  } })(1);`,
    // Don't shadow complex rest parameter
    `(function foo(...[x]) { var x; { function x() {} } })(1);`,
    // Hoisting is not affected by other simple parameters
    `(function foo(y, z) {{function x() {}} })(1);`,
    // Hoisting is not affected by other complex parameters
    ` (function foo([y] = [], z) {{function x() {} } })();`,
    // Should allow shadowing function names
    `{(function foo() { { function foo() { return 0; } } })();}`,
    `{(function foo(...r) { { function foo() { return 0; } } })(); }`,
    `(function foo() { { let f = 0; (function () { { function f() { return 1; } } })(); } })();`,
    `(function foo() { var y = 1; (function bar(x = y) { { function y() {} } })();  })();`,
    `(function foo() { { function f() { return 4; } { function f() { return 5; } } }})()`,
    '(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();',
    '(function conditional() {  if (true) { function f() { return 1; } } else {  function f() { return 2; }} if (false) { function g() { return 1; }}  L: {break L;function f() { return 3; } }})();',
    '(function foo() {function outer() { return f; } { f = 1; function f () {} f = ""; } })();',
    '(function foo(x) { {  function x() {} } })(1);',
    '(function foo([[x]]) { { function x() {}}})([[1]]);',
    // rest parameter shouldn't be shadowed
    '(function shadowingRestParameterDoesntBind(...x) { {  function x() {} } })(1);'
  ];

  for (const arg of validSyntax) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `function f(async = await){}`,
      Context.OptionsLoc,
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
                  name: 'async',
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
                right: {
                  type: 'Identifier',
                  name: 'await',
                  start: 19,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 24
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
              }
            ],
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
      `foo(function(){})`,
      Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 14,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: null,
                  start: 4,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `(function (x = yield) {})`,
      Context.OptionsLoc,
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
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
                  start: 11,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
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
              id: null,
              start: 1,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 24
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
      `(function f(...rest){})`,
      Context.OptionsLoc,
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
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'rest',
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
                }
              ],
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
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 22
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
      `(function f(a, b, ...rest){})`,
      Context.OptionsLoc,
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
                {
                  type: 'Identifier',
                  name: 'b',
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
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'rest',
                    start: 21,
                    end: 25,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 25
                      }
                    }
                  },
                  start: 18,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                }
              ],
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
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
    [
      `x = function f(a = b,){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
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
                  }
                ],
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
                  name: 'f',
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
                start: 4,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([x],){}`,
      Context.OptionsLoc,
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
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      }
                    ],
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
                  name: 'f',
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
                start: 4,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f({a},){}`,
      Context.OptionsLoc,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                  name: 'f',
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
                start: 4,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([x] = y,){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
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
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f({a} = b,){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f(a=b=c){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'b',
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
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'c',
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
                  }
                ],
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 23
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
      `x = function f([] = x){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [],
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
                    right: {
                      type: 'Identifier',
                      name: 'x',
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
                    start: 15,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
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
                  name: 'f',
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
                start: 4,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([,] = x){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [null],
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
                    right: {
                      type: 'Identifier',
                      name: 'x',
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
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 23,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([,,] = x){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [null, null],
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
                    right: {
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
                    start: 15,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 23
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([foo] = x){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
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
                    right: {
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
                    start: 15,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  }
                ],
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([,foo]){}`,
      Context.OptionsLoc,
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
                    type: 'ArrayPattern',
                    elements: [
                      null,
                      {
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
                      }
                    ],
                    start: 15,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
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
                  name: 'f',
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
                start: 4,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f(x, [foo]){}`,
      Context.OptionsLoc,
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
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      }
                    ],
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f(x = y, [foo] = z){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
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
                    right: {
                      type: 'Identifier',
                      name: 'z',
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
                    start: 22,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 31
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([...bar] = obj){}`,
      Context.OptionsLoc,
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'bar',
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
                          start: 16,
                          end: 22,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 22
                            }
                          }
                        }
                      ],
                      start: 15,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'obj',
                      start: 26,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
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
                  }
                ],
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
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `x = function f([foo, ...bar]){}`,
      Context.OptionsLoc,
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
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'bar',
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
                        start: 21,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      }
                    ],
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
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 29,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 29
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 4,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `(function *fn( {x1:x1}, [y1]  ) {})`,
      Context.OptionsLoc,
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x1',
                        start: 16,
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 'x1',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    }
                  ],
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
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'y1',
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
                    }
                  ],
                  start: 24,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 28
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
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'fn',
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
      `(async function({x:x}) {})`,
      Context.OptionsLoc,
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
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'Identifier',
                        name: 'x',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    }
                  ],
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
                }
              ],
              body: {
                type: 'BlockStatement',
                body: [],
                start: 23,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              async: true,
              generator: false,
              id: null,
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
    ],
    [
      `(function (eval) { function foo() { "use strict"; }})`,
      Context.OptionsLoc,
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
                  name: 'eval',
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
                }
              ],
              body: {
                type: 'BlockStatement',
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
                            start: 36,
                            end: 48,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 48
                              }
                            }
                          },
                          start: 36,
                          end: 49,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 49
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 51,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 51
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
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
                    end: 51,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 51
                      }
                    }
                  }
                ],
                start: 17,
                end: 52,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 52
                  }
                }
              },
              async: false,
              generator: false,
              id: null,
              start: 1,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 52
                }
              }
            },
            start: 0,
            end: 53,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 53
              }
            }
          }
        ],
        start: 0,
        end: 53,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 53
          }
        }
      }
    ],
    [
      `(function package() { (function gave_away_the_package() { "use strict"; }) })`,
      Context.OptionsLoc,
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
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Literal',
                              value: 'use strict',
                              start: 58,
                              end: 70,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 58
                                },
                                end: {
                                  line: 1,
                                  column: 70
                                }
                              }
                            },
                            start: 58,
                            end: 71,
                            loc: {
                              start: {
                                line: 1,
                                column: 58
                              },
                              end: {
                                line: 1,
                                column: 71
                              }
                            }
                          }
                        ],
                        start: 56,
                        end: 73,
                        loc: {
                          start: {
                            line: 1,
                            column: 56
                          },
                          end: {
                            line: 1,
                            column: 73
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'gave_away_the_package',
                        start: 32,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      },
                      start: 23,
                      end: 73,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 73
                        }
                      }
                    },
                    start: 22,
                    end: 74,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 74
                      }
                    }
                  }
                ],
                start: 20,
                end: 76,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 76
                  }
                }
              },
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'package',
                start: 10,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              start: 1,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 76
                }
              }
            },
            start: 0,
            end: 77,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 77
              }
            }
          }
        ],
        start: 0,
        end: 77,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 77
          }
        }
      }
    ],
    [
      `function f(...rest){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'RestElement',
                argument: {
                  type: 'Identifier',
                  name: 'rest',
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
      `function f([foo] = x, b){}`,
      Context.OptionsLoc,
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
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    }
                  ],
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
                right: {
                  type: 'Identifier',
                  name: 'x',
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
                start: 11,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              {
                type: 'Identifier',
                name: 'b',
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
      `function f([foo,,bar] = x){}`,
      Context.OptionsLoc,
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
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    null,
                    {
                      type: 'Identifier',
                      name: 'bar',
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
                    }
                  ],
                  start: 11,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                right: {
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
                start: 11,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              }
            ],
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
      `function f([] = x){}`,
      Context.OptionsLoc,
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
                  type: 'ArrayPattern',
                  elements: [],
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
                right: {
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
            body: {
              type: 'BlockStatement',
              body: [],
              start: 18,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 20
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
      `typeof async function f(){}
      /foo/g`,
      Context.OptionsLoc,
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
                  type: 'UnaryExpression',
                  operator: 'typeof',
                  argument: {
                    type: 'FunctionExpression',
                    params: [],
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
                    async: true,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
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
                  },
                  prefix: true,
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
                right: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 35,
                  end: 38,
                  loc: {
                    start: {
                      line: 2,
                      column: 7
                    },
                    end: {
                      line: 2,
                      column: 10
                    }
                  }
                },
                operator: '/',
                start: 0,
                end: 38,
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
                start: 39,
                end: 40,
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
              end: 40,
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
            end: 40,
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
        end: 40,
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
      `typeof function f(){}
        /foo/g`,
      Context.OptionsLoc,
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
                  type: 'UnaryExpression',
                  operator: 'typeof',
                  argument: {
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
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
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
                  prefix: true,
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
                right: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 31,
                  end: 34,
                  loc: {
                    start: {
                      line: 2,
                      column: 9
                    },
                    end: {
                      line: 2,
                      column: 12
                    }
                  }
                },
                operator: '/',
                start: 0,
                end: 34,
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
              right: {
                type: 'Identifier',
                name: 'g',
                start: 35,
                end: 36,
                loc: {
                  start: {
                    line: 2,
                    column: 13
                  },
                  end: {
                    line: 2,
                    column: 14
                  }
                }
              },
              operator: '/',
              start: 0,
              end: 36,
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
            },
            start: 0,
            end: 36,
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
        start: 0,
        end: 36,
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
      `foo(function*(){})`,
      Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
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
                  async: false,
                  generator: true,
                  id: null,
                  start: 4,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 17
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
      `{ function* foo() {}; }; let foo;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 18,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                async: false,
                generator: true,
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
                start: 2,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 2
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
          },
          {
            type: 'EmptyStatement',
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
              }
            ],
            start: 25,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 25
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
      `function f(x) { { let x } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
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
                }
              ],
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
      `function f(x) { { const x = y } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Identifier',
                            name: 'y',
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
                          start: 24,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 18,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    }
                  ],
                  start: 16,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
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
      `function f(x) { { var x } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
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
                }
              ],
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
      `function f([f]) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'f',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
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
      `function f(x) { function x() {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 29,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  async: false,
                  generator: false,
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
                  start: 16,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
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
      `function f() {{let f}}`,
      Context.OptionsLoc,
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
                            name: 'f',
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
                    }
                  ],
                  start: 14,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                }
              ],
              start: 13,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `function f(){ function x(){} var x = y; }`,
      Context.OptionsLoc,
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
                {
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Identifier',
                        name: 'y',
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
                      id: {
                        type: 'Identifier',
                        name: 'x',
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
                    }
                  ],
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
                }
              ],
              start: 12,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 41
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
      `function f(){ var x = y; function x(){} }`,
      Context.OptionsLoc,
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
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Identifier',
                        name: 'y',
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
                  start: 14,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  }
                },
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 37,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'x',
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
              start: 12,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 12
                },
                end: {
                  line: 1,
                  column: 41
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
      `x=function f(){ let f }`,
      Context.OptionsLoc,
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
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'f',
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
                    }
                  ],
                  start: 14,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 2,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 23
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
      `function foo({x:x}, {y:y}, {z:z}) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y',
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
                    value: {
                      type: 'Identifier',
                      name: 'y',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                start: 20,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'z',
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
                    value: {
                      type: 'Identifier',
                      name: 'z',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  }
                ],
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
              }
            ],
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
            async: false,
            generator: false,
            id: {
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
      `function foo([x]) { var x = 10;}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  }
                ],
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 10,
                        start: 28,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
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
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    }
                  ],
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
              start: 18,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            async: false,
            generator: false,
            id: {
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
      `(function () { { let x = 'let x'; } { let y = 'let y'; } })();`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'VariableDeclaration',
                          kind: 'let',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              init: {
                                type: 'Literal',
                                value: 'let x',
                                start: 25,
                                end: 32,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 25
                                  },
                                  end: {
                                    line: 1,
                                    column: 32
                                  }
                                }
                              },
                              id: {
                                type: 'Identifier',
                                name: 'x',
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
                              start: 21,
                              end: 32,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 21
                                },
                                end: {
                                  line: 1,
                                  column: 32
                                }
                              }
                            }
                          ],
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
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'VariableDeclaration',
                          kind: 'let',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              init: {
                                type: 'Literal',
                                value: 'let y',
                                start: 46,
                                end: 53,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 46
                                  },
                                  end: {
                                    line: 1,
                                    column: 53
                                  }
                                }
                              },
                              id: {
                                type: 'Identifier',
                                name: 'y',
                                start: 42,
                                end: 43,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 43
                                  }
                                }
                              },
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
                            }
                          ],
                          start: 38,
                          end: 54,
                          loc: {
                            start: {
                              line: 1,
                              column: 38
                            },
                            end: {
                              line: 1,
                              column: 54
                            }
                          }
                        }
                      ],
                      start: 36,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 56
                        }
                      }
                    }
                  ],
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
                async: false,
                generator: false,
                id: null,
                start: 1,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 58
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
            start: 0,
            end: 62,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 62
              }
            }
          }
        ],
        start: 0,
        end: 62,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 62
          }
        }
      }
    ],
    [
      `async function af(x) { function x() { } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
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
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'x',
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
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'af',
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
      `function *f(){} { function *f(){} }`,
      Context.OptionsLoc,
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
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            async: false,
            generator: true,
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
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
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
                async: false,
                generator: true,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 18,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              }
            ],
            start: 16,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 16
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
      `(function foo([[x]]) {var x; {function x() {} } })([[1]]);`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'ArrayPattern',
                        elements: [
                          {
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
                          }
                        ],
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
                    start: 14,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  }
                ],
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
                    },
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 43,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
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
                          start: 30,
                          end: 45,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 45
                            }
                          }
                        }
                      ],
                      start: 29,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
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
                start: 1,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              arguments: [
                {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Literal',
                          value: 1,
                          start: 53,
                          end: 54,
                          loc: {
                            start: {
                              line: 1,
                              column: 53
                            },
                            end: {
                              line: 1,
                              column: 54
                            }
                          }
                        }
                      ],
                      start: 52,
                      end: 55,
                      loc: {
                        start: {
                          line: 1,
                          column: 52
                        },
                        end: {
                          line: 1,
                          column: 55
                        }
                      }
                    }
                  ],
                  start: 51,
                  end: 56,
                  loc: {
                    start: {
                      line: 1,
                      column: 51
                    },
                    end: {
                      line: 1,
                      column: 56
                    }
                  }
                }
              ],
              start: 0,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 57
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
      `(function foo(...x) { var x; {  function x() {}  } })(1);`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'RestElement',
                    argument: {
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
                  }
                ],
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
                    },
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 45,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 45
                              },
                              end: {
                                line: 1,
                                column: 47
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'x',
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
                        }
                      ],
                      start: 29,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      }
                    }
                  ],
                  start: 20,
                  end: 52,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 52
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
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
                start: 1,
                end: 52,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 52
                  }
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1,
                  start: 54,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 54
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 0,
              end: 56,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 56
                }
              }
            },
            start: 0,
            end: 57,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 57
              }
            }
          }
        ],
        start: 0,
        end: 57,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 57
          }
        }
      }
    ],
    [
      `(function foo(y, z) {{function x() {}} })(1);`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'Identifier',
                    name: 'y',
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
                  {
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
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'FunctionDeclaration',
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
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'x',
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
                          start: 22,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    }
                  ],
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
                },
                async: false,
                generator: false,
                id: {
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
                start: 1,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 1,
                  start: 42,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 43
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
      `(function foo(a = 0) { { let y = 3; function f(b = 0) { y = 2; } f(); } })();`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    right: {
                      type: 'Literal',
                      value: 0,
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
                    start: 14,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'VariableDeclaration',
                          kind: 'let',
                          declarations: [
                            {
                              type: 'VariableDeclarator',
                              init: {
                                type: 'Literal',
                                value: 3,
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
                              id: {
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
                              start: 29,
                              end: 34,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 29
                                },
                                end: {
                                  line: 1,
                                  column: 34
                                }
                              }
                            }
                          ],
                          start: 25,
                          end: 35,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 35
                            }
                          }
                        },
                        {
                          type: 'FunctionDeclaration',
                          params: [
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'b',
                                start: 47,
                                end: 48,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 47
                                  },
                                  end: {
                                    line: 1,
                                    column: 48
                                  }
                                }
                              },
                              right: {
                                type: 'Literal',
                                value: 0,
                                start: 51,
                                end: 52,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 51
                                  },
                                  end: {
                                    line: 1,
                                    column: 52
                                  }
                                }
                              },
                              start: 47,
                              end: 52,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 47
                                },
                                end: {
                                  line: 1,
                                  column: 52
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
                                  type: 'AssignmentExpression',
                                  left: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                  operator: '=',
                                  right: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 60,
                                    end: 61,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 60
                                      },
                                      end: {
                                        line: 1,
                                        column: 61
                                      }
                                    }
                                  },
                                  start: 56,
                                  end: 61,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 56
                                    },
                                    end: {
                                      line: 1,
                                      column: 61
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
                              }
                            ],
                            start: 54,
                            end: 64,
                            loc: {
                              start: {
                                line: 1,
                                column: 54
                              },
                              end: {
                                line: 1,
                                column: 64
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 45,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 45
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          },
                          start: 36,
                          end: 64,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 64
                            }
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Identifier',
                              name: 'f',
                              start: 65,
                              end: 66,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 65
                                },
                                end: {
                                  line: 1,
                                  column: 66
                                }
                              }
                            },
                            arguments: [],
                            start: 65,
                            end: 68,
                            loc: {
                              start: {
                                line: 1,
                                column: 65
                              },
                              end: {
                                line: 1,
                                column: 68
                              }
                            }
                          },
                          start: 65,
                          end: 69,
                          loc: {
                            start: {
                              line: 1,
                              column: 65
                            },
                            end: {
                              line: 1,
                              column: 69
                            }
                          }
                        }
                      ],
                      start: 23,
                      end: 71,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 71
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 73,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 73
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
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
                start: 1,
                end: 73,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 73
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 76
                }
              }
            },
            start: 0,
            end: 77,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 77
              }
            }
          }
        ],
        start: 0,
        end: 77,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 77
          }
        }
      }
    ],
    [
      `(function() {
      var x = 1;
      (() => x);
      var y = "y";
      var z = "z";
      (function() {
        var x = 2;
        (function() {
          y;
          debugger;
        })();
      })();
      return y;
    })();`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 1,
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 2,
                                column: 14
                              },
                              end: {
                                line: 2,
                                column: 15
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 24,
                            end: 25,
                            loc: {
                              start: {
                                line: 2,
                                column: 10
                              },
                              end: {
                                line: 2,
                                column: 11
                              }
                            }
                          },
                          start: 24,
                          end: 29,
                          loc: {
                            start: {
                              line: 2,
                              column: 10
                            },
                            end: {
                              line: 2,
                              column: 15
                            }
                          }
                        }
                      ],
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 2,
                          column: 6
                        },
                        end: {
                          line: 2,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                          type: 'Identifier',
                          name: 'x',
                          start: 44,
                          end: 45,
                          loc: {
                            start: {
                              line: 3,
                              column: 13
                            },
                            end: {
                              line: 3,
                              column: 14
                            }
                          }
                        },
                        params: [],
                        async: false,
                        expression: true,
                        start: 38,
                        end: 45,
                        loc: {
                          start: {
                            line: 3,
                            column: 7
                          },
                          end: {
                            line: 3,
                            column: 14
                          }
                        }
                      },
                      start: 37,
                      end: 47,
                      loc: {
                        start: {
                          line: 3,
                          column: 6
                        },
                        end: {
                          line: 3,
                          column: 16
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
                            value: 'y',
                            start: 62,
                            end: 65,
                            loc: {
                              start: {
                                line: 4,
                                column: 14
                              },
                              end: {
                                line: 4,
                                column: 17
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'y',
                            start: 58,
                            end: 59,
                            loc: {
                              start: {
                                line: 4,
                                column: 10
                              },
                              end: {
                                line: 4,
                                column: 11
                              }
                            }
                          },
                          start: 58,
                          end: 65,
                          loc: {
                            start: {
                              line: 4,
                              column: 10
                            },
                            end: {
                              line: 4,
                              column: 17
                            }
                          }
                        }
                      ],
                      start: 54,
                      end: 66,
                      loc: {
                        start: {
                          line: 4,
                          column: 6
                        },
                        end: {
                          line: 4,
                          column: 18
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
                            value: 'z',
                            start: 81,
                            end: 84,
                            loc: {
                              start: {
                                line: 5,
                                column: 14
                              },
                              end: {
                                line: 5,
                                column: 17
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'z',
                            start: 77,
                            end: 78,
                            loc: {
                              start: {
                                line: 5,
                                column: 10
                              },
                              end: {
                                line: 5,
                                column: 11
                              }
                            }
                          },
                          start: 77,
                          end: 84,
                          loc: {
                            start: {
                              line: 5,
                              column: 10
                            },
                            end: {
                              line: 5,
                              column: 17
                            }
                          }
                        }
                      ],
                      start: 73,
                      end: 85,
                      loc: {
                        start: {
                          line: 5,
                          column: 6
                        },
                        end: {
                          line: 5,
                          column: 18
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'CallExpression',
                        optional: false,
                        shortCircuited: false,
                        callee: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: [
                                  {
                                    type: 'VariableDeclarator',
                                    init: {
                                      type: 'Literal',
                                      value: 2,
                                      start: 122,
                                      end: 123,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 16
                                        },
                                        end: {
                                          line: 7,
                                          column: 17
                                        }
                                      }
                                    },
                                    id: {
                                      type: 'Identifier',
                                      name: 'x',
                                      start: 118,
                                      end: 119,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 12
                                        },
                                        end: {
                                          line: 7,
                                          column: 13
                                        }
                                      }
                                    },
                                    start: 118,
                                    end: 123,
                                    loc: {
                                      start: {
                                        line: 7,
                                        column: 12
                                      },
                                      end: {
                                        line: 7,
                                        column: 17
                                      }
                                    }
                                  }
                                ],
                                start: 114,
                                end: 124,
                                loc: {
                                  start: {
                                    line: 7,
                                    column: 8
                                  },
                                  end: {
                                    line: 7,
                                    column: 18
                                  }
                                }
                              },
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'CallExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  callee: {
                                    type: 'FunctionExpression',
                                    params: [],
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'ExpressionStatement',
                                          expression: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 157,
                                            end: 158,
                                            loc: {
                                              start: {
                                                line: 9,
                                                column: 10
                                              },
                                              end: {
                                                line: 9,
                                                column: 11
                                              }
                                            }
                                          },
                                          start: 157,
                                          end: 159,
                                          loc: {
                                            start: {
                                              line: 9,
                                              column: 10
                                            },
                                            end: {
                                              line: 9,
                                              column: 12
                                            }
                                          }
                                        },
                                        {
                                          type: 'DebuggerStatement',
                                          start: 170,
                                          end: 179,
                                          loc: {
                                            start: {
                                              line: 10,
                                              column: 10
                                            },
                                            end: {
                                              line: 10,
                                              column: 19
                                            }
                                          }
                                        }
                                      ],
                                      start: 145,
                                      end: 189,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 20
                                        },
                                        end: {
                                          line: 11,
                                          column: 9
                                        }
                                      }
                                    },
                                    async: false,
                                    generator: false,
                                    id: null,
                                    start: 134,
                                    end: 189,
                                    loc: {
                                      start: {
                                        line: 8,
                                        column: 9
                                      },
                                      end: {
                                        line: 11,
                                        column: 9
                                      }
                                    }
                                  },
                                  arguments: [],
                                  start: 133,
                                  end: 192,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 8
                                    },
                                    end: {
                                      line: 11,
                                      column: 12
                                    }
                                  }
                                },
                                start: 133,
                                end: 193,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 8
                                  },
                                  end: {
                                    line: 11,
                                    column: 13
                                  }
                                }
                              }
                            ],
                            start: 104,
                            end: 201,
                            loc: {
                              start: {
                                line: 6,
                                column: 18
                              },
                              end: {
                                line: 12,
                                column: 7
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: null,
                          start: 93,
                          end: 201,
                          loc: {
                            start: {
                              line: 6,
                              column: 7
                            },
                            end: {
                              line: 12,
                              column: 7
                            }
                          }
                        },
                        arguments: [],
                        start: 92,
                        end: 204,
                        loc: {
                          start: {
                            line: 6,
                            column: 6
                          },
                          end: {
                            line: 12,
                            column: 10
                          }
                        }
                      },
                      start: 92,
                      end: 205,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 12,
                          column: 11
                        }
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'Identifier',
                        name: 'y',
                        start: 219,
                        end: 220,
                        loc: {
                          start: {
                            line: 13,
                            column: 13
                          },
                          end: {
                            line: 13,
                            column: 14
                          }
                        }
                      },
                      start: 212,
                      end: 221,
                      loc: {
                        start: {
                          line: 13,
                          column: 6
                        },
                        end: {
                          line: 13,
                          column: 15
                        }
                      }
                    }
                  ],
                  start: 12,
                  end: 227,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 14,
                      column: 5
                    }
                  }
                },
                async: false,
                generator: false,
                id: null,
                start: 1,
                end: 227,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 14,
                    column: 5
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 230,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 14,
                  column: 8
                }
              }
            },
            start: 0,
            end: 231,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 14,
                column: 9
              }
            }
          }
        ],
        start: 0,
        end: 231,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 14,
            column: 9
          }
        }
      }
    ],
    [
      `(function() {
      var x = 1;
      (() => x);
      var y = "y";
      var z = "z";
      (function() {
        var x = 2;
        (() => {
          y;
          a;
          this;
          debugger;
        })();
      })();
      return y;
    })();`,
      Context.OptionsLoc,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 1,
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 2,
                                column: 14
                              },
                              end: {
                                line: 2,
                                column: 15
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'x',
                            start: 24,
                            end: 25,
                            loc: {
                              start: {
                                line: 2,
                                column: 10
                              },
                              end: {
                                line: 2,
                                column: 11
                              }
                            }
                          },
                          start: 24,
                          end: 29,
                          loc: {
                            start: {
                              line: 2,
                              column: 10
                            },
                            end: {
                              line: 2,
                              column: 15
                            }
                          }
                        }
                      ],
                      start: 20,
                      end: 30,
                      loc: {
                        start: {
                          line: 2,
                          column: 6
                        },
                        end: {
                          line: 2,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'ArrowFunctionExpression',
                        body: {
                          type: 'Identifier',
                          name: 'x',
                          start: 44,
                          end: 45,
                          loc: {
                            start: {
                              line: 3,
                              column: 13
                            },
                            end: {
                              line: 3,
                              column: 14
                            }
                          }
                        },
                        params: [],
                        async: false,
                        expression: true,
                        start: 38,
                        end: 45,
                        loc: {
                          start: {
                            line: 3,
                            column: 7
                          },
                          end: {
                            line: 3,
                            column: 14
                          }
                        }
                      },
                      start: 37,
                      end: 47,
                      loc: {
                        start: {
                          line: 3,
                          column: 6
                        },
                        end: {
                          line: 3,
                          column: 16
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
                            value: 'y',
                            start: 62,
                            end: 65,
                            loc: {
                              start: {
                                line: 4,
                                column: 14
                              },
                              end: {
                                line: 4,
                                column: 17
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'y',
                            start: 58,
                            end: 59,
                            loc: {
                              start: {
                                line: 4,
                                column: 10
                              },
                              end: {
                                line: 4,
                                column: 11
                              }
                            }
                          },
                          start: 58,
                          end: 65,
                          loc: {
                            start: {
                              line: 4,
                              column: 10
                            },
                            end: {
                              line: 4,
                              column: 17
                            }
                          }
                        }
                      ],
                      start: 54,
                      end: 66,
                      loc: {
                        start: {
                          line: 4,
                          column: 6
                        },
                        end: {
                          line: 4,
                          column: 18
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
                            value: 'z',
                            start: 81,
                            end: 84,
                            loc: {
                              start: {
                                line: 5,
                                column: 14
                              },
                              end: {
                                line: 5,
                                column: 17
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'z',
                            start: 77,
                            end: 78,
                            loc: {
                              start: {
                                line: 5,
                                column: 10
                              },
                              end: {
                                line: 5,
                                column: 11
                              }
                            }
                          },
                          start: 77,
                          end: 84,
                          loc: {
                            start: {
                              line: 5,
                              column: 10
                            },
                            end: {
                              line: 5,
                              column: 17
                            }
                          }
                        }
                      ],
                      start: 73,
                      end: 85,
                      loc: {
                        start: {
                          line: 5,
                          column: 6
                        },
                        end: {
                          line: 5,
                          column: 18
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'CallExpression',
                        optional: false,
                        shortCircuited: false,
                        callee: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'VariableDeclaration',
                                kind: 'var',
                                declarations: [
                                  {
                                    type: 'VariableDeclarator',
                                    init: {
                                      type: 'Literal',
                                      value: 2,
                                      start: 122,
                                      end: 123,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 16
                                        },
                                        end: {
                                          line: 7,
                                          column: 17
                                        }
                                      }
                                    },
                                    id: {
                                      type: 'Identifier',
                                      name: 'x',
                                      start: 118,
                                      end: 119,
                                      loc: {
                                        start: {
                                          line: 7,
                                          column: 12
                                        },
                                        end: {
                                          line: 7,
                                          column: 13
                                        }
                                      }
                                    },
                                    start: 118,
                                    end: 123,
                                    loc: {
                                      start: {
                                        line: 7,
                                        column: 12
                                      },
                                      end: {
                                        line: 7,
                                        column: 17
                                      }
                                    }
                                  }
                                ],
                                start: 114,
                                end: 124,
                                loc: {
                                  start: {
                                    line: 7,
                                    column: 8
                                  },
                                  end: {
                                    line: 7,
                                    column: 18
                                  }
                                }
                              },
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'CallExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  callee: {
                                    type: 'ArrowFunctionExpression',
                                    body: {
                                      type: 'BlockStatement',
                                      body: [
                                        {
                                          type: 'ExpressionStatement',
                                          expression: {
                                            type: 'Identifier',
                                            name: 'y',
                                            start: 152,
                                            end: 153,
                                            loc: {
                                              start: {
                                                line: 9,
                                                column: 10
                                              },
                                              end: {
                                                line: 9,
                                                column: 11
                                              }
                                            }
                                          },
                                          start: 152,
                                          end: 154,
                                          loc: {
                                            start: {
                                              line: 9,
                                              column: 10
                                            },
                                            end: {
                                              line: 9,
                                              column: 12
                                            }
                                          }
                                        },
                                        {
                                          type: 'ExpressionStatement',
                                          expression: {
                                            type: 'Identifier',
                                            name: 'a',
                                            start: 165,
                                            end: 166,
                                            loc: {
                                              start: {
                                                line: 10,
                                                column: 10
                                              },
                                              end: {
                                                line: 10,
                                                column: 11
                                              }
                                            }
                                          },
                                          start: 165,
                                          end: 167,
                                          loc: {
                                            start: {
                                              line: 10,
                                              column: 10
                                            },
                                            end: {
                                              line: 10,
                                              column: 12
                                            }
                                          }
                                        },
                                        {
                                          type: 'ExpressionStatement',
                                          expression: {
                                            type: 'ThisExpression',
                                            start: 178,
                                            end: 182,
                                            loc: {
                                              start: {
                                                line: 11,
                                                column: 10
                                              },
                                              end: {
                                                line: 11,
                                                column: 14
                                              }
                                            }
                                          },
                                          start: 178,
                                          end: 183,
                                          loc: {
                                            start: {
                                              line: 11,
                                              column: 10
                                            },
                                            end: {
                                              line: 11,
                                              column: 15
                                            }
                                          }
                                        },
                                        {
                                          type: 'DebuggerStatement',
                                          start: 194,
                                          end: 203,
                                          loc: {
                                            start: {
                                              line: 12,
                                              column: 10
                                            },
                                            end: {
                                              line: 12,
                                              column: 19
                                            }
                                          }
                                        }
                                      ],
                                      start: 140,
                                      end: 213,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 15
                                        },
                                        end: {
                                          line: 13,
                                          column: 9
                                        }
                                      }
                                    },
                                    params: [],
                                    async: false,
                                    expression: false,
                                    start: 134,
                                    end: 213,
                                    loc: {
                                      start: {
                                        line: 8,
                                        column: 9
                                      },
                                      end: {
                                        line: 13,
                                        column: 9
                                      }
                                    }
                                  },
                                  arguments: [],
                                  start: 133,
                                  end: 216,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 8
                                    },
                                    end: {
                                      line: 13,
                                      column: 12
                                    }
                                  }
                                },
                                start: 133,
                                end: 217,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 8
                                  },
                                  end: {
                                    line: 13,
                                    column: 13
                                  }
                                }
                              }
                            ],
                            start: 104,
                            end: 225,
                            loc: {
                              start: {
                                line: 6,
                                column: 18
                              },
                              end: {
                                line: 14,
                                column: 7
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: null,
                          start: 93,
                          end: 225,
                          loc: {
                            start: {
                              line: 6,
                              column: 7
                            },
                            end: {
                              line: 14,
                              column: 7
                            }
                          }
                        },
                        arguments: [],
                        start: 92,
                        end: 228,
                        loc: {
                          start: {
                            line: 6,
                            column: 6
                          },
                          end: {
                            line: 14,
                            column: 10
                          }
                        }
                      },
                      start: 92,
                      end: 229,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 14,
                          column: 11
                        }
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'Identifier',
                        name: 'y',
                        start: 243,
                        end: 244,
                        loc: {
                          start: {
                            line: 15,
                            column: 13
                          },
                          end: {
                            line: 15,
                            column: 14
                          }
                        }
                      },
                      start: 236,
                      end: 245,
                      loc: {
                        start: {
                          line: 15,
                          column: 6
                        },
                        end: {
                          line: 15,
                          column: 15
                        }
                      }
                    }
                  ],
                  start: 12,
                  end: 251,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 16,
                      column: 5
                    }
                  }
                },
                async: false,
                generator: false,
                id: null,
                start: 1,
                end: 251,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 16,
                    column: 5
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 254,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 16,
                  column: 8
                }
              }
            },
            start: 0,
            end: 255,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 16,
                column: 9
              }
            }
          }
        ],
        start: 0,
        end: 255,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 16,
            column: 9
          }
        }
      }
    ],
    [
      `function f(one) { class x { } { class x { } function g() { one; x; } g() } } f()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'Identifier',
                name: 'one',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ClassDeclaration',
                  id: {
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
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    body: [],
                    start: 26,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 26
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  start: 18,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ClassDeclaration',
                      id: {
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
                      superClass: null,
                      body: {
                        type: 'ClassBody',
                        body: [],
                        start: 40,
                        end: 43,
                        loc: {
                          start: {
                            line: 1,
                            column: 40
                          },
                          end: {
                            line: 1,
                            column: 43
                          }
                        }
                      },
                      start: 32,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    {
                      type: 'FunctionDeclaration',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Identifier',
                              name: 'one',
                              start: 59,
                              end: 62,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 59
                                },
                                end: {
                                  line: 1,
                                  column: 62
                                }
                              }
                            },
                            start: 59,
                            end: 63,
                            loc: {
                              start: {
                                line: 1,
                                column: 59
                              },
                              end: {
                                line: 1,
                                column: 63
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'Identifier',
                              name: 'x',
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
                            start: 64,
                            end: 66,
                            loc: {
                              start: {
                                line: 1,
                                column: 64
                              },
                              end: {
                                line: 1,
                                column: 66
                              }
                            }
                          }
                        ],
                        start: 57,
                        end: 68,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 68
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'g',
                        start: 53,
                        end: 54,
                        loc: {
                          start: {
                            line: 1,
                            column: 53
                          },
                          end: {
                            line: 1,
                            column: 54
                          }
                        }
                      },
                      start: 44,
                      end: 68,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 68
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'CallExpression',
                        optional: false,
                        shortCircuited: false,
                        callee: {
                          type: 'Identifier',
                          name: 'g',
                          start: 69,
                          end: 70,
                          loc: {
                            start: {
                              line: 1,
                              column: 69
                            },
                            end: {
                              line: 1,
                              column: 70
                            }
                          }
                        },
                        arguments: [],
                        start: 69,
                        end: 72,
                        loc: {
                          start: {
                            line: 1,
                            column: 69
                          },
                          end: {
                            line: 1,
                            column: 72
                          }
                        }
                      },
                      start: 69,
                      end: 72,
                      loc: {
                        start: {
                          line: 1,
                          column: 69
                        },
                        end: {
                          line: 1,
                          column: 72
                        }
                      }
                    }
                  ],
                  start: 30,
                  end: 74,
                  loc: {
                    start: {
                      line: 1,
                      column: 30
                    },
                    end: {
                      line: 1,
                      column: 74
                    }
                  }
                }
              ],
              start: 16,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 76
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
            end: 76,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 76
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              optional: false,
              shortCircuited: false,
              callee: {
                type: 'Identifier',
                name: 'f',
                start: 77,
                end: 78,
                loc: {
                  start: {
                    line: 1,
                    column: 77
                  },
                  end: {
                    line: 1,
                    column: 78
                  }
                }
              },
              arguments: [],
              start: 77,
              end: 80,
              loc: {
                start: {
                  line: 1,
                  column: 77
                },
                end: {
                  line: 1,
                  column: 80
                }
              }
            },
            start: 77,
            end: 80,
            loc: {
              start: {
                line: 1,
                column: 77
              },
              end: {
                line: 1,
                column: 80
              }
            }
          }
        ],
        start: 0,
        end: 80,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 80
          }
        }
      }
    ],
    [
      `function x() {} function x() {}`,
      Context.OptionsLoc,
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
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'x',
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
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [],
              start: 29,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 29
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            async: false,
            generator: false,
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
            start: 16,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 16
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
      `function *f(){} { function *f(){} function *f(){} }`,
      Context.OptionsLoc,
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
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            async: false,
            generator: true,
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
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
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
                async: false,
                generator: true,
                id: {
                  type: 'Identifier',
                  name: 'f',
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
                start: 18,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              {
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 47,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 47
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                },
                async: false,
                generator: true,
                id: {
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
                start: 34,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 34
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              }
            ],
            start: 16,
            end: 51,
            loc: {
              start: {
                line: 1,
                column: 16
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
    // [`function x() {}`, Context.OptionsLoc, {}],
    // [`function x() {}`, Context.OptionsLoc, {}],
    // [`function x() {}`, Context.OptionsLoc, {}],
    // [`function x() {}`, Context.OptionsLoc, {}],
    // [`function x() {}`, Context.OptionsLoc, {}],
    [
      `function x() {}`,
      Context.OptionsLoc,
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
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'x',
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
