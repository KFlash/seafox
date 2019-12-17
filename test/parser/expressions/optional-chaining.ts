import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Next - Optional chaining', () => {
  for (const arg of [
    'new obj?.()',
    'new obj?.foo()',
    'obj?.foo\n`template`',
    'async .?() => {}',
    'a.?2.3',
    'a.? (?) [?]',
    '{a: 44}?.a',
    'a?.b++;',
    '--a?.b;',
    'a:?.b',
    'a:?[b]',
    '?. ?[] ?() ?:',
    'var b = condition ? a?.x.?y : a?.y?.z;',
    'class a extends b { c() { [super?.d] = e } }',
    '[x?.?.y = 1]',
    'a ? .5;'
  ]) {
    it(`${arg}`, () => {
      t.throws(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const arg of [
    '[x.y = 1] = [42]',
    '({ x: 1 }).x?.y.z;',
    `a?.b(...args).c(...args);`,
    'let a = b?.c;',
    'o.x?[y]+z:t',
    '({ x: y?.z })',
    '({ undefined: 3 })?.[null?.a]',
    '() => ({})?.["i"]()',
    '0?.()',
    '1?.()',
    '[]?.()',
    '({})?.["constructor"]',
    '[]?.length',
    '1?.valueOf()',
    '0?.valueOf()',
    'o1.x?.["y"];',
    'o1.x?.();',
    'x?.delete',
    'x?.function',
    'x?.let',
    'x.let',
    'x?.package',
    'x?.implements',
    'x?.package',
    'null?.(o1.x);',
    'obj?.d();',
    '(a?.b).c',
    '(obj?.a)?.b',
    '(fn()?.a)?.b',
    'const value = true ?.30 : false;',
    'undf?.b',
    'null?.a',
    '[1, 2]?.[1]',
    '(function a () {}?.name)',
    '(class Foo {}?.name)',
    '(function * a () {}?.name)',
    'new new class {}().constructor();',
    'System.global.navigator?.toString()',
    'async?.(package())',
    'async?.(async())',
    'async?.(async?.a, async?.a)',
    'async?.(async?.a, async?.(x))',
    'async?.(async?.(), async?.[x])',
    'async?.(async?.a, async?.a)',
    'async?.("string", async?.a, async?.a)',
    'async?.(123, async?.a, async?.a)',
    'async?.(async?.a, "string", a=>x?.z)',
    'o3?.a === o4?.a === undefined',
    'o3?.a?.b === o4?.a?.b === undefined',
    'o3?.a?.b?.c === o4?.a?.b?.c === undefined',
    'x in (o3?.a)',
    'obj.func?.[arg].property;',
    'obj.func?.[arg.property];',
    'a?.b.c.e?.f.g?.h.t.c?.d()?.e;',
    'a?.d().f?.b',
    '(fn()?.a)?.b',
    'a?.[++x]',
    'a?.b.c(++x).d;',
    'undefined?.[++x]',
    'undefined?.b.c(++x).d; ',
    'undefined?.b',
    'obj.func?.[arg];',
    'a?.trim()?.indexOf("hello")',
    'foo?.x?.y?.z?()=>{foo}:bar;',
    `if (a?.b?.c === 'foobar') {}
     if (a?.b()?.c) {}
     if (a?.b?.()?.c) {}`,
    '[a, b] = [b, a];',
    '[a, b.c] = [d?.e, f?.g];',
    '[a, b.c] = [d?.e, (f.g) = h];',
    '[a, b] = f?.(); ',
    'var [a, , b] = f();',
    '[a, ...b] = [1, 2?.a, 3];',
    'null?.(1, ...a)',
    '({}).a?.(...a)',
    '({ a: null }).a?.(...a)',
    'undefined?.(...a)?.(1, ...a)',
    '() => 5?.(...[])',
    'delete o1?.x',
    'o2.x',
    'greet.call?.({ suffix: "!" }, "world")',
    'null.call?.({ suffix: "!" }, "world")',
    '({}).call?.({ suffix: "!" }, "world")',
    'greet?.apply({ suffix: "?" }, "world")',
    'masquerader?.()',
    'greet.call?.({ suffix: "!" }, "world")',
    'greet.call?.({ suffix: "!" }, "world")',
    'o2.x?.["y"];',
    'a?.[foo(a)]',
    'x?.[y?.z];',
    'x.k?.[y?.z];',
    'x?.(y?.z)',
    '(x?.y)?.(z)',
    '(x?.y)(z)',
    'a ?? a.b ?? (a?.b).c();',
    'a ?? foo.bar?.baz ?? a.c',
    'a ?? aobj?.[expr]?.[other] ?? foo.bar?.baz',
    'a?.b[3].c?.(x).d ?? aobj?.[expr]?.[other] ?? foo.bar?.baz',
    'const x = a?.b.c',
    '(null)?.b === null',
    'let a = b?.c',
    'a?.b',
    '!a ? a : a.b',
    'foo(null?.x)',
    'let a = b?? "default";',
    'let a = b.c ?? "default";',
    'let xn = x?.normalize("NFC")',
    'a?.b === undefined',
    'null?.foo === null',
    'var v = a?.b?.c?.d',
    'var v = (((a?.b)?.c)?.d)',
    'a?.b?.c?.d === undefined',
    '({})?.a["b"]',
    'delete null?.foo',
    '({})?.constructor',
    '({ x: "hi" })?.x',
    '[]?.length',
    'true?.["valueOf"]()',
    'null?.["valueOf"]()',
    'undefined?.["valueOf"]()',
    'const a = b.map(p => p.d?.e?.f);',
    'const a = b.map(p => p.c?.d?.e ?? "(string)");',
    'f?.(arg0, arg1)',
    'true?.(123)',
    'true?.(123??x?.3:5)',
    'true?.(123)',
    `function isInvoked(obj) {
       let invoked = false;
       obj?.a.b.m(invoked = true);
       return invoked;
     }`,
    'a.b?.c?.d',
    'obj ? ["a", "b", "c"].map(x => x+x) : []',
    'const a = b?.c?.[d]?.e;',
    'const a = b?.c();',
    'const { a, b } = c.d?.e;',
    '1?.["valueOf"]()',
    '() => 0?.()',
    '() => 1?.()',
    '() => "hi"?.()',
    '() => ({})?.a["b"]',
    '() => (() => {})?.()()',
    '(() => {})?.()?.()',
    'null?.()().a["b"]',
    'delete undefined?.()',
    'delete null?.()',
    'x?.([...[function f() {}.prop]] = [])',
    'x?.({ a: obj.a } = {})',
    'value = { x: 4 };',
    'for (let [a = b?.a] of [0, c = 0]);',
    '({x: y = z = 0} = 1)?.(a??b)',
    '({x: y = z = 0} = 1)?.(a?.(a??b))',
    '({let} = 0);',
    '([x.y = a] = ([x.y = a?.y] = ([x.y = a] = z)))',
    '({..."x".x} = x?.y);',
    '({...{}.x} = x??y?.(a=b?.a));',
    '([...[([...[].x] = x??y?.z)].x] = x);',
    '([...{}.x] = x);',
    '({..."x"[x]} = x);',
    '({...[][x?.y]} = x);',
    '({...[][x?.y]} = x = y);',
    '({...[][x?.y]} = x = (y?.y??z));',
    '({...{}[x?.y]} = x?.y??z);',
    'undefined?.(...a)',
    'obj?.prop ',
    'func?.(...args)',
    'a?.[x]',
    'a?.()',
    'x?.1:y',
    'a?.[++x]',
    'a?.b.c(++x).d',
    'a?.b[3].c?.(x).d',
    '(a?.b).c',
    'delete a?.b',
    'func?.(a, b)',
    'a?.func?.()',
    'a?.func?.(a, b)',
    'null?.valueOf()',
    'a.func?.()',
    'obj?.[expr]',
    'obj?.[expr]?.[other]',
    `obj?.[true]`,
    'obj?.[true]?.[true]',
    'obj.a?.[expr]',
    `obj.a?.[true]`,
    `foo.bar?.baz`,
    `foo?.bar?.baz`,
    `foo?.bar`,
    'a.b?.c()',
    '(a?.b).c;',
    '(a?.b).c();',
    '(a?.b)?.c.d?.e;',
    `a?.b.c.d.e?.f`,
    `a.b.c?.d.e.f`,
    `if (a?.b?.c) {
       console.log(a?.b?.c);
     } else if (a?.b.c?.d?.e.f) {
       console.log(a?.b.c?.d?.e.f);
     }`,
    'true?.valueOf()',
    '0?.valueOf()',
    'false?.()',
    '0?.()',
    '({})?.()',
    '[]?.()',
    `class A {
       a () {}
     }
     class B extends A {
       dot () {
         return super.a?.name;
       }
       expr () {
         return super['a'].name;
       }
       undf () {
         return super.b?.c;
       }
     }`,
    '({a: 33}, null)?.a',
    '({a: 33})?.a',
    'arr?.[i + 1]',
    'arr[0]?.a',
    'arr[1]?.a',
    'false?.4:5',
    'greet.call?.({ suffix: "!" }, "world")',
    'var a = b.c("string")?.d.e || 0;',
    'func?.()'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `for ((obj?.foo).bar of []);`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement',
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
            left: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 6,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'foo',
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bar',
                start: 16,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              optional: false,
              shortCircuited: false,
              start: 5,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
            right: {
              type: 'ArrayExpression',
              elements: [],
              start: 23,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            await: false,
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
      `(obj?.foo).bar++`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UpdateExpression',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'obj',
                    start: 1,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 6,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  },
                  optional: true,
                  shortCircuited: false,
                  start: 1,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'bar',
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                optional: false,
                shortCircuited: false,
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
              },
              operator: '++',
              prefix: false,
              start: 0,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            start: 0,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 16
              }
            }
          }
        ],
        start: 0,
        end: 16,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      }
    ],
    [
      `(obj?.foo).bar = 0`,
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
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'Identifier',
                    name: 'obj',
                    start: 1,
                    end: 4,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 4
                      }
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'foo',
                    start: 6,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  },
                  optional: true,
                  shortCircuited: false,
                  start: 1,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'bar',
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                },
                optional: false,
                shortCircuited: false,
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
              },
              operator: '=',
              right: {
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
              start: 0,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            start: 0,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 18
              }
            }
          }
        ],
        start: 0,
        end: 18,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 18
          }
        }
      }
    ],
    [
      `class Foo extends Base { method() { super.method?.(); } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'Foo',
              start: 6,
              end: 9,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 9
                }
              }
            },
            superClass: {
              type: 'Identifier',
              name: 'Base',
              start: 18,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 18
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'method',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'method',
                    start: 25,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
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
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'MemberExpression',
                              object: {
                                type: 'Super',
                                start: 36,
                                end: 41,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 36
                                  },
                                  end: {
                                    line: 1,
                                    column: 41
                                  }
                                }
                              },
                              computed: false,
                              property: {
                                type: 'Identifier',
                                name: 'method',
                                start: 42,
                                end: 48,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 48
                                  }
                                }
                              },
                              optional: false,
                              shortCircuited: false,
                              start: 36,
                              end: 48,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 36
                                },
                                end: {
                                  line: 1,
                                  column: 48
                                }
                              }
                            },
                            arguments: [],
                            optional: true,
                            shortCircuited: false,
                            start: 36,
                            end: 52,
                            loc: {
                              start: {
                                line: 1,
                                column: 36
                              },
                              end: {
                                line: 1,
                                column: 52
                              }
                            }
                          },
                          start: 36,
                          end: 53,
                          loc: {
                            start: {
                              line: 1,
                              column: 36
                            },
                            end: {
                              line: 1,
                              column: 53
                            }
                          }
                        }
                      ],
                      start: 34,
                      end: 55,
                      loc: {
                        start: {
                          line: 1,
                          column: 34
                        },
                        end: {
                          line: 1,
                          column: 55
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 31,
                    end: 55,
                    loc: {
                      start: {
                        line: 1,
                        column: 31
                      },
                      end: {
                        line: 1,
                        column: 55
                      }
                    }
                  },
                  start: 25,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 25
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                }
              ],
              start: 23,
              end: 57,
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 57
                }
              }
            },
            start: 0,
            end: 57,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 57
              }
            }
          }
        ],
        start: 0,
        end: 57,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 57
          }
        }
      }
    ],
    [
      `function a(b) { new.target?.(); }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'FunctionDeclaration',
            params: [
              {
                type: 'Identifier',
                name: 'b',
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
              }
            ],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'CallExpression',
                    callee: {
                      type: 'MetaProperty',
                      meta: {
                        type: 'Identifier',
                        name: 'new',
                        start: 16,
                        end: 20,
                        loc: {
                          start: {
                            line: 1,
                            column: 16
                          },
                          end: {
                            line: 1,
                            column: 20
                          }
                        }
                      },
                      property: {
                        type: 'Identifier',
                        name: 'target',
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
                    arguments: [],
                    optional: true,
                    shortCircuited: false,
                    start: 16,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
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
                }
              ],
              start: 14,
              end: 33,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 33
                }
              }
            },
            async: false,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'a',
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
      `for (const key in obj?.inner) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForInStatement',
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
            left: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'key',
                    start: 11,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 18,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'inner',
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
              },
              optional: true,
              shortCircuited: false,
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
            start: 0,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 32
              }
            }
          }
        ],
        start: 0,
        end: 32,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 32
          }
        }
      }
    ],
    [
      `for (const key of {}?.a) ;`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'EmptyStatement',
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
            left: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'key',
                    start: 11,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
              type: 'MemberExpression',
              object: {
                type: 'ObjectExpression',
                properties: [],
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
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
            await: false,
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
      `x ?.[y] === 5`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'x',
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
                computed: true,
                property: {
                  type: 'Identifier',
                  name: 'y',
                  start: 5,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              right: {
                type: 'Literal',
                value: 5,
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
              operator: '===',
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
            },
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
      `a ?.b ?.c ?.d === undefined`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'MemberExpression',
                object: {
                  type: 'MemberExpression',
                  object: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'a',
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'b',
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
                    optional: true,
                    shortCircuited: false,
                    start: 0,
                    end: 5,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 5
                      }
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'c',
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
                  optional: true,
                  shortCircuited: true,
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'd',
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
                optional: true,
                shortCircuited: true,
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
              },
              right: {
                type: 'Identifier',
                name: 'undefined',
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
              operator: '===',
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
            },
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
      `obj?.aaa.bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 5,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
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
                }
              },
              optional: false,
              shortCircuited: true,
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 12
              }
            }
          }
        ],
        start: 0,
        end: 12,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      }
    ],
    [
      `(obj?.aaa)?.bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 6,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
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
              optional: true,
              shortCircuited: false,
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
            },
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
      `(obj?.aaa).bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 6,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
                start: 11,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              optional: false,
              shortCircuited: false,
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
      `func?.()?.bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'func',
                  start: 0,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                arguments: [],
                optional: true,
                shortCircuited: false,
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
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
              optional: true,
              shortCircuited: true,
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
            },
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
      `(func?.())?.bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'func',
                  start: 1,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 5
                    }
                  }
                },
                arguments: [],
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
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
              optional: true,
              shortCircuited: false,
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
            },
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
      `(func?.()).bbb`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'func',
                  start: 1,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 5
                    }
                  }
                },
                arguments: [],
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'bbb',
                start: 11,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              optional: false,
              shortCircuited: false,
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
      `obj?.aaa?.()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 5,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              arguments: [],
              optional: true,
              shortCircuited: true,
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 12
              }
            }
          }
        ],
        start: 0,
        end: 12,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      }
    ],
    [
      `for (obj?.a; obj2?.a; obj?.a) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
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
            init: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 5,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 8
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
                start: 10,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              optional: true,
              shortCircuited: false,
              start: 5,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj2',
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
              start: 13,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            },
            update: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 22,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 22
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
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
            start: 0,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 32
              }
            }
          }
        ],
        start: 0,
        end: 32,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 32
          }
        }
      }
    ],
    [
      `while (obj?.a) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'WhileStatement',
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 7,
                end: 10,
                loc: {
                  start: {
                    line: 1,
                    column: 7
                  },
                  end: {
                    line: 1,
                    column: 10
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
              start: 7,
              end: 13,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 13
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
      `for (const key of obj?.a) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForOfStatement',
            body: {
              type: 'BlockStatement',
              body: [],
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
            left: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  init: null,
                  id: {
                    type: 'Identifier',
                    name: 'key',
                    start: 11,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  },
                  start: 11,
                  end: 14,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 14
                    }
                  }
                }
              ],
              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            right: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 18,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
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
            },
            await: false,
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
      `async function checkAssertions() {for await (const num of obj?.iterable) {}}`,
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
                  type: 'ForOfStatement',
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 73,
                    end: 75,
                    loc: {
                      start: {
                        line: 1,
                        column: 73
                      },
                      end: {
                        line: 1,
                        column: 75
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
                          name: 'num',
                          start: 51,
                          end: 54,
                          loc: {
                            start: {
                              line: 1,
                              column: 51
                            },
                            end: {
                              line: 1,
                              column: 54
                            }
                          }
                        },
                        start: 51,
                        end: 54,
                        loc: {
                          start: {
                            line: 1,
                            column: 51
                          },
                          end: {
                            line: 1,
                            column: 54
                          }
                        }
                      }
                    ],
                    start: 45,
                    end: 54,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 54
                      }
                    }
                  },
                  right: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: 'obj',
                      start: 58,
                      end: 61,
                      loc: {
                        start: {
                          line: 1,
                          column: 58
                        },
                        end: {
                          line: 1,
                          column: 61
                        }
                      }
                    },
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'iterable',
                      start: 63,
                      end: 71,
                      loc: {
                        start: {
                          line: 1,
                          column: 63
                        },
                        end: {
                          line: 1,
                          column: 71
                        }
                      }
                    },
                    optional: true,
                    shortCircuited: false,
                    start: 58,
                    end: 71,
                    loc: {
                      start: {
                        line: 1,
                        column: 58
                      },
                      end: {
                        line: 1,
                        column: 71
                      }
                    }
                  },
                  await: false,
                  start: 34,
                  end: 75,
                  loc: {
                    start: {
                      line: 1,
                      column: 34
                    },
                    end: {
                      line: 1,
                      column: 75
                    }
                  }
                }
              ],
              start: 33,
              end: 76,
              loc: {
                start: {
                  line: 1,
                  column: 33
                },
                end: {
                  line: 1,
                  column: 76
                }
              }
            },
            async: true,
            generator: false,
            id: {
              type: 'Identifier',
              name: 'checkAssertions',
              start: 15,
              end: 30,
              loc: {
                start: {
                  line: 1,
                  column: 15
                },
                end: {
                  line: 1,
                  column: 30
                }
              }
            },
            start: 0,
            end: 76,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 76
              }
            }
          }
        ],
        start: 0,
        end: 76,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 76
          }
        }
      }
    ],
    [
      `do {} while (obj?.a);`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'DoWhileStatement',
            body: {
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
            start: 0,
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
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
              computed: false,
              property: {
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
              optional: true,
              shortCircuited: false,
              start: 13,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 19
                }
              }
            },
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
      `a?.[a?.b]`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'a',
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
              computed: true,
              property: {
                type: 'MemberExpression',
                object: {
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'b',
                  start: 7,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              optional: true,
              shortCircuited: false,
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
          }
        ],
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
      }
    ],
    [
      `(44, {a: 44}?.a)`,
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
                  value: 44,
                  start: 1,
                  end: 3,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 3
                    }
                  }
                },
                {
                  type: 'MemberExpression',
                  object: {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
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
                        value: {
                          type: 'Literal',
                          value: 44,
                          start: 9,
                          end: 11,
                          loc: {
                            start: {
                              line: 1,
                              column: 9
                            },
                            end: {
                              line: 1,
                              column: 11
                            }
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
                        start: 6,
                        end: 11,
                        loc: {
                          start: {
                            line: 1,
                            column: 6
                          },
                          end: {
                            line: 1,
                            column: 11
                          }
                        }
                      }
                    ],
                    start: 5,
                    end: 12,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 12
                      }
                    }
                  },
                  computed: false,
                  property: {
                    type: 'Identifier',
                    name: 'a',
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
                  optional: true,
                  shortCircuited: false,
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
                }
              ],
              start: 1,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            start: 0,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 16
              }
            }
          }
        ],
        start: 0,
        end: 16,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      }
    ],
    [
      `(class Foo {}?.name)`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'ClassExpression',
                id: {
                  type: 'Identifier',
                  name: 'Foo',
                  start: 7,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                },
                superClass: null,
                body: {
                  type: 'ClassBody',
                  body: [],
                  start: 11,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                },
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
              computed: false,
              property: {
                type: 'Identifier',
                name: 'name',
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
              optional: true,
              shortCircuited: false,
              start: 1,
              end: 19,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 19
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
      `(async function a () {}?.name)`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'FunctionExpression',
                params: [],
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
                async: true,
                generator: false,
                id: {
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
                start: 1,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'name',
                start: 25,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 25
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              optional: true,
              shortCircuited: false,
              start: 1,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
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
      `a?.[b]`,
      Context.OptionsLoc,
      {
        body: [
          {
            end: 6,
            expression: {
              computed: true,
              end: 6,
              loc: {
                end: {
                  column: 6,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              object: {
                end: 1,
                loc: {
                  end: {
                    column: 1,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                name: 'a',
                start: 0,
                type: 'Identifier'
              },
              optional: true,
              shortCircuited: false,
              property: {
                end: 5,
                loc: {
                  end: {
                    column: 5,
                    line: 1
                  },
                  start: {
                    column: 4,
                    line: 1
                  }
                },
                name: 'b',
                start: 4,
                type: 'Identifier'
              },
              start: 0,
              type: 'MemberExpression'
            },
            loc: {
              end: {
                column: 6,
                line: 1
              },
              start: {
                column: 0,
                line: 1
              }
            },
            start: 0,
            type: 'ExpressionStatement'
          }
        ],
        end: 6,
        loc: {
          end: {
            column: 6,
            line: 1
          },
          start: {
            column: 0,
            line: 1
          }
        },
        sourceType: 'script',
        start: 0,
        type: 'Program'
      }
    ],
    [
      '`hello`?.[0]',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'hello',
                      raw: 'hello'
                    },
                    tail: true,
                    start: 0,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 0
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    }
                  }
                ],
                start: 0,
                end: 7,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 7
                  }
                }
              },
              computed: true,
              property: {
                type: 'Literal',
                value: 0,
                start: 10,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              optional: true,
              shortCircuited: false,
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 12
              }
            }
          }
        ],
        start: 0,
        end: 12,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      }
    ],
    [
      `for (count = 0; obj?.a; count++) {}`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
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
              type: 'AssignmentExpression',
              left: {
                type: 'Identifier',
                name: 'count',
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
              operator: '=',
              right: {
                type: 'Literal',
                value: 0,
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
              start: 5,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 5
                },
                end: {
                  line: 1,
                  column: 14
                }
              }
            },
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: 'obj',
                start: 16,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              computed: false,
              property: {
                type: 'Identifier',
                name: 'a',
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
              optional: true,
              shortCircuited: false,
              start: 16,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 16
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
            update: {
              type: 'UpdateExpression',
              argument: {
                type: 'Identifier',
                name: 'count',
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
              operator: '++',
              prefix: false,
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
      `class F extends Function { constructor() { super(); new.target?.(); } }`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ClassDeclaration',
            id: {
              type: 'Identifier',
              name: 'F',
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
            superClass: {
              type: 'Identifier',
              name: 'Function',
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
            body: {
              type: 'ClassBody',
              body: [
                {
                  type: 'MethodDefinition',
                  kind: 'constructor',
                  static: false,
                  computed: false,
                  key: {
                    type: 'Identifier',
                    name: 'constructor',
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
                  },
                  value: {
                    type: 'FunctionExpression',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Super',
                              start: 43,
                              end: 48,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 43
                                },
                                end: {
                                  line: 1,
                                  column: 48
                                }
                              }
                            },
                            arguments: [],
                            optional: false,
                            shortCircuited: false,
                            start: 43,
                            end: 50,
                            loc: {
                              start: {
                                line: 1,
                                column: 43
                              },
                              end: {
                                line: 1,
                                column: 50
                              }
                            }
                          },
                          start: 43,
                          end: 51,
                          loc: {
                            start: {
                              line: 1,
                              column: 43
                            },
                            end: {
                              line: 1,
                              column: 51
                            }
                          }
                        },
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'CallExpression',
                            callee: {
                              type: 'MetaProperty',
                              meta: {
                                type: 'Identifier',
                                name: 'new',
                                start: 52,
                                end: 56,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 52
                                  },
                                  end: {
                                    line: 1,
                                    column: 56
                                  }
                                }
                              },
                              property: {
                                type: 'Identifier',
                                name: 'target',
                                start: 56,
                                end: 62,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 56
                                  },
                                  end: {
                                    line: 1,
                                    column: 62
                                  }
                                }
                              },
                              start: 52,
                              end: 62,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 52
                                },
                                end: {
                                  line: 1,
                                  column: 62
                                }
                              }
                            },
                            arguments: [],
                            optional: true,
                            shortCircuited: false,
                            start: 52,
                            end: 66,
                            loc: {
                              start: {
                                line: 1,
                                column: 52
                              },
                              end: {
                                line: 1,
                                column: 66
                              }
                            }
                          },
                          start: 52,
                          end: 67,
                          loc: {
                            start: {
                              line: 1,
                              column: 52
                            },
                            end: {
                              line: 1,
                              column: 67
                            }
                          }
                        }
                      ],
                      start: 41,
                      end: 69,
                      loc: {
                        start: {
                          line: 1,
                          column: 41
                        },
                        end: {
                          line: 1,
                          column: 69
                        }
                      }
                    },
                    async: false,
                    generator: false,
                    id: null,
                    start: 38,
                    end: 69,
                    loc: {
                      start: {
                        line: 1,
                        column: 38
                      },
                      end: {
                        line: 1,
                        column: 69
                      }
                    }
                  },
                  start: 27,
                  end: 69,
                  loc: {
                    start: {
                      line: 1,
                      column: 27
                    },
                    end: {
                      line: 1,
                      column: 69
                    }
                  }
                }
              ],
              start: 25,
              end: 71,
              loc: {
                start: {
                  line: 1,
                  column: 25
                },
                end: {
                  line: 1,
                  column: 71
                }
              }
            },
            start: 0,
            end: 71,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 71
              }
            }
          }
        ],
        start: 0,
        end: 71,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 71
          }
        }
      }
    ],
    [
      `/[a-z]/?.test('a')`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Literal',
                  value: /[a-z]/,
                  regex: {
                    pattern: '[a-z]',
                    flags: ''
                  },
                  start: 0,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'test',
                  start: 9,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              },
              arguments: [
                {
                  type: 'Literal',
                  value: 'a',
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
              optional: false,
              shortCircuited: true,
              start: 0,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            start: 0,
            end: 18,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 18
              }
            }
          }
        ],
        start: 0,
        end: 18,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 18
          }
        }
      }
    ],
    [
      `obj?.aaa()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
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
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 5,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
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
              arguments: [],
              optional: false,
              shortCircuited: true,
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
      `(obj?.aaa)?.()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 6,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              arguments: [],
              optional: true,
              shortCircuited: false,
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
      `(obj?.aaa)()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 1,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'aaa',
                  start: 6,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                },
                optional: true,
                shortCircuited: false,
                start: 1,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 9
                  }
                }
              },
              arguments: [],
              optional: false,
              shortCircuited: false,
              start: 0,
              end: 12,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 12
                }
              }
            },
            start: 0,
            end: 12,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 12
              }
            }
          }
        ],
        start: 0,
        end: 12,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 12
          }
        }
      }
    ],
    [
      `delete obj?.foo`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'UnaryExpression',
              operator: 'delete',
              argument: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 7,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'foo',
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
                optional: true,
                shortCircuited: false,
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
                }
              },
              prefix: true,
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
            },
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
      `new (obj?.foo)()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'NewExpression',
              callee: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'obj',
                  start: 5,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                computed: false,
                property: {
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
                optional: true,
                shortCircuited: false,
                start: 5,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 13
                  }
                }
              },
              arguments: [],
              start: 0,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            },
            start: 0,
            end: 16,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 16
              }
            }
          }
        ],
        start: 0,
        end: 16,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 16
          }
        }
      }
    ],
    [
      `obj ?. ()`,
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'obj',
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
              arguments: [],
              optional: true,
              shortCircuited: false,
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
          }
        ],
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

/*
 */
