import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/login-request';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  username = 'daviyisu';
  password = '1234';

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
  ) {}

  login() {
    let request: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    this.loginService.login(request).subscribe((response) => {
      this.cookieService.set('token', response.token);
    });
  }

  logout() {
    this.cookieService.delete('token');
  }
}
