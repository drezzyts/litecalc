export enum SyntaxKind {
  // Tokens
  EOF,
  BadToken,
  NumberToken,
  PlusToken,
  MinusToken,
  SlashToken,
  StarToken,

  // Expressions
  BinaryExpression,
  UnaryExpression,
  ParenthesizedExpression
}

export interface SyntaxToken {
  kind: SyntaxKind,
  position: SyntaxTokenPosition,
  text: string,
  value: number | null
}

export type SyntaxTokenPosition = [number, number];

export interface SyntaxExpression {
  kind: SyntaxKind
}