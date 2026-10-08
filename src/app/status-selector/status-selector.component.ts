import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CollectionStatusEnum } from '../../models/enums';
import { STATUS_META } from '../../models/collection-game';

/**
 * Five-option segmented control to file a game with one tap.
 * Emits the chosen status; the parent saves it.
 */
@Component({
  selector: 'app-status-selector',
  templateUrl: './status-selector.component.html',
  styleUrls: ['./status-selector.component.scss'],
  standalone: false,
})
export class StatusSelectorComponent {
  @Input({ required: true }) status!: CollectionStatusEnum;
  @Input() disabled = false;
  @Output() statusChange = new EventEmitter<CollectionStatusEnum>();

  options = STATUS_META;

  select(status: CollectionStatusEnum): void {
    if (status !== this.status && !this.disabled) {
      this.statusChange.emit(status);
    }
  }

  /** Arrow keys move the selection, as in a native radio group. */
  move(event: KeyboardEvent, index: number): void {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[
      event.key
    ];
    if (!step) {
      return;
    }
    event.preventDefault();
    const next = (index + step + this.options.length) % this.options.length;
    this.select(this.options[next].status);
    const buttons = (event.currentTarget as HTMLElement).parentElement
      ?.children;
    (buttons?.[next] as HTMLElement | undefined)?.focus();
  }
}
