<script lang="ts">
	interface Message {
		id: number;
		text: string;
	}

	const messages: readonly Message[] = [
		{ id: 1, text: 'Welcome — this card re-mounts on every change.' },
		{ id: 2, text: 'The {#key} block tears down its contents when the expression changes.' },
		{ id: 3, text: 'That means CSS animations re-run from scratch every time.' },
		{ id: 4, text: 'Use it to reset state or retrigger entrance effects.' },
		{ id: 5, text: 'Prefer normal reactivity unless you need full tear-down.' }
	];

	let current = $state(0);

	function prev() {
		current = (current - 1 + messages.length) % messages.length;
	}

	function next() {
		current = (current + 1) % messages.length;
	}
</script>

<section class="page">
	<h1>4.6 — {'{#key}'} block</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>{'{#key expression}'}</code> destroys and recreates its contents whenever the expression
		changes. Use it to force a component to re-mount (resetting its local state), to retrigger an
		entrance animation, or to recreate something that can't handle a reactive prop update
		gracefully. It's a big hammer — prefer ordinary reactivity unless you need the full tear-down.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={prev}>Prev</button>
			<span class="counter">{current + 1} / {messages.length}</span>
			<button type="button" onclick={next}>Next</button>
		</div>

		{#key current}
			<article class="card">
				<p>{messages[current].text}</p>
			</article>
		{/key}

		<p class="note">
			Every click recreates the <code>.card</code> element, so the fade-slide animation runs
			fresh each time.
		</p>
	</div>

	<h3>Combining {'{#key}'} with transitions</h3>
	<p class="concept">
		In Module 6, you'll combine <code>{'{#key}'}</code> with Svelte transitions. The pattern:
		<code>{'{#key id}<div transition:fly>{content}</div>{/key}'}</code> — every key change tears
		down and recreates the element, triggering the entrance transition fresh. This is how you build
		content switchers with smooth animations.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li><code>{'{#key expr}'}</code> destroys and recreates its block on change.</li>
		<li>Useful for resetting state and retriggering entrance animations.</li>
		<li>Prefer normal reactivity unless full tear-down is required.</li>
		<li>Respect <code>prefers-reduced-motion</code> when keying animations.</li>
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
		align-items: center;
		gap: var(--space-md);
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
	.counter {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-lg);
		min-block-size: 6rem;
		display: grid;
		place-items: center;
		animation: fadeSlide var(--dur-slow) var(--ease-expressive);
	}
	.card p {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
		text-align: center;
		max-inline-size: 40ch;
	}

	.note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	@keyframes fadeSlide {
		from {
			opacity: 0;
			transform: translateY(var(--space-sm));
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card { animation: none; }
	}

	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
