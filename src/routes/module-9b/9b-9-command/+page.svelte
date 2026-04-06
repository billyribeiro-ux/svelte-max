<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const commandCode = `// todos.remote.ts\n" +
		"import { command } from '$app/server';\n" +
		"\n" +
		"// command() is for mutations with side effects\n" +
		"export const deleteTodo = command(async (id: string) =\u003e {\n" +
		"  await db.todos.delete(id);\n" +
		"  return { deleted: id };\n" +
		"});\n" +
		"\n" +
		"export const toggleTodo = command(async (id: string) =\u003e {\n" +
		"  const todo = await db.todos.findById(id);\n" +
		"  await db.todos.update(id, { done: !todo.done });\n" +
		"  return { id, done: !todo.done };\n" +
		"});`;\n" +
		"\n" +
		"	const usageCommandCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { deleteTodo, toggleTodo } from './todos.remote';\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"{#each todos as todo}\n" +
		"  \u003cdiv\u003e\n" +
		"    \u003cspan\u003e{todo.title}\u003c/span\u003e\n" +
		"    \u003c!-- command() cannot be called during render — only in handlers --\u003e\n" +
		"    \u003cbutton onclick={() =\u003e toggleTodo(todo.id)}\u003eToggle\u003c/button\u003e\n" +
		"    \u003cbutton onclick={() =\u003e deleteTodo(todo.id)}\u003eDelete\u003c/button\u003e\n" +
		"  \u003c/div\u003e\n" +
		"{/each}`;\n" +
		"\n" +
		"	const diffCode = `// query vs command:\n" +
		"// query  → READ  → can be called during render → cached\n" +
		"// command → WRITE → only in event handlers   → never cached\n" +
		"\n" +
		"// query runs automatically when args change\n" +
		"const products = getProducts(); // OK during render\n" +
		"\n" +
		"// command must be triggered explicitly\n" +
		"deleteTodo('123');  // only in onclick, onsubmit, etc.`;\n" +
		"\n" +
		"	type TodoItem = {\n" +
		"		id: string;\n" +
		"		title: string;\n" +
		"		done: boolean;\n" +
		"	};\n" +
		"\n" +
		"	let todos = $state\u003cTodoItem[]\u003e([\n" +
		"		{ id: '1', title: 'Learn remote functions', done: true },\n" +
		"		{ id: '2', title: 'Build a dashboard', done: false },\n" +
		"		{ id: '3', title: 'Deploy to production', done: false },\n" +
		"		{ id: '4', title: 'Write documentation', done: false },\n" +
		"	]);\n" +
		"\n" +
		"	let deletedTodo = $state\u003c{ item: TodoItem; index: number } | null\u003e(null);\n" +
		"\n" +
		"	function handleDelete(id: string) {\n" +
		"		const index = todos.findIndex((t) =\u003e t.id === id);\n" +
		"		if (index === -1) return;\n" +
		"		const item = todos[index];\n" +
		"		deletedTodo = { item, index };\n" +
		"		todos = todos.filter((t) =\u003e t.id !== id);\n" +
		"\n" +
		"		setTimeout(() =\u003e {\n" +
		"			deletedTodo = null;\n" +
		"		}, 3000);\n" +
		"	}\n" +
		"\n" +
		"	function handleUndo() {\n" +
		"		if (!deletedTodo) return;\n" +
		"		const { item, index } = deletedTodo;\n" +
		"		todos = [...todos.slice(0, index), item, ...todos.slice(index)];\n" +
		"		deletedTodo = null;\n" +
		"	}\n" +
		"\n" +
		"	function handleToggle(id: string) {\n" +
		"		todos = todos.map((t) =\u003e (t.id === id ? { ...t, done: !t.done } : t));\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.9 — command() Mutations\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003ecommand\u003c/code\u003e from \u003ccode\u003e$app/server\u003c/code\u003e defines server\n" +
		"		operations with side effects. Unlike \u003ccode\u003equery\u003c/code\u003e, commands cannot be called during\n" +
		"		render — only in event handlers. They are never cached.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eDefining commands\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{commandCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eUsing commands in components\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{usageCommandCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003equery vs command\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{diffCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated optimistic delete\u003c/h2\u003e\n" +
		"		\u003cp\u003eClick delete to optimistically remove an item. An undo toast appears for 3 seconds:\u003c/p\u003e\n" +
		"\n" +
		"		{#if deletedTodo}\n" +
		"			\u003cdiv class=\"toast\"\u003e\n" +
		"				Deleted \"{deletedTodo.item.title}\"\n" +
		"				\u003cbutton class=\"undo-btn\" onclick={handleUndo}\u003eUndo\u003c/button\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		{/if}\n" +
		"\n" +
		"		\u003cdiv class=\"todo-list\"\u003e\n" +
		"			{#each todos as todo}\n" +
		"				\u003cdiv class=\"todo-item\" class:done={todo.done}\u003e\n" +
		"					\u003cbutton class=\"toggle-btn\" onclick={() =\u003e handleToggle(todo.id)}\u003e\n" +
		"						{todo.done ? '[x]' : '[ ]'}\n" +
		"					\u003c/button\u003e\n" +
		"					\u003cspan class=\"todo-title\"\u003e{todo.title}\u003c/span\u003e\n" +
		"					\u003cbutton class=\"delete-btn\" onclick={() =\u003e handleDelete(todo.id)}\u003eDelete\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cp class=\"empty\"\u003eAll todos deleted!\u003c/p\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003ecommand()\u003c/code\u003e defines server-side mutations in \u003ccode\u003e.remote.ts\u003c/code\u003e files\u003c/li\u003e\n" +
		"		\u003cli\u003eCommands can only be called in event handlers, never during render\u003c/li\u003e\n" +
		"		\u003cli\u003eCommands are never cached, unlike queries\u003c/li\u003e\n" +
		"		\u003cli\u003eOptimistic updates can be combined with commands for instant UI feedback\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Call a <code>command()</code> function at the top level of a component, outside any event handler.</strong> SvelteKit throws an error because commands are explicitly forbidden during render. They can only be invoked in response to user events like <code>onclick</code> or <code>onsubmit</code>.</li>
		<li><strong>Replace <code>command()</code> with <code>query()</code> for a delete operation.</strong> The delete runs during render, which means navigating to the page deletes data without user intent. This is exactly why mutations must use <code>command</code>, not <code>query</code>.</li>
		<li><strong>Call the same command twice rapidly without waiting for the first to resolve.</strong> Both requests fire independently because commands are not deduplicated or cached. You may get race conditions if the server does not handle concurrent mutations idempotently.</li>
		<li><strong>Remove the optimistic UI update and wait for the server response before updating the list.</strong> The delete feels sluggish because the user sees no change for several hundred milliseconds while the round trip completes. Optimistic updates mask this latency.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>command()</code> function from <code>$app/server</code> defines server-side operations that have side effects: deleting records, toggling state, sending emails, or any mutation that changes data. Unlike <code>query</code>, commands can only be called inside event handlers like <code>onclick</code> or <code>onsubmit</code>, and they are never cached.</p>
	<p class="prose">The restriction against calling commands during render is a safety feature. Queries are safe to run on every render because they only read data. Commands mutate data, so running them during render would cause unintended side effects every time the component re-renders.</p>
	<p class="prose">For the best user experience, pair commands with optimistic UI updates. Immediately reflect the expected change in the UI, then reconcile with the server response when it arrives. If the server rejects the mutation, roll back the optimistic change. This pattern makes interactions feel instant even over slow networks.</p>
	<p class="next">Next up: single-flight mutations that bundle data refresh with the mutation response.</p>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
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


	/* ── Having issues section ── */
	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
			font-size: var(--text-base);
			color: var(--color-warning);
			background: var(--color-surface-1);
			cursor: pointer;
		}

		& > p {
			padding: var(--space-sm) var(--space-lg);
			margin: 0;
			color: var(--color-text-muted);
			font-size: var(--text-sm);
		}
	}

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
