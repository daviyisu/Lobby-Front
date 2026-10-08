import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, Subject } from 'rxjs';
import { SteamSyncModalComponent } from '../app/steam-sync-modal/steam-sync-modal.component';
import { SyncSteamModalResponseInterface } from '../models/sync-steam-modal-response-interface';
import { GameService } from './game.service';

/**
 * Actions the app shell (top bar) owns but any page can trigger:
 * focusing the game search and opening the Steam sync dialog.
 */
@Injectable({
  providedIn: 'root',
})
export class ShellService {
  private dialog = inject(MatDialog);
  private gameService = inject(GameService);

  private focusSearchSubject = new Subject<void>();
  focusSearch$ = this.focusSearchSubject.asObservable();

  private steamSyncedSubject = new Subject<SyncSteamModalResponseInterface>();
  steamSynced$ = this.steamSyncedSubject.asObservable();

  focusSearch(): void {
    this.focusSearchSubject.next();
  }

  async openSteamSync(): Promise<void> {
    const modalRef = this.dialog.open(SteamSyncModalComponent);
    const data: SyncSteamModalResponseInterface | undefined =
      await lastValueFrom(modalRef.afterClosed());
    if (data) {
      this.gameService.setUserGames();
      this.steamSyncedSubject.next(data);
    }
  }
}
