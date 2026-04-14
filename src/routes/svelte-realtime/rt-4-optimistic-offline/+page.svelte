<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const optimisticCode = `<!-- Optimistic updates: update UI before server confirms -->
<script>
  ${"import"} { todos, addTodo } from '$live/todos';

  async function handleAdd(text) {
    // 1. Optimistically add to the store immediately
    const tempId = crypto.randomUUID();
    $todos = [...$todos, { id: tempId, text, done: false, pending: true }];

    try {
      // 2. Send to server
      const real = await addTodo(text);
      // 3. Replace temp item with server response
      $todos = $todos.map(t => t.id === tempId ? real : t);
    } catch (e) {
      // 4. Rollback on failure
      $todos = $todos.filter(t => t.id !== tempId);
    }
  }
<\/script>

{#each $todos as todo (todo.id)}
  <p class:pending={todo.pending}>{todo.text}</p>
{/each}`;

	const offlineQueue = `// Offline queue: buffer RPC calls when disconnected
// svelte-realtime handles this automatically:
//
// 1. Client detects disconnection (WebSocket close event)
// 2. Subsequent live() calls are queued (up to 1000 messages)
// 3. When connection restores:
//    a. Streams refetch initial data + resubscribe
//    b. Queued RPC calls are replayed in order
//    c. Each call either succeeds or returns an error
//
// The store keeps showing stale data during disconnect —
// it does NOT reset to undefined.
//
// Queue limits:
// - Max 1000 queued messages (configurable)
// - Messages exceeding the limit are dropped (oldest first)
// - Queue is cleared on explicit disconnect`;

	const undoRedo = `// Undo/redo for live() calls
${"import"} { undoable } from 'svelte-realtime/client';

// Wrap any RPC pair as undoable
const { execute, undo, redo, canUndo, canRedo } = undoable({
  async do(text) {
    return addTodo(text);
  },
  async undo(result) {
    return deleteTodo(result.id);
  }
});

// In your component:
// await execute('Buy groceries');  → calls addTodo
// await undo();                    → calls deleteTodo
// await redo();                    → calls addTodo again`;

	const connectionHooks = `// Connection lifecycle hooks
${"import"} { onConnect, onDisconnect, onReconnect } from 'svelte-realtime/client';

onConnect(() => {
  console.log('WebSocket connected');
});

onDisconnect((code, reason) => {
  console.log('Disconnected:', code, reason);
  // Show offline indicator
});

onReconnect((attempt) => {
  console.log('Reconnected after', attempt, 'attempts');
  // Hide offline indicator, refresh critical data
});

// Cross-origin usage (Tauri, Capacitor, different domain):
${"import"} { connect } from 'svelte-realtime/client';
connect('wss://api.example.com/ws');`;

	const deduplication = `// Request deduplication: identical concurrent calls collapse
// If two components call addTodo('Buy milk') simultaneously,
// only one WebSocket message is sent.
// Both callers receive the same result promise.
//
// Deduplication key = function name + serialized arguments
// Cache duration = until the response arrives
//
// This prevents double-submit on rapid clicks
// and duplicate requests from multiple components.`;

	const fullCode =
		"<script lang=\"ts\">\n  // Optimistic updates & offline\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.4 — Optimistic Updates & Offline</h1></section>";
</script>

<section class="page">
	<h1>RT.4 — Optimistic Updates & Offline</h1>
	<p class="concept">
		<strong>Concept.</strong> Optimistic updates make the UI feel instant by applying changes locally
		before the server confirms. The offline queue ensures RPC calls aren't lost during disconnections —
		they're buffered and replayed when the WebSocket reconnects. Combined with undo/redo support and
		request deduplication, these features make svelte-realtime viable for production applications
		with unreliable networks.
	</p>

	<div class="build">
		<h3 class="section-title">Optimistic updates</h3>
		<pre class="code-block"><code>{optimisticCode}</code></pre>

		<h3 class="section-title">Offline queue</h3>
		<pre class="code-block"><code>{offlineQueue}</code></pre>

		<h3 class="section-title">Undo / redo</h3>
		<pre class="code-block"><code>{undoRedo}</code></pre>

		<h3 class="section-title">Connection hooks</h3>
		<pre class="code-block"><code>{connectionHooks}</code></pre>

		<h3 class="section-title">Request deduplication</h3>
		<pre class="code-block"><code>{deduplication}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Skip the rollback in optimistic updates.</strong> If the server rejects the mutation, the UI shows an item that doesn't exist on the server. Other clients don't see it. On next reconnect/refetch, it disappears — a confusing ghost item. Always rollback on error.</li>
		<li><strong>Queue more than 1000 messages while offline.</strong> The oldest messages are dropped. When reconnecting, some actions are lost. For long offline periods, persist critical actions to <code>localStorage</code> and replay manually.</li>
		<li><strong>Use <code>undoable</code> without a matching <code>undo</code> handler.</strong> The <code>undo()</code> call resolves to <code>undefined</code> — the action is "undone" in the undo stack but nothing happens on the server. The UI and server state diverge.</li>
		<li><strong>Call <code>connect()</code> with a non-WebSocket URL.</strong> The connection attempt fails immediately. The reconnect loop starts, retrying indefinitely. Always validate the URL scheme (<code>ws://</code> or <code>wss://</code>) before calling <code>connect()</code>.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Optimistic updates are a UX pattern, not a library feature — svelte-realtime gives you the tools (writable stores, structured errors) but the optimistic/rollback logic is yours. The offline queue, however, is automatic: disconnections buffer up to 1000 messages and replay them on reconnect. Streams refetch initial data but don't reset to <code>undefined</code>, preserving stale-while-revalidate UX.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-5-auth-channels">RT.5 — Auth & Channels</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
