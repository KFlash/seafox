import { ParserState } from './parser/common';

/*@internal*/
export const enum Errors {
  Unexpected,
  IDStartAfterNumber,
  InvalidBigIntLiteral,
  StrictOctalEscape,
  MissingExponent,
  UnterminatedString,
  OptionalChainingNoTemplate,
  ContinuousNumericSeparator,
  TrailingNumericSeparator,
  MissingDigits,
  UnterminatedComment,
  HtmlCommentInModule,
  UnterminatedRegExp,
  UnexpectedTokenRegExpFlag,
  DuplicateRegExpFlag,
  InvalidEightAndNine,
  TemplateOctalLiteral,
  InvalidHexEscapeSequence,
  UnicodeOverflow,
  InvalidUnicodeEscapeSequence,
  IllegalCaracter,
  DuplicateBinding,
  ShadowedCatchClause,
  DuplicateIdentifier,
  StrictFunctionName,
  UnexpectedStrictReserved,
  StrictEvalArguments,
  KeywordNotId,
  InvalidLetConstBinding,
  AwaitOutsideAsync,
  DisallowedInContext,
  DeclNoName,
  ForInOfLoopInitializer,
  DeclarationMissingInitializer,
  ForInOfLoopMultiBindings,
  YieldInParameter,
  AwaitInParameter,
  AccessorWrongArgs,
  BadSetterRestParameter,
  DisallowedLetInStrict,
  ForOfLet,
  NoCatchOrFinally,
  StrictWith,
  NewlineAfterThrow,
  InvalidCoalescing,
  OptionalChainingNoNew,
  InvalidIncDecNew,
  InvalidNewUnary,
  ImportMetaOutsideModule,
  InvalidImportExportSloppy,
  InvalidImportNew,
  InvalidKeyToken,
  InvalidConstructor,
  DuplicateConstructor,
  StaticPrototype,
  InvalidDestructuringTarget,
  AsyncRestrictedProd,
  InvalidShorthandPropInit,
  InvalidComputedPropName,
  CantAssignTo,
  UnclosedSpreadElement,
  CantAssignToValidRHS,
  InvalidRestArg,
  InvalidPatternTail,
  InvalidTernaryYield,
  InvalidIncDecTarget,
  InvalidRestNotLast,
  DuplicateProto,
  CantAssignToInOfForLoop,
  InvalidBindingDestruct,
  InvalidArrowDestructLHS,
  InvalidLHSAsyncArrow,
  InvalidAssignmentTarget,
  InvalidAsyncArrow,
  UncompleteArrow,
  InvalidExponentationLHS,
  StrictDelete,
  InvalidLineBreak,
  AsyncFunctionInSingleStatementContext,
  UnknownLabel,
  IllegalContinue,
  StrictFunction,
  SloppyFunction,
  ClassForbiddenAsStatement,
  InvalidBreak
}

/*@internal*/
export const errorMessages: {
  [key: string]: string;
} = {
  [Errors.StrictFunction]:
    'In strict mode code or without web compability enabled, functions can only be declared at top level or inside a block',
  [Errors.SloppyFunction]:
    'In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement',
  [Errors.ClassForbiddenAsStatement]: "Class declaration can't appear in single-statement context",
  [Errors.UnknownLabel]: "Undefined label '%0'",
  [Errors.IllegalContinue]: 'Illegal continue statement',
  [Errors.UnexpectedStrictReserved]: 'Unexpected strict mode reserved word',
  [Errors.StrictEvalArguments]: 'Unexpected eval or arguments in strict mode',
  [Errors.KeywordNotId]: 'Invalid keyword',
  [Errors.InvalidLetConstBinding]: "'A lexical declaration can't define a 'let' binding",
  [Errors.AwaitOutsideAsync]: 'Await is only valid in async functions',
  [Errors.DisallowedInContext]: "'%0' may not be used as an identifier in this context",
  [Errors.CantAssignToInOfForLoop]: 'Invalid left-hand side in for-%0',
  [Errors.DuplicateProto]: 'Property name __proto__ appears more than once in object literal',
  [Errors.AsyncFunctionInSingleStatementContext]:
    'Async functions can only be declared at the top level or inside a block',
  [Errors.Unexpected]: 'Unexpected token',
  [Errors.InvalidLineBreak]: "No line break is allowed after '=>'",
  [Errors.InvalidBreak]: 'Illegal break statement',
  [Errors.InvalidExponentationLHS]:
    'Unary expressions as the left operand of an exponentation expression must be disambiguated with parentheses',
  [Errors.StrictDelete]: 'Calling delete on expression not allowed in strict mode',
  [Errors.UncompleteArrow]: "Expected '=>'",
  [Errors.InvalidAssignmentTarget]: '`=>` is an invalid assignment target',
  [Errors.InvalidAsyncArrow]: 'Async arrow can not be followed by new expression',
  [Errors.InvalidLHSAsyncArrow]: 'Invalid left-hand side in async arrow',
  [Errors.InvalidArrowDestructLHS]: 'The left-hand side of the arrow can only be destructed through assignment',
  [Errors.InvalidBindingDestruct]: 'The binding declaration is not destructible',
  [Errors.InvalidPatternTail]: 'Pattern can not have a tail',
  [Errors.InvalidDestructuringTarget]: 'Invalid destructuring assignment target',
  [Errors.InvalidTernaryYield]: 'Can not have a `yield` expression on the left side of a ternary',
  [Errors.InvalidIncDecTarget]: 'Invalid increment/decrement operand',
  [Errors.InvalidShorthandPropInit]: 'Invalid shorthand property initializer',
  [Errors.CantAssignToValidRHS]: 'Invalid left-hand side assignment to a destructible right-hand side',
  [Errors.CantAssignTo]: 'Invalid left-hand side in assignment',
  [Errors.InvalidRestNotLast]: 'The rest argument must the be last parameter',
  [Errors.InvalidRestArg]: 'Invalid rest argument',
  [Errors.UnclosedSpreadElement]: 'Encountered invalid input after spread/rest argument',
  [Errors.InvalidComputedPropName]: 'A computed property name must be followed by a colon or paren',
  [Errors.AsyncRestrictedProd]: 'Async methods are a restricted production and cannot have a newline following it',
  [Errors.StaticPrototype]: "Classes may not have a static property named 'prototype'",
  [Errors.DuplicateConstructor]: 'Duplicate constructor method in class',
  [Errors.InvalidConstructor]: 'Class constructor may not be a %0',
  [Errors.InvalidKeyToken]: 'Invalid key token',
  [Errors.IDStartAfterNumber]: 'Unexpected identifier after numeric literal',
  [Errors.InvalidBigIntLiteral]: 'Invalid BigInt syntax',
  [Errors.StrictOctalEscape]: 'Octal escape sequences are not allowed in strict mode',
  [Errors.MissingExponent]: 'Non-number found after exponent indicator',
  [Errors.UnterminatedString]: 'Unterminated string literal',
  [Errors.OptionalChainingNoTemplate]: 'OptionalChainingNoTemplate',
  [Errors.HtmlCommentInModule]: 'HTML comments are not allowed in modules or without AnnexB support',
  [Errors.TrailingNumericSeparator]: 'Numeric separators are not allowed at the end of numeric literals',
  [Errors.ContinuousNumericSeparator]: 'Only one underscore is allowed as numeric separator',
  [Errors.MissingDigits]: 'Missing digits',
  [Errors.UnterminatedComment]: 'Multiline comment was not closed properly',
  [Errors.UnterminatedRegExp]: 'Unterminated regular expression',
  [Errors.UnexpectedTokenRegExpFlag]: 'Unexpected regular expression flag',
  [Errors.DuplicateRegExpFlag]: "Duplicate regular expression flag '%0'",
  [Errors.InvalidIncDecNew]: 'Invalid use of `new` keyword on an increment/decrement expression',
  [Errors.InvalidNewUnary]: "Invalid use of '%0' inside new expression",
  [Errors.InvalidImportNew]: 'Cannot use new with import(...)',
  [Errors.InvalidEightAndNine]: 'Escapes \\8 or \\9 are not syntactically valid escapes',
  [Errors.TemplateOctalLiteral]: 'Octal escape sequences are not allowed in template strings',
  [Errors.InvalidHexEscapeSequence]: 'Invalid hexadecimal escape sequence',
  [Errors.UnicodeOverflow]: 'Unicode codepoint must not be greater than 0x10FFFF',
  [Errors.InvalidUnicodeEscapeSequence]: 'Illegal Unicode escape sequence',
  [Errors.InvalidImportExportSloppy]: 'The %0 keyword can only be used with the module goal',
  [Errors.IllegalCaracter]: "Illegal character '%0'",
  [Errors.DuplicateBinding]: "Duplicate binding '%0'",
  [Errors.DuplicateIdentifier]: "'%0' has already been declared",
  [Errors.ShadowedCatchClause]: "'%0' shadowed a catch clause binding",
  [Errors.StrictFunctionName]:
    'Function name may not contain any reserved words or be eval or arguments in strict mode',
  [Errors.DeclNoName]: '%0 declaration must have a name in this context',
  [Errors.DisallowedLetInStrict]: 'Identifier "let" disallowed as left-hand side expression in strict mode',
  [Errors.DeclarationMissingInitializer]: 'Missing initializer in %0 declaration',
  [Errors.ForInOfLoopInitializer]: "'for-%0' loop head declarations can not have an initializer",
  [Errors.ForInOfLoopMultiBindings]: 'Invalid left-hand side in for-%0 loop: Must have a single binding',
  [Errors.AwaitInParameter]: 'Await expression not allowed in formal parameter',
  [Errors.YieldInParameter]: 'Yield expression not allowed in formal parameter',
  [Errors.AccessorWrongArgs]: '%0 functions must have exactly %1 argument%2',
  [Errors.BadSetterRestParameter]: 'Setter function argument must not be a rest parameter',
  [Errors.ForOfLet]: "The left-hand side of a for-of loop may not start with 'let'",
  [Errors.NoCatchOrFinally]: 'Missing catch or finally after try',
  [Errors.NewlineAfterThrow]: 'Illegal newline after throw',
  [Errors.StrictWith]: 'Strict mode code may not include a with statement',
  [Errors.OptionalChainingNoNew]: 'Invalid optional chain from new expression',
  [Errors.ImportMetaOutsideModule]: 'Cannot use "import.meta" outside a module',
  [Errors.InvalidCoalescing]:
    'Coalescing and logical operators used together in the same expression must be disambiguated with parentheses'
};

export class ParseError extends SyntaxError {
  public index: number;
  public line: number;
  public column: number;
  public description: string;
  /*eslint-disable*/
  constructor(startindex: number, line: number, column: number, type: Errors, ...params: string[]) {
    const message =
      '[' + line + ':' + column + ']: ' + errorMessages[type].replace(/%(\d+)/g, (_: string, i: number) => params[i]);
    super(`${message}`);
    this.index = startindex;
    this.line = line;
    this.column = column;
    this.description = message;
  }
}

export function report(parser: ParserState, type: Errors, ...params: string[]): never {
  throw new ParseError(parser.index, parser.lineBase, parser.index - parser.offset, type, ...params);
}

export function reportScopeError(scope: any): never {
  throw new ParseError(scope.index, scope.line, scope.column, scope.type, scope.params);
}
