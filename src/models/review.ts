import { autoserializeAs } from 'dcerialize';

export class Review {
  /**
   * Review ID
   */
  @autoserializeAs(() => Number) id: number;

  /**
   * User ID
   */
  @autoserializeAs(() => Number) userId: number;

  /**
   * Game ID
   */
  @autoserializeAs(() => Number) gameId: number;

  /**
   * Review text
   */
  @autoserializeAs(() => String) review_text: string;

  /**
   * Review summary
   */
  @autoserializeAs(() => String) summary: string;

  /**
   * Review likes
   */
  @autoserializeAs(() => Number) likes: number;

  /**
   * Review rating
   */
  @autoserializeAs(() => Number) rating: number;

  /**
   * Review creation date
   */
  @autoserializeAs(() => Date) createdAt: Date;

  constructor(
    id: number,
    userId: number,
    gameId: number,
    review_text: string,
    summary: string,
    likes: number,
    rating: number,
    createdAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.gameId = gameId;
    this.review_text = review_text;
    this.summary = summary;
    this.likes = likes;
    this.rating = rating;
    this.createdAt = createdAt;
  }
}
