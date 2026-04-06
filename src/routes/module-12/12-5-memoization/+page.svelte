<script lang="ts">
	type Item = { id: number; name: string; value: number };

	let sortInvocations = $state(0);
	let unrelatedCounter = $state(0);

	const items: Item[] = Array.from({ length: 1000 }, (_, i) => ({
		id: i,
		name: `Item ${String(i).padStart(4, '0')}`,
		value: Math.round(Math.random() * 10000)
	}));

	let sortDirection = $state<'asc' | 'desc'>('asc');

	const sortedItems = $derived.by(() => {
		sortInvocations++;
		const sorted = [...items].sort((a, b) =>
			sortDirection === 'asc' ? a.value - b.value : b.value - a.value
		);
		return sorted;
	});

	const top10 = $derived(sortedItems.slice(0, 10));

	function toggleSort() {
		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
	}

	function incrementUnrelated() {
		unrelatedCounter++;
	}
</script>

<section class="page">
	<h1>12.5 — Memoization with $derived</h1>

	<p class="concept">
		<strong><code>$derived</code></strong> provides natural memoization in Svelte 5. An expensive
		computation inside <code>$derived.by()</code> only re-runs when its tracked inputs actually change.
		Unlike <code>$effect</code>, derived values are <strong>synchronous and lazy</strong> — they
		compute only when read, and cache until a dependency changes.
	</p>

	<h3>How It Works</h3>
	<div class="build">
		<ul>
			<li><strong><code>$derived(expr)</code></strong> — re-evaluates the expression when any reactive value in it changes</li>
			<li><strong><code>$derived.by(fn)</code></strong> — same but for multi-line computations (like sorting 1000 items)</li>
			<li>The result is <strong>cached</strong> — reading it multiple times does not re-compute</li>
			<li>Changing an <strong>unrelated</strong> state value does NOT trigger re-computation</li>
		</ul>
		<pre>{`const sorted = $derived.by(() => {
  // Only re-runs when 'items' or 'direction' changes
  return [...items].sort((a, b) =>
    direction === 'asc' ? a.value - b.value : b.value - a.value
  );
});`}</pre>
	</div>

	<h3>Demo: 1000-Item Sort</h3>
	<div class="build">
		<p class="concept">
			Below, 1000 items are sorted inside a <code>$derived.by()</code>. The invocation counter
			tracks how many times the sort runs. Toggle sort direction to see it increment.
			Then click "Increment Unrelated" — the counter should <strong>not</strong> increase,
			proving the sort does not re-run.
		</p>

		<div class="controls">
			<button class="demo-btn" onclick={toggleSort}>
				Sort: {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
			</button>
			<button class="demo-btn secondary" onclick={incrementUnrelated}>
				Increment Unrelated ({unrelatedCounter})
			</button>
		</div>

		<div class="stats">
			<div class="stat">
				<span class="stat-label">Sort invocations</span>
				<span class="stat-value">{sortInvocations}</span>
			</div>
			<div class="stat">
				<span class="stat-label">Unrelated counter</span>
				<span class="stat-value">{unrelatedCounter}</span>
			</div>
			<div class="stat">
				<span class="stat-label">Sort direction</span>
				<span class="stat-value">{sortDirection}</span>
			</div>
		</div>

		<h4>Top 10 Items</h4>
		<table class="items-table">
			<thead>
				<tr>
					<th>#</th>
					<th>Name</th>
					<th>Value</th>
				</tr>
			</thead>
			<tbody>
				{#each top10 as item, i}
					<tr>
						<td>{i + 1}</td>
						<td>{item.name}</td>
						<td>{item.value}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h3>Key Takeaway</h3>
	<p class="concept">
		<strong>Use <code>$derived.by()</code> for any expensive computation.</strong> It gives you
		React's <code>useMemo</code> behavior but without manually specifying dependencies — Svelte
		tracks them automatically. The cached value is always consistent and never stale.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li><code>$derived.by()</code> caches expensive computations and only re-runs when tracked inputs change.</li>
		<li>Changing an unrelated <code>$state</code> value does not trigger re-computation of a derived value.</li>
		<li>Svelte tracks dependencies automatically, unlike React's <code>useMemo</code> which requires a manual dependency array.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.controls {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
	}
	.demo-btn.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.stats {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		min-width: 120px;
	}
	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.stat-value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}
	.items-table {
		width: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	.items-table th,
	.items-table td {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		text-align: left;
	}
	.items-table th {
		background: var(--color-surface-2);
		font-weight: 600;
	}
	h4 { margin: 0; }
</style>
