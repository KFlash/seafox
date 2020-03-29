import { Token, KeywordDescTable } from '../token';
import { ParserState, Context } from '../parser/common';

// https://tc39.es/ecma262/#sec-ecmascript-language-lexical-grammar

export function convertTokenType(parser: ParserState, context: Context): any {
  let type: string = 'Punctuator';
  let value = parser.tokenValue;
  const t = parser.token;
  switch (t) {
    case Token.NumericLiteral:
      type = 'NumericLiteral';
      break;
    case Token.StringLiteral:
      type = 'StringLiteral';
      break;
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      type = 'BooleanLiteral';
      value = KeywordDescTable[t & Token.Kind] === 'true';
      break;
    case Token.NullKeyword:
      type = 'NullLiteral';
      value = null;
      break;
    case Token.ThisKeyword:
      type = 'Keyword';
      value = 'this';
      break;
    case Token.RegularExpression:
      type = 'RegularExpression';
      value = {
        value: parser.tokenValue,
        regex: parser.tokenRegExp
      };
      break;
    case Token.TemplateCont:
    case Token.TemplateTail:
      type = 'Template';
      break;
    default:
      if ((t & Token.IsIdentifier) === Token.IsIdentifier) {
        type = 'Identifier';
      } else if ((t & Token.Keyword) === Token.Keyword) {
        type = 'Keyword';
      } else {
        value = KeywordDescTable[t & Token.Kind];
      }
      break;
  }

  if (context & Context.OptionsLoc) parser.onToken(type, value, parser.start, parser.index);
  else parser.onToken(type, value);
}
