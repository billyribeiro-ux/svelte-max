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

	type PieVariant = 'donut' | 'pie';

	let pieVariant: PieVariant = $state('donut');

	const browserLabels = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'] as const;
	const browserValues = [65, 18, 8, 5, 4] as const;

	const donutPieOptions = $derived<Record<string, unknown>>({
		chart: {
			type: pieVariant,
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [...browserValues],
		labels: [...browserLabels],
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2], PE7_COLORS[3], PE7_COLORS[4]],
		plotOptions: {
			pie: {
				donut: {
					size: '60%',
					labels: {
						show: pieVariant === 'donut',
						name: { show: true, fontSize: '14px', color: undefined },
						value: { show: true, fontSize: '22px', fontWeight: 700, color: undefined },
						total: {
							show: true,
							label: 'Total',
							fontSize: '13px',
							color: undefined,
							formatter: () => '100%',
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val: number) => `${val.toFixed(1)}%`,
			style: { fontSize: '12px' },
		},
		legend: {
			position: 'bottom' as const,
			labels: { colors: undefined },
		},
		stroke: {
			width: 2,
		},
		tooltip: {
			y: {
				formatter: (val: number) => `${val}%`,
			},
		},
		theme: { mode: 'dark' },
	});

	const kpiLabels = ['Sales Target', 'Customer Satisfaction', 'Sprint Completion'] as const;
	const kpiValues = [78, 92, 65] as const;

	const radialOptions: Record<string, unknown> = {
		chart: {
			type: 'radialBar',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [...kpiValues],
		labels: [...kpiLabels],
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
		plotOptions: {
			radialBar: {
				offsetY: 0,
				startAngle: 0,
				endAngle: 270,
				hollow: {
					margin: 5,
					size: '30%',
					background: 'transparent',
				},
				dataLabels: {
					name: {
						show: true,
						fontSize: '13px',
					},
					value: {
						show: true,
						fontSize: '16px',
						fontWeight: 700,
					},
					total: {
						show: true,
						label: 'Average',
						fontSize: '13px',
						formatter: () => {
							const avg = kpiValues.reduce((a, b) => a + b, 0) / kpiValues.length;
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

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';

  const PE7_COLORS = [
    '#7c5cfc', '#3ba676', '#e8a830',
    '#d94f4f', '#5b9bd5', '#9b59b6',
  ] as const;

  type PieVariant = 'donut' | 'pie';
  let pieVariant: PieVariant = $state('donut');

  const browserLabels = ['Chrome', 'Safari', 'Firefox', 'Edge', 'Other'] as const;
  const browserValues = [65, 18, 8, 5, 4] as const;

  const donutPieOptions = $derived<Record<string, unknown>>({
    chart: { type: pieVariant, toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    series: [...browserValues],
    labels: [...browserLabels],
    colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2], PE7_COLORS[3], PE7_COLORS[4]],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: pieVariant === 'donut',
            name: { show: true, fontSize: '14px', color: undefined },
            value: { show: true, fontSize: '22px', fontWeight: 700, color: undefined },
            total: { show: true, label: 'Total', fontSize: '13px', color: undefined, formatter: () => '100%' },
          },
        },
      },
    },
    dataLabels: { enabled: true, formatter: (val: number) => \`\${val.toFixed(1)}%\`, style: { fontSize: '12px' } },
    legend: { position: 'bottom', labels: { colors: undefined } },
    stroke: { width: 2 },
    tooltip: { y: { formatter: (val: number) => \`\${val}%\` } },
    theme: { mode: 'dark' },
  });

  const kpiLabels = ['Sales Target', 'Customer Satisfaction', 'Sprint Completion'] as const;
  const kpiValues = [78, 92, 65] as const;

  const radialOptions: Record<string, unknown> = {
    chart: { type: 'radialBar', toolbar: { show: false }, fontFamily: 'inherit', background: 'transparent' },
    series: [...kpiValues],
    labels: [...kpiLabels],
    colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
    plotOptions: {
      radialBar: {
        offsetY: 0, startAngle: 0, endAngle: 270,
        hollow: { margin: 5, size: '30%', background: 'transparent' },
        dataLabels: {
          name: { show: true, fontSize: '13px' },
          value: { show: true, fontSize: '16px', fontWeight: 700 },
          total: {
            show: true, label: 'Average', fontSize: '13px',
            formatter: () => {
              const avg = kpiValues.reduce((a, b) => a + b, 0) / kpiValues.length;
              return \`\${avg.toFixed(0)}%\`;
            },
          },
        },
        track: { background: 'color-mix(in oklch, currentColor 8%, transparent)', strokeWidth: '100%' },
      },
    },
    stroke: { lineCap: 'round' },
    legend: { show: true, floating: true, position: 'left', offsetX: -10, offsetY: 10, labels: { colors: undefined } },
    theme: { mode: 'dark' },
  };
<\/script>

<section class="page">
  <h1>AC.4 — Donut, Pie & Radial Bar</h1>
  ...
</section>`;
</script>

<section class="page">
	<h1>AC.4 — Donut, Pie & Radial Bar</h1>

	<p class="concept">
		<strong>Concept.</strong> Pie and donut charts show part-to-whole relationships. The golden
		rule: limit to 5-7 slices maximum — more is visually unreadable, and you should switch
		to a bar chart instead. A donut is just a pie with a hollow center, which creates space for
		a summary label ("Total: 100%"). Radial bars (circular gauges) are perfect for KPI
		progress — "78% of sales target reached." They turn a boring number into an at-a-glance
		visual. Pair radial bars with the KPI cards pattern for dashboards. Notice that pie/donut
		<code>series</code> is a flat array of numbers (not objects with <code>data</code>), and
		<code>labels</code> maps each value to its name.
	</p>

	<div class="build">
		<div class="chart-row">
			<div class="chart-cell">
				<h4>Browser market share</h4>
				<div class="toggle-bar">
					<button
						class:active={pieVariant === 'donut'}
						onclick={() => (pieVariant = 'donut')}
					>
						Donut
					</button>
					<button
						class:active={pieVariant === 'pie'}
						onclick={() => (pieVariant = 'pie')}
					>
						Pie
					</button>
				</div>
				<ApexChart options={donutPieOptions} height="340px" />
			</div>

			<div class="chart-cell">
				<h4>KPI gauges — Radial bar</h4>
				<ApexChart options={radialOptions} height="340px" />
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Donut and radial bar charts have different data formats and configuration quirks compared to bar and line charts. Break them to learn the differences.</p>
	<ol class="experiments">
		<li><strong>Change the <code>series</code> from a flat array <code>[65, 18, 8, 5, 4]</code> to the object format used by bar charts (with <code>name</code> and <code>data</code> keys).</strong> The chart breaks or renders incorrectly because pie and donut charts expect a flat number array, not the named-series object format used by bar and line charts.</li>
		<li><strong>Add 15 more slices to the pie chart with small values like 1% each.</strong> The chart becomes an illegible mess of tiny slivers with overlapping labels. This demonstrates the golden rule: limit pie and donut charts to 5-7 slices maximum.</li>
		<li><strong>Set the donut <code>size</code> to <code>'95%'</code> instead of <code>'60%'</code>.</strong> The donut hole becomes so large that the arcs are paper-thin and nearly invisible. The center label also overwhelms the chart. The 60% sweet spot balances arc visibility with label space.</li>
		<li><strong>Remove the <code>total</code> configuration from the radial bar's <code>dataLabels</code>.</strong> The center of the radial bar gauge becomes empty, losing the summary "Average: 78%" label that gives context to the individual ring values.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Pie and donut chart <code>series</code> is a flat number array, not the <code>{'{ name, data }'}</code> object format used by bar and line charts. The <code>labels</code> array maps each value to its display name. Switching <code>chart.type</code> between <code>'donut'</code> and <code>'pie'</code> toggles the center hole, and the donut center labels configured through <code>plotOptions.pie.donut.labels</code> display summary data inside that hole.</p>
	<p class="prose">Radial bars (circular gauges) encode a single percentage per ring, making them ideal for KPI dashboards where you want to show progress toward targets like "78% of sales goal reached." The <code>total</code> label in the center provides aggregate context. The <code>track</code> configuration styles the unfilled portion of each ring.</p>
	<p class="prose">The golden rule for pie and donut charts is to limit slices to 5-7 maximum. Beyond that threshold, small slices become visually indistinguishable and labels overlap. When you have more categories, switch to a bar chart which handles many categories gracefully.</p>
	<p class="next">Next up: AC.5 introduces heatmaps and treemaps for two-dimensional data encoding.</p>
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

	.chart-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
	}

	.chart-cell {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.chart-row { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
