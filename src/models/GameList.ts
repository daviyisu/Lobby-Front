import { autoserializeAs, autoserializeAsArray } from 'dcerialize';

export class GameList {
  /**
   * Game list ID
   */
  id: number;

  /**
   * Name of the list
   */
  name: string;

  /**
   * Array of game IDs from the list
   */
  games_ids: number[];

  constructor(id: number, name: string, games_ids: number[]) {
    this.id = id;
    this.name = name;
    this.games_ids = games_ids;
  }
}

export class GameListDTO {
  /**
   * Game list ID
   */
  @autoserializeAs(() => Number) userId: number;

  /**
   * Name of the list
   */
  @autoserializeAs(() => String) createdBy: string;

  // /**
  //  * Array of game IDs from the list
  //  */
  // @autoserializeAsArray(() => GameList) gameLists: GameList[];

  constructor(userId: number, createdBy: string) {
    this.userId = userId;
    this.createdBy = createdBy;
  }
}
