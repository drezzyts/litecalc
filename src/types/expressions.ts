import { Identifier } from "../structs/Expressions";
import Token from "../structs/Token";
import { ExpressionKind } from "./ast";

export abstract class Expression {
  declare kind: ExpressionKind;
}

export interface NumberExpressionProps extends Expression {
  kind: ExpressionKind.NumberExpression,
  token: Token,
  value: number
}

export interface BinaryExpressionProps extends Expression {
  kind: ExpressionKind.BinaryExpression,
  left: Expression,
  operator: Token,
  right: Expression
}

export interface UnaryExpressionProps extends Expression {
  kind: ExpressionKind.UnaryExpression,
  operator: Token,
  operand: Expression
}

export interface ParenthesizedExpressionProps extends Expression {
  kind: ExpressionKind.ParenthesizedExpression,
  parens: [open: Token, close: Token],
  expression: Expression
}

export interface IdentifierProps extends Expression {
  kind: ExpressionKind.Identifier,
  token: Token,
  name: string
}

export interface CallExpressionProps extends Expression {
  kind: ExpressionKind.CallExpression,
  callee: Token,
  parens: [open: Token, close: Token],
  args: Expression[],
  instruction: boolean
} 