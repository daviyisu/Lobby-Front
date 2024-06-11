import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game';
import { Deserialize, IJsonObject } from 'dcerialize';
import { map } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { CollectionStatusEnum } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private gameApiPath = environment.apiPath + 'game/';

  constructor(private http: HttpClient) {}

  public getGameById(id: number): Observable<Game> {
    return this.http
      .get<IJsonObject>(this.gameApiPath + id)
      .pipe(map((data) => Deserialize(data, () => Game)));
  }

  public getUserGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameApiPath + 'usergames');
  }

  public getPlatformsFromGame(id: number): Observable<string[]> {
    return this.http.get<string[]>(this.gameApiPath + id + '/platforms');
  }

  public searchGamesByName(name: string): Observable<Game[]> {
    return this.http.get<Game[]>(
      this.gameApiPath + 'searchbyname?query=' + name,
    );
  }

  public addGame(
    status: CollectionStatusEnum,
    gameId: number,
  ): Observable<void> {
    const body = {
      gameId: gameId,
      status: status,
    };

    return this.http.post<void>(this.gameApiPath + 'addgame', body);
  }

  public getStatus(gameId: number): Observable<CollectionStatusEnum> {
    return this.http.get<CollectionStatusEnum>(
      this.gameApiPath + 'owns/' + gameId,
    );
  }

  public getCountUserGames(): Observable<number> {
    return this.http.get<number>(this.gameApiPath + 'collectioncount');
  }

  public getCountCollectionByStatus(
    status: CollectionStatusEnum,
  ): Observable<number> {
    return this.http.get<number>(this.gameApiPath + 'countbystatus/' + status);
  }

  public getRecentAddedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.gameApiPath + 'recentgames');
  }
}
