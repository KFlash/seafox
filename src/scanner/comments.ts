import { ParserState, Context, Flags } from '../parser/common';
import { report, Errors } from '../errors';
import { unicodeLookup, Chars } from './';

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
  let isNewLine: 0 | 1 = 0;
  let char = source.charCodeAt(i++);

  while (i < length) {
    if (char < 0b00000000000000000000000000101011) {
      if (char === Chars.Asterisk) {
        while (char === Chars.Asterisk) {
          char = source.charCodeAt(i++);
        }
        if (char === Chars.Slash) {
          if (isNewLine === 0) parser.flags |= Flags.CommentStart;
          return i;
        }
      }

      if (char === Chars.CarriageReturn) {
        parser.curLine++;
        parser.newLine = lastIsCR = 1;
        parser.offset = i;
        isNewLine = 1;
      }

      if (char === Chars.LineFeed) {
        if (lastIsCR === 0) parser.curLine++;
        lastIsCR = 0;
        parser.newLine = 1;
        parser.offset = i;
        isNewLine = 1;
      }
    }
    if ((char & ~0b00000000000000000000000000000001) === Chars.LineSeparator) {
      parser.offset = i;
      parser.newLine = 1;
      parser.curLine++;
      lastIsCR = 0;
      isNewLine = 0;
    }
    char = source.charCodeAt(i++);
  }

  report(parser, Errors.UnterminatedComment);
}
