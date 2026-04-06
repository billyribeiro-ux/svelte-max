<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// This lesson page uses SvelteKit defaults:
	// SSR on (server renders HTML per request), prerender off (not built ahead of time).
	// Good default because the page is interactive and not user-specific.
	export const ssr = true;
	export const prerender = false;

	interface ModeRow {
		mode: string;
		config: string;
		use: string;
		avoid: string;
		examples: string;
	}

	const rows: readonly ModeRow[] = [
		{
			mode: 'SSR',
			config: 'ssr = true (default)',
			use: 'Fresh data, SEO, per-user pages',
			avoid: 'Pure static content you can cache at build',
			examples: 'Product pages, feeds, search results'
		},
		{
			mode: 'SSG',
			config: 'prerender = true',
			use: 'Content that rarely changes, marketing, docs',
			avoid: 'Per-user data, realtime content',
			examples: 'Blog, docs site, marketing pages'
		},
		{
			mode: 'CSR',
			config: 'ssr = false',
			use: 'Auth-gated dashboards, editor UIs',
			avoid: 'SEO-critical pages, first-paint-sensitive routes',
			examples: 'Admin panels, authoring tools'
		},
		{
			mode: 'Hybrid',
			config: 'Mix per-route',
			use: 'Most real apps — prerender marketing, SSR app, CSR admin',
			avoid: 'Not a pitfall — this is the norm',
			examples: 'SaaS with marketing + app + admin'
		}
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// This lesson page uses SvelteKit defaults:\n" +
		"\t// SSR on (server renders HTML per request), prerender off (not built ahead of time).\n" +
		"\t// Good default because the page is interactive and not user-specific.\n" +
		"\texport const ssr = true;\n" +
		"\texport const prerender = false;\n" +
		"\n" +
		"\tinterface ModeRow {\n" +
		"\t\tmode: string;\n" +
		"\t\tconfig: string;\n" +
		"\t\tuse: string;\n" +
		"\t\tavoid: string;\n" +
		"\t\texamples: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst rows: readonly ModeRow[] = [\n" +
		"\t\t{\n" +
		"\t\t\tmode: 'SSR',\n" +
		"\t\t\tconfig: 'ssr = true (default)',\n" +
		"\t\t\tuse: 'Fresh data, SEO, per-user pages',\n" +
		"\t\t\tavoid: 'Pure static content you can cache at build',\n" +
		"\t\t\texamples: 'Product pages, feeds, search results'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tmode: 'SSG',\n" +
		"\t\t\tconfig: 'prerender = true',\n" +
		"\t\t\tuse: 'Content that rarely changes, marketing, docs',\n" +
		"\t\t\tavoid: 'Per-user data, realtime content',\n" +
		"\t\t\texamples: 'Blog, docs site, marketing pages'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tmode: 'CSR',\n" +
		"\t\t\tconfig: 'ssr = false',\n" +
		"\t\t\tuse: 'Auth-gated dashboards, editor UIs',\n" +
		"\t\t\tavoid: 'SEO-critical pages, first-paint-sensitive routes',\n" +
		"\t\t\texamples: 'Admin panels, authoring tools'\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tmode: 'Hybrid',\n" +
		"\t\t\tconfig: 'Mix per-route',\n" +
		"\t\t\tuse: 'Most real apps — prerender marketing, SSR app, CSR admin',\n" +
		"\t\t\tavoid: 'Not a pitfall — this is the norm',\n" +
		"\t\t\texamples: 'SaaS with marketing + app + admin'\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.14 — Rendering modes\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\tSvelteKit supports four rendering modes per route: \u003cstrong\u003eSSR\u003c/strong\u003e (default — server\n" +
		"\t\trenders HTML per request), \u003cstrong\u003eSSG\u003c/strong\u003e (\u003ccode\u003eprerender = true\u003c/code\u003e — built once\n" +
		"\t\tat build time), \u003cstrong\u003eCSR\u003c/strong\u003e (\u003ccode\u003essr = false\u003c/code\u003e — skeleton HTML, browser\n" +
		"\t\trenders), and \u003cstrong\u003eHybrid\u003c/strong\u003e (mix per route). Pick based on data freshness, auth,\n" +
		"\t\tinteractivity, and build-time cost.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ctable\u003e\n" +
		"\t\t\t\u003cthead\u003e\n" +
		"\t\t\t\t\u003ctr\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eMode\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eConfig\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eWhen to use\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eWhen NOT to use\u003c/th\u003e\n" +
		"\t\t\t\t\t\u003cth\u003eExamples\u003c/th\u003e\n" +
		"\t\t\t\t\u003c/tr\u003e\n" +
		"\t\t\t\u003c/thead\u003e\n" +
		"\t\t\t\u003ctbody\u003e\n" +
		"\t\t\t\t{#each rows as r (r.mode)}\n" +
		"\t\t\t\t\t\u003ctr\u003e\n" +
		"\t\t\t\t\t\t\u003ctd\u003e\u003cstrong\u003e{r.mode}\u003c/strong\u003e\u003c/td\u003e\n" +
		"\t\t\t\t\t\t\u003ctd\u003e\u003ccode\u003e{r.config}\u003c/code\u003e\u003c/td\u003e\n" +
		"\t\t\t\t\t\t\u003ctd\u003e{r.use}\u003c/td\u003e\n" +
		"\t\t\t\t\t\t\u003ctd\u003e{r.avoid}\u003c/td\u003e\n" +
		"\t\t\t\t\t\t\u003ctd\u003e{r.examples}\u003c/td\u003e\n" +
		"\t\t\t\t\t\u003c/tr\u003e\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/tbody\u003e\n" +
		"\t\t\u003c/table\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"current\"\u003e\n" +
		"\t\t\t\u003cspan\u003eThis page:\u003c/span\u003e\n" +
		"\t\t\t\u003cspan class=\"pill\"\u003eSSR\u003c/span\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eSSR is the right default — fresh data plus fast first paint.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSSG (\u003ccode\u003eprerender = true\u003c/code\u003e) is perfect for docs and marketing.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eCSR (\u003ccode\u003essr = false\u003c/code\u003e) is fine for auth-gated internal tools.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eHybrid routing is the norm for real apps — pick per route.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.14 — Rendering modes</h1>
	<p class="concept">
		<strong>Concept.</strong>
		SvelteKit supports four rendering modes per route: <strong>SSR</strong> (default — server
		renders HTML per request), <strong>SSG</strong> (<code>prerender = true</code> — built once
		at build time), <strong>CSR</strong> (<code>ssr = false</code> — skeleton HTML, browser
		renders), and <strong>Hybrid</strong> (mix per route). Pick based on data freshness, auth,
		interactivity, and build-time cost.
	</p>

	<div class="build">
		<table>
			<thead>
				<tr>
					<th>Mode</th>
					<th>Config</th>
					<th>When to use</th>
					<th>When NOT to use</th>
					<th>Examples</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as r (r.mode)}
					<tr>
						<td><strong>{r.mode}</strong></td>
						<td><code>{r.config}</code></td>
						<td>{r.use}</td>
						<td>{r.avoid}</td>
						<td>{r.examples}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="current">
			<span>This page:</span>
			<span class="pill">SSR</span>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment highlights a tradeoff or pitfall of a specific rendering mode. Undo after each one.</p>
	<ol class="experiments">
		<li><strong>Set <code>prerender = true</code> on a route that reads <code>cookies</code> in its server load function.</strong> The build fails because prerendering happens at build time when there is no real request and therefore no cookies. This reveals the fundamental constraint of SSG: prerendered pages cannot depend on per-request data like authentication, cookies, or headers.</li>
		<li><strong>Set <code>ssr = false</code> on a content-heavy page, then view the page source.</strong> The source shows an empty <code>&lt;div&gt;</code> shell with no content. Run a Lighthouse audit and watch the SEO score drop because crawlers see nothing to index. This proves that CSR is unsuitable for pages where search visibility or first-paint speed matters.</li>
		<li><strong>Set <code>prerender = true</code> on a page that links to a dynamic route like <code>/blog/[slug]</code> without providing an <code>entries</code> function.</strong> The build completes but the dynamic links return 404 in production because the prerenderer only discovered the pages it could crawl from the entry points. This demonstrates that prerendered apps with dynamic routes need explicit <code>entries()</code> functions to tell SvelteKit which param values to generate.</li>
		<li><strong>Set <code>csr = false</code> (note: <code>csr</code>, not <code>ssr</code>) on a page with interactive elements like buttons and form bindings.</strong> The page renders via SSR with full HTML, but none of the event handlers or reactive bindings work because the client-side JavaScript is never loaded. This shows that <code>csr = false</code> produces a truly static page — useful for pure content but fatal for interactivity.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit offers four rendering modes that you select per route through exported constants. SSR (the default, <code>ssr = true</code>) renders each page on the server per request, providing fresh data, strong SEO, and fast first paint. SSG (<code>prerender = true</code>) renders pages once at build time and serves them as static HTML, which is ideal for documentation, blog posts, and marketing pages where content does not change between requests. CSR (<code>ssr = false</code>) skips server rendering entirely and lets the browser do all the work, which is appropriate for auth-gated dashboards where SEO is irrelevant.</p>
	<p class="prose">The hybrid approach — mixing modes across routes in the same application — is the norm for real-world projects. A SaaS application might prerender its marketing pages, SSR its product pages for SEO, and CSR its admin dashboard for simplicity. SvelteKit's per-route configuration makes this trivial: each route folder can export its own <code>ssr</code>, <code>prerender</code>, and <code>csr</code> constants independently. The adapter you choose (Node, Vercel, Cloudflare, static) determines which modes are available in production, so your deployment target influences your rendering strategy.</p>
	<p class="prose">The less common <code>csr = false</code> option disables client-side JavaScript entirely for a route, producing a page that is rendered by the server but never hydrated. This is useful for content pages that need zero interactivity — no event handlers, no reactive bindings, no client-side navigation. It reduces the JavaScript payload to zero for that route but means that any interactive elements will be inert. Understanding all four knobs — <code>ssr</code>, <code>prerender</code>, <code>csr</code>, and their combinations — lets you make informed tradeoffs between performance, interactivity, and developer experience for every route in your application.</p>
	<p class="next">You have completed Module 8. Head to the project to put these routing and navigation concepts into practice.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 90ch;
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
		overflow-x: auto;
	}
	table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	th,
	td {
		text-align: start;
		padding: var(--space-sm);
		border-block-end: 1px solid var(--color-border);
		vertical-align: top;
	}
	th {
		color: var(--color-text);
		font-weight: 600;
	}
	td {
		color: var(--color-text-muted);
	}
	tbody tr:nth-child(even) {
		background: var(--color-surface-2);
	}
	.current {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.pill {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-brand);
		color: var(--color-surface);
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
