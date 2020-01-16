import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - Comments', () => {
  for (const arg of [
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `;-->`,
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `/*
    */ the comment should not include these characters, regardless of AnnexB extensions -->`,
    `/*
      var
      /* x */
      = 1;
      */`
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}` as string, {
          impliedStrict: true
        });
      });
    });
  }
  for (const arg of [
    '#!\n',
    '#!\n1',
    '#!2\n',
    '#!2\r',
    '#! these characters should be treated as a comment',
    '#!',
    '#!\n/*\n\n*/',
    '#!---IGNORED---\n',
    '#!---IGNORED---\n',
    '#!---IGNORED---\r',
    '#!---IGNORED---\\xE2\\x80\\xA8',
    '#!---IGNORED---\\xE2\\x80\\xA9',
    // Hashbang comments should not be interpreted and should not generate DirectivePrologues
    '#!"use strict" with ({}) {}'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, {
          impliedStrict: true
        });
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
  for (const [source, ctx, expected] of [
    [
      `#!---IGNORED---\r`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        body: [],
        end: 16,
        loc: {
          end: {
            column: 0,
            line: 2
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ]
  ]) {
    it(source as string, () => {
      const parser = parseScript(source as string, {
        disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
        loc: ((ctx as any) & Context.OptionsLoc) !== 0
      });
      t.deepStrictEqual(parser, expected);
    });
  }
});
