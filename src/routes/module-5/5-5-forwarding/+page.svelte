<script lang="ts">
	type Handler = {
		label: string;
		onclick: (e: MouseEvent) => void;
	};

	let log = $state<string[]>([]);

	function push(entry: string): void {
		log = [entry, ...log].slice(0, 5);
	}

	const handlers: Handler[] = [
		{
			label: 'Save',
			onclick: () => push('Saved at ' + new Date().toLocaleTimeString())
		},
		{
			label: 'Refresh',
			onclick: () => push('Refreshed data')
		},
		{
			label: 'Delete',
			onclick: () => push('Deleted selection')
		}
	];
</script>

<section class="page">
	<h1>5.5 — Forwarding events</h1>
	<p class="concept">
		<strong>Concept.</strong> A reusable component often wants its parent to decide what happens on
		click. The Svelte 5 pattern: accept the handler as a typed prop like
		<code>onclick: (e: MouseEvent) =&gt; void</code> and attach it to the inner element. No
		<code>createEventDispatcher</code>, no custom event names — just a typed function prop.
	</p>

	<div class="build">
		<div class="toolbar">
			{#each handlers as btn (btn.label)}
				<button type="button" onclick={btn.onclick}>{btn.label}</button>
			{/each}
		</div>

		<div class="log" aria-live="polite">
			<p class="log-title">Recent events</p>
			{#if log.length === 0}
				<p class="log-empty">No events yet — click a button.</p>
			{:else}
				<ul class="log-list">
					{#each log as entry, i (i + entry)}
						<li>{entry}</li>
					{/each}
				</ul>
			{/if}
		</div>

		<p class="note">
			When you extract this into a real <code>.svelte</code> component file, the same pattern
			applies: declare <code>interface Props {'{'} onclick: (e: MouseEvent) =&gt; void {'}'}</code> and
			bind it to the inner button.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Handlers are just function values — pass them as props.</li>
		<li>Type them explicitly: <code>(e: MouseEvent) =&gt; void</code>.</li>
		<li>No event dispatcher needed in Svelte 5; the callback-prop pattern replaces it.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
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
	.toolbar {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}
	.toolbar button {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.toolbar button:hover {
		border-color: var(--color-brand);
	}
	.log {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.log-title {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text);
	}
	.log-empty {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.log-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text);
	}
	.note {
		margin: 0;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
