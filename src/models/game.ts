import { autoserializeAs } from 'dcerialize';

export class Game {
  /**
   * User ID
   */
  @autoserializeAs(() => Number) id: Number;

  /**
   * Game name
   */
  @autoserializeAs(() => String) name: string;

  /**
   * Summary of the game
   */
  @autoserializeAs(() => String) summary: string;

  /**
   * Storyline of the game
   */
  @autoserializeAs(() => String) storyline: string;

  /**
   * Rating based on external critic scores
   */
  @autoserializeAs(() => Number) aggregatedRating: number;

  /**
   * ID of the parent game if any
   */
  @autoserializeAs(() => Number) parentGame: number;

  /**
   * First release date of the game
   */
  @autoserializeAs(() => String) firstReleaseDate: string;

  /**
   * Array of Screenshot IDs
   */
  @autoserializeAs(() => String) screenshots: string;

  /**
   * Array of Screenshot IDs
   */
  @autoserializeAs(() => String) videos: string;

  /**
   * ID of the cover of the game
   */
  @autoserializeAs(() => Number) cover: number;

  /**
   * Array of Involved Company IDs
   */
  @autoserializeAs(() => String) involvedCompanies: string;

  /**
   * Array of Artwork IDs
   */
  @autoserializeAs(() => String) artworks: string;

  constructor(
    id: number,
    name: string,
    summary: string,
    storyline: string,
    aggregatedRating: number,
    parentGame: number,
    firstReleaseDate: string,
    screenshots: string,
    videos: string,
    cover: number,
    involvedCompanies: string,
    artworks: string,
  ) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.storyline = storyline;
    this.aggregatedRating = aggregatedRating;
    this.parentGame = parentGame;
    this.firstReleaseDate = firstReleaseDate;
    this.screenshots = screenshots;
    this.videos = videos;
    this.cover = cover;
    this.involvedCompanies = involvedCompanies;
    this.artworks = artworks;
  }
}
