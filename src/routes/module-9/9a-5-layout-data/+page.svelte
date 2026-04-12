<script lang="ts">
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.5 — Layout data\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003e+layout.ts\u003c/code\u003e and \u003ccode\u003e+layout.server.ts\u003c/code\u003e run for\n" +
		"		the layout and every child route beneath it. Their return value is available to the layout\n" +
		"		component \u003cem\u003eand\u003c/em\u003e merged into each child's \u003ccode\u003edata\u003c/code\u003e. Use layouts for data every\n" +
		"		child needs — current user, feature flags, preferences. Inside a child loader, call\n" +
		"		\u003ccode\u003eawait parent()\u003c/code\u003e to read the layout's data explicitly. The layout loader is\n" +
		"		cached across sibling navigations unless invalidated.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eFrom layout (merged automatically)\u003c/span\u003e\n" +
		"			\u003ccode\u003epreferences.theme = {data.preferences.theme}\u003c/code\u003e\n" +
		"			\u003ccode\u003epreferences.locale = {data.preferences.locale}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eFrom this page\u003c/span\u003e\n" +
		"			\u003ccode\u003e{data.pageNote}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eRead via parent() inside the page loader\u003c/span\u003e\n" +
		"			\u003ccode\u003einheritedLocale = {data.inheritedLocale}\u003c/code\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"note\"\u003e\n" +
		"			Notice \u003ccode\u003edata.preferences\u003c/code\u003e is available here even though this page's loader\n" +
		"			never returned it — SvelteKit merged the layout's return value into the page's\n" +
		"			\u003ccode\u003edata\u003c/code\u003e. \u003ccode\u003eparent()\u003c/code\u003e gives the page loader explicit access when it\n" +
		"			needs to derive new values from layout state.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eLayout loaders run for the layout and every child route.\u003c/li\u003e\n" +
		"		\u003cli\u003eLayout data is automatically merged into child page \u003ccode\u003edata\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eCall \u003ccode\u003eawait parent()\u003c/code\u003e inside a child loader to read layout data directly.\u003c/li\u003e\n" +
		"		\u003cli\u003eLayout data is cached across sibling navigations until invalidated.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.5 — Layout data</h1>

	<p class="concept">
		<strong>Concept.</strong> <code>+layout.ts</code> and <code>+layout.server.ts</code> run for
		the layout and every child route beneath it. Their return value is available to the layout
		component <em>and</em> merged into each child's <code>data</code>. Use layouts for data every
		child needs — current user, feature flags, preferences. Inside a child loader, call
		<code>await parent()</code> to read the layout's data explicitly. The layout loader is
		cached across sibling navigations unless invalidated.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">From layout (merged automatically)</span>
			<code>preferences.theme = {data.preferences.theme}</code>
			<code>preferences.locale = {data.preferences.locale}</code>
		</div>
		<div class="row">
			<span class="label">From this page</span>
			<code>{data.pageNote}</code>
		</div>
		<div class="row">
			<span class="label">Read via parent() inside the page loader</span>
			<code>inheritedLocale = {data.inheritedLocale}</code>
		</div>
		<p class="note">
			Notice <code>data.preferences</code> is available here even though this page's loader
			never returned it — SvelteKit merged the layout's return value into the page's
			<code>data</code>. <code>parent()</code> gives the page loader explicit access when it
			needs to derive new values from layout state.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Delete the <code>+layout.ts</code> loader entirely.</strong> The page still renders, but <code>data.preferences</code> is <code>undefined</code> because no layout data is being merged in. This shows that layout data is opt-in, not magic.</li>
		<li><strong>Return a property from the page loader with the same key as a layout property.</strong> The page's value wins because page data overrides layout data during merge. This can cause subtle bugs if key names collide unintentionally.</li>
		<li><strong>Remove <code>await parent()</code> from the page loader and try to access <code>inheritedLocale</code>.</strong> The value is no longer available because the page loader never read the layout data explicitly. Layout data is merged into the component's <code>data</code> automatically, but accessing it inside the loader requires <code>parent()</code>.</li>
		<li><strong>Add <code>await parent()</code> at the top of the layout loader itself.</strong> SvelteKit warns about a potential deadlock because the layout loader is awaiting its own parent before returning, creating a circular dependency chain.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Layout loaders (<code>+layout.ts</code> or <code>+layout.server.ts</code>) run once for the layout and automatically feed their return value into every child route beneath them. This makes them ideal for data every page needs: the current user, feature flags, navigation items, or application-wide preferences.</p>
	<p class="prose">SvelteKit merges layout data into the child page's <code>data</code> prop without any extra work from you. If a child page loader also needs to read that layout data during its own computation, it can call <code>await parent()</code> to get the resolved layout data explicitly. This is the only way to derive new values from layout state inside a child loader.</p>
	<p class="prose">Layout data is cached across sibling navigations. When a user navigates between child routes under the same layout, the layout loader does not re-run unless you explicitly invalidate it. This makes navigations feel snappy because only the page-specific data is fetched.</p>
	<p class="next">Next up: running multiple fetches in parallel to eliminate waterfalls.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
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
	@media (min-inline-size: 768px) {
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
