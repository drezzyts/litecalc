import Enviroment from "../structs/Enviroment";

export function constant(_enviroment: Enviroment, key: string, value: number) {
  _enviroment.constants.set(key, value);
}

export function remove(_enviroment: Enviroment, key: string) {
  _enviroment.constants.delete(key);
}