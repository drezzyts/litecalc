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
  CloseParen = 'CloseParen',
  Comma = "Comma"
}

export interface TokenProps {
  kind: TokenKind,
  text: string,
  line: number,
  col: number
}

export enum ExpressionKind {
  Identifier = 'Identifier',
  NumberExpression = 'NumberExpression',
  BinaryExpression = 'BinaryExpression',
  UnaryExpression = 'UnaryExpression',
  ParenthesizedExpression = 'ParenthesizedExpression',
  CallExpression = 'CallExpression',
}

export enum StatementKind {
  Program = 'Program',
}