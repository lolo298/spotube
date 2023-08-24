import { omit } from 'lodash';
import prisma from '$lib/prisma';
import redis from '$lib/redis';

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
	} catch (e) {
		console.error(e);
		return {
			id: '0',
			name: 'Guest',
			Images: [
				{
					height: 10,
					width: 10,
					url: '/user.jpg'
				}
			],
			createdAt: new Date(),
			updatedAt: new Date(),
			email: 'guest@example.com'
		};
	}
	const excluded = omit(user, ['password']);
	return excluded;
}

export async function getPreferences(userId: string): Promise<UserPreferences | null> {
	// console.trace('getPreferences: ', userId);
	const preferences = await redis.get(`preferences:${userId}`);
	if (preferences === null) return null;
	return JSON.parse(preferences);
}

export async function getSession(id: string): Promise<Session> {
	const session = await redis.get(`session:${id}`);
	if (session === null) {
		return {
			id: '0',
			userId: '0'
		};
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
