import { Game } from './game';
import { autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class User {
  /**
   * User name
   */
  @autoserializeAs(() => String) username: string;

  /**
   * User Steam ID
   */
  @autoserializeAs(() => Number) steamId: Number;

  /**
   * User owned game list
   */
  @autoserializeAsArray(() => Game) gamesOwned: Array<Game>;

  constructor(username: string, steamId: number, gamesOwned: Array<Game>) {
    this.username = username;
    this.steamId = steamId;
    this.gamesOwned = gamesOwned;
  }
}
