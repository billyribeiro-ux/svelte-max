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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment reveals a JSON-LD integration subtlety. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the backslash from <code>{closeTagEscaped}</code> in the template literal so it reads <code>{closeTagRaw}</code>.</strong> The HTML parser encounters a literal closing script tag inside the JSON-LD string, which prematurely terminates the script element. Everything after it becomes raw text in the page body, breaking both the structured data and potentially the page layout.</li>
		<li><strong>Replace <code>{'{@html jsonLdScript}'}</code> with a regular Svelte expression <code>{'{jsonLdScript}'}</code>.</strong> Svelte HTML-escapes the output, turning angle brackets into <code>&amp;lt;</code> and <code>&amp;gt;</code>. The browser sees escaped text instead of a script tag, so the JSON-LD is never parsed by search engines. The <code>@html</code> directive is required because you need raw, unescaped HTML in the head.</li>
		<li><strong>Add a user-controlled <code>$state</code> field to the schema object (e.g., from an input).</strong> Now untrusted user input flows into <code>@html</code>, creating an XSS vulnerability. This is why <code>@html</code> for JSON-LD is only safe when the schema object is fully controlled by the developer with no user data flowing in.</li>
		<li><strong>Change the <code>@context</code> value from <code>"https://schema.org"</code> to something else.</strong> Google's structured data validator will report that the schema context is unrecognised. Without the correct context, the JSON-LD block is just opaque JSON that search engines cannot interpret against the Schema.org vocabulary.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">JSON-LD (JSON for Linked Data) is the preferred structured-data format for modern search engines. It wraps Schema.org vocabulary inside a <code>{openTag}</code> tag that lives in the document <code>{headTag}</code>, completely separated from your HTML markup. This non-invasive approach means you can add, modify, or remove structured data without touching a single line of your visible page content.</p>
	<p class="prose">In SvelteKit, you build the JSON-LD as a typed TypeScript object, serialise it with <code>JSON.stringify</code>, wrap it in a script tag template literal, and inject it into <code>{svelteHeadTag}</code> using <code>{'{@html}'}</code>. The critical detail is escaping the closing script tag in the template literal: writing <code>{closeTagEscaped}</code> with a backslash prevents the HTML parser from prematurely closing the script element if the string <code>{closeTagRaw}</code> ever appears inside a JSON value.</p>
	<p class="prose">The <code>@html</code> directive is one of the few places in Svelte where it is justified, because the input is a fully controlled schema object with no user data flowing in. Using <code>@html</code> with untrusted input would create an XSS vulnerability. The type-safe pattern of defining the schema as a TypeScript interface, populating it from trusted sources, and serialising it once keeps both the structured data and the page secure.</p>
	<p class="next">Next, you will learn how to use the Article and BreadcrumbList schemas to make blog posts look premium in search results.</p>
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
