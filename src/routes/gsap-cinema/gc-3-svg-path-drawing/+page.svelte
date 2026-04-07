<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(ScrollTrigger);

	type TriggerMode = 'load' | 'scroll';

	interface PathDef {
		d: string;
		color: string;
		width: number;
	}

	const paths: PathDef[] = [
		{ d: 'M 50 200 C 50 80, 150 20, 200 100', color: 'oklch(70% 0.22 270)', width: 3 },
		{ d: 'M 200 100 C 250 180, 300 50, 350 120', color: 'oklch(65% 0.20 220)', width: 3 },
		{ d: 'M 350 120 C 400 200, 420 60, 500 100', color: 'oklch(70% 0.18 170)', width: 3 },
		{ d: 'M 500 100 C 540 30, 600 200, 650 80', color: 'oklch(65% 0.22 320)', width: 3 },
		{ d: 'M 650 80 C 700 160, 720 40, 750 120', color: 'oklch(75% 0.20 60)', width: 3 }
	];

	let triggerMode: TriggerMode = $state('load');
	let sectionEl: HTMLElement | null = $state(null);
	let svgEl: SVGSVGElement | null = $state(null);
	let pathEls: SVGPathElement[] = $state([]);
	let glowEl: HTMLDivElement | null = $state(null);
	let animKey = $state(0);

	function replay(): void {
		animKey++;
	}

	function setTriggerMode(m: TriggerMode): void {
		triggerMode = m;
		animKey++;
	}

	$effect(() => {
		void animKey;
		void triggerMode;
		if (!svgEl || pathEls.length === 0 || !sectionEl) return;

		if (prefersReducedMotion.current) {
			pathEls.forEach((p) => {
				if (!p) return;
				const len = p.getTotalLength();
				p.style.strokeDasharray = `${len}`;
				p.style.strokeDashoffset = '0';
			});
			if (glowEl) glowEl.style.opacity = '1';
			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline(
				triggerMode === 'scroll'
					? {
							scrollTrigger: {
								trigger: sectionEl!,
								start: 'top 60%',
								end: 'bottom 40%',
								scrub: 1
							}
						}
					: { delay: 0.3 }
			);

			pathEls.forEach((p, i) => {
				if (!p) return;
				const len = p.getTotalLength();
				p.style.strokeDasharray = `${len}`;
				p.style.strokeDashoffset = `${len}`;

				tl.to(
					p,
					{ strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' },
					i > 0 ? '-=0.2' : 0
				);
			});

			if (glowEl) {
				tl.to(glowEl, { opacity: 1, duration: 0.6, ease: 'power1.in' }, '-=0.3');
			}
		}, sectionEl!);

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  type TriggerMode = 'load' | 'scroll';

  interface PathDef { d: string; color: string; width: number; }

  const paths: PathDef[] = [
    { d: 'M 50 200 C 50 80, 150 20, 200 100', color: 'oklch(70% 0.22 270)', width: 3 },
    { d: 'M 200 100 C 250 180, 300 50, 350 120', color: 'oklch(65% 0.20 220)', width: 3 },
    { d: 'M 350 120 C 400 200, 420 60, 500 100', color: 'oklch(70% 0.18 170)', width: 3 },
    { d: 'M 500 100 C 540 30, 600 200, 650 80', color: 'oklch(65% 0.22 320)', width: 3 },
    { d: 'M 650 80 C 700 160, 720 40, 750 120', color: 'oklch(75% 0.20 60)', width: 3 }
  ];

  let triggerMode: TriggerMode = $state('load');
  let sectionEl: HTMLElement | null = $state(null);
  let svgEl: SVGSVGElement | null = $state(null);
  let pathEls: SVGPathElement[] = $state([]);
  let glowEl: HTMLDivElement | null = $state(null);
  let animKey = $state(0);

  $effect(() => {
    void animKey; void triggerMode;
    if (!svgEl || pathEls.length === 0 || !sectionEl) return;
    if (prefersReducedMotion.current) { /* show instantly */ return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline(triggerMode === 'scroll' ? {
        scrollTrigger: { trigger: sectionEl!, start: 'top 60%', end: 'bottom 40%', scrub: 1 }
      } : { delay: 0.3 });
      pathEls.forEach((p, i) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        p.style.strokeDashoffset = String(len);
        tl.to(p, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.inOut' }, i > 0 ? '-=0.2' : 0);
      });
    }, sectionEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.3 — SVG Path Drawing with GSAP</h1>
	<p class="concept">
		<strong>SVG path drawing is one of the most cinematic web effects.</strong> GSAP animates
		<code>strokeDashoffset</code> from the path's total length to zero, creating a "drawing" illusion.
		Chain multiple paths in a timeline for sequential reveals. Combine with ScrollTrigger to draw as
		the user scrolls past.
	</p>

	<div class="build logo-stage" bind:this={sectionEl}>
		<div class="controls">
			<fieldset class="radio-group">
				<legend class="sr-only">Trigger mode</legend>
				<label class="radio-label" class:active={triggerMode === 'load'}>
					<input type="radio" name="trigger" value="load" checked={triggerMode === 'load'} onchange={() => setTriggerMode('load')} />
					<span>On Load</span>
				</label>
				<label class="radio-label" class:active={triggerMode === 'scroll'}>
					<input type="radio" name="trigger" value="scroll" checked={triggerMode === 'scroll'} onchange={() => setTriggerMode('scroll')} />
					<span>On Scroll</span>
				</label>
			</fieldset>
			<button type="button" class="btn" onclick={replay}>Replay</button>
		</div>

		<div class="svg-container">
			<div class="glow-ring" bind:this={glowEl}></div>
			<svg
				bind:this={svgEl}
				viewBox="0 0 800 250"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				role="img"
				aria-label="Animated constellation logo drawn with 5 connected paths"
			>
				{#each paths as pathDef, i}
					<path
						bind:this={pathEls[i]}
						d={pathDef.d}
						stroke={pathDef.color}
						stroke-width={pathDef.width}
						stroke-linecap="round"
						fill="none"
					/>
				{/each}

				<!-- Dot markers at connection points -->
				{#each [
					{ cx: 50, cy: 200 },
					{ cx: 200, cy: 100 },
					{ cx: 350, cy: 120 },
					{ cx: 500, cy: 100 },
					{ cx: 650, cy: 80 },
					{ cx: 750, cy: 120 }
				] as dot}
					<circle cx={dot.cx} cy={dot.cy} r="5" fill="oklch(80% 0.18 270)" />
				{/each}
			</svg>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">SVG path drawing relies on a precise relationship between dash arrays and offsets. Breaking that relationship exposes exactly how the illusion works.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>strokeDasharray</code> assignment before animating.</strong> Without setting the dash array to the path's total length, <code>strokeDashoffset</code> has nothing to offset against — the path either shows fully or not at all, with no drawing effect.</li>
		<li><strong>Animate <code>strokeDashoffset</code> to 50 instead of 0.</strong> The path draws most of the way but stops short, leaving a visible gap at the end — showing that the offset value controls exactly how much of the path is revealed.</li>
		<li><strong>Remove the negative position offset (<code>'-=0.2'</code>) from the timeline.</strong> Each path waits for the previous one to fully complete before starting, creating an awkward pause between segments instead of the smooth overlapping draw.</li>
		<li><strong>Set <code>scrub: 0</code> instead of <code>scrub: 1</code> in scroll mode.</strong> The animation snaps instantly to the scroll position with no smoothing, making the drawing feel jerky and mechanical rather than fluid.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">SVG path drawing works by exploiting the <code>strokeDasharray</code> and <code>strokeDashoffset</code> properties. You set the dash array equal to the path's total length (measured with <code>getTotalLength()</code>) so a single dash covers the entire path, then animate the offset from that full length down to zero. As the offset decreases, the dash slides into view, creating the illusion that an invisible hand is drawing the line.</p>
	<p class="prose">Chaining multiple paths in a GSAP timeline with negative position parameters like <code>'-=0.2'</code> creates overlapping draws where the next segment starts before the current one finishes. This overlap is what makes multi-path logos and constellation effects feel connected rather than sequential. Without it, each path feels like a separate animation rather than one continuous gesture.</p>
	<p class="prose">The same timeline logic drives both on-load and scroll-triggered modes. The only difference is the ScrollTrigger config object passed to <code>gsap.timeline()</code>. With <code>scrub: 1</code>, the drawing progress maps directly to scroll position with one second of smoothing, letting the user "draw" the SVG by scrolling. This dual-mode pattern is reusable for any animation you want to trigger both ways.</p>
	<p class="next">Next lesson: deep parallax layer systems with scroll-driven depth.</p>
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
		text-wrap: balance;

		& strong { color: var(--color-text); }
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
	.prose {
		color: var(--color-text);
		max-inline-size: 68ch;
		line-height: 1.7;
		margin-block: 0.5lh;
		text-wrap: pretty;

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}
	.experiments {
		max-inline-size: 68ch;
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-inline-start: var(--space-lg);
		color: var(--color-text);
		line-height: 1.6;

		& strong { color: var(--color-text); }

		& code {
			font-family: var(--font-mono);
			font-size: 0.9em;
			background: var(--color-surface-2);
			padding: 0 var(--space-xs);
			border-radius: var(--radius-xs);
			color: var(--color-brand);
		}
	}
	.next {
		margin-block-start: var(--space-xl);
		color: var(--color-text);
	}

	.logo-stage {
		background: oklch(12% 0.02 270);
		border-color: oklch(22% 0.03 270);
		align-items: center;
	}
	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.radio-group {
		display: flex;
		gap: var(--space-xs);
		border: none;
		padding: 0;
		margin: 0;
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
		border: 0;
	}
	.radio-label {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		color: oklch(70% 0.02 270);
		background: oklch(22% 0.02 270);
		border: 1px solid oklch(30% 0.03 270);
		cursor: pointer;
		transition: all var(--dur-fast) var(--ease-out);

		& input { display: none; }
		&.active {
			background: var(--color-brand);
			color: oklch(100% 0 0);
			border-color: var(--color-brand);
		}
	}
	.btn {
		background: oklch(30% 0.03 270);
		color: oklch(80% 0.02 270);
		border: 1px solid oklch(40% 0.04 270);
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: background var(--dur-fast) var(--ease-out);

		&:hover { background: oklch(38% 0.04 270); }
	}

	.svg-container {
		position: relative;
		inline-size: 100%;
		max-inline-size: 800px;
		aspect-ratio: 800 / 250;
	}
	.svg-container svg {
		inline-size: 100%;
		block-size: 100%;
	}
	.glow-ring {
		position: absolute;
		inset: -10%;
		border-radius: var(--radius-xl);
		opacity: 0;
		background: radial-gradient(
			ellipse at center,
			oklch(65% 0.15 270 / 0.15) 0%,
			oklch(65% 0.15 270 / 0) 70%
		);
		pointer-events: none;
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

	/* ═══ RESPONSIVE BREAKPOINTS ═══ */
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
