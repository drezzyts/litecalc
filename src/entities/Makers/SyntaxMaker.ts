import { SyntaxKind, SyntaxToken, SyntaxTokenPosition } from "../../types/syntax";

export default class SyntaxMaker {
  public static makeToken(
    kind: SyntaxKind, 
    position: SyntaxTokenPosition, 
    text: string, 
    value: number | null
  ): SyntaxToken {
    return { kind, position, text, value } as SyntaxToken;
  }
}