<script lang="ts">
	import type { Snippet } from 'svelte';
	interface Props { children: Snippet; }
	let { children }: Props = $props();
</script>

<div class="contact-layout">
	{@render children()}
</div>

<style>
	.contact-layout {
		min-block-size: 100dvh;
		display: grid;
		place-items: center;
		padding: var(--space-lg);
	}
</style>
