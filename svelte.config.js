import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: {
		runes: true,
		experimental: {
			async: true
		}
	},
	kit: {
		adapter: adapter(),
		prerender: {
			handleHttpError: 'warn'
		},
		experimental: {
			remoteFunctions: true
		}
	}
};

export default config;
