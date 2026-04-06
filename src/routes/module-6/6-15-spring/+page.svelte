<script lang="ts">
	import { Spring, prefersReducedMotion } from 'svelte/motion';

	// When reduced motion is active on initial render, spring should snap instantly.
	const reducedOnMount = prefersReducedMotion.current;
	const x = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });
	const y = new Spring(0, { stiffness: 0.1, damping: 0.4, ...(reducedOnMount && { hard: true }) });

	let rawX = $state(0);
	let rawY = $state(0);

	function handleMove(e: PointerEvent) {
		const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
		const nx = e.clientX - rect.left;
		const ny = e.clientY - rect.top;
		rawX = nx;
		rawY = ny;
		if (prefersReducedMotion.current) {
			x.set(nx, { instant: true });
			y.set(nx, { instant: true });
		} else {
			x.target = nx;
			y.target = ny;
		}
	}

	const displayX = $derived(prefersReducedMotion.current ? rawX : x.current);
	const displayY = $derived(prefersReducedMotion.current ? rawY : y.current);
</script>

<section class="page">
	<h1>6.15 — Spring class</h1>
	<p class="concept">
		<strong>Concept.</strong> The <code>Spring</code> class from <code>svelte/motion</code> gives you
		physics-based motion instead of duration-based tweening. Construct with
		<code>new Spring(initial, {'{ stiffness, damping }'})</code>: higher stiffness means faster,
		higher damping means less bounce. Set <code>.target = value</code> to start the simulation and
		read <code>.current</code> reactively. Ideal for cursor-following and drag gestures where feel
		matters more than exact timing. Always fall back to raw values when
		<code>prefersReducedMotion.current</code> is true.
	</p>

	<div class="build">
		<p class="hint">Move your pointer inside the box — the dot follows with spring physics.</p>
		<div
			class="field"
			onpointermove={handleMove}
			role="presentation"
		>
			<div class="dot" style:transform="translate({displayX}px, {displayY}px)"></div>
		</div>
		<p class="note">
			Reduced motion:
			<strong>{prefersReducedMotion.current ? 'on' : 'off'}</strong>. Turn it on in your OS
			accessibility settings and reload to see physics bypassed.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>Spring</code> is a physics simulation — no fixed duration.</li>
		<li>Stiffness and damping shape the feel: snappy vs. bouncy.</li>
		<li>Set <code>.target</code> to move, read <code>.current</code> to render.</li>
		<li>Always respect <code>prefersReducedMotion.current</code> and bypass animation when set.</li>
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
	.hint {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.field {
		position: relative;
		block-size: 280px;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
		touch-action: none;
	}
	.dot {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		inline-size: 28px;
		block-size: 28px;
		margin-inline-start: -14px;
		margin-block-start: -14px;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		box-shadow: var(--shadow-md);
		pointer-events: none;
		will-change: transform;
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note strong {
		color: var(--color-text);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.field {
			block-size: 360px;
		}
	}
</style>
