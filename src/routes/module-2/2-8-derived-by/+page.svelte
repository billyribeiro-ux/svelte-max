<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface Product {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\tcategory: 'audio' | 'wearable' | 'camera';\n" +
		"\t\tprice: number;\n" +
		"\t}\n" +
		"\n" +
		"\tconst products: readonly Product[] = [\n" +
		"\t\t{ id: 1, name: 'Aura Over-Ear', category: 'audio', price: 249 },\n" +
		"\t\t{ id: 2, name: 'Pulse Earbuds', category: 'audio', price: 129 },\n" +
		"\t\t{ id: 3, name: 'Echo Mini Speaker', category: 'audio', price: 79 },\n" +
		"\t\t{ id: 4, name: 'Vibe Soundbar', category: 'audio', price: 329 },\n" +
		"\t\t{ id: 5, name: 'Track Fit Watch', category: 'wearable', price: 199 },\n" +
		"\t\t{ id: 6, name: 'Glow Ring', category: 'wearable', price: 299 },\n" +
		"\t\t{ id: 7, name: 'Stride Band', category: 'wearable', price: 89 },\n" +
		"\t\t{ id: 8, name: 'Focus Glasses', category: 'wearable', price: 449 },\n" +
		"\t\t{ id: 9, name: 'Sight Pro DSLR', category: 'camera', price: 1299 },\n" +
		"\t\t{ id: 10, name: 'Pocket Action Cam', category: 'camera', price: 349 },\n" +
		"\t\t{ id: 11, name: 'Sky Drone 4K', category: 'camera', price: 899 },\n" +
		"\t\t{ id: 12, name: 'Lens Kit Compact', category: 'camera', price: 229 }\n" +
		"\t];\n" +
		"\n" +
		"\tconst PAGE_SIZE = 4;\n" +
		"\n" +
		"\tlet query = $state\u003cstring\u003e('');\n" +
		"\tlet category = $state\u003c'all' | Product['category']\u003e('all');\n" +
		"\tlet sortBy = $state\u003c'name' | 'price'\u003e('name');\n" +
		"\tlet page = $state\u003cnumber\u003e(1);\n" +
		"\n" +
		"\tinterface VisibleResult {\n" +
		"\t\titems: Product[];\n" +
		"\t\ttotalPages: number;\n" +
		"\t\ttotalCount: number;\n" +
		"\t\tclampedPage: number;\n" +
		"\t}\n" +
		"\n" +
		"\tconst visible = $derived.by\u003cVisibleResult\u003e(() =\u003e {\n" +
		"\t\tlet list: Product[] = [...products];\n" +
		"\n" +
		"\t\tconst q = query.trim().toLowerCase();\n" +
		"\t\tif (q) {\n" +
		"\t\t\tlist = list.filter((p) =\u003e p.name.toLowerCase().includes(q));\n" +
		"\t\t}\n" +
		"\n" +
		"\t\tif (category !== 'all') {\n" +
		"\t\t\tlist = list.filter((p) =\u003e p.category === category);\n" +
		"\t\t}\n" +
		"\n" +
		"\t\tlist.sort((a, b) =\u003e\n" +
		"\t\t\tsortBy === 'name' ? a.name.localeCompare(b.name) : a.price - b.price\n" +
		"\t\t);\n" +
		"\n" +
		"\t\tconst totalCount = list.length;\n" +
		"\t\tconst totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));\n" +
		"\t\tconst clampedPage = Math.min(Math.max(1, page), totalPages);\n" +
		"\t\tconst start = (clampedPage - 1) * PAGE_SIZE;\n" +
		"\n" +
		"\t\treturn {\n" +
		"\t\t\titems: list.slice(start, start + PAGE_SIZE),\n" +
		"\t\t\ttotalPages,\n" +
		"\t\t\ttotalCount,\n" +
		"\t\t\tclampedPage\n" +
		"\t\t};\n" +
		"\t});\n" +
		"\n" +
		"\tconst formatter = new Intl.NumberFormat('en-US', {\n" +
		"\t\tstyle: 'currency',\n" +
		"\t\tcurrency: 'USD',\n" +
		"\t\tmaximumFractionDigits: 0\n" +
		"\t});\n" +
		"\n" +
		"\tfunction prev(): void {\n" +
		"\t\tif (visible.clampedPage \u003e 1) page = visible.clampedPage - 1;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction next(): void {\n" +
		"\t\tif (visible.clampedPage \u003c visible.totalPages) page = visible.clampedPage + 1;\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.8 — $derived.by\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003ccode\u003e$derived(expr)\u003c/code\u003e only takes a single expression. The moment you need intermediate\n" +
		"\t\tvariables, branches, or loops, switch to \u003ccode\u003e$derived.by(() =\u003e &#123; ... &#125;)\u003c/code\u003e. The\n" +
		"\t\tsemantics are identical — pure, memoized, writable — but you get a full function body to work\n" +
		"\t\tin. It's the natural shape for chained transforms like \u003cem\u003efilter → sort → paginate\u003c/em\u003e. Keep\n" +
		"\t\tthe function pure: no side effects, no \u003ccode\u003efetch\u003c/code\u003e. If a computation depends on other\n" +
		"\t\tderived state (here, clamping \u003ccode\u003epage\u003c/code\u003e to \u003ccode\u003etotalPages\u003c/code\u003e), prefer computing it\n" +
		"\t\tinside the same \u003ccode\u003e$derived.by\u003c/code\u003e rather than reaching for an \u003ccode\u003e$effect\u003c/code\u003e.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cdiv class=\"filters\"\u003e\n" +
		"\t\t\t\u003clabel class=\"filter\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eSearch\u003c/span\u003e\n" +
		"\t\t\t\t\u003cinput type=\"search\" bind:value={query} placeholder=\"Try 'watch'...\" /\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel class=\"filter\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eCategory\u003c/span\u003e\n" +
		"\t\t\t\t\u003cselect bind:value={category}\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"all\"\u003eAll\u003c/option\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"audio\"\u003eAudio\u003c/option\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"wearable\"\u003eWearable\u003c/option\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"camera\"\u003eCamera\u003c/option\u003e\n" +
		"\t\t\t\t\u003c/select\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\t\u003clabel class=\"filter\"\u003e\n" +
		"\t\t\t\t\u003cspan\u003eSort by\u003c/span\u003e\n" +
		"\t\t\t\t\u003cselect bind:value={sortBy}\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"name\"\u003eName\u003c/option\u003e\n" +
		"\t\t\t\t\t\u003coption value=\"price\"\u003ePrice\u003c/option\u003e\n" +
		"\t\t\t\t\u003c/select\u003e\n" +
		"\t\t\t\u003c/label\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\n" +
		"\t\t\u003cp class=\"status\" role=\"status\"\u003e\n" +
		"\t\t\tShowing {visible.items.length} of {visible.totalCount} · page {visible.clampedPage} of {visible.totalPages}\n" +
		"\t\t\u003c/p\u003e\n" +
		"\n" +
		"\t\t{#if visible.items.length === 0}\n" +
		"\t\t\t\u003cp class=\"empty\"\u003eNo products match your filters.\u003c/p\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cdiv class=\"grid\"\u003e\n" +
		"\t\t\t\t{#each visible.items as product (product.id)}\n" +
		"\t\t\t\t\t\u003carticle class=\"card\"\u003e\n" +
		"\t\t\t\t\t\t\u003cspan class=\"tag\"\u003e{product.category}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003ch4\u003e{product.name}\u003c/h4\u003e\n" +
		"\t\t\t\t\t\t\u003cp class=\"price\"\u003e{formatter.format(product.price)}\u003c/p\u003e\n" +
		"\t\t\t\t\t\u003c/article\u003e\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cdiv class=\"pager\"\u003e\n" +
		"\t\t\t\u003cbutton type=\"button\" onclick={prev} disabled={visible.clampedPage \u003c= 1}\u003e← Prev\u003c/button\u003e\n" +
		"\t\t\t\u003cbutton\n" +
		"\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\tonclick={next}\n" +
		"\t\t\t\tdisabled={visible.clampedPage \u003e= visible.totalPages}\n" +
		"\t\t\t\u003e\n" +
		"\t\t\t\tNext →\n" +
		"\t\t\t\u003c/button\u003e\n" +
		"\t\t\u003c/div\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$derived.by\u003c/code\u003e gives you a function body for multi-step derivations.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eChained filter → sort → paginate is the canonical use case.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eClamp dependent values (like the current page) \u003cem\u003einside\u003c/em\u003e the derivation to stay pure.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReturning an object lets one derivation expose several computed fields at once.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		transition: border-color var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
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
		transition: background var(--dur-base) var(--ease-out);
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
