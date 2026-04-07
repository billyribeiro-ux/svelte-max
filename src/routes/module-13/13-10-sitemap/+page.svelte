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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment shows how sitemap misconfiguration affects crawling. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Change the <code>content-type</code> header to <code>text/plain</code> instead of <code>application/xml</code>.</strong> Crawlers that strictly validate the content type may reject the sitemap. Google is lenient and will usually parse it anyway, but other search engines and validation tools will flag the incorrect MIME type as an error.</li>
		<li><strong>Use relative URLs in the <code>{'<loc>'}</code> elements instead of absolute URLs.</strong> The sitemap specification requires absolute URLs including the protocol and domain. Relative paths violate the spec, and crawlers may not resolve them correctly, especially when the sitemap is discovered through robots.txt which itself lives at a different path.</li>
		<li><strong>Add a URL to the sitemap that returns a 404 status code.</strong> Google will attempt to crawl the URL, receive a 404, and mark it as an error in Search Console. Over time, sitemaps with many broken URLs lose credibility, and Google may crawl the sitemap less frequently, delaying the discovery of genuinely new pages.</li>
		<li><strong>Remove the <code>{'<lastmod>'}</code> element from all URL entries.</strong> Crawlers lose the signal for when content was last updated. Without <code>lastmod</code>, Google must re-crawl every URL to check for changes instead of prioritising recently modified pages. This wastes crawl budget and delays the indexing of fresh content.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A sitemap is an XML file that lists every URL you want search engines to index, along with optional metadata like <code>lastmod</code> (the date of last modification), <code>changefreq</code> (how often the page changes), and <code>priority</code> (relative importance within your site). In SvelteKit, you serve it from a <code>+server.ts</code> endpoint with <code>content-type: application/xml</code>, and the endpoint can dynamically enumerate URLs from your routes, database, or CMS at build time or request time.</p>
	<p class="prose">The <code>lastmod</code> field is the most valuable piece of sitemap metadata because it tells crawlers which pages have changed recently. This allows search engines to prioritise re-crawling updated content instead of wasting crawl budget on unchanged pages. In real applications, the URL list comes from a data source (CMS, database, or filesystem scan), not a hard-coded array, and <code>lastmod</code> is derived from the actual modification timestamp of each page's content.</p>
	<p class="prose">Prerendering with <code>export const prerender = true</code> is ideal for sites with a known set of URLs at build time. The sitemap becomes a static XML file served directly by the CDN. For dynamic sites where content changes frequently between deploys, omit prerendering and let the endpoint generate the sitemap on each request. In production, the sitemap lives at <code>/sitemap.xml</code> and is referenced from <code>robots.txt</code> so crawlers can discover it automatically.</p>
	<p class="next">Next, you will learn how Core Web Vitals (LCP, CLS, INP) affect your search rankings and how Svelte helps you hit the targets.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
