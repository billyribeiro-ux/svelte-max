<script lang="ts">
	let query = $state('');
	let committed = $state('');
	let pending = $state(false);
	let commitCount = $state(0);

	const DEBOUNCE_MS = 300;

	$effect(() => {
		// Read query so the effect re-runs on every keystroke.
		const current = query;
		if (current === committed) {
			pending = false;
			return;
		}
		pending = true;
		const handle = setTimeout(() => {
			committed = current;
			pending = false;
			commitCount += 1;
		}, DEBOUNCE_MS);
		return () => clearTimeout(handle);
	});

	function clear(): void {
		query = '';
	}
</script>

<section class="page">
	<h1>5.8 — Debounce and throttle</h1>
	<p class="concept">
		<strong>Concept.</strong> Firing a handler on every keystroke is expensive if it hits the network or
		does heavy work. <code>Debounce</code> waits until the user stops typing for N ms, then fires once.
		<code>Throttle</code> fires at most every N ms regardless. Both use <code>setTimeout</code> under the
		hood. Debounce suits search-as-you-type; throttle suits scroll or resize listeners.
	</p>

	<div class="build">
		<label class="field">
			<span class="label">Search (debounced 300ms)</span>
			<input type="text" bind:value={query} placeholder="Type to search…" />
		</label>

		<div class="row">
			<div class="stat">
				<span class="k">Live query</span>
				<span class="v">{query || '—'}</span>
			</div>
			<div class="stat">
				<span class="k">Committed</span>
				<span class="v brand">{committed || '—'}</span>
			</div>
			<div class="stat">
				<span class="k">Commits</span>
				<span class="v brand">{commitCount}</span>
			</div>
		</div>

		<div class="status">
			{#if pending}
				<span class="pill pending">searching…</span>
			{:else if committed}
				<span class="pill idle">idle</span>
			{/if}
			<button type="button" class="clear" onclick={clear}>Clear</button>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Use <code>$effect</code> + <code>setTimeout</code> + a cleanup for debounce.</li>
		<li>Return <code>() =&gt; clearTimeout(handle)</code> so stale timers never fire.</li>
		<li>Debounce for typing; throttle for continuous streams like scroll.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
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
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	input {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-base);
		min-block-size: 44px;
	}
	input:focus {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	.row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.k {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.v {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.v.brand {
		color: var(--color-brand);
	}
	.status {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		padding: 2px var(--space-sm);
		border-radius: var(--radius-full);
		font-family: var(--font-mono);
	}
	.pill.pending {
		background: var(--color-warning);
		color: var(--color-surface);
	}
	.pill.idle {
		background: var(--color-success);
		color: var(--color-surface);
	}
	.clear {
		margin-inline-start: auto;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		min-block-size: 36px;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.row {
			grid-template-columns: repeat(3, 1fr);
		}
	}
</style>
