import redis from '$lib/server/redis';

export async function getSpotifyUser(sessionId: string): Promise<SpotifyUser> {
	try {
		const spotifyToken: SpotifyToken = await redis.getJSON(`spotify:${sessionId}`);
		const res = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${spotifyToken.access_token}`
			}
		});
		const spotifyUser: SpotifyUser = await res.json();

		return spotifyUser;
	} catch {
		throw new Error('Spotify user not found');
	}
}
