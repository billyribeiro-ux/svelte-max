<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface CartItem {
		id: number;
		name: string;
		price: number;
		qty: number;
	}

	let items = $state<CartItem[]>([
		{ id: 1, name: 'Studio Headphones', price: 149.0, qty: 1 },
		{ id: 2, name: 'Mechanical Keyboard', price: 129.5, qty: 2 },
		{ id: 3, name: 'USB-C Hub', price: 39.99, qty: 1 }
	]);

	const subtotal = $derived(items.reduce((sum, i) => sum + i.price * i.qty, 0));
	const tax = $derived(subtotal * 0.08);
	const total = $derived(subtotal + tax);

	// $inspect — dev-only reactive value logging (stripped in production)
	$inspect(subtotal, tax, total);

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	function money(n: number): string {
		return formatter.format(n);
	}

	function inc(item: CartItem): void {
		item.qty += 1;
	}

	function dec(item: CartItem): void {
		if (item.qty > 0) item.qty -= 1;
	}

	function remove(id: number): void {
		items = items.filter((i) => i.id !== id);
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface CartItem {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\tprice: number;\n" +
		"\t\tqty: number;\n" +
		"\t}\n" +
		"\n" +
		"\tlet items = $state\u003cCartItem[]\u003e([\n" +
		"\t\t{ id: 1, name: 'Studio Headphones', price: 149.0, qty: 1 },\n" +
		"\t\t{ id: 2, name: 'Mechanical Keyboard', price: 129.5, qty: 2 },\n" +
		"\t\t{ id: 3, name: 'USB-C Hub', price: 39.99, qty: 1 }\n" +
		"\t]);\n" +
		"\n" +
		"\tconst subtotal = $derived(items.reduce((sum, i) =\u003e sum + i.price * i.qty, 0));\n" +
		"\tconst tax = $derived(subtotal * 0.08);\n" +
		"\tconst total = $derived(subtotal + tax);\n" +
		"\n" +
		"\tconst formatter = new Intl.NumberFormat('en-US', {\n" +
		"\t\tstyle: 'currency',\n" +
		"\t\tcurrency: 'USD'\n" +
		"\t});\n" +
		"\n" +
		"\tfunction money(n: number): string {\n" +
		"\t\treturn formatter.format(n);\n" +
		"\t}\n" +
		"\n" +
		"\tfunction inc(item: CartItem): void {\n" +
		"\t\titem.qty += 1;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction dec(item: CartItem): void {\n" +
		"\t\tif (item.qty \u003e 0) item.qty -= 1;\n" +
		"\t}\n" +
		"\n" +
		"\tfunction remove(id: number): void {\n" +
		"\t\titems = items.filter((i) =\u003e i.id !== id);\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e2.7 — $derived\u003c/h1\u003e\n" +
		"\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003ccode\u003e$derived(expr)\u003c/code\u003e creates a value that automatically recalculates whenever any reactive\n" +
		"\t\tdependency used in \u003ccode\u003eexpr\u003c/code\u003e changes. It is \u003cem\u003epure\u003c/em\u003e: no side effects, no\n" +
		"\t\t\u003ccode\u003efetch\u003c/code\u003e, no DOM writes. The rule of thumb is simple — if you're computing a value from\n" +
		"\t\tother state, use \u003ccode\u003e$derived\u003c/code\u003e; if you're writing to the outside world, use\n" +
		"\t\t\u003ccode\u003e$effect\u003c/code\u003e. Derivations are synchronous and memoized, so reading the same derived twice\n" +
		"\t\tin a row costs nothing. They're also writable: you can temporarily override a derived value for\n" +
		"\t\toptimistic UI and it will snap back the next time an input changes.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t{#if items.length === 0}\n" +
		"\t\t\t\u003cp class=\"empty\"\u003eYour cart is empty.\u003c/p\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cul class=\"lines\"\u003e\n" +
		"\t\t\t\t{#each items as item (item.id)}\n" +
		"\t\t\t\t\t\u003cli class=\"line\"\u003e\n" +
		"\t\t\t\t\t\t\u003cdiv class=\"info\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"name\"\u003e{item.name}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"price\"\u003e{money(item.price)} each\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003cdiv class=\"qty\"\u003e\n" +
		"\t\t\t\t\t\t\t\u003cbutton type=\"button\" aria-label=\"Decrease\" onclick={() =\u003e dec(item)}\u003e−\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\t\u003cspan class=\"count\"\u003e{item.qty}\u003c/span\u003e\n" +
		"\t\t\t\t\t\t\t\u003cbutton type=\"button\" aria-label=\"Increase\" onclick={() =\u003e inc(item)}\u003e+\u003c/button\u003e\n" +
		"\t\t\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003cdiv class=\"line-total\"\u003e{money(item.price * item.qty)}\u003c/div\u003e\n" +
		"\t\t\t\t\t\t\u003cbutton\n" +
		"\t\t\t\t\t\t\ttype=\"button\"\n" +
		"\t\t\t\t\t\t\tclass=\"remove\"\n" +
		"\t\t\t\t\t\t\taria-label=\"Remove {item.name}\"\n" +
		"\t\t\t\t\t\t\tonclick={() =\u003e remove(item.id)}\n" +
		"\t\t\t\t\t\t\u003e\n" +
		"\t\t\t\t\t\t\t✕\n" +
		"\t\t\t\t\t\t\u003c/button\u003e\n" +
		"\t\t\t\t\t\u003c/li\u003e\n" +
		"\t\t\t\t{/each}\n" +
		"\t\t\t\u003c/ul\u003e\n" +
		"\n" +
		"\t\t\t\u003caside class=\"totals\" aria-label=\"Order totals\"\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eSubtotal\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003e{money(subtotal)}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"row\"\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eTax (8%)\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003e{money(tax)}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\t\u003cdiv class=\"row grand\"\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003eTotal\u003c/span\u003e\n" +
		"\t\t\t\t\t\u003cspan\u003e{money(total)}\u003c/span\u003e\n" +
		"\t\t\t\t\u003c/div\u003e\n" +
		"\t\t\t\u003c/aside\u003e\n" +
		"\t\t{/if}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e$derived(expr)\u003c/code\u003e memoizes a pure computation of reactive inputs.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eDerivations are synchronous — read them like any other value.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eChained derivations (\u003ccode\u003etax\u003c/code\u003e from \u003ccode\u003esubtotal\u003c/code\u003e) compose cleanly.\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eUse \u003ccode\u003e$derived\u003c/code\u003e for values, \u003ccode\u003e$effect\u003c/code\u003e for side effects.\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>2.7 — $derived</h1>

	<p class="concept">
		<code>$derived(expr)</code> creates a value that automatically recalculates whenever any reactive
		dependency used in <code>expr</code> changes. It is <em>pure</em>: no side effects, no
		<code>fetch</code>, no DOM writes. The rule of thumb is simple — if you're computing a value from
		other state, use <code>$derived</code>; if you're writing to the outside world, use
		<code>$effect</code>. Derivations are synchronous and memoized, so reading the same derived twice
		in a row costs nothing. They're also writable: you can temporarily override a derived value for
		optimistic UI and it will snap back the next time an input changes.
	</p>

	<div class="build">
		{#if items.length === 0}
			<p class="empty">Your cart is empty.</p>
		{:else}
			<ul class="lines">
				{#each items as item (item.id)}
					<li class="line">
						<div class="info">
							<span class="name">{item.name}</span>
							<span class="price">{money(item.price)} each</span>
						</div>
						<div class="qty">
							<button type="button" aria-label="Decrease" onclick={() => dec(item)}>−</button>
							<span class="count">{item.qty}</span>
							<button type="button" aria-label="Increase" onclick={() => inc(item)}>+</button>
						</div>
						<div class="line-total">{money(item.price * item.qty)}</div>
						<button
							type="button"
							class="remove"
							aria-label="Remove {item.name}"
							onclick={() => remove(item.id)}
						>
							✕
						</button>
					</li>
				{/each}
			</ul>

			<aside class="totals" aria-label="Order totals">
				<div class="row">
					<span>Subtotal</span>
					<span>{money(subtotal)}</span>
				</div>
				<div class="row">
					<span>Tax (8%)</span>
					<span>{money(tax)}</span>
				</div>
				<div class="row grand">
					<span>Total</span>
					<span>{money(total)}</span>
				</div>
			</aside>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$derived(expr)</code> memoizes a pure computation of reactive inputs.</li>
		<li>Derivations are synchronous — read them like any other value.</li>
		<li>Chained derivations (<code>tax</code> from <code>subtotal</code>) compose cleanly.</li>
		<li>Use <code>$derived</code> for values, <code>$effect</code> for side effects.</li>
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
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.empty {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}

	.lines {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.line {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: var(--space-sm) var(--space-md);
		align-items: center;
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.info {
		display: flex;
		flex-direction: column;
		grid-column: 1 / -1;
	}

	.name {
		font-size: var(--text-base);
		font-weight: 600;
		color: var(--color-text);
	}

	.price {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	.qty {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}

	.qty button {
		font: inherit;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
		font-size: var(--text-base);
		transition: background var(--dur-base) var(--ease-out);
	}

	.qty button:hover {
		background: var(--color-surface-2);
	}

	.count {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		min-width: 2ch;
		text-align: center;
	}

	.line-total {
		font-variant-numeric: tabular-nums;
		font-size: var(--text-base);
		font-weight: 600;
	}

	.remove {
		font: inherit;
		width: 32px;
		height: 32px;
		border-radius: var(--radius-full);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text-muted);
		cursor: pointer;
		transition: color var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
	}

	.remove:hover {
		color: var(--color-error);
		border-color: var(--color-error);
	}

	.totals {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		align-self: start;
	}

	.totals .row {
		display: flex;
		justify-content: space-between;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-variant-numeric: tabular-nums;
	}

	.totals .grand {
		margin-top: var(--space-sm);
		padding-top: var(--space-sm);
		border-top: 1px solid var(--color-border);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
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

	.lines {
		padding-left: 0;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.build {
			grid-template-columns: 2fr 1fr;
		}

		.line {
			grid-template-columns: 2fr auto auto auto;
		}

		.info {
			grid-column: auto;
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
