import { nextToken } from '../scanner/scan';
import { scanTemplateTail } from '../scanner/template';
import { Token, KeywordDescTable } from '../token';
import { Errors, report, reportScopeError } from '../errors';
import * as ESTree from './estree';
import { parseNonDirectiveExpression, parseStatementListItem } from './statements';
import { ScopeState, ScopeKind, addBlockName, addVarOrBlock } from './scope';
import { Flags, Context, BindingKind, FunctionFlag, PropertyKind, Origin } from './bits';
import {
  ParserState,
  consumeSemicolon,
  consume,
  consumeOpt,
  setLoc,
  optionalBit,
  reinterpretToPattern,
  isValidIdentifier,
  validateIdentifier,
  isExactlyStrictDirective,
  isStrictReservedWord,
  validateFunctionName,
  isEvalOrArguments
} from './common';

/** parseAssignmentExpression
 *
 * https://tc39.github.io/ecma262/#prod-AssignmentExpression
 *
 *
 * AssignmentExpression :
 *   1. ConditionalExpression
 *   2. LeftHandSideExpression = AssignmentExpression
 *
 * IsValidAssignmentTarget
 *   1,2 = false
 */
export function parseAssignmentExpression(
  parser: ParserState,
  context: Context,
  isPattern: 0 | 1,
  reinterpret: 0 | 1,
  inGroup: 0 | 1,
  left: any,
  start: number,
  line: number,
  column: number
): any {
  const token = parser.token;

  if ((token & Token.IsAssignOp) === Token.IsAssignOp) {
    if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

    // Note: Avoids reinterpretation in most cases like in a function param list
    if (reinterpret === 1 && parser.token === Token.Assign) {
      reinterpretToPattern(parser, left);
    }

    nextToken(parser, context, /* allowRegExp */ 1);

    const right = parseExpression(parser, context, inGroup);

    parser.assignable = 0;

    if (isPattern === 1) {
      return context & Context.OptionsLoc
        ? {
            type: 'AssignmentPattern',
            left,
            right,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'AssignmentPattern',
            left,
            right
          };
    }

    const operator = KeywordDescTable[token & Token.Type] as ESTree.AssignmentOperator;

    return context & Context.OptionsLoc
      ? {
          type: 'AssignmentExpression',
          left,
          operator,
          right,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'AssignmentExpression',
          left,
          operator,
          right
        };
  }

  if ((token & Token.IsBinaryOp) === Token.IsBinaryOp) {
    left = parseBinaryExpression(parser, context, inGroup, 4, token, start, line, column, left);
  }

  return parser.token === Token.QuestionMark
    ? parseConditionalExpression(parser, context, left, start, line, column)
    : left;
}

export function parseExpression(parser: ParserState, context: Context, inGroup: 0 | 1): any {
  const { start, line, column } = parser;

  let expr = parsePrimaryExpression(
    parser,
    context,
    BindingKind.None,
    0,
    /* allowLHS */ 1,
    1,
    inGroup,
    start,
    line,
    column
  );

  expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

  return parseAssignmentExpression(parser, context, 0, 0, inGroup, expr, start, line, column);
}

export function parseExpressions(parser: ParserState, context: Context): any {
  const { start, line, column } = parser;
  const property = parseExpression(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, 0);
  return parser.token === Token.Comma
    ? parseSequenceExpression(parser, context, property, start, line, column)
    : property;
}

export function parseSequenceExpression(
  parser: ParserState,
  context: Context,
  expr: ESTree.Expression,
  start: number,
  line: number,
  column: number
): ESTree.SequenceExpression {
  const expressions: ESTree.Expression[] = [expr];
  while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
    expressions.push(parseExpression(parser, context, 0));
  }

  return context & Context.OptionsLoc
    ? {
        type: 'SequenceExpression',
        expressions,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'SequenceExpression',
        expressions
      };
}

export function parseConditionalExpression(
  parser: ParserState,
  context: Context,
  test: any,
  start: number,
  line: number,
  column: number
): ESTree.ConditionalExpression {
  /**
   * parseConditionalExpression
   * https://tc39.github.io/ecma262/#prod-ConditionalExpression
   *
   * ConditionalExpression :
   *   1. BinaryExpression
   *   2. BinaryExpression ? AssignmentExpression : AssignmentExpression
   *
   * IsValidAssignmentTarget
   *   1,2 = false
   */
  nextToken(parser, context, /* allowRegExp */ 1); // skips: '?'
  const consequent = parseExpression(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, 0);
  consume(parser, context, Token.Colon, /* allowRegExp */ 1);
  const alternate = parseExpression(parser, context, 0);
  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ConditionalExpression',
        test,
        consequent,
        alternate
      };
}

export function parseBinaryExpression(
  parser: ParserState,
  context: Context,
  inGroup: 0 | 1,
  minPrec: number,
  logical: Token,
  curStart: number,
  curLine: number,
  curColumn: number,
  left: any
): any {
  let t: Token;
  let type: 'LogicalExpression' | 'BinaryExpression';
  let right: ESTree.Expression;
  let operator: ESTree.LogicalOperator;

  const prec = context & Context.DisallowIn ? Token.Precedence : Token.Precedence << Token.InPrec;

  while ((logical & Token.IsBinaryOp) === Token.IsBinaryOp) {
    t = parser.token;

    if ((t & prec) + (((t === Token.Exponentiate) as any) << 8) <= minPrec) return left;

    if (
      ((logical & Token.IsLogical) | (t & Token.IsCoalesc) | ((t & Token.IsLogical) | (logical & Token.IsCoalesc))) >
      Token.IsCoalesc
    ) {
      report(parser, Errors.InvalidCoalescing);
    }

    nextToken(parser, context, /* allowRegExp */ 1);

    type = t & (Token.IsCoalesc | Token.IsLogical) ? 'LogicalExpression' : 'BinaryExpression';

    operator = KeywordDescTable[t & 0xff] as ESTree.LogicalOperator;

    right = parseBinaryExpression(
      parser,
      context,
      inGroup,
      t & prec,
      t,
      parser.start,
      parser.line,
      parser.column,
      parseLeftHandSideExpression(parser, context, inGroup, /* allowLHS */ 1, 0)
    );

    parser.assignable = 0;

    left =
      context & Context.OptionsLoc
        ? {
            type,
            left,
            right,
            operator,
            start: curStart,
            end: parser.endIndex,
            loc: setLoc(parser, curLine, curColumn)
          }
        : {
            type,
            left,
            right,
            operator
          };
  }

  return left;
}

export function parsePropertyOrPrivatePropertyName(parser: ParserState, context: Context): ESTree.Identifier {
  if ((parser.token & (Token.Contextual | Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) === 0) {
    report(parser, Errors.Unexpected);
  }
  return parseIdentifier(parser, context);
}

export function parseMemberExpression(
  parser: ParserState,
  context: Context,
  expr: any,
  isOptional: 0 | 1,
  isShortCircuited: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.Expression | ESTree.MemberExpression | ESTree.UpdateExpression {
  if ((parser.token & Token.IsUpdateOp) === Token.IsUpdateOp) {
    return parser.newLine === 0 ? parseUpdateExpression(parser, context, expr, start, line, column) : expr;
  }

  switch (parser.token) {
    /* Property */
    case Token.Period: {
      nextToken(parser, context, /* allowRegExp */ 0);

      parser.assignable = 1;

      const property = parsePropertyOrPrivatePropertyName(parser, context);

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1
            },
        0,
        isOptional,
        start,
        line,
        column
      );
    }
    /* Property */
    case Token.LeftBracket: {
      nextToken(parser, context, /* allowRegExp */ 1);

      const property = parseExpressions(parser, context);

      consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);

      parser.assignable = 1;

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1
            },
        0,
        isShortCircuited,
        start,
        line,
        column
      );
    }

    /* Call */
    case Token.LeftParen: {
      const args = parseArguments(parser, context);
      const type = 'CallExpression';

      parser.assignable = 0;

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type,
              callee: expr,
              arguments: args,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type,
              callee: expr,
              arguments: args,
              optional: isOptional === 1,
              shortCircuited: isShortCircuited === 1
            },
        0,
        isOptional,
        start,
        line,
        column
      );
    }
    case Token.TemplateTail:
    case Token.TemplateCont: {
      if (isShortCircuited === 1) report(parser, Errors.OptionalChainingNoTemplate);
      parser.assignable = 0;
      const quasi =
        parser.token === Token.TemplateCont
          ? parseTemplate(parser, context | Context.TaggedTemplate, start, line, column)
          : parseTemplateLiteral(parser, context);

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi
            },
        isOptional,
        isShortCircuited,
        start,
        line,
        column
      );
    }
    /* Optional Property */
    case Token.QuestionMarkPeriod: {
      // '[x?.?.y = 1]'
      if (isOptional === 1) report(parser, Errors.Unexpected);
      parser.assignable = 0;
      nextToken(parser, context, /* allowRegExp */ 0); // skips: '?.'

      isOptional = 1;

      if ((parser.token & (Token.Contextual | Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) !== 0) {
        const property = parseIdentifier(parser, context);

        expr =
          context & Context.OptionsLoc
            ? {
                type: 'MemberExpression',
                object: expr,
                computed: false,
                property,
                optional: isOptional === 1,
                shortCircuited: isShortCircuited === 1,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'MemberExpression',
                object: expr,
                computed: false,
                property,
                optional: isOptional === 1,
                shortCircuited: isShortCircuited === 1
              };

        isOptional = 0;
        isShortCircuited = 1;
      }

      return parseMemberExpression(parser, context, expr, isOptional, isShortCircuited, start, line, column);
    }

    default:
      return expr;
  }
}

export function parseArguments(parser: ParserState, context: Context): (ESTree.Expression | ESTree.SpreadElement)[] {
  // Arguments ::
  //   '(' (AssignmentExpression)*[','] ')'
  nextToken(parser, context, /* allowRegExp */ 1);
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;
  const args: any[] = [];

  while (parser.token !== Token.RightParen) {
    if (parser.token === Token.Ellipsis) {
      args.push(parseSpreadElement(parser, context));
    } else {
      args.push(parseExpression(parser, context, 0));
    }

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  return args;
}

export function parseSpreadElement(parser: ParserState, context: Context): ESTree.SpreadElement {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 1);
  const argument = parseExpression(parser, context, 0);
  return context & Context.OptionsLoc
    ? {
        type: 'SpreadElement',
        argument,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'SpreadElement',
        argument
      };
}

export function parseTemplateLiteral(parser: ParserState, context: Context): ESTree.TemplateLiteral {
  const { start, line, column, tokenValue, tokenRaw } = parser;
  parser.assignable = 0;
  consume(parser, context, Token.TemplateTail, /* allowRegExp */ 0);
  const quasis = [parseTemplateElement1(parser, context, tokenValue, tokenRaw, true, start, line, column)];
  return context & Context.OptionsLoc
    ? {
        type: 'TemplateLiteral',
        expressions: [],
        quasis,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'TemplateLiteral',
        expressions: [],
        quasis
      };
}

/**
 * parseTemplateLiteralExpression
 * https://tc39.github.io/ecma262/#prod-Literal
 *
 * TemplateExpression :
 *   NoSubstitutionTemplate
 *   TemplateHead
 *
 * NoSubstitutionTemplate :
 *   ` TemplateCharacters(opt) `
 *
 * TemplateHead :
 *   ` TemplateCharacters(opt) ${
 *
 * TemplateSubstitutionTail :
 *   TemplateMiddle
 *   TemplateTail
 *
 * TemplateMiddle :
 *   } TemplateCharacters(opt) ${
 *
 * TemplateTail :
 *   } TemplateCharacters(opt) `
 *
 * TemplateCharacters :
 *   TemplateCharacter TemplateCharacters(opt)
 *
 * TemplateCharacter :
 *   $ [lookahead ≠ {]
 *   \ EscapeSequence
 *   SourceCharacter (but not one of ` or \ or $)
 */
export function parseTemplate(
  parser: ParserState,
  context: Context,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.TemplateLiteral {
  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  const quasis = [parseTemplateElement(parser, context, /* tail */ false)];

  consume(parser, context, Token.TemplateCont, /* allowRegExp */ 1);

  const expressions = [parseExpressions(parser, context)];

  while ((parser.token = scanTemplateTail(parser, context)) === Token.TemplateCont) {
    quasis.push(parseTemplateElement(parser, context, /* tail */ false));
    consume(parser, context, Token.TemplateCont, /* allowRegExp */ 1);
    expressions.push(parseExpressions(parser, context));
  }

  quasis.push(parseTemplateElement(parser, context, /* tail */ true));

  consume(parser, context, Token.TemplateTail, /* allowRegExp */ 0);

  return context & Context.OptionsLoc
    ? {
        type: 'TemplateLiteral',
        expressions,
        quasis,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'TemplateLiteral',
        expressions,
        quasis
      };
}
export function parseTemplateElement1(
  parser: ParserState,
  context: Context,
  cooked: any,
  raw: any,
  tail: boolean,
  start: number,
  line: number,
  column: number
): ESTree.TemplateElement {
  return context & Context.OptionsLoc
    ? {
        type: 'TemplateElement',
        value: {
          cooked,
          raw
        },
        tail,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'TemplateElement',
        value: {
          cooked,
          raw
        },
        tail
      };
}
export function parseTemplateElement(parser: ParserState, context: Context, tail: boolean): ESTree.TemplateElement {
  const { start, line, column } = parser;

  return context & Context.OptionsLoc
    ? {
        type: 'TemplateElement',
        value: {
          cooked: parser.tokenValue,
          raw: parser.tokenRaw
        },
        tail,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'TemplateElement',
        value: {
          cooked: parser.tokenValue,
          raw: parser.tokenRaw
        },
        tail
      };
}
export function parseYieldExpression(
  parser: ParserState,
  context: Context,
  canAssign: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.YieldExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression {
  if (context & Context.InYieldContext) {
    nextToken(parser, context, /* allowRegExp */ 1);
    if (context & Context.InArgumentList) report(parser, Errors.YieldInParameter);
    if (canAssign === 0) report(parser, Errors.CantAssignTo);
    if (parser.token === Token.QuestionMark) report(parser, Errors.InvalidTernaryYield);

    let argument = null;
    let delegate = false; // yield*

    if (parser.newLine === 0) {
      delegate = consumeOpt(parser, context, Token.Multiply, /* allowRegExp */ 1);
      if (parser.token & Token.IsExpressionStart || delegate) {
        argument = parseExpression(parser, context, 0);
      }
    }

    parser.assignable = 0;

    return context & Context.OptionsLoc
      ? {
          type: 'YieldExpression',
          argument,
          delegate,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'YieldExpression',
          argument,
          delegate
        };
  }

  if (context & Context.Strict) report(parser, Errors.DisallowedInContext, 'yield');

  return parseIdentifierOrArrow(parser, context);
}

export function parseAwaitExpression(
  parser: ParserState,
  context: Context,
  inNew: 0 | 1,
  start: number,
  line: number,
  column: number
): any {
  if (context & Context.InAwaitContext) {
    if (inNew === 1) report(parser, Errors.Unexpected);

    if (context & Context.InArgumentList) {
      report(parser, Errors.AwaitInParameter);
    }

    // TODO: Check for escaped ident, and throw

    nextToken(parser, context, /* allowRegExp */ 1);

    const argument = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 0);

    parser.assignable = 0;

    return context & Context.OptionsLoc
      ? {
          type: 'AwaitExpression',
          argument,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'AwaitExpression',
          argument
        };
  }

  if (context & Context.Module) report(parser, Errors.DisallowedInContext, 'Await');

  return parseIdentifierOrArrow(parser, context);
}

export function parseIdentifierOrArrow(
  parser: ParserState,
  context: Context
): ESTree.Identifier | ESTree.ArrowFunctionExpression {
  const { start, line, column } = parser;

  const expr = parseIdentifier(parser, context);

  parser.flags = (parser.flags | Flags.SimpleParameterList) ^ Flags.SimpleParameterList;

  parser.assignable = 1;

  if (parser.token === Token.Arrow) {
    const scope = {
      parent: {
        parent: void 0,
        type: ScopeKind.Block
      },
      type: ScopeKind.Block,
      scopeError: void 0
    };

    addBlockName(parser, context, scope, parser.tokenValue, BindingKind.ArgumentList, Origin.None);
    return parseArrowFunction(parser, context, scope, [expr], 0, start, line, column);
  }
  return expr;
}

export function parsePrimaryExpression(
  parser: ParserState,
  context: Context,
  kind: BindingKind,
  inNew: 0 | 1,
  allowLHS: 0 | 1,
  canAssign: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number
): any {
  const token = parser.token;

  if ((token & Token.IsIdentifier) === Token.IsIdentifier) {
    switch (token) {
      case Token.YieldKeyword:
        if (inGroup === 1) parser.flags |= Flags.SeenYield;
        return parseYieldExpression(parser, context, canAssign, start, line, column);
      case Token.AwaitKeyword:
        return parseAwaitExpression(parser, context, inNew, start, line, column);
      case Token.AsyncKeyword:
        return parseAsyncExpression(parser, context, inNew, allowLHS, canAssign, start, line, column);
    }

    const tokenValue = parser.tokenValue;

    const expr = parseIdentifier(parser, context | Context.TaggedTemplate);

    if (parser.token === Token.Arrow) {
      if (allowLHS === 0) report(parser, Errors.Unexpected);
      if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);
      if (inNew) report(parser, Errors.InvalidAsyncArrow);
      return parseAsyncArrowIdentifier(parser, context, /* isAsync */ 0, tokenValue, expr, start, line, column);
    }

    if (token === Token.LetKeyword) {
      if (context & Context.Strict) report(parser, Errors.StrictInvalidLetInExprPos);
      if (kind & (BindingKind.Let | BindingKind.Const)) report(parser, Errors.InvalidLetConstBinding);
    }

    parser.assignable = 1;

    return expr;
  }

  if ((token & Token.IsUpdateOp) === Token.IsUpdateOp) {
    return parseUpdateExpressionPrefix(parser, context, inNew, allowLHS, start, line, column);
  }
  switch (token) {
    case Token.DeleteKeyword:
    case Token.Negate:
    case Token.Complement:
    case Token.Add:
    case Token.Subtract:
    case Token.TypeofKeyword:
    case Token.VoidKeyword:
      return parseUnaryExpression(parser, context, inNew, allowLHS, start, line, column);
    case Token.StringLiteral:
    case Token.NumericLiteral:
      return parseLiteral(parser, context);
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      return parseExpressionFromLiteral(parser, context, parser.tokenValue === 'true', start, line, column);
    case Token.LeftBracket:
      return parseArrayLiteral(parser, context, /* skipInitializer */ canAssign ? 0 : 1, inGroup, start, line, column);
    case Token.LeftBrace:
      return parseObjectLiteral(parser, context, /* skipInitializer */ canAssign ? 0 : 1, inGroup, start, line, column);
    case Token.LeftParen:
      return parseParenthesizedExpression(
        parser,
        context,
        canAssign,
        BindingKind.ArgumentList,
        Origin.None,
        start,
        line,
        column
      );
    case Token.NullKeyword:
      return parseNullLiteral(parser, context, start, line, column);
    case Token.ThisKeyword:
      return parseThisExpression(parser, context, start, line, column);
    case Token.BigIntLiteral:
      return parseBigIntLiteral(parser, context, start, line, column);
    case Token.RegularExpression:
      return parseRegExpLiteral(parser, context, start, line, column);
    case Token.NewKeyword:
      return parseNewExpression(parser, context, start, line, column);
    case Token.FunctionKeyword:
      return parseFunctionExpression(parser, context, /* isAsync */ 0, start, line, column);
    case Token.ClassKeyword:
      return parseClassExpression(parser, context, start, line, column);
    case Token.SuperKeyword:
      return parseSuperExpression(parser, context, start, line, column);
    case Token.TemplateTail:
      return parseTemplateLiteral(parser, context);
    case Token.TemplateCont:
      return parseTemplate(parser, context, start, line, column);
    case Token.ImportKeyword:
      return parseImportCallOrMetaExpression(parser, context, inNew, start, line, column);
    default:
      if (isValidIdentifier(context, parser.token)) return parseIdentifierOrArrow(parser, context);
      report(parser, Errors.Unexpected);
  }
}

export function parseAsyncExpression(
  parser: ParserState,
  context: Context,
  inNew: 0 | 1,
  allowLHS: 0 | 1,
  canAssign: 0 | 1,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.FunctionExpression | ESTree.ArrowFunctionExpression | ESTree.CallExpression | ESTree.Identifier {
  const { tokenValue, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.newLine === 0) {
    // async function ...
    if (parser.token === Token.FunctionKeyword) {
      if (allowLHS === 0) report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & Token.Type]);

      return parseFunctionExpression(parser, context, 1, curStart, curLine, curColumn);
    }

    // async Identifier => ...
    if ((parser.token & Token.IsIdentifier) === Token.IsIdentifier) {
      if (allowLHS === 0) report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & Token.Type]);

      if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);

      return parseAsyncArrowIdentifier(
        parser,
        context,
        1,
        parser.tokenValue,
        parseIdentifier(parser, context),
        curStart,
        curLine,
        curColumn
      );
    }
  }

  const expr = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

  // async (...) => ...
  if (inNew === 0 && parser.token === Token.LeftParen) {
    return parseAsyncArrowOrCallExpression(
      parser,
      (context | Context.DisallowIn) ^ Context.DisallowIn,
      expr,
      canAssign,
      parser.newLine,
      BindingKind.ArgumentList,
      Origin.None,
      curStart,
      curLine,
      curColumn
    );
  }

  if (parser.token === Token.Arrow) {
    if (inNew === 1) report(parser, Errors.InvalidAsyncArrow);
    return parseAsyncArrowIdentifier(parser, context, 0, 'async', expr, curStart, curLine, curColumn);
  }

  return expr;
}

export function parseAsyncArrowIdentifier(
  parser: ParserState,
  context: Context,
  isAsync: 0 | 1,
  value: string,
  expr: any,
  start: number,
  line: number,
  column: number
): any {
  const scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.ArrowParams,
    scopeError: void 0
  };

  parser.flags = (parser.flags | Flags.SimpleParameterList) ^ Flags.SimpleParameterList;

  addBlockName(parser, context, scope, value, BindingKind.ArgumentList, Origin.None);

  return parseArrowFunction(parser, context, scope, [expr], isAsync, start, line, column);
}

export function parseAsyncArrowOrCallExpression(
  parser: ParserState,
  context: Context,
  callee: ESTree.Identifier | void,
  canAssign: 0 | 1,
  newLine: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  start: number,
  line: number,
  column: number
): any {
  nextToken(parser, context, /* allowRegExp */ 1);

  const scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.ArrowParams,
    scopeError: void 0
  };

  if (parser.token === Token.RightParen) {
    nextToken(parser, context, /* allowRegExp */ 0);

    if (parser.token === Token.Arrow) {
      if (newLine === 1) report(parser, Errors.Unexpected);

      return parseArrowFunctionAfterParen(parser, context, scope, Flags.Empty, [], canAssign, 1, start, line, column);
    }

    return context & Context.OptionsLoc
      ? {
          type: 'CallExpression',
          callee,
          arguments: [],
          optional: false,
          shortCircuited: false,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'CallExpression',
          callee,
          arguments: [],
          optional: false,
          shortCircuited: false
        };
  }

  parser.flags =
    (parser.flags | Flags.SeenYield | Flags.SimpleParameterList) ^ (Flags.SimpleParameterList | Flags.SeenYield);

  let expr: any = null;

  let conjuncted: Flags = Flags.Empty;

  const params: ESTree.Expression[] = [];

  while (parser.token !== Token.RightParen) {
    const { token, tokenValue, start, line, column } = parser;

    if (token & (Token.IsIdentifier | Token.Keyword | Token.FutureReserved)) {
      addBlockName(parser, context, scope, parser.tokenValue, BindingKind.ArgumentList, Origin.None);

      expr = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, 1, start, line, column);

      if (parser.token === Token.RightParen || parser.token === Token.Comma) {
        conjuncted |=
          (parser.assignable === 0 ? Flags.NotDestructible | Flags.SimpleParameterList : 0) |
          (isEvalOrArguments(tokenValue) ? Flags.StrictEvalArguments : 0) |
          ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.HasStrictReserved : 0);
      } else {
        conjuncted |= parser.token === Token.Assign ? Flags.SimpleParameterList : Flags.NotDestructible;

        expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

        if (parser.token !== Token.RightParen && parser.token !== Token.Comma) {
          expr = parseAssignmentExpression(parser, context, 0, 1, 1, expr, start, line, column);
        }
      }
    } else if (token & Token.IsPatternStart) {
      expr =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
          : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);

      conjuncted |= parser.flags | Flags.SimpleParameterList;

      if (parser.token !== Token.RightParen && parser.token !== Token.Comma) {
        if (conjuncted & Flags.MustDestruct) report(parser, Errors.InvalidPatternTail);

        expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

        conjuncted |= Flags.NotDestructible;

        if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
          expr = parseBinaryExpression(parser, context, 0, 4, token, start, line, column, expr);
        }
        if (parser.token === Token.QuestionMark) {
          expr = parseConditionalExpression(parser, context, expr as ESTree.Expression, start, line, column);
        }
      }
    } else if (token === Token.Ellipsis) {
      expr = parseSpreadOrRestElement(
        parser,
        context,
        scope,
        Token.RightParen,
        0,
        1,
        kind,
        origin,
        start,
        line,
        column
      );

      conjuncted |=
        (parser.token === Token.RightParen ? 0 : Flags.NotDestructible) | (parser.flags | Flags.SimpleParameterList);
    } else {
      expr = parseExpression(parser, context, 0);

      params.push(expr);

      while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
        params.push(parseExpression(parser, context, 0));
      }

      consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

      parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted | Flags.NotDestructible;

      parser.assignable = 0;

      return context & Context.OptionsLoc
        ? {
            type: 'CallExpression',
            callee,
            arguments: params,
            optional: false,
            shortCircuited: false,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'CallExpression',
            callee,
            arguments: params,
            optional: false,
            shortCircuited: false
          };
    }

    params.push(expr as ESTree.Expression);

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  conjuncted |=
    parser.flags & Flags.SeenYield ? Flags.SeenYield : 0 | (parser.flags & Flags.SeenAwait) ? Flags.SeenAwait : 0;

  if (parser.token === Token.Arrow) {
    return parseArrowFunctionAfterParen(parser, context, scope, conjuncted, params, canAssign, 1, start, line, column);
  }

  if (conjuncted & Flags.MustDestruct) report(parser, Errors.InvalidShorthandPropInit);

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'CallExpression',
        callee,
        arguments: params,
        optional: false,
        shortCircuited: false,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'CallExpression',
        callee,
        arguments: params,
        optional: false,
        shortCircuited: false
      };
}

export function parseImportCallOrMetaExpression(
  parser: ParserState,
  context: Context,
  inNew: 0 | 1,
  start: number,
  line: number,
  column: number
): any {
  // ImportCall[Yield, Await]:
  //  import(AssignmentExpression[+In, ?Yield, ?Await])
  const tokenValue = parser.tokenValue;

  nextToken(parser, context, /* allowRegExp */ 1);

  let expr: any = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

  if (parser.token === Token.Period) {
    return parseImportMetaExpression(parser, context, expr, start, line, column);
  }

  if (inNew === 1) report(parser, Errors.InvalidImportNew);

  expr = parseImportExpression(parser, context, start, line, column);

  parser.assignable = 0;

  return parseMemberExpression(parser, context, expr, 0, 0, start, line, column);
}
export function parseNewExpression(
  parser: ParserState,
  context: Context,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  // NewExpression ::
  //   ('new')+ MemberExpression
  //
  // NewTarget ::
  //   'new' '.' 'target'
  //
  // Examples of new expression:
  // new foo.bar().baz means (new (foo.bar)()).baz
  // new foo()() means (new foo())()
  // new new foo()() means (new (new foo())())
  // new new foo means new (new foo)
  // new new foo() means new (new foo())
  // new new foo().bar().baz means (new (new foo()).bar()).baz

  nextToken(parser, context, /* allowRegExp */ 1);

  parser.assignable = 0;

  if (parser.token === Token.Period) {
    return parseNewTargetExpression(parser, context, curStart, curLine, curColumn);
  }

  const { start, line, column } = parser;

  const expr = parsePrimaryExpression(
    parser,
    context,
    BindingKind.None,
    1,
    /* allowLHS */ 1,
    0,
    0,
    start,
    line,
    column
  );

  // NewExpression without arguments.
  const callee = parseNewMemberExpression(parser, context, expr, start, line, column);

  const args = parser.token === Token.LeftParen ? parseArguments(parser, context) : [];

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'NewExpression',
        callee,
        arguments: args,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'NewExpression',
        callee,
        arguments: args
      };
}

export function parseNewTargetExpression(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.MetaProperty {
  nextToken(parser, context, /* allowRegExp */ 0);

  if ((context & Context.AllowNewTarget) === 0 || parser.tokenValue !== 'target') {
    report(parser, Errors.UnexpectedNewTarget);
  }

  const meta = parseIdentifierFromValue(parser, context, 'new', start, line, column);

  const property = parseIdentifier(parser, context);
  return context & Context.OptionsLoc
    ? {
        type: 'MetaProperty',
        meta,
        property,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'MetaProperty',
        meta,
        property
      };
}

export function parseNewMemberExpression(
  parser: ParserState,
  context: Context,
  expr: any,
  start: number,
  line: number,
  column: number
): ESTree.MemberExpression {
  switch (parser.token) {
    /* Property */
    case Token.Period: {
      nextToken(parser, context, /* allowRegExp */ 0);

      parser.assignable = 1;

      const property = parsePropertyOrPrivatePropertyName(parser, context);

      return parseNewMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property,
              optional: false,
              shortCircuited: false,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property,
              optional: false,
              shortCircuited: false
            },
        start,
        line,
        column
      );
    }
    case Token.LeftBracket: {
      nextToken(parser, context, /* allowRegExp */ 1);

      const property = parseExpressions(parser, context);

      consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);

      return parseNewMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property,
              optional: false,
              shortCircuited: false,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property,
              optional: false,
              shortCircuited: false
            },
        start,
        line,
        column
      );
    }

    /* Optional chaining */
    case Token.QuestionMarkPeriod:
      report(parser, Errors.OptionalChainingNoNew);

    /* Template */
    case Token.TemplateCont:
    case Token.TemplateTail: {
      parser.assignable = 0;

      const quasi =
        parser.token === Token.TemplateCont
          ? parseTemplate(parser, context | Context.TaggedTemplate, start, line, column)
          : parseTemplateLiteral(parser, context);

      return parseNewMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi,
              start: start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'TaggedTemplateExpression',
              tag: expr,
              quasi
            },
        start,
        line,
        column
      );
    }
    default:
      return expr;
  }
}

/**
 * Parse super expression
 *
 * @param parser  Parser object
 * @param context Context masks
 */
export function parseSuperExpression(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.Super {
  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.token === Token.LeftParen) {
    if ((context & Context.SuperCall) === 0) report(parser, Errors.SuperNoConstructor);
    parser.assignable = 0;
  } else if (parser.token === Token.LeftBracket || parser.token === Token.Period) {
    if ((context & Context.SuperProperty) === 0) report(parser, Errors.InvalidSuperProperty);
    parser.assignable = 1;
  } else {
    report(parser, Errors.Unexpected);
  }

  return context & Context.OptionsLoc
    ? {
        type: 'Super',
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Super'
      };
}

export function parseRegExpLiteral(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): any {
  const { tokenRegExp, tokenValue } = parser;
  nextToken(parser, context, /* allowRegExp */ 0);
  parser.assignable = 0;

  if (context & Context.OptionsRaw) {
    const raw = parser.source.slice(parser.start, parser.index);

    return context & Context.OptionsLoc
      ? {
          type: 'Literal',
          value: tokenValue,
          regex: tokenRegExp,
          raw,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'Literal',
          value: tokenValue,
          raw,
          regex: tokenRegExp
        };
  }

  return context & Context.OptionsLoc
    ? {
        type: 'Literal',
        value: tokenValue,
        regex: tokenRegExp,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Literal',
        value: tokenValue,
        regex: tokenRegExp
      };
}

export function parseBigIntLiteral(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): any {
  const bigint = parser.source.slice(start, parser.index);
  nextToken(parser, context, /* allowRegExp */ 0);
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? {
        type: 'BigIntLiteral',
        value: null,
        bigint,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'BigIntLiteral',
        value: null,
        bigint,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      };
}

export function parseArrowFunctionAfterParen(
  parser: ParserState,
  context: Context,
  scope: any,
  conjuncted: Flags,
  params: any,
  canAssign: 0 | 1,
  isAsync: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ArrowFunctionExpression {
  if (conjuncted & (Flags.AssignableDestruct | Flags.NotDestructible)) {
    report(parser, Errors.InvalidArrowDestructLHS);
  }
  if (context & (Context.Strict | Context.InYieldContext) && conjuncted & Flags.SeenYield) {
    report(parser, Errors.Unexpected);
  }

  parser.flags =
    ((parser.flags | Flags.SeenYield | Flags.Destructuring) ^ (Flags.Destructuring | Flags.SeenYield)) | conjuncted;

  if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);

  // Reverse while loop is slightly faster than a regular for loop
  let i = params.length;

  while (i--) {
    reinterpretToPattern(parser, params[i]);
  }
  return parseArrowFunction(parser, context, scope, params, isAsync, start, line, column);
}

export function parseArrowFunction(
  parser: ParserState,
  context: Context,
  scope: any,
  params: any,
  isAsync: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ArrowFunctionExpression {
  if (parser.newLine === 1) report(parser, Errors.InvalidLineBreak);

  // If next token is not `=>`, it's a syntax error
  consume(parser, context, Token.Arrow, /* allowRegExp */ 1);

  context = ((context | 0b0000000111100000000_0000_00000000) ^ 0b0000000111100000000_0000_00000000) | (isAsync << 22);

  const expression = parser.token !== Token.LeftBrace;

  let body: any;

  if (scope && scope.scopeError !== void 0) reportScopeError(scope.scopeError);

  if (expression) {
    // Single-expression body
    body = parseExpression(parser, context, 0);
  } else {
    body = parseFunctionBody(
      parser,
      (context | 0b0001000000000000001_0000_00000000 | Context.InGlobal) ^
        (0b0001000000000000001_0000_00000000 | Context.InGlobal),
      scope,
      void 0,
      1,
      void 0
    );

    if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp && parser.newLine === 0) {
      report(parser, Errors.Unexpected);
    } else if ((parser.token & Token.IsUpdateOp) === Token.IsUpdateOp) {
      report(parser, Errors.Unexpected);
    } else {
      switch (parser.token) {
        case Token.Period:
        case Token.LeftBracket:
        case Token.TemplateTail:
        case Token.QuestionMark:
          report(parser, Errors.Unexpected);
        case Token.LeftParen:
          report(parser, Errors.Unexpected);
        default: // ignore
      }
    }
  }
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? {
        type: 'ArrowFunctionExpression',
        body,
        params,
        async: isAsync === 1,
        expression,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ArrowFunctionExpression',
        body,
        params,
        async: isAsync === 1,
        expression
      };
}

export function parseParenthesizedExpression(
  parser: ParserState,
  context: Context,
  canAssign: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.Expression {
  nextToken(parser, context, /* allowRegExp */ 1);

  const scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.ArrowParams,
    scopeError: void 0
  };

  parser.flags =
    (parser.flags | Flags.SeenYield | Flags.SimpleParameterList) ^ (Flags.SimpleParameterList | Flags.SeenYield);

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  let expr: any = [];

  if (parser.token === Token.RightParen) {
    if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);

    nextToken(parser, context, /* allowRegExp */ 0);

    return parseArrowFunction(parser, context, scope, expr, /* isAsync */ 0, curStart, curLine, curColumn);
  }

  let expressions: any[] = [];
  let isSequence: 0 | 1 = 0;
  let conjuncted: Flags = Flags.Empty;

  const { start: sStart, line: sLine, column: sColumn } = parser;

  parser.assignable = 1;

  while (parser.token !== Token.RightParen) {
    const { token, start, line, column } = parser;

    if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
      addBlockName(parser, context, scope, parser.tokenValue, BindingKind.ArgumentList, Origin.None);

      expr = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, 1, start, line, column);

      if (parser.token === Token.Comma || parser.token === Token.RightParen) {
        if (parser.assignable === 0) {
          conjuncted |= Flags.NotDestructible | Flags.SimpleParameterList;
        }
      } else {
        conjuncted |= parser.token === Token.Assign ? Flags.SimpleParameterList : Flags.NotDestructible;

        expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);

        if (parser.token !== Token.RightParen && parser.token !== Token.Comma) {
          expr = parseAssignmentExpression(parser, context, 0, 0, 1, expr, start, line, column);
        }
      }
    } else if (token & Token.IsPatternStart) {
      expr =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
          : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);

      conjuncted |= parser.flags | Flags.SimpleParameterList;

      parser.assignable = 0;

      if (parser.token !== Token.Comma && parser.token !== Token.RightParen) {
        if (conjuncted & Flags.MustDestruct) report(parser, Errors.InvalidPatternTail);
        expr = parseMemberExpression(parser, context, expr, 0, 0, start, line, column);
        conjuncted |= Flags.NotDestructible;
        if (parser.token !== Token.Comma && parser.token !== Token.RightParen) {
          expr = parseAssignmentExpression(parser, context, 0, 0, 0, expr, start, line, column);
        }
      }
    } else if (token === Token.Ellipsis) {
      expr = parseSpreadOrRestElement(
        parser,
        context,
        scope,
        Token.RightParen,
        0,
        /* isAsync */ 0,
        kind,
        origin,
        start,
        line,
        column
      );

      if (parser.flags & Flags.NotDestructible) report(parser, Errors.InvalidRestArg);

      if (isSequence && (parser.token === Token.RightParen || parser.token === Token.Comma)) {
        expressions.push(expr);
      }
      conjuncted |= Flags.MustDestruct | Flags.SimpleParameterList;
      break;
    } else {
      conjuncted |= Flags.NotDestructible;

      expr = parseExpression(parser, context, 0);

      if (isSequence && (parser.token === Token.Comma || parser.token === Token.RightParen)) {
        expressions.push(expr);
      }

      if (parser.token === Token.Comma) {
        if (!isSequence) {
          isSequence = 1;
          expressions = [expr];
        }
      }

      if (isSequence) {
        while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
          expressions.push(parseExpression(parser, context, 0));
        }

        expr =
          context & Context.OptionsLoc
            ? {
                type: 'SequenceExpression',
                expressions,
                start: sStart,
                end: parser.endIndex,
                loc: setLoc(parser, sLine, sColumn)
              }
            : {
                type: 'SequenceExpression',
                expressions
              };
      }

      consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

      parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

      return expr;
    }

    if (isSequence && (parser.token === Token.Comma || parser.token === Token.RightParen)) {
      expressions.push(expr);
    }

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);

    if (!isSequence) {
      isSequence = 1;
      expressions = [expr];
    }

    if (parser.token === Token.RightParen) {
      conjuncted |= Flags.MustDestruct;
      break;
    }
  }

  if (isSequence) {
    parser.assignable = 0;
    expr =
      context & Context.OptionsLoc
        ? {
            type: 'SequenceExpression',
            expressions,
            start: sStart,
            end: parser.endIndex,
            loc: setLoc(parser, sLine, sColumn)
          }
        : {
            type: 'SequenceExpression',
            expressions
          };
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  if (conjuncted & Flags.NotDestructible && conjuncted & Flags.MustDestruct) {
    report(parser, Errors.CantAssignToValidRHS);
  }

  conjuncted |=
    parser.flags & Flags.SeenYield ? Flags.SeenYield : 0 | (parser.flags & Flags.SeenAwait) ? Flags.SeenAwait : 0;

  if (parser.token === Token.Arrow) {
    return parseArrowFunctionAfterParen(
      parser,
      context,
      scope,
      conjuncted,
      isSequence ? expressions : [expr],
      canAssign,
      0,
      curStart,
      curLine,
      curColumn
    );
  } else if (conjuncted & Flags.MustDestruct) {
    report(parser, Errors.UncompleteArrow);
  }

  parser.flags =
    ((parser.flags | Flags.SeenYield | Flags.Destructuring) ^ (Flags.SeenYield | Flags.Destructuring)) | conjuncted;

  return expr;
}

export function parseExpressionStatement(
  parser: ParserState,
  context: Context,
  expression: any,
  start: number,
  line: number,
  column: number
): ESTree.ExpressionStatement {
  consumeSemicolon(parser, context);

  return context & Context.OptionsLoc
    ? {
        type: 'ExpressionStatement',
        expression,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ExpressionStatement',
        expression
      };
}

export function parseLeftHandSideExpression(
  parser: ParserState,
  context: Context,
  inGroup: 0 | 1,
  allowLHS: 0 | 1,
  canAssign: 0 | 1
): any {
  // LeftHandSideExpression ::
  //   (PrimaryExpression | MemberExpression) ...

  const { start, line, column } = parser;
  const expression = parsePrimaryExpression(
    parser,
    context,
    BindingKind.None,
    0,
    allowLHS,
    canAssign,
    inGroup,
    start,
    line,
    column
  );
  return parseMemberExpression(parser, context, expression, 0, 0, start, line, column);
}

export function parseIdentifier(parser: ParserState, context: Context): ESTree.Identifier {
  const { tokenValue: name, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);
  return context & Context.OptionsLoc
    ? {
        type: 'Identifier',
        name,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Identifier',
        name
      };
}

export function parseThisExpression(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.ThisExpression {
  nextToken(parser, context, /* allowRegExp */ 0);
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? {
        type: 'ThisExpression',
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ThisExpression'
      };
}

export function parseNullLiteral(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.Literal {
  nextToken(parser, context, /* allowRegExp */ 0);
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? {
        type: 'Literal',
        value: null,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Literal',
        value: null
      };
}

export function parseExpressionFromLiteral(
  parser: ParserState,
  context: Context,
  value: any,
  start: number,
  line: number,
  column: number
): ESTree.Literal {
  nextToken(parser, context, /* allowRegExp */ 0);

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'Literal',
        value,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Literal',
        value
      };
}

export function parseLiteral(parser: ParserState, context: Context): any {
  const value = parser.tokenValue;

  const start = parser.start;
  const line = parser.line;
  const column = parser.column;
  const index = parser.index;

  parser.assignable = 0;

  nextToken(parser, context, /* allowRegExp */ 0);

  if (context & Context.OptionsRaw) {
    const raw = parser.source.slice(start, index);

    return context & Context.OptionsLoc
      ? {
          type: 'Literal',
          value,
          raw,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'Literal',
          value,
          raw
        };
  }

  return context & Context.OptionsLoc
    ? {
        type: 'Literal',
        value,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Literal',
        value
      };
}

export function parseUpdateExpression(
  parser: ParserState,
  context: Context,
  arg: any,
  start: number,
  line: number,
  column: number
): ESTree.UpdateExpression {
  if (parser.assignable === 0) report(parser, Errors.InvalidIncDecTarget);

  const operator = KeywordDescTable[parser.token & Token.Type] as ESTree.UpdateOperator;

  nextToken(parser, context, /* allowRegExp */ 0);
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? {
        type: 'UpdateExpression',
        argument: arg,
        operator,
        prefix: false,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'UpdateExpression',
        argument: arg,
        operator,
        prefix: false
      };
}

export function parseUpdateExpressionPrefix(
  parser: ParserState,
  context: Context,
  inNew: 0 | 1,
  allowLHS: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.UpdateExpression {
  //  UpdateExpression ::
  //   LeftHandSideExpression ('++' | '--')?
  if (allowLHS === 0) report(parser, Errors.Unexpected);
  if (inNew === 1) report(parser, Errors.InvalidIncDecNew);

  const operator = KeywordDescTable[parser.token & Token.Type] as ESTree.UpdateOperator;

  nextToken(parser, context, /* allowRegExp */ 1);

  const arg = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 0);

  if (parser.assignable === 0) {
    report(parser, Errors.InvalidIncDecTarget);
  }

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'UpdateExpression',
        argument: arg,
        operator,
        prefix: true,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'UpdateExpression',
        argument: arg,
        operator,
        prefix: true
      };
}

export function parseUnaryExpression(
  parser: ParserState,
  context: Context,
  inNew: 0 | 1,
  allowLHS: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.UnaryExpression {
  // UnaryExpression ::
  //   PostfixExpression
  //   'delete' UnaryExpression
  //   'void' UnaryExpression
  //   'typeof' UnaryExpression
  //   '++' UnaryExpression
  //   '--' UnaryExpression
  //   '+' UnaryExpression
  //   '-' UnaryExpression
  //   '~' UnaryExpression
  //   '!' UnaryExpression
  //   [+Await] AwaitExpression[?Yield]
  if (allowLHS === 0) report(parser, Errors.Unexpected);

  if (inNew === 1) report(parser, Errors.InvalidNewUnary, KeywordDescTable[parser.token & Token.Type]);

  const unaryOperator = parser.token;

  nextToken(parser, context, /* allowRegExp */ 1);

  const arg = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 0);

  if (parser.token === Token.Exponentiate) report(parser, Errors.InvalidExponentationLHS);

  if (context & Context.Strict && unaryOperator === Token.DeleteKeyword && arg.type === 'Identifier') {
    // "delete identifier" is a syntax error in strict mode.
    report(parser, Errors.StrictDelete);
  }

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'UnaryExpression',
        operator: KeywordDescTable[unaryOperator & Token.Type] as ESTree.UnaryOperator,
        argument: arg,
        prefix: true,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'UnaryExpression',
        operator: KeywordDescTable[unaryOperator & Token.Type] as ESTree.UnaryOperator,
        argument: arg,
        prefix: true
      };
}

/**
 * parseArrayLiteralExpression
 * https://tc39.github.io/ecma262/#prod-ArrayLiteralExpression
 *
 * ArrayLiteralExpression :
 *   [ Elision(opt) ]
 *   [ ElementList ]
 *   [ ElementList, Elision(opt) ]
 *
 * ElementList :
 *   Elision(opt) AssignmentExpression
 *   ElementList, Elision(opt) AssignmentExpression
 *
 * Elision :
 *  ,
 *  Elision ,
 */
export function parseArrayLiteral(
  parser: ParserState,
  context: Context,
  skipInitializer: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ArrayExpression {
  const expr: any = parseArrayExpressionOrPattern(
    parser,
    context,
    void 0,
    skipInitializer,
    0,
    inGroup,
    BindingKind.Tail,
    Origin.None,
    start,
    line,
    column
  );

  if (
    (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat &&
    parser.flags & Flags.SeenProto
  ) {
    report(parser, Errors.DuplicateProto);
  }

  if (parser.flags & Flags.MustDestruct) {
    report(parser, Errors.InvalidShorthandPropInit);
  }

  return expr as any;
}

export function parseAssignmentOrPattern(
  parser: ParserState,
  context: Context,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  left: ESTree.Expression,
  operator: any,
  start: number,
  line: number,
  column: number
): any {
  const right = parseExpression(parser, context, inGroup);
  parser.assignable = 0;
  return context & Context.OptionsLoc
    ? isPattern
      ? {
          type: 'AssignmentPattern',
          left,
          right,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'AssignmentExpression',
          left,
          operator,
          right,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
    : isPattern
    ? {
        type: 'AssignmentPattern',
        left,
        right
      }
    : {
        type: 'AssignmentExpression',
        left,
        operator,
        right
      };
}

export function parseArrayExpressionOrPattern(
  parser: ParserState,
  context: Context,
  scope: any,
  skipInitializer: 0 | 1,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  nextToken(parser, context, /* allowRegExp */ 1);

  const elements: (ESTree.Identifier | ESTree.AssignmentExpression | null)[] = [];

  let conjuncted: Flags = Flags.Empty;

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  while (parser.token !== Token.RightBracket) {
    if (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
      elements.push(null);
    } else {
      let left: any;

      const { token, start, line, column, tokenValue } = parser;

      if (token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
        left = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);

        if (parser.token === Token.Assign) {
          if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

          nextToken(parser, context, /* allowRegExp */ 1);

          addVarOrBlock(parser, context, scope, tokenValue, kind, origin);

          left = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);
        } else if (parser.token === Token.Comma || parser.token === Token.RightBracket) {
          if (parser.assignable === 0) {
            conjuncted |= Flags.NotDestructible;
          } else {
            addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
          }
        } else {
          conjuncted |=
            kind & BindingKind.ArgumentList
              ? Flags.AssignableDestruct
              : (kind & BindingKind.Tail) !== BindingKind.Tail
              ? Flags.NotDestructible
              : 0;

          left = parseMemberExpression(parser, context, left, 0, 0, start, line, column);

          if (parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
            if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;
            left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
          } else if (parser.token !== Token.Assign) {
            conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
          }
        }
      } else if (token & Token.IsPatternStart) {
        left =
          parser.token === Token.LeftBrace
            ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column)
            : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column);

        parser.assignable = (conjuncted |= parser.flags) & Flags.NotDestructible ? 0 : 1;

        if (parser.token === Token.Comma || parser.token === Token.RightBracket) {
          if (parser.assignable === 0) {
            conjuncted |= Flags.NotDestructible;
          }
        } else {
          if (parser.flags & Flags.MustDestruct) {
            report(parser, Errors.InvalidDestructuringTarget);
          }
          left = parseMemberExpression(parser, context, left, 0, 0, start, line, column);
          conjuncted = parser.assignable === 0 ? Flags.NotDestructible : 0;

          if (parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
            left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
          } else if (parser.token !== Token.Assign) {
            conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
          }
        }
      } else if (token === Token.Ellipsis) {
        left = parseSpreadOrRestElement(
          parser,
          context,
          scope,
          Token.RightBracket,
          isPattern,
          /* isAsync */ 0,
          kind,
          origin,
          start,
          line,
          column
        );

        conjuncted |= parser.flags;

        if (parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
          report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & Token.Type]);
        }
      } else {
        left = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

        if (parser.token !== Token.Comma && parser.token !== Token.RightBracket) {
          left = parseAssignmentExpression(parser, context, isPattern, 0, 0, left, start, line, column);
          if ((kind & (BindingKind.Tail | BindingKind.ArgumentList)) === 0 && token === Token.LeftParen)
            conjuncted |= Flags.NotDestructible;
        } else if (parser.assignable === 0) {
          conjuncted |= Flags.NotDestructible;
        } else if (token === Token.LeftParen) {
          conjuncted |=
            parser.assignable === 1 && kind & (BindingKind.Tail | BindingKind.ArgumentList)
              ? Flags.AssignableDestruct
              : Flags.NotDestructible;
        }
      }

      elements.push(left);

      if (parser.token !== Token.Comma) break;

      nextToken(parser, context, /* allowRegExp */ 1);
    }
  }

  consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);

  const type = isPattern ? 'ArrayPattern' : 'ArrayExpression';

  const node =
    context & Context.OptionsLoc
      ? {
          type,
          elements,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type,
          elements
        };

  if (skipInitializer === 0 && parser.token & Token.IsAssignOp) {
    return parseArrayOrObjectAssignmentPattern(
      parser,
      context,
      conjuncted,
      isPattern,
      inGroup,
      curStart,
      curLine,
      curColumn,
      node
    );
  }

  parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

  return node;
}

export function parseArrayOrObjectAssignmentPattern(
  parser: ParserState,
  context: Context,
  conjuncted: Flags | Flags,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number,
  left: any
): any {
  if (parser.token !== Token.Assign) report(parser, Errors.CantAssignTo);

  if (isPattern === 0) reinterpretToPattern(parser, left);

  if ((conjuncted & Flags.NotDestructible) === Flags.NotDestructible) report(parser, Errors.CantAssignTo);

  nextToken(parser, context, /* allowRegExp */ 1);

  const node = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);

  parser.flags =
    ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) |
    ((conjuncted | Flags.MustDestruct | Flags.SeenProto) ^ (Flags.SeenProto | Flags.MustDestruct));

  return node;
}

export function parseFunctionExpression(
  parser: ParserState,
  context: Context,
  isAsync: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.FunctionExpression {
  nextToken(parser, context, /* allowRegExp */ 1);

  const isGenerator = optionalBit(parser, context, Token.Multiply);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  let id: ESTree.Identifier | null = null;

  let scope: ScopeState = {
    parent: void 0,
    type: ScopeKind.Block
  };

  if ((parser.token & (Token.Contextual | Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) !== 0) {
    scope = {
      parent: {
        parent: void 0,
        type: ScopeKind.Block
      },
      type: ScopeKind.FunctionRoot,
      scopeError: void 0
    };

    validateFunctionName(
      parser,
      ((context & 0b0000000000000000000_1100_00000000) << 11) | generatorAndAsyncFlags,
      parser.token
    );

    id = parseIdentifier(parser, context);
  }
  context =
    ((context | 0b0000001111011000000_0000_00000000) ^ 0b0000001111011000000_0000_00000000) |
    Context.AllowNewTarget |
    generatorAndAsyncFlags;

  return parseFunctionLiteral(
    parser,
    context,
    scope,
    id,
    void 0,
    FunctionFlag.None,
    'FunctionExpression',
    /* isMethod */ 0,
    start,
    line,
    column
  );
}

export function parseFunctionLiteral(
  parser: ParserState,
  context: Context,
  scope: any,
  id: any,
  firstRestricted: Token | undefined,
  flags: FunctionFlag,
  type: 'FunctionDeclaration' | 'FunctionExpression',
  isMethod: 0 | 1,
  start: number,
  line: number,
  column: number
): any {
  scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.FunctionParams,
    scopeError: void 0
  };

  const params = parseFormalParams(parser, context | Context.InArgumentList, scope, BindingKind.ArgumentList, isMethod);

  const body = parseFunctionBody(
    parser,
    (context | Context.InGlobal | Context.InSwitch | Context.InIteration) ^
      (Context.InGlobal | Context.InSwitch | Context.InIteration),
    {
      parent: scope,
      type: ScopeKind.FunctionBody,
      scopeError: void 0
    },
    firstRestricted,
    flags,
    scope.scopeError
  );

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type,
        params,
        body,
        async: (context & Context.InAwaitContext) !== 0,
        generator: (context & Context.InYieldContext) !== 0,
        id,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type,
        params,
        body,
        async: (context & Context.InAwaitContext) !== 0,
        generator: (context & Context.InYieldContext) !== 0,
        id
      };
}

export function parseFunctionBody(
  parser: ParserState,
  context: Context,
  scope: any,
  firstRestricted: Token | undefined,
  flags: FunctionFlag,
  scopeError: any
): any {
  const { start, line, column } = parser;

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 1);

  const body: any[] = [];
  const prevContext = context;
  const allowDirectives = context & Context.OptionsDirectives;

  let isStrictDirective: 0 | 1 = 0;

  if (parser.token !== Token.RightBrace) {
    while (parser.token === Token.StringLiteral) {
      const { index, start, line, column, tokenValue, isUnicodeEscape } = parser;
      let expression = parseLiteral(parser, context);
      if (isExactlyStrictDirective(parser, index, start, tokenValue)) {
        isStrictDirective = 1;
        context |= Context.Strict;
        // TC39 deemed "use strict" directives to be an error when occurring
        // in the body of a function with non-simple parameter list, on
        // 29/7/2015. https://goo.gl/ueA7Ln
        if (parser.flags & Flags.SimpleParameterList) report(parser, Errors.IllegalUseStrict);

        if (parser.flags & Flags.Octals) report(parser, Errors.StrictOctalLiteral);
      }

      if (isStrictDirective === 0) {
        expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
      }
      consumeSemicolon(parser, context);

      body.push(
        allowDirectives
          ? context & Context.OptionsLoc
            ? {
                type: 'ExpressionStatement',
                expression,
                directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'ExpressionStatement',
                expression,
                directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : tokenValue
              }
          : context & Context.OptionsLoc
          ? {
              type: 'ExpressionStatement',
              expression,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ExpressionStatement',
              expression
            }
      );
    }

    if (context & Context.Strict) {
      if (firstRestricted) {
        if ((firstRestricted & Token.FutureReserved) === Token.FutureReserved) {
          report(parser, Errors.Unexpected);
        }
      }
      if (scopeError && (prevContext & Context.Strict) === 0 && (context & Context.InGlobal) === 0) {
        reportScopeError(scopeError);
      }

      if (parser.flags & Flags.StrictEvalArguments) report(parser, Errors.StrictEvalArguments);

      if (parser.flags & Flags.HasStrictReserved) report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  parser.flags =
    (parser.flags | Flags.StrictEvalArguments | Flags.HasStrictReserved | Flags.Octals) ^
    (Flags.StrictEvalArguments | Flags.HasStrictReserved | Flags.Octals);

  while (parser.token !== Token.RightBrace) {
    body.push(parseStatementListItem(parser, context, scope, Origin.TopLevel, null, null));
  }

  consume(parser, context, Token.RightBrace, flags & FunctionFlag.IsDeclaration ? 1 : 0);

  parser.flags = (parser.flags | Flags.SimpleParameterList | Flags.Octals) ^ (Flags.SimpleParameterList | Flags.Octals);

  return context & Context.OptionsLoc
    ? {
        type: 'BlockStatement',
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'BlockStatement',
        body
      };
}

export function parseClassExpression(
  parser: ParserState,
  context: Context,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.ClassExpression {
  nextToken(parser, context, /* allowRegExp */ 0);

  // Second set of context masks to fix 'super' edge cases
  let inheritedContext =
    (context | Context.InConstructor | Context.DisallowIn) ^ (Context.DisallowIn | Context.InConstructor);

  context |= Context.Strict;

  let id: ESTree.Identifier | null = null;

  if (
    parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier) &&
    parser.token !== Token.ExtendsKeyword
  ) {
    const { token, start, line, column, tokenValue } = parser;

    if (isStrictReservedWord(parser, context, token)) report(parser, Errors.UnexpectedStrictReserved);

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  }
  return parseClassDeclarationOrExpressionRest(
    parser,
    context,
    inheritedContext,
    id,
    /* isDecl */ 0,
    'ClassExpression',
    curStart,
    curLine,
    curColumn
  ) as ESTree.ClassExpression;
}

export function parseClassDeclarationOrExpressionRest(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  id: any,
  isDecl: 0 | 1,
  type: 'ClassDeclaration' | 'ClassExpression',
  start: number,
  line: number,
  column: number
): any {
  let superClass: ESTree.Expression | null = null;

  if (parser.token === Token.ExtendsKeyword) {
    nextToken(parser, context, /* allowRegExp */ 1);
    superClass = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 0, 0);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }

  const body = parseClassBody(parser, inheritedContext, context, isDecl);

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type,
        id,
        superClass,
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type,
        id,
        superClass,
        body
      };
}

export function parseClassBody(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  isDecl: 0 | 1
): ESTree.ClassBody {
  const { start, line, column } = parser;

  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 1);

  const body: ESTree.MethodDefinition[] = [];

  parser.flags = (parser.flags | Flags.HasConstructor) ^ Flags.HasConstructor;

  while (parser.token !== Token.RightBrace) {
    if (parser.token === Token.Semicolon) {
      nextToken(parser, context, /* allowRegExp */ 0);
      continue;
    }
    body.push(
      parseClassElementList(
        parser,
        context,
        inheritedContext,
        null,
        /* isStatic */ 0,
        /* isComputed */ 0,
        PropertyKind.None,
        parser.start,
        parser.line,
        parser.column
      )
    );
  }

  consume(parser, context, Token.RightBrace, isDecl ? 1 : 0);

  return context & Context.OptionsLoc
    ? {
        type: 'ClassBody',
        body,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ClassBody',
        body
      };
}

export function parseClassElementList(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  key: any,
  isStatic: 0 | 1,
  isComputed: 0 | 1,
  type: PropertyKind,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  const { token, start, line, column } = parser;

  if (token & (Token.Keyword | Token.Contextual | Token.FutureReserved | Token.IsIdentifier)) {
    key = parseIdentifier(parser, context);

    if (parser.token !== Token.LeftParen) {
      switch (token) {
        case Token.StaticKeyword:
          if (isStatic === 0) {
            return parseClassElementList(
              parser,
              context,
              inheritedContext,
              key,
              /* isStatic */ 1,
              isComputed,
              type,
              start,
              line,
              column
            );
          }
          break;

        case Token.AsyncKeyword:
          type |= PropertyKind.Async | (optionalBit(parser, context, Token.Multiply) ? PropertyKind.Generator : 0);
          break;

        case Token.GetKeyword:
          type |= PropertyKind.Getter;
          break;

        case Token.SetKeyword:
          type |= PropertyKind.Setter;
          break;

        default: // ignore
      }
    }
  } else if ((token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
    key = parseLiteral(parser, context);
  } else if (token === Token.LeftBracket) {
    isComputed = 1;
    key = parseComputedPropertyName(parser, inheritedContext);
  } else if (token === Token.Multiply) {
    type |= PropertyKind.Generator;
    nextToken(parser, context, /* allowRegExp */ 0); // skip: '*'
  } else {
    report(parser, Errors.Unexpected);
  }

  if (type & (PropertyKind.Generator | PropertyKind.Async | PropertyKind.GetSet)) {
    if (parser.token & (Token.Keyword | Token.Contextual | Token.FutureReserved | Token.IsIdentifier)) {
      key = parseIdentifier(parser, context);
    } else if ((parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
      key = parseLiteral(parser, context);
    } else if (parser.token === Token.LeftBracket) {
      isComputed = 1;
      key = parseComputedPropertyName(parser, context);
    } else report(parser, Errors.InvalidKeyToken);
  }

  if (isComputed === 0) {
    if (parser.tokenValue === 'constructor') {
      if (isStatic === 0 && parser.token === Token.LeftParen) {
        if (type & (PropertyKind.GetSet | PropertyKind.Async | PropertyKind.Generator)) {
          report(parser, Errors.InvalidConstructor, 'accessor');
        }
        if ((context & Context.SuperCall) !== Context.SuperCall) {
          if (parser.flags & Flags.HasConstructor) report(parser, Errors.DuplicateConstructor);
          else parser.flags |= Flags.HasConstructor;
        }
      }
      type |= PropertyKind.Constructor;
    } else if (
      type & (PropertyKind.Static | PropertyKind.GetSet | PropertyKind.Generator | PropertyKind.Async) &&
      parser.tokenValue === 'prototype'
    ) {
      report(parser, Errors.StaticPrototype);
    }
  }

  const value =
    type & (PropertyKind.Setter | PropertyKind.Setter)
      ? parseGetterSetter(parser, context | Context.Strict, type)
      : parseMethodDefinition(parser, context | Context.Strict, type);

  const kind =
    isStatic === 0 && type & PropertyKind.Constructor
      ? 'constructor'
      : type & PropertyKind.Getter
      ? 'get'
      : type & PropertyKind.Setter
      ? 'set'
      : 'method';

  return context & Context.OptionsLoc
    ? {
        type: 'MethodDefinition',
        kind,
        static: isStatic === 1,
        computed: isComputed === 1,
        key,
        value,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: 'MethodDefinition',
        kind,
        static: isStatic === 1,
        computed: isComputed === 1,
        key,
        value
      };
}

export function parseIdentifierFromValue(
  parser: ParserState,
  context: Context,
  name: string,
  start: number,
  line: number,
  column: number
): ESTree.Identifier {
  return context & Context.OptionsLoc
    ? {
        type: 'Identifier',
        name,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Identifier',
        name
      };
}

export function parseComputedPropertyName(parser: ParserState, context: Context, inGroup: 0 | 1 = 0) {
  nextToken(parser, context, /* allowRegExp */ 1);
  const key = parseExpression(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, inGroup);
  consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);
  return key;
}

export function parseMethodDefinition(
  parser: ParserState,
  context: Context,
  kind: PropertyKind
): ESTree.FunctionExpression {
  const modifierFlags =
    (kind & PropertyKind.Constructor) === 0 ? 0b0000001111010000000_0000_00000000 : 0b0000000111000000000_0000_00000000;

  context =
    ((context | modifierFlags) ^ modifierFlags) |
    ((kind & 0b0000000000000000000_0000_01011000) << 18) |
    0b0000110000001000000_0000_00000000 |
    (kind & PropertyKind.Async ? Context.InAwaitContext : 0) |
    (kind & PropertyKind.Generator ? Context.InYieldContext : 0);

  return parseFunctionLiteral(
    parser,
    (context | 0b0001000000000000001_0000_00000000 | Context.InGlobal) ^
      (0b0001000000000000001_0000_00000000 | Context.InGlobal),
    {
      parent: {
        parent: void 0,
        type: ScopeKind.Block
      },
      type: ScopeKind.FunctionParams,
      scopeError: void 0
    },
    null,
    void 0,
    FunctionFlag.None,
    'FunctionExpression',
    /* isMethod */ 1,
    parser.start,
    parser.line,
    parser.column
  );
}

export function parseGetterSetter(parser: ParserState, context: Context, kind: PropertyKind): any {
  const { start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  parser.flags = (parser.flags | Flags.SimpleParameterList) ^ Flags.SimpleParameterList;

  const params: ESTree.Parameter[] = [];

  const scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.FunctionParams,
    scopeError: void 0
  };

  if (parser.token !== Token.RightParen) {
    if (kind & PropertyKind.Getter) report(parser, Errors.AccessorWrongArgs, 'Getter', 'no', 's');

    const modifierFlags =
      (kind & PropertyKind.Constructor) === 0
        ? 0b0000001111010000000_0000_00000000
        : 0b0000000111000000000_0000_00000000;

    context =
      ((context | modifierFlags) ^ modifierFlags) |
      ((kind & 0b0000000000000000000_0000_01011000) << 18) |
      0b0000110000001000000_0000_00000000 |
      ((context | Context.DisallowIn) ^ Context.DisallowIn);

    let argCount = 0;
    let left: any;

    let isSimpleParameterList: 0 | 1 = 0;
    while (parser.token !== Token.RightParen) {
      const { start, line, column, token, tokenValue } = parser;

      if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
        if ((context & Context.Strict) !== Context.Strict) {
          parser.flags |=
            ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.HasStrictReserved : 0) |
            (isEvalOrArguments(tokenValue) ? Flags.StrictEvalArguments : 0);
        }
        left = parseAndClassifyIdentifier(
          parser,
          context,
          scope,
          token,
          tokenValue,
          kind | BindingKind.ArgumentList,
          Origin.None,
          start,
          line,
          column,
          0
        );
      } else {
        if (parser.token === Token.LeftBracket) {
          left = parseArrayExpressionOrPattern(
            parser,
            context,
            scope,
            1,
            1,
            0,
            BindingKind.ArgumentList,
            Origin.None,
            start,
            line,
            column
          );
        } else if (parser.token === Token.LeftBrace) {
          left = parseObjectLiteralOrPattern(
            parser,
            context,
            scope,
            1,
            1,
            0,
            BindingKind.ArgumentList,
            Origin.None,
            start,
            line,
            column
          );
        } else if (parser.token === Token.Ellipsis) {
          if (kind & PropertyKind.Setter) report(parser, Errors.BadSetterRestParameter);

          left = parseSpreadOrRestElement(
            parser,
            context,
            scope,
            Token.RightParen,
            1,
            0,
            BindingKind.ArgumentList,
            Origin.None,
            start,
            line,
            column
          );
        } else {
          report(parser, Errors.Unexpected);
        }

        isSimpleParameterList = 1;

        if (parser.flags & (Flags.AssignableDestruct | Flags.NotDestructible)) {
          report(parser, Errors.InvalidBindingDestruct);
        }
      }

      if (parser.token === Token.Assign) {
        isSimpleParameterList = 1;
        nextToken(parser, context, /* allowRegExp */ 1);
        left = parseAssignmentOrPattern(parser, context, /* isPattern */ 1, 0, left, '=', start, line, column);
      }

      argCount++;

      params.push(left);

      if (parser.token !== Token.Comma) break;

      nextToken(parser, context, /* allowRegExp */ 0);
    }

    if (kind & PropertyKind.Setter && argCount !== 1) {
      report(parser, Errors.AccessorWrongArgs, 'Setter', 'one', '');
    }

    if (scope && scope.scopeError !== void 0) reportScopeError(scope.scopeError);

    if (isSimpleParameterList === 1) parser.flags |= Flags.SimpleParameterList;
  } else if (kind & PropertyKind.Setter) {
    report(parser, Errors.AccessorWrongArgs, 'Setter', 'one', '');
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  const body = parseFunctionBody(
    parser,
    (context | 0b0001000000000000001_0000_00000000 | Context.InGlobal) ^
      (0b0001000000000000001_0000_00000000 | Context.InGlobal),
    scope,
    void 0,
    FunctionFlag.None,
    void 0
  );

  return context & Context.OptionsLoc
    ? {
        type: 'FunctionExpression',
        params,
        body,
        async: (kind & PropertyKind.Async) === 1,
        generator: (kind & PropertyKind.Generator) === 1,
        id: null,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'FunctionExpression',
        params,
        body,
        async: (kind & PropertyKind.Async) === 1,
        generator: (kind & PropertyKind.Generator) === 1,
        id: null
      };
}

// See V8 - https://github.com/v8/v8/blob/master/src/parsing/parser-base.h#L3566

export function parseFormalParams(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  kind: BindingKind,
  isMethod: 0 | 1
): ESTree.Parameter[] {
  // FormalParameters[Yield] :
  //   [empty]
  //   FunctionRestParameter[?Yield]
  //   FormalParameterList[?Yield]
  //   FormalParameterList[?Yield] ,
  //   FormalParameterList[?Yield] , FunctionRestParameter[?Yield]
  //
  // FormalParameterList[Yield] :
  //   FormalParameter[?Yield]
  //   FormalParameterList[?Yield] , FormalParameter[?Yield]

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  nextToken(parser, context, /* allowRegExp */ 0);

  const params: ESTree.Parameter[] = [];

  parser.flags = (parser.flags | Flags.SimpleParameterList) ^ Flags.SimpleParameterList;

  let isSimpleParameterList: 0 | 1 = 0;

  while (parser.token !== Token.RightParen) {
    let left: any;

    const { start, line, column, token, tokenValue } = parser;

    if (token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
      if ((context & Context.Strict) !== Context.Strict) {
        parser.flags |=
          ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.HasStrictReserved : 0) |
          (isEvalOrArguments(tokenValue) ? Flags.StrictEvalArguments : 0);
      }

      left = parseAndClassifyIdentifier(
        parser,
        context,
        scope,
        token,
        tokenValue,
        kind | BindingKind.ArgumentList,
        Origin.None,
        start,
        line,
        column,
        0
      );
    } else {
      if (parser.token === Token.LeftBracket) {
        left = parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, kind, Origin.None, start, line, column);
        isSimpleParameterList = 1;
      } else if (parser.token === Token.LeftBrace) {
        left = parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, kind, Origin.None, start, line, column);
        isSimpleParameterList = 1;
      } else if (parser.token === Token.Ellipsis) {
        left = parseSpreadOrRestElement(
          parser,
          context,
          scope,
          Token.RightParen,
          1,
          0,
          kind,
          Origin.None,
          start,
          line,
          column
        );
        isSimpleParameterList = 1;
      } else {
        report(parser, Errors.Unexpected);
      }

      if (parser.flags & (Flags.AssignableDestruct | Flags.NotDestructible)) {
        report(parser, Errors.InvalidBindingDestruct);
      }
    }

    if (parser.token === Token.Assign) {
      nextToken(parser, context, /* allowRegExp */ 1);

      isSimpleParameterList = 1;

      left = parseAssignmentOrPattern(parser, context, /* isPattern */ 1, 0, left, '=', start, line, column);
    }

    params.push(left);

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 0);

    if (parser.token === Token.RightParen) {
      // allow the trailing comma
      break;
    }
  }

  if (scope.scopeError !== void 0 && (isMethod === 1 || isSimpleParameterList === 1 || context & Context.Strict)) {
    reportScopeError(scope.scopeError);
  }
  parser.flags |= isSimpleParameterList === 1 ? Flags.SimpleParameterList : 0;

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);
  return params;
}

/**
 * parseObjectLiteralExpression
 * https://tc39.github.io/ecma262/#prod-Literal
 *
 * ObjectLiteralExpression :
 *   { }
 *   { PropertyDefinitionList }
 *
 * PropertyDefinitionList :
 *   PropertyDefinition
 *   PropertyDefinitionList, PropertyDefinition
 *
 * PropertyDefinition :
 *   IdentifierName
 *   PropertyName : AssignmentExpression
 *
 * PropertyName :
 *   IdentifierName
 *   StringLiteral
 *   NumericLiteral
 */
export function parseObjectLiteral(
  parser: ParserState,
  context: Context,
  skipInitializer: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ObjectExpression {
  const expr = parseObjectLiteralOrPattern(
    parser,
    context,
    void 0,
    skipInitializer,
    /* isPattern */ 0,
    inGroup,
    BindingKind.Tail,
    Origin.None,
    start,
    line,
    column
  );
  if (
    (context & Context.OptionsDisableWebCompat) !== Context.OptionsDisableWebCompat &&
    parser.flags & Flags.SeenProto
  ) {
    report(parser, Errors.DuplicateProto);
  }
  if (parser.flags & Flags.MustDestruct) {
    report(parser, Errors.InvalidShorthandPropInit);
  }

  return expr as any;
}

export function parseObjectLiteralOrPattern(
  parser: ParserState,
  context: Context,
  scope: any,
  skipInitializer: 0 | 1,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  type: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  nextToken(parser, context, /* allowRegExp */ 0); // skips: '{'

  const properties: any[] = [];

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  let conjuncted: Flags = Flags.Empty;
  let prototypeCount = 0;
  let key: any = null;
  let value;
  let state = PropertyKind.None;
  let operator: any;
  let kind = 'init';

  while (parser.token !== Token.RightBrace) {
    const { token, start, line, column, tokenValue } = parser;

    if (token === Token.Ellipsis) {
      properties.push(
        parseSpreadOrRestElement(
          parser,
          context,
          scope,
          Token.RightBrace,
          isPattern,
          0,
          type,
          origin,
          start,
          line,
          column
        )
      );
    } else {
      state = PropertyKind.None;

      if (token & (Token.Contextual | Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
        key = parseIdentifier(parser, context);

        if (parser.token === Token.Comma || parser.token === Token.RightBrace || parser.token === Token.Assign) {
          state |= PropertyKind.Shorthand;

          if (context & Context.Strict && isEvalOrArguments(tokenValue)) {
            conjuncted |= Flags.NotDestructible;
          } else {
            validateIdentifier(parser, context, type, token);
          }

          addVarOrBlock(parser, context, scope, tokenValue, type, origin);

          if (parser.token === Token.Assign) {
            conjuncted |= Flags.MustDestruct;
            nextToken(parser, context, /* allowRegExp */ 1);
            value = parseAssignmentOrPattern(parser, context, isPattern, inGroup, key, '=', start, line, column);
          } else {
            value = key;
          }
        } else if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1);

          const { start, line, column } = parser;

          if (tokenValue === '__proto__') prototypeCount++;

          if (parser.token & (Token.Contextual | Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
            const { token: tokenAfterColon, tokenValue: valueAfterColon } = parser;

            value = parsePrimaryExpression(parser, context, type, 0, /* allowLHS */ 1, 1, 0, start, line, column);

            const { token } = parser;

            value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (token === Token.Assign || token === Token.RightBrace || token === Token.Comma) {
                if (parser.assignable === 0) {
                  conjuncted |= Flags.NotDestructible;
                } else if ((tokenAfterColon & (Token.Contextual | Token.IsIdentifier)) !== 0) {
                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                }
              } else {
                conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
              if (parser.assignable === 0) {
                conjuncted |= Flags.NotDestructible;
              } else if (token !== Token.Assign) {
                conjuncted |= Flags.AssignableDestruct;
              } else {
                addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
              }
              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
            } else {
              conjuncted |= Flags.NotDestructible;
              if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
                value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
              }
              if (parser.token === Token.QuestionMark) {
                value = parseConditionalExpression(parser, context, value, start, line, column);
              }
            }
          } else if ((parser.token & Token.IsPatternStart) === Token.IsPatternStart) {
            value =
              parser.token === Token.LeftBrace
                ? parseObjectLiteralOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    0,
                    type,
                    origin,
                    start,
                    line,
                    column
                  )
                : parseArrayExpressionOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    0,
                    type,
                    origin,
                    start,
                    line,
                    column
                  );

            conjuncted = parser.flags;

            parser.assignable = conjuncted & Flags.NotDestructible ? 0 : 1;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
            } else if (parser.flags & Flags.MustDestruct) {
              report(parser, Errors.InvalidDestructuringTarget);
            } else {
              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
                operator = KeywordDescTable[parser.token & Token.Type] as ESTree.AssignmentOperator;

                nextToken(parser, context, /* allowRegExp */ 1);

                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  operator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }
                if (parser.token === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

            conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
            } else {
              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if (parser.token !== Token.Comma && token !== Token.RightBrace) {
                if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;
                value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
              }
            }
          }
        } else if (parser.token === Token.LeftBracket) {
          conjuncted |= Flags.NotDestructible;

          if (token === Token.AsyncKeyword) state |= PropertyKind.Async;

          state |=
            (token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method) | PropertyKind.Computed;

          key = parseComputedPropertyName(parser, context);

          value = parseMethodDefinition(parser, context, state);
        } else if (parser.token & (Token.Keyword | Token.FutureReserved | Token.Contextual | Token.IsIdentifier)) {
          conjuncted |= Flags.NotDestructible;

          key = parseIdentifier(parser, context);

          if (token === Token.AsyncKeyword) state |= PropertyKind.Async;

          state |=
            token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method;

          value =
            state & PropertyKind.GetSet
              ? parseGetterSetter(parser, context, state)
              : parseMethodDefinition(parser, context, state);
        } else if (parser.token === Token.LeftParen) {
          conjuncted |= Flags.NotDestructible;

          state |= PropertyKind.Method;

          value = parseMethodDefinition(parser, context, state);
        } else if (parser.token === Token.Multiply) {
          if (token === Token.GetKeyword || token === Token.SetKeyword) {
            report(parser, Errors.InvalidGeneratorGetter);
          }

          conjuncted |= Flags.NotDestructible;

          nextToken(parser, context, /* allowRegExp */ 0);

          state |=
            PropertyKind.Generator | PropertyKind.Method | (token === Token.AsyncKeyword ? PropertyKind.Async : 0);

          if (parser.token & (Token.Keyword | Token.FutureReserved | Token.Contextual | Token.IsIdentifier)) {
            key = parseIdentifier(parser, context);
          } else if ((parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
            key = parseLiteral(parser, context);
          } else if (parser.token === Token.LeftBracket) {
            state |= PropertyKind.Computed;
            key = parseComputedPropertyName(parser, context);
          } else {
            report(parser, Errors.Unexpected);
          }
          value = parseMethodDefinition(parser, context, state);
        } else if ((parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
          if (token === Token.AsyncKeyword) state |= PropertyKind.Async;

          state |=
            token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method;

          conjuncted |= Flags.NotDestructible;

          key = parseLiteral(parser, context);

          value =
            state & PropertyKind.GetSet
              ? parseGetterSetter(parser, context, state)
              : parseMethodDefinition(parser, context, state);
        } else {
          report(parser, Errors.Unexpected);
        }
      } else if ((parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
        key = parseLiteral(parser, context);

        if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1);

          const { start, line, column } = parser;

          if (tokenValue === '__proto__') prototypeCount++;

          if (parser.token & (Token.Contextual | Token.IsIdentifier)) {
            value = parsePrimaryExpression(parser, context, type, 0, /* allowLHS */ 1, 1, 0, start, line, column);
            const { token, tokenValue: valueAfterColon } = parser;
            value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (token === Token.Assign || token === Token.RightBrace || token === Token.Comma) {
                if (parser.assignable === 0) {
                  conjuncted |= Flags.NotDestructible;
                } else if (scope) {
                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                }
              } else {
                conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else if (parser.token === Token.Assign) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
            } else {
              conjuncted |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
            }
          } else if ((parser.token & Token.IsPatternStart) === Token.IsPatternStart) {
            value =
              parser.token === Token.LeftBrace
                ? parseObjectLiteralOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    0,
                    type,
                    origin,
                    start,
                    line,
                    column
                  )
                : parseArrayExpressionOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    inGroup,
                    type,
                    origin,
                    start,
                    line,
                    column
                  );

            conjuncted = parser.flags;

            parser.assignable = conjuncted & Flags.NotDestructible ? 0 : 1;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
            } else if (parser.flags & Flags.MustDestruct) {
              report(parser, Errors.InvalidDestructuringTarget);
            } else {
              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
                operator = KeywordDescTable[parser.token & Token.Type] as ESTree.AssignmentOperator;

                nextToken(parser, context, /* allowRegExp */ 1);

                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  operator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }

                if (parser.token === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, 1, 1);

            conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) {
                conjuncted |= Flags.NotDestructible;
              }
            } else {
              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if (parser.token !== Token.Comma && parser.token !== Token.RightBrace) {
                if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;

                value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
              }
            }
          }
        } else if (parser.token === Token.LeftParen) {
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          conjuncted |= Flags.NotDestructible;
        } else {
          report(parser, Errors.Unexpected);
        }
      } else if (parser.token === Token.LeftBracket) {
        key = parseComputedPropertyName(parser, context, inGroup);
        state |= PropertyKind.Computed;

        if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1); // skip ':'

          const { start, line, column, tokenValue, token: tokenAfterColon } = parser;

          if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
            value = parsePrimaryExpression(parser, context, type, 1, 1, 1, inGroup, start, line, column);

            const { token } = parser;

            value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

            if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
              conjuncted |=
                parser.assignable === 0 ? Flags.NotDestructible : token === Token.Assign ? 0 : Flags.AssignableDestruct;

              operator = KeywordDescTable[parser.token & Token.Type] as ESTree.AssignmentOperator;

              nextToken(parser, context, /* allowRegExp */ 1);

              value = parseAssignmentOrPattern(
                parser,
                context,
                isPattern,
                0,
                value as any,
                operator,
                start,
                line,
                column
              );
            } else if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (token === Token.Assign || token === Token.RightBrace || token === Token.Comma) {
                if (parser.assignable === 0) {
                  conjuncted |= Flags.NotDestructible;
                } else if (scope && (tokenAfterColon & Token.IsIdentifier) === Token.IsIdentifier) {
                  addVarOrBlock(parser, context, scope, tokenValue, type, origin);
                }
              } else {
                conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else {
              conjuncted |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
            }
          } else if ((parser.token & Token.IsPatternStart) === Token.IsPatternStart) {
            value =
              parser.token === Token.LeftBrace
                ? parseObjectLiteralOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    0,
                    type,
                    origin,
                    start,
                    line,
                    column
                  )
                : parseArrayExpressionOrPattern(
                    parser,
                    context,
                    scope,
                    0,
                    isPattern,
                    0,
                    type,
                    origin,
                    start,
                    line,
                    column
                  );

            conjuncted = parser.flags;

            parser.assignable = conjuncted & Flags.NotDestructible ? 0 : 1;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
            } else {
              if (conjuncted & Flags.MustDestruct) report(parser, Errors.InvalidShorthandPropInit);

              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 0 ? conjuncted | Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
                if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;

                operator = KeywordDescTable[parser.token & Token.Type] as ESTree.AssignmentOperator;

                nextToken(parser, context, /* allowRegExp */ 1);

                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  operator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }
                if (parser.token === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

            conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if (parser.token === Token.Comma || parser.token === Token.RightBrace) {
              if (parser.assignable === 0) conjuncted |= Flags.NotDestructible;
            } else {
              value = parseMemberExpression(parser, context, value, 0, 0, start, line, column);

              conjuncted = parser.assignable === 1 ? 0 : Flags.NotDestructible;

              if (parser.token !== Token.Comma && parser.token !== Token.RightBrace) {
                if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;
                value = parseAssignmentExpression(parser, context, isPattern, 0, 0, value, start, line, column);
              }
            }
          }
        } else if (parser.token === Token.LeftParen) {
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          conjuncted = Flags.NotDestructible;
        } else {
          report(parser, Errors.InvalidComputedPropName);
        }
      } else if (token === Token.Multiply) {
        consume(parser, context, Token.Multiply, /* allowRegExp */ 0);

        state |= PropertyKind.Generator;

        if (parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) {
          key = parseIdentifier(parser, context);

          state |= PropertyKind.Method;

          if (parser.token === Token.LeftParen) {
            conjuncted |= Flags.NotDestructible;
            value = parseMethodDefinition(parser, context, state);
          } else {
            report(parser, Errors.Unexpected);
          }
        } else if ((parser.token & Token.IsStringOrNumber) === Token.IsStringOrNumber) {
          key = parseLiteral(parser, context);
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          conjuncted |= Flags.NotDestructible;
        } else if (parser.token === Token.LeftBracket) {
          state |= PropertyKind.Computed | PropertyKind.Method;
          key = parseComputedPropertyName(parser, context);
          value = parseMethodDefinition(parser, context, state);
          conjuncted |= Flags.NotDestructible;
        } else {
          report(parser, Errors.Unexpected);
        }
      } else {
        report(parser, Errors.Unexpected);
      }

      parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

      kind = (state & PropertyKind.GetSet) === 0 ? 'init' : state & PropertyKind.Setter ? 'set' : 'get';

      properties.push(
        context & Context.OptionsLoc
          ? {
              type: 'Property',
              key,
              value,
              kind,
              computed: (state & PropertyKind.Computed) === PropertyKind.Computed,
              method: (state & PropertyKind.Method) === PropertyKind.Method,
              shorthand: (state & PropertyKind.Shorthand) === PropertyKind.Shorthand,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'Property',
              key,
              value,
              kind,
              computed: (state & PropertyKind.Computed) === PropertyKind.Computed,
              method: (state & PropertyKind.Method) === PropertyKind.Method,
              shorthand: (state & PropertyKind.Shorthand) === PropertyKind.Shorthand
            }
      );
    }

    conjuncted |= parser.flags;

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 0);
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ 0);

  if (prototypeCount > 1) conjuncted |= Flags.SeenProto;

  const node =
    context & Context.OptionsLoc
      ? {
          type: isPattern ? 'ObjectPattern' : 'ObjectExpression',
          properties,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: isPattern ? 'ObjectPattern' : 'ObjectExpression',
          properties
        };

  if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp && skipInitializer === 0) {
    return parseArrayOrObjectAssignmentPattern(
      parser,
      context,
      conjuncted,
      isPattern,
      inGroup,
      curStart,
      curLine,
      curColumn,
      node
    );
  }

  parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

  return node;
}

export function parseSpreadOrRestElement(
  parser: ParserState,
  context: Context,
  scope: any,
  closingToken: Token,
  isPattern: 0 | 1,
  isAsync: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  nextToken(parser, context, /* allowRegExp */ 1); // skip '...'

  let argument: any;
  let conjuncted: Flags = Flags.Empty;

  let { start, line, column, token, tokenValue } = parser;

  if (token & (Token.Keyword | Token.FutureReserved | Token.Contextual | Token.IsIdentifier)) {
    parser.assignable = 1;

    argument = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, 0, start, line, column);

    const isClosingTokenOrComma = parser.token === closingToken || parser.token === Token.Comma;

    argument = parseMemberExpression(parser, context, argument, 0, 0, start, line, column);

    if (parser.token !== Token.Comma && parser.token !== closingToken) {
      if ((parser.assignable as 0 | 1) === 0 && parser.token === Token.Assign)
        report(parser, Errors.InvalidDestructuringTarget);

      conjuncted |= Flags.NotDestructible;

      argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
    }
    if ((parser.assignable as 0 | 1) === 0) {
      conjuncted |= Flags.NotDestructible;
    } else if (isClosingTokenOrComma) {
      addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
    } else {
      conjuncted |= Flags.AssignableDestruct;
    }
  } else {
    if (token === closingToken) {
      report(parser, Errors.Unexpected);
    }

    if (token & Token.IsPatternStart) {
      argument =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, scope, 1, isPattern, 0, kind, origin, start, line, column)
          : parseArrayExpressionOrPattern(parser, context, scope, 1, isPattern, 0, kind, origin, start, line, column);

      const token = parser.token;

      if (token !== Token.Assign && token !== closingToken && token !== Token.Comma) {
        if (parser.flags & Flags.MustDestruct) report(parser, Errors.InvalidDestructuringTarget);
        argument = parseMemberExpression(parser, context, argument, 0, 0, start, line, column);
        conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : 0;

        if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
          if (parser.token !== Token.Assign) conjuncted |= Flags.NotDestructible;
          argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
        } else {
          if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
            argument = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, argument as any);
          }
          if (parser.token === Token.QuestionMark) {
            argument = parseConditionalExpression(parser, context, argument, start, line, column);
          }
          conjuncted |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
        }
      } else {
        conjuncted |=
          closingToken === Token.RightBrace && token !== Token.Assign ? Flags.NotDestructible : parser.flags;
      }
    } else {
      conjuncted |= Flags.AssignableDestruct;

      argument = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

      const token = parser.token;

      if (token === Token.Assign && token !== closingToken && token !== Token.Comma) {
        if (parser.assignable === 0) report(parser, Errors.CantAssignTo);
        argument = parseAssignmentExpression(parser, context, isPattern, 0, 0, argument, start, line, column);
        conjuncted |= Flags.NotDestructible;
      } else {
        if (token === Token.Comma) {
          conjuncted |= Flags.NotDestructible;
        } else if (token !== closingToken) {
          argument = parseAssignmentExpression(parser, context, 0, 0, 0, argument, start, line, column);
        }
        conjuncted |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
      }

      parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

      if (parser.token !== closingToken && parser.token !== Token.Comma) report(parser, Errors.UnclosedSpreadElement);

      return context & Context.OptionsLoc
        ? {
            type: isPattern ? 'RestElement' : 'SpreadElement',
            argument,
            start: curStart,
            end: parser.endIndex,
            loc: setLoc(parser, curLine, curColumn)
          }
        : {
            type: isPattern ? 'RestElement' : 'SpreadElement',
            argument
          };
    }
  }

  if (parser.token !== closingToken) {
    if (kind & BindingKind.ArgumentList) conjuncted |= isAsync ? Flags.NotDestructible : Flags.AssignableDestruct;

    if (parser.token === Token.Assign) {
      if (conjuncted & Flags.NotDestructible) report(parser, Errors.CantAssignTo);

      nextToken(parser, context, /* allowRegExp */ 1);

      argument = parseAssignmentOrPattern(parser, context, isPattern, 0, argument, '=', curStart, curLine, curColumn);

      conjuncted = Flags.NotDestructible;
    } else {
      // Note the difference between '|=' and '=' above
      conjuncted |= Flags.NotDestructible;
    }
  }

  parser.flags = ((parser.flags | Flags.Destructuring) ^ Flags.Destructuring) | conjuncted;

  return context & Context.OptionsLoc
    ? {
        type: isPattern ? 'RestElement' : 'SpreadElement',
        argument,
        start: curStart,
        end: parser.endIndex,
        loc: setLoc(parser, curLine, curColumn)
      }
    : {
        type: isPattern ? 'RestElement' : 'SpreadElement',
        argument
      };
}

export function parseImportExpression(
  parser: ParserState,
  context: Context,
  start: number,
  line: number,
  column: number
): ESTree.ImportExpression {
  consume(parser, context, Token.LeftParen, /* allowRegExp */ 1);

  if (parser.token === Token.RightParen) report(parser, Errors.Unexpected);

  if (parser.token === Token.Ellipsis) report(parser, Errors.Unexpected);

  const source = parseExpression(parser, context, 0);

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  return context & Context.OptionsLoc
    ? {
        type: 'ImportExpression',
        source,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'ImportExpression',
        source
      };
}

export function parseAndClassifyIdentifier(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  t: Token,
  name: string,
  kind: BindingKind,
  origin: Origin,
  start: number,
  line: number,
  column: number,
  allowRegExp: 0 | 1 = 0
): ESTree.Identifier {
  if (context & Context.Strict) {
    //if ((t & Token.FutureReserved) === Token.FutureReserved) {
    // report(parser, Errors.UnexpectedStrictReserved);
    //}
  }

  if ((t & Token.Keyword) === Token.Keyword) {
    report(parser, Errors.KeywordNotId);
  }

  if (context & (Context.Module | Context.InYieldContext) && t === Token.YieldKeyword) {
    report(parser, Errors.YieldInParameter);
  }
  if (t === Token.LetKeyword) {
    if (kind & (BindingKind.Let | BindingKind.Const)) report(parser, Errors.InvalidLetConstBinding);
  }
  if (context & (Context.InAwaitContext | Context.Module) && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
  }

  nextToken(parser, context, allowRegExp);

  addVarOrBlock(parser, context, scope, name, kind, origin);

  return context & Context.OptionsLoc
    ? {
        type: 'Identifier',
        name,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'Identifier',
        name
      };
}

export function parseBindingPattern(
  parser: ParserState,
  context: Context,
  scope: ScopeState,
  kind: BindingKind,
  origin: Origin
): any {
  const { tokenValue, start, line, column, token } = parser;
  if ((token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier)) !== 0) {
    return parseAndClassifyIdentifier(parser, context, scope, token, tokenValue, kind, origin, start, line, column, 1);
  }

  if ((parser.token & Token.IsPatternStart) !== Token.IsPatternStart) report(parser, Errors.Unexpected);

  const left: any =
    parser.token === Token.LeftBracket
      ? parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column)
      : parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column);

  if (parser.flags & Flags.NotDestructible) report(parser, Errors.InvalidBindingDestruct);

  if (parser.flags & Flags.AssignableDestruct) report(parser, Errors.InvalidBindingDestruct);

  return left;
}

export function parseImportMetaExpression(
  parser: ParserState,
  context: Context,
  meta: ESTree.Identifier,
  start: number,
  line: number,
  column: number
): ESTree.MetaProperty {
  if ((context & Context.Module) === 0) report(parser, Errors.ImportMetaOutsideModule);

  nextToken(parser, context, /* allowRegExp */ 0); // skips: '.'

  if (parser.tokenValue !== 'meta') report(parser, Errors.Unexpected);

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'MetaProperty',
        property: parseIdentifier(parser, context),
        meta,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'MetaProperty',
        property: parseIdentifier(parser, context),
        meta
      };
}
