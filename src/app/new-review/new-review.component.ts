import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NewReviewDialogInterface } from '../../models/new-review-dialog.interface';
import { ReviewService } from '../../services/review.service';
import {
  ReviewSummaryValidator,
  ReviewTextValidator,
} from '../../utils/validators';
import { NgIf, NgClass } from '@angular/common';
import { MatFormField, MatInput, MatError } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-review',
  templateUrl: './new-review.component.html',
  styleUrls: ['./new-review.component.scss'],
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    MatIcon,
    NgClass,
    MatButton,
    TranslateModule,
  ],
  standalone: true
})
export class NewReviewComponent {
  /**
   * Form group
   */
  form: FormGroup;

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
      rating: [
        this.editReview ? this.data.review.rating : '',
        Validators.required,
      ],
    });
  }

  sendReview(): void {
    if (this.form.valid) {
      this.reviewService
        .addReview(
          this.data.gameId,
          this.form.value.rating,
          this.form.value.review,
          this.form.value.summary,
        )
        .subscribe();
      this.closeModal(true);
    }
  }

  updateReview(): void {
    if (this.form.valid) {
      this.reviewService
        .editReview(
          this.data.review.id,
          this.form.value.review,
          this.form.value.summary,
          this.form.value.rating,
        )
        .subscribe();
      this.closeModal(true);
    }
  }

  closeModal(needRefresh?: boolean): void {
    this.newReviewDialogRef.close(needRefresh);
  }
}
