import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const fastData = {
		title: 'Rendered instantly',
		headline: 'This top half came from the initial render.'
	};
	const slowData = new Promise<{ details: string; at: string }>((resolve) =>
		setTimeout(
			() =>
				resolve({
					details: 'This content streamed in 1.5 seconds after the rest of the page',
					at: new Date().toISOString()
				}),
			1500
		)
	);
	return { fast: fastData, slow: slowData };
};
