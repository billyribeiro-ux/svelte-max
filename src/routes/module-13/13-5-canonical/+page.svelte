<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
	import { SvelteURL } from 'svelte/reactivity';
  import { page } from '$app/state';

  const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
  const fullUrl = $derived(page.url.href);

  // SvelteURL — reactive URL for building canonical URLs with fine-grained control
  const canonicalUrl = new SvelteURL(page.url.href);
  $effect(() => {
    canonicalUrl.href = page.url.href;
    // Strip search params for canonical
    canonicalUrl.search = '';
    canonicalUrl.hash = '';
  });
  const builtCanonical = $derived(canonicalUrl.href);


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"import { page } from '$app/state';\n" +
		"\n" +
		"  const canonical = $derived(`${page.url.origin}${page.url.pathname}`);\n" +
		"  const fullUrl = $derived(page.url.href);\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003eCanonical URLs — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta name=\"description\" content=\"Canonical URLs prevent duplicate-content ranking splits by telling search engines which URL is the primary one.\" /\u003e\n" +
		"  \u003clink rel=\"canonical\" href={canonical} /\u003e\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.5 — Canonical URLs\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Duplicate content hurts SEO. If \u003ccode\u003e/products/widget\u003c/code\u003e and\n" +
		"    \u003ccode\u003e/products/widget?utm=twitter\u003c/code\u003e show the same content, search engines can index both\n" +
		"    and split ranking signals. \u003ccode\u003e{'\u003clink rel=\"canonical\" href=\"...\"\u003e'}\u003c/code\u003e tells search\n" +
		"    engines to treat one URL as the primary. Every page should have a canonical — usually itself,\n" +
		"    but sometimes pointing elsewhere (e.g., syndicated content pointing back to the original).\n" +
		"    Build it dynamically from \u003ccode\u003epage.url\u003c/code\u003e.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eLive canonical\u003c/h2\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      \u003cspan class=\"label\"\u003eCurrent URL:\u003c/span\u003e\n" +
		"      \u003ccode class=\"value\"\u003e{fullUrl}\u003c/code\u003e\n" +
		"    \u003c/div\u003e\n" +
		"    \u003cdiv class=\"row\"\u003e\n" +
		"      \u003cspan class=\"label\"\u003eComputed canonical:\u003c/span\u003e\n" +
		"      \u003ccode class=\"value\"\u003e{canonical}\u003c/code\u003e\n" +
		"    \u003c/div\u003e\n" +
		"\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      Try appending \u003ccode\u003e?demo=hello&amp;utm=twitter\u003c/code\u003e to the URL and reload. The canonical\n" +
		"      stays stripped — that's the whole point. Query strings that don't change content (tracking,\n" +
		"      pagination flavours, UTM tags) must not create \"new\" URLs in Google's index.\n" +
		"    \u003c/p\u003e\n" +
		"\n" +
		"    \u003ch3 class=\"snippet-title\"\u003eThe pattern\u003c/h3\u003e\n" +
		"    \u003cpre\u003e\u003ccode\u003e{`import { page } from '$app/state';\n" +
		"\n" +
		"const canonical = $derived(\n" +
		"  \\`\\${page.url.origin}\\${page.url.pathname}\\`\n" +
		");`}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"    \u003cpre\u003e\u003ccode\u003e{`\u003csvelte:head\u003e\n" +
		"  \u003clink rel=\"canonical\" href={canonical} /\u003e\n" +
		"\u003c/svelte:head\u003e`}\u003c/code\u003e\u003c/pre\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eDuplicate URLs split ranking signals between copies.\u003c/li\u003e\n" +
		"    \u003cli\u003eA canonical tag designates the primary URL.\u003c/li\u003e\n" +
		"    \u003cli\u003eStrip query strings by using \u003ccode\u003eorigin + pathname\u003c/code\u003e.\u003c/li\u003e\n" +
		"    \u003cli\u003eEvery page should emit a canonical — default to self.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>Canonical URLs — svelte-max</title>
  <meta name="description" content="Canonical URLs prevent duplicate-content ranking splits by telling search engines which URL is the primary one." />
  <link rel="canonical" href={canonical} />
</svelte:head>

<section class="page">
  <h1>13.5 — Canonical URLs</h1>
  <p class="concept">
    <strong>Concept.</strong> Duplicate content hurts SEO. If <code>/products/widget</code> and
    <code>/products/widget?utm=twitter</code> show the same content, search engines can index both
    and split ranking signals. <code>{'<link rel="canonical" href="...">'}</code> tells search
    engines to treat one URL as the primary. Every page should have a canonical — usually itself,
    but sometimes pointing elsewhere (e.g., syndicated content pointing back to the original).
    Build it dynamically from <code>page.url</code>.
  </p>

  <div class="build">
    <h2>Live canonical</h2>

    <div class="row">
      <span class="label">Current URL:</span>
      <code class="value">{fullUrl}</code>
    </div>
    <div class="row">
      <span class="label">Computed canonical:</span>
      <code class="value">{canonical}</code>
    </div>
    <div class="row">
      <span class="label">SvelteURL canonical:</span>
      <code class="value">{builtCanonical}</code>
    </div>

    <p class="hint">
      Try appending <code>?demo=hello&amp;utm=twitter</code> to the URL and reload. The canonical
      stays stripped — that's the whole point. Query strings that don't change content (tracking,
      pagination flavours, UTM tags) must not create "new" URLs in Google's index.
    </p>

    <h3 class="snippet-title">The pattern</h3>
    <pre><code>{`import { page } from '$app/state';

const canonical = $derived(
  \`\${page.url.origin}\${page.url.pathname}\`
);`}</code></pre>

    <pre><code>{`<svelte:head>
  <link rel="canonical" href={canonical} />
</svelte:head>`}</code></pre>
  </div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>Duplicate URLs split ranking signals between copies.</li>
    <li>A canonical tag designates the primary URL.</li>
    <li>Strip query strings by using <code>origin + pathname</code>.</li>
    <li>Every page should emit a canonical — default to self.</li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
  .row { display: flex; flex-direction: column; gap: var(--space-xs); }
  .label { font-size: var(--text-xs); text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.05em; }
  .value { display: block; padding: var(--space-sm); border-radius: var(--radius-sm); background: var(--color-surface-2); border: 1px solid var(--color-border); word-break: break-all; }
  .hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }
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
