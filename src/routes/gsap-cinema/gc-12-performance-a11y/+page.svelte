<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let smoothEl: HTMLDivElement | null = $state(null);
	let jankyEl: HTMLDivElement | null = $state(null);
	let fpsDisplayEl: HTMLDivElement | null = $state(null);
	let smoothFps = $state(60);
	let jankyFps = $state(60);
	let reducedMotionDemo = $state(false);
	let triggerKey = $state(0);

	function replay(): void {
		triggerKey++;
	}

	/* FPS monitor */
	$effect(() => {
		let frames = 0;
		let lastTime = performance.now();
		let rafId = 0;
		let side: 'smooth' | 'janky' = 'smooth';

		function tick(now: number): void {
			frames++;
			const delta = now - lastTime;
			if (delta >= 500) {
				const fps = Math.round((frames / delta) * 1000);
				if (side === 'smooth') {
					smoothFps = fps;
					side = 'janky';
				} else {
					jankyFps = fps;
					side = 'smooth';
				}
				frames = 0;
				lastTime = now;
			}
			rafId = requestAnimationFrame(tick);
		}
		rafId = requestAnimationFrame(tick);

		return () => cancelAnimationFrame(rafId);
	});

	/* Smooth animation */
	$effect(() => {
		void triggerKey;
		if (!smoothEl) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ repeat: -1, yoyo: true });
			tl.to('.smooth-box', {
				x: 200,
				rotation: 360,
				duration: 1.5,
				ease: 'power2.inOut'
			});
			tl.to('.smooth-box', {
				y: 60,
				scale: 1.3,
				duration: 1,
				ease: 'power1.inOut'
			}, '-=1.5');
		}, smoothEl!);

		return () => ctx.revert();
	});

	/* Janky animation */
	$effect(() => {
		void triggerKey;
		if (!jankyEl) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ repeat: -1, yoyo: true });
			tl.to('.janky-box', {
				x: 200,
				rotation: 360,
				duration: 1.5,
				ease: 'power2.inOut'
			});
			tl.to('.janky-box', {
				y: 60,
				scale: 1.3,
				filter: 'blur(4px) brightness(1.2)',
				boxShadow: '0 20px 60px oklch(0% 0 0 / 0.6)',
				duration: 1,
				ease: 'power1.inOut'
			}, '-=1.5');
		}, jankyEl!);

		return () => ctx.revert();
	});

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';

  let smoothEl: HTMLDivElement | null = $state(null);
  let jankyEl: HTMLDivElement | null = $state(null);
  let smoothFps = $state(60);
  let jankyFps = $state(60);
  let reducedMotionDemo = $state(false);

  // FPS monitor using requestAnimationFrame delta
  $effect(() => {
    let frames = 0;
    let lastTime = performance.now();
    let rafId = 0;
    function tick(now: number): void {
      frames++;
      const delta = now - lastTime;
      if (delta >= 500) {
        const fps = Math.round((frames / delta) * 1000);
        smoothFps = fps; jankyFps = fps;
        frames = 0; lastTime = now;
      }
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  });

  // Smooth: only transform + opacity
  $effect(() => {
    if (!smoothEl || prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, yoyo: true })
        .to('.smooth-box', { x: 200, rotation: 360, duration: 1.5 });
    }, smoothEl!);
    return () => ctx.revert();
  });

  // Janky: filter, box-shadow (forces repaint)
  $effect(() => {
    if (!jankyEl || prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.timeline({ repeat: -1, yoyo: true })
        .to('.janky-box', {
          x: 200, rotation: 360, filter: 'blur(4px)',
          boxShadow: '0 20px 60px oklch(0% 0 0 / 0.6)', duration: 1.5 });
    }, jankyEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.12 — Cinematic Performance & Accessibility</h1>
	<p class="concept">
		<strong>Cinematic animation is worthless if it janks or excludes users.</strong> Only animate
		<code>transform</code> and <code>opacity</code> (composite-only properties). Use
		<code>will-change: transform</code> sparingly. Monitor with <code>requestAnimationFrame</code>
		deltas. For accessibility, <code>prefersReducedMotion</code> is the minimum — provide an
		ALTERNATIVE experience (static but beautiful) instead of just disabling animation.
	</p>

	<div class="build">
		<!-- Split comparison -->
		<h2 class="section-title">Performance Comparison</h2>
		<p class="demo-desc">
			Left: composite-only properties. Right: adds <code>filter: blur()</code> and
			<code>box-shadow</code> — forces repaint every frame.
		</p>

		<button type="button" class="btn" onclick={replay}>Restart Both</button>

		<div class="split-view">
			<!-- Smooth side -->
			<div class="split-panel" bind:this={smoothEl}>
				<div class="panel-header smooth-header">
					<span class="panel-label">Composite Only</span>
					<span class="fps-badge" class:good={smoothFps > 50}>
						{smoothFps} FPS
					</span>
				</div>
				<div class="panel-code">
					<code>will-change: transform</code>
					<code>transform + opacity only</code>
				</div>
				<div class="anim-track">
					<div class="smooth-box anim-box"></div>
				</div>
			</div>

			<!-- Janky side -->
			<div class="split-panel janky-panel" bind:this={jankyEl}>
				<div class="panel-header janky-header">
					<span class="panel-label">+ filter + box-shadow</span>
					<span class="fps-badge" class:bad={jankyFps < 55}>
						{jankyFps} FPS
					</span>
				</div>
				<div class="panel-code">
					<code>will-change: none</code>
					<code>filter: blur(4px) added</code>
				</div>
				<div class="anim-track">
					<div class="janky-box anim-box janky-styled"></div>
				</div>
			</div>
		</div>

		<div class="fps-note" bind:this={fpsDisplayEl}>
			FPS calculated from <code>requestAnimationFrame</code> delta timing.
			The difference is most visible on lower-powered devices.
		</div>

		<!-- Reduced motion demo -->
		<div class="a11y-section">
			<h2 class="section-title">Reduced Motion: The Right Way</h2>
			<p class="demo-desc">
				Toggle to see the page in its "final animated state" — everything positioned where it
				would end up, no motion, but still visually rich. Not a blank page — a
				<strong>designed static state</strong>.
			</p>

			<label class="toggle-label">
				<input type="checkbox" bind:checked={reducedMotionDemo} class="toggle-input" />
				<span class="toggle-track">
					<span class="toggle-thumb"></span>
				</span>
				<span class="toggle-text">
					{reducedMotionDemo ? 'prefersReducedMotion: ON' : 'prefersReducedMotion: OFF'}
				</span>
			</label>

			<div class="static-demo" class:reduced={reducedMotionDemo}>
				<div class="demo-card demo-card-1">
					<span class="demo-card-label">Hero headline</span>
					<span class="demo-card-detail">Character animation complete</span>
				</div>
				<div class="demo-card demo-card-2">
					<span class="demo-card-label">SVG Logo</span>
					<span class="demo-card-detail">Fully drawn, strokes visible</span>
				</div>
				<div class="demo-card demo-card-3">
					<span class="demo-card-label">Parallax Scene</span>
					<span class="demo-card-detail">All layers in final position</span>
				</div>
				<div class="demo-card demo-card-4">
					<span class="demo-card-label">Stats Counter</span>
					<span class="demo-card-detail">Showing final values</span>
				</div>
			</div>

			<div class="code-callout">
				<h3 class="callout-heading">The Pattern</h3>
				<code class="block-code">if (prefersReducedMotion.current) {'{'}</code>
				<code class="block-code indent">// Show final state instantly</code>
				<code class="block-code indent">gsap.set(elements, {'{ opacity: 1, y: 0, scale: 1 }'});</code>
				<code class="block-code indent">return; // Skip animation setup</code>
				<code class="block-code">{'}'}</code>
			</div>
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Only animate <code>transform</code> and <code>opacity</code> — these run on the compositor thread without triggering layout or paint.</li>
		<li><code>filter: blur()</code> and <code>box-shadow</code> animations force per-frame repaints — use sparingly.</li>
		<li><code>will-change: transform</code> promotes an element to its own compositor layer but costs GPU memory.</li>
		<li><code>prefersReducedMotion</code> should show a designed static state, not a blank page — use <code>gsap.set()</code> to place everything at its final position.</li>
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

	.section-title {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin: 0;
	}
	.demo-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;

		& strong { color: var(--color-text); }
	}
	.btn {
		align-self: flex-start;
		background: var(--color-surface-2);
		color: var(--color-text-muted);
		border: 1px solid var(--color-border);
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: all var(--dur-fast) var(--ease-out);

		&:hover {
			background: color-mix(in oklch, var(--color-brand) 20%, var(--color-surface-2));
		}
	}

	/* Split view */
	.split-view {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--space-md);
	}
	.split-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
	}
	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.panel-label {
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
	}
	.fps-badge {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		background: oklch(28% 0.08 150);
		color: oklch(78% 0.16 150);

		&.good {
			background: oklch(28% 0.10 150);
			color: oklch(80% 0.18 150);
		}
		&.bad {
			background: oklch(28% 0.10 30);
			color: oklch(75% 0.18 30);
		}
	}
	.panel-code {
		display: flex;
		flex-direction: column;
		gap: 2px;

		& code {
			font-size: var(--text-xs);
		}
	}
	.anim-track {
		position: relative;
		block-size: 120px;
		background: var(--color-surface-1);
		border-radius: var(--radius-sm);
		overflow: hidden;
	}
	.anim-box {
		position: absolute;
		inset-inline-start: var(--space-md);
		inset-block-start: 50%;
		transform: translateY(-50%);
		inline-size: 48px;
		block-size: 48px;
		border-radius: var(--radius-sm);
	}
	.smooth-box {
		background: oklch(65% 0.20 270);
		will-change: transform;
	}
	.janky-box {
		background: oklch(65% 0.20 30);
	}
	.janky-styled {
		will-change: auto;
	}

	.fps-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		line-height: 1.5;
	}

	/* A11y section */
	.a11y-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-xl);
		border-block-start: 1px solid var(--color-border);
	}
	.toggle-label {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		cursor: pointer;
	}
	.toggle-input {
		position: absolute;
		opacity: 0;
		inline-size: 0;
		block-size: 0;
	}
	.toggle-track {
		position: relative;
		inline-size: 44px;
		block-size: 24px;
		background: var(--color-surface-2);
		border: 2px solid var(--color-border);
		border-radius: var(--radius-full);
		transition: all var(--dur-fast) var(--ease-out);

		.toggle-input:checked + & {
			background: oklch(45% 0.16 270);
			border-color: oklch(55% 0.18 270);
		}
	}
	.toggle-thumb {
		position: absolute;
		inset-block-start: 2px;
		inset-inline-start: 2px;
		inline-size: 16px;
		block-size: 16px;
		background: oklch(80% 0.02 270);
		border-radius: var(--radius-full);
		transition: transform var(--dur-fast) var(--ease-out);

		.toggle-input:checked + .toggle-track & {
			transform: translateX(20px);
		}
	}
	.toggle-text {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}

	/* Static demo */
	.static-demo {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: var(--space-md);
	}
	.demo-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.4s ease;
	}
	.static-demo.reduced .demo-card {
		opacity: 1;
		transform: translateY(0);
	}
	.demo-card-1 { background: linear-gradient(135deg, oklch(22% 0.08 270), oklch(18% 0.04 280)); }
	.demo-card-2 { background: linear-gradient(135deg, oklch(22% 0.06 160), oklch(18% 0.04 170)); }
	.demo-card-3 { background: linear-gradient(135deg, oklch(22% 0.08 60), oklch(18% 0.04 50)); }
	.demo-card-4 { background: linear-gradient(135deg, oklch(22% 0.08 320), oklch(18% 0.04 330)); }

	.demo-card-label {
		font-size: var(--text-sm);
		font-weight: 700;
		color: oklch(85% 0.02 270);
	}
	.demo-card-detail {
		font-size: var(--text-xs);
		color: oklch(60% 0.02 270);
	}

	/* Code callout */
	.code-callout {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md) var(--space-lg);
	}
	.callout-heading {
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		margin: 0 0 var(--space-sm);
	}
	.block-code {
		display: block;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-1);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
		margin-block-end: 2px;
	}
	.indent {
		padding-inline-start: var(--space-xl);
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
		.split-view { grid-template-columns: 1fr 1fr; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
