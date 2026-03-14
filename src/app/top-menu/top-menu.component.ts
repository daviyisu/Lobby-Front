import { Component, inject } from '@angular/core';
import { LobbyButtonComponent } from '../components/lobby-button/lobby-button.component';
import { LoginService } from 'src/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  imports: [LobbyButtonComponent],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.scss',
})
export class TopMenuComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);

  protected logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('login');
  }
}
