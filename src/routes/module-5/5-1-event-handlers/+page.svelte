<script lang="ts">
	let likes = $state(0);
	let popping = $state(false);

	function like(): void {
		likes += 1;
		popping = true;
		setTimeout(() => {
			popping = false;
		}, 400);
	}
</script>

<section class="page">
	<h1>5.1 — Event handlers</h1>
	<p class="concept">
		<strong>Concept.</strong> Svelte 5 uses native DOM attribute syntax for event handlers —
		<code>{'onclick={handler}'}</code> (not the Svelte 4 directive <code>on:click</code>). Inline
		arrow handlers are fine for one-liners; named handlers for anything more. Every handler
		receives a typed DOM event.
	</p>

	<div class="build">
		<button type="button" class="like" onclick={like}>
			<span class="heart" class:pop={popping} aria-hidden="true">&#10084;&#65039;</span>
			<span class="count">{likes}</span>
		</button>
		<p class="hint">Click the heart — state updates and a pop class is applied briefly.</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Use <code>{'onclick={handler}'}</code>, not <code>on:click</code>.</li>
		<li>Named handlers read better for multi-line logic.</li>
		<li>Handlers are just functions passed as props — no invocation at the call site.</li>
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
	.like {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		padding: var(--space-sm) var(--space-lg);
		font-size: var(--text-lg);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.like:hover {
		background: var(--color-surface);
	}
	.heart {
		display: inline-block;
		transform-origin: center;
		transition: transform var(--dur-fast) var(--ease-out);
	}
	.heart.pop {
		animation: pop var(--dur-slow) var(--ease-expressive);
	}
	.count {
		font-variant-numeric: tabular-nums;
		color: var(--color-brand);
		font-weight: 600;
	}
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	@keyframes pop {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.6);
		}
		100% {
			transform: scale(1);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.heart.pop {
			animation: none;
		}
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
