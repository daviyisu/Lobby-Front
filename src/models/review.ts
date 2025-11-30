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

  /**
   * Username of the user that wrote the review
   */
  @autoserializeAs(() => String) writtenBy: string;

  /**
   * Username of the user that wrote the review
   */
  @autoserializeAs(() => String) userAvatar: string;

  constructor(
    id: number,
    userId: number,
    gameId: number,
    review_text: string,
    summary: string,
    likes: number,
    rating: number,
    createdAt: Date,
    writtenBy: string,
    userAvatar: string,
  ) {
    this.id = id;
    this.userId = userId;
    this.gameId = gameId;
    this.review_text = review_text;
    this.summary = summary;
    this.likes = likes;
    this.rating = rating;
    this.createdAt = createdAt;
    this.writtenBy = writtenBy;
    this.userAvatar = userAvatar;
  }
}
