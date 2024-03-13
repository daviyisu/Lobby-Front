import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { LoginRequest } from '../../models/login-request';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
    private router: Router,
  ) {}

  login() {
    let request: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    this.loginService.login(request).subscribe(
      (response) => {
        this.cookieService.set('token', response.token, 31);
        this.router.navigateByUrl('/mygames');
      },
      () => {
        console.log('Error en el login');
      },
    );
  }
}
