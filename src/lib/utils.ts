import { omit } from 'lodash';
import prisma from './prisma';

export function isSession(res: SessionResponse): res is Session {
	return (res as Session).access_token !== undefined;
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
		console.log(user);
	} catch (e) {
		console.error(e);
		return null;
	}
	const excluded = omit(user, ['password']);
	return excluded;
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
