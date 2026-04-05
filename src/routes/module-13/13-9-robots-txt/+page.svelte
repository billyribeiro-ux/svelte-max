<script lang="ts">
	const source = `import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () => {
  const body = \`User-agent: *
Allow: /

Sitemap: https://svelte-max.example/sitemap.xml
\`;
  return new Response(body, {
    headers: { 'content-type': 'text/plain' }
  });
};`;
</script>

<section class="page">
	<h1>13.9 — robots.txt via +server.ts</h1>
	<p class="concept">
		<strong>Concept.</strong>
		<code>robots.txt</code> tells crawlers which paths to index and where the sitemap
		lives. In SvelteKit it is a <code>+server.ts</code> endpoint returning
		<code>text/plain</code>. Production apps place it at
		<code>src/routes/robots.txt/+server.ts</code> so the URL is
		<code>/robots.txt</code> — for this lesson we scope it inside the lesson
		directory so you can visit the sibling endpoint below.
	</p>

	<div class="build">
		<p>
			Visit the endpoint:
			<a href="/module-13/13-9-robots-txt/robots.txt">
				/module-13/13-9-robots-txt/robots.txt
			</a>
		</p>

		<h2>Endpoint source</h2>
		<pre>{source}</pre>

		<h2>Directive reference</h2>
		<ul>
			<li><code>User-agent: *</code> — rule applies to every crawler.</li>
			<li><code>Allow: /</code> — permit crawling of the entire site.</li>
			<li><code>Disallow: /admin</code> — block a path prefix.</li>
			<li><code>Sitemap:</code> — absolute URL of the sitemap.</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>+server.ts</code> returns a plain <code>Response</code>.</li>
		<li>
			The <code>content-type</code> header must be
			<code>text/plain</code> for robots.txt.
		</li>
		<li>
			<code>export const prerender = true</code> makes it a static file at build time.
		</li>
		<li>In production the file lives at <code>/robots.txt</code>, not under a module folder.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 960px;
		margin: 0 auto;
		color: var(--color-text);
	}
	h1 {
		font-size: var(--text-xl);
		margin: 0;
	}
	h2 {
		font-size: var(--text-lg);
		margin: 0;
	}
	a {
		color: var(--color-brand);
	}
	.concept {
		font-size: var(--text-base);
		color: var(--color-text-muted);
		max-inline-size: 65ch;
		line-height: 1.6;
		margin: 0;
	}
	.concept strong {
		color: var(--color-text);
	}
	.build {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		background: var(--color-surface-1);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		padding: var(--space-lg);
		box-shadow: var(--shadow-sm);
		margin-block: var(--space-lg);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-2);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
	}
	h3 {
		margin-block-start: var(--space-xl);
		margin-block-end: var(--space-sm);
	}
	ul {
		list-style: disc;
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding-inline-start: var(--space-lg);
		color: var(--color-text-muted);
		line-height: 1.6;
		margin: 0;
	}
	pre {
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-md);
		overflow-x: auto;
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		margin: 0;
	}
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
