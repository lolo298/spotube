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
		href: string | null;
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


declare interface SpotifyTracksSearch {
	tracks: {
		href: string;
		items: SpotifyTrack[];
		limit: number;
		next: string | null;
		offset: number;
		previous: string | null;
		total: number;
	};
}

declare interface SpotifyTrack {
	album: SpotifyAlbum;
	artists: SpotifyArtist[];
	available_markets: string[];
	disc_number: number;
	duration_ms: number;
	explicit: boolean;
	external_ids: {
		isrc: string;
	};
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	is_local: boolean;
	name: string;
	popularity: number;
	preview_url: string;
	track_number: number;
	type: string;
	uri: string;
}

declare interface SpotifyAlbum {
	album_type: string;
	artists: SpotifyArtist[];
	available_markets: string[];
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	images: SpotifyImage[];
	name: string;
	release_date: string;
	release_date_precision: string;
	total_tracks: number;
	type: string;
	uri: string;
}

declare interface SpotifyArtist {
	external_urls: {
		spotify: string;
	};
	href: string;
	id: string;
	name: string;
	type: string;
	uri: string;
}

declare interface SpotifyImage {
	height: number;
	url: string;
	width: number;
}

