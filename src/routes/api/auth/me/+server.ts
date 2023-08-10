// /api/auth/me

import { getSession } from '$lib/redis';

export async function GET({ cookies }) {
	const sessionId = cookies.get('session');
	if (sessionId === undefined) {
		return new Response(JSON.stringify({ error: 'session not found' }), {
			status: 401
		});
	}
	const session = await getSession(sessionId);

	if (!session) {
		return new Response(JSON.stringify({ error: 'session not found' }), {
			status: 401
		});
	}

	if (session.provider == 'spotify') {
		const res = await fetch('https://api.spotify.com/v1/me', {
			headers: {
				Authorization: `Bearer ${session.access_token}`
			}
		});
		const data = await res.json();
		return new Response(JSON.stringify(data), {
			status: 200
		});
	}

	return new Response('Not implemented', {
		status: 501
	});
}
