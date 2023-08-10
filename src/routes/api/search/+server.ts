import { getSession } from '$lib/redis';

export async function GET({ cookies, url }) {
	const sessionId = cookies.get('session');
	const query = url.searchParams.get('q');
  const page = url.searchParams.get('page');
  const offset = page === '0' || !page ? 1 : parseInt(page);


  
	if (sessionId === undefined) {
		return new Response(
			JSON.stringify({
				error: 'session not found'
			}),
			{
				status: 401
			}
		);
	}

	const session = await getSession(sessionId);

	if (!session) {
		return new Response(
			JSON.stringify({
				error: 'session not found'
			}),
			{
				status: 401
			}
		);
	}

	const res = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=track&limit=10&offset=${offset * 10 - 10}`, {
		headers: {
			Authorization: `Bearer ${session.access_token}`
		}
	});
	const data: SpotifyTracksSearch = await res.json();
	return new Response(JSON.stringify(data), {
		status: 200
	});
}
