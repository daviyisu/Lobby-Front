import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UsernamePassRequest } from '../../models/auth';
import { FormBuilder } from '@angular/forms';
import { formRequiredValidator } from '../../utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  hide = true;

  private formBuilder = inject(FormBuilder);
  registerForm = this.formBuilder.group({
    username: ['', formRequiredValidator],
    password: ['', formRequiredValidator],
    confirmPassword: ['', formRequiredValidator],
  });

  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private router: Router,
  ) {}

  register(): void {
    if (
      this.registerForm.valid &&
      this.registerForm.value.password ===
        this.registerForm.value.confirmPassword
    ) {
      if (
        this.registerForm.value.username &&
        this.registerForm.value.password
      ) {
        let request: UsernamePassRequest = {
          username: this.registerForm.value.username,
          password: this.registerForm.value.password,
        };
        this.loginService.register(request).subscribe(
          (response) => {
            this.cookieService.set('token', response.token, 31);
            this.router.navigateByUrl('/mygames');
          },
          () => {
            console.log('Error en el registro');
          },
        );
      }
    }
  }

  goToLogin(): void {
    this.router.navigateByUrl('login');
  }
}
