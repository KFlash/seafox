import { Context } from '../../../src/parser/bits';
import * as t from 'assert';
import { parseScript } from '../../../src/seafox';

describe('Expressions - Arrow', () => {
  for (const [source, ctx] of [
    [`([a]) => { let a; }`, Context.OptionsDisableWebCompat],
    ['([a]) => { let a; }', Context.OptionsDisableWebCompat],
    ['({a}) => { let a; }', Context.OptionsDisableWebCompat],
    ['(a) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['([a]) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['({a}) => { const a = 0; }', Context.OptionsDisableWebCompat],
    ['() => { let a; var a; }', Context.OptionsDisableWebCompat],
    ['new foo => bar', Context.OptionsDisableWebCompat],
    ['let let => bar', Context.OptionsDisableWebCompat],
    ['package => bar', Context.OptionsDisableWebCompat | Context.Strict],
    ['foo new => bar', Context.OptionsDisableWebCompat | Context.Strict],
    ['foo new bar => zoo', Context.OptionsDisableWebCompat | Context.Strict],
    ['async await => yield', Context.OptionsDisableWebCompat | Context.Strict],
    ['async await => yield', Context.OptionsDisableWebCompat],
    ['yield => yield', Context.OptionsDisableWebCompat | Context.Strict],
    ['let let => bar', Context.OptionsDisableWebCompat],
    ['([a, a]) => 0;', Context.OptionsDisableWebCompat],
    ['({a, a}) => 0;', Context.OptionsDisableWebCompat],
    ['([a],...a)=>0', Context.OptionsDisableWebCompat],
    ['(a,...a)=>0', Context.OptionsDisableWebCompat],
    ['([a],...a)=>0', Context.OptionsDisableWebCompat],
    ['(x) => { let x }', Context.OptionsDisableWebCompat],
    ['(x) => { const x = y }', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(a, a) => {}', Context.OptionsDisableWebCompat],
    ['(a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, a) => {}', Context.OptionsDisableWebCompat],
    ['(a, a, b) => {}', Context.OptionsDisableWebCompat],
    ['a => const a', Context.OptionsDisableWebCompat],
    ['a => const [a]', Context.OptionsDisableWebCompat],
    ['a => const {a}', Context.OptionsDisableWebCompat],
    ['a => let {a}', Context.OptionsDisableWebCompat],
    ['async a => let {a}', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.Empty],
    ['let => { let let }', Context.Empty],
    ['const let => { let }', Context.Empty],
    ['var logger = a,b => console.log(a);', Context.Empty],
    [
      `var a = ()
    =>{}`,
      Context.Empty
    ],
    ['var a = (b) =>', Context.Empty],
    ['(a, a) => {}', Context.Empty],
    ['(a, b, a) => {}', Context.Empty],
    ['(b, a, a) => {}', Context.Empty],
    ['(a, a, b) => {}', Context.Empty],
    ['a => const a', Context.Empty],
    ['a => const [a]', Context.Empty | Context.Strict | Context.Module],
    ['a => const {a}', Context.Empty | Context.Strict | Context.Module],
    ['a => let {a}', Context.Empty | Context.Strict | Context.Module],
    ['async a => let {a}', Context.Empty | Context.Strict | Context.Module],
    ['([b, a, b, a]) => {}', Context.Empty],
    ['([b, a], b) => {}', Context.Empty],
    ['([b, a], {b}) => {}', Context.Empty],
    ['([b, a], b=x) => {}', Context.Empty],
    ['([a], a, ...b) => {}', Context.Empty],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.Strict | Context.OptionsDisableWebCompat],
    ['({y: x, x}) => 1;', Context.OptionsDisableWebCompat],
    ['({y: x}, ...x) => 1;', Context.OptionsDisableWebCompat],
    ['a = b => { let b; }', Context.OptionsDisableWebCompat],
    ['(a = b => { let b; })', Context.OptionsDisableWebCompat],
    ['yield => { let yield; }', Context.OptionsDisableWebCompat],
    ['({x: x, x: x}) => a', Context.OptionsDisableWebCompat],
    ['(x, {y: x}) => 1;', Context.Strict | Context.OptionsDisableWebCompat],
    ['({y: x, x}) => 1;', Context.Empty],
    ['({y: x}, ...x) => 1;', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['a = b => { let b; }', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(a = b => { let b; })', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['yield => { let yield; }', Context.OptionsDisableWebCompat | Context.Strict],
    ['({x: x, x: x}) => a', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['await => { let await; }', Context.OptionsDisableWebCompat],
    ['({x: y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['async ({x: y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['({"x": x, x: x}) => a', Context.OptionsDisableWebCompat],
    ['({"x": y, x: x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['({1: x, 2: x}) => a', Context.OptionsDisableWebCompat],
    ['({2: y, "x": x = y}) => { let y; }', Context.OptionsDisableWebCompat],
    ['(a) => { let a; }', Context.OptionsDisableWebCompat],
    ['([b, a], b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b=x) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], ...b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], {b}) => {}', Context.OptionsDisableWebCompat],
    ['(a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['([a,b,c]) => { const c = x; }', Context.OptionsDisableWebCompat | Context.Strict | Context.Module],
    ['(x) => { const x = y }', Context.OptionsDisableWebCompat],
    ['(x) => { let x }', Context.OptionsDisableWebCompat],
    ['yield => let yield', Context.OptionsDisableWebCompat],
    ['a => { let a }', Context.OptionsDisableWebCompat],
    ['a => { const a }', Context.OptionsDisableWebCompat],
    ['a => const [a]', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => const {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => let {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['async a => let {a}', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['yield => let yield', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => { let a }', Context.OptionsDisableWebCompat | Context.Module | Context.Strict | Context.OptionsNext],
    ['a => { const a }', Context.OptionsDisableWebCompat | Context.Module | Context.Strict],
    ['a => { let [a] = x; }', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => { let {a} = x }', Context.OptionsDisableWebCompat | Context.OptionsNext],
    ['a => { let [a] = x; }', Context.OptionsDisableWebCompat],
    ['a => { let {a} = x }', Context.OptionsDisableWebCompat],
    ['a => {  const a = y; function x(){}  }', Context.OptionsDisableWebCompat],
    ['({a}) => { let a; }', Context.OptionsDisableWebCompat],
    ['({x:x, x:x}) => {}', Context.OptionsDisableWebCompat],
    ['([x, x]) => {}', Context.OptionsDisableWebCompat],
    ['([x], [x]) => {}', Context.OptionsDisableWebCompat],
    ['([x], {x:x}) => {}', Context.OptionsDisableWebCompat],
    ['([x], x) => {}', Context.OptionsDisableWebCompat],
    ['(x, [x]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], ...b) => {}', Context.OptionsDisableWebCompat],
    ['() => { let x; var x; }', Context.OptionsDisableWebCompat],
    ['() => { var x; let x; }', Context.OptionsDisableWebCompat],
    ['(a, a = b) => {}', Context.OptionsDisableWebCompat],
    ['([foo], [foo]) => {}', Context.OptionsDisableWebCompat],
    ['([foo] = x, [foo] = y) => {}', Context.OptionsDisableWebCompat],
    ['({foo} = x, {foo}) => {}', Context.OptionsDisableWebCompat],
    ['([{foo}] = x, {foo}) => {}', Context.OptionsDisableWebCompat],
    ['([{foo}] = x, [{foo}]) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a, [x]) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, a = x) => {}', Context.OptionsDisableWebCompat],
    ['(b, a, b, ...a) => {}', Context.OptionsDisableWebCompat],
    ['([a, a]) => {}', Context.OptionsDisableWebCompat],
    ['a => { let a; }', Context.OptionsDisableWebCompat],
    ['([a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, a]) => {}', Context.OptionsDisableWebCompat],
    ['([a, a, b]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a, b, a]) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], {b}) => {}', Context.OptionsDisableWebCompat],
    ['([b, a], b=x) => {}', Context.OptionsDisableWebCompat],
    ['([a], a, ...b) => {}', Context.OptionsDisableWebCompat],
    ['a = b\n=> c', Context.Empty],
    ['a = b\n=>\nc', Context.Empty],
    ['a\n= b\n=> c', Context.Empty],
    ['()=>{}+a', Context.Empty],
    ['()=>{}++', Context.Empty],
    ['()=>{}--', Context.Empty],
    ['()=>{}\n++x', Context.Empty],
    ['()=>{}\n--x', Context.Empty],
    ['a?c:d=>{}=>{};', Context.Empty],
    ['(...a)`template-head${c}`=>{}', Context.Empty],
    ['(...a)?c:d=>{}=>{};', Context.Empty],
    ['x = (...a)[1]=>{};', Context.Empty],
    ['(a,...b)`template-head${c}`=>{}', Context.Empty],
    ['(a,...b)`${c}template-tail`=>{};', Context.Empty],
    ['x = (a,...b)`${c}template-tail`=>{}', Context.Empty],
    ['x = (a,...b)[c]=>{};', Context.Empty],
    ['()`template-head${c}template-tail`=>{}', Context.Empty],
    ['()?c:d=>{}=>{};', Context.Empty],
    ['x = ()[1]=>{}', Context.Empty],
    ['x = ()[c]=>{};', Context.Empty],
    ['x = (a,b)+c=>{};', Context.Empty],
    ['x = a`template-head${c}template-tail`=>{}', Context.Empty],
    ['x = ac++=>{};', Context.Empty],
    ['(a)`${c}template-tail`=>{}', Context.Empty],
    ['(a)`template-head${c}template-tail`=>{};', Context.Empty],
    ['x = (a)?c:d=>{}=>{}', Context.Empty],
    ['x = (a)`${c}template-tail`=>{};', Context.Empty],
    ['a`${c}template-tail`=>{}', Context.Empty],
    ['a`template-head${c}template-tail`=>{};', Context.Empty],
    ['({x: {x: y}.length})  => {}', Context.Empty],
    ['({x: x + y})  => {}', Context.Empty],
    ['({x: void x})  => {}', Context.Empty],
    ['({x: this})  => {}', Context.Empty],
    ['({x: function(){}})  => {}', Context.Empty],
    ['({x: async ()=>x})  => {}', Context.Empty],
    ['0 || () => 0', Context.Empty],
    ['0 || x => 0', Context.Empty],
    ['0 || (x) => 0', Context.Empty],
    ['0 || (x,y) => 0', Context.Empty],
    ['!()=>{}', Context.Empty],
    ['(x, y)[7] => {}', Context.Empty],
    ['var a = (x) \n => { return d };', Context.Empty],
    ['var a = {}; a\n.x => d;', Context.Empty],
    ['var a = {}; a.x \n => d;', Context.Empty],
    ['x = a`c`=>{}', Context.Empty],
    ['([(a)]) => {};', Context.Empty],
    ['(x, /x/g) => x', Context.Empty],
    ['(x, /x/g) => x', Context.Empty],
    ['(a=/i/) = /i/', Context.Empty],
    ['(x => y) = {}', Context.Empty],
    ['(x => y) = {}', Context.Empty],
    ['function x(){([(a)]) => {} }', Context.Empty],
    ['(a)[1]=>{}', Context.Empty],
    ['(a)[c]=>{};', Context.Empty],
    ['x = (a)`c`=>{}', Context.Empty],
    ['x = (a)-c=>{};', Context.Empty],
    ['(...a)`c`=>{}', Context.Empty],
    ['(...a)-c=>{};', Context.Empty],
    ['x = (...a)+c=>{}', Context.Empty],
    ['x = (...a)-c=>{};', Context.Empty],
    ['(a,b)+c=>{}', Context.Empty],
    ['x = (a,b)", "=>{}', Context.Empty],
    ['(a()=0)=>0', Context.Empty],
    ['x = (a,b)-c=>{};', Context.Empty],
    ['(a,...b)+c=>{}', Context.Empty],
    ['(a,...b)+c=>{}', Context.Empty],
    ['(a=1 => 42)', Context.Empty],
    ['([a, b] => 42)', Context.Empty],
    ['({a, b} => 42)', Context.Empty],
    ['([a, b] = [] => 42)', Context.Empty],
    ['({a, b} = {} => 42)', Context.Empty],
    ['(...a => 42)', Context.Empty],
    ['32 => {}', Context.Empty],
    ['(32) => {}', Context.Empty],
    ['(a, 32) => {}', Context.Empty],
    ['if => {}', Context.Empty],
    ['(if) => {}', Context.Empty],
    ['(a, if) => {}', Context.Empty],
    ['a + b => {}', Context.Empty],
    ['(a + b) => {}', Context.Empty],
    ['(a + b, c) => {}', Context.Empty],
    ['(a, b - c) => {}', Context.Empty],
    ['"a" => {}', Context.Empty],
    ['("a") => {}', Context.Empty],
    ['("a", b) => {}', Context.Empty],
    ['(a, "b") => {}', Context.Empty],
    ['-a => {}', Context.Empty],
    ['(-a) => {}', Context.Empty],
    ['(-a, b) => {}', Context.Empty],
    ['(a, -b) => {}', Context.Empty],
    ['{} => {}', Context.Empty],
    ['a++ => {}', Context.Empty],
    ['(a++) => {}', Context.Empty],
    ['(a++, b) => {}', Context.Empty],
    ['(a, b++) => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['({...[a, b]}) => x', Context.Empty],
    ['({...{a, b}}) => x', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['(a, foo ? bar : baz) => {}', Context.Empty],
    ['(foo ? bar : baz, a) => {}', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ['(c, a.b) => {}', Context.Empty],
    ["(a['b'], c) => {}", Context.Empty],
    ["(c, a['b']) => {}", Context.Empty],
    ['(...a = b) => b', Context.Empty],
    ["() => {'value': 42}", Context.Empty],
    [')', Context.Empty],
    [') => 0', Context.Empty],
    ['=> 0', Context.Empty],
    ['=>', Context.Empty],
    ['=> {}', Context.Empty],
    ['([x.y]=z) => z', Context.Empty],
    [') => {}', Context.Empty],
    ['(()) => 0', Context.Empty],
    ['((x)) => 0', Context.Empty],
    ['((x, y)) => 0', Context.Empty],
    ['(x, (y)) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['([...x.y]) => z', Context.Empty],
    ['([...(x), y] = z) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['([...x.y] = z) => z', Context.Empty],
    ['(x, (y, z)) => 0', Context.Empty],
    ['((x, y), z) => 0', Context.Empty],
    ['(a => a) +', Context.Empty],
    ['a => (b => (a + b)', Context.Empty],
    [`([[[[[[[[[[[[[[[[[[[[{a:b[0]}]]]]]]]]]]]]]]]]]]]])=>0;`, Context.Empty],
    [`bar ? (=> 0) : baz;`, Context.Empty],
    [`() => {} 1`, Context.Empty],
    [`() => {} a`, Context.Empty],
    [`(...a, ...b) => {}`, Context.Empty],
    [`(...a, ...b) => {}`, Context.Empty],
    [`(a, ...b,) => {}`, Context.Empty],
    [`(...x,) => x`, Context.Empty],
    [`() => {} a()`, Context.Empty],
    [`() => {} 1`, Context.Empty],
    [`((x, y)) => 0`, Context.Empty],
    ['(b = (a,)) => {}', Context.Empty],
    [`32 => {}`, Context.Empty],
    [`(32) => {}`, Context.Empty],
    [`if => {}`, Context.Empty],
    [`a++ => {}`, Context.Empty],
    [`(a, b++) => {}`, Context.Empty],
    [`(a, foo ? bar : baz) => {}`, Context.Empty],
    [`(a.b, c) => {}`, Context.Empty],
    [`(a['b'], c) => {}`, Context.Empty],
    [`(a, (b)) => 42;`, Context.Empty],
    [`({get a(){}}) => 0;`, Context.Empty],
    [`([a,...b,])=>0;`, Context.Empty],
    [`({a:b[0]})=>0`, Context.Empty],
    [`({}=>0)`, Context.Empty],
    [`({a:b[0]})=>0`, Context.Empty],
    [`({}=>0)`, Context.Empty],
    [`(a['b'], c) => {}`, Context.Empty],
    [`(...a = b) => b`, Context.Empty],
    [`(-a) => {}`, Context.Empty],
    [`(...rest - a) => b`, Context.Empty],
    [`(a, ...b - 10) => b`, Context.Empty],
    [`((x, y), z) => 0`, Context.Empty],
    ['(a\n=> a)(1)', Context.Empty],
    ['(a/*\n*/=> a)(1)', Context.Empty],
    ['((a)\n=> a)(1)', Context.Empty],
    ['((a)/*\n*/=> a)(1)', Context.Empty],
    ['((a, b)\n=> a + b)(1, 2)', Context.Empty],
    ['((a, b)/*\n*/=> a + b)(1, 2)', Context.Empty],
    [`[]=>0`, Context.Empty],
    [`() ? 0`, Context.Empty],
    [`(a)\n=> 0`, Context.Empty],
    [`1 + ()`, Context.Empty],
    [`(a,...a)/*\u2028*/ => 0`, Context.Empty],
    [`(a,...a)\n`, Context.Empty],
    [`() <= 0`, Context.Empty],
    [`(a,...a)/*\u202a*/`, Context.Empty],
    [`(a,...a)/*\n*/ => 0`, Context.Empty],
    [`left = (aSize.width/2) - ()`, Context.Empty],
    [`(10) => 0;`, Context.Empty],
    ['{} => {}', Context.Empty],
    ['a++ => {}', Context.Empty],
    ['(a++) => {}', Context.Empty],
    ['(a++, b) => {}', Context.Empty],
    ['(a, b++) => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['(a, foo ? bar : baz) => {}', Context.Empty],
    ['(foo ? bar : baz, a) => {}', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ["(a['b'], c) => {}", Context.Empty],
    ["(c, a['b']) => {}", Context.Empty],
    ['(...a = b) => b', Context.Empty],
    ['(...rest - a) => b', Context.Empty],
    ['(a, ...b - 10) => b', Context.Empty],
    ['let x = {y=z} => d', Context.Empty],
    ['let x = {y=z}', Context.Empty],
    ['(..a, ...b) => c', Context.Empty],
    ['([0])=>0;', Context.Empty],
    ['({0})=>0;', Context.Empty],
    ['({a:b[0]}) => x', Context.Empty],
    ['f = ([...[x], y] = [1, 2, 3]) => {};', Context.Empty],
    ['f = ([...[ x ] = []] = []) => {};', Context.Empty],
    ['f = ([...{ x }, y]) => {};', Context.Empty],
    ['f = ([...{ x }, y]) => {};', Context.Empty],
    ['1 + ()', Context.Empty],
    ['((x)) => a', Context.Empty],
    ['(x, (y, z)) => a', Context.Empty],
    ['((x, y), z) =>  a', Context.Empty],
    ['f = ([...{ x } = []]) => {};', Context.Empty],
    ['((x, y)) => 0', Context.Empty],
    ['(x, (y)) => 0', Context.Empty],
    ['(localVar |= defaultValue) => {}', Context.Empty],
    ['([{x: y.z}]) => b', Context.Empty],
    ['([{x: y.z}] = a) => b', Context.Empty],
    ['([{x: y.z} = a]) => b', Context.Empty],
    ['({x: y.z} = a) => b', Context.Empty],
    ['([{x: y.z}]) => b', Context.Empty],
    ['([{x: y.z}] = a) => b', Context.Empty],
    ['([{"foo": y.z} = a]) => b', Context.Empty],
    ['({"foo": y.z} = a) => b', Context.Empty],
    ['([{"foo": y.z}]) => b', Context.Empty],
    ['([{"foo": y.z}] = a) => b', Context.Empty],
    ['([{1: y.z} = a]) => b', Context.Empty],
    ['({333: y.z} = a) => b', Context.Empty],
    ['(a\n=> a)(1)', Context.Empty],
    ['(a/*\n*/=> a)(1)', Context.Empty],
    ['((a)\n=> a)(1)', Context.Empty],
    ['((a)/*\n*/=> a)(1)', Context.Empty],
    ['((a, b)\n=> a + b)(1, 2)', Context.Empty],
    ['((a, b)/*\n*/=> a + b)(1, 2)', Context.Empty],
    ['(function *g(z = ( [x]=f(yield) ) => {}) { });', Context.Empty],
    ['(function *g(z = ( {x}=yield ) => {}) { });', Context.Empty],
    ['(function *g(z = ( [x]=yield ) => {}) { });', Context.Empty],
    ['(function *g(z = ( [x=yield] ) => {}) { });', Context.Empty],
    ['(function *g(z = ( x=yield ) => {}) { });', Context.Empty],
    ['(function *g(z = ( x, y=yield ) => {}) { });', Context.Empty],
    ['(function *g(z = ( {x=(yield)} ) => {}) { });', Context.Empty],
    ['(function *g(z = ( [x=(yield)] ) => {}) { });', Context.Empty],
    ['(function *g(z = ( [x=f(yield)] ) => {}) { });', Context.Empty],
    ['=> 0', Context.Empty],
    ['=>', Context.Empty],
    ['() =>', Context.Empty],
    ['=> {}', Context.Empty],
    [') => {}', Context.Empty],
    [', => {}', Context.Empty],
    ['(,) => {}', Context.Empty],
    ['return => {}', Context.Empty],
    ["() => {'value': 42}", Context.Empty],
    ['if => {}', Context.Empty],
    ['(if) => {}', Context.Empty],
    ['(a, if) => {}', Context.Empty],
    ['a + b => {}', Context.Empty],
    ['(a + b) => {}', Context.Empty],
    [')', Context.Empty],
    [') => 0', Context.Empty],
    ['foo[()]', Context.Empty],
    ['(-a) => {}', Context.Empty],
    ['(-a, b) => {}', Context.Empty],
    ['(a, -b) => {}', Context.Empty],
    ['(a + b, c) => {}', Context.Empty],
    ['(a, b - c) => {}', Context.Empty],
    ['"a" => {}', Context.Empty],
    ['("a") => {}', Context.Empty],
    ['("a", b) => {}', Context.Empty],
    ['(a, "b") => {}', Context.Empty],
    ['-a => {}', Context.Empty],
    ['{} => {}', Context.Empty],
    ['a++ => {}', Context.Empty],
    ['(a++) => {}', Context.Empty],
    ['(a++, b) => {}', Context.Empty],
    ['(a, b++) => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['()', Context.Empty],
    ['(()) => 0', Context.Empty],
    ['((x)) => 0', Context.Empty],
    ['((x, y)) => 0', Context.Empty],
    ['(x, (y)) => 0', Context.Empty],
    ['((x, y, z)) => 0', Context.Empty],
    ['(x, (y, z)) => 0', Context.Empty],
    ['((x, y), z) => 0', Context.Empty],
    ['32 => {}', Context.Empty],
    ['(32) => {}', Context.Empty],
    ['(a, 32) => {}', Context.Empty],
    ['if => {}', Context.Empty],
    ['[] => {}', Context.Empty],
    ['(foo ? bar : baz) => {}', Context.Empty],
    ['(a, foo ? bar : baz) => {}', Context.Empty],
    ['(foo ? bar : baz, a) => {}', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ['foo(x = x ==> x)', Context.Empty],
    ['foo(foo => x => x => {x} => x)', Context.Empty],
    ['foo({x} = 20 => x)', Context.Empty],
    ['foo([x] = 20 => x)', Context.Empty],
    ['foo([x = 25] = 20 => x)', Context.Empty],
    ['foo(([x = 25]) =>)', Context.Empty],
    ['foo(([x = 25]) => x =>)', Context.Empty],
    ['foo(([x = 25]) => x => x =>)', Context.Empty],
    ['foo(([x = 25]) => x => x => {)', Context.Empty],
    ['foo(x ==> x)', Context.Empty],
    ['foo(x = x ==> x)', Context.Empty],
    ['var x = {x} = 20 => x;', Context.Empty],
    ['var x = [x] = 20 => x;', Context.Empty],
    ['var x = [x = 25] = 20 => x;', Context.Empty],
    ['var x = ([x = 25]) =>;', Context.Empty],
    ['var x = ([x = 25]) => x =>;', Context.Empty],
    ['var x = ([x = 25]) => x => x =>;', Context.Empty],
    ['var x = ([x = 25]) => x => x => {;', Context.Empty],
    ['var f = cond ? x=>{x.foo } => : x=>x + x + x + x + x + x + x', Context.Empty],
    ['var f = cond ? x=>{x.foo :} : x=>x + x + x + x + x + x + x', Context.Empty],
    ['var f = cond ? x=>x.foo : : x=>x + x + x + x + x + x + x', Context.Empty],
    ['var f = cond ? x=>x.foo; : x=>x + x + x + x + x + x + x', Context.Empty],
    ['let x = (a)\n=>a;', Context.Empty],
    ['(...rest - a) => b', Context.Empty],
    ['(a, ...b - 10) => b', Context.Empty],
    ['()=>{}++', Context.Empty],
    ['()=>{}--', Context.Empty],
    ['()=>{}\n++x', Context.Empty],
    ['()=>{}\n--x', Context.Empty],
    ['(a.b, c) => {}', Context.Empty],
    ["(a['b'], c) => {}", Context.Empty],
    ["(c, a['b']) => {}", Context.Empty],
    ['(...a = b) => b', Context.Empty],
    ['({ ...[x] }) => {}', Context.Empty]
  ]) {
    it(source as string, () => {
      t.throws(() => {
        parseScript(source as string, {
          disableWebCompat: ((ctx as any) & Context.OptionsDisableWebCompat) !== 0,
          impliedStrict: ((ctx as any) & Context.Strict) !== 0,
          module: ((ctx as any) & Context.Module) !== 0
        });
      });
    });
  }

  for (const [source, ctx, expected] of [
    [
      `({})=>0`,
      Context.OptionsNext | Context.OptionsLoc,
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
              },
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [],
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
              async: false,
              expression: true,
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
      `foo = (eval) => eval`,
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
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'Identifier',
                  name: 'eval',
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
                params: [
                  {
                    type: 'Identifier',
                    name: 'eval',
                    start: 7,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  }
                ],
                async: false,
                expression: true,
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
      `af = eval => eval`,
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
                name: 'af',
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
              operator: '=',
              right: {
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [
                  {
                    type: 'Identifier',
                    name: 'eval',
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
                async: false,
                expression: true,
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
      `af = (...x) => { return x.length; }`,
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
                name: 'af',
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
              operator: '=',
              right: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: [
                    {
                      type: 'ReturnStatement',
                      argument: {
                        type: 'MemberExpression',
                        object: {
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
                        computed: false,
                        property: {
                          type: 'Identifier',
                          name: 'length',
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
                        },
                        optional: false,
                        shortCircuited: false,
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
                      start: 17,
                      end: 33,
                      loc: {
                        start: {
                          line: 1,
                          column: 17
                        },
                        end: {
                          line: 1,
                          column: 33
                        }
                      }
                    }
                  ],
                  start: 15,
                  end: 35,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 35
                    }
                  }
                },
                params: [
                  {
                    type: 'RestElement',
                    argument: {
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
                async: false,
                expression: false,
                start: 5,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 5
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
      `(() => 1)(), 1`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Literal',
                      value: 1,
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
                    params: [],
                    async: false,
                    expression: true,
                    start: 1,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  },
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
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
      `(a => a + 1)(1), 2`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'Literal',
                        value: 1,
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
                      operator: '+',
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
                    params: [
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
                      }
                    ],
                    async: false,
                    expression: true,
                    start: 1,
                    end: 11,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 11
                      }
                    }
                  },
                  arguments: [
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
                    }
                  ],
                  optional: false,
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
                {
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
      `(a => { return a + 3; })(1), 4`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'BinaryExpression',
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
                            },
                            operator: '+',
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
                          start: 8,
                          end: 21,
                          loc: {
                            start: {
                              line: 1,
                              column: 8
                            },
                            end: {
                              line: 1,
                              column: 21
                            }
                          }
                        }
                      ],
                      start: 6,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 6
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    },
                    params: [
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
                      }
                    ],
                    async: false,
                    expression: false,
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
                  arguments: [
                    {
                      type: 'Literal',
                      value: 1,
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
                  optional: false,
                  shortCircuited: false,
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
                {
                  type: 'Literal',
                  value: 4,
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
      `() => f1({x: 1})`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'f1',
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
                arguments: [
                  {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        value: {
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
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: false,
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
                optional: false,
                shortCircuited: false,
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
              params: [],
              async: false,
              expression: true,
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
      `() => f10({x: 6}, 2)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: 'f10',
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
                arguments: [
                  {
                    type: 'ObjectExpression',
                    properties: [
                      {
                        type: 'Property',
                        key: {
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
                        value: {
                          type: 'Literal',
                          value: 6,
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
                        shorthand: false,
                        start: 11,
                        end: 15,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
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
                  },
                  {
                    type: 'Literal',
                    value: 2,
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
                optional: false,
                shortCircuited: false,
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
              params: [],
              async: false,
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
      `foo(({x}, [y], z) => x)`,
      Context.OptionsNext | Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
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
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
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
                    },
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'y',
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
                  async: false,
                  expression: true,
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
              optional: false,
              shortCircuited: false,
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
      `foo(foo => x => (x = 20) => (x = 20) => x)`,
      Context.OptionsNext | Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'ArrowFunctionExpression',
                        body: {
                          type: 'Identifier',
                          name: 'x',
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
                        params: [
                          {
                            type: 'AssignmentPattern',
                            left: {
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
                            right: {
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
                            start: 29,
                            end: 35,
                            loc: {
                              start: {
                                line: 1,
                                column: 29
                              },
                              end: {
                                line: 1,
                                column: 35
                              }
                            }
                          }
                        ],
                        async: false,
                        expression: true,
                        start: 28,
                        end: 41,
                        loc: {
                          start: {
                            line: 1,
                            column: 28
                          },
                          end: {
                            line: 1,
                            column: 41
                          }
                        }
                      },
                      params: [
                        {
                          type: 'AssignmentPattern',
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
                        }
                      ],
                      async: false,
                      expression: true,
                      start: 16,
                      end: 41,
                      loc: {
                        start: {
                          line: 1,
                          column: 16
                        },
                        end: {
                          line: 1,
                          column: 41
                        }
                      }
                    },
                    params: [
                      {
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
                      }
                    ],
                    async: false,
                    expression: true,
                    start: 11,
                    end: 41,
                    loc: {
                      start: {
                        line: 1,
                        column: 11
                      },
                      end: {
                        line: 1,
                        column: 41
                      }
                    }
                  },
                  params: [
                    {
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
                    }
                  ],
                  async: false,
                  expression: true,
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
              optional: false,
              shortCircuited: false,
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
            },
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
      `((a, b) => { return a + b; })(1, 5), 6`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
                      body: [
                        {
                          type: 'ReturnStatement',
                          argument: {
                            type: 'BinaryExpression',
                            left: {
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
                            right: {
                              type: 'Identifier',
                              name: 'b',
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
                            operator: '+',
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
                          start: 13,
                          end: 26,
                          loc: {
                            start: {
                              line: 1,
                              column: 13
                            },
                            end: {
                              line: 1,
                              column: 26
                            }
                          }
                        }
                      ],
                      start: 11,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 11
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    params: [
                      {
                        type: 'Identifier',
                        name: 'a',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      {
                        type: 'Identifier',
                        name: 'b',
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
                    async: false,
                    expression: false,
                    start: 1,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  },
                  arguments: [
                    {
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
                    {
                      type: 'Literal',
                      value: 5,
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
                  optional: false,
                  shortCircuited: false,
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
                  type: 'Literal',
                  value: 6,
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
      `(x = 9, y) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'Identifier',
                    name: 'x',
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
                  right: {
                    type: 'Literal',
                    value: 9,
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
                  start: 1,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `(x, y = 9, z) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 9,
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
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `(x, y = 9, z = 8) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 9,
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
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 8,
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
                  start: 11,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `(a = b, c) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Identifier',
                    name: 'b',
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
                  start: 1,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `([]) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
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
                  type: 'ArrayPattern',
                  elements: [],
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
              async: false,
              expression: false,
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
      `(a, b) => 0, (c, d) => 1`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
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
                    }
                  ],
                  async: false,
                  expression: true,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 1,
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'c',
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
                    {
                      type: 'Identifier',
                      name: 'd',
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
                  async: false,
                  expression: true,
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
      `(a, b, (c, d) => 0)`,
      Context.OptionsNext | Context.OptionsLoc,
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
                {
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
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
                    {
                      type: 'Identifier',
                      name: 'd',
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
                  async: false,
                  expression: true,
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
              start: 1,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 18
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
      `(a, b => {}, a => a + 1)`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  params: [
                    {
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
                    }
                  ],
                  async: false,
                  expression: false,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
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
                    operator: '+',
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
                  params: [
                    {
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
                    }
                  ],
                  async: false,
                  expression: true,
                  start: 13,
                  end: 23,
                  loc: {
                    start: {
                      line: 1,
                      column: 13
                    },
                    end: {
                      line: 1,
                      column: 23
                    }
                  }
                }
              ],
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
      `let Y = F => (x=>F(y=>(x(x))(y)))(x=>F(y=>(x(x))(y)))`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'CallExpression',
                    callee: {
                      type: 'ArrowFunctionExpression',
                      body: {
                        type: 'CallExpression',
                        callee: {
                          type: 'Identifier',
                          name: 'F',
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
                        arguments: [
                          {
                            type: 'ArrowFunctionExpression',
                            body: {
                              type: 'CallExpression',
                              callee: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'x',
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
                                arguments: [
                                  {
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
                                  }
                                ],
                                optional: false,
                                shortCircuited: false,
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
                              arguments: [
                                {
                                  type: 'Identifier',
                                  name: 'y',
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
                              optional: false,
                              shortCircuited: false,
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
                            params: [
                              {
                                type: 'Identifier',
                                name: 'y',
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
                            async: false,
                            expression: true,
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
                          }
                        ],
                        optional: false,
                        shortCircuited: false,
                        start: 17,
                        end: 32,
                        loc: {
                          start: {
                            line: 1,
                            column: 17
                          },
                          end: {
                            line: 1,
                            column: 32
                          }
                        }
                      },
                      params: [
                        {
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
                        }
                      ],
                      async: false,
                      expression: true,
                      start: 14,
                      end: 32,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 32
                        }
                      }
                    },
                    arguments: [
                      {
                        type: 'ArrowFunctionExpression',
                        body: {
                          type: 'CallExpression',
                          callee: {
                            type: 'Identifier',
                            name: 'F',
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
                          arguments: [
                            {
                              type: 'ArrowFunctionExpression',
                              body: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'CallExpression',
                                  callee: {
                                    type: 'Identifier',
                                    name: 'x',
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
                                  },
                                  arguments: [
                                    {
                                      type: 'Identifier',
                                      name: 'x',
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
                                    }
                                  ],
                                  optional: false,
                                  shortCircuited: false,
                                  start: 43,
                                  end: 47,
                                  loc: {
                                    start: {
                                      line: 1,
                                      column: 43
                                    },
                                    end: {
                                      line: 1,
                                      column: 47
                                    }
                                  }
                                },
                                arguments: [
                                  {
                                    type: 'Identifier',
                                    name: 'y',
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
                                optional: false,
                                shortCircuited: false,
                                start: 42,
                                end: 51,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 42
                                  },
                                  end: {
                                    line: 1,
                                    column: 51
                                  }
                                }
                              },
                              params: [
                                {
                                  type: 'Identifier',
                                  name: 'y',
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
                                }
                              ],
                              async: false,
                              expression: true,
                              start: 39,
                              end: 51,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 39
                                },
                                end: {
                                  line: 1,
                                  column: 51
                                }
                              }
                            }
                          ],
                          optional: false,
                          shortCircuited: false,
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
                        },
                        params: [
                          {
                            type: 'Identifier',
                            name: 'x',
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
                          }
                        ],
                        async: false,
                        expression: true,
                        start: 34,
                        end: 52,
                        loc: {
                          start: {
                            line: 1,
                            column: 34
                          },
                          end: {
                            line: 1,
                            column: 52
                          }
                        }
                      }
                    ],
                    optional: false,
                    shortCircuited: false,
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
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'F',
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
                  async: false,
                  expression: true,
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
                id: {
                  type: 'Identifier',
                  name: 'Y',
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
                end: 53,
                loc: {
                  start: {
                    line: 1,
                    column: 4
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
      `([y]) => ([y]) => x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [
                  {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'y',
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
                  }
                ],
                async: false,
                expression: true,
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
              },
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'y',
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `(() => { try { Function("0 || () => 2")(); } catch(e) { return true; } })();`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
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
                      type: 'TryStatement',
                      block: {
                        type: 'BlockStatement',
                        body: [
                          {
                            type: 'ExpressionStatement',
                            expression: {
                              type: 'CallExpression',
                              callee: {
                                type: 'CallExpression',
                                callee: {
                                  type: 'Identifier',
                                  name: 'Function',
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
                                },
                                arguments: [
                                  {
                                    type: 'Literal',
                                    value: '0 || () => 2',
                                    start: 24,
                                    end: 38,
                                    loc: {
                                      start: {
                                        line: 1,
                                        column: 24
                                      },
                                      end: {
                                        line: 1,
                                        column: 38
                                      }
                                    }
                                  }
                                ],
                                optional: false,
                                shortCircuited: false,
                                start: 15,
                                end: 39,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 15
                                  },
                                  end: {
                                    line: 1,
                                    column: 39
                                  }
                                }
                              },
                              arguments: [],
                              optional: false,
                              shortCircuited: false,
                              start: 15,
                              end: 41,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 15
                                },
                                end: {
                                  line: 1,
                                  column: 41
                                }
                              }
                            },
                            start: 15,
                            end: 42,
                            loc: {
                              start: {
                                line: 1,
                                column: 15
                              },
                              end: {
                                line: 1,
                                column: 42
                              }
                            }
                          }
                        ],
                        start: 13,
                        end: 44,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
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
                          type: 'Identifier',
                          name: 'e',
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
                          }
                        },
                        body: {
                          type: 'BlockStatement',
                          body: [
                            {
                              type: 'ReturnStatement',
                              argument: {
                                type: 'Literal',
                                value: true,
                                start: 63,
                                end: 67,
                                loc: {
                                  start: {
                                    line: 1,
                                    column: 63
                                  },
                                  end: {
                                    line: 1,
                                    column: 67
                                  }
                                }
                              },
                              start: 56,
                              end: 68,
                              loc: {
                                start: {
                                  line: 1,
                                  column: 56
                                },
                                end: {
                                  line: 1,
                                  column: 68
                                }
                              }
                            }
                          ],
                          start: 54,
                          end: 70,
                          loc: {
                            start: {
                              line: 1,
                              column: 54
                            },
                            end: {
                              line: 1,
                              column: 70
                            }
                          }
                        },
                        start: 45,
                        end: 70,
                        loc: {
                          start: {
                            line: 1,
                            column: 45
                          },
                          end: {
                            line: 1,
                            column: 70
                          }
                        }
                      },
                      finalizer: null,
                      start: 9,
                      end: 70,
                      loc: {
                        start: {
                          line: 1,
                          column: 9
                        },
                        end: {
                          line: 1,
                          column: 70
                        }
                      }
                    }
                  ],
                  start: 7,
                  end: 72,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 72
                    }
                  }
                },
                params: [],
                async: false,
                expression: false,
                start: 1,
                end: 72,
                loc: {
                  start: {
                    line: 1,
                    column: 1
                  },
                  end: {
                    line: 1,
                    column: 72
                  }
                }
              },
              arguments: [],
              optional: false,
              shortCircuited: false,
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
      `(() => 5)() === 5 ? a : b;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'BinaryExpression',
                left: {
                  type: 'CallExpression',
                  callee: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Literal',
                      value: 5,
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
                    params: [],
                    async: false,
                    expression: true,
                    start: 1,
                    end: 8,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 8
                      }
                    }
                  },
                  arguments: [],
                  optional: false,
                  shortCircuited: false,
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
                right: {
                  type: 'Literal',
                  value: 5,
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
                operator: '===',
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
              consequent: {
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
              alternate: {
                type: 'Identifier',
                name: 'b',
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
      `(x, ...[y = b = c = d]) => 1`,
      Context.OptionsNext | Context.OptionsLoc,
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'RestElement',
                  argument: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'AssignmentExpression',
                          left: {
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
                          },
                          operator: '=',
                          right: {
                            type: 'AssignmentExpression',
                            left: {
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
                            operator: '=',
                            right: {
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
                          },
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
                        start: 8,
                        end: 21,
                        loc: {
                          start: {
                            line: 1,
                            column: 8
                          },
                          end: {
                            line: 1,
                            column: 21
                          }
                        }
                      }
                    ],
                    start: 7,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 22
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
              async: false,
              expression: true,
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
      `(a,b,...c) => 0 + 1`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 0,
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
                operator: '+',
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
              params: [
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
                  type: 'Identifier',
                  name: 'b',
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
                  type: 'RestElement',
                  argument: {
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
              async: false,
              expression: true,
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
      `([x = 0]) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'Identifier',
                        name: 'x',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      right: {
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
                      },
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
                  start: 1,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `(yield) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'yield',
                  start: 1,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `(interface) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'interface',
                  start: 1,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `(eval, bar) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'eval',
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
                {
                  type: 'Identifier',
                  name: 'bar',
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
              async: false,
              expression: false,
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
      `(bar, arguments) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'bar',
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
                {
                  type: 'Identifier',
                  name: 'arguments',
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
              async: false,
              expression: false,
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
      `([a, b], ...c) => 42`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a',
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    },
                    {
                      type: 'Identifier',
                      name: 'b',
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
                  start: 1,
                  end: 7,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 7
                    }
                  }
                },
                {
                  type: 'RestElement',
                  argument: {
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
              async: false,
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
      `foo((a=1) => 42)`,
      Context.OptionsNext | Context.OptionsLoc,
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
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 42,
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
                  params: [
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
                  async: false,
                  expression: true,
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
              optional: false,
              shortCircuited: false,
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
      `([a,[b],...c])=>0`,
      Context.OptionsNext | Context.OptionsLoc,
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
                value: 0,
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'a',
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    },
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'b',
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
                    {
                      type: 'RestElement',
                      argument: {
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
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `(x, y) => (u, v) => x*u + y*v`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BinaryExpression',
                  left: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    right: {
                      type: 'Identifier',
                      name: 'u',
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
                    operator: '*',
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
                  right: {
                    type: 'BinaryExpression',
                    left: {
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
                    right: {
                      type: 'Identifier',
                      name: 'v',
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
                    operator: '*',
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
                  operator: '+',
                  start: 20,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'u',
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
                    type: 'Identifier',
                    name: 'v',
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
                async: false,
                expression: true,
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: true,
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
      `(a = b, c) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Identifier',
                    name: 'b',
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
                  start: 1,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                },
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `e => "test";`,
      Context.OptionsNext | Context.OptionsLoc,
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
                value: 'test',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'e',
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
              async: false,
              expression: true,
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
      `(x) => ((y, z) => (x, y, z));`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'SequenceExpression',
                  expressions: [
                    {
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
                    {
                      type: 'Identifier',
                      name: 'y',
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
                },
                params: [
                  {
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
                  {
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
                  }
                ],
                async: false,
                expression: true,
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: true,
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
      `(a, b=(c)=>{}) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'BlockStatement',
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
                    params: [
                      {
                        type: 'Identifier',
                        name: 'c',
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
                    async: false,
                    expression: false,
                    start: 6,
                    end: 13,
                    loc: {
                      start: {
                        line: 1,
                        column: 6
                      },
                      end: {
                        line: 1,
                        column: 13
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
              async: false,
              expression: false,
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
      `1 ? 0 : a => {}, 17, 42;`,
      Context.OptionsNext | Context.OptionsLoc,
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
                  type: 'ConditionalExpression',
                  test: {
                    type: 'Literal',
                    value: 1,
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
                  consequent: {
                    type: 'Literal',
                    value: 0,
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
                  alternate: {
                    type: 'ArrowFunctionExpression',
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
                    params: [
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
                    async: false,
                    expression: false,
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
                  type: 'Literal',
                  value: 17,
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
                {
                  type: 'Literal',
                  value: 42,
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
      `({x = 10, y: { z = 10 }}) => [x, z]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrayExpression',
                elements: [
                  {
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
                  {
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
                  }
                ],
                start: 29,
                end: 35,
                loc: {
                  start: {
                    line: 1,
                    column: 29
                  },
                  end: {
                    line: 1,
                    column: 35
                  }
                }
              },
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'x',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      value: {
                        type: 'AssignmentPattern',
                        left: {
                          type: 'Identifier',
                          name: 'x',
                          start: 2,
                          end: 3,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 3
                            }
                          }
                        },
                        right: {
                          type: 'Literal',
                          value: 10,
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
                        start: 2,
                        end: 8,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
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
                      start: 2,
                      end: 8,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
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
                        name: 'y',
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
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
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
                            },
                            value: {
                              type: 'AssignmentPattern',
                              left: {
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
                              },
                              right: {
                                type: 'Literal',
                                value: 10,
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
                            },
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                        end: 23,
                        loc: {
                          start: {
                            line: 1,
                            column: 13
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
                      start: 10,
                      end: 23,
                      loc: {
                        start: {
                          line: 1,
                          column: 10
                        },
                        end: {
                          line: 1,
                          column: 23
                        }
                      }
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `({y}) => x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'y',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 'y',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `({a} = {}) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
                          start: 2,
                          end: 3,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 3
                            }
                          }
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a',
                          start: 2,
                          end: 3,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 3
                            }
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      }
                    ],
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
                  right: {
                    type: 'ObjectExpression',
                    properties: [],
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
                }
              ],
              async: false,
              expression: false,
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
      `(a, b, (c, d) => 0)`,
      Context.OptionsNext | Context.OptionsLoc,
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
                {
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
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
                    {
                      type: 'Identifier',
                      name: 'd',
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
                  async: false,
                  expression: true,
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
              start: 1,
              end: 18,
              loc: {
                start: {
                  line: 1,
                  column: 1
                },
                end: {
                  line: 1,
                  column: 18
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
      `(() => 5)() === 5;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'BinaryExpression',
              left: {
                type: 'CallExpression',
                callee: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 5,
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
                  params: [],
                  async: false,
                  expression: true,
                  start: 1,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                },
                arguments: [],
                optional: false,
                shortCircuited: false,
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
              right: {
                type: 'Literal',
                value: 5,
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
              operator: '===',
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
      `(x, y = 9, {b}, z = 8, ...a) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 9,
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
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
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
                      },
                      value: {
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
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 8,
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
                },
                {
                  type: 'RestElement',
                  argument: {
                    type: 'Identifier',
                    name: 'a',
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
              async: false,
              expression: false,
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
      `bar ? ( (...a) => {} ) : baz;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'bar',
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
              consequent: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BlockStatement',
                  body: [],
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
                    type: 'RestElement',
                    argument: {
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
                async: false,
                expression: false,
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
              },
              alternate: {
                type: 'Identifier',
                name: 'baz',
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
      `bar ? ( (x, y) => (u, v) => x*u + y*v ) : baz;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'bar',
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
              consequent: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'BinaryExpression',
                      left: {
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
                      right: {
                        type: 'Identifier',
                        name: 'u',
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
                      operator: '*',
                      start: 28,
                      end: 31,
                      loc: {
                        start: {
                          line: 1,
                          column: 28
                        },
                        end: {
                          line: 1,
                          column: 31
                        }
                      }
                    },
                    right: {
                      type: 'BinaryExpression',
                      left: {
                        type: 'Identifier',
                        name: 'y',
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
                      right: {
                        type: 'Identifier',
                        name: 'v',
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
                      operator: '*',
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
                    operator: '+',
                    start: 28,
                    end: 37,
                    loc: {
                      start: {
                        line: 1,
                        column: 28
                      },
                      end: {
                        line: 1,
                        column: 37
                      }
                    }
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'u',
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
                      name: 'v',
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
                  async: false,
                  expression: true,
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
                },
                params: [
                  {
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
                  {
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
                  }
                ],
                async: false,
                expression: true,
                start: 8,
                end: 37,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 37
                  }
                }
              },
              alternate: {
                type: 'Identifier',
                name: 'baz',
                start: 42,
                end: 45,
                loc: {
                  start: {
                    line: 1,
                    column: 42
                  },
                  end: {
                    line: 1,
                    column: 45
                  }
                }
              },
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
      `bar ? ( (a, b) => 0, (c, d) => 1 ) : baz;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'bar',
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
              consequent: {
                type: 'SequenceExpression',
                expressions: [
                  {
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Literal',
                      value: 0,
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
                    params: [
                      {
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
                    async: false,
                    expression: true,
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
                    type: 'ArrowFunctionExpression',
                    body: {
                      type: 'Literal',
                      value: 1,
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
                    params: [
                      {
                        type: 'Identifier',
                        name: 'c',
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
                        name: 'd',
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
                    async: false,
                    expression: true,
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
                  }
                ],
                start: 8,
                end: 32,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 32
                  }
                }
              },
              alternate: {
                type: 'Identifier',
                name: 'baz',
                start: 37,
                end: 40,
                loc: {
                  start: {
                    line: 1,
                    column: 37
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
      `bar ? ( foo ? bar : baz => {} ) : baz;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'Identifier',
                name: 'bar',
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
              consequent: {
                type: 'ConditionalExpression',
                test: {
                  type: 'Identifier',
                  name: 'foo',
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
                consequent: {
                  type: 'Identifier',
                  name: 'bar',
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
                alternate: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [],
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'baz',
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
                  async: false,
                  expression: false,
                  start: 20,
                  end: 29,
                  loc: {
                    start: {
                      line: 1,
                      column: 20
                    },
                    end: {
                      line: 1,
                      column: 29
                    }
                  }
                },
                start: 8,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 8
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              alternate: {
                type: 'Identifier',
                name: 'baz',
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
      `({a,b=b,a:c,[a]:[d]})=>0;`,
      Context.OptionsNext | Context.OptionsLoc,
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
                value: 0,
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'a',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      value: {
                        type: 'Identifier',
                        name: 'a',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    },
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'AssignmentPattern',
                        left: {
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
                        right: {
                          type: 'Identifier',
                          name: 'b',
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: true,
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
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'Identifier',
                        name: 'c',
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
                      computed: false,
                      method: false,
                      shorthand: false,
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
                    {
                      type: 'Property',
                      key: {
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
                      value: {
                        type: 'ArrayPattern',
                        elements: [
                          {
                            type: 'Identifier',
                            name: 'd',
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
                      kind: 'init',
                      computed: true,
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
                }
              ],
              async: false,
              expression: true,
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
      `(() => {}) || true;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'LogicalExpression',
              left: {
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [],
                async: false,
                expression: false,
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
              right: {
                type: 'Literal',
                value: true,
                start: 14,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 14
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              operator: '||',
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
      `(() => {}) ? a : b;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ConditionalExpression',
              test: {
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [],
                async: false,
                expression: false,
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
              consequent: {
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
              alternate: {
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
      `([,,])=>0`,
      Context.OptionsNext | Context.OptionsLoc,
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [null, null],
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
                }
              ],
              async: false,
              expression: true,
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
      `function foo() { }; foo(() => "abc"); foo(() => "abc", 123);`,
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
              body: [],
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
            async: false,
            generator: false,
            id: {
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
          {
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
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo',
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
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 'abc',
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
                }
              ],
              optional: false,
              shortCircuited: false,
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
            },
            start: 20,
            end: 37,
            loc: {
              start: {
                line: 1,
                column: 20
              },
              end: {
                line: 1,
                column: 37
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'foo',
                start: 38,
                end: 41,
                loc: {
                  start: {
                    line: 1,
                    column: 38
                  },
                  end: {
                    line: 1,
                    column: 41
                  }
                }
              },
              arguments: [
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 'abc',
                    start: 48,
                    end: 53,
                    loc: {
                      start: {
                        line: 1,
                        column: 48
                      },
                      end: {
                        line: 1,
                        column: 53
                      }
                    }
                  },
                  params: [],
                  async: false,
                  expression: true,
                  start: 42,
                  end: 53,
                  loc: {
                    start: {
                      line: 1,
                      column: 42
                    },
                    end: {
                      line: 1,
                      column: 53
                    }
                  }
                },
                {
                  type: 'Literal',
                  value: 123,
                  start: 55,
                  end: 58,
                  loc: {
                    start: {
                      line: 1,
                      column: 55
                    },
                    end: {
                      line: 1,
                      column: 58
                    }
                  }
                }
              ],
              optional: false,
              shortCircuited: false,
              start: 38,
              end: 59,
              loc: {
                start: {
                  line: 1,
                  column: 38
                },
                end: {
                  line: 1,
                  column: 59
                }
              }
            },
            start: 38,
            end: 60,
            loc: {
              start: {
                line: 1,
                column: 38
              },
              end: {
                line: 1,
                column: 60
              }
            }
          }
        ],
        start: 0,
        end: 60,
        loc: {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: 1,
            column: 60
          }
        }
      }
    ],
    [
      `({})[x => x]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'MemberExpression',
              object: {
                type: 'ObjectExpression',
                properties: [],
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
              computed: true,
              property: {
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [
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
                  }
                ],
                async: false,
                expression: true,
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
      `() => x => (a, b, c) => 0`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'Literal',
                    value: 0,
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
                  params: [
                    {
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
                  async: false,
                  expression: true,
                  start: 11,
                  end: 25,
                  loc: {
                    start: {
                      line: 1,
                      column: 11
                    },
                    end: {
                      line: 1,
                      column: 25
                    }
                  }
                },
                params: [
                  {
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
                  }
                ],
                async: false,
                expression: true,
                start: 6,
                end: 25,
                loc: {
                  start: {
                    line: 1,
                    column: 6
                  },
                  end: {
                    line: 1,
                    column: 25
                  }
                }
              },
              params: [],
              async: false,
              expression: true,
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
      `(a = 1) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
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
                  right: {
                    type: 'Literal',
                    value: 1,
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
                  start: 1,
                  end: 6,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 6
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `async (eval) => "use strict";`,
      Context.OptionsNext | Context.OptionsLoc,
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
                value: 'use strict',
                start: 16,
                end: 28,
                loc: {
                  start: {
                    line: 1,
                    column: 16
                  },
                  end: {
                    line: 1,
                    column: 28
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'eval',
                  start: 7,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 7
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                }
              ],
              async: true,
              expression: true,
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
      `([x, y] = z) => x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ArrayPattern',
                    elements: [
                      {
                        type: 'Identifier',
                        name: 'x',
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      },
                      {
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
                      }
                    ],
                    start: 1,
                    end: 7,
                    loc: {
                      start: {
                        line: 1,
                        column: 1
                      },
                      end: {
                        line: 1,
                        column: 7
                      }
                    }
                  },
                  right: {
                    type: 'Identifier',
                    name: 'z',
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
                  start: 1,
                  end: 11,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 11
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `([x, ...y]) => x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'Identifier',
                      name: 'x',
                      start: 2,
                      end: 3,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 3
                        }
                      }
                    },
                    {
                      type: 'RestElement',
                      argument: {
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
                  start: 1,
                  end: 10,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 10
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `([[x, y] = z]) => x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ArrayPattern',
                  elements: [
                    {
                      type: 'AssignmentPattern',
                      left: {
                        type: 'ArrayPattern',
                        elements: [
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
                          },
                          {
                            type: 'Identifier',
                            name: 'y',
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
                        end: 8,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 8
                          }
                        }
                      },
                      right: {
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
                      start: 2,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      }
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `() => { let {} = y }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
                        id: {
                          type: 'ObjectPattern',
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
              },
              params: [],
              async: false,
              expression: false,
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
      `a = (b) => c;`,
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
                type: 'ArrowFunctionExpression',
                body: {
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
                params: [
                  {
                    type: 'Identifier',
                    name: 'b',
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
                async: false,
                expression: true,
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
      `({ident: {x: y}}) => x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'ident',
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
                      },
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
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
                            computed: false,
                            method: false,
                            shorthand: false,
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
                      },
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 2,
                      end: 15,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 15
                        }
                      }
                    }
                  ],
                  start: 1,
                  end: 16,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 16
                    }
                  }
                }
              ],
              async: false,
              expression: true,
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
      `({ident: {x}}) => x`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
                  type: 'ObjectPattern',
                  properties: [
                    {
                      type: 'Property',
                      key: {
                        type: 'Identifier',
                        name: 'ident',
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
                      },
                      value: {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            key: {
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
                            value: {
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
                            kind: 'init',
                            computed: false,
                            method: false,
                            shorthand: true,
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
                          }
                        ],
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
                      kind: 'init',
                      computed: false,
                      method: false,
                      shorthand: false,
                      start: 2,
                      end: 12,
                      loc: {
                        start: {
                          line: 1,
                          column: 2
                        },
                        end: {
                          line: 1,
                          column: 12
                        }
                      }
                    }
                  ],
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
                }
              ],
              async: false,
              expression: true,
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
      `({a} = b,) => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'AssignmentPattern',
                  left: {
                    type: 'ObjectPattern',
                    properties: [
                      {
                        type: 'Property',
                        key: {
                          type: 'Identifier',
                          name: 'a',
                          start: 2,
                          end: 3,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 3
                            }
                          }
                        },
                        value: {
                          type: 'Identifier',
                          name: 'a',
                          start: 2,
                          end: 3,
                          loc: {
                            start: {
                              line: 1,
                              column: 2
                            },
                            end: {
                              line: 1,
                              column: 3
                            }
                          }
                        },
                        kind: 'init',
                        computed: false,
                        method: false,
                        shorthand: true,
                        start: 2,
                        end: 3,
                        loc: {
                          start: {
                            line: 1,
                            column: 2
                          },
                          end: {
                            line: 1,
                            column: 3
                          }
                        }
                      }
                    ],
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
                  right: {
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
                  start: 1,
                  end: 8,
                  loc: {
                    start: {
                      line: 1,
                      column: 1
                    },
                    end: {
                      line: 1,
                      column: 8
                    }
                  }
                }
              ],
              async: false,
              expression: false,
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
      `for ( f => ( "key" in {}) ; 0;);`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ForStatement',
            body: {
              type: 'EmptyStatement',
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
            init: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BinaryExpression',
                left: {
                  type: 'Literal',
                  value: 'key',
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
                right: {
                  type: 'ObjectExpression',
                  properties: [],
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
                operator: 'in',
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
              params: [
                {
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
                }
              ],
              async: false,
              expression: true,
              start: 6,
              end: 25,
              loc: {
                start: {
                  line: 1,
                  column: 6
                },
                end: {
                  line: 1,
                  column: 25
                }
              }
            },
            test: {
              type: 'Literal',
              value: 0,
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
            update: null,
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
      `(x, y) => z => z * (x + y)`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'ArrowFunctionExpression',
                body: {
                  type: 'BinaryExpression',
                  left: {
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
                  },
                  right: {
                    type: 'BinaryExpression',
                    left: {
                      type: 'Identifier',
                      name: 'x',
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
                    right: {
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
                    operator: '+',
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
                  operator: '*',
                  start: 15,
                  end: 26,
                  loc: {
                    start: {
                      line: 1,
                      column: 15
                    },
                    end: {
                      line: 1,
                      column: 26
                    }
                  }
                },
                params: [
                  {
                    type: 'Identifier',
                    name: 'z',
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
                  }
                ],
                async: false,
                expression: true,
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: true,
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
      `a, b => 0;`,
      Context.OptionsNext | Context.OptionsLoc,
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
                {
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'Identifier',
                      name: 'b',
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
      `var x = ({x = 30}, [y], z) => x`,
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
                  type: 'ArrowFunctionExpression',
                  body: {
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
                  params: [
                    {
                      type: 'ObjectPattern',
                      properties: [
                        {
                          type: 'Property',
                          key: {
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
                          value: {
                            type: 'AssignmentPattern',
                            left: {
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
                            right: {
                              type: 'Literal',
                              value: 30,
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
                          },
                          kind: 'init',
                          computed: false,
                          method: false,
                          shorthand: true,
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
                    },
                    {
                      type: 'ArrayPattern',
                      elements: [
                        {
                          type: 'Identifier',
                          name: 'y',
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
                    {
                      type: 'Identifier',
                      name: 'z',
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
                  async: false,
                  expression: true,
                  start: 8,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 8
                    },
                    end: {
                      line: 1,
                      column: 31
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
      `let => { function x() {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
                  }
                ],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'let',
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
              async: false,
              expression: false,
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
      `let, let => { function x() {} }`,
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
                  type: 'Identifier',
                  name: 'let',
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
                {
                  type: 'ArrowFunctionExpression',
                  body: {
                    type: 'BlockStatement',
                    body: [
                      {
                        type: 'FunctionDeclaration',
                        params: [],
                        body: {
                          type: 'BlockStatement',
                          body: [],
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
                        async: false,
                        generator: false,
                        id: {
                          type: 'Identifier',
                          name: 'x',
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
                        start: 14,
                        end: 29,
                        loc: {
                          start: {
                            line: 1,
                            column: 14
                          },
                          end: {
                            line: 1,
                            column: 29
                          }
                        }
                      }
                    ],
                    start: 12,
                    end: 31,
                    loc: {
                      start: {
                        line: 1,
                        column: 12
                      },
                      end: {
                        line: 1,
                        column: 31
                      }
                    }
                  },
                  params: [
                    {
                      type: 'Identifier',
                      name: 'let',
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
                  async: false,
                  expression: false,
                  start: 5,
                  end: 31,
                  loc: {
                    start: {
                      line: 1,
                      column: 5
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
      `(x) => { function x() {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
                  }
                ],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: false,
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
      `(x) => { var x; }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: false,
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
      `x => { function x() {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'FunctionDeclaration',
                    params: [],
                    body: {
                      type: 'BlockStatement',
                      body: [],
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
                    async: false,
                    generator: false,
                    id: {
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
                    start: 7,
                    end: 22,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 22
                      }
                    }
                  }
                ],
                start: 5,
                end: 24,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 24
                  }
                }
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
    [
      `g => { try {}  catch (g) {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
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
                    handler: {
                      type: 'CatchClause',
                      param: {
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
                      body: {
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
                    },
                    finalizer: null,
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
                start: 5,
                end: 29,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 29
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              async: false,
              expression: false,
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
      `g => { try {} catch ([g]) {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
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
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'ArrayPattern',
                        elements: [
                          {
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
                          }
                        ],
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
                      start: 14,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    finalizer: null,
                    start: 7,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  }
                ],
                start: 5,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              async: false,
              expression: false,
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
      `() => { let foo; }; foo => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [],
              async: false,
              expression: false,
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
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
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
              async: false,
              expression: false,
              start: 20,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            start: 20,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 20
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
      `async a => let [a]`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'MemberExpression',
                optional: false,
                shortCircuited: false,
                object: {
                  type: 'Identifier',
                  name: 'let',
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
                computed: true,
                property: {
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
                start: 11,
                end: 18,
                loc: {
                  start: {
                    line: 1,
                    column: 11
                  },
                  end: {
                    line: 1,
                    column: 18
                  }
                }
              },
              params: [
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
              async: true,
              expression: true,
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
      `a => { let {b} = a }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
                        id: {
                          type: 'ObjectPattern',
                          properties: [
                            {
                              type: 'Property',
                              key: {
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
                              },
                              value: {
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
                              },
                              kind: 'init',
                              computed: false,
                              method: false,
                              shorthand: true,
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
                        end: 18,
                        loc: {
                          start: {
                            line: 1,
                            column: 11
                          },
                          end: {
                            line: 1,
                            column: 18
                          }
                        }
                      }
                    ],
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
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `a => { for (let a of b) c }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ForOfStatement',
                    body: {
                      type: 'ExpressionStatement',
                      expression: {
                        type: 'Identifier',
                        name: 'c',
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
                    right: {
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
                    await: false,
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
                start: 5,
                end: 27,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 27
                  }
                }
              },
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
      `() => { let foo; }; foo => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
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
              params: [],
              async: false,
              expression: false,
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
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [],
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
              params: [
                {
                  type: 'Identifier',
                  name: 'foo',
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
              async: false,
              expression: false,
              start: 20,
              end: 29,
              loc: {
                start: {
                  line: 1,
                  column: 20
                },
                end: {
                  line: 1,
                  column: 29
                }
              }
            },
            start: 20,
            end: 29,
            loc: {
              start: {
                line: 1,
                column: 20
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
      `g => { try {} catch ([g]) {} }`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'TryStatement',
                    block: {
                      type: 'BlockStatement',
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
                    handler: {
                      type: 'CatchClause',
                      param: {
                        type: 'ArrayPattern',
                        elements: [
                          {
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
                          }
                        ],
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
                      start: 14,
                      end: 28,
                      loc: {
                        start: {
                          line: 1,
                          column: 14
                        },
                        end: {
                          line: 1,
                          column: 28
                        }
                      }
                    },
                    finalizer: null,
                    start: 7,
                    end: 28,
                    loc: {
                      start: {
                        line: 1,
                        column: 7
                      },
                      end: {
                        line: 1,
                        column: 28
                      }
                    }
                  }
                ],
                start: 5,
                end: 30,
                loc: {
                  start: {
                    line: 1,
                    column: 5
                  },
                  end: {
                    line: 1,
                    column: 30
                  }
                }
              },
              params: [
                {
                  type: 'Identifier',
                  name: 'g',
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
              async: false,
              expression: false,
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
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],
    // [ `()=>x;`, Context.OptionsNext | Context.OptionsLoc, {}],

    [
      `()=>x;`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [],
              async: false,
              expression: true,
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
      }
    ],
    [
      `(x)=>{x}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
                type: 'BlockStatement',
                body: [
                  {
                    type: 'ExpressionStatement',
                    expression: {
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
              params: [
                {
                  type: 'Identifier',
                  name: 'x',
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
                }
              ],
              async: false,
              expression: false,
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
      `yield => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
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
              params: [
                {
                  type: 'Identifier',
                  name: 'yield',
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
              async: false,
              expression: false,
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
      `foo => {}`,
      Context.OptionsNext | Context.OptionsLoc,
      {
        type: 'Program',
        sourceType: 'script',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'ArrowFunctionExpression',
              body: {
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
              params: [
                {
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
                }
              ],
              async: false,
              expression: false,
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
