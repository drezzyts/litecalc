import { TokenKind, TokenProps } from "../types/ast";

export default class Token implements TokenProps {

  public constructor(public kind: TokenKind, public text: string,
     public line: number, public col: number) {}

  public static eof(line?: number, col?: number) {
    line ??= -1;
    col ??= -1;

    return new Token(TokenKind.Eof, 'EndOfFile', line, col);
  };
}