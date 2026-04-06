<script lang="ts">
	import { untrack } from 'svelte';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	// --- Wrong way: re-runs on every keystroke ---
	let wrongQuery = $state('');
	let wrongResults = $state<string[]>([]);
	let wrongRunCount = $state(0);

	$effect(() => {
		// $inspect.trace — logs which dependency triggered this re-run (dev-only)
		$inspect.trace();
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { untrack } from 'svelte';\n" +
		"\n" +
		"	// --- Wrong way: re-runs on every keystroke ---\n" +
		"	let wrongQuery = $state('');\n" +
		"	let wrongResults = $state\u003cstring[]\u003e([]);\n" +
		"	let wrongRunCount = $state(0);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const q = wrongQuery;\n" +
		"		if (q.length \u003e 0) {\n" +
		"			wrongRunCount++;\n" +
		"			wrongResults = [`Result for \"${q}\" (run #${wrongRunCount})`];\n" +
		"		} else {\n" +
		"			wrongResults = [];\n" +
		"		}\n" +
		"	});\n" +
		"\n" +
		"	// --- Right way: debounced with cleanup ---\n" +
		"	let rightQuery = $state('');\n" +
		"	let rightResults = $state\u003cstring[]\u003e([]);\n" +
		"	let rightRunCount = $state(0);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const q = rightQuery;\n" +
		"		if (q.length === 0) {\n" +
		"			rightResults = [];\n" +
		"			return;\n" +
		"		}\n" +
		"		const timeout = setTimeout(() =\u003e {\n" +
		"			rightRunCount++;\n" +
		"			rightResults = [`Result for \"${q}\" (run #${rightRunCount})`];\n" +
		"		}, 300);\n" +
		"		return () =\u003e clearTimeout(timeout);\n" +
		"	});\n" +
		"\n" +
		"	// --- untrack demo ---\n" +
		"	let trackedValue = $state('hello');\n" +
		"	let untrackedLog = $state('');\n" +
		"	let logCount = $state(0);\n" +
		"	let otherValue = $state(0);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const _tracked = trackedValue;\n" +
		"		const _untracked = untrack(() =\u003e otherValue);\n" +
		"		logCount++;\n" +
		"		untrackedLog = `Effect ran #${logCount} — tracked: \"${_tracked}\", untracked: ${_untracked}`;\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.4 — $effect Performance\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003e$effect\u003c/strong\u003e automatically tracks every reactive value read inside it and re-runs\n" +
		"		when any dependency changes. This is powerful but can cause excessive re-runs if you are not\n" +
		"		careful. Use \u003cstrong\u003ecleanup functions\u003c/strong\u003e for debouncing, \u003cstrong\u003e\u003ccode\u003euntrack()\u003c/code\u003e\u003c/strong\u003e\n" +
		"		to exclude reads, and \u003cstrong\u003e\u003ccode\u003e$inspect.trace()\u003c/code\u003e\u003c/strong\u003e to debug which dependency triggered a re-run.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWrong Way: Effect on Every Keystroke\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This effect re-runs on \u003cem\u003eevery single character\u003c/em\u003e typed. For a search that triggers\n" +
		"			a network request, this would fire dozens of unnecessary API calls.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003clabel class=\"input-label\"\u003e\n" +
		"			Search (no debounce):\n" +
		"			\u003cinput type=\"text\" bind:value={wrongQuery} placeholder=\"Type here...\" /\u003e\n" +
		"		\u003c/label\u003e\n" +
		"		\u003cdiv class=\"counter bad\"\u003eEffect re-runs: \u003cstrong\u003e{wrongRunCount}\u003c/strong\u003e\u003c/div\u003e\n" +
		"		{#each wrongResults as result}\n" +
		"			\u003cp class=\"result\"\u003e{result}\u003c/p\u003e\n" +
		"		{/each}\n" +
		"		\u003cpre\u003e{`// BAD: re-runs on every keystroke\n" +
		"$effect(() =\u003e {\n" +
		"  const q = query;       // tracked!\n" +
		"  fetchResults(q);       // fires every character\n" +
		"});`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eRight Way: Debounced with Cleanup\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			By returning a cleanup function that clears the timeout, the effect only executes the\n" +
		"			search after the user stops typing for 300ms.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003clabel class=\"input-label\"\u003e\n" +
		"			Search (300ms debounce):\n" +
		"			\u003cinput type=\"text\" bind:value={rightQuery} placeholder=\"Type here...\" /\u003e\n" +
		"		\u003c/label\u003e\n" +
		"		\u003cdiv class=\"counter good\"\u003eEffect re-runs: \u003cstrong\u003e{rightRunCount}\u003c/strong\u003e\u003c/div\u003e\n" +
		"		{#each rightResults as result}\n" +
		"			\u003cp class=\"result\"\u003e{result}\u003c/p\u003e\n" +
		"		{/each}\n" +
		"		\u003cpre\u003e{`// GOOD: debounced via cleanup\n" +
		"$effect(() =\u003e {\n" +
		"  const q = query;       // tracked\n" +
		"  const timeout = setTimeout(() =\u003e {\n" +
		"    fetchResults(q);     // fires after 300ms pause\n" +
		"  }, 300);\n" +
		"  return () =\u003e clearTimeout(timeout);  // cleanup\n" +
		"});`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003euntrack() — Exclude Dependencies\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			\u003ccode\u003euntrack()\u003c/code\u003e lets you read a reactive value inside an effect without adding it\n" +
		"			as a dependency. The effect below only re-runs when \u003ccode\u003etrackedValue\u003c/code\u003e changes,\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the cleanup function from a debounced <code>$effect</code>.</strong> Typing rapidly fires the API call on every keystroke instead of waiting for the user to pause, flooding the network with requests and potentially causing race conditions.</li>
		<li><strong>Remove <code>untrack()</code> around a reactive value you only want to read once.</strong> The effect now re-runs whenever that value changes too, causing unexpected side effects and potentially infinite loops if the effect writes to the same value it reads.</li>
		<li><strong>Add <code>$inspect.trace()</code> inside an effect and change two dependencies simultaneously.</strong> The trace logs show exactly which dependency triggered each re-run, helping you identify unnecessary effect executions in complex reactive graphs.</li>
		<li><strong>Write to a <code>$state</code> variable inside an <code>$effect</code> that reads it.</strong> Svelte detects the circular dependency and throws an infinite loop error, proving why effects should avoid writing to the same state they read.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The cleanup function returned by <code>$effect</code> is your primary tool for debouncing expensive operations. When an effect's dependencies change, Svelte calls the previous cleanup before running the new effect. By clearing a <code>setTimeout</code> in the cleanup, you ensure the expensive work only fires after the user stops changing input for a specified delay.</p>
	<p class="prose"><code>untrack()</code> lets you read a reactive value inside an effect without registering it as a dependency. This is essential when you need a value for context (like a configuration setting) but do not want the effect to re-run when that value changes. It gives you fine-grained control over the reactive dependency graph.</p>
	<p class="prose"><code>$inspect.trace()</code> is a dev-mode debugging tool that logs which specific dependency triggered an effect re-run. When effects fire more often than expected, trace identifies the culprit, letting you add <code>untrack()</code> or restructure your reactive code to eliminate unnecessary work.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-12/12-5-memoization">12.5 — Memoization</a> — cache expensive computations with <code>$derived.by()</code>.</p>
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
