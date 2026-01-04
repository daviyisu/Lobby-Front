import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsernamePassRequest } from '../../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LoginFormRequiredValidator } from '../../utils/validators';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LobbyInputComponent } from '../components/lobby-input/lobby-input.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LobbyButtonComponent } from '../components/lobby-button/lobby-button.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    LobbyInputComponent,
    TranslateModule,
    LobbyButtonComponent,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private translateService = inject(TranslateService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  isRegister = false;
  errorWithLogin = false;

  confirmPasswordValidator: ValidatorFn = (
    group: AbstractControl,
  ): ValidationErrors | null => {
    const passwordControl = group.get('password');
    const confirmPasswordControl = group.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (!password || !confirmPassword) {
      confirmPasswordControl.setErrors(null);
      return null;
    }

    if (password !== confirmPassword) {
      confirmPasswordControl.setErrors({ passwordNoMatch: true });
      return { passwordNoMatch: true };
    }

    if (confirmPasswordControl.hasError('passwordNoMatch')) {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };

  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.formBuilder.group(
    {
      username: ['', LoginFormRequiredValidator],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    },
    { validators: this.confirmPasswordValidator },
  );

  async submitAuth(): Promise<void> {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    let request: UsernamePassRequest = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
      confirmPassword: this.isRegister
        ? this.loginForm.value.confirmPassword
        : undefined,
    };

    try {
      const response = this.isRegister
        ? await lastValueFrom(this.loginService.register(request))
        : await lastValueFrom(this.loginService.login(request));
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

  get username() {
    return this.loginForm.get('username') as FormControl;
  }

  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  get confirmPassword() {
    return this.loginForm.get('confirmPassword') as FormControl;
  }

  getFormError(control: FormControl): string | null {
    console.log(control.errors);
    if (control.touched && control.invalid) {
      if (control.errors?.['required']) {
        return this.translateService.instant('forms.required');
      }

      if (control.errors?.['minlength']) {
        return this.translateService.instant('forms.tooShort');
      }

      if (control.errors?.['maxlength']) {
        return this.translateService.instant('forms.tooLarge');
      }

      if (control.errors?.['passwordNoMatch']) {
        return this.translateService.instant('forms.passwordNotMatch');
      }
    }
    return null;
  }

  toggleRegister(): void {
    this.loginForm.reset();
    this.isRegister = !this.isRegister;
  }
}
