import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { queryString } from '$lib';
import redis from '$lib/redis';
import { getUser, isSpotifyToken, getSession } from '$lib/utils';
import { error, redirect, type Handle } from '@sveltejs/kit';

const pathExcluded = ['/api/auth/callback', '/api/auth/spot'];
const pathNeedsAuth = ['/search'];

export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get('session') || '';

	try {
		const session = await getSession(sessionId);
		const user = await getUser(session);
		if (!user) {
			throw error(401, 'session not found');
		}
		event.locals.user = user;
	} catch{
		//empty
	}


	const response = await resolve(event);

	// if (event.url.pathname.startsWith('/api') && !pathExcluded.includes(event.url.pathname)) {
	// 	if (session === null) {
	// 		throw error(401, 'session not found');
	// 	}
	// 	response.headers.set('x-expires-at', session.expires_at.toString());
	// 	response.headers.set('x-expires-in', (session.expires_at - Date.now()).toString());

	// 	if (session.expires_at - Date.now() < 60 * 1000) {
	// 		//refresh token

	// 		const refreshUrl = 'https://accounts.spotify.com/api/token';
	// 		const refreshForm = {
	// 			grant_type: 'refresh_token',
	// 			refresh_token: session.refresh_token
	// 		};

	// 		const refreshOptions = {
	// 			method: 'POST',
	// 			body: queryString.stringify(refreshForm),
	// 			headers: {
	// 				'Content-Type': 'application/x-www-form-urlencoded',
	// 				Authorization:
	// 					'Basic ' +
	// 					Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
	// 			}
	// 		};

	// 		const refreshRes = await fetch(refreshUrl, refreshOptions);
	// 		const refreshData: SessionResponse = await refreshRes.json();
	// 		if (!isSession(refreshData)) {
	// 			throw error(401, 'session not found');
	// 		}

	// 		refreshData.expires_at = Date.now() + refreshData.expires_in * 1000;

	// 		await redis.set(`session:${event.cookies.get('session')}`, JSON.stringify(refreshData), {
	// 			EX: 60 * 60 * 24 * 7 // 1 week
	// 		});

	// 		response.headers.set('x-Refreshed-Token', 'true');
	// 	}
	// }

	return response;
};
