import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://localhost:8080/games/';

  constructor(private http: HttpClient) { }


}
