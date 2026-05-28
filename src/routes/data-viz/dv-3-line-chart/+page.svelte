<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface TempPoint {\n" +
		"		year: number;\n" +
		"		anomalyNH: number;\n" +
		"		anomalySH: number;\n" +
		"	}\n" +
		"\n" +
		"	const data: TempPoint[] = [\n" +
		"		{ year: 1970, anomalyNH: 0.02, anomalySH: -0.01 },\n" +
		"		{ year: 1975, anomalyNH: -0.05, anomalySH: -0.04 },\n" +
		"		{ year: 1980, anomalyNH: 0.18, anomalySH: 0.08 },\n" +
		"		{ year: 1985, anomalyNH: 0.10, anomalySH: 0.06 },\n" +
		"		{ year: 1990, anomalyNH: 0.38, anomalySH: 0.15 },\n" +
		"		{ year: 1995, anomalyNH: 0.42, anomalySH: 0.22 },\n" +
		"		{ year: 2000, anomalyNH: 0.55, anomalySH: 0.28 },\n" +
		"		{ year: 2005, anomalyNH: 0.72, anomalySH: 0.35 },\n" +
		"		{ year: 2010, anomalyNH: 0.82, anomalySH: 0.40 },\n" +
		"		{ year: 2015, anomalyNH: 1.10, anomalySH: 0.55 },\n" +
		"		{ year: 2020, anomalyNH: 1.35, anomalySH: 0.68 },\n" +
		"		{ year: 2024, anomalyNH: 1.52, anomalySH: 0.78 }\n" +
		"	];\n" +
		"\n" +
		"	const chartW = 640;\n" +
		"	const chartH = 380;\n" +
		"	const pad = { top: 30, right: 120, bottom: 50, left: 60 };\n" +
		"	const plotW = chartW - pad.left - pad.right;\n" +
		"	const plotH = chartH - pad.top - pad.bottom;\n" +
		"\n" +
		"	const yearMin = 1970;\n" +
		"	const yearMax = 2025;\n" +
		"	const anomalyMin = -0.2;\n" +
		"	const anomalyMax = 1.7;\n" +
		"\n" +
		"	const scaleX = (year: number): number =\u003e\n" +
		"		((year - yearMin) / (yearMax - yearMin)) * plotW;\n" +
		"\n" +
		"	const scaleY = (val: number): number =\u003e\n" +
		"		plotH - ((val - anomalyMin) / (anomalyMax - anomalyMin)) * plotH;\n" +
		"\n" +
		"	const buildPath = (points: Array\u003c{ x: number; y: number }\u003e): string =\u003e\n" +
		"		points.map((p, i) =\u003e `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');\n" +
		"\n" +
		"	const nhPoints = $derived(data.map((d) =\u003e ({ x: scaleX(d.year), y: scaleY(d.anomalyNH) })));\n" +
		"	const shPoints = $derived(data.map((d) =\u003e ({ x: scaleX(d.year), y: scaleY(d.anomalySH) })));\n" +
		"\n" +
		"	const nhPath = $derived(buildPath(nhPoints));\n" +
		"	const shPath = $derived(buildPath(shPoints));\n" +
		"\n" +
		"	const xTicks = [1970, 1980, 1990, 2000, 2010, 2020];\n" +
		"	const yTicks = [0, 0.5, 1.0, 1.5];\n" +
		"\n" +
		"	let hoveredIndex = $state\u003cnumber | null\u003e(null);\n" +
		"\n" +
		"	function handlePointerMove(e: PointerEvent): void {\n" +
		"		const svg = e.currentTarget as SVGSVGElement;\n" +
		"		const rect = svg.getBoundingClientRect();\n" +
		"		const svgX = ((e.clientX - rect.left) / rect.width) * chartW - pad.left;\n" +
		"\n" +
		"		let closest = 0;\n" +
		"		let minDist = Infinity;\n" +
		"		for (let i = 0; i \u003c data.length; i++) {\n" +
		"			const dist = Math.abs(scaleX(data[i].year) - svgX);\n" +
		"			if (dist \u003c minDist) {\n" +
		"				minDist = dist;\n" +
		"				closest = i;\n" +
		"			}\n" +
		"		}\n" +
		"		hoveredIndex = minDist \u003c 40 ? closest : null;\n" +
		"	}\n" +
		"\n" +
		"	function handlePointerLeave(): void {\n" +
		"		hoveredIndex = null;\n" +
		"	}\n" +
		"\n" +
		"	const nhColor = 'oklch(65% 0.22 270)';\n" +
		"	const shColor = 'oklch(60% 0.20 155)';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.3 — Line Chart\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Line charts show change over time. The \u003ccode\u003e&lt;path&gt;\u003c/code\u003e\n" +
		"		element with its \u003ccode\u003ed\u003c/code\u003e attribute draws any shape — including a line through data\n" +
		"		points. Build the \u003ccode\u003ed\u003c/code\u003e string from data:\n" +
		"		\u003ccode\u003eM x0,y0 L x1,y1 L x2,y2 ...\u003c/code\u003e. Add \u003ccode\u003e&lt;circle&gt;\u003c/code\u003e dots at each data\n" +
		"		point for hover targets. Multiple lines mean multiple \u003ccode\u003e&lt;path&gt;\u003c/code\u003e elements with\n" +
		"		different stroke colors.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003csvg\n" +
		"			viewBox=\"0 0 {chartW} {chartH}\"\n" +
		"			class=\"chart\"\n" +
		"			role=\"img\"\n" +
		"			aria-label=\"Line chart of global temperature anomalies 1970-2024\"\n" +
		"			onpointermove={handlePointerMove}\n" +
		"			onpointerleave={handlePointerLeave}\n" +
		"		\u003e\n" +
		"			\u003cg transform=\"translate({pad.left}, {pad.top})\"\u003e\n" +
		"				\u003c!-- zero baseline --\u003e\n" +
		"				\u003cline x1={0} y1={scaleY(0)} x2={plotW} y2={scaleY(0)} class=\"zero-line\" /\u003e\n" +
		"\n" +
		"				\u003c!-- gridlines --\u003e\n" +
		"				{#each yTicks as tick}\n" +
		"					\u003cline x1={0} y1={scaleY(tick)} x2={plotW} y2={scaleY(tick)} class=\"gridline\" /\u003e\n" +
		"				{/each}\n" +
		"\n" +
		"				\u003c!-- x axis --\u003e\n" +
		"				\u003cline x1={0} y1={plotH} x2={plotW} y2={plotH} class=\"axis-line\" /\u003e\n" +
		"				{#each xTicks as tick}\n" +
		"					\u003cline x1={scaleX(tick)} y1={plotH} x2={scaleX(tick)} y2={plotH + 6} class=\"axis-line\" /\u003e\n" +
		"					\u003ctext x={scaleX(tick)} y={plotH + 22} class=\"tick-label\" text-anchor=\"middle\"\u003e\n" +
		"						{tick}\n" +
		"					\u003c/text\u003e\n" +
		"				{/each}\n" +
		"				\u003ctext x={plotW / 2} y={plotH + 42} class=\"axis-title\" text-anchor=\"middle\"\u003eYear\u003c/text\u003e\n" +
		"\n" +
		"				\u003c!-- y axis --\u003e\n" +
		"				\u003cline x1={0} y1={0} x2={0} y2={plotH} class=\"axis-line\" /\u003e\n" +
		"				{#each yTicks as tick}\n" +
		"					\u003ctext x={-10} y={scaleY(tick) + 4} class=\"tick-label\" text-anchor=\"end\"\u003e\n" +
		"						{tick === 0 ? '0' : `+${tick.toFixed(1)}`}°C\n" +
		"					\u003c/text\u003e\n" +
		"				{/each}\n" +
		"\n" +
		"				\u003c!-- NH line --\u003e\n" +
		"				\u003cpath d={nhPath} fill=\"none\" stroke={nhColor} stroke-width={2.5} class=\"data-line\" /\u003e\n" +
		"				\u003c!-- SH line --\u003e\n" +
		"				\u003cpath d={shPath} fill=\"none\" stroke={shColor} stroke-width={2.5} class=\"data-line\" /\u003e\n" +
		"\n" +
		"				\u003c!-- dots --\u003e\n" +
		"				{#each data as point, i (point.year)}\n" +
		"					\u003ccircle\n" +
		"						cx={scaleX(point.year)}\n" +
		"						cy={scaleY(point.anomalyNH)}\n" +
		"						r={hoveredIndex === i ? 5 : 3}\n" +
		"						fill={nhColor}\n" +
		"						class=\"dot\"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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
				{#each yTicks as tick (tick)}
					<line x1={0} y1={scaleY(tick)} x2={plotW} y2={scaleY(tick)} class="gridline" />
				{/each}

				<!-- x axis -->
				<line x1={0} y1={plotH} x2={plotW} y2={plotH} class="axis-line" />
				{#each xTicks as tick (tick)}
					<line x1={scaleX(tick)} y1={plotH} x2={scaleX(tick)} y2={plotH + 6} class="axis-line" />
					<text x={scaleX(tick)} y={plotH + 22} class="tick-label" text-anchor="middle">
						{tick}
					</text>
				{/each}
				<text x={plotW / 2} y={plotH + 42} class="axis-title" text-anchor="middle">Year</text>

				<!-- y axis -->
				<line x1={0} y1={0} x2={0} y2={plotH} class="axis-line" />
				{#each yTicks as tick (tick)}
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


	<h2>Break it on purpose</h2>
	<p class="prose">Line charts have subtle moving parts. Break each one to understand why it matters.</p>
	<ol class="experiments">
		<li><strong>Change <code>buildPath</code> to use <code>M</code> for every point instead of <code>L</code> after the first.</strong> You will get disconnected dots instead of a continuous line. The <code>M</code> command moves the pen without drawing, while <code>L</code> draws a line segment to the next coordinate.</li>
		<li><strong>Remove the <code>onpointermove</code> handler from the SVG element.</strong> Hovering over the chart will show nothing — no reference line, no tooltip. The nearest-point detection depends entirely on tracking the pointer position relative to the SVG coordinate space.</li>
		<li><strong>Set <code>anomalyMin</code> and <code>anomalyMax</code> to the same value (e.g., both <code>0</code>).</strong> The <code>scaleY</code> function will divide by zero, producing <code>NaN</code> coordinates. The lines and dots will vanish because SVG cannot render elements at <code>NaN</code> positions.</li>
		<li><strong>Remove the <code>stroke-linejoin: round</code> from the <code>.data-line</code> CSS.</strong> Sharp corners appear at each data point where the line changes direction. Round joins soften the path, which is the visual standard for time-series data.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The SVG <code>&lt;path&gt;</code> element with its <code>d</code> attribute is the foundation of every line chart. You build the path string from data by mapping each point to an <code>M</code> (move) or <code>L</code> (line-to) command with scaled x/y coordinates. Svelte's <code>$derived</code> rune recomputes the entire path string reactively whenever the underlying data changes.</p>
	<p class="prose">Pointer tracking via <code>onpointermove</code> on the SVG element enables hover interactions. The handler converts screen coordinates to SVG coordinates, then finds the nearest data point using a simple distance loop. This pattern works for any chart type where you need to highlight the closest data point to the cursor.</p>
	<p class="prose">Multiple <code>&lt;path&gt;</code> elements with different stroke colors create multi-series charts. In-SVG tooltips — a reference line plus text elements — keep everything in a single coordinate system, avoiding the complexity of absolutely-positioned HTML overlays for simple cases.</p>
	<p class="next">Next lesson: DV.4 adds area fills and sparklines to the line chart toolkit.</p>
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
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.chart {
		inline-size: 100%;
		max-inline-size: 680px;
		block-size: auto;
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
