<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"	import { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"	interface YearData {\n" +
		"		solar: number;\n" +
		"		wind: number;\n" +
		"		hydro: number;\n" +
		"		biomass: number;\n" +
		"		geothermal: number;\n" +
		"	}\n" +
		"\n" +
		"	const years: number[] = [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024];\n" +
		"\n" +
		"	const renewableData: Record\u003cnumber, YearData\u003e = {\n" +
		"		2015: { solar: 227, wind: 432, hydro: 1064, biomass: 106, geothermal: 13 },\n" +
		"		2016: { solar: 303, wind: 487, hydro: 1096, biomass: 112, geothermal: 13 },\n" +
		"		2017: { solar: 402, wind: 539, hydro: 1112, biomass: 121, geothermal: 14 },\n" +
		"		2018: { solar: 512, wind: 591, hydro: 1132, biomass: 130, geothermal: 14 },\n" +
		"		2019: { solar: 627, wind: 651, hydro: 1150, biomass: 139, geothermal: 15 },\n" +
		"		2020: { solar: 760, wind: 743, hydro: 1170, biomass: 145, geothermal: 15 },\n" +
		"		2021: { solar: 942, wind: 837, hydro: 1197, biomass: 152, geothermal: 16 },\n" +
		"		2022: { solar: 1185, wind: 906, hydro: 1212, biomass: 160, geothermal: 16 },\n" +
		"		2023: { solar: 1483, wind: 1017, hydro: 1240, biomass: 168, geothermal: 17 },\n" +
		"		2024: { solar: 1810, wind: 1132, hydro: 1260, biomass: 175, geothermal: 17 }\n" +
		"	};\n" +
		"\n" +
		"	const sources = ['solar', 'wind', 'hydro', 'biomass', 'geothermal'] as const;\n" +
		"	type Source = (typeof sources)[number];\n" +
		"\n" +
		"	const sourceColors: Record\u003cSource, string\u003e = {\n" +
		"		solar: 'oklch(75% 0.18 85)',\n" +
		"		wind: 'oklch(60% 0.18 220)',\n" +
		"		hydro: 'oklch(55% 0.15 250)',\n" +
		"		biomass: 'oklch(55% 0.12 145)',\n" +
		"		geothermal: 'oklch(60% 0.15 25)'\n" +
		"	};\n" +
		"\n" +
		"	const sourceLabels: Record\u003cSource, string\u003e = {\n" +
		"		solar: 'Solar',\n" +
		"		wind: 'Wind',\n" +
		"		hydro: 'Hydro',\n" +
		"		biomass: 'Biomass',\n" +
		"		geothermal: 'Geothermal'\n" +
		"	};\n" +
		"\n" +
		"	let selectedYear = $state(2024);\n" +
		"\n" +
		"	const solarTween = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"	const windTween = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"	const hydroTween = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"	const biomassTween = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"	const geothermalTween = new Tween(0, { duration: 600, easing: cubicOut });\n" +
		"\n" +
		"	const tweens: Record\u003cSource, Tween\u003cnumber\u003e\u003e = {\n" +
		"		solar: solarTween,\n" +
		"		wind: windTween,\n" +
		"		hydro: hydroTween,\n" +
		"		biomass: biomassTween,\n" +
		"		geothermal: geothermalTween\n" +
		"	};\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const d = renewableData[selectedYear];\n" +
		"		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;\n" +
		"		for (const s of sources) {\n" +
		"			tweens[s].set(d[s], opts);\n" +
		"		}\n" +
		"	});\n" +
		"\n" +
		"	const maxValue = 1900;\n" +
		"	let containerWidth = $state(0);\n" +
		"\n" +
		"	const chartPadding = { top: 30, right: 50, bottom: 40, left: 90 };\n" +
		"	const chartW = $derived(Math.max(containerWidth - chartPadding.left - chartPadding.right, 100));\n" +
		"	const barGroupWidth = $derived(chartW / sources.length);\n" +
		"	const barWidth = $derived(Math.min(barGroupWidth * 0.7, 80));\n" +
		"	const chartHeight = 320;\n" +
		"	const plotH = chartHeight - chartPadding.top - chartPadding.bottom;\n" +
		"\n" +
		"	function scaleY(value: number): number {\n" +
		"		return plotH - (value / maxValue) * plotH;\n" +
		"	}\n" +
		"\n" +
		"	const gridLines = [0, 400, 800, 1200, 1600];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.7 — Animated Transitions\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eWhen data changes, chart elements should morph smoothly.\u003c/strong\u003e Bars grow, lines\n" +
		"		redraw, points glide. Use \u003ccode\u003eTween\u003c/code\u003e from \u003ccode\u003esvelte/motion\u003c/code\u003e to interpolate\n" +
		"		numeric values. For each data point, tween its visual position so transitions feel fluid.\n" +
		"		Respect \u003ccode\u003eprefersReducedMotion\u003c/code\u003e — skip animation when the user has requested it.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\" bind:clientWidth={containerWidth}\u003e\n" +
		"		\u003cdiv class=\"year-controls\"\u003e\n" +
		"			\u003cspan class=\"year-label\"\u003eYear:\u003c/span\u003e\n" +
		"			{#each years as year}\n" +
		"				\u003cbutton\n" +
		"					type=\"button\"\n" +
		"					class=\"year-btn\"\n" +
		"					class:active={selectedYear === year}\n" +
		"					onclick={() =\u003e (selectedYear = year)}\n" +
		"				\u003e\n" +
		"					{year}\n" +
		"				\u003c/button\u003e\n" +
		"			{/each}\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003cdiv class=\"year-slider\"\u003e\n" +
		"			\u003cinput\n" +
		"				type=\"range\"\n" +
		"				min={2015}\n" +
		"				max={2024}\n" +
		"				step={1}\n" +
		"				bind:value={selectedYear}\n" +
		"				class=\"slider\"\n" +
		"			/\u003e\n" +
		"			\u003cspan class=\"slider-value\"\u003e{selectedYear}\u003c/span\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		{#if containerWidth \u003e 0}\n" +
		"			\u003csvg\n" +
		"				width={containerWidth - 32}\n" +
		"				height={chartHeight}\n" +
		"				viewBox=\"0 0 {containerWidth - 32} {chartHeight}\"\n" +
		"				role=\"img\"\n" +
		"				aria-label=\"Renewable energy capacity by source for {selectedYear}\"\n" +
		"			\u003e\n" +
		"				\u003cg transform=\"translate({chartPadding.left}, {chartPadding.top})\"\u003e\n" +
		"					\u003c!-- Grid lines --\u003e\n" +
		"					{#each gridLines as val}\n" +
		"						\u003cline\n" +
		"							x1={0}\n" +
		"							y1={scaleY(val)}\n" +
		"							x2={chartW}\n" +
		"							y2={scaleY(val)}\n" +
		"							stroke=\"var(--color-border)\"\n" +
		"							stroke-width=\"1\"\n" +
		"							stroke-dasharray={val === 0 ? 'none' : '3,3'}\n" +
		"						/\u003e\n" +
		"						\u003ctext\n" +
		"							x={-8}\n" +
		"							y={scaleY(val)}\n" +
		"							text-anchor=\"end\"\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
