import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormControl } from '@angular/forms';
import { Game } from '../../models/game';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GameService } from '../../services/game.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private gameService = inject(GameService);
  private userService = inject(UserService);

  user!: User;

  gameSearch = new FormControl('');
  queryResults?: Game[] = [];

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
    this.gameSearch.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => this.gameService.searchGamesByName(value || '')),
      )
      .subscribe(
        (result) => {
          this.queryResults = result;
        },
        (error) => {
          console.error(error);
        },
      );
  }

  goToGame(id: number): void {
    this.router.navigateByUrl('gamedetail/' + id);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
