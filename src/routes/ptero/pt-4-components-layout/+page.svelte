<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const componentCategories = `// 17 Svelte 5 components across 4 categories:
//
// Layout (4):
//   DocsLayout     — tri-pane layout (sidebar + content + TOC)
//   Header         — top navigation bar with logo and search
//   TOC            — auto-generated table of contents from headings
//   ThemeToggle    — light/dark mode switcher
//
// Navigation (4):
//   Sidebar        — auto-generated from content structure
//   Breadcrumbs    — path breadcrumb from current page
//   VersionSelector — version switcher dropdown
//   PrevNext       — previous/next page links
//
// Content (5):
//   CodeBlock      — syntax-highlighted code with copy button
//   CodeTabs       — tabbed code examples (npm/pnpm/yarn)
//   Callout        — info/warning/danger/tip callout boxes
//   LiveExample    — interactive component playground
//   PackageBadge   — npm version/download badges
//
// Search (3):
//   SearchBar      — inline search input
//   SearchModal    — Cmd+K search overlay
//   SearchResult   — individual search result card`;

	const docsLayout = `<!-- Using DocsLayout in your route -->
<script>
  ${"import"} DocsLayout from '$lib/components/pterodactyl/DocsLayout.svelte';
  ${"import"} Header from '$lib/components/pterodactyl/Header.svelte';
  ${"import"} Sidebar from '$lib/components/pterodactyl/Sidebar.svelte';
  ${"import"} TOC from '$lib/components/pterodactyl/TOC.svelte';

  let { children } = $props();
<\/script>

<Header title="My Docs" />
<DocsLayout>
  {#snippet sidebar()}
    <Sidebar />
  {/snippet}

  {#snippet content()}
    {@render children()}
  {/snippet}

  {#snippet toc()}
    <TOC />
  {/snippet}
</DocsLayout>`;

	const addComponents = `# Add components individually (shadcn-style)
pnpm ptero add sidebar
pnpm ptero add code-block
pnpm ptero add callout

# Components are copied to:
# src/lib/components/pterodactyl/Sidebar.svelte
# src/lib/components/pterodactyl/CodeBlock.svelte
# src/lib/components/pterodactyl/Callout.svelte

# You own the code — customize freely
# Updates: re-run 'ptero add' to get latest (prompts on conflict)`;

	const calloutUsage = `<!-- Callout component in markdown -->
<script>
  ${"import"} Callout from '$lib/components/pterodactyl/Callout.svelte';
<\/script>

<Callout type="info">
  This is an informational note.
</Callout>

<Callout type="warning">
  Be careful with this configuration.
</Callout>

<Callout type="danger">
  This action is irreversible!
</Callout>

<Callout type="tip">
  Pro tip: use keyboard shortcuts for faster navigation.
</Callout>`;

	const fullCode =
		"<script lang=\"ts\">\n  // Components & layout\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.4 — Components & Layout</h1></section>";
</script>

<section class="page">
	<h1>PT.4 — Components & Layout</h1>
	<p class="concept">
		<strong>Concept.</strong> Pterodactyl ships 17 Svelte 5 components that you install individually
		via <code>pnpm ptero add</code>. Components are copied into your project (not imported from a
		package), giving you full control. The <code>DocsLayout</code> component provides the tri-pane
		structure (sidebar + content + TOC) using Svelte 5 snippets for each slot. All components use
		<code>$props()</code> and CSS variables from the theme system.
	</p>

	<div class="build">
		<h3 class="section-title">Component catalog</h3>
		<pre class="code-block"><code>{componentCategories}</code></pre>

		<h3 class="section-title">DocsLayout with snippets</h3>
		<pre class="code-block"><code>{docsLayout}</code></pre>

		<h3 class="section-title">Adding components</h3>
		<pre class="code-block"><code>{addComponents}</code></pre>

		<h3 class="section-title">Callout types</h3>
		<pre class="code-block"><code>{calloutUsage}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Use <code>DocsLayout</code> without providing the <code>sidebar</code> snippet.</strong> The sidebar pane renders empty. The layout still works — the content area expands to fill the space. Snippets are optional slots; omitting one removes that pane.</li>
		<li><strong>Customize a component, then run <code>ptero add</code> for the same component.</strong> The CLI detects the existing file and prompts: overwrite, skip, or diff. Choosing overwrite replaces your customizations. Always commit before re-adding components.</li>
		<li><strong>Import a Pterodactyl component from <code>ptero</code> package instead of <code>$lib/components</code>.</strong> Components aren't exported from the npm package — they're copied into your project by the CLI. Import from <code>$lib/components/pterodactyl/</code>.</li>
		<li><strong>Use <code>Callout</code> with an invalid <code>type</code> prop.</strong> The component renders with default styling (no icon, neutral border). Invalid types don't throw — they degrade gracefully to a plain box.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The shadcn-style distribution model (copy, don't install) gives you full ownership of UI components. When you run <code>ptero add sidebar</code>, the component code lives in your project — you can modify styling, add features, or remove unused props. The <code>DocsLayout</code> uses Svelte 5 snippets for the tri-pane structure, meaning each pane is a named slot that you can fill or omit.</p>
	<p class="next">Next lesson: <a href="/ptero/pt-5-search-versioning">PT.5 — Search & Versioning</a></p>
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
