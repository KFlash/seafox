import { fail } from '../core';
import { Context } from '../../../src/parser/common';
import { parseRoot } from '../../../src/seafox';
import * as t from 'assert';

fail('Miscellaneous - Trailing comma (fail)', [
  [' function  a(b,,) {}', Context.Empty],
  [' function* a(b,,) {}', Context.Empty],
  ['(function  a(b,,) {});', Context.Empty],
  ['(function* a(b,,) {});', Context.Empty],
  ['(function   (b,,) {});', Context.Empty],
  ['(function*  (b,,) {});', Context.Empty],
  [' function  a(b,c,d,,) {}', Context.Empty],
  [' function* a(b,c,d,,) {}', Context.Empty],
  ['(function  a(b,c,d,,) {});', Context.Empty],
  ['(function* a(b,c,d,,) {});', Context.Empty],
  ['(function   (b,c,d,,) {});', Context.Empty],
  ['(function*  (b,c,d,,) {});', Context.Empty],
  ['(function*  (b,c,d,,) {});', Context.OptionsDisableWebCompat],
  ['(b,,) => {};', Context.Empty],
  ['(b,c,d,,) => {};', Context.Empty],
  ['a(1,,);', Context.Empty],
  ['a(1,2,3,,);', Context.Empty],
  [' function  a1(,) {}', Context.Empty],
  [' function* a2(,) {}', Context.Empty],
  ['(function  a3(,) {});', Context.Empty],
  ['(function* a4(,) {});', Context.Empty],
  ['(function    (,) {});', Context.Empty],
  ['(function*   (,) {});', Context.Empty],
  ['(function    (,) {});', Context.OptionsDisableWebCompat],
  ['(function*   (,) {});', Context.OptionsDisableWebCompat],
  ['(,) => {};', Context.Empty],
  ['a1(,);', Context.Empty],
  [' function  a(...b,) {}', Context.Empty],
  [' function* a(...b,) {}', Context.Empty],
  ['(function  a(...b,) {});', Context.Empty],
  ['(function* a(...b,) {});', Context.Empty],
  ['(function   (...b,) {});', Context.Empty],
  ['(function*  (...b,) {});', Context.Empty],
  [' function  a(b, c, ...d,) {}', Context.Empty],
  [' function* a(b, c, ...d,) {}', Context.Empty],
  ['(function  a(b, c, ...d,) {});', Context.Empty],
  ['(function* a(b, c, ...d,) {});', Context.Empty],
  ['(function   (b, c, ...d,) {});', Context.Empty],
  ['(...b,) => {};', Context.Empty],
  ['(b, c, ...d,) => {};', Context.Empty],
  ['(,);', Context.Empty],
  ['(a,);', Context.Empty],
  ['(a,b,c,);', Context.Empty],
  ['foo (,) => 0', Context.Empty],
  [', => 0', Context.Empty],
  [', () => 0', Context.Empty],
  ['async (,) => 0', Context.Empty],
  ['(function*  (b, c, ...d,) {});', Context.Empty],
  ['class A {foo(,) {}}', Context.Strict | Context.Module],
  ['class A {static foo(,) {}}', Context.Empty],
  ['(class {static foo(,) {}})', Context.Empty],
  ['(...b,) => {};', Context.Empty],
  ['(b, c, ...d,) => {};', Context.Empty],
  ['n, op, val,', Context.Empty],
  ['foo(a,,) => 0', Context.Empty],
  ['async (a,,) => 0', Context.Empty],
  ['(b,,) => {};', Context.Empty],
  ['(b,c,d,,) => {};', Context.Empty],
  ['a(1,,);', Context.Empty],
  ['a(1,2,3,,);', Context.Empty],
  [' function  a1(,) {}', Context.Empty],
  ['a(1,,);', Context.Strict | Context.Module],
  ['a(1,2,3,,);', Context.Strict | Context.Module],
  [' function  a1(,) {}', Context.Strict | Context.Module],
  [' function* a2(,) {}', Context.Empty],
  ['(function  a3(,) {});', Context.Empty],
  ['(function* a4(,) {});', Context.Empty],
  ['(function    (,) {});', Context.Empty],
  ['(function*   (,) {});', Context.Empty],
  ['(,) => {};', Context.Empty],
  ['a1(,);', Context.Empty],
  [' function  a(...b,) {}', Context.Empty],
  [' function  a(...b,) {}', Context.Strict | Context.Module],
  [' function* a(...b,) {}', Context.Empty],
  ['(function  a(...b,) {});', Context.Empty],
  ['(function* a(...b,) {});', Context.Empty],
  ['(function   (...b,) {});', Context.Empty],
  ['(function*  (...b,) {});', Context.Empty],
  ['(function   (...b,) {});', Context.Strict | Context.Module],
  ['(function*  (...b,) {});', Context.Strict | Context.Module]
]);

// Comma is not permitted after the rest element
const invalidRest = [
  'function foo(...a,) { }',
  '(function(...a,) { })',
  '(...a,) => a',
  'async (...a,) => a',
  '({foo(...a,) {}})',
  'class A {foo(...a,) {}}',
  'class A {static foo(...a,) {}}',
  '(class {foo(...a,) {}})',
  '(class {static foo(...a,) {}})'
];

for (const arg of invalidRest) {
  it(`"use strict"; ${arg}`, () => {
    t.throws(() => {
      parseRoot(`"use strict"; ${arg}`, Context.Empty);
    });
  });
  it(`${arg}`, () => {
    t.throws(() => {
      parseRoot(`${arg}`, Context.Strict | Context.Module);
    });
  });
}

for (const arg of [
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
  '(b,) => {};',
  '(b,c,d,) => {};',
  'a(1,);',
  'a(1,2,3,);',
  'a(...[],);',
  'a(1, 2, ...[],);',
  'a(...[], 2, ...[],);',
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
  'function  a(b,) {}',
  'function* a(b,) {}',
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
  '(1, y)',
  '0, f(n - 1);',
  '(b,) => {};',
  '(b,c,d,) => {};',
  'a(1,);',
  'a(1,2,3,);',
  'a(...[],);',
  'a(1, 2, ...[],);',
  'a(...[], 2, ...[],);',
  'a, b => 0'
]) {
  it(`"use strict"; ${arg}`, () => {
    t.doesNotThrow(() => {
      parseRoot(`"use strict"; ${arg}`, Context.Empty);
    });
  });

  it(`${arg}`, () => {
    t.doesNotThrow(() => {
      parseRoot(`${arg}`, Context.Strict | Context.Module);
    });
  });
}
