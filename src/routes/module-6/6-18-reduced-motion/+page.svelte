<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';

	interface Card {
		id: number;
		title: string;
		description: string;
	}

	const cards: Card[] = [
		{ id: 1, title: 'Respect', description: 'Motion preferences are accessibility needs.' },
		{ id: 2, title: 'Reactive', description: 'prefersReducedMotion.current updates live.' },
		{ id: 3, title: 'Graceful', description: 'Fade is a safe alternative to motion.' },
		{ id: 4, title: 'Fast', description: 'Reduced motion should also mean shorter.' },
		{ id: 5, title: 'Gated', description: 'Wrap any effect that moves in space.' },
		{ id: 6, title: 'Default on', description: 'Assume some users have it enabled.' },
		{ id: 7, title: 'Tested', description: 'Try both branches in every review.' },
		{ id: 8, title: 'Kind', description: 'Good motion design respects the viewer.' }
	];

	let visible = $state(true);
	let forceReduced = $state(false);

	const reduced = $derived(prefersReducedMotion.current || forceReduced);

	function replay() {
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 30);
	}
</script>

<section class="page">
	<h1>6.18 — prefers-reduced-motion</h1>
	<p class="concept">
		<strong>Concept.</strong> Some people experience motion sickness or vestibular discomfort from
		animated UI. The OS lets them request reduced motion and browsers expose it via
		<code>@media (prefers-reduced-motion: reduce)</code>. In Svelte read
		<code>prefersReducedMotion.current</code> from <code>svelte/motion</code> and conditionally
		shorten or replace transitions. This is not optional — if you animate, respect it.
	</p>

	<div class="build">
		<div class="row">
			<span class="pill" class:on={reduced}>
				Reduced motion: <strong>{reduced ? 'on' : 'off'}</strong>
			</span>
			<label class="toggle">
				<input type="checkbox" bind:checked={forceReduced} />
				Force reduced motion (demo)
			</label>
		</div>
		<div class="row">
			<button type="button" onclick={replay}>Play</button>
		</div>

		{#if visible}
			<div class="grid">
				{#each cards as card, i (card.id)}
					{#if reduced}
						<div class="card" in:fade={{ duration: 150 }}>
							<h4>{card.title}</h4>
							<p>{card.description}</p>
						</div>
					{:else}
						<div
							class="card"
							in:fly={{ y: 30, delay: i * 80, duration: 500, easing: cubicOut }}
							out:fade={{ duration: 200 }}
						>
							<h4>{card.title}</h4>
							<p>{card.description}</p>
						</div>
					{/if}
				{/each}
			</div>
		{/if}

		<div class="instructions">
			<p><strong>Turn on reduced motion in your OS:</strong></p>
			<ul class="inline">
				<li><strong>macOS:</strong> System Settings → Accessibility → Display → Reduce Motion</li>
				<li>
					<strong>Windows:</strong> Settings → Accessibility → Visual effects → Animation effects
				</li>
				<li><strong>iOS:</strong> Settings → Accessibility → Motion → Reduce Motion</li>
				<li>
					<strong>Android:</strong> Settings → Accessibility → Remove animations
				</li>
			</ul>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>
			<code>prefersReducedMotion</code> from <code>svelte/motion</code> is reactive — read
			<code>.current</code>.
		</li>
		<li>Swap <code>fly</code>/<code>slide</code>/<code>scale</code> for <code>fade</code> when on.</li>
		<li>Drop stagger delays — users want content fast, not choreographed.</li>
		<li>Always provide a dev toggle so instructors can demo both branches.</li>
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
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
	}
	.pill {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.pill.on {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}
	.pill.on strong {
		color: var(--color-surface);
	}
	.pill strong {
		color: var(--color-text);
	}
	.toggle {
		display: inline-flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
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
	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
	}
	.card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.card h4 {
		margin: 0;
		font-size: var(--text-base);
		color: var(--color-text);
	}
	.card p {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.5;
	}
	.instructions {
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.instructions p {
		margin: 0 0 var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-sm);
	}
	ul.inline {
		font-size: var(--text-sm);
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
