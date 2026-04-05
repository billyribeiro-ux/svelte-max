import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	// Layout loaders run once for the layout and every child route underneath.
	// Children can pull this data explicitly via `await parent()` inside their own load.
	await new Promise((r) => setTimeout(r, 60));

	return {
		preferences: {
			theme: 'auto' as const,
			locale: 'en' as const
		}
	};
};
