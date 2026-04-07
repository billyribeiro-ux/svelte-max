<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(ScrollTrigger);

	interface TimelineEvent {
		year: string;
		label: string;
		color: string;
	}

	const timelineEvents: TimelineEvent[] = [
		{ year: '2010', label: 'jQuery animate', color: 'oklch(65% 0.18 220)' },
		{ year: '2015', label: 'CSS transitions', color: 'oklch(70% 0.20 160)' },
		{ year: '2020', label: 'GSAP 3', color: 'oklch(68% 0.22 130)' },
		{ year: '2025', label: 'Svelte 5 + GSAP', color: 'oklch(72% 0.24 270)' }
	];

	interface StatDef {
		start: number;
		end: number;
		suffix: string;
		label: string;
	}

	const stats: StatDef[] = [
		{ start: 12, end: 78, suffix: '%', label: 'Sites using animation' },
		{ start: 200, end: 3400, suffix: 'ms', label: 'Avg. load time saved' },
		{ start: 2, end: 47, suffix: 'x', label: 'Engagement increase' }
	];

	let containerEl: HTMLElement | null = $state(null);
	let timelineBarProgress = $state(0);
	let statValues: number[] = $state(stats.map((s) => s.start));
	let parallaxAssembled = $state(0);

	$effect(() => {
		if (!containerEl) return;

		if (prefersReducedMotion.current) {
			timelineBarProgress = 1;
			statValues = stats.map((s) => s.end);
			parallaxAssembled = 1;
			return;
		}

		const ctx = gsap.context(() => {
			/* Section 1: Timeline bar */
			ScrollTrigger.create({
				trigger: '.story-section-1',
				start: 'top 80%',
				end: 'bottom 20%',
				scrub: 1,
				onUpdate: (self) => {
					timelineBarProgress = self.progress;
				}
			});

			/* Section 2: Stats counting */
			ScrollTrigger.create({
				trigger: '.story-section-2',
				start: 'top 80%',
				end: 'bottom 20%',
				scrub: 1,
				onUpdate: (self) => {
					statValues = stats.map((s) =>
						Math.round(s.start + (s.end - s.start) * self.progress)
					);
				}
			});

			/* Section 3: Parallax assembly */
			ScrollTrigger.create({
				trigger: '.story-section-3',
				start: 'top 80%',
				end: 'bottom 20%',
				scrub: 1,
				onUpdate: (self) => {
					parallaxAssembled = self.progress;
				}
			});

			/* Animate narrative text paragraphs */
			gsap.utils.toArray<HTMLElement>('.narrative-text').forEach((el) => {
				gsap.fromTo(
					el,
					{ opacity: 0, y: 40 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: 'power2.out',
						scrollTrigger: {
							trigger: el,
							start: 'top 85%',
							end: 'top 50%',
							scrub: 1
						}
					}
				);
			});
		}, containerEl!);

		return () => ctx.revert();
	});

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  interface TimelineEvent {
    year: string; label: string; color: string;
  }

  const timelineEvents: TimelineEvent[] = [
    { year: '2010', label: 'jQuery animate', color: 'oklch(65% 0.18 220)' },
    { year: '2015', label: 'CSS transitions', color: 'oklch(70% 0.20 160)' },
    { year: '2020', label: 'GSAP 3', color: 'oklch(68% 0.22 130)' },
    { year: '2025', label: 'Svelte 5 + GSAP', color: 'oklch(72% 0.24 270)' }
  ];

  let containerEl: HTMLElement | null = $state(null);
  let timelineBarProgress = $state(0);

  $effect(() => {
    if (!containerEl) return;
    if (prefersReducedMotion.current) {
      timelineBarProgress = 1;
      return;
    }
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.story-section-1',
        start: 'top 80%', end: 'bottom 20%', scrub: 1,
        onUpdate: (self) => { timelineBarProgress = self.progress; }
      });
      gsap.utils.toArray<HTMLElement>('.narrative-text').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 85%', end: 'top 50%', scrub: 1 }
          });
      });
    }, containerEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page" bind:this={containerEl}>
	<h1>GC.8 — Scroll-Driven Storytelling</h1>
	<p class="concept">
		<strong>The Pudding, NYT Graphics, and Apple use scroll as the primary interaction.</strong>
		Content reveals progressively as the user scrolls — pinned sections, data that updates,
		annotations that appear. Combine GSAP ScrollTrigger <code>pin</code> + <code>scrub</code> for
		the animation, and progress callbacks to update text sections alongside.
	</p>

	<div class="build scroll-story">
		<h2 class="section-title">The Rise of Modern Web Animation</h2>

		<!-- Section 1: Timeline -->
		<div class="story-row story-section-1">
			<div class="viz-panel">
				<h3 class="viz-heading">Evolution</h3>
				<div class="timeline-bar-track">
					<div
						class="timeline-bar-fill"
						style:inline-size="{timelineBarProgress * 100}%"
					></div>
					{#each timelineEvents as evt, i}
						{@const threshold = (i + 1) / timelineEvents.length}
						<div
							class="timeline-marker"
							class:reached={timelineBarProgress >= threshold}
							style:inset-inline-start="{(threshold) * 100}%"
						>
							<span class="marker-year">{evt.year}</span>
							<span class="marker-dot" style:background={evt.color}></span>
							<span class="marker-label">{evt.label}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-panel">
				<p class="narrative-text">
					In the beginning, web animation meant <code>jQuery.animate()</code> — slow, layout-thrashing,
					but revolutionary for its time.
				</p>
				<p class="narrative-text">
					CSS Transitions brought GPU-accelerated motion. But complex choreography? Impossible.
				</p>
				<p class="narrative-text">
					GSAP 3 unified the timeline. One API for everything. Then Svelte 5 gave us reactive contexts
					that make cleanup automatic.
				</p>
			</div>
		</div>

		<!-- Section 2: Stats -->
		<div class="story-row story-section-2">
			<div class="viz-panel">
				<h3 class="viz-heading">By the Numbers</h3>
				<div class="stats-grid">
					{#each stats as stat, i}
						<div class="stat-card">
							<span class="stat-value">{statValues[i]}{stat.suffix}</span>
							<span class="stat-label">{stat.label}</span>
						</div>
					{/each}
				</div>
			</div>
			<div class="text-panel">
				<p class="narrative-text">
					Animation adoption has exploded. What was once reserved for Flash microsites is now standard on
					every marketing page.
				</p>
				<p class="narrative-text">
					Sites with thoughtful animation see dramatically higher engagement — users stay longer, scroll
					further, and convert more.
				</p>
			</div>
		</div>

		<!-- Section 3: Parallax Assembly -->
		<div class="story-row story-section-3">
			<div class="viz-panel">
				<h3 class="viz-heading">Layered Depth</h3>
				<div class="mini-parallax">
					<div
						class="para-layer para-sky"
						style:transform="translateY({(1 - parallaxAssembled) * -60}px)"
						style:opacity={parallaxAssembled * 0.6 + 0.4}
					></div>
					<div
						class="para-layer para-mountains"
						style:transform="translateY({(1 - parallaxAssembled) * 80}px)"
						style:opacity={parallaxAssembled}
					>
						<svg viewBox="0 0 400 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<polygon points="0,120 60,30 120,90 200,20 280,70 360,10 400,50 400,120" fill="oklch(30% 0.06 250)" />
						</svg>
					</div>
					<div
						class="para-layer para-trees"
						style:transform="translateY({(1 - parallaxAssembled) * 120}px) scale({0.8 + parallaxAssembled * 0.2})"
						style:opacity={parallaxAssembled}
					>
						<svg viewBox="0 0 400 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<polygon points="30,80 50,15 70,80" fill="oklch(22% 0.06 150)" />
							<polygon points="100,80 125,10 150,80" fill="oklch(20% 0.05 155)" />
							<polygon points="190,80 210,20 230,80" fill="oklch(24% 0.06 145)" />
							<polygon points="270,80 295,8 320,80" fill="oklch(21% 0.05 150)" />
							<polygon points="350,80 370,18 390,80" fill="oklch(23% 0.06 148)" />
						</svg>
					</div>
					<div
						class="para-layer para-ground"
						style:transform="translateY({(1 - parallaxAssembled) * 160}px)"
						style:opacity={parallaxAssembled}
					></div>
				</div>
			</div>
			<div class="text-panel">
				<p class="narrative-text">
					The final frontier: depth. Parallax layers, 3D transforms, and scroll-linked motion create
					experiences that feel like stepping into the page.
				</p>
				<p class="narrative-text">
					When you combine every technique — timelines, staggers, scroll triggers, and responsive
					breakpoints — you get cinema.
				</p>
			</div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Scroll storytelling depends on precise coordination between sticky panels, scroll triggers, and reactive state. Misalign any one piece and the narrative falls apart.</p>
	<ol class="experiments">
		<li><strong>Remove <code>position: sticky</code> from <code>.viz-panel</code>.</strong> The visualization scrolls away with the text instead of staying pinned while the narrative flows past. The entire scrollytelling layout collapses into a normal article because the sticky panel is what creates the "visualization + scrolling text" pattern.</li>
		<li><strong>Change the <code>onUpdate</code> callback to set state to a fixed value like <code>timelineBarProgress = 1</code>.</strong> The timeline bar jumps to full instantly and never responds to scroll position. This proves that the reactive bridge between ScrollTrigger's progress and Svelte's state is what makes the visualization feel alive.</li>
		<li><strong>Remove <code>scrub: 1</code> from the stats ScrollTrigger.</strong> The counting animation fires once when the section enters view and plays at its own pace, completely disconnected from scroll position. The numbers race ahead even if the user stops scrolling.</li>
		<li><strong>Set <code>min-block-size: 50vh</code> instead of <code>150vh</code> on <code>.story-row</code>.</strong> The scroll distance becomes too short for the narrative text to flow past the sticky panel. Text and visualization overlap awkwardly because there is not enough scroll runway for the story to unfold.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Scroll-driven storytelling bridges GSAP's ScrollTrigger with Svelte's reactive state system. The <code>onUpdate</code> callback receives a <code>self</code> object whose <code>progress</code> property (0 to 1) maps directly to how far the user has scrolled through the trigger zone. Assigning that progress to a <code>$state</code> variable is what makes the visualization panel reactive — the timeline bar width, stat values, and parallax positions all derive from scroll position without any imperative DOM updates.</p>
	<p class="prose">The sticky visualization pattern — a <code>position: sticky</code> panel that stays fixed while narrative text scrolls past — is the foundation of data journalism at outlets like The Pudding and NYT Graphics. The key measurement is scroll runway: each <code>.story-row</code> needs enough vertical space (<code>min-block-size: 150vh</code>) for the text to flow past the sticky panel. Too little runway and the text overlaps the visualization; too much and the reader scrolls through empty space.</p>
	<p class="prose">Multiple independent ScrollTrigger instances can coexist on the same page, each controlling a different section with different start and end positions. The counting animation uses a simple linear interpolation formula — <code>Math.round(start + (end - start) * progress)</code> — to drive number transitions that feel tied to the scroll rather than playing on a timer. This approach scales to any number of data points without additional GSAP tweens.</p>
	<p class="next">Next lesson: View Transitions API combined with GSAP for route-level animation.</p>
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
		gap: 0;
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
		padding-block-end: var(--space-lg);
		text-wrap: balance;
	}

	.story-row {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		min-block-size: 150vh;
		padding-block: var(--space-xl);
		border-block-start: 1px solid var(--color-border);
	}
	.viz-panel {
		position: sticky;
		inset-block-start: var(--space-xl);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		z-index: 2;
		align-self: flex-start;
		inline-size: 100%;
	}
	.viz-heading {
		font-size: var(--text-base);
		color: var(--color-text);
		margin: 0 0 var(--space-md);
		font-weight: 700;
	}
	.text-panel {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
		padding-block: var(--space-xl);
	}
	.narrative-text {
		font-size: var(--text-base);
		line-height: 1.7;
		color: var(--color-text-muted);
		max-inline-size: 55ch;
		margin: 0;
	}

	/* Timeline bar */
	.timeline-bar-track {
		position: relative;
		block-size: 6px;
		background: var(--color-surface-1);
		border-radius: var(--radius-full);
		margin-block: var(--space-xl) 4rem;
	}
	.timeline-bar-fill {
		position: absolute;
		inset-block: 0;
		inset-inline-start: 0;
		background: linear-gradient(90deg, oklch(65% 0.18 220), oklch(72% 0.24 270));
		border-radius: var(--radius-full);
		transition: inline-size 60ms linear;
	}
	.timeline-marker {
		position: absolute;
		inset-block-start: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		opacity: 0.3;
		transition: opacity var(--dur-fast) var(--ease-out);

		&.reached { opacity: 1; }
	}
	.marker-year {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 700;
		color: var(--color-text);
		position: absolute;
		inset-block-end: calc(100% + var(--space-sm));
		white-space: nowrap;
	}
	.marker-dot {
		inline-size: 14px;
		block-size: 14px;
		border-radius: var(--radius-full);
		border: 2px solid var(--color-surface-1);
	}
	.marker-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		position: absolute;
		inset-block-start: calc(100% + var(--space-sm));
		white-space: nowrap;
	}

	/* Stats */
	.stats-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
		gap: var(--space-md);
	}
	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--color-surface-1);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
	}
	.stat-value {
		font-family: var(--font-mono);
		font-size: var(--text-xl);
		font-weight: 900;
		color: oklch(72% 0.20 270);
	}
	.stat-label {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: center;
		text-wrap: balance;
	}

	/* Mini parallax */
	.mini-parallax {
		position: relative;
		block-size: 200px;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: oklch(20% 0.08 260);
	}
	.para-layer {
		position: absolute;
		inset-inline: 0;
		will-change: transform;
	}
	.para-sky {
		inset: 0;
		background: linear-gradient(to bottom, oklch(25% 0.10 260), oklch(40% 0.12 240));
	}
	.para-mountains {
		inset-block-end: 20%;
		block-size: 60%;

		& svg { inline-size: 100%; block-size: 100%; }
	}
	.para-trees {
		inset-block-end: 10%;
		block-size: 40%;

		& svg { inline-size: 100%; block-size: 100%; }
	}
	.para-ground {
		inset-block-end: 0;
		block-size: 15%;
		background: oklch(18% 0.04 140);
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
		.story-row {
			flex-direction: row;
		}
		.viz-panel {
			inline-size: 40%;
			flex-shrink: 0;
		}
		.text-panel {
			flex: 1;
		}
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
		.mini-parallax { block-size: 260px; }
	}
</style>
