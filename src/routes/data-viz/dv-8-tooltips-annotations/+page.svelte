<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface DataPoint {
		year: number;
		return_pct: number;
	}

	const sp500Data: DataPoint[] = [
		{ year: 2000, return_pct: -9.1 },
		{ year: 2001, return_pct: -11.9 },
		{ year: 2002, return_pct: -22.1 },
		{ year: 2003, return_pct: 28.7 },
		{ year: 2004, return_pct: 10.9 },
		{ year: 2005, return_pct: 4.9 },
		{ year: 2006, return_pct: 15.8 },
		{ year: 2007, return_pct: 5.5 },
		{ year: 2008, return_pct: -37.0 },
		{ year: 2009, return_pct: 26.5 },
		{ year: 2010, return_pct: 15.1 },
		{ year: 2011, return_pct: 2.1 },
		{ year: 2012, return_pct: 16.0 },
		{ year: 2013, return_pct: 32.4 },
		{ year: 2014, return_pct: 13.7 },
		{ year: 2015, return_pct: 1.4 },
		{ year: 2016, return_pct: 12.0 },
		{ year: 2017, return_pct: 21.8 },
		{ year: 2018, return_pct: -4.4 },
		{ year: 2019, return_pct: 31.5 },
		{ year: 2020, return_pct: 18.4 },
		{ year: 2021, return_pct: 28.7 },
		{ year: 2022, return_pct: -18.1 },
		{ year: 2023, return_pct: 26.3 },
		{ year: 2024, return_pct: 25.0 }
	];

	interface Annotation {
		year: number;
		label: string;
		color: string;
	}

	const annotations: Annotation[] = [
		{ year: 2008, label: '2008 Financial Crisis', color: 'oklch(55% 0.2 25)' },
		{ year: 2020, label: '2020 COVID Crash & Recovery', color: 'oklch(55% 0.18 280)' },
		{ year: 2022, label: '2022 Rate Hikes', color: 'oklch(55% 0.15 50)' }
	];

	let containerWidth = $state(0);
	let hoveredIndex = $state<number | null>(null);
	let mouseX = $state(0);
	let mouseY = $state(0);
	let svgEl = $state<SVGSVGElement | null>(null);

	const padding = { top: 30, right: 30, bottom: 50, left: 55 };
	const chartHeight = 360;
	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 100));
	const plotH = chartHeight - padding.top - padding.bottom;

	const minReturn = Math.min(...sp500Data.map((d) => d.return_pct));
	const maxReturn = Math.max(...sp500Data.map((d) => d.return_pct));
	const yMin = Math.floor(minReturn / 10) * 10 - 5;
	const yMax = Math.ceil(maxReturn / 10) * 10 + 5;

	function xScale(year: number): number {
		return ((year - 2000) / 24) * plotW;
	}

	function yScale(val: number): number {
		return plotH - ((val - yMin) / (yMax - yMin)) * plotH;
	}

	const linePath = $derived(
		sp500Data
			.map((d, i) => {
				const x = xScale(d.year);
				const y = yScale(d.return_pct);
				return `${i === 0 ? 'M' : 'L'}${x},${y}`;
			})
			.join(' ')
	);

	const yTicks = $derived(() => {
		const ticks: number[] = [];
		for (let v = yMin; v <= yMax; v += 10) {
			ticks.push(v);
		}
		return ticks;
	});

	const xTicks = [2000, 2004, 2008, 2012, 2016, 2020, 2024];

	function handlePointerMove(e: PointerEvent): void {
		if (!svgEl) return;
		const rect = svgEl.getBoundingClientRect();
		const svgX = e.clientX - rect.left - padding.left;
		mouseX = e.clientX;
		mouseY = e.clientY;

		let closest = 0;
		let minDist = Infinity;
		for (let i = 0; i < sp500Data.length; i++) {
			const d = Math.abs(xScale(sp500Data[i].year) - svgX);
			if (d < minDist) {
				minDist = d;
				closest = i;
			}
		}
		hoveredIndex = minDist < plotW / 10 ? closest : null;
	}

	function handlePointerLeave(): void {
		hoveredIndex = null;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface DataPoint {\n" +
		"		year: number;\n" +
		"		return_pct: number;\n" +
		"	}\n" +
		"\n" +
		"	const sp500Data: DataPoint[] = [\n" +
		"		{ year: 2000, return_pct: -9.1 },\n" +
		"		{ year: 2001, return_pct: -11.9 },\n" +
		"		{ year: 2002, return_pct: -22.1 },\n" +
		"		{ year: 2003, return_pct: 28.7 },\n" +
		"		{ year: 2004, return_pct: 10.9 },\n" +
		"		{ year: 2005, return_pct: 4.9 },\n" +
		"		{ year: 2006, return_pct: 15.8 },\n" +
		"		{ year: 2007, return_pct: 5.5 },\n" +
		"		{ year: 2008, return_pct: -37.0 },\n" +
		"		{ year: 2009, return_pct: 26.5 },\n" +
		"		{ year: 2010, return_pct: 15.1 },\n" +
		"		{ year: 2011, return_pct: 2.1 },\n" +
		"		{ year: 2012, return_pct: 16.0 },\n" +
		"		{ year: 2013, return_pct: 32.4 },\n" +
		"		{ year: 2014, return_pct: 13.7 },\n" +
		"		{ year: 2015, return_pct: 1.4 },\n" +
		"		{ year: 2016, return_pct: 12.0 },\n" +
		"		{ year: 2017, return_pct: 21.8 },\n" +
		"		{ year: 2018, return_pct: -4.4 },\n" +
		"		{ year: 2019, return_pct: 31.5 },\n" +
		"		{ year: 2020, return_pct: 18.4 },\n" +
		"		{ year: 2021, return_pct: 28.7 },\n" +
		"		{ year: 2022, return_pct: -18.1 },\n" +
		"		{ year: 2023, return_pct: 26.3 },\n" +
		"		{ year: 2024, return_pct: 25.0 }\n" +
		"	];\n" +
		"\n" +
		"	interface Annotation {\n" +
		"		year: number;\n" +
		"		label: string;\n" +
		"		color: string;\n" +
		"	}\n" +
		"\n" +
		"	const annotations: Annotation[] = [\n" +
		"		{ year: 2008, label: '2008 Financial Crisis', color: 'oklch(55% 0.2 25)' },\n" +
		"		{ year: 2020, label: '2020 COVID Crash & Recovery', color: 'oklch(55% 0.18 280)' },\n" +
		"		{ year: 2022, label: '2022 Rate Hikes', color: 'oklch(55% 0.15 50)' }\n" +
		"	];\n" +
		"\n" +
		"	let containerWidth = $state(0);\n" +
		"	let hoveredIndex = $state\u003cnumber | null\u003e(null);\n" +
		"	let mouseX = $state(0);\n" +
		"	let mouseY = $state(0);\n" +
		"	let svgEl = $state\u003cSVGSVGElement | null\u003e(null);\n" +
		"\n" +
		"	const padding = { top: 30, right: 30, bottom: 50, left: 55 };\n" +
		"	const chartHeight = 360;\n" +
		"	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 100));\n" +
		"	const plotH = chartHeight - padding.top - padding.bottom;\n" +
		"\n" +
		"	const minReturn = Math.min(...sp500Data.map((d) =\u003e d.return_pct));\n" +
		"	const maxReturn = Math.max(...sp500Data.map((d) =\u003e d.return_pct));\n" +
		"	const yMin = Math.floor(minReturn / 10) * 10 - 5;\n" +
		"	const yMax = Math.ceil(maxReturn / 10) * 10 + 5;\n" +
		"\n" +
		"	function xScale(year: number): number {\n" +
		"		return ((year - 2000) / 24) * plotW;\n" +
		"	}\n" +
		"\n" +
		"	function yScale(val: number): number {\n" +
		"		return plotH - ((val - yMin) / (yMax - yMin)) * plotH;\n" +
		"	}\n" +
		"\n" +
		"	const linePath = $derived(\n" +
		"		sp500Data\n" +
		"			.map((d, i) =\u003e {\n" +
		"				const x = xScale(d.year);\n" +
		"				const y = yScale(d.return_pct);\n" +
		"				return `${i === 0 ? 'M' : 'L'}${x},${y}`;\n" +
		"			})\n" +
		"			.join(' ')\n" +
		"	);\n" +
		"\n" +
		"	const yTicks = $derived(() =\u003e {\n" +
		"		const ticks: number[] = [];\n" +
		"		for (let v = yMin; v \u003c= yMax; v += 10) {\n" +
		"			ticks.push(v);\n" +
		"		}\n" +
		"		return ticks;\n" +
		"	});\n" +
		"\n" +
		"	const xTicks = [2000, 2004, 2008, 2012, 2016, 2020, 2024];\n" +
		"\n" +
		"	function handlePointerMove(e: PointerEvent): void {\n" +
		"		if (!svgEl) return;\n" +
		"		const rect = svgEl.getBoundingClientRect();\n" +
		"		const svgX = e.clientX - rect.left - padding.left;\n" +
		"		mouseX = e.clientX;\n" +
		"		mouseY = e.clientY;\n" +
		"\n" +
		"		let closest = 0;\n" +
		"		let minDist = Infinity;\n" +
		"		for (let i = 0; i \u003c sp500Data.length; i++) {\n" +
		"			const d = Math.abs(xScale(sp500Data[i].year) - svgX);\n" +
		"			if (d \u003c minDist) {\n" +
		"				minDist = d;\n" +
		"				closest = i;\n" +
		"			}\n" +
		"		}\n" +
		"		hoveredIndex = minDist \u003c plotW / 10 ? closest : null;\n" +
		"	}\n" +
		"\n" +
		"	function handlePointerLeave(): void {\n" +
		"		hoveredIndex = null;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.8 — Tooltips & Annotations\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eRaw charts lack context.\u003c/strong\u003e Tooltips show exact values on hover. Annotations call\n" +
		"		out significant events — peaks, crashes, milestones. Build tooltips as positioned\n" +
		"		\u003ccode\u003e&lt;div&gt;\u003c/code\u003es overlaying the SVG (HTML tooltips are more flexible than SVG\n" +
		"		\u003ccode\u003e&lt;text&gt;\u003c/code\u003e). Track mouse position with \u003ccode\u003eonpointermove\u003c/code\u003e, find the\n" +
		"		nearest data point, and position the tooltip absolutely.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"chart-wrapper\" bind:clientWidth={containerWidth}\u003e\n" +
		"			{#if containerWidth \u003e 0}\n" +
		"				\u003csvg\n" +
		"					bind:this={svgEl}\n" +
		"					width={containerWidth}\n" +
		"					height={chartHeight}\n" +
		"					viewBox=\"0 0 {containerWidth} {chartHeight}\"\n" +
		"					role=\"img\"\n" +
		"					aria-label=\"S&P 500 annual returns from 2000 to 2024 with annotations for major market events\"\n" +
		"					onpointermove={handlePointerMove}\n" +
		"					onpointerleave={handlePointerLeave}\n" +
		"				\u003e\n" +
		"					\u003cg transform=\"translate({padding.left}, {padding.top})\"\u003e\n" +
		"						\u003c!-- Zero line --\u003e\n" +
		"						\u003cline\n" +
		"							x1={0}\n" +
		"							y1={yScale(0)}\n" +
		"							x2={plotW}\n" +
		"							y2={yScale(0)}\n" +
		"							stroke=\"var(--color-text-muted)\"\n" +
		"							stroke-width=\"1\"\n" +
		"							opacity=\"0.5\"\n" +
		"						/\u003e\n" +
		"\n" +
		"						\u003c!-- Y grid lines --\u003e\n" +
		"						{#each yTicks() as val}\n" +
		"							\u003cline\n" +
		"								x1={0}\n" +
		"								y1={yScale(val)}\n" +
		"								x2={plotW}\n" +
		"								y2={yScale(val)}\n" +
		"								stroke=\"var(--color-border)\"\n" +
		"								stroke-width=\"0.5\"\n" +
		"							/\u003e\n" +
		"							\u003ctext\n" +
		"								x={-8}\n" +
		"								y={yScale(val)}\n" +
		"								text-anchor=\"end\"\n" +
		"								dominant-baseline=\"central\"\n" +
		"								fill=\"var(--color-text-muted)\"\n" +
		"								font-size=\"10\"\n" +
		"							\u003e\n" +
		"								{val \u003e 0 ? '+' : ''}{val}%\n" +
		"							\u003c/text\u003e\n" +
		"						{/each}\n" +
		"\n" +
		"						\u003c!-- X axis labels --\u003e\n" +
		"						{#each xTicks as year}\n" +
		"							\u003ctext\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.8 — Tooltips & Annotations</h1>
	<p class="concept">
		<strong>Raw charts lack context.</strong> Tooltips show exact values on hover. Annotations call
		out significant events — peaks, crashes, milestones. Build tooltips as positioned
		<code>&lt;div&gt;</code>s overlaying the SVG (HTML tooltips are more flexible than SVG
		<code>&lt;text&gt;</code>). Track mouse position with <code>onpointermove</code>, find the
		nearest data point, and position the tooltip absolutely.
	</p>

	<div class="build">
		<div class="chart-wrapper" bind:clientWidth={containerWidth}>
			{#if containerWidth > 0}
				<svg
					bind:this={svgEl}
					width={containerWidth}
					height={chartHeight}
					viewBox="0 0 {containerWidth} {chartHeight}"
					role="img"
					aria-label="S&P 500 annual returns from 2000 to 2024 with annotations for major market events"
					onpointermove={handlePointerMove}
					onpointerleave={handlePointerLeave}
				>
					<g transform="translate({padding.left}, {padding.top})">
						<!-- Zero line -->
						<line
							x1={0}
							y1={yScale(0)}
							x2={plotW}
							y2={yScale(0)}
							stroke="var(--color-text-muted)"
							stroke-width="1"
							opacity="0.5"
						/>

						<!-- Y grid lines -->
						{#each yTicks() as val}
							<line
								x1={0}
								y1={yScale(val)}
								x2={plotW}
								y2={yScale(val)}
								stroke="var(--color-border)"
								stroke-width="0.5"
							/>
							<text
								x={-8}
								y={yScale(val)}
								text-anchor="end"
								dominant-baseline="central"
								fill="var(--color-text-muted)"
								font-size="10"
							>
								{val > 0 ? '+' : ''}{val}%
							</text>
						{/each}

						<!-- X axis labels -->
						{#each xTicks as year}
							<text
								x={xScale(year)}
								y={plotH + 24}
								text-anchor="middle"
								fill="var(--color-text-muted)"
								font-size="10"
							>
								{year}
							</text>
						{/each}

						<!-- Annotation lines -->
						{#each annotations as ann}
							{@const ax = xScale(ann.year)}
							<line
								x1={ax}
								y1={0}
								x2={ax}
								y2={plotH}
								stroke={ann.color}
								stroke-width="1.5"
								stroke-dasharray="5,4"
								opacity="0.7"
							/>
							<text
								x={ax + 4}
								y={12}
								fill={ann.color}
								font-size="9"
								font-weight="600"
								transform="rotate(-30, {ax + 4}, 12)"
							>
								{ann.label}
							</text>
						{/each}

						<!-- Line path -->
						<path
							d={linePath}
							fill="none"
							stroke="oklch(55% 0.2 250)"
							stroke-width="2.5"
							stroke-linejoin="round"
							stroke-linecap="round"
						/>

						<!-- Data dots -->
						{#each sp500Data as d, i}
							<circle
								cx={xScale(d.year)}
								cy={yScale(d.return_pct)}
								r={hoveredIndex === i ? 6 : 3.5}
								fill={d.return_pct >= 0 ? 'oklch(55% 0.18 145)' : 'oklch(55% 0.2 25)'}
								stroke="var(--color-surface)"
								stroke-width="1.5"
							/>
						{/each}

						<!-- Hover indicator line -->
						{#if hoveredIndex !== null}
							{@const hd = sp500Data[hoveredIndex]}
							<line
								x1={xScale(hd.year)}
								y1={0}
								x2={xScale(hd.year)}
								y2={plotH}
								stroke="var(--color-text-muted)"
								stroke-width="1"
								stroke-dasharray="3,3"
								opacity="0.4"
							/>
						{/if}
					</g>
				</svg>

				<!-- Tooltip -->
				{#if hoveredIndex !== null}
					{@const hd = sp500Data[hoveredIndex]}
					<div
						class="tooltip"
						style:left="{mouseX + 14}px"
						style:top="{mouseY - 50}px"
					>
						<strong>{hd.year}</strong>
						<span class:positive={hd.return_pct >= 0} class:negative={hd.return_pct < 0}>
							{hd.return_pct >= 0 ? '+' : ''}{hd.return_pct.toFixed(1)}%
						</span>
					</div>
				{/if}
			{/if}
		</div>

		<div class="annotations-legend">
			{#each annotations as ann}
				<span class="ann-item">
					<span class="ann-dash" style:border-color={ann.color}></span>
					{ann.label}
				</span>
			{/each}
		</div>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Tooltips and annotations are layered on top of the base chart. Break the layering to understand how they interact.</p>
	<ol class="experiments">
		<li><strong>Change the tooltip from <code>position: fixed</code> to <code>position: absolute</code> without adjusting the coordinates.</strong> The tooltip will appear at the wrong location or inside the SVG's container offset. Fixed positioning uses viewport coordinates, while absolute positioning uses the nearest positioned ancestor — you need to choose one and compute coordinates accordingly.</li>
		<li><strong>Remove <code>pointer-events: none</code> from the tooltip CSS.</strong> When the tooltip appears under the cursor, it will intercept pointer events and cause the <code>onpointerleave</code> to fire on the SVG, creating a flickering tooltip that appears and disappears rapidly.</li>
		<li><strong>Remove the <code>bind:this={'{svgEl}'}</code> and the <code>getBoundingClientRect()</code> call in the handler.</strong> The pointer position cannot be converted to SVG coordinates without knowing the SVG element's position on the page. The hovered index will always be wrong or undefined.</li>
		<li><strong>Delete all annotation lines and text from the SVG.</strong> The chart still shows data correctly, but loses all contextual meaning. Without the "2008 Financial Crisis" or "2020 COVID" annotations, the viewer has no framework for interpreting the dramatic drops.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Tooltips work best as positioned HTML <code>&lt;div&gt;</code> elements rather than SVG text. HTML gives you rich formatting, word wrap, and easier styling. The key is tracking mouse position with <code>onpointermove</code> on the SVG, converting screen coordinates to data space, and finding the nearest data point with a simple distance loop.</p>
	<p class="prose">Annotations are vertical dashed lines and rotated text elements placed inside the SVG at data-derived positions. They provide the editorial context that transforms a chart from raw data into a story — without them, the viewer has no framework for interpreting significant events like crashes or recoveries.</p>
	<p class="prose">The <code>$state&lt;number | null&gt;</code> pattern for the hovered index is clean and expressive: <code>null</code> means no tooltip, a number means show the tooltip for that data point. The tooltip must have <code>pointer-events: none</code> to avoid intercepting mouse events and causing flicker.</p>
	<p class="next">Next lesson: DV.9 builds scroll-driven storytelling where the reader's scroll position drives chart transitions.</p>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	@media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.chart-wrapper {
		position: relative;
		/* anchor() positioning — CSS anchor positioning for tooltips/popovers */
		anchor-name: --chart-area;
	}
	svg {
		display: block;
		touch-action: none;
	}
	.tooltip {
		position: fixed;
		/* anchor() — CSS Anchor Positioning pairs this tooltip with --chart-area */
		position-anchor: --chart-area;
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-xs) var(--space-sm);
		box-shadow: var(--shadow-md);
		pointer-events: none;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 2px;
		font-size: var(--text-sm);
	}
	.tooltip strong {
		color: var(--color-text);
		font-family: var(--font-mono);
	}
	.positive {
		color: oklch(45% 0.18 145);
		font-weight: 600;
		font-family: var(--font-mono);
	}
	.negative {
		color: oklch(50% 0.2 25);
		font-weight: 600;
		font-family: var(--font-mono);
	}
	.annotations-legend {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.ann-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
	}
	.ann-dash {
		display: inline-block;
		inline-size: 16px;
		block-size: 0;
		border-block-start: 2px dashed;
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
