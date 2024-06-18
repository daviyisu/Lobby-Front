import {Component, inject} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {SteamUser} from "../../models/steam-user";
import {UserService} from "../../services/user.service";
import {lastValueFrom} from "rxjs";

@Component({
  selector: 'app-steam-sync-modal',
  templateUrl: './steam-sync-modal.component.html',
  styleUrls: ['./steam-sync-modal.component.scss']
})
export class SteamSyncModalComponent {
  public steamSynctDialogRef = inject(MatDialogRef<SteamSyncModalComponent>);
  private userService = inject(UserService);

  steamIdFormControl =  new FormControl('', Validators.required);
  steamUser?: SteamUser;

  closeModal(): void {
    this.steamSynctDialogRef.close();
  }

  async checkSteamId(): Promise<void> {
    if (!this.steamIdFormControl.valid || !this.steamIdFormControl.value) {

      return;
    }
    try {
      this.steamUser = await lastValueFrom(this.userService.getSteamUserData(this.steamIdFormControl.value));

    } catch (e) {
      throw Error;
    }
  }
}
