import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Statements - Do while', () => {
  for (const [source, ctx] of [
    ['do foo while (bar);', Context.OptionsDisableWebCompat],
    ['do async \n f(){}; while (y)', Context.OptionsDisableWebCompat],
    //['do async \n () => x; while(y)', Context.Empty],
    //['do async () \n => x; while(y)', Context.Empty],
    ['do let x = 1; while (false)', Context.Empty],
    ['do x, y while (z)', Context.Empty],
    ['do foo while (bar);', Context.Empty],
    ['do ()=>x while(c)', Context.Empty],
    [
      `do
    a
    b
  while(c);`,
      Context.Empty
    ],
    ['do let {} = y', Context.Empty],
    ['do debugger while(x) x', Context.Empty],
    ['do x: function s(){}while(y)', Context.OptionsDisableWebCompat],
    [
      `do throw function (v, h) {
      "use strict"
    } while ((""))`,
      Context.Empty
    ]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseSource(source as string, undefined, ctx as Context);
      });
    });
  }
});
