import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	// `data` here is whatever +page.server.ts returned.
	// The universal loader runs after the server loader, both on initial SSR
	// AND again in the browser when navigating client-side.
	const clientTs = new Date().toISOString();

	return {
		...data,
		clientTs,
		combined: `server=${data.serverSecret} | client=${clientTs}`
	};
};
