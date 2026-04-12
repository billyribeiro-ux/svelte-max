<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	const asyncCode = `\u003cscript lang="ts"\u003e
  // With compilerOptions.experimental.async: true
  // you can await directly in the component body!
  import { getUser } from './user.remote';
  import { getPosts } from './posts.remote';

  // These run concurrently — no waterfall
  const user = await getUser();
  const posts = await getPosts(user.id);
\u003c/script\u003e

<h1>Welcome, {user.name}</h1>
{#each posts as post}
  <article>{post.title}</article>
{/each}`;

	const boundaryCode = `<!-- svelte:boundary handles loading states -->
<svelte:boundary>
  {#snippet pending()}
    <div class="skeleton">Loading user profile...</div>
  {/snippet}

  <!-- This component uses await internally -->
  <UserProfile />
</svelte:boundary>`;

	const concurrentCode = `<!-- Independent sections load concurrently -->
<div class="dashboard">
  <svelte:boundary>
    {#snippet pending()}
      <p>Loading stats...</p>
    {/snippet}
    <StatsWidget />
  </svelte:boundary>

  <svelte:boundary>
    {#snippet pending()}
      <p>Loading feed...</p>
    {/snippet}
    <FeedWidget />
  </svelte:boundary>

  <!-- Each boundary resolves independently -->
  <!-- Fast data appears first, slow data streams in -->
</div>`;

	let section1Loaded = $state(false);
	let section2Loaded = $state(false);

	$effect(() => {
		const t1 = setTimeout(() => { section1Loaded = true; }, 600);
		const t2 = setTimeout(() => { section2Loaded = true; }, 1400);
		return () => { clearTimeout(t1); clearTimeout(t2); };
	});

	function reload() {
		section1Loaded = false;
		section2Loaded = false;
		setTimeout(() => { section1Loaded = true; }, 600);
		setTimeout(() => { section2Loaded = true; }, 1400);
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"const asyncCode = `\\u003cscript lang=\"ts\"\\u003e\n" +
		"  // With compilerOptions.experimental.async: true\n" +
		"  // you can await directly in the component body!\n" +
		"  import { getUser } from './user.remote';\n" +
		"  import { getPosts } from './posts.remote';\n" +
		"\n" +
		"  // These run concurrently — no waterfall\n" +
		"  const user = await getUser();\n" +
		"  const posts = await getPosts(user.id);\n" +
		"\\u003c/script\\u003e\n" +
		"\n" +
		"\u003ch1\u003eWelcome, {user.name}\u003c/h1\u003e\n" +
		"{#each posts as post}\n" +
		"  \u003carticle\u003e{post.title}\u003c/article\u003e\n" +
		"{/each}`;\n" +
		"\n" +
		"	const boundaryCode = `\u003c!-- svelte:boundary handles loading states --\u003e\n" +
		"\u003csvelte:boundary\u003e\n" +
		"  {#snippet pending()}\n" +
		"    \u003cdiv class=\"skeleton\"\u003eLoading user profile...\u003c/div\u003e\n" +
		"  {/snippet}\n" +
		"\n" +
		"  \u003c!-- This component uses await internally --\u003e\n" +
		"  \u003cUserProfile /\u003e\n" +
		"\u003c/svelte:boundary\u003e`;\n" +
		"\n" +
		"	const concurrentCode = `\u003c!-- Independent sections load concurrently --\u003e\n" +
		"\u003cdiv class=\"dashboard\"\u003e\n" +
		"  \u003csvelte:boundary\u003e\n" +
		"    {#snippet pending()}\n" +
		"      \u003cp\u003eLoading stats...\u003c/p\u003e\n" +
		"    {/snippet}\n" +
		"    \u003cStatsWidget /\u003e\n" +
		"  \u003c/svelte:boundary\u003e\n" +
		"\n" +
		"  \u003csvelte:boundary\u003e\n" +
		"    {#snippet pending()}\n" +
		"      \u003cp\u003eLoading feed...\u003c/p\u003e\n" +
		"    {/snippet}\n" +
		"    \u003cFeedWidget /\u003e\n" +
		"  \u003c/svelte:boundary\u003e\n" +
		"\n" +
		"  \u003c!-- Each boundary resolves independently --\u003e\n" +
		"  \u003c!-- Fast data appears first, slow data streams in --\u003e\n" +
		"\u003c/div\u003e`;\n" +
		"\n" +
		"	let section1Loaded = $state(false);\n" +
		"	let section2Loaded = $state(false);\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const t1 = setTimeout(() =\u003e { section1Loaded = true; }, 600);\n" +
		"		const t2 = setTimeout(() =\u003e { section2Loaded = true; }, 1400);\n" +
		"		return () =\u003e { clearTimeout(t1); clearTimeout(t2); };\n" +
		"	});\n" +
		"\n" +
		"	function reload() {\n" +
		"		section1Loaded = false;\n" +
		"		section2Loaded = false;\n" +
		"		setTimeout(() =\u003e { section1Loaded = true; }, 600);\n" +
		"		setTimeout(() =\u003e { section2Loaded = true; }, 1400);\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e9B.12 — Async SSR\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e With \u003ccode\u003ecompilerOptions.experimental.async: true\u003c/code\u003e, you\n" +
		"		can use \u003ccode\u003eawait\u003c/code\u003e directly in a component body. \u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e\n" +
		"		with a \u003ccode\u003epending\u003c/code\u003e snippet provides loading states. Independent awaits run\n" +
		"		concurrently — no waterfall.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003ch2\u003eAwait in component body\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{asyncCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eLoading states with svelte:boundary\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{boundaryCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eConcurrent independent loads\u003c/h2\u003e\n" +
		"		\u003cpre\u003e\u003ccode\u003e{concurrentCode}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"		\u003ch2\u003eSimulated concurrent loading\u003c/h2\u003e\n" +
		"		\u003cp\u003eTwo sections load independently — fast data appears first (600ms), slow data streams in (1400ms):\u003c/p\u003e\n" +
		"\n" +
		"		\u003cbutton class=\"reload-btn\" onclick={reload}\u003eReload demo\u003c/button\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"concurrent-grid\"\u003e\n" +
		"			\u003cdiv class=\"async-section\"\u003e\n" +
		"				\u003ch4\u003eStats Widget (fast)\u003c/h4\u003e\n" +
		"				{#if section1Loaded}\n" +
		"					\u003cdiv class=\"loaded-content\"\u003e\n" +
		"						\u003cp class=\"stat-value\"\u003e2,847\u003c/p\u003e\n" +
		"						\u003cp class=\"stat-label\"\u003eActive Users\u003c/p\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{:else}\n" +
		"					\u003cdiv class=\"loading-placeholder\"\u003e\n" +
		"						\u003cdiv class=\"pulse-bar\"\u003e\u003c/div\u003e\n" +
		"						\u003cdiv class=\"pulse-bar short\"\u003e\u003c/div\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/if}\n" +
		"			\u003c/div\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"async-section\"\u003e\n" +
		"				\u003ch4\u003eFeed Widget (slow)\u003c/h4\u003e\n" +
		"				{#if section2Loaded}\n" +
		"					\u003cdiv class=\"loaded-content\"\u003e\n" +
		"						\u003cp class=\"feed-item\"\u003eNew deployment completed\u003c/p\u003e\n" +
		"						\u003cp class=\"feed-item\"\u003eUser signup spike detected\u003c/p\u003e\n" +
		"						\u003cp class=\"feed-item\"\u003eCache hit ratio: 98.7%\u003c/p\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{:else}\n" +
		"					\u003cdiv class=\"loading-placeholder\"\u003e\n" +
		"						\u003cdiv class=\"pulse-bar\"\u003e\u003c/div\u003e\n" +
		"						\u003cdiv class=\"pulse-bar\"\u003e\u003c/div\u003e\n" +
		"						\u003cdiv class=\"pulse-bar short\"\u003e\u003c/div\u003e\n" +
		"					\u003c/div\u003e\n" +
		"				{/if}\n" +
		"			\u003c/div\u003e\n" +
		"		\u003c/div\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"	\u003cul\u003e\n" +
		"		\u003cli\u003eAsync SSR allows \u003ccode\u003eawait\u003c/code\u003e directly in component bodies\u003c/li\u003e\n" +
		"		\u003cli\u003e\u003ccode\u003e&lt;svelte:boundary&gt;\u003c/code\u003e with \u003ccode\u003epending\u003c/code\u003e snippet provides loading UI\u003c/li\u003e\n" +
		"		\u003cli\u003eIndependent async sections load concurrently — no waterfall\u003c/li\u003e\n" +
		"		\u003cli\u003eFast data appears immediately; slow data streams in as it resolves\u003c/li\u003e\n" +
		"	\u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>9B.12 — Async SSR</h1>
	<p class="concept">
		<strong>Concept.</strong> With <code>compilerOptions.experimental.async: true</code>, you
		can use <code>await</code> directly in a component body. <code>&lt;svelte:boundary&gt;</code>
		with a <code>pending</code> snippet provides loading states. Independent awaits run
		concurrently — no waterfall.
	</p>

	<div class="build">
		<h2>Await in component body</h2>
		<pre><code>{asyncCode}</code></pre>

		<h2>Loading states with svelte:boundary</h2>
		<pre><code>{boundaryCode}</code></pre>

		<h2>Concurrent independent loads</h2>
		<pre><code>{concurrentCode}</code></pre>

		<h2>Simulated concurrent loading</h2>
		<p>Two sections load independently — fast data appears first (600ms), slow data streams in (1400ms):</p>

		<button class="reload-btn" onclick={reload}>Reload demo</button>

		<div class="concurrent-grid">
			<div class="async-section">
				<h4>Stats Widget (fast)</h4>
				{#if section1Loaded}
					<div class="loaded-content">
						<p class="stat-value">2,847</p>
						<p class="stat-label">Active Users</p>
					</div>
				{:else}
					<div class="loading-placeholder">
						<div class="pulse-bar"></div>
						<div class="pulse-bar short"></div>
					</div>
				{/if}
			</div>

			<div class="async-section">
				<h4>Feed Widget (slow)</h4>
				{#if section2Loaded}
					<div class="loaded-content">
						<p class="feed-item">New deployment completed</p>
						<p class="feed-item">User signup spike detected</p>
						<p class="feed-item">Cache hit ratio: 98.7%</p>
					</div>
				{:else}
					<div class="loading-placeholder">
						<div class="pulse-bar"></div>
						<div class="pulse-bar"></div>
						<div class="pulse-bar short"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Use <code>await</code> in a component without enabling <code>compilerOptions.experimental.async</code>.</strong> The compiler errors because top-level <code>await</code> in components is gated behind the experimental flag. It is not enabled by default.</li>
		<li><strong>Remove the <code>&lt;svelte:boundary&gt;</code> wrapper around an async component.</strong> The parent component blocks on the child's <code>await</code>, and nothing renders until all async work completes. The boundary is what enables streaming and loading states.</li>
		<li><strong>Put two independent awaits in sequence instead of letting them run concurrently.</strong> The total load time becomes the sum of both delays instead of the maximum, creating a waterfall. Independent boundaries run concurrently by default.</li>
		<li><strong>Omit the <code>pending</code> snippet from a <code>&lt;svelte:boundary&gt;</code>.</strong> While the async work is in progress, the boundary renders nothing at all. Users see a blank gap until data arrives, which is a worse experience than showing a skeleton or spinner.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">With <code>compilerOptions.experimental.async: true</code>, Svelte components can use <code>await</code> directly in their script body, just like top-level await in ES modules. This eliminates the need for <code>{'{#await}'}</code> blocks or manual loading state management for server data.</p>
	<p class="prose"><code>&lt;svelte:boundary&gt;</code> with a <code>pending</code> snippet provides loading UI while async work resolves. Each boundary acts independently, so fast sections render immediately while slow sections show their pending state. There is no waterfall between independent boundaries.</p>
	<p class="prose">This pattern is the modern alternative to <code>load()</code> for component-level data fetching. Instead of centralizing all data requirements in a page loader, each component declares its own async dependencies and Svelte handles the orchestration, streaming, and loading states automatically.</p>
	<p class="next">Next up: preloading async work with <code>fork()</code>.</p>
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
	.reload-btn {
		padding: var(--space-xs) var(--space-md); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); background: var(--color-surface-2);
		cursor: pointer; color: var(--color-text); font-size: var(--text-sm);
		align-self: flex-start;
	}
	.concurrent-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
	.async-section {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); min-block-size: 8rem;
	}
	.async-section h4 { margin: 0 0 var(--space-sm) 0; font-size: var(--text-sm); color: var(--color-text-muted); }
	.loaded-content { display: flex; flex-direction: column; gap: var(--space-xs); }
	.stat-value { margin: 0; font-size: var(--text-2xl); font-weight: 700; }
	.stat-label { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }
	.feed-item { margin: 0; padding: var(--space-xs) 0; border-block-end: 1px solid var(--color-border); font-size: var(--text-sm); }
	.loading-placeholder { display: flex; flex-direction: column; gap: var(--space-sm); }
	.pulse-bar {
		block-size: 1rem; background: var(--color-border); border-radius: var(--radius-xs);
		animation: pulse 1.2s ease-in-out infinite;
	}
	.pulse-bar.short { inline-size: 60%; }
	@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concurrent-grid { grid-template-columns: 1fr 1fr; }
	}


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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
