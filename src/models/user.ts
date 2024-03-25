import { Game } from './game';
import { autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class User {
  /**
   * User name
   */
  @autoserializeAs(() => String) username: string;

  /**
   * User password
   */
  @autoserializeAs(() => String) password: string;

  /**
   * User Steam ID
   */
  @autoserializeAs(() => Number) steamId: Number;

  constructor(username: string, steamId: number, password: string) {
    this.username = username;
    this.password = password;
    this.steamId = steamId;
  }
}
