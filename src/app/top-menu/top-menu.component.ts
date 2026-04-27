import { Component, inject } from '@angular/core';
import { LobbyButtonComponent } from '../components/lobby-button/lobby-button.component';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

export interface Tab {
  id: number;
  name: string;
  route?: string;
  action?: () => void;
}

@Component({
  selector: 'app-top-menu',
  imports: [LobbyButtonComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  protected tabs: Tab[] = [
    {
      id: 1,
      name: 'Colección',
      route: 'mygames',
    },
    {
      id: 2,
      name: 'Estadísticas',
      route: 'mystats',
    },
    {
      id: 3,
      name: 'Listas',
      route: 'mylists',
    },
    {
      id: 4,
      name: 'Temp Log out',
      action: () => this.logout(),
    },
  ];

  protected isTabSelected(tab: Tab): boolean {
    if (!tab.route) return false;
    return this.router.url.startsWith('/' + tab.route);
  }

  protected logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }

  protected selectTab(tab: Tab): void {
    if (tab.route) {
      this.router.navigateByUrl(tab.route);
    } else if (tab.action) {
      tab.action();
    }
  }
}
