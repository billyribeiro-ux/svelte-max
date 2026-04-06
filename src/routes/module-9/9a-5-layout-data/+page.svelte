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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Layout loaders run for the layout and every child route.</li>
		<li>Layout data is automatically merged into child page <code>data</code>.</li>
		<li>Call <code>await parent()</code> inside a child loader to read layout data directly.</li>
		<li>Layout data is cached across sibling navigations until invalidated.</li>
	</ul>
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
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-md);
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
