import { BinaryExpression, NumberExpression, ParenthesizedExpression, UnaryExpression } from "../structs/Expressions";
import { Program } from "../structs/Statements";
import Token from "../structs/Token";
import { TokenKind } from "../types/ast";
import { Expression } from "../types/expressions";
import { ParserProps } from "../types/frontend";
import Lexer from "./Lexer";

export default class Parser implements ParserProps {
  public cursor: number;
  public tokens: Token[];

  public constructor(public code: string) {
    const lexer = new Lexer(code);

    this.tokens = lexer.lex();
    this.cursor = 0;
  }

  public parse(): Program {
    const expression = this.parseExpression();
    const program = new Program(expression);

    return program;
  }

  private parseExpression(): Expression {
    return this.parseBinaryExpression();
  }

  private parseBinaryExpression(parentPriority: number = 0): Expression {
    const unaryOperandPriority = Token.getUnaryOperandPriority(this.current.kind);
    let left;

    if (unaryOperandPriority !== 0 && unaryOperandPriority >= parentPriority) {
      const operator = this.tokens[this.cursor++];
      const operand = this.parseBinaryExpression(unaryOperandPriority);

      left = new UnaryExpression(operand, operator);
    } else {
      left = this.parsePrimaryExpression();
    }

    while (true) {
      const binaryOperatorPriority = Token.getBinaryOperatorPriority(this.current.kind);
      
      if (binaryOperatorPriority === 0 || binaryOperatorPriority <= parentPriority)
        break;

      const operator = this.tokens[this.cursor++];
      const right = this.parseBinaryExpression(binaryOperatorPriority);
      
      left = new BinaryExpression(left, operator, right); 
    }

    return left;
  }

  private parsePrimaryExpression(): Expression {
    if (this.current.kind == TokenKind.Number)
      return this.parseNumberExpression();

    if (this.current.kind == TokenKind.OpenParen)
      return this.parseParenthesizedExpression();

    if (this.current.kind == TokenKind.Minus)
      return this.parseUnaryExpression();

   throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Invalid token found during parsing: "${this.current.text}"`);
  }

  private parseNumberExpression(): NumberExpression {
    const token = this.expect(TokenKind.Number);
    const value = Number(token.text);

    return new NumberExpression(value, token);
  }

  private parseParenthesizedExpression(): ParenthesizedExpression {
    const open = this.expect(TokenKind.OpenParen);
    const expression = this.parseExpression();
    const close = this.expect(TokenKind.CloseParen);
    const parens: [open: Token, close: Token] = [open, close];

    return new ParenthesizedExpression(parens, expression);
  }

  private parseUnaryExpression(): UnaryExpression {
    const operator = this.tokens[this.cursor++];
    const operand = this.parseExpression();

    return new UnaryExpression(operand, operator);
  }

  private get current(): Token {
    return this.tokens[this.cursor];
  }

  private expect(kind: TokenKind): Token {
    if (this.current.kind == TokenKind.Eof) 
      throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Unexpected end of input expected: ${kind}`);
    else if (this.current.kind !== kind)
      throw new Error(`parser (l:${this.current.line}, c:${this.current.col}): Unexpected token has found during parsing "${this.current.text}" (${this.current.kind}), expected (${kind})`)
    else {
      const token = this.current;
      this.cursor++;

      return token;
    }
  }
} 