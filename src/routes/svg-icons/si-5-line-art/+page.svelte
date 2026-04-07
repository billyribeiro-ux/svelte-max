<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface LinePath {
		d: string;
		label: string;
		length: number;
		finalColor: string;
	}

	/**
	 * A simplified architectural floor plan: outer walls, inner walls,
	 * doors, windows, and furniture outlines — 10 paths total.
	 */
	const pathDefs: Omit<LinePath, 'length'>[] = [
		/* Outer walls */
		{ d: 'M 20 20 L 280 20 L 280 200 L 20 200 Z', label: 'Outer walls', finalColor: 'oklch(55% 0.15 250)' },
		/* Living room partition */
		{ d: 'M 150 20 L 150 120', label: 'Living wall', finalColor: 'oklch(60% 0.18 220)' },
		/* Kitchen partition */
		{ d: 'M 150 120 L 280 120', label: 'Kitchen wall', finalColor: 'oklch(60% 0.18 220)' },
		/* Bedroom partition */
		{ d: 'M 150 120 L 150 200', label: 'Bedroom wall', finalColor: 'oklch(60% 0.18 220)' },
		/* Front door */
		{ d: 'M 20 90 C 35 90, 40 80, 40 70', label: 'Front door', finalColor: 'oklch(65% 0.22 30)' },
		/* Window 1 */
		{ d: 'M 60 20 L 60 16 L 100 16 L 100 20', label: 'Window N', finalColor: 'oklch(70% 0.15 180)' },
		/* Window 2 */
		{ d: 'M 280 60 L 284 60 L 284 100 L 280 100', label: 'Window E', finalColor: 'oklch(70% 0.15 180)' },
		/* Kitchen counter */
		{ d: 'M 180 125 L 270 125 L 270 145 L 180 145', label: 'Counter', finalColor: 'oklch(70% 0.20 60)' },
		/* Bed outline */
		{ d: 'M 40 140 L 120 140 L 120 190 L 40 190 Z', label: 'Bed', finalColor: 'oklch(65% 0.18 330)' },
		/* Table */
		{ d: 'M 180 40 L 250 40 L 250 80 L 180 80 Z', label: 'Table', finalColor: 'oklch(55% 0.12 145)' }
	];

	let pathEls: SVGPathElement[] = $state([]);
	let pathLengths: number[] = $state(pathDefs.map(() => 0));
	let isAnimating = $state(false);
	let completedCount = $state(0);
	let handDrawn = $state(false);

	const STROKE_DURATION = 500;

	const tweens = pathDefs.map(() => new Tween(1, { duration: STROKE_DURATION, easing: cubicOut }));
	/* Color progress: 0 = monochrome, 1 = colored */
	const colorTweens = pathDefs.map(() => new Tween(0, { duration: 300, easing: cubicOut }));

	$effect(() => {
		for (let i = 0; i < pathEls.length; i++) {
			if (pathEls[i]) {
				pathLengths[i] = pathEls[i].getTotalLength();
			}
		}
	});

	function dashArray(index: number): string {
		const len = pathLengths[index];
		if (!handDrawn || len === 0) return String(len);
		/* Add slight randomization for organic hand-drawn feel */
		const seg = len / 20;
		const parts: number[] = [];
		let remaining = len;
		while (remaining > 0) {
			const dash = Math.max(seg * (0.7 + Math.random() * 0.6), 1);
			const gap = Math.max(seg * (0.05 + Math.random() * 0.1), 0.5);
			parts.push(Math.min(dash, remaining));
			remaining -= dash;
			if (remaining > 0) {
				parts.push(Math.min(gap, remaining));
				remaining -= gap;
			}
		}
		return parts.map((n) => n.toFixed(1)).join(' ');
	}

	async function draw(): Promise<void> {
		if (isAnimating) return;
		isAnimating = true;
		completedCount = 0;

		const dur = prefersReducedMotion.current ? 0 : STROKE_DURATION;
		const colorDur = prefersReducedMotion.current ? 0 : 300;

		/* Reset all */
		for (let i = 0; i < tweens.length; i++) {
			tweens[i].set(1, { duration: 0 });
			colorTweens[i].set(0, { duration: 0 });
		}

		/* Draw each path sequentially */
		for (let i = 0; i < tweens.length; i++) {
			await tweens[i].set(0, { duration: dur });
			colorTweens[i].set(1, { duration: colorDur });
			completedCount = i + 1;
		}

		isAnimating = false;
	}

	function reset(): void {
		if (isAnimating) return;
		for (let i = 0; i < tweens.length; i++) {
			tweens[i].set(1, { duration: 0 });
			colorTweens[i].set(0, { duration: 0 });
		}
		completedCount = 0;
	}

	const progressPct = $derived(
		pathDefs.length > 0 ? Math.round((completedCount / pathDefs.length) * 100) : 0
	);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"  interface LinePath {\n" +
		"    d: string;\n" +
		"    label: string;\n" +
		"    length: number;\n" +
		"    finalColor: string;\n" +
		"  }\n" +
		"\n" +
		"  const pathDefs: Omit\u003cLinePath, 'length'\u003e[] = [\n" +
		"    { d: 'M 20 20 L 280 20 L 280 200 L 20 200 Z', label: 'Outer walls', finalColor: 'oklch(55% 0.15 250)' },\n" +
		"    { d: 'M 150 20 L 150 120', label: 'Living wall', finalColor: 'oklch(60% 0.18 220)' },\n" +
		"    { d: 'M 150 120 L 280 120', label: 'Kitchen wall', finalColor: 'oklch(60% 0.18 220)' },\n" +
		"    { d: 'M 150 120 L 150 200', label: 'Bedroom wall', finalColor: 'oklch(60% 0.18 220)' },\n" +
		"    { d: 'M 20 90 C 35 90, 40 80, 40 70', label: 'Front door', finalColor: 'oklch(65% 0.22 30)' },\n" +
		"    { d: 'M 60 20 L 60 16 L 100 16 L 100 20', label: 'Window N', finalColor: 'oklch(70% 0.15 180)' },\n" +
		"    { d: 'M 280 60 L 284 60 L 284 100 L 280 100', label: 'Window E', finalColor: 'oklch(70% 0.15 180)' },\n" +
		"    { d: 'M 180 125 L 270 125 L 270 145 L 180 145', label: 'Counter', finalColor: 'oklch(70% 0.20 60)' },\n" +
		"    { d: 'M 40 140 L 120 140 L 120 190 L 40 190 Z', label: 'Bed', finalColor: 'oklch(65% 0.18 330)' },\n" +
		"    { d: 'M 180 40 L 250 40 L 250 80 L 180 80 Z', label: 'Table', finalColor: 'oklch(55% 0.12 145)' }\n" +
		"  ];\n" +
		"\n" +
		"  let pathEls: SVGPathElement[] = $state([]);\n" +
		"  let pathLengths: number[] = $state(pathDefs.map(() =\u003e 0));\n" +
		"  let isAnimating = $state(false);\n" +
		"  let completedCount = $state(0);\n" +
		"  let handDrawn = $state(false);\n" +
		"\n" +
		"  const STROKE_DURATION = 500;\n" +
		"  const tweens = pathDefs.map(() =\u003e new Tween(1, { duration: STROKE_DURATION, easing: cubicOut }));\n" +
		"  const colorTweens = pathDefs.map(() =\u003e new Tween(0, { duration: 300, easing: cubicOut }));\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    for (let i = 0; i \u003c pathEls.length; i++) {\n" +
		"      if (pathEls[i]) pathLengths[i] = pathEls[i].getTotalLength();\n" +
		"    }\n" +
		"  });\n" +
		"\n" +
		"  function dashArray(index: number): string {\n" +
		"    const len = pathLengths[index];\n" +
		"    if (!handDrawn || len === 0) return String(len);\n" +
		"    const seg = len / 20;\n" +
		"    const parts: number[] = [];\n" +
		"    let remaining = len;\n" +
		"    while (remaining \u003e 0) {\n" +
		"      const dash = Math.max(seg * (0.7 + Math.random() * 0.6), 1);\n" +
		"      const gap = Math.max(seg * (0.05 + Math.random() * 0.1), 0.5);\n" +
		"      parts.push(Math.min(dash, remaining));\n" +
		"      remaining -= dash;\n" +
		"      if (remaining \u003e 0) {\n" +
		"        parts.push(Math.min(gap, remaining));\n" +
		"        remaining -= gap;\n" +
		"      }\n" +
		"    }\n" +
		"    return parts.map((n) =\u003e n.toFixed(1)).join(' ');\n" +
		"  }\n" +
		"\n" +
		"  async function draw(): Promise\u003cvoid\u003e {\n" +
		"    if (isAnimating) return;\n" +
		"    isAnimating = true;\n" +
		"    completedCount = 0;\n" +
		"    const dur = prefersReducedMotion.current ? 0 : STROKE_DURATION;\n" +
		"    const colorDur = prefersReducedMotion.current ? 0 : 300;\n" +
		"    for (let i = 0; i \u003c tweens.length; i++) {\n" +
		"      tweens[i].set(1, { duration: 0 });\n" +
		"      colorTweens[i].set(0, { duration: 0 });\n" +
		"    }\n" +
		"    for (let i = 0; i \u003c tweens.length; i++) {\n" +
		"      await tweens[i].set(0, { duration: dur });\n" +
		"      colorTweens[i].set(1, { duration: colorDur });\n" +
		"      completedCount = i + 1;\n" +
		"    }\n" +
		"    isAnimating = false;\n" +
		"  }\n" +
		"\n" +
		"  function reset(): void {\n" +
		"    if (isAnimating) return;\n" +
		"    for (let i = 0; i \u003c tweens.length; i++) {\n" +
		"      tweens[i].set(1, { duration: 0 });\n" +
		"      colorTweens[i].set(0, { duration: 0 });\n" +
		"    }\n" +
		"    completedCount = 0;\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.5 — Line Art and Illustration Animation\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003csvg viewBox=\"0 0 300 220\"\u003e\n" +
		"      {#each pathDefs as p, i}\n" +
		"        \u003cpath d={p.d} bind:this={pathEls[i]} fill=\"none\"\n" +
		"          stroke={colorTweens[i].current \u003e 0.5 ? p.finalColor : 'var(--color-text-muted)'}\n" +
		"          stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"\n" +
		"          stroke-dasharray={dashArray(i)}\n" +
		"          stroke-dashoffset={pathLengths[i] * tweens[i].current} /\u003e\n" +
		"      {/each}\n" +
		"    \u003c/svg\u003e\n" +
		"    \u003cdiv class=\"progress-bar\"\u003e\n" +
		"      \u003cdiv class=\"progress-fill\" style:width=\"{progressPct}%\"\u003e\u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>SI.5 — Line Art &amp; Illustration Animation</h1>
	<p class="concept">
		<strong>Concept.</strong> Complex illustrations (maps, architectural blueprints, technical
		diagrams) can be animated by drawing each path sequentially. Assign each path a unique delay
		based on its order. Use <code>getTotalLength()</code> +
		<code>stroke-dasharray</code>/<code>stroke-dashoffset</code> for each path. Add stroke color
		animation along the path (start monochrome, end OKLCH colored). A "hand-drawn" effect adds
		slight <code>dasharray</code> randomization for an organic feel.
	</p>

	<div class="build">
		<div class="btn-row">
			<button type="button" onclick={draw} disabled={isAnimating}>
				{isAnimating ? 'Drawing...' : 'Draw'}
			</button>
			<button type="button" onclick={reset} disabled={isAnimating}>Reset</button>
			<label class="hand-toggle">
				<input type="checkbox" bind:checked={handDrawn} />
				<span>Hand-drawn mode</span>
			</label>
		</div>

		<svg viewBox="0 0 300 220" class="floor-plan" role="img" aria-label="Animated architectural floor plan with 10 sequential path drawings">
			<!-- Room labels (static, faded) -->
			<text x="75" y="75" class="room-label">Bedroom</text>
			<text x="215" y="75" class="room-label">Living</text>
			<text x="215" y="165" class="room-label">Kitchen</text>

			{#each pathDefs as p, i}
				{@const ct = colorTweens[i].current}
				<path
					d={p.d}
					bind:this={pathEls[i]}
					fill="none"
					stroke={ct > 0.5 ? p.finalColor : 'var(--color-text-muted)'}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-dasharray={dashArray(i)}
					stroke-dashoffset={pathLengths[i] * tweens[i].current}
					style="transition: stroke 300ms ease;"
				/>
			{/each}
		</svg>

		<!-- Progress bar -->
		<div class="progress-row">
			<div class="progress-bar">
				<div class="progress-fill" style:width="{progressPct}%"></div>
			</div>
			<span class="progress-text">{completedCount}/{pathDefs.length} paths ({progressPct}%)</span>
		</div>

		<!-- Path legend -->
		<div class="path-legend">
			{#each pathDefs as p, i}
				<span
					class="legend-chip"
					class:completed={completedCount > i}
					style:border-color={p.finalColor}
				>
					{p.label}
				</span>
			{/each}
		</div>

		<p class="chart-note">
			Each path draws after the previous one completes. Toggle "hand-drawn mode" for organic stroke randomization.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Line art animation orchestrates many paths with timing and color. Break individual coordination mechanisms to understand the architecture.</p>
	<ol class="experiments">
		<li><strong>Change <code>await tweens[i].set(0, ...)</code> to <code>tweens[i].set(0, ...)</code> (remove <code>await</code>).</strong> All 10 paths draw simultaneously in a chaotic burst instead of the elegant sequential reveal. This shows that <code>await</code> is the synchronization mechanism for the entire choreography.</li>
		<li><strong>Set <code>handDrawn</code> to <code>true</code> and then change the random multiplier in <code>dashArray</code> from <code>0.6</code> to <code>10</code>.</strong> The strokes become wildly broken with huge gaps, creating an illegible mess. This reveals how subtle the randomization must be to achieve an organic feel without destroying readability.</li>
		<li><strong>Remove the <code>colorTweens[i].set(1, ...)</code> call inside the draw loop.</strong> All paths stay monochrome gray even after drawing completes. The two-layer animation system (stroke reveal + color transition) becomes apparent when you remove the second layer.</li>
		<li><strong>Change <code>STROKE_DURATION</code> from <code>500</code> to <code>50</code>.</strong> Each path draws nearly instantly, and the overall animation feels rushed and mechanical. Experiment with values between 200 and 1000 to find the sweet spot where each path has visual weight.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Sequential path animation uses <code>await</code> on each <code>Tween.set()</code> call to draw paths one after another in a choreographed sequence. After each path completes its stroke reveal, a separate color tween transitions the stroke from monochrome to its final OKLCH color, creating a two-layer animation effect that feels polished and intentional.</p>
	<p class="prose">The hand-drawn effect works by randomizing <code>stroke-dasharray</code> segments to break the mechanical perfection of vector lines. The randomization must be subtle: small enough to create an organic feel, large enough to be perceptible. A progress counter incremented after each path completion drives the progress bar UI, giving users a clear sense of how far through the animation they are.</p>
	<p class="prose">This pattern scales to any illustration regardless of complexity. More paths simply mean a longer sequence; the code structure remains identical. Whether it is a floor plan with 10 paths or a detailed portrait with 200, the architecture does not change.</p>
	<p class="next">Next up: SI.6 builds loading spinners and progress indicators from pure SVG and CSS keyframes.</p>
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
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	.btn-row {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
		align-items: center;
	}
	.btn-row button {
		padding: var(--space-xs) var(--space-md);
		background: var(--color-surface-2);
		color: var(--color-text);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: background var(--dur-fast) var(--ease-out);
	}
	.btn-row button:hover:not(:disabled) {
		background: oklch(55% 0.15 250);
		color: white;
		border-color: oklch(55% 0.15 250);
	}
	.btn-row button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.hand-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
		margin-inline-start: auto;
	}
	.hand-toggle input[type='checkbox'] {
		accent-color: oklch(55% 0.15 250);
	}

	.floor-plan {
		width: 100%;
		max-width: 500px;
		height: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.room-label {
		font-size: 10px;
		fill: var(--color-text-muted);
		text-anchor: middle;
		opacity: 0.3;
		font-weight: 600;
	}

	.progress-row {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.progress-bar {
		flex: 1;
		height: 8px;
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		overflow: hidden;
		border: 1px solid var(--color-border);
	}
	.progress-fill {
		height: 100%;
		background: oklch(55% 0.15 250);
		border-radius: var(--radius-sm);
		transition: width 200ms ease-out;
	}
	.progress-text {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		white-space: nowrap;
	}

	.path-legend {
		display: flex;
		gap: var(--space-xs);
		flex-wrap: wrap;
	}
	.legend-chip {
		font-size: var(--text-xs);
		padding: 2px var(--space-xs);
		border: 1.5px solid;
		border-radius: var(--radius-xs);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
		opacity: 0.5;
		transition: opacity 200ms ease;
	}
	.legend-chip.completed {
		opacity: 1;
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
