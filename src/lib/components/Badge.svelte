<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tone?: 'neutral' | 'brand' | 'success' | 'warning' | 'error';
		rounded?: boolean;
		children: Snippet;
	}

	let { tone = 'neutral', rounded = false, children }: Props = $props();
</script>

<span class="badge tone-{tone}" class:rounded>
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		padding: var(--space-xs) var(--space-sm);
		border-radius: var(--radius-sm);
		font-size: var(--text-xs);
		font-weight: 600;
		line-height: 1;
		border: 1px solid transparent;
	}

	.badge.rounded {
		border-radius: var(--radius-full);
		padding-inline: var(--space-md);
	}

	.tone-neutral {
		background: var(--color-surface-2);
		color: var(--color-text);
		border-color: var(--color-border);
	}

	.tone-brand {
		background: var(--color-brand);
		color: var(--color-surface-1);
	}

	.tone-success {
		background: var(--color-success);
		color: var(--color-surface-1);
	}

	.tone-warning {
		background: var(--color-warning);
		color: var(--color-text);
	}

	.tone-error {
		background: var(--color-error);
		color: var(--color-surface-1);
	}
</style>
