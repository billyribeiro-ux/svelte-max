<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	type StaggerPattern = 'center' | 'edges' | 'random' | 'wave';

	interface PatternDef {
		label: string;
		value: StaggerPattern;
	}

	const patterns: PatternDef[] = [
		{ label: 'Center Ripple', value: 'center' },
		{ label: 'Edges Inward', value: 'edges' },
		{ label: 'Random', value: 'random' },
		{ label: 'Wave', value: 'wave' }
	];

	const ROWS = 6;
	const COLS = 6;
	const TOTAL = ROWS * COLS;

	let activePattern: StaggerPattern = $state('center');
	let gridEl: HTMLDivElement | null = $state(null);
	let cellEls: HTMLDivElement[] = $state([]);
	let triggerKey = $state(0);

	function getCellColor(index: number): string {
		const row = Math.floor(index / COLS);
		const col = index % COLS;
		const hue = (row / (ROWS - 1)) * 180 + (col / (COLS - 1)) * 180;
		return `oklch(68% 0.18 ${hue.toFixed(0)})`;
	}

	function play(pattern: StaggerPattern): void {
		activePattern = pattern;
		triggerKey++;
	}

	function replay(): void {
		triggerKey++;
	}

	$effect(() => {
		void triggerKey;
		if (cellEls.length === 0 || !gridEl) return;

		if (prefersReducedMotion.current) {
			cellEls.forEach((el) => {
				if (!el) return;
				el.style.opacity = '1';
				el.style.transform = 'none';
			});
			return;
		}

		const ctx = gsap.context(() => {
			const validEls = cellEls.filter(Boolean);
			gsap.set(validEls, { scale: 0, opacity: 0, rotation: 0 });

			const staggerConfig: gsap.StaggerVars =
				activePattern === 'wave'
					? {
							each: 0.02,
							from: 0,
							grid: [ROWS, COLS],
							onComplete: function (this: gsap.core.Tween) {
								/* no-op */
							}
						}
					: {
							grid: [ROWS, COLS],
							from: activePattern,
							each: 0.04
						};

			if (activePattern === 'wave') {
				validEls.forEach((el, i) => {
					gsap.to(el, {
						scale: 1,
						opacity: 1,
						rotation: 0,
						duration: 0.5,
						delay: Math.sin(i * 0.3) * 0.2 + (i * 0.02),
						ease: 'back.out(1.7)'
					});
				});
			} else {
				gsap.to(validEls, {
					scale: 1,
					opacity: 1,
					duration: 0.5,
					ease: 'back.out(1.7)',
					stagger: staggerConfig
				});
			}
		}, gridEl!);

		return () => ctx.revert();
	});

	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';

  type StaggerPattern = 'center' | 'edges' | 'random' | 'wave';
  const ROWS = 6;
  const COLS = 6;

  let activePattern: StaggerPattern = $state('center');
  let gridEl: HTMLDivElement | null = $state(null);
  let cellEls: HTMLDivElement[] = $state([]);
  let triggerKey = $state(0);

  function getCellColor(index: number): string {
    const row = Math.floor(index / COLS);
    const col = index % COLS;
    const hue = (row / (ROWS - 1)) * 180 + (col / (COLS - 1)) * 180;
    return \`oklch(68% 0.18 \${hue.toFixed(0)})\`;
  }

  function play(pattern: StaggerPattern): void {
    activePattern = pattern;
    triggerKey++;
  }

  $effect(() => {
    void triggerKey;
    if (cellEls.length === 0 || !gridEl) return;
    if (prefersReducedMotion.current) {
      cellEls.forEach((el) => {
        if (!el) return;
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }
    const ctx = gsap.context(() => {
      const validEls = cellEls.filter(Boolean);
      gsap.set(validEls, { scale: 0, opacity: 0 });

      if (activePattern === 'wave') {
        validEls.forEach((el, i) => {
          gsap.to(el, {
            scale: 1, opacity: 1, duration: 0.5,
            delay: Math.sin(i * 0.3) * 0.2 + (i * 0.02),
            ease: 'back.out(1.7)'
          });
        });
      } else {
        gsap.to(validEls, {
          scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)',
          stagger: { grid: [ROWS, COLS], from: activePattern, each: 0.04 }
        });
      }
    }, gridEl!);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.7 — Advanced Stagger Choreography</h1>
	<p class="concept">
		<strong>GSAP stagger goes far beyond <code>{'{ each: 0.05 }'}</code>.</strong> Grid-aware staggers
		use <code>stagger: {'{ grid: [rows, cols], from: "center", each: 0.04 }'}</code> to create a
		ripple effect from the center of a grid. Function-based staggers compute delay from the index,
		giving you wave, spiral, or random patterns. For 50+ elements, use
		<code>gsap.utils.toArray()</code> and the <code>stagger</code> property — GSAP batches these
		efficiently.
	</p>

	<div class="build">
		<h2 class="section-title">6 &times; 6 Stagger Grid</h2>
		<div class="controls">
			{#each patterns as pat}
				<button
					type="button"
					class="btn"
					class:active={activePattern === pat.value}
					onclick={() => play(pat.value)}
				>
					{pat.label}
				</button>
			{/each}
			<button type="button" class="btn replay-btn" onclick={replay}>Replay</button>
		</div>

		<div class="pattern-label">
			{#if activePattern === 'center'}
				<code>stagger: {'{ grid: [6,6], from: "center", each: 0.04 }'}</code>
			{:else if activePattern === 'edges'}
				<code>stagger: {'{ grid: [6,6], from: "edges", each: 0.04 }'}</code>
			{:else if activePattern === 'random'}
				<code>stagger: {'{ grid: [6,6], from: "random", each: 0.04 }'}</code>
			{:else}
				<code>delay: Math.sin(i * 0.3) * 0.2 + (i * 0.02)</code>
			{/if}
		</div>

		<div class="grid" bind:this={gridEl}>
			{#each { length: TOTAL } as _, i}
				<div
					class="cell"
					bind:this={cellEls[i]}
					style:background={getCellColor(i)}
				></div>
			{/each}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Grid staggers depend on GSAP knowing the spatial layout of your elements. Feed it wrong information and the patterns break in instructive ways.</p>
	<ol class="experiments">
		<li><strong>Change <code>grid: [6, 6]</code> to <code>grid: [1, 36]</code>.</strong> GSAP now thinks all 36 elements are in a single row. The "center" ripple becomes a linear outward spread from the middle element, and "edges" starts from both ends of a flat line instead of the grid perimeter.</li>
		<li><strong>Set <code>each: 2</code> instead of <code>each: 0.04</code> in the stagger config.</strong> The total animation duration explodes to over 70 seconds. The first cells appear immediately but the last ones wait ages, demonstrating that <code>each</code> is the per-element delay and total time scales linearly with element count.</li>
		<li><strong>Remove <code>gsap.set(validEls, {'{ scale: 0, opacity: 0 }'})</code> before the tween.</strong> Cells start at their natural visible state so the "to" tween animates from 1 to 1 — nothing moves. The initial reset is critical because <code>gsap.to</code> animates FROM the current state, not from zero.</li>
		<li><strong>Replace <code>back.out(1.7)</code> with <code>linear</code> on the grid tween.</strong> The cells scale up mechanically without any overshoot or bounce. The playful, springy feel disappears entirely, proving that the ease does most of the emotional heavy-lifting in stagger animations.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">GSAP's stagger system goes far beyond flat arrays. The <code>grid</code> parameter tells GSAP the 2D layout of your elements, enabling spatial patterns like <code>"center"</code> (ripple outward from the middle cell), <code>"edges"</code> (converge inward from the perimeter), and <code>"random"</code> (shuffled order for organic reveals). GSAP calculates the Euclidean distance from the origin point to each cell and uses that distance to compute the delay.</p>
	<p class="prose">The wave pattern demonstrates function-based delays that go beyond what built-in stagger presets offer. By computing <code>Math.sin(i * 0.3) * 0.2 + (i * 0.02)</code>, each cell gets a delay that combines a sinusoidal oscillation with a linear ramp, producing a wave that sweeps diagonally across the grid. You can create spiral, checkerboard, or any other custom pattern by writing the right delay function.</p>
	<p class="prose">For grids with 50+ elements, GSAP's declarative stagger property is significantly more performant than manually looping and calling <code>gsap.to</code> per element. The declarative approach creates a single tween that GSAP batches internally, reducing overhead and keeping the animation thread clear. Combined with <code>will-change: transform</code> and the <code>back.out</code> ease, even a 36-cell grid animates at 60fps.</p>
	<p class="next">Next lesson: scroll-driven data storytelling with reactive state.</p>
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
	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		flex-wrap: wrap;
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

		&:hover { background: color-mix(in oklch, var(--color-brand) 20%, var(--color-surface-2)); }
		&.active {
			background: var(--color-brand);
			color: oklch(100% 0 0);
			border-color: var(--color-brand);
		}
	}
	.replay-btn {
		margin-inline-start: auto;
	}
	.pattern-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(6, 1fr);
		gap: var(--space-xs);
		max-inline-size: 420px;
		margin-inline: auto;
		aspect-ratio: 1;
	}
	.cell {
		border-radius: var(--radius-sm);
		aspect-ratio: 1;
		will-change: transform, opacity;
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
		.grid { max-inline-size: 360px; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		.concept { max-inline-size: 72ch; }
		.grid { max-inline-size: 420px; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
		.grid { max-inline-size: 480px; }
	}
</style>
