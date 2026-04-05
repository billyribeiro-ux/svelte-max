import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async () => ({
	buildInfo: {
		note: 'This page was prerendered at build time',
		builtAt: new Date().toISOString()
	}
});
