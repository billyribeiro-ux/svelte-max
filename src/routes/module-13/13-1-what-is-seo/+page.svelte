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


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment highlights a core SEO principle. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove all five pillar cards and leave only the heading.</strong> The page becomes content-thin, which is exactly what the March 2026 Core Update penalises. Without substantive, structured information, crawlers see a page with a title and nothing worth indexing, demonstrating that content quality is the non-negotiable foundation of SEO.</li>
		<li><strong>Delete the <code>{'<meta name="description">'}</code> tag from <code>{'<svelte:head>'}</code>.</strong> Google will auto-generate a snippet from the page body, often picking an irrelevant sentence. You lose control over how your page appears in SERPs, proving that explicit meta descriptions are still critical for click-through rate even though they do not directly affect ranking.</li>
		<li><strong>Change the <code>{'<title>'}</code> to a generic string like <code>"Page 1"</code>.</strong> The SERP entry becomes unrecognisable, and search engines lose the primary signal for what this page is about. Titles are the single strongest on-page ranking factor, and a vague one wastes it entirely.</li>
		<li><strong>Duplicate the same <code>detail</code> text across all five pillar objects.</strong> The cards render identically, and any crawler or AI overview extracting structured content sees repetitive, low-value data. This mirrors keyword stuffing at the data level and shows why unique, specific content per section matters for both humans and machines.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Modern SEO in 2026 is not a single technique but the intersection of five pillars: content quality, experience signals, structured data, E-E-A-T, and AI legibility. The March 2026 Core Update made it clear that Google now prioritises pages demonstrating genuine expertise and first-hand experience over pages that merely target keywords. Thin content, regardless of how well-optimised its metadata is, cannot compete.</p>
	<p class="prose">Structured data powered by JSON-LD has moved from a nice-to-have to a requirement. Google AI Overviews, Perplexity, and ChatGPT browse all consume Schema.org vocabulary to build their synthesised answers. If your page lacks machine-readable metadata, it is invisible to the fastest-growing discovery channel on the web. The combination of clean HTML semantics and explicit JSON-LD schemas is what makes a page legible to both traditional crawlers and large language models.</p>
	<p class="prose">Speed and stability remain table stakes. Core Web Vitals (LCP, INP, CLS) are ranking signals, and Svelte's compiled output naturally delivers small bundles and fast interaction. But performance alone does not rank a page. The real competitive advantage comes from pairing a fast, stable experience with authoritative, well-structured content that both humans and AI systems can trust and cite.</p>
	<p class="next">Next, you will learn how <code>{'<svelte:head>'}</code> lets you inject SEO-critical tags into the document head from any component.</p>
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
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
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
