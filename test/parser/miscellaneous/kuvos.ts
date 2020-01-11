import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

// Tests from @kuvos / Tenko

describe('Miscellaneous - Lexical', () => {
  for (const arg of [
    '{ async function f() {} var f; }',
    'let x; { var x; }',
    'let x; var x;',
    'for (const x in y) { var x; }',
    'for (let x in y) { var x; }',
    'for (const x = y;;) { var x; }',
    'for (let x;;) { var x; }',
    'for (const x of y) { var x; }',
    'for (let x of y) { var x; }',
    'for (let a, b, x, d;;) { var foo; var bar; { var doo, x, ee; } }',
    'function g(){ const f = 1; function f() {} }',
    'function g(){ let f = 1; function f() {} }',
    'function g(){ { function f() {} var f = 1; } }',
    'const f = 1; function f() {}',
    'let f = 1; function f() {}',
    '{ function f() {} var f = 1; }',
    'const x = a; function x(){};',
    'let x = a; function x(){};',
    'class o {f(){ const x = y; function x(){} }}',
    'class o {f(){ const x = y; var x; }}',
    'class o {f(){ let x; function x(){} }}',
    'class o {f(){ let x; var x; }}',
    'o = {f(){ const x = y; function x(){} }}',
    'o = {f(){ const x = y; var x; }}',
    'o = {f(){ let x; function x(){} }}',
    'o = {f(){ let x; var x; }}',
    'switch (x) { case a: const foo = x; break; case b: var foo = x; break; }',
    'switch (x) { case a: let foo; break; case b: var foo; break; }',
    'let x; for (;;) { var x; }',
    'let x; { var x }',
    'for (const x in obj) { var x = 13 }',
    'for (const x of obj) { var x = 14 }',
    'for (const x = 1;;) { var x = 2 }',
    'try { async function *f(){} var f } catch (e) {}',
    'try { async function f(){} var f } catch (e) {}',
    'try { function *f(){} var f } catch (e) {}',
    'try { function f(){} var f } catch (e) {}',
    '{ async function *f(){} var f }',
    `{ async function f(){} var f }`,
    `{ function *f(){} var f }`,
    `{ function f(){} var f }`,
    `switch (0) { case 1: function f() {} default: var f }`,
    `for (let x in {}) { var x; }`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { preserveParens: true });
      });
    });
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`, { disableWebCompat: true });
      });
    });
  }

  for (const arg of [
    `try {} catch (e) { var e = x; }`,
    `try {} catch (e) { for (var e = 1;;) {} }`,
    `try {} catch (e) { for (var e in y) {} }`,
    `try {} catch (e) { for (var e of y) {} }`,
    `try {} catch (e) { { var e = x; } }`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, { disableWebCompat: true });
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { disableWebCompat: false });
      });
    });
  }
});
