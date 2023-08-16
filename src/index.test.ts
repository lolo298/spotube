import { asyncDebounce, delay } from '$lib/utils/client';
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
