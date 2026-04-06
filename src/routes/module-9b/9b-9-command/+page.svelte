<script lang="ts">
	const commandCode = `// todos.remote.ts
import { command } from '$app/server';

// command() is for mutations with side effects
export const deleteTodo = command(async (id: string) => {
  await db.todos.delete(id);
  return { deleted: id };
});

export const toggleTodo = command(async (id: string) => {
  const todo = await db.todos.findById(id);
  await db.todos.update(id, { done: !todo.done });
  return { id, done: !todo.done };
});`;

	const usageCommandCode = `\u003cscript lang="ts"\u003e
  import { deleteTodo, toggleTodo } from './todos.remote';
\u003c/script\u003e

{#each todos as todo}
  <div>
    <span>{todo.title}</span>
    <!-- command() cannot be called during render — only in handlers -->
    <button onclick={() => toggleTodo(todo.id)}>Toggle</button>
    <button onclick={() => deleteTodo(todo.id)}>Delete</button>
  </div>
{/each}`;

	const diffCode = `// query vs command:
// query  → READ  → can be called during render → cached
// command → WRITE → only in event handlers   → never cached

// query runs automatically when args change
const products = getProducts(); // OK during render

// command must be triggered explicitly
deleteTodo('123');  // only in onclick, onsubmit, etc.`;

	type TodoItem = {
		id: string;
		title: string;
		done: boolean;
	};

	let todos = $state<TodoItem[]>([
		{ id: '1', title: 'Learn remote functions', done: true },
		{ id: '2', title: 'Build a dashboard', done: false },
		{ id: '3', title: 'Deploy to production', done: false },
		{ id: '4', title: 'Write documentation', done: false },
	]);

	let deletedTodo = $state<{ item: TodoItem; index: number } | null>(null);

	function handleDelete(id: string) {
		const index = todos.findIndex((t) => t.id === id);
		if (index === -1) return;
		const item = todos[index];
		deletedTodo = { item, index };
		todos = todos.filter((t) => t.id !== id);

		setTimeout(() => {
			deletedTodo = null;
		}, 3000);
	}

	function handleUndo() {
		if (!deletedTodo) return;
		const { item, index } = deletedTodo;
		todos = [...todos.slice(0, index), item, ...todos.slice(index)];
		deletedTodo = null;
	}

	function handleToggle(id: string) {
		todos = todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t));
	}
</script>

<section class="page">
	<h1>9B.9 — command() Mutations</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>command</code> from <code>$app/server</code> defines server
		operations with side effects. Unlike <code>query</code>, commands cannot be called during
		render — only in event handlers. They are never cached.
	</p>

	<div class="build">
		<h2>Defining commands</h2>
		<pre><code>{commandCode}</code></pre>

		<h2>Using commands in components</h2>
		<pre><code>{usageCommandCode}</code></pre>

		<h2>query vs command</h2>
		<pre><code>{diffCode}</code></pre>

		<h2>Simulated optimistic delete</h2>
		<p>Click delete to optimistically remove an item. An undo toast appears for 3 seconds:</p>

		{#if deletedTodo}
			<div class="toast">
				Deleted "{deletedTodo.item.title}"
				<button class="undo-btn" onclick={handleUndo}>Undo</button>
			</div>
		{/if}

		<div class="todo-list">
			{#each todos as todo}
				<div class="todo-item" class:done={todo.done}>
					<button class="toggle-btn" onclick={() => handleToggle(todo.id)}>
						{todo.done ? '[x]' : '[ ]'}
					</button>
					<span class="todo-title">{todo.title}</span>
					<button class="delete-btn" onclick={() => handleDelete(todo.id)}>Delete</button>
				</div>
			{:else}
				<p class="empty">All todos deleted!</p>
			{/each}
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>command()</code> defines server-side mutations in <code>.remote.ts</code> files</li>
		<li>Commands can only be called in event handlers, never during render</li>
		<li>Commands are never cached, unlike queries</li>
		<li>Optimistic updates can be combined with commands for instant UI feedback</li>
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
	.todo-list { display: flex; flex-direction: column; gap: var(--space-xs); }
	.todo-item {
		display: flex; align-items: center; gap: var(--space-sm);
		padding: var(--space-sm); background: var(--color-surface-2);
		border-radius: var(--radius-md);
	}
	.todo-item.done .todo-title { text-decoration: line-through; color: var(--color-text-muted); }
	.todo-title { flex: 1; }
	.toggle-btn {
		background: none; border: none; cursor: pointer;
		font-family: var(--font-mono); font-size: var(--text-base); color: var(--color-text);
	}
	.delete-btn {
		padding: var(--space-xs) var(--space-sm); border: 1px solid oklch(60% 0.2 25);
		border-radius: var(--radius-sm); background: none; cursor: pointer;
		color: oklch(60% 0.2 25); font-size: var(--text-sm);
	}
	.toast {
		display: flex; align-items: center; justify-content: space-between;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2); border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.undo-btn {
		padding: var(--space-xs) var(--space-sm); border: none;
		border-radius: var(--radius-sm); background: var(--color-text);
		color: var(--color-surface-1); cursor: pointer; font-weight: 600;
		font-size: var(--text-sm);
	}
	.empty { margin: 0; text-align: center; color: var(--color-text-muted); padding: var(--space-md); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
