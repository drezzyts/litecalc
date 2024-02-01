import { ProgramProps } from "../types/statements";
import { Expression } from "../types/expressions";
import { StatementKind } from "../types/ast";

export class Program implements ProgramProps {
  public kind: StatementKind.Program;

  public constructor(public expression: Expression) {
    this.kind = StatementKind.Program;
  }
}