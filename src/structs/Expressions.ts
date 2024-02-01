import { ExpressionKind } from "../types/ast";
import { 
  ParenthesizedExpressionProps, 
  NumberExpressionProps, 
  BinaryExpressionProps, 
  Expression,
  UnaryExpressionProps
} from "../types/expressions";

import Token from "./Token";

export class NumberExpression implements NumberExpressionProps {
  public kind: ExpressionKind.NumberExpression;
  
  public constructor(public value: number, public token: Token) {
    this.kind = ExpressionKind.NumberExpression;
  }
}

export class BinaryExpression implements BinaryExpressionProps {
  public kind: ExpressionKind.BinaryExpression;

  public constructor(public left: Expression, public operator: Token, public right: Expression) {
    this.kind = ExpressionKind.BinaryExpression;
  }
}

export class UnaryExpression implements UnaryExpressionProps {
  public kind: ExpressionKind.UnaryExpression;

  public constructor(public operand: Expression, public operator: Token) {
    this.kind = ExpressionKind.UnaryExpression;
  }
}

export class ParenthesizedExpression implements ParenthesizedExpressionProps {
  public kind: ExpressionKind.ParenthesizedExpression;

  public constructor(public parens: [open: Token, close: Token], public expression: Expression) {
    this.kind = ExpressionKind.ParenthesizedExpression;
  }
}