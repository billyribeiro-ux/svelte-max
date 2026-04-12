<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  interface RevealOptions {
    y?: number;
    duration?: number;
    threshold?: number;
    delay?: number;
  }

  const revealOnScroll: Action<HTMLElement, RevealOptions | undefined> = (node, params) => {
    const opts = params ?? {};
    const y = opts.y ?? 40;
    const duration = opts.duration ?? 0.8;
    const threshold = opts.threshold ?? 0.2;
    const delay = opts.delay ?? 0;

    gsap.set(node, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(node, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              ease: 'power3.out'
            });
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
        gsap.killTweensOf(node);
      }
    };
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import type { Action } from 'svelte/action';\n" +
		"\n" +
		"  interface RevealOptions {\n" +
		"    y?: number;\n" +
		"    duration?: number;\n" +
		"    threshold?: number;\n" +
		"    delay?: number;\n" +
		"  }\n" +
		"\n" +
		"  const revealOnScroll: Action\u003cHTMLElement, RevealOptions | undefined\u003e = (node, params) =\u003e {\n" +
		"    const opts = params ?? {};\n" +
		"    const y = opts.y ?? 40;\n" +
		"    const duration = opts.duration ?? 0.8;\n" +
		"    const threshold = opts.threshold ?? 0.2;\n" +
		"    const delay = opts.delay ?? 0;\n" +
		"\n" +
		"    gsap.set(node, { opacity: 0, y });\n" +
		"\n" +
		"    const observer = new IntersectionObserver(\n" +
		"      (entries) =\u003e {\n" +
		"        entries.forEach((entry) =\u003e {\n" +
		"          if (entry.isIntersecting) {\n" +
		"            gsap.to(node, {\n" +
		"              opacity: 1,\n" +
		"              y: 0,\n" +
		"              duration,\n" +
		"              delay,\n" +
		"              ease: 'power3.out'\n" +
		"            });\n" +
		"            observer.disconnect();\n" +
		"          }\n" +
		"        });\n" +
		"      },\n" +
		"      { threshold }\n" +
		"    );\n" +
		"\n" +
		"    observer.observe(node);\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        observer.disconnect();\n" +
		"        gsap.killTweensOf(node);\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.13 — Scroll Reveal Action\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e A production-grade \u003ccode\u003euse:revealOnScroll\u003c/code\u003e action combines IntersectionObserver with GSAP. The observer watches for the element to enter the viewport; once visible, it triggers a GSAP animation and disconnects. This is more performant than ScrollTrigger for simple reveal effects.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cpre\u003e{`const revealOnScroll: Action\u003cHTMLElement, Options\u003e = (node, params) =\u003e \\{\n" +
		"  gsap.set(node, \\{ opacity: 0, y: 40 \\});\n" +
		"\n" +
		"  const observer = new IntersectionObserver(\n" +
		"    (entries) =\u003e \\{\n" +
		"      entries.forEach((entry) =\u003e \\{\n" +
		"        if (entry.isIntersecting) \\{\n" +
		"          gsap.to(node, \\{ opacity: 1, y: 0, duration: 0.8 \\});\n" +
		"          observer.disconnect(); // one-shot\n" +
		"        \\}\n" +
		"      \\});\n" +
		"    \\},\n" +
		"    \\{ threshold: 0.2 \\}\n" +
		"  );\n" +
		"  observer.observe(node);\n" +
		"\n" +
		"  return \\{\n" +
		"    destroy() \\{\n" +
		"      observer.disconnect();\n" +
		"      gsap.killTweensOf(node);\n" +
		"    \\}\n" +
		"  \\};\n" +
		"\\};\n" +
		"\n" +
		"// Usage: \u003cdiv use:revealOnScroll\u003e...\u003c/div\u003e\n" +
		"// With options: \u003cdiv use:revealOnScroll=\\{\\{ y: 60, delay: 0.2 \\}\\}\u003e...\u003c/div\u003e`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cp class=\"scroll-hint\"\u003eScroll down to see the cards reveal one by one.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"reveal-grid\"\u003e\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#9733;\u003c/div\u003e\n" +
		"      \u003ch4\u003ePerformance\u003c/h4\u003e\n" +
		"      \u003cp\u003eIntersectionObserver is more efficient than scroll event listeners. No layout thrashing.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll={{ delay: 0.1 }}\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#9881;\u003c/div\u003e\n" +
		"      \u003ch4\u003eOne-Shot\u003c/h4\u003e\n" +
		"      \u003cp\u003eObserver disconnects after triggering, so no ongoing overhead.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll={{ delay: 0.2 }}\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#9889;\u003c/div\u003e\n" +
		"      \u003ch4\u003eReusable\u003c/h4\u003e\n" +
		"      \u003cp\u003eApply \u003ccode\u003euse:revealOnScroll\u003c/code\u003e to any element — no component coupling.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll={{ y: 60, delay: 0.1 }}\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#128736;\u003c/div\u003e\n" +
		"      \u003ch4\u003eConfigurable\u003c/h4\u003e\n" +
		"      \u003cp\u003ePass custom \u003ccode\u003ey\u003c/code\u003e, \u003ccode\u003eduration\u003c/code\u003e, \u003ccode\u003ethreshold\u003c/code\u003e, and \u003ccode\u003edelay\u003c/code\u003e options.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll={{ y: 60, delay: 0.2 }}\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#9855;\u003c/div\u003e\n" +
		"      \u003ch4\u003eClean Teardown\u003c/h4\u003e\n" +
		"      \u003cp\u003eThe \u003ccode\u003edestroy\u003c/code\u003e method disconnects the observer and kills GSAP tweens.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"reveal-card\" use:revealOnScroll={{ y: 60, delay: 0.3 }}\u003e\n" +
		"      \u003cdiv class=\"icon\"\u003e&#127919;\u003c/div\u003e\n" +
		"      \u003ch4\u003eProduction-Ready\u003c/h4\u003e\n" +
		"      \u003cp\u003eThis pattern is used on real marketing pages and landing pages worldwide.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer-sm\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eIntersectionObserver detects when elements enter the viewport without scroll listeners.\u003c/li\u003e\n" +
		"    \u003cli\u003eCombining IntersectionObserver with GSAP gives performant, one-shot reveal animations.\u003c/li\u003e\n" +
		"    \u003cli\u003eDisconnecting the observer after the first intersection prevents unnecessary work.\u003c/li\u003e\n" +
		"    \u003cli\u003eWrapping this pattern in a \u003ccode\u003euse:\u003c/code\u003e action makes it reusable across any element.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.13 — Scroll Reveal Action</h1>
  <p class="concept"><strong>Concept.</strong> A production-grade <code>use:revealOnScroll</code> action combines IntersectionObserver with GSAP. The observer watches for the element to enter the viewport; once visible, it triggers a GSAP animation and disconnects. This is more performant than ScrollTrigger for simple reveal effects.</p>

  <div class="build">
    <pre>{`const revealOnScroll: Action<HTMLElement, Options> = (node, params) => \{
  gsap.set(node, \{ opacity: 0, y: 40 \});

  const observer = new IntersectionObserver(
    (entries) => \{
      entries.forEach((entry) => \{
        if (entry.isIntersecting) \{
          gsap.to(node, \{ opacity: 1, y: 0, duration: 0.8 \});
          observer.disconnect(); // one-shot
        \}
      \});
    \},
    \{ threshold: 0.2 \}
  );
  observer.observe(node);

  return \{
    destroy() \{
      observer.disconnect();
      gsap.killTweensOf(node);
    \}
  \};
\};

// Usage: <div use:revealOnScroll>...</div>
// With options: <div use:revealOnScroll=\{\{ y: 60, delay: 0.2 \}\}>...</div>`}</pre>

    <p class="scroll-hint">Scroll down to see the cards reveal one by one.</p>
  </div>

  <div class="spacer"></div>

  <div class="reveal-grid">
    <div class="reveal-card" use:revealOnScroll>
      <div class="icon">&#9733;</div>
      <h4>Performance</h4>
      <p>IntersectionObserver is more efficient than scroll event listeners. No layout thrashing.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ delay: 0.1 }}>
      <div class="icon">&#9881;</div>
      <h4>One-Shot</h4>
      <p>Observer disconnects after triggering, so no ongoing overhead.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ delay: 0.2 }}>
      <div class="icon">&#9889;</div>
      <h4>Reusable</h4>
      <p>Apply <code>use:revealOnScroll</code> to any element — no component coupling.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.1 }}>
      <div class="icon">&#128736;</div>
      <h4>Configurable</h4>
      <p>Pass custom <code>y</code>, <code>duration</code>, <code>threshold</code>, and <code>delay</code> options.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.2 }}>
      <div class="icon">&#9855;</div>
      <h4>Clean Teardown</h4>
      <p>The <code>destroy</code> method disconnects the observer and kills GSAP tweens.</p>
    </div>

    <div class="reveal-card" use:revealOnScroll={{ y: 60, delay: 0.3 }}>
      <div class="icon">&#127919;</div>
      <h4>Production-Ready</h4>
      <p>This pattern is used on real marketing pages and landing pages worldwide.</p>
    </div>
  </div>

  <div class="spacer-sm"></div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments expose the interaction between IntersectionObserver configuration, GSAP timing, and action cleanup.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>observer.disconnect()</code> call inside the intersection callback.</strong> The observer keeps firing every time the element enters and exits the viewport. Combined with <code>gsap.to()</code>, this means the animation replays on every scroll-up and scroll-down, turning a one-shot reveal into an infinite loop.</li>
		<li><strong>Set <code>threshold</code> to <code>1.0</code> instead of <code>0.2</code>.</strong> The animation only fires when 100% of the element is visible in the viewport. For tall elements that exceed the viewport height, this condition is impossible to satisfy, so the reveal never triggers.</li>
		<li><strong>Remove the <code>gsap.set(node, {'{'} opacity: 0, y {'}'})</code> initial state.</strong> The element is fully visible on page load, then when the observer fires, <code>gsap.to()</code> animates from the current state (already visible) to <code>opacity: 1, y: 0</code> -- which is a no-op. The initial <code>gsap.set()</code> is essential to create the "from" state that gives the reveal something to animate toward.</li>
		<li><strong>Remove <code>gsap.killTweensOf(node)</code> from the <code>destroy()</code> method and unmount the component mid-animation.</strong> The tween continues to completion, writing inline styles to a DOM node that no longer exists in the document. While GSAP handles detached nodes gracefully, the wasted work is measurable in performance profiles.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The <code>revealOnScroll</code> action combines two APIs: the browser's native <code>IntersectionObserver</code> for efficient viewport detection, and GSAP for smooth, configurable animation. The observer watches the element with a configurable <code>threshold</code> (the fraction of the element that must be visible) and fires a callback when the condition is met. Inside the callback, a GSAP tween animates the element to its final state, and the observer immediately disconnects to prevent repeated triggers.</p>
	<p class="prose">This pattern is more performant than ScrollTrigger for simple one-shot reveals because IntersectionObserver uses the browser's internal compositor thread to detect visibility changes, avoiding layout thrashing. ScrollTrigger, by contrast, recalculates positions on every scroll frame. For a page with dozens of reveal elements, the IntersectionObserver approach has measurably lower overhead.</p>
	<p class="prose">The action's <code>destroy()</code> method performs two cleanup tasks: disconnecting the observer (which stops viewport monitoring) and calling <code>gsap.killTweensOf(node)</code> (which stops any in-progress animation). Both are necessary because the observer and the tween are independent resources. Wrapping this dual cleanup in a <code>use:</code> action makes it a drop-in directive: <code>use:revealOnScroll</code> on any element, with optional parameters for <code>y</code>, <code>duration</code>, <code>threshold</code>, and <code>delay</code>.</p>
	<p class="next">Next, you will see how GSAP and Svelte transitions coexist on the same page.</p>
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

  .spacer { block-size: 30vh; }
  .spacer-sm { block-size: 10vh; }
  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  .reveal-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-inline-size: 768px) { .reveal-grid { grid-template-columns: repeat(3, 1fr); } }

  .reveal-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
  .reveal-card .icon { font-size: var(--text-2xl); margin-block-end: var(--space-sm); }
  .reveal-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .reveal-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }

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
