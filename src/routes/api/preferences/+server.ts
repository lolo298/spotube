import redis from '$lib/server/redis';
import { getSession } from '$lib/utils/server';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	return new Response();
};

export const POST: RequestHandler = async ({ cookies, request }) => {
	const body = await request.json();

	cookies.set('preferences', JSON.stringify(body), { path: '/' });

	const sessionId = cookies.get('session');

	if (sessionId) {
		const session = await getSession(sessionId);
		redis.set(`preferences:${session.userId}`, JSON.stringify(body));
	}

	return new Response();
};
