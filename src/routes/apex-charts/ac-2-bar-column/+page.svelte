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

	type BarVariant = 'grouped-vertical' | 'grouped-horizontal' | 'stacked' | 'stacked-100';

	let variant = $state<BarVariant>('grouped-vertical');

	/* Helper to prevent TS narrowing inside $derived */
	function currentVariant(): BarVariant { return variant; }

	const categories = ['Q1', 'Q2', 'Q3', 'Q4'] as const;

	const seriesData = [
		{ name: 'Software', data: [440, 505, 414, 671] },
		{ name: 'Hardware', data: [230, 312, 280, 350] },
		{ name: 'Services', data: [180, 220, 195, 260] },
	] as const;

	const variantLabel: Record<BarVariant, string> = {
		'grouped-vertical': 'Vertical Grouped',
		'grouped-horizontal': 'Horizontal Grouped',
		'stacked': 'Stacked Vertical',
		'stacked-100': '100% Stacked',
	};

	const isHorizontal = $derived(currentVariant() === 'grouped-horizontal');
	const isStacked = $derived(currentVariant() === 'stacked' || currentVariant() === 'stacked-100');
	const is100 = $derived(currentVariant() === 'stacked-100');

	const chartOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'bar',
			stacked: isStacked,
			stackType: is100 ? '100%' : 'normal',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: seriesData.map((s) => ({ name: s.name, data: [...s.data] })),
		xaxis: { categories: [...categories] },
		yaxis: {
			labels: {
				formatter: (val: number) =>
					is100 ? `${val.toFixed(0)}%` : `$${val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`,
			},
		},
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
		plotOptions: {
			bar: {
				horizontal: isHorizontal,
				borderRadius: 4,
				columnWidth: '60%',
				barHeight: '60%',
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
				formatter: (val: number) =>
					is100 ? `${val.toFixed(1)}%` : `$${val}K`,
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

  type BarVariant = 'grouped-vertical' | 'grouped-horizontal' | 'stacked' | 'stacked-100';
  let variant: BarVariant = $state('grouped-vertical');

  const categories = ['Q1', 'Q2', 'Q3', 'Q4'] as const;
  const seriesData = [
    { name: 'Software', data: [440, 505, 414, 671] },
    { name: 'Hardware', data: [230, 312, 280, 350] },
    { name: 'Services', data: [180, 220, 195, 260] },
  ] as const;

  const isHorizontal = $derived(variant === 'grouped-horizontal');
  const isStacked = $derived(variant === 'stacked' || variant === 'stacked-100');
  const is100 = $derived(variant === 'stacked-100');

  const chartOptions = $derived<Record<string, unknown>>({
    chart: {
      type: 'bar',
      stacked: isStacked,
      stackType: is100 ? '100%' : 'normal',
      toolbar: { show: false },
      fontFamily: 'inherit',
      background: 'transparent',
    },
    series: seriesData.map((s) => ({ name: s.name, data: [...s.data] })),
    xaxis: { categories: [...categories] },
    yaxis: {
      labels: {
        formatter: (val: number) =>
          is100 ? \`\${val.toFixed(0)}%\` : \`$\${val >= 1000 ? \`\${(val / 1000).toFixed(0)}k\` : val}\`,
      },
    },
    colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2]],
    plotOptions: {
      bar: {
        horizontal: isHorizontal,
        borderRadius: 4,
        columnWidth: '60%',
        barHeight: '60%',
      },
    },
    dataLabels: { enabled: false },
    legend: { position: 'top', labels: { colors: undefined } },
    grid: { borderColor: 'color-mix(in oklch, currentColor 12%, transparent)', strokeDashArray: 4 },
    tooltip: {
      y: { formatter: (val: number) => is100 ? \`\${val.toFixed(1)}%\` : \`$\${val}K\` },
    },
    theme: { mode: 'dark' },
  });
<\/script>

<section class="page">
  <h1>AC.2 — Bar & Column Charts</h1>
  <p class="concept">...</p>
  <div class="build">
    <fieldset class="variant-picker">
      {#each Object.entries(variantLabel) as [key, label]}
        <label>
          <input type="radio" name="variant" value={key} bind:group={variant} />
          {label}
        </label>
      {/each}
    </fieldset>
    <ApexChart options={chartOptions} height="380px" />
  </div>
</section>`;
</script>

<section class="page">
	<h1>AC.2 — Bar & Column Charts</h1>

	<p class="concept">
		<strong>Concept.</strong> Bars are the workhorse of business data visualization. Vertical bars
		(columns) compare categories side by side. Horizontal bars work better for long labels like
		product names or country names. Stacked bars show part-to-whole relationships within each
		category. Grouped bars place multiple series next to each other for direct comparison.
		A 100% stacked bar normalizes each category to 100%, revealing proportional composition
		regardless of total magnitude. The same dataset below drives all four variants — only
		the <code>plotOptions</code>, <code>stacked</code>, and <code>horizontal</code> flags
		change.
	</p>

	<div class="build">
		<fieldset class="variant-picker">
			<legend>Chart variant</legend>
			{#each Object.entries(variantLabel) as [key, label]}
				<label>
					<input
						type="radio"
						name="variant"
						value={key}
						checked={variant === key}
						onchange={() => (variant = key as BarVariant)}
					/>
					{label}
				</label>
			{/each}
		</fieldset>

		<p class="data-note">
			Quarterly revenue ($K) by product line — <strong>Software</strong>,
			<strong>Hardware</strong>, <strong>Services</strong>.
		</p>

		<ApexChart options={chartOptions} height="380px" />
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Bar charts look simple but the configuration options interact in subtle ways. Break each setting to see how the chart responds.</p>
	<ol class="experiments">
		<li><strong>Set <code>chart.stacked: true</code> while keeping <code>horizontal: true</code> at the same time.</strong> The chart renders stacked horizontal bars. This combination is valid and useful for showing part-to-whole relationships with long category labels, but many developers assume these options are mutually exclusive.</li>
		<li><strong>Remove the <code>columnWidth: '60%'</code> setting from plotOptions.</strong> The bars expand to fill most of the available space with minimal gap between them, making the chart feel cramped and harder to read. Column width controls the visual density of bar charts.</li>
		<li><strong>Change <code>stackType</code> to <code>'100%'</code> without setting <code>stacked: true</code>.</strong> The 100% stack type is silently ignored because stacking must be enabled first. The chart renders as if both options were absent, demonstrating that stackType depends on the stacked flag.</li>
		<li><strong>Pass only one series instead of three to the stacked variant.</strong> The stacked chart looks identical to a regular bar chart because there is nothing to stack. Stacking only adds value when you have multiple series representing parts of a whole.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>plotOptions.bar.horizontal</code> flag flips the chart between vertical columns and horizontal bars. Horizontal layout works better when category labels are long (product names, country names) because the labels align naturally along the y-axis. The <code>chart.stacked</code> flag collapses multiple series into a single bar per category, and adding <code>stackType: '100%'</code> normalizes each category to 100% regardless of total magnitude.</p>
	<p class="prose">Grouped bars are the default behavior when <code>stacked</code> is <code>false</code>. Each series gets its own bar placed side by side, making direct comparison between series easy. The same underlying dataset drives all four variants; only the configuration flags change. This demonstrates the power of declarative charting: one data source, four distinct visualizations.</p>
	<p class="prose">Y-axis formatters keep labels clean on large-number datasets by converting raw values into human-readable strings like <code>$440K</code>. Without formatters, the axis fills with long numbers that overlap and become unreadable at smaller container sizes.</p>
	<p class="next">Next up: AC.3 covers line and area charts with multiple curve types and gradient fills.</p>
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

	.variant-picker {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-sm) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);

		& legend {
			font-size: var(--text-sm);
			font-weight: 600;
			color: var(--color-text-muted);
			padding-inline: var(--space-xs);
		}

		& label {
			display: flex;
			align-items: center;
			gap: var(--space-xs);
			font-size: var(--text-sm);
			color: var(--color-text);
			cursor: pointer;
			transition: color var(--dur-fast) var(--ease-out);

			&:hover { color: var(--color-brand); }
		}

		& input[type="radio"] {
			accent-color: var(--color-brand);
		}
	}

	.data-note {
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
