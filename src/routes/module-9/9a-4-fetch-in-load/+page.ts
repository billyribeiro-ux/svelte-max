import type { PageLoad } from './$types';

interface Tip {
	tip: string;
	fetchType: string;
}

export const load: PageLoad = async ({ fetch }) => {
	// In a real app: const res = await fetch('/api/tip'); const body = await res.json();
	// Here we simulate so the lesson is fully offline and hydration-safe.
	await new Promise((r) => setTimeout(r, 150));

	// Reference `fetch` so TypeScript keeps the destructure and the lesson shows the signature.
	const fetchAvailable = typeof fetch === 'function';

	const fake: Tip = {
		tip: 'Always destructure fetch from the load event',
		fetchType: fetchAvailable ? 'SvelteKit enhanced fetch' : 'unavailable'
	};

	return { tip: fake };
};
