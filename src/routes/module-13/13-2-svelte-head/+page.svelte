<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  let title = $state('Dynamic title demo');


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"let title = $state('Dynamic title demo');\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003e{title} — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta name=\"description\" content=\"Learn how svelte:head injects tags into the document head, SSR-safely and reactively.\" /\u003e\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.2 — &lt;svelte:head&gt;\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003e{'\u003csvelte:head\u003e'}\u003c/code\u003e is SvelteKit's way to inject content\n" +
		"    into the document's \u003ccode\u003e{'\u003chead\u003e'}\u003c/code\u003e. Whatever you put inside renders into\n" +
		"    \u003ccode\u003e{'\u003chead\u003e'}\u003c/code\u003e during SSR and updates on client-side navigation. You can include\n" +
		"    \u003ccode\u003e{'\u003ctitle\u003e'}\u003c/code\u003e, \u003ccode\u003e{'\u003cmeta\u003e'}\u003c/code\u003e, \u003ccode\u003e{'\u003clink\u003e'}\u003c/code\u003e, and\n" +
		"    \u003ccode\u003e{'\u003cscript type=\"application/ld+json\"\u003e'}\u003c/code\u003e. Reactivity works — a\n" +
		"    \u003ccode\u003e$state\u003c/code\u003e variable can drive the title dynamically.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eLive title binding\u003c/h2\u003e\n" +
		"    \u003clabel for=\"title-input\"\u003ePage title\u003c/label\u003e\n" +
		"    \u003cinput id=\"title-input\" type=\"text\" bind:value={title} /\u003e\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      Type in the input and watch your browser tab title update live. The tab now reads\n" +
		"      \u003ccode\u003e{title} — svelte-max\u003c/code\u003e.\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003ch3 class=\"snippet-title\"\u003eThe pattern\u003c/h3\u003e\n" +
		"    \u003cpre\u003e\u003ccode\u003e{`\u003cscript lang=\"ts\"\u003e\n" +
		"  let title = $state('Dynamic title demo');\n" +
		"\u003c\\/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003e{title} — svelte-max\u003c/title\u003e\n" +
		"\u003c/svelte:head\u003e`}\u003c/code\u003e\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003e\u003ccode\u003e{'\u003csvelte:head\u003e'}\u003c/code\u003e injects children into the document head.\u003c/li\u003e\n" +
		"    \u003cli\u003eIt runs on the server (SSR) and updates on client navigation.\u003c/li\u003e\n" +
		"    \u003cli\u003eRunes-driven state inside it is fully reactive.\u003c/li\u003e\n" +
		"    \u003cli\u003eYou can inject title, meta, link, and JSON-LD script tags.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>{title} — svelte-max</title>
  <meta name="description" content="Learn how svelte:head injects tags into the document head, SSR-safely and reactively." />
</svelte:head>

<section class="page">
  <h1>13.2 — &lt;svelte:head&gt;</h1>
  <p class="concept">
    <strong>Concept.</strong> <code>{'<svelte:head>'}</code> is SvelteKit's way to inject content
    into the document's <code>{'<head>'}</code>. Whatever you put inside renders into
    <code>{'<head>'}</code> during SSR and updates on client-side navigation. You can include
    <code>{'<title>'}</code>, <code>{'<meta>'}</code>, <code>{'<link>'}</code>, and
    <code>{'<script type="application/ld+json">'}</code>. Reactivity works — a
    <code>$state</code> variable can drive the title dynamically.
  </p>

  <div class="build">
    <h2>Live title binding</h2>
    <label for="title-input">Page title</label>
    <input id="title-input" type="text" bind:value={title} />
    <p class="hint">
      Type in the input and watch your browser tab title update live. The tab now reads
      <code>{title} — svelte-max</code>.
    </p>

    <h3 class="snippet-title">The pattern</h3>
    <pre><code>{`<script lang="ts">
  let title = $state('Dynamic title demo');
<\/script>

<svelte:head>
  <title>{title} — svelte-max</title>
</svelte:head>`}</code></pre>
  </div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li><code>{'<svelte:head>'}</code> injects children into the document head.</li>
    <li>It runs on the server (SSR) and updates on client navigation.</li>
    <li>Runes-driven state inside it is fully reactive.</li>
    <li>You can inject title, meta, link, and JSON-LD script tags.</li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
  label { font-size: var(--text-sm); color: var(--color-text); }
  input { padding: var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-surface-2); color: var(--color-text); font: inherit; }
  .hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
  .snippet-title { margin: var(--space-sm) 0 0 0; font-size: var(--text-sm); color: var(--color-text); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; }
  pre code { background: transparent; padding: 0; }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }


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

	/* === RESPONSIVE BREAKPOINTS === */
	@media (min-width: 480px) {
		.concept, .hint { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept, .hint { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept, .hint { max-inline-size: 80ch; }
	}
</style>
