import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsernamePassRequest } from '../../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { LoginFormRequiredValidator } from '../../utils/validators';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LobbyInputComponent } from '../components/lobby-input/lobby-input.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [LobbyInputComponent, TranslateModule],
  standalone: true,
})
export class LoginComponent {
  hide = true;
  errorWithLogin = false;

  private formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    username: ['', LoginFormRequiredValidator],
    password: ['', LoginFormRequiredValidator],
  });

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  async login(): Promise<void> {
    if (!this.loginForm.valid) {
      return;
    }
    if (!this.loginForm.value.username || !this.loginForm.value.password) {
      return;
    }
    let request: UsernamePassRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };

    try {
      const response = await lastValueFrom(this.loginService.login(request));
      this.cookieService.set('token', response.token, 31);
      this.router.navigateByUrl('/mygames');
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 403) {
          this.errorWithLogin = true;
        }
      }
    }
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
