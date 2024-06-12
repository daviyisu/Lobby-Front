import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
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
  private userService = inject(UserService);

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

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

  goToRecents(): void {
    this.router.navigateByUrl('recent')
  }
}
