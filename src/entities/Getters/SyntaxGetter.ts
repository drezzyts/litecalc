import { SyntaxKind } from "../../types/syntax";

export default class SyntaxGetter {
  public static getUnaryOperatorPriority(kind: SyntaxKind): number {
    switch (kind) {
    case SyntaxKind.PlusToken:
    case SyntaxKind.MinusToken:
      return 4;
    default:
        return 0;
    }
  }

  public static getBinaryOperatorPriority(kind: SyntaxKind): number {
      switch (kind) {
      case SyntaxKind.CaretToken:
          return 3;
      case SyntaxKind.StarToken:
      case SyntaxKind.SlashToken:
          return 2;
      case SyntaxKind.PlusToken:
      case SyntaxKind.MinusToken:
          return 1;
      default:
          return 0;
      }
  }
  public static getKindByText(text: string) {
    switch(text) {
      case '^':
        return SyntaxKind.CaretToken;
      case '+':
        return SyntaxKind.PlusToken;
      case '-':
        return SyntaxKind.MinusToken;
      case '*':
        return SyntaxKind.StarToken;
      case '/':
        return SyntaxKind.SlashToken;
      case '\0':
        return SyntaxKind.EOF;
      case '(':
        return SyntaxKind.OpenParenthesisToken;
      case ')':
        return SyntaxKind.CloseParenthesisToken;
      default:
        return SyntaxKind.BadToken;
    }
  } 
}