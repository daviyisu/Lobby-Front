import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLinkActive, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { MatDialog } from '@angular/material/dialog';
import { SteamSyncModalComponent } from '../steam-sync-modal/steam-sync-modal.component';
import { lastValueFrom } from 'rxjs';
import { GameService } from '../../services/game.service';
import { SyncSteamModalResponseInterface } from '../../models/sync-steam-modal-response-interface';
import { MatButton } from '@angular/material/button';
import { NgIf, NgFor } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { GameSearchBarComponent } from '../game-search-bar/game-search-bar.component';
import { MatTabNav, MatTabLink, MatTabNavPanel } from '@angular/material/tabs';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    MatButton,
    NgIf,
    MatIcon,
    GameSearchBarComponent,
    MatTabNav,
    NgFor,
    MatTabLink,
    RouterLinkActive,
    RouterLink,
    MatTabNavPanel,
    TranslateModule,
  ],
  standalone: true
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
