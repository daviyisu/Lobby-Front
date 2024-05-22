import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { GameList } from '../models/GameList';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);

  private listApiPath = environment.apiPath + 'game_list/';

  public createList(list_name: string, games: Game[]): Observable<void> {
    const body = {
      name: list_name,
      games: games,
    };
    return this.http.post<void>(this.listApiPath + 'new', body);
  }

  public getUserLists(): Observable<GameList[]> {
    return this.http.get<GameList[]>(this.listApiPath + 'from_user');
  }
}