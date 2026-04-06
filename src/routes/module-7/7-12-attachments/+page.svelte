<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  const gsapPulse: Action<HTMLElement> = (node) => {
    const tween = gsap.to(node, {
      scale: 1.05,
      duration: 0.8,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return {
      destroy() {
        tween.kill();
      }
    };
  };

  const gsapGlow: Action<HTMLElement, { color?: string } | undefined> = (node, params) => {
    const color = params?.color ?? 'var(--color-brand)';
    const tween = gsap.to(node, {
      boxShadow: `0 0 20px ${color}`,
      duration: 1,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });

    return {
      destroy() {
        tween.kill();
      }
    };
  };

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import type { Action } from 'svelte/action';\n" +
		"\n" +
		"  const gsapPulse: Action\u003cHTMLElement\u003e = (node) =\u003e {\n" +
		"    const tween = gsap.to(node, {\n" +
		"      scale: 1.05,\n" +
		"      duration: 0.8,\n" +
		"      ease: 'sine.inOut',\n" +
		"      yoyo: true,\n" +
		"      repeat: -1\n" +
		"    });\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        tween.kill();\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\n" +
		"  const gsapGlow: Action\u003cHTMLElement, { color?: string } | undefined\u003e = (node, params) =\u003e {\n" +
		"    const color = params?.color ?? 'var(--color-brand)';\n" +
		"    const tween = gsap.to(node, {\n" +
		"      boxShadow: `0 0 20px ${color}`,\n" +
		"      duration: 1,\n" +
		"      ease: 'sine.inOut',\n" +
		"      yoyo: true,\n" +
		"      repeat: -1\n" +
		"    });\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        tween.kill();\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\u003c/script\u003e\n" +
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
  <h1>7.12 — Attachments</h1>
  <aside class="disclaimer"><strong>Experimental:</strong> <code>{'{@attach}'}</code> was introduced in Svelte 5.29 and may change. For production code today, use <code>use:</code> actions. This lesson teaches the concept so you're ready when it stabilizes.</aside>

  <p class="concept"><strong>Concept.</strong> Svelte 5.29 introduced the experimental <code>{'{@attach}'}</code> directive as a modern replacement for <code>use:</code> actions. While <code>{'{@attach}'}</code> provides a more declarative API with better TypeScript support, <code>use:</code> actions remain the stable, production-ready approach. Here we teach both.</p>

  <div class="build">
    <h2>The {'{@attach}'} Concept (Experimental)</h2>
    <pre>{`// {@attach} syntax (Svelte 5.29+, experimental)
// Attachments are functions that return a cleanup function

function gsapPulse(element: Element) \{
  const tween = gsap.to(element, \{
    scale: 1.05, yoyo: true, repeat: -1
  \});
  return () => tween.kill();
\}

// Usage in template:
// <div \{@attach gsapPulse\}>Pulsing</div>

// Key differences from use: actions:
// 1. Returns cleanup directly (no destroy method)
// 2. Receives Element, not HTMLElement
// 3. Re-runs when dependencies change
// 4. More composable — multiple attachments easy`}</pre>

    <h2>Working Demo (use: action)</h2>
    <p class="note">The demos below use the stable <code>use:</code> action API, which works identically in practice.</p>

    <div class="demo-row">
      <div class="demo-box" use:gsapPulse>
        <span>Pulse</span>
        <code>use:gsapPulse</code>
      </div>
      <div class="demo-box glow-box" use:gsapGlow={{ color: 'oklch(60% 0.20 320)' }}>
        <span>Glow</span>
        <code>use:gsapGlow</code>
      </div>
    </div>

    <h2>Comparing use: vs {'{@attach}'}</h2>
    <div class="comparison">
      <div class="compare-col">
        <h4><code>use:</code> Action</h4>
        <ul class="compare-list">
          <li>Stable, production-ready</li>
          <li>Returns <code>{'{ destroy() {} }'}}</code> object</li>
          <li>Params via second argument</li>
          <li>Well-supported tooling</li>
        </ul>
      </div>
      <div class="compare-col">
        <h4><code>{'{@attach}'}</code> Directive</h4>
        <ul class="compare-list">
          <li>Experimental (Svelte 5.29+)</li>
          <li>Returns cleanup function directly</li>
          <li>Closure captures reactive deps</li>
          <li>More declarative composition</li>
        </ul>
      </div>
    </div>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>{'{@attach}'}</code> is an experimental Svelte 5.29+ directive for element-level side effects.</li>
    <li>It returns a cleanup function directly, unlike <code>use:</code> which returns a <code>{'{ destroy() {} }'}}</code> object.</li>
    <li><code>use:</code> actions remain the stable, recommended approach for production code.</li>
    <li>Both patterns work well for wrapping GSAP animations as reusable element behaviors.</li>
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

  .note { font-size: var(--text-sm); color: var(--color-text-muted); margin: 0; font-style: italic; }

  .demo-row { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-md); }

  .demo-box { background: var(--color-brand); color: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-xl); text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-xs); }
  .demo-box span { font-weight: 700; font-size: var(--text-lg); }
  .demo-box code { background: rgba(255, 255, 255, 0.2); color: var(--color-surface); }

  .comparison { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-width: 768px) { .comparison { grid-template-columns: 1fr 1fr; } }

  .compare-col { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); }
  .compare-col h4 { margin: 0 0 var(--space-sm); color: var(--color-text); }
  .compare-list { font-size: var(--text-sm); }

  .disclaimer {
    border-left: 4px solid var(--color-warning);
    background: var(--color-surface-2);
    padding: var(--space-md) var(--space-lg);
    border-radius: var(--radius-md);
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--color-text-muted);
    margin-block-end: var(--space-md);
  }
  .disclaimer strong { color: var(--color-text); }

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
