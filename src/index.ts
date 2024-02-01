import Runtime from "./backend/Runtime";

export function litecalc(expression: string) {
  const runtime = new Runtime(expression);
  return runtime.evaluate();
}