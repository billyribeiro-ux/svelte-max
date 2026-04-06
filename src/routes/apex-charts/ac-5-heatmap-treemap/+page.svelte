<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { HeatmapPoint, TreemapItem } from '$lib/types/apex';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	/* ── Heatmap: Server load by day x hour ── */
	const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
	const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

	function generateLoad(day: number): HeatmapPoint[] {
		return hours.map((hour, h) => {
			const isWeekend = day >= 5;
			const isBusinessHour = h >= 8 && h <= 18;
			const isPeak = h >= 10 && h <= 14;

			let base: number;
			if (isWeekend) {
				base = 15 + (isBusinessHour ? 20 : 5);
			} else {
				base = isPeak ? 65 : isBusinessHour ? 45 : 12;
			}

			const jitter = Math.round((Math.sin(day * 7 + h * 3) * 0.5 + 0.5) * 25 - 12);
			const value = Math.max(0, Math.min(100, base + jitter));

			return { x: hour, y: value };
		});
	}

	const heatmapSeries = days.map((name, i) => ({
		name,
		data: generateLoad(i),
	}));

	const heatmapOptions: Record<string, unknown> = {
		chart: {
			type: 'heatmap',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: heatmapSeries,
		xaxis: {
			type: 'category',
			labels: {
				style: { fontSize: '10px' },
				rotate: -45,
				rotateAlways: true,
			},
		},
		yaxis: {
			labels: { style: { fontSize: '11px' } },
		},
		plotOptions: {
			heatmap: {
				shadeIntensity: 0.5,
				radius: 2,
				colorScale: {
					ranges: [
						{ from: 0, to: 20, name: 'Low', color: PE7_COLORS[4] },
						{ from: 21, to: 40, name: 'Moderate', color: PE7_COLORS[1] },
						{ from: 41, to: 60, name: 'Medium', color: PE7_COLORS[2] },
						{ from: 61, to: 80, name: 'High', color: PE7_COLORS[0] },
						{ from: 81, to: 100, name: 'Critical', color: PE7_COLORS[3] },
					],
				},
			},
		},
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			padding: { right: 10 },
		},
		tooltip: {
			y: {
				formatter: (val: number) => `${val}% load`,
			},
		},
		theme: { mode: 'dark' },
	};

	/* ── Treemap: Department budget ── */
	interface BudgetItem extends TreemapItem {
		utilization: number;
	}

	const budgetData: BudgetItem[] = [
		{ x: 'Engineering', y: 480000, utilization: 87 },
		{ x: 'Marketing', y: 320000, utilization: 92 },
		{ x: 'Sales', y: 290000, utilization: 78 },
		{ x: 'Operations', y: 210000, utilization: 65 },
		{ x: 'HR', y: 150000, utilization: 71 },
		{ x: 'Finance', y: 130000, utilization: 58 },
		{ x: 'Legal', y: 95000, utilization: 45 },
		{ x: 'Support', y: 75000, utilization: 83 },
	];

	function utilizationColor(pct: number): string {
		if (pct >= 85) return PE7_COLORS[3];
		if (pct >= 70) return PE7_COLORS[2];
		if (pct >= 55) return PE7_COLORS[0];
		return PE7_COLORS[1];
	}

	const treemapSeries = [{
		data: budgetData.map((d) => ({
			x: d.x,
			y: d.y,
			fillColor: utilizationColor(d.utilization),
		})),
	}];

	const treemapOptions: Record<string, unknown> = {
		chart: {
			type: 'treemap',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: treemapSeries,
		plotOptions: {
			treemap: {
				distributed: true,
				enableShades: false,
			},
		},
		dataLabels: {
			enabled: true,
			style: { fontSize: '13px' },
			formatter: (_text: string, op: { value: number }) =>
				`$${(op.value / 1000).toFixed(0)}K`,
		},
		tooltip: {
			y: {
				formatter: (val: number) => `$${val.toLocaleString()}`,
			},
		},
		legend: { show: false },
		theme: { mode: 'dark' },
	};

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';
  import type { HeatmapPoint, TreemapItem } from '$lib/types/apex';

  const PE7_COLORS = [
    '#7c5cfc', '#3ba676', '#e8a830',
    '#d94f4f', '#5b9bd5', '#9b59b6',
  ] as const;

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] as const;
  const hours = Array.from({ length: 24 }, (_, i) => \`\${String(i).padStart(2, '0')}:00\`);

  function generateLoad(day: number): HeatmapPoint[] {
    return hours.map((hour, h) => {
      const isWeekend = day >= 5;
      const isBusinessHour = h >= 8 && h <= 18;
      const isPeak = h >= 10 && h <= 14;
      let base: number;
      if (isWeekend) base = 15 + (isBusinessHour ? 20 : 5);
      else base = isPeak ? 65 : isBusinessHour ? 45 : 12;
      const jitter = Math.round((Math.sin(day * 7 + h * 3) * 0.5 + 0.5) * 25 - 12);
      return { x: hour, y: Math.max(0, Math.min(100, base + jitter)) };
    });
  }

  const heatmapSeries = days.map((name, i) => ({ name, data: generateLoad(i) }));

  const heatmapOptions: Record<string, unknown> = {
    chart: { type: 'heatmap', toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    series: heatmapSeries,
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5, radius: 2,
        colorScale: {
          ranges: [
            { from: 0, to: 20, name: 'Low', color: '#5b9bd5' },
            { from: 21, to: 40, name: 'Moderate', color: '#3ba676' },
            { from: 41, to: 60, name: 'Medium', color: '#e8a830' },
            { from: 61, to: 80, name: 'High', color: '#7c5cfc' },
            { from: 81, to: 100, name: 'Critical', color: '#d94f4f' },
          ],
        },
      },
    },
    dataLabels: { enabled: false },
    legend: { position: 'top', labels: { colors: undefined } },
    tooltip: { y: { formatter: (val: number) => \`\${val}% load\` } },
    theme: { mode: 'dark' },
  };

  interface BudgetItem extends TreemapItem { utilization: number; }
  const budgetData: BudgetItem[] = [
    { x: 'Engineering', y: 480000, utilization: 87 },
    { x: 'Marketing', y: 320000, utilization: 92 },
    { x: 'Sales', y: 290000, utilization: 78 },
    { x: 'Operations', y: 210000, utilization: 65 },
    { x: 'HR', y: 150000, utilization: 71 },
    { x: 'Finance', y: 130000, utilization: 58 },
    { x: 'Legal', y: 95000, utilization: 45 },
    { x: 'Support', y: 75000, utilization: 83 },
  ];

  function utilizationColor(pct: number): string {
    if (pct >= 85) return '#d94f4f';
    if (pct >= 70) return '#e8a830';
    if (pct >= 55) return '#7c5cfc';
    return '#3ba676';
  }

  const treemapSeries = [{
    data: budgetData.map((d) => ({
      x: d.x, y: d.y, fillColor: utilizationColor(d.utilization),
    })),
  }];

  const treemapOptions: Record<string, unknown> = {
    chart: { type: 'treemap', toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    series: treemapSeries,
    plotOptions: { treemap: { distributed: true, enableShades: false } },
    dataLabels: {
      enabled: true, style: { fontSize: '13px' },
      formatter: (_text: string, op: { value: number }) => \`$\${(op.value / 1000).toFixed(0)}K\`,
    },
    tooltip: { y: { formatter: (val: number) => \`$\${val.toLocaleString()}\` } },
    legend: { show: false },
    theme: { mode: 'dark' },
  };
<\/script>

<section class="page">
  <h1>AC.5 — Heatmap & Treemap</h1>
  ...
</section>`;
</script>

<section class="page">
	<h1>AC.5 — Heatmap & Treemap</h1>

	<p class="concept">
		<strong>Concept.</strong> Heatmaps visualize intensity across two dimensions — perfect for
		time-by-category matrices like GitHub commit activity or server load by hour and day.
		Each cell's color encodes a value on a continuous scale from cool (low) to hot (high).
		Treemaps show hierarchical data as nested rectangles — budget breakdowns, disk usage,
		portfolio allocation. Tile <em>size</em> encodes the primary metric (budget amount), while
		tile <em>color</em> can encode a secondary metric (budget utilization percentage). Together,
		heatmaps and treemaps handle the "two-dimensional encoding" use cases that bar and line
		charts cannot.
	</p>

	<div class="build">
		<h4>Server Load — 7 days x 24 hours</h4>
		<p class="chart-note">
			Color intensity: <span class="swatch" style:background={PE7_COLORS[4]}></span> Low
			<span class="swatch" style:background={PE7_COLORS[1]}></span> Moderate
			<span class="swatch" style:background={PE7_COLORS[2]}></span> Medium
			<span class="swatch" style:background={PE7_COLORS[0]}></span> High
			<span class="swatch" style:background={PE7_COLORS[3]}></span> Critical
		</p>
		<ApexChart options={heatmapOptions} height="320px" />
	</div>

	<div class="build">
		<h4>Department Budget Allocation</h4>
		<p class="chart-note">
			Tile size = budget amount. Color = utilization:
			<span class="swatch" style:background={PE7_COLORS[1]}></span> &lt;55%
			<span class="swatch" style:background={PE7_COLORS[0]}></span> 55-70%
			<span class="swatch" style:background={PE7_COLORS[2]}></span> 70-85%
			<span class="swatch" style:background={PE7_COLORS[3]}></span> &gt;85%
		</p>
		<ApexChart options={treemapOptions} height="340px" />
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Heatmaps use <code>colorScale.ranges</code> to map value ranges to discrete color bands.</li>
		<li>Each heatmap series is a row (day), and each <code>x/y</code> point is a cell (hour/value).</li>
		<li>Treemap tile size encodes a primary metric; <code>fillColor</code> encodes a secondary metric.</li>
		<li><code>distributed: true</code> lets each treemap tile have its own color.</li>
		<li>Deterministic pseudo-random data (using <code>Math.sin</code> seeded by index) creates realistic patterns without actual randomness.</li>
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
		& em { font-style: italic; }
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

	.chart-note {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	.swatch {
		display: inline-block;
		inline-size: 12px;
		block-size: 12px;
		border-radius: var(--radius-xs);
		margin-inline-start: var(--space-xs);
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
	}

	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
