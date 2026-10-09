import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { SteamUser } from '../../models/steam-user';
import { UserService } from '../../services/user.service';
import { GameService } from '../../services/game.service';
import { ToastService } from '../../services/toast.service';
import { SyncSteamModalResponseInterface } from '../../models/sync-steam-modal-response-interface';

/**
 * Two steps: find the Steam account by ID, then confirm the import.
 * Closes with the avatar choice once the library is synchronized.
 */
@Component({
  selector: 'app-steam-sync-modal',
  templateUrl: './steam-sync-modal.component.html',
  styleUrls: ['./steam-sync-modal.component.scss'],
  standalone: false,
})
export class SteamSyncModalComponent {
  private dialogRef = inject(MatDialogRef<SteamSyncModalComponent>);
  private userService = inject(UserService);
  private gameService = inject(GameService);
  private toast = inject(ToastService);

  steamIdFormControl = new FormControl('', Validators.required);
  steamUser?: SteamUser;
  loading = false;
  wantToKeepSteamAvatar = false;
  /** Translation key of the error shown in the dialog. */
  error: string | null = null;

  close(): void {
    this.dialogRef.close();
  }

  back(): void {
    this.steamUser = undefined;
    this.error = null;
  }

  async checkSteamId(): Promise<void> {
    const steamId = this.steamIdFormControl.value?.trim();
    if (!steamId) {
      this.steamIdFormControl.markAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      this.steamUser = await lastValueFrom(
        this.userService.getSteamUserData(steamId),
      );
    } catch (e) {
      const status = e instanceof HttpErrorResponse ? e.status : 0;
      this.error =
        status === 404
          ? 'steamSync.showAccountNotExistsError'
          : status === 401
            ? 'steamSync.showPrivateError'
            : 'global.error';
    } finally {
      this.loading = false;
    }
  }

  async synchronizeSteamLibrary(): Promise<void> {
    const steamId = this.steamIdFormControl.value?.trim();
    if (!steamId) {
      return;
    }
    this.loading = true;
    this.error = null;
    try {
      await lastValueFrom(this.gameService.synchronizeSteamAccount(steamId));
      const changeAvatar =
        this.wantToKeepSteamAvatar && !!this.steamUser?.avatar;
      if (changeAvatar) {
        await lastValueFrom(
          this.userService.updateAvatar(this.steamUser!.avatar),
        );
      }
      this.toast.show('steamSync.snackBarSuccess');
      const result: SyncSteamModalResponseInterface = {
        avatar: this.steamUser?.avatar ?? '',
        changeAvatar,
      };
      this.dialogRef.close(result);
    } catch {
      this.error = 'steamSync.syncError';
    } finally {
      this.loading = false;
    }
  }
}
