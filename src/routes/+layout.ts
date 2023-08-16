import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	async function getUser(): Promise<User> {
		const res = await fetch('/api/auth/me');

		if (!res.ok) {
			throw new Error('User not found');
		}

		return await res.json();
	}

	return {
		user: await getUser()
	};
}) satisfies LayoutLoad;
