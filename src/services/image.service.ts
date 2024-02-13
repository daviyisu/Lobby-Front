import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { Deserialize, IJsonObject } from 'dcerialize';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private screenshotsApiPath = 'http://localhost:8080/image/screenshot/';
  private coverApiPath = 'http://localhost:8080/image/cover/';

  constructor(private http: HttpClient) {}

  public getScreenshotsByGame(gameId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.screenshotsApiPath + gameId);
  }

  public getGameCover(gameId: number): Observable<Image> {
    return this.http
      .get<IJsonObject>(this.coverApiPath + gameId)
      .pipe(map((response) => Deserialize(response, () => Image)));
  }
}
