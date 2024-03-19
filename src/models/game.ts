import { autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class Game {
  /**
   * User ID
   */
  @autoserializeAs(() => Number) id: number;

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
  @autoserializeAs(() => Date) firstReleaseDate: Date;

  /**
   * Array of Screenshot IDs
   */
  @autoserializeAsArray(() => Number) screenshots: number[];

  /**
   * Array of Genre IDs
   */
  @autoserializeAsArray(() => Number) genres: number[];

  /**
   * Array of Video IDs
   */
  @autoserializeAsArray(() => Number) videos: number[];

  /**
   * ID of the cover of the game
   */
  @autoserializeAs(() => Number) cover: number;

  /**
   * Array of Involved Company IDs
   */
  @autoserializeAsArray(() => Number) involvedCompanies: number[];

  /**
   * Array of Artwork IDs
   */
  @autoserializeAsArray(() => Number) artworks: number[];

  /**
   * Cover image ID to construct the IGDB image of the cover
   */
  @autoserializeAs(() => String) coverImageId: string;

  constructor(
    id: number,
    name: string,
    summary: string,
    storyline: string,
    aggregatedRating: number,
    parentGame: number,
    firstReleaseDate: Date,
    screenshots: number[],
    genres: number[],
    videos: number[],
    cover: number,
    involvedCompanies: number[],
    artworks: number[],
    coverImageId: string,
  ) {
    this.id = id;
    this.name = name;
    this.summary = summary;
    this.storyline = storyline;
    this.aggregatedRating = aggregatedRating;
    this.parentGame = parentGame;
    this.firstReleaseDate = firstReleaseDate;
    this.screenshots = screenshots;
    this.genres = genres;
    this.videos = videos;
    this.cover = cover;
    this.involvedCompanies = involvedCompanies;
    this.artworks = artworks;
    this.coverImageId = coverImageId;
  }
}
