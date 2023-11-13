import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../app/models/user";
import { map } from 'rxjs/operators';
import {Deserialize, IJsonObject} from "dcerialize";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) {}

  public getUser(id: number): Observable<User> {
    return this.http.get<IJsonObject>(this.userUrl + id).pipe(
      map((data) => Deserialize(data, () => User )
      )
    )
  }
}
