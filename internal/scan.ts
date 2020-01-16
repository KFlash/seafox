import * as t from 'assert';
import { Context } from '../../src/parser/common';
import { scan } from '../../src/scanner/scan';
import { create } from '../../src/parser/core';
import { Token } from '../../src/token';

describe('Lexer', () => {
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
  function passAll(name: (lt: string) => string, opts: (lt: string) => any) {
    pass(name('line feed'), opts('\n'));
    pass(name('carriage return'), opts('\r'));
    pass(name('Windows newline'), opts('\r'));
    pass(name('line separators'), opts('\u2028'));
    pass(name('paragraph separators'), opts('\u2029'));
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

  pass('skips spaces1', {
    source: '\n\r',
    //
    hasNext: false,
    line: 3,
    column: 0
  });

  pass('skips spaces2', {
    source: '\r\n ',
    //
    hasNext: false,
    line: 2,
    column: 1
  });

  pass('skips spaces2', {
    source: '/* \u2029 \u2028 \r\n \u2028 */',
    hasNext: false,
    line: 5,
    column: 3
  });

  pass('skips spaces2', {
    source: '/* \u2029 \u2028 \r\n \u2028  \r\n */',
    hasNext: false,
    line: 6,
    column: 3
  });

  pass('skips spaces2', {
    source: '/* \u2029 \r\n \u2028 */',
    hasNext: false,
    line: 4,
    column: 3
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

  passAll(
    lt => `skips ${lt}s`,
    lt => ({
      source: `${lt}${lt}${lt}${lt}${lt}${lt}${lt}${lt}`,

      hasNext: false,
      line: 9,
      column: 0
    })
  );

  pass('skips mixed whitespace', {
    source: '    \t \r\n \n\r \v\f\t ',
    hasNext: false,
    line: 4,
    column: 5
  });

  pass('skips mixed whitespace1', {
    source: '// -->',
    hasNext: false,
    line: 1,
    column: 6
  });

  pass('skips mixed whitespace1', {
    source: '// SHOULD SKIP THIS -->',
    hasNext: false,
    line: 1,
    column: 23
  });

  pass('skips mixed whitespace1', {
    source: '// --> //  foo',
    hasNext: false,
    line: 1,
    column: 14
  });

  pass('skips mixed whitespace1', {
    source: '/* \r\n */',
    hasNext: false,
    line: 2,
    column: 3
  });

  passAll(
    lt => `skips single line comments with  ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt}  `,

      hasNext: false,
      line: 2,
      column: 2
    })
  );
  passAll(
    lt => `skips multiple single line comments with ${lt}`,
    lt => ({
      source: `  \t // foo bar${lt} // baz ${lt} //`,

      hasNext: false,
      line: 3,
      column: 3
    })
  );

  pass('skips multiline comments with nothing', {
    source: '  \t /* foo * /* bar */  ',

    hasNext: false,
    line: 1,
    column: 24
  });

  passAll(
    lt => `skips multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo * /* bar ${lt} */  `,

      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips multiple multiline comments with ${lt}`,
    lt => ({
      source: `  \t /* foo bar${lt} *//* baz*/ ${lt} /**/`,

      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips HTML single line comments with ${lt}`,
    lt => ({
      source: `  \t <!-- foo bar${lt}  `,

      hasNext: false,
      line: 2,
      column: 2
    })
  );

  passAll(
    lt => `skips multiple HTML single line comments with ${lt}`,
    lt => ({
      source: `  \t <!-- foo bar${lt} <!-- baz ${lt} <!--`,

      hasNext: false,
      line: 3,
      column: 5
    })
  );

  passAll(
    lt => `skips single HTML close comment after ${lt}`,
    lt => ({
      source: `  \t ${lt}-->  `,

      hasNext: false,
      line: 2,
      column: 5
    })
  );

  passAll(
    lt => `skips line of single HTML close comment after ${lt}`,
    lt => ({
      source: `  \t ${lt}--> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `allows HTML close comment after ${lt} + WS`,
    lt => ({
      source: `  \t ${lt}   --> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips single-line block on line of HTML close after ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips 2 single-line block on line of HTML close after ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /**/ /* second optional ${''}SingleLineDelimitedCommentSequence */    ${''}--> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt} + empty line`,
    lt => ({
      source: `  \t /*${lt}*/  -->${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips block HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/  --> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips first line block HTML close with ${lt}`,
    lt => ({
      source: `  \t /* optional FirstCommentLine ${lt}*/  --> ` + `the comment extends to these characters${lt} `,

      hasNext: false,
      line: 3,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}optional${lt}MultiLineCommentChars ${lt}*/  --> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 5,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + single block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 4,
      column: 1
    })
  );

  passAll(
    lt => `skips multi block + 2 single block + HTML close with ${lt}`,
    lt => ({
      source: `  \t /*${lt}*/ /**/ /* optional SingleLineDelimitedCommentSequence ${lt}*/  --> the comment extends to these characters${lt} `,

      hasNext: false,
      line: 4,
      column: 1
    })
  );

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scan(parser, context, source, 1, source.length, Token.EOF, 0, true, /* allowRegExp */ 0));
    });
  }
  fail('fails on -->', '-->', Context.Module | Context.Strict);
  fail('fails on <!-- foo', '<!-- foo', Context.Module | Context.Strict);
  fail('fails on -->', '-->', Context.OptionsDisableWebCompat);
  fail('fails on <!-- foo', '<!-- foo', Context.OptionsDisableWebCompat);
});
