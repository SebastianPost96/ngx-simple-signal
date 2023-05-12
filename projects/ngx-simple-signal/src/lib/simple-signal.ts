import { signal } from '@angular/core';

export function SimpleSignal<T>(value: T) {
  return function (target: object, key: string) {
    const privateKey = Symbol(key);

    Object.defineProperty(target, key, {
      set(newVal: T) {
        this[privateKey] ??= signal(value);
        this[privateKey].set(newVal);
      },
      get() {
        this[privateKey] ??= signal(value);
        return this[privateKey]();
      },
    });
  };
}
