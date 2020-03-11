import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';
import { parseRoot } from '../../../src/seafox';
import * as t from 'assert';

describe('Expressions - Object spread', () => {
  for (const arg of [
    '{ ...var z = y}',
    '{ ...var}',
    '{ ...foo bar}',
    '{* ...foo}',
    '{get ...foo}',
    '{set ...foo}',
    '{async ...foo}',
    'return ...[1,2,3];',
    'var ...x = [1,2,3];',
    'var [...x,] = [1,2,3];',
    'var [...x, y] = [1,2,3];',
    'var { x } = {x: ...[1,2,3]}'
  ]) {
    it(`x = ${arg}`, () => {
      t.throws(() => {
        parseRoot(`x = ${arg};`, Context.Empty);
      });
    });

    it(`function fn() { 'use strict';${arg}} fn();`, () => {
      t.throws(() => {
        parseRoot(`function fn() { 'use strict';${arg}} fn();`, Context.Empty);
      });
    });

    it(`function fn() { ${arg}} fn();`, () => {
      t.throws(() => {
        parseRoot(`function fn() { ${arg}} fn();`, Context.Empty);
      });
    });

    it(`"use strict"; x = ${arg}`, () => {
      t.throws(() => {
        parseRoot(`x = ${arg};`, Context.Empty);
      });
    });
  }

  // Spread Array

  for (const arg of ['[...]', '[a, ...]', '[..., ]', '[..., ...]', '[ (...a)]']) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseRoot(`${arg};`, Context.OptionsDisableWebCompat);
      });
    });

    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseRoot(`"use strict"; ${arg};`, Context.Empty);
      });
    });
  }

  for (const arg of [
    '[...a]',
    '[a, ...b]',
    '[...a,]',
    '[...a, ,]',
    '[, ...a]',
    '[...a, ...b]',
    '[...a, , ...b]',
    '[...[...a]]',
    '[, ...a]',
    '[, , ...a]',
    '{ ...y }',
    '{ a: 1, ...y }',
    '{ b: 1, ...y }',
    '{ y, ...y}',
    '{ ...z = y}',
    '{ ...y, y }',
    '{ ...y, ...y}',
    '{ a: 1, ...y, b: 1}',
    '{ ...y, b: 1}',
    '{ ...1}',
    '{ ...null}',
    '{ ...undefined}',
    '{ ...1 in {}}',
    '{ ...[]}',
    '{ ...async function() { }}',
    '{ ...async () => { }}',
    '{ ...new Foo()}'
  ]) {
    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseRoot(`x = ${arg};`, Context.Empty);
      });
    });

    it(`x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseRoot(`x = ${arg};`, Context.OptionsNext | Context.Module);
      });
    });

    it(`"use strict"; x = ${arg}`, () => {
      t.doesNotThrow(() => {
        parseRoot(`x = ${arg};`, Context.Empty);
      });
    });
  }
});
