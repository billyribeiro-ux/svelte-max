<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Item = { id: number; name: string; value: number };\n" +
		"\n" +
		"	let sortInvocations = $state(0);\n" +
		"	let unrelatedCounter = $state(0);\n" +
		"\n" +
		"	const items: Item[] = Array.from({ length: 1000 }, (_, i) =\u003e ({\n" +
		"		id: i,\n" +
		"		name: `Item ${String(i).padStart(4, '0')}`,\n" +
		"		value: Math.round(Math.random() * 10000)\n" +
		"	}));\n" +
		"\n" +
		"	let sortDirection = $state\u003c'asc' | 'desc'\u003e('asc');\n" +
		"\n" +
		"	const sortedItems = $derived.by(() =\u003e {\n" +
		"		sortInvocations++;\n" +
		"		const sorted = [...items].sort((a, b) =\u003e\n" +
		"			sortDirection === 'asc' ? a.value - b.value : b.value - a.value\n" +
		"		);\n" +
		"		return sorted;\n" +
		"	});\n" +
		"\n" +
		"	const top10 = $derived(sortedItems.slice(0, 10));\n" +
		"\n" +
		"	function toggleSort() {\n" +
		"		sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';\n" +
		"	}\n" +
		"\n" +
		"	function incrementUnrelated() {\n" +
		"		unrelatedCounter++;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.5 — Memoization with $derived\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003e\u003ccode\u003e$derived\u003c/code\u003e\u003c/strong\u003e provides natural memoization in Svelte 5. An expensive\n" +
		"		computation inside \u003ccode\u003e$derived.by()\u003c/code\u003e only re-runs when its tracked inputs actually change.\n" +
		"		Unlike \u003ccode\u003e$effect\u003c/code\u003e, derived values are \u003cstrong\u003esynchronous and lazy\u003c/strong\u003e — they\n" +
		"		compute only when read, and cache until a dependency changes.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eHow It Works\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cul\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003e$derived(expr)\u003c/code\u003e\u003c/strong\u003e — re-evaluates the expression when any reactive value in it changes\u003c/li\u003e\n" +
		"			\u003cli\u003e\u003cstrong\u003e\u003ccode\u003e$derived.by(fn)\u003c/code\u003e\u003c/strong\u003e — same but for multi-line computations (like sorting 1000 items)\u003c/li\u003e\n" +
		"			\u003cli\u003eThe result is \u003cstrong\u003ecached\u003c/strong\u003e — reading it multiple times does not re-compute\u003c/li\u003e\n" +
		"			\u003cli\u003eChanging an \u003cstrong\u003eunrelated\u003c/strong\u003e state value does NOT trigger re-computation\u003c/li\u003e\n" +
		"		\u003c/ul\u003e\n" +
		"		\u003cpre\u003e{`const sorted = $derived.by(() =\u003e {\n" +
		"  // Only re-runs when 'items' or 'direction' changes\n" +
		"  return [...items].sort((a, b) =\u003e\n" +
		"    direction === 'asc' ? a.value - b.value : b.value - a.value\n" +
		"  );\n" +
		"});`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo: 1000-Item Sort\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Below, 1000 items are sorted inside a \u003ccode\u003e$derived.by()\u003c/code\u003e. The invocation counter\n" +
		"			tracks how many times the sort runs. Toggle sort direction to see it increment.\n" +
		"			Then click \"Increment Unrelated\" — the counter should \u003cstrong\u003enot\u003c/strong\u003e increase,\n" +
		"			proving the sort does not re-run.\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003cbutton class=\"demo-btn\" onclick={toggleSort}\u003e\n" +
		"				Sort: {sortDirection === 'asc' ? 'Ascending' : 'Descending'}\n" +
		"			\u003c/button\u003e\n" +
		"			\u003cbutton class=\"demo-btn secondary\" onclick={incrementUnrelated}\u003e\n" +
		"				Increment Unrelated ({unrelatedCounter})\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"stats\"\u003e\n" +
		"			\u003cdiv class=\"stat\"\u003e\n" +
		"				\u003cspan class=\"stat-label\"\u003eSort invocations\u003c/span\u003e\n" +
		"				\u003cspan class=\"stat-value\"\u003e{sortInvocations}\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"stat\"\u003e\n" +
		"				\u003cspan class=\"stat-label\"\u003eUnrelated counter\u003c/span\u003e\n" +
		"				\u003cspan class=\"stat-value\"\u003e{unrelatedCounter}\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"stat\"\u003e\n" +
		"				\u003cspan class=\"stat-label\"\u003eSort direction\u003c/span\u003e\n" +
		"				\u003cspan class=\"stat-value\"\u003e{sortDirection}\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003ch4\u003eTop 10 Items\u003c/h4\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Replace <code>$derived.by()</code> with a plain function call in the template.</strong> The expensive computation runs on every render cycle, not just when its inputs change, causing visible lag when unrelated state updates.</li>
		<li><strong>Change an unrelated <code>$state</code> variable and check if the derived computation re-runs.</strong> It does not, proving that Svelte only re-computes when the specific tracked dependencies change, not on every state change.</li>
		<li><strong>Read a <code>$state</code> variable inside <code>$derived.by()</code> that you did not intend to track.</strong> The derived value now re-computes whenever that variable changes too, because Svelte automatically tracks every reactive read inside the callback.</li>
		<li><strong>Wrap the accidental dependency in <code>untrack()</code>.</strong> The derived value no longer re-computes when that variable changes, proving that <code>untrack()</code> excludes specific reads from the dependency graph.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>$derived.by()</code> is Svelte's memoization primitive. It takes a callback that performs an expensive computation, caches the result, and only re-runs when the reactive values read inside the callback change. This is the equivalent of React's <code>useMemo</code>, but without a manual dependency array because Svelte tracks dependencies automatically.</p>
	<p class="prose">The key insight is that Svelte's reactivity system is fine-grained: changing an unrelated <code>$state</code> variable does not trigger re-computation of a derived value. Only the specific values read inside the <code>$derived.by()</code> callback are tracked, so the expensive work happens as rarely as possible.</p>
	<p class="prose">If a derived computation accidentally tracks a dependency you do not want, wrap the read in <code>untrack()</code> to exclude it. This gives you precise control over when recomputations happen, letting you balance correctness with performance in complex reactive graphs.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-6-reusable-actions">12.6 — Reusable actions</a> — attach reusable DOM behaviour to elements.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
