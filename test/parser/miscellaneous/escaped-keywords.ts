import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Miscellaneous - Escaped keywords (fail)', [
  ['n\\u0075ll', Context.Empty],
  ['(x === n\\u0075ll);', Context.Empty],
  ['(x === n\\u0075ll);', Context.Empty],
  ['var x = n\\u0075ll;', Context.Empty],
  ['var x = ({ w\\u0069th }) => {};', Context.Empty],
  ['var n\\u0075ll = 1;', Context.Empty],
  ['tr\\u0075e = 1;', Context.Empty],
  ['(x === f\\u0061lse);', Context.Empty],
  ['(x === n\\u0075ll);', Context.Empty],
  ['var x = f\\u0061lse;', Context.Empty],
  ['var f\\u0061lse = 1;', Context.Empty],
  ['var { f\\u0061lse } = {};', Context.Empty],
  ['f\\u0061lse = 1;', Context.Empty],
  ['switch (this.a) { c\\u0061se 6: break; }', Context.Empty],
  ['try { } c\\u0061tch (e) {}', Context.Empty],
  ['switch (this.a) { d\\u0065fault: break; }', Context.Empty],
  ['class C \\u0065xtends function B() {} {}', Context.Empty],
  ['for (var a i\\u006e this) {}', Context.Empty],
  ['(function() {for (let l\\u0065t in {}) {}})()', Context.Empty],
  ['cl\\u0061ss Foo {}', Context.Empty],
  ['export function br\\u0065ak() {}', Context.Empty],
  ['(n\\u0065w function f() {})', Context.Empty],
  ['(typ\\u0065of 123)', Context.Empty],
  ['const [l\\u0065t] = 1', Context.Empty],
  ['v\\u0061r', Context.Empty],
  ['({\\u0067et get(){}})', Context.Empty],
  ['({\\u0073et set(){}})', Context.Empty],
  ['class C { st\\u0061tic m() {} }', Context.Empty],
  ['var gen = async function *() { var yi\\u0065ld; };', Context.Empty],
  ['var obj = { *method() { void yi\\u0065ld; } };', Context.Empty],
  ['var gen = function *g() { yi\\u0065ld: ; };', Context.Empty],
  ['({ \\u0061sync* m(){}});', Context.Empty],
  ['var \\u{63}ase = 123;', Context.Empty],
  ['var \\u{63}atch = 123;', Context.Empty],
  ['var x = { \\u0066unction } = { function: 42 };', Context.Empty],
  ['var \\u{63}ontinue = 123;', Context.Empty],
  ['var fina\\u{6c}ly = 123;', Context.Empty],
  ['var \\u{64}\\u{6f} = 123;', Context.Empty],
  ['do { ; } wh\\u0069le (true) { }', Context.Empty],
  ['(function*() { return (n++, y\\u0069eld 1); })()', Context.Empty],
  ['var \\u0064elete = 123;', Context.Empty],
  ['var \\u{62}\\u{72}\\u{65}\\u{61}\\u{6b} = 123;', Context.Empty],
  ['var \\u0062\\u0072\\u0065\\u0061\\u006b = 123;;', Context.Empty],
  ['var \\u{65}\\u{6e}\\u{75}\\u{6d} = 123;', Context.Empty],
  ['(v\\u006fid 0)', Context.Empty],
  ['v\\u0061r a = true', Context.Empty],
  ['thi\\u0073 = 123;', Context.Empty],
  ['i\\u0066 (false) {}', Context.Empty],
  ['for (var i = 0; i < 100; ++i) { br\\u0065ak; }', Context.Empty],
  ['cl\\u0061ss Foo {}', Context.Empty],
  ['[th\\u{69}s] = []', Context.Empty],
  ['th\\u{69}s', Context.Empty],
  ['[f\\u0061lse] = []', Context.Empty],
  ['f\\u0061lse', Context.Empty],
  ['(function v\\u0061r() { })', Context.Empty],
  ['(function a(v\\u0061r) { })', Context.Empty],
  ['(function a({v\\u{0061}r}) { })', Context.Empty],
  ['(function a([{v\\u{0061}r}]) { })', Context.Empty],
  ['(function a([[v\\u{0061}r]]) { })', Context.Empty],
  ['(function a({ hello: [v\\u{0061}r]}) { })', Context.Empty],
  ['(function a({ 0: {var:v\\u{0061}r}}) { })', Context.Empty],
  ['a(1,2\\u0063onst foo = 1;', Context.Empty],
  ['\\u0063o { } while(0)', Context.Empty],
  ['cl\\u0061ss Foo {}', Context.Empty],
  ['var {var:v\\u0061r} = obj', Context.Empty],
  ['[v\\u{0061}r] = obj', Context.Empty],
  ['function a({var:v\\u{0061}r}) { }', Context.Empty],
  ['a(1,2\\u0063onst foo = 1;', Context.Empty],
  ['let l\\u0065t = 1', Context.Empty],
  ['const l\\u0065t = 1', Context.Empty],
  ['let l\\u0065t] = 1', Context.Empty],
  ['const l\\u0065t] = 1', Context.Empty],
  ['for (let l\\u0065t in {}) {}', Context.Empty],
  ['(typ\\u0065of 123)', Context.Empty],
  ['(x === f\\u0061lse);', Context.Empty],
  ['var x = f\\u0061lse;', Context.Empty],
  ['(async ()=>{\\u0061wait 100})()', Context.Empty],
  ['(async ()=>{var \\u0061wait = 100})()', Context.Empty],
  ['\\u0063o { } while(0)', Context.Empty],
  ['v\\u0061r', Context.Empty],
  ['({\\u0067et get(){}})', Context.Empty],
  ['({\\u0073et set(){}})', Context.Empty],
  ['class C { async *gen() { void \\u0061wait; }}', Context.Empty],
  ['async() => { void \\u0061wait; };', Context.Empty],
  ['{for(o i\\u006E {}){}}', Context.Empty],
  // ['class X { se\\u0074 x(value) {} }', Context.Empty],
  ['class X { st\\u0061tic y() {} }', Context.Empty],
  ['(function* () { y\\u0069eld 10 })', Context.Empty],
  ['({ \\u0061sync x() { await x } })', Context.Empty],
  ['class C { static async method() { void \\u0061wait; }}', Context.Empty],
  ['while (i < 10) { if (i++ & 1) c\\u006fntinue; this.x++; }', Context.Empty],
  ['(function a({ hello: {var:v\\u{0061}r}}) { })', Context.Empty],
  ['[v\\u{0061}r] = obj', Context.Empty],
  ['t\\u0072y { true } catch (e) {}', Context.Empty],
  ['var x = typ\\u0065of "blah"', Context.Empty],
  ['({ def\\u{61}ult }) => 42;', Context.Empty],
  ['0, { def\\u{61}ult } = { default: 42 };', Context.Empty],
  ['var x = ({ bre\\u0061k }) => {};', Context.Empty],
  ['var x = ({ tr\\u0079 }) => {};', Context.Empty],
  ['var x = ({ typ\\u0065of }) => {};', Context.Empty],
  ['def\\u0061ult', Context.Empty],
  ['var gen = async function *g() { yi\\u0065ld: ; };', Context.Empty],
  ['function *gen() { yi\\u0065ld: ; }', Context.Empty],
  ['(function *gen() { yi\\u0065ld: ; })', Context.Empty],
  ['i\\u0066 (0)', Context.Empty],
  ['var i\\u0066', Context.Empty],
  ['for (a o\\u0066 b);', Context.Empty],
  ['class a { st\\u0061tic m(){} }', Context.Empty],
  ['var \\u{64}\\u{6f} = 123;', Context.Empty],
  ['(\\u0061sync function() { await x })', Context.Empty],
  ['(\\u0061sync () => { await x })', Context.Empty],
  ['\\u0061sync x => { await x }', Context.Empty],
  ['class X { \\u0061sync x() { await x } }', Context.Empty],
  ['class X { static \\u0061sync x() { await x } }', Context.Empty],
  ['for (x \\u006ff y) {}', Context.Empty],
  ['wh\\u0069le (true) { }', Context.Empty],
  ['n\\u0065w function f() {}', Context.Empty],
  ['async () => { aw\\u{61}it: x }', Context.Empty],
  ['async function f(){   (a\\u0077ait "string")   }', Context.Empty],
  ['(b\\u0072eak = "string")', Context.Empty],
  ['(c\\u0061se = "string")', Context.Empty],
  ['(c\\u0061tch = "string")', Context.Empty],
  ['(c\\u006fntinue = "string")', Context.Empty],
  ['f\\u006fr (var i = 0; i < 10; ++i);', Context.Empty],
  ['try { } catch (e) {} f\\u0069nally { }', Context.Empty],
  ['d\\u0065bugger;', Context.Empty],
  ['if (d\\u006f { true }) {}', Context.Empty],
  ['\\u{74}rue', Context.Empty],
  ['var \\u{64}\\u{6f} = 123;', Context.Empty],
  ['a\\u{0022}b=1', Context.Empty],
  ['({ g\\u0065t x(){} });', Context.Empty],
  ['le\\u0074 a', Context.Empty],
  ['i\\u0066 (0)', Context.Empty],
  ['var i\\u0066', Context.Empty],
  ['function *a(){var yi\\u0065ld}', Context.Empty],
  ['function *a(){yi\\u0065ld 0}', Context.Empty],
  ['le\\u0074 x = 5', Context.Empty],
  ['class yi\\u0065ld {}', Context.Empty],
  ['class l\\u0065t {}', Context.Empty],
  ['class yi\\u0065ld {}', Context.Empty],
  ['class l\\u0065t {}', Context.Empty],
  ['class yi\\u0065ld {}', Context.Empty],
  ['l\\u0065t\na', Context.Empty]
]);

pass('Miscellaneous - Escaped keywords  (pass)', [
  [
    `\\u0061sync`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'async',
            start: 0,
            end: 10,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 10
              }
            }
          },
          start: 0,
          end: 10,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 10
            }
          }
        }
      ],
      start: 0,
      end: 10,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 10
        }
      }
    }
  ],
  [
    `var int\\u0065rface = 1;`,
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
              init: {
                type: 'Literal',
                value: 1,
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
              id: {
                type: 'Identifier',
                name: 'interface',
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
              start: 4,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 22
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
    `var p\\u0072ivate;`,
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
                name: 'private',
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
    `var prot\\u0065cted = 1;`,
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
              init: {
                type: 'Literal',
                value: 1,
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
              id: {
                type: 'Identifier',
                name: 'protected',
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
              start: 4,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 22
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
    `var { packa\\u0067e  } = {};`,
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
              init: {
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'package',
                      start: 6,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'package',
                      start: 6,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 6,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 18
                      }
                    }
                  }
                ],
                start: 4,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              start: 4,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 26
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
    `var impl\\u0065ments = 1;`,
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
              init: {
                type: 'Literal',
                value: 1,
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
              id: {
                type: 'Identifier',
                name: 'implements',
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
              start: 4,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 4
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
    `0, { def\\u{61}ult: x } = { default: 42 };`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'SequenceExpression',
            expressions: [
              {
                type: 'Literal',
                value: 0,
                start: 0,
                end: 1,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 1
                  }
                }
              },
              {
                type: 'AssignmentExpression',
                left: {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'default',
                        start: 5,
                        end: 17,
                        loc: {
                          start: {
                            line: 1,
                            column: 5
                          },
                          end: {
                            line: 1,
                            column: 17
                          }
                        }
                      },
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 5,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 5
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    }
                  ],
                  start: 3,
                  end: 22,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 22
                    }
                  }
                },
                operator: '=',
                right: {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'default',
                        start: 27,
                        end: 34,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 34
                          }
                        }
                      },
                      value: {
                        type: 'Literal',
                        value: 42,
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 27,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    }
                  ],
                  start: 25,
                  end: 40,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 40
                    }
                  }
                },
                start: 3,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
          },
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
    `(p\\u0072ivate = 1);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'private',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 1,
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
            start: 1,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
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
    `(publ\\u0069c);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'public',
            start: 1,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
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
  ],
  [
    `(p\\u0061ckage = 1);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'package',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 1,
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
            start: 1,
            end: 17,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 17
              }
            }
          },
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
    `foo = {}; foo.def\\u{61}ult = 3;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'foo',
              start: 0,
              end: 3,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 3
                }
              }
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
          },
          start: 0,
          end: 9,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 9
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'foo',
                start: 10,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'default',
                start: 14,
                end: 26,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 26
                  }
                }
              },
              start: 10,
              end: 26,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 26
                }
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 3,
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
            start: 10,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 30
              }
            }
          },
          start: 10,
          end: 31,
          loc: {
            start: {
              line: 1,
              column: 10
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
    `class x { static set st\\u0061tic(v) {}}`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ClassDeclaration',
          id: {
            type: 'Identifier',
            name: 'x',
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
          superClass: null,
          body: {
            type: 'ClassBody',
            body: [
              {
                type: 'MethodDefinition',
                kind: 'set',
                static: true,
                computed: false,
                key: {
                  type: 'Identifier',
                  name: 'static',
                  start: 21,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                },
                value: {
                  type: 'FunctionExpression',
                  params: [
                    {
                      type: 'Identifier',
                      name: 'v',
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
                    }
                  ],
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
                  async: false,
                  generator: false,
                  id: null,
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
                start: 10,
                end: 38,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 38
                  }
                }
              }
            ],
            start: 8,
            end: 39,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 39
              }
            }
          },
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
    `(p\\u0061ckage = "string")`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'package',
              start: 1,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 13
                }
              }
            },
            operator: '=',
            right: {
              type: 'Literal',
              value: 'string',
              start: 16,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            start: 1,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 24
              }
            }
          },
          start: 0,
          end: 25,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 25
            }
          }
        }
      ],
      start: 0,
      end: 25,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 25
        }
      }
    }
  ],
  [
    `function privat\\u0065() {}`,
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
            body: [],
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
          async: false,
          generator: false,
          id: {
            type: 'Identifier',
            name: 'private',
            start: 9,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 9
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
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
    `(class { static get st\\u0061tic(){}});`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ClassExpression',
            id: null,
            superClass: null,
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'get',
                  static: true,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'static',
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
                  },
                  value: {
                    type: 'FunctionExpression',
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
                    id: null,
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
                  start: 9,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                }
              ],
              start: 7,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 36
                }
              }
            },
            start: 1,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 36
              }
            }
          },
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
    `async l\\u0065t => 42`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ArrowFunctionExpression',
            body: {
              type: 'Literal',
              value: 42,
              start: 18,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            params: [
              {
                type: 'Identifier',
                name: 'let',
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
            async: true,
            expression: true,
            start: 0,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
          start: 0,
          end: 20,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 20
            }
          }
        }
      ],
      start: 0,
      end: 20,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 20
        }
      }
    }
  ],
  [
    `(st\\u0061tic);`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'static',
            start: 1,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 12
              }
            }
          },
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
  ],
  [
    `var { int\\u0065rface  } = {};`,
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
              init: {
                type: 'ObjectExpression',
                properties: [],
                start: 26,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 26
                  },
                  end: {
                    line: 1,
                    column: 28
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
                      name: 'interface',
                      start: 6,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'interface',
                      start: 6,
                      end: 20,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 20
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 6,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  }
                ],
                start: 4,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              start: 4,
              end: 28,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 28
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
    `({ def\\u0061ult: 0 })`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'default',
                  start: 3,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 15
                    }
                  }
                },
                value: {
                  type: 'Literal',
                  value: 0,
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
            start: 1,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
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
    `({ def\\u{61}ult: 0 })`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'ObjectExpression',
            properties: [
              {
                type: 'Property',
                key: {
                  type: 'Identifier',
                  name: 'default',
                  start: 3,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 15
                    }
                  }
                },
                value: {
                  type: 'Literal',
                  value: 0,
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
                kind: 'init',
                computed: false,
                method: false,
                shorthand: false,
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
              }
            ],
            start: 1,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 1
              },
              end: {
                line: 1,
                column: 20
              }
            }
          },
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
    `if (true) l\\u0065t: ;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'IfStatement',
          test: {
            type: 'Literal',
            value: true,
            start: 4,
            end: 8,
            loc: {
              start: {
                line: 1,
                column: 4
              },
              end: {
                line: 1,
                column: 8
              }
            }
          },
          consequent: {
            type: 'LabeledStatement',
            label: {
              type: 'Identifier',
              name: 'let',
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
            body: {
              type: 'EmptyStatement',
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
            start: 10,
            end: 21,
            loc: {
              start: {
                line: 1,
                column: 10
              },
              end: {
                line: 1,
                column: 21
              }
            }
          },
          alternate: null,
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
  ]
]);
