import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Enum', () => {
  for (const arg of [
    'enum;',
    'enum: ;',
    'var enum;',
    'var [enum] = [];',
    'export var enum = 10;',
    '( enum ) = x',
    'enum: x',
    '({key: enum}) => null',
    '({enum}) => x;',
    'function *f(x = delete ((enum) = f)) {}',
    '(x = (enum) = f) => {}',
    'function *f(x = (enum) = f) {}',
    'async (x = (enum) = f) => {}',
    'async (x = delete ((enum) = f)) => {}',
    '(x = (enum) = f) => {}',
    '(x = delete ((enum) = f)) => {}',
    'function *f(){ (enum) = 1; }',
    'function fh({x: enum}) {}',
    'function f({enum}) {}',
    'delete (((enum.prop)))',
    'var enum = x;',
    'async x => (enum) = 1',
    // '({static * enum(){}});',
    '({static set enum(x){}});',
    'class x {enum: x}',
    'enum',
    'enum = 1;',
    '({static get enum(){}});',
    'function *f(x = delete ((enum) = f)) {}',
    'function f() { "use strict"; (enum = x); }'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`, {
          disableWebCompat: true
        });
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseModule(`${arg}`);
      });
    });
  }

  for (const arg of [
    'x = { enum: false }',
    'class X { enum(){} }',
    'class X { static enum(){} }',
    '({ set enum(x){} });',
    'class x {static async * enum(){}}',
    '({ async * enum(){} });',
    '({ * enum(){} });',
    '({ get enum(){} });',
    '({ enum(){} });',
    '({enum: x}) => x;',
    '({enum: x});',
    'class x {async enum(){}}',
    'class x {* enum(){}}',
    'class x {get enum(){}}',
    'class x {enum(){}}',
    'class x {static * enum(){}}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseModule(`${arg}`);
      });
    });
  }
});
