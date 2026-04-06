<script lang="ts">
	interface Task {
		id: number;
		title: string;
	}

	let tasks = $state<Task[]>([
		{ id: 1, title: 'Write blog post' },
		{ id: 2, title: 'Water the plants' },
		{ id: 3, title: 'Review pull request' },
		{ id: 4, title: 'Ship the release' }
	]);

	function shuffle() {
		const next = [...tasks];
		for (let i = next.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[next[i], next[j]] = [next[j], next[i]];
		}
		tasks = next;
	}

	function reverse() {
		tasks = [...tasks].reverse();
	}
</script>

<section class="page">
	<h1>4.4 — {'{#each}'} with keys</h1>
	<p class="concept">
		<strong>Concept.</strong>
		Without a key, Svelte matches each-block items by position — reordering the array patches the
		existing DOM nodes in place instead of moving them. That's fine for static display, but it
		breaks anything with local state (inputs, timers, animations). Adding
		<code>{'(item.id)'}</code> tells Svelte to match by identity, so reorders move nodes instead of
		mutating them. Rule of thumb: always key an <code>{'{#each}'}</code> when items have identity.
	</p>

	<div class="build">
		<p class="note">
			Type something into a few inputs on both sides, then click <strong>Shuffle</strong> or
			<strong>Reverse</strong>. The unkeyed list scrambles the typed text; the keyed list keeps
			it attached to the right task.
		</p>

		<div class="controls">
			<button type="button" onclick={shuffle}>Shuffle</button>
			<button type="button" onclick={reverse}>Reverse</button>
		</div>

		<div class="lists">
			<div class="list">
				<h4>No key (buggy)</h4>
				{#each tasks as task, i}
					<div class="row">
						<span class="num">{i + 1}</span>
						<span class="title">{task.title}</span>
						<input type="text" placeholder="note…" />
					</div>
				{/each}
			</div>

			<div class="list">
				<h4>Keyed by id</h4>
				{#each tasks as task, i (task.id)}
					<div class="row">
						<span class="num">{i + 1}</span>
						<span class="title">{task.title}</span>
						<input type="text" placeholder="note…" />
					</div>
				{/each}
			</div>
		</div>
	</div>

	<h3>What if your data has no stable ID?</h3>
	<p class="concept">
		Options: (1) Generate one on creation (<code>crypto.randomUUID()</code>),
		(2) Use a composite key (<code>{`\${item.name}-\${item.date}`}</code>),
		(3) NEVER use the array index as a key — it defeats the purpose entirely.
		If you can't guarantee uniqueness, add a unique field to your data model.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li>Default each blocks match by position, not identity.</li>
		<li>Add <code>{'(item.id)'}</code> to key by a stable identifier.</li>
		<li>Keys are essential when list items hold local state (inputs, focus, animations).</li>
		<li>Keys unlock efficient move-based updates on reorders.</li>
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

	.note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	.note strong { color: var(--color-text); }

	.controls {
		display: flex;
		gap: var(--space-sm);
	}
	.controls button {
		font-family: inherit;
		font-size: var(--text-sm);
		color: var(--color-surface);
		background: var(--color-brand);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.controls button:hover { background: var(--color-brand-dim); }

	.lists {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.list {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.list h4 {
		margin: 0 0 var(--space-xs) 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
	}
	.num {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		min-inline-size: 1.25rem;
	}
	.title {
		font-size: var(--text-sm);
		color: var(--color-text);
		flex: 1;
	}
	.row input {
		font-family: inherit;
		font-size: var(--text-xs);
		color: var(--color-text);
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xs);
		padding: var(--space-xs);
		inline-size: 6rem;
	}
	.row input:focus {
		outline: none;
		border-color: var(--color-brand);
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.lists { grid-template-columns: 1fr 1fr; }
	}
</style>
