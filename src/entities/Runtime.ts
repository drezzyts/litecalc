import { BinarySyntaxExpression, NumberSyntaxExpression, ParenthesizedSyntaxExpression, SyntaxExpression, SyntaxExpressionType, SyntaxKind, UnarySyntaxExpression } from "../types/syntax";

export default class Runtime {
  constructor(public node: SyntaxExpression) {}
  
  public evaluate() {
    return this.evaluateExpression(this.node);
  }

  private evaluateExpression(node: SyntaxExpression): SyntaxExpressionType | number {
    switch(node.kind) {
      case SyntaxKind.NumberExpression:
        return (node as NumberSyntaxExpression).value;
      case SyntaxKind.BinaryExpression:
        const binary = node as BinarySyntaxExpression;
        const left = this.evaluateExpression(binary.left) as number;
        const right = this.evaluateExpression(binary.right) as number;
        
        switch(binary.operator.kind) {
          case SyntaxKind.CaretToken:
            return left ** right;
          case SyntaxKind.PlusToken:
            return left + right;
          case SyntaxKind.MinusToken:
            return left - right;
          case SyntaxKind.SlashToken:
            return left / right;
          case SyntaxKind.StarToken:
            return left * right;
          default:
            throw 'Unexpected binary operator has received!';
        }
      case SyntaxKind.UnaryExpression:
        const unary = node as UnarySyntaxExpression;
        const operand = this.evaluateExpression(unary.operand) as number;
        
        switch(unary.operator.kind){
          case SyntaxKind.PlusToken:
            return operand;
          case SyntaxKind.MinusToken:
            return -operand;
          default:
            throw 'Unexpected unary operator has received!';
        }
      case SyntaxKind.ParenthesizedExpression:
        return this.evaluateExpression((node as ParenthesizedSyntaxExpression).expression);
      default:
        throw 'Invalid node received!'
    }
  }
}