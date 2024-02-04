import Enviroment from "../structs/Enviroment";

export function set(_enviroment: Enviroment, key: string, value: number) {
  if (typeof value !== 'number') value = _enviroment.constants.get(value as string) || 0;

  _enviroment.constants.set(key, value);
}

export function add(_enviroment: Enviroment, key: string, count: number) {
  if (typeof count !== 'number') count = _enviroment.constants.get(count as string) || 0;

  if(!_enviroment.constants.has(key)) return;

  const oldValue = _enviroment.constants.get(key) as number;
  _enviroment.constants.set(key, oldValue + count);
}

export function sub(_enviroment: Enviroment, key: string, count: number) {
  if (typeof count !== 'number') count = _enviroment.constants.get(count as string) || 0;

  if(!_enviroment.constants.has(key)) return;

  const oldValue = _enviroment.constants.get(key) as number;
  _enviroment.constants.set(key, oldValue - count);
}

export function remove(_enviroment: Enviroment, key: string) {
  _enviroment.constants.delete(key);
}