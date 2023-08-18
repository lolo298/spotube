import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { isUserPreferences } from '$lib';
import redis from '$lib/redis';

export const POST: RequestHandler = async ({ request, locals }) => {
	const body = await request.json();

	if (!isUserPreferences(body)) {
		throw error(400, 'invalid request body');
	}

	const oldPreferences = locals.preferences;

	const newPreferences = {
		...oldPreferences,
		...body
	};

	redis.set(`preferences:${locals.user.id}`, JSON.stringify(newPreferences));

	return json({ success: true });
};
