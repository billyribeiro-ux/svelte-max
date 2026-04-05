<script lang="ts">
	interface LinkOption {
		attr: string;
		value: string;
		purpose: string;
		href: string;
		label: string;
	}

	const options: readonly LinkOption[] = [
		{
			attr: 'data-sveltekit-preload-data',
			value: '"hover"',
			purpose: 'Runs the load function on pointer enter so data is ready on click.',
			href: '/module-8/8-8-app-navigation',
			label: 'Hover to preload 8.8'
		},
		{
			attr: 'data-sveltekit-preload-code',
			value: '"viewport"',
			purpose: 'Imports the route JS chunk when the link scrolls into view.',
			href: '/module-8/8-10-hooks',
			label: 'Viewport preload 8.10'
		},
		{
			attr: 'data-sveltekit-reload',
			value: '""',
			purpose: 'Forces a full page reload — bypasses client-side routing entirely.',
			href: '/module-8/8-11-shallow-routing',
			label: 'Full reload 8.11'
		},
		{
			attr: 'data-sveltekit-replacestate',
			value: '""',
			purpose: 'Replaces the current history entry instead of pushing a new one.',
			href: '/module-8/8-12-snapshots',
			label: 'Replace state 8.12'
		},
		{
			attr: 'data-sveltekit-noscroll',
			value: '""',
			purpose: 'Prevents the automatic scroll-to-top after navigation.',
			href: '/module-8/8-13-page-transitions',
			label: 'No scroll 8.13'
		},
		{
			attr: 'data-sveltekit-keepfocus',
			value: '""',
			purpose: 'Preserves the currently focused element across the navigation.',
			href: '/module-8/8-14-rendering-modes',
			label: 'Keep focus 8.14'
		}
	];
</script>

<section class="page">
	<h1>8.9 — Link options</h1>
	<p class="concept">
		<strong>Concept.</strong>
		SvelteKit ships a set of <code>data-sveltekit-*</code> attributes that configure preloading
		and navigation behavior per link. You can opt routes into hover-preload, viewport-preload,
		full reloads, history replacement, focus retention, and scroll suppression — all without
		custom JavaScript.
	</p>

	<div class="build">
		<table>
			<thead>
				<tr>
					<th>Attribute</th>
					<th>Value</th>
					<th>Purpose</th>
					<th>Example</th>
				</tr>
			</thead>
			<tbody>
				{#each options as o (o.attr)}
					<tr>
						<td><code>{o.attr}</code></td>
						<td><code>{o.value}</code></td>
						<td>{o.purpose}</td>
						<td>
							{#if o.attr === 'data-sveltekit-preload-data'}
								<a href={o.href} data-sveltekit-preload-data="hover">{o.label}</a>
							{:else if o.attr === 'data-sveltekit-preload-code'}
								<a href={o.href} data-sveltekit-preload-code="viewport">{o.label}</a>
							{:else if o.attr === 'data-sveltekit-reload'}
								<a href={o.href} data-sveltekit-reload>{o.label}</a>
							{:else if o.attr === 'data-sveltekit-replacestate'}
								<a href={o.href} data-sveltekit-replacestate>{o.label}</a>
							{:else if o.attr === 'data-sveltekit-noscroll'}
								<a href={o.href} data-sveltekit-noscroll>{o.label}</a>
							{:else}
								<a href={o.href} data-sveltekit-keepfocus>{o.label}</a>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<h3>What you learned</h3>
	<ul>
		<li>Link options are declarative — no hooks, no JS, just attributes on <code>&lt;a&gt;</code>.</li>
		<li>They can also be set on a parent element to cascade to all descendant links.</li>
		<li>Use <code>"off"</code> as the value to opt a link out of an inherited setting.</li>
	</ul>
</section>

<style>
	.page {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding: var(--space-lg);
		max-inline-size: 80ch;
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
	a {
		color: var(--color-brand);
		text-decoration: none;
	}
	a:hover {
		text-decoration: underline;
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
