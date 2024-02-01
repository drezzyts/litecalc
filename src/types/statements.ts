import { StatementKind } from "./ast";
import { Expression } from "./expressions";

export abstract class Statement {
  declare kind: StatementKind;
}

export interface ProgramProps extends Statement {
  kind: StatementKind.Program,
  expression: Expression
} 