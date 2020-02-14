import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';

fail('Module - Import (fail)', [
  ['import', Context.Empty],
  ['import;', Context.Empty],
  ['import;', Context.Empty],
  ['import {}', Context.Empty],
  ['import {};', Context.Empty],
  ['import { y as yield } from "foo"', Context.Empty],
  ['import { y as static  } from "foo"', Context.Empty],
  ['import { y as let } from "foo"', Context.Empty],
  ['import { y as await  } from "foo"', Context.Empty],
  ['import { y as enum } from "foo"', Context.Empty],
  ['import { y as yield } from "foo"', Context.Empty],
  ['import { y as yield } from "foo"', Context.Empty],
  ['import { y as yield } from "foo"', Context.Empty],
  ['import(a, b);', Context.Empty],
  ['import(...a);', Context.Empty],
  ['import(/foo/) /bar/', Context.Empty],
  ['new import(x);', Context.Empty],
  ['import {a, b} fromx "c"', Context.Empty],
  ['import {} from;', Context.Empty],
  ["import {,} from 'a';", Context.Empty],
  ["import {b,,} from 'a';", Context.Empty],
  ['import from;', Context.Empty],
  ['import foo;', Context.Empty],
  ['import {a: b} from "bar";', Context.Empty],
  ['import {foo', Context.Empty],
  ['import { class } from "beast"', Context.Empty],
  ['import { class, var } from "beast"', Context.Empty],
  ['import { a as class } from "beast"', Context.Empty],
  ['import { a as enum } from "beast"', Context.Empty],
  ['import { a as package } from "beast"', Context.Empty],
  ['import * as enum from "beast"', Context.Empty],
  ['() => { class a extends b { static get prototype(){} } }', Context.Empty],
  ['import {...foo} from "bar";', Context.Empty],
  ["import {b as,} from 'a';", Context.Empty],
  ["import {function} from 'a';", Context.Empty],
  ["import {a as function} from 'a';", Context.Empty],
  ['{import {x} from "y";}', Context.Empty],
  ['function f(){import {x} from "y";}', Context.Empty],
  ['if (x); else import {x} from "y";', Context.Empty],
  ['switch (x) { case x: import {x} from "y"; }', Context.Empty],
  ['try { } finally { import {x} from "y"; }', Context.Empty],
  ['do import {x} from "y"; while (x);', Context.Empty],
  ['import foo', Context.Empty],
  ['import', Context.Empty],
  ['import {await} from "foo";', Context.Empty],
  ['import {foo as await} from "foo";', Context.Empty],
  ['import await, {x, y, z} from "foo";', Context.Empty],
  ['import eval, {x, y, z} from "foo";', Context.Empty],
  ['import package, {x, y, z} from "foo";', Context.Empty],
  ['import a, **= from "f";', Context.Empty],
  ['import *= from "f";', Context.Empty],
  ['import ** from "foo";', Context.Empty],
  ['import * as let', Context.Empty],
  ['import * as var', Context.Empty],
  ['import * as class', Context.Empty],
  ['function foo() { import foo from "foo.js"; }', Context.Empty],
  ['import { foo }, bar from "foo.js";', Context.Empty],
  ['import { foo }, from "foo.js";', Context.Empty],
  ['import { foo }, bar from "foo.js";', Context.Empty],
  ['import { foo }, * as ns1 from "foo.js";', Context.Empty],
  ['import { foo }', Context.Empty],
  ['import { x as arguments } from "x";', Context.Empty],
  ['import { x as eval } from "x";', Context.Empty],
  ['import { x as 1 } from "x";', Context.Empty],
  ['import { x as "string" } from "x";', Context.Empty],
  ['import [ foo ] from "foo.js";', Context.Empty],
  ['import * foo from "foo.js";', Context.Empty],
  ['import { , foo } from "foo.js";', Context.Empty],
  ['() => { import arrow from ""; }', Context.Empty],
  ['try { import _try from ""; } catch(e) { }', Context.Empty],
  ['import { foo as bar ', Context.Empty],
  ['import { foo as bar, ', Context.Empty],
  ['import { switch } from "module";', Context.Empty],
  ['while(false) import { default } from "module";', Context.Empty],
  ['import { foo, , } from "module";', Context.Empty],
  ['import { foo as switch } from "module";', Context.Empty],
  ['import { foo bar } from "module";', Context.Empty],
  ['import * foo from "foo.js";', Context.Empty],
  ['import * as new', Context.Empty],
  ['import {;', Context.Empty],
  ['import { };', Context.Empty],
  ['import from;', Context.Empty],
  ['import {x}, {y} from "foo";', Context.Empty],
  ['import * as x, {y} from "foo";', Context.Empty],
  ['import foo, from "foo";', Context.Empty],
  ['import / as a from "foo";', Context.Empty],
  ['import {b,c,,} from  "foo";', Context.Empty],
  ['import * as a from 12', Context.Empty],
  ['import { x }, def from "foo";', Context.Empty],
  ['import {};', Context.Empty],
  ['import {} from;', Context.Empty],
  ['import package, {x, y, z} from "foo";', Context.Empty],
  ['import let, {x, y, z} from "foo";', Context.Empty],
  ['import * from "foo"', Context.Strict | Context.Module],
  ['import * as from', Context.Strict | Context.Module],
  ['import * as x', Context.Strict | Context.Module],
  ['import { null } from "null"', Context.Strict | Context.Module],
  ['import { implements } from "null"', Context.Strict | Context.Module],
  ['import { foo as switch } from "module";', Context.Strict | Context.Module],
  ['import { foo, , } from "module";', Context.Strict | Context.Module],
  ['import * as a in b from "foo";', Context.Strict | Context.Module],
  ["import { {} } from 'foo';", Context.Strict | Context.Module],
  ["import { !d } from 'foo';", Context.Strict | Context.Module],
  ["import { 123 } from 'foo';", Context.Strict | Context.Module],
  ["import a, *= from 'foo';", Context.Strict | Context.Module],
  ["import a, ** from 'foo';", Context.Strict | Context.Module],
  ["import a, **= from 'foo';", Context.Strict | Context.Module],
  ["import *= from 'foo';", Context.Strict | Context.Module],
  ['import foo, from "bar";', Context.Strict | Context.Module],
  ['import ghost from ;', Context.Strict | Context.Module],
  ['import ghost from 12', Context.Strict | Context.Module],
  ['import ghost from []', Context.Strict | Context.Module],
  ["import { [123] } from 'foo';", Context.Strict | Context.Module],
  ['import { a } from;', Context.Strict | Context.Module],
  ["import / as a from 'a'", Context.Strict | Context.Module],
  ["import * as b, a from 'a'", Context.Strict | Context.Module],
  ["import {,} from 'a';", Context.Strict | Context.Module],
  ["import {b,,} from 'a';", Context.Strict | Context.Module],
  ["import * As a from 'a'", Context.Strict | Context.Module],
  ["import {eval} from 'x'", Context.Strict | Context.Module],
  ['import {a b} from "foo";', Context.Strict | Context.Module],
  ['import foo, bar from "foo.js";', Context.Strict | Context.Module],
  ['import { foo }, * as ns1 from "foo.js";', Context.Strict | Context.Module],
  ['import [ foo ] from "foo.js";', Context.Strict | Context.Module],
  ['import { foo as ', Context.Strict | Context.Module],
  ['import;', Context.Strict | Context.Module],
  ['import {}', Context.Strict | Context.Module],
  ['import {} from;', Context.Strict | Context.Module],
  ["import {,} from 'a';", Context.Strict | Context.Module],
  ['import foo, from "bar";', Context.Strict | Context.Module],
  ["import {b,,c} from 'a';", Context.Empty],
  ["import {b,c,,} from 'a';", Context.Empty],
  ["import * As a from 'a'", Context.Empty],
  ["import / as a from 'a'", Context.Empty],
  ["import * as b, a from 'a'", Context.Empty],
  ["import a as b from 'a'", Context.Empty],
  ["import a, b from 'a'", Context.Empty]
]);

pass('Module - Import (pass)', [
  [
    `import { let as l } from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'l',
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
              imported: {
                type: 'Identifier',
                name: 'let',
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
              start: 9,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import a, {as} from 'foo'`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'as',
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
              imported: {
                type: 'Identifier',
                name: 'as',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
            start: 20,
            end: 25,
            loc: {
              start: {
                line: 1,
                column: 20
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
    `import a, {b as c} from 'foo'`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'c',
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
              imported: {
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
              },
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
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import { static as s } from 'm.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 's',
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
              imported: {
                type: 'Identifier',
                name: 'static',
                start: 9,
                end: 15,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 15
                  }
                }
              },
              start: 9,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'm.js',
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
    `import { } from 'm.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [],
          source: {
            type: 'Literal',
            value: 'm.js',
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
    `import { a } from 'm.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'm.js',
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
    `import { a as implement } from "beast"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'implement',
                start: 14,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              imported: {
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
              start: 9,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'beast',
            start: 31,
            end: 38,
            loc: {
              start: {
                line: 1,
                column: 31
              },
              end: {
                line: 1,
                column: 38
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
    `import {x as a, z as b} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'a',
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
              imported: {
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
            },
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'b',
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
              imported: {
                type: 'Identifier',
                name: 'z',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'y',
            start: 29,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 29
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
    `import {} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [],
          source: {
            type: 'Literal',
            value: 'y',
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
    `import "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [],
          source: {
            type: 'Literal',
            value: 'y',
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
    `import {x, z,} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'z',
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
              imported: {
                type: 'Identifier',
                name: 'z',
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
          source: {
            type: 'Literal',
            value: 'y',
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
    `import x from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import thing, * as rest from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: 'thing',
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
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'rest',
                start: 19,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              start: 14,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 14
                },
                end: {
                  line: 1,
                  column: 23
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
            start: 29,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 29
              },
              end: {
                line: 1,
                column: 34
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
    `import {m as mm} from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'mm',
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
              imported: {
                type: 'Identifier',
                name: 'm',
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
              start: 8,
              end: 15,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 15
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
            start: 22,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 22
              },
              end: {
                line: 1,
                column: 27
              }
            }
          },
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
    `import * as foob from 'bar.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'foob',
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
              start: 7,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 7
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'bar.js',
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
    `import { a } from 'm.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'm.js',
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
    `import * as foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo.js',
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
        },
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 46,
                              end: 49,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 46
                                },
                                end: {
                                  line: 1,
                                  column: 49
                                }
                              }
                            },
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 12,
                              start: 52,
                              end: 54,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 52
                                },
                                end: {
                                  line: 1,
                                  column: 54
                                }
                              }
                            },
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
                          start: 46,
                          end: 55,
                          loc: {
                            start: {
                              line: 1,
                              column: 46
                            },
                            end: {
                              line: 1,
                              column: 55
                            }
                          }
                        }
                      ],
                      start: 44,
                      end: 57,
                      loc: {
                        start: {
                          line: 1,
                          column: 44
                        },
                        end: {
                          line: 1,
                          column: 57
                        }
                      }
                    },
                    params: [],
                    async: false,
                    expression: false,
                    start: 38,
                    end: 57,
                    loc: {
                      start: {
                        line: 1,
                        column: 38
                      },
                      end: {
                        line: 1,
                        column: 57
                      }
                    }
                  },
                  arguments: [],

                  start: 37,
                  end: 60,
                  loc: {
                    start: {
                      line: 1,
                      column: 37
                    },
                    end: {
                      line: 1,
                      column: 60
                    }
                  }
                },
                start: 37,
                end: 60,
                loc: {
                  start: {
                    line: 1,
                    column: 37
                  },
                  end: {
                    line: 1,
                    column: 60
                  }
                }
              }
            ],
            start: 35,
            end: 62,
            loc: {
              start: {
                line: 1,
                column: 35
              },
              end: {
                line: 1,
                column: 62
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'Identifier',
              name: 'e',
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
                        type: 'Identifier',
                        name: 'assert',
                        start: 74,
                        end: 80,
                        loc: {
                          start: {
                            line: 1,
                            column: 74
                          },
                          end: {
                            line: 1,
                            column: 80
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'areEqual',
                        start: 81,
                        end: 89,
                        loc: {
                          start: {
                            line: 1,
                            column: 81
                          },
                          end: {
                            line: 1,
                            column: 89
                          }
                        }
                      },

                      start: 74,
                      end: 89,
                      loc: {
                        start: {
                          line: 1,
                          column: 74
                        },
                        end: {
                          line: 1,
                          column: 89
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: 'Assignment to const',
                        start: 90,
                        end: 111,
                        loc: {
                          start: {
                            line: 1,
                            column: 90
                          },
                          end: {
                            line: 1,
                            column: 111
                          }
                        }
                      },
                      {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'e',
                          start: 113,
                          end: 114,
                          loc: {
                            start: {
                              line: 1,
                              column: 113
                            },
                            end: {
                              line: 1,
                              column: 114
                            }
                          }
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'message',
                          start: 115,
                          end: 122,
                          loc: {
                            start: {
                              line: 1,
                              column: 115
                            },
                            end: {
                              line: 1,
                              column: 122
                            }
                          }
                        },

                        start: 113,
                        end: 122,
                        loc: {
                          start: {
                            line: 1,
                            column: 113
                          },
                          end: {
                            line: 1,
                            column: 122
                          }
                        }
                      }
                    ],

                    start: 74,
                    end: 123,
                    loc: {
                      start: {
                        line: 1,
                        column: 74
                      },
                      end: {
                        line: 1,
                        column: 123
                      }
                    }
                  },
                  start: 74,
                  end: 124,
                  loc: {
                    start: {
                      line: 1,
                      column: 74
                    },
                    end: {
                      line: 1,
                      column: 124
                    }
                  }
                }
              ],
              start: 72,
              end: 126,
              loc: {
                start: {
                  line: 1,
                  column: 72
                },
                end: {
                  line: 1,
                  column: 126
                }
              }
            },
            start: 63,
            end: 126,
            loc: {
              start: {
                line: 1,
                column: 63
              },
              end: {
                line: 1,
                column: 126
              }
            }
          },
          finalizer: null,
          start: 31,
          end: 126,
          loc: {
            start: {
              line: 1,
              column: 31
            },
            end: {
              line: 1,
              column: 126
            }
          }
        }
      ],
      start: 0,
      end: 126,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 126
        }
      }
    }
  ],
  [
    `import {k as l, m} from "module";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'l',
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
              imported: {
                type: 'Identifier',
                name: 'k',
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
            },
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'm',
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
              imported: {
                type: 'Identifier',
                name: 'm',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'module',
            start: 24,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 32
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
    `import foo, {bar} from "foo";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: 'foo',
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
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'bar',
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
              imported: {
                type: 'Identifier',
                name: 'bar',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import { null as nil } from "bar"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'nil',
                start: 17,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 17
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
              imported: {
                type: 'Identifier',
                name: 'null',
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
              start: 9,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'bar',
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
    `import b, * as c from "module";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'c',
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
              start: 10,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'module',
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
    `import x, * as ns from "foo"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'ns',
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
              start: 10,
              end: 17,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 17
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import {a, b} from "c"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
              type: 'ImportSpecifier',
              local: {
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
              },
              imported: {
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
          source: {
            type: 'Literal',
            value: 'c',
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
            }
          },
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
    }
  ],
  [
    `import x, * as a from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportNamespaceSpecifier',
              local: {
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
              start: 10,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'y',
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
    `import {x} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'y',
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
    `import {x,} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'y',
            start: 17,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 17
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
    `import {x as z} from "y"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'z',
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'y',
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
    `import {} from "foo";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [],
          source: {
            type: 'Literal',
            value: 'foo',
            start: 15,
            end: 20,
            loc: {
              start: {
                line: 1,
                column: 15
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
    `import {as as as} from 'as'`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'as',
                start: 14,
                end: 16,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 16
                  }
                }
              },
              imported: {
                type: 'Identifier',
                name: 'as',
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
              start: 8,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'as',
            start: 23,
            end: 27,
            loc: {
              start: {
                line: 1,
                column: 23
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
    `import a, {function as c} from 'baz'`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'c',
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
              imported: {
                type: 'Identifier',
                name: 'function',
                start: 11,
                end: 19,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 19
                  }
                }
              },
              start: 11,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'baz',
            start: 31,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 31
              },
              end: {
                line: 1,
                column: 36
              }
            }
          },
          start: 0,
          end: 36,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 36
            }
          }
        }
      ],
      start: 0,
      end: 36,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 36
        }
      }
    }
  ],
  [
    `import { as, get, set, from } from "baz"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'as',
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
              imported: {
                type: 'Identifier',
                name: 'as',
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
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'get',
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
              imported: {
                type: 'Identifier',
                name: 'get',
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
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'set',
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
              imported: {
                type: 'Identifier',
                name: 'set',
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
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'from',
                start: 23,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              imported: {
                type: 'Identifier',
                name: 'from',
                start: 23,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 23
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              start: 23,
              end: 27,
              loc: {
                start: {
                  line: 1,
                  column: 23
                },
                end: {
                  line: 1,
                  column: 27
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'baz',
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
    `import $ from "foo"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: '$',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import { yield as y } from 'm.js';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'y',
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
              imported: {
                type: 'Identifier',
                name: 'yield',
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
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'm.js',
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
          },
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
    `import 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import foo from "foo.js"; try { (() => { foo = 12; })() } catch(e) {}`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: 'foo',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo.js',
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'foo',
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
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 12,
                              start: 47,
                              end: 49,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 47
                                },
                                end: {
                                  line: 1,
                                  column: 49
                                }
                              }
                            },
                            start: 41,
                            end: 49,
                            loc: {
                              start: {
                                line: 1,
                                column: 41
                              },
                              end: {
                                line: 1,
                                column: 49
                              }
                            }
                          },
                          start: 41,
                          end: 50,
                          loc: {
                            start: {
                              line: 1,
                              column: 41
                            },
                            end: {
                              line: 1,
                              column: 50
                            }
                          }
                        }
                      ],
                      start: 39,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 39
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    },
                    params: [],
                    async: false,
                    expression: false,
                    start: 33,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 33
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  },
                  arguments: [],

                  start: 32,
                  end: 55,
                  loc: {
                    start: {
                      line: 1,
                      column: 32
                    },
                    end: {
                      line: 1,
                      column: 55
                    }
                  }
                },
                start: 32,
                end: 55,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 55
                  }
                }
              }
            ],
            start: 30,
            end: 57,
            loc: {
              start: {
                line: 1,
                column: 30
              },
              end: {
                line: 1,
                column: 57
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'Identifier',
              name: 'e',
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
            body: {
              type: 'BlockStatement',
              body: [],
              start: 67,
              end: 69,
              loc: {
                start: {
                  line: 1,
                  column: 67
                },
                end: {
                  line: 1,
                  column: 69
                }
              }
            },
            start: 58,
            end: 69,
            loc: {
              start: {
                line: 1,
                column: 58
              },
              end: {
                line: 1,
                column: 69
              }
            }
          },
          finalizer: null,
          start: 26,
          end: 69,
          loc: {
            start: {
              line: 1,
              column: 26
            },
            end: {
              line: 1,
              column: 69
            }
          }
        }
      ],
      start: 0,
      end: 69,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 69
        }
      }
    }
  ],
  [
    `import { foo } from "foo.js"; try { (() => { foo = 12; })() } catch(e) { assert.areEqual("Assignment to const", e.message); }`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'foo',
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
              imported: {
                type: 'Identifier',
                name: 'foo',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo.js',
            start: 20,
            end: 28,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 28
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ExpressionStatement',
                          expression: {
                            type: 'AssignmentExpression',
                            left: {
                              type: 'Identifier',
                              name: 'foo',
                              start: 45,
                              end: 48,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 48
                                }
                              }
                            },
                            operator: '=',
                            right: {
                              type: 'Literal',
                              value: 12,
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
                            start: 45,
                            end: 53,
                            loc: {
                              start: {
                                line: 1,
                                column: 45
                              },
                              end: {
                                line: 1,
                                column: 53
                              }
                            }
                          },
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
                        }
                      ],
                      start: 43,
                      end: 56,
                      loc: {
                        start: {
                          line: 1,
                          column: 43
                        },
                        end: {
                          line: 1,
                          column: 56
                        }
                      }
                    },
                    params: [],
                    async: false,
                    expression: false,
                    start: 37,
                    end: 56,
                    loc: {
                      start: {
                        line: 1,
                        column: 37
                      },
                      end: {
                        line: 1,
                        column: 56
                      }
                    }
                  },
                  arguments: [],

                  start: 36,
                  end: 59,
                  loc: {
                    start: {
                      line: 1,
                      column: 36
                    },
                    end: {
                      line: 1,
                      column: 59
                    }
                  }
                },
                start: 36,
                end: 59,
                loc: {
                  start: {
                    line: 1,
                    column: 36
                  },
                  end: {
                    line: 1,
                    column: 59
                  }
                }
              }
            ],
            start: 34,
            end: 61,
            loc: {
              start: {
                line: 1,
                column: 34
              },
              end: {
                line: 1,
                column: 61
              }
            }
          },
          handler: {
            type: 'CatchClause',
            param: {
              type: 'Identifier',
              name: 'e',
              start: 68,
              end: 69,
              loc: {
                start: {
                  line: 1,
                  column: 68
                },
                end: {
                  line: 1,
                  column: 69
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
                      type: 'MemberExpression',
                      object: {
                        type: 'Identifier',
                        name: 'assert',
                        start: 73,
                        end: 79,
                        loc: {
                          start: {
                            line: 1,
                            column: 73
                          },
                          end: {
                            line: 1,
                            column: 79
                          }
                        }
                      },
                      computed: false,
                      property: {
                        type: 'Identifier',
                        name: 'areEqual',
                        start: 80,
                        end: 88,
                        loc: {
                          start: {
                            line: 1,
                            column: 80
                          },
                          end: {
                            line: 1,
                            column: 88
                          }
                        }
                      },

                      start: 73,
                      end: 88,
                      loc: {
                        start: {
                          line: 1,
                          column: 73
                        },
                        end: {
                          line: 1,
                          column: 88
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'Literal',
                        value: 'Assignment to const',
                        start: 89,
                        end: 110,
                        loc: {
                          start: {
                            line: 1,
                            column: 89
                          },
                          end: {
                            line: 1,
                            column: 110
                          }
                        }
                      },
                      {
                        type: 'MemberExpression',
                        object: {
                          type: 'Identifier',
                          name: 'e',
                          start: 112,
                          end: 113,
                          loc: {
                            start: {
                              line: 1,
                              column: 112
                            },
                            end: {
                              line: 1,
                              column: 113
                            }
                          }
                        },
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'message',
                          start: 114,
                          end: 121,
                          loc: {
                            start: {
                              line: 1,
                              column: 114
                            },
                            end: {
                              line: 1,
                              column: 121
                            }
                          }
                        },

                        start: 112,
                        end: 121,
                        loc: {
                          start: {
                            line: 1,
                            column: 112
                          },
                          end: {
                            line: 1,
                            column: 121
                          }
                        }
                      }
                    ],

                    start: 73,
                    end: 122,
                    loc: {
                      start: {
                        line: 1,
                        column: 73
                      },
                      end: {
                        line: 1,
                        column: 122
                      }
                    }
                  },
                  start: 73,
                  end: 123,
                  loc: {
                    start: {
                      line: 1,
                      column: 73
                    },
                    end: {
                      line: 1,
                      column: 123
                    }
                  }
                }
              ],
              start: 71,
              end: 125,
              loc: {
                start: {
                  line: 1,
                  column: 71
                },
                end: {
                  line: 1,
                  column: 125
                }
              }
            },
            start: 62,
            end: 125,
            loc: {
              start: {
                line: 1,
                column: 62
              },
              end: {
                line: 1,
                column: 125
              }
            }
          },
          finalizer: null,
          start: 30,
          end: 125,
          loc: {
            start: {
              line: 1,
              column: 30
            },
            end: {
              line: 1,
              column: 125
            }
          }
        }
      ],
      start: 0,
      end: 125,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 125
        }
      }
    }
  ],
  [
    `import e, {f as g, h as i, j} from "module";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: 'e',
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'g',
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
              imported: {
                type: 'Identifier',
                name: 'f',
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
              }
            },
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'i',
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
              imported: {
                type: 'Identifier',
                name: 'h',
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
              start: 19,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 19
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'j',
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
              imported: {
                type: 'Identifier',
                name: 'j',
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
          source: {
            type: 'Literal',
            value: 'module',
            start: 35,
            end: 43,
            loc: {
              start: {
                line: 1,
                column: 35
              },
              end: {
                line: 1,
                column: 43
              }
            }
          },
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
    `import {n, o as p} from "module";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'n',
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
              imported: {
                type: 'Identifier',
                name: 'n',
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'p',
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
              imported: {
                type: 'Identifier',
                name: 'o',
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
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'module',
            start: 24,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 32
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
    `import  * as croasnm from "}ë";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'croasnm',
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
              start: 8,
              end: 20,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 20
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: '}ë',
            start: 26,
            end: 30,
            loc: {
              start: {
                line: 1,
                column: 26
              },
              end: {
                line: 1,
                column: 30
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
    `import  * as set from "a"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'set',
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
              start: 8,
              end: 16,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 16
                }
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'a',
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
    `import * as thing from 'baz';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportNamespaceSpecifier',
              local: {
                type: 'Identifier',
                name: 'thing',
                start: 12,
                end: 17,
                loc: {
                  start: {
                    line: 1,
                    column: 12
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'baz',
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
    `import $ from "foo"`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportDefaultSpecifier',
              local: {
                type: 'Identifier',
                name: '$',
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
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import {n, o as p} from "module";`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'n',
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
              imported: {
                type: 'Identifier',
                name: 'n',
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
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'p',
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
              imported: {
                type: 'Identifier',
                name: 'o',
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
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'module',
            start: 24,
            end: 32,
            loc: {
              start: {
                line: 1,
                column: 24
              },
              end: {
                line: 1,
                column: 32
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
    `import { yield as y } from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
                type: 'Identifier',
                name: 'y',
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
              imported: {
                type: 'Identifier',
                name: 'yield',
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
              }
            }
          ],
          source: {
            type: 'Literal',
            value: 'foo',
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
    `import { a } from 'foo';`,
    Context.OptionsLoc | Context.Module | Context.Strict,
    {
      type: 'Program',
      sourceType: 'module',
      body: [
        {
          type: 'ImportDeclaration',
          specifiers: [
            {
              type: 'ImportSpecifier',
              local: {
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
              imported: {
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
          source: {
            type: 'Literal',
            value: 'foo',
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
  ]
]);
