import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

function convertDecimalToBinary(digit: any, groups: boolean): string {
  let res = '';
  for (let i = 0, shifted = digit; i < 32; i++, res += String(shifted >>> 31), shifted <<= 1);
  // Makes a groups of 8 bits
  if (groups) res = res.replace(/\B(?=(.{8})+(?!.))/g, "_");
  return res;
}

describe('Statements - Switch', () => {

 console.log(convertDecimalToBinary(244, false));
  for (const [source, ctx] of [
    [`switch (x) {case a: function f(){}; break; case b: let f; break; }`, Context.OptionsDisableWebCompat],
    [`switch (x) { case a: let foo; break; case b: let foo; break; }`, Context.OptionsDisableWebCompat],
    [`switch (x) { case a: let foo; break; default: let foo; break; }`, Context.OptionsDisableWebCompat],
    ['switch (x) { case a: let foo; break; case b: var foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: var foo; break; case b: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: let foo; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: let foo; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: const foo = x; break; case b: var foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case a: var foo = x; break; case b: const foo = x; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) { case 0: var foo = 1 } let foo = 1;', Context.OptionsDisableWebCompat],

    ['switch (0) { case 1: class f {} default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: let f }', Context.Empty],

    ['switch (x) {case a: const f = x; break; case b: function f(){}; break; }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: async function f(){}; break; case b: let f; break; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: function f(){}; break; case b: async function f(){} }', Context.OptionsDisableWebCompat],
    [
      'switch (x) {case a: async function f(){}; break; case b: async function f(){} }',
      Context.OptionsDisableWebCompat
    ],
    ['switch (x) {case a: async function *f(){}; break; case b: function f(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: function *f(){}; break; case b: async function f(){} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: var f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: var f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: class f {} }', Context.Empty],
    ['switch (0) { case 1: function* f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: function* f() {} default: var f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: var f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: var f }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: let f; }', Context.Empty],
    ['switch (0) { case 1: class f {} default: let f; }', Context.Empty],
    ['switch (0) { case 1: class f {} default: var f; }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: const f = 0; }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: let f; }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: const f = 0; }', Context.Empty],
    ['switch (0) { case 1: function f() {} default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: class f {}; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: let f; }', Context.Empty],
    ['switch (0) { case 1: var f; default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: class f {} }', Context.Empty],
    ['switch (0) { case 1: let f; default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: class f {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: class f {} }', Context.Strict],
    ['switch (0) { case 1: var f = 0; default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f = 0; default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f = 0; default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f = 0; ({f}) default: let x; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f = 0; const {f} = x; default: let x; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f = 0; var {f} = x; default: let x; }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: let f = 0; var {f} = x; default: let x; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; x; default: let {f} = x; } var {f} = f', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: class f {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: async function* f() {} }', Context.Empty],
    ['switch (0) { case 1: async function* f() {} default: var f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: let f }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function f() {} default: const f = 0 }', Context.OptionsDisableWebCompat],
    ['switch (x) {case a: function f(){}; break; case b: function f(){}; break; }', Context.OptionsDisableWebCompat],
    ['switch (0) { default: let f; if (false) ; else function f() {  } }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: async function* f() {} default: var f; }', Context.Empty],
    ['switch (0) { case 1: class f {} default: class f {}; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: class f {} default: const f = 0; }', Context.OptionsDisableWebCompat | Context.Strict],
    ['switch (0) { case 1: class f {} default: function f() {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: class f {}; }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: const f = 0; }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: function f() {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: class f {}; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: function* f() {} }', Context.Empty],
    ['switch (0) { case 1: const f = 0; default: let f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: const f = 0; default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: async function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function* f() {} default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: class f {}; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: let f; default: var f; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: async function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: class f {}; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: const f = 0; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: function f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: var f; default: function f() {} }', Context.Empty],
    ['switch (0) { case 1: var f; default: function* f() {} }', Context.OptionsDisableWebCompat],
    ['switch (0) { default: let f; if (false) ; else function f() {  } }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: let a; case 1: let a; }', Context.OptionsDisableWebCompat],
    ['switch (0) { case 1: function f() {} default: var f }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: let a; case 1: var a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: let a; case 1: var a; }', Context.Empty],
    ['switch(0) { default: let a; case 0: let a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: var a; case 1: let a; }', Context.Empty],
    ['switch(0) { case 0: var a; default: let a; }', Context.Empty],
    ['switch(0) { default: let a; case 0: var a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: let a; default: let a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: let a; default: let a; }', Context.Empty],
    ['switch(0) { default: let a; case 0: let a; }', Context.Empty],
    ['switch(0) { case 0: var a; case 1: let a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: var a; default: let a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { default: let a; case 0: var a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: var a; case 1: const a = 0; }', Context.Empty],
    ['switch(0) { case 0: const a = 0; default: var a; }', Context.Empty],
    ['switch(0) { case 0: var a; default: const a = 0; }', Context.Empty],
    ['switch(0) { default: const a = 0; case 0: var a; }', Context.Empty],
    ['switch(0) { default: var a; case 0: const a = 0; }', Context.Empty],
    ['switch(0) { case 0: var a; case 1: const a = 0; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: const a = 0; default: var a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { case 0: var a; default: const a = 0; }', Context.OptionsDisableWebCompat],
    ['switch(0) { default: const a = 0; case 0: var a; }', Context.OptionsDisableWebCompat],
    ['switch(0) { default: var a; case 0: const a = 0; }', Context.OptionsDisableWebCompat],
    ['switch (x) { default: function(){} function(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) { case c: function(){} function(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) { case c: async function f(){} async function f(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) { default: async function f(){} async function f(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) { default: async function *f(){} async function *f(){} }', Context.OptionsDisableWebCompat],
    ['switch (x) { default: function f(){} function f(){} }', Context.OptionsDisableWebCompat | Context.Strict],
    ['switch (x) { default: function *f(){} function *f(){} }', Context.OptionsDisableWebCompat],
    [`if (x) var foo = 1; let foo = 1;`, Context.Empty],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.OptionsDisableWebCompat | Context.Module],
    [`const x = a; function x(){};`, Context.OptionsDisableWebCompat],
    [`if (x) {} else var foo = 1; let foo = 1;`, Context.OptionsDisableWebCompat],
    [`if (x) var foo = 1; else {} let foo = 1;`, Context.Empty],
    [`if (x) {} else if (y) {} else var foo = 1; let foo = 1;`, Context.Empty],
    [`if (x) { if (y) var foo = 1; } let foo = 1;`, Context.Empty]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `switch (true) { case true: function g() {} }`,
      Context.OptionsNext | Context.OptionsLoc | Context.Strict,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: true,
              start: 8,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: true,
                  start: 21,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 40,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 40
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'g',
                      start: 36,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    start: 27,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 16,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              }
            ],
            start: 0,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 44
              }
            }
          }
        ],
        start: 0,
        end: 44,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 44
          }
        }
      }
    ],
    [
      `switch (x) { default: function *f(){} function *f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 35,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 32,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    start: 22,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 51,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 51
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 48,
                      end: 49,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 49
                        }
                      }
                    },
                    start: 38,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 38
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  }
                ],
                start: 13,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 53
                  }
                }
              }
            ],
            start: 0,
            end: 55,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 55
              }
            }
          }
        ],
        start: 0,
        end: 55,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 55
          }
        }
      }
    ],
    [
      `switch (x) { default: async function *f(){} async function *f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 41,
                      end: 43,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 43
                        }
                      }
                    },
                    async: true,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 38,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    start: 22,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 63,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 63
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    },
                    async: true,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 60,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 60
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    start: 44,
                    end: 65,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 65
                      }
                    }
                  }
                ],
                start: 13,
                end: 65,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 65
                  }
                }
              }
            ],
            start: 0,
            end: 67,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 67
              }
            }
          }
        ],
        start: 0,
        end: 67,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 67
          }
        }
      }
    ],
    [
      `switch (x) { case c: async function f(){} async function f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'c',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 39,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    async: true,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 36,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    start: 21,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 60,
                      end: 62,
                      loc: {
                        start: {
                          line: 1,
                          column: 60
                        },
                        end: {
                          line: 1,
                          column: 62
                        }
                      }
                    },
                    async: true,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 57,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 57
                        },
                        end: {
                          line: 1,
                          column: 58
                        }
                      }
                    },
                    start: 42,
                    end: 62,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 62
                      }
                    }
                  }
                ],
                start: 13,
                end: 62,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 62
                  }
                }
              }
            ],
            start: 0,
            end: 64,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 64
              }
            }
          }
        ],
        start: 0,
        end: 64,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 64
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f; default: var f }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 13,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        start: 41,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 28,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              }
            ],
            start: 0,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 44
              }
            }
          }
        ],
        start: 0,
        end: 44,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 44
          }
        }
      }
    ],
    [
      `switch (x) { case a: var foo; break; default: var foo; break; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 25,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        start: 25,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 30,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 13,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 50,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        },
                        start: 50,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
                    start: 46,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 46
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 55,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  }
                ],
                start: 37,
                end: 61,
                loc: {
                  start: {
                    line: 1,
                    column: 37
                  },
                  end: {
                    line: 1,
                    column: 61
                  }
                }
              }
            ],
            start: 0,
            end: 63,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 63
              }
            }
          }
        ],
        start: 0,
        end: 63,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 63
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
                          start: 29,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'x',
                      start: 32,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    start: 32,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  }
                ],
                start: 13,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
                          start: 54,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        },
                        id: {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'f',
                                start: 49,
                                end: 50,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 49
                                  },
                                  end: {
                                    line: 1,
                                    column: 50
                                  }
                                }
                              },
                              value: {
                                type: 'Identifier',
                                name: 'f',
                                start: 49,
                                end: 50,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 49
                                  },
                                  end: {
                                    line: 1,
                                    column: 50
                                  }
                                }
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true,
                              start: 49,
                              end: 50,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 49
                                },
                                end: {
                                  line: 1,
                                  column: 50
                                }
                              }
                            }
                          ],
                          start: 48,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 48
                            },
                            end: {
                              line: 1,
                              column: 51
                            }
                          }
                        },
                        start: 48,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 48
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      }
                    ],
                    start: 44,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    }
                  }
                ],
                start: 35,
                end: 56,
                loc: {
                  start: {
                    line: 1,
                    column: 35
                  },
                  end: {
                    line: 1,
                    column: 56
                  }
                }
              }
            ],
            start: 0,
            end: 58,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 58
              }
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'f',
                  start: 69,
                  end: 70,
                  loc: {
                    start: {
                      line: 1,
                      column: 69
                    },
                    end: {
                      line: 1,
                      column: 70
                    }
                  }
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'f',
                        start: 64,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 64
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 'f',
                        start: 64,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 64
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
                      start: 64,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 64
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    }
                  ],
                  start: 63,
                  end: 66,
                  loc: {
                    start: {
                      line: 1,
                      column: 63
                    },
                    end: {
                      line: 1,
                      column: 66
                    }
                  }
                },
                start: 63,
                end: 70,
                loc: {
                  start: {
                    line: 1,
                    column: 63
                  },
                  end: {
                    line: 1,
                    column: 70
                  }
                }
              }
            ],
            start: 59,
            end: 70,
            loc: {
              start: {
                line: 1,
                column: 59
              },
              end: {
                line: 1,
                column: 70
              }
            }
          }
        ],
        start: 0,
        end: 70,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 70
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f; default: var f }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 13,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        start: 41,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 28,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              }
            ],
            start: 0,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 44
              }
            }
          }
        ],
        start: 0,
        end: 44,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 44
          }
        }
      }
    ],
    [
      `switch (x) { case a: var foo; break; default: var foo; break; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 25,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        start: 25,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 30,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 13,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 50,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        },
                        start: 50,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 50
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        }
                      }
                    ],
                    start: 46,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 46
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 55,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 55
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  }
                ],
                start: 37,
                end: 61,
                loc: {
                  start: {
                    line: 1,
                    column: 37
                  },
                  end: {
                    line: 1,
                    column: 61
                  }
                }
              }
            ],
            start: 0,
            end: 63,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 63
              }
            }
          }
        ],
        start: 0,
        end: 63,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 63
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f = 0; x; default: var {f} = x; } var {f} = f`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
                          start: 29,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'x',
                      start: 32,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    start: 32,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  }
                ],
                start: 13,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
                          start: 54,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        },
                        id: {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'f',
                                start: 49,
                                end: 50,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 49
                                  },
                                  end: {
                                    line: 1,
                                    column: 50
                                  }
                                }
                              },
                              value: {
                                type: 'Identifier',
                                name: 'f',
                                start: 49,
                                end: 50,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 49
                                  },
                                  end: {
                                    line: 1,
                                    column: 50
                                  }
                                }
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true,
                              start: 49,
                              end: 50,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 49
                                },
                                end: {
                                  line: 1,
                                  column: 50
                                }
                              }
                            }
                          ],
                          start: 48,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 48
                            },
                            end: {
                              line: 1,
                              column: 51
                            }
                          }
                        },
                        start: 48,
                        end: 55,
                        loc: {
                          start: {
                            line: 1,
                            column: 48
                          },
                          end: {
                            line: 1,
                            column: 55
                          }
                        }
                      }
                    ],
                    start: 44,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    }
                  }
                ],
                start: 35,
                end: 56,
                loc: {
                  start: {
                    line: 1,
                    column: 35
                  },
                  end: {
                    line: 1,
                    column: 56
                  }
                }
              }
            ],
            start: 0,
            end: 58,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 58
              }
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'var',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'Identifier',
                  name: 'f',
                  start: 69,
                  end: 70,
                  loc: {
                    start: {
                      line: 1,
                      column: 69
                    },
                    end: {
                      line: 1,
                      column: 70
                    }
                  }
                },
                id: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'f',
                        start: 64,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 64
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 'f',
                        start: 64,
                        end: 65,
                        loc: {
                          start: {
                            line: 1,
                            column: 64
                          },
                          end: {
                            line: 1,
                            column: 65
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
                      start: 64,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 64
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    }
                  ],
                  start: 63,
                  end: 66,
                  loc: {
                    start: {
                      line: 1,
                      column: 63
                    },
                    end: {
                      line: 1,
                      column: 66
                    }
                  }
                },
                start: 63,
                end: 70,
                loc: {
                  start: {
                    line: 1,
                    column: 63
                  },
                  end: {
                    line: 1,
                    column: 70
                  }
                }
              }
            ],
            start: 59,
            end: 70,
            loc: {
              start: {
                line: 1,
                column: 59
              },
              end: {
                line: 1,
                column: 70
              }
            }
          }
        ],
        start: 0,
        end: 70,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 70
          }
        }
      }
    ],
    [
      `switch (x) {case a: function f(){}; break; case b: function f(){}; break; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'a',
                  start: 17,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 32,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 29,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 29
                        },
                        end: {
                          line: 1,
                          column: 30
                        }
                      }
                    },
                    start: 20,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
                  {
                    type: 'EmptyStatement',
                    start: 34,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 34
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 36,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 12,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'b',
                  start: 48,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 48
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 63,
                      end: 65,
                      loc: {
                        start: {
                          line: 1,
                          column: 63
                        },
                        end: {
                          line: 1,
                          column: 65
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 60,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 60
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    start: 51,
                    end: 65,
                    loc: {
                      start: {
                        line: 1,
                        column: 51
                      },
                      end: {
                        line: 1,
                        column: 65
                      }
                    }
                  },
                  {
                    type: 'EmptyStatement',
                    start: 65,
                    end: 66,
                    loc: {
                      start: {
                        line: 1,
                        column: 65
                      },
                      end: {
                        line: 1,
                        column: 66
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 67,
                    end: 73,
                    loc: {
                      start: {
                        line: 1,
                        column: 67
                      },
                      end: {
                        line: 1,
                        column: 73
                      }
                    }
                  }
                ],
                start: 43,
                end: 73,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 73
                  }
                }
              }
            ],
            start: 0,
            end: 75,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 75
              }
            }
          }
        ],
        start: 0,
        end: 75,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 75
          }
        }
      }
    ],
    [
      `switch (x) { case c: function *f(){} function *f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'c',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 34,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 31,
                      end: 32,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    },
                    start: 21,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 50,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 50
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 47,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    start: 37,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  }
                ],
                start: 13,
                end: 52,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 52
                  }
                }
              }
            ],
            start: 0,
            end: 54,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 54
              }
            }
          }
        ],
        start: 0,
        end: 54,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 54
          }
        }
      }
    ],
    [
      `switch (0) { case 1: let f = 0; default: [f] }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
                          start: 29,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  }
                ],
                start: 13,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'f',
                          start: 42,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 42
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        }
                      ],
                      start: 41,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      }
                    },
                    start: 41,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  }
                ],
                start: 32,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              }
            ],
            start: 0,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 46
              }
            }
          }
        ],
        start: 0,
        end: 46,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 46
          }
        }
      }
    ],
    [
      `switch (0) { case 1: let f = 0; default: [f] }
    switch (0) { case 1: let f = 0; default: [f] }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
                          start: 29,
                          end: 30,
                          loc: {
                            start: {
                              line: 1,
                              column: 29
                            },
                            end: {
                              line: 1,
                              column: 30
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 30,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  }
                ],
                start: 13,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'f',
                          start: 42,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 42
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        }
                      ],
                      start: 41,
                      end: 44,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 44
                        }
                      }
                    },
                    start: 41,
                    end: 44,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 44
                      }
                    }
                  }
                ],
                start: 32,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              }
            ],
            start: 0,
            end: 46,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 46
              }
            }
          },
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 59,
              end: 60,
              loc: {
                start: {
                  line: 2,
                  column: 12
                },
                end: {
                  line: 2,
                  column: 13
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 69,
                  end: 70,
                  loc: {
                    start: {
                      line: 2,
                      column: 22
                    },
                    end: {
                      line: 2,
                      column: 23
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 0,
                          start: 80,
                          end: 81,
                          loc: {
                            start: {
                              line: 2,
                              column: 33
                            },
                            end: {
                              line: 2,
                              column: 34
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 76,
                          end: 77,
                          loc: {
                            start: {
                              line: 2,
                              column: 29
                            },
                            end: {
                              line: 2,
                              column: 30
                            }
                          }
                        },
                        start: 76,
                        end: 81,
                        loc: {
                          start: {
                            line: 2,
                            column: 29
                          },
                          end: {
                            line: 2,
                            column: 34
                          }
                        }
                      }
                    ],
                    start: 72,
                    end: 82,
                    loc: {
                      start: {
                        line: 2,
                        column: 25
                      },
                      end: {
                        line: 2,
                        column: 35
                      }
                    }
                  }
                ],
                start: 64,
                end: 82,
                loc: {
                  start: {
                    line: 2,
                    column: 17
                  },
                  end: {
                    line: 2,
                    column: 35
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'f',
                          start: 93,
                          end: 94,
                          loc: {
                            start: {
                              line: 2,
                              column: 46
                            },
                            end: {
                              line: 2,
                              column: 47
                            }
                          }
                        }
                      ],
                      start: 92,
                      end: 95,
                      loc: {
                        start: {
                          line: 2,
                          column: 45
                        },
                        end: {
                          line: 2,
                          column: 48
                        }
                      }
                    },
                    start: 92,
                    end: 95,
                    loc: {
                      start: {
                        line: 2,
                        column: 45
                      },
                      end: {
                        line: 2,
                        column: 48
                      }
                    }
                  }
                ],
                start: 83,
                end: 95,
                loc: {
                  start: {
                    line: 2,
                    column: 36
                  },
                  end: {
                    line: 2,
                    column: 48
                  }
                }
              }
            ],
            start: 51,
            end: 97,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 50
              }
            }
          }
        ],
        start: 0,
        end: 97,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 50
          }
        }
      }
    ],
    [
      `switch (0) { default: let f; if (false) ; else function f() {  } }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 26,
                          end: 27,
                          loc: {
                            start: {
                              line: 1,
                              column: 26
                            },
                            end: {
                              line: 1,
                              column: 27
                            }
                          }
                        },
                        start: 26,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      }
                    ],
                    start: 22,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 22
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'Literal',
                      value: false,
                      start: 33,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    consequent: {
                      type: 'EmptyStatement',
                      start: 40,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 40
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    alternate: {
                      type: 'FunctionDeclaration',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 60,
                        end: 64,
                        loc: {
                          start: {
                            line: 1,
                            column: 60
                          },
                          end: {
                            line: 1,
                            column: 64
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 56,
                        end: 57,
                        loc: {
                          start: {
                            line: 1,
                            column: 56
                          },
                          end: {
                            line: 1,
                            column: 57
                          }
                        }
                      },
                      start: 47,
                      end: 64,
                      loc: {
                        start: {
                          line: 1,
                          column: 47
                        },
                        end: {
                          line: 1,
                          column: 64
                        }
                      }
                    },
                    start: 29,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    }
                  }
                ],
                start: 13,
                end: 64,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 64
                  }
                }
              }
            ],
            start: 0,
            end: 66,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 66
              }
            }
          }
        ],
        start: 0,
        end: 66,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 66
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f; default: var f; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 13,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        start: 41,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  }
                ],
                start: 28,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              }
            ],
            start: 0,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 45
              }
            }
          }
        ],
        start: 0,
        end: 45,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 45
          }
        }
      }
    ],
    [
      `switch (x) { case c: function f(){} function f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'c',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 33,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 30,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 30
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    start: 21,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 48,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 45,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 45
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    start: 36,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  }
                ],
                start: 13,
                end: 50,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 50
                  }
                }
              }
            ],
            start: 0,
            end: 52,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 52
              }
            }
          }
        ],
        start: 0,
        end: 52,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 52
          }
        }
      }
    ],
    [
      `switch (x) { case c: async function *f(){} async function *f(){} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'x',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'c',
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 40,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 40
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    async: true,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 37,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 37
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 21,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 62,
                      end: 64,
                      loc: {
                        start: {
                          line: 1,
                          column: 62
                        },
                        end: {
                          line: 1,
                          column: 64
                        }
                      }
                    },
                    async: true,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 59,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 59
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      }
                    },
                    start: 43,
                    end: 64,
                    loc: {
                      start: {
                        line: 1,
                        column: 43
                      },
                      end: {
                        line: 1,
                        column: 64
                      }
                    }
                  }
                ],
                start: 13,
                end: 64,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 64
                  }
                }
              }
            ],
            start: 0,
            end: 66,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 66
              }
            }
          }
        ],
        start: 0,
        end: 66,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 66
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f; default: var f; }
    switch (0) { case 1: var f; default: var f; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 13,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        start: 41,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  }
                ],
                start: 28,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              }
            ],
            start: 0,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 45
              }
            }
          },
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 58,
              end: 59,
              loc: {
                start: {
                  line: 2,
                  column: 12
                },
                end: {
                  line: 2,
                  column: 13
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 68,
                  end: 69,
                  loc: {
                    start: {
                      line: 2,
                      column: 22
                    },
                    end: {
                      line: 2,
                      column: 23
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 75,
                          end: 76,
                          loc: {
                            start: {
                              line: 2,
                              column: 29
                            },
                            end: {
                              line: 2,
                              column: 30
                            }
                          }
                        },
                        start: 75,
                        end: 76,
                        loc: {
                          start: {
                            line: 2,
                            column: 29
                          },
                          end: {
                            line: 2,
                            column: 30
                          }
                        }
                      }
                    ],
                    start: 71,
                    end: 77,
                    loc: {
                      start: {
                        line: 2,
                        column: 25
                      },
                      end: {
                        line: 2,
                        column: 31
                      }
                    }
                  }
                ],
                start: 63,
                end: 77,
                loc: {
                  start: {
                    line: 2,
                    column: 17
                  },
                  end: {
                    line: 2,
                    column: 31
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 91,
                          end: 92,
                          loc: {
                            start: {
                              line: 2,
                              column: 45
                            },
                            end: {
                              line: 2,
                              column: 46
                            }
                          }
                        },
                        start: 91,
                        end: 92,
                        loc: {
                          start: {
                            line: 2,
                            column: 45
                          },
                          end: {
                            line: 2,
                            column: 46
                          }
                        }
                      }
                    ],
                    start: 87,
                    end: 93,
                    loc: {
                      start: {
                        line: 2,
                        column: 41
                      },
                      end: {
                        line: 2,
                        column: 47
                      }
                    }
                  }
                ],
                start: 78,
                end: 93,
                loc: {
                  start: {
                    line: 2,
                    column: 32
                  },
                  end: {
                    line: 2,
                    column: 47
                  }
                }
              }
            ],
            start: 50,
            end: 95,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 49
              }
            }
          }
        ],
        start: 0,
        end: 95,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 49
          }
        }
      }
    ],
    [
      `for (let f of [0]) { switch (1) { case 1:function f() {  } }}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'SwitchStatement',
                  discriminant: {
                    type: 'Literal',
                    value: 1,
                    start: 29,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  cases: [
                    {
                      type: 'SwitchCase',
                      test: {
                        type: 'Literal',
                        value: 1,
                        start: 39,
                        end: 40,
                        loc: {
                          start: {
                            line: 1,
                            column: 39
                          },
                          end: {
                            line: 1,
                            column: 40
                          }
                        }
                      },
                      consequent: [
                        {
                          type: 'FunctionDeclaration',
                          params: [],
                          body: {
                            type: 'BlockStatement',
                            body: [],
                            start: 54,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 54
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            }
                          },
                          async: false,
                          generator: false,
                          id: {
                            type: 'Identifier',
                            name: 'f',
                            start: 50,
                            end: 51,
                            loc: {
                              start: {
                                line: 1,
                                column: 50
                              },
                              end: {
                                line: 1,
                                column: 51
                              }
                            }
                          },
                          start: 41,
                          end: 58,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 58
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 58
                        }
                      }
                    }
                  ],
                  start: 21,
                  end: 60,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 60
                    }
                  }
                }
              ],
              start: 19,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
            left: {
              type: 'VariableDeclaration',
              kind: 'let',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'f',
                    start: 9,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    }
                  },
                  start: 9,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              start: 5,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            right: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'Literal',
                  value: 0,
                  start: 15,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                }
              ],
              start: 14,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            await: false,
            start: 0,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 61
              }
            }
          }
        ],
        start: 0,
        end: 61,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 61
          }
        }
      }
    ],
    [
      `switch (X) {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'X',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [],
            start: 0,
            end: 13,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 13
              }
            }
          }
        ],
        start: 0,
        end: 13,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 13
          }
        }
      }
    ],
    [
      `switch (A) {default: B;}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'B',
                      start: 21,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      }
                    },
                    start: 21,
                    end: 23,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 23
                      }
                    }
                  }
                ],
                start: 12,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              }
            ],
            start: 0,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 24
              }
            }
          }
        ],
        start: 0,
        end: 24,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 24
          }
        }
      }
    ],
    [
      `switch (A) {case B: C; default: D;}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B',
                  start: 17,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C',
                      start: 20,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      }
                    },
                    start: 20,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  }
                ],
                start: 12,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'D',
                      start: 32,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    start: 32,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  }
                ],
                start: 23,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              }
            ],
            start: 0,
            end: 35,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 35
              }
            }
          }
        ],
        start: 0,
        end: 35,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 35
          }
        }
      }
    ],
    [
      `switch (A) {case B: C; break; case D: E; break;}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Identifier',
              name: 'A',
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'B',
                  start: 17,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'C',
                      start: 20,
                      end: 21,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 21
                        }
                      }
                    },
                    start: 20,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 23,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  }
                ],
                start: 12,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 12
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: {
                  type: 'Identifier',
                  name: 'D',
                  start: 35,
                  end: 36,
                  loc: {
                    start: {
                      line: 1,
                      column: 35
                    },
                    end: {
                      line: 1,
                      column: 36
                    }
                  }
                },
                consequent: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Identifier',
                      name: 'E',
                      start: 38,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    start: 38,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 38
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  {
                    type: 'BreakStatement',
                    label: null,
                    start: 41,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  }
                ],
                start: 30,
                end: 47,
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 47
                  }
                }
              }
            ],
            start: 0,
            end: 48,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 48
              }
            }
          }
        ],
        start: 0,
        end: 48,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 48
          }
        }
      }
    ],
    [
      `switch (0) { case 1: var f; default: var f }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 0,
              start: 8,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            cases: [
              {
                type: 'SwitchCase',
                test: {
                  type: 'Literal',
                  value: 1,
                  start: 18,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 25,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        },
                        start: 25,
                        end: 26,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 26
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 13,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              {
                type: 'SwitchCase',
                test: null,
                consequent: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'f',
                          start: 41,
                          end: 42,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 42
                            }
                          }
                        },
                        start: 41,
                        end: 42,
                        loc: {
                          start: {
                            line: 1,
                            column: 41
                          },
                          end: {
                            line: 1,
                            column: 42
                          }
                        }
                      }
                    ],
                    start: 37,
                    end: 42,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 42
                      }
                    }
                  }
                ],
                start: 28,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 28
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              }
            ],
            start: 0,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 44
              }
            }
          }
        ],
        start: 0,
        end: 44,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 44
          }
        }
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
