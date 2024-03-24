import { Component } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsernamePassRequest } from '../../models/auth';
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

  login(): void {
    let request: UsernamePassRequest = {
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

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
