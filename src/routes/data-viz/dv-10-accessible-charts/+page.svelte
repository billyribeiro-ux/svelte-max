<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface EmissionData {
		country: string;
		emissions: number;
		code: string;
	}

	const data: EmissionData[] = [
		{ country: 'China', emissions: 12667, code: 'CN' },
		{ country: 'United States', emissions: 5007, code: 'US' },
		{ country: 'India', emissions: 2830, code: 'IN' },
		{ country: 'Russia', emissions: 1909, code: 'RU' },
		{ country: 'Japan', emissions: 1080, code: 'JP' },
		{ country: 'Germany', emissions: 637, code: 'DE' },
		{ country: 'South Korea', emissions: 616, code: 'KR' },
		{ country: 'Iran', emissions: 580, code: 'IR' },
		{ country: 'Canada', emissions: 544, code: 'CA' },
		{ country: 'Indonesia', emissions: 530, code: 'ID' }
	];

	const maxEmissions = Math.max(...data.map((d) => d.emissions));
	let containerWidth = $state(0);
	let focusedIndex = $state<number | null>(null);
	let hoveredIndex = $state<number | null>(null);
	let showTable = $state(false);

	const activeIndex = $derived(focusedIndex ?? hoveredIndex);

	const padding = { top: 20, right: 60, bottom: 40, left: 110 };
	const barHeight = 28;
	const barGap = 10;
	const chartHeight = padding.top + data.length * (barHeight + barGap) + padding.bottom;
	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 50));

	function barWidth(emissions: number): number {
		return (emissions / maxEmissions) * plotW;
	}

	const chartSummary = `Bar chart showing CO2 emissions by country in 2023. China leads with ${data[0].emissions.toLocaleString()} megatons, followed by the United States at ${data[1].emissions.toLocaleString()} megatons. The top 10 emitters account for over 70% of global CO2 emissions.`;

	function handleBarFocus(index: number): void {
		focusedIndex = index;
	}

	function handleBarBlur(): void {
		focusedIndex = null;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"interface EmissionData {\n" +
		"		country: string;\n" +
		"		emissions: number;\n" +
		"		code: string;\n" +
		"	}\n" +
		"\n" +
		"	const data: EmissionData[] = [\n" +
		"		{ country: 'China', emissions: 12667, code: 'CN' },\n" +
		"		{ country: 'United States', emissions: 5007, code: 'US' },\n" +
		"		{ country: 'India', emissions: 2830, code: 'IN' },\n" +
		"		{ country: 'Russia', emissions: 1909, code: 'RU' },\n" +
		"		{ country: 'Japan', emissions: 1080, code: 'JP' },\n" +
		"		{ country: 'Germany', emissions: 637, code: 'DE' },\n" +
		"		{ country: 'South Korea', emissions: 616, code: 'KR' },\n" +
		"		{ country: 'Iran', emissions: 580, code: 'IR' },\n" +
		"		{ country: 'Canada', emissions: 544, code: 'CA' },\n" +
		"		{ country: 'Indonesia', emissions: 530, code: 'ID' }\n" +
		"	];\n" +
		"\n" +
		"	const maxEmissions = Math.max(...data.map((d) =\u003e d.emissions));\n" +
		"	let containerWidth = $state(0);\n" +
		"	let focusedIndex = $state\u003cnumber | null\u003e(null);\n" +
		"	let hoveredIndex = $state\u003cnumber | null\u003e(null);\n" +
		"	let showTable = $state(false);\n" +
		"\n" +
		"	const activeIndex = $derived(focusedIndex ?? hoveredIndex);\n" +
		"\n" +
		"	const padding = { top: 20, right: 60, bottom: 40, left: 110 };\n" +
		"	const barHeight = 28;\n" +
		"	const barGap = 10;\n" +
		"	const chartHeight = padding.top + data.length * (barHeight + barGap) + padding.bottom;\n" +
		"	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 50));\n" +
		"\n" +
		"	function barWidth(emissions: number): number {\n" +
		"		return (emissions / maxEmissions) * plotW;\n" +
		"	}\n" +
		"\n" +
		"	const chartSummary = `Bar chart showing CO2 emissions by country in 2023. China leads with ${data[0].emissions.toLocaleString()} megatons, followed by the United States at ${data[1].emissions.toLocaleString()} megatons. The top 10 emitters account for over 70% of global CO2 emissions.`;\n" +
		"\n" +
		"	function handleBarFocus(index: number): void {\n" +
		"		focusedIndex = index;\n" +
		"	}\n" +
		"\n" +
		"	function handleBarBlur(): void {\n" +
		"		focusedIndex = null;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.10 — Accessible Charts\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eCharts are visual — screen readers cannot see them.\u003c/strong\u003e Every chart needs:\n" +
		"		(1) \u003ccode\u003erole=\"img\"\u003c/code\u003e + \u003ccode\u003earia-label\u003c/code\u003e describing the chart's message,\n" +
		"		(2) a \u003ccode\u003e&lt;desc&gt;\u003c/code\u003e inside the SVG with a text summary,\n" +
		"		(3) a visually-hidden \u003ccode\u003e&lt;table&gt;\u003c/code\u003e with raw data as a fallback,\n" +
		"		(4) \u003ccode\u003earia-hidden=\"true\"\u003c/code\u003e on decorative elements,\n" +
		"		(5) focus-visible outlines on interactive elements with \u003ccode\u003etabindex=\"0\"\u003c/code\u003e.\n" +
		"		This is how you pass WCAG 2.1 AA for data visualization.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"build\" bind:clientWidth={containerWidth}\u003e\n" +
		"		{#if containerWidth \u003e 0}\n" +
		"			\u003csvg\n" +
		"				width={containerWidth}\n" +
		"				height={chartHeight}\n" +
		"				viewBox=\"0 0 {containerWidth} {chartHeight}\"\n" +
		"				role=\"img\"\n" +
		"				aria-label=\"CO2 emissions by country, 2023. China is the top emitter at 12,667 megatons.\"\n" +
		"			\u003e\n" +
		"				\u003cdesc\u003e{chartSummary}\u003c/desc\u003e\n" +
		"\n" +
		"				\u003cg transform=\"translate({padding.left}, {padding.top})\"\u003e\n" +
		"					\u003c!-- Grid lines (decorative) --\u003e\n" +
		"					\u003cg aria-hidden=\"true\"\u003e\n" +
		"						{#each [0, 3000, 6000, 9000, 12000] as val}\n" +
		"							{@const x = (val / maxEmissions) * plotW}\n" +
		"							\u003cline\n" +
		"								x1={x}\n" +
		"								y1={0}\n" +
		"								x2={x}\n" +
		"								y2={data.length * (barHeight + barGap)}\n" +
		"								stroke=\"var(--color-border)\"\n" +
		"								stroke-width=\"0.5\"\n" +
		"							/\u003e\n" +
		"							\u003ctext\n" +
		"								x={x}\n" +
		"								y={data.length * (barHeight + barGap) + 18}\n" +
		"								text-anchor=\"middle\"\n" +
		"								fill=\"var(--color-text-muted)\"\n" +
		"								font-size=\"10\"\n" +
		"							\u003e\n" +
		"								{val \u003e 0 ? `${(val / 1000).toFixed(0)}k` : '0'}\n" +
		"							\u003c/text\u003e\n" +
		"						{/each}\n" +
		"						\u003ctext\n" +
		"							x={plotW / 2}\n" +
		"							y={data.length * (barHeight + barGap) + 34}\n" +
		"							text-anchor=\"middle\"\n" +
		"							fill=\"var(--color-text-muted)\"\n" +
		"							font-size=\"10\"\n" +
		"						\u003e\n" +
		"							Megatons CO2\n" +
		"						\u003c/text\u003e\n" +
		"					\u003c/g\u003e\n" +
		"\n" +
		"					\u003c!-- Country labels (decorative — data is in hidden table) --\u003e\n" +
		"					\u003cg aria-hidden=\"true\"\u003e\n" +
		"						{#each data as d, i}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.10 — Accessible Charts</h1>
	<p class="concept">
		<strong>Charts are visual — screen readers cannot see them.</strong> Every chart needs:
		(1) <code>role="img"</code> + <code>aria-label</code> describing the chart's message,
		(2) a <code>&lt;desc&gt;</code> inside the SVG with a text summary,
		(3) a visually-hidden <code>&lt;table&gt;</code> with raw data as a fallback,
		(4) <code>aria-hidden="true"</code> on decorative elements,
		(5) focus-visible outlines on interactive elements with <code>tabindex="0"</code>.
		This is how you pass WCAG 2.1 AA for data visualization.
	</p>

	<div class="build" bind:clientWidth={containerWidth}>
		{#if containerWidth > 0}
			<svg
				width={containerWidth}
				height={chartHeight}
				viewBox="0 0 {containerWidth} {chartHeight}"
				role="img"
				aria-label="CO2 emissions by country, 2023. China is the top emitter at 12,667 megatons."
			>
				<desc>{chartSummary}</desc>

				<g transform="translate({padding.left}, {padding.top})">
					<!-- Grid lines (decorative) -->
					<g aria-hidden="true">
						{#each [0, 3000, 6000, 9000, 12000] as val}
							{@const x = (val / maxEmissions) * plotW}
							<line
								x1={x}
								y1={0}
								x2={x}
								y2={data.length * (barHeight + barGap)}
								stroke="var(--color-border)"
								stroke-width="0.5"
							/>
							<text
								x={x}
								y={data.length * (barHeight + barGap) + 18}
								text-anchor="middle"
								fill="var(--color-text-muted)"
								font-size="10"
							>
								{val > 0 ? `${(val / 1000).toFixed(0)}k` : '0'}
							</text>
						{/each}
						<text
							x={plotW / 2}
							y={data.length * (barHeight + barGap) + 34}
							text-anchor="middle"
							fill="var(--color-text-muted)"
							font-size="10"
						>
							Megatons CO2
						</text>
					</g>

					<!-- Country labels (decorative — data is in hidden table) -->
					<g aria-hidden="true">
						{#each data as d, i}
							{@const y = i * (barHeight + barGap)}
							<text
								x={-8}
								y={y + barHeight / 2}
								text-anchor="end"
								dominant-baseline="central"
								fill="var(--color-text-muted)"
								font-size="11"
							>
								{d.country}
							</text>
						{/each}
					</g>

					<!-- Bars (interactive, focusable) -->
					{#each data as d, i}
						{@const y = i * (barHeight + barGap)}
						{@const w = barWidth(d.emissions)}
						{@const isActive = activeIndex === i}
						<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
						<g
							tabindex="0"
							role="listitem"
							aria-label="{d.country}: {d.emissions.toLocaleString()} megatons CO2"
							onfocus={() => handleBarFocus(i)}
							onblur={handleBarBlur}
							onpointerenter={() => (hoveredIndex = i)}
							onpointerleave={() => (hoveredIndex = null)}
							class="bar-group"
						>
							<rect
								x={0}
								{y}
								width={w}
								height={barHeight}
								rx="3"
								fill={isActive ? 'oklch(55% 0.22 250)' : 'oklch(60% 0.15 250)'}
							/>
							{#if isActive}
								<rect
									x={-2}
									y={y - 2}
									width={w + 4}
									height={barHeight + 4}
									rx="5"
									fill="none"
									stroke="oklch(55% 0.22 250)"
									stroke-width="2"
								/>
							{/if}
							<text
								x={w + 6}
								y={y + barHeight / 2}
								dominant-baseline="central"
								fill="var(--color-text)"
								font-size="10"
								font-weight={isActive ? '700' : '400'}
								aria-hidden="true"
							>
								{d.emissions.toLocaleString()}
							</text>
						</g>
					{/each}
				</g>
			</svg>
		{/if}

		<!-- "View as table" toggle -->
		<button
			type="button"
			class="table-toggle"
			onclick={() => (showTable = !showTable)}
			aria-expanded={showTable}
			aria-controls="data-table"
		>
			{showTable ? 'Hide data table' : 'View as table'}
		</button>

		<!-- Hidden data table (always available to screen readers) -->
		<table
			id="data-table"
			class:sr-only={!showTable}
			class:visible-table={showTable}
		>
			<caption>CO2 Emissions by Country, 2023 (Megatons)</caption>
			<thead>
				<tr>
					<th scope="col">Rank</th>
					<th scope="col">Country</th>
					<th scope="col">Emissions (Mt CO2)</th>
				</tr>
			</thead>
			<tbody>
				{#each data as d, i}
					<tr>
						<td>{i + 1}</td>
						<td>{d.country}</td>
						<td>{d.emissions.toLocaleString()}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Accessibility is invisible until you break it. These experiments reveal what screen readers and keyboard users actually experience.</p>
	<ol class="experiments">
		<li><strong>Remove <code>role="img"</code> and <code>aria-label</code> from the SVG element.</strong> A screen reader will either skip the chart entirely or attempt to read every SVG element as a separate item, producing an incomprehensible stream of coordinates and attributes. The role and label give the chart a meaningful identity.</li>
		<li><strong>Remove <code>tabindex="0"</code> from the bar groups.</strong> Try navigating the chart with the Tab key — the bars become unreachable. Keyboard-only users lose the ability to explore individual data points. Without tabindex, SVG elements are not part of the focus order.</li>
		<li><strong>Remove the <code>aria-hidden="true"</code> wrapper from gridlines and axis labels.</strong> A screen reader will now announce every gridline and tick label as separate elements, burying the actual data in a flood of decorative noise. Marking decorative elements as hidden is essential for usability.</li>
		<li><strong>Delete the hidden <code>&lt;table&gt;</code> element entirely.</strong> Screen reader users lose their only way to access the raw data in a structured format. The table is the accessible fallback that makes the chart's information available to users who cannot see the visual representation.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Accessible charts require a multi-layered approach. <code>role="img"</code> with <code>aria-label</code> on the SVG gives screen readers a concise description of the chart's key insight. A <code>&lt;desc&gt;</code> element inside the SVG provides a longer summary. These two layers ensure that assistive technologies can convey the chart's meaning without seeing it.</p>
	<p class="prose">A visually-hidden <code>&lt;table&gt;</code> with raw data serves as the structured fallback for users who cannot interpret the visual representation. The "View as table" button toggles visibility for sighted users who prefer tabular data. Decorative elements like gridlines and axis labels are wrapped in <code>aria-hidden="true"</code> to prevent screen reader noise.</p>
	<p class="prose">Keyboard accessibility means every interactive element has <code>tabindex="0"</code> and visible focus indicators. Both <code>onfocus</code> and <code>onpointerenter</code> highlight bars, ensuring that no interaction is mouse-only. This dual-input pattern is the baseline for WCAG 2.1 AA compliance in data visualization.</p>
	<p class="next">You have completed the data visualization track. Apply these patterns in the project lesson to build a complete interactive chart.</p>
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

	svg {
		display: block;
	}

	.bar-group:focus {
		outline: none;
	}

	.table-toggle {
		align-self: flex-start;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		cursor: pointer;
		font-size: var(--text-sm);
	}

	.table-toggle:hover {
		background: var(--color-border);
	}

	.sr-only {
		position: absolute;
		inline-size: 1px;
		block-size: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border-inline-width: 0;
	}

	.visible-table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}

	.visible-table caption {
		font-weight: 700;
		color: var(--color-text);
		margin-block-end: var(--space-sm);
		text-align: start;
	}

	.visible-table th,
	.visible-table td {
		padding: var(--space-xs) var(--space-sm);
		text-align: start;
		border-block-end: 1px solid var(--color-border);
		color: var(--color-text-muted);
	}

	.visible-table th {
		color: var(--color-text);
		font-weight: 600;
	}

	.visible-table tbody tr:hover {
		background: var(--color-surface-2);
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
