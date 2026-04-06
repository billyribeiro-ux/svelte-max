<script lang="ts">
	interface City {
		name: string;
		population: number;
		area: number;
		density: number;
	}

	const cities: City[] = [
		{ name: 'Tokyo', population: 13.96, area: 2194, density: 6363 },
		{ name: 'Delhi', population: 32.94, area: 1484, density: 22195 },
		{ name: 'Shanghai', population: 28.52, area: 6341, density: 4498 },
		{ name: 'São Paulo', population: 22.43, area: 1521, density: 14747 },
		{ name: 'Mexico City', population: 21.78, area: 1485, density: 14667 },
		{ name: 'Cairo', population: 22.18, area: 3085, density: 7192 },
		{ name: 'Mumbai', population: 21.67, area: 603, density: 35935 },
		{ name: 'Beijing', population: 21.54, area: 16411, density: 1313 }
	];

	const chartW = 600;
	const chartH = 400;
	const pad = { top: 30, right: 30, bottom: 50, left: 60 };
	const plotW = chartW - pad.left - pad.right;
	const plotH = chartH - pad.top - pad.bottom;

	const areaMin = 0;
	const areaMax = 17000;
	const popMin = 0;
	const popMax = 36;
	const densityMax = 36000;

	const scaleX = (v: number): number => (v - areaMin) / (areaMax - areaMin) * plotW;
	const scaleY = (v: number): number => plotH - (v - popMin) / (popMax - popMin) * plotH;
	const scaleR = (density: number, mult: number): number =>
		3 + (density / densityMax) * 20 * mult;

	let radiusMultiplier = $state(1);
	let hoveredCity = $state<string | null>(null);

	const xTicks = [0, 4000, 8000, 12000, 16000];
	const yTicks = [0, 10, 20, 30];

	const cityColors: Record<string, string> = {
		Tokyo: 'oklch(65% 0.22 270)',
		Delhi: 'oklch(65% 0.20 30)',
		Shanghai: 'oklch(65% 0.18 150)',
		'São Paulo': 'oklch(65% 0.20 90)',
		'Mexico City': 'oklch(65% 0.18 330)',
		Cairo: 'oklch(65% 0.20 60)',
		Mumbai: 'oklch(65% 0.22 0)',
		Beijing: 'oklch(65% 0.18 210)'
	};
</script>

<section class="page">
	<h1>DV.1 — SVG Fundamentals in Svelte</h1>
	<p class="concept">
		<strong>Concept.</strong> SVG is a first-class citizen in Svelte — you write SVG elements
		directly in markup, bind attributes reactively, and scope styles. No library needed. The
		<code>viewBox</code> attribute makes SVGs resolution-independent. <code>&lt;g&gt;</code> groups
		elements for transforms. Svelte's <code>{'{#each}'}</code> iterates to create data-driven
		elements. This is how The New York Times, The Pudding, and Reuters Graphics build their
		charts — from SVG primitives, not library abstractions.
	</p>

	<div class="build">
		<div class="controls">
			<label>
				<span>Circle size: {radiusMultiplier.toFixed(1)}x</span>
				<input type="range" min="0.3" max="2.5" step="0.1" bind:value={radiusMultiplier} />
			</label>
		</div>

		<svg viewBox="0 0 {chartW} {chartH}" class="chart" role="img" aria-label="Scatter plot of world cities by area and population">
			<g transform="translate({pad.left}, {pad.top})">
				<!-- gridlines -->
				{#each yTicks as tick}
					<line
						x1={0}
						y1={scaleY(tick)}
						x2={plotW}
						y2={scaleY(tick)}
						class="gridline"
					/>
				{/each}

				<!-- x axis -->
				<line x1={0} y1={plotH} x2={plotW} y2={plotH} class="axis-line" />
				{#each xTicks as tick}
					<line x1={scaleX(tick)} y1={plotH} x2={scaleX(tick)} y2={plotH + 6} class="axis-line" />
					<text x={scaleX(tick)} y={plotH + 22} class="tick-label" text-anchor="middle">
						{tick === 0 ? '0' : `${(tick / 1000).toFixed(0)}k`}
					</text>
				{/each}
				<text x={plotW / 2} y={plotH + 42} class="axis-title" text-anchor="middle">
					Area (km²)
				</text>

				<!-- y axis -->
				<line x1={0} y1={0} x2={0} y2={plotH} class="axis-line" />
				{#each yTicks as tick}
					<line x1={-6} y1={scaleY(tick)} x2={0} y2={scaleY(tick)} class="axis-line" />
					<text x={-12} y={scaleY(tick) + 4} class="tick-label" text-anchor="end">
						{tick}M
					</text>
				{/each}
				<text
					x={-45}
					y={plotH / 2}
					class="axis-title"
					text-anchor="middle"
					transform="rotate(-90, -45, {plotH / 2})"
				>
					Population (millions)
				</text>

				<!-- city bubbles -->
				{#each cities as city (city.name)}
					{@const cx = scaleX(city.area)}
					{@const cy = scaleY(city.population)}
					{@const r = scaleR(city.density, radiusMultiplier)}
					{@const isHovered = hoveredCity === city.name}
					<g
						role="listitem"
						class="city-group"
						onpointerenter={() => (hoveredCity = city.name)}
						onpointerleave={() => (hoveredCity = null)}
					>
						<circle
							{cx}
							{cy}
							{r}
							fill={cityColors[city.name]}
							opacity={hoveredCity === null || isHovered ? 0.8 : 0.25}
							stroke={isHovered ? 'oklch(20% 0.02 270)' : 'none'}
							stroke-width={isHovered ? 2 : 0}
							style="transition: opacity 150ms ease-out, stroke-width 150ms ease-out;"
						/>
						{#if isHovered}
							<text
								x={cx}
								y={cy - r - 6}
								class="city-label highlighted"
								text-anchor="middle"
							>
								{city.name} — {city.population}M, {city.density.toLocaleString()}/km²
							</text>
						{:else}
							<text
								x={cx + r + 4}
								y={cy + 4}
								class="city-label"
							>
								{city.name}
							</text>
						{/if}
					</g>
				{/each}
			</g>
		</svg>

		<p class="chart-note">
			Bubble size encodes population density. Hover a city for details.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>SVG elements (<code>&lt;circle&gt;</code>, <code>&lt;line&gt;</code>, <code>&lt;text&gt;</code>, <code>&lt;g&gt;</code>) render directly in Svelte markup.</li>
		<li><code>viewBox</code> makes the chart resolution-independent — it scales to any container width.</li>
		<li><code>$state</code> drives interactivity (hover, slider) and <code>$derived</code>-style inline expressions compute scales reactively.</li>
		<li><code>{'{#each}'}</code> iterates over real data to create SVG elements — no imperative DOM manipulation.</li>
		<li>Conditional styling (opacity, stroke) via ternary expressions creates hover effects without CSS classes.</li>
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

	.controls {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.controls label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.controls input[type='range'] {
		width: 200px;
		accent-color: oklch(65% 0.22 270);
	}
	.chart {
		width: 100%;
		max-width: 640px;
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
		font-size: 11px;
		fill: var(--color-text-muted);
	}
	.axis-title {
		font-size: 12px;
		fill: var(--color-text-muted);
		font-weight: 600;
	}
	.city-label {
		font-size: 10px;
		fill: var(--color-text-muted);
		pointer-events: none;
	}
	.city-label.highlighted {
		font-size: 12px;
		fill: var(--color-text);
		font-weight: 600;
	}
	.city-group {
		cursor: pointer;
	}
	.chart-note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
	}
</style>
