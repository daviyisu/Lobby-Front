import { autoserializeAs } from 'dcerialize';

export class Image {
  /**
   * Image id to construct an IGDB image link
   */
  @autoserializeAs(() => String) imageId: string;

  /**
   * Image id to construct an IGDB image link
   */
  @autoserializeAs(() => Number) width: number;

  /**
   * Image id to construct an IGDB image link
   */
  @autoserializeAs(() => Number) height: number;

  /**
   * Image id to construct an IGDB image link
   */
  @autoserializeAs(() => Number) game: number;

  constructor(width: number, height: number, imageId: string, game: number) {
    this.width = width;
    this.height = height;
    this.imageId = imageId;
    this.game = game;
  }
}
