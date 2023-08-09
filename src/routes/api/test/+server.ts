import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '$env/static/private';
import redis from '$lib/redis';
import { v4 as uuid } from 'uuid';

export async function GET() {
  const data = Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64');

  return new Response(JSON.stringify({data: data}));
}