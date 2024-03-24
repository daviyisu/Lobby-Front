import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsernamePassRequest } from '../../models/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  username?: string;
  password?: string;

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  register(): void {
    if (this.username && this.password) {
      let request: UsernamePassRequest = {
        username: this.username,
        password: this.password,
      };
      this.loginService.register(request).subscribe(
        (response) => {
          this.cookieService.set('token', response.token, 31);
          this.router.navigateByUrl('/mygames');
        },
        () => {
          console.log('Error en el registro');
        },
      );
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('login');
  }
}
