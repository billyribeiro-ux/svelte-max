<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	interface CardFace {
		label: string;
		content: string;
		bg: string;
	}

	const cardFront: CardFace = {
		label: 'Front',
		content: 'Click to reveal',
		bg: 'linear-gradient(135deg, oklch(30% 0.14 270), oklch(20% 0.10 290))'
	};

	const cardBack: CardFace = {
		label: 'Back',
		content: 'The secret side',
		bg: 'linear-gradient(135deg, oklch(30% 0.14 160), oklch(20% 0.10 180))'
	};

	interface CarouselCard {
		id: number;
		title: string;
		color: string;
	}

	const carouselCards: CarouselCard[] = [
		{ id: 1, title: 'Easing', color: 'oklch(68% 0.20 270)' },
		{ id: 2, title: 'Timelines', color: 'oklch(70% 0.18 160)' },
		{ id: 3, title: 'ScrollTrigger', color: 'oklch(65% 0.22 60)' },
		{ id: 4, title: 'Staggers', color: 'oklch(72% 0.20 320)' },
		{ id: 5, title: '3D Transforms', color: 'oklch(68% 0.18 200)' }
	];

	let isFlipped = $state(false);
	let flipCardEl: HTMLDivElement | null = $state(null);
	let carouselEl: HTMLDivElement | null = $state(null);
	let carouselRotation = $state(0);
	let currentFront = $derived(Math.round((((-carouselRotation % 360) + 360) % 360) / 72) % 5);

	function flipCard(): void {
		if (!flipCardEl || prefersReducedMotion.current) {
			isFlipped = !isFlipped;
			return;
		}

		const targetY = isFlipped ? 0 : 180;
		gsap.to(flipCardEl, {
			rotationY: targetY,
			duration: 0.7,
			ease: 'power2.inOut'
		});
		isFlipped = !isFlipped;
	}

	function rotateCarousel(direction: 1 | -1): void {
		if (!carouselEl) return;
		const newRotation = carouselRotation + direction * 72;

		if (prefersReducedMotion.current) {
			carouselRotation = newRotation;
			return;
		}

		gsap.to(
			{ r: carouselRotation },
			{
				r: newRotation,
				duration: 0.6,
				ease: 'power2.out',
				onUpdate: function (this: gsap.core.Tween) {
					const targets = this.targets() as Array<{ r: number }>;
					carouselRotation = targets[0].r;
				}
			}
		);
	}

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';

  let isFlipped = $state(false);
  let flipCardEl: HTMLDivElement | null = $state(null);
  let carouselRotation = $state(0);

  function flipCard(): void {
    if (!flipCardEl || prefersReducedMotion.current) {
      isFlipped = !isFlipped;
      return;
    }
    const targetY = isFlipped ? 0 : 180;
    gsap.to(flipCardEl, {
      rotationY: targetY, duration: 0.7, ease: 'power2.inOut'
    });
    isFlipped = !isFlipped;
  }

  function rotateCarousel(direction: 1 | -1): void {
    const newRotation = carouselRotation + direction * 72;
    if (prefersReducedMotion.current) {
      carouselRotation = newRotation;
      return;
    }
    gsap.to({ r: carouselRotation }, {
      r: newRotation, duration: 0.6, ease: 'power2.out',
      onUpdate: function (this: gsap.core.Tween) {
        const targets = this.targets() as Array<{ r: number }>;
        carouselRotation = targets[0].r;
      }
    });
  }
<\/script>`;
</script>

<section class="page">
	<h1>GC.10 — CSS 3D Transforms with GSAP</h1>
	<p class="concept">
		<strong>CSS 3D transforms create depth effects impossible with 2D.</strong> Set
		<code>perspective</code> on the parent, <code>transform-style: preserve-3d</code> on children.
		GSAP animates <code>rotationX</code>, <code>rotationY</code>, and <code>z</code> properties.
		Card flips, 3D carousels, and depth-based parallax are all achievable with this pattern.
	</p>

	<div class="build">
		<!-- Demo 1: Card Flip -->
		<h2 class="section-title">Demo 1 — Card Flip</h2>
		<p class="demo-desc">Click the card to flip it 180 degrees around the Y axis.</p>

		<div class="flip-stage">
			<div class="flip-card" bind:this={flipCardEl}>
				<button type="button" class="flip-face flip-front" style:background={cardFront.bg} onclick={flipCard}>
					<span class="face-label">{cardFront.label}</span>
					<span class="face-content">{cardFront.content}</span>
				</button>
				<button type="button" class="flip-face flip-back" style:background={cardBack.bg} onclick={flipCard}>
					<span class="face-label">{cardBack.label}</span>
					<span class="face-content">{cardBack.content}</span>
				</button>
			</div>
		</div>

		<div class="code-callout">
			<code class="block-code">perspective: 1000px; /* on parent */</code>
			<code class="block-code">transform-style: preserve-3d; /* on card */</code>
			<code class="block-code">gsap.to(card, {'{ rotationY: 180 }'})</code>
		</div>

		<!-- Demo 2: 3D Carousel -->
		<h2 class="section-title carousel-title">Demo 2 — 3D Carousel</h2>
		<p class="demo-desc">
			5 cards arranged in a circle using <code>rotateY</code> + <code>translateZ</code>.
			Arrow buttons rotate the carousel 72 degrees per click.
		</p>

		<div class="carousel-stage">
			<div class="carousel-scene">
				<div
					class="carousel"
					bind:this={carouselEl}
					style:transform="rotateY({carouselRotation}deg)"
				>
					{#each carouselCards as card, i}
						<div
							class="carousel-card"
							class:is-front={currentFront === i}
							style:--card-color={card.color}
							style:transform="rotateY({i * 72}deg) translateZ(220px)"
						>
							<span class="carousel-card-title">{card.title}</span>
							<span class="carousel-card-id">#{card.id}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="carousel-controls">
				<button type="button" class="btn" onclick={() => rotateCarousel(1)}>&larr; Prev</button>
				<span class="carousel-indicator">Showing: {carouselCards[currentFront].title}</span>
				<button type="button" class="btn" onclick={() => rotateCarousel(-1)}>Next &rarr;</button>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">3D CSS transforms require a precise chain of properties from parent to child. Break any link and the 3D effect collapses to flat 2D.</p>
	<ol class="experiments">
		<li><strong>Remove <code>perspective: 1000px</code> from <code>.flip-stage</code>.</strong> The card rotation still happens but looks completely flat — like a 2D scale squeeze rather than a 3D flip. Without perspective, there is no vanishing point and no foreshortening, so the Z-axis becomes invisible.</li>
		<li><strong>Remove <code>backface-visibility: hidden</code> from <code>.flip-face</code>.</strong> Both the front and back face remain visible at all times. When the card flips to 180 degrees, you see the front face mirrored behind the back face, creating a confusing double-image instead of a clean reveal.</li>
		<li><strong>Remove <code>transform-style: preserve-3d</code> from <code>.flip-card</code>.</strong> The browser flattens the card's children into 2D space. The back face's <code>rotateY(180deg)</code> stops working because the parent no longer maintains a 3D context — both faces render on top of each other in the same plane.</li>
		<li><strong>Change the carousel <code>translateZ(220px)</code> to <code>translateZ(0)</code>.</strong> All five cards stack on top of each other at the center of the carousel because there is no radial offset. The <code>rotateY</code> values still rotate them but without <code>translateZ</code> pushing them outward, the circle has zero radius.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">CSS 3D transforms require a three-part setup: <code>perspective</code> on an ancestor creates the vanishing point, <code>transform-style: preserve-3d</code> on the container keeps children in 3D space rather than flattening them, and <code>backface-visibility: hidden</code> on each face hides the mirrored reverse side during rotation. Missing any one of these properties causes the 3D illusion to fail silently — the browser just renders everything flat without any error.</p>
	<p class="prose">The card flip uses GSAP to animate <code>rotationY</code> from 0 to 180 degrees. Because each face is absolutely positioned and the back face is pre-rotated 180 degrees, exactly one face is visible at any given rotation angle. GSAP's <code>power2.inOut</code> ease creates a natural acceleration-deceleration curve that mimics the physics of a real card turning in someone's hand.</p>
	<p class="prose">The 3D carousel positions five cards around a circle using the formula <code>rotateY(i * 72deg) translateZ(220px)</code>. Each card faces outward from the center at 72-degree intervals (360 / 5). Rotating the container itself brings each card to the front in turn. GSAP animates a proxy object's rotation value and updates Svelte state on each frame via <code>onUpdate</code>, letting the template reactively compute which card is currently facing forward using modular arithmetic on the rotation angle.</p>
	<p class="next">Next lesson: responsive cinema patterns that adapt to every viewport.</p>
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

	.section-title {
		font-size: var(--text-lg);
		color: var(--color-text);
		margin: 0;
	}
	.carousel-title {
		margin-block-start: var(--space-xl);
		padding-block-start: var(--space-xl);
		border-block-start: 1px solid var(--color-border);
	}
	.demo-desc {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.5;
	}

	/* Card Flip */
	.flip-stage {
		perspective: 1000px;
		display: flex;
		justify-content: center;
		padding: var(--space-xl) 0;
	}
	.flip-card {
		position: relative;
		inline-size: 240px;
		block-size: 340px;
		transform-style: preserve-3d;
		cursor: pointer;
	}
	.flip-face {
		position: absolute;
		inset: 0;
		border-radius: var(--radius-lg);
		backface-visibility: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-md);
		border: 2px solid oklch(40% 0.06 270);
		cursor: pointer;
		padding: var(--space-lg);
		text-align: center;
	}
	.flip-back {
		transform: rotateY(180deg);
	}
	.face-label {
		font-size: var(--text-xs);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: oklch(60% 0.04 270);
	}
	.face-content {
		font-size: var(--text-lg);
		font-weight: 800;
		color: oklch(90% 0.02 270);
	}

	.code-callout {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.block-code {
		display: block;
		padding: var(--space-xs) var(--space-sm);
		background: var(--color-surface-2);
		border-radius: var(--radius-sm);
		font-size: var(--text-sm);
	}

	/* 3D Carousel */
	.carousel-stage {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: center;
	}
	.carousel-scene {
		perspective: 1000px;
		inline-size: 100%;
		max-inline-size: 500px;
		block-size: 280px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}
	.carousel {
		position: relative;
		inline-size: 160px;
		block-size: 220px;
		transform-style: preserve-3d;
		will-change: transform;
	}
	.carousel-card {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			135deg,
			color-mix(in oklch, var(--card-color) 40%, oklch(15% 0.02 270)),
			color-mix(in oklch, var(--card-color) 20%, oklch(10% 0.01 270))
		);
		border: 2px solid color-mix(in oklch, var(--card-color) 60%, oklch(30% 0.02 270));
		border-radius: var(--radius-lg);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-sm);
		backface-visibility: hidden;
		transition: box-shadow var(--dur-fast) var(--ease-out);

		&.is-front {
			box-shadow: 0 8px 32px oklch(0% 0 0 / 0.4);
		}
	}
	.carousel-card-title {
		font-size: var(--text-base);
		font-weight: 800;
		color: oklch(90% 0.02 270);
	}
	.carousel-card-id {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: oklch(55% 0.02 270);
	}
	.carousel-controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
	}
	.carousel-indicator {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
		min-inline-size: 10ch;
		text-align: center;
	}
	.btn {
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
			border-color: var(--color-brand);
		}
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
		.flip-card {
			inline-size: 280px;
			block-size: 380px;
		}
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.carousel-scene { block-size: 320px; }
		.carousel {
			inline-size: 180px;
			block-size: 240px;
		}
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
		.carousel-scene { block-size: 360px; }
		.carousel {
			inline-size: 200px;
			block-size: 260px;
		}
	}
</style>
