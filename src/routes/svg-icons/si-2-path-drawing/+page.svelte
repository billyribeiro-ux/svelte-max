<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface PathInfo {
		d: string;
		color: string;
		label: string;
		length: number;
	}

	/* Stylized geometric logo paths (a hexagonal "S" shape in 4 strokes) */
	const pathDefs: Omit<PathInfo, 'length'>[] = [
		{ d: 'M 30 20 C 30 20, 80 5, 120 20 C 160 35, 170 60, 150 80', color: 'oklch(65% 0.22 270)', label: 'Stroke 1' },
		{ d: 'M 150 80 C 130 100, 80 110, 50 100', color: 'oklch(60% 0.20 150)', label: 'Stroke 2' },
		{ d: 'M 50 100 C 20 90, 30 130, 60 145 C 90 160, 140 155, 170 140', color: 'oklch(70% 0.18 60)', label: 'Stroke 3' },
		{ d: 'M 170 140 C 200 125, 180 170, 140 180 C 100 190, 50 180, 30 165', color: 'oklch(55% 0.20 330)', label: 'Stroke 4' }
	];

	let pathEls: SVGPathElement[] = $state([]);
	let pathLengths: number[] = $state([0, 0, 0, 0]);
	let isDrawn = $state(false);
	let isAnimating = $state(false);

	const DURATION = 800;

	const tweens = pathDefs.map(() => new Tween(1, { duration: DURATION, easing: cubicInOut }));

	$effect(() => {
		for (let i = 0; i < pathEls.length; i++) {
			if (pathEls[i]) {
				pathLengths[i] = pathEls[i].getTotalLength();
			}
		}
	});

	async function draw(): Promise<void> {
		if (isAnimating) return;
		isAnimating = true;
		const dur = prefersReducedMotion.current ? 0 : DURATION;

		for (let i = 0; i < tweens.length; i++) {
			tweens[i].set(1, { duration: 0 });
		}

		for (let i = 0; i < tweens.length; i++) {
			await tweens[i].set(0, { duration: dur });
		}

		isDrawn = true;
		isAnimating = false;
	}

	function reset(): void {
		if (isAnimating) return;
		for (const t of tweens) {
			t.set(1, { duration: 0 });
		}
		isDrawn = false;
	}

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { cubicInOut } from 'svelte/easing';\n" +
		"\n" +
		"  interface PathInfo {\n" +
		"    d: string;\n" +
		"    color: string;\n" +
		"    label: string;\n" +
		"    length: number;\n" +
		"  }\n" +
		"\n" +
		"  const pathDefs: Omit\u003cPathInfo, 'length'\u003e[] = [\n" +
		"    { d: 'M 30 20 C 30 20, 80 5, 120 20 C 160 35, 170 60, 150 80', color: 'oklch(65% 0.22 270)', label: 'Stroke 1' },\n" +
		"    { d: 'M 150 80 C 130 100, 80 110, 50 100', color: 'oklch(60% 0.20 150)', label: 'Stroke 2' },\n" +
		"    { d: 'M 50 100 C 20 90, 30 130, 60 145 C 90 160, 140 155, 170 140', color: 'oklch(70% 0.18 60)', label: 'Stroke 3' },\n" +
		"    { d: 'M 170 140 C 200 125, 180 170, 140 180 C 100 190, 50 180, 30 165', color: 'oklch(55% 0.20 330)', label: 'Stroke 4' }\n" +
		"  ];\n" +
		"\n" +
		"  let pathEls: SVGPathElement[] = $state([]);\n" +
		"  let pathLengths: number[] = $state([0, 0, 0, 0]);\n" +
		"  let isDrawn = $state(false);\n" +
		"  let isAnimating = $state(false);\n" +
		"\n" +
		"  const DURATION = 800;\n" +
		"  const tweens = pathDefs.map(() =\u003e new Tween(1, { duration: DURATION, easing: cubicInOut }));\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    for (let i = 0; i \u003c pathEls.length; i++) {\n" +
		"      if (pathEls[i]) {\n" +
		"        pathLengths[i] = pathEls[i].getTotalLength();\n" +
		"      }\n" +
		"    }\n" +
		"  });\n" +
		"\n" +
		"  async function draw(): Promise\u003cvoid\u003e {\n" +
		"    if (isAnimating) return;\n" +
		"    isAnimating = true;\n" +
		"    const dur = prefersReducedMotion.current ? 0 : DURATION;\n" +
		"    for (let i = 0; i \u003c tweens.length; i++) {\n" +
		"      tweens[i].set(1, { duration: 0 });\n" +
		"    }\n" +
		"    for (let i = 0; i \u003c tweens.length; i++) {\n" +
		"      await tweens[i].set(0, { duration: dur });\n" +
		"    }\n" +
		"    isDrawn = true;\n" +
		"    isAnimating = false;\n" +
		"  }\n" +
		"\n" +
		"  function reset(): void {\n" +
		"    if (isAnimating) return;\n" +
		"    for (const t of tweens) {\n" +
		"      t.set(1, { duration: 0 });\n" +
		"    }\n" +
		"    isDrawn = false;\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.2 — Path Drawing Animation\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Set stroke-dasharray equal to the path's total\n" +
		"    length, then animate stroke-dashoffset from full length to 0. The path\n" +
		"    appears to draw itself. Use bind:this + getTotalLength() in $effect,\n" +
		"    and Tween from svelte/motion for smooth interpolation.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"btn-row\"\u003e\n" +
		"      \u003cbutton onclick={draw} disabled={isAnimating}\u003eDraw\u003c/button\u003e\n" +
		"      \u003cbutton onclick={reset} disabled={isAnimating}\u003eReset\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003csvg viewBox=\"0 0 200 200\" class=\"drawing\"\u003e\n" +
		"      {#each pathDefs as p, i}\n" +
		"        \u003cpath\n" +
		"          d={p.d}\n" +
		"          bind:this={pathEls[i]}\n" +
		"          fill=\"none\"\n" +
		"          stroke={p.color}\n" +
		"          stroke-width=\"3\"\n" +
		"          stroke-linecap=\"round\"\n" +
		"          stroke-dasharray={pathLengths[i]}\n" +
		"          stroke-dashoffset={pathLengths[i] * tweens[i].current}\n" +
		"        /\u003e\n" +
		"      {/each}\n" +
		"    \u003c/svg\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"lengths\"\u003e\n" +
		"      {#each pathDefs as p, i}\n" +
		"        \u003cspan class=\"length-badge\" style:border-color={p.color}\u003e\n" +
		"          {p.label}: {pathLengths[i].toFixed(1)}px\n" +
		"        \u003c/span\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
	<h1>SI.2 — Path Drawing Animation</h1>
	<p class="concept">
		<strong>Concept.</strong> The classic SVG animation technique: set
		<code>stroke-dasharray</code> equal to the path's total length, then animate
		<code>stroke-dashoffset</code> from full length to 0. The path appears to "draw" itself. In
		Svelte: use <code>bind:this</code> to get the path element, call
		<code>getTotalLength()</code> in <code>$effect</code>, store the length in
		<code>$state</code>, and drive <code>stroke-dashoffset</code> with a
		<code>Tween</code> from <code>svelte/motion</code>. Respect
		<code>prefersReducedMotion</code> to skip animation when the user requests it.
	</p>

	<div class="build">
		<div class="btn-row">
			<button type="button" onclick={draw} disabled={isAnimating}>
				{isAnimating ? 'Drawing...' : 'Draw'}
			</button>
			<button type="button" onclick={reset} disabled={isAnimating}>Reset</button>
		</div>

		<svg viewBox="0 0 200 200" class="drawing" role="img" aria-label="Logo-style SVG with staggered path drawing animation">
			{#each pathDefs as p, i (p)}
				<path
					d={p.d}
					bind:this={pathEls[i]}
					fill="none"
					stroke={p.color}
					stroke-width="3"
					stroke-linecap="round"
					stroke-dasharray={pathLengths[i]}
					stroke-dashoffset={pathLengths[i] * tweens[i].current}
				/>
			{/each}
		</svg>

		<div class="lengths">
			{#each pathDefs as p, i (p)}
				<span class="length-badge" style:border-color={p.color}>
					{p.label}: {pathLengths[i].toFixed(1)}px
				</span>
			{/each}
		</div>

		<p class="chart-note">
			Each path draws sequentially using staggered <code>Tween</code> animations. The badge shows each path's <code>getTotalLength()</code> value.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Path drawing animation relies on a precise relationship between <code>stroke-dasharray</code> and <code>stroke-dashoffset</code>. Break that relationship to see exactly why each piece matters.</p>
	<ol class="experiments">
		<li><strong>Set <code>stroke-dasharray</code> to a fixed value like <code>50</code> instead of <code>pathLengths[i]</code>.</strong> The path draws in choppy segments rather than one continuous stroke, revealing that dasharray must equal the full path length for a clean reveal effect.</li>
		<li><strong>Remove the <code>await</code> keyword before <code>tweens[i].set(0, ...)</code> in the draw function.</strong> All four paths animate simultaneously instead of sequentially, proving that <code>await</code> on <code>Tween.set()</code> is what creates the staggered effect.</li>
		<li><strong>Change <code>stroke-linecap</code> from <code>"round"</code> to <code>"butt"</code>.</strong> The ends of each stroke become flat and sharp instead of rounded, showing how linecap affects the visual quality of drawing animations.</li>
		<li><strong>Replace <code>prefersReducedMotion.current ? 0 : DURATION</code> with just <code>DURATION</code>.</strong> The animation ignores the user's motion preference. This demonstrates why the reduced-motion guard is essential for accessibility.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>stroke-dasharray</code> plus <code>stroke-dashoffset</code> technique is the foundational SVG drawing animation. By setting dasharray equal to the path's total length and then tweening dashoffset from that length down to zero, the stroke progressively reveals itself as if being drawn by an invisible pen.</p>
	<p class="prose">Svelte's <code>bind:this</code> gives you a reference to each <code>&lt;path&gt;</code> element so you can call <code>getTotalLength()</code> inside an <code>$effect</code>. Each path needs its own <code>Tween</code> instance because <code>Tween.set()</code> returns a promise, enabling sequential animation with <code>await</code>. This one-tween-per-value pattern is idiomatic Svelte 5.</p>
	<p class="prose">Accessibility is non-negotiable: <code>prefersReducedMotion.current</code> lets you set the duration to zero so users who prefer reduced motion see the final state instantly without any animation.</p>
	<p class="next">Next up: SI.3 builds a system of animated icons that toggle between states using CSS transitions on SVG properties.</p>
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
		background: oklch(65% 0.22 270);
		color: white;
		border-color: oklch(65% 0.22 270);
	}
	.btn-row button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.drawing {
		inline-size: 100%;
		max-inline-size: 400px;
		block-size: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}

	.lengths {
		display: flex;
		gap: var(--space-sm);
		flex-wrap: wrap;
	}
	.length-badge {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		padding: var(--space-xs) var(--space-sm);
		border: 2px solid;
		border-radius: var(--radius-sm);
		color: var(--color-text-muted);
		background: var(--color-surface-2);
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
