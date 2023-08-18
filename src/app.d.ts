// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: User;
			session: Session;
			preferences: UserPreferences;
		}
		interface PageData {
			user: User;
		}
		// interface Platform {}
	}
}

export {};
