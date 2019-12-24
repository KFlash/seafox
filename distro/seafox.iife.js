var seafox = (function (exports) {
  'use strict';

  function create(source) {
      return {
          source,
          flags: 0,
          index: 0,
          start: 0,
          endIndex: 0,
          lastColumn: 0,
          column: 0,
          line: 0,
          lineBase: 1,
          offset: 0,
          length: source.length,
          prevLinebase: 1,
          isUnicodeEscape: 0,
          token: 16777216,
          newLine: 0,
          tokenValue: undefined,
          tokenRaw: '',
          tokenRegExp: undefined,
          lastChar: 0,
          assignable: 1
      };
  }

  const unicodeLookup = ((compressed, lookup) => {
      const result = new Uint32Array(139264);
      let index = 0;
      let subIndex = 0;
      while (index < 2341) {
          const inst = compressed[index++];
          if (inst < 0) {
              subIndex -= inst;
          }
          else {
              let code = compressed[index++];
              if (inst & 2)
                  code = lookup[code];
              if (inst & 1) {
                  result.fill(code, subIndex, (subIndex += compressed[index++]));
              }
              else {
                  result[subIndex++] = code;
              }
          }
      }
      return result;
  })([
      -1,
      2,
      27,
      2,
      28,
      2,
      5,
      -1,
      0,
      77595648,
      3,
      46,
      2,
      3,
      0,
      14,
      2,
      57,
      2,
      58,
      3,
      0,
      3,
      0,
      3168796671,
      0,
      4294956992,
      2,
      1,
      2,
      0,
      2,
      59,
      3,
      0,
      4,
      0,
      4294966523,
      3,
      0,
      4,
      2,
      16,
      2,
      60,
      2,
      0,
      0,
      4294836735,
      0,
      3221225471,
      0,
      4294901942,
      2,
      61,
      0,
      134152192,
      3,
      0,
      2,
      0,
      4294951935,
      3,
      0,
      2,
      0,
      2683305983,
      0,
      2684354047,
      2,
      17,
      2,
      0,
      0,
      4294961151,
      3,
      0,
      2,
      2,
      20,
      2,
      0,
      0,
      608174079,
      2,
      0,
      2,
      128,
      2,
      6,
      2,
      62,
      -1,
      2,
      64,
      2,
      25,
      2,
      1,
      3,
      0,
      3,
      0,
      4294901711,
      2,
      41,
      0,
      4089839103,
      0,
      2961209759,
      0,
      1342439375,
      0,
      4294543342,
      0,
      3547201023,
      0,
      1577204103,
      0,
      4194240,
      0,
      4294688750,
      2,
      2,
      0,
      80831,
      0,
      4261478351,
      0,
      4294549486,
      2,
      2,
      0,
      2965387679,
      0,
      196559,
      0,
      3594373100,
      0,
      3288319768,
      0,
      8469959,
      0,
      65472,
      0,
      4294828031,
      0,
      3825204735,
      0,
      123747807,
      0,
      65487,
      2,
      3,
      0,
      4092591615,
      0,
      1080049119,
      0,
      458703,
      2,
      3,
      2,
      0,
      0,
      2163244511,
      0,
      4227923919,
      0,
      4236247020,
      2,
      69,
      0,
      4284449919,
      0,
      851904,
      2,
      4,
      2,
      11,
      0,
      67076095,
      -1,
      2,
      70,
      0,
      1073741743,
      0,
      4093591391,
      -1,
      0,
      50331649,
      0,
      3265266687,
      2,
      35,
      0,
      4294844415,
      0,
      4278190047,
      2,
      22,
      2,
      126,
      -1,
      3,
      0,
      2,
      2,
      32,
      2,
      0,
      2,
      9,
      2,
      0,
      2,
      14,
      2,
      15,
      3,
      0,
      10,
      2,
      72,
      2,
      0,
      2,
      73,
      2,
      74,
      2,
      75,
      2,
      0,
      2,
      76,
      2,
      0,
      2,
      10,
      0,
      261632,
      2,
      19,
      3,
      0,
      2,
      2,
      12,
      2,
      4,
      3,
      0,
      18,
      2,
      77,
      2,
      5,
      3,
      0,
      2,
      2,
      78,
      0,
      2088959,
      2,
      30,
      2,
      8,
      0,
      909311,
      3,
      0,
      2,
      0,
      814743551,
      2,
      43,
      0,
      67057664,
      3,
      0,
      2,
      2,
      42,
      2,
      0,
      2,
      31,
      2,
      0,
      2,
      18,
      2,
      7,
      0,
      268374015,
      2,
      29,
      2,
      51,
      2,
      0,
      2,
      79,
      0,
      134153215,
      -1,
      2,
      6,
      2,
      0,
      2,
      7,
      0,
      2684354559,
      0,
      67044351,
      0,
      1073676416,
      -2,
      3,
      0,
      2,
      2,
      44,
      0,
      1046528,
      3,
      0,
      3,
      2,
      8,
      2,
      0,
      2,
      52,
      0,
      4294960127,
      2,
      9,
      2,
      40,
      2,
      10,
      0,
      4294377472,
      2,
      11,
      3,
      0,
      7,
      0,
      4227858431,
      3,
      0,
      8,
      2,
      12,
      2,
      0,
      2,
      81,
      2,
      9,
      2,
      0,
      2,
      82,
      2,
      83,
      2,
      84,
      -1,
      2,
      122,
      0,
      1048577,
      2,
      85,
      2,
      13,
      -1,
      2,
      13,
      0,
      131042,
      2,
      86,
      2,
      87,
      2,
      88,
      2,
      0,
      2,
      36,
      -83,
      2,
      0,
      2,
      54,
      2,
      7,
      3,
      0,
      4,
      0,
      1046559,
      2,
      0,
      2,
      14,
      2,
      0,
      0,
      2147516671,
      2,
      23,
      3,
      89,
      2,
      2,
      0,
      -16,
      2,
      90,
      0,
      524222462,
      2,
      4,
      2,
      0,
      0,
      4269801471,
      2,
      4,
      2,
      0,
      2,
      15,
      2,
      80,
      2,
      16,
      3,
      0,
      2,
      2,
      49,
      2,
      11,
      -1,
      2,
      17,
      -16,
      3,
      0,
      205,
      2,
      18,
      -2,
      3,
      0,
      655,
      2,
      19,
      3,
      0,
      36,
      2,
      71,
      -1,
      2,
      17,
      2,
      9,
      3,
      0,
      8,
      2,
      92,
      2,
      119,
      2,
      0,
      0,
      3220242431,
      3,
      0,
      3,
      2,
      20,
      2,
      21,
      2,
      93,
      3,
      0,
      2,
      2,
      94,
      2,
      0,
      2,
      95,
      2,
      21,
      2,
      0,
      2,
      26,
      2,
      0,
      2,
      8,
      3,
      0,
      2,
      0,
      67043391,
      0,
      3909091327,
      2,
      0,
      2,
      24,
      2,
      8,
      2,
      22,
      3,
      0,
      2,
      0,
      67076097,
      2,
      7,
      2,
      0,
      2,
      23,
      0,
      67059711,
      0,
      4236247039,
      3,
      0,
      2,
      0,
      939524103,
      0,
      8191999,
      2,
      98,
      2,
      99,
      2,
      15,
      2,
      33,
      3,
      0,
      3,
      0,
      67057663,
      3,
      0,
      349,
      2,
      100,
      2,
      101,
      2,
      6,
      -264,
      3,
      0,
      11,
      2,
      24,
      3,
      0,
      2,
      2,
      34,
      -1,
      0,
      3774349439,
      2,
      102,
      2,
      103,
      3,
      0,
      2,
      2,
      20,
      2,
      25,
      3,
      0,
      10,
      2,
      9,
      2,
      17,
      2,
      0,
      2,
      47,
      2,
      0,
      2,
      26,
      2,
      104,
      2,
      19,
      0,
      1638399,
      0,
      57344,
      2,
      105,
      3,
      0,
      3,
      2,
      22,
      2,
      27,
      2,
      28,
      2,
      5,
      2,
      29,
      2,
      0,
      2,
      7,
      2,
      106,
      -1,
      2,
      107,
      2,
      108,
      2,
      109,
      -1,
      3,
      0,
      3,
      2,
      11,
      -2,
      2,
      0,
      2,
      30,
      -3,
      0,
      536870912,
      -4,
      2,
      22,
      2,
      0,
      2,
      38,
      0,
      1,
      2,
      0,
      2,
      63,
      2,
      31,
      2,
      11,
      2,
      9,
      2,
      0,
      2,
      110,
      -1,
      3,
      0,
      4,
      2,
      9,
      2,
      32,
      2,
      111,
      2,
      6,
      2,
      0,
      2,
      33,
      2,
      0,
      2,
      50,
      -4,
      3,
      0,
      9,
      2,
      23,
      2,
      18,
      2,
      26,
      -4,
      2,
      112,
      2,
      113,
      2,
      18,
      2,
      23,
      2,
      7,
      -2,
      2,
      114,
      2,
      18,
      2,
      34,
      -2,
      2,
      0,
      2,
      115,
      -2,
      0,
      4277137519,
      0,
      2269118463,
      -1,
      3,
      22,
      2,
      -1,
      2,
      35,
      2,
      39,
      2,
      0,
      3,
      18,
      2,
      2,
      37,
      2,
      20,
      -3,
      3,
      0,
      2,
      2,
      36,
      -1,
      2,
      0,
      2,
      37,
      2,
      0,
      2,
      37,
      2,
      0,
      2,
      48,
      -14,
      2,
      22,
      2,
      45,
      2,
      38,
      -4,
      2,
      23,
      3,
      0,
      2,
      2,
      39,
      0,
      2147549120,
      2,
      0,
      2,
      11,
      2,
      17,
      2,
      134,
      2,
      0,
      2,
      53,
      0,
      4294901872,
      0,
      5242879,
      3,
      0,
      2,
      0,
      402595359,
      -1,
      2,
      118,
      0,
      1090519039,
      -2,
      2,
      120,
      2,
      40,
      2,
      0,
      0,
      67045375,
      2,
      41,
      0,
      4226678271,
      0,
      3766565279,
      0,
      2039759,
      -4,
      3,
      0,
      2,
      0,
      3288270847,
      -1,
      3,
      0,
      2,
      0,
      67043519,
      -5,
      2,
      0,
      0,
      4282384383,
      0,
      1056964609,
      -1,
      3,
      0,
      2,
      0,
      67043345,
      -1,
      2,
      0,
      2,
      42,
      2,
      43,
      -1,
      2,
      10,
      2,
      44,
      -6,
      2,
      0,
      2,
      11,
      -3,
      3,
      0,
      2,
      0,
      2147484671,
      -5,
      2,
      123,
      0,
      4244635647,
      0,
      27,
      2,
      0,
      2,
      7,
      2,
      45,
      2,
      0,
      2,
      65,
      -1,
      2,
      0,
      2,
      42,
      -8,
      2,
      55,
      2,
      46,
      0,
      67043329,
      2,
      124,
      2,
      47,
      0,
      8388351,
      -2,
      2,
      125,
      0,
      3028287487,
      2,
      48,
      2,
      127,
      0,
      33259519,
      2,
      43,
      -9,
      2,
      23,
      -8,
      3,
      0,
      28,
      2,
      34,
      -3,
      3,
      0,
      3,
      2,
      49,
      3,
      0,
      6,
      2,
      50,
      -85,
      3,
      0,
      33,
      2,
      49,
      -126,
      3,
      0,
      18,
      2,
      39,
      -269,
      3,
      0,
      17,
      2,
      42,
      2,
      7,
      2,
      43,
      -2,
      2,
      17,
      2,
      51,
      2,
      0,
      2,
      23,
      0,
      67043343,
      2,
      129,
      2,
      19,
      -21,
      3,
      0,
      2,
      -4,
      3,
      0,
      2,
      0,
      4294936575,
      2,
      0,
      0,
      4294934783,
      -2,
      2,
      130,
      3,
      0,
      191,
      2,
      52,
      3,
      0,
      23,
      2,
      37,
      -296,
      3,
      0,
      8,
      2,
      7,
      -1,
      2,
      131,
      2,
      132,
      3,
      0,
      11,
      2,
      6,
      -72,
      3,
      0,
      3,
      2,
      133,
      0,
      1677656575,
      -166,
      0,
      4161266656,
      0,
      4071,
      0,
      15360,
      -4,
      0,
      28,
      -13,
      3,
      0,
      2,
      2,
      53,
      2,
      0,
      2,
      135,
      2,
      136,
      2,
      56,
      2,
      0,
      2,
      137,
      2,
      138,
      2,
      139,
      3,
      0,
      10,
      2,
      140,
      2,
      141,
      2,
      15,
      3,
      53,
      2,
      3,
      54,
      2,
      3,
      55,
      2,
      0,
      4294954999,
      2,
      0,
      -16,
      2,
      0,
      2,
      91,
      2,
      0,
      0,
      2105343,
      0,
      4160749584,
      0,
      65534,
      -42,
      0,
      4194303871,
      0,
      2011,
      -6,
      2,
      0,
      0,
      1073684479,
      0,
      17407,
      -11,
      2,
      0,
      2,
      34,
      -40,
      3,
      0,
      6,
      0,
      8323103,
      -1,
      3,
      0,
      2,
      2,
      44,
      -37,
      2,
      56,
      2,
      144,
      2,
      145,
      2,
      146,
      2,
      147,
      2,
      148,
      -138,
      3,
      0,
      1334,
      2,
      23,
      -1,
      3,
      0,
      129,
      2,
      30,
      3,
      0,
      6,
      2,
      9,
      3,
      0,
      180,
      2,
      149,
      3,
      0,
      233,
      0,
      1,
      -96,
      3,
      0,
      16,
      2,
      9,
      -22583,
      3,
      0,
      7,
      2,
      19,
      -6130,
      3,
      5,
      2,
      -1,
      0,
      69207040,
      3,
      46,
      2,
      3,
      0,
      14,
      2,
      57,
      2,
      58,
      -3,
      0,
      3168731136,
      0,
      4294956864,
      2,
      1,
      2,
      0,
      2,
      59,
      3,
      0,
      4,
      0,
      4294966275,
      3,
      0,
      4,
      2,
      16,
      2,
      60,
      2,
      0,
      2,
      36,
      -1,
      2,
      17,
      2,
      61,
      -1,
      2,
      0,
      2,
      62,
      0,
      4294885376,
      3,
      0,
      2,
      0,
      3145727,
      0,
      2617294944,
      0,
      4294770688,
      2,
      19,
      2,
      63,
      3,
      0,
      2,
      0,
      131135,
      2,
      96,
      0,
      70256639,
      0,
      71303167,
      0,
      272,
      2,
      42,
      2,
      62,
      -1,
      2,
      64,
      -2,
      2,
      97,
      2,
      65,
      0,
      4278255616,
      0,
      4294836227,
      0,
      4294549473,
      0,
      600178175,
      0,
      2952806400,
      0,
      268632067,
      0,
      4294543328,
      0,
      57540095,
      0,
      1577058304,
      0,
      1835008,
      0,
      4294688736,
      2,
      66,
      2,
      67,
      0,
      33554435,
      2,
      121,
      2,
      66,
      0,
      2952790016,
      0,
      131075,
      0,
      3594373096,
      0,
      67094296,
      2,
      67,
      -1,
      2,
      68,
      0,
      603979263,
      0,
      117440512,
      0,
      3,
      0,
      4294828001,
      0,
      602930687,
      0,
      1073741824,
      0,
      393219,
      2,
      68,
      0,
      671088639,
      0,
      2154840064,
      0,
      4227858435,
      0,
      4236247008,
      2,
      69,
      2,
      39,
      -1,
      2,
      4,
      0,
      917503,
      2,
      39,
      -1,
      2,
      70,
      0,
      537788335,
      0,
      4026531935,
      -1,
      0,
      1,
      -1,
      2,
      35,
      2,
      71,
      0,
      7936,
      -3,
      2,
      0,
      0,
      2147485695,
      0,
      1010761728,
      0,
      4292984930,
      0,
      16387,
      2,
      0,
      2,
      14,
      2,
      15,
      3,
      0,
      10,
      2,
      72,
      2,
      0,
      2,
      73,
      2,
      74,
      2,
      75,
      2,
      0,
      2,
      76,
      2,
      0,
      2,
      11,
      -1,
      2,
      19,
      3,
      0,
      2,
      2,
      12,
      2,
      4,
      3,
      0,
      18,
      2,
      77,
      2,
      5,
      3,
      0,
      2,
      2,
      78,
      0,
      253951,
      3,
      20,
      2,
      0,
      122879,
      2,
      0,
      2,
      8,
      0,
      276824064,
      -2,
      3,
      0,
      2,
      2,
      42,
      2,
      0,
      0,
      4294903295,
      2,
      0,
      2,
      18,
      2,
      7,
      -1,
      2,
      17,
      2,
      51,
      2,
      0,
      2,
      79,
      2,
      43,
      -1,
      2,
      23,
      2,
      0,
      2,
      30,
      -2,
      0,
      128,
      -2,
      2,
      80,
      2,
      8,
      0,
      4064,
      -1,
      2,
      117,
      0,
      4227907585,
      2,
      0,
      2,
      116,
      2,
      0,
      2,
      50,
      0,
      4227915776,
      2,
      9,
      2,
      40,
      2,
      10,
      -1,
      0,
      74440192,
      3,
      0,
      6,
      -2,
      3,
      0,
      8,
      2,
      12,
      2,
      0,
      2,
      81,
      2,
      9,
      2,
      0,
      2,
      82,
      2,
      83,
      2,
      84,
      -3,
      2,
      85,
      2,
      13,
      -3,
      2,
      86,
      2,
      87,
      2,
      88,
      2,
      0,
      2,
      36,
      -83,
      2,
      0,
      2,
      54,
      2,
      7,
      3,
      0,
      4,
      0,
      817183,
      2,
      0,
      2,
      14,
      2,
      0,
      0,
      33023,
      2,
      23,
      3,
      89,
      2,
      -17,
      2,
      90,
      0,
      524157950,
      2,
      4,
      2,
      0,
      2,
      91,
      2,
      4,
      2,
      0,
      2,
      15,
      2,
      80,
      2,
      16,
      3,
      0,
      2,
      2,
      49,
      2,
      11,
      -1,
      2,
      17,
      -16,
      3,
      0,
      205,
      2,
      18,
      -2,
      3,
      0,
      655,
      2,
      19,
      3,
      0,
      36,
      2,
      71,
      -1,
      2,
      17,
      2,
      9,
      3,
      0,
      8,
      2,
      92,
      0,
      3072,
      2,
      0,
      0,
      2147516415,
      2,
      9,
      3,
      0,
      2,
      2,
      19,
      2,
      21,
      2,
      93,
      3,
      0,
      2,
      2,
      94,
      2,
      0,
      2,
      95,
      2,
      21,
      0,
      4294965179,
      0,
      7,
      2,
      0,
      2,
      8,
      2,
      93,
      2,
      8,
      -1,
      0,
      1761345536,
      2,
      96,
      0,
      4294901823,
      2,
      39,
      2,
      22,
      2,
      97,
      2,
      37,
      2,
      150,
      0,
      2080440287,
      2,
      0,
      2,
      36,
      2,
      142,
      0,
      3296722943,
      2,
      0,
      0,
      1046675455,
      0,
      939524101,
      0,
      1837055,
      2,
      98,
      2,
      99,
      2,
      15,
      2,
      33,
      3,
      0,
      3,
      0,
      7,
      3,
      0,
      349,
      2,
      100,
      2,
      101,
      2,
      6,
      -264,
      3,
      0,
      11,
      2,
      24,
      3,
      0,
      2,
      2,
      34,
      -1,
      0,
      2700607615,
      2,
      102,
      2,
      103,
      3,
      0,
      2,
      2,
      20,
      2,
      25,
      3,
      0,
      10,
      2,
      9,
      2,
      17,
      2,
      0,
      2,
      47,
      2,
      0,
      2,
      26,
      2,
      104,
      -3,
      2,
      105,
      3,
      0,
      3,
      2,
      22,
      -1,
      3,
      5,
      2,
      2,
      29,
      2,
      0,
      2,
      7,
      2,
      106,
      -1,
      2,
      107,
      2,
      108,
      2,
      109,
      -1,
      3,
      0,
      3,
      2,
      11,
      -2,
      2,
      0,
      2,
      30,
      -8,
      2,
      22,
      2,
      0,
      2,
      38,
      -1,
      2,
      0,
      2,
      63,
      2,
      31,
      2,
      18,
      2,
      9,
      2,
      0,
      2,
      110,
      -1,
      3,
      0,
      4,
      2,
      9,
      2,
      17,
      2,
      111,
      2,
      6,
      2,
      0,
      2,
      33,
      2,
      0,
      2,
      50,
      -4,
      3,
      0,
      9,
      2,
      23,
      2,
      18,
      2,
      26,
      -4,
      2,
      112,
      2,
      113,
      2,
      18,
      2,
      23,
      2,
      7,
      -2,
      2,
      114,
      2,
      18,
      2,
      34,
      -2,
      2,
      0,
      2,
      115,
      -2,
      0,
      4277075969,
      2,
      18,
      -1,
      3,
      22,
      2,
      -1,
      2,
      35,
      2,
      143,
      2,
      0,
      3,
      18,
      2,
      2,
      37,
      2,
      20,
      -3,
      3,
      0,
      2,
      2,
      36,
      -1,
      2,
      0,
      2,
      37,
      2,
      0,
      2,
      37,
      2,
      0,
      2,
      50,
      -14,
      2,
      22,
      2,
      45,
      2,
      116,
      -4,
      2,
      23,
      2,
      117,
      2,
      52,
      -2,
      2,
      117,
      2,
      19,
      2,
      17,
      2,
      36,
      2,
      117,
      2,
      39,
      0,
      4294901776,
      0,
      4718591,
      2,
      117,
      2,
      37,
      0,
      335544350,
      -1,
      2,
      118,
      2,
      119,
      -2,
      2,
      120,
      2,
      40,
      2,
      7,
      -1,
      2,
      121,
      2,
      66,
      0,
      3758161920,
      0,
      3,
      -4,
      2,
      0,
      2,
      30,
      0,
      2147485568,
      -1,
      2,
      0,
      2,
      19,
      0,
      176,
      -5,
      2,
      0,
      2,
      49,
      0,
      251658240,
      -1,
      2,
      0,
      2,
      19,
      0,
      16,
      -1,
      2,
      0,
      0,
      16779263,
      -2,
      2,
      11,
      -7,
      2,
      0,
      2,
      119,
      -3,
      3,
      0,
      2,
      2,
      122,
      -5,
      2,
      123,
      2,
      38,
      0,
      10,
      0,
      4294965249,
      0,
      67633151,
      0,
      4026597376,
      2,
      0,
      0,
      536871935,
      -1,
      2,
      0,
      2,
      42,
      -8,
      2,
      55,
      2,
      49,
      0,
      1,
      2,
      124,
      2,
      19,
      -3,
      2,
      125,
      2,
      38,
      2,
      126,
      2,
      127,
      0,
      16778239,
      -10,
      2,
      37,
      -8,
      3,
      0,
      28,
      2,
      34,
      -3,
      3,
      0,
      3,
      2,
      49,
      3,
      0,
      6,
      2,
      50,
      -85,
      3,
      0,
      33,
      2,
      49,
      -126,
      3,
      0,
      18,
      2,
      39,
      -269,
      3,
      0,
      17,
      2,
      42,
      2,
      7,
      -3,
      2,
      17,
      2,
      128,
      2,
      0,
      2,
      19,
      2,
      50,
      2,
      129,
      2,
      19,
      -21,
      3,
      0,
      2,
      -4,
      3,
      0,
      2,
      0,
      67583,
      -1,
      2,
      25,
      -2,
      2,
      130,
      3,
      0,
      191,
      2,
      52,
      3,
      0,
      23,
      2,
      37,
      -296,
      3,
      0,
      8,
      2,
      7,
      -1,
      2,
      131,
      2,
      132,
      3,
      0,
      11,
      2,
      6,
      -72,
      3,
      0,
      3,
      2,
      133,
      2,
      134,
      -187,
      3,
      0,
      2,
      2,
      53,
      2,
      0,
      2,
      135,
      2,
      136,
      2,
      56,
      2,
      0,
      2,
      137,
      2,
      138,
      2,
      139,
      3,
      0,
      10,
      2,
      140,
      2,
      141,
      2,
      15,
      3,
      53,
      2,
      3,
      54,
      2,
      3,
      55,
      2,
      2,
      142,
      -73,
      2,
      0,
      0,
      1065361407,
      0,
      16384,
      -11,
      2,
      0,
      2,
      119,
      -40,
      3,
      0,
      6,
      2,
      143,
      -1,
      3,
      0,
      2,
      0,
      2063,
      -37,
      2,
      56,
      2,
      144,
      2,
      145,
      2,
      146,
      2,
      147,
      2,
      148,
      -138,
      3,
      0,
      1334,
      2,
      23,
      -1,
      3,
      0,
      129,
      2,
      30,
      3,
      0,
      6,
      2,
      9,
      3,
      0,
      180,
      2,
      149,
      3,
      0,
      233,
      0,
      1,
      -96,
      3,
      0,
      16,
      2,
      9,
      -28719,
      0,
      9216,
      -256,
      0,
      768,
      -34562,
      0,
      32,
      0,
      1,
      -174,
      0,
      1,
      -75,
      0,
      9727,
      2,
      150,
      2,
      122,
      -125,
      0,
      1,
      -1654,
      2,
      122,
      -7,
      2,
      150,
      -32768
  ], [
      4294967295,
      4294967291,
      4092460543,
      4294828015,
      4294967294,
      134217726,
      268435455,
      2147483647,
      1048575,
      1073741823,
      3892314111,
      134217727,
      1061158911,
      536805376,
      4294910143,
      4160749567,
      4294901759,
      4294901760,
      4194303,
      65535,
      262143,
      4286578688,
      536870911,
      8388607,
      4294918143,
      4294443008,
      255,
      67043328,
      2281701374,
      4294967232,
      2097151,
      4294903807,
      4294902783,
      4294902015,
      67108863,
      4294967039,
      511,
      524287,
      131071,
      127,
      4294902271,
      4294549487,
      33554431,
      1023,
      67047423,
      4294901888,
      4286578687,
      4294770687,
      67043583,
      32767,
      15,
      2047999,
      16777215,
      4292870143,
      4294934527,
      4294966783,
      4294967279,
      262083,
      20511,
      4290772991,
      41943039,
      493567,
      2047,
      4294959104,
      1071644671,
      603979775,
      602799615,
      65536,
      4294828000,
      805044223,
      4294965206,
      8191,
      1031749119,
      4294917631,
      2134769663,
      4286578493,
      4282253311,
      4294942719,
      33540095,
      4294905855,
      4294967264,
      2868854591,
      1608515583,
      265232348,
      534519807,
      2147614720,
      1060109444,
      4093640016,
      17376,
      2139062143,
      224,
      4169138175,
      4294909951,
      4294967292,
      4294965759,
      124,
      4294966272,
      4294967280,
      8289918,
      4294934399,
      4294901775,
      4294965375,
      1602223615,
      4294967259,
      268369920,
      4292804608,
      486341884,
      4294963199,
      3087007615,
      1073692671,
      4128527,
      4279238655,
      4294966591,
      2445279231,
      3670015,
      3238002687,
      63,
      4294967288,
      4294705151,
      4095,
      3221208447,
      4294549472,
      2147483648,
      4294966527,
      4294705152,
      4294966143,
      64,
      4294966719,
      16383,
      3774873592,
      11,
      458752,
      4294902000,
      536807423,
      67043839,
      3758096383,
      3959414372,
      3755993023,
      2080374783,
      4294835295,
      4294967103,
      4160749565,
      4087,
      31,
      184024726,
      2862017156,
      1593309078,
      268434431,
      268434414,
      4294901763,
      32768
  ]);

  const errorMessages = {
      [92]: "Illegal 'use strict' directive in function with non-simple parameter list",
      [93]: 'Octal literals are not allowed in strict mode',
      [94]: 'StrictInvalidLetInExprPos',
      [91]: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
      [89]: 'Member access on super must be in a method',
      [90]: 'Calls to super must be in the "constructor" method of a class expression or class declaration that has a superclass',
      [89]: 'Member access on super must be in a method',
      [88]: 'new.target expression is not allowed here',
      [87]: '`let` declaration not allowed here and `let` cannot be a regular var name in strict mode',
      [82]: 'In strict mode code or without web compability enabled, functions can only be declared at top level or inside a block',
      [83]: 'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
      [84]: "Class declaration can't appear in single-statement context",
      [80]: "Undefined label '%0'",
      [81]: 'Illegal continue statement',
      [26]: 'Unexpected strict mode reserved word',
      [27]: 'Unexpected eval or arguments in strict mode',
      [28]: 'Invalid keyword',
      [29]: "'A lexical declaration can't define a 'let' binding",
      [30]: 'Await is only valid in async functions',
      [31]: "'%0' may not be used as an identifier in this context",
      [69]: 'Invalid left-hand side in for-%0',
      [68]: 'Property name __proto__ appears more than once in object literal',
      [79]: 'Async functions can only be declared at the top level or inside a block',
      [0]: 'Unexpected token',
      [86]: 'Unexpected token %0',
      [78]: "No line break is allowed after '=>'",
      [85]: 'Illegal break statement',
      [76]: 'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
      [77]: 'Calling delete on expression not allowed in strict mode',
      [75]: "Expected '=>'",
      [21]: 'Illegal return statement',
      [73]: '`=>` is an invalid assignment target',
      [74]: 'Async arrow can not be followed by new expression',
      [72]: 'Invalid left-hand side in async arrow',
      [71]: 'The left-hand side of the arrow can only be destructed through assignment',
      [70]: 'The binding declaration is not destructible',
      [64]: 'Pattern can not have a tail',
      [56]: 'Invalid destructuring assignment target',
      [65]: 'Can not have a `yield` expression on the left side of a ternary',
      [66]: 'Invalid increment/decrement operand',
      [58]: 'Invalid shorthand property initializer',
      [62]: 'Invalid left-hand side assignment to a destructible right-hand side',
      [60]: 'Invalid left-hand side in assignment',
      [67]: 'The rest argument must the be last parameter',
      [63]: 'Invalid rest argument',
      [61]: 'Encountered invalid input after spread/rest argument',
      [59]: 'A computed property name must be followed by a colon or paren',
      [57]: 'Async methods are a restricted production and cannot have a newline following it',
      [55]: "Classes may not have a static property named 'prototype'",
      [54]: 'Duplicate constructor method in class',
      [53]: 'Class constructor may not be a %0',
      [52]: 'Invalid key token',
      [1]: 'Unexpected identifier after numeric literal',
      [2]: 'Invalid BigInt syntax',
      [3]: 'Octal escape sequences are not allowed in strict mode',
      [4]: 'Non-number found after exponent indicator',
      [5]: 'Unterminated string literal',
      [6]: 'OptionalChainingNoTemplate',
      [11]: 'HTML comments are not allowed in modules or without AnnexB support',
      [8]: 'Numeric separators are not allowed at the end of numeric literals',
      [7]: 'Only one underscore is allowed as numeric separator',
      [9]: 'Missing digits',
      [10]: 'Multiline comment was not closed properly',
      [12]: 'Unterminated regular expression',
      [13]: 'Unexpected regular expression flag',
      [14]: "Duplicate regular expression flag '%0'",
      [47]: 'Invalid use of `new` keyword on an increment/decrement expression',
      [48]: "Invalid use of '%0' inside new expression",
      [51]: 'Cannot use new with import(...)',
      [15]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
      [16]: 'Octal escape sequences are not allowed in template strings',
      [17]: 'Invalid hexadecimal escape sequence',
      [18]: 'Unicode codepoint must not be greater than 0x10FFFF',
      [19]: 'Illegal Unicode escape sequence',
      [50]: 'The %0 keyword can only be used with the module goal',
      [20]: "Illegal character '%0'",
      [22]: "Duplicate binding '%0'",
      [24]: "'%0' has already been declared",
      [23]: "'%0' shadowed a catch clause binding",
      [25]: 'Function name may not contain any reserved words or be eval or arguments in strict mode',
      [32]: '%0 declaration must have a name in this context',
      [40]: 'Identifier "let" disallowed as left-hand side expression in strict mode',
      [34]: 'Missing initializer in %0 declaration',
      [33]: "'for-%0' loop head declarations can not have an initializer",
      [35]: 'Invalid left-hand side in for-%0 loop: Must have a single binding',
      [37]: 'Await expression not allowed in formal parameter',
      [36]: 'Yield expression not allowed in formal parameter',
      [38]: '%0 functions must have exactly %1 argument%2',
      [39]: 'Setter function argument must not be a rest parameter',
      [41]: "The left-hand side of a for-of loop may not start with 'let'",
      [42]: 'Missing catch or finally after try',
      [44]: 'Illegal newline after throw',
      [43]: 'Strict mode code may not include a with statement',
      [46]: 'Invalid optional chain from new expression',
      [49]: 'Cannot use "import.meta" outside a module',
      [45]: 'Coalescing and logical operators used together in the same expression must be disambiguated with parentheses'
  };
  class ParseError extends SyntaxError {
      constructor(startindex, line, column, type, ...params) {
          const message = '[' + line + ':' + column + ']: ' + errorMessages[type].replace(/%(\d+)/g, (_, i) => params[i]);
          super(`${message}`);
          this.index = startindex;
          this.line = line;
          this.column = column;
          this.description = message;
      }
  }
  function report(parser, type, ...params) {
      throw new ParseError(parser.index, parser.lineBase, parser.index - parser.offset, type, ...params);
  }
  function reportScopeError(scope) {
      throw new ParseError(scope.index, scope.line, scope.column, scope.type, scope.params);
  }

  function skipHashBang(parser, source) {
      const index = parser.index;
      if (source.charCodeAt(index) === 35 && source.charCodeAt(index + 1) === 33) {
          parser.index = skipSingleLineComment(parser, source, index + 1);
      }
  }
  function skipSingleHTMLComment(parser, context, source, i) {
      if (context & (16 | 2048)) {
          report(parser, 11);
      }
      return skipSingleLineComment(parser, source, i + 2);
  }
  function skipSingleLineComment(parser, source, i) {
      let char = source.charCodeAt(i);
      while (i < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
          char = source.charCodeAt(++i);
      }
      return i;
  }
  function skipMultiLineComment(parser, source, i) {
      let lastIsCR = 0;
      let char = source.charCodeAt(i++);
      while (i < parser.length) {
          if (char < 0x2b) {
              if (char === 42) {
                  while (char === 42) {
                      char = source.charCodeAt(i++);
                  }
                  if (char === 47) {
                      return i;
                  }
              }
              if (char === 13) {
                  parser.lineBase++;
                  lastIsCR = 1;
                  parser.newLine = 1;
                  parser.offset = i;
              }
              if (char === 10) {
                  if (lastIsCR === 0)
                      parser.lineBase++;
                  lastIsCR = 0;
                  parser.newLine = 1;
                  parser.offset = i;
              }
          }
          else if ((char & ~1) === 8232) {
              parser.offset = i;
              parser.newLine = 1;
              parser.lineBase++;
              lastIsCR = 0;
          }
          char = source.charCodeAt(i++);
      }
      report(parser, 10);
  }

  const CharTypes = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16,
      0,
      0,
      16,
      0,
      0,
      0,
      8,
      0,
      8,
      8,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      8,
      0,
      0,
      0,
      2 | 5,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      1 | 32,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      0,
      2,
      0,
      0,
      2 | 5 | 64,
      0,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5 | 32,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      2 | 5,
      0,
      0,
      0,
      0,
      0
  ];
  function isIdentifierPart(code) {
      return code <= 0x7f
          ? CharTypes[code] & 5
          : (unicodeLookup[(code >>> 5) + 0] >>> code) & 31 & 1 ||
              (code === 8204 || code === 8205);
  }

  const KeywordDescTable = [
      'end of source',
      'identifier',
      'number',
      'number',
      'string',
      'regular expression',
      'false',
      'true',
      'null',
      'template continuation',
      'template end',
      '=>',
      '(',
      '{',
      '.',
      '...',
      '}',
      ')',
      ';',
      ',',
      '[',
      ']',
      ':',
      '?',
      '??',
      '?.',
      '\'',
      '"',
      '</',
      '/>',
      '++',
      '--',
      '=',
      '<<=',
      '>>=',
      '>>>=',
      '**=',
      '+=',
      '-=',
      '*=',
      '/=',
      '%=',
      '^=',
      '|=',
      '&=',
      'typeof',
      'delete',
      'void',
      '!',
      '~',
      '+',
      '-',
      'in',
      'instanceof',
      '*',
      '%',
      '/',
      '**',
      '&&',
      '||',
      '===',
      '!==',
      '==',
      '!=',
      '<=',
      '>=',
      '<',
      '>',
      '<<',
      '>>',
      '>>>',
      '&',
      '|',
      '^',
      'var',
      'let',
      'const',
      'break',
      'case',
      'catch',
      'class',
      'continue',
      'debugger',
      'default',
      'do',
      'else',
      'export',
      'extends',
      'finally',
      'for',
      'function',
      'if',
      'import',
      'new',
      'return',
      'super',
      'switch',
      'this',
      'throw',
      'try',
      'while',
      'with',
      'implements',
      'interface',
      'package',
      'private',
      'protected',
      'public',
      'static',
      'yield',
      'as',
      'async',
      'await',
      'constructor',
      'get',
      'set',
      'from',
      'of',
      'enum',
      'identifier',
      'identifier',
      'whitespace',
      'whitespace',
      'whitespace',
      'number',
      '/',
      'comment'
  ];
  const descKeywordTable = Object.create(null, {
      this: { value: 1179745 },
      function: { value: 1179738 },
      if: { value: 131163 },
      return: { value: 131166 },
      var: { value: 538050634 },
      else: { value: 131157 },
      for: { value: 131161 },
      new: { value: 1179741 },
      in: { value: 139624500 },
      typeof: { value: 1179693 },
      while: { value: 131172 },
      case: { value: 131150 },
      break: { value: 131149 },
      try: { value: 131171 },
      catch: { value: 131151 },
      delete: { value: 1179694 },
      throw: { value: 1179746 },
      switch: { value: 1179744 },
      continue: { value: 131153 },
      default: { value: 131155 },
      instanceof: { value: 135432245 },
      do: { value: 131156 },
      void: { value: 1179695 },
      finally: { value: 131160 },
      async: { value: 2162799 },
      await: { value: 3211376 },
      class: { value: 1179728 },
      const: { value: 538050636 },
      constructor: { value: 65649 },
      debugger: { value: 131154 },
      export: { value: 131158 },
      extends: { value: 131159 },
      false: { value: 1179654 },
      from: { value: 65652 },
      get: { value: 65650 },
      implements: { value: 262246 },
      import: { value: 1179740 },
      interface: { value: 262247 },
      let: { value: 538181707 },
      null: { value: 1179656 },
      of: { value: 4259957 },
      package: { value: 262248 },
      private: { value: 262249 },
      protected: { value: 262250 },
      public: { value: 262251 },
      set: { value: 65651 },
      static: { value: 262252 },
      super: { value: 1179743 },
      true: { value: 1179655 },
      with: { value: 131173 },
      yield: { value: 3473517 },
      as: { value: 65646 }
  });

  function readNext(parser) {
      parser.index++;
      if (parser.index >= parser.length)
          report(parser, 5);
      return parser.source.charCodeAt(parser.index);
  }
  function toHex(code) {
      code -= 48;
      if (code <= 9)
          return code;
      code = (code | 0x20) - (97 - 48);
      if (code <= 5)
          return code + 10;
      return -1;
  }
  function fromCodePoint(codePoint) {
      return codePoint <= 65535
          ? String.fromCharCode(codePoint)
          : String.fromCharCode(codePoint >>> 10) + String.fromCharCode(codePoint & 0x3ff);
  }

  function scanIdentifier(parser, context, source, char) {
      while (CharTypes[char] & 5) {
          char = source.charCodeAt(++parser.index);
      }
      const value = source.slice(parser.start, parser.index);
      if (char > 90)
          return scanIdentifierSlowPath(parser, context, source, value, 0);
      parser.tokenValue = value;
      return 3211265;
  }
  function scanIdentifierOrKeyword(parser, context, source, char) {
      while (CharTypes[char] & 5) {
          char = source.charCodeAt(++parser.index);
      }
      const value = source.slice(parser.start, parser.index);
      if (char > 90)
          return scanIdentifierSlowPath(parser, context, source, value, 1);
      parser.tokenValue = value;
      const token = descKeywordTable[value];
      return token === void 0 ? 3211265 : token;
  }
  function scanIdentifierSlowPath(parser, context, source, value, maybeKeyword) {
      let start = parser.index;
      let escaped = 0;
      let char = source.charCodeAt(parser.index);
      let code = null;
      while (parser.index < parser.length) {
          if (char === 92) {
              value += source.slice(start, parser.index);
              escaped = 1;
              code = scanUnicodeEscape(parser, source);
              if (!isIdentifierPart(code))
                  report(parser, 19);
              maybeKeyword = 1;
              value += fromCodePoint(code);
              start = parser.index;
          }
          else {
              if ((char & 0xfc00) === 0xd800) {
                  const lo = source.charCodeAt(parser.index + 1);
                  if ((lo & 0xfc00) === 0xdc00) {
                      char = 0x10000 + ((char & 0x3ff) << 10) + (lo & 0x3ff);
                      if (((unicodeLookup[(char >>> 5) + 0] >>> char) & 31 & 1) === 0) {
                          report(parser, 0);
                      }
                      parser.index++;
                  }
              }
              if (!isIdentifierPart(char))
                  break;
              parser.index++;
          }
          char = source.charCodeAt(parser.index);
      }
      value += source.slice(start, parser.index);
      const length = value.length;
      parser.tokenValue = value;
      if (maybeKeyword && length >= 2 && length <= 11) {
          const token = descKeywordTable[parser.tokenValue];
          if (token === void 0)
              return 3211265;
          if (escaped === 0)
              return token;
          if ((token & 262144) === 262144) {
              return 2162808;
          }
          if (context & 1024 && (token === 538181707 || token === 262252)) {
              return 2162808;
          }
          return 2162807;
      }
      return 3211265;
  }
  function scanUnicodeEscape(parser, source) {
      if (source.charCodeAt(parser.index + 1) !== 117) {
          report(parser, 19);
      }
      let code = 0;
      let char = source.charCodeAt((parser.index += 2));
      if (char === 123) {
          let digit = toHex(source.charCodeAt(++parser.index));
          while (digit >= 0) {
              if (digit < 0)
                  report(parser, 17);
              code = (code << 4) | digit;
              if (code > 1114111)
                  report(parser, 18);
              digit = toHex((char = source.charCodeAt(++parser.index)));
          }
          if (code < 0 || char !== 125)
              report(parser, 17);
          parser.index++;
          return code;
      }
      let i = 0;
      for (i = 0; i < 4; i++) {
          const digit = toHex(source.charCodeAt(parser.index));
          if (digit < 0)
              report(parser, 17);
          code = (code << 4) | digit;
          parser.index++;
      }
      return code;
  }
  function scanUnicodeEscapeIdStart(parser, context, source) {
      const cookedChar = scanUnicodeEscape(parser, source);
      if (isIdentifierPart(cookedChar)) {
          return scanIdentifierSlowPath(parser, context, source, fromCodePoint(cookedChar), 1);
      }
      parser.index++;
      report(parser, 19);
  }
  function scanMaybeIdentifier(parser, context, source, char) {
      if ((unicodeLookup[(char >>> 5) + 34816] >>> char) & 31 & 1 || (char & 0xfc00) === 0xd800) {
          if ((char & 0xfc00) === 0xdc00) {
              char = ((char & 0x3ff) << 10) | (char & 0x3ff) | 0x10000;
              if (((unicodeLookup[(char >>> 5) + 0] >>> char) & 31 & 1) === 0) {
                  report(parser, 20, fromCodePoint(char));
              }
              parser.index++;
          }
          return scanIdentifierSlowPath(parser, context, source, '', 0);
      }
      report(parser, 20, fromCodePoint(char));
  }

  function scanStringLiteral(parser, context, source, quote) {
      let char = readNext(parser);
      let res = '';
      let start = parser.index;
      while (char !== quote) {
          if (char <= 0x7e) {
              if (char === 92) {
                  res += source.slice(start, parser.index);
                  char = readNext(parser);
                  const code = scanEscapeSequence(parser, context, source, char);
                  if (code <= 0)
                      handleStringError(parser, code, 0);
                  res += fromCodePoint(code);
                  start = parser.index;
                  parser.isUnicodeEscape = 1;
                  char = source.charCodeAt(parser.index);
              }
              else {
                  char = readNext(parser);
                  if ((CharTypes[char] & 16) === 16) {
                      report(parser, 5);
                  }
              }
          }
          else {
              char = readNext(parser);
              if ((char & ~1) === 8232) {
                  parser.index++;
                  parser.offset = parser.index;
                  parser.lineBase++;
              }
          }
      }
      res += source.slice(start, parser.index);
      parser.index++;
      parser.tokenValue = res;
      return 1572868;
  }
  function scanEscapeSequence(parser, context, source, first) {
      let ch = readNext(parser);
      switch (first) {
          case 98:
              return 8;
          case 102:
              return 12;
          case 114:
              return 13;
          case 110:
              return 10;
          case 116:
              return 9;
          case 118:
              return 11;
          case 117: {
              let code = 0;
              if (ch === 123) {
                  let digit = toHex(source.charCodeAt(++parser.index));
                  while (digit >= 0) {
                      if (digit < 0)
                          return -4;
                      code = (code << 4) | digit;
                      if (code > 1114111)
                          break;
                      digit = toHex((ch = source.charCodeAt(++parser.index)));
                  }
                  if (code < 0 || ch !== 125)
                      return -4;
                  parser.index++;
                  return code;
              }
              let i = 0;
              for (i = 0; i < 4; i++) {
                  const digit = toHex(source.charCodeAt(parser.index++));
                  if (digit < 0)
                      return -4;
                  code = (code << 4) | digit;
              }
              return code;
          }
          case 120: {
              const hi = toHex(ch);
              if (hi < 0)
                  return -4;
              const ch2 = source.charCodeAt(++parser.index);
              const lo = toHex(ch2);
              if (lo < 0)
                  return -4;
              parser.index++;
              return (hi << 4) | lo;
          }
          case 48:
          case 49:
          case 50:
          case 51:
          case 52:
          case 53:
          case 54:
          case 55: {
              if (context & (16 | 1024)) {
                  return first === 48 && (ch < 48 || ch > 57) ? first - 48 : -2;
              }
              const code = first - 48;
              if (ch >= 48 && ch <= 55) {
                  let index = parser.index;
                  const value = source.charCodeAt(index) - 48;
                  if (first >= 48 && first <= 51) {
                      const ch1 = source.charCodeAt(index + 1);
                      if (ch1 >= 48 && ch1 <= 55) {
                          parser.index = index += 2;
                          return code * 64 + value * 8 + ch1 - 48;
                      }
                  }
                  parser.index = index + 1;
                  parser.flags |= 128;
                  return code * 8 + value;
              }
              return code;
          }
          case 56:
          case 57:
              return -3;
          case 13:
              const index = parser.index;
              if (index < parser.length) {
                  if (source.charCodeAt(index) === 10) {
                      parser.index = index + 1;
                  }
              }
          case 10:
              parser.offset = parser.index;
              parser.lineBase++;
              return -1;
          default:
              return first;
      }
  }
  function handleStringError(parser, code, isTemplate) {
      switch (code) {
          case -1:
              return;
          case -2:
              report(parser, isTemplate ? 16 : 3);
          case -3:
              report(parser, 15);
          case -4:
              report(parser, 17);
          case -5:
              report(parser, 18);
      }
  }

  function scanRegularExpression(parser, context, source, i) {
      const bodyStart = i;
      let preparseState = 0;
      while (true) {
          const ch = source.charCodeAt(i);
          i++;
          if (preparseState & 1) {
              preparseState &= ~1;
          }
          else {
              if (ch <= 0x5e) {
                  if (ch === 47) {
                      if (!preparseState)
                          break;
                  }
                  else if (ch === 92) {
                      preparseState |= 1;
                  }
                  else if (ch === 91) {
                      preparseState |= 2;
                  }
                  else if (ch === 93) {
                      preparseState &= 1;
                  }
                  else if ((CharTypes[ch] & 16) === 16) {
                      report(parser, 12);
                  }
              }
              else if ((ch & ~1) === 8232) {
                  report(parser, 12);
              }
          }
          if (i >= parser.length) {
              report(parser, 12);
          }
      }
      const bodyEnd = i - 1;
      let mask = 0;
      const flagStart = i;
      let char = source.charCodeAt(i);
      while (isIdentifierPart(char)) {
          switch (char) {
              case 103:
                  if (mask & 2)
                      report(parser, 14, 'g');
                  mask |= 2;
                  break;
              case 105:
                  if (mask & 1)
                      report(parser, 14, 'i');
                  mask |= 1;
                  break;
              case 109:
                  if (mask & 4)
                      report(parser, 14, 'm');
                  mask |= 4;
                  break;
              case 117:
                  if (mask & 16)
                      report(parser, 14, 'g');
                  mask |= 16;
                  break;
              case 121:
                  if (mask & 8)
                      report(parser, 14, 'y');
                  mask |= 8;
                  break;
              case 115:
                  if (mask & 12)
                      report(parser, 14, 's');
                  mask |= 12;
                  break;
              default:
                  report(parser, 13);
          }
          i++;
          char = source.charCodeAt(i);
      }
      const flags = source.slice(flagStart, i);
      const pattern = source.slice(bodyStart, bodyEnd);
      parser.tokenRegExp = { pattern, flags };
      parser.index = i;
      if (context & 8)
          parser.tokenRaw = source.slice(parser.start, i);
      parser.tokenValue = validate(parser, pattern, flags);
      return 1048581;
  }
  function validate(parser, pattern, flags) {
      try {
          RegExp(pattern);
      }
      catch (e) {
          report(parser, 0);
      }
      try {
          return new RegExp(pattern, flags);
      }
      catch (e) {
          return null;
      }
  }

  function scanTemplate(parser, context, source) {
      const { index: start } = parser;
      let ret = '';
      let token = 1048586;
      let char = readNext(parser);
      while (char !== 96) {
          if (char === 36) {
              if (source.charCodeAt(parser.index + 1) === 123) {
                  parser.index++;
                  token = 1048585;
                  break;
              }
              ret += '$';
          }
          else if (char < 0x5d) {
              if (char === 92) {
                  char = readNext(parser);
                  if (char >= 0x7d) {
                      ret += fromCodePoint(char);
                  }
                  else {
                      const code = scanEscapeSequence(parser, context, source, char);
                      if (code >= 0) {
                          ret += fromCodePoint(code);
                          parser.index--;
                      }
                      else if (code !== -1 && context & 65536) {
                          ret = null;
                          char = scanBadTemplate(parser, context, source);
                          if (char < 0) {
                              char = -char;
                              token = 1048585;
                          }
                          break;
                      }
                      else {
                          handleStringError(parser, code, 1);
                      }
                      char = source.charCodeAt(parser.index);
                  }
              }
              else {
                  if ((CharTypes[char] & 16) === 16) {
                      if (char === 13) {
                          if (parser.index < parser.length && source.charCodeAt(parser.index) === 10) {
                              ret += fromCodePoint(char);
                              char = source.charCodeAt(parser.index);
                              parser.index++;
                              parser.lineBase++;
                          }
                      }
                      parser.offset = parser.index;
                      parser.lineBase++;
                  }
                  ret += fromCodePoint(char);
              }
          }
          else {
              if ((char ^ 8232) <= 1) {
                  parser.offset = parser.index;
                  parser.lineBase++;
              }
              ret += fromCodePoint(char);
          }
          char = readNext(parser);
      }
      parser.index++;
      parser.tokenValue = ret;
      parser.tokenRaw = source.slice(start + 1, parser.index - (token === 1048586 ? 1 : 2));
      return token;
  }
  function scanBadTemplate(parser, _context, source) {
      let char = source.charCodeAt(parser.index);
      while (char !== 96) {
          if (char === 36) {
              const index = parser.index + 1;
              if (index < source.length && source.charCodeAt(index) === 123) {
                  parser.index = index;
                  return -char;
              }
          }
          char = readNext(parser);
      }
      return char;
  }
  function scanTemplateTail(parser, context) {
      if (parser.index >= parser.length)
          report(parser, 0);
      parser.index--;
      return scanTemplate(parser, context, parser.source);
  }

  const firstCharKinds = [
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      123,
      124,
      123,
      123,
      122,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      123,
      1048624,
      1572868,
      121,
      3211265,
      135314231,
      135292487,
      1572868,
      1048588,
      17,
      135314230,
      135309874,
      19,
      135309875,
      14,
      135314232,
      125,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      22,
      16777234,
      135301186,
      67108896,
      135301187,
      23,
      121,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      3211265,
      34603028,
      2162807,
      21,
      135288137,
      3211265,
      1048586,
      132,
      132,
      132,
      132,
      132,
      132,
      132,
      3211265,
      132,
      3211265,
      132,
      132,
      132,
      132,
      132,
      132,
      3211265,
      132,
      132,
      132,
      132,
      132,
      132,
      3211265,
      132,
      132,
      34603021,
      135283784,
      16777232,
      1048625,
      121
  ];
  const CharKinds = [
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      1572866,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      128,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      130,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      129,
      121,
      121,
      121,
      121,
      121,
      121,
      131,
      121,
      121,
      128,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      130,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      121,
      129,
      121,
      121,
      121,
      121,
      121,
      121,
      121
  ];

  function scanNumber(parser, source, char, skipSMI) {
      let digit = 9;
      let value = 0;
      if (skipSMI === 0) {
          while (char <= 57 && char >= 48 && digit >= 0) {
              value = value * 10 + (char - 48);
              char = source.charCodeAt(++parser.index);
              --digit;
          }
          if (digit >= 0 &&
              char !== 46 &&
              (CharTypes[char] & (2 | 1)) === 0) {
              parser.tokenValue = value;
              return 1572866;
          }
      }
      if (char === 95)
          return skipNumericSeparator(parser, source, char);
      while (char <= 57 && char >= 48) {
          char = source.charCodeAt(++parser.index);
      }
      if (char === 46) {
          char = source.charCodeAt(++parser.index);
          if (char === 95)
              report(parser, 7);
          while (char >= 48 && char <= 57) {
              char = source.charCodeAt(++parser.index);
          }
      }
      if (char === 110 && skipSMI === 0)
          return scanBigInt(parser, source);
      if ((char | 32) === 101)
          char = scanSignedInteger(parser, source);
      if (char === 95)
          return skipNumericSeparator(parser, source, char);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      parser.tokenValue = parseFloat(source.slice(parser.start, parser.index));
      return 1572866;
  }
  function scanSignedInteger(parser, source) {
      let char = source.charCodeAt(++parser.index);
      if (char === 45 || char === 43) {
          char = source.charCodeAt(++parser.index);
      }
      let isDigit = 0;
      while (char <= 57 && char >= 48) {
          char = source.charCodeAt(++parser.index);
          isDigit++;
      }
      if (isDigit === 0)
          report(parser, 4);
      return char;
  }
  function skipNumericSeparator(parser, source, char) {
      let start = parser.start;
      let value = scanDecimalDigitsOrSeparator(parser, source, char, start);
      start = parser.index;
      char = source.charCodeAt(start);
      if (char === 46) {
          char = source.charCodeAt(++parser.index);
          if (char === 95)
              report(parser, 4);
          value += scanDecimalDigitsOrSeparator(parser, source, char, start);
          start = parser.index;
          char = source.charCodeAt(start);
      }
      if ((char | 32) === 101) {
          char = source.charCodeAt(++parser.index);
          if (char === 45 || char === 43) {
              char = source.charCodeAt(++parser.index);
          }
          if ((CharTypes[char] & 1) < 1)
              report(parser, 4);
          value += source.substring(start, parser.index) + scanDecimalDigitsOrSeparator(parser, source, char, parser.index);
      }
      parser.tokenValue = parseFloat(value);
      return 1572866;
  }
  function scanDecimalDigitsOrSeparator(parser, source, char, start) {
      let allowSeparator = 0;
      let value = '';
      while ((char <= 57 && char >= 48) || char === 95) {
          if (char === 95) {
              if (source.charCodeAt(parser.index + 1) === 95)
                  report(parser, 7);
              value += source.substring(start, parser.index);
              char = source.charCodeAt(++parser.index);
              allowSeparator = 1;
              start = parser.index;
              continue;
          }
          allowSeparator = 0;
          char = source.charCodeAt(++parser.index);
      }
      if (allowSeparator === 1)
          report(parser, 8);
      return value + source.substring(start, parser.index);
  }
  function scanNumberAfterDecimalPoint(parser, source, char) {
      if (char === 95)
          report(parser, 7);
      let value = 0;
      while (char >= 48 && char <= 57) {
          char = source.charCodeAt(++parser.index);
      }
      if ((char | 32) === 101)
          char = scanSignedInteger(parser, source);
      if (char === 95)
          return skipNumericSeparator(parser, source, char);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      value = source.slice(parser.start, parser.index);
      parser.tokenValue = parseFloat(value);
      return 1572866;
  }
  function scanImplicitOctalDigits(parser, context, source, char) {
      if (context & 1024)
          report(parser, 3);
      parser.flags |= 128;
      let value = 0;
      while (char >= 48 && char <= 57) {
          if (char >= 56)
              return scanNumber(parser, source, char, 1);
          value = value * 8 + (char - 48);
          char = source.charCodeAt(++parser.index);
      }
      if (char === 110)
          report(parser, 2);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      parser.tokenValue = value;
      return 1572866;
  }
  function scanOctalDigits(parser, source) {
      let value = 0;
      let char = source.charCodeAt(++parser.index);
      let digit = 9;
      const start = parser.index;
      while (char >= 48 && char <= 55 && digit >= 0) {
          value = (value << 3) | (char - 48);
          char = source.charCodeAt(++parser.index);
          --digit;
      }
      if (start === parser.index)
          report(parser, 9);
      if (digit >= 0 && (CharTypes[char] & (2 | 1)) === 0) {
          parser.tokenValue = value;
          return 1572866;
      }
      let allowSeparator = 1;
      while ((char >= 48 && char <= 55) || char === 95) {
          if (char === 95) {
              if (allowSeparator === 0)
                  report(parser, 7);
              allowSeparator = 0;
              char = source.charCodeAt(++parser.index);
              continue;
          }
          allowSeparator = 1;
          value = value * 8 + (char - 48);
          char = source.charCodeAt(++parser.index);
      }
      if (allowSeparator === 0)
          report(parser, 8);
      if (char === 110)
          return scanBigInt(parser, source);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      parser.tokenValue = value;
      return 1572866;
  }
  function scanHexDigits(parser, source) {
      let value = 0;
      let char = source.charCodeAt(++parser.index);
      const start = parser.index;
      let digit = 7;
      while ((CharTypes[char] & 32) === 32 && digit >= 0) {
          value = (value << 4) | toHex(char);
          char = source.charCodeAt(++parser.index);
          --digit;
      }
      if (start === parser.index)
          report(parser, 9);
      if (digit >= 0 && (CharTypes[char] & (2 | 1)) === 0) {
          parser.tokenValue = value;
          return 1572866;
      }
      let allowSeparator = 1;
      while (CharTypes[char] & (64 | 32)) {
          if (char === 95) {
              if (!allowSeparator) {
                  report(parser, 7);
              }
              allowSeparator = 0;
              char = source.charCodeAt(++parser.index);
              continue;
          }
          allowSeparator = 1;
          value = value * 0x10 + toHex(char);
          char = source.charCodeAt(++parser.index);
      }
      if (allowSeparator === 0)
          report(parser, 8);
      if (char === 110)
          return scanBigInt(parser, source);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      parser.tokenValue = value;
      return 1572866;
  }
  function scanBinaryDigits(parser, source) {
      let value = 0;
      let digit = 31;
      let char = source.charCodeAt(++parser.index);
      const start = parser.index;
      while (char >= 48 && char <= 49 && digit >= 0) {
          value = (value << 1) + (char - 48);
          --digit;
          char = source.charCodeAt(++parser.index);
      }
      if (start === parser.index)
          report(parser, 9);
      if (digit >= 0 && (CharTypes[char] & (2 | 1)) === 0) {
          parser.tokenValue = value;
          return 1572866;
      }
      let allowSeparator = 1;
      while ((char >= 48 && char <= 49) || char === 95) {
          if (char === 95) {
              if (allowSeparator === 0)
                  report(parser, 7);
              allowSeparator = 0;
              char = source.charCodeAt(++parser.index);
              continue;
          }
          allowSeparator = 1;
          value = value * 2 + (char - 48);
          char = source.charCodeAt(++parser.index);
      }
      if (allowSeparator === 0)
          report(parser, 8);
      if (char === 110)
          return scanBigInt(parser, source);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      parser.tokenValue = value;
      return 1572866;
  }
  function scanBigInt(parser, source) {
      const char = source.charCodeAt(++parser.index);
      if (CharTypes[char] & (2 | 1)) {
          report(parser, 1);
      }
      return 1572867;
  }

  function scan(parser, context, source, length, lastIsCR, lineStart, allowRegExp) {
      let char;
      let index;
      let token = 16777216;
      while (parser.index < length) {
          char = source.charCodeAt(parser.index);
          parser.line = parser.lineBase;
          parser.column = (parser.start = parser.index) - parser.offset;
          if (char > 0x7e) {
              if ((char & ~1) === 8232) {
                  parser.offset = ++parser.index;
                  parser.newLine = 1;
                  parser.lineBase++;
                  lastIsCR = 0;
                  continue;
              }
              if ((unicodeLookup[(char >>> 5) + 104448] >>> char) & 31 & 1) {
                  parser.index++;
                  continue;
              }
              return scanMaybeIdentifier(parser, context, source, char);
          }
          token = firstCharKinds[char];
          switch (token) {
              case 16777232:
              case 34603021:
              case 19:
              case 22:
              case 1048625:
              case 1048588:
              case 17:
              case 16777234:
              case 34603028:
              case 21:
                  parser.index++;
                  return token;
              case 123:
                  parser.index++;
                  break;
              case 3211265:
                  return scanIdentifier(parser, context, source, char);
              case 132:
                  return scanIdentifierOrKeyword(parser, context, source, char);
              case 1572866:
                  return scanNumber(parser, source, char, 0);
              case 1572868:
                  return scanStringLiteral(parser, context, source, char);
              case 1048586:
                  return scanTemplate(parser, context, source);
              case 2162807:
                  return scanUnicodeEscapeIdStart(parser, context, source);
              case 125:
                  if (parser.index + 1 < length) {
                      char = source.charCodeAt(++parser.index);
                      switch (CharKinds[char]) {
                          case 129:
                              return scanHexDigits(parser, source);
                          case 128:
                              return scanBinaryDigits(parser, source);
                          case 130:
                              return scanOctalDigits(parser, source);
                          case 1572866:
                          case 131:
                              return scanImplicitOctalDigits(parser, context, source, char);
                      }
                  }
                  return scanNumber(parser, source, char, 0);
              case 122:
                  parser.offset = ++parser.index;
                  parser.lineBase++;
                  parser.newLine = lastIsCR = 1;
                  break;
              case 124:
                  parser.offset = ++parser.index;
                  parser.newLine = 1;
                  if (lastIsCR === 0)
                      parser.lineBase++;
                  lastIsCR = 0;
                  break;
              case 14:
                  char = source.charCodeAt(++parser.index);
                  if (char >= 48 && char <= 57)
                      return scanNumberAfterDecimalPoint(parser, source, char);
                  if (char === 46 && source.charCodeAt(parser.index + 1) === 46) {
                      parser.index += 2;
                      return 15;
                  }
                  return 14;
              case 135314232:
                  index = ++parser.index;
                  char = source.charCodeAt(index);
                  if (char === 47) {
                      index++;
                      parser.index = skipSingleLineComment(parser, source, index);
                      continue;
                  }
                  if (char === 42) {
                      index++;
                      parser.index = skipMultiLineComment(parser, source, index);
                      continue;
                  }
                  if (allowRegExp === 1) {
                      return scanRegularExpression(parser, context, source, index);
                  }
                  if (char === 61) {
                      parser.index++;
                      return 68157480;
                  }
                  return 135314232;
              case 67108896:
                  char = source.charCodeAt(++parser.index);
                  if (char === 61) {
                      if (source.charCodeAt(++parser.index) !== 61)
                          return 135296830;
                      parser.index++;
                      return 135296828;
                  }
                  if (char !== 62)
                      return 67108896;
                  parser.index++;
                  return 11;
              case 23:
                  char = source.charCodeAt(++parser.index);
                  if (char === 46) {
                      char = source.charCodeAt(parser.index + 1);
                      if (char >= 48 && char <= 57)
                          return 23;
                      parser.index++;
                      return 25;
                  }
                  if (char === 63) {
                      parser.index++;
                      return 1209012504;
                  }
                  return 23;
              case 135301186:
                  char = source.charCodeAt(++parser.index);
                  if (char === 60) {
                      if (source.charCodeAt(++parser.index) === 61) {
                          parser.index++;
                          return 67108897;
                      }
                      return 135305540;
                  }
                  if (char === 61) {
                      parser.index += 1;
                      return 135296832;
                  }
                  if (char === 33) {
                      if (parser.index < length &&
                          source.charCodeAt(parser.index + 2) === 45 &&
                          source.charCodeAt(parser.index + 1) === 45) {
                          parser.index = skipSingleHTMLComment(parser, context, source, parser.index + 1);
                          continue;
                      }
                  }
                  return 135301186;
              case 135309875:
                  char = source.charCodeAt(++parser.index);
                  if (char === 45) {
                      if (source.charCodeAt(parser.index + 1) === 62 && (lineStart || parser.newLine)) {
                          parser.index = skipSingleHTMLComment(parser, context, source, parser.index);
                          continue;
                      }
                      parser.index++;
                      return 269484063;
                  }
                  if (char === 61) {
                      parser.index++;
                      return 67108902;
                  }
                  return 135309875;
              case 1048624:
                  if (source.charCodeAt(parser.index + 1) === 61) {
                      index = parser.index + 1;
                      if (source.charCodeAt(index + 1) === 61) {
                          parser.index += 3;
                          return 135296829;
                      }
                      parser.index += 2;
                      return 135296831;
                  }
                  parser.index++;
                  return 1048624;
              case 135314231:
                  if (source.charCodeAt(++parser.index) !== 61)
                      return 135314231;
                  parser.index++;
                  return 67108905;
              case 135314230:
                  char = source.charCodeAt(++parser.index);
                  if (char === 61) {
                      parser.index++;
                      return 67108903;
                  }
                  if (char !== 42)
                      return 135314230;
                  if (source.charCodeAt(++parser.index) !== 61)
                      return 135318585;
                  parser.index++;
                  return 67108900;
              case 135288137:
                  if (source.charCodeAt(++parser.index) !== 61)
                      return 135288137;
                  parser.index++;
                  return 67108906;
              case 135309874:
                  char = source.charCodeAt(++parser.index);
                  if (char === 43) {
                      parser.index++;
                      return 269484062;
                  }
                  if (char === 61) {
                      parser.index++;
                      return 67108901;
                  }
                  return 135309874;
              case 135283784:
                  char = source.charCodeAt(++parser.index);
                  if (char === 124) {
                      parser.index++;
                      return 143663675;
                  }
                  if (char === 61) {
                      parser.index++;
                      return 67108907;
                  }
                  return 135283784;
              case 135301187:
                  char = source.charCodeAt(++parser.index);
                  if (char === 61) {
                      parser.index++;
                      return 135296833;
                  }
                  if (char !== 62)
                      return 135301187;
                  char = source.charCodeAt(++parser.index);
                  if (char === 62) {
                      if (source.charCodeAt(++parser.index) !== 61)
                          return 135305542;
                      parser.index++;
                      return 67108899;
                  }
                  if (char === 61) {
                      parser.index++;
                      return 67108898;
                  }
                  return 135305541;
              case 135292487:
                  char = source.charCodeAt(++parser.index);
                  if (char === 38) {
                      parser.index++;
                      return 143668026;
                  }
                  if (char === 61) {
                      parser.index++;
                      return 67108908;
                  }
                  return 135292487;
              default:
                  report(parser, 20, fromCodePoint(char));
          }
      }
      return 16777216;
  }
  function nextToken(parser, context, allowRegExp) {
      const { source, length, index, offset } = parser;
      parser.newLine = 0;
      parser.lastColumn = (parser.endIndex = index) - offset;
      parser.prevLinebase = parser.lineBase;
      parser.token = scan(parser, context, source, length, 0, index === 0, allowRegExp);
  }

  function recordScopeError(parser, type, ...params) {
      const { index, line, column } = parser;
      return {
          type,
          params,
          index,
          line,
          column
      };
  }
  function addVarOrBlock(parser, context, scope, name, kind, origin) {
      if (kind & 2) {
          addVarName(parser, context, scope, name, kind);
      }
      else {
          addBlockName(parser, context, scope, name, kind, origin);
      }
  }
  function addBlockName(parser, context, scope, name, kind, origin) {
      if (scope === void 0)
          return;
      const value = scope['#' + name];
      if (value && (value & 8) !== 8) {
          if (kind & 1) {
              scope.scopeError = recordScopeError(parser, 22, name);
          }
          else if ((context & 16) !== 16 &&
              value & 4 &&
              origin & 2) ;
          else {
              report(parser, 22, name);
          }
      }
      if (scope.type & 128 &&
          scope.parent['#' + name] &&
          (scope.parent['#' + name] & 8) !== 8) {
          report(parser, 22, name);
      }
      if (scope.type & 1024 && value && (value & 8) !== 8) {
          if ((kind & 1) === 1) {
              scope.scopeError = recordScopeError(parser, 22, name);
          }
      }
      if (scope.type & 64) {
          if (scope.parent['#' + name] & 768)
              report(parser, 23, name);
      }
      scope['#' + name] = kind;
  }
  function addVarName(parser, context, scope, name, kind) {
      if (scope === void 0)
          return;
      let currentScope = scope;
      while (currentScope && (currentScope.type & 256) === 0) {
          const value = currentScope['#' + name];
          if (value & 244) {
              if ((context & 16) !== 16 &&
                  (context & 1024) === 0 &&
                  ((kind & 128 && value & 6) ||
                      (value & 128 && kind & 6))) ;
              else {
                  report(parser, 22, name);
              }
          }
          if (currentScope === scope) {
              if (value & 1 && kind & 1) {
                  currentScope.scopeError = recordScopeError(parser, 22, name);
              }
          }
          if (value & (512 | 256)) {
              if (context & (1024 | 16) || (value & 512) === 0) {
                  report(parser, 22, name);
              }
          }
          currentScope['#' + name] = kind;
          currentScope = currentScope.parent;
      }
  }

  function consumeSemicolon(parser, context) {
      if ((parser.token & 16777216) !== 16777216 && parser.newLine === 0) {
          report(parser, 0);
      }
      consumeOpt(parser, context, 16777234, 1);
  }
  function optionalBit(parser, context, t) {
      if (parser.token !== t)
          return 0;
      nextToken(parser, context, 0);
      return 1;
  }
  function consumeOpt(parser, context, t, allowRegExp) {
      if (parser.token !== t)
          return false;
      nextToken(parser, context, allowRegExp);
      return true;
  }
  function setLoc(parser, line, column) {
      return {
          start: {
              line,
              column
          },
          end: {
              line: parser.prevLinebase,
              column: parser.lastColumn
          }
      };
  }
  function reinterpretToPattern(state, node) {
      switch (node.type) {
          case 'ArrayExpression':
              node.type = 'ArrayPattern';
              const elements = node.elements;
              for (let i = 0, n = elements.length; i < n; ++i) {
                  const element = elements[i];
                  if (element)
                      reinterpretToPattern(state, element);
              }
              return;
          case 'ObjectExpression':
              node.type = 'ObjectPattern';
              const properties = node.properties;
              for (let i = 0, n = properties.length; i < n; ++i) {
                  reinterpretToPattern(state, properties[i]);
              }
              return;
          case 'AssignmentExpression':
              node.type = 'AssignmentPattern';
              if (node.operator !== '=')
                  report(state, 0);
              delete node.operator;
              reinterpretToPattern(state, node.left);
              return;
          case 'Property':
              reinterpretToPattern(state, node.value);
              return;
          case 'SpreadElement':
              node.type = 'RestElement';
              reinterpretToPattern(state, node.argument);
      }
  }
  function parseStatementWithLabelSet(t, label, labels, nestedLabels) {
      if (nestedLabels === null) {
          nestedLabels = [label];
      }
      else {
          nestedLabels.push(label);
      }
      if (isIterationStatement(t)) {
          labels.iterationLabels = nestedLabels;
      }
      return nestedLabels;
  }
  function isIterationStatement(t) {
      return t === 131161 || t === 131172 || t === 131156;
  }
  function addLabel(parser, label, labels, nestedLabels) {
      let set = labels;
      while (set) {
          if (set['#' + label])
              report(parser, 0);
          set = set.parentLabels;
      }
      labels = { parentLabels: labels, iterationLabels: null };
      labels['#' + label] = true;
      if (nestedLabels === null) {
          nestedLabels = [label];
      }
      else {
          nestedLabels.push(label);
      }
      return labels;
  }
  function isValidBreakLabel(parser, labels, label) {
      if (labels === null)
          report(parser, 0);
      if (labels['#' + label])
          return 1;
      while ((labels = labels.parentLabels))
          if (labels['#' + label])
              return 1;
      return 0;
  }
  function isExactlyStrictDirective(parser, index, start, value) {
      if (index - start !== 12)
          return false;
      if (value !== 'use strict')
          return false;
      if ((parser.token & 16777216) !== 16777216)
          return false;
      return true;
  }
  function validateFunctionName(parser, context, t) {
      if (context & 1024) {
          if ((t & 262144) === 262144) {
              report(parser, 26);
          }
      }
      if ((t & 131072) === 131072) {
          report(parser, 28);
      }
      if (context & (4194304 | 2048) && t === 3211376) {
          report(parser, 30);
      }
      if (context & (2097152 | 1024) && t === 3473517) {
          report(parser, 31, 'yield');
      }
  }
  function isValidIdentifier(context, t) {
      if (context & (1024 | 2097152)) {
          if (context & 2048 && t === 3211376)
              return false;
          if (context & 2097152 && t === 3473517)
              return false;
          return (t & 2162688) === 2162688 || (t & 65536) === 65536;
      }
      return ((t & 2162688) === 2162688 ||
          (t & 65536) === 65536 ||
          (t & 262144) === 262144);
  }
  function consume(parser, context, t, allowRegExp) {
      if (parser.token !== t)
          report(parser, 0);
      nextToken(parser, context, allowRegExp);
  }
  function isStrictReservedWord(parser, context, t, inGroup) {
      if (t === 3211376) {
          if (context & (4194304 | 2048))
              report(parser, 30);
          if (inGroup === 1)
              parser.flags |= 2048;
      }
      if (t === 3473517 && context & 2097152)
          report(parser, 31, 'yield');
      return ((t & 131072) === 131072 ||
          (t & 262144) === 262144 ||
          t == 2162808);
  }
  function validateIdentifier(parser, context, kind, t) {
      if (context & 1024) {
          if ((t & 262144) === 262144) {
              report(parser, 26);
          }
      }
      if ((t & 131072) === 131072) {
          report(parser, 28);
      }
      if (kind & (16 | 32) && t === 538181707) {
          report(parser, 29);
      }
      if (context & (4194304 | 2048) && t === 3211376) {
          report(parser, 30);
      }
      if (context & (2097152 | 1024) && t === 3473517) {
          report(parser, 31, 'yield');
      }
  }
  function isEvalOrArguments(value) {
      return value === 'eval' || value === 'arguments';
  }

  function parseAssignmentExpression(parser, context, isPattern, reinterpret, inGroup, left, start, line, column) {
      const token = parser.token;
      if ((token & 67108864) === 67108864) {
          if (parser.assignable === 0)
              report(parser, 60);
          if (reinterpret === 1 && parser.token === 67108896) {
              reinterpretToPattern(parser, left);
          }
          nextToken(parser, context, 1);
          const right = parseExpression(parser, context, inGroup);
          parser.assignable = 0;
          if (isPattern === 1) {
              return context & 2
                  ? {
                      type: 'AssignmentPattern',
                      left,
                      right,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'AssignmentPattern',
                      left,
                      right
                  };
          }
          const operator = KeywordDescTable[token & 255];
          return context & 2
              ? {
                  type: 'AssignmentExpression',
                  left,
                  operator,
                  right,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'AssignmentExpression',
                  left,
                  operator,
                  right
              };
      }
      if ((token & 135266304) === 135266304) {
          left = parseBinaryExpression(parser, context, inGroup, 4, token, start, line, column, left);
      }
      return parser.token === 23
          ? parseConditionalExpression(parser, context, left, start, line, column)
          : left;
  }
  function parseExpression(parser, context, inGroup) {
      const { start, line, column } = parser;
      let expr = parsePrimaryExpression(parser, context, 0, 0, 1, 1, inGroup, start, line, column);
      expr = parseMemberExpression(parser, context, expr, 0, 0, inGroup, start, line, column);
      return parseAssignmentExpression(parser, context, 0, 0, inGroup, expr, start, line, column);
  }
  function parseExpressions(parser, context, inGroup) {
      const { start, line, column } = parser;
      const property = parseExpression(parser, (context | 8192) ^ 8192, inGroup);
      return parser.token === 19
          ? parseSequenceExpression(parser, context, property, start, line, column)
          : property;
  }
  function parseSequenceExpression(parser, context, expr, start, line, column) {
      const expressions = [expr];
      while (consumeOpt(parser, context, 19, 1)) {
          expressions.push(parseExpression(parser, context, 0));
      }
      return context & 2
          ? {
              type: 'SequenceExpression',
              expressions,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'SequenceExpression',
              expressions
          };
  }
  function parseConditionalExpression(parser, context, test, start, line, column) {
      nextToken(parser, context, 1);
      const consequent = parseExpression(parser, (context | 8192) ^ 8192, 0);
      consume(parser, context, 22, 1);
      const alternate = parseExpression(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'ConditionalExpression',
              test,
              consequent,
              alternate,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ConditionalExpression',
              test,
              consequent,
              alternate
          };
  }
  function parseBinaryExpression(parser, context, inGroup, minPrec, logical, curStart, curLine, curColumn, left) {
      let t;
      let type;
      let right;
      let operator;
      const prec = context & 8192 ? 3840 : 3840 << 4;
      while ((logical & 135266304) === 135266304) {
          t = parser.token;
          if ((t & prec) + ((t === 135318585) << 8) <= minPrec)
              return left;
          if (((logical & 8388608) | (t & 1073741824) | ((t & 8388608) | (logical & 1073741824))) >
              1073741824) {
              report(parser, 45);
          }
          nextToken(parser, context, 1);
          type = t & (1073741824 | 8388608) ? 'LogicalExpression' : 'BinaryExpression';
          operator = KeywordDescTable[t & 0xff];
          right = parseBinaryExpression(parser, context, inGroup, t & prec, t, parser.start, parser.line, parser.column, parseLeftHandSideExpression(parser, context, inGroup, 1, 0));
          parser.assignable = 0;
          left =
              context & 2
                  ? {
                      type,
                      left,
                      right,
                      operator,
                      start: curStart,
                      end: parser.endIndex,
                      loc: setLoc(parser, curLine, curColumn)
                  }
                  : {
                      type,
                      left,
                      right,
                      operator
                  };
      }
      return left;
  }
  function parsePropertyOrPrivatePropertyName(parser, context) {
      if ((parser.token & (65536 | 131072 | 262144 | 2162688)) === 0) {
          report(parser, 0);
      }
      return parseIdentifier(parser, context);
  }
  function parseMemberExpression(parser, context, expr, isOptional, isShortCircuited, inGroup, start, line, column) {
      if ((parser.token & 269484032) === 269484032) {
          return parser.newLine === 0 ? parseUpdateExpression(parser, context, expr, start, line, column) : expr;
      }
      switch (parser.token) {
          case 14: {
              nextToken(parser, context, 0);
              parser.assignable = 1;
              const property = parsePropertyOrPrivatePropertyName(parser, context);
              return parseMemberExpression(parser, context, context & 2
                  ? {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1
                  }, 0, isOptional, inGroup, start, line, column);
          }
          case 34603028: {
              nextToken(parser, context, 1);
              const property = parseExpressions(parser, context, inGroup);
              consume(parser, context, 21, 0);
              parser.assignable = 1;
              return parseMemberExpression(parser, context, context & 2
                  ? {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1
                  }, 0, isShortCircuited, inGroup, start, line, column);
          }
          case 1048588: {
              const args = parseArguments(parser, context, inGroup);
              const type = 'CallExpression';
              parser.assignable = 0;
              return parseMemberExpression(parser, context, context & 2
                  ? {
                      type,
                      callee: expr,
                      arguments: args,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type,
                      callee: expr,
                      arguments: args,
                      optional: isOptional === 1,
                      shortCircuited: isShortCircuited === 1
                  }, 0, isOptional, inGroup, start, line, column);
          }
          case 1048586:
          case 1048585: {
              if (isShortCircuited === 1)
                  report(parser, 6);
              parser.assignable = 0;
              const quasi = parser.token === 1048585
                  ? parseTemplate(parser, context | 65536, start, line, column)
                  : parseTemplateLiteral(parser, context);
              return parseMemberExpression(parser, context, context & 2
                  ? {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi
                  }, isOptional, isShortCircuited, inGroup, start, line, column);
          }
          case 25: {
              if (isOptional === 1)
                  report(parser, 0);
              parser.assignable = 0;
              nextToken(parser, context, 0);
              isOptional = 1;
              if ((parser.token & (65536 | 131072 | 262144 | 2162688)) !== 0) {
                  const property = parseIdentifier(parser, context);
                  expr =
                      context & 2
                          ? {
                              type: 'MemberExpression',
                              object: expr,
                              computed: false,
                              property,
                              optional: isOptional === 1,
                              shortCircuited: isShortCircuited === 1,
                              start,
                              end: parser.endIndex,
                              loc: setLoc(parser, line, column)
                          }
                          : {
                              type: 'MemberExpression',
                              object: expr,
                              computed: false,
                              property,
                              optional: isOptional === 1,
                              shortCircuited: isShortCircuited === 1
                          };
                  isOptional = 0;
                  isShortCircuited = 1;
              }
              return parseMemberExpression(parser, context, expr, isOptional, isShortCircuited, inGroup, start, line, column);
          }
          default:
              return expr;
      }
  }
  function parseArguments(parser, context, inGroup) {
      nextToken(parser, context, 1);
      context = (context | 8192) ^ 8192;
      const args = [];
      while (parser.token !== 17) {
          if (parser.token === 15) {
              args.push(parseSpreadElement(parser, context));
          }
          else {
              args.push(parseExpression(parser, context, inGroup));
          }
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 1);
      }
      consume(parser, context, 17, 0);
      return args;
  }
  function parseSpreadElement(parser, context) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      const argument = parseExpression(parser, context, 0);
      return context & 2
          ? {
              type: 'SpreadElement',
              argument,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'SpreadElement',
              argument
          };
  }
  function parseTemplateLiteral(parser, context) {
      const { start, line, column, tokenValue, tokenRaw } = parser;
      parser.assignable = 0;
      consume(parser, context, 1048586, 0);
      const quasis = [parseTemplateElement1(parser, context, tokenValue, tokenRaw, true, start, line, column)];
      return context & 2
          ? {
              type: 'TemplateLiteral',
              expressions: [],
              quasis,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'TemplateLiteral',
              expressions: [],
              quasis
          };
  }
  function parseTemplate(parser, context, curStart, curLine, curColumn) {
      context = (context | 8192) ^ 8192;
      const quasis = [parseTemplateElement(parser, context, false)];
      consume(parser, context, 1048585, 1);
      const expressions = [parseExpressions(parser, context, 0)];
      while ((parser.token = scanTemplateTail(parser, context)) === 1048585) {
          quasis.push(parseTemplateElement(parser, context, false));
          consume(parser, context, 1048585, 1);
          expressions.push(parseExpressions(parser, context, 0));
      }
      quasis.push(parseTemplateElement(parser, context, true));
      consume(parser, context, 1048586, 0);
      return context & 2
          ? {
              type: 'TemplateLiteral',
              expressions,
              quasis,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'TemplateLiteral',
              expressions,
              quasis
          };
  }
  function parseTemplateElement1(parser, context, cooked, raw, tail, start, line, column) {
      return context & 2
          ? {
              type: 'TemplateElement',
              value: {
                  cooked,
                  raw
              },
              tail,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'TemplateElement',
              value: {
                  cooked,
                  raw
              },
              tail
          };
  }
  function parseTemplateElement(parser, context, tail) {
      const { start, line, column } = parser;
      return context & 2
          ? {
              type: 'TemplateElement',
              value: {
                  cooked: parser.tokenValue,
                  raw: parser.tokenRaw
              },
              tail,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'TemplateElement',
              value: {
                  cooked: parser.tokenValue,
                  raw: parser.tokenRaw
              },
              tail
          };
  }
  function parseYieldExpression(parser, context, canAssign, start, line, column) {
      if (context & 2097152) {
          nextToken(parser, context, 1);
          if (context & 8388608)
              report(parser, 36);
          if (canAssign === 0)
              report(parser, 60);
          if (parser.token === 23)
              report(parser, 65);
          let argument = null;
          let delegate = false;
          if (parser.newLine === 0) {
              delegate = consumeOpt(parser, context, 135314230, 1);
              if (parser.token & 1048576 || delegate) {
                  argument = parseExpression(parser, context, 0);
              }
          }
          parser.assignable = 0;
          return context & 2
              ? {
                  type: 'YieldExpression',
                  argument,
                  delegate,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'YieldExpression',
                  argument,
                  delegate
              };
      }
      if (context & 1024)
          report(parser, 31, 'yield');
      return parseIdentifierOrArrow(parser, context);
  }
  function parseAwaitExpression(parser, context, inGroup, inNew, start, line, column) {
      if (inGroup === 1)
          parser.flags |= 2048;
      if (context & 4194304) {
          if (inNew === 1)
              report(parser, 0);
          if (context & 8388608) {
              report(parser, 37);
          }
          nextToken(parser, context, 1);
          const argument = parseLeftHandSideExpression(parser, context, inGroup, 1, 0);
          parser.assignable = 0;
          return context & 2
              ? {
                  type: 'AwaitExpression',
                  argument,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'AwaitExpression',
                  argument
              };
      }
      if (context & 2048)
          report(parser, 31, 'Await');
      return parseIdentifierOrArrow(parser, context);
  }
  function parseIdentifierOrArrow(parser, context) {
      const { start, line, column } = parser;
      let expr = parseIdentifier(parser, context);
      parser.assignable = 1;
      if (parser.token === 11) {
          const conjuncted = (parser.flags | 256) ^ 256;
          const scope = {
              parent: {
                  parent: void 0,
                  type: 2
              },
              type: 2,
              scopeError: void 0
          };
          addBlockName(parser, context, scope, parser.tokenValue, 1, 0);
          expr = parseArrowFunction(parser, context, scope, [expr], 0, start, line, column);
          parser.flags |= conjuncted;
      }
      return expr;
  }
  function parsePrimaryExpression(parser, context, kind, inNew, allowLHS, canAssign, inGroup, start, line, column) {
      const token = parser.token;
      if ((token & 2162688) === 2162688) {
          switch (token) {
              case 3473517:
                  if (inGroup === 1)
                      parser.flags |= 1024;
                  return parseYieldExpression(parser, context, canAssign, start, line, column);
              case 3211376:
                  return parseAwaitExpression(parser, context, inGroup, inNew, start, line, column);
              case 2162799:
                  return parseAsyncExpression(parser, context, inNew, allowLHS, canAssign, start, line, column);
          }
          const tokenValue = parser.tokenValue;
          const expr = parseIdentifier(parser, context | 65536);
          if (parser.token === 11) {
              if (allowLHS === 0)
                  report(parser, 0);
              if (canAssign === 0)
                  report(parser, 73);
              if (inNew)
                  report(parser, 74);
              return parseAsyncArrowIdentifier(parser, context, 0, tokenValue, expr, start, line, column);
          }
          if (token === 538181707) {
              if (context & 1024)
                  report(parser, 94);
              if (kind & (16 | 32))
                  report(parser, 29);
          }
          parser.assignable = 1;
          return expr;
      }
      if ((token & 269484032) === 269484032) {
          return parseUpdateExpressionPrefix(parser, context, inNew, allowLHS, start, line, column);
      }
      switch (token) {
          case 1179694:
          case 1048624:
          case 1048625:
          case 135309874:
          case 135309875:
          case 1179693:
          case 1179695:
              return parseUnaryExpression(parser, context, inGroup, inNew, allowLHS, start, line, column);
          case 1572868:
          case 1572866:
              return parseLiteral(parser, context);
          case 1179654:
          case 1179655:
              return parseExpressionFromLiteral(parser, context, parser.tokenValue === 'true', start, line, column);
          case 34603028:
              return parseArrayLiteral(parser, context, canAssign ? 0 : 1, inGroup, start, line, column);
          case 34603021:
              return parseObjectLiteral(parser, context, canAssign ? 0 : 1, inGroup, start, line, column);
          case 1048588:
              return parseParenthesizedExpression(parser, context, inGroup, canAssign, 1, 0, start, line, column);
          case 1179656:
              return parseNullLiteral(parser, context, start, line, column);
          case 1179745:
              return parseThisExpression(parser, context, start, line, column);
          case 1572867:
              return parseBigIntLiteral(parser, context, start, line, column);
          case 1048581:
              return parseRegExpLiteral(parser, context, start, line, column);
          case 1179741:
              return parseNewExpression(parser, context, inGroup, start, line, column);
          case 1179738:
              return parseFunctionExpression(parser, context, 0, start, line, column);
          case 1179728:
              return parseClassExpression(parser, context, inGroup, start, line, column);
          case 1179743:
              return parseSuperExpression(parser, context, start, line, column);
          case 1048586:
              return parseTemplateLiteral(parser, context);
          case 1048585:
              return parseTemplate(parser, context, start, line, column);
          case 1179740:
              return parseImportCallOrMetaExpression(parser, context, inNew, start, line, column);
          default:
              if (isValidIdentifier(context, parser.token))
                  return parseIdentifierOrArrow(parser, context);
              report(parser, 0);
      }
  }
  function parseAsyncExpression(parser, context, inNew, allowLHS, canAssign, curStart, curLine, curColumn) {
      const { tokenValue, start, line, column } = parser;
      nextToken(parser, context, 0);
      if (parser.newLine === 0) {
          if (parser.token === 1179738) {
              if (allowLHS === 0)
                  report(parser, 86, KeywordDescTable[parser.token & 255]);
              return parseFunctionExpression(parser, context, 1, curStart, curLine, curColumn);
          }
          if ((parser.token & 2162688) === 2162688) {
              if (allowLHS === 0)
                  report(parser, 86, KeywordDescTable[parser.token & 255]);
              if (canAssign === 0)
                  report(parser, 73);
              if (parser.token === 3211376)
                  report(parser, 37);
              if (context & (1024 | 2097152) && parser.token === 3473517) {
                  report(parser, 36);
              }
              return parseAsyncArrowIdentifier(parser, context, 1, parser.tokenValue, parseIdentifier(parser, context), curStart, curLine, curColumn);
          }
      }
      const expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      if (inNew === 0 && parser.token === 1048588) {
          return parseAsyncArrowOrCallExpression(parser, (context | 8192) ^ 8192, expr, canAssign, parser.newLine, 1, 0, curStart, curLine, curColumn);
      }
      if (parser.token === 11) {
          if (inNew === 1)
              report(parser, 74);
          if (parser.token === 3211376)
              report(parser, 37);
          if (context & (1024 | 2097152) && parser.token === 3473517) {
              report(parser, 36);
          }
          return parseAsyncArrowIdentifier(parser, context, 0, 'async', expr, curStart, curLine, curColumn);
      }
      return expr;
  }
  function parseAsyncArrowIdentifier(parser, context, isAsync, value, expr, start, line, column) {
      const scope = {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 1024,
          scopeError: void 0
      };
      parser.flags = (parser.flags | 256) ^ 256;
      addBlockName(parser, context, scope, value, 1, 0);
      return parseArrowFunction(parser, context, scope, [expr], isAsync, start, line, column);
  }
  function parseAsyncArrowOrCallExpression(parser, context, callee, canAssign, newLine, kind, origin, start, line, column) {
      nextToken(parser, context, 1);
      const scope = {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 1024,
          scopeError: void 0
      };
      if (parser.token === 17) {
          nextToken(parser, context, 0);
          if (parser.token === 11) {
              if (newLine === 1)
                  report(parser, 0);
              if (parser.flags & 2048)
                  report(parser, 37);
              return parseArrowFunctionAfterParen(parser, context, scope, 0, [], canAssign, 1, start, line, column);
          }
          return context & 2
              ? {
                  type: 'CallExpression',
                  callee,
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'CallExpression',
                  callee,
                  arguments: [],
                  optional: false,
                  shortCircuited: false
              };
      }
      parser.flags =
          (parser.flags | 1024 | 256) ^ (256 | 1024);
      let expr = null;
      let conjuncted = 0;
      const params = [];
      while (parser.token !== 17) {
          const { token, tokenValue, start, line, column } = parser;
          if (token & (2162688 | 131072 | 262144)) {
              addBlockName(parser, context, scope, parser.tokenValue, 1, 0);
              expr = parsePrimaryExpression(parser, context, kind, 0, 1, 1, 1, start, line, column);
              if (parser.token === 17 || parser.token === 19) {
                  conjuncted |=
                      (parser.assignable === 0 ? 8 | 256 : 0) |
                          (isEvalOrArguments(tokenValue) ? 32 : 0) |
                          ((token & 262144) === 262144 ? 64 : 0);
              }
              else if (parser.token === 67108896) {
                  conjuncted |= 256;
                  expr = parseAssignmentExpression(parser, context, 0, 1, 1, expr, start, line, column);
              }
              else {
                  conjuncted |= 8;
                  expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
                  expr = parseAssignmentExpression(parser, context, 0, 1, 1, expr, start, line, column);
              }
          }
          else if (token & 33554432) {
              expr =
                  parser.token === 34603021
                      ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
                      : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);
              conjuncted |= parser.flags | 256;
              if (parser.token !== 17 && parser.token !== 19) {
                  if (conjuncted & 16)
                      report(parser, 64);
                  expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
                  conjuncted |= 8;
                  if ((parser.token & 135266304) === 135266304) {
                      expr = parseBinaryExpression(parser, context, 0, 4, token, start, line, column, expr);
                  }
                  if (parser.token === 23) {
                      expr = parseConditionalExpression(parser, context, expr, start, line, column);
                  }
              }
          }
          else if (token === 15) {
              expr = parseSpreadOrRestElement(parser, context, scope, 17, 0, 1, 1, kind, origin, start, line, column);
              conjuncted |=
                  (parser.token === 17 ? 0 : 8) | (parser.flags | 256);
          }
          else {
              expr = parseExpression(parser, context, 0);
              params.push(expr);
              while (consumeOpt(parser, context, 19, 1)) {
                  params.push(parseExpression(parser, context, 0));
              }
              consume(parser, context, 17, 0);
              parser.flags = ((parser.flags | 30) ^ 30) | conjuncted | 8;
              parser.assignable = 0;
              return context & 2
                  ? {
                      type: 'CallExpression',
                      callee,
                      arguments: params,
                      optional: false,
                      shortCircuited: false,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'CallExpression',
                      callee,
                      arguments: params,
                      optional: false,
                      shortCircuited: false
                  };
          }
          params.push(expr);
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 1);
      }
      consume(parser, context, 17, 0);
      conjuncted |=
          (parser.flags & 1024 ? 1024 : 0) | (parser.flags & 2048 ? 2048 : 0);
      if (parser.token === 11) {
          if (parser.flags & 2048)
              report(parser, 37);
          return parseArrowFunctionAfterParen(parser, context, scope, conjuncted, params, canAssign, 1, start, line, column);
      }
      parser.flags = (parser.flags | 1024 | 2048) ^ (1024 | 2048);
      if (conjuncted & 16)
          report(parser, 58);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'CallExpression',
              callee,
              arguments: params,
              optional: false,
              shortCircuited: false,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'CallExpression',
              callee,
              arguments: params,
              optional: false,
              shortCircuited: false
          };
  }
  function parseImportCallOrMetaExpression(parser, context, inNew, start, line, column) {
      const tokenValue = parser.tokenValue;
      nextToken(parser, context, 1);
      let expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      if (parser.token === 14) {
          return parseImportMetaExpression(parser, context, expr, start, line, column);
      }
      if (inNew === 1)
          report(parser, 51);
      expr = parseImportExpression(parser, context, start, line, column);
      parser.assignable = 0;
      return parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
  }
  function parseNewExpression(parser, context, inGroup, curStart, curLine, curColumn) {
      nextToken(parser, context, 1);
      parser.assignable = 0;
      if (parser.token === 14) {
          return parseNewTargetExpression(parser, context, curStart, curLine, curColumn);
      }
      const { start, line, column } = parser;
      const expr = parsePrimaryExpression(parser, context, 0, 1, 1, 0, inGroup, start, line, column);
      const callee = parseNewMemberExpression(parser, context, expr, start, line, column);
      const args = parser.token === 1048588 ? parseArguments(parser, context, inGroup) : [];
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'NewExpression',
              callee,
              arguments: args,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'NewExpression',
              callee,
              arguments: args
          };
  }
  function parseNewTargetExpression(parser, context, start, line, column) {
      nextToken(parser, context, 0);
      if ((context & 67108864) === 0 || parser.tokenValue !== 'target') {
          report(parser, 88);
      }
      const meta = parseIdentifierFromValue(parser, context, 'new', start, line, column);
      const property = parseIdentifier(parser, context);
      return context & 2
          ? {
              type: 'MetaProperty',
              meta,
              property,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'MetaProperty',
              meta,
              property
          };
  }
  function parseNewMemberExpression(parser, context, expr, start, line, column) {
      switch (parser.token) {
          case 14: {
              nextToken(parser, context, 0);
              parser.assignable = 1;
              const property = parsePropertyOrPrivatePropertyName(parser, context);
              return parseNewMemberExpression(parser, context, context & 2
                  ? {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property,
                      optional: false,
                      shortCircuited: false,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'MemberExpression',
                      object: expr,
                      computed: false,
                      property,
                      optional: false,
                      shortCircuited: false
                  }, start, line, column);
          }
          case 34603028: {
              nextToken(parser, context, 1);
              const property = parseExpressions(parser, context, 0);
              consume(parser, context, 21, 0);
              return parseNewMemberExpression(parser, context, context & 2
                  ? {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property,
                      optional: false,
                      shortCircuited: false,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'MemberExpression',
                      object: expr,
                      computed: true,
                      property,
                      optional: false,
                      shortCircuited: false
                  }, start, line, column);
          }
          case 25:
              report(parser, 46);
          case 1048585:
          case 1048586: {
              parser.assignable = 0;
              const quasi = parser.token === 1048585
                  ? parseTemplate(parser, context | 65536, start, line, column)
                  : parseTemplateLiteral(parser, context);
              return parseNewMemberExpression(parser, context, context & 2
                  ? {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi,
                      start: start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'TaggedTemplateExpression',
                      tag: expr,
                      quasi
                  }, start, line, column);
          }
          default:
              return expr;
      }
  }
  function parseSuperExpression(parser, context, start, line, column) {
      nextToken(parser, context, 0);
      if (parser.token === 1048588) {
          if ((context & 524288) === 0)
              report(parser, 90);
          parser.assignable = 0;
      }
      else if (parser.token === 34603028 || parser.token === 14) {
          if ((context & 262144) === 0)
              report(parser, 89);
          parser.assignable = 1;
      }
      else {
          report(parser, 0);
      }
      return context & 2
          ? {
              type: 'Super',
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Super'
          };
  }
  function parseRegExpLiteral(parser, context, start, line, column) {
      const { tokenRegExp, tokenValue } = parser;
      nextToken(parser, context, 0);
      parser.assignable = 0;
      if (context & 8) {
          const raw = parser.source.slice(parser.start, parser.index);
          return context & 2
              ? {
                  type: 'Literal',
                  value: tokenValue,
                  regex: tokenRegExp,
                  raw,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'Literal',
                  value: tokenValue,
                  raw,
                  regex: tokenRegExp
              };
      }
      return context & 2
          ? {
              type: 'Literal',
              value: tokenValue,
              regex: tokenRegExp,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Literal',
              value: tokenValue,
              regex: tokenRegExp
          };
  }
  function parseBigIntLiteral(parser, context, start, line, column) {
      const bigint = parser.source.slice(start, parser.index);
      nextToken(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'BigIntLiteral',
              value: null,
              bigint,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'BigIntLiteral',
              value: null,
              bigint,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          };
  }
  function parseArrowFunctionAfterParen(parser, context, scope, conjuncted, params, canAssign, isAsync, start, line, column) {
      if (conjuncted & (4 | 8)) {
          report(parser, 71);
      }
      if (context & (1024 | 2097152) && conjuncted & 1024) {
          report(parser, 36);
      }
      parser.flags =
          ((parser.flags | 1024 | 2048 | 30) ^
              (30 | 1024 | 2048)) |
              conjuncted;
      if (canAssign === 0)
          report(parser, 73);
      let i = params.length;
      while (i--) {
          reinterpretToPattern(parser, params[i]);
      }
      return parseArrowFunction(parser, context, scope, params, isAsync, start, line, column);
  }
  function parseArrowFunction(parser, context, scope, params, isAsync, start, line, column) {
      if (parser.newLine === 1)
          report(parser, 78);
      consume(parser, context, 11, 1);
      context = ((context | 15728640) ^ 15728640) | (isAsync << 22);
      const expression = parser.token !== 34603021;
      let body;
      if (scope && scope.scopeError !== void 0)
          reportScopeError(scope.scopeError);
      if (expression) {
          body = parseExpression(parser, context, 0);
      }
      else {
          body = parseFunctionBody(parser, (context | 134221824 | 268435456) ^
              (134221824 | 268435456), scope, void 0, 1, void 0);
          if ((parser.token & 135266304) === 135266304 && parser.newLine === 0) {
              report(parser, 0);
          }
          else if ((parser.token & 269484032) === 269484032) {
              report(parser, 0);
          }
          else {
              switch (parser.token) {
                  case 14:
                  case 34603028:
                  case 1048586:
                  case 23:
                      report(parser, 0);
                  case 1048588:
                      report(parser, 0);
              }
          }
      }
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'ArrowFunctionExpression',
              body,
              params,
              async: isAsync === 1,
              expression,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ArrowFunctionExpression',
              body,
              params,
              async: isAsync === 1,
              expression
          };
  }
  function parseParenthesizedExpression(parser, context, inGroup, canAssign, kind, origin, curStart, curLine, curColumn) {
      nextToken(parser, context, 1);
      const scope = {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 1024,
          scopeError: void 0
      };
      parser.flags =
          (parser.flags | 1024 | 2048 | 256) ^
              (256 | 1024 | 2048);
      context = (context | 8192) ^ 8192;
      let expr = [];
      if (parser.token === 17) {
          if (canAssign === 0)
              report(parser, 73);
          nextToken(parser, context, 0);
          return parseArrowFunction(parser, context, scope, expr, 0, curStart, curLine, curColumn);
      }
      let expressions = [];
      let isSequence = 0;
      let conjuncted = 0;
      const { start: sStart, line: sLine, column: sColumn } = parser;
      parser.assignable = 1;
      while (parser.token !== 17) {
          const { token, start, line, column } = parser;
          if (parser.token & (131072 | 262144 | 2162688)) {
              addBlockName(parser, context, scope, parser.tokenValue, 1, 0);
              expr = parsePrimaryExpression(parser, context, kind, 0, 1, 1, 1, start, line, column);
              if (parser.token === 19 || parser.token === 17) {
                  if (parser.assignable === 0) {
                      conjuncted |= 8 | 256;
                  }
              }
              else {
                  conjuncted |= parser.token === 67108896 ? 256 : 8;
                  expr = parseMemberExpression(parser, context, expr, 0, 0, inGroup, start, line, column);
                  if (parser.token !== 17 && parser.token !== 19) {
                      expr = parseAssignmentExpression(parser, context, 0, 0, 1, expr, start, line, column);
                  }
              }
          }
          else if (token & 33554432) {
              expr =
                  parser.token === 34603021
                      ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
                      : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);
              conjuncted |= parser.flags | 256;
              parser.assignable = 0;
              if (parser.token !== 19 && parser.token !== 17) {
                  if (conjuncted & 16)
                      report(parser, 64);
                  expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
                  conjuncted |= 8;
                  if (parser.token !== 19 && parser.token !== 17) {
                      expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
                  }
              }
          }
          else if (token === 15) {
              expr = parseSpreadOrRestElement(parser, context, scope, 17, 0, 0, 0, kind, origin, start, line, column);
              if (parser.flags & 8)
                  report(parser, 63);
              if (isSequence && (parser.token === 17 || parser.token === 19)) {
                  expressions.push(expr);
              }
              conjuncted |= 16 | 256;
              break;
          }
          else {
              conjuncted |= 8;
              expr = parseExpression(parser, context, inGroup);
              if (isSequence && (parser.token === 19 || parser.token === 17)) {
                  expressions.push(expr);
              }
              if (parser.token === 19) {
                  if (!isSequence) {
                      isSequence = 1;
                      expressions = [expr];
                  }
              }
              if (isSequence) {
                  while (consumeOpt(parser, context, 19, 1)) {
                      expressions.push(parseExpression(parser, context, inGroup));
                  }
                  expr =
                      context & 2
                          ? {
                              type: 'SequenceExpression',
                              expressions,
                              start: sStart,
                              end: parser.endIndex,
                              loc: setLoc(parser, sLine, sColumn)
                          }
                          : {
                              type: 'SequenceExpression',
                              expressions
                          };
              }
              consume(parser, context, 17, 0);
              parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
              return expr;
          }
          if (isSequence && (parser.token === 19 || parser.token === 17)) {
              expressions.push(expr);
          }
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 1);
          if (!isSequence) {
              isSequence = 1;
              expressions = [expr];
          }
          if (parser.token === 17) {
              conjuncted |= 16;
              break;
          }
      }
      if (isSequence) {
          parser.assignable = 0;
          expr =
              context & 2
                  ? {
                      type: 'SequenceExpression',
                      expressions,
                      start: sStart,
                      end: parser.endIndex,
                      loc: setLoc(parser, sLine, sColumn)
                  }
                  : {
                      type: 'SequenceExpression',
                      expressions
                  };
      }
      consume(parser, context, 17, 0);
      if (conjuncted & 8 && conjuncted & 16) {
          report(parser, 62);
      }
      conjuncted |=
          (parser.flags & 1024 ? 1024 : 0) | (parser.flags & 2048 ? 2048 : 0);
      if (parser.token === 11) {
          if (context & (4194304 | 2048) && conjuncted & 2048) {
              report(parser, 37);
          }
          return parseArrowFunctionAfterParen(parser, context, scope, conjuncted, isSequence ? expressions : [expr], canAssign, 0, curStart, curLine, curColumn);
      }
      else if (conjuncted & 16) {
          report(parser, 75);
      }
      parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
      return expr;
  }
  function parseExpressionStatement(parser, context, expression, start, line, column) {
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'ExpressionStatement',
              expression,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ExpressionStatement',
              expression
          };
  }
  function parseLeftHandSideExpression(parser, context, inGroup, allowLHS, canAssign) {
      const { start, line, column } = parser;
      const expr = parsePrimaryExpression(parser, context, 0, 0, allowLHS, canAssign, inGroup, start, line, column);
      return parseMemberExpression(parser, context, expr, 0, 0, inGroup, start, line, column);
  }
  function parseIdentifier(parser, context) {
      const { tokenValue: name, start, line, column } = parser;
      nextToken(parser, context, 0);
      return context & 2
          ? {
              type: 'Identifier',
              name,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Identifier',
              name
          };
  }
  function parseThisExpression(parser, context, start, line, column) {
      nextToken(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'ThisExpression',
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ThisExpression'
          };
  }
  function parseNullLiteral(parser, context, start, line, column) {
      nextToken(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'Literal',
              value: null,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Literal',
              value: null
          };
  }
  function parseExpressionFromLiteral(parser, context, value, start, line, column) {
      nextToken(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'Literal',
              value,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Literal',
              value
          };
  }
  function parseLiteral(parser, context) {
      const value = parser.tokenValue;
      const start = parser.start;
      const line = parser.line;
      const column = parser.column;
      const index = parser.index;
      parser.assignable = 0;
      nextToken(parser, context, 0);
      if (context & 8) {
          const raw = parser.source.slice(start, index);
          return context & 2
              ? {
                  type: 'Literal',
                  value,
                  raw,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'Literal',
                  value,
                  raw
              };
      }
      return context & 2
          ? {
              type: 'Literal',
              value,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Literal',
              value
          };
  }
  function parseUpdateExpression(parser, context, arg, start, line, column) {
      if (parser.assignable === 0)
          report(parser, 66);
      const operator = KeywordDescTable[parser.token & 255];
      nextToken(parser, context, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'UpdateExpression',
              argument: arg,
              operator,
              prefix: false,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'UpdateExpression',
              argument: arg,
              operator,
              prefix: false
          };
  }
  function parseUpdateExpressionPrefix(parser, context, inNew, allowLHS, start, line, column) {
      if (allowLHS === 0)
          report(parser, 0);
      if (inNew === 1)
          report(parser, 47);
      const operator = KeywordDescTable[parser.token & 255];
      nextToken(parser, context, 1);
      const arg = parseLeftHandSideExpression(parser, context, 0, 1, 0);
      if (parser.assignable === 0) {
          report(parser, 66);
      }
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'UpdateExpression',
              argument: arg,
              operator,
              prefix: true,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'UpdateExpression',
              argument: arg,
              operator,
              prefix: true
          };
  }
  function parseUnaryExpression(parser, context, inGroup, inNew, allowLHS, start, line, column) {
      if (allowLHS === 0)
          report(parser, 0);
      if (inNew === 1)
          report(parser, 48, KeywordDescTable[parser.token & 255]);
      const unaryOperator = parser.token;
      nextToken(parser, context, 1);
      const arg = parseLeftHandSideExpression(parser, context, inGroup, 1, 0);
      if (parser.token === 135318585)
          report(parser, 76);
      if (context & 1024 && unaryOperator === 1179694 && arg.type === 'Identifier') {
          report(parser, 77);
      }
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'UnaryExpression',
              operator: KeywordDescTable[unaryOperator & 255],
              argument: arg,
              prefix: true,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'UnaryExpression',
              operator: KeywordDescTable[unaryOperator & 255],
              argument: arg,
              prefix: true
          };
  }
  function parseArrayLiteral(parser, context, skipInitializer, inGroup, start, line, column) {
      const expr = parseArrayExpressionOrPattern(parser, context, void 0, skipInitializer, 0, inGroup, 8, 0, start, line, column);
      if ((context & 16) !== 16 &&
          parser.flags & 512) {
          report(parser, 68);
      }
      if (parser.flags & 16) {
          report(parser, 58);
      }
      return expr;
  }
  function parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, operator, start, line, column) {
      const right = parseExpression(parser, context, inGroup);
      parser.assignable = 0;
      return context & 2
          ? isPattern
              ? {
                  type: 'AssignmentPattern',
                  left,
                  right,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'AssignmentExpression',
                  left,
                  operator,
                  right,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
          : isPattern
              ? {
                  type: 'AssignmentPattern',
                  left,
                  right
              }
              : {
                  type: 'AssignmentExpression',
                  left,
                  operator,
                  right
              };
  }
  function parseArrayExpressionOrPattern(parser, context, scope, skipInitializer, isPattern, inGroup, kind, origin, curStart, curLine, curColumn) {
      nextToken(parser, context, 1);
      const elements = [];
      let conjuncted = 0;
      context = (context | 8192) ^ 8192;
      while (parser.token !== 21) {
          if (consumeOpt(parser, context, 19, 1)) {
              elements.push(null);
          }
          else {
              let left;
              const { token, start, line, column, tokenValue } = parser;
              if (token & (131072 | 262144 | 2162688)) {
                  left = parsePrimaryExpression(parser, context, kind, 0, 1, 1, inGroup, start, line, column);
                  if (parser.token === 67108896) {
                      if (parser.assignable === 0)
                          report(parser, 60);
                      nextToken(parser, context, 1);
                      addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
                      left = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);
                  }
                  else if (parser.token === 19 || parser.token === 21) {
                      if (parser.assignable === 0) {
                          conjuncted |= 8;
                      }
                      else {
                          addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
                      }
                  }
                  else {
                      conjuncted |=
                          kind & 1
                              ? 4
                              : (kind & 8) !== 8
                                  ? 8
                                  : 0;
                      left = parseMemberExpression(parser, context, left, 0, 0, 0, start, line, column);
                      if (parser.token !== 19 && parser.token !== 21) {
                          if (parser.token !== 67108896)
                              conjuncted |= 8;
                          left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
                      }
                      else if (parser.token !== 67108896) {
                          conjuncted |= parser.assignable === 0 ? 8 : 4;
                      }
                  }
              }
              else if (token & 33554432) {
                  left =
                      parser.token === 34603021
                          ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column)
                          : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column);
                  parser.assignable = (conjuncted |= parser.flags) & 8 ? 0 : 1;
                  if (parser.token === 19 || parser.token === 21) {
                      if (parser.assignable === 0) {
                          conjuncted |= 8;
                      }
                  }
                  else {
                      if (parser.flags & 16) {
                          report(parser, 56);
                      }
                      left = parseMemberExpression(parser, context, left, 0, 0, 0, start, line, column);
                      conjuncted = parser.assignable === 0 ? 8 : 0;
                      if (parser.token !== 19 && parser.token !== 21) {
                          left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
                      }
                      else if (parser.token !== 67108896) {
                          conjuncted |= parser.assignable === 0 ? 8 : 4;
                      }
                  }
              }
              else if (token === 15) {
                  left = parseSpreadOrRestElement(parser, context, scope, 21, isPattern, 0, inGroup, kind, origin, start, line, column);
                  conjuncted |= parser.flags;
                  if (parser.token !== 19 && parser.token !== 21) {
                      report(parser, 86, KeywordDescTable[parser.token & 255]);
                  }
              }
              else {
                  left = parseLeftHandSideExpression(parser, context, 0, 1, 1);
                  if (parser.token !== 19 && parser.token !== 21) {
                      left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
                      if ((kind & (8 | 1)) === 0 && token === 1048588)
                          conjuncted |= 8;
                  }
                  else if (parser.assignable === 0) {
                      conjuncted |= 8;
                  }
                  else if (token === 1048588) {
                      conjuncted |=
                          parser.assignable === 1 && kind & (8 | 1)
                              ? 4
                              : 8;
                  }
              }
              elements.push(left);
              if (parser.token !== 19)
                  break;
              nextToken(parser, context, 1);
          }
      }
      consume(parser, context, 21, 0);
      const type = isPattern ? 'ArrayPattern' : 'ArrayExpression';
      const node = context & 2
          ? {
              type,
              elements,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type,
              elements
          };
      if (skipInitializer === 0 && parser.token & 67108864) {
          return parseArrayOrObjectAssignmentPattern(parser, context, conjuncted, isPattern, inGroup, curStart, curLine, curColumn, node);
      }
      parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
      return node;
  }
  function parseArrayOrObjectAssignmentPattern(parser, context, conjuncted, isPattern, inGroup, start, line, column, left) {
      if (parser.token !== 67108896)
          report(parser, 60);
      if (isPattern === 0)
          reinterpretToPattern(parser, left);
      if ((conjuncted & 8) === 8)
          report(parser, 60);
      nextToken(parser, context, 1);
      const node = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);
      parser.flags =
          ((parser.flags | 30) ^ 30) |
              ((conjuncted | 16 | 512) ^ (512 | 16));
      return node;
  }
  function parseFunctionExpression(parser, context, isAsync, start, line, column) {
      nextToken(parser, context, 1);
      const isGenerator = optionalBit(parser, context, 135314230);
      const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;
      let id = null;
      let scope = {
          parent: void 0,
          type: 2
      };
      if ((parser.token & (65536 | 131072 | 262144 | 2162688)) !== 0) {
          scope = {
              parent: {
                  parent: void 0,
                  type: 2
              },
              type: 256,
              scopeError: void 0
          };
          validateFunctionName(parser, ((context & 3072) << 11) | generatorAndAsyncFlags, parser.token);
          id = parseIdentifier(parser, context);
      }
      context =
          ((context | 32243712) ^ 32243712) |
              67108864 |
              generatorAndAsyncFlags;
      return parseFunctionLiteral(parser, context, scope, id, void 0, 0, 'FunctionExpression', 0, start, line, column);
  }
  function parseFunctionLiteral(parser, context, scope, id, firstRestricted, flags, type, isMethod, start, line, column) {
      scope = {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 512,
          scopeError: void 0
      };
      const params = parseFormalParams(parser, context | 8388608, scope, 1, isMethod);
      const body = parseFunctionBody(parser, (context | 268435456 | 134217728 | 131072) ^
          (268435456 | 134217728 | 131072), {
          parent: scope,
          type: 128,
          scopeError: void 0
      }, firstRestricted, flags, scope.scopeError);
      parser.assignable = 0;
      return context & 2
          ? {
              type,
              params,
              body,
              async: (context & 4194304) !== 0,
              generator: (context & 2097152) !== 0,
              id,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type,
              params,
              body,
              async: (context & 4194304) !== 0,
              generator: (context & 2097152) !== 0,
              id
          };
  }
  function parseFunctionBody(parser, context, scope, firstRestricted, flags, scopeError) {
      const { start, line, column } = parser;
      context = (context | 8192) ^ 8192;
      consume(parser, context, 34603021, 1);
      const body = [];
      const prevContext = context;
      const allowDirectives = context & 32;
      let isStrictDirective = 0;
      if (parser.token !== 16777232) {
          while (parser.token === 1572868) {
              const { index, start, line, column, tokenValue, isUnicodeEscape } = parser;
              let expression = parseLiteral(parser, context);
              if (isExactlyStrictDirective(parser, index, start, tokenValue)) {
                  isStrictDirective = 1;
                  context |= 1024;
                  if (parser.flags & 256)
                      report(parser, 92);
                  if (parser.flags & 128)
                      report(parser, 93);
              }
              if (isStrictDirective === 0) {
                  expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
              }
              consumeSemicolon(parser, context);
              body.push(allowDirectives
                  ? context & 2
                      ? {
                          type: 'ExpressionStatement',
                          expression,
                          directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue,
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ExpressionStatement',
                          expression,
                          directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue
                      }
                  : context & 2
                      ? {
                          type: 'ExpressionStatement',
                          expression,
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ExpressionStatement',
                          expression
                      });
          }
          if (context & 1024) {
              if (firstRestricted) {
                  if ((firstRestricted & 262144) === 262144) {
                      report(parser, 0);
                  }
              }
              if (scopeError && (prevContext & 1024) === 0 && (context & 268435456) === 0) {
                  reportScopeError(scopeError);
              }
              if (parser.flags & 32)
                  report(parser, 27);
              if (parser.flags & 64)
                  report(parser, 26);
          }
      }
      parser.flags =
          (parser.flags |
              32 |
              64 |
              128 |
              1024 |
              2048) ^
              (32 | 64 | 128 | 1024 | 2048);
      while (parser.token !== 16777232) {
          body.push(parseStatementListItem(parser, context, scope, 4, null, null));
      }
      consume(parser, context, 16777232, flags & 1 ? 1 : 0);
      parser.flags =
          (parser.flags | 256 | 1024 | 2048) ^
              (256 | 1024 | 2048);
      return context & 2
          ? {
              type: 'BlockStatement',
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'BlockStatement',
              body
          };
  }
  function parseClassExpression(parser, context, inGroup, curStart, curLine, curColumn) {
      nextToken(parser, context, 0);
      const inheritedContext = (context | 16777216 | 8192) ^ (8192 | 16777216);
      context |= 1024;
      let id = null;
      if (parser.token & (131072 | 262144 | 2162688) &&
          parser.token !== 131159) {
          const { token, start, line, column, tokenValue } = parser;
          if (isStrictReservedWord(parser, context, token, inGroup))
              report(parser, 26);
          nextToken(parser, context, 0);
          id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      }
      return parseClassDeclarationOrExpressionRest(parser, context, inheritedContext, id, inGroup, 0, 'ClassExpression', curStart, curLine, curColumn);
  }
  function parseClassDeclarationOrExpressionRest(parser, context, inheritedContext, id, inGroup, isDecl, type, start, line, column) {
      let superClass = null;
      if (parser.token === 131159) {
          nextToken(parser, context, 1);
          superClass = parseLeftHandSideExpression(parser, context, inGroup, 0, 0);
          inheritedContext |= 524288;
      }
      else {
          inheritedContext = (inheritedContext | 524288) ^ 524288;
      }
      const body = parseClassBody(parser, inheritedContext, context, isDecl, inGroup);
      parser.assignable = 0;
      return context & 2
          ? {
              type,
              id,
              superClass,
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type,
              id,
              superClass,
              body
          };
  }
  function parseClassBody(parser, context, inheritedContext, isDecl, inGroup) {
      const { start, line, column } = parser;
      consume(parser, context, 34603021, 1);
      const body = [];
      parser.flags = (parser.flags | 1) ^ 1;
      while (parser.token !== 16777232) {
          if (parser.token === 16777234) {
              nextToken(parser, context, 0);
              continue;
          }
          body.push(parseClassElementList(parser, context, inheritedContext, null, 0, 0, inGroup, 0, parser.start, parser.line, parser.column));
      }
      consume(parser, context, 16777232, isDecl ? 1 : 0);
      return context & 2
          ? {
              type: 'ClassBody',
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ClassBody',
              body
          };
  }
  function parseClassElementList(parser, context, inheritedContext, key, isStatic, isComputed, inGroup, type, curStart, curLine, curColumn) {
      const { token, start, line, column } = parser;
      if (token & (131072 | 65536 | 262144 | 2162688)) {
          key = parseIdentifier(parser, context);
          if (parser.token !== 1048588) {
              switch (token) {
                  case 262252:
                      if (isStatic === 0) {
                          return parseClassElementList(parser, context, inheritedContext, key, 1, isComputed, inGroup, type, start, line, column);
                      }
                      break;
                  case 2162799:
                      type |= 16 | (optionalBit(parser, context, 135314230) ? 8 : 0);
                      break;
                  case 65650:
                      type |= 128;
                      break;
                  case 65651:
                      type |= 256;
                      break;
              }
          }
      }
      else if ((token & 524288) === 524288) {
          key = parseLiteral(parser, context);
      }
      else if (token === 34603028) {
          isComputed = 1;
          key = parseComputedPropertyName(parser, inheritedContext, inGroup);
      }
      else if (token === 135314230) {
          type |= 8;
          nextToken(parser, context, 0);
      }
      else {
          report(parser, 0);
      }
      if (type & (8 | 16 | 384)) {
          if (parser.token & (131072 | 65536 | 262144 | 2162688)) {
              key = parseIdentifier(parser, context);
          }
          else if ((parser.token & 524288) === 524288) {
              key = parseLiteral(parser, context);
          }
          else if (parser.token === 34603028) {
              isComputed = 1;
              key = parseComputedPropertyName(parser, context, 0);
          }
          else
              report(parser, 52);
      }
      if (isComputed === 0) {
          if (parser.tokenValue === 'constructor') {
              if (isStatic === 0 && parser.token === 1048588) {
                  if (type & (384 | 16 | 8)) {
                      report(parser, 53, 'accessor');
                  }
                  if ((context & 524288) !== 524288) {
                      if (parser.flags & 1)
                          report(parser, 54);
                      else
                          parser.flags |= 1;
                  }
              }
              type |= 64;
          }
          else if (type & (32 | 384 | 8 | 16) &&
              parser.tokenValue === 'prototype') {
              report(parser, 55);
          }
      }
      const value = type & (256 | 256)
          ? parseGetterSetter(parser, context | 1024, type)
          : parseMethodDefinition(parser, context | 1024, type);
      const kind = isStatic === 0 && type & 64
          ? 'constructor'
          : type & 128
              ? 'get'
              : type & 256
                  ? 'set'
                  : 'method';
      return context & 2
          ? {
              type: 'MethodDefinition',
              kind,
              static: isStatic === 1,
              computed: isComputed === 1,
              key,
              value,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'MethodDefinition',
              kind,
              static: isStatic === 1,
              computed: isComputed === 1,
              key,
              value
          };
  }
  function parseIdentifierFromValue(parser, context, name, start, line, column) {
      return context & 2
          ? {
              type: 'Identifier',
              name,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Identifier',
              name
          };
  }
  function parseComputedPropertyName(parser, context, inGroup) {
      nextToken(parser, context, 1);
      const key = parseExpression(parser, (context | 8192) ^ 8192, inGroup);
      consume(parser, context, 21, 0);
      return key;
  }
  function parseMethodDefinition(parser, context, kind) {
      const modifierFlags = (kind & 64) === 0 ? 31981568 : 14680064;
      context =
          ((context | modifierFlags) ^ modifierFlags) |
              ((kind & 88) << 18) |
              100925440 |
              (kind & 16 ? 4194304 : 0) |
              (kind & 8 ? 2097152 : 0);
      return parseFunctionLiteral(parser, (context | 134221824 | 268435456) ^
          (134221824 | 268435456), {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 512,
          scopeError: void 0
      }, null, void 0, 0, 'FunctionExpression', 1, parser.start, parser.line, parser.column);
  }
  function parseGetterSetter(parser, context, kind) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      parser.flags = (parser.flags | 256) ^ 256;
      const params = [];
      const scope = {
          parent: {
              parent: void 0,
              type: 2
          },
          type: 512,
          scopeError: void 0
      };
      if (parser.token !== 17) {
          if (kind & 128)
              report(parser, 38, 'Getter', 'no', 's');
          const modifierFlags = (kind & 64) === 0
              ? 31981568
              : 14680064;
          context =
              ((context | modifierFlags) ^ modifierFlags) |
                  ((kind & 88) << 18) |
                  100925440 |
                  ((context | 8192) ^ 8192);
          let argCount = 0;
          let left;
          let isSimpleParameterList = 0;
          while (parser.token !== 17) {
              const { start, line, column, token, tokenValue } = parser;
              if (parser.token & (131072 | 262144 | 2162688)) {
                  if ((context & 1024) !== 1024) {
                      parser.flags |=
                          ((token & 262144) === 262144 ? 64 : 0) |
                              (isEvalOrArguments(tokenValue) ? 32 : 0);
                  }
                  left = parseAndClassifyIdentifier(parser, context, scope, token, tokenValue, kind | 1, 0, start, line, column, 0);
              }
              else {
                  if (parser.token === 34603028) {
                      left = parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, 1, 0, start, line, column);
                  }
                  else if (parser.token === 34603021) {
                      left = parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, 1, 0, start, line, column);
                  }
                  else if (parser.token === 15) {
                      if (kind & 256)
                          report(parser, 39);
                      left = parseSpreadOrRestElement(parser, context, scope, 17, 1, 0, 0, 1, 0, start, line, column);
                  }
                  else {
                      report(parser, 0);
                  }
                  isSimpleParameterList = 1;
                  if (parser.flags & (4 | 8)) {
                      report(parser, 70);
                  }
              }
              if (parser.token === 67108896) {
                  isSimpleParameterList = 1;
                  nextToken(parser, context, 1);
                  left = parseAssignmentOrPattern(parser, context, 1, 0, left, '=', start, line, column);
              }
              argCount++;
              params.push(left);
              if (parser.token !== 19)
                  break;
              nextToken(parser, context, 0);
          }
          if (kind & 256 && argCount !== 1) {
              report(parser, 38, 'Setter', 'one', '');
          }
          if (scope && scope.scopeError !== void 0)
              reportScopeError(scope.scopeError);
          if (isSimpleParameterList === 1)
              parser.flags |= 256;
      }
      else if (kind & 256) {
          report(parser, 38, 'Setter', 'one', '');
      }
      consume(parser, context, 17, 0);
      const body = parseFunctionBody(parser, (context | 134221824 | 268435456) ^
          (134221824 | 268435456), scope, void 0, 0, void 0);
      return context & 2
          ? {
              type: 'FunctionExpression',
              params,
              body,
              async: (kind & 16) === 1,
              generator: (kind & 8) === 1,
              id: null,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'FunctionExpression',
              params,
              body,
              async: (kind & 16) === 1,
              generator: (kind & 8) === 1,
              id: null
          };
  }
  function parseFormalParams(parser, context, scope, kind, isMethod) {
      context = (context | 8192) ^ 8192;
      nextToken(parser, context, 0);
      const params = [];
      parser.flags = (parser.flags | 256) ^ 256;
      let isSimpleParameterList = 0;
      while (parser.token !== 17) {
          let left;
          const { start, line, column, token, tokenValue } = parser;
          if (token & (131072 | 262144 | 2162688)) {
              if ((context & 1024) !== 1024) {
                  parser.flags |=
                      ((token & 262144) === 262144 ? 64 : 0) |
                          (isEvalOrArguments(tokenValue) ? 32 : 0);
              }
              left = parseAndClassifyIdentifier(parser, context, scope, token, tokenValue, kind | 1, 0, start, line, column, 0);
          }
          else {
              if (parser.token === 34603028) {
                  left = parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, kind, 0, start, line, column);
                  isSimpleParameterList = 1;
              }
              else if (parser.token === 34603021) {
                  left = parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, kind, 0, start, line, column);
                  isSimpleParameterList = 1;
              }
              else if (parser.token === 15) {
                  left = parseSpreadOrRestElement(parser, context, scope, 17, 1, 0, 0, kind, 0, start, line, column);
                  isSimpleParameterList = 1;
              }
              else {
                  report(parser, 0);
              }
              if (parser.flags & (4 | 8)) {
                  report(parser, 70);
              }
          }
          if (parser.token === 67108896) {
              nextToken(parser, context, 1);
              isSimpleParameterList = 1;
              left = parseAssignmentOrPattern(parser, context, 1, 0, left, '=', start, line, column);
          }
          params.push(left);
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 0);
          if (parser.token === 17) {
              break;
          }
      }
      if (scope.scopeError !== void 0 && (isMethod === 1 || isSimpleParameterList === 1 || context & 1024)) {
          reportScopeError(scope.scopeError);
      }
      parser.flags |= isSimpleParameterList === 1 ? 256 : 0;
      consume(parser, context, 17, 0);
      return params;
  }
  function parseObjectLiteral(parser, context, skipInitializer, inGroup, start, line, column) {
      const expr = parseObjectLiteralOrPattern(parser, context, void 0, skipInitializer, 0, inGroup, 8, 0, start, line, column);
      if ((context & 16) !== 16 &&
          parser.flags & 512) {
          report(parser, 68);
      }
      if (parser.flags & 16) {
          report(parser, 58);
      }
      return expr;
  }
  function parseObjectLiteralOrPattern(parser, context, scope, skipInitializer, isPattern, inGroup, type, origin, curStart, curLine, curColumn) {
      nextToken(parser, context, 0);
      const properties = [];
      context = (context | 8192) ^ 8192;
      let conjuncted = 0;
      let prototypeCount = 0;
      let key = null;
      let value;
      let state = 0;
      let operator;
      let kind = 'init';
      while (parser.token !== 16777232) {
          const { token, start, line, column, tokenValue } = parser;
          if (token === 15) {
              properties.push(parseSpreadOrRestElement(parser, context, scope, 16777232, isPattern, 0, inGroup, type, origin, start, line, column));
          }
          else {
              state = 0;
              if (token & (65536 | 131072 | 262144 | 2162688)) {
                  key = parseIdentifier(parser, context);
                  if (parser.token === 19 || parser.token === 16777232 || parser.token === 67108896) {
                      state |= 4;
                      if (context & 1024 && isEvalOrArguments(tokenValue)) {
                          conjuncted |= 8;
                      }
                      else {
                          validateIdentifier(parser, context, type, token);
                      }
                      addVarOrBlock(parser, context, scope, tokenValue, type, origin);
                      if (parser.token === 67108896) {
                          conjuncted |= 16;
                          nextToken(parser, context, 1);
                          value = parseAssignmentOrPattern(parser, context, isPattern, inGroup, key, '=', start, line, column);
                      }
                      else {
                          if (inGroup === 1 && token === 3211376)
                              conjuncted |= 2048;
                          value = key;
                      }
                  }
                  else if (parser.token === 22) {
                      nextToken(parser, context, 1);
                      const { start, line, column } = parser;
                      if (tokenValue === '__proto__')
                          prototypeCount++;
                      if (parser.token & (65536 | 131072 | 262144 | 2162688)) {
                          const { token: tokenAfterColon, tokenValue: valueAfterColon } = parser;
                          value = parsePrimaryExpression(parser, context, type, 0, 1, 1, inGroup, start, line, column);
                          const { token } = parser;
                          value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (token === 67108896 || token === 16777232 || token === 19) {
                                  if (parser.assignable === 0) {
                                      conjuncted |= 8;
                                  }
                                  else if ((tokenAfterColon & (65536 | 2162688)) !== 0) {
                                      addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                                  }
                              }
                              else {
                                  conjuncted |= parser.assignable === 1 ? 4 : 8;
                              }
                          }
                          else if ((parser.token & 67108864) === 67108864) {
                              if (parser.assignable === 0) {
                                  conjuncted |= 8;
                              }
                              else if (token !== 67108896) {
                                  conjuncted |= 4;
                              }
                              else {
                                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                              }
                              value = parseAssignmentExpression(parser, context, isPattern, 0, inGroup, value, start, line, column);
                          }
                          else {
                              conjuncted |= 8;
                              if ((parser.token & 135266304) === 135266304) {
                                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value);
                              }
                              if (parser.token === 23) {
                                  value = parseConditionalExpression(parser, context, value, start, line, column);
                              }
                          }
                      }
                      else if ((parser.token & 33554432) === 33554432) {
                          value =
                              parser.token === 34603021
                                  ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, type, origin, start, line, column)
                                  : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, 0, type, origin, start, line, column);
                          conjuncted = parser.flags;
                          parser.assignable = conjuncted & 8 ? 0 : 1;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                          }
                          else if (parser.flags & 16) {
                              report(parser, 56);
                          }
                          else {
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 0 ? 8 : 0;
                              if ((parser.token & 67108864) === 67108864) {
                                  operator = KeywordDescTable[parser.token & 255];
                                  nextToken(parser, context, 1);
                                  value = parseAssignmentOrPattern(parser, context, isPattern, 0, value, operator, start, line, column);
                              }
                              else {
                                  if ((parser.token & 135266304) === 135266304) {
                                      value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value);
                                  }
                                  if (parser.token === 23) {
                                      value = parseConditionalExpression(parser, context, value, start, line, column);
                                  }
                                  conjuncted |= parser.assignable === 0 ? 8 : 4;
                              }
                          }
                      }
                      else {
                          value = parseLeftHandSideExpression(parser, context, 0, 1, 1);
                          conjuncted |= parser.assignable === 1 ? 4 : 8;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                          }
                          else {
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 0 ? 8 : 0;
                              if (parser.token !== 19 && token !== 16777232) {
                                  if (parser.token !== 67108896)
                                      conjuncted |= 8;
                                  value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                              }
                          }
                      }
                  }
                  else if (parser.token === 34603028) {
                      conjuncted |= 8;
                      if (token === 2162799)
                          state |= 16;
                      state |=
                          (token === 65650
                              ? 128
                              : token === 65651
                                  ? 256
                                  : 1) | 2;
                      key = parseComputedPropertyName(parser, context, 0);
                      value = parseMethodDefinition(parser, context, state);
                  }
                  else if (parser.token & (131072 | 262144 | 65536 | 2162688)) {
                      conjuncted |= 8;
                      key = parseIdentifier(parser, context);
                      if (token === 2162799)
                          state |= 16;
                      state |=
                          token === 65650
                              ? 128
                              : token === 65651
                                  ? 256
                                  : 1;
                      value =
                          state & 384
                              ? parseGetterSetter(parser, context, state)
                              : parseMethodDefinition(parser, context, state);
                  }
                  else if (parser.token === 1048588) {
                      conjuncted |= 8;
                      state |= 1;
                      value = parseMethodDefinition(parser, context, state);
                  }
                  else if (parser.token === 135314230) {
                      if (token === 65650 || token === 65651) {
                          report(parser, 91);
                      }
                      conjuncted |= 8;
                      nextToken(parser, context, 0);
                      state |=
                          8 | 1 | (token === 2162799 ? 16 : 0);
                      if (parser.token & (131072 | 262144 | 65536 | 2162688)) {
                          key = parseIdentifier(parser, context);
                      }
                      else if ((parser.token & 524288) === 524288) {
                          key = parseLiteral(parser, context);
                      }
                      else if (parser.token === 34603028) {
                          state |= 2;
                          key = parseComputedPropertyName(parser, context, inGroup);
                      }
                      else {
                          report(parser, 0);
                      }
                      value = parseMethodDefinition(parser, context, state);
                  }
                  else if ((parser.token & 524288) === 524288) {
                      if (token === 2162799)
                          state |= 16;
                      state |=
                          token === 65650
                              ? 128
                              : token === 65651
                                  ? 256
                                  : 1;
                      conjuncted |= 8;
                      key = parseLiteral(parser, context);
                      value =
                          state & 384
                              ? parseGetterSetter(parser, context, state)
                              : parseMethodDefinition(parser, context, state);
                  }
                  else {
                      report(parser, 0);
                  }
              }
              else if ((parser.token & 524288) === 524288) {
                  key = parseLiteral(parser, context);
                  if (parser.token === 22) {
                      nextToken(parser, context, 1);
                      const { start, line, column } = parser;
                      if (tokenValue === '__proto__')
                          prototypeCount++;
                      if (parser.token & (65536 | 2162688)) {
                          value = parsePrimaryExpression(parser, context, type, 0, 1, 1, inGroup, start, line, column);
                          const { token, tokenValue: valueAfterColon } = parser;
                          value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (token === 67108896 || token === 16777232 || token === 19) {
                                  if (parser.assignable === 0) {
                                      conjuncted |= 8;
                                  }
                                  else if (scope) {
                                      addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                                  }
                              }
                              else {
                                  conjuncted |= parser.assignable === 1 ? 4 : 8;
                              }
                          }
                          else if (parser.token === 67108896) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                          }
                          else {
                              conjuncted |= 8;
                              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                          }
                      }
                      else if ((parser.token & 33554432) === 33554432) {
                          value =
                              parser.token === 34603021
                                  ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, type, origin, start, line, column)
                                  : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, inGroup, type, origin, start, line, column);
                          conjuncted = parser.flags;
                          parser.assignable = conjuncted & 8 ? 0 : 1;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                          }
                          else if (parser.flags & 16) {
                              report(parser, 56);
                          }
                          else {
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 0 ? 8 : 0;
                              if ((parser.token & 67108864) === 67108864) {
                                  operator = KeywordDescTable[parser.token & 255];
                                  nextToken(parser, context, 1);
                                  value = parseAssignmentOrPattern(parser, context, isPattern, 0, value, operator, start, line, column);
                              }
                              else {
                                  if ((parser.token & 135266304) === 135266304) {
                                      value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value);
                                  }
                                  if (parser.token === 23) {
                                      value = parseConditionalExpression(parser, context, value, start, line, column);
                                  }
                                  conjuncted |= parser.assignable === 0 ? 8 : 4;
                              }
                          }
                      }
                      else {
                          value = parseLeftHandSideExpression(parser, context, 0, 1, 1);
                          conjuncted |= parser.assignable === 1 ? 4 : 8;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0) {
                                  conjuncted |= 8;
                              }
                          }
                          else {
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 0 ? 8 : 0;
                              if (parser.token !== 19 && parser.token !== 16777232) {
                                  if (parser.token !== 67108896)
                                      conjuncted |= 8;
                                  value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                              }
                          }
                      }
                  }
                  else if (parser.token === 1048588) {
                      state |= 1;
                      value = parseMethodDefinition(parser, context, state);
                      conjuncted |= 8;
                  }
                  else {
                      report(parser, 0);
                  }
              }
              else if (parser.token === 34603028) {
                  key = parseComputedPropertyName(parser, context, inGroup);
                  state |= 2;
                  if (parser.token === 22) {
                      nextToken(parser, context, 1);
                      const { start, line, column, tokenValue, token: tokenAfterColon } = parser;
                      if (parser.token & (131072 | 262144 | 2162688)) {
                          value = parsePrimaryExpression(parser, context, type, 0, 1, 1, inGroup, start, line, column);
                          const { token } = parser;
                          value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                          if ((parser.token & 67108864) === 67108864) {
                              conjuncted |=
                                  parser.assignable === 0 ? 8 : token === 67108896 ? 0 : 4;
                              operator = KeywordDescTable[parser.token & 255];
                              nextToken(parser, context, 1);
                              value = parseAssignmentOrPattern(parser, context, isPattern, 0, value, operator, start, line, column);
                          }
                          else if (parser.token === 19 || parser.token === 16777232) {
                              if (token === 67108896 || token === 16777232 || token === 19) {
                                  if (parser.assignable === 0) {
                                      conjuncted |= 8;
                                  }
                                  else if (scope && (tokenAfterColon & 2162688) === 2162688) {
                                      addVarOrBlock(parser, context, scope, tokenValue, type, origin);
                                  }
                              }
                              else {
                                  conjuncted |= parser.assignable === 1 ? 4 : 8;
                              }
                          }
                          else {
                              conjuncted |= 8;
                              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                          }
                      }
                      else if ((parser.token & 33554432) === 33554432) {
                          value =
                              parser.token === 34603021
                                  ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, type, origin, start, line, column)
                                  : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, 0, type, origin, start, line, column);
                          conjuncted = parser.flags;
                          parser.assignable = conjuncted & 8 ? 0 : 1;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                          }
                          else {
                              if (conjuncted & 16)
                                  report(parser, 58);
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 0 ? conjuncted | 8 : 0;
                              if ((parser.token & 67108864) === 67108864) {
                                  if (parser.token !== 67108896)
                                      conjuncted |= 8;
                                  operator = KeywordDescTable[parser.token & 255];
                                  nextToken(parser, context, 1);
                                  value = parseAssignmentOrPattern(parser, context, isPattern, 0, value, operator, start, line, column);
                              }
                              else {
                                  if ((parser.token & 135266304) === 135266304) {
                                      value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value);
                                  }
                                  if (parser.token === 23) {
                                      value = parseConditionalExpression(parser, context, value, start, line, column);
                                  }
                                  conjuncted |= parser.assignable === 0 ? 8 : 4;
                              }
                          }
                      }
                      else {
                          value = parseLeftHandSideExpression(parser, context, 0, 1, 1);
                          conjuncted |= parser.assignable === 1 ? 4 : 8;
                          if (parser.token === 19 || parser.token === 16777232) {
                              if (parser.assignable === 0)
                                  conjuncted |= 8;
                          }
                          else {
                              value = parseMemberExpression(parser, context, value, 0, 0, 0, start, line, column);
                              conjuncted = parser.assignable === 1 ? 0 : 8;
                              if (parser.token !== 19 && parser.token !== 16777232) {
                                  if (parser.token !== 67108896)
                                      conjuncted |= 8;
                                  value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
                              }
                          }
                      }
                  }
                  else if (parser.token === 1048588) {
                      state |= 1;
                      conjuncted |= parser.flags & 2048 ? 2048 : 0;
                      value = parseMethodDefinition(parser, context, state);
                      conjuncted |= 8;
                  }
                  else {
                      report(parser, 59);
                  }
              }
              else if (token === 135314230) {
                  consume(parser, context, 135314230, 0);
                  state |= 8;
                  if (parser.token & (131072 | 262144 | 2162688)) {
                      key = parseIdentifier(parser, context);
                      state |= 1;
                      if (parser.token === 1048588) {
                          conjuncted |= 8;
                          value = parseMethodDefinition(parser, context, state);
                      }
                      else {
                          report(parser, 0);
                      }
                  }
                  else if ((parser.token & 524288) === 524288) {
                      key = parseLiteral(parser, context);
                      state |= 1;
                      value = parseMethodDefinition(parser, context, state);
                      conjuncted |= 8;
                  }
                  else if (parser.token === 34603028) {
                      state |= 2 | 1;
                      key = parseComputedPropertyName(parser, context, 0);
                      value = parseMethodDefinition(parser, context, state);
                      conjuncted |= 8;
                  }
                  else {
                      report(parser, 0);
                  }
              }
              else {
                  report(parser, 0);
              }
              parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
              kind = (state & 384) === 0 ? 'init' : state & 256 ? 'set' : 'get';
              properties.push(context & 2
                  ? {
                      type: 'Property',
                      key,
                      value,
                      kind,
                      computed: (state & 2) === 2,
                      method: (state & 1) === 1,
                      shorthand: (state & 4) === 4,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'Property',
                      key,
                      value,
                      kind,
                      computed: (state & 2) === 2,
                      method: (state & 1) === 1,
                      shorthand: (state & 4) === 4
                  });
          }
          conjuncted |= parser.flags;
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 0);
      }
      consume(parser, context, 16777232, 0);
      if (prototypeCount > 1)
          conjuncted |= 512;
      const node = context & 2
          ? {
              type: isPattern ? 'ObjectPattern' : 'ObjectExpression',
              properties,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: isPattern ? 'ObjectPattern' : 'ObjectExpression',
              properties
          };
      if ((parser.token & 67108864) === 67108864 && skipInitializer === 0) {
          return parseArrayOrObjectAssignmentPattern(parser, context, conjuncted, isPattern, inGroup, curStart, curLine, curColumn, node);
      }
      parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
      return node;
  }
  function parseSpreadOrRestElement(parser, context, scope, closingToken, isPattern, isAsync, inGroup, kind, origin, curStart, curLine, curColumn) {
      nextToken(parser, context, 1);
      let argument;
      let conjuncted = 0;
      const { start, line, column, token, tokenValue } = parser;
      if (token & (131072 | 262144 | 65536 | 2162688)) {
          parser.assignable = 1;
          argument = parsePrimaryExpression(parser, context, kind, 0, 1, 1, inGroup, start, line, column);
          const isClosingTokenOrComma = parser.token === closingToken || parser.token === 19;
          argument = parseMemberExpression(parser, context, argument, 0, 0, 0, start, line, column);
          if (parser.token !== 19 && parser.token !== closingToken) {
              if (parser.assignable === 0 && parser.token === 67108896)
                  report(parser, 56);
              conjuncted |= 8;
              argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
          }
          if (parser.assignable === 0) {
              conjuncted |= 8;
          }
          else if (isClosingTokenOrComma) {
              addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
          }
          else {
              conjuncted |= 4;
          }
      }
      else {
          if (token === closingToken) {
              report(parser, 0);
          }
          if (token & 33554432) {
              argument =
                  parser.token === 34603021
                      ? parseObjectLiteralOrPattern(parser, context, scope, 1, isPattern, 0, kind, origin, start, line, column)
                      : parseArrayExpressionOrPattern(parser, context, scope, 1, isPattern, 0, kind, origin, start, line, column);
              const token = parser.token;
              if (token !== 67108896 && token !== closingToken && token !== 19) {
                  if (parser.flags & 16)
                      report(parser, 56);
                  argument = parseMemberExpression(parser, context, argument, 0, 0, 0, start, line, column);
                  conjuncted |= parser.assignable === 0 ? 8 : 0;
                  if ((parser.token & 67108864) === 67108864) {
                      if (parser.token !== 67108896)
                          conjuncted |= 8;
                      argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
                  }
                  else {
                      if ((parser.token & 135266304) === 135266304) {
                          argument = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, argument);
                      }
                      if (parser.token === 23) {
                          argument = parseConditionalExpression(parser, context, argument, start, line, column);
                      }
                      conjuncted |= parser.assignable === 0 ? 8 : 4;
                  }
              }
              else {
                  conjuncted |=
                      closingToken === 16777232 && token !== 67108896 ? 8 : parser.flags;
              }
          }
          else {
              conjuncted |= 4;
              argument = parseLeftHandSideExpression(parser, context, 0, 1, 1);
              const token = parser.token;
              if (token === 67108896 && token !== closingToken && token !== 19) {
                  if (parser.assignable === 0)
                      report(parser, 60);
                  argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
                  conjuncted |= 8;
              }
              else {
                  if (token === 19) {
                      conjuncted |= 8;
                  }
                  else if (token !== closingToken) {
                      argument = parseAssignmentExpression(parser, context, 0, 0, 0, argument, start, line, column);
                  }
                  conjuncted |= parser.assignable === 1 ? 4 : 8;
              }
              parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
              if (parser.token !== closingToken && parser.token !== 19)
                  report(parser, 61);
              return context & 2
                  ? {
                      type: isPattern ? 'RestElement' : 'SpreadElement',
                      argument,
                      start: curStart,
                      end: parser.endIndex,
                      loc: setLoc(parser, curLine, curColumn)
                  }
                  : {
                      type: isPattern ? 'RestElement' : 'SpreadElement',
                      argument
                  };
          }
      }
      if (parser.token !== closingToken) {
          if (kind & 1)
              conjuncted |= isAsync ? 8 : 4;
          if (parser.token === 67108896) {
              if (conjuncted & 8)
                  report(parser, 60);
              nextToken(parser, context, 1);
              argument = parseAssignmentOrPattern(parser, context, isPattern, 0, argument, '=', curStart, curLine, curColumn);
              conjuncted = 8;
          }
          else {
              conjuncted |= 8;
          }
      }
      parser.flags = ((parser.flags | 30) ^ 30) | conjuncted;
      return context & 2
          ? {
              type: isPattern ? 'RestElement' : 'SpreadElement',
              argument,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: isPattern ? 'RestElement' : 'SpreadElement',
              argument
          };
  }
  function parseImportExpression(parser, context, start, line, column) {
      consume(parser, context, 1048588, 1);
      if (parser.token === 17)
          report(parser, 0);
      if (parser.token === 15)
          report(parser, 0);
      const source = parseExpression(parser, context, 0);
      consume(parser, context, 17, 0);
      return context & 2
          ? {
              type: 'ImportExpression',
              source,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ImportExpression',
              source
          };
  }
  function parseAndClassifyIdentifier(parser, context, scope, t, name, kind, origin, start, line, column, allowRegExp = 0) {
      if (context & 1024) {
          if ((t & 262144) === 262144) {
              report(parser, 26);
          }
      }
      if (context & (4194304 | 2048) && t === 3211376) {
          report(parser, 30);
      }
      if ((t & 131072) === 131072) {
          report(parser, 28);
      }
      if (context & (2048 | 2097152) && t === 3473517) {
          report(parser, 36);
      }
      if (t === 538181707) {
          if (kind & (16 | 32))
              report(parser, 29);
      }
      if (context & (4194304 | 2048) && t === 3211376) {
          report(parser, 30);
      }
      nextToken(parser, context, allowRegExp);
      addVarOrBlock(parser, context, scope, name, kind, origin);
      return context & 2
          ? {
              type: 'Identifier',
              name,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Identifier',
              name
          };
  }
  function parseBindingPattern(parser, context, scope, kind, origin) {
      const { tokenValue, start, line, column, token } = parser;
      if ((token & (131072 | 262144 | 2162688)) !== 0) {
          return parseAndClassifyIdentifier(parser, context, scope, token, tokenValue, kind, origin, start, line, column, 1);
      }
      if ((parser.token & 33554432) !== 33554432)
          report(parser, 0);
      const left = parser.token === 34603028
          ? parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column)
          : parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column);
      if (parser.flags & 8)
          report(parser, 70);
      if (parser.flags & 4)
          report(parser, 70);
      return left;
  }
  function parseImportMetaExpression(parser, context, meta, start, line, column) {
      if ((context & 2048) === 0)
          report(parser, 49);
      nextToken(parser, context, 0);
      if (parser.tokenValue !== 'meta')
          report(parser, 0);
      parser.assignable = 0;
      return context & 2
          ? {
              type: 'MetaProperty',
              property: parseIdentifier(parser, context),
              meta,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'MetaProperty',
              property: parseIdentifier(parser, context),
              meta
          };
  }

  function parseFunctionDeclaration(parser, context, scope, flags, origin) {
      return parseFunctionDeclarationRest(parser, context, scope, flags, origin, parser.start, parser.line, parser.column);
  }
  function parseFunctionDeclarationRest(parser, context, scope, flags, origin, start, line, column) {
      nextToken(parser, context, 1);
      const isGenerator = flags & 2 ? optionalBit(parser, context, 135314230) : 0;
      const isAsync = flags & 4 ? 1 : 0;
      let id = null;
      let firstRestricted;
      let innerScope = {
          parent: void 0,
          type: 2
      };
      if (parser.token === 1048588) {
          if (flags & 8)
              report(parser, 32, 'Function');
      }
      else {
          const { token, tokenValue, start, line, column } = parser;
          validateFunctionName(parser, context | ((context & 3072) << 11), token);
          if (origin & 4 && (context & 2048) !== 2048) {
              addVarName(parser, context, scope, tokenValue, 2);
          }
          else {
              addBlockName(parser, context, scope, tokenValue, 4, origin);
          }
          innerScope = {
              parent: innerScope,
              type: 256,
              scopeError: void 0
          };
          firstRestricted = token;
          nextToken(parser, context, 0);
          id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      }
      context =
          ((context | 32243712) ^ 32243712) |
              67108864 |
              ((isAsync * 2 + isGenerator) << 21);
      return parseFunctionLiteral(parser, context, innerScope, id, firstRestricted, flags, 'FunctionDeclaration', 0, start, line, column);
  }
  function parseClassDeclaration(parser, context, scope, flags) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      const inheritedContext = (context | 16777216) ^ 16777216;
      context |= 1024;
      let id = null;
      if (parser.token & (131072 | 262144 | 2162688) &&
          parser.token !== 131159) {
          if (isStrictReservedWord(parser, context, parser.token, 0)) {
              report(parser, 26);
          }
          addBlockName(parser, context, scope, parser.tokenValue, 64, 0);
          id = parseIdentifier(parser, context);
      }
      else {
          if ((flags & 1) === 0)
              report(parser, 32, 'Class');
      }
      return parseClassDeclarationOrExpressionRest(parser, context, inheritedContext, id, 0, 1, 'ClassDeclaration', start, line, column);
  }
  function parseVariableStatementOrLexicalDeclaration(parser, context, scope, kind, origin) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      const declarations = parseVariableDeclarationListAndDeclarator(parser, context, scope, kind, origin);
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'VariableDeclaration',
              kind: kind & 32 ? 'const' : 'var',
              declarations,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'VariableDeclaration',
              kind: kind & 32 ? 'const' : 'var',
              declarations
          };
  }
  function parseVariableDeclarationListAndDeclarator(parser, context, scope, kind, origin) {
      const list = [];
      let id = null;
      let type;
      let init = null;
      while (parser.token !== 19) {
          const { start, line, column } = parser;
          type = kind | ((parser.token & 33554432) === 33554432 ? 1024 : 0);
          id = parseBindingPattern(parser, context, scope, kind, origin);
          init = null;
          if (parser.token === 67108896) {
              nextToken(parser, context, 1);
              init = parseExpression(parser, context, 0);
          }
          else if ((type & (32 | 1024)) !== 0 &&
              (parser.token & 4144) !== 4144) {
              report(parser, 34, kind & 32 ? 'const' : 'destructuring');
          }
          list.push(context & 2
              ? {
                  type: 'VariableDeclarator',
                  init,
                  id,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'VariableDeclarator',
                  init,
                  id
              });
          if (parser.token !== 19)
              break;
          nextToken(parser, context, 1);
      }
      return list;
  }
  function parseImportCallDeclaration(parser, context, start, line, column) {
      let expr = parseImportExpression(parser, context, start, line, column);
      expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
      return parseExpressionStatement(parser, context, expr, start, line, column);
  }
  function parseImportMetaDeclaration(parser, context, start, line, column) {
      let expr = context & 2
          ? {
              type: 'Identifier',
              name: 'import',
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'Identifier',
              name: 'import'
          };
      expr = parseImportMetaExpression(parser, context, expr, start, line, column);
      expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
      expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
      return parseExpressionStatement(parser, context, expr, start, line, column);
  }

  function parseStatementList(parser, context, scope) {
      const statements = [];
      const allowDirectives = context & 32;
      let isStrictDirective = 0;
      while (parser.token === 1572868) {
          const { index, start, line, column, tokenValue, isUnicodeEscape } = parser;
          let expression = parseLiteral(parser, context);
          if (isExactlyStrictDirective(parser, index, start, tokenValue)) {
              isStrictDirective = 1;
              context |= 1024;
          }
          if (isStrictDirective === 0) {
              expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
          }
          consumeSemicolon(parser, context);
          statements.push(allowDirectives
              ? context & 2
                  ? {
                      type: 'ExpressionStatement',
                      expression,
                      directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'ExpressionStatement',
                      expression,
                      directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue
                  }
              : context & 2
                  ? {
                      type: 'ExpressionStatement',
                      expression,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'ExpressionStatement',
                      expression
                  });
      }
      while (parser.token !== 16777216) {
          statements.push(parseStatementListItem(parser, context, scope, 4, null, null));
      }
      return statements;
  }
  function parseStatementListItem(parser, context, scope, origin, labels, nestedLabels) {
      switch (parser.token) {
          case 1179738:
              return parseFunctionDeclaration(parser, context, scope, 11, origin);
          case 2162799:
              return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 1);
          case 1179728:
              return parseClassDeclaration(parser, context, scope, 0);
          case 538050636:
              return parseVariableStatementOrLexicalDeclaration(parser, context, scope, 32, 0);
          case 538181707:
              return parseLetIdentOrVarDeclarationStatement(parser, context, scope, labels, nestedLabels, origin);
          case 1179740:
              return parseImportCallOrForbidImport(parser, context);
          case 131158:
              report(parser, 0, 'export');
          default:
              return parseStatement(parser, context, scope, origin, labels, nestedLabels, 1);
      }
  }
  function parseStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl) {
      switch (parser.token) {
          case 538050634:
              return parseVariableStatementOrLexicalDeclaration(parser, context, scope, 2, 0);
          case 34603021:
              return parseBlock(parser, context, {
                  parent: scope,
                  type: 2,
                  scopeError: void 0
              }, labels, nestedLabels);
          case 16777234:
              return parseEmptyStatement(parser, context);
          case 131166:
              return parseReturnStatement(parser, context);
          case 131161:
              return parseForStatement(parser, context, scope, labels);
          case 131156:
              return parseDoWhileStatement(parser, context, scope, labels, nestedLabels);
          case 131172:
              return parseWhileStatement(parser, context, scope, labels, nestedLabels);
          case 1179744:
              return parseSwitchStatement(parser, context, scope, labels, nestedLabels);
          case 1179746:
              return parseThrowStatement(parser, context);
          case 131149:
              return parseBreakStatement(parser, context, labels);
          case 131153:
              return parseContinueStatement(parser, context, labels);
          case 131171:
              return parseTryStatement(parser, context, scope, labels);
          case 131163:
              return parseIfStatement(parser, context, scope, labels);
          case 131173:
              return parseWithStatement(parser, context, scope, labels, nestedLabels);
          case 131154:
              return parseDebuggerStatement(parser, context);
          case 2162799:
              return parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, 0);
          case 1179738:
              report(parser, context & (16 | 1024) ? 82 : 83);
          case 1179728:
              report(parser, 84);
          default:
              return parseExpressionOrLabelledStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl);
      }
  }
  function parseLabelledStatement(parser, context, scope, origin, labels, nestedLabels, value, token, expr, allowFuncDecl, start, line, column) {
      if ((token & 524288) === 524288)
          report(parser, 0);
      validateIdentifier(parser, context, 0, token);
      labels = addLabel(parser, value, labels, nestedLabels);
      nextToken(parser, context, 1);
      nestedLabels = parseStatementWithLabelSet(parser.token, value, labels, nestedLabels);
      const body = context & (16 | 1024) || parser.token !== 1179738
          ? parseStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl)
          : parseFunctionDeclaration(parser, context, scope, 1, origin);
      return context & 2
          ? {
              type: 'LabeledStatement',
              label: expr,
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'LabeledStatement',
              label: expr,
              body
          };
  }
  function parseImportCallOrForbidImport(parser, context) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      switch (parser.token) {
          case 1048588:
              return parseImportCallDeclaration(parser, context, start, line, column);
          case 14:
              return parseImportMetaDeclaration(parser, context, start, line, column);
          default:
              report(parser, 50, 'import');
      }
  }
  function parseNonDirectiveExpression(parser, context, expr, start, line, column) {
      expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
      expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
      return parser.token === 19 ? parseSequenceExpression(parser, context, expr, start, line, column) : expr;
  }
  function parseAsyncArrowOrAsyncFunctionDeclaration(parser, context, scope, origin, labels, allowFuncDecl) {
      const { token, tokenValue, start, line, column } = parser;
      nextToken(parser, context, 0);
      if (parser.token === 22) {
          return parseLabelledStatement(parser, context, scope, origin, labels, null, tokenValue, token, parseIdentifierFromValue(parser, context, tokenValue, start, line, column), allowFuncDecl, start, line, column);
      }
      const asyncNewLine = parser.newLine;
      if (asyncNewLine === 0) {
          if (parser.token === 1179738) {
              if (allowFuncDecl === 0)
                  report(parser, 79);
              return parseFunctionDeclarationRest(parser, context, scope, 4 | 11, origin, start, line, column);
          }
          if ((parser.token & 2162688) === 2162688) {
              if (context & (1024 | 2097152) && parser.token === 3473517) {
                  report(parser, 36);
              }
              if (parser.token === 3211376)
                  report(parser, 87);
              let expr = parseAsyncArrowIdentifier(parser, context, 1, parser.tokenValue, parseIdentifier(parser, context), start, line, column);
              if (parser.token === 19)
                  expr = parseSequenceExpression(parser, context, expr, start, line, column);
              return parseExpressionStatement(parser, context, expr, start, line, column);
          }
      }
      let expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      if (parser.token === 1048588) {
          expr = parseAsyncArrowOrCallExpression(parser, (context | 8192) ^ 8192, expr, 1, asyncNewLine, 1, 0, start, line, column);
      }
      else {
          if (parser.token === 11) {
              expr = parseAsyncArrowIdentifier(parser, context, 1, 'async', expr, start, line, column);
          }
          parser.assignable = 1;
      }
      expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
      if (parser.token === 19)
          expr = parseSequenceExpression(parser, context, expr, start, line, column);
      expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
      parser.assignable = 1;
      return parseExpressionStatement(parser, context, expr, start, line, column);
  }
  function parseBlock(parser, context, scope, labels, nestedLabels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      const body = [];
      while (parser.token !== 16777232) {
          body.push(parseStatementListItem(parser, context, scope, 2, labels, nestedLabels));
      }
      consume(parser, context, 16777232, 1);
      return context & 2
          ? {
              type: 'BlockStatement',
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'BlockStatement',
              body
          };
  }
  function parseEmptyStatement(parser, context) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      return context & 2
          ? {
              type: 'EmptyStatement',
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'EmptyStatement'
          };
  }
  function parseReturnStatement(parser, context) {
      if (context & 268435456 && (context & 64) === 0)
          report(parser, 21);
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      const argument = parser.newLine !== 0 || parser.token & 16777216 ? null : parseExpressions(parser, context, 0);
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'ReturnStatement',
              argument,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ReturnStatement',
              argument
          };
  }
  function parseForStatementWithVariableDeclarations(parser, context, scope, labels, curStart, curLine, curColumn) {
      const { token, start, line, column, tokenValue } = parser;
      let test = null;
      let update = null;
      let init = null;
      let right;
      const origin = 32;
      let kind = 8;
      let isLet = false;
      nextToken(parser, context, 0);
      if (token === 538181707) {
          if ((parser.token & (2162688 | 131072 | 262144 | 33554432)) !== 0) {
              if (parser.token === 139624500) {
                  if (context & 1024)
                      report(parser, 40);
                  init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
              }
              else {
                  kind = 16;
              }
          }
          else {
              if (context & 1024)
                  report(parser, 40);
              init = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
              init = parseMemberExpression(parser, context, init, 0, 0, 0, start, line, column);
              isLet = true;
          }
          parser.assignable = 1;
      }
      else {
          parser.assignable = 1;
          kind = token === 538050634 ? 2 : 32;
      }
      if (kind & (2 | 16 | 32)) {
          const declarations = [];
          let bindingCount = 0;
          let type;
          while (parser.token !== 19) {
              const { tokenValue, start, line, column, token } = parser;
              type = kind | ((parser.token & 33554432) === 33554432 ? 1024 : 0);
              let id;
              let init = null;
              if ((token & (131072 | 262144 | 2162688)) !== 0) {
                  id = parseAndClassifyIdentifier(parser, context, scope, token, tokenValue, kind, origin, start, line, column, 1);
                  if (parser.token === 67108896) {
                      nextToken(parser, context, 1);
                      init = parseExpression(parser, context | 8192, 0);
                      if ((parser.token & 4194304) === 4194304) {
                          if (parser.token === 4259957)
                              report(parser, 33, 'of');
                          if ((parser.token === 139624500 && (kind & 2) !== 2) ||
                              context & (1024 | 16)) {
                              report(parser, 33, 'in');
                          }
                      }
                  }
                  else if ((type & (32 | 1024)) !== 0 &&
                      (parser.token & 4194304) !== 4194304) {
                      report(parser, 34, kind & 32 ? 'const' : 'destructuring');
                  }
              }
              else if ((token & 33554432) === 33554432) {
                  id =
                      parser.token === 34603028
                          ? parseArrayExpressionOrPattern(parser, context | 8192, scope, 1, 1, 0, kind, origin, start, line, column)
                          : parseObjectLiteralOrPattern(parser, context | 8192, scope, 1, 1, 0, kind, origin, start, line, column);
                  if (parser.flags & (8 | 4))
                      report(parser, 70);
                  if (parser.token === 67108896) {
                      nextToken(parser, context, 1);
                      init = parseExpression(parser, context | 8192, 0);
                      if ((parser.token & 4194304) === 4194304) {
                          if (parser.token === 4259957)
                              report(parser, 33, 'of');
                          if ((parser.token === 139624500 && (kind & 2) !== 2) ||
                              context & (1024 | 16)) {
                              report(parser, 33, 'in');
                          }
                      }
                  }
                  else if ((type & (32 | 1024)) !== 0 &&
                      (parser.token & 4194304) !== 4194304) {
                      report(parser, 34, kind & 32 ? 'const' : 'destructuring');
                  }
              }
              declarations.push(context & 2
                  ? {
                      type: 'VariableDeclarator',
                      init,
                      id,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'VariableDeclarator',
                      init,
                      id
                  });
              bindingCount++;
              if (parser.token !== 19)
                  break;
              consumeOpt(parser, context, 19, 1);
          }
          if (bindingCount > 1 && parser.token & 4194304) {
              report(parser, 35);
          }
          init =
              context & 2
                  ? {
                      type: 'VariableDeclaration',
                      kind: kind & 16 ? 'let' : kind & 32 ? 'const' : 'var',
                      declarations,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'VariableDeclaration',
                      kind,
                      declarations
                  };
      }
      if (parser.token === 4259957) {
          if (isLet)
              report(parser, 41);
          nextToken(parser, context, 1);
          right = parseExpression(parser, context, 0);
          consume(parser, context, 17, 1);
          const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
          return context & 2
              ? {
                  type: 'ForOfStatement',
                  body,
                  left: init,
                  right,
                  await: false,
                  start: curStart,
                  end: parser.endIndex,
                  loc: setLoc(parser, curLine, curColumn)
              }
              : {
                  type: 'ForOfStatement',
                  body,
                  left: init,
                  right,
                  await: false
              };
      }
      else if (parser.token === 139624500) {
          nextToken(parser, context, 1);
          right = parseExpressions(parser, context, 0);
          consume(parser, context, 17, 1);
          const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
          return context & 2
              ? {
                  type: 'ForInStatement',
                  body,
                  left: init,
                  right,
                  start: curStart,
                  end: parser.endIndex,
                  loc: setLoc(parser, curLine, curColumn)
              }
              : {
                  type: 'ForInStatement',
                  body,
                  left: init,
                  right
              };
      }
      init = parseAssignmentExpression(parser, context | 8192, 0, parser.token === 67108896 ? 1 : 0, 0, init, start, line, column);
      if (parser.token === 19)
          init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);
      consume(parser, context, 16777234, 1);
      if (parser.token !== 16777234)
          test = parseExpressions(parser, context, 0);
      consume(parser, context, 16777234, 1);
      if (parser.token !== 17)
          update = parseExpressions(parser, context, 0);
      consume(parser, context, 17, 1);
      const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
      return context & 2
          ? {
              type: 'ForStatement',
              body,
              init,
              test,
              update,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'ForStatement',
              body,
              init,
              test,
              update
          };
  }
  function parseForStatement(parser, context, scope, labels) {
      const { start: curStart, line: curLine, column: curColumn } = parser;
      nextToken(parser, context, 0);
      const forAwait = (context & 4194304) > 0 && consumeOpt(parser, context, 3211376, 0);
      consume(parser, context, 1048588, 1);
      scope = {
          parent: scope,
          type: 1,
          scopeError: void 0
      };
      let test = null;
      let update = null;
      let init = null;
      let right;
      const origin = 32;
      const kind = 8;
      let conjuncted = 0;
      const { token, start, line, column } = parser;
      if ((token & 536870912) !== 0) {
          return parseForStatementWithVariableDeclarations(parser, context, scope, labels, curStart, curLine, curColumn);
      }
      if (token === 16777234) {
          if (forAwait)
              report(parser, 0);
      }
      else if ((token & 33554432) === 33554432) {
          init =
              token === 34603021
                  ? parseObjectLiteralOrPattern(parser, context, scope, 1, 0, 0, kind, origin, start, line, column)
                  : parseArrayExpressionOrPattern(parser, context, scope, 1, 0, 0, kind, origin, start, line, column);
          conjuncted = parser.flags;
          if ((context & 16) === 0 && conjuncted & 512) {
              report(parser, 68);
          }
          parser.assignable = conjuncted & 8 ? 0 : 1;
          init = parseMemberExpression(parser, context | 8192, init, 0, 0, 0, parser.start, parser.line, parser.column);
          conjuncted = parser.flags;
      }
      else {
          init = parseLeftHandSideExpression(parser, context | 8192, 0, 1, 1);
      }
      if ((parser.token & 4194304) === 4194304) {
          reinterpretToPattern(parser, init);
          if (parser.token === 4259957) {
              if (parser.assignable === 0)
                  report(parser, 69, forAwait ? 'await' : 'of');
              nextToken(parser, context, 1);
              right = parseExpression(parser, context, 0);
              consume(parser, context, 17, 1);
              const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
              return context & 2
                  ? {
                      type: 'ForOfStatement',
                      body,
                      left: init,
                      right,
                      await: forAwait,
                      start: curStart,
                      end: parser.endIndex,
                      loc: setLoc(parser, curLine, curColumn)
                  }
                  : {
                      type: 'ForOfStatement',
                      body,
                      left: init,
                      right,
                      await: forAwait
                  };
          }
          if (parser.assignable === 0)
              report(parser, 69, 'in');
          nextToken(parser, context, 1);
          right = parseExpressions(parser, context, 0);
          consume(parser, context, 17, 1);
          const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
          return context & 2
              ? {
                  type: 'ForInStatement',
                  body,
                  left: init,
                  right,
                  start: curStart,
                  end: parser.endIndex,
                  loc: setLoc(parser, curLine, curColumn)
              }
              : {
                  type: 'ForInStatement',
                  body,
                  left: init,
                  right
              };
      }
      if (forAwait)
          report(parser, 0);
      if (conjuncted & 16 && parser.token !== 67108896) {
          report(parser, 69, 'loop');
      }
      init = parseAssignmentExpression(parser, context | 8192, 0, parser.token === 67108896 ? 1 : 0, 0, init, start, line, column);
      if (parser.token === 19)
          init = parseSequenceExpression(parser, context, init, parser.start, parser.line, parser.column);
      consume(parser, context, 16777234, 1);
      if (parser.token !== 16777234)
          test = parseExpressions(parser, context, 0);
      consume(parser, context, 16777234, 1);
      if (parser.token !== 17)
          update = parseExpressions(parser, context, 0);
      consume(parser, context, 17, 1);
      const body = parseStatement(parser, context | 131072, scope, origin, labels, null, 0);
      return context & 2
          ? {
              type: 'ForStatement',
              body,
              init,
              test,
              update,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'ForStatement',
              body,
              init,
              test,
              update
          };
  }
  function parseDoWhileStatement(parser, context, scope, labels, nestedLabel) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      const body = parseStatement(parser, context | 131072, scope, 0, labels, nestedLabel, 0);
      consume(parser, context, 131172, 0);
      consume(parser, context, 1048588, 1);
      const test = parseExpressions(parser, context, 0);
      consume(parser, context, 17, 1);
      consumeOpt(parser, context, 16777234, 1);
      return context & 2
          ? {
              type: 'DoWhileStatement',
              body,
              start,
              test,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'DoWhileStatement',
              body,
              test
          };
  }
  function parseWhileStatement(parser, context, scope, labels, nestedLabels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      consume(parser, context, 1048588, 1);
      const test = parseExpressions(parser, (context | 8192) ^ 8192, 0);
      consume(parser, context, 17, 1);
      const body = parseStatement(parser, context | 131072, scope, 0, labels, nestedLabels, 0);
      return context & 2
          ? {
              type: 'WhileStatement',
              test,
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'WhileStatement',
              test,
              body
          };
  }
  function parseSwitchStatement(parser, context, scope, labels, nestedLabels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      consume(parser, context, 1048588, 1);
      const discriminant = parseExpressions(parser, context, 0);
      consume(parser, context, 17, 0);
      consume(parser, context, 34603021, 0);
      const cases = [];
      let seenDefault = 0;
      scope = {
          parent: scope,
          type: 8,
          scopeError: void 0
      };
      while (parser.token !== 16777232) {
          const { start, line, column } = parser;
          let test = null;
          const consequent = [];
          if (consumeOpt(parser, context, 131150, 1)) {
              test = parseExpressions(parser, context, 0);
          }
          else {
              consume(parser, context, 131155, 1);
              if (seenDefault)
                  report(parser, 0);
              seenDefault = 1;
          }
          consume(parser, context, 22, 1);
          while (parser.token !== 131150 &&
              parser.token !== 16777232 &&
              parser.token !== 131155) {
              consequent.push(parseStatementListItem(parser, context | 134217728, scope, 2, labels, nestedLabels));
          }
          cases.push(context & 2
              ? {
                  type: 'SwitchCase',
                  test,
                  consequent,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'SwitchCase',
                  test,
                  consequent
              });
      }
      consume(parser, context, 16777232, 1);
      return context & 2
          ? {
              type: 'SwitchStatement',
              discriminant,
              cases,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'SwitchStatement',
              discriminant,
              cases
          };
  }
  function parseIfStatement(parser, context, scope, labels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      consume(parser, context, 1048588, 1);
      const test = parseExpressions(parser, (context | 8192) ^ 8192, 0);
      consume(parser, context, 17, 1);
      const consequent = parseConsequentOrAlternative(parser, context, scope, labels);
      const alternate = consumeOpt(parser, context, 131157, 1)
          ? parseConsequentOrAlternative(parser, context, scope, labels)
          : null;
      return context & 2
          ? {
              type: 'IfStatement',
              test,
              consequent,
              alternate,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'IfStatement',
              test,
              consequent,
              alternate
          };
  }
  function parseConsequentOrAlternative(parser, context, scope, labels) {
      return context & (1024 | 16) || parser.token !== 1179738
          ? parseStatement(parser, context, scope, 0, labels, null, 0)
          : parseFunctionDeclaration(parser, context, {
              parent: scope,
              type: 2,
              scopeError: void 0
          }, 11, 0);
  }
  function parseThrowStatement(parser, context) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      if (parser.newLine !== 0)
          report(parser, 44);
      const argument = parseExpressions(parser, context, 0);
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'ThrowStatement',
              argument,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ThrowStatement',
              argument
          };
  }
  function parseBreakStatement(parser, context, labels) {
      const { start: curStart, line: curLine, column: curColumn } = parser;
      nextToken(parser, context, 1);
      let label = null;
      if (parser.newLine === 0 && (parser.token & 16777216) === 0) {
          const { tokenValue, start, line, column } = parser;
          nextToken(parser, context, 1);
          label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
          if (isValidBreakLabel(parser, labels, tokenValue) === 0)
              report(parser, 80, tokenValue);
      }
      else if ((context & (134217728 | 131072)) === 0) {
          report(parser, 85);
      }
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'BreakStatement',
              label,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'BreakStatement',
              label
          };
  }
  function parseContinueStatement(parser, context, labels) {
      if ((context & 131072) === 0)
          report(parser, 81);
      const { start: curStart, line: curLine, column: curColumn } = parser;
      nextToken(parser, context, 1);
      let label = null;
      if (parser.newLine === 0 && (parser.token & 16777216) !== 16777216) {
          const { tokenValue, start, line, column } = parser;
          nextToken(parser, context, 1);
          label = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
          let found = 0;
          let iterationLabel;
          l: while (labels) {
              if (labels.iterationLabels) {
                  iterationLabel = labels.iterationLabels;
                  for (let i = 0; i < iterationLabel.length; i++) {
                      if (iterationLabel[i] === tokenValue) {
                          found = 1;
                          break l;
                      }
                  }
              }
              labels = labels.parentLabels;
          }
          if (found === 0) {
              report(parser, 80, tokenValue);
          }
      }
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'ContinueStatement',
              label,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type: 'ContinueStatement',
              label
          };
  }
  function parseTryStatement(parser, context, scope, labels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      const block = parseBlock(parser, context, {
          parent: scope,
          type: 32,
          scopeError: void 0
      }, labels, null);
      let handler = null;
      if (parser.token === 131151) {
          const { start, line, column } = parser;
          nextToken(parser, context, 1);
          let param = null;
          let additionalScope = scope;
          if (parser.token === 1048588) {
              nextToken(parser, context, 0);
              scope = {
                  parent: scope,
                  type: 4,
                  scopeError: void 0
              };
              const kind = (parser.token & 33554432) === 33554432
                  ? 256
                  : 512;
              param = parseBindingPattern(parser, context, scope, kind, 0);
              consume(parser, context, 17, 1);
              additionalScope = {
                  parent: scope,
                  type: 64,
                  scopeError: void 0
              };
          }
          const body = parseBlock(parser, context, additionalScope, labels, null);
          handler =
              context & 2
                  ? {
                      type: 'CatchClause',
                      param,
                      body,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'CatchClause',
                      param,
                      body
                  };
      }
      const finalizer = consumeOpt(parser, context, 131160, 0)
          ? parseBlock(parser, context, {
              parent: scope,
              type: 4,
              scopeError: void 0
          }, labels, null)
          : null;
      if (!handler && !finalizer) {
          report(parser, 42);
      }
      return context & 2
          ? {
              type: 'TryStatement',
              block,
              handler,
              finalizer: finalizer,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'TryStatement',
              block,
              handler,
              finalizer
          };
  }
  function parseWithStatement(parser, context, scope, labels, nestedLabels) {
      const { start, line, column } = parser;
      nextToken(parser, context, 0);
      if (context & 1024)
          report(parser, 43);
      consume(parser, context, 1048588, 1);
      const object = parseExpressions(parser, context, 0);
      consume(parser, context, 17, 1);
      const body = parseStatement(parser, context, scope, 0, labels, nestedLabels, 0);
      return context & 2
          ? {
              type: 'WithStatement',
              object,
              body,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'WithStatement',
              object,
              body
          };
  }
  function parseDebuggerStatement(parser, context) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type: 'DebuggerStatement',
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'DebuggerStatement'
          };
  }
  function parseLetIdentOrVarDeclarationStatement(parser, context, scope, labels, nestedLabels, origin) {
      const { token, tokenValue, start, line, column } = parser;
      nextToken(parser, context, 0);
      if (parser.token & (2162688 | 33554432)) {
          const declarations = parseVariableDeclarationListAndDeclarator(parser, context, scope, 16, 0);
          consumeSemicolon(parser, context);
          return context & 2
              ? {
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations,
                  start,
                  end: parser.endIndex,
                  loc: setLoc(parser, line, column)
              }
              : {
                  type: 'VariableDeclaration',
                  kind: 'let',
                  declarations
              };
      }
      parser.assignable = 1;
      if (context & 1024)
          report(parser, 87);
      let expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
      if (parser.token === 22) {
          return parseLabelledStatement(parser, context, scope, origin, labels, nestedLabels, tokenValue, token, expr, 0, start, line, column);
      }
      if (parser.token === 11) {
          expr = parseAsyncArrowIdentifier(parser, context, 0, tokenValue, expr, start, line, column);
      }
      else {
          expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
          expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
      }
      if (parser.token === 19) {
          expr = parseSequenceExpression(parser, context, expr, start, line, column);
      }
      return parseExpressionStatement(parser, context, expr, start, line, column);
  }
  function parseExpressionOrLabelledStatement(parser, context, scope, origin, labels, nestedLabels, allowFuncDecl) {
      const { tokenValue, token, start, line, column } = parser;
      let expr = parsePrimaryExpression(parser, context, 0, 0, 1, 1, 0, start, line, column);
      if (token === 538181707 && parser.token === 34603028)
          report(parser, 0);
      if (parser.token === 22) {
          return parseLabelledStatement(parser, context, scope, origin, labels, nestedLabels, tokenValue, token, expr, allowFuncDecl, start, line, column);
      }
      expr = parseMemberExpression(parser, context, expr, 0, 0, 0, start, line, column);
      expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
      if (parser.token === 19) {
          expr = parseSequenceExpression(parser, context, expr, start, line, column);
      }
      return parseExpressionStatement(parser, context, expr, start, line, column);
  }

  function parseModuleItemListAndDirectives(parser, context, scope) {
      const statements = [];
      if (context & 32) {
          while (parser.token === 1572868) {
              const { start, line, column, isUnicodeEscape, tokenValue } = parser;
              let expression = parseLiteral(parser, context);
              if (parser.token !== 16777234) {
                  expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
              }
              consumeSemicolon(parser, context);
              const directive = isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue;
              const type = 'ExpressionStatement';
              statements.push(context & 2
                  ? {
                      type,
                      expression,
                      directive,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type,
                      expression,
                      directive
                  });
          }
      }
      while (parser.token !== 16777216) {
          statements.push(parseModuleItem(parser, context, scope));
      }
      return statements;
  }
  function parseModuleItem(parser, context, scope) {
      if (parser.token === 131158) {
          return parseExportDeclaration(parser, context, scope);
      }
      if (parser.token === 1179740) {
          return parseImportDeclaration(parser, context);
      }
      return parseStatementListItem(parser, context, scope, 4, null, null);
  }
  function parseImportDeclaration(parser, context) {
      const curStart = parser.start;
      const curLine = parser.line;
      const curColumn = parser.column;
      nextToken(parser, context, 0);
      let source = null;
      let specifiers = [];
      const type = 'ImportDeclaration';
      if (parser.token === 1572868) {
          source = parseLiteral(parser, context);
      }
      else {
          if (parser.token & (131072 | 262144 | 2162688)) {
              const { start, line, column } = parser;
              const local = parseIdentifier(parser, context);
              specifiers = [
                  context & 2
                      ? {
                          type: 'ImportDefaultSpecifier',
                          local,
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ImportDefaultSpecifier',
                          local
                      }
              ];
              if (parser.token !== 19) {
                  source = parseModuleSpecifier(parser, context);
                  consumeSemicolon(parser, context);
                  return context & 2
                      ? {
                          type,
                          specifiers,
                          source,
                          start: curStart,
                          end: parser.endIndex,
                          loc: setLoc(parser, curLine, curColumn)
                      }
                      : {
                          type,
                          specifiers,
                          source
                      };
              }
              nextToken(parser, context, 0);
          }
          switch (parser.token) {
              case 135314230:
                  const { start, line, column } = parser;
                  nextToken(parser, context, 0);
                  consume(parser, context, 65646, 0);
                  specifiers.push(context & 2
                      ? {
                          type: 'ImportNamespaceSpecifier',
                          local: parseIdentifier(parser, context),
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ImportNamespaceSpecifier',
                          local: parseIdentifier(parser, context)
                      });
                  break;
              case 34603021:
                  nextToken(parser, context, 0);
                  while (parser.token & (131072 | 262144 | 2162688)) {
                      const { start, line, column } = parser;
                      const imported = parseIdentifier(parser, context);
                      const local = consumeOpt(parser, context, 65646, 0)
                          ? parseIdentifier(parser, context)
                          : imported;
                      specifiers.push(context & 2
                          ? {
                              type: 'ImportSpecifier',
                              local,
                              imported,
                              start,
                              end: parser.endIndex,
                              loc: setLoc(parser, line, column)
                          }
                          : {
                              type: 'ImportSpecifier',
                              local,
                              imported
                          });
                      if (parser.token !== 16777232)
                          consume(parser, context, 19, 0);
                  }
                  consume(parser, context, 16777232, 0);
                  break;
              case 1048588:
                  return parseImportCallDeclaration(parser, context, curStart, curLine, curColumn);
              case 14:
                  return parseImportMetaDeclaration(parser, context, curStart, curLine, curColumn);
              default:
                  report(parser, 0);
          }
          source = parseModuleSpecifier(parser, context);
      }
      consumeSemicolon(parser, context);
      return context & 2
          ? {
              type,
              specifiers,
              source,
              start: curStart,
              end: parser.endIndex,
              loc: setLoc(parser, curLine, curColumn)
          }
          : {
              type,
              specifiers,
              source
          };
  }
  function parseModuleSpecifier(parser, context) {
      consumeOpt(parser, context, 65652, 0);
      if (parser.token !== 1572868)
          report(parser, 0);
      return parseLiteral(parser, context);
  }
  function parseExportDefaultDeclaration(parser, context, scope, start, line, column) {
      nextToken(parser, context, 1);
      let declaration = null;
      switch (parser.token) {
          case 1179738:
              declaration = parseFunctionDeclaration(parser, context, scope, 1 | 2, 4);
              break;
          case 1179728:
              declaration = parseClassDeclaration(parser, context, scope, 1);
              break;
          case 2162799:
              const { tokenValue, start, line, column } = parser;
              nextToken(parser, context, 0);
              if (parser.newLine === 0) {
                  if (parser.token === 1179738) {
                      declaration = parseFunctionDeclarationRest(parser, context, scope, 4 | 1, 64, start, line, column);
                  }
                  else {
                      declaration = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
                      if (parser.token & 2162688) {
                          declaration = parseIdentifier(parser, context);
                          declaration = parseArrowFunction(parser, context, scope, [declaration], 1, start, line, column);
                      }
                      else {
                          if (parser.token === 1048588) {
                              declaration = parseAsyncArrowOrCallExpression(parser, (context | 8192) ^ 8192, declaration, 1, parser.newLine, 1, 0, start, line, column);
                          }
                          declaration = parseMemberExpression(parser, context, declaration, 0, 0, 0, start, line, column);
                          declaration = parseAssignmentExpression(parser, context, 0, 0, 0, declaration, start, line, column);
                      }
                  }
              }
              break;
          default:
              declaration = parseExpression(parser, context, 0);
              consumeSemicolon(parser, context);
      }
      return context & 2
          ? {
              type: 'ExportDefaultDeclaration',
              declaration,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ExportDefaultDeclaration',
              declaration
          };
  }
  function parseExportDeclaration(parser, context, scope) {
      const { start, line, column } = parser;
      nextToken(parser, context, 1);
      let specifiers = [];
      let declaration = null;
      let source = null;
      switch (parser.token) {
          case 131155:
              return parseExportDefaultDeclaration(parser, context, scope, start, line, column);
          case 135314230: {
              nextToken(parser, context, 0);
              if (consumeOpt(parser, context, 65646, 0)) {
                  const exported = parseIdentifier(parser, context);
                  specifiers = [
                      context & 2
                          ? {
                              type: 'ExportAllDeclaration',
                              source,
                              exported,
                              start,
                              end: parser.endIndex,
                              loc: setLoc(parser, line, column)
                          }
                          : {
                              type: 'ExportAllDeclaration',
                              source,
                              exported
                          }
                  ];
                  consume(parser, context, 65652, 0);
                  source = parseLiteral(parser, context);
                  consumeSemicolon(parser, context);
                  return context & 2
                      ? {
                          type: 'ExportNamedDeclaration',
                          source,
                          specifiers,
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ExportNamedDeclaration',
                          source,
                          specifiers
                      };
              }
              consume(parser, context, 65652, 0);
              source = parseLiteral(parser, context);
              consumeSemicolon(parser, context);
              return context & 2
                  ? {
                      type: 'ExportAllDeclaration',
                      source,
                      exported: null,
                      start,
                      end: parser.endIndex,
                      loc: setLoc(parser, line, column)
                  }
                  : {
                      type: 'ExportAllDeclaration',
                      source,
                      exported: null
                  };
          }
          case 34603021: {
              nextToken(parser, context, 0);
              while (parser.token & (262144 | 131072 | 2162688)) {
                  const { start, line, column } = parser;
                  const local = parseIdentifier(parser, context);
                  let exported;
                  if (parser.token === 65646) {
                      nextToken(parser, context, 0);
                      exported = parseIdentifier(parser, context);
                  }
                  else {
                      exported = local;
                  }
                  specifiers.push(context & 2
                      ? {
                          type: 'ExportSpecifier',
                          local,
                          exported,
                          start,
                          end: parser.endIndex,
                          loc: setLoc(parser, line, column)
                      }
                      : {
                          type: 'ExportSpecifier',
                          local,
                          exported
                      });
                  if (parser.token !== 16777232)
                      consume(parser, context, 19, 0);
              }
              consume(parser, context, 16777232, 0);
              if (consumeOpt(parser, context, 65652, 0)) {
                  source = parseLiteral(parser, context);
              }
              consumeSemicolon(parser, context);
              break;
          }
          case 1179728:
              declaration = parseClassDeclaration(parser, context, scope, 1);
              break;
          case 1179738:
              declaration = parseFunctionDeclaration(parser, context, scope, 1 | 2 | 8, 4);
              break;
          case 538181707:
              declaration = parseVariableStatementOrLexicalDeclaration(parser, context, scope, 16, 64);
              break;
          case 538050636:
              declaration = parseVariableStatementOrLexicalDeclaration(parser, context, scope, 32, 64);
              break;
          case 538050634:
              declaration = parseVariableStatementOrLexicalDeclaration(parser, context, scope, 2, 64);
              break;
          case 2162799: {
              const { start, line, column } = parser;
              nextToken(parser, context, 0);
              if (parser.newLine === 0 && parser.token === 1179738) {
                  declaration = parseFunctionDeclarationRest(parser, context, scope, 4 | 1, 64, start, line, column);
                  break;
              }
          }
          default:
              report(parser, 0, KeywordDescTable[parser.token & 255]);
      }
      return context & 2
          ? {
              type: 'ExportNamedDeclaration',
              source,
              specifiers,
              declaration,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
          }
          : {
              type: 'ExportNamedDeclaration',
              source,
              specifiers,
              declaration
          };
  }

  function parseScript(source, options) {
      let context = 0;
      if (options != null) {
          if (options.next)
              context |= 1;
          if (options.loc)
              context |= 2;
          if (options.disableWebCompat)
              context |= 16;
          if (options.directives)
              context |= 32 | 8;
          if (options.raw)
              context |= 8;
          if (options.globalReturn)
              context |= 64;
          if (options.impliedStrict)
              context |= 1024;
      }
      const parser = create(source);
      skipHashBang(parser, source);
      nextToken(parser, context, 1);
      const body = parseStatementList(parser, context | 268435456, {
          parent: void 0,
          type: 2
      });
      return context & 2
          ? {
              type: 'Program',
              sourceType: 'script',
              body,
              start: 0,
              end: source.length,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: parser.lineBase,
                      column: parser.index - parser.offset
                  }
              }
          }
          : {
              type: 'Program',
              sourceType: 'script',
              body
          };
  }
  function parseModule(source, options) {
      let context = 1024 | 2048;
      if (options != null) {
          if (options.next)
              context |= 1;
          if (options.loc)
              context |= 2;
          if (options.disableWebCompat)
              context |= 16;
          if (options.directives)
              context |= 32 | 8;
          if (options.globalReturn)
              context |= 64;
          if (options.raw)
              context |= 8;
      }
      const parser = create(source);
      skipHashBang(parser, source);
      nextToken(parser, context, 1);
      const body = parseModuleItemListAndDirectives(parser, context | 268435456, {
          parent: void 0,
          type: 2
      });
      return context & 2
          ? {
              type: 'Program',
              sourceType: 'module',
              body,
              start: 0,
              end: source.length,
              loc: {
                  start: {
                      line: 1,
                      column: 0
                  },
                  end: {
                      line: parser.lineBase,
                      column: parser.index - parser.offset
                  }
              }
          }
          : {
              type: 'Program',
              sourceType: 'module',
              body
          };
  }
  function parse(source, options) {
      return options && options.module ? parseModule(source, options) : parseScript(source, options);
  }

  exports.parse = parse;
  exports.parseModule = parseModule;
  exports.parseScript = parseScript;

  return exports;

}({}));
