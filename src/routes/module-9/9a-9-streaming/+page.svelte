<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
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
</style>
