<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import * as v from 'valibot';

	const remoteCode = `// search.remote.ts
import { query } from '$app/server';
import * as v from 'valibot';

const SearchSchema = v.object({
  term: v.pipe(v.string(), v.minLength(1)),
  category: v.optional(v.picklist(['electronics', 'books', 'clothing'])),
  maxPrice: v.optional(v.number()),
});

type SearchParams = v.InferOutput<typeof SearchSchema>;

export const searchProducts = query(async (params: SearchParams) => {
  const validated = v.parse(SearchSchema, params);
  return await db.products.search(validated);
});`;

	const usageCode = `\u003cscript lang="ts"\u003e
  import { searchProducts } from './search.remote';

  let term = $state('');
  let category = $state\u003cstring | undefined\u003e(undefined);

  // Reactive — re-fetches when args change
  const results = $derived(
    searchProducts({ term, category })
  );
\u003c/script\u003e

<input bind:value={term} placeholder="Search..." />

<select bind:value={category}>
  <option value={undefined}>All</option>
  <option value="electronics">Electronics</option>
  <option value="books">Books</option>
</select>

{#each results.current ?? [] as product}
  <p>{product.name}</p>
{/each}`;

	const devalueNote = `// Serialization via devalue handles rich types:
// Date, Map, Set, RegExp, BigInt, etc.
export const getEvents = query(async (after: Date) => {
  // 'after' is a real Date object on the server
  return await db.events.where('date', '>', after);
});`;

	type Product = {
		id: number;
		name: string;
		category: string;
		price: number;
	};

	const allProducts: Product[] = [
		{ id: 1, name: 'Wireless Mouse', category: 'electronics', price: 29.99 },
		{ id: 2, name: 'TypeScript Handbook', category: 'books', price: 39.99 },
		{ id: 3, name: 'USB-C Cable', category: 'electronics', price: 12.99 },
		{ id: 4, name: 'Svelte in Action', category: 'books', price: 44.99 },
		{ id: 5, name: 'Cotton T-Shirt', category: 'clothing', price: 19.99 },
		{ id: 6, name: 'Bluetooth Speaker', category: 'electronics', price: 59.99 },
		{ id: 7, name: 'Denim Jacket', category: 'clothing', price: 79.99 },
		{ id: 8, name: 'Clean Code', category: 'books', price: 34.99 },
	];

	const CategorySchema = v.optional(v.picklist(['electronics', 'books', 'clothing']));

	let searchTerm = $state('');
	let selectedCategory = $state('');

	let filtered = $derived.by(() => {
		let results = allProducts;
		if (searchTerm.length > 0) {
			const lower = searchTerm.toLowerCase();
			results = results.filter((p) => p.name.toLowerCase().includes(lower));
		}
		if (selectedCategory) {
			const parsed = v.safeParse(CategorySchema, selectedCategory);
			if (parsed.success && parsed.output) {
				results = results.filter((p) => p.category === parsed.output);
			}
		}
		return results;
	});


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import * as v from 'valibot';\n" +
		"\n" +
		"	const remoteCode = `// search.remote.ts\n" +
		"import { query } from '$app/server';\n" +
		"import * as v from 'valibot';\n" +
		"\n" +
		"const SearchSchema = v.object({\n" +
		"  term: v.pipe(v.string(), v.minLength(1)),\n" +
		"  category: v.optional(v.picklist(['electronics', 'books', 'clothing'])),\n" +
		"  maxPrice: v.optional(v.number()),\n" +
		"});\n" +
		"\n" +
		"type SearchParams = v.InferOutput\u003ctypeof SearchSchema\u003e;\n" +
		"\n" +
		"export const searchProducts = query(async (params: SearchParams) =\u003e {\n" +
		"  const validated = v.parse(SearchSchema, params);\n" +
		"  return await db.products.search(validated);\n" +
		"});`;\n" +
		"\n" +
		"	const usageCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { searchProducts } from './search.remote';\n" +
		"\n" +
		"  let term = $state('');\n" +
		"  let category = $state\\u003cstring | undefined\\u003e(undefined);\n" +
		"\n" +
		"  // Reactive — re-fetches when args change\n" +
		"  const results = $derived(\n" +
		"    searchProducts({ term, category })\n" +
		"  );\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003cinput bind:value={term} placeholder=\"Search...\" /\u003e\n" +
		"\n" +
		"\u003cselect bind:value={category}\u003e\n" +
		"  \u003coption value={undefined}\u003eAll\u003c/option\u003e\n" +
		"  \u003coption value=\"electronics\"\u003eElectronics\u003c/option\u003e\n" +
		"  \u003coption value=\"books\"\u003eBooks\u003c/option\u003e\n" +
		"\u003c/select\u003e\n" +
		"\n" +
		"{#each results.current ?? [] as product}\n" +
		"  \u003cp\u003e{product.name}\u003c/p\u003e\n" +
		"{/each}`;\n" +
		"\n" +
		"	const devalueNote = `// Serialization via devalue handles rich types:\n" +
		"// Date, Map, Set, RegExp, BigInt, etc.\n" +
		"export const getEvents = query(async (after: Date) =\u003e {\n" +
		"  // 'after' is a real Date object on the server\n" +
		"  return await db.events.where('date', '\u003e', after);\n" +
		"});`;\n" +
		"\n" +
		"	type Product = {\n" +
		"		id: number;\n" +
		"		name: string;\n" +
		"		category: string;\n" +
		"		price: number;\n" +
		"	};\n" +
		"\n" +
		"	const allProducts: Product[] = [\n" +
		"		{ id: 1, name: 'Wireless Mouse', category: 'electronics', price: 29.99 },\n" +
		"		{ id: 2, name: 'TypeScript Handbook', category: 'books', price: 39.99 },\n" +
		"		{ id: 3, name: 'USB-C Cable', category: 'electronics', price: 12.99 },\n" +
		"		{ id: 4, name: 'Svelte in Action', category: 'books', price: 44.99 },\n" +
		"		{ id: 5, name: 'Cotton T-Shirt', category: 'clothing', price: 19.99 },\n" +
		"		{ id: 6, name: 'Bluetooth Speaker', category: 'electronics', price: 59.99 },\n" +
		"		{ id: 7, name: 'Denim Jacket', category: 'clothing', price: 79.99 },\n" +
		"		{ id: 8, name: 'Clean Code', category: 'books', price: 34.99 },\n" +
		"	];\n" +
		"\n" +
		"	const CategorySchema = v.optional(v.picklist(['electronics', 'books', 'clothing']));\n" +
		"\n" +
		"	let searchTerm = $state('');\n" +
		"	let selectedCategory = $state('');\n" +
		"\n" +
		"	let filtered = $derived.by(() =\u003e {\n" +
		"		let results = allProducts;\n" +
		"		if (searchTerm.length \u003e 0) {\n" +
		"			const lower = searchTerm.toLowerCase();\n" +
		"			results = results.filter((p) =\u003e p.name.toLowerCase().includes(lower));\n" +
		"		}\n" +
		"		if (selectedCategory) {\n" +
		"			const parsed = v.safeParse(CategorySchema, selectedCategory);\n" +
		"			if (parsed.success && parsed.output) {\n" +
		"				results = results.filter((p) =\u003e p.category === parsed.output);\n" +
		"			}\n" +
		"		}\n" +
		"		return results;\n" +
		"	});\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.3 — Query with Arguments\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Pass typed arguments to query functions. The server validates with\n" +
		"		Valibot. Serialization via devalue handles \u003ccode\u003eDate\u003c/code\u003e, \u003ccode\u003eMap\u003c/code\u003e,\n" +
		"		\u003ccode\u003eSet\u003c/code\u003e, and more. When arguments change, the query re-fetches reactively.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eRemote function with Valibot validation\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{remoteCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eReactive usage in component\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{usageCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eRich type serialization\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{devalueNote}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated search demo\u003c/h2\u003e\n" +
		"		\u003cp\u003eThis uses \u003ccode\u003e$derived\u003c/code\u003e with client-side filtering to simulate a parameterized query:\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003cinput\n" +
		"				type=\"text\"\n" +
		"				bind:value={searchTerm}\n" +
		"				placeholder=\"Search products...\"\n" +
		"				class=\"search-input\"\n" +
		"			/\u003e\n" +
		"			\u003cselect bind:value={selectedCategory} class=\"select-input\"\u003e\n" +
		"				\u003coption value=\"\"\u003eAll Categories\u003c/option\u003e\n" +
		"				\u003coption value=\"electronics\"\u003eElectronics\u003c/option\u003e\n" +
		"				\u003coption value=\"books\"\u003eBooks\u003c/option\u003e\n" +
		"				\u003coption value=\"clothing\"\u003eClothing\u003c/option\u003e\n" +
		"			\u003c/select\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"results\"\u003e\n" +
		"			\u003cp class=\"result-count\"\u003e{filtered.length} result{filtered.length !== 1 ? 's' : ''}\u003c/p\u003e\n" +
		"			{#each filtered as product}\n" +
		"				\u003cdiv class=\"result-row\"\u003e\n" +
		"					\u003cspan class=\"result-name\"\u003e{product.name}\u003c/span\u003e\n" +
		"					\u003cspan class=\"result-cat\"\u003e{product.category}\u003c/span\u003e\n" +
		"					\u003cspan class=\"result-price\"\u003e${product.price.toFixed(2)}\u003c/span\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cp class=\"empty\"\u003eNo products match your search.\u003c/p\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eQuery functions accept typed arguments validated with Valibot on the server\u003c/li\u003e\n" +
		"		\u003cli\u003eArguments are serialized via devalue, supporting rich types like \u003ccode\u003eDate\u003c/code\u003e and \u003ccode\u003eMap\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eQueries re-fetch reactively when their arguments change\u003c/li\u003e\n" +
		"		\u003cli\u003eThe \u003ccode\u003e$derived\u003c/code\u003e rune pairs naturally with parameterized queries\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9B.3 — Query with Arguments</h1>
	<p class="concept">
		<strong>Concept.</strong> Pass typed arguments to query functions. The server validates with
		Valibot. Serialization via devalue handles <code>Date</code>, <code>Map</code>,
		<code>Set</code>, and more. When arguments change, the query re-fetches reactively.
	</p>

	<div class="build">
		<h2>Remote function with Valibot validation</h2>
		<pre><code>{remoteCode}</code></pre>

		<h2>Reactive usage in component</h2>
		<pre><code>{usageCode}</code></pre>

		<h2>Rich type serialization</h2>
		<pre><code>{devalueNote}</code></pre>

		<h2>Simulated search demo</h2>
		<p>This uses <code>$derived</code> with client-side filtering to simulate a parameterized query:</p>

		<div class="controls">
			<input
				type="text"
				bind:value={searchTerm}
				placeholder="Search products..."
				class="search-input"
			/>
			<select bind:value={selectedCategory} class="select-input">
				<option value="">All Categories</option>
				<option value="electronics">Electronics</option>
				<option value="books">Books</option>
				<option value="clothing">Clothing</option>
			</select>
		</div>

		<div class="results">
			<p class="result-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
			{#each filtered as product}
				<div class="result-row">
					<span class="result-name">{product.name}</span>
					<span class="result-cat">{product.category}</span>
					<span class="result-price">${product.price.toFixed(2)}</span>
				</div>
			{:else}
				<p class="empty">No products match your search.</p>
			{/each}
		</div>
	</div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Query functions accept typed arguments validated with Valibot on the server</li>
		<li>Arguments are serialized via devalue, supporting rich types like <code>Date</code> and <code>Map</code></li>
		<li>Queries re-fetch reactively when their arguments change</li>
		<li>The <code>$derived</code> rune pairs naturally with parameterized queries</li>
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
	.controls { display: flex; flex-direction: column; gap: var(--space-sm); }
	.search-input, .select-input {
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		background: var(--color-surface-2);
		color: var(--color-text);
	}
	.results { display: flex; flex-direction: column; gap: var(--space-xs); }
	.result-count { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
	.result-row {
		display: flex; justify-content: space-between; align-items: center;
		padding: var(--space-sm); background: var(--color-surface-2);
		border-radius: var(--radius-sm);
	}
	.result-name { font-weight: 500; }
	.result-cat { font-size: var(--text-sm); color: var(--color-text-muted); text-transform: capitalize; }
	.result-price { font-weight: 600; }
	.empty { margin: 0; color: var(--color-text-muted); text-align: center; padding: var(--space-md); }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.controls { flex-direction: row; }
		.search-input { flex: 1; }
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
