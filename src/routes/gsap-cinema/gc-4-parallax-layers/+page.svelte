<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface ParallaxLayer {
		name: string;
		speed: number;
		blur: number;
		zIndex: number;
	}

	const layers: ParallaxLayer[] = [
		{ name: 'sky', speed: -50, blur: 0, zIndex: 1 },
		{ name: 'mountains', speed: -100, blur: 1.5, zIndex: 2 },
		{ name: 'trees', speed: -180, blur: 0.5, zIndex: 3 },
		{ name: 'ground', speed: -250, blur: 0, zIndex: 4 },
		{ name: 'text', speed: -350, blur: 0, zIndex: 5 }
	];

	let sceneEl: HTMLElement | null = $state(null);
	let layerEls: HTMLDivElement[] = $state([]);
	let speedMultiplier = $state(1);

	// <svelte:body> — track cursor position for mouse-driven parallax offset
	let cursorX = $state(0);
	let cursorY = $state(0);
	function handleBodyMouseMove(e: MouseEvent) {
		cursorX = e.clientX;
		cursorY = e.clientY;
	}

	$effect(() => {
		if (!sceneEl || layerEls.length === 0) return;
		if (prefersReducedMotion.current) return;

		const multiplier = speedMultiplier;

		const ctx = gsap.context(() => {
			layerEls.forEach((el, i) => {
				if (!el) return;
				gsap.to(el, {
					y: layers[i].speed * multiplier,
					ease: 'none',
					scrollTrigger: {
						trigger: sceneEl!,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				});
			});
		}, sceneEl!);

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  interface ParallaxLayer {
    name: string; speed: number; blur: number; zIndex: number;
  }

  const layers: ParallaxLayer[] = [
    { name: 'sky', speed: -50, blur: 0, zIndex: 1 },
    { name: 'mountains', speed: -100, blur: 1.5, zIndex: 2 },
    { name: 'trees', speed: -180, blur: 0.5, zIndex: 3 },
    { name: 'ground', speed: -250, blur: 0, zIndex: 4 },
    { name: 'text', speed: -350, blur: 0, zIndex: 5 }
  ];

  let sceneEl: HTMLElement | null = $state(null);
  let layerEls: HTMLDivElement[] = $state([]);
  let speedMultiplier = $state(1);

  $effect(() => {
    if (!sceneEl || layerEls.length === 0) return;
    if (prefersReducedMotion.current) return;
    const multiplier = speedMultiplier;
    const ctx = gsap.context(() => {
      layerEls.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: layers[i].speed * multiplier, ease: 'none',
          scrollTrigger: { trigger: sceneEl!, start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });
    }, sceneEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<!-- svelte:body — capture mousemove globally for cursor-driven parallax -->
<svelte:body onmousemove={handleBodyMouseMove} />

<section class="page">
	<h1>GC.4 — Deep Parallax Layer Systems</h1>
	<p class="concept">
		<strong>Parallax creates the illusion of depth.</strong> Background moves slower than foreground.
		Netflix, Apple, and premium agencies use 5+ parallax layers to create a sense of scrolling INTO
		the page. GSAP ScrollTrigger with <code>scrub: true</code> makes this trivial — each layer gets
		a different <code>y</code> offset ratio. Blur background layers slightly for cinematic depth-of-field.
	</p>

	<div class="speed-control">
		<label class="slider-label">
			<span>Speed multiplier: <strong>{speedMultiplier.toFixed(1)}x</strong></span>
			<input
				type="range"
				min={0}
				max={3}
				step={0.1}
				bind:value={speedMultiplier}
				class="slider"
			/>
		</label>
	</div>

	<div class="parallax-scene" bind:this={sceneEl}>
		<!-- Layer 0: Sky -->
		<div
			class="parallax-layer layer-sky"
			bind:this={layerEls[0]}
			style:z-index={layers[0].zIndex}
		></div>

		<!-- Layer 1: Mountains -->
		<div
			class="parallax-layer layer-mountains"
			bind:this={layerEls[1]}
			style:z-index={layers[1].zIndex}
			style:filter="blur({layers[1].blur}px)"
		>
			<svg viewBox="0 0 1200 300" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<polygon points="0,300 100,120 200,200 350,80 500,180 600,60 750,160 900,100 1050,180 1200,50 1200,300" fill="oklch(30% 0.06 250)" />
				<polygon points="0,300 150,180 300,240 450,140 600,200 800,110 1000,200 1200,160 1200,300" fill="oklch(25% 0.05 260)" />
			</svg>
		</div>

		<!-- Layer 2: Trees -->
		<div
			class="parallax-layer layer-trees"
			bind:this={layerEls[2]}
			style:z-index={layers[2].zIndex}
			style:filter="blur({layers[2].blur}px)"
		>
			<svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<!-- Tree silhouettes -->
				<polygon points="50,200 70,60 90,200" fill="oklch(20% 0.06 150)" />
				<polygon points="130,200 155,40 180,200" fill="oklch(18% 0.05 155)" />
				<polygon points="220,200 240,80 260,200" fill="oklch(22% 0.06 145)" />
				<polygon points="310,200 335,30 360,200" fill="oklch(19% 0.05 150)" />
				<polygon points="420,200 445,60 470,200" fill="oklch(21% 0.06 148)" />
				<polygon points="530,200 550,50 570,200" fill="oklch(18% 0.05 152)" />
				<polygon points="620,200 648,40 676,200" fill="oklch(20% 0.06 147)" />
				<polygon points="730,200 750,70 770,200" fill="oklch(22% 0.05 150)" />
				<polygon points="840,200 865,35 890,200" fill="oklch(19% 0.06 153)" />
				<polygon points="950,200 970,55 990,200" fill="oklch(21% 0.05 148)" />
				<polygon points="1060,200 1085,45 1110,200" fill="oklch(18% 0.06 150)" />
				<polygon points="1150,200 1170,65 1190,200" fill="oklch(20% 0.05 152)" />
			</svg>
		</div>

		<!-- Layer 3: Ground -->
		<div
			class="parallax-layer layer-ground"
			bind:this={layerEls[3]}
			style:z-index={layers[3].zIndex}
		>
			<svg viewBox="0 0 1200 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<ellipse cx="200" cy="100" rx="30" ry="15" fill="oklch(25% 0.04 40)" />
				<ellipse cx="600" cy="105" rx="40" ry="12" fill="oklch(22% 0.03 45)" />
				<ellipse cx="900" cy="95" rx="25" ry="10" fill="oklch(28% 0.04 38)" />
				<rect x="0" y="80" width="1200" height="40" fill="oklch(18% 0.04 140)" />
			</svg>
		</div>

		<!-- Layer 4: Foreground text -->
		<div
			class="parallax-layer layer-text"
			bind:this={layerEls[4]}
			style:z-index={layers[4].zIndex}
		>
			<span class="depth-text">DEPTH</span>
		</div>
	</div>

	<div class="scroll-spacer" aria-hidden="true"></div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>ScrollTrigger <code>scrub: true</code> ties animation progress directly to scroll position.</li>
		<li>Different <code>y</code> offsets per layer create the parallax depth illusion.</li>
		<li>Adding <code>filter: blur()</code> to distant layers mimics camera depth-of-field.</li>
		<li>A speed multiplier lets users control the intensity of the parallax effect.</li>
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

	.speed-control {
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md) var(--space-lg);
	}
	.slider-label {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		font-size: var(--text-sm);
		color: var(--color-text-muted);

		& strong { color: var(--color-text); }
	}
	.slider {
		inline-size: 100%;
		accent-color: var(--color-brand);
	}

	.parallax-scene {
		position: relative;
		block-size: 100vh;
		overflow: hidden;
		border-radius: var(--radius-lg);
		margin-block: var(--space-md);
	}
	.parallax-layer {
		position: absolute;
		inset-inline: 0;
		will-change: transform;
	}

	.layer-sky {
		inset: 0;
		background: linear-gradient(
			to bottom,
			oklch(20% 0.08 260),
			oklch(35% 0.12 250),
			oklch(50% 0.14 240)
		);
	}
	.layer-mountains {
		inset-block-end: 20%;
		block-size: 50%;

		& svg {
			inline-size: 100%;
			block-size: 100%;
		}
	}
	.layer-trees {
		inset-block-end: 10%;
		block-size: 35%;

		& svg {
			inline-size: 100%;
			block-size: 100%;
		}
	}
	.layer-ground {
		inset-block-end: 0;
		block-size: 20%;

		& svg {
			inline-size: 100%;
			block-size: 100%;
		}
	}
	.layer-text {
		inset-block-end: 25%;
		display: flex;
		justify-content: center;
		align-items: center;
		pointer-events: none;
	}
	.depth-text {
		font-size: clamp(4rem, 12vw, 10rem);
		font-weight: 900;
		color: oklch(95% 0 0 / 0.9);
		letter-spacing: 0.15em;
		text-shadow:
			0 2px 20px oklch(65% 0.22 270 / 0.4),
			0 4px 40px oklch(65% 0.22 270 / 0.2);
		user-select: none;
	}

	.scroll-spacer {
		block-size: 60vh;
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
