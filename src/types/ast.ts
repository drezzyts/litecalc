export enum TokenKind {
  Number = 'Number',
  
  Minus = 'Minus',
  Plus = 'Plus',
  Star = 'Star',
  Slash = 'Slash',
  
  Identifier = 'Identifier',
  Skippable = 'Skippable',
  Eof = 'Eof'
}

export interface TokenProps {
  kind: TokenKind,
  text: string,
  line: number,
  col: number
}