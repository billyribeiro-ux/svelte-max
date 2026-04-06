<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let cardEl: HTMLDivElement | null = $state(null);

  function replay() {
    if (!cardEl) return;
    gsap.set(cardEl, { clearProps: 'all' });
    gsap.from(cardEl, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' });
  }

  $effect(() => {
    if (!containerEl || !cardEl) return;
    const ctx = gsap.context(() => {
      gsap.from(cardEl!, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out', delay: 0.2 });
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let cardEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  function replay() {\n" +
		"    if (!cardEl) return;\n" +
		"    gsap.set(cardEl, { clearProps: 'all' });\n" +
		"    gsap.from(cardEl, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out' });\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !cardEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.from(cardEl!, { y: 60, opacity: 0, scale: 0.9, duration: 0.8, ease: 'power3.out', delay: 0.2 });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.5 — bind:this for DOM Refs\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e GSAP needs real DOM elements to animate. In Svelte 5, use \u003ccode\u003ebind:this\u003c/code\u003e to capture a reference into a typed \u003ccode\u003e$state\u003c/code\u003e variable. Always guard with \u003ccode\u003eif (!el) return;\u003c/code\u003e inside \u003ccode\u003e$effect\u003c/code\u003e since the ref is \u003ccode\u003enull\u003c/code\u003e before mount.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cpre\u003e{`let cardEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"// In template:\n" +
		"// \u003cdiv bind:this=\\{cardEl\\}\u003e...\u003c/div\u003e\n" +
		"\n" +
		"$effect(() =\u003e \\{\n" +
		"  if (!cardEl) return;\n" +
		"  const ctx = gsap.context(() =\u003e \\{\n" +
		"    gsap.from(cardEl!, \\{\n" +
		"      y: 60, opacity: 0, scale: 0.9,\n" +
		"      duration: 0.8, ease: 'power3.out'\n" +
		"    \\});\n" +
		"  \\}, containerEl!);\n" +
		"  return () =\u003e ctx.revert();\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"card\" bind:this={cardEl}\u003e\n" +
		"      \u003ch4\u003eAnimated Card\u003c/h4\u003e\n" +
		"      \u003cp\u003eThis card is referenced via \u003ccode\u003ebind:this\u003c/code\u003e and animated with GSAP.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cbutton onclick={replay}\u003eReplay\u003c/button\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003ebind:this\u003c/code\u003e captures a DOM element reference into a Svelte variable.\u003c/li\u003e\n" +
		"    \u003cli\u003eType the ref as \u003ccode\u003eHTMLDivElement | null = $state(null)\u003c/code\u003e for TypeScript safety.\u003c/li\u003e\n" +
		"    \u003cli\u003eAlways null-check the ref inside \u003ccode\u003e$effect\u003c/code\u003e before passing it to GSAP.\u003c/li\u003e\n" +
		"    \u003cli\u003eUsing element refs instead of CSS selectors avoids class name collisions.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.5 — bind:this for DOM Refs</h1>
  <p class="concept"><strong>Concept.</strong> GSAP needs real DOM elements to animate. In Svelte 5, use <code>bind:this</code> to capture a reference into a typed <code>$state</code> variable. Always guard with <code>if (!el) return;</code> inside <code>$effect</code> since the ref is <code>null</code> before mount.</p>

  <div class="build" bind:this={containerEl}>
    <pre>{`let cardEl: HTMLDivElement | null = $state(null);

// In template:
// <div bind:this=\{cardEl\}>...</div>

$effect(() => \{
  if (!cardEl) return;
  const ctx = gsap.context(() => \{
    gsap.from(cardEl!, \{
      y: 60, opacity: 0, scale: 0.9,
      duration: 0.8, ease: 'power3.out'
    \});
  \}, containerEl!);
  return () => ctx.revert();
\});`}</pre>

    <div class="card" bind:this={cardEl}>
      <h4>Animated Card</h4>
      <p>This card is referenced via <code>bind:this</code> and animated with GSAP.</p>
    </div>

    <button onclick={replay}>Replay</button>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments expose the timing and type-safety constraints of DOM references in Svelte 5.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>if (!cardEl) return;</code> guard inside <code>$effect</code>.</strong> The non-null assertion <code>cardEl!</code> passes TypeScript, but on the very first effect run the ref is still <code>null</code> because the DOM has not mounted yet. GSAP receives <code>null</code> and silently does nothing -- or throws if you call a method on it.</li>
		<li><strong>Change the type from <code>HTMLDivElement</code> to <code>HTMLSpanElement</code>.</strong> TypeScript now reports a type error on the <code>bind:this</code> because the element in the template is a <code>&lt;div&gt;</code>, not a <code>&lt;span&gt;</code>. This proves that typing refs accurately catches template/script mismatches at compile time.</li>
		<li><strong>Replace <code>bind:this={'={'}cardEl{'}'}</code> with a <code>document.querySelector('.card')</code> call inside <code>$effect</code>.</strong> The animation still works, but now it is fragile: if any other component on the page also has a <code>.card</code> class, you will animate the wrong element. This is the exact problem <code>bind:this</code> solves.</li>
		<li><strong>Move the <code>gsap.from</code> call into an <code>onclick</code> handler instead of <code>$effect</code>.</strong> The animation fires on click, but now there is no automatic cleanup on unmount. If you navigate away mid-tween, GSAP holds a dangling reference to a removed DOM node.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's <code>bind:this</code> directive captures a live reference to a DOM element and stores it in a reactive <code>$state</code> variable. The variable is <code>null</code> during server-side rendering and before mount, then populated with the real DOM node once the component hydrates. This lifecycle means any code that depends on the ref must be guarded with a null check -- typically <code>if (!el) return;</code> at the top of an <code>$effect</code> block.</p>
	<p class="prose">Typing the ref precisely -- <code>HTMLDivElement | null</code> rather than a generic <code>Element | null</code> -- unlocks TypeScript's ability to verify that the ref matches the element it is bound to. If you bind a <code>&lt;button&gt;</code> to a variable typed as <code>HTMLDivElement</code>, TypeScript will flag the mismatch. This level of type safety eliminates an entire class of runtime errors where code assumes properties or methods that do not exist on the actual element.</p>
	<p class="prose">Using element refs instead of CSS selectors is a deliberate architectural choice. Selectors are global and fragile -- any component on the page with the same class name becomes a target. Refs are scoped to the component instance, making them immune to naming collisions. When combined with <code>gsap.context(fn, scope)</code>, refs give you surgical precision over which elements GSAP touches.</p>
	<p class="next">Next, you will bridge Svelte's reactive state to GSAP timelines using <code>$effect</code>.</p>
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

  .card { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); }
  .card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

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
