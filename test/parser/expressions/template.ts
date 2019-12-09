import { Context } from '../../../src/parser/common';
import * as t from 'assert';
import { parseSource } from '../../../src/parser/core';

describe('Expressions - Template', () => {
  for (const arg of [
    '`${"a"}`',
    '`${1}`',
    'example3 = 1 + `${foo}${bar}${baz}`',
    '`${""}`',
    'y`${y,0}`',
    '`${y,0}`',
    'test`\\uG`;',
    'test`\\xG`;',
    'test`\\18`;',
    'x`\\ua48c`',
    'x`\\h`',
    'x`\\h`',
    'foo`x${a}y${b}z`',
    'x`bunch of escape chars \\v\\t\\n\\b\\a`',
    'x`$ $ $ {} } { }} {{`',
    'x`\\xF8`',
    'x`\r\n`',
    'x`\r\n\r\n`',
    'x`\n\n\n\n\n\n\n\n\n\n`',
    '`$$${a}`',
    'z``',
    '``',
    'f`${x} \\xg ${x}`;',
    'x`\\r\n${0}`',
    'x`\r\\n${0}`',
    'x`\\\r\\n${0}`',
    'x`\\\u2028${0}`',
    'x`\u2029${0}`',
    'x`\\\u2029${0}`',
    'x`\r${0}`',
    'x`\r\n${0}`',
    'x`\\r\n${0}`',
    'x`\\\r\\n${0}`',
    '`دیوانه`',
    '`℘`',
    '`foo\\tbar`',
    '`\\x55a`',
    '`f1o2o`',
    '`a\\u{d}c`',
    'x`a\\u{d}c${0}`',
    '`a\\u{0062}c`',
    '`a\\{000062}c`',
    '`a\\u{00000062}c`',
    '`a\\u{000000062}c`',
    '`\\\0${0}`',
    'x`\0${0}`',
    'x`\\\0${0}`',
    'x`\\r${0}`',
    'x`\\\r\\\n${0}`',
    'x`\\\r\n${0}`',
    'x`\r\\\n${0}`',
    'x`\\r\\n${0}`',
    '`foo${/* comment */ a}`',
    '`foo${// comment\na}`',
    '`foo${\n a}`',
    '`foo${\r\n a}`',
    '`foo${\r a}`',
    "`foo${'a' in a}`",
    'a``',
    'let a;',
    'var foo = `simple template`;',
    'var async = `simple template`;',
    'let foo = f`template with function`;',
    'const foo = f`template with ${some} ${variables}`;',
    'var foo = f`template with ${some}${variables}${attached}`;',
    'let foo = f()`template with function call before`;',
    'const foo = f().g`template with more complex function call`;',
    '`${z}${z}`',
    '`${z}${z}${z}`',
    '`${"z"}${z}${z}`',
    '`${"z"}${"z"}${z}`',
    'z`${`${z}`}`',
    '`\n\r`',
    '`\r\n`',
    '`$$$a}`',
    '`a℮`',
    '`${a}${b}${c}`',
    '`a${a}b${b}c${c}`',
    '`${a}a${b}b${c}c`',
    '`foo\n\nbar\r\nbaz`',
    '`foo\n\n${  bar  }\r\nbaz`',
    '`foo${a /* comment */}`',
    '`foo${a // comment\n}`',
    '`foo${a \n}`',
    '`foo${a \r\n}`',
    '`async${a \r\n}`',
    '`foo${a \r}`',
    'tag`foo${a // comment\n}`',
    'tag`foo${a \n}`',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${/* comment */ a}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\r\n a}`',
    'tag`foo${\r a}`',
    "tag`foo${'a' in a}`",
    'tag`left${0}\\u{\\u{0}`',
    'tag`left${0}\\u{\\u{0}${1}right`',
    'tag`\\u{110000}`',
    'tag`\\u{110000}${0}right`',
    `\`\${\`a\${a}a\`}\``,
    `\`\${\`\${\`\${a}\`}\`}\``,
    'tag`\\xg`',
    `\`\\\${a}\``,
    `\`$a\``,
    `\`\${a}\${b}\``,
    `\`a\${a}\${b}\``,
    `\`\${a}a\${b}\``,
    `\`a\${a}a\${b}\``,
    'a`\\${a}`',
    `\`\${a}\${b}a\``,
    `\`\${a}a\${b}a\``,
    `\`a\${a}a\${b}a\``,
    `\`\${\`\${a}\`}\``,
    `\`\${\`a\${a}\`}\``,
    `\`\${\`\${a}a\`}\``,
    'tag`\\u{}${0}right`',
    'tag`left${0}\\u{}`',
    'tag`\\u000g`',
    'tag`\\u000g${0}right`',
    'tag`\\xg${0}right`',
    'foo`\\u{00000000034}`',
    '`\\ю`',
    '`\\б`',
    'a\r\nb`\n\r\nb\\u{g`;',
    '`a\\r\\nb`',
    '`a\r\nb`',
    '`${ {class: 1} }`',
    '`${ {enum: 1} }`',
    '`${ {function: 1} }`',
    '`foo`',
    '`foo\\u25a0`',
    'foo`\\unicode`',
    //'foo`\\u`',
    'foo`\\u\\n\\r`',
    'foo`\\uaa\\n\\r`',
    'raw`hello ${name}`',
    '`$`',
    '`\\n\\r\\b\\v\\t\\f\\\n\\\r\n`',
    '`\n\r\n\r`',
    '`outer${{x: {y: 10}}}bar${`nested${function(){return 1;}}endnest`}end`',
    'tag`\\08`',
    'tag`\\01`',
    'tag`template-head${a}`',
    'tag `no-subst-template`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag`foo${a /* comment */}`',
    'foo`T\\u200C`',
    'async`\n${0}`',
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
    'foo = `${1}${f}oo${true}${b}ar${0}${baz}`',
    'bar = bar`wow\naB${ 42 } ${_.baz()}`',
    'bar`wow\na${ 42 }b ${_.foobar()}`',
    ' bar`wow\naB${ 42 } ${_.baz()}`',
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
    'tag`foo\\n`',
    't`foo\\n`;',
    'foo`\r\\\n${0}`',
    'foo`\\u{00000000034}`',
    '`\\ю`',
    '`\\б`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\1`',
    'tag ``',
    'tag`foo${a \r\n}`',
    'tag`foo${a \r}`',
    'tag`foo${// comment\na}`',
    'tag`foo${\n a}`',
    'tag`foo${\n async}`',
    'tag`async${\n a}`',
    '`a${b}`',
    "'use strict'; `no-subst-template`",
    "function foo(){ 'use strict';`template-head${a}`}",
    "function foo(){ 'use strict';`${a}`}",
    "function foo(){ 'use strict';`${a}template-tail`}",
    "'use strict'; `template-head${a}template-tail`",
    "'use strict'; `${a}${b}${c}`",
    "function foo(){ 'use strict';`a${a}b${b}c${c}`}",
    'tag`\\xg${0}right`',
    'tag`left${0}\\xg`',
    'tag`left${0}\\xg${1}right`',
    'tag`\\xAg`',
    'tag`\\xAg${0}right`',
    'tag`left${0}\\xAg`',
    'tag`left${0}\\xAg${1}right`',
    'tag`\\u{-0}`',
    'tag`\\u{-0}${0}right`',
    'tag`left${0}\\u{-0}`',
    'tag`left${0}\\u{-0}${1}right`',
    'tag`\\u{g}`',
    'tag`\\u{g}${0}right`',
    'tag`left${0}\\u{g}`',
    'tag`left${0}\\u{g}${1}right`',
    'tag`left${0}\\u{0${1}right`',
    'tag`\\u{\\u{0}`',
    'tag`\\u{\\u{0}${0}right`',
    'tag    `${a}a${b}b${c}c`',
    'tag\t`foo\n\nbar\r\nbaz`',
    'tag\r`foo\n\n${  bar  }\r\nbaz`',
    'tag`foo${a /* comment */}`',
    "'use strict'; tag\r\n`a${a}b${b}c${c}`",
    "'use strict'; tag    `${a}a${b}b${c}c`",
    'function x() { var a, b, c; return tag\t`foo\n\nbar\r\nbaz`}',
    'function x() { var a, b, c; return tag\r`foo\n\n${  bar  }\r\nbaz`}',
    'function x() { var a, b, c; return tag`foo${a /* comment */}`}',
    'function x() { var a, b, c; return tag`foo${a // comment\n}`}',
    '`no-subst-template`',
    '`template-head${a}`',
    'f`\\xg ${x}`;',
    '`${a}`',
    '`${a}template-tail`',
    '`template-head${a}template-tail`',
    'x`\\\u2028${0}`',
    'x`\\0`',
    'x`\\08`',
    'x`\\0\\0`',
    '() => tagged`template literal`',
    'var str = `x${y}`.toUpperCase();',
    'var str = `x`.toUpperCase();',
    'var str = `x${y}` + z; var str2 = `x${y}` * z;',
    'var a = `a`, b = c`b`;',
    'var str = `${a}${b}`',
    'var str = `${a + b}${c}`;',
    'var str = x`y${(() => 42)()}`;',
    'var str = `foo${ bar }baz`;',
    'var str = `foo${bar}baz`;',
    'var string = `foo${`${bar}`}`',
    "simpleTag`str1 ${'str2'} str3 ${'str4'} str5 ${'str6'} str7 ${'str8'} str9`",
    '(`\n`)',
    '(`\r`)',
    'new nestedNewOperatorFunction`1``2``3``array`'
  ]) {
    it(`${arg}`, () => {
      t.doesNotThrow(() => {
        parseSource(`${arg}`, undefined, Context.TaggedTemplate);
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      'for(t`${x in y}`;;);',
      Context.OptionsNext | Context.OptionsLoc,
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
    //['a.foo`bar`', Context.OptionsNext | Context.OptionsLoc, {}],
    [
      'tag`okay \\u{110001}`',
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
                      cooked: '\u0000',
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
    // ['for(t`${x in y}`;;);', Context.OptionsNext | Context.OptionsLoc, {}],

    [
      'let o, {x} = of = 2e308.break',
      Context.OptionsNext | Context.OptionsLoc | Context.Module | Context.Strict,
      {
        type: 'Program',
        sourceType: 'module',
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
                    optional: false,
                    shortCircuited: false,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      Context.OptionsNext | Context.OptionsLoc,
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
      const parser = parseSource(source as string, undefined, ctx as Context);
      t.deepStrictEqual(parser, expected);
    });
  }
});
