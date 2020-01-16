import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Miscellaneous - Escaped keywords', () => {
  for (const arg of [
    '(\\u0069mplements = 1);',
    'var impl\\u0065ments = 1;',
    'var { impl\\u0065ments  } = {};',
    '(\\u0069nterface = 1);',
    '({ def\\u0061ult: 0 })',
    '({ def\\u{61}ult: 0 })',
    'foo = {}; foo.def\\u{61}ult = 3;',
    'var int\\u0065rface = 1;',
    'var { int\\u0065rface  } = {};',
    '(p\\u0061ckage = 1);',
    'var packa\\u0067e = 1;',
    'var { packa\\u0067e  } = {};',
    '(p\\u0072ivate = 1);',
    'var p\\u0072ivate;',
    'var { p\\u0072ivate } = {};',
    '(prot\\u0065cted);',
    'var prot\\u0065cted = 1;',
    'var { prot\\u0065cted  } = {};',
    '(publ\\u0069c);',
    'var publ\\u0069c = 1;',
    'var { publ\\u0069c } = {};',
    '(st\\u0061tic);',
    'var st\\u0061tic = 1;',
    'var { st\\u0061tic } = {};',
    'l\\u0065t\na',
    // 'if (true) l\\u0065t: ;',
    'function l\\u0065t() { }',
    '(function l\\u0065t() { })',
    'async function l\\u0065t() { }',
    '(async function l\\u0065t() { })',
    '(class { get st\\u0061tic() {}})',
    '(class { set st\\u0061tic(x){}});',
    '(class { *st\\u0061tic() {}});',
    '(class { st\\u0061tic(){}});',
    '(class { static get st\\u0061tic(){}});',
    '(class { static set st\\u0061tic(x) {}});',
    'l\\u0065t => 42',
    '(\\u0061sync ())',
    'async l\\u0065t => 42',
    'function packag\\u0065() {}',
    'function impl\\u0065ments() {}',
    'function privat\\u0065() {}',
    '(y\\u0069eld);',
    'var impl\\u0065ments = 1;',
    'var { impl\\u0065ments  } = {};',
    '(\\u0069nterface = 1);',
    'var int\\u0065rface = 1;',
    'var { int\\u0065rface  } = {};',
    '(p\\u0061ckage = 1);',
    'var packa\\u0067e = 1;',
    'var { packa\\u0067e  } = {};',
    '(p\\u0072ivate = 1);',
    'var p\\u0072ivate;',
    'var { p\\u0072ivate } = {};',
    '(prot\\u0065cted);',
    'var prot\\u0065cted = 1;',
    'var { prot\\u0065cted  } = {};',
    '(publ\\u0069c);',
    'var C = class { get "def\\u{61}ult"() { return "get string"; } set "def\\u{61}ult"(param) { stringSet = param; } };',
    'var publ\\u0069c = 1;',
    'var { publ\\u0069c } = {};',
    '(st\\u0061tic);',
    'var st\\u0061tic = 1;',
    'var { st\\u0061tic } = {};',
    'var y\\u0069eld = 1;',
    'var { y\\u0069eld } = {};',
    'class aw\\u0061it {}',
    'aw\\u0061it: 1;',
    'function *a(){({yi\\u0065ld: 0})}',
    '\\u0061sync',
    'l\\u0065t\na',
    'l\\u0065t',
    `function a() {
      \\u0061sync
      p => {}
    }`,
    `(function a() {
      \\u0061sync
      p => {}
    })`,
    `async function a() {
      \\u0061sync
      p => {}
    }`
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }
});
