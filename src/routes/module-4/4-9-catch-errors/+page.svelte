<script lang="ts">
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
</style>
