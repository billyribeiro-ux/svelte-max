<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteURL } from 'svelte/reactivity';

	// SvelteURL — reactive URL encoding the current chart configuration as query params
	const configUrl = new SvelteURL('https://example.com/charts/responsive');
	$effect(() => {
		configUrl.searchParams.set('width', String(sliderWidth));
	});

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	const categories = ['React', 'Svelte', 'Vue', 'Angular', 'Solid', 'Astro'] as const;
	const seriesData = [65, 78, 52, 43, 38, 55] as const;

	let sliderWidth = $state(500);
	let narrowWidth = $state(0);
	let wideWidth = $state(0);

	function buildOptions(containerWidth: number): Record<string, unknown> {
		const isNarrow = containerWidth < 400;
		const isMedium = containerWidth >= 400 && containerWidth < 600;

		return {
			chart: {
				type: 'bar',
				toolbar: { show: false },
				fontFamily: 'inherit',
				background: 'transparent',
				animations: { enabled: true, speed: 400 },
			},
			series: [{ name: 'Satisfaction', data: [...seriesData] }],
			xaxis: {
				categories: [...categories],
				labels: {
					rotate: isNarrow ? -45 : 0,
					rotateAlways: isNarrow,
					style: { fontSize: isNarrow ? '9px' : '11px' },
				},
			},
			yaxis: {
				max: 100,
				tickAmount: isNarrow ? 3 : 5,
				labels: {
					formatter: (val: number) => `${val}%`,
					style: { fontSize: isNarrow ? '9px' : '11px' },
				},
			},
			plotOptions: {
				bar: {
					borderRadius: isNarrow ? 2 : 4,
					columnWidth: isNarrow ? '70%' : isMedium ? '60%' : '50%',
					distributed: true,
				},
			},
			colors: [...PE7_COLORS],
			dataLabels: { enabled: !isNarrow },
			legend: {
				show: !isNarrow,
				position: 'top' as const,
				labels: { colors: undefined },
			},
			grid: {
				borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
				strokeDashArray: 3,
				padding: {
					left: isNarrow ? 0 : 10,
					right: isNarrow ? 0 : 10,
				},
			},
			tooltip: {
				y: { formatter: (val: number) => `${val}% satisfaction` },
			},
			theme: { mode: 'dark' },
		};
	}

	const narrowOptions = $derived(buildOptions(narrowWidth));
	const wideOptions = $derived(buildOptions(wideWidth));
	const sliderOptions = $derived(buildOptions(sliderWidth));

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';

  const PE7_COLORS = ['#7c5cfc','#3ba676','#e8a830','#d94f4f','#5b9bd5','#9b59b6'] as const;

  const categories = ['React','Svelte','Vue','Angular','Solid','Astro'] as const;
  const seriesData = [65, 78, 52, 43, 38, 55] as const;

  let sliderWidth = $state(500);
  let narrowWidth = $state(0);
  let wideWidth = $state(0);

  function buildOptions(containerWidth: number): Record<string, unknown> {
    const isNarrow = containerWidth < 400;
    const isMedium = containerWidth >= 400 && containerWidth < 600;

    return {
      chart: {
        type: 'bar', toolbar: { show: false },
        fontFamily: 'inherit', background: 'transparent',
      },
      series: [{ name: 'Satisfaction', data: [...seriesData] }],
      xaxis: {
        categories: [...categories],
        labels: {
          rotate: isNarrow ? -45 : 0,
          rotateAlways: isNarrow,
          style: { fontSize: isNarrow ? '9px' : '11px' },
        },
      },
      yaxis: {
        max: 100,
        tickAmount: isNarrow ? 3 : 5,
        labels: { formatter: (val: number) => \`\${val}%\` },
      },
      plotOptions: {
        bar: {
          borderRadius: isNarrow ? 2 : 4,
          columnWidth: isNarrow ? '70%' : isMedium ? '60%' : '50%',
          distributed: true,
        },
      },
      colors: [...PE7_COLORS],
      dataLabels: { enabled: !isNarrow },
      legend: { show: !isNarrow, position: 'top' },
      theme: { mode: 'dark' },
    };
  }

  const narrowOptions = $derived(buildOptions(narrowWidth));
  const wideOptions = $derived(buildOptions(wideWidth));
  const sliderOptions = $derived(buildOptions(sliderWidth));
<\/script>

<section class="page">
  <h1>AC.9 — Responsive Chart Patterns</h1>
  <div class="narrow-container" bind:clientWidth={narrowWidth}>
    <ApexChart options={narrowOptions} height="280px" />
  </div>
  <div class="wide-container" bind:clientWidth={wideWidth}>
    <ApexChart options={wideOptions} height="280px" />
  </div>
  <input type="range" min="200" max="800" bind:value={sliderWidth} />
  <div style:max-inline-size="{sliderWidth}px" bind:clientWidth={sliderWidth}>
    <ApexChart options={sliderOptions} height="280px" />
  </div>
</section>`;
</script>

<section class="page">
	<h1>AC.9 — Responsive Chart Patterns</h1>

	<p class="concept">
		<strong>Concept.</strong> ApexCharts has a <code>responsive[]</code> config array for
		viewport-based breakpoints. But for true <em>component-level</em> responsiveness, combine
		Svelte's <code>bind:clientWidth</code> on the container to derive chart options from the
		container width, not the viewport. Legend visibility, label rotation, tick count, and column
		width should all adapt based on available space. This is the pattern for charts inside
		resizable panels, sidebars, and dashboard grids.
	</p>

	<div class="build">
		<h4>Narrow container (max 300px) — labels rotated, legend hidden</h4>
		<div class="narrow-container" bind:clientWidth={narrowWidth}>
			<ApexChart options={narrowOptions} height="280px" />
		</div>
	</div>

	<div class="build">
		<h4>Full-width container — full legend, horizontal labels</h4>
		<div class="wide-container" bind:clientWidth={wideWidth}>
			<ApexChart options={wideOptions} height="280px" />
		</div>
	</div>

	<div class="build">
		<div class="slider-header">
			<h4>Adjustable container — drag the slider</h4>
			<span class="width-display">{sliderWidth}px</span>
		</div>
		<input
			class="width-slider"
			type="range"
			min="200"
			max="800"
			step="10"
			bind:value={sliderWidth}
		/>
		<div class="slider-container" style:max-inline-size="{sliderWidth}px">
			<ApexChart options={sliderOptions} height="280px" />
		</div>
		<p class="chart-note">
			Touch-friendly: on mobile, tooltips use <code>followCursor</code> for easier targeting on small screens.
		</p>
		<p class="chart-note">
			Shareable config (SvelteURL): <code>{configUrl.href}</code>
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Responsive charts must adapt to container width, not just viewport size. Break the responsive logic to understand why container queries matter.</p>
	<ol class="experiments">
		<li><strong>Remove <code>bind:clientWidth</code> and hardcode <code>narrowWidth</code> to <code>600</code>.</strong> The narrow container renders with wide-layout options (horizontal labels, visible legend) even though it is only 300px wide. Labels overflow and overlap. This demonstrates why the chart options must be derived from actual container width.</li>
		<li><strong>Keep <code>dataLabels.enabled: true</code> for the narrow container.</strong> The data labels crowd and overlap because there is not enough horizontal space for both bars and labels at 300px width. Hiding labels below a width threshold is a readability requirement, not a preference.</li>
		<li><strong>Remove the <code>rotate: -45</code> label rotation for narrow widths.</strong> Category labels (React, Svelte, Vue...) overlap horizontally and become illegible. Rotation is the standard solution for fitting text in tight horizontal spaces.</li>
		<li><strong>Use ApexCharts' built-in <code>responsive[]</code> array instead of <code>bind:clientWidth</code>.</strong> Resize the slider container. The chart does not adapt because ApexCharts' responsive breakpoints are viewport-based, not container-based. The slider container's width has no effect on viewport-based breakpoints.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's <code>bind:clientWidth</code> gives container-level responsiveness rather than viewport breakpoints. Deriving chart options from the container width lets the same chart component adapt gracefully whether it is placed in a full-width layout, a sidebar, a modal, or a resizable dashboard panel. This is component-level responsiveness.</p>
	<p class="prose">Narrow charts need several adaptations for readability: labels should rotate to avoid overlap, legends should hide to save vertical space, tick counts should decrease to prevent crowding, and data labels should be disabled when bars are too narrow to accommodate text. The <code>distributed: true</code> flag gives each bar its own color from the palette, which helps identification when the legend is hidden.</p>
	<p class="prose">ApexCharts' built-in <code>responsive[]</code> configuration array uses viewport-based breakpoints, which do not respond to container size changes. For charts inside resizable panels, sidebars, or CSS Grid layouts, <code>bind:clientWidth</code> combined with <code>$derived</code> options is the correct approach.</p>
	<p class="next">Next up: AC.10 composes a multi-chart dashboard with cross-chart filtering and PNG export.</p>
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

	.narrow-container {
		max-inline-size: 300px;
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
	}

	.wide-container {
		inline-size: 100%;
	}

	.slider-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
	}

	.width-display {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-brand);
		font-variant-numeric: tabular-nums;
	}

	.width-slider {
		inline-size: 100%;
		accent-color: var(--color-brand);
		cursor: pointer;
	}

	.slider-container {
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
		transition: max-inline-size var(--dur-fast) var(--ease-out);
	}

	.chart-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
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
