import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import { queryString } from '$lib';
import redis from '$lib/redis';
import { isSession } from '$lib/utils';
import { redirect } from '@sveltejs/kit';

const pathExcluded = ['/api/auth/callback', '/api/auth/spot'];
const pathNeedsAuth = ['/search'];

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	if (event.url.pathname.startsWith('/api') && !pathExcluded.includes(event.url.pathname)) {
		const res = await redis.get(`session:${event.cookies.get('session')}`);
		if (res === null) {
			return new Response(JSON.stringify({ error: 'session not found' }), {
				status: 401
			});
		}
		const session: SessionResponse = await JSON.parse(res);

		if (!isSession(session)) {
			return new Response(JSON.stringify({ error: 'session not found' }), {
				status: 401
			});
		}

		if (session.expires_at < Date.now()) {
			return new Response(JSON.stringify({ error: 'session expired' }), {
				status: 401,
			});
		}

		if (session.expires_at - Date.now() < (60 * 1000)) {
			//refresh token

			console.log(session.refresh_token)

			const refreshUrl = 'https://accounts.spotify.com/api/token';
			const refreshForm = {
				grant_type: 'refresh_token',
				refresh_token: session.refresh_token
			};

			const refreshOptions = {
				method: 'POST',
				body: queryString.stringify(refreshForm),
				headers: {
					"Content-Type": 'application/x-www-form-urlencoded',
					"Authorization": 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
				}
			};

      const refreshRes = await fetch(refreshUrl, refreshOptions);
      const refreshData: SessionResponse = await refreshRes.json();

      if(!isSession(refreshData)){
        return new Response(JSON.stringify({ error: 'session not found' }), {
          status: 401
        });
      }

      refreshData.expires_at = Date.now() + (refreshData.expires_in * 1000);

      await redis.set(`session:${event.cookies.get('session')}`, JSON.stringify(refreshData), {
        EX: 60 * 60 * 24 * 7 // 1 week
      });

			response.headers.set('x-Refreshed-Token', 'true')

		}
	}

	if (pathNeedsAuth.includes(event.url.pathname) && await redis.get(`session:${event.cookies.get('session')}`) === null) {
		return new Response('Unauthorized', {
			status: 302,
			headers: {
				Location: '/api/auth/spot?redirect=' + encodeURIComponent(event.url.pathname + event.url.search),
			}
		});
	}

	return response;
}
