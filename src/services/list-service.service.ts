import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  private http = inject(HttpClient);

  private listApiPath = environment.apiPath + 'game_list/';

  constructor() {}

  public createList(list_name: string, id_list: number[]): Observable<void> {
    const body = {
      name: list_name,
      idList: id_list,
    };
    return this.http.post<void>(this.listApiPath + 'new', body);
  }
}
