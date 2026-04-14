<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const searchConfig = `// pterodactyl.config.ts — Search configuration
export default {
  search: {
    enabled: true,
    placeholder: 'Search docs...',
    hotkeys: ['ctrl+k', 'cmd+k'],  // keyboard shortcut
    // Fuse.js options:
    threshold: 0.3,    // 0 = exact match, 1 = match anything
    keys: ['title', 'description', 'content'],
    maxResults: 20
  }
};

// Build the search index:
// pnpm ptero search build
//
// This creates a JSON index at build time.
// No backend required — search runs entirely in the browser.
// The index is version-aware: each version has its own index.`;

	const versioningConfig = `// pterodactyl.config.ts — Version management
export default {
  versions: {
    current: 'v2.0',
    available: [
      { id: 'v2.0', label: 'v2.0 (Current)', status: 'latest' },
      { id: 'v1.5', label: 'v1.5', status: 'stable' },
      { id: 'v1.0', label: 'v1.0', status: 'legacy' },
      { id: 'v3.0', label: 'v3.0-beta', status: 'next' }
    ],
    aliases: {
      latest: 'v2.0',   // /docs/latest → /docs/v2.0
      next: 'v3.0'      // /docs/next   → /docs/v3.0
    }
  }
};`;

	const versionCli = `# Create a new version snapshot
pnpm ptero version create v2.0

# This copies src/content/docs/ → src/content/docs-v2.0/
# New changes go to the main docs/ directory
# Versioned snapshots are frozen

# URL structure:
# /docs/latest/getting-started  → current version
# /docs/v1.5/getting-started    → specific version
# /docs/next/getting-started    → pre-release version`;

	const searchUsage = `<!-- SearchModal: Cmd+K overlay -->
<script>
  ${"import"} SearchModal from '$lib/components/pterodactyl/SearchModal.svelte';
  ${"import"} SearchBar from '$lib/components/pterodactyl/SearchBar.svelte';
<\/script>

<!-- Inline search in the header -->
<SearchBar />

<!-- Modal search (Cmd+K) — mount once in layout -->
<SearchModal />

<!-- Search is keyboard-accessible:
  Cmd+K / Ctrl+K → open modal
  Type to search → fuzzy matching
  Arrow keys → navigate results
  Enter → go to selected result
  Esc → close modal
-->`;

	const versionSelector = `<!-- Version switcher dropdown -->
<script>
  ${"import"} VersionSelector from '$lib/components/pterodactyl/VersionSelector.svelte';
<\/script>

<!-- Renders a dropdown with all available versions -->
<!-- Switching redirects from /docs/v1.5/page to /docs/v2.0/page -->
<VersionSelector />

<!-- Version badges in the sidebar:
  'latest'  → green badge
  'stable'  → blue badge
  'legacy'  → gray badge
  'next'    → orange badge
-->`;

	const fullCode =
		"<script lang=\"ts\">\n  // Search & versioning\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.5 — Search & Versioning</h1></section>";
</script>

<section class="page">
	<h1>PT.5 — Search & Versioning</h1>
	<p class="concept">
		<strong>Concept.</strong> Search is powered by Fuse.js with a compile-time index — no backend,
		no Algolia, no API keys. The <code>pnpm ptero search build</code> command generates a JSON index
		from your content. Versioning snapshots documentation at a point in time — <code>pnpm ptero version create v2.0</code>
		freezes the current docs while you keep editing the main branch. URLs include the version
		(<code>/docs/v2.0/page</code>), and aliases (<code>latest</code>, <code>next</code>) redirect
		to the configured version.
	</p>

	<div class="build">
		<h3 class="section-title">Search configuration</h3>
		<pre class="code-block"><code>{searchConfig}</code></pre>

		<h3 class="section-title">Search components</h3>
		<pre class="code-block"><code>{searchUsage}</code></pre>

		<h3 class="section-title">Versioning configuration</h3>
		<pre class="code-block"><code>{versioningConfig}</code></pre>

		<h3 class="section-title">Version CLI</h3>
		<pre class="code-block"><code>{versionCli}</code></pre>

		<h3 class="section-title">VersionSelector component</h3>
		<pre class="code-block"><code>{versionSelector}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Skip <code>pnpm ptero search build</code> before deploying.</strong> The search index JSON is missing. The <code>SearchModal</code> opens but shows "No results" for every query. The index must be built as part of your CI/CD pipeline.</li>
		<li><strong>Set <code>threshold: 1.0</code> in Fuse.js options.</strong> Every search term matches every page. Results are sorted by relevance but the list is enormous. Use 0.3 (default) for useful fuzzy matching.</li>
		<li><strong>Create a version snapshot, then delete the source directory.</strong> Versioned content lives in <code>src/content/docs-v2.0/</code>. Deleting it removes that version from the build — existing links return 404. Version snapshots are just directories, not database entries.</li>
		<li><strong>Define an alias that points to a non-existent version ID.</strong> <code>/docs/latest</code> resolves to a version that doesn't have content. The redirect works but lands on a 404 page. Always verify aliases point to valid version IDs.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Client-side search with Fuse.js eliminates backend infrastructure for documentation. The compile-time index is a JSON file loaded lazily when the user triggers a search. Versioning uses a simple directory-copy model — <code>pnpm ptero version create</code> snapshots the current docs into a versioned directory. Each version has its own search index, sidebar, and navigation. Aliases (<code>latest</code>, <code>next</code>) provide stable URLs that redirect to the configured version.</p>
	<p class="next">Next lesson: <a href="/ptero/pt-6-cli-deployment">PT.6 — CLI & Deployment</a></p>
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
