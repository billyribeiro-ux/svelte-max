<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		value: number;
		size?: number;
		strokeWidth?: number;
		color?: string;
	}

	const { value, size = 80, strokeWidth = 6, color = 'var(--color-brand)' }: Props = $props();

	const radius = $derived((size - strokeWidth) / 2);
	const circumference = $derived(2 * Math.PI * radius);
	const center = $derived(size / 2);

	const tweenedValue = new Tween(0, { duration: 600, easing: cubicOut });

	$effect(() => {
		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;
		tweenedValue.set(value, opts);
	});

	const offset = $derived(
		circumference - (tweenedValue.current / 100) * circumference
	);
</script>

<div class="ring-wrap" style:width="{size}px" style:height="{size}px">
	<svg
		width={size}
		height={size}
		viewBox="0 0 {size} {size}"
		role="img"
		aria-label="{Math.round(value)}% progress"
	>
		<!-- Background track -->
		<circle
			cx={center}
			cy={center}
			r={radius}
			fill="none"
			stroke="var(--color-border)"
			stroke-width={strokeWidth}
		/>
		<!-- Foreground arc -->
		<circle
			cx={center}
			cy={center}
			r={radius}
			fill="none"
			stroke={color}
			stroke-width={strokeWidth}
			stroke-dasharray={circumference}
			stroke-dashoffset={offset}
			stroke-linecap="round"
			transform="rotate(-90 {center} {center})"
		/>
	</svg>
	<span class="ring-label" aria-hidden="true">{Math.round(tweenedValue.current)}%</span>
</div>

<style>
	.ring-wrap {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.ring-label {
		position: absolute;
		font-size: var(--text-sm);
		font-weight: 700;
		color: var(--color-text);
		font-variant-numeric: tabular-nums;
		line-height: 1;
	}
</style>
