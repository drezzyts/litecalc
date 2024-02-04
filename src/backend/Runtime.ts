import Parser from "../frontend/Parser";
import Enviroment from "../structs/Enviroment";
import { BinaryExpression, CallExpression, Identifier, NumberExpression, ParenthesizedExpression, UnaryExpression } from "../structs/Expressions";
import { ExpressionStatement, Program } from "../structs/Statements";
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
    const evaled = this.program.statements
      .map(statement => this.evaluateExpression(statement.expression));
    
      return evaled.reduce((acc, curr) => acc + curr, 0);
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
          throw new Error(`runtime (l:${operator.line}, c:${operator.col}): Invalid operator founded in binary expression: ${operator.text}`);
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
      if(!value) throw new Error(`runtime (l: ${evaluate.token.line}, c: ${evaluate.token.col}): Invalid constant founded during evaluation: ${evaluate.name}`);

      return value;
    }

    if (this.isExpression<CallExpression>(evaluate, ExpressionKind.CallExpression)) {
      if (evaluate.instruction) {
        const values: (string | number)[] = [];

        evaluate.args.forEach(argument => {
          if (argument.kind === ExpressionKind.Identifier) values.push((argument as Identifier).name);
          else values.push(this.evaluateExpression(argument));
        })

        const instruction = this.env.getInstruction(evaluate.callee.text);
        if(!instruction) throw new Error(`runtime (l: ${evaluate.callee.line}, c: ${evaluate.callee.col}): Invalid instruction founded during evaluation: ${evaluate.callee.text}`);

        instruction(this.env, ...values);

        return 0;
      }

      const values: number[] = [];
      
      evaluate.args.forEach(argument => {
        const value = this.evaluateExpression(argument);
        values.push(value);
      });

      const exec = this.env.getFunction(evaluate.callee.text);
      if(!exec) throw new Error(`runtime (l: ${evaluate.callee.line}, c: ${evaluate.callee.col}): Invalid function founded during evaluation: ${evaluate.callee.text}`);

      return exec(...values);
    }

    throw new Error(`runtime (l: -1, c: -1) [fatal-error]: Invalid expression founded during evaluation: ${evaluate.kind}`);
  }

  private isExpression<T extends Expression>(expression: Expression, kind: ExpressionKind): expression is T {
    return expression.kind == kind;
  } 
}