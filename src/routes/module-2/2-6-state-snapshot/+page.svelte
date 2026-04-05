<script lang="ts">
	interface Contact {
		name: string;
		email: string;
		topic: 'bug' | 'feature' | 'help';
		message: string;
	}

	let form = $state<Contact>({
		name: '',
		email: '',
		topic: 'help',
		message: ''
	});

	let snapshot = $state<Contact | null>(null);
	let submitted = $state<boolean>(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	function preview(): void {
		const payload = $state.snapshot(form);
		console.log('payload:', payload);
		snapshot = payload;
	}

	function submit(): void {
		const payload = $state.snapshot(form);
		console.log('submit:', payload);
		submitted = true;
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			submitted = false;
		}, 2000);
	}
</script>

<section class="page">
	<h1>2.6 — $state.snapshot</h1>

	<p class="concept">
		Reactive state in Svelte 5 is backed by a Proxy so every read and write can be tracked. That
		Proxy is an implementation detail most code never sees — but the moment you try to
		<code>JSON.stringify</code> state, hand it to a fetch body, structurally clone it, or compare it
		against a previous value, the wrapper can confuse downstream code. <code>$state.snapshot(value)</code>
		returns a deep plain-object copy with every Proxy stripped away. You usually don't need it, but
		you'll reach for it in three specific situations: logging for debugging, submitting to an API,
		and diffing against a previous value.
	</p>

	<div class="build">
		<form class="form" onsubmit={(e) => e.preventDefault()}>
			<label class="field">
				<span>Name</span>
				<input type="text" bind:value={form.name} placeholder="Ada Lovelace" />
			</label>

			<label class="field">
				<span>Email</span>
				<input type="email" bind:value={form.email} placeholder="ada@example.com" />
			</label>

			<fieldset class="field radios">
				<legend>Topic</legend>
				<label>
					<input type="radio" bind:group={form.topic} value="bug" />
					<span>Bug</span>
				</label>
				<label>
					<input type="radio" bind:group={form.topic} value="feature" />
					<span>Feature</span>
				</label>
				<label>
					<input type="radio" bind:group={form.topic} value="help" />
					<span>Help</span>
				</label>
			</fieldset>

			<label class="field">
				<span>Message</span>
				<textarea rows="4" bind:value={form.message} placeholder="Tell us what's on your mind..."></textarea>
			</label>

			<div class="actions">
				<button type="button" class="ghost" onclick={preview}>Preview payload</button>
				<button type="button" class="primary" onclick={submit}>Submit (pretend)</button>
			</div>

			{#if submitted}
				<p class="success" role="status">Thanks — we received your message.</p>
			{/if}
		</form>

		{#if snapshot}
			<div class="snapshot">
				<h4>Snapshot payload</h4>
				<pre>{JSON.stringify(snapshot, null, 2)}</pre>
				<p class="note">Notice: plain object. No <code>Proxy(...)</code> wrapper anywhere.</p>
			</div>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$state.snapshot</code> returns a deep, plain-object clone of reactive state.</li>
		<li>Use it before serializing, logging, or sending state across a network boundary.</li>
		<li>The snapshot is a one-shot copy — it does not stay in sync with the source.</li>
		<li>Most application code never needs it; reach for it at integration boundaries.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 {
		font-size: var(--text-2xl);
		margin: 0;
	}

	h3 {
		font-size: var(--text-lg);
		margin: 0;
	}

	h4 {
		font-size: var(--text-sm);
		margin: 0 0 var(--space-sm) 0;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
	}

	.concept {
		font-size: var(--text-base);
		line-height: 1.6;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.form {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.field > span,
	.field > legend {
		font-weight: 600;
		color: var(--color-text);
	}

	input[type='text'],
	input[type='email'],
	textarea {
		font: inherit;
		font-size: var(--text-base);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		background: var(--color-surface-1);
		color: var(--color-text);
		transition: border-color var(--dur-base) var(--ease-out);
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	textarea {
		resize: vertical;
		font-family: inherit;
	}

	.radios {
		border: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-md);
	}

	.radios label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text);
		cursor: pointer;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	button {
		font: inherit;
		font-size: var(--text-sm);
		padding: var(--space-sm) var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		cursor: pointer;
		transition: background var(--dur-base) var(--ease-out);
	}

	.ghost {
		background: var(--color-surface-1);
		color: var(--color-text);
	}

	.ghost:hover {
		background: var(--color-surface-2);
	}

	.primary {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}

	.primary:hover {
		background: var(--color-brand-dim);
	}

	.success {
		font-size: var(--text-sm);
		color: var(--color-success);
		margin: 0;
	}

	.snapshot {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	pre {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-1);
		color: var(--color-text);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		overflow-x: auto;
		margin: 0;
		line-height: 1.5;
	}

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	ul {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		margin: 0;
		padding-left: var(--space-lg);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}

	@media (min-width: 768px) {
		.page {
			padding: var(--space-2xl);
		}

		h1 {
			font-size: var(--text-hero);
		}

		.build {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
