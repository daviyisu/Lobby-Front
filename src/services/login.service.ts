import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthResponse, UsernamePassRequest } from '../models/auth';
import { environment } from '../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { Deserialize, IJsonObject } from 'dcerialize';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private AuthApiPath = 'auth/';
  private cookieService = inject(CookieService);

  constructor(private http: HttpClient) {}

  login(request: UsernamePassRequest): Observable<AuthResponse> {
    return this.http
      .post<IJsonObject>(
        environment.apiPath + this.AuthApiPath + 'login',
        request,
      )
      .pipe(map((response) => Deserialize(response, () => AuthResponse)));
  }

  register(request: UsernamePassRequest): Observable<any> {
    return this.http
      .post<IJsonObject>(
        environment.apiPath + this.AuthApiPath + 'register',
        request,
      )
      .pipe(map((response) => Deserialize(response, () => AuthResponse)));
  }

  logout() {
    this.cookieService.delete('token');
  }
}
