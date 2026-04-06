<script lang="ts">
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

	<h3>What you learned</h3>
	<ul>
		<li><code>bind:clientWidth</code> gives you a reactive container width — no ResizeObserver boilerplate.</li>
		<li>Derive bar width, font sizes, and tick counts from the container width.</li>
		<li>The same data and same scale logic render perfectly at 180px or 1200px.</li>
		<li>Zero media queries needed — the chart adapts via reactive derivation.</li>
	</ul>
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
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

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
</style>
