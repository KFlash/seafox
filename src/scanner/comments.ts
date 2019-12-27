import { ParserState } from '../parser/common';
import { Context } from '../parser/bits';
import { report, Errors } from '../errors';
import { unicodeLookup, Chars } from './';

export function skipHashBang(parser: ParserState, source: string): void {
  const index = parser.index;
  if (source.charCodeAt(index) === Chars.Hash && source.charCodeAt(index + 1) === Chars.Exclamation) {
    parser.index = skipSingleLineComment(parser, source, index + 1);
  }
}

export function skipSingleHTMLComment(parser: ParserState, context: Context, source: string, i: number): number {
  if (context & (Context.OptionsDisableWebCompat | Context.Module)) {
    report(parser, Errors.HtmlCommentInModule);
  }
  return skipSingleLineComment(parser, source, i + 2);
}

export function skipSingleLineComment(parser: ParserState, source: string, i: number): number {
  let char = source.charCodeAt(i);
  while (i < parser.length && ((unicodeLookup[(char >>> 5) + 69632] >>> char) & 31 & 1) === 0) {
    char = source.charCodeAt(++i);
  }
  return i;
}

export function skipMultiLineComment(parser: ParserState, source: string, i: number): any {
  let lastIsCR: 0 | 1 = 0;
  let char = source.charCodeAt(i++);
  while (i < parser.length) {
    if (char < 0x2b) {
      if (char === Chars.Asterisk) {
        while (char === Chars.Asterisk) {
          char = source.charCodeAt(i++);
        }

        if (char === Chars.Slash) {
          return i;
        }
      }

      if (char === Chars.CarriageReturn) {
        parser.lineBase++;
        lastIsCR = 1;
        parser.newLine = 1;
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
