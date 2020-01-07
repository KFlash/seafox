import * as t from 'assert';
import { parseScript, parseModule } from '../../../src/seafox';

describe('Miscellaneous - Literal', () => {
  for (const arg of [
    "'use strict'; ('\\1')",
    "'use strict'; ('\\4')",
    "'use strict'; ('\\11')",
    "'use strict'; ('\\000')",
    "'use strict'; ('\\00')",
    "'use strict'; ('\\123')",
    "('\\00n') 'use strict'; ",
    "('\\00') 'use strict'; ",
    "('\\000') 'use strict'; ",
    "('\\4') 'use strict'; ",
    "('\\1') 'use strict'; ",
    "('\\123') 'use strict'; ",
    "('\\x')",
    '(")',
    "('\\9')",
    '\\0009',
    '("\\u{FFFFFFF}")',
    "'",
    "(')"
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

  for (const arg of ["('\\\\\\'')", '("x")', '(1n)', "('\\0')", "('\\7a')", '(441_34)']) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { next: true });
      });
    });
  }
});
