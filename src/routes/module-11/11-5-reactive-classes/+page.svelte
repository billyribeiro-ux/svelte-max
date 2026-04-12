<script lang="ts">
	import { CartStore, type CartItem } from '$lib/stores/cart.svelte';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const cart = new CartStore();

	// $inspect — dev-only logging of reactive class state changes
	$inspect(cart.items);

	const products = [
		{ id: 'p1', name: 'Svelte T-Shirt', price: 29.99 },
		{ id: 'p2', name: 'Runes Mug', price: 14.99 },
		{ id: 'p3', name: 'SvelteKit Hoodie', price: 54.99 },
		{ id: 'p4', name: '$state Sticker Pack', price: 4.99 }
	] as const;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { CartStore, type CartItem } from '$lib/stores/cart.svelte';\n" +
		"\n" +
		"	const cart = new CartStore();\n" +
		"\n" +
		"	const products = [\n" +
		"		{ id: 'p1', name: 'Svelte T-Shirt', price: 29.99 },\n" +
		"		{ id: 'p2', name: 'Runes Mug', price: 14.99 },\n" +
		"		{ id: 'p3', name: 'SvelteKit Hoodie', price: 54.99 },\n" +
		"		{ id: 'p4', name: '$state Sticker Pack', price: 4.99 }\n" +
		"	] as const;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.5 — Reactive Classes with $state Fields\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Svelte 5 lets you use \u003ccode\u003e$state\u003c/code\u003e directly on class fields. Combined with\n" +
		"		getters (\u003ccode\u003eget total()\u003c/code\u003e), you get a fully reactive class instance that\n" +
		"		updates the UI whenever its internal state changes. This is the \u003cstrong\u003eclass-based\n" +
		"		state pattern\u003c/strong\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe CartStore Class\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003eexport class CartStore &#123;\n" +
		"  items = $state&lt;CartItem[]&gt;([]);\n" +
		"\n" +
		"  get total(): number &#123;\n" +
		"    return this.items.reduce(\n" +
		"      (sum, item) =&gt; sum + item.price * item.quantity, 0\n" +
		"    );\n" +
		"  &#125;\n" +
		"\n" +
		"  add(item) &#123; /* push or increment qty */ &#125;\n" +
		"  remove(id) &#123; /* filter out */ &#125;\n" +
		"&#125;\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo: Shopping Cart\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"product-grid\"\u003e\n" +
		"			{#each products as product}\n" +
		"				\u003cdiv class=\"product-card\"\u003e\n" +
		"					\u003cspan class=\"product-name\"\u003e{product.name}\u003c/span\u003e\n" +
		"					\u003cspan class=\"product-price\"\u003e${product.price.toFixed(2)}\u003c/span\u003e\n" +
		"					\u003cbutton onclick={() =\u003e cart.add(product)}\u003eAdd to Cart\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"cart-section\"\u003e\n" +
		"			\u003ch4\u003eCart ({cart.count} items)\u003c/h4\u003e\n" +
		"			{#if cart.items.length === 0}\n" +
		"				\u003cp class=\"empty\"\u003eCart is empty\u003c/p\u003e\n" +
		"			{:else}\n" +
		"				\u003cul class=\"cart-list\"\u003e\n" +
		"					{#each cart.items as item}\n" +
		"						\u003cli class=\"cart-item\"\u003e\n" +
		"							\u003cspan\u003e{item.name} x{item.quantity}\u003c/span\u003e\n" +
		"							\u003cspan class=\"item-subtotal\"\u003e${(item.price * item.quantity).toFixed(2)}\u003c/span\u003e\n" +
		"							\u003cbutton class=\"remove-btn\" onclick={() =\u003e cart.remove(item.id)}\u003eRemove\u003c/button\u003e\n" +
		"						\u003c/li\u003e\n" +
		"					{/each}\n" +
		"				\u003c/ul\u003e\n" +
		"				\u003cdiv class=\"cart-total\"\u003e\n" +
		"					\u003cstrong\u003eTotal: ${cart.total.toFixed(2)}\u003c/strong\u003e\n" +
		"					\u003cbutton class=\"clear-btn\" onclick={() =\u003e cart.clear()}\u003eClear All\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{/if}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Takeaways\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$state\u003c/code\u003e on class fields makes them reactive — mutations trigger UI updates\u003c/li\u003e\n" +
		"		\u003cli\u003eGetters like \u003ccode\u003eget total()\u003c/code\u003e act as derived values, automatically recalculated\u003c/li\u003e\n" +
		"		\u003cli\u003eClass instances can be shared across components via context or module exports\u003c/li\u003e\n" +
		"		\u003cli\u003eMethods like \u003ccode\u003eadd()\u003c/code\u003e and \u003ccode\u003eremove()\u003c/code\u003e encapsulate state mutations cleanly\u003c/li\u003e\n" +
		"		\u003cli\u003eThis pattern replaces complex store logic with idiomatic TypeScript classes\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e$state\u003c/code\u003e on class fields makes mutations automatically trigger UI updates.\u003c/li\u003e\n" +
		"		\u003cli\u003eGetters like \u003ccode\u003eget total()\u003c/code\u003e act as derived values that recalculate when fields change.\u003c/li\u003e\n" +
		"		\u003cli\u003eClass instances encapsulate state and methods, replacing complex store logic with idiomatic TypeScript.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>11.5 — Reactive Classes with $state Fields</h1>

	<p class="concept">
		Svelte 5 lets you use <code>$state</code> directly on class fields. Combined with
		getters (<code>get total()</code>), you get a fully reactive class instance that
		updates the UI whenever its internal state changes. This is the <strong>class-based
		state pattern</strong>.
	</p>

	<h3>The CartStore Class</h3>
	<div class="build">
		<pre><code>export class CartStore &#123;
  items = $state&lt;CartItem[]&gt;([]);

  get total(): number &#123;
    return this.items.reduce(
      (sum, item) =&gt; sum + item.price * item.quantity, 0
    );
  &#125;

  add(item) &#123; /* push or increment qty */ &#125;
  remove(id) &#123; /* filter out */ &#125;
&#125;</code></pre>
	</div>

	<h3>Live Demo: Shopping Cart</h3>
	<div class="build">
		<div class="product-grid">
			{#each products as product}
				<div class="product-card">
					<span class="product-name">{product.name}</span>
					<span class="product-price">${product.price.toFixed(2)}</span>
					<button onclick={() => cart.add(product)}>Add to Cart</button>
				</div>
			{/each}
		</div>

		<div class="cart-section">
			<h4>Cart ({cart.count} items)</h4>
			{#if cart.items.length === 0}
				<p class="empty">Cart is empty</p>
			{:else}
				<ul class="cart-list">
					{#each cart.items as item}
						<li class="cart-item">
							<span>{item.name} x{item.quantity}</span>
							<span class="item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
							<button class="remove-btn" onclick={() => cart.remove(item.id)}>Remove</button>
						</li>
					{/each}
				</ul>
				<div class="cart-total">
					<strong>Total: ${cart.total.toFixed(2)}</strong>
					<button class="clear-btn" onclick={() => cart.clear()}>Clear All</button>
				</div>
			{/if}
		</div>
	</div>

	<h3>Key Takeaways</h3>
	<ul>
		<li><code>$state</code> on class fields makes them reactive — mutations trigger UI updates</li>
		<li>Getters like <code>get total()</code> act as derived values, automatically recalculated</li>
		<li>Class instances can be shared across components via context or module exports</li>
		<li>Methods like <code>add()</code> and <code>remove()</code> encapsulate state mutations cleanly</li>
		<li>This pattern replaces complex store logic with idiomatic TypeScript classes</li>
	</ul>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>$state</code> from the <code>items</code> field and use a plain array.</strong> Adding items no longer triggers UI updates because Svelte cannot track mutations on a non-reactive array.</li>
		<li><strong>Replace the <code>get total()</code> getter with a regular method <code>total()</code> and call it without parentheses in the template.</strong> The template renders the function reference instead of the computed value, and no error is thrown because Svelte treats it as a valid expression.</li>
		<li><strong>Destructure the cart instance: <code>const {'{ add, items }'} = cart;</code> and use <code>items</code> directly.</strong> The destructured <code>items</code> is a snapshot, not a reactive binding, so the template never updates when items change.</li>
		<li><strong>Push an item directly with <code>cart.items.push(item)</code> instead of using the <code>add()</code> method.</strong> The push works but the quantity-increment logic in <code>add()</code> is bypassed, so adding the same product twice creates duplicate entries instead of incrementing the quantity.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte 5 lets you use <code>$state</code> directly on class fields, turning any class into a reactive data container. When you mutate a <code>$state</code> field, Svelte automatically re-renders every component that reads it, whether directly in the template or through a getter.</p>
	<p class="prose">Getters like <code>get total()</code> behave as derived values: they recalculate whenever the underlying <code>$state</code> fields change. This gives you computed properties for free without needing <code>$derived</code> explicitly, because the getter is re-evaluated on every access during rendering.</p>
	<p class="prose">The class-based pattern encapsulates state and mutation logic behind a clean API. Methods like <code>add()</code> and <code>remove()</code> ensure invariants (like incrementing quantity for duplicates) are always enforced, and the class can be shared across components via context or module exports.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-6-url-state">11.6 — URL SearchParams as State</a> — store filter and pagination state in the URL.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

	pre {
		margin: 0;
		overflow-x: auto;
	}
	pre code {
		display: block;
		padding: var(--space-md);
		white-space: pre;
		line-height: 1.5;
	}
	.product-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
		gap: var(--space-md);
	}
	.product-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
	}
	.product-name {
		font-weight: 600;
		color: var(--color-text);
	}
	.product-price {
		font-family: var(--font-mono);
		color: var(--color-primary);
		font-weight: 600;
	}
	button {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 0.85em;
	}
	.cart-section {
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-md);
	}
	h4 {
		margin: 0 0 var(--space-sm) 0;
		color: var(--color-text);
	}
	.empty {
		color: var(--color-text-muted);
		font-style: italic;
		margin: 0;
	}
	.cart-list {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
	}
	.cart-item {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		color: var(--color-text);
		font-size: 0.9em;
	}
	.item-subtotal {
		margin-inline-start: auto;
		font-family: var(--font-mono);
		font-weight: 600;
	}
	.remove-btn {
		background: transparent;
		color: var(--color-error);
		border: 1px solid var(--color-error);
		font-size: 0.8em;
		padding: 2px var(--space-xs);
	}
	.cart-total {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-block-start: var(--space-md);
		padding-block-start: var(--space-sm);
		border-block-start: 1px solid var(--color-border);
	}
	.clear-btn {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
