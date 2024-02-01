export enum TokenKind {
  Number = 'Number',

  Minus = 'Minus',
  Plus = 'Plus',
  Star = 'Star',
  Slash = 'Slash',

  Identifier = 'Identifier',
  Skippable = 'Skippable',
  Eof = 'Eof',

  OpenParen = 'OpenParen',
  CloseParen = 'CloseParen'
}

export interface TokenProps {
  kind: TokenKind,
  text: string,
  line: number,
  col: number
}

export enum ExpressionKind {
  NumberExpression = 'NumberExpression',
  BinaryExpression = 'BinaryExpression',
  UnaryExpression = 'UnaryExpression',
  ParenthesizedExpression = 'ParenthesizedExpression'
}

export enum StatementKind {
  Program = 'Program',
}