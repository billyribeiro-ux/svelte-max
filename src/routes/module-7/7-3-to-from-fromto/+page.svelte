<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let toBox: HTMLDivElement | null = $state(null);
  let fromBox: HTMLDivElement | null = $state(null);
  let fromToBox: HTMLDivElement | null = $state(null);

  function playTo() {
    if (!toBox) return;
    gsap.set(toBox, { x: 0 });
    gsap.to(toBox, { x: 200, duration: 0.8, ease: 'power3.out' });
  }

  function playFrom() {
    if (!fromBox) return;
    gsap.from(fromBox, { opacity: 0, y: -40, duration: 0.8, ease: 'bounce.out' });
  }

  function playFromTo() {
    if (!fromToBox) return;
    gsap.fromTo(fromToBox, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });
  }

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {}, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let toBox: HTMLDivElement | null = $state(null);\n" +
		"  let fromBox: HTMLDivElement | null = $state(null);\n" +
		"  let fromToBox: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  function playTo() {\n" +
		"    if (!toBox) return;\n" +
		"    gsap.set(toBox, { x: 0 });\n" +
		"    gsap.to(toBox, { x: 200, duration: 0.8, ease: 'power3.out' });\n" +
		"  }\n" +
		"\n" +
		"  function playFrom() {\n" +
		"    if (!fromBox) return;\n" +
		"    gsap.from(fromBox, { opacity: 0, y: -40, duration: 0.8, ease: 'bounce.out' });\n" +
		"  }\n" +
		"\n" +
		"  function playFromTo() {\n" +
		"    if (!fromToBox) return;\n" +
		"    gsap.fromTo(fromToBox, { scale: 0, rotation: -180 }, { scale: 1, rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.5)' });\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {}, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.3 — to, from, and fromTo\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e GSAP provides three core tween methods. \u003ccode\u003egsap.to()\u003c/code\u003e animates from the current state to your target. \u003ccode\u003egsap.from()\u003c/code\u003e animates from your values to the current state. \u003ccode\u003egsap.fromTo()\u003c/code\u003e gives you explicit control over both start and end states. Each accepts an easing function.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cdiv class=\"demo-row\"\u003e\n" +
		"      \u003cdiv class=\"demo\"\u003e\n" +
		"        \u003ch4\u003e\u003ccode\u003egsap.to()\u003c/code\u003e — moves right\u003c/h4\u003e\n" +
		"        \u003cdiv class=\"track\"\u003e\n" +
		"          \u003cdiv class=\"box to\" bind:this={toBox}\u003eto\u003c/div\u003e\n" +
		"        \u003c/div\u003e\n" +
		"        \u003cbutton onclick={playTo}\u003ePlay .to()\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"demo\"\u003e\n" +
		"        \u003ch4\u003e\u003ccode\u003egsap.from()\u003c/code\u003e — fades in\u003c/h4\u003e\n" +
		"        \u003cdiv class=\"track\"\u003e\n" +
		"          \u003cdiv class=\"box from\" bind:this={fromBox}\u003efrom\u003c/div\u003e\n" +
		"        \u003c/div\u003e\n" +
		"        \u003cbutton onclick={playFrom}\u003ePlay .from()\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"\n" +
		"      \u003cdiv class=\"demo\"\u003e\n" +
		"        \u003ch4\u003e\u003ccode\u003egsap.fromTo()\u003c/code\u003e — scales up\u003c/h4\u003e\n" +
		"        \u003cdiv class=\"track center\"\u003e\n" +
		"          \u003cdiv class=\"box fromto\" bind:this={fromToBox}\u003efromTo\u003c/div\u003e\n" +
		"        \u003c/div\u003e\n" +
		"        \u003cbutton onclick={playFromTo}\u003ePlay .fromTo()\u003c/button\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`// .to() — animate TO these values\n" +
		"gsap.to(el, \\{ x: 200, ease: 'power3.out' \\});\n" +
		"\n" +
		"// .from() — animate FROM these values\n" +
		"gsap.from(el, \\{ opacity: 0, y: -40, ease: 'bounce.out' \\});\n" +
		"\n" +
		"// .fromTo() — explicit start & end\n" +
		"gsap.fromTo(el,\n" +
		"  \\{ scale: 0, rotation: -180 \\},\n" +
		"  \\{ scale: 1, rotation: 0, ease: 'elastic.out(1, 0.5)' \\}\n" +
		");`}\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.to()\u003c/code\u003e tweens from the element's current state to the target values.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.from()\u003c/code\u003e tweens from the specified values back to the current state — great for entrance animations.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.fromTo()\u003c/code\u003e gives full control over both the start and end states.\u003c/li\u003e\n" +
		"    \u003cli\u003eGSAP ships with many easing functions: \u003ccode\u003epower3.out\u003c/code\u003e, \u003ccode\u003ebounce.out\u003c/code\u003e, \u003ccode\u003eelastic.out\u003c/code\u003e, and more.\u003c/li\u003e\n" +
		"    \u003cli\u003eAlways check \u003ccode\u003eprefersReducedMotion.current\u003c/code\u003e before running GSAP animations. Module 7 project demonstrates the full pattern. In production, wrap every GSAP animation in an \u003ccode\u003eif (!prefersReducedMotion.current)\u003c/code\u003e guard.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.3 — to, from, and fromTo</h1>
  <p class="concept"><strong>Concept.</strong> GSAP provides three core tween methods. <code>gsap.to()</code> animates from the current state to your target. <code>gsap.from()</code> animates from your values to the current state. <code>gsap.fromTo()</code> gives you explicit control over both start and end states. Each accepts an easing function.</p>

  <div class="build" bind:this={containerEl}>
    <div class="demo-row">
      <div class="demo">
        <h4><code>gsap.to()</code> — moves right</h4>
        <div class="track">
          <div class="box to" bind:this={toBox}>to</div>
        </div>
        <button onclick={playTo}>Play .to()</button>
      </div>

      <div class="demo">
        <h4><code>gsap.from()</code> — fades in</h4>
        <div class="track">
          <div class="box from" bind:this={fromBox}>from</div>
        </div>
        <button onclick={playFrom}>Play .from()</button>
      </div>

      <div class="demo">
        <h4><code>gsap.fromTo()</code> — scales up</h4>
        <div class="track center">
          <div class="box fromto" bind:this={fromToBox}>fromTo</div>
        </div>
        <button onclick={playFromTo}>Play .fromTo()</button>
      </div>
    </div>

    <pre>{`// .to() — animate TO these values
gsap.to(el, \{ x: 200, ease: 'power3.out' \});

// .from() — animate FROM these values
gsap.from(el, \{ opacity: 0, y: -40, ease: 'bounce.out' \});

// .fromTo() — explicit start & end
gsap.fromTo(el,
  \{ scale: 0, rotation: -180 \},
  \{ scale: 1, rotation: 0, ease: 'elastic.out(1, 0.5)' \}
);`}</pre>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments reveal how each tween method handles starting state, replays, and conflicting animations.</p>
	<ol class="experiments">
		<li><strong>Click "Play .from()" twice in rapid succession.</strong> The second call interrupts the first mid-tween because <code>gsap.from()</code> always starts from the specified values. Notice how the element jumps back to its <code>from</code> state before animating again, which can cause a visual flash.</li>
		<li><strong>Replace <code>gsap.fromTo()</code> with <code>gsap.to()</code> but keep both the start and end objects.</strong> <code>gsap.to()</code> only accepts one vars object, so passing two objects causes the second to be silently ignored -- the animation does not behave as intended.</li>
		<li><strong>Change the <code>bounce.out</code> ease on the <code>from()</code> tween to <code>bounce.in</code>.</strong> The element now decelerates harshly into its final position instead of bouncing naturally. This demonstrates how <code>.in</code> vs <code>.out</code> inverts the feel of an ease curve.</li>
		<li><strong>Remove the <code>gsap.set(toBox, {'{'} x: 0 {'}'})</code> reset inside <code>playTo()</code>.</strong> Clicking "Play .to()" after the first run does nothing because the element is already at <code>x: 200</code>. GSAP animates from the current state, so without a reset the tween has nowhere to go.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">GSAP exposes three tween methods that differ in how they define the animation's start and end states. <code>gsap.to()</code> uses the element's current computed style as the start and your vars object as the end. <code>gsap.from()</code> inverts this -- your vars object defines the start, and the element's existing state becomes the end. <code>gsap.fromTo()</code> removes all ambiguity by accepting two explicit objects, making it the most predictable method for animations that must be replayed reliably.</p>
	<p class="prose">Easing functions shape how interpolated values change over time. An <code>.out</code> ease starts fast and decelerates, which feels natural for entrance animations. An <code>.in</code> ease does the opposite, accelerating into the final state, which works well for exits. GSAP includes parametric eases like <code>elastic.out(amplitude, period)</code> and <code>back.out(overshoot)</code> that let you fine-tune the feel of motion without writing custom math.</p>
	<p class="prose">Understanding which method to reach for is a matter of knowing your starting conditions. If the element is already styled in CSS and you just want to animate it somewhere, use <code>to()</code>. If you want an element to appear to enter from an off-screen position, <code>from()</code> is concise. If the animation must be perfectly repeatable regardless of current state, <code>fromTo()</code> is the safest choice.</p>
	<p class="next">Next, you will sequence multiple tweens together using GSAP timelines.</p>
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

  .demo-row { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-inline-size: 768px) { .demo-row { grid-template-columns: repeat(3, 1fr); } }

  .demo { display: flex; flex-direction: column; gap: var(--space-sm); }
  .demo h4 { margin: 0; font-size: var(--text-sm); color: var(--color-text); }

  .track { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); min-block-size: 70px; display: flex; align-items: center; }
  .track.center { justify-content: center; }

  .box { inline-size: 56px; block-size: 56px; border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--color-surface); font-weight: 700; font-size: var(--text-xs); }
  .box.to { background: var(--color-brand); }
  .box.from { background: var(--color-success); }
  .box.fromto { background: var(--color-warning); }

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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
