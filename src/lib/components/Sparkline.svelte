<script lang="ts">
	interface Props {
		data: readonly number[];
		width?: number;
		height?: number;
		color?: string;
	}

	const { data, width = 120, height = 32, color = 'var(--color-brand)' }: Props = $props();

	const points = $derived.by(() => {
		if (data.length < 2) return '';
		const min = Math.min(...data);
		const max = Math.max(...data);
		const range = max - min || 1;
		const padY = 2;
		const usableH = height - padY * 2;
		const step = width / (data.length - 1);

		return data
			.map((v, i) => {
				const x = i * step;
				const y = padY + usableH - ((v - min) / range) * usableH;
				return `${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(' ');
	});

	const areaPath = $derived.by(() => {
		if (data.length < 2) return '';
		const min = Math.min(...data);
		const max = Math.max(...data);
		const range = max - min || 1;
		const padY = 2;
		const usableH = height - padY * 2;
		const step = width / (data.length - 1);

		const linePoints = data.map((v, i) => {
			const x = i * step;
			const y = padY + usableH - ((v - min) / range) * usableH;
			return `${x.toFixed(1)},${y.toFixed(1)}`;
		});

		return `M${linePoints[0]} L${linePoints.join(' L')} L${width},${height} L0,${height} Z`;
	});

	const lastPoint = $derived.by(() => {
		if (data.length < 2) return null;
		const min = Math.min(...data);
		const max = Math.max(...data);
		const range = max - min || 1;
		const padY = 2;
		const usableH = height - padY * 2;
		const i = data.length - 1;
		const step = width / (data.length - 1);
		return {
			x: i * step,
			y: padY + usableH - ((data[i] - min) / range) * usableH
		};
	});

	const gradientId = $derived(`sparkline-grad-${Math.random().toString(36).slice(2, 8)}`);
</script>

<svg
	{width}
	{height}
	viewBox="0 0 {width} {height}"
	class="sparkline"
	aria-hidden="true"
>
	<defs>
		<linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
			<stop offset="0%" stop-color={color} stop-opacity="0.3" />
			<stop offset="100%" stop-color={color} stop-opacity="0.02" />
		</linearGradient>
	</defs>
	{#if areaPath}
		<path d={areaPath} fill="url(#{gradientId})" />
	{/if}
	{#if points}
		<polyline
			{points}
			fill="none"
			stroke={color}
			stroke-width="1.5"
			stroke-linejoin="round"
			stroke-linecap="round"
		/>
	{/if}
	{#if lastPoint}
		<circle cx={lastPoint.x} cy={lastPoint.y} r="2.5" fill={color} />
	{/if}
</svg>

<style>
	.sparkline {
		display: block;
		flex-shrink: 0;
	}
</style>
