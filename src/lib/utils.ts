export function isSession(res: SessionResponse): res is Session {
  return (res as Session).access_token !== undefined;
}

export async function getUser(session: Session): Promise<User> {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      'Authorization': `Bearer ${session.access_token}`
    }
  });
  const data = await res.json();
  return data;
}