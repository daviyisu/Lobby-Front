import {Component, inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {SteamUser} from "../../models/steam-user";
import {UserService} from "../../services/user.service";
import {lastValueFrom} from "rxjs";
import {GameService} from "../../services/game.service";
import { HttpErrorResponse } from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-steam-sync-modal',
  templateUrl: './steam-sync-modal.component.html',
  styleUrls: ['./steam-sync-modal.component.scss']
})
export class SteamSyncModalComponent {
  public steamSynctDialogRef = inject(MatDialogRef<SteamSyncModalComponent>);
  private userService = inject(UserService);
  private gameService = inject(GameService);
  private snackBar = inject(MatSnackBar);
  private translate = inject(TranslateService);

  steamIdFormControl =  new FormControl('', Validators.required);
  steamUser?: SteamUser;
  showPrivateError = false;
  showAccountNotExistsError = false;
  loading = false;
  wantToKeepSteamAvatar = false;

  closeModal(): void {
    this.steamSynctDialogRef.close();
  }

  async checkSteamId(): Promise<void> {
    if (!this.steamIdFormControl.valid || !this.steamIdFormControl.value) {

      return;
    }
    this.loading = true;
    this.showPrivateError = false;
    this.showAccountNotExistsError = false;
    try {
      this.steamUser = await lastValueFrom(this.userService.getSteamUserData(this.steamIdFormControl.value));

    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 404) {
          this.showAccountNotExistsError = true;
        }

        if (e.status === 401) {
          this.showPrivateError = true;
        }
      }
      throw e;
    } finally {
      this.loading = false;
    }
  }

  async synchronizeSteamLibrary(): Promise<void> {
    if (!this.steamIdFormControl.valid || !this.steamIdFormControl.value) {

      return;
    }
    this.loading = true;
    try {
      await lastValueFrom(this.gameService.synchronizeSteamAccount(this.steamIdFormControl.value));
      if (this.wantToKeepSteamAvatar && this.steamUser?.avatar) {
       await lastValueFrom(this.userService.updateAvatar(this.steamUser.avatar));
      }
      this.snackBar.open(this.translate.instant('steamSync.snackBarSuccess') ,'', {duration: 3000, panelClass: ['blue-snackbar']})
      this.steamSynctDialogRef.close({avatar: this.steamUser?.avatar, changeAvatar: (this.wantToKeepSteamAvatar && this.steamUser?.avatar)});
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }
}
