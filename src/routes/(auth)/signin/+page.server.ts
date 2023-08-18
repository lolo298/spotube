import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { v4 as uuid } from 'uuid';

import { scryptSync, randomBytes } from 'crypto';
import redis from '$lib/redis';
import { signinSchema } from '$lib/forms';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(await request.formData());
		const result = signinSchema.safeParse(form);

		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();
			const { _password, _passwordConfirm, ...rest } = form;
			return {
				data: rest,
				errors
			};
		}

		const data = result.data;

		const salt = randomBytes(16).toString('hex');
		const hashedBuffer = scryptSync(data.password, salt, 64);
		const hashedPassword = `${salt}:${hashedBuffer.toString('hex')}`;
		let user = null;
		try {
			user = await prisma.user.create({
				data: {
					name: data.username,
					email: data.email,
					password: hashedPassword
				}
			});
		} catch (e) {
			return fail(400, {
				success: false,
				email: data.email,
				username: data.username,
				message: 'User already exists'
			});
		}
		const sessionId = uuid();
		const session: Session = {
			userId: user?.id,
			id: sessionId
		};

		redis.set(`session:${sessionId}`, JSON.stringify(session), { EX: 60 * 60 * 24 * 7 });
		cookies.set('session', sessionId);

		return { success: true, message: 'Registration successful' };
	}
};
