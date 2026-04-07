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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals how <code>{'<svelte:head>'}</code> interacts with SSR and client navigation. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the entire <code>{'<svelte:head>'}</code> block.</strong> The browser tab shows a generic title (often the URL path), and the meta description disappears from the page source. Search engines receive a page with no explicit title or description, which means they will auto-generate both from the body content, often poorly.</li>
		<li><strong>Place the <code>{'<title>'}</code> tag outside of <code>{'<svelte:head>'}</code>, directly in the markup body.</strong> The title renders as visible text on the page instead of setting the browser tab. Svelte does not magically move head-level tags; <code>{'<svelte:head>'}</code> is the only mechanism that injects into the document <code>{'<head>'}</code>.</li>
		<li><strong>Bind the title to <code>$state</code> but initialise it as an empty string.</strong> The browser tab shows only the separator text (<code> — svelte-max</code>). An empty title is worse than no title at all because it signals to crawlers that the page was generated but has no meaningful content label.</li>
		<li><strong>Add two separate <code>{'<svelte:head>'}</code> blocks in the same component, each with a different <code>{'<title>'}</code>.</strong> The last one wins because the browser uses the final title tag it encounters. This demonstrates that while multiple <code>{'<svelte:head>'}</code> blocks are valid Svelte, duplicate tags within them create unpredictable results.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>{'<svelte:head>'}</code> is SvelteKit's bridge between component logic and the document <code>{'<head>'}</code>. It renders its children into <code>{'<head>'}</code> during server-side rendering, which means search engine crawlers and social media scrapers see the correct title, meta description, and structured data on the very first response, before any JavaScript executes on the client.</p>
	<p class="prose">On client-side navigation, <code>{'<svelte:head>'}</code> updates the existing head tags reactively. When a user navigates from one page to another within a SvelteKit app, the title and meta tags swap seamlessly without a full page reload. Because Svelte runes work inside <code>{'<svelte:head>'}</code>, you can bind a <code>$state</code> variable to the title and watch the browser tab update in real time as the user types.</p>
	<p class="prose">The practical pattern is to place one <code>{'<svelte:head>'}</code> block per page component, containing the page title, meta description, Open Graph tags, canonical link, and any JSON-LD structured data. Layout components can also contribute head tags (for site-wide defaults), but page-level tags take precedence because they render later in the component tree.</p>
	<p class="next">Next, you will learn how to craft effective title tags and meta descriptions that maximise click-through from search results.</p>
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
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
