import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Module - Export (fail)', [
  ['export foo;', Context.Strict | Context.Module],
  ['export {y as z, y as x, y};', Context.Strict | Context.Module],
  ['export {y as x};', Context.Strict | Context.Module],
  ['export default var x = 7;', Context.Strict | Context.Module],
  ['export var new = 10;', Context.Strict | Context.Module],
  ['export default let x = 7;', Context.Strict | Context.Module],
  ['export default const x = 7;', Context.Strict | Context.Module],
  ['"use strict"; export default const x = 7;', Context.Strict | Context.Module],
  ['var a, b; export { a as b, b };', Context.Strict | Context.Module],
  ['var a, b; export { a as c, b as c };', Context.Strict | Context.Module],
  ['function a() {} function a() {}', Context.Strict | Context.Module],
  ['function a() export {} function a() {}', Context.Strict | Context.Module],
  ['function a() {} export function a() {}', Context.Strict | Context.Module],
  ['export function await() {}', Context.Strict | Context.Module],
  ['export function *await() {}', Context.Strict | Context.Module],
  ['export { encrypt }', Context.Strict | Context.Module],
  ['export { default }', Context.Strict | Context.Module],
  ['export { default as foo }', Context.Strict | Context.Module],
  ['export { if }', Context.Strict | Context.Module],
  ['export new Foo();', Context.Strict | Context.Module],
  ['export typeof foo;', Context.Strict | Context.Module],
  ['async package => 1;', Context.Strict | Context.Module],
  ['class Test {}; export default class Test {}', Context.Strict | Context.Module],
  ['export { encrypt }; export { encrypt }', Context.Strict | Context.Module],
  ['export { decrypt as encrypt }; function encrypt() {}', Context.Strict | Context.Module],
  ['export { encrypt }; if (true) function encrypt() {}', Context.Strict | Context.Module],
  ['var a; export {a, a}', Context.Strict | Context.Module],
  ['export {x}; export let {...x} = y;', Context.Strict | Context.Module],
  ['export {x}; export let [x] = y;', Context.Strict | Context.Module],
  ['export {x}; export let [...x] = y;', Context.Strict | Context.Module],
  ['export {x}; export let [x] = y;', Context.Strict | Context.Module],
  ['export let x = y, {...x} = y;', Context.Strict | Context.Module],
  ['export let x = y, [x] = y;', Context.Strict | Context.Module],
  ['export let x = y, [...x] = y;', Context.Strict | Context.Module],
  ['export function x(){}; export let [x] = y;', Context.Strict | Context.Module],
  ['export let [x, x] = y;', Context.Strict | Context.Module],
  ['export var a = x, a = y;', Context.Strict | Context.Module],
  ['export let [x] = y; export {x};', Context.Strict | Context.Module],
  ['export let [x] = y; export function x(){};', Context.Strict | Context.Module],
  ['var a, b; export {b, a, a}', Context.Strict | Context.Module],
  ['var a, b; export {a, b as a}', Context.Strict | Context.Module],
  [
    `var a, b;
  export {a};
  export {b as a};`,
    Context.Strict | Context.Module
  ],
  [
    `var a, b
  export {b as a};
  export {a};`,
    Context.Strict | Context.Module
  ],
  [
    `var a,b;
  export {a, b};
  export {a};`,
    Context.Strict | Context.Module
  ],
  ['export {mustExist as canBeUndeclared};', Context.Strict | Context.Module],
  ['export let foo; export let foo;', Context.Strict | Context.Module],
  ['export var foo; export let foo;', Context.Strict | Context.Module],
  [
    `var x;
  export {mustExist as x};`,
    Context.Strict | Context.Module
  ],
  ['export var [foo = x];', Context.Strict | Context.Module],
  ['export var [foo], bar;', Context.Strict | Context.Module],
  ['export var [foo];', Context.Strict | Context.Module],
  ['export const [foo = x];', Context.Strict | Context.Module],
  ['export var await = 10;', Context.Strict | Context.Module],
  ['export var [foo];', Context.Strict | Context.Module],
  ['export var await = 10;', Context.Strict | Context.Module],
  ['export const [foo];', Context.Strict | Context.Module],
  ['export default await x', Context.Strict | Context.Module],
  ['export let [foo = x];', Context.Strict | Context.Module],
  ['export let [foo], bar;', Context.Strict | Context.Module],
  ['export let [foo];', Context.Strict | Context.Module],
  ['"use strict"; with (x) y;', Context.Strict | Context.Module],
  ['export default function f(){}; export default class C {};', Context.Strict | Context.Module],
  ['export async function a() {} export async function a() {}', Context.Strict | Context.Module],
  ['export class a {} export async function a() {}', Context.Strict | Context.Module],
  ['export function a() {} export async function a() {}', Context.Strict | Context.Module],
  ['let a = b; export async function a() {} ', Context.Strict | Context.Module],
  ['export default async function a() {} export async function a() {}', Context.Strict | Context.Module],
  ['export class a {} export default async function a() {}', Context.Strict | Context.Module],
  ['export default class a {} export default async function () {}', Context.Strict | Context.Module],
  ['export function a() {} export default async function a() {}', Context.Strict | Context.Module],
  ['let a = b; export default async function a() {} ', Context.Strict | Context.Module],
  ['export async function a() {} let a = b;', Context.Strict | Context.Module],
  ['export default function f(){}; var a; export { a as default };', Context.Strict | Context.Module],
  ['export function*() {}', Context.Strict | Context.Module],
  ['export class extends C {}', Context.Strict | Context.Module],
  ['export {x};', Context.Strict | Context.Module],
  [
    `"foo"
  export {x};`,
    Context.Strict | Context.Module
  ],
  ['export * as foo from', Context.Strict | Context.Module],
  [
    `export default class C {};
   export default class C {};`,
    Context.Strict | Context.Module
  ],
  ['export { a, b as c, c, b };', Context.Strict | Context.Module],
  ['export class f {} export {f};', Context.Strict | Context.Module],
  ['export let x = y, [x] = y;', Context.Strict | Context.Module],
  ['export function a() {} export default function a() {}', Context.Strict | Context.Module],
  ['export class f{}; async function f(){};', Context.Strict | Context.Module],
  ['export default function(){}; export default function(){};', Context.Strict | Context.Module],
  ['export var let = x;', Context.Strict | Context.Module],
  ['export {a as b};', Context.Strict | Context.Module],
  ['export async function f(){}; export {z};', Context.Strict | Context.Module],
  ['switch (x) { export {x}; }', Context.Strict | Context.Module],
  ['export let foo = x foo', Context.Strict | Context.Module],
  ['export var foo = x foo', Context.Strict | Context.Module],
  ['export {x}; export class y {};', Context.Strict | Context.Module],
  ['export default x; export {y as default};', Context.Strict | Context.Module],
  ['export bar, * as foo from "bar";', Context.Strict | Context.Module],
  ['export {bar}, * as foo from "bar";', Context.Strict | Context.Module],
  ['export {bar}, * from "bar";', Context.Strict | Context.Module],
  ['export * as foo, {bar} from "bar";', Context.Strict | Context.Module],
  ['var a,b; export {c, d}; export {e};', Context.Strict | Context.Module],
  ['export ...x = y', Context.Strict | Context.Module],
  ['export default ...x = y', Context.Strict | Context.Module],
  ['export let ...x = y', Context.Strict | Context.Module],
  ['{export {x};}', Context.Strict | Context.Module],
  ['x = { foo(){ export {x}; }}', Context.Strict | Context.Module],
  ['function f(){ return export {x}; }', Context.Strict | Context.Module],
  ['with (x) export {x};', Context.Strict | Context.Module],
  ['export *;', Context.Strict | Context.Module],
  ['export 12;', Context.Strict | Context.Module],
  ['export function() {}', Context.Strict | Context.Module],
  ['function foo() { }; export foo;', Context.Strict | Context.Module],
  ['export function () { }', Context.Strict | Context.Module],
  ['function foo() { export default function() { } }', Context.Strict | Context.Module],
  ['function foo() { }; export { , foo };', Context.Strict | Context.Module],
  ['function foo() { }; () => { export { foo }; }', Context.Strict | Context.Module],
  ['for(var i=0; i<1; i++) export default null;', Context.Strict | Context.Module],
  ['if (false) export default null;', Context.Strict | Context.Module],
  ['export', Context.Strict | Context.Module],
  ['export * as;', Context.Strict | Context.Module],
  ['export * as foo;', Context.Strict | Context.Module],
  ['export * as foo from;', Context.Strict | Context.Module],
  ['export * as ,foo from "bar"', Context.Strict | Context.Module],
  ['export B, * as A, { C, D } from "test";', Context.Strict | Context.Module],
  ['export typeof foo;', Context.Strict | Context.Module],
  ['export { , };', Context.Strict | Context.Module],
  ['var a, b; export { a as , b};', Context.Strict | Context.Module],
  ['export }', Context.Strict | Context.Module],
  ['export { Q } from;', Context.Strict | Context.Module],
  ['export { 123 } from;', Context.Strict | Context.Module],
  ['export default const x = 7;', Context.Strict | Context.Module],
  ['export default async function() { yield = 1; }', Context.Strict | Context.Module],
  ['var a, b; export { a as , b};', Context.Strict | Context.Module],
  ['var a; export { a', Context.Strict | Context.Module],
  ['var a; export { a', Context.Strict | Context.Module],
  ['var a; export { a,', Context.Strict | Context.Module],
  ['var a; export { a, ;', Context.Strict | Context.Module],
  ['var a; export { a as };', Context.Strict | Context.Module],
  ['var a, b; export { a as , b};', Context.Strict | Context.Module],
  ['export var {[x]} = z;', Context.Strict | Context.Module],
  ['export var {[x]};', Context.Strict | Context.Module],
  ['export var {[x] = y} = z;', Context.Strict | Context.Module],
  ['export async', Context.Strict | Context.Module],
  ['export default await', Context.Strict | Context.Module],
  ['var foo, bar; export {foo, ...bar}', Context.Strict | Context.Module],
  ['class A extends B { foo() { (super).foo } }', Context.Strict | Context.Module],
  ['export *;', Context.Strict | Context.Module],
  ['export class extends C {}', Context.Strict | Context.Module],
  ['var x; export { x as z }; export * as z from "string";', Context.Strict | Context.Module],
  ['({ set m(x) { export default null; } });', Context.Strict | Context.Module],
  ['while (1) export default 3', Context.Strict | Context.Module],
  ['export default async x \n() => {}', Context.Strict | Context.Module],
  ['let a; export let a;', Context.Strict | Context.Module],
  ['let a; export let a;', Context.Strict | Context.Module],
  ['let a; export class a {};', Context.Strict | Context.Module],
  ['let a; export function a(){};', Context.Strict | Context.Module],
  ['let a; export const a = 0;', Context.Strict | Context.Module],
  ['const a = 0; export class a {};', Context.Strict | Context.Module],
  ['const a = 0; export function a(){};', Context.Strict | Context.Module],
  ['const a = 0; export let a;', Context.Strict | Context.Module],
  ['const a = 0; export const a = 1;', Context.Strict | Context.Module],
  ['var a; let a;', Context.Strict | Context.Module],
  ['var a; export let a;', Context.Strict | Context.Module],
  ['var a; export const a = 0;', Context.Strict | Context.Module],
  ['export {a, b as a};', Context.Strict | Context.Module],
  ['export {a, a as a};', Context.Strict | Context.Module],
  ['export {a}; export class a{};', Context.Strict | Context.Module],
  ['export {a}; export function a(){};', Context.Strict | Context.Module],
  ['export let a; export let a;', Context.Strict | Context.Module],
  ['export const a = 0; export const a = 0;', Context.Strict | Context.Module],
  ['export default 0; export default function f(){};', Context.Strict | Context.Module],
  ['export {a};', Context.Strict | Context.Module],
  ['var a; export {b as a};', Context.Strict | Context.Module],
  ['export {a as b}; var b;', Context.Strict | Context.Module],
  ['let a; export {b as a};', Context.Strict | Context.Module],
  ['export {a as b}; let b;', Context.Strict | Context.Module],
  ['var a, b; export {a, b as a}', Context.Strict | Context.Module],
  ['export function x(){}; export let [x] = y;', Context.Strict | Context.Module],
  ['export let [x] = y; export function x(){};', Context.Strict | Context.Module],
  ['export let x = y, [...x] = y;', Context.Strict | Context.Module],
  ['var a,b; export {a}; export {a, b};', Context.Strict | Context.Module],
  ['export {b as a}; export {a};', Context.Strict | Context.Module],
  ['export { x as y };', Context.Strict | Context.Module],
  ['export function f(){}; async function f(){};', Context.Strict | Context.Module],
  ['export function f(){}; class f{};', Context.Strict | Context.Module],
  ['export class f{}; function f(){};', Context.Strict | Context.Module],
  ['export class f{}; async function f(){};', Context.Strict | Context.Module],
  ['export async function f(){}; const f = foo;', Context.Strict | Context.Module],
  ['export var foo; export let foo;', Context.Strict | Context.Module],
  ['export var [...foo, bar] = obj;', Context.Strict | Context.Module],
  ['export var [...foo,,] = obj;', Context.Strict | Context.Module],
  ['export var [...] = obj;', Context.Strict | Context.Module],
  ['export var [.x] = obj;', Context.Strict | Context.Module],
  ['export var [foo = x];', Context.Strict | Context.Module],
  ['export var foo, [bar];', Context.Strict | Context.Module],
  ['export var [foo];', Context.Strict | Context.Module],
  ['export const [foo = x];', Context.Strict | Context.Module],
  ['export const [foo], bar;', Context.Strict | Context.Module],
  ['export var [..x] = obj;', Context.Strict | Context.Module],
  ['export var [... ...foo] = obj;', Context.Strict | Context.Module],
  ['var a,b; export {b, a}; export {a};', Context.Strict | Context.Module],
  ['export default function(a){ let a; }', Context.Strict | Context.Module],
  ['export default function(a){ const a = 0; }', Context.Strict | Context.Module],
  ['export default function([a, a]){}', Context.Strict | Context.Module],
  ['export {b as a}; export {a};', Context.Strict | Context.Module],
  ['export {a}; export {b as a};', Context.Strict | Context.Module],
  ['export {x}; export let [x] = y;', Context.Strict | Context.Module],
  ['export class f {}; export function f() {}', Context.Strict | Context.Module],
  ['class C { method() { export default null; } }', Context.Strict | Context.Module],
  ['export default 1, 2, 3;', Context.Strict | Context.Module],
  ['function foo() { }; export [ foo ];', Context.Strict | Context.Module],
  ['function foo() { }; export { foo as 100 };', Context.Strict | Context.Module],
  ['export {foo}', Context.Strict | Context.Module],
  ['export {Array}', Context.Strict | Context.Module],
  [
    `export function f() {}
  export class f() {}`,
    Context.Strict | Context.Module
  ],
  ['export {foo, bar,};', Context.Strict | Context.Module],
  ['export { for as foo }', Context.Strict | Context.Module],
  ['export { arguments }', Context.Strict | Context.Module],
  ['export { foo };', Context.Strict | Context.Module],
  ['export { x as default };', Context.Strict | Context.Module],
  ['export {foob};', Context.Strict | Context.Module],
  ['export async function await() {}', Context.Strict | Context.Module],
  ['export default async function await() {}', Context.Strict | Context.Module],
  ['export async function() {}', Context.Strict | Context.Module],
  ['export async', Context.Strict | Context.Module],
  ['export async\nfunction async() { await 1; }', Context.Strict | Context.Module],
  ['export class { }', Context.Strict | Context.Module],
  ['function foo() { }; export [ foo ];', Context.Strict | Context.Module],
  ['function foo() { export default function() { } }', Context.Strict | Context.Module],
  ['function foo() { }; export { , foo };', Context.Strict | Context.Module],
  ['function foo() { }; () => { export { foo }; }', Context.Strict | Context.Module],
  ['function foo() { }; try { export { foo }; } catch(e) { }', Context.Strict | Context.Module],
  ['function foo() { }; { export { foo }; }', Context.Strict | Context.Module],
  ['export default 1, 2, 3;', Context.Strict | Context.Module],
  ['export ', Context.Strict | Context.Module],
  ['if (false) export default null;', Context.Strict | Context.Module],
  ['if (false) {} else export default null;', Context.Strict | Context.Module],
  ['for(var i=0; i<1; i++) export default null;', Context.Strict | Context.Module],
  ['export const x = x, x = y;', Context.Strict | Context.Module],
  ['export const [x, x] = c', Context.Strict | Context.Module],
  ['export const [x, {x}] = y', Context.Strict | Context.Module],
  ['export const {x:x, x:x} = c', Context.Strict | Context.Module],
  ['export const a = b; let a = c', Context.Strict | Context.Module],
  ['var x; export {x: a}', Context.Strict | Context.Module],
  ['export async function(){}', Context.Strict | Context.Module],
  ['export async', Context.Strict | Context.Module],
  ['export let ...x = y', Context.Strict | Context.Module],
  ['export ...x = y', Context.Strict | Context.Module],
  ['export default ...x = y', Context.Strict | Context.Module],
  ['export default await', Context.Strict | Context.Module],
  ['export var let = x;', Context.Strict | Context.Module],
  ['{export {x};}', Context.Strict | Context.Module],
  ['let x = () => {export {x};}', Context.Strict | Context.Module],
  ['if (x) export {x};', Context.Strict | Context.Module],
  ['for (;;) export {x};', Context.Strict | Context.Module],
  ['x = { foo(){ export {x}; }}', Context.Strict | Context.Module],
  ['class x { foo(){ export {x}; }}', Context.Strict | Context.Module],
  ['export *;', Context.Strict | Context.Module],
  ['export * as;', Context.Strict | Context.Module],
  ['export {', Context.Strict | Context.Module],
  ['export *;', Context.Strict | Context.Module],
  ['export * as;', Context.Strict | Context.Module],
  ['export * as foo;', Context.Strict | Context.Module],
  ["export * as foo from ';", Context.Strict | Context.Module],
  ["export * as ,foo from 'bar'", Context.Strict | Context.Module],
  ["export * as ,foo from 'bar'", Context.Strict | Context.Module | Context.OptionsNext],
  ['var a; export { a', Context.Strict | Context.Module],
  ['var a; export { a,', Context.Strict | Context.Module],
  ['var a; export { a, ;', Context.Strict | Context.Module],
  ['var a; export { a as };', Context.Strict | Context.Module],
  ['var a, b; export { a as , b};', Context.Strict | Context.Module],
  ['export default = 42', Context.Strict | Context.Module],
  ['export {default} +', Context.Strict | Context.Module],
  ['export default from "foo"', Context.Strict | Context.Module],
  ['({ set m(x) { export default null; } });', Context.Strict | Context.Module],
  ['for (let y in []) import v from "foo"', Context.Strict | Context.Module],
  ['for (let y in []) import v from "foo"', Context.Strict | Context.Module],
  ['switch(0) { default: export default null; }', Context.Strict | Context.Module],
  ['switch(0) { case 1: export default null; }', Context.Strict | Context.Module],
  ['if (true) { } else export default null;', Context.Strict | Context.Module],
  ['test262: export default null;', Context.Strict | Context.Module],
  ['(function() { export default null; });', Context.Strict | Context.Module],
  ['for (x = 0; false;) export default null;', Context.Strict | Context.Module],
  ['do export default null; while (false)', Context.Strict | Context.Module],
  ['export default async x \n() => {}', Context.Strict | Context.Module],
  ['{export default 3}', Context.Strict | Context.Module],
  ['while (1) export default 3', Context.Strict | Context.Module],
  ['export {a,,b}', Context.Strict | Context.Module],
  ['export {function} from a', Context.Strict | Context.Module],
  ['export let[a] = 0 export let[b] = 0', Context.Strict | Context.Module],
  ['export 3', Context.Strict | Context.Module],
  ['export function () {}', Context.Strict | Context.Module],
  ['export default default', Context.Strict | Context.Module],
  ['export default function', Context.Strict | Context.Module],
  ['export default let', Context.Strict | Context.Module],
  ['let a; let a;', Context.Strict | Context.Module],
  ['let a; export class a {};', Context.Strict | Context.Module],
  ['let a; export function a(){};', Context.Strict | Context.Module],
  ['let a; export let a;', Context.Strict | Context.Module],
  ['let a; export const a = 0;', Context.Strict | Context.Module],
  ['const a = 0; export class a {};', Context.Strict | Context.Module],
  ['const a = 0; export function a(){};', Context.Strict | Context.Module],
  ['const a = 0; export let a;', Context.Strict | Context.Module],
  ['const a = 0; export const a = 1;', Context.Strict | Context.Module],
  ['let a; var a;', Context.Strict | Context.Module],
  ['var a; let a;', Context.Strict | Context.Module],
  ['var a; export class a {};', Context.Strict | Context.Module],
  ['var a; export function a(){};', Context.Strict | Context.Module],
  ['var a, b; export {a, b, a}', Context.Strict | Context.Module],
  ['var a, b; export {b, a, a}', Context.Strict | Context.Module],
  ['var a, b; export {a, b, c}', Context.Strict | Context.Module],
  ['var a, b; export {a, b as a}', Context.Strict | Context.Module],
  ['export let [x, x] = y;', Context.Strict | Context.Module],
  ['var foo, bar; export {foo, ...bar}', Context.Strict | Context.Module],
  ['var foo, bar; export {[foo]}', Context.Strict | Context.Module],
  ['var foo, bar; export {{foo}}', Context.Strict | Context.Module],
  ['var foo, bar, x; export {{foo: x}}', Context.Strict | Context.Module],
  ['var foo; export {foo(){}}', Context.Strict | Context.Module],
  ['var foo; export {[foo](){}}', Context.Strict | Context.Module],
  ['export let await;', Context.Strict | Context.Module],
  ['var foo; export {async foo(){}}', Context.Strict | Context.Module],
  ['var foo; export {*foo(){}}', Context.Strict | Context.Module],
  ['export foo', Context.Strict | Context.Module],
  ['export {', Context.Strict | Context.Module],

  ['export let {x:y=z};', Context.Strict | Context.Module],
  ['export let x, {y};', Context.Strict | Context.Module],
  ['export let {x:y};', Context.Strict | Context.Module],
  ['export {', Context.Strict | Context.Module],

  ['export async;', Context.Strict | Context.Module],
  ['export async () => y', Context.Strict | Context.Module],
  ['var a; export { a,', Context.Strict | Context.Module]
]);

pass('Module - Export (pass)', [
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
    Context.Strict | Context.Module,
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
              body: []
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'foo'
          }
        }
      ]
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
              start: 20,
              end: 21,
              loc: {
                start: {
                  line: 2,
                  column: 3
                },
                end: {
                  line: 2,
                  column: 4
                }
              }
            },
            operator: '/',
            start: 15,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 15
              },
              end: {
                line: 2,
                column: 4
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
              line: 2,
              column: 4
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
          line: 2,
          column: 4
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: /foo/,
            regex: {
              pattern: 'foo',
              flags: ''
            },
            start: 12,
            end: 17,
            loc: {
              start: {
                line: 2,
                column: 2
              },
              end: {
                line: 2,
                column: 7
              }
            }
          },
          start: 12,
          end: 17,
          loc: {
            start: {
              line: 2,
              column: 2
            },
            end: {
              line: 2,
              column: 7
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
          line: 2,
          column: 7
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
]);
