<script lang="ts">
	import type { TransitionConfig } from 'svelte/transition';

	interface TypewriterParams {
		speed?: number;
	}

	function typewriter(node: Element, { speed = 1 }: TypewriterParams = {}): TransitionConfig {
		const text = node.textContent ?? '';
		const duration = text.length / (speed * 0.05);
		return {
			duration,
			tick: (t: number) => {
				const i = Math.floor(text.length * t);
				(node as HTMLElement).textContent = text.slice(0, i);
			}
		};
	}

	let show = $state(true);
	let showSlow = $state(true);

	const sample =
		'Custom transitions let you express motion that built-ins cannot — like this character-by-character reveal.';
	const sampleSlow =
		'Slower speed means more dramatic reveal. Same function, different parameter.';

	function replay() {
		show = false;
		setTimeout(() => {
			show = true;
		}, 30);
	}

	function replaySlow() {
		showSlow = false;
		setTimeout(() => {
			showSlow = true;
		}, 30);
	}
</script>

<section class="page">
	<h1>6.16 — Custom transition functions</h1>
	<p class="concept">
		<strong>Concept.</strong> Built-in transitions like <code>fade</code>, <code>fly</code>,
		<code>slide</code>, <code>scale</code> cover most cases. For unique effects, write your own. A
		transition function takes <code>(node, params)</code> and returns a config with
		<code>duration</code>, <code>easing</code>, and either <code>css(t, u)</code> for
		CSS-expressible animations or <code>tick(t, u)</code> for JS-driven animation when CSS cannot
		express the effect (e.g. text splitting).
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={replay}>Replay (speed 1)</button>
		</div>
		{#if show}
			<p class="typed" in:typewriter={{ speed: 1 }}>{sample}</p>
		{:else}
			<p class="typed placeholder">&nbsp;</p>
		{/if}

		<div class="row">
			<button type="button" onclick={replaySlow}>Replay slower (speed 0.5)</button>
		</div>
		{#if showSlow}
			<p class="typed" in:typewriter={{ speed: 0.5 }}>{sampleSlow}</p>
		{:else}
			<p class="typed placeholder">&nbsp;</p>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Custom transitions are just functions returning a <code>TransitionConfig</code>.</li>
		<li>Use <code>css(t, u)</code> for CSS-expressible animations.</li>
		<li>Use <code>tick(t, u)</code> when you need to touch the DOM directly each frame.</li>
		<li>Parameterize with a typed params object for reusability.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 72rem;
		margin-inline: auto;
		color: var(--color-text);
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
	.row {
		display: flex;
		gap: var(--space-sm);
	}
	button {
		background: var(--color-brand);
		color: var(--color-surface);
		border: none;
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	button:hover {
		background: var(--color-brand-dim);
	}
	.typed {
		margin: 0;
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-base);
		line-height: 1.6;
		min-block-size: 4em;
	}
	.placeholder {
		color: var(--color-text-muted);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
