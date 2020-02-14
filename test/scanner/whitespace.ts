import * as t from 'assert';
import { Context } from '../../src/parser/common';
import { scan } from '../../src/scanner/scan';
import { create } from '../../src/parser/core';

describe('Scanner - Whitespace', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      scan(parser, Context.Empty, opts.source, 1, opts.source.length, 0, 0, true, /* allowRegExp */ 0);
      t.deepEqual(
        {
          hasNext: parser.index < parser.source.length,
          line: parser.lineBase,
          column: parser.index - parser.offset
        },
        {
          hasNext: opts.hasNext,
          line: opts.line,
          column: opts.column
        }
      );
    });
  }
  pass('skips nothing', {
    source: '',
    hasNext: false,
    line: 1,
    column: 0
  });

  pass('skips tabs', {
    source: '\t\t\t\t\t\t\t\t',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips vertical tabs', {
    source: '\v\v\v\v\v\v\v\v',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips spaces', {
    source: '        ',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips nl + lf', {
    source: '\n\r',
    hasNext: false,
    line: 3,
    column: 0
  });

  pass('skips lf + nl', {
    source: '\r\n ',
    hasNext: false,
    line: 2,
    column: 1
  });

  pass('skips spaces', {
    source: '        ',
    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips exotic whitespace (1)', {
    source: '\u2003',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips exotic whitespace (2)', {
    source: '\u8202',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips exotic whitespace (3)', {
    source: '\u8197\u8202',
    hasNext: false,
    line: 1,
    column: 2
  });

  pass('skips exotic whitespace (4)', {
    source: '\u2001\u2002\u2003',
    hasNext: false,
    line: 1,
    column: 3
  });

  pass('skips mixed whitespace', {
    source: '    \t \r\n \n\r \v\f\t ',
    hasNext: false,
    line: 4,
    column: 5
  });
});
