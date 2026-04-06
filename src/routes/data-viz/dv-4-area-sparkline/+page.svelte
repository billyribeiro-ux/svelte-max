<script lang="ts">
	interface Metric {
		name: string;
		unit: string;
		values: number[];
		color: string;
	}

	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	const metrics: Metric[] = [
		{
			name: 'Monthly Active Users',
			unit: 'K',
			values: [124, 131, 128, 142, 155, 163, 158, 172, 185, 198, 210, 224],
			color: 'oklch(65% 0.22 270)'
		},
		{
			name: 'Revenue',
			unit: '$K',
			values: [89, 94, 91, 102, 108, 115, 122, 118, 131, 140, 148, 156],
			color: 'oklch(60% 0.20 155)'
		},
		{
			name: 'Churn Rate',
			unit: '%',
			values: [4.2, 3.8, 4.1, 3.6, 3.4, 3.1, 3.3, 2.9, 2.7, 2.5, 2.4, 2.2],
			color: 'oklch(65% 0.22 25)'
		},
		{
			name: 'NPS Score',
			unit: '',
			values: [42, 44, 43, 47, 49, 52, 51, 55, 58, 60, 63, 67],
			color: 'oklch(65% 0.20 90)'
		}
	];

	let selectedIdx = $state(0);

	const selected = $derived(metrics[selectedIdx]);

	function pctChange(vals: number[]): number {
		const first = vals[0];
		const last = vals[vals.length - 1];
		return first === 0 ? 0 : ((last - first) / Math.abs(first)) * 100;
	}

	function sparklinePath(vals: number[], w: number, h: number): string {
		const min = Math.min(...vals);
		const max = Math.max(...vals);
		const range = max - min || 1;
		const points = vals.map((v, i) => ({
			x: (i / (vals.length - 1)) * w,
			y: h - ((v - min) / range) * h
		}));
		const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
		const area = `${line} L${w},${h} L0,${h} Z`;
		return area;
	}

	function sparklineStroke(vals: number[], w: number, h: number): string {
		const min = Math.min(...vals);
		const max = Math.max(...vals);
		const range = max - min || 1;
		const points = vals.map((v, i) => ({
			x: (i / (vals.length - 1)) * w,
			y: h - ((v - min) / range) * h
		}));
		return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
	}

	// Full area chart dimensions
	const chartW = 640;
	const chartH = 300;
	const pad = { top: 20, right: 20, bottom: 40, left: 55 };
	const plotW = chartW - pad.left - pad.right;
	const plotH = chartH - pad.top - pad.bottom;

	const areaChartData = $derived.by(() => {
		const vals = selected.values;
		const min = Math.min(...vals) * 0.8;
		const max = Math.max(...vals) * 1.1;
		const range = max - min || 1;

		const points = vals.map((v, i) => ({
			x: (i / (vals.length - 1)) * plotW,
			y: plotH - ((v - min) / range) * plotH,
			val: v
		}));

		const line = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
		const area = `${line} L${plotW},${plotH} L0,${plotH} Z`;

		const yMin = min;
		const yMax = max;
		const yStep = (yMax - yMin) / 4;
		const yTicks = Array.from({ length: 5 }, (_, i) => yMin + yStep * i);

		return { points, line, area, yTicks, yMin, yMax };
	});

	function selectMetric(idx: number): void {
		selectedIdx = idx;
	}
</script>

<section class="page">
	<h1>DV.4 — Area Chart + Sparkline</h1>
	<p class="concept">
		<strong>Concept.</strong> An area chart is a line chart with the space below filled — use
		<code>&lt;path&gt;</code> with the line path plus a baseline closure
		(<code>L xN,baseline L x0,baseline Z</code>). Sparklines are tiny inline charts — no axes,
		no labels, just the shape. They communicate trends at a glance (think stock tickers, dashboard
		KPIs). Build both from the same data and scale logic.
	</p>

	<div class="build">
		<div class="kpi-grid">
			{#each metrics as metric, i (metric.name)}
				{@const change = pctChange(metric.values)}
				{@const isDown = change < 0}
				{@const isSelected = selectedIdx === i}
				<button
					class="kpi-card"
					class:selected={isSelected}
					onclick={() => selectMetric(i)}
				>
					<span class="kpi-name">{metric.name}</span>
					<span class="kpi-value">
						{metric.values[metric.values.length - 1]}{metric.unit}
					</span>
					<span class="kpi-change" class:down={isDown}>
						{isDown ? '' : '+'}{change.toFixed(1)}%
					</span>
					<svg viewBox="0 0 60 20" class="sparkline" aria-hidden="true">
						<path
							d={sparklinePath(metric.values, 60, 20)}
							fill={metric.color}
							opacity="0.2"
						/>
						<path
							d={sparklineStroke(metric.values, 60, 20)}
							fill="none"
							stroke={metric.color}
							stroke-width="1.5"
							stroke-linejoin="round"
						/>
					</svg>
				</button>
			{/each}
		</div>

		<svg viewBox="0 0 {chartW} {chartH}" class="area-chart" role="img" aria-label="Area chart of {selected.name}">
			<defs>
				<linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color={selected.color} stop-opacity="0.35" />
					<stop offset="100%" stop-color={selected.color} stop-opacity="0.03" />
				</linearGradient>
			</defs>
			<g transform="translate({pad.left}, {pad.top})">
				<!-- y gridlines -->
				{#each areaChartData.yTicks as tick, i}
					{@const y = plotH - ((tick - areaChartData.yMin) / (areaChartData.yMax - areaChartData.yMin)) * plotH}
					<line x1={0} y1={y} x2={plotW} y2={y} class="gridline" />
					<text x={-8} y={y + 4} class="tick-label" text-anchor="end">
						{tick.toFixed(tick < 10 ? 1 : 0)}{selected.unit}
					</text>
				{/each}

				<!-- x axis months -->
				<line x1={0} y1={plotH} x2={plotW} y2={plotH} class="axis-line" />
				{#each months as month, i}
					{@const x = (i / (months.length - 1)) * plotW}
					<text x={x} y={plotH + 18} class="tick-label" text-anchor="middle">
						{month}
					</text>
				{/each}

				<!-- area fill -->
				<path d={areaChartData.area} fill="url(#area-fill)" />

				<!-- line -->
				<path
					d={areaChartData.line}
					fill="none"
					stroke={selected.color}
					stroke-width={2}
					stroke-linejoin="round"
					stroke-linecap="round"
				/>

				<!-- dots -->
				{#each areaChartData.points as pt, i (i)}
					<circle cx={pt.x} cy={pt.y} r={3} fill={selected.color} />
				{/each}
			</g>
		</svg>

		<p class="chart-title">
			<strong>{selected.name}</strong> — 12-month trend
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>An area chart closes the line path back to the baseline with <code>L xN,plotH L 0,plotH Z</code>.</li>
		<li><code>&lt;linearGradient&gt;</code> in <code>&lt;defs&gt;</code> creates the fade-to-transparent fill effect.</li>
		<li>Sparklines are tiny area charts (60x20px) — same math, no axes, embedded in KPI cards.</li>
		<li><code>$state</code> tracks which metric is selected; clicking a card switches the full chart.</li>
		<li>Percent-change pills with conditional coloring communicate trend direction at a glance.</li>
	</ul>
</section>

<style>
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
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
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}

	.kpi-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: var(--space-sm);
	}
	.kpi-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding: var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background: var(--color-surface);
		cursor: pointer;
		text-align: start;
		transition: border-color var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);
		font-family: inherit;
		color: inherit;
	}
	.kpi-card:hover {
		border-color: var(--color-text-muted);
	}
	.kpi-card.selected {
		border-color: var(--color-brand);
		box-shadow: 0 0 0 2px oklch(65% 0.22 270 / 0.2);
	}
	.kpi-name {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 500;
	}
	.kpi-value {
		font-size: var(--text-lg);
		font-weight: 700;
		color: var(--color-text);
	}
	.kpi-change {
		font-size: var(--text-xs);
		font-weight: 600;
		color: oklch(55% 0.18 155);
		padding: 2px 6px;
		border-radius: var(--radius-full);
		background: oklch(90% 0.06 155);
		align-self: flex-start;
	}
	.kpi-change.down {
		color: oklch(55% 0.18 25);
		background: oklch(90% 0.06 25);
	}
	.sparkline {
		width: 60px;
		height: 20px;
		align-self: flex-end;
		margin-block-start: auto;
	}
	.area-chart {
		width: 100%;
		max-width: 680px;
		height: auto;
	}
	.gridline {
		stroke: var(--color-border);
		stroke-width: 1;
		stroke-dasharray: 3 3;
	}
	.axis-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
	}
	.tick-label {
		font-size: 10px;
		fill: var(--color-text-muted);
	}
	.chart-title {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	.chart-title strong {
		color: var(--color-text);
	}
</style>
