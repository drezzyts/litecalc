import Parser from "../frontend/Parser";
import Enviroment from "../structs/Enviroment";
import { BinaryExpression, CallExpression, Identifier, NumberExpression, ParenthesizedExpression, UnaryExpression } from "../structs/Expressions";
import { Program } from "../structs/Statements";
import { ExpressionKind } from "../types/ast";
import { Expression } from "../types/expressions";

export default class Runtime {
  public parser: Parser;
  public program: Program;
  public env: Enviroment;

  public constructor(public code: string) {
    this.env = new Enviroment();
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

    if (this.isExpression<Identifier>(evaluate, ExpressionKind.Identifier)) {
      const value = this.env.getConstant(evaluate.name);
      if(!value) throw new Error(`runtime (l: ${evaluate.token.line}, c: ${evaluate.token.col}): Not defined constant found during evaluation: ${evaluate.name}`);

      return value;
    }

    if (this.isExpression<CallExpression>(evaluate, ExpressionKind.CallExpression)) {
      const values: number[] = [];
      
      evaluate.args.forEach(argument => {
        const value = this.evaluateExpression(argument as Identifier);
        values.push(value);
      });

      const exec = this.env.getFunction(evaluate.callee.text);
      if(!exec) throw new Error(`runtime (l: ${evaluate.callee.line}, c: ${evaluate.callee.col}): Not defined function found during evaluation: ${evaluate.callee.text}`);

      return exec(...values);
    }

    throw new Error(`runtime (l: -1, c: -1) [fatal-error]: Invalid expression found during evaluation: ${evaluate.kind}`);
  }

  private isExpression<T extends Expression>(expression: Expression, kind: ExpressionKind): expression is T {
    return expression.kind == kind;
  } 
}