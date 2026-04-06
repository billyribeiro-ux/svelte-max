<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const problemCode = `// Without single-flight: 2 round trips\n" +
		"// 1. POST /api/add-todo  → mutation\n" +
		"// 2. GET  /api/todos     → re-fetch fresh list\n" +
		"// Total: 2 HTTP requests, 2x latency`;\n" +
		"\n" +
		"	const solutionCode = `// todos.remote.ts\n" +
		"import { command, query } from '$app/server';\n" +
		"\n" +
		"export const getTodos = query(async () =\u003e {\n" +
		"  return await db.todos.findAll();\n" +
		"});\n" +
		"\n" +
		"export const addTodo = command(async (title: string) =\u003e {\n" +
		"  await db.todos.create({ title, done: false });\n" +
		"\n" +
		"  // Refresh the query ON THE SERVER — fresh data\n" +
		"  // piggybacks on the mutation response\n" +
		"  getTodos.refresh();\n" +
		"});\n" +
		"\n" +
		"// Result: 1 request → mutation + fresh data → 1 response`;\n" +
		"\n" +
		"	const formRefreshCode = `// Also works with form():\n" +
		"import { form, query } from '$app/server';\n" +
		"\n" +
		"export const getPosts = query(async () =\u003e {\n" +
		"  return await db.posts.findAll();\n" +
		"});\n" +
		"\n" +
		"export const createPost = form(PostSchema, async ({ data }) =\u003e {\n" +
		"  await db.posts.create(data);\n" +
		"\n" +
		"  // Refresh in the form handler\n" +
		"  getPosts.refresh();\n" +
		"  // Fresh posts arrive with the form response!\n" +
		"});`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.10 — Single-Flight Mutations (Server)\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Normally, a mutation followed by a data refresh requires two\n" +
		"		round trips. With single-flight mutations, you call \u003ccode\u003e.refresh()\u003c/code\u003e on a query\n" +
		"		inside a command or form handler. The fresh data piggybacks on the mutation response —\n" +
		"		one request, one response.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eThe two-request problem\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{problemCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eServer-driven single-flight\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{solutionCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eWorks with forms too\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{formRefreshCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eHow it works\u003c/h2\u003e\n" +
		"		\u003cdiv class=\"diagram\"\u003e\n" +
		"			\u003cdiv class=\"diagram-row\"\u003e\n" +
		"				\u003cdiv class=\"diagram-box client\"\u003eClient\u003c/div\u003e\n" +
		"				\u003cdiv class=\"diagram-arrow\"\u003ePOST addTodo(\"Buy milk\")\u003c/div\u003e\n" +
		"				\u003cdiv class=\"diagram-box server\"\u003eServer\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"diagram-step\"\u003e\n" +
		"				\u003cspan class=\"step-num\"\u003e1\u003c/span\u003e\n" +
		"				\u003cspan\u003eServer executes \u003ccode\u003eaddTodo\u003c/code\u003e mutation\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"diagram-step\"\u003e\n" +
		"				\u003cspan class=\"step-num\"\u003e2\u003c/span\u003e\n" +
		"				\u003cspan\u003eServer sees \u003ccode\u003egetTodos.refresh()\u003c/code\u003e and re-runs that query\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"diagram-step\"\u003e\n" +
		"				\u003cspan class=\"step-num\"\u003e3\u003c/span\u003e\n" +
		"				\u003cspan\u003eBoth results bundled into one response\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"diagram-row\"\u003e\n" +
		"				\u003cdiv class=\"diagram-box server\"\u003eServer\u003c/div\u003e\n" +
		"				\u003cdiv class=\"diagram-arrow reverse\"\u003e{'{ mutation: ok, todos: [...] }'}\u003c/div\u003e\n" +
		"				\u003cdiv class=\"diagram-box client\"\u003eClient\u003c/div\u003e\n" +
		"			\u003c/div\u003e\n" +
		"			\u003cdiv class=\"diagram-step highlight\"\u003e\n" +
		"				\u003cspan class=\"step-num\"\u003e!\u003c/span\u003e\n" +
		"				\u003cspan\u003e\u003cstrong\u003e1 round trip\u003c/strong\u003e instead of 2. No stale data flicker.\u003c/span\u003e\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eSingle-flight mutations eliminate the second round trip for data refresh\u003c/li\u003e\n" +
		"		\u003cli\u003eCall \u003ccode\u003e.refresh()\u003c/code\u003e on queries inside command or form handlers\u003c/li\u003e\n" +
		"		\u003cli\u003eFresh data piggybacks on the mutation response automatically\u003c/li\u003e\n" +
		"		\u003cli\u003eThis is server-driven — the server decides which queries to refresh\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>getTodos.refresh()</code> call from the command handler.</strong> After adding a todo, the list does not update until you manually refresh or navigate away and back. The mutation succeeds but the client never gets fresh data because no refresh was requested.</li>
		<li><strong>Call <code>.refresh()</code> on a query that is not active on the current page.</strong> The server runs the query anyway, but the client ignores the result because no component is consuming that query. The round trip is wasted.</li>
		<li><strong>Add a second <code>.refresh()</code> for a different query in the same handler.</strong> Both queries re-run and both results piggyback on the same response. This proves that a single mutation can refresh multiple queries in one round trip.</li>
		<li><strong>Make the refreshed query intentionally slow (add a delay).</strong> The entire mutation response is delayed because the server waits for all refreshed queries to resolve before sending the response. Fast mutations with slow refresh queries can hurt perceived performance.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The typical mutation flow requires two round trips: one to perform the mutation and another to fetch fresh data. Single-flight mutations collapse this into one round trip by calling <code>.refresh()</code> on a query inside a command or form handler. The server executes the mutation, re-runs the specified queries, and bundles everything into a single response.</p>
	<p class="prose">This is a server-driven pattern. The server decides which queries to refresh based on the <code>.refresh()</code> calls in the handler. The client receives both the mutation result and the fresh query data in one response, eliminating stale data flicker and cutting latency in half.</p>
	<p class="prose">The tradeoff is that the response time equals the mutation time plus the refresh time. If the refreshed query is slow, the entire response is delayed. For time-sensitive mutations, consider using client-driven refresh with optimistic UI instead, which is covered in the next lesson.</p>
	<p class="next">Next up: client-driven single-flight mutations with optimistic updates.</p>
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
