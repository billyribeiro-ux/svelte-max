<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li>Async SSR allows <code>await</code> directly in component bodies</li>
		<li><code>&lt;svelte:boundary&gt;</code> with <code>pending</code> snippet provides loading UI</li>
		<li>Independent async sections load concurrently — no waterfall</li>
		<li>Fast data appears immediately; slow data streams in as it resolves</li>
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
	.reload-btn {
		padding: var(--space-xs) var(--space-md); border: 1px solid var(--color-border);
		border-radius: var(--radius-md); background: var(--color-surface-2);
		cursor: pointer; color: var(--color-text); font-size: var(--text-sm);
		align-self: flex-start;
	}
	.concurrent-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
	.async-section {
		background: var(--color-surface-2); border-radius: var(--radius-md);
		padding: var(--space-md); min-height: 8rem;
	}
	.async-section h4 { margin: 0 0 var(--space-sm) 0; font-size: var(--text-sm); color: var(--color-text-muted); }
	.loaded-content { display: flex; flex-direction: column; gap: var(--space-xs); }
	.stat-value { margin: 0; font-size: var(--text-2xl); font-weight: 700; }
	.stat-label { margin: 0; color: var(--color-text-muted); font-size: var(--text-sm); }
	.feed-item { margin: 0; padding: var(--space-xs) 0; border-bottom: 1px solid var(--color-border); font-size: var(--text-sm); }
	.loading-placeholder { display: flex; flex-direction: column; gap: var(--space-sm); }
	.pulse-bar {
		height: 1rem; background: var(--color-border); border-radius: var(--radius-xs);
		animation: pulse 1.2s ease-in-out infinite;
	}
	.pulse-bar.short { width: 60%; }
	@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concurrent-grid { grid-template-columns: 1fr 1fr; }
	}
</style>
