# ngx-simple-signal

Angular 16+ Signals as get/set accessors. Compatible with component inputs and two-way data binding.

## Description

This library provides a `SimpleSignal` decorator that can be attached to a property. It accepts the same parameters as a regular Signal and turns the property into a get/set accessor pair for the created Signal.

```ts
import { SimpleSignal } from "ngx-simple-signal";

@Component({...})
export class MyComponent {
  @SimpleSignal(0) myNumber: number;
}
```

The result is functionally equivalent to the following code:

```ts
@Component({...})
export class MyComponent {
  private _myNumber = signal(0);
  get myNumber(): number {
    return this._myNumber();
  }
  set myNumber(value: number): void {
    this._myNumber.set(value);
  }
}
```

## Usage

Simple Signals can be used in the same context as regular Signals and retain all their reactive properties.

```ts
@Component({...})
export class MyComponent {
  @SimpleSignal(0) myNumber: number;
  myNumberSquared = computed(() => this.myNumber ** 2);

  constructor() {
    setInterval(() => this.myNumber++, 1000);
    effect(() => {
      console.log("My number is " + this.myNumber);
      console.log("My number squared is " + this.myNumberSquared());
    });
  }
}
```

Due to the accessor syntax, Simple Signals can be two-way bound in template-driven forms.

```html
<input [(ngModel)]="myNumber" />
```

Furthermore, they can also be bound to component inputs and react to their changes.

```ts
@Component({...})
export class MyComponent {
  @Input() @SimpleSignal(0) numberInput: number;

  logChanges = effect(() => console.log("Number input changed to " + this.numberInput));
}
```

To convert a Simple Signal to a regular Signal, you can use the library function `fromSimple`.

```ts
import { SimpleSignal, fromSimple } from "ngx-simple-signal";

@Component({...})
export class MyComponent {
  @SimpleSignal(0) myNumber: number;
  signal = fromSimple(() => this.myNumber);
}
```
