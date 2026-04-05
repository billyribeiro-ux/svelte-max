<script lang="ts">
	interface SubmitPayload {
		name: string;
		age: number;
		subscribe: boolean;
	}
	interface ApiResponse {
		echo?: SubmitPayload;
		receivedAt?: string;
		queryParam?: string | null;
		error?: string;
	}

	let name = $state('Ada');
	let age = $state(30);
	let subscribe = $state(true);
	let response = $state<ApiResponse | null>(null);
	let loading = $state(false);

	async function submit(e: SubmitEvent) {
		e.preventDefault();
		loading = true;
		try {
			const payload: SubmitPayload = { name, age, subscribe };
			const res = await fetch('./api?debug=1', {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify(payload)
			});
			response = (await res.json()) as ApiResponse;
		} finally {
			loading = false;
		}
	}
</script>

<section class="page">
	<h1>10.2 — Typed RequestHandler</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>RequestHandler</code> is generic over the route's param shape. Destructuring
		<code>{'{ request, params, url, cookies, fetch, locals }'}</code>
		gives you everything typed. <code>params</code> reflects the dynamic segments automatically,
		<code>url</code> is a <code>URL</code> object, and <code>request</code> is a standard
		<code>Request</code>. Read typed JSON with
		<code>{'const body = (await request.json()) as SubmitPayload'}</code> — but narrow it with a type
		predicate (or a schema library) before trusting it.
	</p>

	<div class="build">
		<form onsubmit={submit}>
			<label class="field">
				<span>Name</span>
				<input type="text" bind:value={name} required />
			</label>
			<label class="field">
				<span>Age</span>
				<input type="number" bind:value={age} min="0" required />
			</label>
			<label class="checkbox">
				<input type="checkbox" bind:checked={subscribe} />
				<span>Subscribe to newsletter</span>
			</label>
			<button type="submit" class="cta" disabled={loading}>
				{loading ? 'Posting...' : 'POST JSON'}
			</button>
		</form>

		{#if response}
			<pre>{JSON.stringify(response, null, 2)}</pre>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>RequestHandler</code> types the event and param shapes automatically.</li>
		<li>Always narrow <code>await request.json()</code> with a validator — never trust raw input.</li>
		<li><code>url.searchParams</code> reads query strings as a typed <code>URLSearchParams</code>.</li>
		<li>Return early with a <code>400</code> response when validation fails.</li>
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
	form {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
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
	.checkbox {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
