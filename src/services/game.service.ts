import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Deserialize, IJsonObject } from 'dcerialize';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameApiPath = 'http://localhost:8080/games/';

  constructor(private http: HttpClient) {}

  public getGameById(id: number): Observable<Game> {
    return this.http
      .get<IJsonObject>(this.gameApiPath + id)
      .pipe(map((data) => Deserialize(data, () => Game)));
  }
}
