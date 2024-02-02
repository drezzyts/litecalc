import { TokenKind } from "../types/ast";

export const LEXER_SPEC: Array<[RegExp, TokenKind]> = [
  // Skippable
  [/^\s+/, TokenKind.Skippable],

  // Number
  [/^\d+/, TokenKind.Number],
  
  // Identifier
  [/^\w+/, TokenKind.Identifier],

  // Delimiters
  [/^\(/, TokenKind.OpenParen],
  [/^\)/, TokenKind.CloseParen],
  [/^\,/, TokenKind.Comma],
  
  // Operators
  [/^\+/, TokenKind.Plus],
  [/^\-/, TokenKind.Minus],
  [/^\*/, TokenKind.Star],
  [/^\//, TokenKind.Slash],
];