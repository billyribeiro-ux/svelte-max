import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@tanstack/svelte-table']
	},
	ssr: {
		noExternal: [],
		external: ['@tanstack/svelte-table']
	},
	build: {
		rollupOptions: {
			shimMissingExports: true
		}
	}
});
