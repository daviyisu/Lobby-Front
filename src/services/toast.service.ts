import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

/**
 * Short, non-blocking confirmations. When the action is reversible, pass an
 * `onUndo` callback: the toast then offers "Undo".
 */
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  show(
    messageKey: string,
    params?: Record<string, unknown>,
    onUndo?: () => void,
  ): void {
    const ref = this.snackBar.open(
      this.translate.instant(messageKey, params),
      onUndo ? this.translate.instant('global.undo') : undefined,
      { duration: 5000, panelClass: ['blue-snackbar'] },
    );
    if (onUndo) {
      ref.onAction().subscribe(onUndo);
    }
  }
}
