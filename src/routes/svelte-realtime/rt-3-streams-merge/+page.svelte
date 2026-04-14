<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const crudMerge = `// src/live/todos.ts — CRUD merge strategy (default)
${"import"} { live } from 'svelte-realtime/server';
${"import"} { db } from '$lib/server/db';

// live.stream() creates a reactive subscription
// merge: 'crud' handles created/updated/deleted events
export const todos = live.stream('todos', async (ctx) => {
  return db.todos.all();
}, {
  merge: 'crud',  // created → append, updated → replace by key, deleted → remove by key
  key: 'id',      // which field identifies each item
  prepend: true,  // new items go to the top (default: false = append)
  max: 100        // cap buffer at 100 items, drop oldest
});`;

	const clientStream = `<!-- Using a stream in a component -->
<script>
  ${"import"} { todos, addTodo } from '$live/todos';
  // $todos is a Svelte store:
  //   undefined  → loading (initial fetch in progress)
  //   { error }  → failed to load
  //   array      → data loaded, live updates merging
<\/script>

{#if $todos === undefined}
  <p>Loading...</p>
{:else if $todos?.error}
  <p>Error: {$todos.error.message}</p>
{:else}
  {#each $todos as todo (todo.id)}
    <p>{todo.text}</p>
  {/each}
{/if}`;

	const mergeStrategies = `// Five built-in merge strategies:

// 'crud' (default) — array with CRUD operations
//   Events: created (add), updated (replace by key), deleted (remove by key)
//   Use for: todo lists, chat messages, any collection

// 'latest' — ring buffer of last N events
//   Events: any event name → appended to buffer, oldest dropped
//   Use for: activity feeds, server logs, notifications

// 'set' — replaces the entire value
//   Events: any event name → whole store replaced
//   Use for: counters, status indicators, dashboard stats

// 'presence' — tracks connected users
//   Events: join (add/update by key), leave (remove by key)
//   Use for: online users, "who's viewing this page"

// 'cursor' — tracks cursor/pointer positions
//   Events: update (add/update by key), remove (remove by key)
//   Use for: collaborative editing, live cursors`;

	const presenceCode = `// Presence tracking — who's online
export const presence = live.stream(
  (ctx, roomId) => 'presence:' + roomId,
  async (ctx, roomId) => [],
  { merge: 'presence' }
);

export const join = live(async (ctx, roomId) => {
  ctx.publish('presence:' + roomId, 'join', {
    key: ctx.user.id,
    name: ctx.user.name,
    avatar: ctx.user.avatar
  });
});

export const leave = live(async (ctx, roomId) => {
  ctx.publish('presence:' + roomId, 'leave', {
    key: ctx.user.id
  });
});`;

	const fullCode =
		"<script lang=\"ts\">\n  // Streams & merge strategies\n<\/script>\n\n" +
		"<section class=\"page\"><h1>RT.3 — Streams & Merge Strategies</h1></section>";
</script>

<section class="page">
	<h1>RT.3 — Streams & Merge Strategies</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>live.stream()</code> creates a Svelte store that starts with initial
		data from the server and then receives live updates via pub/sub. The <code>merge</code> strategy
		determines how incoming events are applied to the store: <code>crud</code> for collections,
		<code>latest</code> for ring buffers, <code>set</code> for scalars, <code>presence</code> for
		online users, and <code>cursor</code> for live pointers. Each strategy defines a set of event
		names and how they mutate the store's value.
	</p>

	<div class="build">
		<h3 class="section-title">CRUD stream (default)</h3>
		<pre class="code-block"><code>{crudMerge}</code></pre>

		<h3 class="section-title">Client usage</h3>
		<pre class="code-block"><code>{clientStream}</code></pre>

		<h3 class="section-title">All merge strategies</h3>
		<pre class="code-block"><code>{mergeStrategies}</code></pre>

		<h3 class="section-title">Presence tracking</h3>
		<pre class="code-block"><code>{presenceCode}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Omit the <code>key</code> option in a CRUD stream.</strong> Default key is <code>'id'</code>. If your objects use a different identifier (e.g., <code>_id</code>), updates and deletes won't match any existing item — you get duplicate entries instead of in-place updates.</li>
		<li><strong>Use <code>merge: 'set'</code> for a collection.</strong> Every event replaces the entire store value. If two users add items simultaneously, the second event overwrites the first user's addition. <code>set</code> is for atomic values (counters, status), not collections.</li>
		<li><strong>Publish a <code>'created'</code> event to a <code>'latest'</code> stream.</strong> The <code>latest</code> strategy doesn't distinguish event names — all events are appended to the ring buffer. The event name is ignored. This is by design for logs and feeds.</li>
		<li><strong>Set <code>max: 0</code> on a <code>crud</code> stream.</strong> Zero means unlimited. The buffer grows without bound. For a high-traffic stream, this leads to memory pressure. Always set a reasonable <code>max</code> for production streams.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Merge strategies are the core abstraction of <code>live.stream()</code>. They define the contract between publisher and subscriber: which event names are valid, how they mutate the store, and what the store shape looks like. <code>crud</code> maintains a keyed array (add/update/remove), <code>presence</code> tracks a set of connected entities (join/leave), and <code>set</code> replaces atomically. Choosing the right strategy is the first design decision for any realtime feature.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-4-optimistic-offline">RT.4 — Optimistic Updates & Offline</a></p>
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
