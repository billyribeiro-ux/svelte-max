<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const installCode = `# Install mdsvex
pnpm add -D mdsvex`;

	const svelteConfig = `// svelte.config.js
${"import"} adapter from '@sveltejs/adapter-auto';
${"import"} { mdsvex } from 'mdsvex';

export default {
  // Tell SvelteKit to treat .md and .svx files as components
  extensions: ['.svelte', '.md', '.svx'],

  preprocess: [
    mdsvex({
      extensions: ['.md', '.svx']
    })
  ],

  kit: {
    adapter: adapter()
  }
};`;

	const whatItDoes = `// MDsveX is a markdown preprocessor for Svelte.
// It allows two things:
//
// 1. Use Svelte components INSIDE markdown files
//    → Write documentation with interactive demos
//
// 2. Use markdown INSIDE Svelte components
//    → Render user-authored content
//
// .md / .svx files are compiled to Svelte components.
// They support:
//   - Full markdown syntax (headings, lists, code blocks, links)
//   - YAML frontmatter (metadata)
//   - <script> tags (imports, state, runes)
//   - Svelte components (inline, with props)
//   - Svelte template syntax ({#if}, {#each}, etc.)

// The .svx extension is optional — .md works too.
// .svx makes it clear the file uses Svelte features.`;

	const basicExample = `---
title: My First MDsveX Page
author: Jane Developer
date: 2026-04-13
---

${'<'}script>
  // Frontmatter values are available as module-level exports
  // Access them via the layout component

  let count = ${'$'}state(0);
${'<'}/script>

# ${'{'} title ${'}'}

Written by **${'{'} author ${'}'}** on ${'{'} date ${'}'}.

This is regular markdown with a **Svelte counter**:

${'<'}button onclick=${'{'} () => count++ ${'}'}>
  Clicked ${'{'} count ${'}'} times
${'<'}/button>

## Code Example

\`\`\`javascript
const greeting = 'Hello from MDsveX!';
console.log(greeting);
\`\`\``;

	const asRoute = `// Using .md files as SvelteKit routes:
//
// src/routes/
// ├── blog/
// │   ├── +page.svelte       (blog index)
// │   └── my-first-post/
// │       └── +page.md       ← markdown route!
// └── docs/
//     └── getting-started/
//         └── +page.svx      ← also works with .svx
//
// URL: /blog/my-first-post → renders +page.md as Svelte component
// URL: /docs/getting-started → renders +page.svx

// The file IS the route. No +page.svelte wrapper needed.
// Frontmatter, scripts, and Svelte components all work.`;

	const fullCode =
		"<script lang=\"ts\">\n  // MDsveX introduction\n<\/script>\n\n" +
		"<section class=\"page\"><h1>MX.1 — What is MDsveX?</h1></section>";
</script>

<section class="page">
	<h1>MX.1 — What is MDsveX?</h1>
	<p class="concept">
		<strong>Concept.</strong> MDsveX is a markdown preprocessor that compiles <code>.md</code> and
		<code>.svx</code> files into Svelte components. You can use Svelte components inside markdown
		(interactive demos in documentation) or markdown inside Svelte projects (blog posts, content
		pages). MDsveX files support YAML frontmatter, <code>&lt;script&gt;</code> tags with runes,
		and full Svelte template syntax — they're compiled to real Svelte components with HMR.
	</p>

	<div class="build">
		<h3 class="section-title">Installation</h3>
		<pre class="code-block"><code>{installCode}</code></pre>

		<h3 class="section-title">SvelteKit configuration</h3>
		<pre class="code-block"><code>{svelteConfig}</code></pre>

		<h3 class="section-title">What MDsveX does</h3>
		<pre class="code-block"><code>{whatItDoes}</code></pre>

		<h3 class="section-title">Basic example</h3>
		<pre class="code-block"><code>{basicExample}</code></pre>

		<h3 class="section-title">Markdown as SvelteKit routes</h3>
		<pre class="code-block"><code>{asRoute}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Add <code>.md</code> to <code>preprocess</code> but not to <code>extensions</code>.</strong> MDsveX processes the file but SvelteKit doesn't recognize it as a component. The route doesn't render. Both arrays must include the extension.</li>
		<li><strong>Use Svelte 5 runes in a <code>.md</code> file without MDsveX configured.</strong> SvelteKit ignores the file entirely — it's not a recognized extension. No error, just a 404 or missing route.</li>
		<li><strong>Write invalid YAML in the frontmatter block.</strong> MDsveX throws a parse error at compile time. The dev server shows the error with the file and line. Frontmatter must be valid YAML between <code>---</code> delimiters.</li>
		<li><strong>Import a component in markdown without a <code>&lt;script&gt;</code> tag.</strong> MDsveX requires a <code>&lt;script&gt;</code> block for imports — just like Svelte components. Without it, the component tag is rendered as plain HTML text.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">MDsveX treats <code>.md</code>/<code>.svx</code> files as Svelte components. The preprocessor runs before Svelte's compiler: it parses frontmatter, converts markdown to HTML, and passes the result to Svelte for compilation. This means runes (<code>$state</code>, <code>$derived</code>), component imports, and template syntax all work inside markdown. The <code>extensions</code> array in <code>svelte.config.js</code> tells SvelteKit to treat these files as routes, and <code>preprocess</code> tells Vite to run MDsveX on them.</p>
	<p class="next">Next lesson: <a href="/mdsvex/mx-2-frontmatter-layouts">MX.2 — Frontmatter & Layouts</a></p>
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
