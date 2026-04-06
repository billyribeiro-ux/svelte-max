<script lang="ts">
	import { Tween, prefersReducedMotion } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	interface Props {
		value: number;
		duration?: number;
		format?: Intl.NumberFormatOptions;
	}

	const { value, duration = 600, format }: Props = $props();

	const tweened = new Tween(0, { duration: 600, easing: cubicOut });

	$effect(() => {
		const opts = prefersReducedMotion.current ? { duration: 0 } : undefined;
		tweened.set(value, opts);
	});

	const formatted = $derived(
		new Intl.NumberFormat('en-US', format).format(tweened.current)
	);
</script>

<span class="counter" aria-live="polite">{formatted}</span>

<style>
	.counter {
		font-variant-numeric: tabular-nums;
	}
</style>
