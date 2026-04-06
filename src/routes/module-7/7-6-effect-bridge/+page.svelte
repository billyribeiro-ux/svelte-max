<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let panelEl: HTMLDivElement | null = $state(null);
  let active = $state(false);
  let tl: gsap.core.Timeline | null = null;

  function toggle() {
    active = !active;
  }

  $effect(() => {
    if (!containerEl || !panelEl) return;

    const ctx = gsap.context(() => {
      tl = gsap.timeline({ paused: true });
      tl.to(panelEl!, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })
        .from('.panel-content', { y: 10, opacity: 0, duration: 0.3 }, '-=0.2');
    }, containerEl);

    return () => {
      tl = null;
      ctx.revert();
    };
  });

  $effect(() => {
    if (!tl) return;
    if (active) {
      tl.play();
    } else {
      tl.reverse();
    }
  });

	/* ── Complete code for CodeCanvas ── */
	const fullCode =
		"\u003cscript lang=\"ts\"\u003e\n" +
		"import gsap from 'gsap';\n" +
		"\n" +
		"  let containerEl: HTMLDivElement | null = $state(null);\n" +
		"  let panelEl: HTMLDivElement | null = $state(null);\n" +
		"  let active = $state(false);\n" +
		"  let tl: gsap.core.Timeline | null = null;\n" +
		"\n" +
		"  function toggle() {\n" +
		"    active = !active;\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl || !panelEl) return;\n" +
		"\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      tl = gsap.timeline({ paused: true });\n" +
		"      tl.to(panelEl!, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })\n" +
		"        .from('.panel-content', { y: 10, opacity: 0, duration: 0.3 }, '-=0.2');\n" +
		"    }, containerEl);\n" +
		"\n" +
		"    return () =\u003e {\n" +
		"      tl = null;\n" +
		"      ctx.revert();\n" +
		"    };\n" +
		"  });\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!tl) return;\n" +
		"    if (active) {\n" +
		"      tl.play();\n" +
		"    } else {\n" +
		"      tl.reverse();\n" +
		"    }\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.6 — $effect Bridge\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e Svelte 5's \u003ccode\u003e$effect\u003c/code\u003e is the bridge between reactive state and GSAP. When reactive state changes, an \u003ccode\u003e$effect\u003c/code\u003e can play, reverse, or restart a GSAP timeline. This creates a clean separation: Svelte manages state, GSAP manages motion.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003cbutton onclick={toggle} class:active\u003e\n" +
		"        {active ? 'Collapse' : 'Expand'} Panel\n" +
		"      \u003c/button\u003e\n" +
		"      \u003cspan class=\"status\"\u003eState: \u003ccode\u003e{active ? 'active' : 'inactive'}\u003c/code\u003e\u003c/span\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"panel\" bind:this={panelEl}\u003e\n" +
		"      \u003cdiv class=\"panel-content\"\u003e\n" +
		"        \u003ch4\u003eExpanded Content\u003c/h4\u003e\n" +
		"        \u003cp\u003eThis panel is controlled by reactive state. The \u003ccode\u003e$effect\u003c/code\u003e watches \u003ccode\u003eactive\u003c/code\u003e and calls \u003ccode\u003etl.play()\u003c/code\u003e or \u003ccode\u003etl.reverse()\u003c/code\u003e.\u003c/p\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`let active = $state(false);\n" +
		"let tl: gsap.core.Timeline | null = null;\n" +
		"\n" +
		"// Build the timeline once\n" +
		"$effect(() =\u003e \\{\n" +
		"  const ctx = gsap.context(() =\u003e \\{\n" +
		"    tl = gsap.timeline(\\{ paused: true \\});\n" +
		"    tl.to(panelEl!, \\{ height: 'auto', opacity: 1 \\});\n" +
		"  \\}, containerEl!);\n" +
		"  return () =\u003e ctx.revert();\n" +
		"\\});\n" +
		"\n" +
		"// React to state changes\n" +
		"$effect(() =\u003e \\{\n" +
		"  if (!tl) return;\n" +
		"  active ? tl.play() : tl.reverse();\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003e$effect\u003c/code\u003e automatically tracks reactive dependencies like \u003ccode\u003eactive\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003eBuild the GSAP timeline once (paused), then play/reverse it based on state changes.\u003c/li\u003e\n" +
		"    \u003cli\u003eSeparating timeline creation from state-driven playback keeps code clean.\u003c/li\u003e\n" +
		"    \u003cli\u003eThis pattern works for any state-driven animation: toggles, tabs, accordions, etc.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.6 — $effect Bridge</h1>
  <p class="concept"><strong>Concept.</strong> Svelte 5's <code>$effect</code> is the bridge between reactive state and GSAP. When reactive state changes, an <code>$effect</code> can play, reverse, or restart a GSAP timeline. This creates a clean separation: Svelte manages state, GSAP manages motion.</p>

  <div class="build" bind:this={containerEl}>
    <div class="controls">
      <button onclick={toggle} class:active>
        {active ? 'Collapse' : 'Expand'} Panel
      </button>
      <span class="status">State: <code>{active ? 'active' : 'inactive'}</code></span>
    </div>

    <div class="panel" bind:this={panelEl}>
      <div class="panel-content">
        <h4>Expanded Content</h4>
        <p>This panel is controlled by reactive state. The <code>$effect</code> watches <code>active</code> and calls <code>tl.play()</code> or <code>tl.reverse()</code>.</p>
      </div>
    </div>

    <pre>{`let active = $state(false);
let tl: gsap.core.Timeline | null = null;

// Build the timeline once
$effect(() => \{
  const ctx = gsap.context(() => \{
    tl = gsap.timeline(\{ paused: true \});
    tl.to(panelEl!, \{ height: 'auto', opacity: 1 \});
  \}, containerEl!);
  return () => ctx.revert();
\});

// React to state changes
$effect(() => \{
  if (!tl) return;
  active ? tl.play() : tl.reverse();
\});`}</pre>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>$effect</code> automatically tracks reactive dependencies like <code>active</code>.</li>
    <li>Build the GSAP timeline once (paused), then play/reverse it based on state changes.</li>
    <li>Separating timeline creation from state-driven playback keeps code clean.</li>
    <li>This pattern works for any state-driven animation: toggles, tabs, accordions, etc.</li>
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

  .controls { display: flex; align-items: center; gap: var(--space-md); flex-wrap: wrap; }
  .status { font-size: var(--text-sm); color: var(--color-text-muted); }

  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; transition: background 0.2s; }
  button:hover { background: var(--color-brand-dim); }
  button.active { background: var(--color-success); }

  .panel { height: 0; opacity: 0; overflow: hidden; background: var(--color-surface-2); border-radius: var(--radius-md); }
  .panel-content { padding: var(--space-lg); }
  .panel-content h4 { margin: 0 0 var(--space-xs); color: var(--color-text); }
  .panel-content p { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }

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
