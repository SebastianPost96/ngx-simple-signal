import { Signal, computed } from '@angular/core';

/**
 * Converts a Simple Signal to a regular Signal.
 * @param pointer A function pointing to the Simple Signal that should be converted.
 * @returns A new Signal based off the Simple Signal.
 * @example
 * ```ts
 *  ＠SimpleSignal(0) myNumber: number;
 *  signal = fromSimple(() => this.myNumber);
 * ```
 */
export function fromSimple<T>(pointer: () => T): Signal<T> {
  return computed(pointer);
}
