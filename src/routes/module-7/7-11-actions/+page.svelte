<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';
  import type { Action } from 'svelte/action';

  const fadeIn: Action<HTMLElement, { duration?: number; y?: number } | undefined> = (node, params) => {
    const opts = params ?? {};
    const dur = opts.duration ?? 0.6;
    const yOffset = opts.y ?? 20;

    gsap.from(node, { opacity: 0, y: yOffset, duration: dur, ease: 'power2.out' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  const scaleIn: Action<HTMLElement> = (node) => {
    gsap.from(node, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  const slideRight: Action<HTMLElement> = (node) => {
    gsap.from(node, { x: -80, opacity: 0, duration: 0.7, ease: 'power3.out' });

    return {
      destroy() {
        gsap.killTweensOf(node);
      }
    };
  };

  let show = $state(true);

  function replay() {
    show = false;
    setTimeout(() => { show = true; }, 50);
  }

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"  import type { Action } from 'svelte/action';\n" +
		"\n" +
		"  const fadeIn: Action\u003cHTMLElement, { duration?: number; y?: number } | undefined\u003e = (node, params) =\u003e {\n" +
		"    const opts = params ?? {};\n" +
		"    const dur = opts.duration ?? 0.6;\n" +
		"    const yOffset = opts.y ?? 20;\n" +
		"\n" +
		"    gsap.from(node, { opacity: 0, y: yOffset, duration: dur, ease: 'power2.out' });\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        gsap.killTweensOf(node);\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\n" +
		"  const scaleIn: Action\u003cHTMLElement\u003e = (node) =\u003e {\n" +
		"    gsap.from(node, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(1.7)' });\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        gsap.killTweensOf(node);\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\n" +
		"  const slideRight: Action\u003cHTMLElement\u003e = (node) =\u003e {\n" +
		"    gsap.from(node, { x: -80, opacity: 0, duration: 0.7, ease: 'power3.out' });\n" +
		"\n" +
		"    return {\n" +
		"      destroy() {\n" +
		"        gsap.killTweensOf(node);\n" +
		"      }\n" +
		"    };\n" +
		"  };\n" +
		"\n" +
		"  let show = $state(true);\n" +
		"\n" +
		"  function replay() {\n" +
		"    show = false;\n" +
		"    setTimeout(() =\u003e { show = true; }, 50);\n" +
		"  }\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.11 — Svelte Actions with GSAP\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte \u003ccode\u003euse:\u003c/code\u003e actions are functions that run when an element is mounted. They are the perfect place to encapsulate GSAP animations as reusable directives. Return a \u003ccode\u003edestroy\u003c/code\u003e method to clean up tweens when the element is removed.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cpre\u003e{`import type \\{ Action \\} from 'svelte/action';\n" +
		"\n" +
		"const fadeIn: Action\u003cHTMLElement\u003e = (node) =\u003e \\{\n" +
		"  gsap.from(node, \\{\n" +
		"    opacity: 0, y: 20, duration: 0.6\n" +
		"  \\});\n" +
		"  return \\{\n" +
		"    destroy() \\{ gsap.killTweensOf(node); \\}\n" +
		"  \\};\n" +
		"\\};\n" +
		"\n" +
		"// Usage: \u003cdiv use:fadeIn\u003e...\u003c/div\u003e`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cbutton onclick={replay}\u003eReplay All\u003c/button\u003e\n" +
		"\n" +
		"    {#if show}\n" +
		"      \u003cdiv class=\"demo-cards\"\u003e\n" +
		"        \u003cdiv class=\"demo-card\" use:fadeIn={{ duration: 0.6, y: 30 }}\u003e\n" +
		"          \u003ch4\u003euse:fadeIn\u003c/h4\u003e\n" +
		"          \u003cp\u003eFades in from below with opacity and y translation.\u003c/p\u003e\n" +
		"        \u003c/div\u003e\n" +
		"\n" +
		"        \u003cdiv class=\"demo-card\" use:scaleIn\u003e\n" +
		"          \u003ch4\u003euse:scaleIn\u003c/h4\u003e\n" +
		"          \u003cp\u003eScales in from zero with a bouncy back ease.\u003c/p\u003e\n" +
		"        \u003c/div\u003e\n" +
		"\n" +
		"        \u003cdiv class=\"demo-card\" use:slideRight\u003e\n" +
		"          \u003ch4\u003euse:slideRight\u003c/h4\u003e\n" +
		"          \u003cp\u003eSlides in from the left with power3 easing.\u003c/p\u003e\n" +
		"        \u003c/div\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    {/if}\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eSvelte \u003ccode\u003euse:\u003c/code\u003e actions run GSAP animations when an element mounts.\u003c/li\u003e\n" +
		"    \u003cli\u003eReturning \u003ccode\u003edestroy()\u003c/code\u003e calls \u003ccode\u003egsap.killTweensOf(node)\u003c/code\u003e for cleanup.\u003c/li\u003e\n" +
		"    \u003cli\u003eActions make GSAP animations reusable across any element with \u003ccode\u003euse:actionName\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003eActions can accept parameters for configurable animations.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.11 — Svelte Actions with GSAP</h1>
  <p class="concept"><strong>Concept.</strong> Svelte <code>use:</code> actions are functions that run when an element is mounted. They are the perfect place to encapsulate GSAP animations as reusable directives. Return a <code>destroy</code> method to clean up tweens when the element is removed.</p>

  <div class="build">
    <pre>{`import type \{ Action \} from 'svelte/action';

const fadeIn: Action<HTMLElement> = (node) => \{
  gsap.from(node, \{
    opacity: 0, y: 20, duration: 0.6
  \});
  return \{
    destroy() \{ gsap.killTweensOf(node); \}
  \};
\};

// Usage: <div use:fadeIn>...</div>`}</pre>

    <button onclick={replay}>Replay All</button>

    {#if show}
      <div class="demo-cards">
        <div class="demo-card" use:fadeIn={{ duration: 0.6, y: 30 }}>
          <h4>use:fadeIn</h4>
          <p>Fades in from below with opacity and y translation.</p>
        </div>

        <div class="demo-card" use:scaleIn>
          <h4>use:scaleIn</h4>
          <p>Scales in from zero with a bouncy back ease.</p>
        </div>

        <div class="demo-card" use:slideRight>
          <h4>use:slideRight</h4>
          <p>Slides in from the left with power3 easing.</p>
        </div>
      </div>
    {/if}
  </div>

	<h2>Break it on purpose</h2>
	<p class="prose">These experiments reveal the lifecycle, parameter handling, and cleanup responsibilities of Svelte actions.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>destroy()</code> return object from the <code>fadeIn</code> action.</strong> Toggle the elements off and on repeatedly. Without <code>gsap.killTweensOf(node)</code>, orphaned tweens from previous mounts stack up. If the element is removed mid-animation, the tween continues targeting a detached DOM node.</li>
		<li><strong>Pass a parameter object to <code>use:scaleIn</code> which does not accept parameters.</strong> Svelte silently passes the parameter as the second argument, but since <code>scaleIn</code> ignores it, nothing happens. TypeScript with the <code>Action&lt;HTMLElement&gt;</code> type (no second generic) will flag this as an error.</li>
		<li><strong>Change <code>fadeIn</code> to return an <code>update()</code> method and log when it fires.</strong> The <code>update</code> method runs whenever the action's parameter changes reactively. If you bind the parameter to a reactive variable, you can dynamically adjust the animation at runtime without remounting.</li>
		<li><strong>Apply two actions to the same element: <code>use:fadeIn use:scaleIn</code>.</strong> Both animations run simultaneously because each action receives the same DOM node independently. The resulting motion is a combination of both -- fade + scale at once -- demonstrating that actions compose by default.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Svelte's <code>use:</code> action is a function that receives a DOM node when it mounts and optionally returns an object with <code>update</code> and <code>destroy</code> methods. This lifecycle maps perfectly onto GSAP: the action body initializes the animation, and <code>destroy</code> calls <code>gsap.killTweensOf(node)</code> to prevent orphaned tweens. The <code>Action&lt;Element, Params&gt;</code> type from <code>svelte/action</code> provides full TypeScript safety for both the node type and the parameter shape.</p>
	<p class="prose">Actions are the idiomatic way to encapsulate imperative DOM behavior in Svelte. Unlike placing GSAP calls in an <code>$effect</code> block (which is tied to a specific component), an action can be shared across any component via import. This makes actions the natural unit of reuse for GSAP animations: define <code>fadeIn</code>, <code>scaleIn</code>, or <code>slideRight</code> once, then apply them to any element with <code>use:fadeIn</code>.</p>
	<p class="prose">Parameters make actions configurable without sacrificing encapsulation. The second argument to the action function receives the value passed in the template -- <code>use:fadeIn={'={{' } duration: 0.6, y: 30 {'}}' }</code> -- allowing callers to customize behavior without modifying the action's implementation. If the parameter is a reactive expression, the <code>update</code> method fires whenever it changes, enabling dynamic reconfiguration at runtime.</p>
	<p class="next">Next, you will explore Svelte 5's experimental <code>{'{@attach}'}</code> directive as an alternative to actions.</p>
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

  .demo-cards { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  @media (min-inline-size: 768px) { .demo-cards { grid-template-columns: repeat(3, 1fr); } }

  .demo-card { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-lg); }
  .demo-card h4 { margin: 0 0 var(--space-xs); color: var(--color-brand); font-family: var(--font-mono); }
  .demo-card p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

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
