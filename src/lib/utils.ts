import { omit } from 'lodash';
import prisma from './prisma';
import redis from '$lib/redis';

export function isSpotifyToken(res: SpotifyTokenResponse): res is SpotifyToken {
	return (res as SpotifyToken).access_token !== undefined;
}

export async function getUser(session: Session) {
	let user: (User & { password: string }) | null;
	try {
		console.log(session)
		user = await prisma.user.findUnique({
			where: {
				id: session?.userId
			},
			include: {
				Images: true
			}
		});
		console.log(user);
	} catch (e) {
		console.error(e);
		return null;
	}
	const excluded = omit(user, ['password']);
	return excluded;
}

export async function getSession(id: string): Promise<Session> {
	const session = await redis.get(`session:${id}`);
	if (session === null) {
		throw new Error('Session not found');
	}
	return JSON.parse(session);
}

export async function getSpotifyToken(id: string): Promise<SpotifyToken> {
	const token = await redis.get(`spotify:${id}`);
	if (token === null) {
		throw new Error('Spotify token not found');
	}
	return JSON.parse(token);
}

export function asyncDebounce<T extends unknown[], U>(
	callback: callback<T, U>,
	wait: number
): callback<T, U> {
	let timeout: number | NodeJS.Timeout;
	return (...args: T) => {
		clearTimeout(timeout);
		return new Promise((resolve) => {
			timeout = setTimeout(() => {
				resolve(callback(...args));
			}, wait);
		});
	};
}

type callback<T extends unknown[], U> = (...args: T) => Promise<U | undefined>;

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
