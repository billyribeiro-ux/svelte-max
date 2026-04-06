<script lang="ts">
	const prerenderCode = `// config.remote.ts
import { prerender } from '$app/server';

// Runs at build time — result is baked into the bundle
export const getSiteConfig = prerender(async () => {
  const config = await fetch('https://api.example.com/config');
  return config.json();
});`;

	const inputsCode = `// blog-posts.remote.ts
import { prerender } from '$app/server';

// 'inputs' specifies which arguments to prerender
export const getPost = prerender(
  async (slug: string) => {
    return await db.posts.findBySlug(slug);
  },
  {
    inputs: ['intro-to-svelte', 'advanced-runes', 'remote-functions']
  }
);`;

	const dynamicCode = `// With dynamic: true, unknown inputs fall back to server
export const getPost = prerender(
  async (slug: string) => {
    return await db.posts.findBySlug(slug);
  },
  {
    inputs: ['intro-to-svelte', 'advanced-runes'],
    dynamic: true  // slugs not in 'inputs' hit the server at runtime
  }
);`;

	const buildTime = new Date().toISOString();

	const staticData = [
		{ key: 'Site Name', value: 'SvelteMax Learning Platform' },
		{ key: 'Version', value: '2.4.1' },
		{ key: 'Theme', value: 'Dark' },
		{ key: 'Locale', value: 'en-US' },
		{ key: 'Build Time', value: buildTime },
	];
</script>

<section class="page">
	<h1>9B.5 — prerender Remote Functions</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>prerender</code> from <code>$app/server</code> runs at build
		time, producing static data baked into the bundle. Perfect for CDN deployment. The
		<code>inputs</code> option specifies which arguments to prerender, and
		<code>dynamic: true</code> falls back to the server for unknown inputs.
	</p>

	<div class="build">
		<h2>Basic prerender</h2>
		<pre><code>{prerenderCode}</code></pre>

		<h2>Prerender with specific inputs</h2>
		<pre><code>{inputsCode}</code></pre>

		<h2>Dynamic fallback</h2>
		<pre><code>{dynamicCode}</code></pre>

		<h2>Simulated prerendered data</h2>
		<p>This represents what a prerendered config query would produce — static data frozen at build time:</p>

		<div class="config-table">
			{#each staticData as item}
				<div class="config-row">
					<span class="config-key">{item.key}</span>
					<span class="config-value">{item.value}</span>
				</div>
			{/each}
		</div>

		<div class="note">
			<strong>CDN-friendly:</strong> Prerendered data is served as static files. No server needed at
			runtime for these queries. The data only changes when you rebuild.
		</div>
	</div>

	<h3>When to prerender vs query</h3>
	<p class="concept">
		<strong>Prerender</strong> when data changes rarely — site config, navigation structure,
		documentation index. <strong>Query at runtime</strong> when data changes per request — user-specific
		content, real-time dashboards. Use <code>dynamic: true</code> for data that USUALLY doesn't change
		but CAN — for example, a product catalog that you prerender at build time but fall back to the
		server on cache miss for newly added items.
	</p>

	<h3>What you learned</h3>
	<ul>
		<li><code>prerender</code> runs queries at build time, embedding results in the bundle</li>
		<li>The <code>inputs</code> option specifies which arguments to precompute</li>
		<li><code>dynamic: true</code> allows runtime fallback for unknown inputs</li>
		<li>Prerendered data is ideal for config, blog posts, and other rarely-changing content</li>
	</ul>
</section>

<style>
	.concept { font-size: var(--text-base); color: var(--color-text-muted); max-inline-size: 65ch; line-height: 1.6; margin: 0; }
	.concept strong { color: var(--color-text); }
	.build { display: flex; flex-direction: column; gap: var(--space-md); background: var(--color-surface-1); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); margin-block: var(--space-lg); }
	code { font-family: var(--font-mono); font-size: 0.9em; background: var(--color-surface-2); padding: 0 var(--space-xs); border-radius: var(--radius-xs); }
	h3 { margin-block-start: var(--space-xl); margin-block-end: var(--space-sm); }
	ul { list-style: disc; display: flex; flex-direction: column; gap: var(--space-xs); padding-inline-start: var(--space-lg); color: var(--color-text-muted); line-height: 1.6; margin: 0; }
	pre { background: var(--color-surface-2); border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-md); overflow-x: auto; font-family: var(--font-mono); font-size: var(--text-sm); margin: 0; white-space: pre-wrap; }
	h2 { margin: 0; font-size: var(--text-lg); }
	.config-table { display: flex; flex-direction: column; gap: 1px; background: var(--color-border); border-radius: var(--radius-md); overflow: hidden; }
	.config-row { display: flex; justify-content: space-between; padding: var(--space-sm) var(--space-md); background: var(--color-surface-2); }
	.config-key { font-weight: 600; }
	.config-value { color: var(--color-text-muted); font-family: var(--font-mono); font-size: var(--text-sm); }
	.note { background: var(--color-surface-2); border-radius: var(--radius-md); padding: var(--space-md); font-size: var(--text-sm); }
	@media (min-width: 768px) { h1 { font-size: var(--text-2xl); } }
</style>
