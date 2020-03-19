export const enum Token {

  /* Performing a bitwise and (&) with this value (255) will return only the
   * token bit, which corresponds to the index of the token's value in the
   * KeywordDescTable array */

   Kind  = 0b00000000000000000000000011111111,

   /* Attribute names */
   Contextual             = 0b00000000000000010000000000000000,
   Keyword                = 0b00000000000000100000000000000000,
   FutureReserved         = 0b00000000000001000000000000000000,
   IsStringOrNumber       = 0b00000000000010000000000000000000,
   IsExpressionStart      = 0b00000000000100000000000000000000,
   IsIdentifier           = 0b00000000001000010000000000000000,
   IsInOrOf               = 0b00000000010000000000000000000000,
   IsLogical              = 0b00000000100000000000000000000000,
   IsAutoSemicolon        = 0b00000001000000000000000000000000,
   IsPatternStart         = 0b00000010000000000000000000000000,
   IsAssignOp             = 0b00000100000000000000000000000000,
   IsBinaryOp             = 0b00001000000100000000000000000000,
   EscapedKeyword         = 0b00010000000000000000000000000000,
   IsEvalOrArguments      = 0b00100000000100000000000000000000,
   Coalescing             = 0b01000000000000000000000000000000,

  /* Node types */
  EOF                = 0b00000001000000000000000000000000,

  /* Constants/Bindings */
  Identifier        = 0b00000000001100010000000000000001,
  NumericLiteral    = 0b00000000000110000000000000000010,
  BigIntLiteral     = 0b00000000000100000000000000000011,
  StringLiteral     = 0b00000000000110000000000000000100,
  RegularExpression = 0b00000000000100000000000000000101,
  FalseKeyword      = 0b00000000000100100000000000000110,
  TrueKeyword       = 0b00000000000100100000000000000111,
  NullKeyword       = 0b00000000000100100000000000001000,

  /* Template nodes */
  TemplateCont      = 0b00000000000100000000000000001001,
  TemplateTail      = 0b00000000000100000000000000001010,

  /* Punctuators */
  Arrow              = 0b00000000000000000000000000001011, // =>
  LeftParen          = 0b00000000000100000000000000001100, // (
  LeftBrace          = 0b00000010000100000000000000001101, // {
  Period             = 0b00000000000000000000000000001110, // .
  Ellipsis           = 0b00000000000000000000000000001111, // ...
  RightBrace         = 0b00000001000000000000000000010000, // }
  RightParen         = 0b00000000000000000000000000010001, // )
  Semicolon          = 0b00000001000000000000000000010010, // ;
  Comma              = 0b00000000000000000000000000010011, // ,
  LeftBracket        = 0b00000010000100000000000000010100, // [
  RightBracket       = 0b00000000000000000000000000010101, // ]
  Colon              = 0b00000000000000000000000000010110, // :
  QuestionMark       = 0b00000000000000000000000000010111, // ?
  Coalesce           = 0b01001000000100000001000100011000, // ??
  QuestionMarkPeriod = 0b00000000000000000000000000011001, // ?.
  SingleQuote        = 0b00000000000000000000000000011010, // '
  DoubleQuote        = 0b00000000000000000000000000011011, // "
  JSXClose           = 0b00000000000000000000000000011100, // </
  JSXAutoClose       = 0b00000000000000000000000000011101, // />

  /* Update operators */
  Increment          = 0b00000000000100000000000000011110, // ++
  Decrement          = 0b00000000000100000000000000011111, // --

  /* Assign operators */
  Assign                  = 0b00000100000000000000000000100000, // =
  ShiftLeftAssign         = 0b00000100000000000000000000100001, // <<=
  ShiftRightAssign        = 0b00000100000000000000000000100010, // >>=
  LogicalShiftRightAssign = 0b00000100000000000000000000100011, // >>>=
  ExponentiateAssign      = 0b00000100000000000000000000100100, // **=
  AddAssign               = 0b00000100000000000000000000100101, // +=
  SubtractAssign          = 0b00000100000000000000000000100110, // -=
  MultiplyAssign          = 0b00000100000000000000000000100111, // *=
  DivideAssign            = 0b00000100000100000000000000101000, // /=
  ModuloAssign            = 0b00000100000000000000000000101001, // %=
  BitwiseXorAssign        = 0b00000100000000000000000000101010, // ^=
  BitwiseOrAssign         = 0b00000100000000000000000000101011, // |=
  BitwiseAndAssign        = 0b00000100000000000000000000101100, // &=
  LogicalOrAssign         = 0b00000100000000000000000010001000, // ||=
  LogicalAndAssign        = 0b00000100000000000000000010001001, // &&=
  CoalesceAssign          = 0b00000100000000000000000010001010, // ??=


  /* Unary/binary operators */
  TypeofKeyword      = 0b00000000000100100000000000101101,
  DeleteKeyword      = 0b00000000000100100000000000101110,
  VoidKeyword        = 0b00000000000100100000000000101111,
  Negate             = 0b00000000000100000000000000110000, // !
  Complement         = 0b00000000000100000000000000110001, // ~
  Add                = 0b00001000000100001010101000110010, // +
  Subtract           = 0b00001000000100001010101000110011, // -
  InKeyword          = 0b00001000010100101000000000110100,
  InstanceofKeyword  = 0b00001000000100101000100000110101,
  Multiply           = 0b00001000000100001011101100110110, // *
  Modulo             = 0b00001000000100001011101100110111, // %
  Divide             = 0b00001000000100001011101100111000, // /
  Exponentiate       = 0b00001000000100001100110000111001, // **
  LogicalAnd         = 0b00001000100100000011001100111010, // &&
  LogicalOr          = 0b00001000100100000010001000111011, // ||
  StrictEqual        = 0b00001000000100000111011100111100, // ===
  StrictNotEqual     = 0b00001000000100000111011100111101, // !==
  LooseEqual         = 0b00001000000100000111011100111110, // ==
  LooseNotEqual      = 0b00001000000100000111011100111111, // !=
  LessThanOrEqual    = 0b00001000000100000111011101000000, // <=
  GreaterThanOrEqual = 0b00001000000100000111011101000001, // >=
  LessThan           = 0b00001000000100001000100001000010, // <
  GreaterThan        = 0b00001000000100001000100001000011, // >
  ShiftLeft          = 0b00001000000100001001100101000100, // <<
  ShiftRight         = 0b00001000000100001001100101000101, // >>
  LogicalShiftRight  = 0b00001000000100001001100101000110, // >>>
  BitwiseAnd         = 0b00001000000100000110011001000111, // &
  BitwiseOr          = 0b00001000000100000100010001001000, // |
  BitwiseXor         = 0b00001000000100000101010101001001, // ^

  /* Variable declaration kinds */
  VarKeyword    = 0b00000000000100100000000001001010,
  LetKeyword    = 0b00000000001101010000000001001011,
  ConstKeyword  = 0b00000000000100100000000001001100,

  /* Other Keyword words */
  BreakKeyword    = 0b00000000000000100000000001001101,
  CaseKeyword     = 0b00000000000000100000000001001110,
  CatchKeyword    = 0b00000000000000100000000001001111,
  ClassKeyword    = 0b00000000000100100000000001010000,
  ContinueKeyword = 0b00000000000000100000000001010001,
  DebuggerKeyword = 0b00000000000000100000000001010010,
  DefaultKeyword  = 0b00000000000000100000000001010011,
  DoKeyword       = 0b00000000000000100000000001010100,
  ElseKeyword     = 0b00000000000000100000000001010101,
  ExportKeyword   = 0b00000000000000100000000001010110,
  ExtendsKeyword  = 0b00000000000000100000000001010111,
  FinallyKeyword  = 0b00000000000000100000000001011000,
  ForKeyword      = 0b00000000000000100000000001011001,
  FunctionKeyword = 0b00000000000100100000000001011010,
  IfKeyword       = 0b00000000000000100000000001011011,
  ImportKeyword   = 0b00000000000100100000000001011100,
  NewKeyword      = 0b00000000000100100000000001011101,
  ReturnKeyword   = 0b00000000000000100000000001011110,
  SuperKeyword    = 0b00000000000100100000000001011111,
  SwitchKeyword   = 0b00000000000100100000000001100000,
  ThisKeyword     = 0b00000000000100100000000001100001,
  ThrowKeyword    = 0b00000000000100100000000001100010,
  TryKeyword      = 0b00000000000000100000000001100011,
  WhileKeyword    = 0b00000000000000100000000001100100,
  WithKeyword     = 0b00000000000000100000000001100101,

  /* Strict mode Keyword words */
  ImplementsKeyword = 0b00000000000001000000000001100110,
  InterfaceKeyword  = 0b00000000000001000000000001100111,
  PackageKeyword    = 0b00000000000001000000000001101000,
  PrivateKeyword    = 0b00000000000001000000000001101001,
  ProtectedKeyword  = 0b00000000000001000000000001101010,
  PublicKeyword     = 0b00000000000001000000000001101011,
  StaticKeyword     = 0b00000000000001000000000001101100,
  YieldKeyword      = 0b00000000001101010000000001101101,

  /* Contextual keywords */
  AsKeyword           = 0b00000000000000010000000001101110,
  AsyncKeyword        = 0b00000000001000010000000001101111,
  AwaitKeyword        = 0b00000000001100010000000001110000,
  ConstructorKeyword  = 0b00000000000000010000000001110001,
  GetKeyword          = 0b00000000000000010000000001110010,
  SetKeyword          = 0b00000000000000010000000001110011,
  FromKeyword         = 0b00000000000000010000000001110100,
  OfKeyword           = 0b00000000010000010000000001110101,
  EnumKeyword         = 0b00000000000000100000000001110110,

  /* Escapes */
  FutureStrictReserved  = 0b00000000000000000000000001110111,
  EscapedIdentifier  = 0b00000000000000000000000001111000,

  /* Others */

  Error               = 0b00000000000000000000000001111001,
  CarriageReturn      = 0b00000000000000000000000001111010,
  WhiteSpace          = 0b00000000000000000000000001111011,
  LineFeed            = 0b00000000000000000000000001111100,
  LeadingZero         = 0b00000000000000000000000001111101,
  Backslash           = 0b00000000000000000000000001111110,
  Comment             = 0b00000000000000000000000001111111,
  BinaryDigits        = 0b00000000000000000000000010000000,
  HexDigits           = 0b00000000000000000000000010000001,
  OctalDigits         = 0b00000000000000000000000010000010,
  Underscore          = 0b00000000000000000000000010000011,
  IdentifierOrKeyword = 0b00000000000000000000000010000100,
  Eval                = 0b00100000001100010000000010000101,
  Arguments           = 0b00100000001100010000000010000110,
  Target              = 0b00000000001000010000000010001100,
 }

 /**
  * Array for mapping tokens to token values. The indices of the values
  * correspond to the token bits 0-124.
  * For this to work properly, the values in the array must be kept in
  * the same order as the token bits.
  * Usage: KeywordDescTable[token & Token.Kind]
  */
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
  'comment',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '||=',
  '&&=',
  '??=',

 ];

 export const descKeywordTable: { [key: string]: Token } = Object.create(null, {
  this: { value: Token.ThisKeyword },
  function: { value: Token.FunctionKeyword },
  if: { value: Token.IfKeyword },
  return: { value: Token.ReturnKeyword },
  var: { value: Token.VarKeyword },
  eval: { value: Token.Eval },
  arguments: { value: Token.Arguments },
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
  enum: { value: Token.EnumKeyword },
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
  as: { value: Token.AsKeyword },
  target: { value: Token.Target },
 });
