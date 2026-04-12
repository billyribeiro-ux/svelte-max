<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	type ChartVariant = 'bar' | 'line';

	let activeType = $state<ChartVariant>('bar');

	/* Helper to prevent TS narrowing inside $derived */
	function currentType(): ChartVariant { return activeType; }

	const salesData = [30, 40, 35, 50, 49, 60] as const;
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;

	const chartOptions = $derived<Record<string, unknown>>({
		chart: {
			type: currentType(),
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [{ name: 'Sales', data: [...salesData] }],
		xaxis: { categories: [...months] },
		colors: [PE7_COLORS[0]],
		plotOptions: {
			bar: {
				borderRadius: 4,
				columnWidth: '55%',
			},
		},
		stroke: {
			width: currentType() === 'line' ? 3 : 0,
			curve: 'smooth',
		},
		markers: {
			size: currentType() === 'line' ? 5 : 0,
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 12%, transparent)',
			strokeDashArray: 4,
		},
		dataLabels: { enabled: false },
		theme: { mode: 'dark' },
	});

	const wrapperCode = `<!-- ApexChart.svelte — SSR-safe wrapper -->
<script lang="ts">
  interface Props {
    options: Record<string, unknown>;
    height?: string;
    class?: string;
  }

  let { options, height = '320px', class: className = '' }: Props = $props();

  let containerEl: HTMLDivElement | null = $state(null);
  let chartInstance: unknown = $state(null);

  $effect(() => {
    if (!containerEl) return;
    let chart: { render: () => void; updateOptions: (o: Record<string, unknown>) => void; destroy: () => void } | null = null;
    let destroyed = false;

    (async () => {
      const ApexCharts = (await import('apexcharts')).default;
      if (destroyed) return;
      chart = new ApexCharts(containerEl, {
        ...options,
        chart: { ...(options.chart as Record<string, unknown> ?? {}), height: height.replace('px', '') },
      });
      chart.render();
      chartInstance = chart;
    })();

    return () => { destroyed = true; if (chart) { chart.destroy(); chartInstance = null; } };
  });

  $effect(() => {
    if (!chartInstance) return;
    (chartInstance as { updateOptions: (o: Record<string, unknown>) => void }).updateOptions(options);
  });
<\/script>

<div bind:this={containerEl} class="apex-wrapper {className}" style:min-block-size={height}></div>`;

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';

  const PE7_COLORS = [
    '#7c5cfc', '#3ba676', '#e8a830',
    '#d94f4f', '#5b9bd5', '#9b59b6',
  ] as const;

  type ChartVariant = 'bar' | 'line';
  let activeType: ChartVariant = $state('bar');

  const salesData = [30, 40, 35, 50, 49, 60] as const;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;

  const chartOptions = $derived<Record<string, unknown>>({
    chart: {
      type: activeType,
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    series: [{ name: 'Sales', data: [...salesData] }],
    xaxis: { categories: [...months] },
    colors: [PE7_COLORS[0]],
    plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } },
    stroke: { width: activeType === 'line' ? 3 : 0, curve: 'smooth' },
    markers: { size: activeType === 'line' ? 5 : 0 },
    grid: { borderColor: 'color-mix(in oklch, currentColor 12%, transparent)', strokeDashArray: 4 },
    dataLabels: { enabled: false },
    theme: { mode: 'dark' },
  });
<\/script>

<section class="page">
  <h1>AC.1 — Installing ApexCharts</h1>
  <p class="concept">...</p>

  <div class="build">
    <div class="toggle-bar">
      <button class:active={activeType === 'bar'} onclick={() => (activeType = 'bar')}>Bar Chart</button>
      <button class:active={activeType === 'line'} onclick={() => (activeType = 'line')}>Line Chart</button>
    </div>
    <ApexChart options={chartOptions} height="320px" />
  </div>
</section>`;
</script>

<section class="page">
	<h1>AC.1 — Installing ApexCharts</h1>

	<p class="concept">
		<strong>Concept.</strong> ApexCharts is a modern charting library that handles responsiveness,
		animation, and interaction out of the box. Unlike the raw SVG approach in the Data Viz module
		(where you control every pixel), ApexCharts abstracts the rendering so you focus on
		<em>data</em>. The trade-off: less control, faster development. Use ApexCharts for dashboards
		and business apps; use raw SVG for data journalism and custom visualizations. In SvelteKit
		it needs a wrapper because the library requires <code>window</code> and <code>document</code>
		 — objects that don't exist during server-side rendering. Our <code>ApexChart.svelte</code>
		wrapper handles this with a dynamic <code>import()</code> inside <code>$effect</code>, which
		only runs in the browser. The chart instance is created once, then
		<em>reactively updated</em> whenever the options object changes.
	</p>

	<h2>The wrapper component</h2>
	<CodeCanvas filename="ApexChart.svelte" code={wrapperCode} collapsed />

	<div class="build">
		<div class="toggle-bar">
			<button
				class:active={activeType === 'bar'}
				onclick={() => (activeType = 'bar')}
			>
				Bar Chart
			</button>
			<button
				class:active={activeType === 'line'}
				onclick={() => (activeType = 'line')}
			>
				Line Chart
			</button>
		</div>

		<p class="toggle-hint">
			Toggle between <strong>bar</strong> and <strong>line</strong> — the same data, different
			<code>chart.type</code>. The wrapper reactively updates when options change.
		</p>

		<ApexChart options={chartOptions} height="320px" />
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">The ApexChart wrapper handles SSR safety and reactive updates. Break each concern to understand why the wrapper exists.</p>
	<ol class="experiments">
		<li><strong>Replace the dynamic <code>import('apexcharts')</code> with a static top-level <code>import ApexCharts from 'apexcharts'</code>.</strong> The page crashes during server-side rendering because ApexCharts accesses <code>window</code> and <code>document</code> at import time. The dynamic import inside <code>$effect</code> is the SSR safety mechanism.</li>
		<li><strong>Remove the second <code>$effect</code> that calls <code>updateOptions</code>.</strong> Toggle between Bar and Line. The chart no longer responds to state changes because the initial render is correct but subsequent option changes are ignored. The second effect is the reactive bridge.</li>
		<li><strong>Pass an OKLCH color string like <code>oklch(65% 0.22 270)</code> directly to the <code>colors</code> array.</strong> The chart renders with a fallback color (usually black) because ApexCharts cannot parse OKLCH. The PE7 hex palette exists specifically because of this library limitation.</li>
		<li><strong>Remove <code>background: 'transparent'</code> from the chart options.</strong> ApexCharts fills the chart area with its own background color, which clashes with your dark theme surface. Transparent background lets the parent container's styling show through.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">ApexCharts abstracts SVG rendering so you declare data and configuration rather than drawing shapes manually. The trade-off is clear: ApexCharts gives you speed and built-in features like tooltips, legends, and responsiveness, while raw SVG gives you pixel-level control for custom visualizations. Choose based on the project requirements.</p>
	<p class="prose">The wrapper component solves the SSR problem with a dynamic <code>import()</code> inside <code>$effect</code>, which only runs in the browser. A second <code>$effect</code> watches for option changes and calls <code>updateOptions</code> on the chart instance, creating a reactive bridge between Svelte's state system and the imperative ApexCharts API.</p>
	<p class="prose">The PE7 hex palette (<code>#7c5cfc</code>, <code>#3ba676</code>, etc.) is derived from OKLCH values but passed as hex strings because ApexCharts does not parse OKLCH natively. This is a common pattern when integrating modern CSS color systems with third-party libraries that only understand legacy formats.</p>
	<p class="next">Next up: AC.2 explores bar and column chart variants including grouped, stacked, and 100% stacked layouts.</p>
</section>

<style>
	/* ── Layout ── */
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;

		& strong { color: var(--color-text); }
	}

	h1 {
		text-wrap: balance;
	}

	h2 {
		text-wrap: balance;
		margin-block: var(--space-lg) var(--space-sm);
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding-inline: var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}

	.toggle-bar {
		display: flex;
		gap: var(--space-xs);

		& button {
			padding: var(--space-xs) var(--space-md);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-sm);
			background: var(--color-surface-2);
			color: var(--color-text-muted);
			font-size: var(--text-sm);
			font-weight: 600;
			cursor: pointer;
			transition: all var(--dur-fast) var(--ease-out);

			&:hover {
				background: color-mix(in oklch, var(--color-brand) 15%, transparent);
				border-color: var(--color-brand);
			}
		}

		& button.active {
			background: var(--color-brand);
			color: var(--color-surface);
			border-color: var(--color-brand);
		}
	}

	.toggle-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;

		& strong { color: var(--color-text); }
	}

	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── Having issues ── */
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

	/* ── Responsive ── */
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
	}

	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
