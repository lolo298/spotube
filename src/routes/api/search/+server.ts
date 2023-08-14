import { getSession, getSpotifyToken } from '$lib/utils';
import { error, json } from '@sveltejs/kit';

export async function GET({ cookies, url }) {
	const sessionId = cookies.get('session');
	const query = url.searchParams.get('q');
	const page = url.searchParams.get('page');
	const offset = page === '0' || !page ? 1 : parseInt(page);

	if (sessionId === undefined) {
		throw error(401, 'session not found');
	}

	const session = await getSession(sessionId);

	const spotify = await getSpotifyToken(session.userId);

	if (!session) {
		throw error(401, 'session not found');
	}

	const res = await fetch(
		`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&offset=${offset * 10 - 10}`,
		{
			headers: {
				Authorization: `Bearer ${spotify.access_token}`
			}
		}
	);
	const data: SpotifyTracksSearch = await res.json();
	return json(data);
}
