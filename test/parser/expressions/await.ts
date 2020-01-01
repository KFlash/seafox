import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Expressions - Await', () => {
  for (const [source, ctx] of [
    ['async function f(){ let y = x => await x; }', Context.Empty],
    ['let f = () => (y=await foo) => y;', Context.Empty],
    ['5 + (await bar())', Context.Empty],
    ['async x => async ((a = await b) => a - a / (async))', Context.Empty],
    ['async function f(){ (new await foo) }', Context.Empty],
    ['async function f(){ async(await); }', Context.Empty],
    ['function f({a: b = await c}) {}', Context.Empty],
    ['function f(a = await b) {}', Context.Empty],
    // ['async (b = (await) => {}) => 1', Context.Empty],
    ['async function f({a = await b}) {}', Context.Empty],
    ['async function f({await}) {}', Context.Empty],
    ['async function f({a: b = await}) {}', Context.Empty],
    ['async function g() { function f(a = await b) {} }', Context.Empty],
    ['async function f(){ async function g(x=(await)=y){}   }', Context.Empty],
    ['async function f(){ function g(x=(await z)=y){}   }', Context.Empty],
    ['async function f(x=(await z)=y){}', Context.Empty],
    ['async function f(){ (x=(await y)=y)=>z }', Context.Empty],
    ['(x=(await z)=y)', Context.Empty],
    ['async function f() {  class x{[await](a){}}}', Context.Empty],
    ['let x = async function *await(){}', Context.Empty],
    ['let x = async function await(){}', Context.Empty],
    ['{ (x = [await x]) }', Context.Empty],
    ['async function f(){  (await fail) => x  }', Context.Empty],
    ['async function f(){  (await) => x  }', Context.Empty],
    ['async function f(await){}', Context.Empty],
    ['class x {async *f(await){}}', Context.Empty],
    ['async function *f(await){}', Context.Empty],
    ['let o = {f(foo = await bar){}}', Context.Empty],
    ['function f(foo = await bar){}', Context.Empty],
    ['async function wrap() {\nasync function await() { }\n}', Context.Empty],
    ['async function foo(await) { }', Context.Empty],
    ['async function foo() { return {await} }', Context.Empty],
    ['(async function await() { })', Context.Empty],
    ['async ({a: await}) => 1', Context.Empty],
    ['async ([await]) => 1', Context.Empty],
    ['async ([...await]) => 1', Context.Empty],
    ['async (b = {a: await}) => 1', Context.Empty],
    ['async (b = {1: await}) => 1', Context.Empty],
    ['async (b = {"a": await}) => 1', Context.Empty],
    ['async (b = {[a]: await}) => 1', Context.Empty],
    ['async (b = [await]) => 1', Context.Empty],
    ['async (b = [...await]) => 1', Context.Empty],
    ['async (b = class await {}) => 1', Context.Empty],
    ['async (await, b = async()) => 2', Context.Empty],
    ['class A {async foo() { var await }}', Context.Empty],
    ['class A {async foo(await) { }}', Context.Empty],
    ['class A {async foo() { return {await} }}', Context.Empty],
    ['await a', Context.Empty],
    ['async (...await) => 1', Context.Empty],
    ['async ({...await}) => 1', Context.Empty],
    ['class x {f(foo = await bar){}}', Context.Empty],
    ['let o = {*f(foo = await bar){}}', Context.Empty],
    ['function f(foo = await bar){}', Context.Empty],
    ['let o = {async f(foo = await bar){}}', Context.Empty],
    ['class x {async *f(foo = await bar){}}', Context.Empty],
    ['async function g(){class x {async f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){class x {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let x = async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){class x {async *f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){async function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let x = async function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let o = {async *f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){    function f(foo = [h, {m: t(+await bar)}]){}    }', Context.Empty],
    ['async function g(){async function f(foo = [h, {m: t(+await bar)}]){}    }', Context.Empty],
    ['async function g(){class x {*f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let x = function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let o = {*f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){class x {f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let x = function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = async function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let o = {async *f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = await bar){}}', Context.Empty],
    ['async function g(){    function f(foo = +await bar){}    }', Context.Empty],
    ['async function g(){async function f(foo = +await bar){}    }', Context.Empty],
    ['async function g(){class x {*f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {*f(foo = await bar){}}    }', Context.Empty],
    ['async function a(){     ([v] = await bar) => {}     }', Context.Empty],
    ['async function a(){     ({r} = await bar) => {}     }', Context.Empty],
    ['async function a(){     (foo = await bar) => {}     }', Context.Empty],
    ['async function a(){     async (foo = await bar) => {}     }', Context.Empty],
    ['async (foo = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['async (foo = [{m: 5 + t(+await bar)}]) => {}', Context.Empty],
    ['async function f() {  class x{[x](a=await y){}}}', Context.Empty],
    ['async function foo() { return {await} };', Context.Empty],
    ['async function wrap() { async function await() { } };', Context.Empty],
    ['function* wrap() { async(a = yield b) => a };', Context.Empty],
    ['async function f() { let await; }', Context.Empty],
    ['a = async function () { async function await() {} }', Context.Empty],
    ['(async function(await b){})', Context.Empty],
    ['async (foo = await bar) => {}', Context.Empty],
    ['await.b[c] => async', Context.Empty],
    ['(foo = await bar) => {}', Context.Empty],
    ['async (foo = await bar);', Context.Empty],
    ['({x} = await bar) => {}', Context.Empty],
    ['async ({x} = await bar) => {}', Context.Empty],
    ['([x] = await bar) => {}', Context.Empty],
    ['async ([x] = await bar);', Context.Empty],
    ['x = { async f() { let await } }', Context.Empty],
    ['async function *f(foo = await bar){}', Context.Empty],
    ['let x = function f(foo = await bar){}', Context.Empty],
    ['let x = async function f(foo = await bar){}', Context.Empty],
    ['let x = function *f(foo = await bar){}', Context.Empty],
    ['let x = async function *f(foo = await bar){}', Context.Empty],
    ['let o = {f(foo = await bar){}}', Context.Empty],
    ['let o = {async f(foo = await bar){}}', Context.Empty],
    ['let o = {*f(foo = await bar){}}', Context.Empty],
    ['let o = {async *f(foo = await bar){}}', Context.Empty],
    ['async function f(){ new await x; }', Context.Empty],
    ['async function g(){let o = {f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = [h, {m: t(await bar)}]){}}    }', Context.Empty],
    ['async function g(){let x = function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let x = async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){function *f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){async function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){    function f(foo = [h, {m: t(await bar)}]){}    }', Context.Empty],
    ['async function g(){class x {async *f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){class x {*f(foo = await bar){}}    }', Context.Empty],
    ['async function af(a, b = await a) { }', Context.Empty],
    ['async function x({await}) { return 1 }', Context.Empty],
    ['async function f() { return {await}; }', Context.Empty],
    ['async function f() { return {await = 0} = {}; }', Context.Empty],
    ['async function g(){class x {async f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){class x {f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async *f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {*f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {async f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){let o = {f(foo = await bar){}}    }', Context.Empty],
    ['async function g(){async function *f(foo = await bar){}    }', Context.Empty],
    ['async function g(){let x = function f(foo = await bar){}    }', Context.Empty],
    ['async function g(){    function f(foo = await bar){}    }', Context.Empty],
    ['([p] = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([p] = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['sync ({o} = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ({o} = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['({o} = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async (foo = [{m: 5 + t(await bar)}]);', Context.Empty],
    ['(foo = [{m: 5 + t(await bar)}]) => {}', Context.Empty],
    ['async ([x] = await bar) => {}', Context.Empty],
    ['async ({x} = await bar);', Context.Empty],
    ['async (foo = await bar);', Context.Empty],
    ['async (foo = await bar) => {}', Context.Empty],
    ['class x {async *f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {*f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {async f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['class x {f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let o = {async *f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let o = {*f(foo = [{m: t(await bar)}]){}}', Context.Empty],
    ['let x = function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = async function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let o = {f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = async function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['async function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['let x = function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['async function f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['async function *f(foo = [{m: t(await bar)}]){}', Context.Empty],
    ['class x {f(foo = await bar){}}', Context.Empty],
    ['class x {async f(foo = await bar){}}', Context.Empty],
    ['class x {*f(foo = await bar){}}', Context.Empty],
    ['let o = {f(foo = await bar){}}', Context.Empty],
    ['let o = {async f(foo = await bar){}}', Context.Empty],
    ['let x = function f(foo = await bar){}', Context.Empty],
    ['function *f(foo = await bar){}', Context.Empty],
    ['async function f(){  async (await) => x  }', Context.Empty],
    ['async function method() { var await = 1; }', Context.Empty],
    ['async function method(await;) { }', Context.Empty],
    ['async (foo = await x) => foo', Context.Empty],
    ['function () { "use strict"; eval("async function af(a, b = await a) { }', Context.Empty],
    ['var af = async\nfunction () { }', Context.Empty],
    ['async function af() { var a = (await) => { }; }', Context.Empty],
    ['async function af() { var a = (x, y, await) => { }; }', Context.Empty],
    ['async function af() { var a = (x, await, y) => { }; }', Context.Empty],
    ['async function af() { var a = (x = await 0) => { }; }', Context.Empty],
    ['async function af() { var a = (x, y = await 0, z = 0) => { }; }', Context.Empty],
    ['a[await p];', Context.Empty],
    ['class A { async get foo() {} }', Context.Empty],
    ['class A { async static staticAsyncMethod() {} }', Context.Empty],
    ['class A { static async prototype() {} }', Context.Empty],
    ['async function method() { var x = await; }', Context.Empty],
    ['class A { async constructor() {} }', Context.Empty],
    ['class A { async set foo() {} }', Context.Empty],
    ['var result = await call();', Context.Empty],
    ['await call();', Context.Empty],
    ['await a;', Context.Empty],
    ['await a[0];', Context.Empty],
    ['await o.p;', Context.Empty],
    ['a + await p;', Context.Empty],
    ['await p + await q;', Context.Empty],
    ['foo(await p, await q);', Context.Empty],
    ['var lambdaParenNoArg = await () => x < y;', Context.Empty],
    ['var lambdaArgs = await async (a, b ,c) => a + b + c;', Context.Empty],
    ['function method() { var x = await call(); }', Context.Empty],
    ['function () { a = async await => { } }', Context.Empty],
    ['async (a, b = await 1) => {}', Context.Empty],
    ['async () => { await => { }; }', Context.Empty],
    ['async () => { (a, await) => { }; }', Context.Empty],
    ['async () => { (x, y, z = await 0) => { }; }', Context.Empty],
    ['async function af() { (b = (c = await => {}) => {}) => {}; }', Context.Empty],
    ['a = async function() { g(await) }', Context.Empty],
    ['function f(x) { await x }', Context.Empty],
    ['async function f(await) {}', Context.Empty],
    ['x = { async f(await){} }', Context.Empty],
    ['async f() { x = { async await(){} } }', Context.Empty],
    ['function call(foo=await bar){}', Context.Empty],
    ['function call(foo=await bar=10){}', Context.Empty],
    ['async function x(){ function y(s=await foo){}}', Context.Empty],
    ['async function f(){ let y = x => await x; }', Context.Empty],
    ['let f = () => (y=await foo) => y;', Context.Empty],
    ['async function f(){ await foo\n/foo/ }', Context.Empty],
    ['async () => { var await; }', Context.Empty],
    ['async (a = await b) => x', Context.Empty],
    ['async (a = await b)', Context.Empty],
    ['async () => await => x', Context.Empty],
    ['async () => (a = await) => x', Context.Empty],
    ['async () => (await) => x', Context.Empty],
    ['async () => (...await) => x', Context.Empty],
    ['async () => ([a = await b]) => x', Context.Empty],
    ['async () => ([a = await]) => x', Context.Empty],
    ['async () => ({a = await b}) => x', Context.Empty],
    ['async () => ({a = await}) => x', Context.Empty],
    ['async () => ({await}) => x', Context.Empty],
    ['async () => ({a: b = await}) => x', Context.Empty],
    ['async ([a = await b])', Context.Empty],
    ['async ([a = await b]) => x', Context.Empty],
    ['async ({a = await b})', Context.Empty],
    ['async ({a = await b}) => x', Context.Empty],
    ['async ({a = await})', Context.Empty],
    ['async (x = delete ((await) = f)) => {}', Context.Empty],
    ['async (x = (await) = f) => {}', Context.Empty],
    ['async ({a: b = await c})', Context.Empty],
    ['async ({a: b = await c}) => x', Context.Empty],
    ['async x => async (a = await)', Context.Empty],
    ['async x => async (await)', Context.Empty],
    ['async x => async (...await)', Context.Empty],
    ['async x => async ([a = await])', Context.Empty],
    ['async x => async ({a = await b})', Context.Empty],
    ['async x => async ({a = await})', Context.Empty],
    ['async x => async ({await})', Context.Empty],
    ['async x => async ({a: b = await})', Context.Empty],
    ['(a = await b) => x', Context.Empty],
    ['([a = await b]) => x', Context.Empty],
    ['({a = await b}) => x', Context.Empty],
    ['({a: b = await c}) => x', Context.Empty],
    ['function *f(){  async (await) => x  }', Context.Empty],
    ['async (await) => x', Context.Empty],
    ['async function a(){     async (foo = +await bar) => {}     }', Context.Empty],
    ['async await => 1;', Context.Empty],
    ['async ({await}) => 1;', Context.Empty],
    ['async await => { }', Context.Empty],
    ['async (a, await) => { }', Context.Empty],
    ['async await => 42', Context.Empty],
    ['async await => x', Context.Empty],
    ['async (a = await) => x', Context.Empty],
    ['async () => (a = await b) => x', Context.Empty],
    ['async ([a = await]) => x', Context.Empty],
    ['async ({a = await}) => x', Context.Empty],
    ['async ({await}) => x', Context.Empty],
    ['async () => ({a: b = await c}) => x', Context.Empty],
    ['async ({a: b = await}) => x', Context.Empty],
    ['async function f(){ async function f(){   (a= {[await foo](){}, "x"(){}} ) => a    }    }', Context.Empty],
    ['async function f(){ (fail = class A extends (await foo) {}) => fail    }', Context.Empty],
    ['async (...await) => x', Context.Empty],
    ['async function f(){ (fail = class extends await foo {}) => fail    }', Context.Empty],
    ['async function f(){ (fail = class A extends await foo {}) => fail    }', Context.Empty],
    ['async(a = await => {}) => {};', Context.Empty],
    ['async function f(){ (x = new x(await x)) => {} }', Context.Empty],
    ['async function a(){ async ([y] = delete ((((foo))[await x]))) => {}; }', Context.Empty],
    ['async function a(){ async ([y] = delete ((foo[await x]))) => {}; }', Context.Empty],
    ['async (await, b = async () => {}) => 1', Context.Empty],
    ['async function f(){ (fail = class A {[await foo](){}; "x"(){}}) => {}    }', Context.Empty]
    // ['async(a = (await) => {}) => {};', Context.Empty],
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0
        });
      });
    });
  }

  for (const arg of [
    `await;`,
    'class await {}',
    `function await(yield) {}`,
    'var await = 1',
    'async(await)',
    '({ await: async })',
    'await => {}',
    'await => async',
    'await => async.await[foo]',
    'await => async.await[async = bar / (async + 1)]',
    'await => async.await[async / (async => foo)]',
    'await => async.await[async / (async => foo.bar)]',
    'await => async.await[async / ((async) => foo.bar)]',
    'await => async.await[async / (async = async(async, await, bar))]',
    'class X { await(){} }',
    'f(x, await(y, z))',
    'class X { static await(){} }',
    'x = await(y);',
    'class X { await() {} }',
    'let async = await;',
    'x = { await: false }',
    'class test{ async method (param){ await foo();  }  method2(){}  }',
    'async function test() { await foo(); }',
    'var a = async function test() { await foo(); }',
    'var test = async a => await test();',
    '({ async* f(a, b, ...c) { await 1; } })',
    '({ async* f(a, b = 2) { await 1; } })',
    '({ async* f(a, b) { await 1; } })',
    '({ async* f(a) { await 1; } })',
    '({ async* f(a, b, ...c) { yield 1; } })',
    '({ async* f(a, b = 2) { yield 1; } })',
    '({ async* f(a, b) { yield 1; } })',
    '({ async* f(a) { yield 1; } })',
    '(x = class A {[await](){}; "x"(){}}) => {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    '[await]',
    '[await] = []',
    '[await = 1]',
    '[await = 1] = []',
    '...await',
    'await',
    'await = 1',
    '...[await]',
    'var [await f] = [];',
    'let [await f] = [];',
    'const [await f] = [];',
    'e=await',
    'var [...await f] = [];',
    'let [...await f] = [];',
    'const [...await f] = [];',
    'var { await f } = {};',
    'let { await f } = {};',
    'const { await f } = {};',
    'var { ...await f } = {};',
    'let { ...await f } = {};',
    'const { ...await f } = {};',
    'var { f: await f } = {};',
    'let { f: await f } = {};',
    'const { f: await f } = {};',
    'x = await',
    '1) => 1',
    "'str') => 1",
    '/foo/) => 1',
    '{ foo = async(1) => 1 }) => 1',
    '{ foo = async(a) => 1 })',
    'x = async(await)',
    'x = { [await]: 1 }',
    'x = class extends (await) { }',
    'x = class { static [await]() {} }',
    '{ x = await }',
    'class await {}',
    'x = class await {}',
    'x = 1 ? class await {} : 0',
    'x = async function await() {}',
    'x = y[await]',
    'x = `${await}`',
    'x = y()[await]',
    'var { f: ...await f } = {};',
    'let { f: ...await f } = {};',
    'const { f: ...await f } = {};',
    'var { [f]: await f } = {};',
    'let { [f]: await f } = {};',
    'const { [f]: await f } = {};',
    'var { [f]: ...await f } = {};',
    'let { [f]: ...await f } = {};',
    'const { [f]: ...await f } = {};',
    `x = await`
  ]) {
    it(`async function f( ${arg}) {}`, () => {
      t.throws(() => {
        parseScript(`async function f() { ${arg} }`);
      });
    });

    it(`async function f( ${arg}) {}`, () => {
      t.throws(() => {
        parseScript(`async function f() { ${arg} }`, { disableWebCompat: true });
      });
    });

    it(`'use strict'; function f() { ${arg}) }`, () => {
      t.throws(() => {
        parseScript(`'use strict'; function f() { ${arg}) }`);
      });
    });

    it(`let f = () => {${arg})`, () => {
      t.throws(() => {
        parseScript(`let f = () => {${arg})`);
      });
    });
  }

  for (const arg of [
    'var await;',
    'let await;',
    'export let await;',
    'const await = 1',
    'export const await = 1',
    'function await() {}',
    'function* await() {}',
    'async function await() {}'
    // 'import {await} from "foo";',
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  for (const arg of [
    `async function f(await) {}`,
    `async function f(...await) {}`,
    `async function f(await = 1) {}`,
    `async function f([await]) {}`,
    `async function f([await = 1]) {}`,
    `async function f({ await }) {}`,
    `async function f({ await = 1 }) {}`,
    `async function f({ } = await) {}`,

    `(async function(await) {})`,
    `(async function(...await) {})`,
    `(async function(await = 1) {})`,
    `(async function([await]) {})`,
    `(async function([await = 1]) {})`,
    `(async function({ await }) {})`,
    `(async function({ await = 1 }) {})`,
    `(async function({ } = await) {})`,

    `var asyncArrow = async(await) => 1;`,
    `var asyncArrow = async(await) => {};`,
    `var asyncArrow = async(...await) => 1;`,
    `var asyncArrow = async(...await) => {};`,
    `var asyncArrow = async(await = 1) => 1;`,
    `var asyncArrow = async(await = 1) => {};`,
    `var asyncArrow = async([await]) => 1;`,
    `var asyncArrow = async([await]) => {};`,
    `var asyncArrow = async([await = 1]) => 1;`,
    `var asyncArrow = async([await = 1]) => {};`,
    `var asyncArrow = async([] = await) => 1;`,
    `var asyncArrow = async([] = await) => {};`,
    `var asyncArrow = async({ await }) => 1;`,
    `var asyncArrow = async({ await } ) => {};`,
    `var asyncArrow = async({ await = 1}) => 1;`,
    `var asyncArrow = async({ await = 1}) => {};`,
    `var asyncArrow = async({ } = await) => 1;`,
    `var asyncArrow = async({ } = await) => {};`,

    `({ async method(await) {} })`,
    `({ async method(...await) {} })`,
    `({ async method(await = 1) {} })`,
    `({ async method([await]) {} })`,
    `({ async method([await = 1]) {} })`,
    `({ async method({ await }) {} })`,
    `({ async method({ await = 1 }) {} })`,
    `({ async method({ } = await) {} })`,

    `(class { async method(await) {} })`,
    `(class { async method(...await) {} })`,
    `(class { async method(await = 1) {} })`,
    `(class { async method([await]) {} })`,
    `(class { async method([await = 1]) {} })`,
    `(class { async method({ await }) {} })`,
    `(class { async method({ await = 1 }) {} })`,
    `(class { async method({ } = await) {} })`,

    `(class { static async method(await) {} })`,
    `(class { static async method(...await) {} })`,
    `(class { static async method(await = 1) {} })`,
    `(class { static async method([await]) {} })`,
    `(class { static async method([await = 1]) {} })`,
    `(class { static async method({ await }) {} })`,
    `(class { static async method({ await = 1 }) {} })`,
    `(class { static async method({ } = await) {} })`
  ]) {
    it(`async function f() { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`async function f() { ${arg} }`);
      });
    });

    it(`"use strict"; async function f() { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`"use strict"; async function f() { ${arg} }`);
      });
    });

    it(`var await; var f = (async function() { ${arg} });`, () => {
      t.throws(() => {
        parseScript(`var await; var f = (async function() { ${arg} });`);
      });
    });

    it(`"use strict"; var await; var f = (async function() { ${arg} });`, () => {
      t.throws(() => {
        parseScript(`"use strict"; var await; var f = (async function() { ${arg} });`);
      });
    });
  }

  for (const arg of [
    'await',
    'var f = await => 42;',
    'var { await } = 1;',
    'var [ await ] = 1;',
    'return async (await) => {};',
    'var O = { async [await](a, a) {} }',
    'await;',
    'function await() {}',
    '(a = await b) => a',
    'var f = await => 42;',
    'var f = (await) => 42;',
    'var f = (await, a) => 42;',
    'var f = (...await) => 42;',
    'var e = (await);',
    'var e = (await, f);',
    'var e = (await = 42)',
    '(await 1) = 1',
    'var e = [await];',
    'var e = {await};'
  ]) {
    it(`async function f() { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`async function f() { ${arg} }`);
      });
      t.throws(() => {
        parseModule(`async function f() { ${arg} }`);
      });
    });
  }
  for (const arg of [
    'var [await f] = [];',
    'let [await f] = [];',
    'const [await f] = [];',
    'var [...await f] = [];',
    'let [...await f] = [];',
    'const [...await f] = [];',
    'var { await f } = {};',
    'let { await f } = {};',
    'const { await f } = {};',
    'var { ...await f } = {};',
    'let { ...await f } = {};',
    'const { ...await f } = {};',
    'var { f: await f } = {};',
    'let { f: await f } = {};',
    'const { f: await f } = {};',
    'var { [f]: await f } = {};',
    'let { [f]: await f } = {};',
    'const { [f]: await f } = {};',
    'var { f: ...await f } = {};',
    'let { f: ...await f } = {};',
    'const { f: ...await f } = {};',
    'var { [f]: ...await f } = {};',
    'let { [f]: ...await f } = {};',
    'const { [f]: ...await f } = {};'
  ]) {
    it(`let f = () => { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`let f = () => { ${arg} }`);
      });
    });

    it(`'use strict'; async function* f() { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`'use strict'; async function* f() { ${arg} }`);
      });
    });

    it(`function* f() { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`function* f() { ${arg} }`);
      });
    });
  }

  for (const arg of [
    'var asyncFn = async function() { await 1; };',
    'var asyncFn = async function withName() { await 1; };',
    "var asyncFn = async () => await 'test';",
    'async function asyncFn() { await 1; }',
    'var O = { async method() { await 1; } }',
    "var O = { async ['meth' + 'od']() { await 1; } }",
    "var O = { async 'method'() { await 1; } }",
    'function f() { var await; }',
    'function f() { class await { } }',
    'function f() { var o = { await: 10 } }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { class C { *await() { } } }',
    'var O = { async 0() { await 1; } }',
    'async function await() {}',
    'var asyncFn = async({ foo = 1 }) => foo;',
    'var asyncFn = async({ foo = 1 } = {}) => foo;',
    'function* g() { var f = async(yield); }',
    'function* g() { var f = async(x = yield); }',
    'function foo() { var await = 1; return await; }',
    'function foo(await) { return await; }',
    'function* foo() { var await = 1; return await; }',
    'var f = () => { var await = 1; return await; }',
    'var O = { method() { var await = 1; return await; } };',
    'var O = { method(await) { return await; } };',
    'var O = { *method() { var await = 1; return await; } };',
    'async function foo(a, b) { await a + await b };',
    'async function wrap() { (a = await b) };',
    'async function foo(a, b) { await a };',
    'var O = { *method(await) { return await; } };',
    'var O = { *method(await) { return await; } };',
    'var O = { *method(await) { return await; } };',
    'var O = { *method(await) { return await; } };',
    'function f() { var await; }',
    'function f() { let await; }',
    'function f() { const await = 10; }',
    'function f() { function await() { } }',
    'function f() { function* await() { } }',
    'function f() { var fe = function await() { } }',
    'function f() { class await { } }',
    'function f() { var o = { await: 10 } }',
    'function f() { var o = { get await() { } } }',
    'function f() { var o = { *await() { } } }',
    'function f() { var await = 10; var o = { await }; }',
    'function f() { class C { await() { } } }',
    'class x {*f(await){}}',
    'async(await)',
    'function *f(){  (await) => x  }',
    'function *f(){  foo(await)  }',
    'function *f(foo = await){}',
    'let x = function *f(foo = await){}',
    'let o = {*f(foo = await){}}',
    'class x {f(foo = await){}}',
    'class x {*f(foo = await){}}',
    'async function await(){}',
    'function *await(){}',
    'async function f(){ new (await foo) }',
    'async function f(){ await \n x; }',
    'async function f(){ await foo\n/foo/g }',
    '(await())',
    'async(await);',
    'function f() { var await; }',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'async(await);',
    'function call(foo=await){}',
    'function call(await){}',
    `async function f() {
        let { [await "a"]: a } = { a: 1 };
        return a;
      }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });

    it(`"use strict"; function* g() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseScript(`"use strict"; function* g() {${arg}}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `var lambdaArgs = await (async (a, b ,c) => a + b + c);`,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'await',
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
                  arguments: [
                    {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'BinaryExpression',
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
                          operator: '+',
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
                        },
                        right: {
                          type: 'Identifier',
                          name: 'c',
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
                        operator: '+',
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
                      },
                      params: [
                        {
                          type: 'Identifier',
                          name: 'a',
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
                        {
                          type: 'Identifier',
                          name: 'b',
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
                        {
                          type: 'Identifier',
                          name: 'c',
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
                      async: true,
                      expression: true,
                      start: 24,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    }
                  ],
                  optional: false,
                  shortCircuited: false,
                  start: 17,
                  end: 53,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 53
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'lambdaArgs',
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
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 53
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
      `async ({await: a}) => 1`,
      Context.OptionsLoc,
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
                value: 1,
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await',
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                }
              ],
              async: true,
              expression: true,
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
      `async function a() { let a = await import('./foo.js'); }`,
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
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'ImportExpression',
                          source: {
                            type: 'Literal',
                            value: './foo.js',
                            start: 42,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 42
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            }
                          },
                          start: 35,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        },
                        start: 29,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      },
                      id: {
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
                      start: 25,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      }
                    }
                  ],
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
                  }
                }
              ],
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
              }
            },
            async: true,
            generator: false,
            id: {
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
      `async function a() { try { let a = await import({ toString() { throw new Error('out'); } }); } catch (e) {} }`,
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
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'AwaitExpression',
                              argument: {
                                type: 'ImportExpression',
                                source: {
                                  type: 'ObjectExpression',
                                  properties: [
                                    {
                                      type: 'Property',
                                      key: {
                                        type: 'Identifier',
                                        name: 'toString',
                                        start: 50,
                                        end: 58,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 50
                                          },
                                          end: {
                                            line: 1,
                                            column: 58
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
                                              type: 'ThrowStatement',
                                              argument: {
                                                type: 'NewExpression',
                                                callee: {
                                                  type: 'Identifier',
                                                  name: 'Error',
                                                  start: 73,
                                                  end: 78,
                                                  loc: {
                                                    start: {
                                                      line: 1,
                                                      column: 73
                                                    },
                                                    end: {
                                                      line: 1,
                                                      column: 78
                                                    }
                                                  }
                                                },
                                                arguments: [
                                                  {
                                                    type: 'Literal',
                                                    value: 'out',
                                                    start: 79,
                                                    end: 84,
                                                    loc: {
                                                      start: {
                                                        line: 1,
                                                        column: 79
                                                      },
                                                      end: {
                                                        line: 1,
                                                        column: 84
                                                      }
                                                    }
                                                  }
                                                ],
                                                start: 69,
                                                end: 85,
                                                loc: {
                                                  start: {
                                                    line: 1,
                                                    column: 69
                                                  },
                                                  end: {
                                                    line: 1,
                                                    column: 85
                                                  }
                                                }
                                              },
                                              start: 63,
                                              end: 86,
                                              loc: {
                                                start: {
                                                  line: 1,
                                                  column: 63
                                                },
                                                end: {
                                                  line: 1,
                                                  column: 86
                                                }
                                              }
                                            }
                                          ],
                                          start: 61,
                                          end: 88,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 61
                                            },
                                            end: {
                                              line: 1,
                                              column: 88
                                            }
                                          }
                                        },
                                        async: false,
                                        generator: false,
                                        id: null,
                                        start: 58,
                                        end: 88,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 58
                                          },
                                          end: {
                                            line: 1,
                                            column: 88
                                          }
                                        }
                                      },
                                      kind: 'init',
                                      computed: false,
                                      method: true,
                                      shorthand: false,
                                      start: 50,
                                      end: 88,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 50
                                        },
                                        end: {
                                          line: 1,
                                          column: 88
                                        }
                                      }
                                    }
                                  ],
                                  start: 48,
                                  end: 90,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 48
                                    },
                                    end: {
                                      line: 1,
                                      column: 90
                                    }
                                  }
                                },
                                start: 41,
                                end: 91,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 41
                                  },
                                  end: {
                                    line: 1,
                                    column: 91
                                  }
                                }
                              },
                              start: 35,
                              end: 91,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 35
                                },
                                end: {
                                  line: 1,
                                  column: 91
                                }
                              }
                            },
                            id: {
                              type: 'Identifier',
                              name: 'a',
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
                            start: 31,
                            end: 91,
                            loc: {
                              start: {
                                line: 1,
                                column: 31
                              },
                              end: {
                                line: 1,
                                column: 91
                              }
                            }
                          }
                        ],
                        start: 27,
                        end: 92,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 92
                          }
                        }
                      }
                    ],
                    start: 25,
                    end: 94,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 94
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 102,
                      end: 103,
                      loc: {
                        start: {
                          line: 1,
                          column: 102
                        },
                        end: {
                          line: 1,
                          column: 103
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 105,
                      end: 107,
                      loc: {
                        start: {
                          line: 1,
                          column: 105
                        },
                        end: {
                          line: 1,
                          column: 107
                        }
                      }
                    },
                    start: 95,
                    end: 107,
                    loc: {
                      start: {
                        line: 1,
                        column: 95
                      },
                      end: {
                        line: 1,
                        column: 107
                      }
                    }
                  },
                  finalizer: null,
                  start: 21,
                  end: 107,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 107
                    }
                  }
                }
              ],
              start: 19,
              end: 109,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 109
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
            start: 0,
            end: 109,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 109
              }
            }
          }
        ],
        start: 0,
        end: 109,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 109
          }
        }
      }
    ],
    [
      `x(async () => { await y.x('foo'); });`,
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
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'CallExpression',
                            callee: {
                              type: 'MemberExpression',
                              object: {
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
                              computed: false,
                              property: {
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
                              optional: false,
                              shortCircuited: false,
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
                            arguments: [
                              {
                                type: 'Literal',
                                value: 'foo',
                                start: 26,
                                end: 31,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 26
                                  },
                                  end: {
                                    line: 1,
                                    column: 31
                                  }
                                }
                              }
                            ],
                            optional: false,
                            shortCircuited: false,
                            start: 22,
                            end: 32,
                            loc: {
                              start: {
                                line: 1,
                                column: 22
                              },
                              end: {
                                line: 1,
                                column: 32
                              }
                            }
                          },
                          start: 16,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 16
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        start: 16,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      }
                    ],
                    start: 14,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  params: [],
                  async: true,
                  expression: false,
                  start: 2,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `function x() { return async () => { return await new.target }; }`,
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
                  type: 'ReturnStatement',
                  argument: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'AwaitExpression',
                            argument: {
                              type: 'MetaProperty',
                              meta: {
                                type: 'Identifier',
                                name: 'new',
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
                              property: {
                                type: 'Identifier',
                                name: 'target',
                                start: 53,
                                end: 59,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 53
                                  },
                                  end: {
                                    line: 1,
                                    column: 59
                                  }
                                }
                              },
                              start: 49,
                              end: 59,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 49
                                },
                                end: {
                                  line: 1,
                                  column: 59
                                }
                              }
                            },
                            start: 43,
                            end: 59,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 59
                              }
                            }
                          },
                          start: 36,
                          end: 59,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 59
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    params: [],
                    async: true,
                    expression: false,
                    start: 22,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  start: 15,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 13,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `async function test() { try { if (!await internals.hasServiceWorkerRegistration(self.origin)) {} } catch(a) {} }`,
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
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'IfStatement',
                        test: {
                          type: 'UnaryExpression',
                          operator: '!',
                          argument: {
                            type: 'AwaitExpression',
                            argument: {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'internals',
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
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'hasServiceWorkerRegistration',
                                  start: 51,
                                  end: 79,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 51
                                    },
                                    end: {
                                      line: 1,
                                      column: 79
                                    }
                                  }
                                },
                                optional: false,
                                shortCircuited: false,
                                start: 41,
                                end: 79,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 41
                                  },
                                  end: {
                                    line: 1,
                                    column: 79
                                  }
                                }
                              },
                              arguments: [
                                {
                                  type: 'MemberExpression',
                                  object: {
                                    type: 'Identifier',
                                    name: 'self',
                                    start: 80,
                                    end: 84,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 80
                                      },
                                      end: {
                                        line: 1,
                                        column: 84
                                      }
                                    }
                                  },
                                  computed: false,
                                  property: {
                                    type: 'Identifier',
                                    name: 'origin',
                                    start: 85,
                                    end: 91,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 85
                                      },
                                      end: {
                                        line: 1,
                                        column: 91
                                      }
                                    }
                                  },
                                  optional: false,
                                  shortCircuited: false,
                                  start: 80,
                                  end: 91,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 80
                                    },
                                    end: {
                                      line: 1,
                                      column: 91
                                    }
                                  }
                                }
                              ],
                              optional: false,
                              shortCircuited: false,
                              start: 41,
                              end: 92,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 41
                                },
                                end: {
                                  line: 1,
                                  column: 92
                                }
                              }
                            },
                            start: 35,
                            end: 92,
                            loc: {
                              start: {
                                line: 1,
                                column: 35
                              },
                              end: {
                                line: 1,
                                column: 92
                              }
                            }
                          },
                          prefix: true,
                          start: 34,
                          end: 92,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 92
                            }
                          }
                        },
                        consequent: {
                          type: 'BlockStatement',
                          body: [],
                          start: 94,
                          end: 96,
                          loc: {
                            start: {
                              line: 1,
                              column: 94
                            },
                            end: {
                              line: 1,
                              column: 96
                            }
                          }
                        },
                        alternate: null,
                        start: 30,
                        end: 96,
                        loc: {
                          start: {
                            line: 1,
                            column: 30
                          },
                          end: {
                            line: 1,
                            column: 96
                          }
                        }
                      }
                    ],
                    start: 28,
                    end: 98,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 98
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'a',
                      start: 105,
                      end: 106,
                      loc: {
                        start: {
                          line: 1,
                          column: 105
                        },
                        end: {
                          line: 1,
                          column: 106
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 108,
                      end: 110,
                      loc: {
                        start: {
                          line: 1,
                          column: 108
                        },
                        end: {
                          line: 1,
                          column: 110
                        }
                      }
                    },
                    start: 99,
                    end: 110,
                    loc: {
                      start: {
                        line: 1,
                        column: 99
                      },
                      end: {
                        line: 1,
                        column: 110
                      }
                    }
                  },
                  finalizer: null,
                  start: 24,
                  end: 110,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 110
                    }
                  }
                }
              ],
              start: 22,
              end: 112,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 112
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'test',
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
            start: 0,
            end: 112,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 112
              }
            }
          }
        ],
        start: 0,
        end: 112,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 112
          }
        }
      }
    ],
    [
      `async function one(x) { await two(x); }`,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'two',
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
                      arguments: [
                        {
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
                        }
                      ],
                      optional: false,
                      shortCircuited: false,
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
                    start: 24,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 24,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 22,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 22
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'one',
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
      `async function* x({y = (0x44FB6C6428574)}) { while (({} = ([]), {} = function (z) { while (((await))) ;}) => f = [, ]) {}}`,
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Literal',
                        value: 1213546335733108,
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
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                start: 18,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'WhileStatement',
                  test: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'f',
                        start: 109,
                        end: 110,
                        loc: {
                          start: {
                            line: 1,
                            column: 109
                          },
                          end: {
                            line: 1,
                            column: 110
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'ArrayExpression',
                        elements: [null],
                        start: 113,
                        end: 117,
                        loc: {
                          start: {
                            line: 1,
                            column: 113
                          },
                          end: {
                            line: 1,
                            column: 117
                          }
                        }
                      },
                      start: 109,
                      end: 117,
                      loc: {
                        start: {
                          line: 1,
                          column: 109
                        },
                        end: {
                          line: 1,
                          column: 117
                        }
                      }
                    },
                    params: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'ObjectPattern',
                          properties: [],
                          start: 53,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 53
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        },
                        right: {
                          type: 'ArrayExpression',
                          elements: [],
                          start: 59,
                          end: 61,
                          loc: {
                            start: {
                              line: 1,
                              column: 59
                            },
                            end: {
                              line: 1,
                              column: 61
                            }
                          }
                        },
                        start: 53,
                        end: 62,
                        loc: {
                          start: {
                            line: 1,
                            column: 53
                          },
                          end: {
                            line: 1,
                            column: 62
                          }
                        }
                      },
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'ObjectPattern',
                          properties: [],
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
                        },
                        right: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'Identifier',
                              name: 'z',
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
                              }
                            }
                          ],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'WhileStatement',
                                test: {
                                  type: 'Identifier',
                                  name: 'await',
                                  start: 93,
                                  end: 98,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 93
                                    },
                                    end: {
                                      line: 1,
                                      column: 98
                                    }
                                  }
                                },
                                body: {
                                  type: 'EmptyStatement',
                                  start: 102,
                                  end: 103,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 102
                                    },
                                    end: {
                                      line: 1,
                                      column: 103
                                    }
                                  }
                                },
                                start: 84,
                                end: 103,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 84
                                  },
                                  end: {
                                    line: 1,
                                    column: 103
                                  }
                                }
                              }
                            ],
                            start: 82,
                            end: 104,
                            loc: {
                              start: {
                                line: 1,
                                column: 82
                              },
                              end: {
                                line: 1,
                                column: 104
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: null,
                          start: 69,
                          end: 104,
                          loc: {
                            start: {
                              line: 1,
                              column: 69
                            },
                            end: {
                              line: 1,
                              column: 104
                            }
                          }
                        },
                        start: 64,
                        end: 104,
                        loc: {
                          start: {
                            line: 1,
                            column: 64
                          },
                          end: {
                            line: 1,
                            column: 104
                          }
                        }
                      }
                    ],
                    async: false,
                    expression: true,
                    start: 52,
                    end: 117,
                    loc: {
                      start: {
                        line: 1,
                        column: 52
                      },
                      end: {
                        line: 1,
                        column: 117
                      }
                    }
                  },
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 119,
                    end: 121,
                    loc: {
                      start: {
                        line: 1,
                        column: 119
                      },
                      end: {
                        line: 1,
                        column: 121
                      }
                    }
                  },
                  start: 45,
                  end: 121,
                  loc: {
                    start: {
                      line: 1,
                      column: 45
                    },
                    end: {
                      line: 1,
                      column: 121
                    }
                  }
                }
              ],
              start: 43,
              end: 122,
              loc: {
                start: {
                  line: 1,
                  column: 43
                },
                end: {
                  line: 1,
                  column: 122
                }
              }
            },
            async: true,
            generator: true,
            id: {
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
            end: 122,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 122
              }
            }
          }
        ],
        start: 0,
        end: 122,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 122
          }
        }
      }
    ],
    [
      `async function* x() { let r = n * await asyncFact(n - 1); }`,
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
                  kind: 'let',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'n',
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
                          type: 'AwaitExpression',
                          argument: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'asyncFact',
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
                            arguments: [
                              {
                                type: 'BinaryExpression',
                                left: {
                                  type: 'Identifier',
                                  name: 'n',
                                  start: 50,
                                  end: 51,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 50
                                    },
                                    end: {
                                      line: 1,
                                      column: 51
                                    }
                                  }
                                },
                                right: {
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
                                },
                                operator: '-',
                                start: 50,
                                end: 55,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 50
                                  },
                                  end: {
                                    line: 1,
                                    column: 55
                                  }
                                }
                              }
                            ],
                            optional: false,
                            shortCircuited: false,
                            start: 40,
                            end: 56,
                            loc: {
                              start: {
                                line: 1,
                                column: 40
                              },
                              end: {
                                line: 1,
                                column: 56
                              }
                            }
                          },
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
                        operator: '*',
                        start: 30,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 30
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'r',
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
                  start: 22,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 20,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
            async: true,
            generator: true,
            id: {
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
      `(async function x(y) { await 1; }).length`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'FunctionExpression',
                params: [
                  {
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
                  }
                ],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
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
                        start: 23,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 23,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                },
                async: true,
                generator: false,
                id: {
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
                start: 1,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'length',
                start: 35,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 35
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              optional: false,
              shortCircuited: false,
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
      `i = async function i() {
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
                name: 'i',
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
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 37,
                            end: 38,
                            loc: {
                              start: {
                                line: 2,
                                column: 12
                              },
                              end: {
                                line: 2,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 37,
                          end: 40,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 2,
                              column: 15
                            }
                          }
                        },
                        start: 31,
                        end: 40,
                        loc: {
                          start: {
                            line: 2,
                            column: 6
                          },
                          end: {
                            line: 2,
                            column: 15
                          }
                        }
                      },
                      start: 31,
                      end: 41,
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
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 54,
                            end: 55,
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
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 54,
                          end: 57,
                          loc: {
                            start: {
                              line: 3,
                              column: 12
                            },
                            end: {
                              line: 3,
                              column: 15
                            }
                          }
                        },
                        start: 48,
                        end: 57,
                        loc: {
                          start: {
                            line: 3,
                            column: 6
                          },
                          end: {
                            line: 3,
                            column: 15
                          }
                        }
                      },
                      start: 48,
                      end: 58,
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
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 71,
                            end: 72,
                            loc: {
                              start: {
                                line: 4,
                                column: 12
                              },
                              end: {
                                line: 4,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 71,
                          end: 74,
                          loc: {
                            start: {
                              line: 4,
                              column: 12
                            },
                            end: {
                              line: 4,
                              column: 15
                            }
                          }
                        },
                        start: 65,
                        end: 74,
                        loc: {
                          start: {
                            line: 4,
                            column: 6
                          },
                          end: {
                            line: 4,
                            column: 15
                          }
                        }
                      },
                      start: 65,
                      end: 75,
                      loc: {
                        start: {
                          line: 4,
                          column: 6
                        },
                        end: {
                          line: 4,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 88,
                            end: 89,
                            loc: {
                              start: {
                                line: 5,
                                column: 12
                              },
                              end: {
                                line: 5,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 88,
                          end: 91,
                          loc: {
                            start: {
                              line: 5,
                              column: 12
                            },
                            end: {
                              line: 5,
                              column: 15
                            }
                          }
                        },
                        start: 82,
                        end: 91,
                        loc: {
                          start: {
                            line: 5,
                            column: 6
                          },
                          end: {
                            line: 5,
                            column: 15
                          }
                        }
                      },
                      start: 82,
                      end: 92,
                      loc: {
                        start: {
                          line: 5,
                          column: 6
                        },
                        end: {
                          line: 5,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 105,
                            end: 106,
                            loc: {
                              start: {
                                line: 6,
                                column: 12
                              },
                              end: {
                                line: 6,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 105,
                          end: 108,
                          loc: {
                            start: {
                              line: 6,
                              column: 12
                            },
                            end: {
                              line: 6,
                              column: 15
                            }
                          }
                        },
                        start: 99,
                        end: 108,
                        loc: {
                          start: {
                            line: 6,
                            column: 6
                          },
                          end: {
                            line: 6,
                            column: 15
                          }
                        }
                      },
                      start: 99,
                      end: 109,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 122,
                            end: 123,
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
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 122,
                          end: 125,
                          loc: {
                            start: {
                              line: 7,
                              column: 12
                            },
                            end: {
                              line: 7,
                              column: 15
                            }
                          }
                        },
                        start: 116,
                        end: 125,
                        loc: {
                          start: {
                            line: 7,
                            column: 6
                          },
                          end: {
                            line: 7,
                            column: 15
                          }
                        }
                      },
                      start: 116,
                      end: 126,
                      loc: {
                        start: {
                          line: 7,
                          column: 6
                        },
                        end: {
                          line: 7,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 139,
                            end: 140,
                            loc: {
                              start: {
                                line: 8,
                                column: 12
                              },
                              end: {
                                line: 8,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 139,
                          end: 142,
                          loc: {
                            start: {
                              line: 8,
                              column: 12
                            },
                            end: {
                              line: 8,
                              column: 15
                            }
                          }
                        },
                        start: 133,
                        end: 142,
                        loc: {
                          start: {
                            line: 8,
                            column: 6
                          },
                          end: {
                            line: 8,
                            column: 15
                          }
                        }
                      },
                      start: 133,
                      end: 143,
                      loc: {
                        start: {
                          line: 8,
                          column: 6
                        },
                        end: {
                          line: 8,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 156,
                            end: 157,
                            loc: {
                              start: {
                                line: 9,
                                column: 12
                              },
                              end: {
                                line: 9,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 156,
                          end: 159,
                          loc: {
                            start: {
                              line: 9,
                              column: 12
                            },
                            end: {
                              line: 9,
                              column: 15
                            }
                          }
                        },
                        start: 150,
                        end: 159,
                        loc: {
                          start: {
                            line: 9,
                            column: 6
                          },
                          end: {
                            line: 9,
                            column: 15
                          }
                        }
                      },
                      start: 150,
                      end: 160,
                      loc: {
                        start: {
                          line: 9,
                          column: 6
                        },
                        end: {
                          line: 9,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'j',
                            start: 173,
                            end: 174,
                            loc: {
                              start: {
                                line: 10,
                                column: 12
                              },
                              end: {
                                line: 10,
                                column: 13
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 173,
                          end: 176,
                          loc: {
                            start: {
                              line: 10,
                              column: 12
                            },
                            end: {
                              line: 10,
                              column: 15
                            }
                          }
                        },
                        start: 167,
                        end: 176,
                        loc: {
                          start: {
                            line: 10,
                            column: 6
                          },
                          end: {
                            line: 10,
                            column: 15
                          }
                        }
                      },
                      start: 167,
                      end: 177,
                      loc: {
                        start: {
                          line: 10,
                          column: 6
                        },
                        end: {
                          line: 10,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'j',
                          start: 191,
                          end: 192,
                          loc: {
                            start: {
                              line: 11,
                              column: 13
                            },
                            end: {
                              line: 11,
                              column: 14
                            }
                          }
                        },
                        arguments: [],
                        optional: false,
                        shortCircuited: false,
                        start: 191,
                        end: 194,
                        loc: {
                          start: {
                            line: 11,
                            column: 13
                          },
                          end: {
                            line: 11,
                            column: 16
                          }
                        }
                      },
                      start: 184,
                      end: 195,
                      loc: {
                        start: {
                          line: 11,
                          column: 6
                        },
                        end: {
                          line: 11,
                          column: 17
                        }
                      }
                    }
                  ],
                  start: 23,
                  end: 201,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 12,
                      column: 5
                    }
                  }
                },
                async: true,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'i',
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
                start: 4,
                end: 201,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 12,
                    column: 5
                  }
                }
              },
              start: 0,
              end: 201,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 12,
                  column: 5
                }
              }
            },
            start: 0,
            end: 202,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 12,
                column: 6
              }
            }
          }
        ],
        start: 0,
        end: 202,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 12,
            column: 6
          }
        }
      }
    ],
    [
      `async function h() { for await (let x of ["a"]) { Debugger(); } };`,
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
                  type: 'ForOfStatement',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'Debugger',
                            start: 50,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 50
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            }
                          },
                          arguments: [],
                          optional: false,
                          shortCircuited: false,
                          start: 50,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        },
                        start: 50,
                        end: 61,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 61
                          }
                        }
                      }
                    ],
                    start: 48,
                    end: 63,
                    loc: {
                      start: {
                        line: 1,
                        column: 48
                      },
                      end: {
                        line: 1,
                        column: 63
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
                      }
                    ],
                    start: 32,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: 'a',
                        start: 42,
                        end: 45,
                        loc: {
                          start: {
                            line: 1,
                            column: 42
                          },
                          end: {
                            line: 1,
                            column: 45
                          }
                        }
                      }
                    ],
                    start: 41,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  await: false,
                  start: 21,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  }
                }
              ],
              start: 19,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 65
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'h',
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
          },
          {
            type: 'EmptyStatement',
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
          }
        ],
        start: 0,
        end: 66,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 66
          }
        }
      }
    ],
    [
      `async function caught_reject() {
      try {
        await reject;
      } catch (e) {
        assertEquals("b", e);
      }
    }`,
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
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'reject',
                            start: 59,
                            end: 65,
                            loc: {
                              start: {
                                line: 3,
                                column: 14
                              },
                              end: {
                                line: 3,
                                column: 20
                              }
                            }
                          },
                          start: 53,
                          end: 65,
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
                        start: 53,
                        end: 66,
                        loc: {
                          start: {
                            line: 3,
                            column: 8
                          },
                          end: {
                            line: 3,
                            column: 21
                          }
                        }
                      }
                    ],
                    start: 43,
                    end: 74,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 4,
                        column: 7
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 82,
                      end: 83,
                      loc: {
                        start: {
                          line: 4,
                          column: 15
                        },
                        end: {
                          line: 4,
                          column: 16
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'assertEquals',
                              start: 95,
                              end: 107,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 8
                                },
                                end: {
                                  line: 5,
                                  column: 20
                                }
                              }
                            },
                            arguments: [
                              {
                                type: 'Literal',
                                value: 'b',
                                start: 108,
                                end: 111,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 21
                                  },
                                  end: {
                                    line: 5,
                                    column: 24
                                  }
                                }
                              },
                              {
                                type: 'Identifier',
                                name: 'e',
                                start: 113,
                                end: 114,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 26
                                  },
                                  end: {
                                    line: 5,
                                    column: 27
                                  }
                                }
                              }
                            ],
                            optional: false,
                            shortCircuited: false,
                            start: 95,
                            end: 115,
                            loc: {
                              start: {
                                line: 5,
                                column: 8
                              },
                              end: {
                                line: 5,
                                column: 28
                              }
                            }
                          },
                          start: 95,
                          end: 116,
                          loc: {
                            start: {
                              line: 5,
                              column: 8
                            },
                            end: {
                              line: 5,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 85,
                      end: 124,
                      loc: {
                        start: {
                          line: 4,
                          column: 18
                        },
                        end: {
                          line: 6,
                          column: 7
                        }
                      }
                    },
                    start: 75,
                    end: 124,
                    loc: {
                      start: {
                        line: 4,
                        column: 8
                      },
                      end: {
                        line: 6,
                        column: 7
                      }
                    }
                  },
                  finalizer: null,
                  start: 39,
                  end: 124,
                  loc: {
                    start: {
                      line: 2,
                      column: 6
                    },
                    end: {
                      line: 6,
                      column: 7
                    }
                  }
                }
              ],
              start: 31,
              end: 130,
              loc: {
                start: {
                  line: 1,
                  column: 31
                },
                end: {
                  line: 7,
                  column: 5
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'caught_reject',
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
            },
            start: 0,
            end: 130,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 7,
                column: 5
              }
            }
          }
        ],
        start: 0,
        end: 130,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 5
          }
        }
      }
    ],
    [
      `async r => result = [...{ x = await x }] = y;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'AssignmentExpression',
                left: {
                  type: 'Identifier',
                  name: 'result',
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
                operator: '=',
                right: {
                  type: 'AssignmentExpression',
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
                              value: {
                                type: 'AssignmentPattern',
                                left: {
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
                                right: {
                                  type: 'AwaitExpression',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                  start: 30,
                                  end: 37,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 30
                                    },
                                    end: {
                                      line: 1,
                                      column: 37
                                    }
                                  }
                                },
                                start: 26,
                                end: 37,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 26
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
                              shorthand: true,
                              start: 26,
                              end: 37,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 26
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
                    type: 'Identifier',
                    name: 'y',
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
                  start: 20,
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                },
                start: 11,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'r',
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
              async: true,
              expression: true,
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
      `result = [...{ x = await }] = y;`,
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
                name: 'result',
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
                type: 'AssignmentExpression',
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
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                      },
                      start: 10,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
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
                operator: '=',
                right: {
                  type: 'Identifier',
                  name: 'y',
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
                start: 9,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 9
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
      `class x {*f(await){}}`,
      Context.OptionsLoc,
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await',
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
                    id: null,
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
                  start: 9,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
              start: 8,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 8
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
      `function *f(await){}`,
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
                name: 'await',
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
      `let x = function *f(await){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'await',
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
                  generator: true,
                  id: {
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
                  start: 8,
                  end: 28,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 28
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
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `let o = {*f(await){}}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
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
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'await',
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
                        id: null,
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
                      method: true,
                      shorthand: false,
                      start: 9,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    }
                  ],
                  start: 8,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 21
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'o',
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
      `class x {f(await){}}`,
      Context.OptionsLoc,
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
                  value: {
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await',
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
                    id: null,
                    start: 10,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
                  start: 9,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                }
              ],
              start: 8,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 20
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
      `function f(await){}`,
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
                name: 'await',
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
      `let x = function f(await){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'FunctionExpression',
                  params: [
                    {
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
                  start: 8,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 27
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
      `let o = {f(await){}}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
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
                      value: {
                        type: 'FunctionExpression',
                        params: [
                          {
                            type: 'Identifier',
                            name: 'await',
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
                        id: null,
                        start: 10,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 10
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
                      start: 9,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    }
                  ],
                  start: 8,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'o',
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
      `function *f(){  foo(await)  }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
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
                    arguments: [
                      {
                        type: 'Identifier',
                        name: 'await',
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
                    optional: false,
                    shortCircuited: false,
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
      `function *f(){  (await) => x  }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'ArrowFunctionExpression',
                    body: {
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
                    params: [
                      {
                        type: 'Identifier',
                        name: 'await',
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
                      }
                    ],
                    async: false,
                    expression: true,
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
              start: 13,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 31
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
      `async g => (x = [await y])`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'AssignmentExpression',
                left: {
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
                operator: '=',
                right: {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'AwaitExpression',
                      argument: {
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
                },
                start: 12,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              async: true,
              expression: true,
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
      `{ (x = [await]) }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
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
                  operator: '=',
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'await',
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
                    start: 7,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 3,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
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
      `class x {async await(){}}`,
      Context.OptionsLoc,
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
                    name: 'await',
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
                  value: {
                    type: 'FunctionExpression',
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
                    async: true,
                    generator: false,
                    id: null,
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
                }
              ],
              start: 8,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 8
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
      `async function await(){}`,
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
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'await',
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
      `async function *await(){}`,
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'await',
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
      `let o = {async await(){}}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
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
                        name: 'await',
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
                      value: {
                        type: 'FunctionExpression',
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
                        async: true,
                        generator: false,
                        id: null,
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
                      method: true,
                      shorthand: false,
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
                    }
                  ],
                  start: 8,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'o',
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
      `function *await(){}`,
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'await',
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
      `let x = function *await(){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
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
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'await',
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
                  },
                  start: 8,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 27
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
      `function await(){}`,
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
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'await',
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
      `let o = {await(){}}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
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
                        name: 'await',
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
                      value: {
                        type: 'FunctionExpression',
                        params: [],
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
                        async: false,
                        generator: false,
                        id: null,
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
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
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
                id: {
                  type: 'Identifier',
                  name: 'o',
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
      `await / x`,
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
                type: 'Identifier',
                name: 'await',
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
      `(x=(await)=y)=>z`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'z',
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'await',
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
                    operator: '=',
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    start: 3,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    }
                  },
                  start: 1,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `async function f(){    function g(x=(await)=y){}   }`,
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
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'Identifier',
                          name: 'await',
                          start: 37,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
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
                          name: 'y',
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
                      start: 34,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 46,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 46
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
                    name: 'g',
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
      `async function g() { function f(a = await) {} }`,
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
                  params: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                        type: 'Identifier',
                        name: 'await',
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
                      start: 32,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    }
                  ],
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
                    name: 'f',
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
              start: 19,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 47
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `async function g() { function f(...await) {} }`,
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
                  params: [
                    {
                      type: 'RestElement',
                      argument: {
                        type: 'Identifier',
                        name: 'await',
                        start: 35,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
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
                    body: [],
                    start: 42,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                }
              ],
              start: 19,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 46
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function f(await) {}`,
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
                name: 'await',
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
      `function f({a = await}) {}`,
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
                    value: {
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
                        type: 'Identifier',
                        name: 'await',
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
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
      `function f({a: b = await}) {}`,
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
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
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 12,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  }
                ],
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
      `let y = async x => { await x; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'AwaitExpression',
                          argument: {
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
                        },
                        start: 21,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  params: [
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
                  async: true,
                  expression: false,
                  start: 8,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                },
                id: {
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
      `await`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'await',
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
      `await[x]`,
      Context.OptionsLoc,
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
                name: 'await',
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
              computed: true,
              property: {
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
              optional: false,
              shortCircuited: false,
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
      `call(await[1])`,
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
                name: 'call',
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
              arguments: [
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'await',
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
                  optional: false,
                  shortCircuited: false,
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
              optional: false,
              shortCircuited: false,
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
      `async(await);`,
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
              arguments: [
                {
                  type: 'Identifier',
                  name: 'await',
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
              optional: false,
              shortCircuited: false,
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
      `async function f(){ await await foo; }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'AwaitExpression',
                      argument: {
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
                    start: 20,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  start: 20,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 18,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 38
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
      `async function f(){ new (await foo) }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'NewExpression',
                    callee: {
                      type: 'AwaitExpression',
                      argument: {
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
                    arguments: [],
                    start: 20,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  start: 20,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              start: 18,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 37
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
      `function f() { var await = 10; var o = { await }; }`,
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
                        type: 'Literal',
                        value: 10,
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
                              name: 'await',
                              start: 41,
                              end: 46,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 41
                                },
                                end: {
                                  line: 1,
                                  column: 46
                                }
                              }
                            },
                            value: {
                              type: 'Identifier',
                              name: 'await',
                              start: 41,
                              end: 46,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 41
                                },
                                end: {
                                  line: 1,
                                  column: 46
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
                            start: 41,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 41
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          }
                        ],
                        start: 39,
                        end: 48,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 48
                          }
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'o',
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
                      start: 35,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    }
                  ],
                  start: 31,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 31
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                }
              ],
              start: 13,
              end: 51,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
    [
      `function f() { const await = 10; }`,
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
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Literal',
                        value: 10,
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
                      id: {
                        type: 'Identifier',
                        name: 'await',
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
                      }
                    }
                  ],
                  start: 15,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                }
              ],
              start: 13,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `var O = { *method() { var await = 1; return await; } };`,
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
                                  init: {
                                    type: 'Literal',
                                    value: 1,
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
                                  id: {
                                    type: 'Identifier',
                                    name: 'await',
                                    start: 26,
                                    end: 31,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 26
                                      },
                                      end: {
                                        line: 1,
                                        column: 31
                                      }
                                    }
                                  },
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
                                }
                              ],
                              start: 22,
                              end: 36,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 22
                                },
                                end: {
                                  line: 1,
                                  column: 36
                                }
                              }
                            },
                            {
                              type: 'ReturnStatement',
                              argument: {
                                type: 'Identifier',
                                name: 'await',
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
                              start: 37,
                              end: 50,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 37
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
                        generator: true,
                        id: null,
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
                      kind: 'init',
                      computed: false,
                      method: true,
                      shorthand: false,
                      start: 10,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    }
                  ],
                  start: 8,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'O',
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
                end: 54,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      }
    ],
    [
      `var asyncFn = async({ foo = 1 }) => foo;`,
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
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          },
                          value: {
                            type: 'AssignmentPattern',
                            left: {
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
                            },
                            right: {
                              type: 'Literal',
                              value: 1,
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
                            start: 22,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 22
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
                          start: 22,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
                            },
                            end: {
                              line: 1,
                              column: 29
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
                  async: true,
                  expression: true,
                  start: 14,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'asyncFn',
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
      `function* foo() { var await = 1; return await; }`,
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
                      id: {
                        type: 'Identifier',
                        name: 'await',
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
                {
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'await',
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
                  start: 33,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 16,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            async: false,
            generator: true,
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
    ],
    [
      `async function a(){     async ([y] = [{m: 5 + t(await bar)}]);     }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async',
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
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'y',
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
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm',
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
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5,
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
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't',
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
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar',
                                            start: 54,
                                            end: 57,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 54
                                              },
                                              end: {
                                                line: 1,
                                                column: 57
                                              }
                                            }
                                          },
                                          start: 48,
                                          end: 57,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 48
                                            },
                                            end: {
                                              line: 1,
                                              column: 57
                                            }
                                          }
                                        }
                                      ],
                                      optional: false,
                                      shortCircuited: false,
                                      start: 46,
                                      end: 58,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 46
                                        },
                                        end: {
                                          line: 1,
                                          column: 58
                                        }
                                      }
                                    },
                                    operator: '+',
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
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false,
                                  start: 39,
                                  end: 58,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 39
                                    },
                                    end: {
                                      line: 1,
                                      column: 58
                                    }
                                  }
                                }
                              ],
                              start: 38,
                              end: 59,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 59
                                }
                              }
                            }
                          ],
                          start: 37,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        },
                        start: 31,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        }
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  start: 24,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 18,
              end: 68,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 68
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
      `async function f() { await 3; }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AwaitExpression',
                    argument: {
                      type: 'Literal',
                      value: 3,
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
                  },
                  start: 21,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
              start: 19,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 31
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
      `async function a(){     async ({r} = await bar);     }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async',
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
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'r',
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
                              value: {
                                type: 'Identifier',
                                name: 'r',
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
                              shorthand: true,
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
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 43,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          },
                          start: 37,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
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
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  start: 24,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              start: 18,
              end: 54,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 54
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
      `y = async x => await x`,
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
                name: 'y',
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
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'AwaitExpression',
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
                params: [
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
                  }
                ],
                async: true,
                expression: true,
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
      `async function a(){     async ([v] = await bar);     }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async',
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
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
                          type: 'ArrayPattern',
                          elements: [
                            {
                              type: 'Identifier',
                              name: 'v',
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
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 43,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          },
                          start: 37,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
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
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  start: 24,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              start: 18,
              end: 54,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 54
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
      `async function a(){     async (foo = [{m: 5 + t(await bar)}]);     }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async',
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
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'ObjectExpression',
                              properties: [
                                {
                                  type: 'Property',
                                  key: {
                                    type: 'Identifier',
                                    name: 'm',
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
                                    type: 'BinaryExpression',
                                    left: {
                                      type: 'Literal',
                                      value: 5,
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
                                    right: {
                                      type: 'CallExpression',
                                      callee: {
                                        type: 'Identifier',
                                        name: 't',
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
                                      arguments: [
                                        {
                                          type: 'AwaitExpression',
                                          argument: {
                                            type: 'Identifier',
                                            name: 'bar',
                                            start: 54,
                                            end: 57,
                                            loc: {
                                              start: {
                                                line: 1,
                                                column: 54
                                              },
                                              end: {
                                                line: 1,
                                                column: 57
                                              }
                                            }
                                          },
                                          start: 48,
                                          end: 57,
                                          loc: {
                                            start: {
                                              line: 1,
                                              column: 48
                                            },
                                            end: {
                                              line: 1,
                                              column: 57
                                            }
                                          }
                                        }
                                      ],
                                      optional: false,
                                      shortCircuited: false,
                                      start: 46,
                                      end: 58,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 46
                                        },
                                        end: {
                                          line: 1,
                                          column: 58
                                        }
                                      }
                                    },
                                    operator: '+',
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
                                  kind: 'init',
                                  computed: false,
                                  method: false,
                                  shorthand: false,
                                  start: 39,
                                  end: 58,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 39
                                    },
                                    end: {
                                      line: 1,
                                      column: 58
                                    }
                                  }
                                }
                              ],
                              start: 38,
                              end: 59,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 59
                                }
                              }
                            }
                          ],
                          start: 37,
                          end: 60,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 60
                            }
                          }
                        },
                        start: 31,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        }
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  },
                  start: 24,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 18,
              end: 68,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 68
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
      `async (a = await)`,
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
              arguments: [
                {
                  type: 'AssignmentExpression',
                  left: {
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
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'await',
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
      `async (await)`,
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
              arguments: [
                {
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `async (...await)`,
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
              arguments: [
                {
                  type: 'SpreadElement',
                  argument: {
                    type: 'Identifier',
                    name: 'await',
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
              optional: false,
              shortCircuited: false,
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
      `async ([a = await])`,
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
              arguments: [
                {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'AssignmentExpression',
                      left: {
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
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'await',
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
                      start: 8,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      }
                    }
                  ],
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
              optional: false,
              shortCircuited: false,
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
      `async ({await})`,
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await',
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
                      value: {
                        type: 'Identifier',
                        name: 'await',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                  start: 7,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `async ({a: b = await})`,
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
              arguments: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        right: {
                          type: 'Identifier',
                          name: 'await',
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
                      shorthand: false,
                      start: 8,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    }
                  ],
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
      `async x => async (a = await b - a)`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    operator: '=',
                    right: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'b',
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
                        start: 22,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      },
                      right: {
                        type: 'Identifier',
                        name: 'a',
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
                      operator: '-',
                      start: 22,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 33
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
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async (a = await b - a / (async))`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    operator: '=',
                    right: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'b',
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
                        start: 22,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      },
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'a',
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
                          type: 'Identifier',
                          name: 'async',
                          start: 37,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        operator: '/',
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
                      operator: '-',
                      start: 22,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
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
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async (a = await b - a / await(async))`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    operator: '=',
                    right: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'b',
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
                        start: 22,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      },
                      right: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Identifier',
                          name: 'a',
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
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'async',
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
                        operator: '/',
                        start: 32,
                        end: 48,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 48
                          }
                        }
                      },
                      operator: '-',
                      start: 22,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
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
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
              start: 0,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 49
                }
              }
            },
            start: 0,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 49
              }
            }
          }
        ],
        start: 0,
        end: 49,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 49
          }
        }
      }
    ],
    [
      `async x => async ((a = await b) - a / (async))`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'BinaryExpression',
                    left: {
                      type: 'AssignmentExpression',
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
                      operator: '=',
                      right: {
                        type: 'AwaitExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'b',
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
                        start: 23,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      },
                      start: 19,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
                    right: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'a',
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
                      right: {
                        type: 'Identifier',
                        name: 'async',
                        start: 39,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 44
                          }
                        }
                      },
                      operator: '/',
                      start: 34,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    operator: '-',
                    start: 18,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 18,
                end: 46,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 46
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async ((a = b) => a - a / (await))`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'BinaryExpression',
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
                          name: 'await',
                          start: 38,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 38
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        },
                        operator: '/',
                        start: 33,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 33
                          },
                          end: {
                            line: 1,
                            column: 44
                          }
                        }
                      },
                      operator: '-',
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
                    params: [
                      {
                        type: 'AssignmentPattern',
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
                      }
                    ],
                    async: false,
                    expression: true,
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
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 18,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 45
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async (a = await b)`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    operator: '=',
                    right: {
                      type: 'AwaitExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'b',
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
                      start: 22,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
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
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async ([a = await b])`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'AssignmentExpression',
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
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'b',
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
                          start: 23,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        start: 19,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 18,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `async x => async ({a: b = await c})`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
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
                arguments: [
                  {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        value: {
                          type: 'AssignmentExpression',
                          left: {
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
                          operator: '=',
                          right: {
                            type: 'AwaitExpression',
                            argument: {
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
                            }
                          },
                          start: 22,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 22
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
                        start: 19,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      }
                    ],
                    start: 18,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  }
                ],
                optional: false,
                shortCircuited: false,
                start: 11,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `await => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'Identifier',
                  name: 'await',
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
              async: false,
              expression: true,
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
      `(a = await) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'AssignmentPattern',
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
                    name: 'await',
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
                  start: 1,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(await) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'Identifier',
                  name: 'await',
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
                }
              ],
              async: false,
              expression: true,
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
      `(...await) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'await',
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
              async: false,
              expression: true,
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
      `([a = await]) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'await',
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
                  start: 1,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                }
              ],
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
      `({a = await}) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'Identifier',
                          name: 'await',
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
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                  start: 1,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                }
              ],
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
      `({await}) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'await',
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
                      },
                      value: {
                        type: 'Identifier',
                        name: 'await',
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
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                  start: 1,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `({a: b = await}) => x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'AssignmentPattern',
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
                          name: 'await',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `async function f() { class x{[x](a=await){}} }`,
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
                  type: 'ClassDeclaration',
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
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'AssignmentPattern',
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
                                name: 'await',
                                start: 35,
                                end: 40,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 35
                                  },
                                  end: {
                                    line: 1,
                                    column: 40
                                  }
                                }
                              },
                              start: 33,
                              end: 40,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 33
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
                          async: false,
                          generator: false,
                          id: null,
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
                        start: 29,
                        end: 43,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 43
                          }
                        }
                      }
                    ],
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
                }
              ],
              start: 19,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 46
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
      `async function a(){     async (foo = await bar);     }`,
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'async',
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
                    },
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'AwaitExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'bar',
                            start: 43,
                            end: 46,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 46
                              }
                            }
                          },
                          start: 37,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
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
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
                    start: 24,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  start: 24,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              start: 18,
              end: 54,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 54
                }
              }
            },
            async: true,
            generator: false,
            id: {
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
