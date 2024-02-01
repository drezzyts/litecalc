import Parser from "../frontend/Parser";
import { BinaryExpression, NumberExpression, ParenthesizedExpression, UnaryExpression } from "../structs/Expressions";
import { Program } from "../structs/Statements";
import { ExpressionKind } from "../types/ast";
import { Expression } from "../types/expressions";

export default class Runtime {
  public parser: Parser;
  public program: Program;

  public constructor(public code: string) {
    this.parser = new Parser(code);
    this.program = this.parser.parse();
  }

  public evaluate() {
    return this.evaluateExpression(this.program.expression);
  }

  private evaluateExpression(evaluate: Expression): number {
    if (this.isExpression<NumberExpression>(evaluate, ExpressionKind.NumberExpression))
      return evaluate.value;

    if (this.isExpression<BinaryExpression>(evaluate, ExpressionKind.BinaryExpression)) {
      const left = this.evaluateExpression(evaluate.left);
      const operator = evaluate.operator;
      const right = this.evaluateExpression(evaluate.right);

      switch (operator.text) {
        case '*':
          return left * right;
        case '/':
          return left / right;
        case '+':
          return left + right;
        case '-':
          return left - right;
        default:
          throw new Error(`runtime (l:${operator.line}, c:${operator.col}): Invalid operator found in binary expression: ${operator.text}`);
      }
    }

    if (this.isExpression<ParenthesizedExpression>(evaluate, ExpressionKind.ParenthesizedExpression))
      return this.evaluateExpression(evaluate.expression);

    if (this.isExpression<UnaryExpression>(evaluate, ExpressionKind.UnaryExpression)) {
      const operator = evaluate.operator.text;
      const operand = this.evaluateExpression(evaluate.operand);

      return operator == '-' ? -operand: operand;
    }

    throw new Error(`runtime (l: -1, c: -1) [fatal-error]: Invalid expression found during evaluation`);
  }

  private isExpression<T extends Expression>(expression: Expression, kind: ExpressionKind): expression is T {
    return expression.kind == kind;
  } 
}