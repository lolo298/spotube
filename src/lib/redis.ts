//convert to singleton

import { createClient, type RedisClientType } from 'redis';

class RedisClient {
	private static _instance: RedisClient;
	private client: RedisClientType;
	public counter = 0;

	private constructor() {
		this.client = createClient();
		this.client.on('error', function (error: Error) {
			console.error(error);
		});
		this.client.connect();
		this.counter++;
	}

	public static get Instance() {
		return this._instance || (this._instance = new this());
	}

	public get Client() {
		return this.client;
	}
}

export async function getSession(id: string): Promise<Session | null> {
	const client = RedisClient.Instance.Client;
	const session = await client.get(`session:${id}`);
	if (session === null) {
		return null;
	}
	return JSON.parse(session);
}

export default RedisClient.Instance.Client;
