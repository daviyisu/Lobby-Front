import { autoserializeAs, autoserializeAsArray } from 'dcerialize';
import {Game} from "./game";
import {User} from "./user";


export class GameList {

  @autoserializeAs(() => Number) id: number;

  @autoserializeAs(() => String) name: string;

  @autoserializeAs(() => User) user: User;

  @autoserializeAsArray(() => Game) games: Game[];

  constructor(id: number, name: string, user: User, games: Game[] = []) {
    this.id = id;
    this.name = name;
    this.user = user;
    this.games = games;
  }
}
