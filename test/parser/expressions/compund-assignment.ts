import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

function convertDecimalToBinary(digit: any, groups: boolean): string {
  let res = '';
  for (let i = 0, shifted = digit; i < 32; i++, res += String(shifted >>> 31), shifted <<= 1);
  // Makes a groups of 8 bits
  if (groups) res = res.replace(/\B(?=(.{8})+(?!.))/g, '_');
  return res;
}
console.log(convertDecimalToBinary(3080192, false));
