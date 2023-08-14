import prisma from '$lib/prisma';
import type { Actions } from './$types';
import { v4 as uuid } from 'uuid';

import { scryptSync, timingSafeEqual } from 'crypto';
import redis from '$lib/redis';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const login = form.get('username')?.toString();
		const password = form.get('password')?.toString();

		if (!login || !password) {
			return { success: false, message: 'Invalid form data' };
		}

		const re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
		let user;

		if (re.test(login)) {
			user = await prisma.user.findUnique({
				where: {
					email: login
				}
			});
		} else {
			user = await prisma.user.findUnique({
				where: {
					name: login
				}
			});
		}

		if (user === null) {
			return { success: false, message: 'User not found' };
		}
		const [salt, pass] = user.password.split(':');
		const key = Buffer.from(pass, 'hex');
		const hashedBuffer = scryptSync(password, salt, 64);

		if (!timingSafeEqual(key, hashedBuffer)) {
			return { success: false, message: 'Invalid password' };
		}

		const sessionId = uuid();

		const session = {
			userId: user.id
		};

		redis.set(`session:${sessionId}`, JSON.stringify(session), { EX: 60 * 60 * 24 * 7 });

		cookies.set('session', sessionId);

		return {
			success: true,
			message: 'Login successful'
		};
	}
};
