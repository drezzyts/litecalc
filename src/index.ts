import Lexer from "./entities/Lexer";
import Parser from "./entities/Parser";
import Runtime from "./entities/Runtime";

export function litecalc(expression: string) {
  const lexer = new Lexer(expression);
  const tokens = lexer.lex();

  const parser = new Parser(tokens);
  const node = parser.parse();

  const runtime = new Runtime(node);
  const result = runtime.evaluate();
  
  return result as number;
}

const r = litecalc("");

console.log(r);