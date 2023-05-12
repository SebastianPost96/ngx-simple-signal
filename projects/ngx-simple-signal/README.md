# ngx-simple-signal

Angular 16+ Signals as property accessors. Enables usage with component inputs and template-driven forms.

## Usage

Import the `SimpleSignal` decorator from the library and use it on a property the same way you would create a regular Signal. This allows it to be used like a class property while keeping it's reactive functionalities.

```ts
import { SimpleSignal } from "ngx-simple-signal";

@Component({...})
export class MyComponent {
  @SimpleSignal(0) myNumber: number;
  doubleNumber = computed(() => this.myNumber * 2);

  constructor() {
    setInterval(() => this.myNumber++, 1000);
    effect(() => {
      console.log("My number is " + this.myNumber);
      console.log("My number times two is " + this.doubleNumber());
    });
  }
}
```

Due to this special syntax, Simple Signals can be used as a model in template-driven forms.

```html
<input [(ngModel)]="myNumber" />
```

Furthermore, it is also possible to react to component input changes.

```ts
import { SimpleSignal } from "ngx-simple-signal";

@Component({...})
export class MyComponent {
  @Input() @SimpleSignal(0) numberInput: number;

  constructor() {
    effect(() => {
      console.log("Number input changed to " + this.numberInput);
    });
  }
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

## Example Implementation

Minesweeper | [App](https://sebastianpost96.github.io/rx-boilerstate/) | [Repo](https://github.com/SebastianPost96/rx-boilerstate/tree/test/signals/projects/minesweeper)
