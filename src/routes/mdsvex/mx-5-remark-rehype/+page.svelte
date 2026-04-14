<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const remarkPlugins = `// Remark plugins transform the markdown AST BEFORE HTML conversion
// They operate on the MDAST (markdown abstract syntax tree)
//
// svelte.config.js
${"import"} { mdsvex } from 'mdsvex';
${"import"} remarkGfm from 'remark-gfm';
${"import"} remarkToc from 'remark-toc';
${"import"} remarkUnwrapImages from 'remark-unwrap-images';

export default {
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      remarkPlugins: [
        remarkGfm,              // GitHub Flavored Markdown (tables, task lists, strikethrough)
        remarkToc,              // Auto-generate table of contents from ## Table of Contents
        remarkUnwrapImages      // Remove wrapping <p> from images
      ]
    })
  ]
};`;

	const rehypePlugins = `// Rehype plugins transform the HTML AST AFTER markdown→HTML conversion
// They operate on the HAST (HTML abstract syntax tree)
//
${"import"} rehypeSlug from 'rehype-slug';
${"import"} rehypeAutolinkHeadings from 'rehype-autolink-headings';
${"import"} rehypeExternalLinks from 'rehype-external-links';

export default {
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      rehypePlugins: [
        rehypeSlug,                // Add id attributes to headings
        [rehypeAutolinkHeadings, { // Add anchor links to headings
          behavior: 'wrap',
          properties: { class: 'heading-link' }
        }],
        [rehypeExternalLinks, {    // Add target="_blank" to external links
          target: '_blank',
          rel: ['noopener', 'noreferrer']
        }]
      ]
    })
  ]
};`;

	const pipeline = `// The full MDsveX processing pipeline:
//
// 1. YAML frontmatter  → extracted as module exports
// 2. Remark plugins    → transform markdown AST (MDAST)
//    remarkGfm         → tables, task lists, strikethrough
//    remarkToc          → auto-generate TOC
//    remarkMath         → LaTeX math blocks
// 3. Markdown → HTML   → unified/remark converts MDAST to HAST
// 4. Rehype plugins    → transform HTML AST (HAST)
//    rehypeSlug         → heading IDs
//    rehypeAutolink     → heading anchor links
//    rehypeExternal     → external link attributes
//    rehypeKatex        → render LaTeX to HTML
// 5. Syntax highlight  → code blocks highlighted (Shiki/Prism)
// 6. Svelte compile    → HTML + script → Svelte component
//
// Each step is a pure function: AST in → AST out
// Plugins are composable — add/remove without side effects`;

	const customPlugin = `// Writing a custom remark plugin
// Adds reading time estimate to frontmatter

function remarkReadingTime() {
  return (tree, file) => {
    // Count words in the markdown AST
    let wordCount = 0;
    visit(tree, 'text', (node) => {
      wordCount += node.value.split(/\\s+/).filter(Boolean).length;
    });

    // Add to frontmatter data
    const readingTime = Math.ceil(wordCount / 200); // 200 WPM
    file.data.fm = file.data.fm || {};
    file.data.fm.readingTime = readingTime;
  };
}

// Usage in svelte.config.js:
// remarkPlugins: [remarkReadingTime]
//
// Access in layout:
// let { readingTime } = $props();
// → "5 min read"`;

	const pluginOptions = `// Plugins with options use array syntax:
// [plugin, options]
//
// remarkPlugins: [
//   remarkGfm,                          // no options
//   [remarkToc, { maxDepth: 3 }],       // with options
//   [remarkMath, { singleDollar: true }] // with options
// ]
//
// rehypePlugins: [
//   rehypeSlug,                          // no options
//   [rehypeAutolinkHeadings, {           // with options
//     behavior: 'prepend',
//     content: { type: 'text', value: '#' }
//   }]
// ]
//
// Popular plugin combinations:
//   Blog:   remarkGfm + remarkToc + rehypeSlug + rehypeAutolink
//   Docs:   remarkGfm + rehypeSlug + rehypeAutolink + rehypeExternal
//   Math:   remarkMath + rehypeKatex
//   Academic: all of the above`;

	const fullCode =
		"<script lang=\"ts\">\n  // Remark & rehype plugins\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.5 — Remark & Rehype Plugins</h1></section>";
</script>

<section class="page">
	<h1>MX.5 — Remark & Rehype Plugins</h1>
	<p class="concept">
		<strong>Concept.</strong> MDsveX is built on the <strong>unified</strong> ecosystem. Remark
		plugins transform the markdown AST before HTML conversion (add GFM tables, auto-generate TOC,
		parse math). Rehype plugins transform the HTML AST after conversion (add heading IDs, anchor
		links, external link attributes). The pipeline is composable: each plugin is a pure AST
		transformation, and you can write custom plugins for reading time, custom containers, or
		metadata extraction.
	</p>

	<div class="build">
		<h3 class="section-title">Remark plugins (markdown AST)</h3>
		<pre class="code-block"><code>{remarkPlugins}</code></pre>

		<h3 class="section-title">Rehype plugins (HTML AST)</h3>
		<pre class="code-block"><code>{rehypePlugins}</code></pre>

		<h3 class="section-title">Processing pipeline</h3>
		<pre class="code-block"><code>{pipeline}</code></pre>

		<h3 class="section-title">Custom plugin (reading time)</h3>
		<pre class="code-block"><code>{customPlugin}</code></pre>

		<h3 class="section-title">Plugin options syntax</h3>
		<pre class="code-block"><code>{pluginOptions}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Use <code>rehypeSlug</code> without <code>rehypeAutolinkHeadings</code>.</strong> Headings get <code>id</code> attributes but no visible anchor links. Direct URL navigation (<code>#section-name</code>) works, but users can't discover anchor links by hovering headings. Use both together.</li>
		<li><strong>Put a rehype plugin in the <code>remarkPlugins</code> array.</strong> The plugin receives an MDAST (markdown AST) but expects an HAST (HTML AST). It either crashes or silently does nothing. Remark plugins go in <code>remarkPlugins</code>, rehype plugins in <code>rehypePlugins</code>.</li>
		<li><strong>Use <code>remarkMath</code> without <code>rehypeKatex</code>.</strong> Math blocks are parsed and identified in the AST but never rendered to HTML. You see raw LaTeX in the output instead of formatted equations. Both plugins are needed for the full pipeline.</li>
		<li><strong>Write a custom plugin that mutates the AST without returning it.</strong> The unified ecosystem uses return-or-mutate semantics. Mutating in-place works (no return needed), but returning a new tree also works. Returning <code>undefined</code> implicitly means "I mutated in place" — this is by design.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The unified ecosystem (remark + rehype) gives MDsveX its extensibility. Remark operates on the markdown AST before HTML conversion — it's where you add GFM support, auto-generate TOCs, and parse domain-specific syntax. Rehype operates on the HTML AST after conversion — it's where you add IDs, links, and attributes. Custom plugins follow the same pattern: receive an AST, walk/transform nodes, return the modified tree. The <code>[plugin, options]</code> array syntax configures plugins inline.</p>
	<p class="next">Next lesson: <a href="/mdsvex/mx-6-blog-patterns">MX.6 — Blog & Content Patterns</a></p>
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
