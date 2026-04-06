<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';
  import { fly } from 'svelte/transition';

  let cssCard: HTMLDivElement | null = $state(null);
  let gsapCard: HTMLDivElement | null = $state(null);
  let containerEl: HTMLDivElement | null = $state(null);

  let showSvelteCard = $state(false);
  let played = $state(false);

  function playCss() {
    cssCard?.classList.remove('css-enter');
    void cssCard?.offsetWidth;
    cssCard?.classList.add('css-enter');
  }

  function playSvelte() {
    showSvelteCard = false;
    setTimeout(() => { showSvelteCard = true; }, 50);
  }

  function playGsap() {
    if (!gsapCard) return;
    gsap.fromTo(gsapCard, { opacity: 0, y: 40, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' });
  }

  $effect(() => {
    if (!containerEl || played) return;
    played = true;
    const ctx = gsap.context(() => {
      gsap.fromTo('.layer-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, delay: 0.3 });
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import { fly } from 'svelte/transition';\n" +
		"\n" +
		"  let cssCard: HTMLDivElement | null = $state(null);\n" +
		"  let gsapCard: HTMLDivElement | null = $state(null);\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  let showSvelteCard = $state(false);\n" +
		"  let played = $state(false);\n" +
		"\n" +
		"  function playCss() {\n" +
		"    cssCard?.classList.remove('css-enter');\n" +
		"    void cssCard?.offsetWidth;\n" +
		"    cssCard?.classList.add('css-enter');\n" +
		"  }\n" +
		"\n" +
		"  function playSvelte() {\n" +
		"    showSvelteCard = false;\n" +
		"    setTimeout(() =\u003e { showSvelteCard = true; }, 50);\n" +
		"  }\n" +
		"\n" +
		"  function playGsap() {\n" +
		"    if (!gsapCard) return;\n" +
		"    gsap.fromTo(gsapCard, { opacity: 0, y: 40, scale: 0.8 }, { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'back.out(1.7)' });\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || played) return;\n" +
		"    played = true;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.fromTo('.layer-label', { opacity: 0, x: -20 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.5, delay: 0.3 });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.1 — What Is GSAP?\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e The GreenSock Animation Platform (GSAP) is the industry-standard JavaScript animation library. It handles complex timelines, scroll-driven effects, and physics-based motion that go far beyond what CSS or Svelte transitions can do alone. Understanding when to use each layer is key.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003ch2\u003eThe 4 Animation Layers\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"layers\"\u003e\n" +
		"      \u003cdiv class=\"layer\"\u003e\n" +
		"        \u003cspan class=\"layer-label\"\u003e1. CSS Transitions\u003c/span\u003e\n" +
		"        \u003cp\u003eSimple hover/state changes. Zero JS needed.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"layer\"\u003e\n" +
		"        \u003cspan class=\"layer-label\"\u003e2. CSS @keyframes\u003c/span\u003e\n" +
		"        \u003cp\u003eLooping or multi-step CSS-only animations.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"layer\"\u003e\n" +
		"        \u003cspan class=\"layer-label\"\u003e3. Svelte Transitions\u003c/span\u003e\n" +
		"        \u003cp\u003eMount/unmount animations with \u003ccode\u003etransition:\u003c/code\u003e directives.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"layer\"\u003e\n" +
		"        \u003cspan class=\"layer-label\"\u003e4. GSAP\u003c/span\u003e\n" +
		"        \u003cp\u003eComplex timelines, scroll-driven, stagger, physics.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003ch2\u003eCompare: Same Card Entrance\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"demos\"\u003e\n" +
		"      \u003cdiv class=\"demo-col\"\u003e\n" +
		"        \u003ch4\u003eCSS Transition\u003c/h4\u003e\n" +
		"        \u003cdiv class=\"card css-card\" bind:this={cssCard}\u003eHello CSS\u003c/div\u003e\n" +
		"        \u003cbutton onclick={playCss}\u003eReplay\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"demo-col\"\u003e\n" +
		"        \u003ch4\u003eSvelte Transition\u003c/h4\u003e\n" +
		"        {#if showSvelteCard}\n" +
		"          \u003cdiv class=\"card svelte-card\" in:fly={{ y: 40, duration: 400 }}\u003eHello Svelte\u003c/div\u003e\n" +
		"        {:else}\n" +
		"          \u003cdiv class=\"card-placeholder\"\u003e\u003c/div\u003e\n" +
		"        {/if}\n" +
		"        \u003cbutton onclick={playSvelte}\u003eReplay\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"demo-col\"\u003e\n" +
		"        \u003ch4\u003eGSAP\u003c/h4\u003e\n" +
		"        \u003cdiv class=\"card gsap-card\" bind:this={gsapCard}\u003eHello GSAP\u003c/div\u003e\n" +
		"        \u003cbutton onclick={playGsap}\u003eReplay\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eGSAP is a professional JavaScript animation library for complex motion.\u003c/li\u003e\n" +
		"    \u003cli\u003eThere are 4 layers of web animation: CSS transitions, CSS keyframes, Svelte transitions, and GSAP.\u003c/li\u003e\n" +
		"    \u003cli\u003eUse the simplest layer that gets the job done — reach for GSAP when you need timelines, scroll effects, or fine-grained control.\u003c/li\u003e\n" +
		"    \u003cli\u003eGSAP and Svelte transitions complement each other rather than compete.\u003c/li\u003e\n" +
		"    \u003cli\u003eAlways check \u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e before running GSAP animations. Module 7 project demonstrates the full pattern. In production, wrap every GSAP animation in an \u003ccode\u003eif (!prefersReducedMotion.current)\u003c/code\u003e guard.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.1 — What Is GSAP?</h1>
  <p class="concept"><strong>Concept.</strong> The GreenSock Animation Platform (GSAP) is the industry-standard JavaScript animation library. It handles complex timelines, scroll-driven effects, and physics-based motion that go far beyond what CSS or Svelte transitions can do alone. Understanding when to use each layer is key.</p>

  <div class="build" bind:this={containerEl}>
    <h2>The 4 Animation Layers</h2>
    <div class="layers">
      <div class="layer">
        <span class="layer-label">1. CSS Transitions</span>
        <p>Simple hover/state changes. Zero JS needed.</p>
      </div>
      <div class="layer">
        <span class="layer-label">2. CSS @keyframes</span>
        <p>Looping or multi-step CSS-only animations.</p>
      </div>
      <div class="layer">
        <span class="layer-label">3. Svelte Transitions</span>
        <p>Mount/unmount animations with <code>transition:</code> directives.</p>
      </div>
      <div class="layer">
        <span class="layer-label">4. GSAP</span>
        <p>Complex timelines, scroll-driven, stagger, physics.</p>
      </div>
    </div>

    <h2>Compare: Same Card Entrance</h2>
    <div class="demos">
      <div class="demo-col">
        <h4>CSS Transition</h4>
        <div class="card css-card" bind:this={cssCard}>Hello CSS</div>
        <button onclick={playCss}>Replay</button>
      </div>

      <div class="demo-col">
        <h4>Svelte Transition</h4>
        {#if showSvelteCard}
          <div class="card svelte-card" in:fly={{ y: 40, duration: 400 }}>Hello Svelte</div>
        {:else}
          <div class="card-placeholder"></div>
        {/if}
        <button onclick={playSvelte}>Replay</button>
      </div>

      <div class="demo-col">
        <h4>GSAP</h4>
        <div class="card gsap-card" bind:this={gsapCard}>Hello GSAP</div>
        <button onclick={playGsap}>Replay</button>
      </div>
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments will deepen your understanding of the animation layer model by forcing failures and edge cases you would not encounter in normal usage.</p>
	<ol class="experiments">
		<li><strong>Remove the GSAP import and call <code>gsap.fromTo()</code> anyway.</strong> The browser throws a <code>ReferenceError</code> at runtime, confirming that GSAP is not built into browsers and must be installed as an explicit dependency.</li>
		<li><strong>Replace the <code>back.out(1.7)</code> ease with a non-existent string like <code>'wobbly'</code>.</strong> GSAP silently falls back to its default ease (<code>power1.out</code>) instead of throwing, which makes typos in ease names easy to miss during development.</li>
		<li><strong>Move the <code>gsap.fromTo</code> call outside of <code>$effect</code> into the top-level script.</strong> During SSR the <code>gsapCard</code> ref is <code>null</code> and the DOM does not exist, so the animation either crashes or silently does nothing depending on your guard clause.</li>
		<li><strong>Delete the <code>fly</code> import and keep the <code>in:fly</code> directive on the Svelte card.</strong> The compiler emits an error because Svelte transitions are compile-time features that require an explicit import, unlike GSAP which is purely runtime.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Web animation exists on a spectrum of complexity. CSS transitions and <code>@keyframes</code> handle simple, declarative state changes with zero JavaScript overhead. Svelte's <code>transition:</code> directives add mount and unmount animations that are tightly coupled to the component lifecycle. GSAP sits above both, providing a fully imperative animation engine that can orchestrate timelines, physics-based easing, scroll-driven motion, and fine-grained property control that neither CSS nor Svelte transitions can express alone.</p>
	<p class="prose">Choosing the right layer is an engineering decision, not a style preference. Reaching for GSAP when a hover effect would suffice adds bundle weight and runtime complexity for no gain. Conversely, trying to express a staggered, scroll-scrubbed entrance sequence in pure CSS leads to brittle, unmaintainable code. The principle is to use the simplest layer that fully satisfies the requirement, and escalate only when the simpler layer cannot express the desired behavior.</p>
	<p class="prose">GSAP and Svelte are complementary by design. Svelte owns reactivity and the DOM lifecycle; GSAP owns the animation timeline. Bridging them correctly -- initializing GSAP inside <code>$effect</code>, scoping with <code>gsap.context()</code>, and cleaning up on unmount -- is the pattern that every subsequent lesson in this module will reinforce.</p>
	<p class="next">Next, you will install GSAP into a SvelteKit project and write your first tween.</p>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .layers { display: flex; flex-direction: column; gap: var(--space-sm); }
  .layer { background: var(--color-surface-2); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); border-left: 3px solid var(--color-brand); }
  .layer p { margin: var(--space-xs) 0 0; font-size: var(--text-sm); color: var(--color-text-muted); }
  .layer-label { font-weight: 600; color: var(--color-text); }

  .demos { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .demos { grid-template-columns: repeat(3, 1fr); } }

  .demo-col { display: flex; flex-direction: column; gap: var(--space-sm); align-items: center; }
  .demo-col h4 { margin: 0; font-size: var(--text-sm); color: var(--color-text); }

  .card { background: var(--color-brand); color: var(--color-surface); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md); font-weight: 600; text-align: center; min-height: 60px; display: flex; align-items: center; justify-content: center; }
  .card-placeholder { min-height: 60px; }

  .css-card { animation: cssSlideIn 0.6s ease-out; }
  :global(.css-enter) { animation: cssSlideIn 0.6s ease-out; }
  @keyframes cssSlideIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; }
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
	@media (min-width: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
