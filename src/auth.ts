import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/sveltekit/providers/github';
import {
	GITHUB_ID,
	GITHUB_SECRET,
	GOOGLE_ID,
	GOOGLE_SECRET,
	AUTH_SECRET,
	SPOTIFY_ID,
	SPOTIFY_SECRET
} from '$env/static/private';
import google from '@auth/sveltekit/providers/google';
import spotify from '@auth/sveltekit/providers/spotify';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const { handle, signIn, signOut } = SvelteKitAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		GitHub({
			clientId: GITHUB_ID,
			clientSecret: GITHUB_SECRET
		}),
		google({
			clientId: GOOGLE_ID,
			clientSecret: GOOGLE_SECRET
		}),
		spotify({
			clientId: SPOTIFY_ID,
			clientSecret: SPOTIFY_SECRET
		})
	],
	secret: AUTH_SECRET,
	trustHost: true
});
