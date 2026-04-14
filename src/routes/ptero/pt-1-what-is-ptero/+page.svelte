<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const quickStart = `# Add Pterodactyl to an existing SvelteKit project
pnpm add -D ptero mdsvex

# Run the installer (idempotent)
pnpm ptero init

# Start dev server
pnpm dev

# Docs available at http://localhost:5173/docs/latest`;

	const fromScratch = `# Starting from scratch
pnpm dlx create-svelte@latest my-docs
cd my-docs
pnpm add -D ptero mdsvex
pnpm ptero init
pnpm dev`;

	const whyPtero = `// Docusaurus (React)        vs  Pterodactyl (Svelte)
// ──────────────────            ──────────────────────
// React runtime (45KB)          Svelte (no runtime overhead)
// MDX (JSX in markdown)         MDsveX (Svelte in markdown)
// plugin ecosystem              shadcn-style components (copy-own)
// config-heavy                  single TypeScript config file
// separate build tool           built on SvelteKit + Vite
// no SSR by default             full SvelteKit SSR/SSG/CSR
// versioning via plugins        built-in version management
// Algolia search                client-side Fuse.js (no backend)

// What Pterodactyl provides:
// - 17 Svelte 5 UI components (layout, nav, content, search)
// - MDsveX integration (Svelte components inside markdown)
// - 4 theme presets (default, supabase, github, minimal)
// - Full-text search with Fuse.js (compile-time index)
// - Multi-version documentation
// - Auto-generated sidebar, breadcrumbs, prev/next
// - CLI for scaffolding, adding components, managing versions`;

	const projectStructure = `// Pterodactyl project structure:
//
// my-docs/
// ├── src/
// │   ├── lib/pterodactyl/core/     # Core engine
// │   ├── lib/components/pterodactyl/ # 17 Svelte 5 components
// │   ├── routes/                    # SvelteKit routes
// │   └── content/docs/              # Your documentation
// │       ├── getting-started.md
// │       ├── guides/
// │       │   ├── installation.md
// │       │   └── configuration.md
// │       └── api/
// │           └── reference.md
// ├── pterodactyl.config.ts          # Site configuration
// ├── svelte.config.js               # SvelteKit + mdsvex
// └── vite.config.ts                 # Vite + Pterodactyl plugin`;

	const fullCode =
		"<script lang=\"ts\">\n  // Ptero introduction\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.1 — What is Pterodactyl?</h1></section>";
</script>

<section class="page">
	<h1>PT.1 — What is Pterodactyl?</h1>
	<p class="concept">
		<strong>Concept.</strong> Pterodactyl (ptero) is a documentation engine for SvelteKit —
		the Svelte equivalent of Docusaurus. It combines MDsveX (Svelte components in markdown),
		a CLI for scaffolding, 17 pre-built Svelte 5 UI components, 4 theme presets, client-side
		full-text search with Fuse.js, and built-in multi-version documentation. Components are
		copied into your project (shadcn-style), giving you full control to customize.
	</p>

	<div class="build">
		<h3 class="section-title">Quick start</h3>
		<pre class="code-block"><code>{quickStart}</code></pre>

		<h3 class="section-title">From scratch</h3>
		<pre class="code-block"><code>{fromScratch}</code></pre>

		<h3 class="section-title">Why Pterodactyl?</h3>
		<pre class="code-block"><code>{whyPtero}</code></pre>

		<h3 class="section-title">Project structure</h3>
		<pre class="code-block"><code>{projectStructure}</code></pre>

		<div class="feature-grid">
			<div class="feature-card"><h4>MDsveX</h4><p>Write markdown with embedded Svelte components. Full HMR support.</p></div>
			<div class="feature-card"><h4>17 Components</h4><p>Layout, navigation, content, and search — all Svelte 5 with <code>$props()</code>.</p></div>
			<div class="feature-card"><h4>4 Themes</h4><p>default, supabase, github, minimal — plus 40+ CSS variables for customization.</p></div>
			<div class="feature-card"><h4>Search</h4><p>Client-side Fuse.js with compile-time index. No backend, keyboard accessible.</p></div>
		</div>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Run <code>pnpm ptero init</code> without installing <code>mdsvex</code> first.</strong> The CLI warns that mdsvex is missing and skips the svelte.config.js mdsvex integration. Markdown files won't be processed as Svelte components. Install mdsvex first, then run init.</li>
		<li><strong>Place documentation files outside <code>src/content/docs/</code>.</strong> Pterodactyl's content resolver only scans <code>src/content/docs/</code>. Files elsewhere are invisible to the sidebar, search index, and navigation. The directory convention is not configurable in v0.1.</li>
		<li><strong>Run <code>pnpm ptero init</code> twice.</strong> It's idempotent — running it again detects existing configuration and skips already-created files. No data loss, no duplicates. This is by design for safe re-initialization.</li>
		<li><strong>Skip <code>pterodactyl.config.ts</code> entirely.</strong> Pterodactyl uses sensible defaults: site title from <code>package.json</code>, latest version only, default theme, search enabled. The config file is optional but recommended for customization.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">Pterodactyl brings the Docusaurus experience to SvelteKit. The key difference is architecture: instead of a monolithic framework, Pterodactyl is a CLI + component library that integrates into existing SvelteKit projects. Components are copied into your project (shadcn-style), so you own the code and can customize freely. The engine core handles content resolution, navigation generation, search indexing, and version management — you focus on writing markdown.</p>
	<p class="next">Next lesson: <a href="/ptero/pt-2-content-frontmatter">PT.2 — Content & Frontmatter</a></p>
</section>

<style>
	.page { display: flex; flex-direction: column; gap: var(--space-md); padding: var(--space-lg); }
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	.section-title { font-size: var(--text-sm); color: var(--color-text-muted); margin: var(--space-sm) 0 0; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; }
	.code-block { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); font-family: var(--font-mono); font-size: var(--text-xs); margin: 0; overflow-x: auto; line-height: 1.6; white-space: pre; }
	.code-block code { background: transparent; padding: 0; }
	.feature-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: var(--space-sm); }
	.feature-card { padding: var(--space-md); background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); & h4 { font-size: var(--text-sm); color: var(--color-text); margin: 0 0 var(--space-xs); } & p { font-size: var(--text-xs); color: var(--color-text-muted); margin: 0; line-height: 1.5; } & code { font-family: var(--font-mono); font-size: 0.85em; } }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	.prose { color: var(--color-text); max-inline-size: 68ch; line-height: 1.7; margin-block: 0.5lh; text-wrap: pretty; & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.experiments { max-inline-size: 68ch; display: flex; flex-direction: column; gap: var(--space-md); padding-inline-start: var(--space-lg); color: var(--color-text); line-height: 1.6; & strong { color: var(--color-text); } & code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); color: var(--color-brand); } }
	.next { margin-block-start: var(--space-xl); color: var(--color-text); }
	.having-issues { margin-block-start: var(--space-lg); }
</style>
