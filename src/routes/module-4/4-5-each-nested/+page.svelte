<script lang="ts">
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
</style>
