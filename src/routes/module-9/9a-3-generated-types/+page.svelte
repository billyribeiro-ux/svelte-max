<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// TypeScript already knows `data.product.price` is a number because
	// PageLoad's return type flowed into PageData via the generated types.
	const formattedPrice = $derived(`$${data.product.price.toFixed(2)}`);
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

	<h3>What you learned</h3>
	<ul>
		<li>Never hand-type <code>data</code> — import <code>PageData</code> from <code>./$types</code>.</li>
		<li>The generated types flow directly from your loader's return value.</li>
		<li>Renaming a field in the loader surfaces the mismatch in the component at compile time.</li>
		<li>The same pattern works for layouts via <code>LayoutData</code>.</li>
	</ul>
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
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-md);
		line-height: 1.6;
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
