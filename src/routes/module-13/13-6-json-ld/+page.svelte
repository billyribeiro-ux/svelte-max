<script lang="ts">
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
</style>
