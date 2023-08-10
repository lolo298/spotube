// /api/auth/me

import { getSession } from '$lib/redis';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session');
	if (sessionId === undefined) {
		throw error(401, 'session not found');
	}
	const session = await getSession(sessionId);

	if (!session) {
		throw error(401, 'session not found');
	}

	if (session.provider == 'spotify') {
		const res = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${session.access_token}`
			}
		});
		const data = await res.json();
		return json(data);
	}

	throw error(501, 'Not implemented');
};
