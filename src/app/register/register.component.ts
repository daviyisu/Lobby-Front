import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsernamePassRequest } from '../../models/auth';
import { FormBuilder } from '@angular/forms';
import { LoginFormRequiredValidator } from '../../utils/validators';
import {lastValueFrom} from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;
  usernameAlreadyExists = false;

  private formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    username: ['', LoginFormRequiredValidator],
    password: ['', LoginFormRequiredValidator],
    confirmPassword: ['', LoginFormRequiredValidator],
  });

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  async register(): Promise<void> {
    if (
      !this.registerForm.valid ||
      this.registerForm.value.password !=
      this.registerForm.value.confirmPassword
    ) {
      return;
    }
    if (
      !this.registerForm.value.username ||
      !this.registerForm.value.password
    ) {
      return
    }
    let request: UsernamePassRequest = {
      username: this.registerForm.value.username,
      password: this.registerForm.value.password,
    };
    try {
      const response = await lastValueFrom(this.loginService.register(request));
      this.cookieService.set('token', response.token, 31);
      this.router.navigateByUrl('/mygames');
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 400) {
          this.usernameAlreadyExists = true;
        }
      }
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('login');
  }
}
