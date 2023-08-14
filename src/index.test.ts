import { asyncDebounce, isSession } from '$lib/utils';
import { delay } from '$lib/utils';
import { describe, it, expect, vi } from 'vitest';

describe('asyncDebounce', () => {
	it('should debounce', async () => {
		const fn = vi.fn();
		const debounced = asyncDebounce(fn, 100);
		debounced();
		debounced();
		debounced();
		await delay(100);
		debounced();
		debounced();
		await delay(100);
		expect(fn.mock.calls.length).toBe(2);
	});

	it('should debounce with arguments', async () => {
		const fn = vi.fn();
		const debounced = asyncDebounce(fn, 100);
		debounced(1);
		debounced(2);
		debounced(3);
		await delay(100);
		debounced(4);
		debounced(5);
		await delay(100);
		expect(fn.mock.calls.length).toBe(2);
		expect(fn.mock.calls[0][0]).toBe(3);
		expect(fn.mock.calls[1][0]).toBe(5);
	});

	it('should debounce with arguments and return value', async () => {
		const fn = vi.fn().mockImplementation(async (x: number) => x * 2);
		const debounced = asyncDebounce(fn, 100);
		debounced(1);
		debounced(2);
		debounced(3);
		await delay(100);
		debounced(4);
		debounced(5);
		await delay(100);
		expect(fn.mock.calls.length).toBe(2);
		expect(fn.mock.calls[0][0]).toBe(3);
		expect(fn.mock.calls[1][0]).toBe(5);

		expect(fn.mock.results[0].value).toBe(6);
		expect(fn.mock.results[1].value).toBe(10);
	});
});

describe('delay', () => {
	it('should delay', async () => {
		const fn = vi.fn();
		const start = Date.now();
		await delay(100);
		const end = Date.now();
		fn();
		expect(fn.mock.calls.length).toBe(1);
		expect(end - start).toBeGreaterThanOrEqual(100);
	});
});

describe('isSession', () => {
	it('should return true if access_token is defined', () => {
		const session: SessionResponse = {
			userId: '123',
			access_token: '123',
			token_type: 'Bearer',
			expires_in: 3600,
			expires_at: Date.now() + 3600 * 1000,
			provider: 'spotify',
			scope: 'user-read-private user-read-email',
			refresh_token: '123'
		};
		expect(isSession(session)).toBe(true);
	});

	it('should return false if response is an error type', () => {
		const session: SessionResponse = {
			error: 'invalid_grant',
			error_description: 'Invalid authorization code'
		};
		expect(isSession(session)).toBe(false);
	});
});
