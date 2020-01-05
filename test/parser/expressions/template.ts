import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Template', () => {
  for (const [source, ctx] of [
    ['`', Context.Empty],
    ['x = `1 ${ yield } 2`', Context.Strict],
    ['[`${""}`] = {}', Context.Empty],
    ['`\\7`', Context.Empty],
    ['`\\001`', Context.Empty],
    ['\\xg', Context.Empty],
    // ['`a${await foo}d`', Context.Empty],
    ['`\\u11${', Context.Empty],
    ['`\\u{110000}${', Context.Empty],
    ['`\\u{11ffff}${', Context.Empty],
    ['`a\\00b`', Context.Empty],
    ['`${x} \\xg ${x}`;', Context.Empty],
    ['`${a}a${b}b${c}c', Context.Empty],
    ['`foo\n\nbar\r\nbaz', Context.Empty],
    ['`foo${a \n`', Context.Empty],
    ['`foo${a \r\n`', Context.Empty],
    ['`foo${a \r`', Context.Empty],
    ['`foo${/* comment */ a`', Context.Empty],
    ['`foo${// commenta}`', Context.Empty],
    ['`foo${\n a`', Context.Empty],
    ['`foo${\r\n a`', Context.Empty],
    ['`foo${\r a`', Context.Empty],
    ['`foo${fn(}`', Context.Empty],
    ['`hello\\x`', Context.Empty],
    ['`hello\\x${1}`', Context.Empty],
    ['`hello${1}\\x`', Context.Empty],
    ['`hello${1}\\x${2}`', Context.Empty],
    ['`hello\\x\n`', Context.Empty],
    ['`hello\\x\n${1}`', Context.Empty],
    ['`\\08`', Context.Empty],
    ['`\\01`', Context.Empty],
    ['`\\01${0}right`', Context.Empty],
    ['`left${0}\\01`', Context.Empty],
    ['`left${0}\\01${1}right`', Context.Empty],
    ['`\\1`', Context.Empty],
    ['`\\1${0}right`', Context.Empty],
    ['`left${0}\\1`', Context.Empty],
    ['`left${0}\\1${1}right`', Context.Empty],
    ['`\\xg`', Context.Empty],
    ['`\\xg${0}right`', Context.Empty],
    ['`left${0}\\xg`', Context.Empty],
    ['`left${0}\\xg${1}right`', Context.Empty],
    ['`\\xAg`', Context.Empty],
    ['`\\xAg${0}right`', Context.Empty],
    ['`left${0}\\xAg`', Context.Empty],
    ['`left${0}\\xAg${1}right`', Context.Empty],
    //['`\\u0`', Context.Empty],
    ['`\\u0${0}right`', Context.Empty],
    ['`left${0}\\u0`', Context.Empty],
    ['`left${0}\\u0${1}right`', Context.Empty],
    ['`\\u0g`', Context.Empty],
    ['`\\u0g${0}right`', Context.Empty],
    ['`left${0}\\u0g`', Context.Empty],
    ['`left${0}\\u0g${1}right`', Context.Empty],
    ['`\\u00g`', Context.Empty],
    ['`\\u00g${0}right`', Context.Empty],
    ['`left${0}\\u00g`', Context.Empty],
    ['`left${0}\\u00g${1}right`', Context.Empty],
    ['`\\u00g`', Context.Strict | Context.Module],
    ['`\\u00g${0}right`', Context.Strict | Context.Module],
    ['`left${0}\\u00g`', Context.Strict | Context.Module],
    ['`left${0}\\u00g${1}right`', Context.Strict | Context.Module],
    ['`\\u000g`', Context.Empty],
    ['`\\u000g${0}right`', Context.Empty],
    ['`left${0}\\u000g`', Context.Empty],
    ['`left${0}\\u000g${1}right`', Context.Empty],
    ['`\\u{}`', Context.Empty],
    ['`\\u{}${0}right`', Context.Empty],
    ['`left${0}\\u{}`', Context.Empty],
    ['`left${0}\\u{}${1}right`', Context.Empty],
    ['`\\u{-0}`', Context.Empty],
    ['`\\u{-0}${0}right`', Context.Empty],
    ['`left${0}\\u{-0}`', Context.Empty],
    ['`left${0}\\u{-0}${1}right`', Context.Empty],
    ['`\\u{g}`', Context.Empty],
    ['`\\u{g}${0}right`', Context.Empty],
    ['`left${0}\\u{g}`', Context.Empty],
    ['`left${0}\\u{g}${1}right`', Context.Empty],
    ['`\\u{0`', Context.Empty],
    ['`\\u{0${0}right`', Context.Empty],
    ['`left${0}\\u{0`', Context.Empty],
    ['`left${0}\\u{0${1}right`', Context.Empty],
    ['`\\u{\\u{0}`', Context.Empty],
    ['`\\u{\\u{0}${0}right`', Context.Empty],
    ['`left${0}\\u{\\u{0}`', Context.Empty],
    ['`left${0}\\u{\\u{0}${1}right`', Context.Empty],
    ['`\\u{110000}`', Context.Empty],
    ['`left${0}\\u{\\u{0}${1}right`', Context.Strict | Context.Module],
    ['`\\u{110000}`', Context.Strict | Context.Module],
    ['`\\u{110000}${0}right`', Context.Empty],
    ['`left${0}\\u{110000}`', Context.Empty],
    ['`\\u{110000}`', Context.Empty],
    ['`\\u{110000}${0}right`', Context.Empty],
    ['`left${0}\\u{110000}`', Context.Empty],
    ['`left${0}\\u{110000}${1}right`', Context.Empty],
    ['`${yield}`', Context.Strict],
    ['`a\\00b`', Context.Empty],
    ['`\\00`', Context.Empty],
    ['`\\1``\\2`', Context.Empty],
    ['`\\unicode`', Context.Empty],
    ['`\\u`', Context.Empty],
    ['`\\u{`', Context.Empty],
    ['`\\u{abcdx`', Context.Empty],
    ['`\\u{abcdx}`', Context.Empty],
    ['`\\xylophone`', Context.Empty],

    ['`\\1``\\2`', Context.Empty]
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

  for (const arg of [
    '`a\u2028b`',
    '`a\u2029`',
    '"a\u2029"',
    '"a\u2029b"',
    '`a\n`',
    '`a\r`',
    '`a\n\r`',
    '`a\r\n`',
    '`a\n\rb`',
    '`a\r\nb`',
    'foo`foo${bar}\\unicode`',
    // 'foo`\\u`',
    // 'foo`\\u{`',
    'foo`\\u{abcdx`',
    'foo`\\u{abcdx}`',
    'foo`\\unicode\\\\`',
    '`foo\n\nbar\r\nbaz`',
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    '`foo${a // comment\n}`',
    '`foo${a \n}`',
    '`foo${a \r\n}`',
    '`foo${a \r}`',
    '`foo${/* comment */ a}`',
    '`foo${// comment\na}`',
    '`foo${\n a}`',
    '`foo${\r\n a}`',
    '`foo${\r a}`',
    "`foo${'a' in a}`",
    'tag\n`${a}${b}${c}`',
    'tag\r\n`a${a}b${b}c${c}`',
    'tag`\\u{}${0}right`',
    'tag`left${0}\\u{}`',
    'tag`left${0}\\u{}${1}right`',
    'tag`\\u{-0}`',
    'tag`\\u{-0}${0}right`',
    'tag`left${0}\\u{-0}`',
    `a\`a\${b}a\${c}\``,
    `a\`\${\`a\${a}\`}\``,
    `a\`\${\`\${\`\${a}\`}\`}\``,
    `a\`$a\``,
    'tag`\\xg`',
    'x`\\0`',
    'x`\\08`',
    'x`\\0\\0`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'x`\\r\n${0}`',
    'x`\\\r\\n${0}`',
    'f`${x} \\xg ${x}`;',
    'x`\\\u2028${0}`',
    '`a℮`',
    '`دیوانه`',
    '`℘`',
    '`\n\r`',
    '`\r\n`',
    '`$$$a}`',
    'tag`\\1`',
    'tag ``',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    '`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`',
    '`\n\r\n\r`',
    'foo`\n${0}`',
    'foo`\\\n${0}`',
    'foo`\\r${0}`',
    'foo`\r\n${0}`',
    'foo`\\\r\\\n${0}`',
    'foo`\\\r\n${0}`',
    'foo`\r\\\n${0}`',
    'foo`\\r\\n${0}`',
    'foo`\u2029${0}`',
    'foo`\\\u2029${0}`',
    'foo`\\n${0}`',
    'foo`\\r${0}`',
    'foo`\\\r\\\n${0}`',
    'foo`\r\\n${0}`',
    'foo`\\\u2029${0}`',
    '`\r\n\t\n`',
    'function z() {}; `z`;',
    'function z() {}; `${z}`;',
    'function z() {}; `${z}${z}`;',
    'function z() {}; `${z}${z}${z}`;',
    "function z() {}; `${'z'}${z}${z}`;",
    "function z() {}; `${'z'}${'z'}${z}`;",
    "function z() {}; `${'z'}${'z'}${async}`;",
    "function z() {}; '' + z + '';",
    'function z() {}; z`${`${z}`}`;',
    'function z() {}; z``;',
    'function z() {}; ``;',
    '(`${function(id) { return id }}`);',
    "function y() {} y`${`${'z'}${`${function(id) { return id }})${ /x/g >= 'c'}`}`}`;",
    'bar = bar`wow\naB${ 42 } ${_.baz()}`',
    'bar`wow\na${ 42 }b ${_.foobar()}`',
    ' bar`wow\naB${ 42 } ${_.baz()}`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'tag`\\u{\\u{0}${0}right`',
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    'tag`foo${a // comment\n}`',
    'x`\0${0}`',
    'x`\\\0${0}`',
    'x`\\r${0}`',
    'x`\\\r\\\n${0}`',
    'x`\\\r\n${0}`',
    'x`\r\\\n${0}`',
    'x`\\r\\n${0}`',
    'x`\\r\n${0}`',
    'x`\r\\n${0}`',
    'x`\\\r\\n${0}`',
    'x`\\\u2028${0}`',
    'x`\u2029${0}`',
    'x`\\\u2029${0}`',
    'test`\\uG`;',
    'test`\\xG`;',
    'test`\\18`;',
    '(`\n`)',
    '(`\r`)',
    'new nestedNewOperatorFunction`1``2``3``array`',
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`',
    // 'tag`\\u0`',
    'tag`\\u0${0}right`',
    'tag `no-subst-template`',
    '`foo\\u25a0`',
    '`${a}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    '`foo\n\nbar\r\nbaz`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\r\n a}`',
    'tag`foo${\r a}`',
    '`foo${bar}\\u25a0`'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseScript(`${arg}`, {
          disableWebCompat: false
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      'tag`\\01`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\01'
                    },
                    tail: true,
                    start: 3,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  }
                ],
                start: 3,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
    [
      'tag`left${0}\\01${1}right`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
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
                  {
                    type: 'Literal',
                    value: 1,
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'left',
                      raw: 'left'
                    },
                    tail: false,
                    start: 3,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\01'
                    },
                    tail: false,
                    start: 11,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'right',
                      raw: 'right'
                    },
                    tail: true,
                    start: 18,
                    end: 18,
                    loc: {
                      start: {
                        line: 1,
                        column: 18
                      },
                      end: {
                        line: 1,
                        column: 18
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
      'tag`\\u{}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\u{}'
                    },
                    tail: true,
                    start: 3,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
                start: 3,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
      '{`foo ${a} and ${b} and ${c} baz`}',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a',
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
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false,
                      start: 1,
                      end: 1,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 1
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false,
                      start: 9,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 9
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' and ',
                        raw: ' and '
                      },
                      tail: false,
                      start: 18,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true,
                      start: 27,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 27
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    }
                  ],
                  start: 1,
                  end: 33,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 33
                    }
                  }
                },
                start: 1,
                end: 33,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 33
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
      '`${function(){}}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'FunctionExpression',
                  params: [],
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
                  async: false,
                  generator: false,
                  id: null,
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 15,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 15
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
      '`a ${function(){}} b`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'FunctionExpression',
                  params: [],
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
                  async: false,
                  generator: false,
                  id: null,
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true,
                  start: 17,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 17
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
      '`foo${{a,b} = x}baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
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
                        value: {
                          type: 'Identifier',
                          name: 'a',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b',
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
                        value: {
                          type: 'Identifier',
                          name: 'b',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'x',
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true,
                  start: 15,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 15
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
      '`foo${{a,b}}baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ObjectExpression',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
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
                      value: {
                        type: 'Identifier',
                        name: 'a',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'b',
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
                      value: {
                        type: 'Identifier',
                        name: 'b',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true,
                  start: 11,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 11
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
      '`{`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '{',
                    raw: '{'
                  },
                  tail: true,
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
                }
              ],
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
          }
        ],
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
      }
    ],
    [
      '`foo${`foo${bar}baz`}baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'bar',
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
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo',
                        raw: 'foo'
                      },
                      tail: false,
                      start: 6,
                      end: 6,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 6
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'baz',
                        raw: 'baz'
                      },
                      tail: true,
                      start: 15,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 15
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      }
                    }
                  ],
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true,
                  start: 20,
                  end: 20,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 20
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
      '`foo`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: true,
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
                }
              ],
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
          }
        ],
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
      }
    ],
    [
      '`${y,0}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'SequenceExpression',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'y',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    },
                    {
                      type: 'Literal',
                      value: 0,
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
                    }
                  ],
                  start: 3,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 6,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 6
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
    [
      'for(`${x in y}`;;);',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement',
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
            init: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'BinaryExpression',
                  left: {
                    type: 'Identifier',
                    name: 'x',
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
                  right: {
                    type: 'Identifier',
                    name: 'y',
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
                  operator: 'in',
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 4,
                  end: 4,
                  loc: {
                    start: {
                      line: 1,
                      column: 4
                    },
                    end: {
                      line: 1,
                      column: 4
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 13,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 13
                    }
                  }
                }
              ],
              start: 4,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            },
            test: null,
            update: null,
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
      '`${{}}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ObjectExpression',
                  properties: [],
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 5,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
                    },
                    end: {
                      line: 1,
                      column: 5
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
      }
    ],
    [
      '`${x => x}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    }
                  ],
                  async: false,
                  expression: true,
                  start: 3,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 9,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 9
                    }
                  }
                }
              ],
              start: 0,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            start: 0,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 11
              }
            }
          }
        ],
        start: 0,
        end: 11,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      }
    ],
    [
      '`${x => {}}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 8,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    }
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    }
                  ],
                  async: false,
                  expression: false,
                  start: 3,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 10,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 10
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
      '`\\@{x2028}@`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '@{x2028}@',
                    raw: '\\@{x2028}@'
                  },
                  tail: true,
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
      'foo`x${a}y${b}z`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                  {
                    type: 'Identifier',
                    name: 'b',
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'x',
                      raw: 'x'
                    },
                    tail: false,
                    start: 3,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'y',
                      raw: 'y'
                    },
                    tail: false,
                    start: 8,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'z',
                      raw: 'z'
                    },
                    tail: true,
                    start: 13,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 13
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
      'y`${y,0}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'y',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'SequenceExpression',
                    expressions: [
                      {
                        type: 'Identifier',
                        name: 'y',
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
                      {
                        type: 'Literal',
                        value: 0,
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
                      }
                    ],
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
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: false,
                    start: 1,
                    end: 1,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 1
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
                    start: 7,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 7
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
      'for(t`${x in y}`;;);',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement',
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
            init: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 't',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    operator: 'in',
                    start: 8,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: false,
                    start: 5,
                    end: 5,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 5
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
                    start: 14,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
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
            test: null,
            update: null,
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
      'a.foo`bar`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
                  name: 'foo',
                  start: 2,
                  end: 5,
                  loc: {
                    start: {
                      line: 1,
                      column: 2
                    },
                    end: {
                      line: 1,
                      column: 5
                    }
                  }
                },

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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'bar',
                      raw: 'bar'
                    },
                    tail: true,
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
      'new foo`bar`',
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
                type: 'TaggedTemplateExpression',
                tag: {
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
                quasi: {
                  type: 'TemplateLiteral',
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'bar',
                        raw: 'bar'
                      },
                      tail: true,
                      start: 7,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 7
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      }
                    }
                  ],
                  start: 7,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                start: 4,
                end: 12,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 12
                  }
                }
              },
              arguments: [],
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
      'tag`\\abc3242`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'abc3242',
                      raw: '\\abc3242'
                    },
                    tail: true,
                    start: 3,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 13
                      }
                    }
                  }
                ],
                start: 3,
                end: 13,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
      'tag`xy \\u{abc}} yz`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'xy ઼} yz',
                      raw: 'xy \\u{abc}} yz'
                    },
                    tail: true,
                    start: 3,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  }
                ],
                start: 3,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 19
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
      '`\r\n`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 4,
            expression: {
              end: 4,
              expressions: [],
              loc: {
                end: {
                  column: 2,
                  line: 3
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 4,
                  loc: {
                    end: {
                      column: 2,
                      line: 3
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  start: 0,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: '\r\n',
                    raw: '\r\n'
                  }
                }
              ],
              start: 0,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 2,
                line: 3
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
        end: 4,
        loc: {
          end: {
            column: 2,
            line: 3
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
      '`${"z"}${"z"}${z}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Literal',
                  value: 'z',
                  start: 3,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: 'z',
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
                {
                  type: 'Identifier',
                  name: 'z',
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 6,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 12,
                  end: 12,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 12
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 16,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 16
                    },
                    end: {
                      line: 1,
                      column: 16
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
      'let foo = f()`template with function call before`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'VariableDeclaration',
            kind: 'let',
            declarations: [
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'TaggedTemplateExpression',
                  tag: {
                    type: 'CallExpression',
                    callee: {
                      type: 'Identifier',
                      name: 'f',
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
                    arguments: [],

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
                  quasi: {
                    type: 'TemplateLiteral',
                    expressions: [],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'template with function call before',
                          raw: 'template with function call before'
                        },
                        tail: true,
                        start: 13,
                        end: 49,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
                          },
                          end: {
                            line: 1,
                            column: 49
                          }
                        }
                      }
                    ],
                    start: 13,
                    end: 49,
                    loc: {
                      start: {
                        line: 1,
                        column: 13
                      },
                      end: {
                        line: 1,
                        column: 49
                      }
                    }
                  },
                  start: 10,
                  end: 49,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 49
                    }
                  }
                },
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
                end: 49,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 49
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
      'a``',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
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
                  }
                ],
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
          }
        ],
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
      }
    ],
    [
      'var foo = `simple template`;',
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
                  type: 'TemplateLiteral',
                  expressions: [],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'simple template',
                        raw: 'simple template'
                      },
                      tail: true,
                      start: 10,
                      end: 27,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 27
                        }
                      }
                    }
                  ],
                  start: 10,
                  end: 27,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 27
                    }
                  }
                },
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
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 27
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
      '`foo${/* comment */ a}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a',
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 21,
                  end: 21,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 21
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
            },
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
      '`foo${// comment\na}`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 20,
            expression: {
              end: 20,
              expressions: [
                {
                  end: 18,
                  loc: {
                    end: {
                      column: 1,
                      line: 2
                    },
                    start: {
                      column: 0,
                      line: 2
                    }
                  },
                  name: 'a',
                  start: 17,
                  type: 'Identifier'
                }
              ],
              loc: {
                end: {
                  column: 3,
                  line: 2
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 0,
                  loc: {
                    end: {
                      column: 0,
                      line: 1
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  start: 0,
                  tail: false,
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  }
                },
                {
                  end: 18,
                  loc: {
                    end: {
                      column: 1,
                      line: 2
                    },
                    start: {
                      column: 1,
                      line: 2
                    }
                  },
                  start: 18,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  }
                }
              ],
              start: 0,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 3,
                line: 2
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
        end: 20,
        loc: {
          end: {
            column: 3,
            line: 2
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
      'f`\\xg ${x}`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'f',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\xg '
                    },
                    tail: false,
                    start: 1,
                    end: 1,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 1
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
                    start: 9,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
                start: 0,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              start: 0,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 11
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
      'var str = x`y${(() => 42)()}`;',
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
                  type: 'TaggedTemplateExpression',
                  tag: {
                    type: 'Identifier',
                    name: 'x',
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
                  quasi: {
                    type: 'TemplateLiteral',
                    expressions: [
                      {
                        type: 'CallExpression',
                        callee: {
                          type: 'ArrowFunctionExpression',
                          body: {
                            type: 'Literal',
                            value: 42,
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
                          params: [],
                          async: false,
                          expression: true,
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
                        arguments: [],

                        start: 15,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 15
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      }
                    ],
                    quasis: [
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: 'y',
                          raw: 'y'
                        },
                        tail: false,
                        start: 11,
                        end: 11,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 11
                          }
                        }
                      },
                      {
                        type: 'TemplateElement',
                        value: {
                          cooked: '',
                          raw: ''
                        },
                        tail: true,
                        start: 27,
                        end: 27,
                        loc: {
                          start: {
                            line: 1,
                            column: 27
                          },
                          end: {
                            line: 1,
                            column: 27
                          }
                        }
                      }
                    ],
                    start: 10,
                    end: 29,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 29
                      }
                    }
                  },
                  start: 10,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                id: {
                  type: 'Identifier',
                  name: 'str',
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
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 29
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
      '`a\\u{000000062}c`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'abc',
                    raw: 'a\\u{000000062}c'
                  },
                  tail: true,
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
      'test`\\xG`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'test',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\xG'
                    },
                    tail: true,
                    start: 4,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
                start: 4,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      'x`$ $ $ {} } { }} {{`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '$ $ $ {} } { }} {{',
                      raw: '$ $ $ {} } { }} {{'
                    },
                    tail: true,
                    start: 1,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  }
                ],
                start: 1,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 21
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
      '(`\n`)',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 5,
            expression: {
              end: 4,
              expressions: [],
              loc: {
                end: {
                  column: 2,
                  line: 2
                },
                start: {
                  column: 1,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 4,
                  loc: {
                    end: {
                      column: 2,
                      line: 2
                    },
                    start: {
                      column: 1,
                      line: 1
                    }
                  },
                  start: 1,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: '\n',
                    raw: '\n'
                  }
                }
              ],
              start: 1,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 3,
                line: 2
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
        end: 5,
        loc: {
          end: {
            column: 3,
            line: 2
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
      'x`bunch of escape chars \\v\\t\\n\\b\\a`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'bunch of escape chars \u000b\t\n\ba',
                      raw: 'bunch of escape chars \\v\\t\\n\\b\\a'
                    },
                    tail: true,
                    start: 1,
                    end: 35,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 35
                      }
                    }
                  }
                ],
                start: 1,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 35
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
      'tag`left${0}\\u{0${1}right`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
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
                  {
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'left',
                      raw: 'left'
                    },
                    tail: false,
                    start: 3,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\u{0'
                    },
                    tail: false,
                    start: 11,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'right',
                      raw: 'right'
                    },
                    tail: true,
                    start: 19,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 19
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
      'tag`\\u{110000}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\u{110000}'
                    },
                    tail: true,
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
                  }
                ],
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
      'tag    `${a}a${b}b${c}c`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
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
                  {
                    type: 'Identifier',
                    name: 'b',
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
                    name: 'c',
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: false,
                    start: 7,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'a',
                      raw: 'a'
                    },
                    tail: false,
                    start: 11,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'b',
                      raw: 'b'
                    },
                    tail: false,
                    start: 16,
                    end: 16,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 16
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'c',
                      raw: 'c'
                    },
                    tail: true,
                    start: 21,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 21
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
              },
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
            },
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
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    // ['foo`H\\x45Y`', Context.OptionsLoc, {}],
    [
      'foo`H\\x45Y`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'HEY',
                      raw: 'H\\x45Y'
                    },
                    tail: true,
                    start: 3,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  }
                ],
                start: 3,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 3
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              start: 0,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            start: 0,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 11
              }
            }
          }
        ],
        start: 0,
        end: 11,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      }
    ],
    [
      'tag`phew \\u{110001}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: 'phew \\u{110001}'
                    },
                    tail: true,
                    start: 3,
                    end: 20,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 20
                      }
                    }
                  }
                ],
                start: 3,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
      'tag`start \\0737 \\xaa \\u{abc} \\0 finish`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: 'start \\0737 \\xaa \\u{abc} \\0 finish'
                    },
                    tail: true,
                    start: 3,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 3,
                end: 39,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
            },
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
      'tag`\\00`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\00'
                    },
                    tail: true,
                    start: 3,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  }
                ],
                start: 3,
                end: 8,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
    [
      'tag`a\\0b`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'tag',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: 'a\u0000b',
                      raw: 'a\\0b'
                    },
                    tail: true,
                    start: 3,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 3
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
                start: 3,
                end: 9,
                loc: {
                  start: {
                    line: 1,
                    column: 3
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
      '`some " quote`;',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 15,
            expression: {
              end: 14,
              expressions: [],
              loc: {
                end: {
                  column: 14,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 14,
                  loc: {
                    end: {
                      column: 14,
                      line: 1
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  start: 0,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: 'some " quote',
                    raw: 'some " quote'
                  }
                }
              ],
              start: 0,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 15,
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
        end: 15,
        loc: {
          end: {
            column: 15,
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
      '`some \\` quote`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'some ` quote',
                    raw: 'some \\` quote'
                  },
                  tail: true,
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
      '`\\abc3242`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'abc3242',
                    raw: '\\abc3242'
                  },
                  tail: true,
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
            },
            start: 0,
            end: 11,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 11
              }
            }
          }
        ],
        start: 0,
        end: 11,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 11
          }
        }
      }
    ],
    [
      '`x \\u0070 y`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'x p y',
                    raw: 'x \\u0070 y'
                  },
                  tail: true,
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
      '`x ${x} \\u0070 ${x} y`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'x ',
                    raw: 'x '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' p ',
                    raw: ' \\u0070 '
                  },
                  tail: false,
                  start: 6,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 6
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' y',
                    raw: ' y'
                  },
                  tail: true,
                  start: 18,
                  end: 18,
                  loc: {
                    start: {
                      line: 1,
                      column: 18
                    },
                    end: {
                      line: 1,
                      column: 18
                    }
                  }
                }
              ],
              start: 0,
              end: 22,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 22
                }
              }
            },
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
      '`x \\u0070 ${x} y`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'x p ',
                    raw: 'x \\u0070 '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' y',
                    raw: ' y'
                  },
                  tail: true,
                  start: 13,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 13
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
      'function *f(){   x = `1 ${ yield } 2 ${ 3 } 4`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
                          start: 27,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        {
                          type: 'Literal',
                          value: 3,
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
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false,
                          start: 33,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 33
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true,
                          start: 42,
                          end: 41,
                          loc: {
                            start: {
                              line: 1,
                              column: 42
                            },
                            end: {
                              line: 1,
                              column: 41
                            }
                          }
                        }
                      ],
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
                    },
                    start: 17,
                    end: 46,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 46
                      }
                    }
                  },
                  start: 17,
                  end: 46,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 46
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                          delegate: false,
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
                        {
                          type: 'Literal',
                          value: 3,
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
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false,
                          start: 35,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true,
                          start: 44,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    start: 17,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  start: 17,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 48
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      '{`foo ${a} baz`}',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a',
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
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false,
                      start: 1,
                      end: 1,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 1
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true,
                      start: 9,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 9
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
      '`template\
      `',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 16,
            expression: {
              end: 16,
              expressions: [],
              loc: {
                end: {
                  column: 16,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 16,
                  loc: {
                    end: {
                      column: 16,
                      line: 1
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  start: 0,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: 'template      ',
                    raw: 'template      '
                  }
                }
              ],
              start: 0,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 16,
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
        end: 16,
        loc: {
          end: {
            column: 16,
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
      'for(t`${x in y}`;;);',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement',
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
            init: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 't',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'y',
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
                    operator: 'in',
                    start: 8,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 14
                      }
                    }
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: false,
                    start: 5,
                    end: 5,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 5
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
                    start: 14,
                    end: 14,
                    loc: {
                      start: {
                        line: 1,
                        column: 14
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
            test: null,
            update: null,
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
    //['a.foo`bar`', Context.OptionsLoc, {}],
    [
      'tag`okay \\u{110001}`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 20,
            expression: {
              end: 20,
              loc: {
                end: {
                  column: 20,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasi: {
                end: 20,
                expressions: [],
                loc: {
                  end: {
                    column: 20,
                    line: 1
                  },
                  start: {
                    column: 3,
                    line: 1
                  }
                },
                quasis: [
                  {
                    end: 20,
                    loc: {
                      end: {
                        column: 20,
                        line: 1
                      },
                      start: {
                        column: 3,
                        line: 1
                      }
                    },
                    start: 3,
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: 'okay \\u{110001}'
                    }
                  }
                ],
                start: 3,
                type: 'TemplateLiteral'
              },
              start: 0,
              tag: {
                end: 3,
                loc: {
                  end: {
                    column: 3,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                name: 'tag',
                start: 0,
                type: 'Identifier'
              },
              type: 'TaggedTemplateExpression'
            },
            loc: {
              end: {
                column: 20,
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
        end: 20,
        loc: {
          end: {
            column: 20,
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
      'tag`\\00`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 8,
            expression: {
              end: 8,
              loc: {
                end: {
                  column: 8,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasi: {
                end: 8,
                expressions: [],
                loc: {
                  end: {
                    column: 8,
                    line: 1
                  },
                  start: {
                    column: 3,
                    line: 1
                  }
                },
                quasis: [
                  {
                    end: 8,
                    loc: {
                      end: {
                        column: 8,
                        line: 1
                      },
                      start: {
                        column: 3,
                        line: 1
                      }
                    },
                    start: 3,
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\00'
                    }
                  }
                ],
                start: 3,
                type: 'TemplateLiteral'
              },
              start: 0,
              tag: {
                end: 3,
                loc: {
                  end: {
                    column: 3,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                name: 'tag',
                start: 0,
                type: 'Identifier'
              },
              type: 'TaggedTemplateExpression'
            },
            loc: {
              end: {
                column: 8,
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
        end: 8,
        loc: {
          end: {
            column: 8,
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
      '`${x => {}}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [],
                    start: 8,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    }
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'x',
                      start: 3,
                      end: 4,
                      loc: {
                        start: {
                          line: 1,
                          column: 3
                        },
                        end: {
                          line: 1,
                          column: 4
                        }
                      }
                    }
                  ],
                  async: false,
                  expression: false,
                  start: 3,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 3
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 10,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 10
                    },
                    end: {
                      line: 1,
                      column: 10
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
      '{`foo ${a} baz`}',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'TemplateLiteral',
                  expressions: [
                    {
                      type: 'Identifier',
                      name: 'a',
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
                    }
                  ],
                  quasis: [
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: 'foo ',
                        raw: 'foo '
                      },
                      tail: false,
                      start: 1,
                      end: 1,
                      loc: {
                        start: {
                          line: 1,
                          column: 1
                        },
                        end: {
                          line: 1,
                          column: 1
                        }
                      }
                    },
                    {
                      type: 'TemplateElement',
                      value: {
                        cooked: ' baz',
                        raw: ' baz'
                      },
                      tail: true,
                      start: 9,
                      end: 9,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 9
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
      '`${function(){}}`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'FunctionExpression',
                  params: [],
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
                  async: false,
                  generator: false,
                  id: null,
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '',
                    raw: ''
                  },
                  tail: true,
                  start: 15,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 15
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
      '`foo${{a,b} = x}baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
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
                        value: {
                          type: 'Identifier',
                          name: 'a',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'b',
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
                        value: {
                          type: 'Identifier',
                          name: 'b',
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
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
                  },
                  operator: '=',
                  right: {
                    type: 'Identifier',
                    name: 'x',
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true,
                  start: 15,
                  end: 15,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 15
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
      '`{`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: '{',
                    raw: '{'
                  },
                  tail: true,
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
                }
              ],
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
          }
        ],
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
      }
    ],
    [
      '`foo ${a} and ${b} and ${c} baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'a',
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
                {
                  type: 'Identifier',
                  name: 'b',
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
                  type: 'Identifier',
                  name: 'c',
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
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo ',
                    raw: 'foo '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' and ',
                    raw: ' and '
                  },
                  tail: false,
                  start: 8,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' and ',
                    raw: ' and '
                  },
                  tail: false,
                  start: 17,
                  end: 17,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 17
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' baz',
                    raw: ' baz'
                  },
                  tail: true,
                  start: 26,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 26
                    },
                    end: {
                      line: 1,
                      column: 26
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
      '`\n`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 3,
            expression: {
              end: 3,
              expressions: [],
              loc: {
                end: {
                  column: 2,
                  line: 2
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasis: [
                {
                  end: 3,
                  loc: {
                    end: {
                      column: 2,
                      line: 2
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  start: 0,
                  tail: true,
                  type: 'TemplateElement',
                  value: {
                    cooked: '\n',
                    raw: '\n'
                  }
                }
              ],
              start: 0,
              type: 'TemplateLiteral'
            },
            loc: {
              end: {
                column: 2,
                line: 2
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
        end: 3,
        loc: {
          end: {
            column: 2,
            line: 2
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
      '`a ${()=>{}} b`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [],
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
                  params: [],
                  async: false,
                  expression: false,
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true,
                  start: 11,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 11
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
      'function *f(){   x = `1 ${ yield x } 2`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                          delegate: false,
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
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2',
                            raw: ' 2'
                          },
                          tail: true,
                          start: 35,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        }
                      ],
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
                    },
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
                }
              ],
              start: 13,
              end: 43,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 43
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
            start: 0,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 43
              }
            }
          }
        ],
        start: 0,
        end: 43,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 43
          }
        }
      }
    ],
    [
      'function *f(){   x = `1 ${ yield } 2`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: null,
                          delegate: false,
                          start: 27,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 27
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        }
                      ],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2',
                            raw: ' 2'
                          },
                          tail: true,
                          start: 33,
                          end: 32,
                          loc: {
                            start: {
                              line: 1,
                              column: 33
                            },
                            end: {
                              line: 1,
                              column: 32
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 37,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 37
                        }
                      }
                    },
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
                }
              ],
              start: 13,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 13
                },
                end: {
                  line: 1,
                  column: 41
                }
              }
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                          delegate: false,
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
                        {
                          type: 'Literal',
                          value: 3,
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
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false,
                          start: 35,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true,
                          start: 44,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    start: 17,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  start: 17,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 48
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      'f`\\xg`;',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 7,
            expression: {
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
              quasi: {
                end: 6,
                expressions: [],
                loc: {
                  end: {
                    column: 6,
                    line: 1
                  },
                  start: {
                    column: 1,
                    line: 1
                  }
                },
                quasis: [
                  {
                    end: 6,
                    loc: {
                      end: {
                        column: 6,
                        line: 1
                      },
                      start: {
                        column: 1,
                        line: 1
                      }
                    },
                    start: 1,
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\xg'
                    }
                  }
                ],
                start: 1,
                type: 'TemplateLiteral'
              },
              start: 0,
              tag: {
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
                name: 'f',
                start: 0,
                type: 'Identifier'
              },
              type: 'TaggedTemplateExpression'
            },
            loc: {
              end: {
                column: 7,
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
        end: 7,
        loc: {
          end: {
            column: 7,
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
      'f`\\xg ${x}`;',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TaggedTemplateExpression',
              tag: {
                type: 'Identifier',
                name: 'f',
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
              quasi: {
                type: 'TemplateLiteral',
                expressions: [
                  {
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: null,
                      raw: '\\xg '
                    },
                    tail: false,
                    start: 1,
                    end: 1,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 1
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '',
                      raw: ''
                    },
                    tail: true,
                    start: 9,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 9
                      },
                      end: {
                        line: 1,
                        column: 9
                      }
                    }
                  }
                ],
                start: 0,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 0
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
              start: 0,
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 0
                },
                end: {
                  line: 1,
                  column: 11
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
    // ['for(t`${x in y}`;;);', Context.OptionsLoc, {}],

    [
      'let o, {x} = of = 2e308.break',
      Context.OptionsLoc | Context.Strict,
      {
        type: 'Program',
        sourceType: 'script',
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
                  name: 'o',
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
              {
                type: 'VariableDeclarator',
                init: {
                  type: 'AssignmentExpression',
                  left: {
                    type: 'Identifier',
                    name: 'of',
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
                  operator: '=',
                  right: {
                    type: 'MemberExpression',

                    object: {
                      type: 'Literal',
                      value: Infinity,
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
                    computed: false,
                    property: {
                      type: 'Identifier',
                      name: 'break',
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
                  },
                  start: 13,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 29
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
                      value: {
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    }
                  ],
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
                start: 7,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 7
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
      '`a ${(k)=>{x}} b`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'ExpressionStatement',
                        expression: {
                          type: 'Identifier',
                          name: 'x',
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'k',
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
                    }
                  ],
                  async: false,
                  expression: false,
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'a ',
                    raw: 'a '
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: ' b',
                    raw: ' b'
                  },
                  tail: true,
                  start: 13,
                  end: 13,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 13
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
      'x = `1 ${ yield } 2 ${ 3 } 4`',
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
              operator: '=',
              right: {
                type: 'TemplateLiteral',
                expressions: [
                  {
                    type: 'Identifier',
                    name: 'yield',
                    start: 10,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 10
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    }
                  },
                  {
                    type: 'Literal',
                    value: 3,
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
                  }
                ],
                quasis: [
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: '1 ',
                      raw: '1 '
                    },
                    tail: false,
                    start: 4,
                    end: 3,
                    loc: {
                      start: {
                        line: 1,
                        column: 4
                      },
                      end: {
                        line: 1,
                        column: 3
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: ' 2 ',
                      raw: ' 2 '
                    },
                    tail: false,
                    start: 16,
                    end: 15,
                    loc: {
                      start: {
                        line: 1,
                        column: 16
                      },
                      end: {
                        line: 1,
                        column: 15
                      }
                    }
                  },
                  {
                    type: 'TemplateElement',
                    value: {
                      cooked: ' 4',
                      raw: ' 4'
                    },
                    tail: true,
                    start: 25,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 25
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  }
                ],
                start: 4,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
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
            },
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
      '`foo${bar}baz`',
      Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'TemplateLiteral',
              expressions: [
                {
                  type: 'Identifier',
                  name: 'bar',
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
                }
              ],
              quasis: [
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'foo',
                    raw: 'foo'
                  },
                  tail: false,
                  start: 0,
                  end: 0,
                  loc: {
                    start: {
                      line: 1,
                      column: 0
                    },
                    end: {
                      line: 1,
                      column: 0
                    }
                  }
                },
                {
                  type: 'TemplateElement',
                  value: {
                    cooked: 'baz',
                    raw: 'baz'
                  },
                  tail: true,
                  start: 9,
                  end: 9,
                  loc: {
                    start: {
                      line: 1,
                      column: 9
                    },
                    end: {
                      line: 1,
                      column: 9
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
      'function *f(){   x = `1 ${ yield x } 2 ${ 3 } 4`   }',
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
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'AssignmentExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    operator: '=',
                    right: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'YieldExpression',
                          argument: {
                            type: 'Identifier',
                            name: 'x',
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
                          delegate: false,
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
                        {
                          type: 'Literal',
                          value: 3,
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
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '1 ',
                            raw: '1 '
                          },
                          tail: false,
                          start: 21,
                          end: 20,
                          loc: {
                            start: {
                              line: 1,
                              column: 21
                            },
                            end: {
                              line: 1,
                              column: 20
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 2 ',
                            raw: ' 2 '
                          },
                          tail: false,
                          start: 35,
                          end: 34,
                          loc: {
                            start: {
                              line: 1,
                              column: 35
                            },
                            end: {
                              line: 1,
                              column: 34
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: ' 4',
                            raw: ' 4'
                          },
                          tail: true,
                          start: 44,
                          end: 43,
                          loc: {
                            start: {
                              line: 1,
                              column: 44
                            },
                            end: {
                              line: 1,
                              column: 43
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 48,
                      loc: {
                        start: {
                          line: 1,
                          column: 21
                        },
                        end: {
                          line: 1,
                          column: 48
                        }
                      }
                    },
                    start: 17,
                    end: 48,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 48
                      }
                    }
                  },
                  start: 17,
                  end: 48,
                  loc: {
                    start: {
                      line: 1,
                      column: 17
                    },
                    end: {
                      line: 1,
                      column: 48
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
            },
            async: false,
            generator: true,
            id: {
              type: 'Identifier',
              name: 'f',
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
      'new x`array`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 12,
            expression: {
              arguments: [],
              callee: {
                end: 12,
                loc: {
                  end: {
                    column: 12,
                    line: 1
                  },
                  start: {
                    column: 4,
                    line: 1
                  }
                },
                quasi: {
                  end: 12,
                  expressions: [],
                  loc: {
                    end: {
                      column: 12,
                      line: 1
                    },
                    start: {
                      column: 5,
                      line: 1
                    }
                  },
                  quasis: [
                    {
                      end: 12,
                      loc: {
                        end: {
                          column: 12,
                          line: 1
                        },
                        start: {
                          column: 5,
                          line: 1
                        }
                      },
                      start: 5,
                      tail: true,
                      type: 'TemplateElement',
                      value: {
                        cooked: 'array',
                        raw: 'array'
                      }
                    }
                  ],
                  start: 5,
                  type: 'TemplateLiteral'
                },
                start: 4,
                tag: {
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
                  name: 'x',
                  start: 4,
                  type: 'Identifier'
                },
                type: 'TaggedTemplateExpression'
              },
              end: 12,
              loc: {
                end: {
                  column: 12,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              start: 0,
              type: 'NewExpression'
            },
            loc: {
              end: {
                column: 12,
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
        end: 12,
        loc: {
          end: {
            column: 12,
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
      'x`1``2``3``array`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 17,
            expression: {
              end: 17,
              loc: {
                end: {
                  column: 17,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasi: {
                end: 17,
                expressions: [],
                loc: {
                  end: {
                    column: 17,
                    line: 1
                  },
                  start: {
                    column: 10,
                    line: 1
                  }
                },
                quasis: [
                  {
                    end: 17,
                    loc: {
                      end: {
                        column: 17,
                        line: 1
                      },
                      start: {
                        column: 10,
                        line: 1
                      }
                    },
                    start: 10,
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: 'array',
                      raw: 'array'
                    }
                  }
                ],
                start: 10,
                type: 'TemplateLiteral'
              },
              start: 0,
              tag: {
                end: 10,
                loc: {
                  end: {
                    column: 10,
                    line: 1
                  },
                  start: {
                    column: 0,
                    line: 1
                  }
                },
                quasi: {
                  end: 10,
                  expressions: [],
                  loc: {
                    end: {
                      column: 10,
                      line: 1
                    },
                    start: {
                      column: 7,
                      line: 1
                    }
                  },
                  quasis: [
                    {
                      end: 10,
                      loc: {
                        end: {
                          column: 10,
                          line: 1
                        },
                        start: {
                          column: 7,
                          line: 1
                        }
                      },
                      start: 7,
                      tail: true,
                      type: 'TemplateElement',
                      value: {
                        cooked: '3',
                        raw: '3'
                      }
                    }
                  ],
                  start: 7,
                  type: 'TemplateLiteral'
                },
                start: 0,
                tag: {
                  end: 7,
                  loc: {
                    end: {
                      column: 7,
                      line: 1
                    },
                    start: {
                      column: 0,
                      line: 1
                    }
                  },
                  quasi: {
                    end: 7,
                    expressions: [],
                    loc: {
                      end: {
                        column: 7,
                        line: 1
                      },
                      start: {
                        column: 4,
                        line: 1
                      }
                    },
                    quasis: [
                      {
                        end: 7,
                        loc: {
                          end: {
                            column: 7,
                            line: 1
                          },
                          start: {
                            column: 4,
                            line: 1
                          }
                        },
                        start: 4,
                        tail: true,
                        type: 'TemplateElement',
                        value: {
                          cooked: '2',
                          raw: '2'
                        }
                      }
                    ],
                    start: 4,
                    type: 'TemplateLiteral'
                  },
                  start: 0,
                  tag: {
                    end: 4,
                    loc: {
                      end: {
                        column: 4,
                        line: 1
                      },
                      start: {
                        column: 0,
                        line: 1
                      }
                    },
                    quasi: {
                      end: 4,
                      expressions: [],
                      loc: {
                        end: {
                          column: 4,
                          line: 1
                        },
                        start: {
                          column: 1,
                          line: 1
                        }
                      },
                      quasis: [
                        {
                          end: 4,
                          loc: {
                            end: {
                              column: 4,
                              line: 1
                            },
                            start: {
                              column: 1,
                              line: 1
                            }
                          },
                          start: 1,
                          tail: true,
                          type: 'TemplateElement',
                          value: {
                            cooked: '1',
                            raw: '1'
                          }
                        }
                      ],
                      start: 1,
                      type: 'TemplateLiteral'
                    },
                    start: 0,
                    tag: {
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
                      name: 'x',
                      start: 0,
                      type: 'Identifier'
                    },
                    type: 'TaggedTemplateExpression'
                  },
                  type: 'TaggedTemplateExpression'
                },
                type: 'TaggedTemplateExpression'
              },
              type: 'TaggedTemplateExpression'
            },
            loc: {
              end: {
                column: 17,
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
        end: 17,
        loc: {
          end: {
            column: 17,
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
      'x`\\0`',
      Context.OptionsLoc,
      {
        body: [
          {
            end: 5,
            expression: {
              end: 5,
              loc: {
                end: {
                  column: 5,
                  line: 1
                },
                start: {
                  column: 0,
                  line: 1
                }
              },
              quasi: {
                end: 5,
                expressions: [],
                loc: {
                  end: {
                    column: 5,
                    line: 1
                  },
                  start: {
                    column: 1,
                    line: 1
                  }
                },
                quasis: [
                  {
                    end: 5,
                    loc: {
                      end: {
                        column: 5,
                        line: 1
                      },
                      start: {
                        column: 1,
                        line: 1
                      }
                    },
                    start: 1,
                    tail: true,
                    type: 'TemplateElement',
                    value: {
                      cooked: '\u0000',
                      raw: '\\0'
                    }
                  }
                ],
                start: 1,
                type: 'TemplateLiteral'
              },
              start: 0,
              tag: {
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
                name: 'x',
                start: 0,
                type: 'Identifier'
              },
              type: 'TaggedTemplateExpression'
            },
            loc: {
              end: {
                column: 5,
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
        end: 5,
        loc: {
          end: {
            column: 5,
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
