import { autoserializeAs } from 'dcerialize';

export class SteamUser {
  @autoserializeAs(() => String) steamId: string;

  /**
   * Display name on Steam
   */
  @autoserializeAs(() => String) username: string;

  /**
   * URL of the avatar of the Steam account
   */
  @autoserializeAs(() => String) avatar: string;

  /**
   * Whether the account is public or private (-1 private, 3 public)
   */
  @autoserializeAs(() => Number) communityVisibilityState: number;

  constructor(
    steamId: string,
    username: string,
    avatar: string,
    communityVisibilityState: number,
  ) {
    this.steamId = steamId;
    this.username = username;
    this.avatar = avatar;
    this.communityVisibilityState = communityVisibilityState;
  }
}
