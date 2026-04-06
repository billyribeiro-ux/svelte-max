<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import type { TimeSeriesPoint } from '$lib/types/apex';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	const WINDOW_SIZE = 30;

	function cpuValue(): number {
		return Math.round(35 + Math.random() * 40 + Math.sin(Date.now() / 3000) * 15);
	}

	function initialData(): TimeSeriesPoint[] {
		const now = Date.now();
		return Array.from({ length: WINDOW_SIZE }, (_, i) => ({
			x: now - (WINDOW_SIZE - 1 - i) * 1000,
			y: cpuValue(),
		}));
	}

	// $state.raw — large array swapped wholesale on each tick; raw avoids deep proxy overhead
	let series: TimeSeriesPoint[] = $state.raw(initialData());
	let running = $state(true);

	$effect(() => {
		if (!running) return;

		const id = setInterval(() => {
			const next: TimeSeriesPoint = { x: Date.now(), y: cpuValue() };
			series = [...series.slice(-(WINDOW_SIZE - 1)), next];
		}, 1000);

		return () => clearInterval(id);
	});

	const chartOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'line',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: {
				enabled: true,
				easing: 'linear',
				dynamicAnimation: { speed: 900 },
			},
		},
		series: [{ name: 'CPU %', data: series }],
		colors: [PE7_COLORS[0]],
		xaxis: {
			type: 'datetime',
			labels: {
				datetimeUTC: false,
				format: 'HH:mm:ss',
				style: { fontSize: '10px' },
			},
			range: WINDOW_SIZE * 1000,
		},
		yaxis: {
			min: 0,
			max: 100,
			labels: {
				formatter: (val: number) => `${val}%`,
				style: { fontSize: '11px' },
			},
		},
		stroke: { curve: 'smooth', width: 2.5 },
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 0.4,
				opacityFrom: 0.35,
				opacityTo: 0.05,
				stops: [0, 95, 100],
			},
		},
		grid: {
			borderColor: 'color-mix(in oklch, currentColor 10%, transparent)',
			strokeDashArray: 3,
		},
		dataLabels: { enabled: false },
		tooltip: {
			x: { format: 'HH:mm:ss' },
			y: { formatter: (val: number) => `${val}%` },
		},
		theme: { mode: 'dark' },
	});

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';
  import type { TimeSeriesPoint } from '$lib/types/apex';

  const PE7_COLORS = ['#7c5cfc','#3ba676','#e8a830','#d94f4f','#5b9bd5','#9b59b6'] as const;
  const WINDOW_SIZE = 30;

  function cpuValue(): number {
    return Math.round(35 + Math.random() * 40 + Math.sin(Date.now() / 3000) * 15);
  }

  function initialData(): TimeSeriesPoint[] {
    const now = Date.now();
    return Array.from({ length: WINDOW_SIZE }, (_, i) => ({
      x: now - (WINDOW_SIZE - 1 - i) * 1000,
      y: cpuValue(),
    }));
  }

  let series: TimeSeriesPoint[] = $state(initialData());
  let running = $state(true);

  $effect(() => {
    if (!running) return;
    const id = setInterval(() => {
      const next: TimeSeriesPoint = { x: Date.now(), y: cpuValue() };
      series = [...series.slice(-(WINDOW_SIZE - 1)), next];
    }, 1000);
    return () => clearInterval(id);
  });

  const chartOptions = $derived<Record<string, unknown>>({
    chart: {
      type: 'line', toolbar: { show: false }, fontFamily: 'inherit',
      background: 'transparent',
      animations: { enabled: true, easing: 'linear', dynamicAnimation: { speed: 900 } },
    },
    series: [{ name: 'CPU %', data: series }],
    colors: [PE7_COLORS[0]],
    xaxis: {
      type: 'datetime',
      labels: { datetimeUTC: false, format: 'HH:mm:ss', style: { fontSize: '10px' } },
      range: WINDOW_SIZE * 1000,
    },
    yaxis: {
      min: 0, max: 100,
      labels: { formatter: (val: number) => \`\${val}%\`, style: { fontSize: '11px' } },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    fill: {
      type: 'gradient',
      gradient: { shadeIntensity: 0.4, opacityFrom: 0.35, opacityTo: 0.05, stops: [0, 95, 100] },
    },
    grid: { borderColor: 'color-mix(in oklch, currentColor 10%, transparent)', strokeDashArray: 3 },
    dataLabels: { enabled: false },
    tooltip: { x: { format: 'HH:mm:ss' }, y: { formatter: (val: number) => \`\${val}%\` } },
    theme: { mode: 'dark' },
  });
<\/script>

<section class="page">
  <h1>AC.6 — Real-time Updates with $state</h1>
  ...
</section>`;
</script>

<section class="page">
	<h1>AC.6 — Real-time Updates with $state</h1>

	<p class="concept">
		<strong>Concept.</strong> Production dashboards update live. ApexCharts supports smooth data
		transitions via <code>chart.updateSeries()</code>. In Svelte 5, store the series in
		<code>$state</code>, update via <code>setInterval</code>, and let reactivity drive the
		chart. The key pattern is a <em>sliding window</em> — keep the last N points and shift old
		ones out. The <code>$effect</code> cleanup function clears the interval when the component
		unmounts or when the reactive dependency (<code>running</code>) changes, preventing memory
		leaks.
	</p>

	<div class="build">
		<div class="chart-header">
			<h4>CPU Usage — Live stream (last {WINDOW_SIZE}s)</h4>
			<button
				class="toggle-btn"
				class:paused={!running}
				onclick={() => (running = !running)}
			>
				{running ? 'Pause' : 'Resume'}
			</button>
		</div>

		<div class="status-bar">
			<span class="status-dot" class:live={running}></span>
			<span class="status-text">{running ? 'Streaming' : 'Paused'}</span>
			<span class="status-value">
				Current: <strong>{series.at(-1)?.y ?? 0}%</strong>
			</span>
		</div>

		<ApexChart options={chartOptions} height="320px" />
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>$state</code> arrays drive ApexCharts reactivity — mutate the array, the chart updates.</li>
		<li>Sliding window: <code>series.slice(-(N-1))</code> keeps exactly N points and discards the oldest.</li>
		<li><code>$effect</code> cleanup (<code>return () =&gt; clearInterval(id)</code>) prevents memory leaks on unmount or dependency change.</li>
		<li>ApexCharts <code>dynamicAnimation</code> smoothly transitions between data states without a full re-render.</li>
		<li>Toggling a <code>$state</code> boolean re-runs the <code>$effect</code>, starting or stopping the interval cleanly.</li>
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

	.chart-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.toggle-btn {
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-brand);
		border-radius: var(--radius-sm);
		background: var(--color-brand);
		color: var(--color-surface);
		font-size: var(--text-sm);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--dur-fast) var(--ease-out);

		&:hover {
			background: color-mix(in oklch, var(--color-brand) 85%, black);
		}

		&.paused {
			background: var(--color-surface-2);
			color: var(--color-text-muted);
			border-color: var(--color-border);

			&:hover {
				border-color: var(--color-brand);
				color: var(--color-brand);
			}
		}
	}

	.status-bar {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.status-dot {
		inline-size: 8px;
		block-size: 8px;
		border-radius: 50%;
		background: var(--color-text-muted);
		transition: background var(--dur-fast) var(--ease-out);

		&.live {
			background: #3ba676;
			box-shadow: 0 0 6px #3ba676;
		}
	}

	.status-text {
		font-weight: 600;
	}

	.status-value {
		margin-inline-start: auto;

		& strong {
			color: var(--color-text);
			font-variant-numeric: tabular-nums;
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
