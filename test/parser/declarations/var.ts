import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Declarations - Var (fail)', [
  [`var {};`, Context.Empty],
  [`var [ foo()[x] ]`, Context.Empty],
  [`var { x };`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var foo = 1; let foo = 1;`, Context.Empty],
  [`var foo = 1; const foo = 1;`, Context.Empty],
  [`var [foo] = [1]; let foo = 1;`, Context.Empty],
  [`var [{ bar: [foo] }] = x; let {foo} = 1;`, Context.Empty],
  [`{ var foo = 1; } let foo = 1;`, Context.Empty],
  [`var foo = 1; function x() {} let foo = 1;`, Context.Empty],
  [`var [...foo] = x; let foo = 1;`, Context.Empty],
  [`var foo = 1; let foo = 1;`, Context.OptionsDisableWebCompat],
  [`var x = a; const x = b;`, Context.Empty],
  [`var ,a;`, Context.Empty],
  [`var a,;`, Context.Empty],
  [`var a =,;`, Context.Empty],
  [`function var() { }`, Context.Empty],
  [`function a({var}) { }`, Context.Empty],
  [`(function a([{var}]) { })`, Context.Empty],
  [`(function a({ hello: {var}}) { })`, Context.Empty],
  [`(function a({ 0: [var]}) { })`, Context.Empty],
  [`class var { }`, Context.Empty],
  [`var [...[ x ] = []] = [];`, Context.Empty],
  [`var [...{ x } = []] = [];`, Context.Empty],
  [`var [...x, y] = [1, 2, 3];`, Context.Empty],
  [`var [...{ x }, y] = [1, 2, 3];`, Context.Empty],
  ['var a.b;', Context.Empty],
  ['var [];', Context.Empty],
  ['var [a];', Context.Empty],
  ['var { key: bar/x } = {}', Context.Empty],
  ['var { key: await /foo/g } = {}', Context.Empty],
  ['var { key: bar + x } = {}', Context.Empty],
  ['var { "foo": 123 } = {}', Context.Empty],
  ['var a = new ;', Context.Empty],
  ['var t4 = ++await 1;', Context.Empty],
  ['var t5 = --await 1;', Context.Empty],
  ['var {  ...y, ...y } = {}', Context.Empty],
  ['var {a a, b} = c;', Context.Empty],
  ['var {a, b', Context.Empty],
  ['var {{a}} = b;', Context.Empty],
  ['var a; function a() {} let a;', Context.Empty],
  ['let a; function a() {} var a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['{var a; function x() {} let a; }', Context.Empty],
  ['{ function x() { var a, a; let a; } let a; }', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var [[(a)], ((((((([b])))))))] = [[],[]];', Context.Empty],
  ['var [((((a)))), b] = [];', Context.Empty],
  ['var [a)] = [];', Context.Empty],
  ['var a; [((a)] = [];', Context.Empty],
  ['var [((a)] = [];', Context.Empty],
  ['var a; var a,[a],{a}; let a;', Context.Empty],
  [`function foo() { return {}; }; var {x:foo().x} = {};`, Context.Empty],
  [`for (var [x] = [] of []) {}`, Context.Empty],
  [`var { get foo() { } } = { get: 1 };`, Context.Empty],
  [`var { set bar(x) { } } = { set: 2 };`, Context.Empty],
  [`var a = 1; ({x, y = 1, z = 2} = {a = 2});`, Context.Empty],
  [`var a = 1; ({x, y = {a = 1}} = {});`, Context.Empty],
  [`var {x};`, Context.Empty],
  [`var {x:y};`, Context.Empty],
  [`var {,,x} = obj;`, Context.Empty],
  ['var {a,,b}=c;', Context.Empty],
  ['var {a}', Context.Empty],
  ['var {a:}=b', Context.Empty],
  ['var {,}=b', Context.Empty],
  ['var obj={a:}', Context.Empty],
  ['var obj = {,}', Context.Empty],
  ['var obj = {a', Context.Empty],
  ['var { foo: true / false } = {}', Context.Empty],
  ['var { *static() {} } = {}', Context.Empty],
  ['var { static(){} } = {}', Context.Empty],
  ['var { foo: 1, set bar(v) {} } = {}', Context.Empty],
  ['var {  get yield() { }  } = {}', Context.Empty],
  ['var { set foo(_) {}, set foo(v) {} } = {}', Context.Empty],
  ['var { foo: 1, get "foo"() {} } = {}', Context.Empty],
  ['var { async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {} } = {}', Context.Empty],
  ['var { async *method([[,] = g()]) {} } = {}', Context.Empty],
  ['var { true : 1 } = {}', Context.Empty],
  ['var { set: 1, set: 2 } = {}', Context.Empty],
  ['var { foo: 1, "foo": 2 } = {}', Context.Empty],
  ['var [a--] = [];', Context.Empty],
  ['var [a + 1] = [];', Context.Empty],
  ['var [++a] = [];', Context.Empty],
  ['var {...x = 1} = {}', Context.Empty],
  ['var [a a, b] = c;', Context.Empty],
  ['var [a, b', Context.Empty],
  ['var [a, ...rest, b] = c;', Context.Empty],
  ['var a; [a--] = [];', Context.Empty],
  ['var a; [++a] = [];', Context.Empty],
  ['var [1] = [];', Context.Empty],
  ['var [1, a] = [];', Context.Empty],
  ['var a; [1, a] = [];', Context.Empty],
  ['var [...a, ...b] = [];', Context.Empty],
  ['var a, b; [...a, ...b] = [];', Context.Empty],
  ['var a, b; [...a, b] = [];', Context.Empty],
  ['var a; [...a = 1] = [];', Context.Empty],
  ['var [...a = 1] = [];', Context.Empty],
  ['var [((a)] = [];', Context.Empty],
  ['var a; [((a)] = []', Context.Empty],
  ['var {...a.b} = 0', Context.Empty],
  ['var [a)] = [];', Context.Empty],
  ['var a; [a)] = [];', Context.Empty],
  ['var {...[]} = {}', Context.Empty],
  ['var {...{z}} = { z: 1};', Context.Empty],
  ['var { ...{ x = 5 } } = {x : 1};', Context.Empty],
  ['var { ...{x =5 } } = {x : 1}; console.log(x);', Context.Empty],
  ['var 𫠞_ = 12;}', Context.Empty],
  ['var _𖫵 = 11;', Context.Empty],
  ['var a, b; [([a]), (((([b]))))] = [[], []];', Context.Empty],
  ['var a, b; [({a}), (((({b}))))] = [{}, {}];', Context.Empty],
  ['var a, b; ({a:({a}), b:((({b})))} = {a:{}, b:{}} );', Context.Empty],
  ['function foo() { return {}; }; var [foo()] = [];', Context.Empty],
  ['function foo() { return {}; }; var [foo().x] = [];', Context.Empty],
  ['class foo { method() { var [super()] = []; } }', Context.Empty],
  ['var {foo}', Context.Empty],
  ['var {foo=a}', Context.Empty],
  ['var {foo:a}', Context.Empty],
  ['var {foo:a=b}', Context.Empty],
  ['var {foo}, bar', Context.Empty],
  ['var foo, {bar}', Context.Empty],
  ['var\nfoo()', Context.Empty],
  ['var [foo];', Context.Empty],
  ['var [foo = x];', Context.Empty],
  ['var [foo], bar;', Context.Empty],
  ['var foo, [bar];', Context.Empty],
  ['var arr = [a', Context.Empty],
  ['var a=[b=]', Context.Empty],
  ['var a=[...]', Context.Empty],
  ['var arr = [a b', Context.Empty],
  ['var [foo:bar] = obj;', Context.Empty],
  ['var [...foo, bar] = obj;', Context.Empty],
  ['var [...foo,] = obj;', Context.Empty],
  ['var [...foo,,] = obj;', Context.Empty],
  ['const var = 1;', Context.Empty],
  ['var [...[foo, bar],,] = obj;', Context.Empty],
  ['var [..x] = obj;', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var {foo};', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var {,} = x;', Context.Empty],
  ['var {foo,,} = x;', Context.Empty],
  [' var {,foo} = x; ', Context.Empty],
  ['var {,,foo} = x;', Context.Empty],
  ['var {foo,,bar} = x;', Context.Empty],
  ['var\nfoo()', Context.Empty],
  ['var [foo = x];', Context.Empty],
  ['var [foo], bar;', Context.Empty],
  ['var foo, [bar];', Context.Empty],
  ['x = { (a) { var a;  } }', Context.Empty],
  ['x = { a: (a) } var a;', Context.Empty],
  ['var [foo:bar] = obj;', Context.Empty],
  ['var [...foo, bar] = obj;', Context.Empty],
  ['var [...foo,] = obj;', Context.Empty],
  ['var [...foo,,] = obj;', Context.Empty],
  ['var [...[foo, bar],] = obj;', Context.Empty],
  ['var [...[foo, bar],,] = obj;', Context.Empty],
  ['var [... ...foo] = obj;', Context.Empty],
  ['var [...bar = foo] = obj;', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var [..x] = obj;', Context.Empty],
  ['var {x:y=z}, {a:b=c} = obj;', Context.Empty],
  ['var {,} = obj;', Context.Empty],
  ['var {,,} = obj;', Context.Empty],
  ['var {,x} = obj;', Context.Empty],
  ['var {,,x} = obj;', Context.Empty],
  ['var {x,, y} = obj;', Context.Empty],
  ['var {x,, y} = obj;', Context.Empty],
  ['var {x};', Context.Empty],
  ['var {x}, {y} = z;', Context.Empty],
  [`var [foo];`, Context.Empty],
  ['"use strict"; let {x: xx,  foo: {y: xx}} = {foo:[12]};', Context.Empty],
  ['var arr = []; for (var    of arr) {}', Context.Empty],
  [`var [foo], bar;`, Context.Empty],
  [`var {x:y=z} = obj, {a:b=c};`, Context.Empty],
  [`var {x};`, Context.Empty],
  [`var {x:y};`, Context.Empty],
  [`var {,,x} = obj;`, Context.Empty],
  [
    `var
    foo()`,
    Context.Empty
  ],
  [`{ var a; let a; } `, Context.Empty],
  [`let a; { var a; } `, Context.Empty],
  [`var a; { function a() {} var a; } `, Context.Empty],
  [`var x = a; const x = b;`, Context.Empty],
  [`var x = a; let x = b;`, Context.Empty],
  [`var x; let x;`, Context.OptionsDisableWebCompat]
]);

pass('Declarations - Var (pass)', [
  [
    `var obj = { method(a, b, c, ...[d]) { return [a, b, c, d]; } };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'method',
                      start: 12,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    value: {
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
                        },
                        {
                          type: 'Identifier',
                          name: 'c',
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
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'ArrayPattern',
                            elements: [
                              {
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
                              }
                            ],
                            start: 31,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 31
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            }
                          },
                          start: 28,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrayExpression',
                              elements: [
                                {
                                  type: 'Identifier',
                                  name: 'a',
                                  start: 46,
                                  end: 47,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 46
                                    },
                                    end: {
                                      line: 1,
                                      column: 47
                                    }
                                  }
                                },
                                {
                                  type: 'Identifier',
                                  name: 'b',
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
                                {
                                  type: 'Identifier',
                                  name: 'c',
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
                                {
                                  type: 'Identifier',
                                  name: 'd',
                                  start: 55,
                                  end: 56,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 55
                                    },
                                    end: {
                                      line: 1,
                                      column: 56
                                    }
                                  }
                                }
                              ],
                              start: 45,
                              end: 57,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 57
                                }
                              }
                            },
                            start: 38,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 38
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            }
                          }
                        ],
                        start: 36,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 36
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: null,
                      start: 18,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false,
                    start: 12,
                    end: 60,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 60
                      }
                    }
                  }
                ],
                start: 10,
                end: 62,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 62
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'obj',
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
              end: 62,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 62
                }
              }
            }
          ],
          start: 0,
          end: 63,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 63
            }
          }
        }
      ],
      start: 0,
      end: 63,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 63
        }
      }
    }
  ],
  [
    'var {  a, "b": b1, [`c`]: c1, [d + "e"]: d1, [`${d}e`]: d2, ...e1 } = e;',
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'e',
                start: 70,
                end: 71,
                loc: {
                  start: {
                    line: 1,
                    column: 70
                  },
                  end: {
                    line: 1,
                    column: 71
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Literal',
                      value: 'b',
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
                    value: {
                      type: 'Identifier',
                      name: 'b1',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'TemplateLiteral',
                      expressions: [],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: 'c',
                            raw: 'c'
                          },
                          tail: true,
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
                        }
                      ],
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
                    value: {
                      type: 'Identifier',
                      name: 'c1',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 19,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'd',
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
                      right: {
                        type: 'Literal',
                        value: 'e',
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
                      operator: '+',
                      start: 31,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'd1',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                    type: 'Property',
                    key: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'Identifier',
                          name: 'd',
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
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: ''
                          },
                          tail: false,
                          start: 46,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 46
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: 'e',
                            raw: 'e'
                          },
                          tail: true,
                          start: 50,
                          end: 50,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 50
                            }
                          }
                        }
                      ],
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
                    value: {
                      type: 'Identifier',
                      name: 'd2',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 45,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'e1',
                      start: 63,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 63
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    },
                    start: 60,
                    end: 65,
                    loc: {
                      start: {
                        line: 1,
                        column: 60
                      },
                      end: {
                        line: 1,
                        column: 65
                      }
                    }
                  }
                ],
                start: 4,
                end: 67,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 67
                  }
                }
              },
              start: 4,
              end: 71,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 71
                }
              }
            }
          ],
          start: 0,
          end: 72,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 72
            }
          }
        }
      ],
      start: 0,
      end: 72,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 72
        }
      }
    }
  ],
  [
    `var z = {};
    var { ...x } = z;
    var { ...a } = { a: 1 };
    var { ...x } = a.b;
    var { ...x } = a();
    var {x1, ...y1} = z;
    x1++;
    var { [a]: b, ...c } = z;
    var {x1, ...y1} = z;
    let {x2, y2, ...z2} = z;
    const {w3, x3, y3, ...z4} = z;

    let {
      x: { a: xa, [d]: f, ...asdf },
      y: { ...d },
      ...g
    } = complex;

    let { x4: { ...y4 } } = z;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
                start: 8,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'z',
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 31,
                end: 32,
                loc: {
                  start: {
                    line: 2,
                    column: 19
                  },
                  end: {
                    line: 2,
                    column: 20
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 25,
                      end: 26,
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
                    start: 22,
                    end: 26,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 2,
                        column: 14
                      }
                    }
                  }
                ],
                start: 20,
                end: 28,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 2,
                    column: 16
                  }
                }
              },
              start: 20,
              end: 32,
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
            }
          ],
          start: 16,
          end: 33,
          loc: {
            start: {
              line: 2,
              column: 4
            },
            end: {
              line: 2,
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
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 55,
                      end: 56,
                      loc: {
                        start: {
                          line: 3,
                          column: 21
                        },
                        end: {
                          line: 3,
                          column: 22
                        }
                      }
                    },
                    value: {
                      type: 'Literal',
                      value: 1,
                      start: 58,
                      end: 59,
                      loc: {
                        start: {
                          line: 3,
                          column: 24
                        },
                        end: {
                          line: 3,
                          column: 25
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 55,
                    end: 59,
                    loc: {
                      start: {
                        line: 3,
                        column: 21
                      },
                      end: {
                        line: 3,
                        column: 25
                      }
                    }
                  }
                ],
                start: 53,
                end: 61,
                loc: {
                  start: {
                    line: 3,
                    column: 19
                  },
                  end: {
                    line: 3,
                    column: 27
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'a',
                      start: 47,
                      end: 48,
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
                    start: 44,
                    end: 48,
                    loc: {
                      start: {
                        line: 3,
                        column: 10
                      },
                      end: {
                        line: 3,
                        column: 14
                      }
                    }
                  }
                ],
                start: 42,
                end: 50,
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
              start: 42,
              end: 61,
              loc: {
                start: {
                  line: 3,
                  column: 8
                },
                end: {
                  line: 3,
                  column: 27
                }
              }
            }
          ],
          start: 38,
          end: 62,
          loc: {
            start: {
              line: 3,
              column: 4
            },
            end: {
              line: 3,
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'a',
                  start: 82,
                  end: 83,
                  loc: {
                    start: {
                      line: 4,
                      column: 19
                    },
                    end: {
                      line: 4,
                      column: 20
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'b',
                  start: 84,
                  end: 85,
                  loc: {
                    start: {
                      line: 4,
                      column: 21
                    },
                    end: {
                      line: 4,
                      column: 22
                    }
                  }
                },
                start: 82,
                end: 85,
                loc: {
                  start: {
                    line: 4,
                    column: 19
                  },
                  end: {
                    line: 4,
                    column: 22
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 76,
                      end: 77,
                      loc: {
                        start: {
                          line: 4,
                          column: 13
                        },
                        end: {
                          line: 4,
                          column: 14
                        }
                      }
                    },
                    start: 73,
                    end: 77,
                    loc: {
                      start: {
                        line: 4,
                        column: 10
                      },
                      end: {
                        line: 4,
                        column: 14
                      }
                    }
                  }
                ],
                start: 71,
                end: 79,
                loc: {
                  start: {
                    line: 4,
                    column: 8
                  },
                  end: {
                    line: 4,
                    column: 16
                  }
                }
              },
              start: 71,
              end: 85,
              loc: {
                start: {
                  line: 4,
                  column: 8
                },
                end: {
                  line: 4,
                  column: 22
                }
              }
            }
          ],
          start: 67,
          end: 86,
          loc: {
            start: {
              line: 4,
              column: 4
            },
            end: {
              line: 4,
              column: 23
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
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'a',
                  start: 106,
                  end: 107,
                  loc: {
                    start: {
                      line: 5,
                      column: 19
                    },
                    end: {
                      line: 5,
                      column: 20
                    }
                  }
                },
                arguments: [],
                start: 106,
                end: 109,
                loc: {
                  start: {
                    line: 5,
                    column: 19
                  },
                  end: {
                    line: 5,
                    column: 22
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 100,
                      end: 101,
                      loc: {
                        start: {
                          line: 5,
                          column: 13
                        },
                        end: {
                          line: 5,
                          column: 14
                        }
                      }
                    },
                    start: 97,
                    end: 101,
                    loc: {
                      start: {
                        line: 5,
                        column: 10
                      },
                      end: {
                        line: 5,
                        column: 14
                      }
                    }
                  }
                ],
                start: 95,
                end: 103,
                loc: {
                  start: {
                    line: 5,
                    column: 8
                  },
                  end: {
                    line: 5,
                    column: 16
                  }
                }
              },
              start: 95,
              end: 109,
              loc: {
                start: {
                  line: 5,
                  column: 8
                },
                end: {
                  line: 5,
                  column: 22
                }
              }
            }
          ],
          start: 91,
          end: 110,
          loc: {
            start: {
              line: 5,
              column: 4
            },
            end: {
              line: 5,
              column: 23
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
                name: 'z',
                start: 133,
                end: 134,
                loc: {
                  start: {
                    line: 6,
                    column: 22
                  },
                  end: {
                    line: 6,
                    column: 23
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 120,
                      end: 122,
                      loc: {
                        start: {
                          line: 6,
                          column: 9
                        },
                        end: {
                          line: 6,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 120,
                      end: 122,
                      loc: {
                        start: {
                          line: 6,
                          column: 9
                        },
                        end: {
                          line: 6,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 120,
                    end: 122,
                    loc: {
                      start: {
                        line: 6,
                        column: 9
                      },
                      end: {
                        line: 6,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y1',
                      start: 127,
                      end: 129,
                      loc: {
                        start: {
                          line: 6,
                          column: 16
                        },
                        end: {
                          line: 6,
                          column: 18
                        }
                      }
                    },
                    start: 124,
                    end: 129,
                    loc: {
                      start: {
                        line: 6,
                        column: 13
                      },
                      end: {
                        line: 6,
                        column: 18
                      }
                    }
                  }
                ],
                start: 119,
                end: 130,
                loc: {
                  start: {
                    line: 6,
                    column: 8
                  },
                  end: {
                    line: 6,
                    column: 19
                  }
                }
              },
              start: 119,
              end: 134,
              loc: {
                start: {
                  line: 6,
                  column: 8
                },
                end: {
                  line: 6,
                  column: 23
                }
              }
            }
          ],
          start: 115,
          end: 135,
          loc: {
            start: {
              line: 6,
              column: 4
            },
            end: {
              line: 6,
              column: 24
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'x1',
              start: 140,
              end: 142,
              loc: {
                start: {
                  line: 7,
                  column: 4
                },
                end: {
                  line: 7,
                  column: 6
                }
              }
            },
            operator: '++',
            prefix: false,
            start: 140,
            end: 144,
            loc: {
              start: {
                line: 7,
                column: 4
              },
              end: {
                line: 7,
                column: 8
              }
            }
          },
          start: 140,
          end: 145,
          loc: {
            start: {
              line: 7,
              column: 4
            },
            end: {
              line: 7,
              column: 9
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
                name: 'z',
                start: 173,
                end: 174,
                loc: {
                  start: {
                    line: 8,
                    column: 27
                  },
                  end: {
                    line: 8,
                    column: 28
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 157,
                      end: 158,
                      loc: {
                        start: {
                          line: 8,
                          column: 11
                        },
                        end: {
                          line: 8,
                          column: 12
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'b',
                      start: 161,
                      end: 162,
                      loc: {
                        start: {
                          line: 8,
                          column: 15
                        },
                        end: {
                          line: 8,
                          column: 16
                        }
                      }
                    },
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 156,
                    end: 162,
                    loc: {
                      start: {
                        line: 8,
                        column: 10
                      },
                      end: {
                        line: 8,
                        column: 16
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'c',
                      start: 167,
                      end: 168,
                      loc: {
                        start: {
                          line: 8,
                          column: 21
                        },
                        end: {
                          line: 8,
                          column: 22
                        }
                      }
                    },
                    start: 164,
                    end: 168,
                    loc: {
                      start: {
                        line: 8,
                        column: 18
                      },
                      end: {
                        line: 8,
                        column: 22
                      }
                    }
                  }
                ],
                start: 154,
                end: 170,
                loc: {
                  start: {
                    line: 8,
                    column: 8
                  },
                  end: {
                    line: 8,
                    column: 24
                  }
                }
              },
              start: 154,
              end: 174,
              loc: {
                start: {
                  line: 8,
                  column: 8
                },
                end: {
                  line: 8,
                  column: 28
                }
              }
            }
          ],
          start: 150,
          end: 175,
          loc: {
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 8,
              column: 29
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
                name: 'z',
                start: 198,
                end: 199,
                loc: {
                  start: {
                    line: 9,
                    column: 22
                  },
                  end: {
                    line: 9,
                    column: 23
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 185,
                      end: 187,
                      loc: {
                        start: {
                          line: 9,
                          column: 9
                        },
                        end: {
                          line: 9,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 185,
                      end: 187,
                      loc: {
                        start: {
                          line: 9,
                          column: 9
                        },
                        end: {
                          line: 9,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 185,
                    end: 187,
                    loc: {
                      start: {
                        line: 9,
                        column: 9
                      },
                      end: {
                        line: 9,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y1',
                      start: 192,
                      end: 194,
                      loc: {
                        start: {
                          line: 9,
                          column: 16
                        },
                        end: {
                          line: 9,
                          column: 18
                        }
                      }
                    },
                    start: 189,
                    end: 194,
                    loc: {
                      start: {
                        line: 9,
                        column: 13
                      },
                      end: {
                        line: 9,
                        column: 18
                      }
                    }
                  }
                ],
                start: 184,
                end: 195,
                loc: {
                  start: {
                    line: 9,
                    column: 8
                  },
                  end: {
                    line: 9,
                    column: 19
                  }
                }
              },
              start: 184,
              end: 199,
              loc: {
                start: {
                  line: 9,
                  column: 8
                },
                end: {
                  line: 9,
                  column: 23
                }
              }
            }
          ],
          start: 180,
          end: 200,
          loc: {
            start: {
              line: 9,
              column: 4
            },
            end: {
              line: 9,
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
              init: {
                type: 'Identifier',
                name: 'z',
                start: 227,
                end: 228,
                loc: {
                  start: {
                    line: 10,
                    column: 26
                  },
                  end: {
                    line: 10,
                    column: 27
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x2',
                      start: 210,
                      end: 212,
                      loc: {
                        start: {
                          line: 10,
                          column: 9
                        },
                        end: {
                          line: 10,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x2',
                      start: 210,
                      end: 212,
                      loc: {
                        start: {
                          line: 10,
                          column: 9
                        },
                        end: {
                          line: 10,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 210,
                    end: 212,
                    loc: {
                      start: {
                        line: 10,
                        column: 9
                      },
                      end: {
                        line: 10,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y2',
                      start: 214,
                      end: 216,
                      loc: {
                        start: {
                          line: 10,
                          column: 13
                        },
                        end: {
                          line: 10,
                          column: 15
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'y2',
                      start: 214,
                      end: 216,
                      loc: {
                        start: {
                          line: 10,
                          column: 13
                        },
                        end: {
                          line: 10,
                          column: 15
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 214,
                    end: 216,
                    loc: {
                      start: {
                        line: 10,
                        column: 13
                      },
                      end: {
                        line: 10,
                        column: 15
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z2',
                      start: 221,
                      end: 223,
                      loc: {
                        start: {
                          line: 10,
                          column: 20
                        },
                        end: {
                          line: 10,
                          column: 22
                        }
                      }
                    },
                    start: 218,
                    end: 223,
                    loc: {
                      start: {
                        line: 10,
                        column: 17
                      },
                      end: {
                        line: 10,
                        column: 22
                      }
                    }
                  }
                ],
                start: 209,
                end: 224,
                loc: {
                  start: {
                    line: 10,
                    column: 8
                  },
                  end: {
                    line: 10,
                    column: 23
                  }
                }
              },
              start: 209,
              end: 228,
              loc: {
                start: {
                  line: 10,
                  column: 8
                },
                end: {
                  line: 10,
                  column: 27
                }
              }
            }
          ],
          start: 205,
          end: 229,
          loc: {
            start: {
              line: 10,
              column: 4
            },
            end: {
              line: 10,
              column: 28
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 262,
                end: 263,
                loc: {
                  start: {
                    line: 11,
                    column: 32
                  },
                  end: {
                    line: 11,
                    column: 33
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'w3',
                      start: 241,
                      end: 243,
                      loc: {
                        start: {
                          line: 11,
                          column: 11
                        },
                        end: {
                          line: 11,
                          column: 13
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'w3',
                      start: 241,
                      end: 243,
                      loc: {
                        start: {
                          line: 11,
                          column: 11
                        },
                        end: {
                          line: 11,
                          column: 13
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 241,
                    end: 243,
                    loc: {
                      start: {
                        line: 11,
                        column: 11
                      },
                      end: {
                        line: 11,
                        column: 13
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x3',
                      start: 245,
                      end: 247,
                      loc: {
                        start: {
                          line: 11,
                          column: 15
                        },
                        end: {
                          line: 11,
                          column: 17
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x3',
                      start: 245,
                      end: 247,
                      loc: {
                        start: {
                          line: 11,
                          column: 15
                        },
                        end: {
                          line: 11,
                          column: 17
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 245,
                    end: 247,
                    loc: {
                      start: {
                        line: 11,
                        column: 15
                      },
                      end: {
                        line: 11,
                        column: 17
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y3',
                      start: 249,
                      end: 251,
                      loc: {
                        start: {
                          line: 11,
                          column: 19
                        },
                        end: {
                          line: 11,
                          column: 21
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'y3',
                      start: 249,
                      end: 251,
                      loc: {
                        start: {
                          line: 11,
                          column: 19
                        },
                        end: {
                          line: 11,
                          column: 21
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 249,
                    end: 251,
                    loc: {
                      start: {
                        line: 11,
                        column: 19
                      },
                      end: {
                        line: 11,
                        column: 21
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z4',
                      start: 256,
                      end: 258,
                      loc: {
                        start: {
                          line: 11,
                          column: 26
                        },
                        end: {
                          line: 11,
                          column: 28
                        }
                      }
                    },
                    start: 253,
                    end: 258,
                    loc: {
                      start: {
                        line: 11,
                        column: 23
                      },
                      end: {
                        line: 11,
                        column: 28
                      }
                    }
                  }
                ],
                start: 240,
                end: 259,
                loc: {
                  start: {
                    line: 11,
                    column: 10
                  },
                  end: {
                    line: 11,
                    column: 29
                  }
                }
              },
              start: 240,
              end: 263,
              loc: {
                start: {
                  line: 11,
                  column: 10
                },
                end: {
                  line: 11,
                  column: 33
                }
              }
            }
          ],
          start: 234,
          end: 264,
          loc: {
            start: {
              line: 11,
              column: 4
            },
            end: {
              line: 11,
              column: 34
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'complex',
                start: 351,
                end: 358,
                loc: {
                  start: {
                    line: 17,
                    column: 8
                  },
                  end: {
                    line: 17,
                    column: 15
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x',
                      start: 282,
                      end: 283,
                      loc: {
                        start: {
                          line: 14,
                          column: 6
                        },
                        end: {
                          line: 14,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'a',
                            start: 287,
                            end: 288,
                            loc: {
                              start: {
                                line: 14,
                                column: 11
                              },
                              end: {
                                line: 14,
                                column: 12
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'xa',
                            start: 290,
                            end: 292,
                            loc: {
                              start: {
                                line: 14,
                                column: 14
                              },
                              end: {
                                line: 14,
                                column: 16
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 287,
                          end: 292,
                          loc: {
                            start: {
                              line: 14,
                              column: 11
                            },
                            end: {
                              line: 14,
                              column: 16
                            }
                          }
                        },
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'd',
                            start: 295,
                            end: 296,
                            loc: {
                              start: {
                                line: 14,
                                column: 19
                              },
                              end: {
                                line: 14,
                                column: 20
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'f',
                            start: 299,
                            end: 300,
                            loc: {
                              start: {
                                line: 14,
                                column: 23
                              },
                              end: {
                                line: 14,
                                column: 24
                              }
                            }
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false,
                          start: 294,
                          end: 300,
                          loc: {
                            start: {
                              line: 14,
                              column: 18
                            },
                            end: {
                              line: 14,
                              column: 24
                            }
                          }
                        },
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'asdf',
                            start: 305,
                            end: 309,
                            loc: {
                              start: {
                                line: 14,
                                column: 29
                              },
                              end: {
                                line: 14,
                                column: 33
                              }
                            }
                          },
                          start: 302,
                          end: 309,
                          loc: {
                            start: {
                              line: 14,
                              column: 26
                            },
                            end: {
                              line: 14,
                              column: 33
                            }
                          }
                        }
                      ],
                      start: 285,
                      end: 311,
                      loc: {
                        start: {
                          line: 14,
                          column: 9
                        },
                        end: {
                          line: 14,
                          column: 35
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 282,
                    end: 311,
                    loc: {
                      start: {
                        line: 14,
                        column: 6
                      },
                      end: {
                        line: 14,
                        column: 35
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y',
                      start: 319,
                      end: 320,
                      loc: {
                        start: {
                          line: 15,
                          column: 6
                        },
                        end: {
                          line: 15,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'd',
                            start: 327,
                            end: 328,
                            loc: {
                              start: {
                                line: 15,
                                column: 14
                              },
                              end: {
                                line: 15,
                                column: 15
                              }
                            }
                          },
                          start: 324,
                          end: 328,
                          loc: {
                            start: {
                              line: 15,
                              column: 11
                            },
                            end: {
                              line: 15,
                              column: 15
                            }
                          }
                        }
                      ],
                      start: 322,
                      end: 330,
                      loc: {
                        start: {
                          line: 15,
                          column: 9
                        },
                        end: {
                          line: 15,
                          column: 17
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 319,
                    end: 330,
                    loc: {
                      start: {
                        line: 15,
                        column: 6
                      },
                      end: {
                        line: 15,
                        column: 17
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'g',
                      start: 341,
                      end: 342,
                      loc: {
                        start: {
                          line: 16,
                          column: 9
                        },
                        end: {
                          line: 16,
                          column: 10
                        }
                      }
                    },
                    start: 338,
                    end: 342,
                    loc: {
                      start: {
                        line: 16,
                        column: 6
                      },
                      end: {
                        line: 16,
                        column: 10
                      }
                    }
                  }
                ],
                start: 274,
                end: 348,
                loc: {
                  start: {
                    line: 13,
                    column: 8
                  },
                  end: {
                    line: 17,
                    column: 5
                  }
                }
              },
              start: 274,
              end: 358,
              loc: {
                start: {
                  line: 13,
                  column: 8
                },
                end: {
                  line: 17,
                  column: 15
                }
              }
            }
          ],
          start: 270,
          end: 359,
          loc: {
            start: {
              line: 13,
              column: 4
            },
            end: {
              line: 17,
              column: 16
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 389,
                end: 390,
                loc: {
                  start: {
                    line: 19,
                    column: 28
                  },
                  end: {
                    line: 19,
                    column: 29
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x4',
                      start: 371,
                      end: 373,
                      loc: {
                        start: {
                          line: 19,
                          column: 10
                        },
                        end: {
                          line: 19,
                          column: 12
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'y4',
                            start: 380,
                            end: 382,
                            loc: {
                              start: {
                                line: 19,
                                column: 19
                              },
                              end: {
                                line: 19,
                                column: 21
                              }
                            }
                          },
                          start: 377,
                          end: 382,
                          loc: {
                            start: {
                              line: 19,
                              column: 16
                            },
                            end: {
                              line: 19,
                              column: 21
                            }
                          }
                        }
                      ],
                      start: 375,
                      end: 384,
                      loc: {
                        start: {
                          line: 19,
                          column: 14
                        },
                        end: {
                          line: 19,
                          column: 23
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 371,
                    end: 384,
                    loc: {
                      start: {
                        line: 19,
                        column: 10
                      },
                      end: {
                        line: 19,
                        column: 23
                      }
                    }
                  }
                ],
                start: 369,
                end: 386,
                loc: {
                  start: {
                    line: 19,
                    column: 8
                  },
                  end: {
                    line: 19,
                    column: 25
                  }
                }
              },
              start: 369,
              end: 390,
              loc: {
                start: {
                  line: 19,
                  column: 8
                },
                end: {
                  line: 19,
                  column: 29
                }
              }
            }
          ],
          start: 365,
          end: 391,
          loc: {
            start: {
              line: 19,
              column: 4
            },
            end: {
              line: 19,
              column: 30
            }
          }
        }
      ],
      start: 0,
      end: 391,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 19,
          column: 30
        }
      }
    }
  ],
  [
    `var { [key]: y, ...x } = { b: 1, a: 1 };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 33,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  }
                ],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'key',
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
                    value: {
                      type: 'Identifier',
                      name: 'y',
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
                    computed: true,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'RestElement',
                    argument: {
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
                  }
                ],
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
              start: 4,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 39
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
              line: 1,
              column: 40
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
          line: 1,
          column: 40
        }
      }
    }
  ],
  [
    `var { ...y } =  { ...z} ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'SpreadElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z',
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
                    }
                  }
                ],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y',
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
                  }
                ],
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
    `var [...{...z}] = [{ x: 1}];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        value: {
                          type: 'Literal',
                          value: 1,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
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
                      }
                    ],
                    start: 19,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 26
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'z',
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
                          start: 9,
                          end: 13,
                          loc: {
                            start: {
                              line: 1,
                              column: 9
                            },
                            end: {
                              line: 1,
                              column: 13
                            }
                          }
                        }
                      ],
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
                  }
                ],
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
    `var {[obj]: y, ...x} = {1: 1, x: 1};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Literal',
                      value: 1,
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  },
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 30,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  }
                ],
                start: 23,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'obj',
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
                    value: {
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 5,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
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
              start: 4,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 35
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
    `var { [key++]: y, ...x } = { 1: 1, a: 1 };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Literal',
                      value: 1,
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 29,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 35,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 35
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 27,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'UpdateExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'key',
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
                      operator: '++',
                      prefix: false,
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
                    value: {
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 6,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
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
                    }
                  }
                ],
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
              start: 4,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 41
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
    `var a = [1], i = 0; [a[i++]] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 1,
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
              id: {
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 0,
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
              id: {
                type: 'Identifier',
                name: 'i',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'a',
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
                  computed: true,
                  property: {
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'i',
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
                    operator: '++',
                    prefix: false,
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
              start: 20,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
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
            start: 20,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 33
              }
            }
          },
          start: 20,
          end: 34,
          loc: {
            start: {
              line: 1,
              column: 20
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
    `var a = [1], i = 0; [a[(() => 1 + i)()]] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 1,
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
              id: {
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 0,
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
              id: {
                type: 'Identifier',
                name: 'i',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'a',
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
                  computed: true,
                  property: {
                    type: 'CallExpression',
                    callee: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Literal',
                          value: 1,
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
                          name: 'i',
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
                        operator: '+',
                        start: 30,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 30
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      },
                      params: [],
                      async: false,
                      expression: true,
                      start: 24,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    arguments: [],
                    start: 23,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  },
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
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
            start: 20,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 45
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
        }
      ],
      start: 0,
      end: 46,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 46
        }
      }
    }
  ],
  [
    `var x; { let x; }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
    `{ let x } var x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                }
              ],
              start: 2,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 2
                },
                end: {
                  line: 1,
                  column: 7
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
          start: 10,
          end: 16,
          loc: {
            start: {
              line: 1,
              column: 10
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
    `var package = x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
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
    `var protected = x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'Identifier',
                name: 'protected',
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
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
    `var [a,] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  }
                ],
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
              start: 4,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 13
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
    `var [a,,b] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  null,
                  {
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
                  }
                ],
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
    `var [,,a] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [],
                start: 12,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [
                  null,
                  null,
                  {
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
                  }
                ],
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
              start: 4,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 14
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
    `var [a] = [,,];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [null, null],
                start: 10,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  }
                ],
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
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 14
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
    `var a; [a] = [,,];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
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
                }
              ],
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [null, null],
              start: 13,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
    `var [...a] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
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
                    start: 5,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
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
    `var [a = 1] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 1,
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
                  }
                ],
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
    `var [a, b = 1] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  {
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 1,
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
                  }
                ],
                start: 4,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              start: 4,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 19
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
    `var [[a]] = [[]];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'ArrayExpression',
                    elements: [],
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
                  }
                ],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      }
                    ],
                    start: 5,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  }
                ],
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
    `var a, b; [((((a)))), b] = [];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
                type: 'Identifier',
                name: 'b',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
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
              start: 10,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
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
            start: 10,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 29
              }
            }
          },
          start: 10,
          end: 30,
          loc: {
            start: {
              line: 1,
              column: 10
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
    `var a; [[[...a]]] = [[[]]];`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'RestElement',
                          argument: {
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
                          start: 10,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 10
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          }
                        }
                      ],
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
            },
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'ArrayExpression',
                      elements: [],
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
                    }
                  ],
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
                }
              ],
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
    `var z, y; ({x:z = 1, x1:y = 20} = {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                name: 'z',
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
            },
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'x',
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
                  value: {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'z',
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
                      value: 1,
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
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
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
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'x1',
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
                  value: {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'y',
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
                    right: {
                      type: 'Literal',
                      value: 20,
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
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 21,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                }
              ],
              start: 11,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
            start: 11,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 36
              }
            }
          },
          start: 10,
          end: 38,
          loc: {
            start: {
              line: 1,
              column: 10
            },
            end: {
              line: 1,
              column: 38
            }
          }
        }
      ],
      start: 0,
      end: 38,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 38
        }
      }
    }
  ],
  [
    `var x; ({x:x = 20} = {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
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
                  value: {
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
                      type: 'Literal',
                      value: 20,
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 9,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                }
              ],
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
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
          start: 7,
          end: 25,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var {x:z = 1, x1:y = 20} = {};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    },
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'z',
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
                        type: 'Literal',
                        value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 5,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x1',
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y',
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
                        type: 'Literal',
                        value: 20,
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
                      start: 17,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
              start: 4,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 29
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
    `'use strict'; var {x: xx,  foo: {y: xx}} = {foo:[12]};`,
    Context.OptionsLoc,
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
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Literal',
                          value: 12,
                          start: 49,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 49
                            },
                            end: {
                              line: 1,
                              column: 51
                            }
                          }
                        }
                      ],
                      start: 48,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 44,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  }
                ],
                start: 43,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 53
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'Identifier',
                      name: 'xx',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 27,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'y',
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
                          value: {
                            type: 'Identifier',
                            name: 'xx',
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
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
                      start: 32,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 27,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 18,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 18,
              end: 53,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 53
                }
              }
            }
          ],
          start: 14,
          end: 54,
          loc: {
            start: {
              line: 1,
              column: 14
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
    `var {x, y, z, x} = {};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    },
                    value: {
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
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y',
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
                    value: {
                      type: 'Identifier',
                      name: 'y',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'z',
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
                    value: {
                      type: 'Identifier',
                      name: 'z',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
              },
              start: 4,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 21
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
    `var x = 20, y, {x} = {};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 20,
                start: 8,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
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
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
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
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
    `var a; { function z(a) {} var a; }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
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
                name: 'z',
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
              start: 9,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 25
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
                }
              ],
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
            }
          ],
          start: 7,
          end: 34,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `function a() {} var a;`,
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
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
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
    `function a() { var a;  }`,
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
                    init: null,
                    id: {
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
    `var a; { function b() {} let a; }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
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
                name: 'b',
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
              start: 9,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 9
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
                    name: 'a',
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
                }
              ],
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
            }
          ],
          start: 7,
          end: 33,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var x = { set foo(x) { var foo = 20; } };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'FunctionExpression',
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
                            type: 'VariableDeclaration',
                            kind: 'var',
                            declarations: [
                              {
                                type: 'VariableDeclarator',
                                init: {
                                  type: 'Literal',
                                  value: 20,
                                  start: 33,
                                  end: 35,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 33
                                    },
                                    end: {
                                      line: 1,
                                      column: 35
                                    }
                                  }
                                },
                                id: {
                                  type: 'Identifier',
                                  name: 'foo',
                                  start: 27,
                                  end: 30,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 27
                                    },
                                    end: {
                                      line: 1,
                                      column: 30
                                    }
                                  }
                                },
                                start: 27,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 27
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                }
                              }
                            ],
                            start: 23,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 36
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
                      },
                      async: false,
                      generator: false,
                      id: null,
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
                    kind: 'set',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 10,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 8,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
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
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 40
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
    `var x = (function foo() { class foo { } });`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                      type: 'ClassDeclaration',
                      id: {
                        type: 'Identifier',
                        name: 'foo',
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
                      superClass: null,
                      body: {
                        type: 'ClassBody',
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
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            }
          ],
          start: 0,
          end: 43,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 43
            }
          }
        }
      ],
      start: 0,
      end: 43,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 43
        }
      }
    }
  ],
  [
    `;(function foo() { class foo { } });`,
    Context.OptionsLoc,
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
            type: 'FunctionExpression',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ClassDeclaration',
                  id: {
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
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    body: [],
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
                  start: 19,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                }
              ],
              start: 17,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 17
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
              name: 'foo',
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
            start: 2,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          start: 1,
          end: 36,
          loc: {
            start: {
              line: 1,
              column: 1
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
    `var x = (function foo() { let foo = 20; });`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 20,
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
                          id: {
                            type: 'Identifier',
                            name: 'foo',
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
                          start: 30,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            }
          ],
          start: 0,
          end: 43,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 43
            }
          }
        }
      ],
      start: 0,
      end: 43,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 43
        }
      }
    }
  ],
  [
    `var x = (function foo() { const foo = 20; });`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 20,
                            start: 38,
                            end: 40,
                            loc: {
                              start: {
                                line: 1,
                                column: 38
                              },
                              end: {
                                line: 1,
                                column: 40
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'foo',
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
                          start: 32,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
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
                start: 9,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              },
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
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 44
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
    `var x = (function foo() { var foo = 20; });`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 20,
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
                          id: {
                            type: 'Identifier',
                            name: 'foo',
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
                          start: 30,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            }
          ],
          start: 0,
          end: 43,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 43
            }
          }
        }
      ],
      start: 0,
      end: 43,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 43
        }
      }
    }
  ],
  [
    `var a; { let a; } `,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
    `var [,,a,b,,,c=2,...d] = a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  null,
                  null,
                  {
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
                  {
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
                  null,
                  null,
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'c',
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
                    right: {
                      type: 'Literal',
                      value: 2,
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
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'd',
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
                    start: 17,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  }
                ],
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
    `var [, , , ] = a;
  /**************************************************/
  var [,,,]=a;
  /**************************************************/
  var [, , , ] = a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
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
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'a',
                start: 85,
                end: 86,
                loc: {
                  start: {
                    line: 3,
                    column: 12
                  },
                  end: {
                    line: 3,
                    column: 13
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
                start: 79,
                end: 84,
                loc: {
                  start: {
                    line: 3,
                    column: 6
                  },
                  end: {
                    line: 3,
                    column: 11
                  }
                }
              },
              start: 79,
              end: 86,
              loc: {
                start: {
                  line: 3,
                  column: 6
                },
                end: {
                  line: 3,
                  column: 13
                }
              }
            }
          ],
          start: 75,
          end: 87,
          loc: {
            start: {
              line: 3,
              column: 2
            },
            end: {
              line: 3,
              column: 14
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
                name: 'a',
                start: 160,
                end: 161,
                loc: {
                  start: {
                    line: 5,
                    column: 17
                  },
                  end: {
                    line: 5,
                    column: 18
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
                start: 149,
                end: 157,
                loc: {
                  start: {
                    line: 5,
                    column: 6
                  },
                  end: {
                    line: 5,
                    column: 14
                  }
                }
              },
              start: 149,
              end: 161,
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
            }
          ],
          start: 145,
          end: 162,
          loc: {
            start: {
              line: 5,
              column: 2
            },
            end: {
              line: 5,
              column: 19
            }
          }
        }
      ],
      start: 0,
      end: 162,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 5,
          column: 19
        }
      }
    }
  ],
  [
    `var [a, [b, c, d=2], ...rest] = test;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'test',
                start: 32,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
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
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      {
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
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'd',
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
                          type: 'Literal',
                          value: 2,
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
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'rest',
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
                start: 4,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              start: 4,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 36
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
    `var x = a; var x = b;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
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
    `var obj = {
      a: {
          ["b" + c]: d,
          e: fn()
      },
      f
  };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 18,
                      end: 19,
                      loc: {
                        start: {
                          line: 2,
                          column: 6
                        },
                        end: {
                          line: 2,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Literal',
                              value: 'b',
                              start: 34,
                              end: 37,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 11
                                },
                                end: {
                                  line: 3,
                                  column: 14
                                }
                              }
                            },
                            right: {
                              type: 'Identifier',
                              name: 'c',
                              start: 40,
                              end: 41,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 17
                                },
                                end: {
                                  line: 3,
                                  column: 18
                                }
                              }
                            },
                            operator: '+',
                            start: 34,
                            end: 41,
                            loc: {
                              start: {
                                line: 3,
                                column: 11
                              },
                              end: {
                                line: 3,
                                column: 18
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'd',
                            start: 44,
                            end: 45,
                            loc: {
                              start: {
                                line: 3,
                                column: 21
                              },
                              end: {
                                line: 3,
                                column: 22
                              }
                            }
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false,
                          start: 33,
                          end: 45,
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
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'e',
                            start: 57,
                            end: 58,
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
                          value: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'fn',
                              start: 60,
                              end: 62,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 13
                                },
                                end: {
                                  line: 4,
                                  column: 15
                                }
                              }
                            },
                            arguments: [],
                            start: 60,
                            end: 64,
                            loc: {
                              start: {
                                line: 4,
                                column: 13
                              },
                              end: {
                                line: 4,
                                column: 17
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 57,
                          end: 64,
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
                      start: 21,
                      end: 72,
                      loc: {
                        start: {
                          line: 2,
                          column: 9
                        },
                        end: {
                          line: 5,
                          column: 7
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 18,
                    end: 72,
                    loc: {
                      start: {
                        line: 2,
                        column: 6
                      },
                      end: {
                        line: 5,
                        column: 7
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'f',
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'f',
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 7
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 80,
                    end: 81,
                    loc: {
                      start: {
                        line: 6,
                        column: 6
                      },
                      end: {
                        line: 6,
                        column: 7
                      }
                    }
                  }
                ],
                start: 10,
                end: 85,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 7,
                    column: 3
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'obj',
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
              end: 85,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 7,
                  column: 3
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
              line: 7,
              column: 4
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
          line: 7,
          column: 4
        }
      }
    }
  ],
  [
    `a = {
      "b": "b",
      c
    };
    /**************************************************/
    a={"b":"b",c};
    /**************************************************/
    a = {
      "b": "b",
      c
    };`,
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
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Literal',
                    value: 'b',
                    start: 12,
                    end: 15,
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
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 17,
                    end: 20,
                    loc: {
                      start: {
                        line: 2,
                        column: 11
                      },
                      end: {
                        line: 2,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 12,
                  end: 20,
                  loc: {
                    start: {
                      line: 2,
                      column: 6
                    },
                    end: {
                      line: 2,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 28,
                    end: 29,
                    loc: {
                      start: {
                        line: 3,
                        column: 6
                      },
                      end: {
                        line: 3,
                        column: 7
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 28,
                    end: 29,
                    loc: {
                      start: {
                        line: 3,
                        column: 6
                      },
                      end: {
                        line: 3,
                        column: 7
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 28,
                  end: 29,
                  loc: {
                    start: {
                      line: 3,
                      column: 6
                    },
                    end: {
                      line: 3,
                      column: 7
                    }
                  }
                }
              ],
              start: 4,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 4,
                  column: 5
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
                line: 4,
                column: 5
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
              line: 4,
              column: 6
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a',
              start: 98,
              end: 99,
              loc: {
                start: {
                  line: 6,
                  column: 4
                },
                end: {
                  line: 6,
                  column: 5
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
                    type: 'Literal',
                    value: 'b',
                    start: 101,
                    end: 104,
                    loc: {
                      start: {
                        line: 6,
                        column: 7
                      },
                      end: {
                        line: 6,
                        column: 10
                      }
                    }
                  },
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 105,
                    end: 108,
                    loc: {
                      start: {
                        line: 6,
                        column: 11
                      },
                      end: {
                        line: 6,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 101,
                  end: 108,
                  loc: {
                    start: {
                      line: 6,
                      column: 7
                    },
                    end: {
                      line: 6,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 109,
                    end: 110,
                    loc: {
                      start: {
                        line: 6,
                        column: 15
                      },
                      end: {
                        line: 6,
                        column: 16
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 109,
                    end: 110,
                    loc: {
                      start: {
                        line: 6,
                        column: 15
                      },
                      end: {
                        line: 6,
                        column: 16
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 109,
                  end: 110,
                  loc: {
                    start: {
                      line: 6,
                      column: 15
                    },
                    end: {
                      line: 6,
                      column: 16
                    }
                  }
                }
              ],
              start: 100,
              end: 111,
              loc: {
                start: {
                  line: 6,
                  column: 6
                },
                end: {
                  line: 6,
                  column: 17
                }
              }
            },
            start: 98,
            end: 111,
            loc: {
              start: {
                line: 6,
                column: 4
              },
              end: {
                line: 6,
                column: 17
              }
            }
          },
          start: 98,
          end: 112,
          loc: {
            start: {
              line: 6,
              column: 4
            },
            end: {
              line: 6,
              column: 18
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a',
              start: 174,
              end: 175,
              loc: {
                start: {
                  line: 8,
                  column: 4
                },
                end: {
                  line: 8,
                  column: 5
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
                    type: 'Literal',
                    value: 'b',
                    start: 186,
                    end: 189,
                    loc: {
                      start: {
                        line: 9,
                        column: 6
                      },
                      end: {
                        line: 9,
                        column: 9
                      }
                    }
                  },
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 191,
                    end: 194,
                    loc: {
                      start: {
                        line: 9,
                        column: 11
                      },
                      end: {
                        line: 9,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 186,
                  end: 194,
                  loc: {
                    start: {
                      line: 9,
                      column: 6
                    },
                    end: {
                      line: 9,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 202,
                    end: 203,
                    loc: {
                      start: {
                        line: 10,
                        column: 6
                      },
                      end: {
                        line: 10,
                        column: 7
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 202,
                    end: 203,
                    loc: {
                      start: {
                        line: 10,
                        column: 6
                      },
                      end: {
                        line: 10,
                        column: 7
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 202,
                  end: 203,
                  loc: {
                    start: {
                      line: 10,
                      column: 6
                    },
                    end: {
                      line: 10,
                      column: 7
                    }
                  }
                }
              ],
              start: 178,
              end: 209,
              loc: {
                start: {
                  line: 8,
                  column: 8
                },
                end: {
                  line: 11,
                  column: 5
                }
              }
            },
            start: 174,
            end: 209,
            loc: {
              start: {
                line: 8,
                column: 4
              },
              end: {
                line: 11,
                column: 5
              }
            }
          },
          start: 174,
          end: 210,
          loc: {
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 11,
              column: 6
            }
          }
        }
      ],
      start: 0,
      end: 210,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 11,
          column: 6
        }
      }
    }
  ],

  [
    `var {[a]: b} = c`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'c',
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                  }
                ],
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
    `var {[a]: [b]} = c`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'c',
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 5,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    }
                  }
                ],
                start: 4,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              start: 4,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 4
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
    `var {a: [b]} = c`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'c',
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  }
                ],
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
    `var {a,b=0,c:d,e:f=0,[g]:[h]}=0`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Literal',
                value: 0,
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'b',
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'b',
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
                        type: 'Literal',
                        value: 0,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'e',
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'f',
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
                        type: 'Literal',
                        value: 0,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'h',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                start: 4,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 29
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
    `var m = 'foo'; var {[m]:[z]} = {foo:[1]}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'Identifier',
                name: 'm',
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
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 13
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'foo',
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
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        {
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
                        }
                      ],
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 32,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 31,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 31
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'm',
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
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 20,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 19,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              start: 19,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            }
          ],
          start: 15,
          end: 40,
          loc: {
            start: {
              line: 1,
              column: 15
            },
            end: {
              line: 1,
              column: 40
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
          line: 1,
          column: 40
        }
      }
    }
  ]
]);
