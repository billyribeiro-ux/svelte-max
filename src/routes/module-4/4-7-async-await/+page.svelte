<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface User {
		id: number;
		name: string;
		email: string;
	}

	let user = $state<User | null>(null);
	let loading = $state(false);
	let error = $state<string | null>(null);

	function fakeFetch(): Promise<User> {
		return new Promise<User>((resolve) => {
			setTimeout(() => {
				resolve({ id: 1, name: 'Ada Lovelace', email: 'ada@example.com' });
			}, 900);
		});
	}

	async function fetchUser(): Promise<void> {
		loading = true;
		error = null;
		user = null;
		try {
			const result = await fakeFetch();
			user = result;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Unknown error';
		} finally {
			loading = false;
		}
	}

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"interface User {\n" +
		"\t\tid: number;\n" +
		"\t\tname: string;\n" +
		"\t\temail: string;\n" +
		"\t}\n" +
		"\n" +
		"\tlet user = $state\u003cUser | null\u003e(null);\n" +
		"\tlet loading = $state(false);\n" +
		"\tlet error = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"\tfunction fakeFetch(): Promise\u003cUser\u003e {\n" +
		"\t\treturn new Promise\u003cUser\u003e((resolve) =\u003e {\n" +
		"\t\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\t\tresolve({ id: 1, name: 'Ada Lovelace', email: 'ada@example.com' });\n" +
		"\t\t\t}, 900);\n" +
		"\t\t});\n" +
		"\t}\n" +
		"\n" +
		"\tasync function fetchUser(): Promise\u003cvoid\u003e {\n" +
		"\t\tloading = true;\n" +
		"\t\terror = null;\n" +
		"\t\tuser = null;\n" +
		"\t\ttry {\n" +
		"\t\t\tconst result = await fakeFetch();\n" +
		"\t\t\tuser = result;\n" +
		"\t\t} catch (err) {\n" +
		"\t\t\terror = err instanceof Error ? err.message : 'Unknown error';\n" +
		"\t\t} finally {\n" +
		"\t\t\tloading = false;\n" +
		"\t\t}\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.7 — Promises and async/await\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e A Promise is a placeholder for a value that will exist in the future —\n" +
		"\t\tthe result of an async operation like \u003ccode\u003efetch\u003c/code\u003e, a timer, or a file read.\n" +
		"\t\t\u003ccode\u003easync\u003c/code\u003e functions return promises; \u003ccode\u003eawait\u003c/code\u003e pauses inside an async function\n" +
		"\t\tuntil the promise resolves. Before promises, callback hell (\u003ccode\u003ecb(err, data)\u003c/code\u003e nested\n" +
		"\t\tfive deep) made async code miserable. Promises let you write top-to-bottom code that looks\n" +
		"\t\tsynchronous.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" onclick={fetchUser} disabled={loading}\u003e\n" +
		"\t\t\t{loading ? 'Fetching...' : 'Fetch user'}\n" +
		"\t\t\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#if loading}\n" +
		"\t\t\t\u003cp class=\"status\"\u003eLoading user…\u003c/p\u003e\n" +
		"\t\t{:else if error}\n" +
		"\t\t\t\u003cp class=\"pill error\"\u003eError: {error}\u003c/p\u003e\n" +
		"\t\t{:else if user}\n" +
		"\t\t\t\u003carticle class=\"user\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003e{user.name}\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cp\u003e{user.email}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cp class=\"muted\"\u003eID: {user.id}\u003c/p\u003e\n" +
		"\t\t\t\u003c/article\u003e\n" +
		"\t\t{:else}\n" +
		"\t\t\t\u003cp class=\"muted\"\u003eClick the button to fetch a user.\u003c/p\u003e\n" +
		"\t\t{/if}\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tNotice the three state variables: \u003ccode\u003euser\u003c/code\u003e, \u003ccode\u003eloading\u003c/code\u003e,\n" +
		"\t\t\t\u003ccode\u003eerror\u003c/code\u003e. In 4.8, Svelte's \u003ccode\u003e{`{#await}`}\u003c/code\u003e block replaces all three with a\n" +
		"\t\t\tsingle expression.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003ePromises represent a value that will exist later\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003easync\u003c/code\u003e functions always return a \u003ccode\u003ePromise\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003eawait\u003c/code\u003e suspends execution until the promise settles\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eWrap \u003ccode\u003eawait\u003c/code\u003e in \u003ccode\u003etry/catch\u003c/code\u003e to handle rejections\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eManual loading/error state works but gets verbose — 4.8 has a better way\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.7 — Promises and async/await</h1>
	<p class="concept">
		<strong>Concept.</strong> A Promise is a placeholder for a value that will exist in the future —
		the result of an async operation like <code>fetch</code>, a timer, or a file read.
		<code>async</code> functions return promises; <code>await</code> pauses inside an async function
		until the promise resolves. Before promises, callback hell (<code>cb(err, data)</code> nested
		five deep) made async code miserable. Promises let you write top-to-bottom code that looks
		synchronous.
	</p>

	<div class="build">
		<button type="button" onclick={fetchUser} disabled={loading}>
			{loading ? 'Fetching...' : 'Fetch user'}
		</button>

		{#if loading}
			<p class="status">Loading user…</p>
		{:else if error}
			<p class="pill error">Error: {error}</p>
		{:else if user}
			<article class="user">
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<p class="muted">ID: {user.id}</p>
			</article>
		{:else}
			<p class="muted">Click the button to fetch a user.</p>
		{/if}

		<p class="note">
			Notice the three state variables: <code>user</code>, <code>loading</code>,
			<code>error</code>. In 4.8, Svelte's <code>{`{#await}`}</code> block replaces all three with a
			single expression.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Use top-level <code>await</code> in the <code>&lt;script&gt;</code> block.</strong> This will error because Svelte component scripts are not async modules. Top-level await is only valid in ES modules loaded by a bundler that supports it. In Svelte, async work belongs inside functions, <code>$effect</code> callbacks, or SvelteKit's <code>load</code> functions.</li>
		<li><strong>Await inside a <code>$effect</code> callback.</strong> Effects can call async functions and await inside them. The effect runs, kicks off the async operation, and the state updates reactively when the promise resolves. This pattern works but requires manual cleanup to avoid stale closures if the effect re-runs before the previous promise settles.</li>
		<li><strong>Forget error handling entirely -- no <code>try/catch</code>.</strong> The promise rejects with an unhandled rejection, which shows up as a console error and potentially crashes your page in strict environments. Always wrap <code>await</code> calls in <code>try/catch</code> or attach a <code>.catch()</code> handler to every promise.</li>
		<li><strong>Start two fetches in rapid succession without cancellation.</strong> The slower fetch resolves after the faster one and overwrites the result, causing the UI to flash and settle on stale data. This is a race condition -- fix it with <code>AbortController</code> or a sequence counter that ignores out-of-order responses.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Promises are JavaScript's standard abstraction for values that will exist in the future. An <code>async</code> function always returns a <code>Promise</code>, and <code>await</code> pauses execution inside that function until the promise settles. This lets you write asynchronous code in a top-to-bottom style that reads like synchronous code, eliminating the deeply nested callbacks that plagued earlier JavaScript.</p>
	<p class="prose">In a Svelte component, async operations typically live inside event handlers, <code>$effect</code> callbacks, or SvelteKit's <code>load</code> functions. The pattern shown here -- separate <code>$state</code> variables for <code>loading</code>, <code>error</code>, and <code>data</code> -- is the manual approach. It works, but it requires you to manage three pieces of state for every async operation, reset them in the right order, and handle every edge case yourself.</p>
	<p class="prose">Error handling and race conditions are the two traps that catch every developer eventually. Always wrap <code>await</code> in <code>try/catch</code> so rejected promises surface as user-visible error messages rather than silent console errors. For race conditions, use <code>AbortController</code> to cancel in-flight requests when a new one starts, or maintain a sequence counter and ignore results from superseded requests. In the next lesson, Svelte's <code>{'{#await}'}</code> block replaces most of this boilerplate with a single declarative construct.</p>
	<p class="next">Next lesson: <a href="/module-4/4-8-await-block">4.8 — {'{#await}'} block</a></p>
</section>

<style>
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	button {
		align-self: flex-start;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		font-size: var(--text-base);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	.status {
		color: var(--color-text-muted);
		margin: 0;
	}
	.pill {
		display: inline-block;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-size: var(--text-sm);
		align-self: flex-start;
		margin: 0;
	}
	.error {
		background: var(--color-error);
		color: var(--color-surface);
	}
	.user {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.user h2 {
		margin: 0 0 var(--space-xs) 0;
		font-size: var(--text-lg);
	}
	.user p {
		margin: 0;
	}
	.muted {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-sm);
	}
	@media (min-inline-size: 768px) {
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

	.prose {
		color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty;
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.experiments {
		max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6;
		& strong { color: var(--color-text); }
		& code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); }
	}
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
