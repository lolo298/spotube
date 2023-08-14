import type { RequestHandler } from './$types';
import redis from '$lib/redis';
import { redirect } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session');

	if (sessionId === undefined) {
		throw redirect(307, '/');
	}

	await redis.del(`session:${sessionId}`);
	cookies.delete('session');

	throw redirect(307, '/');
};
