import { Component, Input } from '@angular/core';

/**
 * Turns an empty screen into the next step: icon, title, one sentence and
 * the actions projected as content.
 */
@Component({
  selector: 'app-empty-state',
  template: `
    <div class="mark">
      <span class="lb-ic" aria-hidden="true">{{ icon }}</span>
    </div>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
    <div class="actions"><ng-content></ng-content></div>
  `,
  styles: `
    :host { display: flex; flex-direction: column; align-items: center; text-align: center; gap: var(--space-4); padding: var(--space-16) var(--space-6); }
    .mark { width: 72px; height: 72px; border-radius: var(--radius-full); background: var(--surface-2); color: var(--text-muted); display: grid; place-items: center; }
    .mark .lb-ic { font-size: 36px; }
    h2 { font: 700 22px/30px var(--font-sans); }
    p { margin: 0; color: var(--text-muted); max-width: 380px; }
    .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--space-2); margin-top: var(--space-2); }
  `,
  standalone: false,
})
export class EmptyStateComponent {
  @Input() icon = 'sports_esports';
  @Input({ required: true }) title!: string;
  @Input() text = '';
}
