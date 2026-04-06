<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { MediaQuery } from 'svelte/reactivity';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	interface ResolvedTheme {
		text: string;
		muted: string;
		border: string;
		surface: string;
		mode: 'dark' | 'light';
	}

	const prefersDark = new MediaQuery('(prefers-color-scheme: dark)');
	let manualOverride: boolean | null = $state(null);

	const isDark = $derived(manualOverride !== null ? manualOverride : prefersDark.current);

	function resolveColors(): ResolvedTheme {
		if (typeof document === 'undefined') {
			return { text: '#e0e0e0', muted: '#999', border: '#333', surface: '#1a1a1a', mode: 'dark' };
		}
		const style = getComputedStyle(document.documentElement);
		return {
			text: style.getPropertyValue('--color-text').trim() || (isDark ? '#e0e0e0' : '#1a1a1a'),
			muted: style.getPropertyValue('--color-text-muted').trim() || (isDark ? '#999' : '#666'),
			border: style.getPropertyValue('--color-border').trim() || (isDark ? '#333' : '#ddd'),
			surface: style.getPropertyValue('--color-surface-1').trim() || (isDark ? '#1a1a1a' : '#fff'),
			mode: isDark ? 'dark' : 'light',
		};
	}

	let theme: ResolvedTheme = $state(resolveColors());

	$effect(() => {
		// Re-run whenever isDark changes
		const _trigger = isDark;
		/* Small delay allows CSS custom properties to settle after theme switch */
		const id = setTimeout(() => {
			theme = resolveColors();
		}, 50);
		return () => clearTimeout(id);
	});

	const chartOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'line',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: { enabled: true, speed: 500 },
		},
		series: [
			{ name: 'Sessions', data: [30, 40, 35, 50, 49, 60, 70, 65, 80, 75, 85, 90] },
			{ name: 'Conversions', data: [5, 8, 7, 12, 10, 15, 18, 14, 20, 19, 22, 25] },
		],
		colors: [PE7_COLORS[0], PE7_COLORS[1]],
		xaxis: {
			categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
			labels: { style: { colors: theme.muted, fontSize: '11px' } },
			axisBorder: { color: theme.border },
			axisTicks: { color: theme.border },
		},
		yaxis: {
			labels: {
				style: { colors: theme.muted, fontSize: '11px' },
				formatter: (val: number) => `${val}K`,
			},
		},
		stroke: { curve: 'smooth', width: 2.5 },
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: theme.text },
		},
		grid: {
			borderColor: theme.border,
			strokeDashArray: 3,
		},
		tooltip: {
			theme: theme.mode,
			y: { formatter: (val: number) => `${val}K` },
		},
		theme: { mode: theme.mode },
	});

	function toggleTheme(): void {
		if (manualOverride === null) {
			manualOverride = !prefersDark.current;
		} else {
			manualOverride = !manualOverride;
		}
	}

	function resetToSystem(): void {
		manualOverride = null;
	}

	const fullCode = `<script lang="ts">
  import ApexChart from '$lib/components/ApexChart.svelte';
  import { MediaQuery } from 'svelte/reactivity';

  const PE7_COLORS = ['#7c5cfc','#3ba676','#e8a830','#d94f4f','#5b9bd5','#9b59b6'] as const;

  interface ResolvedTheme {
    text: string;
    muted: string;
    border: string;
    surface: string;
    mode: 'dark' | 'light';
  }

  const prefersDark = new MediaQuery('(prefers-color-scheme: dark)');
  let manualOverride: boolean | null = $state(null);
  const isDark = $derived(manualOverride !== null ? manualOverride : prefersDark.current);

  function resolveColors(): ResolvedTheme {
    if (typeof document === 'undefined') {
      return { text: '#e0e0e0', muted: '#999', border: '#333', surface: '#1a1a1a', mode: 'dark' };
    }
    const style = getComputedStyle(document.documentElement);
    return {
      text: style.getPropertyValue('--color-text').trim() || (isDark ? '#e0e0e0' : '#1a1a1a'),
      muted: style.getPropertyValue('--color-text-muted').trim() || (isDark ? '#999' : '#666'),
      border: style.getPropertyValue('--color-border').trim() || (isDark ? '#333' : '#ddd'),
      surface: style.getPropertyValue('--color-surface-1').trim() || (isDark ? '#1a1a1a' : '#fff'),
      mode: isDark ? 'dark' : 'light',
    };
  }

  let theme: ResolvedTheme = $state(resolveColors());

  $effect(() => {
    const _trigger = isDark;
    const id = setTimeout(() => { theme = resolveColors(); }, 50);
    return () => clearTimeout(id);
  });

  const chartOptions = $derived<Record<string, unknown>>({
    chart: {
      type: 'line', toolbar: { show: false }, fontFamily: 'inherit',
      background: 'transparent', animations: { enabled: true, speed: 500 },
    },
    series: [
      { name: 'Sessions', data: [30,40,35,50,49,60,70,65,80,75,85,90] },
      { name: 'Conversions', data: [5,8,7,12,10,15,18,14,20,19,22,25] },
    ],
    colors: [PE7_COLORS[0], PE7_COLORS[1]],
    xaxis: {
      categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
      labels: { style: { colors: theme.muted, fontSize: '11px' } },
      axisBorder: { color: theme.border },
      axisTicks: { color: theme.border },
    },
    yaxis: {
      labels: {
        style: { colors: theme.muted, fontSize: '11px' },
        formatter: (val: number) => \`\${val}K\`,
      },
    },
    stroke: { curve: 'smooth', width: 2.5 },
    legend: { position: 'top', labels: { colors: theme.text } },
    grid: { borderColor: theme.border, strokeDashArray: 3 },
    tooltip: { theme: theme.mode, y: { formatter: (val: number) => \`\${val}K\` } },
    theme: { mode: theme.mode },
  });

  function toggleTheme(): void {
    if (manualOverride === null) manualOverride = !prefersDark.current;
    else manualOverride = !manualOverride;
  }

  function resetToSystem(): void { manualOverride = null; }
<\/script>

<section class="page">
  <h1>AC.8 — Dark Mode & PE7 Tokens</h1>
  ...
</section>`;
</script>

<section class="page">
	<h1>AC.8 — Dark Mode & PE7 Tokens</h1>

	<p class="concept">
		<strong>Concept.</strong> ApexCharts accepts color values as props, but PE7 design tokens live
		as CSS custom properties the chart library cannot read directly. The solution:
		<code>getComputedStyle(document.documentElement).getPropertyValue('--color-text')</code>
		reads the resolved token value at runtime. For reactive theme switching, watch
		<code>prefers-color-scheme: dark</code> via Svelte's <code>MediaQuery</code> from
		<code>svelte/reactivity</code>, recompute colors in <code>$effect</code>, and let the
		derived chart options feed the updated colors into ApexCharts automatically.
	</p>

	<div class="build">
		<div class="chart-header">
			<h4>Sessions & Conversions — Theme-reactive chart</h4>
			<div class="theme-controls">
				<button class="theme-btn" onclick={toggleTheme}>
					{isDark ? 'Switch to Light' : 'Switch to Dark'}
				</button>
				{#if manualOverride !== null}
					<button class="theme-btn secondary" onclick={resetToSystem}>
						Reset to System
					</button>
				{/if}
			</div>
		</div>

		<ApexChart options={chartOptions} height="320px" />

		<div class="token-display">
			<h4>Resolved token values</h4>
			<pre class="token-pre"><code>mode:    {theme.mode}
text:    {theme.text}
muted:   {theme.muted}
border:  {theme.border}
surface: {theme.surface}
source:  {manualOverride !== null ? 'manual override' : 'OS preference'}</code></pre>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>getComputedStyle</code> reads CSS custom property values at runtime for chart libraries.</li>
		<li>Svelte's <code>MediaQuery</code> from <code>svelte/reactivity</code> provides a reactive <code>.current</code> boolean.</li>
		<li>A manual override layered on top of OS preference gives users explicit control.</li>
		<li><code>$derived</code> chart options automatically recompute when the resolved theme changes.</li>
		<li>A small <code>setTimeout</code> after theme change lets CSS custom properties settle before reading.</li>
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

	.chart-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: var(--space-sm);
	}

	.theme-controls {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}

	.theme-btn {
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

		&.secondary {
			background: var(--color-surface-2);
			color: var(--color-text-muted);
			border-color: var(--color-border);

			&:hover {
				border-color: var(--color-brand);
				color: var(--color-brand);
			}
		}
	}

	.token-display {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.token-pre {
		margin: 0;
		padding: var(--space-md);
		/* light-dark() — theme-aware color function, resolves automatically based on color-scheme */
		background: light-dark(oklch(96% 0.005 270), oklch(18% 0.02 270));
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		color: var(--color-text);
		overflow-x: auto;

		& code {
			background: transparent;
			padding: 0;
			font-size: inherit;
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
