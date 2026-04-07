<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface Metric {\n" +
		"		name: string;\n" +
		"		unit: string;\n" +
		"		values: number[];\n" +
		"		color: string;\n" +
		"	}\n" +
		"\n" +
		"	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];\n" +
		"\n" +
		"	const metrics: Metric[] = [\n" +
		"		{\n" +
		"			name: 'Monthly Active Users',\n" +
		"			unit: 'K',\n" +
		"			values: [124, 131, 128, 142, 155, 163, 158, 172, 185, 198, 210, 224],\n" +
		"			color: 'oklch(65% 0.22 270)'\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Revenue',\n" +
		"			unit: '$K',\n" +
		"			values: [89, 94, 91, 102, 108, 115, 122, 118, 131, 140, 148, 156],\n" +
		"			color: 'oklch(60% 0.20 155)'\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'Churn Rate',\n" +
		"			unit: '%',\n" +
		"			values: [4.2, 3.8, 4.1, 3.6, 3.4, 3.1, 3.3, 2.9, 2.7, 2.5, 2.4, 2.2],\n" +
		"			color: 'oklch(65% 0.22 25)'\n" +
		"		},\n" +
		"		{\n" +
		"			name: 'NPS Score',\n" +
		"			unit: '',\n" +
		"			values: [42, 44, 43, 47, 49, 52, 51, 55, 58, 60, 63, 67],\n" +
		"			color: 'oklch(65% 0.20 90)'\n" +
		"		}\n" +
		"	];\n" +
		"\n" +
		"	let selectedIdx = $state(0);\n" +
		"\n" +
		"	const selected = $derived(metrics[selectedIdx]);\n" +
		"\n" +
		"	function pctChange(vals: number[]): number {\n" +
		"		const first = vals[0];\n" +
		"		const last = vals[vals.length - 1];\n" +
		"		return first === 0 ? 0 : ((last - first) / Math.abs(first)) * 100;\n" +
		"	}\n" +
		"\n" +
		"	function sparklinePath(vals: number[], w: number, h: number): string {\n" +
		"		const min = Math.min(...vals);\n" +
		"		const max = Math.max(...vals);\n" +
		"		const range = max - min || 1;\n" +
		"		const points = vals.map((v, i) =\u003e ({\n" +
		"			x: (i / (vals.length - 1)) * w,\n" +
		"			y: h - ((v - min) / range) * h\n" +
		"		}));\n" +
		"		const line = points.map((p, i) =\u003e `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');\n" +
		"		const area = `${line} L${w},${h} L0,${h} Z`;\n" +
		"		return area;\n" +
		"	}\n" +
		"\n" +
		"	function sparklineStroke(vals: number[], w: number, h: number): string {\n" +
		"		const min = Math.min(...vals);\n" +
		"		const max = Math.max(...vals);\n" +
		"		const range = max - min || 1;\n" +
		"		const points = vals.map((v, i) =\u003e ({\n" +
		"			x: (i / (vals.length - 1)) * w,\n" +
		"			y: h - ((v - min) / range) * h\n" +
		"		}));\n" +
		"		return points.map((p, i) =\u003e `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');\n" +
		"	}\n" +
		"\n" +
		"	// Full area chart dimensions\n" +
		"	const chartW = 640;\n" +
		"	const chartH = 300;\n" +
		"	const pad = { top: 20, right: 20, bottom: 40, left: 55 };\n" +
		"	const plotW = chartW - pad.left - pad.right;\n" +
		"	const plotH = chartH - pad.top - pad.bottom;\n" +
		"\n" +
		"	const areaChartData = $derived.by(() =\u003e {\n" +
		"		const vals = selected.values;\n" +
		"		const min = Math.min(...vals) * 0.8;\n" +
		"		const max = Math.max(...vals) * 1.1;\n" +
		"		const range = max - min || 1;\n" +
		"\n" +
		"		const points = vals.map((v, i) =\u003e ({\n" +
		"			x: (i / (vals.length - 1)) * plotW,\n" +
		"			y: plotH - ((v - min) / range) * plotH,\n" +
		"			val: v\n" +
		"		}));\n" +
		"\n" +
		"		const line = points.map((p, i) =\u003e `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');\n" +
		"		const area = `${line} L${plotW},${plotH} L0,${plotH} Z`;\n" +
		"\n" +
		"		const yMin = min;\n" +
		"		const yMax = max;\n" +
		"		const yStep = (yMax - yMin) / 4;\n" +
		"		const yTicks = Array.from({ length: 5 }, (_, i) =\u003e yMin + yStep * i);\n" +
		"\n" +
		"		return { points, line, area, yTicks, yMin, yMax };\n" +
		"	});\n" +
		"\n" +
		"	function selectMetric(idx: number): void {\n" +
		"		selectedIdx = idx;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.4 — Area Chart + Sparkline\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e An area chart is a line chart with the space below filled — use\n" +
		"		\u003ccode\u003e&lt;path&gt;\u003c/code\u003e with the line path plus a baseline closure\n" +
		"		(\u003ccode\u003eL xN,baseline L x0,baseline Z\u003c/code\u003e). Sparklines are tiny inline charts — no axes,\n" +
		"		no labels, just the shape. They communicate trends at a glance (think stock tickers, dashboard\n" +
		"		KPIs). Build both from the same data and scale logic.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"kpi-grid\"\u003e\n" +
		"			{#each metrics as metric, i (metric.name)}\n" +
		"				{@const change = pctChange(metric.values)}\n" +
		"				{@const isDown = change \u003c 0}\n" +
		"				{@const isSelected = selectedIdx === i}\n" +
		"				\u003cbutton\n" +
		"					class=\"kpi-card\"\n" +
		"					class:selected={isSelected}\n" +
		"					onclick={() =\u003e selectMetric(i)}\n" +
		"				\u003e\n" +
		"					\u003cspan class=\"kpi-name\"\u003e{metric.name}\u003c/span\u003e\n" +
		"					\u003cspan class=\"kpi-value\"\u003e\n" +
		"						{metric.values[metric.values.length - 1]}{metric.unit}\n" +
		"					\u003c/span\u003e\n" +
		"					\u003cspan class=\"kpi-change\" class:down={isDown}\u003e\n" +
		"						{isDown ? '' : '+'}{change.toFixed(1)}%\n" +
		"					\u003c/span\u003e\n" +
		"					\u003csvg viewBox=\"0 0 60 20\" class=\"sparkline\" aria-hidden=\"true\"\u003e\n" +
		"						\u003cpath\n" +
		"							d={sparklinePath(metric.values, 60, 20)}\n" +
		"							fill={metric.color}\n" +
		"							opacity=\"0.2\"\n" +
		"						/\u003e\n" +
		"						\u003cpath\n" +
		"							d={sparklineStroke(metric.values, 60, 20)}\n" +
		"							fill=\"none\"\n" +
		"							stroke={metric.color}\n" +
		"							stroke-width=\"1.5\"\n" +
		"							stroke-linejoin=\"round\"\n" +
		"						/\u003e\n" +
		"					\u003c/svg\u003e\n" +
		"				\u003c/button\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003csvg viewBox=\"0 0 {chartW} {chartH}\" class=\"area-chart\" role=\"img\" aria-label=\"Area chart of {selected.name}\"\u003e\n" +
		"			\u003cdefs\u003e\n" +
		"				\u003clinearGradient id=\"area-fill\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"\u003e\n" +
		"					\u003cstop offset=\"0%\" stop-color={selected.color} stop-opacity=\"0.35\" /\u003e\n" +
		"					\u003cstop offset=\"100%\" stop-color={selected.color} stop-opacity=\"0.03\" /\u003e\n" +
		"				\u003c/linearGradient\u003e\n" +
		"			\u003c/defs\u003e\n" +
		"			\u003cg transform=\"translate({pad.left}, {pad.top})\"\u003e\n" +
		"				\u003c!-- y gridlines --\u003e\n" +
		"				{#each areaChartData.yTicks as tick, i}\n" +
		"					{@const y = plotH - ((tick - areaChartData.yMin) / (areaChartData.yMax - areaChartData.yMin)) * plotH}\n" +
		"					\u003cline x1={0} y1={y} x2={plotW} y2={y} class=\"gridline\" /\u003e\n" +
		"					\u003ctext x={-8} y={y + 4} class=\"tick-label\" text-anchor=\"end\"\u003e\n" +
		"						{tick.toFixed(tick \u003c 10 ? 1 : 0)}{selected.unit}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Area charts and sparklines share the same math. Break them to see exactly where the line between a line chart and an area chart lives.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>L$&#123;plotW&#125;,$&#123;plotH&#125; L0,$&#123;plotH&#125; Z</code> closure from the area path.</strong> The filled area disappears and you get just a line chart. Those three commands close the path back to the baseline — without them, SVG has no enclosed shape to fill.</li>
		<li><strong>Delete the <code>&lt;linearGradient&gt;</code> from <code>&lt;defs&gt;</code> and use a solid <code>fill</code> color instead.</strong> The area becomes a heavy opaque block that obscures the gridlines. The gradient's fade-to-transparent is what keeps the fill subtle enough to not overwhelm the line itself.</li>
		<li><strong>Change the sparkline dimensions from <code>60x20</code> to <code>60x200</code>.</strong> The sparkline balloons into a full-sized chart inside the KPI card, breaking the layout. Sparklines work because they are small enough to be read as shapes rather than precise data.</li>
		<li><strong>Set all four metrics to the same <code>color</code> value.</strong> When you click between KPI cards, you can no longer visually confirm which metric is selected in the area chart. Color consistency between the selector and the chart is a critical UX connection.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">An area chart is a line chart with one addition: the path closes back to the baseline with <code>L xN,plotH L 0,plotH Z</code>, creating an enclosed shape that SVG can fill. A <code>&lt;linearGradient&gt;</code> defined in <code>&lt;defs&gt;</code> provides the fade-to-transparent effect that keeps the fill subtle and readable.</p>
	<p class="prose">Sparklines are the same math at a tiny scale — 60 by 20 pixels with no axes or labels. Edward Tufte's concept communicates trend at a glance. The <code>sparklinePath</code> and <code>sparklineStroke</code> functions normalize data to the viewBox dimensions, making sparklines work with any value range.</p>
	<p class="prose">Clicking a KPI card updates <code>selectedIdx</code> via <code>$state</code>, which triggers the full area chart to re-derive its path, gradient, and axis labels from the newly selected metric. Percent-change pills with conditional green/red coloring communicate trend direction instantly without requiring the reader to study the chart shape.</p>
	<p class="next">Next lesson: DV.5 tackles the geometry of donut and pie charts with SVG arc commands.</p>
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

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


	/* ── Having issues section ── */
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

	/* === RESPONSIVE BREAKPOINTS === */
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
