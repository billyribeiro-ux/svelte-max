<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteMap, SvelteSet } from 'svelte/reactivity';

	type Cell = 'x' | 'o';

	const board = new SvelteMap<number, Cell>();
	let turn = $state<Cell>('x');

	const winningLines: readonly (readonly number[])[] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	const winningCells = $derived.by(() => {
		const set = new SvelteSet<number>();
		for (const line of winningLines) {
			const [a, b, c] = line;
			if (board.has(a) && board.get(a) === board.get(b) && board.get(a) === board.get(c)) {
				set.add(a);
				set.add(b);
				set.add(c);
			}
		}
		return set;
	});

	const winner = $derived.by<Cell | null>(() => {
		for (const line of winningLines) {
			const [a, b, c] = line;
			if (board.has(a) && board.get(a) === board.get(b) && board.get(a) === board.get(c)) {
				return board.get(a) ?? null;
			}
		}
		return null;
	});

	const isDraw = $derived(!winner && board.size === 9);

	function play(index: number) {
		if (winner || board.has(index)) return;
		board.set(index, turn);
		turn = turn === 'x' ? 'o' : 'x';
	}

	function reset() {
		board.clear();
		turn = 'x';
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import { SvelteMap, SvelteSet } from 'svelte/reactivity';\n" +
		"\n" +
		"\ttype Cell = 'x' | 'o';\n" +
		"\n" +
		"\tconst board = new SvelteMap\u003cnumber, Cell\u003e();\n" +
		"\tlet turn = $state\u003cCell\u003e('x');\n" +
		"\n" +
		"\tconst winningLines: readonly (readonly number[])[] = [\n" +
		"\t\t[0, 1, 2],\n" +
		"\t\t[3, 4, 5],\n" +
		"\t\t[6, 7, 8],\n" +
		"\t\t[0, 3, 6],\n" +
		"\t\t[1, 4, 7],\n" +
		"\t\t[2, 5, 8],\n" +
		"\t\t[0, 4, 8],\n" +
		"\t\t[2, 4, 6]\n" +
		"\t];\n" +
		"\n" +
		"\tconst winningCells = $derived.by(() =\u003e {\n" +
		"\t\tconst set = new SvelteSet\u003cnumber\u003e();\n" +
		"\t\tfor (const line of winningLines) {\n" +
		"\t\t\tconst [a, b, c] = line;\n" +
		"\t\t\tif (board.has(a) && board.get(a) === board.get(b) && board.get(a) === board.get(c)) {\n" +
		"\t\t\t\tset.add(a);\n" +
		"\t\t\t\tset.add(b);\n" +
		"\t\t\t\tset.add(c);\n" +
		"\t\t\t}\n" +
		"\t\t}\n" +
		"\t\treturn set;\n" +
		"\t});\n" +
		"\n" +
		"\tconst winner = $derived.by\u003cCell | null\u003e(() =\u003e {\n" +
		"\t\tfor (const line of winningLines) {\n" +
		"\t\t\tconst [a, b, c] = line;\n" +
		"\t\t\tif (board.has(a) && board.get(a) === board.get(b) && board.get(a) === board.get(c)) {\n" +
		"\t\t\t\treturn board.get(a) ?? null;\n" +
		"\t\t\t}\n" +
		"\t\t}\n" +
		"\t\treturn null;\n" +
		"\t});\n" +
		"\n" +
		"\tconst isDraw = $derived(!winner && board.size === 9);\n" +
		"\n" +
		"\tfunction play(index: number) {\n" +
		"\t\tif (winner || board.has(index)) return;\n" +
		"\t\tboard.set(index, turn);\n" +
		"\t\tturn = turn === 'x' ? 'o' : 'x';\n" +
		"\t}\n" +
		"\n" +
		"\tfunction reset() {\n" +
		"\t\tboard.clear();\n" +
		"\t\tturn = 'x';\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.12 — SvelteMap and SvelteSet\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\tA plain \u003ccode\u003eMap\u003c/code\u003e or \u003ccode\u003eSet\u003c/code\u003e placed in \u003ccode\u003e$state\u003c/code\u003e is \u003cem\u003enot\u003c/em\u003e\n" +
		"\t\treactive — Svelte's proxy can't intercept \u003ccode\u003e.set()\u003c/code\u003e, \u003ccode\u003e.has()\u003c/code\u003e, or\n" +
		"\t\t\u003ccode\u003e.size\u003c/code\u003e on native collections, so components won't update when they change. The\n" +
		"\t\t\u003ccode\u003esvelte/reactivity\u003c/code\u003e module ships \u003ccode\u003eSvelteMap\u003c/code\u003e and \u003ccode\u003eSvelteSet\u003c/code\u003e as\n" +
		"\t\tdrop-in replacements: same API, but every read (\u003ccode\u003e.get\u003c/code\u003e, \u003ccode\u003e.has\u003c/code\u003e,\n" +
		"\t\t\u003ccode\u003e.size\u003c/code\u003e, iteration) is tracked and every write triggers updates. Key insight: values\n" +
		"\t\tstored \u003cem\u003einside\u003c/em\u003e a \u003ccode\u003eSvelteMap\u003c/code\u003e are not deeply reactive on their own — if you\n" +
		"\t\tstore an object, mutating its fields won't notify anyone unless the object itself is reactive.\n" +
		"\t\tReach for these when you need O(1) key-based lookups or guaranteed unique collections.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"demo\"\u003e\n" +
		"\t\t\u003cdiv class=\"status\" aria-live=\"polite\"\u003e\n" +
		"\t\t\t{#if winner}\n" +
		"\t\t\t\t\u003cspan class=\"winner\"\u003ePlayer \u003cstrong\u003e{winner.toUpperCase()}\u003c/strong\u003e wins\u003c/span\u003e\n" +
		"\t\t\t{:else if isDraw}\n" +
		"\t\t\t\t\u003cspan\u003eDraw\u003c/span\u003e\n" +
		"\t\t\t{:else}\n" +
		"\t\t\t\t\u003cspan\u003eTurn: \u003cstrong\u003e{turn.toUpperCase()}\u003c/strong\u003e\u003c/span\u003e\n" +
		"\t\t\t{/if}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cdiv class=\"grid\" role=\"grid\" aria-label=\"Tic tac toe board\"\u003e\n" +
		"\t\t\t{#each Array.from({ length: 9 }, (_, i) =\u003e i) as i (i)}\n" +
		"\t\t\t\t{@const value = board.get(i)}\n" +
		"\t\t\t\t{@const isWinning = winningCells.has(i)}\n" +
		"\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\tclass=\"cell\"\n" +
		"\t\t\t\t\tclass:winning={isWinning}\n" +
		"\t\t\t\t\tclass:filled={value !== undefined}\n" +
		"\t\t\t\t\tdisabled={!!winner || value !== undefined}\n" +
		"\t\t\t\t\tonclick={() =\u003e play(i)}\n" +
		"\t\t\t\t\taria-label={`Cell ${i + 1}${value ? `, ${value}` : ''}`}\n" +
		"\t\t\t\t\u003e\n" +
		"\t\t\t\t\t{value ? value.toUpperCase() : ''}\n" +
		"\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t{/each}\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cbutton type=\"button\" class=\"reset\" onclick={reset}\u003eReset\u003c/button\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tNative \u003ccode\u003eMap\u003c/code\u003e and \u003ccode\u003eSet\u003c/code\u003e inside \u003ccode\u003e$state\u003c/code\u003e don't notify — their\n" +
		"\t\t\tmutation methods bypass the proxy.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\t\u003ccode\u003eSvelteMap\u003c/code\u003e and \u003ccode\u003eSvelteSet\u003c/code\u003e from \u003ccode\u003esvelte/reactivity\u003c/code\u003e expose\n" +
		"\t\t\tthe same API and plug into the reactive graph.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tEvery read (\u003ccode\u003e.get\u003c/code\u003e, \u003ccode\u003e.has\u003c/code\u003e, \u003ccode\u003e.size\u003c/code\u003e, iteration) registers a\n" +
		"\t\t\tdependency.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\n" +
		"\t\t\tValues stored inside aren't deeply reactive — wrap them in \u003ccode\u003e$state\u003c/code\u003e if you need\n" +
		"\t\t\tfield-level updates.\n" +
		"\t\t\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eGreat fit for keyed lookups, caches, and sets of unique IDs.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.12 — SvelteMap and SvelteSet</h1>

	<p class="concept">
		A plain <code>Map</code> or <code>Set</code> placed in <code>$state</code> is <em>not</em>
		reactive — Svelte's proxy can't intercept <code>.set()</code>, <code>.has()</code>, or
		<code>.size</code> on native collections, so components won't update when they change. The
		<code>svelte/reactivity</code> module ships <code>SvelteMap</code> and <code>SvelteSet</code> as
		drop-in replacements: same API, but every read (<code>.get</code>, <code>.has</code>,
		<code>.size</code>, iteration) is tracked and every write triggers updates. Key insight: values
		stored <em>inside</em> a <code>SvelteMap</code> are not deeply reactive on their own — if you
		store an object, mutating its fields won't notify anyone unless the object itself is reactive.
		Reach for these when you need O(1) key-based lookups or guaranteed unique collections.
	</p>

	<div class="demo">
		<div class="status" aria-live="polite">
			{#if winner}
				<span class="winner">Player <strong>{winner.toUpperCase()}</strong> wins</span>
			{:else if isDraw}
				<span>Draw</span>
			{:else}
				<span>Turn: <strong>{turn.toUpperCase()}</strong></span>
			{/if}
		</div>

		<div class="grid" role="grid" aria-label="Tic tac toe board">
			{#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
				{@const value = board.get(i)}
				{@const isWinning = winningCells.has(i)}
				<button
					type="button"
					class="cell"
					class:winning={isWinning}
					class:filled={value !== undefined}
					disabled={!!winner || value !== undefined}
					onclick={() => play(i)}
					aria-label={`Cell ${i + 1}${value ? `, ${value}` : ''}`}
				>
					{value ? value.toUpperCase() : ''}
				</button>
			{/each}
		</div>

		<button type="button" class="reset" onclick={reset}>Reset</button>
	</div>

	<h2>Break it on purpose</h2>

	<p class="prose">
		Swap between native collections and Svelte's reactive versions to see exactly where the reactivity boundary lies.
	</p>

	<ol class="experiments">
		<li>
			<strong>Use a plain <code>new Map()</code> with <code>$state</code>.</strong> Replace
			<code>new SvelteMap()</code> with <code>new Map()</code>. Click a cell — the map
			updates in memory but the UI stays frozen. Svelte's proxy cannot intercept
			<code>.set()</code> or <code>.has()</code> on native Map instances because those
			methods are internal to the Map implementation.
		</li>
		<li>
			<strong>Use <code>new SvelteMap()</code> instead.</strong> Switch back to
			<code>SvelteMap</code>. Now <code>.set()</code>, <code>.delete()</code>, and
			<code>.clear()</code> all trigger updates because <code>SvelteMap</code> wraps every
			method to notify the reactive graph. The API is identical — it is a drop-in
			replacement.
		</li>
		<li>
			<strong>Iterate a <code>SvelteMap</code> in <code>{`{#each}`}</code>.</strong> Use
			<code>[...board.entries()]</code> or <code>board.keys()</code> in an each block.
			Iteration is tracked — when the map changes, the each block re-renders. You need to
			spread into an array because <code>{`{#each}`}</code> expects an iterable.
		</li>
		<li>
			<strong>Check <code>.has()</code> in a derived.</strong> Create
			<code>const hasCenter = $derived(board.has(4))</code>. This recomputes whenever the
			map changes because <code>.has()</code> is a tracked read. Any method that reads from
			a <code>SvelteMap</code> or <code>SvelteSet</code> registers a dependency.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>SvelteMap</code> and <code>SvelteSet</code> from <code>svelte/reactivity</code>
		are reactive wrappers around the native <code>Map</code> and <code>Set</code> APIs. They
		exist because Svelte's proxy system cannot intercept methods on native collections —
		<code>.set()</code>, <code>.get()</code>, <code>.has()</code>, and <code>.size</code>
		are all internal to the Map/Set implementation and invisible to a Proxy handler. The
		Svelte versions wrap every method to notify the reactive graph.
	</p>

	<p class="prose">
		Every read operation on a <code>SvelteMap</code> or <code>SvelteSet</code> registers a
		dependency: <code>.get()</code>, <code>.has()</code>, <code>.size</code>, and iteration
		all subscribe the calling context (template, <code>$derived</code>, or
		<code>$effect</code>) to future changes. Every write operation —
		<code>.set()</code>, <code>.delete()</code>, <code>.clear()</code>, <code>.add()</code>
		— triggers updates to all subscribers. The API is identical to the native versions, so
		migration is a one-line import change.
	</p>

	<p class="prose">
		Use <code>SvelteMap</code> when you need O(1) key-based lookups — game boards, caches,
		lookup tables, configuration registries. Use <code>SvelteSet</code> for collections of
		unique values — selected IDs, active tags, permission sets. Import both from
		<code>svelte/reactivity</code> and use them anywhere you would normally use
		<code>Map</code> or <code>Set</code> in reactive code.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-13-reactive-url-media">2.13 — SvelteURL and MediaQuery</a> —
		reactive wrappers for URL manipulation and media query matching.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 56rem;
		margin-inline: auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.demo {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.status {
		font-size: var(--text-lg);
		color: var(--color-text);
	}

	.status .winner {
		color: var(--color-success);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-sm);
		inline-size: min(100%, 20rem);
		aspect-ratio: 1;
	}

	.cell {
		font: inherit;
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 700;
		display: grid;
		place-items: center;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			transform var(--dur-fast) var(--ease-out);
	}

	.cell:hover:not(:disabled) {
		background: var(--color-surface);
		transform: scale(1.02);
	}

	.cell:disabled {
		cursor: default;
	}

	.cell.filled {
		color: var(--color-brand);
	}

	.cell.winning {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}

	.reset {
		font: inherit;
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}

	.reset:hover {
		background: var(--color-surface);
	}

	@media (min-inline-size: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.grid {
			inline-size: 24rem;
		}

		.cell {
			font-size: var(--text-hero);
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
