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
		const cookiePrefs = cookies.get('preferences', {
			decode: (value) => JSON.parse(decodeURIComponent(value))
		}) as unknown as UserPreferences;

		return json({
			user,
			preferences: {
				...preferences,
				theme: preferences?.theme || cookiePrefs?.theme || 'light'
			}
		});
	} catch (e) {
		console.log(e);
		throw error(401, 'session not found');
	}
};
