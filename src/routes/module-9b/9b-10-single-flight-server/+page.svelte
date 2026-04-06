<script lang="ts">
	const problemCode = `// Without single-flight: 2 round trips
// 1. POST /api/add-todo  → mutation
// 2. GET  /api/todos     → re-fetch fresh list
// Total: 2 HTTP requests, 2x latency`;

	const solutionCode = `// todos.remote.ts
import { command, query } from '$app/server';

export const getTodos = query(async () => {
  return await db.todos.findAll();
});

export const addTodo = command(async (title: string) => {
  await db.todos.create({ title, done: false });

  // Refresh the query ON THE SERVER — fresh data
  // piggybacks on the mutation response
  getTodos.refresh();
});

// Result: 1 request → mutation + fresh data → 1 response`;

	const formRefreshCode = `// Also works with form():
import { form, query } from '$app/server';

export const getPosts = query(async () => {
  return await db.posts.findAll();
});

export const createPost = form(PostSchema, async ({ data }) => {
  await db.posts.create(data);

  // Refresh in the form handler
  getPosts.refresh();
  // Fresh posts arrive with the form response!
});`;
</script>

<section class="page">
	<h1>9B.10 — Single-Flight Mutations (Server)</h1>
	<p class="concept">
		<strong>Concept.</strong> Normally, a mutation followed by a data refresh requires two
		round trips. With single-flight mutations, you call <code>.refresh()</code> on a query
		inside a command or form handler. The fresh data piggybacks on the mutation response —
		one request, one response.
	</p>

	<div class="build">
		<h2>The two-request problem</h2>
		<pre><code>{problemCode}</code></pre>

		<h2>Server-driven single-flight</h2>
		<pre><code>{solutionCode}</code></pre>

		<h2>Works with forms too</h2>
		<pre><code>{formRefreshCode}</code></pre>

		<h2>How it works</h2>
		<div class="diagram">
			<div class="diagram-row">
				<div class="diagram-box client">Client</div>
				<div class="diagram-arrow">POST addTodo("Buy milk")</div>
				<div class="diagram-box server">Server</div>
			</div>
			<div class="diagram-step">
				<span class="step-num">1</span>
				<span>Server executes <code>addTodo</code> mutation</span>
			</div>
			<div class="diagram-step">
				<span class="step-num">2</span>
				<span>Server sees <code>getTodos.refresh()</code> and re-runs that query</span>
			</div>
			<div class="diagram-step">
				<span class="step-num">3</span>
				<span>Both results bundled into one response</span>
			</div>
			<div class="diagram-row">
				<div class="diagram-box server">Server</div>
				<div class="diagram-arrow reverse">{'{ mutation: ok, todos: [...] }'}</div>
				<div class="diagram-box client">Client</div>
			</div>
			<div class="diagram-step highlight">
				<span class="step-num">!</span>
				<span><strong>1 round trip</strong> instead of 2. No stale data flicker.</span>
			</div>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Single-flight mutations eliminate the second round trip for data refresh</li>
		<li>Call <code>.refresh()</code> on queries inside command or form handlers</li>
		<li>Fresh data piggybacks on the mutation response automatically</li>
		<li>This is server-driven — the server decides which queries to refresh</li>
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
	.diagram { display: flex; flex-direction: column; gap: var(--space-sm); padding: var(--space-md); background: var(--color-surface-2); border-radius: var(--radius-md); }
	.diagram-row { display: flex; align-items: center; gap: var(--space-sm); justify-content: center; }
	.diagram-box {
		padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm);
		font-weight: 600; font-size: var(--text-sm); min-width: 4rem; text-align: center;
	}
	.diagram-box.client { background: oklch(60% 0.12 250); color: white; }
	.diagram-box.server { background: oklch(60% 0.12 145); color: white; }
	.diagram-arrow {
		font-family: var(--font-mono); font-size: var(--text-sm);
		color: var(--color-text-muted); text-align: center; flex: 1;
	}
	.diagram-arrow.reverse { direction: rtl; }
	.diagram-step { display: flex; align-items: center; gap: var(--space-sm); font-size: var(--text-sm); }
	.step-num {
		display: inline-flex; align-items: center; justify-content: center;
		width: 1.5rem; height: 1.5rem; border-radius: 50%;
		background: var(--color-border); font-weight: 700; font-size: var(--text-sm);
		flex-shrink: 0;
	}
	.diagram-step.highlight { background: oklch(80% 0.08 145 / 0.2); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-sm); }
	.diagram-step.highlight .step-num { background: oklch(60% 0.15 145); color: white; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
