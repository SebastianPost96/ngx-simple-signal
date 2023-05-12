# ngx-simple-signal

Angular 16+ signals as property accessors. Enables usage with component inputs and template-driven forms.

## Usage

Import the `SimpleSignal` decorator from the library and use it on a property the same way you would create a regular signal. This allows it to be used like a class property while keeping it's reactive functionalities.

```ts
import { SimpleSignal } from "ngx-simple-signal";
import { computed, effect } from "@angular/core";

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

Due to this special syntax, simple signals can be used as a model in template-driven forms.

```html
<input [(ngModel)]="myNumber" />
```

Furthermore, it is also possible to react to component input changes.

```ts
import { SimpleSignal } from "ngx-simple-signal";
import { Input, effect } from "@angular/core";

export class MyComponent {
  @Input() @SimpleSignal(0) numberInput: number;

  constructor() {
    effect(() => {
      console.log("Number input changed to " + this.numberInput);
    });
  }
}
```
