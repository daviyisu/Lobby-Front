import { autoserializeAs } from 'dcerialize';

export class User {
  /**
   * User id
   */
  @autoserializeAs(() => Number) id: Number;

  /**
   * User name
   */
  @autoserializeAs(() => String) username: string;

  /**
   * User Steam ID
   */
  // @autoserializeAs(() => Number) steamId: Number;

  constructor(id: number, username: string) {
    this.id = id;
    this.username = username;
  }
}
