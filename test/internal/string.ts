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

  const tokens: Array<[Context, Token, string, string]> = [
    [Context.OptionsRaw, Token.StringLiteral, '"abc"', 'abc'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\123"', 'S'],
    [Context.OptionsRaw, Token.StringLiteral, '"12abc"', '12abc'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\7771"', '?71'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\0"', '\u0000'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{CDEF}"', '췯'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{10ffff}"', 'пϿ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.OptionsRaw | Context.Strict, Token.StringLiteral, '"\\0"', '\u0000'],
    [Context.OptionsRaw, Token.StringLiteral, '";"', ';'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\r"', '\r'],
    [Context.OptionsRaw, Token.StringLiteral, '""', ''],
    [Context.OptionsRaw, Token.StringLiteral, '"123"', '123'],
    [Context.OptionsRaw, Token.StringLiteral, '"true"', 'true'],
    [Context.OptionsRaw, Token.StringLiteral, '"a\\u0061\\x62\\143"', 'aabc'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\b\\f\\n\\r\\t\\va"', '\b\f\n\r\t\u000ba'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\05"', '\u0005'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{0f3b}"', '༻'],
    [Context.OptionsRaw, Token.StringLiteral, '"\
    "', '    '],

    // Russian letters
    [Context.OptionsRaw, Token.StringLiteral, '"\\б"', 'б'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\И"', 'И'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Й"', 'Й'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\К"', 'К'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Л"', 'Л'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\О"', 'О'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Ф"', 'Ф'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Ц"', 'Ц'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Ш"', 'Ш'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Э"', 'Э'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\ж"', 'ж'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\з"', 'з'],

    // Escaped letters
    [Context.OptionsRaw, Token.StringLiteral, '"\\b"', '\b'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\v"', '\v'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\t"', '\t'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\f"', '\f'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\j"', 'j'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\A"', 'A'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\t"', '\t'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\fsuffix"', '\fsuffix'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\Rsuffix"', 'Rsuffix'],
    [Context.OptionsRaw, Token.StringLiteral, '"prefix\\r\\n"', 'prefix\r\n'],

    // Unicode escape sequence

    [Context.OptionsRaw, Token.StringLiteral, '"\\u1000"', 'က'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0041"', 'A'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\uf2ff"', ''],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0123"', 'ģ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0123 postfix"', 'ģ postfix'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{89abc}"', 'Ȧʼ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{CDEF}"', '췯'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{0000000000000000000010ffff}"', 'пϿ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u{10ffff}"', 'пϿ'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0062"', 'b'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0410"', 'А'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0412"', 'В'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0419"', 'Й'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u042E"', 'Ю'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0432"', 'в'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0030"', '0'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0035"', '5'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u0003"', '\u0003'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\u180E"', '᠎'],

    // Escaped hex

    [Context.OptionsRaw, Token.StringLiteral, '"\\x01F"', '\u0001F'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x05B"', '\u0005B'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x0D3"', '\r3'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x088"', '\b8'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x34"', '4'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\xCd"', 'Í'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\xF0"', 'ð'],
    [
      Context.OptionsRaw,
      Token.StringLiteral,
      '"\\xF000111FEEEDDAAAB77777999344BBBCCD0"',
      'ð00111FEEEDDAAAB77777999344BBBCCD0'
    ],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x128"', '\u00128'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\xCd#"', 'Í#'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\xDe\\x00"', 'Þ\u0000'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\0x0061"', '\u0000x0061'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x41"', 'A'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x4A"', 'J'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x4F"', 'O'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\x69"', 'i'],

    // Escaped octals
    [Context.OptionsRaw, Token.StringLiteral, '"\\01"', '\u0001'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\04"', '\u0004'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\44444444444"', '$444444444'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\777777"', '?7777'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\052"', '*'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\08"', '\u00008'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\052"', '*'],
    [Context.OptionsRaw, Token.StringLiteral, '"Hello\\nworld"', 'Hello\nworld'],
    [Context.OptionsRaw, Token.StringLiteral, '"Hello\\312World"', 'HelloÊWorld'],
    [Context.OptionsRaw, Token.StringLiteral, '"Hello\\712World"', 'Hello92World'],
    [Context.OptionsRaw, Token.StringLiteral, '"Hello\\1World"', 'Hello\u0001World'],
    [Context.OptionsRaw, Token.StringLiteral, '"Hello\\02World"', 'Hello\u0002World'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\46"', '&'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\5*"', '\u0005*'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\10"', '\b'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\02"', '\u0002'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\02a"', '\u0002a'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\73"', ';'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\62a"', '2a'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\023"', '\u0013'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\7"', '\u0007'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\012"', '\n'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\126"', 'V'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\302"', 'Â'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\000"', '\u0000'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\104"', 'D'],
    [Context.OptionsRaw, Token.StringLiteral, '"\\221"', '']
  ];

  for (const [ctx, token, op, value] of tokens) {
    it(`scans '${op}' at the end`, () => {
      const parser = create(op);
      const found = scan(parser, ctx, op, op.length, 0, true, /* allowRegExp */ 0);

      t.deepEqual(
        {
          token: found,
          hasNext: parser.index < parser.length,
          line: parser.lineBase,
          value: parser.tokenValue,
          raw: parser.source.slice(parser.start, parser.index),
          column: parser.index - parser.offset
        },
        {
          token: token,
          hasNext: false,
          value: value,
          raw: op,
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
          hasNext: parser.index < parser.source.length,
          raw: parser.source.slice(parser.start, parser.index),
          line: parser.lineBase,
          column: parser.index - parser.offset
        },
        {
          token,
          hasNext: true,
          raw: op,
          line: 1,
          column: op.length
        }
      );
    });
  }
});
