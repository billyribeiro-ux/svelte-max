<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';
  import { afterNavigate } from '$app/navigation';

  gsap.registerPlugin(ScrollTrigger);

  let containerEl: HTMLDivElement | null = $state(null);

  afterNavigate(() => {
    ScrollTrigger.refresh();
  });

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.nav-card').forEach((card, i) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.1
        });
      });
    }, containerEl);
    return () => ctx.revert();
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import { ScrollTrigger } from 'gsap/ScrollTrigger';\n" +
		"  import { afterNavigate } from '$app/navigation';\n" +
		"\n" +
		"  gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"\n" +
		"  afterNavigate(() =\u003e {\n" +
		"    ScrollTrigger.refresh();\n" +
		"  });\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.utils.toArray\u003cHTMLElement\u003e('.nav-card').forEach((card, i) =\u003e {\n" +
		"        gsap.from(card, {\n" +
		"          opacity: 0,\n" +
		"          y: 50,\n" +
		"          duration: 0.8,\n" +
		"          ease: 'power2.out',\n" +
		"          scrollTrigger: {\n" +
		"            trigger: card,\n" +
		"            start: 'top 85%',\n" +
		"            toggleActions: 'play none none reverse'\n" +
		"          },\n" +
		"          delay: i * 0.1\n" +
		"        });\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.10 — ScrollTrigger + Navigation\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e SvelteKit uses client-side navigation, which means the page DOM changes without a full reload. ScrollTrigger caches scroll positions, so you must call \u003ccode\u003eScrollTrigger.refresh()\u003c/code\u003e after navigation. Use \u003ccode\u003eafterNavigate\u003c/code\u003e from \u003ccode\u003e$app/navigation\u003c/code\u003e and clean up with \u003ccode\u003egsap.context()\u003c/code\u003e.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cpre\u003e{`import \\{ afterNavigate \\} from '$app/navigation';\n" +
		"import \\{ ScrollTrigger \\} from 'gsap/ScrollTrigger';\n" +
		"\n" +
		"gsap.registerPlugin(ScrollTrigger);\n" +
		"\n" +
		"// Refresh ScrollTrigger after SvelteKit navigation\n" +
		"afterNavigate(() =\u003e \\{\n" +
		"  ScrollTrigger.refresh();\n" +
		"\\});\n" +
		"\n" +
		"// Setup animations with proper cleanup\n" +
		"$effect(() =\u003e \\{\n" +
		"  if (!containerEl) return;\n" +
		"  const ctx = gsap.context(() =\u003e \\{\n" +
		"    gsap.from('.card', \\{\n" +
		"      opacity: 0, y: 50,\n" +
		"      scrollTrigger: \\{\n" +
		"        trigger: '.card',\n" +
		"        start: 'top 85%'\n" +
		"      \\}\n" +
		"    \\});\n" +
		"  \\}, containerEl);\n" +
		"  return () =\u003e ctx.revert();\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cp class=\"scroll-hint\"\u003eScroll down to see cards animate in.\u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"card-stack\"\u003e\n" +
		"    \u003cdiv class=\"nav-card\"\u003e\n" +
		"      \u003ch4\u003eStep 1: Register Plugin\u003c/h4\u003e\n" +
		"      \u003cp\u003e\u003ccode\u003egsap.registerPlugin(ScrollTrigger)\u003c/code\u003e at the module level.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"nav-card\"\u003e\n" +
		"      \u003ch4\u003eStep 2: afterNavigate\u003c/h4\u003e\n" +
		"      \u003cp\u003eCall \u003ccode\u003eScrollTrigger.refresh()\u003c/code\u003e inside \u003ccode\u003eafterNavigate\u003c/code\u003e to recalculate positions.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"nav-card\"\u003e\n" +
		"      \u003ch4\u003eStep 3: gsap.context()\u003c/h4\u003e\n" +
		"      \u003cp\u003eScope all animations inside \u003ccode\u003egsap.context()\u003c/code\u003e for clean teardown.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"nav-card\"\u003e\n" +
		"      \u003ch4\u003eStep 4: ctx.revert()\u003c/h4\u003e\n" +
		"      \u003cp\u003eReturn \u003ccode\u003ectx.revert()\u003c/code\u003e from \u003ccode\u003e$effect\u003c/code\u003e to kill all scoped ScrollTriggers on unmount.\u003c/p\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"spacer-sm\"\u003e\u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eScrollTrigger caches DOM positions — call \u003ccode\u003eScrollTrigger.refresh()\u003c/code\u003e after navigation.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003eafterNavigate\u003c/code\u003e fires after every SvelteKit client-side navigation.\u003c/li\u003e\n" +
		"    \u003cli\u003eCombine \u003ccode\u003eafterNavigate\u003c/code\u003e + \u003ccode\u003egsap.context()\u003c/code\u003e for leak-free scroll animations.\u003c/li\u003e\n" +
		"    \u003cli\u003eWithout cleanup, old ScrollTriggers accumulate and cause erratic behavior.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.10 — ScrollTrigger + Navigation</h1>
  <p class="concept"><strong>Concept.</strong> SvelteKit uses client-side navigation, which means the page DOM changes without a full reload. ScrollTrigger caches scroll positions, so you must call <code>ScrollTrigger.refresh()</code> after navigation. Use <code>afterNavigate</code> from <code>$app/navigation</code> and clean up with <code>gsap.context()</code>.</p>

  <div class="build" bind:this={containerEl}>
    <pre>{`import \{ afterNavigate \} from '$app/navigation';
import \{ ScrollTrigger \} from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Refresh ScrollTrigger after SvelteKit navigation
afterNavigate(() => \{
  ScrollTrigger.refresh();
\});

// Setup animations with proper cleanup
$effect(() => \{
  if (!containerEl) return;
  const ctx = gsap.context(() => \{
    gsap.from('.card', \{
      opacity: 0, y: 50,
      scrollTrigger: \{
        trigger: '.card',
        start: 'top 85%'
      \}
    \});
  \}, containerEl);
  return () => ctx.revert();
\});`}</pre>

    <p class="scroll-hint">Scroll down to see cards animate in.</p>
  </div>

  <div class="spacer"></div>

  <div class="card-stack">
    <div class="nav-card">
      <h4>Step 1: Register Plugin</h4>
      <p><code>gsap.registerPlugin(ScrollTrigger)</code> at the module level.</p>
    </div>
    <div class="nav-card">
      <h4>Step 2: afterNavigate</h4>
      <p>Call <code>ScrollTrigger.refresh()</code> inside <code>afterNavigate</code> to recalculate positions.</p>
    </div>
    <div class="nav-card">
      <h4>Step 3: gsap.context()</h4>
      <p>Scope all animations inside <code>gsap.context()</code> for clean teardown.</p>
    </div>
    <div class="nav-card">
      <h4>Step 4: ctx.revert()</h4>
      <p>Return <code>ctx.revert()</code> from <code>$effect</code> to kill all scoped ScrollTriggers on unmount.</p>
    </div>
  </div>

  <div class="spacer-sm"></div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>ScrollTrigger caches DOM positions — call <code>ScrollTrigger.refresh()</code> after navigation.</li>
    <li><code>afterNavigate</code> fires after every SvelteKit client-side navigation.</li>
    <li>Combine <code>afterNavigate</code> + <code>gsap.context()</code> for leak-free scroll animations.</li>
    <li>Without cleanup, old ScrollTriggers accumulate and cause erratic behavior.</li>
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

  .spacer { height: 30vh; }
  .spacer-sm { height: 10vh; }
  .scroll-hint { font-size: var(--text-sm); color: var(--color-brand); font-weight: 500; margin: 0; }

  .card-stack { display: flex; flex-direction: column; gap: var(--space-md); }
  .nav-card { background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
  .nav-card h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .nav-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

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
