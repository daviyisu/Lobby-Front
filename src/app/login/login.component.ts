import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { UsernamePassRequest } from '../../models/auth';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginFormRequiredValidator } from '../../utils/validators';
import { lastValueFrom } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { LobbyInputComponent } from '../components/lobby-input/lobby-input.component';
import { TranslateModule } from '@ngx-translate/core';
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
  private cookieService = inject(CookieService);
  private router = inject(Router);

  isRegister = false;
  errorWithLogin = false;

  private formBuilder = inject(FormBuilder);
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', LoginFormRequiredValidator],
    password: ['', Validators.required],
    confirmPassword: [''],
  });

  async submitAuth(): Promise<void> {
    if (!this.loginForm.valid) {
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

  toggleRegister(): void {
    this.loginForm.reset();
    this.isRegister = !this.isRegister;
  }
}
