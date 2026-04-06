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
		"	\u003ch1\u003e9A.9 — Streaming\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Normally \u003ccode\u003eload()\u003c/code\u003e awaits everything before returning, so the\n" +
		"		user waits for the slowest piece. If you return a non-awaited Promise as a property, SvelteKit streams\n" +
		"		the initial render immediately and pushes the resolved value when it is ready. The component uses\n" +
		"		\u003ccode\u003e{'{#await data.slow}'}\u003c/code\u003e to show a placeholder. Great for making the fast parts of a page\n" +
		"		feel instant.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"fast\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eFast (instant)\u003c/span\u003e\n" +
		"			\u003ch2\u003e{data.fast.title}\u003c/h2\u003e\n" +
		"			\u003cp\u003e{data.fast.headline}\u003c/p\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"slow\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eSlow (streamed)\u003c/span\u003e\n" +
		"			{#await data.slow}\n" +
		"				\u003cp class=\"loading\"\u003eLoading details...\u003c/p\u003e\n" +
		"			{:then slow}\n" +
		"				\u003cp\u003e{slow.details}\u003c/p\u003e\n" +
		"				\u003cp class=\"at\"\u003eResolved at {slow.at}\u003c/p\u003e\n" +
		"			{/await}\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"hint\"\u003e\n" +
		"			Reload the page and watch it happen: the top half appears instantly, then the bottom half streams\n" +
		"			in ~1.5s later. The server flushed HTML before the slow promise resolved.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhen to stream\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Stream when your page has both fast and slow data. Render the fast parts immediately (header,\n" +
		"		navigation, above-the-fold content) and stream the slow parts (analytics, historical comparisons,\n" +
		"		AI-generated summaries). The user sees useful content in &lt;1s instead of waiting 3s for everything.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eReturn a non-awaited Promise to enable streaming\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003e{'{#await}'}\u003c/code\u003e blocks to render placeholders\u003c/li\u003e\n" +
		"		\u003cli\u003eFast data feels instant; slow data streams in when ready\u003c/li\u003e\n" +
		"		\u003cli\u003eOnly use streaming when a page has a clear fast/slow split\u003c/li\u003e\n" +
		"		\u003cli\u003eBest candidates for streaming: analytics panels, AI-generated text, historical comparisons — anything slow that isn't above the fold\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.9 — Streaming</h1>
	<p class="concept">
		<strong>Concept.</strong> Normally <code>load()</code> awaits everything before returning, so the
		user waits for the slowest piece. If you return a non-awaited Promise as a property, SvelteKit streams
		the initial render immediately and pushes the resolved value when it is ready. The component uses
		<code>{'{#await data.slow}'}</code> to show a placeholder. Great for making the fast parts of a page
		feel instant.
	</p>

	<div class="build">
		<div class="fast">
			<span class="label">Fast (instant)</span>
			<h2>{data.fast.title}</h2>
			<p>{data.fast.headline}</p>
		</div>
		<div class="slow">
			<span class="label">Slow (streamed)</span>
			{#await data.slow}
				<p class="loading">Loading details...</p>
			{:then slow}
				<p>{slow.details}</p>
				<p class="at">Resolved at {slow.at}</p>
			{/await}
		</div>
		<p class="hint">
			Reload the page and watch it happen: the top half appears instantly, then the bottom half streams
			in ~1.5s later. The server flushed HTML before the slow promise resolved.
		</p>
	</div>

	<h3>When to stream</h3>
	<p class="concept">
		Stream when your page has both fast and slow data. Render the fast parts immediately (header,
		navigation, above-the-fold content) and stream the slow parts (analytics, historical comparisons,
		AI-generated summaries). The user sees useful content in &lt;1s instead of waiting 3s for everything.
	</p>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Return a non-awaited Promise to enable streaming</li>
		<li>Use <code>{'{#await}'}</code> blocks to render placeholders</li>
		<li>Fast data feels instant; slow data streams in when ready</li>
		<li>Only use streaming when a page has a clear fast/slow split</li>
		<li>Best candidates for streaming: analytics panels, AI-generated text, historical comparisons — anything slow that isn't above the fold</li>
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
	.fast,
	.slow {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
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
	h2 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}
	p {
		margin: 0;
		color: var(--color-text);
		line-height: 1.6;
	}
	.loading {
		color: var(--color-text-muted);
		font-style: italic;
	}
	.at {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.hint {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
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
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
