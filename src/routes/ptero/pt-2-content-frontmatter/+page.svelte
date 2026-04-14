<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const frontmatterCode = `---
title: Getting Started
description: Learn the basics of our API
section: guides
order: 1
---

# Getting Started

Your documentation content here. Full **markdown** support
with Svelte components embedded inline.`;

	const contentStructure = `// Content directory structure:
// src/content/docs/
// ├── index.md                    → /docs/latest
// ├── getting-started.md          → /docs/latest/getting-started
// ├── guides/
// │   ├── installation.md         → /docs/latest/guides/installation
// │   ├── configuration.md        → /docs/latest/guides/configuration
// │   └── deployment.md           → /docs/latest/guides/deployment
// └── api/
//     ├── reference.md            → /docs/latest/api/reference
//     └── authentication.md       → /docs/latest/api/authentication
//
// File system → URL mapping:
//   src/content/docs/{path}.md → /docs/{version}/{path}
//
// Frontmatter fields:
//   title:       Page title (used in sidebar, breadcrumbs, <title>)
//   description: Meta description (SEO)
//   section:     Sidebar group name
//   order:       Sort order within section (default: alphabetical)`;

	const svelteInMarkdown = `---
title: Interactive Demo
section: guides
order: 3
---

# Interactive Components

You can use Svelte components directly in markdown:

${'<'}script>
  import Counter from '$lib/components/Counter.svelte';
  import { Callout } from '$lib/components/pterodactyl/Callout.svelte';

  let count = ${'$'}state(0);
${'<'}/script>

Here is an interactive counter:

${'<'}Counter bind:count />

${'<'}Callout type="info">
  The counter value is **${'{'} count ${'}'} **. This is reactive!
${'<'}/Callout>

Regular markdown continues below the component...`;

	const codeBlocks = `---
title: Code Examples
section: guides
order: 4
---

# Code Blocks

Pterodactyl uses Shiki for syntax highlighting:

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

Tabbed code blocks with CodeTabs:

${'<'}script>
  import { CodeTabs } from '$lib/components/pterodactyl/CodeTabs.svelte';
${'<'}/script>

${'<'}CodeTabs labels=${'{'} ['npm', 'pnpm', 'yarn'] ${'}'} >

\`\`\`bash
npm install my-package
\`\`\`

\`\`\`bash
pnpm add my-package
\`\`\`

\`\`\`bash
yarn add my-package
\`\`\`

${'<'}/CodeTabs>`;

	const fullCode =
		"<script lang=\"ts\">\n  // Content & frontmatter\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.2 — Content & Frontmatter</h1></section>";
</script>

<section class="page">
	<h1>PT.2 — Content & Frontmatter</h1>
	<p class="concept">
		<strong>Concept.</strong> Documentation content lives in <code>src/content/docs/</code> as
		<code>.md</code> files with YAML frontmatter. The frontmatter defines <code>title</code>,
		<code>description</code>, <code>section</code>, and <code>order</code> — these drive the sidebar,
		breadcrumbs, prev/next navigation, search index, and SEO meta tags. Because Pterodactyl uses
		MDsveX, you can embed Svelte components directly in markdown — interactive demos, live code
		playgrounds, and data-driven visualizations alongside prose.
	</p>

	<div class="build">
		<h3 class="section-title">Frontmatter</h3>
		<pre class="code-block"><code>{frontmatterCode}</code></pre>

		<h3 class="section-title">Content structure</h3>
		<pre class="code-block"><code>{contentStructure}</code></pre>

		<h3 class="section-title">Svelte components in markdown</h3>
		<pre class="code-block"><code>{svelteInMarkdown}</code></pre>

		<h3 class="section-title">Code blocks & tabs</h3>
		<pre class="code-block"><code>{codeBlocks}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Omit the <code>title</code> frontmatter field.</strong> The sidebar shows the filename (e.g., "getting-started") as the link text. Breadcrumbs and <code>&lt;title&gt;</code> use it too. Without a title, navigation is functional but ugly.</li>
		<li><strong>Use the same <code>order</code> value for two pages in the same section.</strong> The sort is stable — pages with the same order fall back to alphabetical by filename. No error, but the order may surprise you.</li>
		<li><strong>Import a component that uses <code>$effect()</code> in markdown.</strong> It works — MDsveX processes the file as a Svelte component, so runes are fully supported. The component runs in the browser with full reactivity.</li>
		<li><strong>Create a deeply nested directory structure (<code>a/b/c/d/page.md</code>).</strong> The sidebar renders all levels, but deep nesting makes navigation unwieldy. Pterodactyl's auto-generated sidebar works best with 2-3 levels of depth.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Frontmatter is the contract between your content and Pterodactyl's engine. The <code>section</code> field groups pages in the sidebar, <code>order</code> sorts them, <code>title</code> drives navigation text, and <code>description</code> feeds SEO. MDsveX makes each <code>.md</code> file a full Svelte component — you can import and use any component, use runes, and have reactive state inside documentation pages.</p>
	<p class="next">Next lesson: <a href="/ptero/pt-3-theming-css">PT.3 — Theming & CSS Variables</a></p>
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
