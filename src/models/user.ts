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
   * User avatar url
   */
  @autoserializeAs(() => String) avatar_url: String;

  constructor(id: number, username: string, avatar_url: string) {
    this.id = id;
    this.username = username;
    this.avatar_url = avatar_url;
  }
}
