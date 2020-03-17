'use strict';

const expect = require('unexpected');

module.exports = (parse, getType) => generatorOptions => {
  console.log(generatorOptions);
  let ast;
  try {
    ast = parse(generatorOptions.code, {
      sourceType: generatorOptions.sourceType,
      webCompat: true
    });
  } catch (error) {
    return { error };
  }

  const type = getType ? getType({ sourceType: generatorOptions.sourceType }) : 'Program';

  try {
    expect(ast, 'to have own property', 'type', type);
  } catch (error) {
    return { error, artifacts: { 'ast.json': JSON.stringify(ast, null, 2) } };
  }
};
