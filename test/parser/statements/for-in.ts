import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Statements - For in (fail)', [
  ['for (var x in {}) function* g() {}', Context.Empty],
  ['for (x=>{} in y);', Context.Empty],
  ['for ([(x, y)] in {}) {}', Context.Empty],
  ['for ([{x,...x}]=x in x) ;', Context.Empty],
  ['for ([{x=y}]=x in x) ;', Context.Empty],
  ['for ([{x:a.b}]=x in x) ;', Context.Empty],
  ['for ({x=y}=x in x) ;', Context.Empty],
  ['for ({x,...x}=x in x) ;', Context.Empty],
  ['for (let x = 3 in {}) { }', Context.Empty],
  ['for (let x = 3, y in {}) { }', Context.Empty],
  ['for ({x:a.b}=x in x) ;', Context.Empty],
  ['for (a += b in x);', Context.Empty],
  ['for ({ m() {} } in {}) {}', Context.Empty],
  ['for ("abc" + b in obj);', Context.Empty],
  ['for (const [... ...foo] in obj);', Context.Empty],
  ['for (const [... ...foo] of obj);', Context.Empty],
  ['for (const [a=[...b], ...c] = obj);', Context.Empty],
  ['for (var [foo] = arr, bar in arr);', Context.Empty],
  ['for (var x, {y} in obj);', Context.Empty],
  ['for (let x = a, {y} = obj);', Context.Empty],
  ['for (var {x} = a, y in obj);', Context.Empty],
  ['for (const {x} = a, obj;;);', Context.Empty],
  ['for (const foo, [bar] = arr2);', Context.Empty],
  ['for (const [foo] = arr, bar);', Context.Empty],
  ['for (const [foo] = arr, bar = arr2);', Context.Empty],
  ['for (const {x} = a, obj;;);', Context.Empty],
  ['for (const foo, [bar] = arr2;;);', Context.Empty],
  ['for (const x, {y} = obj;;);', Context.Empty],
  ['for (const {x}, {y} in z);', Context.Empty],
  ['for (let {__proto__: 1, "__proto__": 2} in {});', Context.Empty],
  ['for (const {x:y=z}, {a:b=c} in obj);', Context.Empty],
  ['for (const {x});', Context.Empty],
  ['for (const [...[foo, bar],,] = obj;;);', Context.Empty],
  ['for (const [...[foo, bar],] = obj;;);', Context.Empty],
  ['for (const {x}, y;;);', Context.Empty],
  ['for (const {x:y=z} = obj, {a:b=c};;);', Context.Empty],
  ['for (const {x:y=z}, {a:b=c} = obj;;);', Context.Empty],
  ['for (const x = y, {z};;);', Context.Empty],
  ['for (const {x:y=z};;);', Context.Empty],
  ['for (const {x:y};;);', Context.Empty],
  ['for (let {x:y=z} = obj, {a:b=c});', Context.Empty],
  ['for (const {x:y});', Context.Empty],
  ['for (const [...[foo, bar],,] of obj);', Context.Empty],
  ['for (const {x}, y);', Context.Empty],
  ['for (const x = y, {z};;);', Context.Empty],
  ['for (const {a:=c} = z;;);', Context.Empty],
  ['for (const {x};;);', Context.Empty],
  ['for (const {x : y, z : a} = obj);', Context.Empty],
  ['for (const {x}, {y} = z);', Context.Empty],
  ['for (const {x : y, z} = obj);', Context.Empty],
  ['for ([{x=y}]=x of x) ;', Context.Empty],
  ['for ({x:a.b}=x in x) ;', Context.Empty],
  ['for ([{x:a.b}]=x in x) ;', Context.Empty],
  ['for({}/=y in y)x', Context.Empty],
  ['for({}/=y;;)x', Context.Empty],
  ['for({}/=y;;)x', Context.Empty],
  ['for({}|=y;;);', Context.Empty],
  ['for ([] = x in y);', Context.Empty],
  ['for ([] += x;;);', Context.Empty],
  ['for ([] /= x in y);', Context.Empty],
  ['async function f(){ for await ([{x=y}]=x of x) ; }', Context.Empty],
  ['for (const {x, y = z} = obj);', Context.Empty],
  ['for (const {x : y, z, a : b = c} = obj);', Context.Empty],
  ['for (const {x:y=z}, {a:b=c} = obj);', Context.Empty],
  ['for ({x:a.b}=x of x) ;', Context.Empty],
  ['for (let x, {y});;', Context.Empty],
  ['for (let x = y, {z});', Context.Empty],
  ['for (let {a:=c} in z);', Context.Empty],
  ['for (let {x:y=z});', Context.Empty],
  ['for (let [foo] = arr, [bar] of arr);', Context.Empty],
  ['for (let [...[foo, bar],,] of obj);', Context.Empty],
  ['for (let {x:y});', Context.Empty],
  ['for (let {x:y=z});', Context.Empty],
  ['for (let {x:y=z} = obj, {a:b=c};;);', Context.Empty],
  ['for (let x, {y};;);', Context.Empty],
  ['for (var x, {y};;);', Context.Empty],
  ['for (var x = y, {z};;);', Context.Empty],
  ['for (let {x:y=z} = obj, {a:b=c});', Context.Empty],
  ['for (const {a:=c} in z);', Context.Empty],
  ['for (const {x=y});', Context.Empty],
  ['for (const x = y, {z});', Context.Empty],
  ['for (const {x:y=z});', Context.Empty],
  ['for (const {x:y});', Context.Empty],
  ['for (let [... ...foo] in obj);', Context.Empty],
  ['for (/x/g + b in obj);', Context.Empty],
  ['for ({} + b in obj);', Context.Empty],
  ['for (var x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for (x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for (let x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for (let x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for ([...x = 1] in [[]]) ;', Context.Empty],
  ['for ({ yield } in [{}]) ; });', Context.Empty],
  ['for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty],
  ['for (a + b in obj);', Context.Empty],
  ['for ({ x: [x = yield] } in [{ x: [] }]) ;', Context.Strict],
  ['for ({ x = yield } in [{}]) ;', Context.Strict],
  ['for(var {x = 0} = 0 in {});', Context.OptionsDisableWebCompat],
  ['for ({ x: { x = yield } } in [{ x: {} }]) ;', Context.Strict],
  ['for ({...rest, b} in [{}]) ;', Context.Empty],
  ['for(let x = 0 in {});', Context.Empty],
  ['for ([...x,] in [[]]) ;', Context.Empty],
  ['for (const a = 0 in {});', Context.Empty],
  ['for (let a = 0 in {});', Context.Empty],
  ['for ({ m() {} } in {}) {}', Context.Empty],
  [`for (a=>b in c);`, Context.Empty],
  [`for ("foo" in y);`, Context.Empty],
  [`for ("foo".x = z in y);`, Context.Empty],
  [`for (()=>x in y);`, Context.Empty],
  [`for (()=>(x) in y);`, Context.Empty],
  ['for(([0]) in 0);', Context.Empty],
  ['for(({a: 0}) in 0);', Context.Empty],
  [`for ((()=>x) in y);`, Context.Empty],
  ['for (var a = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (const [x,y,z] = 22 in foo);', Context.Empty],
  //['for (true ? 0 : 0 in {}; false; ) ;', Context.Empty],
  ['for (x = 22 in foo);', Context.Empty],
  ['for ({a:x,b:y,c:z} = 22 in foo);', Context.Empty],
  ['for ([x,y,z] = 22 in foo);', Context.Empty],
  ['for (const x = 22 in foo);', Context.Empty],
  ['for(f() = 0 in {});', Context.Empty],
  ['for(let a = 0 in b);', Context.Empty],
  ['for(const a = 0 in b);', Context.Empty],
  ['for(({a}) in 0);', Context.Empty],
  ['for(([a]) in 0);', Context.Empty],
  ['for(var [] = 0 in b);', Context.OptionsDisableWebCompat],
  ['for(var {} = 0 in b);', Context.OptionsDisableWebCompat],
  ['for(let a = 0 in b);', Context.Empty],
  ['for(const a = 0 in b);', Context.Empty],
  ['"use strict"; for(var a = 0 in b);', Context.Empty],
  [`for ("foo".x = y in y) {}`, Context.Empty],
  [`for ({}.x = y in y) {}`, Context.Empty],
  ['for ("foo".x in y', Context.Empty],
  [`for ([].x = y in y) {}`, Context.Empty],
  ['for (a() in b) break', Context.Empty],
  ['for (const {a:x,b:y,c:z} = 22 in foo);', Context.Empty],
  [`for (0 = 0 in {});`, Context.Empty],
  [`for (i++ = 0 in {});`, Context.Empty],
  [`for (new F() = 0 in {});`, Context.Empty],
  [`for ("foo".x += z in y);`, Context.Empty],
  ['for (function () {} in a)', Context.Empty],
  ['for ([]);', Context.Empty],
  ['for (var [a] = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (var [a] = 0 in {});', Context.Strict],
  ['for (var [a] = 0 in {});', Context.Empty],
  ['for (var {a} = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (var {a} = 0 in {});', Context.Strict],
  ['for (var {a} = 0 in {});', Context.Empty],
  ['for (const {a} = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (const {a} = 0 in {});', Context.Strict],
  ['for (const {a} = 0 in {});', Context.Empty],
  ['for (let {a} = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (let {a} = 0 in {});', Context.Strict],
  ['for (let {a} = 0 in {});', Context.Empty],
  ['for(var [a = 0] = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (let in o) { }', Context.Strict],
  ['for(var [...a] = 0 in {});', Context.OptionsDisableWebCompat],
  ['for (var a = () => { return "a"} in {});', Context.Empty],
  ['for (var a = ++b in c);', Context.OptionsDisableWebCompat],
  ['for (const ...x in y){}', Context.Empty],
  ['for (...x in y){}', Context.Empty],
  ['for (let a = b => b in c; ;);', Context.Empty],
  ['for(let x = 0 in {});', Context.Empty],
  ['for(let [] = 0 in {});', Context.Empty],
  ['for(let [,] = 0 in {});', Context.Empty],
  ['for (let x = 3 in {}) { }', Context.Empty],
  ['for (let x = 3, y in {}) { }', Context.Empty],
  ['for (let x = 3, y = 4 in {}) { }', Context.Empty],
  ['for (let x, y = 4 in {}) { }', Context.Empty],
  ['for (let x, y in {}) { }', Context.Empty],
  ['for(let [a] = 0 in {});', Context.Empty],
  ['for(const {x = 0} = 0 in {});', Context.Empty],
  ['for([,] = 0 in {});', Context.Empty],
  ['for([a] = 0 in {});', Context.Empty],
  ['for (let.x in {}) {}', Context.Strict],
  ['for (let in {}) { }', Context.Strict],
  ['"use strict"; for (let.x of []) {}', Context.Strict],
  ['"use strict"; for (let.x of []) {}', Context.Empty],
  ['for await (let.x of []) {}', Context.Empty],
  ['for (let + x in y);', Context.Empty],
  ['for (let => {} in y);', Context.Empty],
  ['for (let() in y);', Context.OptionsDisableWebCompat],
  ['for (let, x in y);', Context.Empty],
  ['for await (let.x of []) {}', Context.Strict],
  ['"use strict"; for (let.x in {}) {}', Context.Empty],
  ['for([a] = 0 in {});', Context.Empty],
  ['for([a = 0] = 0 in {});', Context.Empty],
  ['for([...a] = 0 in {});', Context.Empty],
  ['for (var a = b in c);', Context.OptionsDisableWebCompat],
  ['for([...[a]] = 0 in {});', Context.Empty],
  ['for({} = 0 in {});', Context.Empty],
  ['for({p: x} = 0 in {});', Context.Empty],
  ['for({p: x = 0} = 0 in {});', Context.Empty],
  ['for({x} = 0 in {});', Context.Empty],
  ['for({x = 0} = 0 in {});', Context.Empty],
  ['for(f() = 0 in {});', Context.Empty],
  ['for(let [a = 0] = 0 in {});', Context.Empty],
  ['for(let [...a] = 0 in {});', Context.Empty],
  ['for(let [...[]] = 0 in {});', Context.Empty],
  ['for(let [...[a]] = 0 in {});', Context.Empty],
  ['for(let {} = 0 in {});', Context.Empty],
  ['for(let {p: x} = 0 in {});', Context.Empty],
  ['for(let {p: x = 0} = 0 in {});', Context.Empty],
  ['for(let {x} = 0 in {});', Context.Empty],
  ['for(let {x = 0} = 0 in {});', Context.Empty],
  ['for(const x = 0 in {});', Context.Empty],
  ['for(const [] = 0 in {});', Context.Empty],
  ['for(const [,] = 0 in {});', Context.Empty],
  ['for(const [a] = 0 in {});', Context.Empty],
  ['for ({ x: [(x, y)] } in [{ x: [] }]) ;', Context.Empty],
  ['for(let ? b : c in 0);', Context.Empty],
  ['for (var i, j = void 0 in [1, 2, 3]) {}', Context.Empty],
  ['function foo() { for (var i, j of {}) {} }', Context.Empty],
  ['"use strict"; for ([ x = yield ] in [[]]) ;', Context.OptionsDisableWebCompat],
  ['for ([[(x, y)]] in [[[]]]) ;', Context.Empty],
  ['"use strict"; for ([[x[yield]]] in [[[]]]) ;', Context.OptionsDisableWebCompat],
  ['"use strict"; for ([{ x = yield }] in [[{}]]) ;', Context.OptionsDisableWebCompat],
  ['for ([...x,] in [[]]) ;', Context.Empty],
  ['for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty],
  ['for ([...{ get x() {} }] in [[[]]]) ;', Context.Empty],
  ['"use strict"; for ({ x = yield } in [{}]) ;', Context.Empty],
  ['for (let x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for (x in {}) label1: label2: function f() {}', Context.OptionsDisableWebCompat],
  ['for (var a = 0 in stored = a, {});', Context.OptionsDisableWebCompat],
  ['for (var a = (++effects, -1) in x);', Context.OptionsDisableWebCompat],
  ['for (var [a] = 0 in {});', Context.OptionsDisableWebCompat],
  ['"use strict"; for (var i=0 in j);', Context.Empty],
  ['for (var {x}=0 in y);', Context.OptionsDisableWebCompat],
  ['"use strict"; for (var {x}=0 in y);', Context.Empty],
  ['or (var [p]=0 in q);', Context.Empty],
  ['"use strict"; for (var [p]=1 in q);', Context.Empty],
  ['for (const x = 0 in {});', Context.Empty],
  ['for (let x = 0 in {});', Context.Empty],
  ['for ((a--) in c);', Context.Empty],
  ['for (this in {}; ;);', Context.Empty],
  ['for (this in {});', Context.Empty],
  ['for (x = y in z) ;', Context.Empty],
  ['for (function(){} in x);', Context.Empty],
  ['for ((x = y) in z) ;', Context.Empty],
  ['for ([x + y] in obj);', Context.Empty],
  ['for ([x] = z in obj);', Context.Empty],
  ['for ([x.y] = z in obj);', Context.Empty],
  ['for ([x + y] = z in obj);', Context.Empty],
  ['for ({a: x + y} in obj);', Context.Empty],
  ['for ({x} = z in obj);', Context.Empty],
  ['for ({a: x + y} = z in obj);', Context.Empty],
  ['for (let [let] in obj);', Context.OptionsDisableWebCompat],
  ['for ("foo".bar = x in obj);', Context.Empty],
  ['for ({}.bar = x in obj);', Context.Empty],
  ['for ([].bar = x in obj);', Context.Empty],
  ['for ([]=1 in x);', Context.Empty],
  ['for (a in b) let [x]', Context.OptionsDisableWebCompat],
  ['for (a in b) let x', Context.OptionsDisableWebCompat],
  ['for (let in x)', Context.Strict],
  ['for (let.x in y);', Context.Strict],
  ['for (let() of y);', Context.Strict],
  ['for (let + of y);', Context.OptionsDisableWebCompat],
  ['for (let[x];;);', Context.OptionsDisableWebCompat],
  ['for (let of y);', Context.OptionsDisableWebCompat],
  ['for (let() of y);', Context.OptionsDisableWebCompat],
  ['for (/foo/ in {});', Context.OptionsDisableWebCompat],
  ['for ((a++) in c);', Context.OptionsDisableWebCompat],
  ['for ({a: x.y} = z in obj);', Context.Empty],
  ['for (let [let] in obj);', Context.OptionsDisableWebCompat],
  ['for ("foo".bar = x in obj);', Context.Empty],
  ['for ({}.bar = x in obj);', Context.Empty],
  ['for ([].bar = x in obj);', Context.Empty],
  ['for ([]=1 in x);', Context.Empty],
  ['for (a in b) let [x]', Context.OptionsDisableWebCompat],
  ['for (a in b) let x', Context.OptionsDisableWebCompat],
  ['for (let in x)', Context.Strict],
  ['for (let.x in y);', Context.Strict],
  ['for (let() of y);', Context.Strict],
  ['for (let + of y);', Context.OptionsDisableWebCompat],
  ['for (let[x];;);', Context.OptionsDisableWebCompat],
  ['for (let of y);', Context.OptionsDisableWebCompat],
  ['for (let() of y);', Context.OptionsDisableWebCompat],
  ['for (/foo/ in {});', Context.OptionsDisableWebCompat],
  ['for ((a++) in c);', Context.OptionsDisableWebCompat],
  ['for ({p: x = 0} = 0 in {});', Context.Empty],
  ['for ([...[a]] = 0 in {});', Context.Empty],
  ['for (x+b in y);', Context.Empty],
  ['for (b++ in y);', Context.Empty],
  ['for ([...x,] in [[]]);', Context.Empty],
  ['for (x = 0 in {});', Context.Empty],
  ['for(o[0] = 0 in {});', Context.Empty],
  ['for ((a++) in c);', Context.Empty],
  ['for (+a().b in c);', Context.Empty],
  ['for (void a.b in c);', Context.Empty],
  ['for (/foo/ in {});', Context.Empty],
  [`for ("foo".x = z in y);`, Context.Empty],
  [`for ("foo" in y);`, Context.Empty],
  ['for ([...[a]] = 0 in   {});', Context.Empty],
  ['for ([] = 0 in {});', Context.Empty],
  ['for ([...[a]] = 0 in {});', Context.Empty],
  ['for ({x} = 0 in {});', Context.Empty],
  ['for ({p: x = 0} = 0 in {});', Context.Empty],
  ['for ([] = 0 of {});', Context.Empty],
  ['for ({x} = 0 of {});', Context.Empty],
  ['for([0] in 0);', Context.Empty],
  ['for({a: 0} in 0);', Context.Empty],
  [`for ({}.x);`, Context.Empty],
  ['for(const let in 0);', Context.Empty],
  ['for(let let of 0);', Context.Empty],
  ['for (new.target in x) ;', Context.Empty],
  ['for((0) of 0);', Context.Empty],
  ['for((0) in 0);', Context.Empty],
  ['for(([0]) in 0);', Context.Empty],
  ['for(({a: 0}) in 0);', Context.Empty],
  ['for(0 in 0);', Context.Empty],
  ['for (new x in x) ;', Context.Empty],
  ['for ({a: [..."b"]} in d)  {}', Context.Empty]
]);

pass('Statements - For in (pass)', [
  [
    `for (let [a=[...b], ...c] in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      right: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'SpreadElement',
                            argument: {
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
                          }
                        ],
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
                      start: 10,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'c',
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
                    }
                  ],
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
              }
            ],
            start: 5,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (let [x, ...[foo, bar]] in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x',
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
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'ArrayPattern',
                        elements: [
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
                          },
                          {
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
                          }
                        ],
                        start: 16,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      },
                      start: 13,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    }
                  ],
                  start: 9,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                },
                start: 9,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              }
            ],
            start: 5,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (let [a=[...b], ...c] of obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      right: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'SpreadElement',
                            argument: {
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
                          }
                        ],
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
                      start: 10,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'c',
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
                    }
                  ],
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
              }
            ],
            start: 5,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 25
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
          await: false,
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
    `for (let {a} in {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                      value: {
                        type: 'Identifier',
                        name: 'a',
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
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
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
          right: {
            type: 'ObjectExpression',
            properties: [],
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
    `for ({}[b] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',
            object: {
              type: 'ObjectExpression',
              properties: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: true,
            property: {
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
          right: {
            type: 'Identifier',
            name: 'c',
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
    `for (var interface in y);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'interface',
                  start: 9,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                start: 9,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              }
            ],
            start: 5,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `for (a[b] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          },
          right: {
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
    `for (let[x] in y);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
              }
            ],
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
          right: {
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
    `for (let[x] of y);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
              }
            ],
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
          right: {
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
          await: false,
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
    `for (let;;);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'EmptyStatement',
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
          init: {
            type: 'Identifier',
            name: 'let',
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
          },
          test: null,
          update: null,
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
    `for (let.x in y);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Identifier',
              name: 'let',
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
            },
            computed: false,
            property: {
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
          right: {
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
    `for (let();;);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'EmptyStatement',
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
          init: {
            type: 'CallExpression',

            callee: {
              type: 'Identifier',
              name: 'let',
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
            },
            arguments: [],
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
          test: null,
          update: null,
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
    `for (let a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
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
    `for (let a in c);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
            type: 'Identifier',
            name: 'c',
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
    `for (var a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
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
    `for (let a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
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
    `for (let in x) y`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
            type: 'Identifier',
            name: 'let',
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
          },
          right: {
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
    `for ({a: b.c} in d) e`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'e',
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
          },
          left: {
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
                  type: 'MemberExpression',

                  object: {
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
                  computed: false,
                  property: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'd',
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
    `for ((a in b).x in {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'BinaryExpression',
              left: {
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
            computed: false,
            property: {
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
            start: 5,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 15
              }
            }
          },
          right: {
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
    `for (let().foo in x);`,
    Context.OptionsLoc,
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
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'let',
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
              },
              arguments: [],

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
            computed: false,
            property: {
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
    `for (let in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'Identifier',
            name: 'let',
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
          },
          right: {
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
    `for (function(){ }[foo] in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'FunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: null,
              start: 5,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            computed: true,
            property: {
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
            },
            start: 5,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          right: {
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
    `for (((x)=>{}).x in y);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
              start: 6,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            computed: false,
            property: {
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
          right: {
            type: 'Identifier',
            name: 'y',
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
    `for (456[x] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: 456,
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
            },
            computed: true,
            property: {
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
          right: {
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
    `for (yield in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'Identifier',
            name: 'yield',
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
    `for ({}.b in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ObjectExpression',
              properties: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
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
            start: 7,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          right: {
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
    `for ({ eval = 0 } in [{}]) ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'eval',
                  start: 7,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                value: {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'eval',
                    start: 7,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  right: {
                    type: 'Literal',
                    value: 0,
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
                  start: 7,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
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
                start: 7,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
            start: 5,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          right: {
            type: 'ArrayExpression',
            elements: [
              {
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
    `for ([x] in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
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
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for ({x: a.b} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'Property',
                key: {
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
                value: {
                  type: 'MemberExpression',

                  object: {
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
                  computed: false,
                  property: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (let = 1; let < 1; let++) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
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
          init: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'let',
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
            },
            operator: '=',
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
          test: {
            type: 'BinaryExpression',
            left: {
              type: 'Identifier',
              name: 'let',
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
            right: {
              type: 'Literal',
              value: 1,
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
            operator: '<',
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
          },
          update: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'let',
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
            operator: '++',
            prefix: false,
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
    `for (let in {}) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'BlockStatement',
            body: [],
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
          left: {
            type: 'Identifier',
            name: 'let',
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
          },
          right: {
            type: 'ObjectExpression',
            properties: [],
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
    `for (var let = 1; let < 1; let++) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
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
          init: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1,
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
                  type: 'Identifier',
                  name: 'let',
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
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              }
            ],
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
          test: {
            type: 'BinaryExpression',
            left: {
              type: 'Identifier',
              name: 'let',
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
            right: {
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
            operator: '<',
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
          },
          update: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'let',
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
            operator: '++',
            prefix: false,
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
    `for (var [let] in {}) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'let',
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
                },
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
            type: 'ObjectExpression',
            properties: [],
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
    `for ([].x in y) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'BlockStatement',
            body: [],
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrayExpression',
              elements: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
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
            },
            start: 7,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          right: {
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
    `for ({}.x in y) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'BlockStatement',
            body: [],
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ObjectExpression',
              properties: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
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
            },
            start: 7,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          right: {
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
    `for (let j in x) { let foo; [[foo]=[42]] = [] }`,
    Context.OptionsLoc,
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
                type: 'VariableDeclaration',
                kind: 'let',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
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
                start: 19,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 27
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
                        type: 'AssignmentPattern',
                        left: {
                          type: 'ArrayPattern',
                          elements: [
                            {
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
                            }
                          ],
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
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'Literal',
                              value: 42,
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
                            }
                          ],
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
                        },
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
                    start: 28,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
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
                  start: 28,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                },
                start: 28,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 45
                  }
                }
              }
            ],
            start: 17,
            end: 47,
            loc: {
              start: {
                line: 1,
                column: 17
              },
              end: {
                line: 1,
                column: 47
              }
            }
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'j',
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
  ],
  [
    `for(const a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'a',
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
          right: {
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
    `for ((let.x) of []) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Identifier',
              name: 'let',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'x',
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
          right: {
            type: 'ArrayExpression',
            elements: [],
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
          await: false,
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
    `for (let a = (b && c in d); ;);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'EmptyStatement',
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
          init: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'LogicalExpression',
                  left: {
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
                  right: {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'd',
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
                  operator: '&&',
                  start: 14,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
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
                start: 9,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              }
            ],
            start: 5,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 26
              }
            }
          },
          test: null,
          update: null,
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
    `for (/foo/g[x] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: /foo/g,
              regex: {
                pattern: 'foo',
                flags: 'g'
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
            computed: true,
            property: {
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
    `for (456..x in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: 456,
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
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'x',
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
          right: {
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
    `for (/foo/[x] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: /foo/,
              regex: {
                pattern: 'foo',
                flags: ''
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
            },
            computed: true,
            property: {
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
          right: {
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
    `for (/foo/.x in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: /foo/,
              regex: {
                pattern: 'foo',
                flags: ''
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
            },
            computed: false,
            property: {
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
          right: {
            type: 'Identifier',
            name: 'c',
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
    `for ("foo"[x] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: 'foo',
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
            computed: true,
            property: {
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
          right: {
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
    `for ([][y] <<= p;;) x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          init: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',

              object: {
                type: 'ArrayExpression',
                elements: [],
                start: 5,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              computed: true,
              property: {
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
            operator: '<<=',
            right: {
              type: 'Identifier',
              name: 'p',
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
          test: null,
          update: null,
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
    `for(function(){if(x in 3);};;)x`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          init: {
            type: 'FunctionExpression',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'IfStatement',
                  test: {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 3,
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
                    operator: 'in',
                    start: 18,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  },
                  consequent: {
                    type: 'EmptyStatement',
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
                  alternate: null,
                  start: 15,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 26
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
            id: null,
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
          test: null,
          update: null,
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
    `for ([][y] <<= p;;) x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          init: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',

              object: {
                type: 'ArrayExpression',
                elements: [],
                start: 5,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              computed: true,
              property: {
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
            operator: '<<=',
            right: {
              type: 'Identifier',
              name: 'p',
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
          test: null,
          update: null,
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
    `for ({}.u |= c;;) x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          init: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',

              object: {
                type: 'ObjectExpression',
                properties: [],
                start: 5,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'u',
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
              start: 7,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            operator: '|=',
            right: {
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
          test: null,
          update: null,
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
    `for (function(){ }[foo] in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'FunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: null,
              start: 5,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            computed: true,
            property: {
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
            },
            start: 5,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          right: {
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
    `for (function(){ }[x in y] in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'FunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: null,
              start: 5,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 5
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
              right: {
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
            start: 5,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 26
              }
            }
          },
          right: {
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
    `for (function(){ if (a in b); }.prop in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'FunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
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
                      operator: 'in',
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
                    },
                    consequent: {
                      type: 'EmptyStatement',
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
                    alternate: null,
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
              id: null,
              start: 5,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'prop',
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
            start: 5,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 5
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
    `for ({x: a.b} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'Property',
                key: {
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
                value: {
                  type: 'MemberExpression',

                  object: {
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
                  computed: false,
                  property: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var {[x]: y} of obj);`,
    Context.Empty,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'EmptyStatement'
          },
          left: {
            type: 'VariableDeclaration',
            kind: 2,
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x'
                      },
                      value: {
                        type: 'Identifier',
                        name: 'y'
                      },
                      kind: 'init',
                      computed: true,
                      method: false,
                      shorthand: false
                    }
                  ]
                }
              }
            ]
          },
          right: {
            type: 'Identifier',
            name: 'obj'
          },
          await: false
        }
      ]
    }
  ],
  [
    `for (var [,] in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [null],
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
    `for (var [foo] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                },
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
            name: 'arr',
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
    `for (var [foo=a] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
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
                    }
                  ],
                  start: 9,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                },
                start: 9,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'arr',
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
    `for (var [foo=a, bar] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
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
                  start: 9,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                start: 9,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 5,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 21
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
    `for (var [foo, bar=b] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                  start: 9,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                start: 9,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 5,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 21
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
    `for (var [...foo] in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
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
                },
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
            start: 5,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var {} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [],
                  start: 9,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                start: 9,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var {x,} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
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
                      value: {
                        type: 'Identifier',
                        name: 'x',
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
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var {x} in obj);`,
    Context.OptionsLoc,
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
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
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
                      value: {
                        type: 'Identifier',
                        name: 'x',
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
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
    `for (a in b); for (a in b); for (a in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
            type: 'Identifier',
            name: 'b',
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
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
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
          right: {
            type: 'Identifier',
            name: 'b',
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
          start: 28,
          end: 41,
          loc: {
            start: {
              line: 1,
              column: 28
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
    `for ([a,b] in x) a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
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
              },
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
    `for ([a,b] of x) a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
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
              },
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
          await: false,
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
    `for ({a,b} in x) a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
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
              {
                type: 'Property',
                key: {
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
                value: {
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
              }
            ],
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
    `for ({a = b} in x) a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
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
                  type: 'AssignmentPattern',
                  left: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
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
              }
            ],
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
    `for (const {j} in x) { function foo() {return j} }`,
    Context.OptionsLoc,
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
                type: 'FunctionDeclaration',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'Identifier',
                        name: 'j',
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
                      start: 39,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    }
                  ],
                  start: 38,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 38
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                },
                async: false,
                generator: false,
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
              }
            ],
            start: 21,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 21
              },
              end: {
                line: 1,
                column: 50
              }
            }
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'j',
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
                        type: 'Identifier',
                        name: 'j',
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
                      computed: false,
                      method: false,
                      shorthand: true,
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
              }
            ],
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
    `for (const j in x) { let [foo] = [j] }`,
    Context.OptionsLoc,
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
                type: 'VariableDeclaration',
                kind: 'let',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'j',
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
                        }
                      ],
                      start: 33,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
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
                          name: 'foo',
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
                        }
                      ],
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
                start: 21,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 21
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              }
            ],
            start: 19,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 19
              },
              end: {
                line: 1,
                column: 38
              }
            }
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'j',
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
  [
    `for ([arguments] in [[]]) ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
                type: 'Identifier',
                name: 'arguments',
                start: 6,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
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
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'ArrayExpression',
                elements: [],
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
              }
            ],
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
    `for (let x in null, { key: 0 }) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'Literal',
                value: null,
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
              {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'key',
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
                    value: {
                      type: 'Literal',
                      value: 0,
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
                start: 20,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 20
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              }
            ],
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
    `for(let [a=b in c] in null);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'BinaryExpression',
                        left: {
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
                        right: {
                          type: 'Identifier',
                          name: 'c',
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
                        operator: 'in',
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
          },
          right: {
            type: 'Literal',
            value: null,
            start: 22,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 26
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
    `for ("foo".bar in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: 'foo',
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
            computed: false,
            property: {
              type: 'Identifier',
              name: 'bar',
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
            name: 'obj',
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
    `for ({}.bar in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ObjectExpression',
              properties: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'bar',
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
            start: 7,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for ([].bar in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrayExpression',
              elements: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'bar',
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
            start: 7,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 11
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var {x : y} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    }
                  ],
                  start: 9,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                },
                start: 9,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for(var x=1 in [1,2,3]) 0`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Literal',
              value: 0,
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
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 1,
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
                id: {
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
                },
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
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Literal',
                value: 1,
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
              {
                type: 'Literal',
                value: 2,
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
              {
                type: 'Literal',
                value: 3,
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
    `for (var [foo, bar=b] of arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                  start: 9,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                start: 9,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 5,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 21
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
          await: false,
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
    `for (function* y() { new.target in /(?:()|[]|(?!))/iuy };; (null))  {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      start: 0,
      end: 70,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 70
        }
      },
      body: [
        {
          type: 'ForStatement',
          start: 0,
          end: 70,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 70
            }
          },
          init: {
            type: 'FunctionExpression',
            start: 5,
            end: 56,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 56
              }
            },
            id: {
              type: 'Identifier',
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
              },
              name: 'y'
            },
            generator: true,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 19,
              end: 56,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 56
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 21,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  },
                  expression: {
                    type: 'BinaryExpression',
                    start: 21,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    },
                    left: {
                      type: 'MetaProperty',
                      start: 21,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      },
                      meta: {
                        type: 'Identifier',
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
                        },
                        name: 'new'
                      },
                      property: {
                        type: 'Identifier',
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
                        },
                        name: 'target'
                      }
                    },
                    operator: 'in',
                    right: {
                      type: 'Literal',
                      start: 35,
                      end: 54,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 54
                        }
                      },
                      value: /(?:()|[]|(?!))/iuy,
                      regex: {
                        pattern: '(?:()|[]|(?!))',
                        flags: 'iuy'
                      }
                    }
                  }
                }
              ]
            }
          },
          test: null,
          update: {
            type: 'Literal',
            start: 60,
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 60
              },
              end: {
                line: 1,
                column: 64
              }
            },
            value: null
          },
          body: {
            type: 'BlockStatement',
            start: 68,
            end: 70,
            loc: {
              start: {
                line: 1,
                column: 68
              },
              end: {
                line: 1,
                column: 70
              }
            },
            body: []
          }
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    `for (a()[b] in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'CallExpression',

              callee: {
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
              arguments: [],
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
            },
            computed: true,
            property: {
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
          right: {
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
    `for (yield in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'Identifier',
            name: 'yield',
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
    `for (async in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'Identifier',
            name: 'async',
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
    `for (true.x in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: true,
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
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'x',
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
          right: {
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
    `for (function(){ a in b; }.prop in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'FunctionExpression',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'BinaryExpression',
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
                      operator: 'in',
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
                start: 15,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              async: false,
              generator: false,
              id: null,
              start: 5,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            computed: false,
            property: {
              type: 'Identifier',
              name: 'prop',
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
            start: 5,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          right: {
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
  [
    `for (/foo/g.x in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: /foo/g,
              regex: {
                pattern: 'foo',
                flags: 'g'
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
            computed: false,
            property: {
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
          right: {
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
    `for ([].b in c) d;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrayExpression',
              elements: [],
              start: 5,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 7
                }
              }
            },
            computed: false,
            property: {
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
            start: 7,
            end: 9,
            loc: {
              start: {
                line: 1,
                column: 7
              },
              end: {
                line: 1,
                column: 9
              }
            }
          },
          right: {
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
    `for (var {x = y} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
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
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x',
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
                        right: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
                  start: 9,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                },
                start: 9,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for (var [] in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [],
                  start: 9,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                },
                start: 9,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              }
            ],
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
          right: {
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
    `for (let.x in {}) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Identifier',
              name: 'let',
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
            },
            computed: false,
            property: {
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
          right: {
            type: 'ObjectExpression',
            properties: [],
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
    `for (var [foo,,] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    null
                  ],
                  start: 9,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                },
                start: 9,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'arr',
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
    `for (var [foo, bar=b] in arr);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
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
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                  start: 9,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                start: 9,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 5,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 21
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
    `for (var {x, y} in obj);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
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
                      value: {
                        type: 'Identifier',
                        name: 'x',
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
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    {
                      type: 'Property',
                      key: {
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
            start: 5,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 15
              }
            }
          },
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for ({a,b} of x) a;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForOfStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
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
          left: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
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
              {
                type: 'Property',
                key: {
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
                value: {
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
              }
            ],
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
          await: false,
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
    `for (const [...x] in y){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'RestElement',
                      argument: {
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
            start: 5,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 17
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
    `for (const {...x} in y){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'RestElement',
                      argument: {
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
            start: 5,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 17
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
    `for (a in b=c);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
            type: 'AssignmentExpression',
            left: {
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
            operator: '=',
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
    `for (var a = 0 in stored = a, {});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: 0,
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
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'stored',
                  start: 18,
                  end: 24,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 24
                    }
                  }
                },
                operator: '=',
                right: {
                  type: 'Identifier',
                  name: 'a',
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
              },
              {
                type: 'ObjectExpression',
                properties: [],
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
    `for (var a = (++effects, -1) in x);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'UpdateExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'effects',
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
                      operator: '++',
                      prefix: true,
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
                    {
                      type: 'UnaryExpression',
                      operator: '-',
                      argument: {
                        type: 'Literal',
                        value: 1,
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
                      prefix: true,
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
                start: 9,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              }
            ],
            start: 5,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 28
              }
            }
          },
          right: {
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
    `for (var a in stored = a, {a: 0, b: 1, c: 2});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
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
          right: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'stored',
                  start: 14,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                operator: '=',
                right: {
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
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                      name: 'b',
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
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'c',
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
                    value: {
                      type: 'Literal',
                      value: 2,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 39,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 39
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  }
                ],
                start: 26,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              }
            ],
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
    `for ([a.b] in c) d`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
                type: 'MemberExpression',

                object: {
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
                computed: false,
                property: {
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
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'c',
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
    `for ([a.b].foo in c) d`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'd',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'MemberExpression',

                  object: {
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
                  computed: false,
                  property: {
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
                }
              ],
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
            computed: false,
            property: {
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
    `for ({a: b.c} in d) e`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'e',
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
          },
          left: {
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
                  type: 'MemberExpression',

                  object: {
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
                  computed: false,
                  property: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
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
          right: {
            type: 'Identifier',
            name: 'd',
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
    `for ({a: b.c}.foo in d) e`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'e',
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
          },
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ObjectExpression',
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
                    type: 'MemberExpression',

                    object: {
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
                    computed: false,
                    property: {
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
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
                }
              ],
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
            computed: false,
            property: {
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
          right: {
            type: 'Identifier',
            name: 'd',
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
    `for(let {a} in []) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
          right: {
            type: 'ArrayExpression',
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
    `for({a: a} in []){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
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
                shorthand: false,
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
          right: {
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
    `for({"a": a} in []){}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Literal',
                  value: 'a',
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
                },
                value: {
                  type: 'Identifier',
                  name: 'a',
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
          right: {
            type: 'ArrayExpression',
            elements: [],
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
    `for({a=0} in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
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
                    value: 0,
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
                },
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
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
          right: {
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
    `for ({j} in x) { var [foo] = [j] }`,
    Context.OptionsLoc,
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
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'j',
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
                    id: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'foo',
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
                        }
                      ],
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
              }
            ],
            start: 15,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 1,
                column: 34
              }
            }
          },
          left: {
            type: 'ObjectPattern',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'j',
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
                  name: 'j',
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: true,
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
          },
          right: {
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
    `for ([arguments] in [[]]) ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
                type: 'Identifier',
                name: 'arguments',
                start: 6,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              }
            ],
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
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'ArrayExpression',
                elements: [],
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
              }
            ],
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
    `for(let [a=b in c] in null);`,
    Context.OptionsLoc,
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
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
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
            },
            declarations: [
              {
                type: 'VariableDeclarator',
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
                },
                id: {
                  type: 'ArrayPattern',
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
                  },
                  elements: [
                    {
                      type: 'AssignmentPattern',
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
                      },
                      left: {
                        type: 'Identifier',
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
                        },
                        name: 'a'
                      },
                      right: {
                        type: 'BinaryExpression',
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
                        },
                        left: {
                          type: 'Identifier',
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
                          },
                          name: 'b'
                        },
                        operator: 'in',
                        right: {
                          type: 'Identifier',
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
                          name: 'c'
                        }
                      }
                    }
                  ]
                },
                init: null
              }
            ],
            kind: 'let'
          },
          right: {
            type: 'Literal',
            start: 22,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 26
              }
            },
            value: null
          },
          body: {
            type: 'EmptyStatement',
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
        }
      ],
      sourceType: 'script'
    }
  ],
  [
    `for([{a=0}] in b);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
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
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Literal',
                        value: 0,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  }
                ],
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
          right: {
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
    `for(var a in b, c);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
          right: {
            type: 'SequenceExpression',
            expressions: [
              {
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
              {
                type: 'Identifier',
                name: 'c',
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
    `for ([...{ x = yield }] in [[{}]]) ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
                type: 'RestElement',
                argument: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                  start: 9,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                },
                start: 6,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              }
            ],
            start: 5,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'ObjectExpression',
                    properties: [],
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
                  }
                ],
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
              }
            ],
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
    `for ( [let][1] in obj ) ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'EmptyStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'ArrayExpression',
              elements: [
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
                }
              ],
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
            computed: true,
            property: {
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
          right: {
            type: 'Identifier',
            name: 'obj',
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
    `for ((x) in { attr: null }) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
          body: {
            type: 'BlockStatement',
            body: [],
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
          left: {
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
          right: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'attr',
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
                value: {
                  type: 'Literal',
                  value: null,
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
            start: 12,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 12
              },
              end: {
                line: 1,
                column: 26
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
    `for ([...x] in {ab: a}) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'ArrayPattern',
            elements: [
              {
                type: 'RestElement',
                argument: {
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
          right: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'ab',
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
    `for (x in {a: b}) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
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
          right: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                key: {
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
                value: {
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
    `function foo(){ "use strict"; for(x in {}, {}) {} }`,
    Context.OptionsLoc,
    {
      type: 'Program',
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
      },
      body: [
        {
          type: 'FunctionDeclaration',
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
          },
          id: {
            type: 'Identifier',
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
            },
            name: 'foo'
          },
          generator: false,
          async: false,
          params: [],
          body: {
            type: 'BlockStatement',
            start: 14,
            end: 51,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 51
              }
            },
            body: [
              {
                type: 'ExpressionStatement',
                start: 16,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                },
                expression: {
                  type: 'Literal',
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
                  },
                  value: 'use strict'
                }
              },
              {
                type: 'ForInStatement',
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
                },
                left: {
                  type: 'Identifier',
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
                  },
                  name: 'x'
                },
                right: {
                  type: 'SequenceExpression',
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
                  },
                  expressions: [
                    {
                      type: 'ObjectExpression',
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
                      },
                      properties: []
                    },
                    {
                      type: 'ObjectExpression',
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
                      },
                      properties: []
                    }
                  ]
                },
                body: {
                  type: 'BlockStatement',
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
                  },
                  body: []
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
    `for(const x in [1,2,3]) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'VariableDeclaration',
            kind: 'const',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'x',
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
          right: {
            type: 'ArrayExpression',
            elements: [
              {
                type: 'Literal',
                value: 1,
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
              {
                type: 'Literal',
                value: 2,
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
              {
                type: 'Literal',
                value: 3,
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
    `for (var a = b, c, d, b = a ; x in b ; ) { break }`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForStatement',
          body: {
            type: 'BlockStatement',
            body: [
              {
                type: 'BreakStatement',
                label: null,
                start: 43,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                }
              }
            ],
            start: 41,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 41
              },
              end: {
                line: 1,
                column: 50
              }
            }
          },
          init: {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
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
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'c',
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
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'd',
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
              },
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'a',
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
                id: {
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
              }
            ],
            start: 5,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 5
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          test: {
            type: 'BinaryExpression',
            left: {
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
            right: {
              type: 'Identifier',
              name: 'b',
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
          },
          update: null,
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
    `for ("foo".x in y) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
            type: 'MemberExpression',

            object: {
              type: 'Literal',
              value: 'foo',
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
            computed: false,
            property: {
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
          right: {
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
    `for (a[b in c] in d);`,
    Context.OptionsLoc,
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
            name: 'd',
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
    `for (let j in x) { foo = j }`,
    Context.OptionsLoc,
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
                  type: 'AssignmentExpression',
                  left: {
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
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'j',
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
                },
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
          },
          left: {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'j',
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
    `for (x in y) {}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ForInStatement',
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
          left: {
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
          right: {
            type: 'Identifier',
            name: 'y',
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
]);
