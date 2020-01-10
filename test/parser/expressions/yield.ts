import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Yield', () => {
  for (const [source, ctx] of [
    ['(a = yield 3) {}', Context.Empty],
    ['(a=yield) {}', Context.Empty],
    ['(yield 3) {}', Context.Empty],
    ['(yield = 1) {}', Context.Empty],
    ['({yield} = x)', Context.Strict],
    ['var obj = { *gf(b, a = yield) {} }', Context.Empty],
    ['function* gf() { yield++; }', Context.Empty],
    ['function* gf() { (yield) = 10; }', Context.Empty],
    ['function* gf() { (yield)++; }', Context.Empty],
    ['function *f(){ new yield x(); }', Context.Empty],
    ['function *gf(){ function yield(){}; }', Context.Empty],
    ['f = function*([...{ x } = []]) {}', Context.Empty],
    ['f = function*([...x, y] = [1, 2, 3]) {}', Context.Empty],
    ['function *as(){ o = {async *f(yield) {}} }', Context.Empty],
    ['var g = function*() { yield 3 + yield 4; };', Context.Empty],
    ['"use strict"; (function *g() { ( x = class { [(yield, 1)]() { }  ) => {} });', Context.Empty],
    ['var gen = function *() { void yield; };', Context.Empty],
    ['let gfe = function* yield() { }', Context.Empty],
    ['function *gf({yield}){}', Context.Empty],
    ['function*g([yield]){}', Context.Empty],
    ['function*g(yield = 0){}', Context.Empty],
    ['function *f(x=yield){ }', Context.Empty],
    ['function *f(x=(yield z)=y){}', Context.Empty],
    ['function *f(){    function *g(x=(yield z)=y){}   }', Context.Empty],
    ['function *gen() { var ng = (val = yield) => { } }', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield * g) {}', Context.Empty],
    ['function* gen(arguments) { "use strict"; }', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *gen(val = yield) {}', Context.Empty],
    ['function *f(yield){ }', Context.Empty],
    ['({x} = yield) => {}', Context.Strict],
    ['function *f(){ ({x} = yield x) => {} }', Context.Empty],
    ['function *f(){ ([x] = yield x) => {} }', Context.Empty],
    ['function *g(a, b, c, ...yield){}', Context.Empty],
    ['(function *(x, ...yield){})', Context.Empty],
    // ['function *a(){yield\n*a}', Context.Empty],
    ['function* gf() { var yield; }', Context.Empty],
    ['function* gf() { let yield; }', Context.Empty],
    ['function a(){ "use strict"; function a(a=yield){}}', Context.Empty],
    [
      `for (let a of (function*() {
      for (var b of (function*() {
              for (var c of (function*() {
                      for (var d of (function*() {
                              for (var e of (function*() {
                                      for (var f of (function*() {
                                              for (var g of (x = (yield * 2)) => (1)) {
                                              }
                                      })()) {
                                      }
                              })()) {
                              }
                      })()) {
                      }
              })()) {
              }
      })()) {
      }
    })()) {
    }`,
      Context.Empty
    ],
    ['async (a = yield b)', Context.OptionsDisableWebCompat],
    ['function *g() { async yield => {}; }', Context.Empty],
    ['function *g() {  ({a: b = yield}) => x  }', Context.Empty],
    ['function *g() {  ({a = yield}) => x  }', Context.Empty],
    ['function *g() {  ({a = yield b}) => x  }', Context.Empty],
    ['function *g() {  ({a: b = yield c}) => x  }', Context.Empty],
    ['function *g() {  ([a = yield]) => x  }', Context.Empty],
    ['function *g() {  ([a = yield b]) => x  }', Context.Empty],
    ['function *g() {  yield => x  }', Context.Empty],
    ['function *g() { async yield => {}; }', Context.Empty],
    ['function *g() { async yield = {}; }', Context.Empty],
    ['function *f(){ for (yield of obj); }', Context.Empty],
    ['function * foo(o) { ({...{ x = yield }} = o); }', Context.Empty],
    ['(function * (o) { ({ ...{ x: yield } } = o); })()', Context.Empty],
    ['function*() { (yield\n/123/) }', Context.Empty],
    ['function*() { yield\n/123/ }', Context.Empty],
    ['function*() { yield /123/ }', Context.Empty],
    ['function *a() { ({b = yield}) => {} }', Context.Empty],
    // ['class X { async [yield]() {} }', Context.Empty],
    ['"use strict"; ({ async [yield]() {} });', Context.Empty],
    [`"use strict"; function f() { var {yield = 0} = {}; }`, Context.Empty],
    ['function *f(){ return 5 + yield x; }', Context.Empty],
    [`function foo() { 'use strict'; return {yield} }`, Context.Empty],
    [`function* wrap() {\nfunction* yield() {}\n}`, Context.Empty],
    [`function* wrap() {\n(a = yield b) => a\n}`, Context.Empty],
    ['function *g() { let yield; }', Context.Empty],
    [`(function*() { function*(x = yield 3) {} })`, Context.Empty],
    [`let f = async function *f(x=yield 100) {}`, Context.Empty],
    [`o = {async *f(yield) {}}`, Context.Empty],
    ['async function as(){ o = {*f(yield) {}} }', Context.Empty],
    [`async function as(){ async function f(x=yield 100) {} }`, Context.Empty],
    [`async function as(){ async function *f(x=yield 100) {} }`, Context.Empty],
    [`async function as(){ class A {f(yield) {}} }`, Context.Empty],
    ['function f() { return yield 100; }', Context.Empty],
    [`({ *[yield iter]() {} })`, Context.Empty],
    [`function* f() { [yield* {a = 0}]; }`, Context.Empty],
    [`(function*() {  function*({x: y = yield 3}) {} })`, Context.Empty],
    [`(function*({yield}) {})`, Context.Empty],
    ['(function*() { function(x = yield 3) {} })', Context.Empty],
    [`function *a({yield = 0}){}`, Context.Empty],
    ['function* gf() { +yield; }', Context.Empty],
    ['function* gf() { +yield 2; }', Context.Empty],
    ['yield x', Context.Empty],
    ['yield x + y', Context.Empty],
    ['5 + yield x', Context.Empty],
    ['function *a(){({yield} = {})}', Context.Empty],
    ['function *a(){yield*}', Context.Empty],
    ['function* gf() { 1 + yield; }', Context.Empty],
    ['function* gf() { 1 + yield 2; }', Context.Empty],
    ['function* gf() { 1 + yield* "foo"; }', Context.Empty],
    ['function* gf() { +yield; }', Context.Empty],
    ['function* gf() { yield++; }', Context.Empty],
    ['let gfe = function* yield() { }', Context.Empty],
    ['function* gf() { let yield; ', Context.Empty],
    ['function* gf() { const yield = 10; }', Context.Empty],
    ['function* gf() { function* yield() { } }', Context.Empty],
    ['function* gf() { var gfe = function* yield() { } }', Context.Empty],
    ['function* gf() { class yield { } }', Context.Empty],
    ['function* gf() { var o = { yield }; }', Context.Empty],
    ['"function *gf(b, a = 1 + yield) {', Context.Empty],
    ['gf = function* (b, a = yield) {}', Context.Empty],
    ['function* gf() { var a = (x, y = yield* 0, z = 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y, z = yield* 0) => { }; }', Context.Empty],
    ['function* gf() {var a = yield in {};}', Context.Empty],
    ['function* gf() {yield in {};}', Context.Empty],
    ['5 + yield x + y', Context.Empty],
    ['call(yield x)', Context.Empty],
    ['call(yield x + y)', Context.Empty],
    ['function* f(){ 5 + yield }', Context.Empty],
    ['function* f(){ 5 + yield x; }', Context.Empty],
    ['function* f(){ 5 + yield x + y; }', Context.Empty],
    ['function f(){ yield x; }', Context.Empty],
    ['function f(){ yield x + y; }', Context.Empty],
    ['function f(){ call(yield x + y); }', Context.Empty],
    ['function f(){ 5 + yield x + y; }', Context.Empty],
    ['function f(){ call(yield x); }', Context.Empty],
    ['function* g() { yield 3 + yield; }', Context.Empty],
    ['f = function*([...{ x }, y] = [1, 2, 3]) {}', Context.Empty],
    ['function *a() { (b = yield) => {} }', Context.Empty],
    ['"use strict"; +yield;', Context.Empty],
    ['(class yield {})', Context.Empty],
    ['"use strict"; ([yield] = a)', Context.Empty],
    ['function a(){ "use strict"; function a(yield){}}', Context.Empty],
    ['function* g(){ ({[yield]: a}) => 0; }', Context.Empty],
    ['function* g(){ ({ *m(a = yield){} }); }', Context.Empty],
    ['function* g(){ ({ *m({[yield]: a}){} }); }', Context.Empty],
    ['function* g(){ function* f(a = yield){} }', Context.Empty],
    ['function* g(){ function* f(a = yield b){} }', Context.Empty],
    ['function* g(){ function* f(a = x + f(yield)){} }', Context.Empty],
    ['function* a(){ !function*([b = yield]){} }', Context.Empty],
    ['"use strict"; +yield;', Context.Empty],
    ['"use strict"; yield:;', Context.Empty],
    ['"use strict"; +yield:0;', Context.Empty],
    ['"use strict"; function a([yield]){}', Context.Empty],
    ['function a([yield,...a]){ "use strict"; }', Context.Empty],
    ['function* a(){ function* b({c = yield}){} }', Context.Empty],
    ['function* a(){ (b = yield* c) => 1; }', Context.Empty],
    ['"use strict"; (a = yield) => {}', Context.Empty],
    ['function* a(){ ({ *b(c = yield){} }); }', Context.Empty],
    ['function* a(){ ({b = yield}) => 1; }', Context.Empty],
    ['function* g(){ function* f(a = x + f(yield)){} }', Context.Empty],
    ['function* g(){ function* f({[yield]: a}){} }', Context.Empty],
    ['function* g(){ function* f({a = yield}){} }', Context.Empty],
    ['function* a(){ ({ *b(c = d + e(yield)){} }); }', Context.Empty],
    ['function* g() { yield 3 + yield 4; }', Context.Empty],
    ['async function f(){ yield a,b; }', Context.Empty],
    ['function *f(){ return function(x = yield y){}; }', Context.Empty],
    ['function *g() { yield = {}; }', Context.Empty],
    ['label: function* a(){}', Context.Empty],
    ['function*g(yield){}', Context.Empty],
    ['function*g({yield}){}', Context.Empty],
    ['function*g([yield]){}', Context.Empty],
    ['function*g({a: yield}){}', Context.Empty],
    ['function*g(yield = 0){}', Context.Empty],
    ['function*g(){ var yield; }', Context.Empty],
    ['function*g(){ var yield = 1; }', Context.Empty],
    ['function*g(){ function yield(){}; }', Context.Empty],
    ['function*g() { var yield; }', Context.Empty],
    ['function*g() { let yield; }', Context.Empty],
    ['function*g() { try {} catch (yield) {} }', Context.Empty],
    ['function*g() { ({yield}); }', Context.Empty],
    ['function*g() { ({yield} = 0); }', Context.Empty],
    ['function*g() { var {yield} = 0; }', Context.Empty],
    ['function*g() { for ({yield} in 0); }', Context.Empty],
    ['function*g() { for ({yield} in [{}]); }', Context.Empty],
    ['function*g() { for ({yield} of [{}]); }', Context.Empty],
    ['function*g() { ({yield = 0}); }', Context.Empty],
    ['function*g() { 0, {yield} = {}; }', Context.Empty],
    ['function*g() { for ({yield} of [{}]); }', Context.Empty],
    ['function*g() { ({yield = 0}); }', Context.Empty],
    ['function*g() { 0, {yield} = {}; }', Context.Empty],
    ['function*g() { ({yield = 0} = 0); }', Context.Empty],
    ['function*g() { var {yield = 0} = 0; }', Context.Empty],
    ['function*g() { for ({yield = 0} in 0); }', Context.Empty],
    ['function *g() { (x = yield) = {}; }', Context.Empty],
    ['function *g() { yield => {}; }', Context.Empty],
    ['function *g() { (x = yield) => {}; }', Context.Empty],
    ['function *g() { (x = y = yield z) => {}; }', Context.Empty],
    ['function *g() { (x = y + yield z) => {}; }', Context.Empty],
    ['function *x() { async yield => a}', Context.Empty],
    ['function *x(yield) { async await => a}', Context.Empty],
    ['function *g() { (x = y + yield); }', Context.Empty],
    ['function *g() { (x = y + yield y); }', Context.Empty],
    ['function *g() { (x = y + yield) => x; }', Context.Empty],
    ['function *g() { (x = y + yield y) => x; }', Context.Empty],
    ['function *g(){ (x = {[yield y]: 1}) => z }', Context.Empty],
    ['function *g(){ (x = {[yield]: 1}) => z }', Context.Empty],
    ['("string" = ({x} = (function* y(z) { (yield) }))) => (p);', Context.Empty],
    ['(x = x) = x;', Context.Empty],
    ['{ (x = yield) = {}; }', Context.Empty],
    ['{ (x = y = yield z) => {}; }', Context.Empty],
    ['{ (x = y = yield z); }', Context.Empty],
    ['{ (x = y + yield z) => {}; }', Context.Empty],
    ['{ (x = y + yield y); }', Context.Empty],
    ['{ (x = y + yield y) => x; }', Context.Empty],
    ['{ (x = y + foo(a, yield y)); }', Context.Empty],
    ['{ (x = y + foo(a, yield y)) => x; }', Context.Empty],
    ['{ (x = {[yield y]: 1}) }', Context.Empty],
    ['{ (x = {[yield y]: 1}) => z }', Context.Empty],
    ['{ (x = [yield y]) }', Context.Empty],
    ['{ (x = [yield y]) => z }', Context.Empty],
    ['function *g() { async yield = {}; }', Context.Empty],
    ['function *g() { async (x = yield) = {}; }', Context.Empty],
    ['function *g() { async yield => {}; }', Context.Empty],
    ['function *g() { async (x = yield) => {}; }', Context.Empty],
    ['function *g() { async (x = y = yield z) => {}; }', Context.Empty],
    ['function *g() { async (x = y + yield y); }', Context.Empty],
    ['function *g() { async (x = y + yield z) => {}; }', Context.Empty],
    ['function *g() { async (x = y + yield); }', Context.Empty],
    ['function *g() { async (x = y + yield) => x; }', Context.Empty],
    ['function *g() { async (x = y + yield y) => x; }', Context.Empty],
    ['function *g(){ async (x = {[yield]: 1}) => z }', Context.Empty],
    ['function *g(){ async (x = {[yield y]: 1}) => z }', Context.Empty],
    ['function *g(){ async (x = [yield]) => z }', Context.Empty],
    ['function *g(){ async (x = [yield y]) => z }', Context.Empty],
    ['function *f(yield){}', Context.Empty],
    ['async (yield x)', Context.Empty],
    ['async (x = yield y)', Context.Empty],
    ['function *f(){ async (x = yield) => {} }', Context.Empty],
    ['function *f(){ async (x = yield y) => {} }', Context.Empty],
    ['function* foo() { class x extends (async yield* (e = "x") => {}) {} }', Context.Empty],
    ['function f(){  return function*(x=yield y) {};  }', Context.Empty],
    ['function f(){  class x{*foo(a=yield x){}}  }', Context.Empty],
    ['function f(){  x = {*foo(a=yield x){}}  }', Context.Empty],
    ['function f(){  return (x=yield y) => x;  }', Context.Empty],
    ['function f(){  return function(x=yield y) {};  }', Context.Empty],
    ['function f(){  class x{foo(a=yield x){}}  }', Context.Empty],
    ['function f(){  x = {foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  return (x=yield) => x;  }', Context.Empty],
    ['function *f(){  class x{constructor(a=yield){}}  }', Context.Empty],
    ['function *f(){  x = {foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  return *(x=yield) => x;  }', Context.Empty],
    ['function *f(){  return function*(x=yield) {};  }', Context.Empty],
    ['function *f(){  class x{*foo(a=yield){}}  }', Context.Empty],
    ['function *f(){  x = {*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  return *(x=yield) => x;  }', Context.Empty],
    ['function f(){  return function*(x=yield) {};  }', Context.Empty],
    ['function f(){  class x{*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  x = {*foo(a=yield){}}  }', Context.Empty],
    ['function f(){  class x{foo(a=yield){}}  }', Context.Empty],
    ['function *f(){  class x extends yield y{}  }', Context.Empty],
    ['function *f() { return delete yield;  }', Context.Empty],
    ['function *f() { return void yield;  }', Context.Empty],
    ['function *f() { return typeof yield;  }', Context.Empty],
    ['function *f() { return +yield;  }', Context.Empty],
    ['function *f() { return !yield;  }', Context.Empty],
    ['function *f() { return --yield;  }', Context.Empty],
    ['function *f() { return delete yield foo;  }', Context.Empty],
    ['function *f() { return void yield foo;  }', Context.Empty],
    ['function *f() { return typeof yield foo;  }', Context.Empty],
    ['fuction *f() { return +yield foo;  }', Context.Empty],
    ['function *f() { return await yield foo;  }', Context.Empty],
    ['function* g() { (function yield() {}) }', Context.Strict],
    ['var g = function* yield() {};', Context.Empty],
    ['(x = x + yield);', Context.Strict],
    ['function *f(){  ({*g(x=yield){}})  }', Context.Empty],
    ['(function *f(){  ({*g(x=yield){}})  })', Context.Empty],
    ['function *f() { yield ? yield : yield ; }', Context.Empty],
    ['function *f() { yield ? 1 : 1 ; }', Context.Empty],
    ['([yield] = x)', Context.Strict],
    ['([yield]) => x', Context.Strict],
    ['({yield}) => x', Context.Strict],
    ['({yield})', Context.Strict],
    ['({ *g1() {   return {yield}  }})', Context.Empty],
    ['function *g() { new yield foo}', Context.Empty],
    ['function *g() { new yield }', Context.Empty],
    ['function *gf() { (a = (yield) => {}) => {}; }', Context.Empty],
    ['function* gf() { var a = (x = yield* 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x = yield 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y = yield 0, z = 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y, z = yield 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x = yield) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y = yield, z = 0) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y, z = yield) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, yield, y) => { }; }', Context.Empty],
    ['function* gf() { var a = (x, y, yield) => { }; }', Context.Empty],
    ['function* gf() { var a = yield => { }; }', Context.Empty],
    ['function* gf() { var a = (yield) => { }; }', Context.Empty],
    ['var obj = { *gf(b, yield) {} }', Context.Empty],
    ['gf = function* (b, yield) {}', Context.Empty],
    ['function *gf(b, yield) {}', Context.Empty],
    ['function *gf(b, a = 1 + yield) {}', Context.Empty],
    ['function *gf(a = (10, yield, 20)) {}', Context.Empty],
    ['function* gf() { var gfe = function* yield() { } }', Context.Empty],
    ['function* gf() { function yield() { } }', Context.Empty],
    ['function* gf() { const yield = 10; }', Context.Empty],
    ['async (yield) = f', Context.Empty],
    ['function *f(){ async (x = z = yield) => {} }', Context.Empty],
    ['function *f(){ async (x = z = yield y) => {} }', Context.Empty],
    ['function *g() { (x = u + yield z) => {}; }', Context.Empty],
    ['function *g() { function f(x = y = yield z) {}; }', Context.Empty],
    ['function *g() { function f(x = x + yield y) {}; }', Context.Empty],
    ['function *g() { function f(x = x + foo(a, yield y)) {}; }', Context.Empty],
    ['function *f(){  return function(x=yield y) {};  }', Context.Empty],
    ['function *f(){  class x{constructor(a=yield x){}}  }', Context.Empty],
    ['function *f(){  class x{foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  x = {foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  return *(x=yield y) => x;  }', Context.Empty],
    ['function *f(){ yield = 1; }', Context.Empty],
    ['(yield) = 1;', Context.Strict],
    ['function *f(){ (yield) = 1; }', Context.Empty],
    ['function *f(x = (yield) = f) {}', Context.Empty],
    ['(x = delete ((yield) = f)) => {}', Context.Strict],
    ['function *f(x = delete ((yield) = f)) {}', Context.Empty],
    ['function *f(){  return *(x=yield y) => x;  }', Context.Empty],
    ['function *f(){  return function*(x=yield y) {};  }', Context.Empty],
    ['function *f(){  class x{*foo(a=yield x){}}  }', Context.Empty],
    ['function *f(){  x = {*foo(a=yield x){}}  }', Context.Empty],
    ['function f(){  return *(x=yield y) => x;  }', Context.Empty],
    ['{ (x = [yield y]) => z }', Context.Empty],
    ['{ (x = [yield y]) }', Context.Empty],
    ['{ (x = {[yield y]: 1}) => z }', Context.Empty],
    ['{ (x = {[yield y]: 1}) }', Context.Empty],
    ['{ (x = yield) = {}; }', Context.Empty],
    ['{ (x = y = yield z) => {}; }', Context.Empty],
    ['{ (x = u + yield z) => {}; }', Context.Empty],
    ['{ (x = y = yield z); }', Context.Empty],
    ['{ (x = x + foo(a, yield y)) => x; }', Context.Empty],
    ['{ (x = x + foo(a, yield y)); }', Context.Empty],
    ['function *g(){ (x = [yield y]) => z }', Context.Empty],
    ['function *g(){ (x = {[yield y]: 1}) => z }', Context.Empty],
    ['function *g(){ (x = [yield]) => z }', Context.Empty],
    ['function *g(){ (x = {[yield]: 1}) => z }', Context.Empty],
    ['function *g() { (x = x + yield) => x; }', Context.Empty],
    ['function *g() { (x = x + yield y) => x; }', Context.Empty],
    ['function *g() { yield = {}; }', Context.Empty],
    ['function *g() { yield => {}; }', Context.Empty],
    ['function *g() { (x = x + yield); }', Context.Empty],
    ['function *g() { (x = x + yield y); }', Context.Empty],
    ['function *g() { (x = yield) => {}; }', Context.Empty],
    ['function *g() { (x = y = yield z) => {}; }', Context.Empty],
    ['function *g() { (x = yield) = {}; }', Context.Empty],
    ['function *g() { (x = u + yield z) => {}; }', Context.Empty],
    ['function *g() { (x = x + foo(a, yield y)) => x; }', Context.Empty],
    ['function *g(){ async (x = [yield y]) => z }', Context.Empty],
    ['function *g(){ async (x = {[yield y]: 1}) => z }', Context.Empty],
    ['function *g(){ async (x = [yield]) => z }', Context.Empty],
    ['function *g(){ async (x = {[yield]: 1}) => z }', Context.Empty],
    ['function *g() { async (x = x + yield) => x; }', Context.Empty],
    ['function *g() { async (x = x + yield y) => x; }', Context.Empty],
    ['function *g() { async yield = {}; }', Context.Empty],
    ['function *g() { async yield => {}; }', Context.Empty],
    ['function *g() { async (x = x + yield); }', Context.Empty],
    ['function *g() { async (x = x + yield y); }', Context.Empty],
    ['function *g() { async (x = yield) => {}; }', Context.Empty],
    ['function *g() { async (x = yield) = {}; }', Context.Empty],
    ['function *g() { async (x = u + yield z) => {}; }', Context.Empty],
    ['function *g() { async (x = y = yield z) => {}; }', Context.Empty],
    ['function *g() { async (x = x + foo(a, yield y)) => x; }', Context.Empty],
    ['function *f(){ async (x = yield y) => {} }', Context.Empty],
    ['function *f(){ async (x = z = yield y) => {} }', Context.Empty],
    ['function *f(){ async (x = z = yield) => {} }', Context.Empty],
    ['function *f(){ async (x = (yield y)) => {} }', Context.Empty],
    ['function *f(){ async (x = (yield)) => {} }', Context.Empty],
    ['function *f(){ (x = (yield)) => {} }', Context.Empty],
    ['function *f(){ (x = (yield)) => {} }', Context.Empty],
    ['async (x = (yield x)) => {}', Context.Empty],
    ['async (x = (yield x))', Context.Empty],
    ['function *f(){ async (x = yield) => {} }', Context.Empty],
    ['function *f(yield){}', Context.Empty],
    ['async (x = yield y) => {}', Context.Empty],
    ['async (x = yield y)', Context.Empty],
    ['async (yield x)', Context.Empty],
    ['function *f(x=yield){ }', Context.Empty],
    ['function *f(yield){ }', Context.Empty],
    ['function *f(){ ({x} = yield) => {} }', Context.Empty],
    ['function *f(){ ({x} = yield x) => {} }', Context.Empty],
    ['function *f(){ ([x] = yield) => {} }', Context.Empty],
    ['function *f(){ ([x] = yield x) => {} }', Context.Empty],
    ['function *g() { yield //comment\n {yield: 42}}', Context.Empty],
    ['function *g() { yield ? 1 : 2}', Context.Empty],
    ['function *g() { yield *}', Context.Empty],
    ['function *g() { ++yield;}', Context.Empty],
    ['function *g() { function yield() { }}', Context.Empty],
    ['function *g() { try { } catch (yield) { }}', Context.Empty],
    ['function *g() { var {foo: yield} = {a: 42};}', Context.Empty],
    ['function *g() { var [yield 24] = [42];}', Context.Empty],
    ['function *g() { [yield 24] = [42];}', Context.Empty],
    ['function *g() { ({a: yield 24} = {a: 42});}', Context.Empty],
    ['function *g() { for (yield "x" in {});}', Context.Empty],
    ['function *g() { class C extends yield { }}', Context.Empty]
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

  const validYieldInGenerator = [
    '',
    // Valid yield expressions inside generators.
    'yield 2;',
    'yield * 2;',
    'yield * \n 2;',
    'yield yield 1;',
    'yield * yield * 1;',
    'yield 3 + (yield 4);',
    'yield * 3 + (yield * 4);',
    '(yield * 3) + (yield * 4);',
    'yield 3; yield 4;',
    'yield * 3; yield * 4;',
    '(function (yield) { })',
    '(function yield() { })',
    'yield { yield: 12 }',
    'yield /* comment */ { yield: 12 }',
    'yield * \n { yield: 12 }',
    'yield /* comment */ * \n { yield: 12 }',
    'yield 1; return',
    'yield * 1; return',
    'yield 1; return 37',
    'yield * 1; return 37',
    "yield 1; return 37; yield 'dead';",
    "yield * 1; return 37; yield * 'dead';",
    '({ yield: 1 })',
    '({ get yield() { } })',
    '({ [yield]: x } = { })',
    'yield;',
    'yield',
    'yield\n',
    'yield /* comment */',
    'yield // comment\n',
    '(yield)',
    '[yield]',
    '{yield}',
    'yield, yield',
    'yield; yield',
    '(yield) ? yield : yield',
    '(yield) \n ? yield : yield',
    'yield\nfor (;;) {}',
    'x = class extends (yield) {}',
    'x = class extends f(yield) {}',
    'x = class extends (null, yield) { }',
    'x = class extends (a ? null : yield) { }'
  ];

  for (const arg of validYieldInGenerator) {
    it(`function * x() {${arg}}`, () => {
      t.doesNotThrow(() => {
        parseScript(`function * x() {${arg}}`);
      });
    });

    it(`(function * x() {${arg}})`, () => {
      t.doesNotThrow(() => {
        parseScript(`(function * x() {${arg}})`);
      });
    });

    it(`(function *() {${arg}})`, () => {
      t.doesNotThrow(() => {
        parseScript(`(function *() {${arg}})`);
      });
    });
  }

  const yieldInParameters = [
    `(a = yield) => {}`,
    `(a = yield /a/g) => {}`, // Should parse as division, not yield expression with regexp.
    `yield => {};`,
    `(yield) => {};`,
    `(yield = 0) => {};`,
    `([yield]) => {};`,
    `([yield = 0]) => {};`,
    `([...yield]) => {};`,
    `({a: yield}) => {};`,
    `({yield}) => {};`,
    `({yield = 0}) => {};`,
    `async (yield) => {};`,
    `async (yield = 0) => {};`,
    `async ([yield]) => {};`,
    `async ([yield = 0]) => {};`,
    `async ([...yield]) => {};`,
    `async ({a: yield}) => {};`,
    `async ({yield}) => {};`,
    `async ({yield = 0}) => {};`
  ];

  const yieldInBody = [
    `() => { var x = yield; }`,
    `() => { var x = yield /a/g; }`,
    // `() => { var yield; };`,
    // `() => { var yield = 0; };`,
    `() => { var [yield] = []; };`,
    `() => { var [yield = 0] = []; };`,
    `() => { var [...yield] = []; };`,
    `() => { var {a: yield} = {}; };`,
    `() => { var {yield} = {}; };`,
    `() => { var {yield = 0} = {}; };`,
    // `() => { let yield; };`,
    // `() => { let yield = 0; };`,
    `() => { let [yield] = []; };`,
    `() => { let [yield = 0] = []; };`,
    `() => { let [...yield] = []; };`,
    `() => { let {a: yield} = {}; };`,
    `() => { let {yield} = {}; };`,
    `() => { let {yield = 0} = {}; };`,
    // `() => { const yield = 0; };`,
    `() => { const [yield] = []; };`,
    `() => { const [yield = 0] = []; };`,
    `() => { const [...yield] = []; };`,
    `() => { const {a: yield} = {}; };`,
    `() => { const {yield} = {}; };`,
    `() => { const {yield = 0} = {}; };`
  ];

  for (const test of [...yieldInParameters, ...yieldInBody]) {
    // Script context.
    it(`"use strict"; ${test}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${test}`);
      });
    });

    // Function context.
    it(`"use strict"; function f() { ${test} }`, () => {
      t.throws(() => {
        parseScript(`"use strict"; function f() { ${test} }`);
      });
    });

    // Generator
    it(`"use strict"; function* g() { ${test} }`, () => {
      t.throws(() => {
        parseScript(`"use strict"; function* g() { ${test} }`);
      });
    });
  }
  // Generator context.
  for (const test of yieldInParameters) {
    it(`function* g() { ${test} }`, () => {
      t.throws(() => {
        parseScript(`function* g() { ${test} }`);
      });
    });
  }
  for (const [source, ctx, expected] of [
    [
      `function* x({y = (0x44FB6C6428574)}) { while (({} = ([]), {} = function (z) { while (((yield))) ;}) => f = [, ]) {}}`,
      Context.OptionsLoc,
      {
        body: [
          {
            async: false,
            body: {
              body: [
                {
                  body: {
                    body: [],
                    end: 115,
                    loc: {
                      end: {
                        column: 115,
                        line: 1
                      },
                      start: {
                        column: 113,
                        line: 1
                      }
                    },
                    start: 113,
                    type: 'BlockStatement'
                  },
                  end: 115,
                  loc: {
                    end: {
                      column: 115,
                      line: 1
                    },
                    start: {
                      column: 39,
                      line: 1
                    }
                  },
                  start: 39,
                  test: {
                    async: false,
                    body: {
                      end: 111,
                      left: {
                        end: 104,
                        loc: {
                          end: {
                            column: 104,
                            line: 1
                          },
                          start: {
                            column: 103,
                            line: 1
                          }
                        },
                        name: 'f',
                        start: 103,
                        type: 'Identifier'
                      },
                      loc: {
                        end: {
                          column: 111,
                          line: 1
                        },
                        start: {
                          column: 103,
                          line: 1
                        }
                      },
                      operator: '=',
                      right: {
                        elements: [null],
                        end: 111,
                        loc: {
                          end: {
                            column: 111,
                            line: 1
                          },
                          start: {
                            column: 107,
                            line: 1
                          }
                        },
                        start: 107,
                        type: 'ArrayExpression'
                      },
                      start: 103,
                      type: 'AssignmentExpression'
                    },
                    end: 111,
                    expression: true,
                    loc: {
                      end: {
                        column: 111,
                        line: 1
                      },
                      start: {
                        column: 46,
                        line: 1
                      }
                    },
                    params: [
                      {
                        end: 56,
                        left: {
                          end: 49,
                          loc: {
                            end: {
                              column: 49,
                              line: 1
                            },
                            start: {
                              column: 47,
                              line: 1
                            }
                          },
                          properties: [],
                          start: 47,
                          type: 'ObjectPattern'
                        },
                        loc: {
                          end: {
                            column: 56,
                            line: 1
                          },
                          start: {
                            column: 47,
                            line: 1
                          }
                        },
                        right: {
                          elements: [],
                          end: 55,
                          loc: {
                            end: {
                              column: 55,
                              line: 1
                            },
                            start: {
                              column: 53,
                              line: 1
                            }
                          },
                          start: 53,
                          type: 'ArrayExpression'
                        },
                        start: 47,
                        type: 'AssignmentPattern'
                      },
                      {
                        end: 98,
                        left: {
                          end: 60,
                          loc: {
                            end: {
                              column: 60,
                              line: 1
                            },
                            start: {
                              column: 58,
                              line: 1
                            }
                          },
                          properties: [],
                          start: 58,
                          type: 'ObjectPattern'
                        },
                        loc: {
                          end: {
                            column: 98,
                            line: 1
                          },
                          start: {
                            column: 58,
                            line: 1
                          }
                        },
                        right: {
                          async: false,
                          body: {
                            body: [
                              {
                                body: {
                                  end: 97,
                                  loc: {
                                    end: {
                                      column: 97,
                                      line: 1
                                    },
                                    start: {
                                      column: 96,
                                      line: 1
                                    }
                                  },
                                  start: 96,
                                  type: 'EmptyStatement'
                                },
                                end: 97,
                                loc: {
                                  end: {
                                    column: 97,
                                    line: 1
                                  },
                                  start: {
                                    column: 78,
                                    line: 1
                                  }
                                },
                                start: 78,
                                test: {
                                  end: 92,
                                  loc: {
                                    end: {
                                      column: 92,
                                      line: 1
                                    },
                                    start: {
                                      column: 87,
                                      line: 1
                                    }
                                  },
                                  name: 'yield',
                                  start: 87,
                                  type: 'Identifier'
                                },
                                type: 'WhileStatement'
                              }
                            ],
                            end: 98,
                            loc: {
                              end: {
                                column: 98,
                                line: 1
                              },
                              start: {
                                column: 76,
                                line: 1
                              }
                            },
                            start: 76,
                            type: 'BlockStatement'
                          },
                          end: 98,
                          generator: false,
                          id: null,
                          loc: {
                            end: {
                              column: 98,
                              line: 1
                            },
                            start: {
                              column: 63,
                              line: 1
                            }
                          },
                          params: [
                            {
                              end: 74,
                              loc: {
                                end: {
                                  column: 74,
                                  line: 1
                                },
                                start: {
                                  column: 73,
                                  line: 1
                                }
                              },
                              name: 'z',
                              start: 73,
                              type: 'Identifier'
                            }
                          ],
                          start: 63,
                          type: 'FunctionExpression'
                        },
                        start: 58,
                        type: 'AssignmentPattern'
                      }
                    ],
                    start: 46,
                    type: 'ArrowFunctionExpression'
                  },
                  type: 'WhileStatement'
                }
              ],
              end: 116,
              loc: {
                end: {
                  column: 116,
                  line: 1
                },
                start: {
                  column: 37,
                  line: 1
                }
              },
              start: 37,
              type: 'BlockStatement'
            },
            end: 116,
            generator: true,
            id: {
              end: 11,
              loc: {
                end: {
                  column: 11,
                  line: 1
                },
                start: {
                  column: 10,
                  line: 1
                }
              },
              name: 'x',
              start: 10,
              type: 'Identifier'
            },
            loc: {
              end: {
                column: 116,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            params: [
              {
                end: 35,
                loc: {
                  end: {
                    column: 35,
                    line: 1
                  },
                  start: {
                    column: 12,
                    line: 1
                  }
                },
                properties: [
                  {
                    computed: false,
                    end: 34,
                    key: {
                      end: 14,
                      loc: {
                        end: {
                          column: 14,
                          line: 1
                        },
                        start: {
                          column: 13,
                          line: 1
                        }
                      },
                      name: 'y',
                      start: 13,
                      type: 'Identifier'
                    },
                    kind: 'init',
                    loc: {
                      end: {
                        column: 34,
                        line: 1
                      },
                      start: {
                        column: 13,
                        line: 1
                      }
                    },
                    method: false,
                    shorthand: true,
                    start: 13,
                    type: 'Property',
                    value: {
                      end: 34,
                      left: {
                        end: 14,
                        loc: {
                          end: {
                            column: 14,
                            line: 1
                          },
                          start: {
                            column: 13,
                            line: 1
                          }
                        },
                        name: 'y',
                        start: 13,
                        type: 'Identifier'
                      },
                      loc: {
                        end: {
                          column: 34,
                          line: 1
                        },
                        start: {
                          column: 13,
                          line: 1
                        }
                      },
                      right: {
                        end: 33,
                        loc: {
                          end: {
                            column: 33,
                            line: 1
                          },
                          start: {
                            column: 18,
                            line: 1
                          }
                        },
                        start: 18,
                        type: 'Literal',
                        value: 1213546335733108
                      },
                      start: 13,
                      type: 'AssignmentPattern'
                    }
                  }
                ],
                start: 12,
                type: 'ObjectPattern'
              }
            ],
            start: 0,
            type: 'FunctionDeclaration'
          }
        ],
        end: 116,
        loc: {
          end: {
            column: 116,
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
      `x(10, y(...(function*() {
        yield 1;
        yield 2;
        yield 3;
        yield 4;
      })()));`,
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
                  type: 'Literal',
                  value: 10,
                  start: 2,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                {
                  type: 'CallExpression',
                  callee: {
                    type: 'Identifier',
                    name: 'y',
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
                  arguments: [
                    {
                      type: 'SpreadElement',
                      argument: {
                        type: 'CallExpression',
                        callee: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 1,
                                    start: 40,
                                    end: 41,
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
                                  delegate: false,
                                  start: 34,
                                  end: 41,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 8
                                    },
                                    end: {
                                      line: 2,
                                      column: 15
                                    }
                                  }
                                },
                                start: 34,
                                end: 42,
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
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 2,
                                    start: 57,
                                    end: 58,
                                    loc: {
                                      start: {
                                        line: 3,
                                        column: 14
                                      },
                                      end: {
                                        line: 3,
                                        column: 15
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 51,
                                  end: 58,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 8
                                    },
                                    end: {
                                      line: 3,
                                      column: 15
                                    }
                                  }
                                },
                                start: 51,
                                end: 59,
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
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 3,
                                    start: 74,
                                    end: 75,
                                    loc: {
                                      start: {
                                        line: 4,
                                        column: 14
                                      },
                                      end: {
                                        line: 4,
                                        column: 15
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 68,
                                  end: 75,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 8
                                    },
                                    end: {
                                      line: 4,
                                      column: 15
                                    }
                                  }
                                },
                                start: 68,
                                end: 76,
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
                              {
                                type: 'ExpressionStatement',
                                expression: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Literal',
                                    value: 4,
                                    start: 91,
                                    end: 92,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 14
                                      },
                                      end: {
                                        line: 5,
                                        column: 15
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 85,
                                  end: 92,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 8
                                    },
                                    end: {
                                      line: 5,
                                      column: 15
                                    }
                                  }
                                },
                                start: 85,
                                end: 93,
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
                              }
                            ],
                            start: 24,
                            end: 101,
                            loc: {
                              start: {
                                line: 1,
                                column: 24
                              },
                              end: {
                                line: 6,
                                column: 7
                              }
                            }
                          },
                          async: false,
                          generator: true,
                          id: null,
                          start: 12,
                          end: 101,
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
                        arguments: [],

                        start: 11,
                        end: 104,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 6,
                            column: 10
                          }
                        }
                      },
                      start: 8,
                      end: 104,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 6,
                          column: 10
                        }
                      }
                    }
                  ],

                  start: 6,
                  end: 105,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 6,
                      column: 11
                    }
                  }
                }
              ],

              start: 0,
              end: 106,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 6,
                  column: 12
                }
              }
            },
            start: 0,
            end: 107,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 6,
                column: 13
              }
            }
          }
        ],
        start: 0,
        end: 107,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 6,
            column: 13
          }
        }
      }
    ],
    [
      `x(...(function*(){ yield 1; yield 2; yield 3; })())`,
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 1,
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
                              delegate: false,
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
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 2,
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
                              delegate: false,
                              start: 28,
                              end: 35,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 35
                                }
                              }
                            },
                            start: 28,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 3,
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
                              delegate: false,
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
                            start: 37,
                            end: 45,
                            loc: {
                              start: {
                                line: 1,
                                column: 37
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
                      async: false,
                      generator: true,
                      id: null,
                      start: 6,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    arguments: [],

                    start: 5,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  start: 2,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 50
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
      `function* c() { log += 'C1'; yield 1; log += 'C2'; }`,
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'log',
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
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 'C1',
                      start: 23,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    },
                    start: 16,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 27
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
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 1,
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
                    delegate: false,
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
                  start: 29,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 29
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'log',
                      start: 38,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    operator: '+=',
                    right: {
                      type: 'Literal',
                      value: 'C2',
                      start: 45,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 45
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    start: 38,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 38
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  },
                  start: 38,
                  end: 50,
                  loc: {
                    start: {
                      line: 1,
                      column: 38
                    },
                    end: {
                      line: 1,
                      column: 50
                    }
                  }
                }
              ],
              start: 14,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 52
                }
              }
            },
            async: false,
            generator: true,
            id: {
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
      `function *gen1() { yield 1; return 2; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 1,
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
                    delegate: false,
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
                  type: 'ReturnStatement',
                  argument: {
                    type: 'Literal',
                    value: 2,
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
                  start: 28,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 17,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'gen1',
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
      `var _ref2 = _asyncToGenerator(function* () {
                yield j();
                yield j();
                yield j();
                yield j();
                yield j();
                yield j();
                yield j();
                yield j();
                yield j();
                return j();
              });`,
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
                    name: '_asyncToGenerator',
                    start: 12,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  arguments: [
                    {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 67,
                                  end: 68,
                                  loc: {
                                    start: {
                                      line: 2,
                                      column: 22
                                    },
                                    end: {
                                      line: 2,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 67,
                                end: 70,
                                loc: {
                                  start: {
                                    line: 2,
                                    column: 22
                                  },
                                  end: {
                                    line: 2,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 61,
                              end: 70,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 16
                                },
                                end: {
                                  line: 2,
                                  column: 25
                                }
                              }
                            },
                            start: 61,
                            end: 71,
                            loc: {
                              start: {
                                line: 2,
                                column: 16
                              },
                              end: {
                                line: 2,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 94,
                                  end: 95,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 22
                                    },
                                    end: {
                                      line: 3,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 94,
                                end: 97,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 22
                                  },
                                  end: {
                                    line: 3,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 88,
                              end: 97,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 16
                                },
                                end: {
                                  line: 3,
                                  column: 25
                                }
                              }
                            },
                            start: 88,
                            end: 98,
                            loc: {
                              start: {
                                line: 3,
                                column: 16
                              },
                              end: {
                                line: 3,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 121,
                                  end: 122,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 22
                                    },
                                    end: {
                                      line: 4,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 121,
                                end: 124,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 22
                                  },
                                  end: {
                                    line: 4,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 115,
                              end: 124,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 16
                                },
                                end: {
                                  line: 4,
                                  column: 25
                                }
                              }
                            },
                            start: 115,
                            end: 125,
                            loc: {
                              start: {
                                line: 4,
                                column: 16
                              },
                              end: {
                                line: 4,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 148,
                                  end: 149,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 22
                                    },
                                    end: {
                                      line: 5,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 148,
                                end: 151,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 22
                                  },
                                  end: {
                                    line: 5,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 142,
                              end: 151,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 16
                                },
                                end: {
                                  line: 5,
                                  column: 25
                                }
                              }
                            },
                            start: 142,
                            end: 152,
                            loc: {
                              start: {
                                line: 5,
                                column: 16
                              },
                              end: {
                                line: 5,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 175,
                                  end: 176,
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
                                arguments: [],

                                start: 175,
                                end: 178,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 22
                                  },
                                  end: {
                                    line: 6,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 169,
                              end: 178,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 16
                                },
                                end: {
                                  line: 6,
                                  column: 25
                                }
                              }
                            },
                            start: 169,
                            end: 179,
                            loc: {
                              start: {
                                line: 6,
                                column: 16
                              },
                              end: {
                                line: 6,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 202,
                                  end: 203,
                                  loc: {
                                    start: {
                                      line: 7,
                                      column: 22
                                    },
                                    end: {
                                      line: 7,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 202,
                                end: 205,
                                loc: {
                                  start: {
                                    line: 7,
                                    column: 22
                                  },
                                  end: {
                                    line: 7,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 196,
                              end: 205,
                              loc: {
                                start: {
                                  line: 7,
                                  column: 16
                                },
                                end: {
                                  line: 7,
                                  column: 25
                                }
                              }
                            },
                            start: 196,
                            end: 206,
                            loc: {
                              start: {
                                line: 7,
                                column: 16
                              },
                              end: {
                                line: 7,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 229,
                                  end: 230,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 22
                                    },
                                    end: {
                                      line: 8,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 229,
                                end: 232,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 22
                                  },
                                  end: {
                                    line: 8,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 223,
                              end: 232,
                              loc: {
                                start: {
                                  line: 8,
                                  column: 16
                                },
                                end: {
                                  line: 8,
                                  column: 25
                                }
                              }
                            },
                            start: 223,
                            end: 233,
                            loc: {
                              start: {
                                line: 8,
                                column: 16
                              },
                              end: {
                                line: 8,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 256,
                                  end: 257,
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
                                arguments: [],

                                start: 256,
                                end: 259,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 22
                                  },
                                  end: {
                                    line: 9,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 250,
                              end: 259,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 16
                                },
                                end: {
                                  line: 9,
                                  column: 25
                                }
                              }
                            },
                            start: 250,
                            end: 260,
                            loc: {
                              start: {
                                line: 9,
                                column: 16
                              },
                              end: {
                                line: 9,
                                column: 26
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'j',
                                  start: 283,
                                  end: 284,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 22
                                    },
                                    end: {
                                      line: 10,
                                      column: 23
                                    }
                                  }
                                },
                                arguments: [],

                                start: 283,
                                end: 286,
                                loc: {
                                  start: {
                                    line: 10,
                                    column: 22
                                  },
                                  end: {
                                    line: 10,
                                    column: 25
                                  }
                                }
                              },
                              delegate: false,
                              start: 277,
                              end: 286,
                              loc: {
                                start: {
                                  line: 10,
                                  column: 16
                                },
                                end: {
                                  line: 10,
                                  column: 25
                                }
                              }
                            },
                            start: 277,
                            end: 287,
                            loc: {
                              start: {
                                line: 10,
                                column: 16
                              },
                              end: {
                                line: 10,
                                column: 26
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
                                start: 311,
                                end: 312,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 23
                                  },
                                  end: {
                                    line: 11,
                                    column: 24
                                  }
                                }
                              },
                              arguments: [],

                              start: 311,
                              end: 314,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 23
                                },
                                end: {
                                  line: 11,
                                  column: 26
                                }
                              }
                            },
                            start: 304,
                            end: 315,
                            loc: {
                              start: {
                                line: 11,
                                column: 16
                              },
                              end: {
                                line: 11,
                                column: 27
                              }
                            }
                          }
                        ],
                        start: 43,
                        end: 331,
                        loc: {
                          start: {
                            line: 1,
                            column: 43
                          },
                          end: {
                            line: 12,
                            column: 15
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: null,
                      start: 30,
                      end: 331,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 12,
                          column: 15
                        }
                      }
                    }
                  ],

                  start: 12,
                  end: 332,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 12,
                      column: 16
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: '_ref2',
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
                end: 332,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 12,
                    column: 16
                  }
                }
              }
            ],
            start: 0,
            end: 333,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 12,
                column: 17
              }
            }
          }
        ],
        start: 0,
        end: 333,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 12,
            column: 17
          }
        }
      }
    ],
    [
      `(function TestConciseGenerator() {
                  var o = {
                    __proto__: {
                      m() {
                        return 42;
                      }
                    },
                    *g() {
                      yield super.m();
                    },
                  };

                  assertEquals(42, o.g().next().value);
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
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: '__proto__',
                                  start: 83,
                                  end: 92,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 20
                                    },
                                    end: {
                                      line: 3,
                                      column: 29
                                    }
                                  }
                                },
                                value: {
                                  type: 'ObjectExpression',
                                  properties: [
                                    {
                                      type: 'Property',
                                      key: {
                                        type: 'Identifier',
                                        name: 'm',
                                        start: 118,
                                        end: 119,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 22
                                          },
                                          end: {
                                            line: 4,
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
                                                type: 'Literal',
                                                value: 42,
                                                start: 155,
                                                end: 157,
                                                loc: {
                                                  start: {
                                                    line: 5,
                                                    column: 31
                                                  },
                                                  end: {
                                                    line: 5,
                                                    column: 33
                                                  }
                                                }
                                              },
                                              start: 148,
                                              end: 158,
                                              loc: {
                                                start: {
                                                  line: 5,
                                                  column: 24
                                                },
                                                end: {
                                                  line: 5,
                                                  column: 34
                                                }
                                              }
                                            }
                                          ],
                                          start: 122,
                                          end: 182,
                                          loc: {
                                            start: {
                                              line: 4,
                                              column: 26
                                            },
                                            end: {
                                              line: 6,
                                              column: 23
                                            }
                                          }
                                        },
                                        async: false,
                                        generator: false,
                                        id: null,
                                        start: 119,
                                        end: 182,
                                        loc: {
                                          start: {
                                            line: 4,
                                            column: 23
                                          },
                                          end: {
                                            line: 6,
                                            column: 23
                                          }
                                        }
                                      },
                                      kind: 'init',
                                      computed: false,
                                      method: true,
                                      shorthand: false,
                                      start: 118,
                                      end: 182,
                                      loc: {
                                        start: {
                                          line: 4,
                                          column: 22
                                        },
                                        end: {
                                          line: 6,
                                          column: 23
                                        }
                                      }
                                    }
                                  ],
                                  start: 94,
                                  end: 204,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 31
                                    },
                                    end: {
                                      line: 7,
                                      column: 21
                                    }
                                  }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 83,
                                end: 204,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 20
                                  },
                                  end: {
                                    line: 7,
                                    column: 21
                                  }
                                }
                              },
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'g',
                                  start: 227,
                                  end: 228,
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
                                value: {
                                  type: 'FunctionExpression',
                                  params: [],
                                  body: {
                                    type: 'BlockStatement',
                                    body: [
                                      {
                                        type: 'ExpressionStatement',
                                        expression: {
                                          type: 'YieldExpression',
                                          argument: {
                                            type: 'CallExpression',
                                            callee: {
                                              type: 'MemberExpression',
                                              object: {
                                                type: 'Super',
                                                start: 261,
                                                end: 266,
                                                loc: {
                                                  start: {
                                                    line: 9,
                                                    column: 28
                                                  },
                                                  end: {
                                                    line: 9,
                                                    column: 33
                                                  }
                                                }
                                              },
                                              computed: false,
                                              property: {
                                                type: 'Identifier',
                                                name: 'm',
                                                start: 267,
                                                end: 268,
                                                loc: {
                                                  start: {
                                                    line: 9,
                                                    column: 34
                                                  },
                                                  end: {
                                                    line: 9,
                                                    column: 35
                                                  }
                                                }
                                              },

                                              start: 261,
                                              end: 268,
                                              loc: {
                                                start: {
                                                  line: 9,
                                                  column: 28
                                                },
                                                end: {
                                                  line: 9,
                                                  column: 35
                                                }
                                              }
                                            },
                                            arguments: [],

                                            start: 261,
                                            end: 270,
                                            loc: {
                                              start: {
                                                line: 9,
                                                column: 28
                                              },
                                              end: {
                                                line: 9,
                                                column: 37
                                              }
                                            }
                                          },
                                          delegate: false,
                                          start: 255,
                                          end: 270,
                                          loc: {
                                            start: {
                                              line: 9,
                                              column: 22
                                            },
                                            end: {
                                              line: 9,
                                              column: 37
                                            }
                                          }
                                        },
                                        start: 255,
                                        end: 271,
                                        loc: {
                                          start: {
                                            line: 9,
                                            column: 22
                                          },
                                          end: {
                                            line: 9,
                                            column: 38
                                          }
                                        }
                                      }
                                    ],
                                    start: 231,
                                    end: 293,
                                    loc: {
                                      start: {
                                        line: 8,
                                        column: 25
                                      },
                                      end: {
                                        line: 10,
                                        column: 21
                                      }
                                    }
                                  },
                                  async: false,
                                  generator: true,
                                  id: null,
                                  start: 228,
                                  end: 293,
                                  loc: {
                                    start: {
                                      line: 8,
                                      column: 22
                                    },
                                    end: {
                                      line: 10,
                                      column: 21
                                    }
                                  }
                                },
                                kind: 'init',
                                computed: false,
                                method: true,
                                shorthand: false,
                                start: 226,
                                end: 293,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 20
                                  },
                                  end: {
                                    line: 10,
                                    column: 21
                                  }
                                }
                              }
                            ],
                            start: 61,
                            end: 314,
                            loc: {
                              start: {
                                line: 2,
                                column: 26
                              },
                              end: {
                                line: 11,
                                column: 19
                              }
                            }
                          },
                          id: {
                            type: 'Identifier',
                            name: 'o',
                            start: 57,
                            end: 58,
                            loc: {
                              start: {
                                line: 2,
                                column: 22
                              },
                              end: {
                                line: 2,
                                column: 23
                              }
                            }
                          },
                          start: 57,
                          end: 314,
                          loc: {
                            start: {
                              line: 2,
                              column: 22
                            },
                            end: {
                              line: 11,
                              column: 19
                            }
                          }
                        }
                      ],
                      start: 53,
                      end: 315,
                      loc: {
                        start: {
                          line: 2,
                          column: 18
                        },
                        end: {
                          line: 11,
                          column: 20
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'assertEquals',
                          start: 335,
                          end: 347,
                          loc: {
                            start: {
                              line: 13,
                              column: 18
                            },
                            end: {
                              line: 13,
                              column: 30
                            }
                          }
                        },
                        arguments: [
                          {
                            type: 'Literal',
                            value: 42,
                            start: 348,
                            end: 350,
                            loc: {
                              start: {
                                line: 13,
                                column: 31
                              },
                              end: {
                                line: 13,
                                column: 33
                              }
                            }
                          },
                          {
                            type: 'MemberExpression',
                            object: {
                              type: 'CallExpression',
                              callee: {
                                type: 'MemberExpression',
                                object: {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'MemberExpression',
                                    object: {
                                      type: 'Identifier',
                                      name: 'o',
                                      start: 352,
                                      end: 353,
                                      loc: {
                                        start: {
                                          line: 13,
                                          column: 35
                                        },
                                        end: {
                                          line: 13,
                                          column: 36
                                        }
                                      }
                                    },
                                    computed: false,
                                    property: {
                                      type: 'Identifier',
                                      name: 'g',
                                      start: 354,
                                      end: 355,
                                      loc: {
                                        start: {
                                          line: 13,
                                          column: 37
                                        },
                                        end: {
                                          line: 13,
                                          column: 38
                                        }
                                      }
                                    },

                                    start: 352,
                                    end: 355,
                                    loc: {
                                      start: {
                                        line: 13,
                                        column: 35
                                      },
                                      end: {
                                        line: 13,
                                        column: 38
                                      }
                                    }
                                  },
                                  arguments: [],

                                  start: 352,
                                  end: 357,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 35
                                    },
                                    end: {
                                      line: 13,
                                      column: 40
                                    }
                                  }
                                },
                                computed: false,
                                property: {
                                  type: 'Identifier',
                                  name: 'next',
                                  start: 358,
                                  end: 362,
                                  loc: {
                                    start: {
                                      line: 13,
                                      column: 41
                                    },
                                    end: {
                                      line: 13,
                                      column: 45
                                    }
                                  }
                                },

                                start: 352,
                                end: 362,
                                loc: {
                                  start: {
                                    line: 13,
                                    column: 35
                                  },
                                  end: {
                                    line: 13,
                                    column: 45
                                  }
                                }
                              },
                              arguments: [],

                              start: 352,
                              end: 364,
                              loc: {
                                start: {
                                  line: 13,
                                  column: 35
                                },
                                end: {
                                  line: 13,
                                  column: 47
                                }
                              }
                            },
                            computed: false,
                            property: {
                              type: 'Identifier',
                              name: 'value',
                              start: 365,
                              end: 370,
                              loc: {
                                start: {
                                  line: 13,
                                  column: 48
                                },
                                end: {
                                  line: 13,
                                  column: 53
                                }
                              }
                            },

                            start: 352,
                            end: 370,
                            loc: {
                              start: {
                                line: 13,
                                column: 35
                              },
                              end: {
                                line: 13,
                                column: 53
                              }
                            }
                          }
                        ],

                        start: 335,
                        end: 371,
                        loc: {
                          start: {
                            line: 13,
                            column: 18
                          },
                          end: {
                            line: 13,
                            column: 54
                          }
                        }
                      },
                      start: 335,
                      end: 372,
                      loc: {
                        start: {
                          line: 13,
                          column: 18
                        },
                        end: {
                          line: 13,
                          column: 55
                        }
                      }
                    }
                  ],
                  start: 33,
                  end: 390,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 14,
                      column: 17
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'TestConciseGenerator',
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
                },
                start: 1,
                end: 390,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 14,
                    column: 17
                  }
                }
              },
              arguments: [],

              start: 0,
              end: 393,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 14,
                  column: 20
                }
              }
            },
            start: 0,
            end: 394,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 14,
                column: 21
              }
            }
          }
        ],
        start: 0,
        end: 394,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 14,
            column: 21
          }
        }
      }
    ],
    [
      `generatorFn = function*() { yield true; };`,
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
                name: 'generatorFn',
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
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: true,
                          start: 34,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        },
                        delegate: false,
                        start: 28,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        }
                      },
                      start: 28,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 39
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
                },
                async: false,
                generator: true,
                id: null,
                start: 14,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 14
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
      `function* f() {
                      log.push("1");
                      yield 1;
                      log.push("2");
                      yield 2;
                      log.push("3");
                      yield 3;
                      log.push("done");
                    };`,
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
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'log',
                        start: 38,
                        end: 41,
                        loc: {
                          start: {
                            line: 2,
                            column: 22
                          },
                          end: {
                            line: 2,
                            column: 25
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'push',
                        start: 42,
                        end: 46,
                        loc: {
                          start: {
                            line: 2,
                            column: 26
                          },
                          end: {
                            line: 2,
                            column: 30
                          }
                        }
                      },

                      start: 38,
                      end: 46,
                      loc: {
                        start: {
                          line: 2,
                          column: 22
                        },
                        end: {
                          line: 2,
                          column: 30
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: '1',
                        start: 47,
                        end: 50,
                        loc: {
                          start: {
                            line: 2,
                            column: 31
                          },
                          end: {
                            line: 2,
                            column: 34
                          }
                        }
                      }
                    ],

                    start: 38,
                    end: 51,
                    loc: {
                      start: {
                        line: 2,
                        column: 22
                      },
                      end: {
                        line: 2,
                        column: 35
                      }
                    }
                  },
                  start: 38,
                  end: 52,
                  loc: {
                    start: {
                      line: 2,
                      column: 22
                    },
                    end: {
                      line: 2,
                      column: 36
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 1,
                      start: 81,
                      end: 82,
                      loc: {
                        start: {
                          line: 3,
                          column: 28
                        },
                        end: {
                          line: 3,
                          column: 29
                        }
                      }
                    },
                    delegate: false,
                    start: 75,
                    end: 82,
                    loc: {
                      start: {
                        line: 3,
                        column: 22
                      },
                      end: {
                        line: 3,
                        column: 29
                      }
                    }
                  },
                  start: 75,
                  end: 83,
                  loc: {
                    start: {
                      line: 3,
                      column: 22
                    },
                    end: {
                      line: 3,
                      column: 30
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'log',
                        start: 106,
                        end: 109,
                        loc: {
                          start: {
                            line: 4,
                            column: 22
                          },
                          end: {
                            line: 4,
                            column: 25
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'push',
                        start: 110,
                        end: 114,
                        loc: {
                          start: {
                            line: 4,
                            column: 26
                          },
                          end: {
                            line: 4,
                            column: 30
                          }
                        }
                      },

                      start: 106,
                      end: 114,
                      loc: {
                        start: {
                          line: 4,
                          column: 22
                        },
                        end: {
                          line: 4,
                          column: 30
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: '2',
                        start: 115,
                        end: 118,
                        loc: {
                          start: {
                            line: 4,
                            column: 31
                          },
                          end: {
                            line: 4,
                            column: 34
                          }
                        }
                      }
                    ],

                    start: 106,
                    end: 119,
                    loc: {
                      start: {
                        line: 4,
                        column: 22
                      },
                      end: {
                        line: 4,
                        column: 35
                      }
                    }
                  },
                  start: 106,
                  end: 120,
                  loc: {
                    start: {
                      line: 4,
                      column: 22
                    },
                    end: {
                      line: 4,
                      column: 36
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 2,
                      start: 149,
                      end: 150,
                      loc: {
                        start: {
                          line: 5,
                          column: 28
                        },
                        end: {
                          line: 5,
                          column: 29
                        }
                      }
                    },
                    delegate: false,
                    start: 143,
                    end: 150,
                    loc: {
                      start: {
                        line: 5,
                        column: 22
                      },
                      end: {
                        line: 5,
                        column: 29
                      }
                    }
                  },
                  start: 143,
                  end: 151,
                  loc: {
                    start: {
                      line: 5,
                      column: 22
                    },
                    end: {
                      line: 5,
                      column: 30
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'log',
                        start: 174,
                        end: 177,
                        loc: {
                          start: {
                            line: 6,
                            column: 22
                          },
                          end: {
                            line: 6,
                            column: 25
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'push',
                        start: 178,
                        end: 182,
                        loc: {
                          start: {
                            line: 6,
                            column: 26
                          },
                          end: {
                            line: 6,
                            column: 30
                          }
                        }
                      },

                      start: 174,
                      end: 182,
                      loc: {
                        start: {
                          line: 6,
                          column: 22
                        },
                        end: {
                          line: 6,
                          column: 30
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: '3',
                        start: 183,
                        end: 186,
                        loc: {
                          start: {
                            line: 6,
                            column: 31
                          },
                          end: {
                            line: 6,
                            column: 34
                          }
                        }
                      }
                    ],

                    start: 174,
                    end: 187,
                    loc: {
                      start: {
                        line: 6,
                        column: 22
                      },
                      end: {
                        line: 6,
                        column: 35
                      }
                    }
                  },
                  start: 174,
                  end: 188,
                  loc: {
                    start: {
                      line: 6,
                      column: 22
                    },
                    end: {
                      line: 6,
                      column: 36
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 3,
                      start: 217,
                      end: 218,
                      loc: {
                        start: {
                          line: 7,
                          column: 28
                        },
                        end: {
                          line: 7,
                          column: 29
                        }
                      }
                    },
                    delegate: false,
                    start: 211,
                    end: 218,
                    loc: {
                      start: {
                        line: 7,
                        column: 22
                      },
                      end: {
                        line: 7,
                        column: 29
                      }
                    }
                  },
                  start: 211,
                  end: 219,
                  loc: {
                    start: {
                      line: 7,
                      column: 22
                    },
                    end: {
                      line: 7,
                      column: 30
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'log',
                        start: 242,
                        end: 245,
                        loc: {
                          start: {
                            line: 8,
                            column: 22
                          },
                          end: {
                            line: 8,
                            column: 25
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'push',
                        start: 246,
                        end: 250,
                        loc: {
                          start: {
                            line: 8,
                            column: 26
                          },
                          end: {
                            line: 8,
                            column: 30
                          }
                        }
                      },

                      start: 242,
                      end: 250,
                      loc: {
                        start: {
                          line: 8,
                          column: 22
                        },
                        end: {
                          line: 8,
                          column: 30
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: 'done',
                        start: 251,
                        end: 257,
                        loc: {
                          start: {
                            line: 8,
                            column: 31
                          },
                          end: {
                            line: 8,
                            column: 37
                          }
                        }
                      }
                    ],

                    start: 242,
                    end: 258,
                    loc: {
                      start: {
                        line: 8,
                        column: 22
                      },
                      end: {
                        line: 8,
                        column: 38
                      }
                    }
                  },
                  start: 242,
                  end: 259,
                  loc: {
                    start: {
                      line: 8,
                      column: 22
                    },
                    end: {
                      line: 8,
                      column: 39
                    }
                  }
                }
              ],
              start: 14,
              end: 281,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 9,
                  column: 21
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
            end: 281,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 9,
                column: 21
              }
            }
          },
          {
            type: 'EmptyStatement',
            start: 281,
            end: 282,
            loc: {
              start: {
                line: 9,
                column: 21
              },
              end: {
                line: 9,
                column: 22
              }
            }
          }
        ],
        start: 0,
        end: 282,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 9,
            column: 22
          }
        }
      }
    ],
    [
      `var gen = function *() {
        yield {
            ...yield,
            y: 1,
            ...yield yield,
          };
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
                                  start: 56,
                                  end: 61,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 15
                                    },
                                    end: {
                                      line: 3,
                                      column: 20
                                    }
                                  }
                                },
                                start: 53,
                                end: 61,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 12
                                  },
                                  end: {
                                    line: 3,
                                    column: 20
                                  }
                                }
                              },
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'y',
                                  start: 75,
                                  end: 76,
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
                                value: {
                                  type: 'Literal',
                                  value: 1,
                                  start: 78,
                                  end: 79,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 75,
                                end: 79,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 12
                                  },
                                  end: {
                                    line: 4,
                                    column: 16
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 102,
                                    end: 107,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 21
                                      },
                                      end: {
                                        line: 5,
                                        column: 26
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 96,
                                  end: 107,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 15
                                    },
                                    end: {
                                      line: 5,
                                      column: 26
                                    }
                                  }
                                },
                                start: 93,
                                end: 107,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 12
                                  },
                                  end: {
                                    line: 5,
                                    column: 26
                                  }
                                }
                              }
                            ],
                            start: 39,
                            end: 120,
                            loc: {
                              start: {
                                line: 2,
                                column: 14
                              },
                              end: {
                                line: 6,
                                column: 11
                              }
                            }
                          },
                          delegate: false,
                          start: 33,
                          end: 120,
                          loc: {
                            start: {
                              line: 2,
                              column: 8
                            },
                            end: {
                              line: 6,
                              column: 11
                            }
                          }
                        },
                        start: 33,
                        end: 121,
                        loc: {
                          start: {
                            line: 2,
                            column: 8
                          },
                          end: {
                            line: 6,
                            column: 12
                          }
                        }
                      }
                    ],
                    start: 23,
                    end: 129,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 7,
                        column: 7
                      }
                    }
                  },
                  async: false,
                  generator: true,
                  id: null,
                  start: 10,
                  end: 129,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 7,
                      column: 7
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen',
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
                end: 129,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 7,
                    column: 7
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
                column: 8
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
            column: 8
          }
        }
      }
    ],
    [
      `var gen = function *g() {
          yield {
              ...yield,
              y: 1,
              ...yield yield,
            };
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
                                  start: 61,
                                  end: 66,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 17
                                    },
                                    end: {
                                      line: 3,
                                      column: 22
                                    }
                                  }
                                },
                                start: 58,
                                end: 66,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 14
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
                                  name: 'y',
                                  start: 82,
                                  end: 83,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 14
                                    },
                                    end: {
                                      line: 4,
                                      column: 15
                                    }
                                  }
                                },
                                value: {
                                  type: 'Literal',
                                  value: 1,
                                  start: 85,
                                  end: 86,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 17
                                    },
                                    end: {
                                      line: 4,
                                      column: 18
                                    }
                                  }
                                },
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 82,
                                end: 86,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 14
                                  },
                                  end: {
                                    line: 4,
                                    column: 18
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 111,
                                    end: 116,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 23
                                      },
                                      end: {
                                        line: 5,
                                        column: 28
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 105,
                                  end: 116,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 17
                                    },
                                    end: {
                                      line: 5,
                                      column: 28
                                    }
                                  }
                                },
                                start: 102,
                                end: 116,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 14
                                  },
                                  end: {
                                    line: 5,
                                    column: 28
                                  }
                                }
                              }
                            ],
                            start: 42,
                            end: 131,
                            loc: {
                              start: {
                                line: 2,
                                column: 16
                              },
                              end: {
                                line: 6,
                                column: 13
                              }
                            }
                          },
                          delegate: false,
                          start: 36,
                          end: 131,
                          loc: {
                            start: {
                              line: 2,
                              column: 10
                            },
                            end: {
                              line: 6,
                              column: 13
                            }
                          }
                        },
                        start: 36,
                        end: 132,
                        loc: {
                          start: {
                            line: 2,
                            column: 10
                          },
                          end: {
                            line: 6,
                            column: 14
                          }
                        }
                      }
                    ],
                    start: 24,
                    end: 142,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 7,
                        column: 9
                      }
                    }
                  },
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'g',
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
                  start: 10,
                  end: 142,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 7,
                      column: 9
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen',
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
                end: 142,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 7,
                    column: 9
                  }
                }
              }
            ],
            start: 0,
            end: 143,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 7,
                column: 10
              }
            }
          }
        ],
        start: 0,
        end: 143,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 10
          }
        }
      }
    ],
    [
      `var gen = function *() {
            yield {
                ...yield,
                y: 1,
                ...yield yield,
              };
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
                  type: 'FunctionExpression',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
                                  start: 64,
                                  end: 69,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 19
                                    },
                                    end: {
                                      line: 3,
                                      column: 24
                                    }
                                  }
                                },
                                start: 61,
                                end: 69,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 16
                                  },
                                  end: {
                                    line: 3,
                                    column: 24
                                  }
                                }
                              },
                              {
                                type: 'Property',
                                key: {
                                  type: 'Identifier',
                                  name: 'y',
                                  start: 87,
                                  end: 88,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 16
                                    },
                                    end: {
                                      line: 4,
                                      column: 17
                                    }
                                  }
                                },
                                value: {
                                  type: 'Literal',
                                  value: 1,
                                  start: 90,
                                  end: 91,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
                                start: 87,
                                end: 91,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 16
                                  },
                                  end: {
                                    line: 4,
                                    column: 20
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 118,
                                    end: 123,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 25
                                      },
                                      end: {
                                        line: 5,
                                        column: 30
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 112,
                                  end: 123,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 19
                                    },
                                    end: {
                                      line: 5,
                                      column: 30
                                    }
                                  }
                                },
                                start: 109,
                                end: 123,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 16
                                  },
                                  end: {
                                    line: 5,
                                    column: 30
                                  }
                                }
                              }
                            ],
                            start: 43,
                            end: 140,
                            loc: {
                              start: {
                                line: 2,
                                column: 18
                              },
                              end: {
                                line: 6,
                                column: 15
                              }
                            }
                          },
                          delegate: false,
                          start: 37,
                          end: 140,
                          loc: {
                            start: {
                              line: 2,
                              column: 12
                            },
                            end: {
                              line: 6,
                              column: 15
                            }
                          }
                        },
                        start: 37,
                        end: 141,
                        loc: {
                          start: {
                            line: 2,
                            column: 12
                          },
                          end: {
                            line: 6,
                            column: 16
                          }
                        }
                      }
                    ],
                    start: 23,
                    end: 153,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 7,
                        column: 11
                      }
                    }
                  },
                  async: false,
                  generator: true,
                  id: null,
                  start: 10,
                  end: 153,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 7,
                      column: 11
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen',
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
                end: 153,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 7,
                    column: 11
                  }
                }
              }
            ],
            start: 0,
            end: 154,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 7,
                column: 12
              }
            }
          }
        ],
        start: 0,
        end: 154,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 7,
            column: 12
          }
        }
      }
    ],
    [
      `function* x() {class y extends (yield arguments) {}}`,
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
                  superClass: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'arguments',
                      start: 38,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    delegate: false,
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
                  },
                  body: {
                    type: 'ClassBody',
                    body: [],
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
                  },
                  start: 15,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 51
                    }
                  }
                }
              ],
              start: 14,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 52
                }
              }
            },
            async: false,
            generator: true,
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
      `var f = function *(a) { yield a+1; return; };`,
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
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
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
                            right: {
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
                            operator: '+',
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
                          delegate: false,
                          start: 24,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        },
                        start: 24,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      {
                        type: 'ReturnStatement',
                        argument: null,
                        start: 35,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
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
                  async: false,
                  generator: true,
                  id: null,
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
                id: {
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
      `var gfe = function* () { switch (1) { case yield* 'foo': break; } }`,
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
                        type: 'SwitchStatement',
                        discriminant: {
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
                        cases: [
                          {
                            type: 'SwitchCase',
                            test: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 'foo',
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
                              },
                              delegate: true,
                              start: 43,
                              end: 55,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 43
                                },
                                end: {
                                  line: 1,
                                  column: 55
                                }
                              }
                            },
                            consequent: [
                              {
                                type: 'BreakStatement',
                                label: null,
                                start: 57,
                                end: 63,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 57
                                  },
                                  end: {
                                    line: 1,
                                    column: 63
                                  }
                                }
                              }
                            ],
                            start: 38,
                            end: 63,
                            loc: {
                              start: {
                                line: 1,
                                column: 38
                              },
                              end: {
                                line: 1,
                                column: 63
                              }
                            }
                          }
                        ],
                        start: 25,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 65
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
                  generator: true,
                  id: null,
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
                },
                id: {
                  type: 'Identifier',
                  name: 'gfe',
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
              }
            ],
            start: 0,
            end: 67,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 67
              }
            }
          }
        ],
        start: 0,
        end: 67,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 67
          }
        }
      }
    ],
    [
      `function* foo() {  return ( yield* ( async ( j ) => {}) ) }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ArrowFunctionExpression',
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
                      params: [
                        {
                          type: 'Identifier',
                          name: 'j',
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
                        }
                      ],
                      async: true,
                      expression: false,
                      start: 37,
                      end: 54,
                      loc: {
                        start: {
                          line: 1,
                          column: 37
                        },
                        end: {
                          line: 1,
                          column: 54
                        }
                      }
                    },
                    delegate: true,
                    start: 28,
                    end: 55,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 55
                      }
                    }
                  },
                  start: 19,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 16,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 59
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
      `function* foo() { switch ( y (yield) - ((a) => {})) { } }`,
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
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'y',
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
                      arguments: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                        }
                      ],

                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    },
                    right: {
                      type: 'ArrowFunctionExpression',
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
                      params: [
                        {
                          type: 'Identifier',
                          name: 'a',
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
                        }
                      ],
                      async: false,
                      expression: false,
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
                    operator: '-',
                    start: 27,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  },
                  cases: [],
                  start: 18,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 16,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 57
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
      `function* foo() { switch ( y (yield) - (async (a) => {})) { } }`,
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
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'y',
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
                      arguments: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                        }
                      ],

                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    },
                    right: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BlockStatement',
                        body: [],
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
                      params: [
                        {
                          type: 'Identifier',
                          name: 'a',
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
                        }
                      ],
                      async: true,
                      expression: false,
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
                    operator: '-',
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
                  },
                  cases: [],
                  start: 18,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  }
                }
              ],
              start: 16,
              end: 63,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 63
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
      `function* foo() { a(yield* function t(k) {}, ...(c) => {}) }`,
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
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'FunctionExpression',
                          params: [
                            {
                              type: 'Identifier',
                              name: 'k',
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
                          id: {
                            type: 'Identifier',
                            name: 't',
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
                          start: 27,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        },
                        delegate: true,
                        start: 20,
                        end: 43,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 43
                          }
                        }
                      },
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 55,
                            end: 57,
                            loc: {
                              start: {
                                line: 1,
                                column: 55
                              },
                              end: {
                                line: 1,
                                column: 57
                              }
                            }
                          },
                          params: [
                            {
                              type: 'Identifier',
                              name: 'c',
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
                          async: false,
                          expression: false,
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
                        },
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
                      }
                    ],

                    start: 18,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  start: 18,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
              start: 16,
              end: 60,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 60
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
      `function* foo() { yield 2; yield 3; yield 4 }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 2,
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
                    delegate: false,
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
                  start: 18,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
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
                    delegate: false,
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
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 4,
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
                    delegate: false,
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
                }
              ],
              start: 16,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 45
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
      `({} = ({x} = (function* y(z) { (yield) }))) => (p);`,
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
                name: 'p',
                start: 48,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 48
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [],
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
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
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
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
                          }
                        ],
                        start: 29,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: {
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
                      start: 14,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    start: 7,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  start: 1,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `({} = ([x] = (function* y(z) { (yield) }))) => (p);`,
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
                name: 'p',
                start: 48,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 48
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [],
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
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
                          }
                        ],
                        start: 29,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: {
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
                      start: 14,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    start: 7,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  start: 1,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `([] = ({x} = (function* y(z) { (yield) }))) => (p);`,
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
                name: 'p',
                start: 48,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 48
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [],
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
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
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
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
                          }
                        ],
                        start: 29,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: {
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
                      start: 14,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    start: 7,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  start: 1,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `([] = ({x} = (function* y(z) { async (yield) }))) => (p);`,
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
                name: 'p',
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [],
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
                  right: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
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
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                                start: 31,
                                end: 36,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 31
                                  },
                                  end: {
                                    line: 1,
                                    column: 36
                                  }
                                }
                              },
                              arguments: [
                                {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                }
                              ],

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
                          }
                        ],
                        start: 29,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: {
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
                      start: 14,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    start: 7,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  start: 1,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 48
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(a = ({x} = (function* y(z) { async (yield) }))) => (p);`,
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
                name: 'p',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          },
                          value: {
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
                        }
                      ],
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
                    operator: '=',
                    right: {
                      type: 'FunctionExpression',
                      params: [
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
                              arguments: [
                                {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                }
                              ],

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
                          }
                        ],
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
                      async: false,
                      generator: true,
                      id: {
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
                      start: 13,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 6,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 1,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(a = ({x} = (function* y(z) { async (yield) }))) => (await);`,
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
                name: 'await',
                start: 53,
                end: 58,
                loc: {
                  start: {
                    line: 1,
                    column: 53
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
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          },
                          value: {
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
                        }
                      ],
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
                    operator: '=',
                    right: {
                      type: 'FunctionExpression',
                      params: [
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
                              arguments: [
                                {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                }
                              ],

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
                          }
                        ],
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
                      async: false,
                      generator: true,
                      id: {
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
                      start: 13,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 6,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 1,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(a = ({async} = (function* y(z) { async (yield) }))) => (p);`,
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
                name: 'p',
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
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'async',
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
                            name: 'async',
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
                          shorthand: true,
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
                    operator: '=',
                    right: {
                      type: 'FunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                                start: 34,
                                end: 39,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 34
                                  },
                                  end: {
                                    line: 1,
                                    column: 39
                                  }
                                }
                              },
                              arguments: [
                                {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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

                              start: 34,
                              end: 47,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 34
                                },
                                end: {
                                  line: 1,
                                  column: 47
                                }
                              }
                            },
                            start: 34,
                            end: 47,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 47
                              }
                            }
                          }
                        ],
                        start: 32,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
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
                        name: 'y',
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
                      start: 17,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    start: 6,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 50
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
                }
              ],
              async: false,
              expression: true,
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
      `(x = (function* () { (yield) }), {[x]: a} ) => 7`,
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
                value: 7,
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
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  start: 1,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 31
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
                      value: {
                        type: 'Identifier',
                        name: 'a',
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
                      kind: 'init',
                      computed: true,
                      method: false,
                      shorthand: false,
                      start: 34,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    }
                  ],
                  start: 33,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(a = ({x} = (function* y(z) { async (yield) }))) => (p);`,
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
                name: 'p',
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          },
                          value: {
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
                        }
                      ],
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
                    operator: '=',
                    right: {
                      type: 'FunctionExpression',
                      params: [
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
                              arguments: [
                                {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                }
                              ],

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
                          }
                        ],
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
                      async: false,
                      generator: true,
                      id: {
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
                      start: 13,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 13
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 6,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 1,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(x = (function* () { async (yield) }), {[x]: a} ) => 7`,
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
                value: 7,
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
                    type: 'FunctionExpression',
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
                            arguments: [
                              {
                                type: 'YieldExpression',
                                argument: null,
                                delegate: false,
                                start: 28,
                                end: 33,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 33
                                  }
                                }
                              }
                            ],

                            start: 21,
                            end: 34,
                            loc: {
                              start: {
                                line: 1,
                                column: 21
                              },
                              end: {
                                line: 1,
                                column: 34
                              }
                            }
                          },
                          start: 21,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        }
                      ],
                      start: 19,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 1,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 37
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
                      value: {
                        type: 'Identifier',
                        name: 'a',
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
                      kind: 'init',
                      computed: true,
                      method: false,
                      shorthand: false,
                      start: 40,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 40
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    }
                  ],
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
              async: false,
              expression: true,
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
      `bar(...(function*(){ yield 1; yield 2; yield 3; })());`,
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
                name: 'bar',
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
                  type: 'SpreadElement',
                  argument: {
                    type: 'CallExpression',
                    callee: {
                      type: 'FunctionExpression',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
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
                              delegate: false,
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
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 2,
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
                              delegate: false,
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
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Literal',
                                value: 3,
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
                              delegate: false,
                              start: 39,
                              end: 46,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 39
                                },
                                end: {
                                  line: 1,
                                  column: 46
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
                        start: 19,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 49
                          }
                        }
                      },
                      async: false,
                      generator: true,
                      id: null,
                      start: 8,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    arguments: [],

                    start: 7,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  start: 4,
                  end: 52,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 52
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
      `(function*() { yield* {} })().next()`,
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
                type: 'MemberExpression',
                object: {
                  type: 'CallExpression',
                  callee: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: {
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
                            delegate: true,
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
                    async: false,
                    generator: true,
                    id: null,
                    start: 1,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  arguments: [],

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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'next',
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
              arguments: [],

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
      `{
      let x = 42;
      function* foo() {
        yield x;
        for (let x in {a: 1, b: 2}) {
          let i = 2;
          yield x;
          yield i;
          do {
            yield i;
          } while (i-- > 0);
        }
        yield x;
        return 5;
      }
      g = foo();
    }`,
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
                    init: {
                      type: 'Literal',
                      value: 42,
                      start: 16,
                      end: 18,
                      loc: {
                        start: {
                          line: 2,
                          column: 14
                        },
                        end: {
                          line: 2,
                          column: 16
                        }
                      }
                    },
                    id: {
                      type: 'Identifier',
                      name: 'x',
                      start: 12,
                      end: 13,
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
                    start: 12,
                    end: 18,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 2,
                        column: 16
                      }
                    }
                  }
                ],
                start: 8,
                end: 19,
                loc: {
                  start: {
                    line: 2,
                    column: 6
                  },
                  end: {
                    line: 2,
                    column: 17
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
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x',
                          start: 58,
                          end: 59,
                          loc: {
                            start: {
                              line: 4,
                              column: 14
                            },
                            end: {
                              line: 4,
                              column: 15
                            }
                          }
                        },
                        delegate: false,
                        start: 52,
                        end: 59,
                        loc: {
                          start: {
                            line: 4,
                            column: 8
                          },
                          end: {
                            line: 4,
                            column: 15
                          }
                        }
                      },
                      start: 52,
                      end: 60,
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
                                  type: 'Literal',
                                  value: 2,
                                  start: 117,
                                  end: 118,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 18
                                    },
                                    end: {
                                      line: 6,
                                      column: 19
                                    }
                                  }
                                },
                                id: {
                                  type: 'Identifier',
                                  name: 'i',
                                  start: 113,
                                  end: 114,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 14
                                    },
                                    end: {
                                      line: 6,
                                      column: 15
                                    }
                                  }
                                },
                                start: 113,
                                end: 118,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 14
                                  },
                                  end: {
                                    line: 6,
                                    column: 19
                                  }
                                }
                              }
                            ],
                            start: 109,
                            end: 119,
                            loc: {
                              start: {
                                line: 6,
                                column: 10
                              },
                              end: {
                                line: 6,
                                column: 20
                              }
                            }
                          },
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'Identifier',
                                name: 'x',
                                start: 136,
                                end: 137,
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
                              delegate: false,
                              start: 130,
                              end: 137,
                              loc: {
                                start: {
                                  line: 7,
                                  column: 10
                                },
                                end: {
                                  line: 7,
                                  column: 17
                                }
                              }
                            },
                            start: 130,
                            end: 138,
                            loc: {
                              start: {
                                line: 7,
                                column: 10
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
                              type: 'YieldExpression',
                              argument: {
                                type: 'Identifier',
                                name: 'i',
                                start: 155,
                                end: 156,
                                loc: {
                                  start: {
                                    line: 8,
                                    column: 16
                                  },
                                  end: {
                                    line: 8,
                                    column: 17
                                  }
                                }
                              },
                              delegate: false,
                              start: 149,
                              end: 156,
                              loc: {
                                start: {
                                  line: 8,
                                  column: 10
                                },
                                end: {
                                  line: 8,
                                  column: 17
                                }
                              }
                            },
                            start: 149,
                            end: 157,
                            loc: {
                              start: {
                                line: 8,
                                column: 10
                              },
                              end: {
                                line: 8,
                                column: 18
                              }
                            }
                          },
                          {
                            type: 'DoWhileStatement',
                            body: {
                              type: 'BlockStatement',
                              body: [
                                {
                                  type: 'ExpressionStatement',
                                  expression: {
                                    type: 'YieldExpression',
                                    argument: {
                                      type: 'Identifier',
                                      name: 'i',
                                      start: 191,
                                      end: 192,
                                      loc: {
                                        start: {
                                          line: 10,
                                          column: 18
                                        },
                                        end: {
                                          line: 10,
                                          column: 19
                                        }
                                      }
                                    },
                                    delegate: false,
                                    start: 185,
                                    end: 192,
                                    loc: {
                                      start: {
                                        line: 10,
                                        column: 12
                                      },
                                      end: {
                                        line: 10,
                                        column: 19
                                      }
                                    }
                                  },
                                  start: 185,
                                  end: 193,
                                  loc: {
                                    start: {
                                      line: 10,
                                      column: 12
                                    },
                                    end: {
                                      line: 10,
                                      column: 20
                                    }
                                  }
                                }
                              ],
                              start: 171,
                              end: 205,
                              loc: {
                                start: {
                                  line: 9,
                                  column: 13
                                },
                                end: {
                                  line: 11,
                                  column: 11
                                }
                              }
                            },
                            start: 168,
                            test: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'UpdateExpression',
                                argument: {
                                  type: 'Identifier',
                                  name: 'i',
                                  start: 213,
                                  end: 214,
                                  loc: {
                                    start: {
                                      line: 11,
                                      column: 19
                                    },
                                    end: {
                                      line: 11,
                                      column: 20
                                    }
                                  }
                                },
                                operator: '--',
                                prefix: false,
                                start: 213,
                                end: 216,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 19
                                  },
                                  end: {
                                    line: 11,
                                    column: 22
                                  }
                                }
                              },
                              right: {
                                type: 'Literal',
                                value: 0,
                                start: 219,
                                end: 220,
                                loc: {
                                  start: {
                                    line: 11,
                                    column: 25
                                  },
                                  end: {
                                    line: 11,
                                    column: 26
                                  }
                                }
                              },
                              operator: '>',
                              start: 213,
                              end: 220,
                              loc: {
                                start: {
                                  line: 11,
                                  column: 19
                                },
                                end: {
                                  line: 11,
                                  column: 26
                                }
                              }
                            },
                            end: 222,
                            loc: {
                              start: {
                                line: 9,
                                column: 10
                              },
                              end: {
                                line: 11,
                                column: 28
                              }
                            }
                          }
                        ],
                        start: 97,
                        end: 232,
                        loc: {
                          start: {
                            line: 5,
                            column: 36
                          },
                          end: {
                            line: 12,
                            column: 9
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
                              start: 78,
                              end: 79,
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
                            start: 78,
                            end: 79,
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
                          }
                        ],
                        start: 74,
                        end: 79,
                        loc: {
                          start: {
                            line: 5,
                            column: 13
                          },
                          end: {
                            line: 5,
                            column: 18
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
                              start: 84,
                              end: 85,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 23
                                },
                                end: {
                                  line: 5,
                                  column: 24
                                }
                              }
                            },
                            value: {
                              type: 'Literal',
                              value: 1,
                              start: 87,
                              end: 88,
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
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 84,
                            end: 88,
                            loc: {
                              start: {
                                line: 5,
                                column: 23
                              },
                              end: {
                                line: 5,
                                column: 27
                              }
                            }
                          },
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'b',
                              start: 90,
                              end: 91,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 29
                                },
                                end: {
                                  line: 5,
                                  column: 30
                                }
                              }
                            },
                            value: {
                              type: 'Literal',
                              value: 2,
                              start: 93,
                              end: 94,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 32
                                },
                                end: {
                                  line: 5,
                                  column: 33
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 90,
                            end: 94,
                            loc: {
                              start: {
                                line: 5,
                                column: 29
                              },
                              end: {
                                line: 5,
                                column: 33
                              }
                            }
                          }
                        ],
                        start: 83,
                        end: 95,
                        loc: {
                          start: {
                            line: 5,
                            column: 22
                          },
                          end: {
                            line: 5,
                            column: 34
                          }
                        }
                      },
                      start: 69,
                      end: 232,
                      loc: {
                        start: {
                          line: 5,
                          column: 8
                        },
                        end: {
                          line: 12,
                          column: 9
                        }
                      }
                    },
                    {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'x',
                          start: 247,
                          end: 248,
                          loc: {
                            start: {
                              line: 13,
                              column: 14
                            },
                            end: {
                              line: 13,
                              column: 15
                            }
                          }
                        },
                        delegate: false,
                        start: 241,
                        end: 248,
                        loc: {
                          start: {
                            line: 13,
                            column: 8
                          },
                          end: {
                            line: 13,
                            column: 15
                          }
                        }
                      },
                      start: 241,
                      end: 249,
                      loc: {
                        start: {
                          line: 13,
                          column: 8
                        },
                        end: {
                          line: 13,
                          column: 16
                        }
                      }
                    },
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'Literal',
                        value: 5,
                        start: 265,
                        end: 266,
                        loc: {
                          start: {
                            line: 14,
                            column: 15
                          },
                          end: {
                            line: 14,
                            column: 16
                          }
                        }
                      },
                      start: 258,
                      end: 267,
                      loc: {
                        start: {
                          line: 14,
                          column: 8
                        },
                        end: {
                          line: 14,
                          column: 17
                        }
                      }
                    }
                  ],
                  start: 42,
                  end: 275,
                  loc: {
                    start: {
                      line: 3,
                      column: 22
                    },
                    end: {
                      line: 15,
                      column: 7
                    }
                  }
                },
                async: false,
                generator: true,
                id: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 36,
                  end: 39,
                  loc: {
                    start: {
                      line: 3,
                      column: 16
                    },
                    end: {
                      line: 3,
                      column: 19
                    }
                  }
                },
                start: 26,
                end: 275,
                loc: {
                  start: {
                    line: 3,
                    column: 6
                  },
                  end: {
                    line: 15,
                    column: 7
                  }
                }
              },
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'g',
                    start: 282,
                    end: 283,
                    loc: {
                      start: {
                        line: 16,
                        column: 6
                      },
                      end: {
                        line: 16,
                        column: 7
                      }
                    }
                  },
                  operator: '=',
                  right: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'foo',
                      start: 286,
                      end: 289,
                      loc: {
                        start: {
                          line: 16,
                          column: 10
                        },
                        end: {
                          line: 16,
                          column: 13
                        }
                      }
                    },
                    arguments: [],

                    start: 286,
                    end: 291,
                    loc: {
                      start: {
                        line: 16,
                        column: 10
                      },
                      end: {
                        line: 16,
                        column: 15
                      }
                    }
                  },
                  start: 282,
                  end: 291,
                  loc: {
                    start: {
                      line: 16,
                      column: 6
                    },
                    end: {
                      line: 16,
                      column: 15
                    }
                  }
                },
                start: 282,
                end: 292,
                loc: {
                  start: {
                    line: 16,
                    column: 6
                  },
                  end: {
                    line: 16,
                    column: 16
                  }
                }
              }
            ],
            start: 0,
            end: 298,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 17,
                column: 5
              }
            }
          }
        ],
        start: 0,
        end: 298,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 17,
            column: 5
          }
        }
      }
    ],
    [
      `function *foo() {({ [yield]: x } = { })}`,
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
                    type: 'AssignmentExpression',
                    left: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                          value: {
                            type: 'Identifier',
                            name: 'x',
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
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false,
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [],
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
                  start: 17,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 16,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 40
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
      `function *foo() {({ yield: 1 })}`,
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
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'yield',
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
                      }
                    ],
                    start: 18,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  start: 17,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
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
      `function *foo() {yield, yield}`,
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
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
                  },
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
      `function *foo() {(yield) ? yield : yield}`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                    alternate: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                    start: 17,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  start: 17,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 16,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 41
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
      `function *foo() {x = class extends (yield) {}}`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ClassExpression',
                      id: null,
                      superClass: {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
                      body: {
                        type: 'ClassBody',
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
                    },
                    start: 17,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 17,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                }
              ],
              start: 16,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 46
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
      `function *foo() {x = class extends (null, yield) { }}`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ClassExpression',
                      id: null,
                      superClass: {
                        type: 'SequenceExpression',
                        expressions: [
                          {
                            type: 'Literal',
                            value: null,
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
                          {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                      body: {
                        type: 'ClassBody',
                        body: [],
                        start: 49,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 49
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      },
                      start: 21,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    },
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
                }
              ],
              start: 16,
              end: 53,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 53
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
      `function *foo() {x = class extends (a ? null : yield) { }}`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ClassExpression',
                      id: null,
                      superClass: {
                        type: 'ConditionalExpression',
                        test: {
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
                        consequent: {
                          type: 'Literal',
                          value: null,
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
                        alternate: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                      body: {
                        type: 'ClassBody',
                        body: [],
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
                      start: 21,
                      end: 57,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 57
                        }
                      }
                    },
                    start: 17,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    }
                  },
                  start: 17,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 16,
              end: 58,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 58
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
      `function *foo() {yield * 2;}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 2,
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
                    delegate: true,
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
      `function *foo() {yield yield 1;}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'YieldExpression',
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
                      delegate: false,
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
                    delegate: false,
                    start: 17,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  start: 17,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 31
                    }
                  }
                }
              ],
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
      `function *foo() {yield 3 + (yield 4);}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 4,
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
                        delegate: false,
                        start: 28,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      },
                      operator: '+',
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
                    },
                    delegate: false,
                    start: 17,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 17,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
              start: 16,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 38
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
      `function *foo() {(yield * 3) + (yield * 4);}`,
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: true,
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
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 4,
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
                      delegate: true,
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
                    },
                    operator: '+',
                    start: 17,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  },
                  start: 17,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  }
                }
              ],
              start: 16,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 44
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
      `function *foo() {(function (yield) { })}`,
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
                    type: 'FunctionExpression',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'yield',
                        start: 28,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: false,
                    generator: false,
                    id: null,
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
                  start: 17,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 16,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 40
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
      `{ (x = [yield]) => z }`,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'z',
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
                  params: [
                    {
                      type: 'AssignmentPattern',
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
                      right: {
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield',
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
                    }
                  ],
                  async: false,
                  expression: true,
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
      `{ (x = [yield]) }`,
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
                        name: 'yield',
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
      `{ (x = {[yield]: 1}) => z }`,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Identifier',
                    name: 'z',
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
                  params: [
                    {
                      type: 'AssignmentPattern',
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
                      right: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'yield',
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
                              type: 'Literal',
                              value: 1,
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
                            kind: 'init',
                            computed: true,
                            method: false,
                            shorthand: false,
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
                        start: 7,
                        end: 19,
                        loc: {
                          start: {
                            line: 1,
                            column: 7
                          },
                          end: {
                            line: 1,
                            column: 19
                          }
                        }
                      },
                      start: 3,
                      end: 19,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 19
                        }
                      }
                    }
                  ],
                  async: false,
                  expression: true,
                  start: 2,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                start: 2,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 25
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
      `{ (x = {[yield]: 1}) }`,
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
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'yield',
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
                          type: 'Literal',
                          value: 1,
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
                        kind: 'init',
                        computed: true,
                        method: false,
                        shorthand: false,
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
                    start: 7,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
                  start: 3,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 19
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
      `{ (x = x + yield) => x; }`,
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
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'AssignmentPattern',
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
                      right: {
                        type: 'BinaryExpression',
                        left: {
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
                        },
                        right: {
                          type: 'Identifier',
                          name: 'yield',
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
                        operator: '+',
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
                  async: false,
                  expression: true,
                  start: 2,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 22
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
      `{ yield = {}; }`,
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
                    name: 'yield',
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
                  operator: '=',
                  right: {
                    type: 'ObjectExpression',
                    properties: [],
                    start: 10,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    }
                  },
                  start: 2,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                start: 2,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 13
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
      `{ yield => {}; }`,
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
                      name: 'yield',
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
                  async: false,
                  expression: false,
                  start: 2,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                },
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
      `{ (x = x + yield); }`,
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
                    type: 'BinaryExpression',
                    left: {
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
                    },
                    right: {
                      type: 'Identifier',
                      name: 'yield',
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
                    operator: '+',
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
                },
                start: 2,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 2
                  },
                  end: {
                    line: 1,
                    column: 18
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
      `{ (x = yield) => {}; }`,
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
                  type: 'ArrowFunctionExpression',
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
                  params: [
                    {
                      type: 'AssignmentPattern',
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
                      right: {
                        type: 'Identifier',
                        name: 'yield',
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
                    }
                  ],
                  async: false,
                  expression: false,
                  start: 2,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 19
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
      `{ (x = yield); }`,
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
                    type: 'Identifier',
                    name: 'yield',
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
      `function *g(){ (x = [yield y]) }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'y',
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
                          delegate: false,
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
                      start: 20,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
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
                    }
                  },
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
              start: 13,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ (x = {[yield y]: 1}) }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'YieldExpression',
                            argument: {
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
                            delegate: false,
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
                          computed: true,
                          method: false,
                          shorthand: false,
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
                        }
                      ],
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
                    },
                    start: 16,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
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
                }
              ],
              start: 13,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ (x = [yield]) }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                        }
                      ],
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
                    },
                    start: 16,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  },
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
              start: 13,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ (x = {[yield]: 1}) }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                          computed: true,
                          method: false,
                          shorthand: false,
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
                      start: 20,
                      end: 32,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
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
                  start: 15,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 13,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { (x = y = yield z) }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'AssignmentExpression',
                      left: {
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
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Identifier',
                          name: 'z',
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
                        delegate: false,
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
                    },
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { (x = yield); }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `(x = x + yield);`,
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
              operator: '=',
              right: {
                type: 'BinaryExpression',
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
                  name: 'yield',
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
                operator: '+',
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
              start: 1,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `function *g() { (x = x + foo(a, yield y)); }`,
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
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
                    right: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'CallExpression',
                        callee: {
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
                        arguments: [
                          {
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
                          {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'y',
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
                            delegate: false,
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

                        start: 25,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      operator: '+',
                      start: 21,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    start: 17,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  start: 16,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 42
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { return yield.x; }`,
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
                    type: 'MemberExpression',
                    object: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                      name: 'x',
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ async (x = [yield y]) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'YieldExpression',
                              argument: {
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
                              delegate: false,
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
                        start: 22,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      }
                    ],

                    start: 15,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 15,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ async (x = {[yield y]: 1}) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Identifier',
                                  name: 'y',
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
                                delegate: false,
                                start: 28,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
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
                              computed: true,
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
                          start: 26,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          }
                        },
                        start: 22,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      }
                    ],

                    start: 15,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  start: 15,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                }
              ],
              start: 13,
              end: 43,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 43
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ async (x = [yield]) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'ArrayExpression',
                          elements: [
                            {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
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
                }
              ],
              start: 13,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ async (x = {[yield]: 1}) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'YieldExpression',
                                argument: null,
                                delegate: false,
                                start: 28,
                                end: 33,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 33
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
                              computed: true,
                              method: false,
                              shorthand: false,
                              start: 27,
                              end: 37,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 37
                                }
                              }
                            }
                          ],
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
                          }
                        },
                        start: 22,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        }
                      }
                    ],

                    start: 15,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  start: 15,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 13,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { async (x = yield); }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                      }
                    ],

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
                  },
                  start: 16,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  }
                }
              ],
              start: 14,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { async (x = x + foo(a, yield y)); }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'BinaryExpression',
                          left: {
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
                          right: {
                            type: 'CallExpression',
                            callee: {
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
                            arguments: [
                              {
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
                              {
                                type: 'YieldExpression',
                                argument: {
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
                                delegate: false,
                                start: 38,
                                end: 45,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 38
                                  },
                                  end: {
                                    line: 1,
                                    column: 45
                                  }
                                }
                              }
                            ],

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
                          operator: '+',
                          start: 27,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
                        start: 23,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      }
                    ],

                    start: 16,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
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
                }
              ],
              start: 14,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *f(){ async (x = yield y) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'YieldExpression',
                          argument: {
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
                          },
                          delegate: false,
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
                }
              ],
              start: 13,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 36
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
      `async (x = z = yield) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
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
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
              async: true,
              expression: false,
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
      `async (x = z = yield)`,
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
                  },
                  operator: '=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
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
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
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
      `async (x = (yield)) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
              async: true,
              expression: false,
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
      `function *f(){ async (x = yield) }`,
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
                    arguments: [
                      {
                        type: 'AssignmentExpression',
                        left: {
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
                        operator: '=',
                        right: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                  },
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
      `function *f(){ async (yield) }`,
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
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
              start: 13,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 30
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
      `iter = yield();`,
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
                name: 'iter',
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
              operator: '=',
              right: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'yield',
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
                arguments: [],

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
      `function *f({x: x}) { function f({x: yield}) {} }`,
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
              }
            ],
            body: {
              type: 'BlockStatement',
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
                          value: {
                            type: 'Identifier',
                            name: 'yield',
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 34,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        }
                      ],
                      start: 33,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
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
                    name: 'f',
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
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              start: 20,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 20
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
      `async (x = yield) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
              async: true,
              expression: false,
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
      `async (x = yield)`,
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
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
      `async (yield)`,
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
                  name: 'yield',
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
      `({x} = yield) => {}`,
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
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                      }
                    ],
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
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
              expression: false,
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
      `function* foo(a, b, c, d) { yield a; yield b; yield c; yield d; }`,
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
              {
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
              {
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
              {
                type: 'Identifier',
                name: 'd',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
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
                    delegate: false,
                    start: 28,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  start: 28,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'b',
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
                    delegate: false,
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
                  start: 37,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
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
                    delegate: false,
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
                  start: 46,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 46
                    },
                    end: {
                      line: 1,
                      column: 54
                    }
                  }
                },
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'd',
                      start: 61,
                      end: 62,
                      loc: {
                        start: {
                          line: 1,
                          column: 61
                        },
                        end: {
                          line: 1,
                          column: 62
                        }
                      }
                    },
                    delegate: false,
                    start: 55,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  start: 55,
                  end: 63,
                  loc: {
                    start: {
                      line: 1,
                      column: 55
                    },
                    end: {
                      line: 1,
                      column: 63
                    }
                  }
                }
              ],
              start: 26,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 65
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
      `function* g25() {
          try {
            throw (yield (1 + (yield 2) + 3))
          } catch (e) {
            if (typeof e == 'object') throw e;
            return e + (yield (4 + (yield 5) + 6));
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
                        type: 'ThrowStatement',
                        argument: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'BinaryExpression',
                              left: {
                                type: 'Literal',
                                value: 1,
                                start: 60,
                                end: 61,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 26
                                  },
                                  end: {
                                    line: 3,
                                    column: 27
                                  }
                                }
                              },
                              right: {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Literal',
                                  value: 2,
                                  start: 71,
                                  end: 72,
                                  loc: {
                                    start: {
                                      line: 3,
                                      column: 37
                                    },
                                    end: {
                                      line: 3,
                                      column: 38
                                    }
                                  }
                                },
                                delegate: false,
                                start: 65,
                                end: 72,
                                loc: {
                                  start: {
                                    line: 3,
                                    column: 31
                                  },
                                  end: {
                                    line: 3,
                                    column: 38
                                  }
                                }
                              },
                              operator: '+',
                              start: 60,
                              end: 73,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 26
                                },
                                end: {
                                  line: 3,
                                  column: 39
                                }
                              }
                            },
                            right: {
                              type: 'Literal',
                              value: 3,
                              start: 76,
                              end: 77,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 42
                                },
                                end: {
                                  line: 3,
                                  column: 43
                                }
                              }
                            },
                            operator: '+',
                            start: 60,
                            end: 77,
                            loc: {
                              start: {
                                line: 3,
                                column: 26
                              },
                              end: {
                                line: 3,
                                column: 43
                              }
                            }
                          },
                          delegate: false,
                          start: 53,
                          end: 78,
                          loc: {
                            start: {
                              line: 3,
                              column: 19
                            },
                            end: {
                              line: 3,
                              column: 44
                            }
                          }
                        },
                        start: 46,
                        end: 79,
                        loc: {
                          start: {
                            line: 3,
                            column: 12
                          },
                          end: {
                            line: 3,
                            column: 45
                          }
                        }
                      }
                    ],
                    start: 32,
                    end: 91,
                    loc: {
                      start: {
                        line: 2,
                        column: 14
                      },
                      end: {
                        line: 4,
                        column: 11
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
                      start: 99,
                      end: 100,
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
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'IfStatement',
                          test: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'UnaryExpression',
                              operator: 'typeof',
                              argument: {
                                type: 'Identifier',
                                name: 'e',
                                start: 127,
                                end: 128,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 23
                                  },
                                  end: {
                                    line: 5,
                                    column: 24
                                  }
                                }
                              },
                              prefix: true,
                              start: 120,
                              end: 128,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 16
                                },
                                end: {
                                  line: 5,
                                  column: 24
                                }
                              }
                            },
                            right: {
                              type: 'Literal',
                              value: 'object',
                              start: 132,
                              end: 140,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 28
                                },
                                end: {
                                  line: 5,
                                  column: 36
                                }
                              }
                            },
                            operator: '==',
                            start: 120,
                            end: 140,
                            loc: {
                              start: {
                                line: 5,
                                column: 16
                              },
                              end: {
                                line: 5,
                                column: 36
                              }
                            }
                          },
                          consequent: {
                            type: 'ThrowStatement',
                            argument: {
                              type: 'Identifier',
                              name: 'e',
                              start: 148,
                              end: 149,
                              loc: {
                                start: {
                                  line: 5,
                                  column: 44
                                },
                                end: {
                                  line: 5,
                                  column: 45
                                }
                              }
                            },
                            start: 142,
                            end: 150,
                            loc: {
                              start: {
                                line: 5,
                                column: 38
                              },
                              end: {
                                line: 5,
                                column: 46
                              }
                            }
                          },
                          alternate: null,
                          start: 116,
                          end: 150,
                          loc: {
                            start: {
                              line: 5,
                              column: 12
                            },
                            end: {
                              line: 5,
                              column: 46
                            }
                          }
                        },
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Identifier',
                              name: 'e',
                              start: 170,
                              end: 171,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 19
                                },
                                end: {
                                  line: 6,
                                  column: 20
                                }
                              }
                            },
                            right: {
                              type: 'YieldExpression',
                              argument: {
                                type: 'BinaryExpression',
                                left: {
                                  type: 'BinaryExpression',
                                  left: {
                                    type: 'Literal',
                                    value: 4,
                                    start: 182,
                                    end: 183,
                                    loc: {
                                      start: {
                                        line: 6,
                                        column: 31
                                      },
                                      end: {
                                        line: 6,
                                        column: 32
                                      }
                                    }
                                  },
                                  right: {
                                    type: 'YieldExpression',
                                    argument: {
                                      type: 'Literal',
                                      value: 5,
                                      start: 193,
                                      end: 194,
                                      loc: {
                                        start: {
                                          line: 6,
                                          column: 42
                                        },
                                        end: {
                                          line: 6,
                                          column: 43
                                        }
                                      }
                                    },
                                    delegate: false,
                                    start: 187,
                                    end: 194,
                                    loc: {
                                      start: {
                                        line: 6,
                                        column: 36
                                      },
                                      end: {
                                        line: 6,
                                        column: 43
                                      }
                                    }
                                  },
                                  operator: '+',
                                  start: 182,
                                  end: 195,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 31
                                    },
                                    end: {
                                      line: 6,
                                      column: 44
                                    }
                                  }
                                },
                                right: {
                                  type: 'Literal',
                                  value: 6,
                                  start: 198,
                                  end: 199,
                                  loc: {
                                    start: {
                                      line: 6,
                                      column: 47
                                    },
                                    end: {
                                      line: 6,
                                      column: 48
                                    }
                                  }
                                },
                                operator: '+',
                                start: 182,
                                end: 199,
                                loc: {
                                  start: {
                                    line: 6,
                                    column: 31
                                  },
                                  end: {
                                    line: 6,
                                    column: 48
                                  }
                                }
                              },
                              delegate: false,
                              start: 175,
                              end: 200,
                              loc: {
                                start: {
                                  line: 6,
                                  column: 24
                                },
                                end: {
                                  line: 6,
                                  column: 49
                                }
                              }
                            },
                            operator: '+',
                            start: 170,
                            end: 201,
                            loc: {
                              start: {
                                line: 6,
                                column: 19
                              },
                              end: {
                                line: 6,
                                column: 50
                              }
                            }
                          },
                          start: 163,
                          end: 202,
                          loc: {
                            start: {
                              line: 6,
                              column: 12
                            },
                            end: {
                              line: 6,
                              column: 51
                            }
                          }
                        }
                      ],
                      start: 102,
                      end: 214,
                      loc: {
                        start: {
                          line: 4,
                          column: 22
                        },
                        end: {
                          line: 7,
                          column: 11
                        }
                      }
                    },
                    start: 92,
                    end: 214,
                    loc: {
                      start: {
                        line: 4,
                        column: 12
                      },
                      end: {
                        line: 7,
                        column: 11
                      }
                    }
                  },
                  finalizer: null,
                  start: 28,
                  end: 214,
                  loc: {
                    start: {
                      line: 2,
                      column: 10
                    },
                    end: {
                      line: 7,
                      column: 11
                    }
                  }
                }
              ],
              start: 16,
              end: 224,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 8,
                  column: 9
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g25',
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
            end: 224,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 8,
                column: 9
              }
            }
          }
        ],
        start: 0,
        end: 224,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 8,
            column: 9
          }
        }
      }
    ],
    [
      `function foo() { return ({ x: 42, g: function* (a) { yield this.x } }).g(0); }`,
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
                    type: 'CallExpression',
                    callee: {
                      type: 'MemberExpression',
                      object: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
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
                            value: {
                              type: 'Literal',
                              value: 42,
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'g',
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
                            value: {
                              type: 'FunctionExpression',
                              params: [
                                {
                                  type: 'Identifier',
                                  name: 'a',
                                  start: 48,
                                  end: 49,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 48
                                    },
                                    end: {
                                      line: 1,
                                      column: 49
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
                                      type: 'YieldExpression',
                                      argument: {
                                        type: 'MemberExpression',
                                        object: {
                                          type: 'ThisExpression',
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
                                        computed: false,
                                        property: {
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

                                        start: 59,
                                        end: 65,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 59
                                          },
                                          end: {
                                            line: 1,
                                            column: 65
                                          }
                                        }
                                      },
                                      delegate: false,
                                      start: 53,
                                      end: 65,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 53
                                        },
                                        end: {
                                          line: 1,
                                          column: 65
                                        }
                                      }
                                    },
                                    start: 53,
                                    end: 65,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 53
                                      },
                                      end: {
                                        line: 1,
                                        column: 65
                                      }
                                    }
                                  }
                                ],
                                start: 51,
                                end: 67,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 51
                                  },
                                  end: {
                                    line: 1,
                                    column: 67
                                  }
                                }
                              },
                              async: false,
                              generator: true,
                              id: null,
                              start: 37,
                              end: 67,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 37
                                },
                                end: {
                                  line: 1,
                                  column: 67
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 34,
                            end: 67,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 67
                              }
                            }
                          }
                        ],
                        start: 25,
                        end: 69,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 69
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'g',
                        start: 71,
                        end: 72,
                        loc: {
                          start: {
                            line: 1,
                            column: 71
                          },
                          end: {
                            line: 1,
                            column: 72
                          }
                        }
                      },

                      start: 24,
                      end: 72,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 72
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: 0,
                        start: 73,
                        end: 74,
                        loc: {
                          start: {
                            line: 1,
                            column: 73
                          },
                          end: {
                            line: 1,
                            column: 74
                          }
                        }
                      }
                    ],

                    start: 24,
                    end: 75,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 75
                      }
                    }
                  },
                  start: 17,
                  end: 76,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 76
                    }
                  }
                }
              ],
              start: 15,
              end: 78,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 78
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
            end: 78,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 78
              }
            }
          }
        ],
        start: 0,
        end: 78,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 78
          }
        }
      }
    ],
    [
      `yield *= x;`,
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
                name: 'yield',
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
              operator: '*=',
              right: {
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
      `function* g() { yield 1; try { yield 2; } catch (e) { yield e; } yield 3; }`,
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
                    type: 'YieldExpression',
                    argument: {
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
                    delegate: false,
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
                {
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Literal',
                            value: 2,
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
                          delegate: false,
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
                        start: 31,
                        end: 39,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 39
                          }
                        }
                      }
                    ],
                    start: 29,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
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
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'Identifier',
                              name: 'e',
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
                            delegate: false,
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
                          start: 54,
                          end: 62,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 62
                            }
                          }
                        }
                      ],
                      start: 52,
                      end: 64,
                      loc: {
                        start: {
                          line: 1,
                          column: 52
                        },
                        end: {
                          line: 1,
                          column: 64
                        }
                      }
                    },
                    start: 42,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    }
                  },
                  finalizer: null,
                  start: 25,
                  end: 64,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'Literal',
                      value: 3,
                      start: 71,
                      end: 72,
                      loc: {
                        start: {
                          line: 1,
                          column: 71
                        },
                        end: {
                          line: 1,
                          column: 72
                        }
                      }
                    },
                    delegate: false,
                    start: 65,
                    end: 72,
                    loc: {
                      start: {
                        line: 1,
                        column: 65
                      },
                      end: {
                        line: 1,
                        column: 72
                      }
                    }
                  },
                  start: 65,
                  end: 73,
                  loc: {
                    start: {
                      line: 1,
                      column: 65
                    },
                    end: {
                      line: 1,
                      column: 73
                    }
                  }
                }
              ],
              start: 14,
              end: 75,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 75
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
            end: 75,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 75
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
            line: 1,
            column: 75
          }
        }
      }
    ],
    [
      `function* g8() { for (var x = 0; x < 4; x++) { yield x; } }`,
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
                  type: 'ForStatement',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                          delegate: false,
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
                  init: {
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
                  test: {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 4,
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
                    operator: '<',
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
                  },
                  update: {
                    type: 'UpdateExpression',
                    argument: {
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
                    operator: '++',
                    prefix: false,
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
                  start: 17,
                  end: 57,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 57
                    }
                  }
                }
              ],
              start: 15,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g8',
              start: 10,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 12
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
      `function *a(){yield void 0}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UnaryExpression',
                      operator: 'void',
                      argument: {
                        type: 'Literal',
                        value: 0,
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
                      prefix: true,
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
                    delegate: false,
                    start: 14,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  start: 14,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                }
              ],
              start: 13,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `function *a(){yield ~0}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UnaryExpression',
                      operator: '~',
                      argument: {
                        type: 'Literal',
                        value: 0,
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
                      prefix: true,
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
                    delegate: false,
                    start: 14,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  },
                  start: 14,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 14
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                }
              ],
              start: 13,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            async: false,
            generator: true,
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
      `function *a(){yield ++a;}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'UpdateExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'a',
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
                      operator: '++',
                      prefix: true,
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
                    delegate: false,
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
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            async: false,
            generator: true,
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
      `([x, {y: [yield]}] = z)`,
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
                type: 'ArrayPattern',
                elements: [
                  {
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
                  {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'y',
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
                              name: 'yield',
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
                        kind: 'init',
                        computed: false,
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
                  }
                ],
                start: 1,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 1
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
      'function* a(b, c, d) { throw `_":${((yield* (6002.22)))}¿Z${null}UâÑ?${([])}â.Ò÷${((`m`))}`; }',
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
              {
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'TemplateLiteral',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'Literal',
                          value: 6002.22,
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
                        delegate: true,
                        start: 39,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: null,
                        start: 62,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 62
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        }
                      },
                      {
                        type: 'ArrayExpression',
                        elements: [],
                        start: 74,
                        end: 76,
                        loc: {
                          start: {
                            line: 1,
                            column: 74
                          },
                          end: {
                            line: 1,
                            column: 76
                          }
                        }
                      },
                      {
                        type: 'TemplateLiteral',
                        expressions: [],
                        quasis: [
                          {
                            type: 'TemplateElement',
                            value: {
                              cooked: 'm',
                              raw: 'm'
                            },
                            tail: true,
                            start: 86,
                            end: 89,
                            loc: {
                              start: {
                                line: 1,
                                column: 86
                              },
                              end: {
                                line: 1,
                                column: 89
                              }
                            }
                          }
                        ],
                        start: 86,
                        end: 89,
                        loc: {
                          start: {
                            line: 1,
                            column: 86
                          },
                          end: {
                            line: 1,
                            column: 89
                          }
                        }
                      }
                    ],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '\u0005_":',
                          raw: '\u0005_":'
                        },
                        tail: false,
                        start: 29,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 29
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '¿Z',
                          raw: '¿Z'
                        },
                        tail: false,
                        start: 57,
                        end: 57,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 57
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'UâÑ?',
                          raw: 'UâÑ?'
                        },
                        tail: false,
                        start: 66,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 66
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'â.Ò÷',
                          raw: 'â.Ò÷'
                        },
                        tail: false,
                        start: 77,
                        end: 77,
                        loc: {
                          start: {
                            line: 1,
                            column: 77
                          },
                          end: {
                            line: 1,
                            column: 77
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '',
                          raw: ''
                        },
                        tail: true,
                        start: 91,
                        end: 91,
                        loc: {
                          start: {
                            line: 1,
                            column: 91
                          },
                          end: {
                            line: 1,
                            column: 91
                          }
                        }
                      }
                    ],
                    start: 29,
                    end: 93,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 93
                      }
                    }
                  },
                  start: 23,
                  end: 94,
                  loc: {
                    start: {
                      line: 1,
                      column: 23
                    },
                    end: {
                      line: 1,
                      column: 94
                    }
                  }
                }
              ],
              start: 21,
              end: 96,
              loc: {
                start: {
                  line: 1,
                  column: 21
                },
                end: {
                  line: 1,
                  column: 96
                }
              }
            },
            async: false,
            generator: true,
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
            start: 0,
            end: 96,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 96
              }
            }
          }
        ],
        start: 0,
        end: 96,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 96
          }
        }
      }
    ],
    [
      `([x, {y: [yield]}])`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
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
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y',
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
                        type: 'ArrayExpression',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'yield',
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
                      kind: 'init',
                      computed: false,
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
                }
              ],
              start: 1,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 18
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
      `function *f(){ delete ("x"[(yield)]) }`,
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
                    type: 'UnaryExpression',
                    operator: 'delete',
                    argument: {
                      type: 'MemberExpression',
                      object: {
                        type: 'Literal',
                        value: 'x',
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
                      computed: true,
                      property: {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
                        start: 28,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      },

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
                    prefix: true,
                    start: 15,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 15,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
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
      `function *f() { (yield x ** y) }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
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
                      operator: '**',
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
                    delegate: false,
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
                  },
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
              start: 14,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 32
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
      `function *f({x: x}) { function f({x: yield}) {} }`,
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
              }
            ],
            body: {
              type: 'BlockStatement',
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
                          value: {
                            type: 'Identifier',
                            name: 'yield',
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 34,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        }
                      ],
                      start: 33,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
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
                    name: 'f',
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
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              start: 20,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 20
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
      `({ *g1() {   return {x: yield}  }})`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'g1',
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
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
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
                                kind: 'init',
                                computed: false,
                                method: false,
                                shorthand: false,
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
                          },
                          start: 13,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 13
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        }
                      ],
                      start: 9,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 3,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
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
      `function *f() { 1 ? yield : 1 ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
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
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                    alternate: {
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
      `function *f() { yield 1 ? 2 : 3; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ConditionalExpression',
                      test: {
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
                      consequent: {
                        type: 'Literal',
                        value: 2,
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
                      alternate: {
                        type: 'Literal',
                        value: 3,
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
                    },
                    delegate: false,
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
                }
              ],
              start: 14,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
      `function *f() { (yield 1) ? yield 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 1,
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
                      delegate: false,
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
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2,
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
                      delegate: false,
                      start: 28,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
                      start: 38,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 16,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 16,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
      `function *g() { function f(x = yield) {} }`,
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
                      right: {
                        type: 'Identifier',
                        name: 'yield',
                        start: 31,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        }
                      },
                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [],
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
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                }
              ],
              start: 14,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() { function f(x = x + yield) {} }`,
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
                      right: {
                        type: 'BinaryExpression',
                        left: {
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
                        right: {
                          type: 'Identifier',
                          name: 'yield',
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
                        operator: '+',
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
                      start: 27,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
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
                  end: 44,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 44
                    }
                  }
                }
              ],
              start: 14,
              end: 46,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 46
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `(x = x + yield) => x;`,
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
                    type: 'BinaryExpression',
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
                      name: 'yield',
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
                    operator: '+',
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
                  start: 1,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `(x = {[yield]: 1})`,
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
              operator: '=',
              right: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'yield',
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
              start: 1,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 17
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
      `(function *g(){ async (x = {[yield y]: 1}) })`,
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
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'async',
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
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
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
                          operator: '=',
                          right: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'Property',
                                key: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'Identifier',
                                    name: 'y',
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
                                  delegate: false,
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
                                value: {
                                  type: 'Literal',
                                  value: 1,
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
                                kind: 'init',
                                computed: true,
                                method: false,
                                shorthand: false,
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
                          start: 23,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          }
                        }
                      ],

                      start: 16,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    start: 16,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 42
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
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'g',
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
              start: 1,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 1
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
      `(function *g(){ async (x = [yield y]) })`,
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
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'async',
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
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
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
                          operator: '=',
                          right: {
                            type: 'ArrayExpression',
                            elements: [
                              {
                                type: 'YieldExpression',
                                argument: {
                                  type: 'Identifier',
                                  name: 'y',
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
                                delegate: false,
                                start: 28,
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 28
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                }
                              }
                            ],
                            start: 27,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            }
                          },
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

                      start: 16,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    start: 16,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  }
                ],
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
              async: false,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'g',
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
              start: 1,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 39
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
      `async (x = yield) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
              async: true,
              expression: false,
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
      `async (yield)`,
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
                  name: 'yield',
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
      `async (x = yield)`,
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
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
      `async (x = (yield)) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
              async: true,
              expression: false,
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
      `async (x = z = yield) => {}`,
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  },
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
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
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
                    }
                  }
                }
              ],
              async: true,
              expression: false,
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
      `async (x = z = yield)`,
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
                  },
                  operator: '=',
                  right: {
                    type: 'AssignmentExpression',
                    left: {
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
                    operator: '=',
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
                  start: 7,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 20
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
      `(function *f(){ async (x = yield) })`,
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
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'async',
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
                      arguments: [
                        {
                          type: 'AssignmentExpression',
                          left: {
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
                          operator: '=',
                          right: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                        }
                      ],

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
              async: false,
              generator: true,
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
              start: 1,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 35
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
      `yield`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'yield',
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
      `yield: foo  => {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'yield',
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
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'ArrowFunctionExpression',
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
                params: [
                  {
                    type: 'Identifier',
                    name: 'foo',
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
                async: false,
                expression: false,
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
      `yield  => {}`,
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
                type: 'BlockStatement',
                body: [],
                start: 10,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 10
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
                  name: 'yield',
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
              expression: false,
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
      `yield => yield ? foo : bar`,
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
                type: 'ConditionalExpression',
                test: {
                  type: 'Identifier',
                  name: 'yield',
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
                consequent: {
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
                alternate: {
                  type: 'Identifier',
                  name: 'bar',
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
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
      `await: yield`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
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
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'yield',
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
      `function foo() { function *b() {} }`,
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
      `function foo() { function * gen() { yield * a; return } }`,
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
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'a',
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
                          delegate: true,
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
                        type: 'ReturnStatement',
                        argument: null,
                        start: 47,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 47
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
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'gen',
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
                  start: 17,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 15,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 57
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
      `function* f(){ () => yield; }`,
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
                      name: 'yield',
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
                    params: [],
                    async: false,
                    expression: true,
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
      `function fn(x = yield* yield) {}`,
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
                right: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'yield',
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
                  right: {
                    type: 'Identifier',
                    name: 'yield',
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
                  operator: '*',
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
                start: 12,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 12
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
              name: 'fn',
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
      `function * gen() { (yield * a) + (yield * b);; }`,
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
                    type: 'BinaryExpression',
                    left: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'a',
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
                      delegate: true,
                      start: 20,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'b',
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
                      delegate: true,
                      start: 34,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    operator: '+',
                    start: 19,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  },
                  start: 19,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                },
                {
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
                }
              ],
              start: 17,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 17
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
              name: 'gen',
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
      `function * gen() { yield, yield }`,
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
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
                        type: 'YieldExpression',
                        argument: null,
                        delegate: false,
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'gen',
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
      `function f() { const yield = 10; }`,
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
                        name: 'yield',
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
      `function f() { var o = { yield: 10 } }`,
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
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'yield',
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
                            value: {
                              type: 'Literal',
                              value: 10,
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
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
                      },
                      id: {
                        type: 'Identifier',
                        name: 'o',
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
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    }
                  ],
                  start: 15,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
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
      `function f() { class C { *yield() { } } }`,
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
                    name: 'C',
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
                          name: 'yield',
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
                        value: {
                          type: 'FunctionExpression',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 34,
                            end: 37,
                            loc: {
                              start: {
                                line: 1,
                                column: 34
                              },
                              end: {
                                line: 1,
                                column: 37
                              }
                            }
                          },
                          async: false,
                          generator: true,
                          id: null,
                          start: 31,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 31
                            },
                            end: {
                              line: 1,
                              column: 37
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
                  },
                  start: 15,
                  end: 39,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 39
                    }
                  }
                }
              ],
              start: 13,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
      `yield = foo`,
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
                name: 'yield',
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
              operator: '=',
              right: {
                type: 'Identifier',
                name: 'foo',
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
      `yield: foo`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'yield',
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
            body: {
              type: 'ExpressionStatement',
              expression: {
                type: 'Identifier',
                name: 'foo',
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
      `yield`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'yield',
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
    // [`({ *g1() {   [yield 1]  }})`, Context.OptionsLoc,   {}],
    [
      `function *g() { yield {...(x,y),}}`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'SequenceExpression',
                            expressions: [
                              {
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
                              {
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
                              }
                            ],
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
                    delegate: false,
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
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
              name: 'g',
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
      `function* g() { (function yield() {}) }`,
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
                    type: 'FunctionExpression',
                    params: [],
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
                      name: 'yield',
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
                    start: 17,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  start: 16,
                  end: 37,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 37
                    }
                  }
                }
              ],
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
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g(){ return x + (yield f); }`,
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
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'f',
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
                      delegate: false,
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
                    },
                    operator: '+',
                    start: 22,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  start: 15,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `var gen = function *g() {
      callCount += 1;
      yield {
           ...yield yield,
           ...(function(arg) {
              var yield = arg;
              return {...yield};
           }(yield)),
           ...yield,
        }
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
                            type: 'Identifier',
                            name: 'callCount',
                            start: 32,
                            end: 41,
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
                          operator: '+=',
                          right: {
                            type: 'Literal',
                            value: 1,
                            start: 45,
                            end: 46,
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
                          start: 32,
                          end: 46,
                          loc: {
                            start: {
                              line: 2,
                              column: 6
                            },
                            end: {
                              line: 2,
                              column: 20
                            }
                          }
                        },
                        start: 32,
                        end: 47,
                        loc: {
                          start: {
                            line: 2,
                            column: 6
                          },
                          end: {
                            line: 2,
                            column: 21
                          }
                        }
                      },
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'YieldExpression',
                          argument: {
                            type: 'ObjectExpression',
                            properties: [
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: {
                                    type: 'YieldExpression',
                                    argument: null,
                                    delegate: false,
                                    start: 82,
                                    end: 87,
                                    loc: {
                                      start: {
                                        line: 4,
                                        column: 20
                                      },
                                      end: {
                                        line: 4,
                                        column: 25
                                      }
                                    }
                                  },
                                  delegate: false,
                                  start: 76,
                                  end: 87,
                                  loc: {
                                    start: {
                                      line: 4,
                                      column: 14
                                    },
                                    end: {
                                      line: 4,
                                      column: 25
                                    }
                                  }
                                },
                                start: 73,
                                end: 87,
                                loc: {
                                  start: {
                                    line: 4,
                                    column: 11
                                  },
                                  end: {
                                    line: 4,
                                    column: 25
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'CallExpression',

                                  callee: {
                                    type: 'FunctionExpression',
                                    params: [
                                      {
                                        type: 'Identifier',
                                        name: 'arg',
                                        start: 113,
                                        end: 116,
                                        loc: {
                                          start: {
                                            line: 5,
                                            column: 24
                                          },
                                          end: {
                                            line: 5,
                                            column: 27
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
                                                type: 'Identifier',
                                                name: 'arg',
                                                start: 146,
                                                end: 149,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 26
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 29
                                                  }
                                                }
                                              },
                                              id: {
                                                type: 'Identifier',
                                                name: 'yield',
                                                start: 138,
                                                end: 143,
                                                loc: {
                                                  start: {
                                                    line: 6,
                                                    column: 18
                                                  },
                                                  end: {
                                                    line: 6,
                                                    column: 23
                                                  }
                                                }
                                              },
                                              start: 138,
                                              end: 149,
                                              loc: {
                                                start: {
                                                  line: 6,
                                                  column: 18
                                                },
                                                end: {
                                                  line: 6,
                                                  column: 29
                                                }
                                              }
                                            }
                                          ],
                                          start: 134,
                                          end: 150,
                                          loc: {
                                            start: {
                                              line: 6,
                                              column: 14
                                            },
                                            end: {
                                              line: 6,
                                              column: 30
                                            }
                                          }
                                        },
                                        {
                                          type: 'ReturnStatement',
                                          argument: {
                                            type: 'ObjectExpression',
                                            properties: [
                                              {
                                                type: 'SpreadElement',
                                                argument: {
                                                  type: 'Identifier',
                                                  name: 'yield',
                                                  start: 176,
                                                  end: 181,
                                                  loc: {
                                                    start: {
                                                      line: 7,
                                                      column: 25
                                                    },
                                                    end: {
                                                      line: 7,
                                                      column: 30
                                                    }
                                                  }
                                                },
                                                start: 173,
                                                end: 181,
                                                loc: {
                                                  start: {
                                                    line: 7,
                                                    column: 22
                                                  },
                                                  end: {
                                                    line: 7,
                                                    column: 30
                                                  }
                                                }
                                              }
                                            ],
                                            start: 172,
                                            end: 182,
                                            loc: {
                                              start: {
                                                line: 7,
                                                column: 21
                                              },
                                              end: {
                                                line: 7,
                                                column: 31
                                              }
                                            }
                                          },
                                          start: 165,
                                          end: 183,
                                          loc: {
                                            start: {
                                              line: 7,
                                              column: 14
                                            },
                                            end: {
                                              line: 7,
                                              column: 32
                                            }
                                          }
                                        }
                                      ],
                                      start: 118,
                                      end: 196,
                                      loc: {
                                        start: {
                                          line: 5,
                                          column: 29
                                        },
                                        end: {
                                          line: 8,
                                          column: 12
                                        }
                                      }
                                    },
                                    async: false,
                                    generator: false,
                                    id: null,
                                    start: 104,
                                    end: 196,
                                    loc: {
                                      start: {
                                        line: 5,
                                        column: 15
                                      },
                                      end: {
                                        line: 8,
                                        column: 12
                                      }
                                    }
                                  },
                                  arguments: [
                                    {
                                      type: 'YieldExpression',
                                      argument: null,
                                      delegate: false,
                                      start: 197,
                                      end: 202,
                                      loc: {
                                        start: {
                                          line: 8,
                                          column: 13
                                        },
                                        end: {
                                          line: 8,
                                          column: 18
                                        }
                                      }
                                    }
                                  ],
                                  start: 104,
                                  end: 203,
                                  loc: {
                                    start: {
                                      line: 5,
                                      column: 15
                                    },
                                    end: {
                                      line: 8,
                                      column: 19
                                    }
                                  }
                                },
                                start: 100,
                                end: 204,
                                loc: {
                                  start: {
                                    line: 5,
                                    column: 11
                                  },
                                  end: {
                                    line: 8,
                                    column: 20
                                  }
                                }
                              },
                              {
                                type: 'SpreadElement',
                                argument: {
                                  type: 'YieldExpression',
                                  argument: null,
                                  delegate: false,
                                  start: 220,
                                  end: 225,
                                  loc: {
                                    start: {
                                      line: 9,
                                      column: 14
                                    },
                                    end: {
                                      line: 9,
                                      column: 19
                                    }
                                  }
                                },
                                start: 217,
                                end: 225,
                                loc: {
                                  start: {
                                    line: 9,
                                    column: 11
                                  },
                                  end: {
                                    line: 9,
                                    column: 19
                                  }
                                }
                              }
                            ],
                            start: 60,
                            end: 236,
                            loc: {
                              start: {
                                line: 3,
                                column: 12
                              },
                              end: {
                                line: 10,
                                column: 9
                              }
                            }
                          },
                          delegate: false,
                          start: 54,
                          end: 236,
                          loc: {
                            start: {
                              line: 3,
                              column: 6
                            },
                            end: {
                              line: 10,
                              column: 9
                            }
                          }
                        },
                        start: 54,
                        end: 236,
                        loc: {
                          start: {
                            line: 3,
                            column: 6
                          },
                          end: {
                            line: 10,
                            column: 9
                          }
                        }
                      }
                    ],
                    start: 24,
                    end: 242,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 11,
                        column: 5
                      }
                    }
                  },
                  async: false,
                  generator: true,
                  id: {
                    type: 'Identifier',
                    name: 'g',
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
                  start: 10,
                  end: 242,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 11,
                      column: 5
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'gen',
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
                end: 242,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 11,
                    column: 5
                  }
                }
              }
            ],
            start: 0,
            end: 243,
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
        start: 0,
        end: 243,
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
      `function *f() { (yield 1) ? yield 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 1,
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
                      delegate: false,
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
                    },
                    consequent: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 2,
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
                      delegate: false,
                      start: 28,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
                      start: 38,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 16,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  start: 16,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 46
                    }
                  }
                }
              ],
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
      `function *f() { 1 ? yield : 1 ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
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
                    consequent: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
                    alternate: {
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
      `function *f() { 1 ? 1 : yield ; }`,
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
                    type: 'ConditionalExpression',
                    test: {
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
                    consequent: {
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
                    alternate: {
                      type: 'YieldExpression',
                      argument: null,
                      delegate: false,
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
      `function *g() { [...yield]; }`,
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
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
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
                        start: 17,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
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
                  start: 16,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                }
              ],
              start: 14,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
              name: 'g',
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
      `function *f() { 1 ? 2 : yield 3; }`,
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
                    type: 'ConditionalExpression',
                    test: {
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
                    consequent: {
                      type: 'Literal',
                      value: 2,
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
                    alternate: {
                      type: 'YieldExpression',
                      argument: {
                        type: 'Literal',
                        value: 3,
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
                      delegate: false,
                      start: 24,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 31
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
                }
              ],
              start: 14,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 14
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
      `function *f(){ return { ...(yield) } }`,
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
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'SpreadElement',
                        argument: {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
                          start: 28,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        },
                        start: 24,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 34
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
                  start: 15,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                }
              ],
              start: 13,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 38
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
      `function *g() {x={     ...yield x,    };}`,
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
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
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
                            delegate: false,
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
                          start: 23,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        }
                      ],
                      start: 17,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    start: 15,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
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
              start: 14,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function *g() {x={     ...yield yield,    };}`,
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
                    type: 'AssignmentExpression',
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
                    operator: '=',
                    right: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'SpreadElement',
                          argument: {
                            type: 'YieldExpression',
                            argument: {
                              type: 'YieldExpression',
                              argument: null,
                              delegate: false,
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
                            delegate: false,
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
                        }
                      ],
                      start: 17,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    start: 15,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 43
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
                }
              ],
              start: 14,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `({ *g1() {   (yield)  }})`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'g1',
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
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'YieldExpression',
                            argument: null,
                            delegate: false,
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
                          start: 13,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 13
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        }
                      ],
                      start: 9,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: null,
                    start: 6,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: true,
                  shorthand: false,
                  start: 3,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                }
              ],
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
      `function *g() { yield {...(x),}}`,
      Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'FunctionDeclaration',
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
            },
            id: {
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
              name: 'g'
            },
            generator: true,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 14,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 32
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
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
                  },
                  expression: {
                    type: 'YieldExpression',
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
                    },
                    delegate: false,
                    argument: {
                      type: 'ObjectExpression',
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
                      },
                      properties: [
                        {
                          type: 'SpreadElement',
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
                          },
                          argument: {
                            type: 'Identifier',
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
                            },
                            name: 'x'
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
      `([yield])`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
      `function *g() {yield {     ...yield yield    };}`,
      Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'FunctionDeclaration',
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
            },
            id: {
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
              name: 'g'
            },
            generator: true,
            async: false,
            params: [],
            body: {
              type: 'BlockStatement',
              start: 14,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 48
                }
              },
              body: [
                {
                  type: 'ExpressionStatement',
                  start: 15,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  },
                  expression: {
                    type: 'YieldExpression',
                    start: 15,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    },
                    delegate: false,
                    argument: {
                      type: 'ObjectExpression',
                      start: 21,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      },
                      properties: [
                        {
                          type: 'SpreadElement',
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
                          },
                          argument: {
                            type: 'YieldExpression',
                            start: 30,
                            end: 41,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 41
                              }
                            },
                            delegate: false,
                            argument: {
                              type: 'YieldExpression',
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
                              },
                              delegate: false,
                              argument: null
                            }
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
      `function* g(x) { yield x = 3; }`,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
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
                      operator: '=',
                      right: {
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
                    delegate: false,
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
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function* g(x) { yield x = yield 3; }`,
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
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'YieldExpression',
                    argument: {
                      type: 'AssignmentExpression',
                      left: {
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
                      operator: '=',
                      right: {
                        type: 'YieldExpression',
                        argument: {
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
                        delegate: false,
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
                      },
                      start: 23,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 23
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    delegate: false,
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
                  start: 17,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              start: 15,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function* f(){ call(yield x + y); }`,
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
                      name: 'call',
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
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
                          type: 'BinaryExpression',
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
                          operator: '+',
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
                        delegate: false,
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
                  },
                  start: 15,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                }
              ],
              start: 13,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 35
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
      `function* f(){ call(yield x); }`,
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
                      name: 'call',
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
                    arguments: [
                      {
                        type: 'YieldExpression',
                        argument: {
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
                        delegate: false,
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
      `function* f(){ yield x + y; }`,
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
                    type: 'YieldExpression',
                    argument: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'y',
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
                      operator: '+',
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
                    delegate: false,
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
      `function* f(){ yield x; }`,
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
                    type: 'YieldExpression',
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
                    delegate: false,
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
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 25
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
      `function *g() { function f(x = yield) {}; }`,
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
                      right: {
                        type: 'Identifier',
                        name: 'yield',
                        start: 31,
                        end: 36,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 36
                          }
                        }
                      },
                      start: 27,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    }
                  ],
                  body: {
                    type: 'BlockStatement',
                    body: [],
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
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                },
                {
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
                }
              ],
              start: 14,
              end: 43,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 43
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'g',
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
      `function x() { yield *y }`,
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
                    type: 'BinaryExpression',
                    left: {
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
                    operator: '*',
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
              start: 13,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 13
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
