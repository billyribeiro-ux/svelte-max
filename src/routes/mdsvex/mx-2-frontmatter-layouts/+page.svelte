<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const frontmatterExample = `---
title: Building a REST API
description: Step-by-step guide to building APIs with SvelteKit
author: Jane Developer
date: 2026-04-13
tags: [api, sveltekit, rest]
published: true
---

# {title}

By **{author}** — {new Date(date).toLocaleDateString()}

<!-- Frontmatter values are available as variables in the template -->
<!-- They're also exported as module-level exports for layouts -->`;

	const layoutConfig = `// svelte.config.js — Layout configuration
${"import"} { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.md'],
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      layout: {
        // Default layout for all .md files
        _: './src/lib/layouts/DefaultArticle.svelte',

        // Named layouts (match via frontmatter 'layout' field)
        blog: './src/lib/layouts/BlogPost.svelte',
        docs: './src/lib/layouts/DocsPage.svelte',
        changelog: './src/lib/layouts/Changelog.svelte'
      }
    })
  ]
};`;

	const layoutComponent = `<!-- src/lib/layouts/BlogPost.svelte -->
<script lang="ts">
  // Frontmatter values are passed as props
  let {
    title,
    author,
    date,
    description,
    tags = [],
    children   // the rendered markdown content
  }: {
    title: string;
    author: string;
    date: string;
    description: string;
    tags?: string[];
    children: any;
  } = $props();
<\/script>

<article class="blog-post">
  <header>
    <h1>{title}</h1>
    <p class="meta">
      By {author} &middot; {new Date(date).toLocaleDateString()}
    </p>
    {#if tags.length}
      <div class="tags">
        {#each tags as tag}
          <span class="tag">{tag}</span>
        {/each}
      </div>
    {/if}
  </header>

  <div class="content">
    {@render children()}
  </div>
</article>`;

	const namedLayout = `---
title: v2.0 Release Notes
layout: changelog
date: 2026-04-13
---

<!-- This file uses the 'changelog' layout -->
<!-- The 'layout' frontmatter field selects which layout to use -->

## New Features
- Added dark mode support
- Improved search performance

## Bug Fixes
- Fixed sidebar collapse on mobile
- Fixed code block copy button`;

	const disableLayout = `---
title: Custom Page
layout: false
---

<!-- layout: false disables the layout entirely -->
<!-- The markdown renders without any wrapper component -->
<!-- Useful for pages that need fully custom structure -->

<script>
  // Full control — no layout wrapper
  let show = $state(false);
<\/script>

# Custom page with no layout

<button onclick={() => show = !show}>Toggle</button>
{#if show}<p>Visible!</p>{/if}`;

	const fullCode =
		"<script lang=\"ts\">\n  // Frontmatter & layouts\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.2 — Frontmatter & Layouts</h1></section>";
</script>

<section class="page">
	<h1>MX.2 — Frontmatter & Layouts</h1>
	<p class="concept">
		<strong>Concept.</strong> Frontmatter is YAML metadata between <code>---</code> delimiters at the
		top of a markdown file. Values are available as template variables and as module exports passed
		to layout components. Layouts wrap markdown content with consistent structure — headers, sidebars,
		navigation. Named layouts (selected via the <code>layout</code> frontmatter field) let different
		content types use different wrappers: blog posts get author/date headers, docs get sidebars,
		changelogs get version badges.
	</p>

	<div class="build">
		<h3 class="section-title">Frontmatter</h3>
		<pre class="code-block"><code>{frontmatterExample}</code></pre>

		<h3 class="section-title">Layout configuration</h3>
		<pre class="code-block"><code>{layoutConfig}</code></pre>

		<h3 class="section-title">Layout component (Svelte 5)</h3>
		<pre class="code-block"><code>{layoutComponent}</code></pre>

		<h3 class="section-title">Named layout</h3>
		<pre class="code-block"><code>{namedLayout}</code></pre>

		<h3 class="section-title">Disable layout</h3>
		<pre class="code-block"><code>{disableLayout}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Reference a named layout that doesn't exist in the config.</strong> MDsveX falls back to the default layout (<code>_</code>). If no default is configured, the content renders without a wrapper. No error — just silent fallback.</li>
		<li><strong>Use a frontmatter field name that conflicts with a Svelte reserved word.</strong> Names like <code>class</code>, <code>let</code>, or <code>function</code> break the generated component because they're used as prop names. Stick to simple nouns: <code>title</code>, <code>author</code>, <code>date</code>, <code>tags</code>.</li>
		<li><strong>Set <code>layout: false</code> and try to access frontmatter values.</strong> Frontmatter values are still available as template variables inside the markdown. <code>layout: false</code> only disables the wrapper component — it doesn't strip frontmatter.</li>
		<li><strong>Define a layout component that doesn't accept <code>children</code>.</strong> The markdown content is passed as a snippet. Without <code>children</code> in <code>$props()</code>, the content is silently dropped — the layout renders its own markup but the markdown body disappears.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Frontmatter and layouts create a content pipeline: frontmatter defines metadata → MDsveX extracts it as module exports → layout components receive it as props and wrap the content. Named layouts let you define content archetypes (blog, docs, changelog) with dedicated wrappers. The <code>children</code> snippet in Svelte 5 layouts replaces the implicit slot — you must explicitly render <code>{'{@render children()}'}</code> to include the markdown body.</p>
	<p class="next">Next lesson: <a href="/mdsvex/mx-3-components-in-markdown">MX.3 — Components in Markdown</a></p>
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
