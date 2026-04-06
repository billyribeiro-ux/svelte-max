<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { ChartSeries } from '$lib/types/apex';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

	interface ProductRevenue {
		name: string;
		monthly: readonly number[];
		color: string;
	}

	const products: readonly ProductRevenue[] = [
		{ name: 'SaaS Pro', monthly: [42, 48, 55, 60, 58, 65, 72, 78, 80, 85, 90, 95], color: PE7_COLORS[0] },
		{ name: 'Enterprise', monthly: [30, 35, 38, 42, 45, 50, 52, 55, 58, 60, 62, 68], color: PE7_COLORS[1] },
		{ name: 'Starter', monthly: [18, 20, 22, 25, 24, 28, 30, 32, 35, 33, 38, 40], color: PE7_COLORS[2] },
	] as const;

	let selectedProduct: string | null = $state(null);

	const filteredProducts = $derived(
		selectedProduct
			? products.filter((p) => p.name === selectedProduct)
			: products
	);

	/* ── Chart 1: Bar — monthly revenue by product ── */
	const barOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'bar',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			events: {
				dataPointSelection: (
					_e: Event,
					_chart: unknown,
					config: { seriesIndex: number }
				) => {
					const clickedProduct = products[config.seriesIndex]?.name ?? null;
					selectedProduct = selectedProduct === clickedProduct ? null : clickedProduct;
				},
			},
		},
		series: products.map((p): ChartSeries => ({
			name: p.name,
			data: [...p.monthly],
			color: p.color,
		})),
		xaxis: {
			categories: [...months],
			labels: { style: { fontSize: '10px' } },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `$${val}K`,
				style: { fontSize: '11px' },
			},
		},
		plotOptions: {
			bar: { borderRadius: 3, columnWidth: '65%' },
		},
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		tooltip: {
			y: { formatter: (val: number) => `$${val}K` },
		},
		theme: { mode: 'dark' },
	});

	/* ── Chart 2: Line — trend ── */
	const lineOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'line',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: { enabled: true, speed: 400 },
		},
		series: filteredProducts.map((p): ChartSeries => ({
			name: p.name,
			data: [...p.monthly],
			color: p.color,
		})),
		xaxis: {
			categories: [...months],
			labels: { style: { fontSize: '10px' } },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `$${val}K`,
				style: { fontSize: '11px' },
			},
		},
		stroke: { curve: 'smooth', width: 2.5 },
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		tooltip: {
			y: { formatter: (val: number) => `$${val}K` },
		},
		theme: { mode: 'dark' },
	});

	/* ── Chart 3: Donut — revenue share ── */
	const donutValues = $derived(
		filteredProducts.map((p) => p.monthly.reduce((a, b) => a + b, 0))
	);
	const donutLabels = $derived(filteredProducts.map((p) => p.name));
	const donutColors = $derived(filteredProducts.map((p) => p.color));

	const donutOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'donut',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: { enabled: true, speed: 400 },
		},
		series: donutValues,
		labels: donutLabels,
		colors: donutColors,
		plotOptions: {
			pie: {
				donut: {
					size: '60%',
					labels: {
						show: true,
						name: { show: true, fontSize: '13px' },
						value: {
							show: true,
							fontSize: '18px',
							fontWeight: 700,
							formatter: (val: string) => `$${val}K`,
						},
						total: {
							show: true,
							label: 'Total',
							fontSize: '12px',
							formatter: (w: { globals: { seriesTotals: number[] } }) => {
								const sum = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
								return `$${sum}K`;
							},
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val: number) => `${val.toFixed(1)}%`,
			style: { fontSize: '11px' },
		},
		legend: {
			position: 'bottom' as const,
			labels: { colors: undefined },
		},
		stroke: { width: 2 },
		theme: { mode: 'dark' },
	});

	/* ── Chart 4: Radial bars — KPIs ── */
	const kpiData = [
		{ label: 'Revenue Target', value: 87 },
		{ label: 'Customer Retention', value: 94 },
		{ label: 'NPS Score', value: 72 },
	] as const;

	const radialOptions: Record<string, unknown> = {
		chart: {
			type: 'radialBar',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: kpiData.map((k) => k.value),
		labels: kpiData.map((k) => k.label),
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
		plotOptions: {
			radialBar: {
				offsetY: 0,
				startAngle: 0,
				endAngle: 270,
				hollow: { margin: 5, size: '30%', background: 'transparent' },
				dataLabels: {
					name: { show: true, fontSize: '12px' },
					value: { show: true, fontSize: '15px', fontWeight: 700 },
					total: {
						show: true,
						label: 'Average',
						fontSize: '12px',
						formatter: () => {
							const avg = kpiData.reduce((a, b) => a + b.value, 0) / kpiData.length;
							return `${avg.toFixed(0)}%`;
						},
					},
				},
				track: {
					background: 'color-mix(in oklch, currentColor 8%, transparent)',
					strokeWidth: '100%',
				},
			},
		},
		stroke: { lineCap: 'round' },
		legend: {
			show: true,
			floating: true,
			position: 'left' as const,
			offsetX: -10,
			offsetY: 10,
			labels: { colors: undefined },
		},
		theme: { mode: 'dark' },
	};

	/* ── Export ── */
	let chartContainerEl: HTMLDivElement | null = $state(null);

	async function exportChart(): Promise<void> {
		if (!chartContainerEl) return;
		const apexEl = chartContainerEl.querySelector('.apex-wrapper') as HTMLElement | null;
		if (!apexEl) return;
		const ApexCharts = (await import('apexcharts')).default;
		const instances = ApexCharts.getChartByID?.('bar-revenue');
		if (instances) {
			const { imgURI } = await (instances as { dataURI: (opts?: Record<string, unknown>) => Promise<{ imgURI: string }> }).dataURI();
			const link = document.createElement('a');
			link.href = imgURI;
			link.download = 'revenue-chart.png';
			link.click();
		}
	}

	function resetFilter(): void {
		selectedProduct = null;
	}

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';
  import type { ChartSeries } from '$lib/types/apex';

  const PE7_COLORS = ['#7c5cfc','#3ba676','#e8a830','#d94f4f','#5b9bd5','#9b59b6'] as const;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;

  interface ProductRevenue {
    name: string;
    monthly: readonly number[];
    color: string;
  }

  const products: readonly ProductRevenue[] = [
    { name: 'SaaS Pro', monthly: [42,48,55,60,58,65,72,78,80,85,90,95], color: '#7c5cfc' },
    { name: 'Enterprise', monthly: [30,35,38,42,45,50,52,55,58,60,62,68], color: '#3ba676' },
    { name: 'Starter', monthly: [18,20,22,25,24,28,30,32,35,33,38,40], color: '#e8a830' },
  ];

  let selectedProduct: string | null = $state(null);

  const filteredProducts = $derived(
    selectedProduct ? products.filter((p) => p.name === selectedProduct) : products
  );

  // Bar chart with click handler to filter
  const barOptions = $derived<Record<string, unknown>>({
    chart: {
      type: 'bar', toolbar: { show: false },
      events: {
        dataPointSelection: (_e: Event, _chart: unknown, config: { seriesIndex: number }) => {
          const clicked = products[config.seriesIndex]?.name ?? null;
          selectedProduct = selectedProduct === clicked ? null : clicked;
        },
      },
    },
    series: products.map((p): ChartSeries => ({ name: p.name, data: [...p.monthly], color: p.color })),
    // ... xaxis, yaxis, plotOptions ...
    theme: { mode: 'dark' },
  });

  // Line, donut, and radial charts use filteredProducts for cross-chart filtering.
  // Export uses ApexCharts.dataURI() for PNG download.
<\/script>

<section class="page">
  <h1>AC.10 — Multi-chart Dashboard</h1>
  <!-- 2x2 grid of charts with cross-chart interaction -->
</section>`;
</script>

<section class="page">
	<h1>AC.10 — Multi-chart Dashboard Composition</h1>

	<p class="concept">
		<strong>Concept.</strong> A production dashboard has multiple charts sharing a data layer.
		Pattern: a reactive store provides data to all charts. Cross-chart interaction: clicking a bar
		in Chart A filters the data in Charts B and C. This is achieved by lifting the filter state
		into a shared <code>$state</code> variable and deriving each chart's options from it.
		ApexCharts also supports <code>chart.dataURI()</code> for PNG export — useful for reports and
		stakeholder sharing.
	</p>

	<div class="dashboard-controls">
		{#if selectedProduct}
			<span class="filter-badge">
				Filtered: <strong>{selectedProduct}</strong>
			</span>
			<button class="reset-btn" onclick={resetFilter}>Reset filter</button>
		{:else}
			<span class="filter-hint">Click a bar in the revenue chart to filter all charts</span>
		{/if}
		<button class="export-btn" onclick={exportChart}>Export Revenue PNG</button>
	</div>

	<div class="dashboard-grid">
		<div class="build" bind:this={chartContainerEl}>
			<h4>Monthly Revenue by Product</h4>
			<ApexChart options={barOptions} height="300px" />
		</div>

		<div class="build">
			<h4>Revenue Trend{selectedProduct ? ` — ${selectedProduct}` : ''}</h4>
			<ApexChart options={lineOptions} height="300px" />
		</div>

		<div class="build">
			<h4>Revenue Share{selectedProduct ? ` — ${selectedProduct}` : ''}</h4>
			<ApexChart options={donutOptions} height="300px" />
		</div>

		<div class="build">
			<h4>KPI Targets</h4>
			<ApexChart options={radialOptions} height="300px" />
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Shared <code>$state</code> variables act as a cross-chart data layer — filter one, update all.</li>
		<li>ApexCharts <code>dataPointSelection</code> event enables click-to-filter interactions.</li>
		<li><code>$derived</code> chart options automatically recompute when the filter state changes.</li>
		<li><code>chart.dataURI()</code> exports any chart as a PNG for reports and sharing.</li>
		<li>A 2x2 grid layout with responsive fallback to single column works for most dashboard needs.</li>
	</ul>
</section>

<style>
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

	h3 {
		text-wrap: balance;
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}

	h4 {
		text-wrap: balance;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-muted);
		margin: 0;
	}

	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding-inline: var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.dashboard-controls {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-sm);
		margin-block: var(--space-md);
	}

	.filter-badge {
		font-size: var(--text-sm);
		color: var(--color-brand);
		font-weight: 600;

		& strong { color: var(--color-text); }
	}

	.filter-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.reset-btn,
	.export-btn {
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
			color: var(--color-brand);
		}
	}

	.export-btn {
		margin-inline-start: auto;
	}

	.dashboard-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
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
	}

	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.dashboard-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
