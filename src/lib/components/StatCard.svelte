<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		label: string;
		value: number;
		unit: string;
		children?: Snippet;
	}

	const { label, value, unit, children }: Props = $props();

	const formatted = $derived(
		new Intl.NumberFormat('en-US', { maximumFractionDigits: 1 }).format(value)
	);
</script>

<article class="stat-card">
	<dt class="stat-label">{label}</dt>
	<dd class="stat-value">
		<span class="stat-number">{formatted}</span>
		<span class="stat-unit">{unit}</span>
	</dd>
	{#if children}
		<footer class="stat-footer">
			{@render children()}
		</footer>
	{/if}
</article>

<style>
	.stat-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		background: var(--card-bg, var(--color-surface-1));
		border: 1px solid var(--card-border, var(--color-border));
		border-radius: var(--radius-lg);
		padding: var(--space-md) var(--space-lg);
		box-shadow: var(--shadow-sm);
	}

	.stat-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.stat-value {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
		margin: 0;
	}

	.stat-number {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.stat-unit {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.stat-footer {
		margin-block-start: var(--space-xs);
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-sm);
	}

	@media (min-width: 768px) {
		.stat-card {
			padding: var(--space-lg) var(--space-xl);
		}

		.stat-number {
			font-size: var(--text-4xl);
		}
	}
</style>
