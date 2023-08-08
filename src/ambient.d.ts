
declare interface Session {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  scope: string;
}

declare interface SpotifyError {
  error: string;
  error_description: string;
}

declare type SessionResponse = Session | SpotifyError;