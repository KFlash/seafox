import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - OnToken', () => {
  it('false', () => {
    let onTokenCount = 0;
    parseScript('false', {
      onToken: function (token: string, value: any, start?: number, end?: number) {
        t.deepEqual(token, 'BooleanLiteral');
        t.deepEqual(value, false);
        t.deepEqual(start, 0);
        t.deepEqual(end, 5);
        onTokenCount++;
      },
      loc: true
    });
    t.equal(onTokenCount, 1);
  });

  it('let', () => {
    let onTokenCount = 0;
    parseScript('let', {
      onToken: function (token: string, value: any, start?: number, end?: number) {
        t.deepEqual(token, 'Identifier');
        t.deepEqual(value, 'let');
        t.deepEqual(start, 0);
        t.deepEqual(end, 3);
        onTokenCount++;
      },
      loc: true
    });
    t.equal(onTokenCount, 1);
  });

  it('if(x){} /y/.test(z)', () => {
    const tokenArray: any[] = [];
    parseScript('if(x){} /y/.test(z)', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      { type: 'Keyword', value: 'if', start: 0, end: 2 },
      { type: 'Punctuator', value: '(', start: 2, end: 3 },
      { type: 'Identifier', value: 'x', start: 3, end: 4 },
      { type: 'Punctuator', value: ')', start: 4, end: 5 },
      { type: 'Punctuator', value: '{', start: 5, end: 6 },
      { type: 'Punctuator', value: '}', start: 6, end: 7 },
      {
        type: 'RegularExpression',
        value: {
          value: /y/,
          regex: {
            flags: '',
            pattern: 'y'
          }
        },
        start: 8,
        end: 11
      },
      { type: 'Punctuator', value: '.', start: 11, end: 12 },
      {
        type: 'Identifier',
        value: 'test',
        start: 12,
        end: 16
      },
      { type: 'Punctuator', value: '(', start: 16, end: 17 },
      { type: 'Identifier', value: 'z', start: 17, end: 18 },
      { type: 'Punctuator', value: ')', start: 18, end: 19 }
    ]);
  });

  it('with (false) /42/', () => {
    const tokenArray: any[] = [];
    parseScript('with (false) /42/', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 4,
        start: 0,
        type: 'Keyword',
        value: 'with'
      },
      {
        end: 6,
        start: 5,
        type: 'Punctuator',
        value: '('
      },
      {
        end: 11,
        start: 6,
        type: 'BooleanLiteral',
        value: false
      },
      {
        end: 12,
        start: 11,
        type: 'Punctuator',
        value: ')'
      },
      {
        end: 17,
        start: 13,
        type: 'RegularExpression',
        value: {
          regex: {
            flags: '',
            pattern: '42'
          },
          value: /42/
        }
      }
    ]);
  });

  it('this / 100;', () => {
    const tokenArray: any[] = [];
    parseScript('this / 100;', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 4,
        start: 0,
        type: 'Keyword',
        value: 'this'
      },
      {
        end: 6,
        start: 5,
        type: 'Punctuator',
        value: '/'
      },
      {
        end: 10,
        start: 7,
        type: 'NumericLiteral',
        value: 100
      },
      {
        end: 11,
        start: 10,
        type: 'Punctuator',
        value: ';'
      }
    ]);
  });

  it('/42/g', () => {
    const tokenArray: any[] = [];
    parseScript('/42/g', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 5,
        start: 0,
        type: 'RegularExpression',
        value: {
          regex: {
            flags: 'g',
            pattern: '42'
          },
          value: /42/g
        }
      }
    ]);
  });

  it('[a] / b', () => {
    const tokenArray: any[] = [];
    parseScript('[a] / b', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 1,
        start: 0,
        type: 'Punctuator',
        value: '['
      },
      {
        end: 2,
        start: 1,
        type: 'Identifier',
        value: 'a'
      },
      {
        end: 3,
        start: 2,
        type: 'Punctuator',
        value: ']'
      },
      {
        end: 5,
        start: 4,
        type: 'Punctuator',
        value: '/'
      },
      {
        end: 7,
        start: 6,
        type: 'Identifier',
        value: 'b'
      }
    ]);
  });

  it(';function f(){} /42/', () => {
    const tokenArray: any[] = [];
    parseScript(';function f(){} /42/', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 1,
        start: 0,
        type: 'Punctuator',
        value: ';'
      },
      {
        end: 9,
        start: 1,
        type: 'Keyword',
        value: 'function'
      },
      {
        end: 11,
        start: 10,
        type: 'Identifier',
        value: 'f'
      },
      {
        end: 12,
        start: 11,
        type: 'Punctuator',
        value: '('
      },
      {
        end: 13,
        start: 12,
        type: 'Punctuator',
        value: ')'
      },
      {
        end: 14,
        start: 13,
        type: 'Punctuator',
        value: '{'
      },
      {
        end: 15,
        start: 14,
        type: 'Punctuator',
        value: '}'
      },
      {
        end: 20,
        start: 16,
        type: 'RegularExpression',
        value: {
          regex: {
            flags: '',
            pattern: '42'
          },
          value: /42/
        }
      }
    ]);
  });

  it('function x(){} /42/', () => {
    const tokenArray: any[] = [];
    parseScript('function x(){} /42/', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,
          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 8,
        start: 0,
        type: 'Keyword',
        value: 'function'
      },
      {
        end: 10,
        start: 9,
        type: 'Identifier',
        value: 'x'
      },
      {
        end: 11,
        start: 10,
        type: 'Punctuator',
        value: '('
      },
      {
        end: 12,
        start: 11,
        type: 'Punctuator',
        value: ')'
      },
      {
        end: 13,
        start: 12,
        type: 'Punctuator',
        value: '{'
      },
      {
        end: 14,
        start: 13,
        type: 'Punctuator',
        value: '}'
      },
      {
        end: 19,
        start: 15,
        type: 'RegularExpression',
        value: {
          regex: {
            flags: '',
            pattern: '42'
          },
          value: /42/
        }
      }
    ]);
  });

  it('let foo = bar;', () => {
    const tokenArray: any[] = [];
    parseScript('let foo = bar;', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,

          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 3,
        start: 0,
        type: 'Identifier',
        value: 'let'
      },
      {
        end: 7,
        start: 4,
        type: 'Identifier',
        value: 'foo'
      },
      {
        end: 9,
        start: 8,
        type: 'Punctuator',
        value: '='
      },
      {
        end: 13,
        start: 10,
        type: 'Identifier',
        value: 'bar'
      },
      {
        end: 14,
        start: 13,
        type: 'Punctuator',
        value: ';'
      }
    ]);
  });

  it('function z() {}; `z`;', () => {
    const tokenArray: any[] = [];
    parseScript('function z() {}; `z`;', {
      onToken: function (type: string, value: any, start?: number, end?: number) {
        tokenArray.push({
          type,
          value,

          start,
          end
        });
      },
      loc: true
    });
    t.deepEqual(tokenArray, [
      {
        end: 8,
        start: 0,
        type: 'Keyword',
        value: 'function'
      },
      {
        end: 10,
        start: 9,
        type: 'Identifier',
        value: 'z'
      },
      {
        end: 11,
        start: 10,
        type: 'Punctuator',
        value: '('
      },
      {
        end: 12,
        start: 11,
        type: 'Punctuator',
        value: ')'
      },
      {
        end: 14,
        start: 13,
        type: 'Punctuator',
        value: '{'
      },
      {
        end: 15,
        start: 14,
        type: 'Punctuator',
        value: '}'
      },
      {
        end: 16,
        start: 15,
        type: 'Punctuator',
        value: ';'
      },
      {
        end: 20,
        start: 17,
        type: 'Template',
        value: 'z'
      },
      {
        end: 21,
        start: 20,
        type: 'Punctuator',
        value: ';'
      }
    ]);
  });
});
