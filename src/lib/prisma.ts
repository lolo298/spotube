import { PrismaClient } from '@prisma/client';

class prismaClient {
	private static _instance: PrismaClient;
	private client: PrismaClient;
	public counter = 0;

	private constructor() {
		this.client = new PrismaClient();
	}

	public static get Instance() {
		return this._instance || (this._instance = new PrismaClient());
	}

	public get Client() {
		return this.client;
	}
}

export default prismaClient.Instance;
