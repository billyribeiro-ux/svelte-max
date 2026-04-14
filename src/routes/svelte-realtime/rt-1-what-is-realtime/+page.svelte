<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const installCode = `# Install svelte-realtime + adapter + uWebSockets
pnpm add svelte-adapter-uws svelte-realtime
pnpm add uNetworking/uWebSockets.js#v20.60.0
pnpm add -D ws`;

	const architectureCode = `// svelte-realtime architecture:
//
// You write:  src/live/chat.js     (server functions)
// You import: $live/chat           (auto-generated client stubs)
//
// live()        → RPC call over WebSocket (async function)
// live.stream() → Svelte store with initial data + live updates
//
// Under the hood:
//   Client                    Server (uWebSockets.js)
//   ──────                    ───────────────────────
//   $live/chat.sendMessage()  → WebSocket message
//                              → routes to live() handler
//                              → runs server function
//                              → ctx.publish() broadcasts
//   $messages store           ← WebSocket event
//                              ← merge strategy applies
//                              ← store updates reactively`;

	const configCode = `// svelte.config.js
${"import"} adapter from 'svelte-adapter-uws';

export default {
  kit: {
    adapter: adapter({
      websocket: true
    })
  }
};

// vite.config.js
${"import"} { sveltekit } from '@sveltejs/kit/vite';
${"import"} uws from 'svelte-adapter-uws/vite';
${"import"} realtime from 'svelte-realtime/vite';

export default {
  plugins: [sveltekit(), uws(), realtime()]
};`;

	const hooksCode = `// src/hooks.ws.ts — WebSocket hooks (required)
export { message } from 'svelte-realtime/server';

export function upgrade({ cookies }) {
  // Authenticate the WebSocket connection
  // Return user data or false to reject
  const session = validateSession(cookies.session_id);
  if (!session) return false;

  return {
    id: session.userId,
    name: session.name
  };
}`;

	const fullCode =
		"<script lang=\"ts\">\n" +
		"  // svelte-realtime introduction\n" +
		"<\/script>\n\n" +
		"<section class=\"page\">\n" +
		"  <h1>RT.1 — What is svelte-realtime?</h1>\n" +
		"</section>";
</script>

<section class="page">
	<h1>RT.1 — What is svelte-realtime?</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>svelte-realtime</code> adds native WebSocket RPC and reactive
		subscriptions to SvelteKit. You write server functions in <code>src/live/</code>, wrap them with
		<code>live()</code> for RPC or <code>live.stream()</code> for reactive stores, and import them
		on the client via the virtual <code>$live/</code> prefix. The Vite plugin generates type-safe
		client stubs automatically. Built on <code>svelte-adapter-uws</code> (uWebSockets.js), it
		handles 100K+ concurrent connections on a single thread.
	</p>

	<div class="build">
		<h3 class="section-title">Installation</h3>
		<pre class="code-block"><code>{installCode}</code></pre>

		<h3 class="section-title">Architecture</h3>
		<pre class="code-block"><code>{architectureCode}</code></pre>

		<h3 class="section-title">Adapter & Vite configuration</h3>
		<pre class="code-block"><code>{configCode}</code></pre>

		<h3 class="section-title">WebSocket hooks</h3>
		<pre class="code-block"><code>{hooksCode}</code></pre>
		<p class="chart-note"><code>hooks.ws.ts</code> is required. Without it, WebSocket messages have no server-side router and all RPC calls silently time out.</p>

		<div class="feature-grid">
			<div class="feature-card"><h4>RPC</h4><p><code>live()</code> makes any server function callable over WebSocket. Returns a promise on the client.</p></div>
			<div class="feature-card"><h4>Streams</h4><p><code>live.stream()</code> creates reactive Svelte stores with initial data + live pub/sub updates.</p></div>
			<div class="feature-card"><h4>Merge strategies</h4><p><code>crud</code>, <code>latest</code>, <code>set</code>, <code>presence</code>, <code>cursor</code> — choose how events merge into stores.</p></div>
			<div class="feature-card"><h4>uWebSockets.js</h4><p>Native C++ HTTP/WS server. 10–100× faster than <code>ws</code> or Socket.IO. Production-grade.</p></div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Setup errors are the most common issue with svelte-realtime.</p>
	<ol class="experiments">
		<li><strong>Omit <code>src/hooks.ws.ts</code>.</strong> The Vite plugin warns at startup if it finds live modules but no hooks file. Without it, WebSocket messages route to nothing — every RPC call hangs until the client-side timeout fires.</li>
		<li><strong>Use the default <code>adapter-auto</code> instead of <code>svelte-adapter-uws</code>.</strong> svelte-realtime requires uWebSockets.js for native WebSocket support. The standard Node adapter doesn't expose the WebSocket server to hooks. The adapter swap is not optional.</li>
		<li><strong>Forget to add the <code>uws()</code> Vite plugin.</strong> The dev server uses <code>ws</code> (the npm package) to emulate uWebSockets during development. Without the Vite plugin, the dev-mode WebSocket bridge isn't created and connections fail.</li>
		<li><strong>Return <code>false</code> from <code>upgrade()</code> for all connections.</strong> Every WebSocket connection is rejected. The client sees a connection error, and all RPC calls and streams fail immediately. This is the auth rejection path — useful for testing unauthorized access.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">svelte-realtime collapses the WebSocket boilerplate into two primitives: <code>live()</code> for RPC and <code>live.stream()</code> for reactive subscriptions. The <code>src/live/</code> directory convention mirrors SvelteKit's <code>src/routes/</code> — files become modules, exported functions become callable endpoints. The Vite plugin generates <code>$live/</code> client stubs that handle serialization, routing, and reconnection automatically.</p>
	<p class="prose">The three-file setup (<code>svelte.config.js</code>, <code>vite.config.ts</code>, <code>hooks.ws.ts</code>) wires everything together. The adapter provides the WebSocket server, the Vite plugins bridge dev/prod, and the hooks file handles auth + routing. Once configured, adding new realtime features is a single file in <code>src/live/</code>.</p>
	<p class="next">Next lesson: <a href="/svelte-realtime/rt-2-rpc-basics">RT.2 — RPC Basics</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.chart-note { font-size: var(--text-xs); color: var(--color-text-muted); margin: var(--space-xs) 0 0; }
	.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-sm); }
	.feature-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; background: var(--color-surface); padding: 0 var(--space-xs); border-radius: var(--radius-xs); } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
