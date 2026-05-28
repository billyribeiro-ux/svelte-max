<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut, cubicInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	/* ── Timeline state ── */
	let isPlaying = $state<boolean>(false);
	let isPaused = $state<boolean>(false);
	let timelineProgress = $state(0);
	let rafId = $state(0);
	let startTime = $state(0);
	let pauseTime = $state(0);

	const TOTAL_DURATION = 4000;
	const reducedMotion = $derived(prefersReducedMotion.current);

	/* ── Derived animation values from timeline progress ── */
	const starOpacities = $derived.by(() => {
		const t = timelineProgress;
		return [0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
			const phase = (t * 3 + i * 0.4) % 1;
			return 0.3 + 0.7 * Math.abs(Math.sin(phase * Math.PI));
		});
	});

	const flameScale = $derived.by(() => {
		const t = timelineProgress;
		if (t < 0.15) return 0;
		if (t < 0.25) return ((t - 0.15) / 0.1);
		return 0.8 + 0.2 * Math.sin(t * 20);
	});

	const flameOpacity = $derived(timelineProgress < 0.15 ? 0 : 1);

	const smokeParticles = $derived.by(() => {
		const t = timelineProgress;
		if (t < 0.2) return [];
		const count = Math.min(Math.floor((t - 0.2) * 15), 8);
		return Array.from({ length: count }, (_, i) => ({
			cx: 160 + (i % 2 === 0 ? -1 : 1) * (i * 4 + t * 30),
			cy: 175 + i * 6 + t * 20,
			r: 3 + i * 0.8,
			opacity: Math.max(0, 0.6 - i * 0.07 - (t - 0.2) * 0.3)
		}));
	});

	const rocketY = $derived.by(() => {
		const t = timelineProgress;
		if (t < 0.3) return 130;
		const liftT = Math.min((t - 0.3) / 0.7, 1);
		const eased = 1 - Math.pow(1 - liftT, 3);
		return 130 - eased * 160;
	});

	const rocketScale = $derived.by(() => {
		const t = timelineProgress;
		if (t < 0.3) return 1;
		const shrinkT = Math.min((t - 0.3) / 0.7, 1);
		return 1 - shrinkT * 0.6;
	});

	/* ── Star positions ── */
	const stars: { cx: number; cy: number; r: number }[] = [
		{ cx: 30, cy: 20, r: 2 },
		{ cx: 80, cy: 35, r: 1.5 },
		{ cx: 250, cy: 15, r: 2.5 },
		{ cx: 290, cy: 45, r: 1.8 },
		{ cx: 50, cy: 70, r: 1.2 },
		{ cx: 200, cy: 25, r: 2 },
		{ cx: 140, cy: 10, r: 1.5 },
		{ cx: 270, cy: 80, r: 1.8 }
	];

	/* ── Animation loop ── */
	function animate(timestamp: number): void {
		if (!isPlaying || isPaused) return;
		const elapsed = timestamp - startTime;
		timelineProgress = Math.min(elapsed / TOTAL_DURATION, 1);
		if (timelineProgress < 1) {
			rafId = requestAnimationFrame(animate);
		} else {
			isPlaying = false;
		}
	}

	function play(): void {
		if (reducedMotion) {
			timelineProgress = 1;
			return;
		}
		if (isPaused) {
			startTime = performance.now() - pauseTime;
			isPaused = false;
			isPlaying = true;
			rafId = requestAnimationFrame(animate);
			return;
		}
		timelineProgress = 0;
		isPlaying = true;
		isPaused = false;
		startTime = performance.now();
		rafId = requestAnimationFrame(animate);
	}

	function pause(): void {
		if (!isPlaying || isPaused) return;
		isPaused = true;
		pauseTime = performance.now() - startTime;
		cancelAnimationFrame(rafId);
	}

	function restart(): void {
		cancelAnimationFrame(rafId);
		isPlaying = false;
		isPaused = false;
		timelineProgress = 0;
		play();
	}

	function scrub(e: Event): void {
		const target = e.target as HTMLInputElement;
		cancelAnimationFrame(rafId);
		isPlaying = false;
		isPaused = false;
		timelineProgress = parseFloat(target.value);
	}

	onMount(() => {
		return () => cancelAnimationFrame(rafId);
	});

	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import { prefersReducedMotion } from 'svelte/motion';\n" +
		"  import { onMount } from 'svelte';\n" +
		"\n" +
		"  let isPlaying = $state\u003cboolean\u003e(false);\n" +
		"  let isPaused = $state\u003cboolean\u003e(false);\n" +
		"  let timelineProgress = $state(0);\n" +
		"  const TOTAL_DURATION = 4000;\n" +
		"  const reducedMotion = $derived(prefersReducedMotion.current);\n" +
		"\n" +
		"  /* Derived animation values from progress 0-1 */\n" +
		"  const flameScale = $derived.by(() =\u003e {\n" +
		"    const t = timelineProgress;\n" +
		"    if (t \u003c 0.15) return 0;\n" +
		"    if (t \u003c 0.25) return (t - 0.15) / 0.1;\n" +
		"    return 0.8 + 0.2 * Math.sin(t * 20);\n" +
		"  });\n" +
		"\n" +
		"  const rocketY = $derived.by(() =\u003e {\n" +
		"    const t = timelineProgress;\n" +
		"    if (t \u003c 0.3) return 130;\n" +
		"    const liftT = Math.min((t - 0.3) / 0.7, 1);\n" +
		"    const eased = 1 - Math.pow(1 - liftT, 3);\n" +
		"    return 130 - eased * 160;\n" +
		"  });\n" +
		"\n" +
		"  function animate(timestamp: number): void {\n" +
		"    // RAF-based progress from 0 to 1\n" +
		"  }\n" +
		"\n" +
		"  function play(): void { /* ... */ }\n" +
		"  function pause(): void { /* ... */ }\n" +
		"  function restart(): void { /* ... */ }\n" +
		"  function scrub(e: Event): void { /* ... */ }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003eSI.9 — Lottie-Style Animation (No Lottie)\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e...\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003csvg viewBox=\"0 0 320 200\"\u003e\n" +
		"      \u003c!-- Stars, rocket, flame, smoke --\u003e\n" +
		"    \u003c/svg\u003e\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003cbutton onclick={play}\u003ePlay\u003c/button\u003e\n" +
		"      \u003cbutton onclick={pause}\u003ePause\u003c/button\u003e\n" +
		"      \u003cbutton onclick={restart}\u003eRestart\u003c/button\u003e\n" +
		"      \u003cinput type=\"range\" min=\"0\" max=\"1\" step=\"0.001\"\n" +
		"        value={timelineProgress} oninput={scrub} /\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\u003c/section\u003e\n" +
		"\n" +
		"\u003cstyle\u003e\n" +
		"  /* ... styles ... */\n" +
		"\u003c/style\u003e";
</script>

<section class="page">
	<h1>SI.9 — Lottie-Style Animation (No Lottie)</h1>
	<p class="concept">
		<strong>Concept.</strong> Lottie is a format for exporting After Effects animations to
		web. We don't need it — complex, choreographed SVG animation can be built with
		<code>requestAnimationFrame</code> and a single progress value (0&ndash;1) that drives
		all animated properties via <code>$derived</code>. Each element maps the master
		progress to its own timing curve. Play/Pause/Restart controls and a timeline scrubber
		give full playback control — indistinguishable from Lottie exports.
		<code>prefersReducedMotion</code> shows the final frame statically.
	</p>

	<div class="build">
		{#if reducedMotion}
			<!-- Static final frame for reduced motion -->
			<svg viewBox="0 0 320 200" class="rocket-canvas" role="img" aria-label="Rocket launch animation (static final frame)">
				<rect x="0" y="0" width="320" height="200" fill="oklch(18% 0.04 270)" rx="8" />
				{#each stars as star (star)}
					<circle cx={star.cx} cy={star.cy} r={star.r} fill="oklch(95% 0.05 60)" opacity="0.9" />
				{/each}
				<rect x="0" y="180" width="320" height="20" fill="oklch(35% 0.06 150)" rx="0" />
				<rect x="145" y="170" width="30" height="10" rx="2" fill="oklch(50% 0.08 250)" />
				<text x="160" y="110" text-anchor="middle" font-size="12" fill="oklch(80% 0.10 270)" font-weight="600">Launched!</text>
			</svg>
		{:else}
			<svg viewBox="0 0 320 200" class="rocket-canvas" role="img" aria-label="Rocket launch animation with timeline controls">
				<!-- Night sky -->
				<rect x="0" y="0" width="320" height="200" fill="oklch(18% 0.04 270)" rx="8" />

				<!-- Stars with twinkle -->
				{#each stars as star, i (star)}
					<circle cx={star.cx} cy={star.cy} r={star.r} fill="oklch(95% 0.05 60)" opacity={starOpacities[i]} />
				{/each}

				<!-- Ground -->
				<rect x="0" y="180" width="320" height="20" fill="oklch(35% 0.06 150)" />

				<!-- Launch platform -->
				<rect x="145" y="170" width="30" height="10" rx="2" fill="oklch(50% 0.08 250)" />

				<!-- Smoke trail -->
				{#each smokeParticles as particle (particle)}
					<circle cx={particle.cx} cy={particle.cy} r={particle.r}
						fill="oklch(75% 0.03 250)" opacity={particle.opacity} />
				{/each}

				<!-- Rocket group -->
				<g transform="translate(160, {rocketY}) scale({rocketScale})">
					<!-- Flame -->
					{#if flameOpacity > 0}
						<g transform="translate(0, 28) scale({flameScale})" opacity={flameOpacity}>
							<path d="M -6 0 L 0 18 L 6 0" fill="oklch(75% 0.25 60)" />
							<path d="M -3 0 L 0 12 L 3 0" fill="oklch(80% 0.25 40)" />
						</g>
					{/if}

					<!-- Rocket body -->
					<rect x="-8" y="-5" width="16" height="33" rx="3" fill="oklch(90% 0.03 250)" />

					<!-- Nose cone -->
					<polygon points="-8,-5 0,-20 8,-5" fill="oklch(60% 0.22 15)" />

					<!-- Window -->
					<circle cx="0" cy="6" r="3.5" fill="oklch(60% 0.15 220)" stroke="oklch(50% 0.10 250)" stroke-width="0.8" />

					<!-- Fins -->
					<polygon points="-8,24 -14,32 -8,28" fill="oklch(60% 0.22 15)" />
					<polygon points="8,24 14,32 8,28" fill="oklch(60% 0.22 15)" />
				</g>
			</svg>
		{/if}

		<!-- Timeline controls -->
		<div class="timeline-controls">
			<div class="btn-row">
				<button type="button" onclick={play} disabled={isPlaying && !isPaused}>
					{isPaused ? 'Resume' : 'Play'}
				</button>
				<button type="button" onclick={pause} disabled={!isPlaying || isPaused}>Pause</button>
				<button type="button" onclick={restart}>Restart</button>
			</div>
			<label class="scrubber">
				<span>Timeline: {(timelineProgress * 100).toFixed(0)}%</span>
				<input type="range" min="0" max="1" step="0.001" value={timelineProgress} oninput={scrub} />
			</label>
		</div>

		<p class="chart-note">
			A single <code>timelineProgress</code> value (0&ndash;1) drives all elements via <code>$derived</code>. Stars twinkle &rarr; flame ignites &rarr; smoke appears &rarr; rocket lifts off and shrinks into the distance.
		</p>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">This animation orchestrates multiple SVG elements from a single progress value. Break the coordination to understand how the timeline architecture works.</p>
	<ol class="experiments">
		<li><strong>Change the rocket's lift threshold from <code>0.3</code> to <code>0.0</code> in <code>rocketY</code>.</strong> The rocket starts moving immediately instead of waiting for the flame to ignite first. This shows how time-window mapping creates the choreographic sequencing without any explicit delay or callback system.</li>
		<li><strong>Remove <code>cancelAnimationFrame(rafId)</code> from the <code>onMount</code> cleanup function.</strong> Navigate away from the page and back. The old animation loop continues running in the background, creating a memory leak and potentially conflicting with the new instance.</li>
		<li><strong>Replace <code>requestAnimationFrame</code> with <code>setInterval(animate, 16)</code>.</strong> The animation becomes choppy and inconsistent because <code>setInterval</code> does not synchronize with the browser's repaint cycle. The timestamp parameter from rAF is what enables smooth, jank-free playback.</li>
		<li><strong>Delete the <code>reducedMotion</code> branch that shows a static final frame.</strong> Users who have requested reduced motion see the full animation playing, which can cause vestibular discomfort. The static fallback is the accessibility contract for complex animations.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">A single master progress value ranging from 0 to 1 can orchestrate arbitrarily complex multi-element animations via <code>$derived</code>. Each element maps the global progress to its own timing window: the flame ignites at 15% progress, smoke appears at 20%, and the rocket lifts off at 30%. This approach avoids the complexity of callback chains or explicit delay timers.</p>
	<p class="prose"><code>requestAnimationFrame</code> provides smooth 60fps playback with precise timestamp-based time tracking. The RAF callback receives a high-resolution timestamp that lets you compute exact progress regardless of frame rate fluctuations. Play, Pause, Restart controls and a timeline scrubber give full playback control that is indistinguishable from Lottie player exports.</p>
	<p class="prose">For users who prefer reduced motion, the entire animation is skipped in favor of a static final frame. This is not a degraded experience; it is a complete alternative presentation that communicates the same information without motion.</p>
	<p class="next">Next up: SI.10 covers SVG animation performance optimization and accessibility best practices.</p>
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

	.rocket-canvas {
		inline-size: 100%;
		max-inline-size: 500px;
		block-size: auto;
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}

	.timeline-controls {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
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
		background: oklch(55% 0.15 270);
		color: white;
		border-color: oklch(55% 0.15 270);
	}
	.btn-row button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.scrubber {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.scrubber input[type='range'] {
		inline-size: 100%;
		max-inline-size: 500px;
		accent-color: oklch(55% 0.15 270);
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
