import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Next - Optional chaining', () => {
  for (const arg of [
    'a = { x = flag?.[] = true } = value;',
    'a?.fn`hello`;',
    '({x: [y]?.a = 0} = 1)',
    '[a, x?.z] = f(() => { [a, b.c] = [d.e, (f.g) = h]; }); ',
    '([a, b] = f?.x(() => { [a, b?.c] = [d.e, (f.g) = h]; }));',
    '[a, ...b?.a] = [1, 2, ...c];',
    '({..."x"?.x} = x);',
    '([x.y = a] = ([x.y = a?.y] = ([x.y?.y = a] = z)))',
    '([...[]?.x] = x);',
    '({...[][x?.y]} = (x?.i) = (y));',
    '({0: y?.a} = 0)',
    'obj?.0',
    'obj?.foo = 0',
    'obj?.foo.bar = 0',
    'obj?.().foo = 0',
    'obj?.foo++',
    'obj?.foo--',
    '++obj?.foo',
    'obj?.foo.bar++',
    'for (obj?.foo in {});',
    'for (obj?.foo.bar in {});',
    'for (obj?.foo of []);',
    'for (obj?.foo.bar of []);',
    'async .?() => {}',
    '({0: x?.a, 1: x} = 0)',
    '({a:let?.foo} = 0);',
    'x?.[y] = foo',
    'a.?',
    'a.[]',
    'a?.a[]',
    'async?.(bar: string) => {}',
    'a?.[]',
    '0, [{ set y(val) {}}?.y] = [23];',
    '0, { x: y?.z = 42 } = { x: 23 };',
    '0, { x: y?.z = 42 } = { x: 23 };',
    '0, { x: y?.z } = { x: 23 };',
    '0, { x: { set y(val) { }}?.y = 42} = {x: 42};',
    '0, { x: { set y(val) {}}?.y} = {x: 42};',
    'for ([x?.y = 42] in [[23]]) ;',
    'for ([x?.y = 42] in [[23]]) ;',
    'for ([x?.y] in [[23]]) ;',
    'for ([x?.y] in [[23]]) ;',
    'for ([{ set y(val) {}}?.y = 42] in [[23]]) ;',
    'for ([{ set y(val) {}}?.y] in [[23]]) ;',
    'for ({ x: y?.z = 42 } in [{ x: 23 }]) ;',
    'for ({ x: y?.z } in [{ x: 23 }]) ;',
    'new obj?.()',
    'new obj?.foo()',
    'obj?.foo\n`template`',
    'async .?() => {}',
    'a.?2.3',
    'a.? (?) [?]',
    '{a: 44}?.a',
    'a?.b++;',
    '--a?.b;',
    'a:?.b',
    'a:?[b]',
    '?. ?[] ?() ?:',
    'var b = condition ? a?.x.?y : a?.y?.z;',
    'class a extends b { c() { [super?.d] = e } }',
    '[x?.?.y = 1]',
    'a?.?.',
    'a?.?.b',
    'a ? .5;',
    'for ({ x: { set y(val) { }}?.y = 42} in [{x: 42}]) ;',
    'for ({ x: { set y(val) {} }?.y} in [{x: 42}]) ;',
    'for ([x?.y = 42] of [[23]]) ;',
    'for ([x?.y] of [[23]]) ;',
    'for ([{ set y(val) {}}?.y = 42] of [[23]]) ;',
    'for ([{ set y(val) { }}?.y] of [[23]]) ;',
    'for ({ x: y?.z = 42 } of [{ x: 23 }]) ;',
    'for ({ x: y?.z } of [{ x: 23 }]) ;',
    'for ({ x: {set y(val) { }}?.y = 42} of [{x: 42}]) ;',
    'for ({ x: { set y(val) {}}?.y} of [{x: 42}]) ;',
    '0, [x?.y] = [23];',
    '0, [x?.y = 42] = [23];',
    '0, { x: { set y(val) {}}?.y} = {x: 42};',
    '0, [{ set y(val) {}}?.y] = [23];',
    'async?.(async?.(), async?.[])',
    'yield?.await = foo',
    'async?.await = foo',
    'async?.[x] = foo',
    'async?.() = foo',
    'a.?2.3',
    'a.?.2',
    'a.?2.n',
    'a.?2.3',
    'class C {} class D extends C { foo() { return super?.["bar"]; } }',
    'const o = { C: class {} }; new o?.C();',
    'const o = { C: class {} }; new o?.["C"]();',
    'class C {} new C?.();',
    'function foo() { new?.target; }',
    'function tag() {} tag?.``;',
    'const o = { tag() {} }; o?.tag``;',
    'a.?2.?n',
    'obj?.a = 33;',
    'a.? (?) [?]',
    'a.?2.3',
    '{a: 44}?.a',
    'let obj = {x:x?.1}; [...obj["x"]] = [10];',
    'let [...[...[...x?.a]]] = [x?.[[]]];',
    'let [...[...[...x?.a]]] = [[[]]];',
    'let [...[...[...x]]] = [?.a[[]]];',
    'try {} catch ([e?.a, ...a]) {}',
    'try {} catch (a?.[e]) {}',
    '[...[{x?.prop: 1}.prop]] = []',
    '[...[{prop?.a: 1}.prop]] = []',
    '[...[{prop: 1}.prop]] = x?.[]',
    'obj?.[expr] func?.(...args) new C?.(...args)',
    'o.x?[y]+z',
    'obj:?.prop',
    'obj:?[expr]',
    'func:?(...args)',
    'a === null: a?.b.c === undefined',
    'a === null: a?.b.c === undefined',
    '?.a?.b?.c',
    '[...[{x?.prop: 1}.prop]] = []',
    '[...[{prop?.a: 1}.prop]] = []',
    '[...[{prop: 1}.prop]] = x?.[]',
    'obj?.[expr] func?.(...args) new C?.(...args)',
    'o.x?[y]+z',
    'obj:?.prop',
    'obj:?[expr]',
    'func:?(...args)',
    'a === null: a?.b.c === undefined',
    'a === null: a?.b.c === undefined',
    '?.a?.b?.c',
    '?.(a.b.c)',
    '?. ?[] ?() ?:',
    'var b = condition ? a?.x.?y : a?.y?.z;',
    'a.?[b.c].d',
    'a[?b[c]]',
    'delete ?a.b.c',
    'delete ?a.b.c',
    '[x?.y = 1]',
    '[x?.x?.y = 1]',
    '[x?.?.y = 1]',
    '[x?.y = 1]',
    'a?.b => (a == null ? a : a.b)',
    'foo?.x?.y?.z?()=>foo;',
    'const a = { b(){ return super?.c; } }',
    'class A{ b(){ return super?.b; } }',
    'new a?.();',
    'new C?.b.d()',
    'a.?b.?()',
    'a.?()',
    'a?.b = c',
    'a?.{a} = c',
    'a?.(a) = c',
    'a?.b => (a == null ? void 0 : a.b) a?.b.c => (a == null ? void 0 : a.b.c)',
    "({ a: x?.obj['a'] } = {})",
    '[...[x?.this[0], ...x?.this[1]]] = []',
    'class C {} class D extends C { foo() { return super?.bar; } }',
    'class C {} class D extends C { foo() { return super?.["bar"]; }',
    'class C {} class D extends C { constructor() { super?.(); } }',
    'const o = { C: class {} }; new o?.C();',
    'const o = { C: class {} }; new o?.["C"]();',
    'class C {} new C?.();',
    'function tag() {} tag?.``',
    'const o = { tag() {} }; o?.tag``',
    'import?.("foo")',
    'new new class {}()?.constructor?.();',
    'async(x?.x)=>x?.z',
    'a?.{a} = c'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    '[x.y = 1] = [42]',
    '({ x: 1 }).x?.y.z;',
    `a?.b(...args).c(...args);`,
    'let a = b?.c;',
    'o.x?[y]+z:t',
    '({ x: y?.z })',
    '({ undefined: 3 })?.[null?.a]',
    '() => ({})?.["i"]()',
    '0?.()',
    '1?.()',
    '[]?.()',
    '({})?.["constructor"]',
    'for (const key of {}?.a) ;',
    'for (const key of {}?.a) {}',
    'for (const key of obj?.a) {}',
    'for (const key of obj?.a);',
    'for (obj?.a; undefined?.a; obj?.a) { count2++; }',
    'for (obj?.a; obj2?.a; obj?.a) { count2++; }',
    'while (obj?.a) {}',
    '[]?.length',
    '1?.valueOf()',
    '0?.valueOf()',
    'o1.x?.["y"];',
    'do { } while (obj?.a);',
    'async function x() {  for await (const num of obj?.iterable) { } } ',
    'for (const key in obj?.inner) {}',
    'o1.x?.();',
    'x?.delete',
    'x?.function',
    'x?.let',
    'x.let',
    'x?.package',
    'x?.implements',
    'x?.package',
    'null?.(o1.x);',
    'obj?.d();',
    '(a?.b).c',
    '(obj?.a)?.b',
    '(fn()?.a)?.b',
    'const value = true ?.30 : false;',
    'undf?.b',
    'null?.a',
    '[1, 2]?.[1]',
    '(function a () {}?.name)',
    '(class Foo {}?.name)',
    '(function * a () {}?.name)',
    'new new class {}().constructor();',
    'System.global.navigator?.toString()',
    'async?.(package())',
    'async?.(async())',
    'async?.(async?.a, async?.a)',
    'async?.(async?.a, async?.(x))',
    'async?.(async?.(), async?.[x])',
    'async?.(async?.a, async?.a)',
    'async?.("string", async?.a, async?.a)',
    'async?.(123, async?.a, async?.a)',
    'async?.(async?.a, "string", a=>x?.z)',
    'o3?.a === o4?.a === undefined',
    'o3?.a?.b === o4?.a?.b === undefined',
    'o3?.a?.b?.c === o4?.a?.b?.c === undefined',
    'x in (o3?.a)',
    'obj.func?.[arg].property;',
    'obj.func?.[arg.property];',
    'a?.b.c.e?.f.g?.h.t.c?.d()?.e;',
    'a?.d().f?.b',
    '(fn()?.a)?.b',
    'a?.[++x]',
    'a?.b.c(++x).d;',
    'undefined?.[++x]',
    'undefined?.b.c(++x).d; ',
    'undefined?.b',
    'obj.func?.[arg];',
    'a?.trim()?.indexOf("hello")',
    'foo?.x?.y?.z?()=>{foo}:bar;',
    `if (a?.b?.c === 'foobar') {}
     if (a?.b()?.c) {}
     if (a?.b?.()?.c) {}`,
    '[a, b] = [b, a];',
    '[a, b.c] = [d?.e, f?.g];',
    '[a, b.c] = [d?.e, (f.g) = h];',
    '[a, b] = f?.(); ',
    'var [a, , b] = f();',
    '[a, ...b] = [1, 2?.a, 3];',
    'null?.(1, ...a)',
    '({}).a?.(...a)',
    '({ a: null }).a?.(...a)',
    'undefined?.(...a)?.(1, ...a)',
    '() => 5?.(...[])',
    'delete o1?.x',
    'o2.x',
    'greet.call?.({ suffix: "!" }, "world")',
    'null.call?.({ suffix: "!" }, "world")',
    '({}).call?.({ suffix: "!" }, "world")',
    'greet?.apply({ suffix: "?" }, "world")',
    'masquerader?.()',
    'greet.call?.({ suffix: "!" }, "world")',
    'greet.call?.({ suffix: "!" }, "world")',
    'o2.x?.["y"];',
    'a?.[foo(a)]',
    'x?.[y?.z];',
    'x.k?.[y?.z];',
    'x?.(y?.z)',
    '(x?.y)?.(z)',
    '(x?.y)(z)',
    'a ?? a.b ?? (a?.b).c();',
    'a ?? foo.bar?.baz ?? a.c',
    'a ?? aobj?.[expr]?.[other] ?? foo.bar?.baz',
    'a?.b[3].c?.(x).d ?? aobj?.[expr]?.[other] ?? foo.bar?.baz',
    'const x = a?.b.c',
    '(null)?.b === null',
    'let a = b?.c',
    'a?.b',
    '!a ? a : a.b',
    'foo(null?.x)',
    'let a = b?? "default";',
    'let a = b.c ?? "default";',
    'let xn = x?.normalize("NFC")',
    'a?.b === undefined',
    'null?.foo === null',
    'var v = a?.b?.c?.d',
    'var v = (((a?.b)?.c)?.d)',
    'a?.b?.c?.d === undefined',
    '({})?.a["b"]',
    'delete null?.foo',
    '({})?.constructor',
    '({ x: "hi" })?.x',
    '[]?.length',
    'true?.["valueOf"]()',
    'null?.["valueOf"]()',
    'undefined?.["valueOf"]()',
    'const a = b.map(p => p.d?.e?.f);',
    'const a = b.map(p => p.c?.d?.e ?? "(string)");',
    'f?.(arg0, arg1)',
    'true?.(123)',
    'true?.(123??x?.3:5)',
    'true?.(123)',
    `function isInvoked(obj) {
       let invoked = false;
       obj?.a.b.m(invoked = true);
       return invoked;
     }`,
    'a.b?.c?.d',
    'obj ? ["a", "b", "c"].map(x => x+x) : []',
    'const a = b?.c?.[d]?.e;',
    'const a = b?.c();',
    'const { a, b } = c.d?.e;',
    '1?.["valueOf"]()',
    '() => 0?.()',
    '() => 1?.()',
    '() => "hi"?.()',
    '() => ({})?.a["b"]',
    '() => (() => {})?.()()',
    '(() => {})?.()?.()',
    'null?.()().a["b"]',
    'delete undefined?.()',
    'delete null?.()',
    'x?.([...[function f() {}.prop]] = [])',
    'x?.({ a: obj.a } = {})',
    'value = { x: 4 };',
    'for (let [a = b?.a] of [0, c = 0]);',
    '({x: y = z = 0} = 1)?.(a??b)',
    '({x: y = z = 0} = 1)?.(a?.(a??b))',
    '({let} = 0);',
    '([x.y = a] = ([x.y = a?.y] = ([x.y = a] = z)))',
    '({..."x".x} = x?.y);',
    '({...{}.x} = x??y?.(a=b?.a));',
    '([...[([...[].x] = x??y?.z)].x] = x);',
    '([...{}.x] = x);',
    '({..."x"[x]} = x);',
    '({...[][x?.y]} = x);',
    '({...[][x?.y]} = x = y);',
    '({...[][x?.y]} = x = (y?.y??z));',
    '({...{}[x?.y]} = x?.y??z);',
    'undefined?.(...a)',
    'obj?.prop ',
    'func?.(...args)',
    'a?.[x]',
    'a?.()',
    'x?.1:y',
    'a?.[++x]',
    'a?.b.c(++x).d',
    'a?.b[3].c?.(x).d',
    '(a?.b).c',
    'delete a?.b',
    'func?.(a, b)',
    'a?.func?.()',
    'a?.func?.(a, b)',
    'null?.valueOf()',
    'a.func?.()',
    'obj?.[expr]',
    'obj?.[expr]?.[other]',
    `obj?.[true]`,
    'obj?.[true]?.[true]',
    'obj.a?.[expr]',
    `obj.a?.[true]`,
    `foo.bar?.baz`,
    `foo?.bar?.baz`,
    `foo?.bar`,
    'a.b?.c()',
    '(a?.b).c;',
    '(a?.b).c();',
    '(a?.b)?.c.d?.e;',
    `a?.b.c.d.e?.f`,
    `a.b.c?.d.e.f`,
    `if (a?.b?.c) {
       console.log(a?.b?.c);
     } else if (a?.b.c?.d?.e.f) {
       console.log(a?.b.c?.d?.e.f);
     }`,
    'true?.valueOf()',
    '0?.valueOf()',
    'false?.()',
    '0?.()',
    '({})?.()',
    '[]?.()',
    `class A {
       a () {}
     }
     class B extends A {
       dot () {
         return super.a?.name;
       }
       expr () {
         return super['a'].name;
       }
       undf () {
         return super.b?.c;
       }
     }`,
    '({a: 33}, null)?.a',
    '({a: 33})?.a',
    'arr?.[i + 1]',
    'arr[0]?.a',
    'arr[1]?.a',
    '[1, 2]?.[1]',
    '(function a () {}?.name)',
    '(class Foo {}?.name)',
    'yield?.(yield())',
    'yield?.(yield())',
    'async?.(package())',
    'async?.(async())',
    'async?.(async?.a, async?.a)',
    'async?.(async?.a, async?.(x))',
    'async?.(async?.(), async?.[x])',
    'async?.(async?.a, async?.a)',
    'async?.("string", async?.a, async?.a)',
    'async?.(123, async?.a, async?.a)',
    'async?.(async?.a, "string", a=>x?.z)',
    'async?.("string", async=>x?.z, x=>async?.z)',
    'async?.(async=>x?.z, "string", async(yield)=>x?.z)',
    'async?.(async=>x?.z, "string", async(x)=>x?.z)',
    'async?.(async(x)=>x?.z, "string", async(x)=>x?.z)',
    'async?.(async()=>x?.await)',
    'new async(async()=>x?.await)',
    'new yield(async()=>x?.await)',
    'new new class {}().constructor();',
    '(function * a () {}?.name)',
    '(async function a () {}?.name)',
    '(async function * a () {}?.name)',
    '/[a-z]/?.test("a")',
    '`hello`?.[0]',
    '({a: 33}, null)?.a',
    '({a: 33})?.a',
    '(undefined, {a: 33})?.a',
    'false?.4:5',
    'greet.call?.({ suffix: "!" }, "world")',
    'var a = b.c("string")?.d.e || 0;',
    'func?.()'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `for ((obj?.foo).bar of []);`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
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
              type: 'MemberExpression',
              object: {
                type: 'ChainingExpression',
                base: {
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
                chain: [
                  {
                    type: 'MemberChain',
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
                    optional: true,
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
                  }
                ],
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bar',
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
              start: 5,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            right: {
              type: 'ArrayExpression',
              elements: [],
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
            await: false,
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
      `(obj?.foo).bar++`,
      Context.Empty,
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
                object: {
                  type: 'ChainingExpression',
                  base: {
                    type: 'Identifier',
                    name: 'obj'
                  },
                  chain: [
                    {
                      type: 'MemberChain',
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'foo'
                      },
                      optional: true
                    }
                  ]
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'bar'
                }
              },
              operator: '++',
              prefix: false
            }
          }
        ]
      }
    ],
    [
      `(obj?.foo).bar++`,
      Context.OptionsLoc,
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
                object: {
                  type: 'ChainingExpression',
                  base: {
                    type: 'Identifier',
                    name: 'obj',
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
                  chain: [
                    {
                      type: 'MemberChain',
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'foo',
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
                      optional: true,
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
              operator: '++',
              prefix: false,
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
      `(obj?.foo).bar = 0`,
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
                type: 'MemberExpression',
                object: {
                  type: 'ChainingExpression',
                  base: {
                    type: 'Identifier',
                    name: 'obj',
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
                  chain: [
                    {
                      type: 'MemberChain',
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'foo',
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
                      optional: true,
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
              operator: '=',
              right: {
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
      `class Foo extends Base { method() { super.method?.(); } }`,
      Context.Empty,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'Foo'
            },
            superClass: {
              type: 'Identifier',
              name: 'Base'
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
                    name: 'method'
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
                            type: 'ChainingExpression',
                            base: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super'
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'method'
                              }
                            },
                            chain: [
                              {
                                type: 'CallChain',
                                arguments: [],
                                optional: true
                              }
                            ]
                          }
                        }
                      ]
                    },
                    async: false,
                    generator: false,
                    id: null
                  }
                }
              ]
            }
          }
        ]
      }
    ],
    [
      `class Foo extends Base { method() { super.method?.(); } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'Foo',
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
            superClass: {
              type: 'Identifier',
              name: 'Base',
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
                    name: 'method',
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
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'ChainingExpression',
                            base: {
                              type: 'MemberExpression',
                              object: {
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
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'method',
                                start: 42,
                                end: 48,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 48
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
                            },
                            chain: [
                              {
                                type: 'CallChain',
                                arguments: [],
                                optional: true,
                                start: 36,
                                end: 52,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 52
                                  }
                                }
                              }
                            ],
                            start: 36,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            }
                          },
                          start: 36,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
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
                  start: 25,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 23,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 23
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
      `function a(b) { new.target?.(); }`,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ChainingExpression',
                    base: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
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
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
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
                    chain: [
                      {
                        type: 'CallChain',
                        arguments: [],
                        optional: true,
                        start: 16,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 16,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 30
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
    /*  [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],
    [`obj?.aaa?.bbb`, Context.OptionsLoc, {}],*/

    [
      `obj?.aaa?.bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ChainingExpression',
              base: {
                type: 'Identifier',
                name: 'obj',
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
              chain: [
                {
                  type: 'MemberChain',
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'aaa',
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
                  optional: true,
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
                {
                  type: 'MemberChain',
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'bbb',
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
                  optional: true,
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

/*
 */
