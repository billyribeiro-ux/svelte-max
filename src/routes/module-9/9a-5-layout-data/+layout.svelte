<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { LayoutData } from './$types';

	let {
		data,
		children
	}: {
		data: LayoutData;
		children: Snippet;
	} = $props();
</script>

<div class="layout">
	<header class="bar">
		<span class="brand">9A.5 layout</span>
		<span class="pref">
			theme: <code>{data.preferences.theme}</code>
		</span>
		<span class="pref">
			locale: <code>{data.preferences.locale}</code>
		</span>
	</header>
	{@render children()}
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}
	.bar {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-md);
		background: var(--color-surface-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		padding: var(--space-sm) var(--space-md);
		margin: var(--space-lg) var(--space-lg) 0;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}
	.brand {
		font-weight: 600;
		color: var(--color-brand);
	}
	code {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-surface-1);
		padding: 0 var(--space-xs);
		border-radius: var(--radius-xs);
		color: var(--color-text);
	}
</style>
