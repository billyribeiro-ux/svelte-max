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

	<h2>Break it on purpose</h2>

	<p class="prose">
		Deliberately misuse <code>$derived</code> to understand its rules. Try each experiment, observe the behavior, then undo it.
	</p>

	<ol class="experiments">
		<li>
			<strong>Put a <code>fetch()</code> inside <code>$derived</code>.</strong> Try
			<code>const data = $derived(fetch('/api'))</code>. Svelte warns because derivations
			must be pure — no side effects, no async operations. A <code>fetch</code> is a side
			effect that belongs in <code>$effect</code>, not in a computation that should return
			a synchronous value.
		</li>
		<li>
			<strong>Write to state inside <code>$derived</code>.</strong> Try adding
			<code>count = items.length</code> inside a derived expression where <code>count</code>
			is <code>$state</code>. This creates an infinite loop: writing to state triggers a
			re-derive, which writes to state again, which triggers another re-derive. Derivations
			must be read-only.
		</li>
		<li>
			<strong>Read a derived value twice.</strong> Add
			<code>console.log(subtotal, subtotal)</code> in the template. Check the console — the
			computation only runs once. Derived values are memoized: Svelte caches the result and
			only recomputes when an input actually changes, no matter how many times you read it.
		</li>
		<li>
			<strong>Chain 5 derived values.</strong> Create
			<code>const a = $derived(subtotal * 2)</code>,
			<code>const b = $derived(a + tax)</code>, and so on. Each derived only recomputes if
			its specific inputs changed. If you change a single item's quantity, only the
			derivations in the dependency chain recompute — the rest are untouched.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		<code>$derived(expr)</code> creates a value that automatically recalculates whenever any
		reactive dependency used in the expression changes. It is pure computation: no side
		effects, no network calls, no DOM writes. The rule is simple — if you are computing a
		value from other state, use <code>$derived</code>; if you are causing a side effect,
		use <code>$effect</code>. This separation keeps the reactive graph predictable and
		prevents the cascading update bugs that plague imperative state management.
	</p>

	<p class="prose">
		Derivations are synchronous and memoized. Reading the same derived value ten times in
		one render cycle costs nothing because the result is cached. Svelte only recomputes
		when one of the tracked dependencies actually changes. This makes chains of derivations
		efficient: <code>subtotal</code> feeds <code>tax</code>, which feeds
		<code>total</code>, and changing a single item's quantity only recomputes the values in
		that specific dependency chain.
	</p>

	<p class="prose">
		Chained derivations compose cleanly because each one declares its own dependency set
		implicitly through the reactive reads in its expression. There are no dependency arrays
		to maintain, no stale closure bugs, and no manual memoization. You write plain
		JavaScript expressions and Svelte handles the rest. When the expression is too complex
		for a single line, use <code>$derived.by</code> to get a full function body.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-2/2-8-derived-by">2.8 — $derived.by</a> — use a function body for
		multi-step derivations with branching, loops, and intermediate variables.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

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
		inline-size: 32px;
		block-size: 32px;
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
		min-inline-size: 2ch;
		text-align: center;
	}

	.line-total {
		font-variant-numeric: tabular-nums;
		font-size: var(--text-base);
		font-weight: 600;
	}

	.remove {
		font: inherit;
		inline-size: 32px;
		block-size: 32px;
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
		margin-block-start: var(--space-sm);
		padding-block-start: var(--space-sm);
		border-block-start: 1px solid var(--color-border);
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}

	.lines {
		padding-inline-start: 0;
	}

	@media (min-inline-size: 768px) {
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
