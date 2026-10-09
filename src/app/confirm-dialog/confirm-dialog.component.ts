import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ConfirmDialogData {
  /** Already translated texts. */
  title: string;
  text: string;
  confirm: string;
}

/**
 * Confirmation for irreversible, destructive actions. Closes with `true`
 * when confirmed.
 */
@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h2 class="title">{{ data.title }}</h2>
    <p class="text">{{ data.text }}</p>
    <div class="modal-actions">
      <button mat-button [mat-dialog-close]="false">
        {{ 'global.cancel' | translate }}
      </button>
      <button mat-stroked-button class="danger" [mat-dialog-close]="true">
        <span class="lb-ic" aria-hidden="true">delete</span>
        {{ data.confirm }}
      </button>
    </div>
  `,
  styles: `
    .title { font: 700 22px/30px var(--font-sans); letter-spacing: -0.01em; }
    .text { margin: var(--space-2) 0 0; color: var(--text-muted); }
    .danger {
      --mat-button-outlined-label-text-color: var(--danger);
      --mat-button-outlined-outline-color: var(--danger);
      --mat-button-outlined-state-layer-color: var(--danger);
    }
  `,
  standalone: false,
})
export class ConfirmDialogComponent {
  data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);
}
