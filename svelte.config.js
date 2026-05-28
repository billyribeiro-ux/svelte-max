import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true
	},
	kit: {
		adapter: adapter(),
		serviceWorker: {
			register: false
		},
		prerender: {
			handleHttpError: 'warn'
		},
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
