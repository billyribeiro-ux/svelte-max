<script lang="ts">
	import { flip } from 'svelte/animate';
	import { cubicOut } from 'svelte/easing';

	interface Task {
		id: number;
		title: string;
		priority: number;
	}

	let tasks = $state<Task[]>([
		{ id: 1, title: 'Write docs', priority: 3 },
		{ id: 2, title: 'Fix login bug', priority: 1 },
		{ id: 3, title: 'Ship release', priority: 2 },
		{ id: 4, title: 'Review PRs', priority: 4 },
		{ id: 5, title: 'Plan roadmap', priority: 5 }
	]);

	function sortByPriority(): void {
		tasks = [...tasks].sort((a, b) => a.priority - b.priority);
	}

	function shuffle(): void {
		const next = [...tasks];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
		tasks = next;
	}
</script>

<section class="page">
	<h1>6.13 — animate:flip</h1>
	<p class="concept">
		<strong>Concept.</strong> When items in a keyed
		<code>&lbrace;#each&rbrace;</code> reorder, Svelte normally jumps them instantly.
		<code>animate:flip=&lbrace;&lbrace; duration: 300 &rbrace;&rbrace;</code> enables the FLIP
		technique (First, Last, Invert, Play) — Svelte measures old and new positions, then smoothly
		animates each item from its first position to its last. Magical for sortable lists. Requires a
		keyed each block.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" onclick={sortByPriority}>Sort by priority</button>
			<button type="button" onclick={shuffle}>Shuffle</button>
		</div>

		<ul class="tasks">
			{#each tasks as task (task.id)}
				<li class="task" animate:flip={{ duration: 400, easing: cubicOut }}>
					<span class="title">{task.title}</span>
					<span class="priority">P{task.priority}</span>
				</li>
			{/each}
		</ul>

		<p class="note">
			The key <code>(task.id)</code> is required — Svelte uses it to track identity across reorders.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul class="learned">
		<li><code>animate:flip</code> smoothly tweens reordered items.</li>
		<li>Only works inside keyed <code>&lbrace;#each&rbrace;</code> blocks.</li>
		<li>Import <code>flip</code> from <code>svelte/animate</code>.</li>
		<li>Great for sortable lists, drag-to-reorder, and filtering UIs.</li>
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
	.learned {
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
	}
	.tasks {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.task {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-md);
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		color: var(--color-text);
	}
	.title {
		font-size: var(--text-base);
	}
	.priority {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-brand);
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
