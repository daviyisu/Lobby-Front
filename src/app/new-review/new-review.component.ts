import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { NewReviewDialogInterface } from '../../models/new-review-dialog.interface';
import { ReviewService } from '../../services/review.service';
import {
  INPUT_REVIEW_SUMMARY_MAX_LENGTH,
  INPUT_REVIEW_TEXT_MAX_LENGTH,
  ReviewSummaryValidator,
  ReviewTextValidator,
} from '../../utils/validators';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
  standalone: false,
})
export class NewReviewComponent {
  data = inject<NewReviewDialogInterface>(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<NewReviewComponent>);
  private reviewService = inject(ReviewService);

  readonly summaryMax = INPUT_REVIEW_SUMMARY_MAX_LENGTH;
  readonly textMax = INPUT_REVIEW_TEXT_MAX_LENGTH;

  /** Whether the dialog edits an existing review. */
  editReview = !!this.data.review;
  saving = false;
  saveError = false;

  form = inject(FormBuilder).group({
    summary: [this.data.review?.summary ?? '', ReviewSummaryValidator],
    review: [this.data.review?.review_text ?? '', ReviewTextValidator],
    rating: [
      (this.data.review?.rating ?? null) as number | null,
      Validators.required,
    ],
  });

  async save(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { summary, review, rating } = this.form.getRawValue();
    this.saving = true;
    this.saveError = false;
    try {
      await lastValueFrom(
        this.editReview
          ? this.reviewService.editReview(
              this.data.review.id,
              review!,
              summary!,
              rating!,
            )
          : this.reviewService.addReview(
              this.data.gameId,
              rating!,
              review!,
              summary!,
            ),
      );
      this.dialogRef.close(true);
    } catch {
      this.saveError = true;
    } finally {
      this.saving = false;
    }
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
