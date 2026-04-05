<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li><code>{`{#await}`}</code> replaces three state variables with one</li>
		<li>Three branches: pending, <code>{`{:then}`}</code>, <code>{`{:catch}`}</code></li>
		<li>Reassigning the promise re-runs the block</li>
		<li>Short form: <code>{`{#await promise then value}`}</code> skips pending</li>
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
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-sm);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
