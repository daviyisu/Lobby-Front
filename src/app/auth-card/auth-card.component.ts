import { Component, Input } from '@angular/core';

/**
 * Centered card shared by Log in and Register: logo, title, a value line,
 * the form (projected) and a footer slot for the switch link.
 */
@Component({
  selector: 'app-auth-card',
  template: `
    <main class="auth">
      <div class="auth__in">
        <header class="auth__head">
          <img src="favicon.ico" alt="" width="64" height="64" />
          <h1 class="h1">{{ title }}</h1>
          <p>{{ subtitle }}</p>
        </header>
        <div class="auth__card"><ng-content></ng-content></div>
        <p class="auth__foot"><ng-content select="[footer]"></ng-content></p>
      </div>
    </main>
  `,
  styles: `
    .auth { min-height: 100%; display: grid; place-items: center; padding: var(--space-8) var(--space-4); }
    .auth__in { width: 100%; max-width: 400px; display: flex; flex-direction: column; gap: var(--space-6); }
    .auth__head { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); text-align: center; }
    .auth__head p { margin: 0; color: var(--text-muted); }
    .auth__card { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); padding: var(--space-6); }
    .auth__foot { margin: 0; text-align: center; color: var(--text-muted); }
  `,
  standalone: false,
})
export class AuthCardComponent {
  @Input({ required: true }) title!: string;
  @Input() subtitle = '';
}
