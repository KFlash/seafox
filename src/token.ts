/**
 * The token types and attributes.
 */
export const enum Token {
  Type = 0xFF,

  /* Precedence for binary operators (always positive) */
  InPrec = 4,
  PrecStart = 8,
  Precedence = 15 << PrecStart, // 8-11

   /* Attribute names */
   Contextual = 1 << 16,
   Keyword = 1 << 17,
   FutureReserved = 1 << 18,
   IsStringOrNumber = 1 << 19,
   IsExpressionStart = 1 << 20,
   IsIdentifier = (1 << 21) | Contextual,
   IsInOrOf = 1 << 22, // 'in' or 'of'
   IsLogical = 1 << 23,
   IsAutoSemicolon = 1 << 24,
   IsPatternStart = 1 << 25, // Start of pattern, '[' or '{'
   IsAssignOp = 1 << 26,
   IsBinaryOp = (1 << 27) | IsExpressionStart,
   IsUpdateOp = (1 << 28) | IsExpressionStart,
   isVarDecl = 1 << 29,
   IsCoalesc = 1 << 30,

  /* Node types */
  EOF = 0 | IsAutoSemicolon, // Pseudo

  /* Constants/Bindings */
  Identifier = 1 | IsExpressionStart | IsIdentifier,
  NumericLiteral = 2 | IsExpressionStart | IsStringOrNumber,
  BigIntLiteral = 3 | IsExpressionStart | IsStringOrNumber,
  StringLiteral = 4 | IsExpressionStart | IsStringOrNumber,
  RegularExpression = 5 | IsExpressionStart,
  FalseKeyword = 6 | Keyword | IsExpressionStart,
  TrueKeyword = 7 | Keyword | IsExpressionStart,
  NullKeyword = 8 | Keyword | IsExpressionStart,

  /* Template nodes */
  TemplateCont = 9 | IsExpressionStart,
  TemplateTail = 10 | IsExpressionStart,

  /* Punctuators */
  Arrow = 11, // =>
  LeftParen = 12 | IsExpressionStart, // (
  LeftBrace = 13 | IsExpressionStart | IsPatternStart, // {
  Period = 14, // .
  Ellipsis = 15, // ...
  RightBrace = 16 | IsAutoSemicolon, // }
  RightParen = 17, // )
  Semicolon = 18 | IsAutoSemicolon, // ;
  Comma = 19, // ,
  LeftBracket = 20 | IsExpressionStart | IsPatternStart, // [
  RightBracket = 21, // ]
  Colon = 22, // :
  QuestionMark = 23, // ?
  Coalesce = 24 | IsBinaryOp | IsCoalesc | (1 << PrecStart) | (1 << (PrecStart + InPrec)), // ??
  QuestionMarkPeriod = 25, // ?.
  SingleQuote = 26, // '
  DoubleQuote = 27, // "
  JSXClose = 28, // </
  JSXAutoClose = 29, // />

  /* Update operators */
  Increment = 30 | IsUpdateOp, // ++
  Decrement = 31 | IsUpdateOp, // --

  /* Assign operators */
  Assign = 32 | IsAssignOp, // =
  ShiftLeftAssign = 33 | IsAssignOp, // <<=
  ShiftRightAssign = 34 | IsAssignOp, // >>=
  LogicalShiftRightAssign = 35 | IsAssignOp, // >>>=
  ExponentiateAssign = 36 | IsAssignOp, // **=
  AddAssign = 37 | IsAssignOp, // +=
  SubtractAssign = 38 | IsAssignOp, // -=
  MultiplyAssign = 39 | IsAssignOp, // *=
  DivideAssign = 40 | IsAssignOp | IsExpressionStart, // /=
  ModuloAssign = 41 | IsAssignOp, // %=
  BitwiseXorAssign = 42 | IsAssignOp, // ^=
  BitwiseOrAssign = 43 | IsAssignOp, // |=
  BitwiseAndAssign = 44 | IsAssignOp, // &=

  /* Unary/binary operators */
  TypeofKeyword      = 45 | Keyword | IsExpressionStart,
  DeleteKeyword      = 46 | Keyword | IsExpressionStart,
  VoidKeyword        = 47 | Keyword | IsExpressionStart,
  Negate             = 48 | IsExpressionStart, // !
  Complement         = 49 | IsExpressionStart, // ~
  Add                = 50 | IsBinaryOp | (10 << PrecStart) | (10 << (PrecStart + InPrec)), // +
  Subtract           = 51 | IsBinaryOp | (10 << PrecStart) | (10 << (PrecStart + InPrec)), // -
  InKeyword          = 52 | IsBinaryOp | (8 << (PrecStart + InPrec)) | Keyword | IsInOrOf,
  InstanceofKeyword  = 53 | IsBinaryOp | (8 << PrecStart) | (8 << (PrecStart + InPrec)) | Keyword,
  Multiply           = 54 | IsBinaryOp | (11 << PrecStart) | (11 << (PrecStart + InPrec)), // *
  Modulo             = 55 | IsBinaryOp | (11 << PrecStart) | (11 << (PrecStart + InPrec)), // %
  Divide             = 56 | IsBinaryOp | (11 << PrecStart) | (11 << (PrecStart + InPrec)) | IsExpressionStart, // /
  Exponentiate       = 57 | IsBinaryOp | (12 << PrecStart) | (12 << (PrecStart + InPrec)), // **
  LogicalAnd         = 58 | IsBinaryOp | (3 << PrecStart) | (3 << (PrecStart + InPrec)) | IsLogical, // &&
  LogicalOr          = 59 | IsBinaryOp | (2 << PrecStart) | (2 << (PrecStart + InPrec)) | IsLogical, // ||
  StrictEqual        = 60 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // ===
  StrictNotEqual     = 61 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // !==
  LooseEqual         = 62 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // ==
  LooseNotEqual      = 63 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // !=
  LessThanOrEqual    = 64 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // <=
  GreaterThanOrEqual = 65 | IsBinaryOp | (7 << PrecStart) | (7 << (PrecStart + InPrec)), // >=
  LessThan           = 66 | IsBinaryOp | (8 << PrecStart) | (8 << (PrecStart + InPrec)) | IsExpressionStart, // <
  GreaterThan        = 67 | IsBinaryOp | (8 << PrecStart) | (8 << (PrecStart + InPrec)), // >
  ShiftLeft          = 68 | IsBinaryOp | (9 << PrecStart) | (9 << (PrecStart + InPrec)), // <<
  ShiftRight         = 69 | IsBinaryOp | (9 << PrecStart) | (9 << (PrecStart + InPrec)), // >>
  LogicalShiftRight  = 70 | IsBinaryOp | (9 << PrecStart) | (9 << (PrecStart + InPrec)), // >>>
  BitwiseAnd         = 71 | IsBinaryOp | (6 << PrecStart) | (6 << (PrecStart + InPrec)), // &
  BitwiseOr          = 72 | IsBinaryOp | (4 << PrecStart) | (4 << (PrecStart + InPrec)), // |
  BitwiseXor         = 73 | IsBinaryOp | (5 << PrecStart) | (5 << (PrecStart + InPrec)), // ^

  /* Variable declaration kinds */
  VarKeyword = 74 | IsExpressionStart | Keyword | isVarDecl,
  LetKeyword = 75 | IsExpressionStart | FutureReserved | isVarDecl,
  ConstKeyword = 76 | IsExpressionStart | Keyword | isVarDecl,

  /* Other Keyword words */
  BreakKeyword = 77 | Keyword,
  CaseKeyword = 78 | Keyword,
  CatchKeyword = 79 | Keyword,
  ClassKeyword = 80 | Keyword | IsExpressionStart,
  ContinueKeyword = 81 | Keyword,
  DebuggerKeyword = 82 | Keyword,
  DefaultKeyword = 83 | Keyword,
  DoKeyword = 84 | Keyword,
  ElseKeyword = 85 | Keyword,
  ExportKeyword = 86 | Keyword,
  ExtendsKeyword = 87 | Keyword,
  FinallyKeyword = 88 | Keyword,
  ForKeyword = 89 | Keyword,
  FunctionKeyword = 90 | Keyword | IsExpressionStart,
  IfKeyword = 91 | Keyword,
  ImportKeyword = 92 | Keyword | IsExpressionStart,
  NewKeyword = 93 | Keyword | IsExpressionStart,
  ReturnKeyword = 94 | Keyword,
  SuperKeyword = 95 | Keyword | IsExpressionStart,
  SwitchKeyword = 96 | Keyword | IsExpressionStart,
  ThisKeyword = 97 | Keyword | IsExpressionStart,
  ThrowKeyword = 98 | Keyword | IsExpressionStart,
  TryKeyword = 99 | Keyword,
  WhileKeyword = 100 | Keyword,
  WithKeyword = 101 | Keyword,

  /* Strict mode Keyword words */
  ImplementsKeyword = 102 | FutureReserved,
  InterfaceKeyword = 103 | FutureReserved,
  PackageKeyword = 104 | FutureReserved,
  PrivateKeyword = 105 | FutureReserved,
  ProtectedKeyword = 106 | FutureReserved,
  PublicKeyword = 107 | FutureReserved,
  StaticKeyword = 108 | FutureReserved,
  YieldKeyword = 109 | FutureReserved | IsExpressionStart | IsIdentifier,

  /* Contextual keywords */
  AsKeyword = 110 | Contextual,
  AsyncKeyword = 111 | Contextual | IsIdentifier,
  AwaitKeyword = 112 | Contextual | IsExpressionStart | IsIdentifier,
  ConstructorKeyword = 113 | Contextual,
  GetKeyword = 114 | Contextual,
  SetKeyword = 115 | Contextual,
  FromKeyword = 116 | Contextual,
  OfKeyword = 117 | Contextual | IsInOrOf,
  EnumKeyword = 118,

  /* Escapes */
  EscapedIdentifier = 119 | IsIdentifier,
  EscapedFutureReserved = 120 | IsIdentifier,

  /* Others */

  Error = 121,
  CarriageReturn = 122,
  WhiteSpace = 123,
  LineFeed = 124,
  LeadingZero = 125,
  Backslash = 126,
  Comment = 127,
  BinaryDigits = 128,
  HexDigits = 129,
  OctalDigits = 130,
  Underscore = 131,
  IdentifierOrKeyword = 132
}

export const KeywordDescTable = [
  'end of source',

  /* Constants/Bindings */
  'identifier',
  'number',
  'number',
  'string',
  'regular expression',
  'false',
  'true',
  'null',

  /* Template nodes */
  'template continuation',
  'template end',

  /* Punctuators */
  '=>',
  '(',
  '{',
  '.',
  '...',
  '}',
  ')',
  ';',
  ',',
  '[',
  ']',
  ':',
  '?',
  '??',
  '?.',
  '\'',
  '"',
  '</',
  '/>',

  /* Update operators */
  '++',
  '--',

  /* Assign operators */
  '=',
  '<<=',
  '>>=',
  '>>>=',
  '**=',
  '+=',
  '-=',
  '*=',
  '/=',
  '%=',
  '^=',
  '|=',
  '&=',

  /* Unary/binary operators */
  'typeof',
  'delete',
  'void',
  '!',
  '~',
  '+',
  '-',
  'in',
  'instanceof',
  '*',
  '%',
  '/',
  '**',
  '&&',
  '||',
  '===',
  '!==',
  '==',
  '!=',
  '<=',
  '>=',
  '<',
  '>',
  '<<',
  '>>',
  '>>>',
  '&',
  '|',
  '^',

  /* Variable declaration kinds */
  'var',
  'let',
  'const',

  /* Other Keyword words */
  'break',
  'case',
  'catch',
  'class',
  'continue',
  'debugger',
  'default',
  'do',
  'else',
  'export',
  'extends',
  'finally',
  'for',
  'function',
  'if',
  'import',
  'new',
  'return',
  'super',
  'switch',
  'this',
  'throw',
  'try',
  'while',
  'with',

  /* Strict mode Keyword words */
  'implements',
  'interface',
  'package',
  'private',
  'protected',
  'public',
  'static',
  'yield',

  /* Contextual keywords */
  'as',
  'async',
  'await',
  'constructor',
  'get',
  'set',
  'from',
  'of',
  'enum',

  /* Escapes */

  'identifier',
  'identifier',

  /* Others */

  'whitespace',
  'whitespace',
  'whitespace',
  'number',
  '/',
  'comment'
];

// Normal object is much faster than Object.create(null), even with typeof check to avoid Object.prototype interference
export const descKeywordTable: { [key: string]: Token } = Object.create(null, {
  this: { value: Token.ThisKeyword },
  function: { value: Token.FunctionKeyword },
  if: { value: Token.IfKeyword },
  return: { value: Token.ReturnKeyword },
  var: { value: Token.VarKeyword },
  else: { value: Token.ElseKeyword },
  for: { value: Token.ForKeyword },
  new: { value: Token.NewKeyword },
  in: { value: Token.InKeyword },
  typeof: { value: Token.TypeofKeyword },
  while: { value: Token.WhileKeyword },
  case: { value: Token.CaseKeyword },
  break: { value: Token.BreakKeyword },
  try: { value: Token.TryKeyword },
  catch: { value: Token.CatchKeyword },
  delete: { value: Token.DeleteKeyword },
  throw: { value: Token.ThrowKeyword },
  switch: { value: Token.SwitchKeyword },
  continue: { value: Token.ContinueKeyword },
  default: { value: Token.DefaultKeyword },
  instanceof: { value: Token.InstanceofKeyword },
  do: { value: Token.DoKeyword },
  void: { value: Token.VoidKeyword },
  finally: { value: Token.FinallyKeyword },
  async: { value: Token.AsyncKeyword },
  await: { value: Token.AwaitKeyword },
  class: { value: Token.ClassKeyword },
  const: { value: Token.ConstKeyword },
  constructor: { value: Token.ConstructorKeyword },
  debugger: { value: Token.DebuggerKeyword },
  export: { value: Token.ExportKeyword },
  extends: { value: Token.ExtendsKeyword },
  false: { value: Token.FalseKeyword },
  from: { value: Token.FromKeyword },
  get: { value: Token.GetKeyword },
  implements: { value: Token.ImplementsKeyword },
  import: { value: Token.ImportKeyword },
  interface: { value: Token.InterfaceKeyword },
  let: { value: Token.LetKeyword },
  null: { value: Token.NullKeyword },
  of: { value: Token.OfKeyword },
  package: { value: Token.PackageKeyword },
  private: { value: Token.PrivateKeyword },
  protected: { value: Token.ProtectedKeyword },
  public: { value: Token.PublicKeyword },
  set: { value: Token.SetKeyword },
  static: { value: Token.StaticKeyword },
  super: { value: Token.SuperKeyword },
  true: { value: Token.TrueKeyword },
  with: { value: Token.WithKeyword },
  yield: { value: Token.YieldKeyword },
  as: { value: Token.AsKeyword }
});
