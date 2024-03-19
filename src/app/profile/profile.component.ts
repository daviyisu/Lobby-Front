import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

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

  logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
