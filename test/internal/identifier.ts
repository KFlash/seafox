import * as t from 'assert';
import { Context } from '../../src/parser/bits';
import { create } from '../../src/parser/core';
import { Token } from '../../src/token';
import { scan } from '../../src/scanner/scan';

describe('src/scanner/scan', () => {
  interface Opts {
    source: string;
    context: Context;
    token: Token;
    hasNext: boolean;
    line: number;
    column: number;
  }

  function fail(name: string, source: string, context: Context) {
    it(name, () => {
      const parser = create(source);
      t.throws(() => scan(parser, context, source, source.length, 0, true, /* allowRegExp */ 0));
    });
  }

  fail('fails on \\{4fff}', '\\{4fff}', Context.Empty);
  fail('fails on a🀒c', 'a🀒c', Context.Empty);
  fail('fails on a😍c', 'a😍c', Context.Empty);
  fail('fails on ፰', '፰', Context.Empty); // Invalid as IdentifierStart
  fail('fails on ᧚', '᧚', Context.Empty); // Invalid as IdentifierStart
  fail('fails on \\u007', '\\u007', Context.Strict);
  fail('fails on \\u00', '\\u00', Context.Empty);
  fail('fails on \\u044', '\\u044', Context.Empty);
  fail('fails on \\u0', '\\u0', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\', '\\', Context.Empty);
  fail('fails on \\', '\\u2E2F', Context.Empty);
  fail('fails on \\uD800', '\\uD800', Context.Empty);
  fail('fails on \\uD83B\\uDE00', '\\uD83B\\uDE00', Context.Empty);
  //fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.Empty);
  //fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.Empty);
  fail('fails on \\u00Xvwxyz', '\\u00Xvwxyz', Context.Empty);
  //fail('fails on \\u0Xvwxyz', '\\u0Xvwxyz', Context.Empty);
  // fail('fails on \\uXvwxyz', '\\uXvwxyz', Context.Empty);
  fail('fails on \\Xvwxyz', '\\Xvwxyz', Context.Empty);
  fail('fails on abc\\u007', 'abc\\u007', Context.Empty);
  fail('fails on abc\\u00', 'abc\\u00', Context.Empty);
  fail('fails on abc\\u0', 'abc\\u0', Context.Strict);
  fail('fails on abc\\u', 'abc\\u', Context.Strict);
  fail('fails on abc\\', 'abc\\', Context.Strict);
  // fail('fails on abc\\u007Xvwxyz', 'abc\\u007Xvwxyz;', Context.Strict);
  // fail('fails on abc\\u007Xvwxyz', 'abc\\u007Xvwxyz', Context.Strict);
  // fail('fails on abc\\u00Xvwxyz', 'abc\\u00Xvwxyz', Context.Strict);
  // fail('fails on abc\\u0Xvwxyz', 'abc\\u0Xvwxyz', Context.OptionsNext);
  // fail('fails on abc\\uXvwxyz', 'abc\\uXvwxyz', Context.OptionsNext);
  // fail('fails on `abc\\Xvwxyz', '`abc\\Xvwxyz', Context.OptionsNext);
  fail('fails on \\u00', '\\u00', Context.OptionsNext);
  fail('fails on \\u007', '\\u007', Context.OptionsNext);
  // fail('fails on \\u007Xvwxyz', '\\u007Xvwxyz', Context.OptionsNext);
  fail('fails on abc\\u{}', 'abc\\u{}', Context.OptionsNext);
  fail('fails on abc\\u}', 'abc\\u}', Context.OptionsNext);
  fail('fails on abc\\u{', 'abc\\u{', Context.OptionsNext);
  fail('fails on \\u{70bc', '\\u{70bc', Context.OptionsNext);
  fail('fails on \\u{70', '\\u{70', Context.OptionsNext);
  fail('fails on \\u104', '\\u104', Context.Empty);
  fail('fails on \\u{10401', '\\u{10401', Context.Empty);
  fail('fails on \\u104', '\\u104', Context.Empty);
  fail('fails on \\u{!', '\\u{!', Context.Empty);
  fail('fails on \\u{}', '\\u{}', Context.Empty);
  fail('fails on \\u}', '\\u}', Context.Empty);
  fail('fails on \\}', '\\}', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\u{4fff', '\\u{4fff', Context.Empty);
  fail('fails on \\u{4ff', '\\u{4ff', Context.Empty);
  fail('fails on a\\u{4fff', 'a\\u{4fff', Context.Empty);
  fail('fails on a\\u{4ff', 'a\\u{4ff', Context.Empty);
  fail('fails on \\u{!', '\\u{!', Context.Empty);
  fail('fails on \\u{}', '\\u{}', Context.Empty);
  fail('fails on \\u', '\\u', Context.Empty);
  fail('fails on \\8', '\\8', Context.Empty);
  fail('fails on \\9', '\\9', Context.Empty);
  fail('fails on \\', '\\', Context.Empty);
  fail('fails on \\u0', '\\u0', Context.Empty);
  fail('fails on \\u00', '\\u00', Context.Empty);
  fail('fails on \\u00Xvwxyz', '\\u00Xvwxyz', Context.Empty);
  fail('fails on \\u{10401', '\\u{10401', Context.Empty);
  fail('fails on \\u{110000}', '\\u{110000}', Context.Empty);
  //fail('fails on \\u0x11ffff', '\\u0x11ffff', Context.Empty);

  const tokens: Array<[Context, Token, string, string]> = [
    [Context.OptionsRaw, Token.Identifier, 'abc', 'abc'],
    [Context.OptionsRaw, Token.Identifier, 'ab_c', 'ab_c'],
    [Context.OptionsRaw, Token.Identifier, '$_abc', '$_abc'],
    [Context.OptionsRaw, Token.Identifier, '_$abc', '_$abc'],
    [Context.OptionsRaw, Token.Identifier, '$_123', '$_123'],
    [Context.OptionsRaw, Token.Identifier, '_123', '_123'],
    [Context.OptionsRaw, Token.Identifier, '$', '$'],
    [Context.OptionsRaw, Token.Identifier, '$_123abc', '$_123abc'],
    [Context.OptionsRaw, Token.Identifier, '$_abc123', '$_abc123'],
    [Context.OptionsRaw, Token.Identifier, 'a', 'a'],
    [Context.OptionsRaw, Token.Identifier, 'M5', 'M5'],
    [Context.OptionsRaw, Token.Identifier, '$A', '$A'],
    [Context.OptionsRaw, Token.Identifier, '__', '__'],
    [Context.OptionsRaw, Token.Identifier, '$x', '$x'],
    [Context.OptionsRaw, Token.Identifier, '$', '$'],
    [Context.OptionsRaw, Token.Identifier, '$$', '$$'],
    [Context.OptionsRaw, Token.Identifier, 'Ab', 'Ab'],
    [Context.OptionsRaw, Token.Identifier, 'Ab', 'Ab'],
    [Context.OptionsRaw, Token.Identifier, 'aBc', 'aBc'],
    [Context.OptionsRaw, Token.Identifier, 'aBC', 'aBC'],
    [Context.OptionsRaw, Token.Identifier, '_O', '_O'],
    [Context.OptionsRaw, Token.Identifier, 'x_y', 'x_y'],
    [Context.OptionsRaw, Token.Identifier, 'x1y1z1', 'x1y1z1'],
    [Context.OptionsRaw, Token.Identifier, 'a____123___b$', 'a____123___b$'],
    [Context.OptionsRaw, Token.Identifier, '𠮷野家', '𠮷野家'],
    [Context.OptionsRaw, Token.Identifier, 'CAN_NOT_BE_A_KEYWORD', 'CAN_NOT_BE_A_KEYWORD'],
    [Context.OptionsRaw, Token.Identifier, '/* skip */   $', '$'],
    [Context.OptionsRaw, Token.Identifier, '℘', '℘'],
    [Context.OptionsRaw, Token.Identifier, '℮', '℮'],
    [Context.OptionsRaw, Token.Identifier, 'a𐊧123', 'a𐊧123'],
    [Context.OptionsRaw, Token.Identifier, '\\u004C', 'L'],
    [Context.OptionsRaw, Token.Identifier, 'a᧚', 'a᧚'],
    [Context.OptionsRaw, Token.Identifier, '\\u{70}bc\\u{70}bc', 'pbcpbc'],
    [Context.OptionsRaw, Token.Identifier, 'a\\u{0000000000000000000071}c', 'aqc'],
    [Context.OptionsRaw, Token.Identifier, 'б', 'б'],
    [Context.OptionsRaw, Token.Identifier, 'ц', 'ц'],
    [Context.OptionsRaw, Token.Identifier, '\\u0431', 'б'],
    [Context.OptionsRaw, Token.Identifier, '\\u{413}', 'Г'],
    [Context.OptionsRaw, Token.Identifier, 'название', 'название'],
    [Context.OptionsRaw, Token.Identifier, 'دیوانه', 'دیوانه'],
    [Context.OptionsRaw, Token.Identifier, 'aᢆ', 'aᢆ'],
    [Context.OptionsRaw, Token.Identifier, 'a፰', 'a፰'],
    [Context.OptionsRaw, Token.Identifier, '$00xxx\\u0069\\u0524\\u{20BB7}', '$00xxxiԤη'],
    [Context.OptionsRaw, Token.Identifier, 'Ф', 'Ф'],
    [Context.OptionsRaw, Token.Identifier, '俿abc', '俿abc'],
    [Context.OptionsRaw, Token.Identifier, 'Ȁ', 'Ȁ'],
    [Context.OptionsRaw, Token.Identifier, '\\u{4fff}', '俿'],
    [Context.OptionsRaw, Token.Identifier, '\\u{1EE00}', '{Ȁ']
  ];

  for (const [ctx, token, op, res] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const parser = create(op);
      const found = scan(parser, ctx, op, op.length, 0, true, /* allowRegExp */ 0);
      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.length,
          line: parser.lineBase,
          value: parser.tokenValue,
          column: parser.index - parser.offset
        },
        {
          token: token,
          hasNext: false,
          value: res,
          line: 1,
          column: op.length
        }
      );
    });

    it(`scans '${op}' with more to go`, () => {
      const parser = create(`${op} rest`);
      const found = scan(parser, ctx, op, op.length, 0, true, /* allowRegExp */ 0);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.length,
          value: parser.tokenValue,
          line: parser.lineBase,
          column: parser.index - parser.offset
        },
        {
          token,
          hasNext: true,
          value: res,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
