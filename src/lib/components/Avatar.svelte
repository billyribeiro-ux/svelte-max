<script lang="ts">
	interface Props {
		src: string | null;
		name: string;
		alt?: string;
		size?: 'sm' | 'md' | 'lg';
	}

	let { src, name, alt, size = 'md' }: Props = $props();

	const label = $derived(alt ?? name);

	const initials = $derived(
		name
			.split(/\s+/)
			.filter(Boolean)
			.slice(0, 2)
			.map((part) => part[0]?.toUpperCase() ?? '')
			.join('')
	);
</script>

<div class="avatar size-{size}" role="img" aria-label={label}>
	{#if src}
		<img {src} alt={label} />
	{:else}
		<span class="initials" aria-hidden="true">{initials}</span>
	{/if}
</div>

<style>
	.avatar {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: var(--radius-full);
		background: var(--color-brand);
		color: var(--color-surface-1);
		overflow: hidden;
		font-weight: 700;
		flex-shrink: 0;
		box-shadow: var(--shadow-sm);
	}

	.avatar img {
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}

	.initials {
		font-family: system-ui, sans-serif;
		letter-spacing: 0.02em;
	}

	.size-sm {
		inline-size: 2.5rem;
		block-size: 2.5rem;
		font-size: var(--text-xs);
	}

	.size-md {
		inline-size: 3.5rem;
		block-size: 3.5rem;
		font-size: var(--text-sm);
	}

	.size-lg {
		inline-size: 5rem;
		block-size: 5rem;
		font-size: var(--text-lg);
	}
</style>
