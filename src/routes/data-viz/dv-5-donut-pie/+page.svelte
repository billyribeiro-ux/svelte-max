<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface EnergySlice {
		source: string;
		percent: number;
		hue: number;
	}

	const slices: EnergySlice[] = [
		{ source: 'Oil', percent: 30, hue: 40 },
		{ source: 'Coal', percent: 27, hue: 25 },
		{ source: 'Natural Gas', percent: 23, hue: 200 },
		{ source: 'Hydro', percent: 7, hue: 220 },
		{ source: 'Wind + Solar', percent: 6, hue: 145 },
		{ source: 'Nuclear', percent: 4, hue: 280 },
		{ source: 'Other Renewables', percent: 3, hue: 90 }
	];

	const totalTWh = 178_899;

	let hoveredIdx = $state<number | null>(null);
	let isDonut = $state(true);

	const cx = 160;
	const cy = 160;
	const outerR = 140;
	const innerRDonut = 80;

	const innerR = $derived(isDonut ? innerRDonut : 0);

	interface ArcData {
		startAngle: number;
		endAngle: number;
		path: string;
		midAngle: number;
	}

	const arcs = $derived.by<ArcData[]>(() => {
		const result: ArcData[] = [];
		let cumulative = 0;

		for (const slice of slices) {
			const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
			cumulative += slice.percent;
			const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;
			const midAngle = (startAngle + endAngle) / 2;
			const largeArc = slice.percent > 50 ? 1 : 0;

			const x1 = cx + outerR * Math.cos(startAngle);
			const y1 = cy + outerR * Math.sin(startAngle);
			const x2 = cx + outerR * Math.cos(endAngle);
			const y2 = cy + outerR * Math.sin(endAngle);

			let path: string;
			if (innerR > 0) {
				const ix1 = cx + innerR * Math.cos(endAngle);
				const iy1 = cy + innerR * Math.sin(endAngle);
				const ix2 = cx + innerR * Math.cos(startAngle);
				const iy2 = cy + innerR * Math.sin(startAngle);
				path = [
					`M ${x1.toFixed(2)},${y1.toFixed(2)}`,
					`A ${outerR},${outerR} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`,
					`L ${ix1.toFixed(2)},${iy1.toFixed(2)}`,
					`A ${innerR},${innerR} 0 ${largeArc},0 ${ix2.toFixed(2)},${iy2.toFixed(2)}`,
					'Z'
				].join(' ');
			} else {
				path = [
					`M ${cx},${cy}`,
					`L ${x1.toFixed(2)},${y1.toFixed(2)}`,
					`A ${outerR},${outerR} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`,
					'Z'
				].join(' ');
			}

			result.push({ startAngle, endAngle, path, midAngle });
		}
		return result;
	});

	function sliceColor(hue: number): string {
		return `oklch(65% 0.18 ${hue})`;
	}

	function toggleMode(): void {
		isDonut = !isDonut;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface EnergySlice {\n" +
		"		source: string;\n" +
		"		percent: number;\n" +
		"		hue: number;\n" +
		"	}\n" +
		"\n" +
		"	const slices: EnergySlice[] = [\n" +
		"		{ source: 'Oil', percent: 30, hue: 40 },\n" +
		"		{ source: 'Coal', percent: 27, hue: 25 },\n" +
		"		{ source: 'Natural Gas', percent: 23, hue: 200 },\n" +
		"		{ source: 'Hydro', percent: 7, hue: 220 },\n" +
		"		{ source: 'Wind + Solar', percent: 6, hue: 145 },\n" +
		"		{ source: 'Nuclear', percent: 4, hue: 280 },\n" +
		"		{ source: 'Other Renewables', percent: 3, hue: 90 }\n" +
		"	];\n" +
		"\n" +
		"	const totalTWh = 178_899;\n" +
		"\n" +
		"	let hoveredIdx = $state\u003cnumber | null\u003e(null);\n" +
		"	let isDonut = $state(true);\n" +
		"\n" +
		"	const cx = 160;\n" +
		"	const cy = 160;\n" +
		"	const outerR = 140;\n" +
		"	const innerRDonut = 80;\n" +
		"\n" +
		"	const innerR = $derived(isDonut ? innerRDonut : 0);\n" +
		"\n" +
		"	interface ArcData {\n" +
		"		startAngle: number;\n" +
		"		endAngle: number;\n" +
		"		path: string;\n" +
		"		midAngle: number;\n" +
		"	}\n" +
		"\n" +
		"	const arcs = $derived.by\u003cArcData[]\u003e(() =\u003e {\n" +
		"		const result: ArcData[] = [];\n" +
		"		let cumulative = 0;\n" +
		"\n" +
		"		for (const slice of slices) {\n" +
		"			const startAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;\n" +
		"			cumulative += slice.percent;\n" +
		"			const endAngle = (cumulative / 100) * 2 * Math.PI - Math.PI / 2;\n" +
		"			const midAngle = (startAngle + endAngle) / 2;\n" +
		"			const largeArc = slice.percent \u003e 50 ? 1 : 0;\n" +
		"\n" +
		"			const x1 = cx + outerR * Math.cos(startAngle);\n" +
		"			const y1 = cy + outerR * Math.sin(startAngle);\n" +
		"			const x2 = cx + outerR * Math.cos(endAngle);\n" +
		"			const y2 = cy + outerR * Math.sin(endAngle);\n" +
		"\n" +
		"			let path: string;\n" +
		"			if (innerR \u003e 0) {\n" +
		"				const ix1 = cx + innerR * Math.cos(endAngle);\n" +
		"				const iy1 = cy + innerR * Math.sin(endAngle);\n" +
		"				const ix2 = cx + innerR * Math.cos(startAngle);\n" +
		"				const iy2 = cy + innerR * Math.sin(startAngle);\n" +
		"				path = [\n" +
		"					`M ${x1.toFixed(2)},${y1.toFixed(2)}`,\n" +
		"					`A ${outerR},${outerR} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`,\n" +
		"					`L ${ix1.toFixed(2)},${iy1.toFixed(2)}`,\n" +
		"					`A ${innerR},${innerR} 0 ${largeArc},0 ${ix2.toFixed(2)},${iy2.toFixed(2)}`,\n" +
		"					'Z'\n" +
		"				].join(' ');\n" +
		"			} else {\n" +
		"				path = [\n" +
		"					`M ${cx},${cy}`,\n" +
		"					`L ${x1.toFixed(2)},${y1.toFixed(2)}`,\n" +
		"					`A ${outerR},${outerR} 0 ${largeArc},1 ${x2.toFixed(2)},${y2.toFixed(2)}`,\n" +
		"					'Z'\n" +
		"				].join(' ');\n" +
		"			}\n" +
		"\n" +
		"			result.push({ startAngle, endAngle, path, midAngle });\n" +
		"		}\n" +
		"		return result;\n" +
		"	});\n" +
		"\n" +
		"	function sliceColor(hue: number): string {\n" +
		"		return `oklch(65% 0.18 ${hue})`;\n" +
		"	}\n" +
		"\n" +
		"	function toggleMode(): void {\n" +
		"		isDonut = !isDonut;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.5 — Donut + Pie Chart\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e Pie and donut charts use SVG arcs. Each slice is a\n" +
		"		\u003ccode\u003e&lt;path&gt;\u003c/code\u003e with an arc command. The math: for each slice, compute start angle\n" +
		"		and end angle from cumulative percentages. For a donut, add an inner radius arc going\n" +
		"		counter-clockwise. Avoid pie charts with many slices — 5 to 7 max is ideal. Use OKLCH with\n" +
		"		distinct hues for each slice.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"toolbar\"\u003e\n" +
		"			\u003cbutton class=\"toggle-btn\" onclick={toggleMode}\u003e\n" +
		"				{isDonut ? 'Switch to Pie' : 'Switch to Donut'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"chart-row\"\u003e\n" +
		"			\u003csvg viewBox=\"0 0 320 320\" class=\"donut-chart\" role=\"img\" aria-label=\"Donut chart of global energy mix 2024\"\u003e\n" +
		"				{#each slices as slice, i (slice.source)}\n" +
		"					{@const arc = arcs[i]}\n" +
		"					{@const isHovered = hoveredIdx === i}\n" +
		"					{@const scale = isHovered ? 'scale(1.04)' : 'scale(1)'}\n" +
		"					\u003cpath\n" +
		"						role=\"img\"\n" +
		"						aria-label=\"{slice.source}: {slice.percent}%\"\n" +
		"						d={arc.path}\n" +
		"						fill={sliceColor(slice.hue)}\n" +
		"						stroke=\"var(--color-surface-1)\"\n" +
		"						stroke-width=\"2\"\n" +
		"						style=\"transform-origin: {cx}px {cy}px; transform: {scale}; transition: transform var(--dur-fast) var(--ease-out);\"\n" +
		"						onpointerenter={() =\u003e (hoveredIdx = i)}\n" +
		"						onpointerleave={() =\u003e (hoveredIdx = null)}\n" +
		"						class=\"slice\"\n" +
		"					/\u003e\n" +
		"				{/each}\n" +
		"\n" +
		"				\u003c!-- center text --\u003e\n" +
		"				{#if isDonut}\n" +
		"					{#if hoveredIdx !== null}\n" +
		"						\u003ctext x={cx} y={cy - 8} text-anchor=\"middle\" class=\"center-source\"\u003e\n" +
		"							{slices[hoveredIdx].source}\n" +
		"						\u003c/text\u003e\n" +
		"						\u003ctext x={cx} y={cy + 14} text-anchor=\"middle\" class=\"center-pct\"\u003e\n" +
		"							{slices[hoveredIdx].percent}%\n" +
		"						\u003c/text\u003e\n" +
		"					{:else}\n" +
		"						\u003ctext x={cx} y={cy - 8} text-anchor=\"middle\" class=\"center-label\"\u003e\n" +
		"							Total\n" +
		"						\u003c/text\u003e\n" +
		"						\u003ctext x={cx} y={cy + 16} text-anchor=\"middle\" class=\"center-twh\"\u003e\n" +
		"							{totalTWh.toLocaleString()} TWh\n" +
		"						\u003c/text\u003e\n" +
		"					{/if}\n" +
		"				{/if}\n" +
		"			\u003c/svg\u003e\n" +
		"\n" +
		"			\u003cdiv class=\"legend\"\u003e\n" +
		"				\u003ch4\u003eGlobal Energy Mix 2024\u003c/h4\u003e\n" +
		"				{#each slices as slice, i (slice.source)}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.5 — Donut + Pie Chart</h1>
	<p class="concept">
		<strong>Concept.</strong> Pie and donut charts use SVG arcs. Each slice is a
		<code>&lt;path&gt;</code> with an arc command. The math: for each slice, compute start angle
		and end angle from cumulative percentages. For a donut, add an inner radius arc going
		counter-clockwise. Avoid pie charts with many slices — 5 to 7 max is ideal. Use OKLCH with
		distinct hues for each slice.
	</p>

	<div class="build">
		<div class="toolbar">
			<button class="toggle-btn" onclick={toggleMode}>
				{isDonut ? 'Switch to Pie' : 'Switch to Donut'}
			</button>
		</div>

		<div class="chart-row">
			<svg viewBox="0 0 320 320" class="donut-chart" role="img" aria-label="Donut chart of global energy mix 2024">
				{#each slices as slice, i (slice.source)}
					{@const arc = arcs[i]}
					{@const isHovered = hoveredIdx === i}
					{@const scale = isHovered ? 'scale(1.04)' : 'scale(1)'}
					<path
						role="img"
						aria-label="{slice.source}: {slice.percent}%"
						d={arc.path}
						fill={sliceColor(slice.hue)}
						stroke="var(--color-surface-1)"
						stroke-width="2"
						style="transform-origin: {cx}px {cy}px; transform: {scale}; transition: transform var(--dur-fast) var(--ease-out);"
						onpointerenter={() => (hoveredIdx = i)}
						onpointerleave={() => (hoveredIdx = null)}
						class="slice"
					/>
				{/each}

				<!-- center text -->
				{#if isDonut}
					{#if hoveredIdx !== null}
						<text x={cx} y={cy - 8} text-anchor="middle" class="center-source">
							{slices[hoveredIdx].source}
						</text>
						<text x={cx} y={cy + 14} text-anchor="middle" class="center-pct">
							{slices[hoveredIdx].percent}%
						</text>
					{:else}
						<text x={cx} y={cy - 8} text-anchor="middle" class="center-label">
							Total
						</text>
						<text x={cx} y={cy + 16} text-anchor="middle" class="center-twh">
							{totalTWh.toLocaleString()} TWh
						</text>
					{/if}
				{/if}
			</svg>

			<div class="legend">
				<h4>Global Energy Mix 2024</h4>
				{#each slices as slice, i (slice.source)}
					<div
						role="listitem"
						class="legend-row"
						class:highlighted={hoveredIdx === i}
						onpointerenter={() => (hoveredIdx = i)}
						onpointerleave={() => (hoveredIdx = null)}
					>
						<span class="legend-swatch" style:background={sliceColor(slice.hue)}></span>
						<span class="legend-name">{slice.source}</span>
						<span class="legend-pct">{slice.percent}%</span>
					</div>
				{/each}
				<p class="legend-source">Source: IEA 2024 estimates</p>
			</div>
		</div>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Donut and pie charts rely on precise trigonometry. Small mistakes produce dramatic visual bugs. Try each of these to build intuition for SVG arc commands.</p>
	<ol class="experiments">
		<li><strong>Change the <code>largeArc</code> flag to always be <code>1</code> (or always <code>0</code>).</strong> Slices smaller than 180 degrees will render as their complement — a 10% slice will appear as a 90% arc. The large-arc flag tells SVG which of the two possible arcs to draw between two points.</li>
		<li><strong>Remove the <code>- Math.PI / 2</code> offset from the start and end angle calculations.</strong> The chart will start drawing from the 3 o'clock position instead of 12 o'clock. The offset rotates the starting angle to match the conventional top-center origin.</li>
		<li><strong>Set <code>transform-origin</code> on the slices to <code>0px 0px</code> instead of <code>{'{cx}'}px {'{cy}'}px</code>.</strong> Hovering a slice will scale it from the top-left corner of the SVG, causing it to fly off in a random direction. The transform origin must match the center of the donut for the expand effect to look correct.</li>
		<li><strong>Make the slice percentages add up to more than 100 (e.g., double Oil to 60%).</strong> Slices will overlap because the cumulative angles exceed a full circle. The chart silently breaks — no error, just a misleading visualization. Always validate that your data sums correctly.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SVG arc commands (<code>A rx,ry rotation largeArcFlag,sweepFlag x,y</code>) are the building blocks of pie and donut slices. Each slice's start and end angles come from cumulative percentages converted to radians. The large-arc flag determines which of the two possible arcs to draw between two points on the circle.</p>
	<p class="prose">A donut chart uses two arcs per slice: an outer arc drawn clockwise and an inner arc drawn counter-clockwise, connected by straight line segments. When <code>innerR</code> is zero, the path simplifies to a pie wedge — a line from center to the outer arc and back. The <code>$derived</code> rune recalculates all arc paths instantly when toggling between modes.</p>
	<p class="prose">The hover-expand effect uses <code>transform: scale(1.04)</code> with <code>transform-origin</code> set to the chart center. This makes the slice grow outward from the center rather than from the SVG origin. A synchronized legend with <code>onpointerenter</code>/<code>onpointerleave</code> creates a bidirectional highlight between the chart and the text labels.</p>
	<p class="next">Next lesson: DV.6 makes charts responsive to any container width with zero media queries.</p>
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

	.toolbar {
		display: flex;
		gap: var(--space-sm);
	}
	.toggle-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.toggle-btn:hover {
		background: var(--color-border);
	}
	.chart-row {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-lg);
	}
	@media (min-width: 600px) {
		.chart-row {
			flex-direction: row;
			align-items: flex-start;
		}
	}
	.donut-chart {
		width: 100%;
		max-width: 320px;
		height: auto;
	}
	.slice {
		cursor: pointer;
	}
	.center-source {
		font-size: 14px;
		fill: var(--color-text);
		font-weight: 600;
	}
	.center-pct {
		font-size: 22px;
		fill: var(--color-text);
		font-weight: 800;
	}
	.center-label {
		font-size: 12px;
		fill: var(--color-text-muted);
	}
	.center-twh {
		font-size: 14px;
		fill: var(--color-text);
		font-weight: 700;
	}
	.legend {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.legend h4 {
		font-size: var(--text-sm);
		color: var(--color-text);
		margin: 0 0 var(--space-xs);
		font-weight: 700;
	}
	.legend-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		padding: 4px var(--space-xs);
		border-radius: var(--radius-xs);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.legend-row:hover,
	.legend-row.highlighted {
		background: var(--color-surface-2);
	}
	.legend-swatch {
		width: 12px;
		height: 12px;
		border-radius: var(--radius-xs);
		flex-shrink: 0;
	}
	.legend-name {
		font-size: var(--text-sm);
		color: var(--color-text);
		flex: 1;
	}
	.legend-pct {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
		font-family: var(--font-mono);
	}
	.legend-source {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin-block-start: var(--space-xs);
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
