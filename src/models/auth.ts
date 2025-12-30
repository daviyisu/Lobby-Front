import { autoserializeAs } from 'dcerialize';

export interface UsernamePassRequest {
  username: string;
  password: string;
  confirmPassword?: string;
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
