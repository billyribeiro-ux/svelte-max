<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const source = `import type { RequestHandler } from './$types';\n" +
		"\n" +
		"export const prerender = true;\n" +
		"\n" +
		"export const GET: RequestHandler = () =\u003e {\n" +
		"  const base = 'https://svelte-max.example';\n" +
		"  const lastmod = new Date().toISOString().slice(0, 10);\n" +
		"  const urls: readonly string[] = [\n" +
		"    '/',\n" +
		"    '/module-1/1-1-hello-compiled',\n" +
		"    '/module-13/project'\n" +
		"  ];\n" +
		"  const body = \\`\u003c?xml version=\"1.0\" encoding=\"UTF-8\"?\u003e\n" +
		"\u003curlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\"\u003e\n" +
		"\\${urls.map((u) =\u003e \\`  \u003curl\u003e\u003cloc\u003e\\${base}\\${u}\u003c/loc\u003e\u003clastmod\u003e\\${lastmod}\u003c/lastmod\u003e\u003c/url\u003e\\`).join('\\\\n')}\n" +
		"\u003c/urlset\u003e\\`;\n" +
		"  return new Response(body, {\n" +
		"    headers: { 'content-type': 'application/xml' }\n" +
		"  });\n" +
		"};`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.10 — Dynamic sitemap.xml\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A sitemap lists every URL you want indexed with optional\n" +
		"		\u003ccode\u003elastmod\u003c/code\u003e, \u003ccode\u003echangefreq\u003c/code\u003e, and \u003ccode\u003epriority\u003c/code\u003e. It is\n" +
		"		served as \u003ccode\u003eapplication/xml\u003c/code\u003e. Dynamic sitemaps build the URL list at\n" +
		"		request time (or build time when prerendered) from route data — in real apps, from a\n" +
		"		CMS or database.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp\u003e\n" +
		"			Visit the endpoint:\n" +
		"			\u003ca href=\"/module-13/13-10-sitemap/sitemap.xml\"\u003e\n" +
		"				/module-13/13-10-sitemap/sitemap.xml\n" +
		"			\u003c/a\u003e\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003ch2\u003eEndpoint source\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{source}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eXML element reference\u003c/h2\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003e{'\u003curlset\u003e'}\u003c/code\u003e — root element with the sitemap namespace.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003e{'\u003curl\u003e'}\u003c/code\u003e — one per indexable URL.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003e{'\u003cloc\u003e'}\u003c/code\u003e — the absolute URL.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003e{'\u003clastmod\u003e'}\u003c/code\u003e — ISO date of last modification.\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\n" +
		"			\u003ccode\u003e+server.ts\u003c/code\u003e can emit XML by setting\n" +
		"			\u003ccode\u003econtent-type: application/xml\u003c/code\u003e.\n" +
		"		\u003c/li\u003e\n" +
		"		\u003cli\u003ePrerendering turns the endpoint into a static file at build time.\u003c/li\u003e\n" +
		"		\u003cli\u003eReal apps enumerate URLs from data sources, not hard-coded arrays.\u003c/li\u003e\n" +
		"		\u003cli\u003eProduction sitemaps live at \u003ccode\u003e/sitemap.xml\u003c/code\u003e, not under a module folder.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
