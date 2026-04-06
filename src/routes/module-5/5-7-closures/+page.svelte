<script lang="ts">
	interface Item {
		id: number;
		title: string;
		body: string;
	}

	const items: Item[] = [
		{ id: 1, title: 'What is a closure?', body: 'A function bundled with the variables from its enclosing scope.' },
		{ id: 2, title: 'Why does each row work independently?', body: 'Each iteration of {#each} creates a fresh scope, so the arrow handler captures that row\'s own item.id.' },
		{ id: 3, title: 'Any stale-closure bugs?', body: 'Not in Svelte. Runes are reactive by reference, so closures always read the current value of $state.' },
		{ id: 4, title: 'When should I worry?', body: 'Almost never here. The trap lives in React hooks land where closures capture stale props.' }
	];

	let openIds = $state<number[]>([]);

	function toggle(id: number): void {
		if (openIds.includes(id)) {
			openIds = openIds.filter((x) => x !== id);
		} else {
			openIds = [...openIds, id];
		}
	}

	function isOpen(id: number): boolean {
		return openIds.includes(id);
	}
</script>

<section class="page">
	<h1>5.7 — Closures in handlers</h1>
	<p class="concept">
		<strong>Concept.</strong> A closure is a function that captures variables from its surrounding scope. When
		you define an arrow handler inside <code>{'{#each}'}</code>, each iteration gets its own closure over the
		current item — so clicking one row never affects another. In Svelte this just works: no stale-closure
		bugs from the React world. Why no stale closures in Svelte? Because <code>$state</code> returns a
		reactive proxy, not a plain value. When you close over <code>items</code> inside an
		<code>{'{#each}'}</code> handler, you're closing over the proxy — which always reflects the current
		state. React closures capture a snapshot; Svelte closures capture a live reference.
	</p>

	<div class="build">
		<p class="hint">Each button below is a separate closure over its own <code>item.id</code>.</p>
		<ul class="accordion">
			{#each items as item (item.id)}
				<li class="row" class:open={isOpen(item.id)}>
					<button
						type="button"
						class="head"
						aria-expanded={isOpen(item.id)}
						onclick={() => toggle(item.id)}
					>
						<span class="title">{item.title}</span>
						<span class="chev" aria-hidden="true">{isOpen(item.id) ? '−' : '+'}</span>
					</button>
					{#if isOpen(item.id)}
						<div class="body">{item.body}</div>
					{/if}
				</li>
			{/each}
		</ul>
		<p class="state">Open ids: <code>[{openIds.join(', ')}]</code></p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Each arrow function inside <code>{'{#each}'}</code> closes over its iteration's item.</li>
		<li>Tracking open state as an id array avoids nested <code>$state</code> inside loops.</li>
		<li>Svelte reactivity reads the current value — no stale closure surprises.</li>
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
	.hint {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.accordion {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.row {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}
	.head {
		inline-size: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		background: transparent;
		border: 0;
		color: var(--color-text);
		font-size: var(--text-sm);
		text-align: start;
		cursor: pointer;
		min-block-size: 44px;
	}
	.head:hover {
		background: var(--color-surface);
	}
	.title {
		font-weight: 600;
	}
	.chev {
		font-family: var(--font-mono);
		color: var(--color-brand);
	}
	.body {
		padding: var(--space-sm) var(--space-md) var(--space-md);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		border-block-start: 1px solid var(--color-border);
	}
	.state {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
