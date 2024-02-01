import { TokenKind, TokenProps } from "../types/ast";

export default class Token implements TokenProps {

  public constructor(public kind: TokenKind, public text: string,
     public line: number, public col: number) {}

  public static eof(line: number = -1, col: number = -1) {
    return new Token(TokenKind.Eof, 'EndOfFile', line, col);
  };

  public static getBinaryOperatorPriority(operator: TokenKind) {
    switch (operator) {
      case TokenKind.Star:
      case TokenKind.Slash:
        return 2;
      
      case TokenKind.Plus:
      case TokenKind.Minus:
        return 1;

      default:
        return 0;
    }
  }

  public static getUnaryOperandPriority(operand: TokenKind) {
    switch (operand) {
      case TokenKind.Plus:
      case TokenKind.Minus:
        return 3;
      
      default:
        return 0;
    }
  }
}