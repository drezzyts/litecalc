import { SyntaxKind } from "../../types/syntax";

export default class SyntaxGetter {
  public static getKindByText(text: string) {
    switch(text) {
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
      default:
        return SyntaxKind.BadToken;
    }
  } 
}