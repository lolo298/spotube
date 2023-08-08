export function isSession(res: SessionResponse): res is Session {
  return (res as Session).access_token !== undefined;
}