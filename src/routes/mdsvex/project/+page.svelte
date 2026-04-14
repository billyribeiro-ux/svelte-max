<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	let activeTab = $state<'config' | 'layout' | 'index' | 'post'>('config');

	const configCode = `// svelte.config.js — Full MDsveX blog configuration
${"import"} adapter from '@sveltejs/adapter-static';
${"import"} { mdsvex } from 'mdsvex';
${"import"} remarkGfm from 'remark-gfm';
${"import"} remarkToc from 'remark-toc';
${"import"} rehypeSlug from 'rehype-slug';
${"import"} rehypeAutolinkHeadings from 'rehype-autolink-headings';
${"import"} rehypeExternalLinks from 'rehype-external-links';

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      layout: {
        blog: './src/lib/layouts/BlogPost.svelte',
        _: './src/lib/layouts/Default.svelte'
      },
      remarkPlugins: [
        remarkGfm,
        remarkToc
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        [rehypeExternalLinks, {
          target: '_blank',
          rel: ['noopener', 'noreferrer']
        }]
      ],
      highlight: {
        highlighter: async (code, lang) => {
          const { createHighlighter } = await import('shiki');
          const hl = await createHighlighter({
            themes: ['github-dark', 'github-light'],
            langs: ['typescript', 'svelte', 'javascript', 'css', 'bash']
          });
          return hl.codeToHtml(code, {
            lang: lang || 'text',
            themes: { dark: 'github-dark', light: 'github-light' }
          });
        }
      }
    })
  ],
  kit: {
    adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html' })
  }
};`;

	const layoutCode = `${'<'}!-- src/lib/layouts/BlogPost.svelte -->
${'<'}script lang="ts">
  ${"import"} type { Snippet } from 'svelte';

  let ${'{'}
    title,
    description,
    author,
    date,
    tags = [],
    image,
    readingTime,
    children
  ${'}'}: ${'{'}
    title: string;
    description: string;
    author: string;
    date: string;
    tags?: string[];
    image?: string;
    readingTime?: number;
    children: Snippet;
  ${'}'} = ${'$'}props();

  const formattedDate = new Date(date).toLocaleDateString('en-US', ${'{'}
    year: 'numeric', month: 'long', day: 'numeric'
  ${'}'});
${'<'}/script>

${'<'}svelte:head>
  ${'<'}title>${'{'} title ${'}'} | My Blog${'<'}/title>
  ${'<'}meta name="description" content=${'{'} description ${'}'} />
  ${'<'}meta property="og:title" content=${'{'} title ${'}'} />
  ${'<'}meta property="og:description" content=${'{'} description ${'}'} />
  ${'<'}meta property="og:type" content="article" />
  ${'{'} #if image ${'}'} ${'<'}meta property="og:image" content=${'{'} image ${'}'} /> ${'{'} /if ${'}'}
  ${'<'}meta property="article:author" content=${'{'} author ${'}'} />
  ${'<'}meta property="article:published_time" content=${'{'} date ${'}'} />
${'<'}/svelte:head>

${'<'}article class="blog-post">
  ${'<'}header class="post-header">
    ${'<'}h1>${'{'} title ${'}'} ${'<'}/h1>
    ${'<'}div class="meta">
      ${'<'}span>${'{'} author ${'}'} ${'<'}/span>
      ${'<'}time datetime=${'{'} date ${'}'} >${'{'} formattedDate ${'}'} ${'<'}/time>
      ${'{'} #if readingTime ${'}'} ${'<'}span>${'{'} readingTime ${'}'} min read${'<'}/span> ${'{'} /if ${'}'}
    ${'<'}/div>
    ${'{'} #if tags.length ${'}'}
      ${'<'}div class="tags">
        ${'{'} #each tags as tag ${'}'}
          ${'<'}a href="/blog?tag=${'{'} tag ${'}'}" class="tag">${'{'} tag ${'}'} ${'<'}/a>
        ${'{'} /each ${'}'}
      ${'<'}/div>
    ${'{'} /if ${'}'}
  ${'<'}/header>

  ${'<'}div class="post-content">
    ${'{'} @render children() ${'}'}
  ${'<'}/div>
${'<'}/article>`;

	const indexCode = `${'<'}!-- src/routes/blog/+page.svelte — Blog index -->
${'<'}script lang="ts">
  const allPosts = ${"import"}.meta.glob('/src/routes/blog/posts/*.md', ${'{'}
    eager: true
  ${'}'});

  const posts = Object.entries(allPosts)
    .map(([path, mod]) => (${'{'}
      slug: path.split('/').pop().replace('.md', ''),
      ...mod.metadata
    ${'}'}))
    .filter(p => p.published === true)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  let selectedTag = ${'$'}state${'<'}string | null>(null);

  const filteredPosts = ${'$'}derived(
    selectedTag
      ? posts.filter(p => p.tags?.includes(selectedTag))
      : posts
  );

  const allTags = ${'$'}derived(
    [...new Set(posts.flatMap(p => p.tags || []))].sort()
  );
${'<'}/script>

${'<'}svelte:head>
  ${'<'}title>Blog | My Site${'<'}/title>
  ${'<'}meta name="description" content="Articles about Svelte, SvelteKit, and web development" />
${'<'}/svelte:head>

${'<'}section class="blog-index">
  ${'<'}h1>Blog${'<'}/h1>

  ${'<'}div class="tag-filter">
    ${'<'}button class:active=${'{'} !selectedTag ${'}'} onclick=${'{'} () => selectedTag = null ${'}'}>All${'<'}/button>
    ${'{'} #each allTags as tag ${'}'}
      ${'<'}button class:active=${'{'} selectedTag === tag ${'}'} onclick=${'{'} () => selectedTag = tag ${'}'}>
        ${'{'} tag ${'}'}
      ${'<'}/button>
    ${'{'} /each ${'}'}
  ${'<'}/div>

  ${'{'} #each filteredPosts as post (post.slug) ${'}'}
    ${'<'}article class="post-card">
      ${'<'}a href="/blog/posts/${'{'} post.slug ${'}'}">
        ${'<'}h2>${'{'} post.title ${'}'} ${'<'}/h2>
        ${'<'}p>${'{'} post.description ${'}'} ${'<'}/p>
        ${'<'}div class="post-meta">
          ${'<'}time>${'{'} new Date(post.date).toLocaleDateString() ${'}'} ${'<'}/time>
          ${'<'}span>${'{'} post.author ${'}'} ${'<'}/span>
        ${'<'}/div>
      ${'<'}/a>
    ${'<'}/article>
  ${'{'} /each ${'}'}
${'<'}/section>`;

	const postCode = `---
title: Understanding Svelte 5 Runes
description: A deep dive into ${'$'}state, ${'$'}derived, ${'$'}effect, and ${'$'}props
author: Jane Developer
date: 2026-04-13
tags: [svelte, runes, reactivity]
published: true
layout: blog
image: /images/blog/runes-cover.jpg
---

${'<'}script>
  ${"import"} Alert from '$lib/components/Alert.svelte';

  let count = ${'$'}state(0);
  const doubled = ${'$'}derived(count * 2);
${'<'}/script>

## Table of Contents

## What are Runes?

Runes are Svelte 5's compiler-level reactivity primitives.

${'<'}Alert type="info">
  Runes replace the implicit \`$:\` reactive declarations from Svelte 4.
${'<'}/Alert>

## Live Demo

Count: **${'{'} count ${'}'}** (doubled: **${'{'} doubled ${'}'}**)

${'<'}button onclick=${'{'} () => count++ ${'}'}>Increment${'<'}/button>

## The Four Core Runes

| Rune | Purpose | Svelte 4 Equivalent |
|------|---------|---------------------|
| \`${'$'}state()\` | Reactive variable | \`let x = 0\` |
| \`${'$'}derived()\` | Computed value | \`$: doubled = x * 2\` |
| \`${'$'}effect()\` | Side effect | \`$: ${'{'} console.log(x) ${'}'}\` |
| \`${'$'}props()\` | Component props | \`export let name\` |

## Key Takeaways

1. Runes are **explicit** — no magic reactivity
2. They work in **\`.svelte.ts\`** files too
3. They are **compiled away** — zero runtime cost`;

	const fullCode =
		"// MDsveX project: complete blog with layouts, SEO, tags, RSS, Shiki highlighting";
</script>

<section class="page">
	<h1>MDsveX — Module Project</h1>
	<p class="concept">
		<strong>Module project.</strong> A complete blog platform built with MDsveX + SvelteKit.
		Features: named layouts with SEO metadata, <code>import.meta.glob</code> content discovery,
		tag filtering, GFM tables + auto-generated TOC via remark, heading anchors + external link
		handling via rehype, Shiki dual-theme syntax highlighting, and static deployment via
		<code>adapter-static</code>.
	</p>

	<div class="tab-bar">
		<button class:active={activeTab === 'config'} onclick={() => activeTab = 'config'}>Config</button>
		<button class:active={activeTab === 'layout'} onclick={() => activeTab = 'layout'}>Layout</button>
		<button class:active={activeTab === 'index'} onclick={() => activeTab = 'index'}>Index</button>
		<button class:active={activeTab === 'post'} onclick={() => activeTab = 'post'}>Post</button>
	</div>

	<div class="project-build">
		{#if activeTab === 'config'}
			<h3 class="section-title">svelte.config.js</h3>
			<pre class="code-block"><code>{configCode}</code></pre>
		{:else if activeTab === 'layout'}
			<h3 class="section-title">BlogPost layout</h3>
			<pre class="code-block"><code>{layoutCode}</code></pre>
		{:else if activeTab === 'index'}
			<h3 class="section-title">Blog index page</h3>
			<pre class="code-block"><code>{indexCode}</code></pre>
		{:else}
			<h3 class="section-title">Example blog post</h3>
			<pre class="code-block"><code>{postCode}</code></pre>
		{/if}
	</div>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="project" code={fullCode} />
	</details>

	<h2>What this project proves</h2>
	<p class="prose">This blog integrates every MDsveX feature: frontmatter metadata drives SEO and navigation, named layouts provide consistent structure, remark/rehype plugins add GFM tables and heading anchors, Shiki provides dual-theme syntax highlighting, and <code>import.meta.glob</code> discovers content at build time. Interactive Svelte components work inside markdown — the blog post demo includes a live counter alongside prose. The entire site deploys as static files with zero server infrastructure.</p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.tab-bar { display: flex; gap: var(--space-xs); flex-wrap: wrap; & button { padding: var(--space-xs) var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-md); font-size: var(--text-sm); cursor: pointer; color: var(--color-text-muted); &.active { background: var(--color-surface-2); color: var(--color-text); border-color: var(--color-brand); } } }
	.project-build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; max-block-size: 500px; }
	.code-block code { background: transparent; padding: 0; }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
