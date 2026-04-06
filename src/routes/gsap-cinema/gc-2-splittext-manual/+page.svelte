<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	type AnimMode = 'reveal' | 'scramble' | 'wave';

	const heroText = 'CINEMATIC';
	const chars = heroText.split('');
	const scramblePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

	let mode: AnimMode = $state('reveal');
	let charEls: HTMLSpanElement[] = $state([]);
	let triggerKey = $state(0);

	function replay(): void {
		triggerKey++;
	}

	function setMode(m: AnimMode): void {
		mode = m;
		triggerKey++;
	}

	$effect(() => {
		void triggerKey;
		void mode;
		if (charEls.length === 0) return;
		if (prefersReducedMotion.current) {
			charEls.forEach((el) => {
				if (!el) return;
				el.style.opacity = '1';
				el.style.transform = 'none';
				el.textContent = chars[charEls.indexOf(el)];
				el.style.color = '';
			});
			return;
		}

		const ctx = gsap.context(() => {
			const validEls = charEls.filter(Boolean);

			if (mode === 'reveal') {
				gsap.set(validEls, { opacity: 0, y: 60 });
				gsap.to(validEls, {
					opacity: 1,
					y: 0,
					duration: 0.6,
					stagger: 0.04,
					ease: 'power3.out'
				});
			} else if (mode === 'scramble') {
				validEls.forEach((el, i) => {
					const realChar = chars[i];
					let count = 0;
					const totalFlips = 8;
					gsap.set(el, { opacity: 1, y: 0 });
					el.textContent = scramblePool[Math.floor(Math.random() * scramblePool.length)];

					gsap.to(
						{ progress: 0 },
						{
							progress: 1,
							duration: 0.6,
							delay: i * 0.04,
							ease: 'none',
							onUpdate() {
								count++;
								if (count < totalFlips) {
									el.textContent =
										scramblePool[Math.floor(Math.random() * scramblePool.length)];
								} else {
									el.textContent = realChar;
								}
							},
							onComplete() {
								el.textContent = realChar;
							}
						}
					);
				});
			} else if (mode === 'wave') {
				validEls.forEach((el, i) => {
					gsap.set(el, { opacity: 0, y: 30, color: 'oklch(95% 0 0)' });
					gsap.to(el, {
						opacity: 1,
						y: 0,
						duration: 0.5,
						delay: i * 0.04,
						ease: 'power2.out'
					});

					const hue = 270 - (i / (validEls.length - 1)) * 540;
					const normalizedHue = ((hue % 360) + 360) % 360;

					gsap.to(el, {
						color: `oklch(75% 0.22 ${normalizedHue})`,
						duration: 0.8,
						delay: i * 0.06 + 0.3,
						ease: 'power1.inOut'
					});

					gsap.to(el, {
						color: 'oklch(95% 0 0)',
						duration: 0.6,
						delay: i * 0.06 + 1.2,
						ease: 'power1.inOut'
					});
				});
			}
		});

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';

  type AnimMode = 'reveal' | 'scramble' | 'wave';
  const heroText = 'CINEMATIC';
  const chars = heroText.split('');
  const scramblePool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#\$%&';

  let mode: AnimMode = $state('reveal');
  let charEls: HTMLSpanElement[] = $state([]);
  let triggerKey = $state(0);

  function replay(): void { triggerKey++; }
  function setMode(m: AnimMode): void { mode = m; triggerKey++; }

  $effect(() => {
    void triggerKey; void mode;
    if (charEls.length === 0) return;
    if (prefersReducedMotion.current) {
      charEls.forEach((el, i) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.textContent = chars[i];
      });
      return;
    }
    const ctx = gsap.context(() => {
      const validEls = charEls.filter(Boolean);
      if (mode === 'reveal') {
        gsap.set(validEls, { opacity: 0, y: 60 });
        gsap.to(validEls, { opacity: 1, y: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out' });
      }
      // ... scramble and wave modes
    });
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.2 — Character-Level Text Animation</h1>
	<p class="concept">
		<strong>Netflix titles don't just fade in — each character enters independently.</strong>
		SplitText is a paid GSAP plugin, but we build the same effect manually: split a string into
		<code>&lt;span&gt;</code> per character, then stagger <code>gsap.from()</code> on each span.
		Three modes: reveal (opacity + y), scramble (random characters before resolving), and color wave
		(OKLCH hue spectrum ripple).
	</p>

	<div class="build cinema-stage">
		<div class="mode-controls">
			<fieldset class="radio-group">
				<legend class="sr-only">Animation mode</legend>
				{#each ['reveal', 'scramble', 'wave'] as m}
					<label class="radio-label" class:active={mode === m}>
						<input
							type="radio"
							name="mode"
							value={m}
							checked={mode === m}
							onchange={() => setMode(m as AnimMode)}
						/>
						<span>{m.charAt(0).toUpperCase() + m.slice(1)}</span>
					</label>
				{/each}
			</fieldset>
			<button type="button" class="btn replay-btn" onclick={replay}>
				Replay
			</button>
		</div>

		<div class="hero-container" aria-label={heroText} role="img">
			{#each chars as char, i}
				<span class="hero-char" bind:this={charEls[i]}>{char}</span>
			{/each}
		</div>
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h3>What you learned</h3>
	<ul>
		<li>Split text into individual <code>&lt;span&gt;</code> elements for per-character animation control.</li>
		<li>Use <code>stagger</code> to offset each character's animation start time.</li>
		<li>The scramble effect uses <code>onUpdate</code> to swap text content during the tween.</li>
		<li>OKLCH hue shifts create perceptually uniform color waves across characters.</li>
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

	.cinema-stage {
		background: oklch(15% 0.02 270);
		border-color: oklch(25% 0.03 270);
		min-block-size: 40vh;
		justify-content: center;
		align-items: center;
	}

	.mode-controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
		justify-content: center;
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
		background: color-mix(in oklch, var(--color-brand) 80%, oklch(0% 0 0));
		color: oklch(100% 0 0);
		border: none;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: background var(--dur-fast) var(--ease-out);

		&:hover { background: var(--color-brand); }
	}
	.replay-btn {
		background: oklch(30% 0.03 270);
		border: 1px solid oklch(40% 0.04 270);

		&:hover { background: oklch(38% 0.04 270); }
	}

	.hero-container {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		gap: 0;
		padding-block: var(--space-xl);
		user-select: none;
	}
	.hero-char {
		display: inline-block;
		font-size: clamp(3rem, 10vw, 7rem);
		font-weight: 900;
		color: oklch(95% 0 0);
		line-height: 1;
		letter-spacing: 0.04em;
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
