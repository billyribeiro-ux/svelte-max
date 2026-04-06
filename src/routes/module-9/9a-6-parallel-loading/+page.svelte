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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Replace <code>Promise.all</code> with sequential <code>await</code> calls.</strong> The duration jumps from ~150ms to ~410ms because each fetch now waits for the previous one to complete before starting, creating a classic waterfall.</li>
		<li><strong>Use <code>Promise.allSettled</code> instead of <code>Promise.all</code>.</strong> The page still loads, but now a single failed fetch does not abort the others. The tradeoff is that you must check each result's <code>status</code> property to distinguish fulfilled from rejected.</li>
		<li><strong>Make one of the fetches throw an error inside <code>Promise.all</code>.</strong> The entire load function rejects and SvelteKit shows an error page, even though the other two fetches succeeded. This demonstrates the all-or-nothing behavior of <code>Promise.all</code>.</li>
		<li><strong>Remove <code>performance.now()</code> timing and try to estimate duration by feel.</strong> It is nearly impossible to tell 150ms from 400ms by eye, which is why measuring load duration with precise timers is essential for performance work.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">When your load function needs data from multiple independent sources, the order in which you <code>await</code> them matters enormously. Sequential awaits create a waterfall where each fetch must complete before the next begins, summing all latencies together. <code>Promise.all</code> fires every fetch at once and waits only for the slowest one.</p>
	<p class="prose">The rule is simple: if fetches do not depend on each other's results, kick them all off before awaiting any of them. The total load time drops from the sum of all latencies to just the maximum latency. In this demo, that is the difference between ~410ms and ~150ms.</p>
	<p class="prose">Use <code>performance.now()</code> before and after your parallel block to measure the actual duration. This data is invaluable for spotting regressions and proving to your team that the parallel pattern is paying off in real numbers.</p>
	<p class="next">Next up: fine-grained re-fetching with <code>depends()</code> and <code>invalidate()</code>.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
