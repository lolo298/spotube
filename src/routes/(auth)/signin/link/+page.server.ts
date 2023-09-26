import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';
import { accountType } from '@prisma/client';

export const load = (async ({ locals }) => {
	const linkedAccounts = await prisma.account.findMany({
		where: {
			userId: locals.user.id
		}
	});

	return {
		linkedAccounts,
		accountType
	};
}) satisfies PageServerLoad;
