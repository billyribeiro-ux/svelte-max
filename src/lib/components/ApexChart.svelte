<script lang="ts">
	/**
	 * PE7 ApexCharts wrapper — SSR-safe, reactive, typed.
	 *
	 * ApexCharts requires window/document — this wrapper uses dynamic import
	 * inside $effect (browser-only) to stay SSR-safe. The chart instance is
	 * created once, then updated reactively when options change.
	 */

	interface Props {
		/** ApexCharts options object. Reactive — chart updates when this changes. */
		options: Record<string, unknown>;
		/** CSS height for the container. */
		height?: string;
		/** CSS class for the outer wrapper. */
		class?: string;
	}

	let { options, height = '320px', class: className = '' }: Props = $props();

	let containerEl: HTMLDivElement | null = $state(null);
	let chartInstance: unknown = $state(null);

	$effect(() => {
		if (!containerEl) return;

		let chart: { render: () => void; updateOptions: (opts: Record<string, unknown>) => void; destroy: () => void } | null = null;
		let destroyed = false;

		(async () => {
			const ApexCharts = (await import('apexcharts')).default;
			if (destroyed) return;

			chart = new ApexCharts(containerEl, {
				...options,
				chart: {
					...(options.chart as Record<string, unknown> ?? {}),
					height: height.replace('px', ''),
				}
			});
			chart.render();
			chartInstance = chart;
		})();

		return () => {
			destroyed = true;
			if (chart) {
				chart.destroy();
				chartInstance = null;
			}
		};
	});

	$effect(() => {
		if (!chartInstance) return;
		const c = chartInstance as { updateOptions: (opts: Record<string, unknown>) => void };
		c.updateOptions(options);
	});
</script>

<div
	bind:this={containerEl}
	class="apex-wrapper {className}"
	style:min-block-size={height}
></div>

<style>
	.apex-wrapper {
		inline-size: 100%;
		border-radius: var(--radius-lg);
		overflow: hidden;
	}
</style>
