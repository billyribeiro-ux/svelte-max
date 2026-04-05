<script lang="ts">
	interface CartItem {
		id: number;
		name: string;
		price: number;
		qty: number;
	}

	let items = $state<CartItem[]>([
		{ id: 1, name: 'Studio Headphones', price: 149.0, qty: 1 },
		{ id: 2, name: 'Mechanical Keyboard', price: 129.5, qty: 2 },
		{ id: 3, name: 'USB-C Hub', price: 39.99, qty: 1 }
	]);

	const subtotal = $derived(items.reduce((sum, i) => sum + i.price * i.qty, 0));
	const tax = $derived(subtotal * 0.08);
	const total = $derived(subtotal + tax);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	function money(n: number): string {
		return formatter.format(n);
	}

	function inc(item: CartItem): void {
		item.qty += 1;
	}

	function dec(item: CartItem): void {
		if (item.qty > 0) item.qty -= 1;
	}

	function remove(id: number): void {
		items = items.filter((i) => i.id !== id);
	}
</script>

<section class="page">
	<h1>2.7 — $derived</h1>

	<p class="concept">
		<code>$derived(expr)</code> creates a value that automatically recalculates whenever any reactive
		dependency used in <code>expr</code> changes. It is <em>pure</em>: no side effects, no
		<code>fetch</code>, no DOM writes. The rule of thumb is simple — if you're computing a value from
		other state, use <code>$derived</code>; if you're writing to the outside world, use
		<code>$effect</code>. Derivations are synchronous and memoized, so reading the same derived twice
		in a row costs nothing. They're also writable: you can temporarily override a derived value for
		optimistic UI and it will snap back the next time an input changes.
	</p>

	<div class="build">
		{#if items.length === 0}
			<p class="empty">Your cart is empty.</p>
		{:else}
			<ul class="lines">
				{#each items as item (item.id)}
					<li class="line">
						<div class="info">
							<span class="name">{item.name}</span>
							<span class="price">{money(item.price)} each</span>
						</div>
						<div class="qty">
							<button type="button" aria-label="Decrease" onclick={() => dec(item)}>−</button>
							<span class="count">{item.qty}</span>
							<button type="button" aria-label="Increase" onclick={() => inc(item)}>+</button>
						</div>
						<div class="line-total">{money(item.price * item.qty)}</div>
						<button
							type="button"
							class="remove"
							aria-label="Remove {item.name}"
							onclick={() => remove(item.id)}
						>
							✕
						</button>
					</li>
				{/each}
			</ul>

			<aside class="totals" aria-label="Order totals">
				<div class="row">
					<span>Subtotal</span>
					<span>{money(subtotal)}</span>
				</div>
				<div class="row">
					<span>Tax (8%)</span>
					<span>{money(tax)}</span>
				</div>
				<div class="row grand">
					<span>Total</span>
					<span>{money(total)}</span>
				</div>
			</aside>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$derived(expr)</code> memoizes a pure computation of reactive inputs.</li>
		<li>Derivations are synchronous — read them like any other value.</li>
		<li>Chained derivations (<code>tax</code> from <code>subtotal</code>) compose cleanly.</li>
		<li>Use <code>$derived</code> for values, <code>$effect</code> for side effects.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
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
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.empty {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}

	.lines {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.line {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-sm) var(--space-md);
		align-items: center;
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.info {
		display: flex;
		flex-direction: column;
		grid-column: 1 / -1;
	}

	.name {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
	}

	.price {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.qty {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.qty button {
		font: inherit;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
		font-size: var(--text-base);
		transition: background var(--dur-2) var(--ease-1);
	}

	.qty button:hover {
		background: var(--color-surface-2);
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		min-width: 2ch;
		text-align: center;
	}

	.line-total {
		font-variant-numeric: tabular-nums;
		font-size: var(--text-base);
		font-weight: 600;
	}

	.remove {
		font: inherit;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: color var(--dur-2) var(--ease-1), border-color var(--dur-2) var(--ease-1);
	}

	.remove:hover {
		color: var(--color-error);
		border-color: var(--color-error);
	}

	.totals {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		align-self: start;
	}

	.totals .row {
		display: flex;
		justify-content: space-between;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}

	.totals .grand {
		margin-top: var(--space-sm);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--color-border);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
		padding-left: var(--space-lg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	.lines {
		padding-left: 0;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.build {
			grid-template-columns: 2fr 1fr;
		}

		.line {
			grid-template-columns: 2fr auto auto auto;
		}

		.info {
			grid-column: auto;
		}
	}
</style>
