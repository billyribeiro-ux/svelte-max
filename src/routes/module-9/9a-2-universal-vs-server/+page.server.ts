import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	// This code NEVER runs in the browser. Safe place for DB queries, secrets, etc.
	await new Promise((r) => setTimeout(r, 80));

	return {
		serverSecret: 'synthesized on the server',
		processedAt: new Date().toISOString()
	};
};
