<script lang="ts">
	import TextField from '$lib/components/TextField.svelte';

	let name = $state('');
	let email = $state('');
</script>

<section class="page">
	<h1>3.5 — $bindable()</h1>
	<p class="concept">
		<strong>Concept.</strong> Props flow down by default. When a child needs to update state that
		lives in the parent, mark the prop with <code>$bindable()</code>. The parent then writes
		<code>&lt;TextField bind:value={'{myState}'} /&gt;</code>, and any mutation inside
		<code>TextField</code> propagates back up. This replaces the dispatch-event-and-handle-it
		dance from Svelte 4. Use <code>$bindable</code> sparingly — one-way data flow is still
		clearer when the child doesn't own the state.
	</p>

	<div class="build">
		<TextField label="Your name" bind:value={name} placeholder="Ada Rivera" />
		<TextField label="Email" type="email" bind:value={email} placeholder="ada@example.com" />

		<div class="preview">
			<p>Hello, <strong>{name || 'stranger'}</strong>!</p>
			<p class="muted">
				We'll reach you at <strong>{email || 'nowhere yet'}</strong>.
			</p>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>$bindable()</code> lets a child write back to a parent-owned piece of state.</li>
		<li>The parent opts in with <code>bind:value={'{state}'}</code> at the call site.</li>
		<li>No dispatchers, no <code>on:change</code> + setter pairs — it just flows.</li>
		<li>Prefer one-way props when the child is purely presentational.</li>
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

	.preview {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.preview p {
		margin: 0;
		font-size: var(--text-base);
	}

	.preview .muted {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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

	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
