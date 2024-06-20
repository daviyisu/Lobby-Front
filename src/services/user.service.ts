import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../environments/environment';
import {SteamUser} from "../models/steam-user";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = environment.apiPath + 'user/';

  constructor(private http: HttpClient) {}

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.userUrl + 'current_user');
  }

  public getSteamUserData(steamId: string): Observable<SteamUser> {
    return this.http.get<SteamUser>(this.userUrl + 'steam_data/' + steamId);
  }

  public updateAvatar(avatarUrl: string): Observable<void> {
    return this.http.post<void>(this.userUrl + 'avatar', { avatarUrl: avatarUrl });
  }
}
