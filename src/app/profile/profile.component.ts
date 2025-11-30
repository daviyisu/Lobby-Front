import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { SteamSyncModalComponent } from '../steam-sync-modal/steam-sync-modal.component';
import { lastValueFrom } from 'rxjs';
import { GameService } from '../../services/game.service';
import { SyncSteamModalResponseInterface } from '../../models/sync-steam-modal-response-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: false,
})
export class ProfileComponent implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private userService = inject(UserService);
  private gameService = inject(GameService);
  private dialogRef = inject(MatDialog);

  user!: User;

  /**
   * Links of the tabs
   */
  links = [
    {
      label: 'profile.collection',
      route: 'mygames',
    },
    {
      label: 'profile.statistics',
      route: 'mystats',
    },
    {
      label: 'profile.lists',
      route: 'mylists',
    },
  ];

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
  }

  goToGame(id: number): void {
    this.router.navigateByUrl('gamedetail/' + id);
  }

  async openSteamSyncModal(): Promise<void> {
    const modalRef = this.dialogRef.open(SteamSyncModalComponent);
    const data = await lastValueFrom(modalRef.afterClosed());
    if (data as SyncSteamModalResponseInterface) {
      this.gameService.setUserGames();
      if (data.changeAvatar) {
        this.user.avatar_url = data.avatar;
      }
    }
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

  goToRecents(): void {
    this.router.navigateByUrl('recent');
  }
}
