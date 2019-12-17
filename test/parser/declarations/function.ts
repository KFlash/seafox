import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Declarations - Function', () => {
  for (const [source, ctx] of [
    [`function f({...{a: b}}){}`, Context.Empty],
    [`function f([...[a, b]]){}`, Context.Empty],
    [`function f({...a.b}){}`, Context.Empty],
    [`function f({...[a, b]}){}`, Context.Empty],
    ['function f(x) { const x = y }', Context.Empty],
    ['function f([x=x()=x]){},({x:{1:y()=x},x:{7:3}})>x', Context.Empty],
    ['function f([x=x()=x]){}', Context.Empty],
    ['({x:{1:y()=x},x:{7:3}})>x', Context.Empty],
    ['function f(a, a) {}', Context.Strict],
    ['function f(a, b, a) {}', Context.Strict],
    ['function f(b, a, a) {}', Context.Strict],
    ['function f(a, a, b) {}', Context.Strict],
    ['function f(b, a, b, a) {}', Context.Strict],
    ['function f(b, a, b, a, [fine]) {}', Context.Strict],
    ['function f(b, a, b, a = x) {}', Context.Strict],
    ['function f(b, a, b, ...a) {}', Context.Strict],
    ['function f(a, a) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(a, b, a) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(b, a, a) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(b, a, b, a) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(b, a, b, a, [fine]) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(b, a, b, a = x) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function f(b, a, b, ...a) {"use strict"}', Context.OptionsDisableWebCompat],
    ['function x(foo) { let foo = 1; }', Context.OptionsDisableWebCompat],
    ['function x(foo) { let foo = 1; }', Context.Empty],
    ['function foo() {} let foo = 1;', Context.Empty],
    ['function x([public], public){}', Context.OptionsDisableWebCompat],
    ['function f([a, a]) {}', Context.OptionsDisableWebCompat],
    ['function f([a, b, a]) {}', Context.OptionsDisableWebCompat],
    ['function f([b, a, a]) {}', Context.OptionsDisableWebCompat],
    ['function f([a, a, b]) {}', Context.OptionsDisableWebCompat],
    ['function f(){ const x = y; var x; }', Context.OptionsDisableWebCompat],
    ['function f(){ var x; const x = y; }', Context.OptionsDisableWebCompat],
    ['function f(){ let x; function x(){} }', Context.OptionsDisableWebCompat],
    ['function f(){ function x(){} let x; }', Context.OptionsDisableWebCompat],
    ['function f(){ const x = y; function x(){} }', Context.OptionsDisableWebCompat],
    ['function f(){ function x(){} const x = y; }', Context.OptionsDisableWebCompat],
    ['function f(){} function f(){}', Context.Module | Context.OptionsDisableWebCompat],
    ['function a() { const x = 1; var x = 2; }', Context.OptionsDisableWebCompat],
    ['function* f(a) { let a; }', Context.OptionsDisableWebCompat],
    ['function* f([a]){ let a; }', Context.OptionsDisableWebCompat],
    ['function* f({a}){ let a; }', Context.OptionsDisableWebCompat],
    ['function a() { const x = 1; var x = 2; }', Context.OptionsDisableWebCompat],
    ['function a() { const x = 1; var x = 2; }', Context.OptionsDisableWebCompat],
    ['function a() { const x = 1; var x = 2; }', Context.OptionsDisableWebCompat],
    ['{ function f(){} function f(){} }', Context.OptionsDisableWebCompat],
    ['function f(){  for (var x;;); const x = 1  }', Context.OptionsDisableWebCompat],
    ['function foo({x:x, x:x}) {}', Context.OptionsDisableWebCompat],
    ['function foo({x:x}, {x:x}) {}', Context.OptionsDisableWebCompat],
    ['function foo() { return {}; }; let {x:foo()} = {};', Context.OptionsDisableWebCompat],
    ['function foo([x, x]) {}', Context.OptionsDisableWebCompat],
    ['function foo([x], [x]) {}', Context.OptionsDisableWebCompat],
    ['function foo([x], {x:x}) {}', Context.OptionsDisableWebCompat],
    ['function foo([x, x]) {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function foo([x], [x]) {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function foo([x], {x:x}) {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function foo([x], x) {}', Context.OptionsDisableWebCompat],
    ['function foo(x, [x]) {}', Context.OptionsDisableWebCompat],
    ['function g() { { var x; let x; } }', Context.OptionsDisableWebCompat],
    ['function f() { { { var x; } let x; } }', Context.OptionsDisableWebCompat],
    ['function f() { { { var x; } let x; } }', Context.Empty],
    ['function f() { { var x; let x; } }', Context.Empty],
    ['function f() { { var x; let x; } }', Context.OptionsDisableWebCompat],
    ['(function (e) { var e; const e = undefined; });', Context.OptionsDisableWebCompat],
    ['function x() {}const y = 4, x = 5;', Context.OptionsDisableWebCompat],
    ['function x() {}const y = 4, x = 5;', Context.OptionsDisableWebCompat],
    ['function x() {}const x = function() {};', Context.OptionsDisableWebCompat],
    ['function foo({x:{z:[z1]}}, z1) {}', Context.OptionsDisableWebCompat],
    ['function foo([x]) { let x = 10;}', Context.OptionsDisableWebCompat],
    ['(function() { "use strict"; { const f = 1; var f; } })', Context.OptionsDisableWebCompat],
    ['function foo([x, x]) {}', Context.OptionsDisableWebCompat],
    ['function x(x = class x {}) { const x = y; }', Context.OptionsDisableWebCompat],
    ['async function af(x) { let x; }', Context.OptionsDisableWebCompat],
    ['async function af(x) { const x = 1; }', Context.OptionsDisableWebCompat],
    ['async function af(x) { class x { } }', Context.OptionsDisableWebCompat],
    ['function fooa(a = b, a) {}', Context.OptionsDisableWebCompat],
    ['function f(x = 0, x) {}', Context.OptionsDisableWebCompat],
    ['0, function(x = 0, x) {};', Context.OptionsDisableWebCompat],
    ['function foo(a, a = b) {}', Context.OptionsDisableWebCompat],
    ['function f(x = 0, x) {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['0, function(x = 0, x) {};', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function foo(a, a = b) {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function f([foo], [foo]){}', Context.OptionsDisableWebCompat],
    [`const x = a; function x(){};`, Context.OptionsDisableWebCompat],
    [`const x; { let x; var y; }`, Context.Empty],
    [`const a = b; let a = c`, Context.Empty],
    [`const {x:x, x:x} = c`, Context.Empty],
    [`const [x, {x}] = y`, Context.Empty],
    [`const [x, x] = c`, Context.Empty],
    [`const x = x, x = y;`, Context.Empty],
    [`const a = b, a = c`, Context.Empty],
    [`const {x:c, y:c} = {};`, Context.Empty],
    [`const a = 0, a = 1;`, Context.Empty],
    [`const {a:a, a:a} = {};`, Context.Empty],
    [`const a = 1; const a = 2`, Context.Empty],
    [`const x = x, x = y;`, Context.OptionsDisableWebCompat],
    [`const a = b, a = c`, Context.OptionsDisableWebCompat],
    [`const {x:c, y:c} = {};`, Context.OptionsDisableWebCompat],
    [`const a = 0, a = 1;`, Context.OptionsDisableWebCompat],
    [`const {a:a, a:a} = {};`, Context.OptionsDisableWebCompat],
    [`const a = 1; const a = 2`, Context.OptionsDisableWebCompat],
    ['function f([foo] = x, [foo] = y){}', Context.OptionsDisableWebCompat],
    ['function f({foo} = x, {foo}){}', Context.OptionsDisableWebCompat],
    ['function f([{foo}] = x, {foo}){}', Context.OptionsDisableWebCompat],
    ['function f([{foo}] = x, [{foo}]){}', Context.OptionsDisableWebCompat],
    ['function f([{foo}] = x, [{foo}]){}', Context.Empty],
    ['function f(b, a, b, a = x) {}', Context.OptionsDisableWebCompat],
    ['let x = a; function x(){};', Context.OptionsDisableWebCompat],
    ['const x = a; function x(){};', Context.OptionsDisableWebCompat],
    ['function f([b, a], b) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f([b, a], {b}) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f([b, a], b=x) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f([b, a, b, a]) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f([a, a, b]) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f([b, a], ...b) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['(function() { { function* foo() {} function* foo() {} } })()', Context.OptionsDisableWebCompat],
    ['(function() { { function* foo() {} function foo() {} } })()', Context.OptionsDisableWebCompat],
    ['(function() { { function foo() {} function* foo() {} } })()', Context.OptionsDisableWebCompat],
    ['(function() { { async function foo() {} async function foo() {} } })()', Context.OptionsDisableWebCompat],
    ['function f(...rest, b){}', Context.OptionsDisableWebCompat],
    ['let x; { var x; }', Context.OptionsDisableWebCompat],
    ['{ var x; } let x;', Context.OptionsDisableWebCompat],
    ['function f(...a,){}', Context.OptionsDisableWebCompat],
    ['function f(...a = x,){}', Context.OptionsDisableWebCompat],
    ['function f(...a,){}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function f(...a = x,){}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['function f(...a = x,){}', Context.OptionsDisableWebCompat],
    ['function f({a: x, b: x}) {}', Context.OptionsDisableWebCompat],
    ['function f({x, x}) {}', Context.OptionsDisableWebCompat],
    ['function f(x, {a: {b: x}}) {}', Context.OptionsDisableWebCompat],
    ['function f(x, {a: {x}}) {}', Context.OptionsDisableWebCompat],
    ['function f(x, {15: x}) {}', Context.OptionsDisableWebCompat],
    ['function f({a: x, ...{x}}) {}', Context.OptionsDisableWebCompat],
    ['function f({a: x, ...x}) {}', Context.OptionsDisableWebCompat],
    ['function f(x, {a: x}) {}', Context.OptionsDisableWebCompat],
    ['function f(x, {"foo": x}) {}', Context.OptionsDisableWebCompat],
    ['"use strict"; function foo(bar, bar){}', Context.OptionsDisableWebCompat],
    ['function foo(bar, bar){}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['function f(x) { let x }', Context.OptionsDisableWebCompat],
    ['function f(x) { let x }', Context.Empty],
    ['function f(a, b, a, c = 10) { }', Context.OptionsDisableWebCompat],
    ['function f(a, b = 10, a) { }', Context.OptionsDisableWebCompat],
    ['function foo(a) { let a; }', Context.OptionsDisableWebCompat],
    ['function foo(a, b = () => a) { const b = 1; };', Context.OptionsDisableWebCompat],
    ['function foo(a, b = () => a) { let b; };', Context.OptionsDisableWebCompat],
    ['function foo(arguments, b = () => arguments) { let arguments; };', Context.OptionsDisableWebCompat],
    ['function foo(arguments, b = () => arguments) { const arguments = 1; };', Context.OptionsDisableWebCompat],
    ['(a, b = () => a) => { let b; };', Context.OptionsDisableWebCompat],
    ['(a, b = () => a) => { const b = 1; };', Context.OptionsDisableWebCompat],
    //['(arguments, b = () => arguments) => { let arguments; };', Context.OptionsDisableWebCompat],
    ['function foo({a, b = () => a}) { let b; };', Context.OptionsDisableWebCompat],
    ['function foo([a], b = () => a) { const b = 1; };', Context.OptionsDisableWebCompat],
    ['function foo([arguments, b = () => arguments]) { let arguments; };', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch({x:x, x:x}) {} }', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch([x, x]) {} }', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch({z1, x:{z:[z1]}}) {} }', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch([x]) { let x = 10;} }', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch([x]) { function x() {} } }', Context.OptionsDisableWebCompat],
    ['function foo() {try {} catch([x]) { var x = 10;} }', Context.OptionsDisableWebCompat]
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

  for (const [source, ctx, expected] of [
    [
      `function f([a = b = c] = arr){}`,
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'b',
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
                        operator: '=',
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
                      start: 12,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      }
                    }
                  ],
                  start: 11,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                },
                right: {
                  type: 'Identifier',
                  name: 'arr',
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
                start: 11,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 11
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
      `function f(x, [foo] = y){}`,
      Context.OptionsNext | Context.OptionsLoc,
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
              },
              {
                type: 'AssignmentPattern',
                left: {
                  type: 'ArrayPattern',
                  elements: [
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
                },
                right: {
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
      `function f([foo]){}`,
      Context.OptionsNext | Context.OptionsLoc,
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
              }
            ],
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
      `function f([foo,] = x){}`,
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
      `function f([{b}]) {}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b',
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
                        value: {
                          type: 'Identifier',
                          name: 'b',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                      }
                    ],
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
      `function f([a, {b: []}]) {}`,
      Context.OptionsNext | Context.OptionsLoc,
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
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b',
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
                          type: 'ArrayPattern',
                          elements: [],
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
                  }
                ],
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
      `function foo() { let foo = 1; }`,
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
                        type: 'Literal',
                        value: 1,
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
                      id: {
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
                      },
                      start: 21,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    }
                  ],
                  start: 17,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
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
      `{ function* foo() {}; }; let foo;`,
      Context.OptionsNext | Context.OptionsLoc,
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
      `function f(...rest){}`,
      Context.OptionsNext | Context.OptionsLoc,
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
      `function f(a, b, ...rest){}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              {
                type: 'Identifier',
                name: 'b',
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
                type: 'RestElement',
                argument: {
                  type: 'Identifier',
                  name: 'rest',
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
                start: 17,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 17
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
      `function f(x) { { let x } }`,
      Context.OptionsNext | Context.OptionsLoc,
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
      `function f(f) { }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [],
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
      `function f(x) { function x() {} }`,
      Context.OptionsNext | Context.OptionsLoc,
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
      `x=function f(){ var f }`,
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
      `async function f(){ var f }`,
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
                  kind: 'var',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: null,
                      id: {
                        type: 'Identifier',
                        name: 'f',
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
                }
              ],
              start: 18,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 18
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
      `x={*f(){ var f }}`,
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
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                                init: null,
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
                              }
                            ],
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
                          }
                        ],
                        start: 7,
                        end: 16,
                        loc: {
                          start: {
                            line: 1,
                            column: 7
                          },
                          end: {
                            line: 1,
                            column: 16
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: null,
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
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false,
                    start: 3,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  }
                ],
                start: 2,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 2
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
      `function foo({x:x}, {y:y}, {z:z}) {}`,
      Context.OptionsNext | Context.OptionsLoc,
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
      `async function f(){} { async function f(){} }`,
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
            type: 'BlockStatement',
            body: [
              {
                type: 'FunctionDeclaration',
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
                  name: 'f',
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
      `(function foo(x = 0) { var x; { function x() {} } })(1);`,
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
                type: 'FunctionExpression',
                params: [
                  {
                    type: 'AssignmentPattern',
                    left: {
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
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'x',
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
                        }
                      ],
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
                      start: 30,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
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
                end: 51,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 51
                  }
                }
              },
              arguments: [
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
              start: 0,
              end: 55,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 55
                }
              }
            },
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
      }
    ],
    [
      `(function foo(...x) { var x; {  function x() {}  } })(1);`,
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
