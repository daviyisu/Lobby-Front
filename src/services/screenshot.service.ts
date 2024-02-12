import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Screenshot } from '../models/screenshot';

@Injectable({
  providedIn: 'root',
})
export class ScreenshotService {
  private screenshotsApiPath = 'http://localhost:8080/screenshots/';

  constructor(private http: HttpClient) {}

  public getScreenshotsByGame(gameId: number): Observable<Screenshot[]> {
    return this.http.get<Screenshot[]>(this.screenshotsApiPath + gameId);
  }
}
