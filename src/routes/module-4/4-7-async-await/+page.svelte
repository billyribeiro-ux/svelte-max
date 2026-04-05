<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>Promises represent a value that will exist later</li>
		<li><code>async</code> functions always return a <code>Promise</code></li>
		<li><code>await</code> suspends execution until the promise settles</li>
		<li>Wrap <code>await</code> in <code>try/catch</code> to handle rejections</li>
		<li>Manual loading/error state works but gets verbose — 4.8 has a better way</li>
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
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-sm);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
