import { 
  BinarySyntaxExpression, 
  NumberSyntaxExpression, 
  ParenthesizedSyntaxExpression, 
  SyntaxExpression, 
  SyntaxExpressionType, 
  SyntaxKind, 
  SyntaxToken, 
  SyntaxTokenPosition, 
  UnarySyntaxExpression 
} from "../../types/syntax";

export default class SyntaxMaker {
  public static mkUnaryExpressionSyntax(
    operator: SyntaxToken, 
    operand: SyntaxExpressionType
  ): UnarySyntaxExpression {
    return {
      kind: SyntaxKind.UnaryExpression,
      operand,
      operator
    } as UnarySyntaxExpression;
  }
  
  public static mkBinaryExpressionSyntax(
    left: SyntaxExpression, 
    operator: SyntaxToken, 
    right: SyntaxExpression
  ): BinarySyntaxExpression {
    return { 
      kind: SyntaxKind.BinaryExpression, 
      left, 
      operator, 
      right 
    } as BinarySyntaxExpression;
  }

  public static makeParenthesizedExpression(left: SyntaxToken, expression: SyntaxExpression, right: SyntaxToken): ParenthesizedSyntaxExpression {
    return { 
      kind: SyntaxKind.ParenthesizedExpression, 
      left, 
      expression, 
      right 
    } as ParenthesizedSyntaxExpression;
  }

  public static makeToken(
    kind: SyntaxKind, 
    position: SyntaxTokenPosition, 
    text: string, 
    value: number | null
  ): SyntaxToken {
    return { kind, position, text, value } as SyntaxToken;
  }

  public static makeNumberExpression(
    token: SyntaxToken,
    value: number
  ): NumberSyntaxExpression {
    return { kind: SyntaxKind.NumberExpression, token, value } as NumberSyntaxExpression;
  }
}