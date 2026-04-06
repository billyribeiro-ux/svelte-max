<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  import gsap from 'gsap';

  let containerEl: HTMLDivElement | null = $state(null);
  let items = $state(['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']);
  let count = $state(5);

  function addItem() {
    count += 1;
    items = [...items, `Item ${count}`];
  }

  function removeItem() {
    if (items.length > 0) {
      items = items.slice(0, -1);
    }
  }

  $effect(() => {
    if (!containerEl) return;
    const ctx = gsap.context(() => {
      gsap.from('.anim-item', {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out'
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
		"  let items = $state(['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']);\n" +
		"  let count = $state(5);\n" +
		"\n" +
		"  function addItem() {\n" +
		"    count += 1;\n" +
		"    items = [...items, `Item ${count}`];\n" +
		"  }\n" +
		"\n" +
		"  function removeItem() {\n" +
		"    if (items.length \u003e 0) {\n" +
		"      items = items.slice(0, -1);\n" +
		"    }\n" +
		"  }\n" +
		"\n" +
		"  $effect(() =\u003e {\n" +
		"    if (!containerEl) return;\n" +
		"    const ctx = gsap.context(() =\u003e {\n" +
		"      gsap.from('.anim-item', {\n" +
		"        opacity: 0,\n" +
		"        y: 30,\n" +
		"        stagger: 0.1,\n" +
		"        duration: 0.5,\n" +
		"        ease: 'power2.out'\n" +
		"      });\n" +
		"    }, containerEl);\n" +
		"    return () =\u003e ctx.revert();\n" +
		"  });\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e7.7 — GSAP Context Cleanup\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\u003cstrong\u003eConcept.\u003c/strong\u003e GSAP animations create internal references to DOM elements. If you navigate away or unmount components without cleaning up, those references become memory leaks. \u003ccode\u003egsap.context()\u003c/code\u003e scopes all animations and \u003ccode\u003ectx.revert()\u003c/code\u003e kills them all at once.\u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\" bind:this={containerEl}\u003e\n" +
		"    \u003cdiv class=\"controls\"\u003e\n" +
		"      \u003cbutton onclick={addItem}\u003eAdd Item\u003c/button\u003e\n" +
		"      \u003cbutton onclick={removeItem}\u003eRemove Item\u003c/button\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"item-list\"\u003e\n" +
		"      {#each items as item (item)}\n" +
		"        \u003cdiv class=\"anim-item\"\u003e{item}\u003c/div\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cpre\u003e{`$effect(() =\u003e \\{\n" +
		"  if (!containerEl) return;\n" +
		"\n" +
		"  // gsap.context scopes ALL animations inside\n" +
		"  const ctx = gsap.context(() =\u003e \\{\n" +
		"    gsap.from('.item', \\{\n" +
		"      opacity: 0, y: 30,\n" +
		"      stagger: 0.1\n" +
		"    \\});\n" +
		"  \\}, containerEl);\n" +
		"\n" +
		"  // Cleanup: revert kills all scoped animations\n" +
		"  return () =\u003e ctx.revert();\n" +
		"\\});`}\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"warning-box\"\u003e\n" +
		"      \u003ch4\u003eWithout cleanup, you get:\u003c/h4\u003e\n" +
		"      \u003cul class=\"warning-list\"\u003e\n" +
		"        \u003cli\u003eOrphaned tweens referencing removed DOM nodes\u003c/li\u003e\n" +
		"        \u003cli\u003eMemory leaks that grow on every navigation\u003c/li\u003e\n" +
		"        \u003cli\u003eAnimations that fight or glitch after re-mount\u003c/li\u003e\n" +
		"      \u003c/ul\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003egsap.context(fn, scope)\u003c/code\u003e scopes all animations created inside the callback.\u003c/li\u003e\n" +
		"    \u003cli\u003eReturning \u003ccode\u003ectx.revert()\u003c/code\u003e from \u003ccode\u003e$effect\u003c/code\u003e ensures cleanup on unmount or re-run.\u003c/li\u003e\n" +
		"    \u003cli\u003eWithout cleanup, GSAP holds references to removed DOM nodes, causing memory leaks.\u003c/li\u003e\n" +
		"    \u003cli\u003eAlways pair \u003ccode\u003egsap.context()\u003c/code\u003e with \u003ccode\u003ectx.revert()\u003c/code\u003e in every \u003ccode\u003e$effect\u003c/code\u003e.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<section class="page">
  <h1>7.7 — GSAP Context Cleanup</h1>
  <p class="concept"><strong>Concept.</strong> GSAP animations create internal references to DOM elements. If you navigate away or unmount components without cleaning up, those references become memory leaks. <code>gsap.context()</code> scopes all animations and <code>ctx.revert()</code> kills them all at once.</p>

  <div class="build" bind:this={containerEl}>
    <div class="controls">
      <button onclick={addItem}>Add Item</button>
      <button onclick={removeItem}>Remove Item</button>
    </div>

    <div class="item-list">
      {#each items as item (item)}
        <div class="anim-item">{item}</div>
      {/each}
    </div>

    <pre>{`$effect(() => \{
  if (!containerEl) return;

  // gsap.context scopes ALL animations inside
  const ctx = gsap.context(() => \{
    gsap.from('.item', \{
      opacity: 0, y: 30,
      stagger: 0.1
    \});
  \}, containerEl);

  // Cleanup: revert kills all scoped animations
  return () => ctx.revert();
\});`}</pre>

    <div class="warning-box">
      <h4>Without cleanup, you get:</h4>
      <ul class="warning-list">
        <li>Orphaned tweens referencing removed DOM nodes</li>
        <li>Memory leaks that grow on every navigation</li>
        <li>Animations that fight or glitch after re-mount</li>
      </ul>
    </div>
  </div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>gsap.context(fn, scope)</code> scopes all animations created inside the callback.</li>
    <li>Returning <code>ctx.revert()</code> from <code>$effect</code> ensures cleanup on unmount or re-run.</li>
    <li>Without cleanup, GSAP holds references to removed DOM nodes, causing memory leaks.</li>
    <li>Always pair <code>gsap.context()</code> with <code>ctx.revert()</code> in every <code>$effect</code>.</li>
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

  .controls { display: flex; gap: var(--space-sm); }
  button { background: var(--color-brand); color: var(--color-surface); border: none; padding: var(--space-xs) var(--space-md); border-radius: var(--radius-sm); cursor: pointer; font-size: var(--text-sm); font-weight: 500; }
  button:hover { background: var(--color-brand-dim); }

  .item-list { display: flex; flex-direction: column; gap: var(--space-xs); }
  .anim-item { background: var(--color-surface-2); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-sm); color: var(--color-text); font-weight: 500; border-left: 3px solid var(--color-brand); }

  .warning-box { background: var(--color-surface-2); border-left: 3px solid var(--color-error); border-radius: var(--radius-md); padding: var(--space-md); }
  .warning-box h4 { margin: 0 0 var(--space-sm); color: var(--color-error); font-size: var(--text-sm); }
  .warning-list { color: var(--color-text-muted); font-size: var(--text-sm); }

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
