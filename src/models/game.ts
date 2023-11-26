import {autoserializeAs} from "dcerialize";

export class Game {
  /**
   * Game name
   */
  @autoserializeAs(() => String) name: string;

  /**
   * IGDB ID of the cover
   */
  @autoserializeAs(() => String) coverArtId: string;

  /**
   * Game rating
   */
  @autoserializeAs(() => String) rating: string;

  /**
   * Company name
   */
  @autoserializeAs(() => String) company: string;

  /**
   * Release date of the game
   */
  @autoserializeAs(() => Date) releaseDate: Date;

  /**
   * Platforms in which the game is available
   */
  @autoserializeAs(() => String) platforms: string;

  constructor(
              name: string,
              coverArtId: string,
              rating: string,
              company: string,
              releaseDate: Date,
              platforms: string) {
    this.name = name;
    this.coverArtId = coverArtId;
    this.rating = rating;
    this.company = company;
    this.releaseDate = releaseDate;
    this.platforms = platforms;
  }
}
