<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="page">
	<h1>9A.8 — error() and redirect()</h1>
	<p class="concept">
		<strong>Concept.</strong> <code>throw error(status, message)</code> from <code>@sveltejs/kit</code>
		in a load function causes SvelteKit to render the closest <code>+error.svelte</code> with that status
		and message. <code>throw redirect(status, location)</code> sends the user to another URL. Common patterns:
		<code>error(404, 'Not found')</code> for missing resources, <code>redirect(302, '/login')</code> for
		auth gates. SvelteKit catches these throws and handles them correctly.
	</p>

	<div class="build">
		<p class="status">{data.normal}</p>
		<div class="links">
			<a href="/module-9/9a-8-error-redirect">Normal (no params)</a>
			<a href="/module-9/9a-8-error-redirect?mode=error">Trigger error (?mode=error)</a>
			<a href="/module-9/9a-8-error-redirect?mode=redirect">Trigger redirect (?mode=redirect)</a>
		</div>
		<ul class="explain">
			<li><strong>Normal:</strong> loads this page as you see it.</li>
			<li>
				<strong>Error:</strong> the loader throws <code>error(418, ...)</code>. Since this lesson has
				no <code>+error.svelte</code>, SvelteKit's default framework error page appears with status
				418.
			</li>
			<li>
				<strong>Redirect:</strong> the loader throws <code>redirect(302, ...)</code> and you land on
				lesson 9A.1.
			</li>
		</ul>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>throw error(status, message)</code> renders the nearest error page</li>
		<li><code>throw redirect(status, location)</code> navigates elsewhere</li>
		<li>Both are imported from <code>@sveltejs/kit</code></li>
		<li>Use 302/307 for temporary, 301/308 for permanent redirects</li>
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
	.status {
		color: var(--color-text);
		margin: 0;
		line-height: 1.6;
	}
	.links {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
	.links a {
		color: var(--color-brand);
		text-decoration: none;
		padding: var(--space-sm) var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
	}
	.links a:hover {
		border-color: var(--color-brand);
	}
	.explain {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: 1.6;
	}
	.explain strong {
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
