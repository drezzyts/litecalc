import { ExpressionStatementProps, ProgramProps, Statement } from "../types/statements";
import { Expression } from "../types/expressions";
import { StatementKind } from "../types/ast";
import Token from "./Token";

export class Program implements ProgramProps {
  public kind: StatementKind.Program;

  public constructor(public statements: ExpressionStatement[]) {
    this.kind = StatementKind.Program;
  }
}
export class ExpressionStatement implements ExpressionStatementProps {
  public kind: StatementKind.ExpressionStatement;

  public constructor(public expression: Expression) {
    this.kind = StatementKind.ExpressionStatement;
  }
}