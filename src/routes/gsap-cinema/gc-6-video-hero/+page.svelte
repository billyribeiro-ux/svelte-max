<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const heroHeadline = 'PREMIERE';
	const heroChars = heroHeadline.split('');

	let sectionEl: HTMLElement | null = $state(null);
	let charEls: HTMLSpanElement[] = $state([]);
	let subtitleEl: HTMLParagraphElement | null = $state(null);
	let ctaEl: HTMLButtonElement | null = $state(null);

	$effect(() => {
		if (!sectionEl) return;

		if (prefersReducedMotion.current) {
			charEls.forEach((el) => {
				if (!el) return;
				el.style.opacity = '1';
				el.style.transform = 'none';
			});
			if (subtitleEl) {
				subtitleEl.style.opacity = '1';
				subtitleEl.style.transform = 'none';
			}
			if (ctaEl) {
				ctaEl.style.opacity = '1';
				ctaEl.style.transform = 'none';
			}
			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ delay: 0.5 });

			/* Character-by-character headline reveal */
			const validChars = charEls.filter(Boolean);
			tl.set(validChars, { opacity: 0, y: 50, rotateX: -40 });
			tl.to(validChars, {
				opacity: 1,
				y: 0,
				rotateX: 0,
				duration: 0.6,
				stagger: 0.05,
				ease: 'power3.out'
			});

			/* Subtitle flies in */
			if (subtitleEl) {
				tl.fromTo(
					subtitleEl,
					{ opacity: 0, y: 30 },
					{ opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
					'-=0.2'
				);
			}

			/* CTA scales up with back.out */
			if (ctaEl) {
				tl.fromTo(
					ctaEl,
					{ opacity: 0, scale: 0.6 },
					{ opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
					'-=0.3'
				);
			}
		}, sectionEl!);

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';

  const heroHeadline = 'PREMIERE';
  const heroChars = heroHeadline.split('');

  let sectionEl: HTMLElement | null = $state(null);
  let charEls: HTMLSpanElement[] = $state([]);
  let subtitleEl: HTMLParagraphElement | null = $state(null);
  let ctaEl: HTMLButtonElement | null = $state(null);

  $effect(() => {
    if (!sectionEl) return;
    if (prefersReducedMotion.current) {
      charEls.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
      if (subtitleEl) { subtitleEl.style.opacity = '1'; subtitleEl.style.transform = 'none'; }
      if (ctaEl) { ctaEl.style.opacity = '1'; ctaEl.style.transform = 'none'; }
      return;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });
      const validChars = charEls.filter(Boolean);
      tl.set(validChars, { opacity: 0, y: 50, rotateX: -40 });
      tl.to(validChars, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' });
      if (subtitleEl) tl.fromTo(subtitleEl, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }, '-=0.2');
      if (ctaEl) tl.fromTo(ctaEl, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.3');
    }, sectionEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.6 — Cinematic Video Hero</h1>
	<p class="concept">
		<strong>Netflix, Apple TV+, and premium sites open with a cinematic hero.</strong> A fullscreen
		animated background plays behind text. GSAP drives the overlay: text fades in staggered with
		3D rotation, gradients animate, and the whole sequence is choreographed in a timeline. The
		gradient overlay uses OKLCH for perceptually smooth darkening.
	</p>

	<div class="build hero-section" bind:this={sectionEl}>
		<!-- Animated background (CSS gradient animation simulating video) -->
		<div class="video-bg" aria-hidden="true">
			<div class="video-layer layer-a"></div>
			<div class="video-layer layer-b"></div>
			<div class="video-layer layer-c"></div>
		</div>

		<!-- OKLCH gradient overlay -->
		<div class="gradient-overlay" aria-hidden="true"></div>

		<!-- Content -->
		<div class="hero-content">
			<div class="headline" aria-label={heroHeadline} role="img">
				{#each heroChars as char, i}
					<span class="hero-char" bind:this={charEls[i]}>{char}</span>
				{/each}
			</div>

			<p class="subtitle" bind:this={subtitleEl}>
				Where every frame tells a story. Immerse yourself in the art of motion.
			</p>

			<button type="button" class="cta" bind:this={ctaEl}>
				Start Watching
			</button>
		</div>

		<!-- Decorative film grain overlay -->
		<div class="grain" aria-hidden="true"></div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Orchestrate multi-element hero animations with a GSAP <code>timeline</code> and precise offsets.</li>
		<li>Character-level stagger with 3D rotation (<code>rotateX</code>) creates cinematic text reveals.</li>
		<li>OKLCH gradient overlays produce perceptually smooth darkening over dynamic backgrounds.</li>
		<li>CSS keyframe animations can simulate video backgrounds when real video is unavailable.</li>
		<li><code>prefersReducedMotion</code> makes all elements visible instantly without animation.</li>
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

	/* ── Hero Section ── */
	.hero-section {
		position: relative;
		block-size: 100vh;
		min-block-size: 600px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		border-radius: var(--radius-lg);
		margin-block: var(--space-lg);
		background: oklch(5% 0.02 270);
	}

	/* Animated video-like background */
	.video-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
	}
	.video-layer {
		position: absolute;
		inset: -20%;
	}
	.layer-a {
		background: radial-gradient(
			ellipse at 30% 40%,
			oklch(30% 0.18 270 / 0.6) 0%,
			oklch(15% 0.10 290 / 0.4) 40%,
			transparent 70%
		);
		animation: drift-a 12s ease-in-out infinite alternate;
	}
	.layer-b {
		background: radial-gradient(
			ellipse at 70% 60%,
			oklch(25% 0.15 320 / 0.5) 0%,
			oklch(12% 0.08 340 / 0.3) 40%,
			transparent 65%
		);
		animation: drift-b 15s ease-in-out infinite alternate;
	}
	.layer-c {
		background: radial-gradient(
			ellipse at 50% 80%,
			oklch(20% 0.12 200 / 0.4) 0%,
			oklch(10% 0.06 220 / 0.2) 35%,
			transparent 60%
		);
		animation: drift-c 18s ease-in-out infinite alternate;
	}

	@keyframes drift-a {
		0% { transform: translate(0, 0) scale(1); }
		100% { transform: translate(8%, -6%) scale(1.1); }
	}
	@keyframes drift-b {
		0% { transform: translate(0, 0) scale(1.05); }
		100% { transform: translate(-10%, 8%) scale(0.95); }
	}
	@keyframes drift-c {
		0% { transform: translate(0, 0) scale(0.95); }
		100% { transform: translate(6%, 10%) scale(1.1); }
	}

	/* @property — typed custom property that can be animated via CSS transitions for gradient position */
	@property --gradient-pos {
		syntax: '<percentage>';
		inherits: false;
		initial-value: 0%;
	}

	/* OKLCH gradient overlay */
	.gradient-overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			oklch(5% 0.02 270 / 0.95) 0%,
			oklch(5% 0.02 270 / 0.6) 30%,
			oklch(5% 0.02 270 / 0.1) 60%,
			oklch(5% 0.02 270 / 0.3) 100%
		);
		z-index: 1;
	}

	/* Film grain texture */
	.grain {
		position: absolute;
		inset: 0;
		z-index: 2;
		opacity: 0.04;
		pointer-events: none;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
		background-size: 128px;
	}

	/* Hero content */
	.hero-content {
		position: relative;
		z-index: 3;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-md);
		text-align: center;
		padding-inline: var(--space-lg);
	}
	.headline {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0;
		perspective: 600px;
	}
	.hero-char {
		display: inline-block;
		font-size: clamp(3.5rem, 10vw, 8rem);
		font-weight: 900;
		color: oklch(95% 0 0);
		line-height: 1;
		letter-spacing: 0.06em;
		text-shadow:
			0 2px 30px oklch(65% 0.22 270 / 0.5),
			0 0 60px oklch(60% 0.18 300 / 0.2);
		will-change: transform, opacity;
	}
	.subtitle {
		font-size: var(--text-lg);
		color: oklch(70% 0.02 270);
		max-inline-size: 45ch;
		line-height: 1.5;
		text-wrap: balance;
		opacity: 0;
	}
	.cta {
		padding: var(--space-sm) var(--space-xl);
		background: oklch(95% 0 0);
		color: oklch(10% 0.02 270);
		border: none;
		border-radius: var(--radius-full);
		font-size: var(--text-base);
		font-weight: 700;
		cursor: pointer;
		letter-spacing: 0.03em;
		opacity: 0;
		box-shadow:
			0 4px 24px oklch(0% 0 0 / 0.3),
			0 0 40px oklch(95% 0 0 / 0.1);
		transition: transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-fast) var(--ease-out);

		&:hover {
			transform: scale(1.06);
			box-shadow:
				0 6px 32px oklch(0% 0 0 / 0.4),
				0 0 60px oklch(95% 0 0 / 0.15);
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
