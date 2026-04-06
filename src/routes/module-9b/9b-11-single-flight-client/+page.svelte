<script lang="ts">
	const clientRefreshCode = `// Client-requested refresh
\u003cscript lang="ts"\u003e
  import { addTodo } from './todos.remote';
  import { getTodos } from './todos.remote';

  async function handleAdd(title: string) {
    // .updates() tells the server which queries to refresh
    await addTodo.submit(title).updates(getTodos);
    // getTodos is now fresh — no second request!
  }
\u003c/script\u003e`;

	const optimisticCode = `// Optimistic UI with .withOverride()
\u003cscript lang="ts"\u003e
  import { addTodo } from './todos.remote';
  import { getTodos } from './todos.remote';

  const todos = getTodos();

  async function handleAdd(title: string) {
    const optimistic = { id: crypto.randomUUID(), title, done: false };

    await addTodo
      .submit(title)
      .updates(getTodos)
      .withOverride(getTodos, (current) => [
        ...current,
        optimistic  // Show immediately
      ]);
    // When server responds, real data replaces the optimistic entry
  }
\u003c/script\u003e`;

	const rollbackNote = `// If the server request fails:
// 1. The optimistic override is automatically rolled back
// 2. The UI reverts to the last known good state
// 3. No manual error handling needed for the rollback`;

	type Item = { id: string; text: string };

	let items = $state<Item[]>([
		{ id: '1', text: 'Existing item A' },
		{ id: '2', text: 'Existing item B' },
	]);
	let newText = $state('');
	let pendingId = $state<string | null>(null);

	function handleAdd() {
		if (!newText.trim()) return;
		const id = crypto.randomUUID();
		const text = newText.trim();
		pendingId = id;
		items = [...items, { id, text }];
		newText = '';

		setTimeout(() => {
			pendingId = null;
		}, 800);
	}

	function handleRemove(id: string) {
		const removed = items.find((i) => i.id === id);
		items = items.filter((i) => i.id !== id);

		setTimeout(() => {
			if (removed && Math.random() < 0.3) {
				items = [...items, removed];
			}
		}, 500);
	}
</script>

<section class="page">
	<h1>9B.11 — Single-Flight Mutations (Client)</h1>
	<p class="concept">
		<strong>Concept.</strong> The client can request specific query refreshes with
		<code>submit().updates(getQuery)</code>. For instant feedback,
		<code>.withOverride()</code> provides optimistic UI that auto-rolls back on failure.
	</p>

	<div class="build">
		<h2>Client-requested refresh</h2>
		<pre><code>{clientRefreshCode}</code></pre>

		<h2>Optimistic UI with override</h2>
		<pre><code>{optimisticCode}</code></pre>

		<h2>Automatic rollback</h2>
		<pre><code>{rollbackNote}</code></pre>

		<h2>Simulated optimistic add</h2>
		<p>Items appear instantly (optimistic). The brief highlight indicates "server confirmation":</p>

		<div class="add-form">
			<input
				type="text"
				bind:value={newText}
				placeholder="Add an item..."
				class="add-input"
				onkeydown={(e) => { if (e.key === 'Enter') handleAdd(); }}
			/>
			<button class="add-btn" onclick={handleAdd}>Add</button>
		</div>

		<div class="item-list">
			{#each items as item}
				<div class="item" class:pending={item.id === pendingId}>
					<span>{item.text}</span>
					<button class="remove-btn" onclick={() => handleRemove(item.id)}>Remove</button>
				</div>
			{:else}
				<p class="empty">No items. Add one above!</p>
			{/each}
		</div>

		<p class="hint">Remove has a 30% simulated failure rate — watch for rollback!</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>.updates(query)</code> tells the server which queries to refresh with the mutation</li>
		<li><code>.withOverride()</code> provides optimistic updates for instant UI feedback</li>
		<li>Rollback is automatic when the server request fails</li>
		<li>Client-driven refresh gives the component control over which data is refreshed</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.add-form { display: flex; gap: var(--space-sm); }
	.add-input {
		flex: 1; padding: var(--space-sm); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); font-size: var(--text-base);
		background: var(--color-surface-2); color: var(--color-text);
	}
	.add-btn {
		padding: var(--space-sm) var(--space-md); border: none;
		border-radius: var(--radius-md); font-weight: 600;
		background: var(--color-text); color: var(--color-surface-1); cursor: pointer;
	}
	.item-list { display: flex; flex-direction: column; gap: var(--space-xs); }
	.item {
		display: flex; align-items: center; justify-content: space-between;
		padding: var(--space-sm); background: var(--color-surface-2);
		border-radius: var(--radius-md); transition: background 0.3s;
	}
	.item.pending { background: oklch(80% 0.08 145 / 0.3); }
	.remove-btn {
		padding: var(--space-xs) var(--space-sm); border: 1px solid oklch(60% 0.2 25);
		border-radius: var(--radius-sm); background: none; cursor: pointer;
		color: oklch(60% 0.2 25); font-size: var(--text-sm);
	}
	.empty { margin: 0; text-align: center; color: var(--color-text-muted); padding: var(--space-md); }
	.hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); font-style: italic; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
