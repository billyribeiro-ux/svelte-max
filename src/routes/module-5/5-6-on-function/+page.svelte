<script lang="ts">
	import { on } from 'svelte/events';

	let listening = $state(false);
	let pressCount = $state(0);

	function toggle(): void {
		listening = !listening;
	}

	$effect(() => {
		if (!listening) return;
		const cleanup = on(window, 'keydown', () => {
			pressCount += 1;
		});
		return cleanup;
	});
</script>

<section class="page">
	<h1>5.6 — on() from svelte/events</h1>
	<p class="concept">
		<strong>Concept.</strong> Sometimes you need to attach a listener dynamically — only when some
		state is true, or to <code>window</code>/<code>document</code>. For conditional/dynamic cases
		use <code>on(target, event, handler)</code> from <code>svelte/events</code>: it returns a
		cleanup function and preserves correct event ordering with declarative handlers.
	</p>

	<div class="build">
		<button type="button" class="toggle" class:on={listening} onclick={toggle}>
			{listening ? 'Stop listening' : 'Start listening'}
		</button>

		<div class="status">
			<p class="status-line">
				<span class="dot" class:active={listening} aria-hidden="true"></span>
				{listening ? 'Listening (press any key)' : 'Not listening'}
			</p>
			<p class="count">Key presses: <strong>{pressCount}</strong></p>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Import <code>on</code> from <code>svelte/events</code> for dynamic listeners.</li>
		<li><code>on()</code> returns a cleanup — return it from <code>$effect</code>.</li>
		<li>Ideal for <code>window</code>/<code>document</code> targets conditional on state.</li>
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
	.toggle {
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition:
			background var(--dur-fast) var(--ease-out),
			border-color var(--dur-fast) var(--ease-out);
	}
	.toggle.on {
		background: var(--color-brand);
		border-color: var(--color-brand);
		color: var(--color-surface);
	}
	.status {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.status-line {
		margin: 0;
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.dot {
		inline-size: 0.6rem;
		block-size: 0.6rem;
		border-radius: var(--radius-full);
		background: var(--color-border);
		transition: background var(--dur-fast) var(--ease-out);
	}
	.dot.active {
		background: var(--color-success);
		box-shadow: 0 0 0 3px var(--color-brand-dim);
	}
	.count {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.count strong {
		color: var(--color-brand);
		font-family: var(--font-mono);
		font-variant-numeric: tabular-nums;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
