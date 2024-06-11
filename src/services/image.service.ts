import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Image } from '../models/image';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  private screenshotsApiPath = environment.apiPath + 'image/screenshot/';

  constructor(private http: HttpClient) {}

  public getScreenshotsByGame(gameId: number): Observable<Image[]> {
    return this.http.get<Image[]>(this.screenshotsApiPath + gameId);
  }

  /**
   * Method to build the IGDB image with the image id
   */
  getIgdbImage(imageId: string | undefined): string {
    let igdbImage = 'assets/img/gamelist_placeholder.png'
    return imageId? `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`: igdbImage;
  }
}
