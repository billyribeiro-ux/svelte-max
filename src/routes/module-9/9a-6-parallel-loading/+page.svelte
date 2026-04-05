<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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
</style>
