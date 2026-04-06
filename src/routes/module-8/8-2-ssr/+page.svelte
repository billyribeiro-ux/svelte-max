<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// Computed at module load. On first request, this runs on the server.
	// On client navigation, it runs in the browser (this time in the module's client eval).
	const serverTime: string = new Date().toISOString();

	let browserTime: string = $state('(waiting for hydration...)');

	$effect(() => {
		browserTime = new Date().toISOString();
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"// Computed at module load. On first request, this runs on the server.\n" +
		"\t// On client navigation, it runs in the browser (this time in the module's client eval).\n" +
		"\tconst serverTime: string = new Date().toISOString();\n" +
		"\n" +
		"\tlet browserTime: string = $state('(waiting for hydration...)');\n" +
		"\n" +
		"\t$effect(() =\u003e {\n" +
		"\t\tbrowserTime = new Date().toISOString();\n" +
		"\t});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.2 — What SSR actually is\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e Server-Side Rendering means the server receives a request,\n" +
		"\t\truns the component to produce HTML, and sends the fully-rendered page. The browser sees real\n" +
		"\t\tcontent on first paint — not a blank \u003ccode\u003e&lt;div id=\"app\"&gt;\u003c/code\u003e. SSR is SvelteKit's default.\n" +
		"\t\tYou can disable per-route with \u003ccode\u003eexport const ssr = false\u003c/code\u003e or prerender at build time with\n" +
		"\t\t\u003ccode\u003eexport const prerender = true\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eSSR inspector\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"times\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003eModule-load time (server during SSR)\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{serverTime}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003eHydration time (browser)\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{browserTime}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tOpen DevTools → Network tab, filter to \u003ccode\u003eDoc\u003c/code\u003e, click the page response, and view\n" +
		"\t\t\tthe Response body — you'll see the full rendered HTML, not a shell. If SSR is working, the\n" +
		"\t\t\tserver time is older than the browser time by exactly the round-trip delay.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eSSR produces real HTML on first paint — good for SEO, perceived speed, and no-JS fallback.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eSvelteKit does SSR by default for every route.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eexport const ssr = false\u003c/code\u003e turns a route into an SPA page.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eexport const prerender = true\u003c/code\u003e renders the route at build time to static HTML.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eModule-level code runs on the server for SSR and again on the client during hydration.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>8.2 — What SSR actually is</h1>
	<p class="concept">
		<strong>Concept.</strong> Server-Side Rendering means the server receives a request,
		runs the component to produce HTML, and sends the fully-rendered page. The browser sees real
		content on first paint — not a blank <code>&lt;div id="app"&gt;</code>. SSR is SvelteKit's default.
		You can disable per-route with <code>export const ssr = false</code> or prerender at build time with
		<code>export const prerender = true</code>.
	</p>

	<div class="build">
		<h3 class="sub">SSR inspector</h3>
		<dl class="times">
			<div class="row">
				<dt>Module-load time (server during SSR)</dt>
				<dd><code>{serverTime}</code></dd>
			</div>
			<div class="row">
				<dt>Hydration time (browser)</dt>
				<dd><code>{browserTime}</code></dd>
			</div>
		</dl>
		<p class="hint">
			Open DevTools → Network tab, filter to <code>Doc</code>, click the page response, and view
			the Response body — you'll see the full rendered HTML, not a shell. If SSR is working, the
			server time is older than the browser time by exactly the round-trip delay.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment below exposes a different facet of SSR behavior. Revert after each one.</p>
	<ol class="experiments">
		<li><strong>Add <code>export const ssr = false</code> to the script block and hard-reload.</strong> View the page source in DevTools — you will see an empty shell with no rendered content. The server time disappears entirely because the component never runs on the server, proving that <code>ssr = false</code> turns the route into a pure client-side SPA page.</li>
		<li><strong>Reference <code>window.innerWidth</code> at the module level (outside <code>$effect</code>).</strong> The server will crash with a <code>window is not defined</code> error because module-level code runs on the server during SSR, where browser globals do not exist. This demonstrates why browser APIs must be guarded inside <code>$effect</code> or behind a <code>typeof window</code> check.</li>
		<li><strong>Add <code>export const prerender = true</code> and run <code>pnpm build</code>.</strong> The page is rendered once at build time. Refresh multiple times — the server timestamp never changes because the HTML was frozen during the build. This reveals the difference between SSR (per-request) and prerendering (build-time).</li>
		<li><strong>Set both <code>ssr = false</code> and <code>prerender = true</code> simultaneously.</strong> SvelteKit will error because prerendering requires SSR to produce the HTML. The conflict teaches you that prerendering is a specialization of SSR, not an alternative to it.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Server-Side Rendering means the server executes the Svelte component for every incoming request, producing complete HTML that the browser can display immediately. This eliminates the blank-page flash that plagues client-only SPAs, gives search engine crawlers real content to index, and provides a usable page even when JavaScript fails to load or is disabled. SvelteKit enables SSR by default on every route, so you get these benefits without opting in.</p>
	<p class="prose">The rendering mode is controlled per-route through exported constants. Setting <code>ssr = false</code> turns a route into a client-only page where the server sends an empty HTML skeleton and the browser does all the work. Setting <code>prerender = true</code> renders the page once at build time and serves the resulting static HTML, which is ideal for content that does not change between requests. These two knobs give you a spectrum from fully dynamic to fully static, and you can mix them freely across different routes in the same application.</p>
	<p class="prose">Because module-level code runs on the server during SSR, any reference to browser-only globals like <code>window</code>, <code>document</code>, or <code>localStorage</code> will crash the server. The safe pattern is to use <code>$effect</code> for browser-only logic, since effects only execute after hydration in the client. Understanding this server-client execution boundary is essential for writing components that work correctly in both environments.</p>
	<p class="next">Next, you will learn what hydration is and how Svelte wakes up server-rendered HTML in the browser.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); color: var(--color-text); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.sub { margin-block-start: 0; }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.times { display: flex; flex-direction: column; gap: var(--space-sm); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; font-size: var(--text-sm); color: var(--color-text-muted); }
	dd { margin: 0; }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
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
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
