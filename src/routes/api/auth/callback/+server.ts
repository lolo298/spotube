import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { queryString } from '$lib';
import { error, redirect } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import redis from '$lib/redis';
import { isSession } from '$lib/utils';
import type { RequestHandler } from './$types';

const redirect_uri = 'http://localhost:5173/api/auth/callback';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const code = url.searchParams.get('code') || '';
	const state = url.searchParams.get('state') || null;

	if (state === null) {
		throw redirect(307, `/#${queryString.stringify({ error: 'state_mismatch' })}`);
	}
	const authOptions = {
		url: 'https://accounts.spotify.com/api/token',
		form: {
			grant_type: 'authorization_code',
			code: code,
			redirect_uri: redirect_uri,
			client_secret: SPOTIFY_CLIENT_SECRET,
			client_id: SPOTIFY_CLIENT_ID
		},
		headers: {
			Authorization:
				'Basic ' + Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64')
		},
		json: true
	};
	const res = await fetch(authOptions.url, {
		method: 'POST',
		body: queryString.stringify(authOptions.form),
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	const data: Session = await res.json();

	if (!isSession(data)) {
		throw error(401, 'session not found');
	}

	data.expires_at = Date.now() + data.expires_in * 1000;

	data.provider = 'spotify';

	const userId = uuid();

	await redis.set(`session:${userId}`, JSON.stringify(data), {
		EX: 60 * 60 * 24 * 7 // 1 week
	});

	cookies.set('session', userId, {
		path: '/',
		maxAge: 60 * 60 * 24 * 7 // 1 week
	});

	const destination = cookies.get('redirect') || '/';
	cookies.delete('redirect');
	throw redirect(307, destination);
};
