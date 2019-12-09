// https://github.com/lydell/eslump#test-files

'use strict';

const cherow = require('../../dist/regneck.umd.js');
const testParser = require('./parser');
console.log(cherow);

function parse(code, generatorOptions) {
  const parseFunction = generatorOptions.sourceType === 'module' ? cherow.parseModule : cherow.parseScript;
  return parseFunction(code);
}

module.exports = testParser(parse);
