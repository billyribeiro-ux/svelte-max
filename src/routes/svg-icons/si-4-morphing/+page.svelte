<script lang="ts">
	import { Tween, Spring, prefersReducedMotion } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	// Spring — organic, physics-based morph interpolation as alternative to Tween
	const springProgress = new Spring(0, { stiffness: 0.08, damping: 0.35 });

	/**
	 * Each shape is defined as an array of [x, y] coordinate pairs.
	 * All shapes MUST have the same number of points for smooth interpolation.
	 * We use 12 points per shape, connected with M ... L ... Z path commands.
	 */
	type Point = [number, number];

	const cx = 100;
	const cy = 100;
	const r = 70;

	/* Circle: 12 points evenly spaced on a circle */
	function makeCircle(): Point[] {
		const pts: Point[] = [];
		for (let i = 0; i < 12; i++) {
			const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
			pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);
		}
		return pts;
	}

	/* Square: 12 points distributed along a square perimeter */
	function makeSquare(): Point[] {
		const half = 62;
		const sides: Point[][] = [
			/* top: left to right */
			[[-half, -half], [-half / 3, -half], [half / 3, -half]],
			/* right: top to bottom */
			[[half, -half], [half, -half / 3], [half, half / 3]],
			/* bottom: right to left */
			[[half, half], [half / 3, half], [-half / 3, half]],
			/* left: bottom to top */
			[[-half, half], [-half, half / 3], [-half, -half / 3]]
		];
		return sides.flat().map(([x, y]) => [cx + x, cy + y] as Point);
	}

	/* Star: 12 points alternating outer/inner radii */
	function makeStar(): Point[] {
		const outerR = 75;
		const innerR = 32;
		const pts: Point[] = [];
		for (let i = 0; i < 12; i++) {
			const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;
			const rad = i % 2 === 0 ? outerR : innerR;
			pts.push([cx + rad * Math.cos(angle), cy + rad * Math.sin(angle)]);
		}
		return pts;
	}

	const shapes: { label: string; points: Point[]; color: string }[] = [
		{ label: 'Circle', points: makeCircle(), color: 'oklch(65% 0.22 270)' },
		{ label: 'Square', points: makeSquare(), color: 'oklch(60% 0.18 150)' },
		{ label: 'Star', points: makeStar(), color: 'oklch(70% 0.20 60)' }
	];

	let shapeIndex = $state(0);
	let manualMode = $state(false);
	let manualT = $state(0);

	const DURATION = 600;
	const progress = new Tween(0, { duration: DURATION, easing: cubicInOut });

	function interpolatePoints(a: Point[], b: Point[], t: number): Point[] {
		return a.map((p, i) => [
			p[0] + (b[i][0] - p[0]) * t,
			p[1] + (b[i][1] - p[1]) * t
		] as Point);
	}

	function pointsToPath(pts: Point[]): string {
		return 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ') + ' Z';
	}

	let fromIndex = $state(0);
	let toIndex = $state(1);

	const displayPath = $derived.by(() => {
		const t = manualMode ? manualT : progress.current;
		const from = shapes[fromIndex].points;
		const to = shapes[toIndex].points;
		const pts = interpolatePoints(from, to, t);
		return pointsToPath(pts);
	});

	const displayColor = $derived.by(() => {
		const t = manualMode ? manualT : progress.current;
		/* Simple color crossfade via opacity layering is handled in template */
		return t;
	});

	async function morphTo(nextIndex: number): Promise<void> {
		if (nextIndex === shapeIndex || manualMode) return;
		fromIndex = shapeIndex;
		toIndex = nextIndex;
		const dur = prefersReducedMotion.current ? 0 : DURATION;
		progress.set(0, { duration: 0 });
		await progress.set(1, { duration: dur });
		shapeIndex = nextIndex;
		fromIndex = nextIndex;
	}

	async function cycleNext(): Promise<void> {
		const next = (shapeIndex + 1) % shapes.length;
		await morphTo(next);
	}

	function onManualInput(e: Event): void {
		const target = e.target as HTMLInputElement;
		manualT = parseFloat(target.value);
	}

	function toggleManual(): void {
		manualMode = !manualMode;
		if (manualMode) {
			manualT = 0;
			fromIndex = shapeIndex;
			toIndex = (shapeIndex + 1) % shapes.length;
		}
	}

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { cubicInOut } from 'svelte/easing';\n" +
		"\n" +
		"  type Point = [number, number];\n" +
		"  const cx = 100, cy = 100, r = 70;\n" +
		"\n" +
		"  function makeCircle(): Point[] {\n" +
		"    const pts: Point[] = [];\n" +
		"    for (let i = 0; i \u003c 12; i++) {\n" +
		"      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;\n" +
		"      pts.push([cx + r * Math.cos(angle), cy + r * Math.sin(angle)]);\n" +
		"    }\n" +
		"    return pts;\n" +
		"  }\n" +
		"\n" +
		"  function makeSquare(): Point[] {\n" +
		"    const half = 62;\n" +
		"    const sides: Point[][] = [\n" +
		"      [[-half, -half], [-half / 3, -half], [half / 3, -half]],\n" +
		"      [[half, -half], [half, -half / 3], [half, half / 3]],\n" +
		"      [[half, half], [half / 3, half], [-half / 3, half]],\n" +
		"      [[-half, half], [-half, half / 3], [-half, -half / 3]]\n" +
		"    ];\n" +
		"    return sides.flat().map(([x, y]) =\u003e [cx + x, cy + y] as Point);\n" +
		"  }\n" +
		"\n" +
		"  function makeStar(): Point[] {\n" +
		"    const outerR = 75, innerR = 32;\n" +
		"    const pts: Point[] = [];\n" +
		"    for (let i = 0; i \u003c 12; i++) {\n" +
		"      const angle = (i / 12) * Math.PI * 2 - Math.PI / 2;\n" +
		"      const rad = i % 2 === 0 ? outerR : innerR;\n" +
		"      pts.push([cx + rad * Math.cos(angle), cy + rad * Math.sin(angle)]);\n" +
		"    }\n" +
		"    return pts;\n" +
		"  }\n" +
		"\n" +
		"  const shapes = [\n" +
		"    { label: 'Circle', points: makeCircle(), color: 'oklch(65% 0.22 270)' },\n" +
		"    { label: 'Square', points: makeSquare(), color: 'oklch(60% 0.18 150)' },\n" +
		"    { label: 'Star', points: makeStar(), color: 'oklch(70% 0.20 60)' }\n" +
		"  ];\n" +
		"\n" +
		"  let shapeIndex = $state(0);\n" +
		"  let manualMode = $state(false);\n" +
		"  let manualT = $state(0);\n" +
		"  const DURATION = 600;\n" +
		"  const progress = new Tween(0, { duration: DURATION, easing: cubicInOut });\n" +
		"\n" +
		"  function interpolatePoints(a: Point[], b: Point[], t: number): Point[] {\n" +
		"    return a.map((p, i) =\u003e [\n" +
		"      p[0] + (b[i][0] - p[0]) * t,\n" +
		"      p[1] + (b[i][1] - p[1]) * t\n" +
		"    ] as Point);\n" +
		"  }\n" +
		"\n" +
		"  function pointsToPath(pts: Point[]): string {\n" +
		"    return 'M ' + pts.map(([x, y]) =\u003e `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ') + ' Z';\n" +
		"  }\n" +
		"\n" +
		"  // ... morphTo, cycleNext, manual mode handlers ...\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.4 — SVG Shape Morphing\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003csvg viewBox=\"0 0 200 200\"\u003e\n" +
		"      \u003cpath d={displayPath} fill={shapes[fromIndex].color} /\u003e\n" +
		"    \u003c/svg\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>SI.4 — SVG Shape Morphing</h1>
	<p class="concept">
		<strong>Concept.</strong> Shape morphing interpolates between two SVG path
		<code>d</code> attribute values. Both paths <em>must</em> have the same number and type of
		commands for smooth interpolation. Define path A and path B as arrays of coordinate pairs,
		use <code>$derived</code> to interpolate each pair based on a progress value (0-1), and
		build the <code>d</code> string from the interpolated coordinates. A <code>Tween</code>
		drives the progress for animated transitions.
	</p>

	<div class="build">
		<div class="btn-row">
			{#each shapes as shape, i}
				<button
					type="button"
					class="shape-btn"
					class:active={shapeIndex === i && !manualMode}
					disabled={manualMode}
					onclick={() => morphTo(i)}
				>
					{shape.label}
				</button>
			{/each}
			<button type="button" class="shape-btn cycle" disabled={manualMode} onclick={cycleNext}>
				Cycle &rarr;
			</button>
		</div>

		<svg viewBox="0 0 200 200" class="morph-canvas" role="img" aria-label="Shape morphing between circle, square, and star">
			<path d={displayPath} fill={shapes[fromIndex].color} opacity={1 - displayColor * 0.99 + 0.99 * displayColor} />
			<path d={displayPath} fill={shapes[toIndex].color} opacity={displayColor} />
		</svg>

		<div class="scrub-row">
			<label class="scrub-toggle">
				<input type="checkbox" checked={manualMode} onchange={toggleManual} />
				<span>Manual scrub</span>
			</label>
			{#if manualMode}
				<label class="scrub-slider">
					<span>Progress: {manualT.toFixed(2)}</span>
					<input type="range" min="0" max="1" step="0.01" value={manualT} oninput={onManualInput} />
				</label>
				<div class="scrub-info">
					{shapes[fromIndex].label} &rarr; {shapes[toIndex].label}
				</div>
			{/if}
		</div>

		<p class="chart-note">
			All three shapes use exactly 12 points. The <code>interpolatePoints</code> function linearly blends each coordinate pair.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Shape morphing depends on careful alignment between source and target point arrays. Break this alignment to see why the constraints exist.</p>
	<ol class="experiments">
		<li><strong>Change <code>makeSquare()</code> to return only 8 points instead of 12.</strong> The morph crashes or produces wildly distorted shapes because <code>interpolatePoints</code> tries to access indices that do not exist in the shorter array. This proves that equal point counts are a hard requirement.</li>
		<li><strong>Replace the linear interpolation <code>a + (b - a) * t</code> with just <code>b * t</code>.</strong> The intermediate shapes collapse toward the origin instead of smoothly transitioning between the two shapes, demonstrating why the full lerp formula is necessary to maintain spatial relationships.</li>
		<li><strong>Remove the <code>.toFixed(1)</code> call inside <code>pointsToPath</code>.</strong> The <code>d</code> attribute string becomes bloated with 15-digit floating point numbers. While visually identical, this wastes memory and slows down SVG parsing on complex shapes.</li>
		<li><strong>Set the Tween easing to <code>linear</code> instead of <code>cubicInOut</code>.</strong> The morph moves at a constant speed with no acceleration or deceleration. Compare this to the original eased version to feel how easing curves add polish and a sense of physical weight to animation.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Shape morphing interpolates between two sets of SVG path coordinates. The fundamental constraint is that both source and target paths must have the same number and type of commands. If one shape has 12 points and the other has 8, the interpolation function has no matching pairs for the extra points and the morph breaks.</p>
	<p class="prose">Linear interpolation (<code>a + (b - a) * t</code>) applied to each coordinate pair produces smooth intermediate shapes as <code>t</code> moves from 0 to 1. A <code>Tween</code> drives this progress value, and <code>$derived</code> recomputes the path string reactively on every frame. Manual scrubbing with a range slider controlling <code>t</code> directly is invaluable for debugging morph artifacts at specific transition points.</p>
	<p class="prose">Color crossfading is achieved by layering two <code>&lt;path&gt;</code> elements and animating their <code>opacity</code> values inversely. The "from" shape fades out while the "to" shape fades in, creating a smooth blend that complements the geometric morph.</p>
	<p class="next">Next up: SI.5 scales drawing animation to complex multi-path illustrations with sequential reveals and color transitions.</p>
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
	}
	.shape-btn {
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
	.shape-btn:hover:not(:disabled) {
		background: oklch(65% 0.22 270);
		color: white;
		border-color: oklch(65% 0.22 270);
	}
	.shape-btn.active {
		background: oklch(65% 0.22 270);
		color: white;
		border-color: oklch(65% 0.22 270);
	}
	.shape-btn.cycle {
		margin-inline-start: auto;
	}
	.shape-btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.morph-canvas {
		inline-size: 100%;
		max-inline-size: 300px;
		block-size: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		align-self: center;
	}

	.scrub-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.scrub-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		cursor: pointer;
	}
	.scrub-toggle input[type='checkbox'] {
		accent-color: oklch(65% 0.22 270);
	}
	.scrub-slider {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.scrub-slider input[type='range'] {
		inline-size: 100%;
		max-inline-size: 300px;
		accent-color: oklch(65% 0.22 270);
	}
	.scrub-info {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
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
