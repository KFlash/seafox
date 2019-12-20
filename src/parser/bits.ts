/**
 * The core context, passed around everywhere as a simple immutable bit set.
 */
export const enum Context {
  Empty                   = 0,
  OptionsNext             = 1 << 0,
  OptionsLoc              = 1 << 1,
  OptionsJSX              = 1 << 2,
  OptionsRaw              = 1 << 3,
  OptionsDisableWebCompat = 1 << 4,
  OptionsDirectives       = 1 << 5,
  OptionsGlobalReturn     = 1 << 6,
  Strict                  = 1 << 10,
  Module                  = 1 << 11, // Current code should be parsed as a module body
  DisallowIn              = 1 << 13,
  TaggedTemplate          = 1 << 16,
  InIteration             = 1 << 17,
  SuperProperty           = 1 << 18,
  SuperCall               = 1 << 19,
  InYieldContext          = 1 << 21,
  InAwaitContext          = 1 << 22,
  InArgumentList          = 1 << 23,
  InConstructor           = 1 << 24,
  InMethod                = 1 << 25,
  AllowNewTarget          = 1 << 26,
  InSwitch                = 1 << 27,
  InGlobal                = 1 << 28
}
/**
 * The mutable parser flags, in case any flags need passed by reference.
 */
export const enum Flags {
  Empty               = 0,
  HasConstructor      = 1 << 0,
  Destructible        = 1 << 1,
  AssignableDestruct  = 1 << 2,
  NotDestructible     = 1 << 3,
  MustDestruct        = 1 << 4,
  Destructuring = Destructible | AssignableDestruct | NotDestructible | MustDestruct
}

export const enum Origin {
  None            = 0,
  Statement       = 1 << 0,
  BlockStatement  = 1 << 1,
  TopLevel        = 1 << 2,
  Declaration     = 1 << 3,
  Arrow           = 1 << 4,
  ForStatement    = 1 << 5,
  Export          = 1 << 6
}

export const enum PropertyKind {
  None          = 0,
  Method        = 1 << 0,
  Computed      = 1 << 1,
  Shorthand     = 1 << 2,
  Generator     = 1 << 3,
  Async         = 1 << 4,
  Static        = 1 << 5,
  Constructor   = 1 << 6,
  Getter        = 1 << 7,
  Setter        = 1 << 8,
  GetSet        = Getter | Setter
}

export const enum FunctionFlag {
  None              = 0,
  IsDeclaration     = 1 << 0,
  AllowGenerator    = 1 << 1,
  IsAsync           = 1 << 2,
  RequireIdentifier = 1 << 3,
  Declaration       = IsDeclaration | AllowGenerator | RequireIdentifier
}

/**
 * Masks to track the binding kind
 */
export const enum BindingKind {
  None                      = 0,
  ArgumentList              = 1 << 0,
  Variable                  = 1 << 1,
  FunctionLexical           = 1 << 2,
  Empty                     = 1 << 3,
  Let                       = 1 << 4,
  Const                     = 1 << 5,
  Class                     = 1 << 6,
  FunctionStatement         = 1 << 7,
  CatchPattern              = 1 << 8,
  CatchIdentifier           = 1 << 9,
  Pattern                   = 1 << 10,
  CatchIdentifierOrPattern  = CatchIdentifier | CatchPattern,
  LexicalOrFunction         = Variable | FunctionLexical,
  LexicalBinding            = Let | Const | FunctionLexical | FunctionStatement | Class
}
