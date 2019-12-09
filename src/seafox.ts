import { Context } from './parser/common';
import { parseSource, Options } from './parser/core';
import { Program } from './parser/estree';

/**
 * Parse a script, optionally with various options.
 */
export function parseScript(source: string, options?: Options): Program {
  return parseSource(source, options, Context.Empty);
}

/**
 * Parse a module, optionally with various options.
 */
export function parseModule(source: string, options?: Options): Program {
  return parseSource(source, options, Context.Strict | Context.Module);
}

/**
 * Parse a module or a script, optionally with various options.
 */
export function parse(source: string, options?: Options): Program {
  return parseSource(source, options, Context.Empty);
}
