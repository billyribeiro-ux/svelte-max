<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import gsap from 'gsap';
	import type { Attachment } from 'svelte/attachments';

	// Attachment: a function that runs on mount and returns a cleanup function.
	// No destroy() method, no object wrapper — just (node) => cleanup.
	const gsapPulse: Attachment = (node) => {
		const tween = gsap.to(node, {
			scale: 1.05,
			duration: 0.8,
			ease: 'sine.inOut',
			yoyo: true,
			repeat: -1
		});
		return () => tween.kill();
	};

	// Parameterized attachment: a factory that returns an Attachment.
	// Closure captures reactive deps — the attachment re-runs when they change.
	function gsapGlow(color: string): Attachment {
		return (node) => {
			const tween = gsap.to(node, {
				boxShadow: `0 0 20px ${color}`,
				duration: 1,
				ease: 'sine.inOut',
				yoyo: true,
				repeat: -1
			});
			return () => tween.kill();
		};
	}

	let glowColor = $state('oklch(60% 0.20 320)');

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"import type { Attachment } from 'svelte/attachments';\n" +
		"\n" +
		"// Attachment: runs on mount, returns cleanup \u2014 no destroy() method.\n" +
		"const gsapPulse: Attachment = (node) =\u003e {\n" +
		"  const tween = gsap.to(node, {\n" +
		"    scale: 1.05, duration: 0.8, ease: 'sine.inOut',\n" +
		"    yoyo: true, repeat: -1\n" +
		"  });\n" +
		"  return () =\u003e tween.kill();\n" +
		"};\n" +
		"\n" +
		"// Parameterized attachment: factory that returns Attachment.\n" +
		"// Closure captures reactive deps \u2014 re-runs when color changes.\n" +
		"function gsapGlow(color: string): Attachment {\n" +
		"  return (node) =\u003e {\n" +
		"    const tween = gsap.to(node, {\n" +
		"      boxShadow: `0 0 20px ${color}`,\n" +
		"      duration: 1, ease: 'sine.inOut',\n" +
		"      yoyo: true, repeat: -1\n" +
		"    });\n" +
		"    return () =\u003e tween.kill();\n" +
		"  };\n" +
		"}\n" +
		"\n" +
		"let glowColor = $state('oklch(60% 0.20 320)');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003cdiv class=\"box\" {@attach gsapPulse}\u003ePulse\u003c/div\u003e\n" +
		"\u003cdiv class=\"box\" {@attach gsapGlow(glowColor)}\u003eGlow\u003c/div\u003e\n" +
		"\u003cinput type=\"color\" bind:value={glowColor} /\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.12 — Attachments\u003c/h1\u003e\n" +
		"  \u003caside class=\"disclaimer\"\u003e\u003cstrong\u003eExperimental:\u003c/strong\u003e \u003ccode\u003e{'{@attach}'}\u003c/code\u003e was introduced in Svelte 5.29 and may change. For production code today, use \u003ccode\u003euse:\u003c/code\u003e actions. This lesson teaches the concept so you're ready when it stabilizes.\u003c/aside\u003e\n" +
		"\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte 5.29 introduced the experimental \u003ccode\u003e{'{@attach}'}\u003c/code\u003e directive as a modern replacement for \u003ccode\u003euse:\u003c/code\u003e actions. While \u003ccode\u003e{'{@attach}'}\u003c/code\u003e provides a more declarative API with better TypeScript support, \u003ccode\u003euse:\u003c/code\u003e actions remain the stable, production-ready approach. Here we teach both.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eThe {'{@attach}'} Concept (Experimental)\u003c/h2\u003e\n" +
		"    \u003cpre\u003e{`// {@attach} syntax (Svelte 5.29+, experimental)\n" +
		"// Attachments are functions that return a cleanup function\n" +
		"\n" +
		"function gsapPulse(element: Element) \\{\n" +
		"  const tween = gsap.to(element, \\{\n" +
		"    scale: 1.05, yoyo: true, repeat: -1\n" +
		"  \\});\n" +
		"  return () =\u003e tween.kill();\n" +
		"\\}\n" +
		"\n" +
		"// Usage in template:\n" +
		"// \u003cdiv \\{@attach gsapPulse\\}\u003ePulsing\u003c/div\u003e\n" +
		"\n" +
		"// Key differences from use: actions:\n" +
		"// 1. Returns cleanup directly (no destroy method)\n" +
		"// 2. Receives Element, not HTMLElement\n" +
		"// 3. Re-runs when dependencies change\n" +
		"// 4. More composable — multiple attachments easy`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003ch2\u003eWorking Demo (use: action)\u003c/h2\u003e\n" +
		"    \u003cp class=\"note\"\u003eThe demos below use the stable \u003ccode\u003euse:\u003c/code\u003e action API, which works identically in practice.\u003c/p\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"demo-row\"\u003e\n" +
		"      \u003cdiv class=\"demo-box\" use:gsapPulse\u003e\n" +
		"        \u003cspan\u003ePulse\u003c/span\u003e\n" +
		"        \u003ccode\u003euse:gsapPulse\u003c/code\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"demo-box glow-box\" use:gsapGlow={{ color: 'oklch(60% 0.20 320)' }}\u003e\n" +
		"        \u003cspan\u003eGlow\u003c/span\u003e\n" +
		"        \u003ccode\u003euse:gsapGlow\u003c/code\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003ch2\u003eComparing use: vs {'{@attach}'}\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"comparison\"\u003e\n" +
		"      \u003cdiv class=\"compare-col\"\u003e\n" +
		"        \u003ch4\u003e\u003ccode\u003euse:\u003c/code\u003e Action\u003c/h4\u003e\n" +
		"        \u003cul class=\"compare-list\"\u003e\n" +
		"          \u003cli\u003eStable, production-ready\u003c/li\u003e\n" +
		"          \u003cli\u003eReturns \u003ccode\u003e{'{ destroy() {} }'}}\u003c/code\u003e object\u003c/li\u003e\n" +
		"          \u003cli\u003eParams via second argument\u003c/li\u003e\n" +
		"          \u003cli\u003eWell-supported tooling\u003c/li\u003e\n" +
		"        \u003c/ul\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv class=\"compare-col\"\u003e\n" +
		"        \u003ch4\u003e\u003ccode\u003e{'{@attach}'}\u003c/code\u003e Directive\u003c/h4\u003e\n" +
		"        \u003cul class=\"compare-list\"\u003e\n" +
		"          \u003cli\u003eExperimental (Svelte 5.29+)\u003c/li\u003e\n" +
		"          \u003cli\u003eReturns cleanup function directly\u003c/li\u003e\n" +
		"          \u003cli\u003eClosure captures reactive deps\u003c/li\u003e\n" +
		"          \u003cli\u003eMore declarative composition\u003c/li\u003e\n" +
		"        \u003c/ul\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003e{'{@attach}'}\u003c/code\u003e is an experimental Svelte 5.29+ directive for element-level side effects.\u003c/li\u003e\n" +
		"    \u003cli\u003eIt returns a cleanup function directly, unlike \u003ccode\u003euse:\u003c/code\u003e which returns a \u003ccode\u003e{'{ destroy() {} }'}}\u003c/code\u003e object.\u003c/li\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003euse:\u003c/code\u003e actions remain the stable, recommended approach for production code.\u003c/li\u003e\n" +
		"    \u003cli\u003eBoth patterns work well for wrapping GSAP animations as reusable element behaviors.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.12 — Attachments with <code>{'{@attach}'}</code></h1>

  <p class="concept"><strong>Concept.</strong> <code>{'{@attach}'}</code> is Svelte 5's declarative element-lifecycle API (stable since 5.29). An <code>Attachment</code> is a plain function that runs when an element mounts, receives the element, and returns an optional cleanup function. It is the recommended replacement for <code>use:</code> actions — simpler shape, automatic reactive re-runs, better TypeScript inference.</p>

  <div class="build">
    <h2>The <code>{'{@attach}'}</code> pattern</h2>
    <pre>{`import gsap from 'gsap';
import type { Attachment } from 'svelte/attachments';

const gsapPulse: Attachment = (node) => {
  const tween = gsap.to(node, { scale: 1.05, yoyo: true, repeat: -1 });
  return () => tween.kill();
};

// Usage in template:
// <div {@attach gsapPulse}>Pulsing</div>

// Parameterized — a factory that returns an Attachment:
function gsapGlow(color: string): Attachment {
  return (node) => {
    const tween = gsap.to(node, { boxShadow: \`0 0 20px \${color}\` });
    return () => tween.kill();
  };
}

// <div {@attach gsapGlow(color)}>Glow</div>`}</pre>

    <h2>Live demo — real <code>{'{@attach}'}</code></h2>
    <p class="note">These boxes are driven by attachments — not <code>use:</code>. Change the color and watch the glow attachment re-run because its argument changed.</p>

    <div class="demo-row">
      <div class="demo-box" {@attach gsapPulse}>
        <span>Pulse</span>
        <code>{'{@attach gsapPulse}'}</code>
      </div>
      <div class="demo-box glow-box" {@attach gsapGlow(glowColor)}>
        <span>Glow</span>
        <code>{'{@attach gsapGlow(glowColor)}'}</code>
      </div>
    </div>

    <label class="color-control">
      Glow color:
      <input type="color" bind:value={glowColor} />
      <code>{glowColor}</code>
    </label>

    <h2>Migrating from <code>use:</code> actions</h2>
    <p class="note">If you have an existing library action, wrap it with <code>fromAction</code> to use it as an attachment — no rewrite needed.</p>
    <pre>{`import { fromAction } from 'svelte/attachments';
import { myLibraryAction } from 'some-library';

// use: form
// <div use:myLibraryAction={options}>...</div>

// attach form
// <div {@attach fromAction(myLibraryAction, () => options)}>...</div>`}</pre>

    <h2>Attachment vs <code>use:</code> action</h2>
    <div class="comparison">
      <div class="compare-col recommended">
        <h4><code>{'{@attach}'}</code> — recommended</h4>
        <ul class="compare-list">
          <li>Stable since Svelte 5.29</li>
          <li>Returns cleanup function directly</li>
          <li>Re-runs automatically on reactive dep changes</li>
          <li>Works on components, not just DOM elements</li>
          <li>Composable via <code>createAttachmentKey</code></li>
        </ul>
      </div>
      <div class="compare-col">
        <h4><code>use:</code> action — legacy</h4>
        <ul class="compare-list">
          <li>Predates runes mode</li>
          <li>Returns <code>{'{ update, destroy }'}</code> object</li>
          <li>Requires manual <code>update()</code> method</li>
          <li>DOM elements only</li>
          <li>Still supported — migrate with <code>fromAction</code></li>
        </ul>
      </div>
    </div>
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">Try each of these changes one at a time, observe what breaks, then revert before moving on.</p>
	<ol class="experiments">
		<li><strong>Remove the cleanup <code>return</code> from the <code>gsapPulse</code> attachment and let the component unmount.</strong> The infinite <code>yoyo</code> tween keeps running in GSAP's internal ticker, targeting a node that no longer exists in the DOM. This wastes CPU cycles and can cause errors if GSAP tries to read computed styles on the detached node — the cleanup function is not optional for long-running animations.</li>
		<li><strong>Pass the attachment function directly instead of a call: <code>{'{@attach gsapGlow}'}</code> vs <code>{'{@attach gsapGlow(glowColor)}'}</code>.</strong> The first form passes the factory itself as the attachment — it doesn't match the <code>Attachment</code> signature (the factory expects a <code>color</code> argument, not a node), so TypeScript errors at compile time.</li>
		<li><strong>Inline a reactive value inside the attachment closure (e.g. <code>gsap.to(node, &#123; scale: currentScale &#125;)</code>) and change that value after mount.</strong> The attachment re-runs and rebuilds the tween — the DOM doesn't update incrementally. For smooth transitions, drive the value through GSAP's own <code>to()</code> rather than re-creating the tween each time.</li>
		<li><strong>Apply both <code>{'{@attach gsapPulse}'}</code> and <code>{'{@attach gsapGlow(glowColor)}'}</code> to the same element.</strong> Both tweens run simultaneously. Because they animate different properties (<code>scale</code> vs <code>boxShadow</code>), they compose without conflict — <code>{'{@attach}'}</code> can be stacked on one element as many times as needed.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>{'{@attach}'}</code> is the canonical Svelte 5 pattern for element-level side effects. An <code>Attachment</code> is a plain function <code>(node) =&gt; cleanup</code> — no object wrappers, no <code>destroy()</code> method, no special lifecycle API. The attachment runs when the element mounts and the returned cleanup runs when it unmounts, exactly like a focused <code>$effect()</code> scoped to one element.</p>
	<p class="prose">Parameterized attachments are just higher-order functions: a factory like <code>gsapGlow(color)</code> returns a fresh <code>Attachment</code>. Because the factory call appears in the markup (<code>{'{@attach gsapGlow(color)}'}</code>), Svelte tracks reactive dependencies of its arguments. When <code>color</code> changes, the attachment is torn down and re-run — no manual <code>update()</code> method required.</p>
	<p class="prose">For existing <code>use:</code> actions from third-party libraries, <code>fromAction</code> wraps them as attachments without any rewrite. Over time, migrate your own actions to the <code>Attachment</code> signature and your entire codebase converges on one API. The core lesson: whatever you attach to an element must clean itself up — the cleanup return value is the contract.</p>
	<p class="next">Next, you will build a production-grade scroll reveal attachment combining IntersectionObserver with GSAP.</p>
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

  .note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; font-style: italic; }

  .demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }

  .demo-box { background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); }
  .demo-box span { font-weight: 700; font-size: var(--text-lg); }
  .demo-box code { background: oklch(100% 0 0 / 0.2); color: var(--color-surface); }

  .color-control { display: flex; align-items: center; gap: var(--space-sm); color: var(--color-text-muted); font-size: var(--text-sm); }
  .color-control input[type="color"] { inline-size: 2.5rem; block-size: 2rem; border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; background: none; }

  .comparison { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-inline-size: 768px) { .comparison { grid-template-columns: 1fr 1fr; } }

  .compare-col { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .compare-col.recommended { border: 1px solid var(--color-brand); background: color-mix(in oklch, var(--color-brand) 8%, var(--color-surface-2)); }
  .compare-col h4 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .compare-list { font-size: var(--text-sm); }

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
