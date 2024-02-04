import { factorial } from "../lib/functions";
import { add, set, remove, sub } from "../lib/instructions";
import Enviroment from "../structs/Enviroment";

export const FUNCTIONS: [string, ((...args: number[]) => number)][] = [
  ['pow', Math.pow],
  ['sqrt', Math.sqrt],
  ['hypot', Math.hypot],
  ['sin', Math.sin],
  ['cos', Math.cos],
  ['tan', Math.tan],
  ['factorial', factorial]
]

export const INSTRUCTIONS: [string, ((_enviroment: Enviroment, ...args: any[]) => void)][] = [
  ['set', set],
  ['remove', remove],
  ['add', add],
  ['sub', sub]
]

export const CONSTANTS: [string, number][] = [
  ['pi', Math.PI],
  ['e', Math.E],
  ['tau', Math.PI * 2],
]