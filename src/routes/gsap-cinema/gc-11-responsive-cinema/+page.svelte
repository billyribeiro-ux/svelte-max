<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(ScrollTrigger);

	type Breakpoint = 'mobile' | 'tablet' | 'desktop';

	let sceneEl: HTMLElement | null = $state(null);
	let currentBreakpoint: Breakpoint = $state('desktop');

	function getBreakpoint(): Breakpoint {
		if (typeof window === 'undefined') return 'desktop';
		if (window.innerWidth >= 1024) return 'desktop';
		if (window.innerWidth >= 768) return 'tablet';
		return 'mobile';
	}

	$effect(() => {
		currentBreakpoint = getBreakpoint();

		const onResize = (): void => {
			currentBreakpoint = getBreakpoint();
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});

	$effect(() => {
		if (!sceneEl) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			ScrollTrigger.matchMedia({
				/* ─── Desktop: Full 5-layer parallax with pinned section ─── */
				'(min-width: 1024px)': () => {
					gsap.utils.toArray<HTMLElement>('.plx-layer').forEach((el) => {
						const speed = Number(el.dataset.speed ?? 0);
						gsap.to(el, {
							y: speed,
							ease: 'none',
							scrollTrigger: {
								trigger: '.parallax-scene',
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						});
					});

					ScrollTrigger.create({
						trigger: '.parallax-scene',
						start: 'top top',
						end: '+=80%',
						pin: true,
						pinSpacing: true
					});

					gsap.fromTo(
						'.reveal-text',
						{ opacity: 0, y: 60 },
						{
							opacity: 1,
							y: 0,
							duration: 0.6,
							stagger: 0.15,
							ease: 'power3.out',
							scrollTrigger: {
								trigger: '.reveal-section',
								start: 'top 70%'
							}
						}
					);
				},

				/* ─── Tablet: 3-layer parallax, no pin ─── */
				'(min-width: 768px) and (max-width: 1023px)': () => {
					gsap.utils.toArray<HTMLElement>('.plx-layer').forEach((el) => {
						const speed = Number(el.dataset.speed ?? 0);
						if (el.classList.contains('plx-layer-4') || el.classList.contains('plx-layer-5')) return;
						gsap.to(el, {
							y: speed * 0.5,
							ease: 'none',
							scrollTrigger: {
								trigger: '.parallax-scene',
								start: 'top bottom',
								end: 'bottom top',
								scrub: true
							}
						});
					});

					gsap.fromTo(
						'.reveal-text',
						{ opacity: 0, y: 40 },
						{
							opacity: 1,
							y: 0,
							duration: 0.5,
							stagger: 0.1,
							ease: 'power2.out',
							scrollTrigger: {
								trigger: '.reveal-section',
								start: 'top 75%'
							}
						}
					);
				},

				/* ─── Mobile: Simple fade reveals, no parallax, no pin ─── */
				'(max-width: 767px)': () => {
					gsap.utils.toArray<HTMLElement>('.fade-in').forEach((el) => {
						gsap.fromTo(
							el,
							{ opacity: 0, y: 24 },
							{
								opacity: 1,
								y: 0,
								duration: 0.4,
								ease: 'power2.out',
								scrollTrigger: {
									trigger: el,
									start: 'top 88%'
								}
							}
						);
					});
				}
			});
		}, sceneEl!);

		return () => ctx.revert();
	});

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);
  type Breakpoint = 'mobile' | 'tablet' | 'desktop';

  let sceneEl: HTMLElement | null = $state(null);
  let currentBreakpoint: Breakpoint = $state('desktop');

  $effect(() => {
    if (!sceneEl) return;
    if (prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        '(min-width: 1024px)': () => {
          // Full 5-layer parallax + pin
          gsap.utils.toArray<HTMLElement>('.plx-layer').forEach((el) => {
            const speed = Number(el.dataset.speed ?? 0);
            gsap.to(el, { y: speed, ease: 'none',
              scrollTrigger: { trigger: '.parallax-scene',
                start: 'top bottom', end: 'bottom top', scrub: true }
            });
          });
          ScrollTrigger.create({ trigger: '.parallax-scene',
            start: 'top top', end: '+=80%', pin: true });
        },
        '(min-width: 768px) and (max-width: 1023px)': () => {
          // 3-layer, no pin, shorter animations
        },
        '(max-width: 767px)': () => {
          // Simple fade-in reveals only
          gsap.utils.toArray<HTMLElement>('.fade-in').forEach((el) => {
            gsap.fromTo(el, { opacity: 0, y: 24 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out',
                scrollTrigger: { trigger: el, start: 'top 88%' } });
          });
        }
      });
    }, sceneEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page" bind:this={sceneEl}>
	<h1>GC.11 — Responsive Cinematic Patterns</h1>
	<p class="concept">
		<strong>Cinematic animations designed for desktop often break on mobile.</strong> Too many
		elements, too much movement, scroll-jacking on touch. <code>ScrollTrigger.matchMedia()</code>
		defines animation sets per breakpoint. Mobile gets simplified animations — fewer layers, no
		pinning, no horizontal scroll. Touch devices get <code>touchAction: 'pan-y'</code> to preserve
		native scrolling.
	</p>

	<div class="build">
		<div class="breakpoint-indicator">
			<span class="bp-label">Current breakpoint:</span>
			<span
				class="bp-badge"
				class:is-mobile={currentBreakpoint === 'mobile'}
				class:is-tablet={currentBreakpoint === 'tablet'}
				class:is-desktop={currentBreakpoint === 'desktop'}
			>
				{currentBreakpoint === 'mobile' ? 'Mobile (<768px)' : currentBreakpoint === 'tablet' ? 'Tablet (768px-1023px)' : 'Desktop (1024px+)'}
			</span>
			<span class="bp-note">Resize the window to watch the switch live.</span>
		</div>

		<div class="parallax-scene">
			<!-- Layer 1: Sky -->
			<div class="plx-layer plx-layer-1 fade-in" data-speed="-30">
				<div class="sky-gradient"></div>
			</div>

			<!-- Layer 2: Far mountains -->
			<div class="plx-layer plx-layer-2 fade-in" data-speed="-70">
				<svg viewBox="0 0 1200 250" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<polygon points="0,250 80,80 200,180 350,50 500,150 650,30 800,120 950,70 1100,140 1200,40 1200,250" fill="oklch(28% 0.06 250)" />
				</svg>
			</div>

			<!-- Layer 3: Near mountains -->
			<div class="plx-layer plx-layer-3 fade-in" data-speed="-130">
				<svg viewBox="0 0 1200 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<polygon points="0,200 100,100 250,160 400,60 550,140 700,40 850,120 1000,80 1200,110 1200,200" fill="oklch(22% 0.05 260)" />
				</svg>
			</div>

			<!-- Layer 4: Trees (desktop/tablet only) -->
			<div class="plx-layer plx-layer-4 fade-in" data-speed="-200">
				<svg viewBox="0 0 1200 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<polygon points="50,160 75,30 100,160" fill="oklch(18% 0.06 150)" />
					<polygon points="180,160 210,20 240,160" fill="oklch(20% 0.05 155)" />
					<polygon points="340,160 365,35 390,160" fill="oklch(17% 0.06 148)" />
					<polygon points="500,160 530,25 560,160" fill="oklch(19% 0.05 152)" />
					<polygon points="660,160 685,30 710,160" fill="oklch(18% 0.06 150)" />
					<polygon points="820,160 850,20 880,160" fill="oklch(20% 0.05 155)" />
					<polygon points="980,160 1005,35 1030,160" fill="oklch(17% 0.06 148)" />
					<polygon points="1120,160 1145,25 1170,160" fill="oklch(19% 0.05 152)" />
				</svg>
			</div>

			<!-- Layer 5: Ground (desktop only) -->
			<div class="plx-layer plx-layer-5 fade-in" data-speed="-280">
				<div class="ground-fill"></div>
			</div>

			<!-- Overlay text -->
			<div class="plx-overlay fade-in">
				<span class="plx-text">ADAPTIVE</span>
			</div>
		</div>

		<div class="scroll-spacer" aria-hidden="true"></div>

		<div class="reveal-section">
			<p class="reveal-text fade-in">
				<strong>Desktop</strong> gets the full 5-layer parallax with a pinned section that locks in place.
			</p>
			<p class="reveal-text fade-in">
				<strong>Tablet</strong> drops to 3 layers, removes pinning, and shortens animations for a lighter feel.
			</p>
			<p class="reveal-text fade-in">
				<strong>Mobile</strong> uses simple fade-in reveals. No parallax, no scroll-jacking. Touch-friendly.
			</p>
		</div>

		<div class="matchmedia-pattern">
			<h3 class="pattern-heading">The Pattern</h3>
			<code class="block-code">ScrollTrigger.matchMedia({'{'}</code>
			<code class="block-code indent">'(min-width: 1024px)': () =&gt; {'{ /* full cinema */ }'}</code>
			<code class="block-code indent">'(min-width: 768px) and (max-width: 1023px)': () =&gt; {'{ /* simplified */ }'}</code>
			<code class="block-code indent">'(max-width: 767px)': () =&gt; {'{ /* fade-ins only */ }'}</code>
			<code class="block-code">{'}'})</code>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Responsive animation patterns fail in specific, predictable ways when breakpoint logic is misconfigured. These experiments reveal the failure modes.</p>
	<ol class="experiments">
		<li><strong>Remove the entire <code>(max-width: 767px)</code> branch from <code>matchMedia</code>.</strong> Mobile users see no animations at all — elements remain invisible because their initial <code>opacity: 0</code> is never resolved. This proves that each breakpoint needs its own complete animation setup, not just "simplified desktop."</li>
		<li><strong>Copy the full desktop parallax config into the mobile branch.</strong> The five-layer parallax with pinning runs on mobile, scroll-jacking the touch experience. The page becomes nearly unusable on phones because pinned sections fight with native touch scrolling and the GPU struggles with five animated layers.</li>
		<li><strong>Overlap the media queries (e.g., use <code>min-width: 700px</code> for both tablet and desktop).</strong> Both branches fire simultaneously at 700-1023px, creating duplicate animations that fight each other. GSAP's <code>matchMedia</code> expects non-overlapping ranges — overlaps cause double-fired triggers and erratic behavior.</li>
		<li><strong>Remove the <code>ctx.revert()</code> cleanup return from the effect.</strong> Resize from desktop to mobile and back — the old desktop ScrollTrigger instances persist alongside the new mobile fade-ins, causing ghost pins and animations that fire from the wrong breakpoint's configuration.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>ScrollTrigger.matchMedia()</code> is GSAP's built-in responsive animation system. You define separate animation configurations for each breakpoint range, and GSAP automatically tears down and rebuilds animations when the viewport crosses a boundary. This is cleaner than wrapping GSAP calls in your own <code>window.matchMedia</code> listeners because GSAP handles the cleanup of ScrollTrigger instances, pinned elements, and progress states internally.</p>
	<p class="prose">The three-tier strategy is a proven pattern: desktop gets the full cinematic treatment with multi-layer parallax and pinned sections; tablet drops to fewer layers with no pinning and shorter animation durations; mobile uses simple fade-in reveals with no parallax and no scroll-jacking. Touch devices have fundamentally different scroll physics — momentum scrolling, overscroll bounce, and imprecise positioning — that make pinned scroll-scrubbed animations feel broken rather than premium.</p>
	<p class="prose">Testing at every breakpoint is not optional. An animation that looks cinematic on a 27-inch display with a trackpad can be nauseating on a 5-inch screen with touch input. The breakpoint indicator in this demo makes viewport changes visible during development. In production, use browser DevTools' responsive mode and throttle the CPU to simulate lower-powered devices where GPU-heavy animations like parallax can drop below 60fps.</p>
	<p class="next">Next lesson: performance optimization and accessibility for cinematic animation.</p>
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

	/* Breakpoint indicator */
	.breakpoint-indicator {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
		padding: var(--space-md);
		background: var(--color-surface-2);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.bp-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.bp-badge {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: 700;
		font-family: var(--font-mono);

		&.is-mobile {
			background: oklch(30% 0.12 30);
			color: oklch(80% 0.16 30);
		}
		&.is-tablet {
			background: oklch(30% 0.10 60);
			color: oklch(80% 0.14 60);
		}
		&.is-desktop {
			background: oklch(28% 0.12 270);
			color: oklch(78% 0.16 270);
		}
	}
	.bp-note {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* Parallax scene */
	.parallax-scene {
		position: relative;
		block-size: 80vh;
		overflow: hidden;
		border-radius: var(--radius-lg);
	}
	.plx-layer {
		position: absolute;
		inset-inline: 0;
		will-change: transform;
	}
	.plx-layer-1 {
		inset: 0;
	}
	.sky-gradient {
		inset: 0;
		position: absolute;
		background: linear-gradient(to bottom, oklch(18% 0.08 260), oklch(32% 0.12 250), oklch(45% 0.10 240));
	}
	.plx-layer-2 {
		inset-block-end: 25%;
		block-size: 45%;

		& svg { inline-size: 100%; block-size: 100%; }
	}
	.plx-layer-3 {
		inset-block-end: 15%;
		block-size: 40%;

		& svg { inline-size: 100%; block-size: 100%; }
	}
	.plx-layer-4 {
		inset-block-end: 8%;
		block-size: 35%;

		& svg { inline-size: 100%; block-size: 100%; }
	}
	.plx-layer-5 {
		inset-block-end: 0;
		block-size: 15%;
	}
	.ground-fill {
		position: absolute;
		inset: 0;
		background: oklch(16% 0.04 140);
	}
	.plx-overlay {
		position: absolute;
		inset: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 10;
		pointer-events: none;
	}
	.plx-text {
		font-size: clamp(3rem, 10vw, 8rem);
		font-weight: 900;
		color: oklch(95% 0 0 / 0.85);
		letter-spacing: 0.12em;
		text-shadow: 0 2px 20px oklch(0% 0 0 / 0.4);
		user-select: none;
	}

	.scroll-spacer {
		block-size: 40vh;
	}

	/* Reveal section */
	.reveal-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		padding-block: var(--space-xl);
	}
	.reveal-text {
		font-size: var(--text-base);
		line-height: 1.7;
		color: var(--color-text-muted);
		max-inline-size: 55ch;
		margin: 0;

		& strong { color: var(--color-text); }
	}

	/* matchMedia pattern display */
	.matchmedia-pattern {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md) var(--space-lg);
	}
	.pattern-heading {
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.plx-layer-4 { display: block; }
		.plx-layer-5 { display: none; }
	}
	@media (max-inline-size: 767px) {
		.plx-layer-4 { display: none; }
		.plx-layer-5 { display: none; }
		.parallax-scene { block-size: 50vh; }
		.scroll-spacer { block-size: 10vh; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
		.plx-layer-4 { display: block; }
		.plx-layer-5 { display: block; }
	}
</style>
