<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const clientRefreshCode = `// Client-requested refresh\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { addTodo } from './todos.remote';\n" +
		"  import { getTodos } from './todos.remote';\n" +
		"\n" +
		"  async function handleAdd(title: string) {\n" +
		"    // .updates() tells the server which queries to refresh\n" +
		"    await addTodo.submit(title).updates(getTodos);\n" +
		"    // getTodos is now fresh — no second request!\n" +
		"  }\n" +
		"\\u003c/script\\u003e`;\n" +
		"\n" +
		"	const optimisticCode = `// Optimistic UI with .withOverride()\n" +
		"\\u003cscript lang=\"ts\"\\u003e\n" +
		"  import { addTodo } from './todos.remote';\n" +
		"  import { getTodos } from './todos.remote';\n" +
		"\n" +
		"  const todos = getTodos();\n" +
		"\n" +
		"  async function handleAdd(title: string) {\n" +
		"    const optimistic = { id: crypto.randomUUID(), title, done: false };\n" +
		"\n" +
		"    await addTodo\n" +
		"      .submit(title)\n" +
		"      .updates(getTodos)\n" +
		"      .withOverride(getTodos, (current) =\u003e [\n" +
		"        ...current,\n" +
		"        optimistic  // Show immediately\n" +
		"      ]);\n" +
		"    // When server responds, real data replaces the optimistic entry\n" +
		"  }\n" +
		"\\u003c/script\\u003e`;\n" +
		"\n" +
		"	const rollbackNote = `// If the server request fails:\n" +
		"// 1. The optimistic override is automatically rolled back\n" +
		"// 2. The UI reverts to the last known good state\n" +
		"// 3. No manual error handling needed for the rollback`;\n" +
		"\n" +
		"	type Item = { id: string; text: string };\n" +
		"\n" +
		"	let items = $state\u003cItem[]\u003e([\n" +
		"		{ id: '1', text: 'Existing item A' },\n" +
		"		{ id: '2', text: 'Existing item B' },\n" +
		"	]);\n" +
		"	let newText = $state('');\n" +
		"	let pendingId = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"	function handleAdd() {\n" +
		"		if (!newText.trim()) return;\n" +
		"		const id = crypto.randomUUID();\n" +
		"		const text = newText.trim();\n" +
		"		pendingId = id;\n" +
		"		items = [...items, { id, text }];\n" +
		"		newText = '';\n" +
		"\n" +
		"		setTimeout(() =\u003e {\n" +
		"			pendingId = null;\n" +
		"		}, 800);\n" +
		"	}\n" +
		"\n" +
		"	function handleRemove(id: string) {\n" +
		"		const removed = items.find((i) =\u003e i.id === id);\n" +
		"		items = items.filter((i) =\u003e i.id !== id);\n" +
		"\n" +
		"		setTimeout(() =\u003e {\n" +
		"			if (removed && Math.random() \u003c 0.3) {\n" +
		"				items = [...items, removed];\n" +
		"			}\n" +
		"		}, 500);\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.11 — Single-Flight Mutations (Client)\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e The client can request specific query refreshes with\n" +
		"		\u003ccode\u003esubmit().updates(getQuery)\u003c/code\u003e. For instant feedback,\n" +
		"		\u003ccode\u003e.withOverride()\u003c/code\u003e provides optimistic UI that auto-rolls back on failure.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eClient-requested refresh\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{clientRefreshCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eOptimistic UI with override\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{optimisticCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eAutomatic rollback\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{rollbackNote}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated optimistic add\u003c/h2\u003e\n" +
		"		\u003cp\u003eItems appear instantly (optimistic). The brief highlight indicates \"server confirmation\":\u003c/p\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"add-form\"\u003e\n" +
		"			\u003cinput\n" +
		"				type=\"text\"\n" +
		"				bind:value={newText}\n" +
		"				placeholder=\"Add an item...\"\n" +
		"				class=\"add-input\"\n" +
		"				onkeydown={(e) =\u003e { if (e.key === 'Enter') handleAdd(); }}\n" +
		"			/\u003e\n" +
		"			\u003cbutton class=\"add-btn\" onclick={handleAdd}\u003eAdd\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"item-list\"\u003e\n" +
		"			{#each items as item}\n" +
		"				\u003cdiv class=\"item\" class:pending={item.id === pendingId}\u003e\n" +
		"					\u003cspan\u003e{item.text}\u003c/span\u003e\n" +
		"					\u003cbutton class=\"remove-btn\" onclick={() =\u003e handleRemove(item.id)}\u003eRemove\u003c/button\u003e\n" +
		"				\u003c/div\u003e\n" +
		"			{:else}\n" +
		"				\u003cp class=\"empty\"\u003eNo items. Add one above!\u003c/p\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cp class=\"hint\"\u003eRemove has a 30% simulated failure rate — watch for rollback!\u003c/p\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e.updates(query)\u003c/code\u003e tells the server which queries to refresh with the mutation\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e.withOverride()\u003c/code\u003e provides optimistic updates for instant UI feedback\u003c/li\u003e\n" +
		"		\u003cli\u003eRollback is automatic when the server request fails\u003c/li\u003e\n" +
		"		\u003cli\u003eClient-driven refresh gives the component control over which data is refreshed\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove <code>.updates(getTodos)</code> from the submit chain.</strong> The mutation succeeds but the todo list does not refresh because the client never told the server which queries to re-run. You get stale data until you manually reload.</li>
		<li><strong>Remove <code>.withOverride()</code> but keep <code>.updates()</code>.</strong> The list updates correctly after the server responds, but there is a visible delay. The user clicks Add and nothing happens for hundreds of milliseconds until the round trip completes.</li>
		<li><strong>Make the optimistic override return a different shape than the real server data.</strong> When the server response arrives and replaces the override, the UI jumps because the shape mismatch causes a re-render with a different layout. Optimistic data must match the real data's structure.</li>
		<li><strong>Force the server to reject the mutation and watch the rollback.</strong> The optimistic item appears briefly, then disappears when the server error triggers an automatic rollback. No manual error handling code is needed for the rollback itself.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Client-driven single-flight mutations use <code>.updates(query)</code> to tell the server which queries to refresh alongside the mutation, and <code>.withOverride()</code> to show optimistic data immediately. The UI updates instantly with the override, then reconciles with the real server data when the response arrives.</p>
	<p class="prose">If the server request fails, the optimistic override is automatically rolled back to the last known good state. There is no manual rollback code to write. This makes optimistic updates safe to use without worrying about leaving the UI in an inconsistent state after errors.</p>
	<p class="prose">The difference from server-driven refresh is control. With client-driven refresh, the component decides which queries to refresh, not the server handler. This is more flexible because different components consuming the same command can request different query refreshes based on their local needs.</p>
	<p class="next">Next up: async SSR with <code>await</code> directly in component bodies.</p>
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
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }


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
	@media (min-inline-size: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
