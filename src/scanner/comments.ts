import { ParserState, Context } from '../parser/common';
import { report, Errors } from '../errors';
import { unicodeLookup, Chars } from './';

export function skipHashBang(parser: ParserState, source: string): void {
  if (source.charCodeAt(parser.index) === Chars.Hash && source.charCodeAt(parser.index + 1) === Chars.Exclamation) {
    parser.index = skipSingleLineComment(parser, source, parser.index);
  }
}

export function skipSingleHTMLComment(parser: ParserState, context: Context, source: string, i: number): number {
  if ((context & 0b00000000000000000000100000010000) > 0) report(parser, Errors.HtmlCommentInModule);
  return skipSingleLineComment(parser, source, i++);
}

export function skipSingleLineComment(parser: ParserState, source: string, i: number): number {
  // The line terminator at the end of the line is not considered
  // to be part of the single-line comment; it is recognized
  // separately by the lexical grammar and becomes part of the
  // stream of input elements for the syntactic grammar
  let char = source.charCodeAt(i);
  while (i < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = source.charCodeAt(++i);
  }
  return i;
}

export function skipMultiLineComment(parser: ParserState, source: string, length: number, i: number): number | void {
  let lastIsCR: 0 | 1 = 0;
  let char = source.charCodeAt(i++);
  while (i < length) {
    if (char < 0x2b) {
      if (char === Chars.Asterisk) {
        while (char === Chars.Asterisk) {
          char = source.charCodeAt(i++);
        }
        if (char === Chars.Slash) return i;
      }

      if (char === Chars.CarriageReturn) {
        parser.lineBase++;
        parser.newLine = lastIsCR = 1;
        parser.offset = i;
      }

      if (char === Chars.LineFeed) {
        if (lastIsCR === 0) parser.lineBase++;
        lastIsCR = 0;
        parser.newLine = 1;
        parser.offset = i;
      }
    } else if ((char & ~1) === Chars.LineSeparator) {
      parser.offset = i;
      parser.newLine = 1;
      parser.lineBase++;
      lastIsCR = 0;
    }
    char = source.charCodeAt(i++);
  }

  report(parser, Errors.UnterminatedComment);
}
