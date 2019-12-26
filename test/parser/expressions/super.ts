import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Super', () => {
  for (const [source, ctx] of [
    [`super`, Context.Empty],
    [`super[]`, Context.Empty],
    [`async function* x() { super(); }`, Context.Empty],
    ['(async function*() { super(); })', Context.Empty],
    ['var gen = { async *method() { super(); } }', Context.Empty],
    ['var C = class { async *method() { super(); } }', Context.Empty],
    ['var C = class { static async *method() { var x = function () { super(); } } }', Context.Empty],
    ['async function* x() { var x = { y: function () { super(); } } }', Context.Empty],
    ['var gen = { async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
    ['var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
    ['var C = class { static async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
    ['let f = (a=super.foo) => a;', Context.Empty],
    ['let f = () => super.foo;', Context.Empty],
    ['x={ foo(){ return () => () => super(); }}', Context.Empty],
    ['x={ dsda(){ return (a=super()) => a; }}', Context.Empty],
    ['x={ fo(){ return () => super(); }}', Context.Empty],
    ['class x extends y { foo(){ return () => () => super(); }}', Context.Empty],
    ['class x extends y { dsda(){ return (a=super()) => a; }}', Context.Empty],
    ['class x extends y { fo(){ return () => super(); }}', Context.Empty],
    ['class x { constructor(){ return () => () => super(); }}', Context.Empty],
    ['let f = (a=super()) => a;', Context.Empty],
    ['let f = () => super();', Context.Empty],
    ['var foo = function*(a = 1 + (yield 2)) { super.foo() ', Context.Empty],
    ['function* foo(a = 1 + (yield 2)) { super.foo() }', Context.Empty],
    ['function x(){function x(){super();}}', Context.Empty],
    ['class A extends B { *g2(a = 1 + (yield 2)) { } }', Context.Empty],
    ['class x { foo(){ function f(){ super.foo; } }}', Context.Empty],
    ['class x { constructor(){ function f(){ super.foo; } }}', Context.Empty],
    ['x = function(){ super.foo; }', Context.Empty],
    ['super.foo;', Context.Empty],
    ['function f(x=super.foo){ }', Context.Empty],
    ['function f(){ super.foo; }', Context.Empty],
    ['class super { }', Context.Empty],
    ['class x extends super { }', Context.Empty],
    ['class x extends super y { }', Context.Empty],
    ['class x extends foo(super) { }', Context.Empty],
    ['class x extends foo(super y) { }', Context.Empty],
    ['class x { foo(super){} }', Context.Empty],
    ['class x { foo(x=super){} }', Context.Empty],
    ['class x { foo(x=super y){} }', Context.Empty],
    ['class x { foo(x=new (super)()){} }', Context.Empty],
    ['class x { [super](){} }', Context.Empty],
    ['class x { [super y](){} }', Context.Empty],
    ['class f { constructor(){  class super { }  }}', Context.Empty],
    ['class f { constructor(){  class x extends super { }  }}', Context.Empty],
    ['class f { constructor(){  class x extends super y { }  }}', Context.Empty],
    ['class f { constructor(){  class x extends feh(super) { }  }}', Context.Empty],
    ['class f { constructor(){  class x extends feh(super y) { }  }}', Context.Empty],
    ['class f { constructor(){  class x { foo(super){} }  }}', Context.Empty],
    ['class f { constructor(){  class x { foo(x=super){} }  }}', Context.Empty],
    ['class f { constructor(){  class x { foo(x=super y){} }  }}', Context.Empty],
    ['class f { constructor(){  class x { foo(x=new (super)()){} }  }}', Context.Empty],
    ['class f { constructor(){  class x { [super](){} }  }}', Context.Empty],
    ['class f { constructor(){  class x { [super y](){} }  }}', Context.Empty],
    ['class f { bar(){ class super {} }}', Context.Empty],
    ['class f { bar(){ class x extends super { }  }}', Context.Empty],
    ['class f { bar(){ class x extends super y { }  }}', Context.Empty],
    ['class f { bar(){ class x extends feh(super) { }  }}', Context.Empty],
    ['class f { bar(){ class x extends feh(super y) { }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(super){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=super){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=super y){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=new (super)()){} }  }}', Context.Empty],
    ['class f { bar(){ class x { [super](){} }  }}', Context.Empty],
    ['class f { bar(){ class x { [super y](){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class super { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends super { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends super y { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends feh(super) { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends feh(super y) { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(super){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(x=super){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(x=super y){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(x=new (super)()){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { [super](){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { [super y](){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class super {} }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends super { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends super y { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends feh(super) { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends feh(super y) { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(super){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=super){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=super y){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=new (super)()){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { [super](){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { [super y](){} }  }}', Context.Empty],
    ['class super.foo { }', Context.Empty],
    ['class x extends super.foo { }', Context.Empty],
    ['class x extends super.foo y { }', Context.Empty],
    ['class x extends feh(super.foo) { }', Context.Empty],
    ['class x extends feh(super.foo y) { }', Context.Empty],
    ['class x { foo(super.foo){} }', Context.Empty],
    ['class x { super.foo(){} }', Context.Empty],
    ['class x { [super.foo](){} }', Context.Empty],
    ['class x { [super.foo y](){} }', Context.Empty],
    ['class f { constructor(){ class super.foo { }  }}', Context.Empty],
    ['class f { constructor(){ class x extends super.foo y { }  }}', Context.Empty],
    ['class f { constructor(){ class x extends feh(super.foo y) { }  }}', Context.Empty],
    ['class f { constructor(){ class x { foo(super.foo){} }  }}', Context.Empty],
    ['x={ foo: function(){ super.foo; }}', Context.Empty],
    ['g=function f(x = super()){ }', Context.Empty],
    ['g={f: function f(){ super() }]', Context.Empty],
    ['x={constructor(){ super(); }}', Context.Empty],
    ['function f(x = super()){ }', Context.Empty],
    ['function f(){ super(); }', Context.Empty],
    ['const x = 5 + super();', Context.Empty],
    ['let x = { foo(){ super(); } }', Context.Empty],
    ['class x { foo(){ super(); } }', Context.Empty],
    ['class x extends y { foo(){ super(); } }', Context.Empty],
    ['async(foo) => { super.prop };', Context.Empty],
    ['!{ a() { !function* (a = super.b()){} } };', Context.Empty],
    ['async(foo) => { super() };', Context.Empty],
    ['super.property;', Context.Empty],
    ['(async function*() { super(); });', Context.Empty],
    ['function* a(b){ super.c }', Context.Empty],
    ['class A extends B { constructor() { (super)() } }', Context.Empty],
    ['function wrap() { function foo(a = super(), b = super.foo()) {}}', Context.Empty],
    ['({ a() { (super).b(); } });', Context.Empty],
    ['class X { x(){class X { constructor(){super();} }} }', Context.Empty],
    ['!{ a() { !function* (a = super.b()){} } };', Context.Empty],
    ['({ f: function*() {() => new super; } })', Context.Empty],
    ['async function* x() { super(); }', Context.Empty],
    ['var C = class { static async *method() { var x = function () { super(); } } }', Context.Empty],
    ['var C = class { async *method() { var x = { y: function () { super(); } } } }', Context.Empty],
    ['let x = { foo(){ super(); } }', Context.Empty],
    ['function* a(b){ super.c }', Context.Empty],
    ['class C { constructor() { super(); } }', Context.Empty],
    ['class C { method() { () => super(); } }', Context.Empty],
    ['({ get x() { super(); } })', Context.Empty],
    ['({ set x(_) { super(); } })', Context.Empty],
    ['({ f: function() { super(); } })', Context.Empty],
    ['(function() { super(); })', Context.Empty],
    ['({ f: function*() { super(); } })', Context.Empty],
    ['(function*() { super(); })', Context.Empty],
    ['var f = function*() { super(); }', Context.Empty],
    ['class f { constructor(){ class x { foo(x=super.foo y){} } }}', Context.Empty],
    ['class f { constructor(){ class x { super.foo(){} } }}', Context.Empty],
    ['class f { constructor(){ class x { [super.foo y](){} } }}', Context.Empty],
    ['class f { bar(){ class super.foo { } }}', Context.Empty],
    ['class f { bar(){ class x extends super.foo y {} }}', Context.Empty],
    ['class f { bar(){ class x extends feh(super.foo y) {} }}', Context.Empty],
    ['class f { bar(){ class x { foo(super.foo){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=super.foo y){} }  }}', Context.Empty],
    ['class f { bar(){ class x { super.foo(){} }  }}', Context.Empty],
    ['class f { bar(){ class x { [super.foo y](){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class super.foo { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends super.foo y { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends feh(super.foo y) { }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(super.foo){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(x=super.foo y){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { super.foo(){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { [super.foo y](){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class super.foo { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends super.foo y { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends feh(super.foo y) { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=super.foo y){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { super.foo(){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { [super.foo y](){} }  }}', Context.Empty],
    ['class x extends super() { }', Context.Empty],
    ['class x { foo(x=new (super)()){} }', Context.Empty],
    ['class x extends super() y { }', Context.Empty],
    ['class x extends feh(super()) { }', Context.Empty],
    ['class x extends feh(super() y) { }', Context.Empty],
    ['class x { foo(super()){} }', Context.Empty],
    ['class x { foo(x=super()){} }', Context.Empty],
    ['class x { foo(x=super() y){} }', Context.Empty],
    ['class x { foo(x=new (super())()){} }', Context.Empty],
    ['class x { super()(){} }', Context.Empty],
    ['class x { [super()](){} }', Context.Empty],
    ['class x { [super() y](){} }', Context.Empty],
    ['class f { constructor(){ class super() { } }}', Context.Empty],
    ['class f { constructor(){ class x extends super() {} }}', Context.Empty],
    ['class f { constructor(){ class x extends super() y {} }}', Context.Empty],
    ['class f { constructor(){ class x { foo(super()){} } }}', Context.Empty],
    ['class f { constructor(){ class x { foo(x=super()){} } }}', Context.Empty],
    ['class f { constructor(){ class x { foo(x=super() y){} } }}', Context.Empty],
    ['class f { constructor(){ class x { foo(x=new (super())()){} } }}', Context.Empty],
    ['class f { constructor(){ class x { super()(){} } }}', Context.Empty],
    ['class f { constructor(){ class x { [super()](){} } }}', Context.Empty],
    ['class f { constructor(){ class x { [super() y](){} } }}', Context.Empty],
    ['class f { bar(){ class super() {}  }}', Context.Empty],
    ['class f { bar(){ class x extends super() {} }}', Context.Empty],
    ['class f { bar(){ class x extends super() y {} }}', Context.Empty],
    ['class f { bar(){ class x extends feh(super()) {} }}', Context.Empty],
    ['class f { bar(){ class x extends feh(super() y) {} }}', Context.Empty],
    ['class f { bar(){ class x { foo(super()){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=super()){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=super() y){} }  }}', Context.Empty],
    ['class f { bar(){ class x { foo(x=new (super())()){} } }}', Context.Empty],
    ['class f { bar(){ class x { [super()](){} }  }}', Context.Empty],
    ['class f extends bar { constructor(){ class super() {} }}', Context.Empty],
    ['class f extends bar { constructor(){ class x extends super() y {} }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(super()){} } }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { foo(x=super()){} } }}', Context.Empty],
    ['class f extends bar { constructor(){ class x { super()(){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class super() {} }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends super() { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends super() y { }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends feh(super()) {} }}', Context.Empty],
    ['class f extends bar { xxx(){ class x extends feh(super() y) { } }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(super()){} }  }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=super() y){} } }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { foo(x=new (super())()){} } }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { super()(){} } }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { [super()](){} } }}', Context.Empty],
    ['class f extends bar { xxx(){ class x { [super() y](){} } }}', Context.Empty]
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
      `class a extends b { c() { [super.d] = e } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
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
            superClass: {
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
                  value: {
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
                              type: 'ArrayPattern',
                              elements: [
                                {
                                  type: 'MemberExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  object: {
                                    type: 'Super',
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
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'd',
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
                                  start: 27,
                                  end: 34,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 27
                                    },
                                    end: {
                                      line: 1,
                                      column: 34
                                    }
                                  }
                                }
                              ],
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
                            operator: '=',
                            right: {
                              type: 'Identifier',
                              name: 'e',
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
                    id: null,
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
      `class C { constructor() { this._x = 45; } get foo() { return this._x;} } class D extends C { x(y = () => super.foo) { return y(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 133,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 133
          }
        },
        body: [
          {
            type: 'ClassDeclaration',
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
            },
            id: {
              type: 'Identifier',
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
              },
              name: 'C'
            },
            superClass: null,
            body: {
              type: 'ClassBody',
              start: 8,
              end: 72,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 72
                }
              },
              body: [
                {
                  type: 'MethodDefinition',
                  start: 10,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  },
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    },
                    name: 'constructor'
                  },
                  value: {
                    type: 'FunctionExpression',
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
                    },
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
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
                      },
                      body: [
                        {
                          type: 'ExpressionStatement',
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
                          },
                          expression: {
                            type: 'AssignmentExpression',
                            start: 26,
                            end: 38,
                            loc: {
                              start: {
                                line: 1,
                                column: 26
                              },
                              end: {
                                line: 1,
                                column: 38
                              }
                            },
                            operator: '=',
                            left: {
                              type: 'MemberExpression',
                              optional: false,
                              shortCircuited: false,
                              start: 26,
                              end: 33,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 26
                                },
                                end: {
                                  line: 1,
                                  column: 33
                                }
                              },
                              object: {
                                type: 'ThisExpression',
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
                              property: {
                                type: 'Identifier',
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
                                },
                                name: '_x'
                              },
                              computed: false
                            },
                            right: {
                              type: 'Literal',
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
                              },
                              value: 45
                            }
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  type: 'MethodDefinition',
                  start: 42,
                  end: 70,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 70
                    }
                  },
                  kind: 'get',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 46,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 46
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    },
                    name: 'foo'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 49,
                    end: 70,
                    loc: {
                      start: {
                        line: 1,
                        column: 49
                      },
                      end: {
                        line: 1,
                        column: 70
                      }
                    },
                    id: null,
                    generator: false,
                    async: false,
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      start: 52,
                      end: 70,
                      loc: {
                        start: {
                          line: 1,
                          column: 52
                        },
                        end: {
                          line: 1,
                          column: 70
                        }
                      },
                      body: [
                        {
                          type: 'ReturnStatement',
                          start: 54,
                          end: 69,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 69
                            }
                          },
                          argument: {
                            type: 'MemberExpression',
                            optional: false,
                            shortCircuited: false,
                            start: 61,
                            end: 68,
                            loc: {
                              start: {
                                line: 1,
                                column: 61
                              },
                              end: {
                                line: 1,
                                column: 68
                              }
                            },
                            object: {
                              type: 'ThisExpression',
                              start: 61,
                              end: 65,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 61
                                },
                                end: {
                                  line: 1,
                                  column: 65
                                }
                              }
                            },
                            property: {
                              type: 'Identifier',
                              start: 66,
                              end: 68,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 66
                                },
                                end: {
                                  line: 1,
                                  column: 68
                                }
                              },
                              name: '_x'
                            },
                            computed: false
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          },
          {
            type: 'ClassDeclaration',
            start: 73,
            end: 133,
            loc: {
              start: {
                line: 1,
                column: 73
              },
              end: {
                line: 1,
                column: 133
              }
            },
            id: {
              type: 'Identifier',
              start: 79,
              end: 80,
              loc: {
                start: {
                  line: 1,
                  column: 79
                },
                end: {
                  line: 1,
                  column: 80
                }
              },
              name: 'D'
            },
            superClass: {
              type: 'Identifier',
              start: 89,
              end: 90,
              loc: {
                start: {
                  line: 1,
                  column: 89
                },
                end: {
                  line: 1,
                  column: 90
                }
              },
              name: 'C'
            },
            body: {
              type: 'ClassBody',
              start: 91,
              end: 133,
              loc: {
                start: {
                  line: 1,
                  column: 91
                },
                end: {
                  line: 1,
                  column: 133
                }
              },
              body: [
                {
                  type: 'MethodDefinition',
                  start: 93,
                  end: 131,
                  loc: {
                    start: {
                      line: 1,
                      column: 93
                    },
                    end: {
                      line: 1,
                      column: 131
                    }
                  },
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    start: 93,
                    end: 94,
                    loc: {
                      start: {
                        line: 1,
                        column: 93
                      },
                      end: {
                        line: 1,
                        column: 94
                      }
                    },
                    name: 'x'
                  },
                  value: {
                    type: 'FunctionExpression',
                    start: 94,
                    end: 131,
                    loc: {
                      start: {
                        line: 1,
                        column: 94
                      },
                      end: {
                        line: 1,
                        column: 131
                      }
                    },
                    id: null,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: 'AssignmentPattern',
                        start: 95,
                        end: 114,
                        loc: {
                          start: {
                            line: 1,
                            column: 95
                          },
                          end: {
                            line: 1,
                            column: 114
                          }
                        },
                        left: {
                          type: 'Identifier',
                          start: 95,
                          end: 96,
                          loc: {
                            start: {
                              line: 1,
                              column: 95
                            },
                            end: {
                              line: 1,
                              column: 96
                            }
                          },
                          name: 'y'
                        },
                        right: {
                          type: 'ArrowFunctionExpression',
                          start: 99,
                          end: 114,
                          loc: {
                            start: {
                              line: 1,
                              column: 99
                            },
                            end: {
                              line: 1,
                              column: 114
                            }
                          },
                          expression: true,
                          async: false,
                          params: [],
                          body: {
                            type: 'MemberExpression',
                            optional: false,
                            shortCircuited: false,
                            start: 105,
                            end: 114,
                            loc: {
                              start: {
                                line: 1,
                                column: 105
                              },
                              end: {
                                line: 1,
                                column: 114
                              }
                            },
                            object: {
                              type: 'Super',
                              start: 105,
                              end: 110,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 105
                                },
                                end: {
                                  line: 1,
                                  column: 110
                                }
                              }
                            },
                            property: {
                              type: 'Identifier',
                              start: 111,
                              end: 114,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 111
                                },
                                end: {
                                  line: 1,
                                  column: 114
                                }
                              },
                              name: 'foo'
                            },
                            computed: false
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      start: 116,
                      end: 131,
                      loc: {
                        start: {
                          line: 1,
                          column: 116
                        },
                        end: {
                          line: 1,
                          column: 131
                        }
                      },
                      body: [
                        {
                          type: 'ReturnStatement',
                          start: 118,
                          end: 129,
                          loc: {
                            start: {
                              line: 1,
                              column: 118
                            },
                            end: {
                              line: 1,
                              column: 129
                            }
                          },
                          argument: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            start: 125,
                            end: 128,
                            loc: {
                              start: {
                                line: 1,
                                column: 125
                              },
                              end: {
                                line: 1,
                                column: 128
                              }
                            },
                            callee: {
                              type: 'Identifier',
                              start: 125,
                              end: 126,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 125
                                },
                                end: {
                                  line: 1,
                                  column: 126
                                }
                              },
                              name: 'y'
                            },
                            arguments: []
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `class a extends b { foo(){   class x { [super.foo](){} }    }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
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
            superClass: {
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
                    name: 'foo',
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
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ClassDeclaration',
                          id: {
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
                          superClass: null,
                          body: {
                            type: 'ClassBody',
                            body: [
                              {
                                type: 'MethodDefinition',
                                kind: 'method',
                                static: false,
                                computed: true,
                                key: {
                                  type: 'MemberExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  object: {
                                    type: 'Super',
                                    start: 40,
                                    end: 45,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 40
                                      },
                                      end: {
                                        line: 1,
                                        column: 45
                                      }
                                    }
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'foo',
                                    start: 46,
                                    end: 49,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 46
                                      },
                                      end: {
                                        line: 1,
                                        column: 49
                                      }
                                    }
                                  },
                                  start: 40,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 40
                                    },
                                    end: {
                                      line: 1,
                                      column: 49
                                    }
                                  }
                                },
                                value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 52,
                                    end: 54,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 52
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
                                  start: 50,
                                  end: 54,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 50
                                    },
                                    end: {
                                      line: 1,
                                      column: 54
                                    }
                                  }
                                },
                                start: 39,
                                end: 54,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 39
                                  },
                                  end: {
                                    line: 1,
                                    column: 54
                                  }
                                }
                              }
                            ],
                            start: 37,
                            end: 56,
                            loc: {
                              start: {
                                line: 1,
                                column: 37
                              },
                              end: {
                                line: 1,
                                column: 56
                              }
                            }
                          },
                          start: 29,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 56
                            }
                          }
                        }
                      ],
                      start: 25,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 23,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  start: 20,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  }
                }
              ],
              start: 18,
              end: 62,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 62
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
      `class f { constructor(){  class x { foo(x=new (super.foo)()){} }  }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'f',
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
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
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
                          type: 'ClassDeclaration',
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
                                  name: 'foo',
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
                                  params: [
                                    {
                                      type: 'AssignmentPattern',
                                      left: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        type: 'NewExpression',
                                        callee: {
                                          type: 'MemberExpression',
                                          optional: false,
                                          shortCircuited: false,
                                          object: {
                                            type: 'Super',
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
                                          },
                                          computed: false,
                                          property: {
                                            type: 'Identifier',
                                            name: 'foo',
                                            start: 53,
                                            end: 56,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 53
                                              },
                                              end: {
                                                line: 1,
                                                column: 56
                                              }
                                            }
                                          },
                                          start: 47,
                                          end: 56,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 47
                                            },
                                            end: {
                                              line: 1,
                                              column: 56
                                            }
                                          }
                                        },
                                        arguments: [],
                                        start: 42,
                                        end: 59,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 42
                                          },
                                          end: {
                                            line: 1,
                                            column: 59
                                          }
                                        }
                                      },
                                      start: 40,
                                      end: 59,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 40
                                        },
                                        end: {
                                          line: 1,
                                          column: 59
                                        }
                                      }
                                    }
                                  ],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 60,
                                    end: 62,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 60
                                      },
                                      end: {
                                        line: 1,
                                        column: 62
                                      }
                                    }
                                  },
                                  async: false,
                                  generator: false,
                                  id: null,
                                  start: 39,
                                  end: 62,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 39
                                    },
                                    end: {
                                      line: 1,
                                      column: 62
                                    }
                                  }
                                },
                                start: 36,
                                end: 62,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 62
                                  }
                                }
                              }
                            ],
                            start: 34,
                            end: 64,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 64
                              }
                            }
                          },
                          start: 26,
                          end: 64,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 64
                            }
                          }
                        }
                      ],
                      start: 23,
                      end: 67,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 67
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 21,
                    end: 67,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 67
                      }
                    }
                  },
                  start: 10,
                  end: 67,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 67
                    }
                  }
                }
              ],
              start: 8,
              end: 68,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 68
                }
              }
            },
            start: 0,
            end: 68,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 68
              }
            }
          }
        ],
        start: 0,
        end: 68,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 68
          }
        }
      }
    ],
    [
      `class f { constructor(){  class x { foo(x=super.foo){} }  }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'f',
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
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
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
                          type: 'ClassDeclaration',
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
                                  name: 'foo',
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
                                  params: [
                                    {
                                      type: 'AssignmentPattern',
                                      left: {
                                        type: 'Identifier',
                                        name: 'x',
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
                                        type: 'MemberExpression',
                                        optional: false,
                                        shortCircuited: false,
                                        object: {
                                          type: 'Super',
                                          start: 42,
                                          end: 47,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 42
                                            },
                                            end: {
                                              line: 1,
                                              column: 47
                                            }
                                          }
                                        },
                                        computed: false,
                                        property: {
                                          type: 'Identifier',
                                          name: 'foo',
                                          start: 48,
                                          end: 51,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 48
                                            },
                                            end: {
                                              line: 1,
                                              column: 51
                                            }
                                          }
                                        },
                                        start: 42,
                                        end: 51,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 42
                                          },
                                          end: {
                                            line: 1,
                                            column: 51
                                          }
                                        }
                                      },
                                      start: 40,
                                      end: 51,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 40
                                        },
                                        end: {
                                          line: 1,
                                          column: 51
                                        }
                                      }
                                    }
                                  ],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [],
                                    start: 52,
                                    end: 54,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 52
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
                                  start: 39,
                                  end: 54,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 39
                                    },
                                    end: {
                                      line: 1,
                                      column: 54
                                    }
                                  }
                                },
                                start: 36,
                                end: 54,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 54
                                  }
                                }
                              }
                            ],
                            start: 34,
                            end: 56,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 56
                              }
                            }
                          },
                          start: 26,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 56
                            }
                          }
                        }
                      ],
                      start: 23,
                      end: 59,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 59
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 21,
                    end: 59,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 59
                      }
                    }
                  },
                  start: 10,
                  end: 59,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 59
                    }
                  }
                }
              ],
              start: 8,
              end: 60,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 60
                }
              }
            },
            start: 0,
            end: 60,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 60
              }
            }
          }
        ],
        start: 0,
        end: 60,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 60
          }
        }
      }
    ],
    [
      `class C { constructor() {new super.x; } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'C',
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
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
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
                            type: 'NewExpression',
                            callee: {
                              type: 'MemberExpression',
                              optional: false,
                              shortCircuited: false,
                              object: {
                                type: 'Super',
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
                              },
                              computed: false,
                              property: {
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
                            arguments: [],
                            start: 25,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 25
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
                        }
                      ],
                      start: 24,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
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
                  start: 10,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 8,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 41
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
      `class x { foo(){ super.foo; }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
                            optional: false,
                            shortCircuited: false,
                            object: {
                              type: 'Super',
                              start: 17,
                              end: 22,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 22
                                }
                              }
                            },
                            computed: false,
                            property: {
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
                          start: 17,
                          end: 27,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 27
                            }
                          }
                        }
                      ],
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
                    async: false,
                    generator: false,
                    id: null,
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
                }
              ],
              start: 8,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 8
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
      `class x extends y { constructor(){ return () => super(); }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'CallExpression',
                              optional: false,
                              shortCircuited: false,
                              callee: {
                                type: 'Super',
                                start: 48,
                                end: 53,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 48
                                  },
                                  end: {
                                    line: 1,
                                    column: 53
                                  }
                                }
                              },
                              arguments: [],
                              start: 48,
                              end: 55,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 48
                                },
                                end: {
                                  line: 1,
                                  column: 55
                                }
                              }
                            },
                            params: [],
                            async: false,
                            expression: true,
                            start: 42,
                            end: 55,
                            loc: {
                              start: {
                                line: 1,
                                column: 42
                              },
                              end: {
                                line: 1,
                                column: 55
                              }
                            }
                          },
                          start: 35,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 56
                            }
                          }
                        }
                      ],
                      start: 33,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
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
                    start: 31,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  start: 20,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
              start: 18,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
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
      `class x extends y { constructor(){ return (a=super()) => a; }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'Identifier',
                              name: 'a',
                              start: 57,
                              end: 58,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 57
                                },
                                end: {
                                  line: 1,
                                  column: 58
                                }
                              }
                            },
                            params: [
                              {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a',
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
                                right: {
                                  type: 'CallExpression',
                                  optional: false,
                                  shortCircuited: false,
                                  callee: {
                                    type: 'Super',
                                    start: 45,
                                    end: 50,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 45
                                      },
                                      end: {
                                        line: 1,
                                        column: 50
                                      }
                                    }
                                  },
                                  arguments: [],
                                  start: 45,
                                  end: 52,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 45
                                    },
                                    end: {
                                      line: 1,
                                      column: 52
                                    }
                                  }
                                },
                                start: 43,
                                end: 52,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 43
                                  },
                                  end: {
                                    line: 1,
                                    column: 52
                                  }
                                }
                              }
                            ],
                            async: false,
                            expression: true,
                            start: 42,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 42
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            }
                          },
                          start: 35,
                          end: 59,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 59
                            }
                          }
                        }
                      ],
                      start: 33,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  start: 20,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  }
                }
              ],
              start: 18,
              end: 62,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 62
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
      `class x extends y { foo(){ return () => () => super.foo; }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
                    name: 'foo',
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
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                optional: false,
                                shortCircuited: false,
                                object: {
                                  type: 'Super',
                                  start: 46,
                                  end: 51,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 46
                                    },
                                    end: {
                                      line: 1,
                                      column: 51
                                    }
                                  }
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo',
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
                                },
                                start: 46,
                                end: 55,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 46
                                  },
                                  end: {
                                    line: 1,
                                    column: 55
                                  }
                                }
                              },
                              params: [],
                              async: false,
                              expression: true,
                              start: 40,
                              end: 55,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 40
                                },
                                end: {
                                  line: 1,
                                  column: 55
                                }
                              }
                            },
                            params: [],
                            async: false,
                            expression: true,
                            start: 34,
                            end: 55,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 55
                              }
                            }
                          },
                          start: 27,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 56
                            }
                          }
                        }
                      ],
                      start: 25,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
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
                    start: 23,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  start: 20,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
              start: 18,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
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
      `x={ fo(){ return () => super.foo; }}`,
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
                      name: 'fo',
                      start: 4,
                      end: 6,
                      loc: {
                        start: {
                          line: 1,
                          column: 4
                        },
                        end: {
                          line: 1,
                          column: 6
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
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'MemberExpression',
                                optional: false,
                                shortCircuited: false,
                                object: {
                                  type: 'Super',
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
                                computed: false,
                                property: {
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
                              params: [],
                              async: false,
                              expression: true,
                              start: 17,
                              end: 32,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 17
                                },
                                end: {
                                  line: 1,
                                  column: 32
                                }
                              }
                            },
                            start: 10,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 10
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          }
                        ],
                        start: 8,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: null,
                      start: 6,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false,
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
                start: 2,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 2
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
      `x={ dsda(){ return (a=super.foo) => a; }}`,
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
                      name: 'dsda',
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
                    value: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'Identifier',
                                name: 'a',
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
                              params: [
                                {
                                  type: 'AssignmentPattern',
                                  left: {
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
                                  right: {
                                    type: 'MemberExpression',
                                    optional: false,
                                    shortCircuited: false,
                                    object: {
                                      type: 'Super',
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
                                    computed: false,
                                    property: {
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
                                }
                              ],
                              async: false,
                              expression: true,
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
                            },
                            start: 12,
                            end: 38,
                            loc: {
                              start: {
                                line: 1,
                                column: 12
                              },
                              end: {
                                line: 1,
                                column: 38
                              }
                            }
                          }
                        ],
                        start: 10,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: null,
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
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false,
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
                start: 2,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 41
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
      `class x extends y { constructor() { log(super.foo); super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Identifier',
                              name: 'log',
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
                            arguments: [
                              {
                                type: 'MemberExpression',
                                optional: false,
                                shortCircuited: false,
                                object: {
                                  type: 'Super',
                                  start: 40,
                                  end: 45,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 40
                                    },
                                    end: {
                                      line: 1,
                                      column: 45
                                    }
                                  }
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'foo',
                                  start: 46,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 46
                                    },
                                    end: {
                                      line: 1,
                                      column: 49
                                    }
                                  }
                                },
                                start: 40,
                                end: 49,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 40
                                  },
                                  end: {
                                    line: 1,
                                    column: 49
                                  }
                                }
                              }
                            ],
                            start: 36,
                            end: 50,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 50
                              }
                            }
                          },
                          start: 36,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 51
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
                              type: 'Super',
                              start: 52,
                              end: 57,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 52
                                },
                                end: {
                                  line: 1,
                                  column: 57
                                }
                              }
                            },
                            arguments: [],
                            start: 52,
                            end: 59,
                            loc: {
                              start: {
                                line: 1,
                                column: 52
                              },
                              end: {
                                line: 1,
                                column: 59
                              }
                            }
                          },
                          start: 52,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 52
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 62,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 62
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 20,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 18,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 64
                }
              }
            },
            start: 0,
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 64
              }
            }
          }
        ],
        start: 0,
        end: 64,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 64
          }
        }
      }
    ],
    [
      `class x extends y { constructor(x = super()) { } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'CallExpression',
                          optional: false,
                          shortCircuited: false,
                          callee: {
                            type: 'Super',
                            start: 36,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            }
                          },
                          arguments: [],
                          start: 36,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
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
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 45,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 45
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  start: 20,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              start: 18,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            },
            start: 0,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 50
              }
            }
          }
        ],
        start: 0,
        end: 50,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 50
          }
        }
      }
    ],
    [
      `class x extends y { constructor(x = this) { super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'ThisExpression',
                          start: 36,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 40
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
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Super',
                              start: 44,
                              end: 49,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 44
                                },
                                end: {
                                  line: 1,
                                  column: 49
                                }
                              }
                            },
                            arguments: [],
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
                      start: 42,
                      end: 54,
                      loc: {
                        start: {
                          line: 1,
                          column: 42
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
                    start: 31,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  start: 20,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  }
                }
              ],
              start: 18,
              end: 56,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 56
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
      `class x extends y { constructor(x = super(), y = this) { } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'CallExpression',
                          optional: false,
                          shortCircuited: false,
                          callee: {
                            type: 'Super',
                            start: 36,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            }
                          },
                          arguments: [],
                          start: 36,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
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
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'y',
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
                        right: {
                          type: 'ThisExpression',
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
                        start: 45,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 45
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  start: 20,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
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
            start: 0,
            end: 60,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 60
              }
            }
          }
        ],
        start: 0,
        end: 60,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 60
          }
        }
      }
    ],
    [
      `class x extends y { constructor() { super(); super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Super',
                              start: 36,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 36
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              }
                            },
                            arguments: [],
                            start: 36,
                            end: 43,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 43
                              }
                            }
                          },
                          start: 36,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 44
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
                              type: 'Super',
                              start: 45,
                              end: 50,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 50
                                }
                              }
                            },
                            arguments: [],
                            start: 45,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 45
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            }
                          },
                          start: 45,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 45
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 55,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 55
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 55,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 55
                      }
                    }
                  },
                  start: 20,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 18,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 57
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
      `class x extends y { constructor(){ return () => () => super(); }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'CallExpression',
                                optional: false,
                                shortCircuited: false,
                                callee: {
                                  type: 'Super',
                                  start: 54,
                                  end: 59,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 54
                                    },
                                    end: {
                                      line: 1,
                                      column: 59
                                    }
                                  }
                                },
                                arguments: [],
                                start: 54,
                                end: 61,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 54
                                  },
                                  end: {
                                    line: 1,
                                    column: 61
                                  }
                                }
                              },
                              params: [],
                              async: false,
                              expression: true,
                              start: 48,
                              end: 61,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 48
                                },
                                end: {
                                  line: 1,
                                  column: 61
                                }
                              }
                            },
                            params: [],
                            async: false,
                            expression: true,
                            start: 42,
                            end: 61,
                            loc: {
                              start: {
                                line: 1,
                                column: 42
                              },
                              end: {
                                line: 1,
                                column: 61
                              }
                            }
                          },
                          start: 35,
                          end: 62,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 62
                            }
                          }
                        }
                      ],
                      start: 33,
                      end: 64,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 64
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    }
                  },
                  start: 20,
                  end: 64,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 64
                    }
                  }
                }
              ],
              start: 18,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 65
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
                line: 1,
                column: 65
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
            line: 1,
            column: 65
          }
        }
      }
    ],
    [
      `class x { constructor(){ super.foo; }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
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
                            optional: false,
                            shortCircuited: false,
                            object: {
                              type: 'Super',
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
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'foo',
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
                        }
                      ],
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
                    async: false,
                    generator: false,
                    id: null,
                    start: 21,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  start: 10,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 8,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
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
    /*  [
        `class x { foo(x=super.foo){ }}`,
        Context.OptionsNext | Context.OptionsLoc,
        {
          "type": "Program",
          "sourceType": "script",
          "body": [
            {
              "type": "ClassDeclaration",
              "id": {
                "type": "Identifier",
                "name": "x",
                "start": 6,
                "end": 7,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 6
                  },
                  "end": {
                    "line": 1,
                    "column": 7
                  }
                }
              },
              "superClass": null,
              "body": {
                "type": "ClassBody",
                "body": [
                  {
                    "type": "MethodDefinition",
                    "kind": "method",
                    "static": false,
                    "computed": false,
                    "key": {
                      "type": "Identifier",
                      "name": "foo",
                      "start": 10,
                      "end": 13,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 10
                        },
                        "end": {
                          "line": 1,
                          "column": 13
                        }
                      }
                    },
                    "value": {
                      "type": "FunctionExpression",
                      "params": [
                        {
                          "type": "AssignmentPattern",
                          "left": {
                            "type": "Identifier",
                            "name": "x",
                            "start": 14,
                            "end": 15,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 14
                              },
                              "end": {
                                "line": 1,
                                "column": 15
                              }
                            }
                          },
                          "right": {
                            "type": "MemberExpression",
                            "object": {
                              "type": "Super",
                              "start": 16,
                              "end": 21,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 16
                                },
                                "end": {
                                  "line": 1,
                                  "column": 21
                                }
                              }
                            },
                            "computed": false,
                            "property": {
                              "type": "Identifier",
                              "name": "foo",
                              "start": 22,
                              "end": 25,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 22
                                },
                                "end": {
                                  "line": 1,
                                  "column": 25
                                }
                              }
                            },
                            "start": 16,
                            "end": 25,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 16
                              },
                              "end": {
                                "line": 1,
                                "column": 25
                              }
                            }
                          },
                          "start": 14,
                          "end": 25,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 14
                            },
                            "end": {
                              "line": 1,
                              "column": 25
                            }
                          }
                        }
                      ],
                      "body": {
                        "type": "BlockStatement",
                        "body": [],
                        "start": 26,
                        "end": 29,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 26
                          },
                          "end": {
                            "line": 1,
                            "column": 29
                          }
                        }
                      },
                      "async": false,
                      "generator": false,
                      "id": null,
                      "start": 13,
                      "end": 29,
                      "loc": {
                        "start": {
                          "line": 1,
                          "column": 13
                        },
                        "end": {
                          "line": 1,
                          "column": 29
                        }
                      }
                    },
                    "start": 10,
                    "end": 29,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 10
                      },
                      "end": {
                        "line": 1,
                        "column": 29
                      }
                    }
                  }
                ],
                "start": 8,
                "end": 30,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 8
                  },
                  "end": {
                    "line": 1,
                    "column": 30
                  }
                }
              },
              "start": 0,
              "end": 30,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 30
                }
              }
            }
          ],
          "start": 0,
          "end": 30,
          "loc": {
            "start": {
              "line": 1,
              "column": 0
            },
            "end": {
              "line": 1,
              "column": 30
            }
          }
        }],*/
    [
      `class x { constructor(){ super[foo]; }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
                    start: 10,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 21
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
                            optional: false,
                            shortCircuited: false,
                            object: {
                              type: 'Super',
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
                            computed: true,
                            property: {
                              type: 'Identifier',
                              name: 'foo',
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
                          start: 25,
                          end: 36,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 36
                            }
                          }
                        }
                      ],
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
                    async: false,
                    generator: false,
                    id: null,
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
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 39
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
    /**[
            `class x { foo(x=super[foo]){ }}`,
            Context.OptionsNext | Context.OptionsLoc,
            {
              "type": "Program",
              "sourceType": "script",
              "body": [
                {
                  "type": "ClassDeclaration",
                  "id": {
                    "type": "Identifier",
                    "name": "x",
                    "start": 6,
                    "end": 7,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 6
                      },
                      "end": {
                        "line": 1,
                        "column": 7
                      }
                    }
                  },
                  "superClass": null,
                  "body": {
                    "type": "ClassBody",
                    "body": [
                      {
                        "type": "MethodDefinition",
                        "kind": "method",
                        "static": false,
                        "computed": false,
                        "key": {
                          "type": "Identifier",
                          "name": "foo",
                          "start": 10,
                          "end": 13,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 10
                            },
                            "end": {
                              "line": 1,
                              "column": 13
                            }
                          }
                        },
                        "value": {
                          "type": "FunctionExpression",
                          "params": [
                            {
                              "type": "AssignmentPattern",
                              "left": {
                                "type": "Identifier",
                                "name": "x",
                                "start": 14,
                                "end": 15,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 14
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 15
                                  }
                                }
                              },
                              "right": {
                                "type": "MemberExpression",
                                "object": {
                                  "type": "Super",
                                  "start": 16,
                                  "end": 21,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 16
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 21
                                    }
                                  }
                                },
                                "computed": true,
                                "property": {
                                  "type": "Identifier",
                                  "name": "foo",
                                  "start": 22,
                                  "end": 25,
                                  "loc": {
                                    "start": {
                                      "line": 1,
                                      "column": 22
                                    },
                                    "end": {
                                      "line": 1,
                                      "column": 25
                                    }
                                  }
                                },
                                "start": 16,
                                "end": 26,
                                "loc": {
                                  "start": {
                                    "line": 1,
                                    "column": 16
                                  },
                                  "end": {
                                    "line": 1,
                                    "column": 26
                                  }
                                }
                              },
                              "start": 14,
                              "end": 26,
                              "loc": {
                                "start": {
                                  "line": 1,
                                  "column": 14
                                },
                                "end": {
                                  "line": 1,
                                  "column": 26
                                }
                              }
                            }
                          ],
                          "body": {
                            "type": "BlockStatement",
                            "body": [],
                            "start": 27,
                            "end": 30,
                            "loc": {
                              "start": {
                                "line": 1,
                                "column": 27
                              },
                              "end": {
                                "line": 1,
                                "column": 30
                              }
                            }
                          },
                          "async": false,
                          "generator": false,
                          "id": null,
                          "start": 13,
                          "end": 30,
                          "loc": {
                            "start": {
                              "line": 1,
                              "column": 13
                            },
                            "end": {
                              "line": 1,
                              "column": 30
                            }
                          }
                        },
                        "start": 10,
                        "end": 30,
                        "loc": {
                          "start": {
                            "line": 1,
                            "column": 10
                          },
                          "end": {
                            "line": 1,
                            "column": 30
                          }
                        }
                      }
                    ],
                    "start": 8,
                    "end": 31,
                    "loc": {
                      "start": {
                        "line": 1,
                        "column": 8
                      },
                      "end": {
                        "line": 1,
                        "column": 31
                      }
                    }
                  },
                  "start": 0,
                  "end": 31,
                  "loc": {
                    "start": {
                      "line": 1,
                      "column": 0
                    },
                    "end": {
                      "line": 1,
                      "column": 31
                    }
                  }
                }
              ],
              "start": 0,
              "end": 31,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 31
                }
              }
            }],*/
    [
      `class x extends y { constructor() { log(this); super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Identifier',
                              name: 'log',
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
                            arguments: [
                              {
                                type: 'ThisExpression',
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
                              }
                            ],
                            start: 36,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 45
                              }
                            }
                          },
                          start: 36,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 46
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
                              type: 'Super',
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
                            },
                            arguments: [],
                            start: 47,
                            end: 54,
                            loc: {
                              start: {
                                line: 1,
                                column: 47
                              },
                              end: {
                                line: 1,
                                column: 54
                              }
                            }
                          },
                          start: 47,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 47
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 57,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 57
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    }
                  },
                  start: 20,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 18,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
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
      `class x extends y { constructor() { super(this); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Super',
                              start: 36,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 36
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              }
                            },
                            arguments: [
                              {
                                type: 'ThisExpression',
                                start: 42,
                                end: 46,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 46
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
                        }
                      ],
                      start: 34,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  start: 20,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 50
                    }
                  }
                }
              ],
              start: 18,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 52
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
      `class x extends y { constructor() { let xx = x + x; super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
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
                                type: 'BinaryExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'x',
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
                                right: {
                                  type: 'Identifier',
                                  name: 'x',
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
                                operator: '+',
                                start: 45,
                                end: 50,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 45
                                  },
                                  end: {
                                    line: 1,
                                    column: 50
                                  }
                                }
                              },
                              id: {
                                type: 'Identifier',
                                name: 'xx',
                                start: 40,
                                end: 42,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 40
                                  },
                                  end: {
                                    line: 1,
                                    column: 42
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
                            }
                          ],
                          start: 36,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 51
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
                              type: 'Super',
                              start: 52,
                              end: 57,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 52
                                },
                                end: {
                                  line: 1,
                                  column: 57
                                }
                              }
                            },
                            arguments: [],
                            start: 52,
                            end: 59,
                            loc: {
                              start: {
                                line: 1,
                                column: 52
                              },
                              end: {
                                line: 1,
                                column: 59
                              }
                            }
                          },
                          start: 52,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 52
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 62,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 62
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 20,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 18,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 64
                }
              }
            },
            start: 0,
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 64
              }
            }
          }
        ],
        start: 0,
        end: 64,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 64
          }
        }
      }
    ],
    [
      `class x extends y { constructor() { super(); } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
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
            superClass: {
              type: 'Identifier',
              name: 'y',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            optional: false,
                            shortCircuited: false,
                            callee: {
                              type: 'Super',
                              start: 36,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 36
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              }
                            },
                            arguments: [],
                            start: 36,
                            end: 43,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 43
                              }
                            }
                          },
                          start: 36,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
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
                }
              ],
              start: 18,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 48
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
