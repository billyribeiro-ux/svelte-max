import type { PageLoad } from './$types';

export const load: PageLoad = async ({ depends }) => {
	depends('app:demo-timer');
	await new Promise((r) => setTimeout(r, 100));
	return {
		value: Math.round(Math.random() * 1000),
		fetchedAt: new Date().toISOString()
	};
};
