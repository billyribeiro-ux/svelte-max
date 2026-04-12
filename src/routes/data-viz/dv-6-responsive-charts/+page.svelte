<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface CountryGDP {
		country: string;
		gdp: number;
	}

	const data: CountryGDP[] = [
		{ country: 'Luxembourg', gdp: 126598 },
		{ country: 'Ireland', gdp: 106999 },
		{ country: 'Switzerland', gdp: 99994 },
		{ country: 'Norway', gdp: 87925 },
		{ country: 'Singapore', gdp: 82807 },
		{ country: 'United States', gdp: 80035 },
		{ country: 'Iceland', gdp: 75180 },
		{ country: 'Denmark', gdp: 67803 },
		{ country: 'Australia', gdp: 65366 },
		{ country: 'Netherlands', gdp: 61098 }
	];

	const maxGDP = Math.max(...data.map((d) => d.gdp));

	let smallWidth = $state(0);
	let fullWidth = $state(0);
	let sliderContainerWidth = $state(0);
	let sliderTargetWidth = $state(300);

	function barHeight(containerW: number): number {
		return containerW < 400 ? 18 : 26;
	}

	function labelSize(containerW: number): number {
		return containerW < 400 ? 9 : 12;
	}

	function valueSize(containerW: number): number {
		return containerW < 400 ? 8 : 11;
	}

	function chartHeight(containerW: number): number {
		const bh = barHeight(containerW);
		const gap = Math.round(bh * 0.5);
		return data.length * (bh + gap) + gap;
	}

	function formatGDP(value: number): string {
		return `$${Math.round(value / 1000)}k`;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface CountryGDP {\n" +
		"		country: string;\n" +
		"		gdp: number;\n" +
		"	}\n" +
		"\n" +
		"	const data: CountryGDP[] = [\n" +
		"		{ country: 'Luxembourg', gdp: 126598 },\n" +
		"		{ country: 'Ireland', gdp: 106999 },\n" +
		"		{ country: 'Switzerland', gdp: 99994 },\n" +
		"		{ country: 'Norway', gdp: 87925 },\n" +
		"		{ country: 'Singapore', gdp: 82807 },\n" +
		"		{ country: 'United States', gdp: 80035 },\n" +
		"		{ country: 'Iceland', gdp: 75180 },\n" +
		"		{ country: 'Denmark', gdp: 67803 },\n" +
		"		{ country: 'Australia', gdp: 65366 },\n" +
		"		{ country: 'Netherlands', gdp: 61098 }\n" +
		"	];\n" +
		"\n" +
		"	const maxGDP = Math.max(...data.map((d) =\u003e d.gdp));\n" +
		"\n" +
		"	let smallWidth = $state(0);\n" +
		"	let fullWidth = $state(0);\n" +
		"	let sliderContainerWidth = $state(0);\n" +
		"	let sliderTargetWidth = $state(300);\n" +
		"\n" +
		"	function barHeight(containerW: number): number {\n" +
		"		return containerW \u003c 400 ? 18 : 26;\n" +
		"	}\n" +
		"\n" +
		"	function labelSize(containerW: number): number {\n" +
		"		return containerW \u003c 400 ? 9 : 12;\n" +
		"	}\n" +
		"\n" +
		"	function valueSize(containerW: number): number {\n" +
		"		return containerW \u003c 400 ? 8 : 11;\n" +
		"	}\n" +
		"\n" +
		"	function chartHeight(containerW: number): number {\n" +
		"		const bh = barHeight(containerW);\n" +
		"		const gap = Math.round(bh * 0.5);\n" +
		"		return data.length * (bh + gap) + gap;\n" +
		"	}\n" +
		"\n" +
		"	function formatGDP(value: number): string {\n" +
		"		return `$${Math.round(value / 1000)}k`;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.6 — Responsive Charts\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCharts must adapt to their container.\u003c/strong\u003e A sidebar chart is 240px wide, a hero\n" +
		"		chart is 1200px. Use \u003ccode\u003ebind:clientWidth\u003c/code\u003e on a wrapper\n" +
		"		\u003ccode\u003e&lt;div&gt;\u003c/code\u003e to read the container's width reactively. Derive the SVG\n" +
		"		\u003ccode\u003eviewBox\u003c/code\u003e and all scale functions from this width. The chart re-renders perfectly at any\n" +
		"		size with zero media queries. This is how The Pudding builds responsive interactives — one chart definition,\n" +
		"		infinite sizes.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003ch3\u003eSmall container (300px)\u003c/h3\u003e\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"chart-container chart-container--small\" bind:clientWidth={smallWidth}\u003e\n" +
		"			{#if smallWidth \u003e 0}\n" +
		"				{@const bh = barHeight(smallWidth)}\n" +
		"				{@const gap = Math.round(bh * 0.5)}\n" +
		"				{@const labelW = smallWidth \u003c 400 ? 70 : 110}\n" +
		"				{@const barArea = smallWidth - labelW - 40}\n" +
		"				{@const h = chartHeight(smallWidth)}\n" +
		"				\u003csvg\n" +
		"					width={smallWidth}\n" +
		"					height={h}\n" +
		"					viewBox=\"0 0 {smallWidth} {h}\"\n" +
		"					role=\"img\"\n" +
		"					aria-label=\"GDP per capita bar chart, small view\"\n" +
		"				\u003e\n" +
		"					{#each data as item, i}\n" +
		"						{@const y = gap + i * (bh + gap)}\n" +
		"						{@const barW = (item.gdp / maxGDP) * barArea}\n" +
		"						\u003ctext\n" +
		"							x={labelW - 6}\n" +
		"							y={y + bh / 2}\n" +
		"							text-anchor=\"end\"\n" +
		"							dominant-baseline=\"central\"\n" +
		"							fill=\"var(--color-text-muted)\"\n" +
		"							font-size={labelSize(smallWidth)}\n" +
		"						\u003e\n" +
		"							{item.country}\n" +
		"						\u003c/text\u003e\n" +
		"						\u003crect\n" +
		"							x={labelW}\n" +
		"							{y}\n" +
		"							width={barW}\n" +
		"							height={bh}\n" +
		"							rx=\"3\"\n" +
		"							fill=\"oklch(60% 0.18 250)\"\n" +
		"						/\u003e\n" +
		"						\u003ctext\n" +
		"							x={labelW + barW + 4}\n" +
		"							y={y + bh / 2}\n" +
		"							dominant-baseline=\"central\"\n" +
		"							fill=\"var(--color-text-muted)\"\n" +
		"							font-size={valueSize(smallWidth)}\n" +
		"						\u003e\n" +
		"							{formatGDP(item.gdp)}\n" +
		"						\u003c/text\u003e\n" +
		"					{/each}\n" +
		"				\u003c/svg\u003e\n" +
		"			{/if}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.6 — Responsive Charts</h1>
	<p class="concept">
		<strong>Charts must adapt to their container.</strong> A sidebar chart is 240px wide, a hero
		chart is 1200px. Use <code>bind:clientWidth</code> on a wrapper
		<code>&lt;div&gt;</code> to read the container's width reactively. Derive the SVG
		<code>viewBox</code> and all scale functions from this width. The chart re-renders perfectly at any
		size with zero media queries. This is how The Pudding builds responsive interactives — one chart definition,
		infinite sizes.
	</p>

	<h3>Small container (300px)</h3>
	<div class="build">
		<div class="chart-container chart-container--small" bind:clientWidth={smallWidth}>
			{#if smallWidth > 0}
				{@const bh = barHeight(smallWidth)}
				{@const gap = Math.round(bh * 0.5)}
				{@const labelW = smallWidth < 400 ? 70 : 110}
				{@const barArea = smallWidth - labelW - 40}
				{@const h = chartHeight(smallWidth)}
				<svg
					width={smallWidth}
					height={h}
					viewBox="0 0 {smallWidth} {h}"
					role="img"
					aria-label="GDP per capita bar chart, small view"
				>
					{#each data as item, i}
						{@const y = gap + i * (bh + gap)}
						{@const barW = (item.gdp / maxGDP) * barArea}
						<text
							x={labelW - 6}
							y={y + bh / 2}
							text-anchor="end"
							dominant-baseline="central"
							fill="var(--color-text-muted)"
							font-size={labelSize(smallWidth)}
						>
							{item.country}
						</text>
						<rect
							x={labelW}
							{y}
							width={barW}
							height={bh}
							rx="3"
							fill="oklch(60% 0.18 250)"
						/>
						<text
							x={labelW + barW + 4}
							y={y + bh / 2}
							dominant-baseline="central"
							fill="var(--color-text-muted)"
							font-size={valueSize(smallWidth)}
						>
							{formatGDP(item.gdp)}
						</text>
					{/each}
				</svg>
			{/if}
		</div>
	</div>

	<h3>Full-width container</h3>
	<div class="build">
		<div class="chart-container" bind:clientWidth={fullWidth}>
			{#if fullWidth > 0}
				{@const bh = barHeight(fullWidth)}
				{@const gap = Math.round(bh * 0.5)}
				{@const labelW = fullWidth < 400 ? 70 : 110}
				{@const barArea = fullWidth - labelW - 60}
				{@const h = chartHeight(fullWidth)}
				<svg
					width={fullWidth}
					height={h}
					viewBox="0 0 {fullWidth} {h}"
					role="img"
					aria-label="GDP per capita bar chart, full-width view"
				>
					{#each data as item, i}
						{@const y = gap + i * (bh + gap)}
						{@const barW = (item.gdp / maxGDP) * barArea}
						<text
							x={labelW - 6}
							y={y + bh / 2}
							text-anchor="end"
							dominant-baseline="central"
							fill="var(--color-text)"
							font-size={labelSize(fullWidth)}
						>
							{item.country}
						</text>
						<rect
							x={labelW}
							{y}
							width={barW}
							height={bh}
							rx="4"
							fill="oklch(60% 0.18 250)"
						/>
						<text
							x={labelW + barW + 6}
							y={y + bh / 2}
							dominant-baseline="central"
							fill="var(--color-text-muted)"
							font-size={valueSize(fullWidth)}
						>
							{formatGDP(item.gdp)}
						</text>
					{/each}
				</svg>
			{/if}
		</div>
	</div>

	<h3>Adjustable container</h3>
	<div class="build">
		<label class="slider-label">
			Container width: <strong>{sliderTargetWidth}px</strong>
			<input
				type="range"
				min="180"
				max="900"
				step="1"
				bind:value={sliderTargetWidth}
				class="slider"
			/>
		</label>
		<div
			class="chart-container chart-container--adjustable"
			style:width="{sliderTargetWidth}px"
			bind:clientWidth={sliderContainerWidth}
		>
			{#if sliderContainerWidth > 0}
				{@const bh = barHeight(sliderContainerWidth)}
				{@const gap = Math.round(bh * 0.5)}
				{@const labelW = sliderContainerWidth < 400 ? 70 : 110}
				{@const barArea = Math.max(sliderContainerWidth - labelW - 40, 20)}
				{@const h = chartHeight(sliderContainerWidth)}
				<svg
					width={sliderContainerWidth}
					height={h}
					viewBox="0 0 {sliderContainerWidth} {h}"
					role="img"
					aria-label="GDP per capita bar chart, adjustable view"
				>
					{#each data as item, i}
						{@const y = gap + i * (bh + gap)}
						{@const barW = (item.gdp / maxGDP) * barArea}
						<text
							x={labelW - 6}
							y={y + bh / 2}
							text-anchor="end"
							dominant-baseline="central"
							fill="var(--color-text-muted)"
							font-size={labelSize(sliderContainerWidth)}
						>
							{sliderContainerWidth < 300 ? item.country.slice(0, 6) : item.country}
						</text>
						<rect
							x={labelW}
							{y}
							width={barW}
							height={bh}
							rx="3"
							fill="oklch(60% 0.18 250)"
						/>
						{#if sliderContainerWidth > 250}
							<text
								x={labelW + barW + 4}
								y={y + bh / 2}
								dominant-baseline="central"
								fill="var(--color-text-muted)"
								font-size={valueSize(sliderContainerWidth)}
							>
								{formatGDP(item.gdp)}
							</text>
						{/if}
					{/each}
				</svg>
			{/if}
		</div>
	</div>


	<h2>Break it on purpose</h2>
	<p class="prose">Responsive charts rely on a reactive measurement loop. Break the loop to see how things fall apart.</p>
	<ol class="experiments">
		<li><strong>Remove <code>bind:clientWidth</code> from the chart container and hardcode a width.</strong> The chart will no longer respond to container resizing. Drag the slider or resize the window — nothing changes. The binding is the reactive bridge between CSS layout and SVG rendering.</li>
		<li><strong>Remove the <code>{'{#if smallWidth > 0}'}</code> guard.</strong> On first render, the chart will flash with zero-width bars because <code>clientWidth</code> starts at zero before the element is measured. The guard prevents rendering until a real measurement is available.</li>
		<li><strong>Use a fixed <code>viewBox</code> width instead of the measured <code>containerWidth</code>.</strong> The chart will either clip or leave empty space because the SVG coordinate system no longer matches the container. The key insight is that the SVG must size itself to match its container, not the other way around.</li>
		<li><strong>Remove the conditional font size logic in <code>labelSize</code> and use a fixed <code>12px</code>.</strong> At narrow widths, labels will overlap and become unreadable. Responsive charts need responsive typography — not just responsive geometry.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's <code>bind:clientWidth</code> gives you a reactive container width with zero boilerplate — no manual <code>ResizeObserver</code> setup or cleanup. The measured width becomes the single source of truth from which all chart dimensions, bar widths, font sizes, and label truncation rules are derived.</p>
	<p class="prose">The same data and the same scale logic render perfectly at 180 pixels or 1200 pixels. By computing the SVG's <code>viewBox</code> and all positioning from the container width, the chart adapts to any size without a single media query. This is the pattern used by The Pudding and other data journalism teams for responsive interactives.</p>
	<p class="prose">The <code>{'{#if width > 0}'}</code> guard is essential because <code>clientWidth</code> starts at zero before the browser's first layout pass. Rendering with zero width produces invisible or broken elements. The guard delays rendering by exactly one frame, ensuring the chart only appears once real measurements are available.</p>
	<p class="next">Next lesson: DV.7 adds smooth animated transitions when chart data changes.</p>
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

	.chart-container {
		overflow: hidden;
	}
	.chart-container--small {
		max-inline-size: 300px;
	}
	.chart-container--adjustable {
		max-inline-size: 100%;
		border: 1px dashed var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm);
	}
	.slider-label {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
	.slider-label strong {
		color: var(--color-text);
		font-family: var(--font-mono);
	}
	.slider {
		flex: 1;
		min-inline-size: 120px;
		accent-color: oklch(60% 0.18 250);
	}

	svg {
		display: block;
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
