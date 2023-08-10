export function isSession(res: SessionResponse): res is Session {
	return (res as Session).access_token !== undefined;
}

export async function getUser(session: Session): Promise<User> {
	const res = await fetch('https://api.spotify.com/v1/me', {
		headers: {
			Authorization: `Bearer ${session.access_token}`
		}
	});
	const data = await res.json();
	return data;
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
