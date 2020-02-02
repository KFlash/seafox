import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Statements - Try', () => {
  for (const declaration of [
    'let e',
    'let f, g, e',
    'let [f] = [], [] = [], e = e, h',
    'let {e} = 0',
    'let {f, e} = 0',
    'let {f, g} = 0, {e} = 0',
    'let {f = 0, e = 1} = 0',
    'let [e] = 0',
    'let [f, e] = 0',
    'let {f:e} = 0',
    'let [[[], e]] = 0',
    'const e = 0',
    'const f = 0, g = 0, e = 0',
    'const {e} = 0',
    'const [e] = 0',
    'const {f:e} = 0',
    'const [[[], e]] = 0',
    'function e(){}',
    'function* e(){}'
  ]) {
    it(`try { throw 0; } catch(e) { ${declaration} } `, () => {
      t.throws(() => {
        parseScript(`try { throw 0; } catch(e) { ${declaration} } `);
      });
    });

    it(`try { throw 0; } catch({e}) { ${declaration} }`, () => {
      t.throws(() => {
        parseScript(`try { throw 0; } catch({e}) { ${declaration} }`);
      });
    });

    it(`try { throw 0; } catch(e) { ${declaration} }`, () => {
      t.throws(() => {
        parseScript(`try { throw 0; } catch(e) { ${declaration} }`);
      });
    });

    it(`try { throw 0; } catch(e) { (()=>{${declaration}})(); }`, () => {
      t.doesNotThrow(() => {
        parseScript(`try { throw 0; } catch(e) { (()=>{${declaration}})(); }`);
      });
    });

    it(`try { throw 0; } catch(e) { (function(){${declaration}})(); }`, () => {
      t.doesNotThrow(() => {
        parseScript(`try { throw 0; } catch(e) { (function(){${declaration}})(); }`);
      });
    });
  }

  for (const [source, ctx] of [
    ['try {} catch (arguments) { }', Context.OptionsDisableWebCompat | Context.Strict],
    [
      'try { throw "try"; } catch (x) { for (var x = y; x !== y; x++) {}}',
      Context.OptionsDisableWebCompat | Context.Strict
    ],
    ['try {} catch (arguments) { }', Context.Strict],
    ['try {} catch (e) { for (var e in y) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { var e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch(e) { var e; }', Context.OptionsDisableWebCompat],
    ['try { } catch (x) { for (var x of []) {} }', Context.Strict | Context.OptionsDisableWebCompat],
    ['try { } catch (x) { let x; }', Context.Strict | Context.OptionsDisableWebCompat],
    ['function f() { try {} catch (e) { function e(){} } }', Context.Strict | Context.OptionsDisableWebCompat],
    ['try {} catch (a, a) { }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { var foo = "string"; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { var foo = "string"; }', Context.Strict],
    ['try {} catch (err) { for (var err of [2]) {} }', Context.Strict],
    ['try {} catch (err) { for (var err of [2]) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (err) { for (var err = "a"; err !== "b";) {}}', Context.Strict],
    ['try {} catch (err) { for (var err = "a"; err !== "b";) {}}', Context.OptionsDisableWebCompat],
    ['try {} catch ([a,a]) { }', Context.OptionsDisableWebCompat],
    ['try {} catch ([a] = b) { }', Context.OptionsDisableWebCompat],
    ['try {} catch (a) { const a = 1; } ', Context.OptionsDisableWebCompat],
    ['try { } catch (x) { for (var x of []) {} }', Context.OptionsDisableWebCompat],
    ['try { } catch (x) { let x; }', Context.OptionsDisableWebCompat],
    ['try { } catch (e) { async function f(){} async function f(){} }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { try {} catch (_) { var foo; } }', Context.OptionsDisableWebCompat],
    ['try {} catch ([foo]) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch ([foo]) { var foo; }', Context.Empty],
    ['try { throw {}; } catch ({ f }) { if (true) function f() {  } }', Context.OptionsDisableWebCompat],
    ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e in y) {} }', Context.OptionsDisableWebCompat],
    ['try { } catch ([x, x]) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { let foo = 1; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { let foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { function foo() {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { function foo() {} }', Context.Empty],
    ['try { } catch ([x, x]) {}', Context.Strict | Context.OptionsDisableWebCompat],
    ['try { } catch (x) { for (var x of []) {} }', Context.OptionsDisableWebCompat],
    ['try { } catch (x) { let x; }', Context.OptionsDisableWebCompat],
    ['try {} catch(e) { let e; }', Context.OptionsDisableWebCompat],
    ['try {} catch(e) { for(var e of 0); }', Context.OptionsDisableWebCompat],
    ['try {} catch ({a: e, b: e}) {}', Context.OptionsDisableWebCompat],
    ['try {} catch ({a: e, b: e}) {}', Context.OptionsDisableWebCompat],
    ['try {} catch ({e = 0, a: e}) {}', Context.OptionsDisableWebCompat],
    ['try {} catch ({e, e}) {}', Context.OptionsDisableWebCompat],
    ['function f() { try {} catch (e) { function e(){} } }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e of y) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { let e = x; }', Context.Empty],
    ['try {} catch (x', Context.Empty],
    ['try {};', Context.Empty],
    ['try {} catch (e) { const e = x; }', Context.Empty],
    ['try {} catch (e) { var e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { var e = x; }', Context.OptionsDisableWebCompat],
    ['let foo; try {} catch (foo) {} let foo;', Context.OptionsDisableWebCompat],
    ['let foo; try {} catch (foo) {} let foo;', Context.Empty],
    ['try {} catch (foo) {if (1) function foo() {}}', Context.OptionsDisableWebCompat],
    ['try {} catch (foo) { let foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { let e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { const e = x; }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e;;) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { for (var e in y) {} }', Context.OptionsDisableWebCompat],
    ['try {} catch ({ a: foo, b: { c: [foo] } }) {}', Context.OptionsDisableWebCompat],
    ['try {} catch ({ foo }) { var foo; }', Context.OptionsDisableWebCompat],
    ['try {} catch ({ foo }) { var foo; }', Context.Empty],
    ['try {} catch (foo) { let foo; }', Context.OptionsDisableWebCompat],
    ['try { async function *f(){} var f } catch (e) {}', Context.OptionsDisableWebCompat],
    ['try { function f(){} var f } catch (e) {}', Context.OptionsDisableWebCompat],
    ['try { var foo = 1; } catch (e) {} let foo = 1;', Context.OptionsDisableWebCompat],
    ['try { var foo = 1; } catch (e) {} let foo = 1;', Context.Empty],
    ['try {} catch ([foo, foo]) {}', Context.OptionsDisableWebCompat],
    ['try {} catch ([foo, foo]) {}', Context.Empty],
    ['try { } catch (e) { function f(){} function f(){} }', Context.OptionsDisableWebCompat],
    ['try { } catch (e) { function *f(){} function *f(){} }', Context.OptionsDisableWebCompat],
    ['try { function *f(){} var f } catch (e) {}', Context.OptionsDisableWebCompat],
    ['try { function(){} var f } catch (e) {}', Context.OptionsDisableWebCompat],
    ['try { async function f(){} var f } catch (e) {}', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { let e = x; }', Context.OptionsDisableWebCompat],
    ['try { } catch (e) { function(){} function(){} }', Context.OptionsDisableWebCompat],
    ['try { } catch (e) { function *f(){} function *f(){} }', Context.OptionsDisableWebCompat],
    ['try { } catch (e) { function(){} function(){} }', Context.OptionsDisableWebCompat],
    ['try { } finally { function(){} function(){} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { var e = x; }', Context.OptionsDisableWebCompat],
    ['try { } finally { function *f(){} function *f(){} }', Context.OptionsDisableWebCompat],
    ['try {} catch (e) { { var e = x; } }', Context.OptionsDisableWebCompat],
    ['const a = 1, a = 2', Context.OptionsDisableWebCompat],
    ['try { } finally { function f(){} function f(){} }', Context.OptionsDisableWebCompat],
    ['try { } finally { async function *f(){} async function *f(){} }', Context.OptionsDisableWebCompat],
    ['try { } finally { async function f(){} async function f(){} }', Context.OptionsDisableWebCompat],
    ['try {} catch (x) { { let x } ', Context.OptionsDisableWebCompat],
    ['try {} catch (x) { let x }', Context.OptionsDisableWebCompat],
    ['let e; try {} catch (e) { let e; }', Context.OptionsDisableWebCompat],
    ['try { let a; function a() {} } catch (e) {}', Context.Empty],
    ['try { var a; function a() {} } catch (e) {}', Context.Empty],
    ['try {} catch (x) { { let x }', Context.Empty],
    ['try {} catch (a=a) {}', Context.Empty],
    ['try {} catch (a=)a) {}', Context.Empty],
    ['try {} catch ([]=a) {}', Context.Empty],
    ['try {} catch (a)) {}', Context.Empty],
    ['try {} catch (x) { let x }', Context.Empty],
    ['try {}', Context.Empty],
    ['try ', Context.Empty],
    ['try {', Context.Empty]
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

  const lexical_e = [
    'let e',
    'let f, g, e',
    'let [f] = [], [] = [], e = e, h',
    'let {e} = 0',
    'let {f, e} = 0',
    'let {f, g} = 0, {e} = 0',
    'let {f = 0, e = 1} = 0',
    'let [e] = 0',
    'let [f, e] = 0',
    'let {f:e} = 0',
    'let [[[], e]] = 0',
    'const e = 0',
    'const f = 0, g = 0, e = 0',
    'const {e} = 0',
    'const [e] = 0',
    'const {f:e} = 0',
    'const [[[], e]] = 0',
    'function e(){}',
    'function* e(){}'
  ];

  const not_lexical_e = ['var e', 'var f, e', 'var {e} = 0', 'let {} = 0', 'let {e:f} = 0', '{ function e(){} }'];

  for (const declaration of not_lexical_e) {
    it(declaration as string, () => {
      t.doesNotThrow(() => {
        parseScript(`
        try {
          throw 0;
        } catch(e) {
          ${declaration}
        }
        `);
      });
    });
  }

  for (const declaration of lexical_e) {
    it(declaration as string, () => {
      t.throws(() => {
        parseScript(`try {
          throw 0;
        } catch(e) {
          ${declaration}
        }`);
      });
    });
    it(declaration as string, () => {
      t.throws(() => {
        parseScript(
          `try {
          throw 0;
        } catch(e) {
          ${declaration}
        }`,
          {
            disableWebCompat: true
          }
        );
      });
    });

    it(declaration as string, () => {
      t.throws(() => {
        parseScript(`
        try {
          throw 0;
        } catch({e}) {
          ${declaration}
        }
        `);
      });
    });

    it(declaration as string, () => {
      t.doesNotThrow(() => {
        parseScript(`
        try {
          throw 0;
        } catch(e) {
          (()=>{${declaration}})();
        }
        `);
      });
    });

    it(declaration as string, () => {
      t.doesNotThrow(() => {
        parseScript(`
        try {
          throw 0;
        } catch(e) {
          (function(){${declaration}})();
        }
        `);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `try { throw [,]; } catch ([x = 23]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [null],
                    start: 12,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    }
                  },
                  start: 6,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                }
              ],
              start: 4,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'x',
                      start: 27,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    right: {
                      type: 'Literal',
                      value: 23,
                      start: 31,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    start: 27,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 26,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 36,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 36
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
              start: 19,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 38
              }
            }
          }
        ],
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      }
    ],
    [
      `try {} catch(eval) {"use strict";}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'eval',
                start: 13,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'Literal',
                      value: 'use strict',
                      start: 20,
                      end: 32,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    },
                    start: 20,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 19,
                end: 34,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 34
                  }
                }
              },
              start: 7,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 34
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 34
              }
            }
          }
        ],
        start: 0,
        end: 34,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 34
          }
        }
      }
    ],
    [
      `try { throw [3, 4, 5]; } catch ([...[x, y, z]]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: 3,
                        start: 13,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: 4,
                        start: 16,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: 5,
                        start: 19,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        }
                      }
                    ],
                    start: 12,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  },
                  start: 6,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                }
              ],
              start: 4,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'x',
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
                        {
                          type: 'Identifier',
                          name: 'y',
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
                        {
                          type: 'Identifier',
                          name: 'z',
                          start: 43,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 43
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          }
                        }
                      ],
                      start: 36,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      }
                    },
                    start: 33,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    }
                  }
                ],
                start: 32,
                end: 46,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 46
                  }
                }
              },
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
              start: 25,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 50
              }
            }
          }
        ],
        start: 0,
        end: 50,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 50
          }
        }
      }
    ],
    [
      `try { throw x; } catch ([...[]]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'Identifier',
                    name: 'x',
                    start: 12,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    }
                  },
                  start: 6,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              start: 4,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ArrayPattern',
                      elements: [],
                      start: 28,
                      end: 30,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 30
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
                start: 24,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
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
              start: 17,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
      `try { throw { w: { x: undefined, z: 7 } }; } catch ({ w: { x, y, z } = { x: 4, y: 5, z: 6 } }) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'w',
                          start: 14,
                          end: 15,
                          loc: {
                            start: {
                              line: 1,
                              column: 14
                            },
                            end: {
                              line: 1,
                              column: 15
                            }
                          }
                        },
                        value: {
                          type: 'ObjectExpression',
                          properties: [
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'x',
                                start: 19,
                                end: 20,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 19
                                  },
                                  end: {
                                    line: 1,
                                    column: 20
                                  }
                                }
                              },
                              value: {
                                type: 'Identifier',
                                name: 'undefined',
                                start: 22,
                                end: 31,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 22
                                  },
                                  end: {
                                    line: 1,
                                    column: 31
                                  }
                                }
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false,
                              start: 19,
                              end: 31,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 19
                                },
                                end: {
                                  line: 1,
                                  column: 31
                                }
                              }
                            },
                            {
                              type: 'Property',
                              key: {
                                type: 'Identifier',
                                name: 'z',
                                start: 33,
                                end: 34,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 33
                                  },
                                  end: {
                                    line: 1,
                                    column: 34
                                  }
                                }
                              },
                              value: {
                                type: 'Literal',
                                value: 7,
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
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: false,
                              start: 33,
                              end: 37,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 33
                                },
                                end: {
                                  line: 1,
                                  column: 37
                                }
                              }
                            }
                          ],
                          start: 17,
                          end: 39,
                          loc: {
                            start: {
                              line: 1,
                              column: 17
                            },
                            end: {
                              line: 1,
                              column: 39
                            }
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 14,
                        end: 39,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 39
                          }
                        }
                      }
                    ],
                    start: 12,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  start: 6,
                  end: 42,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 42
                    }
                  }
                }
              ],
              start: 4,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 44
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'w',
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'x',
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
                            value: {
                              type: 'Identifier',
                              name: 'x',
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'y',
                              start: 62,
                              end: 63,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 62
                                },
                                end: {
                                  line: 1,
                                  column: 63
                                }
                              }
                            },
                            value: {
                              type: 'Identifier',
                              name: 'y',
                              start: 62,
                              end: 63,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 62
                                },
                                end: {
                                  line: 1,
                                  column: 63
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
                            start: 62,
                            end: 63,
                            loc: {
                              start: {
                                line: 1,
                                column: 62
                              },
                              end: {
                                line: 1,
                                column: 63
                              }
                            }
                          },
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'z',
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
                            value: {
                              type: 'Identifier',
                              name: 'z',
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                          }
                        ],
                        start: 57,
                        end: 68,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 68
                          }
                        }
                      },
                      right: {
                        type: 'ObjectExpression',
                        properties: [
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'x',
                              start: 73,
                              end: 74,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 73
                                },
                                end: {
                                  line: 1,
                                  column: 74
                                }
                              }
                            },
                            value: {
                              type: 'Literal',
                              value: 4,
                              start: 76,
                              end: 77,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 76
                                },
                                end: {
                                  line: 1,
                                  column: 77
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 73,
                            end: 77,
                            loc: {
                              start: {
                                line: 1,
                                column: 73
                              },
                              end: {
                                line: 1,
                                column: 77
                              }
                            }
                          },
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'y',
                              start: 79,
                              end: 80,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 79
                                },
                                end: {
                                  line: 1,
                                  column: 80
                                }
                              }
                            },
                            value: {
                              type: 'Literal',
                              value: 5,
                              start: 82,
                              end: 83,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 82
                                },
                                end: {
                                  line: 1,
                                  column: 83
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 79,
                            end: 83,
                            loc: {
                              start: {
                                line: 1,
                                column: 79
                              },
                              end: {
                                line: 1,
                                column: 83
                              }
                            }
                          },
                          {
                            type: 'Property',
                            key: {
                              type: 'Identifier',
                              name: 'z',
                              start: 85,
                              end: 86,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 85
                                },
                                end: {
                                  line: 1,
                                  column: 86
                                }
                              }
                            },
                            value: {
                              type: 'Literal',
                              value: 6,
                              start: 88,
                              end: 89,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 88
                                },
                                end: {
                                  line: 1,
                                  column: 89
                                }
                              }
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: false,
                            start: 85,
                            end: 89,
                            loc: {
                              start: {
                                line: 1,
                                column: 85
                              },
                              end: {
                                line: 1,
                                column: 89
                              }
                            }
                          }
                        ],
                        start: 71,
                        end: 91,
                        loc: {
                          start: {
                            line: 1,
                            column: 71
                          },
                          end: {
                            line: 1,
                            column: 91
                          }
                        }
                      },
                      start: 57,
                      end: 91,
                      loc: {
                        start: {
                          line: 1,
                          column: 57
                        },
                        end: {
                          line: 1,
                          column: 91
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 54,
                    end: 91,
                    loc: {
                      start: {
                        line: 1,
                        column: 54
                      },
                      end: {
                        line: 1,
                        column: 91
                      }
                    }
                  }
                ],
                start: 52,
                end: 93,
                loc: {
                  start: {
                    line: 1,
                    column: 52
                  },
                  end: {
                    line: 1,
                    column: 93
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 95,
                end: 97,
                loc: {
                  start: {
                    line: 1,
                    column: 95
                  },
                  end: {
                    line: 1,
                    column: 97
                  }
                }
              },
              start: 45,
              end: 97,
              loc: {
                start: {
                  line: 1,
                  column: 45
                },
                end: {
                  line: 1,
                  column: 97
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 97,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 97
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
            line: 1,
            column: 97
          }
        }
      }
    ],
    [
      `try {} catch ([a=a]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    },
                    right: {
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
                    start: 15,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 15
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    }
                  }
                ],
                start: 14,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
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
              },
              start: 7,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 23
              }
            }
          }
        ],
        start: 0,
        end: 23,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 23
          }
        }
      }
    ],
    [
      `try {} catch (foo) { try {} catch (_) { var foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: [],
                      start: 25,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    },
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'Identifier',
                        name: '_',
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
                      body: {
                        type: 'BlockStatement',
                        body: [
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
                                  start: 44,
                                  end: 47,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 44
                                    },
                                    end: {
                                      line: 1,
                                      column: 47
                                    }
                                  }
                                },
                                start: 44,
                                end: 47,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 44
                                  },
                                  end: {
                                    line: 1,
                                    column: 47
                                  }
                                }
                              }
                            ],
                            start: 40,
                            end: 48,
                            loc: {
                              start: {
                                line: 1,
                                column: 40
                              },
                              end: {
                                line: 1,
                                column: 48
                              }
                            }
                          }
                        ],
                        start: 38,
                        end: 50,
                        loc: {
                          start: {
                            line: 1,
                            column: 38
                          },
                          end: {
                            line: 1,
                            column: 50
                          }
                        }
                      },
                      start: 28,
                      end: 50,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 50
                        }
                      }
                    },
                    finalizer: null,
                    start: 21,
                    end: 50,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 50
                      }
                    }
                  }
                ],
                start: 19,
                end: 52,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 52
                  }
                }
              },
              start: 7,
              end: 52,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 52
                }
              }
            },
            finalizer: null,
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
      `try { } catch (e) { async function f(){} async function f(){} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: true,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
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
                    start: 20,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  },
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 59,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 59
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    async: true,
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
                    start: 41,
                    end: 61,
                    loc: {
                      start: {
                        line: 1,
                        column: 41
                      },
                      end: {
                        line: 1,
                        column: 61
                      }
                    }
                  }
                ],
                start: 18,
                end: 63,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 63
                  }
                }
              },
              start: 8,
              end: 63,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 63
                }
              }
            },
            finalizer: null,
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
      `try { } catch (e) { async function *f(){} async function *f(){} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
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
                    generator: true,
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
                    start: 20,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
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
                      start: 61,
                      end: 63,
                      loc: {
                        start: {
                          line: 1,
                          column: 61
                        },
                        end: {
                          line: 1,
                          column: 63
                        }
                      }
                    },
                    async: true,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 58,
                      end: 59,
                      loc: {
                        start: {
                          line: 1,
                          column: 58
                        },
                        end: {
                          line: 1,
                          column: 59
                        }
                      }
                    },
                    start: 42,
                    end: 63,
                    loc: {
                      start: {
                        line: 1,
                        column: 42
                      },
                      end: {
                        line: 1,
                        column: 63
                      }
                    }
                  }
                ],
                start: 18,
                end: 65,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 65
                  }
                }
              },
              start: 8,
              end: 65,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 65
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 65,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 65
              }
            }
          }
        ],
        start: 0,
        end: 65,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 65
          }
        }
      }
    ],
    [
      `do try {} catch {} while(x) x`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
              type: 'TryStatement',
              block: {
                type: 'BlockStatement',
                body: [],
                start: 7,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              handler: {
                type: 'CatchClause',
                param: null,
                body: {
                  type: 'BlockStatement',
                  body: [],
                  start: 16,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                },
                start: 10,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              finalizer: null,
              start: 3,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            start: 0,
            test: {
              type: 'Identifier',
              name: 'x',
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
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'Identifier',
              name: 'x',
              start: 28,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 28
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            start: 28,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 28
              },
              end: {
                line: 1,
                column: 29
              }
            }
          }
        ],
        start: 0,
        end: 29,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 29
          }
        }
      }
    ],
    [
      `try { } catch (e) { function *f(){} function *f(){} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
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
                    generator: true,
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
                    start: 20,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
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
                      start: 49,
                      end: 51,
                      loc: {
                        start: {
                          line: 1,
                          column: 49
                        },
                        end: {
                          line: 1,
                          column: 51
                        }
                      }
                    },
                    async: false,
                    generator: true,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 46,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 46
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    start: 36,
                    end: 51,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 51
                      }
                    }
                  }
                ],
                start: 18,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 53
                  }
                }
              },
              start: 8,
              end: 53,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 53
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 53,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 53
              }
            }
          }
        ],
        start: 0,
        end: 53,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 53
          }
        }
      }
    ],
    [
      `try { } finally { async function f(){} async function f(){} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: null,
            finalizer: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 36,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  },
                  async: true,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
                    start: 33,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    }
                  },
                  start: 18,
                  end: 38,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 38
                    }
                  }
                },
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 57,
                    end: 59,
                    loc: {
                      start: {
                        line: 1,
                        column: 57
                      },
                      end: {
                        line: 1,
                        column: 59
                      }
                    }
                  },
                  async: true,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
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
                  start: 39,
                  end: 59,
                  loc: {
                    start: {
                      line: 1,
                      column: 39
                    },
                    end: {
                      line: 1,
                      column: 59
                    }
                  }
                }
              ],
              start: 16,
              end: 61,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 61
                }
              }
            },
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
      `try { } finally { function f(){} function f(){} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: null,
            finalizer: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 30,
                    end: 32,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 32
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
                    type: 'Identifier',
                    name: 'f',
                    start: 27,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  start: 18,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                {
                  type: 'FunctionDeclaration',
                  params: [],
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 45,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  },
                  async: false,
                  generator: false,
                  id: {
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
                  },
                  start: 33,
                  end: 47,
                  loc: {
                    start: {
                      line: 1,
                      column: 33
                    },
                    end: {
                      line: 1,
                      column: 47
                    }
                  }
                }
              ],
              start: 16,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 49
                }
              }
            },
            start: 0,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 49
              }
            }
          }
        ],
        start: 0,
        end: 49,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 49
          }
        }
      }
    ],
    [
      `try { } finally { const y = x }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: null,
            finalizer: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'VariableDeclaration',
                  kind: 'const',
                  declarations: [
                    {
                      type: 'VariableDeclarator',
                      init: {
                        type: 'Identifier',
                        name: 'x',
                        start: 28,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      },
                      id: {
                        type: 'Identifier',
                        name: 'y',
                        start: 24,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        }
                      },
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    }
                  ],
                  start: 18,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                }
              ],
              start: 16,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `try { } catch (e) { const y = x }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'const',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
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
                        id: {
                          type: 'Identifier',
                          name: 'y',
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
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 26
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 20,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  }
                ],
                start: 18,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              start: 8,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 33
              }
            }
          }
        ],
        start: 0,
        end: 33,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 33
          }
        }
      }
    ],
    [
      `try {} catch (foo) { { let foo; } }
    try {} catch (foo) { { let foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 27,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              }
                            },
                            start: 27,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          }
                        ],
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 19,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 44,
              end: 46,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 10
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
                start: 54,
                end: 57,
                loc: {
                  start: {
                    line: 2,
                    column: 18
                  },
                  end: {
                    line: 2,
                    column: 21
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 67,
                              end: 70,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 31
                                },
                                end: {
                                  line: 2,
                                  column: 34
                                }
                              }
                            },
                            start: 67,
                            end: 70,
                            loc: {
                              start: {
                                line: 2,
                                column: 31
                              },
                              end: {
                                line: 2,
                                column: 34
                              }
                            }
                          }
                        ],
                        start: 63,
                        end: 71,
                        loc: {
                          start: {
                            line: 2,
                            column: 27
                          },
                          end: {
                            line: 2,
                            column: 35
                          }
                        }
                      }
                    ],
                    start: 61,
                    end: 73,
                    loc: {
                      start: {
                        line: 2,
                        column: 25
                      },
                      end: {
                        line: 2,
                        column: 37
                      }
                    }
                  }
                ],
                start: 59,
                end: 75,
                loc: {
                  start: {
                    line: 2,
                    column: 23
                  },
                  end: {
                    line: 2,
                    column: 39
                  }
                }
              },
              start: 47,
              end: 75,
              loc: {
                start: {
                  line: 2,
                  column: 11
                },
                end: {
                  line: 2,
                  column: 39
                }
              }
            },
            finalizer: null,
            start: 40,
            end: 75,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 39
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
            line: 2,
            column: 39
          }
        }
      }
    ],
    [
      `try {} catch (foo) { function x() { var foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
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
                                start: 40,
                                end: 43,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 40
                                  },
                                  end: {
                                    line: 1,
                                    column: 43
                                  }
                                }
                              },
                              start: 40,
                              end: 43,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 40
                                },
                                end: {
                                  line: 1,
                                  column: 43
                                }
                              }
                            }
                          ],
                          start: 36,
                          end: 44,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 44
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 46,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 46
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'x',
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
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  }
                ],
                start: 19,
                end: 48,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 48
                  }
                }
              },
              start: 7,
              end: 48,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 48
                }
              }
            },
            finalizer: null,
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
      `try {} catch (foo) { function x(foo) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'FunctionDeclaration',
                    params: [
                      {
                        type: 'Identifier',
                        name: 'foo',
                        start: 32,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      }
                    ],
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 37,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 37
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'x',
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
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 19,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              start: 7,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 41
              }
            }
          }
        ],
        start: 0,
        end: 41,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 41
          }
        }
      }
    ],
    [
      `try {} catch(x) { x = 0; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 0,
                        start: 22,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        }
                      },
                      start: 18,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    start: 18,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  }
                ],
                start: 16,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 7,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        }
      }
    ],
    [
      `try {} catch(x) { with ({}) { x = 1; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'WithStatement',
                    object: {
                      type: 'ObjectExpression',
                      properties: [],
                      start: 24,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'x',
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
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 1,
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
                            start: 30,
                            end: 35,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 35
                              }
                            }
                          },
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
                      start: 28,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 18,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 16,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
          }
        }
      }
    ],
    [
      `try {} catch(x) { with ({}) { x = 1; } }
    try {} catch(x) { with ({}) { x = 1; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'WithStatement',
                    object: {
                      type: 'ObjectExpression',
                      properties: [],
                      start: 24,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'x',
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
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 1,
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
                            start: 30,
                            end: 35,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 35
                              }
                            }
                          },
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
                      start: 28,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 18,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 16,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 49,
              end: 51,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 10
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 58,
                end: 59,
                loc: {
                  start: {
                    line: 2,
                    column: 17
                  },
                  end: {
                    line: 2,
                    column: 18
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'WithStatement',
                    object: {
                      type: 'ObjectExpression',
                      properties: [],
                      start: 69,
                      end: 71,
                      loc: {
                        start: {
                          line: 2,
                          column: 28
                        },
                        end: {
                          line: 2,
                          column: 30
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'x',
                              start: 75,
                              end: 76,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 34
                                },
                                end: {
                                  line: 2,
                                  column: 35
                                }
                              }
                            },
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 1,
                              start: 79,
                              end: 80,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 38
                                },
                                end: {
                                  line: 2,
                                  column: 39
                                }
                              }
                            },
                            start: 75,
                            end: 80,
                            loc: {
                              start: {
                                line: 2,
                                column: 34
                              },
                              end: {
                                line: 2,
                                column: 39
                              }
                            }
                          },
                          start: 75,
                          end: 81,
                          loc: {
                            start: {
                              line: 2,
                              column: 34
                            },
                            end: {
                              line: 2,
                              column: 40
                            }
                          }
                        }
                      ],
                      start: 73,
                      end: 83,
                      loc: {
                        start: {
                          line: 2,
                          column: 32
                        },
                        end: {
                          line: 2,
                          column: 42
                        }
                      }
                    },
                    start: 63,
                    end: 83,
                    loc: {
                      start: {
                        line: 2,
                        column: 22
                      },
                      end: {
                        line: 2,
                        column: 42
                      }
                    }
                  }
                ],
                start: 61,
                end: 85,
                loc: {
                  start: {
                    line: 2,
                    column: 20
                  },
                  end: {
                    line: 2,
                    column: 44
                  }
                }
              },
              start: 52,
              end: 85,
              loc: {
                start: {
                  line: 2,
                  column: 11
                },
                end: {
                  line: 2,
                  column: 44
                }
              }
            },
            finalizer: null,
            start: 45,
            end: 85,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 44
              }
            }
          }
        ],
        start: 0,
        end: 85,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 2,
            column: 44
          }
        }
      }
    ],
    [
      `try {} catch (foo) {} var foo;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
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
                  start: 26,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 26,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 22,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `try { } catch (a) { { const a = b; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'const',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'Identifier',
                              name: 'b',
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
                            id: {
                              type: 'Identifier',
                              name: 'a',
                              start: 28,
                              end: 29,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 29
                                }
                              }
                            },
                            start: 28,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          }
                        ],
                        start: 22,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      }
                    ],
                    start: 20,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 18,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
              start: 8,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 38
              }
            }
          }
        ],
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      }
    ],
    [
      `var foo; try {} catch (_) { const foo = 1; }`,
      Context.OptionsLoc,
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
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_',
                start: 23,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'const',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Literal',
                          value: 1,
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
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 34,
                          end: 37,
                          loc: {
                            start: {
                              line: 1,
                              column: 34
                            },
                            end: {
                              line: 1,
                              column: 37
                            }
                          }
                        },
                        start: 34,
                        end: 41,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 41
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
                start: 26,
                end: 44,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 44
                  }
                }
              },
              start: 16,
              end: 44,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 44
                }
              }
            },
            finalizer: null,
            start: 9,
            end: 44,
            loc: {
              start: {
                line: 1,
                column: 9
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
      `try {} catch (foo) { { let foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 27,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              }
                            },
                            start: 27,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          }
                        ],
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 19,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
      `try {} catch (foo) { { let foo; } }
    try {} catch (foo) { { let foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 27,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              }
                            },
                            start: 27,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          }
                        ],
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 19,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 44,
              end: 46,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 10
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
                start: 54,
                end: 57,
                loc: {
                  start: {
                    line: 2,
                    column: 18
                  },
                  end: {
                    line: 2,
                    column: 21
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 67,
                              end: 70,
                              loc: {
                                start: {
                                  line: 2,
                                  column: 31
                                },
                                end: {
                                  line: 2,
                                  column: 34
                                }
                              }
                            },
                            start: 67,
                            end: 70,
                            loc: {
                              start: {
                                line: 2,
                                column: 31
                              },
                              end: {
                                line: 2,
                                column: 34
                              }
                            }
                          }
                        ],
                        start: 63,
                        end: 71,
                        loc: {
                          start: {
                            line: 2,
                            column: 27
                          },
                          end: {
                            line: 2,
                            column: 35
                          }
                        }
                      }
                    ],
                    start: 61,
                    end: 73,
                    loc: {
                      start: {
                        line: 2,
                        column: 25
                      },
                      end: {
                        line: 2,
                        column: 37
                      }
                    }
                  }
                ],
                start: 59,
                end: 75,
                loc: {
                  start: {
                    line: 2,
                    column: 23
                  },
                  end: {
                    line: 2,
                    column: 39
                  }
                }
              },
              start: 47,
              end: 75,
              loc: {
                start: {
                  line: 2,
                  column: 11
                },
                end: {
                  line: 2,
                  column: 39
                }
              }
            },
            finalizer: null,
            start: 40,
            end: 75,
            loc: {
              start: {
                line: 2,
                column: 4
              },
              end: {
                line: 2,
                column: 39
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
            line: 2,
            column: 39
          }
        }
      }
    ],
    [
      `var foo; try {} catch (_) { let foo; }`,
      Context.OptionsLoc,
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
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_',
                start: 23,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 32,
                          end: 35,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 35
                            }
                          }
                        },
                        start: 32,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      }
                    ],
                    start: 28,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 26,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
              start: 16,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            finalizer: null,
            start: 9,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 38
              }
            }
          }
        ],
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      }
    ],
    [
      `try {} catch (e) { { let e = x; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'Identifier',
                              name: 'x',
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
                              name: 'e',
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
                    start: 19,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 17,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
      `try {} catch (foo) {} let foo;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 26,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 26,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 22,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `try {} catch (e) { let b = x; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
                          start: 27,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'b',
                          start: 23,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          }
                        },
                        start: 23,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  }
                ],
                start: 17,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              start: 7,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (const e in y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e',
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
                        }
                      ],
                      start: 24,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    start: 19,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  }
                ],
                start: 17,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              start: 7,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 42
              }
            }
          }
        ],
        start: 0,
        end: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 42
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (let e of y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 36,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 38
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
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    await: false,
                    start: 19,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 17,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
          }
        }
      }
    ],

    [
      `try {} catch (e) { var e = x; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
                          start: 27,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'e',
                          start: 23,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          }
                        },
                        start: 23,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  }
                ],
                start: 17,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              start: 7,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (var e;;) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForStatement',
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
                    init: {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    test: null,
                    update: null,
                    start: 19,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  }
                ],
                start: 17,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                }
              },
              start: 7,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 37
              }
            }
          }
        ],
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (let e;;) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForStatement',
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
                    init: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    test: null,
                    update: null,
                    start: 19,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  }
                ],
                start: 17,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                }
              },
              start: 7,
              end: 37,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 37
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 37
              }
            }
          }
        ],
        start: 0,
        end: 37,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 37
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (let e in y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 36,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 38
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
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    start: 19,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 17,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (const e in y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e',
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
                        }
                      ],
                      start: 24,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    start: 19,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  }
                ],
                start: 17,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              start: 7,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 42
              }
            }
          }
        ],
        start: 0,
        end: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 42
          }
        }
      }
    ],
    [
      `try { f; } catch (exception) { err1 = exception; } switch (1) { case 1: function f() {  } } try { f; } catch (exception) { err2 = exception; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'f',
                    start: 6,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    }
                  },
                  start: 6,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                }
              ],
              start: 4,
              end: 10,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 10
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'exception',
                start: 18,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'err1',
                        start: 31,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 31
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'exception',
                        start: 38,
                        end: 47,
                        loc: {
                          start: {
                            line: 1,
                            column: 38
                          },
                          end: {
                            line: 1,
                            column: 47
                          }
                        }
                      },
                      start: 31,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 31
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    start: 31,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  }
                ],
                start: 29,
                end: 50,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 50
                  }
                }
              },
              start: 11,
              end: 50,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 50
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 50,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 50
              }
            }
          },
          {
            type: 'SwitchStatement',
            discriminant: {
              type: 'Literal',
              value: 1,
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
                      line: 1,
                      column: 69
                    },
                    end: {
                      line: 1,
                      column: 70
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
                      start: 85,
                      end: 89,
                      loc: {
                        start: {
                          line: 1,
                          column: 85
                        },
                        end: {
                          line: 1,
                          column: 89
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: {
                      type: 'Identifier',
                      name: 'f',
                      start: 81,
                      end: 82,
                      loc: {
                        start: {
                          line: 1,
                          column: 81
                        },
                        end: {
                          line: 1,
                          column: 82
                        }
                      }
                    },
                    start: 72,
                    end: 89,
                    loc: {
                      start: {
                        line: 1,
                        column: 72
                      },
                      end: {
                        line: 1,
                        column: 89
                      }
                    }
                  }
                ],
                start: 64,
                end: 89,
                loc: {
                  start: {
                    line: 1,
                    column: 64
                  },
                  end: {
                    line: 1,
                    column: 89
                  }
                }
              }
            ],
            start: 51,
            end: 91,
            loc: {
              start: {
                line: 1,
                column: 51
              },
              end: {
                line: 1,
                column: 91
              }
            }
          },
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Identifier',
                    name: 'f',
                    start: 98,
                    end: 99,
                    loc: {
                      start: {
                        line: 1,
                        column: 98
                      },
                      end: {
                        line: 1,
                        column: 99
                      }
                    }
                  },
                  start: 98,
                  end: 100,
                  loc: {
                    start: {
                      line: 1,
                      column: 98
                    },
                    end: {
                      line: 1,
                      column: 100
                    }
                  }
                }
              ],
              start: 96,
              end: 102,
              loc: {
                start: {
                  line: 1,
                  column: 96
                },
                end: {
                  line: 1,
                  column: 102
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'exception',
                start: 110,
                end: 119,
                loc: {
                  start: {
                    line: 1,
                    column: 110
                  },
                  end: {
                    line: 1,
                    column: 119
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'err2',
                        start: 123,
                        end: 127,
                        loc: {
                          start: {
                            line: 1,
                            column: 123
                          },
                          end: {
                            line: 1,
                            column: 127
                          }
                        }
                      },
                      operator: '=',
                      right: {
                        type: 'Identifier',
                        name: 'exception',
                        start: 130,
                        end: 139,
                        loc: {
                          start: {
                            line: 1,
                            column: 130
                          },
                          end: {
                            line: 1,
                            column: 139
                          }
                        }
                      },
                      start: 123,
                      end: 139,
                      loc: {
                        start: {
                          line: 1,
                          column: 123
                        },
                        end: {
                          line: 1,
                          column: 139
                        }
                      }
                    },
                    start: 123,
                    end: 140,
                    loc: {
                      start: {
                        line: 1,
                        column: 123
                      },
                      end: {
                        line: 1,
                        column: 140
                      }
                    }
                  }
                ],
                start: 121,
                end: 142,
                loc: {
                  start: {
                    line: 1,
                    column: 121
                  },
                  end: {
                    line: 1,
                    column: 142
                  }
                }
              },
              start: 103,
              end: 142,
              loc: {
                start: {
                  line: 1,
                  column: 103
                },
                end: {
                  line: 1,
                  column: 142
                }
              }
            },
            finalizer: null,
            start: 92,
            end: 142,
            loc: {
              start: {
                line: 1,
                column: 92
              },
              end: {
                line: 1,
                column: 142
              }
            }
          }
        ],
        start: 0,
        end: 142,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 142
          }
        }
      }
    ],
    [
      `try { throw {}; } catch ({ f }) { if (true) function f() {  } else function _f() {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ObjectExpression',
                    properties: [],
                    start: 12,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 6,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 15
                    }
                  }
                }
              ],
              start: 4,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'f',
                      start: 27,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'f',
                      start: 27,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 27,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  }
                ],
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'Literal',
                      value: true,
                      start: 38,
                      end: 42,
                      loc: {
                        start: {
                          line: 1,
                          column: 38
                        },
                        end: {
                          line: 1,
                          column: 42
                        }
                      }
                    },
                    consequent: {
                      type: 'FunctionDeclaration',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 57,
                        end: 61,
                        loc: {
                          start: {
                            line: 1,
                            column: 57
                          },
                          end: {
                            line: 1,
                            column: 61
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 53,
                        end: 54,
                        loc: {
                          start: {
                            line: 1,
                            column: 53
                          },
                          end: {
                            line: 1,
                            column: 54
                          }
                        }
                      },
                      start: 44,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    alternate: {
                      type: 'FunctionDeclaration',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [],
                        start: 81,
                        end: 83,
                        loc: {
                          start: {
                            line: 1,
                            column: 81
                          },
                          end: {
                            line: 1,
                            column: 83
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: '_f',
                        start: 76,
                        end: 78,
                        loc: {
                          start: {
                            line: 1,
                            column: 76
                          },
                          end: {
                            line: 1,
                            column: 78
                          }
                        }
                      },
                      start: 67,
                      end: 83,
                      loc: {
                        start: {
                          line: 1,
                          column: 67
                        },
                        end: {
                          line: 1,
                          column: 83
                        }
                      }
                    },
                    start: 34,
                    end: 83,
                    loc: {
                      start: {
                        line: 1,
                        column: 34
                      },
                      end: {
                        line: 1,
                        column: 83
                      }
                    }
                  }
                ],
                start: 32,
                end: 85,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 85
                  }
                }
              },
              start: 18,
              end: 85,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 85
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 85,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 85
              }
            }
          }
        ],
        start: 0,
        end: 85,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 85
          }
        }
      }
    ],
    [
      `try {} catch(e){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 15,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 17
                  }
                }
              },
              start: 7,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 17
              }
            }
          }
        ],
        start: 0,
        end: 17,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 17
          }
        }
      }
    ],
    [
      `try {} catch({e}){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'e',
                      start: 14,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'e',
                      start: 14,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 14,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    }
                  }
                ],
                start: 13,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 17,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              start: 7,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            }
          }
        ],
        start: 0,
        end: 19,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        }
      }
    ],
    [
      `try {} catch([e]){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'e',
                    start: 14,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    }
                  }
                ],
                start: 13,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 17,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              start: 7,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 19,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 19
              }
            }
          }
        ],
        start: 0,
        end: 19,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 19
          }
        }
      }
    ],
    [
      `try {} catch({e=x}){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'e',
                      start: 14,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      }
                    },
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'e',
                        start: 14,
                        end: 15,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 15
                          }
                        }
                      },
                      right: {
                        type: 'Identifier',
                        name: 'x',
                        start: 16,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        }
                      },
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  }
                ],
                start: 13,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          }
        ],
        start: 0,
        end: 21,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 21
          }
        }
      }
    ],
    [
      `try {} catch {} finally {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        },
        body: [
          {
            type: 'TryStatement',
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            },
            block: {
              type: 'BlockStatement',
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              },
              body: []
            },
            handler: {
              type: 'CatchClause',
              start: 7,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 15
                }
              },
              param: null,
              body: {
                type: 'BlockStatement',
                start: 13,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                },
                body: []
              }
            },
            finalizer: {
              type: 'BlockStatement',
              start: 24,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 24
                },
                end: {
                  line: 1,
                  column: 26
                }
              },
              body: []
            }
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `try { } catch (e) { var x; for (var y of []) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'var',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'x',
                          start: 24,
                          end: 25,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 25
                            }
                          }
                        },
                        start: 24,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        }
                      }
                    ],
                    start: 20,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  },
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 45,
                      end: 47,
                      loc: {
                        start: {
                          line: 1,
                          column: 45
                        },
                        end: {
                          line: 1,
                          column: 47
                        }
                      }
                    },
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'var',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'y',
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
                        }
                      ],
                      start: 32,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    right: {
                      type: 'ArrayExpression',
                      elements: [],
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
                    await: false,
                    start: 27,
                    end: 47,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 47
                      }
                    }
                  }
                ],
                start: 18,
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 49
                  }
                }
              },
              start: 8,
              end: 49,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 49
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 49,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 49
              }
            }
          }
        ],
        start: 0,
        end: 49,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 49
          }
        }
      }
    ],
    [
      `function __f_3() { try { __f_3(); } catch(e) { eval("let fun = ({a} = {a: 30}) => {"); } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'TryStatement',
                  block: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'CallExpression',

                          callee: {
                            type: 'Identifier',
                            name: '__f_3',
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
                          },
                          arguments: [],
                          start: 25,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 25
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        start: 25,
                        end: 33,
                        loc: {
                          start: {
                            line: 1,
                            column: 25
                          },
                          end: {
                            line: 1,
                            column: 33
                          }
                        }
                      }
                    ],
                    start: 23,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  },
                  handler: {
                    type: 'CatchClause',
                    param: {
                      type: 'Identifier',
                      name: 'e',
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
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',

                            callee: {
                              type: 'Identifier',
                              name: 'eval',
                              start: 47,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 47
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              }
                            },
                            arguments: [
                              {
                                type: 'Literal',
                                value: 'let fun = ({a} = {a: 30}) => {',
                                start: 52,
                                end: 84,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 52
                                  },
                                  end: {
                                    line: 1,
                                    column: 84
                                  }
                                }
                              }
                            ],
                            start: 47,
                            end: 85,
                            loc: {
                              start: {
                                line: 1,
                                column: 47
                              },
                              end: {
                                line: 1,
                                column: 85
                              }
                            }
                          },
                          start: 47,
                          end: 86,
                          loc: {
                            start: {
                              line: 1,
                              column: 47
                            },
                            end: {
                              line: 1,
                              column: 86
                            }
                          }
                        }
                      ],
                      start: 45,
                      end: 88,
                      loc: {
                        start: {
                          line: 1,
                          column: 45
                        },
                        end: {
                          line: 1,
                          column: 88
                        }
                      }
                    },
                    start: 36,
                    end: 88,
                    loc: {
                      start: {
                        line: 1,
                        column: 36
                      },
                      end: {
                        line: 1,
                        column: 88
                      }
                    }
                  },
                  finalizer: null,
                  start: 19,
                  end: 88,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 88
                    }
                  }
                }
              ],
              start: 17,
              end: 90,
              loc: {
                start: {
                  line: 1,
                  column: 17
                },
                end: {
                  line: 1,
                  column: 90
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: '__f_3',
              start: 9,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            start: 0,
            end: 90,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 90
              }
            }
          }
        ],
        start: 0,
        end: 90,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 90
          }
        }
      }
    ],
    [
      `try { throw null; } catch (f) {if (false) ; else function f() { return 123; }}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'Literal',
                    value: null,
                    start: 12,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  },
                  start: 6,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                }
              ],
              start: 4,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'f',
                start: 27,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'IfStatement',
                    test: {
                      type: 'Literal',
                      value: false,
                      start: 35,
                      end: 40,
                      loc: {
                        start: {
                          line: 1,
                          column: 35
                        },
                        end: {
                          line: 1,
                          column: 40
                        }
                      }
                    },
                    consequent: {
                      type: 'EmptyStatement',
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
                    },
                    alternate: {
                      type: 'FunctionDeclaration',
                      params: [],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'Literal',
                              value: 123,
                              start: 71,
                              end: 74,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 71
                                },
                                end: {
                                  line: 1,
                                  column: 74
                                }
                              }
                            },
                            start: 64,
                            end: 75,
                            loc: {
                              start: {
                                line: 1,
                                column: 64
                              },
                              end: {
                                line: 1,
                                column: 75
                              }
                            }
                          }
                        ],
                        start: 62,
                        end: 77,
                        loc: {
                          start: {
                            line: 1,
                            column: 62
                          },
                          end: {
                            line: 1,
                            column: 77
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: {
                        type: 'Identifier',
                        name: 'f',
                        start: 58,
                        end: 59,
                        loc: {
                          start: {
                            line: 1,
                            column: 58
                          },
                          end: {
                            line: 1,
                            column: 59
                          }
                        }
                      },
                      start: 49,
                      end: 77,
                      loc: {
                        start: {
                          line: 1,
                          column: 49
                        },
                        end: {
                          line: 1,
                          column: 77
                        }
                      }
                    },
                    start: 31,
                    end: 77,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 77
                      }
                    }
                  }
                ],
                start: 30,
                end: 78,
                loc: {
                  start: {
                    line: 1,
                    column: 30
                  },
                  end: {
                    line: 1,
                    column: 78
                  }
                }
              },
              start: 20,
              end: 78,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 78
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 78,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 78
              }
            }
          }
        ],
        start: 0,
        end: 78,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 78
          }
        }
      }
    ],
    [
      `try{}catch(a){}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 3,
              end: 5,
              loc: {
                start: {
                  line: 1,
                  column: 3
                },
                end: {
                  line: 1,
                  column: 5
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a',
                start: 11,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 13,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              start: 5,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 15,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 15
              }
            }
          }
        ],
        start: 0,
        end: 15,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 15
          }
        }
      }
    ],
    [
      `try { } catch (eval) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'eval',
                start: 15,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 21,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 21
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              start: 8,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            finalizer: null,
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
      `try { } catch (e) { say(e) }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'CallExpression',

                      callee: {
                        type: 'Identifier',
                        name: 'say',
                        start: 20,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 20
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        }
                      },
                      arguments: [
                        {
                          type: 'Identifier',
                          name: 'e',
                          start: 24,
                          end: 25,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 25
                            }
                          }
                        }
                      ],
                      start: 20,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 20
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    start: 20,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  }
                ],
                start: 18,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              start: 8,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 28
              }
            }
          }
        ],
        start: 0,
        end: 28,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 28
          }
        }
      }
    ],
    [
      `try { } catch ([a = 0]) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a',
                      start: 16,
                      end: 17,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 17
                        }
                      }
                    },
                    right: {
                      type: 'Literal',
                      value: 0,
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
                    start: 16,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  }
                ],
                start: 15,
                end: 22,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 22
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 24,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 24
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              start: 8,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 27
              }
            }
          }
        ],
        start: 0,
        end: 27,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 27
          }
        }
      }
    ],
    [
      `try { } catch (e) { let a; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'a',
                          start: 24,
                          end: 25,
                          loc: {
                            start: {
                              line: 1,
                              column: 24
                            },
                            end: {
                              line: 1,
                              column: 25
                            }
                          }
                        },
                        start: 24,
                        end: 25,
                        loc: {
                          start: {
                            line: 1,
                            column: 24
                          },
                          end: {
                            line: 1,
                            column: 25
                          }
                        }
                      }
                    ],
                    start: 20,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  }
                ],
                start: 18,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              start: 8,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 28
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 28
              }
            }
          }
        ],
        start: 0,
        end: 28,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 28
          }
        }
      }
    ],
    [
      `try { throw [1, 2, 3]; } catch ([...x]) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'ArrayExpression',
                    elements: [
                      {
                        type: 'Literal',
                        value: 1,
                        start: 13,
                        end: 14,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 14
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: 2,
                        start: 16,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        }
                      },
                      {
                        type: 'Literal',
                        value: 3,
                        start: 19,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 19
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        }
                      }
                    ],
                    start: 12,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  },
                  start: 6,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                }
              ],
              start: 4,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
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
                    start: 33,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  }
                ],
                start: 32,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
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
              start: 25,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 42
              }
            }
          }
        ],
        start: 0,
        end: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 42
          }
        }
      }
    ],
    [
      `try {try { let e; } catch { let e; } finally { let e; }} catch (e) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
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
        },
        body: [
          {
            type: 'TryStatement',
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
            },
            block: {
              type: 'BlockStatement',
              start: 4,
              end: 56,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 56
                }
              },
              body: [
                {
                  type: 'TryStatement',
                  start: 5,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  },
                  block: {
                    type: 'BlockStatement',
                    start: 9,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    },
                    body: [
                      {
                        type: 'VariableDeclaration',
                        start: 11,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        },
                        declarations: [
                          {
                            type: 'VariableDeclarator',
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
                            },
                            id: {
                              type: 'Identifier',
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
                              },
                              name: 'e'
                            },
                            init: null
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  },
                  handler: {
                    type: 'CatchClause',
                    start: 20,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    },
                    param: null,
                    body: {
                      type: 'BlockStatement',
                      start: 26,
                      end: 36,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 36
                        }
                      },
                      body: [
                        {
                          type: 'VariableDeclaration',
                          start: 28,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          },
                          declarations: [
                            {
                              type: 'VariableDeclarator',
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
                              },
                              id: {
                                type: 'Identifier',
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
                                },
                                name: 'e'
                              },
                              init: null
                            }
                          ],
                          kind: 'let'
                        }
                      ]
                    }
                  },
                  finalizer: {
                    type: 'BlockStatement',
                    start: 45,
                    end: 55,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 55
                      }
                    },
                    body: [
                      {
                        type: 'VariableDeclaration',
                        start: 47,
                        end: 53,
                        loc: {
                          start: {
                            line: 1,
                            column: 47
                          },
                          end: {
                            line: 1,
                            column: 53
                          }
                        },
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            start: 51,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 51
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            },
                            id: {
                              type: 'Identifier',
                              start: 51,
                              end: 52,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 51
                                },
                                end: {
                                  line: 1,
                                  column: 52
                                }
                              },
                              name: 'e'
                            },
                            init: null
                          }
                        ],
                        kind: 'let'
                      }
                    ]
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              start: 57,
              end: 70,
              loc: {
                start: {
                  line: 1,
                  column: 57
                },
                end: {
                  line: 1,
                  column: 70
                }
              },
              param: {
                type: 'Identifier',
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
                },
                name: 'e'
              },
              body: {
                type: 'BlockStatement',
                start: 67,
                end: 70,
                loc: {
                  start: {
                    line: 1,
                    column: 67
                  },
                  end: {
                    line: 1,
                    column: 70
                  }
                },
                body: []
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `try {try { } catch { } finally { }} catch ({e}) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        start: 0,
        end: 51,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 51
          }
        },
        body: [
          {
            type: 'TryStatement',
            start: 0,
            end: 51,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 51
              }
            },
            block: {
              type: 'BlockStatement',
              start: 4,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 35
                }
              },
              body: [
                {
                  type: 'TryStatement',
                  start: 5,
                  end: 34,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 34
                    }
                  },
                  block: {
                    type: 'BlockStatement',
                    start: 9,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    },
                    body: []
                  },
                  handler: {
                    type: 'CatchClause',
                    start: 13,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    },
                    param: null,
                    body: {
                      type: 'BlockStatement',
                      start: 19,
                      end: 22,
                      loc: {
                        start: {
                          line: 1,
                          column: 19
                        },
                        end: {
                          line: 1,
                          column: 22
                        }
                      },
                      body: []
                    }
                  },
                  finalizer: {
                    type: 'BlockStatement',
                    start: 31,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 34
                      }
                    },
                    body: []
                  }
                }
              ]
            },
            handler: {
              type: 'CatchClause',
              start: 36,
              end: 51,
              loc: {
                start: {
                  line: 1,
                  column: 36
                },
                end: {
                  line: 1,
                  column: 51
                }
              },
              param: {
                type: 'ObjectPattern',
                start: 43,
                end: 46,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 46
                  }
                },
                properties: [
                  {
                    type: 'Property',
                    start: 44,
                    end: 45,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 45
                      }
                    },
                    method: false,
                    shorthand: true,
                    computed: false,
                    key: {
                      type: 'Identifier',
                      start: 44,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      name: 'e'
                    },
                    kind: 'init',
                    value: {
                      type: 'Identifier',
                      start: 44,
                      end: 45,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 45
                        }
                      },
                      name: 'e'
                    }
                  }
                ]
              },
              body: {
                type: 'BlockStatement',
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
                },
                body: []
              }
            },
            finalizer: null
          }
        ],
        sourceType: 'script'
      }
    ],
    [
      `try {} catch(x) { x = 0; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
                      type: 'AssignmentExpression',
                      left: {
                        type: 'Identifier',
                        name: 'x',
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
                      operator: '=',
                      right: {
                        type: 'Literal',
                        value: 0,
                        start: 22,
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 23
                          }
                        }
                      },
                      start: 18,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    start: 18,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  }
                ],
                start: 16,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 7,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        }
      }
    ],
    [
      `try {} catch(x) { with ({}) { x = 1; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'x',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'WithStatement',
                    object: {
                      type: 'ObjectExpression',
                      properties: [],
                      start: 24,
                      end: 26,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 26
                        }
                      }
                    },
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'x',
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
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 1,
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
                            start: 30,
                            end: 35,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 35
                              }
                            }
                          },
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
                      start: 28,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    start: 18,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 16,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (let e = 1;;) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 37,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 37
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    },
                    init: {
                      type: 'VariableDeclaration',
                      kind: 'let',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: {
                            type: 'Literal',
                            value: 1,
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
                          id: {
                            type: 'Identifier',
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 33,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 33
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    },
                    test: null,
                    update: null,
                    start: 19,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 17,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              start: 7,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 41,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 41
              }
            }
          }
        ],
        start: 0,
        end: 41,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 41
          }
        }
      }
    ],
    [
      `try {} catch ([a,b,c]) { }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                  },
                  {
                    type: 'Identifier',
                    name: 'b',
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
                  {
                    type: 'Identifier',
                    name: 'c',
                    start: 19,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  }
                ],
                start: 14,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 23,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 7,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 26,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 26
              }
            }
          }
        ],
        start: 0,
        end: 26,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 26
          }
        }
      }
    ],
    [
      `try {} catch (foo) {} var foo;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
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
                  start: 26,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 26,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 22,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `try { throw null; } catch ({}) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ThrowStatement',
                  argument: {
                    type: 'Literal',
                    value: null,
                    start: 12,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  },
                  start: 6,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                }
              ],
              start: 4,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'ObjectPattern',
                properties: [],
                start: 27,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [],
                start: 31,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 31
                  },
                  end: {
                    line: 1,
                    column: 33
                  }
                }
              },
              start: 20,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 33,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 33
              }
            }
          }
        ],
        start: 0,
        end: 33,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 33
          }
        }
      }
    ],
    [
      `try { } catch (a) { { const a = b; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
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
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'a',
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
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'const',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'Identifier',
                              name: 'b',
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
                            id: {
                              type: 'Identifier',
                              name: 'a',
                              start: 28,
                              end: 29,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 28
                                },
                                end: {
                                  line: 1,
                                  column: 29
                                }
                              }
                            },
                            start: 28,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          }
                        ],
                        start: 22,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 22
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      }
                    ],
                    start: 20,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 18,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
              start: 8,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 38
              }
            }
          }
        ],
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      }
    ],
    [
      `try {} catch(e) { try {} catch (e) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 13,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 13
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
                      body: [],
                      start: 22,
                      end: 24,
                      loc: {
                        start: {
                          line: 1,
                          column: 22
                        },
                        end: {
                          line: 1,
                          column: 24
                        }
                      }
                    },
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'Identifier',
                        name: 'e',
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
                      start: 25,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 25
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
                    finalizer: null,
                    start: 18,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  }
                ],
                start: 16,
                end: 39,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 39
                  }
                }
              },
              start: 7,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 39
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 39
              }
            }
          }
        ],
        start: 0,
        end: 39,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 39
          }
        }
      }
    ],
    [
      `try {} catch (foo) { { let foo; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: null,
                            id: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 27,
                              end: 30,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 27
                                },
                                end: {
                                  line: 1,
                                  column: 30
                                }
                              }
                            },
                            start: 27,
                            end: 30,
                            loc: {
                              start: {
                                line: 1,
                                column: 27
                              },
                              end: {
                                line: 1,
                                column: 30
                              }
                            }
                          }
                        ],
                        start: 23,
                        end: 31,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 31
                          }
                        }
                      }
                    ],
                    start: 21,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 19,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
      `var foo; try {} catch (_) { let foo; }`,
      Context.OptionsLoc,
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
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 13,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: '_',
                start: 23,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: null,
                        id: {
                          type: 'Identifier',
                          name: 'foo',
                          start: 32,
                          end: 35,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 35
                            }
                          }
                        },
                        start: 32,
                        end: 35,
                        loc: {
                          start: {
                            line: 1,
                            column: 32
                          },
                          end: {
                            line: 1,
                            column: 35
                          }
                        }
                      }
                    ],
                    start: 28,
                    end: 36,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 36
                      }
                    }
                  }
                ],
                start: 26,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              },
              start: 16,
              end: 38,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 38
                }
              }
            },
            finalizer: null,
            start: 9,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 38
              }
            }
          }
        ],
        start: 0,
        end: 38,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 38
          }
        }
      }
    ],
    [
      `try {} catch (e) { { let e = x; } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'VariableDeclaration',
                        kind: 'let',
                        declarations: [
                          {
                            type: 'VariableDeclarator',
                            init: {
                              type: 'Identifier',
                              name: 'x',
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
                              name: 'e',
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
                    start: 19,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  }
                ],
                start: 17,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              start: 7,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 35
                }
              }
            },
            finalizer: null,
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
      `try {} catch (foo) {} let foo;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'foo',
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
              body: {
                type: 'BlockStatement',
                body: [],
                start: 19,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 7,
              end: 21,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 21
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: null,
                id: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 26,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 26,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              }
            ],
            start: 22,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 30
              }
            }
          }
        ],
        start: 0,
        end: 30,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 30
          }
        }
      }
    ],
    [
      `try {} catch (e) { let b = x; }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'VariableDeclaration',
                    kind: 'let',
                    declarations: [
                      {
                        type: 'VariableDeclarator',
                        init: {
                          type: 'Identifier',
                          name: 'x',
                          start: 27,
                          end: 28,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 28
                            }
                          }
                        },
                        id: {
                          type: 'Identifier',
                          name: 'b',
                          start: 23,
                          end: 24,
                          loc: {
                            start: {
                              line: 1,
                              column: 23
                            },
                            end: {
                              line: 1,
                              column: 24
                            }
                          }
                        },
                        start: 23,
                        end: 28,
                        loc: {
                          start: {
                            line: 1,
                            column: 23
                          },
                          end: {
                            line: 1,
                            column: 28
                          }
                        }
                      }
                    ],
                    start: 19,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  }
                ],
                start: 17,
                end: 31,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 31
                  }
                }
              },
              start: 7,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 31,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 31
              }
            }
          }
        ],
        start: 0,
        end: 31,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 31
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (const e in y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForInStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    left: {
                      type: 'VariableDeclaration',
                      kind: 'const',
                      declarations: [
                        {
                          type: 'VariableDeclarator',
                          init: null,
                          id: {
                            type: 'Identifier',
                            name: 'e',
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
                        }
                      ],
                      start: 24,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    start: 19,
                    end: 40,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 40
                      }
                    }
                  }
                ],
                start: 17,
                end: 42,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 42
                  }
                }
              },
              start: 7,
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 42
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 42,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 42
              }
            }
          }
        ],
        start: 0,
        end: 42,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 42
          }
        }
      }
    ],
    [
      `try {} catch (e) { for (let e of y) {} }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'TryStatement',
            block: {
              type: 'BlockStatement',
              body: [],
              start: 4,
              end: 6,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 6
                }
              }
            },
            handler: {
              type: 'CatchClause',
              param: {
                type: 'Identifier',
                name: 'e',
                start: 14,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'BlockStatement',
                      body: [],
                      start: 36,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
                        },
                        end: {
                          line: 1,
                          column: 38
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
                            name: 'e',
                            start: 28,
                            end: 29,
                            loc: {
                              start: {
                                line: 1,
                                column: 28
                              },
                              end: {
                                line: 1,
                                column: 29
                              }
                            }
                          },
                          start: 28,
                          end: 29,
                          loc: {
                            start: {
                              line: 1,
                              column: 28
                            },
                            end: {
                              line: 1,
                              column: 29
                            }
                          }
                        }
                      ],
                      start: 24,
                      end: 29,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 29
                        }
                      }
                    },
                    right: {
                      type: 'Identifier',
                      name: 'y',
                      start: 33,
                      end: 34,
                      loc: {
                        start: {
                          line: 1,
                          column: 33
                        },
                        end: {
                          line: 1,
                          column: 34
                        }
                      }
                    },
                    await: false,
                    start: 19,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 38
                      }
                    }
                  }
                ],
                start: 17,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              start: 7,
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 40
                }
              }
            },
            finalizer: null,
            start: 0,
            end: 40,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 40
              }
            }
          }
        ],
        start: 0,
        end: 40,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 40
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
