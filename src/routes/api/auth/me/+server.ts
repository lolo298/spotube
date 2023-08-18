import { getPreferences, getSession, getUser } from '$lib/utils/server';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionId = cookies.get('session') || '';

	try {
		const session = await getSession(sessionId);
		const [user, preferences] = await Promise.all([
			getUser(session),
			getPreferences(session.userId)
		]);
		return json({ user, preferences });
	} catch (e) {
		console.log(e);
		throw error(401, 'session not found');
	}
};
