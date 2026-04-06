<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	interface EnergyBar {
		label: string;
		color: string;
	}

	const sources: EnergyBar[] = [
		{ label: 'Coal', color: 'oklch(45% 0.05 60)' },
		{ label: 'Gas', color: 'oklch(55% 0.08 80)' },
		{ label: 'Oil', color: 'oklch(50% 0.06 50)' },
		{ label: 'Nuclear', color: 'oklch(55% 0.12 280)' },
		{ label: 'Hydro', color: 'oklch(55% 0.15 230)' },
		{ label: 'Wind', color: 'oklch(60% 0.18 200)' },
		{ label: 'Solar', color: 'oklch(75% 0.18 85)' },
		{ label: 'Other RE', color: 'oklch(55% 0.12 145)' }
	];

	// Approximate % of global electricity generation
	const data2010 = [40, 22, 5, 13, 16, 2, 0.5, 1.5];
	const data2024 = [34, 22, 3, 10, 15, 8, 5, 3];
	const data2030 = [22, 18, 2, 10, 14, 14, 12, 8];

	// Chapter states: which data to show, which highlights, which annotations
	interface ChapterState {
		values: number[];
		highlight: number | null;
		showCostAnnotation: boolean;
		showProjection: boolean;
	}

	const chapters: ChapterState[] = [
		{ values: data2010, highlight: null, showCostAnnotation: false, showProjection: false },
		{ values: data2010, highlight: 6, showCostAnnotation: true, showProjection: false },
		{ values: data2024, highlight: null, showCostAnnotation: false, showProjection: false },
		{ values: data2030, highlight: null, showCostAnnotation: false, showProjection: true }
	];

	const chapterTexts = [
		{ title: 'Chapter 1: The Starting Line', body: 'In 2010, renewables were roughly 20% of global electricity — mostly hydropower. Coal dominated at 40%. The energy transition had barely begun.' },
		{ title: 'Chapter 2: The Solar Revolution', body: 'Solar costs dropped over 90% in a single decade. From $4.46/W in 2010 to $0.27/W in 2023. This cost collapse changed everything — solar went from niche to the cheapest energy source in history.' },
		{ title: 'Chapter 3: Present Day', body: 'By 2024, renewables hit 31% of global electricity. Wind grew 4x, solar grew 10x. Coal is declining but still the single largest source. The transition is underway but far from complete.' },
		{ title: 'Chapter 4: The Horizon', body: 'Projections suggest renewables could reach 50% by 2030. Solar and wind continue their exponential growth. But reaching net zero requires even faster deployment — every bar in this chart needs to shift.' }
	];

	let activeChapter = $state(0);
	let containerWidth = $state(0);

	// Create tweens for each source
	const barTweens = sources.map(
		(_, i) => new Tween(data2010[i], { duration: 700, easing: cubicOut })
	);
	const annotationOpacity = new Tween(0, { duration: 400, easing: cubicOut });

	$effect(() => {
		const chapter = chapters[activeChapter];
		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;
		for (let i = 0; i < barTweens.length; i++) {
			barTweens[i].set(chapter.values[i], opts);
		}
		annotationOpacity.set(chapter.showCostAnnotation ? 1 : 0, opts);
	});

	let chapterEls: HTMLElement[] = [];

	$effect(() => {
		if (typeof IntersectionObserver === 'undefined') return;
		const observers: IntersectionObserver[] = [];
		for (let i = 0; i < chapterEls.length; i++) {
			const el = chapterEls[i];
			if (!el) continue;
			const obs = new IntersectionObserver(
				(entries) => {
					for (const entry of entries) {
						if (entry.isIntersecting) {
							activeChapter = i;
						}
					}
				},
				{ threshold: 0.5 }
			);
			obs.observe(el);
			observers.push(obs);
		}
		return () => {
			for (const obs of observers) obs.disconnect();
		};
	});

	const padding = { top: 24, right: 20, bottom: 36, left: 70 };
	const chartHeight = 340;
	const plotH = chartHeight - padding.top - padding.bottom;
	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 100));
	const barGroupW = $derived(plotW / sources.length);
	const barW = $derived(Math.min(barGroupW * 0.65, 60));
	const maxVal = 50;

	function yScale(val: number): number {
		return plotH - (val / maxVal) * plotH;
	}


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"	import { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"	interface EnergyBar {\n" +
		"		label: string;\n" +
		"		color: string;\n" +
		"	}\n" +
		"\n" +
		"	const sources: EnergyBar[] = [\n" +
		"		{ label: 'Coal', color: 'oklch(45% 0.05 60)' },\n" +
		"		{ label: 'Gas', color: 'oklch(55% 0.08 80)' },\n" +
		"		{ label: 'Oil', color: 'oklch(50% 0.06 50)' },\n" +
		"		{ label: 'Nuclear', color: 'oklch(55% 0.12 280)' },\n" +
		"		{ label: 'Hydro', color: 'oklch(55% 0.15 230)' },\n" +
		"		{ label: 'Wind', color: 'oklch(60% 0.18 200)' },\n" +
		"		{ label: 'Solar', color: 'oklch(75% 0.18 85)' },\n" +
		"		{ label: 'Other RE', color: 'oklch(55% 0.12 145)' }\n" +
		"	];\n" +
		"\n" +
		"	// Approximate % of global electricity generation\n" +
		"	const data2010 = [40, 22, 5, 13, 16, 2, 0.5, 1.5];\n" +
		"	const data2024 = [34, 22, 3, 10, 15, 8, 5, 3];\n" +
		"	const data2030 = [22, 18, 2, 10, 14, 14, 12, 8];\n" +
		"\n" +
		"	// Chapter states: which data to show, which highlights, which annotations\n" +
		"	interface ChapterState {\n" +
		"		values: number[];\n" +
		"		highlight: number | null;\n" +
		"		showCostAnnotation: boolean;\n" +
		"		showProjection: boolean;\n" +
		"	}\n" +
		"\n" +
		"	const chapters: ChapterState[] = [\n" +
		"		{ values: data2010, highlight: null, showCostAnnotation: false, showProjection: false },\n" +
		"		{ values: data2010, highlight: 6, showCostAnnotation: true, showProjection: false },\n" +
		"		{ values: data2024, highlight: null, showCostAnnotation: false, showProjection: false },\n" +
		"		{ values: data2030, highlight: null, showCostAnnotation: false, showProjection: true }\n" +
		"	];\n" +
		"\n" +
		"	const chapterTexts = [\n" +
		"		{ title: 'Chapter 1: The Starting Line', body: 'In 2010, renewables were roughly 20% of global electricity — mostly hydropower. Coal dominated at 40%. The energy transition had barely begun.' },\n" +
		"		{ title: 'Chapter 2: The Solar Revolution', body: 'Solar costs dropped over 90% in a single decade. From $4.46/W in 2010 to $0.27/W in 2023. This cost collapse changed everything — solar went from niche to the cheapest energy source in history.' },\n" +
		"		{ title: 'Chapter 3: Present Day', body: 'By 2024, renewables hit 31% of global electricity. Wind grew 4x, solar grew 10x. Coal is declining but still the single largest source. The transition is underway but far from complete.' },\n" +
		"		{ title: 'Chapter 4: The Horizon', body: 'Projections suggest renewables could reach 50% by 2030. Solar and wind continue their exponential growth. But reaching net zero requires even faster deployment — every bar in this chart needs to shift.' }\n" +
		"	];\n" +
		"\n" +
		"	let activeChapter = $state(0);\n" +
		"	let containerWidth = $state(0);\n" +
		"\n" +
		"	// Create tweens for each source\n" +
		"	const barTweens = sources.map(\n" +
		"		(_, i) =\u003e new Tween(data2010[i], { duration: 700, easing: cubicOut })\n" +
		"	);\n" +
		"	const annotationOpacity = new Tween(0, { duration: 400, easing: cubicOut });\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		const chapter = chapters[activeChapter];\n" +
		"		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;\n" +
		"		for (let i = 0; i \u003c barTweens.length; i++) {\n" +
		"			barTweens[i].set(chapter.values[i], opts);\n" +
		"		}\n" +
		"		annotationOpacity.set(chapter.showCostAnnotation ? 1 : 0, opts);\n" +
		"	});\n" +
		"\n" +
		"	let chapterEls: HTMLElement[] = [];\n" +
		"\n" +
		"	$effect(() =\u003e {\n" +
		"		if (typeof IntersectionObserver === 'undefined') return;\n" +
		"		const observers: IntersectionObserver[] = [];\n" +
		"		for (let i = 0; i \u003c chapterEls.length; i++) {\n" +
		"			const el = chapterEls[i];\n" +
		"			if (!el) continue;\n" +
		"			const obs = new IntersectionObserver(\n" +
		"				(entries) =\u003e {\n" +
		"					for (const entry of entries) {\n" +
		"						if (entry.isIntersecting) {\n" +
		"							activeChapter = i;\n" +
		"						}\n" +
		"					}\n" +
		"				},\n" +
		"				{ threshold: 0.5 }\n" +
		"			);\n" +
		"			obs.observe(el);\n" +
		"			observers.push(obs);\n" +
		"		}\n" +
		"		return () =\u003e {\n" +
		"			for (const obs of observers) obs.disconnect();\n" +
		"		};\n" +
		"	});\n" +
		"\n" +
		"	const padding = { top: 24, right: 20, bottom: 36, left: 70 };\n" +
		"	const chartHeight = 340;\n" +
		"	const plotH = chartHeight - padding.top - padding.bottom;\n" +
		"	const plotW = $derived(Math.max(containerWidth - padding.left - padding.right, 100));\n" +
		"	const barGroupW = $derived(plotW / sources.length);\n" +
		"	const barW = $derived(Math.min(barGroupW * 0.65, 60));\n" +
		"	const maxVal = 50;\n" +
		"\n" +
		"	function yScale(val: number): number {\n" +
		"		return plotH - (val / maxVal) * plotH;\n" +
		"	}\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"	\u003ch1\u003eDV.9 — Scroll-Driven Storytelling\u003c/h1\u003e\n" +
		"	\u003cp class=\"concept\"\u003e\n" +
		"		\u003cstrong\u003eThe Pudding's signature:\u003c/strong\u003e as you scroll, the chart transforms. Data points\n" +
		"		filter, annotations appear, axes shift. Use \u003ccode\u003eIntersectionObserver\u003c/code\u003e to detect which\n" +
		"		\"chapter\" the viewport is in. Derive the chart state from the chapter index. Each chapter adds\n" +
		"		or changes something. The reader's scroll IS the interaction.\n" +
		"	\u003c/p\u003e\n" +
		"\n" +
		"	\u003cdiv class=\"scroll-container\"\u003e\n" +
		"		\u003cdiv class=\"sticky-chart\" bind:clientWidth={containerWidth}\u003e\n" +
		"			\u003cdiv class=\"chapter-indicator\"\u003e\n" +
		"				{#each chapterTexts as _, i}\n" +
		"					\u003cspan class=\"dot\" class:active={activeChapter === i}\u003e\u003c/span\u003e\n" +
		"				{/each}\n" +
		"			\u003c/div\u003e\n" +
		"\n" +
		"			{#if containerWidth \u003e 0}\n" +
		"				\u003csvg\n" +
		"					width={containerWidth}\n" +
		"					height={chartHeight}\n" +
		"					viewBox=\"0 0 {containerWidth} {chartHeight}\"\n" +
		"					role=\"img\"\n" +
		"					aria-label=\"Global electricity generation by source, animated by scroll chapter\"\n" +
		"				\u003e\n" +
		"					\u003cg transform=\"translate({padding.left}, {padding.top})\"\u003e\n" +
		"						\u003c!-- Grid lines --\u003e\n" +
		"						{#each [0, 10, 20, 30, 40, 50] as val}\n" +
		"							\u003cline\n" +
		"								x1={0}\n" +
		"								y1={yScale(val)}\n" +
		"								x2={plotW}\n" +
		"								y2={yScale(val)}\n" +
		"								stroke=\"var(--color-border)\"\n" +
		"								stroke-width=\"0.5\"\n" +
		"							/\u003e\n" +
		"							\u003ctext\n" +
		"								x={-8}\n" +
		"								y={yScale(val)}\n" +
		"								text-anchor=\"end\"\n" +
		"								dominant-baseline=\"central\"\n" +
		"								fill=\"var(--color-text-muted)\"\n" +
		"								font-size=\"10\"\n" +
		"							\u003e\n" +
		"								{val}%\n" +
		"							\u003c/text\u003e\n" +
		"						{/each}\n" +
		"\n" +
		"						\u003c!-- Bars --\u003e\n" +
		"						{#each sources as source, i}\n" +
		"							{@const cx = i * barGroupW + barGroupW / 2}\n" +
		"							{@const val = barTweens[i].current}\n" +
		"							{@const h = (val / maxVal) * plotH}\n" +
		"							{@const isHighlighted = chapters[activeChapter].highlight === i}\n" +
		"							{@const isProjection = chapters[activeChapter].showProjection}\n" +
		"							\u003crect\n" +
		"								x={cx - barW / 2}\n" +
		"								y={plotH - h}\n" +
		"								width={barW}\n" +
		"								height={h}\n" +
		"\u003c!-- ... remaining markup ... --\u003e";
</script>

<section class="page">
	<h1>DV.9 — Scroll-Driven Storytelling</h1>
	<p class="concept">
		<strong>The Pudding's signature:</strong> as you scroll, the chart transforms. Data points
		filter, annotations appear, axes shift. Use <code>IntersectionObserver</code> to detect which
		"chapter" the viewport is in. Derive the chart state from the chapter index. Each chapter adds
		or changes something. The reader's scroll IS the interaction.
	</p>

	<div class="scroll-container">
		<div class="sticky-chart" bind:clientWidth={containerWidth}>
			<div class="chapter-indicator">
				{#each chapterTexts as _, i}
					<span class="dot" class:active={activeChapter === i}></span>
				{/each}
			</div>

			{#if containerWidth > 0}
				<svg
					width={containerWidth}
					height={chartHeight}
					viewBox="0 0 {containerWidth} {chartHeight}"
					role="img"
					aria-label="Global electricity generation by source, animated by scroll chapter"
				>
					<g transform="translate({padding.left}, {padding.top})">
						<!-- Grid lines -->
						{#each [0, 10, 20, 30, 40, 50] as val}
							<line
								x1={0}
								y1={yScale(val)}
								x2={plotW}
								y2={yScale(val)}
								stroke="var(--color-border)"
								stroke-width="0.5"
							/>
							<text
								x={-8}
								y={yScale(val)}
								text-anchor="end"
								dominant-baseline="central"
								fill="var(--color-text-muted)"
								font-size="10"
							>
								{val}%
							</text>
						{/each}

						<!-- Bars -->
						{#each sources as source, i}
							{@const cx = i * barGroupW + barGroupW / 2}
							{@const val = barTweens[i].current}
							{@const h = (val / maxVal) * plotH}
							{@const isHighlighted = chapters[activeChapter].highlight === i}
							{@const isProjection = chapters[activeChapter].showProjection}
							<rect
								x={cx - barW / 2}
								y={plotH - h}
								width={barW}
								height={h}
								rx="2"
								fill={source.color}
								opacity={isHighlighted ? 1 : chapters[activeChapter].highlight !== null ? 0.3 : 1}
								stroke={isProjection && i >= 4 ? source.color : 'none'}
								stroke-width={isProjection && i >= 4 ? 2 : 0}
								stroke-dasharray={isProjection && i >= 4 ? '4,3' : 'none'}
							/>
							<text
								x={cx}
								y={plotH - h - 5}
								text-anchor="middle"
								fill="var(--color-text)"
								font-size="9"
								font-weight="600"
								opacity={val > 1 ? 1 : 0}
							>
								{Math.round(val)}%
							</text>
							<text
								x={cx}
								y={plotH + 14}
								text-anchor="middle"
								fill="var(--color-text-muted)"
								font-size={containerWidth < 500 ? '7' : '9'}
							>
								{source.label}
							</text>
						{/each}

						<!-- Cost annotation (chapter 2) -->
						{#if annotationOpacity.current > 0.01}
							{@const solarX = 6 * barGroupW + barGroupW / 2}
							<g opacity={annotationOpacity.current}>
								<line
									x1={solarX}
									y1={-10}
									x2={solarX}
									y2={plotH}
									stroke="oklch(75% 0.18 85)"
									stroke-width="1.5"
									stroke-dasharray="4,3"
								/>
								<rect
									x={solarX - 55}
									y={-8}
									width="110"
									height="20"
									rx="4"
									fill="oklch(75% 0.18 85)"
								/>
								<text
									x={solarX}
									y={5}
									text-anchor="middle"
									fill="oklch(25% 0.02 85)"
									font-size="9"
									font-weight="700"
								>
									-90% cost drop
								</text>
							</g>
						{/if}
					</g>
				</svg>
			{/if}
		</div>

		<div class="chapters">
			{#each chapterTexts as chapter, i}
				<section
					class="chapter"
					class:active={activeChapter === i}
					bind:this={chapterEls[i]}
				>
					<div class="chapter-card">
						<h3>{chapter.title}</h3>
						<p>{chapter.body}</p>
					</div>
				</section>
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
		<li>Use <code>IntersectionObserver</code> to detect which scroll chapter is active.</li>
		<li>Derive chart state (data, highlights, annotations) from the active chapter index.</li>
		<li><code>position: sticky</code> keeps the chart visible while chapters scroll past.</li>
		<li>Tween bar heights for smooth transitions between chapters.</li>
		<li>Check <code>prefersReducedMotion</code> and set tween duration to 0 when active.</li>
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
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

	.scroll-container {
		position: relative;
	}

	.sticky-chart {
		position: sticky;
		top: var(--space-xl);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-md);
		box-shadow: var(--shadow-sm);
		z-index: 2;
	}

	.chapter-indicator {
		display: flex;
		gap: var(--space-xs);
		justify-content: center;
		margin-block-end: var(--space-sm);
	}

	.dot {
		display: block;
		inline-size: 8px;
		block-size: 8px;
		border-radius: var(--radius-full);
		background: var(--color-border);
		transition: background 0.3s;
	}

	.dot.active {
		background: oklch(55% 0.18 230);
	}

	.chapters {
		position: relative;
		z-index: 1;
	}

	.chapter {
		min-block-size: 80vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-xl) var(--space-md);
	}

	.chapter-card {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		max-inline-size: 480px;
		box-shadow: var(--shadow-md);
		opacity: 0.85;
		transition: opacity 0.3s;
	}

	.chapter.active .chapter-card {
		opacity: 1;
	}

	.chapter-card h3 {
		margin-block-start: 0;
		color: var(--color-text);
	}

	.chapter-card p {
		color: var(--color-text-muted);
		line-height: 1.7;
		margin: 0;
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
