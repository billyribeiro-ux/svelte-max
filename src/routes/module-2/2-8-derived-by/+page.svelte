<script lang="ts">
	interface Product {
		id: number;
		name: string;
		category: 'audio' | 'wearable' | 'camera';
		price: number;
	}

	const products: readonly Product[] = [
		{ id: 1, name: 'Aura Over-Ear', category: 'audio', price: 249 },
		{ id: 2, name: 'Pulse Earbuds', category: 'audio', price: 129 },
		{ id: 3, name: 'Echo Mini Speaker', category: 'audio', price: 79 },
		{ id: 4, name: 'Vibe Soundbar', category: 'audio', price: 329 },
		{ id: 5, name: 'Track Fit Watch', category: 'wearable', price: 199 },
		{ id: 6, name: 'Glow Ring', category: 'wearable', price: 299 },
		{ id: 7, name: 'Stride Band', category: 'wearable', price: 89 },
		{ id: 8, name: 'Focus Glasses', category: 'wearable', price: 449 },
		{ id: 9, name: 'Sight Pro DSLR', category: 'camera', price: 1299 },
		{ id: 10, name: 'Pocket Action Cam', category: 'camera', price: 349 },
		{ id: 11, name: 'Sky Drone 4K', category: 'camera', price: 899 },
		{ id: 12, name: 'Lens Kit Compact', category: 'camera', price: 229 }
	];

	const PAGE_SIZE = 4;

	let query = $state<string>('');
	let category = $state<'all' | Product['category']>('all');
	let sortBy = $state<'name' | 'price'>('name');
	let page = $state<number>(1);

	interface VisibleResult {
		items: Product[];
		totalPages: number;
		totalCount: number;
		clampedPage: number;
	}

	const visible = $derived.by<VisibleResult>(() => {
		let list: Product[] = [...products];

		const q = query.trim().toLowerCase();
		if (q) {
			list = list.filter((p) => p.name.toLowerCase().includes(q));
		}

		if (category !== 'all') {
			list = list.filter((p) => p.category === category);
		}

		list.sort((a, b) =>
			sortBy === 'name' ? a.name.localeCompare(b.name) : a.price - b.price
		);

		const totalCount = list.length;
		const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
		const clampedPage = Math.min(Math.max(1, page), totalPages);
		const start = (clampedPage - 1) * PAGE_SIZE;

		return {
			items: list.slice(start, start + PAGE_SIZE),
			totalPages,
			totalCount,
			clampedPage
		};
	});

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0
	});

	function prev(): void {
		if (visible.clampedPage > 1) page = visible.clampedPage - 1;
	}

	function next(): void {
		if (visible.clampedPage < visible.totalPages) page = visible.clampedPage + 1;
	}
</script>

<section class="page">
	<h1>2.8 — $derived.by</h1>

	<p class="concept">
		<code>$derived(expr)</code> only takes a single expression. The moment you need intermediate
		variables, branches, or loops, switch to <code>$derived.by(() => &#123; ... &#125;)</code>. The
		semantics are identical — pure, memoized, writable — but you get a full function body to work
		in. It's the natural shape for chained transforms like <em>filter → sort → paginate</em>. Keep
		the function pure: no side effects, no <code>fetch</code>. If a computation depends on other
		derived state (here, clamping <code>page</code> to <code>totalPages</code>), prefer computing it
		inside the same <code>$derived.by</code> rather than reaching for an <code>$effect</code>.
	</p>

	<div class="build">
		<div class="filters">
			<label class="filter">
				<span>Search</span>
				<input type="search" bind:value={query} placeholder="Try 'watch'..." />
			</label>
			<label class="filter">
				<span>Category</span>
				<select bind:value={category}>
					<option value="all">All</option>
					<option value="audio">Audio</option>
					<option value="wearable">Wearable</option>
					<option value="camera">Camera</option>
				</select>
			</label>
			<label class="filter">
				<span>Sort by</span>
				<select bind:value={sortBy}>
					<option value="name">Name</option>
					<option value="price">Price</option>
				</select>
			</label>
		</div>

		<p class="status" role="status">
			Showing {visible.items.length} of {visible.totalCount} · page {visible.clampedPage} of {visible.totalPages}
		</p>

		{#if visible.items.length === 0}
			<p class="empty">No products match your filters.</p>
		{:else}
			<div class="grid">
				{#each visible.items as product (product.id)}
					<article class="card">
						<span class="tag">{product.category}</span>
						<h4>{product.name}</h4>
						<p class="price">{formatter.format(product.price)}</p>
					</article>
				{/each}
			</div>
		{/if}

		<div class="pager">
			<button type="button" onclick={prev} disabled={visible.clampedPage <= 1}>← Prev</button>
			<button
				type="button"
				onclick={next}
				disabled={visible.clampedPage >= visible.totalPages}
			>
				Next →
			</button>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$derived.by</code> gives you a function body for multi-step derivations.</li>
		<li>Chained filter → sort → paginate is the canonical use case.</li>
		<li>Clamp dependent values (like the current page) <em>inside</em> the derivation to stay pure.</li>
		<li>Returning an object lets one derivation expose several computed fields at once.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

	h4 {
		font-size: var(--text-base);
		margin: 0;
		color: var(--color-text);
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.filters {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.filter {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		font-weight: 600;
	}

	input[type='search'],
	select {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
		text-transform: none;
		letter-spacing: normal;
		font-weight: normal;
	}

	input[type='search']:focus,
	select:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	.status {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	.empty {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-align: center;
		padding: var(--space-lg);
		margin: 0;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-sm);
	}

	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		transition: border-color var(--dur-2) var(--ease-1), transform var(--dur-2) var(--ease-1);
	}

	.card:hover {
		border-color: var(--color-brand);
		transform: translateY(-2px);
	}

	.tag {
		align-self: flex-start;
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-brand);
		background: var(--color-surface-2);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
	}

	.price {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}

	.pager {
		display: flex;
		justify-content: space-between;
		gap: var(--space-sm);
	}

	.pager button {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
		cursor: pointer;
		transition: background var(--dur-2) var(--ease-1);
	}

	.pager button:hover:not(:disabled) {
		background: var(--color-surface-2);
	}

	.pager button:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
		padding-left: var(--space-lg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.filters {
			grid-template-columns: 2fr 1fr 1fr;
		}

		.grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
