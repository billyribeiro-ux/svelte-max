<script lang="ts">
	import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.3 — Universal Reactive State (.svelte.ts)\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Files ending in \u003ccode\u003e.svelte.ts\u003c/code\u003e can use runes like \u003ccode\u003e$state\u003c/code\u003e at\n" +
		"		the module level. When you export functions that read/write that state, any component\n" +
		"		importing them gets \u003cstrong\u003eautomatic reactivity\u003c/strong\u003e — no stores, no subscriptions,\n" +
		"		just plain functions.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Store: \u003ccode\u003ecounter.svelte.ts\u003c/code\u003e\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e// src/lib/stores/counter.svelte.ts\n" +
		"let count = $state(0);\n" +
		"\n" +
		"export function increment() &#123; count++; &#125;\n" +
		"export function decrement() &#123; count--; &#125;\n" +
		"export function reset() &#123; count = 0; &#125;\n" +
		"export function getCount() &#123; return count; &#125;\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eLive Demo\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"counter-display\"\u003e\n" +
		"			\u003cspan class=\"count\"\u003e{getCount()}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"button-row\"\u003e\n" +
		"			\u003cbutton onclick={decrement}\u003e- Decrement\u003c/button\u003e\n" +
		"			\u003cbutton class=\"reset\" onclick={reset}\u003eReset\u003c/button\u003e\n" +
		"			\u003cbutton onclick={increment}\u003e+ Increment\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhy .svelte.ts?\u003c/h3\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		The \u003ccode\u003e.svelte.ts\u003c/code\u003e extension tells the Svelte compiler to process runes\n" +
		"		in TypeScript files. Regular \u003ccode\u003e.ts\u003c/code\u003e files cannot use \u003ccode\u003e$state\u003c/code\u003e,\n" +
		"		\u003ccode\u003e$derived\u003c/code\u003e, or \u003ccode\u003e$effect\u003c/code\u003e. This is the Svelte 5 replacement\n" +
		"		for writable/readable stores.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eKey Takeaways\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eModule-level \u003ccode\u003e$state\u003c/code\u003e in \u003ccode\u003e.svelte.ts\u003c/code\u003e files creates shared reactive state\u003c/li\u003e\n" +
		"		\u003cli\u003eExport functions that read/write the state — consumers stay reactive automatically\u003c/li\u003e\n" +
		"		\u003cli\u003eUse \u003ccode\u003egetCount()\u003c/code\u003e (a function call) in templates so Svelte tracks the dependency\u003c/li\u003e\n" +
		"		\u003cli\u003eThis replaces the old \u003ccode\u003ewritable()\u003c/code\u003e / \u003ccode\u003ereadable()\u003c/code\u003e store pattern entirely\u003c/li\u003e\n" +
		"		\u003cli\u003eWorks with \u003ccode\u003e$derived\u003c/code\u003e and \u003ccode\u003e$effect\u003c/code\u003e too\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e.svelte.ts\u003c/code\u003e files let you use \u003ccode\u003e$state\u003c/code\u003e at the module level for shared reactive state.\u003c/li\u003e\n" +
		"		\u003cli\u003eExported functions that read/write module state keep consumers automatically reactive.\u003c/li\u003e\n" +
		"		\u003cli\u003eThis pattern replaces the legacy \u003ccode\u003ewritable()\u003c/code\u003e / \u003ccode\u003ereadable()\u003c/code\u003e store API entirely.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
