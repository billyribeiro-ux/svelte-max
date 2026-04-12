<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface Feature {
		icon: string;
		label: string;
	}

	const features: Feature[] = [
		{ icon: '\u26A1', label: 'Lightning Fast' },
		{ icon: '\uD83D\uDD12', label: 'Bank-Grade Security' },
		{ icon: '\uD83C\uDF0D', label: 'Global CDN' }
	];

	const stats: { value: number; label: string }[] = [
		{ value: 99.9, label: 'Uptime %' },
		{ value: 150, label: 'Countries' },
		{ value: 10, label: 'ms Latency' }
	];

	let containerEl: HTMLElement | null = $state(null);
	let activeScene = $state(0);

	$effect(() => {
		if (!containerEl) return;
		if (prefersReducedMotion.current) {
			activeScene = 3;
			return;
		}

		const ctx = gsap.context(() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerEl!,
					start: 'top top',
					end: '+=300%',
					pin: true,
					scrub: 0.8,
					snap: {
						snapTo: [0, 0.25, 0.5, 0.75, 1],
						duration: { min: 0.2, max: 0.6 },
						ease: 'power1.inOut'
					},
					onUpdate: (self) => {
						activeScene = Math.min(3, Math.floor(self.progress * 4));
					}
				}
			});

			/* Scene 1: Phone fades in and centers (0-25%) */
			tl.fromTo(
				'.phone-mockup',
				{ opacity: 0, scale: 0.7, y: 60 },
				{ opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }
			);

			/* Scene 2: Phone rotates, features fly in (25-50%) */
			tl.to('.phone-mockup', {
				rotateZ: -8,
				duration: 0.5,
				ease: 'power2.inOut'
			});
			tl.fromTo(
				'.feature-item',
				{ opacity: 0, x: (i: number) => (i % 2 === 0 ? -80 : 80) },
				{ opacity: 1, x: 0, duration: 0.5, stagger: 0.12, ease: 'back.out(1.4)' },
				'-=0.3'
			);

			/* Scene 3: Screen changes, stats animate (50-75%) */
			tl.to('.phone-screen-1', { opacity: 0, duration: 0.3 });
			tl.fromTo(
				'.phone-screen-2',
				{ opacity: 0 },
				{ opacity: 1, duration: 0.3 },
				'-=0.2'
			);
			tl.fromTo(
				'.stat-item',
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
				'-=0.1'
			);

			/* Scene 4: Scale down, CTA appears (75-100%) */
			tl.to('.phone-mockup', {
				scale: 0.85,
				rotateZ: 0,
				duration: 0.5,
				ease: 'power2.inOut'
			});
			tl.to('.feature-item', { opacity: 0.5, duration: 0.3 }, '-=0.4');
			tl.fromTo(
				'.cta-button',
				{ opacity: 0, scale: 0.8, y: 20 },
				{ opacity: 1, scale: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' },
				'-=0.2'
			);
		}, containerEl!);

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLElement | null = $state(null);
  let activeScene = $state(0);

  $effect(() => {
    if (!containerEl) return;
    if (prefersReducedMotion.current) { activeScene = 3; return; }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerEl!, start: 'top top', end: '+=300%',
          pin: true, scrub: 0.8,
          snap: { snapTo: [0, 0.25, 0.5, 0.75, 1], duration: { min: 0.2, max: 0.6 } },
          onUpdate: (self) => { activeScene = Math.min(3, Math.floor(self.progress * 4)); }
        }
      });
      tl.fromTo('.phone-mockup', { opacity: 0, scale: 0.7, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' });
      // ... Scene 2, 3, 4 timelines
    }, containerEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.5 — ScrollTrigger Scene Choreography</h1>
	<p class="concept">
		<strong>Apple product pages pin a section and animate within it as you scroll.</strong>
		GSAP ScrollTrigger with <code>pin: true</code> and <code>scrub: true</code> creates this pattern.
		Multiple animations fire at different scroll progress points. <code>snap</code> locks to
		discrete "scenes," turning the scrollbar into a timeline scrubber.
	</p>

	<div class="pinned-container" bind:this={containerEl}>
		<!-- Progress dots -->
		<nav class="scene-dots" aria-label="Scene progress">
			{#each [0, 1, 2, 3] as i}
				<div
					class="dot"
					class:active={activeScene >= i}
					aria-label="Scene {i + 1}"
				>
					<span class="dot-label">{i + 1}</span>
				</div>
			{/each}
		</nav>

		<!-- Phone mockup -->
		<div class="phone-mockup">
			<div class="phone-notch"></div>
			<div class="phone-screen phone-screen-1">
				<div class="screen-gradient"></div>
				<span class="screen-text">Welcome</span>
			</div>
			<div class="phone-screen phone-screen-2">
				<div class="screen-gradient alt"></div>
				<span class="screen-text">Dashboard</span>
				<div class="screen-bars">
					<div class="bar" style:--h="60%"></div>
					<div class="bar" style:--h="85%"></div>
					<div class="bar" style:--h="45%"></div>
					<div class="bar" style:--h="70%"></div>
				</div>
			</div>
		</div>

		<!-- Feature labels -->
		<div class="features-ring">
			{#each features as feat}
				<div class="feature-item">
					<span class="feature-icon">{feat.icon}</span>
					<span class="feature-label">{feat.label}</span>
				</div>
			{/each}
		</div>

		<!-- Stats -->
		<div class="stats-row">
			{#each stats as stat}
				<div class="stat-item">
					<span class="stat-value">{stat.value}{stat.label === 'Uptime %' ? '%' : stat.label === 'ms Latency' ? 'ms' : '+'}</span>
					<span class="stat-label">{stat.label === 'Uptime %' ? 'Uptime' : stat.label === 'ms Latency' ? 'Latency' : stat.label}</span>
				</div>
			{/each}
		</div>

		<!-- CTA -->
		<button type="button" class="cta-button">Get Started Free</button>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Pinned scroll choreography has many moving parts. Breaking individual pieces reveals which config options are load-bearing and which are cosmetic.</p>
	<ol class="experiments">
		<li><strong>Remove <code>pin: true</code> from the ScrollTrigger config.</strong> The container scrolls away normally while the animation plays in empty space below. Without pinning, scroll-scrubbed animations lose their spatial anchor and the "scenes" concept falls apart.</li>
		<li><strong>Remove the <code>snap</code> configuration entirely.</strong> The animation scrubs freely without locking to discrete scene positions. Stopping mid-scene leaves the phone half-rotated and features half-visible — proving that snap is what creates clean scene boundaries.</li>
		<li><strong>Change <code>scrub: 0.8</code> to <code>scrub: 10</code>.</strong> The animation lags far behind the scroll position, creating a sluggish disconnected feeling. High scrub values add so much smoothing that the animation feels like it is ignoring the user's input.</li>
		<li><strong>Remove all negative position offsets (<code>'-=0.3'</code>, etc.) from the timeline.</strong> Every animation waits for the previous one to fully complete before starting. The choreography loses all its overlap and feels like a slideshow rather than a flowing sequence.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">ScrollTrigger's <code>pin: true</code> locks an element in viewport while the user scrolls through an extended scroll distance defined by <code>end: '+=300%'</code>. This creates a virtual canvas three times the viewport height where the scrollbar becomes a timeline scrubber. Combined with <code>scrub: 0.8</code>, the animation tracks scroll position with just enough smoothing to feel polished without feeling laggy.</p>
	<p class="prose">The <code>snap</code> property accepts an array of progress values — <code>[0, 0.25, 0.5, 0.75, 1]</code> — that define discrete stopping points. When the user releases the scroll, GSAP eases to the nearest snap point, creating clean scene boundaries. The <code>onUpdate</code> callback reads <code>self.progress</code> on every frame and sets a Svelte <code>$state</code> variable, which drives the scene indicator dots reactively without any direct DOM manipulation.</p>
	<p class="prose">The four-scene timeline demonstrates stacking: <code>fromTo</code> for entrance, <code>to</code> for mid-scene transforms, opacity cross-fades for screen swaps, and <code>back.out(1.7)</code> for the final CTA bounce. Negative position parameters overlap these animations so they feel like one continuous motion rather than four separate acts. This is the Apple product page pattern in miniature.</p>
	<p class="next">Next lesson: cinematic video hero with layered gradient overlays.</p>
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

	.pinned-container {
		position: relative;
		block-size: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-lg);
		background: linear-gradient(
			135deg,
			oklch(10% 0.03 270),
			oklch(15% 0.05 260),
			oklch(12% 0.04 280)
		);
		border-radius: var(--radius-lg);
		overflow: hidden;
		margin-block: var(--space-lg);
	}

	/* Scene progress dots */
	.scene-dots {
		position: absolute;
		inset-inline-end: var(--space-lg);
		inset-block-start: 50%;
		transform: translateY(-50%);
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		z-index: 10;
	}
	.dot {
		inline-size: 2rem;
		block-size: 2rem;
		border-radius: var(--radius-full);
		border: 2px solid oklch(40% 0.04 270);
		background: oklch(18% 0.03 270);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all var(--dur-fast) var(--ease-out);

		&.active {
			border-color: var(--color-brand);
			background: color-mix(in oklch, var(--color-brand) 30%, oklch(18% 0.03 270));
			box-shadow: 0 0 12px oklch(65% 0.22 270 / 0.3);
		}
	}
	.dot-label {
		font-size: var(--text-xs);
		font-weight: 700;
		color: oklch(60% 0.02 270);

		.dot.active & { color: oklch(90% 0.02 270); }
	}

	/* Phone mockup */
	.phone-mockup {
		position: relative;
		inline-size: clamp(180px, 25vw, 260px);
		block-size: clamp(360px, 50vw, 520px);
		background: oklch(8% 0.02 270);
		border-radius: var(--radius-xl);
		border: 3px solid oklch(30% 0.04 270);
		overflow: hidden;
		box-shadow:
			0 8px 32px oklch(0% 0 0 / 0.4),
			0 2px 8px oklch(0% 0 0 / 0.2),
			inset 0 1px 0 oklch(40% 0.04 270 / 0.3);
		opacity: 0;
	}
	.phone-notch {
		position: absolute;
		inset-block-start: 0;
		inset-inline: 30%;
		block-size: 24px;
		background: oklch(8% 0.02 270);
		border-radius: 0 0 var(--radius-md) var(--radius-md);
		z-index: 2;
	}
	.phone-screen {
		position: absolute;
		inset: 6px;
		border-radius: calc(var(--radius-xl) - 3px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: var(--space-sm);
		overflow: hidden;
	}
	.screen-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(160deg, oklch(35% 0.15 270), oklch(25% 0.12 300));

		&.alt {
			background: linear-gradient(160deg, oklch(30% 0.12 200), oklch(20% 0.10 230));
		}
	}
	.screen-text {
		position: relative;
		z-index: 1;
		font-size: var(--text-lg);
		font-weight: 700;
		color: oklch(90% 0.02 270);
	}
	.screen-bars {
		position: relative;
		z-index: 1;
		display: flex;
		gap: var(--space-xs);
		align-items: flex-end;
		block-size: 60px;
	}
	.bar {
		inline-size: 20px;
		block-size: var(--h);
		background: oklch(65% 0.18 270 / 0.7);
		border-radius: var(--radius-xs) var(--radius-xs) 0 0;
	}
	.phone-screen-2 {
		opacity: 0;
	}

	/* Features */
	.features-ring {
		display: flex;
		gap: var(--space-lg);
		flex-wrap: wrap;
		justify-content: center;
		max-inline-size: 600px;
	}
	.feature-item {
		display: flex;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-xs) var(--space-sm);
		background: oklch(18% 0.03 270 / 0.8);
		border: 1px solid oklch(30% 0.04 270);
		border-radius: var(--radius-md);
		opacity: 0;
	}
	.feature-icon {
		font-size: var(--text-lg);
	}
	.feature-label {
		font-size: var(--text-sm);
		font-weight: 600;
		color: oklch(85% 0.02 270);
		white-space: nowrap;
	}

	/* Stats */
	.stats-row {
		display: flex;
		gap: var(--space-xl);
		flex-wrap: wrap;
		justify-content: center;
	}
	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		opacity: 0;
	}
	.stat-value {
		font-size: var(--text-xl);
		font-weight: 900;
		color: oklch(85% 0.16 270);
		font-family: var(--font-mono);
	}
	.stat-label {
		font-size: var(--text-xs);
		color: oklch(55% 0.02 270);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	/* CTA */
	.cta-button {
		padding: var(--space-sm) var(--space-xl);
		background: var(--color-brand);
		color: oklch(100% 0 0);
		border: none;
		border-radius: var(--radius-full);
		font-size: var(--text-base);
		font-weight: 700;
		cursor: pointer;
		opacity: 0;
		letter-spacing: 0.02em;
		box-shadow: 0 4px 20px oklch(65% 0.22 270 / 0.3);
		transition: transform var(--dur-fast) var(--ease-out);

		&:hover { transform: scale(1.05); }
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
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
