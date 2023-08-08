import { queryString } from '$lib';
import redis from '$lib/redis';
import { isSession } from '$lib/utils';

export async function handle({ event, resolve }) {
	const response = await resolve(event);

	if (event.url.pathname.startsWith('/api')) {
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
				status: 401
			});
		}

		if (session.expires_at - Date.now() < 60) {
			//refresh token

			const refreshUrl = 'https://accounts.spotify.com/api/token';
			const refreshForm = {
				grant_type: 'refresh_token',
				refresh_token: session.refresh_token
			};

			const refreshOptions = {
				method: 'POST',
				body: queryString.stringify(refreshForm),
				headers: {
					contentType: 'application/x-www-form-urlencoded'
				}
			};

      const refreshRes = await fetch(refreshUrl, refreshOptions);
      const refreshData: SessionResponse = await refreshRes.json();

      if(!isSession(refreshData)){
        return new Response(JSON.stringify({ error: 'session not found' }), {
          status: 401
        });
      }

      refreshData.expires_at = Date.now() + refreshData.expires_in;

      await redis.set(`session:${event.cookies.get('session')}`, JSON.stringify(refreshData), {
        EX: 60 * 60 * 24 * 7 // 1 week
      });

		}
	}

	return response;
}
