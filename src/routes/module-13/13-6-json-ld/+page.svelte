<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type WebPageSchema = {
    '@context': 'https://schema.org';
    '@type': 'WebPage';
    name: string;
    description: string;
    url: string;
  };

  const schema: WebPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'JSON-LD fundamentals',
    description: 'Learn the structured data format that powers modern SEO',
    url: 'https://svelte-max.example/module-13/13-6-json-ld'
  };

  const schemaJson = JSON.stringify(schema, null, 2);
  const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(schema)}<\/script>`;

  // Display strings use unicode escapes so Svelte's HTML tokenizer doesn't
  // see a literal script opening or closing tag inside markup expressions.
  const openTag = '\u003cscript type="application/ld+json"\u003e';
  const closeTagRaw = '\u003c/script\u003e';
  const closeTagEscaped = '\u003c\\/script\u003e';
  const headTag = '\u003chead\u003e';
  const svelteHeadTag = '\u003csvelte:head\u003e';
  const templateLiteralSnippet =
    '`\u003cscript type="application/ld+json"\u003e${JSON.stringify(schema)}\u003c\\/script\u003e`';


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type WebPageSchema = {\n" +
		"    '@context': 'https://schema.org';\n" +
		"    '@type': 'WebPage';\n" +
		"    name: string;\n" +
		"    description: string;\n" +
		"    url: string;\n" +
		"  };\n" +
		"\n" +
		"  const schema: WebPageSchema = {\n" +
		"    '@context': 'https://schema.org',\n" +
		"    '@type': 'WebPage',\n" +
		"    name: 'JSON-LD fundamentals',\n" +
		"    description: 'Learn the structured data format that powers modern SEO',\n" +
		"    url: 'https://svelte-max.example/module-13/13-6-json-ld'\n" +
		"  };\n" +
		"\n" +
		"  const schemaJson = JSON.stringify(schema, null, 2);\n" +
		"  const jsonLdScript = `\u003cscript type=\"application/ld+json\"\u003e${JSON.stringify(schema)}\u003c\\/script\u003e`;\n" +
		"\n" +
		"  // Display strings use unicode escapes so Svelte's HTML tokenizer doesn't\n" +
		"  // see a literal script opening or closing tag inside markup expressions.\n" +
		"  const openTag = '\\u003cscript type=\"application/ld+json\"\\u003e';\n" +
		"  const closeTagRaw = '\\u003c/script\\u003e';\n" +
		"  const closeTagEscaped = '\\u003c\\\\/script\\u003e';\n" +
		"  const headTag = '\\u003chead\\u003e';\n" +
		"  const svelteHeadTag = '\\u003csvelte:head\\u003e';\n" +
		"  const templateLiteralSnippet =\n" +
		"    '`\\u003cscript type=\"application/ld+json\"\\u003e${JSON.stringify(schema)}\\u003c\\\\/script\\u003e`';\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003eJSON-LD fundamentals — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta\n" +
		"    name=\"description\"\n" +
		"    content=\"Structured data with JSON-LD: the non-invasive format Google, Bing, and AI Overviews parse for rich results.\"\n" +
		"  /\u003e\n" +
		"  {@html jsonLdScript}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.6 — JSON-LD fundamentals\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e Structured data is machine-readable metadata describing what a page\n" +
		"    is about. JSON-LD (JSON for Linked Data) wraps Schema.org vocabulary in a\n" +
		"    \u003ccode\u003e{openTag}\u003c/code\u003e tag. Google, Bing, and AI Overviews parse it to populate rich results —\n" +
		"    star ratings, FAQ accordions, breadcrumbs, knowledge panels. JSON-LD beats microdata because\n" +
		"    it's non-invasive: it lives in \u003ccode\u003e{headTag}\u003c/code\u003e, not tangled with your HTML.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eLive JSON-LD\u003c/h2\u003e\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      The object below is serialised and injected into this page's \u003ccode\u003e{headTag}\u003c/code\u003e as a\n" +
		"      JSON-LD script tag. View source on this page and you'll find it.\n" +
		"    \u003c/p\u003e\n" +
		"    \u003cpre\u003e\u003ccode\u003e{schemaJson}\u003c/code\u003e\u003c/pre\u003e\n" +
		"\n" +
		"    \u003ch3 class=\"snippet-title\"\u003eThe escape note\u003c/h3\u003e\n" +
		"    \u003cp class=\"hint\"\u003e\n" +
		"      We build the script tag as a template string: \u003ccode\u003e{templateLiteralSnippet}\u003c/code\u003e. The\n" +
		"      literal \u003ccode\u003e{closeTagEscaped}\u003c/code\u003e matters: \u003ccode\u003eJSON.stringify\u003c/code\u003e does not escape\n" +
		"      the string \u003ccode\u003e{closeTagRaw}\u003c/code\u003e if it appears inside a JSON value, which would\n" +
		"      prematurely close the script tag and break the HTML parser. Writing the closing tag as\n" +
		"      \u003ccode\u003e{closeTagEscaped}\u003c/code\u003e in the source is the idiomatic fix. Then we use\n" +
		"      \u003ccode\u003e{'{@html jsonLdScript}'}\u003c/code\u003e inside \u003ccode\u003e{svelteHeadTag}\u003c/code\u003e — one of the few\n" +
		"      places \u003ccode\u003e@html\u003c/code\u003e is justified, because the input is a fully controlled schema\n" +
		"      object with no user data flowing in.\n" +
		"    \u003c/p\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eJSON-LD is the preferred structured-data format for modern SEO.\u003c/li\u003e\n" +
		"    \u003cli\u003eIt lives in \u003ccode\u003e{headTag}\u003c/code\u003e inside a script tag — non-invasive.\u003c/li\u003e\n" +
		"    \u003cli\u003e\n" +
		"      Inject it via \u003ccode\u003e{'{@html}'}\u003c/code\u003e inside \u003ccode\u003e{svelteHeadTag}\u003c/code\u003e, safe because the\n" +
		"      source object is trusted.\n" +
		"    \u003c/li\u003e\n" +
		"    \u003cli\u003e\n" +
		"      Write the closing \u003ccode\u003e{closeTagEscaped}\u003c/code\u003e with a backslash to survive any stringified\n" +
		"      values.\n" +
		"    \u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>JSON-LD fundamentals — svelte-max</title>
  <meta
    name="description"
    content="Structured data with JSON-LD: the non-invasive format Google, Bing, and AI Overviews parse for rich results."
  />
  {@html jsonLdScript}
</svelte:head>

<section class="page">
  <h1>13.6 — JSON-LD fundamentals</h1>
  <p class="concept">
    <strong>Concept.</strong> Structured data is machine-readable metadata describing what a page
    is about. JSON-LD (JSON for Linked Data) wraps Schema.org vocabulary in a
    <code>{openTag}</code> tag. Google, Bing, and AI Overviews parse it to populate rich results —
    star ratings, FAQ accordions, breadcrumbs, knowledge panels. JSON-LD beats microdata because
    it's non-invasive: it lives in <code>{headTag}</code>, not tangled with your HTML.
  </p>

  <div class="build">
    <h2>Live JSON-LD</h2>
    <p class="hint">
      The object below is serialised and injected into this page's <code>{headTag}</code> as a
      JSON-LD script tag. View source on this page and you'll find it.
    </p>
    <pre><code>{schemaJson}</code></pre>

    <h3 class="snippet-title">The escape note</h3>
    <p class="hint">
      We build the script tag as a template string: <code>{templateLiteralSnippet}</code>. The
      literal <code>{closeTagEscaped}</code> matters: <code>JSON.stringify</code> does not escape
      the string <code>{closeTagRaw}</code> if it appears inside a JSON value, which would
      prematurely close the script tag and break the HTML parser. Writing the closing tag as
      <code>{closeTagEscaped}</code> in the source is the idiomatic fix. Then we use
      <code>{'{@html jsonLdScript}'}</code> inside <code>{svelteHeadTag}</code> — one of the few
      places <code>@html</code> is justified, because the input is a fully controlled schema
      object with no user data flowing in.
    </p>
  </div>


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

  <h3>What you learned</h3>
  <ul>
    <li>JSON-LD is the preferred structured-data format for modern SEO.</li>
    <li>It lives in <code>{headTag}</code> inside a script tag — non-invasive.</li>
    <li>
      Inject it via <code>{'{@html}'}</code> inside <code>{svelteHeadTag}</code>, safe because the
      source object is trusted.
    </li>
    <li>
      Write the closing <code>{closeTagEscaped}</code> with a backslash to survive any stringified
      values.
    </li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
  .hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.6; }
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
