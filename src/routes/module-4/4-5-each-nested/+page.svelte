<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface Product {
		id: number;
		name: string;
		price: number;
	}

	interface Category {
		id: string;
		name: string;
		products: readonly Product[];
	}

	const categories: readonly Category[] = [
		{
			id: 'audio',
			name: 'Audio',
			products: [
				{ id: 101, name: 'Studio Headphones', price: 199 },
				{ id: 102, name: 'Wireless Earbuds', price: 129 },
				{ id: 103, name: 'Desk Microphone', price: 89 },
				{ id: 104, name: 'Portable Speaker', price: 149 }
			]
		},
		{
			id: 'desk',
			name: 'Desk',
			products: [
				{ id: 201, name: 'Mechanical Keyboard', price: 159 },
				{ id: 202, name: 'Ergonomic Mouse', price: 79 },
				{ id: 203, name: 'Monitor Arm', price: 119 }
			]
		},
		{
			id: 'light',
			name: 'Lighting',
			products: [
				{ id: 301, name: 'Bias Light', price: 45 },
				{ id: 302, name: 'Desk Lamp', price: 69 },
				{ id: 303, name: 'Key Light', price: 189 }
			]
		}
	];

	const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Product {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\tprice: number;\n" +
		"\t}\n" +
		"\n" +
		"\tinterface Category {\n" +
		"\t\tid: string;\n" +
		"\t\tname: string;\n" +
		"\t\tproducts: readonly Product[];\n" +
		"\t}\n" +
		"\n" +
		"\tconst categories: readonly Category[] = [\n" +
		"\t\t{\n" +
		"\t\t\tid: 'audio',\n" +
		"\t\t\tname: 'Audio',\n" +
		"\t\t\tproducts: [\n" +
		"\t\t\t\t{ id: 101, name: 'Studio Headphones', price: 199 },\n" +
		"\t\t\t\t{ id: 102, name: 'Wireless Earbuds', price: 129 },\n" +
		"\t\t\t\t{ id: 103, name: 'Desk Microphone', price: 89 },\n" +
		"\t\t\t\t{ id: 104, name: 'Portable Speaker', price: 149 }\n" +
		"\t\t\t]\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tid: 'desk',\n" +
		"\t\t\tname: 'Desk',\n" +
		"\t\t\tproducts: [\n" +
		"\t\t\t\t{ id: 201, name: 'Mechanical Keyboard', price: 159 },\n" +
		"\t\t\t\t{ id: 202, name: 'Ergonomic Mouse', price: 79 },\n" +
		"\t\t\t\t{ id: 203, name: 'Monitor Arm', price: 119 }\n" +
		"\t\t\t]\n" +
		"\t\t},\n" +
		"\t\t{\n" +
		"\t\t\tid: 'light',\n" +
		"\t\t\tname: 'Lighting',\n" +
		"\t\t\tproducts: [\n" +
		"\t\t\t\t{ id: 301, name: 'Bias Light', price: 45 },\n" +
		"\t\t\t\t{ id: 302, name: 'Desk Lamp', price: 69 },\n" +
		"\t\t\t\t{ id: 303, name: 'Key Light', price: 189 }\n" +
		"\t\t\t]\n" +
		"\t\t}\n" +
		"\t];\n" +
		"\n" +
		"\tconst formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.5 — Nested {'{#each}'}\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\tYou can nest \u003ccode\u003e{'{#each}'}\u003c/code\u003e blocks to iterate arrays of arrays — for example a list\n" +
		"\t\tof categories where each category has its own list of products. Keep keys at every level:\n" +
		"\t\t\u003ccode\u003e{'(category.id)'}\u003c/code\u003e on the outer loop and \u003ccode\u003e{'(product.id)'}\u003c/code\u003e on the\n" +
		"\t\tinner one. If you have heavy work that doesn't depend on the inner element, lift it out of the\n" +
		"\t\tinner loop.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t{#each categories as category (category.id)}\n" +
		"\t\t\t\u003cdiv class=\"category\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003e{category.name}\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t\t\t{#each category.products as product (product.id)}\n" +
		"\t\t\t\t\t\t\u003carticle class=\"card\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003ch4\u003e{product.name}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\t\t\u003cp class=\"price\"\u003e{formatter.format(product.price)}\u003c/p\u003e\n" +
		"\t\t\t\t\t\t\u003c/article\u003e\n" +
		"\t\t\t\t\t{/each}\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/each}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eNested \u003ccode\u003e{'{#each}'}\u003c/code\u003e blocks handle arrays of arrays.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eType each level — \u003ccode\u003eCategory\u003c/code\u003e outside, \u003ccode\u003eProduct\u003c/code\u003e inside.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse keys at every level for correct reconciliation.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eHoist expensive work out of inner loops when possible.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.5 — Nested {'{#each}'}</h1>
	<p class="concept">
		<strong>Concept.</strong>
		You can nest <code>{'{#each}'}</code> blocks to iterate arrays of arrays — for example a list
		of categories where each category has its own list of products. Keep keys at every level:
		<code>{'(category.id)'}</code> on the outer loop and <code>{'(product.id)'}</code> on the
		inner one. If you have heavy work that doesn't depend on the inner element, lift it out of the
		inner loop.
	</p>

	<div class="build">
		{#each categories as category (category.id)}
			<div class="category">
				<h2>{category.name}</h2>
				<div class="grid">
					{#each category.products as product (product.id)}
						<article class="card">
							<h4>{product.name}</h4>
							<p class="price">{formatter.format(product.price)}</p>
						</article>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Nested <code>{'{#each}'}</code> blocks handle arrays of arrays.</li>
		<li>Type each level — <code>Category</code> outside, <code>Product</code> inside.</li>
		<li>Use keys at every level for correct reconciliation.</li>
		<li>Hoist expensive work out of inner loops when possible.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong { color: var(--color-text); }

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
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

	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

	.category {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.category h2 {
		margin: 0;
		font-size: var(--text-lg);
		color: var(--color-text);
		border-block-end: 1px solid var(--color-border);
		padding-block-end: var(--space-xs);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		transition: transform var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
	}
	.card:hover {
		transform: translateY(-2px);
		border-color: var(--color-brand);
	}
	.card h4 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	.price {
		margin: 0;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-width: 1024px) {
		.grid { grid-template-columns: repeat(4, 1fr); }
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
