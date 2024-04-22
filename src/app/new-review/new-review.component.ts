import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewReviewDialogInterface } from '../../models/new-review-dialog.interface';
import { ReviewService } from '../../services/review.service';
import {
  ReviewSummaryValidator,
  ReviewTextValidator,
} from '../../utils/validators';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
})
export class NewReviewComponent {
  /**
   * Form group
   */
  form: FormGroup;

  /**
   * Review rating
   */
  rating = 0;

  /**
   * Whether the modal was open to edit the review
   */
  editReview = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: NewReviewDialogInterface,
    private builder: FormBuilder,
    public newReviewDialogRef: MatDialogRef<NewReviewComponent>,
    private reviewService: ReviewService,
  ) {
    this.editReview = !!this.data.review;
    this.form = this.builder.group({
      summary: [
        this.editReview ? this.data.review.summary : '',
        ReviewSummaryValidator,
      ],
      review: [
        this.editReview ? this.data.review.review_text : '',
        ReviewTextValidator,
      ],
    });
  }

  sendReview(): void {
    if (this.form.valid) {
      this.reviewService
        .addReview(
          this.data.gameId,
          this.rating,
          this.form.value.review,
          this.form.value.summary,
        )
        .subscribe();
      this.closeModal();
    }
  }

  updateReview(): void {
    if (this.form.valid) {
      this.reviewService
        .editReview(
          this.data.review.id,
          this.form.value.review,
          this.form.value.summary,
        )
        .subscribe();
      this.closeModal();
    }
  }

  closeModal(): void {
    this.newReviewDialogRef.close();
  }
}
