<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface User {
		id: number;
		name: string;
		email: string;
	}

	function fetchUser(): Promise<User> {
		return new Promise<User>((resolve) => {
			setTimeout(() => {
				resolve({ id: 1, name: 'Ada Lovelace', email: 'ada@example.com' });
			}, 900);
		});
	}

	let promise = $state<Promise<User>>(fetchUser());

	function refresh(): void {
		promise = fetchUser();
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
		"\tfunction fetchUser(): Promise\u003cUser\u003e {\n" +
		"\t\treturn new Promise\u003cUser\u003e((resolve) =\u003e {\n" +
		"\t\t\tsetTimeout(() =\u003e {\n" +
		"\t\t\t\tresolve({ id: 1, name: 'Ada Lovelace', email: 'ada@example.com' });\n" +
		"\t\t\t}, 900);\n" +
		"\t\t});\n" +
		"\t}\n" +
		"\n" +
		"\tlet promise = $state\u003cPromise\u003cUser\u003e\u003e(fetchUser());\n" +
		"\n" +
		"\tfunction refresh(): void {\n" +
		"\t\tpromise = fetchUser();\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.8 — {`{#await}`} block\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e\n" +
		"\t\t\u003ccode\u003e{`{#await promise}...{:then value}...{:catch err}...{/await}`}\u003c/code\u003e is Svelte's built-in async\n" +
		"\t\tstate machine. One promise, three branches, zero manual state variables. There's a short form\n" +
		"\t\t\u003ccode\u003e{`{#await promise then value}`}\u003c/code\u003e that skips the pending branch entirely. Use it\n" +
		"\t\twhenever a component's UI is driven by a promise's lifecycle.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cbutton type=\"button\" onclick={refresh}\u003eRefresh\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#await promise}\n" +
		"\t\t\t\u003cp class=\"status\"\u003eLoading user…\u003c/p\u003e\n" +
		"\t\t{:then user}\n" +
		"\t\t\t\u003carticle class=\"user\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003e{user.name}\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cp\u003e{user.email}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cp class=\"muted\"\u003eID: {user.id}\u003c/p\u003e\n" +
		"\t\t\t\u003c/article\u003e\n" +
		"\t\t{:catch err}\n" +
		"\t\t\t\u003cp class=\"pill error\"\u003eError: {err.message}\u003c/p\u003e\n" +
		"\t\t{/await}\n" +
		"\n" +
		"\t\t\u003cp class=\"note\"\u003e\n" +
		"\t\t\tCompare this to 4.7: no \u003ccode\u003eloading\u003c/code\u003e, no \u003ccode\u003eerror\u003c/code\u003e, no\n" +
		"\t\t\t\u003ccode\u003euser\u003c/code\u003e state. Just one promise.\n" +
		"\t\t\u003c/p\u003e\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{`{#await}`}\u003c/code\u003e replaces three state variables with one\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eThree branches: pending, \u003ccode\u003e{`{:then}`}\u003c/code\u003e, \u003ccode\u003e{`{:catch}`}\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eReassigning the promise re-runs the block\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eShort form: \u003ccode\u003e{`{#await promise then value}`}\u003c/code\u003e skips pending\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.8 — {`{#await}`} block</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{`{#await promise}...{:then value}...{:catch err}...{/await}`}</code> is Svelte's built-in async
		state machine. One promise, three branches, zero manual state variables. There's a short form
		<code>{`{#await promise then value}`}</code> that skips the pending branch entirely. Use it
		whenever a component's UI is driven by a promise's lifecycle.
	</p>

	<div class="build">
		<button type="button" onclick={refresh}>Refresh</button>

		{#await promise}
			<p class="status">Loading user…</p>
		{:then user}
			<article class="user">
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<p class="muted">ID: {user.id}</p>
			</article>
		{:catch err}
			<p class="pill error">Error: {err.message}</p>
		{/await}

		<p class="note">
			Compare this to 4.7: no <code>loading</code>, no <code>error</code>, no
			<code>user</code> state. Just one promise.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these experiments in your own code. Breaking things is how you build a mental model of what Svelte actually enforces versus what it merely prefers.</p>
	<ol class="experiments">
		<li><strong>Pass a non-promise value to <code>{'{#await}'}</code>.</strong> Svelte handles it gracefully: the value is treated as an already-resolved promise, so the <code>{'{:then}'}</code> branch renders immediately with that value. The pending branch is skipped entirely, which can be useful for synchronous fallbacks.</li>
		<li><strong>Reassign the promise variable to a new <code>fetch()</code> call.</strong> Svelte detects the new promise reference, stops tracking the old one, and switches back to the pending branch while the new promise is in flight. This is how you implement "refresh" buttons -- just reassign the promise and the UI resets automatically.</li>
		<li><strong>Forget the <code>{'{:catch}'}</code> block entirely.</strong> If the promise rejects, nothing renders -- the UI goes blank with no error message and no console warning. Always include a <code>{'{:catch}'}</code> branch so users see what went wrong and can take action, like retrying the request.</li>
		<li><strong>Resolve the promise with <code>undefined</code>.</strong> The <code>{'{:then}'}</code> branch renders, but the bound value is <code>undefined</code>. If your template tries to access properties on it, you will get a runtime error. Guard against this by checking the value before rendering its fields.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>{'{#await}'}</code> block is Svelte's declarative async state machine. It takes a single promise and provides three branches -- pending, fulfilled (<code>{'{:then}'}</code>), and rejected (<code>{'{:catch}'}</code>) -- that correspond exactly to the three states of a JavaScript promise. This replaces the manual pattern of managing separate <code>loading</code>, <code>data</code>, and <code>error</code> state variables with a single reactive expression.</p>
	<p class="prose">Reassigning the promise variable is the key interaction pattern. When you write <code>promise = fetchUser()</code>, Svelte detects the new reference, drops the old promise (any pending resolution is ignored), and re-enters the pending branch while the new promise is in flight. This makes refresh buttons, retry logic, and parameter-dependent fetches trivially simple -- just assign a new promise and the template handles the rest.</p>
	<p class="prose">There is also a short form: <code>{'{#await promise then value}'}</code>, which skips the pending branch entirely and renders nothing until the promise resolves. Use this for fast operations where showing a loading spinner would cause distracting flicker. For anything that takes more than a few hundred milliseconds, always include the full three-branch form so users get immediate visual feedback that something is happening.</p>
	<p class="next">Next lesson: <a href="/module-4/4-9-catch-errors">4.9 — {'{:catch}'} and typed errors</a></p>
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
	button:hover {
		background: var(--color-brand-dim);
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
