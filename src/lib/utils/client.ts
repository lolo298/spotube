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
