import { autoserializeAs } from 'dcerialize';

export class Screenshot {
  /**
   * Image id to construct an IGDB image link
   */
  @autoserializeAs(() => String) imageId: string;

  constructor(imageId: string) {
    this.imageId = imageId;
  }
}
