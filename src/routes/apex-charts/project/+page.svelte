<script lang="ts">
	import ApexChart from '$lib/components/ApexChart.svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { onMount } from 'svelte';
	import type { TimeSeriesPoint, HeatmapPoint } from '$lib/types/apex';

	const PE7_COLORS = [
		'#7c5cfc',
		'#3ba676',
		'#e8a830',
		'#d94f4f',
		'#5b9bd5',
		'#9b59b6',
	] as const;

	/* ── Theme (AC.8 pattern) ── */
	interface ResolvedTheme {
		text: string;
		muted: string;
		border: string;
		mode: 'dark' | 'light';
	}

	const prefersDark = new MediaQuery('(prefers-color-scheme: dark)');
	const isDark = $derived(prefersDark.current);

	function resolveTheme(): ResolvedTheme {
		if (typeof document === 'undefined') {
			return { text: '#e0e0e0', muted: '#999', border: '#333', mode: 'dark' };
		}
		const s = getComputedStyle(document.documentElement);
		return {
			text: s.getPropertyValue('--color-text').trim() || (isDark ? '#e0e0e0' : '#1a1a1a'),
			muted: s.getPropertyValue('--color-text-muted').trim() || (isDark ? '#999' : '#666'),
			border: s.getPropertyValue('--color-border').trim() || (isDark ? '#333' : '#ddd'),
			mode: isDark ? 'dark' : 'light',
		};
	}

	let theme: ResolvedTheme = $state(resolveTheme());

	$effect(() => {
		const _trigger = isDark;
		const id = setTimeout(() => { theme = resolveTheme(); }, 50);
		return () => clearTimeout(id);
	});

	/* ── Date range ── */
	type TimeRange = '1h' | '6h' | '24h' | '7d' | '30d';
	let timeRange: TimeRange = $state('24h');
	let autoRefresh = $state(true);

	const timeRangeLabels: Record<TimeRange, string> = {
		'1h': '1 Hour',
		'6h': '6 Hours',
		'24h': '24 Hours',
		'7d': '7 Days',
		'30d': '30 Days',
	};

	/* ── KPI Gauges (AC.4 pattern) ── */
	const kpis = [
		{ label: 'Conversion Rate', value: 73, suffix: '%' },
		{ label: 'Avg Session', value: 84, suffix: 's' },
		{ label: 'Bounce Rate', value: 38, suffix: '%' },
		{ label: 'Revenue Target', value: 91, suffix: '%' },
	] as const;

	function buildKpiOptions(index: number): Record<string, unknown> {
		const kpi = kpis[index];
		return {
			chart: {
				type: 'radialBar',
				toolbar: { show: false },
				fontFamily: 'inherit',
				background: 'transparent',
				sparkline: { enabled: true },
			},
			series: [kpi.value],
			labels: [kpi.label],
			colors: [PE7_COLORS[index]],
			plotOptions: {
				radialBar: {
					hollow: { size: '60%' },
					dataLabels: {
						name: { show: true, fontSize: '11px', offsetY: -8 },
						value: {
							show: true,
							fontSize: '20px',
							fontWeight: 700,
							offsetY: 4,
							formatter: (val: number) => `${val}${kpi.suffix}`,
						},
					},
					track: {
						background: 'color-mix(in oklch, currentColor 8%, transparent)',
						strokeWidth: '100%',
					},
				},
			},
			stroke: { lineCap: 'round' },
			theme: { mode: theme.mode },
		};
	}

	const kpiOptions = $derived(kpis.map((_, i) => buildKpiOptions(i)));

	/* ── Real-time area chart (AC.6 pattern) ── */
	const RT_WINDOW = 30;

	function pageViewValue(): number {
		return Math.round(200 + Math.random() * 300 + Math.sin(Date.now() / 5000) * 80);
	}

	function initialRtData(): TimeSeriesPoint[] {
		const now = Date.now();
		return Array.from({ length: RT_WINDOW }, (_, i) => ({
			x: now - (RT_WINDOW - 1 - i) * 2000,
			y: pageViewValue(),
		}));
	}

	let rtSeries: TimeSeriesPoint[] = $state(initialRtData());
	let filteredHour: number | null = $state(null);

	$effect(() => {
		if (!autoRefresh) return;
		const id = setInterval(() => {
			const next: TimeSeriesPoint = { x: Date.now(), y: pageViewValue() };
			rtSeries = [...rtSeries.slice(-(RT_WINDOW - 1)), next];
		}, 2000);
		return () => clearInterval(id);
	});

	const areaOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'area',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			animations: {
				enabled: true,
				easing: 'linear',
				dynamicAnimation: { speed: 1800 },
			},
		},
		series: [{
			name: filteredHour !== null ? `Page Views (${String(filteredHour).padStart(2, '0')}:00)` : 'Page Views',
			data: rtSeries,
		}],
		colors: [PE7_COLORS[0]],
		xaxis: {
			type: 'datetime',
			labels: {
				datetimeUTC: false,
				format: 'HH:mm:ss',
				style: { colors: theme.muted, fontSize: '10px' },
			},
			axisBorder: { color: theme.border },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `${val}`,
				style: { colors: theme.muted, fontSize: '10px' },
			},
		},
		stroke: { curve: 'smooth', width: 2 },
		fill: {
			type: 'gradient',
			gradient: { shadeIntensity: 0.4, opacityFrom: 0.4, opacityTo: 0.05, stops: [0, 95, 100] },
		},
		dataLabels: { enabled: false },
		grid: {
			borderColor: theme.border,
			strokeDashArray: 3,
		},
		tooltip: {
			theme: theme.mode,
			x: { format: 'HH:mm:ss' },
		},
		theme: { mode: theme.mode },
	});

	/* ── Stacked bar: traffic sources by day (AC.2 pattern) ── */
	const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

	const trafficSeries = [
		{ name: 'Organic', data: [320, 380, 350, 400, 420, 280, 240] },
		{ name: 'Direct', data: [180, 200, 190, 220, 210, 150, 130] },
		{ name: 'Social', data: [90, 110, 100, 120, 130, 95, 80] },
		{ name: 'Referral', data: [50, 60, 55, 70, 65, 40, 35] },
	] as const;

	const stackedBarOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'bar',
			stacked: true,
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: trafficSeries.map((s) => ({ name: s.name, data: [...s.data] })),
		colors: [PE7_COLORS[1], PE7_COLORS[4], PE7_COLORS[5], PE7_COLORS[2]],
		xaxis: {
			categories: [...dayLabels],
			labels: { style: { colors: theme.muted, fontSize: '11px' } },
			axisBorder: { color: theme.border },
		},
		yaxis: {
			labels: {
				formatter: (val: number) => `${val}`,
				style: { colors: theme.muted, fontSize: '10px' },
			},
		},
		plotOptions: {
			bar: { borderRadius: 3, columnWidth: '55%' },
		},
		dataLabels: { enabled: false },
		legend: {
			position: 'top' as const,
			labels: { colors: theme.text },
		},
		grid: {
			borderColor: theme.border,
			strokeDashArray: 3,
		},
		tooltip: { theme: theme.mode },
		theme: { mode: theme.mode },
	});

	/* ── Heatmap: user activity by hour x day (AC.5 pattern) ── */
	const hours = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, '0')}:00`);

	function generateActivity(day: number): HeatmapPoint[] {
		return hours.map((hour, h) => {
			const isWeekend = day >= 5;
			const isPeak = h >= 9 && h <= 17;
			const isEvening = h >= 18 && h <= 22;
			let base: number;
			if (isWeekend) base = isPeak ? 30 : isEvening ? 25 : 8;
			else base = isPeak ? 70 : isEvening ? 45 : 10;
			const jitter = Math.round((Math.sin(day * 11 + h * 7) * 0.5 + 0.5) * 20 - 10);
			return { x: hour, y: Math.max(0, Math.min(100, base + jitter)) };
		});
	}

	const heatmapSeries = dayLabels.map((name, i) => ({
		name,
		data: generateActivity(i),
	}));

	const heatmapOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'heatmap',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
			events: {
				dataPointSelection: (
					_e: Event,
					_chart: unknown,
					config: { dataPointIndex: number }
				) => {
					const clickedHour = config.dataPointIndex;
					filteredHour = filteredHour === clickedHour ? null : clickedHour;
				},
			},
		},
		series: heatmapSeries.map((s) => ({ name: s.name, data: [...s.data] })),
		xaxis: {
			type: 'category',
			labels: {
				style: { colors: theme.muted, fontSize: '9px' },
				rotate: -45,
				rotateAlways: true,
			},
		},
		yaxis: {
			labels: { style: { colors: theme.muted, fontSize: '10px' } },
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
			labels: { colors: theme.text },
		},
		grid: { padding: { right: 10 } },
		tooltip: {
			theme: theme.mode,
			y: { formatter: (val: number) => `${val} sessions` },
		},
		theme: { mode: theme.mode },
	});

	/* ── Donut: device breakdown (AC.4 pattern) ── */
	const deviceLabels = ['Desktop', 'Mobile', 'Tablet', 'Other'] as const;
	const deviceValues = [52, 35, 9, 4] as const;

	const donutOptions = $derived<Record<string, unknown>>({
		chart: {
			type: 'donut',
			toolbar: { show: false },
			fontFamily: 'inherit',
			background: 'transparent',
		},
		series: [...deviceValues],
		labels: [...deviceLabels],
		colors: [PE7_COLORS[0], PE7_COLORS[1], PE7_COLORS[2], PE7_COLORS[4]],
		plotOptions: {
			pie: {
				donut: {
					size: '58%',
					labels: {
						show: true,
						name: { show: true, fontSize: '12px' },
						value: { show: true, fontSize: '18px', fontWeight: 700 },
						total: {
							show: true,
							label: 'Users',
							fontSize: '11px',
							formatter: () => '100%',
						},
					},
				},
			},
		},
		dataLabels: {
			enabled: true,
			formatter: (val: number) => `${val.toFixed(0)}%`,
			style: { fontSize: '11px' },
		},
		legend: {
			position: 'bottom' as const,
			labels: { colors: theme.text },
		},
		stroke: { width: 2 },
		tooltip: {
			theme: theme.mode,
			y: { formatter: (val: number) => `${val}%` },
		},
		theme: { mode: theme.mode },
	});

	/* ── GSAP entrance (AC.7 pattern) ── */
	let chartCards: HTMLDivElement[] = $state([]);
	let reducedMotion = $state(false);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		const handler = (e: MediaQueryListEvent) => { reducedMotion = e.matches; };
		mq.addEventListener('change', handler);

		if (!reducedMotion) {
			initEntranceAnimations();
		}

		return () => mq.removeEventListener('change', handler);
	});

	async function initEntranceAnimations(): Promise<void> {
		const gsapModule = await import('gsap');
		const gsap = gsapModule.default;

		chartCards.forEach((el, i) => {
			if (!el) return;
			gsap.fromTo(
				el,
				{ opacity: 0, y: 30 },
				{
					opacity: 1,
					y: 0,
					duration: 0.6,
					delay: 0.1 + i * 0.12,
					ease: 'power2.out',
				}
			);
		});
	}
</script>

<section class="page command-center">
	<header class="cc-header">
		<h1>Analytics Command Center</h1>
		<div class="cc-controls">
			<div class="range-selector">
				{#each Object.entries(timeRangeLabels) as [key, label]}
					<button
						class:active={timeRange === key}
						onclick={() => (timeRange = key as TimeRange)}
					>
						{label}
					</button>
				{/each}
			</div>
			<button
				class="refresh-toggle"
				class:active={autoRefresh}
				onclick={() => (autoRefresh = !autoRefresh)}
			>
				{autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
			</button>
		</div>
	</header>

	<!-- KPI Row -->
	<div class="kpi-row">
		{#each kpis as kpi, i}
			<div class="kpi-card">
				<ApexChart options={kpiOptions[i]} height="160px" />
			</div>
		{/each}
	</div>

	<!-- Chart Grid -->
	<div class="chart-grid">
		<div
			class="chart-card"
			class:no-motion={reducedMotion}
			bind:this={chartCards[0]}
		>
			<h4>
				Real-time Page Views
				{#if filteredHour !== null}
					<span class="filter-tag">Hour: {String(filteredHour).padStart(2, '0')}:00</span>
					<button class="clear-filter" onclick={() => (filteredHour = null)}>Clear</button>
				{/if}
			</h4>
			<ApexChart options={areaOptions} height="280px" />
		</div>

		<div
			class="chart-card"
			class:no-motion={reducedMotion}
			bind:this={chartCards[1]}
		>
			<h4>Traffic Sources by Day</h4>
			<ApexChart options={stackedBarOptions} height="280px" />
		</div>

		<div
			class="chart-card"
			class:no-motion={reducedMotion}
			bind:this={chartCards[2]}
		>
			<h4>User Activity Heatmap <span class="click-hint">(click cell to filter area chart)</span></h4>
			<ApexChart options={heatmapOptions} height="280px" />
		</div>

		<div
			class="chart-card"
			class:no-motion={reducedMotion}
			bind:this={chartCards[3]}
		>
			<h4>Device Breakdown</h4>
			<ApexChart options={donutOptions} height="280px" />
		</div>
	</div>

	<!-- Footer -->
	<footer class="cc-footer">
		<p>
			Built with: AC.1 Installing ApexCharts, AC.2 Bar & Column, AC.3 Line & Area,
			AC.4 Donut & Radial, AC.5 Heatmap & Treemap, AC.6 Real-time State,
			AC.7 Animated Transitions, AC.8 Dark Mode Tokens, AC.9 Responsive Patterns,
			AC.10 Composite Dashboard
		</p>
	</footer>
</section>

<style>
	.command-center {
		--cc-accent: oklch(60% 0.16 250);
	}

	h1 {
		text-wrap: balance;
		font-size: var(--text-xl);
	}

	h4 {
		text-wrap: balance;
		font-size: var(--text-sm);
		font-weight: 600;
		color: var(--color-text-muted);
		margin: 0;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: var(--space-xs);
	}

	/* ── Header ── */
	.cc-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		margin-block-end: var(--space-lg);
	}

	.cc-controls {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-sm);
	}

	.range-selector {
		display: flex;
		gap: 2px;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;

		& button {
			padding: var(--space-xs) var(--space-sm);
			border: none;
			background: var(--color-surface-2);
			color: var(--color-text-muted);
			font-size: var(--text-xs);
			font-weight: 600;
			cursor: pointer;
			transition: all var(--dur-fast) var(--ease-out);

			&:hover {
				background: color-mix(in oklch, var(--cc-accent) 15%, transparent);
			}

			&.active {
				background: var(--cc-accent);
				color: white;
			}
		}
	}

	.refresh-toggle {
		padding: var(--space-xs) var(--space-md);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		font-size: var(--text-xs);
		font-weight: 600;
		cursor: pointer;
		transition: all var(--dur-fast) var(--ease-out);

		&:hover {
			border-color: var(--cc-accent);
		}

		&.active {
			background: color-mix(in oklch, var(--cc-accent) 15%, transparent);
			border-color: var(--cc-accent);
			color: var(--cc-accent);
		}
	}

	/* ── KPI Row ── */
	.kpi-row {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--space-md);
		margin-block-end: var(--space-lg);
	}

	.kpi-card {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-sm);
		box-shadow: var(--shadow-sm);
	}

	/* ── Chart Grid ── */
	.chart-grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-lg);
		margin-block-end: var(--space-xl);
	}

	.chart-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		opacity: 0;
		transform: translateY(30px);

		&.no-motion {
			opacity: 1;
			transform: none;
		}
	}

	.filter-tag {
		font-size: var(--text-xs);
		color: var(--cc-accent);
		font-weight: 700;
		background: color-mix(in oklch, var(--cc-accent) 12%, transparent);
		padding: 2px var(--space-xs);
		border-radius: var(--radius-xs);
	}

	.clear-filter {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xs);
		padding: 1px var(--space-xs);
		cursor: pointer;
		transition: color var(--dur-fast) var(--ease-out);

		&:hover {
			color: var(--cc-accent);
			border-color: var(--cc-accent);
		}
	}

	.click-hint {
		font-size: var(--text-xs);
		font-weight: 400;
		color: color-mix(in oklch, var(--color-text-muted) 70%, transparent);
	}

	/* ── Footer ── */
	.cc-footer {
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-lg);

		& p {
			font-size: var(--text-xs);
			color: var(--color-text-muted);
			line-height: 1.6;
			text-wrap: balance;
			margin: 0;
		}
	}

	/* ── Responsive ── */
	@media (min-width: 480px) {
		.kpi-row { grid-template-columns: repeat(4, 1fr); }

		.cc-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}
	}

	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		.chart-grid { grid-template-columns: 1fr 1fr; }
	}

	@media (min-width: 1024px) {
		.range-selector button {
			padding: var(--space-xs) var(--space-md);
			font-size: var(--text-sm);
		}
	}
</style>
