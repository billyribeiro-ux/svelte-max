<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface YearData {
		solar: number;
		wind: number;
		hydro: number;
		biomass: number;
		geothermal: number;
	}

	const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];

	const renewableData: Record<number, YearData> = {
		2015: { solar: 227, wind: 432, hydro: 1064, biomass: 106, geothermal: 13 },
		2016: { solar: 303, wind: 487, hydro: 1096, biomass: 112, geothermal: 13 },
		2017: { solar: 402, wind: 539, hydro: 1112, biomass: 121, geothermal: 14 },
		2018: { solar: 512, wind: 591, hydro: 1132, biomass: 130, geothermal: 14 },
		2019: { solar: 627, wind: 651, hydro: 1150, biomass: 139, geothermal: 15 },
		2020: { solar: 760, wind: 743, hydro: 1170, biomass: 145, geothermal: 15 },
		2021: { solar: 942, wind: 837, hydro: 1197, biomass: 152, geothermal: 16 },
		2022: { solar: 1185, wind: 906, hydro: 1212, biomass: 160, geothermal: 16 },
		2023: { solar: 1483, wind: 1017, hydro: 1240, biomass: 168, geothermal: 17 },
		2024: { solar: 1810, wind: 1132, hydro: 1260, biomass: 175, geothermal: 17 }
	};

	const sources = ['solar', 'wind', 'hydro', 'biomass', 'geothermal'] as const;
	type Source = (typeof sources)[number];

	const sourceColors: Record<Source, string> = {
		solar: 'oklch(75% 0.18 85)',
		wind: 'oklch(60% 0.18 220)',
		hydro: 'oklch(55% 0.15 250)',
		biomass: 'oklch(55% 0.12 145)',
		geothermal: 'oklch(60% 0.15 25)'
	};

	const sourceLabels: Record<Source, string> = {
		solar: 'Solar',
		wind: 'Wind',
		hydro: 'Hydro',
		biomass: 'Biomass',
		geothermal: 'Geothermal'
	};

	let selectedYear = $state(2024);

	const solarTween = new Tween(0, { duration: 600, easing: cubicOut });
	const windTween = new Tween(0, { duration: 600, easing: cubicOut });
	const hydroTween = new Tween(0, { duration: 600, easing: cubicOut });
	const biomassTween = new Tween(0, { duration: 600, easing: cubicOut });
	const geothermalTween = new Tween(0, { duration: 600, easing: cubicOut });

	const tweens: Record<Source, Tween<number>> = {
		solar: solarTween,
		wind: windTween,
		hydro: hydroTween,
		biomass: biomassTween,
		geothermal: geothermalTween
	};

	$effect(() => {
		const d = renewableData[selectedYear];
		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;
		for (const s of sources) {
			tweens[s].set(d[s], opts);
		}
	});

	const maxValue = 1900;
	let containerWidth = $state(0);

	const chartPadding = { top: 30, right: 50, bottom: 40, left: 90 };
	const chartW = $derived(Math.max(containerWidth - chartPadding.left - chartPadding.right, 100));
	const barGroupWidth = $derived(chartW / sources.length);
	const barWidth = $derived(Math.min(barGroupWidth * 0.7, 80));
	const chartHeight = 320;
	const plotH = chartHeight - chartPadding.top - chartPadding.bottom;

	function scaleY(value: number): number {
		return plotH - (value / maxValue) * plotH;
	}

	const gridLines = [0, 400, 800, 1200, 1600];
</script>

<section class="page">
	<h1>DV.7 — Animated Transitions</h1>
	<p class="concept">
		<strong>When data changes, chart elements should morph smoothly.</strong> Bars grow, lines
		redraw, points glide. Use <code>Tween</code> from <code>svelte/motion</code> to interpolate
		numeric values. For each data point, tween its visual position so transitions feel fluid.
		Respect <code>prefersReducedMotion</code> — skip animation when the user has requested it.
	</p>

	<div class="build" bind:clientWidth={containerWidth}>
		<div class="year-controls">
			<span class="year-label">Year:</span>
			{#each years as year}
				<button
					type="button"
					class="year-btn"
					class:active={selectedYear === year}
					onclick={() => (selectedYear = year)}
				>
					{year}
				</button>
			{/each}
		</div>

		<div class="year-slider">
			<input
				type="range"
				min={2015}
				max={2024}
				step={1}
				bind:value={selectedYear}
				class="slider"
			/>
			<span class="slider-value">{selectedYear}</span>
		</div>

		{#if containerWidth > 0}
			<svg
				width={containerWidth - 32}
				height={chartHeight}
				viewBox="0 0 {containerWidth - 32} {chartHeight}"
				role="img"
				aria-label="Renewable energy capacity by source for {selectedYear}"
			>
				<g transform="translate({chartPadding.left}, {chartPadding.top})">
					<!-- Grid lines -->
					{#each gridLines as val}
						<line
							x1={0}
							y1={scaleY(val)}
							x2={chartW}
							y2={scaleY(val)}
							stroke="var(--color-border)"
							stroke-width="1"
							stroke-dasharray={val === 0 ? 'none' : '3,3'}
						/>
						<text
							x={-8}
							y={scaleY(val)}
							text-anchor="end"
							dominant-baseline="central"
							fill="var(--color-text-muted)"
							font-size="10"
						>
							{val}
						</text>
					{/each}

					<!-- Axis label -->
					<text
						x={-60}
						y={plotH / 2}
						text-anchor="middle"
						dominant-baseline="central"
						fill="var(--color-text-muted)"
						font-size="10"
						transform="rotate(-90, -60, {plotH / 2})"
					>
						Capacity (GW)
					</text>

					<!-- Bars -->
					{#each sources as source, i}
						{@const cx = i * barGroupWidth + barGroupWidth / 2}
						{@const val = tweens[source].current}
						{@const h = (val / maxValue) * plotH}
						<rect
							x={cx - barWidth / 2}
							y={plotH - h}
							width={barWidth}
							height={h}
							rx="3"
							fill={sourceColors[source]}
						/>
						<text
							x={cx}
							y={plotH - h - 6}
							text-anchor="middle"
							fill="var(--color-text)"
							font-size="11"
							font-weight="600"
						>
							{Math.round(val)}
						</text>
						<text
							x={cx}
							y={plotH + 18}
							text-anchor="middle"
							fill="var(--color-text-muted)"
							font-size="11"
						>
							{sourceLabels[source]}
						</text>
					{/each}
				</g>
			</svg>
		{/if}

		<div class="legend">
			{#each sources as source}
				<span class="legend-item">
					<span class="swatch" style:background={sourceColors[source]}></span>
					{sourceLabels[source]}
				</span>
			{/each}
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Create a <code>Tween</code> per data value — set <code>.target</code> to animate.</li>
		<li>Read <code>.current</code> inside SVG attributes for smooth interpolation.</li>
		<li>Use <code>$effect</code> to update tween targets when state changes.</li>
		<li>Check <code>prefersReducedMotion.current</code> and set duration to 0 if true.</li>
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

	.year-controls {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
		align-items: center;
	}
	.year-label {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin-inline-end: var(--space-xs);
	}
	.year-btn {
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-xs);
		font-family: var(--font-mono);
	}
	.year-btn.active {
		background: oklch(60% 0.18 220);
		color: white;
		border-color: oklch(60% 0.18 220);
	}
	.year-slider {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.slider {
		flex: 1;
		accent-color: oklch(60% 0.18 220);
	}
	.slider-value {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
		min-inline-size: 3ch;
	}
	.legend {
		display: flex;
		gap: var(--space-md);
		flex-wrap: wrap;
		justify-content: center;
	}
	.legend-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.swatch {
		display: inline-block;
		inline-size: 12px;
		block-size: 12px;
		border-radius: var(--radius-xs);
	}
	svg {
		display: block;
	}
</style>
