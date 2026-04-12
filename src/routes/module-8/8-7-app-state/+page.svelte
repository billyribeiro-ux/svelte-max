<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { page } from '$app/state';

	// <svelte:document> — track the currently focused element reactively
	let activeEl: Element | null = $state(null);

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { page } from '$app/state';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e8.7 — $app/state — reactive page state\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eimport {'{ page }'} from '$app/state'\u003c/code\u003e gives a reactive\n" +
		"\t\tobject: \u003ccode\u003epage.url\u003c/code\u003e, \u003ccode\u003epage.params\u003c/code\u003e, \u003ccode\u003epage.data\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003epage.status\u003c/code\u003e, \u003ccode\u003epage.state\u003c/code\u003e, \u003ccode\u003epage.error\u003c/code\u003e. Reading\n" +
		"\t\t\u003ccode\u003epage.url.pathname\u003c/code\u003e inside a derived or template makes that read reactive — the\n" +
		"\t\tvalue updates on navigation without a subscription. This replaces the deprecated\n" +
		"\t\t\u003ccode\u003e$page\u003c/code\u003e store from kit pre-2.12.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eImport\u003c/h3\u003e\n" +
		"\t\t\u003cpre\u003e\u003ccode\u003e{\"import { page } from '$app/state';\"}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eLive page state\u003c/h3\u003e\n" +
		"\t\t\u003cdl class=\"state\"\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003epage.url.pathname\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{page.url.pathname}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003epage.url.search\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{page.url.search || '(empty)'}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003epage.url.searchParams.get('demo')\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{page.url.searchParams.get('demo') ?? '(null)'}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003epage.params\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{JSON.stringify(page.params)}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\u003cdt\u003epage.status\u003c/dt\u003e\n" +
		"\t\t\t\t\u003cdd\u003e\u003ccode\u003e{page.status}\u003c/code\u003e\u003c/dd\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t\u003c/dl\u003e\n" +
		"\n" +
		"\t\t\u003ch3 class=\"sub\"\u003eTry it\u003c/h3\u003e\n" +
		"\t\t\u003cnav class=\"links\"\u003e\n" +
		"\t\t\t\u003ca href=\"?demo=hello\"\u003e?demo=hello\u003c/a\u003e\n" +
		"\t\t\t\u003ca href=\"?demo=world\"\u003e?demo=world\u003c/a\u003e\n" +
		"\t\t\t\u003ca href=\"?\"\u003eclear\u003c/a\u003e\n" +
		"\t\t\u003c/nav\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003e\n" +
		"\t\t\tClick a link — the display above updates instantly, no full reload. SvelteKit intercepts the\n" +
		"\t\t\tnavigation, updates \u003ccode\u003epage.url\u003c/code\u003e, and the template re-reads the new value.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$app/state\u003c/code\u003e exposes a reactive \u003ccode\u003epage\u003c/code\u003e object — no store subscription needed.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReading \u003ccode\u003epage.url\u003c/code\u003e in markup or in a \u003ccode\u003e$derived\u003c/code\u003e is automatically reactive.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eIt replaces the deprecated \u003ccode\u003e$page\u003c/code\u003e store from \u003ccode\u003e$app/stores\u003c/code\u003e.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse it for pathname-aware nav highlights, query-string state, error pages, and more.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<!-- svelte:document — bind:activeElement tracks which element has focus -->
<svelte:document bind:activeElement={activeEl} />

<section class="page">
	<h1>8.7 — $app/state — reactive page state</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>import {'{ page }'} from '$app/state'</code> gives a reactive
		object: <code>page.url</code>, <code>page.params</code>, <code>page.data</code>,
		<code>page.status</code>, <code>page.state</code>, <code>page.error</code>. Reading
		<code>page.url.pathname</code> inside a derived or template makes that read reactive — the
		value updates on navigation without a subscription. This replaces the deprecated
		<code>$page</code> store from kit pre-2.12.
	</p>

	<div class="build">
		<h3 class="sub">Import</h3>
		<pre><code>{"import { page } from '$app/state';"}</code></pre>

		<h3 class="sub">Live page state</h3>
		<dl class="state">
			<div class="row">
				<dt>page.url.pathname</dt>
				<dd><code>{page.url.pathname}</code></dd>
			</div>
			<div class="row">
				<dt>page.url.search</dt>
				<dd><code>{page.url.search || '(empty)'}</code></dd>
			</div>
			<div class="row">
				<dt>page.url.searchParams.get('demo')</dt>
				<dd><code>{page.url.searchParams.get('demo') ?? '(null)'}</code></dd>
			</div>
			<div class="row">
				<dt>page.params</dt>
				<dd><code>{JSON.stringify(page.params)}</code></dd>
			</div>
			<div class="row">
				<dt>page.status</dt>
				<dd><code>{page.status}</code></dd>
			</div>
		</dl>

		<h3 class="sub">Try it</h3>
		<nav class="links">
			<a href="?demo=hello">?demo=hello</a>
			<a href="?demo=world">?demo=world</a>
			<a href="?">clear</a>
		</nav>
		<p class="hint">
			Click a link — the display above updates instantly, no full reload. SvelteKit intercepts the
			navigation, updates <code>page.url</code>, and the template re-reads the new value.
		</p>

		<h3 class="sub">Active element (via <code>&lt;svelte:document&gt;</code>)</h3>
		<p class="hint">
			Focus changes tracked via <code>bind:activeElement</code>:
			<code>{activeEl?.tagName ?? 'null'}{activeEl?.id ? `#${activeEl.id}` : ''}</code>
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment exposes an edge of the reactive page state API. Undo before proceeding.</p>
	<ol class="experiments">
		<li><strong>Try to assign to <code>page.url.pathname</code> directly (e.g., <code>page.url.pathname = '/foo'</code>).</strong> TypeScript flags this as read-only, and at runtime the assignment is silently ignored. The page object is a read-only reactive proxy — you navigate by calling <code>goto()</code>, not by mutating state. This enforces a unidirectional data flow between the router and your components.</li>
		<li><strong>Read <code>page.url</code> inside a plain function called outside of a reactive context (e.g., in a <code>setTimeout</code> callback stored at module load).</strong> The value is stale — it captured the URL at the time the function was created, not at the time it runs. Reactivity only tracks reads that happen during component rendering or inside <code>$derived</code>/<code>$effect</code>.</li>
		<li><strong>Import from the deprecated <code>$app/stores</code> instead of <code>$app/state</code> and use <code>$page.url.pathname</code>.</strong> It still works in Svelte 5, but the compiler emits a deprecation warning. Comparing the two side by side shows that the new <code>page</code> object from <code>$app/state</code> requires no <code>$</code> prefix and no store subscription — it is a plain reactive object.</li>
		<li><strong>Access <code>page.url.searchParams</code> on the server (in a <code>+page.server.ts</code> load function) by importing from <code>$app/state</code>.</strong> The import fails because <code>$app/state</code> is a client-only module. On the server, you access URL information through the <code>event</code> object passed to your load function, not through the page state singleton.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>page</code> object from <code>$app/state</code> is a reactive proxy that exposes the current URL, route parameters, load data, HTTP status, navigation state, and any error for the active page. Reading any of its properties inside a template expression or a <code>$derived</code> declaration automatically subscribes to changes, so the UI updates on every client-side navigation without manual event listeners or store subscriptions.</p>
	<p class="prose">This reactive page object replaces the deprecated <code>$page</code> store from <code>$app/stores</code>. The key difference is ergonomic: <code>page.url.pathname</code> is a plain property access, not a store auto-subscription requiring the <code>$</code> prefix. Under the hood it uses Svelte 5's fine-grained reactivity, meaning only the specific properties you read are tracked as dependencies, leading to more precise re-renders.</p>
	<p class="prose">Common patterns include highlighting the active link in a navigation bar by comparing <code>page.url.pathname</code> against each link's <code>href</code>, reading query parameters with <code>page.url.searchParams</code> for filter or search UIs, and displaying error information from <code>page.error</code> in custom error pages. Because the object is read-only, all mutations must go through SvelteKit's navigation functions like <code>goto()</code> or through <code>&lt;a&gt;</code> link clicks, preserving the unidirectional flow from router to UI.</p>
	<p class="next">Next, you will learn about programmatic navigation and lifecycle hooks in <code>$app/navigation</code>.</p>
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
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	pre code { background: transparent; padding: 0; font-size: inherit; }
	.state { display: flex; flex-direction: column; gap: var(--space-xs); margin: 0; }
	.row { display: flex; flex-direction: column; gap: var(--space-xs); padding: var(--space-sm); background: var(--color-surface-2); border-radius: var(--radius-md); border: 1px solid var(--color-border); }
	dt { font-weight: 600; font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-text-muted); }
	dd { margin: 0; }
	.links { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
	.links a { padding: var(--space-xs) var(--space-sm); background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-md); text-decoration: none; font-size: var(--text-sm); transition: background var(--dur-fast) var(--ease-out); }
	.links a:hover { background: var(--color-brand-dim); }
	.hint { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); line-height: 1.6; }
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.row { display: grid; grid-template-columns: 18rem 1fr; gap: var(--space-md); align-items: center; }
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
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
