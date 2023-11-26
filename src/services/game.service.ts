import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://localhost:8080/games/';

  constructor(private http: HttpClient) { }

  public getCoverUrl(id: number): Observable<string> {
    return this.http.get<string>(this.gameUrl + 'getimage/' + id)
  }

}
