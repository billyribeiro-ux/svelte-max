<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let boxEl: HTMLDivElement | null = $state(null);

  function replay() {
    if (!boxEl) return;
    gsap.set(boxEl, { x: 0 });
    gsap.to(boxEl, { x: 200, duration: 1, ease: 'power2.out' });
  }

  $effect(() => {
    if (!containerEl || !boxEl) return;
    const ctx = gsap.context(() => {
      gsap.to(boxEl!, { x: 200, duration: 1, ease: 'power2.out' });
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let boxEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  function replay() {\n" +
		"    if (!boxEl) return;\n" +
		"    gsap.set(boxEl, { x: 0 });\n" +
		"    gsap.to(boxEl, { x: 200, duration: 1, ease: 'power2.out' });\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !boxEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.to(boxEl!, { x: 200, duration: 1, ease: 'power2.out' });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.2 — Installing GSAP\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e GSAP is installed via \u003ccode\u003epnpm add gsap\u003c/code\u003e. The most basic building block is \u003ccode\u003egsap.to()\u003c/code\u003e, which tweens an element from its current state to a new state. All GSAP calls must live inside \u003ccode\u003e$effect\u003c/code\u003e to ensure they only run in the browser.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003ch2\u003eYour First Tween\u003c/h2\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`import gsap from 'gsap';\n" +
		"\n" +
		"// Inside $effect — safe for SSR\n" +
		"$effect(() =\u003e \\{\n" +
		"  gsap.to('.box', \\{ x: 200, duration: 1 \\});\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"track\"\u003e\n" +
		"      \u003cdiv class=\"box\" bind:this={boxEl}\u003e\n" +
		"        \u003cspan class=\"arrow\"\u003e&#8594;\u003c/span\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cbutton onclick={replay}\u003eReplay\u003c/button\u003e\n" +
		"\n" +
		"    \u003cp class=\"note\"\u003eThe box moves 200px to the right over 1 second using \u003ccode\u003epower2.out\u003c/code\u003e easing.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eGSAP is installed with \u003ccode\u003epnpm add gsap\u003c/code\u003e — it ships as a standard npm package.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.to(target, vars)\u003c/code\u003e is the fundamental tween method.\u003c/li\u003e\n" +
		"    \u003cli\u003eAll GSAP calls must be inside \u003ccode\u003e$effect\u003c/code\u003e for SSR safety.\u003c/li\u003e\n" +
		"    \u003cli\u003eProperties like \u003ccode\u003ex\u003c/code\u003e, \u003ccode\u003ey\u003c/code\u003e, \u003ccode\u003escale\u003c/code\u003e, \u003ccode\u003erotation\u003c/code\u003e, and \u003ccode\u003eopacity\u003c/code\u003e are GSAP shorthand for CSS transforms.\u003c/li\u003e\n" +
		"    \u003cli\u003eAlways check \u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e before running GSAP animations. Module 7 project demonstrates the full pattern. In production, wrap every GSAP animation in an \u003ccode\u003eif (!prefersReducedMotion.current)\u003c/code\u003e guard.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.2 — Installing GSAP</h1>
  <p class="concept"><strong>Concept.</strong> GSAP is installed via <code>pnpm add gsap</code>. The most basic building block is <code>gsap.to()</code>, which tweens an element from its current state to a new state. All GSAP calls must live inside <code>$effect</code> to ensure they only run in the browser.</p>

  <div class="build" bind:this={containerEl}>
    <h2>Your First Tween</h2>

    <pre>{`import gsap from 'gsap';

// Inside $effect — safe for SSR
$effect(() => \{
  gsap.to('.box', \{ x: 200, duration: 1 \});
\});`}</pre>

    <div class="track">
      <div class="box" bind:this={boxEl}>
        <span class="arrow">&#8594;</span>
      </div>
    </div>

    <button onclick={replay}>Replay</button>

    <p class="note">The box moves 200px to the right over 1 second using <code>power2.out</code> easing.</p>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments expose the assumptions GSAP makes about targets, timing, and the server-side rendering boundary.</p>
	<ol class="experiments">
		<li><strong>Change <code>gsap.to(boxEl, ...)</code> to target a CSS selector like <code>'.box'</code> without a scoping container.</strong> GSAP queries the entire document, so if another page section has a <code>.box</code> class it gets animated too -- demonstrating why <code>gsap.context(fn, scope)</code> exists.</li>
		<li><strong>Set <code>duration</code> to <code>0</code>.</strong> GSAP teleports the element to its end state instantly with no interpolation, which proves that a tween with zero duration is equivalent to <code>gsap.set()</code>.</li>
		<li><strong>Remove the <code>$effect</code> wrapper and call <code>gsap.to</code> at the top-level script.</strong> During server-side rendering the DOM does not exist, so <code>boxEl</code> is <code>null</code> and the tween silently does nothing -- or crashes if you remove the null guard.</li>
		<li><strong>Pass a non-existent CSS property like <code>gsap.to(boxEl, {'{'} color: 'red', fish: 100 {'}'})</code>.</strong> GSAP ignores unknown properties without error, which means typos in property names (e.g. <code>opacty</code>) will silently fail to animate.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">GSAP is distributed as a standard npm package and installed with <code>pnpm add gsap</code>. The library's core primitive is <code>gsap.to(target, vars)</code>, which accepts either a DOM element reference or a CSS selector string and interpolates the specified properties over the given duration. GSAP provides shorthand aliases -- <code>x</code>, <code>y</code>, <code>scale</code>, <code>rotation</code>, <code>opacity</code> -- that map to their underlying CSS transform and opacity properties, saving you from writing verbose <code>transform</code> strings.</p>
	<p class="prose">Because SvelteKit renders components on the server before hydrating in the browser, all GSAP calls must be placed inside an <code>$effect</code> block. This guarantees the code only executes in the browser where the DOM exists and element references are populated. Attempting to call GSAP at the module level will either target <code>null</code> or throw, depending on how your guards are written.</p>
	<p class="prose">The <code>ease</code> parameter controls the interpolation curve. GSAP ships with a rich library of easing functions -- <code>power1</code> through <code>power4</code>, <code>back</code>, <code>bounce</code>, <code>elastic</code>, and more -- each with <code>.in</code>, <code>.out</code>, and <code>.inOut</code> variants. Choosing the right ease is what separates mechanical motion from natural-feeling animation.</p>
	<p class="next">Next, you will learn the three core tween methods: <code>to</code>, <code>from</code>, and <code>fromTo</code>.</p>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
  @media (min-inline-size: 768px) { h1 { font-size: var(--text-2xl); } }

  .track { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); min-block-size: 80px; display: flex; align-items: center; }
  .box { inline-size: 60px; block-size: 60px; background: var(--color-brand); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--color-surface); font-size: var(--text-lg); font-weight: 700; }
  .arrow { line-height: 1; }
  .note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; }
  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; align-self: flex-start; }
  button:hover { background: var(--color-brand-dim); }

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
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
