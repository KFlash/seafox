import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Statements - For Await', () => {
  for (const [source, ctx] of [
    [`async function f() { for await (x of []) function d() {}; }`, Context.Empty],
    [`async function f() { for await (x of []) async function a() {}; }`, Context.Empty],
    [`async function f() { for await (x of []) async function a() {}; return a; }`, Context.Empty],
    [`async function f() { for await ({x} in y); }`, Context.Empty],
    [`async function f() { for await ("foo".x in y)`, Context.Empty],
    [`async function f() { for await for await (a in b) {}; }`, Context.Empty],
    [`async function f() { for await (const {a = 1}, b of []); }`, Context.Empty],
    [`async function f() { for await (const {a = 1} = 1 of []); }`, Context.Empty],
    [`async function f() { for await (const {a}, b of []); }`, Context.Empty],
    [`async function f() { for await (let {a: a = 1}, b of []); }`, Context.Empty],
    [`async function f() { for await (let {a: a} = 1 of []); }`, Context.Empty],
    [`async function f() { for await (var {[Symbol.iterator]: a = 1}, b of []); }`, Context.Empty],
    [`async function * f() { let a; for await (var {a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait (var a of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var {a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var a of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var a of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (var {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {0: a} of [])  { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var {0: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {0: a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {0: a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n(var {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n(var {0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {0: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {a} of [])  { } }`, Context.Empty],
    [`async function f() { for await (var [a = 1, ...b], c of []); }`, Context.Empty],
    [`async function f() { for await (var [a = 1], b of []); }`, Context.Empty],
    [`async function f() { for await (([a = 1 = 1, ...b] = 1) of []); }`, Context.Empty],
    [`async function f() { for await (({a} = 1) of []); }`, Context.Empty],
    [`async function f() { for await (({a: a} = 1) of []); }`, Context.Empty],
    [`async function f() { for await ({'a': a} = 1 of []); }`, Context.Empty],
    [`async function f() { for await (([a] = 1) of []); }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var {a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var {a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var {a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (var {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {a: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {'a': a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {'a': a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var {'a': a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var {'a': a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {'a': a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (var {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {0: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var a of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var a of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var a of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var a of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var a of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var [a] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var [a] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var [a] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var [a] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {[Symbol.iterator]: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var {0: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var {0: a} of []) { } }`, Context.Empty],
    [`async function f() { for await ([a = 1] = 1 of []); }`, Context.Empty],
    [`async function f() { for await (([a = 1] = 1) of []); }`, Context.Empty],
    [`async function f() { for await ([a = 1 = 1, ...b] = 1 of []); }`, Context.Empty],
    [`async function f() { for await (a = 1) of []); }`, Context.Empty],
    [`async function f() { for await ([a] = 1 of []); }`, Context.Empty],
    [`async function f() { for await (let a, b of []); }`, Context.Empty],
    [`async function f() { for await (let [a] = 1 of []); }`, Context.Empty],
    [`async function f() { for await (let {"a": a} = 1 of []); }`, Context.Empty],
    [`async function f() { for await (let {'a': a}, b of []); }`, Context.Empty],
    [`async function f() { for await (const {[Symbol.iterator]: a} = 1 of []); }`, Context.Empty],
    [`async function f() { for await ([x] in y); }`, Context.Empty],
    [`async function f() { for await (x;y;z); }`, Context.Empty],
    [`async function f() { for await (;;); }`, Context.Empty],
    [`async function f() { for await (const {a = 1}, b of []); }`, Context.Empty],
    [`async function f() { for await for await (;;) {}; }`, Context.Empty],
    [`async function f() { for await for await (a in b) {}; }`, Context.Empty],
    [`async function f() { for await (a = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (a = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ([a] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (([a] = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await ([a = 1] = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (([a = 1] = 1) of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ([a = 1 = 1, ...b] = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ([a = 1 = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await ([a = 1 = 1, ...b] = 1 of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (var {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {a: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {a: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {a: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ([a = 1 = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ([a = 1 = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ([a = 1 = 1, ...b] = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ([a = 1 = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ([a = 1 = 1, ...b] = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ([a = 1 = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (([a = 1 = 1, ...b] = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (([a = 1 = 1, ...b] = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (([a = 1 = 1, ...b] = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (([a = 1 = 1, ...b] = 1) of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (([a = 1 = 1, ...b] = 1) of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (var {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({a} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ({a} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await ({a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (({a} = 1) of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({a} = 1) of [])  { } }`, Context.Empty],
    [`async function f() { for await (({a} = 1) of []) ; }`, Context.Empty],
    [`async function f() { for await ({a: a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a: a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({a: a} = 1) of [])  { } }`, Context.Empty],
    [`async function f() { for await (({a: a} = 1) of []) ; }`, Context.Empty],
    [`async function f() { for await (({a: a} = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (({a: a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (({a: a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await ({'a': a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({'a': a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({'a': a} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ({'a': a} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (({'a': a} = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (({'a': a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (({'a': a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({"a": a} = 1) of [] ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({"a": a} = 1) of []  { } }`, Context.Empty],
    [`async function f() { for await (({"a": a} = 1) of [] ; }`, Context.Empty],
    [`async function f() { for await ({[Symbol.iterator]: a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({[Symbol.iterator]: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({[Symbol.iterator]: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({[Symbol.iterator]: a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({[Symbol.iterator]: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({[Symbol.iterator]: a} = 1) of [])  { } }`, Context.Empty],
    [`async function f() { for await (({[Symbol.iterator]: a} = 1) of []) ; }`, Context.Empty],
    [`async function f() { for await (({[Symbol.iterator]: a} = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (({[Symbol.iterator]: a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (({[Symbol.iterator]: a} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await ({0: a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({0: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({0: a} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ({a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await ({a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await ({'a': a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({'a': a = 1} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ({'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (({"a": a = 1} = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({[Symbol.iterator]: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (({[Symbol.iterator]: a = 1} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (({[Symbol.iterator]: a = 1} = 1) of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (({[Symbol.iterator]: a = 1} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({0: a = 1} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await ({0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (({0: a = 1} = 1) of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (({0: a = 1} = 1) of []) ; }`, Context.Empty],
    [`async function * f() { for await (function a() {} of []) ; }`, Context.Empty],
    [`async function * f() { for await (function a() {} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ([1] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ([1] of [])  { } }`, Context.Empty],
    [`async function f() { for await ([1] of []) ; }`, Context.Empty],
    [`async function f() { for await ([1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await ({a: 1} of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a: 1} of []) ; }`, Context.Empty],
    [`async function * f() { for await ({a: 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({a: 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await ({a: 1} of [])  { } }`, Context.Empty],
    [`async function f() { for await ({a: 1} of []) ; }`, Context.Empty],
    [`async function f() { for await (var [a] = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var [a] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a] = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1] = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (var [a = 1] = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (var [a = 1], b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var [a = 1], b of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a = 1], b of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a = 1 = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1 = 1, ...b] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1 = 1, ...b] of [])  { } }`, Context.Empty],
    [`async function f() { for await (var [a = 1 = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { for await (var [a = 1 = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var [a = 1 = 1, ...b] of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a = 1, ...b], c of []) ; }`, Context.Empty],
    [`async function * f() { for await (var [a = 1, ...b], c of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1, ...b], c of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var [a = 1, ...b], c of [])  { } }`, Context.Empty],
    [`async function f() { for await (var [a = 1, ...b], c of []) ; }`, Context.Empty],
    [`async function f() { for await (var {a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {a}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {a}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {a}, b of []) ; }`, Context.Empty],
    [`async function f() { for await (var {'a': a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {'a': a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {'a': a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {'a': a}, b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {'a': a}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {'a': a}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {[Symbol.iterator]: a} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (var {[Symbol.iterator]: a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {0: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {0: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {0: a} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {0: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {0: a}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {0: a}, b of []) ; }`, Context.Empty],
    [`async function f() { for await (var {0: a}, b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {0: a}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {a: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {a: a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {a: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {a: a = 1}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {a: a = 1}, b of []) ; }`, Context.Empty],
    [`async function f() { for await (var {a: a = 1}, b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {'a': a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {'a': a = 1}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {'a': a = 1}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {'a': a = 1}, b of []) ; }`, Context.Empty],
    [`async function f() { for await (var {'a': a = 1}, b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {[Symbol.iterator]: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {[Symbol.iterator]: a = 1} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (var {[Symbol.iterator]: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (var {[Symbol.iterator]: a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (var {0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (var {0: a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (var {0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let a = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (let a = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (let a = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (let [a = 1, ...b], c of []) ; }`, Context.Empty],
    [`async function * f() { for await (let [a = 1, ...b], c of []) ; }`, Context.Empty],
    [`async function * f() { for await (let [a = 1, ...b], c of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let {a}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let {a}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (let {a: a} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (let {a: a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (let {a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (let {0: a}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (let {0: a}, b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let {0: a}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let {'a': a = 1} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (let {'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (let {'a': a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (let {'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (let {'a': a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (let {[Symbol.iterator]: a = 1} = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let {[Symbol.iterator]: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (const a = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (const a = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (const {0: a = 1}, b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (const {0: a = 1}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (const {0: a = 1}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (const {0: a = 1}, b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (const {0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (const {0: a = 1} = 1 of [])  { } }`, Context.Empty],
    [`async function f() { for await (const {0: a = 1} = 1 of []) ; }`, Context.Empty],
    [`async function f() { for await (const {a: a = 1}, b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (const {a: a = 1}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (const {a: a = 1}, b of []) ; }`, Context.Empty],
    [`async function * f() { for await (const {0: a}, b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (const {0: a}, b of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (const {a}, b of [])  { } }`, Context.Empty],
    [`async function f() { for await (const {a}, b of []) ; }`, Context.Empty],
    [`async function f() { for await (const {a: a} = 1 of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; for await (const {a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (const {a: a} = 1 of []) ; }`, Context.Empty],
    [`async function * f() { for await (let [a = 1, ...b] = 1 of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let [a = 1, ...b] = 1 of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; for await (let [a = 1, ...b] = 1 of [])  { } }`, Context.Empty]
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

  for (const [source, ctx] of [
    [`async function f() { let a; for await (a of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (a of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (a of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (a of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (a of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (a of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (a of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(a of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(a of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(a of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (a of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (a of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (a.b of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (a.b of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (a.b of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (a.b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (a.b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (a.b of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(a.b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(a.b of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(a.b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n([a] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ([a] of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ([a] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ([a] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ([a] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ([a] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ([a = 1] of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ([a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n([a = 1] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n([a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ([a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ([a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ([a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ([a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({a: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({a: a} of []) ; }`, Context.OptionsDisableWebCompat],
    [`async function * f() { 'use strict'; let a; for await ({a: a} of [])  { } }`, Context.OptionsDisableWebCompat],
    [`async function f() { let a; for\nawait ({a: a} of []) ; }`, Context.OptionsDisableWebCompat],
    [`async function * f() { let a; for\nawait ({a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({'a': a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({'a': a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({'a': a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({'a': a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({'a': a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({'a': a} of []) ; }`, Context.OptionsDisableWebCompat],
    [`async function * f() { let a; for\nawait ({'a': a} of []) { } }`, Context.OptionsDisableWebCompat],
    [`async function f() { let a; for\nawait ({'a': a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({'a': a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({'a': a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({'a': a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({'a': a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({'a': a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({'a': a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({'a': a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({'a': a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({"a": a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({"a": a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({"a": a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({"a": a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({"a": a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({"a": a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({"a": a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({"a": a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({0: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({0: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({[Symbol.iterator]: a} of []) { } }`, Context.OptionsDisableWebCompat],
    [
      `async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) ; }`,
      Context.OptionsDisableWebCompat
    ],
    [
      `async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) { } }`,
      Context.OptionsDisableWebCompat
    ],
    [
      `async function * f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) { } }`,
      Context.OptionsDisableWebCompat
    ],
    [`async function f() { let a; for await ({[Symbol.iterator]: a} of []) ; }`, Context.OptionsDisableWebCompat],
    [`async function f() { let a; for await ({0: a} of []) { } }`, Context.OptionsDisableWebCompat],
    [`async function * f() { let a; for await ({0: a} of []) { } }`, Context.OptionsDisableWebCompat],
    [`async function f() { 'use strict'; let a; for await ({0: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({0: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({0: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({0: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({a: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({'a': a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({'a': a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({'a': a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({'a': a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await ({'a': a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({'a': a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await ({'a': a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({[Symbol.iterator]: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (var [a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var [a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var [a = 1] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var [a = 1] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var [a = 1] of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var [a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var [a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (var [a = 1, ...b] of []) { } }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for\nawait (var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for\nawait (var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for await (var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (var {0: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (var {0: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {0: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (var {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (var {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(var {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let [a] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let [a] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(let [a] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (let [a] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let [a] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (let [a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (let [a = 1, ...b] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (let [a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (let [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (let [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (let [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(let [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (let {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let {[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (let {[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (let {0: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (let {0: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (let {0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (let {0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (let {0: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(let {0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {0: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(let {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (let {a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (let {a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (let {a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (let {a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (let {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {a: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (let {a: a = 1} of []) ; }`, Context.Empty],
    [
      `async function * f() { 'use strict'; let a; for await (let {[Symbol.iterator]: a = 1} of [])  { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for\nawait (let {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (let {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for\nawait (let {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for\nawait (let {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for await\n(let {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for await\n(let {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for await (let {0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (let {0: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (let {0: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (let {0: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (let {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (let {0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (const a of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(const a of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const a of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const a of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(const [a] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (const [a] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (const [a] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const [a] of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (const [a] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (const [a = 1] of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (const [a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (const [a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (const [a = 1] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(const [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const [a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(const [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (const [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (const [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (const {a: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (const {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (const {a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (const {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (const {a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(const {a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const {a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(const {a: a} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (const {a: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (const {a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (const {a: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (const {a: a} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (const {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (const {a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for\nawait (const {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(const {a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const {a: a = 1} of []) ; }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for await\n(const {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for await\n(const {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for await (const {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (const {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [
      `async function * f() { 'use strict'; let a; for await (const {[Symbol.iterator]: a = 1} of [])  { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for\nawait (const {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function * f() { let a; for\nawait (const {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for\nawait (const {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function * f() { 'use strict'; let a; for\nawait (const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await\n(const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (const {0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { let a; for await (a.b of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (a.b of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (a.b of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (a.b of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait (a.b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (a.b of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n(a.b of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n(a.b of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(a.b of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n([a] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n([a] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ([a] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ([a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ([a = 1] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ([a = 1] of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ([a = 1] of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n([a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n([a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n([a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n([a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n([a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({[Symbol.iterator]: a} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({[Symbol.iterator]: a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ({[Symbol.iterator]: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({0: a} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n({0: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n({0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({0: a} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({0: a} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({0: a} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({0: a} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n({a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n({a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({a: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({a: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ({a: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({a: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({[Symbol.iterator]: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait ({0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait ({0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait ({0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n({0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n({0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n({0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n({0: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await ({0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await ({0: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await ({0: a = 1} of [])  { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var [a = 1, ...b] of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n(var [a = 1, ...b] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n(var [a = 1, ...b] of []) { } }`, Context.Empty],
    [
      `async function f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [
      `async function * f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`,
      Context.Empty
    ],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [
      `async function * f() { 'use strict'; let a; for await (var {[Symbol.iterator]: a = 1} of [])  { } }`,
      Context.Empty
    ],
    [`async function f() { let a; for\nawait (var {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait (var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (var {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await\n(var {[Symbol.iterator]: a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(var {[Symbol.iterator]: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await\n(let [a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await\n(let [a = 1] of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for await (const {0: a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await (let [a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { let a; for await (let [a = 1] of []) { } }`, Context.Empty],
    [`async function * f() { 'use strict'; let a; for await (let [a = 1] of [])  { } }`, Context.Empty],
    [`async function f() { let a; for\nawait (let {a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for\nawait (let {a = 1} of []) { } }`, Context.Empty],
    [`async function f() { 'use strict'; let a; for\nawait (let {a = 1} of []) ; }`, Context.Empty],
    [`async function f() { let a; for await\n(let {a = 1} of []) { } }`, Context.Empty]
  ]) {
    it(source as string, () => {
      t.doesNotThrow(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `async function f() { let y; for await  (let {a = 1} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
                    start: 58,
                    end: 59,
                    loc: {
                      start: {
                        line: 1,
                        column: 58
                      },
                      end: {
                        line: 1,
                        column: 59
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
                              value: {
                                type: 'AssignmentPattern',
                                left: {
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
                                right: {
                                  type: 'Literal',
                                  value: 1,
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true,
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
                            }
                          ],
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
                      }
                    ],
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                  await: false,
                  start: 28,
                  end: 59,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 59
                    }
                  }
                }
              ],
              start: 19,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 61
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
          }
        ],
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
      }
    ],
    [
      `async function f() { let y; for await  (let {[Symbol.iterator]: a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                                type: 'MemberExpression',
                                object: {
                                  type: 'Identifier',
                                  name: 'Symbol',
                                  start: 46,
                                  end: 52,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 46
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
                                  name: 'iterator',
                                  start: 53,
                                  end: 61,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 53
                                    },
                                    end: {
                                      line: 1,
                                      column: 61
                                    }
                                  }
                                },

                                start: 46,
                                end: 61,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 46
                                  },
                                  end: {
                                    line: 1,
                                    column: 61
                                  }
                                }
                              },
                              value: {
                                type: 'Identifier',
                                name: 'a',
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
                              kind: 'init',
                              computed: true,
                              method: false,
                              shorthand: false,
                              start: 45,
                              end: 65,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 65
                                }
                              }
                            }
                          ],
                          start: 44,
                          end: 66,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 66
                            }
                          }
                        },
                        start: 44,
                        end: 66,
                        loc: {
                          start: {
                            line: 1,
                            column: 44
                          },
                          end: {
                            line: 1,
                            column: 66
                          }
                        }
                      }
                    ],
                    start: 40,
                    end: 66,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 66
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 70,
                    end: 72,
                    loc: {
                      start: {
                        line: 1,
                        column: 70
                      },
                      end: {
                        line: 1,
                        column: 72
                      }
                    }
                  },
                  await: false,
                  start: 28,
                  end: 74,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 74
                    }
                  }
                }
              ],
              start: 19,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 76
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
          }
        ],
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
      }
    ],
    [
      `async function f() { let y; for await  (let {0: a = 1} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                                type: 'Literal',
                                value: 0,
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
                              value: {
                                type: 'AssignmentPattern',
                                left: {
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
                                },
                                right: {
                                  type: 'Literal',
                                  value: 1,
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false,
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
                          start: 44,
                          end: 54,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 54
                            }
                          }
                        },
                        start: 44,
                        end: 54,
                        loc: {
                          start: {
                            line: 1,
                            column: 44
                          },
                          end: {
                            line: 1,
                            column: 54
                          }
                        }
                      }
                    ],
                    start: 40,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 58,
                    end: 60,
                    loc: {
                      start: {
                        line: 1,
                        column: 58
                      },
                      end: {
                        line: 1,
                        column: 60
                      }
                    }
                  },
                  await: false,
                  start: 28,
                  end: 62,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 62
                    }
                  }
                }
              ],
              start: 19,
              end: 64,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 64
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
      `async function f() { let y; for await  (let {"a": a = 1} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
                    start: 63,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 63
                      },
                      end: {
                        line: 1,
                        column: 64
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
                                type: 'Literal',
                                value: 'a',
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
                              value: {
                                type: 'AssignmentPattern',
                                left: {
                                  type: 'Identifier',
                                  name: 'a',
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false,
                              start: 45,
                              end: 55,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 55
                                }
                              }
                            }
                          ],
                          start: 44,
                          end: 56,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 56
                            }
                          }
                        },
                        start: 44,
                        end: 56,
                        loc: {
                          start: {
                            line: 1,
                            column: 44
                          },
                          end: {
                            line: 1,
                            column: 56
                          }
                        }
                      }
                    ],
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
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                  await: false,
                  start: 28,
                  end: 64,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 64
                    }
                  }
                }
              ],
              start: 19,
              end: 66,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 66
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
      `async function f() { let y; for await ({a: a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
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
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
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
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                  await: true,
                  start: 28,
                  end: 53,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 53
                    }
                  }
                }
              ],
              start: 19,
              end: 55,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 55
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
      `async function f() { let y; for await ([a = 1] of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'a',
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
                          type: 'Literal',
                          value: 1,
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
                      }
                    ],
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
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 50,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  await: true,
                  start: 28,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
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
      `async function f() { let y; for await  ([a = 1, ...b] of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        },
                        right: {
                          type: 'Literal',
                          value: 1,
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
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'b',
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
                      }
                    ],
                    start: 40,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 57,
                    end: 59,
                    loc: {
                      start: {
                        line: 1,
                        column: 57
                      },
                      end: {
                        line: 1,
                        column: 59
                      }
                    }
                  },
                  await: true,
                  start: 28,
                  end: 61,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 61
                    }
                  }
                }
              ],
              start: 19,
              end: 63,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 63
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
      `async function f() { let y; for await  ({a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        },
                        value: {
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
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                  await: true,
                  start: 28,
                  end: 51,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 51
                    }
                  }
                }
              ],
              start: 19,
              end: 53,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 53
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
      `async function f() { let y; for await  ({a: a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        },
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 41,
                        end: 45,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 45
                          }
                        }
                      }
                    ],
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 50,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  await: true,
                  start: 28,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
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
      `async function f() { let y; for await  ({[Symbol.iterator]: a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'MemberExpression',
                          object: {
                            type: 'Identifier',
                            name: 'Symbol',
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
                          computed: false,
                          property: {
                            type: 'Identifier',
                            name: 'iterator',
                            start: 49,
                            end: 57,
                            loc: {
                              start: {
                                line: 1,
                                column: 49
                              },
                              end: {
                                line: 1,
                                column: 57
                              }
                            }
                          },

                          start: 42,
                          end: 57,
                          loc: {
                            start: {
                              line: 1,
                              column: 42
                            },
                            end: {
                              line: 1,
                              column: 57
                            }
                          }
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a',
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
                        kind: 'init',
                        computed: true,
                        method: false,
                        shorthand: false,
                        start: 41,
                        end: 61,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 61
                          }
                        }
                      }
                    ],
                    start: 40,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                    }
                  },
                  await: true,
                  start: 28,
                  end: 70,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 70
                    }
                  }
                }
              ],
              start: 19,
              end: 72,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 72
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
      `async function f() { let y; for await  ({0: a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Literal',
                          value: 0,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 41,
                        end: 45,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 45
                          }
                        }
                      }
                    ],
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 50,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  await: true,
                  start: 28,
                  end: 54,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
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
      `async function f() { let y; for await  ({a = 1} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        },
                        value: {
                          type: 'AssignmentPattern',
                          left: {
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
                          },
                          right: {
                            type: 'Literal',
                            value: 1,
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
                    start: 40,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 51,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 51
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  await: true,
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
                }
              ],
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
      `async function f() { let y; for await  ({0: a = 1} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Literal',
                          value: 0,
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
                          type: 'AssignmentPattern',
                          left: {
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
                          right: {
                            type: 'Literal',
                            value: 1,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 41,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 49
                          }
                        }
                      }
                    ],
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 54,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 54
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    }
                  },
                  await: true,
                  start: 28,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
              start: 19,
              end: 60,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 60
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
      `async function f() { let y; for await  (var [a] of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                            }
                          ],
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
                      }
                    ],
                    start: 40,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 51,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 51
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  await: false,
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
                }
              ],
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
      `async function f() { let y; for await  (var {a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
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
                              computed: false,
                              method: false,
                              shorthand: true,
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
                      }
                    ],
                    start: 40,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
                    start: 51,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 51
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  await: false,
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
                }
              ],
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
      `async function f() { let y; for await  (var {'a': a} of []); }`,
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
                      init: null,
                      id: {
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
                {
                  type: 'ForOfStatement',
                  body: {
                    type: 'EmptyStatement',
                    start: 59,
                    end: 60,
                    loc: {
                      start: {
                        line: 1,
                        column: 59
                      },
                      end: {
                        line: 1,
                        column: 60
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
                                type: 'Literal',
                                value: 'a',
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
                              value: {
                                type: 'Identifier',
                                name: 'a',
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false,
                              start: 45,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              }
                            }
                          ],
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
                    start: 40,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 40
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [],
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
                  await: false,
                  start: 28,
                  end: 60,
                  loc: {
                    start: {
                      line: 1,
                      column: 28
                    },
                    end: {
                      line: 1,
                      column: 60
                    }
                  }
                }
              ],
              start: 19,
              end: 62,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 62
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
      `async function fn() { for await (456..x of c) d; }`,
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
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'd',
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
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: 456,
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
                    computed: false,
                    property: {
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

                    start: 33,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c',
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
                  await: true,
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
                }
              ],
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
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await (456[x] of c) d; }`,
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
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'd',
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
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: 456,
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
                    computed: true,
                    property: {
                      type: 'Identifier',
                      name: 'x',
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

                    start: 33,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'c',
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
                  await: true,
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
                }
              ],
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
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for ([].x in y); }`,
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
                    computed: false,
                    property: {
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
                  right: {
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
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await ((x) of y) {} }`,
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
                    type: 'Identifier',
                    name: 'y',
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
                  await: true,
                  start: 22,
                  end: 45,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 45
                    }
                  }
                }
              ],
              start: 20,
              end: 47,
              loc: {
                start: {
                  line: 1,
                  column: 20
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
              name: 'fn',
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
      `async function fn() { for await ("foo".x of y) {} }`,
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
                  left: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Literal',
                      value: 'foo',
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
                    computed: false,
                    property: {
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
                  },
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
                  await: true,
                  start: 22,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                }
              ],
              start: 20,
              end: 51,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 51
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await (const {} of [undefined]) {} }`,
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
                    body: [],
                    start: 58,
                    end: 60,
                    loc: {
                      start: {
                        line: 1,
                        column: 58
                      },
                      end: {
                        line: 1,
                        column: 60
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
                          properties: [],
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
                          }
                        },
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'undefined',
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
                      }
                    ],
                    start: 45,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    }
                  },
                  await: false,
                  start: 22,
                  end: 60,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 60
                    }
                  }
                }
              ],
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
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await (const [cls = class {}, xCls = class X {}, xCls2 = class { static name() {} }] of [[]]) {} }`,
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
                    body: [],
                    start: 120,
                    end: 122,
                    loc: {
                      start: {
                        line: 1,
                        column: 120
                      },
                      end: {
                        line: 1,
                        column: 122
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
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'cls',
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
                              right: {
                                type: 'ClassExpression',
                                id: null,
                                superClass: null,
                                body: {
                                  type: 'ClassBody',
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
                              start: 40,
                              end: 54,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 40
                                },
                                end: {
                                  line: 1,
                                  column: 54
                                }
                              }
                            },
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'xCls',
                                start: 56,
                                end: 60,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 56
                                  },
                                  end: {
                                    line: 1,
                                    column: 60
                                  }
                                }
                              },
                              right: {
                                type: 'ClassExpression',
                                id: {
                                  type: 'Identifier',
                                  name: 'X',
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
                                superClass: null,
                                body: {
                                  type: 'ClassBody',
                                  body: [],
                                  start: 71,
                                  end: 73,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 71
                                    },
                                    end: {
                                      line: 1,
                                      column: 73
                                    }
                                  }
                                },
                                start: 63,
                                end: 73,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 63
                                  },
                                  end: {
                                    line: 1,
                                    column: 73
                                  }
                                }
                              },
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
                            {
                              type: 'AssignmentPattern',
                              left: {
                                type: 'Identifier',
                                name: 'xCls2',
                                start: 75,
                                end: 80,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 75
                                  },
                                  end: {
                                    line: 1,
                                    column: 80
                                  }
                                }
                              },
                              right: {
                                type: 'ClassExpression',
                                id: null,
                                superClass: null,
                                body: {
                                  type: 'ClassBody',
                                  body: [
                                    {
                                      type: 'MethodDefinition',
                                      kind: 'method',
                                      static: true,
                                      computed: false,
                                      key: {
                                        type: 'Identifier',
                                        name: 'name',
                                        start: 98,
                                        end: 102,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 98
                                          },
                                          end: {
                                            line: 1,
                                            column: 102
                                          }
                                        }
                                      },
                                      value: {
                                        type: 'FunctionExpression',
                                        params: [],
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
                                        async: false,
                                        generator: false,
                                        id: null,
                                        start: 102,
                                        end: 107,
                                        loc: {
                                          start: {
                                            line: 1,
                                            column: 102
                                          },
                                          end: {
                                            line: 1,
                                            column: 107
                                          }
                                        }
                                      },
                                      start: 91,
                                      end: 107,
                                      loc: {
                                        start: {
                                          line: 1,
                                          column: 91
                                        },
                                        end: {
                                          line: 1,
                                          column: 107
                                        }
                                      }
                                    }
                                  ],
                                  start: 89,
                                  end: 109,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 89
                                    },
                                    end: {
                                      line: 1,
                                      column: 109
                                    }
                                  }
                                },
                                start: 83,
                                end: 109,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 83
                                  },
                                  end: {
                                    line: 1,
                                    column: 109
                                  }
                                }
                              },
                              start: 75,
                              end: 109,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 75
                                },
                                end: {
                                  line: 1,
                                  column: 109
                                }
                              }
                            }
                          ],
                          start: 39,
                          end: 110,
                          loc: {
                            start: {
                              line: 1,
                              column: 39
                            },
                            end: {
                              line: 1,
                              column: 110
                            }
                          }
                        },
                        start: 39,
                        end: 110,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 110
                          }
                        }
                      }
                    ],
                    start: 33,
                    end: 110,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 110
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'ArrayExpression',
                        elements: [],
                        start: 115,
                        end: 117,
                        loc: {
                          start: {
                            line: 1,
                            column: 115
                          },
                          end: {
                            line: 1,
                            column: 117
                          }
                        }
                      }
                    ],
                    start: 114,
                    end: 118,
                    loc: {
                      start: {
                        line: 1,
                        column: 114
                      },
                      end: {
                        line: 1,
                        column: 118
                      }
                    }
                  },
                  await: false,
                  start: 22,
                  end: 122,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 122
                    }
                  }
                }
              ],
              start: 20,
              end: 124,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 124
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
            end: 124,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 124
              }
            }
          }
        ],
        start: 0,
        end: 124,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 124
          }
        }
      }
    ],
    [
      `async function fn() { for await (var [x] of [[]]) {} }`,
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
                    body: [],
                    start: 50,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 50
                      },
                      end: {
                        line: 1,
                        column: 52
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
                            }
                          ],
                          start: 37,
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 37
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          }
                        },
                        start: 37,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 37
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      }
                    ],
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
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'ArrayExpression',
                        elements: [],
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
                      }
                    ],
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
                  },
                  await: false,
                  start: 22,
                  end: 52,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 52
                    }
                  }
                }
              ],
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
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await (let [x = 23] of [[]]) {} }`,
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
                              right: {
                                type: 'Literal',
                                value: 23,
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
                              start: 38,
                              end: 44,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 38
                                },
                                end: {
                                  line: 1,
                                  column: 44
                                }
                              }
                            }
                          ],
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
                    start: 33,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'ArrayExpression',
                        elements: [],
                        start: 50,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      }
                    ],
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
                  await: false,
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
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
      `async function fn() { for await ({ x: x[yield] } of [{ x: 23 }]) {} }`,
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
                    body: [],
                    start: 65,
                    end: 67,
                    loc: {
                      start: {
                        line: 1,
                        column: 65
                      },
                      end: {
                        line: 1,
                        column: 67
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
                          type: 'MemberExpression',
                          object: {
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
                          computed: true,
                          property: {
                            type: 'Identifier',
                            name: 'yield',
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

                          start: 38,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 38
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
                        shorthand: false,
                        start: 35,
                        end: 46,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 46
                          }
                        }
                      }
                    ],
                    start: 33,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
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
                              name: 'x',
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
                            },
                            value: {
                              type: 'Literal',
                              value: 23,
                              start: 58,
                              end: 60,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 58
                                },
                                end: {
                                  line: 1,
                                  column: 60
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 55,
                            end: 60,
                            loc: {
                              start: {
                                line: 1,
                                column: 55
                              },
                              end: {
                                line: 1,
                                column: 60
                              }
                            }
                          }
                        ],
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
                      }
                    ],
                    start: 52,
                    end: 63,
                    loc: {
                      start: {
                        line: 1,
                        column: 52
                      },
                      end: {
                        line: 1,
                        column: 63
                      }
                    }
                  },
                  await: true,
                  start: 22,
                  end: 67,
                  loc: {
                    start: {
                      line: 1,
                      column: 22
                    },
                    end: {
                      line: 1,
                      column: 67
                    }
                  }
                }
              ],
              start: 20,
              end: 69,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 69
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'fn',
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
            end: 69,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 69
              }
            }
          }
        ],
        start: 0,
        end: 69,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 69
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
