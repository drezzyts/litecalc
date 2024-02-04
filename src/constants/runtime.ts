import { factorial } from "../lib/functions";
import { constant, remove } from "../lib/instructions";
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
  ['constant', constant],
  ['remove', remove]
]

export const CONSTANTS: [string, number][] = [
  ['pi', Math.PI],
  ['e', Math.E],
  ['tau', Math.PI * 2],
]