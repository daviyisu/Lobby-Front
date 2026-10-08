import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Review } from '../../models/review';

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss'],
  standalone: false,
})
export class ReviewCardComponent {
  @Input({ required: true }) review!: Review;
  /** Shows Edit and Delete: only on the viewer's own review. */
  @Input() own = false;
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  get initials(): string {
    return (this.review.writtenBy ?? '?').slice(0, 2).toUpperCase();
  }
}
