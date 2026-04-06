<script lang="ts">
	interface TempPoint {
		year: number;
		anomalyNH: number;
		anomalySH: number;
	}

	const data: TempPoint[] = [
		{ year: 1970, anomalyNH: 0.02, anomalySH: -0.01 },
		{ year: 1975, anomalyNH: -0.05, anomalySH: -0.04 },
		{ year: 1980, anomalyNH: 0.18, anomalySH: 0.08 },
		{ year: 1985, anomalyNH: 0.10, anomalySH: 0.06 },
		{ year: 1990, anomalyNH: 0.38, anomalySH: 0.15 },
		{ year: 1995, anomalyNH: 0.42, anomalySH: 0.22 },
		{ year: 2000, anomalyNH: 0.55, anomalySH: 0.28 },
		{ year: 2005, anomalyNH: 0.72, anomalySH: 0.35 },
		{ year: 2010, anomalyNH: 0.82, anomalySH: 0.40 },
		{ year: 2015, anomalyNH: 1.10, anomalySH: 0.55 },
		{ year: 2020, anomalyNH: 1.35, anomalySH: 0.68 },
		{ year: 2024, anomalyNH: 1.52, anomalySH: 0.78 }
	];

	const chartW = 640;
	const chartH = 380;
	const pad = { top: 30, right: 120, bottom: 50, left: 60 };
	const plotW = chartW - pad.left - pad.right;
	const plotH = chartH - pad.top - pad.bottom;

	const yearMin = 1970;
	const yearMax = 2025;
	const anomalyMin = -0.2;
	const anomalyMax = 1.7;

	const scaleX = (year: number): number =>
		((year - yearMin) / (yearMax - yearMin)) * plotW;

	const scaleY = (val: number): number =>
		plotH - ((val - anomalyMin) / (anomalyMax - anomalyMin)) * plotH;

	const buildPath = (points: Array<{ x: number; y: number }>): string =>
		points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

	const nhPoints = $derived(data.map((d) => ({ x: scaleX(d.year), y: scaleY(d.anomalyNH) })));
	const shPoints = $derived(data.map((d) => ({ x: scaleX(d.year), y: scaleY(d.anomalySH) })));

	const nhPath = $derived(buildPath(nhPoints));
	const shPath = $derived(buildPath(shPoints));

	const xTicks = [1970, 1980, 1990, 2000, 2010, 2020];
	const yTicks = [0, 0.5, 1.0, 1.5];

	let hoveredIndex = $state<number | null>(null);

	function handlePointerMove(e: PointerEvent): void {
		const svg = e.currentTarget as SVGSVGElement;
		const rect = svg.getBoundingClientRect();
		const svgX = ((e.clientX - rect.left) / rect.width) * chartW - pad.left;

		let closest = 0;
		let minDist = Infinity;
		for (let i = 0; i < data.length; i++) {
			const dist = Math.abs(scaleX(data[i].year) - svgX);
			if (dist < minDist) {
				minDist = dist;
				closest = i;
			}
		}
		hoveredIndex = minDist < 40 ? closest : null;
	}

	function handlePointerLeave(): void {
		hoveredIndex = null;
	}

	const nhColor = 'oklch(65% 0.22 270)';
	const shColor = 'oklch(60% 0.20 155)';
</script>

<section class="page">
	<h1>DV.3 — Line Chart</h1>
	<p class="concept">
		<strong>Concept.</strong> Line charts show change over time. The <code>&lt;path&gt;</code>
		element with its <code>d</code> attribute draws any shape — including a line through data
		points. Build the <code>d</code> string from data:
		<code>M x0,y0 L x1,y1 L x2,y2 ...</code>. Add <code>&lt;circle&gt;</code> dots at each data
		point for hover targets. Multiple lines mean multiple <code>&lt;path&gt;</code> elements with
		different stroke colors.
	</p>

	<div class="build">
		<svg
			viewBox="0 0 {chartW} {chartH}"
			class="chart"
			role="img"
			aria-label="Line chart of global temperature anomalies 1970-2024"
			onpointermove={handlePointerMove}
			onpointerleave={handlePointerLeave}
		>
			<g transform="translate({pad.left}, {pad.top})">
				<!-- zero baseline -->
				<line x1={0} y1={scaleY(0)} x2={plotW} y2={scaleY(0)} class="zero-line" />

				<!-- gridlines -->
				{#each yTicks as tick}
					<line x1={0} y1={scaleY(tick)} x2={plotW} y2={scaleY(tick)} class="gridline" />
				{/each}

				<!-- x axis -->
				<line x1={0} y1={plotH} x2={plotW} y2={plotH} class="axis-line" />
				{#each xTicks as tick}
					<line x1={scaleX(tick)} y1={plotH} x2={scaleX(tick)} y2={plotH + 6} class="axis-line" />
					<text x={scaleX(tick)} y={plotH + 22} class="tick-label" text-anchor="middle">
						{tick}
					</text>
				{/each}
				<text x={plotW / 2} y={plotH + 42} class="axis-title" text-anchor="middle">Year</text>

				<!-- y axis -->
				<line x1={0} y1={0} x2={0} y2={plotH} class="axis-line" />
				{#each yTicks as tick}
					<text x={-10} y={scaleY(tick) + 4} class="tick-label" text-anchor="end">
						{tick === 0 ? '0' : `+${tick.toFixed(1)}`}°C
					</text>
				{/each}

				<!-- NH line -->
				<path d={nhPath} fill="none" stroke={nhColor} stroke-width={2.5} class="data-line" />
				<!-- SH line -->
				<path d={shPath} fill="none" stroke={shColor} stroke-width={2.5} class="data-line" />

				<!-- dots -->
				{#each data as point, i (point.year)}
					<circle
						cx={scaleX(point.year)}
						cy={scaleY(point.anomalyNH)}
						r={hoveredIndex === i ? 5 : 3}
						fill={nhColor}
						class="dot"
					/>
					<circle
						cx={scaleX(point.year)}
						cy={scaleY(point.anomalySH)}
						r={hoveredIndex === i ? 5 : 3}
						fill={shColor}
						class="dot"
					/>
				{/each}

				<!-- hover reference line + tooltip -->
				{#if hoveredIndex !== null}
					{@const d = data[hoveredIndex]}
					{@const hx = scaleX(d.year)}
					<line x1={hx} y1={0} x2={hx} y2={plotH} class="ref-line" />
					<rect
						x={hx + 8}
						y={scaleY(d.anomalyNH) - 38}
						width={130}
						height={46}
						rx={4}
						class="tooltip-bg"
					/>
					<text x={hx + 14} y={scaleY(d.anomalyNH) - 20} class="tooltip-text">
						{d.year}
					</text>
					<text x={hx + 14} y={scaleY(d.anomalyNH) - 4} class="tooltip-text">
						NH: +{d.anomalyNH.toFixed(2)}°C  SH: +{d.anomalySH.toFixed(2)}°C
					</text>
				{/if}

				<!-- legend -->
				<g transform="translate({plotW + 10}, 10)">
					<line x1={0} y1={0} x2={20} y2={0} stroke={nhColor} stroke-width={2.5} />
					<text x={24} y={4} class="legend-label">N. Hemisphere</text>
					<line x1={0} y1={20} x2={20} y2={20} stroke={shColor} stroke-width={2.5} />
					<text x={24} y={24} class="legend-label">S. Hemisphere</text>
				</g>
			</g>
		</svg>

		<p class="chart-note">
			Temperature anomalies relative to 1951–1980 baseline. Source: NOAA approximate data.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>The <code>&lt;path d="M...L..."&gt;</code> element draws lines through data points — the foundation of all line charts.</li>
		<li><code>$derived</code> computes path strings and point positions reactively from data.</li>
		<li>Pointer tracking (<code>onpointermove</code>) on the SVG finds the nearest data point for hover interactions.</li>
		<li>Multiple <code>&lt;path&gt;</code> elements with different strokes create multi-series charts.</li>
		<li>In-SVG tooltips (reference line + text) keep everything in a single coordinate system.</li>
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

	.chart {
		width: 100%;
		max-width: 680px;
		height: auto;
	}
	.gridline {
		stroke: var(--color-border);
		stroke-width: 1;
		stroke-dasharray: 3 3;
	}
	.zero-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		stroke-dasharray: 6 3;
		opacity: 0.5;
	}
	.axis-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
	}
	.tick-label {
		font-size: 11px;
		fill: var(--color-text-muted);
	}
	.axis-title {
		font-size: 12px;
		fill: var(--color-text-muted);
		font-weight: 600;
	}
	.data-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.dot {
		transition: r 100ms ease-out;
	}
	.ref-line {
		stroke: var(--color-text-muted);
		stroke-width: 1;
		stroke-dasharray: 4 3;
		opacity: 0.6;
	}
	.tooltip-bg {
		fill: var(--color-surface-2);
		stroke: var(--color-border);
		stroke-width: 1;
	}
	.tooltip-text {
		font-size: 11px;
		fill: var(--color-text);
		font-weight: 500;
	}
	.legend-label {
		font-size: 11px;
		fill: var(--color-text-muted);
	}
	.chart-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
</style>
