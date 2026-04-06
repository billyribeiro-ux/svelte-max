<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let progressValue = $state(42);

	const progressTween = new Tween(42, { duration: 400, easing: cubicOut });

	$effect(() => {
		const dur = prefersReducedMotion.current ? 0 : 400;
		progressTween.set(progressValue, { duration: dur });
	});

	const reducedMotion = $derived(prefersReducedMotion.current);

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { Tween, prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { cubicOut } from 'svelte/easing';\n" +
		"\n" +
		"  let progressValue = $state(42);\n" +
		"  const progressTween = new Tween(42, { duration: 400, easing: cubicOut });\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    const dur = prefersReducedMotion.current ? 0 : 400;\n" +
		"    progressTween.set(progressValue, { duration: dur });\n" +
		"  });\n" +
		"\n" +
		"  const reducedMotion = $derived(prefersReducedMotion.current);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.6 — Loading Spinners & Progress\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cdiv class=\"spinner-grid\"\u003e\n" +
		"      \u003c!-- 1. Circular spinner --\u003e\n" +
		"      \u003cdiv class=\"spinner-card\"\u003e\n" +
		"        \u003csvg viewBox=\"0 0 50 50\" class=\"spinner-svg\" role=\"img\"\n" +
		"          aria-label=\"Circular loading spinner\"\u003e\n" +
		"          \u003ccircle cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\"\n" +
		"            stroke=\"oklch(70% 0.03 270)\" stroke-width=\"4\" /\u003e\n" +
		"          \u003ccircle cx=\"25\" cy=\"25\" r=\"20\" fill=\"none\"\n" +
		"            stroke=\"oklch(65% 0.22 270)\" stroke-width=\"4\"\n" +
		"            stroke-dasharray=\"80 126\" stroke-linecap=\"round\"\n" +
		"            class=\"spinner-ring\" /\u003e\n" +
		"        \u003c/svg\u003e\n" +
		"        \u003cspan class=\"spinner-label\"\u003eCircular\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- 2. Dots pulse --\u003e\n" +
		"      \u003cdiv class=\"spinner-card\"\u003e\n" +
		"        \u003csvg viewBox=\"0 0 60 20\" class=\"dots-svg\" role=\"img\"\n" +
		"          aria-label=\"Pulsing dots loader\"\u003e\n" +
		"          \u003ccircle cx=\"10\" cy=\"10\" r=\"5\" fill=\"oklch(65% 0.22 270)\"\n" +
		"            class=\"dot dot-1\" /\u003e\n" +
		"          \u003ccircle cx=\"30\" cy=\"10\" r=\"5\" fill=\"oklch(65% 0.22 270)\"\n" +
		"            class=\"dot dot-2\" /\u003e\n" +
		"          \u003ccircle cx=\"50\" cy=\"10\" r=\"5\" fill=\"oklch(65% 0.22 270)\"\n" +
		"            class=\"dot dot-3\" /\u003e\n" +
		"        \u003c/svg\u003e\n" +
		"        \u003cspan class=\"spinner-label\"\u003eDots Pulse\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- 3. Skeleton shimmer --\u003e\n" +
		"      \u003cdiv class=\"spinner-card\"\u003e\n" +
		"        \u003csvg viewBox=\"0 0 120 60\" class=\"skeleton-svg\" role=\"img\"\n" +
		"          aria-label=\"Skeleton shimmer loader\"\u003e\n" +
		"          \u003cdefs\u003e\n" +
		"            \u003clinearGradient id=\"shimmer\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\"\u003e\n" +
		"              \u003cstop offset=\"0%\" stop-color=\"oklch(80% 0.02 270 / 0)\" /\u003e\n" +
		"              \u003cstop offset=\"50%\" stop-color=\"oklch(90% 0.02 270 / 0.4)\" /\u003e\n" +
		"              \u003cstop offset=\"100%\" stop-color=\"oklch(80% 0.02 270 / 0)\" /\u003e\n" +
		"            \u003c/linearGradient\u003e\n" +
		"          \u003c/defs\u003e\n" +
		"          \u003crect x=\"0\" y=\"5\" width=\"120\" height=\"12\" rx=\"4\"\n" +
		"            fill=\"oklch(85% 0.02 270 / 0.3)\" /\u003e\n" +
		"          \u003crect x=\"0\" y=\"25\" width=\"90\" height=\"12\" rx=\"4\"\n" +
		"            fill=\"oklch(85% 0.02 270 / 0.3)\" /\u003e\n" +
		"          \u003crect x=\"0\" y=\"45\" width=\"70\" height=\"12\" rx=\"4\"\n" +
		"            fill=\"oklch(85% 0.02 270 / 0.3)\" /\u003e\n" +
		"          \u003crect x=\"-120\" y=\"0\" width=\"120\" height=\"60\"\n" +
		"            fill=\"url(#shimmer)\" class=\"shimmer-rect\" /\u003e\n" +
		"        \u003c/svg\u003e\n" +
		"        \u003cspan class=\"spinner-label\"\u003eSkeleton\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003c!-- 4. Determinate progress --\u003e\n" +
		"      \u003cdiv class=\"spinner-card\"\u003e\n" +
		"        \u003csvg viewBox=\"0 0 120 24\" class=\"progress-svg\" role=\"img\"\n" +
		"          aria-label=\"Progress bar at {Math.round(progressTween.current)}%\"\u003e\n" +
		"          \u003crect x=\"2\" y=\"2\" width=\"116\" height=\"20\" rx=\"6\"\n" +
		"            fill=\"oklch(85% 0.02 270 / 0.3)\" /\u003e\n" +
		"          \u003crect x=\"2\" y=\"2\" width={116 * (progressTween.current / 100)}\n" +
		"            height=\"20\" rx=\"6\" fill=\"oklch(65% 0.22 270)\" /\u003e\n" +
		"          \u003ctext x=\"60\" y=\"16\" text-anchor=\"middle\" font-size=\"10\"\n" +
		"            fill=\"white\" font-weight=\"600\"\u003e\n" +
		"            {Math.round(progressTween.current)}%\n" +
		"          \u003c/text\u003e\n" +
		"        \u003c/svg\u003e\n" +
		"        \u003clabel class=\"progress-control\"\u003e\n" +
		"          \u003cspan\u003eProgress: {progressValue}%\u003c/span\u003e\n" +
		"          \u003cinput type=\"range\" min=\"0\" max=\"100\" step=\"1\"\n" +
		"            bind:value={progressValue} /\u003e\n" +
		"        \u003c/label\u003e\n" +
		"        \u003cspan class=\"spinner-label\"\u003eDeterminate\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.6 — Loading Spinners &amp; Progress</h1>
	<p class="concept">
		<strong>Concept.</strong> Loading states need visual feedback. SVG provides the building
		blocks for high-quality spinners: <code>&lt;circle&gt;</code> with rotating
		<code>stroke-dashoffset</code> for circular spinners, staggered scale keyframes on
		<code>&lt;circle&gt;</code> elements for dot pulses, animated
		<code>&lt;linearGradient&gt;</code> position for skeleton shimmers, and
		<code>Tween</code>-driven <code>&lt;rect&gt;</code> width for determinate progress bars.
		Use OKLCH for spinner color. All animations live in scoped CSS
		<code>@keyframes</code> and respect <code>prefersReducedMotion</code>.
	</p>

	<div class="build">
		<div class="spinner-grid">
			<!-- 1. Circular spinner -->
			<div class="spinner-card">
				<svg viewBox="0 0 50 50" class="spinner-svg" role="img" aria-label="Circular loading spinner">
					<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(70% 0.03 270)" stroke-width="4" />
					{#if reducedMotion}
						<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(65% 0.22 270)" stroke-width="4" stroke-dasharray="80 126" stroke-linecap="round" />
					{:else}
						<circle cx="25" cy="25" r="20" fill="none" stroke="oklch(65% 0.22 270)" stroke-width="4" stroke-dasharray="80 126" stroke-linecap="round" class="spinner-ring" />
					{/if}
				</svg>
				<span class="spinner-label">Circular</span>
			</div>

			<!-- 2. Dots pulse -->
			<div class="spinner-card">
				<svg viewBox="0 0 60 20" class="dots-svg" role="img" aria-label="Pulsing dots loader">
					<circle cx="10" cy="10" r="5" fill="oklch(65% 0.22 270)" class={reducedMotion ? '' : 'dot dot-1'} />
					<circle cx="30" cy="10" r="5" fill="oklch(65% 0.22 270)" class={reducedMotion ? '' : 'dot dot-2'} />
					<circle cx="50" cy="10" r="5" fill="oklch(65% 0.22 270)" class={reducedMotion ? '' : 'dot dot-3'} />
				</svg>
				<span class="spinner-label">Dots Pulse</span>
			</div>

			<!-- 3. Skeleton shimmer -->
			<div class="spinner-card">
				<svg viewBox="0 0 120 60" class="skeleton-svg" role="img" aria-label="Skeleton shimmer loader">
					<defs>
						<linearGradient id="shimmer" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stop-color="oklch(80% 0.02 270 / 0)" />
							<stop offset="50%" stop-color="oklch(90% 0.02 270 / 0.4)" />
							<stop offset="100%" stop-color="oklch(80% 0.02 270 / 0)" />
						</linearGradient>
					</defs>
					<rect x="0" y="5" width="120" height="12" rx="4" fill="oklch(85% 0.02 270 / 0.3)" />
					<rect x="0" y="25" width="90" height="12" rx="4" fill="oklch(85% 0.02 270 / 0.3)" />
					<rect x="0" y="45" width="70" height="12" rx="4" fill="oklch(85% 0.02 270 / 0.3)" />
					{#if !reducedMotion}
						<rect x="-120" y="0" width="120" height="60" fill="url(#shimmer)" class="shimmer-rect" />
					{/if}
				</svg>
				<span class="spinner-label">Skeleton</span>
			</div>

			<!-- 4. Determinate progress -->
			<div class="spinner-card">
				<svg viewBox="0 0 120 24" class="progress-svg" role="img" aria-label="Progress bar at {Math.round(progressTween.current)}%">
					<rect x="2" y="2" width="116" height="20" rx="6" fill="oklch(85% 0.02 270 / 0.3)" />
					<rect x="2" y="2" width={116 * (progressTween.current / 100)} height="20" rx="6" fill="oklch(65% 0.22 270)" />
					<text x="60" y="16" text-anchor="middle" font-size="10" fill="white" font-weight="600">
						{Math.round(progressTween.current)}%
					</text>
				</svg>
				<label class="progress-control">
					<span>Progress: {progressValue}%</span>
					<input type="range" min="0" max="100" step="1" bind:value={progressValue} />
				</label>
				<span class="spinner-label">Determinate</span>
			</div>
		</div>

		<p class="chart-note">
			Four spinner variants built from pure SVG. The determinate bar is driven by a <code>Tween</code> responding to the slider. When <code>prefersReducedMotion</code> is active, all spinners show static fallbacks.
		</p>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li><code>stroke-dasharray</code> + CSS <code>@keyframes rotate</code> produces a classic circular spinner from a single <code>&lt;circle&gt;</code>.</li>
		<li>Staggered <code>animation-delay</code> on identical elements creates the pulsing-dots loading pattern.</li>
		<li>An animated <code>&lt;linearGradient&gt;</code> sweep across <code>&lt;rect&gt;</code> elements creates skeleton shimmer without JavaScript.</li>
		<li><code>Tween</code> from <code>svelte/motion</code> smoothly interpolates the progress bar width as the slider value changes.</li>
		<li><code>prefersReducedMotion</code> must gate all animation — show static shapes instead of spinning/pulsing when the user prefers reduced motion.</li>
	</ul>
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
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}

	.spinner-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-lg);
	}
	.spinner-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
	}
	.spinner-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.spinner-svg {
		width: 64px;
		height: 64px;
	}
	.dots-svg {
		width: 80px;
		height: 28px;
	}
	.skeleton-svg {
		width: 140px;
		height: 70px;
	}
	.progress-svg {
		width: 160px;
		height: 32px;
	}

	/* ── Circular spinner animation ── */
	.spinner-ring {
		transform-origin: center;
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	/* ── Dots pulse animation ── */
	.dot {
		transform-origin: center;
		animation: dot-pulse 1.2s ease-in-out infinite;
	}
	.dot-1 { animation-delay: 0ms; }
	.dot-2 { animation-delay: 200ms; }
	.dot-3 { animation-delay: 400ms; }
	@keyframes dot-pulse {
		0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
		40% { transform: scale(1); opacity: 1; }
	}

	/* ── Skeleton shimmer animation ── */
	.shimmer-rect {
		animation: shimmer-slide 1.8s ease-in-out infinite;
	}
	@keyframes shimmer-slide {
		0% { transform: translateX(0); }
		100% { transform: translateX(240px); }
	}

	/* ── Progress control ── */
	.progress-control {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		width: 100%;
	}
	.progress-control input[type='range'] {
		width: 100%;
		accent-color: oklch(65% 0.22 270);
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
		.spinner-grid { grid-template-columns: repeat(4, 1fr); }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
