import { nextToken } from '../scanner/scan';
import { scanTemplateTail } from '../scanner/template';
import { Token, KeywordDescTable } from '../token';
import { Errors, report, reportScopeError } from '../errors';
import * as ESTree from './estree';
import { parseStatementListItem } from './statements';
import { ScopeState, ScopeKind, addBlockName, addVarOrBlock } from './scope';
import {
  ParserState,
  Flags,
  Context,
  BindingKind,
  FunctionFlag,
  PropertyKind,
  Origin,
  expectSemicolon,
  consume,
  consumeOpt,
  setLoc,
  reinterpretToPattern,
  isValidIdentifier,
  validateIdentifier,
  isExactlyStrictDirective,
  isStrictReservedWord,
  validateFunctionName
} from './common';

export function parseAssignmentExpression(
  parser: ParserState,
  context: Context,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  left: any,
  start: number,
  line: number,
  column: number
): any {
  if ((parser.token & Token.IsAssignOp) > 0) {
    if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

    return parseAssignmentOrPattern(
      parser,
      context,
      isPattern,
      inGroup,
      left,
      KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
      start,
      line,
      column
    );
  }

  if ((parser.token & Token.IsBinaryOp) > 0) {
    left = parseBinaryExpression(parser, context, inGroup, 4, parser.token, start, line, column, left);
  }

  return parser.token === Token.QuestionMark
    ? parseConditionalExpression(parser, context, left, start, line, column)
    : left;
}

export function parseExpression(parser: ParserState, context: Context, inGroup: 0 | 1): any {
  const { start, line, column } = parser;

  let expr = parsePrimaryExpression(parser, context, BindingKind.None, 0, 1, 1, inGroup, start, line, column);

  expr = parseMemberExpression(parser, context, expr, inGroup, start, line, column);

  return parseAssignmentExpression(parser, context, 0, inGroup, expr, start, line, column);
}

export function parseExpressions(parser: ParserState, context: Context, inGroup: 0 | 1): any {
  const { start, line, column } = parser;
  const expr = parseExpression(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, inGroup);
  return parser.token === Token.Comma ? parseSequenceExpression(parser, context, expr, start, line, column) : expr;
}

export function parseSequenceExpression(
  parser: ParserState,
  context: Context,
  expr: ESTree.Expression,
  start: number,
  line: number,
  column: number
): ESTree.SequenceExpression {
  nextToken(parser, context, /* allowRegExp */ 1);

  const expressions: ESTree.Expression[] = [expr, parseExpression(parser, context, 0)];

  while (parser.token === Token.Comma) {
    nextToken(parser, context, /* allowRegExp */ 1);
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
  l: Token,
  curStart: number,
  curLine: number,
  curColumn: number,
  left: any
): any {
  let t: Token;
  let right: ESTree.Expression;

  const prec =
    context & Context.DisallowIn ? 0b00000000000000000000111100000000 : 0b00000000000000000000111100000000 << 4;

  while ((l & Token.IsBinaryOp) > 0) {
    t = parser.token;

    if ((t & prec) + (((t === Token.Exponentiate) as any) << 8) <= minPrec) return left;

    // Since ?? is the lowest-precedence binary operator, it suffices to merge the 'Coalescing' and 'IsLogic' tokens and check
    // whether these have a higher value than the 'Coalescing' token.
    if (((l | t) & 0b01000000100000000000000000000000) > Token.Coalescing) {
      report(parser, Errors.InvalidCoalescing);
    }

    nextToken(parser, context, /* allowRegExp */ 1);

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
            type: t & 0b01000000100000000000000000000000 ? 'LogicalExpression' : 'BinaryExpression',
            left,
            right,
            operator: KeywordDescTable[t & 0b00000000000000000000000011111111],
            start: curStart,
            end: parser.endIndex,
            loc: setLoc(parser, curLine, curColumn)
          }
        : {
            type: t & 0b01000000100000000000000000000000 ? 'LogicalExpression' : 'BinaryExpression',
            left,
            right,
            operator: KeywordDescTable[t & 0b00000000000000000000000011111111]
          };
  }
}

export function parsePropertyOrPrivatePropertyName(parser: ParserState, context: Context): any {
  if ((parser.token & 0b00000000001001110000000000000000) > 0) {
    return parseIdentifier(parser, context);
  }
  // Private name (stage 3)
  report(parser, Errors.InvalidDotProperty);
}

export function parseMemberExpression(
  parser: ParserState,
  context: Context,
  expr: any,
  inGroup: 0 | 1,
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
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property
            },
        inGroup,
        start,
        line,
        column
      );
    }
    /* Property */
    case Token.LeftBracket: {
      nextToken(parser, context, /* allowRegExp */ 1);

      const property = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, inGroup);

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
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property
            },
        inGroup,
        start,
        line,
        column
      );
    }

    /* Call */
    case Token.LeftParen: {
      const args = parseArguments(parser, context, inGroup);

      parser.assignable = 0;

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'CallExpression',
              callee: expr,
              arguments: args,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'CallExpression',
              callee: expr,
              arguments: args
            },
        inGroup,
        start,
        line,
        column
      );
    }
    case Token.TemplateTail: {
      return parseMemberExpression(
        parser,
        context,
        parseTemplateExpression(parser, context, expr, parseTemplateLiteral(parser, context), start, line, column),
        inGroup,
        start,
        line,
        column
      );
    }
    case Token.TemplateCont: {
      return parseMemberExpression(
        parser,
        context,
        parseTemplateExpression(
          parser,
          context,
          expr,
          parseTemplate(parser, context | Context.TaggedTemplate, start, line, column),
          start,
          line,
          column
        ),
        inGroup,
        start,
        line,
        column
      );
    }
    /* Optional Property */
    case Token.QuestionMarkPeriod: {
      nextToken(parser, context, /* allowRegExp */ 0); // skips: '?.'

      parser.assignable = 0;

      return parseMemberExpression(
        parser,
        context,
        context & Context.OptionsLoc
          ? {
              type: 'ChainingExpression',
              base: expr,
              chain: parseMemberOrCallChain(parser, context, [], 1, start, line, column),
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'ChainingExpression',
              base: expr,
              chain: parseMemberOrCallChain(parser, context, [], 1, start, line, column)
            },
        inGroup,
        start,
        line,
        column
      );
    }

    default:
      return expr;
  }
}

export function parseMemberOrCallChain(
  parser: ParserState,
  context: Context,
  chain: any,
  optional: 0 | 1,
  start: number,
  line: number,
  column: number
): (ESTree.MemberChain | ESTree.CallChain)[] {
  switch (parser.token) {
    /* Property */
    case Token.Period:
      nextToken(parser, context, /* allowRegExp */ 0);

      parser.assignable = 0;

      if ((parser.token & 0b00000000001001110000000000000000) === 0) report(parser, Errors.InvalidDotProperty);

      chain.push(
        context & Context.OptionsLoc
          ? {
              type: 'MemberChain',
              computed: false,
              optional: false,
              property: parseIdentifier(parser, context),
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberChain',
              computed: false,
              optional: false,
              property: parseIdentifier(parser, context)
            }
      );
      return parseMemberOrCallChain(parser, context, chain, /* optional */ 0, start, line, column);

    /* Property */
    case Token.LeftBracket: {
      nextToken(parser, context, /* allowRegExp */ 1);

      const property = parseExpressions(parser, (context | Context.DisallowIn) ^ Context.DisallowIn, 0);

      consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);

      parser.assignable = 0;

      chain.push(
        context & Context.OptionsLoc
          ? {
              type: 'MemberChain',
              computed: true,
              property,
              optional: false,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberChain',
              computed: true,
              property,
              optional: false
            }
      );

      return parseMemberOrCallChain(parser, context, chain, /* optional */ 0, start, line, column);
    }
    /* Call */
    case Token.LeftParen:
      const args = parseArguments(parser, context, 0);

      parser.assignable = 0;

      chain.push(
        context & Context.OptionsLoc
          ? {
              type: 'CallChain',
              arguments: args,
              optional: true,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'CallChain',
              arguments: args,
              optional: true
            }
      );
      return parseMemberOrCallChain(parser, context, chain, /* optional */ 0, start, line, column);

    case Token.TemplateTail:
    case Token.TemplateCont:
      report(parser, Errors.OptionalChainingNoTemplate);

    /* Optional Property */
    case Token.QuestionMarkPeriod:
      nextToken(parser, context, 0);

      // '[x?.?.y = 1]'
      if (optional === 1) report(parser, Errors.Unexpected);

      parser.assignable = 0;
    // falls through

    default:
      if ((parser.token & 0b00000000001001110000000000000000) > 0) {
        parser.assignable = 0;
        chain.push(
          context & Context.OptionsLoc
            ? {
                type: 'MemberChain',
                computed: false,
                property: parseIdentifier(parser, context),
                optional: true,
                start,
                end: parser.endIndex,
                loc: setLoc(parser, line, column)
              }
            : {
                type: 'MemberChain',
                computed: false,
                property: parseIdentifier(parser, context),
                optional: true
              }
        );
        return parseMemberOrCallChain(parser, context, chain, /* optional */ 0, start, line, column);
      }
  }

  return chain;
}

export function parseArguments(
  parser: ParserState,
  context: Context,
  inGroup: 0 | 1
): (ESTree.Expression | ESTree.SpreadElement)[] {
  /**
   * ArgumentList
   *
   * AssignmentExpression
   * ...AssignmentExpression
   *
   * ArgumentList, AssignmentExpression
   * ArgumentList, ...AssignmentExpression
   *
   */
  nextToken(parser, context, /* allowRegExp */ 1);

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  const args: (ESTree.Expression | ESTree.SpreadElement)[] = [];

  while (parser.token !== Token.RightParen) {
    if (parser.token === Token.Ellipsis) {
      const { start, line, column } = parser;

      nextToken(parser, context, /* allowRegExp */ 1);

      args.push(
        context & Context.OptionsLoc
          ? {
              type: 'SpreadElement',
              argument: parseExpression(parser, context, inGroup),
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'SpreadElement',
              argument: parseExpression(parser, context, inGroup)
            }
      );
    } else {
      args.push(parseExpression(parser, context, inGroup));
    }

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  return args;
}

export function parseTemplateLiteral(parser: ParserState, context: Context): ESTree.TemplateLiteral {
  const { start, line, column, tokenValue, tokenRaw } = parser;
  parser.assignable = 0;
  consume(parser, context, Token.TemplateTail, /* allowRegExp */ 0);

  const quasis: ESTree.TemplateElement[] = [
    context & Context.OptionsLoc
      ? {
          type: 'TemplateElement',
          value: {
            cooked: tokenValue,
            raw: tokenRaw
          },
          tail: true,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'TemplateElement',
          value: {
            cooked: tokenValue,
            raw: tokenRaw
          },
          tail: true
        }
  ];

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

  const expressions = [parseExpressions(parser, context, 0)];

  while ((parser.token = scanTemplateTail(parser, context)) === Token.TemplateCont) {
    quasis.push(parseTemplateElement(parser, context, /* tail */ false));
    consume(parser, context, Token.TemplateCont, /* allowRegExp */ 1);
    expressions.push(parseExpressions(parser, context, 0));
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
  inGroup: 0 | 1,
  canAssign: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.YieldExpression | ESTree.Identifier | ESTree.ArrowFunctionExpression {
  parser.flags |= inGroup === 1 ? Flags.SeenYield : 0;

  if (context & Context.InYieldContext) {
    nextToken(parser, context, /* allowRegExp */ 1);
    if (context & Context.InArgumentList) report(parser, Errors.YieldInParameter);
    if (canAssign === 0) report(parser, Errors.CantAssignTo);
    if (parser.token === Token.QuestionMark) report(parser, Errors.InvalidTernaryYield);

    let argument = null;
    let isDelegate: 0 | 1 = 0; // yield*

    if (parser.newLine === 0) {
      isDelegate = consumeOpt(parser, context, Token.Multiply, /* allowRegExp */ 1);
      if (parser.token & Token.IsExpressionStart || isDelegate === 1) {
        argument = parseExpression(parser, context, 0);
      }
    }

    parser.assignable = 0;

    return context & Context.OptionsLoc
      ? {
          type: 'YieldExpression',
          argument,
          delegate: isDelegate === 1,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'YieldExpression',
          argument,
          delegate: isDelegate === 1
        };
  }

  if (context & Context.Strict) report(parser, Errors.DisallowedInContext, 'yield');

  return parseIdentifierOrArrow(parser, context);
}

export function parseAwaitExpression(
  parser: ParserState,
  context: Context,
  inGroup: 0 | 1,
  inNew: 0 | 1,
  start: number,
  line: number,
  column: number
): any {
  if (inGroup === 1) parser.flags |= Flags.SeenAwait;

  if (context & Context.InAwaitContext) {
    if (inNew === 1) report(parser, Errors.Unexpected);

    if (context & Context.InArgumentList) {
      report(parser, Errors.AwaitInParameter);
    }

    // TODO: Check for escaped ident, and throw

    nextToken(parser, context, /* allowRegExp */ 1);

    const argument = parseLeftHandSideExpression(parser, context, inGroup, /* allowLHS */ 1, 0);

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
  const { start, line, column, token, tokenValue } = parser;

  nextToken(parser, context, 0);

  let expr: ESTree.Identifier | ESTree.ArrowFunctionExpression = parseIdentifierFromValue(
    parser,
    context,
    tokenValue,
    start,
    line,
    column
  );

  parser.assignable = 1;

  if (parser.token === Token.Arrow) {
    parser.flags |=
      (token & 0b00000000000001000000000000000000) === 0b00000000000001000000000000000000 ? Flags.HasStrictReserved : 0;
    const mutualFlag: Flags = (parser.flags | 0b00000000000000000000000100000000) ^ 0b00000000000000000000000100000000;

    const scope = {
      parent: {
        parent: void 0,
        type: ScopeKind.Block
      },
      type: ScopeKind.Block,
      scopeError: void 0
    };

    addBlockName(parser, context, scope, parser.tokenValue, BindingKind.ArgumentList, Origin.None);

    expr = parseArrowFunction(parser, context, scope, [expr], 0, start, line, column);

    parser.flags |= mutualFlag;
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
  /**
   *  PrimaryExpression :
   *   1. this
   *   2. IdentifierName
   *   3. Literal
   *   4. ArrayLiteral
   *   5. ObjectLiteral
   *   6. TemplateLiteral
   *   7. ParenthesizedExpression
   *
   * Literal :
   *    NullLiteral
   *    BooleanLiteral
   *    NumericLiteral
   *    StringLiteral
   *
   * ParenthesizedExpression :
   *   ( AssignmentExpression )
   *
   */
  const token = parser.token;

  if ((token & Token.IsIdentifier) === Token.IsIdentifier) {
    if (token === Token.YieldKeyword) {
      return parseYieldExpression(parser, context, inGroup, canAssign, start, line, column);
    }

    if (token === Token.AwaitKeyword) return parseAwaitExpression(parser, context, inGroup, inNew, start, line, column);

    if (token === Token.AsyncKeyword) {
      return parseAsyncExpression(parser, context, inNew, allowLHS, canAssign, start, line, column);
    }

    if (token === Token.LetKeyword) {
      if (context & Context.Strict) report(parser, Errors.StrictInvalidLetInExprPos);
      if (kind & (BindingKind.Let | BindingKind.Const)) report(parser, Errors.InvalidLetConstBinding);
    }

    const tokenValue = parser.tokenValue;

    const expr = parseIdentifier(parser, context | Context.TaggedTemplate);

    if (parser.token === Token.Arrow) {
      if (allowLHS === 0) report(parser, Errors.Unexpected);
      if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);
      if (inNew) report(parser, Errors.InvalidAsyncArrow);

      if (context & Context.Strict && (token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
        report(parser, Errors.StrictEvalArguments);
      }

      return parseAsyncArrowIdentifier(
        parser,
        context,
        {
          parent: {
            parent: void 0,
            type: ScopeKind.Block
          },
          type: ScopeKind.ArrowParams,
          scopeError: void 0
        },
        /* isAsync */ 0,
        tokenValue,
        token,
        expr,
        start,
        line,
        column
      );
    }

    parser.assignable =
      context & Context.Strict && (token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments ? 0 : 1;

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
      return parseUnaryExpression(parser, context, inGroup, inNew, allowLHS, start, line, column);
    case Token.StringLiteral:
    case Token.NumericLiteral:
      return parseLiteral(parser, context);
    case Token.ThisKeyword:
      return parseThisExpression(parser, context, start, line, column);
    case Token.FunctionKeyword:
      return parseFunctionExpression(parser, context, /* isAsync */ 0, start, line, column);
    case Token.FalseKeyword:
    case Token.TrueKeyword:
      return parseExpressionFromLiteral(parser, context, parser.tokenValue === 'true', start, line, column);
    case Token.NullKeyword:
      return parseNullLiteral(parser, context, start, line, column);
    case Token.LeftBracket:
      return parseArrayLiteral(parser, context, /* skipInitializer */ canAssign ? 0 : 1, inGroup, start, line, column);
    case Token.LeftBrace:
      return parseObjectLiteral(parser, context, /* skipInitializer */ canAssign ? 0 : 1, inGroup, start, line, column);
    case Token.LeftParen:
      return parseParenthesizedExpression(
        parser,
        context,
        inGroup,
        canAssign,
        BindingKind.ArgumentList,
        Origin.None,
        start,
        line,
        column
      );

    case Token.BigIntLiteral:
      return parseBigIntLiteral(parser, context);
    case Token.NewKeyword:
      return parseNewExpression(parser, context, inGroup, start, line, column);
    case Token.ClassKeyword:
      return parseClassExpression(parser, context, inGroup, start, line, column);
    case Token.SuperKeyword:
      return parseSuperExpression(parser, context, start, line, column);
    case Token.RegularExpression:
      return parseRegExpLiteral(parser, context, start, line, column);
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
  const { token, tokenValue, start, line, column } = parser;

  nextToken(parser, context, /* allowRegExp */ 0);

  if (parser.newLine === 0) {
    // async function ...
    if (parser.token === Token.FunctionKeyword) {
      if (allowLHS === 0) {
        report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
      }

      return parseFunctionExpression(parser, context, 1, curStart, curLine, curColumn);
    }

    // async Identifier => ...
    if ((parser.token & Token.IsIdentifier) === Token.IsIdentifier) {
      if (allowLHS === 0) {
        report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
      }

      if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);
      if (parser.token === Token.AwaitKeyword) report(parser, Errors.AwaitInParameter);

      if (context & (Context.Strict | Context.InYieldContext) && parser.token === Token.YieldKeyword) {
        report(parser, Errors.YieldInParameter);
      }

      return parseAsyncArrowIdentifier(
        parser,
        context,
        {
          parent: {
            parent: void 0,
            type: ScopeKind.Block
          },
          type: ScopeKind.ArrowParams,
          scopeError: void 0
        },
        1,
        parser.tokenValue,
        parser.token,
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
    if ((parser.token as Token) === Token.AwaitKeyword) report(parser, Errors.AwaitInParameter);

    if (context & (Context.Strict | Context.InYieldContext) && (parser.token as Token) === Token.YieldKeyword) {
      report(parser, Errors.YieldInParameter);
    }
    return parseAsyncArrowIdentifier(
      parser,
      context,
      {
        parent: {
          parent: void 0,
          type: ScopeKind.Block
        },
        type: ScopeKind.ArrowParams,
        scopeError: void 0
      },
      0,
      'async',
      token,
      expr,
      curStart,
      curLine,
      curColumn
    );
  }

  return expr;
}

export function parseAsyncArrowIdentifier(
  parser: ParserState,
  context: Context,
  scope: any,
  isAsync: 0 | 1,
  value: string,
  token: Token,
  expr: any,
  start: number,
  line: number,
  column: number
): any {
  parser.flags =
    ((parser.flags | 0b00000000000000000000000100000000) ^ 0b00000000000000000000000100000000) |
    ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments ? Flags.StrictEvalArguments : 0);

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

    if ((parser.token as Token) === Token.Arrow) {
      if (newLine === 1) report(parser, Errors.Unexpected);

      if (parser.flags & Flags.SeenAwait) report(parser, Errors.AwaitInParameter);

      return parseArrowFunctionAfterParen(parser, context, scope, Flags.Empty, [], canAssign, 1, start, line, column);
    }

    return context & Context.OptionsLoc
      ? {
          type: 'CallExpression',
          callee,
          arguments: [],
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'CallExpression',
          callee,
          arguments: []
        };
  }

  parser.flags = (parser.flags | 0b00000000000000000000110100000000) ^ 0b00000000000000000000110100000000;

  let expr: any = null;

  let mutualFlag: Flags = Flags.Empty;

  const params: ESTree.Expression[] = [];

  while ((parser.token as Token) !== Token.RightParen) {
    const { token, tokenValue, start, line, column } = parser;

    if ((token & 0b00000000001001110000000000000000) > 0) {
      addBlockName(parser, context, scope, tokenValue, BindingKind.ArgumentList, Origin.None);

      expr = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, 1, start, line, column);

      if ((parser.token as Token) === Token.RightParen || parser.token === Token.Comma) {
        mutualFlag |=
          (parser.assignable === 0 ? Flags.NotDestructible | Flags.SimpleParameterList : 0) |
          ((token & (Token.FutureReserved | Token.IsEvalOrArguments)) > 0 ? Flags.SimpleParameterList : 0);
      } else if (parser.token === Token.Assign) {
        mutualFlag |= Flags.SimpleParameterList;
        expr = parseAssignmentExpression(parser, context, 0, 1, expr, start, line, column);
      } else {
        mutualFlag |= Flags.NotDestructible;
        expr = parseMemberExpression(parser, context, expr, 0, start, line, column);
        expr = parseAssignmentExpression(parser, context, 0, 1, expr, start, line, column);
      }
    } else if (token & Token.IsPatternStart) {
      expr =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
          : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);

      mutualFlag |= parser.flags | Flags.SimpleParameterList;

      if ((parser.token as Token) !== Token.RightParen && parser.token !== Token.Comma) {
        if (mutualFlag & Flags.MustDestruct) report(parser, Errors.InvalidPatternTail);

        expr = parseMemberExpression(parser, context, expr, 0, start, line, column);

        mutualFlag |= Flags.NotDestructible;

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
        1,
        kind,
        origin,
        start,
        line,
        column
      );

      mutualFlag |=
        ((parser.token as Token) === Token.RightParen ? 0 : Flags.NotDestructible) |
        (parser.flags | Flags.SimpleParameterList);
    } else {
      expr = parseExpression(parser, context, 0);

      params.push(expr);

      while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
        params.push(parseExpression(parser, context, 0));
      }

      consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

      parser.flags =
        ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) |
        mutualFlag |
        Flags.NotDestructible;

      parser.assignable = 0;

      return context & Context.OptionsLoc
        ? {
            type: 'CallExpression',
            callee,
            arguments: params,
            start,
            end: parser.endIndex,
            loc: setLoc(parser, line, column)
          }
        : {
            type: 'CallExpression',
            callee,
            arguments: params
          };
    }

    params.push(expr as ESTree.Expression);

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  mutualFlag |=
    (parser.flags & Flags.SeenYield ? Flags.SeenYield : 0) | (parser.flags & Flags.SeenAwait ? Flags.SeenAwait : 0);

  if (parser.token === Token.Arrow) {
    if (parser.flags & Flags.SeenAwait) report(parser, Errors.AwaitInParameter);
    return parseArrowFunctionAfterParen(parser, context, scope, mutualFlag, params, canAssign, 1, start, line, column);
  }
  if ((context & Context.OptionsDisableWebCompat) === 0 && parser.flags & Flags.SeenProto) {
    report(parser, Errors.DuplicateProto);
  }

  parser.flags = (parser.flags | 0b00000000000000000000110000000000) ^ 0b00000000000000000000110000000000;

  if (mutualFlag & Flags.MustDestruct) report(parser, Errors.InvalidShorthandPropInit);

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'CallExpression',
        callee,
        arguments: params,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'CallExpression',
        callee,
        arguments: params
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

  if (parser.token !== Token.Period) {
    if (inNew === 1) report(parser, Errors.InvalidImportNew);

    expr = parseImportExpression(parser, context, start, line, column);

    parser.assignable = 0;

    return parseMemberExpression(parser, context, expr, 0, start, line, column);
  }
  return parseImportMetaExpression(parser, context, expr, start, line, column);
}
export function parseNewExpression(
  parser: ParserState,
  context: Context,
  inGroup: 0 | 1,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  // NewExpression ::
  //   ('new')+ MemberExpression
  //
  // NewTarget ::
  //   'new' '.' 'target'

  nextToken(parser, context, /* allowRegExp */ 1);

  parser.assignable = 0;

  if (parser.token === Token.Period) {
    return parseNewTargetExpression(parser, context, curStart, curLine, curColumn);
  }

  const { start, line, column } = parser;

  const expr = parsePrimaryExpression(parser, context, BindingKind.None, 1, 1, 0, inGroup, start, line, column);

  const callee = parseNewMemberExpression(parser, context, inGroup, expr, start, line, column);

  const args = parser.token === Token.LeftParen ? parseArguments(parser, context, inGroup) : [];

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
  inGroup: 0 | 1,
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
        inGroup,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: false,
              property
            },
        start,
        line,
        column
      );
    }
    case Token.LeftBracket: {
      nextToken(parser, context, /* allowRegExp */ 1);

      const property = parseExpressions(parser, context, inGroup);

      consume(parser, context, Token.RightBracket, /* allowRegExp */ 0);

      return parseNewMemberExpression(
        parser,
        context,
        inGroup,
        context & Context.OptionsLoc
          ? {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'MemberExpression',
              object: expr,
              computed: true,
              property
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
    case Token.TemplateCont: {
      return parseNewMemberExpression(
        parser,
        context,
        inGroup,
        parseTemplateExpression(
          parser,
          context,
          expr,
          parseTemplate(parser, context | Context.TaggedTemplate, start, line, column),
          start,
          line,
          column
        ),
        start,
        line,
        column
      );
    }
    case Token.TemplateTail: {
      return parseNewMemberExpression(
        parser,
        context,
        inGroup,
        parseTemplateExpression(parser, context, expr, parseTemplateLiteral(parser, context), start, line, column),
        start,
        line,
        column
      );
    }
    default:
      return expr;
  }
}

export function parseTemplateExpression(
  parser: ParserState,
  context: Context,
  tag: any,
  quasi: any,
  start: number,
  line: number,
  column: number
): any {
  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'TaggedTemplateExpression',
        tag,
        quasi,
        start: start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'TaggedTemplateExpression',
        tag,
        quasi
      };
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
    report(parser, Errors.UnexpectedToken, 'super');
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

export function parseBigIntLiteral(parser: ParserState, context: Context): any {
  const { start, line, column } = parser;
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
        bigint
      };
}

export function parseArrowFunctionAfterParen(
  parser: ParserState,
  context: Context,
  scope: any,
  mutualFlag: Flags,
  params: any,
  canAssign: 0 | 1,
  isAsync: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ArrowFunctionExpression {
  if (mutualFlag & (Flags.AssignableDestruct | Flags.NotDestructible)) {
    report(parser, Errors.InvalidArrowDestructLHS);
  }
  if (context & (Context.Strict | Context.InYieldContext) && mutualFlag & Flags.SeenYield) {
    report(parser, Errors.YieldInParameter);
  }

  parser.flags =
    ((parser.flags | 0b00000000000000000000110000011110) ^ 0b00000000000000000000110000011110) | mutualFlag;

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

  // ASI inserts `;` after arrow parameters if a line terminator is found.
  // `=> ...` is never a valid expression, so report as syntax error.
  // If next token is not `=>`, it's a syntax error anyways.
  consume(parser, context, Token.Arrow, /* allowRegExp */ 1);

  context = ((context | 0b0000000111100000000_0000_00000000) ^ 0b0000000111100000000_0000_00000000) | (isAsync << 22);

  const expression = parser.token !== Token.LeftBrace;

  let body: any;

  if (scope.scopeError !== void 0) reportScopeError(scope.scopeError);

  if (expression) {
    // Single-expression body
    body = parseExpression(parser, context, 0);
  } else {
    body = parseFunctionBody(
      parser,
      (context | 0b00010000100000000000000000000000) ^ 0b00010000100000000000000000000000,
      scope,
      void 0,
      1,
      void 0
    );

    if (parser.newLine === 0) {
      const { token } = parser;

      if ((token & Token.IsBinaryOp) > 0) {
        report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
      }

      switch (token) {
        case Token.Period:
        case Token.LeftBracket:
        case Token.TemplateTail:
        case Token.QuestionMark:
          report(parser, Errors.InvalidAccessedBlockBodyArrow);
        case Token.LeftParen:
          report(parser, Errors.InvalidInvokedBlockBodyArrow);
        default: // ignore
      }
    } else {
      switch (parser.token) {
        case Token.Period:
        case Token.QuestionMark:
        case Token.Exponentiate:
          report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
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
  inGroup: 0 | 1,
  canAssign: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.Expression {
  nextToken(parser, context, /* allowRegExp */ 1);

  parser.flags = (parser.flags | 0b00000000000000000000110100000000) ^ 0b00000000000000000000110100000000;

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  let expr: any = [];

  if (parser.token === Token.RightParen) {
    if (canAssign === 0) report(parser, Errors.InvalidAssignmentTarget);

    nextToken(parser, context, /* allowRegExp */ 0);

    return parseArrowFunction(
      parser,
      context,
      {
        parent: {
          parent: void 0,
          type: ScopeKind.Block
        },
        type: ScopeKind.ArrowParams,
        scopeError: void 0
      },
      expr,
      /* isAsync */ 0,
      curStart,
      curLine,
      curColumn
    );
  }

  let expressions: any[] = [];
  let inSequence: 0 | 1 = 0;
  let mutualFlag: Flags = Flags.Empty;

  const { start: sStart, line: sLine, column: sColumn } = parser;

  const scope = {
    parent: {
      parent: void 0,
      type: ScopeKind.Block
    },
    type: ScopeKind.ArrowParams,
    scopeError: void 0
  };

  parser.assignable = 1;

  while ((parser.token as Token) !== Token.RightParen) {
    const { token, start, line, column, tokenValue } = parser;

    if ((token & 0b00000000001001110000000000000000) > 0) {
      addBlockName(parser, context, scope, tokenValue, BindingKind.ArgumentList, Origin.None);

      expr = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, 1, start, line, column);

      if (parser.token === Token.Comma || (parser.token as Token) === Token.RightParen) {
        mutualFlag |=
          (parser.assignable === 1 ? 0 : Flags.NotDestructible | Flags.SimpleParameterList) |
          ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments ? Flags.SimpleParameterList : 0) |
          ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.SimpleParameterList : 0);
      } else {
        mutualFlag |= parser.token === Token.Assign ? Flags.SimpleParameterList : Flags.NotDestructible;

        expr = parseMemberExpression(parser, context, expr, inGroup, start, line, column);

        if ((parser.token as Token) !== Token.RightParen && (parser.token as Token) !== Token.Comma) {
          expr = parseAssignmentExpression(parser, context, 0, 1, expr, start, line, column);
        }
      }
    } else if (token & Token.IsPatternStart) {
      expr =
        parser.token === Token.LeftBrace
          ? parseObjectLiteralOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column)
          : parseArrayExpressionOrPattern(parser, context, scope, 0, 0, 1, kind, origin, start, line, column);

      mutualFlag |= parser.flags | Flags.SimpleParameterList;

      parser.assignable = 0;

      if (parser.token !== Token.Comma && (parser.token as Token) !== Token.RightParen) {
        if (mutualFlag & Flags.MustDestruct) report(parser, Errors.InvalidPatternTail);

        expr = parseMemberExpression(parser, context, expr, 0, start, line, column);

        mutualFlag |= Flags.NotDestructible;

        if ((parser.token & Token.IsAssignOp) > 0) {
          if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

          expr = parseAssignmentOrPattern(
            parser,
            context,
            0,
            0,
            expr,
            KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
            start,
            line,
            column
          );
        } else if ((parser.token & Token.IsBinaryOp) > 0) {
          expr = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, expr as any);
          if ((parser.token as Token) === Token.QuestionMark) {
            expr = parseConditionalExpression(parser, context, expr, start, line, column);
          }
        } else {
          if ((parser.token as Token) === Token.QuestionMark) {
            expr = parseConditionalExpression(parser, context, expr, start, line, column);
          } else {
            mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
          }
        }
      }
    } else if (token === Token.Ellipsis) {
      expr = parseSpreadOrRestElement(
        parser,
        context,
        scope,
        Token.RightParen,
        0,
        0,
        1,
        kind,
        origin,
        start,
        line,
        column
      );

      if (parser.flags & Flags.NotDestructible) report(parser, Errors.InvalidRestArg);

      if (inSequence && ((parser.token as Token) === Token.RightParen || (parser.token as Token) === Token.Comma)) {
        expressions.push(expr);
      }
      mutualFlag |= Flags.MustDestruct | Flags.SimpleParameterList;
      break;
    } else {
      mutualFlag |= Flags.NotDestructible;

      expr = parseExpression(parser, context, inGroup);

      if (inSequence && ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightParen)) {
        expressions.push(expr);
      }

      if ((parser.token as Token) === Token.Comma) {
        if (inSequence === 0) {
          inSequence = 1;
          expressions = [expr];
        }
      }

      if (inSequence) {
        while (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
          expressions.push(parseExpression(parser, context, inGroup));
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

      parser.flags =
        ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

      return expr;
    }

    if (inSequence && ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightParen)) {
      expressions.push(expr);
    }

    if ((parser.token as Token) !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 1);

    if (!inSequence) {
      inSequence = 1;
      expressions = [expr];
    }

    if ((parser.token as Token) === Token.RightParen) {
      mutualFlag |= Flags.MustDestruct;
      break;
    }
  }

  if (inSequence) {
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

  if (mutualFlag & Flags.NotDestructible && mutualFlag & Flags.MustDestruct) {
    report(parser, Errors.CantAssignToValidRHS);
  }

  mutualFlag |=
    (parser.flags & Flags.SeenYield ? Flags.SeenYield : 0) | (parser.flags & Flags.SeenAwait ? Flags.SeenAwait : 0);

  if (parser.token === Token.Arrow) {
    if (context & (Context.InAwaitContext | Context.Module) && mutualFlag & Flags.SeenAwait) {
      report(parser, Errors.AwaitInParameter);
    }

    return parseArrowFunctionAfterParen(
      parser,
      context,
      scope,
      mutualFlag,
      inSequence ? expressions : [expr],
      canAssign,
      0,
      curStart,
      curLine,
      curColumn
    );
  } else if (mutualFlag & Flags.MustDestruct) {
    report(parser, Errors.UncompleteArrow);
  }

  if ((context & Context.OptionsDisableWebCompat) === 0 && parser.flags & Flags.SeenProto) {
    report(parser, Errors.DuplicateProto);
  }

  parser.flags =
    ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

  if ((context & Context.OptionsPreserveParens) === 0) return expr;

  return context & Context.OptionsLoc
    ? {
        type: 'ParenthesizedExpression',
        expression: expr,
        start: sStart,
        end: parser.endIndex,
        loc: setLoc(parser, sLine, sColumn)
      }
    : ({
        type: 'ParenthesizedExpression',
        expression: expr
      } as any);
}

export function parseExpressionStatement(
  parser: ParserState,
  context: Context,
  expression: any,
  start: number,
  line: number,
  column: number
): ESTree.ExpressionStatement {
  expectSemicolon(parser, context);

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

  const expr = parsePrimaryExpression(
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

  return parseMemberExpression(parser, context, expr, inGroup, start, line, column);
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
  /**
   *  UpdateExpression:
   *      ++LeftHandSideExpression[?Yield]
   *      --LeftHandSideExpression[?Yield]
   */

  if (parser.assignable === 0) report(parser, Errors.InvalidIncDecTarget);

  const operator = KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.UpdateOperator;

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

  const operator = KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.UpdateOperator;

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
  inGroup: 0 | 1,
  inNew: 0 | 1,
  allowLHS: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.UnaryExpression {
  /**
   *  UnaryExpression ::
   *   PostfixExpression
   *      1) UpdateExpression
   *      2) delete UnaryExpression
   *      3) void UnaryExpression
   *      4) typeof UnaryExpression
   *      5) + UnaryExpression
   *      6) - UnaryExpression
   *      7) ~ UnaryExpression
   *      8) ! UnaryExpression
   *      9) await UnaryExpression
   */
  if (allowLHS === 0) report(parser, Errors.Unexpected);

  if (inNew === 1) {
    report(parser, Errors.InvalidNewUnary, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
  }

  const operator = parser.token;

  nextToken(parser, context, /* allowRegExp */ 1);

  const arg = parseLeftHandSideExpression(parser, context, inGroup, /* allowLHS */ 1, 0);

  if (parser.token === Token.Exponentiate) report(parser, Errors.InvalidExponentationLHS);

  if (context & Context.Strict) {
    if (operator === Token.DeleteKeyword && arg.type === 'Identifier') {
      // When a delete operator occurs within strict mode code, a SyntaxError is thrown if its
      // UnaryExpression is a direct reference to a variable, function argument, or function name
      report(parser, Errors.StrictDelete);
    }
  }

  parser.assignable = 0;

  return context & Context.OptionsLoc
    ? {
        type: 'UnaryExpression',
        operator: KeywordDescTable[operator & 0b00000000000000000000000011111111] as ESTree.UnaryOperator,
        argument: arg,
        prefix: true,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type: 'UnaryExpression',
        operator: KeywordDescTable[operator & 0b00000000000000000000000011111111] as ESTree.UnaryOperator,
        argument: arg,
        prefix: true
      };
}

export function parseArrayLiteral(
  parser: ParserState,
  context: Context,
  skipInitializer: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number
): ESTree.ArrayExpression {
  /**
   * ArrayLiteral :
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
   *
   * SpreadElement:
   * ...AssignmentExpression
   */
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

  if ((context & Context.OptionsDisableWebCompat) === 0 && parser.flags & Flags.SeenProto) {
    report(parser, Errors.DuplicateProto);
  }

  if ((parser.flags & Flags.MustDestruct) === Flags.MustDestruct) report(parser, Errors.InvalidShorthandPropInit);

  return expr;
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
  nextToken(parser, context, /* allowRegExp */ 1);

  const right = parseExpression(parser, context, inGroup);

  parser.assignable = 0;

  if (isPattern === 0) {
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

  let mutualFlag: Flags = Flags.Empty;

  context = (context | Context.DisallowIn) ^ Context.DisallowIn;

  while (parser.token !== Token.RightBracket) {
    if (consumeOpt(parser, context, Token.Comma, /* allowRegExp */ 1)) {
      elements.push(null);
    } else {
      let left: any;

      const { token, start, line, column, tokenValue } = parser;

      if ((token & 0b00000000001001110000000000000000) > 0) {
        left = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);
        if (parser.token === Token.Assign) {
          if (parser.assignable === 0) report(parser, Errors.CantAssignTo);
          left = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);
        } else if (parser.token === Token.Comma || (parser.token as Token) === Token.RightBracket) {
          if (parser.assignable === 1) {
            addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
          } else {
            mutualFlag |= Flags.NotDestructible;
          }
        } else {
          mutualFlag |=
            kind & BindingKind.ArgumentList
              ? Flags.AssignableDestruct
              : (kind & BindingKind.Tail) !== BindingKind.Tail
              ? Flags.NotDestructible
              : 0;

          left = parseMemberExpression(parser, context, left, 0, start, line, column);

          if ((parser.token & Token.IsAssignOp) > 0) {
            if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

            left = parseAssignmentOrPattern(
              parser,
              context,
              isPattern,
              0,
              left,
              KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
              start,
              line,
              column
            );
          } else if ((parser.token & Token.IsBinaryOp) > 0) {
            mutualFlag |= Flags.NotDestructible;

            left = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, left as any);

            if ((parser.token as Token) === Token.QuestionMark) {
              left = parseConditionalExpression(parser, context, left, start, line, column);
            }
          } else {
            if ((parser.token as Token) === Token.QuestionMark) {
              mutualFlag |= Flags.NotDestructible;
              left = parseConditionalExpression(parser, context, left, start, line, column);
            } else {
              mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
            }
          }
        }
      } else if (token & Token.IsPatternStart) {
        left =
          parser.token === Token.LeftBrace
            ? parseObjectLiteralOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column)
            : parseArrayExpressionOrPattern(parser, context, scope, 0, isPattern, 0, kind, origin, start, line, column);

        mutualFlag |= parser.flags;

        parser.assignable = mutualFlag & Flags.NotDestructible ? 0 : 1;

        if ((parser.token as Token) !== Token.Comma && (parser.token as Token) !== Token.RightBracket) {
          if (mutualFlag & Flags.MustDestruct) report(parser, Errors.InvalidDestructuringTarget);

          left = parseMemberExpression(parser, context, left, 0, start, line, column);

          mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

          if ((parser.token & Token.IsAssignOp) > 0) {
            if (parser.assignable === 0) report(parser, Errors.CantAssignTo);

            left = parseAssignmentOrPattern(
              parser,
              context,
              isPattern,
              0,
              left,
              KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
              start,
              line,
              column
            );
          } else if ((parser.token & Token.IsBinaryOp) > 0) {
            left = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, left as any);
            if ((parser.token as Token) === Token.QuestionMark) {
              left = parseConditionalExpression(parser, context, left, start, line, column);
            }
          } else {
            if ((parser.token as Token) === Token.QuestionMark) {
              left = parseConditionalExpression(parser, context, left, start, line, column);
            } else {
              mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
            }
          }
        } else {
          mutualFlag |= mutualFlag & Flags.NotDestructible ? Flags.NotDestructible : 0;
        }
      } else if (token === Token.Ellipsis) {
        left = parseSpreadOrRestElement(
          parser,
          context,
          scope,
          Token.RightBracket,
          isPattern,
          0,
          inGroup,
          kind,
          origin,
          start,
          line,
          column
        );

        if (parser.token !== Token.Comma && (parser.token as Token) !== Token.RightBracket) {
          report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
        }

        mutualFlag |= parser.flags;
      } else {
        left = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

        if (parser.token !== Token.Comma && (parser.token as Token) !== Token.RightBracket) {
          left = parseAssignmentExpression(parser, context, isPattern, 0, left, start, line, column);
          mutualFlag |=
            (kind & 0b00000000000000000000000000001001) === 0 && token === Token.LeftParen ? Flags.NotDestructible : 0;
        } else if (parser.assignable === 0) {
          mutualFlag |= Flags.NotDestructible;
        } else if (token === Token.LeftParen) {
          mutualFlag |=
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

  const node =
    context & Context.OptionsLoc
      ? {
          type: isPattern ? 'ArrayPattern' : 'ArrayExpression',
          elements,
          start: curStart,
          end: parser.endIndex,
          loc: setLoc(parser, curLine, curColumn)
        }
      : {
          type: isPattern ? 'ArrayPattern' : 'ArrayExpression',
          elements
        };

  if (skipInitializer === 0 && parser.token & Token.IsAssignOp) {
    return parseArrayOrObjectAssignmentPattern(
      parser,
      context,
      mutualFlag,
      isPattern,
      inGroup,
      curStart,
      curLine,
      curColumn,
      node
    );
  }

  parser.flags =
    ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

  return node;
}

export function parseArrayOrObjectAssignmentPattern(
  parser: ParserState,
  context: Context,
  mutualFlag: Flags | Flags,
  isPattern: 0 | 1,
  inGroup: 0 | 1,
  start: number,
  line: number,
  column: number,
  left: any
): any {
  if (parser.token !== Token.Assign) report(parser, Errors.CantAssignTo);

  if ((mutualFlag & Flags.NotDestructible) === Flags.NotDestructible) report(parser, Errors.CantAssignTo);

  if (isPattern === 0) reinterpretToPattern(parser, left);

  const node = parseAssignmentOrPattern(parser, context, isPattern, inGroup, left, '=', start, line, column);

  parser.flags =
    ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) |
    ((mutualFlag | 0b00000000000000000000001000010000) ^ 0b00000000000000000000001000010000);

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

  const isGenerator = consumeOpt(parser, context, Token.Multiply, /* allowRegExp */ 0);
  const generatorAndAsyncFlags = (isAsync * 2 + isGenerator) << 21;

  let id: ESTree.Identifier | null = null;
  let firstRestricted: Token | undefined;

  let scope: ScopeState = {
    parent: void 0,
    type: ScopeKind.Block
  };

  if ((parser.token & 0b00000000001001110000000000000000) > 0) {
    scope = {
      parent: {
        parent: void 0,
        type: ScopeKind.Block
      },
      type: ScopeKind.FunctionRoot,
      scopeError: void 0
    };
    const { token, tokenValue, start, line, column } = parser;
    validateFunctionName(
      parser,
      ((context | 0b00000000011000000000000000000000) ^ 0b00000000011000000000000000000000) | generatorAndAsyncFlags,
      token
    );

    firstRestricted = token;

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
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
    firstRestricted,
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

  const params = parseFormalParams(
    parser,
    context | Context.InArgumentList,
    scope,
    BindingKind.ArgumentList,
    Origin.None,
    isMethod
  );

  const body = parseFunctionBody(
    parser,
    (context | 0b00011000000000100000000000000000) ^ 0b00011000000000100000000000000000,
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
        async: (context & Context.InAwaitContext) > 0,
        generator: (context & Context.InYieldContext) > 0,
        id,
        start,
        end: parser.endIndex,
        loc: setLoc(parser, line, column)
      }
    : {
        type,
        params,
        body,
        async: (context & Context.InAwaitContext) > 0,
        generator: (context & Context.InYieldContext) > 0,
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

  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 1);

  const body: any[] = [];
  const prevContext = context;

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
      } else {
        isStrictDirective = 0;
      }

      if (isStrictDirective === 0) {
        expression = parseNonDirectiveExpression(parser, context, expression, start, line, column);
      }
      expectSemicolon(parser, context);

      body.push(parseDirectives(parser, context, isUnicodeEscape, tokenValue, expression, start, line, column));
    }

    if (context & Context.Strict) {
      if (firstRestricted) {
        if ((firstRestricted & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
          report(parser, Errors.StrictEvalArguments);
        }
        if ((firstRestricted & Token.FutureReserved) === Token.FutureReserved) {
          report(parser, Errors.UnexpectedStrictReserved);
        }
      }
      if (scopeError && (prevContext & Context.Strict) === 0 && (context & Context.InGlobal) === 0) {
        reportScopeError(scopeError);
      }

      if ((parser.flags & Flags.StrictEvalArguments) === Flags.StrictEvalArguments)
        report(parser, Errors.StrictEvalArguments);

      if ((parser.flags & Flags.HasStrictReserved) === Flags.HasStrictReserved)
        report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  parser.flags = (parser.flags | 0b00000000000000000000110011100000) ^ 0b00000000000000000000110011100000;

  while (parser.token !== Token.RightBrace) {
    body.push(
      parseStatementListItem(
        parser,
        (context | Context.DisallowIn) ^ Context.DisallowIn,
        scope,
        Origin.TopLevel,
        null,
        null
      )
    );
  }

  consume(parser, context, Token.RightBrace, flags & FunctionFlag.IsDeclaration ? 1 : 0);

  parser.flags = (parser.flags | 0b00000000000000000000110100000000) ^ 0b00000000000000000000110100000000;

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
  inGroup: 0 | 1,
  curStart: number,
  curLine: number,
  curColumn: number
): ESTree.ClassExpression {
  nextToken(parser, context, /* allowRegExp */ 0);

  // Second set of context masks to fix 'super' edge cases
  const inheritedContext = (context | 0b00000001000000000010000000000000) ^ 0b00000001000000000010000000000000;

  context |= Context.Strict;

  let id: ESTree.Identifier | null = null;

  if (
    parser.token & (Token.Keyword | Token.FutureReserved | Token.IsIdentifier) &&
    parser.token !== Token.ExtendsKeyword
  ) {
    const { token, start, line, column, tokenValue } = parser;

    if (isStrictReservedWord(parser, context, token, inGroup)) report(parser, Errors.UnexpectedStrictReserved);

    nextToken(parser, context, /* allowRegExp */ 0);

    id = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);
  }
  return parseClassTail(
    parser,
    context,
    inheritedContext,
    id,
    inGroup,
    /* isDecl */ 0,
    'ClassExpression',
    curStart,
    curLine,
    curColumn
  ) as ESTree.ClassExpression;
}

export function parseClassTail(
  parser: ParserState,
  context: Context,
  inheritedContext: Context,
  id: any,
  inGroup: 0 | 1,
  isDecl: 0 | 1,
  type: 'ClassDeclaration' | 'ClassExpression',
  start: number,
  line: number,
  column: number
): any {
  let superClass: ESTree.Expression | null = null;

  if (parser.token === Token.ExtendsKeyword) {
    // ClassHeritage[opt] { ClassBody[opt] }

    nextToken(parser, context, /* allowRegExp */ 1);

    superClass = parseLeftHandSideExpression(parser, context, inGroup, 0, /* allowLHS */ 0);
    inheritedContext |= Context.SuperCall;
  } else {
    inheritedContext = (inheritedContext | Context.SuperCall) ^ Context.SuperCall;
  }
  const body = parseClassBody(parser, inheritedContext, context, isDecl, inGroup);

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
  isDecl: 0 | 1,
  inGroup: 0 | 1
): ESTree.ClassBody {
  const { start, line, column } = parser;

  consume(parser, context, Token.LeftBrace, /* allowRegExp */ 1);

  const body: ESTree.MethodDefinition[] = [];

  parser.flags = (parser.flags | 0b00000000000000000000000000000001) ^ 0b00000000000000000000000000000001;

  while (parser.token === Token.Semicolon) {
    nextToken(parser, context, /* allowRegExp */ 0);
  }

  while (parser.token !== Token.RightBrace) {
    body.push(
      parseClassElementList(
        parser,
        context,
        inheritedContext,
        Flags.Empty,
        null,
        0,
        inGroup,
        PropertyKind.None,
        parser.start,
        parser.line,
        parser.column
      )
    );

    while ((parser.token as Token) === Token.Semicolon) {
      nextToken(parser, context, /* allowRegExp */ 0);
    }
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ isDecl ? 1 : 0);

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
  mutualFlag: Flags,
  key: any,
  isComputed: 0 | 1,
  inGroup: 0 | 1,
  type: PropertyKind,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  const { token, start, line, column } = parser;

  if ((token & 0b00000000001001110000000000000000) > 0) {
    key = parseIdentifier(parser, context);

    if (parser.token !== Token.LeftParen) {
      switch (token) {
        case Token.StaticKeyword:
          if ((type & PropertyKind.Static) === 0) {
            return parseClassElementList(
              parser,
              context,
              inheritedContext,
              mutualFlag,
              key,
              isComputed,
              inGroup,
              type | PropertyKind.Static,
              start,
              line,
              column
            );
          }
          break;

        case Token.AsyncKeyword:
          if (parser.newLine === 0) {
            type |=
              PropertyKind.Async |
              (consumeOpt(parser, context, Token.Multiply, /* allowRegExp */ 0) ? PropertyKind.Generator : 0);
          }
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
  } else {
    switch (token) {
      case Token.NumericLiteral:
      case Token.StringLiteral:
        key = parseLiteral(parser, context);
        break;
      case Token.BigIntLiteral:
        key = parseBigIntLiteral(parser, context);
        break;
      case Token.LeftBracket:
        isComputed = 1;
        key = parseComputedPropertyName(parser, inheritedContext, inGroup);
        break;
      case Token.Multiply:
        type |= PropertyKind.Generator;
        nextToken(parser, context, /* allowRegExp */ 0); // skip: '*'
        break;
      default:
        report(parser, Errors.UnexpectedToken, KeywordDescTable[parser.token & 0b00000000000000000000000011111111]);
    }
  }

  if ((type & 0b00000000000000000000000110011000) > 0) {
    if ((parser.token & 0b00000000001001110000000000000000) > 0) {
      key = parseIdentifier(parser, context);
    } else if ((parser.token & 0b00000000000010000000000000000000) > 0) {
      key = parseLiteral(parser, context);
    } else if (parser.token === Token.LeftBracket) {
      isComputed = 1;
      key = parseComputedPropertyName(parser, context, 0);
    } else if (parser.token === Token.BigIntLiteral) {
      key = parseBigIntLiteral(parser, context);
    } else report(parser, Errors.InvalidKeyToken);
  }

  if (isComputed === 0) {
    if (parser.tokenValue === 'constructor') {
      if ((type & PropertyKind.Static) === 0 && parser.token === Token.LeftParen) {
        if ((type & 0b00000000000000000000000110011000) > 0) {
          report(parser, Errors.InvalidConstructor, 'accessor');
        }
        if ((context & Context.SuperCall) !== Context.SuperCall) {
          if (parser.flags & Flags.HasConstructor) report(parser, Errors.DuplicateConstructor);
          else parser.flags |= Flags.HasConstructor;
        }
      }
      type |= PropertyKind.Constructor;
    } else if ((type & 0b00000000000000000000000110111000) > 0 && parser.tokenValue === 'prototype') {
      report(parser, Errors.StaticPrototype);
    }
  }

  mutualFlag = parser.flags;

  const value =
    (type & 0b00000000000000000000000110000000) > 0
      ? parseGetterSetter(parser, context | Context.Strict, type)
      : parseMethodDefinition(parser, context | Context.Strict, type);

  parser.flags =
    (mutualFlag | Flags.StrictEvalArguments | Flags.HasStrictReserved) ^
    (Flags.StrictEvalArguments | Flags.HasStrictReserved);

  const kind =
    (type & PropertyKind.Static) === 0 && type & PropertyKind.Constructor
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
        static: (type & PropertyKind.Static) > 0,
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
        static: (type & PropertyKind.Static) > 0,
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

export function parseComputedPropertyName(parser: ParserState, context: Context, inGroup: 0 | 1) {
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
    ((context | 0b00010000111000000000000000000000 | modifierFlags) ^
      (0b00010000111000000000000000000000 | modifierFlags)) |
    ((kind & 0b0000000000000000000_0000_01011000) << 18) |
    0b0000110000001000000_0000_00000000 |
    (kind & PropertyKind.Async ? Context.InAwaitContext : 0) |
    (kind & PropertyKind.Generator ? Context.InYieldContext : 0);

  return parseFunctionLiteral(
    parser,
    context,
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

  const modifierFlags =
    (kind & PropertyKind.Constructor) === 0 ? 0b0000001111010000000_0000_00000000 : 0b0000000111000000000_0000_00000000;

  context =
    ((context | 0b00010000111000000000000000000000 | modifierFlags) ^
      (0b00010000111000000000000000000000 | modifierFlags)) |
    ((kind & 0b0000000000000000000_0000_01011000) << 18) |
    0b0000110000001000000_0000_00000000 |
    (kind & PropertyKind.Async ? Context.InAwaitContext : 0) |
    (kind & PropertyKind.Generator ? Context.InYieldContext : 0);

  if (parser.token !== Token.RightParen) {
    if (kind & PropertyKind.Getter) report(parser, Errors.AccessorWrongArgs, 'Getter', 'no', 's');

    let argCount = 0;
    let left: any;

    let isSimpleParameterList: 0 | 1 = 0;
    while ((parser.token as Token) !== Token.RightParen) {
      const { start, line, column, token, tokenValue } = parser;

      if ((parser.token & 0b00000000001001110000000000000000) > 0) {
        if ((context & Context.Strict) !== Context.Strict) {
          parser.flags |=
            ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.HasStrictReserved : 0) |
            ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments ? Flags.StrictEvalArguments : 0);
        }

        left = parseAndClassifyIdentifier(
          parser,
          context,
          scope,
          token,
          tokenValue,
          BindingKind.ArgumentList,
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

    parser.flags |= isSimpleParameterList === 1 ? Flags.SimpleParameterList : 0;
  } else if (kind & PropertyKind.Setter) {
    report(parser, Errors.AccessorWrongArgs, 'Setter', 'one', '');
  }

  consume(parser, context, Token.RightParen, /* allowRegExp */ 0);

  return context & Context.OptionsLoc
    ? {
        type: 'FunctionExpression',
        params,
        body: parseFunctionBody(parser, context, scope, void 0, FunctionFlag.None, void 0),
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
        body: parseFunctionBody(parser, context, scope, void 0, FunctionFlag.None, void 0),
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
  origin: Origin,
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

    if ((token & 0b00000000001001110000000000000000) > 0) {
      if ((context & Context.Strict) !== Context.Strict) {
        parser.flags |=
          ((token & Token.FutureReserved) === Token.FutureReserved ? Flags.HasStrictReserved : 0) |
          ((token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments ? Flags.StrictEvalArguments : 0);
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
      isSimpleParameterList = 1;

      if (parser.token === Token.LeftBracket) {
        left = parseArrayExpressionOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column);
        isSimpleParameterList = 1;
      } else if (parser.token === Token.LeftBrace) {
        left = parseObjectLiteralOrPattern(parser, context, scope, 1, 1, 0, kind, origin, start, line, column);
        isSimpleParameterList = 1;
      } else if (parser.token === Token.Ellipsis) {
        left = parseSpreadOrRestElement(
          parser,
          context,
          scope,
          Token.RightParen,
          1,
          0,
          0,
          kind,
          origin,
          start,
          line,
          column
        );
      } else {
        report(parser, Errors.Unexpected);
      }

      if (parser.flags & (Flags.AssignableDestruct | Flags.NotDestructible)) {
        report(parser, Errors.InvalidBindingDestruct);
      }
    }

    if (parser.token === Token.Assign) {
      isSimpleParameterList = 1;

      left = parseAssignmentOrPattern(parser, context, /* isPattern */ 1, 0, left, '=', start, line, column);
    }

    params.push(left);

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 0);

    if ((parser.token as Token) === Token.RightParen) {
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

  let mutualFlag: Flags = Flags.Empty;
  let prototypeCount = 0;
  let key: any = null;
  let value;
  let state = PropertyKind.None;
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
          inGroup,
          type,
          origin,
          start,
          line,
          column
        )
      );
    } else {
      state = PropertyKind.None;

      if ((token & 0b00000000001001110000000000000000) > 0) {
        nextToken(parser, context, /* allowRegExp */ 0);

        key = parseIdentifierFromValue(parser, context, tokenValue, start, line, column);

        if (
          parser.token === Token.Comma ||
          (parser.token as Token) === Token.RightBrace ||
          parser.token === Token.Assign
        ) {
          state |= PropertyKind.Shorthand;

          if (context & Context.Strict && (token & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
            mutualFlag |= Flags.NotDestructible;
          } else {
            validateIdentifier(parser, context, type, token);
          }

          addVarOrBlock(parser, context, scope, tokenValue, type, origin);

          if (parser.token === Token.Assign) {
            mutualFlag |= Flags.MustDestruct;

            value = parseAssignmentOrPattern(parser, context, isPattern, inGroup, key, '=', start, line, column);
          } else {
            mutualFlag |= inGroup === 1 && token === Token.AwaitKeyword ? Flags.SeenAwait : 0;

            value = key;
          }
        } else if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1);

          const { start, line, column } = parser;

          if (tokenValue === '__proto__') prototypeCount++;

          if ((parser.token & 0b00000000001001110000000000000000) > 0) {
            const { token: tokenAfterColon, tokenValue: valueAfterColon } = parser;

            value = parsePrimaryExpression(parser, context, type, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);

            const { token } = parser;

            value = parseMemberExpression(parser, context, value, 0, start, line, column);

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (
                (token as Token) === Token.Assign ||
                (token as Token) === Token.RightBrace ||
                (token as Token) === Token.Comma
              ) {
                if (parser.assignable === 0) {
                  mutualFlag |= Flags.NotDestructible;
                } else if ((tokenAfterColon & 0b00000000001000010000000000000000) > 0) {
                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                }
              } else {
                mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
              if (parser.assignable === 0) {
                mutualFlag |= Flags.NotDestructible;
              } else if ((token as Token) !== Token.Assign) {
                mutualFlag |= Flags.AssignableDestruct;
              } else {
                addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
              }
              value = parseAssignmentExpression(parser, context, isPattern, inGroup, value, start, line, column);
            } else {
              mutualFlag |= Flags.NotDestructible;
              if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
                value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
              }
              if ((parser.token as Token) === Token.QuestionMark) {
                value = parseConditionalExpression(parser, context, value, start, line, column);
              }
            }
          } else if (((parser.token as Token) & Token.IsPatternStart) === Token.IsPatternStart) {
            value =
              (parser.token as Token) === Token.LeftBrace
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

            mutualFlag = parser.flags;

            parser.assignable = mutualFlag & Flags.NotDestructible ? 0 : 1;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else if (parser.flags & Flags.MustDestruct) {
              report(parser, Errors.InvalidDestructuringTarget);
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if (((parser.token as Token) & Token.IsAssignOp) === Token.IsAssignOp) {
                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) > 0) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }
                if ((parser.token as Token) === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

            mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token as Token) !== Token.Comma && (token as Token) !== Token.RightBrace) {
                if ((parser.token as Token) !== Token.Assign) mutualFlag |= Flags.NotDestructible;
                value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
              }
            }
          }
        } else if (parser.token === Token.LeftBracket) {
          mutualFlag |= Flags.NotDestructible;

          state |= token === Token.AsyncKeyword ? PropertyKind.Async : 0;

          state |=
            (token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method) | PropertyKind.Computed;

          key = parseComputedPropertyName(parser, context, 0);

          value = parseMethodDefinition(parser, context, state);
        } else if ((parser.token & 0b00000000001001110000000000000000) > 0) {
          mutualFlag |= Flags.NotDestructible;

          if ((parser.token as Token) === Token.AsyncKeyword) {
            state |= PropertyKind.Async;
          }
          key = parseIdentifier(parser, context);

          if (token === Token.AsyncKeyword) state |= PropertyKind.Async;

          state |=
            token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method;

          value =
            (state & 0b00000000000000000000000110000000) > 0
              ? parseGetterSetter(parser, context, state)
              : parseMethodDefinition(parser, context, state);
        } else if (parser.token === Token.LeftParen) {
          mutualFlag |= Flags.NotDestructible;

          state |= PropertyKind.Method;

          value = parseMethodDefinition(parser, context, state);
        } else if (parser.token === Token.Multiply) {
          if (token === Token.GetKeyword || token === Token.SetKeyword) {
            report(parser, Errors.InvalidGeneratorGetter);
          }

          mutualFlag |= Flags.NotDestructible;

          nextToken(parser, context, /* allowRegExp */ 0);

          state |=
            PropertyKind.Generator | PropertyKind.Method | (token === Token.AsyncKeyword ? PropertyKind.Async : 0);

          if ((parser.token & 0b00000000001001110000000000000000) > 0) {
            key = parseIdentifier(parser, context);
          } else if ((parser.token & 0b00000000000010000000000000000000) > 0) {
            key = parseLiteral(parser, context);
          } else if ((parser.token as Token) === Token.LeftBracket) {
            state |= PropertyKind.Computed;
            key = parseComputedPropertyName(parser, context, inGroup);
          } else {
            report(parser, Errors.Unexpected);
          }
          value = parseMethodDefinition(parser, context, state);
        } else if ((parser.token & 0b00000000000010000000000000000000) > 0) {
          if (token === Token.AsyncKeyword) state |= PropertyKind.Async;

          state |=
            token === Token.GetKeyword
              ? PropertyKind.Getter
              : token === Token.SetKeyword
              ? PropertyKind.Setter
              : PropertyKind.Method;

          mutualFlag |= Flags.NotDestructible;

          key = parseLiteral(parser, context);

          value =
            (state & 0b00000000000000000000000110000000) > 0
              ? parseGetterSetter(parser, context, state)
              : parseMethodDefinition(parser, context, state);
        } else {
          report(parser, Errors.Unexpected);
        }
      } else if ((parser.token & 0b00000000000010000000000000000000) > 0) {
        key = parseLiteral(parser, context);

        if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1);

          const { start, line, column } = parser;

          if (tokenValue === '__proto__') prototypeCount++;

          if ((parser.token & 0b00000000001001110000000000000000) > 0) {
            value = parsePrimaryExpression(parser, context, type, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);

            const { token, tokenValue: valueAfterColon } = parser;

            value = parseMemberExpression(parser, context, value, 0, start, line, column);

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (
                (token as Token) === Token.Assign ||
                (token as Token) === Token.RightBrace ||
                (token as Token) === Token.Comma
              ) {
                if (parser.assignable === 0) {
                  mutualFlag |= Flags.NotDestructible;
                } else if (scope) {
                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                }
              } else {
                mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else if ((parser.token as Token) === Token.Assign) {
              mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : 0;
              value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
            } else {
              mutualFlag |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
            }
          } else if ((parser.token & 0b00000010000000000000000000000000) > 0) {
            value =
              (parser.token as Token) === Token.LeftBrace
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

            mutualFlag = parser.flags;

            parser.assignable = mutualFlag & Flags.NotDestructible ? 0 : 1;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else if (parser.flags & Flags.MustDestruct) {
              report(parser, Errors.InvalidDestructuringTarget);
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) > 0) {
                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) > 0) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }

                if ((parser.token as Token) === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, 1, 1);

            mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) {
                mutualFlag |= Flags.NotDestructible;
              }
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token as Token) !== Token.Comma && (parser.token as Token) !== Token.RightBrace) {
                if ((parser.token as Token) !== Token.Assign) mutualFlag |= Flags.NotDestructible;

                value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
              }
            }
          }
        } else if ((parser.token as Token) === Token.LeftParen) {
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else {
          report(parser, Errors.Unexpected);
        }
      } else if ((parser.token as Token) === Token.LeftBracket) {
        key = parseComputedPropertyName(parser, context, inGroup);

        state |= PropertyKind.Computed;

        if ((parser.token as Token) === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1); // skip ':'

          const { start, line, column, tokenValue, token: tokenAfterColon } = parser;

          if ((parser.token & 0b00000000001001110000000000000000) > 0) {
            value = parsePrimaryExpression(parser, context, type, 0, 1, 1, inGroup, start, line, column);

            const { token } = parser;

            value = parseMemberExpression(parser, context, value, 0, start, line, column);

            if ((parser.token & Token.IsAssignOp) > 0) {
              mutualFlag |=
                parser.assignable === 0 ? Flags.NotDestructible : token === Token.Assign ? 0 : Flags.AssignableDestruct;

              value = parseAssignmentOrPattern(
                parser,
                context,
                isPattern,
                0,
                value as any,
                KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
                start,
                line,
                column
              );
            } else if (parser.token === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (token === Token.Assign || (token as Token) === Token.RightBrace || token === Token.Comma) {
                if (parser.assignable === 0) {
                  mutualFlag |= Flags.NotDestructible;
                } else if ((tokenAfterColon & Token.IsIdentifier) === Token.IsIdentifier) {
                  addVarOrBlock(parser, context, scope, tokenValue, type, origin);
                }
              } else {
                mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else {
              mutualFlag |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
            }
          } else if (((parser.token as Token) & Token.IsPatternStart) === Token.IsPatternStart) {
            value =
              (parser.token as Token) === Token.LeftBrace
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

            mutualFlag = parser.flags;

            parser.assignable = mutualFlag & Flags.NotDestructible ? 0 : 1;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else {
              if (mutualFlag & Flags.MustDestruct) report(parser, Errors.InvalidShorthandPropInit);

              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? mutualFlag | Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
                if (parser.token !== Token.Assign) mutualFlag |= Flags.NotDestructible;

                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
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
                mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

            mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if (parser.token === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 1 ? 0 : Flags.NotDestructible;

              if ((parser.token as Token) !== Token.Comma && (parser.token as Token) !== Token.RightBrace) {
                if (parser.token !== Token.Assign) mutualFlag |= Flags.NotDestructible;
                value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
              }
            }
          }
        } else if (parser.token === Token.LeftParen) {
          state |= PropertyKind.Method;
          mutualFlag |= parser.flags & Flags.SeenAwait ? Flags.SeenAwait : 0;
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else {
          report(parser, Errors.InvalidComputedPropName);
        }
      } else if (token === Token.Multiply) {
        consume(parser, context, Token.Multiply, /* allowRegExp */ 0);

        state |= PropertyKind.Generator;

        if ((parser.token & 0b00000000001001110000000000000000) > 0) {
          key = parseIdentifier(parser, context);

          state |= PropertyKind.Method;

          if (parser.token === Token.LeftParen) {
            mutualFlag |= Flags.NotDestructible;
            value = parseMethodDefinition(parser, context, state);
          } else {
            report(parser, Errors.Unexpected);
          }
        } else if ((parser.token & 0b00000000000010000000000000000000) > 0) {
          key = parseLiteral(parser, context);
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else if (parser.token === Token.LeftBracket) {
          state |= PropertyKind.Computed | PropertyKind.Method;
          key = parseComputedPropertyName(parser, context, 0);
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else if (parser.token === Token.BigIntLiteral) {
          key = parseBigIntLiteral(parser, context);
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else {
          report(parser, Errors.InvalidObjLitKeyStar);
        }
      } else if ((parser.token as Token) === Token.BigIntLiteral) {
        key = parseBigIntLiteral(parser, context);

        if (parser.token === Token.Colon) {
          nextToken(parser, context, /* allowRegExp */ 1);

          const { start, line, column } = parser;

          if ((parser.token & 0b00000000001001110000000000000000) > 0) {
            value = parsePrimaryExpression(parser, context, type, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);

            const { token, tokenValue: valueAfterColon } = parser;

            value = parseMemberExpression(parser, context, value, 0, start, line, column);

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (
                (token as Token) === Token.Assign ||
                (token as Token) === Token.RightBrace ||
                (token as Token) === Token.Comma
              ) {
                if (parser.assignable === 0) {
                  mutualFlag |= Flags.NotDestructible;
                } else if (scope) {
                  addVarOrBlock(parser, context, scope, valueAfterColon, type, origin);
                }
              } else {
                mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
              }
            } else if ((parser.token as Token) === Token.Assign) {
              mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : 0;
              value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
            } else {
              mutualFlag |= Flags.NotDestructible;
              value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
            }
          } else if ((parser.token & 0b00000010000000000000000000000000) > 0) {
            value =
              (parser.token as Token) === Token.LeftBrace
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

            mutualFlag = parser.flags;

            parser.assignable = mutualFlag & Flags.NotDestructible ? 0 : 1;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) mutualFlag |= Flags.NotDestructible;
            } else if (parser.flags & Flags.MustDestruct) {
              report(parser, Errors.InvalidDestructuringTarget);
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token & Token.IsAssignOp) > 0) {
                value = parseAssignmentOrPattern(
                  parser,
                  context,
                  isPattern,
                  0,
                  value as any,
                  KeywordDescTable[parser.token & 0b00000000000000000000000011111111] as ESTree.AssignmentOperator,
                  start,
                  line,
                  column
                );
              } else {
                if ((parser.token & Token.IsBinaryOp) > 0) {
                  value = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, value as any);
                }

                if ((parser.token as Token) === Token.QuestionMark) {
                  value = parseConditionalExpression(parser, context, value, start, line, column);
                }
                mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
              }
            }
          } else {
            value = parseLeftHandSideExpression(parser, context, 0, 1, 1);

            mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;

            if ((parser.token as Token) === Token.Comma || (parser.token as Token) === Token.RightBrace) {
              if (parser.assignable === 0) {
                mutualFlag |= Flags.NotDestructible;
              }
            } else {
              value = parseMemberExpression(parser, context, value, 0, start, line, column);

              mutualFlag = parser.assignable === 0 ? Flags.NotDestructible : 0;

              if ((parser.token as Token) !== Token.Comma && (parser.token as Token) !== Token.RightBrace) {
                if ((parser.token as Token) !== Token.Assign) mutualFlag |= Flags.NotDestructible;

                value = parseAssignmentExpression(parser, context, isPattern, 0, value, start, line, column);
              }
            }
          }
        } else if ((parser.token as Token) === Token.LeftParen) {
          state |= PropertyKind.Method;
          value = parseMethodDefinition(parser, context, state);
          mutualFlag |= Flags.NotDestructible;
        } else {
          report(parser, Errors.Unexpected);
        }
      } else {
        report(parser, Errors.UnexpectedToken, KeywordDescTable[token & 0b00000000000000000000000011111111]);
      }

      parser.flags =
        ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

      kind = (state & 0b00000000000000000000000110000000) === 0 ? 'init' : state & PropertyKind.Setter ? 'set' : 'get';

      properties.push(
        context & Context.OptionsLoc
          ? {
              type: 'Property',
              key,
              value,
              kind,
              computed: (state & PropertyKind.Computed) > 0,
              method: (state & PropertyKind.Method) > 0,
              shorthand: (state & PropertyKind.Shorthand) > 0,
              start,
              end: parser.endIndex,
              loc: setLoc(parser, line, column)
            }
          : {
              type: 'Property',
              key,
              value,
              kind,
              computed: (state & PropertyKind.Computed) > 0,
              method: (state & PropertyKind.Method) > 0,
              shorthand: (state & PropertyKind.Shorthand) > 0
            }
      );
    }

    mutualFlag |= parser.flags;

    if (parser.token !== Token.Comma) break;

    nextToken(parser, context, /* allowRegExp */ 0);
  }

  consume(parser, context, Token.RightBrace, /* allowRegExp */ 0);

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
      mutualFlag,
      isPattern,
      inGroup,
      curStart,
      curLine,
      curColumn,
      node
    );
  }

  parser.flags =
    ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) |
    (mutualFlag | (prototypeCount > 1 ? 0b00000000000000000000001000000000 : 0));

  return node;
}

export function parseSpreadOrRestElement(
  parser: ParserState,
  context: Context,
  scope: any,
  closingToken: Token,
  isPattern: 0 | 1,
  isAsync: 0 | 1,
  inGroup: 0 | 1,
  kind: BindingKind,
  origin: Origin,
  curStart: number,
  curLine: number,
  curColumn: number
): any {
  nextToken(parser, context, /* allowRegExp */ 1); // skip '...'

  let argument: any;
  let mutualFlag: Flags = Flags.Empty;

  const { start, line, column, token, tokenValue } = parser;

  if ((token & 0b00000000001001110000000000000000) > 0) {
    parser.assignable = 1;

    argument = parsePrimaryExpression(parser, context, kind, 0, /* allowLHS */ 1, 1, inGroup, start, line, column);

    const isClosingTokenOrComma = parser.token === closingToken || parser.token === Token.Comma;

    argument = parseMemberExpression(parser, context, argument, 0, start, line, column);

    if (parser.token !== Token.Comma && parser.token !== closingToken) {
      if ((parser.assignable as 0 | 1) === 0 && parser.token === Token.Assign)
        report(parser, Errors.InvalidDestructuringTarget);

      mutualFlag |= Flags.NotDestructible;

      argument = parseAssignmentExpression(parser, context, isPattern, 0, argument, start, line, column);
    }
    if ((parser.assignable as 0 | 1) === 0) {
      mutualFlag |= Flags.NotDestructible;
    } else if (isClosingTokenOrComma) {
      addVarOrBlock(parser, context, scope, tokenValue, kind, origin);
    } else {
      mutualFlag |= Flags.AssignableDestruct;
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
        argument = parseMemberExpression(parser, context, argument, 0, start, line, column);
        mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : 0;

        if ((parser.token & Token.IsAssignOp) === Token.IsAssignOp) {
          if (parser.token !== Token.Assign) mutualFlag |= Flags.NotDestructible;
          argument = parseAssignmentExpression(parser, context, isPattern, 0, argument, start, line, column);
        } else {
          if ((parser.token & Token.IsBinaryOp) === Token.IsBinaryOp) {
            argument = parseBinaryExpression(parser, context, 0, 0, parser.token, start, line, column, argument as any);
          }
          if (parser.token === Token.QuestionMark) {
            argument = parseConditionalExpression(parser, context, argument, start, line, column);
          }
          mutualFlag |= parser.assignable === 0 ? Flags.NotDestructible : Flags.AssignableDestruct;
        }
      } else {
        mutualFlag |=
          closingToken === Token.RightBrace && token !== Token.Assign ? Flags.NotDestructible : parser.flags;
      }
    } else {
      mutualFlag |= Flags.AssignableDestruct;

      argument = parseLeftHandSideExpression(parser, context, 0, /* allowLHS */ 1, 1);

      const token = parser.token;

      if (token === Token.Assign && token !== closingToken && (token as Token) !== Token.Comma) {
        if (parser.assignable === 0) report(parser, Errors.CantAssignTo);
        argument = parseAssignmentExpression(parser, context, isPattern, 0, argument, start, line, column);
        mutualFlag |= Flags.NotDestructible;
      } else {
        if (token === Token.Comma) {
          mutualFlag |= Flags.NotDestructible;
        } else if (token !== closingToken) {
          argument = parseAssignmentExpression(parser, context, 0, 0, argument, start, line, column);
        }
        mutualFlag |= parser.assignable === 1 ? Flags.AssignableDestruct : Flags.NotDestructible;
      }

      parser.flags =
        ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

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
    if (kind & BindingKind.ArgumentList) mutualFlag |= isAsync ? Flags.NotDestructible : Flags.AssignableDestruct;

    if (parser.token === Token.Assign) {
      if (mutualFlag & Flags.NotDestructible) report(parser, Errors.CantAssignTo);

      argument = parseAssignmentOrPattern(parser, context, isPattern, 0, argument, '=', curStart, curLine, curColumn);

      mutualFlag = Flags.NotDestructible;
    } else {
      // Note the difference between '|=' and '=' above
      mutualFlag |= Flags.NotDestructible;
    }
  }

  parser.flags =
    ((parser.flags | 0b00000000000000000000000000011110) ^ 0b00000000000000000000000000011110) | mutualFlag;

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

  if (parser.token === Token.Ellipsis) report(parser, Errors.InvalidSpreadInImport);

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
    if ((t & Token.FutureReserved) === Token.FutureReserved) {
      report(parser, Errors.UnexpectedStrictReserved);
    } else if ((t & Token.IsEvalOrArguments) === Token.IsEvalOrArguments) {
      report(parser, Errors.UnexpectedStrictReserved);
    }
  }

  if (context & (Context.InAwaitContext | Context.Module) && t === Token.AwaitKeyword) {
    report(parser, Errors.AwaitOutsideAsync);
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

  if ((token & 0b00000000001001110000000000000000) > 0) {
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

export function parseDirectives(
  parser: ParserState,
  context: Context,
  isUnicodeEscape: 0 | 1,
  value: string,
  expression: any,
  start: number,
  line: number,
  column: number
) {
  return context & Context.OptionsDirectives
    ? context & Context.OptionsLoc
      ? {
          type: 'ExpressionStatement',
          expression,
          directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : value,
          start,
          end: parser.endIndex,
          loc: setLoc(parser, line, column)
        }
      : {
          type: 'ExpressionStatement',
          expression,
          directive: isUnicodeEscape ? parser.source.slice(parser.start, parser.index) : value
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
      };
}

export function parseNonDirectiveExpression(
  parser: ParserState,
  context: Context,
  expr: any,
  start: number,
  line: number,
  column: number
): any {
  /** MemberExpression :
   *   1. PrimaryExpression
   *   2. MemberExpression [ AssignmentExpression ]
   *   3. MemberExpression . IdentifierName
   *   4. MemberExpression TemplateLiteral
   *
   * CallExpression :
   *   1. MemberExpression Arguments
   *   2. CallExpression ImportCall
   *   3. CallExpression Arguments
   *   4. CallExpression [ AssignmentExpression ]
   *   5. CallExpression . IdentifierName
   *   6. CallExpression TemplateLiteral
   *
   *  UpdateExpression ::
   *   ('++' | '--')? LeftHandSideExpression
   *
   */
  expr = parseMemberExpression(parser, context, expr, 0, start, line, column);
  /** AssignmentExpression :
   *   1. ConditionalExpression
   *   2. LeftHandSideExpression = AssignmentExpression
   */
  expr = parseAssignmentExpression(parser, context, 0, 0, expr, start, line, column);
  return parser.token === Token.Comma ? parseSequenceExpression(parser, context, expr, start, line, column) : expr;
}
