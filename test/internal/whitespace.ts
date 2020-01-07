import * as t from 'assert';
import { Context } from '../../src/parser/common';
import { scan } from '../../src/scanner/scan';
import { create } from '../../src/parser/core';

describe('Lexer', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      scan(parser, Context.Empty, opts.source, 1, opts.source.length, 0, 0, true, /* allowRegExp */ 0);
      t.deepEqual(
        {
          //seek: scan(parser),
          hasNext: parser.index < parser.source.length,
          line: parser.lineBase,
          column: parser.index - parser.offset
        },
        {
          //  seek: opts.seek,
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

  pass('skips spaces', {
    source: '        ',

    hasNext: false,
    line: 1,
    column: 8
  });

  pass('skips spaces', {
    source: '\u2003',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips spaces', {
    source: '\u8202',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips spaces', {
    source: '\u8197\u8202',
    hasNext: false,
    line: 1,
    column: 2
  });

  pass('skips spaces', {
    source: '\u2001\u2002\u2003',
    hasNext: false,
    line: 1,
    column: 3
  });
});
