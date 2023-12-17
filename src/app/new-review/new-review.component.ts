import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private builder: FormBuilder,
    public newReviewDialogRef: MatDialogRef<NewReviewComponent>,
  ) {
    this.form = this.builder.group({
      summary: [''],
      review: [''],
    });
  }

  closeModal(): void {
    this.newReviewDialogRef.close();
  }
}
