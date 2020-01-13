<h1 align="center">Seafox</h1>

<p align="center"> A blazing fast 100% spec compliant, self-hosted javascript parser written in Typescript.</p>

<br>

## Features

* Conforms to the standard ECMAScript® 2020 (ECMA-262 10th Edition) language specification
* Support for additional ECMAScript features for Web Browsers
* Optionally track syntactic node locations
* Emits an ESTree-compatible abstract syntax tree.
* No backtracking
* Low memory usage
* Very well tested (~40 000 unit tests with full code coverage)
* Lightweight - ~88 KB minified

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

