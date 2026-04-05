import type { PageLoad } from './$types';

interface Welcome {
	title: string;
	subtitle: string;
	ts: string;
}

export const load: PageLoad = async () => {
	// Simulated async work — in a real app this might be a fetch or DB call.
	await new Promise((r) => setTimeout(r, 100));

	const welcome: Welcome = {
		title: 'Loaded via +page.ts',
		subtitle: 'This object was prepared before the component existed.',
		ts: new Date().toISOString()
	};

	return { welcome };
};
