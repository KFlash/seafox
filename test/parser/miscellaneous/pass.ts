import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - Pass', () => {
  for (const arg of [
    'for (new /^\\B\\y\\x2F\\xEe/g(("y".z), eval in ({}));; (class x {}))  {}',
    '([...[][void (this)] += (3287)])',
    '(false in (((5973))) ** (q), false.if --, function () {})',
    '(([(2e308.typeof += eval), ...(false), (.88), , ]))',
    `[ [].x = y]`,
    'for (var [] in {b, y, [.4]: h -= 2e308}) for (; ((this() ? 2e308.m ++ : eval[/B^B=/gim])); (() => class {})(null, ...arguments, ...true, ..."9Â]CÕ")) try {} finally {}',
    'a([1 || 1].a = 1)',
    'x ([1 || 1].a = 1)',
    'x({a: 1 || 1}.a = 1)',
    'for(`${x in y}`;;);',
    '-134.44e44',
    '11_33',
    '11_33.333_444',
    '0b10n',
    '09.1_2',
    '09_12',
    'try { } catch (let) { }',
    'let++;',
    'var yield;',
    'var foo, yield;',
    'try { } catch (yield) { }',
    'function yield() { }',
    '(function yield() { })',
    'function foo(yield) { }',
    'function foo(bar, yield) { }',
    'function * yield() { }',
    'yield = 1;',
    'var foo = yield = 1;',
    'yield * 2;',
    '++yield;',
    'yield++;',
    'yield: 34',
    'function yield(yield) { yield: yield (yield + yield(0)); }',
    '({ yield: 1 })',
    '({ get yield() { 1 } })',
    'yield(100)',
    'yield[100]',
    '(function * gen() { (function not_gen() {function foo(bar, yield) { }}) })',
    '(function * gen() { (function not_gen() {function yield(yield) { yield: yield (yield + yield(0)); }}) })',
    'function * gen() { ({ get yield() { } })  }',
    'function * gen() { ({ [yield]: x } = { })  }',
    'function * gen() { yield\n  }',
    'function * gen() { yield /* comment */  }',
    'function * gen() { (yield) \n ? yield : yield  }',
    'function * gen() { x = class extends (a ? null : yield) { }  }',
    'function * gen() { yield\nfor (;;) {}  }',
    'var x = { foo: bar = 5 + baz }; ',
    'var x = { set 1(v) {} }; ',
    'var x = { 1: 1, set 2(v) {} }; ',
    'var x = { *set() {} }; ',
    'var x = { if: 4 }; ',
    'var x = { eval: 7 }; ',
    'var x = { arguments: 8 }; ',
    'var x = { async : 0 }; ',
    'var x = { *async(){} }; ',
    'var x = { interface: 5 }; ',
    'var x = { *async(){} }; ',
    'var x   = { foo: 1, set bar(v) {} };',
    'delete 1;',
    'delete 1 + 2;',
    'delete foo--;',
    'delete new foo();',
    'delete new foo(bar);',
    'delete this;',
    '"use strict"; delete new foo(bar);',
    '"use strict"; delete 1;',
    '"use strict"; delete 1 + 2;',
    '"use strict"; delete foo--;',
    '"use strict"; delete new foo();',
    '"use strict"; delete this;',
    `({} + 1);`,
    `var a = function a(a, b, c) { return a + b + c; };`,
    `if (1) {
      1;
    }`,
    `if (1) {
      1;
    } else if (2) {
      2;
    } else {
      3;
    }`,
    `(function() {
      1;
    })();`,
    `(function() {
      1;
    }).call(this);`,
    `'\\011'`,
    `var array = [
      0, 42, 12345, -1, -1.1, -0.1, 864e5, .5, 1n, 1., 1.e2, 1.e+1,
      -1.4142135623730951, 3.141592653589793,
      0.0314e-1, 0.0314E+2, .0314e-1, .0314E+2,
      0x0FFF, 0X7ffffffF, 0b101010, 0B101010, 0o777, 0O777
    ];`,
    `0777`,
    `/42/`,
    `/42/g`,
    `false`,
    `null`,
    `{}`,
    `({ a: 1 })`,
    `({ a: 1, b: 2 })`,
    `({ a: 1, b: 2, c: 1 + 1 })`,
    `var o = {
      set a(a) {
        return 1;
      }
    };`,
    `var o = {
      a() {
        return 1;
      }
    };`,
    `[]`,
    `[,,]`,
    `[1, 2]`,
    `var a;
    a = 1, a -= 1, a += 1, a *= 1, a %= 1, a /= 1, a &= 1, a |= 1, a >>= 1, a >>>= 1, a <<= 1;`,
    `var a = 1;
    a * a;
    a / a;
    a % a;
    a + a;
    a - a;
    a << a;
    a >> a;
    a >>> a;
    a < a;
    a > a;
    a <= a;
    a >= a;
    a instanceof a;
    a in a;
    a == a;
    a != a;
    a === a;
    a !== a;
    a & a;
    a ^ a;
    a | a;
    a && a;
    a || a;`,
    `var a = 1;
    a = -a;
    a = +a;
    a = !a;
    a = ~a;
    a = ++a;
    a = --a;
    a = a++;
    a = a--;
    a = typeof a;
    a = void a;
    a = delete a;`,
    `new A`,
    `a.b.c.d[e][f + g]`,
    '`1 + 1 = ${ 1 + 1 }`;',
    'a`1 + 1 = ${ 1 + 1 }`;',
    'new a`1 + 1 = ${ 1 + 1 }`;',
    `const a = 1 + 1;`,
    `for (i = 0, len = a.length; i < len; i++);`,
    `for (a in b) {}`,
    `for (let a of b) {}`,
    `for (var i = 0; i < 10; i++) {
      if (i === 1) {
        continue;
      }
      if (i === 5) {
        break;
      }
    }`,
    `function a() {
      return
      1 + 1;
    }`,
    `try {
      throw new Error();
    } catch (e) {}`,
    `switch (a) {
    }`,
    `while (0) {}`,
    `(a, b, c) => 1;`,
    '`a` + `b`',
    `function a({ a: A = 1 + 1, b: { c } }) {}`,
    `function a(a = 1, b = 2 + 3, c) {}`,
    `function a([ a, b, ...c ]) {}`,
    `function a([...a]) {}`,
    `function a([ a = [ b = [c]]]) {}`,
    `var {a: A, b: B = 1} = o;`,
    `var {a: A, b: B = 1, c: { d: D = 2 + 3, e: { f = 4 + 5 } }} = o;`,
    `var [a] = o;`,
    `function* a() {
      yield function*() {
        return function*() {
          yield 1;
        };
      };
    }`,
    `function* a() {
      yield* yield* 1;
    }`,
    `var a = '\\ud842\\udfb7\\u91ce\\u5bb6\\u3067\\ud867\\ude3d';`,
    `var a = '\\u{20Bb7}';`,
    `function f({a, b, c} = {}) {}`,
    `let [a] = [1];`,
    `const f = x => x*x`,
    `for([a,b[a],{c,d=e,[f]:[g,h().a,(1).i,...j[2]]}] in 3);`,
    `a >>= 1`,
    `[...a[1]] = 2;`,
    `a >= b`,
    `new a("aa, [bb]", 'return aa;');
     new a("aa, {bb}", 'return aa;');
     new a("[[aa]], [{bb}]", 'return aa;');`,
    `(1, a.a)();`,
    `var a, b;
    if (a && !(a + "1") && b) { // 1
        var c;
        d();
    } else {
        e();
    }

    if (a || !!(a + "1") || b) { // 2
        d();
    } else {
        var f;
        e();
    }`,
    `for(var a = 1;;) { let a; }`,
    `function a(b, c) { return b-- >= c; }`,
    `function *a() { yield b=c, yield* d=e, f }`,
    `void /test/`,
    `[, a,,] = 1`,
    `[...eval] = a`,
    `/[a-z]/i`,
    `function a() {
      b();
  }
  if (a() || true) {
      c();
  }`,
    `a(() => {})`,
    '`\n\r\b\v\t\f\
    \
    `',
    `{ let a = 1, b = 2, c = 3 }`,
    `if (a) {
    } else {
        b();
    }`,
    `(a) => 1`,
    `({ yield() {} })`,
    `function a() {
      // If foo is null or undefined, this should be an exception
      var {a,b} = c;
  }`,
    `function a() {
      (class b { });
      class c {};
  }`,
    `// adapted from http://asmjs.org/spec/latest/
    function a(b, c, d) {
      "use asm";
      var e = b.f.e;
      var g = b.f.g;
      var h = new b.i(d);
      function j(k, l) {
        k = k|1;
        l = l|2;
        var m = 0.0, n = 3, o = 4;
        // asm.js forces byte addressing of the heap by requiring shifting by 3
        for (n = k << 5, o = l << 6; (n|7) < (o|8); n = (n + 9)|10) {
          m = m + +g(h[n>>11]);
        }
        return +m;
      }
      function p(k, l) {
        k = k|12;
        l = l|13;
        return +e(+j(k, l) / +((l - k)|14));
      }
      return { p: p };
    }
    function q(b, c, d) {
      var e = b.f.e;
      var g = b.f.g;
      var h = new b.i(d);
      function j(k, l) {
        k = k|15;
        l = l|16;
        var m = 0.0, n = 17, o = 18;
        // asm.js forces byte addressing of the heap by requiring shifting by 3
        for (n = k << 19, o = l << 20; (n|21) < (o|22); n = (n + 23)|24) {
          m = m + +g(h[n>>25]);
        }
        return +m;
      }
      function p(k, l) {
        k = k|26;
        l = l|27;
        return +e(+j(k, l) / +((l - k)|28));
      }
      return { p: p };
    }`,
    `var a = 'very cute';`,
    `class a {;b(){};c(){};}`,
    `(a, b, c, d) + e;`,
    `({set a(b=1){}})`,
    `let [[]]=1`,
    `class a {static ["prototype"](){}}`,
    `a(
      b(c + 'd'),
      b('d' + c)
    );`,
    `class a extends b { constructor() { super() } }`,
    `if (true) a()
    ; else;`,
    `const {a:b} = {}`,
    `(function() {
      a(), 1, b();
    }());`,
    `(function () {
      var a;
      b(typeof a === 'c');
    }());`,
    `(function () {
      a(typeof b !== 'c');
    }());`,
    `function a() { "use strict" + 1; }`,
    `// 1.
    if (a) {
        {{{}}}
        if (b) { c(); }
        {{}}
    } else {
        d();
    }

    // 2.
    if (a) {
        for (var e = 1; e < 2; ++e)
            if (b) c();
    } else {
        d();
    }`,
    `for(let a = 1;;);`,
    `while (true) { break }`,
    `function a(b, c) {
      function d() {
          e();
      }
      return b + c;
  }`,
    `a << b << c`,
    `for (;;) if (a()) b(); else break;`,
    `var { yield: a } = b;`,
    `({ get a() { }, get a() { } })`,
    `'use strict';
    a.static();`,
    `let {a,} = 1`,
    `a: while (true) while (true) continue a;`,
    `(function(...a){})`,
    `function a() {
      'use strict';
      /* Comment */
      }`,
    `(function() {
      if (a) {
          return 1;
          b();
      } else {
          c();
      }
      return 2;
  }());`,
    `(function () {
      var a,b,c=1,d,e,f=2;
      (a,b,c)+(d,e,f);
  }());`,
    `switch (a) {
      case 1:
        // optimize it
        (function () {
          b("c");
        }());
        b("d");
      }`,
    `for(a = 1;;);`,
    `() => () => 1`,
    `a, b`,
    `(function () {
      var a = {
          'b': 1
      };
  }());`,
    `({a(b,c){}})`,
    `  -->`,
    `09.0`,
    `(a = b('100')) == a `,
    `({["a"+1]:"b"})`,
    `// Do not remove first if consequent block
    if (a) {
        if (b) { true; }
    } else {
        false;
    }`,
    `(function() {
      try {
          throw 'a';
      } catch (b) {
      } finally {
          return 1;
      }
      c();  // This should be removed.
  }());`,
    `日本語 = []`,
    `[(a) = 1] = 2`,
    `for (;;) {
      while (true) {
          continue;
      }
  }`,
    `// global getter to o
    a.b = (c(), 1)`,
    `for (;;) {
      with (a) {
          continue;
      }
  }`,
    `(function() {
      for (;;) {
          continue;
          a();  // This should be removed.
      }
      b();
  }());`,
    `switch (1) {
      case 2:
        a();
        if (b) break;
        c();
        break;
      case 3+4:
        d();
      default:
        e();
    }`,
    `__proto__: while (true) { break __proto__; }`,
    `var a = function eval() { };`,

    `function a() {
      b();
      c();
      return d();
  }
  function e() {
      b();
      c();
      throw new f();
  }`,
    `eval = 1`,
    `class a extends b { c() { ({d: super[e]} = f) } }`,
    `var a = {
      'arguments': 1,
      'eval': 2
  };`,
    `a(.0)`,
    `function a([b] = [1]) {}`,
    `for (class x { [a in b](){} }.x in c);`,
    `async ({} ? [] : 1);`,
    '({1: ({}) / (1)});',
    '({1: ({}) ? (1) : [1]});',
    '({1: (x / y - z)});',
    '({1: (x = x) });',
    `[({a: 1}.c)] = [];`,
    `[({a: 1}.c)] = [];`,
    'do ; while(0); i++',
    'do if (a) x; else y; while(z)',
    `for (r in ((false))) {}`,
    `do throw function(){}
    while(y)
    for(;;)x`,
    `function runNearStackLimit(f) { function t() { try { t(); } catch(e) { f(); } }; try { t(); } catch(e) {} }
     function quit() {}
     function nop() {}
    try { gc; } catch(e) { gc = nop; }`,
    `a = let\n{}`,
    `throw(protected(x=>{"use strict"}))`,
    `for ({da = 2e308} of ([, , , (arguments[((f))]).break = (null)] = (/(?=\B\b)/gmuy === njbcpwhomopc.switch))) continue`,
    `for (var c, f; (/[+-\\l-]/u); ((class {}).with)) var i;`,
    `if ((([(((null))), , (([(2e308).r = (((2e308)) ? this : ("")), aihgi] = ({}))), (2e308), ("")]))) for (jdrdckxlyikhuari in (nroofnmvdiahc ++)) arguments: for (var c, f; (/[+-\l-]/u); ((class {}).with)) var i;`,
    `({}.length);`,
    'try{}catch{}finally{package:;package:for(;;);}',
    'A = class extends A {}',
    '(x)=>{/x/}',
    'if ( A ) A.__proto__ = A;',
    'for (const [target, weights] of Array.from(weightsPerTarget)) {}',
    'function epsilon(value) { return Math.abs(value) < 0.000001 ? 0 : value; }',
    'switch (((("Mr" || (`foo`).rlv ? ("^") : ((([`a` / (() => 0)])))())))) {}',
    'function f() { ((((a))((b)()).l))() }',
    'function f() { (a)[b + (c) / (d())].l-- }',
    "function f() { new (f + 5)(6, (g)() - 'l'() - true(false)) }",
    'function f() { function f() {} }',
    'function f(a,b) {}',
    `class x{ constructor(){} x(){} }`,
    '[ { x: y = 3 } ]',
    `class x extends {} {}`,
    'x= { async prototype(){} }',
    'x= { *prototype(){} }',
    'do x=>{}; while(y)',
    'for (x instanceof a>c;;) x',
    'x = a instanceof b + c',
    'x = a instanceof b > c',
    'x = a ** b + c',
    'x = a + b instanceof c',
    'x = a + b ** c',
    'x = a / b + c',
    'x= { set prototype(x){} }',
    'x= { get prototype(){} }',
    'x= { async *prototype(){} }',
    'let f = () => {import("./foo").catch(error => {}).then($DONE, $DONE); };',
    `"use asm"; function a(yield) {}; "use strict"; function a(yield) {}`,
    '[...(x), y]',
    'for (let a = b => (b in c); ;);',
    'for (let a = (b in c && d in e); ;);',
    'for (let a = (b in c); ;);',
    'let a; ',
    'let b;',
    '() => { let [] = y }',
    '() => { let x }',
    '{ let x }',
    '{ let [] = y }',
    '{ let {} = y }',
    '() => { let x }',
    '() => { let {} = y }',
    'for (let\n{x} of list) process(x);',
    'switch (a) { case b: let x }',
    'switch (a) { default: let x }',
    'switch (a) { default: let {x} = y }',
    'switch (a) { default: let x }',
    '({a, b} = {});',
    'b = 1;',
    'for (let a = (b in c && d); ;);',
    'for (let a = (b in c); ;);',
    'for (let a = ((b in c) && (d in e)); ;);',
    `class MyClass {
      async asyncMethod(a) { return a; }
      async async(a) { return a; }
      async "a"() { return 12; }
      async 0() { return 12; }
      async 3.14() { return 12; }
      async else() { return 12; }
      static async staticAsyncMethod(a) { return a; }
    }`,
    `var object3 = {
      async "a"() { return 12; },
      async 0() { return 12; },
      async 3.14() { return 12; },
      async else() { return 12; },
  };`,
    '$ => ` ` () ` ` <= $',
    '{{ ` `<<` `>>` ` }}',
    "('')` ` ` ${O}$ ` ` `('')",
    `({
    name: "Awaiting a function with multiple awaits",
    body: function (index) {
      async function af1(a, b) {
          return await af2();
          async function af2() {
              a = await a * a;
              b = await b * b;
              return a + b;
          }
      }
    }
    })`,
    `({
      name: "Async function with an exception in an await expression",
      body: function (index) {
          var obj =  { x : 1 };
          async function af1() { throw obj; }
          async function af2() {}
          async function af3() {return await af1() + await af2(); }
        }
      })`,
    `(a,) => {}`,
    `(a,b,) => {}`,
    `(a = b,) => {}`,
    '++/b/.c',
    '--/b/.c',
    'var [x] = v;',
    'var {x} = v;',
    'for (let().x in y);',
    `([x],) => {}`,
    `({a},) => {}`,
    `({"x": [y].slice(0)})`,
    `[...{a: b.b}.d] = c`,
    `[...{a: b}.c] = []`,
    'function* f() { yield* x; }',
    'function* f() { yield* yield; }',
    'function* f() { yield* yield y; }',
    'yield * yield',
    '({a: 1, a: 2})',
    '({a: 1, b: 3, a: 2})',
    '({b: x, a: 1, a: 2})',
    '({a: 1, a: 2, b: 3})',
    '({a, a})',
    '({a, a: 1})',
    '({a: 1, a})',
    '({a: 1, a})',
    '({"x": a, y: a});',
    '({x: a, "y": a});',
    '({[foo()]: a, a});',
    'x = {["__proto__"]: 1, __proto__: 2}',
    'x = {[__proto__]: 1, __proto__: 2}',
    'x = {__proto__, __proto__: 2}',
    'x = {async __proto__(){}, *__proto__(){}}',
    'class x {static __proto__(){}; get __proto__(){}}',
    'x = {__proto__: a, __proto__: b} = y',
    '({__proto__: a, __proto__: b} = x)',
    '({__proto__: a, __proto__: b}) => x;',
    '(a, [b, [c, {__proto__: d, __proto__: e}]], f) => x;',
    'function f({__proto__: a, __proto__: b}) {}',
    'function f(a, [b, [c, {__proto__: d, __proto__: e}]], f) {}',
    'async ({__proto__: a, __proto__: b}) => x;',
    '({ __proto__: x, __proto__: y}) => x;',
    'function f(a, [b, [c, {__proto__: d, __proto__: e}]], f) {}',
    'for (/x/g + b;;);',
    'for ("abc" + b;;);',
    'for (2 + b;;);',
    'for ({} + b;;);',
    'for ([] + b;;);',
    'for (a + b;;);',
    'for ([] !== x;;);',
    'for ([] instanceof obj;;);',
    'for (12 instanceof obj;;);',
    'for (a instanceof b;;);',
    `[...a, b]`,
    `[...(x), y]`,
    `({a: b = x} = d)`,
    `({a: b} = d)`,
    `([...x.y] = z)`,
    `(z = [...x.y] = z) => z`,
    `([...x, ...y]);`,
    `([...x+=y]);`,
    `([...x=y]);`,
    `([...x]);`,
    `for ([] + x;;);`,
    `for ([], x;;);`,
    `for ([] + x;;);`,
    '(() => {}).x',
    '(x => {}).x',
    `[..."foo"]`,
    `[..."foo".bar]`,
    `[...50]`,
    `[...50..bar]`,
    `[...(x,y)]`,
    `[..."foo".bar]`,
    'a\rb',
    'a\nb',
    `(x = delete ((yield) = f)) => {}`,
    'do try {} catch (q) {} while ((yield* 810048018773152));',
    `[...[{a: b}.c]] = [];`,
    `[...[{prop: 1}.prop]] = []`,
    '(x=(await)=y)',
    'async function f(){    function g(x=(await)=y){}   }',
    'function f(x=(await)=y){}',
    '(x=(await)=y)=>z',
    'while (function* () {} === x);',
    `([x] = y,) => {}`,
    `({a} = b,) => {}`,
    `foo({c=3} = {})`,
    `async({c=3} = {})`,
    `yield({c=3} = {})`,
    `log({foo: [bar]} = obj);`,
    `({a:(b) = c} = 1)`,
    `for ({x} = z;;);`,
    `({...[].x} = x);`,
    `result = [...{ x = await }] = y;`,
    `async r => result = [...{ x = await x }] = y;`,
    `result = [...{ x = yield }] = y;`,
    `function* g() {   [...{ x = yield }] = y   }`,
    `([{x = y}] = z)`,
    `[{x = y}] = z`,
    `new await()()`,
    'var s = 0; for (let key in a) { s += a[key] };',
    '`a${b=c}d`',
    `(x) = (y) += z`,
    `(x) = (y) = z`,
    `(x) += (y) = z`,
    `(foo.x)`,
    `(foo[x])`,
    `(foo) += 3`,
    `(x = delete ((await) = f)) => {}`,
    'const [a] = b;',
    'a = { ["foo"]: n / 1 }',
    `[(a)] = x`,
    `[(a) = x] = x`,
    `[a, {[b]:d}, c] = obj`,
    `[(a)] = x`,
    `[...{}]`,
    `({a:(b) = c} = 1)`,
    `for (a=>b;;);`,
    `async x => delete (((((foo(await x)))))).bar`,
    `a.b = x`,
    `a = x`,
    `a = b = x`,
    `x = x + yield`,
    'log(eval)',
    'eval',
    'eval.foo',
    'eval[foo]',
    'eval.foo = bar',
    'eval[foo] = bar',
    '++x ? b : c',
    'let x = () => ++a;',
    'if (++a);',
    'this.x++',
    'let x = () => a--;',
    'if (a--);',
    '(this.x--)',
    'a\n++b',
    '++(x);',
    '++(((x)));',
    '++\na',
    'if (++\na);',
    '++x + y',
    '++this.x',
    '(++this.x)',
    '++x ? b : c',
    'let x = () => --a;',
    'if (--a);',
    'if (a) --a;',
    '--(((x)));',
    'if (--\na);',
    '--\n(x);',
    '--this.x',
    '(--this.x)',
    'let x = () => a++;',
    '(((x)))++;',
    'while ({"a": 2e308.b = function* u() {}} = 8381.11);',
    'function a () { new.target, (new.target); }',
    '(delete new function f(){} + function(a,b){}(5)(6))',
    'function f() { [] in [5,6] * [,5,] / [,,5,,] || [a,] && new [,b] % [,,] }',
    '1 + {get get(){}, set set(a){}, get1:4, set1:get-set, }',
    'function f() { 1 + {get get(){}, set set(a){}, get1:4, set1:get-set, } }',
    'function f() { (4,(5,a(3,4))),f[4,a-6] }',
    '{ a[5],6; {} ++b-new (-5)() } c().l++',
    'function f() { { a[5],6; {} ++b-new (-5)() } c().l++ }',
    '({} = (--x), of, a) => (a)',
    'for (; ([x, bw, y = z], [{j, [(((t)))]: g = "N	¯B", c, o} = class u extends `c` {}], bar, ka) => `c{([, ] ** delete 2e308.static ++), arguments}`;) hnjtmujeg: for (ikdgsltnabvjnk of false) var y = /([])*?|K\x78B\b/gu',
    '({"d": [] & (null) });',
    `( of => {})`,
    `of => {}`,
    `for ({"a": ((~2e308)).eq = ((((t)[2e308] = (4.940161093774018e132[(null)] --)))), a, [(function* (b) {
    })]: c} of (2969)) debugger;`,
    `let [weli, [...[]], [, , ...[]], , {a}, ...[]] = (eval), kqwys = ((((((-2e308)))).if)(...((this)), ...((r)), ((of => {
    }))));`,
    'const a = (((({})))`æhq` / (b))',
    '({} = (x), of, a) => (a)',
    `(class {
      [null](t, a) {
        "use strict";
        "a";
        "b";
        "c";
        "use strict";
      }
      static *method(j, p, a, c, y) {
        "use strict";
      }
      set [(a)()] (ubv) {
        "C1>";
        "hello";
        "use strict";
        for (var n in null) continue;
        if (2603) return; else ;
        switch ("bar ") {}
        for (m of "") ;
        debugger;
      }
    })`,
    'throw (b = function* eo() { yield; }, [a]) => 2e308',
    '( of => {})',
    '(eval), a = ((((((-2e308)))).if)(...((this)), ...((r)), (( of => {}))));',
    '{ l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } }',
    'function f() { { l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } } }',
    'x: s: if (a) ; else b',
    'for (;; (k = x)) throw (null)',
    'function f() { if (a) if (b) y; else {} else ; }',
    'do if (a) with (b) continue; else debugger; while (false)',
    'function f() { if (a) function f() {} else function g() {} }',
    'throw a',
    'while (0) var a, b, c=6, d, e, f=5*6, g=f*h, h',
    '({a: 1 || 1}.a = 1)',
    'if (0) foo$; ',
    'function a({ [(b)]: {} = new.target}, c) {}',
    'function* foo({"a": {} = (new (((new.target)))), bar = a, [(this)]: {} = new.target}, b) {}',
    '(((2e308)).i)',
    `[function* (...{}) {  switch (yield) {}  }]
    a = (u) => {}`,
    'for (;; ({} = (--x), of, ...bar) => (a)) {}',
    'throw ((arguments))',
    '(class extends a { constructor() {}  *i() {}  })',
    '(class extends a { constructor() {}  *[i]() {}  })',
    'if (new (2e308)) try {} finally {} else do debugger; while (((6.98114699124408e222)));',
    `function f() {
      do do if ((new.target) & (/([]+|[^]|\Y^||[]*)/gy)) {} else return; while (((new 2e308(...new.target, ...null, ...new.target, ...((2e308)), ...null)))); while (ickwccysjjyv = 0);
    }`,
    `try {
      for (const i of r &= true) ((true))
    } catch ([h = e]) {
      true
      if ((2e308)) debugger;
      for (;;) break
      for (;;) debugger;
    }
    if (as ++) {
      function* p(j, x, c) {
        "use strict"
      }
    } else try {
      if (this) ;
    } catch (g) {} finally {
      switch (true) {}
      try {} catch (g) {}
      switch (this) {}
      try {} catch (n) {}
    }`,
    '[function* (...{}) {  switch (yield) {}  }] ',
    'for (let q in ((((...{}) => eval)))) try {} catch (r) {}',
    'do for (var x;; (((e = (true))))) {} while (({}));',
    `(class t extends ((/[=Z-\uE5Bd*-\[$-)(-]/gmu)) {
      set [(false)] (d) {
        "use strict";
      }
      static get [(true)]() {}
      static set [null] (h) {}
      static [(eval)]() {}
      constructor() {
        "use strict";
      }
    })`,
    'for (o of ((946090429347418))[("")]) try {} finally {}',
    `  class x {
      set [0] ({}) {
        "a"
        "b";
        "c"
        "d"
        "e";
      }
      static get [1694.31]() {
        "foo"
        "bar"
        "use strict"
      }
      static get [((/[?-\uD357)]/giy))]() {
        "use strict"
        "use strict"
      }
      static *"zoo "() {
        "use strict"
      }
      static set [(2e308)] (v) {
        "meta";
        "use strict";
      }
    }`,
    `if (0xE201433785892) eval: for (;;) try {
      arguments: debugger;
      debugger;
      while ((("string"))) debugger;
      do break eval; while (true);
    } catch (a) {}`,
    '(`Î${(aewdwm, [, ...{}] = {s}, bsm, e) => new (/(?:)/guy === [`template`, , u /= false, ...""])(new (y = 0).await(...() => 1199), ...eval, ....94, ...{eval})}`)',
    '{(this / s)}',
    '[{y} = /a/ ]',
    '[(((((/[^(-\x8F/$!-[(]/my).n = class {}))))]',
    'while ((p /= ({}))) for (let q in (`string`)) while (((2e308))) break;',
    `for (;;) if (class {}) switch (0xB1F7CA471C3A8) {
      case /(?=)?/iu:
      default:
      case /[(-o[-\uA9cb-]/my:
      case 2e308:
      case "string":
    } else new /[-\x7d#-.?-]+/g;`,
    'false ? null : (eval)',
    '"use strict"; false ? null : (eval)',
    '"use strict"; false ? null : (eval)',
    '(this / s)',
    'function a({ [(b)]: {} = new.target}, c) {}',
    `function* a(b, c, d) {
      try {
      } finally {}
      throw {a, [(yield)]: j, [0x1B7E316905B86C]: u = ((false)), s, [(new.target)]: i} = (([, , , , ]))
    }
    typeof (a >= ((h, k = (+("string")), b) => (null)));
    `,
    `function* a(b) {
      switch (((-((class {}))))) {
            case (yield* /\,+?/iy):
          }
      }`,
    'class a extends (([, /(?=(?!))/gi, [], , ])) {}',
    `throw 1344;
    /[^{?c\\x60-|5-8]?/gimu;`,
    "function f() { 'use strict'; function __proto__(){} }",
    'function f() { switch (l) { case 1: a: with(g) switch (g) { case 2: default: } default: } }',
    'switch (l) { case 1: a: with(g) switch (g) { case 2: default: } default: }',
    'function f() { switch (sw) { case a ? b - 7[1] ? [c,,] : d = 6 : { } : } }',
    'switch (l) { case a = b ? c : d : }',
    'switch (g() - h[5].l) { case 1 + 6: a: b: c: ++f }',
    "function f() { switch (f()) { case 5 * f(): default: case '6' - 9: ++i } }",
    "switch (f()) { case 5 * f(): default: case '6' - 9: ++i }",
    'function f() { for (a in b) break }',
    'function f() { for (var a = b, b = a ; ; ) break }',
    'function f() { for (var a, b ; ; ) { break }  }',
    'function f() { for ( ; a ; a ) break }',
    'function f() { for ( a ; a ; ) break }',
    'for ( ; ; a ) { break }',
    'function f() { for ( ; ; a ) { break } }',
    'function f() { for ( a ; ; ) { break } }',
    'for ( ; ; ) { break }',
    'for (a,b in c ;;) break',
    '{ a[5],6; {} ++b-new (-5)() } c().l++',
    'function f() { { a[5],6; {} ++b-new (-5)() } c().l++ }',
    '{ l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } }',
    'function f() { { l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } } }',
    'function f() { a: { ; } }',
    '{ ; ; ; }',
    'throw a + b in void c',
    'function f() { (4,(5,a(3,4))),f[4,a-6] }',
    '(4,(5,a(3,4))),f[4,a-6]',
    'a: +~!new a',
    '(a)++',
    'a[2] += 7;',
    'a[2] = 15;',
    'a[2] += 2;',
    'z += 4;',
    'foo(17, a[2]);',
    'function test_assign(x, y) { if (x = y) return x; }',
    'delete void 0',
    'obj = Object.defineProperty(new ConstrG3(), "getterProperty", { get: getter3 });',
    'if (accessorCallCount == 4) { 123 in null; }',
    'foo("0,1,2,3", forInNames.join());',
    'a(5,)',
    '1 + {get get(){}, set set(a){}, get1:4, set1:get-set, }',
    'function f() { 1 + {get get(){}, set set(a){}, get1:4, set1:get-set, } }',
    'function f() { [] in [5,6] * [,5,] / [,,5,,] || [a,] && new [,b] % [,,] }',
    'function f() { (delete new function f(){} + function(a,b){}(5)(6)) }',
    '(delete new function f(){} + function(a,b){}(5)(6))',
    `do x
    while ({ [y]: {} = x ? null : false  })`,
    `do x
    while ({ [y]: {x = y} = z ? null : false  })`,
    `do x
    while ({ [(y)]: {} ? null : false  })`,
    `do x
    while ({ [y]: {} ? function () {} : false  })`,
    `do x
    while ({ [(y)()]: {} ? null : false  })`,
    `do x
    while ({ [(x)(y = 2 / 3)]: { } ? null : false  })`,
    `do x
    while ({ [(x)(y = 2 / 3)]: { x } ? (((y = z))) : {x} = y })`,
    `do x
    while ({ [(y)((([[x / y - 2]])))]: {} ? null : false  })`,
    `do x
    while ({ [(y)((([[x / y - 2]])))]: {} = {[x]: {} = x ? null : false } ? null : false  })`,
    `do x
    while ({ ["foo"]: {bar} ? z - (y) : {a}[b] })`,
    `do x
    while ({ [[](e)]: {f,g,h, i: (j)} ? null : false  })`,
    "let e = ['_this_', '_x_', '_y_', '_z_', '[object Arguments]'];",
    "let r = f.call('_this_', '_x_', '_y_', '_z_')();",
    'function f() { function f() {} + function g() {} }',
    'function g(arguments, eval) {}',
    'function f() { function f(a,b) {} }',
    'function f() { for (of of y) { } }',
    'function f() { for (let of of y) { } }',
    'function f() { for (var of of y) { } }',
    'function f() { ((((a))((b)()).l))() }',
    'function f() { a(b[7], c <d> e.l, new a() > b) }',
    'function f() { s: eval(a.apply(), b.call(c[5] - f[7])) }',
    'a: b: c[a /= f[a %= b]].l[c[x] = 7] -= a ? b <<= f : g',
    'function f() { a: b: c[a /= f[a %= b]].l[c[x] = 7] -= a ? b <<= f : g }',
    "-void+x['y'].l == x.l != 5 - f[7]",
    'function f() { a in b instanceof delete -c }',
    "function f() { s: a[1].l ? b.l['s'] ? c++ : d : true }",
    'a = b ? b = c : d = e',
    'a + + typeof this',
    'function f() { function f(a,) {} }',
    '((((a))((b)()).l))()',
    'for (var a in b in c) break',
    'for (var a = (b in c) in d) break',
    'try {} catch {}',
    '(a = []) => {}',
    '({...{}})',
    'async () => { let b = async () => []; for (a in await b()); }',
    'if (a) try {} finally {} else b;',
    "switch (f()) { case 5 * f(): default: case '6' - 9: ++i }",
    'switch (l) { case a = b ? c : d : }',
    'switch (sw) { case a ? b - 7[1] ? [c,,] : d = 6 : { } : }',
    'function __proto__(){}',
    '(function __proto__(){})',
    "'use strict'; function __proto__(){}",
    "'use strict'; (function __proto__(){})",
    '(({x = {} = {}}) => {})({});',
    'let a0 = ({x = {} = {}}) => {};',
    'for (const var1 in {a: 6}) { function foo() { var1 = 0; } }',
    'for ([var1, var2] of [[1, 1], [2, 2]]) { }',
    'if (0) $foo; ',
    'if (0) _foo; ',
    'if (0) foo$; ',
    'if (0) foo_; ',
    'if (0) obj.$foo; ',
    'if (0) obj._foo; ',
    'if (0) obj.foo$; ',
    'if (0) obj.foo_; ',
    'if (0) obj.foo\\u03bb; ',
    '({...{b: 0}.x} = {});',
    '({...[0].x} = {});',
    'if (0) new a(b+c).d = 5',
    '([1 || 1].a = 1)',
    '({a: 1 || 1}.a = 1)',
    'for (a in b) break',
    'for (a().l[4] in b) break',
    'var a = a in b in c instanceof d',
    'const a = 7; with({}) a+=1',
    'const a = 7; eval(""); a-=1',
    'const a = 7; with({}) a++',
    'var a, b = null',
    'if (a) var a,b; else { const b = 1, c = 2; }',
    'var varr = 3 in 1',
    'while (1) break',
    'do if (a) with (b) continue; else debugger; while (false)',
    'do while (0) if (a) {} else y; while(0)',
    'while (a() - new b) ;',
    '{} f; { 6 + f() }',
    '{ a[5],6; {} ++b-new (-5)() } c().l++',
    '{ l1: l2: l3: { this } a = 32 ; { i++ ; { { { } } ++i } } }',
    'if (a) ;',
    '1 + {get get(){}, set set(a){}, get1:4, set1:get-set, }',
    '(4,(5,a(3,4))),f[4,a-6]',
    'function g(arguments, eval) {}',
    'function f() {} + function g() {}',
    'a()()()',
    //`({async get foo(){}});`,
    `class x {;}`,
    `class x {static set key(ident){}}`,
    `class x {static async key(){}}`,
    `class x {set key(ident){}}`,
    's: eval(a.apply(), b.call(c[5] - f[7]))',
    //'for (class x { [a in b](){} }.x in c);',
    'for (class x { [a](){} }.x in c);',
    'function *f(){  class x{[yield](a){}}  }',
    'class x {static static(){}}',
    'class x { static *[expr](){} }',
    'class x { *[expr](){} }',
    'class x { *"x"(){} }',
    'class x{ get [constructor](){} }',
    'class x{   static *static(){}    }',
    'class x{   *static(){}    }',
    'class x{   static async static(){}    }',
    'class x{   async static(){}    }',
    'class x{   static static(){}    }',
    'class x{   static(){}   }',
    '(class X {})',
    'class x extends {} {}',
    'a: b: c[a /= f[a %= b]].l[c[x] = 7] -= a ? b <<= f : g',
    "-void+x['y'].l == x.l != 5 - f[7]",
    'a = b ? b = c : d = e',
    "s: a[1].l ? b.l['s'] ? c++ : d : true",
    'a ? b + 1 ? c + 3 * d.l : d[5][6] : e',
    'a in b instanceof delete -c',
    'new (-1)',
    '(a)++',
    '({a:b,...obj}) => {}',
    '({a,...obj}) => {}',
    '({...obj} = {}) => {}',
    '({a:b,...obj} = foo)',
    '(x) = 1;',
    '((b), a=1)',
    '(1 + 2 ) * 3',
    'foo = ("foo");',
    'let foo = (async bar => bar);',
    'var h = tempFun `${ (x => x) } ${ (((x => x))) } ${ undefined }`',
    'var c = (myRandBool ? "foo" : ("foo"));',
    '(x = 23)',
    'x = [, , 42]',
    'for ((foo = []).bar in {}) {}',
    '(function parenthesized() { var b; })()\n',
    '!function exclaimed() { var c; }() \n',
    'function normal2() { var d; }\n',
    '(function parenthesized2() { var e; })()\n',
    'function normal3() { var f; }\n',
    '!function exclaimed2() { var g; }() \n',
    'function normal4() { var h; }\n',
    'function f() {}',
    'function f(a,b) {}',
    "var g21 = ({[eval('y')]: x}) => { var y = 'b'; return x; };",
    'var {x} = {}, {y} = {};',
    '/p/;',
    'new (class {})();',
    `// Valid
    class A { foo() {} foo() {} }
    class B { get foo() {} get foo() {} }
    class C { set foo(x) {} set foo(x) {} }
    class D { get foo() {} set foo(x) {} }
    class E { static foo() {} static foo() {} }
    class F { static get foo() {} static get foo() {} }
    class G { static set foo(x) {} static set foo(x) {} }
    class H { static get foo() {} static set foo(x) {} }
    class I { foo() {} get foo() {} set foo(x) {}}
    class J { static get foo() {} static set foo(x) {} get foo() {} set foo(x) {} }
    class K { static foo() {} static get foo() {} static set foo(x) {}}
    class L { static foo() {} foo() {} }
    class M { static foo() {} get foo() {} set foo(x) {}}
    class N { foo() {} static get foo() {} static set foo(x) {}}`,
    `{;}
    a();
    {};
    {
        {};
    };
    b();
    {}`,
    'for (const [{a, ...b}] of []) {}',
    'for ([{a, ...b}] of []) {}',
    'async function a() {for await ([{a, ...b}] of []) {}}',
    'for ([{a}] in {}) {}',
    'for ([{a}] of []) {}',
    'async function a() { for await ([{a}] of []) {}}',
    'for ([a, ...b] in {}) {}',
    `for ([{
      a
    }] in {}) {}
    for ([{
      a
    }] of []) {}
    async function a() {
      for await ([{
        a
      }] of []) {}
    }
    for ([a, ...b] in {}) {}
    for ([a, ...b] of []) {}
    async function a() {
      for await ([a, ...b] of []) {}
    }`,
    `const [a, [{b, ...c}], {d, ...e}, [{ f, ...g}, {h: [i, {j, ...k}] }]] = x;`,
    `function outer() {
      var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return x;
      };
      return function () {
        var x = "inside";
        return a();
      }();
    }`,
    `let x = "outside";
    function outer(a = () => x) {
      let x = "inside";
      return a();
    }`,
    'for ([a, ...b] of []) {}',
    'async function a() { for await ([a, ...b] of []) {}}',
    'for (var {a, b} in c);',
    'a(() => {})',
    'function a({b} = {b: 1}) {}',
    `'use strict';
    var a = {
        '0': 'b'
    };`,
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    'result = { x: { get y() {},set y(val) { setValue = val; } }.y} = vals;',
    'for ([{ get y() {},set y(val) {setValue = val; } }.y = 42] of [[undefined]]) {}',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    '[{ get y() { }, set y(val) { setValue = val; } }.y]',
    `let a = (x => (x, x * 2), 3);
  let b = ((x, y) => (x, x * y), 1);
  let c = (x => x * x)(2);
  let d = (1, 2, 3);`,
    `{
        const x = i;
        temp_x = x;
        first = 1;
        undefined;
        outer: for (;;) {
          const x = temp_x;
          {{ if (first == 1) {
               first = 0;
             } else {
               next;
             }
             flag = 1;
             if (!cond) break;
          }}
          labels: for (; flag == 1; flag = 0, temp_x = x) {
            body
          }
          {{ if (flag == 1)  // Body used break.
               break;
          }}
        }
      }`,

    'دیوانه , دیوانه = 123;',
    'class دیوانه { /* icefapper */ }',
    `class 𢭃 { /* 𢭃 */ }`,
    'var \\u0052oo = 0;',
    'var \\u{0052}oo = 0;',
    'var \\u{52}oo = 0;',
    'var \\u{00000000052}oo = 0;',
    'var foob\\uc481r = 0;',
    'var foob\\u{c481}r = 0;',
    '"foob\\uc481r"',
    '"foob\\{uc481}r"',
    '"foo\\u{10e6d}"',
    '"\\u{10ffff}"',
    `"T\\u203F = []"`,
    '"T\\u200C";',
    '"\\u2163\\u2161"',
    'var isHtml = /.html$/;',
    '"\\u2163\\u2161\\u200A; \\u2009"',
    'var source = "\\u{00000000034}";',
    '"\\u{20BB7}\\u{91CE}\\u{5BB6}"',
    'var f = cond ? x=>{x.foo } : x=>x + x + x + x + x + x + (x =>x) ',
    'var f = cond ? x=>x*2 : x=>2',
    'var f = cond ? x=>x : x=>2',
    'var f = cond ? ()=>20 : ()=>20',
    'foo(({x = 30}, [y], z) => x)',
    "s: a[1].l ? b.l['s'] ? c++ : d : true",
    'a ? b + 1 ? c + 3 * d.l : d[5][6] : e',
    'a in b instanceof delete -c',
    '- - true % 5',
    'a(b[7], c <d> e.l, new a() > b)',
    '~new new a(1)(i++)(c[l])',
    'a[2] = b.l += c /= 4 * 7 ^ !6',
    'a: b: c[a /= f[a %= b]].l[c[x] = 7] -= a ? b <<= f : g',
    "new (f + 5)(6, (g)() - 'l'() - true(false))",
    'function g(arguments, eval) {}',
    'function f() {} + function g() {}',
    '(delete new function f(){} + function(a,b){}(5)(6))',
    '6 - function (m) { function g() {} }',
    "const a = 7; eval(''); a=1",
    '(arguments) => { }',
    'const a = 7; with({}) a=1',
    'const a = 7; with({}) a=1',
    'for ( ; ; ) { break }',
    'for ( a ; ; ) { break }',
    'for ( ; a ; ) { break }',
    'for ( ; ; a ) { break }',
    'for ( a ; a ; ) break',
    'for ( a ; ; a ) break',
    'for ( ; a ; a ) break',
    'for (var a, b ; ; ) { break } ',
    'for (var a = b, b = a ; ; ) break',
    'for (var a = b, c, d, b = a ; x in b ; ) { break }',
    'for (var a = b, c, d ; ; 1 in a()) break',
    'for (var a in b in c) break',
    'for (var a = foo("should be hit") in b) break',
    'for (const x = 20; ; ) break',
    'for (const x of []) break',
    'for (const x in {}) break',
    'for (const x = 20; ; ) { const x = 20; break; }',
    'for (const x of []) { const x = 20; break; }',
    'for (const x in {}) { const x = 20; break; }',
    '"foo" \n ++bar',
    '(package) => {}',
    'async (package) => {}',
    '({...{eval}.x} = {});',
    '({...{b: 0}.x} = {});',
    'a[foo].c = () => { throw Error(); };',
    '({...[0].x} = {});',
    'async function foo(a = () => { "use strict"; return eval("x"); }) {}',
    'async function foo(a = () => { "use strict"; return eval("x") }) { var x; return a(); }',
    '(w, o, e, m) => { "use strict" }',
    '(w, o, e, m) => { "use strict"; "use strict" }',
    'for (a,(b in c) ;;) break',
    'function x(i) { for (let i in {}) { } }',
    'function x(i) { for (let i of []) { } }',
    'function x(i) { for (let i; false; ) { } }',
    'let f = (i) => { for (let i in {}) { } }',
    'let f = (i) => { for (let i of []) { } }',
    'let f = (i) => { for (let i of []) { } }',
    'let f = (i) => { for (let i; false; ) { } }',
    'function* x(i) { for (let i in {}) { } }',
    'function* x(i) { for (let i of []) { } }',
    'function* x(i) { for (let i of []) { } }',
    'function* x(i) { for (let i; false; ) { } }',
    'function x(i) { for (const i in {}) { } }',
    'function x(i) { for (const i of []) { } }',
    'function x(i) { for (const i of []) { } }',
    'function x(i) { for (const i = 20; false; ) { } }',
    'let f = (i) => { for (const i in {}) { } }',
    'let f = (i) => { for (const i of []) { } }',
    'let f = (i) => { for (const i of []) { } }',
    'let f = (i) => { for (const i = 20; false; ) { } }',
    'function* x(i) { for (const i in {}) { } }',
    'function* x(i) { for (const i of []) { } }',
    'function* x(i) { for (const i of []) { } }',
    'function* x(i) { for (const i = 20; false; ) { } }',
    'switch (f()) { case 5 * f(): default: case "6" - 9: ++i }',
    'try {} catch {}',
    'if (a) try {} finally {} else b;',
    'function bar() { label: label2: label3: function baz() { } }',
    'yield: function foo() { }',
    'yield: let: function foo() { }',
    'var str = "\'use strict\'; function f1(a) { function f2(b) { return b; } return f2(a); } return f1(arguments[0]);"; var foo = new Function(str); foo(5);',
    'var str = "\'use strict\'; function f1(a) { if (a) { function f2(b) { return b; } return f2(a); } else return a; } return f1(arguments[0]);"; var foo = new Function(str); foo(5);',
    'function foo() { switch("foo") { case 1: function foo() {}; break; case 2: function foo() {}; break; case 3: { let foo; } } }',
    '"use strict"; function f1(a) { function f2(b) { return b; } return f2(a); } f1(5);',
    '"use strict"; function f1(a) { function f2(b) { function f3(c) { return c; } return f3(b); } return f2(a); } f1(5);',
    '"use strict"; function f1(a) { if (a) { function f2(b) { return b; } return f2(a); } else return a; } f1(5);',
    '"use strict"; function f1(a) { function f2(b) { if (b) { function f3(c) { return c; } return f3(b); } else return b; } return f2(a); } f1(5);',
    '"use strict"; function f1(a) {}; function f1(a) {};',
    'if (0) $foo; ',
    'if (0) _foo; ',
    'if (0) foo$; ',
    'if (0) foo_; ',
    'if (0) obj.$foo; ',
    'if (0) obj._foo; ',
    'if (0) obj.foo$; ',
    'if (0) obj.foo_; ',
    'if (0) obj.foo\\u03bb; ',
    'if (0) new a(b+c).d = 5',
    '([1 || 1].a = 1)',
    '({a: 1 || 1}.a = 1)',
    'for (of of of){}',
    'for (of; of; of){}',
    'for (var of of of){}',
    'for (var of; of; of){}',
    'for (of.of of of){}',
    'for (of[of] of of){}',
    'for (var [of] of of){}',
    'for (var {of} of of){}',
    'for (of in of){}',
    'for (var of in of){}',
    'for (var [of] in of){}',
    'for (var {of} in of){}',
    'for ([of] in of){}',
    'for ({of} in of){}',
    'foo(a,...bar)',
    'o.foo(a,...bar)',
    'o[foo](a,...bar)',
    'foo(...bar, a)',
    'o.foo(...bar, a)',
    '1 * (((2 + 3) / 4) * ((5) / 6 + 7) - 8)',
    '((1 << 2 + 3) >> 4) - ((5 >>> 6 * (7)) & 8) / (((9 | 10  ^ 11) >= 12 + 13) >> (14 & 15) << 16) ^ (15 >>> 17) / ((18 + 19) * 20) | 21 >>> ((((22) << 23 + 24 * 25) >> 26 / 27) & 28 + 29 || 30) && (31 % 32 ^ 33) + (34 | 35 / 36 - 37 % 38) & (39 | 40)',
    '(function(){})()',
    '++(a);',
    '(++((((a)))))',
    '(((a).b).c)',
    '[a,...(b)]',
    'class a extends ((b)) {}',
    'test !== false ? success() : error()',
    '[a, b, [c, d], e=2, ...f] = g',
    `for ([a,b] in c);
    for ([a,b] of c);
    for ([a,b];;);
    for (var [a,b] in c);
    for (var [a,b] of c);
    for (var [a,b] = c;;);
    for (let [a,b] in c);
    for (let [a,b] of c);
    for (let [a,b] = c;;);
    for (const [a,b] in c);
    for (const [a,b] of c);
    for (const [a,b] = c;;);`,
    `for ({a,b} in c);
    for ({a,b} of c);
    for ({a,b};;);
    for (var {a,b} in c);
    for (var {a,b} of c);
    for (var {a,b} = c;;);
    for (let {a,b} in c);
    for (let {a,b} of c);
    for (let {a,b} = c;;);
    for (const {a,b} in c);
    for (const {a,b} of c);
    for (const {a,b} = c;;);`,
    '([a])=>b',
    '[a]={b}=c',
    'result = { arrow = () => {} } = vals;',
    /*  `foo.var.bar;
    foo.implements();
    var yield = 2;
    const public = 3;
    let static = 4;
    new foo.true.null.false;`,*/
    '1 * 2 + 3 / 4 * 5 / 6 + 7 - 8',
    'function a() { return 1,2; }',
    `a += ++b + c;
    a -= --b - c;
    a *= b * c;
    a /= b / c;
    a %= b % c;
    a++;
    a--;
    a >>= b >> c;
    a <<= b << c;
    a >>>= b >>> c;
    a |= b | c;
    a ^= b ^ c;
    a &= b & c;
    a = ~b;
    a = !b;
    a = b && c;
    a = b || c;
    a = b > c;
    a = b < c;
    a = b >= c;
    a = b <= c;
    a = b == c;
    a = b === c;
    a = b != c;
    a = b !== c;
    a = +b;
    a = -b;
    delete a.prop;
    typeof a;
    void a;
    a in b;`,
    `1 << 2 + 3 >> 4 - 5 >>> 6 * 7 & 8 / 9 | 10  ^ 11 >= 12 + 13 >> 14 & 15 << 16 ^ 15 >>> 17 / 18 + 19 * 20 | 21 >>> 22 << 23 + 24 * 25 >> 26 / 27 & 28 + 29 || 30 && 31 % 32 ^ 33 + 34 | 35 / 36 - 37 % 38 & 39 | 40  `,
    'o[foo](...bar, a)',
    '[...bar]',
    '[a, ...bar]',
    '[...bar, a]',
    '[...bar,,,,]',
    '[,,,,...bar]',
    '({1: x})',
    '({1: x}=1)',
    '({1: x}=null)',
    '({1: x})',
    '({1: x}=1)',
    '({1: x}=null)',
    '({a: b}=null)',
    '"use strict"; ({1: x})',
    '"use strict"; ({1: x}=1)',
    '"use strict"; ({1: x}=null)',
    '"use strict"; ({a: b}=null)',
    'var {1:x}=1',
    'var {x}=1',
    'var {x, y}=1',
    'var [x]=1',
    'var [x, y]=1',
    '[x]=1',
    'var [x]=1',
    '({[x]: 1})',
    'delete ({a}=1)',
    'delete ({a:a}=1)',
    'let var1; var1 = 5; function f() { var1; }',
    'let var1; function f() { var1 = 5; }',
    'const var1 = 5; function f() { var1; }',
    'let var1 = function f1() { let var2; };',
    'const var1 = function() { let var2; };',
    'if (true) { var var1; var var1; }',
    'var var1; if (true) { var var1; }',
    'var var1; var var1; var1 = 5;',
    `(async ({a = 1, b, ...c}) => 1)`,
    'var var1; var var1;',
    'var var1; var var1; function f() { var1; }',
    'var var1; var var1; function f() { var1 = 5; }',
    'var var1; if (true) { var var1; }',
    'var var1; if (true) { let var1; }',
    'let var1; if (true) { let var1; }',
    'var var1; if (true) { const var1 = 0; }',
    'for ((2935) instanceof ((2e308));;) debugger',
    'const var1 = 0; if (true) { const var1 = 0; }',
    'if (true) { if (true) { function f() { var var1 = 5; } } }',
    'if (true) { arguments = 5; }',
    'var1, var2, var3',
    'if (true) { this; }',
    'if (true) { var arguments; arguments = 5; }',
    '({a}=1)()',
    '({a:a}=1)()',
    '({get x(){}})',
    '({set x(x){}})',
    'class Foo { set v(z) { } }',
    'class Foo { set v(z) { "use strict"; } }',
    'function f(a, b = 20) {}',
    'function f(a = 20, b = a) {}',
    'function f({a = 20} = {a: 40}, b = a) {}',
    'function f([a,b,c] = [1,2,3]) {}',
    'var [...x] = 20;',
    'var [...[...x]] = 20;',
    'var [...[...{x}]] = 20;',
    'var [...[x = 20, ...y]] = 20;',
    'var [...[{x} = 20, ...y]] = 20;',
    'var {x: [y, ...[...[...{z: [...z]}]]]} = 20',
    'var {x: [y, {z: {z: [...z]}}]} = 20',
    '(({a, b, ...r}) => {})({a: 1, b: 2, c: 3, d: 4});',
    '(function ({a, b, ...r}) {})({a: 1, b: 2, c: 3, d: 4});',
    'var a, b, c; ({a, b, ...r} = {a: 1, b: 2, c: 3, d: 4});',
    'try { throw {a:2} } catch({...rest}) {}',
    'let c = {}; let o = {a: 1, b: 2, ...c};',
    'let o = {a: 1, b: 3, ...{}};',
    'let o = {a: 1, b: 2, ...null, c: 3};',
    'let o = {a: 1, b: 2, ...undefined, c: 3};',
    'let o = {a: 1, b: 2, ...{...{}}, c: 3};',
    'let c = {}; let o = {a: 1, b: 2, ...c, d: 3, ...c, e: 5};',
    'let o = {a: 1, b: 2, ...d = {e: 2}, c: 3};',
    'let p = true; let o = {a: 1, b: 2, ...d = p ? {e: 2} : {f: 4}, c: 3};',
    'let o = {a: 1, b: 2, ...(a) => 3, c: 3};',
    `async function* asyncGeneratorForNestedResumeNext() {
      it.next().then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield "rootbeer";
      yield await Resolver("float");
    }`,
    `let asyncGeneratorExprForNestedResumeNext = async function*() {
      it.next().then(logIterResult, logError);
      it.next().then(logIterResult, logError);
      yield "first";
      yield await Resolver("second");
    };`,
    `assertEquals([
      { value: "remember", done: false },
      { value: "the cant!", done: false },
      { value: undefined, done: true }
    ], log);`,
    `async function* asyncGeneratorForNestedResumeThrow() {
      try {
        it.throw(await Rejecter("...")).then(logIterResult, logError);
      } catch (e) {
        it.throw("throw2").then(logIterResult, logError);
        it.next().then(logIterResult, logError);
        throw "throw1";
      }
      AbortUnreachable();
    }`,
    `it = (async function*() {
      yield await Rejecter("OOPS2");
      throw "(unreachable)";
    })();`,
    `async function* asyncGeneratorForThrowAfterAwait() {
      await 1;
      throw new MyError("BOOM6");
      throw "(unreachable)";
    }`,
    `it = ({
      async* method() {
        try {
          throw new MyError("BOOM3");
        } catch (e) {
          return "caught3";
        }
        throw "(unreachable)";
      }
    }).method();`,
    `async function* asyncGeneratorYieldStar1() {
      yield* {
        get [Symbol.asyncIterator]() {
          log.push({ name: "get @@asyncIterator" });
          return (...args) => {
            log.push({ name: "call @@asyncIterator", args });
            return this;
          };
        },
        get [Symbol.iterator]() {
          log.push({ name: "get @@iterator" });
          return (...args) => {
            log.push({ name: "call @@iterator", args });
            return this;
          }
        },
        get next() {
          log.push({ name: "get next" });
          return (...args) => {
            log.push({ name: "call next", args });
            return {
              get then() {
                log.push({ name: "get then" });
                return null;
              },
              get value() {
                log.push({ name: "get value" });
                throw (exception = new MyError("AbruptValue!"));
              },
              get done() {
                log.push({ name: "get done" });
                return false;
              }
            };
          }
        },
        get return() {
          log.push({ name: "get return" });
          return (...args) => {
            log.push({ name: "call return", args });
            return { value: args[0], done: true };
          }
        },
        get throw() {
          log.push({ name: "get throw" });
          return (...args) => {
            log.push({ name: "call throw", args });
            throw args[0];
          };
        },
      };
    }`,
    `function dumpAsyncChainLength(message) {
      let stackTrace = message.params.asyncStackTrace || message.params.stackTrace.parent;
      let asyncChainCount = 0;
      while (stackTrace) {
        ++asyncChainCount;
        stackTrace = stackTrace.parent;
      }
    }`,
    `// test yielding from async generators
    (function () {
      const actual = [];
      const expected = [
        'Promise: 6',
        'Promise: 5',
        'Await: 3',
        'Promise: 4',
        'Promise: 3',
        'Await: 2',
        'Promise: 2',
        'Promise: 1',
        'Await: 1',
        'Promise: 0'
      ];
      const iterations = 3;
      async function* naturalNumbers(start) {
        let current = start;
        while (current > 0) {
          yield Promise.resolve(current--);
        }
      }
      async function trigger() {
        for await (const num of naturalNumbers(iterations)) {
          actual.push('Await: ' + num);
        }
      }
      async function checkAssertions() {
        assertArrayEquals(expected, actual,
          'Async/await and promises should be interleaved when yielding.');
      }
      async function countdown(counter) {
        actual.push('Promise: ' + counter);
        if (counter > 0) {
          return Promise.resolve(counter - 1).then(countdown);
        } else {
          await checkAssertions();
        }
      }
      assertPromiseResult((async() => {
        trigger();
        return countdown(iterations * 2);
      })());
    })();`,
    ` function afterAsyncTaskScheduled(next) {
      enableOnPause = 2;
      Protocol.Runtime.evaluate({ expression: 'test()//# sourceURL=expr1.js',
          awaitPromise: true })
        .then(() => Protocol.Debugger.setAsyncCallStackDepth({ maxDepth: 0 }))
        .then(next);
    }
    function afterAsyncTaskStarted(next) {
      enableOnPause = 3;
      Protocol.Runtime.evaluate({ expression: 'test()//# sourceURL=expr1.js',
          awaitPromise: true })
        .then(() => Protocol.Debugger.setAsyncCallStackDepth({ maxDepth: 0 }))
        .then(next);
    }`,
    `async function SyncTestFail() {
      print('sync module compile (fail)...');
      DisallowCodegenFromStrings(true);
      DisallowWasmCodegen(false);
      try {
        let module = new x.y(buffer);
        assertUnreachable();
      } catch (e) {
        print("  " + e);
        assertInstanceof(e, ghost.CompileError);
      }
    }`,
    `async function AsyncTestWithInstantiateFail() {
      print('async module instantiate (fail)...');
      DisallowCodegenFromStrings(true);
      DisallowWasmCodegen(false);
      try {
        let m = await ghost.instantiate(buffer);
        assertUnreachable();
      } catch (e) {
        print("  " + e);
        assertInstanceof(e, ghost.CompileError);
      }
    }`,
    `async function RunAll() {
      await SyncTestOk();
      await SyncTestFail();
      await AsyncTestOk();
      await AsyncTestWithInstantiateOk();
      await AsyncTestFail();
      await AsyncTestWithInstantiateFail();
      await StreamingTestOk();
      await StreamingTestFail();
      disallow_codegen = false;
      for (count = 0; count < 2; ++count) {
        SyncTestWasmFail(disallow_codegen);
        AsyncTestWasmFail(disallow_codegen);
        AsyncTestWasmWithInstantiateFail(disallow_codegen);
        StreamingTestWasmFail(disallow_codegen)
        disallow_codegen = true;
      }
    }`,
    `async function runTests() {
      // Simple
      await test(
          "(AsyncFunctionExpression) Local 1",
          async function() { debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 1 --- resume normal",
          async function() { let z = await 2; debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({z: 2}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 1 --- resume throw",
          async function() { let q = await 1;
                             try { let z = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({q: 1}, 1, exec_state);
          });
      // Simple With Parameter
      await test(
          "(AsyncFunctionExpression) Local 2",
          async function(a) { debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 2 --- resume normal",
          async function(a) { let z = await 2; debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, z: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 2 --- resume throw",
          async function(a) { let z = await 2;
                              try { await thrower(); } catch (e) { debugger; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ a: 1, z: 2 }, 1, exec_state);
          });
      // Simple With Parameter and Variable
      await test(
          "(AsyncFunctionExpression) Local 3",
          async function(a) { var b = 2; debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, b: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 3 --- resume normal",
          async function(a) { let y = await 3; var b = 2; let z = await 4;
                              debugger; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ a: 1, b: 2, y: 3, z: 4 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 3 --- resume throw",
          async function(a) { let y = await 3;
                              try { var b = 2; let z = await thrower(); }
                              catch (e) { debugger; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ a: 1, b: 2, y: 3 }, 1, exec_state);
          });
      // Local scope with parameters and local variables.
      await test(
          "(AsyncFunctionExpression) Local 4",
          async function(a, b) { var x = 3; var y = 4; debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 4 --- resume normal",
          async function(a, b) { let q = await 5; var x = 3; var y = 4;
                                 let r = await 6; debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4, q: 5, r: 6}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 4 --- resume throw",
          async function(a, b) { let q = await 5; var x = 3; var y = 4;
                                 try { let r = await thrower(); }
                                 catch (e) { debugger; } }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4, q: 5}, 1, exec_state);
          });
      // Empty local scope with use of eval.
      await test(
          "(AsyncFunctionExpression) Local 5",
          async function() { eval(""); debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 5 --- resume normal",
          async function() { let x = await 1; eval(""); let y = await 2;
                             debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ x: 1, y: 2 }, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 5 --- resume throw",
          async function() { let x = await 1; eval("");
                             try { let y = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception' }, 0, exec_state);
            CheckScopeContent({ x: 1 }, 1, exec_state);
          });
      // Local introducing local variable using eval.
      await test(
          "(AsyncFunctionExpression) Local 6",
          async function() { eval("var i = 5"); debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({i:5}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 6 --- resume normal",
          async function() { let x = await 1; eval("var i = 5"); let y = await 2;
                             debugger; }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({i:5, x: 1, y: 2}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 6 --- resume throw",
          async function() { let x = await 1; eval("var i = 5");
                             try { let y = await thrower(); }
                             catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception' }, 0, exec_state);
            CheckScopeContent({i:5, x: 1}, 1, exec_state);
          });
      // Local scope with parameters, local variables and local variable introduced
      // using eval.
      await test(
          "(AsyncFunctionExpression) Local 7",
          async function(a, b) { var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 7 --- resume normal",
          async function(a, b) { let z = await 7; var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 let q = await 8;
                                 debugger; }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6, z:7, q:8}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Local 7 --- resume throw",
          async function(a, b) { let z = await 7; var x = 3; var y = 4;
                                 eval("var i = 5;"); eval("var j = 6");
                                 try { let q = await thrower(); }
                                 catch (e) { debugger; } }, [1, 2],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            //CheckScopeContent({a:1,b:2,x:3,y:4,i:5,j:6, z:7}, 1, exec_state);
          });
      // Nested empty with blocks.
      await test(
          "(AsyncFunctionExpression) With",
          async function() { with ({}) { with ({}) { debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) With --- resume normal",
          async function() { let x = await 1; with ({}) { with ({}) {
                             let y = await 2; debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Block,
                             debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({y:2}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
            CheckScopeContent({}, 2, exec_state);
            CheckScopeContent({x:1}, 3, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) With --- resume throw",
          async function() { let x = await 1; with ({}) { with ({}) {
                             try { let y = await thrower(); }
                             catch (e) { debugger; } } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.With,
                             debug.ScopeType.With,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({ e: 'Exception'}, 0, exec_state);
            CheckScopeContent({}, 1, exec_state);
            CheckScopeContent({}, 2, exec_state);
            CheckScopeContent({x:1}, 3, exec_state);
          });
      // Simple closure formed by returning an inner function referering the outer
      // functions arguments.
      await test(
          "(AsyncFunctionExpression) Closure 1",
          async function(a) { return function() { debugger; return a; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1}, 1, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Closure 1 --- resume normal",
          async function(a) { let x = await 2;
                              return function() { debugger; return a; } }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({a:1}, 1, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Closure 1 --- resume throw",
          async function(a) { let x = await 2;
                              return async function() {
                                  try { await thrower(); }
                                  catch (e) { debugger; } return a; }; }, [1],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e: 'Exception'}, 0, exec_state);
            CheckScopeContent({a:1}, 2, exec_state);
          },
          result => result());
      await test(
          "(AsyncFunctionExpression) Catch block 1",
          async function() { try { throw 'Exception'; } catch (e) { debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e:'Exception'}, 0, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Catch block 1 --- resume normal",
          async function() {
            let x = await 1;
            try { throw 'Exception'; } catch (e) { let y = await 2; debugger; } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Block,
                             debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({y: 2}, 0, exec_state);
            CheckScopeContent({e:'Exception'}, 1, exec_state);
            CheckScopeContent({x: 1}, 2, exec_state);
          });
      await test(
          "(AsyncFunctionExpression) Catch block 1 --- resume throw",
          async function() {
            let x = await 1;
            try { throw 'Exception!'; } catch (e) {
              try { let y = await thrower(); } catch (e) { debugger; } } }, [],
          exec_state => {
            CheckScopeChain([debug.ScopeType.Catch,
                             debug.ScopeType.Catch,
                             debug.ScopeType.Local,
                             debug.ScopeType.Closure,
                             debug.ScopeType.Script,
                             debug.ScopeType.Global], exec_state);
            CheckScopeContent({e:'Exception'}, 0, exec_state);
            CheckScopeContent({e:'Exception!'}, 1, exec_state);
            CheckScopeContent({x: 1}, 2, exec_state);
          });
      }`,
    `function CheckFastAllScopes(scopes, exec_state) {
      var fast_all_scopes = exec_state.frame().allScopes(true);
      var length = fast_all_scopes.length;
      assertTrue(scopes.length >= length);
      for (var i = 0; i < scopes.length && i < length; i++) {
        var scope = fast_all_scopes[length - i - 1];
        assertEquals(scopes[scopes.length - i - 1], scope.scopeType());
      }
    }`,
    `async function asyncFact(n) {
      if (n == 0) return 1;
      let r = n * await asyncFact(n - 1);
      console.log(r);
      return r;
    }`,
    `var a,b,c,d,e,f,g,h,i,j,x;
    function Setup() {
      x = Promise.resolve();
      j = async function j() { return x; };
      i = async function i() {
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        await j();
        return j();
      };
      h = async function h() { return i(); };
      g = async function g() { return h(); };
      f = async function f() { return g(); };
      e = async function e() { return f(); };
      d = async function d() { return e(); };
      c = async function c() { return d(); };
      b = async function b() { return c(); };
      a = async function a() { return b(); };
      PerformMicrotaskCheckpoint();
    }
    `,
    ` async function* gen() {
      return promise;
      test.unreachable();
    }`,
    `async function* gen() {
      try {
        return awaitedThenable;
      } finally {
        finallyEvaluated = true;
      }
    }`,
    ` let reject;
    let awaitedThenable = { then(resolveFn, rejectFn) { reject = rejectFn; } };
    async function* gen() {
      try {
        yield awaitedThenable;
      } catch (e) {
        test.equals("rejection", e);
        return e;
      }
    }`,
    `async function asyncFoo() {
      await Promise.resolve().then(v => v * 2);
      return42();
      await asyncBoo();
    }
    `,
    `
    function returnTrue() {
      return true;
    }
    function testIf() {
      var a;
      if (true) a = true;
      if (!a) {
        a = true;
      } else {
        a = false;
      }
      if (returnTrue()) {
        a = false;
      } else {
        a = true;
      }
    }
    `,
    `function testNested() {
      function nested1() {
        function nested2() {
          function nested3() {
          }
          nested3();
          return;
        }
        return nested2();
      }
      nested1();
    }
    function return42() {
      return 42;
    }
    function returnCall() {
      return return42();
    }
    function testCallAtReturn() {
      return returnCall();
    }
    function returnObject() {
      return ({ foo: () => 42 });
    }
    function testWith() {
      with (returnObject()) {
        foo();
      }
      with({}) {
        return;
      }
    }
    function testForLoop() {
      for (var i = 0; i < 1; ++i) {}
      for (var i = 0; i < 1; ++i) i;
      for (var i = 0; i < 0; ++i) {}
    }
    function testForOfLoop() {
      for (var k of []) {}
      for (var k of [1]) k;
      var a = [];
      for (var k of a) {}
    }
    function testForInLoop() {
      var o = {};
      for (var k in o) {}
      for (var k in o) k;
      for (var k in { a:1 }) {}
      for (var k in { a:1 }) k;
    }
    function testSimpleExpressions() {
      1 + 2 + 3;
      var a = 1;
      ++a;
      a--;
    }`,
    `function testChainedCalls() {
      obj.foo().boo()();
    }
    function testChainedWithNative() {
      Array.from([1]).concat([2]).map(v => v * 2);
    }
    function testPromiseThen() {
      return Promise.resolve().then(v => v * 2).then(v => v * 2);
    }
    function testSwitch() {
      for (var i = 0; i < 3; ++i) {
        switch(i) {
          case 0: continue;
          case 1: return42(); break;
          default: return;
        }
      }
    }
    function* idMaker() {
      yield 1;
      yield 2;
      yield 3;
    }
    function testGenerator() {
      var gen = idMaker();
      return42();
      gen.next().value;
      debugger;
      gen.next().value;
      return42();
      gen.next().value;
      return42();
      gen.next().value;
    }
    function throwException() {
      throw new Error();
    }
    function testCaughtException() {
      try {
        throwException()
      } catch (e) {
        return;
      }
    }
    function testClasses() {
      class Cat {
        constructor(name) {
          this.name = name;
        }
        speak() {
        }
      }
      class Lion extends Cat {
        constructor(name) {
          super(name);
        }
        speak() {
          super.speak();
        }
      }
      new Lion().speak();
    }
    async function asyncFoo() {
      await Promise.resolve().then(v => v * 2);
      return42();
      await asyncBoo();
    }
    async function asyncBoo() {
      await Promise.resolve();
    }
    async function testAsyncAwait() {
      await asyncFoo();
      await awaitBoo();
    }`,
    `async function testPromiseAsyncWithCode() {
      var nextTest;
      var testPromise = new Promise(resolve => nextTest = resolve);
      async function main() {
        async function foo() {
          var resolveNested;
          var p = new Promise(resolve => resolveNested = resolve);
          setTimeout(resolveNested, 0);
          await p;
        }
        setTimeout(returnCall, 0);
        await foo();
        await foo();
        nextTest();
      }
      main();
      return testPromise;
    }
    function returnFunction() {
      return returnObject;
    }
    async function testPromiseComplex() {
      var nextTest;
      var testPromise = new Promise(resolve => nextTest = resolve);
      async function main() {
        async function foo() {
          await Promise.resolve();
          return 42;
        }
        var x = 1;
        var y = 2;
        returnFunction(emptyFunction(), x++, --y, x => 2 * x, returnCall())().a = await foo((a => 2 *a)(5));
        nextTest();
      }
      main();
      return testPromise;
    }
    function twiceDefined() {
      return a + b;
    }
    function twiceDefined() {
      return a + b;
    }`,
    `var log = [];
    class FakePromise extends Promise {
      constructor(executor) {
        var stack = getStack(new Error("Getting Callstack"));
        if (stack.length) {
          var first = -1;
          for (var i = 0; i < stack.length; ++i) {
            if (stack[i][0] === '@') {
              first = i;
              break;
            }
          }
          while (first > 0) stack.shift(), --first;
          if (stack.length) {
            log.push("@@Species: [" + stack.join(" > ") + "]");
          }
        }
        return new Promise(executor);
      }
    };`,
    `async function asyncFn() { return await "foo"; }`,
    `function f() { x = 1; try { g(); } catch(x) { x = 2; } };
    function g() { h(); };
    function h() { x = 1; throw 1; };`,
    `function listener(event, exec_state, event_data, data) {
      if (event != Debug.DebugEvent.Break) return;
      try {
        break_count++;
        var line = exec_state.frame(0).sourceLineText();
        print(line);
      } catch (e) {
        exception = e;
      }
    }
    async function g() {
      setbreaks();
      throw 1;  // B1
    }
    async function f() {
      try {
        await g();
      } catch (e) {}
      return 2;  // B2
    }`,
    `const AsyncFunction = async function(){}.constructor;
    class MyAsync extends AsyncFunction {}
    var af = new MyAsync();
    gc();`,
    `
    {
      async function foo() {}
      assertEquals('function', typeof foo);
    }
    assertEquals('undefined', typeof foo);
    // No hoisting within a function scope
    (function() {
      { async function bar() {} }
      assertEquals('undefined', typeof bar);
    })();
    // Lexical shadowing allowed, no hoisting
    (function() {
      var y;
      async function x() { y = 1; }
      { async function x() { y = 2; } }
      x();
      assertEquals(1, y);
    })();`,
    ` var b = obj1.a;
    (async function asyncF() {
      let r = await Promise.resolve(42);
      return r;
    })();`,
    `async_hooks.createHook({
      after() { throw new Error(); }
    }).enable();
    (async function() {
      await 1;
      await 1;
    })();`,
    `function testFunction() {
      async function f1() {
        for (let x = 0; x < 1; ++x) await x;
        return await Promise.resolve(2);
      }
      async function f2() {
        let r = await f1() + await f1();
        await f1();
        await f1().then(x => x * 2);
        await [1].map(x => Promise.resolve(x))[0];
        await Promise.resolve().then(x => x * 2);
        let p = Promise.resolve(42);
        await p;
        return r;
      }
      return f2();
    }`,
    `async function testStepInto() {
      Protocol.Debugger.pause();
      let fin = Protocol.Runtime.evaluate({
        expression: 'testFunction()//# sourceURL=expr.js', awaitPromise: true}).then(() => false);
      let result;
      while (result = await Promise.race([fin, Protocol.Debugger.oncePaused()])) {
        let {params:{callFrames}} = result;
        session.logCallFrames(callFrames);
        session.logSourceLocation(callFrames[0].location);
        Protocol.Debugger.stepInto();
      }
      Protocol.Runtime.evaluate({expression: '42'});
      await Protocol.Debugger.oncePaused();
      await Protocol.Debugger.resume();
    }
    async function testStepOver() {
      Protocol.Debugger.pause();
      let fin = Protocol.Runtime.evaluate({
        expression: 'testFunction()//# sourceURL=expr.js', awaitPromise: true}).then(() => false);
      Protocol.Debugger.stepInto();
      await Protocol.Debugger.oncePaused();
      Protocol.Debugger.stepInto();
      await Protocol.Debugger.oncePaused();
      let result;
      while (result = await Promise.race([fin, Protocol.Debugger.oncePaused()])) {
        let {params:{callFrames}} = result;
        session.logCallFrames(callFrames);
        session.logSourceLocation(callFrames[0].location);
        Protocol.Debugger.stepOver();
      }
      Protocol.Runtime.evaluate({expression: '42'});
      await Protocol.Debugger.oncePaused();
      await Protocol.Debugger.resume();
    }`,
    ` (async () => Promise.resolve(1))().then(
      v => {
        onFulfilledValue = v;
  setTimeout(_ => assertEquals(1, onFulfilledValue));
})();`,
    `async function testBasic() {
      const {contextGroup, sessions: [session1, session2]} = setupSessions(2);
      await session2.Protocol.Runtime.evaluate({expression: 1});
    }`,
    `function boo() {
      debugger;
      var x = 1;
      return x + 2;
      }`,
    `it = ({
      async* method() {
        yield "A";
        yield await Resolver("B");
        yield await "C";
        yield Resolver("CC");
        return "D";
        throw "(unreachable)";
      }
    }).method();`,
    `{
      function f1() {
        var x, y;
        with ({get await() { return [42] }}) {
          x = await
          y = 1
        };
        return y;
      }
    }`,
    `async function f2() {
      var x;
      with ({get await() { return [42] }}) {
        x = await
        [0];
      };
      return x;
    }`,
    `let {session, contextGroup, Protocol} =
    InspectorTest.start('Checks that we can update return value on pause');
InspectorTest.runAsyncTestSuite([
  async function testError() {
    Protocol.Debugger.enable();
    let evaluation = Protocol.Runtime.evaluate({
      expression: 'function foo() { debugger; } foo()',
      returnByValue: true
    });
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Set return value not at return position');
    let result = await Protocol.Debugger.setReturnValue({
      newValue: { value: 42 },
    });
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  },
  async function testUndefined() {
    Protocol.Debugger.enable();
    let evaluation = Protocol.Runtime.evaluate({
      expression: 'function foo() { debugger; } foo()',
      returnByValue: true
    });
    InspectorTest.log('Break at return position..');
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Update return value to 42..');
    Protocol.Debugger.setReturnValue({
      newValue: { value: 42 },
    });
    Protocol.Debugger.resume();
    let {result} = await evaluation;
    InspectorTest.log('Dump actual return value');
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  },
  async function testArrow() {
    Protocol.Debugger.enable();
    Protocol.Debugger.pause();
    let evaluation = Protocol.Runtime.evaluate({
      expression: '(() => 42)()',
      returnByValue: true
    });
    InspectorTest.log('Break at return position..');
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    await Protocol.Debugger.oncePaused();
    Protocol.Debugger.stepInto();
    let {params:{callFrames}} = await Protocol.Debugger.oncePaused();
    InspectorTest.log('Update return value to 239..');
    Protocol.Debugger.setReturnValue({
      newValue: { value: 239 },
    });
    Protocol.Debugger.resume();
    let {result} = await evaluation;
    InspectorTest.log('Dump actual return value');
    InspectorTest.logMessage(result);
    await Protocol.Debugger.disable();
  }
]);`,
    `function foo() {
      return () => {
        let a = this;
        (function() {
          let f = () => { debugger; };
          f();
        }).call('a');
        return a;
      };
    }
    function boo() {
      foo.call(1)();
    }`,
    `// AsyncGenerator functions syntactically allow AwaitExpressions
    assertEquals(1, async function*(a) { await 1; }.length);
    assertEquals(2, async function*(a, b) { await 1; }.length);
    assertEquals(1, async function*(a, b = 2) { await 1; }.length);
    assertEquals(2, async function*(a, b, ...c) { await 1; }.length);
    assertEquals(1, ({ async* f(a) { await 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b) { await 1; } }).f.length);
    assertEquals(1, ({ async* f(a, b = 2) { await 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b, ...c) { await 1; } }).f.length);
    assertEquals(1, AsyncGeneratorFunction("a", "await 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "await 1").length);
    assertEquals(1, AsyncGeneratorFunction("a", "b = 2", "await 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "...c", "await 1").length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "await 1")).length);
    assertEquals(2, (new AsyncGeneratorFunction("a", "b", "await 1")).length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "b = 2", "await 1")).length);
    assertEquals(2,
                 (new AsyncGeneratorFunction("a", "b", "...c", "await 1")).length);
    // ----------------------------------------------------------------------------
    // AsyncGenerator functions syntactically allow YieldExpressions
    assertEquals(1, async function*(a) { yield 1; }.length);
    assertEquals(2, async function*(a, b) { yield 1; }.length);
    assertEquals(1, async function*(a, b = 2) { yield 1; }.length);
    assertEquals(2, async function*(a, b, ...c) { yield 1; }.length);
    assertEquals(1, ({ async* f(a) { yield 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b) { yield 1; } }).f.length);
    assertEquals(1, ({ async* f(a, b = 2) { yield 1; } }).f.length);
    assertEquals(2, ({ async* f(a, b, ...c) { yield 1; } }).f.length);
    assertEquals(1, AsyncGeneratorFunction("a", "yield 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "yield 1").length);
    assertEquals(1, AsyncGeneratorFunction("a", "b = 2", "yield 1").length);
    assertEquals(2, AsyncGeneratorFunction("a", "b", "...c", "yield 1").length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "yield 1")).length);
    assertEquals(2, (new AsyncGeneratorFunction("a", "b", "yield 1")).length);
    assertEquals(1, (new AsyncGeneratorFunction("a", "b = 2", "yield 1")).length);
    assertEquals(2,
                 (new AsyncGeneratorFunction("a", "b", "...c", "yield 1")).length);
    `,
    'function * foo() { return {a: 1, b: 2, ...yield, c: 3}; }',
    'function foo(...a) { }',
    'function foo(a, ...b) { }',
    'function foo(a = 20, ...b) { }',
    'function foo(a, b, c, d, e, f, g, ...h) { }',
    'function foo(...abc123) { }',
    'function foo(...let) { }',
    'function outer() { "use strict"; function foo(...restParam) {  } }',
    'function outer() { "use strict"; function foo(a,b,c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,b,c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,{b},c,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20,{b},[c] = 5,...restParam) {  } }',
    'function outer() { "use strict"; function foo(a = 20) {  } }',
    'function outer() { "use strict"; function foo(a,b,c,{d} = 20) {  } }',
    'var x = (x) => x;',
    'var x = (x, y, z) => x;',
    'var x = ({x}, [y], z) => x;',
    'var x = ({x = 30}, [y], z) => x;',
    'var x = (x = 20) => x;',
    'var x = ([x] = 20, y) => x;',
    'var x = ([x = 20] = 20) => x;',
    'var x = foo => x;',
    'var x = foo => x => x => x => x;',
    'var x = foo => x => (x = 20) => (x = 20) => x;',
    'var x = foo => x => x => x => {x};',
    'var x = ([x = 25]) => x => x => ({x} = {});',
    '({ foo(a, ...b){} });',
    '({ foo({a}, ...b){} });',
    '({ foo({a, ...b}){} });',
    '({ foo({b, ...a}, ...c){} });',

    "-void+x['y'].l == x.l != 5 - f[7]",
    '1 .l',
    '0',
    '00',
    '𠮷野家',
    '+{} / 2',
    'var [ a, , b ] = list',
    'while (1) /foo/',
    '(1) / 2',
    '+x++ / 2',
    `/* empty */
    {}
    /* emptyAdd */
    {let z = 7;}
    /* before */
    {
        let x = 5;
        let y = 6;
    }
    /* newElementAtEnd */
    {
        let x = 5;
        let y = 6;
        let z = 7;
    }
    /* newElementAtStart */
    {
        let z = 7;
        let x = 5;
        let y = 6;
    }
    /* newElementAtMiddle */
    {
        let x = 5;
        let z = 7;
        let y = 6;
    }
    /* newElementAtEndHasComment */
    {
        let x = 5;
        let y = 6;
        let z = 7; /* ima comment */
    }
    /* newElementAtStartHasComment */
    {
        let z = 7; /* ima comment */
        let x = 5;
        let y = 6;
    }
    /* newElementInMiddleHasComment */
    {
        let x = 5;
        let z = 7; /* ima comment */
        let y = 6;
    }
    /* size 0 */
    {
    }
    /* size 1 */
    {
        let x = 5;
    }
    /* size 3 */
    {
        let x = 5;
        let z = 7;
        let y = 6;
    }`,
    `/* simple */
    while(false) break;
    /* has id */
    loop1:
    while(false) break loop1;`,
    `/* basic */
    if (a == 5) a = 6;
    /* multiple expression */
    if (a == 5, a == 7) a = 6;
    /* three expressions */
    if (a == 5, b == 7, c == 9) d = 6;
    /* empty expression */
    if (a == 5, a == 7) a = 6;
    /* else */
    if (a == 5) a = 6;
    else a = 5;
    /* else if */
    if (a == 5) a = 6;
    else if (a == 0) a = 0;
    else a = 5;
    /* formatted */
    if (a == 5){
        a = 6;
    } else
        a = 5;
    /* formatted statement */
    {
        a = 6;
    }`,
    `((a, { b = 0, c = 3 }) => {
      return a === 1 && b === 2 && c === 3;
    })(1, { b: 2 });`,
    `((a, _ref) => {
      let {
        b = 0,
        c = 3
      } = _ref;
      return a === 1 && b === 2 && c === 3;
    })(1, {
      b: 2
    });`,
    'for (a,b in c ;;) break',
    'a[foo].c = () => { throw Error(); };',
    'console.info({ toString: () => {throw new Error("exception");} })',
    'null',
    `/* simple */
    with (list) clear();
    /* setExpression0 */
    with (myList()) clear();
    /* setValidStatement */
    with (list) x = 5;
    /* block statement */
    with (list){
        clear();
    }`,
    `/* simple */
    function f(){}
    /* changeIdentifier0 */
    function g(){}
    /* simple parameters */
    function h(a, b){}
    /* all parameters */
    function a(a, {}, [], b = 0, {} = {}, [] = [], ... c){}`,
    `/* base */
    let x = y + f(4);
    /* simple */
    let y;
    /* compound */
    let z;
    "use strict";`,
    `/* empty */
    f();
    /* single */
    f(0);`,
    `/* basic */
    if (a == 5) a = 6;
    /* multiple expression */
    if (a == 5, a == 7) a = 6;
    /* three expressions */
    if (a == 5, b == 7, c == 9) d = 6;
    /* empty expression */
    if (a == 5, a == 7) a = 6;
    /* else */
    if (a == 5) a = 6;
    else a = 5;
    /* else if */
    if (a == 5) a = 6;
    else if (a == 0) a = 0;
    else a = 5;
    /* formatted */
    if (a == 5){
        a = 6;
    } else
        a = 5;
    /* formatted statement */
    {
        a = 6;
    }`,
    `/* base */
    let x = y + f(4);
    /* simple */
    let xy;
    /* compound */
    let xyz;
    "use strict";
    /* block */
        {
            let z = 5;
        }`,
    `/* simple */
        switch(x){
            case 0:
                global.x = 5;
            break;
            case 1:
            default:
        }
        /* empty */
        switch(null){}
        /* caseNames */
        switch(x){
            case "apple":
            break;
            case 1:
            default:
        }
        /* empty */
        switch(0){
        }`,
    `/* simple */
        while(false) continue;
        /* has id */
        loop1:
        while(false) continue loop1;`,
    'x = {foo: function x() {} / divide}',
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
    `/}?/u;`,
    `/{*/u;`,
    `/.{.}/;`,
    `/[\\w-\\s]/;`,
    `/[\\s-\\w]/;`,
    `/(?!.){0,}?/;`,
    `/(?!.){0,}?/u;`,
    `/{/;`,
    `004`,
    `076`,
    `02`,
    `/*
    */--> foo`,
    `var foo = [23]
    -->[0];`,
    `var x = 0;
    x = -1 <!--x;`,
    '-->the comment extends to these characters',
    'try {  throw null; } catch (f) { if (true) function f() { return 123; } else function _f() {} }',
    'var init = f;  if (true) function f() {  } else ;',
    'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }',
    'try {  throw {};  } catch ({ f }) {  if (true) function f() {  } else ;  }',
    '  try {  throw {};  } catch ({ f }) {  if (true) function f() {  }  }',
    //'{  let f = 123;  if (false) ; else function f() {  }  }',
    'switch (0) { default:  let f; switch (1) {  case 1:   function f() {  }  }  }',
    'try {  throw {};  } catch ({ f }) {  switch (1) {  case 1:  function f() {  }  }  }',
    'try { throw null;} catch (f) {switch (1) { default: function f() { return 123; } } }',
    'let f = 123; switch (1) { default: function f() {  } }',
    'var init = f;  switch (1) { default:   function f() {  }  }',
    'var init = f; if (false) function _f() {} else function f() {  }',
    'function arguments() {}',
    'try {  throw null;  } catch (f) {  {   function f() { return 123; }  }  }',
    'var outer = (function*() { yield* iter; })();',
    `try {
  throw 'exception';
} catch (err) {
  before = err;
  for (var err = 'loop initializer'; err !== 'increment'; err = 'increment') {
    during = err;
  }
  after = err;
}`,
    `try {
  throw 'exception';
} catch (err) {
  before = err;
  for (var err in { propertyName: null }) {
    during = err;
  }
  after = err;
}`,
    ` try {
  throw new Error();
}
catch (foo) {
  var foo = "initializer in catch";
}`,
    `try {
  throw 'exception';
  } catch (err) {
before = err;
for (var err = 'loop initializer'; err !== 'increment'; err = 'increment') {
during = err;
}
after = err;
}`,
    'o = { __proto__: 1 };',
    'o = {  __proto__: proto };',
    'o = { __proto__: null };',
    `label: function g() {}`,
    `label1: label2: function f() {}`,
    '000',
    '073',
    '004',
    '074',
    '004',
    '004',
    '004',
    '077',
    '00',
    '00',
    '05',
    '078',
    '0708',
    '019',
    '0719',
    '0782',
    '0790',
    '"\\0"',
    '"\\x05"',
    '"\\x06"',
    '"\\18"',
    '"\\00"',
    '"\\218"',
    '"\\66"',
    '"\\210"',
    `'\\48'`,
    `'\\07'`,
    `'\\168'`,
    `'\\318'`,
    `'\\500'`,
    `'\\160'`,
    `'\\301'`,
    `'\\377'`,
    'if (x) function f() { return 23; } else function f() { return 42; }',
    'if (x) function f() {}',
    `var foo = [23]
                -->[0];`,
    'x = -1 <!--x;',
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() { return "foo"; } else function _f() {}',
    'for (let f of [0]) {}',
    'for (let f; ; ) {}',
    'for (let f; ; ) {}',
    ' function  a(b,) {}',
    ' function* a(b,) {}',
    '(function  a(b,) {});',
    '(function* a(b,) {});',
    '(function   (b,) {});',
    '(function*  (b,) {});',
    ' function  a(b,c,d,) {}',
    ' function* a(b,c,d,) {}',
    '(function  a(b,c,d,) {});',
    '(function* a(b,c,d,) {});',
    '(function   (b,c,d,) {});',
    '(function*  (b,c,d,) {});',
    'class Foo { bar(a,) { } }',
    '({"oink"(that, ugly, icefapper) {}})',
    '({"moo"() {}})',
    '({3() {}})',
    '({[6+3]() {}})',
    'var yield;',
    'var yield = 1',
    'var object = {yield}',
    'const yield = yield;',
    'let foo, yield;',
    'var foo, yield;',
    'try { } catch (yield) { }',
    'function yield() { }',
    '(function yield() { })',
    'function foo(yield) { }',
    'function foo(bar, yield) { }',
    'yield = 1;',
    'var foo = yield = 1;',
    'yield * 2;',
    '++yield;',
    'yield++;',
    'yield++ - 1;',
    'yield: 34',
    '(yield) => {}',
    'var let;',
    'var foo, let;',
    'try { } catch (let) { }',
    'function let() { }',
    '(function let() { })',
    'function foo(let) { }',
    'function foo(bar, let) { }',
    'let = 1;',
    'var foo = let = 1;',
    'let * 2;',
    '++let;',
    'let++;',
    'let: 34',
    'function let(let) { let: let(let + let(0)); }',
    '({ let: 1 })',
    '({ get let() { 1 } })',
    'let(100)',
    'L: let\nx',
    'L: let\n{x}',
    'let',
    'let = 1',
    '[(a)] = 0',
    '[(a) = 0] = 1',
    '[(a.b)] = 0',
    '({a:(b)} = 0)',
    'a || b && c | d ^ e & f == g < h >>> i + j * k',
    'a + (b < (c * d)) + e',
    '([a,b])=>0;',
    '([a,...b])=>0;',
    '([[[[[[[[[[[[[[[[[[[[{a=b}]]]]]]]]]]]]]]]]]]]])=>0;',
    '({a,b=b,a:c,[a]:[d]})=>0;',
    '({x = 0}, {y = 0}, {z = 0})=>0',
    '(a, {x = 0})=>0',
    '(...a) => 0',
    'for (() => { x in y };;);',
    'arguments => 42',
    '(eval, a) => 42',
    '(eval = 10) => 42',
    '(x) => ((y, z) => (x, y, z))',
    'foo(() => {})',
    '(a,b) => 0 + 1',
    '(a,b,...c) => 0 + 1',
    '() => (a) = 0',
    "(x)=>{'use strict';}",
    '([x=0], [])=>0',
    'yield => 0',
    '([a]) => [0];',
    '([a,b])=>0;',
    'e => ({ property: 42 })',
    '(a, b) => { 42; }',
    '({a:(b.c)} = 0)',
    '({a:(b = 0)})',
    'for (let = 1; let < 1; let++) {}',
    'for (let in {}) {}',
    'for (var let = 1; let < 1; let++) {}',
    'for (var let in {}) {}',
    'for (var [let] = 1; let < 1; let++) {}',
    'for (var [let] in {}) {}',
    'var let',
    'var [let] = []',
    '() => yield',
    'var a℮;',
    'var a፰;',
    'var A\\u{42}C;',
    'let ℮',
    `a123`,
    '\\u{00069} = i + \\u{00069};',
    `this.\\u0069`,
    'var $\\u{20BB7} = "b";',
    'var _\\u0524 = "a";',
    'var $00xxx\\u0069\\u0524\\u{20BB7} = "c";',
    'var a\\u2118;',
    'var a\\u309C;',
    'var \\u1886;',
    'function yield(yield) { yield: yield (yield + yield(0)); }',
    '({ yield: 1 })',
    '({ get yield() { 1 } })',
    'yield(100)',
    `await;`,
    'class await {}',
    `function await(yield) {}`,
    'var await = 1',
    'async(await)',
    '({ await: async })',
    'await => {}',
    'await => async',
    'class X { await(){} }',
    'f(x, await(y, z))',
    'class X { static await(){} }',
    'x = await(y);',
    'class X { await() {} }',
    'let async = await;',
    'x = { await: false }',
    'yield[100]',
    `async
  function f() {}`,
    'x = { async: false }',
    `a = async
  function f(){}`,
    'async => 42;',
    'const answer = async => 42;',
    'async function await() {}',
    'class X { async await(){} }',
    'f(x, async(y, z))',
    'class X { static async await(){} }',
    'x = async(y);',
    'class X { async() {} }',
    'let async = await;',
    'x = { async: false }',
    '({get [6+3]() {}, set [5/4](x) {}})',
    '({[2*308]:0})',
    '({["nUmBeR"+9]:"nein"})',
    '({get __proto__() {}, set __proto__(x) {}})',
    '({set __proto__(x) {}})',
    '({get __proto__() {}})',
    '({__proto__:0})',
    '({set c(x) {}})',
    '({get b() {}})',
    '({2e308:0})',
    '({0x0:0})',
    '(1, y)',
    '0, f(n - 1);',
    '(b,) => {};',
    '(b,c,d,) => {};',
    'a(1,);',
    'a(1,2,3,);',
    'a(...[],);',
    'a(1, 2, ...[],);',
    'a(...[], 2, ...[],);',
    'a, b => 0',
    'a, b, (c, d) => 0',
    '(a, b, (c, d) => 0)',
    '(a, b) => 0, (c, d) => 1',
    '(a, b => {}, a => a + 1)',
    '((a, b) => {}, (a => a + 1))',
    '(a, (a, (b, c) => 0))',
    'async (a, (a, (b, c) => 0))',
    '[...a,]',
    '[...a, ,]',
    '[, ...a]',
    '[...[...a]]',
    '[, ...a]',
    '[, , ...a]',
    'for (let f in { key: 0 }) {}',
    `(function(f) {
                    init = f;
                    switch (1) {
                      case 1:
                        function f() {  }
                    }
                    after = f;
                  }(123));`,
    ` try {
                    throw {};
                  } catch ({ f }) {
                  switch (1) {
                    default:
                      function f() {  }
                  }
                  }
                `,
    `{
                    function f() {
                      return 'first declaration';
                    }
                  }`,
    `{
                    function f() { return 'declaration'; }
                  }`,
    'if (true) function f() {} else function _f() {}',
    'if (false) function _f() {} else function f() { }',
    `try {
throw {};
} catch ({ f }) {
switch (1) {
case 1:
function f() {  }
}
}`,
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    `switch (1) {
default:
function f() {  }
}`,
    `try {
throw {};
} catch ({ f }) {
switch (1) {
case 1:
function f() {  }
}
}`,
    `{
let f = 123;
switch (1) {
case 1:
  function f() {  }
}
}`,
    `
for (let f in { key: 0 }) {
switch (1) {
case 1:
  function f() {  }
}
}`,

    `if (a > b) {} else {}
if (c != d) {}
var a = b > c ? d : e;
let b = (c = 1) ? d : e;
switch (a) {
case b:
  break;
case "c":
  break;
case 42:
  break;
case d:
  if (a < b) {}
  break;
default:
  break;
}
while (a > b) {
if (c == d) {
  break;
}
}
do {
if (e === f) {
  continue;
}
} while (g < h);
label: if (a === b) {
if (b = c) {
  break label;
}
}
if (a != b) {}
endingLabel: {}`,
    `var a, b, c, d, e, f, g, x, y, z;
a = 1 + 2 * 3 / 5;
b = (1 + 2) * 3 / 5;
c = (1 + 2) * (3 - 5);
d = x | y ^ z;
e = (x | y) ^ z;
f = "a" + (1 + 2) + "b";
g = "a" + (1 - 2) + "b";
a = true || false && null;
b = c == d || e != f;
c = x instanceof y || x instanceof z;
d = x == y && y != z;
a = !false;
b = !x instanceof Number;
c = !(x instanceof Number);
d = typeof a === 'boolean';
e = !typeof a === 'boolean';
f = !(typeof a === 'boolean');
a = (1.1).toString();
b = new A().toString();
c = new x.A().toString();
d = new x.y().z();
var r = (/ab+c/i).exec('abc');
a = b ** 2 * 3;
c = (d ** 2) ** 3;
e = f ** 2 ** 3;
f = a + (b = 3);
g = 1 && (() => {});
g = (() => {}) && 1;`,
    `({});[];
this.nan;
1 < 2 > 3 <= 4 >= 5 == 6 != 7 === 8 !== 9;
1 + 2 - 3 * 4 % 5 / 6 << 7 >> 8 >>> 9;
this.nan++; ++this.nan; this.nan--; --this.nan;
1 & 2 | 3 ^ 4 && !5 || ~6;
1 ? 2 : 3;
this.nan = 1; this.nan += 2; this.nan -= 3; this.nan *= 4; this.nan /= 5;
this.nan %= 6; this.nan <<= 7; this.nan >>= 8; this.nan >>>= 9;
this.nan &= 1; this.nan |= 2; this.nan ^= 3;`,
    `
function a() {
var e, i, n, a, o = this._tween,
  l = o.vars.roundProps,
  h = {},
  _ = o._propLookup.roundProps;
if ("object" != (void 0 === l ? "undefined" : t(l)) || l.push) for ("string" == typeof l && (l = l.split(",")), n = l.length; --n > -1;) h[l[n]] = Math.round;
else for (a in l) h[a] = s(l[a]);
for (a in h) for (e = o._firstPT; e;) i = e._next, e.pg ? e.t._mod(h) : e.n === a && (2 === e.f && e.t ? r(e.t._firstPT, h[a]) : (this._add(e.t, a, e.s, e.c, h[a]), i && (i._prev = e._prev), e._prev ? e._prev._next = i : o._firstPT === e && (o._firstPT = i), e._next = e._prev = null, o._propLookup[a] = _)), e = i;
return !1
}
`,
    `var await;
async function foo() {
function bar() {
await = 1;
}
bar();
}
foo();`,
    `
if (a) {
for(f(); false;) {}
} else
for(x in y) {
g()
}
`,
    `var await;
async function foo() {
function bar() {
await = 1;
}
bar();
}
foo();`,
    `function testArgs3(x, y, z) {
// Properties of the arguments object are enumerable.
var a = Object.keys(arguments);
if (a.length === 3 && a[0] in arguments && a[1] in arguments && a[2] in arguments)
return true;
}`,
    `function testArgs4(x, y, z) {
// Properties of the arguments object are enumerable.
var a = Object.keys(arguments);
if (a.length === 4 && a[0] in arguments && a[1] in arguments && a[2] in arguments && a[3] in arguments)
return true;
}`,
    `function testArgs2(x, y, z) {
// Properties of the arguments object are enumerable.
var a = Object.keys(arguments);
if (a.length === 2 && a[0] in arguments && a[1] in arguments)
return true;
}`,
    `var s2 = new Subclass2(3, 4);`,

    `function bind_bindFunction0(fun, thisArg, boundArgs) {
return function bound() {
// Ensure we allocate a call-object slot for |boundArgs|, so the
// debugger can access this value.
if (false) void boundArgs;
var newTarget;
if (_IsConstructing()) {
  newTarget = new.target;
  if (newTarget === bound)
      newTarget = fun;
  switch (arguments.length) {
    case 0:
      return constructContentFunction(fun, newTarget);
    case 1:
      return constructContentFunction(fun, newTarget, SPREAD(arguments, 1));
    case 2:
      return constructContentFunction(fun, newTarget, SPREAD(arguments, 2));
    case 3:
      return constructContentFunction(fun, newTarget, SPREAD(arguments, 3));
    case 4:
      return constructContentFunction(fun, newTarget, SPREAD(arguments, 4));
    case 5:
      return constructContentFunction(fun, newTarget, SPREAD(arguments, 5));
    default:
      var args = FUN_APPLY(bind_mapArguments, null, arguments);
      return bind_constructFunctionN(fun, newTarget, args);
  }
} else {
  switch (arguments.length) {
    case 0:
      return callContentFunction(fun, thisArg);
    case 1:
      return callContentFunction(fun, thisArg, SPREAD(arguments, 1));
    case 2:
      return callContentFunction(fun, thisArg, SPREAD(arguments, 2));
    case 3:
      return callContentFunction(fun, thisArg, SPREAD(arguments, 3));
    case 4:
      return callContentFunction(fun, thisArg, SPREAD(arguments, 4));
    case 5:
      return callContentFunction(fun, thisArg, SPREAD(arguments, 5));
    default:
      return FUN_APPLY(fun, thisArg, arguments);
  }
}
};
}
`,
    `function a(t) {
var result = [];
for (var i in t) {
result.push([i, t[i]]);
}
return result;
}
// Check that we correctly deoptimize on map check.
function b(t) {
var result = [];
for (var i in t) {
result.push([i, t[i]]);
delete t[i];
}
return result;
}
// Check that we correctly deoptimize during preparation step.
function c(t) {
var result = [];
for (var i in t) {
result.push([i, t[i]]);
}
return result;
}
// Check that we deoptimize to the place after side effect in the right state.
function d(t) {
var result = [];
var o;
for (var i in (o = t())) {
result.push([i, o[i]]);
}
return result;
}
// Check that we correctly deoptimize on map check inserted for fused load.
function e(t) {
var result = [];
for (var i in t) {
delete t[i];
t[i] = i;
result.push([i, t[i]]);
}
return result;
}
// Nested for-in loops.
function f(t) {
var result = [];
for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
}
}
return result;
}
// Deoptimization from the inner for-in loop.
function g(t) {
var result = [];
for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
var v = t[i];
delete t[i];
t[i] = v;
}
}
return result;
}
// Break from the inner for-in loop.
function h(t, deopt) {
var result = [];
for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
break;
}
}
deopt.deopt;
return result;
}
// Continue in the inner loop.
function j(t, deopt) {
var result = [];
for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
continue;
}
}
deopt.deopt;
return result;
}
// Continue of the outer loop.
function k(t, deopt) {
var result = [];
outer: for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
continue outer;
}
}
deopt.deopt;
return result;
}
// Break of the outer loop.
function l(t, deopt) {
var result = [];
outer: for (var i in t) {
for (var j in t) {
result.push([i, j, t[i], t[j]]);
break outer;
}
}
deopt.deopt;
return result;
}
// Test deoptimization from inlined frame (currently it is not inlined).
function m0(t, deopt) {
for (var i in t) {
for (var j in t) {
deopt.deopt;
return [i, j,  t[i], t[j]];
}
}
}
function m(t, deopt) {
return m0(t, deopt);
}`,
    `function osr_inner(t, limit) {
var r = 1;
for (var x in t) {
if (t.hasOwnProperty(x)) {
for (var i = 0; i < t[x].length; i++) {
r += t[x][i];
if (i === limit) OptimizeOsr();
}
r += x;
}
}
return r;
}
function osr_outer(t, osr_after) {
var r = 1;
for (var x in t) {
for (var i = 0; i < t[x].length; i++) {
r += t[x][i];
}
if (x === osr_after) OptimizeOsr();
r += x;
}
return r;
}
function osr_outer_and_deopt(t, osr_after) {
var r = 1;
for (var x in t) {
r += x;
if (x == osr_after) OptimizeOsr();
}
return r;
}`,
    `let global = this;
let p = {};
let q = {};
let g1 = function() {
assertEq(this, global);
assertEq(arguments.callee, g1);
};
g1(...[]);
let g2 = x => {
assertEq(this, global);
// arguments.callee is unbound function object, and following assertion fails.
// see Bug 889158
//assertEq(arguments.callee, g2);
};
g2(...[]);
let g3 = function() {
assertEq(this, p);
assertEq(arguments.callee, g3);
};
g3.apply(p, ...[]);
g3.call(p, ...[]);
g2.apply(p, ...[]);
g2.call(p, ...[]);
let o = {
f1: function() {
assertEq(this, o);
assertEq(arguments.callee, o.f1);
let g1 = function() {
assertEq(this, global);
assertEq(arguments.callee, g1);
};
g1(...[]);
let g2 = x => {
assertEq(this, o);
//assertEq(arguments.callee, g2);
};
g2(...[]);
let g3 = function() {
assertEq(this, q);
assertEq(arguments.callee, g3);
};
g3.apply(q, ...[]);
g3.call(q, ...[]);
let g4 = x => {
assertEq(this, o);
//assertEq(arguments.callee, g4);
};
g4.apply(q, ...[]);
g4.call(q, ...[]);
},
f2: x => {
assertEq(this, global);
//assertEq(arguments.callee, o.f2);
let g1 = function() {
assertEq(this, global);
assertEq(arguments.callee, g1);
};
g1(...[]);
let g2 = x => {
assertEq(this, global);
//assertEq(arguments.callee, g2);
};
g2(...[]);
let g3 = function() {
assertEq(this, q);
assertEq(arguments.callee, g3);
};
g3.apply(q, ...[]);
g3.call(q, ...[]);
let g4 = x => {
assertEq(this, global);
//assertEq(arguments.callee, g4);
};
g4.apply(q, ...[]);
g4.call(q, ...[]);
},
f3: function() {
assertEq(this, p);
assertEq(arguments.callee, o.f3);
let g1 = function() {
assertEq(this, global);
assertEq(arguments.callee, g1);
};
g1(...[]);
let g2 = x => {
assertEq(this, p);
//assertEq(arguments.callee, g2);
};
g2(...[]);
let g3 = function() {
assertEq(this, q);
assertEq(arguments.callee, g3);
};
g3.apply(q, ...[]);
g3.call(q, ...[]);
let g4 = x => {
assertEq(this, p);
//assertEq(arguments.callee, g4);
};
g4.apply(q, ...[]);
g4.call(q, ...[]);
}
};
o.f1(...[]);
o.f2(...[]);
o.f3.apply(p, ...[]);
o.f2.apply(p, ...[]);`,
    `function zeroArguments () {
arguments[1] = '0';
actual += arguments[1];
}
function oneArgument (x) {
arguments[1] = '1';
actual += arguments[1];
}
function twoArguments (x,y) {
arguments[1] = '2';
actual += arguments[1];
}`,
    `for (var i = 1; i < arguments.length; i++) {
var o = arguments[i];
if (typeof(o) != 'undefined' && o !== null) {
for (var k in o) {
  self[k] = o[k];
}
}
}`,
    'function dumpArgs(i) { if (i == 90) return funapply.arguments.length; return [i]; }',
    `function foo() {
switch (arguments.length) {
default: return new orig_date(arguments[0], arguments[1],
arguments.length >= 3 ? arguments[2] : 1,
arguments.length >= 4 ? arguments[3] : 0,
arguments.length >= 5 ? arguments[4] : 0,
arguments.length >= 6 ? arguments[5] : 0,
arguments.length >= 7 ? arguments[6] : 0);
}}`,
    'var { [key++]: y, ...x } = { 1: 1, a: 1 };',
    'var { [++key]: y, [++key]: z, ...rest} = {2: 2, 3: 3};',
    '({ [key]: y, z, ...x } = {2: "two", z: "zee"});',
    'var { [fn()]: x, ...y } = z;',
    `var z = {};
var { ...x } = z;
var { x, ...y } = z;
var { [x]: x, ...y } = z;
(function({ x, ...y }) { });
({ x, y, ...z } = o);
var [state, dispatch] = useState();`,
    '() => { [a, b] = [1, 2] }',
    'function foo(...{ length }) {}',
    `const foo = {
bar: 10,
}
let bar = 0;
if (foo) {
({ bar } = foo);
}
`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
