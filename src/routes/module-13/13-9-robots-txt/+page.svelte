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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>+server.ts</code> returns a plain <code>Response</code>.</li>
		<li>
			The <code>content-type</code> header must be
			<code>text/plain</code> for robots.txt.
		</li>
		<li>
			<code>export const prerender = true</code> makes it a static file at build time.
		</li>
		<li>In production the file lives at <code>/robots.txt</code>, not under a module folder.</li>
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
