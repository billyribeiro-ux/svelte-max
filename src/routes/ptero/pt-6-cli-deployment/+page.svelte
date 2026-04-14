<script lang="ts">
	import CodeCanvas from '$lib/components/CodeCanvas.svelte';

	const cliReference = `# Pterodactyl CLI — 4 commands:

# 1. ptero init — scaffold a docs project
pnpm ptero init
#   Creates: pterodactyl.config.ts, content dirs, route files
#   Idempotent: safe to run multiple times

# 2. ptero add <component> — add a component (shadcn-style)
pnpm ptero add sidebar
pnpm ptero add code-block
pnpm ptero add callout
pnpm ptero add search-modal
#   Copies component to src/lib/components/pterodactyl/
#   Prompts on conflict: overwrite / skip / diff

# 3. ptero version create <id> — snapshot current docs
pnpm ptero version create v2.0
#   Copies src/content/docs/ → src/content/docs-v2.0/
#   Updates pterodactyl.config.ts with new version entry

# 4. ptero search build — generate search index
pnpm ptero search build
#   Crawls all content, generates Fuse.js-compatible JSON
#   Version-aware: one index per version
#   Run in CI before deploy`;

	const svelteConfig = `// svelte.config.js — MDsveX integration
${"import"} adapter from '@sveltejs/adapter-static';
${"import"} { mdsvex } from 'mdsvex';

export default {
  extensions: ['.svelte', '.md'],  // .md files = Svelte components
  preprocess: [
    mdsvex({
      extensions: ['.md'],
      // Shiki syntax highlighting
      highlight: {
        highlighter: async (code, lang) => {
          const { getHighlighter } = await import('shiki');
          const shiki = await getHighlighter({ themes: ['github-dark'] });
          return shiki.codeToHtml(code, { lang, theme: 'github-dark' });
        }
      }
    })
  ],
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: '404.html'
    })
  }
};`;

	const deployment = `# Deployment with adapter-static (recommended for docs)

# 1. Build
pnpm ptero search build   # generate search index
pnpm build                 # SvelteKit build

# 2. Preview locally
pnpm preview

# 3. Deploy to any static host:
#    Netlify:   build dir = 'build'
#    Vercel:    output dir = 'build'
#    GitHub Pages: use actions/upload-pages-artifact
#    Cloudflare Pages: build command = 'pnpm build'

# CI/CD pipeline (GitHub Actions):
# - name: Build docs
#   run: |
#     pnpm install
#     pnpm ptero search build
#     pnpm build
# - name: Deploy to Netlify
#   uses: netlify/actions/cli@master`;

	const viteConfig = `// vite.config.ts — Pterodactyl Vite plugin
${"import"} { sveltekit } from '@sveltejs/kit/vite';
${"import"} { pterodactyl } from 'ptero/vite';

export default {
  plugins: [
    sveltekit(),
    pterodactyl()  // Handles content resolution, HMR, search
  ]
};`;

	const fullCode =
		"<script lang=\"ts\">\n  // CLI & deployment\n<\/script>\n\n" +
		"<section class=\"page\"><h1>PT.6 — CLI & Deployment</h1></section>";
</script>

<section class="page">
	<h1>PT.6 — CLI & Deployment</h1>
	<p class="concept">
		<strong>Concept.</strong> The <code>ptero</code> CLI provides four commands: <code>init</code>
		for scaffolding, <code>add</code> for installing components, <code>version create</code> for
		documentation snapshots, and <code>search build</code> for generating the search index.
		Deployment uses SvelteKit's <code>adapter-static</code> for zero-server documentation sites.
		The build pipeline is: search index → SvelteKit build → deploy to any static host.
	</p>

	<div class="build">
		<h3 class="section-title">CLI reference</h3>
		<pre class="code-block"><code>{cliReference}</code></pre>

		<h3 class="section-title">SvelteKit + MDsveX config</h3>
		<pre class="code-block"><code>{svelteConfig}</code></pre>

		<h3 class="section-title">Vite plugin</h3>
		<pre class="code-block"><code>{viteConfig}</code></pre>

		<h3 class="section-title">Deployment</h3>
		<pre class="code-block"><code>{deployment}</code></pre>
	</div>

	<h2>Break it on purpose</h2>
	<ol class="experiments">
		<li><strong>Use <code>adapter-node</code> instead of <code>adapter-static</code>.</strong> It works — documentation is server-rendered on every request. But docs sites are static content; SSR adds latency and hosting cost for no benefit. Use <code>adapter-static</code> for docs.</li>
		<li><strong>Deploy without running <code>ptero search build</code>.</strong> The site builds and deploys, but search returns zero results. The search index is a separate build step that must run before <code>pnpm build</code>.</li>
		<li><strong>Omit <code>.md</code> from the <code>extensions</code> array in <code>svelte.config.js</code>.</strong> SvelteKit doesn't recognize <code>.md</code> files as routes or components. MDsveX processes them but SvelteKit ignores the output. Both <code>extensions</code> and <code>preprocess</code> are required.</li>
		<li><strong>Run <code>ptero add</code> for a component that doesn't exist.</strong> The CLI lists all available components and suggests the closest match. No files are created. Typos are caught gracefully.</li>
	</ol>

	<details class="having-issues">
		<summary>Having issues? Here is the complete code</summary>
		<CodeCanvas filename="+page.svelte" code={fullCode} />
	</details>

	<h2>What you learned</h2>
	<p class="prose">The build pipeline for Pterodactyl documentation is: <code>ptero search build</code> (generate index) → <code>pnpm build</code> (SvelteKit static build) → deploy. The CLI handles scaffolding and component management; SvelteKit handles routing and rendering; MDsveX handles markdown-to-Svelte compilation; and <code>adapter-static</code> produces a zero-server deployment. Every piece is standard SvelteKit tooling — Pterodactyl adds content conventions and UI components on top.</p>
	<p class="next">Next: <a href="/ptero/project">Pterodactyl — Module Project</a></p>
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
