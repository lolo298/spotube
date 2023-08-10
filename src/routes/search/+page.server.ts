import { getSession } from '$lib/redis';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const sessionId = cookies.get('session');
	if (sessionId === undefined) {
		return {};
	}

	const session = await getSession(sessionId);

	if (!session) {
		return {};
	}
	// get trending tracks (see: https://charts.spotify.com/home)
	const res = await fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
		headers: {
			Authorization: `Bearer ${session.access_token}`
		}
	});

	const data = await res.json();

	return {
		test: data
	};
};
