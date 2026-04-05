<script lang="ts">
	interface ProfilePayload {
		user: {
			id: number;
			name: string;
			email: string;
		};
		stats: {
			posts: number;
			followers: number;
		};
		lastSeen: string;
	}

	// Return type is explicit — the reader never has to guess what awaiting this yields.
	async function loadProfile(userId: number): Promise<ProfilePayload> {
		await new Promise((resolve) => setTimeout(resolve, 700));
		return {
			user: { id: userId, name: 'Katherine Johnson', email: 'katherine@nasa.example' },
			stats: { posts: 128, followers: 9421 },
			lastSeen: new Date(Date.now() - 1000 * 60 * 17).toISOString()
		};
	}

	let promise = $state<Promise<ProfilePayload>>(loadProfile(1));

	function reload(): void {
		promise = loadProfile(1);
	}
</script>

<section class="page">
	<h1>4.10 — Promise&lt;T&gt; return types</h1>
	<p class="concept">
		<strong>Concept.</strong> Every async function returns a <code>Promise&lt;T&gt;</code>, where
		<code>T</code> is the type of the value you get when you <code>await</code> it. Typing async
		functions explicitly (rather than relying on inference) makes contracts crystal clear: any reader
		knows at a glance what data flows through your code. This matters more as promises chain:
		<code>fetch(url).then(r =&gt; r.json() as Promise&lt;User[]&gt;)</code>. No <code>any</code>,
		ever.
	</p>

	<div class="build">
		<button type="button" onclick={reload}>Reload profile</button>

		{#await promise}
			<p class="status">Loading profile…</p>
		{:then payload}
			<article class="profile">
				<header>
					<h2>{payload.user.name}</h2>
					<p class="muted">{payload.user.email}</p>
				</header>
				<div class="stats">
					<div class="stat">
						<span class="stat-num">{payload.stats.posts}</span>
						<span class="stat-label">Posts</span>
					</div>
					<div class="stat">
						<span class="stat-num">{payload.stats.followers.toLocaleString()}</span>
						<span class="stat-label">Followers</span>
					</div>
				</div>
				<p class="muted last-seen">
					Last seen: <code>{payload.lastSeen}</code>
				</p>
			</article>
		{:catch err}
			<p class="error">Error: {err instanceof Error ? err.message : 'Unknown'}</p>
		{/await}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Every async function returns <code>Promise&lt;T&gt;</code></li>
		<li>Explicit return types make intent clear and catch bugs at the boundary</li>
		<li>Strict TypeScript forbids <code>any</code> — type every layer</li>
		<li>Well-typed promises make <code>{`{#await}`}</code> blocks fully type-safe in the template</li>
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
	.profile {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.profile header h2 {
		margin: 0 0 var(--space-xs) 0;
		font-size: var(--text-lg);
	}
	.profile header p {
		margin: 0;
	}
	.stats {
		display: flex;
		gap: var(--space-lg);
	}
	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.stat-num {
		font-size: var(--text-xl);
		color: var(--color-brand);
		font-weight: 600;
	}
	.stat-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.muted {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin: 0;
	}
	.last-seen {
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-sm);
	}
	.error {
		color: var(--color-error);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
