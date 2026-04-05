<script lang="ts">
  let title = $state('Dynamic title demo');
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
</style>
