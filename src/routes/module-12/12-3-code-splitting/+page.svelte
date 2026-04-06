<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type ChartResult = { label: string; data: number[] };\n" +
		"\n" +
		"	let showChart = $state(false);\n" +
		"	let chartPromise = $state\u003cPromise\u003cChartResult\u003e | null\u003e(null);\n" +
		"\n" +
		"	function loadChart() {\n" +
		"		showChart = true;\n" +
		"		chartPromise = new Promise\u003cChartResult\u003e((resolve) =\u003e {\n" +
		"			setTimeout(() =\u003e {\n" +
		"				resolve({\n" +
		"					label: 'Monthly Revenue',\n" +
		"					data: [120, 340, 250, 480, 390, 520, 610, 580, 700, 650, 810, 900]\n" +
		"				});\n" +
		"			}, 500);\n" +
		"		});\n" +
		"	}\n" +
		"\n" +
		"	function hideChart() {\n" +
		"		showChart = false;\n" +
		"		chartPromise = null;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003e12.3 — Code Splitting\u003c/h1\u003e\n" +
		"\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCode splitting\u003c/strong\u003e ensures users only download the JavaScript they need.\n" +
		"		SvelteKit automatically code-splits every route — each page's component and its dependencies\n" +
		"		are loaded in a separate chunk. For heavy components within a page, you can use\n" +
		"		\u003cstrong\u003edynamic \u003ccode\u003eimport()\u003c/code\u003e\u003c/strong\u003e to defer loading until the user needs it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eRoute-Based Splitting (Automatic)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			SvelteKit splits code at every \u003ccode\u003e+page.svelte\u003c/code\u003e boundary. When a user navigates\n" +
		"			to \u003ccode\u003e/module-12/12-3-code-splitting\u003c/code\u003e, only this page's code is loaded — not\n" +
		"			every other module. This happens automatically with zero configuration.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e{`// SvelteKit handles this internally:\n" +
		"// /routes/module-12/12-3-code-splitting/+page.svelte\n" +
		"//   → chunk-12-3.js (loaded on demand)\n" +
		"// /routes/module-12/12-4-effect-performance/+page.svelte\n" +
		"//   → chunk-12-4.js (loaded only when navigated to)`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDynamic Import for Heavy Components\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			For expensive components (charts, editors, 3D renderers), use dynamic \u003ccode\u003eimport()\u003c/code\u003e\n" +
		"			inside an \u003ccode\u003e{'{#await}'}\u003c/code\u003e block. The component's code is fetched only when the\n" +
		"			user triggers it.\n" +
		"		\u003c/p\u003e\n" +
		"		\u003cpre\u003e{`\u003c!-- Pattern: load heavy component on demand --\u003e\n" +
		"\u003c` + `script lang=\"ts\"\u003e\n" +
		"  let show = $state(false);\n" +
		"\u003c/` + `script\u003e\n" +
		"\n" +
		"{#if show}\n" +
		"  {#await import('./HeavyChart.svelte')}\n" +
		"    \u003cp\u003eLoading chart...\u003c/p\u003e\n" +
		"  {:then module}\n" +
		"    \u003cmodule.default data={chartData} /\u003e\n" +
		"  {:catch err}\n" +
		"    \u003cp\u003eFailed to load chart.\u003c/p\u003e\n" +
		"  {/await}\n" +
		"{/if}\n" +
		"\n" +
		"\u003cbutton onclick={() =\u003e show = true}\u003eShow Chart\u003c/button\u003e`}\u003c/pre\u003e\n" +
		"	\u003c/div\u003e\n" +
		"\n" +
		"	\u003ch3\u003eDemo: Lazy-Loaded Chart\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cp class=\"concept\"\u003e\n" +
		"			Click the button below to simulate loading a heavy chart component.\n" +
		"			The chart data resolves after 500ms, simulating a dynamic import.\n" +
		"		\u003c/p\u003e\n" +
		"\n" +
		"		{#if !showChart}\n" +
		"			\u003cbutton class=\"load-btn\" onclick={loadChart}\u003eShow Chart\u003c/button\u003e\n" +
		"		{:else}\n" +
		"			\u003cbutton class=\"load-btn secondary\" onclick={hideChart}\u003eHide Chart\u003c/button\u003e\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>SvelteKit automatically code-splits at every <code>+page.svelte</code> boundary with zero configuration.</li>
		<li>Dynamic <code>import()</code> inside <code>{'{#await}'}</code> defers heavy components (charts, editors) until needed.</li>
		<li><code>data-sveltekit-preload-data</code> prefetches route data on link hover for near-instant navigation.</li>
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
