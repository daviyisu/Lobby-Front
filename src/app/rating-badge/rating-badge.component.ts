import { Component, inject, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/** A 0–10 score with a star, colored by band. 10 is the only filled band. */
@Component({
  selector: 'app-rating-badge',
  template: `<span
    class="lb-rating lb-rating--{{ tier }}"
    [class.lb-rating--lg]="large"
    [attr.aria-label]="'rating.label' | translate: { value: display }"
    ><span class="lb-ic" aria-hidden="true">star</span>{{ display }}</span
  >`,
  standalone: false,
})
export class RatingBadgeComponent {
  private translate = inject(TranslateService);

  @Input({ required: true }) value!: number;
  /** Larger version for the average on the game page. */
  @Input() large = false;

  get tier(): string {
    const r = Math.round(this.value);
    return r >= 10 ? 'perfect' : r >= 8 ? 'high' : r >= 5 ? 'mid' : 'low';
  }

  /** Whole numbers as-is, averages with one decimal in the UI language ("8,7"). */
  get display(): string {
    return this.value.toLocaleString(this.translate.currentLang || 'en', {
      maximumFractionDigits: 1,
    });
  }
}
