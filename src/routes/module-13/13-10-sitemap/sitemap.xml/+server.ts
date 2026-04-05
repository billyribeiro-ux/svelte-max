import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
	const base = 'https://svelte-max.example';
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls: readonly string[] = ['/', '/module-1/1-1-hello-compiled', '/module-13/project'];
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${base}${u}</loc><lastmod>${lastmod}</lastmod></url>`).join('\n')}
</urlset>`;
	return new Response(body, {
		headers: { 'content-type': 'application/xml' }
	});
};
