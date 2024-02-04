import Enviroment from "../structs/Enviroment";

export function constant(_enviroment: Enviroment, key: string, value: number) {
  if (typeof value !== 'number') value = _enviroment.constants.get(value as string) || 0;
  
  _enviroment.constants.set(key, value);
}

export function remove(_enviroment: Enviroment, key: string) {
  _enviroment.constants.delete(key);
}