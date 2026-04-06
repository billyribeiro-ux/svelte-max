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

	type CurveType = 'smooth' | 'straight' | 'stepline';

	let curveType: CurveType = $state('smooth');

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const;

	const trafficData = {
		direct:   [14200, 15800, 16400, 18900, 21300, 24100, 26800, 25400, 23100, 20600, 19200, 22500],
		organic:  [28400, 30100, 32600, 35200, 38700, 42100, 45300, 43800, 40200, 37500, 34800, 39600],
		referral: [10800, 11200, 12500, 13100, 14600, 16200, 17800, 16900, 15300, 13900, 12700, 14200],
	} as const;

	const areaOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'area',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [
			{ name: 'Organic', data: [...trafficData.organic] },
			{ name: 'Direct', data: [...trafficData.direct] },
			{ name: 'Referral', data: [...trafficData.referral] },
		],
		xaxis: { categories: [...months] },
		yaxis: {
			labels: {
				formatter: (val: number) => `${(val / 1000).toFixed(0)}K`,
			},
		},
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
		stroke: {
			width: 2,
			curve: curveType,
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.45,
				opacityTo: 0.05,
				stops: [0, 90, 100],
			},
		},
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 12%, transparent)',
			strokeDashArray: 4,
		},
		tooltip: {
			y: {
				formatter: (val: number) => `${val.toLocaleString()} visits`,
			},
		},
		theme: { mode: 'dark' },
	});

	const lineOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'line',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [
			{ name: 'Organic', data: [...trafficData.organic] },
			{ name: 'Direct', data: [...trafficData.direct] },
			{ name: 'Referral', data: [...trafficData.referral] },
		],
		xaxis: { categories: [...months] },
		yaxis: {
			labels: {
				formatter: (val: number) => `${(val / 1000).toFixed(0)}K`,
			},
		},
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
		stroke: {
			width: 3,
			curve: curveType,
		},
		markers: { size: 4 },
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: undefined },
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 12%, transparent)',
			strokeDashArray: 4,
		},
		tooltip: {
			y: {
				formatter: (val: number) => `${val.toLocaleString()} visits`,
			},
		},
		theme: { mode: 'dark' },
	});

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';

  const PE7_COLORS = [
    '#7c5cfc', '#3ba676', '#e8a830',
    '#d94f4f', '#5b9bd5', '#9b59b6',
  ] as const;

  type CurveType = 'smooth' | 'straight' | 'stepline';
  let curveType: CurveType = $state('smooth');

  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const;

  const trafficData = {
    direct:   [14200, 15800, 16400, 18900, 21300, 24100, 26800, 25400, 23100, 20600, 19200, 22500],
    organic:  [28400, 30100, 32600, 35200, 38700, 42100, 45300, 43800, 40200, 37500, 34800, 39600],
    referral: [10800, 11200, 12500, 13100, 14600, 16200, 17800, 16900, 15300, 13900, 12700, 14200],
  } as const;

  const areaOptions = $derived<Record<string, unknown>>({
    chart: { type: 'area', toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    series: [
      { name: 'Organic', data: [...trafficData.organic] },
      { name: 'Direct', data: [...trafficData.direct] },
      { name: 'Referral', data: [...trafficData.referral] },
    ],
    xaxis: { categories: [...months] },
    yaxis: { labels: { formatter: (val: number) => \`\${(val / 1000).toFixed(0)}K\` } },
    colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
    stroke: { width: 2, curve: curveType },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 1, opacityFrom: 0.45, opacityTo: 0.05, stops: [0, 90, 100] },
    },
    dataLabels: { enabled: false },
    legend: { position: 'top', labels: { colors: undefined } },
    grid: { borderColor: 'color-mix(in oklch, currentColor 12%, transparent)', strokeDashArray: 4 },
    tooltip: { y: { formatter: (val: number) => \`\${val.toLocaleString()} visits\` } },
    theme: { mode: 'dark' },
  });

  // lineOptions is similar but type: 'line', no fill, markers: { size: 4 }
<\/script>

<section class="page">
  <h1>AC.3 — Line & Area Charts</h1>
  ...
</section>`;
</script>

<section class="page">
	<h1>AC.3 — Line & Area Charts</h1>

	<p class="concept">
		<strong>Concept.</strong> Line charts show change over time — the most common chart in
		dashboards. Area charts fill below the line for visual weight, making it easier to perceive
		volume. Multi-series lines compare trends across categories. Gradient fills (from brand
		color to transparent) add depth without competing with the data. The
		<code>stroke.curve</code> property changes the visual character:
		<strong>smooth</strong> rounds corners for a polished look,
		<strong>straight</strong> draws point-to-point for precision, and
		<strong>stepline</strong> shows discrete jumps — perfect for pricing tiers or staged
		rollouts.
	</p>

	<div class="build">
		<div class="controls">
			<label class="curve-select">
				<span>Curve type</span>
				<select bind:value={curveType}>
					<option value="smooth">Smooth</option>
					<option value="straight">Straight</option>
					<option value="stepline">Stepline</option>
				</select>
			</label>
		</div>

		<h4>Area chart — Website traffic (12 months)</h4>
		<ApexChart options={areaOptions} height="340px" />

		<h4>Line chart — Same data, no fill</h4>
		<ApexChart options={lineOptions} height="300px" />
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Area charts use <code>fill.type: 'gradient'</code> with opacity ramp for visual depth.</li>
		<li><code>stroke.curve</code> accepts <code>'smooth'</code>, <code>'straight'</code>, and <code>'stepline'</code> — each conveys different data character.</li>
		<li>Multi-series charts overlay multiple datasets for trend comparison.</li>
		<li>The same data renders as both area and line — only <code>chart.type</code> and fill config differ.</li>
		<li>Y-axis formatters (<code>val => '30K'</code>) keep labels clean on large-number datasets.</li>
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

	.controls {
		display: flex;
		gap: var(--space-md);
	}

	.curve-select {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);

		& span {
			font-weight: 600;
		}

		& select {
			padding: var(--space-xs) var(--space-sm);
			border: 1px solid var(--color-border);
			border-radius: var(--radius-sm);
			background: var(--color-surface-2);
			color: var(--color-text);
			font-size: var(--text-sm);
			cursor: pointer;
		}
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
