<script lang="ts">
	import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';
</script>

<section class="page">
	<h1>11.4 — Shared State Across Pages</h1>

	<p class="concept">
		Because <code>.svelte.ts</code> module state lives in a JavaScript module, it
		<strong>persists across client-side navigations</strong>. Navigate away and come back —
		the counter value from lesson 11.3 is still here. This is powerful but comes with
		an important caveat for SSR.
	</p>

	<h3>Try It: The Counter Persists</h3>
	<div class="build">
		<p class="concept">
			This page imports the exact same <code>counter.svelte.ts</code> from lesson 11.3.
			If you incremented the counter there, the value carries over here.
		</p>
		<div class="counter-display">
			<span class="count">{getCount()}</span>
		</div>
		<div class="button-row">
			<button onclick={decrement}>- Decrement</button>
			<button class="reset-btn" onclick={reset}>Reset</button>
			<button onclick={increment}>+ Increment</button>
		</div>
	</div>

	<h3>SSR Warning: Module State Leaks</h3>
	<div class="build warning">
		<p class="concept">
			<strong>On the server</strong>, module-level state is shared across all requests
			because Node.js caches modules. This means one user's state could leak to another
			user's response. This is a <strong>critical security issue</strong>.
		</p>
		<pre><code>// DANGEROUS on the server:
// src/lib/stores/user.svelte.ts
let currentUser = $state&lt;User | null&gt;(null);
// User A's data could leak to User B!</code></pre>
	</div>

	<h3>The Safe Alternative: Context</h3>
	<div class="build safe">
		<p class="concept">
			For per-user or per-request state, use <strong>context</strong> instead.
			Context is scoped to the component tree and created fresh for each request on the server.
		</p>
		<pre><code>// Safe: per-component-tree state
// In +layout.svelte:
setContext('user', userFromLoad);

// In any descendant:
const user = getContext&lt;User&gt;('user');</code></pre>
	</div>

	<h3>When to Use Each</h3>
	<ul>
		<li><strong>Module state</strong> (<code>.svelte.ts</code>): Client-only state, global settings, caches — anything not user-specific</li>
		<li><strong>Context</strong>: User-specific data, request-scoped values, anything that differs per visitor</li>
		<li><strong>URL state</strong>: Filter/sort params, pagination — anything the user should be able to bookmark or share</li>
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
	.reset-btn {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.warning {
		border-color: #e74c3c;
		background: color-mix(in oklch, #e74c3c 5%, var(--color-surface-1));
	}
	.safe {
		border-color: #27ae60;
		background: color-mix(in oklch, #27ae60 5%, var(--color-surface-1));
	}
</style>
