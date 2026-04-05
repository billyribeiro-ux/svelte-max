<script lang="ts">
	type Status = 'idle' | 'loading' | 'error' | 'success';

	let status = $state<Status>('idle');

	function setStatus(next: Status) {
		status = next;
	}
</script>

<section class="page">
	<h1>4.2 — {':else if'} and {':else'}</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{:else if}'}</code> and <code>{'{:else}'}</code> chain conditions in a single
		<code>{'{#if}'}</code> block. Svelte evaluates them top-down and renders the first branch
		that matches. This is the idiomatic pattern for finite state machines — the universal
		<code>'idle' | 'loading' | 'error' | 'success'</code> shape for any async operation.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={() => setStatus('idle')}>idle</button>
			<button type="button" onclick={() => setStatus('loading')}>loading</button>
			<button type="button" onclick={() => setStatus('error')}>error</button>
			<button type="button" onclick={() => setStatus('success')}>success</button>
		</div>

		{#if status === 'loading'}
			<span class="pill loading">Loading…</span>
		{:else if status === 'error'}
			<span class="pill error">Something went wrong</span>
		{:else if status === 'success'}
			<span class="pill success">Done!</span>
		{:else}
			<span class="pill idle">Idle — click a button</span>
		{/if}

		<p class="note">
			The status is <code>{status}</code>. Click through to see each branch render.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>{':else if'}</code> chains inside one <code>{'{#if}'}</code> block.</li>
		<li>Branches are evaluated top-down; only the first match renders.</li>
		<li>A literal union type like <code>'idle' | 'loading' | 'error' | 'success'</code> pairs perfectly with an <code>{'{:else if}'}</code> chain.</li>
		<li><code>{':else'}</code> is the fallback when no branch matches.</li>
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
	.concept strong { color: var(--color-text); }

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

	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }

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

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.controls button {
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out);
	}
	.controls button:hover {
		background: var(--color-surface-2);
		border-color: var(--color-brand);
	}

	.pill {
		display: inline-block;
		width: fit-content;
		font-size: var(--text-sm);
		font-weight: 600;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-full);
	}
	.idle { background: var(--color-surface-2); color: var(--color-text-muted); }
	.loading { background: var(--color-brand); color: var(--color-surface); }
	.error { background: var(--color-error); color: var(--color-surface); }
	.success { background: var(--color-success); color: var(--color-surface); }

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
