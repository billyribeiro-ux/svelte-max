<script lang="ts">
	type Shortcut = {
		key: string;
		ctrl: boolean;
		shift: boolean;
		meta: boolean;
	};

	let lastKey = $state<Shortcut | null>(null);

	function handleKey(e: KeyboardEvent): void {
		e.preventDefault();
		lastKey = {
			key: e.key === ' ' ? 'Space' : e.key,
			ctrl: e.ctrlKey,
			shift: e.shiftKey,
			meta: e.metaKey
		};
	}
</script>

<section class="page">
	<h1>5.3 — Typed DOM events</h1>
	<p class="concept">
		<strong>Concept.</strong> TypeScript gives you <code>MouseEvent</code>,
		<code>KeyboardEvent</code>, <code>InputEvent</code>, <code>FocusEvent</code>,
		<code>SubmitEvent</code>. Since <code>e.target</code> is
		<code>EventTarget | null</code>, narrow with
		<code>instanceof HTMLInputElement</code> before reading <code>.value</code> — the compiler
		catches typos.
	</p>

	<div class="build">
		<div class="capture" tabindex="0" onkeydown={handleKey} role="textbox" aria-label="Shortcut capture zone">
			Click here to focus, then press any key combination.
		</div>

		{#if lastKey}
			<div class="pills" aria-live="polite">
				{#if lastKey.ctrl}<kbd>Ctrl</kbd>{/if}
				{#if lastKey.meta}<kbd>Meta</kbd>{/if}
				{#if lastKey.shift}<kbd>Shift</kbd>{/if}
				<kbd class="key">{lastKey.key}</kbd>
			</div>
		{:else}
			<p class="hint">No key captured yet.</p>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Type handler params with concrete event types like <code>KeyboardEvent</code>.</li>
		<li>Read modifier flags: <code>e.ctrlKey</code>, <code>e.shiftKey</code>, <code>e.metaKey</code>.</li>
		<li>Divs need <code>tabindex="0"</code> to receive keyboard focus and events.</li>
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
	.capture {
		background: var(--color-surface-2);
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		color: var(--color-text-muted);
		text-align: center;
		cursor: text;
		transition: border-color var(--dur-fast) var(--ease-out);
	}
	.capture:focus {
		outline: none;
		border-color: var(--color-brand);
		box-shadow: 0 0 0 3px var(--color-brand-dim);
	}
	.pills {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		align-items: center;
	}
	kbd {
		display: inline-block;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-bottom-width: 2px;
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	kbd.key {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
