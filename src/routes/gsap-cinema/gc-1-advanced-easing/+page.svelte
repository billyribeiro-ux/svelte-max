<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import gsap from 'gsap';
	import { CustomEase } from 'gsap/CustomEase';
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	gsap.registerPlugin(CustomEase);

	interface EaseDef {
		label: string;
		value: string;
		color: string;
	}

	const eases: EaseDef[] = [
		{ label: 'power1.out', value: 'power1.out', color: 'oklch(70% 0.18 30)' },
		{ label: 'power4.out', value: 'power4.out', color: 'oklch(65% 0.20 60)' },
		{ label: 'elastic.out', value: 'elastic.out(1, 0.3)', color: 'oklch(70% 0.22 140)' },
		{ label: 'bounce.out', value: 'bounce.out', color: 'oklch(65% 0.18 200)' },
		{ label: 'back.out', value: 'back.out(1.7)', color: 'oklch(60% 0.20 260)' },
		{ label: 'circ.out', value: 'circ.out', color: 'oklch(65% 0.16 310)' },
		{ label: 'expo.out', value: 'expo.out', color: 'oklch(70% 0.14 350)' },
		{ label: 'custom bezier', value: 'custom-snap', color: 'oklch(75% 0.22 90)' }
	];

	let selectedEase = $state(eases[0].value);
	let soloBoxEl: HTMLDivElement | null = $state(null);
	let raceTrackEl: HTMLDivElement | null = $state(null);
	let raceBoxEls: HTMLDivElement[] = $state([]);
	let soloKey = $state(0);
	let raceKey = $state(0);

	CustomEase.create('custom-snap', 'M0,0 C0.1,0.9 0.2,1.2 0.4,1 0.5,0.92 0.65,1.05 0.75,1 0.85,0.97 0.92,1.01 1,1');

	function runSolo(): void {
		soloKey++;
	}

	function runRace(): void {
		raceKey++;
	}

	/* Solo animation */
	$effect(() => {
		void soloKey;
		if (!soloBoxEl) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			gsap.fromTo(
				soloBoxEl!,
				{ x: 0 },
				{ x: 'calc(100cqi - 3.5rem)', duration: 1.6, ease: selectedEase }
			);
		});

		return () => ctx.revert();
	});

	/* Race animation */
	$effect(() => {
		void raceKey;
		if (!raceTrackEl || raceBoxEls.length === 0) return;
		if (prefersReducedMotion.current) return;

		const ctx = gsap.context(() => {
			raceBoxEls.forEach((box, i) => {
				if (!box) return;
				gsap.fromTo(
					box,
					{ x: 0 },
					{ x: 'calc(100cqi - 3.5rem)', duration: 1.6, ease: eases[i].value }
				);
			});
		}, raceTrackEl);

		return () => ctx.revert();
	});

	/* ── Complete code for "Having issues?" ── */
	const fullCode = `<script lang="ts">
  import { prefersReducedMotion } from 'svelte/motion';
  import gsap from 'gsap';
  import { CustomEase } from 'gsap/CustomEase';

  gsap.registerPlugin(CustomEase);

  interface EaseDef {
    label: string;
    value: string;
    color: string;
  }

  const eases: EaseDef[] = [
    { label: 'power1.out', value: 'power1.out', color: 'oklch(70% 0.18 30)' },
    { label: 'power4.out', value: 'power4.out', color: 'oklch(65% 0.20 60)' },
    { label: 'elastic.out', value: 'elastic.out(1, 0.3)', color: 'oklch(70% 0.22 140)' },
    { label: 'bounce.out', value: 'bounce.out', color: 'oklch(65% 0.18 200)' },
    { label: 'back.out', value: 'back.out(1.7)', color: 'oklch(60% 0.20 260)' },
    { label: 'circ.out', value: 'circ.out', color: 'oklch(65% 0.16 310)' },
    { label: 'expo.out', value: 'expo.out', color: 'oklch(70% 0.14 350)' },
    { label: 'custom bezier', value: 'custom-snap', color: 'oklch(75% 0.22 90)' }
  ];

  let selectedEase = $state(eases[0].value);
  let soloBoxEl: HTMLDivElement | null = $state(null);
  let raceTrackEl: HTMLDivElement | null = $state(null);
  let raceBoxEls: HTMLDivElement[] = $state([]);
  let soloKey = $state(0);
  let raceKey = $state(0);

  CustomEase.create('custom-snap',
    'M0,0 C0.1,0.9 0.2,1.2 0.4,1 0.5,0.92 0.65,1.05 0.75,1 0.85,0.97 0.92,1.01 1,1');

  function runSolo(): void { soloKey++; }
  function runRace(): void { raceKey++; }

  $effect(() => {
    void soloKey;
    if (!soloBoxEl || prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(soloBoxEl!, { x: 0 },
        { x: 'calc(100cqi - 3.5rem)', duration: 1.6, ease: selectedEase });
    });
    return () => ctx.revert();
  });

  $effect(() => {
    void raceKey;
    if (!raceTrackEl || raceBoxEls.length === 0) return;
    if (prefersReducedMotion.current) return;
    const ctx = gsap.context(() => {
      raceBoxEls.forEach((box, i) => {
        if (!box) return;
        gsap.fromTo(box, { x: 0 },
          { x: 'calc(100cqi - 3.5rem)', duration: 1.6, ease: eases[i].value });
      });
    }, raceTrackEl);
    return () => ctx.revert();
  });
<\/script>`;
</script>

<section class="page">
	<h1>GC.1 — Custom Easing & Physics Curves</h1>
	<p class="concept">
		<strong>Default easing is fine but forgettable.</strong> Custom easing creates personality — the
		bounce of a Netflix logo, the elastic snap of an Apple scroll. GSAP's
		<code>CustomEase</code> (free since 3.12) lets you define any curve as a cubic-bezier SVG path.
		Combined with built-in physics eases like <code>elastic</code>, <code>bounce</code>, and
		<code>back</code>, you can give every animation a signature feel.
	</p>

	<div class="build">
		<h2 class="section-title">Solo Ease Test</h2>
		<div class="controls">
			<label class="select-wrap">
				<span class="select-label">Ease:</span>
				<select bind:value={selectedEase} class="ease-select">
					{#each eases as ease}
						<option value={ease.value}>{ease.label}</option>
					{/each}
				</select>
			</label>
			<button type="button" class="btn" onclick={runSolo}>Play</button>
		</div>

		<div class="track solo-track">
			<div
				class="box"
				bind:this={soloBoxEl}
				style:background={eases.find((e) => e.value === selectedEase)?.color ?? eases[0].color}
			></div>
		</div>

		<h2 class="section-title race-title">All 8 Eases — Side by Side</h2>
		<button type="button" class="btn" onclick={runRace}>Race!</button>

		<div class="race-container" bind:this={raceTrackEl}>
			{#each eases as ease, i}
				<div class="race-row">
					<span class="race-label">{ease.label}</span>
					<div class="track">
						<div
							class="box"
							bind:this={raceBoxEls[i]}
							style:background={ease.color}
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<p class="prose">Intentionally breaking things is the fastest way to understand how GSAP easing actually works under the hood. Try each of these experiments, observe what happens, then undo your change before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the ease property entirely from the solo tween.</strong> GSAP defaults to <code>power1.out</code> — compare this to explicit eases and notice how subtle the default curve really is.</li>
		<li><strong>Set the elastic ease amplitude to 10 (<code>elastic.out(10, 0.3)</code>).</strong> The box will wildly overshoot the track, revealing how amplitude controls the bounce intensity beyond the target value.</li>
		<li><strong>Pass an invalid string like <code>ease: "banana"</code>.</strong> GSAP silently falls back to a linear tween with no easing curve, making the animation feel robotic and lifeless.</li>
		<li><strong>Change the race duration to 0.1 seconds.</strong> At extremely short durations, easing differences become invisible because there are not enough frames to express the curve — proving that easing needs time to breathe.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Custom easing is the single biggest lever for giving animations personality. <code>CustomEase.create()</code> accepts an SVG path string that defines any curve you can imagine, and since GSAP 3.12 it ships for free. Built-in physics eases like <code>elastic.out(1, 0.3)</code> accept amplitude and period parameters that let you fine-tune overshoot and oscillation without touching bezier math.</p>
	<p class="prose">The race comparison makes the impact visceral. Eases that look nearly identical on a graph — <code>power1.out</code> versus <code>power4.out</code> — feel completely different when applied to the same motion. Bounce and elastic are not interchangeable either: bounce simulates a ball hitting a floor, while elastic simulates a spring that overshoots and settles. Choosing the right ease is a design decision, not a technical one.</p>
	<p class="prose">Every GSAP animation in Svelte 5 follows the same lifecycle: create inside <code>$effect</code>, scope with <code>gsap.context()</code>, and return <code>ctx.revert()</code> for cleanup. This pattern prevents memory leaks and ensures animations are torn down when the component unmounts or reactive dependencies change.</p>
	<p class="next">Next lesson: character-level text animation without the SplitText plugin.</p>
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
	.race-title {
		margin-block-start: var(--space-lg);
	}
	.controls {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		flex-wrap: wrap;
	}
	.select-wrap {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
	}
	.select-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 600;
	}
	.ease-select {
		padding: var(--space-xs) var(--space-sm);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-sm);
		background: var(--color-surface-2);
		color: var(--color-text);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
	.btn {
		background: var(--color-brand);
		color: oklch(100% 0 0);
		border: none;
		padding: var(--space-xs) var(--space-md);
		border-radius: var(--radius-sm);
		cursor: pointer;
		font-size: var(--text-sm);
		font-weight: 600;
		transition: background var(--dur-fast) var(--ease-out);

		&:hover { background: var(--color-brand-dim); }
	}

	.track {
		container-type: inline-size;
		position: relative;
		block-size: 3rem;
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		overflow: hidden;
	}
	.solo-track {
		block-size: 3.5rem;
	}
	.box {
		position: absolute;
		inset-block: 0.25rem;
		inset-inline-start: 0;
		inline-size: 3rem;
		border-radius: var(--radius-sm);
	}
	.solo-track .box {
		inline-size: 3.5rem;
	}

	.race-container {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.race-row {
		display: grid;
		grid-template-columns: 8rem 1fr;
		gap: var(--space-sm);
		align-items: center;
	}
	.race-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		text-align: end;
		white-space: nowrap;
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
