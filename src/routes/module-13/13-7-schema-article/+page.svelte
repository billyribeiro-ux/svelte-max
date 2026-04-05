<script lang="ts">
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

  <h3>What you learned</h3>
  <ul>
    <li>Article schema gives blog posts headline, author, dates, image, publisher.</li>
    <li>BreadcrumbList uses position-numbered ListItems to describe hierarchy.</li>
    <li>Both can live in the same <code>{'<head>'}</code> as separate JSON-LD blocks.</li>
    <li>The visible breadcrumb UI should mirror the schema, not diverge from it.</li>
  </ul>
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
  pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; max-height: 420px; }
  pre code { background: transparent; padding: 0; font-size: inherit; }
  h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
  ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
  @media (min-width: 768px) {
    h1 { font-size: var(--text-2xl); }
    .json-grid { grid-template-columns: 1fr 1fr; }
  }
</style>
