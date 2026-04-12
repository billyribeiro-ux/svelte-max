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

	<h2>Break it on purpose</h2>
	<p class="prose">Line and area charts have configuration options that subtly change how data is perceived. Break each to understand the visual impact.</p>
	<ol class="experiments">
		<li><strong>Change <code>fill.gradient.opacityFrom</code> from <code>0.45</code> to <code>1.0</code> on the area chart.</strong> The gradient fill becomes opaque, completely obscuring the series behind it. The opacity ramp from brand color to transparent is what makes stacked area charts readable when series overlap.</li>
		<li><strong>Switch the curve type to <code>'stepline'</code> and look at the traffic data.</strong> The smooth trends become jagged staircases. Stepline curves are designed for data that changes in discrete jumps (pricing tiers, version releases), not continuous measurements like traffic.</li>
		<li><strong>Remove the <code>markers: {'{ size: 4 }'}</code> setting from the line chart.</strong> The data points become invisible and users cannot tell where actual measurements occurred versus where the line is interpolated. Markers anchor the eye to real data.</li>
		<li><strong>Delete the <code>yaxis.labels.formatter</code> function.</strong> The y-axis fills with raw numbers like <code>42100</code> instead of clean <code>42K</code> labels. On a small chart, these long numbers overlap and become illegible.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Area charts use <code>fill.type: 'gradient'</code> with an opacity ramp from the brand color down to transparent. This gradient fill adds visual weight to the area under the line, making it easier to perceive volume and compare series magnitudes. Without the opacity ramp, overlapping series become unreadable.</p>
	<p class="prose">The <code>stroke.curve</code> property accepts <code>'smooth'</code>, <code>'straight'</code>, and <code>'stepline'</code>. Each conveys different data character: smooth rounds corners for a polished look, straight draws point-to-point for precision, and stepline shows discrete jumps suitable for pricing tiers or staged rollouts. Multi-series charts overlay multiple datasets on the same axes for direct trend comparison.</p>
	<p class="prose">The same traffic dataset renders as both an area chart and a line chart. The only differences are <code>chart.type</code>, the fill configuration, and marker visibility. Y-axis formatters convert raw numbers into compact strings like <code>30K</code> to keep labels clean at any container size.</p>
	<p class="next">Next up: AC.4 covers donut, pie, and radial bar charts for part-to-whole and KPI visualization.</p>
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
