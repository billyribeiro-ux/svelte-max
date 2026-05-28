<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import { onMount } from 'svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Frame rate tracking ── */
	let fps = $state(0);
	let fpsRafId = $state(0);
	let lastFrameTime = $state(0);
	let frameCount = $state(0);
	let fpsAccum = $state(0);

	/* ── Demo toggle ── */
	let showBefore = $state(true);
	let showAfter = $state(true);

	const reducedMotion = $derived(prefersReducedMotion.current);

	/* ── Generate circle positions ── */
	const circleCount = 50;
	const circles: { cx: number; cy: number; r: number; delay: number }[] = Array.from(
		{ length: circleCount },
		(_, i) => ({
			cx: 10 + (i % 10) * 28,
			cy: 10 + Math.floor(i / 10) * 28,
			r: 4 + Math.random() * 6,
			delay: i * 40
		})
	);

	/* ── FPS counter ── */
	function measureFps(timestamp: number): void {
		frameCount++;
		fpsAccum += timestamp - lastFrameTime;
		lastFrameTime = timestamp;
		if (fpsAccum >= 1000) {
			fps = Math.round((frameCount * 1000) / fpsAccum);
			frameCount = 0;
			fpsAccum = 0;
		}
		fpsRafId = requestAnimationFrame(measureFps);
	}

	onMount(() => {
		lastFrameTime = performance.now();
		fpsRafId = requestAnimationFrame(measureFps);
		return () => cancelAnimationFrame(fpsRafId);
	});

	/* ── A11y audit items ── */
	interface AuditItem {
		label: string;
		status: 'pass' | 'warn';
		detail: string;
	}

	const auditItems: AuditItem[] = [
		{ label: 'Decorative SVGs use aria-hidden="true"', status: 'pass', detail: 'The before/after demo SVGs are decorative.' },
		{ label: 'Meaningful SVGs have <title> + <desc>', status: 'pass', detail: 'The world map in SI.8 includes both elements.' },
		{ label: 'Animated icons have role="img" + aria-label', status: 'pass', detail: 'All spinner SVGs in SI.6 use role="img".' },
		{ label: 'Motion respects prefersReducedMotion', status: 'pass', detail: 'All lessons gate animation behind the media query.' },
		{ label: 'will-change used sparingly', status: 'warn', detail: 'Only apply to elements currently animating, then remove.' },
		{ label: 'No filter animations on many elements', status: 'pass', detail: 'The "After" demo replaces blur with composite-only props.' }
	];

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { onMount } from 'svelte';\n" +
		"\n" +
		"  let fps = $state(0);\n" +
		"  let showBefore = $state(true);\n" +
		"  let showAfter = $state(true);\n" +
		"  const reducedMotion = $derived(prefersReducedMotion.current);\n" +
		"\n" +
		"  const circleCount = 50;\n" +
		"  const circles = Array.from({ length: circleCount }, (_, i) =\u003e ({\n" +
		"    cx: 10 + (i % 10) * 28,\n" +
		"    cy: 10 + Math.floor(i / 10) * 28,\n" +
		"    r: 4 + Math.random() * 6,\n" +
		"    delay: i * 40\n" +
		"  }));\n" +
		"\n" +
		"  /* FPS counter using rAF delta tracking */\n" +
		"  function measureFps(timestamp: number): void { /* ... */ }\n" +
		"\n" +
		"  interface AuditItem {\n" +
		"    label: string;\n" +
		"    status: 'pass' | 'warn';\n" +
		"    detail: string;\n" +
		"  }\n" +
		"\n" +
		"  const auditItems: AuditItem[] = [\n" +
		"    { label: 'Decorative SVGs use aria-hidden', status: 'pass', detail: '...' },\n" +
		"    // ...\n" +
		"  ];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.10 — SVG Animation Performance & Accessibility\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003c!-- Before/After comparison with FPS counter --\u003e\n" +
		"    \u003c!-- Accessibility audit checklist --\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.10 — SVG Animation Performance &amp; Accessibility</h1>
	<p class="concept">
		<strong>Concept.</strong> SVG animations can cause performance issues — too many animated
		elements, expensive filters, forced repaints. Best practices: use
		<code>will-change: transform</code> on animated groups, prefer <code>transform</code> and
		<code>opacity</code> (composite-only properties), avoid animating <code>d</code> or
		<code>filter</code> on many elements every frame. Accessibility: decorative SVGs get
		<code>aria-hidden="true"</code>, meaningful SVGs get <code>&lt;title&gt;</code> +
		<code>&lt;desc&gt;</code>, animated icons need <code>role="img"</code> +
		<code>aria-label</code>, and all motion respects <code>prefersReducedMotion</code>.
	</p>

	<div class="build">
		<div class="fps-badge">
			<span class="fps-number">{fps}</span>
			<span class="fps-label">FPS</span>
		</div>

		<div class="comparison-row">
			<!-- BEFORE: expensive filter animation -->
			<div class="comparison-panel">
				<div class="panel-header">
					<h4>Before (filter: blur)</h4>
					<label class="panel-toggle">
						<input type="checkbox" bind:checked={showBefore} />
						<span>Run</span>
					</label>
				</div>
				<svg viewBox="0 0 280 150" class="perf-svg" aria-hidden="true">
					{#each circles as c (c)}
						{#if showBefore && !reducedMotion}
							<circle
								cx={c.cx}
								cy={c.cy}
								r={c.r}
								fill="oklch(60% 0.20 15 / 0.7)"
								class="circle-before"
								style:animation-delay="{c.delay}ms"
							/>
						{:else}
							<circle cx={c.cx} cy={c.cy} r={c.r} fill="oklch(60% 0.20 15 / 0.7)" />
						{/if}
					{/each}
				</svg>
				<p class="perf-note">
					50 circles animating with <code>filter: blur()</code> — forces raster repaint every frame.
				</p>
			</div>

			<!-- AFTER: composite-only properties -->
			<div class="comparison-panel">
				<div class="panel-header">
					<h4>After (transform + opacity)</h4>
					<label class="panel-toggle">
						<input type="checkbox" bind:checked={showAfter} />
						<span>Run</span>
					</label>
				</div>
				<svg viewBox="0 0 280 150" class="perf-svg" aria-hidden="true">
					{#each circles as c (c)}
						{#if showAfter && !reducedMotion}
							<circle
								cx={c.cx}
								cy={c.cy}
								r={c.r}
								fill="oklch(60% 0.20 150 / 0.7)"
								class="circle-after"
								style:animation-delay="{c.delay}ms"
							/>
						{:else}
							<circle cx={c.cx} cy={c.cy} r={c.r} fill="oklch(60% 0.20 150 / 0.7)" />
						{/if}
					{/each}
				</svg>
				<p class="perf-note">
					Same animation using <code>transform</code> + <code>opacity</code> — runs on compositor, no repaint.
				</p>
			</div>
		</div>

		<div class="perf-tips">
			<h4>Performance rules</h4>
			<ol>
				<li>Prefer <code>transform</code> and <code>opacity</code> — they run on the GPU compositor thread.</li>
				<li>Avoid animating <code>filter</code>, <code>clip-path</code>, or path <code>d</code> on many elements.</li>
				<li>Use <code>will-change: transform</code> only on elements that are <em>about</em> to animate, then remove it.</li>
				<li>Batch SVG updates — don't trigger layout between reads and writes.</li>
			</ol>
		</div>
	</div>

	<!-- Accessibility Audit -->
	<div class="build">
		<h4>Accessibility audit</h4>
		<div class="audit-list">
			{#each auditItems as item (item)}
				<div class="audit-item" class:warn={item.status === 'warn'}>
					<span class="audit-icon">{item.status === 'pass' ? '\u2713' : '\u26A0'}</span>
					<div class="audit-content">
						<span class="audit-label">{item.label}</span>
						<span class="audit-detail">{item.detail}</span>
					</div>
				</div>
			{/each}
		</div>

		<div class="a11y-summary">
			<h4>Key accessibility patterns</h4>
			<ul class="a11y-rules">
				<li>Decorative SVG &rarr; <code>aria-hidden="true"</code></li>
				<li>Meaningful SVG &rarr; <code>role="img"</code> + <code>aria-label</code> (or <code>&lt;title&gt;</code> + <code>&lt;desc&gt;</code>)</li>
				<li>All motion &rarr; respect <code>prefersReducedMotion</code></li>
				<li>Interactive SVG elements &rarr; <code>tabindex="0"</code> + keyboard handlers</li>
			</ul>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Performance and accessibility are constraints that are easy to violate. Break each rule intentionally to measure the impact with real numbers.</p>
	<ol class="experiments">
		<li><strong>Add <code>filter: blur(3px)</code> to the "After" circles animation instead of just <code>transform</code> and <code>opacity</code>.</strong> Watch the FPS counter drop as both panels now force raster repaints. The performance difference between composite-only and filter-based animation becomes measurable in real time.</li>
		<li><strong>Add <code>will-change: transform</code> to every circle in both panels (100 total).</strong> Open your browser's DevTools memory tab and observe the spike. Each <code>will-change</code> declaration creates a new compositor layer, and 100 layers consume significant GPU memory for zero benefit.</li>
		<li><strong>Remove <code>aria-hidden="true"</code> from both demo SVGs.</strong> Run a screen reader or accessibility audit. The decorative circles are now announced as content, cluttering the accessibility tree with meaningless elements.</li>
		<li><strong>Disable the <code>reducedMotion</code> check so both panels always animate.</strong> Enable "Reduce motion" in your OS accessibility settings and reload. The circles animate despite the user's explicit preference, violating a core accessibility contract.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Animating <code>filter: blur()</code> on many SVG elements forces expensive raster repaints on every frame because the browser must re-rasterize the filtered output. The alternative is to use <code>transform</code> and <code>opacity</code> exclusively; these properties run on the GPU compositor thread without triggering layout or paint, delivering smooth 60fps animation even with dozens of elements.</p>
	<p class="prose">The <code>will-change</code> property promotes an element to its own compositor layer, which is beneficial for elements that are about to animate. However, applying it permanently or to many elements simultaneously bloats GPU memory. The correct pattern is to add <code>will-change</code> just before animation starts and remove it when the animation completes.</p>
	<p class="prose">Decorative SVGs must have <code>aria-hidden="true"</code> to keep them out of the accessibility tree. Meaningful SVGs need <code>&lt;title&gt;</code>, <code>&lt;desc&gt;</code>, and <code>role="img"</code>. Every animated SVG in a production application must respect <code>prefersReducedMotion</code> by either skipping the animation entirely or showing a static equivalent state.</p>
	<p class="next">You have completed the SVG Icons module. Next: the Apex Charts module applies these principles to data visualization with a third-party charting library.</p>
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
	h4 {
		margin: 0;
		font-size: var(--text-base);
	}
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }

	/* ── FPS badge ── */
	.fps-badge {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
		align-self: flex-end;
	}
	.fps-number {
		font-family: var(--font-mono);
		font-size: var(--text-2xl);
		font-weight: 700;
		color: var(--color-text);
	}
	.fps-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	/* ── Comparison layout ── */
	.comparison-row {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.comparison-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.panel-header h4 {
		font-size: var(--text-sm);
		font-weight: 700;
	}
	.panel-toggle {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		cursor: pointer;
	}
	.panel-toggle input[type='checkbox'] {
		accent-color: oklch(65% 0.22 270);
	}
	.perf-svg {
		inline-size: 100%;
		max-inline-size: 300px;
		block-size: auto;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.perf-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		margin: 0;
	}

	/* ── Before: expensive filter animation ── */
	.circle-before {
		animation: jank-anim 1.5s ease-in-out infinite alternate;
	}
	@keyframes jank-anim {
		0% {
			filter: blur(0px);
			transform: scale(1);
		}
		100% {
			filter: blur(3px);
			transform: scale(1.3);
		}
	}

	/* ── After: composite-only animation ── */
	.circle-after {
		will-change: transform, opacity;
		animation: smooth-anim 1.5s ease-in-out infinite alternate;
	}
	@keyframes smooth-anim {
		0% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1.3);
			opacity: 0.5;
		}
	}

	/* ── Performance tips ── */
	.perf-tips {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.perf-tips ol {
		list-style: decimal;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
		font-size: var(--text-sm);
	}

	/* ── Audit list ── */
	.audit-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.audit-item {
		display: flex;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		border-inline-start: 3px solid oklch(65% 0.22 150);
	}
	.audit-item.warn {
		border-inline-start-color: oklch(70% 0.18 85);
	}
	.audit-icon {
		font-size: var(--text-base);
		line-height: 1;
		flex-shrink: 0;
	}
	.audit-content {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.audit-label {
		font-size: var(--text-sm);
		color: var(--color-text);
		font-weight: 600;
	}
	.audit-detail {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	/* ── A11y summary ── */
	.a11y-summary {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.a11y-rules {
		font-size: var(--text-sm);
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
		.comparison-row { grid-template-columns: 1fr 1fr; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
