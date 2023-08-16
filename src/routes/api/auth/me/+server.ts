import { getSession, getUser } from '$lib/utils/server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session') || '';

	try {
		const session = await getSession(sessionId);
		const user = await getUser(session);
		return json(user);
	} catch {
		throw error(401, 'session not found');
	}
};
