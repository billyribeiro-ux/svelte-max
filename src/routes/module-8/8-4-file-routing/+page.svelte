<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface RouteEntry {
		path: string;
		url: string;
	}

	interface SpecialFile {
		name: string;
		role: string;
	}

	const routes: RouteEntry[] = [
		{ path: 'src/routes/+page.svelte', url: '/' },
		{ path: 'src/routes/module-1/+page.svelte', url: '/module-1' },
		{ path: 'src/routes/module-8/8-1-what-sveltekit-adds/+page.svelte', url: '/module-8/8-1-what-sveltekit-adds' },
		{ path: 'src/routes/module-8/8-4-file-routing/+page.svelte', url: '/module-8/8-4-file-routing' }
	];

	const specials: SpecialFile[] = [
		{ name: '+page.svelte', role: 'The page component for this route.' },
		{ name: '+page.ts', role: 'Universal load function — runs on server then client.' },
		{ name: '+page.server.ts', role: 'Server-only load and form actions. Safe for secrets.' },
		{ name: '+layout.svelte', role: 'Layout that wraps this folder and all descendants.' },
		{ name: '+layout.ts', role: 'Universal layout load. Data flows down to child pages.' },
		{ name: '+layout.server.ts', role: 'Server-only layout load. Runs once for the whole subtree on nav.' },
		{ name: '+server.ts', role: 'HTTP endpoint. Export GET/POST/PUT/PATCH/DELETE functions.' },
		{ name: '+error.svelte', role: 'Error boundary for this subtree. Receives page.error.' }
	];

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface RouteEntry {\n" +
		"\t\tpath: string;\n" +
		"\t\turl: string;\n" +
		"\t}\n" +
		"\n" +
		"\tinterface SpecialFile {\n" +
		"\t\tname: string;\n" +
		"\t\trole: string;\n" +
		"\t}\n" +
		"\n" +
		"\tconst routes: RouteEntry[] = [\n" +
		"\t\t{ path: 'src/routes/+page.svelte', url: '/' },\n" +
		"\t\t{ path: 'src/routes/module-1/+page.svelte', url: '/module-1' },\n" +
		"\t\t{ path: 'src/routes/module-8/8-1-what-sveltekit-adds/+page.svelte', url: '/module-8/8-1-what-sveltekit-adds' },\n" +
		"\t\t{ path: 'src/routes/module-8/8-4-file-routing/+page.svelte', url: '/module-8/8-4-file-routing' }\n" +
		"\t];\n" +
		"\n" +
		"\tconst specials: SpecialFile[] = [\n" +
		"\t\t{ name: '+page.svelte', role: 'The page component for this route.' },\n" +
		"\t\t{ name: '+page.ts', role: 'Universal load function — runs on server then client.' },\n" +
		"\t\t{ name: '+page.server.ts', role: 'Server-only load and form actions. Safe for secrets.' },\n" +
		"\t\t{ name: '+layout.svelte', role: 'Layout that wraps this folder and all descendants.' },\n" +
		"\t\t{ name: '+layout.ts', role: 'Universal layout load. Data flows down to child pages.' },\n" +
		"\t\t{ name: '+layout.server.ts', role: 'Server-only layout load. Runs once for the whole subtree on nav.' },\n" +
		"\t\t{ name: '+server.ts', role: 'HTTP endpoint. Export GET/POST/PUT/PATCH/DELETE functions.' },\n" +
		"\t\t{ name: '+error.svelte', role: 'Error boundary for this subtree. Receives page.error.' }\n" +
		"\t];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.4 — File-based routing\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Every folder under \u003ccode\u003esrc/routes/\u003c/code\u003e maps to a URL.\n" +
		"\t\t\u003ccode\u003e+page.svelte\u003c/code\u003e is the page itself. \u003ccode\u003e+layout.svelte\u003c/code\u003e wraps every child.\n" +
		"\t\t\u003ccode\u003e+error.svelte\u003c/code\u003e handles errors in that subtree. You don't write a route table — the\n" +
		"\t\tfile system IS the route table.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eRoute inventory (sampled)\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"routes\"\u003e\n" +
		"\t\t\t{#each routes as route (route.path)}\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ccode\u003e{route.path}\u003c/code\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003e\u003ccode\u003e{route.url}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eSpecial file names\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"routes\"\u003e\n" +
		"\t\t\t{#each specials as s (s.name)}\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cdt\u003e\u003ccode\u003e{s.name}\u003c/code\u003e\u003c/dt\u003e\n" +
		"\t\t\t\t\t\u003cdd\u003e{s.role}\u003c/dd\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eThe filesystem under \u003ccode\u003esrc/routes/\u003c/code\u003e defines every URL.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eFiles starting with \u003ccode\u003e+\u003c/code\u003e are SvelteKit-reserved; other files are just colocated modules.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eEvery route can have its own page, layout, load, server load, endpoint, and error boundary.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.4 — File-based routing</h1>
	<p class="concept">
		<strong>Concept.</strong> Every folder under <code>src/routes/</code> maps to a URL.
		<code>+page.svelte</code> is the page itself. <code>+layout.svelte</code> wraps every child.
		<code>+error.svelte</code> handles errors in that subtree. You don't write a route table — the
		file system IS the route table.
	</p>

	<div class="build">
		<h3 class="sub">Route inventory (sampled)</h3>
		<dl class="routes">
			{#each routes as route (route.path)}
				<div class="row">
					<dt><code>{route.path}</code></dt>
					<dd><code>{route.url}</code></dd>
				</div>
			{/each}
		</dl>

		<h3 class="sub">Special file names</h3>
		<dl class="routes">
			{#each specials as s (s.name)}
				<div class="row">
					<dt><code>{s.name}</code></dt>
					<dd>{s.role}</dd>
				</div>
			{/each}
		</dl>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment teaches a routing rule by breaking it. Undo each change before trying the next.</p>
	<ol class="experiments">
		<li><strong>Create a folder <code>src/routes/test/</code> with no <code>+page.svelte</code> inside it and navigate to <code>/test</code>.</strong> SvelteKit returns a 404 because a folder without a <code>+page.svelte</code> does not define a route. The folder alone is not enough — the special file is what registers the URL.</li>
		<li><strong>Place a file named <code>helper.svelte</code> (no <code>+</code> prefix) inside a route folder and navigate to that path.</strong> Nothing happens — the file is ignored by the router and treated as a colocated module. This proves that only files prefixed with <code>+</code> participate in routing; everything else is invisible to SvelteKit.</li>
		<li><strong>Create two folders that resolve to the same URL, for example <code>src/routes/(a)/demo/+page.svelte</code> and <code>src/routes/(b)/demo/+page.svelte</code>.</strong> SvelteKit throws a build error about conflicting routes, because two route groups produce the same <code>/demo</code> path. This reveals that route groups strip their parenthetical name from the URL.</li>
		<li><strong>Rename <code>+page.server.ts</code> to <code>+page.server.js</code> and try to use TypeScript types inside it.</strong> The file runs fine as plain JavaScript, but you lose type checking on <code>PageServerLoad</code>. This shows that the file extension controls the language, not the routing — SvelteKit recognizes both <code>.ts</code> and <code>.js</code> variants of every special file.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit's file-based router eliminates the need for a centralized route configuration file. Every folder under <code>src/routes/</code> maps directly to a URL path, and the presence of a <code>+page.svelte</code> file inside that folder is what makes the route exist. This one-to-one mapping between filesystem structure and URL hierarchy means you can read the URL space of your application by browsing the directory tree.</p>
	<p class="prose">Each route folder can contain up to eight special files, all distinguished by the <code>+</code> prefix: <code>+page.svelte</code> for the component, <code>+page.ts</code> and <code>+page.server.ts</code> for universal and server-only load functions, <code>+layout.svelte</code> and its load counterparts for wrapping layouts, <code>+server.ts</code> for standalone API endpoints, and <code>+error.svelte</code> for error boundaries. Any file without the <code>+</code> prefix is treated as a regular colocated module, which means you can keep helper components, utilities, and tests right next to the routes they serve.</p>
	<p class="prose">Route groups — folders wrapped in parentheses like <code>(marketing)</code> — let you share a layout across multiple routes without adding a segment to the URL. This is particularly useful when different sections of your application need different chrome (navigation bars, sidebars, footers) but their URLs should not reflect that structural grouping. The group name is stripped during URL resolution, so <code>(marketing)/pricing/+page.svelte</code> serves <code>/pricing</code>, not <code>/(marketing)/pricing</code>.</p>
	<p class="next">Next, you will see how layouts nest and compose to create shared UI shells.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.sub { margin-block-start: 0; font-size: var(--text-lg); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.routes { display: flex; flex-direction: column; gap: var(--space-xs); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; }
	dd { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.5; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.row { display: grid; grid-template-columns: 18rem 1fr; gap: var(--space-md); align-items: start; }
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
