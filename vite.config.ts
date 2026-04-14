import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
		exclude: ['@tanstack/svelte-table', '@motion-core/motion-gpu']
	},
	ssr: {
		noExternal: [],
		external: ['@tanstack/svelte-table', '@motion-core/motion-gpu']
	},
	build: {
		rollupOptions: {
			shimMissingExports: true
		}
	}
});
