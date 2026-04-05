<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="page">
	<h1>9A.1 — What load() is</h1>

	<p class="concept">
		<strong>Concept.</strong> A <code>load()</code> function runs <em>before</em> its page component
		is instantiated. It fetches data, handles errors, and returns a typed object that becomes the
		page's <code>data</code> prop. It runs on the server during SSR and in the browser during
		client-side navigation. You write it in <code>+page.ts</code> (universal) or
		<code>+page.server.ts</code> (server-only).
	</p>

	<div class="build">
		<h2 class="welcome-title">{data.welcome.title}</h2>
		<p class="welcome-sub">{data.welcome.subtitle}</p>
		<p class="ts-row">
			Prepared at <code>{data.welcome.ts}</code>
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li><code>load()</code> returns the object that becomes the page's <code>data</code> prop.</li>
		<li>It runs before the component — by the time Svelte renders, the data already exists.</li>
		<li><code>+page.ts</code> is universal (server + client); <code>+page.server.ts</code> is server only.</li>
		<li>You import <code>PageLoad</code> from <code>./$types</code> to type the function.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		color: var(--color-text);
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
	.welcome-title {
		margin: 0;
		font-size: var(--text-xl);
		color: var(--color-brand);
	}
	.welcome-sub {
		margin: 0;
		color: var(--color-text);
	}
	.ts-row {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
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
