<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<section class="page">
	<h1>9A.5 — Layout data</h1>

	<p class="concept">
		<strong>Concept.</strong> <code>+layout.ts</code> and <code>+layout.server.ts</code> run for
		the layout and every child route beneath it. Their return value is available to the layout
		component <em>and</em> merged into each child's <code>data</code>. Use layouts for data every
		child needs — current user, feature flags, preferences. Inside a child loader, call
		<code>await parent()</code> to read the layout's data explicitly. The layout loader is
		cached across sibling navigations unless invalidated.
	</p>

	<div class="build">
		<div class="row">
			<span class="label">From layout (merged automatically)</span>
			<code>preferences.theme = {data.preferences.theme}</code>
			<code>preferences.locale = {data.preferences.locale}</code>
		</div>
		<div class="row">
			<span class="label">From this page</span>
			<code>{data.pageNote}</code>
		</div>
		<div class="row">
			<span class="label">Read via parent() inside the page loader</span>
			<code>inheritedLocale = {data.inheritedLocale}</code>
		</div>
		<p class="note">
			Notice <code>data.preferences</code> is available here even though this page's loader
			never returned it — SvelteKit merged the layout's return value into the page's
			<code>data</code>. <code>parent()</code> gives the page loader explicit access when it
			needs to derive new values from layout state.
		</p>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Layout loaders run for the layout and every child route.</li>
		<li>Layout data is automatically merged into child page <code>data</code>.</li>
		<li>Call <code>await parent()</code> inside a child loader to read layout data directly.</li>
		<li>Layout data is cached across sibling navigations until invalidated.</li>
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
	.row {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}
	.label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.note {
		margin: 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		line-height: 1.6;
		border-top: 1px solid var(--color-border);
		padding-top: var(--space-md);
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
