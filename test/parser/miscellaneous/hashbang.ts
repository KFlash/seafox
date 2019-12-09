import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

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
        parseSource(`${arg}`, undefined, Context.Strict);
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
        parseSource(`${arg}`, undefined, Context.Strict);
      });
    });

    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.Empty);
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
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
