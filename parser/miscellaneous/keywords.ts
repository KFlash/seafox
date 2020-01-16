import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Keyword', () => {
  for (const arg of [
    'break = 1;',
    'case = 1;',
    'continue = 1;',
    'default = 1;',
    'function = 1;',
    'this = 1;',
    'var = 1;',
    'void = 1;',
    'with = 1;',
    'in = 1;',
    'var = 1;',
    'class',
    'if',
    'do = 1;',
    'continue',
    'for',
    'switch',
    'while = 1;',
    'try = 1;'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.throws(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });

    it(`var ${arg}`, () => {
      t.throws(() => {
        parseScript(`var ${arg}`);
      });
    });

    it(`function () { ${arg} }`, () => {
      t.throws(() => {
        parseScript(`function () { ${arg} }`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  for (const arg of [
    'var foo = {}; foo.if;',
    'var foo = {}; foo.super;',
    'var foo = {}; foo.arguments;',
    'var foo = {}; foo.interface;'
  ]) {
    it(`"use strict"; ${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`"use strict"; ${arg}`);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
  }
});
