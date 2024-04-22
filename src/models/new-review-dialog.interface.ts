import { Review } from './review';

export interface NewReviewDialogInterface {
  gameId: number;
  gameName: string;
  review: Review;
}
