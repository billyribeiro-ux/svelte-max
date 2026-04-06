<script lang="ts">
	import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { increment, decrement, reset, getCount } from '$lib/stores/counter.svelte';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e11.4 — Shared State Across Pages\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		Because \u003ccode\u003e.svelte.ts\u003c/code\u003e module state lives in a JavaScript module, it\n" +
		"		\u003cstrong\u003epersists across client-side navigations\u003c/strong\u003e. Navigate away and come back —\n" +
		"		the counter value from lesson 11.3 is still here. This is powerful but comes with\n" +
		"		an important caveat for SSR.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eTry It: The Counter Persists\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			This page imports the exact same \u003ccode\u003ecounter.svelte.ts\u003c/code\u003e from lesson 11.3.\n" +
		"			If you incremented the counter there, the value carries over here.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cdiv class=\"counter-display\"\u003e\n" +
		"			\u003cspan class=\"count\"\u003e{getCount()}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"		\u003cdiv class=\"button-row\"\u003e\n" +
		"			\u003cbutton onclick={decrement}\u003e- Decrement\u003c/button\u003e\n" +
		"			\u003cbutton class=\"reset-btn\" onclick={reset}\u003eReset\u003c/button\u003e\n" +
		"			\u003cbutton onclick={increment}\u003e+ Increment\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSSR Warning: Module State Leaks\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build warning\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			\u003cstrong\u003eOn the server\u003c/strong\u003e, module-level state is shared across all requests\n" +
		"			because Node.js caches modules. This means one user's state could leak to another\n" +
		"			user's response. This is a \u003cstrong\u003ecritical security issue\u003c/strong\u003e.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e// DANGEROUS on the server:\n" +
		"// src/lib/stores/user.svelte.ts\n" +
		"let currentUser = $state&lt;User | null&gt;(null);\n" +
		"// User A's data could leak to User B!\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eThe Safe Alternative: Context\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build safe\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			For per-user or per-request state, use \u003cstrong\u003econtext\u003c/strong\u003e instead.\n" +
		"			Context is scoped to the component tree and created fresh for each request on the server.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e// Safe: per-component-tree state\n" +
		"// In +layout.svelte:\n" +
		"setContext('user', userFromLoad);\n" +
		"\n" +
		"// In any descendant:\n" +
		"const user = getContext&lt;User&gt;('user');\u003c/code\u003e\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhen to Use Each\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eModule state\u003c/strong\u003e (\u003ccode\u003e.svelte.ts\u003c/code\u003e): Client-only state, global settings, caches — anything not user-specific\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eContext\u003c/strong\u003e: User-specific data, request-scoped values, anything that differs per visitor\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003cstrong\u003eURL state\u003c/strong\u003e: Filter/sort params, pagination — anything the user should be able to bookmark or share\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eModule-level \u003ccode\u003e.svelte.ts\u003c/code\u003e state persists across client-side navigations because JS modules are cached.\u003c/li\u003e\n" +
		"		\u003cli\u003eServer-side module state is shared across all requests, creating a critical data-leak risk.\u003c/li\u003e\n" +
		"		\u003cli\u003eUse context for per-user/per-request state, and module state only for client-only globals.\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Navigate to lesson 11.3, increment the counter, then come back here.</strong> The counter value persists because both pages import the same module singleton, proving that module state survives client-side navigations.</li>
		<li><strong>Store a user object in module-level <code>$state</code> and render it during SSR.</strong> Open two browser tabs and log in as different users. The server shares one module instance across all requests, so User A's data can leak into User B's response.</li>
		<li><strong>Replace the module-level state with <code>setContext</code> in <code>+layout.svelte</code>.</strong> Now each request creates a fresh context, and the SSR leak disappears because context is scoped to the component tree, not the module cache.</li>
		<li><strong>Do a full page reload (not client-side navigation) after incrementing the counter.</strong> The value resets to zero because a full reload creates a new JavaScript execution context, destroying all module-level state.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Module-level state in <code>.svelte.ts</code> files lives in the JavaScript module cache, which persists for the lifetime of the client-side application. This means any page that imports the same module sees the same state, making it ideal for global settings, caches, and UI preferences that are not user-specific.</p>
	<p class="prose">The critical caveat is SSR. On the server, Node.js caches modules across all requests, so module-level state is shared between every user hitting your application. Storing user-specific data like authentication tokens or preferences in module state creates a data-leak vulnerability where one user's information bleeds into another user's server-rendered response.</p>
	<p class="prose">The rule of thumb is clear: use module state for client-only globals that are not user-specific, use context for per-user or per-request state that must be SSR-safe, and use URL search parameters for state that should be bookmarkable and shareable.</p>
	<p class="next"><strong>Next:</strong> <a href="/module-11/11-5-reactive-classes">11.5 — Reactive Classes</a> — use <code>$state</code> on class fields for encapsulated reactive state.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
