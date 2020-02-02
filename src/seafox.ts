import { Context } from './parser/common';
import { Options, parseSource } from './parser/core';
import { Program } from './parser/types';

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

export const version = '0.0.15';
