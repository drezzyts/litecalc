import { SyntaxExpression, SyntaxExpressionType, SyntaxKind, SyntaxToken } from "../types/syntax";
import SyntaxGetter from "./Getters/SyntaxGetter";
import SyntaxMaker from "./Makers/SyntaxMaker";

export default class Parser {
  public position: number;
  public constructor(public tokens: SyntaxToken[]) {
    this.position = 0;
  }
  
  private peek(sum: number): SyntaxToken {
    const i = this.position + sum;
    if (i >= this.tokens.length) {
        return this.tokens[this.tokens.length - 1];
    }

    return this.tokens[i];
}

  private get current(): SyntaxToken {
      return this.peek(0);
  }

  private nextToken(): SyntaxToken {
      const _current = this.current;
      this.position++;
      return _current;
  }

  private expect(kind: SyntaxKind): SyntaxToken {
      if (this.current.kind === kind) {
          return this.nextToken();
      }

      throw 'Invalid token'
  }

  public parse() {
    const expression = this.parseExpression();
    this.expect(SyntaxKind.EOF);

    return expression;
  }
  private parseExpression() {
    return this.parseBinaryExpression();
  }

  private parsePrimaryExpression(): SyntaxExpressionType {
    switch(this.current.kind) {
      case SyntaxKind.OpenParenthesisToken:
        const left = this.nextToken();
        const expression: SyntaxExpressionType = this.parseBinaryExpression();
        const right = this.expect(SyntaxKind.CloseParenthesisToken);

        return SyntaxMaker.makeParenthesizedExpression(left, expression, right);
      default:
        const token = this.expect(SyntaxKind.NumberToken);
        return SyntaxMaker.makeNumberExpression(token,token.value as number);
    }
  }

  private parseBinaryExpression(parentPriority = 0): SyntaxExpressionType {
    let left;
    const unaryOperatorPriority = SyntaxGetter.getUnaryOperatorPriority(
        this.current.kind
    );

    if (
        unaryOperatorPriority !== 0 &&
        unaryOperatorPriority >= parentPriority
    ) {
        const operator = this.nextToken();
        const operand = this.parseBinaryExpression(unaryOperatorPriority);
        left = SyntaxMaker.mkUnaryExpressionSyntax(operator, operand);
    } else {
        left = this.parsePrimaryExpression();
    }

    while(true) {
      const priority = SyntaxGetter.getBinaryOperatorPriority(this.current.kind);
      if (priority === 0 || priority <= parentPriority) {
          break;
      }

      const operator = this.nextToken();
      const right = this.parseBinaryExpression(priority);
      left = SyntaxMaker.mkBinaryExpressionSyntax(
          left as SyntaxExpression,
          operator,
          right
      );
    }

    return left as SyntaxExpressionType;
  }
}