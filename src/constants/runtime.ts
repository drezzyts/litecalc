export const FUNCTIONS: [string, ((...args: number[]) => number)][] = [
  ['pow', Math.pow],
  ['sqrt', Math.sqrt],
  ['hypot', Math.hypot],
  ['sin', Math.sin],
  ['cos', Math.cos],
  ['tan', Math.tan]
]

export const CONSTANTS: [string, number][] = [
  ['pi', Math.PI],
  ['e', Math.E],
  ['tau', Math.PI * 2],
]