<script lang="ts">
	const traditionalCode = `// 1. +server.ts — define endpoint
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
  const products = await db.getProducts();
  return json(products);
};

// 2. +page.svelte — fetch manually
\u003cscript lang="ts"\u003e
  import { onMount } from 'svelte';

  type Product = { id: number; name: string; price: number };
  let products = $state\u003cProduct[]\u003e([]);
  let loading = $state(true);
  let error = $state\u003cstring | null\u003e(null);

  onMount(async () => {
    try {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed');
      products = await res.json();
    } catch (e) {
      error = (e as Error).message;
    } finally {
      loading = false;
    }
  });
\u003c/script\u003e`;

	const remoteCode = `// 1. products.remote.ts — define remote function
import { query } from '$app/server';
import { db } from '$lib/server/db';

export const getProducts = query(async () => {
  return await db.getProducts();
});

// 2. +page.svelte — call it directly
\u003cscript lang="ts"\u003e
  import { getProducts } from './products.remote';

  const products = getProducts();
\u003c/script\u003e

{#each products.current as product}
  <p>{product.name} — \${product.price}</p>
{/each}`;

	const fourTypes = `// query — read data (cached, reactive)
import { query } from '$app/server';
export const getItems = query(async () => { ... });

// form — handle <form> submissions (progressive enhancement)
import { form } from '$app/server';
export const addItem = form(async ({ data }) => { ... });

// command — mutations with side effects (not during render)
import { command } from '$app/server';
export const deleteItem = command(async (id: string) => { ... });

// prerender — run at build time (static, CDN-friendly)
import { prerender } from '$app/server';
export const getConfig = prerender(async () => { ... });`;
</script>

<section class="page">
	<h1>9B.1 — What Are Remote Functions</h1>
	<p class="concept">
		<strong>Concept.</strong> Remote functions are server code callable directly from browser
		components — type-safe, no manual fetch or endpoint wiring. They live in
		<code>.remote.ts</code> files and are imported like regular functions, but execute on the
		server. This is an experimental SvelteKit feature enabled via
		<code>kit.experimental.remoteFunctions: true</code>.
	</p>

	<div class="build">
		<h2>Traditional pattern (7 steps)</h2>
		<p>Define an endpoint, fetch manually, handle loading/error states, parse JSON, type everything twice:</p>
		<pre><code>{traditionalCode}</code></pre>

		<h2>Remote function pattern (3 steps)</h2>
		<p>Define a remote function, import it, use it. Types flow automatically:</p>
		<pre><code>{remoteCode}</code></pre>

		<h2>The four remote function types</h2>
		<pre><code>{fourTypes}</code></pre>

		<div class="why-box">
			<h3 class="why-title">Why this matters</h3>
			<ul class="why-list">
				<li><strong>Less boilerplate</strong> — no manual endpoint + fetch + JSON parsing</li>
				<li><strong>End-to-end type safety</strong> — return types flow from server to client automatically</li>
				<li><strong>Automatic caching</strong> — queries are cached and deduplicated</li>
				<li><strong>Progressive enhancement</strong> — forms work without JavaScript</li>
				<li><strong>Single-flight mutations</strong> — refresh data in the same round trip as a mutation</li>
			</ul>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Remote functions let you call server code directly from components via <code>.remote.ts</code> files</li>
		<li>Four types exist: <code>query</code>, <code>form</code>, <code>command</code>, and <code>prerender</code></li>
		<li>They eliminate the manual endpoint + fetch pattern and provide end-to-end type safety</li>
		<li>The feature requires <code>kit.experimental.remoteFunctions: true</code> in your SvelteKit config</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.why-box { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
	.why-title { margin: 0 0 var(--space-sm) 0; }
	.why-list { margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
