import { parseScript, parseRoot } from '../../../src/seafox';
import { Context } from '../../../src/parser/common';

import * as t from 'assert';

describe('Miscellaneous - Annex B', () => {
  for (const arg of [
    'x --> is eol-comment\nvar y = 37;\n',
    '"\\n" --> is eol-comment\nvar y = 37;\n',
    'x/* precomment */ --> is eol-comment\nvar y = 37;\n',
    'var x = 42; --> is eol-comment\nvar y = 37;\n'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseRoot(`${arg}`, Context.OptionsDisableWebCompat);
      });
    });

    it(`${arg}`, () => {
      t.throws(() => {
        parseRoot(`${arg}`, Context.Strict | Context.Module);
      });
    });
  }

  for (const arg of [
    '{ if (x) function f() {} ; function f() {} }',
    'var f = 123; if (true) function f() {  } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    ' try { throw null;} catch (f) {if (true) function f() { return 123; } else ; }',
    'for (let f in { key: 0 }) {if (true) function f() {  } else ; }',
    '{ if (x) function f() {} ; function f() {} }',
    'for (let f of [0]) { if (true) function f() {  } else ; }',
    '{ function f() {} } if (true) function f() {}',
    'for (let f; ; ) { if (true) function f() {  } break; }',
    'if (true) function f() {  } else function _f() {}',
    'switch (0) { default: let f; if (false) ; else function f() {  } }',
    'switch (0) { default: let f; if (false) ; else function f() {  } }',
    'if (false) ; else function f() {  }',
    'switch (1) { case 1: function f() { initialBV = f; f = 123; currentBV = f; return "decl"; }}',
    'switch (1) { case 1: function f() {} }  function f() {}',
    'try { throw {}; } catch ({ f }) { switch (1) { case 1: function f() {  }  } }',
    'switch (0) { default: let f;  switch (1) { case 1: function f() {  }  } }',
    'let f = 123; switch (1) { case 1: function f() {  } }',
    'for (let f; ; ) { switch (1) { default: function f() {  } } break; }',
    'switch (1) { default: function f() {  } }',
    'function *f() {} function *f() {}',
    '{ function f() {} function f() {} }',
    'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; } else function _f() {}',
    'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; } else function _f() {}',
    'switch (0) { default: let f; {function f() {  } }}',
    '{ let f = 123; { function f() {  }} }',
    'try { throw {}; } catch ({ f }) { { function f() {  } } }',
    '{ function f() { return 1; } { function f() { return 2; } }  }',
    `/}?/u;`,
    `/{*/u;`,
    `/.{.}/;`,
    `/[\\w-\\s]/;`,
    `/[\\s-\\w]/;`,
    `/(?!.){0,}?/;`,
    `/(?!.){0,}?/u;`,
    `/{/;`,
    `004`,
    `076`,
    `02`,
    'if (x) function f() { return 23; } else function f() { return 42; }',
    'if (x) function f() {}',
    'x = -1 <!--x;',
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() { return "foo"; } else function _f() {}',
    'for (let f of [0]) {}',
    'for (let f; ; ) {}',
    'for (let f; ; ) {}',
    'for (let f in { key: 0 }) {}',
    `(function(f) {
                      init = f;
                      switch (1) {
                        case 1:
                          function f() {  }
                      }
                      after = f;
                    }(123));`,
    ` try {
                      throw {};
                    } catch ({ f }) {
                    switch (1) {
                      default:
                        function f() {  }
                    }
                    }
                  `,
    `{
                      function f() {
                        return 'first declaration';
                      }
                    }`,
    `{
                      function f() { return 'declaration'; }
                    }`,
    'if (true) function f() {} else function _f() {}',
    'if (false) function _f() {} else function f() { }',
    `for (let f; ; ) {
                      if (false) ; else function f() {  }
                        break;
                      }`,
    `try {
throw {};
} catch ({ f }) {
switch (1) {
case 1:
  function f() {  }
}
}`,
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    `switch (1) {
                      default:
                        function f() {  }
                    }`,
    `try {
                      throw {};
                    } catch ({ f }) {
                    switch (1) {
                      case 1:
                        function f() {  }
                    }
                    }`,
    `{
                      let f = 123;
                      switch (1) {
                        case 1:
                          function f() {  }
                      }
                      }`,
    `
                      for (let f in { key: 0 }) {
                      switch (1) {
                        case 1:
                          function f() {  }
                      }
                      }`,
    `var x = 0;
                        x = -1 <!--x;`,
    'if (true) function f() {} else function _f() {}',
    'if (false) function _f() {} else function f() { }',
    'if (x) function f() {}',
    'if (x) function f() { return 23; } else function f() { return 42; }',
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() { return "foo"; } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    'if (true) function f() {  } else function _f() {}',
    '{ if (x) function f() {} ; function f() {} }',
    'var f; function f() {}',
    'function f() {} var f;',
    'function* f() {} function* f() {}',
    'var f; function* f() {}',
    'function* f() {} var f;',
    'function f() {} function* f() {}',
    'if (true) function foo() {}',
    'if (false) {} else function f() { };',
    'label: function f() { }',
    'label: if (true) function f() { }',
    'label: if (true) {} else function f() { }',
    'label: label2: function f() { }',
    'function* f() {} function f() {}',
    'for (let f in { key: 0 }) { switch (1) { case 1: function f() {  } } }',
    'var f = 123;  switch (1) { case 1: function f() {  } }',
    'label: if (true) function f() { }',
    'try { f; } catch (exception) { err1 = exception; } switch (1) { case 1: function f() {  } } try { f; } catch (exception) { err2 = exception; }',
    'try { throw {}; } catch ({ f }) {  if (false) ; else function f() {  }  }',
    'for (let f in { key: 0 }) { if (false) ; else function f() {  } }',
    'if (false) ; else function f() {  }',
    'switch (0) { default: let f; if (true) function f() {  } }',
    '{ function f() {} } if (true) function f() {  }',
    'for (let f of [0]) { if (true) function f() {  } else ; }',
    'let f = 123; if (false) function _f() {} else function f() {  }',
    'for (let f in { key: 0 }) { if (false) function _f() {} else function f() {  } }',
    ' try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }',
    'let f = 123; { function f() {  } }',
    'for (let f of [0]) {{ function f() {  } } }',
    '{ let f = 123; { function f() {  } } }',
    '{ function f() {} } { function f() {  }}',
    'label: if (true) {} else function f() { }',
    'label: label2: function f() { }',
    'if (true) function f() { initialBV = f; f = 123; currentBV = f; return "decl"; } else function _f() {}',
    `(function() { { function f() { initialBV = f; f = 123; currentBV = f; return 'decl'; } } }());`,
    `(function() {      {        function f() { return 'inner declaration'; }
    }
    function f() {
      return 'outer declaration';
    }
  }());
  `,
    ` init = f;
  f = 123;
  changed = f;
  {
    function f() {  }
  }`,
    `let f = 123;
  init = f;
  {
    function f() {  }
  }`,
    `  try {
    f;
  } catch (exception) {
    err1 = exception;
  }
  {
    function f() {  }
  }
  try {
    f;
  } catch (exception) {
    err2 = exception;
  }`,
    ` for (let f of [0]) {
    if (true) function f() {  } else function _f() {}
    }`,
    ` for (let f in { key: 0 }) {
    if (true) function f() {  } else function _f() {}
    }`,
    `  {
    function f() {
      return 'first declaration';
    }
  }
  if (false) function _f() {} else function f() { return 'second declaration'; }`,
    ` for (let f in { key: 0 }) {
    if (false) function _f() {} else function f() {  }
    }`,
    ` init = f;
  if (false) function _f() {} else function f() {  }
`,
    `init = f;
  f = 123;
  changed = f;
  if (true) function f() {  } else ;
`,
    ` for (let f of [0]) {
    if (true) function f() {  } else ;
    }`,

    'try {  throw {}; } catch ({ f }) { if (true) function f() {  } else ; }',
    'for (let f of [0]) { if (true) function f() {  } else ; }',
    '{ function f() {} } if (true) function f() {}',
    'for (let f; ; ) { if (true) function f() {  } break; }',
    'if (true) function f() {  } else function _f() {}',
    'switch (0) { default: let f; if (false) ; else function f() {  } }',
    'switch (0) { default: let f; if (false) ; else function f() {  } }',
    `/*
  */-->
  counter += 1;`,
    `/*
  */-->the comment extends to these characters`,
    `0/*
  */-->`,
    `0/* optional FirstCommentLine
  */-->the comment extends to these characters`,
    `0/*
  optional
  MultiLineCommentChars */-->the comment extends to these characters`,
    `0/*
  */ /* optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`,
    `0/*
  */ /**/ /* second optional SingleLineDelimitedCommentSequence */-->the comment extends to these characters`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, { next: true, globalReturn: true });
      });
    });
  }
});
