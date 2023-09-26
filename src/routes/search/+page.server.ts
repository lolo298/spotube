import { getSession, getSpotifyToken } from '$lib/utils/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session');
	if (sessionId === undefined) {
		return {};
	}

	const session = await getSession(sessionId);

	const spotify = await getSpotifyToken(session.userId);

	// get trending tracks (see: https://charts.spotify.com/home)
	const res = await fetch(
		'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=long_term',
		{
			headers: {
				Authorization: `Bearer ${spotify.access_token}`
			}
		}
	);
	const data = await res.json();
	return {
		tracks: data
	};
};
