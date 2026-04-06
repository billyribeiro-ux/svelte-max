<script lang="ts">
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

	<h3>Accessibility checklist</h3>
	<ul>
		<li><code>role="img"</code> + <code>aria-label</code> on the SVG describes the chart's key insight.</li>
		<li><code>&lt;desc&gt;</code> inside the SVG provides a longer text summary for screen readers.</li>
		<li>Each bar has <code>tabindex="0"</code> and <code>aria-label</code> — keyboard users tab through values.</li>
		<li>A hidden <code>&lt;table&gt;</code> provides raw data as a fallback — toggled visible with a button.</li>
		<li>Decorative gridlines and axis labels use <code>aria-hidden="true"</code>.</li>
		<li>Focus and hover both highlight bars — no mouse-only interactions.</li>
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
		border-width: 0;
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
</style>
