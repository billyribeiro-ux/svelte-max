import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const body = `User-agent: *\nAllow: /\n\nSitemap: https://svelte-max.example/sitemap.xml\n`;
	return new Response(body, {
		headers: { 'content-type': 'text/plain' }
	});
};
