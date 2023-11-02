export class User {
  id: number;
  username: string;
  steam_id: number;

  constructor(id: number, username: string, steam_id: number) {
    this.id = id;
    this.username = username;
    this.steam_id = steam_id;
  }
}
