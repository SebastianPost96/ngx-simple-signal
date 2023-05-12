import { signal } from '@angular/core';

/**
 * Decorator that turns a class field into a get/set accessor for a Signal.
 * @param args The same parameters that are accepted by a Signal.
 * @example
 * ```ts
 *  ＠SimpleSignal(0) myNumber: number;
 * ```
 */
export function SimpleSignal<T>(...args: Parameters<typeof signal<T>>) {
  return function (target: object, key: string) {
    const privateKey = Symbol(key);

    Object.defineProperty(target, key, {
      set(newVal: T) {
        this[privateKey] ??= signal(...args);
        this[privateKey].set(newVal);
      },
      get() {
        this[privateKey] ??= signal(...args);
        return this[privateKey]();
      },
    });
  };
}
