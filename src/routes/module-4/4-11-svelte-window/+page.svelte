<script lang="ts">
	let showHelp = $state(false);
	let width = $state(0);
	let scrollY = $state(0);

	function handleKey(e: KeyboardEvent): void {
		if (e.key === '?' && (e.shiftKey || e.metaKey)) {
			showHelp = !showHelp;
			e.preventDefault();
		} else if (e.key === 'Escape') {
			showHelp = false;
		}
	}
</script>

<svelte:window bind:innerWidth={width} bind:scrollY onkeydown={handleKey} />

<section class="page">
	<h1>4.11 — &lt;svelte:window&gt; and friends</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>&lt;svelte:window&gt;</code>, <code>&lt;svelte:document&gt;</code>, and
		<code>&lt;svelte:body&gt;</code> are Svelte's SSR-safe way to attach listeners and bindings to
		global DOM objects. Svelte wires up the listeners on mount and cleans them up automatically on
		unmount — no manual <code>$effect</code> needed. You can also <code>bind:</code> to properties
		like <code>innerWidth</code>, <code>scrollY</code>, or <code>activeElement</code> and Svelte
		keeps them reactive.
	</p>

	<div class="build">
		<p class="hint">
			Press <kbd>Shift</kbd> + <kbd>?</kbd> to toggle the shortcut overlay. Press
			<kbd>Escape</kbd> to dismiss it. Resize the window and scroll the page to see the live bindings.
		</p>

		<div class="live">
			<div class="metric">
				<span class="label">innerWidth</span>
				<span class="value">{width}px</span>
			</div>
			<div class="metric">
				<span class="label">scrollY</span>
				<span class="value">{Math.round(scrollY)}px</span>
			</div>
		</div>

		<button type="button" onclick={() => (showHelp = !showHelp)}>
			{showHelp ? 'Hide' : 'Show'} shortcuts
		</button>

		{#if showHelp}
			<div class="overlay" role="dialog" aria-label="Keyboard shortcuts">
				<h2>Keyboard shortcuts</h2>
				<dl>
					<dt><kbd>Shift</kbd> + <kbd>?</kbd></dt>
					<dd>Toggle this overlay</dd>
					<dt><kbd>Escape</kbd></dt>
					<dd>Close overlay</dd>
				</dl>
			</div>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;svelte:window&gt;</code> attaches listeners and bindings to <code>window</code></li>
		<li>Svelte auto-cleans listeners on unmount — no manual teardown</li>
		<li><code>bind:innerWidth</code> and <code>bind:scrollY</code> stay reactive as the user interacts</li>
		<li><code>&lt;svelte:document&gt;</code> exposes <code>visibilitychange</code>, <code>activeElement</code></li>
		<li><code>&lt;svelte:body&gt;</code> handles <code>mouseenter</code> / <code>mouseleave</code></li>
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
	kbd {
		display: inline-block;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: 0 var(--space-xs);
		color: var(--color-text);
	}
	.live {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.metric {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		min-width: 120px;
	}
	.label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}
	.value {
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		color: var(--color-brand);
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
	.overlay {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
	}
	.overlay h2 {
		margin: 0 0 var(--space-sm) 0;
		font-size: var(--text-lg);
	}
	dl {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: var(--space-xs) var(--space-md);
		margin: 0;
	}
	dt {
		margin: 0;
	}
	dd {
		margin: 0;
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
