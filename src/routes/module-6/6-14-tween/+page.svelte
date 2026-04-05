<script lang="ts">
	import { Tween } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const progress = new Tween(0, { duration: 800, easing: cubicOut });

	const stops: number[] = [0, 25, 50, 75, 100];

	function setTo(value: number): void {
		progress.target = value;
	}
</script>

<section class="page">
	<h1>6.14 — Tween class</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>Tween</code> from <code>svelte/motion</code> is the Svelte 5
		replacement for the deprecated <code>tweened</code> store. Instantiate:
		<code>const progress = new Tween(0, &lbrace; duration: 600, easing: cubicOut &rbrace;)</code>.
		Read the current value via <code>progress.current</code> (reactive). Set a new target via
		<code>progress.target = 0.75</code> — it smoothly animates. Differs from CSS transitions in
		that it works on JS numbers, not CSS properties — useful for SVG path lengths, counting text,
		and anything that isn't CSS-animatable.
	</p>

	<div class="build">
		<div class="bar">
			<div class="fill" style:width="{progress.current}%"></div>
		</div>
		<div class="count">{Math.round(progress.current)}%</div>

		<div class="controls">
			{#each stops as value}
				<button type="button" onclick={() => setTo(value)}>{value}%</button>
			{/each}
			<button type="button" class="reset" onclick={() => setTo(0)}>Reset</button>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Use the <code>Tween</code> class, not the deprecated <code>tweened</code> store.</li>
		<li>Read <code>.current</code> for the reactive interpolated value.</li>
		<li>Assign <code>.target</code> to animate toward a new value.</li>
		<li>Ideal for non-CSS values like counters, SVG paths, and canvas.</li>
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
	.bar {
		inline-size: 100%;
		block-size: 16px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-full);
		overflow: hidden;
	}
	.fill {
		block-size: 100%;
		background: var(--color-brand);
		border-radius: var(--radius-full);
	}
	.count {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		color: var(--color-text);
		text-align: center;
	}
	.controls {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.controls button {
		padding: var(--space-sm) var(--space-md);
		background: var(--color-brand);
		color: var(--color-surface);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
		font-family: var(--font-mono);
	}
	.controls button.reset {
		background: var(--color-surface-2);
		color: var(--color-text);
		border-color: var(--color-border);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
