import { redirect } from '@sveltejs/kit';
import { SPOTIFY_CLIENT_ID } from '$env/static/private';
import { queryString } from '$lib';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const state =
	Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	const scope = 'user-read-private user-read-email user-top-read';
	const redirect_uri = `${url.origin}/api/auth/callback`;

	const destination = url.searchParams.get('redirect') || '/';

	cookies.set('redirect', destination);

	const query = queryString.stringify({
		response_type: 'code',
		client_id: SPOTIFY_CLIENT_ID,
		scope: scope,
		redirect_uri: redirect_uri,
		state: state
	});

	throw redirect(307, `https://accounts.spotify.com/authorize?${query}`);
};
