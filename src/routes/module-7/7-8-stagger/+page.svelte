<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let gridEl: HTMLDivElement | null = $state(null);

  const gridItems = Array.from({ length: 8 }, (_, i) => i + 1);

  function replay() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      scale: 0,
      y: 30,
      duration: 0.5,
      ease: 'back.out(1.7)',
      stagger: { each: 0.08, from: 'center' }
    });
  }

  function replayEdges() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      scale: 0,
      rotation: 90,
      duration: 0.6,
      ease: 'elastic.out(1, 0.5)',
      stagger: { each: 0.1, from: 'edges' }
    });
  }

  function replayRandom() {
    if (!gridEl) return;
    const items = gridEl.querySelectorAll('.grid-item');
    gsap.set(items, { clearProps: 'all' });
    gsap.from(items, {
      opacity: 0,
      y: -50,
      duration: 0.4,
      ease: 'power2.out',
      stagger: { each: 0.06, from: 'random' }
    });
  }

  $effect(() => {
    if (!containerEl || !gridEl) return;
    const ctx = gsap.context(() => {
      gsap.from('.grid-item', {
        opacity: 0,
        scale: 0,
        y: 30,
        duration: 0.5,
        ease: 'back.out(1.7)',
        stagger: { each: 0.08, from: 'center' },
        delay: 0.3
      });
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let gridEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  const gridItems = Array.from({ length: 8 }, (_, i) =\u003e i + 1);\n" +
		"\n" +
		"  function replay() {\n" +
		"    if (!gridEl) return;\n" +
		"    const items = gridEl.querySelectorAll('.grid-item');\n" +
		"    gsap.set(items, { clearProps: 'all' });\n" +
		"    gsap.from(items, {\n" +
		"      opacity: 0,\n" +
		"      scale: 0,\n" +
		"      y: 30,\n" +
		"      duration: 0.5,\n" +
		"      ease: 'back.out(1.7)',\n" +
		"      stagger: { each: 0.08, from: 'center' }\n" +
		"    });\n" +
		"  }\n" +
		"\n" +
		"  function replayEdges() {\n" +
		"    if (!gridEl) return;\n" +
		"    const items = gridEl.querySelectorAll('.grid-item');\n" +
		"    gsap.set(items, { clearProps: 'all' });\n" +
		"    gsap.from(items, {\n" +
		"      opacity: 0,\n" +
		"      scale: 0,\n" +
		"      rotation: 90,\n" +
		"      duration: 0.6,\n" +
		"      ease: 'elastic.out(1, 0.5)',\n" +
		"      stagger: { each: 0.1, from: 'edges' }\n" +
		"    });\n" +
		"  }\n" +
		"\n" +
		"  function replayRandom() {\n" +
		"    if (!gridEl) return;\n" +
		"    const items = gridEl.querySelectorAll('.grid-item');\n" +
		"    gsap.set(items, { clearProps: 'all' });\n" +
		"    gsap.from(items, {\n" +
		"      opacity: 0,\n" +
		"      y: -50,\n" +
		"      duration: 0.4,\n" +
		"      ease: 'power2.out',\n" +
		"      stagger: { each: 0.06, from: 'random' }\n" +
		"    });\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !gridEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.from('.grid-item', {\n" +
		"        opacity: 0,\n" +
		"        scale: 0,\n" +
		"        y: 30,\n" +
		"        duration: 0.5,\n" +
		"        ease: 'back.out(1.7)',\n" +
		"        stagger: { each: 0.08, from: 'center' },\n" +
		"        delay: 0.3\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.8 — Stagger\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e The \u003ccode\u003estagger\u003c/code\u003e property offsets the start time of each element in a set. Combined with \u003ccode\u003efrom\u003c/code\u003e options like \u003ccode\u003e'center'\u003c/code\u003e, \u003ccode\u003e'edges'\u003c/code\u003e, or \u003ccode\u003e'random'\u003c/code\u003e, stagger creates polished, coordinated entrance animations.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cdiv class=\"grid\" bind:this={gridEl}\u003e\n" +
		"      {#each gridItems as item}\n" +
		"        \u003cdiv class=\"grid-item\"\u003e{item}\u003c/div\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003cbutton onclick={replay}\u003eFrom Center\u003c/button\u003e\n" +
		"      \u003cbutton onclick={replayEdges}\u003eFrom Edges\u003c/button\u003e\n" +
		"      \u003cbutton onclick={replayRandom}\u003eRandom\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`gsap.from('.grid-item', \\{\n" +
		"  opacity: 0,\n" +
		"  scale: 0,\n" +
		"  y: 30,\n" +
		"  duration: 0.5,\n" +
		"  ease: 'back.out(1.7)',\n" +
		"  stagger: \\{\n" +
		"    each: 0.08,     // delay between each\n" +
		"    from: 'center'  // start from middle\n" +
		"  \\}\n" +
		"\\});\n" +
		"\n" +
		"// Other 'from' values:\n" +
		"// 'start', 'end', 'center',\n" +
		"// 'edges', 'random', or a number (index)`}\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003estagger\u003c/code\u003e offsets animation start times across multiple elements.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003estagger.each\u003c/code\u003e sets the delay between consecutive elements.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003estagger.from\u003c/code\u003e controls the origin point: \u003ccode\u003e'center'\u003c/code\u003e, \u003ccode\u003e'edges'\u003c/code\u003e, \u003ccode\u003e'random'\u003c/code\u003e, etc.\u003c/li\u003e\n" +
		"    \u003cli\u003eStagger turns simple animations into coordinated choreography.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.8 — Stagger</h1>
  <p class="concept"><strong>Concept.</strong> The <code>stagger</code> property offsets the start time of each element in a set. Combined with <code>from</code> options like <code>'center'</code>, <code>'edges'</code>, or <code>'random'</code>, stagger creates polished, coordinated entrance animations.</p>

  <div class="build" bind:this={containerEl}>
    <div class="grid" bind:this={gridEl}>
      {#each gridItems as item}
        <div class="grid-item">{item}</div>
      {/each}
    </div>

    <div class="controls">
      <button onclick={replay}>From Center</button>
      <button onclick={replayEdges}>From Edges</button>
      <button onclick={replayRandom}>Random</button>
    </div>

    <pre>{`gsap.from('.grid-item', \{
  opacity: 0,
  scale: 0,
  y: 30,
  duration: 0.5,
  ease: 'back.out(1.7)',
  stagger: \{
    each: 0.08,     // delay between each
    from: 'center'  // start from middle
  \}
\});

// Other 'from' values:
// 'start', 'end', 'center',
// 'edges', 'random', or a number (index)`}</pre>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments expose how stagger timing, origin points, and element ordering affect the visual result.</p>
	<ol class="experiments">
		<li><strong>Set <code>stagger.each</code> to <code>2</code> (two seconds).</strong> The total animation now takes over 16 seconds for 8 elements. This reveals that total stagger duration equals <code>each * (count - 1)</code>, so large <code>each</code> values on many elements create uncomfortably long sequences.</li>
		<li><strong>Change <code>stagger.from</code> to a numeric index like <code>3</code>.</strong> The animation radiates outward from the fourth element (zero-indexed). Elements closer to index 3 animate first, those further away animate later -- proving that <code>from</code> accepts any index, not just named keywords.</li>
		<li><strong>Pass <code>stagger</code> as a plain number instead of an object: <code>stagger: 0.08</code>.</strong> The animation still works because GSAP interprets a bare number as shorthand for <code>{'{'} each: 0.08, from: 'start' {'}'}</code>. The object form is only needed when you want to customize <code>from</code>, <code>grid</code>, or <code>axis</code>.</li>
		<li><strong>Add <code>grid: [2, 4]</code> to the stagger object alongside <code>from: 'center'</code>.</strong> GSAP now treats the 8 elements as a 2-row, 4-column grid and calculates stagger delays based on 2D distance from the center. Elements in the corners animate last, creating a radial ripple effect.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>stagger</code> property transforms a single tween targeting multiple elements into a choreographed sequence. Instead of all elements animating simultaneously, each one starts with a calculated delay offset. The <code>each</code> sub-property defines the gap between consecutive elements, while <code>amount</code> (an alternative) distributes a fixed total duration evenly across all elements regardless of count.</p>
	<p class="prose">The <code>from</code> sub-property controls which element animates first. <code>'start'</code> begins at the first DOM element, <code>'end'</code> begins at the last, <code>'center'</code> begins at the middle and radiates outward, <code>'edges'</code> begins at both ends and converges inward, and <code>'random'</code> shuffles the order. You can also pass a numeric index to use any specific element as the origin. For grid layouts, adding a <code>grid</code> property enables 2D distance-based stagger calculations.</p>
	<p class="prose">Stagger is what separates amateur animations from professional ones. A grid of cards that all fade in simultaneously feels flat and lifeless. The same cards with a 60-millisecond center-out stagger feel intentional and polished. The key is restraint: stagger delays under 100ms per element create a sense of flow without making the user wait. Anything over 200ms per element starts to feel sluggish.</p>
	<p class="next">Next, you will connect animations to scroll position using GSAP's ScrollTrigger plugin.</p>
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
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-sm); }
  @media (min-width: 768px) { .grid { grid-template-columns: repeat(4, 1fr); } }

  .grid-item { background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-md); padding: var(--space-lg); text-align: center; font-weight: 700; font-size: var(--text-lg); aspect-ratio: 1; display: flex; align-items: center; justify-content: center; }

  .controls { display: flex; gap: var(--space-sm); flex-wrap: wrap; }
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
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
