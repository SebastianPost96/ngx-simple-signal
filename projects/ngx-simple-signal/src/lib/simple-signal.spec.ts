import { Component, Input, computed } from '@angular/core';
import { SimpleSignal } from './simple-signal';
import {
  TestBed,
  ComponentFixture,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fromSimple } from 'ngx-simple-signal';

@Component({
  standalone: true,
  template: '<input [(ngModel)]="myString">',
  imports: [FormsModule],
})
class TestComponent {
  @SimpleSignal('') myString!: string;
}

describe('Simple Signal', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance; // BannerComponent test instance
  });

  it('should read default value', () => {
    expect(component.myString).toBe('');
  });

  it('should update computed signals', () => {
    const computedString = computed(() => component.myString + ' world');
    component.myString = 'hello';

    expect(computedString()).toBe('hello world');
  });

  it('should work with two-way binding: set form', () => {
    fixture.detectChanges();

    const stringInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input');
    stringInput.value = 'foo';
    stringInput.dispatchEvent(new Event('input'));

    expect(component.myString).toBe('foo');
  });

  it('should work with two-way binding: set property', fakeAsync(() => {
    const stringInput: HTMLInputElement =
      fixture.nativeElement.querySelector('input');

    component.myString = 'bar';
    fixture.detectChanges();
    tick();

    expect(stringInput.value).toBe('bar');
  }));

  it('should convert to regular signal', () => {
    const signal = fromSimple(() => component.myString);
    component.myString = 'test';

    expect(signal()).toBe('test');
  });
});
