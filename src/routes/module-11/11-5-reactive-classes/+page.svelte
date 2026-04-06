<script lang="ts">
	import { CartStore, type CartItem } from '$lib/stores/cart.svelte';

	const cart = new CartStore();

	const products = [
		{ id: 'p1', name: 'Svelte T-Shirt', price: 29.99 },
		{ id: 'p2', name: 'Runes Mug', price: 14.99 },
		{ id: 'p3', name: 'SvelteKit Hoodie', price: 54.99 },
		{ id: 'p4', name: '$state Sticker Pack', price: 4.99 }
	] as const;
</script>

<section class="page">
	<h1>11.5 — Reactive Classes with $state Fields</h1>

	<p class="concept">
		Svelte 5 lets you use <code>$state</code> directly on class fields. Combined with
		getters (<code>get total()</code>), you get a fully reactive class instance that
		updates the UI whenever its internal state changes. This is the <strong>class-based
		state pattern</strong>.
	</p>

	<h3>The CartStore Class</h3>
	<div class="build">
		<pre><code>export class CartStore &#123;
  items = $state&lt;CartItem[]&gt;([]);

  get total(): number &#123;
    return this.items.reduce(
      (sum, item) =&gt; sum + item.price * item.quantity, 0
    );
  &#125;

  add(item) &#123; /* push or increment qty */ &#125;
  remove(id) &#123; /* filter out */ &#125;
&#125;</code></pre>
	</div>

	<h3>Live Demo: Shopping Cart</h3>
	<div class="build">
		<div class="product-grid">
			{#each products as product}
				<div class="product-card">
					<span class="product-name">{product.name}</span>
					<span class="product-price">${product.price.toFixed(2)}</span>
					<button onclick={() => cart.add(product)}>Add to Cart</button>
				</div>
			{/each}
		</div>

		<div class="cart-section">
			<h4>Cart ({cart.count} items)</h4>
			{#if cart.items.length === 0}
				<p class="empty">Cart is empty</p>
			{:else}
				<ul class="cart-list">
					{#each cart.items as item}
						<li class="cart-item">
							<span>{item.name} x{item.quantity}</span>
							<span class="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
							<button class="remove-btn" onclick={() => cart.remove(item.id)}>Remove</button>
						</li>
					{/each}
				</ul>
				<div class="cart-total">
					<strong>Total: ${cart.total.toFixed(2)}</strong>
					<button class="clear-btn" onclick={() => cart.clear()}>Clear All</button>
				</div>
			{/if}
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li><code>$state</code> on class fields makes them reactive — mutations trigger UI updates</li>
		<li>Getters like <code>get total()</code> act as derived values, automatically recalculated</li>
		<li>Class instances can be shared across components via context or module exports</li>
		<li>Methods like <code>add()</code> and <code>remove()</code> encapsulate state mutations cleanly</li>
		<li>This pattern replaces complex store logic with idiomatic TypeScript classes</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: var(--space-md);
	}
	.product-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
	}
	.product-name {
		font-weight: 600;
		color: var(--color-text);
	}
	.product-price {
		font-family: var(--font-mono);
		color: var(--color-primary);
		font-weight: 600;
	}
	button {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	.cart-section {
		border-top: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
	}
	h4 {
		margin: 0 0 var(--space-sm) 0;
		color: var(--color-text);
	}
	.empty {
		color: var(--color-text-muted);
		font-style: italic;
		margin: 0;
	}
	.cart-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
	}
	.cart-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		color: var(--color-text);
		font-size: 0.9em;
	}
	.item-subtotal {
		margin-inline-start: auto;
		font-family: var(--font-mono);
		font-weight: 600;
	}
	.remove-btn {
		background: transparent;
		color: #e74c3c;
		border: 1px solid #e74c3c;
		font-size: 0.8em;
		padding: 2px var(--space-xs);
	}
	.cart-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-block-start: var(--space-md);
		padding-block-start: var(--space-sm);
		border-top: 1px solid var(--color-border);
	}
	.clear-btn {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
</style>
