import { writable, type Writable } from 'svelte/store';
import { browser } from '$app/environment';

export const userStore: Writable<User> = writable();

export const userPreferencesStore: Writable<UserPreferences> = writable();
