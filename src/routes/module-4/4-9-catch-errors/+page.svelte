<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface User {
		id: number;
		name: string;
		email: string;
	}

	async function fetchRandomUser(): Promise<User> {
		await new Promise((resolve) => setTimeout(resolve, 600));
		if (Math.random() < 0.5) {
			throw new Error('Network error: server unreachable');
		}
		return { id: 42, name: 'Grace Hopper', email: 'grace@example.com' };
	}

	let promise = $state<Promise<User>>(fetchRandomUser());

	function fetchAgain(): void {
		promise = fetchRandomUser();
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
		"\tasync function fetchRandomUser(): Promise\u003cUser\u003e {\n" +
		"\t\tawait new Promise((resolve) =\u003e setTimeout(resolve, 600));\n" +
		"\t\tif (Math.random() \u003c 0.5) {\n" +
		"\t\t\tthrow new Error('Network error: server unreachable');\n" +
		"\t\t}\n" +
		"\t\treturn { id: 42, name: 'Grace Hopper', email: 'grace@example.com' };\n" +
		"\t}\n" +
		"\n" +
		"\tlet promise = $state\u003cPromise\u003cUser\u003e\u003e(fetchRandomUser());\n" +
		"\n" +
		"\tfunction fetchAgain(): void {\n" +
		"\t\tpromise = fetchRandomUser();\n" +
		"\t}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"\t\u003ch1\u003e4.9 — {`{:catch}`} and typed errors\u003c/h1\u003e\n" +
		"\t\u003cp class=\"concept\"\u003e\n" +
		"\t\t\u003cstrong\u003eConcept.\u003c/strong\u003e JavaScript's \u003ccode\u003ethrow\u003c/code\u003e accepts any value — not just\n" +
		"\t\t\u003ccode\u003eError\u003c/code\u003e instances. In strict TypeScript, caught values are typed as\n" +
		"\t\t\u003ccode\u003eunknown\u003c/code\u003e, which means you must narrow them before using them:\n" +
		"\t\t\u003ccode\u003eif (err instanceof Error)\u003c/code\u003e. Svelte's \u003ccode\u003e{`{:catch err}`}\u003c/code\u003e binding gives you\n" +
		"\t\tthe thrown value; narrow it in the template or a helper function. Pair this with a retry button\n" +
		"\t\tto build graceful error UIs.\n" +
		"\t\u003c/p\u003e\n" +
		"\n" +
		"\t\u003cdiv class=\"build\"\u003e\n" +
		"\t\t\u003cp class=\"hint\"\u003eThis fetcher fails 50% of the time. Click Fetch several times to see both branches.\u003c/p\u003e\n" +
		"\t\t\u003cbutton type=\"button\" onclick={fetchAgain}\u003eFetch random user\u003c/button\u003e\n" +
		"\n" +
		"\t\t{#await promise}\n" +
		"\t\t\t\u003cp class=\"status\"\u003eLoading…\u003c/p\u003e\n" +
		"\t\t{:then user}\n" +
		"\t\t\t\u003carticle class=\"user\"\u003e\n" +
		"\t\t\t\t\u003ch2\u003e{user.name}\u003c/h2\u003e\n" +
		"\t\t\t\t\u003cp\u003e{user.email}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cp class=\"muted\"\u003eID: {user.id}\u003c/p\u003e\n" +
		"\t\t\t\u003c/article\u003e\n" +
		"\t\t{:catch err}\n" +
		"\t\t\t\u003cdiv class=\"error-card\"\u003e\n" +
		"\t\t\t\t\u003cp\u003e{err instanceof Error ? err.message : 'Unknown error'}\u003c/p\u003e\n" +
		"\t\t\t\t\u003cbutton type=\"button\" onclick={() =\u003e (promise = fetchRandomUser())}\u003eRetry\u003c/button\u003e\n" +
		"\t\t\t\u003c/div\u003e\n" +
		"\t\t{/await}\n" +
		"\t\u003c/div\u003e\n" +
		"\n" +
		"\t\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"\t\u003cul\u003e\n" +
		"\t\t\u003cli\u003eCaught values are \u003ccode\u003eunknown\u003c/code\u003e in strict TS — narrow with \u003ccode\u003einstanceof Error\u003c/code\u003e\u003c/li\u003e\n" +
		"\t\t\u003cli\u003e\u003ccode\u003e{`{:catch err}`}\u003c/code\u003e exposes the thrown value to the template\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eRetry buttons give users agency when things fail\u003c/li\u003e\n" +
		"\t\t\u003cli\u003eAssigning a new promise re-runs the entire await block\u003c/li\u003e\n" +
		"\t\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>4.9 — {`{:catch}`} and typed errors</h1>
	<p class="concept">
		<strong>Concept.</strong> JavaScript's <code>throw</code> accepts any value — not just
		<code>Error</code> instances. In strict TypeScript, caught values are typed as
		<code>unknown</code>, which means you must narrow them before using them:
		<code>if (err instanceof Error)</code>. Svelte's <code>{`{:catch err}`}</code> binding gives you
		the thrown value; narrow it in the template or a helper function. Pair this with a retry button
		to build graceful error UIs.
	</p>

	<div class="build">
		<p class="hint">This fetcher fails 50% of the time. Click Fetch several times to see both branches.</p>
		<button type="button" onclick={fetchAgain}>Fetch random user</button>

		{#await promise}
			<p class="status">Loading…</p>
		{:then user}
			<article class="user">
				<h2>{user.name}</h2>
				<p>{user.email}</p>
				<p class="muted">ID: {user.id}</p>
			</article>
		{:catch err}
			<div class="error-card">
				<p>{err instanceof Error ? err.message : 'Unknown error'}</p>
				<button type="button" onclick={() => (promise = fetchRandomUser())}>Retry</button>
			</div>
		{/await}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Caught values are <code>unknown</code> in strict TS — narrow with <code>instanceof Error</code></li>
		<li><code>{`{:catch err}`}</code> exposes the thrown value to the template</li>
		<li>Retry buttons give users agency when things fail</li>
		<li>Assigning a new promise re-runs the entire await block</li>
	</ul>
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
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
	.error-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-error);
		border-radius: var(--radius-md);
	}
	.error-card p {
		margin: 0;
		color: var(--color-error);
	}
	.error-card button {
		background: var(--color-error);
	}
	.error-card button:hover {
		opacity: 0.85;
		background: var(--color-error);
	}
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
