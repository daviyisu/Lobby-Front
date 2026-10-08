import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/** An 11-step 0–10 scale picked with one tap; works with reactive forms. */
@Component({
  selector: 'app-rating-input',
  templateUrl: './rating-input.component.html',
  styleUrls: ['./rating-input.component.scss'],
  standalone: false,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingInputComponent),
      multi: true,
    },
  ],
})
export class RatingInputComponent implements ControlValueAccessor {
  steps = Array.from({ length: 11 }, (_, i) => i);
  value: number | null = null;
  disabled = false;

  private onChange: (value: number) => void = () => {};
  onTouched: () => void = () => {};

  tier(n: number): string {
    return n === 10 ? 'perfect' : n >= 8 ? 'high' : n >= 5 ? 'mid' : 'low';
  }

  select(n: number): void {
    this.value = n;
    this.onChange(n);
    this.onTouched();
  }

  move(event: KeyboardEvent): void {
    const step = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 }[
      event.key
    ];
    if (!step) {
      return;
    }
    event.preventDefault();
    const next = Math.min(10, Math.max(0, (this.value ?? 5) + step));
    this.select(next);
    const buttons = (event.currentTarget as HTMLElement).children;
    (buttons[next] as HTMLElement).focus();
  }

  writeValue(value: number | string | null): void {
    this.value = value === null || value === '' ? null : Number(value);
  }

  registerOnChange(fn: (value: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
