import { Validators } from '@angular/forms';

export const INPUT_USERNAME_MIN_LENGTH = 4;
export const INPUT_USERNAME_MAX_LENGTH = 30;
export const INPUT_REVIEW_TEXT_MIN_LENGTH = 5;
export const INPUT_REVIEW_TEXT_MAX_LENGTH = 1000;
export const INPUT_REVIEW_SUMMARY_MIN_LENGTH = 5;
export const INPUT_REVIEW_SUMMARY_MAX_LENGTH = 255;

export const LoginFormRequiredValidator = [
  Validators.required,
  Validators.minLength(INPUT_USERNAME_MIN_LENGTH),
  Validators.maxLength(INPUT_USERNAME_MAX_LENGTH),
];

export const ReviewTextValidator = [
  Validators.required,
  Validators.minLength(INPUT_REVIEW_TEXT_MIN_LENGTH),
  Validators.maxLength(INPUT_REVIEW_TEXT_MAX_LENGTH),
];

export const ReviewSummaryValidator = [
  Validators.required,
  Validators.minLength(INPUT_REVIEW_SUMMARY_MIN_LENGTH),
  Validators.maxLength(INPUT_REVIEW_SUMMARY_MAX_LENGTH),
];
