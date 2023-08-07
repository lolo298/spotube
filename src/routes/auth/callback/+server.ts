import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from "$env/static/private";
import { queryString } from "$lib";
import { redirect } from "@sveltejs/kit";
const redirect_uri = 'http://localhost:5173/auth/callback';

/** @type {import('./$types').RequestHandler} */
export async function GET({ url }) {
  const code = url.searchParams.get('code') || null;
  const state = url.searchParams.get('state') || null;

  if (state === null) {
    redirect(307, '/#' +
      queryString.stringify({
        error: 'state_mismatch'
      }));
  } else {
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        // code: code,
        // redirect_uri: redirect_uri,
        // client_id: SPOTIFY_CLIENT_ID,
        // client_secret: SPOTIFY_CLIENT_SECRET,
        // grant_type: 'client_credentials'
        "grant_type":    "authorization_code",
        "code":          code,
        "redirect_uri":  redirect_uri,
        "client_secret": SPOTIFY_CLIENT_SECRET,
        "client_id":     SPOTIFY_CLIENT_ID,
      },
      headers: {
        'Authorization': 'Basic ' + (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
      },
      json: true
    };
    const res = await fetch(authOptions.url, {
      method: 'POST',
      body: queryString.stringify(authOptions.form),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    const data = await res.json();
    console.log(data)
    return new Response(JSON.stringify(data));
  }
}