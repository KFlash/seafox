import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - ASI', () => {
  for (const arg of [
    `var x=0, y=0;\nvar z=\nx\n++\n++\ny`,
    `for(\nfalse\n) {\nbreak;\n}`,
    `for(false;false;;false) { break; }`,
    `\n while(false)`,
    `do {}; \n while(false)`,
    '{} * 1',
    `for header is (false \n false \n)`,
    'if (false) x = 1 else x = -1',
    `try {
      throw
      1;
    } catch(e) {
    }`,
    `var x = 0;
    x
    ++;`,
    `var x = 1;
    x
    --;`,
    `for(;
      ) {
        break;
      }`,
    `for(
        false
    ;) {
      break;
    }`,
    `for(
      ;
  ) {
    break;
  }`,
    `for(
    ) {
      break;
    }`,
    `for(false
      false
  ) {
    break;
  }`,
    `do
  while (false)`
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
    `;;1;;1;;1`,
    '"foo"\nx',
    `function f(){\n'foo';\n}`,
    'function f(){\n"foo"\n}',
    '"ignore me"\n++x',
    '("use strict"); foo = 42;',
    '("use strict"); eval = 42;',
    'function f(){ 123; "use strict";}'
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
