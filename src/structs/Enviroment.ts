import { FUNCTIONS, CONSTANTS, INSTRUCTIONS } from "../constants/runtime";

export default class Enviroment {
  public constants = new Map(CONSTANTS);
  public functions = new Map(FUNCTIONS);
  public instructions = new Map(INSTRUCTIONS);

  public constructor() {}

  public hasConstant(name: string): boolean {
    return this.constants.has(name);
  }

  public hasFunction(name: string): boolean {
    return this.functions.has(name);
  }

  public getFunction(callee: string) {
    return this.functions.get(callee);
  }

  public getInstruction(callee: string) {
    return this.instructions.get(callee);
  }

  public getConstant(name: string) {
    return this.constants.get(name);
  }
}