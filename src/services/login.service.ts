import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private AuthApiPath = 'auth/';
  private cookieService = inject(CookieService);

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<any> {
    //TODO cuidado con esto
    return this.http.post<any>(
      environment.apiPath + this.AuthApiPath + 'login',
      request,
    );
  }

  logout() {
    this.cookieService.delete('token');
  }
}
