<script lang="ts">
  let ogTitle = $state('Svelte 5 + SvelteKit 2: the definitive course');
  let ogDescription = $state(
    'A hands-on journey through runes, snippets, and the modern web. Build production-grade apps with the new Svelte.'
  );
  let ogImage = $state('https://svelte-max.example/og/cover.png');
  const ogUrl = 'https://svelte-max.example/module-13/13-4-open-graph';
</script>

<svelte:head>
  <title>Open Graph &amp; Twitter Cards — svelte-max</title>
  <meta name="description" content="How to render beautiful share cards on Facebook, LinkedIn, Slack, and X using og: and twitter: meta tags." />
  <meta property="og:type" content="article" />
  <meta property="og:title" content={ogTitle} />
  <meta property="og:description" content={ogDescription} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:url" content={ogUrl} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={ogTitle} />
  <meta name="twitter:description" content={ogDescription} />
  <meta name="twitter:image" content={ogImage} />
</svelte:head>

<section class="page">
  <h1>13.4 — Open Graph + Twitter Cards</h1>
  <p class="concept">
    <strong>Concept.</strong> Open Graph (<code>og:</code>) tags tell Facebook, LinkedIn, and Slack
    how to render your link as a rich card when shared. Twitter Cards do the same for X. The most
    important OG tags are <code>og:title</code>, <code>og:description</code>,
    <code>og:image</code> (summary card 1200×630), <code>og:url</code>, <code>og:type</code>.
    Twitter Cards overlap but use <code>twitter:card</code>, <code>twitter:title</code>,
    <code>twitter:description</code>, <code>twitter:image</code>.
  </p>

  <div class="build">
    <h2>OG preview builder</h2>

    <label for="og-title">og:title</label>
    <input id="og-title" type="text" bind:value={ogTitle} />

    <label for="og-desc">og:description</label>
    <textarea id="og-desc" rows="2" bind:value={ogDescription}></textarea>

    <label for="og-image">og:image URL</label>
    <input id="og-image" type="text" bind:value={ogImage} />

    <div class="og-card">
      <div class="og-image" style:background-image="url({ogImage})"></div>
      <div class="og-body">
        <div class="og-domain">svelte-max.example</div>
        <div class="og-title">{ogTitle}</div>
        <div class="og-desc">{ogDescription}</div>
      </div>
    </div>

    <p class="hint">
      Real validation requires a public URL and a tool like opengraph.xyz — this preview is a
      visual approximation. The actual <code>og:</code> and <code>twitter:</code> meta tags for
      this page are being injected into <code>{'<svelte:head>'}</code> right now.
    </p>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Open Graph powers rich share cards on Facebook, LinkedIn, Slack, Discord.</li>
    <li>Twitter Cards mirror OG but use the <code>twitter:</code> prefix.</li>
    <li>og:image should be 1200×630 for summary_large_image.</li>
    <li>Validate with opengraph.xyz or the platform-specific debuggers.</li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-sm); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0 0 var(--space-sm) 0; font-size: var(--text-lg); color: var(--color-text); }
  label { font-size: var(--text-sm); color: var(--color-text); }
  input, textarea { padding: var(--space-sm); border-radius: var(--radius-sm); border: 1px solid var(--color-border); background: var(--color-surface-2); color: var(--color-text); font: inherit; resize: vertical; }
  .og-card { margin-top: var(--space-md); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; background: var(--color-surface-2); }
  .og-image { aspect-ratio: 1200 / 630; background-color: var(--color-surface); background-size: cover; background-position: center; border-bottom: 1px solid var(--color-border); }
  .og-body { padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs); }
  .og-domain { font-size: var(--text-xs); color: var(--color-text-muted); text-transform: uppercase; }
  .og-title { font-size: var(--text-base); color: var(--color-text); font-weight: 600; }
  .og-desc { font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.4; }
  .hint { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  @media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
