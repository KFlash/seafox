<h1 align="center">Seafox</h1>

<p align="center"> A blazing fast 100% spec compliant, self-hosted javascript parser written in Typescript.</p>

<br>

<p align="center">
    <a href="https://www.npmjs.com/package/seafox"><img src="https://img.shields.io/npm/v/seafox.svg?style=flat-square" alt="Seafox NPM"/></a>
    <a href="https://circleci.com/gh/KFlash/seafox"><img src="https://circleci.com/gh/KFlash/seafox.svg?style=svg" alt="Circle" /></a>
    <a href="https://github.com/KFlash/seafox/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/KFlash/seafox.svg" alt="License" /></a>
</p>

## Features

* Conforms to the standard ECMAScript® 2020 (ECMA-262 10th Edition) language specification
* Support for additional ECMAScript features for Web Browsers
* Optionally track syntactic node locations
* Emits an ESTree-compatible abstract syntax tree.
* No backtracking
* Low memory usage
* Very well tested (~30 000 unit tests with full code coverage)
* Lightweight - ~87 KB minified

## Installation

```sh
npm install seafox --save-dev
```

## API

Seafox generates `AST` according to [ESTree AST format](https://github.com/estree/estree), and can be used to perform [syntactic analysis](https://en.wikipedia.org/wiki/Parsing) (parsing) of a JavaScript program, and with `ES2015` and later a JavaScript program can be either [a script or a module](https://tc39.github.io/ecma262/index.html#sec-ecmascript-language-scripts-and-modules).

Seafox stricly follows the ECMA specifications so you have to specify whether to parse in [`parseScript`](https://tc39.github.io/ecma262/#sec-parse-script) mode (the default) or in [`parseModule`](https://tc39.github.io/ecma262/#sec-parsemodule) mode.

This is the available options:

```js
{
  // The flag to enable start and end offsets and line/column location information to each node
  loc: false;

  // Disable web compability
  disableWebCompat: false;

  // The flag to attach raw property to each literal and identifier node
  raw: false;

  // Enabled directives
  directives: false;

  // The flag to allow return in the global scope
  globalReturn: false;

  // The flag to enable implied strict mode
  impliedStrict: false;

// Enable non-standard parenthesized expression node
  preserveParens: false;
}
```

## What is Seafox?

This is my private parser code made public. It strictly conforms to the standard ECMAScript® 2020 (ECMA-262 10th Edition) language specification, and can not be used as an drop-in replacement for other parsers.

The main reason for this is that all parsers uses a `parse()` method - Seafox uses either [`parseScript`](https://tc39.github.io/ecma262/#sec-parse-script) or [`parseModule`](https://tc39.github.io/ecma262/#sec-parsemodule).

`Seafox` main focus is performance, and if you are soft hearted and / or can't understand super low level code - this parser isn't for you :)

I would recommend to use the [`Meriyah parser`](https://github.com/meriyah/meriyah/) instead of `Seafox` if you need a parser that behave like other public parsers, and also if you are in need of performance even the fact that Seafox is 15 - 25 % faster than the mentioned parser.
