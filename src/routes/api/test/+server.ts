import redis from '$lib/redis';
import { v4 as uuid } from 'uuid';

export async function GET() {
  const data = uuid();
  redis.set(`session:${data}`, JSON.stringify({data: data}), {
    EX: 10
  });
  return new Response(JSON.stringify({data: data}));
}