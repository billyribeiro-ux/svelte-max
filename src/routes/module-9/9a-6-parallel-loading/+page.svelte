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
		"	\u003ch1\u003e9A.6 — Parallel data loading\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e If your load function needs data from multiple sources, do not\n" +
		"		\u003ccode\u003eawait\u003c/code\u003e each one sequentially — that is a waterfall and sums the latencies. Instead,\n" +
		"		call all the async functions first and \u003ccode\u003ePromise.all\u003c/code\u003e their results. Each returning promise\n" +
		"		runs concurrently, so the total time matches the slowest fetch — not the sum of all of them.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eUser\u003c/span\u003e\n" +
		"			\u003cspan\u003e{data.user.name} — {data.user.role}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eStats\u003c/span\u003e\n" +
		"			\u003cspan\u003e{data.stats.commits} commits, {data.stats.stars} stars\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eActivity\u003c/span\u003e\n" +
		"			\u003cul class=\"activity\"\u003e\n" +
		"				{#each data.activity as item (item.id)}\n" +
		"					\u003cli\u003e{item.text}\u003c/li\u003e\n" +
		"				{/each}\n" +
		"			\u003c/ul\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"row timing\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eDuration\u003c/span\u003e\n" +
		"			\u003cspan\u003e\u003cstrong\u003e{data.durationMs}ms\u003c/strong\u003e — matches the slowest fetch (~150ms), not the sum (~410ms)\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ePromise.all\u003c/code\u003e runs fetches concurrently\u003c/li\u003e\n" +
		"		\u003cli\u003eTotal duration equals the slowest promise, not the sum\u003c/li\u003e\n" +
		"		\u003cli\u003eSequential \u003ccode\u003eawait\u003c/code\u003e creates a waterfall — avoid it for independent data\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003eperformance.now()\u003c/code\u003e to measure load duration precisely\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.6 — Parallel data loading</h1>
	<p class="concept">
		<strong>Concept.</strong> If your load function needs data from multiple sources, do not
		<code>await</code> each one sequentially — that is a waterfall and sums the latencies. Instead,
		call all the async functions first and <code>Promise.all</code> their results. Each returning promise
		runs concurrently, so the total time matches the slowest fetch — not the sum of all of them.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">User</span>
			<span>{data.user.name} — {data.user.role}</span>
		</div>
		<div class="row">
			<span class="label">Stats</span>
			<span>{data.stats.commits} commits, {data.stats.stars} stars</span>
		</div>
		<div class="row">
			<span class="label">Activity</span>
			<ul class="activity">
				{#each data.activity as item (item.id)}
					<li>{item.text}</li>
				{/each}
			</ul>
		</div>
		<div class="row timing">
			<span class="label">Duration</span>
			<span><strong>{data.durationMs}ms</strong> — matches the slowest fetch (~150ms), not the sum (~410ms)</span>
		</div>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>Promise.all</code> runs fetches concurrently</li>
		<li>Total duration equals the slowest promise, not the sum</li>
		<li>Sequential <code>await</code> creates a waterfall — avoid it for independent data</li>
		<li>Use <code>performance.now()</code> to measure load duration precisely</li>
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
		color: var(--color-text);
	}
	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
	.activity {
		list-style: disc;
		padding-inline-start: var(--space-lg);
		margin: 0;
	}
	.timing strong {
		color: var(--color-brand);
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
		.row {
			flex-direction: row;
			align-items: baseline;
			gap: var(--space-md);
		}
		.label {
			flex: 0 0 6rem;
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
