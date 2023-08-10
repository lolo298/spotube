import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		url: 'http://localhost:4173',
		port: 4173,
		timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
	},
	testDir: 'tests',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/
};

export default config;
