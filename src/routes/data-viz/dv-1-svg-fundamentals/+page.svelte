<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface City {\n" +
		"		name: string;\n" +
		"		population: number;\n" +
		"		area: number;\n" +
		"		density: number;\n" +
		"	}\n" +
		"\n" +
		"	const cities: City[] = [\n" +
		"		{ name: 'Tokyo', population: 13.96, area: 2194, density: 6363 },\n" +
		"		{ name: 'Delhi', population: 32.94, area: 1484, density: 22195 },\n" +
		"		{ name: 'Shanghai', population: 28.52, area: 6341, density: 4498 },\n" +
		"		{ name: 'São Paulo', population: 22.43, area: 1521, density: 14747 },\n" +
		"		{ name: 'Mexico City', population: 21.78, area: 1485, density: 14667 },\n" +
		"		{ name: 'Cairo', population: 22.18, area: 3085, density: 7192 },\n" +
		"		{ name: 'Mumbai', population: 21.67, area: 603, density: 35935 },\n" +
		"		{ name: 'Beijing', population: 21.54, area: 16411, density: 1313 }\n" +
		"	];\n" +
		"\n" +
		"	const chartW = 600;\n" +
		"	const chartH = 400;\n" +
		"	const pad = { top: 30, right: 30, bottom: 50, left: 60 };\n" +
		"	const plotW = chartW - pad.left - pad.right;\n" +
		"	const plotH = chartH - pad.top - pad.bottom;\n" +
		"\n" +
		"	const areaMin = 0;\n" +
		"	const areaMax = 17000;\n" +
		"	const popMin = 0;\n" +
		"	const popMax = 36;\n" +
		"	const densityMax = 36000;\n" +
		"\n" +
		"	const scaleX = (v: number): number =\u003e (v - areaMin) / (areaMax - areaMin) * plotW;\n" +
		"	const scaleY = (v: number): number =\u003e plotH - (v - popMin) / (popMax - popMin) * plotH;\n" +
		"	const scaleR = (density: number, mult: number): number =\u003e\n" +
		"		3 + (density / densityMax) * 20 * mult;\n" +
		"\n" +
		"	let radiusMultiplier = $state(1);\n" +
		"	let hoveredCity = $state\u003cstring | null\u003e(null);\n" +
		"\n" +
		"	const xTicks = [0, 4000, 8000, 12000, 16000];\n" +
		"	const yTicks = [0, 10, 20, 30];\n" +
		"\n" +
		"	const cityColors: Record\u003cstring, string\u003e = {\n" +
		"		Tokyo: 'oklch(65% 0.22 270)',\n" +
		"		Delhi: 'oklch(65% 0.20 30)',\n" +
		"		Shanghai: 'oklch(65% 0.18 150)',\n" +
		"		'São Paulo': 'oklch(65% 0.20 90)',\n" +
		"		'Mexico City': 'oklch(65% 0.18 330)',\n" +
		"		Cairo: 'oklch(65% 0.20 60)',\n" +
		"		Mumbai: 'oklch(65% 0.22 0)',\n" +
		"		Beijing: 'oklch(65% 0.18 210)'\n" +
		"	};\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.1 — SVG Fundamentals in Svelte\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eConcept.\u003c/strong\u003e SVG is a first-class citizen in Svelte — you write SVG elements\n" +
		"		directly in markup, bind attributes reactively, and scope styles. No library needed. The\n" +
		"		\u003ccode\u003eviewBox\u003c/code\u003e attribute makes SVGs resolution-independent. \u003ccode\u003e&lt;g&gt;\u003c/code\u003e groups\n" +
		"		elements for transforms. Svelte's \u003ccode\u003e{'{#each}'}\u003c/code\u003e iterates to create data-driven\n" +
		"		elements. This is how The New York Times, The Pudding, and Reuters Graphics build their\n" +
		"		charts — from SVG primitives, not library abstractions.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\"\u003e\n" +
		"		\u003cdiv class=\"controls\"\u003e\n" +
		"			\u003clabel\u003e\n" +
		"				\u003cspan\u003eCircle size: {radiusMultiplier.toFixed(1)}x\u003c/span\u003e\n" +
		"				\u003cinput type=\"range\" min=\"0.3\" max=\"2.5\" step=\"0.1\" bind:value={radiusMultiplier} /\u003e\n" +
		"			\u003c/label\u003e\n" +
		"		\u003c/div\u003e\n" +
		"\n" +
		"		\u003csvg viewBox=\"0 0 {chartW} {chartH}\" class=\"chart\" role=\"img\" aria-label=\"Scatter plot of world cities by area and population\"\u003e\n" +
		"			\u003cg transform=\"translate({pad.left}, {pad.top})\"\u003e\n" +
		"				\u003c!-- gridlines --\u003e\n" +
		"				{#each yTicks as tick}\n" +
		"					\u003cline\n" +
		"						x1={0}\n" +
		"						y1={scaleY(tick)}\n" +
		"						x2={plotW}\n" +
		"						y2={scaleY(tick)}\n" +
		"						class=\"gridline\"\n" +
		"					/\u003e\n" +
		"				{/each}\n" +
		"\n" +
		"				\u003c!-- x axis --\u003e\n" +
		"				\u003cline x1={0} y1={plotH} x2={plotW} y2={plotH} class=\"axis-line\" /\u003e\n" +
		"				{#each xTicks as tick}\n" +
		"					\u003cline x1={scaleX(tick)} y1={plotH} x2={scaleX(tick)} y2={plotH + 6} class=\"axis-line\" /\u003e\n" +
		"					\u003ctext x={scaleX(tick)} y={plotH + 22} class=\"tick-label\" text-anchor=\"middle\"\u003e\n" +
		"						{tick === 0 ? '0' : `${(tick / 1000).toFixed(0)}k`}\n" +
		"					\u003c/text\u003e\n" +
		"				{/each}\n" +
		"				\u003ctext x={plotW / 2} y={plotH + 42} class=\"axis-title\" text-anchor=\"middle\"\u003e\n" +
		"					Area (km²)\n" +
		"				\u003c/text\u003e\n" +
		"\n" +
		"				\u003c!-- y axis --\u003e\n" +
		"				\u003cline x1={0} y1={0} x2={0} y2={plotH} class=\"axis-line\" /\u003e\n" +
		"				{#each yTicks as tick}\n" +
		"					\u003cline x1={-6} y1={scaleY(tick)} x2={0} y2={scaleY(tick)} class=\"axis-line\" /\u003e\n" +
		"					\u003ctext x={-12} y={scaleY(tick) + 4} class=\"tick-label\" text-anchor=\"end\"\u003e\n" +
		"						{tick}M\n" +
		"					\u003c/text\u003e\n" +
		"				{/each}\n" +
		"				\u003ctext\n" +
		"					x={-45}\n" +
		"					y={plotH / 2}\n" +
		"					class=\"axis-title\"\n" +
		"					text-anchor=\"middle\"\n" +
		"					transform=\"rotate(-90, -45, {plotH / 2})\"\n" +
		"				\u003e\n" +
		"					Population (millions)\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
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


	<h2>Break it on purpose</h2>
	<p class="prose">Experimenting with intentional breakage is the fastest way to build real intuition for SVG in Svelte. Try each of these modifications, observe what happens, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>viewBox</code> attribute from the <code>&lt;svg&gt;</code> element.</strong> The chart will lose its aspect ratio and either collapse or stretch unpredictably. This proves that <code>viewBox</code> is what makes SVG resolution-independent — without it, the coordinate system has no defined relationship to the container.</li>
		<li><strong>Delete the <code>&lt;g transform="translate(...)"/&gt;</code> wrapper around the plot area.</strong> All axes, gridlines, and bubbles will render from the top-left corner with no padding. This shows how the <code>&lt;g&gt;</code> element acts as a coordinate-space offset for the entire chart interior.</li>
		<li><strong>Change <code>scaleY</code> to return <code>(v - popMin) / (popMax - popMin) * plotH</code> (remove the <code>plotH -</code> prefix).</strong> The y-axis will flip — high values appear at the bottom. SVG's y-axis runs top-to-bottom, so you must invert it manually for charts.</li>
		<li><strong>Set <code>radiusMultiplier</code> to a negative number like <code>-1</code>.</strong> The circles will disappear because SVG circles cannot have a negative <code>r</code> attribute. This demonstrates why scale functions need clamping or guards in production code.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SVG elements like <code>&lt;circle&gt;</code>, <code>&lt;line&gt;</code>, <code>&lt;text&gt;</code>, and <code>&lt;g&gt;</code> render directly in Svelte markup as first-class citizens. The <code>viewBox</code> attribute makes charts resolution-independent, scaling cleanly to any container width without pixelation or distortion.</p>
	<p class="prose">Reactivity drives the entire interaction model. The <code>$state</code> rune powers the slider and hover state, while inline derived expressions compute scale positions on every change. Svelte's <code>{'{#each}'}</code> block iterates over real data arrays to create SVG elements declaratively — no imperative DOM manipulation, no <code>appendChild</code> loops.</p>
	<p class="prose">Conditional styling through ternary expressions on attributes like <code>opacity</code> and <code>stroke-width</code> creates hover effects without toggling CSS classes. This pattern keeps the visual logic colocated with the data, making it easy to reason about what each bubble looks like in every state.</p>
	<p class="next">Next lesson: DV.2 builds a horizontal bar chart with sorted data and animated reordering.</p>
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
	@media (min-inline-size: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

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
		inline-size: 200px;
		accent-color: oklch(65% 0.22 270);
	}
	.chart {
		inline-size: 100%;
		max-inline-size: 640px;
		block-size: auto;
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
