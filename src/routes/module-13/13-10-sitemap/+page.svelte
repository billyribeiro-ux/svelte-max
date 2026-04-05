<script lang="ts">
	const source = `import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
  const base = 'https://svelte-max.example';
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls: readonly string[] = [
    '/',
    '/module-1/1-1-hello-compiled',
    '/module-13/project'
  ];
  const body = \`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
\${urls.map((u) => \`  <url><loc>\${base}\${u}</loc><lastmod>\${lastmod}</lastmod></url>\`).join('\\n')}
</urlset>\`;
  return new Response(body, {
    headers: { 'content-type': 'application/xml' }
  });
};`;
</script>

<section class="page">
	<h1>13.10 — Dynamic sitemap.xml</h1>
	<p class="concept">
		<strong>Concept.</strong> A sitemap lists every URL you want indexed with optional
		<code>lastmod</code>, <code>changefreq</code>, and <code>priority</code>. It is
		served as <code>application/xml</code>. Dynamic sitemaps build the URL list at
		request time (or build time when prerendered) from route data — in real apps, from a
		CMS or database.
	</p>

	<div class="build">
		<p>
			Visit the endpoint:
			<a href="/module-13/13-10-sitemap/sitemap.xml">
				/module-13/13-10-sitemap/sitemap.xml
			</a>
		</p>

		<h2>Endpoint source</h2>
		<pre>{source}</pre>

		<h2>XML element reference</h2>
		<ul>
			<li><code>{'<urlset>'}</code> — root element with the sitemap namespace.</li>
			<li><code>{'<url>'}</code> — one per indexable URL.</li>
			<li><code>{'<loc>'}</code> — the absolute URL.</li>
			<li><code>{'<lastmod>'}</code> — ISO date of last modification.</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>
			<code>+server.ts</code> can emit XML by setting
			<code>content-type: application/xml</code>.
		</li>
		<li>Prerendering turns the endpoint into a static file at build time.</li>
		<li>Real apps enumerate URLs from data sources, not hard-coded arrays.</li>
		<li>Production sitemaps live at <code>/sitemap.xml</code>, not under a module folder.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	h2 {
		font-size: var(--text-lg);
		margin: 0;
	}
	a {
		color: var(--color-brand);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
