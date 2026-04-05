<script lang="ts">
	interface Item {
		id: number;
		name: string;
	}
	interface GetResponse {
		items: Item[];
	}
	interface PostResponse {
		item?: Item;
		error?: string;
	}

	let getResult = $state<GetResponse | null>(null);
	let getError = $state<string | null>(null);
	let getLoading = $state(false);

	let newName = $state('');
	let postResult = $state<PostResponse | null>(null);
	let postLoading = $state(false);

	async function fetchItems() {
		getLoading = true;
		getError = null;
		try {
			const res = await fetch('./api');
			if (!res.ok) throw new Error(`HTTP ${res.status}`);
			getResult = (await res.json()) as GetResponse;
		} catch (e) {
			getError = e instanceof Error ? e.message : 'Unknown error';
		} finally {
			getLoading = false;
		}
	}

	async function createItem(e: SubmitEvent) {
		e.preventDefault();
		postLoading = true;
		try {
			const res = await fetch('./api', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({ name: newName })
			});
			postResult = (await res.json()) as PostResponse;
			if (res.ok) newName = '';
		} finally {
			postLoading = false;
		}
	}
</script>

<section class="page">
	<h1>10.1 — +server.ts endpoints</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>+server.ts</code> files define HTTP endpoints — GET, POST, PUT, DELETE, PATCH. Each method exports
		a function that receives a typed event and returns a <code>Response</code>. Use the
		<code>json()</code> helper for typed JSON and <code>error()</code> for typed error throws. Reach for
		<code>+server.ts</code> when you need a public API for mobile apps, webhooks, or third parties; for
		internal page data prefer <code>load()</code>, and for mutations from forms prefer form actions.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" class="cta" onclick={fetchItems} disabled={getLoading}>
				{getLoading ? 'Loading...' : 'Fetch GET /api'}
			</button>
		</div>

		{#if getError}
			<p class="error">Error: {getError}</p>
		{/if}
		{#if getResult}
			<ul class="items">
				{#each getResult.items as item (item.id)}
					<li><code>#{item.id}</code> {item.name}</li>
				{/each}
			</ul>
		{/if}

		<form onsubmit={createItem}>
			<label class="field">
				<span>New item name</span>
				<input type="text" bind:value={newName} placeholder="A fresh idea" required />
			</label>
			<button type="submit" class="cta" disabled={postLoading || !newName.trim()}>
				{postLoading ? 'Posting...' : 'POST to /api'}
			</button>
		</form>

		{#if postResult}
			<pre>{JSON.stringify(postResult, null, 2)}</pre>
		{/if}
	</div>

	<p class="concept">
		The endpoint is reachable from any client, for example
		<code>curl https://your.site/module-10/10-1-server-endpoints/api</code>.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li>Export HTTP method handlers (<code>GET</code>, <code>POST</code>, ...) from <code>+server.ts</code>.</li>
		<li>Return <code>json(data, init)</code> for typed JSON responses.</li>
		<li>Call endpoints from the client with <code>fetch</code>, or from anywhere with <code>curl</code>.</li>
		<li>Use <code>+server.ts</code> for public APIs; prefer <code>load()</code>/form actions for internal pages.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72ch;
		margin-inline: auto;
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
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
	}
	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.field > span {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.field input {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
	}
	.field input:focus-visible {
		outline: 2px solid var(--color-brand);
		outline-offset: 2px;
	}
	button.cta {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-weight: 600;
		cursor: pointer;
		align-self: flex-start;
	}
	button.cta:hover:not(:disabled) {
		background: var(--color-brand-dim);
	}
	button.cta:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.row {
		display: flex;
		gap: var(--space-sm);
	}
	.items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
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
