<script lang="ts">
	import type { KpiMetric, TrendInfo, TrendDirection } from '$lib/types/kpi';
	import AnimatedCounter from '$lib/components/AnimatedCounter.svelte';
	import TrendArrow from '$lib/components/TrendArrow.svelte';
	import Sparkline from '$lib/components/Sparkline.svelte';
	import ProgressRing from '$lib/components/ProgressRing.svelte';

	interface Props {
		metric: KpiMetric;
		showSparkline?: boolean;
		showProgress?: boolean;
		showTrend?: boolean;
	}

	const { metric, showSparkline = true, showProgress = true, showTrend = true }: Props = $props();

	const trend: TrendInfo = $derived.by(() => {
		const delta = metric.value - metric.previousValue;
		const percent = metric.previousValue !== 0
			? Math.abs((delta / metric.previousValue) * 100)
			: 0;
		const direction: TrendDirection =
			delta > 0.001 ? 'up' : delta < -0.001 ? 'down' : 'neutral';
		return { direction, delta, percent };
	});

	const progressPercent = $derived(
		Math.min(100, Math.max(0, (metric.value / metric.target) * 100))
	);

	const formatOptions: Intl.NumberFormatOptions = $derived.by(() => {
		if (metric.unit === '%') return { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		if (metric.unit === 'ms') return { maximumFractionDigits: 0 };
		return { maximumFractionDigits: 0 };
	});
</script>

<article class="kpi-card" aria-label="{metric.label}: {metric.value} {metric.unit}">
	<header class="kpi-header">
		<span class="kpi-label">{metric.label}</span>
		{#if showTrend}
			<TrendArrow direction={trend.direction} percent={trend.percent} size="sm" />
		{/if}
	</header>

	<div class="kpi-value">
		<AnimatedCounter value={metric.value} format={formatOptions} />
		<span class="kpi-unit">{metric.unit}</span>
	</div>

	{#if showSparkline && metric.history.length >= 2}
		<div class="kpi-sparkline">
			<Sparkline data={metric.history} width={140} height={28} />
		</div>
	{/if}

	{#if showProgress}
		<footer class="kpi-footer">
			<ProgressRing value={progressPercent} size={40} strokeWidth={4} />
			<span class="kpi-target">
				Target: {new Intl.NumberFormat('en-US', formatOptions).format(metric.target)} {metric.unit}
			</span>
		</footer>
	{/if}
</article>

<style>
	.kpi-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		background: var(--card-bg, var(--color-surface-1));
		border: 1px solid var(--card-border, var(--color-border));
		border-radius: var(--radius-lg);
		padding: var(--space-md) var(--space-lg);
		box-shadow: var(--shadow-sm);
		transition: box-shadow var(--dur-fast) var(--ease-out);
	}

	.kpi-card:hover {
		box-shadow: var(--shadow-md);
	}

	.kpi-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-sm);
	}

	.kpi-label {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.kpi-value {
		display: flex;
		align-items: baseline;
		gap: var(--space-xs);
	}

	.kpi-value :global(.counter) {
		font-size: var(--text-3xl);
		font-weight: 700;
		color: var(--color-text);
		line-height: 1;
	}

	.kpi-unit {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	.kpi-sparkline {
		margin-block: var(--space-xs);
	}

	.kpi-footer {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		margin-block-start: var(--space-xs);
		border-block-start: 1px solid var(--color-border);
		padding-block-start: var(--space-sm);
	}

	.kpi-target {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		font-weight: 500;
	}

	@media (min-width: 768px) {
		.kpi-card {
			padding: var(--space-lg) var(--space-xl);
		}

		.kpi-value :global(.counter) {
			font-size: var(--text-4xl);
		}
	}
</style>
