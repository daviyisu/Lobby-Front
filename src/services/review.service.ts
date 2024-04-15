import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviewApiPath = environment.apiPath + 'review/';

  constructor(private http: HttpClient) {}

  /**
   * Method to create a new review
   */
  public addReview(
    gameId: number,
    rating: number,
    reviewText: string,
  ): Observable<void> {
    const body = {
      gameId: gameId,
      rating: rating,
      review_text: reviewText,
    };

    return this.http.post<void>(this.reviewApiPath + 'addreview', body);
  }
}
