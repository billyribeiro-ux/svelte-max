<script lang="ts">
	import type { TrendDirection } from '$lib/types/kpi';

	interface Props {
		direction: TrendDirection;
		percent: number;
		size?: 'sm' | 'md';
	}

	const { direction, percent, size = 'md' }: Props = $props();

	const color = $derived(
		direction === 'up'
			? 'var(--color-success)'
			: direction === 'down'
				? 'var(--color-error)'
				: 'var(--color-text-muted)'
	);

	const ariaText = $derived(
		direction === 'up'
			? `Up ${percent.toFixed(1)}%`
			: direction === 'down'
				? `Down ${percent.toFixed(1)}%`
				: 'No change'
	);

	const iconSize = $derived(size === 'sm' ? 14 : 18);
	const fontSize = $derived(size === 'sm' ? 'var(--text-xs)' : 'var(--text-sm)');
</script>

<span class="trend" style:color={color} style:font-size={fontSize} aria-label={ariaText} role="img">
	<svg
		width={iconSize}
		height={iconSize}
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		{#if direction === 'up'}
			<path d="M8 3L13 9H3L8 3Z" fill="currentColor" />
		{:else if direction === 'down'}
			<path d="M8 13L3 7H13L8 13Z" fill="currentColor" />
		{:else}
			<rect x="2" y="7" width="12" height="2" rx="1" fill="currentColor" />
		{/if}
	</svg>
	<span class="trend-text">{percent.toFixed(1)}%</span>
</span>

<style>
	.trend {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
		font-weight: 600;
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}

	.trend-text {
		white-space: nowrap;
	}
</style>
