import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginFormRequiredValidator } from '../../utils/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  hide = true;
  loading = false;
  /** Translation key of the error shown above the submit button. */
  error: string | null = null;

  loginForm = inject(FormBuilder).group({
    username: ['', LoginFormRequiredValidator],
    password: ['', LoginFormRequiredValidator],
  });

  async login(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.loginForm.getRawValue();
    this.loading = true;
    this.error = null;
    try {
      const response = await lastValueFrom(
        this.loginService.login({ username: username!, password: password! }),
      );
      this.cookieService.set('token', response.token, 31);
      this.router.navigateByUrl('/mygames');
    } catch (e) {
      this.error =
        e instanceof HttpErrorResponse && e.status === 403
          ? 'auth.loginError'
          : 'global.error';
    } finally {
      this.loading = false;
    }
  }
}
