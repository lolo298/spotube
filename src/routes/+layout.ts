import type { LayoutLoad } from './$types';

interface me {
	user: User;
	preferences: UserPreferences;
}

export const load = (async ({ fetch }) => {
	async function getData() {
		const res = await fetch('/api/auth/me');
		if (!res.ok) {
			throw new Error('User not found');
		}

		return await res.json();
	}

	const data = await getData();

	return {
		user: data.user,
		preferences: data.preferences
	};
}) satisfies LayoutLoad;
