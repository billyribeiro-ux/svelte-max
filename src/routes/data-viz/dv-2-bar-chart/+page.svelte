<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface EmissionData {
		country: string;
		emissions: number;
		color: string;
	}

	const rawData: EmissionData[] = [
		{ country: 'China', emissions: 11400, color: 'oklch(65% 0.22 25)' },
		{ country: 'United States', emissions: 4900, color: 'oklch(65% 0.22 270)' },
		{ country: 'India', emissions: 2900, color: 'oklch(65% 0.20 145)' },
		{ country: 'Russia', emissions: 1850, color: 'oklch(65% 0.18 60)' },
		{ country: 'Japan', emissions: 1050, color: 'oklch(65% 0.20 330)' },
		{ country: 'Germany', emissions: 640, color: 'oklch(65% 0.18 210)' },
		{ country: 'South Korea', emissions: 610, color: 'oklch(65% 0.20 90)' },
		{ country: 'Iran', emissions: 720, color: 'oklch(65% 0.18 180)' }
	];

	let sortByEmissions = $state(true);

	const sorted = $derived(
		[...rawData].sort((a, b) =>
			sortByEmissions ? b.emissions - a.emissions : a.country.localeCompare(b.country)
		)
	);

	const maxEmissions = $derived(Math.max(...sorted.map((d) => d.emissions)));
	const totalEmissions = $derived(sorted.reduce((sum, d) => sum + d.emissions, 0));

	const chartW = 600;
	const chartH = 380;
	const pad = { top: 20, right: 70, bottom: 20, left: 110 };
	const plotW = chartW - pad.left - pad.right;
	const plotH = chartH - pad.top - pad.bottom;
	const barH = 30;
	const barGap = 12;

	const scaleW = (v: number): number => (v / maxEmissions) * plotW;

	const gridTicks = [0, 3000, 6000, 9000, 12000];

	function toggleSort(): void {
		sortByEmissions = !sortByEmissions;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface EmissionData {\n" +
		"		country: string;\n" +
		"		emissions: number;\n" +
		"		color: string;\n" +
		"	}\n" +
		"\n" +
		"	const rawData: EmissionData[] = [\n" +
		"		{ country: 'China', emissions: 11400, color: 'oklch(65% 0.22 25)' },\n" +
		"		{ country: 'United States', emissions: 4900, color: 'oklch(65% 0.22 270)' },\n" +
		"		{ country: 'India', emissions: 2900, color: 'oklch(65% 0.20 145)' },\n" +
		"		{ country: 'Russia', emissions: 1850, color: 'oklch(65% 0.18 60)' },\n" +
		"		{ country: 'Japan', emissions: 1050, color: 'oklch(65% 0.20 330)' },\n" +
		"		{ country: 'Germany', emissions: 640, color: 'oklch(65% 0.18 210)' },\n" +
		"		{ country: 'South Korea', emissions: 610, color: 'oklch(65% 0.20 90)' },\n" +
		"		{ country: 'Iran', emissions: 720, color: 'oklch(65% 0.18 180)' }\n" +
		"	];\n" +
		"\n" +
		"	let sortByEmissions = $state(true);\n" +
		"\n" +
		"	const sorted = $derived(\n" +
		"		[...rawData].sort((a, b) =\u003e\n" +
		"			sortByEmissions ? b.emissions - a.emissions : a.country.localeCompare(b.country)\n" +
		"		)\n" +
		"	);\n" +
		"\n" +
		"	const maxEmissions = $derived(Math.max(...sorted.map((d) =\u003e d.emissions)));\n" +
		"	const totalEmissions = $derived(sorted.reduce((sum, d) =\u003e sum + d.emissions, 0));\n" +
		"\n" +
		"	const chartW = 600;\n" +
		"	const chartH = 380;\n" +
		"	const pad = { top: 20, right: 70, bottom: 20, left: 110 };\n" +
		"	const plotW = chartW - pad.left - pad.right;\n" +
		"	const plotH = chartH - pad.top - pad.bottom;\n" +
		"	const barH = 30;\n" +
		"	const barGap = 12;\n" +
		"\n" +
		"	const scaleW = (v: number): number =\u003e (v / maxEmissions) * plotW;\n" +
		"\n" +
		"	const gridTicks = [0, 3000, 6000, 9000, 12000];\n" +
		"\n" +
		"	function toggleSort(): void {\n" +
		"		sortByEmissions = !sortByEmissions;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.2 — Bar Chart\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e The bar chart is the workhorse of data viz — one bar per category,\n" +
		"		height or width encoding a quantity. Build it from \u003ccode\u003e&lt;rect&gt;\u003c/code\u003e elements\n" +
		"		positioned with computed x/y/width/height. Horizontal bars are often better for long labels.\n" +
		"		The scale is a simple linear function: \u003ccode\u003evalue / max * chartWidth\u003c/code\u003e. Axes, gridlines,\n" +
		"		and value labels complete the picture. OKLCH colors for each category from the PE7 palette.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"toolbar\"\u003e\n" +
		"			\u003cbutton class=\"sort-btn\" onclick={toggleSort}\u003e\n" +
		"				{sortByEmissions ? '↕ Sort A–Z' : '↕ Sort by emissions'}\n" +
		"			\u003c/button\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003csvg viewBox=\"0 0 {chartW} {chartH}\" class=\"chart\" role=\"img\" aria-label=\"Horizontal bar chart of CO2 emissions by country\"\u003e\n" +
		"			\u003cg transform=\"translate({pad.left}, {pad.top})\"\u003e\n" +
		"				\u003c!-- gridlines --\u003e\n" +
		"				{#each gridTicks as tick}\n" +
		"					\u003cline\n" +
		"						x1={scaleW(tick)}\n" +
		"						y1={0}\n" +
		"						x2={scaleW(tick)}\n" +
		"						y2={plotH}\n" +
		"						class=\"gridline\"\n" +
		"					/\u003e\n" +
		"					\u003ctext\n" +
		"						x={scaleW(tick)}\n" +
		"						y={-6}\n" +
		"						class=\"grid-label\"\n" +
		"						text-anchor=\"middle\"\n" +
		"					\u003e\n" +
		"						{tick === 0 ? '0' : `${(tick / 1000).toFixed(0)}k`}\n" +
		"					\u003c/text\u003e\n" +
		"				{/each}\n" +
		"\n" +
		"				\u003c!-- bars --\u003e\n" +
		"				{#each sorted as item, i (item.country)}\n" +
		"					{@const y = i * (barH + barGap)}\n" +
		"					{@const w = scaleW(item.emissions)}\n" +
		"					\u003cg\n" +
		"						class=\"bar-group\"\n" +
		"						style=\"transform: translateY({y}px); transition: transform var(--dur-base) var(--ease-out);\"\n" +
		"					\u003e\n" +
		"						\u003c!-- country label --\u003e\n" +
		"						\u003ctext x={-8} y={barH / 2 + 5} class=\"country-label\" text-anchor=\"end\"\u003e\n" +
		"							{item.country}\n" +
		"						\u003c/text\u003e\n" +
		"\n" +
		"						\u003c!-- bar --\u003e\n" +
		"						\u003crect\n" +
		"							x={0}\n" +
		"							y={0}\n" +
		"							width={w}\n" +
		"							height={barH}\n" +
		"							rx={4}\n" +
		"							fill={item.color}\n" +
		"							class=\"bar-rect\"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.2 — Bar Chart</h1>
	<p class="concept">
		<strong>Concept.</strong> The bar chart is the workhorse of data viz — one bar per category,
		height or width encoding a quantity. Build it from <code>&lt;rect&gt;</code> elements
		positioned with computed x/y/width/height. Horizontal bars are often better for long labels.
		The scale is a simple linear function: <code>value / max * chartWidth</code>. Axes, gridlines,
		and value labels complete the picture. OKLCH colors for each category from the PE7 palette.
	</p>

	<div class="build">
		<div class="toolbar">
			<button class="sort-btn" onclick={toggleSort}>
				{sortByEmissions ? '↕ Sort A–Z' : '↕ Sort by emissions'}
			</button>
		</div>

		<svg viewBox="0 0 {chartW} {chartH}" class="chart" role="img" aria-label="Horizontal bar chart of CO2 emissions by country">
			<g transform="translate({pad.left}, {pad.top})">
				<!-- gridlines -->
				{#each gridTicks as tick}
					<line
						x1={scaleW(tick)}
						y1={0}
						x2={scaleW(tick)}
						y2={plotH}
						class="gridline"
					/>
					<text
						x={scaleW(tick)}
						y={-6}
						class="grid-label"
						text-anchor="middle"
					>
						{tick === 0 ? '0' : `${(tick / 1000).toFixed(0)}k`}
					</text>
				{/each}

				<!-- bars -->
				{#each sorted as item, i (item.country)}
					{@const y = i * (barH + barGap)}
					{@const w = scaleW(item.emissions)}
					<g
						class="bar-group"
						style="transform: translateY({y}px); transition: transform var(--dur-base) var(--ease-out);"
					>
						<!-- country label -->
						<text x={-8} y={barH / 2 + 5} class="country-label" text-anchor="end">
							{item.country}
						</text>

						<!-- bar -->
						<rect
							x={0}
							y={0}
							width={w}
							height={barH}
							rx={4}
							fill={item.color}
							class="bar-rect"
						/>

						<!-- value label -->
						<text x={w + 6} y={barH / 2 + 5} class="value-label">
							{item.emissions.toLocaleString()} Mt
						</text>
					</g>
				{/each}
			</g>
		</svg>

		<p class="total-stat">
			Total: <strong>{totalEmissions.toLocaleString()} Mt CO2</strong> (top 8 emitters, 2023 est.)
		</p>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Deliberately breaking the bar chart reveals how each piece contributes to the whole. Try each modification, observe the result, then undo it.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>(item.country)</code> key from the <code>{'{#each}'}</code> block.</strong> Toggle the sort button — bars will no longer animate smoothly to their new positions. Without a keyed each block, Svelte cannot track which DOM node belongs to which data item, so it destroys and recreates elements instead of moving them.</li>
		<li><strong>Change <code>scaleW</code> to divide by a fixed value like <code>5000</code> instead of <code>maxEmissions</code>.</strong> China's bar will overflow the chart area because the scale no longer adapts to the data range. This shows why data-driven scales are essential.</li>
		<li><strong>Remove the <code>transition: transform</code> from the bar group's inline style.</strong> Sorting still works, but bars jump instantly to new positions. The CSS transition is what creates the smooth reordering animation.</li>
		<li><strong>Set all bar colors to the same value.</strong> The chart becomes harder to scan because you lose the visual association between each bar and its country label. Distinct hues per category are not decoration — they are a readability feature.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Horizontal bar charts encode quantitative data as <code>&lt;rect&gt;</code> widths computed from a linear scale function. The scale maps each value to a pixel width relative to the maximum, ensuring bars always fit within the plot area regardless of the data range.</p>
	<p class="prose">Sorting state managed with <code>$state</code> feeds into a <code>$derived</code> array that reorders the data. Keyed <code>{'{#each}'}</code> blocks combined with CSS <code>transition: transform</code> create smooth animated reordering — Svelte moves existing DOM nodes rather than recreating them.</p>
	<p class="prose">Value labels placed at the end of each bar provide precise readability, which is essential for data journalism where readers need exact numbers. Dashed gridlines offer reference scale without visual clutter, and OKLCH colors with distinct hues give each country a unique identity that persists across sort order changes.</p>
	<p class="next">Next lesson: DV.3 draws multi-series line charts with hover tooltips.</p>
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
	.sort-btn {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-size: var(--text-sm);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.sort-btn:hover {
		background: var(--color-border);
	}
	.chart {
		width: 100%;
		max-width: 640px;
		height: auto;
	}
	.gridline {
		stroke: var(--color-border);
		stroke-width: 1;
		stroke-dasharray: 4 4;
	}
	.grid-label {
		font-size: 10px;
		fill: var(--color-text-muted);
	}
	.country-label {
		font-size: 12px;
		fill: var(--color-text);
		font-weight: 500;
	}
	.bar-rect {
		transition: width var(--dur-base) var(--ease-out);
	}
	.value-label {
		font-size: 11px;
		fill: var(--color-text-muted);
		font-weight: 600;
	}
	.total-stat {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
	.total-stat strong {
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
