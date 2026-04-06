<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface ContinentData {
		id: string;
		name: string;
		population: number;
		d: string;
	}

	const continents: ContinentData[] = [
		{
			id: 'north-america',
			name: 'North America',
			population: 579_000_000,
			d: 'M 60 40 L 95 35 L 115 50 L 120 75 L 105 95 L 85 110 L 70 100 L 55 85 L 45 60 Z'
		},
		{
			id: 'south-america',
			name: 'South America',
			population: 423_000_000,
			d: 'M 90 120 L 105 115 L 115 130 L 120 160 L 110 185 L 95 195 L 80 180 L 78 150 L 82 135 Z'
		},
		{
			id: 'europe',
			name: 'Europe',
			population: 748_000_000,
			d: 'M 170 35 L 195 30 L 210 40 L 205 55 L 195 65 L 180 70 L 165 60 L 160 45 Z'
		},
		{
			id: 'africa',
			name: 'Africa',
			population: 1_460_000_000,
			d: 'M 165 75 L 195 70 L 215 85 L 220 115 L 210 150 L 195 170 L 175 165 L 160 140 L 155 110 L 158 90 Z'
		},
		{
			id: 'asia',
			name: 'Asia',
			population: 4_750_000_000,
			d: 'M 210 30 L 260 25 L 290 40 L 300 65 L 290 90 L 270 100 L 245 95 L 225 85 L 215 65 L 205 45 Z'
		},
		{
			id: 'oceania',
			name: 'Oceania',
			population: 46_000_000,
			d: 'M 270 130 L 295 125 L 310 135 L 305 150 L 290 155 L 275 148 L 268 140 Z'
		}
	];

	let activeContinent = $state<string | null>(null);
	let tooltipX = $state(0);
	let tooltipY = $state(0);

	const maxPop = Math.max(...continents.map((c) => c.population));

	function fillColor(pop: number, isActive: boolean): string {
		const ratio = pop / maxPop;
		const lightness = 75 - ratio * 30;
		const chroma = 0.08 + ratio * 0.14;
		const lightnessShift = isActive ? -8 : 0;
		return `oklch(${lightness + lightnessShift}% ${chroma} 250)`;
	}

	function formatPop(n: number): string {
		if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
		return `${(n / 1_000_000).toFixed(0)}M`;
	}

	function handleClick(continent: ContinentData, event: MouseEvent): void {
		if (activeContinent === continent.id) {
			activeContinent = null;
			return;
		}
		activeContinent = continent.id;
		const svg = (event.target as Element).closest('svg');
		if (svg) {
			const rect = svg.getBoundingClientRect();
			tooltipX = event.clientX - rect.left;
			tooltipY = event.clientY - rect.top - 10;
		}
	}

	const activeData = $derived(
		activeContinent ? continents.find((c) => c.id === activeContinent) ?? null : null
	);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  interface ContinentData {\n" +
		"    id: string;\n" +
		"    name: string;\n" +
		"    population: number;\n" +
		"    d: string;\n" +
		"  }\n" +
		"\n" +
		"  const continents: ContinentData[] = [\n" +
		"    { id: 'north-america', name: 'North America', population: 579_000_000,\n" +
		"      d: 'M 60 40 L 95 35 ...' },\n" +
		"    // ... other continents\n" +
		"  ];\n" +
		"\n" +
		"  let activeContinent = $state\u003cstring | null\u003e(null);\n" +
		"  const maxPop = Math.max(...continents.map((c) =\u003e c.population));\n" +
		"\n" +
		"  function fillColor(pop: number, isActive: boolean): string {\n" +
		"    const ratio = pop / maxPop;\n" +
		"    const lightness = 75 - ratio * 30;\n" +
		"    const chroma = 0.08 + ratio * 0.14;\n" +
		"    const lightnessShift = isActive ? -8 : 0;\n" +
		"    return `oklch(${lightness + lightnessShift}% ${chroma} 250)`;\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.8 — Interactive SVG Illustrations\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003csvg viewBox=\"0 0 340 210\"\u003e\n" +
		"      {#each continents as continent}\n" +
		"        \u003cpath d={continent.d} data-population={continent.population}\n" +
		"          fill={fillColor(continent.population, activeContinent === continent.id)}\n" +
		"          onclick={(e) =\u003e handleClick(continent, e)} /\u003e\n" +
		"      {/each}\n" +
		"    \u003c/svg\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.8 — Interactive SVG Illustrations</h1>
	<p class="concept">
		<strong>Concept.</strong> SVGs can be interactive — hover states on regions, click to
		reveal data, animated infographics. Unlike raster images, every SVG element is
		addressable via CSS and JS. Build data-driven coloring by mapping data values to
		OKLCH lightness and chroma: higher population &rarr; darker and more saturated fill.
		<code>$state&lt;string | null&gt;</code> tracks the active region. Hovering shifts
		lightness for instant feedback. Clicking shows a tooltip with the data.
	</p>

	<div class="build">
		<div class="map-container">
			<svg viewBox="0 0 340 210" class="world-map" role="img" aria-label="Interactive world map showing population data by continent">
				<title>World Population Map</title>
				<desc>A simplified world map where each continent is colored by population density. Click a continent to see its population.</desc>

				{#each continents as continent}
					{@const isActive = activeContinent === continent.id}
					<path
						d={continent.d}
						data-population={continent.population}
						fill={fillColor(continent.population, isActive)}
						stroke="oklch(95% 0.01 250)"
						stroke-width="1"
						class="continent-path"
						class:active={isActive}
						role="button"
						tabindex="0"
						aria-label="{continent.name}: {formatPop(continent.population)} people"
						onclick={(e) => handleClick(continent, e)}
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(continent, e as unknown as MouseEvent); }}
					/>
				{/each}

				<!-- Tooltip -->
				{#if activeData}
					<g class="tooltip-group" transform="translate({tooltipX}, {tooltipY})">
						<rect x="-55" y="-36" width="110" height="34" rx="6" fill="oklch(20% 0.02 270)" opacity="0.92" />
						<text x="0" y="-22" text-anchor="middle" fill="oklch(95% 0.02 270)" font-size="9" font-weight="600">{activeData.name}</text>
						<text x="0" y="-10" text-anchor="middle" fill="oklch(75% 0.10 270)" font-size="11" font-weight="700">{formatPop(activeData.population)}</text>
					</g>
				{/if}
			</svg>
		</div>

		<!-- Legend -->
		<div class="legend">
			<span class="legend-title">Population scale</span>
			<div class="legend-bar">
				<div class="legend-gradient"></div>
				<div class="legend-labels">
					<span>Low</span>
					<span>High</span>
				</div>
			</div>
		</div>

		<!-- Data table -->
		<div class="data-list">
			{#each continents as continent}
				<button
					type="button"
					class="data-chip"
					class:active={activeContinent === continent.id}
					style:border-color={fillColor(continent.population, activeContinent === continent.id)}
					onclick={() => { activeContinent = activeContinent === continent.id ? null : continent.id; }}
				>
					{continent.name}: {formatPop(continent.population)}
				</button>
			{/each}
		</div>

		<p class="chart-note">
			Click a continent on the map or a chip below to select it. Fill color is computed from population using OKLCH lightness and chroma mapping.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Every SVG element is individually addressable — paths can have <code>onclick</code>, <code>:hover</code>, and <code>aria-label</code> just like HTML elements.</li>
		<li>Data-driven fill: map numeric values to OKLCH lightness/chroma for perceptually uniform color scales.</li>
		<li><code>$state&lt;string | null&gt;</code> tracks the selected region — <code>null</code> means nothing is selected.</li>
		<li>SVG tooltips are just <code>&lt;g&gt;</code> groups with <code>&lt;rect&gt;</code> + <code>&lt;text&gt;</code>, positioned via <code>transform</code>.</li>
		<li>Accessible SVG illustrations need <code>&lt;title&gt;</code>, <code>&lt;desc&gt;</code>, <code>role="img"</code>, and keyboard support (<code>tabindex</code> + <code>onkeydown</code>).</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
	}
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

	.map-container {
		position: relative;
	}
	.world-map {
		width: 100%;
		max-width: 600px;
		height: auto;
		background: oklch(92% 0.02 220);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.continent-path {
		cursor: pointer;
		transition: fill 200ms ease, filter 200ms ease;
	}
	.continent-path:hover {
		filter: brightness(0.85);
	}
	.continent-path.active {
		stroke: oklch(40% 0.20 270);
		stroke-width: 2;
	}
	.continent-path:focus-visible {
		outline: 2px solid oklch(65% 0.22 270);
		outline-offset: 2px;
	}

	.tooltip-group text {
		pointer-events: none;
	}
	.tooltip-group rect {
		pointer-events: none;
	}

	/* ── Legend ── */
	.legend {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.legend-title {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.legend-bar {
		display: flex;
		flex-direction: column;
		gap: 2px;
		max-width: 200px;
	}
	.legend-gradient {
		height: 12px;
		border-radius: var(--radius-xs);
		background: linear-gradient(to right, oklch(75% 0.08 250), oklch(45% 0.22 250));
	}
	.legend-labels {
		display: flex;
		justify-content: space-between;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	/* ── Data chips ── */
	.data-list {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
	.data-chip {
		font-size: var(--text-xs);
		padding: 2px var(--space-sm);
		border: 2px solid;
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		cursor: pointer;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.data-chip:hover {
		background: var(--color-surface);
	}
	.data-chip.active {
		background: oklch(65% 0.22 270 / 0.15);
		color: var(--color-text);
		font-weight: 600;
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
