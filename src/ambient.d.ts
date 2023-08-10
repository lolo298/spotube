declare interface Session {
	access_token: string;
	token_type: string;
	expires_in: number;
	expires_at: number;
	refresh_token: string;
	scope: string;
	provider: 'youtube' | 'spotify';
}

declare interface SpotifyError {
	error: string;
	error_description: string;
}

declare type SessionResponse = Session | SpotifyError;

declare interface User {
	display_name: string;
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: [];
	type: string;
	uri: string;
	followers: {
		href: null;
		total: number;
	};
	country: string;
	product: string;
	explicit_content: {
		filter_enabled: boolean;
		filter_locked: boolean;
	};
	email: string;
}
