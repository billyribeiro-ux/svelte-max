<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const source = `import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
  const body = \`User-agent: *
Allow: /

Sitemap: https://svelte-max.example/sitemap.xml
\`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain' }
  });
};`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const source = `import type { RequestHandler } from './$types';\n" +
		"\n" +
		"export const prerender = true;\n" +
		"\n" +
		"export const GET: RequestHandler = () =\u003e {\n" +
		"  const body = \\`User-agent: *\n" +
		"Allow: /\n" +
		"\n" +
		"Sitemap: https://svelte-max.example/sitemap.xml\n" +
		"\\`;\n" +
		"  return new Response(body, {\n" +
		"    headers: { 'content-type': 'text/plain' }\n" +
		"  });\n" +
		"};`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e13.9 — robots.txt via +server.ts\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"		\u003ccode\u003erobots.txt\u003c/code\u003e tells crawlers which paths to index and where the sitemap\n" +
		"		lives. In SvelteKit it is a \u003ccode\u003e+server.ts\u003c/code\u003e endpoint returning\n" +
		"		\u003ccode\u003etext/plain\u003c/code\u003e. Production apps place it at\n" +
		"		\u003ccode\u003esrc/routes/robots.txt/+server.ts\u003c/code\u003e so the URL is\n" +
		"		\u003ccode\u003e/robots.txt\u003c/code\u003e — for this lesson we scope it inside the lesson\n" +
		"		directory so you can visit the sibling endpoint below.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp\u003e\n" +
		"			Visit the endpoint:\n" +
		"			\u003ca href=\"/module-13/13-9-robots-txt/robots.txt\"\u003e\n" +
		"				/module-13/13-9-robots-txt/robots.txt\n" +
		"			\u003c/a\u003e\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003ch2\u003eEndpoint source\u003c/h2\u003e\n" +
		"		\u003cpre\u003e{source}\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eDirective reference\u003c/h2\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003eUser-agent: *\u003c/code\u003e — rule applies to every crawler.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003eAllow: /\u003c/code\u003e — permit crawling of the entire site.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003eDisallow: /admin\u003c/code\u003e — block a path prefix.\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003ccode\u003eSitemap:\u003c/code\u003e — absolute URL of the sitemap.\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e+server.ts\u003c/code\u003e returns a plain \u003ccode\u003eResponse\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003e\n" +
		"			The \u003ccode\u003econtent-type\u003c/code\u003e header must be\n" +
		"			\u003ccode\u003etext/plain\u003c/code\u003e for robots.txt.\n" +
		"		\u003c/li\u003e\n" +
		"		\u003cli\u003e\n" +
		"			\u003ccode\u003eexport const prerender = true\u003c/code\u003e makes it a static file at build time.\n" +
		"		\u003c/li\u003e\n" +
		"		\u003cli\u003eIn production the file lives at \u003ccode\u003e/robots.txt\u003c/code\u003e, not under a module folder.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>13.9 — robots.txt via +server.ts</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>robots.txt</code> tells crawlers which paths to index and where the sitemap
		lives. In SvelteKit it is a <code>+server.ts</code> endpoint returning
		<code>text/plain</code>. Production apps place it at
		<code>src/routes/robots.txt/+server.ts</code> so the URL is
		<code>/robots.txt</code> — for this lesson we scope it inside the lesson
		directory so you can visit the sibling endpoint below.
	</p>

	<div class="build">
		<p>
			Visit the endpoint:
			<a href="/module-13/13-9-robots-txt/robots.txt">
				/module-13/13-9-robots-txt/robots.txt
			</a>
		</p>

		<h2>Endpoint source</h2>
		<pre>{source}</pre>

		<h2>Directive reference</h2>
		<ul>
			<li><code>User-agent: *</code> — rule applies to every crawler.</li>
			<li><code>Allow: /</code> — permit crawling of the entire site.</li>
			<li><code>Disallow: /admin</code> — block a path prefix.</li>
			<li><code>Sitemap:</code> — absolute URL of the sitemap.</li>
		</ul>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment demonstrates a robots.txt misconfiguration. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Change the <code>content-type</code> header to <code>text/html</code>.</strong> Crawlers expect <code>text/plain</code> for robots.txt. With the wrong content type, some crawlers may try to parse the file as HTML, fail to find valid directives, and either ignore the file entirely or misinterpret its contents.</li>
		<li><strong>Change <code>Allow: /</code> to <code>Disallow: /</code>.</strong> This single-character change blocks all crawlers from indexing every page on the entire site. The site effectively disappears from search results. This is the most dangerous robots.txt directive and is sometimes accidentally deployed to production during staging.</li>
		<li><strong>Remove the <code>Sitemap:</code> line from the robots.txt body.</strong> Crawlers lose the direct pointer to your sitemap. They can still discover it via Google Search Console or by guessing <code>/sitemap.xml</code>, but the explicit declaration in robots.txt is the most reliable discovery mechanism and should always be present.</li>
		<li><strong>Remove <code>export const prerender = true</code> from the endpoint.</strong> The robots.txt is now generated on every request instead of being a static file at build time. For a file that rarely changes, this wastes server resources and adds latency. Prerendering turns it into a static asset served directly by the CDN.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>robots.txt</code> file is the first thing crawlers request when they visit a site. It tells them which paths are allowed or disallowed for indexing and where to find the sitemap. In SvelteKit, you serve it from a <code>+server.ts</code> endpoint that returns a plain <code>Response</code> with <code>content-type: text/plain</code>. The file format is simple: <code>User-agent</code> lines specify which crawler the rules apply to, <code>Allow</code> and <code>Disallow</code> lines control path access, and <code>Sitemap</code> provides an absolute URL to the XML sitemap.</p>
	<p class="prose">Setting <code>export const prerender = true</code> on the endpoint is a best practice because robots.txt content almost never changes between deploys. Prerendering turns it into a static file at build time, which means it is served instantly by the CDN with zero server overhead. In production, the endpoint lives at <code>src/routes/robots.txt/+server.ts</code> so the URL is <code>/robots.txt</code> at the site root, exactly where crawlers expect to find it.</p>
	<p class="prose">The most critical directive to get right is <code>Disallow</code>. A misplaced <code>Disallow: /</code> blocks the entire site from indexing, which can be catastrophic if deployed to production accidentally. Always review the robots.txt output after every change, and consider adding a test in your CI pipeline that fetches the endpoint and asserts the expected directives are present.</p>
	<p class="next">Next, you will learn how to generate a dynamic sitemap.xml that lists every indexable URL on your site.</p>
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
