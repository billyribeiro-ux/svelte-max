<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const serverFunction = `// src/live/todos.ts — Server module
${"import"} { live, LiveError } from 'svelte-realtime/server';
${"import"} { db } from '$lib/server/db';

// live() wraps a server function for WebSocket RPC
// First argument is always ctx (context)
export const addTodo = live(async (ctx, text: string) => {
  if (!ctx.user) throw new LiveError('UNAUTHORIZED', 'Login required');
  if (!text.trim()) throw new LiveError('VALIDATION', 'Text required');

  const todo = await db.todos.insert({
    userId: ctx.user.id,
    text: text.trim(),
    done: false
  });

  // Publish to subscribers — this triggers live.stream() updates
  ctx.publish('todos', 'created', todo);
  return todo;
});

export const toggleTodo = live(async (ctx, id: string) => {
  const todo = await db.todos.findById(id);
  if (!todo) throw new LiveError('NOT_FOUND', 'Todo not found');

  const updated = await db.todos.update(id, { done: !todo.done });
  ctx.publish('todos', 'updated', updated);
  return updated;
});

export const deleteTodo = live(async (ctx, id: string) => {
  await db.todos.delete(id);
  ctx.publish('todos', 'deleted', { id });
});`;

	const clientUsage = `<!-- src/routes/todos/+page.svelte -->
<script lang="ts">
  ${"import"} { addTodo, toggleTodo, deleteTodo } from '$live/todos';

  let text = $state('');
  let loading = $state(false);
  let error = $state<string | null>(null);

  async function handleAdd() {
    if (!text.trim()) return;
    loading = true;
    error = null;

    try {
      await addTodo(text);
      text = '';
    } catch (e) {
      // LiveError on server → structured error on client
      error = e.message;
    } finally {
      loading = false;
    }
  }
<\/script>

<input bind:value={text} onkeydown={(e) => e.key === 'Enter' && handleAdd()} />
<button onclick={handleAdd} disabled={loading}>
  {loading ? 'Adding...' : 'Add'}
</button>
{#if error}<p class="error">{error}</p>{/if}`;

	const ctxReference = `// ctx (context) object available in every live() function:
//
// ctx.user        — data returned by upgrade() in hooks.ws.ts
// ctx.ws          — raw uWebSocket connection
// ctx.platform    — adapter platform object
// ctx.publish     — (topic, event, data) → broadcast to subscribers
// ctx.cursor      — cursor for paginated streams (loadMore())
// ctx.throttle    — (topic, event, data, ms) → throttled publish
// ctx.debounce    — (topic, event, data, ms) → debounced publish
// ctx.signal      — (userId, event, data) → send to specific user
// ctx.batch       — (messages[]) → send multiple events atomically`;

	const liveErrorCode = `// LiveError provides structured errors over WebSocket
${"import"} { LiveError } from 'svelte-realtime/server';

// Constructor: LiveError(code, message)
throw new LiveError('UNAUTHORIZED', 'Login required');
throw new LiveError('VALIDATION', 'Text cannot be empty');
throw new LiveError('NOT_FOUND', 'Resource does not exist');
throw new LiveError('RATE_LIMITED', 'Too many requests');

// On the client, catch errors normally:
try {
  await addTodo(text);
} catch (e) {
  console.log(e.code);    // 'VALIDATION'
  console.log(e.message); // 'Text cannot be empty'
}`;

	const fullCode =
		"<script lang=\"ts\">\n  // RPC basics\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.2 — RPC Basics</h1></section>";
</script>

<section class="page">
	<h1>RT.2 — RPC Basics</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>live()</code> turns any server function into a WebSocket RPC
		endpoint. You write the function in <code>src/live/</code>, export it, and import it on the client
		via <code>$live/</code>. The Vite plugin generates a client stub that serializes arguments, sends
		them over WebSocket, and returns the result as a promise. Errors thrown with <code>LiveError</code>
		are structured — the client receives both a machine-readable code and a human-readable message.
	</p>

	<div class="build">
		<h3 class="section-title">Server functions</h3>
		<pre class="code-block"><code>{serverFunction}</code></pre>

		<h3 class="section-title">Client usage</h3>
		<pre class="code-block"><code>{clientUsage}</code></pre>

		<h3 class="section-title">ctx reference</h3>
		<pre class="code-block"><code>{ctxReference}</code></pre>

		<h3 class="section-title">Structured errors</h3>
		<pre class="code-block"><code>{liveErrorCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Call a <code>live()</code> function without the <code>live()</code> wrapper.</strong> Exporting a plain async function from <code>src/live/</code> is silently ignored by the Vite plugin. The client import resolves to <code>undefined</code>. Only <code>live()</code>-wrapped functions generate client stubs.</li>
		<li><strong>Throw a plain <code>Error</code> instead of <code>LiveError</code>.</strong> The client receives a generic error with no structured code. Use <code>LiveError</code> for all expected errors (validation, auth, not-found) and let unexpected errors propagate as generic failures.</li>
		<li><strong>Call <code>ctx.publish()</code> with a topic that no one subscribes to.</strong> The publish succeeds silently — there's no error. Events are fire-and-forget. If no client has a <code>live.stream()</code> subscribed to that topic, the event is simply dropped.</li>
		<li><strong>Pass a non-serializable value (e.g., a function) as an RPC argument.</strong> WebSocket messages are JSON-serialized. Functions, <code>undefined</code> values, and circular references throw a serialization error on the client before the message is even sent.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>live()</code> is the RPC primitive. It maps server functions to WebSocket-callable endpoints with automatic serialization, routing, and error handling. The <code>ctx</code> object provides the authenticated user, publish capabilities, and connection metadata. <code>LiveError</code> creates structured errors that survive the WebSocket boundary — the client receives both the error code (for conditional logic) and the message (for display).</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-3-streams-merge">RT.3 — Streams & Merge Strategies</a></p>
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
