<script lang="ts">
	type ChartResult = { label: string; data: number[] };

	let showChart = $state(false);
	let chartPromise = $state<Promise<ChartResult> | null>(null);

	function loadChart() {
		showChart = true;
		chartPromise = new Promise<ChartResult>((resolve) => {
			setTimeout(() => {
				resolve({
					label: 'Monthly Revenue',
					data: [120, 340, 250, 480, 390, 520, 610, 580, 700, 650, 810, 900]
				});
			}, 500);
		});
	}

	function hideChart() {
		showChart = false;
		chartPromise = null;
	}
</script>

<section class="page">
	<h1>12.3 — Code Splitting</h1>

	<p class="concept">
		<strong>Code splitting</strong> ensures users only download the JavaScript they need.
		SvelteKit automatically code-splits every route — each page's component and its dependencies
		are loaded in a separate chunk. For heavy components within a page, you can use
		<strong>dynamic <code>import()</code></strong> to defer loading until the user needs it.
	</p>

	<h3>Route-Based Splitting (Automatic)</h3>
	<div class="build">
		<p class="concept">
			SvelteKit splits code at every <code>+page.svelte</code> boundary. When a user navigates
			to <code>/module-12/12-3-code-splitting</code>, only this page's code is loaded — not
			every other module. This happens automatically with zero configuration.
		</p>
		<pre>{`// SvelteKit handles this internally:
// /routes/module-12/12-3-code-splitting/+page.svelte
//   → chunk-12-3.js (loaded on demand)
// /routes/module-12/12-4-effect-performance/+page.svelte
//   → chunk-12-4.js (loaded only when navigated to)`}</pre>
	</div>

	<h3>Dynamic Import for Heavy Components</h3>
	<div class="build">
		<p class="concept">
			For expensive components (charts, editors, 3D renderers), use dynamic <code>import()</code>
			inside an <code>{'{#await}'}</code> block. The component's code is fetched only when the
			user triggers it.
		</p>
		<pre>{`<!-- Pattern: load heavy component on demand -->
<` + `script lang="ts">
  let show = $state(false);
</` + `script>

{#if show}
  {#await import('./HeavyChart.svelte')}
    <p>Loading chart...</p>
  {:then module}
    <module.default data={chartData} />
  {:catch err}
    <p>Failed to load chart.</p>
  {/await}
{/if}

<button onclick={() => show = true}>Show Chart</button>`}</pre>
	</div>

	<h3>Demo: Lazy-Loaded Chart</h3>
	<div class="build">
		<p class="concept">
			Click the button below to simulate loading a heavy chart component.
			The chart data resolves after 500ms, simulating a dynamic import.
		</p>

		{#if !showChart}
			<button class="load-btn" onclick={loadChart}>Show Chart</button>
		{:else}
			<button class="load-btn secondary" onclick={hideChart}>Hide Chart</button>
		{/if}

		{#if chartPromise}
			{#await chartPromise}
				<div class="loading">
					<span class="spinner"></span>
					Loading chart component...
				</div>
			{:then chart}
				<div class="chart-result">
					<h4>{chart.label}</h4>
					<div class="bar-chart">
						{#each chart.data as value, i}
							<div class="bar-wrapper">
								<div class="bar" style="height: {(value / 900) * 100}%"></div>
								<span class="bar-label">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
							</div>
						{/each}
					</div>
					<p class="chart-note">Chart loaded! This component was fetched on demand.</p>
				</div>
			{:catch}
				<p>Failed to load chart.</p>
			{/await}
		{/if}
	</div>

	<h3>Best Practices</h3>
	<ul>
		<li><strong>Let SvelteKit handle route splitting</strong> — it is automatic and optimized</li>
		<li><strong>Dynamic import for components over 50KB</strong> — charts, maps, rich editors</li>
		<li><strong>Preload on hover</strong> — SvelteKit's <code>data-sveltekit-preload-data</code> prefetches on link hover</li>
		<li><strong>Analyze your bundle</strong> — use <code>vite-plugin-visualizer</code> to find large chunks</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.load-btn {
		padding: var(--space-sm) var(--space-lg);
		background: var(--color-primary);
		color: white;
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		font-weight: 600;
		font-size: var(--text-base);
		align-self: flex-start;
	}
	.load-btn.secondary {
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
	}
	.loading {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		color: var(--color-text-muted);
	}
	.spinner {
		display: inline-block;
		width: 20px;
		height: 20px;
		border: 2px solid var(--color-border);
		border-top-color: var(--color-primary);
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
	.chart-result h4 { margin: 0; }
	.chart-note {
		color: #2d8a4e;
		font-weight: 600;
		font-size: var(--text-sm);
		margin: 0;
	}
	.bar-chart {
		display: flex;
		align-items: flex-end;
		gap: 4px;
		height: 150px;
		padding-block-start: var(--space-sm);
	}
	.bar-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 100%;
		justify-content: flex-end;
	}
	.bar {
		width: 100%;
		background: var(--color-primary);
		border-radius: var(--radius-xs) var(--radius-xs) 0 0;
		min-height: 4px;
		transition: height 0.4s ease;
	}
	.bar-label {
		font-size: 0.7em;
		color: var(--color-text-muted);
		margin-block-start: 2px;
	}
</style>
