export enum SyntaxKind {
  // Tokens
  EOF,
  BadToken,
  NumberToken,
  CaretToken,
  StarToken,
  SlashToken,
  PlusToken,
  MinusToken,
  OpenParenthesisToken,
  CloseParenthesisToken,

  // Expressions
  BinaryExpression,
  UnaryExpression,
  ParenthesizedExpression,
  NumberExpression,
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

export interface NumberSyntaxExpression extends SyntaxExpression {
  kind: SyntaxKind.NumberExpression,
  token: SyntaxToken,
  value: number
}


export interface BinarySyntaxExpression extends SyntaxExpression {
  kind: SyntaxKind.BinaryExpression;
  left: SyntaxExpression;
  operator: SyntaxToken;
  right: SyntaxExpression;
}

export interface UnarySyntaxExpression extends SyntaxExpression {
  kind: SyntaxKind.UnaryExpression;
  operator: SyntaxToken;
  operand: SyntaxExpression;
}

export interface ParenthesizedSyntaxExpression extends SyntaxExpression {
  kind: SyntaxKind.ParenthesizedExpression;
  left: SyntaxToken;
  expression: SyntaxExpression;
  right: SyntaxToken;
}

export type SyntaxExpressionType = BinarySyntaxExpression |
  UnarySyntaxExpression | 
  ParenthesizedSyntaxExpression |
  NumberSyntaxExpression;