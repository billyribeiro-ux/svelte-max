<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const prerenderCode = `// config.remote.ts
import { prerender } from '$app/server';

// Runs at build time — result is baked into the bundle
export const getSiteConfig = prerender(async () => {
  const config = await fetch('https://api.example.com/config');
  return config.json();
});`;

	const inputsCode = `// blog-posts.remote.ts
import { prerender } from '$app/server';

// 'inputs' specifies which arguments to prerender
export const getPost = prerender(
  async (slug: string) => {
    return await db.posts.findBySlug(slug);
  },
  {
    inputs: ['intro-to-svelte', 'advanced-runes', 'remote-functions']
  }
);`;

	const dynamicCode = `// With dynamic: true, unknown inputs fall back to server
export const getPost = prerender(
  async (slug: string) => {
    return await db.posts.findBySlug(slug);
  },
  {
    inputs: ['intro-to-svelte', 'advanced-runes'],
    dynamic: true  // slugs not in 'inputs' hit the server at runtime
  }
);`;

	const buildTime = new Date().toISOString();

	const staticData = [
		{ key: 'Site Name', value: 'SvelteMax Learning Platform' },
		{ key: 'Version', value: '2.4.1' },
		{ key: 'Theme', value: 'Dark' },
		{ key: 'Locale', value: 'en-US' },
		{ key: 'Build Time', value: buildTime },
	];


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const prerenderCode = `// config.remote.ts\n" +
		"import { prerender } from '$app/server';\n" +
		"\n" +
		"// Runs at build time — result is baked into the bundle\n" +
		"export const getSiteConfig = prerender(async () =\u003e {\n" +
		"  const config = await fetch('https://api.example.com/config');\n" +
		"  return config.json();\n" +
		"});`;\n" +
		"\n" +
		"	const inputsCode = `// blog-posts.remote.ts\n" +
		"import { prerender } from '$app/server';\n" +
		"\n" +
		"// 'inputs' specifies which arguments to prerender\n" +
		"export const getPost = prerender(\n" +
		"  async (slug: string) =\u003e {\n" +
		"    return await db.posts.findBySlug(slug);\n" +
		"  },\n" +
		"  {\n" +
		"    inputs: ['intro-to-svelte', 'advanced-runes', 'remote-functions']\n" +
		"  }\n" +
		");`;\n" +
		"\n" +
		"	const dynamicCode = `// With dynamic: true, unknown inputs fall back to server\n" +
		"export const getPost = prerender(\n" +
		"  async (slug: string) =\u003e {\n" +
		"    return await db.posts.findBySlug(slug);\n" +
		"  },\n" +
		"  {\n" +
		"    inputs: ['intro-to-svelte', 'advanced-runes'],\n" +
		"    dynamic: true  // slugs not in 'inputs' hit the server at runtime\n" +
		"  }\n" +
		");`;\n" +
		"\n" +
		"	const buildTime = new Date().toISOString();\n" +
		"\n" +
		"	const staticData = [\n" +
		"		{ key: 'Site Name', value: 'SvelteMax Learning Platform' },\n" +
		"		{ key: 'Version', value: '2.4.1' },\n" +
		"		{ key: 'Theme', value: 'Dark' },\n" +
		"		{ key: 'Locale', value: 'en-US' },\n" +
		"		{ key: 'Build Time', value: buildTime },\n" +
		"	];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.5 — prerender Remote Functions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eprerender\u003c/code\u003e from \u003ccode\u003e$app/server\u003c/code\u003e runs at build\n" +
		"		time, producing static data baked into the bundle. Perfect for CDN deployment. The\n" +
		"		\u003ccode\u003einputs\u003c/code\u003e option specifies which arguments to prerender, and\n" +
		"		\u003ccode\u003edynamic: true\u003c/code\u003e falls back to the server for unknown inputs.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eBasic prerender\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{prerenderCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003ePrerender with specific inputs\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{inputsCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eDynamic fallback\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{dynamicCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated prerendered data\u003c/h2\u003e\n" +
		"		\u003cp\u003eThis represents what a prerendered config query would produce — static data frozen at build time:\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"config-table\"\u003e\n" +
		"			{#each staticData as item}\n" +
		"				\u003cdiv class=\"config-row\"\u003e\n" +
		"					\u003cspan class=\"config-key\"\u003e{item.key}\u003c/span\u003e\n" +
		"					\u003cspan class=\"config-value\"\u003e{item.value}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"note\"\u003e\n" +
		"			\u003cstrong\u003eCDN-friendly:\u003c/strong\u003e Prerendered data is served as static files. No server needed at\n" +
		"			runtime for these queries. The data only changes when you rebuild.\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhen to prerender vs query\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003ePrerender\u003c/strong\u003e when data changes rarely — site config, navigation structure,\n" +
		"		documentation index. \u003cstrong\u003eQuery at runtime\u003c/strong\u003e when data changes per request — user-specific\n" +
		"		content, real-time dashboards. Use \u003ccode\u003edynamic: true\u003c/code\u003e for data that USUALLY doesn't change\n" +
		"		but CAN — for example, a product catalog that you prerender at build time but fall back to the\n" +
		"		server on cache miss for newly added items.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eprerender\u003c/code\u003e runs queries at build time, embedding results in the bundle\u003c/li\u003e\n" +
		"		\u003cli\u003eThe \u003ccode\u003einputs\u003c/code\u003e option specifies which arguments to precompute\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003edynamic: true\u003c/code\u003e allows runtime fallback for unknown inputs\u003c/li\u003e\n" +
		"		\u003cli\u003ePrerendered data is ideal for config, blog posts, and other rarely-changing content\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9B.5 — prerender Remote Functions</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>prerender</code> from <code>$app/server</code> runs at build
		time, producing static data baked into the bundle. Perfect for CDN deployment. The
		<code>inputs</code> option specifies which arguments to prerender, and
		<code>dynamic: true</code> falls back to the server for unknown inputs.
	</p>

	<div class="build">
		<h2>Basic prerender</h2>
		<pre><code>{prerenderCode}</code></pre>

		<h2>Prerender with specific inputs</h2>
		<pre><code>{inputsCode}</code></pre>

		<h2>Dynamic fallback</h2>
		<pre><code>{dynamicCode}</code></pre>

		<h2>Simulated prerendered data</h2>
		<p>This represents what a prerendered config query would produce — static data frozen at build time:</p>

		<div class="config-table">
			{#each staticData as item}
				<div class="config-row">
					<span class="config-key">{item.key}</span>
					<span class="config-value">{item.value}</span>
				</div>
			{/each}
		</div>

		<div class="note">
			<strong>CDN-friendly:</strong> Prerendered data is served as static files. No server needed at
			runtime for these queries. The data only changes when you rebuild.
		</div>
	</div>

	<h3>When to prerender vs query</h3>
	<p class="concept">
		<strong>Prerender</strong> when data changes rarely — site config, navigation structure,
		documentation index. <strong>Query at runtime</strong> when data changes per request — user-specific
		content, real-time dashboards. Use <code>dynamic: true</code> for data that USUALLY doesn't change
		but CAN — for example, a product catalog that you prerender at build time but fall back to the
		server on cache miss for newly added items.
	</p>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Call a prerendered function with an argument not listed in <code>inputs</code> and without <code>dynamic: true</code>.</strong> The build fails because SvelteKit does not know how to prerender an unspecified input. Every possible argument must be listed or dynamic fallback must be enabled.</li>
		<li><strong>Access request-specific data like cookies inside a <code>prerender</code> function.</strong> The build fails because there is no request context at build time. Prerendered functions must be pure data fetchers with no per-request dependencies.</li>
		<li><strong>Set <code>dynamic: true</code> and call the function with a new argument in the browser.</strong> The first call hits the server at runtime, but subsequent calls are cached. This hybrid approach lets you prerender known content while handling new entries gracefully.</li>
		<li><strong>Check the bundle output after build and look for the prerendered data.</strong> The result is embedded as a static JSON file, proving that no server is needed at runtime. The client loads it like a static asset with CDN-level performance.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>prerender</code> function from <code>$app/server</code> runs your query at build time and bakes the result directly into the output bundle. At runtime, the client loads this data as a static file with zero server cost and CDN-level latency. It is the fastest possible data delivery for content that does not change between builds.</p>
	<p class="prose">For functions that accept arguments, the <code>inputs</code> option specifies which argument values to precompute. If you also set <code>dynamic: true</code>, any argument not in the inputs list falls back to a runtime server call, giving you a hybrid approach: prerender the known content, serve the unknown on demand.</p>
	<p class="prose">Prerendering is ideal for site configuration, navigation structures, documentation indexes, blog post catalogs, and any data that changes rarely. Avoid it for per-user content, real-time dashboards, or anything that must reflect the current state of the world on every request.</p>
	<p class="next">Next up: handling form submissions with <code>form()</code> remote functions.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.config-table { display: flex; flex-direction: column; gap: 1px; background: var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
	.config-row { display: flex; justify-content: space-between; padding: var(--space-sm) var(--space-md); background: var(--color-surface-2); }
	.config-key { font-weight: 600; }
	.config-value { color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm); }
	.note { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); font-size: var(--text-sm); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
