import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';

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
    summary: string,
  ): Observable<void> {
    const body = {
      gameId: gameId,
      rating: rating,
      review_text: reviewText,
      summary: summary,
    };

    return this.http.post<void>(this.reviewApiPath + 'addreview', body);
  }

  public getReviewsFromGame(gameId: number): Observable<Review[]> {
    return this.http.get<Review[]>(this.reviewApiPath + 'ofgame/' + gameId);
  }
}
