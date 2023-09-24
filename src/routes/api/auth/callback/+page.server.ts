import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { queryString } from '$lib';
import { error, json, redirect, type ServerLoad } from '@sveltejs/kit';
import { v4 as uuid } from 'uuid';
import redis from '$lib/redis';
import { getSession, isSpotifyToken } from '$lib/utils/server';
import { writeFileSync } from 'fs';
import prisma from '$lib/prisma';

export const ssr = false;

export const load: ServerLoad = async ({ url, cookies, fetch, locals }) => {
	const code = url.searchParams.get('code') || '';
	const state = url.searchParams.get('state') || null;
	const redirect_uri = `${url.origin}/api/auth/callback`;

	writeFileSync('test.json', JSON.stringify({ code, state, redirect_uri }));

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
	const data: SpotifyToken = await res.json();

	if (!isSpotifyToken(data)) {
		return {
			success: false,
			message: 'session not found'
		};
	}

	data.expires_at = Date.now() + data.expires_in * 1000;

	prisma.user.update({
		where: {
			id: locals.user.id
		},
		data: {
			Accounts: {
				create: {
					type: 'SPOTIFY',
					refreshToken: data.refresh_token
				}
			}
		}
	});

	const destination = cookies.get('redirect') || '/';
	cookies.delete('redirect');
	return {
		success: true,
		message: 'Login successful',
		destination
	};
};
