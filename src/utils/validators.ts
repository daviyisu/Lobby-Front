import { Validators } from '@angular/forms';

export const INPUT_USERNAME_MIN_LENGTH = 4;
export const INPUT_USERNAME_MAX_LENGTH = 30;

export const formRequiredValidator = [
  Validators.required,
  Validators.minLength(INPUT_USERNAME_MIN_LENGTH),
  Validators.maxLength(INPUT_USERNAME_MAX_LENGTH),
];
