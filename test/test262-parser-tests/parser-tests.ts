import { parseScript, parseModule } from '../../src/seafox';
import { readdirSync, readFileSync } from 'fs';
import * as t from 'assert';

// Note! Some tests are skipped because they are either invalid
// or should fail only in strict mode or module goal and I don't
// don't test for that.
//
// AnnexB is on by default.

const Test262Dir = 'node_modules/test262-parser-tests';

const expectations = {
  pass: ['1a1c717109ab67e1.js', '206ebb4e67a6daa9.js', '4ad6e3a59e27e9b1.js', 'fc020c065098cbd5.js'],
  explicit: ['1a1c717109ab67e1.js', '206ebb4e67a6daa9.js', 'fc020c065098cbd5.js', '4ad6e3a59e27e9b1.js'],
  fail: [
    'e4a43066905a597b.js',
    'bf49ec8d96884562.js',
    '8af69d8f15295ed2.js',
    '84633c379e4010bf.js',
    '78c215fabdf13bae.js',
    'f4467d719dcee086.js',
    '66e383bfd18e66ab.js',
    '647e21f8f157c338.js',
    '7b876ca5139f1ca8.js',
    'e3fbcf63d7e43ead.js',
    'fd2a45941e114896.js',
    '89036b2edb64c00c.js',
    'abe5f49acb8e132a.js',
    'de15bc95fed5eebf.module.js'
  ],
  early: [
    'ec31fa5e521c5df4.js',
    'e262ea7682c36f92.js',
    'be7329119eaa3d47.js',
    '4de83a7417cd30dd.js',
    '1aff49273f3e3a98.js',
    '12a74c60f52a60de.js',
    '0f5f47108da5c34e.js',
    '2fcc5b7e8d0ff3c9.js',
    '4435f19f2a2a24bd.js'
  ]
};

const parse = (src: string, module: boolean) => (module ? parseModule : parseScript)(src);

const isModule = (val: string) => /\.module\.js/.test(val);

describe('Test262 Parser tests', () => {
  describe('Pass', () => {
    for (const f of readdirSync(`${Test262Dir}/pass`)) {
      if (expectations.pass.indexOf(f) !== -1) continue;
      it(`Should pass -  [${f}]`, () => {
        t.doesNotThrow(() => {
          parse(readFileSync(`${Test262Dir}/pass/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });

  describe('Pass explicit', () => {
    for (const f of readdirSync(`${Test262Dir}/pass-explicit`)) {
      if (expectations.explicit.indexOf(f) !== -1) continue;
      it(`Should pass -  [${f}]`, () => {
        t.doesNotThrow(() => {
          parse(readFileSync(`${Test262Dir}/pass-explicit/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });

  describe('Fail', () => {
    for (const f of readdirSync(`${Test262Dir}/fail`)) {
      if (expectations.fail.indexOf(f) !== -1) continue;
      it(`Should fail on - [${f}]`, () => {
        t.throws(() => {
          parse(readFileSync(`${Test262Dir}/fail/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });

  describe('Early errors', () => {
    for (const f of readdirSync(`${Test262Dir}/early`)) {
      if (expectations.early.indexOf(f) !== -1) continue;
      it(`should fail on early error [${f}]`, () => {
        t.throws(() => {
          parse(readFileSync(`${Test262Dir}/early/${f}`, 'utf8'), isModule(f));
        });
      });
    }
  });
});
