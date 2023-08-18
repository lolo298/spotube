import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const userStore: Writable<User> = writable();

export const userPreferencesStore: Writable<UserPreferences> = getUserPreferencesStore();

function getUserPreferencesStore(): Writable<UserPreferences> {
	const { subscribe, update } = writable<UserPreferences>();

	let id = '';
	userStore.subscribe((user) => {
		id = user?.id;
	});

	const set = async (pref: UserPreferences) => {
		if (!id) {
			return;
		}
		if (browser) {
			fetch(`/api/auth/preferences`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(pref)
			});
		} else {
			const redis = (await import('$lib/redis')).default;
			redis.set(`preferences:${id}`, JSON.stringify(pref));
		}
		update(() => pref);
	};

	return { subscribe, set, update };
}
