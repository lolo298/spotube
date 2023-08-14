import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { v4 as uuid } from 'uuid';

import { scryptSync, randomBytes } from 'crypto';
import redis from '$lib/redis';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const username = form.get('username')?.toString();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();
		const passwordConfirm = form.get('password2')?.toString();

		if (!username || !email || !password || !passwordConfirm) {
			return fail(400, { success: false, email, username, message: 'Invalid form data' });
		}

		if (password !== passwordConfirm) {
			return fail(400, { success: false, email, username, message: 'Passwords do not match' });
		}

		const salt = randomBytes(16).toString('hex');
		const hashedBuffer = scryptSync(password, salt, 64);
		const hashedPassword = `${salt}:${hashedBuffer.toString('hex')}`;
		let user = null;
		try {
			user = await prisma.user.create({
				data: {
					name: username,
					email: email,
					password: hashedPassword
				}
			});
		} catch (e) {
			return fail(400, { success: false, email, username, message: 'User already exists' });
		}
		const sessionId = uuid();
		const session = {
			userId: user?.id
		};

		redis.set(`session:${sessionId}`, JSON.stringify(session), { EX: 60 * 60 * 24 * 7 });
		cookies.set('session', sessionId);

		return { success: true, message: 'Registration successful' };
	}
};
