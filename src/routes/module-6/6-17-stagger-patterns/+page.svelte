<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	interface Card {
		id: number;
		title: string;
		description: string;
	}

	const cards: Card[] = [
		{ id: 1, title: 'Fast', description: 'Zero-config dev server with instant HMR.' },
		{ id: 2, title: 'Typed', description: 'First-class TypeScript support everywhere.' },
		{ id: 3, title: 'Reactive', description: 'Runes make state transparent and simple.' },
		{ id: 4, title: 'Small', description: 'Compile-time optimizations keep bundles lean.' },
		{ id: 5, title: 'Accessible', description: 'A11y warnings baked into the compiler.' },
		{ id: 6, title: 'Animated', description: 'Transitions and motion built into the framework.' },
		{ id: 7, title: 'Routed', description: 'SvelteKit gives you file-based routing.' },
		{ id: 8, title: 'Deployable', description: 'Adapters for every platform you target.' }
	];

	let visible = $state(true);

	function replay() {
		visible = false;
		setTimeout(() => {
			visible = true;
		}, 30);
	}
</script>

<section class="page">
	<h1>6.17 — Stagger patterns</h1>
	<p class="concept">
		<strong>Concept.</strong> When many items enter at once, give each a small delay offset based on
		its index so they sequence in instead of arriving simultaneously. In Svelte this is a single
		line inside an <code>{'{#each}'}</code>: <code>transition:fly={'{{ delay: i * 50, y: 20 }}'}</code>.
		Stagger creates visual hierarchy and rhythm without extra code.
	</p>

	<div class="build">
		<div class="row">
			<button type="button" onclick={replay}>Play</button>
		</div>
		{#if visible}
			<div class="grid">
				{#each cards as card, i (card.id)}
					<div
						class="card"
						in:fly={{ y: 30, delay: i * 80, duration: 500, easing: cubicOut }}
						out:fade={{ duration: 200 }}
					>
						<h4>{card.title}</h4>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Stagger = per-index delay offset inside a loop.</li>
		<li>Capture the index in <code>{'{#each items as item, i}'}</code>.</li>
		<li>Keep each item keyed so re-mounts retrigger the transition.</li>
		<li>Separate <code>in:</code> and <code>out:</code> directives for entrance vs. exit.</li>
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
		.grid {
			grid-template-columns: repeat(4, 1fr);
		}
	}
</style>
