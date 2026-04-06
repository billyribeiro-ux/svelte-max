<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();

	let refreshing = $state(false);

	async function refresh() {
		refreshing = true;
		await invalidate('app:demo-timer');
		refreshing = false;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { invalidate } from '$app/navigation';\n" +
		"	import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\n" +
		"	let refreshing = $state(false);\n" +
		"\n" +
		"	async function refresh() {\n" +
		"		refreshing = true;\n" +
		"		await invalidate('app:demo-timer');\n" +
		"		refreshing = false;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.7 — depends() and invalidate()\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e By default, loads re-run when their route params change. You can explicitly\n" +
		"		register a dependency key with \u003ccode\u003edepends('app:weather')\u003c/code\u003e inside load. From a component,\n" +
		"		calling \u003ccode\u003einvalidate('app:weather')\u003c/code\u003e from \u003ccode\u003e$app/navigation\u003c/code\u003e tells SvelteKit to\n" +
		"		re-run every load that depends on that key. \u003ccode\u003einvalidateAll()\u003c/code\u003e re-runs everything. Use custom\n" +
		"		dependency keys to scope invalidation precisely.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eValue\u003c/span\u003e\n" +
		"			\u003cspan class=\"value\"\u003e{data.value}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eFetched at\u003c/span\u003e\n" +
		"			\u003cspan class=\"ts\"\u003e{data.fetchedAt}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cbutton type=\"button\" onclick={refresh} disabled={refreshing}\u003e\n" +
		"			{refreshing ? 'Refreshing...' : 'Refresh'}\n" +
		"		\u003c/button\u003e\n" +
		"		\u003cp class=\"hint\"\u003e\n" +
		"			Click refresh to call \u003ccode\u003einvalidate('app:demo-timer')\u003c/code\u003e. SvelteKit re-runs this route's\n" +
		"			loader because it declared \u003ccode\u003edepends('app:demo-timer')\u003c/code\u003e, and a new random value\n" +
		"			streams back in.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003edepends(key)\u003c/code\u003e registers a custom dependency inside load\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003einvalidate(key)\u003c/code\u003e re-runs every load that depends on that key\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003einvalidateAll()\u003c/code\u003e re-runs every active loader\u003c/li\u003e\n" +
		"		\u003cli\u003eNamespace your keys (e.g. \u003ccode\u003eapp:*\u003c/code\u003e) to avoid collisions\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.7 — depends() and invalidate()</h1>
	<p class="concept">
		<strong>Concept.</strong> By default, loads re-run when their route params change. You can explicitly
		register a dependency key with <code>depends('app:weather')</code> inside load. From a component,
		calling <code>invalidate('app:weather')</code> from <code>$app/navigation</code> tells SvelteKit to
		re-run every load that depends on that key. <code>invalidateAll()</code> re-runs everything. Use custom
		dependency keys to scope invalidation precisely.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">Value</span>
			<span class="value">{data.value}</span>
		</div>
		<div class="row">
			<span class="label">Fetched at</span>
			<span class="ts">{data.fetchedAt}</span>
		</div>
		<button type="button" onclick={refresh} disabled={refreshing}>
			{refreshing ? 'Refreshing...' : 'Refresh'}
		</button>
		<p class="hint">
			Click refresh to call <code>invalidate('app:demo-timer')</code>. SvelteKit re-runs this route's
			loader because it declared <code>depends('app:demo-timer')</code>, and a new random value
			streams back in.
		</p>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>depends(key)</code> registers a custom dependency inside load</li>
		<li><code>invalidate(key)</code> re-runs every load that depends on that key</li>
		<li><code>invalidateAll()</code> re-runs every active loader</li>
		<li>Namespace your keys (e.g. <code>app:*</code>) to avoid collisions</li>
	</ul>
</section>

<style>
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
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
	.value {
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-brand);
		font-family: var(--font-mono);
	}
	.ts {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	button {
		align-self: flex-start;
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-lg);
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition: background var(--dur-sm) var(--ease-out);
	}
	button:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.6;
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
