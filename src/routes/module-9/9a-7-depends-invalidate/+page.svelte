<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let refreshing = $state(false);

	async function refresh() {
		refreshing = true;
		await invalidate('app:demo-timer');
		refreshing = false;
	}
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
</style>
