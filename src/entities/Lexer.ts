import isNumber from "../lib/is-number";
import { SyntaxKind, SyntaxToken, SyntaxTokenPosition } from "../types/syntax";
import SyntaxGetter from "./Getters/SyntaxGetter";
import SyntaxMaker from "./Makers/SyntaxMaker";

export default class Lexer {
  private position: number;
  private text: string[];

  public constructor (text: string) {
    this.text = text.split('');
    this.position = 0;
  }

  private get current() {
    return this.peek(0);
  }

  private next(): void {
    this.position++;
  }

  private peek(sum: number) {
    const i = this.position + sum;

    if (i >= this.text.length) {
        return '\0';
    }

    return this.text[i];
  }
  
  public lex() {
    const tokens: SyntaxToken[] = [];
    
    while(this.position !== this.text.length) {
      if(isNumber(this.current)) tokens.push(this.readNumber());
      else if(this.current === ' ') this.readWhitespace();
      else {
        const kind = SyntaxGetter.getKindByText(this.current);
        const position: SyntaxTokenPosition = [this.position, this.position];
        
        tokens.push(SyntaxMaker.makeToken(kind, position, this.current, null));
        this.next();
      }
    }
    tokens.push(SyntaxMaker.makeToken(SyntaxKind.EOF, [this.position, this.position], '\0', null));

    return tokens;
  }

  private readWhitespace() {
    while(this.current === ' ' && this.position !== this.text.length) {
      this.next();
    }
  }

  private readNumber() {
    const start = this.position; 
    
    let number = '';
    let end = this.position;
    
    while(isNumber(this.current) && this.position !== this.text.length) {
      number += this.current;
      end = this.position;
      this.next();
    }

    const position: SyntaxTokenPosition = [start, end];

    return SyntaxMaker.makeToken(SyntaxKind.NumberToken, position, number, parseInt(number));
  }
}