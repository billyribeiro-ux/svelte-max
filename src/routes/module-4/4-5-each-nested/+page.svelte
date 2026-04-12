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

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Shadow the outer variable name in the inner each.</strong> If the outer loop uses <code>as item</code> and the inner loop also uses <code>as item</code>, the inner variable silently shadows the outer one. Inside the inner block you lose access to the outer item entirely, which leads to subtle data bugs.</li>
		<li><strong>Access the outer loop's index inside the inner loop.</strong> This works as long as you give each index a distinct name -- <code>{'as category, ci'}</code> on the outer and <code>{'as product, pi'}</code> on the inner. If both use <code>i</code>, the inner <code>i</code> shadows the outer one and you lose track of the outer position.</li>
		<li><strong>Forget the key on the inner each block.</strong> The same identity problems from lesson 4.4 apply at every nesting level. If the inner array changes, Svelte will patch by position within each category, causing input state, focus, and animations to drift to the wrong product.</li>
		<li><strong>Nest three levels deep.</strong> It works, but the template becomes hard to read and reason about. If you find yourself at three or more nesting levels, consider flattening the data structure or extracting the inner loops into their own child components.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Nested <code>{'{#each}'}</code> blocks let you iterate arrays of arrays -- the natural shape for hierarchical data like categories containing products, departments containing teams, or folders containing files. Each level of nesting introduces its own scope with its own iteration variable, and you can destructure at every level independently. The key rule is the same at every depth: provide a unique, stable key for any list that may change.</p>
	<p class="prose">Variable shadowing is the most common trap with nested loops. If both the outer and inner <code>as</code> clauses use the same variable name, the inner one silently wins, and you lose access to the outer item without any compiler warning. The fix is simple: give each level a distinct, descriptive name -- <code>category</code> for the outer loop, <code>product</code> for the inner one -- so the relationship between data and template is always clear.</p>
	<p class="prose">Performance-wise, keep nesting to two levels whenever possible. A three-deep nested each block with 10 items at each level produces 1,000 DOM nodes, and every re-render of the outermost array re-evaluates the entire tree. If your inner loops are expensive, extract them into child components so Svelte can skip re-rendering subtrees whose props have not changed.</p>
	<p class="next">Next lesson: <a href="/module-4/4-6-key-block">4.6 — {'{#key}'} block</a></p>
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

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (min-inline-size: 1024px) {
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

	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
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
