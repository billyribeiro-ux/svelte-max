<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="page">
	<h1>9A.10 — SSG prerender</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>export const prerender = true</code> at the top of a
		<code>+page.ts</code> or <code>+page.server.ts</code> tells SvelteKit to render this route once at
		build time and serve the static HTML forever. Perfect for blog posts, documentation, landing pages —
		anything whose content does not change per request. Dynamic routes can still be prerendered if you
		export <code>entries()</code> from the loader returning the list of slugs to render.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">Note</span>
			<span>{data.buildInfo.note}</span>
		</div>
		<div class="row">
			<span class="label">Built at</span>
			<span class="ts">{data.buildInfo.builtAt}</span>
		</div>
		<p class="hint">
			The <code>builtAt</code> timestamp is the <strong>build</strong> time, not the current time. Every
			visitor sees the same timestamp until the next <code>pnpm build</code>.
		</p>
		<pre>{`export const prerender = true;

export const load: PageLoad = async () => ({
  buildInfo: { note: '...', builtAt: new Date().toISOString() }
});`}</pre>
		<p class="warn">
			<strong>Do not prerender</strong> anything that varies per user (dashboards, account pages) or changes
			frequently (live data, search results).
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>export const prerender = true</code> renders once at build time</li>
		<li>The output is static HTML — fast, cacheable, CDN-friendly</li>
		<li>Dynamic routes need <code>entries()</code> to enumerate paths</li>
		<li>Avoid for per-user or frequently changing content</li>
	</ul>
</section>

<style>
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}
	.ts {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin: 0;
		line-height: 1.6;
	}
	.hint strong,
	.warn strong {
		color: var(--color-text);
	}
	.warn {
		font-size: var(--text-sm);
		color: var(--color-warning);
		margin: 0;
		line-height: 1.6;
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
		color: var(--color-text);
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
	@media (min-width: 768px) {
		h1 {
			font-size: var(--text-2xl);
		}
	}
</style>
