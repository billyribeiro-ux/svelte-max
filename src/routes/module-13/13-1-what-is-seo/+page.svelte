<script lang="ts">
  type Pillar = { title: string; detail: string };

  const pillars: Pillar[] = [
    {
      title: 'Content quality',
      detail:
        'Genuine, helpful content written by humans with firsthand experience. Thin or AI-spun pages are penalised by the March 2026 Core Update.'
    },
    {
      title: 'Experience signals',
      detail:
        'Core Web Vitals (LCP, INP, CLS) are table stakes. Fast, stable, interactive pages rank above equally relevant slow ones.'
    },
    {
      title: 'Structured data',
      detail:
        'JSON-LD schemas (Article, Product, FAQ, BreadcrumbList) give search engines and LLMs a machine-readable summary of your page.'
    },
    {
      title: 'E-E-A-T',
      detail:
        'Experience, Expertise, Authoritativeness, Trust. Clear authorship, credentials, citations, and real-world demonstrations matter more than ever.'
    },
    {
      title: 'AI Overviews',
      detail:
        'Google AI Overviews, Perplexity, and ChatGPT browse read your structured data and clean semantics. Invisible to LLMs equals invisible to discovery.'
    }
  ];
</script>

<svelte:head>
  <title>What SEO is in 2026 — svelte-max</title>
  <meta
    name="description"
    content="Modern SEO in 2026 is about content quality, Core Web Vitals, structured data, E-E-A-T, and being legible to AI answerers."
  />
</svelte:head>

<section class="page">
  <h1>13.1 — What SEO is in 2026</h1>
  <p class="concept">
    <strong>Concept.</strong> SEO in 2026 is about helping Google, Bing, and AI answerers (ChatGPT,
    Perplexity, Google AI Overviews) understand and surface your content. The March 2026 Core
    Update prioritised experience signals and E-E-A-T harder than ever. Keyword stuffing died a
    decade ago; modern SEO is structured data plus fast pages plus genuine expertise. Not helping
    LLMs understand you means being invisible in the new discovery layer.
  </p>

  <div class="build">
    <h2>The five pillars</h2>
    <div class="grid">
      {#each pillars as pillar (pillar.title)}
        <article class="card">
          <h3 class="card-title">{pillar.title}</h3>
          <p class="card-detail">{pillar.detail}</p>
        </article>
      {/each}
    </div>
  </div>

  <h3>What you learned</h3>
  <ul>
    <li>Modern SEO is content quality, speed, structure, trust, and LLM legibility.</li>
    <li>The March 2026 Core Update doubled down on E-E-A-T.</li>
    <li>Structured data is no longer optional — it feeds AI Overviews.</li>
    <li>If an LLM can't parse your page, you're invisible to the new discovery layer.</li>
  </ul>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .build h2 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
  .grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  .card { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); display: flex; flex-direction: column; gap: var(--space-xs); }
  .card-title { margin: 0; font-size: var(--text-base); color: var(--color-brand); }
  .card-detail { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .grid { grid-template-columns: 1fr 1fr; }
  }
</style>
