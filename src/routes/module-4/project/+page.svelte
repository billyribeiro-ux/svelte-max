<script lang="ts">
	interface Product {
		id: number;
		name: string;
		category: 'audio' | 'wearable' | 'camera' | 'laptop';
		price: number;
		inStock: boolean;
		rating: number;
	}

	const SEED: readonly Product[] = [
		{ id: 1, name: 'Aurora Wireless Headphones', category: 'audio', price: 249, inStock: true, rating: 4.6 },
		{ id: 2, name: 'Pulse Fitness Band', category: 'wearable', price: 89, inStock: true, rating: 4.2 },
		{ id: 3, name: 'Vista 4K Mirrorless', category: 'camera', price: 1299, inStock: false, rating: 4.8 },
		{ id: 4, name: 'Nimbus Ultrabook 14', category: 'laptop', price: 1499, inStock: true, rating: 4.5 },
		{ id: 5, name: 'Echo Studio Earbuds', category: 'audio', price: 179, inStock: true, rating: 4.3 },
		{ id: 6, name: 'Orbit Smartwatch Pro', category: 'wearable', price: 329, inStock: true, rating: 4.4 },
		{ id: 7, name: 'Lumen Action Camera', category: 'camera', price: 399, inStock: true, rating: 4.1 },
		{ id: 8, name: 'Forge Gaming Laptop 16', category: 'laptop', price: 2199, inStock: false, rating: 4.7 },
		{ id: 9, name: 'Resonance Bookshelf Speakers', category: 'audio', price: 549, inStock: true, rating: 4.9 },
		{ id: 10, name: 'Trek Sports Watch', category: 'wearable', price: 199, inStock: true, rating: 4.0 },
		{ id: 11, name: 'Clarity Compact Camera', category: 'camera', price: 649, inStock: true, rating: 4.3 },
		{ id: 12, name: 'Driftwood Chromebook 13', category: 'laptop', price: 499, inStock: true, rating: 4.2 }
	] as const;

	async function loadProducts(): Promise<readonly Product[]> {
		// Simulated fetch — real version: return (await fetch('/api/products')).json()
		await new Promise((resolve) => setTimeout(resolve, 600));
		return SEED;
	}

	let query = $state('');
	let category = $state<'all' | Product['category']>('all');
	let searchEl: HTMLInputElement | null = $state(null);
	let promise = $state<Promise<readonly Product[]>>(loadProducts());

	const visible = $derived.by<readonly Product[]>(() => {
		// visible is derived from the resolved SEED, filtered client-side.
		// We only filter once the promise resolves — for the in-flight state, the
		// await block renders skeletons. Here we use the seed directly since it's
		// the same source of truth the promise resolves to.
		const q = query.trim().toLowerCase();
		return SEED.filter((p) => {
			const matchesQuery = q === '' || p.name.toLowerCase().includes(q);
			const matchesCategory = category === 'all' || p.category === category;
			return matchesQuery && matchesCategory;
		});
	});

	function reload(): void {
		promise = loadProducts();
	}

	function handleKey(e: KeyboardEvent): void {
		const active = document.activeElement;
		const activeTag = active?.tagName;
		if (e.key === '/' && activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
			e.preventDefault();
			searchEl?.focus();
		} else if (e.key === 'Escape') {
			query = '';
		}
	}

	function formatPrice(cents: number): string {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
			maximumFractionDigits: 0
		}).format(cents);
	}

	function stars(rating: number): string {
		const full = Math.round(rating);
		return '★'.repeat(full) + '☆'.repeat(5 - full);
	}
</script>

<svelte:window onkeydown={handleKey} />

<section class="page catalog">
	<header class="hero">
		<h1>Module 4 Project — Dynamic Product Listing</h1>
		<p class="tagline">
			A typed, filterable product catalog that combines every Module 4 concept: typed state,
			derived filters, <code>{`{#await}`}</code>, <code>&lt;svelte:window&gt;</code>, and keyed
			<code>{`{#each}`}</code>.
		</p>
	</header>

	<div class="toolbar">
		<label class="search">
			<span class="sr-only">Search products</span>
			<input
				type="search"
				bind:value={query}
				bind:this={searchEl}
				placeholder="Search products... (/ to focus)"
			/>
		</label>

		<label class="filter">
			<span class="sr-only">Filter by category</span>
			<select bind:value={category}>
				<option value="all">All categories</option>
				<option value="audio">Audio</option>
				<option value="wearable">Wearable</option>
				<option value="camera">Camera</option>
				<option value="laptop">Laptop</option>
			</select>
		</label>

		<button type="button" class="reload" onclick={reload}>Reload</button>
	</div>

	{#await promise}
		<div class="grid" aria-busy="true" aria-label="Loading products">
			{#each Array.from({ length: 6 }, (_, i) => i) as i (i)}
				<div class="skeleton">
					<div class="skeleton-line skeleton-title"></div>
					<div class="skeleton-line skeleton-sub"></div>
					<div class="skeleton-line skeleton-sub short"></div>
				</div>
			{/each}
		</div>
	{:then _products}
		{#if visible.length === 0}
			<p class="empty">No products match your filters.</p>
		{:else}
			<div class="grid">
				{#each visible as product (product.id)}
					<article class="card">
						<div class="card-head">
							<h2>{product.name}</h2>
							<span class="badge badge-{product.category}">{product.category}</span>
						</div>
						<p class="price">{formatPrice(product.price)}</p>
						<p class="rating" aria-label={`Rated ${product.rating} out of 5`}>
							<span class="stars">{stars(product.rating)}</span>
							<span class="rating-num">{product.rating.toFixed(1)}</span>
						</p>
						<span class="pill {product.inStock ? 'in' : 'out'}">
							{product.inStock ? 'In stock' : 'Sold out'}
						</span>
					</article>
				{/each}
			</div>
		{/if}
	{:catch err}
		<div class="error-card">
			<p>{err instanceof Error ? err.message : 'Failed to load products'}</p>
			<button type="button" onclick={reload}>Retry</button>
		</div>
	{/await}

	<footer class="built-with">
		<h3>Built with</h3>
		<ul>
			<li>Typed interfaces and literal unions for the <code>Product</code> model</li>
			<li><code>$state</code> for query, category, input ref, and promise</li>
			<li><code>$derived</code> for the filtered product list</li>
			<li><code>{`{#await}`}</code> with pending skeletons, then branch, and catch</li>
			<li>Keyed <code>{`{#each}`}</code> for stable product cards</li>
			<li><code>&lt;svelte:window&gt;</code> for global <kbd>/</kbd> and <kbd>Esc</kbd> shortcuts</li>
			<li><code>bind:this</code> for imperative focus on the search input</li>
		</ul>
	</footer>
</section>

<style>
	/* Per-page color personality — warm orange brand. Module 6.9 covers scoped theming in depth. */
	.catalog {
		--color-brand: oklch(66% 0.17 35);
		--color-brand-dim: oklch(56% 0.14 35);
	}

	.hero {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		margin-block-end: var(--space-lg);
	}
	.tagline {
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	kbd {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-xs);
	}

	.toolbar {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		margin-block-end: var(--space-lg);
		position: sticky;
		top: var(--space-sm);
		z-index: 2;
		box-shadow: var(--shadow-sm);
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
	}
	.search,
	.filter {
		display: flex;
		flex: 1 1 auto;
	}
	input[type='search'],
	select {
		width: 100%;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	input[type='search']:focus,
	select:focus {
		outline: none;
		border-color: var(--color-brand);
	}
	.reload {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.reload:hover {
		background: var(--color-brand-dim);
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
		transition: transform var(--dur-base) var(--ease-expressive),
			box-shadow var(--dur-base) var(--ease-out);
	}
	.card:hover {
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}
	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: var(--space-sm);
	}
	.card h2 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
		line-height: 1.3;
	}
	.badge {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		flex-shrink: 0;
	}
	.badge-audio {
		background: var(--color-brand);
		color: var(--color-surface);
	}
	.badge-wearable {
		background: var(--color-brand-dim);
		color: var(--color-surface);
	}
	.price {
		font-size: var(--text-xl);
		color: var(--color-brand);
		font-weight: 600;
		margin: 0;
	}
	.rating {
		display: flex;
		gap: var(--space-xs);
		align-items: center;
		margin: 0;
		font-size: var(--text-sm);
	}
	.stars {
		color: var(--color-warning);
		letter-spacing: 0.1em;
	}
	.rating-num {
		color: var(--color-text-muted);
	}
	.pill {
		align-self: flex-start;
		font-size: var(--text-xs);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
	}
	.pill.in {
		background: var(--color-success);
		color: var(--color-surface);
	}
	.pill.out {
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
	}

	.empty {
		padding: var(--space-xl);
		text-align: center;
		color: var(--color-text-muted);
		background: var(--color-surface-1);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-lg);
	}

	.error-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-lg);
		background: var(--color-surface-1);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-lg);
	}
	.error-card p {
		margin: 0;
		color: var(--color-error);
	}
	.error-card button {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-error);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
	}

	.skeleton {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		min-height: 180px;
	}
	.skeleton-line {
		height: 12px;
		background: var(--color-surface-2);
		border-radius: var(--radius-xs);
		animation: pulse 1.4s var(--ease-in-out) infinite;
	}
	.skeleton-title {
		height: 18px;
		width: 70%;
	}
	.skeleton-sub {
		width: 90%;
	}
	.skeleton-sub.short {
		width: 40%;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.45;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.skeleton-line {
			animation: none;
		}
		.card {
			transition: none;
		}
	}

	.built-with {
		margin-block-start: var(--space-2xl);
		padding-block-start: var(--space-lg);
		border-top: 1px solid var(--color-border);
	}
	.built-with h3 {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-lg);
	}
	.built-with ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	@media (min-width: 480px) {
		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.toolbar {
			flex-direction: row;
			align-items: center;
		}
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
