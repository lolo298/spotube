//convert to singleton

import { createClient, type RedisClientType } from 'redis';
interface RedisClientTypeExtended extends RedisClientType {
  getJSON<T>(key: string): Promise<T>;
}


class RedisClient {
	private static _instance: RedisClient;
	private client: RedisClientTypeExtended;
	public counter = 0;

	private constructor() {
		this.client = createClient() as unknown as RedisClientTypeExtended;

		this.client.getJSON = async (key: string) => {
			const data = await this.client.get(key);
			if(!data) throw new Error(`No data found for key ${key}`);
			return JSON.parse(data);
		};

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
		return this.client as RedisClientTypeExtended;
	}
}

export default RedisClient.Instance.Client;
