import { z } from 'zod';

export const signinSchema = z
	.object({
		username: z.string().min(3).max(20).trim(),
		email: z.string().email(),
		password: z.string().min(8).max(100),
		passwordConfirm: z.string().min(8).max(100)
	})
	.superRefine(({ password, passwordConfirm }, ctx) => {
		if (password !== passwordConfirm) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords must match',
				path: ['passwordConfirm']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Passwords must match',
				path: ['password']
			});
		}
	});
