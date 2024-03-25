import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import { Deserialize, IJsonObject } from 'dcerialize';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'user/';

  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.http
      .get<IJsonObject>(environment.apiPath + this.userUrl + id)
      .pipe(map((data) => Deserialize(data, () => User)));
  }
}
