import { omit } from 'lodash';
import prisma from '$lib/server/prisma';
import redis from '$lib/server/redis';
import { accountType } from '@prisma/client';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';

export function isSpotifyToken(res: SpotifyTokenResponse): res is SpotifyToken {
	return (res as SpotifyToken).access_token !== undefined;
}

export async function getUser(session: Session) {
	let user: (User & { password: string }) | null;
	try {
		user = await prisma.user.findUnique({
			where: {
				id: session?.userId
			},
			include: {
				Images: true
			}
		});
		if (!user) return null;
	} catch (e) {
		console.error(e);
		return null;
	}
	const excluded = omit(user, ['password']);
	return excluded;
}

export async function getPreferences(userId: string): Promise<UserPreferences | null> {
	const preferences = await redis.get(`preferences:${userId}`);
	if (preferences === null) return null;
	return JSON.parse(preferences);
}

export async function getSession(id: string): Promise<Session> {
	const session = await redis.get(`session:${id}`);
	if (session === null) {
		return {
			id: '',
			userId: ''
		};
	}
	return JSON.parse(session);
}

export async function getSpotifyToken(id: string): Promise<SpotifyToken> {
	const account = await prisma.account.findUnique({
		select: {
			refreshToken: true
		},
		where: {
			userId_type: { userId: id, type: accountType.SPOTIFY }
		}
	});
	if (!account) throw new Error('Spotify account not found');

	const res = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString(
				'base64'
			)}`,
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: account.refreshToken
		})
	});

	return await res.json();
}
