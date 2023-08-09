// /api/auth/me

import redis from "$lib/redis";
import { isSession } from "$lib/utils.js";

export async function GET({ url, cookies }) {
  const sessionId = cookies.get('session');

  if(sessionId === undefined){
    return new Response(JSON.stringify({ error: 'session not found' }), {
      status: 401
    });
  }

  const res = await redis.get(`session:${sessionId}`);

  if(res === null){
    return new Response(JSON.stringify({ error: 'session not found' }), {
      status: 401
    });
  }

  const session: SessionResponse = await JSON.parse(res);

  if(!isSession(session)) {
    return new Response(JSON.stringify({ error: 'session not found' }), {
      status: 401
    });
  }

  if(session.provider == 'spotify') {
    const res = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${session.access_token}`
      }});
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200
    });
    
  }
  

return new Response('Not implemented', {
  status: 501
});

}