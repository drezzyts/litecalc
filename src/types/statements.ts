import { ExpressionStatement } from "../structs/Statements";
import Token from "../structs/Token";
import { StatementKind } from "./ast";
import { Expression } from "./expressions";

export abstract class Statement {
  declare kind: StatementKind;
}

export interface ProgramProps extends Statement {
  kind: StatementKind.Program,
  statements: ExpressionStatement[]
} 

export interface ExpressionStatementProps extends Statement {
  kind: StatementKind.ExpressionStatement,
  expression: Expression
}