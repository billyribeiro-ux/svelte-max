import { error, redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ url }) => {
	const mode = url.searchParams.get('mode');
	if (mode === 'error') throw error(418, 'I am a teapot — triggered by ?mode=error');
	if (mode === 'redirect') throw redirect(302, '/module-9/9a-1-what-is-load');
	return {
		normal: 'This page loaded normally. Try appending ?mode=error or ?mode=redirect to the URL.'
	};
};
