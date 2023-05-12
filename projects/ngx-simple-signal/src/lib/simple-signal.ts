import { signal, CreateSignalOptions } from '@angular/core';

export function SimpleSignal<T>(value: T, options?: CreateSignalOptions<T>) {
  return function (target: object, key: string) {
    const privateKey = Symbol(key);

    Object.defineProperty(target, key, {
      set(newVal: T) {
        this[privateKey] ??= signal(value, options);
        this[privateKey].set(newVal);
      },
      get() {
        this[privateKey] ??= signal(value, options);
        return this[privateKey]();
      },
    });
  };
}
