<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const traditionalCode = `// 1. +server.ts — define endpoint\n" +
		"import { json } from '@sveltejs/kit';\n" +
		"import type { RequestHandler } from './$types';\n" +
		"\n" +
		"export const GET: RequestHandler = async () =\u003e {\n" +
		"  const products = await db.getProducts();\n" +
		"  return json(products);\n" +
		"};\n" +
		"\n" +
		"// 2. +page.svelte — fetch manually\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { onMount } from 'svelte';\n" +
		"\n" +
		"  type Product = { id: number; name: string; price: number };\n" +
		"  let products = $state\\u003cProduct[]\\u003e([]);\n" +
		"  let loading = $state(true);\n" +
		"  let error = $state\\u003cstring | null\\u003e(null);\n" +
		"\n" +
		"  onMount(async () =\u003e {\n" +
		"    try {\n" +
		"      const res = await fetch('/api/products');\n" +
		"      if (!res.ok) throw new Error('Failed');\n" +
		"      products = await res.json();\n" +
		"    } catch (e) {\n" +
		"      error = (e as Error).message;\n" +
		"    } finally {\n" +
		"      loading = false;\n" +
		"    }\n" +
		"  });\n" +
		"\\u003c/script\\u003e`;\n" +
		"\n" +
		"	const remoteCode = `// 1. products.remote.ts — define remote function\n" +
		"import { query } from '$app/server';\n" +
		"import { db } from '$lib/server/db';\n" +
		"\n" +
		"export const getProducts = query(async () =\u003e {\n" +
		"  return await db.getProducts();\n" +
		"});\n" +
		"\n" +
		"// 2. +page.svelte — call it directly\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { getProducts } from './products.remote';\n" +
		"\n" +
		"  const products = getProducts();\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"{#each products.current as product}\n" +
		"  \u003cp\u003e{product.name} — \\${product.price}\u003c/p\u003e\n" +
		"{/each}`;\n" +
		"\n" +
		"	const fourTypes = `// query — read data (cached, reactive)\n" +
		"import { query } from '$app/server';\n" +
		"export const getItems = query(async () =\u003e { ... });\n" +
		"\n" +
		"// form — handle \u003cform\u003e submissions (progressive enhancement)\n" +
		"import { form } from '$app/server';\n" +
		"export const addItem = form(async ({ data }) =\u003e { ... });\n" +
		"\n" +
		"// command — mutations with side effects (not during render)\n" +
		"import { command } from '$app/server';\n" +
		"export const deleteItem = command(async (id: string) =\u003e { ... });\n" +
		"\n" +
		"// prerender — run at build time (static, CDN-friendly)\n" +
		"import { prerender } from '$app/server';\n" +
		"export const getConfig = prerender(async () =\u003e { ... });`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.1 — What Are Remote Functions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Remote functions are server code callable directly from browser\n" +
		"		components — type-safe, no manual fetch or endpoint wiring. They live in\n" +
		"		\u003ccode\u003e.remote.ts\u003c/code\u003e files and are imported like regular functions, but execute on the\n" +
		"		server. This is an experimental SvelteKit feature enabled via\n" +
		"		\u003ccode\u003ekit.experimental.remoteFunctions: true\u003c/code\u003e.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eTraditional pattern (7 steps)\u003c/h2\u003e\n" +
		"		\u003cp\u003eDefine an endpoint, fetch manually, handle loading/error states, parse JSON, type everything twice:\u003c/p\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{traditionalCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eRemote function pattern (3 steps)\u003c/h2\u003e\n" +
		"		\u003cp\u003eDefine a remote function, import it, use it. Types flow automatically:\u003c/p\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{remoteCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eThe four remote function types\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{fourTypes}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"why-box\"\u003e\n" +
		"			\u003ch3 class=\"why-title\"\u003eWhy this matters\u003c/h3\u003e\n" +
		"			\u003cul class=\"why-list\"\u003e\n" +
		"				\u003cli\u003e\u003cstrong\u003eLess boilerplate\u003c/strong\u003e — no manual endpoint + fetch + JSON parsing\u003c/li\u003e\n" +
		"				\u003cli\u003e\u003cstrong\u003eEnd-to-end type safety\u003c/strong\u003e — return types flow from server to client automatically\u003c/li\u003e\n" +
		"				\u003cli\u003e\u003cstrong\u003eAutomatic caching\u003c/strong\u003e — queries are cached and deduplicated\u003c/li\u003e\n" +
		"				\u003cli\u003e\u003cstrong\u003eProgressive enhancement\u003c/strong\u003e — forms work without JavaScript\u003c/li\u003e\n" +
		"				\u003cli\u003e\u003cstrong\u003eSingle-flight mutations\u003c/strong\u003e — refresh data in the same round trip as a mutation\u003c/li\u003e\n" +
		"			\u003c/ul\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eRemote functions let you call server code directly from components via \u003ccode\u003e.remote.ts\u003c/code\u003e files\u003c/li\u003e\n" +
		"		\u003cli\u003eFour types exist: \u003ccode\u003equery\u003c/code\u003e, \u003ccode\u003eform\u003c/code\u003e, \u003ccode\u003ecommand\u003c/code\u003e, and \u003ccode\u003eprerender\u003c/code\u003e\u003c/li\u003e\n" +
		"		\u003cli\u003eThey eliminate the manual endpoint + fetch pattern and provide end-to-end type safety\u003c/li\u003e\n" +
		"		\u003cli\u003eThe feature requires \u003ccode\u003ekit.experimental.remoteFunctions: true\u003c/code\u003e in your SvelteKit config\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
