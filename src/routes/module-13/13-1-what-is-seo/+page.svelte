<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
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


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Pillar = { title: string; detail: string };\n" +
		"\n" +
		"  const pillars: Pillar[] = [\n" +
		"    {\n" +
		"      title: 'Content quality',\n" +
		"      detail:\n" +
		"        'Genuine, helpful content written by humans with firsthand experience. Thin or AI-spun pages are penalised by the March 2026 Core Update.'\n" +
		"    },\n" +
		"    {\n" +
		"      title: 'Experience signals',\n" +
		"      detail:\n" +
		"        'Core Web Vitals (LCP, INP, CLS) are table stakes. Fast, stable, interactive pages rank above equally relevant slow ones.'\n" +
		"    },\n" +
		"    {\n" +
		"      title: 'Structured data',\n" +
		"      detail:\n" +
		"        'JSON-LD schemas (Article, Product, FAQ, BreadcrumbList) give search engines and LLMs a machine-readable summary of your page.'\n" +
		"    },\n" +
		"    {\n" +
		"      title: 'E-E-A-T',\n" +
		"      detail:\n" +
		"        'Experience, Expertise, Authoritativeness, Trust. Clear authorship, credentials, citations, and real-world demonstrations matter more than ever.'\n" +
		"    },\n" +
		"    {\n" +
		"      title: 'AI Overviews',\n" +
		"      detail:\n" +
		"        'Google AI Overviews, Perplexity, and ChatGPT browse read your structured data and clean semantics. Invisible to LLMs equals invisible to discovery.'\n" +
		"    }\n" +
		"  ];\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003eWhat SEO is in 2026 — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta\n" +
		"    name=\"description\"\n" +
		"    content=\"Modern SEO in 2026 is about content quality, Core Web Vitals, structured data, E-E-A-T, and being legible to AI answerers.\"\n" +
		"  /\u003e\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.1 — What SEO is in 2026\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e SEO in 2026 is about helping Google, Bing, and AI answerers (ChatGPT,\n" +
		"    Perplexity, Google AI Overviews) understand and surface your content. The March 2026 Core\n" +
		"    Update prioritised experience signals and E-E-A-T harder than ever. Keyword stuffing died a\n" +
		"    decade ago; modern SEO is structured data plus fast pages plus genuine expertise. Not helping\n" +
		"    LLMs understand you means being invisible in the new discovery layer.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003ch2\u003eThe five pillars\u003c/h2\u003e\n" +
		"    \u003cdiv class=\"grid\"\u003e\n" +
		"      {#each pillars as pillar (pillar.title)}\n" +
		"        \u003carticle class=\"card\"\u003e\n" +
		"          \u003ch3 class=\"card-title\"\u003e{pillar.title}\u003c/h3\u003e\n" +
		"          \u003cp class=\"card-detail\"\u003e{pillar.detail}\u003c/p\u003e\n" +
		"        \u003c/article\u003e\n" +
		"      {/each}\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eModern SEO is content quality, speed, structure, trust, and LLM legibility.\u003c/li\u003e\n" +
		"    \u003cli\u003eThe March 2026 Core Update doubled down on E-E-A-T.\u003c/li\u003e\n" +
		"    \u003cli\u003eStructured data is no longer optional — it feeds AI Overviews.\u003c/li\u003e\n" +
		"    \u003cli\u003eIf an LLM can't parse your page, you're invisible to the new discovery layer.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
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


	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

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
		.concept { max-inline-size: 65ch; }
	}
	@media (min-width: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-width: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
