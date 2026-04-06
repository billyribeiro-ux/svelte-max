<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const remoteFileCode = `// products.remote.ts\n" +
		"import { query } from '$app/server';\n" +
		"\n" +
		"type Product = {\n" +
		"  id: number;\n" +
		"  name: string;\n" +
		"  price: number;\n" +
		"  inStock: boolean;\n" +
		"};\n" +
		"\n" +
		"export const getProducts = query(async () =\u003e {\n" +
		"  // This runs on the server only\n" +
		"  const products: Product[] = await db.select().from(productsTable);\n" +
		"  return products;\n" +
		"  // Return type is automatically inferred as Product[]\n" +
		"});`;\n" +
		"\n" +
		"	const usageCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  // +page.svelte\n" +
		"  import { getProducts } from './products.remote';\n" +
		"\n" +
		"  // Call it like a function — returns a reactive value\n" +
		"  const products = getProducts();\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"{#if products.current}\n" +
		"  {#each products.current as product}\n" +
		"    \u003cdiv class=\"product\"\u003e\n" +
		"      \u003ch3\u003e{product.name}\u003c/h3\u003e\n" +
		"      \u003cp\u003e\\${product.price}\u003c/p\u003e\n" +
		"      \u003cspan\u003e{product.inStock ? 'In Stock' : 'Out of Stock'}\u003c/span\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  {/each}\n" +
		"{/if}`;\n" +
		"\n" +
		"	const cachingNote = `// Queries are automatically cached and deduplicated.\n" +
		"// Multiple components calling getProducts() = 1 HTTP request.\n" +
		"// The cache is invalidated when a form or command refreshes it.`;\n" +
		"\n" +
		"	type Product = {\n" +
		"		id: number;\n" +
		"		name: string;\n" +
		"		price: number;\n" +
		"		inStock: boolean;\n" +
		"	};\n" +
		"\n" +
		"	const mockProducts: Product[] = [\n" +
		"		{ id: 1, name: 'Wireless Keyboard', price: 59.99, inStock: true },\n" +
		"		{ id: 2, name: 'USB-C Hub', price: 34.99, inStock: true },\n" +
		"		{ id: 3, name: 'Monitor Stand', price: 89.99, inStock: false },\n" +
		"		{ id: 4, name: 'Webcam HD', price: 49.99, inStock: true },\n" +
		"	];\n" +
		"\n" +
		"	let loading = $state(true);\n" +
		"	let products = $state\u003cProduct[]\u003e([]);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const timer = setTimeout(() =\u003e {\n" +
		"			products = mockProducts;\n" +
		"			loading = false;\n" +
		"		}, 800);\n" +
		"		return () =\u003e clearTimeout(timer);\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.2 — query() Reading Data\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003equery\u003c/code\u003e from \u003ccode\u003e$app/server\u003c/code\u003e defines a server\n" +
		"		function that returns data. The browser calls it directly — no manual fetch. Caching is\n" +
		"		automatic and the return value is reactive.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eRemote file definition\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{remoteFileCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eComponent usage\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{usageCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eAutomatic caching\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{cachingNote}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated demo\u003c/h2\u003e\n" +
		"		\u003cp\u003eThis simulates what \u003ccode\u003egetProducts()\u003c/code\u003e would return:\u003c/p\u003e\n" +
		"		{#if loading}\n" +
		"			\u003cdiv class=\"loader\"\u003eLoading products...\u003c/div\u003e\n" +
		"		{:else}\n" +
		"			\u003cdiv class=\"product-grid\"\u003e\n" +
		"				{#each products as product}\n" +
		"					\u003cdiv class=\"product-card\"\u003e\n" +
		"						\u003ch4\u003e{product.name}\u003c/h4\u003e\n" +
		"						\u003cp class=\"price\"\u003e${product.price.toFixed(2)}\u003c/p\u003e\n" +
		"						\u003cspan class=\"stock\" class:out={!product.inStock}\u003e\n" +
		"							{product.inStock ? 'In Stock' : 'Out of Stock'}\n" +
		"						\u003c/span\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/each}\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003equery\u003c/code\u003e defines a server function in a \u003ccode\u003e.remote.ts\u003c/code\u003e file\u003c/li\u003e\n" +
		"		\u003cli\u003eReturn types are inferred automatically — full end-to-end type safety\u003c/li\u003e\n" +
		"		\u003cli\u003eQueries are cached and deduplicated across components\u003c/li\u003e\n" +
		"		\u003cli\u003eThe result is reactive — no manual \u003ccode\u003e$state\u003c/code\u003e wiring needed\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
