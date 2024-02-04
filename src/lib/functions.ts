export function factorial(factor: number): number {
  if (factor === 1 || factor === 0 ) return 1;

  return factor * factorial(factor - 1)
}