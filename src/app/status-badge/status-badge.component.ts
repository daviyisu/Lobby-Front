import { Component, Input } from '@angular/core';
import { CollectionStatusEnum } from '../../models/enums';
import { STATUS_META } from '../../models/collection-game';

/**
 * Pill showing a game's collection status: icon, word and color, never color alone.
 */
@Component({
  selector: 'app-status-badge',
  template: `
    <span *ngIf="meta" class="lb-status lb-status--{{ meta.key }}">
      <span class="lb-ic" aria-hidden="true">{{ meta.icon }}</span>
      {{ 'gameStatus.' + status | translate }}
    </span>
  `,
  standalone: false,
})
export class StatusBadgeComponent {
  @Input({ required: true }) status!: CollectionStatusEnum;

  get meta() {
    return STATUS_META.find((m) => m.status === this.status);
  }
}
