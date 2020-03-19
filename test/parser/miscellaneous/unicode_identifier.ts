import { pass } from '../core';
import { Context } from '../../../src/parser/common';

pass('Miscellaneous - Unicode identifier (pass)', [
  [
    `var a℘; // U+2118`,
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
                name: 'a℘',
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
    `a፩; // U+1369`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'a፩',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
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
    `var a፱; // U+1371`,
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
                name: 'a፱',
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
    `var a·; // U+0387`,
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
                name: 'a·',
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
    `var \\u2118;`,
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
                name: '℘',
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
    `var _߽࣓৾ఄꣿ𐴤𐴥𐴦𐴧𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹𐽆𐽇𐽋𐽍𐽎𐽏𐽐𐽈𐽉𐽊𐽌𑅅𑅆𑇉𑌻𑑞𑠬𑠭𑠮𑠯𑠰𑠱𑠲𑠳𑠴𑠵𑠶𑠷𑠸𑠺𑠹𑶊𑶋𑶌𑶍𑶎𑶐𑶑𑶓𑶔𑶕𑶖𑶗𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩𑻳𑻴𑻵𑻶;`,
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
                name: '_߽࣓৾ఄꣿ𐴤𐴥𐴦𐴧𐴰𐴱𐴲𐴳𐴴𐴵𐴶𐴷𐴸𐴹𐽆𐽇𐽋𐽍𐽎𐽏𐽐𐽈𐽉𐽊𐽌𑅅𑅆𑇉𑌻𑑞𑠬𑠭𑠮𑠯𑠰𑠱𑠲𑠳𑠴𑠵𑠶𑠷𑠸𑠺𑠹𑶊𑶋𑶌𑶍𑶎𑶐𑶑𑶓𑶔𑶕𑶖𑶗𑶠𑶡𑶢𑶣𑶤𑶥𑶦𑶧𑶨𑶩𑻳𑻴𑻵𑻶',
                start: 4,
                end: 152,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 152
                  }
                }
              },
              start: 4,
              end: 152,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 152
                }
              }
            }
          ],
          start: 0,
          end: 153,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 153
            }
          }
        }
      ],
      start: 0,
      end: 153,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 153
        }
      }
    }
  ],
  [
    `var _ૺૻૼ૽૾૿ഀ഻഼᳷᷹᷷᷸᷶𑨁𑨂𑨃𑨄𑨅𑨆𑨇𑨈𑨉𑨊𑨳𑨴𑨵𑨶𑨷𑨸𑨹𑨻𑨼𑨽𑨾𑩇𑩑𑩒𑩓𑩔𑩕𑩖𑩗𑩘𑩙𑩚𑩛𑪊𑪋𑪌𑪍𑪎𑪏𑪐𑪑𑪒𑪓𑪔𑪕𑪖𑪗𑪘𑪙𑴱𑴲𑴳𑴴𑴵𑴶𑴺𑴼𑴽𑴿𑵀𑵁𑵂𑵃𑵄𑵅𑵇𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙;`,
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
                name: '_ૺૻૼ૽૾૿ഀ഻഼᳷᷹᷷᷸᷶𑨁𑨂𑨃𑨄𑨅𑨆𑨇𑨈𑨉𑨊𑨳𑨴𑨵𑨶𑨷𑨸𑨹𑨻𑨼𑨽𑨾𑩇𑩑𑩒𑩓𑩔𑩕𑩖𑩗𑩘𑩙𑩚𑩛𑪊𑪋𑪌𑪍𑪎𑪏𑪐𑪑𑪒𑪓𑪔𑪕𑪖𑪗𑪘𑪙𑴱𑴲𑴳𑴴𑴵𑴶𑴺𑴼𑴽𑴿𑵀𑵁𑵂𑵃𑵄𑵅𑵇𑵐𑵑𑵒𑵓𑵔𑵕𑵖𑵗𑵘𑵙',
                start: 4,
                end: 171,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 171
                  }
                }
              },
              start: 4,
              end: 171,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 171
                }
              }
            }
          ],
          start: 0,
          end: 172,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 172
            }
          }
        }
      ],
      start: 0,
      end: 172,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 172
        }
      }
    }
  ],
  [
    `var _\\u0B55\\u0D81\\u1ABF\\u1AC0\\uA82C\\u{10EAB}\\u{10EAC}\\u{111CE}\\u{111CF}\\u{11930}\\u{11931}\\u{11932}\\u{11933}\\u{11934}\\u{11935}\\u{11937}\\u{11938}\\u{1193B}\\u{1193C}\\u{1193D}\\u{1193E}\\u{11940}\\u{11942}\\u{11943}\\u{11950}\\u{11951}\\u{11952}\\u{11953}\\u{11954}`,
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
                name: '_୕ඁ꠬ᪿᫀCʫCʬDǎDǏFİFıFĲFĳFĴFĵFķFĸFĻFļFĽFľFŀFłFŃFŐFőFŒFœFŔ',
                start: 4,
                end: 251,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 251
                  }
                }
              },
              start: 4,
              end: 251,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 251
                }
              }
            }
          ],
          start: 0,
          end: 251,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 251
            }
          }
        }
      ],
      start: 0,
      end: 251,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 251
        }
      }
    }
  ],
  [
    `var _ٟ࡙࡚࡛ऺऻॏॖॗྍྎྏ᯦፝፞ᯧᯨᯩᯪᯫᯬᯭᯮᯯᯰᯱ᯲᯳⵿᷼𑀀𑀁𑀂𑀸𑀹𑀺𑀻𑀼𑀽𑀾𑀿𑁀𑁁𑁂𑁃𑁄𑁅𑁆𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯;`,
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
                name: '_ٟ࡙࡚࡛ऺऻॏॖॗྍྎྏ᯦፝፞ᯧᯨᯩᯪᯫᯬᯭᯮᯯᯰᯱ᯲᯳⵿᷼𑀀𑀁𑀂𑀸𑀹𑀺𑀻𑀼𑀽𑀾𑀿𑁀𑁁𑁂𑁃𑁄𑁅𑁆𑁦𑁧𑁨𑁩𑁪𑁫𑁬𑁭𑁮𑁯',
                start: 4,
                end: 91,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 91
                  }
                }
              },
              start: 4,
              end: 91,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 91
                }
              }
            }
          ],
          start: 0,
          end: 92,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 92
            }
          }
        }
      ],
      start: 0,
      end: 92,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 92
        }
      }
    }
  ],
  [
    `var _ࣔࣕࣖࣗࣘࣙࣚࣛࣜࣝࣞࣟ࣠࣡᷻ꣅ𑈾𑐵𑐶𑐷𑐸𑐹𑐺𑐻𑐼𑐽𑐾𑐿𑑀𑑁𑑂𑑃𑑄𑑅𑑆𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙𑰯𑰰𑰱𑰲𑰳𑰴𑰵𑰶𑰸𑰹𑰺𑰻𑰼𑰽𑰾𑰿𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙𑲒𑲓𑲔𑲕𑲖𑲗𑲘𑲙𑲚𑲛𑲜𑲝𑲞𑲟𑲠𑲡𑲢𑲣𑲤𑲥𑲦𑲧𑲩𑲪𑲫𑲬𑲭𑲮𑲯𑲰𑲱𑲲𑲳𑲴𑲵𑲶𞥊𞀀𞀁𞀂𞀃𞀄𞀅𞀆𞀈𞀉𞀊𞀋𞀌𞀍𞀎𞀏𞀐𞀑𞀒𞀓𞀔𞀕𞀖𞀗𞀘𞀛𞀜𞀝𞀞𞀟𞀠𞀡𞀣𞀤𞀦𞀧𞀨𞀩𞀪𞥄𞥅𞥆𞥇𞥈𞥉𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙;`,
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
                name:
                  '_ࣔࣕࣖࣗࣘࣙࣚࣛࣜࣝࣞࣟ࣠࣡᷻ꣅ𑈾𑐵𑐶𑐷𑐸𑐹𑐺𑐻𑐼𑐽𑐾𑐿𑑀𑑁𑑂𑑃𑑄𑑅𑑆𑑐𑑑𑑒𑑓𑑔𑑕𑑖𑑗𑑘𑑙𑰯𑰰𑰱𑰲𑰳𑰴𑰵𑰶𑰸𑰹𑰺𑰻𑰼𑰽𑰾𑰿𑱐𑱑𑱒𑱓𑱔𑱕𑱖𑱗𑱘𑱙𑲒𑲓𑲔𑲕𑲖𑲗𑲘𑲙𑲚𑲛𑲜𑲝𑲞𑲟𑲠𑲡𑲢𑲣𑲤𑲥𑲦𑲧𑲩𑲪𑲫𑲬𑲭𑲮𑲯𑲰𑲱𑲲𑲳𑲴𑲵𑲶𞥊𞀀𞀁𞀂𞀃𞀄𞀅𞀆𞀈𞀉𞀊𞀋𞀌𞀍𞀎𞀏𞀐𞀑𞀒𞀓𞀔𞀕𞀖𞀗𞀘𞀛𞀜𞀝𞀞𞀟𞀠𞀡𞀣𞀤𞀦𞀧𞀨𞀩𞀪𞥄𞥅𞥆𞥇𞥈𞥉𞥐𞥑𞥒𞥓𞥔𞥕𞥖𞥗𞥘𞥙',
                start: 4,
                end: 313,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 313
                  }
                }
              },
              start: 4,
              end: 313,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 313
                }
              }
            }
          ],
          start: 0,
          end: 314,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 314
            }
          }
        }
      ],
      start: 0,
      end: 314,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 314
        }
      }
    }
  ],
  [
    `var _$ = 3;`,
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
                value: 3,
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
              id: {
                type: 'Identifier',
                name: '_$',
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
    `var ԦԧؠࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘॳॴॵॶॷೱೲഩഺൎྌᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥₕₖₗₘₙₚₛₜㆸㆹㆺꙠꙡꞍꞎꞐꞑꞠꞡꞢꞣꞤꞥꞦꞧꞨꞩꟺꬁꬂꬃꬄꬅꬆꬉꬊꬋꬌꬍꬎꬑꬒꬓꬔꬕꬖꬠꬡꬢꬣꬤꬥꬦꬨꬩꬪꬫꬬꬭꬮ𑀃𑀄𑀅𑀆𑀇𑀈𑀉𑀊𑀋𑀌𑀍𑀎𑀏𑀐𑀑𑀒𑀓𑀔𑀕𑀖𑀗𑀘𑀙𑀚𑀛𑀜𑀝𑀞𑀟𑀠𑀡𑀢𑀣𑀤𑀥𑀦𑀧𑀨𑀩𑀪𑀫𑀬𑀭𑀮𑀯𑀰𑀱𑀲𑀳𑀴𑀵𑀶𑀷𖠀𖠁𖠂𖠃𖠄𖠅𖠆𖠇𖠈𖠉𖠊𖠋𖠌𖠍𖠎𖠏𖠐𖠑𖠒𖠓𖠔𖠕𖠖𖠗𖠘𖠙𖠚𖠛𖠜𖠝𖠞𖠟𖠠𖠡𖠢𖠣𖠤𖠥𖠦𖠧𖠨𖠩𖠪𖠫𖠬𖠭𖠮𖠯𖠰𖠱𖠲𖠳𖠴𖠵𖠶𖠷𖠸𖠹𖠺𖠻𖠼𖠽𖠾𖠿𖡀𖡁𖡂𖡃𖡄𖡅𖡆𖡇𖡈𖡉𖡊𖡋𖡌𖡍𖡎𖡏𖡐𖡑𖡒𖡓𖡔𖡕𖡖𖡗𖡘𖡙𖡚𖡛𖡜𖡝𖡞𖡟𖡠𖡡𖡢𖡣𖡤𖡥𖡦𖡧𖡨𖡩𖡪𖡫𖡬𖡭𖡮𖡯𖡰𖡱𖡲𖡳𖡴𖡵𖡶𖡷𖡸𖡹𖡺𖡻𖡼𖡽𖡾𖡿𖢀𖢁𖢂𖢃𖢄𖢅𖢆𖢇𖢈𖢉𖢊𖢋𖢌𖢍𖢎𖢏𖢐𖢑𖢒𖢓𖢔𖢕𖢖𖢗𖢘𖢙𖢚𖢛𖢜𖢝𖢞𖢟𖢠𖢡𖢢𖢣𖢤𖢥𖢦𖢧𖢨𖢩𖢪𖢫𖢬𖢭𖢮𖢯𖢰𖢱𖢲𖢳𖢴𖢵𖢶𖢷𖢸𖢹𖢺𖢻𖢼𖢽𖢾𖢿𖣀𖣁𖣂𖣃𖣄𖣅𖣆𖣇𖣈𖣉𖣊𖣋𖣌𖣍𖣎𖣏𖣐𖣑𖣒𖣓𖣔𖣕𖣖𖣗𖣘𖣙𖣚𖣛𖣜𖣝𖣞𖣟𖣠𖣡𖣢𖣣𖣤𖣥𖣦𖣧𖣨𖣩𖣪𖣫𖣬𖣭𖣮𖣯𖣰𖣱𖣲𖣳𖣴𖣵𖣶𖣷𖣸𖣹𖣺𖣻𖣼𖣽𖣾𖣿𖤀𖤁𖤂𖤃𖤄𖤅𖤆𖤇𖤈𖤉𖤊𖤋𖤌𖤍𖤎𖤏𖤐𖤑𖤒𖤓𖤔𖤕𖤖𖤗𖤘𖤙𖤚𖤛𖤜𖤝𖤞𖤟𖤠𖤡𖤢𖤣𖤤𖤥𖤦𖤧𖤨𖤩𖤪𖤫𖤬𖤭𖤮𖤯𖤰𖤱𖤲𖤳𖤴𖤵𖤶𖤷𖤸𖤹𖤺𖤻𖤼𖤽𖤾𖤿𖥀𖥁𖥂𖥃𖥄𖥅𖥆𖥇𖥈𖥉𖥊𖥋𖥌𖥍𖥎𖥏𖥐𖥑𖥒𖥓𖥔𖥕𖥖𖥗𖥘𖥙𖥚𖥛𖥜𖥝𖥞𖥟𖥠𖥡𖥢𖥣𖥤𖥥𖥦𖥧𖥨𖥩𖥪𖥫𖥬𖥭𖥮𖥯𖥰𖥱𖥲𖥳𖥴𖥵𖥶𖥷𖥸𖥹𖥺𖥻𖥼𖥽𖥾𖥿𖦀𖦁𖦂𖦃𖦄𖦅𖦆𖦇𖦈𖦉𖦊𖦋𖦌𖦍𖦎𖦏𖦐𖦑𖦒𖦓𖦔𖦕𖦖𖦗𖦘𖦙𖦚𖦛𖦜𖦝𖦞𖦟𖦠𖦡𖦢𖦣𖦤𖦥𖦦𖦧𖦨𖦩𖦪𖦫𖦬𖦭𖦮𖦯𖦰𖦱𖦲𖦳𖦴𖦵𖦶𖦷𖦸𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂𖧃𖧄𖧅𖧆𖧇𖧈𖧉𖧊𖧋𖧌𖧍𖧎𖧏𖧐𖧑𖧒𖧓𖧔𖧕𖧖𖧗𖧘𖧙𖧚𖧛𖧜𖧝𖧞𖧟𖧠𖧡𖧢𖧣𖧤𖧥𖧦𖧧𖧨𖧩𖧪𖧫𖧬𖧭𖧮𖧯𖧰𖧱𖧲𖧳𖧴𖧵𖧶𖧷𖧸𖧹𖧺𖧻𖧼𖧽𖧾𖧿𖨀𖨁𖨂𖨃𖨄𖨅𖨆𖨇𖨈𖨉𖨊𖨋𖨌𖨍𖨎𖨏𖨐𖨑𖨒𖨓𖨔𖨕𖨖𖨗𖨘𖨙𖨚𖨛𖨜𖨝𖨞𖨟𖨠𖨡𖨢𖨣𖨤𖨥𖨦𖨧𖨨𖨩𖨪𖨫𖨬𖨭𖨮𖨯𖨰𖨱𖨲𖨳𖨴𖨵𖨶𖨷𖨸𛀀𛀁𫝀𫝁𫝂𫝃𫝄𫝅𫝆𫝇𫝈𫝉𫝊𫝋𫝌𫝍𫝎𫝏𫝐𫝑𫝒𫝓𫝔𫝕𫝖𫝗𫝘𫝙𫝚𫝛𫝜𫝝𫝞𫝟𫝠𫝡𫝢𫝣𫝤𫝥𫝦𫝧𫝨𫝩𫝪𫝫𫝬𫝭𫝮𫝯𫝰𫝱𫝲𫝳𫝴𫝵𫝶𫝷𫝸𫝹𫝺𫝻𫝼𫝽𫝾𫝿𫞀𫞁𫞂𫞃𫞄𫞅𫞆𫞇𫞈𫞉𫞊𫞋𫞌𫞍𫞎𫞏𫞐𫞑𫞒𫞓𫞔𫞕𫞖𫞗𫞘𫞙𫞚𫞛𫞜𫞝𫞞𫞟𫞠𫞡𫞢𫞣𫞤𫞥𫞦𫞧𫞨𫞩𫞪𫞫𫞬𫞭𫞮𫞯𫞰𫞱𫞲𫞳𫞴𫞵𫞶𫞷𫞸𫞹𫞺𫞻𫞼𫞽𫞾𫞿𫟀𫟁𫟂𫟃𫟄𫟅𫟆𫟇𫟈𫟉𫟊𫟋𫟌𫟍𫟎𫟏𫟐𫟑𫟒𫟓𫟔𫟕𫟖𫟗𫟘𫟙𫟚𫟛𫟜𫟝𫟞𫟟𫟠𫟡𫟢𫟣𫟤𫟥𫟦𫟧𫟨𫟩𫟪𫟫𫟬𫟭𫟮𫟯𫟰𫟱𫟲𫟳𫟴𫟵𫟶𫟷𫟸𫟹𫟺𫟻𫟼𫟽𫟾𫟿𫠀𫠁𫠂𫠃𫠄𫠅𫠆𫠇𫠈𫠉𫠊𫠋𫠌𫠍𫠎𫠏𫠐𫠑𫠒𫠓𫠔𫠕𫠖𫠗𫠘𫠙𫠚𫠛𫠜𫠝;`,
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
                name:
                  'ԦԧؠࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘॳॴॵॶॷೱೲഩഺൎྌᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥₕₖₗₘₙₚₛₜㆸㆹㆺꙠꙡꞍꞎꞐꞑꞠꞡꞢꞣꞤꞥꞦꞧꞨꞩꟺꬁꬂꬃꬄꬅꬆꬉꬊꬋꬌꬍꬎꬑꬒꬓꬔꬕꬖꬠꬡꬢꬣꬤꬥꬦꬨꬩꬪꬫꬬꬭꬮ𑀃𑀄𑀅𑀆𑀇𑀈𑀉𑀊𑀋𑀌𑀍𑀎𑀏𑀐𑀑𑀒𑀓𑀔𑀕𑀖𑀗𑀘𑀙𑀚𑀛𑀜𑀝𑀞𑀟𑀠𑀡𑀢𑀣𑀤𑀥𑀦𑀧𑀨𑀩𑀪𑀫𑀬𑀭𑀮𑀯𑀰𑀱𑀲𑀳𑀴𑀵𑀶𑀷𖠀𖠁𖠂𖠃𖠄𖠅𖠆𖠇𖠈𖠉𖠊𖠋𖠌𖠍𖠎𖠏𖠐𖠑𖠒𖠓𖠔𖠕𖠖𖠗𖠘𖠙𖠚𖠛𖠜𖠝𖠞𖠟𖠠𖠡𖠢𖠣𖠤𖠥𖠦𖠧𖠨𖠩𖠪𖠫𖠬𖠭𖠮𖠯𖠰𖠱𖠲𖠳𖠴𖠵𖠶𖠷𖠸𖠹𖠺𖠻𖠼𖠽𖠾𖠿𖡀𖡁𖡂𖡃𖡄𖡅𖡆𖡇𖡈𖡉𖡊𖡋𖡌𖡍𖡎𖡏𖡐𖡑𖡒𖡓𖡔𖡕𖡖𖡗𖡘𖡙𖡚𖡛𖡜𖡝𖡞𖡟𖡠𖡡𖡢𖡣𖡤𖡥𖡦𖡧𖡨𖡩𖡪𖡫𖡬𖡭𖡮𖡯𖡰𖡱𖡲𖡳𖡴𖡵𖡶𖡷𖡸𖡹𖡺𖡻𖡼𖡽𖡾𖡿𖢀𖢁𖢂𖢃𖢄𖢅𖢆𖢇𖢈𖢉𖢊𖢋𖢌𖢍𖢎𖢏𖢐𖢑𖢒𖢓𖢔𖢕𖢖𖢗𖢘𖢙𖢚𖢛𖢜𖢝𖢞𖢟𖢠𖢡𖢢𖢣𖢤𖢥𖢦𖢧𖢨𖢩𖢪𖢫𖢬𖢭𖢮𖢯𖢰𖢱𖢲𖢳𖢴𖢵𖢶𖢷𖢸𖢹𖢺𖢻𖢼𖢽𖢾𖢿𖣀𖣁𖣂𖣃𖣄𖣅𖣆𖣇𖣈𖣉𖣊𖣋𖣌𖣍𖣎𖣏𖣐𖣑𖣒𖣓𖣔𖣕𖣖𖣗𖣘𖣙𖣚𖣛𖣜𖣝𖣞𖣟𖣠𖣡𖣢𖣣𖣤𖣥𖣦𖣧𖣨𖣩𖣪𖣫𖣬𖣭𖣮𖣯𖣰𖣱𖣲𖣳𖣴𖣵𖣶𖣷𖣸𖣹𖣺𖣻𖣼𖣽𖣾𖣿𖤀𖤁𖤂𖤃𖤄𖤅𖤆𖤇𖤈𖤉𖤊𖤋𖤌𖤍𖤎𖤏𖤐𖤑𖤒𖤓𖤔𖤕𖤖𖤗𖤘𖤙𖤚𖤛𖤜𖤝𖤞𖤟𖤠𖤡𖤢𖤣𖤤𖤥𖤦𖤧𖤨𖤩𖤪𖤫𖤬𖤭𖤮𖤯𖤰𖤱𖤲𖤳𖤴𖤵𖤶𖤷𖤸𖤹𖤺𖤻𖤼𖤽𖤾𖤿𖥀𖥁𖥂𖥃𖥄𖥅𖥆𖥇𖥈𖥉𖥊𖥋𖥌𖥍𖥎𖥏𖥐𖥑𖥒𖥓𖥔𖥕𖥖𖥗𖥘𖥙𖥚𖥛𖥜𖥝𖥞𖥟𖥠𖥡𖥢𖥣𖥤𖥥𖥦𖥧𖥨𖥩𖥪𖥫𖥬𖥭𖥮𖥯𖥰𖥱𖥲𖥳𖥴𖥵𖥶𖥷𖥸𖥹𖥺𖥻𖥼𖥽𖥾𖥿𖦀𖦁𖦂𖦃𖦄𖦅𖦆𖦇𖦈𖦉𖦊𖦋𖦌𖦍𖦎𖦏𖦐𖦑𖦒𖦓𖦔𖦕𖦖𖦗𖦘𖦙𖦚𖦛𖦜𖦝𖦞𖦟𖦠𖦡𖦢𖦣𖦤𖦥𖦦𖦧𖦨𖦩𖦪𖦫𖦬𖦭𖦮𖦯𖦰𖦱𖦲𖦳𖦴𖦵𖦶𖦷𖦸𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂𖧃𖧄𖧅𖧆𖧇𖧈𖧉𖧊𖧋𖧌𖧍𖧎𖧏𖧐𖧑𖧒𖧓𖧔𖧕𖧖𖧗𖧘𖧙𖧚𖧛𖧜𖧝𖧞𖧟𖧠𖧡𖧢𖧣𖧤𖧥𖧦𖧧𖧨𖧩𖧪𖧫𖧬𖧭𖧮𖧯𖧰𖧱𖧲𖧳𖧴𖧵𖧶𖧷𖧸𖧹𖧺𖧻𖧼𖧽𖧾𖧿𖨀𖨁𖨂𖨃𖨄𖨅𖨆𖨇𖨈𖨉𖨊𖨋𖨌𖨍𖨎𖨏𖨐𖨑𖨒𖨓𖨔𖨕𖨖𖨗𖨘𖨙𖨚𖨛𖨜𖨝𖨞𖨟𖨠𖨡𖨢𖨣𖨤𖨥𖨦𖨧𖨨𖨩𖨪𖨫𖨬𖨭𖨮𖨯𖨰𖨱𖨲𖨳𖨴𖨵𖨶𖨷𖨸𛀀𛀁𫝀𫝁𫝂𫝃𫝄𫝅𫝆𫝇𫝈𫝉𫝊𫝋𫝌𫝍𫝎𫝏𫝐𫝑𫝒𫝓𫝔𫝕𫝖𫝗𫝘𫝙𫝚𫝛𫝜𫝝𫝞𫝟𫝠𫝡𫝢𫝣𫝤𫝥𫝦𫝧𫝨𫝩𫝪𫝫𫝬𫝭𫝮𫝯𫝰𫝱𫝲𫝳𫝴𫝵𫝶𫝷𫝸𫝹𫝺𫝻𫝼𫝽𫝾𫝿𫞀𫞁𫞂𫞃𫞄𫞅𫞆𫞇𫞈𫞉𫞊𫞋𫞌𫞍𫞎𫞏𫞐𫞑𫞒𫞓𫞔𫞕𫞖𫞗𫞘𫞙𫞚𫞛𫞜𫞝𫞞𫞟𫞠𫞡𫞢𫞣𫞤𫞥𫞦𫞧𫞨𫞩𫞪𫞫𫞬𫞭𫞮𫞯𫞰𫞱𫞲𫞳𫞴𫞵𫞶𫞷𫞸𫞹𫞺𫞻𫞼𫞽𫞾𫞿𫟀𫟁𫟂𫟃𫟄𫟅𫟆𫟇𫟈𫟉𫟊𫟋𫟌𫟍𫟎𫟏𫟐𫟑𫟒𫟓𫟔𫟕𫟖𫟗𫟘𫟙𫟚𫟛𫟜𫟝𫟞𫟟𫟠𫟡𫟢𫟣𫟤𫟥𫟦𫟧𫟨𫟩𫟪𫟫𫟬𫟭𫟮𫟯𫟰𫟱𫟲𫟳𫟴𫟵𫟶𫟷𫟸𫟹𫟺𫟻𫟼𫟽𫟾𫟿𫠀𫠁𫠂𫠃𫠄𫠅𫠆𫠇𫠈𫠉𫠊𫠋𫠌𫠍𫠎𫠏𫠐𫠑𫠒𫠓𫠔𫠕𫠖𫠗𫠘𫠙𫠚𫠛𫠜𫠝',
                start: 4,
                end: 1833,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 1833
                  }
                }
              },
              start: 4,
              end: 1833,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 1833
                }
              }
            }
          ],
          start: 0,
          end: 1834,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1834
            }
          }
        }
      ],
      start: 0,
      end: 1834,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1834
        }
      }
    }
  ],
  [
    `ԦԧؠࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘॳॴॵॶॷೱೲഩഺൎྌᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥₕₖₗₘₙₚₛₜㆸㆹㆺꙠꙡꞍꞎꞐꞑꞠꞡꞢꞣꞤꞥꞦꞧꞨꞩꟺꬁꬂꬃꬄꬅꬆꬉꬊꬋꬌꬍꬎꬑꬒꬓꬔꬕꬖꬠꬡꬢꬣꬤꬥꬦꬨꬩꬪꬫꬬꬭꬮ𑀃𑀄𑀅𑀆𑀇𑀈𑀉𑀊𑀋𑀌𑀍𑀎𑀏𑀐𑀑𑀒𑀓𑀔𑀕𑀖𑀗𑀘𑀙𑀚𑀛𑀜𑀝𑀞𑀟𑀠𑀡𑀢𑀣𑀤𑀥𑀦𑀧𑀨𑀩𑀪𑀫𑀬𑀭𑀮𑀯𑀰𑀱𑀲𑀳𑀴𑀵𑀶𑀷𖠀𖠁𖠂𖠃𖠄𖠅𖠆𖠇𖠈𖠉𖠊𖠋𖠌𖠍𖠎𖠏𖠐𖠑𖠒𖠓𖠔𖠕𖠖𖠗𖠘𖠙𖠚𖠛𖠜𖠝𖠞𖠟𖠠𖠡𖠢𖠣𖠤𖠥𖠦𖠧𖠨𖠩𖠪𖠫𖠬𖠭𖠮𖠯𖠰𖠱𖠲𖠳𖠴𖠵𖠶𖠷𖠸𖠹𖠺𖠻𖠼𖠽𖠾𖠿𖡀𖡁𖡂𖡃𖡄𖡅𖡆𖡇𖡈𖡉𖡊𖡋𖡌𖡍𖡎𖡏𖡐𖡑𖡒𖡓𖡔𖡕𖡖𖡗𖡘𖡙𖡚𖡛𖡜𖡝𖡞𖡟𖡠𖡡𖡢𖡣𖡤𖡥𖡦𖡧𖡨𖡩𖡪𖡫𖡬𖡭𖡮𖡯𖡰𖡱𖡲𖡳𖡴𖡵𖡶𖡷𖡸𖡹𖡺𖡻𖡼𖡽𖡾𖡿𖢀𖢁𖢂𖢃𖢄𖢅𖢆𖢇𖢈𖢉𖢊𖢋𖢌𖢍𖢎𖢏𖢐𖢑𖢒𖢓𖢔𖢕𖢖𖢗𖢘𖢙𖢚𖢛𖢜𖢝𖢞𖢟𖢠𖢡𖢢𖢣𖢤𖢥𖢦𖢧𖢨𖢩𖢪𖢫𖢬𖢭𖢮𖢯𖢰𖢱𖢲𖢳𖢴𖢵𖢶𖢷𖢸𖢹𖢺𖢻𖢼𖢽𖢾𖢿𖣀𖣁𖣂𖣃𖣄𖣅𖣆𖣇𖣈𖣉𖣊𖣋𖣌𖣍𖣎𖣏𖣐𖣑𖣒𖣓𖣔𖣕𖣖𖣗𖣘𖣙𖣚𖣛𖣜𖣝𖣞𖣟𖣠𖣡𖣢𖣣𖣤𖣥𖣦𖣧𖣨𖣩𖣪𖣫𖣬𖣭𖣮𖣯𖣰𖣱𖣲𖣳𖣴𖣵𖣶𖣷𖣸𖣹𖣺𖣻𖣼𖣽𖣾𖣿𖤀𖤁𖤂𖤃𖤄𖤅𖤆𖤇𖤈𖤉𖤊𖤋𖤌𖤍𖤎𖤏𖤐𖤑𖤒𖤓𖤔𖤕𖤖𖤗𖤘𖤙𖤚𖤛𖤜𖤝𖤞𖤟𖤠𖤡𖤢𖤣𖤤𖤥𖤦𖤧𖤨𖤩𖤪𖤫𖤬𖤭𖤮𖤯𖤰𖤱𖤲𖤳𖤴𖤵𖤶𖤷𖤸𖤹𖤺𖤻𖤼𖤽𖤾𖤿𖥀𖥁𖥂𖥃𖥄𖥅𖥆𖥇𖥈𖥉𖥊𖥋𖥌𖥍𖥎𖥏𖥐𖥑𖥒𖥓𖥔𖥕𖥖𖥗𖥘𖥙𖥚𖥛𖥜𖥝𖥞𖥟𖥠𖥡𖥢𖥣𖥤𖥥𖥦𖥧𖥨𖥩𖥪𖥫𖥬𖥭𖥮𖥯𖥰𖥱𖥲𖥳𖥴𖥵𖥶𖥷𖥸𖥹𖥺𖥻𖥼𖥽𖥾𖥿𖦀𖦁𖦂𖦃𖦄𖦅𖦆𖦇𖦈𖦉𖦊𖦋𖦌𖦍𖦎𖦏𖦐𖦑𖦒𖦓𖦔𖦕𖦖𖦗𖦘𖦙𖦚𖦛𖦜𖦝𖦞𖦟𖦠𖦡𖦢𖦣𖦤𖦥𖦦𖦧𖦨𖦩𖦪𖦫𖦬𖦭𖦮𖦯𖦰𖦱𖦲𖦳𖦴𖦵𖦶𖦷𖦸𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂𖧃𖧄𖧅𖧆𖧇𖧈𖧉𖧊𖧋𖧌𖧍𖧎𖧏𖧐𖧑𖧒𖧓𖧔𖧕𖧖𖧗𖧘𖧙𖧚𖧛𖧜𖧝𖧞𖧟𖧠𖧡𖧢𖧣𖧤𖧥𖧦𖧧𖧨𖧩𖧪𖧫𖧬𖧭𖧮𖧯𖧰𖧱𖧲𖧳𖧴𖧵𖧶𖧷𖧸𖧹𖧺𖧻𖧼𖧽𖧾𖧿𖨀𖨁𖨂𖨃𖨄𖨅𖨆𖨇𖨈𖨉𖨊𖨋𖨌𖨍𖨎𖨏𖨐𖨑𖨒𖨓𖨔𖨕𖨖𖨗𖨘𖨙𖨚𖨛𖨜𖨝𖨞𖨟𖨠𖨡𖨢𖨣𖨤𖨥𖨦𖨧𖨨𖨩𖨪𖨫𖨬𖨭𖨮𖨯𖨰𖨱𖨲𖨳𖨴𖨵𖨶𖨷𖨸𛀀𛀁𫝀𫝁𫝂𫝃𫝄𫝅𫝆𫝇𫝈𫝉𫝊𫝋𫝌𫝍𫝎𫝏𫝐𫝑𫝒𫝓𫝔𫝕𫝖𫝗𫝘𫝙𫝚𫝛𫝜𫝝𫝞𫝟𫝠𫝡𫝢𫝣𫝤𫝥𫝦𫝧𫝨𫝩𫝪𫝫𫝬𫝭𫝮𫝯𫝰𫝱𫝲𫝳𫝴𫝵𫝶𫝷𫝸𫝹𫝺𫝻𫝼𫝽𫝾𫝿𫞀𫞁𫞂𫞃𫞄𫞅𫞆𫞇𫞈𫞉𫞊𫞋𫞌𫞍𫞎𫞏𫞐𫞑𫞒𫞓𫞔𫞕𫞖𫞗𫞘𫞙𫞚𫞛𫞜𫞝𫞞𫞟𫞠𫞡𫞢𫞣𫞤𫞥𫞦𫞧𫞨𫞩𫞪𫞫𫞬𫞭𫞮𫞯𫞰𫞱𫞲𫞳𫞴𫞵𫞶𫞷𫞸𫞹𫞺𫞻𫞼𫞽𫞾𫞿𫟀𫟁𫟂𫟃𫟄𫟅𫟆𫟇𫟈𫟉𫟊𫟋𫟌𫟍𫟎𫟏𫟐𫟑𫟒𫟓𫟔𫟕𫟖𫟗𫟘𫟙𫟚𫟛𫟜𫟝𫟞𫟟𫟠𫟡𫟢𫟣𫟤𫟥𫟦𫟧𫟨𫟩𫟪𫟫𫟬𫟭𫟮𫟯𫟰𫟱𫟲𫟳𫟴𫟵𫟶𫟷𫟸𫟹𫟺𫟻𫟼𫟽𫟾𫟿𫠀𫠁𫠂𫠃𫠄𫠅𫠆𫠇𫠈𫠉𫠊𫠋𫠌𫠍𫠎𫠏𫠐𫠑𫠒𫠓𫠔𫠕𫠖𫠗𫠘𫠙𫠚𫠛𫠜𫠝;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name:
              'ԦԧؠࡀࡁࡂࡃࡄࡅࡆࡇࡈࡉࡊࡋࡌࡍࡎࡏࡐࡑࡒࡓࡔࡕࡖࡗࡘॳॴॵॶॷೱೲഩഺൎྌᯀᯁᯂᯃᯄᯅᯆᯇᯈᯉᯊᯋᯌᯍᯎᯏᯐᯑᯒᯓᯔᯕᯖᯗᯘᯙᯚᯛᯜᯝᯞᯟᯠᯡᯢᯣᯤᯥₕₖₗₘₙₚₛₜㆸㆹㆺꙠꙡꞍꞎꞐꞑꞠꞡꞢꞣꞤꞥꞦꞧꞨꞩꟺꬁꬂꬃꬄꬅꬆꬉꬊꬋꬌꬍꬎꬑꬒꬓꬔꬕꬖꬠꬡꬢꬣꬤꬥꬦꬨꬩꬪꬫꬬꬭꬮ𑀃𑀄𑀅𑀆𑀇𑀈𑀉𑀊𑀋𑀌𑀍𑀎𑀏𑀐𑀑𑀒𑀓𑀔𑀕𑀖𑀗𑀘𑀙𑀚𑀛𑀜𑀝𑀞𑀟𑀠𑀡𑀢𑀣𑀤𑀥𑀦𑀧𑀨𑀩𑀪𑀫𑀬𑀭𑀮𑀯𑀰𑀱𑀲𑀳𑀴𑀵𑀶𑀷𖠀𖠁𖠂𖠃𖠄𖠅𖠆𖠇𖠈𖠉𖠊𖠋𖠌𖠍𖠎𖠏𖠐𖠑𖠒𖠓𖠔𖠕𖠖𖠗𖠘𖠙𖠚𖠛𖠜𖠝𖠞𖠟𖠠𖠡𖠢𖠣𖠤𖠥𖠦𖠧𖠨𖠩𖠪𖠫𖠬𖠭𖠮𖠯𖠰𖠱𖠲𖠳𖠴𖠵𖠶𖠷𖠸𖠹𖠺𖠻𖠼𖠽𖠾𖠿𖡀𖡁𖡂𖡃𖡄𖡅𖡆𖡇𖡈𖡉𖡊𖡋𖡌𖡍𖡎𖡏𖡐𖡑𖡒𖡓𖡔𖡕𖡖𖡗𖡘𖡙𖡚𖡛𖡜𖡝𖡞𖡟𖡠𖡡𖡢𖡣𖡤𖡥𖡦𖡧𖡨𖡩𖡪𖡫𖡬𖡭𖡮𖡯𖡰𖡱𖡲𖡳𖡴𖡵𖡶𖡷𖡸𖡹𖡺𖡻𖡼𖡽𖡾𖡿𖢀𖢁𖢂𖢃𖢄𖢅𖢆𖢇𖢈𖢉𖢊𖢋𖢌𖢍𖢎𖢏𖢐𖢑𖢒𖢓𖢔𖢕𖢖𖢗𖢘𖢙𖢚𖢛𖢜𖢝𖢞𖢟𖢠𖢡𖢢𖢣𖢤𖢥𖢦𖢧𖢨𖢩𖢪𖢫𖢬𖢭𖢮𖢯𖢰𖢱𖢲𖢳𖢴𖢵𖢶𖢷𖢸𖢹𖢺𖢻𖢼𖢽𖢾𖢿𖣀𖣁𖣂𖣃𖣄𖣅𖣆𖣇𖣈𖣉𖣊𖣋𖣌𖣍𖣎𖣏𖣐𖣑𖣒𖣓𖣔𖣕𖣖𖣗𖣘𖣙𖣚𖣛𖣜𖣝𖣞𖣟𖣠𖣡𖣢𖣣𖣤𖣥𖣦𖣧𖣨𖣩𖣪𖣫𖣬𖣭𖣮𖣯𖣰𖣱𖣲𖣳𖣴𖣵𖣶𖣷𖣸𖣹𖣺𖣻𖣼𖣽𖣾𖣿𖤀𖤁𖤂𖤃𖤄𖤅𖤆𖤇𖤈𖤉𖤊𖤋𖤌𖤍𖤎𖤏𖤐𖤑𖤒𖤓𖤔𖤕𖤖𖤗𖤘𖤙𖤚𖤛𖤜𖤝𖤞𖤟𖤠𖤡𖤢𖤣𖤤𖤥𖤦𖤧𖤨𖤩𖤪𖤫𖤬𖤭𖤮𖤯𖤰𖤱𖤲𖤳𖤴𖤵𖤶𖤷𖤸𖤹𖤺𖤻𖤼𖤽𖤾𖤿𖥀𖥁𖥂𖥃𖥄𖥅𖥆𖥇𖥈𖥉𖥊𖥋𖥌𖥍𖥎𖥏𖥐𖥑𖥒𖥓𖥔𖥕𖥖𖥗𖥘𖥙𖥚𖥛𖥜𖥝𖥞𖥟𖥠𖥡𖥢𖥣𖥤𖥥𖥦𖥧𖥨𖥩𖥪𖥫𖥬𖥭𖥮𖥯𖥰𖥱𖥲𖥳𖥴𖥵𖥶𖥷𖥸𖥹𖥺𖥻𖥼𖥽𖥾𖥿𖦀𖦁𖦂𖦃𖦄𖦅𖦆𖦇𖦈𖦉𖦊𖦋𖦌𖦍𖦎𖦏𖦐𖦑𖦒𖦓𖦔𖦕𖦖𖦗𖦘𖦙𖦚𖦛𖦜𖦝𖦞𖦟𖦠𖦡𖦢𖦣𖦤𖦥𖦦𖦧𖦨𖦩𖦪𖦫𖦬𖦭𖦮𖦯𖦰𖦱𖦲𖦳𖦴𖦵𖦶𖦷𖦸𖦹𖦺𖦻𖦼𖦽𖦾𖦿𖧀𖧁𖧂𖧃𖧄𖧅𖧆𖧇𖧈𖧉𖧊𖧋𖧌𖧍𖧎𖧏𖧐𖧑𖧒𖧓𖧔𖧕𖧖𖧗𖧘𖧙𖧚𖧛𖧜𖧝𖧞𖧟𖧠𖧡𖧢𖧣𖧤𖧥𖧦𖧧𖧨𖧩𖧪𖧫𖧬𖧭𖧮𖧯𖧰𖧱𖧲𖧳𖧴𖧵𖧶𖧷𖧸𖧹𖧺𖧻𖧼𖧽𖧾𖧿𖨀𖨁𖨂𖨃𖨄𖨅𖨆𖨇𖨈𖨉𖨊𖨋𖨌𖨍𖨎𖨏𖨐𖨑𖨒𖨓𖨔𖨕𖨖𖨗𖨘𖨙𖨚𖨛𖨜𖨝𖨞𖨟𖨠𖨡𖨢𖨣𖨤𖨥𖨦𖨧𖨨𖨩𖨪𖨫𖨬𖨭𖨮𖨯𖨰𖨱𖨲𖨳𖨴𖨵𖨶𖨷𖨸𛀀𛀁𫝀𫝁𫝂𫝃𫝄𫝅𫝆𫝇𫝈𫝉𫝊𫝋𫝌𫝍𫝎𫝏𫝐𫝑𫝒𫝓𫝔𫝕𫝖𫝗𫝘𫝙𫝚𫝛𫝜𫝝𫝞𫝟𫝠𫝡𫝢𫝣𫝤𫝥𫝦𫝧𫝨𫝩𫝪𫝫𫝬𫝭𫝮𫝯𫝰𫝱𫝲𫝳𫝴𫝵𫝶𫝷𫝸𫝹𫝺𫝻𫝼𫝽𫝾𫝿𫞀𫞁𫞂𫞃𫞄𫞅𫞆𫞇𫞈𫞉𫞊𫞋𫞌𫞍𫞎𫞏𫞐𫞑𫞒𫞓𫞔𫞕𫞖𫞗𫞘𫞙𫞚𫞛𫞜𫞝𫞞𫞟𫞠𫞡𫞢𫞣𫞤𫞥𫞦𫞧𫞨𫞩𫞪𫞫𫞬𫞭𫞮𫞯𫞰𫞱𫞲𫞳𫞴𫞵𫞶𫞷𫞸𫞹𫞺𫞻𫞼𫞽𫞾𫞿𫟀𫟁𫟂𫟃𫟄𫟅𫟆𫟇𫟈𫟉𫟊𫟋𫟌𫟍𫟎𫟏𫟐𫟑𫟒𫟓𫟔𫟕𫟖𫟗𫟘𫟙𫟚𫟛𫟜𫟝𫟞𫟟𫟠𫟡𫟢𫟣𫟤𫟥𫟦𫟧𫟨𫟩𫟪𫟫𫟬𫟭𫟮𫟯𫟰𫟱𫟲𫟳𫟴𫟵𫟶𫟷𫟸𫟹𫟺𫟻𫟼𫟽𫟾𫟿𫠀𫠁𫠂𫠃𫠄𫠅𫠆𫠇𫠈𫠉𫠊𫠋𫠌𫠍𫠎𫠏𫠐𫠑𫠒𫠓𫠔𫠕𫠖𫠗𫠘𫠙𫠚𫠛𫠜𫠝',
            start: 0,
            end: 1829,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 1829
              }
            }
          },
          start: 0,
          end: 1830,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1830
            }
          }
        }
      ],
      start: 0,
      end: 1830,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1830
        }
      }
    }
  ],
  [
    `var ͿԨԩԪԫԬԭԮԯࢡࢭࢮࢯࢰࢱࢲॸঀఴᛱᛲᛳᛴᛵᛶᛷᛸᤝᤞꚘꚙꚚꚛꚜꚝꞔꞕꞖꞗꞘꞙꞚꞛꞜꞝꞞꞟꞫꞬꞭꞰꞱꟷꧠꧡꧢꧣꧤꧦꧧꧨꧩꧪꧫꧬꧭꧮꧯꧺꧻꧼꧽꧾꩾꩿꬰꬱꬲꬳꬴꬵꬶꬷꬸꬹꬺꬻꬼꬽꬾꬿꭀꭁꭂꭃꭄꭅꭆꭇꭈꭉꭊꭋꭌꭍꭎꭏꭐꭑꭒꭓꭔꭕꭖꭗꭘꭙꭚꭜꭝꭞꭟꭤꭥ𐌟𐍐𐍑𐍒𐍓𐍔𐍕𐍖𐍗𐍘𐍙𐍚𐍛𐍜𐍝𐍞𐍟𐍠𐍡𐍢𐍣𐍤𐍥𐍦𐍧𐍨𐍩𐍪𐍫𐍬𐍭𐍮𐍯𐍰𐍱𐍲𐍳𐍴𐍵𐔀𐔁𐔂𐔃𐔄𐔅𐔆𐔇𐔈𐔉𐔊𐔋𐔌𐔍𐔎𐔏𐔐𐔑𐔒𐔓𐔔𐔕𐔖𐔗𐔘𐔙𐔚𐔛𐔜𐔝𐔞𐔟𐔠𐔡𐔢𐔣𐔤𐔥𐔦𐔧𐔰𐔱𐔲𐔳𐔴𐔵𐔶𐔷𐔸𐔹𐔺𐔻𐔼𐔽𐔾𐔿𐕀𐕁𐕂𐕃𐕄𐕅𐕆𐕇𐕈𐕉𐕊𐕋𐕌𐕍𐕎𐕏𐕐𐕑𐕒𐕓𐕔𐕕𐕖𐕗𐕘𐕙𐕚𐕛𐕜𐕝𐕞𐕟𐕠𐕡𐕢𐕣𐘀𐘁𐘂𐘃𐘄𐘅𐘆𐘇𐘈𐘉𐘊𐘋𐘌𐘍𐘎𐘏𐘐𐘑𐘒𐘓𐘔𐘕𐘖𐘗𐘘𐘙𐘚𐘛𐘜𐘝𐘞𐘟𐘠𐘡𐘢𐘣𐘤𐘥𐘦𐘧𐘨𐘩𐘪𐘫𐘬𐘭𐘮𐘯𐘰𐘱𐘲𐘳𐘴𐘵𐘶𐘷𐘸𐘹𐘺𐘻𐘼𐘽𐘾𐘿𐙀𐙁𐙂𐙃𐙄𐙅𐙆𐙇𐙈𐙉𐙊𐙋𐙌𐙍𐙎𐙏𐙐𐙑𐙒𐙓𐙔𐙕𐙖𐙗𐙘𐙙𐙚𐙛𐙜𐙝𐙞𐙟𐙠𐙡𐙢𐙣𐙤𐙥𐙦𐙧𐙨𐙩𐙪𐙫𐙬𐙭𐙮𐙯𐙰𐙱𐙲𐙳𐙴𐙵𐙶𐙷𐙸𐙹𐙺𐙻𐙼𐙽𐙾𐙿𐚀𐚁𐚂𐚃𐚄𐚅𐚆𐚇𐚈𐚉𐚊𐚋𐚌𐚍𐚎𐚏𐚐𐚑𐚒𐚓𐚔𐚕𐚖𐚗𐚘𐚙𐚚𐚛𐚜𐚝𐚞𐚟𐚠𐚡𐚢𐚣𐚤𐚥𐚦𐚧𐚨𐚩𐚪𐚫𐚬𐚭𐚮𐚯𐚰𐚱𐚲𐚳𐚴𐚵𐚶𐚷𐚸𐚹𐚺𐚻𐚼𐚽𐚾𐚿𐛀𐛁𐛂𐛃𐛄𐛅𐛆𐛇𐛈𐛉𐛊𐛋𐛌𐛍𐛎𐛏𐛐𐛑𐛒𐛓𐛔𐛕𐛖𐛗𐛘𐛙𐛚𐛛𐛜𐛝𐛞𐛟𐛠𐛡𐛢𐛣𐛤𐛥𐛦𐛧𐛨𐛩𐛪𐛫𐛬𐛭𐛮𐛯𐛰𐛱𐛲𐛳𐛴𐛵𐛶𐛷𐛸𐛹𐛺𐛻𐛼𐛽𐛾𐛿𐜀𐜁𐜂𐜃𐜄𐜅𐜆𐜇𐜈𐜉𐜊𐜋𐜌𐜍𐜎𐜏𐜐𐜑𐜒𐜓𐜔𐜕𐜖𐜗𐜘𐜙𐜚𐜛𐜜𐜝𐜞𐜟𐜠𐜡𐜢𐜣𐜤𐜥𐜦𐜧𐜨𐜩𐜪𐜫𐜬𐜭𐜮𐜯𐜰𐜱𐜲𐜳𐜴𐜵𐜶𐝀𐝁𐝂𐝃𐝄𐝅𐝆𐝇𐝈𐝉𐝊𐝋𐝌𐝍𐝎𐝏𐝐𐝑𐝒𐝓𐝔𐝕𐝠𐝡𐝢𐝣𐝤𐝥𐝦𐝧𐡠𐡡𐡢𐡣𐡤𐡥𐡦𐡧𐡨𐡩𐡪𐡫𐡬𐡭𐡮𐡯𐡰𐡱𐡲𐡳𐡴𐡵𐡶𐢀𐢁𐢂𐢃𐢄𐢅𐢆𐢇𐢈𐢉𐢊𐢋𐢌𐢍𐢎𐢏𐢐𐢑𐢒𐢓𐢔𐢕𐢖𐢗𐢘𐢙𐢚𐢛𐢜𐢝𐢞𐪀𐪁𐪂𐪃𐪄𐪅𐪆𐪇𐪈𐪉𐪊𐪋𐪌𐪍𐪎𐪏𐪐𐪑𐪒𐪓𐪔𐪕𐪖𐪗𐪘𐪙𐪚𐪛𐪜𐫀𐫁𐫂𐫃𐫄𐫅𐫆𐫇𐫉𐫊𐫋𐫌𐫍𐫎𐫏𐫐𐫑𐫒𐫓𐫔𐫕𐫖𐫗𐫘𐫙𐫚𐫛𐫜𐫝𐫞𐫟𐫠𐫡𐫢𐫣𐫤𐮀𐮁𐮂𐮃𐮄𐮅𐮆𐮇𐮈𐮉𐮊𐮋𐮌𐮍𐮎𐮏𐮐𐮑𑅐𑅑𑅒𑅓𑅔𑅕𑅖𑅗𑅘𑅙𑅚𑅛𑅜𑅝𑅞𑅟𑅠𑅡𑅢𑅣𑅤𑅥𑅦𑅧𑅨𑅩𑅪𑅫𑅬𑅭𑅮𑅯𑅰𑅱𑅲𑅶𑇚𑈀𑈁𑈂𑈃𑈄𑈅𑈆𑈇𑈈𑈉𑈊𑈋𑈌𑈍𑈎𑈏𑈐𑈑𑈓𑈔𑈕𑈖𑈗𑈘𑈙𑈚𑈛𑈜𑈝𑈞𑈟𑈠𑈡𑈢𑈣𑈤𑈥𑈦𑈧𑈨𑈩𑈪𑈫𑊰𑊱𑊲𑊳𑊴𑊵𑊶𑊷𑊸𑊹𑊺𑊻𑊼𑊽𑊾𑊿𑋀𑋁𑋂𑋃𑋄𑋅𑋆𑋇𑋈𑋉𑋊𑋋𑋌𑋍𑋎𑋏𑋐𑋑𑋒𑋓𑋔𑋕𑋖𑋗𑋘𑋙𑋚𑋛𑋜𑋝𑋞𑌅𑌆𑌇𑌈𑌉𑌊𑌋𑌌𑌏𑌐𑌓𑌔𑌕𑌖𑌗𑌘𑌙𑌚𑌛𑌜𑌝𑌞𑌟𑌠𑌡𑌢𑌣𑌤𑌥𑌦𑌧𑌨𑌪𑌫𑌬𑌭𑌮𑌯𑌰𑌲𑌳𑌵𑌶𑌷𑌸𑌹𑌽𑍝𑍞𑍟𑍠𑍡𑒀𑒁𑒂𑒃𑒄𑒅𑒆𑒇𑒈𑒉𑒊𑒋𑒌𑒍𑒎𑒏𑒐𑒑𑒒𑒓𑒔𑒕𑒖𑒗𑒘𑒙𑒚𑒛𑒜𑒝𑒞𑒟𑒠𑒡𑒢𑒣𑒤𑒥𑒦𑒧𑒨𑒩𑒪𑒫𑒬𑒭𑒮𑒯𑓄𑓅𑓇𑖀𑖁𑖂𑖃𑖄𑖅𑖆𑖇𑖈𑖉𑖊𑖋𑖌𑖍𑖎𑖏𑖐𑖑𑖒𑖓𑖔𑖕𑖖𑖗𑖘𑖙𑖚𑖛𑖜𑖝𑖞𑖟𑖠𑖡𑖢𑖣𑖤𑖥𑖦𑖧𑖨𑖩𑖪𑖫𑖬𑖭𑖮𑘀𑘁𑘂𑘃𑘄𑘅𑘆𑘇𑘈𑘉𑘊𑘋𑘌𑘍𑘎𑘏𑘐𑘑𑘒𑘓𑘔𑘕𑘖𑘗𑘘𑘙𑘚𑘛𑘜𑘝𑘞𑘟𑘠𑘡𑘢𑘣𑘤𑘥𑘦𑘧𑘨𑘩𑘪𑘫𑘬𑘭𑘮𑘯𑙄𑢠𑢡𑢢𑢣𑢤𑢥𑢦𑢧𑢨𑢩𑢪𑢫𑢬𑢭𑢮𑢯𑢰𑢱𑢲𑢳𑢴𑢵𑢶𑢷𑢸𑢹𑢺𑢻𑢼𑢽𑢾𑢿𑣀𑣁𑣂𑣃𑣄𑣅𑣆𑣇𑣈𑣉𑣊𑣋𑣌𑣍𑣎𑣏𑣐𑣑𑣒𑣓𑣔𑣕𑣖𑣗𑣘𑣙𑣚𑣛𑣜𑣝𑣞𑣟𑣿𑫀𑫁𑫂𑫃𑫄𑫅𑫆𑫇𑫈𑫉𑫊𑫋𑫌𑫍𑫎𑫏𑫐𑫑𑫒𑫓𑫔𑫕𑫖𑫗𑫘𑫙𑫚𑫛𑫜𑫝𑫞𑫟𑫠𑫡𑫢𑫣𑫤𑫥𑫦𑫧𑫨𑫩𑫪𑫫𑫬𑫭𑫮𑫯𑫰𑫱𑫲𑫳𑫴𑫵𑫶𑫷𑫸𒍯𒍰𒍱𒍲𒍳𒍴𒍵𒍶𒍷𒍸𒍹𒍺𒍻𒍼𒍽𒍾𒍿𒎀𒎁𒎂𒎃𒎄𒎅𒎆𒎇𒎈𒎉𒎊𒎋𒎌𒎍𒎎𒎏𒎐𒎑𒎒𒎓𒎔𒎕𒎖𒎗𒎘𒑣𒑤𒑥𒑦𒑧𒑨𒑩𒑪𒑫𒑬𒑭𒑮𖩀𖩁𖩂𖩃𖩄𖩅𖩆𖩇𖩈𖩉𖩊𖩋𖩌𖩍𖩎𖩏𖩐𖩑𖩒𖩓𖩔𖩕𖩖𖩗𖩘𖩙𖩚𖩛𖩜𖩝𖩞𖫐𖫑𖫒𖫓𖫔𖫕𖫖𖫗𖫘𖫙𖫚𖫛𖫜𖫝𖫞𖫟𖫠𖫡𖫢𖫣𖫤𖫥𖫦𖫧𖫨𖫩𖫪𖫫𖫬𖫭𖬀𖬁𖬂𖬃𖬄𖬅𖬆𖬇𖬈𖬉𖬊𖬋𖬌𖬍𖬎𖬏𖬐𖬑𖬒𖬓𖬔𖬕𖬖𖬗𖬘𖬙𖬚𖬛𖬜𖬝𖬞𖬟𖬠𖬡𖬢𖬣𖬤𖬥𖬦𖬧𖬨𖬩𖬪𖬫𖬬𖬭𖬮𖬯𖭀𖭁𖭂𖭃𖭣𖭤𖭥𖭦𖭧𖭨𖭩𖭪𖭫𖭬𖭭𖭮𖭯𖭰𖭱𖭲𖭳𖭴𖭵𖭶𖭷𖭽𖭾𖭿𖮀𖮁𖮂𖮃𖮄𖮅𖮆𖮇𖮈𖮉𖮊𖮋𖮌𖮍𖮎𖮏𛰀𛰁𛰂𛰃𛰄𛰅𛰆𛰇𛰈𛰉𛰊𛰋𛰌𛰍𛰎𛰏𛰐𛰑𛰒𛰓𛰔𛰕𛰖𛰗𛰘𛰙𛰚𛰛𛰜𛰝𛰞𛰟𛰠𛰡𛰢𛰣𛰤𛰥𛰦𛰧𛰨𛰩𛰪𛰫𛰬𛰭𛰮𛰯𛰰𛰱𛰲𛰳𛰴𛰵𛰶𛰷𛰸𛰹𛰺𛰻𛰼𛰽𛰾𛰿𛱀𛱁𛱂𛱃𛱄𛱅𛱆𛱇𛱈𛱉𛱊𛱋𛱌𛱍𛱎𛱏𛱐𛱑𛱒𛱓𛱔𛱕𛱖𛱗𛱘𛱙𛱚𛱛𛱜𛱝𛱞𛱟𛱠𛱡𛱢𛱣𛱤𛱥𛱦𛱧𛱨𛱩𛱪𛱰𛱱𛱲𛱳𛱴𛱵𛱶𛱷𛱸𛱹𛱺𛱻𛱼𛲀𛲁𛲂𛲃𛲄𛲅𛲆𛲇𛲈𛲐𛲑𛲒𛲓𛲔𛲕𛲖𛲗𛲘𛲙𞠀𞠁𞠂𞠃𞠄𞠅𞠆𞠇𞠈𞠉𞠊𞠋𞠌𞠍𞠎𞠏𞠐𞠑𞠒𞠓𞠔𞠕𞠖𞠗𞠘𞠙𞠚𞠛𞠜𞠝𞠞𞠟𞠠𞠡𞠢𞠣𞠤𞠥𞠦𞠧𞠨𞠩𞠪𞠫𞠬𞠭𞠮𞠯𞠰𞠱𞠲𞠳𞠴𞠵𞠶𞠷𞠸𞠹𞠺𞠻𞠼𞠽𞠾𞠿𞡀𞡁𞡂𞡃𞡄𞡅𞡆𞡇𞡈𞡉𞡊𞡋𞡌𞡍𞡎𞡏𞡐𞡑𞡒𞡓𞡔𞡕𞡖𞡗𞡘𞡙𞡚𞡛𞡜𞡝𞡞𞡟𞡠𞡡𞡢𞡣𞡤𞡥𞡦𞡧𞡨𞡩𞡪𞡫𞡬𞡭𞡮𞡯𞡰𞡱𞡲𞡳𞡴𞡵𞡶𞡷𞡸𞡹𞡺𞡻𞡼𞡽𞡾𞡿𞢀𞢁𞢂𞢃𞢄𞢅𞢆𞢇𞢈𞢉𞢊𞢋𞢌𞢍𞢎𞢏𞢐𞢑𞢒𞢓𞢔𞢕𞢖𞢗𞢘𞢙𞢚𞢛𞢜𞢝𞢞𞢟𞢠𞢡𞢢𞢣𞢤𞢥𞢦𞢧𞢨𞢩𞢪𞢫𞢬𞢭𞢮𞢯𞢰𞢱𞢲𞢳𞢴𞢵𞢶𞢷𞢸𞢹𞢺𞢻𞢼𞢽𞢾𞢿𞣀𞣁𞣂𞣃𞣄;`,
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
                name:
                  'ͿԨԩԪԫԬԭԮԯࢡࢭࢮࢯࢰࢱࢲॸঀఴᛱᛲᛳᛴᛵᛶᛷᛸᤝᤞꚘꚙꚚꚛꚜꚝꞔꞕꞖꞗꞘꞙꞚꞛꞜꞝꞞꞟꞫꞬꞭꞰꞱꟷꧠꧡꧢꧣꧤꧦꧧꧨꧩꧪꧫꧬꧭꧮꧯꧺꧻꧼꧽꧾꩾꩿꬰꬱꬲꬳꬴꬵꬶꬷꬸꬹꬺꬻꬼꬽꬾꬿꭀꭁꭂꭃꭄꭅꭆꭇꭈꭉꭊꭋꭌꭍꭎꭏꭐꭑꭒꭓꭔꭕꭖꭗꭘꭙꭚꭜꭝꭞꭟꭤꭥ𐌟𐍐𐍑𐍒𐍓𐍔𐍕𐍖𐍗𐍘𐍙𐍚𐍛𐍜𐍝𐍞𐍟𐍠𐍡𐍢𐍣𐍤𐍥𐍦𐍧𐍨𐍩𐍪𐍫𐍬𐍭𐍮𐍯𐍰𐍱𐍲𐍳𐍴𐍵𐔀𐔁𐔂𐔃𐔄𐔅𐔆𐔇𐔈𐔉𐔊𐔋𐔌𐔍𐔎𐔏𐔐𐔑𐔒𐔓𐔔𐔕𐔖𐔗𐔘𐔙𐔚𐔛𐔜𐔝𐔞𐔟𐔠𐔡𐔢𐔣𐔤𐔥𐔦𐔧𐔰𐔱𐔲𐔳𐔴𐔵𐔶𐔷𐔸𐔹𐔺𐔻𐔼𐔽𐔾𐔿𐕀𐕁𐕂𐕃𐕄𐕅𐕆𐕇𐕈𐕉𐕊𐕋𐕌𐕍𐕎𐕏𐕐𐕑𐕒𐕓𐕔𐕕𐕖𐕗𐕘𐕙𐕚𐕛𐕜𐕝𐕞𐕟𐕠𐕡𐕢𐕣𐘀𐘁𐘂𐘃𐘄𐘅𐘆𐘇𐘈𐘉𐘊𐘋𐘌𐘍𐘎𐘏𐘐𐘑𐘒𐘓𐘔𐘕𐘖𐘗𐘘𐘙𐘚𐘛𐘜𐘝𐘞𐘟𐘠𐘡𐘢𐘣𐘤𐘥𐘦𐘧𐘨𐘩𐘪𐘫𐘬𐘭𐘮𐘯𐘰𐘱𐘲𐘳𐘴𐘵𐘶𐘷𐘸𐘹𐘺𐘻𐘼𐘽𐘾𐘿𐙀𐙁𐙂𐙃𐙄𐙅𐙆𐙇𐙈𐙉𐙊𐙋𐙌𐙍𐙎𐙏𐙐𐙑𐙒𐙓𐙔𐙕𐙖𐙗𐙘𐙙𐙚𐙛𐙜𐙝𐙞𐙟𐙠𐙡𐙢𐙣𐙤𐙥𐙦𐙧𐙨𐙩𐙪𐙫𐙬𐙭𐙮𐙯𐙰𐙱𐙲𐙳𐙴𐙵𐙶𐙷𐙸𐙹𐙺𐙻𐙼𐙽𐙾𐙿𐚀𐚁𐚂𐚃𐚄𐚅𐚆𐚇𐚈𐚉𐚊𐚋𐚌𐚍𐚎𐚏𐚐𐚑𐚒𐚓𐚔𐚕𐚖𐚗𐚘𐚙𐚚𐚛𐚜𐚝𐚞𐚟𐚠𐚡𐚢𐚣𐚤𐚥𐚦𐚧𐚨𐚩𐚪𐚫𐚬𐚭𐚮𐚯𐚰𐚱𐚲𐚳𐚴𐚵𐚶𐚷𐚸𐚹𐚺𐚻𐚼𐚽𐚾𐚿𐛀𐛁𐛂𐛃𐛄𐛅𐛆𐛇𐛈𐛉𐛊𐛋𐛌𐛍𐛎𐛏𐛐𐛑𐛒𐛓𐛔𐛕𐛖𐛗𐛘𐛙𐛚𐛛𐛜𐛝𐛞𐛟𐛠𐛡𐛢𐛣𐛤𐛥𐛦𐛧𐛨𐛩𐛪𐛫𐛬𐛭𐛮𐛯𐛰𐛱𐛲𐛳𐛴𐛵𐛶𐛷𐛸𐛹𐛺𐛻𐛼𐛽𐛾𐛿𐜀𐜁𐜂𐜃𐜄𐜅𐜆𐜇𐜈𐜉𐜊𐜋𐜌𐜍𐜎𐜏𐜐𐜑𐜒𐜓𐜔𐜕𐜖𐜗𐜘𐜙𐜚𐜛𐜜𐜝𐜞𐜟𐜠𐜡𐜢𐜣𐜤𐜥𐜦𐜧𐜨𐜩𐜪𐜫𐜬𐜭𐜮𐜯𐜰𐜱𐜲𐜳𐜴𐜵𐜶𐝀𐝁𐝂𐝃𐝄𐝅𐝆𐝇𐝈𐝉𐝊𐝋𐝌𐝍𐝎𐝏𐝐𐝑𐝒𐝓𐝔𐝕𐝠𐝡𐝢𐝣𐝤𐝥𐝦𐝧𐡠𐡡𐡢𐡣𐡤𐡥𐡦𐡧𐡨𐡩𐡪𐡫𐡬𐡭𐡮𐡯𐡰𐡱𐡲𐡳𐡴𐡵𐡶𐢀𐢁𐢂𐢃𐢄𐢅𐢆𐢇𐢈𐢉𐢊𐢋𐢌𐢍𐢎𐢏𐢐𐢑𐢒𐢓𐢔𐢕𐢖𐢗𐢘𐢙𐢚𐢛𐢜𐢝𐢞𐪀𐪁𐪂𐪃𐪄𐪅𐪆𐪇𐪈𐪉𐪊𐪋𐪌𐪍𐪎𐪏𐪐𐪑𐪒𐪓𐪔𐪕𐪖𐪗𐪘𐪙𐪚𐪛𐪜𐫀𐫁𐫂𐫃𐫄𐫅𐫆𐫇𐫉𐫊𐫋𐫌𐫍𐫎𐫏𐫐𐫑𐫒𐫓𐫔𐫕𐫖𐫗𐫘𐫙𐫚𐫛𐫜𐫝𐫞𐫟𐫠𐫡𐫢𐫣𐫤𐮀𐮁𐮂𐮃𐮄𐮅𐮆𐮇𐮈𐮉𐮊𐮋𐮌𐮍𐮎𐮏𐮐𐮑𑅐𑅑𑅒𑅓𑅔𑅕𑅖𑅗𑅘𑅙𑅚𑅛𑅜𑅝𑅞𑅟𑅠𑅡𑅢𑅣𑅤𑅥𑅦𑅧𑅨𑅩𑅪𑅫𑅬𑅭𑅮𑅯𑅰𑅱𑅲𑅶𑇚𑈀𑈁𑈂𑈃𑈄𑈅𑈆𑈇𑈈𑈉𑈊𑈋𑈌𑈍𑈎𑈏𑈐𑈑𑈓𑈔𑈕𑈖𑈗𑈘𑈙𑈚𑈛𑈜𑈝𑈞𑈟𑈠𑈡𑈢𑈣𑈤𑈥𑈦𑈧𑈨𑈩𑈪𑈫𑊰𑊱𑊲𑊳𑊴𑊵𑊶𑊷𑊸𑊹𑊺𑊻𑊼𑊽𑊾𑊿𑋀𑋁𑋂𑋃𑋄𑋅𑋆𑋇𑋈𑋉𑋊𑋋𑋌𑋍𑋎𑋏𑋐𑋑𑋒𑋓𑋔𑋕𑋖𑋗𑋘𑋙𑋚𑋛𑋜𑋝𑋞𑌅𑌆𑌇𑌈𑌉𑌊𑌋𑌌𑌏𑌐𑌓𑌔𑌕𑌖𑌗𑌘𑌙𑌚𑌛𑌜𑌝𑌞𑌟𑌠𑌡𑌢𑌣𑌤𑌥𑌦𑌧𑌨𑌪𑌫𑌬𑌭𑌮𑌯𑌰𑌲𑌳𑌵𑌶𑌷𑌸𑌹𑌽𑍝𑍞𑍟𑍠𑍡𑒀𑒁𑒂𑒃𑒄𑒅𑒆𑒇𑒈𑒉𑒊𑒋𑒌𑒍𑒎𑒏𑒐𑒑𑒒𑒓𑒔𑒕𑒖𑒗𑒘𑒙𑒚𑒛𑒜𑒝𑒞𑒟𑒠𑒡𑒢𑒣𑒤𑒥𑒦𑒧𑒨𑒩𑒪𑒫𑒬𑒭𑒮𑒯𑓄𑓅𑓇𑖀𑖁𑖂𑖃𑖄𑖅𑖆𑖇𑖈𑖉𑖊𑖋𑖌𑖍𑖎𑖏𑖐𑖑𑖒𑖓𑖔𑖕𑖖𑖗𑖘𑖙𑖚𑖛𑖜𑖝𑖞𑖟𑖠𑖡𑖢𑖣𑖤𑖥𑖦𑖧𑖨𑖩𑖪𑖫𑖬𑖭𑖮𑘀𑘁𑘂𑘃𑘄𑘅𑘆𑘇𑘈𑘉𑘊𑘋𑘌𑘍𑘎𑘏𑘐𑘑𑘒𑘓𑘔𑘕𑘖𑘗𑘘𑘙𑘚𑘛𑘜𑘝𑘞𑘟𑘠𑘡𑘢𑘣𑘤𑘥𑘦𑘧𑘨𑘩𑘪𑘫𑘬𑘭𑘮𑘯𑙄𑢠𑢡𑢢𑢣𑢤𑢥𑢦𑢧𑢨𑢩𑢪𑢫𑢬𑢭𑢮𑢯𑢰𑢱𑢲𑢳𑢴𑢵𑢶𑢷𑢸𑢹𑢺𑢻𑢼𑢽𑢾𑢿𑣀𑣁𑣂𑣃𑣄𑣅𑣆𑣇𑣈𑣉𑣊𑣋𑣌𑣍𑣎𑣏𑣐𑣑𑣒𑣓𑣔𑣕𑣖𑣗𑣘𑣙𑣚𑣛𑣜𑣝𑣞𑣟𑣿𑫀𑫁𑫂𑫃𑫄𑫅𑫆𑫇𑫈𑫉𑫊𑫋𑫌𑫍𑫎𑫏𑫐𑫑𑫒𑫓𑫔𑫕𑫖𑫗𑫘𑫙𑫚𑫛𑫜𑫝𑫞𑫟𑫠𑫡𑫢𑫣𑫤𑫥𑫦𑫧𑫨𑫩𑫪𑫫𑫬𑫭𑫮𑫯𑫰𑫱𑫲𑫳𑫴𑫵𑫶𑫷𑫸𒍯𒍰𒍱𒍲𒍳𒍴𒍵𒍶𒍷𒍸𒍹𒍺𒍻𒍼𒍽𒍾𒍿𒎀𒎁𒎂𒎃𒎄𒎅𒎆𒎇𒎈𒎉𒎊𒎋𒎌𒎍𒎎𒎏𒎐𒎑𒎒𒎓𒎔𒎕𒎖𒎗𒎘𒑣𒑤𒑥𒑦𒑧𒑨𒑩𒑪𒑫𒑬𒑭𒑮𖩀𖩁𖩂𖩃𖩄𖩅𖩆𖩇𖩈𖩉𖩊𖩋𖩌𖩍𖩎𖩏𖩐𖩑𖩒𖩓𖩔𖩕𖩖𖩗𖩘𖩙𖩚𖩛𖩜𖩝𖩞𖫐𖫑𖫒𖫓𖫔𖫕𖫖𖫗𖫘𖫙𖫚𖫛𖫜𖫝𖫞𖫟𖫠𖫡𖫢𖫣𖫤𖫥𖫦𖫧𖫨𖫩𖫪𖫫𖫬𖫭𖬀𖬁𖬂𖬃𖬄𖬅𖬆𖬇𖬈𖬉𖬊𖬋𖬌𖬍𖬎𖬏𖬐𖬑𖬒𖬓𖬔𖬕𖬖𖬗𖬘𖬙𖬚𖬛𖬜𖬝𖬞𖬟𖬠𖬡𖬢𖬣𖬤𖬥𖬦𖬧𖬨𖬩𖬪𖬫𖬬𖬭𖬮𖬯𖭀𖭁𖭂𖭃𖭣𖭤𖭥𖭦𖭧𖭨𖭩𖭪𖭫𖭬𖭭𖭮𖭯𖭰𖭱𖭲𖭳𖭴𖭵𖭶𖭷𖭽𖭾𖭿𖮀𖮁𖮂𖮃𖮄𖮅𖮆𖮇𖮈𖮉𖮊𖮋𖮌𖮍𖮎𖮏𛰀𛰁𛰂𛰃𛰄𛰅𛰆𛰇𛰈𛰉𛰊𛰋𛰌𛰍𛰎𛰏𛰐𛰑𛰒𛰓𛰔𛰕𛰖𛰗𛰘𛰙𛰚𛰛𛰜𛰝𛰞𛰟𛰠𛰡𛰢𛰣𛰤𛰥𛰦𛰧𛰨𛰩𛰪𛰫𛰬𛰭𛰮𛰯𛰰𛰱𛰲𛰳𛰴𛰵𛰶𛰷𛰸𛰹𛰺𛰻𛰼𛰽𛰾𛰿𛱀𛱁𛱂𛱃𛱄𛱅𛱆𛱇𛱈𛱉𛱊𛱋𛱌𛱍𛱎𛱏𛱐𛱑𛱒𛱓𛱔𛱕𛱖𛱗𛱘𛱙𛱚𛱛𛱜𛱝𛱞𛱟𛱠𛱡𛱢𛱣𛱤𛱥𛱦𛱧𛱨𛱩𛱪𛱰𛱱𛱲𛱳𛱴𛱵𛱶𛱷𛱸𛱹𛱺𛱻𛱼𛲀𛲁𛲂𛲃𛲄𛲅𛲆𛲇𛲈𛲐𛲑𛲒𛲓𛲔𛲕𛲖𛲗𛲘𛲙𞠀𞠁𞠂𞠃𞠄𞠅𞠆𞠇𞠈𞠉𞠊𞠋𞠌𞠍𞠎𞠏𞠐𞠑𞠒𞠓𞠔𞠕𞠖𞠗𞠘𞠙𞠚𞠛𞠜𞠝𞠞𞠟𞠠𞠡𞠢𞠣𞠤𞠥𞠦𞠧𞠨𞠩𞠪𞠫𞠬𞠭𞠮𞠯𞠰𞠱𞠲𞠳𞠴𞠵𞠶𞠷𞠸𞠹𞠺𞠻𞠼𞠽𞠾𞠿𞡀𞡁𞡂𞡃𞡄𞡅𞡆𞡇𞡈𞡉𞡊𞡋𞡌𞡍𞡎𞡏𞡐𞡑𞡒𞡓𞡔𞡕𞡖𞡗𞡘𞡙𞡚𞡛𞡜𞡝𞡞𞡟𞡠𞡡𞡢𞡣𞡤𞡥𞡦𞡧𞡨𞡩𞡪𞡫𞡬𞡭𞡮𞡯𞡰𞡱𞡲𞡳𞡴𞡵𞡶𞡷𞡸𞡹𞡺𞡻𞡼𞡽𞡾𞡿𞢀𞢁𞢂𞢃𞢄𞢅𞢆𞢇𞢈𞢉𞢊𞢋𞢌𞢍𞢎𞢏𞢐𞢑𞢒𞢓𞢔𞢕𞢖𞢗𞢘𞢙𞢚𞢛𞢜𞢝𞢞𞢟𞢠𞢡𞢢𞢣𞢤𞢥𞢦𞢧𞢨𞢩𞢪𞢫𞢬𞢭𞢮𞢯𞢰𞢱𞢲𞢳𞢴𞢵𞢶𞢷𞢸𞢹𞢺𞢻𞢼𞢽𞢾𞢿𞣀𞣁𞣂𞣃𞣄',
                start: 4,
                end: 3328,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 3328
                  }
                }
              },
              start: 4,
              end: 3328,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 3328
                }
              }
            }
          ],
          start: 0,
          end: 3329,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 3329
            }
          }
        }
      ],
      start: 0,
      end: 3329,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 3329
        }
      }
    }
  ],
  [
    `var \\u08B3\\u08B4\\u0AF9\\u0C5A\\u0D5F\\u13F5\\u13F8\\u13F9\\u13FA\\u13FB\\u13FC\\u13FD\\u19B0\\u19B1\\u19B2\\u19B3\\u19B4\\u19B5\\u19B6\\u19B7\\u19B8\\u19B9\\u19BA\\u19BB\\u19BC\\u19BD\\u19BE\\u19BF\\u19C0\\u19C8\\u19C9\\u9FCD\\u9FCE\\u9FCF\\u9FD0\\u9FD1\\u9FD2\\u9FD3\\u9FD4\\u9FD5\\uA78F\\uA7B2\\uA7B3\\uA7B4\\uA7B5\\uA7B6\\uA7B7\\uA8FD\\uAB60\\uAB61\\uAB62\\uAB63\\uAB70\\uAB71\\uAB72\\uAB73\\uAB74\\uAB75\\uAB76\\uAB77\\uAB78\\uAB79\\uAB7A\\uAB7B\\uAB7C\\uAB7D\\uAB7E\\uAB7F\\uAB80\\uAB81\\uAB82\\uAB83\\uAB84\\uAB85\\uAB86\\uAB87\\uAB88\\uAB89\\uAB8A\\uAB8B\\uAB8C\\uAB8D\\uAB8E\\uAB8F\\uAB90\\uAB91\\uAB92\\uAB93\\uAB94\\uAB95\\uAB96\\uAB97\\uAB98\\uAB99\\uAB9A\\uAB9B\\uAB9C\\uAB9D\\uAB9E\\uAB9F\\uABA0\\uABA1\\uABA2\\uABA3\\uABA4\\uABA5\\uABA6\\uABA7\\uABA8\\uABA9\\uABAA\\uABAB\\uABAC\\uABAD\\uABAE\\uABAF\\uABB0\\uABB1\\uABB2\\uABB3\\uABB4\\uABB5\\uABB6\\uABB7\\uABB8\\uABB9\\uABBA\\uABBB\\uABBC\\uABBD\\uABBE\\uABBF\\u{108E0}\\u{108E1}\\u{108E2}\\u{108E3}\\u{108E4}\\u{108E5}\\u{108E6}\\u{108E7}\\u{108E8}\\u{108E9}\\u{108EA}\\u{108EB}\\u{108EC}\\u{108ED}\\u{108EE}\\u{108EF}\\u{108F0}\\u{108F1}\\u{108F2}\\u{108F4}\\u{108F5}\\u{10C80}\\u{10C81}\\u{10C82}\\u{10C83}\\u{10C84}\\u{10C85}\\u{10C86}\\u{10C87}\\u{10C88}\\u{10C89}\\u{10C8A}\\u{10C8B}\\u{10C8C}\\u{10C8D}\\u{10C8E}\\u{10C8F}\\u{10C90}\\u{10C91}\\u{10C92}\\u{10C93}\\u{10C94}\\u{10C95}\\u{10C96}\\u{10C97}\\u{10C98}\\u{10C99}\\u{10C9A}\\u{10C9B}\\u{10C9C}\\u{10C9D}\\u{10C9E}\\u{10C9F}\\u{10CA0}\\u{10CA1}\\u{10CA2}\\u{10CA3}\\u{10CA4}\\u{10CA5}\\u{10CA6}\\u{10CA7}\\u{10CA8}\\u{10CA9}\\u{10CAA}\\u{10CAB}\\u{10CAC}\\u{10CAD}\\u{10CAE}\\u{10CAF}\\u{10CB0}\\u{10CB1}\\u{10CB2}\\u{10CC0}\\u{10CC1}\\u{10CC2}\\u{10CC3}\\u{10CC4}\\u{10CC5}\\u{10CC6}\\u{10CC7}\\u{10CC8}\\u{10CC9}\\u{10CCA}\\u{10CCB}\\u{10CCC}\\u{10CCD}\\u{10CCE}\\u{10CCF}\\u{10CD0}\\u{10CD1}\\u{10CD2}\\u{10CD3}\\u{10CD4}\\u{10CD5}\\u{10CD6}\\u{10CD7}\\u{10CD8}\\u{10CD9}\\u{10CDA}\\u{10CDB}\\u{10CDC}\\u{10CDD}\\u{10CDE}\\u{10CDF}\\u{10CE0}\\u{10CE1}\\u{10CE2}\\u{10CE3}\\u{10CE4}\\u{10CE5}\\u{10CE6}\\u{10CE7}\\u{10CE8}\\u{10CE9}\\u{10CEA}\\u{10CEB}\\u{10CEC}\\u{10CED}\\u{10CEE}\\u{10CEF}\\u{10CF0}\\u{10CF1}\\u{10CF2}\\u{111DC}`,
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
                name:
                  'ࢳࢴૹౚൟᏵᏸᏹᏺᏻᏼᏽᦰᦱᦲᦳᦴᦵᦶᦷᦸᦹᦺᦻᦼᦽᦾᦿᧀᧈᧉ鿍鿎鿏鿐鿑鿒鿓鿔鿕ꞏꞲꞳꞴꞵꞶꞷꣽꭠꭡꭢꭣꭰꭱꭲꭳꭴꭵꭶꭷꭸꭹꭺꭻꭼꭽꭾꭿꮀꮁꮂꮃꮄꮅꮆꮇꮈꮉꮊꮋꮌꮍꮎꮏꮐꮑꮒꮓꮔꮕꮖꮗꮘꮙꮚꮛꮜꮝꮞꮟꮠꮡꮢꮣꮤꮥꮦꮧꮨꮩꮪꮫꮬꮭꮮꮯꮰꮱꮲꮳꮴꮵꮶꮷꮸꮹꮺꮻꮼꮽꮾꮿBàBáBâBãBäBåBæBçBèBéBêBëBìBíBîBïBðBñBòBôBõCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC C¡C¢C£C¤C¥C¦C§C¨C©CªC«C¬C­C®C¯C°C±C²CÀCÁCÂCÃCÄCÅCÆCÇCÈCÉCÊCËCÌCÍCÎCÏCÐCÑCÒCÓCÔCÕCÖC×CØCÙCÚCÛCÜCÝCÞCßCàCáCâCãCäCåCæCçCèCéCêCëCìCíCîCïCðCñCòDǜ',
                start: 4,
                end: 1912,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 1912
                  }
                }
              },
              start: 4,
              end: 1912,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 1912
                }
              }
            }
          ],
          start: 0,
          end: 1912,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 1912
            }
          }
        }
      ],
      start: 0,
      end: 1912,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 1912
        }
      }
    }
  ],
  [
    `ࢳ`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'ࢳ',
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
        }
      ],
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
    }
  ],
  [
    `ൟᏵ`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'ൟᏵ',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          start: 0,
          end: 2,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        }
      ],
      start: 0,
      end: 2,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  [
    `ᦻᦼ`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'ᦻᦼ',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          start: 0,
          end: 2,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        }
      ],
      start: 0,
      end: 2,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  [
    `ᧈᧉ`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name: 'ᧈᧉ',
            start: 0,
            end: 2,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 2
              }
            }
          },
          start: 0,
          end: 2,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 2
            }
          }
        }
      ],
      start: 0,
      end: 2,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 2
        }
      }
    }
  ],
  [
    `\\u{30FEF}\\u{30FF0}\\u{30FF1}\\u{30FF2}\\u{30FF3}\\u{30FF4}\\u{30FF5}\\u{30FF6}\\u{30FF7}\\u{30FF8}\\u{30FF9}\\u{30FFA}\\u{30FFB}\\u{30FFC}\\u{30FFD}\\u{30FFE}\\u{30FFF}\\u{31000}\\u{31001}\\u{31002}\\u{31003}\\u{31004}\\u{31005}\\u{31006}\\u{31007}\\u{31008}\\u{31009}\\u{3100A}\\u{3100B}\\u{3100C}\\u{3100D}\\u{3100E}\\u{3100F}\\u{31010}\\u{31011}\\u{31012}\\u{31013}\\u{31014}\\u{31015}\\u{31016}\\u{31017}\\u{31018}\\u{31019}\\u{3101A}\\u{3101B}\\u{3101C}\\u{3101D}\\u{3101E}\\u{3101F}\\u{31020}\\u{31021}\\u{31022}\\u{31023}\\u{31024}\\u{31025}\\u{31026}\\u{31027}\\u{31028}\\u{31029}\\u{3102A}\\u{3102B}\\u{3102C}\\u{3102D}\\u{3102E}\\u{3102F}\\u{31030}\\u{31031}\\u{31032}\\u{31033}\\u{31034}\\u{31035}\\u{31036}\\u{31037}\\u{31038}\\u{31039}\\u{3103A}\\u{3103B}\\u{3103C}\\u{3103D}\\u{3103E}\\u{3103F}\\u{31040}\\u{31041}\\u{31042}\\u{31043}\\u{31044}\\u{31045}\\u{31046}\\u{31047}\\u{31048}\\u{31049}\\u{3104A}\\u{3104B}\\u{3104C}\\u{3104D}\\u{3104E}\\u{3104F}\\u{31050}\\u{31051}\\u{31052}\\u{31053}\\u{31054}\\u{31055}\\u{31056}\\u{31057}\\u{31058}\\u{31059}\\u{3105A}\\u{3105B}\\u{3105C}\\u{3105D}\\u{3105E}\\u{3105F}\\u{31060}\\u{31061}\\u{31062}\\u{31063}\\u{31064}\\u{31065}\\u{31066}\\u{31067}\\u{31068}\\u{31069}\\u{3106A}\\u{3106B}\\u{3106C}\\u{3106D}\\u{3106E}\\u{3106F}\\u{31070}\\u{31071}\\u{31072}\\u{31073}\\u{31074}\\u{31075}\\u{31076}\\u{31077}\\u{31078}\\u{31079}\\u{3107A}\\u{3107B}\\u{3107C}\\u{3107D}\\u{3107E}\\u{3107F}\\u{31080}\\u{31081}\\u{31082}\\u{31083}\\u{31084}\\u{31085}\\u{31086}\\u{31087}\\u{31088}\\u{31089}\\u{3108A}\\u{3108B}\\u{3108C}\\u{3108D}\\u{3108E}\\u{3108F}\\u{31090}\\u{31091}\\u{31092}\\u{31093}\\u{31094}\\u{31095}\\u{31096}\\u{31097}\\u{31098}\\u{31099}\\u{3109A}\\u{3109B}\\u{3109C}\\u{3109D}\\u{3109E}\\u{3109F}\\u{310A0}\\u{310A1}\\u{310A2}\\u{310A3}\\u{310A4}\\u{310A5}\\u{310A6}\\u{310A7}\\u{310A8}\\u{310A9}\\u{310AA}\\u{310AB}\\u{310AC}\\u{310AD}\\u{310AE}\\u{310AF}\\u{310B0}\\u{310B1}\\u{310B2}\\u{310B3}\\u{310B4}\\u{310B5}\\u{310B6}\\u{310B7}\\u{310B8}\\u{310B9}\\u{310BA}\\u{310BB}\\u{310BC}\\u{310BD}\\u{310BE}\\u{310BF}\\u{310C0}\\u{310C1}\\u{310C2}\\u{310C3}\\u{310C4}\\u{310C5}\\u{310C6}\\u{310C7}\\u{310C8}\\u{310C9}\\u{310CA}\\u{310CB}\\u{310CC}\\u{310CD}\\u{310CE}\\u{310CF}\\u{310D0}\\u{310D1}\\u{310D2}\\u{310D3}\\u{310D4}\\u{310D5}\\u{310D6}\\u{310D7}\\u{310D8}\\u{310D9}\\u{310DA}\\u{310DB}\\u{310DC}\\u{310DD}\\u{310DE}\\u{310DF}\\u{310E0}\\u{310E1}\\u{310E2}\\u{310E3}\\u{310E4}\\u{310E5}\\u{310E6}\\u{310E7}\\u{310E8}\\u{310E9}\\u{310EA}\\u{310EB}\\u{310EC}\\u{310ED}\\u{310EE}\\u{310EF}\\u{310F0}\\u{310F1}\\u{310F2}\\u{310F3}\\u{310F4}\\u{310F5}\\u{310F6}\\u{310F7}\\u{310F8}\\u{310F9}\\u{310FA}\\u{310FB}\\u{310FC}\\u{310FD}\\u{310FE}\\u{310FF}\\u{31100}\\u{31101}\\u{31102}\\u{31103}\\u{31104}\\u{31105}\\u{31106}\\u{31107}\\u{31108}\\u{31109}\\u{3110A}\\u{3110B}\\u{3110C}\\u{3110D}\\u{3110E}\\u{3110F}\\u{31110}\\u{31111}\\u{31112}\\u{31113}\\u{31114}\\u{31115}\\u{31116}\\u{31117}\\u{31118}\\u{31119}\\u{3111A}\\u{3111B}\\u{3111C}\\u{3111D}\\u{3111E}\\u{3111F}\\u{31120}\\u{31121}\\u{31122}\\u{31123}\\u{31124}\\u{31125}\\u{31126}\\u{31127}\\u{31128}\\u{31129}\\u{3112A}\\u{3112B}\\u{3112C}\\u{3112D}\\u{3112E}\\u{3112F}\\u{31130}\\u{31131}\\u{31132}\\u{31133}\\u{31134}\\u{31135}\\u{31136}\\u{31137}\\u{31138}\\u{31139}\\u{3113A}\\u{3113B}\\u{3113C}\\u{3113D}\\u{3113E}\\u{3113F}\\u{31140}\\u{31141}\\u{31142}\\u{31143}\\u{31144}\\u{31145}\\u{31146}\\u{31147}\\u{31148}\\u{31149}\\u{3114A}\\u{3114B}\\u{3114C}\\u{3114D}\\u{3114E}\\u{3114F}\\u{31150}\\u{31151}\\u{31152}\\u{31153}\\u{31154}\\u{31155}\\u{31156}\\u{31157}\\u{31158}\\u{31159}\\u{3115A}\\u{3115B}\\u{3115C}\\u{3115D}\\u{3115E}\\u{3115F}\\u{31160}\\u{31161}\\u{31162}\\u{31163}\\u{31164}\\u{31165}\\u{31166}\\u{31167}\\u{31168}\\u{31169}\\u{3116A}\\u{3116B}\\u{3116C}\\u{3116D}\\u{3116E}\\u{3116F}\\u{31170}\\u{31171}\\u{31172}\\u{31173}\\u{31174}\\u{31175}\\u{31176}\\u{31177}\\u{31178}\\u{31179}\\u{3117A}\\u{3117B}\\u{3117C}\\u{3117D}\\u{3117E}\\u{3117F}\\u{31180}\\u{31181}\\u{31182}\\u{31183}\\u{31184}\\u{31185}\\u{31186}\\u{31187}\\u{31188}\\u{31189}\\u{3118A}\\u{3118B}\\u{3118C}\\u{3118D}\\u{3118E}\\u{3118F}\\u{31190}\\u{31191}\\u{31192}\\u{31193}\\u{31194}\\u{31195}\\u{31196}\\u{31197}\\u{31198}\\u{31199}\\u{3119A}\\u{3119B}\\u{3119C}\\u{3119D}\\u{3119E}\\u{3119F}\\u{311A0}\\u{311A1}\\u{311A2}\\u{311A3}\\u{311A4}\\u{311A5}\\u{311A6}\\u{311A7}\\u{311A8}\\u{311A9}\\u{311AA}\\u{311AB}\\u{311AC}\\u{311AD}\\u{311AE}\\u{311AF}\\u{311B0}\\u{311B1}\\u{311B2}\\u{311B3}\\u{311B4}\\u{311B5}\\u{311B6}\\u{311B7}\\u{311B8}\\u{311B9}\\u{311BA}\\u{311BB}\\u{311BC}\\u{311BD}\\u{311BE}\\u{311BF}\\u{311C0}\\u{311C1}\\u{311C2}\\u{311C3}\\u{311C4}\\u{311C5}\\u{311C6}\\u{311C7}\\u{311C8}\\u{311C9}\\u{311CA}\\u{311CB}\\u{311CC}\\u{311CD}\\u{311CE}\\u{311CF}\\u{311D0}\\u{311D1}\\u{311D2}\\u{311D3}\\u{311D4}\\u{311D5}\\u{311D6}\\u{311D7}\\u{311D8}\\u{311D9}\\u{311DA}\\u{311DB}\\u{311DC}\\u{311DD}\\u{311DE}\\u{311DF}\\u{311E0}\\u{311E1}\\u{311E2}\\u{311E3}\\u{311E4}\\u{311E5}\\u{311E6}\\u{311E7}\\u{311E8}\\u{311E9}\\u{311EA}\\u{311EB}\\u{311EC}\\u{311ED}\\u{311EE}\\u{311EF}\\u{311F0}\\u{311F1}\\u{311F2}\\u{311F3}\\u{311F4}\\u{311F5}\\u{311F6}\\u{311F7}\\u{311F8}\\u{311F9}\\u{311FA}\\u{311FB}\\u{311FC}\\u{311FD}\\u{311FE}\\u{311FF}\\u{31200}\\u{31201}\\u{31202}\\u{31203}\\u{31204}\\u{31205}\\u{31206}\\u{31207}\\u{31208}\\u{31209}\\u{3120A}\\u{3120B}\\u{3120C}\\u{3120D}\\u{3120E}\\u{3120F}\\u{31210}\\u{31211}\\u{31212}\\u{31213}\\u{31214}\\u{31215}\\u{31216}\\u{31217}\\u{31218}\\u{31219}\\u{3121A}\\u{3121B}\\u{3121C}\\u{3121D}\\u{3121E}\\u{3121F}\\u{31220}\\u{31221}\\u{31222}\\u{31223}\\u{31224}\\u{31225}\\u{31226}\\u{31227}\\u{31228}\\u{31229}\\u{3122A}\\u{3122B}\\u{3122C}\\u{3122D}\\u{3122E}\\u{3122F}\\u{31230}\\u{31231}\\u{31232}\\u{31233}\\u{31234}\\u{31235}\\u{31236}\\u{31237}\\u{31238}\\u{31239}\\u{3123A}\\u{3123B}\\u{3123C}\\u{3123D}\\u{3123E}\\u{3123F}\\u{31240}\\u{31241}\\u{31242}\\u{31243}\\u{31244}\\u{31245}\\u{31246}\\u{31247}\\u{31248}\\u{31249}\\u{3124A}\\u{3124B}\\u{3124C}\\u{3124D}\\u{3124E}\\u{3124F}\\u{31250}\\u{31251}\\u{31252}\\u{31253}\\u{31254}\\u{31255}\\u{31256}\\u{31257}\\u{31258}\\u{31259}\\u{3125A}\\u{3125B}\\u{3125C}\\u{3125D}\\u{3125E}\\u{3125F}\\u{31260}\\u{31261}\\u{31262}\\u{31263}\\u{31264}\\u{31265}\\u{31266}\\u{31267}\\u{31268}\\u{31269}\\u{3126A}\\u{3126B}\\u{3126C}\\u{3126D}\\u{3126E}\\u{3126F}\\u{31270}\\u{31271}\\u{31272}\\u{31273}\\u{31274}\\u{31275}\\u{31276}\\u{31277}\\u{31278}\\u{31279}\\u{3127A}\\u{3127B}\\u{3127C}\\u{3127D}\\u{3127E}\\u{3127F}\\u{31280}\\u{31281}\\u{31282}\\u{31283}\\u{31284}\\u{31285}\\u{31286}\\u{31287}\\u{31288}\\u{31289}\\u{3128A}\\u{3128B}\\u{3128C}\\u{3128D}\\u{3128E}\\u{3128F}\\u{31290}\\u{31291}\\u{31292}\\u{31293}\\u{31294}\\u{31295}\\u{31296}\\u{31297}\\u{31298}\\u{31299}\\u{3129A}\\u{3129B}\\u{3129C}\\u{3129D}\\u{3129E}\\u{3129F}\\u{312A0}\\u{312A1}\\u{312A2}\\u{312A3}\\u{312A4}\\u{312A5}\\u{312A6}\\u{312A7}\\u{312A8}\\u{312A9}\\u{312AA}\\u{312AB}\\u{312AC}\\u{312AD}\\u{312AE}\\u{312AF}\\u{312B0}\\u{312B1}\\u{312B2}\\u{312B3}\\u{312B4}\\u{312B5}\\u{312B6}\\u{312B7}\\u{312B8}\\u{312B9}\\u{312BA}\\u{312BB}\\u{312BC}\\u{312BD}\\u{312BE}\\u{312BF}\\u{312C0}\\u{312C1}\\u{312C2}\\u{312C3}\\u{312C4}\\u{312C5}\\u{312C6}\\u{312C7}\\u{312C8}\\u{312C9}\\u{312CA}\\u{312CB}\\u{312CC}\\u{312CD}\\u{312CE}\\u{312CF}\\u{312D0}\\u{312D1}\\u{312D2}\\u{312D3}\\u{312D4}\\u{312D5}\\u{312D6}\\u{312D7}\\u{312D8}\\u{312D9}\\u{312DA}\\u{312DB}\\u{312DC}\\u{312DD}\\u{312DE}\\u{312DF}\\u{312E0}\\u{312E1}\\u{312E2}\\u{312E3}\\u{312E4}\\u{312E5}\\u{312E6}\\u{312E7}\\u{312E8}\\u{312E9}\\u{312EA}\\u{312EB}\\u{312EC}\\u{312ED}\\u{312EE}\\u{312EF}\\u{312F0}\\u{312F1}\\u{312F2}\\u{312F3}\\u{312F4}\\u{312F5}\\u{312F6}\\u{312F7}\\u{312F8}\\u{312F9}\\u{312FA}\\u{312FB}\\u{312FC}\\u{312FD}\\u{312FE}\\u{312FF}\\u{31300}\\u{31301}\\u{31302}\\u{31303}\\u{31304}\\u{31305}\\u{31306}\\u{31307}\\u{31308}\\u{31309}\\u{3130A}\\u{3130B}\\u{3130C}\\u{3130D}\\u{3130E}\\u{3130F}\\u{31310}\\u{31311}\\u{31312}\\u{31313}\\u{31314}\\u{31315}\\u{31316}\\u{31317}\\u{31318}\\u{31319}\\u{3131A}\\u{3131B}\\u{3131C}\\u{3131D}\\u{3131E}\\u{3131F}\\u{31320}\\u{31321}\\u{31322}\\u{31323}\\u{31324}\\u{31325}\\u{31326}\\u{31327}\\u{31328}\\u{31329}\\u{3132A}\\u{3132B}\\u{3132C}\\u{3132D}\\u{3132E}\\u{3132F}\\u{31330}\\u{31331}\\u{31332}\\u{31333}\\u{31334}\\u{31335}\\u{31336}\\u{31337}\\u{31338}\\u{31339}\\u{3133A}\\u{3133B}\\u{3133C}\\u{3133D}\\u{3133E}\\u{3133F}\\u{31340}\\u{31341}\\u{31342}\\u{31343}\\u{31344}\\u{31345}\\u{31346}\\u{31347}\\u{31348}\\u{31349}\\u{3134A};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Identifier',
            name:
              'ÃϯÃϰÃϱÃϲÃϳÃϴÃϵÃ϶ÃϷÃϸÃϹÃϺÃϻÃϼÃϽÃϾÃϿÄ\u0000Ä\u0001Ä\u0002Ä\u0003Ä\u0004Ä\u0005Ä\u0006Ä\u0007Ä\bÄ\tÄ\nÄ\u000bÄ\fÄ\rÄ\u000eÄ\u000fÄ\u0010Ä\u0011Ä\u0012Ä\u0013Ä\u0014Ä\u0015Ä\u0016Ä\u0017Ä\u0018Ä\u0019Ä\u001aÄ\u001bÄ\u001cÄ\u001dÄ\u001eÄ\u001fÄ Ä!Ä"Ä#Ä$Ä%Ä&Ä\'Ä(Ä)Ä*Ä+Ä,Ä-Ä.Ä/Ä0Ä1Ä2Ä3Ä4Ä5Ä6Ä7Ä8Ä9Ä:Ä;Ä<Ä=Ä>Ä?Ä@ÄAÄBÄCÄDÄEÄFÄGÄHÄIÄJÄKÄLÄMÄNÄOÄPÄQÄRÄSÄTÄUÄVÄWÄXÄYÄZÄ[Ä\\Ä]Ä^Ä_Ä`ÄaÄbÄcÄdÄeÄfÄgÄhÄiÄjÄkÄlÄmÄnÄoÄpÄqÄrÄsÄtÄuÄvÄwÄxÄyÄzÄ{Ä|Ä}Ä~ÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄÄ Ä¡Ä¢Ä£Ä¤Ä¥Ä¦Ä§Ä¨Ä©ÄªÄ«Ä¬Ä­Ä®Ä¯Ä°Ä±Ä²Ä³Ä´ÄµÄ¶Ä·Ä¸Ä¹ÄºÄ»Ä¼Ä½Ä¾Ä¿ÄÀÄÁÄÂÄÃÄÄÄÅÄÆÄÇÄÈÄÉÄÊÄËÄÌÄÍÄÎÄÏÄÐÄÑÄÒÄÓÄÔÄÕÄÖÄ×ÄØÄÙÄÚÄÛÄÜÄÝÄÞÄßÄàÄáÄâÄãÄäÄåÄæÄçÄèÄéÄêÄëÄìÄíÄîÄïÄðÄñÄòÄóÄôÄõÄöÄ÷ÄøÄùÄúÄûÄüÄýÄþÄÿÄĀÄāÄĂÄăÄĄÄąÄĆÄćÄĈÄĉÄĊÄċÄČÄčÄĎÄďÄĐÄđÄĒÄēÄĔÄĕÄĖÄėÄĘÄęÄĚÄěÄĜÄĝÄĞÄğÄĠÄġÄĢÄģÄĤÄĥÄĦÄħÄĨÄĩÄĪÄīÄĬÄĭÄĮÄįÄİÄıÄĲÄĳÄĴÄĵÄĶÄķÄĸÄĹÄĺÄĻÄļÄĽÄľÄĿÄŀÄŁÄłÄŃÄńÄŅÄņÄŇÄňÄŉÄŊÄŋÄŌÄōÄŎÄŏÄŐÄőÄŒÄœÄŔÄŕÄŖÄŗÄŘÄřÄŚÄśÄŜÄŝÄŞÄşÄŠÄšÄŢÄţÄŤÄťÄŦÄŧÄŨÄũÄŪÄūÄŬÄŭÄŮÄůÄŰÄűÄŲÄųÄŴÄŵÄŶÄŷÄŸÄŹÄźÄŻÄżÄŽÄžÄſÄƀÄƁÄƂÄƃÄƄÄƅÄƆÄƇÄƈÄƉÄƊÄƋÄƌÄƍÄƎÄƏÄƐÄƑÄƒÄƓÄƔÄƕÄƖÄƗÄƘÄƙÄƚÄƛÄƜÄƝÄƞÄƟÄƠÄơÄƢÄƣÄƤÄƥÄƦÄƧÄƨÄƩÄƪÄƫÄƬÄƭÄƮÄƯÄưÄƱÄƲÄƳÄƴÄƵÄƶÄƷÄƸÄƹÄƺÄƻÄƼÄƽÄƾÄƿÄǀÄǁÄǂÄǃÄǄÄǅÄǆÄǇÄǈÄǉÄǊÄǋÄǌÄǍÄǎÄǏÄǐÄǑÄǒÄǓÄǔÄǕÄǖÄǗÄǘÄǙÄǚÄǛÄǜÄǝÄǞÄǟÄǠÄǡÄǢÄǣÄǤÄǥÄǦÄǧÄǨÄǩÄǪÄǫÄǬÄǭÄǮÄǯÄǰÄǱÄǲÄǳÄǴÄǵÄǶÄǷÄǸÄǹÄǺÄǻÄǼÄǽÄǾÄǿÄȀÄȁÄȂÄȃÄȄÄȅÄȆÄȇÄȈÄȉÄȊÄȋÄȌÄȍÄȎÄȏÄȐÄȑÄȒÄȓÄȔÄȕÄȖÄȗÄȘÄșÄȚÄțÄȜÄȝÄȞÄȟÄȠÄȡÄȢÄȣÄȤÄȥÄȦÄȧÄȨÄȩÄȪÄȫÄȬÄȭÄȮÄȯÄȰÄȱÄȲÄȳÄȴÄȵÄȶÄȷÄȸÄȹÄȺÄȻÄȼÄȽÄȾÄȿÄɀÄɁÄɂÄɃÄɄÄɅÄɆÄɇÄɈÄɉÄɊÄɋÄɌÄɍÄɎÄɏÄɐÄɑÄɒÄɓÄɔÄɕÄɖÄɗÄɘÄəÄɚÄɛÄɜÄɝÄɞÄɟÄɠÄɡÄɢÄɣÄɤÄɥÄɦÄɧÄɨÄɩÄɪÄɫÄɬÄɭÄɮÄɯÄɰÄɱÄɲÄɳÄɴÄɵÄɶÄɷÄɸÄɹÄɺÄɻÄɼÄɽÄɾÄɿÄʀÄʁÄʂÄʃÄʄÄʅÄʆÄʇÄʈÄʉÄʊÄʋÄʌÄʍÄʎÄʏÄʐÄʑÄʒÄʓÄʔÄʕÄʖÄʗÄʘÄʙÄʚÄʛÄʜÄʝÄʞÄʟÄʠÄʡÄʢÄʣÄʤÄʥÄʦÄʧÄʨÄʩÄʪÄʫÄʬÄʭÄʮÄʯÄʰÄʱÄʲÄʳÄʴÄʵÄʶÄʷÄʸÄʹÄʺÄʻÄʼÄʽÄʾÄʿÄˀÄˁÄ˂Ä˃Ä˄Ä˅ÄˆÄˇÄˈÄˉÄˊÄˋÄˌÄˍÄˎÄˏÄːÄˑÄ˒Ä˓Ä˔Ä˕Ä˖Ä˗Ä˘Ä˙Ä˚Ä˛Ä˜Ä˝Ä˞Ä˟ÄˠÄˡÄˢÄˣÄˤÄ˥Ä˦Ä˧Ä˨Ä˩Ä˪Ä˫ÄˬÄ˭ÄˮÄ˯Ä˰Ä˱Ä˲Ä˳Ä˴Ä˵Ä˶Ä˷Ä˸Ä˹Ä˺Ä˻Ä˼Ä˽Ä˾Ä˿Ä̀Ä́Ä̂Ä̃ǞÄ̅Ä̆Ä̇Ä̈Ä̉Ä̊Ä̋Ä̌Ä̍Ä̎Ä̏Ä̐Ä̑Ä̒Ä̓Ä̔Ä̕Ä̖Ä̗Ä̘Ä̙Ä̚Ä̛Ä̜Ä̝Ä̞Ä̟Ä̠Ä̡Ä̢Ạ̈Ä̤Ḁ̈Ä̦Ä̧Ą̈Ä̩Ä̪Ä̫Ä̬Ä̭Ä̮Ä̯Ä̰Ä̱Ä̲Ä̳Ä̴Ä̵Ä̶Ä̷Ä̸Ä̹Ä̺Ä̻Ä̼Ä̽Ä̾Ä̿Ä̀Ä́Ä͂Ä̓Ä̈́ÄͅÄ͆Ä͇Ä͈Ä͉Ä͊',
            start: 0,
            end: 7740,
            loc: {
              start: {
                line: 1,
                column: 0
              },
              end: {
                line: 1,
                column: 7740
              }
            }
          },
          start: 0,
          end: 7741,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 7741
            }
          }
        }
      ],
      start: 0,
      end: 7741,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 7741
        }
      }
    }
  ]
]);
