<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';
  type Person = { '@type': 'Person'; name: string; url: string };
  type Organization = { '@type': 'Organization'; name: string; url: string };
  type ArticleSchema = {
    '@context': 'https://schema.org';
    '@type': 'Article';
    headline: string;
    description: string;
    image: string;
    datePublished: string;
    dateModified: string;
    author: Person;
    publisher: Organization;
    mainEntityOfPage: string;
  };

  type BreadcrumbItem = {
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  };
  type BreadcrumbListSchema = {
    '@context': 'https://schema.org';
    '@type': 'BreadcrumbList';
    itemListElement: BreadcrumbItem[];
  };

  const article: ArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Article & BreadcrumbList schemas',
    description:
      'How to combine Article and BreadcrumbList JSON-LD to make blog posts look premium in search results.',
    image: 'https://svelte-max.example/og/article-cover.png',
    datePublished: '2026-03-12',
    dateModified: '2026-04-01',
    author: {
      '@type': 'Person',
      name: 'Maxim Hartshorn',
      url: 'https://svelte-max.example/authors/maxim'
    },
    publisher: {
      '@type': 'Organization',
      name: 'svelte-max',
      url: 'https://svelte-max.example'
    },
    mainEntityOfPage: 'https://svelte-max.example/module-13/13-7-schema-article'
  };

  const breadcrumbs: BreadcrumbListSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://svelte-max.example/' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Module 13',
        item: 'https://svelte-max.example/module-13'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Article & BreadcrumbList schemas',
        item: 'https://svelte-max.example/module-13/13-7-schema-article'
      }
    ]
  };

  const articleJson = JSON.stringify(article, null, 2);
  const breadcrumbJson = JSON.stringify(breadcrumbs, null, 2);
  const articleScript = `<script type="application/ld+json">${JSON.stringify(article)}<\/script>`;
  const breadcrumbScript = `<script type="application/ld+json">${JSON.stringify(breadcrumbs)}<\/script>`;


	/* ── Complete code for "Having issues?" ── */
	const fullCode = "\u003cscript lang=\"ts\"\u003e\n" +
		"type Person = { '@type': 'Person'; name: string; url: string };\n" +
		"  type Organization = { '@type': 'Organization'; name: string; url: string };\n" +
		"  type ArticleSchema = {\n" +
		"    '@context': 'https://schema.org';\n" +
		"    '@type': 'Article';\n" +
		"    headline: string;\n" +
		"    description: string;\n" +
		"    image: string;\n" +
		"    datePublished: string;\n" +
		"    dateModified: string;\n" +
		"    author: Person;\n" +
		"    publisher: Organization;\n" +
		"    mainEntityOfPage: string;\n" +
		"  };\n" +
		"\n" +
		"  type BreadcrumbItem = {\n" +
		"    '@type': 'ListItem';\n" +
		"    position: number;\n" +
		"    name: string;\n" +
		"    item: string;\n" +
		"  };\n" +
		"  type BreadcrumbListSchema = {\n" +
		"    '@context': 'https://schema.org';\n" +
		"    '@type': 'BreadcrumbList';\n" +
		"    itemListElement: BreadcrumbItem[];\n" +
		"  };\n" +
		"\n" +
		"  const article: ArticleSchema = {\n" +
		"    '@context': 'https://schema.org',\n" +
		"    '@type': 'Article',\n" +
		"    headline: 'Article & BreadcrumbList schemas',\n" +
		"    description:\n" +
		"      'How to combine Article and BreadcrumbList JSON-LD to make blog posts look premium in search results.',\n" +
		"    image: 'https://svelte-max.example/og/article-cover.png',\n" +
		"    datePublished: '2026-03-12',\n" +
		"    dateModified: '2026-04-01',\n" +
		"    author: {\n" +
		"      '@type': 'Person',\n" +
		"      name: 'Maxim Hartshorn',\n" +
		"      url: 'https://svelte-max.example/authors/maxim'\n" +
		"    },\n" +
		"    publisher: {\n" +
		"      '@type': 'Organization',\n" +
		"      name: 'svelte-max',\n" +
		"      url: 'https://svelte-max.example'\n" +
		"    },\n" +
		"    mainEntityOfPage: 'https://svelte-max.example/module-13/13-7-schema-article'\n" +
		"  };\n" +
		"\n" +
		"  const breadcrumbs: BreadcrumbListSchema = {\n" +
		"    '@context': 'https://schema.org',\n" +
		"    '@type': 'BreadcrumbList',\n" +
		"    itemListElement: [\n" +
		"      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://svelte-max.example/' },\n" +
		"      {\n" +
		"        '@type': 'ListItem',\n" +
		"        position: 2,\n" +
		"        name: 'Module 13',\n" +
		"        item: 'https://svelte-max.example/module-13'\n" +
		"      },\n" +
		"      {\n" +
		"        '@type': 'ListItem',\n" +
		"        position: 3,\n" +
		"        name: 'Article & BreadcrumbList schemas',\n" +
		"        item: 'https://svelte-max.example/module-13/13-7-schema-article'\n" +
		"      }\n" +
		"    ]\n" +
		"  };\n" +
		"\n" +
		"  const articleJson = JSON.stringify(article, null, 2);\n" +
		"  const breadcrumbJson = JSON.stringify(breadcrumbs, null, 2);\n" +
		"  const articleScript = `\u003cscript type=\"application/ld+json\"\u003e${JSON.stringify(article)}\u003c\\/script\u003e`;\n" +
		"  const breadcrumbScript = `\u003cscript type=\"application/ld+json\"\u003e${JSON.stringify(breadcrumbs)}\u003c\\/script\u003e`;\n" +
		"\u003c/script\u003e\n" +
		"\n" +
		"\u003csvelte:head\u003e\n" +
		"  \u003ctitle\u003eArticle &amp; BreadcrumbList schemas — svelte-max\u003c/title\u003e\n" +
		"  \u003cmeta name=\"description\" content=\"Combine Article and BreadcrumbList JSON-LD to enrich blog posts in Google SERPs.\" /\u003e\n" +
		"  {@html articleScript}\n" +
		"  {@html breadcrumbScript}\n" +
		"\u003c/svelte:head\u003e\n" +
		"\n" +
		"\u003csection class=\"page\"\u003e\n" +
		"  \u003ch1\u003e13.7 — Article &amp; BreadcrumbList schemas\u003c/h1\u003e\n" +
		"  \u003cp class=\"concept\"\u003e\n" +
		"    \u003cstrong\u003eConcept.\u003c/strong\u003e \u003ccode\u003eArticle\u003c/code\u003e is one of the most-used schemas — use it for\n" +
		"    blog posts, news, and tutorials. Key fields: \u003ccode\u003eheadline\u003c/code\u003e, \u003ccode\u003eauthor\u003c/code\u003e\n" +
		"    (Person), \u003ccode\u003edatePublished\u003c/code\u003e, \u003ccode\u003edateModified\u003c/code\u003e, \u003ccode\u003eimage\u003c/code\u003e,\n" +
		"    \u003ccode\u003epublisher\u003c/code\u003e (Organization). \u003ccode\u003eBreadcrumbList\u003c/code\u003e describes navigation\n" +
		"    hierarchy with position-numbered \u003ccode\u003eListItem\u003c/code\u003es. Google uses BreadcrumbList to render\n" +
		"    breadcrumb trails under your SERP result. Together they make blog posts look premium in\n" +
		"    search.\n" +
		"  \u003c/p\u003e\n" +
		"\n" +
		"  \u003cdiv class=\"build\"\u003e\n" +
		"    \u003cnav aria-label=\"Breadcrumb\" class=\"crumbs\"\u003e\n" +
		"      \u003col\u003e\n" +
		"        {#each breadcrumbs.itemListElement as crumb, i (crumb.position)}\n" +
		"          \u003cli\u003e\n" +
		"            \u003ca href={crumb.item}\u003e{crumb.name}\u003c/a\u003e\n" +
		"            {#if i \u003c breadcrumbs.itemListElement.length - 1}\n" +
		"              \u003cspan aria-hidden=\"true\" class=\"sep\"\u003e/\u003c/span\u003e\n" +
		"            {/if}\n" +
		"          \u003c/li\u003e\n" +
		"        {/each}\n" +
		"      \u003c/ol\u003e\n" +
		"    \u003c/nav\u003e\n" +
		"\n" +
		"    \u003carticle class=\"post\"\u003e\n" +
		"      \u003ch2\u003e{article.headline}\u003c/h2\u003e\n" +
		"      \u003cp class=\"byline\"\u003e\n" +
		"        By \u003cstrong\u003e{article.author.name}\u003c/strong\u003e · published {article.datePublished} · updated\n" +
		"        {article.dateModified}\n" +
		"      \u003c/p\u003e\n" +
		"      \u003cp class=\"excerpt\"\u003e{article.description}\u003c/p\u003e\n" +
		"    \u003c/article\u003e\n" +
		"\n" +
		"    \u003cdiv class=\"json-grid\"\u003e\n" +
		"      \u003cdiv\u003e\n" +
		"        \u003ch3 class=\"snippet-title\"\u003eArticle JSON-LD\u003c/h3\u003e\n" +
		"        \u003cpre\u003e\u003ccode\u003e{articleJson}\u003c/code\u003e\u003c/pre\u003e\n" +
		"      \u003c/div\u003e\n" +
		"      \u003cdiv\u003e\n" +
		"        \u003ch3 class=\"snippet-title\"\u003eBreadcrumbList JSON-LD\u003c/h3\u003e\n" +
		"        \u003cpre\u003e\u003ccode\u003e{breadcrumbJson}\u003c/code\u003e\u003c/pre\u003e\n" +
		"      \u003c/div\u003e\n" +
		"    \u003c/div\u003e\n" +
		"  \u003c/div\u003e\n" +
		"\n" +
		"  \u003ch3\u003eWhat you learned\u003c/h3\u003e\n" +
		"  \u003cul\u003e\n" +
		"    \u003cli\u003eArticle schema gives blog posts headline, author, dates, image, publisher.\u003c/li\u003e\n" +
		"    \u003cli\u003eBreadcrumbList uses position-numbered ListItems to describe hierarchy.\u003c/li\u003e\n" +
		"    \u003cli\u003eBoth can live in the same \u003ccode\u003e{'\u003chead\u003e'}\u003c/code\u003e as separate JSON-LD blocks.\u003c/li\u003e\n" +
		"    \u003cli\u003eThe visible breadcrumb UI should mirror the schema, not diverge from it.\u003c/li\u003e\n" +
		"  \u003c/ul\u003e\n" +
		"\u003c/section\u003e";
</script>

<svelte:head>
  <title>Article &amp; BreadcrumbList schemas — svelte-max</title>
  <meta name="description" content="Combine Article and BreadcrumbList JSON-LD to enrich blog posts in Google SERPs." />
  {@html articleScript}
  {@html breadcrumbScript}
</svelte:head>

<section class="page">
  <h1>13.7 — Article &amp; BreadcrumbList schemas</h1>
  <p class="concept">
    <strong>Concept.</strong> <code>Article</code> is one of the most-used schemas — use it for
    blog posts, news, and tutorials. Key fields: <code>headline</code>, <code>author</code>
    (Person), <code>datePublished</code>, <code>dateModified</code>, <code>image</code>,
    <code>publisher</code> (Organization). <code>BreadcrumbList</code> describes navigation
    hierarchy with position-numbered <code>ListItem</code>s. Google uses BreadcrumbList to render
    breadcrumb trails under your SERP result. Together they make blog posts look premium in
    search.
  </p>

  <div class="build">
    <nav aria-label="Breadcrumb" class="crumbs">
      <ol>
        {#each breadcrumbs.itemListElement as crumb, i (crumb.position)}
          <li>
            <a href={crumb.item}>{crumb.name}</a>
            {#if i < breadcrumbs.itemListElement.length - 1}
              <span aria-hidden="true" class="sep">/</span>
            {/if}
          </li>
        {/each}
      </ol>
    </nav>

    <article class="post">
      <h2>{article.headline}</h2>
      <p class="byline">
        By <strong>{article.author.name}</strong> · published {article.datePublished} · updated
        {article.dateModified}
      </p>
      <p class="excerpt">{article.description}</p>
    </article>

    <div class="json-grid">
      <div>
        <h3 class="snippet-title">Article JSON-LD</h3>
        <pre><code>{articleJson}</code></pre>
      </div>
      <div>
        <h3 class="snippet-title">BreadcrumbList JSON-LD</h3>
        <pre><code>{breadcrumbJson}</code></pre>
      </div>
    </div>
  </div>


	<h2>Break it on purpose</h2>
	<p class="prose">Each experiment exposes a schema validation or rendering issue. Revert after every change.</p>
	<ol class="experiments">
		<li><strong>Remove the <code>author</code> field from the Article schema object.</strong> Google's Rich Results Test will flag the missing required field, and the article will not be eligible for rich result features like author attribution in SERPs. The <code>author</code> field with a Person type is mandatory for Article schema validation.</li>
		<li><strong>Set <code>datePublished</code> to an invalid format like <code>"March 12, 2026"</code> instead of ISO 8601.</strong> Schema.org date fields require ISO 8601 format (YYYY-MM-DD). Google silently ignores invalid dates, so your article loses its publication date signal in search results and may appear less fresh than competitors with valid dates.</li>
		<li><strong>Scramble the <code>position</code> numbers in the BreadcrumbList (e.g., 3, 1, 2 instead of 1, 2, 3).</strong> Google uses the position numbers to determine the breadcrumb order. Scrambled positions produce a nonsensical breadcrumb trail in SERPs, even though the visible UI may look correct because it renders from the array order, not the position field.</li>
		<li><strong>Make the visible breadcrumb UI show different text than the BreadcrumbList schema names.</strong> Google may detect the inconsistency between the visible content and the structured data and penalise or ignore the schema. The structured data must faithfully represent what the user actually sees on the page.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<p>If your version is not working, compare it line-by-line with this reference.</p>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The Article schema is one of the most widely used structured data types, powering rich results for blog posts, news articles, and tutorials. Its key fields include <code>headline</code>, <code>author</code> (a Person with name and URL), <code>datePublished</code> and <code>dateModified</code> in ISO 8601 format, <code>image</code>, and <code>publisher</code> (an Organization). Together these fields give search engines everything they need to display an attribution-rich result with author, date, and publication info.</p>
	<p class="prose">BreadcrumbList is a complementary schema that describes your site's navigation hierarchy using position-numbered <code>ListItem</code> entries. Google renders these as a breadcrumb trail beneath the page title in search results, replacing the raw URL. Each item needs a sequential <code>position</code>, a human-readable <code>name</code>, and an absolute <code>item</code> URL. The visible breadcrumb UI on the page should exactly mirror the schema data to avoid consistency penalties.</p>
	<p class="prose">A single page can contain multiple JSON-LD script blocks, one per schema type. The Article and BreadcrumbList schemas are injected separately into <code>{'<svelte:head>'}</code> using <code>{'@html'}</code>. This modular approach keeps each schema object focused and makes it easy to conditionally include schemas based on page type. For example, a blog post gets both Article and BreadcrumbList, while a category page might get only BreadcrumbList and ItemList.</p>
	<p class="next">Next, you will learn how Product, FAQ, and Organization schemas power rich results for e-commerce, knowledge panels, and Q&amp;A sections.</p>
</section>

<style>
  .page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
  .concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
  .concept strong { color: var(--color-text); }
  .build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
  .crumbs ol { list-style: none; display: flex; flex-wrap: wrap; gap: var(--space-xs); padding: 0; margin: 0; }
  .crumbs li { display: flex; gap: var(--space-xs); align-items: center; font-size: var(--text-sm); }
  .crumbs a { color: var(--color-brand); text-decoration: none; }
  .crumbs a:hover { text-decoration: underline; }
  .sep { color: var(--color-text-muted); }
  .post { border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); background: var(--color-surface-2); display: flex; flex-direction: column; gap: var(--space-xs); }
  .post h2 { margin: 0; font-size: var(--text-lg); color: var(--color-text); }
  .byline { margin: 0; font-size: var(--text-xs); color: var(--color-text-muted); }
  .byline strong { color: var(--color-text); }
  .excerpt { margin: 0; font-size: var(--text-sm); color: var(--color-text-muted); line-height: 1.5; }
  .json-grid { display: grid; grid-template-columns: 1fr; gap: var(--space-md); }
  .snippet-title { margin: 0 0 var(--space-xs) 0; font-size: var(--text-sm); color: var(--color-text); }
  code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; max-block-size: 420px; }
  pre code { background: transparent; padding: 0; font-size: inherit; }
  .prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
  .next { margin-block-start: var(--space-xl); color: var(--color-text); }
  @media (min-inline-size: 768px) {
    h1 { font-size: var(--text-2xl); }
    .json-grid { grid-template-columns: 1fr 1fr; }
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
	@media (min-inline-size: 480px) {
		.concept { max-inline-size: 65ch; }
	}
	@media (min-inline-size: 768px) {
		h1 { font-size: var(--text-2xl); }
		h2 { font-size: var(--text-xl); }
		.concept { max-inline-size: 72ch; }
	}
	@media (min-inline-size: 1024px) {
		.concept { max-inline-size: 80ch; }
	}
</style>
