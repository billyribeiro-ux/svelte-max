<script lang="ts">
	import type { PageData } from './$types';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	let { data }: { data: PageData } = $props();


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import type { PageData } from './$types';\n" +
		"\n" +
		"	let { data }: { data: PageData } = $props();\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9A.1 — What load() is\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e A \u003ccode\u003eload()\u003c/code\u003e function runs \u003cem\u003ebefore\u003c/em\u003e its page component\n" +
		"		is instantiated. It fetches data, handles errors, and returns a typed object that becomes the\n" +
		"		page's \u003ccode\u003edata\u003c/code\u003e prop. It runs on the server during SSR and in the browser during\n" +
		"		client-side navigation. You write it in \u003ccode\u003e+page.ts\u003c/code\u003e (universal) or\n" +
		"		\u003ccode\u003e+page.server.ts\u003c/code\u003e (server-only).\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2 class=\"welcome-title\"\u003e{data.welcome.title}\u003c/h2\u003e\n" +
		"		\u003cp class=\"welcome-sub\"\u003e{data.welcome.subtitle}\u003c/p\u003e\n" +
		"		\u003cp class=\"ts-row\"\u003e\n" +
		"			Prepared at \u003ccode\u003e{data.welcome.ts}\u003c/code\u003e\n" +
		"		\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003eload()\u003c/code\u003e returns the object that becomes the page's \u003ccode\u003edata\u003c/code\u003e prop.\u003c/li\u003e\n" +
		"		\u003cli\u003eIt runs before the component — by the time Svelte renders, the data already exists.\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e+page.ts\u003c/code\u003e is universal (server + client); \u003ccode\u003e+page.server.ts\u003c/code\u003e is server only.\u003c/li\u003e\n" +
		"		\u003cli\u003eYou import \u003ccode\u003ePageLoad\u003c/code\u003e from \u003ccode\u003e./$types\u003c/code\u003e to type the function.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9A.1 — What load() is</h1>

	<p class="concept">
		<strong>Concept.</strong> A <code>load()</code> function runs <em>before</em> its page component
		is instantiated. It fetches data, handles errors, and returns a typed object that becomes the
		page's <code>data</code> prop. It runs on the server during SSR and in the browser during
		client-side navigation. You write it in <code>+page.ts</code> (universal) or
		<code>+page.server.ts</code> (server-only).
	</p>

	<div class="build">
		<h2 class="welcome-title">{data.welcome.title}</h2>
		<p class="welcome-sub">{data.welcome.subtitle}</p>
		<p class="ts-row">
			Prepared at <code>{data.welcome.ts}</code>
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Delete the entire <code>load</code> function from <code>+page.ts</code>.</strong> The page renders but <code>data</code> is empty, so every <code>{'{data.welcome.title}'}</code> expression produces <code>undefined</code> and you see blank spots where the greeting should be.</li>
		<li><strong>Return an object without the <code>welcome</code> key.</strong> TypeScript flags the mismatch immediately in the component because <code>PageData</code> no longer contains a <code>welcome</code> property, proving the generated types enforce the contract.</li>
		<li><strong>Change the file name from <code>+page.ts</code> to <code>+page.server.ts</code>.</strong> The page still works because a server-only loader is perfectly valid here, but now the load function will never re-run in the browser during client-side navigation.</li>
		<li><strong>Remove the <code>PageLoad</code> type annotation from the load function.</strong> The code still runs, but you lose type checking on the function signature, meaning you could return a misspelled key and the error would only surface in the template, not the loader.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>load()</code> function is the gateway between SvelteKit's routing layer and your page component. It runs before the component is instantiated, fetches or computes whatever data the page needs, and returns a plain object. That object becomes the component's <code>data</code> prop, fully typed thanks to the generated <code>PageData</code> type.</p>
	<p class="prose">Crucially, <code>load</code> runs on the server during SSR and again in the browser during client-side navigation. This means the same function powers both the initial HTML response and every subsequent in-app navigation, giving you a single source of truth for your page's data requirements without duplicating logic.</p>
	<p class="prose">You choose between <code>+page.ts</code> (universal, runs on both server and client) and <code>+page.server.ts</code> (server-only, never shipped to the browser). The universal variant is the default choice for most pages; the server-only variant is reserved for when you need direct access to databases, secrets, or file-system APIs that must never reach the client.</p>
	<p class="next">Next up: understanding the difference between universal and server loaders in detail.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	.welcome-title {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--color-brand);
	}
	.welcome-sub {
		margin: 0;
		color: var(--color-text);
	}
	.ts-row {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
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
