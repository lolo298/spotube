import prisma from '$lib/server/prisma';
import { ActionFailure, fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { v4 as uuid } from 'uuid';

import { scryptSync, randomBytes } from 'crypto';
import redis from '$lib/server/redis';
import { signinSchema } from '$lib/forms';

type signinActionResult = {
	success: boolean;
	data: {
		email: string;
		username: string;
	};
	errors?: {
		email?: string[];
		username?: string[];
		password?: string[];
		passwordConfirm?: string[];
	};
	message?: string;
};

interface formData {
	email: string;
	username: string;
	password: string;
	passwordConfirm: string;
}

export const actions: Actions = {
	default: async ({
		request,
		cookies
	}): Promise<ActionFailure<signinActionResult> | signinActionResult> => {
		const form = Object.fromEntries(await request.formData());
		const result = signinSchema.safeParse(form);
		if (!result.success) {
			const { fieldErrors: errors } = result.error.flatten();
			const { password, passwordConfirm, ...rest } = form as unknown as formData;
			return fail(400, {
				success: false,
				data: rest,
				errors
			});
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
				data: {
					email: data.email,
					username: data.username
				},
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

		return {
			success: true,
			message: 'Registration successful',
			data: { email: data.email, username: data.username }
		};
	}
};
