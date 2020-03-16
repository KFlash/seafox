import * as t from 'assert';
import { create } from '../../src/parser/core';
import { skipMeta } from '../../src/scanner/';

describe('Scanner - BOM', () => {
  function pass(name: string, opts: any) {
    it(name, () => {
      const parser = create(opts.source);
      skipMeta(parser, opts.source);
      t.deepEqual(
        {
          hasNext: parser.index < parser.source.length,
          line: parser.curLine,
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

  pass('skips nothing before a lone exclamation', {
    source: '! foo',
    hasNext: true,
    line: 1,
    column: 0
  });

  pass('skips a BOM in an otherwise empty source', {
    source: '\uFFEF',
    hasNext: false,
    line: 1,
    column: 1
  });

  pass('skips nothing before a lone exclamation', {
    source: '! foo',
    hasNext: true,
    line: 1,
    column: 0
  });

  pass('skips a shebang+LF in an otherwise empty source', {
    source: '#!/foo/bar/baz -abc\n',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+LF before a lone hash', {
    source: '#!/foo/bar/baz -abc\n# foo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+LF before a lone exclamation', {
    source: '#!/foo/bar/baz -abc\n! foo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+CR in an otherwise empty source', {
    source: '#!/foo/bar/baz -abc\r',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+CR before an identifier', {
    source: '#!/foo/bar/baz -abc\rfoo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+CR before a lone hash', {
    source: '#!/foo/bar/baz -abc\r# foo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+CR before a lone exclamation', {
    source: '#!/foo/bar/baz -abc\r! foo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a shebang+CRLF before an identifier', {
    source: '#!/foo/bar/baz -abc\r\nfoo',
    hasNext: true,
    line: 1,
    column: 19
  });

  pass('skips a BOM+shebang+LF before an identifier', {
    source: '\uFFEF#!/foo/bar/baz -abc\nfoo',
    hasNext: true,
    line: 1,
    column: 20
  });

  pass('skips a BOM+shebang+LF before a lone hash', {
    source: '\uFFEF#!/foo/bar/baz -abc\n# foo',
    hasNext: true,
    line: 1,
    column: 20
  });

  pass('skips a BOM+shebang+CR before a lone exclamation', {
    source: '\uFFEF#!/foo/bar/baz -abc\r! foo',
    hasNext: true,
    line: 1,
    column: 20
  });

  pass('skips a BOM+shebang+paragraph separator before a lone exclamation', {
    source: '\uFFEF#!/foo/bar/baz -abc\u2029! foo',
    hasNext: true,
    line: 1,
    column: 20
  });
});
