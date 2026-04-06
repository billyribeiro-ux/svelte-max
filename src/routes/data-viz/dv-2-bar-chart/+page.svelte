<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li><code>&lt;rect&gt;</code> elements with computed width encode quantitative data as horizontal bars.</li>
		<li>Sorting state (<code>$state</code>) with <code>$derived</code> arrays drives animated reordering via CSS <code>transition: transform</code>.</li>
		<li>Gridlines as dashed <code>&lt;line&gt;</code> elements provide reference scale.</li>
		<li>Value labels on each bar provide precise readability — essential for data journalism.</li>
		<li>OKLCH colors with distinct hues give each country a unique visual identity.</li>
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
</style>
