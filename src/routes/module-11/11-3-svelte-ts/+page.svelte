<script lang="ts">
	import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';
</script>

<section class="page">
	<h1>11.3 — Universal Reactive State (.svelte.ts)</h1>

	<p class="concept">
		Files ending in <code>.svelte.ts</code> can use runes like <code>$state</code> at
		the module level. When you export functions that read/write that state, any component
		importing them gets <strong>automatic reactivity</strong> — no stores, no subscriptions,
		just plain functions.
	</p>

	<h3>The Store: <code>counter.svelte.ts</code></h3>
	<div class="build">
		<pre><code>// src/lib/stores/counter.svelte.ts
let count = $state(0);

export function increment() &#123; count++; &#125;
export function decrement() &#123; count--; &#125;
export function reset() &#123; count = 0; &#125;
export function getCount() &#123; return count; &#125;</code></pre>
	</div>

	<h3>Live Demo</h3>
	<div class="build">
		<div class="counter-display">
			<span class="count">{getCount()}</span>
		</div>
		<div class="button-row">
			<button onclick={decrement}>- Decrement</button>
			<button class="reset" onclick={reset}>Reset</button>
			<button onclick={increment}>+ Increment</button>
		</div>
	</div>

	<h3>Why .svelte.ts?</h3>
	<p class="concept">
		The <code>.svelte.ts</code> extension tells the Svelte compiler to process runes
		in TypeScript files. Regular <code>.ts</code> files cannot use <code>$state</code>,
		<code>$derived</code>, or <code>$effect</code>. This is the Svelte 5 replacement
		for writable/readable stores.
	</p>

	<h3>Key Takeaways</h3>
	<ul>
		<li>Module-level <code>$state</code> in <code>.svelte.ts</code> files creates shared reactive state</li>
		<li>Export functions that read/write the state — consumers stay reactive automatically</li>
		<li>Use <code>getCount()</code> (a function call) in templates so Svelte tracks the dependency</li>
		<li>This replaces the old <code>writable()</code> / <code>readable()</code> store pattern entirely</li>
		<li>Works with <code>$derived</code> and <code>$effect</code> too</li>
	</ul>

	<h3>What you learned</h3>
	<ul>
		<li><code>.svelte.ts</code> files let you use <code>$state</code> at the module level for shared reactive state.</li>
		<li>Exported functions that read/write module state keep consumers automatically reactive.</li>
		<li>This pattern replaces the legacy <code>writable()</code> / <code>readable()</code> store API entirely.</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

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
	.counter-display {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--space-lg);
	}
	.count {
		font-size: 3rem;
		font-weight: 700;
		color: var(--color-primary);
		font-family: var(--font-mono);
	}
	.button-row {
		display: flex;
		gap: var(--space-sm);
		justify-content: center;
		flex-wrap: wrap;
	}
	button {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: var(--color-surface-1);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: 1rem;
	}
	.reset {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
</style>
