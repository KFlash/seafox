import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseModule } from '../../../src/seafox';

describe('Module - Export', () => {
  for (const [source, ctx] of [
    ['export foo;', Context.Empty],
    ['export {y as z, y as x, y};', Context.Empty],
    ['export {y as x};', Context.Empty],
    ['export default var x = 7;', Context.Empty],
    ['export default let x = 7;', Context.Empty],
    ['export default const x = 7;', Context.Empty],
    ['var a, b; export { a as b, b };', Context.Empty],
    ['var a, b; export { a as c, b as c };', Context.Empty],
    ['export default function f(){}; export default class C {};', Context.Empty],
    ['export async function a() {} export async function a() {}', Context.Empty],
    ['export class a {} export async function a() {}', Context.Empty],
    ['export function a() {} export async function a() {}', Context.Empty],
    ['let a = b; export async function a() {} ', Context.Empty],
    ['export default async function a() {} export async function a() {}', Context.Empty],
    ['export class a {} export default async function a() {}', Context.Empty],
    ['export default class a {} export default async function () {}', Context.Empty],
    ['export function a() {} export default async function a() {}', Context.Empty],
    ['let a = b; export default async function a() {} ', Context.Empty],
    ['export async function a() {} let a = b;', Context.Empty],
    ['export default function f(){}; var a; export { a as default };', Context.Empty],
    ['export function*() {}', Context.Empty],
    ['export class extends C {}', Context.Empty],
    ['export {x};', Context.Empty],
    ['export * as foo from', Context.Empty],
    [
      `export default class C {};
     export default class C {};`,
      Context.Empty
    ],
    ['export { a, b as c, c, b };', Context.Empty],
    ['export class f {} export {f};', Context.Empty],
    ['export let x = y, [x] = y;', Context.Empty],
    ['export function a() {} export default function a() {}', Context.Empty],
    ['export class f{}; async function f(){};', Context.Empty],
    ['export default function(){}; export default function(){};', Context.Empty],
    ['export var let = x;', Context.Empty],
    ['export {a as b};', Context.Empty],
    ['export async function f(){}; export {z};', Context.Empty],
    ['switch (x) { export {x}; }', Context.Empty],
    ['export let foo = x foo', Context.Empty],
    ['export var foo = x foo', Context.Empty],
    ['export {x}; export class y {};', Context.Empty],
    ['export default x; export {y as default};', Context.Empty],
    ['export bar, * as foo from "bar";', Context.Empty],
    ['export {bar}, * as foo from "bar";', Context.Empty],
    ['export {bar}, * from "bar";', Context.Empty],
    ['export * as foo, {bar} from "bar";', Context.Empty],
    ['var a,b; export {c, d}; export {e};', Context.Empty],
    ['export ...x = y', Context.Empty],
    ['export default ...x = y', Context.Empty],
    ['export let ...x = y', Context.Empty],
    ['{export {x};}', Context.Empty],
    ['x = { foo(){ export {x}; }}', Context.Empty],
    ['function f(){ return export {x}; }', Context.Empty],
    ['with (x) export {x};', Context.Empty],
    ['export *;', Context.Empty],
    ['export 12;', Context.Empty],
    ['export function() {}', Context.Empty],
    ['function foo() { }; export foo;', Context.Empty],
    ['export function () { }', Context.Empty],
    ['function foo() { export default function() { } }', Context.Empty],
    ['function foo() { }; export { , foo };', Context.Empty],
    ['function foo() { }; () => { export { foo }; }', Context.Empty],
    ['for(var i=0; i<1; i++) export default null;', Context.Empty],
    ['if (false) export default null;', Context.Empty],
    ['export', Context.Empty],
    ['export * as;', Context.Empty],
    ['export * as foo;', Context.Empty],
    ['export * as foo from;', Context.Empty],
    ['export * as ,foo from "bar"', Context.Empty],
    ['export B, * as A, { C, D } from "test";', Context.Empty],
    ['export typeof foo;', Context.Empty],
    ['export { , };', Context.Empty],
    ['var a, b; export { a as , b};', Context.Empty],
    ['export }', Context.Empty],
    ['export { Q } from;', Context.Empty],
    ['export { 123 } from;', Context.Empty],
    ['export default const x = 7;', Context.Empty],
    ['export default async function() { yield = 1; }', Context.Empty],
    ['var a, b; export { a as , b};', Context.Empty],
    ['var a; export { a', Context.Empty],
    ['var a; export { a', Context.Empty],
    ['var a; export { a,', Context.Empty],
    ['var a; export { a, ;', Context.Empty],
    ['var a; export { a as };', Context.Empty],
    ['var a, b; export { a as , b};', Context.Empty],
    ['export var {[x]} = z;', Context.Empty],
    ['export var {[x]};', Context.Empty],
    ['export var {[x] = y} = z;', Context.Empty],
    ['export async', Context.Empty],
    ['export default await', Context.Empty],
    ['var foo, bar; export {foo, ...bar}', Context.Empty],
    ['class A extends B { foo() { (super).foo } }', Context.Empty],
    ['export *;', Context.Empty],
    ['export class extends C {}', Context.Empty],
    ['var x; export { x as z }; export * as z from "string";', Context.Empty],
    ['({ set m(x) { export default null; } });', Context.Empty],
    ['while (1) export default 3', Context.Empty],
    ['export default async x \n() => {}', Context.Empty],
    ['let a; export let a;', Context.Empty],
    ['let a; export let a;', Context.Empty],
    ['let a; export class a {};', Context.Empty],
    ['let a; export function a(){};', Context.Empty],
    ['let a; export const a = 0;', Context.Empty],
    ['const a = 0; export class a {};', Context.Empty],
    ['const a = 0; export function a(){};', Context.Empty],
    ['const a = 0; export let a;', Context.Empty],
    ['const a = 0; export const a = 1;', Context.Empty],
    ['var a; let a;', Context.Empty],
    ['var a; export let a;', Context.Empty],
    ['var a; export const a = 0;', Context.Empty],
    ['export {a, b as a};', Context.Empty],
    ['export {a, a as a};', Context.Empty],
    ['export {a}; export class a{};', Context.Empty],
    ['export {a}; export function a(){};', Context.Empty],
    ['export let a; export let a;', Context.Empty],
    ['export const a = 0; export const a = 0;', Context.Empty],
    ['export default 0; export default function f(){};', Context.Empty],
    ['export {a};', Context.Empty],
    ['var a; export {b as a};', Context.Empty],
    ['export {a as b}; var b;', Context.Empty],
    ['let a; export {b as a};', Context.Empty],
    ['export {a as b}; let b;', Context.Empty],
    ['var a, b; export {a, b as a}', Context.Empty],
    ['export function x(){}; export let [x] = y;', Context.Empty],
    ['export let [x] = y; export function x(){};', Context.Empty],
    ['export let x = y, [...x] = y;', Context.Empty],
    ['var a,b; export {a}; export {a, b};', Context.Empty],
    ['export {b as a}; export {a};', Context.Empty],
    ['export { x as y };', Context.Empty],
    ['export function f(){}; async function f(){};', Context.Empty],
    ['export function f(){}; class f{};', Context.Empty],
    ['export class f{}; function f(){};', Context.Empty],
    ['export class f{}; async function f(){};', Context.Empty],
    ['export async function f(){}; const f = foo;', Context.Empty],
    ['export var foo; export let foo;', Context.Empty],
    ['var a,b; export {b, a}; export {a};', Context.Empty],
    ['export default function(a){ let a; }', Context.Empty],
    ['export default function(a){ const a = 0; }', Context.Empty],
    ['export default function([a, a]){}', Context.Empty],
    ['export {b as a}; export {a};', Context.Empty],
    ['export {a}; export {b as a};', Context.Empty],
    ['export {x}; export let [x] = y;', Context.Empty],
    ['export class f {}; export function f() {}', Context.Empty],
    ['class C { method() { export default null; } }', Context.Empty],
    ['export default 1, 2, 3;', Context.Empty],
    ['function foo() { }; export [ foo ];', Context.Empty],
    ['function foo() { }; export { foo as 100 };', Context.Empty],
    ['export {foo}', Context.Empty],
    ['export {Array}', Context.Empty],
    [
      `export function f() {}
    export class f() {}`,
      Context.Empty
    ],
    ['export {foo, bar,};', Context.Empty],
    ['export { for as foo }', Context.Empty],
    ['export { arguments }', Context.Empty],
    ['export { foo };', Context.Empty],
    ['export { x as default };', Context.Empty],
    ['export {foob};', Context.Empty],
    ['export async function await() {}', Context.Empty],
    ['export default async function await() {}', Context.Empty],
    ['export async function() {}', Context.Empty],
    ['export async', Context.Empty],
    ['export async\nfunction async() { await 1; }', Context.Empty],
    ['export class { }', Context.Empty],
    ['function foo() { }; export [ foo ];', Context.Empty],
    ['function foo() { export default function() { } }', Context.Empty],
    ['function foo() { }; export { , foo };', Context.Empty],
    ['function foo() { }; () => { export { foo }; }', Context.Empty],
    ['function foo() { }; try { export { foo }; } catch(e) { }', Context.Empty],
    ['function foo() { }; { export { foo }; }', Context.Empty],
    ['export default 1, 2, 3;', Context.Empty],
    ['export ', Context.Empty],
    ['if (false) export default null;', Context.Empty],
    ['if (false) {} else export default null;', Context.Empty],
    ['for(var i=0; i<1; i++) export default null;', Context.Empty],
    ['export const x = x, x = y;', Context.Empty],
    ['export const [x, x] = c', Context.Empty],
    ['export const [x, {x}] = y', Context.Empty],
    ['export const {x:x, x:x} = c', Context.Empty],
    ['export const a = b; let a = c', Context.Empty],
    ['var x; export {x: a}', Context.Empty],
    ['export async function(){}', Context.Empty],
    ['export async', Context.Empty],
    ['export let ...x = y', Context.Empty],
    ['export ...x = y', Context.Empty],
    ['export default ...x = y', Context.Empty],
    ['export default await', Context.Empty],
    ['export var let = x;', Context.Empty],
    ['{export {x};}', Context.Empty],
    ['let x = () => {export {x};}', Context.Empty],
    ['if (x) export {x};', Context.Empty],
    ['for (;;) export {x};', Context.Empty],
    ['x = { foo(){ export {x}; }}', Context.Empty],
    ['class x { foo(){ export {x}; }}', Context.Empty],
    ['export *;', Context.Empty],
    ['export * as;', Context.Empty],
    ['export {', Context.Empty],
    ['export *;', Context.Empty],
    ['export * as;', Context.Empty],
    ['export * as foo;', Context.Empty],
    ["export * as foo from ';", Context.Empty],
    ["export * as ,foo from 'bar'", Context.Empty],
    ["export * as ,foo from 'bar'", Context.Empty | Context.OptionsNext],
    ['var a; export { a', Context.Empty],
    ['var a; export { a,', Context.Empty],
    ['var a; export { a, ;', Context.Empty],
    ['var a; export { a as };', Context.Empty],
    ['var a, b; export { a as , b};', Context.Empty],
    ['export default = 42', Context.Empty],
    ['export {default} +', Context.Empty],
    ['export default from "foo"', Context.Empty],
    ['({ set m(x) { export default null; } });', Context.Empty],
    ['for (let y in []) import v from "foo"', Context.Empty],
    ['for (let y in []) import v from "foo"', Context.Empty],
    ['switch(0) { default: export default null; }', Context.Empty],
    ['switch(0) { case 1: export default null; }', Context.Empty],
    ['if (true) { } else export default null;', Context.Empty],
    ['test262: export default null;', Context.Empty],
    ['(function() { export default null; });', Context.Empty],
    ['for (x = 0; false;) export default null;', Context.Empty],
    ['do export default null; while (false)', Context.Empty],
    ['export default async x \n() => {}', Context.Empty],
    ['{export default 3}', Context.Empty],
    ['while (1) export default 3', Context.Empty],
    ['export {a,,b}', Context.Empty],
    ['export {function} from a', Context.Empty],
    ['export let[a] = 0 export let[b] = 0', Context.Empty],
    ['export 3', Context.Empty],
    ['export function () {}', Context.Empty],
    ['export default default', Context.Empty],
    ['export default function', Context.Empty],
    ['export default let', Context.Empty],
    ['let a; let a;', Context.Empty],
    ['let a; export class a {};', Context.Empty],
    ['let a; export function a(){};', Context.Empty],
    ['let a; export let a;', Context.Empty],
    ['let a; export const a = 0;', Context.Empty],
    ['const a = 0; export class a {};', Context.Empty],
    ['const a = 0; export function a(){};', Context.Empty],
    ['const a = 0; export let a;', Context.Empty],
    ['const a = 0; export const a = 1;', Context.Empty],
    ['let a; var a;', Context.Empty],
    ['var a; let a;', Context.Empty],
    ['var a; export class a {};', Context.Empty],
    ['var a; export function a(){};', Context.Empty],
    ['var a, b; export {a, b, a}', Context.Empty],
    ['var a, b; export {b, a, a}', Context.Empty],
    ['var a, b; export {a, b, c}', Context.Empty],
    ['var a, b; export {a, b as a}', Context.Empty],
    ['export let [x, x] = y;', Context.Empty],
    ['var foo, bar; export {foo, ...bar}', Context.Empty],
    ['var foo, bar; export {[foo]}', Context.Empty],
    ['var foo, bar; export {{foo}}', Context.Empty],
    ['var foo, bar, x; export {{foo: x}}', Context.Empty],
    ['var foo; export {foo(){}}', Context.Empty],
    ['var foo; export {[foo](){}}', Context.Empty],
    ['export let await;', Context.Empty],
    ['var foo; export {async foo(){}}', Context.Empty],
    ['var foo; export {*foo(){}}', Context.Empty],
    ['export foo', Context.Empty],
    ['export {', Context.Empty],
    ['export async;', Context.Empty],
    ['export async () => y', Context.Empty],
    ['var a; export { a,', Context.Empty]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseModule(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0
        });
      });
    });
  }

  for (const arg of [
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export default async function() {}',
    'export default async function f() {}',
    'export default x;',
    'export const foo = async function() { }',
    'export function async() { }',
    'export function func() { };',
    'export class C { };',
    'export class A extends B {};',
    'export default class A extends B {};',
    'export { };',
    'export let a3 = 3;',
    'export function set(x) { value = x };',
    'export let value = 0;',
    'export default function*() {}',
    'export function foo() { return 42 }',
    'export default 42;',
    'export let a = 1;',
    'export function set_a(x) { a = x };',
    'export function get_a() { return a };',
    'export {get}; function get() {};',
    'export default x;',
    'export function* v() { return 40 }',
    'export var w = 41;',
    'export let x = 42;',
    'export class y {};',
    'export const z = "hello world";',
    'function f() {}; f(); export { f };',
    'export let x = 0;',
    "export { a as b } from 'm.js';",
    "export * from 'p.js';",
    'export var foo;',
    'export default class cName { valueOf() { return 45; } }',
    'export function goo() {};',
    'export let hoo;',
    'export const joo = 42;',
    'export default (function koo() {});',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export class C { };',
    'export { };',
    'export function foo () { return "foo"; }',
    'export const boo = 5;',
    'import {ns} from "three";',
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export default x;',
    'export function func() { };',
    'export class C { };',
    'export var j = 42;',
    'export let k = 42;',
    'export function l() {}',
    'export default function () {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    "export * as arguments from 'm.js'",
    "export * as await from 'm.js'",
    "export * as default from 'm.js'",
    "export * as foo from 'm.js'",
    "export * as for from 'm.js'",
    "export * as let from 'm.js'",
    "export * as static from 'm.js'",
    "export * as yield from 'm.js'",
    'export default [];',
    'export default 42;',
    'export default { foo: 1 };',
    'export * from "foo";',
    'export {default} from "foo";',
    'export {foo as bar} from "foo";',
    'export function *foo () {}',
    'export function x(){}; export let [z] = y;',
    'export var a = x, b = y;',
    'export var foo = 1;',
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    "export {thing}; import thing from 'a.js';",
    "export {thing}; import {thing} from 'a.js';",
    "export {thing}; import * as thing from 'a.js';",
    "export { a as b } from 'm.js';",
    "export * from 'p.js';",
    'export var foo;',
    'export function goo() {};',
    'export let hoo;',
    `export default class { constructor() {	foo() } a() {	bar()	}	}`,
    'export const joo = 42;',
    'export default (function koo() {});',
    'export { };',
    'export {get}; function get() {};',
    'function f() {}; f(); export { f };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default function *a() {}',
    'export var foo = function () {};',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function*() {}',
    'export default class C {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    `export var x;
    x = 'Pass';`,
    'var x; export default x = 7',
    "export { Q } from 'somemodule.js';",
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { for } from 'm.js';",
    "export { yield } from 'm.js'",
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function *a() {}',
    'export let x = 0;',
    'export var y = 0;',
    'export const z = 0;',
    'export function func() { };',
    'export class C { };',
    'export { };',
    'function f() {}; f(); export { f };',
    'var a, b, c; export { a, b as baz, c };',
    'var d, e; export { d as dreary, e, };',
    'export default function f() {}',
    'export default class {}',
    'export default class extends C {}',
    'export default 42',
    'var x; export default x = 7',
    "export * from 'somemodule.js';",
    'var foo; export { foo as for };',
    "export { arguments } from 'm.js';",
    "export { yield } from 'm.js'",
    'export default function f(){}; export {f};',
    'export default async function f(){}; export {f};',
    "export { static } from 'm.js'",
    "export { let } from 'm.js'",
    'var a; export { a as b, a as c };',
    'var a; export { a as await };',
    'var a; export { a as enum };',
    'export var document',
    'export var document = {}',
    'export var document',
    'export class Class {}',
    'export default 42',
    'export default class A {}',
    'export default (class{});',
    'export default /foo/',
    'export var namedOther = null;',
    'export var starAsVarDecl;',
    'export let starAsLetDecl;',
    'export const starAsConstDecl = null;',
    'export function starAsFuncDecl() {}',
    'export function* starAsGenDecl() {}',
    'export class starAsClassDecl {}',
    'export default class Foo {}++x',
    "export { x as y } from './y.js';\nexport { x as z } from './z.js';",
    "export { default as y } from './y.js';\nexport default 42;",
    'export default function(x) {};',
    'export default function () { };',
    'export default function _fn2 () { }',
    'class c { }; export default c',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    'var a; export default a = 10;',
    'export default () => 3',
    'function _default() { }; export default _default',
    'export let a, [...x] = y',
    'export let [...x] = y',
    // Named generator function statement
    'function* g() { }; export default g',
    'class c { }; export default c',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    'export default async \nfunction f(){}',
    'function foo() { }',
    "export const const2 = 'str';",
    'export const const3 = 3, const4 = 4;',
    'export const const5 = { }',
    'export const const6 = [ ]',
    'export {};',
    'class bar { }',
    'function* baz() { }',
    'function foobar() { }',
    "export var var1 = 'string';",
    "export default 'default';",
    'export var var2;',
    'export var var3 = 5, var4',
    'export var var5, var6, var7',
    'export default 1;',
    'var a; export default a = 10;',
    'function _default() { }; export default _default',
    'function* g() { }; export default g',
    'export function *g() { } if (true) { }',
    'export class c1 { } if (true) { }',
    'export default function* _gn2 () { } if (true) { }',
    'export default class _cl2 { } if (true) { }',
    'export default function _fn2 () { } if (true) { }',
    'class c { }; export default c',
    'export async function f(){}; const z = foo;',
    'const f = foo; export async function z(){};',
    'export let x = y, {...z} = y;',
    'export let x = y, [...z] = y;',
    'export let [x] = y; export function z(){};',
    'export function x(){}; export let [z] = y;',
    'export class f {}; export function y() {}',
    'export class f {}; export function y() {}',
    'export default function () {}',
    'export default class {}',
    'export var a = x, b = y;',
    'export let [x, z] = y;',
    "var _ = { method: function() { return 'method_result'; }, method2: function() { return 'method2_result'; } }; export default _",
    `export{};
      export {};
      export {}
      export { };
      export
      {
      };
      export//-
      {//-
      //-
      };
      export/**/{/**/};`,
    `import {} from 'a';
      import 'b';
      import * as ns1 from 'c';
      import dflt1 from 'd';
      export {} from 'e';
      import dflt2, {} from 'f';
      export * from 'g';
      import dflt3, * as ns2 from 'h';`,
    'var a; export { a as b };',
    'export default 1',
    'export default () => {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`, {
          disableWebCompat: false
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `export default async function() {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
              async: true,
              generator: false,
              id: null,
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
      `export default () => x`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              params: [],
              async: false,
              expression: true,
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
      `export default async function(){} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              async: true,
              generator: false,
              id: null,
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo',
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
      `export default async function f(){} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: true,
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
          {
            type: 'ExpressionStatement',
            expression: {
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
      `export default class {} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ClassDeclaration',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
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
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'foo',
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
      `export default function f(){} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
          {
            type: 'ExpressionStatement',
            expression: {
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
      `export async function *f(){} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
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
              async: true,
              generator: true,
              id: {
                type: 'Identifier',
                name: 'f',
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
              start: 7,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 28
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
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
      `export class x {} foo`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'ClassDeclaration',
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
              superClass: null,
              body: {
                type: 'ClassBody',
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
          },
          {
            type: 'ExpressionStatement',
            expression: {
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
      `export * as foo from 'bar';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'bar',
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
            specifiers: [
              {
                type: 'ExportAllDeclaration',
                source: null,
                exported: {
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
      `export * from 'bar';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'bar',
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
            exported: null,
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
      `export * from 'bar';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'bar',
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
            exported: null,
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
      `export let {...x} = y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
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
      `export let a, [...x] = y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
                  type: 'VariableDeclarator',
                  init: {
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
                  id: {
                    type: 'ArrayPattern',
                    elements: [
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
              start: 7,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 7
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
      `export default function* f(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
              async: false,
              generator: true,
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
      `export default async function(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              async: true,
              generator: false,
              id: null,
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
      `export default class {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ClassDeclaration',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export default function(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
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
              generator: false,
              id: null,
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
      `export default function*(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              generator: true,
              id: null,
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
      `export default a in b`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'BinaryExpression',
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
              operator: 'in',
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
      `export {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null,
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
      `export class x {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'ClassDeclaration',
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
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export async function f(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
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
      `export function f(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
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
      `export function* f(){}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
              generator: true,
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
              start: 7,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 7
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
      `export const x = 10, y = 20`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 10,
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
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 20,
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
      `export default x
    /y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'BinaryExpression',
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
                start: 22,
                end: 23,
                loc: {
                  start: {
                    line: 2,
                    column: 5
                  },
                  end: {
                    line: 2,
                    column: 6
                  }
                }
              },
              operator: '/',
              start: 15,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 2,
                  column: 6
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
                line: 2,
                column: 6
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
            line: 2,
            column: 6
          }
        }
      }
    ],
    [
      `export let x, y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
      `export default null;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: null,
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
      `export default 15;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: 15,
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
      `export {}
    /foo/`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            declaration: null,
            end: 9,
            loc: {
              end: {
                column: 9,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            source: null,
            specifiers: [],
            start: 0,
            type: 'ExportNamedDeclaration'
          },
          {
            end: 19,
            expression: {
              end: 19,
              loc: {
                end: {
                  column: 9,
                  line: 2
                },
                start: {
                  column: 4,
                  line: 2
                }
              },
              regex: {
                flags: '',
                pattern: 'foo'
              },
              start: 14,
              type: 'Literal',
              value: /foo/
            },
            loc: {
              end: {
                column: 9,
                line: 2
              },
              start: {
                column: 4,
                line: 2
              }
            },
            start: 14,
            type: 'ExpressionStatement'
          }
        ],
        end: 19,
        loc: {
          end: {
            column: 9,
            line: 2
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export {x}; var x;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
                init: null,
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
      `var x; export {x as a}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
            start: 7,
            end: 22,
            loc: {
              start: {
                line: 1,
                column: 7
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
      `var x; export {x as a,}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
            start: 7,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 7
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
      `export default "foo";`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: 'foo',
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
      `var x,y; export {x, y}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `var x,y; export {x as a, y as b}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'b',
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
            declaration: null,
            start: 9,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 9
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
      `var x,y; export {x as a, y as b,}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'b',
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
            declaration: null,
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
      `export var x`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
      `export var x = 10, y = 20`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 10,
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
                  id: {
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
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 20,
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
                  id: {
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
                }
              ],
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
      `export default {x, y} = x`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'AssignmentExpression',
              left: {
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
                  },
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
              },
              operator: '=',
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
              start: 15,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
      `export * from 'foo'`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            exported: null,
            source: {
              type: 'Literal',
              value: 'foo',
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
      `export {x} from "foo"`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `export {x} from "foo"`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `export {x,} from "foo"`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `export default x;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
      `export let x, y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
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
      `export var x = 10, y = 20`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 10,
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
                  id: {
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
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 20,
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
                  id: {
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
                }
              ],
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
      `var x,y; export {x as a, y as b,}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'b',
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
            declaration: null,
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
      `var x,y; export {x, y,}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `var x,y; export {x as a, y as b}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
              },
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'b',
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
            declaration: null,
            start: 9,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 9
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
      `export {x,} from "foo"`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `export {x}; var x;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
                init: null,
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
      `export {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null,
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
      `export default [x] = y`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'AssignmentExpression',
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
              operator: '=',
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
      `var x; export { x as a }; export { x as b };`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'b',
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
              }
            ],
            declaration: null,
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
      `export {foo}; function foo() {};`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
            start: 14,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          {
            type: 'EmptyStatement',
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
      `export {get}; function get() {};`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'get',
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
                exported: {
                  type: 'Identifier',
                  name: 'get',
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
            declaration: null,
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
              name: 'get',
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
            start: 14,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 14
              },
              end: {
                line: 1,
                column: 31
              }
            }
          },
          {
            type: 'EmptyStatement',
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
      `export let x = 0;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 0,
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
      `export * from 'p.js';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'p.js',
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
            exported: null,
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
      `export class C { };`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'ClassDeclaration',
              id: {
                type: 'Identifier',
                name: 'C',
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
              superClass: null,
              body: {
                type: 'ClassBody',
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
          {
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
      `export var y = 0;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'var',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 0,
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
      `var x; export default x = 7`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
            type: 'ExportDefaultDeclaration',
            declaration: {
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
                type: 'Literal',
                value: 7,
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
      `export * from 'somemodule.js';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'somemodule.js',
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
            exported: null,
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
      `export {thing}; import * as thing from 'a.js';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'thing',
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
                exported: {
                  type: 'Identifier',
                  name: 'thing',
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
            declaration: null,
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
            type: 'ImportDeclaration',
            specifiers: [
              {
                type: 'ImportNamespaceSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'thing',
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
            source: {
              type: 'Literal',
              value: 'a.js',
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
      `export default function f() {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
              params: [],
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
              async: false,
              generator: false,
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
      `export default class extends C {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            declaration: {
              body: {
                body: [],
                end: 33,
                loc: {
                  end: {
                    column: 33,
                    line: 1
                  },
                  start: {
                    column: 31,
                    line: 1
                  }
                },
                start: 31,
                type: 'ClassBody'
              },
              end: 33,
              id: null,
              loc: {
                end: {
                  column: 33,
                  line: 1
                },
                start: {
                  column: 15,
                  line: 1
                }
              },
              start: 15,
              superClass: {
                end: 30,
                loc: {
                  end: {
                    column: 30,
                    line: 1
                  },
                  start: {
                    column: 29,
                    line: 1
                  }
                },
                name: 'C',
                start: 29,
                type: 'Identifier'
              },
              type: 'ClassDeclaration'
            },
            end: 33,
            loc: {
              end: {
                column: 33,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExportDefaultDeclaration'
          }
        ],
        end: 33,
        loc: {
          end: {
            column: 33,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export default 42`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: 42,
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
      `export default function() {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
              id: null,
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
      `export { };`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null,
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
      `var foo; export { foo as for };`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
                  name: 'foo',
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
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'for',
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
              }
            ],
            declaration: null,
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
      `class c { }; export default c`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'c',
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
              body: [],
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
          {
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
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Identifier',
              name: 'c',
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
      `export const const3 = 3, const4 = 4;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 3,
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
                    name: 'const3',
                    start: 13,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
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
                {
                  type: 'VariableDeclarator',
                  init: {
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
                  id: {
                    type: 'Identifier',
                    name: 'const4',
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
              start: 7,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 7
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
      `export let x = y, {...z} = y;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
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
                  id: {
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
                {
                  type: 'VariableDeclarator',
                  init: {
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
                  id: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'RestElement',
                        argument: {
                          type: 'Identifier',
                          name: 'z',
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
                        start: 19,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        }
                      }
                    ],
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
                }
              ],
              start: 7,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 29
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
      `export {} from 'e';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'e',
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
            specifiers: [],
            declaration: null,
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
      `export * from 'g';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportAllDeclaration',
            source: {
              type: 'Literal',
              value: 'g',
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
            exported: null,
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
      `export default foo => bar`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
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
              },
              params: [
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
              async: false,
              expression: true,
              start: 15,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
      `export default async foo => bar`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Identifier',
                name: 'bar',
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
              params: [
                {
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
                }
              ],
              async: true,
              expression: true,
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
      `export async function x() {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
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
              async: true,
              generator: false,
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
              start: 7,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 28
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
      `export default async function x() {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'FunctionDeclaration',
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
              async: true,
              generator: false,
              id: {
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
      `export default async () => {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
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
              params: [],
              async: true,
              expression: false,
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
      `export default async;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
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
      `export default async = 1;`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            declaration: {
              end: 24,
              left: {
                end: 20,
                loc: {
                  end: {
                    column: 20,
                    line: 1
                  },
                  start: {
                    column: 15,
                    line: 1
                  }
                },
                name: 'async',
                start: 15,
                type: 'Identifier'
              },
              loc: {
                end: {
                  column: 24,
                  line: 1
                },
                start: {
                  column: 15,
                  line: 1
                }
              },
              operator: '=',
              right: {
                end: 24,
                loc: {
                  end: {
                    column: 24,
                    line: 1
                  },
                  start: {
                    column: 23,
                    line: 1
                  }
                },
                start: 23,
                type: 'Literal',
                value: 1
              },
              start: 15,
              type: 'AssignmentExpression'
            },
            end: 24,
            loc: {
              end: {
                column: 24,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExportDefaultDeclaration'
          },
          {
            end: 25,
            loc: {
              end: {
                column: 25,
                line: 1
              },
              start: {
                column: 24,
                line: 1
              }
            },
            start: 24,
            type: 'EmptyStatement'
          }
        ],
        end: 25,
        loc: {
          end: {
            column: 25,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `var foo; export { foo as for };`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
                  name: 'foo',
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
          },
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
                  type: 'Identifier',
                  name: 'for',
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
              }
            ],
            declaration: null,
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
      `export default 42`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: 42,
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
      `var x; export default x = 7`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
            type: 'ExportDefaultDeclaration',
            declaration: {
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
                type: 'Literal',
                value: 7,
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
      `export * from 'bar';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            end: 20,
            loc: {
              end: {
                column: 20,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            source: {
              end: 19,
              loc: {
                end: {
                  column: 19,
                  line: 1
                },
                start: {
                  column: 14,
                  line: 1
                }
              },
              start: 14,
              type: 'Literal',
              value: 'bar'
            },
            exported: null,
            start: 0,
            type: 'ExportAllDeclaration'
          }
        ],
        end: 20,
        loc: {
          end: {
            column: 20,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export * as foo from 'bar';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        body: [
          {
            end: 27,
            loc: {
              end: {
                column: 27,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            source: {
              end: 26,
              loc: {
                end: {
                  column: 26,
                  line: 1
                },
                start: {
                  column: 21,
                  line: 1
                }
              },
              start: 21,
              type: 'Literal',
              value: 'bar'
            },
            specifiers: [
              {
                end: 15,
                exported: {
                  end: 15,
                  loc: {
                    end: {
                      column: 15,
                      line: 1
                    },
                    start: {
                      column: 12,
                      line: 1
                    }
                  },
                  name: 'foo',
                  start: 12,
                  type: 'Identifier'
                },
                loc: {
                  end: {
                    column: 15,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                source: null,
                start: 0,
                type: 'ExportAllDeclaration'
              }
            ],
            start: 0,
            type: 'ExportNamedDeclaration'
          }
        ],
        end: 27,
        loc: {
          end: {
            column: 27,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'module',
        start: 0,
        type: 'Program'
      }
    ],
    [
      `export default (class{});`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ClassExpression',
              id: null,
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export default /foo/`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'Literal',
              value: /foo/,
              regex: {
                pattern: 'foo',
                flags: ''
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
      `export class Class {}`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'ClassDeclaration',
              id: {
                type: 'Identifier',
                name: 'Class',
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
              superClass: null,
              body: {
                type: 'ClassBody',
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
      `export default () => 3`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportDefaultDeclaration',
            declaration: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'Literal',
                value: 3,
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
              params: [],
              async: false,
              expression: true,
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
      `export const const2 = 'str';`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: {
                    type: 'Literal',
                    value: 'str',
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
                  id: {
                    type: 'Identifier',
                    name: 'const2',
                    start: 13,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
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
                }
              ],
              start: 7,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 28
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
      `export {};`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: null,
            specifiers: [],
            declaration: null,
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
      `export {foo as bar} from "foo";`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'foo',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
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
                exported: {
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
            declaration: null,
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
      `export { static } from 'm.js'`,
      Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
        body: [
          {
            type: 'ExportNamedDeclaration',
            source: {
              type: 'Literal',
              value: 'm.js',
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
            specifiers: [
              {
                type: 'ExportSpecifier',
                local: {
                  type: 'Identifier',
                  name: 'static',
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
                exported: {
                  type: 'Identifier',
                  name: 'static',
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
            declaration: null,
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
    ]
  ]) {
    it(source as string, () => {
      const parser = parseModule(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0,
        next: true,
        raw: false
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
