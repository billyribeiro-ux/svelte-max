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

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>GSAP is installed with <code>pnpm add gsap</code> — it ships as a standard npm package.</li>
    <li><code>gsap.to(target, vars)</code> is the fundamental tween method.</li>
    <li>All GSAP calls must be inside <code>$effect</code> for SSR safety.</li>
    <li>Properties like <code>x</code>, <code>y</code>, <code>scale</code>, <code>rotation</code>, and <code>opacity</code> are GSAP shorthand for CSS transforms.</li>
    <li>Always check <code>prefersReducedMotion.current</code> before running GSAP animations. Module 7 project demonstrates the full pattern. In production, wrap every GSAP animation in an <code>if (!prefersReducedMotion.current)</code> guard.</li>
  </ul>
</section>

<style>
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }

  .track { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); min-height: 80px; display: flex; align-items: center; }
  .box { width: 60px; height: 60px; background: var(--color-brand); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; color: var(--color-surface); font-size: var(--text-lg); font-weight: 700; }
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
