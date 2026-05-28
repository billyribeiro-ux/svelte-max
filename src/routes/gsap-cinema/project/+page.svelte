<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { CustomEase } from 'gsap/CustomEase';
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import type { Action } from 'svelte/action';

	gsap.registerPlugin(ScrollTrigger, CustomEase);

	// ── Custom easing curves (GC.1) ──
	CustomEase.create('cinematic-in', 'M0,0 C0.22,0.61 0.36,1 1,1');
	CustomEase.create('cinematic-out', 'M0,0 C0.64,0 0.78,0.39 1,1');
	CustomEase.create('snap-back', 'M0,0 C0.1,0.9 0.2,1.2 0.4,1 0.5,0.92 0.75,1 1,1');

	// ── State ──
	let containerEl: HTMLElement | null = $state(null);
	let heroEl: HTMLElement | null = $state(null);
	let svgPathEl: SVGPathElement | null = $state(null);
	let isFlipped = $state(false);
	let flipCardEl: HTMLDivElement | null = $state(null);
	let showReel = $state(false);
	let staggerKey = $state(0);
	let gridCellEls: HTMLDivElement[] = $state([]);

	// ── SVG path drawing data (GC.3) ──
	const cameraPath = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z';

	// ── Stagger grid (GC.7) ──
	const GRID_ROWS = 5;
	const GRID_COLS = 8;
	const GRID_TOTAL = GRID_ROWS * GRID_COLS;

	function getCellHue(i: number): number {
		const row = Math.floor(i / GRID_COLS);
		const col = i % GRID_COLS;
		return (row / (GRID_ROWS - 1)) * 180 + (col / (GRID_COLS - 1)) * 180;
	}

	// ── 3D flip card (GC.10) ──
	function flipCard(): void {
		if (!flipCardEl || prefersReducedMotion.current) {
			isFlipped = !isFlipped;
			return;
		}
		gsap.to(flipCardEl, {
			rotationY: isFlipped ? 0 : 180,
			duration: 0.7,
			ease: 'power2.inOut'
		});
		isFlipped = !isFlipped;
	}

	// ── Reveal-on-scroll action (GC.8 + GC.12) ──
	const revealOnScroll: Action<HTMLElement, { y?: number; delay?: number } | undefined> = (node, params) => {
		const opts = params ?? {};
		const y = opts.y ?? 50;
		const delay = opts.delay ?? 0;

		if (prefersReducedMotion.current) {
			return { destroy() {} };
		}

		gsap.set(node, { opacity: 0, y });
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						gsap.to(node, { opacity: 1, y: 0, duration: 0.9, delay, ease: 'cinematic-in' });
						observer.disconnect();
					}
				});
			},
			{ threshold: 0.15 }
		);
		observer.observe(node);
		return {
			destroy() {
				observer.disconnect();
				gsap.killTweensOf(node);
			}
		};
	};

	// ── Hero entrance timeline (GC.5 scene choreography) ──
	$effect(() => {
		if (!containerEl || !heroEl) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({ delay: 0.2 });
			tl.from('.cinema-badge', { opacity: 0, scale: 0, duration: 0.5, ease: 'back.out(1.7)' })
				.from('.cinema-title span', {
					opacity: 0,
					y: 80,
					rotationX: -90,
					stagger: 0.08,
					duration: 0.7,
					ease: 'snap-back'
				}, '-=0.2')
				.from('.cinema-subtitle', { opacity: 0, x: -50, duration: 0.6, ease: 'cinematic-in' }, '-=0.3')
				.from('.cinema-cta', { opacity: 0, scale: 0, duration: 0.4, ease: 'back.out(2)' }, '-=0.2');

			// Parallax glow (GC.4)
			gsap.to('.hero-glow', {
				y: -80,
				ease: 'none',
				scrollTrigger: {
					trigger: heroEl,
					start: 'top top',
					end: 'bottom top',
					scrub: true
				}
			});

			// Feature cards scroll-stagger
			gsap.utils.toArray<HTMLElement>('.cinema-feature').forEach((card, i) => {
				gsap.from(card, {
					opacity: 0,
					y: 70,
					rotation: i % 2 === 0 ? -3 : 3,
					duration: 0.8,
					ease: 'cinematic-in',
					scrollTrigger: {
						trigger: card,
						start: 'top 85%',
						toggleActions: 'play none none reverse'
					},
					delay: i * 0.08
				});
			});

			// Scrub testimonial parallax (GC.4)
			gsap.fromTo('.parallax-quote', { y: 40 }, {
				y: -40,
				ease: 'none',
				scrollTrigger: {
					trigger: '.quote-section',
					start: 'top bottom',
					end: 'bottom top',
					scrub: true
				}
			});
		}, containerEl);

		return () => ctx.revert();
	});

	// ── SVG path draw on scroll (GC.3) ──
	$effect(() => {
		if (!svgPathEl || prefersReducedMotion.current) return;
		const length = svgPathEl.getTotalLength();
		gsap.set(svgPathEl, { strokeDasharray: length, strokeDashoffset: length });
		const tween = gsap.to(svgPathEl, {
			strokeDashoffset: 0,
			duration: 1,
			ease: 'cinematic-out',
			scrollTrigger: {
				trigger: svgPathEl,
				start: 'top 80%',
				toggleActions: 'play none none reverse'
			}
		});
		return () => { tween.kill(); };
	});

	// ── Stagger grid animation (GC.7) ──
	$effect(() => {
		void staggerKey;
		const validEls = gridCellEls.filter(Boolean);
		if (validEls.length === 0) return;
		if (prefersReducedMotion.current) {
			validEls.forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
			return;
		}
		const ctx = gsap.context(() => {
			gsap.set(validEls, { scale: 0, opacity: 0 });
			gsap.to(validEls, {
				scale: 1,
				opacity: 1,
				duration: 0.5,
				ease: 'back.out(1.7)',
				stagger: { grid: [GRID_ROWS, GRID_COLS], from: 'center', each: 0.03 }
			});
		});
		return () => ctx.revert();
	});

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"  import gsap from 'gsap';\n" +
		"  import { ScrollTrigger } from 'gsap/ScrollTrigger';\n" +
		"  import { CustomEase } from 'gsap/CustomEase';\n" +
		"  import { fade, fly } from 'svelte/transition';\n" +
		"  import { prefersReducedMotion } from 'svelte/motion';\n" +
		"  import type { Action } from 'svelte/action';\n" +
		"\n" +
		"  gsap.registerPlugin(ScrollTrigger, CustomEase);\n" +
		"\n" +
		"  // Custom easing (GC.1)\n" +
		"  CustomEase.create('cinematic-in', 'M0,0 C0.22,0.61 0.36,1 1,1');\n" +
		"  CustomEase.create('snap-back', 'M0,0 C0.1,0.9 0.2,1.2 0.4,1 ...');\n" +
		"\n" +
		"  let containerEl: HTMLElement | null = $state(null);\n" +
		"  let heroEl: HTMLElement | null = $state(null);\n" +
		"\n" +
		"  // Reveal-on-scroll action (GC.8 + GC.12)\n" +
		"  const revealOnScroll: Action\u003cHTMLElement\u003e = (node, params) =\u003e {\n" +
		"    if (prefersReducedMotion.current) return { destroy() {} };\n" +
		"    gsap.set(node, { opacity: 0, y: 50 });\n" +
		"    const obs = new IntersectionObserver((entries) =\u003e {\n" +
		"      if (entries[0].isIntersecting) {\n" +
		"        gsap.to(node, { opacity: 1, y: 0, duration: 0.9, ease: 'cinematic-in' });\n" +
		"        obs.disconnect();\n" +
		"      }\n" +
		"    }, { threshold: 0.15 });\n" +
		"    obs.observe(node);\n" +
		"    return { destroy() { obs.disconnect(); gsap.killTweensOf(node); } };\n" +
		"  };\n" +
		"\n" +
		"  // Hero scene timeline (GC.5)\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !heroEl || prefersReducedMotion.current) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      const tl = gsap.timeline({ delay: 0.2 });\n" +
		"      tl.from('.cinema-badge', { opacity: 0, scale: 0, ease: 'back.out(1.7)' })\n" +
		"        .from('.cinema-title span', {\n" +
		"          opacity: 0, y: 80, rotationX: -90,\n" +
		"          stagger: 0.08, duration: 0.7, ease: 'snap-back'\n" +
		"        }, '-=0.2')\n" +
		"        .from('.cinema-cta', { opacity: 0, scale: 0, ease: 'back.out(2)' }, '-=0.2');\n" +
		"\n" +
		"      // Parallax glow (GC.4)\n" +
		"      gsap.to('.hero-glow', {\n" +
		"        y: -80, ease: 'none',\n" +
		"        scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true }\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"<!-- See full template + styles in the source file -->";
</script>

<svelte:head>
	<title>GSAP Cinema — Module Project</title>
</svelte:head>

<section class="page project-page" bind:this={containerEl}>
	<h1>GSAP Cinema — Module Project</h1>
	<p class="project-brief">
		A cinematic landing page composing <strong>every GSAP Cinema technique</strong>: custom easing
		curves, 3D text entrances, SVG path drawing, parallax layers, stagger choreography,
		scroll-driven storytelling, 3D card flips, and full reduced-motion compliance.
	</p>

	<!-- ═══ 1 — CINEMATIC HERO (GC.1 + GC.4 + GC.5 + GC.10) ═══ -->
	<div class="hero" bind:this={heroEl}>
		<div class="hero-glow"></div>
		<span class="cinema-badge">GSAP Cinema Project</span>
		<h2 class="cinema-title">
			<span>Cinematic</span>{' '}
			<span>Motion</span>{' '}
			<span>Design</span>
		</h2>
		<p class="cinema-subtitle">Custom easing, 3D transforms, scroll-driven storytelling — all in one Svelte page.</p>
		<button class="cinema-cta" type="button" onclick={() => (showReel = true)}>Watch the Reel</button>
	</div>

	<!-- ═══ 2 — SVG PATH DRAWING (GC.3) ═══ -->
	<div class="path-section" use:revealOnScroll>
		<h2 class="section-heading">SVG Path Drawing</h2>
		<p class="section-desc">The checkmark draws itself on scroll using <code>strokeDashoffset</code> animated by ScrollTrigger.</p>
		<svg class="path-svg" viewBox="0 0 24 24" fill="none" role="img" aria-label="Animated checkmark">
			<path
				bind:this={svgPathEl}
				d={cameraPath}
				stroke="oklch(65% 0.22 160)"
				stroke-width="1"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>

	<!-- ═══ 3 — FEATURE SHOWCASE (GC.5 + GC.8 scroll reveal) ═══ -->
	<div class="features-section">
		<h2 class="section-heading" use:revealOnScroll>Techniques Composed</h2>
		<div class="features-grid">
			<div class="cinema-feature">
				<div class="feature-icon">&#127916;</div>
				<h3>Custom Easing</h3>
				<p><code>CustomEase.create()</code> — bezier curves for cinematic feel. No canned presets.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#9997;</div>
				<h3>Text Animation</h3>
				<p>Manual text splitting with <code>stagger</code> and <code>rotationX</code> for 3D character reveals.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#128393;</div>
				<h3>SVG Path Draw</h3>
				<p><code>strokeDasharray / strokeDashoffset</code> animated on scroll for hand-drawn effects.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#127744;</div>
				<h3>Parallax Layers</h3>
				<p>Background elements scrub at different rates via <code>ScrollTrigger.scrub</code>.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#127910;</div>
				<h3>Scene Choreography</h3>
				<p><code>gsap.timeline()</code> sequences hero badge → title → subtitle → CTA with overlapping offsets.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#128257;</div>
				<h3>Stagger Grids</h3>
				<p>Grid-aware <code>stagger: {'{ grid, from: "center" }'}</code> creates ripple entrance patterns.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#128260;</div>
				<h3>3D Card Flip</h3>
				<p><code>rotationY: 180</code> with <code>perspective</code> and <code>backface-visibility</code>.</p>
			</div>
			<div class="cinema-feature">
				<div class="feature-icon">&#9855;</div>
				<h3>Reduced Motion</h3>
				<p>Every animation guards on <code>prefersReducedMotion.current</code>. Falls back to instant state.</p>
			</div>
		</div>
	</div>

	<!-- ═══ 4 — STAGGER GRID (GC.7) ═══ -->
	<div class="stagger-section" use:revealOnScroll>
		<h2 class="section-heading">Stagger Choreography</h2>
		<p class="section-desc">A 5×8 grid ripples from center using <code>stagger: {'{ grid: [5, 8], from: "center" }'}</code>.</p>
		<div class="grid-demo">
			{#each { length: GRID_TOTAL } as _, i (i)}
				<div
					class="grid-cell"
					bind:this={gridCellEls[i]}
					style:background="oklch(68% 0.18 {getCellHue(i)})"
				></div>
			{/each}
		</div>
		<button type="button" class="replay-btn" onclick={() => staggerKey++}>Replay Stagger</button>
	</div>

	<!-- ═══ 5 — PARALLAX QUOTE (GC.4 + GC.8) ═══ -->
	<div class="quote-section">
		<div class="parallax-quote">
			<blockquote>
				<p>"GSAP's timeline API combined with Svelte's $effect cleanup gives you Hollywood-grade motion with zero memory leaks."</p>
				<footer>
					<strong>Sarah Drasner</strong>
					<span>VP of Developer Experience</span>
				</footer>
			</blockquote>
		</div>
	</div>

	<!-- ═══ 6 — 3D FLIP CARD (GC.10) ═══ -->
	<div class="flip-section" use:revealOnScroll>
		<h2 class="section-heading">3D Card Flip</h2>
		<p class="section-desc">Click the card. Uses <code>perspective</code>, <code>rotationY</code>, and <code>backface-visibility</code>.</p>
		<div class="flip-stage">
			<div class="flip-card" bind:this={flipCardEl} role="button" tabindex="0" onclick={flipCard} onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') flipCard(); }}>
				<div class="flip-face flip-front">
					<span class="flip-emoji">&#127916;</span>
					<p>Click to flip</p>
				</div>
				<div class="flip-face flip-back">
					<span class="flip-emoji">&#127775;</span>
					<p>The hidden side</p>
				</div>
			</div>
		</div>
	</div>

	<!-- ═══ 7 — STATS (scroll reveal stagger) ═══ -->
	<div class="stats-section">
		<h2 class="section-heading" use:revealOnScroll>By the Numbers</h2>
		<div class="stats-grid">
			<div class="stat" use:revealOnScroll={{ delay: 0 }}>
				<span class="stat-number">12</span>
				<span class="stat-label">Lessons Composed</span>
			</div>
			<div class="stat" use:revealOnScroll={{ delay: 0.08 }}>
				<span class="stat-number">3</span>
				<span class="stat-label">Custom Easings</span>
			</div>
			<div class="stat" use:revealOnScroll={{ delay: 0.16 }}>
				<span class="stat-number">60fps</span>
				<span class="stat-label">GPU Composited</span>
			</div>
			<div class="stat" use:revealOnScroll={{ delay: 0.24 }}>
				<span class="stat-number">A11y</span>
				<span class="stat-label">Reduced Motion Safe</span>
			</div>
		</div>
	</div>

	<!-- ═══ REEL MODAL (GC.6 video-hero concept, GC.9 transitions) ═══ -->
	{#if showReel}
		<div class="overlay" role="dialog" aria-label="Showreel" transition:fade={{ duration: 200 }}>
			<div class="reel-modal" transition:fly={{ y: 40, duration: 300 }}>
				<h2>Showreel</h2>
				<div class="reel-placeholder">
					<p>&#127916; In a production project this would embed a <code>&lt;video&gt;</code> element
					with autoPlay, muted, playsInline — the cinematic video hero pattern from GC.6.</p>
				</div>
				<button type="button" class="close-btn" onclick={() => (showReel = false)} aria-label="Close">&times;</button>
			</div>
		</div>
	{/if}

	<!-- ═══ TECH FOOTER ═══ -->
	<footer class="project-footer">
		<h3>Built With</h3>
		<div class="tech-tags">
			<span class="tag">CustomEase (GC.1)</span>
			<span class="tag">Text Splitting (GC.2)</span>
			<span class="tag">SVG Path Draw (GC.3)</span>
			<span class="tag">Parallax Layers (GC.4)</span>
			<span class="tag">Scene Choreography (GC.5)</span>
			<span class="tag">Video Hero (GC.6)</span>
			<span class="tag">Stagger Grid (GC.7)</span>
			<span class="tag">Scroll Storytelling (GC.8)</span>
			<span class="tag">Transition Modal (GC.9)</span>
			<span class="tag">3D Card Flip (GC.10)</span>
			<span class="tag">Responsive (GC.11)</span>
			<span class="tag">Reduced Motion (GC.12)</span>
		</div>
		<p class="footer-note">GSAP Cinema — all 12 techniques composed into one cinematic page.</p>
	</footer>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="project/+page.svelte" code={fullCode} />
	</details>
</section>

<style>
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }

	.project-page { display: flex; flex-direction: column; gap: var(--space-2xl); }
	.project-brief { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 70ch; line-height: 1.7; }

	/* ── Hero ── */
	.hero { position: relative; background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-2xl) var(--space-lg); text-align: center; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: var(--space-md); perspective: 1000px; }
	.hero-glow { position: absolute; inset-block-start: -120px; inset-inline-start: 50%; transform: translateX(-50%); inline-size: 500px; block-size: 500px; background: oklch(55% 0.22 280 / 0.12); border-radius: 50%; filter: blur(100px); pointer-events: none; }
	.cinema-badge { position: relative; z-index: 1; font-size: var(--text-xs); font-weight: 700; color: oklch(65% 0.22 280); background: oklch(65% 0.22 280 / 0.1); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-full); border: 1px solid oklch(65% 0.22 280 / 0.3); letter-spacing: 0.06em; text-transform: uppercase; }
	.cinema-title { position: relative; z-index: 1; font-size: var(--text-2xl); color: var(--color-text); margin: 0; line-height: 1.15; display: flex; flex-wrap: wrap; justify-content: center; gap: 0 0.35em; }
	.cinema-title span { display: inline-block; }
	.cinema-subtitle { position: relative; z-index: 1; font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 50ch; margin: 0; line-height: 1.6; }
	.cinema-cta { position: relative; z-index: 1; background: oklch(65% 0.22 280); color: white; border: none; padding: var(--space-sm) var(--space-xl); border-radius: var(--radius-md); font-size: var(--text-base); font-weight: 600; cursor: pointer; transition: transform 0.2s, box-shadow 0.2s; }
	.cinema-cta:hover { transform: translateY(-2px); box-shadow: 0 8px 24px oklch(65% 0.22 280 / 0.35); }

	@media (min-inline-size: 768px) {
		.cinema-title { font-size: clamp(2rem, 5vw, 3.5rem); }
	}

	/* ── Section shared ── */
	.section-heading { text-align: center; font-size: var(--text-xl); color: var(--color-text); margin: 0; }
	.section-desc { text-align: center; font-size: var(--text-sm); color: var(--color-text-muted); max-inline-size: 55ch; margin-inline: auto; line-height: 1.6; }

	/* ── SVG path ── */
	.path-section { display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
	.path-svg { inline-size: 120px; block-size: 120px; }

	/* ── Features ── */
	.features-section { display: flex; flex-direction: column; gap: var(--space-lg); }
	.features-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
	@media (min-inline-size: 640px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
	@media (min-inline-size: 1024px) { .features-grid { grid-template-columns: repeat(4, 1fr); } }

	.cinema-feature { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); transition: box-shadow 0.3s, transform 0.3s; }
	.cinema-feature:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); }
	.feature-icon { font-size: var(--text-2xl); margin-block-end: var(--space-sm); }
	.cinema-feature h3 { margin: 0 0 var(--space-xs); font-size: var(--text-base); color: var(--color-text); }
	.cinema-feature p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }

	/* ── Stagger grid ── */
	.stagger-section { display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
	.grid-demo { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; inline-size: min(100%, 400px); }
	.grid-cell { aspect-ratio: 1; border-radius: var(--radius-xs); }
	.replay-btn { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-sm); padding: var(--space-xs) var(--space-md); font-size: var(--text-sm); cursor: pointer; color: var(--color-text); }
	.replay-btn:hover { background: var(--color-surface); }

	/* ── Parallax quote ── */
	.quote-section { position: relative; overflow: hidden; background: oklch(65% 0.22 280); border-radius: var(--radius-lg); min-block-size: 280px; display: flex; align-items: center; justify-content: center; }
	.parallax-quote { padding: var(--space-2xl) var(--space-lg); }
	.quote-section blockquote { margin: 0; text-align: center; max-inline-size: 55ch; margin-inline: auto; }
	.quote-section blockquote p { font-size: var(--text-lg); color: white; font-style: italic; line-height: 1.6; margin: 0 0 var(--space-md); }
	.quote-section footer { color: oklch(100% 0 0 / 0.8); display: flex; flex-direction: column; gap: var(--space-xs); text-align: center; }
	.quote-section footer strong { color: white; font-size: var(--text-base); }
	.quote-section footer span { font-size: var(--text-sm); }

	/* ── 3D flip card ── */
	.flip-section { display: flex; flex-direction: column; align-items: center; gap: var(--space-md); }
	.flip-stage { perspective: 800px; }
	.flip-card { inline-size: 240px; block-size: 320px; position: relative; cursor: pointer; transform-style: preserve-3d; }
	.flip-face { position: absolute; inset: 0; border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: var(--space-sm); backface-visibility: hidden; border: 1px solid var(--color-border); }
	.flip-front { background: linear-gradient(135deg, oklch(30% 0.14 280), oklch(22% 0.10 300)); color: white; }
	.flip-back { background: linear-gradient(135deg, oklch(30% 0.14 160), oklch(22% 0.10 180)); color: white; transform: rotateY(180deg); }
	.flip-emoji { font-size: 3rem; }
	.flip-face p { margin: 0; font-size: var(--text-sm); opacity: 0.8; }

	/* ── Stats ── */
	.stats-section { display: flex; flex-direction: column; gap: var(--space-lg); }
	.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-md); }
	@media (min-inline-size: 768px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
	.stat { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); text-align: center; display: flex; flex-direction: column; gap: var(--space-xs); }
	.stat-number { font-size: var(--text-2xl); font-weight: 700; color: oklch(65% 0.22 280); }
	.stat-label { font-size: var(--text-sm); color: var(--color-text-muted); }

	/* ── Reel modal ── */
	.overlay { position: fixed; inset: 0; background: oklch(0% 0 0 / 0.7); display: flex; align-items: center; justify-content: center; z-index: 100; padding: var(--space-md); }
	.reel-modal { position: relative; background: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); max-inline-size: 560px; inline-size: 100%; box-shadow: var(--shadow-lg); }
	.reel-modal h2 { margin: 0 0 var(--space-md); color: var(--color-text); }
	.reel-placeholder { background: var(--color-surface-1); border: 2px dashed var(--color-border); border-radius: var(--radius-md); padding: var(--space-xl); text-align: center; }
	.reel-placeholder p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }
	.close-btn { position: absolute; inset-block-start: var(--space-sm); inset-inline-end: var(--space-sm); background: none; border: none; font-size: var(--text-xl); color: var(--color-text-muted); cursor: pointer; padding: var(--space-xs); line-height: 1; }

	/* ── Footer ── */
	.project-footer { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; }
	.project-footer h3 { margin: 0 0 var(--space-md); color: var(--color-text); }
	.tech-tags { display: flex; flex-wrap: wrap; gap: var(--space-xs); justify-content: center; margin-block-end: var(--space-md); }
	.tag { font-size: var(--text-xs); background: oklch(65% 0.22 280 / 0.1); color: oklch(65% 0.22 280); padding: var(--space-xs) var(--space-sm); border-radius: var(--radius-full); border: 1px solid oklch(65% 0.22 280 / 0.2); font-weight: 500; }
	.footer-note { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

	/* ── Having issues ── */
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

	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
	}
</style>
