<script lang="ts">
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();

	// TypeScript already knows `data.product.price` is a number because
	// PageLoad's return type flowed into PageData via the generated types.
	const formattedPrice = $derived(`$${data.product.price.toFixed(2)}`);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\n" +
		"	// TypeScript already knows `data.product.price` is a number because\n" +
		"	// PageLoad's return type flowed into PageData via the generated types.\n" +
		"	const formattedPrice = $derived(`$${data.product.price.toFixed(2)}`);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.3 — Auto-generated $types\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e SvelteKit generates typed helpers at\n" +
		"		\u003ccode\u003e.svelte-kit/types/...\u003c/code\u003e — \u003ccode\u003ePageLoad\u003c/code\u003e, \u003ccode\u003ePageServerLoad\u003c/code\u003e,\n" +
		"		\u003ccode\u003ePageData\u003c/code\u003e, \u003ccode\u003eLayoutData\u003c/code\u003e — tailored to each route's shape. You never\n" +
		"		manually type the \u003ccode\u003edata\u003c/code\u003e prop: \u003ccode\u003ePageData\u003c/code\u003e already knows the return type\n" +
		"		of your loader. Import from \u003ccode\u003e./$types\u003c/code\u003e and let TypeScript strict catch any drift.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2 class=\"name\"\u003e{data.product.name}\u003c/h2\u003e\n" +
		"		\u003cp class=\"price\"\u003e{formattedPrice}\u003c/p\u003e\n" +
		"		\u003cp class=\"meta\"\u003eProduct ID \u003ccode\u003e{data.product.id}\u003c/code\u003e\u003c/p\u003e\n" +
		"		\u003cdiv class=\"related\"\u003e\n" +
		"			\u003cspan class=\"label\"\u003eRelated IDs\u003c/span\u003e\n" +
		"			\u003cdiv class=\"chips\"\u003e\n" +
		"				{#each data.relatedIds as id (id)}\n" +
		"					\u003ccode class=\"chip\"\u003e#{id}\u003c/code\u003e\n" +
		"				{/each}\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cp class=\"commentary\"\u003e\n" +
		"			TypeScript already knows \u003ccode\u003edata.product.price\u003c/code\u003e is a number because\n" +
		"			\u003ccode\u003ePageLoad\u003c/code\u003e's return type flowed into \u003ccode\u003ePageData\u003c/code\u003e. Try renaming\n" +
		"			\u003ccode\u003eprice\u003c/code\u003e to \u003ccode\u003ecost\u003c/code\u003e in the loader — the component errors instantly.\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eNever hand-type \u003ccode\u003edata\u003c/code\u003e — import \u003ccode\u003ePageData\u003c/code\u003e from \u003ccode\u003e./$types\u003c/code\u003e.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe generated types flow directly from your loader's return value.\u003c/li\u003e\n" +
		"		\u003cli\u003eRenaming a field in the loader surfaces the mismatch in the component at compile time.\u003c/li\u003e\n" +
		"		\u003cli\u003eThe same pattern works for layouts via \u003ccode\u003eLayoutData\u003c/code\u003e.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.3 — Auto-generated $types</h1>

	<p class="concept">
		<strong>Concept.</strong> SvelteKit generates typed helpers at
		<code>.svelte-kit/types/...</code> — <code>PageLoad</code>, <code>PageServerLoad</code>,
		<code>PageData</code>, <code>LayoutData</code> — tailored to each route's shape. You never
		manually type the <code>data</code> prop: <code>PageData</code> already knows the return type
		of your loader. Import from <code>./$types</code> and let TypeScript strict catch any drift.
	</p>

	<div class="build">
		<h2 class="name">{data.product.name}</h2>
		<p class="price">{formattedPrice}</p>
		<p class="meta">Product ID <code>{data.product.id}</code></p>
		<div class="related">
			<span class="label">Related IDs</span>
			<div class="chips">
				{#each data.relatedIds as id (id)}
					<code class="chip">#{id}</code>
				{/each}
			</div>
		</div>
		<p class="commentary">
			TypeScript already knows <code>data.product.price</code> is a number because
			<code>PageLoad</code>'s return type flowed into <code>PageData</code>. Try renaming
			<code>price</code> to <code>cost</code> in the loader — the component errors instantly.
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Rename <code>price</code> to <code>cost</code> in the loader's return object.</strong> The component immediately shows a TypeScript error on <code>data.product.price</code> because <code>PageData</code> no longer has that property, proving the generated types catch drift at compile time.</li>
		<li><strong>Replace the <code>PageData</code> import with a hand-written interface.</strong> The code compiles, but you lose the automatic contract between loader and component. Add a new field to the loader and notice the component does not complain because your manual type is stale.</li>
		<li><strong>Change the loader return type to include a <code>Date</code> object.</strong> TypeScript accepts it in the loader, but on the client the value arrives as a string because SvelteKit serializes via JSON. This reveals why <code>PageData</code> strips non-serializable types.</li>
		<li><strong>Delete the <code>./$types</code> import and type <code>data</code> as <code>any</code>.</strong> Everything compiles silently, but now typos like <code>data.prodcut.name</code> go undetected. Re-add the import to see TypeScript catch the mistake instantly.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SvelteKit generates typed helpers under <code>.svelte-kit/types/</code> for every route, including <code>PageLoad</code>, <code>PageServerLoad</code>, <code>PageData</code>, and <code>LayoutData</code>. These types are derived directly from whatever your loader returns, so you never need to manually define the shape of <code>data</code> in the component.</p>
	<p class="prose">The beauty of this system is that renaming a field, removing a property, or changing a type in your loader instantly surfaces mismatches in every component that consumes that data. The feedback loop is compile-time, not runtime, which means bugs are caught before the page ever renders in a browser.</p>
	<p class="prose">The same pattern extends to layout loaders via <code>LayoutData</code>. Because SvelteKit merges layout data into child pages, the generated types for a child route automatically include properties from parent layouts, giving you full type coverage across nested route trees.</p>
	<p class="next">Next up: the enhanced <code>fetch</code> that SvelteKit passes into your load function.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
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
	.name {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--color-brand);
	}
	.price {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
	}
	.meta {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.related {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}
	.chip {
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		padding: var(--space-xs) var(--space-sm);
	}
	.commentary {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
		line-height: 1.6;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
