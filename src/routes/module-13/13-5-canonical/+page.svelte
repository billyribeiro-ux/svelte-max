<script lang="ts">
  import { page } from '$app/state';

  const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
  const fullUrl = $derived(page.url.href);
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
</style>
