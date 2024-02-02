import { FUNCTIONS, CONSTANTS } from "../constants/runtime";

export default class Enviroment {
  public constants: Map<string, number>;
  public functions: Map<string, ((...args: number[]) => number)>;

  public constructor() {
    this.constants = new Map(CONSTANTS);
    this.functions = new Map(FUNCTIONS);
  }

  public hasConstant(name: string): boolean {
    return this.constants.has(name);
  }

  public hasFunction(name: string): boolean {
    return this.functions.has(name);
  }

  public getFunction(callee: string) {
    return this.functions.get(callee);
  }

  public getConstant(name: string) {
    return this.constants.get(name);
  }
}