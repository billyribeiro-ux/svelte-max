<script lang="ts">
	import { untrack } from 'svelte';

	// --- Wrong way: re-runs on every keystroke ---
	let wrongQuery = $state('');
	let wrongResults = $state<string[]>([]);
	let wrongRunCount = $state(0);

	$effect(() => {
		const q = wrongQuery;
		if (q.length > 0) {
			wrongRunCount++;
			wrongResults = [`Result for "${q}" (run #${wrongRunCount})`];
		} else {
			wrongResults = [];
		}
	});

	// --- Right way: debounced with cleanup ---
	let rightQuery = $state('');
	let rightResults = $state<string[]>([]);
	let rightRunCount = $state(0);

	$effect(() => {
		const q = rightQuery;
		if (q.length === 0) {
			rightResults = [];
			return;
		}
		const timeout = setTimeout(() => {
			rightRunCount++;
			rightResults = [`Result for "${q}" (run #${rightRunCount})`];
		}, 300);
		return () => clearTimeout(timeout);
	});

	// --- untrack demo ---
	let trackedValue = $state('hello');
	let untrackedLog = $state('');
	let logCount = $state(0);
	let otherValue = $state(0);

	$effect(() => {
		const _tracked = trackedValue;
		const _untracked = untrack(() => otherValue);
		logCount++;
		untrackedLog = `Effect ran #${logCount} — tracked: "${_tracked}", untracked: ${_untracked}`;
	});
</script>

<section class="page">
	<h1>12.4 — $effect Performance</h1>

	<p class="concept">
		<strong>$effect</strong> automatically tracks every reactive value read inside it and re-runs
		when any dependency changes. This is powerful but can cause excessive re-runs if you are not
		careful. Use <strong>cleanup functions</strong> for debouncing, <strong><code>untrack()</code></strong>
		to exclude reads, and <strong><code>$inspect.trace()</code></strong> to debug which dependency triggered a re-run.
	</p>

	<h3>Wrong Way: Effect on Every Keystroke</h3>
	<div class="build">
		<p class="concept">
			This effect re-runs on <em>every single character</em> typed. For a search that triggers
			a network request, this would fire dozens of unnecessary API calls.
		</p>
		<label class="input-label">
			Search (no debounce):
			<input type="text" bind:value={wrongQuery} placeholder="Type here..." />
		</label>
		<div class="counter bad">Effect re-runs: <strong>{wrongRunCount}</strong></div>
		{#each wrongResults as result}
			<p class="result">{result}</p>
		{/each}
		<pre>{`// BAD: re-runs on every keystroke
$effect(() => {
  const q = query;       // tracked!
  fetchResults(q);       // fires every character
});`}</pre>
	</div>

	<h3>Right Way: Debounced with Cleanup</h3>
	<div class="build">
		<p class="concept">
			By returning a cleanup function that clears the timeout, the effect only executes the
			search after the user stops typing for 300ms.
		</p>
		<label class="input-label">
			Search (300ms debounce):
			<input type="text" bind:value={rightQuery} placeholder="Type here..." />
		</label>
		<div class="counter good">Effect re-runs: <strong>{rightRunCount}</strong></div>
		{#each rightResults as result}
			<p class="result">{result}</p>
		{/each}
		<pre>{`// GOOD: debounced via cleanup
$effect(() => {
  const q = query;       // tracked
  const timeout = setTimeout(() => {
    fetchResults(q);     // fires after 300ms pause
  }, 300);
  return () => clearTimeout(timeout);  // cleanup
});`}</pre>
	</div>

	<h3>untrack() — Exclude Dependencies</h3>
	<div class="build">
		<p class="concept">
			<code>untrack()</code> lets you read a reactive value inside an effect without adding it
			as a dependency. The effect below only re-runs when <code>trackedValue</code> changes,
			not when <code>otherValue</code> changes.
		</p>
		<label class="input-label">
			Tracked value:
			<input type="text" bind:value={trackedValue} />
		</label>
		<button class="demo-btn" onclick={() => otherValue++}>
			Increment untracked ({otherValue})
		</button>
		<div class="counter">{untrackedLog}</div>
		<pre>{`$effect(() => {
  const _tracked = trackedValue;              // dependency
  const _untracked = untrack(() => otherValue); // NOT a dependency
  console.log(_tracked, _untracked);
});`}</pre>
	</div>

	<h3>$inspect.trace()</h3>
	<div class="build">
		<p class="concept">
			During development, add <code>$inspect.trace()</code> at the top of any <code>$effect</code>
			to log which dependency triggered the re-run. It is removed in production builds.
		</p>
		<pre>{`$effect(() => {
  $inspect.trace();  // logs: "trackedValue changed: 'hello' → 'world'"
  const q = query;
  fetchResults(q);
});`}</pre>
	</div>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.input-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-weight: 600;
		color: var(--color-text);
	}
	input {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.counter {
		padding: var(--space-sm);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.counter.bad { border-left: 3px solid #cc3333; }
	.counter.good { border-left: 3px solid #2d8a4e; }
	.result {
		color: var(--color-text);
		margin: 0;
		font-size: var(--text-sm);
	}
	.demo-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		align-self: flex-start;
	}
</style>
