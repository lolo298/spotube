import type { Load } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getSession } from "$lib/redis";


export const load:PageServerLoad =  async ({locals}) => {
  return {
    user: locals.user
  }
} 