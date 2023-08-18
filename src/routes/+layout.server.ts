import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const user = locals.user;
	const preferences = locals.preferences;

	return { user, preferences };
}) satisfies LayoutServerLoad;
