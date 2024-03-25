import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsernamePassRequest } from '../../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { formRequiredValidator } from '../../utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hide = true;

  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    username: ['', formRequiredValidator],
    password: ['', formRequiredValidator],
  });

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  login(): void {
    if (this.loginForm.valid) {
      if (this.loginForm.value.username && this.loginForm.value.password) {
        let request: UsernamePassRequest = {
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
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
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
