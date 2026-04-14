<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const blogIndex = `${'<'}!-- src/routes/blog/+page.svelte — Blog index page -->
${'<'}script lang="ts">
  // Use import.meta.glob to load all blog posts
  const allPosts = ${"import"}.meta.glob('/src/routes/blog/posts/*.md', ${'{'}
    eager: true
  ${'}'});

  // Extract and sort by date
  const posts = Object.entries(allPosts)
    .map(([path, mod]) => (${'{'}
      slug: path.split('/').pop().replace('.md', ''),
      ...mod.metadata  // frontmatter values
    ${'}'}))
    .filter(p => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
${'<'}/script>

${'<'}h1>Blog${'<'}/h1>
${'{'} #each posts as post ${'}'}
  ${'<'}article>
    ${'<'}a href="/blog/posts/${'{'} post.slug ${'}'} ">
      ${'<'}h2>${'{'} post.title ${'}'} ${'<'}/h2>
      ${'<'}p>${'{'} post.description ${'}'} ${'<'}/p>
      ${'<'}time>${'{'} new Date(post.date).toLocaleDateString() ${'}'} ${'<'}/time>
      ${'{'} #if post.tags ${'}'}
        ${'{'} #each post.tags as tag ${'}'}
          ${'<'}span class="tag">${'{'} tag ${'}'} ${'<'}/span>
        ${'{'} /each ${'}'}
      ${'{'} /if ${'}'}
    ${'<'}/a>
  ${'<'}/article>
${'{'} /each ${'}'}`;

	const blogPost = `---
title: Building Forms with SvelteKit
description: A deep dive into progressive enhancement
date: 2026-04-13
tags: [sveltekit, forms, progressive-enhancement]
published: true
author: Jane Developer
image: /images/blog/forms-cover.jpg
---

${'<'}script>
  ${"import"} Alert from '$lib/components/Alert.svelte';
  ${"import"} CodeDemo from '$lib/components/CodeDemo.svelte';
${'<'}/script>

# ${'{'} title ${'}'}

${'<'}Alert type="info">
  This post assumes familiarity with SvelteKit form actions.
${'<'}/Alert>

## The Problem

Most form libraries require JavaScript. SvelteKit's form
actions work without it — progressive enhancement by default.

${'<'}CodeDemo filename="src/routes/login/+page.svelte">

\`\`\`svelte
${'<'}form method="POST" use:enhance>
  ${'<'}input name="email" type="email" required />
  ${'<'}button>Login${'<'}/button>
${'<'}/form>
\`\`\`

${'<'}/CodeDemo>

## Key Takeaways

1. **Always use ${'<'}code>method="POST"${'<'}/code>** for mutations
2. **Add ${'<'}code>use:enhance${'<'}/code>** for progressive enhancement
3. **Validate server-side** — client validation is UX, not security`;

	const rssGeneration = `// src/routes/blog/rss.xml/+server.ts — RSS feed
${"import"} type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => ${'{'} 
  const allPosts = ${"import"}.meta.glob('/src/routes/blog/posts/*.md', ${'{'} 
    eager: true
  ${'}'});

  const posts = Object.entries(allPosts)
    .map(([path, mod]) => (${'{'} 
      slug: path.split('/').pop().replace('.md', ''),
      ...mod.metadata
    ${'}'}))
    .filter(p => p.published !== false)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const xml = ${'`'} ${'<'}?xml version="1.0" encoding="UTF-8"?>
${'<'}rss version="2.0">
  ${'<'}channel>
    ${'<'}title>My Blog${'<'}/title>
    ${'<'}link>https://example.com/blog${'<'}/link>
    ${'$'}${'{'} posts.map(p => ${'`'}
    ${'<'}item>
      ${'<'}title>${'$'}${'{'} p.title ${'}'} ${'<'}/title>
      ${'<'}link>https://example.com/blog/posts/${'$'}${'{'} p.slug ${'}'} ${'<'}/link>
      ${'<'}description>${'$'}${'{'} p.description ${'}'} ${'<'}/description>
      ${'<'}pubDate>${'$'}${'{'} new Date(p.date).toUTCString() ${'}'} ${'<'}/pubDate>
    ${'<'}/item>${'`'}).join('') ${'}'}
  ${'<'}/channel>
${'<'}/rss>${'`'};

  return new Response(xml, ${'{'} 
    headers: ${'{'} 'Content-Type': 'application/xml' ${'}'}
  ${'}'});
${'}'};`;

	const dynamicRoutes = `// Dynamic slug routes for blog posts
//
// File structure:
// src/routes/blog/
// ├── +page.svelte          (blog index)
// ├── rss.xml/+server.ts    (RSS feed)
// └── posts/
//     ├── building-forms.md  → /blog/posts/building-forms
//     ├── svelte-5-runes.md  → /blog/posts/svelte-5-runes
//     └── css-oklch.md       → /blog/posts/css-oklch
//
// Each .md file IS the route — no +page.svelte wrapper needed.
// SvelteKit's file router + MDsveX extensions array handles it.
//
// For dynamic [slug] routes instead:
// src/routes/blog/[slug]/+page.ts
//   → load the post by slug from import.meta.glob`;

	const seoPattern = `${'<'}!-- SEO pattern for MDsveX blog posts -->
${'<'}!-- src/lib/layouts/BlogPost.svelte -->
${'<'}script lang="ts">
  let ${'{'} title, description, author, date, image, children ${'}'} = ${'$'}props();
${'<'}/script>

${'<'}svelte:head>
  ${'<'}title>${'{'} title ${'}'} | My Blog${'<'}/title>
  ${'<'}meta name="description" content=${'{'} description ${'}'} />
  ${'<'}meta property="og:title" content=${'{'} title ${'}'} />
  ${'<'}meta property="og:description" content=${'{'} description ${'}'} />
  ${'<'}meta property="og:type" content="article" />
  ${'{'} #if image ${'}'}
    ${'<'}meta property="og:image" content=${'{'} image ${'}'} />
  ${'{'} /if ${'}'}
  ${'<'}meta property="article:author" content=${'{'} author ${'}'} />
  ${'<'}meta property="article:published_time" content=${'{'} date ${'}'} />
${'<'}/svelte:head>

${'<'}article>
  ${'<'}header>
    ${'<'}h1>${'{'} title ${'}'} ${'<'}/h1>
    ${'<'}p class="meta">${'{'} author ${'}'} · ${'{'} new Date(date).toLocaleDateString() ${'}'} ${'<'}/p>
  ${'<'}/header>
  ${'{'} @render children() ${'}'}
${'<'}/article>`;

	const fullCode =
		"<script lang=\"ts\">\n  // Blog & content patterns\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.6 — Blog & Content Patterns</h1></section>";
</script>

<section class="page">
	<h1>MX.6 — Blog & Content Patterns</h1>
	<p class="concept">
		<strong>Concept.</strong> MDsveX + SvelteKit create a full content platform. Blog posts are
		<code>.md</code> files with frontmatter metadata, rendered as SvelteKit routes. The blog index
		uses <code>import.meta.glob</code> to discover and sort all posts. RSS feeds are generated from
		the same glob. SEO metadata flows from frontmatter → layout → <code>&lt;svelte:head&gt;</code>.
		This pattern scales from personal blogs to documentation sites to content-heavy applications.
	</p>

	<div class="build">
		<h3 class="section-title">Blog index with import.meta.glob</h3>
		<pre class="code-block"><code>{blogIndex}</code></pre>

		<h3 class="section-title">Blog post example</h3>
		<pre class="code-block"><code>{blogPost}</code></pre>

		<h3 class="section-title">RSS feed generation</h3>
		<pre class="code-block"><code>{rssGeneration}</code></pre>

		<h3 class="section-title">Dynamic routes</h3>
		<pre class="code-block"><code>{dynamicRoutes}</code></pre>

		<h3 class="section-title">SEO layout pattern</h3>
		<pre class="code-block"><code>{seoPattern}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Use <code>import.meta.glob</code> with <code>eager: false</code> and access <code>mod.metadata</code> directly.</strong> With lazy loading, <code>mod</code> is a function, not the module. You need <code>await mod()</code> first. Use <code>eager: true</code> for the blog index where you need all metadata upfront.</li>
		<li><strong>Forget to add <code>published: true</code> to a blog post's frontmatter.</strong> The filter <code>p.published !== false</code> still includes posts where <code>published</code> is <code>undefined</code>. Change the filter to <code>p.published === true</code> if you want explicit opt-in publishing.</li>
		<li><strong>Generate the RSS feed without escaping HTML entities in titles.</strong> A title containing <code>&amp;</code> or <code>&lt;</code> breaks the XML. Always escape XML entities in RSS output, or use a library like <code>feed</code> that handles escaping.</li>
		<li><strong>Use <code>import.meta.glob</code> with a variable pattern.</strong> Vite requires static strings for glob patterns — variables are not analyzed at build time. The pattern must be a string literal: <code>'/src/routes/blog/posts/*.md'</code>.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose"><code>import.meta.glob</code> is the discovery mechanism for MDsveX content. It replaces a CMS or database query — Vite statically analyzes the glob pattern at build time and creates lazy (or eager) loaders for each matching file. Combined with MDsveX's frontmatter exports, you get a type-safe content pipeline: glob discovers files → metadata provides sorting/filtering → SvelteKit routes render the content → layouts add consistent structure and SEO.</p>
	<p class="next">Next: <a href="/mdsvex/project">MDsveX — Module Project</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
