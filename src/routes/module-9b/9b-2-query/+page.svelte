<script lang="ts">
	const remoteFileCode = `// products.remote.ts
import { query } from '$app/server';

type Product = {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
};

export const getProducts = query(async () => {
  // This runs on the server only
  const products: Product[] = await db.select().from(productsTable);
  return products;
  // Return type is automatically inferred as Product[]
});`;

	const usageCode = `\u003cscript lang="ts"\u003e
  // +page.svelte
  import { getProducts } from './products.remote';

  // Call it like a function — returns a reactive value
  const products = getProducts();
\u003c/script\u003e

{#if products.current}
  {#each products.current as product}
    <div class="product">
      <h3>{product.name}</h3>
      <p>\${product.price}</p>
      <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
    </div>
  {/each}
{/if}`;

	const cachingNote = `// Queries are automatically cached and deduplicated.
// Multiple components calling getProducts() = 1 HTTP request.
// The cache is invalidated when a form or command refreshes it.`;

	type Product = {
		id: number;
		name: string;
		price: number;
		inStock: boolean;
	};

	const mockProducts: Product[] = [
		{ id: 1, name: 'Wireless Keyboard', price: 59.99, inStock: true },
		{ id: 2, name: 'USB-C Hub', price: 34.99, inStock: true },
		{ id: 3, name: 'Monitor Stand', price: 89.99, inStock: false },
		{ id: 4, name: 'Webcam HD', price: 49.99, inStock: true },
	];

	let loading = $state(true);
	let products = $state<Product[]>([]);

	$effect(() => {
		const timer = setTimeout(() => {
			products = mockProducts;
			loading = false;
		}, 800);
		return () => clearTimeout(timer);
	});
</script>

<section class="page">
	<h1>9B.2 — query() Reading Data</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>query</code> from <code>$app/server</code> defines a server
		function that returns data. The browser calls it directly — no manual fetch. Caching is
		automatic and the return value is reactive.
	</p>

	<div class="build">
		<h2>Remote file definition</h2>
		<pre><code>{remoteFileCode}</code></pre>

		<h2>Component usage</h2>
		<pre><code>{usageCode}</code></pre>

		<h2>Automatic caching</h2>
		<pre><code>{cachingNote}</code></pre>

		<h2>Simulated demo</h2>
		<p>This simulates what <code>getProducts()</code> would return:</p>
		{#if loading}
			<div class="loader">Loading products...</div>
		{:else}
			<div class="product-grid">
				{#each products as product}
					<div class="product-card">
						<h4>{product.name}</h4>
						<p class="price">${product.price.toFixed(2)}</p>
						<span class="stock" class:out={!product.inStock}>
							{product.inStock ? 'In Stock' : 'Out of Stock'}
						</span>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>query</code> defines a server function in a <code>.remote.ts</code> file</li>
		<li>Return types are inferred automatically — full end-to-end type safety</li>
		<li>Queries are cached and deduplicated across components</li>
		<li>The result is reactive — no manual <code>$state</code> wiring needed</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.loader { padding: var(--space-md); text-align: center; color: var(--color-text-muted); }
	.product-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-sm); }
	.product-card { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
	.product-card h4 { margin: 0 0 var(--space-xs) 0; }
	.price { margin: 0; font-weight: 600; font-size: var(--text-lg); }
	.stock { font-size: var(--text-sm); color: oklch(60% 0.15 145); }
	.stock.out { color: oklch(60% 0.15 25); }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.product-grid { grid-template-columns: 1fr 1fr; }
	}
</style>
