import { pass, fail } from '../core';
import { Context } from '../../../src/parser/common';
import { parseRoot } from '../../../src/seafox';
import * as t from 'assert';

fail('Declarations - Var (fail)', [
  [`var {};`, Context.Empty],
  [`var [ foo()[x] ]`, Context.Empty],
  [`var { x };`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var {};`, Context.Empty],
  [`var foo = 1; let foo = 1;`, Context.Empty],
  [`var foo = 1; const foo = 1;`, Context.Empty],
  [`var [foo] = [1]; let foo = 1;`, Context.Empty],
  [`var [{ bar: [foo] }] = x; let {foo} = 1;`, Context.Empty],
  [`{ var foo = 1; } let foo = 1;`, Context.Empty],
  [`var foo = 1; function x() {} let foo = 1;`, Context.Empty],
  [`var [...foo] = x; let foo = 1;`, Context.Empty],
  [`var foo = 1; let foo = 1;`, Context.OptionsDisableWebCompat],
  [`var x = a; const x = b;`, Context.Empty],
  [`var ,a;`, Context.Empty],
  [`var a,;`, Context.Empty],
  [`var a =,;`, Context.Empty],
  [`function var() { }`, Context.Empty],
  [`function a({var}) { }`, Context.Empty],
  [`(function a([{var}]) { })`, Context.Empty],
  [`(function a({ hello: {var}}) { })`, Context.Empty],
  [`(function a({ 0: [var]}) { })`, Context.Empty],
  [`class var { }`, Context.Empty],
  [`var [...[ x ] = []] = [];`, Context.Empty],
  [`var [...{ x } = []] = [];`, Context.Empty],
  [`var [...x, y] = [1, 2, 3];`, Context.Empty],
  [`var [...{ x }, y] = [1, 2, 3];`, Context.Empty],
  ['var a.b;', Context.Empty],
  ['var [];', Context.Empty],
  ['var [a];', Context.Empty],
  ['var { key: bar/x } = {}', Context.Empty],
  ['var { key: await /foo/g } = {}', Context.Empty],
  ['var { key: bar + x } = {}', Context.Empty],
  ['var { "foo": 123 } = {}', Context.Empty],
  ['var a = new ;', Context.Empty],
  ['var t4 = ++await 1;', Context.Empty],
  ['var t5 = --await 1;', Context.Empty],
  ['var {  ...y, ...y } = {}', Context.Empty],
  ['var {a a, b} = c;', Context.Empty],
  ['var {a, b', Context.Empty],
  ['var {{a}} = b;', Context.Empty],
  ['var a; function a() {} let a;', Context.Empty],
  ['let a; function a() {} var a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['{var a; function x() {} let a; }', Context.Empty],
  ['{ function x() { var a, a; let a; } let a; }', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var a; function x() {} let a;', Context.Empty],
  ['var [[(a)], ((((((([b])))))))] = [[],[]];', Context.Empty],
  ['var [((((a)))), b] = [];', Context.Empty],
  ['var [a)] = [];', Context.Empty],
  ['var a; [((a)] = [];', Context.Empty],
  ['var [((a)] = [];', Context.Empty],
  ['var a; var a,[a],{a}; let a;', Context.Empty],
  [`function foo() { return {}; }; var {x:foo().x} = {};`, Context.Empty],
  [`for (var [x] = [] of []) {}`, Context.Empty],
  [`var { get foo() { } } = { get: 1 };`, Context.Empty],
  [`var { set bar(x) { } } = { set: 2 };`, Context.Empty],
  [`var a = 1; ({x, y = 1, z = 2} = {a = 2});`, Context.Empty],
  [`var a = 1; ({x, y = {a = 1}} = {});`, Context.Empty],
  [`var {x};`, Context.Empty],
  [`var {x:y};`, Context.Empty],
  [`var {,,x} = obj;`, Context.Empty],
  ['var {a,,b}=c;', Context.Empty],
  ['var {a}', Context.Empty],
  ['var {a:}=b', Context.Empty],
  ['var {,}=b', Context.Empty],
  ['var obj={a:}', Context.Empty],
  ['var obj = {,}', Context.Empty],
  ['var obj = {a', Context.Empty],
  ['var { foo: true / false } = {}', Context.Empty],
  ['var { *static() {} } = {}', Context.Empty],
  ['var { static(){} } = {}', Context.Empty],
  ['var { foo: 1, set bar(v) {} } = {}', Context.Empty],
  ['var {  get yield() { }  } = {}', Context.Empty],
  ['var { set foo(_) {}, set foo(v) {} } = {}', Context.Empty],
  ['var { foo: 1, get "foo"() {} } = {}', Context.Empty],
  ['var { async *method({ w: [x, y, z] = [4, 5, 6] } = {}) {} } = {}', Context.Empty],
  ['var { async *method([[,] = g()]) {} } = {}', Context.Empty],
  ['var { true : 1 } = {}', Context.Empty],
  ['var { set: 1, set: 2 } = {}', Context.Empty],
  ['var { foo: 1, "foo": 2 } = {}', Context.Empty],
  ['var [a--] = [];', Context.Empty],
  ['var [a + 1] = [];', Context.Empty],
  ['var [++a] = [];', Context.Empty],
  ['var {...x = 1} = {}', Context.Empty],
  ['var [a a, b] = c;', Context.Empty],
  ['var [a, b', Context.Empty],
  ['var [a, ...rest, b] = c;', Context.Empty],
  ['var a; [a--] = [];', Context.Empty],
  ['var a; [++a] = [];', Context.Empty],
  ['var [1] = [];', Context.Empty],
  ['var [1, a] = [];', Context.Empty],
  ['var a; [1, a] = [];', Context.Empty],
  ['var [...a, ...b] = [];', Context.Empty],
  ['var a, b; [...a, ...b] = [];', Context.Empty],
  ['var a, b; [...a, b] = [];', Context.Empty],
  ['var a; [...a = 1] = [];', Context.Empty],
  ['var [...a = 1] = [];', Context.Empty],
  ['var [((a)] = [];', Context.Empty],
  ['var a; [((a)] = []', Context.Empty],
  ['var {...a.b} = 0', Context.Empty],
  ['var [a)] = [];', Context.Empty],
  ['var a; [a)] = [];', Context.Empty],
  ['var {...[]} = {}', Context.Empty],
  ['var {...{z}} = { z: 1};', Context.Empty],
  ['var { ...{ x = 5 } } = {x : 1};', Context.Empty],
  ['var { ...{x =5 } } = {x : 1}; console.log(x);', Context.Empty],
  ['var 𫠞_ = 12;}', Context.Empty],
  ['var _𖫵 = 11;', Context.Empty],
  ['var a, b; [([a]), (((([b]))))] = [[], []];', Context.Empty],
  ['var a, b; [({a}), (((({b}))))] = [{}, {}];', Context.Empty],
  ['var a, b; ({a:({a}), b:((({b})))} = {a:{}, b:{}} );', Context.Empty],
  ['function foo() { return {}; }; var [foo()] = [];', Context.Empty],
  ['function foo() { return {}; }; var [foo().x] = [];', Context.Empty],
  ['class foo { method() { var [super()] = []; } }', Context.Empty],
  ['var {foo}', Context.Empty],
  ['var {foo=a}', Context.Empty],
  ['var {foo:a}', Context.Empty],
  ['var {foo:a=b}', Context.Empty],
  ['var {foo}, bar', Context.Empty],
  ['var foo, {bar}', Context.Empty],
  ['var\nfoo()', Context.Empty],
  ['var [foo];', Context.Empty],
  ['var [foo = x];', Context.Empty],
  ['var [foo], bar;', Context.Empty],
  ['var foo, [bar];', Context.Empty],
  ['var arr = [a', Context.Empty],
  ['var a=[b=]', Context.Empty],
  ['var a=[...]', Context.Empty],
  ['var arr = [a b', Context.Empty],
  ['var [foo:bar] = obj;', Context.Empty],
  ['var [...foo, bar] = obj;', Context.Empty],
  ['var [...foo,] = obj;', Context.Empty],
  ['var [...foo,,] = obj;', Context.Empty],
  ['const var = 1;', Context.Empty],
  ['var [...[foo, bar],,] = obj;', Context.Empty],
  ['var [..x] = obj;', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var {foo};', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var {,} = x;', Context.Empty],
  ['var {foo,,} = x;', Context.Empty],
  [' var {,foo} = x; ', Context.Empty],
  ['var {,,foo} = x;', Context.Empty],
  ['var {foo,,bar} = x;', Context.Empty],
  ['var\nfoo()', Context.Empty],
  ['var [foo = x];', Context.Empty],
  ['var [foo], bar;', Context.Empty],
  ['var foo, [bar];', Context.Empty],
  ['x = { (a) { var a;  } }', Context.Empty],
  ['x = { a: (a) } var a;', Context.Empty],
  ['var [foo:bar] = obj;', Context.Empty],
  ['var [...foo, bar] = obj;', Context.Empty],
  ['var [...foo,] = obj;', Context.Empty],
  ['var [...foo,,] = obj;', Context.Empty],
  ['var [...[foo, bar],] = obj;', Context.Empty],
  ['var [...[foo, bar],,] = obj;', Context.Empty],
  ['var [... ...foo] = obj;', Context.Empty],
  ['var [...bar = foo] = obj;', Context.Empty],
  ['var [.x] = obj;', Context.Empty],
  ['var [..x] = obj;', Context.Empty],
  ['var {x:y=z}, {a:b=c} = obj;', Context.Empty],
  ['var {,} = obj;', Context.Empty],
  ['var {,,} = obj;', Context.Empty],
  ['var {,x} = obj;', Context.Empty],
  ['var {,,x} = obj;', Context.Empty],
  ['var {x,, y} = obj;', Context.Empty],
  ['var {x,, y} = obj;', Context.Empty],
  ['var {x};', Context.Empty],
  ['var {x}, {y} = z;', Context.Empty],
  [`var [foo];`, Context.Empty],
  ['"use strict"; let {x: xx,  foo: {y: xx}} = {foo:[12]};', Context.Empty],
  ['var arr = []; for (var    of arr) {}', Context.Empty],
  [`var [foo], bar;`, Context.Empty],
  [`var {x:y=z} = obj, {a:b=c};`, Context.Empty],
  [`var {x};`, Context.Empty],
  [`var {x:y};`, Context.Empty],
  [`var {,,x} = obj;`, Context.Empty],
  [
    `var
    foo()`,
    Context.Empty
  ],
  [`{ var a; let a; } `, Context.Empty],
  [`let a; { var a; } `, Context.Empty],
  [`var a; { function a() {} var a; } `, Context.Empty],
  [`var x = a; const x = b;`, Context.Empty],
  [`var x = a; let x = b;`, Context.Empty],
  [`var x; let x;`, Context.OptionsDisableWebCompat]
]);

for (const arg of [
  'break',
  'case',
  'catch',
  'class',
  'const',
  'continue',
  'debugger',
  'default',
  'delete',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'in',
  'instanceof',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'typeof',
  'var',
  'void',
  'while',
  'with',
  'null',
  'true',
  'false',
  // future reserved keyword,
  'enum'
]) {
  it(`for (const ${arg} = x;;);`, () => {
    t.throws(() => {
      parseRoot(`for (const ${arg} = x;;);`, Context.Empty);
    });
  });
  it(`var ${arg}`, () => {
    t.throws(() => {
      parseRoot(`var ${arg}`, Context.OptionsDisableWebCompat);
    });
  });
  it(`const ${arg} = x;`, () => {
    t.throws(() => {
      parseRoot(`const ${arg} = x;`, Context.Empty);
    });
  });
}

pass('Declarations - Var (pass)', [
  [
    `var ࢾࢿࣀࣁࣂࣃࣄࣅࣆࣇഄㆻㆼㆽㆾㆿ䶶䶷䶸䶹䶺䶻䶼䶽䶾䶿鿰鿱鿲鿳鿴鿵鿶鿷鿸鿹鿺鿻鿼ꟇꟈꟉꟊꟵꟶꭨꭩ𐺀𐺁𐺂𐺃𐺄𐺅𐺆𐺇𐺈𐺉𐺊𐺋𐺌𐺍𐺎𐺏𐺐𐺑𐺒𐺓𐺔𐺕𐺖𐺗𐺘𐺙𐺚𐺛𐺜𐺝𐺞𐺟𐺠𐺡𐺢𐺣𐺤𐺥𐺦𐺧𐺨𐺩𐺰𐺱𐾰𐾱𐾲𐾳𐾴𐾵𐾶𐾷𐾸𐾹𐾺𐾻𐾼𐾽𐾾𐾿𐿀𐿁𐿂𐿃𐿄𑅇𑑠𑑡𑤀𑤁𑤂𑤃𑤄𑤅𑤆𑤉𑤌𑤍𑤎𑤏𑤐𑤑𑤒𑤓𑤕𑤖𑤘𑤙𑤚𑤛𑤜𑤝𑤞𑤟𑤠𑤡𑤢𑤣𑤤𑤥𑤦𑤧𑤨𑤩𑤪𑤫𑤬𑤭𑤮𑤯𑤿𑥁𑾰𘫳𘫴𘫵𘫶𘫷𘫸𘫹𘫺𘫻𘫼𘫽𘫾𘫿𘬀𘬁𘬂𘬃𘬄𘬅𘬆𘬇𘬈𘬉𘬊𘬋𘬌𘬍𘬎𘬏𘬐𘬑𘬒𘬓𘬔𘬕𘬖𘬗𘬘𘬙𘬚𘬛𘬜𘬝𘬞𘬟𘬠𘬡𘬢𘬣𘬤𘬥𘬦𘬧𘬨𘬩𘬪𘬫𘬬𘬭𘬮𘬯𘬰𘬱𘬲𘬳𘬴𘬵𘬶𘬷𘬸𘬹𘬺𘬻𘬼𘬽𘬾𘬿𘭀𘭁𘭂𘭃𘭄𘭅𘭆𘭇𘭈𘭉𘭊𘭋𘭌𘭍𘭎𘭏𘭐𘭑𘭒𘭓𘭔𘭕𘭖𘭗𘭘𘭙𘭚𘭛𘭜𘭝𘭞𘭟𘭠𘭡𘭢𘭣𘭤𘭥𘭦𘭧𘭨𘭩𘭪𘭫𘭬𘭭𘭮𘭯𘭰𘭱𘭲𘭳𘭴𘭵𘭶𘭷𘭸𘭹𘭺𘭻𘭼𘭽𘭾𘭿𘮀𘮁𘮂𘮃𘮄𘮅𘮆𘮇𘮈𘮉𘮊𘮋𘮌𘮍𘮎𘮏𘮐𘮑𘮒𘮓𘮔𘮕𘮖𘮗𘮘𘮙𘮚𘮛𘮜𘮝𘮞𘮟𘮠𘮡𘮢𘮣𘮤𘮥𘮦𘮧𘮨𘮩𘮪𘮫𘮬𘮭𘮮𘮯𘮰𘮱𘮲𘮳𘮴𘮵𘮶𘮷𘮸𘮹𘮺𘮻𘮼𘮽𘮾𘮿𘯀𘯁𘯂𘯃𘯄𘯅𘯆𘯇𘯈𘯉𘯊𘯋𘯌𘯍𘯎𘯏𘯐𘯑𘯒𘯓𘯔𘯕𘯖𘯗𘯘𘯙𘯚𘯛𘯜𘯝𘯞𘯟𘯠𘯡𘯢𘯣𘯤𘯥𘯦𘯧𘯨𘯩𘯪𘯫𘯬𘯭𘯮𘯯𘯰𘯱𘯲𘯳𘯴𘯵𘯶𘯷𘯸𘯹𘯺𘯻𘯼𘯽𘯾𘯿𘰀𘰁𘰂𘰃𘰄𘰅𘰆𘰇𘰈𘰉𘰊𘰋𘰌𘰍𘰎𘰏𘰐𘰑𘰒𘰓𘰔𘰕𘰖𘰗𘰘𘰙𘰚𘰛𘰜𘰝𘰞𘰟𘰠𘰡𘰢𘰣𘰤𘰥𘰦𘰧𘰨𘰩𘰪𘰫𘰬𘰭𘰮𘰯𘰰𘰱𘰲𘰳𘰴𘰵𘰶𘰷𘰸𘰹𘰺𘰻𘰼𘰽𘰾𘰿𘱀𘱁𘱂𘱃𘱄𘱅𘱆𘱇𘱈𘱉𘱊𘱋𘱌𘱍𘱎𘱏𘱐𘱑𘱒𘱓𘱔𘱕𘱖𘱗𘱘𘱙𘱚𘱛𘱜𘱝𘱞𘱟𘱠𘱡𘱢𘱣𘱤𘱥𘱦𘱧𘱨𘱩𘱪𘱫𘱬𘱭𘱮𘱯𘱰𘱱𘱲𘱳𘱴𘱵𘱶𘱷𘱸𘱹𘱺𘱻𘱼𘱽𘱾𘱿𘲀𘲁𘲂𘲃𘲄𘲅𘲆𘲇𘲈𘲉𘲊𘲋𘲌𘲍𘲎𘲏𘲐𘲑𘲒𘲓𘲔𘲕𘲖𘲗𘲘𘲙𘲚𘲛𘲜𘲝𘲞𘲟𘲠𘲡𘲢𘲣𘲤𘲥𘲦𘲧𘲨𘲩𘲪𘲫𘲬𘲭𘲮𘲯𘲰𘲱𘲲𘲳𘲴𘲵𘲶𘲷𘲸𘲹𘲺𘲻𘲼𘲽𘲾𘲿𘳀𘳁𘳂𘳃𘳄𘳅𘳆𘳇𘳈𘳉𘳊𘳋𘳌𘳍𘳎𘳏𘳐𘳑𘳒𘳓𘳔𘳕𘴀𘴁𘴂𘴃𘴄𘴅𘴆𘴇𘴈𪛗𪛘𪛙𪛚𪛛𪛜𪛝𰀀𰀁𰀂𰀃𰀄𰀅𰀆𰀇𰀈𰀉𰀊𰀋𰀌𰀍𰀎𰀏𰀐𰀑𰀒𰀓𰀔𰀕𰀖𰀗𰀘𰀙𰀚𰀛𰀜𰀝𰀞𰀟𰀠𰀡𰀢𰀣𰀤𰀥𰀦𰀧𰀨𰀩𰀪𰀫𰀬𰀭𰀮𰀯𰀰𰀱𰀲𰀳𰀴𰀵𰀶𰀷𰀸𰀹𰀺𰀻𰀼𰀽𰀾𰀿𰁀𰁁𰁂𰁃𰁄𰁅𰁆𰁇𰁈𰁉𰁊𰁋𰁌𰁍𰁎𰁏𰁐𰁑𰁒𰁓𰁔𰁕𰁖𰁗𰁘𰁙𰁚𰁛𰁜𰁝𰁞𰁟𰁠𰁡𰁢𰁣𰁤𰁥𰁦𰁧𰁨𰁩𰁪𰁫𰁬𰁭𰁮𰁯𰁰𰁱𰁲𰁳𰁴𰁵𰁶𰁷𰁸𰁹𰁺𰁻𰁼𰁽𰁾𰁿𰂀𰂁𰂂𰂃𰂄𰂅𰂆𰂇𰂈𰂉𰂊𰂋𰂌𰂍𰂎𰂏𰂐𰂑𰂒𰂓𰂔𰂕𰂖𰂗𰂘𰂙𰂚𰂛𰂜𰂝𰂞𰂟𰂠𰂡𰂢𰂣𰂤𰂥𰂦𰂧𰂨𰂩𰂪𰂫𰂬𰂭𰂮𰂯𰂰𰂱𰂲𰂳𰂴𰂵𰂶𰂷𰂸𰂹𰂺𰂻𰂼𰂽𰂾𰂿𰃀𰃁𰃂𰃃𰃄𰃅𰃆𰃇𰃈𰃉𰃊𰃋𰃌𰃍𰃎𰃏𰃐𰃑𰃒𰃓𰃔𰃕𰃖𰃗𰃘𰃙𰃚𰃛𰃜𰃝𰃞𰃟𰃠𰃡𰃢𰃣𰃤𰃥𰃦𰃧𰃨𰃩𰃪𰃫𰃬𰃭𰃮𰃯𰃰𰃱𰃲𰃳𰃴𰃵𰃶𰃷𰃸𰃹𰃺𰃻𰃼𰃽𰃾𰃿𰄀𰄁𰄂𰄃𰄄𰄅𰄆𰄇𰄈𰄉𰄊𰄋𰄌𰄍𰄎𰄏𰄐𰄑𰄒𰄓𰄔𰄕𰄖𰄗𰄘𰄙𰄚𰄛𰄜𰄝𰄞𰄟𰄠𰄡𰄢𰄣𰄤𰄥𰄦𰄧𰄨𰄩𰄪𰄫𰄬𰄭𰄮𰄯𰄰𰄱𰄲𰄳𰄴𰄵𰄶𰄷𰄸𰄹𰄺𰄻𰄼𰄽𰄾𰄿𰅀𰅁𰅂𰅃𰅄𰅅𰅆𰅇𰅈𰅉𰅊𰅋𰅌𰅍𰅎𰅏𰅐𰅑𰅒𰅓𰅔𰅕𰅖𰅗𰅘𰅙𰅚𰅛𰅜𰅝𰅞𰅟𰅠𰅡𰅢𰅣𰅤𰅥𰅦𰅧𰅨𰅩𰅪𰅫𰅬𰅭𰅮𰅯𰅰𰅱𰅲𰅳𰅴𰅵𰅶𰅷𰅸𰅹𰅺𰅻𰅼𰅽𰅾𰅿𰆀𰆁𰆂𰆃𰆄𰆅𰆆𰆇𰆈𰆉𰆊𰆋𰆌𰆍𰆎𰆏𰆐𰆑𰆒𰆓𰆔𰆕𰆖𰆗𰆘𰆙𰆚𰆛𰆜𰆝𰆞𰆟𰆠𰆡𰆢𰆣𰆤𰆥𰆦𰆧𰆨𰆩𰆪𰆫𰆬𰆭𰆮𰆯𰆰𰆱𰆲𰆳𰆴𰆵𰆶𰆷𰆸𰆹𰆺𰆻𰆼𰆽𰆾𰆿𰇀𰇁𰇂𰇃𰇄𰇅𰇆𰇇𰇈𰇉𰇊𰇋𰇌𰇍𰇎𰇏𰇐𰇑𰇒𰇓𰇔𰇕𰇖𰇗𰇘𰇙𰇚𰇛𰇜𰇝𰇞𰇟𰇠𰇡𰇢𰇣𰇤𰇥𰇦𰇧𰇨𰇩𰇪𰇫𰇬𰇭𰇮𰇯𰇰𰇱𰇲𰇳𰇴𰇵𰇶𰇷𰇸𰇹𰇺𰇻𰇼𰇽𰇾𰇿𰈀𰈁𰈂𰈃𰈄𰈅𰈆𰈇𰈈𰈉𰈊𰈋𰈌𰈍𰈎𰈏𰈐𰈑𰈒𰈓𰈔𰈕𰈖𰈗𰈘𰈙𰈚𰈛𰈜𰈝𰈞𰈟𰈠𰈡𰈢𰈣𰈤𰈥𰈦𰈧𰈨𰈩𰈪𰈫𰈬𰈭𰈮𰈯𰈰𰈱𰈲𰈳𰈴𰈵𰈶𰈷𰈸𰈹𰈺𰈻𰈼𰈽𰈾𰈿𰉀𰉁𰉂𰉃𰉄𰉅𰉆𰉇𰉈𰉉𰉊𰉋𰉌𰉍𰉎𰉏𰉐𰉑𰉒𰉓𰉔𰉕𰉖𰉗𰉘𰉙𰉚𰉛𰉜𰉝𰉞𰉟𰉠𰉡𰉢𰉣𰉤𰉥𰉦𰉧𰉨𰉩𰉪𰉫𰉬𰉭𰉮𰉯𰉰𰉱𰉲𰉳𰉴𰉵𰉶𰉷𰉸𰉹𰉺𰉻𰉼𰉽𰉾𰉿𰊀𰊁𰊂𰊃𰊄𰊅𰊆𰊇𰊈𰊉𰊊𰊋𰊌𰊍𰊎𰊏𰊐𰊑𰊒𰊓𰊔𰊕𰊖𰊗𰊘𰊙𰊚𰊛𰊜𰊝𰊞𰊟𰊠𰊡𰊢𰊣𰊤𰊥𰊦𰊧𰊨𰊩𰊪𰊫𰊬𰊭𰊮𰊯𰊰𰊱𰊲𰊳𰊴𰊵𰊶𰊷𰊸𰊹𰊺𰊻𰊼𰊽𰊾𰊿𰋀𰋁𰋂𰋃𰋄𰋅𰋆𰋇𰋈𰋉𰋊𰋋𰋌𰋍𰋎𰋏𰋐𰋑𰋒𰋓𰋔𰋕𰋖𰋗𰋘𰋙𰋚𰋛𰋜𰋝𰋞𰋟𰋠𰋡𰋢𰋣𰋤𰋥𰋦𰋧𰋨𰋩𰋪𰋫𰋬𰋭𰋮𰋯𰋰𰋱𰋲𰋳𰋴𰋵𰋶𰋷𰋸𰋹𰋺𰋻𰋼𰋽𰋾𰋿𰌀𰌁𰌂𰌃𰌄𰌅𰌆𰌇𰌈𰌉𰌊𰌋𰌌𰌍𰌎𰌏𰌐𰌑𰌒𰌓𰌔𰌕𰌖𰌗𰌘𰌙𰌚𰌛𰌜𰌝𰌞𰌟𰌠𰌡𰌢𰌣𰌤𰌥𰌦𰌧𰌨𰌩𰌪𰌫𰌬𰌭𰌮𰌯𰌰𰌱𰌲𰌳𰌴𰌵𰌶𰌷𰌸𰌹𰌺𰌻𰌼𰌽𰌾𰌿𰍀𰍁𰍂𰍃𰍄𰍅𰍆𰍇𰍈𰍉𰍊𰍋𰍌𰍍𰍎𰍏𰍐𰍑𰍒𰍓𰍔𰍕𰍖𰍗𰍘𰍙𰍚𰍛𰍜𰍝𰍞𰍟𰍠𰍡𰍢𰍣𰍤𰍥𰍦𰍧𰍨𰍩𰍪𰍫𰍬𰍭𰍮𰍯𰍰𰍱𰍲𰍳𰍴𰍵𰍶𰍷𰍸𰍹𰍺𰍻𰍼𰍽𰍾𰍿𰎀𰎁𰎂𰎃𰎄𰎅𰎆𰎇𰎈𰎉𰎊𰎋𰎌𰎍𰎎𰎏𰎐𰎑𰎒𰎓𰎔𰎕𰎖𰎗𰎘𰎙𰎚𰎛𰎜𰎝𰎞𰎟𰎠𰎡𰎢𰎣𰎤𰎥𰎦𰎧𰎨𰎩𰎪𰎫𰎬𰎭𰎮𰎯𰎰𰎱𰎲𰎳𰎴𰎵𰎶𰎷𰎸𰎹𰎺𰎻𰎼𰎽𰎾𰎿𰏀𰏁𰏂𰏃𰏄𰏅𰏆𰏇𰏈𰏉𰏊𰏋𰏌𰏍𰏎𰏏𰏐𰏑𰏒𰏓𰏔𰏕𰏖𰏗𰏘𰏙𰏚𰏛𰏜𰏝𰏞𰏟𰏠𰏡𰏢𰏣𰏤𰏥𰏦𰏧𰏨𰏩𰏪𰏫𰏬𰏭𰏮𰏯𰏰𰏱𰏲𰏳𰏴𰏵𰏶𰏷𰏸𰏹𰏺𰏻𰏼𰏽𰏾𰏿𰐀𰐁𰐂𰐃𰐄𰐅𰐆𰐇𰐈𰐉𰐊𰐋𰐌𰐍𰐎𰐏𰐐𰐑𰐒𰐓𰐔𰐕𰐖𰐗𰐘𰐙𰐚𰐛𰐜𰐝𰐞𰐟𰐠𰐡𰐢𰐣𰐤𰐥𰐦𰐧𰐨𰐩𰐪𰐫𰐬𰐭𰐮𰐯𰐰𰐱𰐲𰐳𰐴𰐵𰐶𰐷𰐸𰐹𰐺𰐻𰐼𰐽𰐾𰐿𰑀𰑁𰑂𰑃𰑄𰑅𰑆𰑇𰑈𰑉𰑊𰑋𰑌𰑍𰑎𰑏𰑐𰑑𰑒𰑓𰑔𰑕𰑖𰑗𰑘𰑙𰑚𰑛𰑜𰑝𰑞𰑟𰑠𰑡𰑢𰑣𰑤𰑥𰑦𰑧𰑨𰑩𰑪𰑫𰑬𰑭𰑮𰑯𰑰𰑱𰑲𰑳𰑴𰑵𰑶𰑷𰑸𰑹𰑺𰑻𰑼𰑽𰑾𰑿𰒀𰒁𰒂𰒃𰒄𰒅𰒆𰒇𰒈𰒉𰒊𰒋𰒌𰒍𰒎𰒏𰒐𰒑𰒒𰒓𰒔𰒕𰒖𰒗𰒘𰒙𰒚𰒛𰒜𰒝𰒞𰒟𰒠𰒡𰒢𰒣𰒤𰒥𰒦𰒧𰒨𰒩𰒪𰒫𰒬𰒭𰒮𰒯𰒰𰒱𰒲𰒳𰒴𰒵𰒶𰒷𰒸𰒹𰒺𰒻𰒼𰒽𰒾𰒿𰓀𰓁𰓂𰓃𰓄𰓅𰓆𰓇𰓈𰓉𰓊𰓋𰓌𰓍𰓎𰓏𰓐𰓑𰓒𰓓𰓔𰓕𰓖𰓗𰓘𰓙𰓚𰓛𰓜𰓝𰓞𰓟𰓠𰓡𰓢𰓣𰓤𰓥𰓦𰓧𰓨𰓩𰓪𰓫𰓬𰓭𰓮𰓯𰓰𰓱𰓲𰓳𰓴𰓵𰓶𰓷𰓸𰓹𰓺𰓻𰓼𰓽𰓾𰓿𰔀𰔁𰔂𰔃𰔄𰔅𰔆𰔇𰔈𰔉𰔊𰔋𰔌𰔍𰔎𰔏𰔐𰔑𰔒𰔓𰔔𰔕𰔖𰔗𰔘𰔙𰔚𰔛𰔜𰔝𰔞𰔟𰔠𰔡𰔢𰔣𰔤𰔥𰔦𰔧𰔨𰔩𰔪𰔫𰔬𰔭𰔮𰔯𰔰𰔱𰔲𰔳𰔴𰔵𰔶𰔷𰔸𰔹𰔺𰔻𰔼𰔽𰔾𰔿𰕀𰕁𰕂𰕃𰕄𰕅𰕆𰕇𰕈𰕉𰕊𰕋𰕌𰕍𰕎𰕏𰕐𰕑𰕒𰕓𰕔𰕕𰕖𰕗𰕘𰕙𰕚𰕛𰕜𰕝𰕞𰕟𰕠𰕡𰕢𰕣𰕤𰕥𰕦𰕧𰕨𰕩𰕪𰕫𰕬𰕭𰕮𰕯𰕰𰕱𰕲𰕳𰕴𰕵𰕶𰕷𰕸𰕹𰕺𰕻𰕼𰕽𰕾𰕿𰖀𰖁𰖂𰖃𰖄𰖅𰖆𰖇𰖈𰖉𰖊𰖋𰖌𰖍𰖎𰖏𰖐𰖑𰖒𰖓𰖔𰖕𰖖𰖗𰖘𰖙𰖚𰖛𰖜𰖝𰖞𰖟𰖠𰖡𰖢𰖣𰖤𰖥𰖦𰖧𰖨𰖩𰖪𰖫𰖬𰖭𰖮𰖯𰖰𰖱𰖲𰖳𰖴𰖵𰖶𰖷𰖸𰖹𰖺𰖻𰖼𰖽𰖾𰖿𰗀𰗁𰗂𰗃𰗄𰗅𰗆𰗇𰗈𰗉𰗊𰗋𰗌𰗍𰗎𰗏𰗐𰗑𰗒𰗓𰗔𰗕𰗖𰗗𰗘𰗙𰗚𰗛𰗜𰗝𰗞𰗟𰗠𰗡𰗢𰗣𰗤𰗥𰗦𰗧𰗨𰗩𰗪𰗫𰗬𰗭𰗮𰗯𰗰𰗱𰗲𰗳𰗴𰗵𰗶𰗷𰗸𰗹𰗺𰗻𰗼𰗽𰗾𰗿𰘀𰘁𰘂𰘃𰘄𰘅𰘆𰘇𰘈𰘉𰘊𰘋𰘌𰘍𰘎𰘏𰘐𰘑𰘒𰘓𰘔𰘕𰘖𰘗𰘘𰘙𰘚𰘛𰘜𰘝𰘞𰘟𰘠𰘡𰘢𰘣𰘤𰘥𰘦𰘧𰘨𰘩𰘪𰘫𰘬𰘭𰘮𰘯𰘰𰘱𰘲𰘳𰘴𰘵𰘶𰘷𰘸𰘹𰘺𰘻𰘼𰘽𰘾𰘿𰙀𰙁𰙂𰙃𰙄𰙅𰙆𰙇𰙈𰙉𰙊𰙋𰙌𰙍𰙎𰙏𰙐𰙑𰙒𰙓𰙔𰙕𰙖𰙗𰙘𰙙𰙚𰙛𰙜𰙝𰙞𰙟𰙠𰙡𰙢𰙣𰙤𰙥𰙦𰙧𰙨𰙩𰙪𰙫𰙬𰙭𰙮𰙯𰙰𰙱𰙲𰙳𰙴𰙵𰙶𰙷𰙸𰙹𰙺𰙻𰙼𰙽𰙾𰙿𰚀𰚁𰚂𰚃𰚄𰚅𰚆𰚇𰚈𰚉𰚊𰚋𰚌𰚍𰚎𰚏𰚐𰚑𰚒𰚓𰚔𰚕𰚖𰚗𰚘𰚙𰚚𰚛𰚜𰚝𰚞𰚟𰚠𰚡𰚢𰚣𰚤𰚥𰚦𰚧𰚨𰚩𰚪𰚫𰚬𰚭𰚮𰚯𰚰𰚱𰚲𰚳𰚴𰚵𰚶𰚷𰚸𰚹𰚺𰚻𰚼𰚽𰚾𰚿𰛀𰛁𰛂𰛃𰛄𰛅𰛆𰛇𰛈𰛉𰛊𰛋𰛌𰛍𰛎𰛏𰛐𰛑𰛒𰛓𰛔𰛕𰛖𰛗𰛘𰛙𰛚𰛛𰛜𰛝𰛞𰛟𰛠𰛡𰛢𰛣𰛤𰛥𰛦𰛧𰛨𰛩𰛪𰛫𰛬𰛭𰛮𰛯𰛰𰛱𰛲𰛳𰛴𰛵𰛶𰛷𰛸𰛹𰛺𰛻𰛼𰛽𰛾𰛿𰜀𰜁𰜂𰜃𰜄𰜅𰜆𰜇𰜈𰜉𰜊𰜋𰜌𰜍𰜎𰜏𰜐𰜑𰜒𰜓𰜔𰜕𰜖𰜗𰜘𰜙𰜚𰜛𰜜𰜝𰜞𰜟𰜠𰜡𰜢𰜣𰜤𰜥𰜦𰜧𰜨𰜩𰜪𰜫𰜬𰜭𰜮𰜯𰜰𰜱𰜲𰜳𰜴𰜵𰜶𰜷𰜸𰜹𰜺𰜻𰜼𰜽𰜾𰜿𰝀𰝁𰝂𰝃𰝄𰝅𰝆𰝇𰝈𰝉𰝊𰝋𰝌𰝍𰝎𰝏𰝐𰝑𰝒𰝓𰝔𰝕𰝖𰝗𰝘𰝙𰝚𰝛𰝜𰝝𰝞𰝟𰝠𰝡𰝢𰝣𰝤𰝥𰝦𰝧𰝨𰝩𰝪𰝫𰝬𰝭𰝮𰝯𰝰𰝱𰝲𰝳𰝴𰝵𰝶𰝷𰝸𰝹𰝺𰝻𰝼𰝽𰝾𰝿𰞀𰞁𰞂𰞃𰞄𰞅𰞆𰞇𰞈𰞉𰞊𰞋𰞌𰞍𰞎𰞏𰞐𰞑𰞒𰞓𰞔𰞕𰞖𰞗𰞘𰞙𰞚𰞛𰞜𰞝𰞞𰞟𰞠𰞡𰞢𰞣𰞤𰞥𰞦𰞧𰞨𰞩𰞪𰞫𰞬𰞭𰞮𰞯𰞰𰞱𰞲𰞳𰞴𰞵𰞶𰞷𰞸𰞹𰞺𰞻𰞼𰞽𰞾𰞿𰟀𰟁𰟂𰟃𰟄𰟅𰟆𰟇𰟈𰟉𰟊𰟋𰟌𰟍𰟎𰟏𰟐𰟑𰟒𰟓𰟔𰟕𰟖𰟗𰟘𰟙𰟚𰟛𰟜𰟝𰟞𰟟𰟠𰟡𰟢𰟣𰟤𰟥𰟦𰟧𰟨𰟩𰟪𰟫𰟬𰟭𰟮𰟯𰟰𰟱𰟲𰟳𰟴𰟵𰟶𰟷𰟸𰟹𰟺𰟻𰟼𰟽𰟾𰟿𰠀𰠁𰠂𰠃𰠄𰠅𰠆𰠇𰠈𰠉𰠊𰠋𰠌𰠍𰠎𰠏𰠐𰠑𰠒𰠓𰠔𰠕𰠖𰠗𰠘𰠙𰠚𰠛𰠜𰠝𰠞𰠟𰠠𰠡𰠢𰠣𰠤𰠥𰠦𰠧𰠨𰠩𰠪𰠫𰠬𰠭𰠮𰠯𰠰𰠱𰠲𰠳𰠴𰠵𰠶𰠷𰠸𰠹𰠺𰠻𰠼𰠽𰠾𰠿𰡀𰡁𰡂𰡃𰡄𰡅𰡆𰡇𰡈𰡉𰡊𰡋𰡌𰡍𰡎𰡏𰡐𰡑𰡒𰡓𰡔𰡕𰡖𰡗𰡘𰡙𰡚𰡛𰡜𰡝𰡞𰡟𰡠𰡡𰡢𰡣𰡤𰡥𰡦𰡧𰡨𰡩𰡪𰡫𰡬𰡭𰡮𰡯𰡰𰡱𰡲𰡳𰡴𰡵𰡶𰡷𰡸𰡹𰡺𰡻𰡼𰡽𰡾𰡿𰢀𰢁𰢂𰢃𰢄𰢅𰢆𰢇𰢈𰢉𰢊𰢋𰢌𰢍𰢎𰢏𰢐𰢑𰢒𰢓𰢔𰢕𰢖𰢗𰢘𰢙𰢚𰢛𰢜𰢝𰢞𰢟𰢠𰢡𰢢𰢣𰢤𰢥𰢦𰢧𰢨𰢩𰢪𰢫𰢬𰢭𰢮𰢯𰢰𰢱𰢲𰢳𰢴𰢵𰢶𰢷𰢸𰢹𰢺𰢻𰢼𰢽𰢾𰢿𰣀𰣁𰣂𰣃𰣄𰣅𰣆𰣇𰣈𰣉𰣊𰣋𰣌𰣍𰣎𰣏𰣐𰣑𰣒𰣓𰣔𰣕𰣖𰣗𰣘𰣙𰣚𰣛𰣜𰣝𰣞𰣟𰣠𰣡𰣢𰣣𰣤𰣥𰣦𰣧𰣨𰣩𰣪𰣫𰣬𰣭𰣮𰣯𰣰𰣱𰣲𰣳𰣴𰣵𰣶𰣷𰣸𰣹𰣺𰣻𰣼𰣽𰣾𰣿𰤀𰤁𰤂𰤃𰤄𰤅𰤆𰤇𰤈𰤉𰤊𰤋𰤌𰤍𰤎𰤏𰤐𰤑𰤒𰤓𰤔𰤕𰤖𰤗𰤘𰤙𰤚𰤛𰤜𰤝𰤞𰤟𰤠𰤡𰤢𰤣𰤤𰤥𰤦𰤧𰤨𰤩𰤪𰤫𰤬𰤭𰤮𰤯𰤰𰤱𰤲𰤳𰤴𰤵𰤶𰤷𰤸𰤹𰤺𰤻𰤼𰤽𰤾𰤿𰥀𰥁𰥂𰥃𰥄𰥅𰥆𰥇𰥈𰥉𰥊𰥋𰥌𰥍𰥎𰥏𰥐𰥑𰥒𰥓𰥔𰥕𰥖𰥗𰥘𰥙𰥚𰥛𰥜𰥝𰥞𰥟𰥠𰥡𰥢𰥣𰥤𰥥𰥦𰥧𰥨𰥩𰥪𰥫𰥬𰥭𰥮𰥯𰥰𰥱𰥲𰥳𰥴𰥵𰥶𰥷𰥸𰥹𰥺𰥻𰥼𰥽𰥾𰥿𰦀𰦁𰦂𰦃𰦄𰦅𰦆𰦇𰦈𰦉𰦊𰦋𰦌𰦍𰦎𰦏𰦐𰦑𰦒𰦓𰦔𰦕𰦖𰦗𰦘𰦙𰦚𰦛𰦜𰦝𰦞𰦟𰦠𰦡𰦢𰦣𰦤𰦥𰦦𰦧𰦨𰦩𰦪𰦫𰦬𰦭𰦮𰦯𰦰𰦱𰦲𰦳𰦴𰦵𰦶𰦷𰦸𰦹𰦺𰦻𰦼𰦽𰦾𰦿𰧀𰧁𰧂𰧃𰧄𰧅𰧆𰧇𰧈𰧉𰧊𰧋𰧌𰧍𰧎𰧏𰧐𰧑𰧒𰧓𰧔𰧕𰧖𰧗𰧘𰧙𰧚𰧛𰧜𰧝𰧞𰧟𰧠𰧡𰧢𰧣𰧤𰧥𰧦𰧧𰧨𰧩𰧪𰧫𰧬𰧭𰧮𰧯𰧰𰧱𰧲𰧳𰧴𰧵𰧶𰧷𰧸𰧹𰧺𰧻𰧼𰧽𰧾𰧿𰨀𰨁𰨂𰨃𰨄𰨅𰨆𰨇𰨈𰨉𰨊𰨋𰨌𰨍𰨎𰨏𰨐𰨑𰨒𰨓𰨔𰨕𰨖𰨗𰨘𰨙𰨚𰨛𰨜𰨝𰨞𰨟𰨠𰨡𰨢𰨣𰨤𰨥𰨦𰨧𰨨𰨩𰨪𰨫𰨬𰨭𰨮𰨯𰨰𰨱𰨲𰨳𰨴𰨵𰨶𰨷𰨸𰨹𰨺𰨻𰨼𰨽𰨾𰨿𰩀𰩁𰩂𰩃𰩄𰩅𰩆𰩇𰩈𰩉𰩊𰩋𰩌𰩍𰩎𰩏𰩐𰩑𰩒𰩓𰩔𰩕𰩖𰩗𰩘𰩙𰩚𰩛𰩜𰩝𰩞𰩟𰩠𰩡𰩢𰩣𰩤𰩥𰩦𰩧𰩨𰩩𰩪𰩫𰩬𰩭𰩮𰩯𰩰𰩱𰩲𰩳𰩴𰩵𰩶𰩷𰩸𰩹𰩺𰩻𰩼𰩽𰩾𰩿𰪀𰪁𰪂𰪃𰪄𰪅𰪆𰪇𰪈𰪉𰪊𰪋𰪌𰪍𰪎𰪏𰪐𰪑𰪒𰪓𰪔𰪕𰪖𰪗𰪘𰪙𰪚𰪛𰪜𰪝𰪞𰪟𰪠𰪡𰪢𰪣𰪤𰪥𰪦𰪧𰪨𰪩𰪪𰪫𰪬𰪭𰪮𰪯𰪰𰪱𰪲𰪳𰪴𰪵𰪶𰪷𰪸𰪹𰪺𰪻𰪼𰪽𰪾𰪿𰫀𰫁𰫂𰫃𰫄𰫅𰫆𰫇𰫈𰫉𰫊𰫋𰫌𰫍𰫎𰫏𰫐𰫑𰫒𰫓𰫔𰫕𰫖𰫗𰫘𰫙𰫚𰫛𰫜𰫝𰫞𰫟𰫠𰫡𰫢𰫣𰫤𰫥𰫦𰫧𰫨𰫩𰫪𰫫𰫬𰫭𰫮𰫯𰫰𰫱𰫲𰫳𰫴𰫵𰫶𰫷𰫸𰫹𰫺𰫻𰫼𰫽𰫾𰫿𰬀𰬁𰬂𰬃𰬄𰬅𰬆𰬇𰬈𰬉𰬊𰬋𰬌𰬍𰬎𰬏𰬐𰬑𰬒𰬓𰬔𰬕𰬖𰬗𰬘𰬙𰬚𰬛𰬜𰬝𰬞𰬟𰬠𰬡𰬢𰬣𰬤𰬥𰬦𰬧𰬨𰬩𰬪𰬫𰬬𰬭𰬮𰬯𰬰𰬱𰬲𰬳𰬴𰬵𰬶𰬷𰬸𰬹𰬺𰬻𰬼𰬽𰬾𰬿𰭀𰭁𰭂𰭃𰭄𰭅𰭆𰭇𰭈𰭉𰭊𰭋𰭌𰭍𰭎𰭏𰭐𰭑𰭒𰭓𰭔𰭕𰭖𰭗𰭘𰭙𰭚𰭛𰭜𰭝𰭞𰭟𰭠𰭡𰭢𰭣𰭤𰭥𰭦𰭧𰭨𰭩𰭪𰭫𰭬𰭭𰭮𰭯𰭰𰭱𰭲𰭳𰭴𰭵𰭶𰭷𰭸𰭹𰭺𰭻𰭼𰭽𰭾𰭿𰮀𰮁𰮂𰮃𰮄𰮅𰮆𰮇𰮈𰮉𰮊𰮋𰮌𰮍𰮎𰮏𰮐𰮑𰮒𰮓𰮔𰮕𰮖𰮗𰮘𰮙𰮚𰮛𰮜𰮝𰮞𰮟𰮠𰮡𰮢𰮣𰮤𰮥𰮦𰮧𰮨𰮩𰮪𰮫𰮬𰮭𰮮𰮯𰮰𰮱𰮲𰮳𰮴𰮵𰮶𰮷𰮸𰮹𰮺𰮻𰮼𰮽𰮾𰮿𰯀𰯁𰯂𰯃𰯄𰯅𰯆𰯇𰯈𰯉𰯊𰯋𰯌𰯍𰯎𰯏𰯐𰯑𰯒𰯓𰯔𰯕𰯖𰯗𰯘𰯙𰯚𰯛𰯜𰯝𰯞𰯟𰯠𰯡𰯢𰯣𰯤𰯥𰯦𰯧𰯨𰯩𰯪𰯫𰯬𰯭𰯮𰯯𰯰𰯱𰯲𰯳𰯴𰯵𰯶𰯷𰯸𰯹𰯺𰯻𰯼𰯽𰯾𰯿𰰀𰰁𰰂𰰃𰰄𰰅𰰆𰰇𰰈𰰉𰰊𰰋𰰌𰰍𰰎𰰏𰰐𰰑𰰒𰰓𰰔𰰕𰰖𰰗𰰘𰰙𰰚𰰛𰰜𰰝𰰞𰰟𰰠𰰡𰰢𰰣𰰤𰰥𰰦𰰧𰰨𰰩𰰪𰰫𰰬𰰭𰰮𰰯𰰰𰰱𰰲𰰳𰰴𰰵𰰶𰰷𰰸𰰹𰰺𰰻𰰼𰰽𰰾𰰿𰱀𰱁𰱂𰱃𰱄𰱅𰱆𰱇𰱈𰱉𰱊𰱋𰱌𰱍𰱎𰱏𰱐𰱑𰱒𰱓𰱔𰱕𰱖𰱗𰱘𰱙𰱚𰱛𰱜𰱝𰱞𰱟𰱠𰱡𰱢𰱣𰱤𰱥𰱦𰱧𰱨𰱩𰱪𰱫𰱬𰱭𰱮𰱯𰱰𰱱𰱲𰱳𰱴𰱵𰱶𰱷𰱸𰱹𰱺𰱻𰱼𰱽𰱾𰱿𰲀𰲁𰲂𰲃𰲄𰲅𰲆𰲇𰲈𰲉𰲊𰲋𰲌𰲍𰲎𰲏𰲐𰲑𰲒𰲓𰲔𰲕𰲖𰲗𰲘𰲙𰲚𰲛𰲜𰲝𰲞𰲟𰲠𰲡𰲢𰲣𰲤𰲥𰲦𰲧𰲨𰲩𰲪𰲫𰲬𰲭𰲮𰲯𰲰𰲱𰲲𰲳𰲴𰲵𰲶𰲷𰲸𰲹𰲺𰲻𰲼𰲽𰲾𰲿𰳀𰳁𰳂𰳃𰳄𰳅𰳆𰳇𰳈𰳉𰳊𰳋𰳌𰳍𰳎𰳏𰳐𰳑𰳒𰳓𰳔𰳕𰳖𰳗𰳘𰳙𰳚𰳛𰳜𰳝𰳞𰳟𰳠𰳡𰳢𰳣𰳤𰳥𰳦𰳧𰳨𰳩𰳪𰳫𰳬𰳭𰳮𰳯𰳰𰳱𰳲𰳳𰳴𰳵𰳶𰳷𰳸𰳹𰳺𰳻𰳼𰳽𰳾𰳿𰴀𰴁𰴂𰴃𰴄𰴅𰴆𰴇𰴈𰴉𰴊𰴋𰴌𰴍𰴎𰴏𰴐𰴑𰴒𰴓𰴔𰴕𰴖𰴗𰴘𰴙𰴚𰴛𰴜𰴝𰴞𰴟𰴠𰴡𰴢𰴣𰴤𰴥𰴦𰴧𰴨𰴩𰴪𰴫𰴬𰴭𰴮𰴯𰴰𰴱𰴲𰴳𰴴𰴵𰴶𰴷𰴸𰴹𰴺𰴻𰴼𰴽𰴾𰴿𰵀𰵁𰵂𰵃𰵄𰵅𰵆𰵇𰵈𰵉𰵊𰵋𰵌𰵍𰵎𰵏𰵐𰵑𰵒𰵓𰵔𰵕𰵖𰵗𰵘𰵙𰵚𰵛𰵜𰵝𰵞𰵟𰵠𰵡𰵢𰵣𰵤𰵥𰵦𰵧𰵨𰵩𰵪𰵫𰵬𰵭𰵮𰵯𰵰𰵱𰵲𰵳𰵴𰵵𰵶𰵷𰵸𰵹𰵺𰵻𰵼𰵽𰵾𰵿𰶀𰶁𰶂𰶃𰶄𰶅𰶆𰶇𰶈𰶉𰶊𰶋𰶌𰶍𰶎𰶏𰶐𰶑𰶒𰶓𰶔𰶕𰶖𰶗𰶘𰶙𰶚𰶛𰶜𰶝𰶞𰶟𰶠𰶡𰶢𰶣𰶤𰶥𰶦𰶧𰶨𰶩𰶪𰶫𰶬𰶭𰶮𰶯𰶰𰶱𰶲𰶳𰶴𰶵𰶶𰶷𰶸𰶹𰶺𰶻𰶼𰶽𰶾𰶿𰷀𰷁𰷂𰷃𰷄𰷅𰷆𰷇𰷈𰷉𰷊𰷋𰷌𰷍𰷎𰷏𰷐𰷑𰷒𰷓𰷔𰷕𰷖𰷗𰷘𰷙𰷚𰷛𰷜𰷝𰷞𰷟𰷠𰷡𰷢𰷣𰷤𰷥𰷦𰷧𰷨𰷩𰷪𰷫𰷬𰷭𰷮𰷯𰷰𰷱𰷲𰷳𰷴𰷵𰷶𰷷𰷸𰷹𰷺𰷻𰷼𰷽𰷾𰷿𰸀𰸁𰸂𰸃𰸄𰸅𰸆𰸇𰸈𰸉𰸊𰸋𰸌𰸍𰸎𰸏𰸐𰸑𰸒𰸓𰸔𰸕𰸖𰸗𰸘𰸙𰸚𰸛𰸜𰸝𰸞𰸟𰸠𰸡𰸢𰸣𰸤𰸥𰸦𰸧𰸨𰸩𰸪𰸫𰸬𰸭𰸮𰸯𰸰𰸱𰸲𰸳𰸴𰸵𰸶𰸷𰸸𰸹𰸺𰸻𰸼𰸽𰸾𰸿𰹀𰹁𰹂𰹃𰹄𰹅𰹆𰹇𰹈𰹉𰹊𰹋𰹌𰹍𰹎𰹏𰹐𰹑𰹒𰹓𰹔𰹕𰹖𰹗𰹘𰹙𰹚𰹛𰹜𰹝𰹞𰹟𰹠𰹡𰹢𰹣𰹤𰹥𰹦𰹧𰹨𰹩𰹪𰹫𰹬𰹭𰹮𰹯𰹰𰹱𰹲𰹳𰹴𰹵𰹶𰹷𰹸𰹹𰹺𰹻𰹼𰹽𰹾𰹿𰺀𰺁𰺂𰺃𰺄𰺅𰺆𰺇𰺈𰺉𰺊𰺋𰺌𰺍𰺎𰺏𰺐𰺑𰺒𰺓𰺔𰺕𰺖𰺗𰺘𰺙𰺚𰺛𰺜𰺝𰺞𰺟𰺠𰺡𰺢𰺣𰺤𰺥𰺦𰺧𰺨𰺩𰺪𰺫𰺬𰺭𰺮𰺯𰺰𰺱𰺲𰺳𰺴𰺵𰺶𰺷𰺸𰺹𰺺𰺻𰺼𰺽𰺾𰺿𰻀𰻁𰻂𰻃𰻄𰻅𰻆𰻇𰻈𰻉𰻊𰻋𰻌𰻍𰻎𰻏𰻐𰻑𰻒𰻓𰻔𰻕𰻖𰻗𰻘𰻙𰻚𰻛𰻜𰻝𰻞𰻟𰻠𰻡𰻢𰻣𰻤𰻥𰻦𰻧𰻨𰻩𰻪𰻫𰻬𰻭𰻮𰻯𰻰𰻱𰻲𰻳𰻴𰻵𰻶𰻷𰻸𰻹𰻺𰻻𰻼𰻽𰻾𰻿𰼀𰼁𰼂𰼃𰼄𰼅𰼆𰼇𰼈𰼉𰼊𰼋𰼌𰼍𰼎𰼏𰼐𰼑𰼒𰼓𰼔𰼕𰼖𰼗𰼘𰼙𰼚𰼛𰼜𰼝𰼞𰼟𰼠𰼡𰼢𰼣𰼤𰼥𰼦𰼧𰼨𰼩𰼪𰼫𰼬𰼭𰼮𰼯𰼰𰼱𰼲𰼳𰼴𰼵𰼶𰼷𰼸𰼹𰼺𰼻𰼼𰼽𰼾𰼿𰽀𰽁𰽂𰽃𰽄𰽅𰽆𰽇𰽈𰽉𰽊𰽋𰽌𰽍𰽎𰽏𰽐𰽑𰽒𰽓𰽔𰽕𰽖𰽗𰽘𰽙𰽚𰽛𰽜𰽝𰽞𰽟𰽠𰽡𰽢𰽣𰽤𰽥𰽦𰽧𰽨𰽩𰽪𰽫𰽬𰽭𰽮𰽯𰽰𰽱𰽲𰽳𰽴𰽵𰽶𰽷𰽸𰽹𰽺𰽻𰽼𰽽𰽾𰽿𰾀𰾁𰾂𰾃𰾄𰾅𰾆𰾇𰾈𰾉𰾊𰾋𰾌𰾍𰾎𰾏𰾐𰾑𰾒𰾓𰾔𰾕𰾖𰾗𰾘𰾙𰾚𰾛𰾜𰾝𰾞𰾟𰾠𰾡𰾢𰾣𰾤𰾥𰾦𰾧𰾨𰾩𰾪𰾫𰾬𰾭𰾮𰾯𰾰𰾱𰾲𰾳𰾴𰾵𰾶𰾷𰾸𰾹𰾺𰾻𰾼𰾽𰾾𰾿𰿀𰿁𰿂𰿃𰿄𰿅𰿆𰿇𰿈𰿉𰿊𰿋𰿌𰿍𰿎𰿏𰿐𰿑𰿒𰿓𰿔𰿕𰿖𰿗𰿘𰿙𰿚𰿛𰿜𰿝𰿞𰿟𰿠𰿡𰿢𰿣𰿤𰿥𰿦𰿧𰿨𰿩𰿪𰿫𰿬𰿭𰿮𰿯𰿰𰿱𰿲𰿳𰿴𰿵𰿶𰿷𰿸𰿹𰿺𰿻𰿼𰿽𰿾𰿿𱀀𱀁𱀂𱀃𱀄𱀅𱀆𱀇𱀈𱀉𱀊𱀋𱀌𱀍𱀎𱀏𱀐𱀑𱀒𱀓𱀔𱀕𱀖𱀗𱀘𱀙𱀚𱀛𱀜𱀝𱀞𱀟𱀠𱀡𱀢𱀣𱀤𱀥𱀦𱀧𱀨𱀩𱀪𱀫𱀬𱀭𱀮𱀯𱀰𱀱𱀲𱀳𱀴𱀵𱀶𱀷𱀸𱀹𱀺𱀻𱀼𱀽𱀾𱀿𱁀𱁁𱁂𱁃𱁄𱁅𱁆𱁇𱁈𱁉𱁊𱁋𱁌𱁍𱁎𱁏𱁐𱁑𱁒𱁓𱁔𱁕𱁖𱁗𱁘𱁙𱁚𱁛𱁜𱁝𱁞𱁟𱁠𱁡𱁢𱁣𱁤𱁥𱁦𱁧𱁨𱁩𱁪𱁫𱁬𱁭𱁮𱁯𱁰𱁱𱁲𱁳𱁴𱁵𱁶𱁷𱁸𱁹𱁺𱁻𱁼𱁽𱁾𱁿𱂀𱂁𱂂𱂃𱂄𱂅𱂆𱂇𱂈𱂉𱂊𱂋𱂌𱂍𱂎𱂏𱂐𱂑𱂒𱂓𱂔𱂕𱂖𱂗𱂘𱂙𱂚𱂛𱂜𱂝𱂞𱂟𱂠𱂡𱂢𱂣𱂤𱂥𱂦𱂧𱂨𱂩𱂪𱂫𱂬𱂭𱂮𱂯𱂰𱂱𱂲𱂳𱂴𱂵𱂶𱂷𱂸𱂹𱂺𱂻𱂼𱂽𱂾𱂿𱃀𱃁𱃂𱃃𱃄𱃅𱃆𱃇𱃈𱃉𱃊𱃋𱃌𱃍𱃎𱃏𱃐𱃑𱃒𱃓𱃔𱃕𱃖𱃗𱃘𱃙𱃚𱃛𱃜𱃝𱃞𱃟𱃠𱃡𱃢𱃣𱃤𱃥𱃦𱃧𱃨𱃩𱃪𱃫𱃬𱃭𱃮𱃯𱃰𱃱𱃲𱃳𱃴𱃵𱃶𱃷𱃸𱃹𱃺𱃻𱃼𱃽𱃾𱃿𱄀𱄁𱄂𱄃𱄄𱄅𱄆𱄇𱄈𱄉𱄊𱄋𱄌𱄍𱄎𱄏𱄐𱄑𱄒𱄓𱄔𱄕𱄖𱄗𱄘𱄙𱄚𱄛𱄜𱄝𱄞𱄟𱄠𱄡𱄢𱄣𱄤𱄥𱄦𱄧𱄨𱄩𱄪𱄫𱄬𱄭𱄮𱄯𱄰𱄱𱄲𱄳𱄴𱄵𱄶𱄷𱄸𱄹𱄺𱄻𱄼𱄽𱄾𱄿𱅀𱅁𱅂𱅃𱅄𱅅𱅆𱅇𱅈𱅉𱅊𱅋𱅌𱅍𱅎𱅏𱅐𱅑𱅒𱅓𱅔𱅕𱅖𱅗𱅘𱅙𱅚𱅛𱅜𱅝𱅞𱅟𱅠𱅡𱅢𱅣𱅤𱅥𱅦𱅧𱅨𱅩𱅪𱅫𱅬𱅭𱅮𱅯𱅰𱅱𱅲𱅳𱅴𱅵𱅶𱅷𱅸𱅹𱅺𱅻𱅼𱅽𱅾𱅿𱆀𱆁𱆂𱆃𱆄𱆅𱆆𱆇𱆈𱆉𱆊𱆋𱆌𱆍𱆎𱆏𱆐𱆑𱆒𱆓𱆔𱆕𱆖𱆗𱆘𱆙𱆚𱆛𱆜𱆝𱆞𱆟𱆠𱆡𱆢𱆣𱆤𱆥𱆦𱆧𱆨𱆩𱆪𱆫𱆬𱆭𱆮𱆯𱆰𱆱𱆲𱆳𱆴𱆵𱆶𱆷𱆸𱆹𱆺𱆻𱆼𱆽𱆾𱆿𱇀𱇁𱇂𱇃𱇄𱇅𱇆𱇇𱇈𱇉𱇊𱇋𱇌𱇍𱇎𱇏𱇐𱇑𱇒𱇓𱇔𱇕𱇖𱇗𱇘𱇙𱇚𱇛𱇜𱇝𱇞𱇟𱇠𱇡𱇢𱇣𱇤𱇥𱇦𱇧𱇨𱇩𱇪𱇫𱇬𱇭𱇮𱇯𱇰𱇱𱇲𱇳𱇴𱇵𱇶𱇷𱇸𱇹𱇺𱇻𱇼𱇽𱇾𱇿𱈀𱈁𱈂𱈃𱈄𱈅𱈆𱈇𱈈𱈉𱈊𱈋𱈌𱈍𱈎𱈏𱈐𱈑𱈒𱈓𱈔𱈕𱈖𱈗𱈘𱈙𱈚𱈛𱈜𱈝𱈞𱈟𱈠𱈡𱈢𱈣𱈤𱈥𱈦𱈧𱈨𱈩𱈪𱈫𱈬𱈭𱈮𱈯𱈰𱈱𱈲𱈳𱈴𱈵𱈶𱈷𱈸𱈹𱈺𱈻𱈼𱈽𱈾𱈿𱉀𱉁𱉂𱉃𱉄𱉅𱉆𱉇𱉈𱉉𱉊𱉋𱉌𱉍𱉎𱉏𱉐𱉑𱉒𱉓𱉔𱉕𱉖𱉗𱉘𱉙𱉚𱉛𱉜𱉝𱉞𱉟𱉠𱉡𱉢𱉣𱉤𱉥𱉦𱉧𱉨𱉩𱉪𱉫𱉬𱉭𱉮𱉯𱉰𱉱𱉲𱉳𱉴𱉵𱉶𱉷𱉸𱉹𱉺𱉻𱉼𱉽𱉾𱉿𱊀𱊁𱊂𱊃𱊄𱊅𱊆𱊇𱊈𱊉𱊊𱊋𱊌𱊍𱊎𱊏𱊐𱊑𱊒𱊓𱊔𱊕𱊖𱊗𱊘𱊙𱊚𱊛𱊜𱊝𱊞𱊟𱊠𱊡𱊢𱊣𱊤𱊥𱊦𱊧𱊨𱊩𱊪𱊫𱊬𱊭𱊮𱊯𱊰𱊱𱊲𱊳𱊴𱊵𱊶𱊷𱊸𱊹𱊺𱊻𱊼𱊽𱊾𱊿𱋀𱋁𱋂𱋃𱋄𱋅𱋆𱋇𱋈𱋉𱋊𱋋𱋌𱋍𱋎𱋏𱋐𱋑𱋒𱋓𱋔𱋕𱋖𱋗𱋘𱋙𱋚𱋛𱋜𱋝𱋞𱋟𱋠𱋡𱋢𱋣𱋤𱋥𱋦𱋧𱋨𱋩𱋪𱋫𱋬𱋭𱋮𱋯𱋰𱋱𱋲𱋳𱋴𱋵𱋶𱋷𱋸𱋹𱋺𱋻𱋼𱋽𱋾𱋿𱌀𱌁𱌂𱌃𱌄𱌅𱌆𱌇𱌈𱌉𱌊𱌋𱌌𱌍𱌎𱌏𱌐𱌑𱌒𱌓𱌔𱌕𱌖𱌗𱌘𱌙𱌚𱌛𱌜𱌝𱌞𱌟𱌠𱌡𱌢𱌣𱌤𱌥𱌦𱌧𱌨𱌩𱌪𱌫𱌬𱌭𱌮𱌯𱌰𱌱𱌲𱌳𱌴𱌵𱌶𱌷𱌸𱌹𱌺𱌻𱌼𱌽𱌾𱌿𱍀𱍁𱍂𱍃𱍄𱍅𱍆𱍇𱍈𱍉𱍊;`,
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
                  'ࢾࢿࣀࣁࣂࣃࣄࣅࣆࣇഄㆻㆼㆽㆾㆿ䶶䶷䶸䶹䶺䶻䶼䶽䶾䶿鿰鿱鿲鿳鿴鿵鿶鿷鿸鿹鿺鿻鿼ꟇꟈꟉꟊꟵꟶꭨꭩ𐺀𐺁𐺂𐺃𐺄𐺅𐺆𐺇𐺈𐺉𐺊𐺋𐺌𐺍𐺎𐺏𐺐𐺑𐺒𐺓𐺔𐺕𐺖𐺗𐺘𐺙𐺚𐺛𐺜𐺝𐺞𐺟𐺠𐺡𐺢𐺣𐺤𐺥𐺦𐺧𐺨𐺩𐺰𐺱𐾰𐾱𐾲𐾳𐾴𐾵𐾶𐾷𐾸𐾹𐾺𐾻𐾼𐾽𐾾𐾿𐿀𐿁𐿂𐿃𐿄𑅇𑑠𑑡𑤀𑤁𑤂𑤃𑤄𑤅𑤆𑤉𑤌𑤍𑤎𑤏𑤐𑤑𑤒𑤓𑤕𑤖𑤘𑤙𑤚𑤛𑤜𑤝𑤞𑤟𑤠𑤡𑤢𑤣𑤤𑤥𑤦𑤧𑤨𑤩𑤪𑤫𑤬𑤭𑤮𑤯𑤿𑥁𑾰𘫳𘫴𘫵𘫶𘫷𘫸𘫹𘫺𘫻𘫼𘫽𘫾𘫿𘬀𘬁𘬂𘬃𘬄𘬅𘬆𘬇𘬈𘬉𘬊𘬋𘬌𘬍𘬎𘬏𘬐𘬑𘬒𘬓𘬔𘬕𘬖𘬗𘬘𘬙𘬚𘬛𘬜𘬝𘬞𘬟𘬠𘬡𘬢𘬣𘬤𘬥𘬦𘬧𘬨𘬩𘬪𘬫𘬬𘬭𘬮𘬯𘬰𘬱𘬲𘬳𘬴𘬵𘬶𘬷𘬸𘬹𘬺𘬻𘬼𘬽𘬾𘬿𘭀𘭁𘭂𘭃𘭄𘭅𘭆𘭇𘭈𘭉𘭊𘭋𘭌𘭍𘭎𘭏𘭐𘭑𘭒𘭓𘭔𘭕𘭖𘭗𘭘𘭙𘭚𘭛𘭜𘭝𘭞𘭟𘭠𘭡𘭢𘭣𘭤𘭥𘭦𘭧𘭨𘭩𘭪𘭫𘭬𘭭𘭮𘭯𘭰𘭱𘭲𘭳𘭴𘭵𘭶𘭷𘭸𘭹𘭺𘭻𘭼𘭽𘭾𘭿𘮀𘮁𘮂𘮃𘮄𘮅𘮆𘮇𘮈𘮉𘮊𘮋𘮌𘮍𘮎𘮏𘮐𘮑𘮒𘮓𘮔𘮕𘮖𘮗𘮘𘮙𘮚𘮛𘮜𘮝𘮞𘮟𘮠𘮡𘮢𘮣𘮤𘮥𘮦𘮧𘮨𘮩𘮪𘮫𘮬𘮭𘮮𘮯𘮰𘮱𘮲𘮳𘮴𘮵𘮶𘮷𘮸𘮹𘮺𘮻𘮼𘮽𘮾𘮿𘯀𘯁𘯂𘯃𘯄𘯅𘯆𘯇𘯈𘯉𘯊𘯋𘯌𘯍𘯎𘯏𘯐𘯑𘯒𘯓𘯔𘯕𘯖𘯗𘯘𘯙𘯚𘯛𘯜𘯝𘯞𘯟𘯠𘯡𘯢𘯣𘯤𘯥𘯦𘯧𘯨𘯩𘯪𘯫𘯬𘯭𘯮𘯯𘯰𘯱𘯲𘯳𘯴𘯵𘯶𘯷𘯸𘯹𘯺𘯻𘯼𘯽𘯾𘯿𘰀𘰁𘰂𘰃𘰄𘰅𘰆𘰇𘰈𘰉𘰊𘰋𘰌𘰍𘰎𘰏𘰐𘰑𘰒𘰓𘰔𘰕𘰖𘰗𘰘𘰙𘰚𘰛𘰜𘰝𘰞𘰟𘰠𘰡𘰢𘰣𘰤𘰥𘰦𘰧𘰨𘰩𘰪𘰫𘰬𘰭𘰮𘰯𘰰𘰱𘰲𘰳𘰴𘰵𘰶𘰷𘰸𘰹𘰺𘰻𘰼𘰽𘰾𘰿𘱀𘱁𘱂𘱃𘱄𘱅𘱆𘱇𘱈𘱉𘱊𘱋𘱌𘱍𘱎𘱏𘱐𘱑𘱒𘱓𘱔𘱕𘱖𘱗𘱘𘱙𘱚𘱛𘱜𘱝𘱞𘱟𘱠𘱡𘱢𘱣𘱤𘱥𘱦𘱧𘱨𘱩𘱪𘱫𘱬𘱭𘱮𘱯𘱰𘱱𘱲𘱳𘱴𘱵𘱶𘱷𘱸𘱹𘱺𘱻𘱼𘱽𘱾𘱿𘲀𘲁𘲂𘲃𘲄𘲅𘲆𘲇𘲈𘲉𘲊𘲋𘲌𘲍𘲎𘲏𘲐𘲑𘲒𘲓𘲔𘲕𘲖𘲗𘲘𘲙𘲚𘲛𘲜𘲝𘲞𘲟𘲠𘲡𘲢𘲣𘲤𘲥𘲦𘲧𘲨𘲩𘲪𘲫𘲬𘲭𘲮𘲯𘲰𘲱𘲲𘲳𘲴𘲵𘲶𘲷𘲸𘲹𘲺𘲻𘲼𘲽𘲾𘲿𘳀𘳁𘳂𘳃𘳄𘳅𘳆𘳇𘳈𘳉𘳊𘳋𘳌𘳍𘳎𘳏𘳐𘳑𘳒𘳓𘳔𘳕𘴀𘴁𘴂𘴃𘴄𘴅𘴆𘴇𘴈𪛗𪛘𪛙𪛚𪛛𪛜𪛝𰀀𰀁𰀂𰀃𰀄𰀅𰀆𰀇𰀈𰀉𰀊𰀋𰀌𰀍𰀎𰀏𰀐𰀑𰀒𰀓𰀔𰀕𰀖𰀗𰀘𰀙𰀚𰀛𰀜𰀝𰀞𰀟𰀠𰀡𰀢𰀣𰀤𰀥𰀦𰀧𰀨𰀩𰀪𰀫𰀬𰀭𰀮𰀯𰀰𰀱𰀲𰀳𰀴𰀵𰀶𰀷𰀸𰀹𰀺𰀻𰀼𰀽𰀾𰀿𰁀𰁁𰁂𰁃𰁄𰁅𰁆𰁇𰁈𰁉𰁊𰁋𰁌𰁍𰁎𰁏𰁐𰁑𰁒𰁓𰁔𰁕𰁖𰁗𰁘𰁙𰁚𰁛𰁜𰁝𰁞𰁟𰁠𰁡𰁢𰁣𰁤𰁥𰁦𰁧𰁨𰁩𰁪𰁫𰁬𰁭𰁮𰁯𰁰𰁱𰁲𰁳𰁴𰁵𰁶𰁷𰁸𰁹𰁺𰁻𰁼𰁽𰁾𰁿𰂀𰂁𰂂𰂃𰂄𰂅𰂆𰂇𰂈𰂉𰂊𰂋𰂌𰂍𰂎𰂏𰂐𰂑𰂒𰂓𰂔𰂕𰂖𰂗𰂘𰂙𰂚𰂛𰂜𰂝𰂞𰂟𰂠𰂡𰂢𰂣𰂤𰂥𰂦𰂧𰂨𰂩𰂪𰂫𰂬𰂭𰂮𰂯𰂰𰂱𰂲𰂳𰂴𰂵𰂶𰂷𰂸𰂹𰂺𰂻𰂼𰂽𰂾𰂿𰃀𰃁𰃂𰃃𰃄𰃅𰃆𰃇𰃈𰃉𰃊𰃋𰃌𰃍𰃎𰃏𰃐𰃑𰃒𰃓𰃔𰃕𰃖𰃗𰃘𰃙𰃚𰃛𰃜𰃝𰃞𰃟𰃠𰃡𰃢𰃣𰃤𰃥𰃦𰃧𰃨𰃩𰃪𰃫𰃬𰃭𰃮𰃯𰃰𰃱𰃲𰃳𰃴𰃵𰃶𰃷𰃸𰃹𰃺𰃻𰃼𰃽𰃾𰃿𰄀𰄁𰄂𰄃𰄄𰄅𰄆𰄇𰄈𰄉𰄊𰄋𰄌𰄍𰄎𰄏𰄐𰄑𰄒𰄓𰄔𰄕𰄖𰄗𰄘𰄙𰄚𰄛𰄜𰄝𰄞𰄟𰄠𰄡𰄢𰄣𰄤𰄥𰄦𰄧𰄨𰄩𰄪𰄫𰄬𰄭𰄮𰄯𰄰𰄱𰄲𰄳𰄴𰄵𰄶𰄷𰄸𰄹𰄺𰄻𰄼𰄽𰄾𰄿𰅀𰅁𰅂𰅃𰅄𰅅𰅆𰅇𰅈𰅉𰅊𰅋𰅌𰅍𰅎𰅏𰅐𰅑𰅒𰅓𰅔𰅕𰅖𰅗𰅘𰅙𰅚𰅛𰅜𰅝𰅞𰅟𰅠𰅡𰅢𰅣𰅤𰅥𰅦𰅧𰅨𰅩𰅪𰅫𰅬𰅭𰅮𰅯𰅰𰅱𰅲𰅳𰅴𰅵𰅶𰅷𰅸𰅹𰅺𰅻𰅼𰅽𰅾𰅿𰆀𰆁𰆂𰆃𰆄𰆅𰆆𰆇𰆈𰆉𰆊𰆋𰆌𰆍𰆎𰆏𰆐𰆑𰆒𰆓𰆔𰆕𰆖𰆗𰆘𰆙𰆚𰆛𰆜𰆝𰆞𰆟𰆠𰆡𰆢𰆣𰆤𰆥𰆦𰆧𰆨𰆩𰆪𰆫𰆬𰆭𰆮𰆯𰆰𰆱𰆲𰆳𰆴𰆵𰆶𰆷𰆸𰆹𰆺𰆻𰆼𰆽𰆾𰆿𰇀𰇁𰇂𰇃𰇄𰇅𰇆𰇇𰇈𰇉𰇊𰇋𰇌𰇍𰇎𰇏𰇐𰇑𰇒𰇓𰇔𰇕𰇖𰇗𰇘𰇙𰇚𰇛𰇜𰇝𰇞𰇟𰇠𰇡𰇢𰇣𰇤𰇥𰇦𰇧𰇨𰇩𰇪𰇫𰇬𰇭𰇮𰇯𰇰𰇱𰇲𰇳𰇴𰇵𰇶𰇷𰇸𰇹𰇺𰇻𰇼𰇽𰇾𰇿𰈀𰈁𰈂𰈃𰈄𰈅𰈆𰈇𰈈𰈉𰈊𰈋𰈌𰈍𰈎𰈏𰈐𰈑𰈒𰈓𰈔𰈕𰈖𰈗𰈘𰈙𰈚𰈛𰈜𰈝𰈞𰈟𰈠𰈡𰈢𰈣𰈤𰈥𰈦𰈧𰈨𰈩𰈪𰈫𰈬𰈭𰈮𰈯𰈰𰈱𰈲𰈳𰈴𰈵𰈶𰈷𰈸𰈹𰈺𰈻𰈼𰈽𰈾𰈿𰉀𰉁𰉂𰉃𰉄𰉅𰉆𰉇𰉈𰉉𰉊𰉋𰉌𰉍𰉎𰉏𰉐𰉑𰉒𰉓𰉔𰉕𰉖𰉗𰉘𰉙𰉚𰉛𰉜𰉝𰉞𰉟𰉠𰉡𰉢𰉣𰉤𰉥𰉦𰉧𰉨𰉩𰉪𰉫𰉬𰉭𰉮𰉯𰉰𰉱𰉲𰉳𰉴𰉵𰉶𰉷𰉸𰉹𰉺𰉻𰉼𰉽𰉾𰉿𰊀𰊁𰊂𰊃𰊄𰊅𰊆𰊇𰊈𰊉𰊊𰊋𰊌𰊍𰊎𰊏𰊐𰊑𰊒𰊓𰊔𰊕𰊖𰊗𰊘𰊙𰊚𰊛𰊜𰊝𰊞𰊟𰊠𰊡𰊢𰊣𰊤𰊥𰊦𰊧𰊨𰊩𰊪𰊫𰊬𰊭𰊮𰊯𰊰𰊱𰊲𰊳𰊴𰊵𰊶𰊷𰊸𰊹𰊺𰊻𰊼𰊽𰊾𰊿𰋀𰋁𰋂𰋃𰋄𰋅𰋆𰋇𰋈𰋉𰋊𰋋𰋌𰋍𰋎𰋏𰋐𰋑𰋒𰋓𰋔𰋕𰋖𰋗𰋘𰋙𰋚𰋛𰋜𰋝𰋞𰋟𰋠𰋡𰋢𰋣𰋤𰋥𰋦𰋧𰋨𰋩𰋪𰋫𰋬𰋭𰋮𰋯𰋰𰋱𰋲𰋳𰋴𰋵𰋶𰋷𰋸𰋹𰋺𰋻𰋼𰋽𰋾𰋿𰌀𰌁𰌂𰌃𰌄𰌅𰌆𰌇𰌈𰌉𰌊𰌋𰌌𰌍𰌎𰌏𰌐𰌑𰌒𰌓𰌔𰌕𰌖𰌗𰌘𰌙𰌚𰌛𰌜𰌝𰌞𰌟𰌠𰌡𰌢𰌣𰌤𰌥𰌦𰌧𰌨𰌩𰌪𰌫𰌬𰌭𰌮𰌯𰌰𰌱𰌲𰌳𰌴𰌵𰌶𰌷𰌸𰌹𰌺𰌻𰌼𰌽𰌾𰌿𰍀𰍁𰍂𰍃𰍄𰍅𰍆𰍇𰍈𰍉𰍊𰍋𰍌𰍍𰍎𰍏𰍐𰍑𰍒𰍓𰍔𰍕𰍖𰍗𰍘𰍙𰍚𰍛𰍜𰍝𰍞𰍟𰍠𰍡𰍢𰍣𰍤𰍥𰍦𰍧𰍨𰍩𰍪𰍫𰍬𰍭𰍮𰍯𰍰𰍱𰍲𰍳𰍴𰍵𰍶𰍷𰍸𰍹𰍺𰍻𰍼𰍽𰍾𰍿𰎀𰎁𰎂𰎃𰎄𰎅𰎆𰎇𰎈𰎉𰎊𰎋𰎌𰎍𰎎𰎏𰎐𰎑𰎒𰎓𰎔𰎕𰎖𰎗𰎘𰎙𰎚𰎛𰎜𰎝𰎞𰎟𰎠𰎡𰎢𰎣𰎤𰎥𰎦𰎧𰎨𰎩𰎪𰎫𰎬𰎭𰎮𰎯𰎰𰎱𰎲𰎳𰎴𰎵𰎶𰎷𰎸𰎹𰎺𰎻𰎼𰎽𰎾𰎿𰏀𰏁𰏂𰏃𰏄𰏅𰏆𰏇𰏈𰏉𰏊𰏋𰏌𰏍𰏎𰏏𰏐𰏑𰏒𰏓𰏔𰏕𰏖𰏗𰏘𰏙𰏚𰏛𰏜𰏝𰏞𰏟𰏠𰏡𰏢𰏣𰏤𰏥𰏦𰏧𰏨𰏩𰏪𰏫𰏬𰏭𰏮𰏯𰏰𰏱𰏲𰏳𰏴𰏵𰏶𰏷𰏸𰏹𰏺𰏻𰏼𰏽𰏾𰏿𰐀𰐁𰐂𰐃𰐄𰐅𰐆𰐇𰐈𰐉𰐊𰐋𰐌𰐍𰐎𰐏𰐐𰐑𰐒𰐓𰐔𰐕𰐖𰐗𰐘𰐙𰐚𰐛𰐜𰐝𰐞𰐟𰐠𰐡𰐢𰐣𰐤𰐥𰐦𰐧𰐨𰐩𰐪𰐫𰐬𰐭𰐮𰐯𰐰𰐱𰐲𰐳𰐴𰐵𰐶𰐷𰐸𰐹𰐺𰐻𰐼𰐽𰐾𰐿𰑀𰑁𰑂𰑃𰑄𰑅𰑆𰑇𰑈𰑉𰑊𰑋𰑌𰑍𰑎𰑏𰑐𰑑𰑒𰑓𰑔𰑕𰑖𰑗𰑘𰑙𰑚𰑛𰑜𰑝𰑞𰑟𰑠𰑡𰑢𰑣𰑤𰑥𰑦𰑧𰑨𰑩𰑪𰑫𰑬𰑭𰑮𰑯𰑰𰑱𰑲𰑳𰑴𰑵𰑶𰑷𰑸𰑹𰑺𰑻𰑼𰑽𰑾𰑿𰒀𰒁𰒂𰒃𰒄𰒅𰒆𰒇𰒈𰒉𰒊𰒋𰒌𰒍𰒎𰒏𰒐𰒑𰒒𰒓𰒔𰒕𰒖𰒗𰒘𰒙𰒚𰒛𰒜𰒝𰒞𰒟𰒠𰒡𰒢𰒣𰒤𰒥𰒦𰒧𰒨𰒩𰒪𰒫𰒬𰒭𰒮𰒯𰒰𰒱𰒲𰒳𰒴𰒵𰒶𰒷𰒸𰒹𰒺𰒻𰒼𰒽𰒾𰒿𰓀𰓁𰓂𰓃𰓄𰓅𰓆𰓇𰓈𰓉𰓊𰓋𰓌𰓍𰓎𰓏𰓐𰓑𰓒𰓓𰓔𰓕𰓖𰓗𰓘𰓙𰓚𰓛𰓜𰓝𰓞𰓟𰓠𰓡𰓢𰓣𰓤𰓥𰓦𰓧𰓨𰓩𰓪𰓫𰓬𰓭𰓮𰓯𰓰𰓱𰓲𰓳𰓴𰓵𰓶𰓷𰓸𰓹𰓺𰓻𰓼𰓽𰓾𰓿𰔀𰔁𰔂𰔃𰔄𰔅𰔆𰔇𰔈𰔉𰔊𰔋𰔌𰔍𰔎𰔏𰔐𰔑𰔒𰔓𰔔𰔕𰔖𰔗𰔘𰔙𰔚𰔛𰔜𰔝𰔞𰔟𰔠𰔡𰔢𰔣𰔤𰔥𰔦𰔧𰔨𰔩𰔪𰔫𰔬𰔭𰔮𰔯𰔰𰔱𰔲𰔳𰔴𰔵𰔶𰔷𰔸𰔹𰔺𰔻𰔼𰔽𰔾𰔿𰕀𰕁𰕂𰕃𰕄𰕅𰕆𰕇𰕈𰕉𰕊𰕋𰕌𰕍𰕎𰕏𰕐𰕑𰕒𰕓𰕔𰕕𰕖𰕗𰕘𰕙𰕚𰕛𰕜𰕝𰕞𰕟𰕠𰕡𰕢𰕣𰕤𰕥𰕦𰕧𰕨𰕩𰕪𰕫𰕬𰕭𰕮𰕯𰕰𰕱𰕲𰕳𰕴𰕵𰕶𰕷𰕸𰕹𰕺𰕻𰕼𰕽𰕾𰕿𰖀𰖁𰖂𰖃𰖄𰖅𰖆𰖇𰖈𰖉𰖊𰖋𰖌𰖍𰖎𰖏𰖐𰖑𰖒𰖓𰖔𰖕𰖖𰖗𰖘𰖙𰖚𰖛𰖜𰖝𰖞𰖟𰖠𰖡𰖢𰖣𰖤𰖥𰖦𰖧𰖨𰖩𰖪𰖫𰖬𰖭𰖮𰖯𰖰𰖱𰖲𰖳𰖴𰖵𰖶𰖷𰖸𰖹𰖺𰖻𰖼𰖽𰖾𰖿𰗀𰗁𰗂𰗃𰗄𰗅𰗆𰗇𰗈𰗉𰗊𰗋𰗌𰗍𰗎𰗏𰗐𰗑𰗒𰗓𰗔𰗕𰗖𰗗𰗘𰗙𰗚𰗛𰗜𰗝𰗞𰗟𰗠𰗡𰗢𰗣𰗤𰗥𰗦𰗧𰗨𰗩𰗪𰗫𰗬𰗭𰗮𰗯𰗰𰗱𰗲𰗳𰗴𰗵𰗶𰗷𰗸𰗹𰗺𰗻𰗼𰗽𰗾𰗿𰘀𰘁𰘂𰘃𰘄𰘅𰘆𰘇𰘈𰘉𰘊𰘋𰘌𰘍𰘎𰘏𰘐𰘑𰘒𰘓𰘔𰘕𰘖𰘗𰘘𰘙𰘚𰘛𰘜𰘝𰘞𰘟𰘠𰘡𰘢𰘣𰘤𰘥𰘦𰘧𰘨𰘩𰘪𰘫𰘬𰘭𰘮𰘯𰘰𰘱𰘲𰘳𰘴𰘵𰘶𰘷𰘸𰘹𰘺𰘻𰘼𰘽𰘾𰘿𰙀𰙁𰙂𰙃𰙄𰙅𰙆𰙇𰙈𰙉𰙊𰙋𰙌𰙍𰙎𰙏𰙐𰙑𰙒𰙓𰙔𰙕𰙖𰙗𰙘𰙙𰙚𰙛𰙜𰙝𰙞𰙟𰙠𰙡𰙢𰙣𰙤𰙥𰙦𰙧𰙨𰙩𰙪𰙫𰙬𰙭𰙮𰙯𰙰𰙱𰙲𰙳𰙴𰙵𰙶𰙷𰙸𰙹𰙺𰙻𰙼𰙽𰙾𰙿𰚀𰚁𰚂𰚃𰚄𰚅𰚆𰚇𰚈𰚉𰚊𰚋𰚌𰚍𰚎𰚏𰚐𰚑𰚒𰚓𰚔𰚕𰚖𰚗𰚘𰚙𰚚𰚛𰚜𰚝𰚞𰚟𰚠𰚡𰚢𰚣𰚤𰚥𰚦𰚧𰚨𰚩𰚪𰚫𰚬𰚭𰚮𰚯𰚰𰚱𰚲𰚳𰚴𰚵𰚶𰚷𰚸𰚹𰚺𰚻𰚼𰚽𰚾𰚿𰛀𰛁𰛂𰛃𰛄𰛅𰛆𰛇𰛈𰛉𰛊𰛋𰛌𰛍𰛎𰛏𰛐𰛑𰛒𰛓𰛔𰛕𰛖𰛗𰛘𰛙𰛚𰛛𰛜𰛝𰛞𰛟𰛠𰛡𰛢𰛣𰛤𰛥𰛦𰛧𰛨𰛩𰛪𰛫𰛬𰛭𰛮𰛯𰛰𰛱𰛲𰛳𰛴𰛵𰛶𰛷𰛸𰛹𰛺𰛻𰛼𰛽𰛾𰛿𰜀𰜁𰜂𰜃𰜄𰜅𰜆𰜇𰜈𰜉𰜊𰜋𰜌𰜍𰜎𰜏𰜐𰜑𰜒𰜓𰜔𰜕𰜖𰜗𰜘𰜙𰜚𰜛𰜜𰜝𰜞𰜟𰜠𰜡𰜢𰜣𰜤𰜥𰜦𰜧𰜨𰜩𰜪𰜫𰜬𰜭𰜮𰜯𰜰𰜱𰜲𰜳𰜴𰜵𰜶𰜷𰜸𰜹𰜺𰜻𰜼𰜽𰜾𰜿𰝀𰝁𰝂𰝃𰝄𰝅𰝆𰝇𰝈𰝉𰝊𰝋𰝌𰝍𰝎𰝏𰝐𰝑𰝒𰝓𰝔𰝕𰝖𰝗𰝘𰝙𰝚𰝛𰝜𰝝𰝞𰝟𰝠𰝡𰝢𰝣𰝤𰝥𰝦𰝧𰝨𰝩𰝪𰝫𰝬𰝭𰝮𰝯𰝰𰝱𰝲𰝳𰝴𰝵𰝶𰝷𰝸𰝹𰝺𰝻𰝼𰝽𰝾𰝿𰞀𰞁𰞂𰞃𰞄𰞅𰞆𰞇𰞈𰞉𰞊𰞋𰞌𰞍𰞎𰞏𰞐𰞑𰞒𰞓𰞔𰞕𰞖𰞗𰞘𰞙𰞚𰞛𰞜𰞝𰞞𰞟𰞠𰞡𰞢𰞣𰞤𰞥𰞦𰞧𰞨𰞩𰞪𰞫𰞬𰞭𰞮𰞯𰞰𰞱𰞲𰞳𰞴𰞵𰞶𰞷𰞸𰞹𰞺𰞻𰞼𰞽𰞾𰞿𰟀𰟁𰟂𰟃𰟄𰟅𰟆𰟇𰟈𰟉𰟊𰟋𰟌𰟍𰟎𰟏𰟐𰟑𰟒𰟓𰟔𰟕𰟖𰟗𰟘𰟙𰟚𰟛𰟜𰟝𰟞𰟟𰟠𰟡𰟢𰟣𰟤𰟥𰟦𰟧𰟨𰟩𰟪𰟫𰟬𰟭𰟮𰟯𰟰𰟱𰟲𰟳𰟴𰟵𰟶𰟷𰟸𰟹𰟺𰟻𰟼𰟽𰟾𰟿𰠀𰠁𰠂𰠃𰠄𰠅𰠆𰠇𰠈𰠉𰠊𰠋𰠌𰠍𰠎𰠏𰠐𰠑𰠒𰠓𰠔𰠕𰠖𰠗𰠘𰠙𰠚𰠛𰠜𰠝𰠞𰠟𰠠𰠡𰠢𰠣𰠤𰠥𰠦𰠧𰠨𰠩𰠪𰠫𰠬𰠭𰠮𰠯𰠰𰠱𰠲𰠳𰠴𰠵𰠶𰠷𰠸𰠹𰠺𰠻𰠼𰠽𰠾𰠿𰡀𰡁𰡂𰡃𰡄𰡅𰡆𰡇𰡈𰡉𰡊𰡋𰡌𰡍𰡎𰡏𰡐𰡑𰡒𰡓𰡔𰡕𰡖𰡗𰡘𰡙𰡚𰡛𰡜𰡝𰡞𰡟𰡠𰡡𰡢𰡣𰡤𰡥𰡦𰡧𰡨𰡩𰡪𰡫𰡬𰡭𰡮𰡯𰡰𰡱𰡲𰡳𰡴𰡵𰡶𰡷𰡸𰡹𰡺𰡻𰡼𰡽𰡾𰡿𰢀𰢁𰢂𰢃𰢄𰢅𰢆𰢇𰢈𰢉𰢊𰢋𰢌𰢍𰢎𰢏𰢐𰢑𰢒𰢓𰢔𰢕𰢖𰢗𰢘𰢙𰢚𰢛𰢜𰢝𰢞𰢟𰢠𰢡𰢢𰢣𰢤𰢥𰢦𰢧𰢨𰢩𰢪𰢫𰢬𰢭𰢮𰢯𰢰𰢱𰢲𰢳𰢴𰢵𰢶𰢷𰢸𰢹𰢺𰢻𰢼𰢽𰢾𰢿𰣀𰣁𰣂𰣃𰣄𰣅𰣆𰣇𰣈𰣉𰣊𰣋𰣌𰣍𰣎𰣏𰣐𰣑𰣒𰣓𰣔𰣕𰣖𰣗𰣘𰣙𰣚𰣛𰣜𰣝𰣞𰣟𰣠𰣡𰣢𰣣𰣤𰣥𰣦𰣧𰣨𰣩𰣪𰣫𰣬𰣭𰣮𰣯𰣰𰣱𰣲𰣳𰣴𰣵𰣶𰣷𰣸𰣹𰣺𰣻𰣼𰣽𰣾𰣿𰤀𰤁𰤂𰤃𰤄𰤅𰤆𰤇𰤈𰤉𰤊𰤋𰤌𰤍𰤎𰤏𰤐𰤑𰤒𰤓𰤔𰤕𰤖𰤗𰤘𰤙𰤚𰤛𰤜𰤝𰤞𰤟𰤠𰤡𰤢𰤣𰤤𰤥𰤦𰤧𰤨𰤩𰤪𰤫𰤬𰤭𰤮𰤯𰤰𰤱𰤲𰤳𰤴𰤵𰤶𰤷𰤸𰤹𰤺𰤻𰤼𰤽𰤾𰤿𰥀𰥁𰥂𰥃𰥄𰥅𰥆𰥇𰥈𰥉𰥊𰥋𰥌𰥍𰥎𰥏𰥐𰥑𰥒𰥓𰥔𰥕𰥖𰥗𰥘𰥙𰥚𰥛𰥜𰥝𰥞𰥟𰥠𰥡𰥢𰥣𰥤𰥥𰥦𰥧𰥨𰥩𰥪𰥫𰥬𰥭𰥮𰥯𰥰𰥱𰥲𰥳𰥴𰥵𰥶𰥷𰥸𰥹𰥺𰥻𰥼𰥽𰥾𰥿𰦀𰦁𰦂𰦃𰦄𰦅𰦆𰦇𰦈𰦉𰦊𰦋𰦌𰦍𰦎𰦏𰦐𰦑𰦒𰦓𰦔𰦕𰦖𰦗𰦘𰦙𰦚𰦛𰦜𰦝𰦞𰦟𰦠𰦡𰦢𰦣𰦤𰦥𰦦𰦧𰦨𰦩𰦪𰦫𰦬𰦭𰦮𰦯𰦰𰦱𰦲𰦳𰦴𰦵𰦶𰦷𰦸𰦹𰦺𰦻𰦼𰦽𰦾𰦿𰧀𰧁𰧂𰧃𰧄𰧅𰧆𰧇𰧈𰧉𰧊𰧋𰧌𰧍𰧎𰧏𰧐𰧑𰧒𰧓𰧔𰧕𰧖𰧗𰧘𰧙𰧚𰧛𰧜𰧝𰧞𰧟𰧠𰧡𰧢𰧣𰧤𰧥𰧦𰧧𰧨𰧩𰧪𰧫𰧬𰧭𰧮𰧯𰧰𰧱𰧲𰧳𰧴𰧵𰧶𰧷𰧸𰧹𰧺𰧻𰧼𰧽𰧾𰧿𰨀𰨁𰨂𰨃𰨄𰨅𰨆𰨇𰨈𰨉𰨊𰨋𰨌𰨍𰨎𰨏𰨐𰨑𰨒𰨓𰨔𰨕𰨖𰨗𰨘𰨙𰨚𰨛𰨜𰨝𰨞𰨟𰨠𰨡𰨢𰨣𰨤𰨥𰨦𰨧𰨨𰨩𰨪𰨫𰨬𰨭𰨮𰨯𰨰𰨱𰨲𰨳𰨴𰨵𰨶𰨷𰨸𰨹𰨺𰨻𰨼𰨽𰨾𰨿𰩀𰩁𰩂𰩃𰩄𰩅𰩆𰩇𰩈𰩉𰩊𰩋𰩌𰩍𰩎𰩏𰩐𰩑𰩒𰩓𰩔𰩕𰩖𰩗𰩘𰩙𰩚𰩛𰩜𰩝𰩞𰩟𰩠𰩡𰩢𰩣𰩤𰩥𰩦𰩧𰩨𰩩𰩪𰩫𰩬𰩭𰩮𰩯𰩰𰩱𰩲𰩳𰩴𰩵𰩶𰩷𰩸𰩹𰩺𰩻𰩼𰩽𰩾𰩿𰪀𰪁𰪂𰪃𰪄𰪅𰪆𰪇𰪈𰪉𰪊𰪋𰪌𰪍𰪎𰪏𰪐𰪑𰪒𰪓𰪔𰪕𰪖𰪗𰪘𰪙𰪚𰪛𰪜𰪝𰪞𰪟𰪠𰪡𰪢𰪣𰪤𰪥𰪦𰪧𰪨𰪩𰪪𰪫𰪬𰪭𰪮𰪯𰪰𰪱𰪲𰪳𰪴𰪵𰪶𰪷𰪸𰪹𰪺𰪻𰪼𰪽𰪾𰪿𰫀𰫁𰫂𰫃𰫄𰫅𰫆𰫇𰫈𰫉𰫊𰫋𰫌𰫍𰫎𰫏𰫐𰫑𰫒𰫓𰫔𰫕𰫖𰫗𰫘𰫙𰫚𰫛𰫜𰫝𰫞𰫟𰫠𰫡𰫢𰫣𰫤𰫥𰫦𰫧𰫨𰫩𰫪𰫫𰫬𰫭𰫮𰫯𰫰𰫱𰫲𰫳𰫴𰫵𰫶𰫷𰫸𰫹𰫺𰫻𰫼𰫽𰫾𰫿𰬀𰬁𰬂𰬃𰬄𰬅𰬆𰬇𰬈𰬉𰬊𰬋𰬌𰬍𰬎𰬏𰬐𰬑𰬒𰬓𰬔𰬕𰬖𰬗𰬘𰬙𰬚𰬛𰬜𰬝𰬞𰬟𰬠𰬡𰬢𰬣𰬤𰬥𰬦𰬧𰬨𰬩𰬪𰬫𰬬𰬭𰬮𰬯𰬰𰬱𰬲𰬳𰬴𰬵𰬶𰬷𰬸𰬹𰬺𰬻𰬼𰬽𰬾𰬿𰭀𰭁𰭂𰭃𰭄𰭅𰭆𰭇𰭈𰭉𰭊𰭋𰭌𰭍𰭎𰭏𰭐𰭑𰭒𰭓𰭔𰭕𰭖𰭗𰭘𰭙𰭚𰭛𰭜𰭝𰭞𰭟𰭠𰭡𰭢𰭣𰭤𰭥𰭦𰭧𰭨𰭩𰭪𰭫𰭬𰭭𰭮𰭯𰭰𰭱𰭲𰭳𰭴𰭵𰭶𰭷𰭸𰭹𰭺𰭻𰭼𰭽𰭾𰭿𰮀𰮁𰮂𰮃𰮄𰮅𰮆𰮇𰮈𰮉𰮊𰮋𰮌𰮍𰮎𰮏𰮐𰮑𰮒𰮓𰮔𰮕𰮖𰮗𰮘𰮙𰮚𰮛𰮜𰮝𰮞𰮟𰮠𰮡𰮢𰮣𰮤𰮥𰮦𰮧𰮨𰮩𰮪𰮫𰮬𰮭𰮮𰮯𰮰𰮱𰮲𰮳𰮴𰮵𰮶𰮷𰮸𰮹𰮺𰮻𰮼𰮽𰮾𰮿𰯀𰯁𰯂𰯃𰯄𰯅𰯆𰯇𰯈𰯉𰯊𰯋𰯌𰯍𰯎𰯏𰯐𰯑𰯒𰯓𰯔𰯕𰯖𰯗𰯘𰯙𰯚𰯛𰯜𰯝𰯞𰯟𰯠𰯡𰯢𰯣𰯤𰯥𰯦𰯧𰯨𰯩𰯪𰯫𰯬𰯭𰯮𰯯𰯰𰯱𰯲𰯳𰯴𰯵𰯶𰯷𰯸𰯹𰯺𰯻𰯼𰯽𰯾𰯿𰰀𰰁𰰂𰰃𰰄𰰅𰰆𰰇𰰈𰰉𰰊𰰋𰰌𰰍𰰎𰰏𰰐𰰑𰰒𰰓𰰔𰰕𰰖𰰗𰰘𰰙𰰚𰰛𰰜𰰝𰰞𰰟𰰠𰰡𰰢𰰣𰰤𰰥𰰦𰰧𰰨𰰩𰰪𰰫𰰬𰰭𰰮𰰯𰰰𰰱𰰲𰰳𰰴𰰵𰰶𰰷𰰸𰰹𰰺𰰻𰰼𰰽𰰾𰰿𰱀𰱁𰱂𰱃𰱄𰱅𰱆𰱇𰱈𰱉𰱊𰱋𰱌𰱍𰱎𰱏𰱐𰱑𰱒𰱓𰱔𰱕𰱖𰱗𰱘𰱙𰱚𰱛𰱜𰱝𰱞𰱟𰱠𰱡𰱢𰱣𰱤𰱥𰱦𰱧𰱨𰱩𰱪𰱫𰱬𰱭𰱮𰱯𰱰𰱱𰱲𰱳𰱴𰱵𰱶𰱷𰱸𰱹𰱺𰱻𰱼𰱽𰱾𰱿𰲀𰲁𰲂𰲃𰲄𰲅𰲆𰲇𰲈𰲉𰲊𰲋𰲌𰲍𰲎𰲏𰲐𰲑𰲒𰲓𰲔𰲕𰲖𰲗𰲘𰲙𰲚𰲛𰲜𰲝𰲞𰲟𰲠𰲡𰲢𰲣𰲤𰲥𰲦𰲧𰲨𰲩𰲪𰲫𰲬𰲭𰲮𰲯𰲰𰲱𰲲𰲳𰲴𰲵𰲶𰲷𰲸𰲹𰲺𰲻𰲼𰲽𰲾𰲿𰳀𰳁𰳂𰳃𰳄𰳅𰳆𰳇𰳈𰳉𰳊𰳋𰳌𰳍𰳎𰳏𰳐𰳑𰳒𰳓𰳔𰳕𰳖𰳗𰳘𰳙𰳚𰳛𰳜𰳝𰳞𰳟𰳠𰳡𰳢𰳣𰳤𰳥𰳦𰳧𰳨𰳩𰳪𰳫𰳬𰳭𰳮𰳯𰳰𰳱𰳲𰳳𰳴𰳵𰳶𰳷𰳸𰳹𰳺𰳻𰳼𰳽𰳾𰳿𰴀𰴁𰴂𰴃𰴄𰴅𰴆𰴇𰴈𰴉𰴊𰴋𰴌𰴍𰴎𰴏𰴐𰴑𰴒𰴓𰴔𰴕𰴖𰴗𰴘𰴙𰴚𰴛𰴜𰴝𰴞𰴟𰴠𰴡𰴢𰴣𰴤𰴥𰴦𰴧𰴨𰴩𰴪𰴫𰴬𰴭𰴮𰴯𰴰𰴱𰴲𰴳𰴴𰴵𰴶𰴷𰴸𰴹𰴺𰴻𰴼𰴽𰴾𰴿𰵀𰵁𰵂𰵃𰵄𰵅𰵆𰵇𰵈𰵉𰵊𰵋𰵌𰵍𰵎𰵏𰵐𰵑𰵒𰵓𰵔𰵕𰵖𰵗𰵘𰵙𰵚𰵛𰵜𰵝𰵞𰵟𰵠𰵡𰵢𰵣𰵤𰵥𰵦𰵧𰵨𰵩𰵪𰵫𰵬𰵭𰵮𰵯𰵰𰵱𰵲𰵳𰵴𰵵𰵶𰵷𰵸𰵹𰵺𰵻𰵼𰵽𰵾𰵿𰶀𰶁𰶂𰶃𰶄𰶅𰶆𰶇𰶈𰶉𰶊𰶋𰶌𰶍𰶎𰶏𰶐𰶑𰶒𰶓𰶔𰶕𰶖𰶗𰶘𰶙𰶚𰶛𰶜𰶝𰶞𰶟𰶠𰶡𰶢𰶣𰶤𰶥𰶦𰶧𰶨𰶩𰶪𰶫𰶬𰶭𰶮𰶯𰶰𰶱𰶲𰶳𰶴𰶵𰶶𰶷𰶸𰶹𰶺𰶻𰶼𰶽𰶾𰶿𰷀𰷁𰷂𰷃𰷄𰷅𰷆𰷇𰷈𰷉𰷊𰷋𰷌𰷍𰷎𰷏𰷐𰷑𰷒𰷓𰷔𰷕𰷖𰷗𰷘𰷙𰷚𰷛𰷜𰷝𰷞𰷟𰷠𰷡𰷢𰷣𰷤𰷥𰷦𰷧𰷨𰷩𰷪𰷫𰷬𰷭𰷮𰷯𰷰𰷱𰷲𰷳𰷴𰷵𰷶𰷷𰷸𰷹𰷺𰷻𰷼𰷽𰷾𰷿𰸀𰸁𰸂𰸃𰸄𰸅𰸆𰸇𰸈𰸉𰸊𰸋𰸌𰸍𰸎𰸏𰸐𰸑𰸒𰸓𰸔𰸕𰸖𰸗𰸘𰸙𰸚𰸛𰸜𰸝𰸞𰸟𰸠𰸡𰸢𰸣𰸤𰸥𰸦𰸧𰸨𰸩𰸪𰸫𰸬𰸭𰸮𰸯𰸰𰸱𰸲𰸳𰸴𰸵𰸶𰸷𰸸𰸹𰸺𰸻𰸼𰸽𰸾𰸿𰹀𰹁𰹂𰹃𰹄𰹅𰹆𰹇𰹈𰹉𰹊𰹋𰹌𰹍𰹎𰹏𰹐𰹑𰹒𰹓𰹔𰹕𰹖𰹗𰹘𰹙𰹚𰹛𰹜𰹝𰹞𰹟𰹠𰹡𰹢𰹣𰹤𰹥𰹦𰹧𰹨𰹩𰹪𰹫𰹬𰹭𰹮𰹯𰹰𰹱𰹲𰹳𰹴𰹵𰹶𰹷𰹸𰹹𰹺𰹻𰹼𰹽𰹾𰹿𰺀𰺁𰺂𰺃𰺄𰺅𰺆𰺇𰺈𰺉𰺊𰺋𰺌𰺍𰺎𰺏𰺐𰺑𰺒𰺓𰺔𰺕𰺖𰺗𰺘𰺙𰺚𰺛𰺜𰺝𰺞𰺟𰺠𰺡𰺢𰺣𰺤𰺥𰺦𰺧𰺨𰺩𰺪𰺫𰺬𰺭𰺮𰺯𰺰𰺱𰺲𰺳𰺴𰺵𰺶𰺷𰺸𰺹𰺺𰺻𰺼𰺽𰺾𰺿𰻀𰻁𰻂𰻃𰻄𰻅𰻆𰻇𰻈𰻉𰻊𰻋𰻌𰻍𰻎𰻏𰻐𰻑𰻒𰻓𰻔𰻕𰻖𰻗𰻘𰻙𰻚𰻛𰻜𰻝𰻞𰻟𰻠𰻡𰻢𰻣𰻤𰻥𰻦𰻧𰻨𰻩𰻪𰻫𰻬𰻭𰻮𰻯𰻰𰻱𰻲𰻳𰻴𰻵𰻶𰻷𰻸𰻹𰻺𰻻𰻼𰻽𰻾𰻿𰼀𰼁𰼂𰼃𰼄𰼅𰼆𰼇𰼈𰼉𰼊𰼋𰼌𰼍𰼎𰼏𰼐𰼑𰼒𰼓𰼔𰼕𰼖𰼗𰼘𰼙𰼚𰼛𰼜𰼝𰼞𰼟𰼠𰼡𰼢𰼣𰼤𰼥𰼦𰼧𰼨𰼩𰼪𰼫𰼬𰼭𰼮𰼯𰼰𰼱𰼲𰼳𰼴𰼵𰼶𰼷𰼸𰼹𰼺𰼻𰼼𰼽𰼾𰼿𰽀𰽁𰽂𰽃𰽄𰽅𰽆𰽇𰽈𰽉𰽊𰽋𰽌𰽍𰽎𰽏𰽐𰽑𰽒𰽓𰽔𰽕𰽖𰽗𰽘𰽙𰽚𰽛𰽜𰽝𰽞𰽟𰽠𰽡𰽢𰽣𰽤𰽥𰽦𰽧𰽨𰽩𰽪𰽫𰽬𰽭𰽮𰽯𰽰𰽱𰽲𰽳𰽴𰽵𰽶𰽷𰽸𰽹𰽺𰽻𰽼𰽽𰽾𰽿𰾀𰾁𰾂𰾃𰾄𰾅𰾆𰾇𰾈𰾉𰾊𰾋𰾌𰾍𰾎𰾏𰾐𰾑𰾒𰾓𰾔𰾕𰾖𰾗𰾘𰾙𰾚𰾛𰾜𰾝𰾞𰾟𰾠𰾡𰾢𰾣𰾤𰾥𰾦𰾧𰾨𰾩𰾪𰾫𰾬𰾭𰾮𰾯𰾰𰾱𰾲𰾳𰾴𰾵𰾶𰾷𰾸𰾹𰾺𰾻𰾼𰾽𰾾𰾿𰿀𰿁𰿂𰿃𰿄𰿅𰿆𰿇𰿈𰿉𰿊𰿋𰿌𰿍𰿎𰿏𰿐𰿑𰿒𰿓𰿔𰿕𰿖𰿗𰿘𰿙𰿚𰿛𰿜𰿝𰿞𰿟𰿠𰿡𰿢𰿣𰿤𰿥𰿦𰿧𰿨𰿩𰿪𰿫𰿬𰿭𰿮𰿯𰿰𰿱𰿲𰿳𰿴𰿵𰿶𰿷𰿸𰿹𰿺𰿻𰿼𰿽𰿾𰿿𱀀𱀁𱀂𱀃𱀄𱀅𱀆𱀇𱀈𱀉𱀊𱀋𱀌𱀍𱀎𱀏𱀐𱀑𱀒𱀓𱀔𱀕𱀖𱀗𱀘𱀙𱀚𱀛𱀜𱀝𱀞𱀟𱀠𱀡𱀢𱀣𱀤𱀥𱀦𱀧𱀨𱀩𱀪𱀫𱀬𱀭𱀮𱀯𱀰𱀱𱀲𱀳𱀴𱀵𱀶𱀷𱀸𱀹𱀺𱀻𱀼𱀽𱀾𱀿𱁀𱁁𱁂𱁃𱁄𱁅𱁆𱁇𱁈𱁉𱁊𱁋𱁌𱁍𱁎𱁏𱁐𱁑𱁒𱁓𱁔𱁕𱁖𱁗𱁘𱁙𱁚𱁛𱁜𱁝𱁞𱁟𱁠𱁡𱁢𱁣𱁤𱁥𱁦𱁧𱁨𱁩𱁪𱁫𱁬𱁭𱁮𱁯𱁰𱁱𱁲𱁳𱁴𱁵𱁶𱁷𱁸𱁹𱁺𱁻𱁼𱁽𱁾𱁿𱂀𱂁𱂂𱂃𱂄𱂅𱂆𱂇𱂈𱂉𱂊𱂋𱂌𱂍𱂎𱂏𱂐𱂑𱂒𱂓𱂔𱂕𱂖𱂗𱂘𱂙𱂚𱂛𱂜𱂝𱂞𱂟𱂠𱂡𱂢𱂣𱂤𱂥𱂦𱂧𱂨𱂩𱂪𱂫𱂬𱂭𱂮𱂯𱂰𱂱𱂲𱂳𱂴𱂵𱂶𱂷𱂸𱂹𱂺𱂻𱂼𱂽𱂾𱂿𱃀𱃁𱃂𱃃𱃄𱃅𱃆𱃇𱃈𱃉𱃊𱃋𱃌𱃍𱃎𱃏𱃐𱃑𱃒𱃓𱃔𱃕𱃖𱃗𱃘𱃙𱃚𱃛𱃜𱃝𱃞𱃟𱃠𱃡𱃢𱃣𱃤𱃥𱃦𱃧𱃨𱃩𱃪𱃫𱃬𱃭𱃮𱃯𱃰𱃱𱃲𱃳𱃴𱃵𱃶𱃷𱃸𱃹𱃺𱃻𱃼𱃽𱃾𱃿𱄀𱄁𱄂𱄃𱄄𱄅𱄆𱄇𱄈𱄉𱄊𱄋𱄌𱄍𱄎𱄏𱄐𱄑𱄒𱄓𱄔𱄕𱄖𱄗𱄘𱄙𱄚𱄛𱄜𱄝𱄞𱄟𱄠𱄡𱄢𱄣𱄤𱄥𱄦𱄧𱄨𱄩𱄪𱄫𱄬𱄭𱄮𱄯𱄰𱄱𱄲𱄳𱄴𱄵𱄶𱄷𱄸𱄹𱄺𱄻𱄼𱄽𱄾𱄿𱅀𱅁𱅂𱅃𱅄𱅅𱅆𱅇𱅈𱅉𱅊𱅋𱅌𱅍𱅎𱅏𱅐𱅑𱅒𱅓𱅔𱅕𱅖𱅗𱅘𱅙𱅚𱅛𱅜𱅝𱅞𱅟𱅠𱅡𱅢𱅣𱅤𱅥𱅦𱅧𱅨𱅩𱅪𱅫𱅬𱅭𱅮𱅯𱅰𱅱𱅲𱅳𱅴𱅵𱅶𱅷𱅸𱅹𱅺𱅻𱅼𱅽𱅾𱅿𱆀𱆁𱆂𱆃𱆄𱆅𱆆𱆇𱆈𱆉𱆊𱆋𱆌𱆍𱆎𱆏𱆐𱆑𱆒𱆓𱆔𱆕𱆖𱆗𱆘𱆙𱆚𱆛𱆜𱆝𱆞𱆟𱆠𱆡𱆢𱆣𱆤𱆥𱆦𱆧𱆨𱆩𱆪𱆫𱆬𱆭𱆮𱆯𱆰𱆱𱆲𱆳𱆴𱆵𱆶𱆷𱆸𱆹𱆺𱆻𱆼𱆽𱆾𱆿𱇀𱇁𱇂𱇃𱇄𱇅𱇆𱇇𱇈𱇉𱇊𱇋𱇌𱇍𱇎𱇏𱇐𱇑𱇒𱇓𱇔𱇕𱇖𱇗𱇘𱇙𱇚𱇛𱇜𱇝𱇞𱇟𱇠𱇡𱇢𱇣𱇤𱇥𱇦𱇧𱇨𱇩𱇪𱇫𱇬𱇭𱇮𱇯𱇰𱇱𱇲𱇳𱇴𱇵𱇶𱇷𱇸𱇹𱇺𱇻𱇼𱇽𱇾𱇿𱈀𱈁𱈂𱈃𱈄𱈅𱈆𱈇𱈈𱈉𱈊𱈋𱈌𱈍𱈎𱈏𱈐𱈑𱈒𱈓𱈔𱈕𱈖𱈗𱈘𱈙𱈚𱈛𱈜𱈝𱈞𱈟𱈠𱈡𱈢𱈣𱈤𱈥𱈦𱈧𱈨𱈩𱈪𱈫𱈬𱈭𱈮𱈯𱈰𱈱𱈲𱈳𱈴𱈵𱈶𱈷𱈸𱈹𱈺𱈻𱈼𱈽𱈾𱈿𱉀𱉁𱉂𱉃𱉄𱉅𱉆𱉇𱉈𱉉𱉊𱉋𱉌𱉍𱉎𱉏𱉐𱉑𱉒𱉓𱉔𱉕𱉖𱉗𱉘𱉙𱉚𱉛𱉜𱉝𱉞𱉟𱉠𱉡𱉢𱉣𱉤𱉥𱉦𱉧𱉨𱉩𱉪𱉫𱉬𱉭𱉮𱉯𱉰𱉱𱉲𱉳𱉴𱉵𱉶𱉷𱉸𱉹𱉺𱉻𱉼𱉽𱉾𱉿𱊀𱊁𱊂𱊃𱊄𱊅𱊆𱊇𱊈𱊉𱊊𱊋𱊌𱊍𱊎𱊏𱊐𱊑𱊒𱊓𱊔𱊕𱊖𱊗𱊘𱊙𱊚𱊛𱊜𱊝𱊞𱊟𱊠𱊡𱊢𱊣𱊤𱊥𱊦𱊧𱊨𱊩𱊪𱊫𱊬𱊭𱊮𱊯𱊰𱊱𱊲𱊳𱊴𱊵𱊶𱊷𱊸𱊹𱊺𱊻𱊼𱊽𱊾𱊿𱋀𱋁𱋂𱋃𱋄𱋅𱋆𱋇𱋈𱋉𱋊𱋋𱋌𱋍𱋎𱋏𱋐𱋑𱋒𱋓𱋔𱋕𱋖𱋗𱋘𱋙𱋚𱋛𱋜𱋝𱋞𱋟𱋠𱋡𱋢𱋣𱋤𱋥𱋦𱋧𱋨𱋩𱋪𱋫𱋬𱋭𱋮𱋯𱋰𱋱𱋲𱋳𱋴𱋵𱋶𱋷𱋸𱋹𱋺𱋻𱋼𱋽𱋾𱋿𱌀𱌁𱌂𱌃𱌄𱌅𱌆𱌇𱌈𱌉𱌊𱌋𱌌𱌍𱌎𱌏𱌐𱌑𱌒𱌓𱌔𱌕𱌖𱌗𱌘𱌙𱌚𱌛𱌜𱌝𱌞𱌟𱌠𱌡𱌢𱌣𱌤𱌥𱌦𱌧𱌨𱌩𱌪𱌫𱌬𱌭𱌮𱌯𱌰𱌱𱌲𱌳𱌴𱌵𱌶𱌷𱌸𱌹𱌺𱌻𱌼𱌽𱌾𱌿𱍀𱍁𱍂𱍃𱍄𱍅𱍆𱍇𱍈𱍉𱍊',
                start: 4,
                end: 11153,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 11153
                  }
                }
              },
              start: 4,
              end: 11153,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 11153
                }
              }
            }
          ],
          start: 0,
          end: 11154,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 11154
            }
          }
        }
      ],
      start: 0,
      end: 11154,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 11154
        }
      }
    }
  ],
  [
    `var \\u08BE\\u08BF\\u08C0\\u08C1\\u08C2\\u08C3\\u08C4\\u08C5\\u08C6\\u08C7\\u0D04`,
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
                name: 'ࢾࢿࣀࣁࣂࣃࣄࣅࣆࣇഄ',
                start: 4,
                end: 70,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 70
                  }
                }
              },
              start: 4,
              end: 70,
              loc: {
                start: {
                  line: 1,
                  column: 4
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
    `var _୕ඁ꠬ᪿᫀ𐺫𐺬𑇎𑇏𑤰𑤱𑤲𑤳𑤴𑤵𑤷𑤸𑤻𑤼𑤽𑤾𑥀𑥂𑥃𑥐𑥑𑥒𑥓𑥔𑥕𑥖𑥗𑥘𑥙𖿤𖿰𖿱🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹;`,
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
                name: '_୕ඁ꠬ᪿᫀ𐺫𐺬𑇎𑇏𑤰𑤱𑤲𑤳𑤴𑤵𑤷𑤸𑤻𑤼𑤽𑤾𑥀𑥂𑥃𑥐𑥑𑥒𑥓𑥔𑥕𑥖𑥗𑥘𑥙𖿤𖿰𖿱🯰🯱🯲🯳🯴🯵🯶🯷🯸🯹',
                start: 4,
                end: 94,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 94
                  }
                }
              },
              start: 4,
              end: 94,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 94
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
              line: 1,
              column: 95
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
          line: 1,
          column: 95
        }
      }
    }
  ],
  [
    `var obj = { method(a, b, c, ...[d]) { return [a, b, c, d]; } };`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'method',
                      start: 12,
                      end: 18,
                      loc: {
                        start: {
                          line: 1,
                          column: 12
                        },
                        end: {
                          line: 1,
                          column: 18
                        }
                      }
                    },
                    value: {
                      type: 'FunctionExpression',
                      params: [
                        {
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
                        {
                          type: 'Identifier',
                          name: 'b',
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
                        },
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'ArrayPattern',
                            elements: [
                              {
                                type: 'Identifier',
                                name: 'd',
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
                              }
                            ],
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
                            }
                          },
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
                        }
                      ],
                      body: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ReturnStatement',
                            argument: {
                              type: 'ArrayExpression',
                              elements: [
                                {
                                  type: 'Identifier',
                                  name: 'a',
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
                                {
                                  type: 'Identifier',
                                  name: 'b',
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
                                {
                                  type: 'Identifier',
                                  name: 'c',
                                  start: 52,
                                  end: 53,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 52
                                    },
                                    end: {
                                      line: 1,
                                      column: 53
                                    }
                                  }
                                },
                                {
                                  type: 'Identifier',
                                  name: 'd',
                                  start: 55,
                                  end: 56,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 55
                                    },
                                    end: {
                                      line: 1,
                                      column: 56
                                    }
                                  }
                                }
                              ],
                              start: 45,
                              end: 57,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 45
                                },
                                end: {
                                  line: 1,
                                  column: 57
                                }
                              }
                            },
                            start: 38,
                            end: 58,
                            loc: {
                              start: {
                                line: 1,
                                column: 38
                              },
                              end: {
                                line: 1,
                                column: 58
                              }
                            }
                          }
                        ],
                        start: 36,
                        end: 60,
                        loc: {
                          start: {
                            line: 1,
                            column: 36
                          },
                          end: {
                            line: 1,
                            column: 60
                          }
                        }
                      },
                      async: false,
                      generator: false,
                      id: null,
                      start: 18,
                      end: 60,
                      loc: {
                        start: {
                          line: 1,
                          column: 18
                        },
                        end: {
                          line: 1,
                          column: 60
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: true,
                    shorthand: false,
                    start: 12,
                    end: 60,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 60
                      }
                    }
                  }
                ],
                start: 10,
                end: 62,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 62
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'obj',
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
              end: 62,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 62
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
    'var {  a, "b": b1, [`c`]: c1, [d + "e"]: d1, [`${d}e`]: d2, ...e1 } = e;',
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
                type: 'Identifier',
                name: 'e',
                start: 70,
                end: 71,
                loc: {
                  start: {
                    line: 1,
                    column: 70
                  },
                  end: {
                    line: 1,
                    column: 71
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
                      type: 'Literal',
                      value: 'b',
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
                    value: {
                      type: 'Identifier',
                      name: 'b1',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'TemplateLiteral',
                      expressions: [],
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: 'c',
                            raw: 'c'
                          },
                          tail: true,
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
                        }
                      ],
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
                    value: {
                      type: 'Identifier',
                      name: 'c1',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 19,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'd',
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
                      right: {
                        type: 'Literal',
                        value: 'e',
                        start: 35,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 35
                          },
                          end: {
                            line: 1,
                            column: 38
                          }
                        }
                      },
                      operator: '+',
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
                    value: {
                      type: 'Identifier',
                      name: 'd1',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 30,
                    end: 43,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 43
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'TemplateLiteral',
                      expressions: [
                        {
                          type: 'Identifier',
                          name: 'd',
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
                      quasis: [
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: '',
                            raw: ''
                          },
                          tail: false,
                          start: 46,
                          end: 46,
                          loc: {
                            start: {
                              line: 1,
                              column: 46
                            },
                            end: {
                              line: 1,
                              column: 46
                            }
                          }
                        },
                        {
                          type: 'TemplateElement',
                          value: {
                            cooked: 'e',
                            raw: 'e'
                          },
                          tail: true,
                          start: 50,
                          end: 50,
                          loc: {
                            start: {
                              line: 1,
                              column: 50
                            },
                            end: {
                              line: 1,
                              column: 50
                            }
                          }
                        }
                      ],
                      start: 46,
                      end: 53,
                      loc: {
                        start: {
                          line: 1,
                          column: 46
                        },
                        end: {
                          line: 1,
                          column: 53
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'd2',
                      start: 56,
                      end: 58,
                      loc: {
                        start: {
                          line: 1,
                          column: 56
                        },
                        end: {
                          line: 1,
                          column: 58
                        }
                      }
                    },
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 45,
                    end: 58,
                    loc: {
                      start: {
                        line: 1,
                        column: 45
                      },
                      end: {
                        line: 1,
                        column: 58
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'e1',
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
                    start: 60,
                    end: 65,
                    loc: {
                      start: {
                        line: 1,
                        column: 60
                      },
                      end: {
                        line: 1,
                        column: 65
                      }
                    }
                  }
                ],
                start: 4,
                end: 67,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 67
                  }
                }
              },
              start: 4,
              end: 71,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 71
                }
              }
            }
          ],
          start: 0,
          end: 72,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 72
            }
          }
        }
      ],
      start: 0,
      end: 72,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 1,
          column: 72
        }
      }
    }
  ],
  [
    `var z = {};
    var { ...x } = z;
    var { ...a } = { a: 1 };
    var { ...x } = a.b;
    var { ...x } = a();
    var {x1, ...y1} = z;
    x1++;
    var { [a]: b, ...c } = z;
    var {x1, ...y1} = z;
    let {x2, y2, ...z2} = z;
    const {w3, x3, y3, ...z4} = z;

    let {
      x: { a: xa, [d]: f, ...asdf },
      y: { ...d },
      ...g
    } = complex;

    let { x4: { ...y4 } } = z;`,
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
              id: {
                type: 'Identifier',
                name: 'z',
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 31,
                end: 32,
                loc: {
                  start: {
                    line: 2,
                    column: 19
                  },
                  end: {
                    line: 2,
                    column: 20
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 25,
                      end: 26,
                      loc: {
                        start: {
                          line: 2,
                          column: 13
                        },
                        end: {
                          line: 2,
                          column: 14
                        }
                      }
                    },
                    start: 22,
                    end: 26,
                    loc: {
                      start: {
                        line: 2,
                        column: 10
                      },
                      end: {
                        line: 2,
                        column: 14
                      }
                    }
                  }
                ],
                start: 20,
                end: 28,
                loc: {
                  start: {
                    line: 2,
                    column: 8
                  },
                  end: {
                    line: 2,
                    column: 16
                  }
                }
              },
              start: 20,
              end: 32,
              loc: {
                start: {
                  line: 2,
                  column: 8
                },
                end: {
                  line: 2,
                  column: 20
                }
              }
            }
          ],
          start: 16,
          end: 33,
          loc: {
            start: {
              line: 2,
              column: 4
            },
            end: {
              line: 2,
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
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 55,
                      end: 56,
                      loc: {
                        start: {
                          line: 3,
                          column: 21
                        },
                        end: {
                          line: 3,
                          column: 22
                        }
                      }
                    },
                    value: {
                      type: 'Literal',
                      value: 1,
                      start: 58,
                      end: 59,
                      loc: {
                        start: {
                          line: 3,
                          column: 24
                        },
                        end: {
                          line: 3,
                          column: 25
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 55,
                    end: 59,
                    loc: {
                      start: {
                        line: 3,
                        column: 21
                      },
                      end: {
                        line: 3,
                        column: 25
                      }
                    }
                  }
                ],
                start: 53,
                end: 61,
                loc: {
                  start: {
                    line: 3,
                    column: 19
                  },
                  end: {
                    line: 3,
                    column: 27
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'a',
                      start: 47,
                      end: 48,
                      loc: {
                        start: {
                          line: 3,
                          column: 13
                        },
                        end: {
                          line: 3,
                          column: 14
                        }
                      }
                    },
                    start: 44,
                    end: 48,
                    loc: {
                      start: {
                        line: 3,
                        column: 10
                      },
                      end: {
                        line: 3,
                        column: 14
                      }
                    }
                  }
                ],
                start: 42,
                end: 50,
                loc: {
                  start: {
                    line: 3,
                    column: 8
                  },
                  end: {
                    line: 3,
                    column: 16
                  }
                }
              },
              start: 42,
              end: 61,
              loc: {
                start: {
                  line: 3,
                  column: 8
                },
                end: {
                  line: 3,
                  column: 27
                }
              }
            }
          ],
          start: 38,
          end: 62,
          loc: {
            start: {
              line: 3,
              column: 4
            },
            end: {
              line: 3,
              column: 28
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
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: 'a',
                  start: 82,
                  end: 83,
                  loc: {
                    start: {
                      line: 4,
                      column: 19
                    },
                    end: {
                      line: 4,
                      column: 20
                    }
                  }
                },
                computed: false,
                property: {
                  type: 'Identifier',
                  name: 'b',
                  start: 84,
                  end: 85,
                  loc: {
                    start: {
                      line: 4,
                      column: 21
                    },
                    end: {
                      line: 4,
                      column: 22
                    }
                  }
                },
                start: 82,
                end: 85,
                loc: {
                  start: {
                    line: 4,
                    column: 19
                  },
                  end: {
                    line: 4,
                    column: 22
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 76,
                      end: 77,
                      loc: {
                        start: {
                          line: 4,
                          column: 13
                        },
                        end: {
                          line: 4,
                          column: 14
                        }
                      }
                    },
                    start: 73,
                    end: 77,
                    loc: {
                      start: {
                        line: 4,
                        column: 10
                      },
                      end: {
                        line: 4,
                        column: 14
                      }
                    }
                  }
                ],
                start: 71,
                end: 79,
                loc: {
                  start: {
                    line: 4,
                    column: 8
                  },
                  end: {
                    line: 4,
                    column: 16
                  }
                }
              },
              start: 71,
              end: 85,
              loc: {
                start: {
                  line: 4,
                  column: 8
                },
                end: {
                  line: 4,
                  column: 22
                }
              }
            }
          ],
          start: 67,
          end: 86,
          loc: {
            start: {
              line: 4,
              column: 4
            },
            end: {
              line: 4,
              column: 23
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
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'a',
                  start: 106,
                  end: 107,
                  loc: {
                    start: {
                      line: 5,
                      column: 19
                    },
                    end: {
                      line: 5,
                      column: 20
                    }
                  }
                },
                arguments: [],
                start: 106,
                end: 109,
                loc: {
                  start: {
                    line: 5,
                    column: 19
                  },
                  end: {
                    line: 5,
                    column: 22
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
                      start: 100,
                      end: 101,
                      loc: {
                        start: {
                          line: 5,
                          column: 13
                        },
                        end: {
                          line: 5,
                          column: 14
                        }
                      }
                    },
                    start: 97,
                    end: 101,
                    loc: {
                      start: {
                        line: 5,
                        column: 10
                      },
                      end: {
                        line: 5,
                        column: 14
                      }
                    }
                  }
                ],
                start: 95,
                end: 103,
                loc: {
                  start: {
                    line: 5,
                    column: 8
                  },
                  end: {
                    line: 5,
                    column: 16
                  }
                }
              },
              start: 95,
              end: 109,
              loc: {
                start: {
                  line: 5,
                  column: 8
                },
                end: {
                  line: 5,
                  column: 22
                }
              }
            }
          ],
          start: 91,
          end: 110,
          loc: {
            start: {
              line: 5,
              column: 4
            },
            end: {
              line: 5,
              column: 23
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
                name: 'z',
                start: 133,
                end: 134,
                loc: {
                  start: {
                    line: 6,
                    column: 22
                  },
                  end: {
                    line: 6,
                    column: 23
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
                      name: 'x1',
                      start: 120,
                      end: 122,
                      loc: {
                        start: {
                          line: 6,
                          column: 9
                        },
                        end: {
                          line: 6,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 120,
                      end: 122,
                      loc: {
                        start: {
                          line: 6,
                          column: 9
                        },
                        end: {
                          line: 6,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 120,
                    end: 122,
                    loc: {
                      start: {
                        line: 6,
                        column: 9
                      },
                      end: {
                        line: 6,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y1',
                      start: 127,
                      end: 129,
                      loc: {
                        start: {
                          line: 6,
                          column: 16
                        },
                        end: {
                          line: 6,
                          column: 18
                        }
                      }
                    },
                    start: 124,
                    end: 129,
                    loc: {
                      start: {
                        line: 6,
                        column: 13
                      },
                      end: {
                        line: 6,
                        column: 18
                      }
                    }
                  }
                ],
                start: 119,
                end: 130,
                loc: {
                  start: {
                    line: 6,
                    column: 8
                  },
                  end: {
                    line: 6,
                    column: 19
                  }
                }
              },
              start: 119,
              end: 134,
              loc: {
                start: {
                  line: 6,
                  column: 8
                },
                end: {
                  line: 6,
                  column: 23
                }
              }
            }
          ],
          start: 115,
          end: 135,
          loc: {
            start: {
              line: 6,
              column: 4
            },
            end: {
              line: 6,
              column: 24
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'UpdateExpression',
            argument: {
              type: 'Identifier',
              name: 'x1',
              start: 140,
              end: 142,
              loc: {
                start: {
                  line: 7,
                  column: 4
                },
                end: {
                  line: 7,
                  column: 6
                }
              }
            },
            operator: '++',
            prefix: false,
            start: 140,
            end: 144,
            loc: {
              start: {
                line: 7,
                column: 4
              },
              end: {
                line: 7,
                column: 8
              }
            }
          },
          start: 140,
          end: 145,
          loc: {
            start: {
              line: 7,
              column: 4
            },
            end: {
              line: 7,
              column: 9
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
                name: 'z',
                start: 173,
                end: 174,
                loc: {
                  start: {
                    line: 8,
                    column: 27
                  },
                  end: {
                    line: 8,
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
                      name: 'a',
                      start: 157,
                      end: 158,
                      loc: {
                        start: {
                          line: 8,
                          column: 11
                        },
                        end: {
                          line: 8,
                          column: 12
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'b',
                      start: 161,
                      end: 162,
                      loc: {
                        start: {
                          line: 8,
                          column: 15
                        },
                        end: {
                          line: 8,
                          column: 16
                        }
                      }
                    },
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 156,
                    end: 162,
                    loc: {
                      start: {
                        line: 8,
                        column: 10
                      },
                      end: {
                        line: 8,
                        column: 16
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'c',
                      start: 167,
                      end: 168,
                      loc: {
                        start: {
                          line: 8,
                          column: 21
                        },
                        end: {
                          line: 8,
                          column: 22
                        }
                      }
                    },
                    start: 164,
                    end: 168,
                    loc: {
                      start: {
                        line: 8,
                        column: 18
                      },
                      end: {
                        line: 8,
                        column: 22
                      }
                    }
                  }
                ],
                start: 154,
                end: 170,
                loc: {
                  start: {
                    line: 8,
                    column: 8
                  },
                  end: {
                    line: 8,
                    column: 24
                  }
                }
              },
              start: 154,
              end: 174,
              loc: {
                start: {
                  line: 8,
                  column: 8
                },
                end: {
                  line: 8,
                  column: 28
                }
              }
            }
          ],
          start: 150,
          end: 175,
          loc: {
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 8,
              column: 29
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
                name: 'z',
                start: 198,
                end: 199,
                loc: {
                  start: {
                    line: 9,
                    column: 22
                  },
                  end: {
                    line: 9,
                    column: 23
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
                      name: 'x1',
                      start: 185,
                      end: 187,
                      loc: {
                        start: {
                          line: 9,
                          column: 9
                        },
                        end: {
                          line: 9,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x1',
                      start: 185,
                      end: 187,
                      loc: {
                        start: {
                          line: 9,
                          column: 9
                        },
                        end: {
                          line: 9,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 185,
                    end: 187,
                    loc: {
                      start: {
                        line: 9,
                        column: 9
                      },
                      end: {
                        line: 9,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y1',
                      start: 192,
                      end: 194,
                      loc: {
                        start: {
                          line: 9,
                          column: 16
                        },
                        end: {
                          line: 9,
                          column: 18
                        }
                      }
                    },
                    start: 189,
                    end: 194,
                    loc: {
                      start: {
                        line: 9,
                        column: 13
                      },
                      end: {
                        line: 9,
                        column: 18
                      }
                    }
                  }
                ],
                start: 184,
                end: 195,
                loc: {
                  start: {
                    line: 9,
                    column: 8
                  },
                  end: {
                    line: 9,
                    column: 19
                  }
                }
              },
              start: 184,
              end: 199,
              loc: {
                start: {
                  line: 9,
                  column: 8
                },
                end: {
                  line: 9,
                  column: 23
                }
              }
            }
          ],
          start: 180,
          end: 200,
          loc: {
            start: {
              line: 9,
              column: 4
            },
            end: {
              line: 9,
              column: 24
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 227,
                end: 228,
                loc: {
                  start: {
                    line: 10,
                    column: 26
                  },
                  end: {
                    line: 10,
                    column: 27
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
                      name: 'x2',
                      start: 210,
                      end: 212,
                      loc: {
                        start: {
                          line: 10,
                          column: 9
                        },
                        end: {
                          line: 10,
                          column: 11
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x2',
                      start: 210,
                      end: 212,
                      loc: {
                        start: {
                          line: 10,
                          column: 9
                        },
                        end: {
                          line: 10,
                          column: 11
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 210,
                    end: 212,
                    loc: {
                      start: {
                        line: 10,
                        column: 9
                      },
                      end: {
                        line: 10,
                        column: 11
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y2',
                      start: 214,
                      end: 216,
                      loc: {
                        start: {
                          line: 10,
                          column: 13
                        },
                        end: {
                          line: 10,
                          column: 15
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'y2',
                      start: 214,
                      end: 216,
                      loc: {
                        start: {
                          line: 10,
                          column: 13
                        },
                        end: {
                          line: 10,
                          column: 15
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 214,
                    end: 216,
                    loc: {
                      start: {
                        line: 10,
                        column: 13
                      },
                      end: {
                        line: 10,
                        column: 15
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z2',
                      start: 221,
                      end: 223,
                      loc: {
                        start: {
                          line: 10,
                          column: 20
                        },
                        end: {
                          line: 10,
                          column: 22
                        }
                      }
                    },
                    start: 218,
                    end: 223,
                    loc: {
                      start: {
                        line: 10,
                        column: 17
                      },
                      end: {
                        line: 10,
                        column: 22
                      }
                    }
                  }
                ],
                start: 209,
                end: 224,
                loc: {
                  start: {
                    line: 10,
                    column: 8
                  },
                  end: {
                    line: 10,
                    column: 23
                  }
                }
              },
              start: 209,
              end: 228,
              loc: {
                start: {
                  line: 10,
                  column: 8
                },
                end: {
                  line: 10,
                  column: 27
                }
              }
            }
          ],
          start: 205,
          end: 229,
          loc: {
            start: {
              line: 10,
              column: 4
            },
            end: {
              line: 10,
              column: 28
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'const',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 262,
                end: 263,
                loc: {
                  start: {
                    line: 11,
                    column: 32
                  },
                  end: {
                    line: 11,
                    column: 33
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
                      name: 'w3',
                      start: 241,
                      end: 243,
                      loc: {
                        start: {
                          line: 11,
                          column: 11
                        },
                        end: {
                          line: 11,
                          column: 13
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'w3',
                      start: 241,
                      end: 243,
                      loc: {
                        start: {
                          line: 11,
                          column: 11
                        },
                        end: {
                          line: 11,
                          column: 13
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 241,
                    end: 243,
                    loc: {
                      start: {
                        line: 11,
                        column: 11
                      },
                      end: {
                        line: 11,
                        column: 13
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x3',
                      start: 245,
                      end: 247,
                      loc: {
                        start: {
                          line: 11,
                          column: 15
                        },
                        end: {
                          line: 11,
                          column: 17
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'x3',
                      start: 245,
                      end: 247,
                      loc: {
                        start: {
                          line: 11,
                          column: 15
                        },
                        end: {
                          line: 11,
                          column: 17
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 245,
                    end: 247,
                    loc: {
                      start: {
                        line: 11,
                        column: 15
                      },
                      end: {
                        line: 11,
                        column: 17
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y3',
                      start: 249,
                      end: 251,
                      loc: {
                        start: {
                          line: 11,
                          column: 19
                        },
                        end: {
                          line: 11,
                          column: 21
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'y3',
                      start: 249,
                      end: 251,
                      loc: {
                        start: {
                          line: 11,
                          column: 19
                        },
                        end: {
                          line: 11,
                          column: 21
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 249,
                    end: 251,
                    loc: {
                      start: {
                        line: 11,
                        column: 19
                      },
                      end: {
                        line: 11,
                        column: 21
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z4',
                      start: 256,
                      end: 258,
                      loc: {
                        start: {
                          line: 11,
                          column: 26
                        },
                        end: {
                          line: 11,
                          column: 28
                        }
                      }
                    },
                    start: 253,
                    end: 258,
                    loc: {
                      start: {
                        line: 11,
                        column: 23
                      },
                      end: {
                        line: 11,
                        column: 28
                      }
                    }
                  }
                ],
                start: 240,
                end: 259,
                loc: {
                  start: {
                    line: 11,
                    column: 10
                  },
                  end: {
                    line: 11,
                    column: 29
                  }
                }
              },
              start: 240,
              end: 263,
              loc: {
                start: {
                  line: 11,
                  column: 10
                },
                end: {
                  line: 11,
                  column: 33
                }
              }
            }
          ],
          start: 234,
          end: 264,
          loc: {
            start: {
              line: 11,
              column: 4
            },
            end: {
              line: 11,
              column: 34
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'complex',
                start: 351,
                end: 358,
                loc: {
                  start: {
                    line: 17,
                    column: 8
                  },
                  end: {
                    line: 17,
                    column: 15
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
                      start: 282,
                      end: 283,
                      loc: {
                        start: {
                          line: 14,
                          column: 6
                        },
                        end: {
                          line: 14,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'a',
                            start: 287,
                            end: 288,
                            loc: {
                              start: {
                                line: 14,
                                column: 11
                              },
                              end: {
                                line: 14,
                                column: 12
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'xa',
                            start: 290,
                            end: 292,
                            loc: {
                              start: {
                                line: 14,
                                column: 14
                              },
                              end: {
                                line: 14,
                                column: 16
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 287,
                          end: 292,
                          loc: {
                            start: {
                              line: 14,
                              column: 11
                            },
                            end: {
                              line: 14,
                              column: 16
                            }
                          }
                        },
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'd',
                            start: 295,
                            end: 296,
                            loc: {
                              start: {
                                line: 14,
                                column: 19
                              },
                              end: {
                                line: 14,
                                column: 20
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'f',
                            start: 299,
                            end: 300,
                            loc: {
                              start: {
                                line: 14,
                                column: 23
                              },
                              end: {
                                line: 14,
                                column: 24
                              }
                            }
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false,
                          start: 294,
                          end: 300,
                          loc: {
                            start: {
                              line: 14,
                              column: 18
                            },
                            end: {
                              line: 14,
                              column: 24
                            }
                          }
                        },
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'asdf',
                            start: 305,
                            end: 309,
                            loc: {
                              start: {
                                line: 14,
                                column: 29
                              },
                              end: {
                                line: 14,
                                column: 33
                              }
                            }
                          },
                          start: 302,
                          end: 309,
                          loc: {
                            start: {
                              line: 14,
                              column: 26
                            },
                            end: {
                              line: 14,
                              column: 33
                            }
                          }
                        }
                      ],
                      start: 285,
                      end: 311,
                      loc: {
                        start: {
                          line: 14,
                          column: 9
                        },
                        end: {
                          line: 14,
                          column: 35
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 282,
                    end: 311,
                    loc: {
                      start: {
                        line: 14,
                        column: 6
                      },
                      end: {
                        line: 14,
                        column: 35
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y',
                      start: 319,
                      end: 320,
                      loc: {
                        start: {
                          line: 15,
                          column: 6
                        },
                        end: {
                          line: 15,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'd',
                            start: 327,
                            end: 328,
                            loc: {
                              start: {
                                line: 15,
                                column: 14
                              },
                              end: {
                                line: 15,
                                column: 15
                              }
                            }
                          },
                          start: 324,
                          end: 328,
                          loc: {
                            start: {
                              line: 15,
                              column: 11
                            },
                            end: {
                              line: 15,
                              column: 15
                            }
                          }
                        }
                      ],
                      start: 322,
                      end: 330,
                      loc: {
                        start: {
                          line: 15,
                          column: 9
                        },
                        end: {
                          line: 15,
                          column: 17
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 319,
                    end: 330,
                    loc: {
                      start: {
                        line: 15,
                        column: 6
                      },
                      end: {
                        line: 15,
                        column: 17
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'g',
                      start: 341,
                      end: 342,
                      loc: {
                        start: {
                          line: 16,
                          column: 9
                        },
                        end: {
                          line: 16,
                          column: 10
                        }
                      }
                    },
                    start: 338,
                    end: 342,
                    loc: {
                      start: {
                        line: 16,
                        column: 6
                      },
                      end: {
                        line: 16,
                        column: 10
                      }
                    }
                  }
                ],
                start: 274,
                end: 348,
                loc: {
                  start: {
                    line: 13,
                    column: 8
                  },
                  end: {
                    line: 17,
                    column: 5
                  }
                }
              },
              start: 274,
              end: 358,
              loc: {
                start: {
                  line: 13,
                  column: 8
                },
                end: {
                  line: 17,
                  column: 15
                }
              }
            }
          ],
          start: 270,
          end: 359,
          loc: {
            start: {
              line: 13,
              column: 4
            },
            end: {
              line: 17,
              column: 16
            }
          }
        },
        {
          type: 'VariableDeclaration',
          kind: 'let',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'z',
                start: 389,
                end: 390,
                loc: {
                  start: {
                    line: 19,
                    column: 28
                  },
                  end: {
                    line: 19,
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
                      name: 'x4',
                      start: 371,
                      end: 373,
                      loc: {
                        start: {
                          line: 19,
                          column: 10
                        },
                        end: {
                          line: 19,
                          column: 12
                        }
                      }
                    },
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'y4',
                            start: 380,
                            end: 382,
                            loc: {
                              start: {
                                line: 19,
                                column: 19
                              },
                              end: {
                                line: 19,
                                column: 21
                              }
                            }
                          },
                          start: 377,
                          end: 382,
                          loc: {
                            start: {
                              line: 19,
                              column: 16
                            },
                            end: {
                              line: 19,
                              column: 21
                            }
                          }
                        }
                      ],
                      start: 375,
                      end: 384,
                      loc: {
                        start: {
                          line: 19,
                          column: 14
                        },
                        end: {
                          line: 19,
                          column: 23
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 371,
                    end: 384,
                    loc: {
                      start: {
                        line: 19,
                        column: 10
                      },
                      end: {
                        line: 19,
                        column: 23
                      }
                    }
                  }
                ],
                start: 369,
                end: 386,
                loc: {
                  start: {
                    line: 19,
                    column: 8
                  },
                  end: {
                    line: 19,
                    column: 25
                  }
                }
              },
              start: 369,
              end: 390,
              loc: {
                start: {
                  line: 19,
                  column: 8
                },
                end: {
                  line: 19,
                  column: 29
                }
              }
            }
          ],
          start: 365,
          end: 391,
          loc: {
            start: {
              line: 19,
              column: 4
            },
            end: {
              line: 19,
              column: 30
            }
          }
        }
      ],
      start: 0,
      end: 391,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 19,
          column: 30
        }
      }
    }
  ],
  [
    `var { [key]: y, ...x } = { b: 1, a: 1 };`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'b',
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
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 27,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
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
                      name: 'a',
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
                      value: 1,
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
                start: 25,
                end: 39,
                loc: {
                  start: {
                    line: 1,
                    column: 25
                  },
                  end: {
                    line: 1,
                    column: 39
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
                      name: 'key',
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
                    value: {
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'RestElement',
                    argument: {
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
                  }
                ],
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
              },
              start: 4,
              end: 39,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 39
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
    `var { ...y } =  { ...z} ;`,
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
                properties: [
                  {
                    type: 'SpreadElement',
                    argument: {
                      type: 'Identifier',
                      name: 'z',
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
                  }
                ],
                start: 16,
                end: 23,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 23
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'y',
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
                    start: 6,
                    end: 10,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 10
                      }
                    }
                  }
                ],
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
    `var [...{...z}] = [{ x: 1}];`,
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
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'x',
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
                        value: {
                          type: 'Literal',
                          value: 1,
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
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
                      }
                    ],
                    start: 19,
                    end: 26,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 26
                      }
                    }
                  }
                ],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'RestElement',
                          argument: {
                            type: 'Identifier',
                            name: 'z',
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
                        }
                      ],
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
    `var {[obj]: y, ...x} = {1: 1, x: 1};`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Literal',
                      value: 1,
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    shorthand: false,
                    start: 24,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 30,
                    end: 34,
                    loc: {
                      start: {
                        line: 1,
                        column: 30
                      },
                      end: {
                        line: 1,
                        column: 34
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'RestElement',
                    argument: {
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
                  }
                ],
                start: 4,
                end: 20,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 20
                  }
                }
              },
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
    `var { [key++]: y, ...x } = { 1: 1, a: 1 };`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 29,
                    end: 33,
                    loc: {
                      start: {
                        line: 1,
                        column: 29
                      },
                      end: {
                        line: 1,
                        column: 33
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                    value: {
                      type: 'Literal',
                      value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 35,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 35
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 27,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 27
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'UpdateExpression',
                      argument: {
                        type: 'Identifier',
                        name: 'key',
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
                      operator: '++',
                      prefix: false,
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
                    value: {
                      type: 'Identifier',
                      name: 'y',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'x',
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
              start: 4,
              end: 41,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 41
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
    `var a = [1], i = 0; [a[i++]] = [];`,
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
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 1,
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
                start: 8,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 11
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
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'Identifier',
                name: 'i',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
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
                  computed: true,
                  property: {
                    type: 'UpdateExpression',
                    argument: {
                      type: 'Identifier',
                      name: 'i',
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
                    operator: '++',
                    prefix: false,
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
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
    `var a = [1], i = 0; [a[(() => 1 + i)()]] = [];`,
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
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'Literal',
                    value: 1,
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
                start: 8,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 11
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
              end: 11,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 11
                }
              }
            },
            {
              type: 'VariableDeclarator',
              init: {
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
              id: {
                type: 'Identifier',
                name: 'i',
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
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'MemberExpression',
                  object: {
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
                  computed: true,
                  property: {
                    type: 'CallExpression',
                    callee: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'BinaryExpression',
                        left: {
                          type: 'Literal',
                          value: 1,
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
                        right: {
                          type: 'Identifier',
                          name: 'i',
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
                        operator: '+',
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
                      params: [],
                      async: false,
                      expression: true,
                      start: 24,
                      end: 35,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 35
                        }
                      }
                    },
                    arguments: [],
                    start: 23,
                    end: 38,
                    loc: {
                      start: {
                        line: 1,
                        column: 23
                      },
                      end: {
                        line: 1,
                        column: 38
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
              start: 43,
              end: 45,
              loc: {
                start: {
                  line: 1,
                  column: 43
                },
                end: {
                  line: 1,
                  column: 45
                }
              }
            },
            start: 20,
            end: 45,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 45
              }
            }
          },
          start: 20,
          end: 46,
          loc: {
            start: {
              line: 1,
              column: 20
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
    `var x; { let x; }`,
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
                name: 'x',
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
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
                }
              ],
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
            }
          ],
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
    `{ let x } var x;`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
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
              start: 2,
              end: 7,
              loc: {
                start: {
                  line: 1,
                  column: 2
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
    `var package = x;`,
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
              id: {
                type: 'Identifier',
                name: 'package',
                start: 4,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 11
                  }
                }
              },
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
    `var protected = x;`,
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
              id: {
                type: 'Identifier',
                name: 'protected',
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
              },
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
    `var [a,] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
  ],
  [
    `var [a,,b] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                  null,
                  {
                    type: 'Identifier',
                    name: 'b',
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
    `var [,,a] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  null,
                  null,
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
              start: 4,
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 14
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
    `var [a] = [,,];`,
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
                type: 'ArrayExpression',
                elements: [null, null],
                start: 10,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
              end: 14,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 14
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
    `var a; [a] = [,,];`,
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [null, null],
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
          start: 7,
          end: 18,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var [...a] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'RestElement',
                    argument: {
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
                    start: 5,
                    end: 9,
                    loc: {
                      start: {
                        line: 1,
                        column: 5
                      },
                      end: {
                        line: 1,
                        column: 9
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
    `var [a = 1] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'a',
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
                    right: {
                      type: 'Literal',
                      value: 1,
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
                start: 4,
                end: 11,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 11
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
    `var [a, b = 1] = [];`,
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
                type: 'ArrayExpression',
                elements: [],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'b',
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
                      type: 'Literal',
                      value: 1,
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
                  }
                ],
                start: 4,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
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
    `var [[a]] = [[]];`,
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
                type: 'ArrayExpression',
                elements: [
                  {
                    type: 'ArrayExpression',
                    elements: [],
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
                  }
                ],
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      }
                    ],
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
    `var a, b; [((((a)))), b] = [];`,
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
              init: null,
              id: {
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
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
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
                }
              ],
              start: 10,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 10
                },
                end: {
                  line: 1,
                  column: 24
                }
              }
            },
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [],
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
    `var a; [[[...a]]] = [[[]]];`,
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ArrayPattern',
              elements: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'RestElement',
                          argument: {
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
                          start: 10,
                          end: 14,
                          loc: {
                            start: {
                              line: 1,
                              column: 10
                            },
                            end: {
                              line: 1,
                              column: 14
                            }
                          }
                        }
                      ],
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
                    }
                  ],
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
            operator: '=',
            right: {
              type: 'ArrayExpression',
              elements: [
                {
                  type: 'ArrayExpression',
                  elements: [
                    {
                      type: 'ArrayExpression',
                      elements: [],
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
                    }
                  ],
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
          start: 7,
          end: 27,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var z, y; ({x:z = 1, x1:y = 20} = {});`,
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
                name: 'z',
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
              init: null,
              id: {
                type: 'Identifier',
                name: 'y',
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
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
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
                  value: {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'z',
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 12,
                  end: 19,
                  loc: {
                    start: {
                      line: 1,
                      column: 12
                    },
                    end: {
                      line: 1,
                      column: 19
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'x1',
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
                  value: {
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 20,
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
                    start: 24,
                    end: 30,
                    loc: {
                      start: {
                        line: 1,
                        column: 24
                      },
                      end: {
                        line: 1,
                        column: 30
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 21,
                  end: 30,
                  loc: {
                    start: {
                      line: 1,
                      column: 21
                    },
                    end: {
                      line: 1,
                      column: 30
                    }
                  }
                }
              ],
              start: 11,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 11
                },
                end: {
                  line: 1,
                  column: 31
                }
              }
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
            start: 11,
            end: 36,
            loc: {
              start: {
                line: 1,
                column: 11
              },
              end: {
                line: 1,
                column: 36
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
    `var x; ({x:x = 20} = {});`,
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
                name: 'x',
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'ObjectPattern',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'x',
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
                    type: 'AssignmentPattern',
                    left: {
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
                    right: {
                      type: 'Literal',
                      value: 20,
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
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
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
              start: 8,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 8
                },
                end: {
                  line: 1,
                  column: 18
                }
              }
            },
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [],
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
            start: 8,
            end: 23,
            loc: {
              start: {
                line: 1,
                column: 8
              },
              end: {
                line: 1,
                column: 23
              }
            }
          },
          start: 7,
          end: 25,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var {x:z = 1, x1:y = 20} = {};`,
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'z',
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
                        type: 'Literal',
                        value: 1,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'x1',
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'y',
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
                      right: {
                        type: 'Literal',
                        value: 20,
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
                      start: 17,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
    `'use strict'; var {x: xx,  foo: {y: xx}} = {foo:[12]};`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'Literal',
            value: 'use strict',
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Literal',
                          value: 12,
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
                        }
                      ],
                      start: 48,
                      end: 52,
                      loc: {
                        start: {
                          line: 1,
                          column: 48
                        },
                        end: {
                          line: 1,
                          column: 52
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 44,
                    end: 52,
                    loc: {
                      start: {
                        line: 1,
                        column: 44
                      },
                      end: {
                        line: 1,
                        column: 52
                      }
                    }
                  }
                ],
                start: 43,
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 43
                  },
                  end: {
                    line: 1,
                    column: 53
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
                      name: 'xx',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 19,
                    end: 24,
                    loc: {
                      start: {
                        line: 1,
                        column: 19
                      },
                      end: {
                        line: 1,
                        column: 24
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
                            type: 'Identifier',
                            name: 'xx',
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
                        }
                      ],
                      start: 32,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 32
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
                    start: 27,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 27
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 18,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 18
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
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
            }
          ],
          start: 14,
          end: 54,
          loc: {
            start: {
              line: 1,
              column: 14
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
    `var {x, y, z, x} = {};`,
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'y',
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
                      name: 'y',
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
                  },
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
    `var x = 20, y, {x} = {};`,
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
                value: 20,
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
              id: {
                type: 'Identifier',
                name: 'x',
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
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
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
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [],
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
              start: 15,
              end: 23,
              loc: {
                start: {
                  line: 1,
                  column: 15
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
    `var a; { function z(a) {} var a; }`,
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [
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
              body: {
                type: 'BlockStatement',
                body: [],
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'z',
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
              start: 9,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 25
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
                    name: 'a',
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
              start: 26,
              end: 32,
              loc: {
                start: {
                  line: 1,
                  column: 26
                },
                end: {
                  line: 1,
                  column: 32
                }
              }
            }
          ],
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
    `function a() {} var a;`,
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
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: null,
              id: {
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
              },
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
    `function a() { var a;  }`,
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
                type: 'VariableDeclaration',
                kind: 'var',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    init: null,
                    id: {
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
                start: 15,
                end: 21,
                loc: {
                  start: {
                    line: 1,
                    column: 15
                  },
                  end: {
                    line: 1,
                    column: 21
                  }
                }
              }
            ],
            start: 13,
            end: 24,
            loc: {
              start: {
                line: 1,
                column: 13
              },
              end: {
                line: 1,
                column: 24
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
    `var a; { function b() {} let a; }`,
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
        {
          type: 'BlockStatement',
          body: [
            {
              type: 'FunctionDeclaration',
              params: [],
              body: {
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
              async: false,
              generator: false,
              id: {
                type: 'Identifier',
                name: 'b',
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
              start: 9,
              end: 24,
              loc: {
                start: {
                  line: 1,
                  column: 9
                },
                end: {
                  line: 1,
                  column: 24
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
                    name: 'a',
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
                }
              ],
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
            }
          ],
          start: 7,
          end: 33,
          loc: {
            start: {
              line: 1,
              column: 7
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
    `var x = { set foo(x) { var foo = 20; } };`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'FunctionExpression',
                      params: [
                        {
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
                        }
                      ],
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
                                  type: 'Literal',
                                  value: 20,
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
                                end: 35,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 27
                                  },
                                  end: {
                                    line: 1,
                                    column: 35
                                  }
                                }
                              }
                            ],
                            start: 23,
                            end: 36,
                            loc: {
                              start: {
                                line: 1,
                                column: 23
                              },
                              end: {
                                line: 1,
                                column: 36
                              }
                            }
                          }
                        ],
                        start: 21,
                        end: 38,
                        loc: {
                          start: {
                            line: 1,
                            column: 21
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
                      start: 17,
                      end: 38,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 38
                        }
                      }
                    },
                    kind: 'set',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 40
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'x',
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
              end: 40,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 40
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
    `var x = (function foo() { class foo { } });`,
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
                type: 'FunctionExpression',
                params: [],
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ClassDeclaration',
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
                      superClass: null,
                      body: {
                        type: 'ClassBody',
                        body: [],
                        start: 36,
                        end: 39,
                        loc: {
                          start: {
                            line: 1,
                            column: 36
                          },
                          end: {
                            line: 1,
                            column: 39
                          }
                        }
                      },
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'x',
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
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
    `;(function foo() { class foo { } });`,
    Context.OptionsLoc,
    {
      type: 'Program',
      sourceType: 'script',
      body: [
        {
          type: 'EmptyStatement',
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
          type: 'ExpressionStatement',
          expression: {
            type: 'FunctionExpression',
            params: [],
            body: {
              type: 'BlockStatement',
              body: [
                {
                  type: 'ClassDeclaration',
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
                  superClass: null,
                  body: {
                    type: 'ClassBody',
                    body: [],
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
                  start: 19,
                  end: 32,
                  loc: {
                    start: {
                      line: 1,
                      column: 19
                    },
                    end: {
                      line: 1,
                      column: 32
                    }
                  }
                }
              ],
              start: 17,
              end: 34,
              loc: {
                start: {
                  line: 1,
                  column: 17
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
            start: 2,
            end: 34,
            loc: {
              start: {
                line: 1,
                column: 2
              },
              end: {
                line: 1,
                column: 34
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
    `var x = (function foo() { let foo = 20; });`,
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
                type: 'FunctionExpression',
                params: [],
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
                            type: 'Literal',
                            value: 20,
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
                          id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 30,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          },
                          start: 30,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'x',
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
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
    `var x = (function foo() { const foo = 20; });`,
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
                type: 'FunctionExpression',
                params: [],
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
                            value: 20,
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
                          end: 40,
                          loc: {
                            start: {
                              line: 1,
                              column: 32
                            },
                            end: {
                              line: 1,
                              column: 40
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 43,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 43
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 9,
                end: 43,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 43
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'x',
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
    `var x = (function foo() { var foo = 20; });`,
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
                type: 'FunctionExpression',
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
                          init: {
                            type: 'Literal',
                            value: 20,
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
                          id: {
                            type: 'Identifier',
                            name: 'foo',
                            start: 30,
                            end: 33,
                            loc: {
                              start: {
                                line: 1,
                                column: 30
                              },
                              end: {
                                line: 1,
                                column: 33
                              }
                            }
                          },
                          start: 30,
                          end: 38,
                          loc: {
                            start: {
                              line: 1,
                              column: 30
                            },
                            end: {
                              line: 1,
                              column: 38
                            }
                          }
                        }
                      ],
                      start: 26,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 26
                        },
                        end: {
                          line: 1,
                          column: 39
                        }
                      }
                    }
                  ],
                  start: 24,
                  end: 41,
                  loc: {
                    start: {
                      line: 1,
                      column: 24
                    },
                    end: {
                      line: 1,
                      column: 41
                    }
                  }
                },
                async: false,
                generator: false,
                id: {
                  type: 'Identifier',
                  name: 'foo',
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
                start: 9,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 9
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'x',
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
              end: 42,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 42
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
    `var a; { let a; } `,
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
            }
          ],
          start: 0,
          end: 6,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 1,
              column: 6
            }
          }
        },
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
                }
              ],
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
            }
          ],
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
    `var [,,a,b,,,c=2,...d] = a;`,
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
                type: 'Identifier',
                name: 'a',
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
              id: {
                type: 'ArrayPattern',
                elements: [
                  null,
                  null,
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
                  null,
                  null,
                  {
                    type: 'AssignmentPattern',
                    left: {
                      type: 'Identifier',
                      name: 'c',
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
                    right: {
                      type: 'Literal',
                      value: 2,
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
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'd',
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
                    start: 17,
                    end: 21,
                    loc: {
                      start: {
                        line: 1,
                        column: 17
                      },
                      end: {
                        line: 1,
                        column: 21
                      }
                    }
                  }
                ],
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
    `var [, , , ] = a;
  /**************************************************/
  var [,,,]=a;
  /**************************************************/
  var [, , , ] = a;`,
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
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'a',
                start: 85,
                end: 86,
                loc: {
                  start: {
                    line: 3,
                    column: 12
                  },
                  end: {
                    line: 3,
                    column: 13
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
                start: 79,
                end: 84,
                loc: {
                  start: {
                    line: 3,
                    column: 6
                  },
                  end: {
                    line: 3,
                    column: 11
                  }
                }
              },
              start: 79,
              end: 86,
              loc: {
                start: {
                  line: 3,
                  column: 6
                },
                end: {
                  line: 3,
                  column: 13
                }
              }
            }
          ],
          start: 75,
          end: 87,
          loc: {
            start: {
              line: 3,
              column: 2
            },
            end: {
              line: 3,
              column: 14
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
                name: 'a',
                start: 160,
                end: 161,
                loc: {
                  start: {
                    line: 5,
                    column: 17
                  },
                  end: {
                    line: 5,
                    column: 18
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [null, null, null],
                start: 149,
                end: 157,
                loc: {
                  start: {
                    line: 5,
                    column: 6
                  },
                  end: {
                    line: 5,
                    column: 14
                  }
                }
              },
              start: 149,
              end: 161,
              loc: {
                start: {
                  line: 5,
                  column: 6
                },
                end: {
                  line: 5,
                  column: 18
                }
              }
            }
          ],
          start: 145,
          end: 162,
          loc: {
            start: {
              line: 5,
              column: 2
            },
            end: {
              line: 5,
              column: 19
            }
          }
        }
      ],
      start: 0,
      end: 162,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 5,
          column: 19
        }
      }
    }
  ],
  [
    `var [a, [b, c, d=2], ...rest] = test;`,
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
                type: 'Identifier',
                name: 'test',
                start: 32,
                end: 36,
                loc: {
                  start: {
                    line: 1,
                    column: 32
                  },
                  end: {
                    line: 1,
                    column: 36
                  }
                }
              },
              id: {
                type: 'ArrayPattern',
                elements: [
                  {
                    type: 'Identifier',
                    name: 'a',
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
                    type: 'ArrayPattern',
                    elements: [
                      {
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
                      {
                        type: 'Identifier',
                        name: 'c',
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
                      {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'd',
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
                          type: 'Literal',
                          value: 2,
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
                    start: 8,
                    end: 19,
                    loc: {
                      start: {
                        line: 1,
                        column: 8
                      },
                      end: {
                        line: 1,
                        column: 19
                      }
                    }
                  },
                  {
                    type: 'RestElement',
                    argument: {
                      type: 'Identifier',
                      name: 'rest',
                      start: 24,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 24
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    start: 21,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 28
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
              start: 4,
              end: 36,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 1,
                  column: 36
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
    `var x = a; var x = b;`,
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
              id: {
                type: 'Identifier',
                name: 'x',
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
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'Identifier',
                name: 'b',
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
              id: {
                type: 'Identifier',
                name: 'x',
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
            }
          ],
          start: 11,
          end: 21,
          loc: {
            start: {
              line: 1,
              column: 11
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
    `var obj = {
      a: {
          ["b" + c]: d,
          e: fn()
      },
      f
  };`,
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
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
                      start: 18,
                      end: 19,
                      loc: {
                        start: {
                          line: 2,
                          column: 6
                        },
                        end: {
                          line: 2,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'ObjectExpression',
                      properties: [
                        {
                          type: 'Property',
                          key: {
                            type: 'BinaryExpression',
                            left: {
                              type: 'Literal',
                              value: 'b',
                              start: 34,
                              end: 37,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 11
                                },
                                end: {
                                  line: 3,
                                  column: 14
                                }
                              }
                            },
                            right: {
                              type: 'Identifier',
                              name: 'c',
                              start: 40,
                              end: 41,
                              loc: {
                                start: {
                                  line: 3,
                                  column: 17
                                },
                                end: {
                                  line: 3,
                                  column: 18
                                }
                              }
                            },
                            operator: '+',
                            start: 34,
                            end: 41,
                            loc: {
                              start: {
                                line: 3,
                                column: 11
                              },
                              end: {
                                line: 3,
                                column: 18
                              }
                            }
                          },
                          value: {
                            type: 'Identifier',
                            name: 'd',
                            start: 44,
                            end: 45,
                            loc: {
                              start: {
                                line: 3,
                                column: 21
                              },
                              end: {
                                line: 3,
                                column: 22
                              }
                            }
                          },
                          kind: 'init',
                          computed: true,
                          method: false,
                          shorthand: false,
                          start: 33,
                          end: 45,
                          loc: {
                            start: {
                              line: 3,
                              column: 10
                            },
                            end: {
                              line: 3,
                              column: 22
                            }
                          }
                        },
                        {
                          type: 'Property',
                          key: {
                            type: 'Identifier',
                            name: 'e',
                            start: 57,
                            end: 58,
                            loc: {
                              start: {
                                line: 4,
                                column: 10
                              },
                              end: {
                                line: 4,
                                column: 11
                              }
                            }
                          },
                          value: {
                            type: 'CallExpression',
                            callee: {
                              type: 'Identifier',
                              name: 'fn',
                              start: 60,
                              end: 62,
                              loc: {
                                start: {
                                  line: 4,
                                  column: 13
                                },
                                end: {
                                  line: 4,
                                  column: 15
                                }
                              }
                            },
                            arguments: [],
                            start: 60,
                            end: 64,
                            loc: {
                              start: {
                                line: 4,
                                column: 13
                              },
                              end: {
                                line: 4,
                                column: 17
                              }
                            }
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: false,
                          start: 57,
                          end: 64,
                          loc: {
                            start: {
                              line: 4,
                              column: 10
                            },
                            end: {
                              line: 4,
                              column: 17
                            }
                          }
                        }
                      ],
                      start: 21,
                      end: 72,
                      loc: {
                        start: {
                          line: 2,
                          column: 9
                        },
                        end: {
                          line: 5,
                          column: 7
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
                    start: 18,
                    end: 72,
                    loc: {
                      start: {
                        line: 2,
                        column: 6
                      },
                      end: {
                        line: 5,
                        column: 7
                      }
                    }
                  },
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'f',
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 7
                        }
                      }
                    },
                    value: {
                      type: 'Identifier',
                      name: 'f',
                      start: 80,
                      end: 81,
                      loc: {
                        start: {
                          line: 6,
                          column: 6
                        },
                        end: {
                          line: 6,
                          column: 7
                        }
                      }
                    },
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
                    start: 80,
                    end: 81,
                    loc: {
                      start: {
                        line: 6,
                        column: 6
                      },
                      end: {
                        line: 6,
                        column: 7
                      }
                    }
                  }
                ],
                start: 10,
                end: 85,
                loc: {
                  start: {
                    line: 1,
                    column: 10
                  },
                  end: {
                    line: 7,
                    column: 3
                  }
                }
              },
              id: {
                type: 'Identifier',
                name: 'obj',
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
              end: 85,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 7,
                  column: 3
                }
              }
            }
          ],
          start: 0,
          end: 86,
          loc: {
            start: {
              line: 1,
              column: 0
            },
            end: {
              line: 7,
              column: 4
            }
          }
        }
      ],
      start: 0,
      end: 86,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 7,
          column: 4
        }
      }
    }
  ],
  [
    `a = {
      "b": "b",
      c
    };
    /**************************************************/
    a={"b":"b",c};
    /**************************************************/
    a = {
      "b": "b",
      c
    };`,
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
            operator: '=',
            right: {
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Literal',
                    value: 'b',
                    start: 12,
                    end: 15,
                    loc: {
                      start: {
                        line: 2,
                        column: 6
                      },
                      end: {
                        line: 2,
                        column: 9
                      }
                    }
                  },
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 17,
                    end: 20,
                    loc: {
                      start: {
                        line: 2,
                        column: 11
                      },
                      end: {
                        line: 2,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 12,
                  end: 20,
                  loc: {
                    start: {
                      line: 2,
                      column: 6
                    },
                    end: {
                      line: 2,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 28,
                    end: 29,
                    loc: {
                      start: {
                        line: 3,
                        column: 6
                      },
                      end: {
                        line: 3,
                        column: 7
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 28,
                    end: 29,
                    loc: {
                      start: {
                        line: 3,
                        column: 6
                      },
                      end: {
                        line: 3,
                        column: 7
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 28,
                  end: 29,
                  loc: {
                    start: {
                      line: 3,
                      column: 6
                    },
                    end: {
                      line: 3,
                      column: 7
                    }
                  }
                }
              ],
              start: 4,
              end: 35,
              loc: {
                start: {
                  line: 1,
                  column: 4
                },
                end: {
                  line: 4,
                  column: 5
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
                line: 4,
                column: 5
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
              line: 4,
              column: 6
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a',
              start: 98,
              end: 99,
              loc: {
                start: {
                  line: 6,
                  column: 4
                },
                end: {
                  line: 6,
                  column: 5
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
                    type: 'Literal',
                    value: 'b',
                    start: 101,
                    end: 104,
                    loc: {
                      start: {
                        line: 6,
                        column: 7
                      },
                      end: {
                        line: 6,
                        column: 10
                      }
                    }
                  },
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 105,
                    end: 108,
                    loc: {
                      start: {
                        line: 6,
                        column: 11
                      },
                      end: {
                        line: 6,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 101,
                  end: 108,
                  loc: {
                    start: {
                      line: 6,
                      column: 7
                    },
                    end: {
                      line: 6,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 109,
                    end: 110,
                    loc: {
                      start: {
                        line: 6,
                        column: 15
                      },
                      end: {
                        line: 6,
                        column: 16
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 109,
                    end: 110,
                    loc: {
                      start: {
                        line: 6,
                        column: 15
                      },
                      end: {
                        line: 6,
                        column: 16
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 109,
                  end: 110,
                  loc: {
                    start: {
                      line: 6,
                      column: 15
                    },
                    end: {
                      line: 6,
                      column: 16
                    }
                  }
                }
              ],
              start: 100,
              end: 111,
              loc: {
                start: {
                  line: 6,
                  column: 6
                },
                end: {
                  line: 6,
                  column: 17
                }
              }
            },
            start: 98,
            end: 111,
            loc: {
              start: {
                line: 6,
                column: 4
              },
              end: {
                line: 6,
                column: 17
              }
            }
          },
          start: 98,
          end: 112,
          loc: {
            start: {
              line: 6,
              column: 4
            },
            end: {
              line: 6,
              column: 18
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            left: {
              type: 'Identifier',
              name: 'a',
              start: 174,
              end: 175,
              loc: {
                start: {
                  line: 8,
                  column: 4
                },
                end: {
                  line: 8,
                  column: 5
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
                    type: 'Literal',
                    value: 'b',
                    start: 186,
                    end: 189,
                    loc: {
                      start: {
                        line: 9,
                        column: 6
                      },
                      end: {
                        line: 9,
                        column: 9
                      }
                    }
                  },
                  value: {
                    type: 'Literal',
                    value: 'b',
                    start: 191,
                    end: 194,
                    loc: {
                      start: {
                        line: 9,
                        column: 11
                      },
                      end: {
                        line: 9,
                        column: 14
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: false,
                  start: 186,
                  end: 194,
                  loc: {
                    start: {
                      line: 9,
                      column: 6
                    },
                    end: {
                      line: 9,
                      column: 14
                    }
                  }
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: 'c',
                    start: 202,
                    end: 203,
                    loc: {
                      start: {
                        line: 10,
                        column: 6
                      },
                      end: {
                        line: 10,
                        column: 7
                      }
                    }
                  },
                  value: {
                    type: 'Identifier',
                    name: 'c',
                    start: 202,
                    end: 203,
                    loc: {
                      start: {
                        line: 10,
                        column: 6
                      },
                      end: {
                        line: 10,
                        column: 7
                      }
                    }
                  },
                  kind: 'init',
                  computed: false,
                  method: false,
                  shorthand: true,
                  start: 202,
                  end: 203,
                  loc: {
                    start: {
                      line: 10,
                      column: 6
                    },
                    end: {
                      line: 10,
                      column: 7
                    }
                  }
                }
              ],
              start: 178,
              end: 209,
              loc: {
                start: {
                  line: 8,
                  column: 8
                },
                end: {
                  line: 11,
                  column: 5
                }
              }
            },
            start: 174,
            end: 209,
            loc: {
              start: {
                line: 8,
                column: 4
              },
              end: {
                line: 11,
                column: 5
              }
            }
          },
          start: 174,
          end: 210,
          loc: {
            start: {
              line: 8,
              column: 4
            },
            end: {
              line: 11,
              column: 6
            }
          }
        }
      ],
      start: 0,
      end: 210,
      loc: {
        start: {
          line: 1,
          column: 0
        },
        end: {
          line: 11,
          column: 6
        }
      }
    }
  ],

  [
    `var {[a]: b} = c`,
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
              id: {
                type: 'ObjectPattern',
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
                      type: 'Identifier',
                      name: 'b',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
    `var {[a]: [b]} = c`,
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
                type: 'Identifier',
                name: 'c',
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
              id: {
                type: 'ObjectPattern',
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
                      type: 'ArrayPattern',
                      elements: [
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
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
                start: 4,
                end: 14,
                loc: {
                  start: {
                    line: 1,
                    column: 4
                  },
                  end: {
                    line: 1,
                    column: 14
                  }
                }
              },
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
    `var {a: [b]} = c`,
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
              id: {
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
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
                        }
                      ],
                      start: 8,
                      end: 11,
                      loc: {
                        start: {
                          line: 1,
                          column: 8
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
    `var {a,b=0,c:d,e:f=0,[g]:[h]}=0`,
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
                value: 0,
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
                type: 'ObjectPattern',
                properties: [
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'a',
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
                    value: {
                      type: 'Identifier',
                      name: 'a',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
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
                      right: {
                        type: 'Literal',
                        value: 0,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: true,
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
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'c',
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
                    value: {
                      type: 'Identifier',
                      name: 'd',
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'f',
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
                      right: {
                        type: 'Literal',
                        value: 0,
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
                    kind: 'init',
                    computed: false,
                    method: false,
                    shorthand: false,
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
                  {
                    type: 'Property',
                    key: {
                      type: 'Identifier',
                      name: 'g',
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'h',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 21,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 21
                      },
                      end: {
                        line: 1,
                        column: 28
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
              start: 4,
              end: 31,
              loc: {
                start: {
                  line: 1,
                  column: 4
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
    `var m = 'foo'; var {[m]:[z]} = {foo:[1]}`,
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
                value: 'foo',
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
                name: 'm',
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
        },
        {
          type: 'VariableDeclaration',
          kind: 'var',
          declarations: [
            {
              type: 'VariableDeclarator',
              init: {
                type: 'ObjectExpression',
                properties: [
                  {
                    type: 'Property',
                    key: {
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
                    value: {
                      type: 'ArrayExpression',
                      elements: [
                        {
                          type: 'Literal',
                          value: 1,
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
                        }
                      ],
                      start: 36,
                      end: 39,
                      loc: {
                        start: {
                          line: 1,
                          column: 36
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
                    start: 32,
                    end: 39,
                    loc: {
                      start: {
                        line: 1,
                        column: 32
                      },
                      end: {
                        line: 1,
                        column: 39
                      }
                    }
                  }
                ],
                start: 31,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 31
                  },
                  end: {
                    line: 1,
                    column: 40
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
                      name: 'm',
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
                    value: {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'z',
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
                    kind: 'init',
                    computed: true,
                    method: false,
                    shorthand: false,
                    start: 20,
                    end: 27,
                    loc: {
                      start: {
                        line: 1,
                        column: 20
                      },
                      end: {
                        line: 1,
                        column: 27
                      }
                    }
                  }
                ],
                start: 19,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 19
                  },
                  end: {
                    line: 1,
                    column: 28
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
          start: 15,
          end: 40,
          loc: {
            start: {
              line: 1,
              column: 15
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
]);
