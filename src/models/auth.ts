import { autoserializeAs } from 'dcerialize';

export interface UsernamePassRequest {
  username: string;
  password: string;
}

export class AuthResponse {
  /**
   * JWT from successful authentication
   */
  @autoserializeAs(() => String) token: string;

  constructor(token: string) {
    this.token = token;
  }
}
