<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	// Simulated async data fetcher
	async function fetchUser(id: number): Promise<{ name: string; email: string }> {
		await new Promise((resolve) => setTimeout(resolve, 800));
		const users: Record<number, { name: string; email: string }> = {
			1: { name: 'Ada Lovelace', email: 'ada@example.com' },
			2: { name: 'Grace Hopper', email: 'grace@example.com' },
			3: { name: 'Alan Turing', email: 'alan@example.com' }
		};
		const user = users[id];
		if (!user) throw new Error(`User ${id} not found`);
		return user;
	}

	async function fetchPosts(userId: number): Promise<string[]> {
		await new Promise((resolve) => setTimeout(resolve, 600));
		const posts: Record<number, string[]> = {
			1: ['Notes on the Analytical Engine', 'On computation'],
			2: ['The first compiler', 'COBOL design notes'],
			3: ['On computable numbers', 'Computing machinery']
		};
		return posts[userId] ?? [];
	}

	let selectedUserId = $state(1);

	/* -- Complete code for CodeCanvas -- */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  // NOTE: Requires experimental.async in svelte.config.js\n" +
		"  // compilerOptions: { experimental: { async: true } }\n" +
		"\n" +
		"  async function fetchUser(id: number) {\n" +
		"    await new Promise(r => setTimeout(r, 800));\n" +
		"    const users = {\n" +
		"      1: { name: 'Ada Lovelace', email: 'ada@example.com' },\n" +
		"      2: { name: 'Grace Hopper', email: 'grace@example.com' },\n" +
		"    };\n" +
		"    return users[id] ?? null;\n" +
		"  }\n" +
		"\n" +
		"  let userId = $state(1);\n" +
		"\n" +
		"  // --- Top-level await (component suspends) ---\n" +
		"  // let user = await fetchUser(userId);\n" +
		"\n" +
		"  // --- Await in $derived ---\n" +
		"  // let user = $derived(await fetchUser(userId));\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<!-- Await in markup -->\n" +
		"<p>User: {await fetchUser(userId)}</p>\n" +
		"\n" +
		"<!-- Compare: {#await} block gives loading/error control -->\n" +
		"{#await fetchUser(userId)}\n" +
		"  <p>Loading...</p>\n" +
		"{:then user}\n" +
		"  <p>{user.name}</p>\n" +
		"{:catch error}\n" +
		"  <p>Error: {error.message}</p>\n" +
		"{/await}\n" +
		"\n" +
		"<!-- Error boundary for await expressions -->\n" +
		"<svelte:boundary>\n" +
		"  <p>{await fetchUser(userId)}</p>\n" +
		"  {#snippet pending()}\n" +
		"    <p>Loading first time...</p>\n" +
		"  {/snippet}\n" +
		"  {#snippet failed(error, reset)}\n" +
		"    <p>Error! <button onclick={reset}>Retry</button></p>\n" +
		"  {/snippet}\n" +
		"</svelte:boundary>";

	const awaitPatterns =
		"<!-- 1. Top-level await in \u003cscript\u003e -->\n" +
		"\u003cscript\u003e\n" +
		"  // Component suspends until this resolves\n" +
		"  let user = await fetchUser(1);\n" +
		"\u003c/script\u003e\n" +
		"<p>{user.name}</p>\n\n" +
		"<!-- 2. Await inside $derived -->\n" +
		"\u003cscript\u003e\n" +
		"  let id = $state(1);\n" +
		"  // Re-fetches when id changes\n" +
		"  let user = $derived(await fetchUser(id));\n" +
		"\u003c/script\u003e\n" +
		"<p>{user.name}</p>\n\n" +
		"<!-- 3. Await directly in markup -->\n" +
		"<p>Hello, {(await fetchUser(1)).name}!</p>";
</script>

<section class="page">
	<h1>4.13 — Await expressions in components</h1>

	<p class="prose">
		Imagine ordering food at a counter. With <code>{'{#await}'}</code> blocks, you are the
		one holding the tray, watching the kitchen, and deciding what to show while waiting.
		With top-level <code>await</code>, you hand the tray to Svelte itself — the component
		simply says "I need this data" and suspends until it arrives. The kitchen handles
		everything; you just declare what you want. This is Svelte 5's experimental async
		support, available since version 5.36.
	</p>

	<p class="prose">
		With <code>experimental.async</code> enabled in your Svelte config, you can use
		<code>await</code> in three new places: at the top level of your <code>&lt;script&gt;</code>,
		inside <code>$derived(...)</code> declarations, and directly in template expressions.
		The component suspends until the promise resolves, and Svelte coordinates updates so
		the UI is never left in an inconsistent state.
	</p>

	<h2>Enabling the feature</h2>

	<div class="build">
		<CodeCanvas
			filename="svelte.config.js"
			code={`export default {
  compilerOptions: {
    experimental: {
      async: true  // Required for await in components
    }
  }
};`}
		/>
		<p class="prose">
			This flag is required in Svelte 5. It will be removed in Svelte 6, where async
			components will be enabled by default.
		</p>
	</div>

	<h2>Three places you can await</h2>

	<div class="build">
		<CodeCanvas filename="Await patterns" code={awaitPatterns} />
	</div>

	<h2>Synchronized updates</h2>

	<p class="prose">
		When an <code>await</code> expression depends on reactive state, Svelte ensures the
		UI stays consistent. If you change <code>id</code> from 1 to 2, the old value does not
		flash alongside new values — the entire update is held until the promise resolves. This
		prevents the "torn UI" problem where some parts of the page show old data and others
		show new data.
	</p>

	<div class="build">
		<CodeCanvas
			filename="+page.svelte"
			code={`<` + `script>
  let a = $state(1);
  let b = $state(2);

  async function add(a, b) {
    await new Promise(f => setTimeout(f, 500));
    return a + b;
  }
</` + `script>

<input type="number" bind:value={a}>
<input type="number" bind:value={b}>

<!-- The UI stays synchronized -->
<!-- It shows "2 + 2 = 4", never "2 + 2 = 3" -->
<p>{a} + {b} = {await add(a, b)}</p>`}
		/>
	</div>

	<h2>Loading and error states</h2>

	<p class="prose">
		For first-load spinners, wrap content in a <code>&lt;svelte:boundary&gt;</code> with a
		<code>pending</code> snippet. For errors, use the <code>failed</code> snippet. For
		subsequent updates (after initial load), use <code>$effect.pending()</code> to show
		inline loading indicators.
	</p>

	<div class="build">
		<CodeCanvas
			filename="+page.svelte"
			code={`<svelte:boundary>
  <!-- Content that uses await -->
  <p>User: {(await fetchUser(id)).name}</p>

  <!-- Shown during first load only -->
  {#snippet pending()}
    <p class="spinner">Loading user...</p>
  {/snippet}

  <!-- Shown when the promise rejects -->
  {#snippet failed(error, reset)}
    <p class="error">
      {error.message}
      <button onclick={reset}>Try again</button>
    </p>
  {/snippet}
</svelte:boundary>

<!-- For subsequent updates, use $effect.pending() -->
{#if $effect.pending()}
  <p class="updating">Updating...</p>
{/if}`}
		/>
	</div>

	<h2>Comparing approaches</h2>

	<div class="build">
		<div class="comparison">
			<div class="compare-col">
				<h3><code>{'{#await}'}</code> block</h3>
				<ul class="compare-list">
					<li>Stable, production-ready</li>
					<li>Explicit loading / error states inline</li>
					<li>Fine-grained control per promise</li>
					<li>No config flag needed</li>
					<li>Best for one-off async in templates</li>
				</ul>
			</div>
			<div class="compare-col">
				<h3>Top-level <code>await</code></h3>
				<ul class="compare-list">
					<li>Experimental (Svelte 5.36+)</li>
					<li>Cleaner syntax, less boilerplate</li>
					<li>Synchronized updates across await calls</li>
					<li>Uses <code>&lt;svelte:boundary&gt;</code> for errors</li>
					<li>Best for data-driven components</li>
				</ul>
			</div>
		</div>
	</div>

	<h2>Live demo with <code>{'{#await}'}</code></h2>
	<p class="prose">
		Since top-level <code>await</code> requires the <code>experimental.async</code> config
		flag, this interactive demo uses the stable <code>{'{#await}'}</code> pattern to show the
		same data. The syntax differs, but the concept is identical — fetch async data and render
		it reactively.
	</p>

	<div class="build">
		<div class="controls">
			<button type="button" class:active={selectedUserId === 1} onclick={() => selectedUserId = 1}>Ada (1)</button>
			<button type="button" class:active={selectedUserId === 2} onclick={() => selectedUserId = 2}>Grace (2)</button>
			<button type="button" class:active={selectedUserId === 3} onclick={() => selectedUserId = 3}>Alan (3)</button>
		</div>

		{#await fetchUser(selectedUserId)}
			<div class="loading">
				<span class="spinner-dot"></span>
				Loading user {selectedUserId}...
			</div>
		{:then user}
			<div class="user-card">
				<h3>{user.name}</h3>
				<p class="email">{user.email}</p>
			</div>
		{:catch error}
			<div class="error-card">
				<p>{error.message}</p>
			</div>
		{/await}

		{#await fetchPosts(selectedUserId)}
			<div class="loading">
				<span class="spinner-dot"></span>
				Loading posts...
			</div>
		{:then posts}
			<ul class="posts">
				{#each posts as post}
					<li>{post}</li>
				{/each}
			</ul>
		{:catch error}
			<div class="error-card">
				<p>{error.message}</p>
			</div>
		{/await}

		<p class="prose">
			With top-level <code>await</code>, this same demo would look like:<br>
			<code>let user = $derived(await fetchUser(selectedUserId))</code><br>
			<code>let posts = $derived(await fetchPosts(selectedUserId))</code><br>
			And the template would just be <code>{'{user.name}'}</code> — no <code>{'{#await}'}</code> blocks at all.
		</p>
	</div>

	<h2>Break it on purpose</h2>

	<ol class="experiments">
		<li>
			<strong>Use top-level <code>await</code> without enabling <code>experimental.async</code>.</strong>
			The Svelte compiler throws an error telling you the feature requires the experimental
			flag. This guardrail exists because the async behavior changes how effects are ordered
			and is not yet finalized for Svelte 6.
		</li>
		<li>
			<strong>Use <code>await</code> in markup without a <code>&lt;svelte:boundary&gt;</code> for error handling.</strong>
			If the promise rejects, the error bubbles up to the nearest error boundary. If there
			is no boundary, the entire component tree crashes. Always wrap await expressions in
			a boundary with a <code>failed</code> snippet — or use <code>{'{#await}'}</code> with
			<code>{'{:catch}'}</code> instead.
		</li>
		<li>
			<strong>Change a dependency of an <code>await</code> expression rapidly (click buttons fast).</strong>
			Svelte handles overlapping updates gracefully — a fast update will resolve and display
			while a slower, earlier update is still in flight. The UI always shows the result of
			the <em>latest</em> state, never a stale intermediate.
		</li>
		<li>
			<strong>Compare bundle size: build once with <code>{'{#await}'}</code> and once with top-level <code>await</code>.</strong>
			The await-expression version produces slightly different compiled output — the component
			becomes an async function internally. The bundle size difference is negligible, but the
			component lifecycle is fundamentally different: it suspends rather than rendering
			incrementally.
		</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>

	<p class="prose">
		Svelte 5.36 introduced experimental support for <code>await</code> expressions directly
		in components — in the script block, inside <code>$derived</code>, and in template
		markup. This eliminates the ceremony of <code>{'{#await}'}</code> blocks for simple
		cases: instead of manually wiring up pending/then/catch states, you write
		<code>let user = await fetchUser(id)</code> and the component suspends until data arrives.
	</p>

	<p class="prose">
		The key advantage is synchronized updates. When reactive state changes, all dependent
		<code>await</code> expressions resolve before the UI updates, preventing torn states
		where some parts show old data and others show new. For loading indicators, use
		<code>&lt;svelte:boundary&gt;</code> with a <code>pending</code> snippet for first load,
		and <code>$effect.pending()</code> for subsequent updates. For error handling, use the
		<code>failed</code> snippet on the boundary.
	</p>

	<p class="prose">
		The <code>{'{#await}'}</code> block remains the stable, production-ready approach and
		gives you more granular control — explicit loading, success, and error states per
		promise. Top-level <code>await</code> is best when you want simpler syntax and are
		comfortable with the experimental flag. Both patterns solve the same problem; choose
		based on how much control you need over intermediate states.
	</p>

	<p class="next">
		<strong>Next:</strong>
		<a href="/module-4/project">Module 4 Project</a> — combine control flow patterns into
		a real-world interactive interface.
	</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-width: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}

	h1 { font-size: var(--text-2xl); margin: 0; text-wrap: balance; }
	h2 { font-size: var(--text-lg); margin-block-start: var(--space-lg); }

	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.build {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.controls {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-block-end: var(--space-md);
	}

	.controls button {
		font: inherit;
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		cursor: pointer;
		font-weight: 600;
	}

	.controls button:hover { background: var(--color-surface); }

	.controls button.active {
		background: var(--color-brand);
		color: var(--color-surface);
		border-color: var(--color-brand);
	}

	.loading {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md);
		color: var(--color-text-muted);
		font-style: italic;
		font-size: var(--text-sm);
	}

	.spinner-dot {
		display: inline-block;
		inline-size: 0.75rem;
		block-size: 0.75rem;
		border-radius: 50%;
		background: var(--color-brand);
		animation: pulse-dot 1s ease-in-out infinite;
	}

	@keyframes pulse-dot {
		0%, 100% { opacity: 0.3; transform: scale(0.8); }
		50% { opacity: 1; transform: scale(1); }
	}

	.user-card {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		margin-block-end: var(--space-sm);
	}

	.user-card h3 { margin: 0 0 var(--space-xs); font-size: var(--text-base); }
	.user-card .email { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); font-family: var(--font-mono); }

	.error-card {
		background: color-mix(in oklch, var(--color-warning) 10%, var(--color-surface-2));
		border: 1px solid var(--color-warning);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.error-card p { margin: 0; color: var(--color-warning); font-size: var(--text-sm); }

	.posts {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.posts li {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		padding: var(--space-xs) var(--space-sm);
		font-size: var(--text-sm);
	}

	.comparison {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}

	.compare-col {
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}

	.compare-col h3 {
		margin: 0 0 var(--space-sm);
		color: var(--color-text);
		font-size: var(--text-base);
	}

	.compare-list {
		font-size: var(--text-sm);
		padding-inline-start: var(--space-md);
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		line-height: 1.5;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}

	.having-issues {
		margin-block: var(--space-xl);
		border: 2px dashed var(--color-warning);
		border-radius: var(--radius-lg);
		overflow: hidden;

		& > summary {
			padding: var(--space-md) var(--space-lg);
			font-weight: 700;
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

	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	@media (min-width: 768px) {
		h1 { font-size: var(--text-hero); }
		.page { padding: var(--space-2xl); }
		.comparison { grid-template-columns: 1fr 1fr; }
	}
</style>
