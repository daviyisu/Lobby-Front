import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormBuilder, ValidationErrors } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { lastValueFrom } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { LoginFormRequiredValidator } from '../../utils/validators';

/** Group validator: the two password fields must match. */
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirmPassword');
  const mismatch = !!confirm?.value && password !== confirm.value;
  if (mismatch) {
    confirm?.setErrors({ ...confirm.errors, mismatch: true });
  } else if (confirm?.hasError('mismatch')) {
    const { mismatch: _removed, ...rest } = confirm.errors ?? {};
    confirm.setErrors(Object.keys(rest).length ? rest : null);
  }
  return mismatch ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  hide = true;
  loading = false;
  /** Translation key of the error shown above the submit button. */
  error: string | null = null;

  registerForm = inject(FormBuilder).group(
    {
      username: ['', LoginFormRequiredValidator],
      password: ['', LoginFormRequiredValidator],
      confirmPassword: ['', LoginFormRequiredValidator],
    },
    { validators: passwordsMatch },
  );

  async register(): Promise<void> {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    const { username, password } = this.registerForm.getRawValue();
    this.loading = true;
    this.error = null;
    try {
      const response = await lastValueFrom(
        this.loginService.register({
          username: username!,
          password: password!,
        }),
      );
      this.cookieService.set('token', response.token, 31);
      this.router.navigateByUrl('/mygames');
    } catch (e) {
      this.error =
        e instanceof HttpErrorResponse && e.status === 400
          ? 'auth.usernameAlreadyExists'
          : 'global.error';
    } finally {
      this.loading = false;
    }
  }
}
