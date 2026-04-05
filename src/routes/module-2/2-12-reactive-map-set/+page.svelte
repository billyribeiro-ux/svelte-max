<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>
			Native <code>Map</code> and <code>Set</code> inside <code>$state</code> don't notify — their
			mutation methods bypass the proxy.
		</li>
		<li>
			<code>SvelteMap</code> and <code>SvelteSet</code> from <code>svelte/reactivity</code> expose
			the same API and plug into the reactive graph.
		</li>
		<li>
			Every read (<code>.get</code>, <code>.has</code>, <code>.size</code>, iteration) registers a
			dependency.
		</li>
		<li>
			Values stored inside aren't deeply reactive — wrap them in <code>$state</code> if you need
			field-level updates.
		</li>
		<li>Great fit for keyed lookups, caches, and sets of unique IDs.</li>
	</ul>
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

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

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

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
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
</style>
