<script lang="ts">
	// This lesson page uses SvelteKit defaults:
	// SSR on (server renders HTML per request), prerender off (not built ahead of time).
	// Good default because the page is interactive and not user-specific.
	export const ssr = true;
	export const prerender = false;

	interface ModeRow {
		mode: string;
		config: string;
		use: string;
		avoid: string;
		examples: string;
	}

	const rows: readonly ModeRow[] = [
		{
			mode: 'SSR',
			config: 'ssr = true (default)',
			use: 'Fresh data, SEO, per-user pages',
			avoid: 'Pure static content you can cache at build',
			examples: 'Product pages, feeds, search results'
		},
		{
			mode: 'SSG',
			config: 'prerender = true',
			use: 'Content that rarely changes, marketing, docs',
			avoid: 'Per-user data, realtime content',
			examples: 'Blog, docs site, marketing pages'
		},
		{
			mode: 'CSR',
			config: 'ssr = false',
			use: 'Auth-gated dashboards, editor UIs',
			avoid: 'SEO-critical pages, first-paint-sensitive routes',
			examples: 'Admin panels, authoring tools'
		},
		{
			mode: 'Hybrid',
			config: 'Mix per-route',
			use: 'Most real apps — prerender marketing, SSR app, CSR admin',
			avoid: 'Not a pitfall — this is the norm',
			examples: 'SaaS with marketing + app + admin'
		}
	];
</script>

<section class="page">
	<h1>8.14 — Rendering modes</h1>
	<p class="concept">
		<strong>Concept.</strong>
		SvelteKit supports four rendering modes per route: <strong>SSR</strong> (default — server
		renders HTML per request), <strong>SSG</strong> (<code>prerender = true</code> — built once
		at build time), <strong>CSR</strong> (<code>ssr = false</code> — skeleton HTML, browser
		renders), and <strong>Hybrid</strong> (mix per route). Pick based on data freshness, auth,
		interactivity, and build-time cost.
	</p>

	<div class="build">
		<table>
			<thead>
				<tr>
					<th>Mode</th>
					<th>Config</th>
					<th>When to use</th>
					<th>When NOT to use</th>
					<th>Examples</th>
				</tr>
			</thead>
			<tbody>
				{#each rows as r (r.mode)}
					<tr>
						<td><strong>{r.mode}</strong></td>
						<td><code>{r.config}</code></td>
						<td>{r.use}</td>
						<td>{r.avoid}</td>
						<td>{r.examples}</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<div class="current">
			<span>This page:</span>
			<span class="pill">SSR</span>
		</div>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>SSR is the right default — fresh data plus fast first paint.</li>
		<li>SSG (<code>prerender = true</code>) is perfect for docs and marketing.</li>
		<li>CSR (<code>ssr = false</code>) is fine for auth-gated internal tools.</li>
		<li>Hybrid routing is the norm for real apps — pick per route.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 90ch;
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
		overflow-x: auto;
	}
	table {
		inline-size: 100%;
		border-collapse: collapse;
		font-size: var(--text-sm);
	}
	th,
	td {
		text-align: start;
		padding: var(--space-sm);
		border-block-end: 1px solid var(--color-border);
		vertical-align: top;
	}
	th {
		color: var(--color-text);
		font-weight: 600;
	}
	td {
		color: var(--color-text-muted);
	}
	tbody tr:nth-child(even) {
		background: var(--color-surface-2);
	}
	.current {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: var(--text-sm);
		color: var(--color-text);
	}
	.pill {
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-full);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		background: var(--color-brand);
		color: var(--color-surface);
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
