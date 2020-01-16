import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Regular expression', () => {
  for (const [source, ctx, expected] of [
    [
      `[a, /a/]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Identifier',
                  name: 'a',
                  start: 1,
                  end: 2,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 2
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: /a/,
                  regex: {
                    pattern: 'a',
                    flags: ''
                  },
                  start: 4,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  }
                }
              ],
              start: 0,
              end: 8,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 8
                }
              }
            },
            start: 0,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 8
              }
            }
          }
        ],
        start: 0,
        end: 8,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 8
          }
        }
      }
    ],
    // [`var a = b./aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [`var a = /aaa/;`, Context.OptionsNext | Context.OptionsLoc, {}],

    [
      `var a = /aaa/;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Literal',
                  value: /aaa/,
                  regex: {
                    pattern: 'aaa',
                    flags: ''
                  },
                  start: 8,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'a',
                  start: 4,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 5
                    }
                  }
                },
                start: 4,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              }
            ],
            start: 0,
            end: 14,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 14
              }
            }
          }
        ],
        start: 0,
        end: 14,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 14
          }
        }
      }
    ]
    /*  [
      `/aaa/ / /aaa/;`,
      Context.OptionsNext | Context.OptionsLoc | Context.OptionsRaw,
      {
        "type": "Program",
        "sourceType": "script",
        "body": [
          {
            "type": "ExpressionStatement",
            "expression": {
              "type": "BinaryExpression",
              "left": {
                "type": "Literal",
                "value": {},
                "regex": {
                  "pattern": "aaa",
                  "flags": ""
                },
                "start": 0,
                "end": 5,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 0
                  },
                  "end": {
                    "line": 1,
                    "column": 5
                  }
                }
              },
              "right": {
                "type": "Literal",
                "value": {},
                "regex": {
                  "pattern": "aaa",
                  "flags": ""
                },
                "start": 8,
                "end": 13,
                "loc": {
                  "start": {
                    "line": 1,
                    "column": 8
                  },
                  "end": {
                    "line": 1,
                    "column": 13
                  }
                }
              },
              "operator": "/",
              "start": 0,
              "end": 13,
              "loc": {
                "start": {
                  "line": 1,
                  "column": 0
                },
                "end": {
                  "line": 1,
                  "column": 13
                }
              }
            },
            "start": 0,
            "end": 14,
            "loc": {
              "start": {
                "line": 1,
                "column": 0
              },
              "end": {
                "line": 1,
                "column": 14
              }
            }
          }
        ],
        "start": 0,
        "end": 14,
        "loc": {
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 1,
            "column": 14
          }
        }
      }
    ]*/
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
